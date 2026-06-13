<template>
  <div class="main-content">
    <breadcumb page="Quick Sales" folder="Sales"/>
    
    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>

    <div v-if="!isLoading">
        <b-card class="mb-4 bg-light shadow-sm">
            <b-row>
                <b-col md="4">
                    <b-form-group :label="$t('warehouse') + ' *'">
                        <v-select
                            v-model="warehouse_id"
                            :reduce="label => label.value"
                            :placeholder="$t('Choose_Warehouse')"
                            :options="warehouses.map(w => ({label: w.name, value: w.id}))"
                        />
                    </b-form-group>
                </b-col>
                <b-col md="4">
                    <b-form-group :label="$t('date') + ' *'">
                        <b-form-input type="date" v-model="date"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-card>

        <b-card class="shadow">
            <div class="table-responsive">
                <table class="table table-hover table-bordered excel-table">
                    <thead class="bg-primary text-white">
                        <tr>
                            <th style="width: 250px;">{{$t('Customer')}}</th>
                            <th style="width: 300px;">{{$t('ProductName')}}</th>
                            <th style="width: 100px;">{{$t('Qty')}}</th>
                            <th style="width: 150px;">{{$t('Amount')}}</th>
                            <th>{{$t('Note')}}</th>
                            <th style="width: 100px;" class="text-center">{{$t('Action')}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, index) in rows" :key="index">
                            <td class="p-1">
                                <v-select
                                    v-model="row.client_id"
                                    :reduce="label => label.value"
                                    :options="clients.map(c => ({label: c.name, value: c.id}))"
                                    @input="onCustomerSelect(index)"
                                    :placeholder="$t('Choose_Customer')"
                                    class="no-border-select"
                                />
                            </td>
                            <td class="p-1">
                                <v-select
                                    v-model="row.product_id"
                                    :reduce="label => label.value"
                                    :options="products_list.map(p => ({label: p.name, value: p.id}))"
                                    @input="onProductSelect(index)"
                                    :placeholder="$t('Choose_Product')"
                                    class="no-border-select"
                                />
                            </td>
                            <td class="p-1">
                                <b-form-input 
                                    type="number" 
                                    v-model.number="row.quantity"
                                    class="form-control-excel text-center"
                                    @keydown.enter.native="focusNext(index, 'amount')"
                                    ref="qtyInput"
                                />
                            </td>
                            <td class="p-1">
                                <b-form-input 
                                    type="number" 
                                    v-model.number="row.amount"
                                    class="form-control-excel text-right font-weight-bold"
                                    @keydown.enter.native="focusNext(index, 'note')"
                                    ref="amountInput"
                                />
                            </td>
                            <td class="p-1">
                                <b-form-input 
                                    v-model="row.note"
                                    class="form-control-excel"
                                    :placeholder="$t('Afewwords')"
                                    @keydown.enter.native="addRow(index)"
                                    ref="noteInput"
                                />
                            </td>
                            <td class="text-center p-1 align-middle">
                                <b-button variant="outline-success" size="sm" class="mr-1" @click="addRow(index)" title="Add Row">
                                    <i class="i-Add font-weight-bold"></i>
                                </b-button>
                                <b-button variant="outline-danger" size="sm" @click="removeRow(index)" v-if="rows.length > 1" title="Remove Row">
                                    <i class="i-Close-Window font-weight-bold"></i>
                                </b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="mt-4 d-flex justify-content-between align-items-center bg-gray-100 p-3 rounded">
                <h4 class="mb-0 font-weight-bold">Total Sales: {{ rows.length }}</h4>
                <b-button variant="primary" size="lg" @click="submitSales" :disabled="submitting || rows.length == 0">
                    <span v-if="!submitting">
                        <i class="i-Yes mr-2 font-weight-bold"></i> Submit All Sales
                    </span>
                    <span v-else>
                        <b-spinner small class="mr-2"></b-spinner> Processing...
                    </span>
                </b-button>
            </div>
        </b-card>
    </div>
  </div>
</template>

<script>
import NProgress from "nprogress";

