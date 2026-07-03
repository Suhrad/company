"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["companies_report"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/reports/companies_report.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/reports/companies_report.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nprogress */ "./node_modules/nprogress/nprogress.js");
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nprogress__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
  metaInfo: {
    title: "Report Companies"
  },
  data: function data() {
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
        children: []
      }]
    };
  },
  computed: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_1__.mapGetters)(["currentUser"])), {}, {
    columns: function columns() {
      return [{
        label: this.$t("Name"),
        field: "name",
        tdClass: "text-left",
        thClass: "text-left"
      }, {
        label: this.$t("Type"),
        field: "type",
        tdClass: "text-left",
        thClass: "text-left",
        sortable: true
      }, {
        label: this.$t("Phone"),
        field: "phone",
        tdClass: "text-left",
        thClass: "text-left"
      }, {
        label: this.$t("TotalTransactions"),
        field: "total_transactions",
        tdClass: "text-left",
        thClass: "text-left",
        sortable: false
      }, {
        label: this.$t("Amount"),
        field: "total_amount",
        type: "decimal",
        headerField: this.sumCount,
        tdClass: "text-left",
        thClass: "text-left",
        sortable: false
      }, {
        label: this.$t("Paid"),
        field: "total_paid",
        type: "decimal",
        headerField: this.sumCount2,
        tdClass: "text-left",
        thClass: "text-left",
        sortable: false
      }, {
        label: this.$t("Due"),
        field: "due",
        type: "decimal",
        headerField: this.sumCount3,
        tdClass: "text-left",
        thClass: "text-left",
        sortable: false
      }, {
        label: this.$t("Action"),
        field: "actions",
        html: true,
        tdClass: "text-right",
        thClass: "text-right",
        sortable: false
      }];
    }
  }),
  methods: {
    sumCount: function sumCount(rowObj) {
      var sum = 0;
      if (!rowObj || !rowObj.children || !Array.isArray(rowObj.children)) {
        return sum;
      }
      for (var i = 0; i < rowObj.children.length; i++) {
        if (typeof rowObj.children[i].total_amount === 'number') {
          sum += rowObj.children[i].total_amount;
        }
      }
      return sum;
    },
    sumCount2: function sumCount2(rowObj) {
      var sum = 0;
      if (!rowObj || !rowObj.children || !Array.isArray(rowObj.children)) {
        return sum;
      }
      for (var i = 0; i < rowObj.children.length; i++) {
        if (typeof rowObj.children[i].total_paid === 'number') {
          sum += rowObj.children[i].total_paid;
        }
      }
      return sum;
    },
    sumCount3: function sumCount3(rowObj) {
      var sum = 0;
      if (!rowObj || !rowObj.children || !Array.isArray(rowObj.children)) {
        return sum;
      }
      for (var i = 0; i < rowObj.children.length; i++) {
        if (typeof rowObj.children[i].due === 'number') {
          sum += rowObj.children[i].due;
        }
      }
      return sum;
    },
    //---- update Params Table
    updateParams: function updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },
    //---- Event Page Change
    onPageChange: function onPageChange(_ref) {
      var currentPage = _ref.currentPage;
      if (this.serverParams.page !== currentPage) {
        this.updateParams({
          page: currentPage
        });
        this.Get_Company_Report(currentPage);
      }
    },
    //---- Event Per Page Change
    onPerPageChange: function onPerPageChange(_ref2) {
      var currentPerPage = _ref2.currentPerPage;
      if (this.limit !== currentPerPage) {
        this.limit = currentPerPage;
        this.updateParams({
          page: 1,
          perPage: currentPerPage
        });
        this.Get_Company_Report(1);
      }
    },
    //---- Event on Sort Change
    onSortChange: function onSortChange(params) {
      this.updateParams({
        sort: {
          type: params[0].type,
          field: params[0].field
        }
      });
      this.Get_Company_Report(this.serverParams.page);
    },
    //---- Event on Search
    onSearch: function onSearch(value) {
      this.search = value.searchTerm;
      this.Get_Company_Report(this.serverParams.page);
    },
    Download_PDF: function Download_PDF(row) {
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().start();
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().set(0.1);
      var url = row.type === 'customer' || row.type === 'company' ? "report/customer_ledger_pdf/" + row.id : "report/supplier_ledger_pdf/" + row.id;
      axios.get(url, {
        responseType: "blob",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function (response) {
        var urlObj = window.URL.createObjectURL(new Blob([response.data]));
        var link = document.createElement("a");
        link.href = urlObj;
        link.setAttribute("download", "Ledger-" + row.name + ".pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(function () {
          return nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
        }, 500);
      })["catch"](function () {
        setTimeout(function () {
          return nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
        }, 500);
      });
    },
    Download_Receivables: function Download_Receivables() {
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().start();
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().set(0.1);
      axios.get("report/receivables_pdf?search=" + this.search, {
        responseType: "blob",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function (response) {
        var urlObj = window.URL.createObjectURL(new Blob([response.data]));
        var link = document.createElement("a");
        link.href = urlObj;
        link.setAttribute("download", "Receivables_Outstanding.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(function () {
          return nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
        }, 500);
      })["catch"](function () {
        setTimeout(function () {
          return nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
        }, 500);
      });
    },
    Download_Payables: function Download_Payables() {
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().start();
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().set(0.1);
      axios.get("report/payables_pdf?search=" + this.search, {
        responseType: "blob",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function (response) {
        var urlObj = window.URL.createObjectURL(new Blob([response.data]));
        var link = document.createElement("a");
        link.href = urlObj;
        link.setAttribute("download", "Payables_Outstanding.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(function () {
          return nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
        }, 500);
      })["catch"](function () {
        setTimeout(function () {
          return nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
        }, 500);
      });
    },
    //--------------------------- Get Company Report -------------\\
    Get_Company_Report: function Get_Company_Report(page) {
      var _this = this;
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().start();
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().set(0.1);
      axios.get("report/company?page=" + page + "&SortField=" + this.serverParams.sort.field + "&SortType=" + this.serverParams.sort.type + "&search=" + this.search + "&limit=" + this.limit).then(function (response) {
        _this.companies = response.data.report;
        _this.totalRows = response.data.totalRows;
        _this.rows[0].children = _this.companies;
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
        _this.isLoading = false;
      })["catch"](function (response) {
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
        setTimeout(function () {
          _this.isLoading = false;
        }, 500);
      });
    }
  },
  created: function created() {
    this.Get_Company_Report(1);
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/reports/companies_report.vue?vue&type=style&index=0&id=a3554376&scoped=true&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/reports/companies_report.vue?vue&type=style&index=0&id=a3554376&scoped=true&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.main-content[data-v-a3554376] .vgt-table, \n.main-content[data-v-a3554376] .vgt-wrap__footer, \n.main-content[data-v-a3554376] .vgt-global-search__input,\n.main-content[data-v-a3554376] .vgt-global-search {\n  font-size: 1.3rem !important;\n}\n.main-content[data-v-a3554376] .vgt-table th, \n.main-content[data-v-a3554376] .vgt-table td {\n  padding: 12px 10px !important;\n  vertical-align: middle !important;\n}\n.main-content[data-v-a3554376] .breadcrumb ul li {\n  font-size: 1.2rem !important;\n}\n.main-content[data-v-a3554376] .breadcrumb h1 {\n  font-size: 1.8rem !important;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/reports/companies_report.vue?vue&type=style&index=0&id=a3554376&scoped=true&lang=css":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/reports/companies_report.vue?vue&type=style&index=0&id=a3554376&scoped=true&lang=css ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_companies_report_vue_vue_type_style_index_0_id_a3554376_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./companies_report.vue?vue&type=style&index=0&id=a3554376&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/reports/companies_report.vue?vue&type=style&index=0&id=a3554376&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_companies_report_vue_vue_type_style_index_0_id_a3554376_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_companies_report_vue_vue_type_style_index_0_id_a3554376_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/reports/companies_report.vue":
/*!********************************************************************!*\
  !*** ./resources/src/views/app/pages/reports/companies_report.vue ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _companies_report_vue_vue_type_template_id_a3554376_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./companies_report.vue?vue&type=template&id=a3554376&scoped=true */ "./resources/src/views/app/pages/reports/companies_report.vue?vue&type=template&id=a3554376&scoped=true");
/* harmony import */ var _companies_report_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./companies_report.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/reports/companies_report.vue?vue&type=script&lang=js");
/* harmony import */ var _companies_report_vue_vue_type_style_index_0_id_a3554376_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./companies_report.vue?vue&type=style&index=0&id=a3554376&scoped=true&lang=css */ "./resources/src/views/app/pages/reports/companies_report.vue?vue&type=style&index=0&id=a3554376&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _companies_report_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _companies_report_vue_vue_type_template_id_a3554376_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _companies_report_vue_vue_type_template_id_a3554376_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "a3554376",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/reports/companies_report.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/reports/companies_report.vue?vue&type=script&lang=js":
/*!********************************************************************************************!*\
  !*** ./resources/src/views/app/pages/reports/companies_report.vue?vue&type=script&lang=js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_companies_report_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./companies_report.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/reports/companies_report.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_companies_report_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/reports/companies_report.vue?vue&type=style&index=0&id=a3554376&scoped=true&lang=css":
/*!****************************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/reports/companies_report.vue?vue&type=style&index=0&id=a3554376&scoped=true&lang=css ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_companies_report_vue_vue_type_style_index_0_id_a3554376_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./companies_report.vue?vue&type=style&index=0&id=a3554376&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/reports/companies_report.vue?vue&type=style&index=0&id=a3554376&scoped=true&lang=css");


/***/ }),

