<template>
  <div class="main-content">
    <breadcumb page="SARAL Sales Import" folder="Sales"/>

    <b-card class="mb-4">
      <b-row>
        <b-col md="4">
          <b-form-group label="Business Company">
            <b-form-select v-model="business_company_id" :options="companyOptions"></b-form-select>
          </b-form-group>
        </b-col>
        <b-col md="5">
          <b-form-group label="SARAL JSON File">
            <b-form-file v-model="file" accept=".json,.Json,application/json"></b-form-file>
          </b-form-group>
        </b-col>
        <b-col md="3" class="d-flex align-items-end">
          <div class="w-100">
            <b-button class="mr-2 mb-2" variant="outline-primary" block :disabled="processing" @click="previewFile">
              Preview Import
            </b-button>
            <b-button variant="primary" block :disabled="processing || !preview.summary" @click="runImport">
              Import Sales
            </b-button>
          </div>
        </b-col>
      </b-row>
    </b-card>

    <b-alert v-if="message" show variant="info" class="mb-4">{{ message }}</b-alert>

    <b-card v-if="preview.summary" class="mb-4">
      <h5 class="mb-3">Preview Summary</h5>
      <b-row>
        <b-col md="3"><strong>Invoices:</strong> {{ preview.summary.invoice_count }}</b-col>
        <b-col md="3"><strong>Lines:</strong> {{ preview.summary.line_count }}</b-col>
        <b-col md="3"><strong>Duplicates:</strong> {{ preview.summary.duplicate_count }}</b-col>
        <b-col md="3"><strong>Total Value:</strong> {{ formatMoney(preview.summary.invoice_value_total) }}</b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col md="6">
          <strong>Customer Matching</strong>
          <div>Matched: {{ preview.summary.customer_matches.matched }}</div>
          <div>New: {{ preview.summary.customer_matches.new }}</div>
        </b-col>
        <b-col md="6">
          <strong>Product Matching</strong>
          <div>Matched: {{ preview.summary.product_matches.matched }}</div>
          <div>New: {{ preview.summary.product_matches.new }}</div>
        </b-col>
      </b-row>
    </b-card>

    <b-card v-if="preview.preview_invoices && preview.preview_invoices.length" class="mb-4">
      <h5 class="mb-3">Invoice Review</h5>
      <div class="table-responsive">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Party</th>
              <th>Date</th>
              <th>Value</th>
              <th>Customer Match</th>
              <th>Product Summary</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="invoice in preview.preview_invoices" :key="invoice.row_number">
              <td>{{ invoice.row_number }}</td>
              <td>{{ invoice.party_name }}</td>
              <td>{{ invoice.invoice_date }}</td>
              <td>{{ formatMoney(invoice.invoice_value) }}</td>
              <td>
                <span v-if="invoice.customer_match">
                  {{ invoice.customer_match.name }}
                  <small class="d-block text-muted">{{ invoice.customer_match.gstin }}</small>
                </span>
                <span v-else class="text-warning">New customer</span>
              </td>
              <td>
                Matched: {{ invoice.product_match_summary.matched }}<br>
                New: {{ invoice.product_match_summary.new }}
              </td>
              <td>
                <span v-if="invoice.duplicate" class="badge badge-outline-warning">Duplicate</span>
                <span v-else class="badge badge-outline-success">Ready</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-card>

    <b-card>
      <h5 class="mb-3">Import History</h5>
      <div class="table-responsive">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Company</th>
              <th>File</th>
              <th>Status</th>
              <th>Invoices</th>
              <th>Imported</th>
              <th>Skipped</th>
              <th>Errors</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="job in jobs" :key="job.id">
              <td>{{ job.id }}</td>
              <td>{{ job.company_name }}</td>
              <td>{{ job.file_name }}</td>
              <td>{{ job.status }}</td>
              <td>{{ job.invoice_count }}</td>
              <td>{{ job.imported_count }}</td>
              <td>{{ job.skipped_count }}</td>
              <td>{{ job.error_count }}</td>
              <td>{{ job.created_at }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-card>
  </div>
</template>

<script>
import NProgress from "nprogress";

export default {
  data() {
    return {
      processing: false,
      business_company_id: "",
      business_companies: [],
      file: null,
      preview: {},
      jobs: [],
      message: ""
    };
  },

  computed: {
    companyOptions() {
      return [{ value: "", text: "Select company" }].concat(
        this.business_companies.map(company => ({
          value: company.id,
          text: company.name
        }))
      );
    }
  },

  methods: {
    formatMoney(value) {
      return Number(value || 0).toFixed(2);
    },

    loadCompanies() {
      axios.get("saral-import/companies").then(response => {
        this.business_companies = response.data.companies || [];
        if (!this.business_company_id && this.business_companies.length) {
          this.business_company_id = this.business_companies[0].id;
        }
      });
    },

    loadHistory() {
      axios.get("saral-import/history").then(response => {
        this.jobs = response.data.jobs || [];
      });
    },

    buildFormData() {
      const form = new FormData();
      form.append("business_company_id", this.business_company_id);
      form.append("file", this.file);
      return form;
    },

    previewFile() {
      if (!this.business_company_id || !this.file) {
        this.message = "Choose a company and JSON file first.";
        return;
      }

      this.message = "";
      this.processing = true;
      NProgress.start();
      axios.post("saral-import/preview", this.buildFormData())
        .then(response => {
          this.preview = response.data;
        })
        .catch(error => {
          this.message = error.response?.data?.message || "Preview failed.";
        })
        .finally(() => {
          this.processing = false;
          NProgress.done();
        });
    },

    runImport() {
      if (!this.business_company_id || !this.file) {
        this.message = "Choose a company and JSON file first.";
        return;
      }

      this.message = "";
      this.processing = true;
      NProgress.start();
      axios.post("saral-import/import", this.buildFormData())
        .then(response => {
          this.message = `Imported ${response.data.imported_count} invoices, skipped ${response.data.skipped_count}, errors ${response.data.error_count}.`;
          this.loadHistory();
        })
        .catch(error => {
          this.message = error.response?.data?.message || "Import failed.";
        })
        .finally(() => {
          this.processing = false;
          NProgress.done();
        });
    }
  },

  created() {
    this.loadCompanies();
    this.loadHistory();
  }
};
</script>
