<template>
  <div class="main-content">
    <breadcumb :page="$t('AddSale')" :folder="$t('ListSales')"/>
    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>

    <validation-observer ref="create_sale" v-if="!isLoading">
      <b-form @submit.prevent="Submit_Sale">
        <b-row>
          <b-col lg="12" md="12" sm="12">
            
            <b-modal hide-footer id="open_scan" size="md" title="Barcode Scanner">
              <qrcode-scanner
                :qrbox="250" 
                :fps="10" 
                style="width: 100%; height: calc(100vh - 56px);"
                @result="onScan"
              />
            </b-modal>

            <!-- Context Header (Sticky Info) -->
            <b-card class="mb-3 bg-light">
              <b-row>
                <!-- date  -->
                <b-col lg="6" md="6" sm="12">
                  <validation-provider name="date" :rules="{ required: true}" v-slot="validationContext">
                    <b-form-group :label="$t('date') + ' ' + '*'">
                      <b-form-input :state="getValidationState(validationContext)" type="date" v-model="sale.date"></b-form-input>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- warehouse -->
                <b-col lg="6" md="6" sm="12">
                  <validation-provider name="warehouse" :rules="{ required: true}">
                    <b-form-group slot-scope="{ valid, errors }" :label="$t('warehouse') + ' ' + '*'">
                      <v-select
                        :class="{'is-invalid': !!errors.length}"
                        :state="errors[0] ? false : (valid ? true : null)"
                        :disabled="details.length > 0"
                        @input="Selected_Warehouse"
                        v-model="sale.warehouse_id"
                        :reduce="label => label.value"
                        :placeholder="$t('Choose_Warehouse')"
                        :options="warehouses.map(warehouses => ({label: warehouses.name, value: warehouses.id}))"
                      />
                      <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>
              </b-row>
            </b-card>

            <!-- Simple Excel Grid Section -->
            <div class="excel-container mt-4">
              <div class="d-flex justify-content-between mb-3 align-items-center">
                 <h3 class="mb-0 text-dark font-weight-bold">Sales Worksheet (Grid View)</h3>
              </div>



              <div class="table-responsive worksheet-grid-wrapper">
                <table class="table table-bordered excel-grid">
                  <thead>
                    <tr>
                      <th style="width: 20%;">Customer</th>
                      <th style="width: 30%;">Product</th>
                      <th style="width: 10%;">Qty</th>
                      <th style="width: 15%;">Amount</th>
                      <th style="width: 20%;">Note</th>
                      <th style="width: 5%;"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, index) in spreadsheetRows" :key="index">
                      <td class="p-0 align-middle">
                        <v-select
                          v-model="row.client_id"
                          :options="clients.map(c => ({label: c.name, value: c.id}))"
                          :reduce="opt => opt.value"
                          class="grid-v-select fill-height-select"
                          placeholder="Select Customer"
                          append-to-body
                          :ref="'row_client_' + index"
                          @input="onGridCustomerChange(index)"
                        />
                      </td>
                      <td class="p-0">
                        <div v-for="(item, itemIndex) in row.items" :key="itemIndex" class="grid-row-item d-flex align-items-center">
                          <v-select
                            v-model="item.product_data"
                            :options="products.map(p => ({label: p.name + ' (' + p.code + ')', value: p}))"
                            :reduce="opt => opt.value"
                            class="grid-v-select flex-grow-1"
                            placeholder="Select Product"
                            append-to-body
                            :ref="'row_product_' + index + '_' + itemIndex"
                            @input="onGridProductChange(index, itemIndex)"
                          />
                          <i v-if="row.items.length > 1" @click="removeItem(index, itemIndex)" class="i-Close text-danger ml-1 mr-2 cursor-pointer" style="font-size: 1.2rem;" title="Remove this item"></i>
                        </div>
                      </td>
                      <td class="p-0">
                        <div v-for="(item, itemIndex) in row.items" :key="itemIndex" class="grid-row-item">
                          <input 
                            type="text" 
                            inputmode="decimal"
                            v-model.number="item.quantity" 
                            class="grid-input text-center" 
                            :ref="'row_qty_' + index + '_' + itemIndex"
                            @keydown.enter.prevent="focusNextCell(index, itemIndex, 'amount')"
                          />
                        </div>
                      </td>
                      <td class="p-0">
                        <div v-for="(item, itemIndex) in row.items" :key="itemIndex" class="grid-row-item">
                          <input 
                            type="text" 
                            inputmode="decimal"
                            v-model.number="item.amount" 
                            class="grid-input text-right" 
                            :ref="'row_amount_' + index + '_' + itemIndex"
                            @keydown.enter.prevent="focusNextCell(index, itemIndex, 'note')"
                          />
                        </div>
                      </td>
                      <td class="p-0 align-middle">
                        <input 
                          type="text" 
                          v-model="row.note" 
                          class="grid-input fill-height-input" 
                          placeholder="Note..." 
                          :ref="'row_note_' + index"
                          @keydown.enter.prevent="moveToNextRow(index)"
                        />
                      </td>
                      <td class="p-0 text-center align-middle">
                        <div class="d-flex justify-content-center align-items-center fill-height-input" style="min-height: 60px;">
                          <i @click="addItem(index)" class="i-Add text-success cursor-pointer mr-3" style="font-size: 1.5rem; font-weight: bold;" title="Add product to this bill"></i>
                          <i @click="clearRow(index)" class="i-Close-Window text-danger cursor-pointer" style="font-size: 1.5rem;" title="Delete this bill"></i>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="6" class="p-3 bg-light text-left">
                        <b-button variant="primary" size="md" @click="addNewRow" class="shadow-sm font-weight-bold">
                          <i class="i-Add"></i> Add New Row
                        </b-button>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <!-- Final Action Button -->
              <div class="mt-4 text-right">
                <b-button 
                  variant="success" 
                  size="lg" 
                  class="px-5 font-weight-bold"
                  style="font-size: 1.4rem;"
                  :disabled="is_bulk_processing" 
                  @click="submitSpreadsheet"
                >
                  <i class="i-Yes mr-2"></i> SAVE ALL SALES
                </b-button>
              </div>
              <div v-if="is_bulk_processing" class="spinner lg spinner-primary mt-3 text-center"></div>
            </div>

          </b-col>
        </b-row>
      </b-form>
    </validation-observer>

    <!-- Modal Update detail Product -->
    <validation-observer ref="Update_Detail">
      <b-modal hide-footer size="lg" id="form_Update_Detail" :title="detail.name">
        <b-form @submit.prevent="submit_Update_Detail">
          <b-row>
            <!-- Unit Price -->
            <b-col lg="6" md="6" sm="12">
              <validation-provider
                name="Product Price"
                :rules="{ required: true , regex: /^\d*\.?\d*$/}"
                v-slot="validationContext"
              >
                <b-form-group :label="$t('ProductPrice') + ' ' + '*'" id="Price-input">
                  <b-form-input
                    label="Product Price"
                    v-model="detail.Unit_price"
                    :state="getValidationState(validationContext)"
                    aria-describedby="Price-feedback"
                  ></b-form-input>
                  <b-form-invalid-feedback id="Price-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Tax Method -->
            <b-col lg="6" md="6" sm="12">
              <validation-provider name="Tax Method" :rules="{ required: true}">
                <b-form-group slot-scope="{ valid, errors }" :label="$t('TaxMethod') + ' ' + '*'">
                  <v-select
                    :class="{'is-invalid': !!errors.length}"
                    :state="errors[0] ? false : (valid ? true : null)"
                    v-model="detail.tax_method"
                    :reduce="label => label.value"
                    :placeholder="$t('Choose_Method')"
                    :options="
                           [
                            {label: 'Exclusive', value: '1'},
                            {label: 'Inclusive', value: '2'}
                           ]"
                  ></v-select>
                  <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Tax Rate -->
            <b-col lg="6" md="6" sm="12">
              <validation-provider
                name="Order Tax"
                :rules="{ required: true , regex: /^\d*\.?\d*$/}"
                v-slot="validationContext"
              >
                <b-form-group :label="$t('OrderTax') + ' ' + '*'">
                  <b-input-group append="%">
                    <b-form-input
                      label="Order Tax"
                      v-model="detail.tax_percent"
                      :state="getValidationState(validationContext)"
                      aria-describedby="OrderTax-feedback"
                    ></b-form-input>
                  </b-input-group>
                  <b-form-invalid-feedback id="OrderTax-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Discount Method -->
             <b-col lg="6" md="6" sm="12">
              <validation-provider name="Discount Method" :rules="{ required: true}">
                <b-form-group slot-scope="{ valid, errors }" :label="$t('Discount_Method') + ' ' + '*'">
                  <v-select
                    v-model="detail.discount_Method"
                    :reduce="label => label.value"
                    :placeholder="$t('Choose_Method')"
                    :class="{'is-invalid': !!errors.length}"
                    :state="errors[0] ? false : (valid ? true : null)"
                    :options="
                           [
                            {label: 'Percent %', value: '1'},
                            {label: 'Fixed', value: '2'}
                           ]"
                  ></v-select>
                  <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Discount Rate -->
           <b-col lg="6" md="6" sm="12">
              <validation-provider
                name="Discount Rate"
                :rules="{ required: true , regex: /^\d*\.?\d*$/}"
                v-slot="validationContext"
              >
                <b-form-group :label="$t('Discount') + ' ' + '*'">
                  <b-form-input
                    label="Discount"
                    v-model.number="detail.discount"
                    :state="getValidationState(validationContext)"
                    aria-describedby="Discount-feedback"
                  ></b-form-input>
                  <b-form-invalid-feedback id="Discount-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Unit Sale -->
            <b-col lg="6" md="6" sm="12" v-if="detail.product_type != 'is_service'">
              <validation-provider name="Unit Sale" :rules="{ required: true}">
                <b-form-group slot-scope="{ valid, errors }" :label="$t('UnitSale') + ' ' + '*'">
                  <v-select
                    :class="{'is-invalid': !!errors.length}"
                    :state="errors[0] ? false : (valid ? true : null)"
                    v-model="detail.sale_unit_id"
                    :placeholder="$t('Choose_Unit_Sale')"
                    :reduce="label => label.value"
                    :options="units.map(units => ({label: units.name, value: units.id}))"
                  />
                  <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

             <!-- Imei or serial numbers -->
              <b-col lg="12" md="12" sm="12" v-show="detail.is_imei">
                <b-form-group :label="$t('Add_product_IMEI_Serial_number')">
                  <b-form-input
                    label="Add_product_IMEI_Serial_number"
                    v-model="detail.imei_number"
                    :placeholder="$t('Add_product_IMEI_Serial_number')"
                  ></b-form-input>
                </b-form-group>
            </b-col>

            <b-col md="12">
              <b-form-group>
                <b-button
                  variant="primary"
                  type="submit"
                  :disabled="Submit_Processing_detail"
                ><i class="i-Yes me-2 font-weight-bold"></i> {{$t('submit')}}</b-button>
                <div v-once class="typo__p" v-if="Submit_Processing_detail">
                  <div class="spinner sm spinner-primary mt-3"></div>
                </div>
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
      </b-modal>
    </validation-observer>
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import NProgress from "nprogress";
import { loadStripe } from "@stripe/stripe-js";

