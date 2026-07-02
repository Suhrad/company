"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["detail_job_work"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/job_work/detail_job_work.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/job_work/detail_job_work.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************************************************************/
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
//
//
//


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      isLoading: true,
      order: {}
    };
  },
  methods: {
    fetchOrder: function fetchOrder() {
      var _this = this;
      var id = this.$route.params.id;
      axios.get("job_work/".concat(id)).then(function (response) {
        _this.order = response.data;
        _this.isLoading = false;
      });
    },
    editOrder: function editOrder() {
      this.$router.push({
        name: 'edit_job_work',
        params: {
          id: this.order.id
        }
      });
    },
    recordReceipt: function recordReceipt() {
      this.$router.push({
        path: '/app/job_work/receipt',
        query: {
          order_id: this.order.id
        }
      });
    },
    downloadPdf: function downloadPdf() {
      var _this2 = this;
      axios.get("job_work/pdf/".concat(this.order.id), {
        responseType: 'blob'
      }).then(function (response) {
        var url = window.URL.createObjectURL(new Blob([response.data]));
        var link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', "JobWork_".concat(_this2.order.Ref, ".pdf"));
        document.body.appendChild(link);
        link.click();
      });
    },
    deleteOrder: function deleteOrder() {
      var _this3 = this;
      this.$bvModal.msgBoxConfirm("Delete this batch?", {
        title: 'Confirm',
        okVariant: 'danger',
        okTitle: 'DELETE',
        centered: true
      }).then(function (value) {
        if (value) {
          axios["delete"]("job_work/".concat(_this3.order.id)).then(function () {
            _this3.$router.push("/app/job_work/list");
          });
        }
      });
    },
    editReceipt: function editReceipt(id) {
      this.$router.push({
        name: 'edit_job_work_receipt',
        params: {
          id: id
        }
      });
    },
    deleteReceipt: function deleteReceipt(id) {
      var _this4 = this;
      this.$bvModal.msgBoxConfirm("Delete receipt?", {
        okVariant: 'danger',
        centered: true
      }).then(function (v) {
        if (v) axios["delete"]("job_work/receipt/".concat(id)).then(function () {
          return _this4.fetchOrder();
        });
      });
    },
    getStatusVariant: function getStatusVariant(status) {
      switch (status) {
        case "completed":
          return "success";
        case "partial":
          return "warning";
        default:
          return "primary";
      }
    }
  },
  created: function created() {
    this.fetchOrder();
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/job_work/detail_job_work.vue?vue&type=style&index=0&id=cfc627bc&scoped=true&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/job_work/detail_job_work.vue?vue&type=style&index=0&id=cfc627bc&scoped=true&lang=css ***!
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.main-content[data-v-cfc627bc] h4 { font-size: 2.2rem !important;\n}\n.main-content[data-v-cfc627bc] h5 { font-size: 1.6rem !important;\n}\n.main-content[data-v-cfc627bc] div, .main-content[data-v-cfc627bc] p, .main-content[data-v-cfc627bc] span:not(.ul-btn__icon) { font-size: 1.35rem !important;\n}\n.main-content[data-v-cfc627bc] .table { font-size: 1.35rem !important;\n}\n.main-content[data-v-cfc627bc] .table th, .main-content[data-v-cfc627bc] .table td { padding: 15px 12px !important; vertical-align: middle !important;\n}\n.main-content[data-v-cfc627bc] .badge { font-size: 1.1rem !important; padding: 8px 14px !important;\n}\n.main-content[data-v-cfc627bc] .breadcrumb h1 { font-size: 1.8rem !important;\n}\n.bg-gray-300[data-v-cfc627bc] { background-color: #f1f5f9 !important;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/job_work/detail_job_work.vue?vue&type=style&index=0&id=cfc627bc&scoped=true&lang=css":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/job_work/detail_job_work.vue?vue&type=style&index=0&id=cfc627bc&scoped=true&lang=css ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_job_work_vue_vue_type_style_index_0_id_cfc627bc_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./detail_job_work.vue?vue&type=style&index=0&id=cfc627bc&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/job_work/detail_job_work.vue?vue&type=style&index=0&id=cfc627bc&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_job_work_vue_vue_type_style_index_0_id_cfc627bc_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_job_work_vue_vue_type_style_index_0_id_cfc627bc_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/job_work/detail_job_work.vue":
/*!********************************************************************!*\
  !*** ./resources/src/views/app/pages/job_work/detail_job_work.vue ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _detail_job_work_vue_vue_type_template_id_cfc627bc_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./detail_job_work.vue?vue&type=template&id=cfc627bc&scoped=true */ "./resources/src/views/app/pages/job_work/detail_job_work.vue?vue&type=template&id=cfc627bc&scoped=true");
/* harmony import */ var _detail_job_work_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./detail_job_work.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/job_work/detail_job_work.vue?vue&type=script&lang=js");
/* harmony import */ var _detail_job_work_vue_vue_type_style_index_0_id_cfc627bc_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detail_job_work.vue?vue&type=style&index=0&id=cfc627bc&scoped=true&lang=css */ "./resources/src/views/app/pages/job_work/detail_job_work.vue?vue&type=style&index=0&id=cfc627bc&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _detail_job_work_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _detail_job_work_vue_vue_type_template_id_cfc627bc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _detail_job_work_vue_vue_type_template_id_cfc627bc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "cfc627bc",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/job_work/detail_job_work.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/job_work/detail_job_work.vue?vue&type=script&lang=js":
/*!********************************************************************************************!*\
  !*** ./resources/src/views/app/pages/job_work/detail_job_work.vue?vue&type=script&lang=js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_job_work_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./detail_job_work.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/job_work/detail_job_work.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_job_work_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/job_work/detail_job_work.vue?vue&type=style&index=0&id=cfc627bc&scoped=true&lang=css":
/*!****************************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/job_work/detail_job_work.vue?vue&type=style&index=0&id=cfc627bc&scoped=true&lang=css ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_job_work_vue_vue_type_style_index_0_id_cfc627bc_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./detail_job_work.vue?vue&type=style&index=0&id=cfc627bc&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/job_work/detail_job_work.vue?vue&type=style&index=0&id=cfc627bc&scoped=true&lang=css");


/***/ }),

