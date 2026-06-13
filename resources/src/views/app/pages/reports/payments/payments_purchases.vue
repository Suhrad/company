<template>
  <div class="main-content p-2 p-md-4">
    <breadcumb :page="$t('Payment_Purchases')" :folder="$t('Reports')" />

    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>

    <div v-else>
      <!-- Toolbar -->
      <b-card class="shadow-soft border-0 mb-3">
        <div class="d-flex flex-wrap align-items-center">
          <!-- Date range (responsive) -->
          <div class="mr-3 mb-2 d-flex flex-column flex-sm-row align-items-sm-center">
            <label class="mb-1 mb-sm-0 mr-sm-2 text-muted">{{$t('DateRange')}}</label>
            <date-range-picker
              v-model="dateRange"
              :locale-data="locale"
              :autoApply="true"
              :showDropdowns="true"
              @update="onDateChanged"
            >
              <template v-slot:input="picker">
                <b-button variant="light" class="btn-pill w-100 w-sm-auto">
                  <i class="i-Calendar-4 mr-1"></i>
                  {{ fmt(picker.startDate) }} — {{ fmt(picker.endDate) }}
                </b-button>
              </template>
            </date-range-picker>
          </div>

          <!-- Quick ranges -->
          <div class="mr-3 mb-2">
            <label class="mb-1 d-block text-muted">{{$t('QuickRanges')}}</label>
            <div class="btn-group">
              <b-button size="sm" variant="outline-primary" @click="quick('7d')">7D</b-button>
              <b-button size="sm" variant="outline-primary" @click="quick('30d')">30D</b-button>
              <b-button size="sm" variant="outline-primary" @click="quick('90d')">90D</b-button>
              <b-button size="sm" variant="outline-primary" @click="quick('mtd')">{{$t('MTD')}}</b-button>
              <b-button size="sm" variant="outline-primary" @click="quick('ytd')">{{$t('YTD')}}</b-button>
            </div>
          </div>

          <!-- Actions -->
          <div class="ml-auto mb-2 d-flex">
            <router-link
              to="/app/payments/store"
              class="btn btn-primary btn-sm btn-pill mr-2 d-flex align-items-center"
            >
              <i class="i-Add mr-1"></i> Create Payment
            </router-link>
            <b-button size="sm" variant="outline-info" class="btn-pill mr-2" v-b-toggle.sidebar-right>
              <i class="i-Filter-2 mr-1"></i>{{$t('Filter')}}
            </b-button>
            <b-button size="sm" variant="outline-success" class="btn-pill mr-2" @click="exportPDF">
              <i class="i-File-Copy mr-1"></i>PDF
            </b-button>
            <vue-excel-xlsx
              class="btn btn-sm btn-outline-danger btn-pill mr-2"
              :data="payments"
              :columns="excelColumns"
              :file-name="'payments_purchases'"
              :file-type="'xlsx'"
              :sheet-name="'payments_purchases'"
            >
              <i class="i-File-Excel mr-1"></i>EXCEL
            </vue-excel-xlsx>
            <b-button variant="primary" size="sm" class="btn-pill" @click="Payments_Purchases(1)">
              <i class="i-Reload mr-1"></i>{{$t('Refresh')}}
            </b-button>
          </div>
        </div>
      </b-card>

      <!-- Charts -->
      <b-row>
        <b-col md="8" class="mb-3">
          <b-card class="shadow-soft border-0">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <h6 class="m-0">{{$t('PaymentsOverTime')}}</h6>
              <small class="text-muted">{{ fmt(dateRange.startDate) }} → {{ fmt(dateRange.endDate) }}</small>
            </div>
            <v-chart :options="chartTimeOptions" autoresize style="height:320px;" />
          </b-card>
        </b-col>
        <b-col md="4" class="mb-3">
          <b-card class="shadow-soft border-0">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <h6 class="m-0">{{$t('PaymentsByMethod')}}</h6>
              <small class="text-muted">{{$t('ByAmount')}}</small>
            </div>
            <v-chart :options="chartMethodOptions" autoresize style="height:320px;" />
          </b-card>
        </b-col>
      </b-row>

      <!-- Table -->
      <b-card class="shadow-soft border-0">
        <vue-good-table
          mode="remote"
          :columns="columns"
          :totalRows="totalRows"
          :rows="rows"
          :group-options="{ enabled: true, headerPosition: 'bottom' }"
          @on-page-change="onPageChange"
          @on-per-page-change="onPerPageChange"
          @on-sort-change="onSortChange"
          @on-search="onSearch"
          :search-options="{ placeholder: $t('Search_this_table'), enabled: true }"
          :pagination-options="{ enabled: true, mode: 'records', nextLabel: 'next', prevLabel: 'prev' }"
          styleClass="table-hover tableOne vgt-table mt-2"
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field === 'actions'">
              <a
                v-if="currentUserPermissions && currentUserPermissions.includes('payment_purchases_edit')"
                @click="Edit_Payment(props.row)"
                class="cursor-pointer text-success mr-2"
                title="Edit"
              >
                <i class="i-Pen-2 text-20"></i>
              </a>
              <a
                v-if="currentUserPermissions && currentUserPermissions.includes('payment_purchases_delete')"
                @click="Remove_Payment(props.row.id)"
                class="cursor-pointer text-danger"
                title="Delete"
              >
                <i class="i-Close text-20"></i>
              </a>
            </span>
            <span v-else>{{ props.formattedRow[props.column.field] }}</span>
          </template>
        </vue-good-table>
      </b-card>
    </div>

    <!-- Edit Payment Modal -->
    <validation-observer ref="Add_payment">
      <b-modal
        hide-footer
        size="lg"
        id="Add_Payment"
        :title="$t('EditPayment')"
      >
        <b-form @submit.prevent="Submit_Payment">
          <b-row>
            <!-- date -->
            <b-col lg="6" md="12" sm="12">
              <validation-provider
                name="date"
                :rules="{ required: true}"
                v-slot="validationContext"
              >
                <b-form-group :label="$t('date')">
                  <b-form-input
                    label="date"
                    :state="getValidationState(validationContext)"
                    aria-describedby="date-feedback"
                    v-model="payment.date"
                    type="date"
                  ></b-form-input>
                  <b-form-invalid-feedback id="date-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Reference  -->
            <b-col lg="6" md="12" sm="12">
              <b-form-group :label="$t('Reference')">
                <b-form-input
                  disabled="disabled"
                  label="Reference"
                  :placeholder="$t('Reference')"
                  v-model="payment.Ref"
                ></b-form-input>
              </b-form-group>
            </b-col>

             <!-- Payment choice -->
             <b-col lg="6" md="12" sm="12">
              <validation-provider name="Payment choice" :rules="{ required: true}">
                <b-form-group slot-scope="{ valid, errors }" :label="$t('Paymentchoice')">
                  <v-select
                    :class="{'is-invalid': !!errors.length}"
                    :state="errors[0] ? false : (valid ? true : null)"
                    v-model="payment.payment_method_id"
                    :reduce="label => label.value"
                    :placeholder="$t('PleaseSelect')"
                    :options="payment_methods.map(pm => ({label: pm.name, value: pm.id}))"
                  ></v-select>
                  <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Paying Amount  -->
            <b-col lg="6" md="12" sm="12">
              <validation-provider
                name="Amount"
                :rules="{ required: true , regex: /^\d*\.?\d*$/}"
                v-slot="validationContext"
              >
                <b-form-group :label="$t('Paying_Amount')">
                  <b-form-input
                    label="Amount"
                    :placeholder="$t('Paying_Amount')"
                    v-model.number="payment.montant"
                    :state="getValidationState(validationContext)"
                    aria-describedby="Amount-feedback"
                  ></b-form-input>
                  <b-form-invalid-feedback id="Amount-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Account -->
            <b-col lg="6" md="6" sm="12">
              <validation-provider name="Account">
                <b-form-group slot-scope="{ valid, errors }" :label="$t('Account')">
                  <v-select
                    :class="{'is-invalid': !!errors.length}"
                    :state="errors[0] ? false : (valid ? true : null)"
                    v-model="payment.account_id"
                    :reduce="label => label.value"
                    :placeholder="$t('Choose_Account')"
                    :options="accounts.map(acc => ({label: acc.account_name, value: acc.id}))"
                  />
                  <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Note -->
            <b-col lg="6" md="6" sm="12">
              <b-form-group :label="$t('Note')">
                <b-form-textarea id="textarea" v-model="payment.notes" rows="3" max-rows="6"></b-form-textarea>
              </b-form-group>
            </b-col>
            <b-col md="12" class="mt-3">
              <b-button
                variant="primary"
                type="submit"
                :disabled="paymentProcessing"
              ><i class="i-Yes me-2 font-weight-bold"></i> {{$t('submit')}}</b-button>
              <div v-once class="typo__p" v-if="paymentProcessing">
                <div class="spinner sm spinner-primary mt-3"></div>
              </div>
            </b-col>
          </b-row>
        </b-form>
      </b-modal>
    </validation-observer>

    <!-- Sidebar Filter -->
    <b-sidebar id="sidebar-right" :title="$t('Filter')" bg-variant="white" right shadow>
      <div class="px-3 py-2">
        <b-row>
          <!-- Reference -->
          <b-col md="12">
            <b-form-group :label="$t('Reference')">
              <b-form-input :placeholder="$t('Reference')" v-model="Filter_Ref" />
            </b-form-group>
          </b-col>

          <!-- Supplier -->
          <b-col md="12">
            <b-form-group :label="$t('Supplier')">
              <v-select
                :reduce="o => o.value"
                :placeholder="$t('Choose_Supplier')"
                v-model="Filter_Supplier"
                :options="suppliers.map(s => ({label: s.name, value: s.id}))"
              />
            </b-form-group>
          </b-col>

          <!-- Purchase -->
          <b-col md="12">
            <b-form-group :label="$t('Purchase')">
              <v-select
                :reduce="o => o.value"
                :placeholder="$t('PleaseSelect')"
                v-model="Filter_purchase"
                :options="purchases.map(p => ({label: p.Ref, value: p.id}))"
              />
            </b-form-group>
          </b-col>

          <!-- Payment choice -->
          <b-col md="12">
            <b-form-group :label="$t('Paymentchoice')">
              <v-select
                v-model="Filter_Reg"
                :reduce="o => o.value"
                :placeholder="$t('PleaseSelect')"
                :options="payment_methods.map(m => ({label: m.name, value: m.id}))"
              />
            </b-form-group>
          </b-col>

          <b-col md="6" sm="12">
            <b-button @click="Payments_Purchases(1)" variant="primary ripple m-1" size="sm" block>
              <i class="i-Filter-2"></i> {{ $t("Filter") }}
            </b-button>
          </b-col>
          <b-col md="6" sm="12">
            <b-button @click="Reset_Filter" variant="danger ripple m-1" size="sm" block>
              <i class="i-Power-2"></i> {{ $t("Reset") }}
            </b-button>
          </b-col>
        </b-row>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import NProgress from "nprogress";
