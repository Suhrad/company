"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["saral_sales_import"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/SaralSalesImport.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/SaralSalesImport.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nprogress */ "./node_modules/nprogress/nprogress.js");
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nprogress__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
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
    companyOptions: function companyOptions() {
      return [{
        value: "",
        text: "Select company"
      }].concat(this.business_companies.map(function (company) {
        return {
          value: company.id,
          text: company.name
        };
      }));
    }
  },
  methods: {
    formatMoney: function formatMoney(value) {
      return Number(value || 0).toFixed(2);
    },
    loadCompanies: function loadCompanies() {
      var _this = this;
      axios.get("saral-import/companies").then(function (response) {
        _this.business_companies = response.data.companies || [];
        if (!_this.business_company_id && _this.business_companies.length) {
          _this.business_company_id = _this.business_companies[0].id;
        }
      });
    },
    loadHistory: function loadHistory() {
      var _this2 = this;
      axios.get("saral-import/history").then(function (response) {
        _this2.jobs = response.data.jobs || [];
      });
    },
    buildFormData: function buildFormData() {
      var form = new FormData();
      form.append("business_company_id", this.business_company_id);
      form.append("file", this.file);
      return form;
    },
    previewFile: function previewFile() {
      var _this3 = this;
      if (!this.business_company_id || !this.file) {
        this.message = "Choose a company and JSON file first.";
        return;
      }
      this.message = "";
      this.processing = true;
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().start();
      axios.post("saral-import/preview", this.buildFormData()).then(function (response) {
        _this3.preview = response.data;
      })["catch"](function (error) {
        var _error$response;
        _this3.message = ((_error$response = error.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.message) || "Preview failed.";
      })["finally"](function () {
        _this3.processing = false;
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
      });
    },
    runImport: function runImport() {
      var _this4 = this;
      if (!this.business_company_id || !this.file) {
        this.message = "Choose a company and JSON file first.";
        return;
      }
      this.message = "";
      this.processing = true;
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().start();
      axios.post("saral-import/import", this.buildFormData()).then(function (response) {
        _this4.message = "Imported ".concat(response.data.imported_count, " invoices, skipped ").concat(response.data.skipped_count, ", errors ").concat(response.data.error_count, ".");
        _this4.loadHistory();
      })["catch"](function (error) {
        var _error$response2;
        _this4.message = ((_error$response2 = error.response) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.data) === null || _error$response2 === void 0 ? void 0 : _error$response2.message) || "Import failed.";
      })["finally"](function () {
        _this4.processing = false;
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
      });
    }
  },
  created: function created() {
    this.loadCompanies();
    this.loadHistory();
  }
});

/***/ }),

/***/ "./resources/src/views/app/pages/sales/SaralSalesImport.vue":
/*!******************************************************************!*\
  !*** ./resources/src/views/app/pages/sales/SaralSalesImport.vue ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SaralSalesImport_vue_vue_type_template_id_083acabc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SaralSalesImport.vue?vue&type=template&id=083acabc */ "./resources/src/views/app/pages/sales/SaralSalesImport.vue?vue&type=template&id=083acabc");
/* harmony import */ var _SaralSalesImport_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SaralSalesImport.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/sales/SaralSalesImport.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SaralSalesImport_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _SaralSalesImport_vue_vue_type_template_id_083acabc__WEBPACK_IMPORTED_MODULE_0__.render,
  _SaralSalesImport_vue_vue_type_template_id_083acabc__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/sales/SaralSalesImport.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/sales/SaralSalesImport.vue?vue&type=script&lang=js":
