<template>
  <div class="main-content">
    <breadcumb :page="'Job Work In'" :folder="'Goods Receipt'"/>

    <div v-if="isLoading" class="loading_subs">
      <div class="spinner spinner-primary mr-3"></div>
    </div>

    <b-form @submit.prevent="submitReceipt" v-else>
      <div class="row">
        <div class="col-md-12">
          <!-- Header Card: Batch & Source Info -->
          <div class="card mb-4 border-0 shadow-sm">
            <div class="card-body p-4">
              <div class="d-flex align-items-center mb-4">
                <div class="bg-success text-white rounded-circle p-2 mr-3">
                  <i class="i-Information font-weight-bold"></i>
                </div>
                <h4 class="card-title mb-0 font-weight-bold text-dark">Batch & Destination Information</h4>
              </div>

              <div class="row">
                <!-- JWO Selection -->
                <div class="col-md-5">
                  <b-form-group label="Select Job Work Order (Batch)">
                    <v-select
                      v-model="receipt.job_work_order_id"
                      :reduce="label => label.value"
                      :options="activeOrders.map(o => ({
                        label: `${o.Ref} | Source: ${o.from_warehouse ? o.from_warehouse.name : 'N/A'} | Total Qty: ${o.details.reduce((sum, d) => sum + parseFloat(d.quantity), 0)}`,
                        value: o.id
                      }))"
                      @input="onOrderChange"
                      placeholder="Search JWO..."
                      class="premium-select"
                    />
                  </b-form-group>
                </div>

                <!-- Date -->
                <div class="col-md-3">
                  <b-form-group :label="$t('date')">
                    <b-form-input type="date" v-model="receipt.date" required class="premium-input"></b-form-input>
                  </b-form-group>
                </div>

                <!-- Destination -->
                <div class="col-md-4">
                  <b-form-group label="Destination Godown (FG Store)">
                    <v-select
                      v-model="receipt.to_warehouse_id"
                      :reduce="label => label.value"
                      :options="warehouses.map(w => ({label: w.name, value: w.id}))"
                      placeholder="Select Destination"
                      class="premium-select"
                    />
                  </b-form-group>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-12">
          <div class="row">
            <!-- Left Side: Raw Materials Consumption -->
            <div class="col-md-4" v-if="pendingRM.length > 0">
              <div class="card mb-4 border-0 shadow-sm h-100">
                <div class="card-body p-4">
                  <div class="d-flex align-items-center mb-4">
                    <div class="bg-primary text-white rounded-circle p-2 mr-3">
                      <i class="i-Loading-3 font-weight-bold"></i>
                    </div>
                    <h5 class="card-title mb-0 font-weight-bold">Consume Raw Materials</h5>
                  </div>
                  
                  <div v-for="rm in pendingRM" :key="rm.id" class="rm-consume-item mb-4">
                    <div class="d-flex justify-content-between align-items-end mb-2">
                      <span class="font-weight-bold text-dark h5 mb-0">{{ rm.product.name }}</span>
                      <span class="text-muted small font-weight-bold">Balance: {{ (rm.quantity - rm.quantity_consumed).toFixed(2) }}</span>
                    </div>
                    <div class="input-group">
                      <input 
                        type="text" 
                        inputmode="decimal" 
                        class="form-control premium-input text-center font-weight-bold text-primary" 
                        v-model="rm.to_consume"
                        placeholder="0.00"
                      />
                      <div class="input-group-append">
                        <span class="input-group-text bg-light border-left-0">Consuming</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Side: Finished Goods Entry -->
            <div :class="pendingRM.length > 0 ? 'col-md-8' : 'col-md-12'">
              <div class="card mb-4 border-0 shadow-sm h-100">
                <div class="card-body p-4">
                  <div class="d-flex align-items-center mb-4">
                    <div class="bg-success text-white rounded-circle p-2 mr-3">
                      <i class="i-Basket-Items font-weight-bold"></i>
                    </div>
                    <h5 class="card-title mb-0 font-weight-bold">Finished Goods Yield (Receipt)</h5>
                  </div>
                  
                  <div class="table-responsive">
                    <table class="table table-bordered spreadsheet-table">
                      <thead>
                        <tr>
                          <th style="width: 50%">Product (Finished Good)</th>
                          <th style="width: 25%">Yield (Qty)</th>
                          <th style="width: 25%">Wastage</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(detail, index) in receipt.details" :key="index">
                          <td class="p-0">
                            <v-select
                              v-model="detail.product_id"
                              :reduce="label => label.value"
                              :options="products.map(p => ({label: p.name, value: p.id}))"
                              placeholder="Search FG..."
                              class="spreadsheet-select"
                              :append-to-body="true"
                            />
                          </td>
                          <td class="p-0">
                            <input
                              type="text"
                              inputmode="decimal"
                              class="spreadsheet-input text-center text-success font-weight-bold"
                              v-model="detail.quantity"
                              placeholder="0.00"
                            />
                          </td>
                          <td class="p-0">
                            <input
                              type="text"
                              inputmode="decimal"
                              class="spreadsheet-input text-center text-danger"
                              v-model="detail.wastage"
                              placeholder="0.00"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div class="mt-5">
                    <h6 class="font-weight-bold text-muted mb-3">Additional Notes</h6>
                    <b-form-textarea 
                      v-model="receipt.notes" 
                      rows="3" 
                      class="premium-input"
                      placeholder="Enter manufacturing notes, shift details, etc..."
                    ></b-form-textarea>
                  </div>

                  <div class="mt-5 text-right">
                    <b-button type="submit" variant="success" :disabled="isSubmitting" size="lg" class="px-5 py-3 shadow-sm font-weight-bold">
                      <i class="i-Yes mr-2"></i> {{ isSubmitting ? 'Processing...' : 'Complete Goods Receipt' }}
                    </b-button>
                  </div>
                </div>
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
      activeOrders: [],
      pendingRM: [],
      receipt: {
        date: new Date().toISOString().substr(0, 10),
        job_work_order_id: null,
        to_warehouse_id: null,
        notes: "",
        details: [
          { product_id: null, product_variant_id: null, quantity: null, wastage: null }
        ]
      }
    };
  },
  methods: {
    async fetchData() {
      try {
        const [whResponse, prodResponse, jwoResponse] = await Promise.all([
          axios.get("warehouses"),
          axios.get("get_Products_by_warehouse/0"),
          axios.get("job_work?limit=-1")
        ]);
        this.warehouses = whResponse.data.warehouses;
        this.products = prodResponse.data;
        this.activeOrders = jwoResponse.data.orders.filter(o => o.statut !== 'completed');
        this.isLoading = false;
      } catch (error) {
        this.$bvToast.toast("Error loading data", { variant: "danger" });
      }
    },
    onOrderChange(val) {
      if (!val) {
        this.pendingRM = [];
        return;
      }
      axios.get(`job_work/pending_rm?job_work_order_id=${val}`)
        .then(res => {
          this.pendingRM = res.data.map(rm => ({
            ...rm,
            to_consume: rm.quantity - rm.quantity_consumed
          }));
        });
    },
    submitReceipt() {
      if (!this.receipt.job_work_order_id || !this.receipt.to_warehouse_id) {
        this.$bvToast.toast("Please fill batch and destination", { variant: "warning" });
        return;
      }

      const validFG = this.receipt.details.filter(d => d.product_id && d.quantity > 0);
      if (validFG.length === 0) {
        this.$bvToast.toast("Add at least one finished good", { variant: "warning" });
        return;
      }

      this.isSubmitting = true;
      axios.post("job_work/receipt", {
        ...this.receipt,
        details: validFG,
        consumptions: this.pendingRM.filter(rm => rm.to_consume > 0).map(rm => ({
          id: rm.id,
          product_id: rm.product_id,
          product_variant_id: rm.product_variant_id,
          quantity_consumed: rm.to_consume
        }))
      })
      .then(() => {
        this.$bvToast.toast("Receipt Completed Successfully", { variant: "success" });
        this.$router.push("/app/job_work/list");
      })
      .catch(() => {
        this.$bvToast.toast("Failed to process receipt", { variant: "danger" });
        this.isSubmitting = false;
      });
    }
  },
  async mounted() {
    await this.fetchData();
    if (this.$route.query.order_id) {
      this.receipt.job_work_order_id = parseInt(this.$route.query.order_id);
      this.onOrderChange(this.receipt.job_work_order_id);
    }
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

.rm-consume-item {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 20px;
  border-radius: 12px;
  transition: all 0.3s;
}
.rm-consume-item:hover {
  border-color: #3b82f6;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.08);
}

.spreadsheet-table tr:hover { background: #f8fbff; }
</style>
