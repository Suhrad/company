"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["edit_job_work_issue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/job_work/edit_issue.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/job_work/edit_issue.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      isSubmitting: false,
      warehouses: [],
      products: [],
      issue: {
        Ref: "",
        date: "",
        from_warehouse_id: null,
        worker_warehouse_id: null,
        notes: "",
        details: []
      }
    };
  },
  methods: {
    fetchData: function fetchData() {
      var _this = this;
      return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _yield$Promise$all, _yield$Promise$all2, whResponse, prodResponse, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              _context.n = 1;
              return Promise.all([axios.get("warehouses"), axios.get("get_Products_by_warehouse/0")]);
            case 1:
              _yield$Promise$all = _context.v;
              _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
              whResponse = _yield$Promise$all2[0];
              prodResponse = _yield$Promise$all2[1];
              _this.warehouses = whResponse.data.warehouses;
              _this.products = prodResponse.data;
              _context.n = 2;
              return _this.fetchOrder();
            case 2:
              _this.isLoading = false;
              _context.n = 4;
              break;
            case 3:
              _context.p = 3;
              _t = _context.v;
              _this.$bvToast.toast("Error loading data", {
                variant: "danger"
              });
            case 4:
              return _context.a(2);
          }
        }, _callee, null, [[0, 3]]);
      }))();
    },
    fetchOrder: function fetchOrder() {
      var _this2 = this;
      return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var id, res;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              id = _this2.$route.params.id;
              _context2.n = 1;
              return axios.get("job_work/".concat(id));
            case 1:
              res = _context2.v;
              _this2.issue = res.data;
            case 2:
              return _context2.a(2);
          }
        }, _callee2);
      }))();
    },
    addRow: function addRow() {
      this.issue.details.push({
        product_id: null,
        product_variant_id: null,
        quantity: 0
      });
    },
    removeRow: function removeRow(index) {
      if (this.issue.details.length > 1) {
        this.issue.details.splice(index, 1);
      }
    },
    updateIssue: function updateIssue() {
      var _this3 = this;
      this.isSubmitting = true;
      axios.put("job_work/".concat(this.issue.id), this.issue).then(function () {
        _this3.$bvToast.toast("Order updated successfully", {
          variant: "success"
        });
        _this3.$router.push("/app/job_work/list");
      })["catch"](function () {
        _this3.$bvToast.toast("Failed to update order", {
          variant: "danger"
        });
        _this3.isSubmitting = false;
      });
    }
  },
  mounted: function mounted() {
    this.fetchData();
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/job_work/edit_issue.vue?vue&type=style&index=0&id=70d88dd3&scoped=true&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/job_work/edit_issue.vue?vue&type=style&index=0&id=70d88dd3&scoped=true&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* Same premium styles as create_issue.vue */\n.spreadsheet-table[data-v-70d88dd3] { border: 2px solid #eee; border-radius: 8px; overflow: hidden;\n}\n.spreadsheet-table thead th[data-v-70d88dd3] { \n  background: #f1f4f8; padding: 15px; \n  font-weight: 700; text-transform: uppercase; \n  font-size: 1rem; color: #47404f;\n  border-bottom: 2px solid #e2e8f0;\n}\n.spreadsheet-input[data-v-70d88dd3] { \n  width: 100%; border: none; padding: 18px; \n  font-size: 1.4rem; \n  background: transparent; outline: none;\n}\n.premium-input[data-v-70d88dd3] {\n  font-size: 1.3rem !important;\n  padding: 25px 15px !important;\n  border: 1.5px solid #e2e8f0 !important;\n}\n.premium-select[data-v-70d88dd3] .vs__dropdown-toggle {\n  padding: 10px 5px !important;\n}\n.premium-select[data-v-70d88dd3] .vs__selected {\n  font-size: 1.3rem !important;\n}\n.spreadsheet-select[data-v-70d88dd3] .vs__dropdown-toggle { \n  border: none; \n  padding: 10px 12px; \n  min-height: 65px;\n}\n.spreadsheet-select[data-v-70d88dd3] .vs__selected {\n  font-size: 1.4rem !important;\n  font-weight: 700 !important;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/job_work/edit_issue.vue?vue&type=style&index=0&id=70d88dd3&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/job_work/edit_issue.vue?vue&type=style&index=0&id=70d88dd3&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_issue_vue_vue_type_style_index_0_id_70d88dd3_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./edit_issue.vue?vue&type=style&index=0&id=70d88dd3&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/job_work/edit_issue.vue?vue&type=style&index=0&id=70d88dd3&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_issue_vue_vue_type_style_index_0_id_70d88dd3_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_issue_vue_vue_type_style_index_0_id_70d88dd3_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/job_work/edit_issue.vue":
/*!***************************************************************!*\
  !*** ./resources/src/views/app/pages/job_work/edit_issue.vue ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _edit_issue_vue_vue_type_template_id_70d88dd3_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./edit_issue.vue?vue&type=template&id=70d88dd3&scoped=true */ "./resources/src/views/app/pages/job_work/edit_issue.vue?vue&type=template&id=70d88dd3&scoped=true");
/* harmony import */ var _edit_issue_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit_issue.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/job_work/edit_issue.vue?vue&type=script&lang=js");
/* harmony import */ var _edit_issue_vue_vue_type_style_index_0_id_70d88dd3_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit_issue.vue?vue&type=style&index=0&id=70d88dd3&scoped=true&lang=css */ "./resources/src/views/app/pages/job_work/edit_issue.vue?vue&type=style&index=0&id=70d88dd3&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _edit_issue_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _edit_issue_vue_vue_type_template_id_70d88dd3_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _edit_issue_vue_vue_type_template_id_70d88dd3_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "70d88dd3",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/job_work/edit_issue.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/job_work/edit_issue.vue?vue&type=script&lang=js":
/*!***************************************************************************************!*\
  !*** ./resources/src/views/app/pages/job_work/edit_issue.vue?vue&type=script&lang=js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_issue_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./edit_issue.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/job_work/edit_issue.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_issue_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/job_work/edit_issue.vue?vue&type=style&index=0&id=70d88dd3&scoped=true&lang=css":
/*!***********************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/job_work/edit_issue.vue?vue&type=style&index=0&id=70d88dd3&scoped=true&lang=css ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_issue_vue_vue_type_style_index_0_id_70d88dd3_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./edit_issue.vue?vue&type=style&index=0&id=70d88dd3&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/job_work/edit_issue.vue?vue&type=style&index=0&id=70d88dd3&scoped=true&lang=css");


/***/ }),

