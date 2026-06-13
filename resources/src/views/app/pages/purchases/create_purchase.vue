<template>
  <div class="main-content">
    <breadcumb :page="$t('AddPurchase')" :folder="$t('ListPurchases')"/>
    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>

    <validation-observer ref="create_purchase" v-if="!isLoading">
      <b-form @submit.prevent="submitSpreadsheet">
        <b-row>
          <b-col lg="12" md="12" sm="12">
            
            <!-- Context Header (Date and Warehouse) -->
            <b-card class="mb-3 bg-light">
              <b-row>
                <!-- date  -->
                <b-col lg="6" md="6" sm="12">
                  <b-form-group :label="$t('date')">
                    <b-form-input type="date" v-model="purchase.date" class="header-input"></b-form-input>
                  </b-form-group>
                </b-col>

                <!-- warehouse -->
                <b-col lg="6" md="6" sm="12">
                  <b-form-group :label="$t('warehouse')">
                    <v-select
                      @input="Selected_Warehouse"
                      v-model="purchase.warehouse_id"
                      :reduce="label => label.value"
                      :placeholder="$t('Choose_Warehouse')"
                      :options="warehouses.map(w => ({label: w.name, value: w.id}))"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
            </b-card>

            <!-- Excel Grid Section -->
            <div class="excel-container mt-4">
              <div class="d-flex justify-content-between mb-3 align-items-center">
                 <h3 class="mb-0 text-dark font-weight-bold">Purchase Worksheet (Grid View)</h3>
              </div>



              <div class="table-responsive worksheet-grid-wrapper">
                <table class="table table-bordered excel-grid">
                  <thead>
                    <tr>
                      <th style="width: 20%;">{{$t('Supplier')}}</th>
                      <th style="width: 30%;">{{$t('Product')}}</th>
                      <th style="width: 10%;">{{$t('Qty')}}</th>
                      <th style="width: 15%;">{{$t('Amount')}}</th>
                      <th style="width: 20%;">{{$t('Note')}}</th>
                      <th style="width: 5%;"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, index) in spreadsheetRows" :key="index">
                      <td class="p-0">
                        <v-select
                          v-model="row.supplier_id"
                          :options="suppliers.map(s => ({label: s.name, value: s.id}))"
                          :reduce="opt => opt.value"
                          class="grid-v-select"
                          :placeholder="$t('Supplier')"
                          append-to-body
                          :ref="'row_supplier_' + index"
                          @input="onGridSupplierChange(index)"
                        />
                      </td>
                      <td class="p-0">
                        <v-select
                          v-model="row.product_data"
                          :options="products.map(p => ({label: p.name + ' (' + p.code + ')', value: p}))"
                          :reduce="opt => opt.value"
                          class="grid-v-select"
                          :placeholder="$t('Select Product')"
                          append-to-body
                          :ref="'row_product_' + index"
                          @input="onGridProductChange(index)"
                        />
                      </td>
                      <td class="p-0">
                        <input 
                          type="text" 
                          inputmode="decimal"
                          v-model.number="row.quantity" 
                          class="grid-input text-center" 
                          :ref="'row_qty_' + index"
                          @keydown.enter.prevent="focusNextCell(index, 'amount')"
                        />
                      </td>
                      <td class="p-0">
                        <input 
                          type="text" 
                          inputmode="decimal"
                          v-model.number="row.amount" 
                          class="grid-input text-right" 
                          :ref="'row_amount_' + index"
                          @keydown.enter.prevent="focusNextCell(index, 'note')"
                        />
                      </td>
                      <td class="p-0">
                        <input 
                          type="text" 
                          v-model="row.note" 
                          class="grid-input" 
                          placeholder="Note..." 
                          :ref="'row_note_' + index"
                          @keydown.enter.prevent="moveToNextRow(index)"
                        />
                      </td>
                      <td class="p-0 text-center align-middle">
                        <i @click="clearRow(index)" class="i-Close-Window text-danger cursor-pointer"></i>
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
                  <i class="i-Yes mr-2"></i> SAVE ALL PURCHASES
                </b-button>
              </div>
              <div v-if="is_bulk_processing" class="spinner lg spinner-primary mt-3 text-center"></div>
            </div>

          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
    
    <!-- Massive spacer for scrolling -->
    <div style="height: 400px;"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import NProgress from "nprogress";