export default {
  metaInfo: {
    title: "Quick Sales"
  },
  data() {
    return {
      isLoading: true,
      submitting: false,
      warehouse_id: "",
      date: new Date().toISOString().slice(0, 10),
      warehouses: [],
      clients: [],
      products_list: [],
      rows: [
        {
          client_id: null,
          product_id: null,
          quantity: 1,
          amount: 0,
          note: "",
          unit_id: null,
          tax_method: null,
          tax_percent: 0,
          discount: 0,
          discount_Method: "1",
        }
      ]
    };
  },

  methods: {
    GetElements() {
      axios
        .get("sales/create")
        .then(response => {
          this.clients = response.data.clients;
          this.warehouses = response.data.warehouses;
          if (this.warehouses.length > 0) {
              this.warehouse_id = this.warehouses[0].id;
          }
          this.fetchProducts();
          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
        });
    },

    fetchProducts() {
        axios.get("/products").then(response => {
            this.products_list = response.data.products || response.data;
        });
    },

    onCustomerSelect(index) {
        // Option for future use: auto-populate notes or transporter
    },

    onProductSelect(index) {
      const row = this.rows[index];
      if (row.product_id) {
        axios.get("/show_product_data/" + row.product_id + "/null").then(response => {
          row.amount = response.data.Unit_price;
          row.unit_id = response.data.sale_unit_id;
          row.tax_method = response.data.tax_method;
          row.tax_percent = response.data.tax_percent;
          row.discount = response.data.discount;
          row.discount_Method = response.data.discount_method;
          
          // Focus Qty Input
          this.$nextTick(() => {
            if (this.$refs.qtyInput && this.$refs.qtyInput[index]) {
                this.$refs.qtyInput[index].focus();
            }
          });
        });
      }
    },

    focusNext(index, field) {
        this.$nextTick(() => {
            if (field === 'amount' && this.$refs.amountInput && this.$refs.amountInput[index]) {
                this.$refs.amountInput[index].focus();
            } else if (field === 'note' && this.$refs.noteInput && this.$refs.noteInput[index]) {
                this.$refs.noteInput[index].focus();
            }
        });
    },

    addRow(index) {
      // If it's the last row, add a new one
      if (index === this.rows.length - 1) {
          this.rows.push({
            client_id: null,
            product_id: null,
            quantity: 1,
            amount: 0,
            note: "",
            unit_id: null,
            tax_method: null,
            tax_percent: 0,
            discount: 0,
            discount_Method: "1",
          });
      }
      
      // Auto-focus next row's customer select would be great, but v-select needs a ref
    },

    removeRow(index) {
      this.rows.splice(index, 1);
    },

    submitSales() {
        if (!this.warehouse_id) {
            this.makeToast("danger", "Please select a warehouse", "Failed");
            return;
        }

        const validSales = this.rows.filter(r => r.client_id && r.product_id && r.quantity > 0);
        
        if (validSales.length === 0) {
            this.makeToast("danger", "Please complete at least one sale entry", "Failed");
            return;
        }

        this.submitting = true;
        NProgress.start();

        const salesData = validSales.map(row => {
            // Calculate totals as expected by backend
            const subtotal = row.quantity * row.amount;
            return {
                date: this.date,
                warehouse_id: this.warehouse_id,
                client_id: row.client_id,
                statut: "completed",
                notes: row.note,
                GrandTotal: subtotal,
                TaxNet: 0,
                tax_rate: 0,
                discount: 0,
                shipping: 0,
                details: [{
                    product_id: row.product_id,
                    quantity: row.quantity,
                    Unit_price: row.amount,
                    subtotal: subtotal,
                    sale_unit_id: row.unit_id,
                    tax_method: row.tax_method || "1",
                    tax_percent: row.tax_percent || 0,
                    discount: row.discount || 0,
                    discount_Method: row.discount_Method || "1",
                    product_variant_id: null,
                    imei_number: ""
                }]
            };
        });

        axios.post("sales/bulk", { sales: salesData })
            .then(response => {
                this.makeToast("success", "Quick Sales processed successfully", "Success");
                this.$router.push({ name: "index_sales" });
            })
            .catch(error => {
                this.makeToast("danger", "Failed to process quick sales", "Failed");
            })
            .finally(() => {
                this.submitting = false;
                NProgress.done();
            });
    },

    makeToast(variant, msg, title) {
      this.$bvToast.toast(msg, {
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
.excel-table th {
    font-size: 0.9rem;
    padding: 10px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.form-control-excel {
    border: none;
    background: transparent;
    border-radius: 0;
    box-shadow: none;
    font-size: 1.1rem;
    padding: 8px;
}

.form-control-excel:focus {
    background: #fff;
    box-shadow: inset 0 0 0 2px #716aca44;
}

.no-border-select >>> .vs__dropdown-toggle {
    border: none !important;
    background: transparent !important;
}

.no-border-select.vs--open >>> .vs__dropdown-toggle {
    background: #fff !important;
}

.excel-table td {
    background-color: #fafafa;
    transition: background-color 0.2s;
}

.excel-table tr:hover td {
    background-color: #f1f1f1;
}

.excel-table td:focus-within {
    background-color: #fff !important;
    outline: 2px solid #716aca;
    z-index: 10;
}
</style>