/***/ "./resources/src/views/app/pages/job_work/edit_issue.vue?vue&type=template&id=70d88dd3&scoped=true":
/*!*********************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/job_work/edit_issue.vue?vue&type=template&id=70d88dd3&scoped=true ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_issue_vue_vue_type_template_id_70d88dd3_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_issue_vue_vue_type_template_id_70d88dd3_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_issue_vue_vue_type_template_id_70d88dd3_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./edit_issue.vue?vue&type=template&id=70d88dd3&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/job_work/edit_issue.vue?vue&type=template&id=70d88dd3&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/job_work/edit_issue.vue?vue&type=template&id=70d88dd3&scoped=true":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/job_work/edit_issue.vue?vue&type=template&id=70d88dd3&scoped=true ***!
  \************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"main-content"},[_c('breadcumb',{attrs:{"page":'Edit Job Work Out',"folder":'Material Issue'}}),_vm._v(" "),(_vm.isLoading)?_c('div',{staticClass:"loading_subs"},[_c('div',{staticClass:"spinner spinner-primary mr-3"})]):_c('b-form',{on:{"submit":function($event){$event.preventDefault();return _vm.updateIssue.apply(null, arguments)}}},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-md-12"},[_c('div',{staticClass:"card mb-4 border-0 shadow-sm"},[_c('div',{staticClass:"card-body p-4"},[_c('div',{staticClass:"d-flex align-items-center mb-4"},[_c('div',{staticClass:"bg-primary text-white rounded-circle p-2 mr-3"},[_c('i',{staticClass:"i-Edit font-weight-bold"})]),_vm._v(" "),_c('h4',{staticClass:"card-title mb-0 font-weight-bold text-dark"},[_vm._v("Edit Material Issue ("+_vm._s(_vm.issue.Ref)+")")])]),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-md-3"},[_c('b-form-group',{attrs:{"label":"Date"}},[_c('b-form-input',{staticClass:"premium-input",attrs:{"type":"date","required":""},model:{value:(_vm.issue.date),callback:function ($$v) {_vm.$set(_vm.issue, "date", $$v)},expression:"issue.date"}})],1)],1),_vm._v(" "),_c('div',{staticClass:"col-md-4"},[_c('b-form-group',{attrs:{"label":"Source Godown (From)"}},[_c('v-select',{staticClass:"premium-select",attrs:{"reduce":function (label) { return label.value; },"options":_vm.warehouses.map(function (w) { return ({label: w.name, value: w.id}); })},model:{value:(_vm.issue.from_warehouse_id),callback:function ($$v) {_vm.$set(_vm.issue, "from_warehouse_id", $$v)},expression:"issue.from_warehouse_id"}})],1)],1),_vm._v(" "),_c('div',{staticClass:"col-md-5"},[_c('b-form-group',{attrs:{"label":"Worker Godown (To)"}},[_c('v-select',{staticClass:"premium-select",attrs:{"reduce":function (label) { return label.value; },"options":_vm.warehouses.map(function (w) { return ({label: w.name, value: w.id}); })},model:{value:(_vm.issue.worker_warehouse_id),callback:function ($$v) {_vm.$set(_vm.issue, "worker_warehouse_id", $$v)},expression:"issue.worker_warehouse_id"}})],1)],1)])])]),_vm._v(" "),_c('div',{staticClass:"card mb-4 border-0 shadow-sm"},[_c('div',{staticClass:"card-body p-4"},[_c('div',{staticClass:"table-responsive"},[_c('table',{staticClass:"table table-bordered spreadsheet-table"},[_c('thead',[_c('tr',[_c('th',{staticStyle:{"width":"60%"}},[_vm._v("Item (Raw Material)")]),_vm._v(" "),_c('th',{staticStyle:{"width":"30%"}},[_vm._v("Quantity (kg/units)")]),_vm._v(" "),_c('th',{staticStyle:{"width":"10%"}},[_vm._v("Action")])])]),_vm._v(" "),_c('tbody',_vm._l((_vm.issue.details),function(detail,index){return _c('tr',{key:index},[_c('td',{staticClass:"p-0"},[_c('v-select',{staticClass:"spreadsheet-select",attrs:{"reduce":function (label) { return label.value; },"options":_vm.products.map(function (p) { return ({label: p.name, value: p.id}); }),"placeholder":"Search Product...","append-to-body":true},model:{value:(detail.product_id),callback:function ($$v) {_vm.$set(detail, "product_id", $$v)},expression:"detail.product_id"}})],1),_vm._v(" "),_c('td',{staticClass:"p-0"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(detail.quantity),expression:"detail.quantity"}],staticClass:"spreadsheet-input text-center font-weight-bold text-primary",attrs:{"type":"text","inputmode":"decimal"},domProps:{"value":(detail.quantity)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(detail, "quantity", $event.target.value)}}})]),_vm._v(" "),_c('td',{staticClass:"text-center bg-light"},[_c('button',{staticClass:"btn btn-link text-danger p-0 mt-3",attrs:{"type":"button"},on:{"click":function($event){return _vm.removeRow(index)}}},[_c('i',{staticClass:"i-Close-Window font-weight-bold h4"})])])])}),0)]),_vm._v(" "),_c('b-button',{staticClass:"mt-3",attrs:{"type":"button","variant":"outline-primary"},on:{"click":_vm.addRow}},[_c('i',{staticClass:"i-Add mr-1"}),_vm._v(" Add Another Item\n              ")])],1),_vm._v(" "),_c('div',{staticClass:"mt-5"},[_c('h6',{staticClass:"font-weight-bold text-muted mb-3"},[_vm._v("Notes / Instructions")]),_vm._v(" "),_c('b-form-textarea',{staticClass:"premium-input",attrs:{"rows":"3"},model:{value:(_vm.issue.notes),callback:function ($$v) {_vm.$set(_vm.issue, "notes", $$v)},expression:"issue.notes"}})],1),_vm._v(" "),_c('div',{staticClass:"mt-5 text-right"},[_c('b-button',{staticClass:"px-5 py-3 shadow-sm font-weight-bold",attrs:{"type":"submit","variant":"primary","disabled":_vm.isSubmitting,"size":"lg"}},[_c('i',{staticClass:"i-Yes mr-2"}),_vm._v(" "+_vm._s(_vm.isSubmitting ? 'Updating...' : 'Update Issue Order')+"\n              ")])],1)])])])])])],1)}
var staticRenderFns = []
render._withStripped = true


/***/ })

}]);