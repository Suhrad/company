"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["Business_Companies"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/people/BusinessCompanies.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/people/BusinessCompanies.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      companies: [],
      form: this.defaultForm()
    };
  },
  methods: {
    defaultForm: function defaultForm() {
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
    loadCompanies: function loadCompanies() {
      var _this = this;
      axios.get("business-companies").then(function (response) {
        _this.companies = response.data.companies || [];
      });
    },
    saveCompany: function saveCompany() {
      var _this2 = this;
      axios.post("business-companies", this.form).then(function () {
        _this2.form = _this2.defaultForm();
        _this2.loadCompanies();
      });
    }
  },
  created: function created() {
    this.loadCompanies();
  }
});

/***/ }),

/***/ "./resources/src/views/app/pages/people/BusinessCompanies.vue":
/*!********************************************************************!*\
  !*** ./resources/src/views/app/pages/people/BusinessCompanies.vue ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BusinessCompanies_vue_vue_type_template_id_23e23cb8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BusinessCompanies.vue?vue&type=template&id=23e23cb8 */ "./resources/src/views/app/pages/people/BusinessCompanies.vue?vue&type=template&id=23e23cb8");
/* harmony import */ var _BusinessCompanies_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BusinessCompanies.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/people/BusinessCompanies.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _BusinessCompanies_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _BusinessCompanies_vue_vue_type_template_id_23e23cb8__WEBPACK_IMPORTED_MODULE_0__.render,
  _BusinessCompanies_vue_vue_type_template_id_23e23cb8__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/people/BusinessCompanies.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/people/BusinessCompanies.vue?vue&type=script&lang=js":
