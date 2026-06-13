<template>
  <div class="main-content">
    <breadcumb :page="'Job Work Report'" :folder="'Reports'" />

    <b-card class="mb-4">
      <div class="d-flex flex-wrap align-items-center">
        <div class="mr-3 mb-2">
          <label class="text-muted small d-block">Date Range</label>
          <date-range-picker
            v-model="dateRange"
            :locale-data="locale"
            @update="fetchReport"
          >
            <template v-slot:input="picker">
              <b-button variant="outline-primary" size="sm">
                <i class="i-Calendar-4 mr-1"></i>
                {{ picker.startDate | formatDate }} - {{ picker.endDate | formatDate }}
              </b-button>
            </template>
          </date-range-picker>
        </div>

        <div class="mr-3 mb-2">
          <label class="text-muted small d-block">Warehouse</label>
          <v-select
            v-model="warehouse_id"
            :options="warehouses.map(w => ({label: w.name, value: w.id}))"
            :reduce="o => o.value"
            @input="fetchReport"
            placeholder="All Warehouses"
            class="w-200"
          />
        </div>

        <div class="ml-auto d-flex align-items-center">
          <b-button variant="outline-success" size="sm" class="mr-2" @click="exportListPDF">
            <i class="i-File-Copy mr-1"></i> Export List PDF
          </b-button>
          <b-button variant="outline-danger" size="sm" class="mr-2" @click="exportOutstandingPDF">
            <i class="i-File-Copy mr-1"></i> Outstanding Balance PDF
          </b-button>
          <b-button variant="primary" size="sm" @click="fetchReport">
            <i class="i-Reload mr-1"></i> Refresh
          </b-button>
        </div>
      </div>
    </b-card>

    <div v-if="isLoading" class="text-center py-5">
      <div class="spinner spinner-primary"></div>
    </div>

    <div v-else>
      <b-row class="mb-4">
        <b-col md="3">
          <div class="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
            <div class="card-body text-center">
              <i class="i-Add-File"></i>
              <div class="content">
                <p class="text-muted mt-2 mb-0">Total Orders</p>
                <p class="text-primary text-24 line-height-1 mb-2">{{ kpis.total_orders }}</p>
              </div>
            </div>
          </div>
        </b-col>
        <b-col md="3">
          <div class="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
            <div class="card-body text-center">
              <i class="i-Yes"></i>
              <div class="content">
                <p class="text-muted mt-2 mb-0">Completed</p>
                <p class="text-primary text-24 line-height-1 mb-2">{{ kpis.completed_orders }}</p>
              </div>
            </div>
          </div>
        </b-col>
        <b-col md="3">
          <div class="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
            <div class="card-body text-center">
              <i class="i-Box-Full"></i>
              <div class="content">
                <p class="text-muted mt-2 mb-0">Total Yield</p>
                <p class="text-primary text-24 line-height-1 mb-2">{{ kpis.total_yield.toFixed(2) }} kg</p>
              </div>
            </div>
          </div>
        </b-col>
        <b-col md="3">
          <div class="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
            <div class="card-body text-center">
              <i class="i-Close-Window"></i>
              <div class="content">
                <p class="text-muted mt-2 mb-0">Total Wastage</p>
                <p class="text-danger text-24 line-height-1 mb-2">{{ kpis.total_wastage.toFixed(2) }} kg</p>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>

      <b-card>
        <vue-good-table
          mode="remote"
          :columns="columns"
          :rows="orders"
          :totalRows="totalRows"
          @on-page-change="onPageChange"
          @on-per-page-change="onPerPageChange"
          :pagination-options="{ enabled: true }"
          styleClass="tableOne table-hover vgt-table"
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'statut'">
              <b-badge :variant="getStatusVariant(props.row.statut)">{{ props.row.statut.toUpperCase() }}</b-badge>
            </span>
            <span v-else-if="props.column.field == 'efficiency'">
              <b-progress :value="props.row.efficiency" show-progress animated variant="success" class="mt-2"></b-progress>
              <small class="text-muted">{{ props.row.efficiency }}%</small>
            </span>
          </template>
        </vue-good-table>
      </b-card>
    </div>
  </div>
