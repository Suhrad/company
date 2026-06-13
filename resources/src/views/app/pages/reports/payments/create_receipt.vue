<template>
  <div class="main-content">
    <breadcumb :page="$t('AddPayment')" :folder="$t('SalesInvoice')"/>
    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>

    <validation-observer ref="create_receipt" v-if="!isLoading">
      <b-form @submit.prevent="submitSpreadsheet">
        <b-row>
          <b-col lg="12" md="12" sm="12">
            
            <!-- Context Header (Date only) -->
            <b-card class="mb-3 bg-light">
              <b-row>
                <!-- date  -->
                <b-col lg="12" md="12" sm="12">
                  <b-form-group :label="$t('date')">
                    <b-form-input type="date" v-model="receiptHeader.date" class="header-input"></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-card>

            <!-- Excel Grid Section -->
            <div class="excel-container mt-4">
              <div class="d-flex justify-content-between mb-3 align-items-center">
                 <h3 class="mb-0 text-dark font-weight-bold">Receipt Worksheet (Grid View)</h3>
              </div>

              <div class="table-responsive worksheet-grid-wrapper">
                <table class="table table-bordered excel-grid">
                  <thead>
                    <tr>
                      <th style="width: 35%;">{{$t('Customer')}}</th>
                      <th style="width: 20%;">Total Pending Balance</th>
                      <th style="width: 20%;">{{$t('Amount')}}</th>
                      <th style="width: 20%;">{{$t('Note')}}</th>
                      <th style="width: 5%;"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, index) in spreadsheetRows" :key="index">
                      <!-- Customer Selection -->
                      <td class="p-0">
                        <v-select
                          v-model="row.client_id"
                          :options="clients.map(c => ({label: c.name, value: c.id}))"
                          :reduce="opt => opt.value"
                          class="grid-v-select"
                          :placeholder="$t('Customer')"
                          append-to-body
                          :ref="'row_client_' + index"
                          @input="onClientChange(index)"
                        />
                      </td>

                      <!-- Pending Balance (Read-only) -->
                      <td class="p-0 align-middle text-center">
                        <span class="font-weight-bold text-danger" style="font-size: 1.3rem;">
                          {{ row.pending_balance !== null ? row.pending_balance.toFixed(2) : '0.00' }}
                        </span>
                      </td>

                      <!-- Amount Input -->
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

                      <!-- Note Input -->
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

                      <!-- Clear Row Actions -->
                      <td class="p-0 text-center align-middle">
                        <i @click="clearRow(index)" class="i-Close-Window text-danger cursor-pointer" style="font-size: 1.5rem;"></i>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="5" class="p-3 bg-light text-left">
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
                  <i class="i-Yes mr-2"></i> SAVE ALL RECEIPTS
                </b-button>
              </div>
              <div v-if="is_bulk_processing" class="spinner lg spinner-primary mt-3 text-center"></div>
            </div>

          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
    
    <div style="height: 100px;"></div>
  </div>
</template>

<script>
import NProgress from "nprogress";

