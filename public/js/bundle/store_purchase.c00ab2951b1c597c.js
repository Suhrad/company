"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["store_purchase"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nprogress */ "./node_modules/nprogress/nprogress.js");
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nprogress__WEBPACK_IMPORTED_MODULE_0__);
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    title: "Create Bulk Purchases"
  },
  data: function data() {
    return {
      isLoading: true,
      is_bulk_processing: false,
      warehouses: [],
      suppliers: [],
      products: [],
      purchase: {
        date: new Date().toISOString().slice(0, 10),
        warehouse_id: "",
        notes: "",
        tax_rate: 0,
        discount: 0,
        shipping: 0,
        transporter_name: "",
        lr_number: ""
      },
      spreadsheetRows: [{
        supplier_id: null,
        note: '',
        items: [{
          product_data: null,
          product_id: null,
          variant_id: null,
          quantity: null,
          amount: null,
          purchase_unit_id: null,
          tax_method: null,
          tax_percent: null
        }]
      }]
    };
  },
  computed: _objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_1__.mapGetters)(["currentUserPermissions", "currentUser"])),
  methods: {
    // Initialize Spreadsheet Rows
    initSpreadsheet: function initSpreadsheet() {
      // Already initialized in data() with 1 row
    },
    addNewRow: function addNewRow() {
      var _this = this;
      this.spreadsheetRows.push({
        supplier_id: null,
        note: this.generateAutoNote(),
        items: [{
          product_data: null,
          product_id: null,
          variant_id: null,
          quantity: null,
          amount: null,
          purchase_unit_id: null,
          tax_method: null,
          tax_percent: null
        }]
      });
      this.$nextTick(function () {
        var nextIndex = _this.spreadsheetRows.length - 1;
        if (_this.$refs['row_supplier_' + nextIndex]) {
          _this.$refs['row_supplier_' + nextIndex][0].$el.querySelector('input').focus();
        }
      });
    },
    addItem: function addItem(rowIndex) {
      var _this2 = this;
      this.spreadsheetRows[rowIndex].items.push({
        product_data: null,
        product_id: null,
        variant_id: null,
        quantity: null,
        amount: null,
        purchase_unit_id: null,
        tax_method: null,
        tax_percent: null
      });
      this.$nextTick(function () {
        var nextItemIndex = _this2.spreadsheetRows[rowIndex].items.length - 1;
        var refName = 'row_product_' + rowIndex + '_' + nextItemIndex;
        if (_this2.$refs[refName] && _this2.$refs[refName][0]) {
          _this2.$refs[refName][0].$el.querySelector('input').focus();
        }
      });
    },
    removeItem: function removeItem(rowIndex, itemIndex) {
      if (this.spreadsheetRows[rowIndex].items.length > 1) {
        this.spreadsheetRows[rowIndex].items.splice(itemIndex, 1);
      }
    },
    generateAutoNote: function generateAutoNote() {
      var _this3 = this;
      var note = "";

      // Warehouse specific prefix first
      var warehouse = this.warehouses.find(function (w) {
        return w.id === _this3.purchase.warehouse_id;
      });
      if (warehouse && warehouse.shortcut) {
        note += warehouse.shortcut + ": ";
      }

      // Transport and LR
      if (this.purchase.transporter_name) note += this.purchase.transporter_name + " ";
      note += "LR: " + (this.purchase.lr_number ? this.purchase.lr_number : "") + " ";
      return note.trim();
    },
    onAdvancedChange: function onAdvancedChange() {
      var _this4 = this;
      // Update all row notes when Transport or LR change
      this.spreadsheetRows.forEach(function (row) {
        if (!row.note || row.note === "" || row.note.includes('LR:')) {
          row.note = _this4.generateAutoNote();
        }
      });
    },
    onGridSupplierChange: function onGridSupplierChange(index) {
      var _this5 = this;
      this.$nextTick(function () {
        var refName = 'row_product_' + index + '_0';
        if (_this5.$refs[refName] && _this5.$refs[refName][0]) {
          _this5.$refs[refName][0].$el.querySelector('input').focus();
        }
      });
    },
    onGridProductChange: function onGridProductChange(rowIndex, itemIndex) {
      var _this6 = this;
      var row = this.spreadsheetRows[rowIndex];
      var item = row.items[itemIndex];
      if (item.product_data) {
        item.product_id = item.product_data.id;
        item.variant_id = item.product_data.product_variant_id || null;
        item.amount = null; // Blank by default, let person write directly

        if (!row.note || row.note === "" || row.note.includes('LR:')) {
          row.note = this.generateAutoNote();
        }
        axios.get("/show_product_data/" + item.product_id + "/" + (item.variant_id || null)).then(function (response) {
          item.purchase_unit_id = response.data.purchase_unit_id;
          item.tax_method = response.data.tax_method;
          item.tax_percent = response.data.tax_percent;
        });
        this.$nextTick(function () {
          var refName = 'row_qty_' + rowIndex + '_' + itemIndex;
          if (_this6.$refs[refName] && _this6.$refs[refName][0]) {
            _this6.$refs[refName][0].focus();
          }
        });
      }
    },
    focusNextCell: function focusNextCell(index, itemIndex, type) {
      var _this7 = this;
      this.$nextTick(function () {
        if (type === 'note') {
          var refName = 'row_note_' + index;
          if (_this7.$refs[refName]) {
            if (_this7.$refs[refName][0]) {
              _this7.$refs[refName][0].focus();
            } else {
              _this7.$refs[refName].focus();
            }
          }
        } else {
          var _refName = 'row_' + type + '_' + index + '_' + itemIndex;
          if (_this7.$refs[_refName] && _this7.$refs[_refName][0]) {
            _this7.$refs[_refName][0].focus();
          }
        }
      });
    },
    moveToNextRow: function moveToNextRow(index) {
      var _this8 = this;
      if (index === this.spreadsheetRows.length - 1) {
        this.addNewRow();
      } else {
        this.$nextTick(function () {
          var nextIndex = index + 1;
          var refName = 'row_product_' + nextIndex + '_0';
          if (_this8.$refs[refName] && _this8.$refs[refName][0]) {
            _this8.$refs[refName][0].$el.querySelector('input').focus();
          }
        });
      }
    },
    clearRow: function clearRow(index) {
      if (this.spreadsheetRows.length > 1) {
        this.spreadsheetRows.splice(index, 1);
      } else {
        this.$set(this.spreadsheetRows, 0, {
          supplier_id: null,
          note: this.generateAutoNote(),
          items: [{
            product_data: null,
            product_id: null,
            variant_id: null,
            quantity: null,
            amount: null,
            purchase_unit_id: null,
            tax_method: null,
            tax_percent: null
          }]
        });
      }
    },
    submitSpreadsheet: function submitSpreadsheet() {
      var _this9 = this;
      var validRows = this.spreadsheetRows.filter(function (row) {
        return row.supplier_id && row.items.some(function (item) {
          return item.product_id;
        });
      });
      if (validRows.length === 0) {
        this.makeToast("warning", "Please fill at least one row", "Warning");
        return;
      }
      if (!this.purchase.warehouse_id) {
        this.makeToast("warning", "Please select a Warehouse first", "Warning");
        return;
      }
      this.is_bulk_processing = true;
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().start();
      var purchasesData = validRows.map(function (row) {
        var validItems = row.items.filter(function (item) {
          return item.product_id;
        });
        var grandTotal = validItems.reduce(function (sum, item) {
          return sum + parseFloat(item.amount || 0);
        }, 0);
        var details = validItems.map(function (item) {
          return {
            product_id: item.product_id,
            product_variant_id: item.variant_id,
            quantity: parseFloat(item.quantity || 0),
            Unit_cost: item.quantity > 0 ? parseFloat((parseFloat(item.amount || 0) / parseFloat(item.quantity)).toFixed(2)) : 0,
            subtotal: parseFloat(parseFloat(item.amount || 0).toFixed(2)),
            discount: 0,
            tax_percent: item.tax_percent || 0,
            tax_method: item.tax_method || 1,
            purchase_unit_id: item.purchase_unit_id,
            imei_number: ""
          };
        });
        return {
          date: _this9.purchase.date,
          supplier_id: row.supplier_id,
          warehouse_id: _this9.purchase.warehouse_id,
          statut: "received",
          notes: row.note,
          tax_rate: _this9.purchase.tax_rate || 0,
          TaxNet: 0,
          discount: _this9.purchase.discount || 0,
          shipping: _this9.purchase.shipping || 0,
          GrandTotal: parseFloat(grandTotal.toFixed(2)),
          details: details
        };
      });
      axios.post("purchases/bulk", {
        purchases: purchasesData
      }).then(function (response) {
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
        _this9.makeToast("success", "All purchases saved successfully", "Success");
        _this9.$router.push({
          name: "index_purchases"
        });
      })["catch"](function (error) {
        var _error$response;
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
        _this9.is_bulk_processing = false;
        _this9.makeToast("danger", ((_error$response = error.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.message) || "Failed to save purchases", "Error");
      });
    },
    Selected_Warehouse: function Selected_Warehouse(value) {
      var _this0 = this;
      this.Get_Products_By_Warehouse(value);
      this.spreadsheetRows.forEach(function (row) {
        if (!row.note || row.note === "" || row.note.includes('LR:')) {
          row.note = _this0.generateAutoNote();
        }
      });
    },
    Get_Products_By_Warehouse: function Get_Products_By_Warehouse(id) {
      var _this1 = this;
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().start();
      axios.get("get_Products_by_warehouse/" + id + "?stock=" + 0 + "&product_service=" + 0).then(function (response) {
        _this1.products = response.data;
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
      });
    },
    GetElements: function GetElements() {
      var _this10 = this;
      axios.get("purchases/create").then(function (response) {
        _this10.suppliers = response.data.suppliers;
        _this10.warehouses = response.data.warehouses;
        _this10.isLoading = false;
        _this10.initSpreadsheet();
      });
    },
    makeToast: function makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    }
  },
  created: function created() {
    this.GetElements();
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=style&index=0&id=3022e24c&scoped=true&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=style&index=0&id=3022e24c&scoped=true&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.excel-container[data-v-3022e24c] {\n  padding: 20px;\n  padding-bottom: 400px; /* Massive space at bottom for scrolling */\n  background: #fff;\n}\n.excel-grid[data-v-3022e24c] {\n  border: 1px solid #ddd;\n  border-collapse: collapse;\n  width: 100%;\n}\n.excel-grid th[data-v-3022e24c] {\n  background: #f4f4f4;\n  padding: 10px;\n  border: 1px solid #ddd;\n  font-size: 1rem;\n  font-weight: 600;\n}\n.excel-grid td[data-v-3022e24c] {\n  padding: 0;\n  border: 1px solid #ddd;\n  min-height: 60px;\n  vertical-align: middle;\n}\n.grid-input[data-v-3022e24c] {\n  width: 100%;\n  height: 60px;\n  border: none;\n  padding: 10px;\n  font-size: 1.3rem;\n  outline: none;\n  background: transparent;\n  line-height: 1.5;\n}\n.grid-input[data-v-3022e24c]:focus {\n  background: #fff;\n  box-shadow: inset 0 0 0 2px #716aca;\n}\n.grid-v-select[data-v-3022e24c] .vs__dropdown-toggle {\n  border: none !important;\n  background: transparent !important;\n  border-radius: 0;\n  min-height: 60px;\n  font-size: 1.3rem;\n  display: flex;\n  align-items: center;\n}\n.grid-v-select[data-v-3022e24c] .vs__dropdown-menu {\n  min-width: 350px !important;\n  font-size: 1.2rem !important;\n}\n.grid-v-select[data-v-3022e24c] .vs__selected {\n  font-size: 1.3rem !important;\n  white-space: normal;\n}\n/* Top level warehouse and date text size */\n.main-content[data-v-3022e24c] .v-select, .main-content[data-v-3022e24c] input, .main-content[data-v-3022e24c] label {\n  font-size: 1.3rem !important;\n}\n.main-content[data-v-3022e24c] .vs__selected {\n  font-size: 1.3rem !important;\n  white-space: normal;\n}\n.grid-v-select.vs--open[data-v-3022e24c] .vs__dropdown-toggle {\n  background: #fff !important;\n  box-shadow: inset 0 0 0 2px #716aca;\n}\n.worksheet-grid-wrapper[data-v-3022e24c] {\n  cursor: pointer;\n}\n.grid-row-item[data-v-3022e24c] {\n  display: flex;\n  align-items: center;\n  border-bottom: 1px solid #ddd;\n  height: 60px;\n}\n.grid-row-item[data-v-3022e24c]:last-child {\n  border-bottom: none;\n}\n.fill-height-input[data-v-3022e24c] {\n  height: 100%;\n  min-height: 60px;\n}\n.fill-height-select[data-v-3022e24c] .vs__dropdown-toggle {\n  height: 100%;\n  min-height: 60px;\n  display: flex;\n  align-items: center;\n}\n\n/* Hide arrows in Chrome, Safari, Edge, Opera */\ninput[data-v-3022e24c]::-webkit-outer-spin-button,\ninput[data-v-3022e24c]::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n\n/* Hide arrows in Firefox */\ninput[type=number][data-v-3022e24c] {\n  -moz-appearance: textfield;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=style&index=0&id=3022e24c&scoped=true&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=style&index=0&id=3022e24c&scoped=true&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_create_purchase_vue_vue_type_style_index_0_id_3022e24c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./create_purchase.vue?vue&type=style&index=0&id=3022e24c&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=style&index=0&id=3022e24c&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_create_purchase_vue_vue_type_style_index_0_id_3022e24c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_create_purchase_vue_vue_type_style_index_0_id_3022e24c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/purchases/create_purchase.vue":
/*!*********************************************************************!*\
  !*** ./resources/src/views/app/pages/purchases/create_purchase.vue ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _create_purchase_vue_vue_type_template_id_3022e24c_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create_purchase.vue?vue&type=template&id=3022e24c&scoped=true */ "./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=template&id=3022e24c&scoped=true");
/* harmony import */ var _create_purchase_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create_purchase.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=script&lang=js");
/* harmony import */ var _create_purchase_vue_vue_type_style_index_0_id_3022e24c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./create_purchase.vue?vue&type=style&index=0&id=3022e24c&scoped=true&lang=css */ "./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=style&index=0&id=3022e24c&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _create_purchase_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _create_purchase_vue_vue_type_template_id_3022e24c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _create_purchase_vue_vue_type_template_id_3022e24c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "3022e24c",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/purchases/create_purchase.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=script&lang=js":
/*!*********************************************************************************************!*\
  !*** ./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_create_purchase_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./create_purchase.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_create_purchase_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=style&index=0&id=3022e24c&scoped=true&lang=css":
/*!*****************************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=style&index=0&id=3022e24c&scoped=true&lang=css ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_create_purchase_vue_vue_type_style_index_0_id_3022e24c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./create_purchase.vue?vue&type=style&index=0&id=3022e24c&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=style&index=0&id=3022e24c&scoped=true&lang=css");


/***/ }),