export default {
  metaInfo: {
    title: "Create Sale"
  },
  data() {
    return {
      focused: false,
      timer:null,
      search_input:'',
      product_filter:[],
      stripe_key:'',
      stripe: {},
      cardElement: {},

      savedPaymentMethods: [],
      hasSavedPaymentMethod: false,
      useSavedPaymentMethod: false,
      selectedCard:null,
      card_id:'',
      is_new_credit_card: false,
      submit_showing_credit_card: false,
      selectedProductId: null,

      paymentProcessing: false,
      Submit_Processing_detail:false,
      isLoading: true,
      warehouses: [],
      clients: [],
      accounts: [],
      client: {},
      products: [],
      details: [],
      detail: {},
      sales: [],
      payment_methods:[],
      payment: {
        status: "pending",
        payment_method_id: "2",
        amount: "",
        received_amount: "",
        account_id: "",
      },
      selectedClientPoints: 0,
      showPointsSection: false,
      discount_from_points: 0,
      used_points: 0,
      clientIsEligible: false,
      pointsConverted: false,
      point_to_amount_rate: 0,
      transporters: [],
      sale: {
        id: "",
        date: new Date().toISOString().slice(0, 10),
        statut: "completed",
        notes: "",
        transporter_name: "",
        lr_number: "",
        client_id: "",
        warehouse_id: "",
        tax_rate: 0,
        TaxNet: 0,
        shipping: 0,
        discount: 0
      },
      timer:null,
      total: 0,
      GrandTotal: 0,
      sale_queue: [],
      is_bulk_processing: false,
      spreadsheetRows: [{ 
        client_id: null, 
        note: '',
        items: [{
          product_data: null,
          product_id: null,
          variant_id: null,
          quantity: null,
          amount: null,
          sale_unit_id: null,
          tax_method: null,
          tax_percent: null
        }]
      }],
      units:[],
      product: {
        id: "",
        product_type: "",
        code: "",
        stock: "",
        quantity: 1,
        discount: "",
        DiscountNet: "",
        discount_Method: "",
        name: "",
        sale_unit_id:"",
        fix_stock:"",
        fix_price:"",
        unitSale: "",
        Net_price: "",
        Unit_price: "",
        Total_price: "",
        subtotal: "",
        product_id: "",
        detail_id: "",
        taxe: "",
        tax_percent: "",
        tax_method: "",
        product_variant_id: "",
        is_imei: "",
        imei_number:"",
      }
    };
  },

  computed: {
    ...mapGetters(["currentUserPermissions","currentUser"]),

     displaySavedPaymentMethods() {
      if(this.hasSavedPaymentMethod){
        return true;
      }else{
        return false;
      }
    },

    displayFormNewCard() {
      if(this.useSavedPaymentMethod){
        return false;
      }else{
        return true;
      }
    },

    isSelectedCard() {
      return card => this.selectedCard === card;
    },

  },

 

  methods: {

    showModal() {
      this.$bvModal.show('open_scan');
      
    },

    onScan (decodedText, decodedResult) {
      const code = decodedText;
      this.search_input = code;
      this.search();
      this.$bvModal.hide('open_scan');
    },
    


    async loadStripe_payment() {
      this.stripe = await loadStripe(`${this.stripe_key}`);
      const elements = this.stripe.elements();

      this.cardElement = elements.create("card", {
        classes: {
          base:
            "bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 p-3 leading-8 transition-colors duration-200 ease-in-out"
        }
      });

      this.cardElement.mount("#card-element");
    },

     handleFocus() {
      this.focused = true
    },

    handleBlur() {
      this.focused = false
    },

    async Selected_customer(selectedClientId) {
      this.payment.payment_method_id = 2;
      this.savedPaymentMethods= [];
      this.hasSavedPaymentMethod= false;
      this.useSavedPaymentMethod= false;
      this.selectedCard=null;
      this.card_id='';
      this.is_new_credit_card= false;
      this.submit_showing_credit_card= false;
      this.selectedClientPoints = 0;
      this.discount_from_points = 0;
      this.used_points = 0;
      this.clientIsEligible = false;
      this.pointsConverted = false; // 👈 Reset conversion state
      this.sale.discount = 0;       // 👈 Reset applied discount

      const client = this.clients.find(c => c.id === selectedClientId);
      if (client) {
        this.client_name = client.name;
        this.selectedClientId = selectedClientId;
        this.sale.client_id = selectedClientId;

        if (client.preferred_transport) {
          this.sale.transporter_name = client.preferred_transport;
        } else {
          this.sale.transporter_name = "";
        }
        this.updateNote();

        try {
          const response = await axios.get(`/get_points_client/${selectedClientId}`);
          const data = response.data;

          if (data.is_royalty_eligible) {
            this.selectedClientPoints = data.points;
            this.clientIsEligible = true;
          } else {
            this.selectedClientPoints = 0;
            this.clientIsEligible = false;
          }
        } catch (error) {
          console.error('Error fetching client points:', error);
        }

      }

      // ✅ Recalculate totals after client change
      this.CalculTotal();
    },

    Selected_Transport(value) {
      if (value === null) {
        this.sale.transporter_name = "";
      } else {
        this.sale.transporter_name = value;
      }
      this.updateNote();
    },

    updateNote() {
      let transporter = this.sale.transporter_name ? this.sale.transporter_name + " " : "";
      let lr_val = this.sale.lr_number ? this.sale.lr_number : "";
      let note = transporter + "LR: " + lr_val + "\n";

      const warehouse = this.warehouses.find(w => w.id === this.sale.warehouse_id);
      if (warehouse && warehouse.shortcut) {
        note += warehouse.shortcut + ":";
      }
      this.sale.notes = note;
    },


    convertPointsToDiscount() {
      if (this.pointsConverted) {
        // Reset conversion
        this.discount_from_points = 0;
        this.used_points = 0;
        this.sale.discount = 0;
        this.pointsConverted = false;
      } else {
        // Calculate discount based on conversion rate
        const discount = this.selectedClientPoints * this.point_to_amount_rate;

        this.discount_from_points = discount;
        this.sale.discount = discount;
        this.used_points = this.selectedClientPoints;
        this.pointsConverted = true;
      }

      this.CalculTotal(); // Recalculate grand total
    },
    

     //---------------------- Event Select Payment Method ------------------------------\\

    async Selected_PaymentMethod(value) {
      if (value == '1' || value == 1) {
        this.savedPaymentMethods = [];
        this.submit_showing_credit_card = true;
        this.selectedCard = null
        this.card_id = '';
        // Check if the customer has saved payment methods
        await axios.get(`/retrieve-customer?customerId=${this.selectedClientId}`)
            .then(response => {
                // If the customer has saved payment methods, display them
                this.savedPaymentMethods = response.data.data;
                this.card_id = response.data.customer_default_source;
                this.hasSavedPaymentMethod = true;
                this.useSavedPaymentMethod = true;
                this.is_new_credit_card = false;
                this.submit_showing_credit_card = false;
            })
            .catch(error => {
                // If the customer does not have saved payment methods, show the card element for them to enter their payment information
                this.hasSavedPaymentMethod = false;
                this.useSavedPaymentMethod = false;
                this.is_new_credit_card = true;
                this.card_id = '';

                setTimeout(() => {
                    this.loadStripe_payment();
                }, 1000);
                this.submit_showing_credit_card = false;
            });

         
        }else{
          this.hasSavedPaymentMethod = false;
          this.useSavedPaymentMethod = false;
          this.is_new_credit_card = false;
        }

    },

    show_saved_credit_card() {
      this.hasSavedPaymentMethod = true;
      this.useSavedPaymentMethod = true;
      this.is_new_credit_card = false;
       this.Selected_PaymentMethod(1);
    },

    show_new_credit_card() {
      this.selectedCard = null;
      this.card_id = '';
      this.useSavedPaymentMethod = false;
      this.hasSavedPaymentMethod = false;
      this.is_new_credit_card = true;

      setTimeout(() => {
        this.loadStripe_payment();
      }, 500);
    },

    selectCard(card) {
      this.selectedCard = card;
      this.card_id = card.card_id;
    },


     //---------------------- Event Select Status ------------------------------\\

     Selected_Status(value){
      if (value != "completed") {
        this.payment.status = 'pending';
      }
    
    },

    //---------------------- Event Select Payment Status ------------------------------\\

    Selected_PaymentStatus(value){
      if (value == "paid") {
        var payment_amount = this.GrandTotal.toFixed(2);
        this.payment.amount = this.formatNumber(payment_amount, 2);
        this.payment.received_amount = this.formatNumber(payment_amount, 2);
      }else{
        this.payment.amount = 0;
        this.payment.received_amount = 0;
      }
    },

    //---------- keyup paid Amount

    Verified_paidAmount() {
      if (isNaN(this.payment.amount)) {
        this.payment.amount = 0;
      } else if (this.payment.amount > this.payment.received_amount) {
          this.makeToast(
            "warning",
            this.$t("Paying_amount_is_greater_than_Received_amount"),
            this.$t("Warning")
          );
          this.payment.amount = 0;
      } 
      else if (this.payment.amount > this.GrandTotal) {
        this.makeToast(
          "warning",
          this.$t("Paying_amount_is_greater_than_Grand_Total"),
          this.$t("Warning")
        );
        this.payment.amount = 0;
      }
    },

    //---------- keyup Received Amount

    Verified_Received_Amount() {
      if (isNaN(this.payment.received_amount)) {
        this.payment.received_amount = 0;
      } 
    },


  
    //--- Submit Validate Create Sale
    Submit_Sale() {
      this.$refs.create_sale.validate().then(success => {
        if (!success) {
          this.makeToast(
            "danger",
            this.$t("Please_fill_the_form_correctly"),
            this.$t("Failed")
          );
        } else if (this.payment.amount > this.payment.received_amount) {
          this.makeToast(
            "warning",
            this.$t("Paying_amount_is_greater_than_Received_amount"),
            this.$t("Warning")
          );
          this.payment.received_amount = 0;
        }
          else if (this.payment.amount > this.GrandTotal) {
            this.makeToast(
              "warning",
              this.$t("Paying_amount_is_greater_than_Grand_Total"),
              this.$t("Warning")
            );
            this.payment.amount = 0;
          }else{
            this.Create_Sale();
          }
      });
    },
    //---Submit Validation Update Detail
    submit_Update_Detail() {
      this.$refs.Update_Detail.validate().then(success => {
        if (!success) {
          return;
        } else {
          this.Update_Detail();
        }
      });
    },
    //---Validate State Fields
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },

    //------ Toast
    makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    },

    //---------------------- get_units ------------------------------\\
    get_units(value) {
      axios
        .get("get_units?id=" + value)
        .then(({ data }) => (this.units = data));
    },

    //------ Show Modal Update Detail Product
    Modal_Updat_Detail(detail) {
      NProgress.start();
      NProgress.set(0.1);
      this.detail = {};
      this.get_units(detail.product_id);
      this.detail.detail_id = detail.detail_id;
      this.detail.sale_unit_id = detail.sale_unit_id;
      this.detail.product_type = detail.product_type;
      this.detail.name = detail.name;
      this.detail.Unit_price = detail.Unit_price;
      this.detail.fix_price = detail.fix_price;
      this.detail.fix_stock = detail.fix_stock;
      this.detail.stock = detail.stock;
      this.detail.tax_method = detail.tax_method;
      this.detail.discount_Method = detail.discount_Method;
      this.detail.discount = detail.discount;
      this.detail.quantity = detail.quantity;
      this.detail.tax_percent = detail.tax_percent;
      this.detail.is_imei = detail.is_imei;
      this.detail.imei_number = detail.imei_number;

       setTimeout(() => {
        NProgress.done();
        this.$bvModal.show("form_Update_Detail");
      }, 1000);
    },


    //------ Submit Update Detail Product

    Update_Detail() {
      NProgress.start();
      NProgress.set(0.1);
      this.Submit_Processing_detail = true;
      for (var i = 0; i < this.details.length; i++) {
        if (this.details[i].detail_id === this.detail.detail_id) {

          // this.convert_unit();
           for(var k=0; k<this.units.length; k++){
              if (this.units[k].id == this.detail.sale_unit_id) {
                if(this.units[k].operator == '/'){
                  this.details[i].stock       = this.detail.fix_stock  * this.units[k].operator_value;
                  this.details[i].unitSale    = this.units[k].ShortName;

                }else{
                  this.details[i].stock       = this.detail.fix_stock  / this.units[k].operator_value;
                  this.details[i].unitSale    = this.units[k].ShortName;
                }
              }
            }

                      
          this.details[i].Unit_price = this.detail.Unit_price;
          this.details[i].tax_percent = this.detail.tax_percent;
          this.details[i].tax_method = this.detail.tax_method;
          this.details[i].discount_Method = this.detail.discount_Method;
          this.details[i].discount = this.detail.discount;
          this.details[i].sale_unit_id = this.detail.sale_unit_id;
          this.details[i].imei_number = this.detail.imei_number;
          this.details[i].product_type = this.detail.product_type;

          if (this.details[i].discount_Method == "2") {
            //Fixed
            this.details[i].DiscountNet = this.details[i].discount;
          } else {
            //Percentage %
            this.details[i].DiscountNet = parseFloat(
              (this.details[i].Unit_price * this.details[i].discount) / 100
            );
          }

          if (this.details[i].tax_method == "1") {
            //Exclusive
            this.details[i].Net_price = parseFloat(
              this.details[i].Unit_price - this.details[i].DiscountNet
            );

            this.details[i].taxe = parseFloat(
              (this.details[i].tax_percent *
                (this.details[i].Unit_price - this.details[i].DiscountNet)) /
                100
            );
          } else {
            //Inclusive
            this.details[i].taxe = parseFloat(
              (this.details[i].Unit_price - this.details[i].DiscountNet) *
                (this.details[i].tax_percent / 100)
            );

            this.details[i].Net_price = parseFloat(
              this.details[i].Unit_price -
                this.details[i].taxe -
                this.details[i].DiscountNet
            );
          }

          this.$forceUpdate();
        }
      }
      this.CalculTotal();

      setTimeout(() => {
        NProgress.done();
        this.Submit_Processing_detail = false;
        this.$bvModal.hide("form_Update_Detail");
      }, 1000);

    },



    Manual_Amount_Update(detail) {
      this.CalculTotal();
    },

    Quick_Product_Select(product) {
      if (product) {
        this.SearchProduct(product);
        this.selectedProductId = null;
      }
    },
    search(){
      if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
      }
      if (this.search_input.length < 2) {
        return this.product_filter= [];
      }
      if (this.sale.warehouse_id != "" &&  this.sale.warehouse_id != null) {
        this.timer = setTimeout(() => {

          let barcode = this.search_input.trim();
          let weight = null;
          // Check if the barcode is from a weighing scale (13 digits)
          if (barcode.length === 13 && !isNaN(barcode)) {
            // Find the product by product code
            let product = this.products.find(prod => prod.code === barcode);
            if (product) {
              this.SearchProduct(product, weight);
              return;
            }else{

              let productCode = barcode.substring(0, 7); // First 7 digits → Product Code
              let weight = parseFloat(barcode.substring(7, 12)) / 1000; // Convert weight (grams to kg)
              let product = this.products.find(prod => prod.code === productCode);
              if (product) {
                product.quantity = weight; // Assign weight to product
                this.SearchProduct(product, weight);
                return;
              }
            }

            this.makeToast("danger", "Invalid product code scanned", this.$t("Error"));
            this.search_input= '';
            this.$refs.product_autocomplete.value = "";
            this.product_filter = [];
          }
          // else{
          //   //  No product found - Display Error Alert
          //   this.makeToast("danger", "Invalid product code scanned", this.$t("Error"));
          //   this.search_input= '';
          //   this.$refs.product_autocomplete.value = "";
          //   this.product_filter = [];

          // }
          
          
          // Regular product search (for non-weighing scale barcodes)
          const product_filter = this.products.filter(product => product.code === this.search_input || product.barcode.includes(this.search_input));
              if(product_filter.length === 1){
                this.SearchProduct(product_filter[0], weight);
              }else {
                this.product_filter=  this.products.filter(product => {
                  return (
                    product.name.toLowerCase().includes(this.search_input.toLowerCase()) ||
                    product.code.toLowerCase().includes(this.search_input.toLowerCase()) ||
                    product.barcode.toLowerCase().includes(this.search_input.toLowerCase())
                    );
                });
            }
        }, 800);
      } else {
        this.makeToast(
          "warning",
          this.$t("SelectWarehouse"),
          this.$t("Warning")
        );
      }
    },

    Get_Queued_Qty(product_id, variant_id) {
      let total = 0;
      this.sale_queue.forEach(sale => {
        sale.details.forEach(detail => {
          if (detail.product_id === product_id && detail.product_variant_id === variant_id) {
            total += detail.quantity;
          }
        });
      });
      return total;
    },

    //------------------------- get Result Value Search Product

    getResultValue(result) {
      const queued = this.Get_Queued_Qty(result.id, result.product_variant_id);
      const stock = result.qte_sale - queued;
      return result.code + " (" + result.name + ") [Stock: " + stock + "]";
    },

    //------------------------- Submit Search Product


    SearchProduct(result, weight = null) {
      this.product = {};
      if (
        this.details.length > 0 &&
        this.details.some(detail => detail.code === result.code)
      ) {
        this.makeToast("warning", this.$t("AlreadyAdd"), this.$t("Warning"));
      } else {
          if( result.product_type =='is_service'){
            this.product.quantity = 0;
            this.product.code = result.code;
            this.product.stock = '---';
            this.product.fix_stock = '---';
          }else{

            const queued = this.Get_Queued_Qty(result.id, result.product_variant_id);
            this.product.code = result.code;
            this.product.stock = result.qte_sale - queued;
            this.product.fix_stock = result.qte - queued;

             // Check if it's a weighing scale product
             if (weight !== null) {
              this.product.quantity = weight; // Assign extracted weight
            } else {
              this.product.quantity = 0;
            }

          }
        this.product.product_variant_id = result.product_variant_id;
        this.Get_Product_Details(result.id, result.product_variant_id);
      }

      this.search_input= '';
      this.$refs.product_autocomplete.value = "";
      this.product_filter = [];
    },

    //---------------------- Event Select Warehouse ------------------------------\\
    Selected_Warehouse(value) {
      this.search_input= '';
      this.product_filter = [];
      this.Get_Products_By_Warehouse(value);
      this.updateNote();
    },

     //------------------------------------ Get Products By Warehouse -------------------------\\

    Get_Products_By_Warehouse(id) {
      // Start the progress bar.
        NProgress.start();
        NProgress.set(0.1);
      axios
        .get("get_Products_by_warehouse/" + id + "?stock=" + 1 + "&is_sale=" + 1 + "&product_service=" + 1 + "&product_combo=" + 1)
         .then(response => {
            this.products = response.data;
             NProgress.done();

            })
          .catch(error => {
          });
    },

    //----------------------------------------- Add Product to order list -------------------------\\
    add_product() {
      if (this.details.length > 0) {
        this.Last_Detail_id();
      } else if (this.details.length === 0) {
        this.product.detail_id = 1;
      }

      this.details.push(this.product);

      this.$nextTick(() => {
        const lastIdx = this.details.length - 1;
        if (this.$refs['qtyInput_' + lastIdx] && this.$refs['qtyInput_' + lastIdx][0]) {
           this.$refs['qtyInput_' + lastIdx][0].focus();
        }
      });

      if(this.product.is_imei){
        this.Modal_Updat_Detail(this.product);
      }
    },

    //-----------------------------------Verified QTY ------------------------------\\
    Verified_Qty(detail, id) {
      for (var i = 0; i < this.details.length; i++) {
        if (this.details[i].detail_id === id) {
          if (isNaN(detail.quantity)) {
            this.details[i].quantity = 1;
          }
          this.details[i].quantity = detail.quantity;
        }
      }
      this.CalculTotal();
      this.$forceUpdate();
    },



    //------------------------------Formetted Numbers -------------------------\\
    formatNumber(number, dec) {
      const value = (typeof number === "string"
        ? number
        : number.toString()
      ).split(".");
      if (dec <= 0) return value[0];
      let formated = value[1] || "";
      if (formated.length > dec)
        return `${value[0]}.${formated.substr(0, dec)}`;
      while (formated.length < dec) formated += "0";
      return `${value[0]}.${formated}`;
    },

    //-----------------------------------------Calcul Total ------------------------------\\
    CalculTotal() {
      this.total = 0;
      for (var i = 0; i < this.details.length; i++) {
        this.details[i].subtotal = parseFloat(parseFloat(this.details[i].subtotal).toFixed(2));
        this.total = parseFloat(this.total + this.details[i].subtotal);
      }

      const total_without_discount = parseFloat(
        this.total - this.sale.discount
      );
      this.sale.TaxNet = parseFloat(
        (total_without_discount * this.sale.tax_rate) / 100
      );
      this.GrandTotal = parseFloat(
        total_without_discount + this.sale.TaxNet + this.sale.shipping
      );

      var grand_total =  this.GrandTotal.toFixed(2);
      this.GrandTotal = parseFloat(grand_total);

      if(this.payment.status == 'paid'){
          this.payment.amount = this.formatNumber(this.GrandTotal, 2);
      }

    },

    //-----------------------------------Delete Detail Product ------------------------------\\
    delete_Product_Detail(id) {
      for (var i = 0; i < this.details.length; i++) {
        if (id === this.details[i].detail_id) {
          this.details.splice(i, 1);
          this.CalculTotal();
        }
      }
    },

    //-----------------------------------verified Order List ------------------------------\\

    verifiedForm() {
      if (this.details.length <= 0) {
        this.makeToast(
          "warning",
          this.$t("AddProductToList"),
          this.$t("Warning")
        );
        return false;
      } else {
        var count = 0;
        for (var i = 0; i < this.details.length; i++) {
          if (
            this.details[i].quantity == "" ||
            this.details[i].quantity === 0
          ) {
            count += 1;
          }
        }

        if (count > 0) {
          this.makeToast("warning", this.$t("AddQuantity"), this.$t("Warning"));

          return false;
        } else {
          return true;
        }
      }
    },

    //---------- keyup OrderTax
    keyup_OrderTax() {
      if (isNaN(this.sale.tax_rate)) {
        this.sale.tax_rate = 0;
      } else if(this.sale.tax_rate == ''){
         this.sale.tax_rate = 0;
        this.CalculTotal();
      }else {
        this.CalculTotal();
      }
    },

    //---------- keyup Discount

    keyup_Discount() {
      if (isNaN(this.sale.discount)) {
        this.sale.discount = 0;
      } else if(this.sale.discount == ''){
         this.sale.discount = 0;
        this.CalculTotal();
      }else {
        this.CalculTotal();
      }
    },

    //---------- keyup Shipping

    keyup_Shipping() {
      if (isNaN(this.sale.shipping)) {
        this.sale.shipping = 0;
      } else if(this.sale.shipping == ''){
         this.sale.shipping = 0;
        this.CalculTotal();
      }else {
        this.CalculTotal();
      }
    },

    async processPayment() {
      this.paymentProcessing = true;
      const { token, error } = await this.stripe.createToken(
        this.cardElement
      );
      if (error) {
        this.paymentProcessing = false;
        NProgress.done();
        this.makeToast("danger", this.$t("InvalidData"), this.$t("Failed"));
      } else {
        axios
          .post("sales", {
            date: this.sale.date,
            client_id: this.selectedClientId,
            warehouse_id: this.sale.warehouse_id,
            statut: this.sale.statut,
            notes: this.sale.notes,
            tax_rate: this.sale.tax_rate?this.sale.tax_rate:0,
            TaxNet: this.sale.TaxNet?this.sale.TaxNet:0,
            discount: this.sale.discount?this.sale.discount:0,
            shipping: this.sale.shipping?this.sale.shipping:0,
            GrandTotal: this.GrandTotal,
            details: this.details,
            payment: this.payment,
            amount: parseFloat(this.payment.amount).toFixed(2),
            received_amount: parseFloat(this.payment.received_amount).toFixed(2),
            change: parseFloat(this.payment.received_amount - this.payment.amount).toFixed(2),
            token: token.id,
            is_new_credit_card: this.is_new_credit_card,
            selectedCard: this.selectedCard,
            card_id: this.card_id,
            discount_from_points: this.discount_from_points,
            used_points: this.used_points,
          })
          .then(response => {
            this.paymentProcessing = false;
            this.makeToast(
              "success",
              this.$t("Successfully_Created"),
              this.$t("Success")
            );
            NProgress.done();
            this.$router.push({ name: "index_sales" });
          })
          .catch(error => {
            this.paymentProcessing = false;
            NProgress.done();
            this.makeToast("danger", this.$t("InvalidData"), this.$t("Failed"));
          });
      }
    },

    resizeTextarea() {
      const element = this.$refs.noteTextarea;
      element.style.height = "auto";
      element.style.height = element.scrollHeight + "px";
    },
    Create_Sale() {
      if (this.verifiedForm()) {
        // Start the progress bar.
        NProgress.start();
        NProgress.set(0.1);
        if ((this.payment.payment_method_id == "1" || this.payment.payment_method_id == 1) && this.is_new_credit_card) {
          if(this.stripe_key != ''){
            this.processPayment();
          }else{
            this.makeToast("danger", this.$t("credit_card_account_not_available"), this.$t("Failed"));
            NProgress.done();
          }
        }else{
          this.paymentProcessing = true;
          axios
            .post("sales", {
              date: this.sale.date,
              client_id: this.selectedClientId,
              warehouse_id: this.sale.warehouse_id,
              statut: this.sale.statut,
              notes: this.sale.notes,
              tax_rate: this.sale.tax_rate?this.sale.tax_rate:0,
              TaxNet: this.sale.TaxNet?this.sale.TaxNet:0,
              discount: this.sale.discount?this.sale.discount:0,
              shipping: this.sale.shipping?this.sale.shipping:0,
              GrandTotal: this.GrandTotal,
              details: this.details,
              payment: this.payment,
              amount: parseFloat(this.payment.amount).toFixed(2),
              received_amount: parseFloat(this.payment.received_amount).toFixed(2),
              change: parseFloat(this.payment.received_amount - this.payment.amount).toFixed(2),
              is_new_credit_card: this.is_new_credit_card,
              selectedCard: this.selectedCard,
              card_id: this.card_id,
              discount_from_points: this.discount_from_points,
              used_points: this.used_points,
            })
            .then(response => {
              this.makeToast(
                "success",
                this.$t("Successfully_Created"),
                this.$t("Success")
              );
              NProgress.done();
              this.paymentProcessing = false;
              this.$router.push({ name: "index_sales" });
            })
            .catch(error => {
              NProgress.done();
              this.paymentProcessing = false;
              this.makeToast(
                "danger",
                this.$t("InvalidData"),
                this.$t("Failed")
              );
            });
        }
      }
    },

    //--------------------------------- Add Sale to Queue -------------------------\\
    Add_To_Queue() {
      this.$refs.create_sale.validate().then(success => {
        if (!success) {
          this.makeToast(
            "danger",
            this.$t("Please_fill_the_form_correctly"),
            this.$t("Failed")
          );
        } else if (this.details.length <= 0) {
          this.makeToast("warning", this.$t("AddProductToList"), this.$t("Warning"));
        } else {
          // Clone the current sale and its details
          const sale_to_add = {
            date: this.sale.date,
            client_id: this.selectedClientId,
            client_name: this.clients.find(c => c.id === this.selectedClientId).name,
            warehouse_id: this.sale.warehouse_id,
            warehouse_name: this.warehouses.find(w => w.id === this.sale.warehouse_id).name,
            statut: this.sale.statut,
            notes: this.sale.notes,
            tax_rate: this.sale.tax_rate ? this.sale.tax_rate : 0,
            TaxNet: this.sale.TaxNet ? this.sale.TaxNet : 0,
            discount: this.sale.discount ? this.sale.discount : 0,
            shipping: this.sale.shipping ? this.sale.shipping : 0,
            GrandTotal: this.GrandTotal,
            details: JSON.parse(JSON.stringify(this.details)),
            payment: JSON.parse(JSON.stringify(this.payment)),
            discount_from_points: this.discount_from_points,
            used_points: this.used_points,
          };

          this.sale_queue.push(sale_to_add);

          // Reset specific parts of the form but keep Warehouse and Date
          this.details = [];
          this.selectedClientId = null;
          this.sale.client_id = "";
          this.sale.notes = "";
          this.sale.transporter_name = "";
          this.sale.lr_number = "";
          this.sale.discount = 0;
          this.sale.shipping = 0;
          this.payment = {
            status: "pending",
            payment_method_id: "2",
            amount: "",
            received_amount: "",
            account_id: "",
          };
          this.discount_from_points = 0;
          this.used_points = 0;
          this.CalculTotal();
          
          this.makeToast("success", "Sale added to queue", "Success");
          
          this.$nextTick(() => {
            if (this.$refs.customer_select) {
              const input = this.$refs.customer_select.$el.querySelector('input');
              if (input) input.focus();
            }
          });
        }
      });
    },

    //--------------------------------- Remove from Queue -------------------------\\
    Remove_From_Queue(index) {
      this.sale_queue.splice(index, 1);
    },

    //--------------------------------- Submit Bulk Sales -------------------------\\
    Submit_Bulk_Sales() {
      if (this.sale_queue.length <= 0) {
        this.makeToast("warning", "Queue is empty", "Warning");
        return;
      }

      NProgress.start();
      NProgress.set(0.1);
      this.is_bulk_processing = true;

      axios
        .post("sales/bulk", {
          sales: this.sale_queue
        })
        .then(response => {
          this.makeToast(
            "success",
            "All sales processed successfully",
            this.$t("Success")
          );
          NProgress.done();
          this.is_bulk_processing = false;
          this.sale_queue = [];
          this.$router.push({ name: "index_sales" });
        })
        .catch(error => {
          NProgress.done();
          this.is_bulk_processing = false;
          this.makeToast("danger", "Bulk processing failed", this.$t("Failed"));
        });
    },

    onGridCustomerChange(index) {
      this.$nextTick(() => {
        const refName = 'row_product_' + index + '_0';
        if (this.$refs[refName] && this.$refs[refName][0]) {
          this.$refs[refName][0].$el.querySelector('input').focus();
        }
      });
    },

    addNewRow() {
      this.spreadsheetRows.push({
        client_id: null,
        note: this.generateAutoNote(),
        items: [{
          product_data: null,
          product_id: null,
          variant_id: null,
          quantity: null,
          amount: null,
          sale_unit_id: null,
          tax_method: null,
          tax_percent: null
        }]
      });
      this.$nextTick(() => {
        const nextIndex = this.spreadsheetRows.length - 1;
        if (this.$refs['row_client_' + nextIndex]) {
           this.$refs['row_client_' + nextIndex][0].$el.querySelector('input').focus();
        }
      });
    },

    addItem(rowIndex) {
      this.spreadsheetRows[rowIndex].items.push({
        product_data: null,
        product_id: null,
        variant_id: null,
        quantity: null,
        amount: null,
        sale_unit_id: null,
        tax_method: null,
        tax_percent: null
      });
      this.$nextTick(() => {
        const nextItemIndex = this.spreadsheetRows[rowIndex].items.length - 1;
        const refName = 'row_product_' + rowIndex + '_' + nextItemIndex;
        if (this.$refs[refName] && this.$refs[refName][0]) {
          this.$refs[refName][0].$el.querySelector('input').focus();
        }
      });
    },

    removeItem(rowIndex, itemIndex) {
      if (this.spreadsheetRows[rowIndex].items.length > 1) {
        this.spreadsheetRows[rowIndex].items.splice(itemIndex, 1);
      }
    },

    generateAutoNote() {
      let note = "";
      
      // Warehouse specific prefix first
      const warehouse = this.warehouses.find(w => w.id === this.sale.warehouse_id);
      if (warehouse && warehouse.shortcut) {
        note += warehouse.shortcut + ": ";
      }
      
      if (this.sale.transporter_name) note += this.sale.transporter_name + " ";
      
      // Always show LR: even if number is empty, or show the number if exists
      note += "LR: " + (this.sale.lr_number ? this.sale.lr_number : "") + " ";
      
      return note.trim();
    },

    onGridProductChange(rowIndex, itemIndex) {
      const row = this.spreadsheetRows[rowIndex];
      const item = row.items[itemIndex];
      if (item.product_data) {
        item.product_id = item.product_data.id;
        item.variant_id = item.product_data.product_variant_id || null;
        item.amount = item.product_data.Net_price;
        
        // Auto-fill note if it's currently empty or just the default
        if (!row.note || row.note === "") {
          row.note = this.generateAutoNote();
        }
        
        // Fetch full product details required by the backend
        axios.get("/show_product_data/" + item.product_id + "/" + item.variant_id).then(response => {
          item.sale_unit_id = response.data.sale_unit_id;
          item.tax_method = response.data.tax_method;
          item.tax_percent = response.data.tax_percent;
        });

        this.$nextTick(() => {
          const refName = 'row_qty_' + rowIndex + '_' + itemIndex;
          if (this.$refs[refName] && this.$refs[refName][0]) {
            this.$refs[refName][0].focus();
          }
        });
      }
    },

    focusNextCell(index, itemIndex, type) {
      this.$nextTick(() => {
        if (type === 'note') {
          const refName = 'row_note_' + index;
          if (this.$refs[refName]) {
             if (this.$refs[refName][0]) {
                this.$refs[refName][0].focus();
             } else {
                this.$refs[refName].focus();
             }
          }
        } else {
          const refName = 'row_' + type + '_' + index + '_' + itemIndex;
          if (this.$refs[refName] && this.$refs[refName][0]) {
            this.$refs[refName][0].focus();
          }
        }
      });
    },

    moveToNextRow(index) {
      if (index === this.spreadsheetRows.length - 1) {
        this.addNewRow();
      } else {
        this.$nextTick(() => {
          const nextIndex = index + 1;
          const refName = 'row_product_' + nextIndex + '_0';
          if (this.$refs[refName] && this.$refs[refName][0]) {
             this.$refs[refName][0].$el.querySelector('input').focus();
          }
        });
      }
    },

    clearRow(index) {
      if (this.spreadsheetRows.length > 1) {
        this.spreadsheetRows.splice(index, 1);
      } else {
        this.$set(this.spreadsheetRows, 0, {
          client_id: null,
          note: this.generateAutoNote(),
          items: [{
            product_data: null,
            product_id: null,
            variant_id: null,
            quantity: null,
            amount: null,
            sale_unit_id: null,
            tax_method: null,
            tax_percent: null
          }]
        });
      }
    },

    submitSpreadsheet() {
      const validRows = this.spreadsheetRows.filter(r => r.client_id && r.items.some(item => item.product_id));
      if (validRows.length === 0) {
        this.makeToast("warning", "Please fill at least one row", "Warning");
        return;
      }

      NProgress.start();
      NProgress.set(0.1);
      this.is_bulk_processing = true;

      // Transform rows to match the backend expected format
      const salesData = validRows.map(row => {
        const validItems = row.items.filter(item => item.product_id);
        const grandTotal = validItems.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
        
        const details = validItems.map(item => {
          return {
            product_id: item.product_id,
            product_variant_id: item.variant_id,
            quantity: parseFloat(item.quantity || 0),
            Unit_price: item.quantity > 0 ? parseFloat((parseFloat(item.amount || 0) / parseFloat(item.quantity)).toFixed(2)) : 0,
            subtotal: parseFloat(parseFloat(item.amount || 0).toFixed(2)),
            discount: 0,
            taxe: 0,
            tax_percent: item.tax_percent || 0,
            tax_method: item.tax_method || 1,
            discount_Method: "1",
            sale_unit_id: item.sale_unit_id,
            imei_number: ""
          };
        });

        return {
          date: this.sale.date,
          client_id: row.client_id,
          warehouse_id: this.sale.warehouse_id,
          statut: "completed",
          notes: row.note,
          tax_rate: 0,
          TaxNet: 0,
          discount: 0,
          shipping: 0,
          GrandTotal: parseFloat(grandTotal.toFixed(2)),
          paid_amount: 0,
          payment_statut: 'unpaid',
          transporter_name: this.sale.transporter_name,
          lr_number: this.sale.lr_number,
          details: details,
          payment: {
             status: "pending",
             payment_method_id: 2,
             amount: 0,
             received_amount: 0,
             account_id: null
          }
        };
      });

      axios.post("sales/bulk", { sales: salesData })
        .then(response => {
          this.makeToast("success", "All sales saved successfully", "Success");
          NProgress.done();
          this.is_bulk_processing = false;
          this.$router.push({ name: "index_sales" });
        })
        .catch(error => {
          NProgress.done();
          this.is_bulk_processing = false;
          this.makeToast("danger", "Failed to save sales", "Failed");
        });
    },

    getClientName(id) {
      const client = this.clients.find(c => c.id === id);
      return client ? client.name : '';
    },

    getSaleItemsCount(sale) {
      return sale.details.reduce((acc, d) => acc + d.quantity, 0);
    },

    getQueueTotal() {
      const total = this.sale_queue.reduce((acc, s) => acc + s.GrandTotal, 0);
      return total.toFixed(2);
    },

    //-------------------------------- Get Last Detail Id -------------------------\\
    Last_Detail_id() {
      this.product.detail_id = 0;
      var len = this.details.length;
      this.product.detail_id = this.details[len - 1].detail_id + 1;
    },

    //---------------------------------Get Product Details ------------------------\\

    Get_Product_Details(product_id, variant_id) {
      axios.get("/show_product_data/" + product_id +"/"+ variant_id).then(response => {
        this.product.discount           = response.data.discount;
        this.product.DiscountNet        = response.data.DiscountNet;
        this.product.discount_Method    = response.data.discount_method;
        this.product.product_id = response.data.id;
        this.product.product_type = response.data.product_type;
        this.product.name = response.data.name;
        this.product.Net_price = response.data.Net_price;
        this.product.Unit_price = response.data.Unit_price;
        this.product.taxe = response.data.tax_price;
        this.product.tax_method = response.data.tax_method;
        this.product.tax_percent = response.data.tax_percent;
        this.product.unitSale = response.data.unitSale;
        this.product.fix_price = response.data.fix_price;
        this.product.sale_unit_id = response.data.sale_unit_id;
        this.product.is_imei = response.data.is_imei;
        this.product.imei_number = '';
        this.add_product();
        this.CalculTotal();
      });
    },

    //---------------------------------------Get Elements ------------------------------\\
    GetElements() {
      axios
        .get("sales/create")
        .then(response => {
          this.clients = response.data.clients;
          this.warehouses = response.data.warehouses;
          this.transporters = response.data.transporters;
          this.accounts = response.data.accounts;
          this.payment_methods = response.data.payment_methods;
          this.stripe_key = response.data.stripe_key;
          this.point_to_amount_rate = response.data.point_to_amount_rate;
          this.isLoading = false;
        })
        .catch(response => {
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        });
    }
  },

  //----------------------------- Created function-------------------
  created() {
    this.GetElements();
  }
};
</script>

