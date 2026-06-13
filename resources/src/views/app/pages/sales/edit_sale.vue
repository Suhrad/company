<template>
  <div class="main-content">
    <breadcumb :page="$t('EditSale')" :folder="$t('ListSales')"/>
    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>

    <validation-observer ref="edit_sale" v-if="!isLoading">
      <b-form @submit.prevent="Submit_Sale">
        <b-row>
          <b-col lg="12" md="12" sm="12">
            <b-card>
              <b-row>

                <b-modal hide-footer id="open_scan" size="md" title="Barcode Scanner">
                  <qrcode-scanner
                    :qrbox="250" 
                    :fps="10" 
                    style="width: 100%; height: calc(100vh - 56px);"
                    @result="onScan"
                  />
                </b-modal>

                 <!-- date  -->
                <b-col lg="4" md="4" sm="12" class="mb-3">
                  <validation-provider
                    name="date"
                    :rules="{ required: true}"
                    v-slot="validationContext"
                  >
                    <b-form-group :label="$t('date') + ' ' + '*'">
                      <b-form-input
                        :disabled="isReadOnly"
                        :state="getValidationState(validationContext)"
                        aria-describedby="date-feedback"
                        type="date"
                        v-model="sale.date"
                      ></b-form-input>
                      <b-form-invalid-feedback
                        id="OrderTax-feedback"
                      >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>
                <!-- Customer -->
                <b-col lg="4" md="4" sm="12" class="mb-3">
                  <validation-provider name="Customer" :rules="{ required: true}">
                    <b-form-group slot-scope="{ valid, errors }" :label="$t('Customer') + ' ' + '*'">
                      <v-select
                        :disabled="isReadOnly"
                        :class="{'is-invalid': !!errors.length}"
                        :state="errors[0] ? false : (valid ? true : null)"
                        v-model="sale.client_id"
                        :reduce="label => label.value"
                        :placeholder="$t('Choose_Customer')"
                        :options="clients.map(clients => ({label: clients.name, value: clients.id}))"
                      />
                      <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>
 
                <!-- warehouse -->
                <b-col lg="4" md="4" sm="12" class="mb-3">
                  <validation-provider name="warehouse" :rules="{ required: true}">
                    <b-form-group slot-scope="{ valid, errors }" :label="$t('warehouse') + ' ' + '*'">
                      <v-select
                        :disabled="isReadOnly"
                        :class="{'is-invalid': !!errors.length}"
                        :state="errors[0] ? false : (valid ? true : null)"
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

                <!-- Transport -->
                <b-col lg="4" md="4" sm="12" class="mb-3">
                  <b-form-group :label="$t('Transport')">
                    <v-select
                      :disabled="isReadOnly"
                      v-model="sale.transporter_name"
                      @input="Selected_Transport"
                      :reduce="label => label.value"
                      :placeholder="$t('Choose_Transport')"
                      :options="transporters.map(t => ({label: t.name, value: t.name}))"
                    />
                  </b-form-group>
                </b-col>

                <!-- LR Number -->
                <b-col lg="4" md="4" sm="12" class="mb-3">
                  <b-form-group label="LR:">
                    <b-form-input
                      :disabled="isReadOnly"
                      v-model="sale.lr_number"
                      @keyup="updateNote"
                      :placeholder="$t('Enter_LR_Number')"
                    ></b-form-input>
                  </b-form-group>
                </b-col>

                  <!-- Product -->
                <b-col md="12" class="mb-5" v-if="!isReadOnly">
                  <h6>{{$t('ProductName')}}</h6>
                 

                    <div id="autocomplete" class="autocomplete">
                      <div class="input-with-icon">
                      <img src="/assets_setup/scan.png" alt="Scan" class="scan-icon" @click="showModal">
                    <input 
                     :placeholder="$t('Scan_Search_Product_by_Code_Name')"
                       @input='e => search_input = e.target.value' 
                      @keyup="search(search_input)"
                      @focus="handleFocus"
                      @blur="handleBlur"
                      ref="product_autocomplete"
                      class="autocomplete-input" />
                    </div>
                    <ul class="autocomplete-result-list" v-show="focused">
                      <li class="autocomplete-result" v-for="product_fil in product_filter" @mousedown="SearchProduct(product_fil)">{{getResultValue(product_fil)}}</li>
                    </ul>
                </div>
                </b-col>

                <!-- Order products  -->
                <b-col md="12">
                  <h5>{{$t('order_products')}} *</h5>
                  <div class="table-responsive">
                    <table class="table table-hover">
                      <thead class="bg-gray-300">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">{{$t('ProductName')}}</th>
                          <th scope="col" style="width: 250px;">{{$t('Qty')}}</th>
                          <th scope="col" style="width: 250px;">{{$t('Amount')}}</th>
                          <th scope="col" class="text-center" v-if="!isReadOnly">
                            <i class="i-Close-Window text-25"></i>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="detail in details"
                          :key="detail.detail_id"
                          >
                          <td>{{detail.detail_id}}</td>
                          <td>
                            <v-select
                              v-model="detail.product_id"
                              :disabled="isReadOnly"
                              :reduce="label => label.value"
                              :placeholder="$t('Choose_Product')"
                              :options="products.map(p => ({label: p.name + ' (' + p.code + ')', value: p.id}))"
                              @input="onGridProductChange(detail)"
                              class="grid-v-select"
                              append-to-body
                            />
                          </td>
                          <td>
                            <b-form-input
                              v-model.number="detail.quantity"
                              :disabled="isReadOnly"
                              @keyup="Verified_Qty(detail,detail.detail_id)"
                              type="text"
                              inputmode="decimal"
                              class="form-control text-center"
                              style="height: 60px; font-size: 1.8rem; font-weight: bold;"
                            ></b-form-input>
                          </td>
                          <td>
                            <b-form-input
                              v-model.number="detail.subtotal"
                              :disabled="isReadOnly"
                              @keyup="Manual_Amount_Update(detail)"
                              type="text"
                              inputmode="decimal"
                              class="form-control text-right"
                              style="height: 60px; font-size: 1.8rem; font-weight: bold;"
                            ></b-form-input>
                          </td>
                          <td class="text-center" v-if="!isReadOnly">
                            <i @click="delete_Product_Detail(detail.detail_id)" class="i-Close-Window text-25 text-danger cursor-pointer"></i>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </b-col>

                <div class="offset-md-9 col-md-3 mt-4">
                  <table class="table table-striped table-sm">
                    <tbody>
                      <tr>
                        <td>
                          <span class="font-weight-bold">{{$t('Total')}}</span>
                        </td>
                        <td>
                          <span
                            class="font-weight-bold"
                          >{{currentUser.currency}} {{GrandTotal.toFixed(2)}}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>





                <b-col md="12">
                  <b-form-group :label="$t('Note')">
                    <textarea
                      v-model="sale.notes"
                      :disabled="isReadOnly"
                      rows="4"
                      class="form-control"
                      :placeholder="$t('Afewwords')"
                    ></textarea>
                  </b-form-group>
                </b-col>
                <b-col md="12">
                  <b-form-group>
                    <b-button variant="primary" @click="Submit_Sale" :disabled="SubmitProcessing" v-if="!isReadOnly"><i class="i-Yes me-2 font-weight-bold"></i> {{$t('submit')}}</b-button>
                     <div v-once class="typo__p" v-if="SubmitProcessing">
                      <div class="spinner sm spinner-primary mt-3"></div>
                    </div>

                    <div class="mt-3" v-if="isReadOnly">
                      <b-button variant="warning" class="m-1" @click="isReadOnly = false">
                        <i class="i-Pen-2 me-2 font-weight-bold"></i> Edit
                      </b-button>
                      <b-button variant="danger" class="m-1" @click="Remove_Sale">
                        <i class="i-Close-Window me-2 font-weight-bold"></i> Delete
                      </b-button>
                      <b-button variant="success" class="m-1" @click="Invoice_PDF">
                        <i class="i-File-Copy me-2 font-weight-bold"></i> Download as PDF
                      </b-button>
                    </div>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>

    <!-- Modal Update Detail Product -->
    <validation-observer ref="Update_Detail">
      <b-modal hide-footer size="lg" id="form_Update_Detail" :title="detail.name">
        <b-form @submit.prevent="submit_Update_Detail">
          <b-row>
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
                      v-model.number="detail.tax_percent"
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

