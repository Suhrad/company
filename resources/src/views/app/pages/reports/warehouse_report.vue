<template>
  <div class="main-content">
    <breadcumb :page="$t('Warehouse_report')" :folder="$t('Reports')"/>
    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>

    <b-row class="align-items-end mb-5" v-if="!isLoading">
      <!-- warehouse -->
      <b-col lg="4" md="4" sm="12" class="mb-3 mb-md-0">
        <b-form-group :label="$t('warehouse')">
          <v-select
            @input="Selected_Warehouse"
            v-model="Filter_warehouse"
            :reduce="label => label.value"
            :placeholder="$t('All_Warehouses')"
            :options="warehouses.map(warehouses => ({label: warehouses.name, value: warehouses.id}))"
          />
        </b-form-group>
      </b-col>
      <!-- date range -->
      <b-col lg="4" md="4" sm="12" class="mb-3 mb-md-0">
        <b-form-group :label="$t('DateRange')">
          <date-range-picker
            v-model="dateRange"
            :locale-data="locale"
            :autoApply="true"
            :showDropdowns="true"
            :opens="'left'"
            class="w-100"
          >
            <template v-slot:input="picker">
              <b-button variant="light" class="w-100 text-left border bg-white d-flex align-items-center justify-content-between">
                <span>
                  <i class="i-Calendar-4 mr-1"></i>
                  {{ fmt(picker.startDate) }} — {{ fmt(picker.endDate) }}
                </span>
                <i class="i-Arrow-Down"></i>
              </b-button>
            </template>
          </date-range-picker>
        </b-form-group>
      </b-col>
      <!-- export button -->
      <b-col lg="4" md="4" sm="12" class="mb-3 text-right text-md-left">
        <b-button @click="Download_Sales_Item_Summary()" variant="outline-success ripple" class="d-flex align-items-center justify-content-center">
          <i class="i-File-Copy mr-2"></i> Export Item Summary (PDF)
        </b-button>
      </b-col>
    </b-row>

    <b-row v-if="!isLoading">
      <!-- ICON BG -->
      <b-col lg="3" md="6" sm="12">
        <b-card class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center">
          <i class="i-Full-Cart"></i>
          <div class="content">
            <p class="text-muted mt-2 mb-0">{{$t('Sales')}}</p>
            <p class="text-primary text-24 line-height-1 mb-2">{{total.sales}}</p>
          </div>
        </b-card>
      </b-col>
      <b-col lg="3" md="6" sm="12">
        <b-card class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center">
          <i class="i-Checkout-Basket"></i>
          <div class="content">
            <p class="text-muted mt-2 mb-0">{{$t('Purchases')}}</p>
            <p class="text-primary text-24 line-height-1 mb-2">{{total.purchases}}</p>
          </div>
        </b-card>
      </b-col>
      <b-col lg="3" md="6" sm="12">
        <b-card class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center">
          <i class="i-Turn-Left"></i>
          <div class="content">
            <p class="text-muted mt-2 mb-0">{{$t('PurchasesReturn')}}</p>
            <p class="text-primary text-24 line-height-1 mb-2">{{total.ReturnPurchase}}</p>
          </div>
        </b-card>
      </b-col>
      <b-col lg="3" md="6" sm="12">
        <b-card class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center">
          <i class="i-Turn-Right"></i>
          <div class="content">
            <p class="text-muted mt-2 mb-0">{{$t('SalesReturn')}}</p>
            <p class="text-primary text-24 line-height-1 mb-2">{{total.ReturnSale}}</p>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <b-row v-if="!isLoading">
      <b-col md="12">
        <b-card no-body class="card mb-30" header-bg-variant="transparent ">
          <b-tabs active-nav-item-class="nav nav-tabs" content-class="mt-3">
            <!-- Quotations Table -->
            <b-tab :title="$t('Quotations')">
              <vue-good-table
                mode="remote"
                :columns="columns_quotations"
                :totalRows="totalRows_quotations"
                :rows="quotations"
                @on-page-change="PageChangeQuotation"
                @on-per-page-change="onPerPageChangeQuotation"
                @on-search="onSearch_Quotations"
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
                styleClass="order-table vgt-table mt-2"
              >
               <div slot="table-actions" class="mt-2 mb-3">
                <b-button @click="Quotation_PDF()" size="sm" variant="outline-success ripple m-1">
                  <i class="i-File-Copy"></i> PDF
                </b-button>
              </div>
                <template slot="table-row" slot-scope="props">
                  <div v-if="props.column.field == 'statut'">
                    <span
                      v-if="props.row.statut == 'sent'"
                      class="badge badge-outline-success"
                    >{{$t('Sent')}}</span>
                    <span v-else class="badge badge-outline-info">{{$t('Pending')}}</span>
                  </div>
                   <div v-else-if="props.column.field == 'Ref'">
                    <router-link
                      :to="'/app/quotations/detail/'+props.row.id"
                    >
                      <span class="ul-btn__text ml-1">{{props.row.Ref}}</span>
                    </router-link>
                  </div>
                </template>
              </vue-good-table>
            </b-tab>

            <!-- Sales Table -->
            <b-tab :title="$t('Sales')">
              <vue-good-table
                mode="remote"
                :columns="columns_sales"
                :totalRows="totalRows_sales"
                :rows="sales"
                @on-page-change="PageChangeSales"
                @on-per-page-change="onPerPageChangeSales"
                @on-search="onSearch_Sales"
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
                styleClass="order-table vgt-table mt-2"
              >
               <div slot="table-actions" class="mt-2 mb-3">
                <b-button @click="Sales_PDF()" size="sm" variant="outline-success ripple m-1">
                  <i class="i-File-Copy"></i> PDF
                </b-button>
              </div>
                <template slot="table-row" slot-scope="props">
                  <div v-if="props.column.field == 'statut'">
                    <span
                      v-if="props.row.statut == 'completed'"
                      class="badge badge-outline-success"
                    >{{$t('complete')}}</span>
                    <span
                      v-else-if="props.row.statut == 'pending'"
                      class="badge badge-outline-info"
                    >{{$t('Pending')}}</span>
                    <span v-else class="badge badge-outline-warning">{{$t('Ordered')}}</span>
                  </div>
                  <div v-else-if="props.column.field == 'payment_status'">
                    <span
                      v-if="props.row.payment_status == 'paid'"
                      class="badge badge-outline-success"
                    >{{$t('Paid')}}</span>
                    <span
                      v-else-if="props.row.payment_status == 'partial'"
                      class="badge badge-outline-primary"
                    >{{$t('partial')}}</span>
                    <span v-else class="badge badge-outline-warning">{{$t('Unpaid')}}</span>
                  </div>
                   <div v-else-if="props.column.field == 'shipping_status'">
                  <span
                    v-if="props.row.shipping_status == 'ordered'"
                    class="badge badge-outline-warning"
                  >{{$t('Ordered')}}</span>

                  <span
                    v-else-if="props.row.shipping_status == 'packed'"
                    class="badge badge-outline-info"
                  >{{$t('Packed')}}</span>

                  <span
                    v-else-if="props.row.shipping_status == 'shipped'"
                    class="badge badge-outline-secondary"
                  >{{$t('Shipped')}}</span>

                  <span
                    v-else-if="props.row.shipping_status == 'delivered'"
                    class="badge badge-outline-success"
                  >{{$t('Delivered')}}</span>

                  <span v-else-if="props.row.shipping_status == 'cancelled'" class="badge badge-outline-danger">{{$t('Cancelled')}}</span>
                </div>
                   <div v-else-if="props.column.field == 'Ref'">
                    <router-link
                      :to="'/app/sales/detail/'+props.row.id"
                    >
                      <span class="ul-btn__text ml-1">{{props.row.Ref}}</span>
                    </router-link>
                  </div>
                </template>
              </vue-good-table>
            </b-tab>

            <!-- Purchases Table -->
            <b-tab :title="$t('Purchases')">
              <vue-good-table
                mode="remote"
                :columns="columns_purchases"
                :totalRows="totalRows_purchases"
                :rows="purchases"
                @on-page-change="PageChangePurchases"
                @on-per-page-change="onPerPageChangePurchases"
                @on-search="onSearch_Purchases"
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
                styleClass="order-table vgt-table mt-2"
              >
               <div slot="table-actions" class="mt-2 mb-3">
                <b-button @click="Purchases_PDF()" size="sm" variant="outline-success ripple m-1">
                  <i class="i-File-Copy"></i> PDF
                </b-button>
              </div>
                <template slot="table-row" slot-scope="props">
                  <div v-if="props.column.field == 'statut'">
                    <span
                      v-if="props.row.statut == 'received'"
                      class="badge badge-outline-success"
                    >{{$t('Received')}}</span>
                    <span
                      v-else-if="props.row.statut == 'pending'"
                      class="badge badge-outline-info"
                    >{{$t('Pending')}}</span>
                    <span v-else class="badge badge-outline-warning">{{$t('Ordered')}}</span>
                  </div>
                  <div v-else-if="props.column.field == 'payment_status'">
                    <span
                      v-if="props.row.payment_status == 'paid'"
                      class="badge badge-outline-success"
                    >{{$t('Paid')}}</span>
                    <span
                      v-else-if="props.row.payment_status == 'partial'"
                      class="badge badge-outline-primary"
                    >{{$t('partial')}}</span>
                    <span v-else class="badge badge-outline-warning">{{$t('Unpaid')}}</span>
                  </div>
                   <div v-else-if="props.column.field == 'Ref'">
                    <router-link
                      :to="'/app/purchases/detail/'+props.row.id"
                    >
                      <span class="ul-btn__text ml-1">{{props.row.Ref}}</span>
                    </router-link>
                  </div>
                </template>
              </vue-good-table>
            </b-tab>

            <!-- Returns Sale Table -->
            <b-tab :title="$t('SalesReturn')">
              <vue-good-table
                mode="remote"
                :columns="columns_returns_sale"
                :totalRows="totalRows_Return_sale"
                :rows="returns_sale"
                @on-page-change="PageChangeReturn_Customer"
                @on-per-page-change="onPerPageChangeReturn_Sale"
                :pagination-options="{
                    enabled: true,
                    mode: 'records',
                    nextLabel: 'next',
                    prevLabel: 'prev',
                  }"
                @on-search="onSearch_Return_Sale"
                :search-options="{
                    placeholder: $t('Search_this_table'),
                    enabled: true,
                }"
                styleClass="order-table vgt-table mt-2"
              >
               <div slot="table-actions" class="mt-2 mb-3">
                <b-button @click="Sale_Return_PDF()" size="sm" variant="outline-success ripple m-1">
                  <i class="i-File-Copy"></i> PDF
                </b-button>
              </div>
                <template slot="table-row" slot-scope="props">
                  <div v-if="props.column.field == 'statut'">
                    <span
                      v-if="props.row.statut == 'received'"
                      class="badge badge-outline-success"
                    >{{$t('Received')}}</span>
                    <span v-else class="badge badge-outline-info">{{$t('Pending')}}</span>
                  </div>

                  <div v-else-if="props.column.field == 'payment_status'">
                    <span
                      v-if="props.row.payment_status == 'paid'"
                      class="badge badge-outline-success"
                    >{{$t('Paid')}}</span>
                    <span
                      v-else-if="props.row.payment_status == 'partial'"
                      class="badge badge-outline-primary"
                    >{{$t('partial')}}</span>
                    <span v-else class="badge badge-outline-warning">{{$t('Unpaid')}}</span>
                  </div>
                   <div v-else-if="props.column.field == 'Ref'">
                    <router-link
                      :to="'/app/sale_return/detail/'+props.row.id"
                    >
                      <span class="ul-btn__text ml-1">{{props.row.Ref}}</span>
                    </router-link>
                  </div>
                  <div v-else-if="props.column.field == 'sale_ref' && props.row.sale_id">
                  <router-link
                    :to="'/app/sales/detail/'+props.row.sale_id"
                  >
                    <span class="ul-btn__text ml-1">{{props.row.sale_ref}}</span>
                  </router-link>
                </div>
                </template>
              </vue-good-table>
            </b-tab>

            <!-- Returns Purchase Table -->
            <b-tab :title="$t('PurchasesReturn')">
              <vue-good-table
                mode="remote"
                :columns="columns_returns_purchase"
                :totalRows="totalRows_Return_purchase"
                :rows="returns_purchase"
                @on-page-change="PageChangeReturn_Purchase"
                @on-per-page-change="onPerPageChangeReturn_Purchase"
                :pagination-options="{
                  enabled: true,
                  mode: 'records',
                  nextLabel: 'next',
                  prevLabel: 'prev',
                }"
                @on-search="onSearch_Return_Purchase"
                :search-options="{
                    placeholder: $t('Search_this_table'),
                    enabled: true,
                }"
                styleClass="order-table vgt-table mt-2"
              >
               <div slot="table-actions" class="mt-2 mb-3">
                <b-button @click="Returns_Purchase_PDF()" size="sm" variant="outline-success ripple m-1">
                  <i class="i-File-Copy"></i> PDF
                </b-button>
              </div>
                <template slot="table-row" slot-scope="props">
                  <div v-if="props.column.field == 'statut'">
                    <span
                      v-if="props.row.statut == 'completed'"
                      class="badge badge-outline-success"
                    >{{$t('complete')}}</span>
                    <span v-else class="badge badge-outline-info">{{$t('Pending')}}</span>
                  </div>

                  <div v-else-if="props.column.field == 'payment_status'">
                    <span
                      v-if="props.row.payment_status == 'paid'"
                      class="badge badge-outline-success"
                    >{{$t('Paid')}}</span>
                    <span
                      v-else-if="props.row.payment_status == 'partial'"
                      class="badge badge-outline-primary"
                    >{{$t('partial')}}</span>
                    <span v-else class="badge badge-outline-warning">{{$t('Unpaid')}}</span>
                  </div>
                   <div v-else-if="props.column.field == 'Ref'">
                    <router-link
                      :to="'/app/purchase_return/detail/'+props.row.id"
                    >
                      <span class="ul-btn__text ml-1">{{props.row.Ref}}</span>
                    </router-link>
                  </div>
                   <div v-else-if="props.column.field == 'purchase_ref' && props.row.purchase_id">
                    <router-link
                      :to="'/app/purchases/detail/'+props.row.purchase_id"
                    >
                      <span class="ul-btn__text ml-1">{{props.row.purchase_ref}}</span>
                    </router-link>
                  </div>
                </template>
              </vue-good-table>
            </b-tab>

            <!-- Expense Table -->
            <b-tab :title="$t('Expenses')">
              <vue-good-table
                mode="remote"
                :columns="columns_Expense"
                :totalRows="totalRows_Expense"
                :rows="expenses"
                @on-page-change="PageChange_Expense"
                @on-per-page-change="onPerPageChange_Expense"
                :pagination-options="{
                  enabled: true,
                  mode: 'records',
                  nextLabel: 'next',
                  prevLabel: 'prev',
                }"
                @on-search="onSearch_Expense"
                :search-options="{
                    placeholder: $t('Search_this_table'),
                    enabled: true,
                }"
                styleClass="order-table vgt-table mt-2"
              >
               <div slot="table-actions" class="mt-2 mb-3">
                <b-button @click="Expense_PDF()" size="sm" variant="outline-success ripple m-1">
                  <i class="i-File-Copy"></i> PDF
                </b-button>
              </div>
              </vue-good-table>
             </b-tab>
            <!-- Ledger Table -->
            <b-tab :title="$t('Ledger')">
              <b-row class="mb-3 mt-3">
                  <b-col md="4">
                      <b-card class="text-center bg-light">
                          <h6 class="text-muted mb-1">Total Debit</h6>
                          <h4 class="text-danger font-weight-bold">{{currentUser.currency}} {{formatNumber(ledger_totals.debit, 2)}}</h4>
                      </b-card>
                  </b-col>
                  <b-col md="4">
                      <b-card class="text-center bg-light">
                          <h6 class="text-muted mb-1">Total Credit</h6>
                          <h4 class="text-success font-weight-bold">{{currentUser.currency}} {{formatNumber(ledger_totals.credit, 2)}}</h4>
                      </b-card>
                  </b-col>
                  <b-col md="4">
                      <b-card class="text-center bg-light">
                          <h6 class="text-muted mb-1">Final Balance</h6>
                          <h4 :class="ledger_totals.balance >= 0 ? 'text-success' : 'text-danger'" class="font-weight-bold">
                              {{currentUser.currency}} {{formatNumber(ledger_totals.balance, 2)}}
                          </h4>
                      </b-card>
                  </b-col>
              </b-row>
              <vue-good-table
                mode="remote"
                :columns="columns_ledger"
                :rows="ledger"
                @on-search="onSearch_Ledger"
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
                styleClass="order-table vgt-table mt-2"
              >
               <div slot="table-actions" class="mt-2 mb-3">
                <b-button @click="Ledger_PDF()" size="sm" variant="outline-success ripple m-1">
                  <i class="i-File-Copy"></i> PDF
                </b-button>
              </div>
                <template slot="table-row" slot-scope="props">
                  <div v-if="props.column.field == 'type'">
                    <span v-if="props.row.type == 'Sale'" class="badge badge-outline-success">Sale</span>
                    <span v-else-if="props.row.type == 'Purchase'" class="badge badge-outline-danger">Purchase</span>
                    <span v-else-if="props.row.type == 'Expense'" class="badge badge-outline-warning">Expense</span>
                    <span v-else-if="props.row.type == 'Deposit'" class="badge badge-outline-info">Deposit</span>
                  </div>
                  <div v-else-if="props.column.field == 'credit'">
                    <span v-if="props.row.credit > 0" class="text-success">{{currentUser.currency}} {{formatNumber(props.row.credit, 2)}}</span>
                    <span v-else>---</span>
                  </div>
                  <div v-else-if="props.column.field == 'debit'">
                    <span v-if="props.row.debit > 0" class="text-danger">{{currentUser.currency}} {{formatNumber(props.row.debit, 2)}}</span>
                    <span v-else>---</span>
                  </div>
                  <div v-else-if="props.column.field == 'balance'">
                    <span :class="props.row.balance >= 0 ? 'text-success' : 'text-danger'">
                        {{currentUser.currency}} {{formatNumber(props.row.balance, 2)}}
                    </span>
                  </div>
                </template>
              </vue-good-table>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mt-3" v-if="!isLoading">
      <b-col lg="6" md="12" sm="12">
        <b-card class="mb-30">
          <h4 class="card-title m-0">{{$t('Total_Items_Quantity')}}</h4>
          <div class="chart-wrapper mt-3">
            <v-chart :options="Stock_Count" :autoresize="true"></v-chart>
          </div>
        </b-card>
      </b-col>
      <b-col col lg="6" md="12" sm="12">
        <b-card class="mb-30">
          <h4 class="card-title m-0">{{$t('Value_by_Cost_and_Price')}}</h4>
          <div class="chart-wrapper mt-3">
            <v-chart :options="Stock_value" :autoresize="true"></v-chart>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import ECharts from "vue-echarts/components/ECharts.vue";