</template>

<script>
import jsPDF from "jspdf";
import "jspdf-autotable";
import NProgress from "nprogress";
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import moment from 'moment'

export default {
  components: { DateRangePicker },
  data() {
    return {
      isLoading: true,
      orders: [],
      totalRows: 0,
      kpis: {},
      warehouses: [],
      warehouse_id: null,
      dateRange: {
        startDate: moment().startOf('month').toDate(),
        endDate: moment().toDate()
      },
      locale: {
        format: 'YYYY-MM-DD',
      },
      page: 1,
      limit: 10,
      today_mode: true
    };
  },
  computed: {
    columns() {
      return [
        { label: 'Ref', field: 'Ref' },
        { label: 'Date', field: 'date' },
        { label: 'Source', field: 'from_warehouse' },
        { label: 'Worker Godown', field: 'worker_warehouse' },
        { label: 'Issued (kg)', field: 'total_issued', type: 'number' },
        { label: 'Yield (kg)', field: 'total_yield', type: 'number' },
        { label: 'Wastage (kg)', field: 'total_wastage', type: 'number' },
        { label: 'Efficiency', field: 'efficiency' },
        { label: 'Status', field: 'statut' },
      ];
    }
  },
  filters: {
    formatDate(val) {
      return moment(val).format('YYYY-MM-DD');
    }
  },
  methods: {
    fetchReport() {
      this.isLoading = true;
      if (this.today_mode) {
        const startDate = moment("2000-01-01").toDate();
        const endDate = moment().toDate();
        this.dateRange.startDate = startDate;
        this.dateRange.endDate = endDate;
      }
      const params = {
        from: moment(this.dateRange.startDate).format('YYYY-MM-DD'),
        to: moment(this.dateRange.endDate).format('YYYY-MM-DD'),
        warehouse_id: this.warehouse_id,
        page: this.page,
        limit: this.limit
      };
      axios.get('report/job_work', { params })
        .then(response => {
          this.orders = response.data.orders;
          this.totalRows = response.data.totalRows;
          this.kpis = response.data.kpis;
          this.warehouses = response.data.warehouses;
          this.isLoading = false;
          this.today_mode = false;
        })
        .catch(() => {
          this.isLoading = false;
          this.today_mode = false;
        });
    },
    onPageChange(params) {
      this.page = params.currentPage;
      this.fetchReport();
    },
    onPerPageChange(params) {
      this.limit = params.currentPerPage;
      this.fetchReport();
    },
    getStatusVariant(status) {
      switch (status) {
        case 'ordered': return 'info';
        case 'partial': return 'warning';
        case 'completed': return 'success';
        default: return 'secondary';
      }
    },

    exportListPDF() {
      NProgress.start();
      NProgress.set(0.1);
      const params = {
        from: moment(this.dateRange.startDate).format('YYYY-MM-DD'),
        to: moment(this.dateRange.endDate).format('YYYY-MM-DD'),
        warehouse_id: this.warehouse_id,
        page: 1,
        limit: -1
      };
      axios.get('report/job_work', { params })
        .then(response => {
          const items = response.data.orders || [];
          const doc = new jsPDF({ orientation:'landscape', unit:'pt', format:'a4' });
          
          const fontPath = "/fonts/Vazirmatn-Bold.ttf";
          try {
            doc.addFont(fontPath, "Vazirmatn", "normal");
            doc.addFont(fontPath, "Vazirmatn", "bold");
          } catch(e) {}
          doc.setFont("Vazirmatn", "normal");

          const pageW = doc.internal.pageSize.getWidth();
          const margin = 40;

          // Title
          doc.setFont('Vazirmatn','bold'); doc.setFontSize(16);
          doc.text("Job Work Issue Report", margin, 40);

          // Filters
          doc.setFont('Vazirmatn','normal'); doc.setFontSize(10);
          const warehouseLabel = this.warehouse_id ? (this.warehouses.find(w => w.id === this.warehouse_id)?.name || 'All') : 'All';
          const range = `${moment(this.dateRange.startDate).format('YYYY-MM-DD')} — ${moment(this.dateRange.endDate).format('YYYY-MM-DD')}`;
          doc.text(`Warehouse: ${warehouseLabel}   •   Date Range: ${range}`, margin, 58);

          const head = [[
            'Ref', 'Date', 'Source', 'Worker Godown', 'Issued (kg)', 'Yield (kg)', 'Wastage (kg)', 'Efficiency', 'Status'
          ]];

          const body = items.map(r => ([
            r.Ref || '',
            r.date || '',
            r.from_warehouse || '',
            r.worker_warehouse || '',
            r.total_issued || '0.00',
            r.total_yield || '0.00',
            r.total_wastage || '0.00',
            (r.efficiency || '0') + '%',
            (r.statut || '').toUpperCase()
          ]));

          doc.autoTable({
            startY: 80,
            head, body,
            margin: { left: margin, right: margin },
            theme: 'striped',
            styles: { font: 'Vazirmatn', fontStyle: 'normal', fontSize: 9, cellPadding: 6 },
            headStyles: { font: 'Vazirmatn', fontStyle: 'bold', fillColor: [11, 95, 255], textColor: 255 }
          });

          doc.save(`job_work_report_${moment(this.dateRange.startDate).format('YYYY-MM-DD')}_to_${moment(this.dateRange.endDate).format('YYYY-MM-DD')}.pdf`);
          NProgress.done();
        })
        .catch(() => {
          NProgress.done();
        });
    },

    exportOutstandingPDF() {
      NProgress.start();
      NProgress.set(0.1);
      const params = {
        warehouse_id: this.warehouse_id
      };
      axios.get('report/job_work/outstanding', { params })
        .then(response => {
          const items = response.data.outstanding || [];
          const doc = new jsPDF({ orientation:'portrait', unit:'pt', format:'a4' });
          
          const fontPath = "/fonts/Vazirmatn-Bold.ttf";
          try {
            doc.addFont(fontPath, "Vazirmatn", "normal");
            doc.addFont(fontPath, "Vazirmatn", "bold");
          } catch(e) {}
          doc.setFont("Vazirmatn", "normal");

          const pageW = doc.internal.pageSize.getWidth();
          const margin = 40;

          // Title
          doc.setFont('Vazirmatn','bold'); doc.setFontSize(16);
          doc.text("Job Work Outstanding Balance Report", margin, 40);

          // Filters
          doc.setFont('Vazirmatn','normal'); doc.setFontSize(10);
          const warehouseLabel = this.warehouse_id ? (this.warehouses.find(w => w.id === this.warehouse_id)?.name || 'All') : 'All Worker Godowns';
          doc.text(`Worker Godown Filter: ${warehouseLabel}`, margin, 58);

          const head = [[
            'Worker Godown', 'Raw Material (Code)', 'Total Issued (kg)', 'Total Consumed (kg)', 'Outstanding Balance (kg)'
          ]];

          const body = items.map(r => ([
            r.worker_warehouse_name || '',
            `${r.product_name} (${r.product_code})`,
            Number(r.total_issued).toFixed(2),
            Number(r.total_consumed).toFixed(2),
            Number(r.balance).toFixed(2)
          ]));

          doc.autoTable({
            startY: 80,
            head, body,
            margin: { left: margin, right: margin },
            theme: 'striped',
            styles: { font: 'Vazirmatn', fontStyle: 'normal', fontSize: 9, cellPadding: 6 },
            headStyles: { font: 'Vazirmatn', fontStyle: 'bold', fillColor: [220, 53, 69], textColor: 255 }
          });

          doc.save(`job_work_outstanding_report_${moment().format('YYYY-MM-DD')}.pdf`);
          NProgress.done();
        })
        .catch(() => {
          NProgress.done();
        });
    }
  },
  mounted() {
    this.fetchReport();
  }
};
</script>

<style scoped>
.w-200 { width: 200px; }
</style>
