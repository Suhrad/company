<template>
  <div class="main-content">
    <breadcumb :page="'Edit Job Work'" :folder="'Inventory'"/>

    <div v-if="isLoading" class="loading_subs">
      <div class="spinner spinner-primary mr-3"></div>
    </div>

    <validation-observer ref="edit_job_work" v-else>
      <b-form @submit.prevent="submitUnified">
        <b-row>
          <b-col lg="12" md="12" sm="12">
            <b-card>
              <b-row>
                <!-- Phase 1: Material Issue Information -->
                <b-col lg="12" md="12" sm="12" class="mb-4 border-bottom pb-2">
                  <h4 class="font-weight-bold text-primary">1. Material Issue (Out)</h4>
                </b-col>

                <b-col lg="4" md="4" sm="12" class="mb-3">
                  <b-form-group label="Date *">
                    <b-form-input type="date" v-model="form.date" required class="premium-input"></b-form-input>
                  </b-form-group>
                </b-col>

                <b-col lg="4" md="4" sm="12" class="mb-3">
                  <b-form-group label="Source Godown *">
                    <v-select
                      v-model="form.from_warehouse_id"
                      :reduce="label => label.value"
                      :options="warehouses.map(w => ({label: w.name, value: w.id}))"
                      class="premium-select"
                    />
                  </b-form-group>
                </b-col>

                <b-col lg="4" md="4" sm="12" class="mb-3">
                  <b-form-group label="Worker Godown *">
                    <v-select
                      v-model="form.worker_warehouse_id"
                      :reduce="label => label.value"
                      :options="warehouses.map(w => ({label: w.name, value: w.id}))"
                      class="premium-select"
                    />
                  </b-form-group>
                </b-col>

                <!-- Issue Table -->
                <b-col md="12" class="mt-4">
                  <h5 class="font-weight-bold">Items Issued *</h5>
                  <div class="table-responsive">
                    <table class="table table-hover">
                      <thead class="bg-gray-300">
                        <tr>
                          <th scope="col">Product Name</th>
                          <th scope="col" style="width: 250px;" class="text-center">Issued Qty</th>
                          <th scope="col" class="text-center" style="width: 100px;"><i class="i-Close-Window text-25"></i></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in form.details" :key="index">
                          <td>
                            <v-select
                              v-model="item.product_id"
                              :reduce="label => label.value"
                              :options="products.map(p => ({label: p.name, value: p.id}))"
                              placeholder="Choose Product"
                              class="grid-v-select"
                              append-to-body
                            />
                          </td>
                          <td>
                            <b-form-input
                              v-model.number="item.quantity"
                              type="text"
                              inputmode="decimal"
                              class="form-control text-center font-weight-bold"
                              style="height: 60px; font-size: 1.8rem;"
                            ></b-form-input>
                          </td>
                          <td class="text-center">
                            <i @click="removeIssueRow(index)" class="i-Close-Window text-25 text-danger cursor-pointer"></i>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <b-button @click="addIssueRow" variant="outline-primary" size="sm" class="mb-5 ripple">
                      <i class="i-Add mr-1"></i> Add Product
                    </b-button>
                  </div>
                </b-col>

                <!-- Phase 2: Receipts Information -->
                <b-col lg="12" md="12" sm="12" class="mt-5 mb-4 border-bottom pb-2">
                  <h4 class="font-weight-bold text-success">2. Finished Goods Receipts (In)</h4>
                </b-col>

                <b-col md="12" v-for="(receipt, rIndex) in form.receipts" :key="'r-'+rIndex" class="mb-5 p-3 border rounded shadow-sm bg-white">
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="mb-0 font-weight-bold text-dark">Receipt Record #{{ rIndex + 1 }} : {{ receipt.Ref || 'New Entry' }}</h5>
                    <b-button @click="removeReceipt(rIndex)" variant="danger" size="sm" class="ripple">Remove Receipt</b-button>
                  </div>
                  
                  <b-row>
                    <b-col md="4">
                      <b-form-group label="Receipt Date">
                        <b-form-input type="date" v-model="receipt.date" class="premium-input"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="8">
                      <b-form-group label="Destination Godown">
                        <v-select
                          v-model="receipt.to_warehouse_id"
                          :reduce="label => label.value"
                          :options="warehouses.map(w => ({label: w.name, value: w.id}))"
                          class="premium-select"
                        />
                      </b-form-group>
                    </b-col>
                  </b-row>

                  <div class="table-responsive mt-3">
                    <table class="table table-hover table-sm">
                      <thead class="bg-gray-300">
                        <tr>
                          <th>Finished Good</th>
                          <th class="text-center" style="width: 250px;">Yield Quantity</th>
                          <th class="text-center" style="width: 200px;">Wastage</th>
                          <th class="text-right" style="width: 80px;">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(d, dIndex) in receipt.details" :key="'rd-'+dIndex">
                          <td>
                            <v-select
                              v-model="d.product_id"
                              :reduce="label => label.value"
                              :options="products.map(p => ({label: p.name, value: p.id}))"
                              placeholder="Choose FG"
                              class="grid-v-select"
                              append-to-body
                            />
                          </td>
                          <td>
                             <b-form-input
                                v-model.number="d.quantity"
                                type="text"
                                inputmode="decimal"
                                class="form-control text-center font-weight-bold text-success"
                                style="height: 60px; font-size: 1.8rem;"
                              ></b-form-input>
                          </td>
                          <td>
                             <b-form-input
                                v-model.number="d.wastage"
                                type="text"
                                inputmode="decimal"
                                class="form-control text-center text-danger"
                                style="height: 60px; font-size: 1.5rem;"
                              ></b-form-input>
                          </td>
                          <td class="text-right">
                             <i @click="removeReceiptItem(rIndex, dIndex)" class="i-Close-Window text-25 text-danger cursor-pointer mt-2"></i>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <b-button @click="addReceiptItem(rIndex)" variant="link" size="sm" class="text-success p-0 font-weight-bold">
                      <i class="i-Add mr-1"></i> Add FG Item
                    </b-button>
                  </div>
                </b-col>

                <!-- Notes and Submit -->
                <b-col md="12" class="mt-4 border-top pt-4">
                  <b-form-group label="Manufacturing Notes">
                    <textarea v-model="form.notes" rows="4" class="form-control" placeholder="Optional notes..."></textarea>
                  </b-form-group>
                </b-col>

                <b-col md="12" class="mt-3">
                  <b-button type="submit" variant="primary" :disabled="isSubmitting" class="ripple px-5 py-3 font-weight-bold shadow-sm">
                    <i class="i-Yes mr-2 font-weight-bold h4 mb-0"></i> {{ isSubmitting ? 'Submitting...' : 'Update Production Batch' }}
                  </b-button>
                </b-col>

              </b-row>
            </b-card>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
  </div>
