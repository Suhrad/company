<template>
  <div class="main-content">
    <breadcumb :page="'Job Work List'" :folder="'Inventory'"/>

    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>

    <div v-else>
      <vue-good-table
        mode="remote"
        :columns="columns"
        :totalRows="totalRows"
        :rows="orders"
        @on-page-change="onPageChange"
        @on-per-page-change="onPerPageChange"
        @on-sort-change="onSortChange"
        @on-search="onSearch"
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
        @on-row-click="onRowClick"
        :styleClass="'tableOne table-hover vgt-table full-height'"
      >
        <div slot="table-actions" class="mt-2 mb-3">
          <b-button variant="outline-info ripple m-1" size="sm" v-b-toggle.sidebar-right>
            <i class="i-Filter-2"></i>
            {{ $t("Filter") }}
          </b-button>
          
          <b-button @click="JobWork_PDF_Batch()" size="sm" variant="outline-success ripple m-1">
            <i class="i-File-Copy"></i> PDF
          </b-button>

          <vue-excel-xlsx
              class="btn btn-sm btn-outline-danger ripple m-1"
              :data="orders"
              :columns="columns"
              :file-name="'job_work'"
              :file-type="'xlsx'"
              :sheet-name="'job_work'"
              >
              <i class="i-File-Excel"></i> EXCEL
          </vue-excel-xlsx>

          <router-link
            class="btn-sm btn btn-primary ripple btn-icon m-1"
            to="/app/job_work/issue"
          >
            <span class="ul-btn__icon">
              <i class="i-Add"></i>
            </span>
            <span class="ul-btn__text ml-1">Create</span>
          </router-link>
        </div>

        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'statut'">
            <b-badge :variant="getStatusVariant(props.row.statut)" class="px-3 py-1 text-uppercase">{{ props.row.statut }}</b-badge>
          </span>
          <span v-else-if="props.column.field == 'Ref'" class="font-weight-bold text-primary">
            {{ props.row.Ref }}
          </span>
          <span v-else-if="props.column.field == 'total_qty'" class="font-weight-bold text-dark">
            {{ props.row.details.reduce((a, b) => a + (parseFloat(b.quantity) || 0), 0) }}
          </span>
        </template>
      </vue-good-table>
    </div>

    <!-- Sidebar Filter -->
    <b-sidebar id="sidebar-right" :title="$t('Filter')" bg-variant="white" right shadow>
      <div class="px-3 py-2">
        <b-row>
          <b-col md="12">
            <b-form-group :label="$t('date')">
              <b-form-input type="date" v-model="Filter_date"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="12">
            <b-form-group :label="$t('Reference')">
              <b-form-input :placeholder="$t('Reference')" v-model="Filter_Ref"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="12">
            <b-form-group label="Source Godown">
              <v-select
                v-model="Filter_from_warehouse"
                :reduce="label => label.value"
                placeholder="Choose Godown"
                :options="warehouses.map(w => ({label: w.name, value: w.id}))"
              />
            </b-form-group>
          </b-col>
          <b-col md="12">
            <b-form-group label="Worker Godown">
              <v-select
                v-model="Filter_worker_warehouse"
                :reduce="label => label.value"
                placeholder="Choose Godown"
                :options="warehouses.map(w => ({label: w.name, value: w.id}))"
              />
            </b-form-group>
          </b-col>
          <b-col md="12">
            <b-form-group :label="$t('Status')">
              <v-select
                v-model="Filter_status"
                :reduce="label => label.value"
                :placeholder="$t('Choose_Status')"
                :options="[
                  {label: 'Completed', value: 'completed'},
                  {label: 'Partial', value: 'partial'},
                  {label: 'Ordered', value: 'ordered'},
                ]"
              ></v-select>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-button @click="fetchOrders()" variant="primary btn-block ripple m-1" size="sm">
              <i class="i-Filter-2"></i> {{ $t("Filter") }}
            </b-button>
          </b-col>
          <b-col md="6">
            <b-button @click="Reset_Filter()" variant="danger ripple btn-block m-1" size="sm">
              <i class="i-Power-2"></i> {{ $t("Reset") }}
            </b-button>
          </b-col>
        </b-row>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import NProgress from "nprogress";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  data() {
    return {
      isLoading: true,
      serverParams: {
        sort: { field: "id", type: "desc" },
        page: 1,
        perPage: 10
      },
      search: "",
      totalRows: 0,
      orders: [],
      warehouses: [],
      Filter_date: "",
      Filter_Ref: "",
      Filter_from_warehouse: "",
      Filter_worker_warehouse: "",
      Filter_status: "",
      columns: [
        { label: "Reference", field: "Ref", tdClass: "text-left", thClass: "text-left" },
        { label: "Date", field: "date", tdClass: "text-left", thClass: "text-left" },
        { label: "Source Godown", field: "from_warehouse.name", tdClass: "text-left", thClass: "text-left" },
        { label: "Worker Godown", field: "worker_warehouse.name", tdClass: "text-left", thClass: "text-left" },
        { label: "Qty", field: "total_qty", tdClass: "text-center", thClass: "text-center", sortable: false },
        { label: "Status", field: "statut", tdClass: "text-center", thClass: "text-center", sortable: false }
      ]
    };
  },
  methods: {
    updateParams(newProps) { this.serverParams = Object.assign({}, this.serverParams, newProps); },
    onPageChange(params) { this.updateParams({ page: params.currentPage }); this.fetchOrders(); },
    onPerPageChange(params) { this.updateParams({ perPage: params.currentPerPage }); this.fetchOrders(); },
    onSortChange(params) { this.updateParams({ sort: { type: params[0].type, field: params[0].field } }); this.fetchOrders(); },
    onSearch(params) { this.search = params.searchTerm; this.fetchOrders(); },
    onRowClick(params) { this.$router.push({ path: "/app/job_work/detail/" + params.row.id }); },
    fetchOrders() {
      NProgress.start();
      axios.get("job_work", {
          params: {
            page: this.serverParams.page, limit: this.serverParams.perPage,
            sort_field: this.serverParams.sort.field, sort_type: this.serverParams.sort.type,
            search: this.search, date: this.Filter_date, Ref: this.Filter_Ref,
            from_warehouse_id: this.Filter_from_warehouse,
            worker_warehouse_id: this.Filter_worker_warehouse, statut: this.Filter_status
          }
        })
        .then(response => {
          this.orders = response.data.orders;
          this.totalRows = response.data.totalRows;
          this.isLoading = false;
          NProgress.done();
        })
        .catch(() => { this.isLoading = false; NProgress.done(); });
    },
    fetchWarehouses() { axios.get("warehouses").then(res => { this.warehouses = res.data.warehouses; }); },
    Reset_Filter() {
      this.Filter_date = ""; this.Filter_Ref = ""; this.Filter_from_warehouse = "";
      this.Filter_worker_warehouse = ""; this.Filter_status = "";
      this.fetchOrders();
    },
    getStatusVariant(status) {
      switch (status) {
        case "completed": return "success";
        case "partial": return "warning";
        default: return "primary";
      }
    },
    downloadPdf(id, ref) {
      axios.get(`job_work/pdf/${id}`, { responseType: 'blob' }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `JobWork_${ref}.pdf`);
        document.body.appendChild(link);
        link.click();
      });
    },
    deleteOrder(id) {
      this.$bvModal.msgBoxConfirm("Delete this order?", {
        title: 'Confirm', okVariant: 'danger', okTitle: 'DELETE', centered: true
      }).then(value => {
        if (value) {
          axios.delete(`job_work/${id}`).then(() => {
            this.$bvToast.toast("Order deleted", { variant: "success" });
            this.fetchOrders();
          });
        }
      });
    },
    JobWork_PDF_Batch() {
      var self = this;
      let pdf = new jsPDF("p", "pt", "a4");
      const fontPath = "/fonts/Vazirmatn-Bold.ttf";
      pdf.addFont(fontPath, "VazirmatnBold", "bold"); 
      pdf.setFont("VazirmatnBold"); 

      let columns = [
        { title: "Reference", dataKey: "Ref" },
        { title: "Date", dataKey: "date" },
        { title: "Source", dataKey: "source" },
        { title: "Worker", dataKey: "worker" },
        { title: "Qty", dataKey: "qty" },
        { title: "Status", dataKey: "status" },
      ];

      let formatted_orders = self.orders.map((order) => {
        return {
          Ref: order.Ref,
          date: order.date,
          source: order.from_warehouse ? order.from_warehouse.name : 'N/A',
          worker: order.worker_warehouse ? order.worker_warehouse.name : 'N/A',
          qty: order.details.reduce((a, b) => a + (parseFloat(b.quantity) || 0), 0),
          status: order.statut.toUpperCase(),
        };
      });

      pdf.autoTable({
        columns: columns,
        body: formatted_orders,
        startY: 80,
        theme: "grid", 
        styles: { font: "VazirmatnBold", fontSize: 9, halign: "center", cellPadding: 5 },
        headStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: "bold", fontSize: 10 },
        didDrawPage: (data) => {
           pdf.setFont("VazirmatnBold");
           pdf.setFontSize(16);
           pdf.text("|| Swami Shreeji ||", pdf.internal.pageSize.width / 2, 25, { align: 'center' });
           pdf.setFontSize(14);
           pdf.text("Job Work List", pdf.internal.pageSize.width / 2, 45, { align: 'center' });
        },
      });

      pdf.save("JobWork_List.pdf");
    }
  },
  mounted() { this.fetchOrders(); this.fetchWarehouses(); }
};
</script>

<style scoped>
  .main-content >>> .vgt-table, 
  .main-content >>> .vgt-wrap__footer, 
  .main-content >>> .vgt-global-search__input,
  .main-content >>> .vgt-global-search {
    font-size: 1.3rem !important;
  }
  .main-content >>> .vgt-table th, 
  .main-content >>> .vgt-table td {
    padding: 18px 15px !important;
    vertical-align: middle !important;
  }
  .main-content >>> .breadcrumb ul li {
    font-size: 1.2rem !important;
  }
  .main-content >>> .breadcrumb h1 {
    font-size: 1.8rem !important;
  }
  .main-content >>> .badge {
    font-size: 1rem !important;
    padding: 8px 12px !important;
  }
  .main-content >>> .vgt-table th {
    font-weight: 700 !important;
    color: #334155 !important;
    background: #f8fafc !important;
    text-transform: capitalize !important;
  }
</style>