/*!******************************************************************************************!*\
  !*** ./resources/src/views/app/pages/sales/SaralSalesImport.vue?vue&type=script&lang=js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SaralSalesImport_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SaralSalesImport.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/SaralSalesImport.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SaralSalesImport_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/sales/SaralSalesImport.vue?vue&type=template&id=083acabc":
/*!************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/sales/SaralSalesImport.vue?vue&type=template&id=083acabc ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SaralSalesImport_vue_vue_type_template_id_083acabc__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SaralSalesImport_vue_vue_type_template_id_083acabc__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SaralSalesImport_vue_vue_type_template_id_083acabc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SaralSalesImport.vue?vue&type=template&id=083acabc */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/SaralSalesImport.vue?vue&type=template&id=083acabc");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/SaralSalesImport.vue?vue&type=template&id=083acabc":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/SaralSalesImport.vue?vue&type=template&id=083acabc ***!
  \***************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"main-content"},[_c('breadcumb',{attrs:{"page":"SARAL Sales Import","folder":"Sales"}}),_vm._v(" "),_c('b-card',{staticClass:"mb-4"},[_c('b-row',[_c('b-col',{attrs:{"md":"4"}},[_c('b-form-group',{attrs:{"label":"Business Company"}},[_c('b-form-select',{attrs:{"options":_vm.companyOptions},model:{value:(_vm.business_company_id),callback:function ($$v) {_vm.business_company_id=$$v},expression:"business_company_id"}})],1)],1),_vm._v(" "),_c('b-col',{attrs:{"md":"5"}},[_c('b-form-group',{attrs:{"label":"SARAL JSON File"}},[_c('b-form-file',{attrs:{"accept":".json,.Json,application/json"},model:{value:(_vm.file),callback:function ($$v) {_vm.file=$$v},expression:"file"}})],1)],1),_vm._v(" "),_c('b-col',{staticClass:"d-flex align-items-end",attrs:{"md":"3"}},[_c('div',{staticClass:"w-100"},[_c('b-button',{staticClass:"mr-2 mb-2",attrs:{"variant":"outline-primary","block":"","disabled":_vm.processing},on:{"click":_vm.previewFile}},[_vm._v("\n            Preview Import\n          ")]),_vm._v(" "),_c('b-button',{attrs:{"variant":"primary","block":"","disabled":_vm.processing || !_vm.preview.summary},on:{"click":_vm.runImport}},[_vm._v("\n            Import Sales\n          ")])],1)])],1)],1),_vm._v(" "),(_vm.message)?_c('b-alert',{staticClass:"mb-4",attrs:{"show":"","variant":"info"}},[_vm._v(_vm._s(_vm.message))]):_vm._e(),_vm._v(" "),(_vm.preview.summary)?_c('b-card',{staticClass:"mb-4"},[_c('h5',{staticClass:"mb-3"},[_vm._v("Preview Summary")]),_vm._v(" "),_c('b-row',[_c('b-col',{attrs:{"md":"3"}},[_c('strong',[_vm._v("Invoices:")]),_vm._v(" "+_vm._s(_vm.preview.summary.invoice_count))]),_vm._v(" "),_c('b-col',{attrs:{"md":"3"}},[_c('strong',[_vm._v("Lines:")]),_vm._v(" "+_vm._s(_vm.preview.summary.line_count))]),_vm._v(" "),_c('b-col',{attrs:{"md":"3"}},[_c('strong',[_vm._v("Duplicates:")]),_vm._v(" "+_vm._s(_vm.preview.summary.duplicate_count))]),_vm._v(" "),_c('b-col',{attrs:{"md":"3"}},[_c('strong',[_vm._v("Total Value:")]),_vm._v(" "+_vm._s(_vm.formatMoney(_vm.preview.summary.invoice_value_total)))])],1),_vm._v(" "),_c('b-row',{staticClass:"mt-3"},[_c('b-col',{attrs:{"md":"6"}},[_c('strong',[_vm._v("Customer Matching")]),_vm._v(" "),_c('div',[_vm._v("Matched: "+_vm._s(_vm.preview.summary.customer_matches.matched))]),_vm._v(" "),_c('div',[_vm._v("New: "+_vm._s(_vm.preview.summary.customer_matches.new))])]),_vm._v(" "),_c('b-col',{attrs:{"md":"6"}},[_c('strong',[_vm._v("Product Matching")]),_vm._v(" "),_c('div',[_vm._v("Matched: "+_vm._s(_vm.preview.summary.product_matches.matched))]),_vm._v(" "),_c('div',[_vm._v("New: "+_vm._s(_vm.preview.summary.product_matches.new))])])],1)],1):_vm._e(),_vm._v(" "),(_vm.preview.preview_invoices && _vm.preview.preview_invoices.length)?_c('b-card',{staticClass:"mb-4"},[_c('h5',{staticClass:"mb-3"},[_vm._v("Invoice Review")]),_vm._v(" "),_c('div',{staticClass:"table-responsive"},[_c('table',{staticClass:"table table-striped table-hover"},[_c('thead',[_c('tr',[_c('th',[_vm._v("#")]),_vm._v(" "),_c('th',[_vm._v("Party")]),_vm._v(" "),_c('th',[_vm._v("Date")]),_vm._v(" "),_c('th',[_vm._v("Value")]),_vm._v(" "),_c('th',[_vm._v("Customer Match")]),_vm._v(" "),_c('th',[_vm._v("Product Summary")]),_vm._v(" "),_c('th',[_vm._v("Status")])])]),_vm._v(" "),_c('tbody',_vm._l((_vm.preview.preview_invoices),function(invoice){return _c('tr',{key:invoice.row_number},[_c('td',[_vm._v(_vm._s(invoice.row_number))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(invoice.party_name))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(invoice.invoice_date))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(_vm.formatMoney(invoice.invoice_value)))]),_vm._v(" "),_c('td',[(invoice.customer_match)?_c('span',[_vm._v("\n                "+_vm._s(invoice.customer_match.name)+"\n                "),_c('small',{staticClass:"d-block text-muted"},[_vm._v(_vm._s(invoice.customer_match.gstin))])]):_c('span',{staticClass:"text-warning"},[_vm._v("New customer")])]),_vm._v(" "),_c('td',[_vm._v("\n              Matched: "+_vm._s(invoice.product_match_summary.matched)),_c('br'),_vm._v("\n              New: "+_vm._s(invoice.product_match_summary.new)+"\n            ")]),_vm._v(" "),_c('td',[(invoice.duplicate)?_c('span',{staticClass:"badge badge-outline-warning"},[_vm._v("Duplicate")]):_c('span',{staticClass:"badge badge-outline-success"},[_vm._v("Ready")])])])}),0)])])]):_vm._e(),_vm._v(" "),_c('b-card',[_c('h5',{staticClass:"mb-3"},[_vm._v("Import History")]),_vm._v(" "),_c('div',{staticClass:"table-responsive"},[_c('table',{staticClass:"table table-striped table-hover"},[_c('thead',[_c('tr',[_c('th',[_vm._v("ID")]),_vm._v(" "),_c('th',[_vm._v("Company")]),_vm._v(" "),_c('th',[_vm._v("File")]),_vm._v(" "),_c('th',[_vm._v("Status")]),_vm._v(" "),_c('th',[_vm._v("Invoices")]),_vm._v(" "),_c('th',[_vm._v("Imported")]),_vm._v(" "),_c('th',[_vm._v("Skipped")]),_vm._v(" "),_c('th',[_vm._v("Errors")]),_vm._v(" "),_c('th',[_vm._v("Created At")])])]),_vm._v(" "),_c('tbody',_vm._l((_vm.jobs),function(job){return _c('tr',{key:job.id},[_c('td',[_vm._v(_vm._s(job.id))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(job.company_name))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(job.file_name))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(job.status))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(job.invoice_count))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(job.imported_count))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(job.skipped_count))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(job.error_count))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(job.created_at))])])}),0)])])])],1)}
var staticRenderFns = []
render._withStripped = true


/***/ })

}]);