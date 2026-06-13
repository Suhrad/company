<template>
  <div class="main-content">
    <breadcumb :page="company.name || $t('CompanyReport')" :folder="$t('Reports')"/>
    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>

    <b-row v-if="!isLoading">
      <b-col lg="3" md="6" sm="12">
        <b-card class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center">
          <i class="i-Full-Cart"></i>
          <div class="content">
            <p class="text-muted mt-2 mb-0">Transactions</p>
            <p class="text-primary text-24 line-height-1 mb-2">{{ company.total_transactions }}</p>
          </div>
        </b-card>
      </b-col>
      <b-col lg="3" md="6" sm="12">
        <b-card class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center">
          <i class="i-Financial"></i>
          <div class="content">
            <p class="text-muted mt-2 mb-0">{{$t('TotalAmount')}}</p>
            <p class="text-primary text-24 line-height-1 mb-2">
              {{currentUser.currency}} {{formatNumber((company.total_amount || 0),2)}}
            </p>
          </div>
        </b-card>
      </b-col>
      <b-col lg="3" md="6" sm="12">
        <b-card class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center">
          <i class="i-Money-2"></i>
          <div class="content">
            <p class="text-muted mt-2 mb-0">{{$t('TotalPaid')}}</p>
            <p class="text-primary text-24 line-height-1 mb-2">
              {{currentUser.currency}} {{formatNumber((company.total_paid || 0),2)}}
            </p>
          </div>
        </b-card>
      </b-col>
      <b-col lg="3" md="6" sm="12">
        <b-card class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center">
          <i class="i-Money-Bag"></i>
          <div class="content">
            <p class="text-muted mt-2 mb-0">Net Due (Dr/Cr)</p>
            <p class="text-primary text-24 line-height-1 mb-2">
              {{currentUser.currency}} {{formatNumber((company.due || 0),2)}}
            </p>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <b-row v-if="!isLoading">
      <b-col md="12">
        <b-card class="card mb-30" header-bg-variant="transparent ">
          <b-tabs active-nav-item-class="nav nav-tabs" content-class="mt-3" @activate-tab="tabChanged">
            
            <!-- Sales Tab -->
            <b-tab :title="$t('Sales')">
              <vue-good-table
                mode="remote"
                :columns="columns_sales"
                :totalRows="totalRows_sales"
                :rows="sales"
                @on-page-change="PageChangeSales"
                @on-per-page-change="onPerPageChangeSales"
                @on-search="onSearch_sales"
                :search-options="{
                  placeholder: $t('Search_this_table'),
                  enabled: true,
                }"
                :pagination-options="{
                  enabled: true,
                  mode: 'records',
                  nextLabel: 'next',
                  prevLabel: 'prev',
                }"
                styleClass="tableOne table-hover vgt-table"
              >
              <div slot="table-actions" class="mt-2 mb-3">
                <b-button @click="Sales_PDF()" size="sm" variant="outline-success ripple m-1">
                  <i class="i-File-Copy"></i> PDF
                </b-button>
              </div>
                <template slot="table-row" slot-scope="props">
                  <div v-if="props.column.field == 'statut'">
                    <span v-if="props.row.statut == 'completed'" class="badge badge-outline-success">{{$t('complete')}}</span>
                    <span v-else-if="props.row.statut == 'pending'" class="badge badge-outline-info">{{$t('Pending')}}</span>
                    <span v-else class="badge badge-outline-warning">{{$t('Ordered')}}</span>
                  </div>
                  <div v-else-if="props.column.field == 'payment_status'">
                    <span v-if="props.row.payment_status == 'paid'" class="badge badge-outline-success">{{$t('Paid')}}</span>
                    <span v-else-if="props.row.payment_status == 'partial'" class="badge badge-outline-primary">{{$t('partial')}}</span>
                    <span v-else class="badge badge-outline-warning">{{$t('Unpaid')}}</span>
                  </div>
                  <div v-else-if="props.column.field == 'Ref'">
                    <router-link :to="'/app/sales/edit/'+props.row.id">
                      <span class="ul-btn__text ml-1">{{props.row.Ref}}</span>
                    </router-link>
                  </div>
                </template>
              </vue-good-table>
            </b-tab>

            <!-- Purchases Tab -->
            <b-tab :title="$t('Purchases')">
              <vue-good-table
                mode="remote"
                :columns="columns_purchases"
                :totalRows="totalRows_purchases"
                :rows="purchases"
                @on-page-change="PageChangePurchases"
                @on-per-page-change="onPerPageChangePurchases"
                @on-search="onSearch_purchases"
                :search-options="{
                  placeholder: $t('Search_this_table'),
                  enabled: true,
                }"
                :pagination-options="{
                  enabled: true,
                  mode: 'records',
                  nextLabel: 'next',
                  prevLabel: 'prev',
                }"
                styleClass="tableOne table-hover vgt-table"
              >
              <div slot="table-actions" class="mt-2 mb-3">
                <b-button @click="Purchase_PDF()" size="sm" variant="outline-success ripple m-1">
                  <i class="i-File-Copy"></i> PDF
                </b-button>
              </div>
                <template slot="table-row" slot-scope="props">
                  <div v-if="props.column.field == 'statut'">
                    <span v-if="props.row.statut == 'received'" class="badge badge-outline-success">{{$t('Received')}}</span>
                    <span v-else-if="props.row.statut == 'pending'" class="badge badge-outline-info">{{$t('Pending')}}</span>
                    <span v-else class="badge badge-outline-warning">{{$t('Ordered')}}</span>
                  </div>
                  <div v-else-if="props.column.field == 'payment_status'">
                    <span v-if="props.row.payment_status == 'paid'" class="badge badge-outline-success">{{$t('Paid')}}</span>
                    <span v-else-if="props.row.payment_status == 'partial'" class="badge badge-outline-primary">{{$t('partial')}}</span>
                    <span v-else class="badge badge-outline-warning">{{$t('Unpaid')}}</span>
                  </div>
                  <div v-else-if="props.column.field == 'Ref'">
                    <router-link :to="'/app/purchases/edit/'+props.row.id">
                      <span class="ul-btn__text ml-1">{{props.row.Ref}}</span>
                    </router-link>
                  </div>
                </template>
              </vue-good-table>
            </b-tab>

            <!-- Quotations Tab -->
            <b-tab :title="$t('Quotations')">
              <vue-good-table
                mode="remote"
                :columns="columns_quotations"
                :totalRows="totalRows_quotations"
                :rows="quotations"
                @on-page-change="PageChangeQuotation"
                @on-per-page-change="onPerPageChangeQuotation"
                @on-search="onSearch_quotations"
                :search-options="{
                  placeholder: $t('Search_this_table'),
                  enabled: true,
                }"
                :pagination-options="{
                  enabled: true,
                  mode: 'records',
                  nextLabel: 'next',
                  prevLabel: 'prev',
                }"
                styleClass="tableOne table-hover vgt-table"
              >
              <div slot="table-actions" class="mt-2 mb-3">
                <b-button @click="Quotation_PDF()" size="sm" variant="outline-success ripple m-1">
                  <i class="i-File-Copy"></i> PDF
                </b-button>
              </div>
                <template slot="table-row" slot-scope="props">
                  <div v-if="props.column.field == 'statut'">
                    <span v-if="props.row.statut == 'sent'" class="badge badge-outline-success">{{$t('Sent')}}</span>
                    <span v-else class="badge badge-outline-info">{{$t('Pending')}}</span>
                  </div>
                  <div v-else-if="props.column.field == 'Ref'">
                    <router-link :to="'/app/quotations/detail/'+props.row.id">
                      <span class="ul-btn__text ml-1">{{props.row.Ref}}</span>
                    </router-link>
                  </div>
                </template>
              </vue-good-table>
            </b-tab>

            <!-- Sales Returns Tab -->
            <b-tab title="Sales Returns">
              <vue-good-table
                mode="remote"
                :columns="columns_sales_returns"
                :totalRows="totalRows_sales_returns"
                :rows="sales_returns"
                @on-page-change="PageChangeSalesReturn"
                @on-per-page-change="onPerPageChangeSalesReturn"
                @on-search="onSearch_sales_returns"
                :search-options="{
                  placeholder: $t('Search_this_table'),
                  enabled: true,
                }"
                :pagination-options="{
                  enabled: true,
                  mode: 'records',
                  nextLabel: 'next',
                  prevLabel: 'prev',
                }"
                styleClass="tableOne table-hover vgt-table"
              >
              <div slot="table-actions" class="mt-2 mb-3">
                <b-button @click="Sales_Returns_PDF()" size="sm" variant="outline-success ripple m-1">
                  <i class="i-File-Copy"></i> PDF
                </b-button>
              </div>
                <template slot="table-row" slot-scope="props">
                  <div v-if="props.column.field == 'statut'">
                    <span v-if="props.row.statut == 'received' || props.row.statut == 'completed'" class="badge badge-outline-success">
                      {{ props.row.statut == 'received' ? $t('Received') : $t('complete') }}
                    </span>
                    <span v-else class="badge badge-outline-info">{{$t('Pending')}}</span>
                  </div>
                  <div v-else-if="props.column.field == 'payment_status'">
                    <span v-if="props.row.payment_status == 'paid'" class="badge badge-outline-success">{{$t('Paid')}}</span>
                    <span v-else-if="props.row.payment_status == 'partial'" class="badge badge-outline-primary">{{$t('partial')}}</span>
                    <span v-else class="badge badge-outline-warning">{{$t('Unpaid')}}</span>
                  </div>
                  <div v-else-if="props.column.field == 'Ref'">
                    <router-link :to="'/app/sale_return/detail/'+props.row.id">
                      <span class="ul-btn__text ml-1">{{props.row.Ref}}</span>
                    </router-link>
                  </div>
                </template>
              </vue-good-table>
            </b-tab>

            <!-- Purchase Returns Tab -->
            <b-tab title="Purchase Returns">
              <vue-good-table
                mode="remote"
                :columns="columns_purchase_returns"
                :totalRows="totalRows_purchase_returns"
                :rows="purchase_returns"
                @on-page-change="PageChangePurchaseReturn"
                @on-per-page-change="onPerPageChangePurchaseReturn"
                @on-search="onSearch_purchase_returns"
                :search-options="{
                  placeholder: $t('Search_this_table'),
                  enabled: true,
                }"
                :pagination-options="{
                  enabled: true,
                  mode: 'records',
                  nextLabel: 'next',
                  prevLabel: 'prev',
                }"
                styleClass="tableOne table-hover vgt-table"
              >
              <div slot="table-actions" class="mt-2 mb-3">
                <b-button @click="Purchase_Returns_PDF()" size="sm" variant="outline-success ripple m-1">
                  <i class="i-File-Copy"></i> PDF
                </b-button>
              </div>
                <template slot="table-row" slot-scope="props">
                  <div v-if="props.column.field == 'statut'">
                    <span v-if="props.row.statut == 'received' || props.row.statut == 'completed'" class="badge badge-outline-success">
                      {{ props.row.statut == 'received' ? $t('Received') : $t('complete') }}
                    </span>
                    <span v-else class="badge badge-outline-info">{{$t('Pending')}}</span>
                  </div>
                  <div v-else-if="props.column.field == 'payment_status'">
                    <span v-if="props.row.payment_status == 'paid'" class="badge badge-outline-success">{{$t('Paid')}}</span>
                    <span v-else-if="props.row.payment_status == 'partial'" class="badge badge-outline-primary">{{$t('partial')}}</span>
                    <span v-else class="badge badge-outline-warning">{{$t('Unpaid')}}</span>
                  </div>
                  <div v-else-if="props.column.field == 'Ref'">
                    <router-link :to="'/app/purchase_return/detail/'+props.row.id">
                      <span class="ul-btn__text ml-1">{{props.row.Ref}}</span>
                    </router-link>
                  </div>
                </template>
              </vue-good-table>
            </b-tab>

            <!-- Receipts (Customer Payments) Tab -->
            <b-tab title="Receipts">
              <vue-good-table
                mode="remote"
                :columns="columns_receipts"
                :totalRows="totalRows_receipts"
                :rows="receipts"
                @on-page-change="PageChangeReceipts"
                @on-per-page-change="onPerPageChangeReceipts"
                @on-search="onSearch_receipts"
                :search-options="{
                  placeholder: $t('Search_this_table'),
                  enabled: true,
                }"
                :pagination-options="{
                  enabled: true,
                  mode: 'records',
                  nextLabel: 'next',
                  prevLabel: 'prev',
                }"
                styleClass="tableOne table-hover vgt-table"
              >
              <div slot="table-actions" class="mt-2 mb-3">
                <b-button @click="Receipts_PDF()" size="sm" variant="outline-success ripple m-1">
                  <i class="i-File-Copy"></i> PDF
                </b-button>
              </div>
              </vue-good-table>
            </b-tab>

            <!-- Payments (Supplier Payments) Tab -->
            <b-tab title="Payments">
              <vue-good-table
                mode="remote"
                :columns="columns_payments"
                :totalRows="totalRows_payments"
                :rows="payments"
                @on-page-change="PageChangePayments"
                @on-per-page-change="onPerPageChangePayments"
                @on-search="onSearch_payments"
                :search-options="{
                  placeholder: $t('Search_this_table'),
                  enabled: true,
                }"
                :pagination-options="{
                  enabled: true,
                  mode: 'records',
                  nextLabel: 'next',
                  prevLabel: 'prev',
                }"
                styleClass="tableOne table-hover vgt-table"
              >
              <div slot="table-actions" class="mt-2 mb-3">
                <b-button @click="Payments_PDF()" size="sm" variant="outline-success ripple m-1">
                  <i class="i-File-Copy"></i> PDF
                </b-button>
              </div>
              </vue-good-table>
            </b-tab>

            <!-- Ledger Tab -->
            <b-tab title="Ledger">
              <div class="mt-2 mb-3">
                 <b-button @click="Ledger_PDF()" size="sm" variant="outline-success ripple m-1">
                  <i class="i-File-Copy"></i> PDF
                </b-button>
              </div>
              <div class="table-responsive mt-3">
                <table class="table table-hover table-bordered">
                  <thead>
                    <tr>
                      <th class="text-center">{{$t('date')}}</th>
                      <th class="text-center">Book</th>
                      <th class="text-center">Doc.No</th>
                      <th>Particulars</th>
                      <th class="text-right">Debit</th>
                      <th class="text-right">Credit</th>
                      <th class="text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="ledger_data_loaded">
                      <td class="text-center">{{ period.start }}</td>
                      <td class="text-center">-</td>
                      <td class="text-center">-</td>
                      <td><strong>Opening Balance</strong></td>
                      <td class="text-right"></td>
                      <td class="text-right"></td>
                      <td class="text-right font-weight-bold">
                        {{ formatNumber(opening_balance, 2) }} ({{ opening_balance_type }})
                      </td>
                    </tr>
                    <tr v-for="row in ledger" :key="row.timestamp">
                      <td class="text-center">{{ row.date }}</td>
                      <td class="text-center">{{ row.book }}</td>
                      <td class="text-center">{{ row.ref }}</td>
                      <td style="white-space: pre-line;">{{ row.particulars }}</td>
                      <td class="text-right">{{ row.debit > 0 ? formatNumber(row.debit, 2) : '' }}</td>
                      <td class="text-right">{{ row.credit > 0 ? formatNumber(row.credit, 2) : '' }}</td>
                      <td class="text-right font-weight-bold">
                        {{ formatNumber(row.balance, 2) }} ({{ row.balance_type }})
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr v-if="ledger_data_loaded" class="bg-light">
                      <td colspan="4" class="text-right font-weight-bold">Closing Balance</td>
                      <td colspan="3" class="text-right font-weight-bold">
                        {{ formatNumber(closing_balance, 2) }} ({{ closing_balance_type }})
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </b-tab>

          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import NProgress from "nprogress";
