<template>
  <div class="main-content">
    <breadcumb page="Business Companies" folder="People"/>

    <b-card class="mb-4">
      <b-form @submit.prevent="saveCompany">
        <b-row>
          <b-col md="4"><b-form-group label="Name"><b-form-input v-model="form.name" required></b-form-input></b-form-group></b-col>
          <b-col md="4"><b-form-group label="Code"><b-form-input v-model="form.code"></b-form-input></b-form-group></b-col>
          <b-col md="4"><b-form-group label="Legal Name"><b-form-input v-model="form.legal_name"></b-form-input></b-form-group></b-col>
          <b-col md="4"><b-form-group label="GSTIN"><b-form-input v-model="form.gstin"></b-form-input></b-form-group></b-col>
          <b-col md="4"><b-form-group label="PAN"><b-form-input v-model="form.pan"></b-form-input></b-form-group></b-col>
          <b-col md="4"><b-form-group label="Contact Person"><b-form-input v-model="form.contact_person"></b-form-input></b-form-group></b-col>
          <b-col md="4"><b-form-group label="Phone"><b-form-input v-model="form.phone"></b-form-input></b-form-group></b-col>
          <b-col md="4"><b-form-group label="Email"><b-form-input v-model="form.email"></b-form-input></b-form-group></b-col>
          <b-col md="4"><b-form-group label="State"><b-form-input v-model="form.state"></b-form-input></b-form-group></b-col>
          <b-col md="4"><b-form-group label="City"><b-form-input v-model="form.city"></b-form-input></b-form-group></b-col>
          <b-col md="4"><b-form-group label="PIN Code"><b-form-input v-model="form.pin_code"></b-form-input></b-form-group></b-col>
          <b-col md="4"><b-form-group label="Country"><b-form-input v-model="form.country"></b-form-input></b-form-group></b-col>
          <b-col md="12"><b-form-group label="Address"><b-form-textarea v-model="form.address" rows="3"></b-form-textarea></b-form-group></b-col>
          <b-col md="12"><b-button type="submit" variant="primary">Add Company</b-button></b-col>
        </b-row>
      </b-form>
    </b-card>

    <b-card>
      <div class="table-responsive">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>GSTIN</th>
              <th>PAN</th>
              <th>State</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="company in companies" :key="company.id">
              <td>{{ company.name }}</td>
              <td>{{ company.code }}</td>
              <td>{{ company.gstin }}</td>
              <td>{{ company.pan }}</td>
              <td>{{ company.state }}</td>
              <td>{{ company.phone }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      companies: [],
      form: this.defaultForm()
    };
  },

  methods: {
    defaultForm() {
      return {
        name: "",
        code: "",
        legal_name: "",
        gstin: "",
        pan: "",
        contact_person: "",
        phone: "",
        email: "",
        state: "",
        city: "",
        pin_code: "",
        country: "India",
        address: ""
      };
    },

    loadCompanies() {
      axios.get("business-companies").then(response => {
        this.companies = response.data.companies || [];
      });
    },

    saveCompany() {
      axios.post("business-companies", this.form).then(() => {
        this.form = this.defaultForm();
        this.loadCompanies();
      });
    }
  },

  created() {
    this.loadCompanies();
  }
};
</script>