import jsPDF from "jspdf";
import "jspdf-autotable";
import DateRangePicker from "vue2-daterange-picker";
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
import moment from "moment";

// ECharts (Vue 2 + vue-echarts v4 side-effect imports)
import ECharts from "vue-echarts/components/ECharts.vue";
import "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";
import "echarts/lib/component/grid";

export default {
  metaInfo: { title: "Payment Purchases" },
  components: { "date-range-picker": DateRangePicker, "v-chart": ECharts },

  data() {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 29);
    return {
      isLoading: true,

      // table state
      serverParams: { sort: { field: "id", type: "desc" }, page: 1, perPage: 10 },
      limit: "10",
      search: "",
      totalRows: 0,

      // data
      payments: [],
      suppliers: [],
      purchases: [],
      payment_methods: [],
      accounts: [],
      rows: [{ children: [] }],

      // modal state
      payment: {
        id: "",
        date: "",
        Ref: "",
        purchase_id: "",
        payment_method_id: "",
        montant: 0,
        notes: "",
        account_id: ""
      },
      paymentProcessing: false,

      // filters
      Filter_Supplier: "",
      Filter_Ref: "",
      Filter_purchase: "",
      Filter_Reg: "",

      // date range
      dateRange: { startDate: start, endDate: end },
      locale: {
        Label: "Apply",
        cancelLabel: "Cancel",
        weekLabel: "W",
        customRangeLabel: "Custom Range",
        daysOfWeek: moment.weekdaysMin(),
        monthNames: moment.monthsShort(),
        firstDay: 1
      }
    };
  },

  computed: {
    ...mapGetters(["currentUserPermissions"]),
    columns() {
      return [
        { label: this.$t("date"),            field: "date",            tdClass:"text-left", thClass:"text-left" },
        { label: this.$t("Reference"),       field: "Ref",             tdClass:"text-left", thClass:"text-left" },
        { label: this.$t("Purchase"),        field: "Ref_Purchase",    tdClass:"text-left", thClass:"text-left" },
        { label: this.$t("Supplier"),        field: "provider_name",   tdClass:"text-left", thClass:"text-left" },
        { label: this.$t("ModePaiement"),    field: "payment_method",  tdClass:"text-left", thClass:"text-left" },
        { label: this.$t("Account"),         field: "account_name",    tdClass:"text-left", thClass:"text-left", sortable:false },
        { label: this.$t("Amount"),          field: "montant",         type:"decimal", headerField: this.sumCount, tdClass:"text-left", thClass:"text-left" },
        { label: this.$t("Action"),          field: "actions",         html: true, tdClass:"text-right", thClass:"text-right", sortable:false }
      ];
    },

    excelColumns() {
      return [
        { label: this.$t("date"),           field: "date" },
        { label: this.$t("Reference"),      field: "Ref" },
        { label: this.$t("Purchase"),       field: "Ref_Purchase" },
        { label: this.$t("Supplier"),       field: "provider_name" },
        { label: this.$t("ModePaiement"),   field: "payment_method" },
        { label: this.$t("Account"),        field: "account_name" },
        { label: this.$t("Amount"),         field: "montant" }
      ];
    },

    // Charts
    chartTimeOptions() {
      const map = new Map();
      (this.payments || []).forEach(p => {
        const d = p.date ? String(p.date).slice(0,10) : "";
        const amt = Number(p.montant || 0);
        if (!d) return;
        map.set(d, (map.get(d) || 0) + amt);
      });
      const dates = Array.from(map.keys()).sort();
      const vals = dates.map(d => map.get(d));
      return {
        tooltip: { trigger:'axis' },
        grid: { left: 10, right: 10, bottom: 10, top: 20, containLabel: true },
        xAxis: [{ type:'category', data: dates, axisTick:{show:false} }],
        yAxis: [{ type:'value' }],
        series: [{ name: this.$t('Amount'), type:'line', smooth:true, data: vals }]
      };
    },

    chartMethodOptions() {
      const map = new Map();
      (this.payments || []).forEach(p => {
        const k = p.payment_method || this.$t('Unknown');
        map.set(k, (map.get(k) || 0) + Number(p.montant || 0));
      });
      const cats = Array.from(map.keys());
      const vals = cats.map(k => map.get(k));
      return {
        tooltip: { trigger:'axis', axisPointer:{type:'shadow'} },
        grid: { left: 10, right: 10, bottom: 10, top: 20, containLabel: true },
        xAxis: { type:'value' },
        yAxis: { type:'category', data: cats, axisLabel:{ interval:0 } },
        series: [{ type:'bar', data: vals }]
      };
    }
  },

  methods: {
    fmt(d){ return moment(d).format("YYYY-MM-DD"); },

    sumCount(rowObj) {
      let sum = 0;
      if (rowObj && Array.isArray(rowObj.children)) {
        for (const r of rowObj.children) sum += Number(r.montant || 0);
      }
      return sum;
    },

    // table helpers
    updateParams(newProps) { this.serverParams = Object.assign({}, this.serverParams, newProps); },
    onPageChange({ currentPage }) {
      if (this.serverParams.page !== currentPage) {
        this.updateParams({ page: currentPage });
        this.Payments_Purchases(currentPage);
      }
    },
    onPerPageChange({ currentPerPage }) {
      if (this.limit !== String(currentPerPage)) {
        this.limit = String(currentPerPage);
        this.updateParams({ page: 1, perPage: currentPerPage });
        this.Payments_Purchases(1);
      }
    },
    onSortChange(params) {
      if (params && params[0]) {
        const field = params[0].field === "Ref_Purchase" ? "purchase_id" : params[0].field;
        this.updateParams({ sort: { type: params[0].type, field } });
        this.Payments_Purchases(this.serverParams.page);
      }
    },
    onSearch(value) {
      this.search = value.searchTerm || "";
      this.Payments_Purchases(this.serverParams.page);
    },

    // date handling
    onDateChanged() { this.Payments_Purchases(1); },
    quick(kind){
      const now = moment(); let s,e;
      if(kind==='7d'){ s=now.clone().subtract(6,'days'); e=now; }
      if(kind==='30d'){ s=now.clone().subtract(29,'days'); e=now; }
      if(kind==='90d'){ s=now.clone().subtract(89,'days'); e=now; }
      if(kind==='mtd'){ s=now.clone().startOf('month'); e=now; }
      if(kind==='ytd'){ s=now.clone().startOf('year');  e=now; }
      this.dateRange = { startDate: s.toDate(), endDate: e.toDate() };
      this.Payments_Purchases(1);
    },

    // Reset sidebar filters
    Reset_Filter() {
      this.search = "";
      this.Filter_Supplier = "";
      this.Filter_Ref = "";
      this.Filter_purchase = "";
      this.Filter_Reg = "";
      this.Payments_Purchases(1);
    },

    // Edit/Delete handlers
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },

    Edit_Payment(payment_data) {
      this.payment = {
        id: payment_data.id,
        date: payment_data.date,
        Ref: payment_data.Ref,
        purchase_id: payment_data.purchase_id,
        payment_method_id: payment_data.payment_method_id,
        montant: payment_data.montant,
        notes: payment_data.notes,
        account_id: payment_data.account_id
      };
      this.$bvModal.show("Add_Payment");
    },

    Submit_Payment() {
      this.$refs.Add_payment.validate().then(success => {
        if (!success) return;
        this.paymentProcessing = true;
        NProgress.start();
        NProgress.set(0.1);

        axios.put("payment_purchase/" + this.payment.id, {
          date: this.payment.date,
          montant: this.payment.montant,
          account_id: this.payment.account_id,
          payment_method_id: this.payment.payment_method_id,
          purchase_id: this.payment.purchase_id,
          notes: this.payment.notes,
          change: 0
        })
        .then(() => {
          this.paymentProcessing = false;
          NProgress.done();
          this.$bvModal.hide("Add_Payment");
          this.makeToast("success", this.$t("Payment_updated_successfully"), this.$t("Success"));
          this.Payments_Purchases(this.serverParams.page);
        })
        .catch(() => {
          this.paymentProcessing = false;
          NProgress.done();
          this.makeToast("danger", this.$t("Failed_to_update_payment"), this.$t("Failed"));
        });
      });
    },

    Remove_Payment(id) {
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
          NProgress.start();
          NProgress.set(0.1);
          axios
            .delete("payment_purchase/" + id)
            .then(() => {
              this.$swal(
                this.$t("Delete_Deleted"),
                this.$t("Deleted_in_successfully"),
                "success"
              );
              this.Payments_Purchases(this.serverParams.page);
            })
            .catch(() => {
              NProgress.done();
              this.$swal(
                this.$t("Delete_Failed"),
                this.$t("Delete_Therewassomethingwronge"),
                "warning"
              );
            });
        }
      });
    },

    makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    },

    // --- font + RTL helpers
    useVazirmatn(pdf){
      const fontPath = "/fonts/Vazirmatn-Bold.ttf";
      try {
        pdf.addFont(fontPath, "Vazirmatn", "normal");
        pdf.addFont(fontPath, "Vazirmatn", "bold");
      } catch(e) { }
      pdf.setFont("Vazirmatn", "normal");
    },
    isRTL(){
      return (this.$i18n && ['ar','fa','ur','he'].includes(this.$i18n.locale)) ||
            (typeof document !== 'undefined' && document.documentElement.dir === 'rtl');
    },

    findLabel(list, id, key='name'){
      if (!id) return this.$t('All');
      const x = (list||[]).find(i => String(i.id) === String(id));
      return x ? (x[key] ?? this.$t('All')) : this.$t('All');
    },
    findPurchaseRef(id){
      if (!id) return this.$t('All');
      const x = (this.purchases||[]).find(i => String(i.id) === String(id));
      return x ? (x.Ref || this.$t('All')) : this.$t('All');
    },

    // --- Export PDF (Arabic-safe)
    async exportPDF(){
      NProgress.start(); NProgress.set(0.2);
      try{
        const fmtLocal = (d) => {
          if (!d) return '';
          if (this.fmt) return this.fmt(d);
          return (d instanceof Date) ? d.toISOString().slice(0,10) : String(d);
        };

        const from = this.startDate || fmtLocal(this.dateRange?.startDate);
        const to   = this.endDate   || fmtLocal(this.dateRange?.endDate);

        const qs = new URLSearchParams({
          page: '1',
          limit: '-1',
          SortField: this.serverParams?.sort?.field || 'id',
          SortType:  this.serverParams?.sort?.type  || 'desc',
          search: this.search || '',
          from, to,
          Ref: this.Filter_Ref || '',
          provider_id: this.Filter_Supplier || '',
          purchase_id: this.Filter_purchase || '',
          payment_method_id: this.Filter_Reg || ''
        }).toString();

        const { data } = await axios.get(`payment_purchase?${qs}`).catch(()=>({data:{}}));
        const items = Array.isArray(data?.payments) ? data.payments : [];

        const pdf = new jsPDF({ orientation:'landscape', unit:'pt', format:'a4' });
        this.useVazirmatn(pdf);
        const rtl = this.isRTL();
        const margin = 40;
        const pageW = pdf.internal.pageSize.getWidth();

        pdf.setFont('Vazirmatn','bold'); pdf.setFontSize(16);
        const title = this.$t('Payment_Purchases');
        rtl ? pdf.text(title, pageW - margin, 40, { align:'right' })
            : pdf.text(title, margin, 40);

        pdf.setFont('Vazirmatn','normal'); pdf.setFontSize(10);
        const supplierLabel = this.findLabel(this.suppliers, this.Filter_Supplier, 'name');
        const purchaseLabel = this.findPurchaseRef(this.Filter_purchase);
        const methodLabel   = this.findLabel(this.payment_methods, this.Filter_Reg, 'name');
        const refFilter     = this.Filter_Ref || this.$t('All');
        const range         = `${from || '—'} — ${to || '—'}`;

        const headerText = [
          `${this.$t('DateRange')}: ${range}`,
          `${this.$t('Reference')}: ${refFilter}`,
          `${this.$t('Supplier')}: ${supplierLabel}`,
          `${this.$t('Purchase')}: ${purchaseLabel}`,
          `${this.$t('ModePaiement')}: ${methodLabel}`,
        ].join('   •   ');

        const wrapped = pdf.splitTextToSize(headerText, pageW - margin*2);
        rtl ? pdf.text(wrapped, pageW - margin, 58, { align:'right' })
            : pdf.text(wrapped, margin, 58);

        const head = [[
          this.$t('date'),
          this.$t('Reference'),
          this.$t('Purchase'),
          this.$t('Supplier'),
          this.$t('ModePaiement'),
          this.$t('Account'),
          this.$t('Amount'),
        ]];

        const body = items.map(r => ([
          r.date || '',
          r.Ref || '',
          r.Ref_Purchase || '',
          r.provider_name || '',
          r.payment_method || '',
          r.account_name || '',
          Number(r.montant || 0).toFixed(2)
        ]));

        const total = items.reduce((a,b)=> a + Number(b.montant || 0), 0);

        pdf.autoTable({
          startY: 80,
          head, body,
          margin: { left: margin, right: margin },
          theme: 'striped',
          styles: {
            font: 'Vazirmatn',
            fontStyle: 'normal',
            fontSize: 9,
            cellPadding: 6,
            overflow: 'linebreak',
            halign: rtl ? 'right' : 'left',
          },
          headStyles: {
            font: 'Vazirmatn',
            fontStyle: 'bold',
            fillColor: [11,95,255],
            textColor: 255,
            halign: rtl ? 'right' : 'left',
          },
          columnStyles: {
            6: { halign: 'right' }
          },
          foot: [[
            { content: this.$t('Totals'), colSpan: 6, styles:{ halign: 'right', fontStyle:'bold' } },
            { content: total.toFixed(2),  styles:{ halign: 'right', fontStyle:'bold' } }
          ]],
          didDrawPage: (d) => {
            pdf.setFont('Vazirmatn','normal'); pdf.setFontSize(8);
            pdf.text(`${d.pageNumber} / ${pdf.internal.getNumberOfPages()}`,
              pageW - margin, pdf.internal.pageSize.getHeight() - 14, { align:'right' });
          }
        });

        pdf.save(`payments_purchases_${from || 'all'}_${to || 'all'}.pdf`);
      } finally {
        NProgress.done();
      }
    },

    // Fetch
    Payments_Purchases(page) {
      NProgress.start(); NProgress.set(0.1);

      const params =
        "page=" + page +
        "&Ref=" + encodeURIComponent(this.Filter_Ref || "") +
        "&provider_id=" + encodeURIComponent(this.Filter_Supplier || "") +
        "&purchase_id=" + encodeURIComponent(this.Filter_purchase || "") +
        "&payment_method_id=" + encodeURIComponent(this.Filter_Reg || "") +
        "&SortField=" + encodeURIComponent(this.serverParams.sort.field) +
        "&SortType=" + encodeURIComponent(this.serverParams.sort.type) +
        "&search=" + encodeURIComponent(this.search || "") +
        "&limit=" + encodeURIComponent(this.limit) +
        "&to=" + encodeURIComponent(this.fmt(this.dateRange.endDate)) +
        "&from=" + encodeURIComponent(this.fmt(this.dateRange.startDate));

      axios.get("payment_purchase?" + params)
        .then(({data}) => {
          this.payments = data.payments || [];
          this.suppliers = data.suppliers || [];
          this.purchases = data.purchases || [];
          this.payment_methods = data.payment_methods || [];
          this.accounts = data.accounts || [];
          this.totalRows = Number(data.totalRows || 0);
          this.rows[0].children = this.payments;

          this.isLoading = false; NProgress.done();
        })
        .catch(() => {
          this.isLoading = false; NProgress.done();
        });
    }
  },

  created() { this.Payments_Purchases(1); }
};
</script>

<style scoped>
.shadow-soft{ box-shadow:0 12px 24px rgba(0,0,0,.06), 0 2px 6px rgba(0,0,0,.05); }
.btn-pill{ border-radius:999px; }
.w-100.w-sm-auto{ width:100%; }
@media (min-width: 576px){ .w-sm-auto{ width:auto; } }
</style>