export default {
  metaInfo: {
    title: "Edit Sale"
  },
  data() {
    return {
      focused: false,
      timer:null,
      search_input:'',
      product_filter:[],
      isLoading: true,
      isReadOnly: true,
      SubmitProcessing:false,
      Submit_Processing_detail:false,
      selectedProductId: null,
      warehouses: [],
      clients: [],
      products: [],
      details: [],
      detail: {},
      sales: [],
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
        date: "",
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
      total: 0,
      GrandTotal: 0,
      product: {
        id: "",
        code: "",
        stock: "",
        quantity: 1,
        discount: "",
        DiscountNet: "",
        discount_Method: "",
        sale_unit_id: "",
        no_unit:"",
        name: "",
        unitSale: "",
        Net_price: "",
        Total_price: "",
        Unit_price: "",
        subtotal: "",
        product_id: "",
        detail_id: "",
        taxe: "",
        tax_percent: "",
        tax_method: "",
        product_variant_id: "",
        del: "",
        etat: "",
        is_imei: "",
        imei_number:"",
      }
    };
  },

  computed: {
    ...mapGetters(["currentUserPermissions","currentUser"])
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

     handleFocus() {
      this.focused = true
    },

    handleBlur() {
      this.focused = false
    },
    

    //--- Submit Validate Update Sale
    Submit_Sale() {
      this.$refs.edit_sale.validate().then(success => {
        if (!success) {
          this.makeToast(
            "danger",
            this.$t("Please_fill_the_form_correctly"),
            this.$t("Failed")
          );
        } else {
          this.Update_Sale();
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

    //---------------------------- Show Modal Update Detail Product
    Modal_Updat_Detail(detail) {
      NProgress.start();
      NProgress.set(0.1);
      this.detail = {};
      this.detail.name = detail.name;
      this.detail.detail_id = detail.detail_id;
      this.detail.Unit_price = detail.Unit_price;
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

    //---------------------------- Submit Update Detail Product

    Update_Detail() {
      NProgress.start();
      NProgress.set(0.1);
      this.Submit_Processing_detail = true;
      for (var i = 0; i < this.details.length; i++) {
        if (this.details[i].detail_id === this.detail.detail_id) {
          this.details[i].tax_percent = this.detail.tax_percent;
          this.details[i].Unit_price = this.detail.Unit_price;
          this.details[i].quantity = this.detail.quantity;
          this.details[i].tax_method = this.detail.tax_method;
          this.details[i].discount_Method = this.detail.discount_Method;
          this.details[i].discount = this.detail.discount;
          this.details[i].imei_number = this.detail.imei_number;

          if (this.details[i].discount_Method == "2") {
            //Fixed
            this.details[i].DiscountNet = this.detail.discount;
          } else {
            //Percentage %
            this.details[i].DiscountNet = parseFloat(
              (this.detail.Unit_price * this.details[i].discount) / 100
            );
          }

          if (this.details[i].tax_method == "1") {
            //Exclusive
            this.details[i].Net_price = parseFloat(
              this.detail.Unit_price - this.details[i].DiscountNet
            );

            this.details[i].taxe = parseFloat(
              (this.detail.tax_percent *
                (this.detail.Unit_price - this.details[i].DiscountNet)) /
                100
            );
          } else {
            //Inclusive
            this.details[i].taxe = parseFloat(
              (this.detail.Unit_price - this.details[i].DiscountNet) *
                (this.detail.tax_percent / 100)
            );

            this.details[i].Net_price = parseFloat(
              this.detail.Unit_price -
                this.details[i].taxe -
                this.details[i].DiscountNet
            );
          }

          this.$forceUpdate();
        }
      }
      this.Calcul_Total();

       setTimeout(() => {
        NProgress.done();
        this.Submit_Processing_detail = false;
        this.$bvModal.hide("form_Update_Detail");
      }, 1000);

    },

    Verified_Qty(detail, id) {
      if (isNaN(detail.quantity) || detail.quantity === "") {
        detail.quantity = 0;
      }
      detail.quantity = parseFloat(detail.quantity);

       // If we have a subtotal and quantity > 0, back-calculate the price to keep amount same
      if (detail.subtotal > 0 && detail.quantity > 0) {
        detail.Unit_price = parseFloat((detail.subtotal / detail.quantity).toFixed(2));
      } else {
        // Fallback: if no subtotal yet, calculate subtotal from price
        detail.subtotal = parseFloat((detail.quantity * detail.Unit_price).toFixed(2));
      }

      this.Calcul_Total();
    },

    Manual_Amount_Update(detail) {
      detail.subtotal = parseFloat(detail.subtotal || 0);
      if (detail.quantity > 0) {
        detail.Unit_price = parseFloat(detail.subtotal / detail.quantity).toFixed(2);
        detail.Unit_price = parseFloat(detail.Unit_price);
      }
      this.Calcul_Total();
    },

    Quick_Product_Select(product) {
      if (product) {
        this.SearchProduct(product);
        this.selectedProductId = null;
      }
    },
    onGridProductChange(detail) {
      const product = this.products.find(p => p.id === detail.product_id);
      if (product) {
        detail.name = product.name;
        detail.code = product.code;
        detail.Unit_price = product.Net_price;
        detail.tax_method = product.tax_method;
        detail.tax_percent = product.tax_percent;
        detail.is_imei = product.is_imei;
        
        // Fetch full details if necessary (though most are in this.products)
        axios.get("/show_product_data/" + product.id + "/" + (product.product_variant_id || "null")).then(response => {
          detail.Unit_price = response.data.Unit_price;
          detail.tax_percent = response.data.tax_percent;
          detail.tax_method = response.data.tax_method;
          detail.sale_unit_id = response.data.sale_unit_id;
          this.Verified_Qty(detail, detail.detail_id);
        });
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

    //-------------- get Result Value Search Product

    getResultValue(result) {
      return result.code + " " + "(" + result.name + ")";
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
        const discount = this.sale.used_points * this.point_to_amount_rate;

        this.discount_from_points = discount;
        this.sale.discount = discount;
        this.used_points =  this.sale.used_points;
        this.pointsConverted = true;
      }

      this.Calcul_Total(); // Recalculate grand total
    },

    //-------------- Submit Search Product


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
            }else{

              this.product.code = result.code;
              this.product.no_unit = 1;
              this.product.stock = result.qte_sale;

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

      if(this.product.is_imei){
        this.Modal_Updat_Detail(this.product);
      }
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
    Calcul_Total() {
      this.total = 0;
      for (var i = 0; i < this.details.length; i++) {
        this.details[i].subtotal = parseFloat(parseFloat(this.details[i].subtotal).toFixed(2));
        this.total = parseFloat(this.total + this.details[i].subtotal);
      }

      this.GrandTotal = this.total;

      var grand_total =  this.GrandTotal.toFixed(2);
      this.GrandTotal = parseFloat(grand_total);
    },

    //-----------------------------------Delete Detail Product ------------------------------\\
    delete_Product_Detail(id) {
      for (var i = 0; i < this.details.length; i++) {
        if (id === this.details[i].detail_id) {
          this.details.splice(i, 1);
          this.Calcul_Total();
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

    //--------------------------------- Update Sale -------------------------\\
    Update_Sale() {
      if (this.verifiedForm()) {
        this.SubmitProcessing = true;
        // Start the progress bar.
        NProgress.start();
        NProgress.set(0.1);
        let id = this.$route.params.id;
        axios
          .put(`sales/${id}`, {
            date: this.sale.date,
            client_id: this.sale.client_id,
            GrandTotal: this.GrandTotal,
            warehouse_id: this.sale.warehouse_id,
            statut: this.sale.statut,
            notes: this.sale.notes,
            tax_rate: 0,
            TaxNet: 0,
            discount: 0,
            shipping: 0,
            details: this.details,
            discount_from_points: this.discount_from_points,
            used_points: this.used_points,
            transporter_name: this.sale.transporter_name,
            lr_number: this.sale.lr_number,
          })
          .then(response => {
            this.makeToast(
              "success",
              this.$t("Successfully_Updated"),
              this.$t("Success")
            );
            NProgress.done();
            this.SubmitProcessing = false;

            this.$router.push({ name: "index_sales" });
          })
          .catch(error => {
            NProgress.done();
            this.makeToast("danger", this.$t("InvalidData"), this.$t("Failed"));
            this.SubmitProcessing = false;
          });
      }
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
        this.product.del = 0;
        this.product.id = 0;
        this.product.etat = "new";
        this.product.discount           = response.data.discount;
        this.product.DiscountNet        = response.data.DiscountNet;
        this.product.discount_Method    = response.data.discount_method;
        this.product.product_id = response.data.id;
        this.product.name = response.data.name;
        this.product.product_type = response.data.product_type;
        this.product.Net_price = response.data.Net_price;
        this.product.Unit_price = response.data.Unit_price;
        this.product.taxe = response.data.tax_price;
        this.product.tax_method = response.data.tax_method;
        this.product.tax_percent = response.data.tax_percent;
        this.product.unitSale = response.data.unitSale;
        this.product.sale_unit_id = response.data.sale_unit_id;
        this.product.is_imei = response.data.is_imei;
        this.product.imei_number = '';
        this.add_product();
        this.Calcul_Total();
      });
    },

    //--------------------------------------- Get Elements ------------------------------\\
    GetElements() {
      let id = this.$route.params.id;
      axios
        .get(`sales/${id}/edit`)
        .then(response => {
          this.sale = response.data.sale;
          this.details = response.data.details;
          this.clients = response.data.clients;
          this.warehouses = response.data.warehouses;
          this.transporters = response.data.transporters;
          this.point_to_amount_rate = response.data.point_to_amount_rate;
          this.discount_from_points = response.data.discount_from_points;
          this.used_points = this.sale.used_points > 0?this.sale.used_points:0;
          this.pointsConverted = this.sale.used_points > 0;
          this.Get_Products_By_Warehouse(this.sale.warehouse_id);
          this.Calcul_Total();
          this.isLoading = false;
        })
        .catch(response => {
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        });
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
      if (warehouse) {
        let shortform = "";
        const name = warehouse.name.toUpperCase();
        if (name.includes("SHANTI")) shortform = "STM";
        else if (name.includes("NIMAR")) shortform = "NP";
        else if (name.includes("SARAL")) shortform = "SL";
        else if (name.includes("SARVESHWAR")) shortform = "SP";

        if (shortform) {
          note += shortform + ":";
        }
      }
      this.sale.notes = note;
    },

    //------------------------------------------ Remove Sale ------------------------------\\
    Remove_Sale() {
      this.$swal({
        title: this.$t("Delete_Title"),
        text: this.$t("Delete_Text"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: this.$t("Delete_cancelButtonText"),
        confirmButtonText: this.$t("Delete_confirmButtonText")
      }).then(result => {
        if (result.value) {
          // Start the progress bar.
          NProgress.start();
          NProgress.set(0.1);
          axios
            .delete("sales/" + this.$route.params.id)
            .then(() => {
              this.$swal(
                this.$t("Delete_Deleted"),
                this.$t("Deleted_in_successfully"),
                "success"
              );
              this.$router.push({ name: "index_sales" });
            })
            .catch(() => {
              // Complete the animation of the  progress bar.
              setTimeout(() => NProgress.done(), 500);
              this.$swal(
                this.$t("Delete_Failed"),
                this.$t("Delete_Therewassomethingwronge"),
                "warning"
              );
            });
        }
      });
    },

    //------------------------------------------ Invoice PDF ------------------------------\\
    Invoice_PDF() {
      // Start the progress bar.
      NProgress.start();
      NProgress.set(0.1);
      axios
        .get("sale_pdf/" + this.$route.params.id, {
          responseType: "blob", // important
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Sale-" + this.sale.Ref + ".pdf");
          document.body.appendChild(link);
          link.click();
          // Complete the animation of the  progress bar.
          setTimeout(() => NProgress.done(), 500);
        })
        .catch(() => {
          // Complete the animation of the  progress bar.
          setTimeout(() => NProgress.done(), 500);
        });
    },
  },

  //----------------------------- Created function-------------------
  created() {
    this.GetElements();
  }
};
</script>

<style scoped>
  .main-content, .main-content label, .main-content input, .main-content .v-select, .main-content .table, .main-content .badge {
    font-size: 1.3rem !important;
  }
  .main-content h5, .main-content h6 {
    font-size: 1.3rem !important;
  }
  .main-content .form-control {
    height: calc(1.5em + 1.1rem + 2px) !important;
    font-size: 1.1rem !important;
  }
  .auto-expand {
    height: auto !important;
    min-height: 100px !important;
    overflow-y: hidden !important;
    resize: none !important;
  }
  .autocomplete-result {
    font-size: 1.1rem !important;
  }
  .badge {
    padding: 0.4em 0.7em !important;
  }
  .scan-icon {
    width: 50px !important;
    height: 50px !important;
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