<style scoped>
  .excel-container {
    padding: 20px;
    padding-bottom: 400px; /* Massive space at bottom for scrolling */
    background: #fff;
  }
  .excel-grid {
    border: 1px solid #ddd;
    border-collapse: collapse;
    width: 100%;
  }
  .excel-grid th {
    background: #f4f4f4;
    padding: 10px;
    border: 1px solid #ddd;
    font-size: 1rem;
    font-weight: 600;
  }
  .excel-grid td {
    padding: 0;
    border: 1px solid #ddd;
    min-height: 60px;
    vertical-align: middle;
  }
  .grid-input {
    width: 100%;
    height: 60px;
    border: none;
    padding: 10px;
    font-size: 1.3rem;
    outline: none;
    background: transparent;
    line-height: 1.5;
  }
  .grid-input:focus {
    background: #fff;
    box-shadow: inset 0 0 0 2px #716aca;
  }
  .grid-v-select >>> .vs__dropdown-toggle {
    border: none !important;
    background: transparent !important;
    border-radius: 0;
    min-height: 60px;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
  }
  /* Top level warehouse and date text size */
  .main-content >>> .v-select, .main-content >>> input, .main-content >>> label {
    font-size: 1.3rem !important;
  }
  .main-content >>> .vs__selected {
    font-size: 1.3rem !important;
    white-space: normal;
  }
  .grid-v-select.vs--open >>> .vs__dropdown-toggle {
    background: #fff !important;
    box-shadow: inset 0 0 0 2px #716aca;
  }
  .worksheet-grid-wrapper {
    overflow: visible;
  }
  .grid-row-item {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    height: 60px;
  }
  .grid-row-item:last-child {
    border-bottom: none;
  }
  .fill-height-input {
    height: 100%;
    min-height: 60px;
  }
  .fill-height-select >>> .vs__dropdown-toggle {
    height: 100%;
    min-height: 60px;
    display: flex;
    align-items: center;
  }
</style>

<style>

  .input-with-icon {
    display: flex;
    align-items: center;
  }

  .scan-icon {
    width: 50px; /* Adjust size as needed */
    height: 50px;
    margin-right: 8px; /* Adjust spacing as needed */
    cursor: pointer;
  }
</style>