/***/ "./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=template&id=3022e24c&scoped=true":
/*!***************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=template&id=3022e24c&scoped=true ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_create_purchase_vue_vue_type_template_id_3022e24c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_create_purchase_vue_vue_type_template_id_3022e24c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_create_purchase_vue_vue_type_template_id_3022e24c_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./create_purchase.vue?vue&type=template&id=3022e24c&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=template&id=3022e24c&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=template&id=3022e24c&scoped=true":
/*!******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=template&id=3022e24c&scoped=true ***!
  \******************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"main-content"},[_c('breadcumb',{attrs:{"page":_vm.$t('AddPurchase'),"folder":_vm.$t('ListPurchases')}}),_vm._v(" "),(_vm.isLoading)?_c('div',{staticClass:"loading_page spinner spinner-primary mr-3"}):_vm._e(),_vm._v(" "),(!_vm.isLoading)?_c('validation-observer',{ref:"create_purchase"},[_c('b-form',{on:{"submit":function($event){$event.preventDefault();return _vm.submitSpreadsheet.apply(null, arguments)}}},[_c('b-row',[_c('b-col',{attrs:{"lg":"12","md":"12","sm":"12"}},[_c('b-card',{staticClass:"mb-3 bg-light"},[_c('b-row',[_c('b-col',{attrs:{"lg":"6","md":"6","sm":"12"}},[_c('b-form-group',{attrs:{"label":_vm.$t('date')}},[_c('b-form-input',{staticClass:"header-input",attrs:{"type":"date"},model:{value:(_vm.purchase.date),callback:function ($$v) {_vm.$set(_vm.purchase, "date", $$v)},expression:"purchase.date"}})],1)],1),_vm._v(" "),_c('b-col',{attrs:{"lg":"6","md":"6","sm":"12"}},[_c('b-form-group',{attrs:{"label":_vm.$t('warehouse')}},[_c('v-select',{attrs:{"reduce":function (label) { return label.value; },"placeholder":_vm.$t('Choose_Warehouse'),"options":_vm.warehouses.map(function (w) { return ({label: w.name, value: w.id}); })},on:{"input":_vm.Selected_Warehouse},model:{value:(_vm.purchase.warehouse_id),callback:function ($$v) {_vm.$set(_vm.purchase, "warehouse_id", $$v)},expression:"purchase.warehouse_id"}})],1)],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"excel-container mt-4"},[_c('div',{staticClass:"d-flex justify-content-between mb-3 align-items-center"},[_c('h3',{staticClass:"mb-0 text-dark font-weight-bold"},[_vm._v("Purchase Worksheet (Grid View)")])]),_vm._v(" "),_c('div',{staticClass:"table-responsive worksheet-grid-wrapper"},[_c('table',{staticClass:"table table-bordered excel-grid"},[_c('thead',[_c('tr',[_c('th',{staticStyle:{"width":"20%"}},[_vm._v(_vm._s(_vm.$t('Supplier')))]),_vm._v(" "),_c('th',{staticStyle:{"width":"30%"}},[_vm._v(_vm._s(_vm.$t('Product')))]),_vm._v(" "),_c('th',{staticStyle:{"width":"10%"}},[_vm._v(_vm._s(_vm.$t('Qty')))]),_vm._v(" "),_c('th',{staticStyle:{"width":"15%"}},[_vm._v(_vm._s(_vm.$t('Amount')))]),_vm._v(" "),_c('th',{staticStyle:{"width":"20%"}},[_vm._v(_vm._s(_vm.$t('Note')))]),_vm._v(" "),_c('th',{staticStyle:{"width":"5%"}})])]),_vm._v(" "),_c('tbody',_vm._l((_vm.spreadsheetRows),function(row,index){return _c('tr',{key:index},[_c('td',{staticClass:"p-0 align-middle"},[_c('v-select',{ref:'row_supplier_' + index,refInFor:true,staticClass:"grid-v-select fill-height-select",attrs:{"options":_vm.suppliers.map(function (s) { return ({label: s.name, value: s.id}); }),"reduce":function (opt) { return opt.value; },"placeholder":_vm.$t('Supplier'),"append-to-body":""},on:{"input":function($event){return _vm.onGridSupplierChange(index)}},model:{value:(row.supplier_id),callback:function ($$v) {_vm.$set(row, "supplier_id", $$v)},expression:"row.supplier_id"}})],1),_vm._v(" "),_c('td',{staticClass:"p-0"},_vm._l((row.items),function(item,itemIndex){return _c('div',{key:itemIndex,staticClass:"grid-row-item d-flex align-items-center"},[_c('v-select',{ref:'row_product_' + index + '_' + itemIndex,refInFor:true,staticClass:"grid-v-select flex-grow-1",attrs:{"options":_vm.products.map(function (p) { return ({label: p.name + ' (' + p.code + ')', value: p}); }),"reduce":function (opt) { return opt.value; },"placeholder":_vm.$t('Select Product'),"append-to-body":""},on:{"input":function($event){return _vm.onGridProductChange(index, itemIndex)}},model:{value:(item.product_data),callback:function ($$v) {_vm.$set(item, "product_data", $$v)},expression:"item.product_data"}}),_vm._v(" "),(row.items.length > 1)?_c('i',{staticClass:"i-Close text-danger ml-1 mr-2 cursor-pointer",staticStyle:{"font-size":"1.2rem"},attrs:{"title":"Remove this item"},on:{"click":function($event){return _vm.removeItem(index, itemIndex)}}}):_vm._e()],1)}),0),_vm._v(" "),_c('td',{staticClass:"p-0"},_vm._l((row.items),function(item,itemIndex){return _c('div',{key:itemIndex,staticClass:"grid-row-item"},[_c('input',{directives:[{name:"model",rawName:"v-model.number",value:(item.quantity),expression:"item.quantity",modifiers:{"number":true}}],ref:'row_qty_' + index + '_' + itemIndex,refInFor:true,staticClass:"grid-input text-center",attrs:{"type":"text","inputmode":"decimal"},domProps:{"value":(item.quantity)},on:{"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.focusNextCell(index, itemIndex, 'amount')},"input":function($event){if($event.target.composing){ return; }_vm.$set(item, "quantity", _vm._n($event.target.value))},"blur":function($event){return _vm.$forceUpdate()}}})])}),0),_vm._v(" "),_c('td',{staticClass:"p-0"},_vm._l((row.items),function(item,itemIndex){return _c('div',{key:itemIndex,staticClass:"grid-row-item"},[_c('input',{directives:[{name:"model",rawName:"v-model.number",value:(item.amount),expression:"item.amount",modifiers:{"number":true}}],ref:'row_amount_' + index + '_' + itemIndex,refInFor:true,staticClass:"grid-input text-right",attrs:{"type":"text","inputmode":"decimal"},domProps:{"value":(item.amount)},on:{"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.focusNextCell(index, itemIndex, 'note')},"input":function($event){if($event.target.composing){ return; }_vm.$set(item, "amount", _vm._n($event.target.value))},"blur":function($event){return _vm.$forceUpdate()}}})])}),0),_vm._v(" "),_c('td',{staticClass:"p-0 align-middle"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(row.note),expression:"row.note"}],ref:'row_note_' + index,refInFor:true,staticClass:"grid-input fill-height-input",attrs:{"type":"text","placeholder":"Note..."},domProps:{"value":(row.note)},on:{"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.moveToNextRow(index)},"input":function($event){if($event.target.composing){ return; }_vm.$set(row, "note", $event.target.value)}}})]),_vm._v(" "),_c('td',{staticClass:"p-0 text-center align-middle"},[_c('div',{staticClass:"d-flex justify-content-center align-items-center fill-height-input",staticStyle:{"min-height":"60px"}},[_c('i',{staticClass:"i-Add text-success cursor-pointer mr-3",staticStyle:{"font-size":"1.5rem","font-weight":"bold"},attrs:{"title":"Add product to this bill"},on:{"click":function($event){return _vm.addItem(index)}}}),_vm._v(" "),_c('i',{staticClass:"i-Close-Window text-danger cursor-pointer",staticStyle:{"font-size":"1.5rem"},attrs:{"title":"Delete this bill"},on:{"click":function($event){return _vm.clearRow(index)}}})])])])}),0),_vm._v(" "),_c('tfoot',[_c('tr',[_c('td',{staticClass:"p-3 bg-light text-left",attrs:{"colspan":"6"}},[_c('b-button',{staticClass:"shadow-sm font-weight-bold",attrs:{"variant":"primary","size":"md"},on:{"click":_vm.addNewRow}},[_c('i',{staticClass:"i-Add"}),_vm._v(" Add New Row\n                      ")])],1)])])])]),_vm._v(" "),_c('div',{staticClass:"mt-4 text-right"},[_c('b-button',{staticClass:"px-5 font-weight-bold",staticStyle:{"font-size":"1.4rem"},attrs:{"variant":"success","size":"lg","disabled":_vm.is_bulk_processing},on:{"click":_vm.submitSpreadsheet}},[_c('i',{staticClass:"i-Yes mr-2"}),_vm._v(" SAVE ALL PURCHASES\n              ")])],1),_vm._v(" "),(_vm.is_bulk_processing)?_c('div',{staticClass:"spinner lg spinner-primary mt-3 text-center"}):_vm._e()])],1)],1)],1)],1):_vm._e(),_vm._v(" "),_c('div',{staticStyle:{"height":"400px"}})],1)}
var staticRenderFns = []
render._withStripped = true


/***/ })

}]);