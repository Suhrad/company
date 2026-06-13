<template>
  <div class="main-content">
    <breadcumb :page="$t('EditTransfer')" :folder="$t('ListTransfers')"/>
    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>

    <validation-observer ref="Edit_transfer" v-if="!isLoading">
      <b-form @submit.prevent="Submit_Transfer">
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
                        :state="getValidationState(validationContext)"
                        aria-describedby="date-feedback"
                        type="date"
                        v-model="transfer.date"
                      ></b-form-input>
                      <b-form-invalid-feedback
                        id="OrderTax-feedback"
                      >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>
                <!-- From warehouse -->
                <b-col lg="4" md="4" sm="12" class="mb-3">
                  <validation-provider name="From Warehouse" :rules="{ required: true}">
                    <b-form-group slot-scope="{ valid, errors }" :label="$t('FromWarehouse') + ' ' + '*'">
                      <v-select
                        :class="{'is-invalid': !!errors.length}"
                        :state="errors[0] ? false : (valid ? true : null)"
                        :disabled="details.length > 0"
                        @input="Selected_From_Warehouse"
                        v-model="transfer.from_warehouse"
                        :reduce="label => label.value"
                        :placeholder="$t('Choose_Warehouse')"
                        :options="warehouses.map(warehouses => ({label: warehouses.name, value: warehouses.id}))"
                      />
                      <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- To warehouse -->
                <b-col lg="4" md="4" sm="12" class="mb-3">
                  <validation-provider name="To Warehouse" :rules="{ required: true}">
                    <b-form-group slot-scope="{ valid, errors }" :label="$t('ToWarehouse') + ' ' + '*'">
                      <v-select
                        :class="{'is-invalid': !!errors.length}"
                        :state="errors[0] ? false : (valid ? true : null)"
                        v-model="transfer.to_warehouse"
                        :reduce="label => label.value"
                        :placeholder="$t('Choose_Warehouse')"
                        :options="to_warehouses.map(to_warehouses => ({label: to_warehouses.name, value: to_warehouses.id}))"
                      />
                      <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>



                <!-- Product Search (Standard) -->
                <b-col md="12" class="mb-5">
                  <h6>{{$t('ProductName')}}</h6>
                  <div id="autocomplete" class="autocomplete">
                    <div class="input-with-icon">
                      <img src="/assets_setup/scan.png" alt="Scan" class="scan-icon" @click="showModal('standard')">
                    <input 
                      :placeholder="$t('Scan_Search_Product_by_Code_Name')"
                      @input='e => search_input = e.target.value' 
                      @keyup="search('standard', search_input)"
                      ref="product_autocomplete"
                      class="autocomplete-input" />
                    </div>
                    <ul class="autocomplete-result-list" v-show="focused">
                      <li class="autocomplete-result" v-for="product_fil in product_filter" @mousedown="SearchProduct('standard', product_fil)">{{getResultValue(product_fil)}}</li>
                    </ul>
                  </div>
                </b-col>

                <!-- Standard Table -->
                <b-col md="12">
                   <div class="table-responsive">
                      <table class="table table-hover table-sm">
                        <thead class="bg-gray-300">
                          <tr>
                            <th>{{$t('ProductName')}}</th>
                            <th class="text-right">{{$t('Qty')}}</th>
                            <th class="text-center"><i class="fa fa-trash"></i></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in details" :key="index">
                            <td>
                              <span class="font-weight-bold">{{item.name}}</span><br>
                              <small class="text-muted">{{item.code}} | Stock: {{item.stock}}</small>
                            </td>
                            <td width="150">
                              <b-form-input
                                v-model.number="item.quantity"
                                type="number"
                                class="text-right font-weight-bold"
                                style="height: 50px; font-size: 1.4rem;"
                                @keyup="Calcul_Total"
                              ></b-form-input>
                            </td>
                            <td class="text-center">
                              <a @click="delete_Product_Detail(item.detail_id)" class="btn btn-icon btn-sm"><i class="i-Close-Window text-20 text-danger"></i></a>
                            </td>
                          </tr>
                          <tr v-if="details.length == 0">
                            <td colspan="3" class="text-center py-4 text-muted">No materials added.</td>
                          </tr>
                        </tbody>
                      </table>
                   </div>
                </b-col>

                <b-col md="12" class="mt-5">
                  <b-form-group :label="$t('Note')">
                    <textarea
                      v-model="transfer.notes"
                      rows="3"
                      ref="noteTextarea"
                      @input="resizeTextarea"
                      class="form-control auto-expand"
                      :placeholder="$t('Afewwords')"
                    ></textarea>
                  </b-form-group>
                </b-col>

                <b-col md="12">
                  <b-form-group>
                    <b-button variant="primary" size="lg" @click="Submit_Transfer" :disabled="SubmitProcessing" class="mr-3">
                      <i class="i-Edit me-2 font-weight-bold"></i> {{$t('submit')}}
                    </b-button>

                    <div v-once class="typo__p" v-if="SubmitProcessing">
                      <div class="spinner sm spinner-primary mt-3"></div>
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
    <validation-observer ref="Update_Detail_transfer">
      <b-modal hide-footer size="md" id="form_Update_Detail" :title="detail.name">
        <b-form @submit.prevent="submit_Update_Detail">
          <b-row>
            <!-- Unit Cost -->
            <b-col lg="12" md="12" sm="12">
              <validation-provider
                name="Product Cost"
                :rules="{ required: true , regex: /^\d*\.?\d*$/}"
                v-slot="validationContext"
              >
                <b-form-group :label="$t('ProductCost') + ' ' + '*'" id="cost-input">
                  <b-form-input
                    label="Product Cost"
                    v-model.number="detail.Unit_cost"
                    :state="getValidationState(validationContext)"
                    aria-describedby="cost-feedback"
                  ></b-form-input>
                  <b-form-invalid-feedback id="cost-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Tax Method -->
            <b-col lg="12" md="12" sm="12">
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
            <b-col lg="12" md="12" sm="12">
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
            <b-col lg="12" md="12" sm="12">
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
            <b-col lg="12" md="12" sm="12">
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

            <b-col md="12">
              <b-form-group>
                <b-button variant="primary" type="submit"><i class="i-Yes me-2 font-weight-bold"></i> {{$t('submit')}}</b-button>
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
    title: "Update Job Work / Transfer"
  },
  data() {
    return {
      focused: false,
      focused_input: false,
      focused_output: false,
      timer: null,
      search_input: '',
      search_input_input: '',
      search_input_output: '',
      product_filter: [],
      product_filter_input: [],
      product_filter_output: [],
      isLoading: true,
      SubmitProcessing: false,
      details: [],
      current_flow: 'standard',
      detail: {
        quantity: "",
        discount: "",
        Unit_cost: "",
        discount_Method: "",
        tax_percent: "",
        tax_method: ""
      },
      warehouses: [],
      to_warehouses: [],
      products: [],
      total: 0,
      GrandTotal: 0,
      transfer: {
        id: "",
        from_warehouse: "",
        to_warehouse: "",
        statut: "",
        notes: "",
        items: "",
        date:'',
        tax_rate: 0,
        TaxNet: 0,
        shipping: 0,
        discount: 0,
        is_production: false
      },
      product: {
        id: "",
        code: "",
        stock: "",
        quantity: "",
        discount: "",
        DiscountNet: "",
        discount_Method: "",
        name: "",
        no_unit:"",
        unitPurchase: "",
        purchase_unit_id: "",
        Net_cost: "",
        Unit_cost: "",
        Total_cost: "",
        subtotal: "",
        product_id: "",
        detail_id: "",
        taxe: "",
        tax_percent: "",
        tax_method: "",
        product_variant_id: "",
        etat: "",
        flow_type: 'standard'
      }
    };
  },

  computed: {
    ...mapGetters(["currentUser"]),
    total_sent() {
      return this.details
        .filter(d => d.flow_type !== 'output')
        .reduce((sum, d) => sum + (parseFloat(d.quantity) || 0), 0)
        .toFixed(2);
    },
    total_received() {
      return this.details
        .filter(d => d.flow_type === 'output')
        .reduce((sum, d) => sum + (parseFloat(d.quantity) || 0), 0)
        .toFixed(2);
    },
    wastage() {
      return (this.total_sent - this.total_received).toFixed(2);
    },
    wastage_percent() {
      if (this.total_sent == 0) return 0;
      return ((this.wastage / this.total_sent) * 100).toFixed(2);
    }
  },

  methods: {
    handleFocus() { this.focused = true },
    handleBlur() { this.focused = false },
    
    showModal(type) {
      this.current_flow = type;
      this.$bvModal.show('open_scan');
    },

    onScan (decodedText, decodedResult) {
      const code = decodedText;
      if (this.current_flow === 'input') this.search_input_input = code;
      else if (this.current_flow === 'output') this.search_input_output = code;
      else this.search_input = code;
      
      this.search(this.current_flow, code);
      this.$bvModal.hide('open_scan');
    },

    Submit_Transfer() {
      this.$refs.Edit_transfer.validate().then(success => {
        if (!success) {
          this.makeToast("danger", "Please fill the form correctly", "Failed");
        } else {
          this.Update_Transfer();
        }
      });
    },

    Complete_Transfer() {
      this.$refs.Edit_transfer.validate().then(success => {
        if (!success) {
          this.makeToast("danger", "Please fill the form correctly", "Failed");
        } else {
          this.transfer.statut = 'completed';
          this.Update_Transfer();
        }
      });
    },

    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },

    makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    },

    search(type, input) {
      if (this.timer) { clearTimeout(this.timer); this.timer = null; }
      if (input.length < 2) {
        if (type === 'input') this.product_filter_input = [];
        else if (type === 'output') this.product_filter_output = [];
        else this.product_filter = [];
        return;
      }

      if (this.transfer.from_warehouse != "" && this.transfer.from_warehouse != null) {
        if (type === 'input') this.focused_input = true;
        if (type === 'output') this.focused_output = true;
        if (type === 'standard') this.focused = true;

        this.timer = setTimeout(() => {
          const results = this.products.filter(product => {
             return (
               product.name.toLowerCase().includes(input.toLowerCase()) ||
               product.code.toLowerCase().includes(input.toLowerCase()) ||
               product.barcode.toLowerCase().includes(input.toLowerCase())
             );
          });

          if (type === 'input') this.product_filter_input = results;
          else if (type === 'output') this.product_filter_output = results;
          else this.product_filter = results;

          if (results.length <= 0) {
            this.makeToast("warning", "Product Not Found", "Warning");
          }
        }, 500);
      } else {
        this.makeToast("warning", "Select Warehouse", "Warning");
      }
    },

    getResultValue(result) {
      return result.code + " " + "(" + result.name + ")";
    },

    SearchProduct(type, result) {
      this.product = {};
      this.current_flow = type;
      
      if (this.details.some(detail => detail.code === result.code && detail.flow_type === type)) {
        this.makeToast("warning", "Already Added", "Warning");
      } else {
        this.product.code = result.code;
        this.product.no_unit = 1;
        this.product.stock = result.qte_purchase;
        this.product.quantity = 1;
        this.product.product_variant_id = result.product_variant_id;
        this.product.etat = "new";
        this.product.flow_type = type === 'standard' ? 'standard' : type;
        this.Get_Product_Details(result.id, result.product_variant_id);
      }

      if (type === 'input') {
        this.search_input_input = '';
        this.product_filter_input = [];
        this.focused_input = false;
        this.$refs.product_autocomplete_input.value = "";
      } else if (type === 'output') {
        this.search_input_output = '';
        this.product_filter_output = [];
        this.focused_output = false;
        this.$refs.product_autocomplete_output.value = "";
      } else {
        this.search_input = '';
        this.product_filter = [];
        this.focused = false;
        this.$refs.product_autocomplete.value = "";
      }
    },

    verifiedForm() {
      if (this.details.length <= 0) {
        this.makeToast("warning", "Add products to list", "Warning");
        return false;
      }
      if (this.transfer.from_warehouse === this.transfer.to_warehouse) {
        this.makeToast("warning", "Warehouses must be different", "Warning");
        return false;
      }
      return true;
    },

    Update_Transfer() {
      if (this.verifiedForm()) {
        this.SubmitProcessing = true;
        NProgress.start();
        let id = this.$route.params.id;
        
        axios.put(`transfers/${id}`, {
          transfer: this.transfer,
          details: this.details,
          GrandTotal: this.GrandTotal
        })
        .then(response => {
          NProgress.done();
          this.SubmitProcessing = false;
          this.$router.push({ name: "index_transfer" });
          this.makeToast("success", "Successfully Updated", "Success");
        })
        .catch(error => {
          NProgress.done();
          this.makeToast("danger", "Invalid Data", "Failed");
          this.SubmitProcessing = false;
        });
      }
    },

    Last_Detail_id() {
      if (this.details.length === 0) return 1;
      return Math.max(...this.details.map(d => d.detail_id)) + 1;
    },

    add_product() {
      this.product.detail_id = this.Last_Detail_id();
      this.details.push({ ...this.product });
    },

    Verified_Qty(detail, id) {
      for (var i = 0; i < this.details.length; i++) {
        if (this.details[i].detail_id === id) {
          if (isNaN(detail.quantity)) this.details[i].quantity = 1;
          this.details[i].quantity = detail.quantity;
        }
      }
      this.Calcul_Total();
    },

    Calcul_Total() {
      this.total = 0;
      for (let index = 0; index < this.details.length; index++) {
        var tax = this.details[index].taxe * this.details[index].quantity;
        this.details[index].subtotal = parseFloat(
          this.details[index].quantity * this.details[index].Net_cost + tax
        );
        this.total = parseFloat(this.total + this.details[index].subtotal);
      }
      this.GrandTotal = parseFloat(this.total + this.transfer.shipping).toFixed(2);
    },

    delete_Product_Detail(id) {
      this.details = this.details.filter(d => d.detail_id !== id);
      this.Calcul_Total();
    },

    Get_Products_By_Warehouse(id) {
      NProgress.start();
      axios.get("get_Products_by_warehouse/" + id + "?stock=1&product_service=0&product_combo=1")
        .then(response => {
          this.products = response.data;
          NProgress.done();
        });
    },

    Get_Product_Details(product_id, variant_id) {
      axios.get("/show_product_data/" + product_id +"/"+ variant_id).then(response => {
        this.product.discount           = response.data.discount;
        this.product.DiscountNet        = response.data.DiscountNet;
        this.product.discount_Method    = response.data.discount_method;
        this.product.del = 0;
        this.product.etat = "new";
        this.product.product_id = response.data.id;
        this.product.name = response.data.name;
        this.product.Net_cost = response.data.Net_cost;
        this.product.Unit_cost = response.data.Unit_cost;
        this.product.taxe = response.data.tax_cost;
        this.product.tax_method = response.data.tax_method;
        this.product.tax_percent = response.data.tax_percent;
        this.product.unitPurchase = response.data.unitPurchase;
        this.product.purchase_unit_id = response.data.purchase_unit_id;
        this.add_product();
        this.Calcul_Total();
      });
    },

    resizeTextarea() {
      const element = this.$refs.noteTextarea;
      if (element) {
        element.style.height = "auto";
        element.style.height = element.scrollHeight + "px";
      }
    },

    Selected_From_Warehouse(value) {
      this.search_input = '';
      this.product_filter = [];
      this.Get_Products_By_Warehouse(value);
    },

    GetElements() {
      let id = this.$route.params.id;
      axios.get(`transfers/${id}/edit`).then(response => {
        this.transfer = response.data.transfer;
        this.details = response.data.details;
        this.warehouses = response.data.warehouses;
        this.to_warehouses = response.data.to_warehouses;
        this.Get_Products_By_Warehouse(this.transfer.from_warehouse);
        this.Calcul_Total();
        this.isLoading = false;
      });
    }
  },

  created: function() {
    this.GetElements();
  }
};
</script>


<style scoped>
  .main-content >>> .vgt-table, 
  .main-content >>> .table,
  .main-content >>> .form-group label {
    font-size: 1.3rem !important;
  }
  .main-content >>> .form-control {
    font-size: 1.3rem !important;
  }
  .main-content >>> .v-select {
    font-size: 1.3rem !important;
  }
  .main-content >>> .badge {
    font-size: 1.1rem !important;
    padding: 6px 12px !important;
  }
  .main-content >>> .breadcrumb ul li {
    font-size: 1.2rem !important;
  }
  .main-content >>> .breadcrumb h1 {
    font-size: 1.8rem !important;
  }
  .main-content >>> .table th, 
  .main-content >>> .table td {
    padding: 12px 10px !important;
    vertical-align: middle !important;
  }
  .main-content >>> h5, 
  .main-content >>> h6 {
    font-size: 1.5rem !important;
    font-weight: bold !important;
  }
  .main-content >>> .autocomplete-input {
    font-size: 1.5rem !important;
    height: 50px !important;
  }
</style>

<style scoped>
  .main-content, .main-content label, .main-content input, .main-content .v-select, .main-content .table, .main-content .badge {
    font-size: 1.1rem !important;
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