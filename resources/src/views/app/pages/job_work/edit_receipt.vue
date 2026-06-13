<template>
  <div class="main-content">
    <breadcumb :page="'Edit Job Work In'" :folder="'Material Receipt'"/>

    <div v-if="isLoading" class="loading_subs">
      <div class="spinner spinner-primary mr-3"></div>
    </div>

    <b-form @submit.prevent="updateReceipt" v-else>
      <div class="row">
        <div class="col-md-12">
          <!-- Header Card -->
          <div class="card mb-4 border-0 shadow-sm">
            <div class="card-body p-4">
              <div class="d-flex align-items-center mb-4">
                <div class="bg-success text-white rounded-circle p-2 mr-3">
                  <i class="i-Edit font-weight-bold"></i>
                </div>
                <h4 class="card-title mb-0 font-weight-bold text-dark">Edit Goods Receipt ({{ receipt.Ref }})</h4>
              </div>

              <div class="row">
                <div class="col-md-3">
                  <b-form-group label="Date">
                    <b-form-input type="date" v-model="receipt.date" required class="premium-input"></b-form-input>
                  </b-form-group>
                </div>

                <div class="col-md-5">
                  <b-form-group label="Destination Godown">
                    <v-select
                      v-model="receipt.to_warehouse_id"
                      :reduce="label => label.value"
                      :options="warehouses.map(w => ({label: w.name, value: w.id}))"
                      class="premium-select"
                    />
                  </b-form-group>
                </div>
                
                <div class="col-md-4">
                  <b-form-group label="Linked Batch">
                    <div class="premium-input bg-light font-weight-bold text-primary border-0">
                      {{ receipt.order ? receipt.order.Ref : 'N/A' }}
                    </div>
                  </b-form-group>
                </div>
              </div>
            </div>
          </div>

          <!-- Items Card -->
          <div class="card mb-4 border-0 shadow-sm">
            <div class="card-body p-4">
              <div class="table-responsive">
                <table class="table table-bordered spreadsheet-table">
                  <thead>
                    <tr>
                      <th style="width: 45%">Finished Good (Product)</th>
                      <th style="width: 25%">Yield Quantity</th>
                      <th style="width: 20%">Wastage</th>
                      <th style="width: 10%">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(detail, index) in receipt.details" :key="index">
                      <td class="p-0">
                        <v-select
                          v-model="detail.product_id"
                          :reduce="label => label.value"
                          :options="products.map(p => ({label: p.name, value: p.id}))"
                          placeholder="Select FG..."
                          class="spreadsheet-select"
                          :append-to-body="true"
                        />
                      </td>
                      <td class="p-0">
                        <input
                          type="text"
                          class="spreadsheet-input text-center font-weight-bold text-success"
                          v-model="detail.quantity"
                        />
                      </td>
                      <td class="p-0">
                        <input
                          type="text"
                          class="spreadsheet-input text-center font-weight-bold text-danger"
                          v-model="detail.wastage"
                        />
                      </td>
                      <td class="text-center bg-light">
                        <button type="button" @click="removeRow(index)" class="btn btn-link text-danger p-0 mt-3">
                          <i class="i-Close-Window font-weight-bold h4"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <b-button type="button" @click="addRow" variant="outline-success" class="mt-3">
                  <i class="i-Add mr-1"></i> Add Another Finished Good
                </b-button>
              </div>

              <div class="mt-5">
                <h6 class="font-weight-bold text-muted mb-3">Notes</h6>
                <b-form-textarea v-model="receipt.notes" rows="3" class="premium-input"></b-form-textarea>
              </div>

              <div class="mt-5 text-right">
                <b-button type="submit" variant="success" :disabled="isSubmitting" size="lg" class="px-5 py-3 shadow-sm font-weight-bold">
                  <i class="i-Yes mr-2"></i> {{ isSubmitting ? 'Updating...' : 'Update Receipt' }}
                </b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true,
      isSubmitting: false,
      warehouses: [],
      products: [],
      receipt: {
        Ref: "",
        date: "",
        to_warehouse_id: null,
        notes: "",
        details: []
      }
    };
  },
  methods: {
    async fetchData() {
      try {
        const [whResponse, prodResponse] = await Promise.all([
          axios.get("warehouses"),
          axios.get("get_Products_by_warehouse/0")
        ]);
        this.warehouses = whResponse.data.warehouses;
        this.products = prodResponse.data;
        await this.fetchReceipt();
        this.isLoading = false;
      } catch (error) {
        this.$bvToast.toast("Error loading data", { variant: "danger" });
      }
    },
    async fetchReceipt() {
      const id = this.$route.params.id;
      const res = await axios.get(`job_work/receipt/${id}`);
      this.receipt = res.data;
    },
    addRow() {
      this.receipt.details.push({ product_id: null, product_variant_id: null, quantity: 0, wastage: 0 });
    },
    removeRow(index) {
      if (this.receipt.details.length > 1) {
        this.receipt.details.splice(index, 1);
      }
    },
    updateReceipt() {
      this.isSubmitting = true;
      axios.put(`job_work/receipt/${this.receipt.id}`, this.receipt)
        .then(() => {
          this.$bvToast.toast("Receipt updated successfully", { variant: "success" });
          this.$router.push("/app/job_work/detail/" + this.receipt.job_work_order_id);
        })
        .catch(() => {
          this.$bvToast.toast("Failed to update receipt", { variant: "danger" });
          this.isSubmitting = false;
        });
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style scoped>
/* Same premium styles */
.spreadsheet-table { border: 2px solid #eee; border-radius: 8px; overflow: hidden; }
.spreadsheet-table thead th { 
  background: #f1f4f8; padding: 15px; 
  font-weight: 700; text-transform: uppercase; 
  font-size: 1rem; color: #47404f;
  border-bottom: 2px solid #e2e8f0;
}
.spreadsheet-input { 
  width: 100%; border: none; padding: 18px; 
  font-size: 1.4rem; 
  background: transparent; outline: none;
}
.premium-input {
  font-size: 1.3rem !important;
  padding: 25px 15px !important;
  border: 1.5px solid #e2e8f0 !important;
}
.premium-select >>> .vs__dropdown-toggle {
  padding: 10px 5px !important;
}
.spreadsheet-select >>> .vs__dropdown-toggle { 
  border: none; 
  padding: 10px 12px; 
  min-height: 65px;
}
.spreadsheet-select >>> .vs__selected {
  font-size: 1.4rem !important;
  font-weight: 700 !important;
}
</style>
