"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["edit_transfer"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nprogress */ "./node_modules/nprogress/nprogress.js");
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nprogress__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    title: "Update Job Work / Transfer"
  },
  data: function data() {
    return {
      focused: false,
      focused_input: false,
      focused_output: false,
      timer: null,
      search_input: '',
      search_input_input: '',
      search_input_output: '',
      product_filter: [],
      product_filter_input: [],
      product_filter_output: [],
      isLoading: true,
      SubmitProcessing: false,
      details: [],
      current_flow: 'standard',
      detail: {
        quantity: "",
        discount: "",
        Unit_cost: "",
        discount_Method: "",
        tax_percent: "",
        tax_method: ""
      },
      warehouses: [],
      to_warehouses: [],
      products: [],
      total: 0,
      GrandTotal: 0,
      transfer: {
        id: "",
        from_warehouse: "",
        to_warehouse: "",
        statut: "",
        notes: "",
        items: "",
        date: '',
        tax_rate: 0,
        TaxNet: 0,
        shipping: 0,
        discount: 0,
        is_production: false
      },
      product: {
        id: "",
        code: "",
        stock: "",
        quantity: "",
        discount: "",
        DiscountNet: "",
        discount_Method: "",
        name: "",
        no_unit: "",
        unitPurchase: "",
        purchase_unit_id: "",
        Net_cost: "",
        Unit_cost: "",
        Total_cost: "",
        subtotal: "",
        product_id: "",
        detail_id: "",
        taxe: "",
        tax_percent: "",
        tax_method: "",
        product_variant_id: "",
        etat: "",
        flow_type: 'standard'
      }
    };
  },
  computed: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_1__.mapGetters)(["currentUser"])), {}, {
    total_sent: function total_sent() {
      return this.details.filter(function (d) {
        return d.flow_type !== 'output';
      }).reduce(function (sum, d) {
        return sum + (parseFloat(d.quantity) || 0);
      }, 0).toFixed(2);
    },
    total_received: function total_received() {
      return this.details.filter(function (d) {
        return d.flow_type === 'output';
      }).reduce(function (sum, d) {
        return sum + (parseFloat(d.quantity) || 0);
      }, 0).toFixed(2);
    },
    wastage: function wastage() {
      return (this.total_sent - this.total_received).toFixed(2);
    },
    wastage_percent: function wastage_percent() {
      if (this.total_sent == 0) return 0;
      return (this.wastage / this.total_sent * 100).toFixed(2);
    }
  }),
  methods: {
    handleFocus: function handleFocus() {
      this.focused = true;
    },
    handleBlur: function handleBlur() {
      this.focused = false;
    },
    showModal: function showModal(type) {
      this.current_flow = type;
      this.$bvModal.show('open_scan');
    },
    onScan: function onScan(decodedText, decodedResult) {
      var code = decodedText;
      if (this.current_flow === 'input') this.search_input_input = code;else if (this.current_flow === 'output') this.search_input_output = code;else this.search_input = code;
      this.search(this.current_flow, code);
      this.$bvModal.hide('open_scan');
    },
    Submit_Transfer: function Submit_Transfer() {
      var _this = this;
      this.$refs.Edit_transfer.validate().then(function (success) {
        if (!success) {
          _this.makeToast("danger", "Please fill the form correctly", "Failed");
        } else {
          _this.Update_Transfer();
        }
      });
    },
    Complete_Transfer: function Complete_Transfer() {
      var _this2 = this;
      this.$refs.Edit_transfer.validate().then(function (success) {
        if (!success) {
          _this2.makeToast("danger", "Please fill the form correctly", "Failed");
        } else {
          _this2.transfer.statut = 'completed';
          _this2.Update_Transfer();
        }
      });
    },
    getValidationState: function getValidationState(_ref) {
      var dirty = _ref.dirty,
        validated = _ref.validated,
        _ref$valid = _ref.valid,
        valid = _ref$valid === void 0 ? null : _ref$valid;
      return dirty || validated ? valid : null;
    },
    makeToast: function makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    },
    search: function search(type, input) {
      var _this3 = this;
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      if (input.length < 2) {
        if (type === 'input') this.product_filter_input = [];else if (type === 'output') this.product_filter_output = [];else this.product_filter = [];
        return;
      }
      if (this.transfer.from_warehouse != "" && this.transfer.from_warehouse != null) {
        if (type === 'input') this.focused_input = true;
        if (type === 'output') this.focused_output = true;
        if (type === 'standard') this.focused = true;
        this.timer = setTimeout(function () {
          var results = _this3.products.filter(function (product) {
            return product.name.toLowerCase().includes(input.toLowerCase()) || product.code.toLowerCase().includes(input.toLowerCase()) || product.barcode.toLowerCase().includes(input.toLowerCase());
          });
          if (type === 'input') _this3.product_filter_input = results;else if (type === 'output') _this3.product_filter_output = results;else _this3.product_filter = results;
          if (results.length <= 0) {
            _this3.makeToast("warning", "Product Not Found", "Warning");
          }
        }, 500);
      } else {
        this.makeToast("warning", "Select Warehouse", "Warning");
      }
    },
    getResultValue: function getResultValue(result) {
      return result.code + " " + "(" + result.name + ")";
    },
    SearchProduct: function SearchProduct(type, result) {
      this.product = {};
      this.current_flow = type;
      if (this.details.some(function (detail) {
        return detail.code === result.code && detail.flow_type === type;
      })) {
        this.makeToast("warning", "Already Added", "Warning");
      } else {
        this.product.code = result.code;
        this.product.no_unit = 1;
        this.product.stock = result.qte_purchase;
        this.product.quantity = 1;
        this.product.product_variant_id = result.product_variant_id;
        this.product.etat = "new";
        this.product.flow_type = type === 'standard' ? 'standard' : type;
        this.Get_Product_Details(result.id, result.product_variant_id);
      }
      if (type === 'input') {
        this.search_input_input = '';
        this.product_filter_input = [];
        this.focused_input = false;
        this.$refs.product_autocomplete_input.value = "";
      } else if (type === 'output') {
        this.search_input_output = '';
        this.product_filter_output = [];
        this.focused_output = false;
        this.$refs.product_autocomplete_output.value = "";
      } else {
        this.search_input = '';
        this.product_filter = [];
        this.focused = false;
        this.$refs.product_autocomplete.value = "";
      }
    },
    verifiedForm: function verifiedForm() {
      if (this.details.length <= 0) {
        this.makeToast("warning", "Add products to list", "Warning");
        return false;
      }
      if (this.transfer.from_warehouse === this.transfer.to_warehouse) {
        this.makeToast("warning", "Warehouses must be different", "Warning");
        return false;
      }
      return true;
    },
    Update_Transfer: function Update_Transfer() {
      var _this4 = this;
      if (this.verifiedForm()) {
        this.SubmitProcessing = true;
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().start();
        var id = this.$route.params.id;
        axios.put("transfers/".concat(id), {
          transfer: this.transfer,
          details: this.details,
          GrandTotal: this.GrandTotal
        }).then(function (response) {
          nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
          _this4.SubmitProcessing = false;
          _this4.$router.push({
            name: "index_transfer"
          });
          _this4.makeToast("success", "Successfully Updated", "Success");
        })["catch"](function (error) {
          nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
          _this4.makeToast("danger", "Invalid Data", "Failed");
          _this4.SubmitProcessing = false;
        });
      }
    },
    Last_Detail_id: function Last_Detail_id() {
      if (this.details.length === 0) return 1;
      return Math.max.apply(Math, _toConsumableArray(this.details.map(function (d) {
        return d.detail_id;
      }))) + 1;
    },
    add_product: function add_product() {
      this.product.detail_id = this.Last_Detail_id();
      this.details.push(_objectSpread({}, this.product));
    },
    Verified_Qty: function Verified_Qty(detail, id) {
      for (var i = 0; i < this.details.length; i++) {
        if (this.details[i].detail_id === id) {
          if (isNaN(detail.quantity)) this.details[i].quantity = 1;
          this.details[i].quantity = detail.quantity;
        }
      }
      this.Calcul_Total();
    },
    Calcul_Total: function Calcul_Total() {
      this.total = 0;
      for (var index = 0; index < this.details.length; index++) {
        var tax = this.details[index].taxe * this.details[index].quantity;
        this.details[index].subtotal = parseFloat(this.details[index].quantity * this.details[index].Net_cost + tax);
        this.total = parseFloat(this.total + this.details[index].subtotal);
      }
      this.GrandTotal = parseFloat(this.total + this.transfer.shipping).toFixed(2);
    },
    delete_Product_Detail: function delete_Product_Detail(id) {
      this.details = this.details.filter(function (d) {
        return d.detail_id !== id;
      });
      this.Calcul_Total();
    },
    Get_Products_By_Warehouse: function Get_Products_By_Warehouse(id) {
      var _this5 = this;
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().start();
      axios.get("get_Products_by_warehouse/" + id + "?stock=1&product_service=0&product_combo=1").then(function (response) {
        _this5.products = response.data;
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
      });
    },
    Get_Product_Details: function Get_Product_Details(product_id, variant_id) {
      var _this6 = this;
      axios.get("/show_product_data/" + product_id + "/" + variant_id).then(function (response) {
        _this6.product.discount = response.data.discount;
        _this6.product.DiscountNet = response.data.DiscountNet;
        _this6.product.discount_Method = response.data.discount_method;
        _this6.product.del = 0;
        _this6.product.etat = "new";
        _this6.product.product_id = response.data.id;
        _this6.product.name = response.data.name;
        _this6.product.Net_cost = response.data.Net_cost;
        _this6.product.Unit_cost = response.data.Unit_cost;
        _this6.product.taxe = response.data.tax_cost;
        _this6.product.tax_method = response.data.tax_method;
        _this6.product.tax_percent = response.data.tax_percent;
        _this6.product.unitPurchase = response.data.unitPurchase;
        _this6.product.purchase_unit_id = response.data.purchase_unit_id;
        _this6.add_product();
        _this6.Calcul_Total();
      });
    },
    resizeTextarea: function resizeTextarea() {
      var element = this.$refs.noteTextarea;
      if (element) {
        element.style.height = "auto";
        element.style.height = element.scrollHeight + "px";
      }
    },
    Selected_From_Warehouse: function Selected_From_Warehouse(value) {
      this.search_input = '';
      this.product_filter = [];
      this.Get_Products_By_Warehouse(value);
    },
    GetElements: function GetElements() {
      var _this7 = this;
      var id = this.$route.params.id;
      axios.get("transfers/".concat(id, "/edit")).then(function (response) {
        _this7.transfer = response.data.transfer;
        _this7.details = response.data.details;
        _this7.warehouses = response.data.warehouses;
        _this7.to_warehouses = response.data.to_warehouses;
        _this7.Get_Products_By_Warehouse(_this7.transfer.from_warehouse);
        _this7.Calcul_Total();
        _this7.isLoading = false;
      });
    }
  },
  created: function created() {
    this.GetElements();
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=style&index=0&id=09285268&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=style&index=0&id=09285268&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.main-content[data-v-09285268] .vgt-table, \n.main-content[data-v-09285268] .table,\n.main-content[data-v-09285268] .form-group label {\n  font-size: 1.3rem !important;\n}\n.main-content[data-v-09285268] .form-control {\n  font-size: 1.3rem !important;\n}\n.main-content[data-v-09285268] .v-select {\n  font-size: 1.3rem !important;\n}\n.main-content[data-v-09285268] .badge {\n  font-size: 1.1rem !important;\n  padding: 6px 12px !important;\n}\n.main-content[data-v-09285268] .breadcrumb ul li {\n  font-size: 1.2rem !important;\n}\n.main-content[data-v-09285268] .breadcrumb h1 {\n  font-size: 1.8rem !important;\n}\n.main-content[data-v-09285268] .table th, \n.main-content[data-v-09285268] .table td {\n  padding: 12px 10px !important;\n  vertical-align: middle !important;\n}\n.main-content[data-v-09285268] h5, \n.main-content[data-v-09285268] h6 {\n  font-size: 1.5rem !important;\n  font-weight: bold !important;\n}\n.main-content[data-v-09285268] .autocomplete-input {\n  font-size: 1.5rem !important;\n  height: 50px !important;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=style&index=1&id=09285268&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=style&index=1&id=09285268&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.main-content[data-v-09285268], .main-content label[data-v-09285268], .main-content input[data-v-09285268], .main-content .v-select[data-v-09285268], .main-content .table[data-v-09285268], .main-content .badge[data-v-09285268] {\n  font-size: 1.1rem !important;\n}\n.main-content h5[data-v-09285268], .main-content h6[data-v-09285268] {\n  font-size: 1.3rem !important;\n}\n.main-content .form-control[data-v-09285268] {\n  height: calc(1.5em + 1.1rem + 2px) !important;\n  font-size: 1.1rem !important;\n}\n.auto-expand[data-v-09285268] {\n  height: auto !important;\n  min-height: 100px !important;\n  overflow-y: hidden !important;\n  resize: none !important;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=style&index=2&id=09285268&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=style&index=2&id=09285268&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.input-with-icon {\n  display: flex;\n  align-items: center;\n}\n.scan-icon {\n  width: 50px; /* Adjust size as needed */\n  height: 50px;\n  margin-right: 8px; /* Adjust spacing as needed */\n  cursor: pointer;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=style&index=0&id=09285268&scoped=true&lang=css":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=style&index=0&id=09285268&scoped=true&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_transfer_vue_vue_type_style_index_0_id_09285268_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./edit_transfer.vue?vue&type=style&index=0&id=09285268&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=style&index=0&id=09285268&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_transfer_vue_vue_type_style_index_0_id_09285268_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_transfer_vue_vue_type_style_index_0_id_09285268_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=style&index=1&id=09285268&scoped=true&lang=css":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=style&index=1&id=09285268&scoped=true&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_transfer_vue_vue_type_style_index_1_id_09285268_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./edit_transfer.vue?vue&type=style&index=1&id=09285268&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=style&index=1&id=09285268&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_transfer_vue_vue_type_style_index_1_id_09285268_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_transfer_vue_vue_type_style_index_1_id_09285268_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=style&index=2&id=09285268&lang=css":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=style&index=2&id=09285268&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_transfer_vue_vue_type_style_index_2_id_09285268_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./edit_transfer.vue?vue&type=style&index=2&id=09285268&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=style&index=2&id=09285268&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_transfer_vue_vue_type_style_index_2_id_09285268_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_transfer_vue_vue_type_style_index_2_id_09285268_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/transfers/edit_transfer.vue":
/*!*******************************************************************!*\
  !*** ./resources/src/views/app/pages/transfers/edit_transfer.vue ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _edit_transfer_vue_vue_type_template_id_09285268_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./edit_transfer.vue?vue&type=template&id=09285268&scoped=true */ "./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=template&id=09285268&scoped=true");
/* harmony import */ var _edit_transfer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit_transfer.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=script&lang=js");
/* harmony import */ var _edit_transfer_vue_vue_type_style_index_0_id_09285268_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit_transfer.vue?vue&type=style&index=0&id=09285268&scoped=true&lang=css */ "./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=style&index=0&id=09285268&scoped=true&lang=css");
/* harmony import */ var _edit_transfer_vue_vue_type_style_index_1_id_09285268_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit_transfer.vue?vue&type=style&index=1&id=09285268&scoped=true&lang=css */ "./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=style&index=1&id=09285268&scoped=true&lang=css");
/* harmony import */ var _edit_transfer_vue_vue_type_style_index_2_id_09285268_lang_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./edit_transfer.vue?vue&type=style&index=2&id=09285268&lang=css */ "./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=style&index=2&id=09285268&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;




/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_5__["default"])(
  _edit_transfer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _edit_transfer_vue_vue_type_template_id_09285268_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _edit_transfer_vue_vue_type_template_id_09285268_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "09285268",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/transfers/edit_transfer.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=script&lang=js":
/*!*******************************************************************************************!*\
  !*** ./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_transfer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./edit_transfer.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_transfer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=style&index=0&id=09285268&scoped=true&lang=css":
/*!***************************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=style&index=0&id=09285268&scoped=true&lang=css ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_transfer_vue_vue_type_style_index_0_id_09285268_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./edit_transfer.vue?vue&type=style&index=0&id=09285268&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=style&index=0&id=09285268&scoped=true&lang=css");


/***/ }),