/***/ "./resources/src/views/app/pages/job_work/detail_job_work.vue?vue&type=template&id=cfc627bc&scoped=true":
/*!**************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/job_work/detail_job_work.vue?vue&type=template&id=cfc627bc&scoped=true ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_job_work_vue_vue_type_template_id_cfc627bc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_job_work_vue_vue_type_template_id_cfc627bc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_job_work_vue_vue_type_template_id_cfc627bc_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./detail_job_work.vue?vue&type=template&id=cfc627bc&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/job_work/detail_job_work.vue?vue&type=template&id=cfc627bc&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/job_work/detail_job_work.vue?vue&type=template&id=cfc627bc&scoped=true":
/*!*****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/job_work/detail_job_work.vue?vue&type=template&id=cfc627bc&scoped=true ***!
  \*****************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"main-content"},[_c('breadcumb',{attrs:{"page":'Job Work Detail',"folder":'Inventory'}}),_vm._v(" "),(_vm.isLoading)?_c('div',{staticClass:"loading_page spinner spinner-primary mr-3"}):_vm._e(),_vm._v(" "),(!_vm.isLoading)?_c('b-card',{staticClass:"border-0 shadow-sm"},[_c('b-row',{staticClass:"mb-5"},[_c('b-col',{staticClass:"d-flex align-items-center",attrs:{"md":"12"}},[_c('b-button',{staticClass:"btn-icon ripple mr-2 py-2 px-3",attrs:{"variant":"success","size":"sm"},on:{"click":_vm.editOrder}},[_c('i',{staticClass:"i-Edit mr-1"}),_vm._v(" Edit Order\n        ")]),_vm._v(" "),_c('b-button',{staticClass:"btn-icon ripple mr-2 py-2 px-3",attrs:{"variant":"primary","size":"sm"},on:{"click":_vm.downloadPdf}},[_c('i',{staticClass:"i-File-TXT mr-1"}),_vm._v(" PDF\n        ")]),_vm._v(" "),_c('b-button',{staticClass:"btn-icon ripple mr-2 py-2 px-3",attrs:{"variant":"info","size":"sm"},on:{"click":_vm.recordReceipt}},[_c('i',{staticClass:"i-Add mr-1"}),_vm._v(" Record Receipt\n        ")]),_vm._v(" "),_c('b-button',{staticClass:"btn-icon ripple py-2 px-3",attrs:{"variant":"danger","size":"sm"},on:{"click":_vm.deleteOrder}},[_c('i',{staticClass:"i-Close-Window mr-1"}),_vm._v(" Delete\n        ")])],1)],1),_vm._v(" "),_c('div',{staticClass:"invoice",attrs:{"id":"print_Invoice"}},[_c('div',{staticClass:"invoice-print"},[_c('b-row',{staticClass:"justify-content-md-center mb-4"},[_c('h4',{staticClass:"font-weight-bold"},[_vm._v("Job Work Detail : "+_vm._s(_vm.order.Ref))])]),_vm._v(" "),_c('hr'),_vm._v(" "),_c('b-row',{staticClass:"mt-5"},[_c('b-col',{staticClass:"mb-4",attrs:{"lg":"4","md":"4","sm":"12"}},[_c('h5',{staticClass:"font-weight-bold text-muted mb-3"},[_vm._v("Worker Information")]),_vm._v(" "),_c('div',{staticClass:"h5"},[_c('strong',[_vm._v("Name:")]),_vm._v(" "+_vm._s(_vm.order.worker_warehouse ? _vm.order.worker_warehouse.name : 'N/A'))]),_vm._v(" "),_c('div',{staticClass:"h5"},[_c('strong',[_vm._v("Warehouse:")]),_vm._v(" "+_vm._s(_vm.order.from_warehouse ? _vm.order.from_warehouse.name : 'N/A'))])]),_vm._v(" "),_c('b-col',{staticClass:"mb-4",attrs:{"lg":"4","md":"4","sm":"12"}},[_c('h5',{staticClass:"font-weight-bold text-muted mb-3"},[_vm._v("Order Information")]),_vm._v(" "),_c('div',{staticClass:"h5"},[_vm._v("Reference : "+_vm._s(_vm.order.Ref))]),_vm._v(" "),_c('div',{staticClass:"h5"},[_vm._v("Date : "+_vm._s(_vm.order.date))])]),_vm._v(" "),_c('b-col',{staticClass:"mb-4",attrs:{"lg":"4","md":"4","sm":"12"}},[_c('h5',{staticClass:"font-weight-bold text-muted mb-3"},[_vm._v("Status Detail")]),_vm._v(" "),_c('div',[_c('b-badge',{staticClass:"badge-outline text-uppercase px-3 py-2",staticStyle:{"font-size":"1.1rem !important"},attrs:{"variant":_vm.getStatusVariant(_vm.order.statut)}},[_vm._v("\n                "+_vm._s(_vm.order.statut)+"\n              ")])],1)])],1),_vm._v(" "),_c('b-row',{staticClass:"mt-5"},[_c('b-col',{attrs:{"md":"12"}},[_c('h5',{staticClass:"font-weight-bold mb-3"},[_vm._v("Material Issue (Raw Materials)")]),_vm._v(" "),_c('div',{staticClass:"table-responsive"},[_c('table',{staticClass:"table table-hover table-md"},[_c('thead',{staticClass:"bg-gray-300"},[_c('tr',[_c('th',{attrs:{"scope":"col"}},[_vm._v("Product Name")]),_vm._v(" "),_c('th',{staticClass:"text-center",attrs:{"scope":"col"}},[_vm._v("Issued Qty")]),_vm._v(" "),_c('th',{staticClass:"text-center",attrs:{"scope":"col"}},[_vm._v("Consumed Qty")]),_vm._v(" "),_c('th',{staticClass:"text-right",attrs:{"scope":"col"}},[_vm._v("Balance Qty")])])]),_vm._v(" "),_c('tbody',_vm._l((_vm.order.details),function(detail){return _c('tr',{key:detail.id},[_c('td',{staticClass:"font-weight-bold text-dark"},[_vm._v(_vm._s(detail.product.name))]),_vm._v(" "),_c('td',{staticClass:"text-center"},[_vm._v(_vm._s(detail.quantity))]),_vm._v(" "),_c('td',{staticClass:"text-center"},[_vm._v(_vm._s(detail.quantity_consumed))]),_vm._v(" "),_c('td',{staticClass:"text-right text-danger font-weight-bold"},[_vm._v(_vm._s((detail.quantity - detail.quantity_consumed).toFixed(2)))])])}),0)])])])],1),_vm._v(" "),(_vm.order.receipts && _vm.order.receipts.length > 0)?_c('b-row',{staticClass:"mt-5"},[_c('b-col',{attrs:{"md":"12"}},[_c('h5',{staticClass:"font-weight-bold mb-3"},[_vm._v("Finished Goods Receipts (Job Work In)")]),_vm._v(" "),_c('div',{staticClass:"table-responsive"},[_c('table',{staticClass:"table table-hover table-md"},[_c('thead',{staticClass:"bg-gray-300"},[_c('tr',[_c('th',{attrs:{"scope":"col"}},[_vm._v("Receipt Ref")]),_vm._v(" "),_c('th',{attrs:{"scope":"col"}},[_vm._v("Product")]),_vm._v(" "),_c('th',{staticClass:"text-center",attrs:{"scope":"col"}},[_vm._v("Yield Qty")]),_vm._v(" "),_c('th',{staticClass:"text-center",attrs:{"scope":"col"}},[_vm._v("Wastage")]),_vm._v(" "),_c('th',{staticClass:"text-right",staticStyle:{"width":"120px"},attrs:{"scope":"col"}},[_vm._v("Action")])])]),_vm._v(" "),_c('tbody',[_vm._l((_vm.order.receipts),function(receipt){return _vm._l((receipt.details),function(item,dIndex){return _c('tr',{key:item.id},[_c('td',{staticClass:"font-weight-bold"},[_vm._v(_vm._s(receipt.Ref)+" "),_c('br'),_vm._v(" "),_c('small',{staticClass:"text-muted"},[_vm._v(_vm._s(receipt.date))])]),_vm._v(" "),_c('td',[_vm._v(_vm._s(item.product.name))]),_vm._v(" "),_c('td',{staticClass:"text-center font-weight-bold text-success"},[_vm._v(_vm._s(item.quantity))]),_vm._v(" "),_c('td',{staticClass:"text-center text-danger"},[_vm._v(_vm._s(item.wastage))]),_vm._v(" "),_c('td',{staticClass:"text-right"},[(dIndex === 0)?_c('span',[_c('b-button',{staticClass:"btn-icon ripple mr-2",attrs:{"variant":"outline-success","size":"sm"},on:{"click":function($event){return _vm.editReceipt(receipt.id)}}},[_c('i',{staticClass:"i-Edit"})]),_vm._v(" "),_c('b-button',{staticClass:"btn-icon ripple",attrs:{"variant":"outline-danger","size":"sm"},on:{"click":function($event){return _vm.deleteReceipt(receipt.id)}}},[_c('i',{staticClass:"i-Close-Window"})])],1):_vm._e()])])})})],2)])])])],1):_vm._e(),_vm._v(" "),(_vm.order.notes)?_c('b-row',{staticClass:"mt-5 pt-4 border-top"},[_c('b-col',{attrs:{"md":"12"}},[_c('h6',{staticClass:"font-weight-bold text-muted mb-2"},[_vm._v("Manufacturing Notes:")]),_vm._v(" "),_c('p',{staticClass:"h5"},[_vm._v(_vm._s(_vm.order.notes))])])],1):_vm._e()],1)])],1):_vm._e()],1)}
var staticRenderFns = []
render._withStripped = true


/***/ })

}]);