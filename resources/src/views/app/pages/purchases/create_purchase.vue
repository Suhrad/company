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
                      <td class="p-0 align-middle">
                        <v-select
                          v-model="row.supplier_id"
                          :options="suppliers.map(s => ({label: s.name, value: s.id}))"
                          :reduce="opt => opt.value"
                          class="grid-v-select fill-height-select"
                          :placeholder="$t('Supplier')"
                          append-to-body
                          :ref="'row_supplier_' + index"
                          @input="onGridSupplierChange(index)"
                        />
                      </td>
                      <td class="p-0">
                        <div v-for="(item, itemIndex) in row.items" :key="itemIndex" class="grid-row-item d-flex align-items-center">
                          <v-select
                            v-model="item.product_data"
                            :options="products.map(p => ({label: p.name + ' (' + p.code + ')', value: p}))"
                            :reduce="opt => opt.value"
                            class="grid-v-select flex-grow-1"
                            :placeholder="$t('Select Product')"
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
        note: '',
        items: [{
          product_data: null,
          product_id: null,
          variant_id: null,
          quantity: null,
          amount: null,
          purchase_unit_id: null,
          tax_method: null,
          tax_percent: null
        }]
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
        note: this.generateAutoNote(),
        items: [{
          product_data: null,
          product_id: null,
          variant_id: null,
          quantity: null,
          amount: null,
          purchase_unit_id: null,
          tax_method: null,
          tax_percent: null
        }]
      });
      this.$nextTick(() => {
        const nextIndex = this.spreadsheetRows.length - 1;
        if (this.$refs['row_supplier_' + nextIndex]) {
           this.$refs['row_supplier_' + nextIndex][0].$el.querySelector('input').focus();
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
        purchase_unit_id: null,
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
      
      // Transport and LR
      if (this.purchase.transporter_name) note += this.purchase.transporter_name + " ";
      note += "LR: " + (this.purchase.lr_number ? this.purchase.lr_number : "") + " ";
      
      // Warehouse specific prefix
      const warehouse = this.warehouses.find(w => w.id === this.purchase.warehouse_id);
      if (warehouse && warehouse.shortcut) {
        note += warehouse.shortcut + ": ";
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
        const refName = 'row_product_' + index + '_0';
        if (this.$refs[refName] && this.$refs[refName][0]) {
          this.$refs[refName][0].$el.querySelector('input').focus();
        }
      });
    },

    onGridProductChange(rowIndex, itemIndex) {
      const row = this.spreadsheetRows[rowIndex];
      const item = row.items[itemIndex];
      if (item.product_data) {
        item.product_id = item.product_data.id;
        item.variant_id = item.product_data.product_variant_id || null;
        item.amount = null; // Blank by default, let person write directly
        
        if (!row.note || row.note === "" || row.note.includes('LR:')) {
          row.note = this.generateAutoNote();
        }

        axios.get("/show_product_data/" + item.product_id + "/" + (item.variant_id || null)).then(response => {
          item.purchase_unit_id = response.data.purchase_unit_id;
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
          supplier_id: null,
          note: this.generateAutoNote(),
          items: [{
            product_data: null,
            product_id: null,
            variant_id: null,
            quantity: null,
            amount: null,
            purchase_unit_id: null,
            tax_method: null,
            tax_percent: null
          }]
        });
      }
    },

    submitSpreadsheet() {
      const validRows = this.spreadsheetRows.filter(row => row.supplier_id && row.items.some(item => item.product_id));
      
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
        const validItems = row.items.filter(item => item.product_id);
        const grandTotal = validItems.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
        
        const details = validItems.map(item => {
          return {
            product_id: item.product_id,
            product_variant_id: item.variant_id,
            quantity: parseFloat(item.quantity || 0),
            Unit_cost: item.quantity > 0 ? parseFloat((parseFloat(item.amount || 0) / parseFloat(item.quantity)).toFixed(2)) : 0,
            subtotal: parseFloat(parseFloat(item.amount || 0).toFixed(2)),
            discount: 0,
            tax_percent: item.tax_percent || 0,
            tax_method: item.tax_method || 1,
            purchase_unit_id: item.purchase_unit_id,
            imei_number: ""
          };
        });

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
          GrandTotal: parseFloat(grandTotal.toFixed(2)),
          details: details
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