import jsPDF from "jspdf";
import "jspdf-autotable";
import DateRangePicker from "vue2-daterange-picker";
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
import moment from "moment";
import NProgress from "nprogress";

// import ECharts modules manually to reduce bundle size
import "echarts/lib/chart/pie";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";

export default {
  components: {
    "v-chart": ECharts,
    DateRangePicker
  },
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Warehouse Report"
  },
  data() {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 30);
    return {
      dateRange: { startDate: start, endDate: end },
      locale: {
        applyLabel: this.$t("Apply") || "Apply",
        cancelLabel: this.$t("Cancel") || "Cancel",
        weekLabel: "W",
        customRangeLabel: this.$t("CustomRange") || "Custom Range",
        daysOfWeek: moment.weekdaysMin(),
        monthNames: moment.monthsShort(),
        firstDay: 1
      },
      Stock_Count: {},
      Stock_value: {},
      totalRows_quotations: "",
      totalRows_sales: "",
      totalRows_purchases: "",
      totalRows_Return_sale: "",
      totalRows_Return_purchase: "",
      totalRows_Expense: "",
      totalRows_ledger: "",
      limit_quotations: "10",
      limit_returns_Sale: "10",
      limit_returns_Purchase: "10",
      limit_sales: "10",
      limit_purchases: "10",
      limit_expenses: "10",
      limit_ledger: "10",
      search_quotation: "",
      search_sale: "",
      search_purchase: "",
      search_expense: "",
      search_ledger: "",
      search_return_Sale: "",
      search_return_Purchase: "",
      sales_page: 1,
      quotations_page: 1,
      purchases_page: 1,
      Return_sale_page: 1,
      Return_purchase_page: 1,
      Expense_page: 1,
      ledger_page: 1,
      isLoading: true,
      Filter_warehouse: "",
      sales: [],
      quotations: [],
      purchases: [],
      warehouses: [],
      expenses: [],
      ledger: [],
      returns_sale: [],
      returns_purchase: [],
      ledger_totals: {
        credit: 0,
        debit: 0,
        balance: 0
      },
      total: {
        sales: "",
        purchases: "",
        ReturnPurchase: "",
        ReturnSale: ""
      }
    };
  },

  computed: {
    ...mapGetters(["currentUser"]),
    columns_quotations() {
      return [
        {
          label: this.$t("date"),
          field: "date",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: "Items",
          field: "items",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Reference"),
          field: "Ref",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Customer"),
          field: "client_name",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("warehouse"),
          field: "warehouse_name",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Total"),
          field: "GrandTotal",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Status"),
          field: "statut",
          tdClass: "text-left",
          thClass: "text-left",
          html: true,
          sortable: false
        }
      ];
    },
    columns_sales() {
      return [
        {
          label: this.$t("Reference"),
          field: "Ref",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: "Items",
          field: "items",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Customer"),
          field: "client_name",
          tdClass: "text-left",
          thClass: "text-left"
        },
        {
          label: this.$t("warehouse"),
          field: "warehouse_name",
          tdClass: "text-left",
          thClass: "text-left"
        },
        
        {
          label: this.$t("Total"),
          field: "GrandTotal",
          type: "decimal",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Paid"),
          field: "paid_amount",
          type: "decimal",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Due"),
          field: "due",
          type: "decimal",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Status"),
          field: "statut",
          html: true,
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("PaymentStatus"),
          field: "payment_status",
          html: true,
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
         {
          label: this.$t("Shipping_status"),
          field: "shipping_status",
          html: true,
          tdClass: "text-left",
          thClass: "text-left"
        },
      ];
    },
    columns_purchases() {
      return [
        {
          label: this.$t("Reference"),
          field: "Ref",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: "Items",
          field: "items",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Supplier"),
          field: "provider_name",
          tdClass: "text-left",
          thClass: "text-left"
        },
        {
          label: this.$t("warehouse"),
          field: "warehouse_name",
          tdClass: "text-left",
          thClass: "text-left"
        },
        {
          label: this.$t("Total"),
          field: "GrandTotal",
          type: "decimal",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Paid"),
          field: "paid_amount",
          type: "decimal",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Due"),
          field: "due",
          type: "decimal",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Status"),
          field: "statut",
          html: true,
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("PaymentStatus"),
          field: "payment_status",
          html: true,
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        }
      ];
    },
    columns_returns_sale() {
      return [
        {
          label: this.$t("Reference"),
          field: "Ref",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: "Items",
          field: "items",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Customer"),
          field: "client_name",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Sale_Ref"),
          field: "sale_ref",
          tdClass: "text-left",
          thClass: "text-left"
        },
        {
          label: this.$t("warehouse"),
          field: "warehouse_name",
          tdClass: "text-left",
          thClass: "text-left"
        },
       
        {
          label: this.$t("Total"),
          field: "GrandTotal",
          type: "decimal",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Paid"),
          field: "paid_amount",
          type: "decimal",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Due"),
          field: "due",
          type: "decimal",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
         {
          label: this.$t("Status"),
          field: "statut",
          html: true,
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("PaymentStatus"),
          field: "payment_status",
          html: true,
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        }
      ];
    },
    columns_returns_purchase() {
      return [
        {
          label: this.$t("Reference"),
          field: "Ref",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: "Items",
          field: "items",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Supplier"),
          field: "provider_name",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("warehouse"),
          field: "warehouse_name",
          tdClass: "text-left",
          thClass: "text-left"
        },
        {
          label: this.$t("Purchase_Ref"),
          field: "purchase_ref",
          tdClass: "text-left",
          thClass: "text-left"
        },
        
        {
          label: this.$t("Total"),
          field: "GrandTotal",
          type: "decimal",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Paid"),
          field: "paid_amount",
          type: "decimal",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Due"),
          field: "due",
          type: "decimal",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Status"),
          field: "statut",
          html: true,
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("PaymentStatus"),
          field: "payment_status",
          html: true,
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        }
      ];
    },
    columns_ledger() {
      return [
        { label: this.$t("date"), field: "date", tdClass: "text-left", thClass: "text-left", sortable: false },
        { label: this.$t("Reference"), field: "Ref", tdClass: "text-left", thClass: "text-left", sortable: false },
        { label: this.$t("Type"), field: "type", tdClass: "text-left", thClass: "text-left", sortable: false },
        { label: this.$t("Details"), field: "description", tdClass: "text-left", thClass: "text-left", sortable: false },
        { label: this.$t("Debit"), field: "debit", tdClass: "text-right", thClass: "text-right", sortable: false },
        { label: this.$t("Credit"), field: "credit", tdClass: "text-right", thClass: "text-right", sortable: false },
        { label: this.$t("Balance"), field: "balance", tdClass: "text-right font-weight-bold", thClass: "text-right", sortable: false },
      ];
    },
    columns_Expense() {
      return [
        {
          label: this.$t("date"),
          field: "date",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Reference"),
          field: "Ref",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("warehouse"),
          field: "warehouse_name",
          tdClass: "text-left",
          thClass: "text-left"
        },
        {
          label: this.$t("Details"),
          field: "details",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Amount"),
          field: "amount",
          type: "decimal",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Categorie"),
          field: "category_name",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        }
      ];
    }
  },

  methods: {

    fmt(d) {
      return moment(d).format("YYYY-MM-DD");
    },

    Download_Sales_Item_Summary() {
      NProgress.start();
      NProgress.set(0.1);
      
      const warehouse = this.Filter_warehouse !== null ? this.Filter_warehouse : "";
      const from = this.fmt(this.dateRange.startDate);
      const to = this.fmt(this.dateRange.endDate);

      axios
        .get(`report/sales_item_summary_pdf?warehouse_id=${warehouse}&from=${from}&to=${to}`, {
          responseType: "blob",
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          const urlObj = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = urlObj;
          link.setAttribute("download", `Sales_Item_Summary_${from}_to_${to}.pdf`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setTimeout(() => NProgress.done(), 500);
        })
        .catch(() => {
          setTimeout(() => NProgress.done(), 500);
        });
    },

    //---------------------- Expenses PDF -------------------------------\\
    Expense_PDF() {
      var self = this;
      let pdf = new jsPDF("p", "pt");

      const fontPath = "/fonts/Vazirmatn-Bold.ttf";
      pdf.addFont(fontPath, "VazirmatnBold", "bold"); 
      pdf.setFont("VazirmatnBold"); 

      let columns = [
        { title: self.$t("date"), dataKey: "date" },
        { title: self.$t("Reference"), dataKey: "Ref" },
        { title: self.$t("Amount"), dataKey: "amount" },
        { title: self.$t("Categorie"), dataKey: "category_name" },
        { title: self.$t("warehouse"), dataKey: "warehouse_name" }
      ];

      pdf.autoTable({
             columns: columns,
             body: self.expenses,
             startY: 70,
             theme: "grid", 
             didDrawPage: (data) => {
               pdf.setFont("VazirmatnBold");
               pdf.setFontSize(18);
               pdf.text("Expense List", 40, 25);   
             },
             styles: {
               font: "VazirmatnBold", 
               halign: "center", // 
             },
             headStyles: {
               fillColor: [200, 200, 200], 
               textColor: [0, 0, 0], 
               fontStyle: "bold", 
             },

      });

      pdf.save("Expense_List.pdf");
    },

    //-------------------------------- Ledger PDF -----------------------\\
    Ledger_PDF() {
       window.open(`/report/ledger_warehouse_pdf?warehouse_id=${this.Filter_warehouse}`, '_blank');
    },

    onSearch_Ledger(value) {
      this.search_ledger = value.searchTerm;
    },

    Get_Ledger(page) {
      axios
        .get("report/ledger_warehouse?warehouse_id=" + this.Filter_warehouse)
        .then(response => {
          this.ledger = response.data.ledger;
          this.ledger_totals = {
            credit: response.data.total_credit,
            debit: response.data.total_debit,
            balance: response.data.balance
          };
          this.totalRows_ledger = response.data.ledger.length;
        })
        .catch(response => {});
    },

    formatNumber(number, dec) {
      const value = (number / 1).toFixed(dec);
      return value.split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + value.split(".")[1];
    },

       //----------------------------------------- Returns Purchase PDF -----------------------\\
    Returns_Purchase_PDF() {
      var self = this;
      let pdf = new jsPDF("p", "pt");

      const fontPath = "/fonts/Vazirmatn-Bold.ttf";
      pdf.addFont(fontPath, "VazirmatnBold", "bold"); 
      pdf.setFont("VazirmatnBold"); 

      let columns = [
        { title: self.$t("Reference"), dataKey: "Ref" },
        { title: self.$t("Supplier"), dataKey: "provider_name" },
        { title: self.$t("warehouse"), dataKey: "warehouse_name" },
        { title: self.$t("Purchase"), dataKey: "purchase_ref" },
        { title: self.$t("Total"), dataKey: "GrandTotal" },
        { title: self.$t("Paid"), dataKey: "paid_amount" },
        { title: self.$t("Due"), dataKey: "due" },
        { title: self.$t("Status"), dataKey: "statut" },
        { title: self.$t("PaymentStatus"), dataKey: "payment_status" }
      ];
      pdf.autoTable({
             columns: columns,
             body: self.returns_purchase,
             startY: 70,
             theme: "grid", 
             didDrawPage: (data) => {
               pdf.setFont("VazirmatnBold");
               pdf.setFontSize(18);
               pdf.text("Purchase Return List", 40, 25);   
             },
             styles: {
               font: "VazirmatnBold", 
               halign: "center", // 
             },
             headStyles: {
               fillColor: [200, 200, 200], 
               textColor: [0, 0, 0], 
               fontStyle: "bold", 
             },

      });

      pdf.save("purchase_returns.pdf");
    },

      //----------------------------------------- Sales Return PDF -----------------------\\
    Sale_Return_PDF() {
      var self = this;
      let pdf = new jsPDF("p", "pt");

      const fontPath = "/fonts/Vazirmatn-Bold.ttf";
      pdf.addFont(fontPath, "VazirmatnBold", "bold"); 
      pdf.setFont("VazirmatnBold"); 

      let columns = [
        { title: self.$t("Reference"), dataKey: "Ref" },
        { title: self.$t("Customer"), dataKey: "client_name" },
        { title: self.$t("Sale_Ref"), dataKey: "sale_ref" },
        { title: self.$t("warehouse"), dataKey: "warehouse_name" },
        { title: self.$t("Total"), dataKey: "GrandTotal" },
        { title: self.$t("Paid"), dataKey: "paid_amount" },
        { title: self.$t("Due"), dataKey: "due" },
        { title: self.$t("Status"), dataKey: "statut" },
        { title: self.$t("PaymentStatus"), dataKey: "payment_status" }
      ];
      pdf.autoTable({
             columns: columns,
             body: self.returns_sale,
             startY: 70,
             theme: "grid", 
             didDrawPage: (data) => {
               pdf.setFont("VazirmatnBold");
               pdf.setFontSize(18);
               pdf.text("Sales Return List", 40, 25);   
             },
             styles: {
               font: "VazirmatnBold", 
               halign: "center", // 
             },
             headStyles: {
               fillColor: [200, 200, 200], 
               textColor: [0, 0, 0], 
               fontStyle: "bold", 
             },

      });

      pdf.save("Sales Return.pdf");
    },

      //----------------------------------- Sales PDF ------------------------------\\
    Sales_PDF() {
      var self = this;
      let pdf = new jsPDF("p", "pt");

      const fontPath = "/fonts/Vazirmatn-Bold.ttf";
      pdf.addFont(fontPath, "VazirmatnBold", "bold"); 
      pdf.setFont("VazirmatnBold"); 

      let columns = [
        { title: "Sr.No", dataKey: "sr_no" },
        { title: self.$t("date"), dataKey: "date" },
        { title: "Bill No.", dataKey: "Ref" },
        { title: "Customer Name", dataKey: "client_name" },
        { title: "Items", dataKey: "items" },
        { title: "Bill Amount", dataKey: "GrandTotal" },
      ];
      let formatted_sales = self.sales.map((sale, index) => {
        return {
          sr_no: index + 1,
          date: sale.date,
          Ref: sale.Ref,
          client_name: sale.client_name,
          items: sale.items,
          GrandTotal: self.formatNumber(sale.GrandTotal, 2),
        };
      });

      pdf.autoTable({
             columns: columns,
             body: formatted_sales,
             startY: 70,
             theme: "grid", 
             didDrawPage: (data) => {
               pdf.setFont("VazirmatnBold");
               pdf.setFontSize(18);
               pdf.text("Sales List", 40, 25);   
             },
             styles: {
               font: "VazirmatnBold", 
               halign: "center", // 
             },
             headStyles: {
               fillColor: [200, 200, 200], 
               textColor: [0, 0, 0], 
               fontStyle: "bold", 
             },

      });

      pdf.save("Sale_List.pdf");
    },

    //----------------------------------- Purchases PDF ------------------------------\\
    Purchases_PDF() {
      var self = this;
      let pdf = new jsPDF("p", "pt");

      const fontPath = "/fonts/Vazirmatn-Bold.ttf";
      pdf.addFont(fontPath, "VazirmatnBold", "bold"); 
      pdf.setFont("VazirmatnBold"); 

      let columns = [
        { title: "Sr.No", dataKey: "sr_no" },
        { title: self.$t("date"), dataKey: "date" },
        { title: "Bill No.", dataKey: "Ref" },
        { title: "Supplier Name", dataKey: "provider_name" },
        { title: "Items", dataKey: "items" },
        { title: "Bill Amount", dataKey: "GrandTotal" },
      ];
      let formatted_purchases = self.purchases.map((purchase, index) => {
        return {
          sr_no: index + 1,
          date: purchase.date,
          Ref: purchase.Ref,
          provider_name: purchase.provider_name,
          items: purchase.items,
          GrandTotal: self.formatNumber(purchase.GrandTotal, 2),
        };
      });

      pdf.autoTable({
             columns: columns,
             body: formatted_purchases,
             startY: 70,
             theme: "grid", 
             didDrawPage: (data) => {
               pdf.setFont("VazirmatnBold");
               pdf.setFontSize(18);
               pdf.text("Purchases List", 40, 25);   
             },
             styles: {
               font: "VazirmatnBold", 
               halign: "center", // 
             },
             headStyles: {
               fillColor: [200, 200, 200], 
               textColor: [0, 0, 0], 
               fontStyle: "bold", 
             },

      });

      pdf.save("Purchases_List.pdf");
    },

      //------------------------------------- Quotations PDF -------------------------\\
    Quotation_PDF() {
      var self = this;
      let pdf = new jsPDF("p", "pt");

      const fontPath = "/fonts/Vazirmatn-Bold.ttf";
      pdf.addFont(fontPath, "VazirmatnBold", "bold"); 
      pdf.setFont("VazirmatnBold"); 
      
      let columns = [
        { title: "Sr.No", dataKey: "sr_no" },
        { title: self.$t("date"), dataKey: "date" },
        { title: "Bill No.", dataKey: "Ref" },
        { title: "Party Name", dataKey: "client_name" },
        { title: "Items", dataKey: "items" },
        { title: "Bill Amount", dataKey: "GrandTotal" },
      ];
      let formatted_quotations = self.quotations.map((quotation, index) => {
        return {
          sr_no: index + 1,
          date: quotation.date,
          Ref: quotation.Ref,
          client_name: quotation.client_name,
          items: quotation.items,
          GrandTotal: self.formatNumber(quotation.GrandTotal, 2),
        };
      });

      pdf.autoTable({
             columns: columns,
             body: formatted_quotations,
             startY: 70,
             theme: "grid", 
             didDrawPage: (data) => {
               pdf.setFont("VazirmatnBold");
               pdf.setFontSize(18);
               pdf.text("Quotation List", 40, 25);   
             },
             styles: {
               font: "VazirmatnBold", 
               halign: "center", // 
             },
             headStyles: {
               fillColor: [200, 200, 200], 
               textColor: [0, 0, 0], 
               fontStyle: "bold", 
             },

      });

      pdf.save("Quotation_List.pdf");
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

    //---------------------- Event Select Warehouse ------------------------------\\
    Selected_Warehouse(value) {
      this.isLoading = true;
      if (value === null) {
        this.Filter_warehouse = "";
      }
      this.Get_Reports();
      this.Get_Sales(1);
      this.Get_Purchases(1);
      this.Get_Quotations(1);
      this.Get_Returns_Sale(1);
      this.Get_Returns_Purchase(1);
      this.Get_Expenses(1);
      this.Get_Ledger(1);

      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },

    //------------------------------ Show Reports -------------------------\\
    Get_Reports() {
      axios
        .get("report/warehouse_report?warehouse_id=" + this.Filter_warehouse)
        .then(response => {
          this.total = response.data.data;
          this.warehouses = response.data.warehouses;
        })
        .catch(response => {});
    },

    //--------------------------- Sales Event Page Change  -------------\\
    PageChangeSales({ currentPage }) {
      if (this.sales_page !== currentPage) {
        this.Get_Sales(currentPage);
      }
    },

    //--------------------------- Limit Page Sales -------------\\
    onPerPageChangeSales({ currentPerPage }) {
      if (this.limit_sales !== currentPerPage) {
        this.limit_sales = currentPerPage;
        this.Get_Sales(1);
      }
    },

    onSearch_Sales(value) {
      this.search_sale = value.searchTerm;
      this.Get_Sales(1);
    },

    //--------------------------- Get sales By warehouse -------------\\
    Get_Sales(page) {
      axios
        .get(
          "report/sales_warehouse?page=" +
            page +
            "&limit=" +
            this.limit_sales +
            "&warehouse_id=" +
            this.Filter_warehouse +
            "&search=" +
            this.search_sale
        )
        .then(response => {
          this.sales = response.data.sales;
          this.totalRows_sales = response.data.totalRows;
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        })
        .catch(response => {
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        });
    },

    //--------------------------- Purchases Event Page Change  -------------\\
    PageChangePurchases({ currentPage }) {
      if (this.purchases_page !== currentPage) {
        this.Get_Purchases(currentPage);
      }
    },

    //--------------------------- Limit Page Purchases -------------\\
    onPerPageChangePurchases({ currentPerPage }) {
      if (this.limit_purchases !== currentPerPage) {
        this.limit_purchases = currentPerPage;
        this.Get_Purchases(1);
      }
    },

    onSearch_Purchases(value) {
      this.search_purchase = value.searchTerm;
      this.Get_Purchases(1);
    },

    //--------------------------- Get purchases By warehouse -------------\\
    Get_Purchases(page) {
      axios
        .get(
          "report/purchases_warehouse?page=" +
            page +
            "&limit=" +
            this.limit_purchases +
            "&warehouse_id=" +
            this.Filter_warehouse +
            "&search=" +
            this.search_purchase
        )
        .then(response => {
          this.purchases = response.data.purchases;
          this.totalRows_purchases = response.data.totalRows;
        })
        .catch(response => {});
    },

    //--------------------------- Event Page Change -------------\\
    PageChangeQuotation({ currentPage }) {
      if (this.quotations_page !== currentPage) {
        this.Get_Quotations(currentPage);
      }
    },

    //--------------------------- Limit Page Quotations -------------\\
    onPerPageChangeQuotation({ currentPerPage }) {
      if (this.limit_quotations !== currentPerPage) {
        this.limit_quotations = currentPerPage;
        this.Get_Quotations(1);
      }
    },

    onSearch_Quotations(value) {
      this.search_quotation = value.searchTerm;
      this.Get_Quotations(1);
    },

    //--------------------------- Get Quotations By Warehouse -------------\\
    Get_Quotations(page) {
      axios
        .get(
          "report/quotations_warehouse?page=" +
            page +
            "&limit=" +
            this.limit_quotations +
            "&warehouse_id=" +
            this.Filter_warehouse +
            "&search=" +
            this.search_quotation
        )
        .then(response => {
          this.quotations = response.data.quotations;
          this.totalRows_quotations = response.data.totalRows;
        })
        .catch(response => {});
    },

    //--------------------------- Event Page Change -------------\\
    PageChangeReturn_Customer({ currentPage }) {
      if (this.Return_sale_page !== currentPage) {
        this.Get_Returns_Sale(currentPage);
      }
    },

    //--------------------------- Limit Page Returns Sale -------------\\
    onPerPageChangeReturn_Sale({ currentPerPage }) {
      if (this.limit_returns_Sale !== currentPerPage) {
        this.limit_returns_Sale = currentPerPage;
        this.Get_Returns_Sale(1);
      }
    },

    onSearch_Return_Sale(value) {
      this.search_return_Sale = value.searchTerm;
      this.Get_Returns_Sale(1);
    },

    //--------------------------- Get Returns Sale By warehouse -------------\\
    Get_Returns_Sale(page) {
      axios
        .get(
          "report/returns_sale_warehouse?page=" +
            page +
            "&limit=" +
            this.limit_returns_Sale +
            "&warehouse_id=" +
            this.Filter_warehouse +
            "&search=" +
            this.search_return_Sale
        )
        .then(response => {
          this.returns_sale = response.data.returns_sale;
          this.totalRows_Return_sale = response.data.totalRows;
        })
        .catch(response => {});
    },

    //--------------------------- Event Page Change -------------\\
    PageChangeReturn_Purchase({ currentPage }) {
      if (this.Return_purchase_page !== currentPage) {
        this.Get_Returns_Purchase(currentPage);
      }
    },

    //--------------------------- Limit Page Returns Purchase -------------\\
    onPerPageChangeReturn_Purchase({ currentPerPage }) {
      if (this.limit_returns_Purchase !== currentPerPage) {
        this.limit_returns_Purchase = currentPerPage;
        this.Get_Returns_Purchase(1);
      }
    },

    onSearch_Return_Purchase(value) {
      this.search_return_Purchase = value.searchTerm;
      this.Get_Returns_Purchase(1);
    },

    //--------------------------- Get Returns Purchase By warehouse -------------\\
    Get_Returns_Purchase(page) {
      axios
        .get(
          "report/returns_purchase_warehouse?page=" +
            page +
            "&limit=" +
            this.limit_returns_Purchase +
            "&warehouse_id=" +
            this.Filter_warehouse +
            "&search=" +
            this.search_return_Purchase
        )
        .then(response => {
          this.returns_purchase = response.data.returns_purchase;
          this.totalRows_Return_purchase = response.data.totalRows;
        })
        .catch(response => {});
    },

    //--------------------------- Expense Event Page Change -------------\\
    PageChange_Expense({ currentPage }) {
      if (this.Expense_page !== currentPage) {
        this.Get_Expenses(currentPage);
      }
    },

    //--------------------------- Limit Page Expense -------------\\
    onPerPageChange_Expense({ currentPerPage }) {
      if (this.limit_expenses !== currentPerPage) {
        this.limit_expenses = currentPerPage;
        this.Get_Expenses(1);
      }
    },

    onSearch_Expense(value) {
      this.search_expense = value.searchTerm;
      this.Get_Expenses(1);
    },

    //--------------------------- Get Expenses By warehouse -------------\\
    Get_Expenses(page) {
      axios
        .get(
          "report/expenses_warehouse?page=" +
            page +
            "&limit=" +
            this.limit_expenses +
            "&warehouse_id=" +
            this.Filter_warehouse +
            "&search=" +
            this.search_expense
        )
        .then(response => {
          this.expenses = response.data.expenses;
          this.totalRows_Expense = response.data.totalRows;
        })
        .catch(response => {});
    },

    //---------------------------------- Report Warhouse Count Stock
    report_with_echart() {
      axios
        .get(`report/warhouse_count_stock`)
        .then(response => {
          const responseData = response.data;
          var dark_heading = "#c2c6dc";

          this.Stock_Count = {
            color: ["#6D28D9", "#A78BFA", "#7C3AED", "#8B5CF6", "#C4B5FD"],
            tooltip: {
              show: true,
              backgroundColor: "rgba(0, 0, 0, .8)",
              formatter: function(params) {
                return `(${params.value} Items)<br />
                        (${params.data.value1} Quantity)`;
              }
            },
            legend: {
              orient: "vertical",
              left: "left",
              data: responseData.warehouses
            },

            series: [
              {
                name: "Warehouse Stock",
                type: "pie",
                radius: "50%",
                center: "50%",

                data: responseData.stock_count,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                  }
                }
              }
            ]
          };
          this.Stock_value = {
            color: ["#6D28D9", "#A78BFA", "#7C3AED", "#8B5CF6", "#C4B5FD"],
            tooltip: {
              show: true,
              backgroundColor: "rgba(0, 0, 0, .8)",
              formatter: function(params) {
                return `(Stock Value by Price : ${params.value})<br />
                        (Stock Value by Cost : ${params.data.value1})`;
                        // <br />(Profit Estimate : ${params.data.value2})`;
              }
            },
            legend: {
              orient: "vertical",
              left: "left",
              data: responseData.warehouses
            },

            series: [
              {
                name: "Warehouse Stock",
                type: "pie",
                radius: "50%",
                center: "50%",

                data: responseData.stock_value,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                  }
                }
              }
            ]
          };
        })
        .catch(response => {});
    }
  }, //end Methods

  //----------------------------- Created function------------------- \\

  created: function() {
    this.report_with_echart();
    this.Get_Reports();
    this.Get_Sales(1);
    this.Get_Purchases(1);
    this.Get_Quotations(1);
    this.Get_Returns_Sale(1);
    this.Get_Returns_Purchase(1);
    this.Get_Expenses(1);
    this.Get_Ledger(1);
  }
};
</script>