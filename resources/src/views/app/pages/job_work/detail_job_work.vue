<template>
  <div class="main-content">
    <breadcumb :page="'Job Work Detail'" :folder="'Inventory'"/>
    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>

    <b-card v-if="!isLoading" class="border-0 shadow-sm">
      <b-row class="mb-5">
        <b-col md="12" class="d-flex align-items-center">
          <b-button @click="editOrder" variant="success" size="sm" class="btn-icon ripple mr-2 py-2 px-3">
            <i class="i-Edit mr-1"></i> Edit Order
          </b-button>
          
          <b-button @click="downloadPdf" variant="primary" size="sm" class="btn-icon ripple mr-2 py-2 px-3">
            <i class="i-File-TXT mr-1"></i> PDF
          </b-button>

          <b-button @click="recordReceipt" variant="info" size="sm" class="btn-icon ripple mr-2 py-2 px-3">
            <i class="i-Add mr-1"></i> Record Receipt
          </b-button>

          <b-button @click="deleteOrder" variant="danger" size="sm" class="btn-icon ripple py-2 px-3">
            <i class="i-Close-Window mr-1"></i> Delete
          </b-button>
        </b-col>
      </b-row>

      <div class="invoice" id="print_Invoice">
        <div class="invoice-print">
          <b-row class="justify-content-md-center mb-4">
            <h4 class="font-weight-bold">Job Work Detail : {{ order.Ref }}</h4>
          </b-row>
          <hr>
          
          <b-row class="mt-5">
            <b-col lg="4" md="4" sm="12" class="mb-4">
              <h5 class="font-weight-bold text-muted mb-3">Worker Information</h5>
              <div class="h5"><strong>Name:</strong> {{ order.worker_warehouse ? order.worker_warehouse.name : 'N/A' }}</div>
              <div class="h5"><strong>Warehouse:</strong> {{ order.from_warehouse ? order.from_warehouse.name : 'N/A' }}</div>
            </b-col>

            <b-col lg="4" md="4" sm="12" class="mb-4">
              <h5 class="font-weight-bold text-muted mb-3">Order Information</h5>
              <div class="h5">Reference : {{ order.Ref }}</div>
              <div class="h5">Date : {{ order.date }}</div>
            </b-col>

            <b-col lg="4" md="4" sm="12" class="mb-4">
              <h5 class="font-weight-bold text-muted mb-3">Status Detail</h5>
              <div>
                <b-badge :variant="getStatusVariant(order.statut)" class="badge-outline text-uppercase px-3 py-2" style="font-size: 1.1rem !important;">
                  {{ order.statut }}
                </b-badge>
              </div>
            </b-col>
          </b-row>

          <b-row class="mt-5">
            <b-col md="12">
              <h5 class="font-weight-bold mb-3">Material Issue (Raw Materials)</h5>
              <div class="table-responsive">
                <table class="table table-hover table-md">
                  <thead class="bg-gray-300">
                    <tr>
                      <th scope="col">Product Name</th>
                      <th scope="col" class="text-center">Issued Qty</th>
                      <th scope="col" class="text-center">Consumed Qty</th>
                      <th scope="col" class="text-right">Balance Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="detail in order.details" :key="detail.id">
                      <td class="font-weight-bold text-dark">{{ detail.product.name }}</td>
                      <td class="text-center">{{ detail.quantity }}</td>
                      <td class="text-center">{{ detail.quantity_consumed }}</td>
                      <td class="text-right text-danger font-weight-bold">{{ (detail.quantity - detail.quantity_consumed).toFixed(2) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </b-col>
          </b-row>

          <!-- Receipts Section -->
          <b-row class="mt-5" v-if="order.receipts && order.receipts.length > 0">
            <b-col md="12">
              <h5 class="font-weight-bold mb-3">Finished Goods Receipts (Job Work In)</h5>
              <div class="table-responsive">
                <table class="table table-hover table-md">
                  <thead class="bg-gray-300">
                    <tr>
                      <th scope="col">Receipt Ref</th>
                      <th scope="col">Product</th>
                      <th scope="col" class="text-center">Yield Qty</th>
                      <th scope="col" class="text-center">Wastage</th>
                      <th scope="col" class="text-right" style="width: 120px;">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-for="receipt in order.receipts">
                      <tr v-for="(item, dIndex) in receipt.details" :key="item.id">
                        <td class="font-weight-bold">{{ receipt.Ref }} <br> <small class="text-muted">{{ receipt.date }}</small></td>
                        <td>{{ item.product.name }}</td>
                        <td class="text-center font-weight-bold text-success">{{ item.quantity }}</td>
                        <td class="text-center text-danger">{{ item.wastage }}</td>
                        <td class="text-right">
                          <span v-if="dIndex === 0">
                            <b-button @click="editReceipt(receipt.id)" variant="outline-success" size="sm" class="btn-icon ripple mr-2">
                              <i class="i-Edit"></i>
                            </b-button>
                            <b-button @click="deleteReceipt(receipt.id)" variant="outline-danger" size="sm" class="btn-icon ripple">
                              <i class="i-Close-Window"></i>
                            </b-button>
                          </span>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </b-col>
          </b-row>

          <b-row class="mt-5 pt-4 border-top" v-if="order.notes">
            <b-col md="12">
              <h6 class="font-weight-bold text-muted mb-2">Manufacturing Notes:</h6>
              <p class="h5">{{ order.notes }}</p>
            </b-col>
          </b-row>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import NProgress from "nprogress";

export default {
  data() {
    return {
      isLoading: true,
      order: {}
    };
  },
  methods: {
    fetchOrder() {
      let id = this.$route.params.id;
      axios.get(`job_work/${id}`).then(response => {
        this.order = response.data;
        this.isLoading = false;
      });
    },
    editOrder() {
      this.$router.push({ name: 'edit_job_work', params: { id: this.order.id } });
    },
    recordReceipt() {
      this.$router.push({ path: '/app/job_work/receipt', query: { order_id: this.order.id } });
    },
    downloadPdf() {
      axios.get(`job_work/pdf/${this.order.id}`, { responseType: 'blob' }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `JobWork_${this.order.Ref}.pdf`);
        document.body.appendChild(link);
        link.click();
      });
    },
    deleteOrder() {
      this.$bvModal.msgBoxConfirm("Delete this batch?", {
        title: 'Confirm', okVariant: 'danger', okTitle: 'DELETE', centered: true
      }).then(value => {
        if (value) {
          axios.delete(`job_work/${this.order.id}`).then(() => {
            this.$router.push("/app/job_work/list");
          });
        }
      });
    },
    editReceipt(id) {
       this.$router.push({ name: 'edit_job_work_receipt', params: { id: id } });
    },
    deleteReceipt(id) {
       this.$bvModal.msgBoxConfirm("Delete receipt?", { okVariant: 'danger', centered: true }).then(v => {
         if(v) axios.delete(`job_work/receipt/${id}`).then(() => this.fetchOrder());
       });
    },
    getStatusVariant(status) {
      switch (status) {
        case "completed": return "success";
        case "partial": return "warning";
        default: return "primary";
      }
    }
  },
  created() {
    this.fetchOrder();
  }
};
</script>

<style scoped>
  .main-content >>> h4 { font-size: 2.2rem !important; }
  .main-content >>> h5 { font-size: 1.6rem !important; }
  .main-content >>> div, .main-content >>> p, .main-content >>> span:not(.ul-btn__icon) { font-size: 1.35rem !important; }
  .main-content >>> .table { font-size: 1.35rem !important; }
  .main-content >>> .table th, .main-content >>> .table td { padding: 15px 12px !important; vertical-align: middle !important; }
  .main-content >>> .badge { font-size: 1.1rem !important; padding: 8px 14px !important; }
  .main-content >>> .breadcrumb h1 { font-size: 1.8rem !important; }
  .bg-gray-300 { background-color: #f1f5f9 !important; }
</style>