/***/ "./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=style&index=1&id=09285268&scoped=true&lang=css":
/*!***************************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=style&index=1&id=09285268&scoped=true&lang=css ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_transfer_vue_vue_type_style_index_1_id_09285268_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./edit_transfer.vue?vue&type=style&index=1&id=09285268&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=style&index=1&id=09285268&scoped=true&lang=css");


/***/ }),

/***/ "./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=style&index=2&id=09285268&lang=css":
/*!***************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=style&index=2&id=09285268&lang=css ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_transfer_vue_vue_type_style_index_2_id_09285268_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./edit_transfer.vue?vue&type=style&index=2&id=09285268&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=style&index=2&id=09285268&lang=css");


/***/ }),

/***/ "./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=template&id=09285268&scoped=true":
/*!*************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=template&id=09285268&scoped=true ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_transfer_vue_vue_type_template_id_09285268_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_transfer_vue_vue_type_template_id_09285268_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_transfer_vue_vue_type_template_id_09285268_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./edit_transfer.vue?vue&type=template&id=09285268&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=template&id=09285268&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=template&id=09285268&scoped=true":
/*!****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/transfers/edit_transfer.vue?vue&type=template&id=09285268&scoped=true ***!
  \****************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"main-content"},[_c('breadcumb',{attrs:{"page":_vm.$t('EditTransfer'),"folder":_vm.$t('ListTransfers')}}),_vm._v(" "),(_vm.isLoading)?_c('div',{staticClass:"loading_page spinner spinner-primary mr-3"}):_vm._e(),_vm._v(" "),(!_vm.isLoading)?_c('validation-observer',{ref:"Edit_transfer"},[_c('b-form',{on:{"submit":function($event){$event.preventDefault();return _vm.Submit_Transfer.apply(null, arguments)}}},[_c('b-row',[_c('b-col',{attrs:{"lg":"12","md":"12","sm":"12"}},[_c('b-card',[_c('b-row',[_c('b-modal',{attrs:{"hide-footer":"","id":"open_scan","size":"md","title":"Barcode Scanner"}},[_c('qrcode-scanner',{staticStyle:{"width":"100%","height":"calc(100vh - 56px)"},attrs:{"qrbox":250,"fps":10},on:{"result":_vm.onScan}})],1),_vm._v(" "),_c('b-col',{staticClass:"mb-3",attrs:{"lg":"4","md":"4","sm":"12"}},[_c('validation-provider',{attrs:{"name":"date","rules":{ required: true}},scopedSlots:_vm._u([{key:"default",fn:function(validationContext){return [_c('b-form-group',{attrs:{"label":_vm.$t('date') + ' ' + '*'}},[_c('b-form-input',{attrs:{"state":_vm.getValidationState(validationContext),"aria-describedby":"date-feedback","type":"date"},model:{value:(_vm.transfer.date),callback:function ($$v) {_vm.$set(_vm.transfer, "date", $$v)},expression:"transfer.date"}}),_vm._v(" "),_c('b-form-invalid-feedback',{attrs:{"id":"OrderTax-feedback"}},[_vm._v(_vm._s(validationContext.errors[0]))])],1)]}}],null,false,3120178706)})],1),_vm._v(" "),_c('b-col',{staticClass:"mb-3",attrs:{"lg":"4","md":"4","sm":"12"}},[_c('validation-provider',{attrs:{"name":"From Warehouse","rules":{ required: true}},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var valid = ref.valid;
var errors = ref.errors;
return _c('b-form-group',{attrs:{"label":_vm.$t('FromWarehouse') + ' ' + '*'}},[_c('v-select',{class:{'is-invalid': !!errors.length},attrs:{"state":errors[0] ? false : (valid ? true : null),"disabled":_vm.details.length > 0,"reduce":function (label) { return label.value; },"placeholder":_vm.$t('Choose_Warehouse'),"options":_vm.warehouses.map(function (warehouses) { return ({label: warehouses.name, value: warehouses.id}); })},on:{"input":_vm.Selected_From_Warehouse},model:{value:(_vm.transfer.from_warehouse),callback:function ($$v) {_vm.$set(_vm.transfer, "from_warehouse", $$v)},expression:"transfer.from_warehouse"}}),_vm._v(" "),_c('b-form-invalid-feedback',[_vm._v(_vm._s(errors[0]))])],1)}}],null,false,196005589)})],1),_vm._v(" "),_c('b-col',{staticClass:"mb-3",attrs:{"lg":"4","md":"4","sm":"12"}},[_c('validation-provider',{attrs:{"name":"To Warehouse","rules":{ required: true}},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var valid = ref.valid;
var errors = ref.errors;
return _c('b-form-group',{attrs:{"label":_vm.$t('ToWarehouse') + ' ' + '*'}},[_c('v-select',{class:{'is-invalid': !!errors.length},attrs:{"state":errors[0] ? false : (valid ? true : null),"reduce":function (label) { return label.value; },"placeholder":_vm.$t('Choose_Warehouse'),"options":_vm.to_warehouses.map(function (to_warehouses) { return ({label: to_warehouses.name, value: to_warehouses.id}); })},model:{value:(_vm.transfer.to_warehouse),callback:function ($$v) {_vm.$set(_vm.transfer, "to_warehouse", $$v)},expression:"transfer.to_warehouse"}}),_vm._v(" "),_c('b-form-invalid-feedback',[_vm._v(_vm._s(errors[0]))])],1)}}],null,false,2362590602)})],1),_vm._v(" "),_c('b-col',{staticClass:"mb-5",attrs:{"md":"12"}},[_c('h6',[_vm._v(_vm._s(_vm.$t('ProductName')))]),_vm._v(" "),_c('div',{staticClass:"autocomplete",attrs:{"id":"autocomplete"}},[_c('div',{staticClass:"input-with-icon"},[_c('img',{staticClass:"scan-icon",attrs:{"src":"/assets_setup/scan.png","alt":"Scan"},on:{"click":function($event){return _vm.showModal('standard')}}}),_vm._v(" "),_c('input',{ref:"product_autocomplete",staticClass:"autocomplete-input",attrs:{"placeholder":_vm.$t('Scan_Search_Product_by_Code_Name')},on:{"input":function (e) { return _vm.search_input = e.target.value; },"keyup":function($event){return _vm.search('standard', _vm.search_input)}}})]),_vm._v(" "),_c('ul',{directives:[{name:"show",rawName:"v-show",value:(_vm.focused),expression:"focused"}],staticClass:"autocomplete-result-list"},_vm._l((_vm.product_filter),function(product_fil){return _c('li',{staticClass:"autocomplete-result",on:{"mousedown":function($event){return _vm.SearchProduct('standard', product_fil)}}},[_vm._v(_vm._s(_vm.getResultValue(product_fil)))])}),0)])]),_vm._v(" "),_c('b-col',{attrs:{"md":"12"}},[_c('div',{staticClass:"table-responsive"},[_c('table',{staticClass:"table table-hover table-sm"},[_c('thead',{staticClass:"bg-gray-300"},[_c('tr',[_c('th',[_vm._v(_vm._s(_vm.$t('ProductName')))]),_vm._v(" "),_c('th',{staticClass:"text-right"},[_vm._v(_vm._s(_vm.$t('Qty')))]),_vm._v(" "),_c('th',{staticClass:"text-center"},[_c('i',{staticClass:"fa fa-trash"})])])]),_vm._v(" "),_c('tbody',[_vm._l((_vm.details),function(item,index){return _c('tr',{key:index},[_c('td',[_c('span',{staticClass:"font-weight-bold"},[_vm._v(_vm._s(item.name))]),_c('br'),_vm._v(" "),_c('small',{staticClass:"text-muted"},[_vm._v(_vm._s(item.code)+" | Stock: "+_vm._s(item.stock))])]),_vm._v(" "),_c('td',{attrs:{"width":"150"}},[_c('b-form-input',{staticClass:"text-right font-weight-bold",staticStyle:{"height":"50px","font-size":"1.4rem"},attrs:{"type":"number"},on:{"keyup":_vm.Calcul_Total},model:{value:(item.quantity),callback:function ($$v) {_vm.$set(item, "quantity", _vm._n($$v))},expression:"item.quantity"}})],1),_vm._v(" "),_c('td',{staticClass:"text-center"},[_c('a',{staticClass:"btn btn-icon btn-sm",on:{"click":function($event){return _vm.delete_Product_Detail(item.detail_id)}}},[_c('i',{staticClass:"i-Close-Window text-20 text-danger"})])])])}),_vm._v(" "),(_vm.details.length == 0)?_c('tr',[_c('td',{staticClass:"text-center py-4 text-muted",attrs:{"colspan":"3"}},[_vm._v("No materials added.")])]):_vm._e()],2)])])]),_vm._v(" "),_c('b-col',{staticClass:"mt-5",attrs:{"md":"12"}},[_c('b-form-group',{attrs:{"label":_vm.$t('Note')}},[_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.transfer.notes),expression:"transfer.notes"}],ref:"noteTextarea",staticClass:"form-control auto-expand",attrs:{"rows":"3","placeholder":_vm.$t('Afewwords')},domProps:{"value":(_vm.transfer.notes)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.$set(_vm.transfer, "notes", $event.target.value)},_vm.resizeTextarea]}})])],1),_vm._v(" "),_c('b-col',{attrs:{"md":"12"}},[_c('b-form-group',[_c('b-button',{staticClass:"mr-3",attrs:{"variant":"primary","size":"lg","disabled":_vm.SubmitProcessing},on:{"click":_vm.Submit_Transfer}},[_c('i',{staticClass:"i-Edit me-2 font-weight-bold"}),_vm._v(" "+_vm._s(_vm.$t('submit'))+"\n                  ")]),_vm._v(" "),(_vm.SubmitProcessing)?_vm._m(0):_vm._e()],1)],1)],1)],1)],1)],1)],1)],1):_vm._e(),_vm._v(" "),_c('validation-observer',{ref:"Update_Detail_transfer"},[_c('b-modal',{attrs:{"hide-footer":"","size":"md","id":"form_Update_Detail","title":_vm.detail.name}},[_c('b-form',{on:{"submit":function($event){$event.preventDefault();return _vm.submit_Update_Detail.apply(null, arguments)}}},[_c('b-row',[_c('b-col',{attrs:{"lg":"12","md":"12","sm":"12"}},[_c('validation-provider',{attrs:{"name":"Product Cost","rules":{ required: true , regex: /^\d*\.?\d*$/}},scopedSlots:_vm._u([{key:"default",fn:function(validationContext){return [_c('b-form-group',{attrs:{"label":_vm.$t('ProductCost') + ' ' + '*',"id":"cost-input"}},[_c('b-form-input',{attrs:{"label":"Product Cost","state":_vm.getValidationState(validationContext),"aria-describedby":"cost-feedback"},model:{value:(_vm.detail.Unit_cost),callback:function ($$v) {_vm.$set(_vm.detail, "Unit_cost", _vm._n($$v))},expression:"detail.Unit_cost"}}),_vm._v(" "),_c('b-form-invalid-feedback',{attrs:{"id":"cost-feedback"}},[_vm._v(_vm._s(validationContext.errors[0]))])],1)]}}])})],1),_vm._v(" "),_c('b-col',{attrs:{"lg":"12","md":"12","sm":"12"}},[_c('validation-provider',{attrs:{"name":"Tax Method","rules":{ required: true}},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var valid = ref.valid;
var errors = ref.errors;
return _c('b-form-group',{attrs:{"label":_vm.$t('TaxMethod') + ' ' + '*'}},[_c('v-select',{class:{'is-invalid': !!errors.length},attrs:{"state":errors[0] ? false : (valid ? true : null),"reduce":function (label) { return label.value; },"placeholder":_vm.$t('Choose_Method'),"options":[
                          {label: 'Exclusive', value: '1'},
                          {label: 'Inclusive', value: '2'}
                         ]},model:{value:(_vm.detail.tax_method),callback:function ($$v) {_vm.$set(_vm.detail, "tax_method", $$v)},expression:"detail.tax_method"}}),_vm._v(" "),_c('b-form-invalid-feedback',[_vm._v(_vm._s(errors[0]))])],1)}}])})],1),_vm._v(" "),_c('b-col',{attrs:{"lg":"12","md":"12","sm":"12"}},[_c('validation-provider',{attrs:{"name":"Order Tax","rules":{ required: true , regex: /^\d*\.?\d*$/}},scopedSlots:_vm._u([{key:"default",fn:function(validationContext){return [_c('b-form-group',{attrs:{"label":_vm.$t('OrderTax') + ' ' + '*'}},[_c('b-input-group',{attrs:{"append":"%"}},[_c('b-form-input',{attrs:{"label":"Order Tax","state":_vm.getValidationState(validationContext),"aria-describedby":"OrderTax-feedback"},model:{value:(_vm.detail.tax_percent),callback:function ($$v) {_vm.$set(_vm.detail, "tax_percent", _vm._n($$v))},expression:"detail.tax_percent"}})],1),_vm._v(" "),_c('b-form-invalid-feedback',{attrs:{"id":"OrderTax-feedback"}},[_vm._v(_vm._s(validationContext.errors[0]))])],1)]}}])})],1),_vm._v(" "),_c('b-col',{attrs:{"lg":"12","md":"12","sm":"12"}},[_c('validation-provider',{attrs:{"name":"Discount Method","rules":{ required: true}},scopedSlots:_vm._u([{key:"default",fn:function(ref){
                         var valid = ref.valid;
                         var errors = ref.errors;
return _c('b-form-group',{attrs:{"label":_vm.$t('Discount_Method') + ' ' + '*'}},[_c('v-select',{class:{'is-invalid': !!errors.length},attrs:{"reduce":function (label) { return label.value; },"placeholder":_vm.$t('Choose_Method'),"state":errors[0] ? false : (valid ? true : null),"options":[
                          {label: 'Percent %', value: '1'},
                          {label: 'Fixed', value: '2'}
                         ]},model:{value:(_vm.detail.discount_Method),callback:function ($$v) {_vm.$set(_vm.detail, "discount_Method", $$v)},expression:"detail.discount_Method"}}),_vm._v(" "),_c('b-form-invalid-feedback',[_vm._v(_vm._s(errors[0]))])],1)}}])})],1),_vm._v(" "),_c('b-col',{attrs:{"lg":"12","md":"12","sm":"12"}},[_c('validation-provider',{attrs:{"name":"Discount Rate","rules":{ required: true , regex: /^\d*\.?\d*$/}},scopedSlots:_vm._u([{key:"default",fn:function(validationContext){return [_c('b-form-group',{attrs:{"label":_vm.$t('Discount') + ' ' + '*'}},[_c('b-form-input',{attrs:{"label":"Discount","state":_vm.getValidationState(validationContext),"aria-describedby":"Discount-feedback"},model:{value:(_vm.detail.discount),callback:function ($$v) {_vm.$set(_vm.detail, "discount", _vm._n($$v))},expression:"detail.discount"}}),_vm._v(" "),_c('b-form-invalid-feedback',{attrs:{"id":"Discount-feedback"}},[_vm._v(_vm._s(validationContext.errors[0]))])],1)]}}])})],1),_vm._v(" "),_c('b-col',{attrs:{"md":"12"}},[_c('b-form-group',[_c('b-button',{attrs:{"variant":"primary","type":"submit"}},[_c('i',{staticClass:"i-Yes me-2 font-weight-bold"}),_vm._v(" "+_vm._s(_vm.$t('submit')))])],1)],1)],1)],1)],1)],1)],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"typo__p"},[_c('div',{staticClass:"spinner sm spinner-primary mt-3"})])}]
render._withStripped = true


/***/ })

}]);