<template>
  <div class="main-content">
    <breadcumb :page="'Job Work Out'" :folder="'Material Issue'"/>

    <div v-if="isLoading" class="loading_subs">
      <div class="spinner spinner-primary mr-3"></div>
    </div>

    <b-form @submit.prevent="submitIssue" v-else>
      <div class="row">
        <div class="col-md-12">
          <!-- Header Card: Source & Destination -->
          <div class="card mb-4 border-0 shadow-sm">
            <div class="card-body p-4">
              <div class="d-flex align-items-center mb-4">
                <div class="bg-primary text-white rounded-circle p-2 mr-3">
                  <i class="i-Information font-weight-bold"></i>
                </div>
                <h4 class="card-title mb-0 font-weight-bold text-dark">Material Issue Information (Out)</h4>
              </div>

              <div class="row">
                <!-- Date -->
                <div class="col-md-3">
                  <b-form-group :label="$t('date')">
                    <b-form-input type="date" v-model="issue.date" required class="premium-input"></b-form-input>
                  </b-form-group>
                </div>

                <!-- From Warehouse -->
                <div class="col-md-4">
                  <b-form-group label="Source Godown (From)">
                    <v-select
                      v-model="issue.from_warehouse_id"
                      :reduce="label => label.value"
                      :options="warehouses.map(w => ({label: w.name, value: w.id}))"
                      placeholder="Select Source"
                      class="premium-select"
                    />
                  </b-form-group>
                </div>

                <!-- To Worker Warehouse -->
                <div class="col-md-5">
                  <b-form-group label="Worker Godown (To)">
                    <v-select
                      v-model="issue.worker_warehouse_id"
                      :reduce="label => label.value"
                      :options="warehouses.map(w => ({label: w.name, value: w.id}))"
                      placeholder="Select Worker Godown"
                      class="premium-select"
                    />
                  </b-form-group>
                </div>
              </div>
            </div>
          </div>

          <!-- Main Entry Card -->
          <div class="card mb-4 border-0 shadow-sm">
            <div class="card-body p-4">
              <div class="d-flex align-items-center mb-4">
                <div class="bg-primary text-white rounded-circle p-2 mr-3">
                  <i class="i-Loading-3 font-weight-bold"></i>
                </div>
                <h5 class="card-title mb-0 font-weight-bold">Items to Issue (Raw Materials)</h5>
              </div>

              <div class="table-responsive">
                <table class="table table-bordered spreadsheet-table">
                  <thead>
                    <tr>
                      <th style="width: 60%">Item (Raw Material)</th>
                      <th style="width: 30%">Quantity (kg/units)</th>
                      <th style="width: 10%">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(detail, index) in issue.details" :key="index">
                      <td class="p-0">
                        <v-select
                          v-model="detail.product_id"
                          :reduce="label => label.value"
                          :options="products.map(p => ({label: p.name, value: p.id}))"
                          placeholder="Search Product..."
                          class="spreadsheet-select"
                          :append-to-body="true"
                        />
                      </td>
                      <td class="p-0">
                        <input
                          type="text"
                          inputmode="decimal"
                          class="spreadsheet-input text-center font-weight-bold text-primary"
                          v-model="detail.quantity"
                          placeholder="0.00"
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
                <div class="text-left">
                  <b-button type="button" @click="addRow" variant="outline-primary" class="mt-3 px-4 py-2 font-weight-bold">
                    <i class="i-Add mr-1"></i> Add Another Item
                  </b-button>
                </div>
              </div>

              <div class="mt-5">
                <h6 class="font-weight-bold text-muted mb-3">Notes / Instructions</h6>
                <b-form-textarea 
                  v-model="issue.notes" 
                  rows="3" 
                  class="premium-input"
                  placeholder="Enter any specific instructions for the worker..."
                ></b-form-textarea>
              </div>

              <div class="mt-5 text-right">
                <b-button type="submit" variant="primary" :disabled="isSubmitting" size="lg" class="px-5 py-3 shadow-sm font-weight-bold">
                  <i class="i-Yes mr-2"></i> {{ isSubmitting ? 'Processing...' : 'Issue Materials' }}
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
      issue: {
        date: new Date().toISOString().substr(0, 10),
        from_warehouse_id: null,
        worker_warehouse_id: null,
        notes: "",
        details: [
          { product_id: null, product_variant_id: null, quantity: null }
        ]
      }
    };
  },
  methods: {
    async fetchData() {
      try {
        const [whResponse, prodResponse] = await Promise.all([
          axios.get("warehouses"),
          axios.get("get_Products_by_warehouse/0") // Fetch all products
        ]);
        this.warehouses = whResponse.data.warehouses;
        this.products = prodResponse.data;
        this.isLoading = false;
      } catch (error) {
        this.$bvToast.toast("Error loading data", { variant: "danger" });
      }
    },
    addRow() {
      this.issue.details.push({ product_id: null, product_variant_id: null, quantity: null });
    },
    removeRow(index) {
      if (this.issue.details.length > 1) {
        this.issue.details.splice(index, 1);
      }
    },
    submitIssue() {
      if (!this.issue.from_warehouse_id || !this.issue.worker_warehouse_id) {
        this.$bvToast.toast("Please select warehouses", { variant: "warning" });
        return;
      }
      
      const validDetails = this.issue.details.filter(d => d.product_id && d.quantity > 0);
      if (validDetails.length === 0) {
        this.$bvToast.toast("Add at least one valid item", { variant: "warning" });
        return;
      }

      this.isSubmitting = true;
      axios.post("job_work/issue", {
        ...this.issue,
        details: validDetails
      })
      .then(() => {
        this.$bvToast.toast("Material Issued Successfully", { variant: "success" });
        this.$router.push("/app/job_work/list");
      })
      .catch(() => {
        this.$bvToast.toast("Failed to issue material", { variant: "danger" });
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
  transition: all 0.2s;
}
.spreadsheet-input:focus { background: #f0f7ff; box-shadow: inset 0 0 0 2px #3b82f6; }

.premium-input {
  font-size: 1.3rem !important;
  padding: 25px 15px !important;
  border: 1.5px solid #e2e8f0 !important;
  border-radius: 8px !important;
  background-color: #fcfcfc !important;
}

.premium-select >>> .vs__dropdown-toggle {
  padding: 10px 5px !important;
  border: 1.5px solid #e2e8f0 !important;
  border-radius: 8px !important;
  background-color: #fcfcfc !important;
}

.premium-select >>> .vs__selected {
  font-size: 1.3rem !important;
  font-weight: 600 !important;
  color: #2d3748 !important;
}

.spreadsheet-select >>> .vs__dropdown-toggle { 
  border: none; 
  padding: 10px 12px; 
  background: transparent; 
  min-height: 65px;
}
.spreadsheet-select >>> .vs__selected {
  margin: 0;
  padding: 0;
  font-size: 1.4rem !important;
  font-weight: 700 !important;
  color: #1a202c !important;
  white-space: normal;
  max-word: break-word;
  max-width: 100%;
}
.spreadsheet-select >>> .vs__search {
  margin: 0;
  padding: 0;
  font-size: 1.4rem !important;
}
.spreadsheet-select >>> .vs__dropdown-menu {
  min-width: 400px;
  max-width: 800px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  border: none;
}
.spreadsheet-select >>> .vs__dropdown-option {
  white-space: normal;
  padding: 15px 20px;
  font-size: 1.2rem;
  border-bottom: 1px solid #f1f5f9;
}
.spreadsheet-select >>> .vs__dropdown-option--highlight {
  background: #3b82f6;
}

.spreadsheet-table tr:hover { background: #f8fbff; }
</style>