/***/ "./resources/src/views/app/pages/reports/companies_report.vue?vue&type=template&id=a3554376&scoped=true":
/*!**************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/reports/companies_report.vue?vue&type=template&id=a3554376&scoped=true ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_companies_report_vue_vue_type_template_id_a3554376_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_companies_report_vue_vue_type_template_id_a3554376_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_companies_report_vue_vue_type_template_id_a3554376_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./companies_report.vue?vue&type=template&id=a3554376&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/reports/companies_report.vue?vue&type=template&id=a3554376&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/reports/companies_report.vue?vue&type=template&id=a3554376&scoped=true":
/*!*****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/reports/companies_report.vue?vue&type=template&id=a3554376&scoped=true ***!
  \*****************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"main-content"},[_c('breadcumb',{attrs:{"page":_vm.$t('CompanyReport'),"folder":_vm.$t('Reports')}}),_vm._v(" "),(_vm.isLoading)?_c('div',{staticClass:"loading_page spinner spinner-primary mr-3"}):_vm._e(),_vm._v(" "),(!_vm.isLoading)?_c('b-card',{staticClass:"wrapper"},[_c('vue-good-table',{attrs:{"mode":"remote","columns":_vm.columns,"totalRows":_vm.totalRows,"rows":_vm.rows,"group-options":{
        enabled: true,
        headerPosition: 'bottom',
      },"search-options":{
      placeholder: _vm.$t('Search_this_table'),
      enabled: true,
    },"pagination-options":{
      enabled: true,
      mode: 'records',
      nextLabel: 'next',
      prevLabel: 'prev',
    },"styleClass":"tableOne table-hover vgt-table mt-3"},on:{"on-page-change":_vm.onPageChange,"on-per-page-change":_vm.onPerPageChange,"on-sort-change":_vm.onSortChange,"on-search":_vm.onSearch},scopedSlots:_vm._u([{key:"table-row",fn:function(props){return [(props.column.field == 'type')?_c('span',[_c('b-badge',{attrs:{"variant":props.row.type === 'company' ? 'primary' : (props.row.type === 'customer' ? 'success' : 'info')}},[_vm._v("\n            "+_vm._s(props.row.type === 'company' ? 'Company' : (props.row.type === 'customer' ? 'Customer' : 'Supplier'))+"\n          ")])],1):(props.column.field == 'actions')?_c('span',[_c('a',{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{"hover":true}}],staticClass:"cursor-pointer",attrs:{"title":"PDF"},on:{"click":function($event){return _vm.Download_PDF(props.row)}}},[_c('i',{staticClass:"i-File-Copy text-25 text-success"})]),_vm._v(" "),_c('router-link',{attrs:{"title":"Report","to":'/app/reports/detail_company/'+props.row.id+'/'+props.row.type}},[_c('i',{staticClass:"i-Eye text-25 text-info"})])],1):_vm._e()]}}],null,false,4181770286)},[_c('div',{staticClass:"mt-2 mb-3",attrs:{"slot":"table-actions"},slot:"table-actions"},[_c('b-button',{attrs:{"size":"sm","variant":"outline-success ripple m-1"},on:{"click":function($event){return _vm.Download_Receivables()}}},[_c('i',{staticClass:"i-File-Copy"}),_vm._v(" Export Receivables (PDF)\n        ")]),_vm._v(" "),_c('b-button',{attrs:{"size":"sm","variant":"outline-danger ripple m-1"},on:{"click":function($event){return _vm.Download_Payables()}}},[_c('i',{staticClass:"i-File-Copy"}),_vm._v(" Export Payables (PDF)\n        ")])],1)])],1):_vm._e()],1)}
var staticRenderFns = []
render._withStripped = true


/***/ })

}]);