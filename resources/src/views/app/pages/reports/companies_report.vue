<template>
  <div class="main-content">
    <breadcumb :page="$t('CompanyReport')" :folder="$t('Reports')"/>

    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>

    <b-card class="wrapper" v-if="!isLoading">
      <vue-good-table
        mode="remote"
        :columns="columns"
        :totalRows="totalRows"
        :rows="rows"
        :group-options="{
          enabled: true,
          headerPosition: 'bottom',
        }"
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
        styleClass="tableOne table-hover vgt-table mt-3"
      >
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'type'">
            <b-badge :variant="props.row.type === 'company' ? 'primary' : (props.row.type === 'customer' ? 'success' : 'info')">
              {{ props.row.type === 'company' ? 'Company' : (props.row.type === 'customer' ? 'Customer' : 'Supplier') }}
            </b-badge>
          </span>
          <span v-else-if="props.column.field == 'actions'">
            <a title="PDF" class="cursor-pointer" v-b-tooltip.hover @click="Download_PDF(props.row)">
              <i class="i-File-Copy text-25 text-success"></i>
            </a>
            <router-link title="Report" :to="'/app/reports/detail_company/'+props.row.id+'/'+props.row.type">
             <i class="i-Eye text-25 text-info"></i>
            </router-link>
          </span>
        </template>
      </vue-good-table>
    </b-card>
  </div>
</template>


<script>
import NProgress from "nprogress";
import { mapGetters } from "vuex";

export default {
  metaInfo: {
    title: "Report Companies"
  },
  data() {
    return {
      isLoading: true,
      serverParams: {
        sort: {
          field: "name",
          type: "asc"
        },
        page: 1,
        perPage: 10
      },
      limit: "10",
      search: "",
      totalRows: "",
      companies: [],
      rows: [{
          total_transactions: 'Total',
         
          children: [
             
          ],
      },],
    };
  },

  computed: {
    ...mapGetters(["currentUser"]),
    columns() {
      return [
        {
          label: this.$t("Name"),
          field: "name",
          tdClass: "text-left",
          thClass: "text-left"
        },
        {
          label: this.$t("Type"),
          field: "type",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: true
        },
        {
          label: this.$t("Phone"),
          field: "phone",
          tdClass: "text-left",
          thClass: "text-left"
        },
        {
          label: this.$t("TotalTransactions"),
          field: "total_transactions",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Amount"),
          field: "total_amount",
          type: "decimal",
          headerField: this.sumCount,
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Paid"),
          field: "total_paid",
          type: "decimal",
          headerField: this.sumCount2,
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Due"),
          field: "due",
          type: "decimal",
          headerField: this.sumCount3,
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Action"),
          field: "actions",
          html: true,
          tdClass: "text-right",
          thClass: "text-right",
          sortable: false
        }
      ];
    }
  },

  methods: {
    sumCount(rowObj) {
        let sum = 0;
        if (!rowObj || !rowObj.children || !Array.isArray(rowObj.children)) {
            return sum;
        }
        for (let i = 0; i < rowObj.children.length; i++) {
            if (typeof rowObj.children[i].total_amount === 'number') {
                sum += rowObj.children[i].total_amount;
            }
        }
        return sum;
    },

    sumCount2(rowObj) {
        let sum = 0;
        if (!rowObj || !rowObj.children || !Array.isArray(rowObj.children)) {
            return sum;
        }
        for (let i = 0; i < rowObj.children.length; i++) {
            if (typeof rowObj.children[i].total_paid === 'number') {
                sum += rowObj.children[i].total_paid;
            }
        }
        return sum;
    },

    sumCount3(rowObj) {
        let sum = 0;
        if (!rowObj || !rowObj.children || !Array.isArray(rowObj.children)) {
            return sum;
        }
        for (let i = 0; i < rowObj.children.length; i++) {
            if (typeof rowObj.children[i].due === 'number') {
                sum += rowObj.children[i].due;
            }
        }
        return sum;
    },

    //---- update Params Table
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },

    //---- Event Page Change
    onPageChange({ currentPage }) {
      if (this.serverParams.page !== currentPage) {
        this.updateParams({ page: currentPage });
        this.Get_Company_Report(currentPage);
      }
    },

    //---- Event Per Page Change
    onPerPageChange({ currentPerPage }) {
      if (this.limit !== currentPerPage) {
        this.limit = currentPerPage;
        this.updateParams({ page: 1, perPage: currentPerPage });
        this.Get_Company_Report(1);
      }
    },

    //---- Event on Sort Change
    onSortChange(params) {
      this.updateParams({
        sort: {
          type: params[0].type,
          field: params[0].field
        }
      });
      this.Get_Company_Report(this.serverParams.page);
    },

    //---- Event on Search
    onSearch(value) {
      this.search = value.searchTerm;
      this.Get_Company_Report(this.serverParams.page);
    },

    Download_PDF(row) {
      NProgress.start();
      NProgress.set(0.1);
      const url = (row.type === 'customer' || row.type === 'company')
        ? "report/customer_ledger_pdf/" + row.id 
        : "report/supplier_ledger_pdf/" + row.id;
      
      axios
        .get(url, {
          responseType: "blob",
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          const urlObj = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = urlObj;
          link.setAttribute("download", "Ledger-" + row.name + ".pdf");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setTimeout(() => NProgress.done(), 500);
        })
        .catch(() => {
          setTimeout(() => NProgress.done(), 500);
        });
    },

    //--------------------------- Get Company Report -------------\\
    Get_Company_Report(page) {
      NProgress.start();
      NProgress.set(0.1);
      axios
        .get(
          "report/company?page=" +
            page +
            "&SortField=" +
            this.serverParams.sort.field +
            "&SortType=" +
            this.serverParams.sort.type +
            "&search=" +
            this.search +
            "&limit=" +
            this.limit
        )
        .then(response => {
          this.companies = response.data.report;
          this.totalRows = response.data.totalRows;
          this.rows[0].children = this.companies;
          NProgress.done();
          this.isLoading = false;
        })
        .catch(response => {
          NProgress.done();
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        });
    }
  },

  created: function() {
    this.Get_Company_Report(1);
  }
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
    padding: 12px 10px !important;
    vertical-align: middle !important;
  }
  .main-content >>> .breadcrumb ul li {
    font-size: 1.2rem !important;
  }
  .main-content >>> .breadcrumb h1 {
    font-size: 1.8rem !important;
  }
</style>
