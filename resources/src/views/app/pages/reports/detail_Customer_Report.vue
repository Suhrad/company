<template>
  <div class="main-content">
    <breadcumb :page="$t('CustomersReport')" :folder="$t('Reports')"/>
    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>

    <b-row v-if="!isLoading">
      <!-- ICON BG -->

      <b-col lg="3" md="6" sm="12">
        <b-card class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center">
          <i class="i-Full-Cart"></i>
          <div class="content">
            <p class="text-muted mt-2 mb-0">{{$t('Sales')}}</p>
            <p class="text-primary text-24 line-height-1 mb-2">{{client.total_sales}}</p>
          </div>
        </b-card>
      </b-col>
      <b-col lg="3" md="6" sm="12">
        <b-card class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center">
          <i class="i-Financial"></i>
          <div class="content">
            <p class="text-muted mt-2 mb-0">{{$t('TotalAmount')}}</p>
            <p
              class="text-primary text-24 line-height-1 mb-2"
            >{{currentUser.currency}} {{formatNumber((client.total_amount),2)}}</p>
          </div>
        </b-card>
      </b-col>
      <b-col lg="3" md="6" sm="12">
        <b-card class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center">
          <i class="i-Money-2"></i>
          <div class="content">
            <p class="text-muted mt-2 mb-0">{{$t('TotalPaid')}}</p>
            <p
              class="text-primary text-24 line-height-1 mb-2"
            >{{currentUser.currency}} {{formatNumber((client.total_paid),2)}}</p>
          </div>
        </b-card>
      </b-col>
      <b-col lg="3" md="6" sm="12">
        <b-card class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center">
          <i class="i-Money-Bag"></i>
          <div class="content">
            <p class="text-muted mt-2 mb-0">{{$t('Due')}}</p>
            <p
              class="text-primary text-24 line-height-1 mb-2"
            >{{currentUser.currency}} {{formatNumber((client.due),2)}}</p>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <b-row v-if="!isLoading">
      <b-col md="12">
        <b-card class="card mb-30" header-bg-variant="transparent ">
          <b-tabs active-nav-item-class="nav nav-tabs" content-class="mt-3">
           
            <!-- Sales Table -->
            <b-tab :title="$t('Sales')">
              <vue-good-table
                mode="remote"
                :columns="columns_sales"
                :totalRows="totalRows_sales"
                :rows="sales"
                @on-page-change="PageChangeSales"
                @on-per-page-change="onPerPageChangeSales"
                @on-search="onSearch_sales"
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
                styleClass="tableOne table-hover vgt-table"
              >
              <div slot="table-actions" class="mt-2 mb-3">
                <b-button @click="Sales_PDF()" size="sm" variant="outline-success ripple m-1">
                  <i class="i-File-Copy"></i> PDF
                </b-button>
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
                  <div v-else-if="props.column.field == 'shipping_status'">
                  <span
                    v-if="props.row.shipping_status == 'ordered'"
                    class="badge badge-outline-warning"
                  >{{$t('Ordered')}}</span>

                  <span
                    v-else-if="props.row.shipping_status == 'packed'"
                    class="badge badge-outline-info"
                  >{{$t('Packed')}}</span>

                  <span
                    v-else-if="props.row.shipping_status == 'shipped'"
                    class="badge badge-outline-secondary"
                  >{{$t('Shipped')}}</span>

                  <span
                    v-else-if="props.row.shipping_status == 'delivered'"
                    class="badge badge-outline-success"
                  >{{$t('Delivered')}}</span>

                  <span v-else-if="props.row.shipping_status == 'cancelled'" class="badge badge-outline-danger">{{$t('Cancelled')}}</span>
                </div>
                   <div v-else-if="props.column.field == 'Ref'">
                    <router-link
                      :to="'/app/sales/detail/'+props.row.id"
                    >
                      <span class="ul-btn__text ml-1">{{props.row.Ref}}</span>
                    </router-link>
                  </div>
                </template>
              </vue-good-table>
            </b-tab>

             <!-- Quotations Table -->
            <b-tab :title="$t('Quotations')">
              <vue-good-table
                mode="remote"
                :columns="columns_quotations"
                :totalRows="totalRows_quotations"
                :rows="quotations"
                @on-page-change="PageChangeQuotation"
                @on-per-page-change="onPerPageChangeQuotation"
                @on-search="onSearch_quotations"
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
                styleClass="tableOne table-hover vgt-table"
              >
              <div slot="table-actions" class="mt-2 mb-3">
                <b-button @click="Quotation_PDF()" size="sm" variant="outline-success ripple m-1">
                  <i class="i-File-Copy"></i> PDF
                </b-button>
              </div>
                <template slot="table-row" slot-scope="props">
                  <div v-if="props.column.field == 'statut'">
                    <span
                      v-if="props.row.statut == 'sent'"
                      class="badge badge-outline-success"
                    >{{$t('Sent')}}</span>
                    <span v-else class="badge badge-outline-info">{{$t('Pending')}}</span>
                  </div>
                    <div v-else-if="props.column.field == 'Ref'">
                    <router-link
                      :to="'/app/quotations/detail/'+props.row.id"
                    >
                      <span class="ul-btn__text ml-1">{{props.row.Ref}}</span>
                    </router-link>
                  </div>
                </template>
              </vue-good-table>
            </b-tab>

            <!-- Returns Table -->
            <b-tab :title="$t('Returns')">
              <vue-good-table
                mode="remote"
                :columns="columns_returns"
                :totalRows="totalRows_returns"
                :rows="returns_customer"
                @on-page-change="PageChangeReturn"
                @on-per-page-change="onPerPageChangeReturn"
                @on-search="onSearch_return_sales"
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
                styleClass="tableOne table-hover vgt-table"
              >
              <div slot="table-actions" class="mt-2 mb-3">
                <b-button @click="Sale_Return_PDF()" size="sm" variant="outline-success ripple m-1">
                  <i class="i-File-Copy"></i> PDF
                </b-button>
              </div>
                <template slot="table-row" slot-scope="props">
                  <div v-if="props.column.field == 'statut'">
                    <span
                      v-if="props.row.statut == 'received'"
                      class="badge badge-outline-success"
                    >{{$t('Received')}}</span>
                    <span v-else class="badge badge-outline-info">{{$t('Pending')}}</span>
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
                  <div v-else-if="props.column.field == 'Ref'">
                    <router-link
                      :to="'/app/sale_return/detail/'+props.row.id"
                    >
                      <span class="ul-btn__text ml-1">{{props.row.Ref}}</span>
                    </router-link>
                  </div>
                  <div v-else-if="props.column.field == 'sale_ref' && props.row.sale_id">
                    <router-link
                      :to="'/app/sales/detail/'+props.row.sale_id"
                    >
                      <span class="ul-btn__text ml-1">{{props.row.sale_ref}}</span>
                    </router-link>
                  </div>
                </template>
              </vue-good-table>
            </b-tab>

            <!-- Ledger Table -->
            <b-tab title="Ledger">
              <div slot="table-actions" class="mt-2 mb-3">
                 <b-button @click="Ledger_PDF()" size="sm" variant="outline-success ripple m-1">
                  <i class="i-File-Copy"></i> PDF
                </b-button>
              </div>

              <div class="table-responsive">
                <table class="table table-hover table-bordered">
                  <thead>
                    <tr>
                      <th class="text-center">{{$t('date')}}</th>
                      <th class="text-center">Book</th>
                      <th class="text-center">Doc.No</th>
                      <th>Particulars</th>
                      <th class="text-right">Debit</th>
                      <th class="text-right">Credit</th>
                      <th class="text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="ledger_data_loaded">
                      <td class="text-center">{{ period.start }}</td>
                      <td class="text-center">-</td>
                      <td class="text-center">-</td>
                      <td><strong>Opening Balance</strong></td>
                      <td class="text-right"></td>
                      <td class="text-right"></td>
                      <td class="text-right font-weight-bold">
                        {{ formatNumber(opening_balance, 2) }} ({{ opening_balance_type }})
                      </td>
                    </tr>
                    <tr v-for="row in ledger" :key="row.timestamp">
                      <td class="text-center">{{ row.date }}</td>
                      <td class="text-center">{{ row.book }}</td>
                      <td class="text-center">{{ row.ref }}</td>
                      <td style="white-space: pre-line;">{{ row.particulars }}</td>
                      <td class="text-right">{{ row.debit > 0 ? formatNumber(row.debit, 2) : '' }}</td>
                      <td class="text-right">{{ row.credit > 0 ? formatNumber(row.credit, 2) : '' }}</td>
                      <td class="text-right font-weight-bold">
                        {{ formatNumber(row.balance, 2) }} ({{ row.balance_type }})
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr v-if="ledger_data_loaded" class="bg-light">
                      <td colspan="4" class="text-right font-weight-bold">Closing Balance</td>
                      <td colspan="3" class="text-right font-weight-bold">
                        {{ formatNumber(closing_balance, 2) }} ({{ closing_balance_type }})
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </b-tab>

            <!-- Payments Table -->
            <b-tab :title="$t('Payments')">
              <vue-good-table
                mode="remote"
                :columns="columns_payments"
                :totalRows="totalRows_payments"
                :rows="payments"
                @on-page-change="PageChangePayments"
                @on-per-page-change="onPerPageChangePayments"
                @on-search="onSearch_payments"
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
                styleClass="tableOne table-hover vgt-table"
              >
               <div slot="table-actions" class="mt-2 mb-3">
                <b-button @click="Payments_PDF()" size="sm" variant="outline-success ripple m-1">
                  <i class="i-File-Copy"></i> PDF
                </b-button>
              </div>
              </vue-good-table>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  data() {
    return {
      totalRows_quotations: "",
      totalRows_sales: "",
      totalRows_returns: "",
      totalRows_payments: "",
      limit_quotations: "10",
      limit_returns: "10",
      limit_sales: "10",
      limit_payments: "10",
      sales_page: 1,
      quotations_page: 1,
      Return_sale_page: 1,
      Payment_sale_page: 1,
      isLoading: true,
      payments: [],
      sales: [],
      quotations: [],
      returns_customer: [],

      search_sales:"",
      search_payments:"",
      search_quotations:"",
      search_return_sales:"",

      client: {
        id: "",
        name: "",
        total_sales: 0,
        total_amount: 0,
        total_paid: 0,
        due: 0
      },
      ledger: [],
      ledger_data_loaded: false,
      opening_balance: 0,
      opening_balance_type: 'Dr',
      closing_balance: 0,
      closing_balance_type: 'Dr',
      period: {
        start: '',
        end: ''
      }
    };
  },

  computed: {
    ...mapGetters(["currentUser"]),
    columns_quotations() {
      return [
        {
          label: this.$t("date"),
          field: "date",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Reference"),
          field: "Ref",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Customer"),
          field: "client_name",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("warehouse"),
          field: "warehouse_name",
          tdClass: "text-left",
          thClass: "text-left"
        },
        {
          label: this.$t("Total"),
          field: "GrandTotal",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Status"),
          field: "statut",
          tdClass: "text-left",
          thClass: "text-left",
          html: true,
          sortable: false
        }
      ];
    },
    columns_sales() {
      return [
        {
          label: this.$t("date"),
          field: "date",
          tdClass: "text-left",
          thClass: "text-left",
        },
        {
          label: this.$t("Reference"),
          field: "Ref",
          tdClass: "text-left",
          thClass: "text-left",
        },
        {
          label: "GST",
          field: "tax_amount",
          type: "decimal",
          tdClass: "text-right",
          thClass: "text-right",
        },
        {
          label: "Note",
          field: "notes",
          tdClass: "text-left",
          thClass: "text-left",
        },
        {
          label: this.$t("Total"),
          field: "GrandTotal",
          type: "decimal",
          tdClass: "text-right",
          thClass: "text-right",
        },
        {
          label: this.$t("Status"),
          field: "statut",
          html: true,
          tdClass: "text-center",
          thClass: "text-center",
        },
      ];
    },
    columns_returns() {
      return [
        {
          label: this.$t("Reference"),
          field: "Ref",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Customer"),
          field: "client_name",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Sale_Ref"),
          field: "sale_ref",
          tdClass: "text-left",
          thClass: "text-left"
        },
        {
          label: this.$t("warehouse"),
          field: "warehouse_name",
          tdClass: "text-left",
          thClass: "text-left"
        },
       
        {
          label: this.$t("Total"),
          field: "GrandTotal",
          type: "decimal",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Paid"),
          field: "paid_amount",
          type: "decimal",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Due"),
          field: "due",
          type: "decimal",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
         {
          label: this.$t("Status"),
          field: "statut",
          html: true,
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("PaymentStatus"),
          field: "payment_status",
          html: true,
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        }
      ];
    },
    columns_payments() {
      return [
        {
          label: this.$t("date"),
          field: "date",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Reference"),
          field: "Ref",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: "Type",
          field: "type",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Sale"),
          field: "Sale_Ref",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("ModePaiement"),
          field: "payment_method",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: "Note",
          field: "notes",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Amount"),
          field: "montant",
          tdClass: "text-right",
          thClass: "text-right",
          type: "decimal",
          sortable: false
        }
      ];
    }
  },

  methods: {

     //----------------------------------- Sales PDF ------------------------------\\
    Sales_PDF() {
      var self = this;
      let pdf = new jsPDF("l", "pt"); // Landscape

      const fontPath = "/fonts/Vazirmatn-Bold.ttf";
      pdf.addFont(fontPath, "VazirmatnBold", "bold"); 
      pdf.setFont("VazirmatnBold"); 

      let columns = [
        { title: "Sr.No", dataKey: "sr_no" },
        { title: self.$t("date"), dataKey: "date" },
        { title: "Bill No.", dataKey: "Ref" },
        { title: "Party Name", dataKey: "party_details" },
        { title: "GST", dataKey: "tax_amount" },
        { title: "Bill Amount", dataKey: "GrandTotal" },
      ];

      let formatted_sales = self.sales.map((sale, index) => {
        let tax_total = parseFloat(sale.cgst_amount || 0) + parseFloat(sale.sgst_amount || 0) + parseFloat(sale.igst_amount || 0);
        return {
          sr_no: index + 1,
          date: sale.date,
          Ref: sale.Ref,
          party_details: `${self.client.name}${sale.notes ? '\nNote: ' + sale.notes : ''}`,
          tax_amount: tax_total.toFixed(2),
          GrandTotal: self.formatNumber(sale.GrandTotal, 2),
        };
      });

      let totalTax = self.sales.reduce((sum, s) => sum + (parseFloat(s.cgst_amount || 0) + parseFloat(s.sgst_amount || 0) + parseFloat(s.igst_amount || 0)), 0);
      let totalAmount = self.sales.reduce((sum, s) => sum + parseFloat(s.GrandTotal || 0), 0);

      let footer = [{
        sr_no: '',
        date: '',
        Ref: '',
        party_details: 'Total .....',
        tax_amount: totalTax.toFixed(2),
        GrandTotal: totalAmount.toFixed(2),
      }];

      pdf.autoTable({
        columns: columns,
        body: formatted_sales,
        foot: footer,
        startY: 80,
        theme: "grid", 
        styles: {
          font: "VazirmatnBold", 
          fontSize: 9,
          halign: "center",
        },
        columnStyles: {
           party_details: { halign: 'left' },
           tax_amount: { halign: 'right' },
           GrandTotal: { halign: 'right' },
        },
        didDrawPage: (data) => {
           pdf.setFont("VazirmatnBold");
           pdf.setFontSize(16);
           pdf.text("|| Swami Shreeji ||", pdf.internal.pageSize.width / 2, 25, { align: 'center' });
           pdf.setFontSize(14);
           pdf.text("Sales List", pdf.internal.pageSize.width / 2, 45, { align: 'center' });
           pdf.setFontSize(11);
           pdf.text(`Customer: ${self.client.name}`, 40, 65);
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

      //------------------------------------- Quotations PDF -------------------------\\
    Quotation_PDF() {
        var self = this;
        let pdf = new jsPDF("l", "pt");

        const fontPath = "/fonts/Vazirmatn-Bold.ttf";
        pdf.addFont(fontPath, "VazirmatnBold", "bold"); 
        pdf.setFont("VazirmatnBold"); 

      let columns = [
        { title: "Sr.No", dataKey: "sr_no" },
        { title: self.$t("date"), dataKey: "date" },
        { title: self.$t("Reference"), dataKey: "Ref" },
        { title: self.$t("warehouse"), dataKey: "warehouse_name" },
        { title: self.$t("Status"), dataKey: "statut" },
        { title: self.$t("Total"), dataKey: "GrandTotal" }
      ];

      let formatted_data = self.quotations.map((item, index) => {
        return {
          sr_no: index + 1,
          date: item.date,
          Ref: item.Ref,
          warehouse_name: item.warehouse_name,
          statut: item.statut,
          GrandTotal: self.formatNumber(item.GrandTotal, 2),
        };
      });

      pdf.autoTable({
             columns: columns,
             body: formatted_data,
             startY: 80,
             theme: "grid", 
             styles: {
               font: "VazirmatnBold", 
               fontSize: 9,
               halign: "center",
             },
             columnStyles: {
                GrandTotal: { halign: 'right' },
             },
             didDrawPage: (data) => {
               pdf.setFont("VazirmatnBold");
               pdf.setFontSize(16);
               pdf.text("|| Swami Shreeji ||", pdf.internal.pageSize.width / 2, 25, { align: 'center' });
               pdf.setFontSize(14);
               pdf.text("Customer Quotation List", pdf.internal.pageSize.width / 2, 45, { align: 'center' });
               pdf.setFontSize(11);
               pdf.text(`Customer: ${self.client.name}`, 40, 65);
             },
             headStyles: {
               fillColor: [242, 242, 242], 
               textColor: [0, 0, 0], 
               fontStyle: "bold", 
               lineWidth: 0.5,
               lineColor: [0, 0, 0],
             },
      });

      pdf.save("Quotation_List.pdf");
    },

     //----------------------------------------- Sales Return PDF -----------------------\\
    Sale_Return_PDF() {
      var self = this;
      let pdf = new jsPDF("l", "pt");

      const fontPath = "/fonts/Vazirmatn-Bold.ttf";
      pdf.addFont(fontPath, "VazirmatnBold", "bold"); 
      pdf.setFont("VazirmatnBold"); 

      let columns = [
        { title: "Sr.No", dataKey: "sr_no" },
        { title: self.$t("Reference"), dataKey: "Ref" },
        { title: self.$t("date"), dataKey: "date" },
        { title: self.$t("Sale"), dataKey: "sale_ref" },
        { title: self.$t("warehouse"), dataKey: "warehouse_name" },
        { title: self.$t("Total"), dataKey: "GrandTotal" },
        { title: self.$t("Paid"), dataKey: "paid_amount" },
        { title: self.$t("Due"), dataKey: "due" },
        { title: self.$t("Status"), dataKey: "statut" },
        { title: self.$t("PaymentStatus"), dataKey: "payment_status" }
      ];

      let formatted_data = self.returns_customer.map((item, index) => {
        return {
          sr_no: index + 1,
          Ref: item.Ref,
          date: item.date,
          sale_ref: item.sale_ref || "-",
          warehouse_name: item.warehouse_name,
          GrandTotal: self.formatNumber(item.GrandTotal, 2),
          paid_amount: self.formatNumber(item.paid_amount, 2),
          due: self.formatNumber(item.due, 2),
          statut: item.statut,
          payment_status: item.payment_status,
        };
      });

      pdf.autoTable({
             columns: columns,
             body: formatted_data,
             startY: 80,
             theme: "grid", 
             styles: {
               font: "VazirmatnBold", 
               fontSize: 9,
               halign: "center",
             },
             columnStyles: {
                GrandTotal: { halign: 'right' },
                paid_amount: { halign: 'right' },
                due: { halign: 'right' },
             },
             didDrawPage: (data) => {
               pdf.setFont("VazirmatnBold");
               pdf.setFontSize(16);
               pdf.text("|| Swami Shreeji ||", pdf.internal.pageSize.width / 2, 25, { align: 'center' });
               pdf.setFontSize(14);
               pdf.text("Customer Sales Return List", pdf.internal.pageSize.width / 2, 45, { align: 'center' });
               pdf.setFontSize(11);
               pdf.text(`Customer: ${self.client.name}`, 40, 65);
             },
             headStyles: {
               fillColor: [242, 242, 242], 
               textColor: [0, 0, 0], 
               fontStyle: "bold", 
               lineWidth: 0.5,
               lineColor: [0, 0, 0],
             },
      });

      pdf.save("Sales Return.pdf");
    },

       //----------------------------------- Sales PDF ------------------------------\\
    Payments_PDF() {
      var self = this;
      let pdf = new jsPDF("l", "pt");

      const fontPath = "/fonts/Vazirmatn-Bold.ttf";
      pdf.addFont(fontPath, "VazirmatnBold", "bold"); 
      pdf.setFont("VazirmatnBold");

      let columns = [
        { title: "Sr.No", dataKey: "sr_no" },
        { title: self.$t("date"), dataKey: "date" },
        { title: self.$t("Reference"), dataKey: "Ref" },
        { title: "Type", dataKey: "type" },
        { title: self.$t("Sale"), dataKey: "Sale_Ref" },
        { title: self.$t("ModePaiement"), dataKey: "payment_method" },
        { title: "Note", dataKey: "notes" },
        { title: self.$t("Amount"), dataKey: "montant" },
      ];

      let formatted_payments = self.payments.map((payment, index) => {
        return {
          sr_no: index + 1,
          date: payment.date,
          Ref: payment.Ref,
          type: payment.type,
          Sale_Ref: payment.Sale_Ref || "-",
          payment_method: payment.payment_method,
          notes: payment.notes || "",
          montant: self.formatNumber(payment.montant, 2),
        };
      });

      let totalAmount = self.payments.reduce((sum, p) => sum + parseFloat(p.montant || 0), 0);

      let footer = [{
        sr_no: '',
        date: '',
        Ref: '',
        type: '',
        Sale_Ref: '',
        payment_method: '',
        notes: 'Total Received .....',
        montant: totalAmount.toFixed(2),
      }];

      pdf.autoTable({
             columns: columns,
             body: formatted_payments,
             foot: footer,
             startY: 80,
             theme: "grid", 
             styles: {
               font: "VazirmatnBold", 
               fontSize: 9,
               halign: "center",
             },
             columnStyles: {
                notes: { halign: 'left', cellWidth: 150 },
                montant: { halign: 'right' },
             },
             didDrawPage: (data) => {
               pdf.setFont("VazirmatnBold");
               pdf.setFontSize(16);
               pdf.text("|| Swami Shreeji ||", pdf.internal.pageSize.width / 2, 25, { align: 'center' });
               pdf.setFontSize(14);
               pdf.text("Customer Payments Report", pdf.internal.pageSize.width / 2, 45, { align: 'center' });
               pdf.setFontSize(11);
               pdf.text(`Customer: ${self.client.name}`, 40, 65);
               
               // Page number
               pdf.setFontSize(9);
               pdf.text(`Page: ${pdf.internal.getNumberOfPages()}`, pdf.internal.pageSize.width - 60, 65);
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

      pdf.save("Payments_List.pdf");
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

    //------------------------------ Show Reports -------------------------\\
    Get_Reports() {
      let id = this.$route.params.id;
      axios
        .get(`report/client/${id}`)
        .then(response => {
          this.client = response.data.report;
        })
        .catch(response => {});
    },

    //--------------------------- Event Page Change -------------\\
    PageChangeSales({ currentPage }) {
      if (this.sales_page !== currentPage) {
        this.Get_Sales(currentPage);
      }
    },

    //--------------------------- Limit Page Sales -------------\\
    onPerPageChangeSales({ currentPerPage }) {
      if (this.limit_sales !== currentPerPage) {
        this.limit_sales = currentPerPage;
        this.Get_Sales(1);
      }
    },

    onSearch_sales(value) {
      this.search_sales = value.searchTerm;
      this.Get_Sales(1);
    },

    //--------------------------- Get sales By Customer -------------\\
    Get_Sales(page) {
      axios
        .get(
          "/report/client_sales?page=" +
            page +
            "&limit=" +
            this.limit_sales +
            "&search=" +
            this.search_sales +
            "&id=" +
            this.$route.params.id
        )
        .then(response => {
          this.sales = response.data.sales.map(sale => {
            return {
              ...sale,
              tax_amount: parseFloat(sale.cgst_amount || 0) + parseFloat(sale.sgst_amount || 0) + parseFloat(sale.igst_amount || 0)
            };
          });
          this.totalRows_sales = response.data.totalRows;
        })
        .catch(response => {});
    },

    //--------------------------- Event Page Change -------------\\
    PageChangePayments({ currentPage }) {
      if (this.Payment_sale_page !== currentPage) {
        this.Get_Payments(currentPage);
      }
    },

    //--------------------------- Limit Page Payments -------------\\
    onPerPageChangePayments({ currentPerPage }) {
      if (this.limit_payments !== currentPerPage) {
        this.limit_payments = currentPerPage;
        this.Get_Payments(1);
      }
    },

     onSearch_payments(value) {
      this.search_payments = value.searchTerm;
      this.Get_Payments(1);
    },

    //--------------------------- Get Payments By Customer -------------\\
    Get_Payments(page) {
      axios
        .get(
          "report/client_payments?page=" +
            page +
            "&limit=" +
            this.limit_payments +
            "&search=" +
            this.search_payments +
            "&id=" +
            this.$route.params.id
        )
        .then(response => {
          this.payments = response.data.payments;
          this.totalRows_payments = response.data.totalRows;
        })
        .catch(response => {});
    },

    //--------------------------- Event Page Change -------------\\
    PageChangeQuotation({ currentPage }) {
      if (this.quotations_page !== currentPage) {
        this.Get_Quotations(currentPage);
      }
    },

    //--------------------------- Limit Page Quotations -------------\\
    onPerPageChangeQuotation({ currentPerPage }) {
      if (this.limit_quotations !== currentPerPage) {
        this.limit_quotations = currentPerPage;
        this.Get_Quotations(1);
      }
    },

     onSearch_quotations(value) {
      this.search_quotations = value.searchTerm;
      this.Get_Quotations(1);
    },

    //--------------------------- Get Quotations By Customer -------------\\
    Get_Quotations(page) {
      axios
        .get(
          "report/client_quotations?page=" +
            page +
            "&limit=" +
            this.limit_quotations +
            "&search=" +
            this.search_quotations +
            "&id=" +
            this.$route.params.id
        )
        .then(response => {
          this.quotations = response.data.quotations;
          this.totalRows_quotations = response.data.totalRows;
          this.isLoading = false;
        })
        .catch(response => {
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        });
    },

    //--------------------------- Event Page Change -------------\\
    PageChangeReturn({ currentPage }) {
      if (this.Return_sale_page !== currentPage) {
        this.Get_Returns(currentPage);
      }
    },

    //--------------------------- Limit Page Returns -------------\\
    onPerPageChangeReturn({ currentPerPage }) {
      if (this.limit_returns !== currentPerPage) {
        this.limit_returns = currentPerPage;
        this.Get_Returns(1);
      }
    },

     onSearch_return_sales(value) {
      this.search_return_sales = value.searchTerm;
      this.Get_Returns(1);
    },

    //--------------------------- Get Returns By Customer -------------\\
    Get_Returns(page) {
      axios
        .get(
          "/report/client_returns?page=" +
            page +
            "&limit=" +
            this.limit_returns +
            "&search=" +
            this.search_return_sales +
            "&id=" +
            this.$route.params.id
        )
        .then(response => {
          this.returns_customer = response.data.returns_customer;
          this.totalRows_returns = response.data.totalRows;
        })
        .catch(response => {});
    },

    Get_Ledger() {
      axios
        .get(`report/customer_ledger/${this.$route.params.id}`)
        .then(response => {
          this.ledger = response.data.ledger;
          this.opening_balance = response.data.opening_balance;
          this.opening_balance_type = response.data.opening_balance_type;
          this.closing_balance = response.data.closing_balance;
          this.closing_balance_type = response.data.closing_balance_type;
          this.period = response.data.period;
          this.ledger_data_loaded = true;
        })
        .catch(response => {});
    },

    Ledger_PDF() {
       window.open(`/api/report/customer_ledger_pdf/${this.$route.params.id}?token=${localStorage.getItem('token')}`, '_blank');
    }
  }, //end Methods

  //----------------------------- Created function------------------- \\

  created: function() {
    this.Get_Reports();
    this.Get_Sales(1);
    this.Get_Payments(1);
    this.Get_Quotations(1);
    this.Get_Returns(1);
    this.Get_Ledger();
  }
};
</script>