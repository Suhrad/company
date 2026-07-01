<template>
  <div class="main-content">
    <breadcumb :page="$t('SalesReport')" :folder="$t('Reports')"/>

    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>
      <b-col md="12" class="text-center" v-if="!isLoading">
        <date-range-picker 
          v-model="dateRange" 
          :startDate="startDate" 
          :endDate="endDate" 
           @update="Submit_filter_dateRange"
          :locale-data="locale" > 

          <template v-slot:input="picker" style="min-width: 350px;">
              {{ picker.startDate.toJSON().slice(0, 10)}} - {{ picker.endDate.toJSON().slice(0, 10)}}
          </template>        
        </date-range-picker>
      </b-col>

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
        :styleClass="'mt-5 order-table vgt-table'"
      >
        <div slot="table-actions" class="mt-2 mb-3">
          <b-button variant="outline-info ripple m-1" size="sm" v-b-toggle.sidebar-right>
            <i class="i-Filter-2"></i>
            {{ $t("Filter") }}
          </b-button>
          <b-button @click="Sales_PDF()" size="sm" variant="outline-success ripple m-1">
            <i class="i-File-Copy"></i> PDF
          </b-button>
           <vue-excel-xlsx
              class="btn btn-sm btn-outline-danger ripple m-1"
              :data="sales"
              :columns="columns"
              :file-name="'sales_report'"
              :file-type="'xlsx'"
              :sheet-name="'sales_report'"
              >
              <i class="i-File-Excel"></i> EXCEL
          </vue-excel-xlsx>
        </div>

        <template slot="table-row" slot-scope="props">
          <div v-if="props.column.field == 'statut'">
            <span
              v-if="props.row.statut == 'completed'"
              class="badge badge-outline-success"
            >{{$t('complete')}}</span>
            <span
              v-else-if="props.row.statut == 'pending'"
              class="badge badge-outline-info"
            >{{$t('Pending')}}</span>
            <span v-else class="badge badge-outline-warning">{{$t('Ordered')}}</span>
          </div>

          <div v-else-if="props.column.field == 'payment_status'">
            <span
              v-if="props.row.payment_status == 'paid'"
              class="badge badge-outline-success"
            >{{$t('Paid')}}</span>
            <span
              v-else-if="props.row.payment_status == 'partial'"
              class="badge badge-outline-primary"
            >{{$t('partial')}}</span>
            <span v-else class="badge badge-outline-warning">{{$t('Unpaid')}}</span>
          </div>
        </template>
      </vue-good-table>
    </b-card>

    <!-- Sidebar Filter -->
    <b-sidebar id="sidebar-right" :title="$t('Filter')" bg-variant="white" right shadow>
      <div class="px-3 py-2">
        <b-row>
          <!-- Reference -->
          <b-col md="12">
            <b-form-group :label="$t('Reference')">
              <b-form-input label="Reference" :placeholder="$t('Reference')" v-model="Filter_Ref"></b-form-input>
            </b-form-group>
          </b-col>

          <!-- Customer  -->
          <b-col md="12">
            <b-form-group :label="$t('Customer')">
              <v-select
                :reduce="label => label.value"
                :placeholder="$t('Choose_Customer')"
                v-model="Filter_Client"
                :options="customers.map(customers => ({label: customers.name, value: customers.id}))"
              />
            </b-form-group>
          </b-col>

           <!-- Seller  -->
           <b-col md="12">
            <b-form-group label="Seller">
              <v-select
                :reduce="label => label.value"
                placeholder="Choose Seller"
                v-model="Filter_Client"
                :options="sellers.map(sellers => ({label: sellers.username, value: sellers.id}))"
              />
            </b-form-group>
          </b-col>

           <!-- warehouse -->
          <b-col md="12">
            <b-form-group :label="$t('warehouse')">
              <v-select
                v-model="Filter_warehouse"
                :reduce="label => label.value"
                :placeholder="$t('Choose_Warehouse')"
                :options="warehouses.map(warehouses => ({label: warehouses.name, value: warehouses.id}))"
              />
            </b-form-group>
          </b-col>

          <!-- Status  -->
          <b-col md="12">
            <b-form-group :label="$t('Status')">
              <select v-model="Filter_status" type="text" class="form-control">
                <option value selected>All</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="ordered">Ordered</option>
              </select>
            </b-form-group>
          </b-col>

          <!-- Payment Status  -->
          <b-col md="12">
            <b-form-group :label="$t('PaymentStatus')">
              <select v-model="Filter_Payment" type="text" class="form-control">
                <option value selected>All</option>
                <option value="paid">Paid</option>
                <option value="partial">partial</option>
                <option value="unpaid">UnPaid</option>
              </select>
            </b-form-group>
          </b-col>

          <b-col md="6" sm="12">
            <b-button @click="Get_Sales(serverParams.page)" variant="primary ripple m-1" size="sm" block>
              <i class="i-Filter-2"></i>
              {{ $t("Filter") }}
            </b-button>
          </b-col>
          <b-col md="6" sm="12">
            <b-button @click="Reset_Filter()" variant="danger ripple m-1" size="sm" block>
              <i class="i-Power-2"></i>
              {{ $t("Reset") }}
            </b-button>
          </b-col>
        </b-row>
      </div>
    </b-sidebar>
  </div>
  <!-- </div> -->