export default {
  metaInfo: {
    title: "Create Bulk Receipts"
  },
  data() {
    return {
      isLoading: true,
      is_bulk_processing: false,
      
      receiptHeader: {
        date: new Date().toISOString().slice(0, 10),
        account_id: "",
        payment_method_id: 2
      },

      clients: [],
      payment_methods: [],
      accounts: [],
      unpaid_sales: [],

      spreadsheetRows: []
    };
  },

  methods: {
    loadData() {
      axios.get("payment_sale/create")
        .then(response => {
          this.clients = response.data.clients || [];
          this.payment_methods = response.data.payment_methods || [];
          this.accounts = response.data.accounts || [];
          this.unpaid_sales = response.data.unpaid_sales || [];
          
          if (this.accounts.length > 0) {
            // Default to CASH ON HAND (ID 8) or fallback to first account
            const cashAccount = this.accounts.find(a => a.account_name.toUpperCase().includes("CASH ON HAND") || a.id === 8);
            this.receiptHeader.account_id = cashAccount ? cashAccount.id : this.accounts[0].id;
          }
          this.receiptHeader.payment_method_id = 2; // Default to Cash (ID 2)

          // Initialize worksheet with 5 empty rows
          for (let i = 0; i < 5; i++) {
            this.spreadsheetRows.push(this.getEmptyRow());
          }

          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },

    getEmptyRow() {
      return {
        client_id: "",
        pending_balance: null,
        amount: "",
        note: ""
      };
    },

    addNewRow() {
      this.spreadsheetRows.push(this.getEmptyRow());
      this.$nextTick(() => {
        const index = this.spreadsheetRows.length - 1;
        this.focusCell(index, 'client');
      });
    },

    clearRow(index) {
      this.$set(this.spreadsheetRows, index, this.getEmptyRow());
    },

    onClientChange(index) {
      const row = this.spreadsheetRows[index];
      if (row.client_id) {
        // Calculate total pending balance for selected customer
        const list = this.unpaid_sales.filter(s => s.client_id === row.client_id);
        const totalPending = list.reduce((sum, s) => sum + (parseFloat(s.GrandTotal) - parseFloat(s.paid_amount)), 0);
        row.pending_balance = parseFloat(totalPending.toFixed(2));
        row.amount = parseFloat(totalPending.toFixed(2));
      } else {
        row.pending_balance = null;
        row.amount = "";
      }
      this.$nextTick(() => {
        this.focusCell(index, 'amount');
      });
    },

    focusCell(index, fieldName) {
      if (fieldName === 'client') {
        const refName = `row_client_${index}`;
        if (this.$refs[refName] && this.$refs[refName][0]) {
          this.$refs[refName][0].$el.querySelector('input').focus();
        }
      } else {
        const refName = `row_${fieldName}_${index}`;
        if (this.$refs[refName] && this.$refs[refName][0]) {
          this.$refs[refName][0].focus();
          if (fieldName === 'amount') {
             this.$refs[refName][0].select();
          }
        }
      }
    },

    focusNextCell(index, fieldName) {
      this.focusCell(index, fieldName);
    },

    moveToNextRow(index) {
      if (index + 1 < this.spreadsheetRows.length) {
        this.focusCell(index + 1, 'client');
      } else {
        this.addNewRow();
      }
    },

    submitSpreadsheet() {
      const validRows = this.spreadsheetRows.filter(row => row.client_id && row.amount > 0);
      
      if (validRows.length === 0) {
        this.makeToast("warning", "Please fill at least one row with a valid customer and amount", "Warning");
        return;
      }

      if (!this.receiptHeader.account_id) {
        this.makeToast("warning", "Account not found or selected", "Warning");
        return;
      }

      this.is_bulk_processing = true;
      NProgress.start();

      const receiptsData = validRows.map(row => {
        return {
          client_id: row.client_id,
          account_id: this.receiptHeader.account_id,
          payment_method_id: this.receiptHeader.payment_method_id,
          date: this.receiptHeader.date,
          montant: parseFloat(row.amount),
          notes: row.note
        };
      });

      axios.post("payment_sale/bulk", {
        receipts: receiptsData
      })
      .then(response => {
        NProgress.done();
        this.makeToast("success", "All receipts saved successfully", "Success");
        this.$router.push({ name: "index_receipts" });
      })
      .catch(error => {
        NProgress.done();
        this.is_bulk_processing = false;
        this.makeToast("danger", error.response?.data?.message || "Failed to save receipts", "Error");
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
    this.loadData();
  }
};
</script>

<style scoped>
  .header-input {
    height: 48px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 1.3rem;
  }
  .excel-container {
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
    padding: 20px;
  }
  .worksheet-grid-wrapper {
    border: 1px solid #ddd;
    border-radius: 6px;
    cursor: pointer;
  }
  .excel-grid {
    margin-bottom: 0;
    background-color: #fcfcfc;
  }
  .excel-grid th {
    background-color: #f1f2f6;
    color: #2f3542;
    font-weight: 700;
    text-align: center;
    border-bottom: 2px solid #ced6e0 !important;
    font-size: 1.2rem;
    padding: 15px 10px;
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
  .cursor-pointer {
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

<style>
  /* Global rules for v-select dropdown when appended to body */
  .vs__dropdown-menu {
    font-size: 1.3rem !important;
  }
  .vs__dropdown-option {
    font-size: 1.3rem !important;
    padding: 10px 20px !important;
  }
</style>