export default {
  metaInfo: {
    title: "Create Bulk Purchases"
  },
  data() {
    return {
      isLoading: true,
      is_bulk_processing: false,
      warehouses: [],
      suppliers: [],
      products: [],
      purchase: {
        date: new Date().toISOString().slice(0, 10),
        warehouse_id: "",
        notes: "",
        tax_rate: 0,
        discount: 0,
        shipping: 0,
        transporter_name: "",
        lr_number: ""
      },
      spreadsheetRows: [{
        supplier_id: null,
        product_data: null,
        product_id: null,
        variant_id: null,
        quantity: null,
        amount: null,
        note: '',
        purchase_unit_id: null,
        tax_method: null,
        tax_percent: null
      }]
    };
  },
  computed: {
    ...mapGetters(["currentUserPermissions", "currentUser"])
  },

  methods: {
    // Initialize Spreadsheet Rows
    initSpreadsheet() {
      // Already initialized in data() with 1 row
    },

    addNewRow() {
      this.spreadsheetRows.push({
        supplier_id: null,
        product_data: null,
        product_id: null,
        variant_id: null,
        quantity: null,
        amount: null,
        note: this.generateAutoNote(),
        purchase_unit_id: null,
        tax_method: null,
        tax_percent: null
      });
      this.$nextTick(() => {
        const nextIndex = this.spreadsheetRows.length - 1;
        if (this.$refs['row_supplier_' + nextIndex]) {
           this.$refs['row_supplier_' + nextIndex][0].$el.querySelector('input').focus();
        }
      });
    },

    generateAutoNote() {
      let note = "";
      
      // Transport and LR
      if (this.purchase.transporter_name) note += this.purchase.transporter_name + " ";
      note += "LR: " + (this.purchase.lr_number ? this.purchase.lr_number : "") + " ";
      
      // Warehouse specific prefix
      const warehouse = this.warehouses.find(w => w.id === this.purchase.warehouse_id);
      if (warehouse) {
        const name = warehouse.name;
        if (name.includes('Shanti')) note += "STM: ";
        else if (name.includes('Nirmal')) note += "NP: ";
        else if (name.includes('Saral')) note += "SL: ";
        else if (name.includes('Sarveshwar')) note += "SP: ";
      }
      return note.trim();
    },

    onAdvancedChange() {
      // Update all row notes when Transport or LR change
      this.spreadsheetRows.forEach(row => {
        if (!row.note || row.note === "" || row.note.includes('LR:')) {
           row.note = this.generateAutoNote();
        }
      });
    },

    onGridSupplierChange(index) {
      this.$nextTick(() => {
        const ref = this.$refs['row_product_' + index];
        if (ref && ref[0]) {
          ref[0].$el.querySelector('input').focus();
        }
      });
    },

    onGridProductChange(index) {
      const row = this.spreadsheetRows[index];
      if (row.product_data) {
        row.product_id = row.product_data.id;
        row.variant_id = row.product_data.product_variant_id || null;
        row.amount = null; // Blank by default, let person write directly
        
        if (!row.note || row.note === "" || row.note.includes('LR:')) {
          row.note = this.generateAutoNote();
        }

        axios.get("/show_product_data/" + row.product_id + "/" + (row.variant_id || null)).then(response => {
          row.purchase_unit_id = response.data.purchase_unit_id;
          row.tax_method = response.data.tax_method;
          row.tax_percent = response.data.tax_percent;
        });

        this.$nextTick(() => {
          if (this.$refs['row_qty_' + index]) {
            this.$refs['row_qty_' + index][0].focus();
          }
        });
      }
    },

    focusNextCell(index, type) {
      this.$nextTick(() => {
        const refName = 'row_' + type + '_' + index;
        if (this.$refs[refName]) {
          if (this.$refs[refName][0].$el) {
             this.$refs[refName][0].$el.querySelector('input').focus();
          } else {
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
          if (this.$refs['row_supplier_' + nextIndex]) {
             this.$refs['row_supplier_' + nextIndex][0].$el.querySelector('input').focus();
          }
        });
      }
    },

    clearRow(index) {
      if (this.spreadsheetRows.length > 1) {
        this.spreadsheetRows.splice(index, 1);
      } else {
        this.$set(this.spreadsheetRows, 0, {
          supplier_id: null,
          product_data: null,
          quantity: null,
          amount: null,
          note: this.generateAutoNote(),
          product_id: null,
          variant_id: null,
          purchase_unit_id: null,
          tax_method: null,
          tax_percent: null
        });
      }
    },

    submitSpreadsheet() {
      const validRows = this.spreadsheetRows.filter(row => row.supplier_id && row.product_id);
      
      if (validRows.length === 0) {
        this.makeToast("warning", "Please fill at least one row", "Warning");
        return;
      }

      if (!this.purchase.warehouse_id) {
        this.makeToast("warning", "Please select a Warehouse first", "Warning");
        return;
      }

      this.is_bulk_processing = true;
      NProgress.start();

      const purchasesData = validRows.map(row => {
        return {
          date: this.purchase.date,
          supplier_id: row.supplier_id,
          warehouse_id: this.purchase.warehouse_id,
          statut: "received",
          notes: row.note,
          tax_rate: this.purchase.tax_rate || 0,
          TaxNet: 0,
          discount: this.purchase.discount || 0,
          shipping: this.purchase.shipping || 0,
          GrandTotal: parseFloat(parseFloat(row.amount || 0).toFixed(2)),
          details: [{
            product_id: row.product_id,
            product_variant_id: row.variant_id,
            quantity: parseFloat(row.quantity || 0),
            Unit_cost: row.quantity > 0 ? parseFloat((parseFloat(row.amount) / parseFloat(row.quantity)).toFixed(2)) : 0,
            subtotal: parseFloat(parseFloat(row.amount || 0).toFixed(2)),
            discount: 0,
            tax_percent: row.tax_percent || 0,
            tax_method: row.tax_method || 1,
            purchase_unit_id: row.purchase_unit_id,
            imei_number: ""
          }]
        };
      });

      axios.post("purchases/bulk", {
        purchases: purchasesData
      })
      .then(response => {
        NProgress.done();
        this.makeToast("success", "All purchases saved successfully", "Success");
        this.$router.push({ name: "index_purchases" });
      })
      .catch(error => {
        NProgress.done();
        this.is_bulk_processing = false;
        this.makeToast("danger", error.response?.data?.message || "Failed to save purchases", "Error");
      });
    },

    Selected_Warehouse(value) {
      this.Get_Products_By_Warehouse(value);
      // Update all row notes with the new warehouse prefix
      this.spreadsheetRows.forEach(row => {
        if (!row.note || row.note === "" || row.note.includes('LR:')) {
           row.note = this.generateAutoNote();
        }
      });
    },

    Get_Products_By_Warehouse(id) {
      NProgress.start();
      axios.get("get_Products_by_warehouse/" + id + "?stock=" + 0 + "&product_service=" + 0)
        .then(response => {
          this.products = response.data;
          NProgress.done();
        });
    },

    GetElements() {
      axios.get("purchases/create").then(response => {
        this.suppliers = response.data.suppliers;
        this.warehouses = response.data.warehouses;
        this.isLoading = false;
        this.initSpreadsheet();
      });
    },

    makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    }
  },

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
  .grid-v-select >>> .vs__dropdown-menu {
    min-width: 350px !important;
    font-size: 1.2rem !important;
  }
  .grid-v-select >>> .vs__selected {
    font-size: 1.3rem !important;
    white-space: normal;
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
    cursor: pointer;
  }

  /* Hide arrows in Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Hide arrows in Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
</style>