</template>

<script>
import NProgress from "nprogress";
import jsPDF from "jspdf";
import "jspdf-autotable";
import DateRangePicker from 'vue2-daterange-picker'
//you need to import the CSS manually
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import moment from 'moment'

export default {
  metaInfo: {
    title: "Report Sales"
  },
components: { DateRangePicker },
  data() {
    return {
     startDate: "", 
     endDate: "", 
     dateRange: { 
       startDate: "", 
       endDate: "" 
     }, 
      locale:{ 
          //separator between the two ranges apply
          Label: "Apply", 
          cancelLabel: "Cancel", 
          weekLabel: "W", 
          customRangeLabel: "Custom Range", 
          daysOfWeek: moment.weekdaysMin(), 
          //array of days - see moment documenations for details 
          monthNames: moment.monthsShort(), //array of month names - see moment documenations for details 
          firstDay: 1 //ISO first day of week - see moment documenations for details
        },
      isLoading: true,
      serverParams: {
        sort: {
          field: "id",
          type: "desc"
        },
        page: 1,
        perPage: 10
      },
      limit: "10",
      search: "",
      totalRows: "",
      Filter_Client: "",
      Filter_warehouse: "",
      Filter_seller: "",
      Filter_Ref: "",
      Filter_status: "",
      Filter_Payment: "",
      customers: [],
      warehouses: [],
      sellers: [],
      rows: [{
          statut: 'Total',
         
          children: [
             
          ],
      },],
      sales: [],
      today_mode: true,
      to: "",
      from: "",
    };
  },

  computed: {
    columns() {
      return [
        {
          label: "Date",
          field: "date",
          tdClass: "text-left",
          thClass: "text-left"
        },
        {
          label: "Bill No.",
          field: "Ref",
          tdClass: "text-left",
          thClass: "text-left"
        },
        {
          label: "Party Name",
          field: "client_name",
          tdClass: "text-left",
          thClass: "text-left"
        },
        {
          label: "Items",
          field: "items",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: "Bill Amount",
          field: "GrandTotal",
          type: "decimal",
          tdClass: "text-right",
          thClass: "text-right"
        }
      ];
    }
  },

  methods: {

    sumCount(rowObj) {
     
    	let sum = 0;
      for (let i = 0; i < rowObj.children.length; i++) {
        sum += rowObj.children[i].GrandTotal;
      }
      return sum;
    },
    sumCount2(rowObj) {
     
    	let sum = 0;
      for (let i = 0; i < rowObj.children.length; i++) {
        sum += rowObj.children[i].paid_amount;
      }
      return sum;
    },
    sumCount3(rowObj) {
     
    	let sum = 0;
      for (let i = 0; i < rowObj.children.length; i++) {
        sum += rowObj.children[i].due;
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
        this.Get_Sales(currentPage);
      }
    },

    //---- Event Per Page Change
    onPerPageChange({ currentPerPage }) {
      if (this.limit !== currentPerPage) {
        this.limit = currentPerPage;
        this.updateParams({ page: 1, perPage: currentPerPage });
        this.Get_Sales(1);
      }
    },

    //---- Event on Sort Change

    onSortChange(params) {
      let field = "";
      if (params[0].field == "client_name") {
        field = "client_id";
      } else {
        field = params[0].field;
      }
      this.updateParams({
        sort: {
          type: params[0].type,
          field: field
        }
      });
      this.Get_Sales(this.serverParams.page);
    },

    //---- Event on Search
    onSearch(value) {
      this.search = value.searchTerm;
      this.Get_Sales(this.serverParams.page);
    },

    //------ Reset Filter
    Reset_Filter() {
      this.search = "";
      this.Filter_Client = "";
      this.Filter_status = "";
      this.Filter_Payment = "";
      this.Filter_Ref = "";
      this.Filter_warehouse = "";
      this.Filter_seller = "";
      this.Get_Sales(this.serverParams.page);
    },

    //------------------------------Formetted Numbers -------------------------\\
    formatNumber(number, dec) {
      const value = (typeof number === "string"
        ? number
        : number.toString()
      ).split(".");
      if (dec <= 0) return value[0];
      let formated = value[1] || "";
      if (formated.length > dec)
        return `${value[0]}.${formated.substr(0, dec)}`;
      while (formated.length < dec) formated += "0";
      return `${value[0]}.${formated}`;
    },

    //----------------------------------- Sales PDF ------------------------------\\
    Sales_PDF() {
      var self = this;
      let pdf = new jsPDF("p", "pt", "a4"); // Portrait A4

      const fontPath = "/fonts/Vazirmatn-Bold.ttf";
      pdf.addFont(fontPath, "VazirmatnBold", "bold"); 
      pdf.setFont("VazirmatnBold"); 

      let columns = [
        { title: "Date", dataKey: "date" },
        { title: "Warehouse", dataKey: "warehouse_name" },
        { title: "Party Name", dataKey: "party_details" },
        { title: "Product", dataKey: "product_names" },
        { title: "Items", dataKey: "item_quantities" },
        { title: "Amount", dataKey: "GrandTotal" },
      ];

      let formatted_sales = self.sales.map((sale, index) => {
        // Warehouse Shortcut Mapping (uses dynamic shortcut from API)
        let warehouseShortcut = sale.warehouse_shortcut || sale.warehouse_name || "";

        let productNames = "";
        let itemQtys = "";
        
        if (sale.items) {
           const parts = sale.items.split(', ');
           productNames = parts.map(p => p.split(' (')[0]).join(', ');
           itemQtys = parts.map(p => {
             const m = p.match(/\(([^)]+)\)/);
             return m ? m[1] : '';
           }).join(', ');
        }

        return {
          date: sale.date,
          warehouse_name: warehouseShortcut,
          party_details: `${sale.client_name}${sale.notes ? '\nNote: ' + sale.notes : ''}`,
          product_names: productNames,
          item_quantities: itemQtys,
          GrandTotal: sale.GrandTotal || "0.00",
        };
      });

       // Calculate totals
      let totalBillAmount = self.sales.reduce((sum, sale) => sum + parseFloat(sale.GrandTotal || 0), 0);

      // Calculate Total Items (Quantities)
      let totalItems = 0;
      self.sales.forEach(sale => {
        if (sale.items) {
           const parts = sale.items.split(', ');
           parts.forEach(p => {
             const m = p.match(/\(([^)]+)\)/);
             if (m) totalItems += parseFloat(m[1]);
           });
        }
      });

      let footer = [{
        date: '',
        warehouse_name: '',
        party_details: '',
        product_names: 'Total .....',
        item_quantities: `${totalItems.toFixed(2)}`,
        GrandTotal: `${totalBillAmount.toFixed(2)}`,
      }];

      pdf.autoTable({
             columns: columns,
             body: formatted_sales,
             foot: footer,
             startY: 80,
             theme: "grid", 
             styles: {
               font: "VazirmatnBold", 
               fontSize: 11,
               halign: "center",
             },
             columnStyles: {
                warehouse_name: { cellWidth: 45 },
                party_details: { halign: 'left', cellWidth: 'auto' },
                product_names: { halign: 'left', cellWidth: 100 },
                item_quantities: { halign: 'center', cellWidth: 50 },
                GrandTotal: { halign: 'right', cellWidth: 70 },
             },
             didDrawPage: (data) => {
                pdf.setFont("VazirmatnBold");
                pdf.setFontSize(16);
                pdf.text("|| Swami Shreeji ||", pdf.internal.pageSize.width / 2, 25, { align: 'center' });
                pdf.setFontSize(14);
                pdf.text("Sales List", pdf.internal.pageSize.width / 2, 45, { align: 'center' });
                
                // Filter Info
                pdf.setFontSize(10);
                let filterText = [];
                if (self.Filter_warehouse) {
                  const wh = self.warehouses.find(w => w.id == self.Filter_warehouse);
                  if (wh) filterText.push(`Warehouse: ${wh.name}`);
                }
                if (self.Filter_Client) {
                  const cl = self.customers.find(c => c.id == self.Filter_Client);
                  if (cl) filterText.push(`Customer: ${cl.name}`);
                }
                
                filterText.push(`Period: ${self.startDate} to ${self.endDate}`);

                if (filterText.length > 0) {
                   pdf.text(filterText.join(" | "), pdf.internal.pageSize.width / 2, 65, { align: 'center' });
                }
             },
             headStyles: {
               fillColor: [242, 242, 242], 
               textColor: [0, 0, 0], 
               fontStyle: "bold", 
               lineWidth: 0.5,
               lineColor: [0, 0, 0],
             },
             footStyles: {
               fillColor: [242, 242, 242], 
               textColor: [0, 0, 0], 
               fontStyle: "bold", 
               lineWidth: 0.5, 
               lineColor: [0, 0, 0],
             },
      });

      pdf.save("Sales_List.pdf");
    },

    //---------------------------------------- Set To Strings-------------------------\\
    setToStrings() {
      // Simply replaces null values with strings=''
      if (this.Filter_Client === null) {
        this.Filter_Client = "";
      }else if (this.Filter_warehouse === null) {
        this.Filter_warehouse = "";
      }else if (this.Filter_seller === null) {
        this.Filter_seller = "";
      }
    },

    //----------------------------- Submit Date Picker -------------------\\
    Submit_filter_dateRange() {
      var self = this;
      self.startDate =  self.dateRange.startDate.toJSON().slice(0, 10);
      self.endDate = self.dateRange.endDate.toJSON().slice(0, 10);
      self.Get_Sales(1);
    },


    get_data_loaded() {
      var self = this;
      if (self.today_mode) {
        let startDate = new Date("01/01/2000");  // Set start date to "01/01/2000"
        let endDate = new Date();  // Set end date to current date

        self.startDate = startDate.toISOString();
        self.endDate = endDate.toISOString();

        self.dateRange.startDate = startDate.toISOString();
        self.dateRange.endDate = endDate.toISOString();
      }
    },


    //----------------------------------------- Get all Sales ------------------------------\\
    Get_Sales(page) {
      // Start the progress bar.
      NProgress.start();
      NProgress.set(0.1);
      this.setToStrings();
      this.get_data_loaded();
      axios
        .get(
          "/report/sales?page=" +
            page +
            "&Ref=" +
            this.Filter_Ref +
            "&client_id=" +
            this.Filter_Client +
            "&warehouse_id=" +
            this.Filter_warehouse +
            "&user_id=" +
            this.Filter_seller +
            "&statut=" +
            this.Filter_status +
            "&payment_statut=" +
            this.Filter_Payment +
            "&SortField=" +
            this.serverParams.sort.field +
            "&SortType=" +
            this.serverParams.sort.type +
            "&search=" +
            this.search +
            "&limit=" +
            this.limit+
            "&to=" +
            this.endDate +
            "&from=" +
            this.startDate
        )
        .then(response => {
          this.sales = response.data.sales.map(sale => {
            return {
              ...sale,
              tax_amount: parseFloat(sale.cgst_amount || 0) + parseFloat(sale.sgst_amount || 0) + parseFloat(sale.igst_amount || 0)
            };
          });
          this.customers = response.data.customers;
          this.warehouses = response.data.warehouses;
          this.sellers = response.data.sellers;
          this.totalRows = response.data.totalRows;
          this.rows[0].children = this.sales;

          // Complete the animation of theprogress bar.
          NProgress.done();
          this.isLoading = false;
          this.today_mode = false;
        })
        .catch(response => {
          // Complete the animation of theprogress bar.
          NProgress.done();
          setTimeout(() => {
            this.isLoading = false;
            this.today_mode = false;
          }, 500);
        });
    }
  },
  //----------------------------- Created function-------------------\\
  created() {
    this.Get_Sales(1);
  }
};
</script>