import { mapGetters } from "vuex";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  metaInfo() {
    return {
      title: this.company && this.company.name ? this.company.name : "..."
    };
  },
  data() {
    return {
      isLoading: true,
      type: "",
      id: "",
      company: {
        name: "",
        total_transactions: 0,
        total_amount: 0,
        total_paid: 0,
        due: 0
      },
      
      // Sales / Purchases
      sales: [],
      purchases: [],
      totalRows_sales: 0,
      totalRows_purchases: 0,
      limit_sales: 10,
      limit_purchases: 10,
      sales_page: 1,
      purchases_page: 1,
      search_sales: "",
      search_purchases: "",

      // Quotations
      quotations: [],
      totalRows_quotations: 0,
      limit_quotations: 10,
      quotations_page: 1,
      search_quotations: "",

      // Returns
      sales_returns: [],
      totalRows_sales_returns: 0,
      limit_sales_returns: 10,
      sales_returns_page: 1,
      search_sales_returns: "",

      purchase_returns: [],
      totalRows_purchase_returns: 0,
      limit_purchase_returns: 10,
      purchase_returns_page: 1,
      search_purchase_returns: "",

      // Payments / Receipts
      receipts: [],
      totalRows_receipts: 0,
      limit_receipts: 10,
      receipts_page: 1,
      search_receipts: "",

      payments: [],
      totalRows_payments: 0,
      limit_payments: 10,
      payments_page: 1,
      search_payments: "",

      // Ledger
      ledger: [],
      ledger_data_loaded: false,
      opening_balance: 0,
      opening_balance_type: 'Dr',
      closing_balance: 0,
      closing_balance_type: 'Dr',
      period: {
        start: '',
        end: ''
      }
    };
  },

  computed: {
    ...mapGetters(["currentUser"]),
    columns_sales() {
      return [
        { label: this.$t("date"), field: "date" },
        { label: this.$t("Reference"), field: "Ref" },
        { label: "Items", field: "items" },
        { label: "Note", field: "notes" },
        { label: this.$t("Total"), field: "GrandTotal", type: "decimal", tdClass: "text-right", thClass: "text-right" },
        { label: this.$t("Status"), field: "statut", html: true, tdClass: "text-center", thClass: "text-center" }
      ];
    },
    columns_purchases() {
      return [
        { label: this.$t("Reference"), field: "Ref" },
        { label: "Items", field: "items" },
        { label: this.$t("warehouse"), field: "warehouse_name" },
        { label: this.$t("Total"), field: "GrandTotal", type: "decimal" },
        { label: this.$t("Paid"), field: "paid_amount", type: "decimal" },
        { label: this.$t("Due"), field: "due", type: "decimal" },
        { label: this.$t("Status"), field: "statut", html: true },
        { label: this.$t("PaymentStatus"), field: "payment_status", html: true }
      ];
    },
    columns_quotations() {
      return [
        { label: this.$t("date"), field: "date" },
        { label: this.$t("Reference"), field: "Ref" },
        { label: this.$t("warehouse"), field: "warehouse_name" },
        { label: this.$t("Total"), field: "GrandTotal" },
        { label: this.$t("Status"), field: "statut", html: true }
      ];
    },
    columns_sales_returns() {
      return [
        { label: this.$t("Reference"), field: "Ref" },
        { label: this.$t("Sale_Ref"), field: "sale_ref" },
        { label: this.$t("warehouse"), field: "warehouse_name" },
        { label: this.$t("Total"), field: "GrandTotal", type: "decimal" },
        { label: this.$t("Paid"), field: "paid_amount", type: "decimal" },
        { label: this.$t("Due"), field: "due", type: "decimal" },
        { label: this.$t("Status"), field: "statut", html: true },
        { label: this.$t("PaymentStatus"), field: "payment_status", html: true }
      ];
    },
    columns_purchase_returns() {
      return [
        { label: this.$t("Reference"), field: "Ref" },
        { label: this.$t("Purchase_Ref"), field: "purchase_ref" },
        { label: this.$t("warehouse"), field: "warehouse_name" },
        { label: this.$t("Total"), field: "GrandTotal", type: "decimal" },
        { label: this.$t("Paid"), field: "paid_amount", type: "decimal" },
        { label: this.$t("Due"), field: "due", type: "decimal" },
        { label: this.$t("Status"), field: "statut", html: true },
        { label: this.$t("PaymentStatus"), field: "payment_status", html: true }
      ];
    },
    columns_receipts() {
      return [
        { label: this.$t("date"), field: "date" },
        { label: this.$t("Reference"), field: "Ref" },
        { label: this.$t("Sale"), field: "Sale_Ref" },
        { label: this.$t("ModePaiement"), field: "payment_method" },
        { label: "Note", field: "notes" },
        { label: this.$t("Amount"), field: "montant", type: "decimal", tdClass: "text-right", thClass: "text-right" }
      ];
    },
    columns_payments() {
      return [
        { label: this.$t("date"), field: "date" },
        { label: this.$t("Reference"), field: "Ref" },
        { label: this.$t("Purchase"), field: "purchase_Ref" },
        { label: this.$t("ModePaiement"), field: "payment_method" },
        { label: "Note", field: "notes" },
        { label: this.$t("Amount"), field: "montant", type: "decimal", tdClass: "text-right", thClass: "text-right" }
      ];
    }
  },

  methods: {
    formatNumber(number, dec) {
      const value = (typeof number === "string" ? number : number.toString()).split(".");
      if (dec <= 0) return value[0];
      let formated = value[1] || "";
      if (formated.length > dec) return `${value[0]}.${formated.substr(0, dec)}`;
      while (formated.length < dec) formated += "0";
      return `${value[0]}.${formated}`;
    },

    tabChanged(tabIndex) {
      // Lazy loading tabs could go here, but we load everything initially
    },

    Get_Company_Details() {
      axios.get(`report/company/${this.id}/${this.type}`)
        .then(response => {
          this.company = response.data.report;
          this.isLoading = false;

          // Always fetch all data for unified company view
          this.Get_Sales(1);
          this.Get_Quotations(1);
          this.Get_Customer_Returns(1);
          this.Get_Customer_Ledger();
          this.Get_Customer_Payments(1);

          this.Get_Purchases(1);
          this.Get_Supplier_Returns(1);
          this.Get_Supplier_Payments(1);
        });
    },

    // ------ SALES & PURCHASES GETTERS ------
    Get_Sales(page) {
      axios.get(`report/client_sales?page=${page}&limit=${this.limit_sales}&search=${this.search_sales}&id=${this.id}`)
        .then(res => {
          this.sales = res.data.sales;
          this.totalRows_sales = res.data.totalRows;
        });
    },
    PageChangeSales({ currentPage }) {
      this.sales_page = currentPage;
      this.Get_Sales(currentPage);
    },
    onPerPageChangeSales({ currentPerPage }) {
      this.limit_sales = currentPerPage;
      this.Get_Sales(1);
    },
    onSearch_sales(val) {
      this.search_sales = val.searchTerm;
      this.Get_Sales(1);
    },

    Get_Purchases(page) {
      axios.get(`report/provider_purchases?page=${page}&limit=${this.limit_purchases}&search=${this.search_purchases}&id=${this.id}`)
        .then(res => {
          this.purchases = res.data.purchases;
          this.totalRows_purchases = res.data.totalRows;
        });
    },
    PageChangePurchases({ currentPage }) {
      this.purchases_page = currentPage;
      this.Get_Purchases(currentPage);
    },
    onPerPageChangePurchases({ currentPerPage }) {
      this.limit_purchases = currentPerPage;
      this.Get_Purchases(1);
    },
    onSearch_purchases(val) {
      this.search_purchases = val.searchTerm;
      this.Get_Purchases(1);
    },

    // ------ QUOTATIONS GETTER ------
    Get_Quotations(page) {
      axios.get(`report/client_quotations?page=${page}&limit=${this.limit_quotations}&search=${this.search_quotations}&id=${this.id}`)
        .then(res => {
          this.quotations = res.data.quotations;
          this.totalRows_quotations = res.data.totalRows;
        });
    },
    PageChangeQuotation({ currentPage }) {
      this.quotations_page = currentPage;
      this.Get_Quotations(currentPage);
    },
    onPerPageChangeQuotation({ currentPerPage }) {
      this.limit_quotations = currentPerPage;
      this.Get_Quotations(1);
    },
    onSearch_quotations(val) {
      this.search_quotations = val.searchTerm;
      this.Get_Quotations(1);
    },

    // ------ RETURNS GETTERS ------
    Get_Customer_Returns(page) {
      axios.get(`report/client_returns?page=${page}&limit=${this.limit_sales_returns}&search=${this.search_sales_returns}&id=${this.id}`)
        .then(res => {
          this.sales_returns = res.data.returns_customer;
          this.totalRows_sales_returns = res.data.totalRows;
        });
    },
    PageChangeSalesReturn({ currentPage }) {
      this.sales_returns_page = currentPage;
      this.Get_Customer_Returns(currentPage);
    },
    onPerPageChangeSalesReturn({ currentPerPage }) {
      this.limit_sales_returns = currentPerPage;
      this.Get_Customer_Returns(1);
    },
    onSearch_sales_returns(val) {
      this.search_sales_returns = val.searchTerm;
      this.Get_Customer_Returns(1);
    },

    Get_Supplier_Returns(page) {
      axios.get(`report/provider_returns?page=${page}&limit=${this.limit_purchase_returns}&search=${this.search_purchase_returns}&id=${this.id}`)
        .then(res => {
          this.purchase_returns = res.data.returns_supplier;
          this.totalRows_purchase_returns = res.data.totalRows;
        });
    },
    PageChangePurchaseReturn({ currentPage }) {
      this.purchase_returns_page = currentPage;
      this.Get_Supplier_Returns(currentPage);
    },
    onPerPageChangePurchaseReturn({ currentPerPage }) {
      this.limit_purchase_returns = currentPerPage;
      this.Get_Supplier_Returns(1);
    },
    onSearch_purchase_returns(val) {
      this.search_purchase_returns = val.searchTerm;
      this.Get_Supplier_Returns(1);
    },

    // ------ RECEIPTS & PAYMENTS GETTERS ------
    Get_Customer_Payments(page) {
      axios.get(`report/client_payments?page=${page}&limit=${this.limit_receipts}&search=${this.search_receipts}&id=${this.id}`)
        .then(res => {
          this.receipts = res.data.payments;
          this.totalRows_receipts = res.data.totalRows;
        });
    },
    PageChangeReceipts({ currentPage }) {
      this.receipts_page = currentPage;
      this.Get_Customer_Payments(currentPage);
    },
    onPerPageChangeReceipts({ currentPerPage }) {
      this.limit_receipts = currentPerPage;
      this.Get_Customer_Payments(1);
    },
    onSearch_receipts(val) {
      this.search_receipts = val.searchTerm;
      this.Get_Customer_Payments(1);
    },

    Get_Supplier_Payments(page) {
      axios.get(`report/provider_payments?page=${page}&limit=${this.limit_payments}&search=${this.search_payments}&id=${this.id}`)
        .then(res => {
          this.payments = res.data.payments;
          this.totalRows_payments = res.data.totalRows;
        });
    },
    PageChangePayments({ currentPage }) {
      this.payments_page = currentPage;
      this.Get_Supplier_Payments(currentPage);
    },
    onPerPageChangePayments({ currentPerPage }) {
      this.limit_payments = currentPerPage;
      this.Get_Supplier_Payments(1);
    },
    onSearch_payments(val) {
      this.search_payments = val.searchTerm;
      this.Get_Supplier_Payments(1);
    },

    // ------ LEDGER GETTER ------
    Get_Customer_Ledger() {
      axios.get(`report/customer_ledger/${this.id}`)
        .then(res => {
          this.ledger = res.data.ledger;
          this.opening_balance = res.data.opening_balance;
          this.opening_balance_type = res.data.opening_balance_type;
          this.closing_balance = res.data.closing_balance;
          this.closing_balance_type = res.data.closing_balance_type;
          this.period = res.data.period;
          this.ledger_data_loaded = true;
        });
    },

    // ------ PDF GENERATION FUNCTIONS ------
    Sales_PDF() {
      var self = this;
      let pdf = new jsPDF("l", "pt");
      const fontPath = "/fonts/Vazirmatn-Bold.ttf";
      pdf.addFont(fontPath, "VazirmatnBold", "bold"); 
      pdf.setFont("VazirmatnBold"); 

      let columns = [
        { title: "Sr.No", dataKey: "sr_no" },
        { title: self.$t("date"), dataKey: "date" },
        { title: "Bill No.", dataKey: "Ref" },
        { title: "Items", dataKey: "items" },
        { title: "Bill Amount", dataKey: "GrandTotal" },
      ];

      let formatted_sales = self.sales.map((sale, index) => {
        return {
          sr_no: index + 1,
          date: sale.date,
          Ref: sale.Ref,
          items: sale.items,
          GrandTotal: self.formatNumber(sale.GrandTotal, 2),
        };
      });

      let totalAmount = self.sales.reduce((sum, s) => sum + parseFloat(s.GrandTotal || 0), 0);

      let footer = [{
        sr_no: '',
        date: '',
        Ref: '',
        items: 'Total .....',
        GrandTotal: totalAmount.toFixed(2),
      }];

      pdf.autoTable({
        columns: columns,
        body: formatted_sales,
        foot: footer,
        startY: 80,
        theme: "grid", 
        styles: { font: "VazirmatnBold", fontSize: 11, halign: "center" },
        columnStyles: { items: { halign: 'left' }, GrandTotal: { halign: 'right' } },
        didDrawPage: (data) => {
           pdf.setFont("VazirmatnBold");
           pdf.setFontSize(20);
           pdf.text("|| Swami Shreeji ||", pdf.internal.pageSize.width / 2, 25, { align: 'center' });
           pdf.setFontSize(18);
           pdf.text("Sales List", pdf.internal.pageSize.width / 2, 45, { align: 'center' });
           pdf.setFontSize(14);
           pdf.text(`Company: ${self.company.name}`, 40, 65);
        },
        headStyles: { fillColor: [242, 242, 242], textColor: [0, 0, 0], fontStyle: "bold", lineWidth: 0.5, lineColor: [0, 0, 0] },
        footStyles: { fillColor: [242, 242, 242], textColor: [0, 0, 0], fontStyle: "bold", lineWidth: 0.5, lineColor: [0, 0, 0] },
      });

      pdf.save("Sales_List.pdf");
    },

    Purchase_PDF() {
      var self = this;
      let pdf = new jsPDF("l", "pt");
      const fontPath = "/fonts/Vazirmatn-Bold.ttf";
      pdf.addFont(fontPath, "VazirmatnBold", "bold"); 
      pdf.setFont("VazirmatnBold"); 

      let columns = [
        { title: "Sr.No", dataKey: "sr_no" },
        { title: self.$t("date"), dataKey: "date" },
        { title: "Bill No.", dataKey: "Ref" },
        { title: "Items", dataKey: "items" },
        { title: "Bill Amount", dataKey: "GrandTotal" },
      ];

      let formatted_purchases = self.purchases.map((purchase, index) => {
        return {
          sr_no: index + 1,
          date: purchase.date,
          Ref: purchase.Ref,
          items: purchase.items,
          GrandTotal: self.formatNumber(purchase.GrandTotal, 2),
        };
      });

      let totalAmount = self.purchases.reduce((sum, p) => sum + parseFloat(p.GrandTotal || 0), 0);

      let footer = [{
        sr_no: '',
        date: '',
        Ref: '',
        items: 'Total .....',
        GrandTotal: totalAmount.toFixed(2),
      }];

      pdf.autoTable({
        columns: columns,
        body: formatted_purchases,
        foot: footer,
        startY: 80,
        theme: "grid", 
        styles: { font: "VazirmatnBold", fontSize: 9, halign: "center" },
        columnStyles: { items: { halign: 'left' }, GrandTotal: { halign: 'right' } },
        didDrawPage: (data) => {
           pdf.setFont("VazirmatnBold");
           pdf.setFontSize(16);
           pdf.text("|| Swami Shreeji ||", pdf.internal.pageSize.width / 2, 25, { align: 'center' });
           pdf.setFontSize(14);
           pdf.text("Purchases List", pdf.internal.pageSize.width / 2, 45, { align: 'center' });
           pdf.setFontSize(11);
           pdf.text(`Company: ${self.company.name}`, 40, 65);
        },
        headStyles: { fillColor: [242, 242, 242], textColor: [0, 0, 0], fontStyle: "bold", lineWidth: 0.5, lineColor: [0, 0, 0] },
        footStyles: { fillColor: [242, 242, 242], textColor: [0, 0, 0], fontStyle: "bold", lineWidth: 0.5, lineColor: [0, 0, 0] },
      });

      pdf.save("Purchases_List.pdf");
    },

    Quotation_PDF() {
      var self = this;
      let pdf = new jsPDF("l", "pt");
      const fontPath = "/fonts/Vazirmatn-Bold.ttf";
      pdf.addFont(fontPath, "VazirmatnBold", "bold"); 
      pdf.setFont("VazirmatnBold"); 

      let columns = [
        { title: "Sr.No", dataKey: "sr_no" },
        { title: self.$t("date"), dataKey: "date" },
        { title: "Bill No.", dataKey: "Ref" },
        { title: "Items", dataKey: "items" },
        { title: "Bill Amount", dataKey: "GrandTotal" },
      ];

      let formatted_data = self.quotations.map((item, index) => {
        return {
          sr_no: index + 1,
          date: item.date,
          Ref: item.Ref,
          items: item.items,
          GrandTotal: self.formatNumber(item.GrandTotal, 2),
        };
      });

      pdf.autoTable({
        columns: columns,
        body: formatted_data,
        startY: 80,
        theme: "grid", 
        styles: { font: "VazirmatnBold", fontSize: 11, halign: "center" },
        columnStyles: { GrandTotal: { halign: 'right' } },
        didDrawPage: (data) => {
          pdf.setFont("VazirmatnBold");
          pdf.setFontSize(20);
          pdf.text("|| Swami Shreeji ||", pdf.internal.pageSize.width / 2, 25, { align: 'center' });
          pdf.setFontSize(18);
          pdf.text("Company Quotation List", pdf.internal.pageSize.width / 2, 45, { align: 'center' });
          pdf.setFontSize(14);
          pdf.text(`Company: ${self.company.name}`, 40, 65);
        },
        headStyles: { fillColor: [242, 242, 242], textColor: [0, 0, 0], fontStyle: "bold", lineWidth: 0.5, lineColor: [0, 0, 0] },
      });

      pdf.save("Quotation_List.pdf");
    },

    Sales_Returns_PDF() {
      var self = this;
      let pdf = new jsPDF("l", "pt");
      const fontPath = "/fonts/Vazirmatn-Bold.ttf";
      pdf.addFont(fontPath, "VazirmatnBold", "bold"); 
      pdf.setFont("VazirmatnBold"); 

      let columns = [
        { title: "Sr.No", dataKey: "sr_no" },
        { title: self.$t("Reference"), dataKey: "Ref" },
        { title: self.$t("date"), dataKey: "date" },
        { title: self.$t("Sale"), dataKey: "sale_ref" },
        { title: self.$t("warehouse"), dataKey: "warehouse_name" },
        { title: self.$t("Total"), dataKey: "GrandTotal" },
        { title: self.$t("Paid"), dataKey: "paid_amount" },
        { title: self.$t("Due"), dataKey: "due" }
      ];

      let formatted_data = self.sales_returns.map((item, index) => {
        return {
          sr_no: index + 1,
          Ref: item.Ref,
          date: item.date,
          sale_ref: item.sale_ref || "-",
          warehouse_name: item.warehouse_name,
          GrandTotal: self.formatNumber(item.GrandTotal, 2),
          paid_amount: self.formatNumber(item.paid_amount, 2),
          due: self.formatNumber(item.due, 2)
        };
      });

      pdf.autoTable({
        columns: columns,
        body: formatted_data,
        startY: 80,
        theme: "grid", 
        styles: { font: "VazirmatnBold", fontSize: 10, halign: "center" },
        columnStyles: { GrandTotal: { halign: 'right' }, paid_amount: { halign: 'right' }, due: { halign: 'right' } },
        didDrawPage: (data) => {
           pdf.setFont("VazirmatnBold");
           pdf.setFontSize(20);
           pdf.text("|| Swami Shreeji ||", pdf.internal.pageSize.width / 2, 25, { align: 'center' });
           pdf.setFontSize(18);
           pdf.text("Sales Return List", pdf.internal.pageSize.width / 2, 45, { align: 'center' });
           pdf.setFontSize(14);
           pdf.text(`Company: ${self.company.name}`, 40, 65);
        },
        headStyles: { fillColor: [242, 242, 242], textColor: [0, 0, 0], fontStyle: "bold", lineWidth: 0.5, lineColor: [0, 0, 0] },
      });

      pdf.save("Sales_Returns_List.pdf");
    },

    Purchase_Returns_PDF() {
      var self = this;
      let pdf = new jsPDF("l", "pt");
      const fontPath = "/fonts/Vazirmatn-Bold.ttf";
      pdf.addFont(fontPath, "VazirmatnBold", "bold"); 
      pdf.setFont("VazirmatnBold"); 

      let columns = [
        { title: "Sr.No", dataKey: "sr_no" },
        { title: self.$t("Reference"), dataKey: "Ref" },
        { title: self.$t("date"), dataKey: "date" },
        { title: self.$t("Purchase"), dataKey: "purchase_ref" },
        { title: self.$t("warehouse"), dataKey: "warehouse_name" },
        { title: self.$t("Total"), dataKey: "GrandTotal" },
        { title: self.$t("Paid"), dataKey: "paid_amount" },
        { title: self.$t("Due"), dataKey: "due" }
      ];

      let formatted_data = self.purchase_returns.map((item, index) => {
        return {
          sr_no: index + 1,
          Ref: item.Ref,
          date: item.date,
          purchase_ref: item.purchase_ref || "-",
          warehouse_name: item.warehouse_name,
          GrandTotal: self.formatNumber(item.GrandTotal, 2),
          paid_amount: self.formatNumber(item.paid_amount, 2),
          due: self.formatNumber(item.due, 2)
        };
      });

      pdf.autoTable({
        columns: columns,
        body: formatted_data,
        startY: 80,
        theme: "grid", 
        styles: { font: "VazirmatnBold", fontSize: 10, halign: "center" },
        columnStyles: { GrandTotal: { halign: 'right' }, paid_amount: { halign: 'right' }, due: { halign: 'right' } },
        didDrawPage: (data) => {
           pdf.setFont("VazirmatnBold");
           pdf.setFontSize(20);
           pdf.text("|| Swami Shreeji ||", pdf.internal.pageSize.width / 2, 25, { align: 'center' });
           pdf.setFontSize(18);
           pdf.text("Purchase Return List", pdf.internal.pageSize.width / 2, 45, { align: 'center' });
           pdf.setFontSize(14);
           pdf.text(`Company: ${self.company.name}`, 40, 65);
        },
        headStyles: { fillColor: [242, 242, 242], textColor: [0, 0, 0], fontStyle: "bold", lineWidth: 0.5, lineColor: [0, 0, 0] },
      });

      pdf.save("Purchase_Returns_List.pdf");
    },

    Receipts_PDF() {
      var self = this;
      let pdf = new jsPDF("l", "pt");
      const fontPath = "/fonts/Vazirmatn-Bold.ttf";
      pdf.addFont(fontPath, "VazirmatnBold", "bold"); 
      pdf.setFont("VazirmatnBold");

      let columns = [
        { title: "Sr.No", dataKey: "sr_no" },
        { title: self.$t("date"), dataKey: "date" },
        { title: "Rcpt No.", dataKey: "Ref" },
        { title: self.$t("Sale"), dataKey: "Sale_Ref" },
        { title: self.$t("ModePaiement"), dataKey: "payment_method" },
        { title: "Note", dataKey: "notes" },
        { title: self.$t("Amount"), dataKey: "montant" },
      ];

      let formatted_data = self.receipts.map((payment, index) => {
        return {
          sr_no: index + 1,
          date: payment.date,
          Ref: payment.Ref,
          Sale_Ref: payment.Sale_Ref || "-",
          payment_method: payment.payment_method,
          notes: payment.notes || "",
          montant: self.formatNumber(payment.montant, 2),
        };
      });

      let totalAmount = self.receipts.reduce((sum, p) => sum + parseFloat(p.montant || 0), 0);

      let footer = [{
        sr_no: '',
        date: '',
        Ref: '',
        Sale_Ref: '',
        payment_method: '',
        notes: 'Total Received .....',
        montant: totalAmount.toFixed(2),
      }];

      pdf.autoTable({
        columns: columns,
        body: formatted_data,
        foot: footer,
        startY: 80,
        theme: "grid", 
        styles: { font: "VazirmatnBold", fontSize: 10, halign: "center" },
        columnStyles: { montant: { halign: 'right' } },
        didDrawPage: (data) => {
           pdf.setFont("VazirmatnBold");
           pdf.setFontSize(20);
           pdf.text("|| Swami Shreeji ||", pdf.internal.pageSize.width / 2, 25, { align: 'center' });
           pdf.setFontSize(18);
           pdf.text("Receipts List (Customer Payments)", pdf.internal.pageSize.width / 2, 45, { align: 'center' });
           pdf.setFontSize(14);
           pdf.text(`Company: ${self.company.name}`, 40, 65);
        },
        headStyles: { fillColor: [242, 242, 242], textColor: [0, 0, 0], fontStyle: "bold", lineWidth: 0.5, lineColor: [0, 0, 0] },
        footStyles: { fillColor: [242, 242, 242], textColor: [0, 0, 0], fontStyle: "bold", lineWidth: 0.5, lineColor: [0, 0, 0] },
      });

      pdf.save("Receipts_List.pdf");
    },

    Payments_PDF() {
      var self = this;
      let pdf = new jsPDF("l", "pt");
      const fontPath = "/fonts/Vazirmatn-Bold.ttf";
      pdf.addFont(fontPath, "VazirmatnBold", "bold"); 
      pdf.setFont("VazirmatnBold");

      let columns = [
        { title: "Sr.No", dataKey: "sr_no" },
        { title: self.$t("date"), dataKey: "date" },
        { title: "Pay No.", dataKey: "Ref" },
        { title: self.$t("Purchase"), dataKey: "purchase_Ref" },
        { title: self.$t("ModePaiement"), dataKey: "payment_method" },
        { title: "Note", dataKey: "notes" },
        { title: self.$t("Amount"), dataKey: "montant" },
      ];

      let formatted_data = self.payments.map((payment, index) => {
        return {
          sr_no: index + 1,
          date: payment.date,
          Ref: payment.Ref,
          purchase_Ref: payment.purchase_Ref || "-",
          payment_method: payment.payment_method,
          notes: payment.notes || "",
          montant: self.formatNumber(payment.montant, 2),
        };
      });

      let totalAmount = self.payments.reduce((sum, p) => sum + parseFloat(p.montant || 0), 0);

      let footer = [{
        sr_no: '',
        date: '',
        Ref: '',
        purchase_Ref: '',
        payment_method: '',
        notes: 'Total Paid .....',
        montant: totalAmount.toFixed(2),
      }];

      pdf.autoTable({
        columns: columns,
        body: formatted_data,
        foot: footer,
        startY: 80,
        theme: "grid", 
        styles: { font: "VazirmatnBold", fontSize: 10, halign: "center" },
        columnStyles: { montant: { halign: 'right' } },
        didDrawPage: (data) => {
           pdf.setFont("VazirmatnBold");
           pdf.setFontSize(20);
           pdf.text("|| Swami Shreeji ||", pdf.internal.pageSize.width / 2, 25, { align: 'center' });
           pdf.setFontSize(18);
           pdf.text("Payments List (Supplier Payments)", pdf.internal.pageSize.width / 2, 45, { align: 'center' });
           pdf.setFontSize(14);
           pdf.text(`Company: ${self.company.name}`, 40, 65);
        },
        headStyles: { fillColor: [242, 242, 242], textColor: [0, 0, 0], fontStyle: "bold", lineWidth: 0.5, lineColor: [0, 0, 0] },
        footStyles: { fillColor: [242, 242, 242], textColor: [0, 0, 0], fontStyle: "bold", lineWidth: 0.5, lineColor: [0, 0, 0] },
      });

      pdf.save("Payments_List.pdf");
    },

    Ledger_PDF() {
      const url = (this.type === 'customer' || this.type === 'company')
        ? "report/customer_ledger_pdf/" + this.id 
        : "report/supplier_ledger_pdf/" + this.id;
      
      NProgress.start();
      NProgress.set(0.1);
      
      axios
        .get(url, {
          responseType: "blob",
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          const urlObj = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = urlObj;
          const fileName = "Ledger-" + (this.company ? this.company.name : "Report") + ".pdf";
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setTimeout(() => NProgress.done(), 500);
        })
        .catch((error) => {
          console.error("Ledger PDF download error:", error);
          setTimeout(() => NProgress.done(), 500);
        });
    }
  },

  created() {
    this.type = this.$route.params.type;
    this.id = this.$route.params.id;
    this.Get_Company_Details();
  }
};
</script>