/*!********************************************************************************************!*\
  !*** ./resources/src/views/app/pages/people/BusinessCompanies.vue?vue&type=script&lang=js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BusinessCompanies_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BusinessCompanies.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/people/BusinessCompanies.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BusinessCompanies_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/people/BusinessCompanies.vue?vue&type=template&id=23e23cb8":
/*!**************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/people/BusinessCompanies.vue?vue&type=template&id=23e23cb8 ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BusinessCompanies_vue_vue_type_template_id_23e23cb8__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BusinessCompanies_vue_vue_type_template_id_23e23cb8__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BusinessCompanies_vue_vue_type_template_id_23e23cb8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BusinessCompanies.vue?vue&type=template&id=23e23cb8 */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/people/BusinessCompanies.vue?vue&type=template&id=23e23cb8");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/people/BusinessCompanies.vue?vue&type=template&id=23e23cb8":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/people/BusinessCompanies.vue?vue&type=template&id=23e23cb8 ***!
  \*****************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"main-content"},[_c('breadcumb',{attrs:{"page":"Business Companies","folder":"People"}}),_vm._v(" "),_c('b-card',{staticClass:"mb-4"},[_c('b-form',{on:{"submit":function($event){$event.preventDefault();return _vm.saveCompany.apply(null, arguments)}}},[_c('b-row',[_c('b-col',{attrs:{"md":"4"}},[_c('b-form-group',{attrs:{"label":"Name"}},[_c('b-form-input',{attrs:{"required":""},model:{value:(_vm.form.name),callback:function ($$v) {_vm.$set(_vm.form, "name", $$v)},expression:"form.name"}})],1)],1),_vm._v(" "),_c('b-col',{attrs:{"md":"4"}},[_c('b-form-group',{attrs:{"label":"Code"}},[_c('b-form-input',{model:{value:(_vm.form.code),callback:function ($$v) {_vm.$set(_vm.form, "code", $$v)},expression:"form.code"}})],1)],1),_vm._v(" "),_c('b-col',{attrs:{"md":"4"}},[_c('b-form-group',{attrs:{"label":"Legal Name"}},[_c('b-form-input',{model:{value:(_vm.form.legal_name),callback:function ($$v) {_vm.$set(_vm.form, "legal_name", $$v)},expression:"form.legal_name"}})],1)],1),_vm._v(" "),_c('b-col',{attrs:{"md":"4"}},[_c('b-form-group',{attrs:{"label":"GSTIN"}},[_c('b-form-input',{model:{value:(_vm.form.gstin),callback:function ($$v) {_vm.$set(_vm.form, "gstin", $$v)},expression:"form.gstin"}})],1)],1),_vm._v(" "),_c('b-col',{attrs:{"md":"4"}},[_c('b-form-group',{attrs:{"label":"PAN"}},[_c('b-form-input',{model:{value:(_vm.form.pan),callback:function ($$v) {_vm.$set(_vm.form, "pan", $$v)},expression:"form.pan"}})],1)],1),_vm._v(" "),_c('b-col',{attrs:{"md":"4"}},[_c('b-form-group',{attrs:{"label":"Contact Person"}},[_c('b-form-input',{model:{value:(_vm.form.contact_person),callback:function ($$v) {_vm.$set(_vm.form, "contact_person", $$v)},expression:"form.contact_person"}})],1)],1),_vm._v(" "),_c('b-col',{attrs:{"md":"4"}},[_c('b-form-group',{attrs:{"label":"Phone"}},[_c('b-form-input',{model:{value:(_vm.form.phone),callback:function ($$v) {_vm.$set(_vm.form, "phone", $$v)},expression:"form.phone"}})],1)],1),_vm._v(" "),_c('b-col',{attrs:{"md":"4"}},[_c('b-form-group',{attrs:{"label":"Email"}},[_c('b-form-input',{model:{value:(_vm.form.email),callback:function ($$v) {_vm.$set(_vm.form, "email", $$v)},expression:"form.email"}})],1)],1),_vm._v(" "),_c('b-col',{attrs:{"md":"4"}},[_c('b-form-group',{attrs:{"label":"State"}},[_c('b-form-input',{model:{value:(_vm.form.state),callback:function ($$v) {_vm.$set(_vm.form, "state", $$v)},expression:"form.state"}})],1)],1),_vm._v(" "),_c('b-col',{attrs:{"md":"4"}},[_c('b-form-group',{attrs:{"label":"City"}},[_c('b-form-input',{model:{value:(_vm.form.city),callback:function ($$v) {_vm.$set(_vm.form, "city", $$v)},expression:"form.city"}})],1)],1),_vm._v(" "),_c('b-col',{attrs:{"md":"4"}},[_c('b-form-group',{attrs:{"label":"PIN Code"}},[_c('b-form-input',{model:{value:(_vm.form.pin_code),callback:function ($$v) {_vm.$set(_vm.form, "pin_code", $$v)},expression:"form.pin_code"}})],1)],1),_vm._v(" "),_c('b-col',{attrs:{"md":"4"}},[_c('b-form-group',{attrs:{"label":"Country"}},[_c('b-form-input',{model:{value:(_vm.form.country),callback:function ($$v) {_vm.$set(_vm.form, "country", $$v)},expression:"form.country"}})],1)],1),_vm._v(" "),_c('b-col',{attrs:{"md":"12"}},[_c('b-form-group',{attrs:{"label":"Address"}},[_c('b-form-textarea',{attrs:{"rows":"3"},model:{value:(_vm.form.address),callback:function ($$v) {_vm.$set(_vm.form, "address", $$v)},expression:"form.address"}})],1)],1),_vm._v(" "),_c('b-col',{attrs:{"md":"12"}},[_c('b-button',{attrs:{"type":"submit","variant":"primary"}},[_vm._v("Add Company")])],1)],1)],1)],1),_vm._v(" "),_c('b-card',[_c('div',{staticClass:"table-responsive"},[_c('table',{staticClass:"table table-striped table-hover"},[_c('thead',[_c('tr',[_c('th',[_vm._v("Name")]),_vm._v(" "),_c('th',[_vm._v("Code")]),_vm._v(" "),_c('th',[_vm._v("GSTIN")]),_vm._v(" "),_c('th',[_vm._v("PAN")]),_vm._v(" "),_c('th',[_vm._v("State")]),_vm._v(" "),_c('th',[_vm._v("Phone")])])]),_vm._v(" "),_c('tbody',_vm._l((_vm.companies),function(company){return _c('tr',{key:company.id},[_c('td',[_vm._v(_vm._s(company.name))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(company.code))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(company.gstin))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(company.pan))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(company.state))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(company.phone))])])}),0)])])])],1)}
var staticRenderFns = []
render._withStripped = true


/***/ })

}]);