</template>

<script>
import NProgress from "nprogress";

export default {
  data() {
    return {
      isLoading: true,
      isSubmitting: false,
      warehouses: [],
      products: [],
      form: {
        id: null,
        date: "",
        from_warehouse_id: null,
        worker_warehouse_id: null,
        notes: "",
        details: [],
        receipts: []
      }
    };
  },
  methods: {
    async fetchData() {
      try {
        const [whRes, prodRes] = await Promise.all([
          axios.get("warehouses"),
          axios.get("get_Products_by_warehouse/0")
        ]);
        this.warehouses = whRes.data.warehouses;
        this.products = prodRes.data;
        await this.fetchOrder();
        this.isLoading = false;
      } catch (e) {
        this.$bvToast.toast("Error loading data", { variant: "danger" });
      }
    },
    async fetchOrder() {
      const id = this.$route.params.id;
      const res = await axios.get(`job_work/${id}`);
      this.form = res.data;
    },
    addIssueRow() {
      this.form.details.push({ product_id: null, quantity: 0, quantity_consumed: 0 });
    },
    removeIssueRow(index) {
      if (this.form.details.length > 1) this.form.details.splice(index, 1);
    },
    addReceipt() {
      this.form.receipts.push({
        date: new Date().toISOString().slice(0, 10),
        to_warehouse_id: this.form.from_warehouse_id,
        notes: "",
        details: [{ product_id: null, quantity: 0, wastage: 0 }]
      });
    },
    removeReceipt(index) {
      this.form.receipts.splice(index, 1);
    },
    addReceiptItem(rIndex) {
      this.form.receipts[rIndex].details.push({ product_id: null, quantity: 0, wastage: 0 });
    },
    removeReceiptItem(rIndex, dIndex) {
      if (this.form.receipts[rIndex].details.length > 1) {
        this.form.receipts[rIndex].details.splice(dIndex, 1);
      }
    },
    submitUnified() {
      this.isSubmitting = true;
      NProgress.start();
      axios.put(`job_work/unified/${this.form.id}`, this.form)
        .then(() => {
          this.$bvToast.toast("Updated successfully", { variant: "success" });
          this.$router.push("/app/job_work/detail/" + this.form.id);
          NProgress.done();
        })
        .catch(() => {
          this.$bvToast.toast("Failed to update", { variant: "danger" });
          this.isSubmitting = false;
          NProgress.done();
        });
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style scoped>
.premium-input { font-size: 1.3rem !important; height: 60px !important; border: 1.5px solid #e2e8f0 !important; }
.premium-select >>> .vs__dropdown-toggle { padding: 10px 5px !important; min-height: 60px; border: 1.5px solid #e2e8f0 !important; }
.premium-select >>> .vs__selected { font-size: 1.3rem !important; }
.grid-v-select >>> .vs__dropdown-toggle { border: none !important; min-height: 60px; }
.grid-v-select >>> .vs__selected { font-size: 1.35rem !important; font-weight: 700; }
.bg-gray-300 { background: #f1f5f9 !important; }
</style>
