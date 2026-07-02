"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["store_sale"],{

/***/ "./node_modules/@stripe/stripe-js/dist/stripe.esm.js":
/*!***********************************************************!*\
  !*** ./node_modules/@stripe/stripe-js/dist/stripe.esm.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadStripe": () => (/* binding */ loadStripe)
/* harmony export */ });
var V3_URL = 'https://js.stripe.com/v3';
var V3_URL_REGEX = /^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/;
var EXISTING_SCRIPT_MESSAGE = 'loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used';
var findScript = function findScript() {
  var scripts = document.querySelectorAll("script[src^=\"".concat(V3_URL, "\"]"));

  for (var i = 0; i < scripts.length; i++) {
    var script = scripts[i];

    if (!V3_URL_REGEX.test(script.src)) {
      continue;
    }

    return script;
  }

  return null;
};

var injectScript = function injectScript(params) {
  var queryString = params && !params.advancedFraudSignals ? '?advancedFraudSignals=false' : '';
  var script = document.createElement('script');
  script.src = "".concat(V3_URL).concat(queryString);
  var headOrBody = document.head || document.body;

  if (!headOrBody) {
    throw new Error('Expected document.body not to be null. Stripe.js requires a <body> element.');
  }

  headOrBody.appendChild(script);
  return script;
};

var registerWrapper = function registerWrapper(stripe, startTime) {
  if (!stripe || !stripe._registerWrapper) {
    return;
  }

  stripe._registerWrapper({
    name: 'stripe-js',
    version: "1.54.2",
    startTime: startTime
  });
};

var stripePromise = null;
var loadScript = function loadScript(params) {
  // Ensure that we only attempt to load Stripe.js at most once
  if (stripePromise !== null) {
    return stripePromise;
  }

  stripePromise = new Promise(function (resolve, reject) {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      // Resolve to null when imported server side. This makes the module
      // safe to import in an isomorphic code base.
      resolve(null);
      return;
    }

    if (window.Stripe && params) {
      console.warn(EXISTING_SCRIPT_MESSAGE);
    }

    if (window.Stripe) {
      resolve(window.Stripe);
      return;
    }

    try {
      var script = findScript();

      if (script && params) {
        console.warn(EXISTING_SCRIPT_MESSAGE);
      } else if (!script) {
        script = injectScript(params);
      }

      script.addEventListener('load', function () {
        if (window.Stripe) {
          resolve(window.Stripe);
        } else {
          reject(new Error('Stripe.js not available'));
        }
      });
      script.addEventListener('error', function () {
        reject(new Error('Failed to load Stripe.js'));
      });
    } catch (error) {
      reject(error);
      return;
    }
  });
  return stripePromise;
};
var initStripe = function initStripe(maybeStripe, args, startTime) {
  if (maybeStripe === null) {
    return null;
  }

  var stripe = maybeStripe.apply(undefined, args);
  registerWrapper(stripe, startTime);
  return stripe;
}; // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

// own script injection.

var stripePromise$1 = Promise.resolve().then(function () {
  return loadScript(null);
});
var loadCalled = false;
stripePromise$1["catch"](function (err) {
  if (!loadCalled) {
    console.warn(err);
  }
});
var loadStripe = function loadStripe() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  loadCalled = true;
  var startTime = Date.now();
  return stripePromise$1.then(function (maybeStripe) {
    return initStripe(maybeStripe, args, startTime);
  });
};




/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/create_sale.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/create_sale.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nprogress */ "./node_modules/nprogress/nprogress.js");
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nprogress__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _stripe_stripe_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @stripe/stripe-js */ "./node_modules/@stripe/stripe-js/dist/stripe.esm.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    title: "Create Sale"
  },
  data: function data() {
    return _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
      focused: false,
      timer: null,
      search_input: '',
      product_filter: [],
      stripe_key: '',
      stripe: {},
      cardElement: {},
      savedPaymentMethods: [],
      hasSavedPaymentMethod: false,
      useSavedPaymentMethod: false,
      selectedCard: null,
      card_id: '',
      is_new_credit_card: false,
      submit_showing_credit_card: false,
      selectedProductId: null,
      paymentProcessing: false,
      Submit_Processing_detail: false,
      isLoading: true,
      warehouses: [],
      clients: [],
      accounts: [],
      client: {},
      products: [],
      details: [],
      detail: {},
      sales: [],
      payment_methods: [],
      payment: {
        status: "pending",
        payment_method_id: "2",
        amount: "",
        received_amount: "",
        account_id: ""
      },
      selectedClientPoints: 0,
      showPointsSection: false,
      discount_from_points: 0,
      used_points: 0,
      clientIsEligible: false,
      pointsConverted: false,
      point_to_amount_rate: 0,
      transporters: [],
      sale: {
        id: "",
        date: new Date().toISOString().slice(0, 10),
        statut: "completed",
        notes: "",
        transporter_name: "",
        lr_number: "",
        client_id: "",
        warehouse_id: "",
        tax_rate: 0,
        TaxNet: 0,
        shipping: 0,
        discount: 0
      }
    }, "timer", null), "total", 0), "GrandTotal", 0), "sale_queue", []), "is_bulk_processing", false), "spreadsheetRows", [{
      client_id: null,
      note: '',
      items: [{
        product_data: null,
        product_id: null,
        variant_id: null,
        quantity: null,
        amount: null,
        sale_unit_id: null,
        tax_method: null,
        tax_percent: null
      }]
    }]), "units", []), "product", {
      id: "",
      product_type: "",
      code: "",
      stock: "",
      quantity: 1,
      discount: "",
      DiscountNet: "",
      discount_Method: "",
      name: "",
      sale_unit_id: "",
      fix_stock: "",
      fix_price: "",
      unitSale: "",
      Net_price: "",
      Unit_price: "",
      Total_price: "",
      subtotal: "",
      product_id: "",
      detail_id: "",
      taxe: "",
      tax_percent: "",
      tax_method: "",
      product_variant_id: "",
      is_imei: "",
      imei_number: ""
    });
  },
  computed: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_2__.mapGetters)(["currentUserPermissions", "currentUser"])), {}, {
    displaySavedPaymentMethods: function displaySavedPaymentMethods() {
      if (this.hasSavedPaymentMethod) {
        return true;
      } else {
        return false;
      }
    },
    displayFormNewCard: function displayFormNewCard() {
      if (this.useSavedPaymentMethod) {
        return false;
      } else {
        return true;
      }
    },
    isSelectedCard: function isSelectedCard() {
      var _this = this;
      return function (card) {
        return _this.selectedCard === card;
      };
    }
  }),
  methods: {
    showModal: function showModal() {
      this.$bvModal.show('open_scan');
    },
    onScan: function onScan(decodedText, decodedResult) {
      var code = decodedText;
      this.search_input = code;
      this.search();
      this.$bvModal.hide('open_scan');
    },
    loadStripe_payment: function loadStripe_payment() {
      var _this2 = this;
      return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var elements;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _context.n = 1;
              return (0,_stripe_stripe_js__WEBPACK_IMPORTED_MODULE_1__.loadStripe)("".concat(_this2.stripe_key));
            case 1:
              _this2.stripe = _context.v;
              elements = _this2.stripe.elements();
              _this2.cardElement = elements.create("card", {
                classes: {
                  base: "bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 p-3 leading-8 transition-colors duration-200 ease-in-out"
                }
              });
              _this2.cardElement.mount("#card-element");
            case 2:
              return _context.a(2);
          }
        }, _callee);
      }))();
    },
    handleFocus: function handleFocus() {
      this.focused = true;
    },
    handleBlur: function handleBlur() {
      this.focused = false;
    },
    Selected_customer: function Selected_customer(selectedClientId) {
      var _this3 = this;
      return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var client, response, data, _t;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _this3.payment.payment_method_id = 2;
              _this3.savedPaymentMethods = [];
              _this3.hasSavedPaymentMethod = false;
              _this3.useSavedPaymentMethod = false;
              _this3.selectedCard = null;
              _this3.card_id = '';
              _this3.is_new_credit_card = false;
              _this3.submit_showing_credit_card = false;
              _this3.selectedClientPoints = 0;
              _this3.discount_from_points = 0;
              _this3.used_points = 0;
              _this3.clientIsEligible = false;
              _this3.pointsConverted = false; // 👈 Reset conversion state
              _this3.sale.discount = 0; // 👈 Reset applied discount
              client = _this3.clients.find(function (c) {
                return c.id === selectedClientId;
              });
              if (!client) {
                _context2.n = 4;
                break;
              }
              _this3.client_name = client.name;
              _this3.selectedClientId = selectedClientId;
              _this3.sale.client_id = selectedClientId;
              if (client.preferred_transport) {
                _this3.sale.transporter_name = client.preferred_transport;
              } else {
                _this3.sale.transporter_name = "";
              }
              _this3.updateNote();
              _context2.p = 1;
              _context2.n = 2;
              return axios.get("/get_points_client/".concat(selectedClientId));
            case 2:
              response = _context2.v;
              data = response.data;
              if (data.is_royalty_eligible) {
                _this3.selectedClientPoints = data.points;
                _this3.clientIsEligible = true;
              } else {
                _this3.selectedClientPoints = 0;
                _this3.clientIsEligible = false;
              }
              _context2.n = 4;
              break;
            case 3:
              _context2.p = 3;
              _t = _context2.v;
              console.error('Error fetching client points:', _t);
            case 4:
              // ✅ Recalculate totals after client change
              _this3.CalculTotal();
            case 5:
              return _context2.a(2);
          }
        }, _callee2, null, [[1, 3]]);
      }))();
    },
    Selected_Transport: function Selected_Transport(value) {
      if (value === null) {
        this.sale.transporter_name = "";
      } else {
        this.sale.transporter_name = value;
      }
      this.updateNote();
    },
    updateNote: function updateNote() {
      var _this4 = this;
      var transporter = this.sale.transporter_name ? this.sale.transporter_name + " " : "";
      var lr_val = this.sale.lr_number ? this.sale.lr_number : "";
      var note = transporter + "LR: " + lr_val + "\n";
      var warehouse = this.warehouses.find(function (w) {
        return w.id === _this4.sale.warehouse_id;
      });
      if (warehouse && warehouse.shortcut) {
        note += warehouse.shortcut + ":";
      }
      this.sale.notes = note;
    },
    convertPointsToDiscount: function convertPointsToDiscount() {
      if (this.pointsConverted) {
        // Reset conversion
        this.discount_from_points = 0;
        this.used_points = 0;
        this.sale.discount = 0;
        this.pointsConverted = false;
      } else {
        // Calculate discount based on conversion rate
        var discount = this.selectedClientPoints * this.point_to_amount_rate;
        this.discount_from_points = discount;
        this.sale.discount = discount;
        this.used_points = this.selectedClientPoints;
        this.pointsConverted = true;
      }
      this.CalculTotal(); // Recalculate grand total
    },
    //---------------------- Event Select Payment Method ------------------------------\\
    Selected_PaymentMethod: function Selected_PaymentMethod(value) {
      var _this5 = this;
      return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              if (!(value == '1' || value == 1)) {
                _context3.n = 2;
                break;
              }
              _this5.savedPaymentMethods = [];
              _this5.submit_showing_credit_card = true;
              _this5.selectedCard = null;
              _this5.card_id = '';
              // Check if the customer has saved payment methods
              _context3.n = 1;
              return axios.get("/retrieve-customer?customerId=".concat(_this5.selectedClientId)).then(function (response) {
                // If the customer has saved payment methods, display them
                _this5.savedPaymentMethods = response.data.data;
                _this5.card_id = response.data.customer_default_source;
                _this5.hasSavedPaymentMethod = true;
                _this5.useSavedPaymentMethod = true;
                _this5.is_new_credit_card = false;
                _this5.submit_showing_credit_card = false;
              })["catch"](function (error) {
                // If the customer does not have saved payment methods, show the card element for them to enter their payment information
                _this5.hasSavedPaymentMethod = false;
                _this5.useSavedPaymentMethod = false;
                _this5.is_new_credit_card = true;
                _this5.card_id = '';
                setTimeout(function () {
                  _this5.loadStripe_payment();
                }, 1000);
                _this5.submit_showing_credit_card = false;
              });
            case 1:
              _context3.n = 3;
              break;
            case 2:
              _this5.hasSavedPaymentMethod = false;
              _this5.useSavedPaymentMethod = false;
              _this5.is_new_credit_card = false;
            case 3:
              return _context3.a(2);
          }
        }, _callee3);
      }))();
    },
    show_saved_credit_card: function show_saved_credit_card() {
      this.hasSavedPaymentMethod = true;
      this.useSavedPaymentMethod = true;
      this.is_new_credit_card = false;
      this.Selected_PaymentMethod(1);
    },
    show_new_credit_card: function show_new_credit_card() {
      var _this6 = this;
      this.selectedCard = null;
      this.card_id = '';
      this.useSavedPaymentMethod = false;
      this.hasSavedPaymentMethod = false;
      this.is_new_credit_card = true;
      setTimeout(function () {
        _this6.loadStripe_payment();
      }, 500);
    },
    selectCard: function selectCard(card) {
      this.selectedCard = card;
      this.card_id = card.card_id;
    },
    //---------------------- Event Select Status ------------------------------\\
    Selected_Status: function Selected_Status(value) {
      if (value != "completed") {
        this.payment.status = 'pending';
      }
    },
    //---------------------- Event Select Payment Status ------------------------------\\
    Selected_PaymentStatus: function Selected_PaymentStatus(value) {
      if (value == "paid") {
        var payment_amount = this.GrandTotal.toFixed(2);
        this.payment.amount = this.formatNumber(payment_amount, 2);
        this.payment.received_amount = this.formatNumber(payment_amount, 2);
      } else {
        this.payment.amount = 0;
        this.payment.received_amount = 0;
      }
    },
    //---------- keyup paid Amount
    Verified_paidAmount: function Verified_paidAmount() {
      if (isNaN(this.payment.amount)) {
        this.payment.amount = 0;
      } else if (this.payment.amount > this.payment.received_amount) {
        this.makeToast("warning", this.$t("Paying_amount_is_greater_than_Received_amount"), this.$t("Warning"));
        this.payment.amount = 0;
      } else if (this.payment.amount > this.GrandTotal) {
        this.makeToast("warning", this.$t("Paying_amount_is_greater_than_Grand_Total"), this.$t("Warning"));
        this.payment.amount = 0;
      }
    },
    //---------- keyup Received Amount
    Verified_Received_Amount: function Verified_Received_Amount() {
      if (isNaN(this.payment.received_amount)) {
        this.payment.received_amount = 0;
      }
    },
    //--- Submit Validate Create Sale
    Submit_Sale: function Submit_Sale() {
      var _this7 = this;
      this.$refs.create_sale.validate().then(function (success) {
        if (!success) {
          _this7.makeToast("danger", _this7.$t("Please_fill_the_form_correctly"), _this7.$t("Failed"));
        } else if (_this7.payment.amount > _this7.payment.received_amount) {
          _this7.makeToast("warning", _this7.$t("Paying_amount_is_greater_than_Received_amount"), _this7.$t("Warning"));
          _this7.payment.received_amount = 0;
        } else if (_this7.payment.amount > _this7.GrandTotal) {
          _this7.makeToast("warning", _this7.$t("Paying_amount_is_greater_than_Grand_Total"), _this7.$t("Warning"));
          _this7.payment.amount = 0;
        } else {
          _this7.Create_Sale();
        }
      });
    },
    //---Submit Validation Update Detail
    submit_Update_Detail: function submit_Update_Detail() {
      var _this8 = this;
      this.$refs.Update_Detail.validate().then(function (success) {
        if (!success) {
          return;
        } else {
          _this8.Update_Detail();
        }
      });
    },
    //---Validate State Fields
    getValidationState: function getValidationState(_ref2) {
      var dirty = _ref2.dirty,
        validated = _ref2.validated,
        _ref2$valid = _ref2.valid,
        valid = _ref2$valid === void 0 ? null : _ref2$valid;
      return dirty || validated ? valid : null;
    },
    //------ Toast
    makeToast: function makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    },
    //---------------------- get_units ------------------------------\\
    get_units: function get_units(value) {
      var _this9 = this;
      axios.get("get_units?id=" + value).then(function (_ref3) {
        var data = _ref3.data;
        return _this9.units = data;
      });
    },
    //------ Show Modal Update Detail Product
    Modal_Updat_Detail: function Modal_Updat_Detail(detail) {
      var _this0 = this;
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().start();
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().set(0.1);
      this.detail = {};
      this.get_units(detail.product_id);
      this.detail.detail_id = detail.detail_id;
      this.detail.sale_unit_id = detail.sale_unit_id;
      this.detail.product_type = detail.product_type;
      this.detail.name = detail.name;
      this.detail.Unit_price = detail.Unit_price;
      this.detail.fix_price = detail.fix_price;
      this.detail.fix_stock = detail.fix_stock;
      this.detail.stock = detail.stock;
      this.detail.tax_method = detail.tax_method;
      this.detail.discount_Method = detail.discount_Method;
      this.detail.discount = detail.discount;
      this.detail.quantity = detail.quantity;
      this.detail.tax_percent = detail.tax_percent;
      this.detail.is_imei = detail.is_imei;
      this.detail.imei_number = detail.imei_number;
      setTimeout(function () {
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
        _this0.$bvModal.show("form_Update_Detail");
      }, 1000);
    },
    //------ Submit Update Detail Product
    Update_Detail: function Update_Detail() {
      var _this1 = this;
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().start();
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().set(0.1);
      this.Submit_Processing_detail = true;
      for (var i = 0; i < this.details.length; i++) {
        if (this.details[i].detail_id === this.detail.detail_id) {
          // this.convert_unit();
          for (var k = 0; k < this.units.length; k++) {
            if (this.units[k].id == this.detail.sale_unit_id) {
              if (this.units[k].operator == '/') {
                this.details[i].stock = this.detail.fix_stock * this.units[k].operator_value;
                this.details[i].unitSale = this.units[k].ShortName;
              } else {
                this.details[i].stock = this.detail.fix_stock / this.units[k].operator_value;
                this.details[i].unitSale = this.units[k].ShortName;
              }
            }
          }
          this.details[i].Unit_price = this.detail.Unit_price;
          this.details[i].tax_percent = this.detail.tax_percent;
          this.details[i].tax_method = this.detail.tax_method;
          this.details[i].discount_Method = this.detail.discount_Method;
          this.details[i].discount = this.detail.discount;
          this.details[i].sale_unit_id = this.detail.sale_unit_id;
          this.details[i].imei_number = this.detail.imei_number;
          this.details[i].product_type = this.detail.product_type;
          if (this.details[i].discount_Method == "2") {
            //Fixed
            this.details[i].DiscountNet = this.details[i].discount;
          } else {
            //Percentage %
            this.details[i].DiscountNet = parseFloat(this.details[i].Unit_price * this.details[i].discount / 100);
          }
          if (this.details[i].tax_method == "1") {
            //Exclusive
            this.details[i].Net_price = parseFloat(this.details[i].Unit_price - this.details[i].DiscountNet);
            this.details[i].taxe = parseFloat(this.details[i].tax_percent * (this.details[i].Unit_price - this.details[i].DiscountNet) / 100);
          } else {
            //Inclusive
            this.details[i].taxe = parseFloat((this.details[i].Unit_price - this.details[i].DiscountNet) * (this.details[i].tax_percent / 100));
            this.details[i].Net_price = parseFloat(this.details[i].Unit_price - this.details[i].taxe - this.details[i].DiscountNet);
          }
          this.$forceUpdate();
        }
      }
      this.CalculTotal();
      setTimeout(function () {
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
        _this1.Submit_Processing_detail = false;
        _this1.$bvModal.hide("form_Update_Detail");
      }, 1000);
    },
    Manual_Amount_Update: function Manual_Amount_Update(detail) {
      this.CalculTotal();
    },
    Quick_Product_Select: function Quick_Product_Select(product) {
      if (product) {
        this.SearchProduct(product);
        this.selectedProductId = null;
      }
    },
    search: function search() {
      var _this10 = this;
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      if (this.search_input.length < 2) {
        return this.product_filter = [];
      }
      if (this.sale.warehouse_id != "" && this.sale.warehouse_id != null) {
        this.timer = setTimeout(function () {
          var barcode = _this10.search_input.trim();
          var weight = null;
          // Check if the barcode is from a weighing scale (13 digits)
          if (barcode.length === 13 && !isNaN(barcode)) {
            // Find the product by product code
            var product = _this10.products.find(function (prod) {
              return prod.code === barcode;
            });
            if (product) {
              _this10.SearchProduct(product, weight);
              return;
            } else {
              var productCode = barcode.substring(0, 7); // First 7 digits → Product Code
              var _weight = parseFloat(barcode.substring(7, 12)) / 1000; // Convert weight (grams to kg)
              var _product = _this10.products.find(function (prod) {
                return prod.code === productCode;
              });
              if (_product) {
                _product.quantity = _weight; // Assign weight to product
                _this10.SearchProduct(_product, _weight);
                return;
              }
            }
            _this10.makeToast("danger", "Invalid product code scanned", _this10.$t("Error"));
            _this10.search_input = '';
            _this10.$refs.product_autocomplete.value = "";
            _this10.product_filter = [];
          }
          // else{
          //   //  No product found - Display Error Alert
          //   this.makeToast("danger", "Invalid product code scanned", this.$t("Error"));
          //   this.search_input= '';
          //   this.$refs.product_autocomplete.value = "";
          //   this.product_filter = [];

          // }

          // Regular product search (for non-weighing scale barcodes)
          var product_filter = _this10.products.filter(function (product) {
            return product.code === _this10.search_input || product.barcode.includes(_this10.search_input);
          });
          if (product_filter.length === 1) {
            _this10.SearchProduct(product_filter[0], weight);
          } else {
            _this10.product_filter = _this10.products.filter(function (product) {
              return product.name.toLowerCase().includes(_this10.search_input.toLowerCase()) || product.code.toLowerCase().includes(_this10.search_input.toLowerCase()) || product.barcode.toLowerCase().includes(_this10.search_input.toLowerCase());
            });
          }
        }, 800);
      } else {
        this.makeToast("warning", this.$t("SelectWarehouse"), this.$t("Warning"));
      }
    },
    Get_Queued_Qty: function Get_Queued_Qty(product_id, variant_id) {
      var total = 0;
      this.sale_queue.forEach(function (sale) {
        sale.details.forEach(function (detail) {
          if (detail.product_id === product_id && detail.product_variant_id === variant_id) {
            total += detail.quantity;
          }
        });
      });
      return total;
    },
    //------------------------- get Result Value Search Product
    getResultValue: function getResultValue(result) {
      var queued = this.Get_Queued_Qty(result.id, result.product_variant_id);
      var stock = result.qte_sale - queued;
      return result.code + " (" + result.name + ") [Stock: " + stock + "]";
    },
    //------------------------- Submit Search Product
    SearchProduct: function SearchProduct(result) {
      var weight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      this.product = {};
      if (this.details.length > 0 && this.details.some(function (detail) {
        return detail.code === result.code;
      })) {
        this.makeToast("warning", this.$t("AlreadyAdd"), this.$t("Warning"));
      } else {
        if (result.product_type == 'is_service') {
          this.product.quantity = 0;
          this.product.code = result.code;
          this.product.stock = '---';
          this.product.fix_stock = '---';
        } else {
          var queued = this.Get_Queued_Qty(result.id, result.product_variant_id);
          this.product.code = result.code;
          this.product.stock = result.qte_sale - queued;
          this.product.fix_stock = result.qte - queued;

          // Check if it's a weighing scale product
          if (weight !== null) {
            this.product.quantity = weight; // Assign extracted weight
          } else {
            this.product.quantity = 0;
          }
        }
        this.product.product_variant_id = result.product_variant_id;
        this.Get_Product_Details(result.id, result.product_variant_id);
      }
      this.search_input = '';
      this.$refs.product_autocomplete.value = "";
      this.product_filter = [];
    },
    //---------------------- Event Select Warehouse ------------------------------\\
    Selected_Warehouse: function Selected_Warehouse(value) {
      this.search_input = '';
      this.product_filter = [];
      this.Get_Products_By_Warehouse(value);
      this.updateNote();
    },
    //------------------------------------ Get Products By Warehouse -------------------------\\
    Get_Products_By_Warehouse: function Get_Products_By_Warehouse(id) {
      var _this11 = this;
      // Start the progress bar.
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().start();
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().set(0.1);
      axios.get("get_Products_by_warehouse/" + id + "?stock=" + 1 + "&is_sale=" + 1 + "&product_service=" + 1 + "&product_combo=" + 1).then(function (response) {
        _this11.products = response.data;
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
      })["catch"](function (error) {});
    },
    //----------------------------------------- Add Product to order list -------------------------\\
    add_product: function add_product() {
      var _this12 = this;
      if (this.details.length > 0) {
        this.Last_Detail_id();
      } else if (this.details.length === 0) {
        this.product.detail_id = 1;
      }
      this.details.push(this.product);
      this.$nextTick(function () {
        var lastIdx = _this12.details.length - 1;
        if (_this12.$refs['qtyInput_' + lastIdx] && _this12.$refs['qtyInput_' + lastIdx][0]) {
          _this12.$refs['qtyInput_' + lastIdx][0].focus();
        }
      });
      if (this.product.is_imei) {
        this.Modal_Updat_Detail(this.product);
      }
    },
    //-----------------------------------Verified QTY ------------------------------\\
    Verified_Qty: function Verified_Qty(detail, id) {
      for (var i = 0; i < this.details.length; i++) {
        if (this.details[i].detail_id === id) {
          if (isNaN(detail.quantity)) {
            this.details[i].quantity = 1;
          }
          this.details[i].quantity = detail.quantity;
        }
      }
      this.CalculTotal();
      this.$forceUpdate();
    },
    //------------------------------Formetted Numbers -------------------------\\
    formatNumber: function formatNumber(number, dec) {
      var value = (typeof number === "string" ? number : number.toString()).split(".");
      if (dec <= 0) return value[0];
      var formated = value[1] || "";
      if (formated.length > dec) return "".concat(value[0], ".").concat(formated.substr(0, dec));
      while (formated.length < dec) formated += "0";
      return "".concat(value[0], ".").concat(formated);
    },
    //-----------------------------------------Calcul Total ------------------------------\\
    CalculTotal: function CalculTotal() {
      this.total = 0;
      for (var i = 0; i < this.details.length; i++) {
        this.details[i].subtotal = parseFloat(parseFloat(this.details[i].subtotal).toFixed(2));
        this.total = parseFloat(this.total + this.details[i].subtotal);
      }
      var total_without_discount = parseFloat(this.total - this.sale.discount);
      this.sale.TaxNet = parseFloat(total_without_discount * this.sale.tax_rate / 100);
      this.GrandTotal = parseFloat(total_without_discount + this.sale.TaxNet + this.sale.shipping);
      var grand_total = this.GrandTotal.toFixed(2);
      this.GrandTotal = parseFloat(grand_total);
      if (this.payment.status == 'paid') {
        this.payment.amount = this.formatNumber(this.GrandTotal, 2);
      }
    },
    //-----------------------------------Delete Detail Product ------------------------------\\
    delete_Product_Detail: function delete_Product_Detail(id) {
      for (var i = 0; i < this.details.length; i++) {
        if (id === this.details[i].detail_id) {
          this.details.splice(i, 1);
          this.CalculTotal();
        }
      }
    },
    //-----------------------------------verified Order List ------------------------------\\
    verifiedForm: function verifiedForm() {
      if (this.details.length <= 0) {
        this.makeToast("warning", this.$t("AddProductToList"), this.$t("Warning"));
        return false;
      } else {
        var count = 0;
        for (var i = 0; i < this.details.length; i++) {
          if (this.details[i].quantity == "" || this.details[i].quantity === 0) {
            count += 1;
          }
        }
        if (count > 0) {
          this.makeToast("warning", this.$t("AddQuantity"), this.$t("Warning"));
          return false;
        } else {
          return true;
        }
      }
    },
    //---------- keyup OrderTax
    keyup_OrderTax: function keyup_OrderTax() {
      if (isNaN(this.sale.tax_rate)) {
        this.sale.tax_rate = 0;
      } else if (this.sale.tax_rate == '') {
        this.sale.tax_rate = 0;
        this.CalculTotal();
      } else {
        this.CalculTotal();
      }
    },
    //---------- keyup Discount
    keyup_Discount: function keyup_Discount() {
      if (isNaN(this.sale.discount)) {
        this.sale.discount = 0;
      } else if (this.sale.discount == '') {
        this.sale.discount = 0;
        this.CalculTotal();
      } else {
        this.CalculTotal();
      }
    },
    //---------- keyup Shipping
    keyup_Shipping: function keyup_Shipping() {
      if (isNaN(this.sale.shipping)) {
        this.sale.shipping = 0;
      } else if (this.sale.shipping == '') {
        this.sale.shipping = 0;
        this.CalculTotal();
      } else {
        this.CalculTotal();
      }
    },
    processPayment: function processPayment() {
      var _this13 = this;
      return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var _yield$_this13$stripe, token, error;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              _this13.paymentProcessing = true;
              _context4.n = 1;
              return _this13.stripe.createToken(_this13.cardElement);
            case 1:
              _yield$_this13$stripe = _context4.v;
              token = _yield$_this13$stripe.token;
              error = _yield$_this13$stripe.error;
              if (error) {
                _this13.paymentProcessing = false;
                nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
                _this13.makeToast("danger", _this13.$t("InvalidData"), _this13.$t("Failed"));
              } else {
                axios.post("sales", {
                  date: _this13.sale.date,
                  client_id: _this13.selectedClientId,
                  warehouse_id: _this13.sale.warehouse_id,
                  statut: _this13.sale.statut,
                  notes: _this13.sale.notes,
                  tax_rate: _this13.sale.tax_rate ? _this13.sale.tax_rate : 0,
                  TaxNet: _this13.sale.TaxNet ? _this13.sale.TaxNet : 0,
                  discount: _this13.sale.discount ? _this13.sale.discount : 0,
                  shipping: _this13.sale.shipping ? _this13.sale.shipping : 0,
                  GrandTotal: _this13.GrandTotal,
                  details: _this13.details,
                  payment: _this13.payment,
                  amount: parseFloat(_this13.payment.amount).toFixed(2),
                  received_amount: parseFloat(_this13.payment.received_amount).toFixed(2),
                  change: parseFloat(_this13.payment.received_amount - _this13.payment.amount).toFixed(2),
                  token: token.id,
                  is_new_credit_card: _this13.is_new_credit_card,
                  selectedCard: _this13.selectedCard,
                  card_id: _this13.card_id,
                  discount_from_points: _this13.discount_from_points,
                  used_points: _this13.used_points
                }).then(function (response) {
                  _this13.paymentProcessing = false;
                  _this13.makeToast("success", _this13.$t("Successfully_Created"), _this13.$t("Success"));
                  nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
                  _this13.$router.push({
                    name: "index_sales"
                  });
                })["catch"](function (error) {
                  _this13.paymentProcessing = false;
                  nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
                  _this13.makeToast("danger", _this13.$t("InvalidData"), _this13.$t("Failed"));
                });
              }
            case 2:
              return _context4.a(2);
          }
        }, _callee4);
      }))();
    },
    resizeTextarea: function resizeTextarea() {
      var element = this.$refs.noteTextarea;
      element.style.height = "auto";
      element.style.height = element.scrollHeight + "px";
    },
    Create_Sale: function Create_Sale() {
      var _this14 = this;
      if (this.verifiedForm()) {
        // Start the progress bar.
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().start();
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().set(0.1);
        if ((this.payment.payment_method_id == "1" || this.payment.payment_method_id == 1) && this.is_new_credit_card) {
          if (this.stripe_key != '') {
            this.processPayment();
          } else {
            this.makeToast("danger", this.$t("credit_card_account_not_available"), this.$t("Failed"));
            nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
          }
        } else {
          this.paymentProcessing = true;
          axios.post("sales", {
            date: this.sale.date,
            client_id: this.selectedClientId,
            warehouse_id: this.sale.warehouse_id,
            statut: this.sale.statut,
            notes: this.sale.notes,
            tax_rate: this.sale.tax_rate ? this.sale.tax_rate : 0,
            TaxNet: this.sale.TaxNet ? this.sale.TaxNet : 0,
            discount: this.sale.discount ? this.sale.discount : 0,
            shipping: this.sale.shipping ? this.sale.shipping : 0,
            GrandTotal: this.GrandTotal,
            details: this.details,
            payment: this.payment,
            amount: parseFloat(this.payment.amount).toFixed(2),
            received_amount: parseFloat(this.payment.received_amount).toFixed(2),
            change: parseFloat(this.payment.received_amount - this.payment.amount).toFixed(2),
            is_new_credit_card: this.is_new_credit_card,
            selectedCard: this.selectedCard,
            card_id: this.card_id,
            discount_from_points: this.discount_from_points,
            used_points: this.used_points
          }).then(function (response) {
            _this14.makeToast("success", _this14.$t("Successfully_Created"), _this14.$t("Success"));
            nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
            _this14.paymentProcessing = false;
            _this14.$router.push({
              name: "index_sales"
            });
          })["catch"](function (error) {
            nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
            _this14.paymentProcessing = false;
            _this14.makeToast("danger", _this14.$t("InvalidData"), _this14.$t("Failed"));
          });
        }
      }
    },
    //--------------------------------- Add Sale to Queue -------------------------\\
    Add_To_Queue: function Add_To_Queue() {
      var _this15 = this;
      this.$refs.create_sale.validate().then(function (success) {
        if (!success) {
          _this15.makeToast("danger", _this15.$t("Please_fill_the_form_correctly"), _this15.$t("Failed"));
        } else if (_this15.details.length <= 0) {
          _this15.makeToast("warning", _this15.$t("AddProductToList"), _this15.$t("Warning"));
        } else {
          // Clone the current sale and its details
          var sale_to_add = {
            date: _this15.sale.date,
            client_id: _this15.selectedClientId,
            client_name: _this15.clients.find(function (c) {
              return c.id === _this15.selectedClientId;
            }).name,
            warehouse_id: _this15.sale.warehouse_id,
            warehouse_name: _this15.warehouses.find(function (w) {
              return w.id === _this15.sale.warehouse_id;
            }).name,
            statut: _this15.sale.statut,
            notes: _this15.sale.notes,
            tax_rate: _this15.sale.tax_rate ? _this15.sale.tax_rate : 0,
            TaxNet: _this15.sale.TaxNet ? _this15.sale.TaxNet : 0,
            discount: _this15.sale.discount ? _this15.sale.discount : 0,
            shipping: _this15.sale.shipping ? _this15.sale.shipping : 0,
            GrandTotal: _this15.GrandTotal,
            details: JSON.parse(JSON.stringify(_this15.details)),
            payment: JSON.parse(JSON.stringify(_this15.payment)),
            discount_from_points: _this15.discount_from_points,
            used_points: _this15.used_points
          };
          _this15.sale_queue.push(sale_to_add);

          // Reset specific parts of the form but keep Warehouse and Date
          _this15.details = [];
          _this15.selectedClientId = null;
          _this15.sale.client_id = "";
          _this15.sale.notes = "";
          _this15.sale.transporter_name = "";
          _this15.sale.lr_number = "";
          _this15.sale.discount = 0;
          _this15.sale.shipping = 0;
          _this15.payment = {
            status: "pending",
            payment_method_id: "2",
            amount: "",
            received_amount: "",
            account_id: ""
          };
          _this15.discount_from_points = 0;
          _this15.used_points = 0;
          _this15.CalculTotal();
          _this15.makeToast("success", "Sale added to queue", "Success");
          _this15.$nextTick(function () {
            if (_this15.$refs.customer_select) {
              var input = _this15.$refs.customer_select.$el.querySelector('input');
              if (input) input.focus();
            }
          });
        }
      });
    },
    //--------------------------------- Remove from Queue -------------------------\\
    Remove_From_Queue: function Remove_From_Queue(index) {
      this.sale_queue.splice(index, 1);
    },
    //--------------------------------- Submit Bulk Sales -------------------------\\
    Submit_Bulk_Sales: function Submit_Bulk_Sales() {
      var _this16 = this;
      if (this.sale_queue.length <= 0) {
        this.makeToast("warning", "Queue is empty", "Warning");
        return;
      }
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().start();
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().set(0.1);
      this.is_bulk_processing = true;
      axios.post("sales/bulk", {
        sales: this.sale_queue
      }).then(function (response) {
        _this16.makeToast("success", "All sales processed successfully", _this16.$t("Success"));
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
        _this16.is_bulk_processing = false;
        _this16.sale_queue = [];
        _this16.$router.push({
          name: "index_sales"
        });
      })["catch"](function (error) {
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
        _this16.is_bulk_processing = false;
        _this16.makeToast("danger", "Bulk processing failed", _this16.$t("Failed"));
      });
    },
    onGridCustomerChange: function onGridCustomerChange(index) {
      var _this17 = this;
      this.$nextTick(function () {
        var refName = 'row_product_' + index + '_0';
        if (_this17.$refs[refName] && _this17.$refs[refName][0]) {
          _this17.$refs[refName][0].$el.querySelector('input').focus();
        }
      });
    },
    addNewRow: function addNewRow() {
      var _this18 = this;
      this.spreadsheetRows.push({
        client_id: null,
        note: this.generateAutoNote(),
        items: [{
          product_data: null,
          product_id: null,
          variant_id: null,
          quantity: null,
          amount: null,
          sale_unit_id: null,
          tax_method: null,
          tax_percent: null
        }]
      });
      this.$nextTick(function () {
        var nextIndex = _this18.spreadsheetRows.length - 1;
        if (_this18.$refs['row_client_' + nextIndex]) {
          _this18.$refs['row_client_' + nextIndex][0].$el.querySelector('input').focus();
        }
      });
    },
    addItem: function addItem(rowIndex) {
      var _this19 = this;
      this.spreadsheetRows[rowIndex].items.push({
        product_data: null,
        product_id: null,
        variant_id: null,
        quantity: null,
        amount: null,
        sale_unit_id: null,
        tax_method: null,
        tax_percent: null
      });
      this.$nextTick(function () {
        var nextItemIndex = _this19.spreadsheetRows[rowIndex].items.length - 1;
        var refName = 'row_product_' + rowIndex + '_' + nextItemIndex;
        if (_this19.$refs[refName] && _this19.$refs[refName][0]) {
          _this19.$refs[refName][0].$el.querySelector('input').focus();
        }
      });
    },
    removeItem: function removeItem(rowIndex, itemIndex) {
      if (this.spreadsheetRows[rowIndex].items.length > 1) {
        this.spreadsheetRows[rowIndex].items.splice(itemIndex, 1);
      }
    },
    generateAutoNote: function generateAutoNote() {
      var _this20 = this;
      var note = "";
      if (this.sale.transporter_name) note += this.sale.transporter_name + " ";

      // Always show LR: even if number is empty, or show the number if exists
      note += "LR: " + (this.sale.lr_number ? this.sale.lr_number : "") + " ";

      // Warehouse specific prefix
      var warehouse = this.warehouses.find(function (w) {
        return w.id === _this20.sale.warehouse_id;
      });
      if (warehouse && warehouse.shortcut) {
        note += warehouse.shortcut + ": ";
      }
      return note.trim();
    },
    onGridProductChange: function onGridProductChange(rowIndex, itemIndex) {
      var _this21 = this;
      var row = this.spreadsheetRows[rowIndex];
      var item = row.items[itemIndex];
      if (item.product_data) {
        item.product_id = item.product_data.id;
        item.variant_id = item.product_data.product_variant_id || null;
        item.amount = item.product_data.Net_price;

        // Auto-fill note if it's currently empty or just the default
        if (!row.note || row.note === "") {
          row.note = this.generateAutoNote();
        }

        // Fetch full product details required by the backend
        axios.get("/show_product_data/" + item.product_id + "/" + item.variant_id).then(function (response) {
          item.sale_unit_id = response.data.sale_unit_id;
          item.tax_method = response.data.tax_method;
          item.tax_percent = response.data.tax_percent;
        });
        this.$nextTick(function () {
          var refName = 'row_qty_' + rowIndex + '_' + itemIndex;
          if (_this21.$refs[refName] && _this21.$refs[refName][0]) {
            _this21.$refs[refName][0].focus();
          }
        });
      }
    },
    focusNextCell: function focusNextCell(index, itemIndex, type) {
      var _this22 = this;
      this.$nextTick(function () {
        if (type === 'note') {
          var refName = 'row_note_' + index;
          if (_this22.$refs[refName]) {
            if (_this22.$refs[refName][0]) {
              _this22.$refs[refName][0].focus();
            } else {
              _this22.$refs[refName].focus();
            }
          }
        } else {
          var _refName = 'row_' + type + '_' + index + '_' + itemIndex;
          if (_this22.$refs[_refName] && _this22.$refs[_refName][0]) {
            _this22.$refs[_refName][0].focus();
          }
        }
      });
    },
    moveToNextRow: function moveToNextRow(index) {
      var _this23 = this;
      if (index === this.spreadsheetRows.length - 1) {
        this.addNewRow();
      } else {
        this.$nextTick(function () {
          var nextIndex = index + 1;
          var refName = 'row_product_' + nextIndex + '_0';
          if (_this23.$refs[refName] && _this23.$refs[refName][0]) {
            _this23.$refs[refName][0].$el.querySelector('input').focus();
          }
        });
      }
    },
    clearRow: function clearRow(index) {
      if (this.spreadsheetRows.length > 1) {
        this.spreadsheetRows.splice(index, 1);
      } else {
        this.$set(this.spreadsheetRows, 0, {
          client_id: null,
          note: this.generateAutoNote(),
          items: [{
            product_data: null,
            product_id: null,
            variant_id: null,
            quantity: null,
            amount: null,
            sale_unit_id: null,
            tax_method: null,
            tax_percent: null
          }]
        });
      }
    },
    submitSpreadsheet: function submitSpreadsheet() {
      var _this24 = this;
      var validRows = this.spreadsheetRows.filter(function (r) {
        return r.client_id && r.items.some(function (item) {
          return item.product_id;
        });
      });
      if (validRows.length === 0) {
        this.makeToast("warning", "Please fill at least one row", "Warning");
        return;
      }
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().start();
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().set(0.1);
      this.is_bulk_processing = true;

      // Transform rows to match the backend expected format
      var salesData = validRows.map(function (row) {
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
            Unit_price: item.quantity > 0 ? parseFloat((parseFloat(item.amount || 0) / parseFloat(item.quantity)).toFixed(2)) : 0,
            subtotal: parseFloat(parseFloat(item.amount || 0).toFixed(2)),
            discount: 0,
            taxe: 0,
            tax_percent: item.tax_percent || 0,
            tax_method: item.tax_method || 1,
            discount_Method: "1",
            sale_unit_id: item.sale_unit_id,
            imei_number: ""
          };
        });
        return {
          date: _this24.sale.date,
          client_id: row.client_id,
          warehouse_id: _this24.sale.warehouse_id,
          statut: "completed",
          notes: row.note,
          tax_rate: 0,
          TaxNet: 0,
          discount: 0,
          shipping: 0,
          GrandTotal: parseFloat(grandTotal.toFixed(2)),
          paid_amount: 0,
          payment_statut: 'unpaid',
          transporter_name: _this24.sale.transporter_name,
          lr_number: _this24.sale.lr_number,
          details: details,
          payment: {
            status: "pending",
            payment_method_id: 2,
            amount: 0,
            received_amount: 0,
            account_id: null
          }
        };
      });
      axios.post("sales/bulk", {
        sales: salesData
      }).then(function (response) {
        _this24.makeToast("success", "All sales saved successfully", "Success");
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
        _this24.is_bulk_processing = false;
        _this24.$router.push({
          name: "index_sales"
        });
      })["catch"](function (error) {
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
        _this24.is_bulk_processing = false;
        _this24.makeToast("danger", "Failed to save sales", "Failed");
      });
    },
    getClientName: function getClientName(id) {
      var client = this.clients.find(function (c) {
        return c.id === id;
      });
      return client ? client.name : '';
    },
    getSaleItemsCount: function getSaleItemsCount(sale) {
      return sale.details.reduce(function (acc, d) {
        return acc + d.quantity;
      }, 0);
    },
    getQueueTotal: function getQueueTotal() {
      var total = this.sale_queue.reduce(function (acc, s) {
        return acc + s.GrandTotal;
      }, 0);
      return total.toFixed(2);
    },
    //-------------------------------- Get Last Detail Id -------------------------\\
    Last_Detail_id: function Last_Detail_id() {
      this.product.detail_id = 0;
      var len = this.details.length;
      this.product.detail_id = this.details[len - 1].detail_id + 1;
    },
    //---------------------------------Get Product Details ------------------------\\
    Get_Product_Details: function Get_Product_Details(product_id, variant_id) {
      var _this25 = this;
      axios.get("/show_product_data/" + product_id + "/" + variant_id).then(function (response) {
        _this25.product.discount = response.data.discount;
        _this25.product.DiscountNet = response.data.DiscountNet;
        _this25.product.discount_Method = response.data.discount_method;
        _this25.product.product_id = response.data.id;
        _this25.product.product_type = response.data.product_type;
        _this25.product.name = response.data.name;
        _this25.product.Net_price = response.data.Net_price;
        _this25.product.Unit_price = response.data.Unit_price;
        _this25.product.taxe = response.data.tax_price;
        _this25.product.tax_method = response.data.tax_method;
        _this25.product.tax_percent = response.data.tax_percent;
        _this25.product.unitSale = response.data.unitSale;
        _this25.product.fix_price = response.data.fix_price;
        _this25.product.sale_unit_id = response.data.sale_unit_id;
        _this25.product.is_imei = response.data.is_imei;
        _this25.product.imei_number = '';
        _this25.add_product();
        _this25.CalculTotal();
      });
    },
    //---------------------------------------Get Elements ------------------------------\\
    GetElements: function GetElements() {
      var _this26 = this;
      axios.get("sales/create").then(function (response) {
        _this26.clients = response.data.clients;
        _this26.warehouses = response.data.warehouses;
        _this26.transporters = response.data.transporters;
        _this26.accounts = response.data.accounts;
        _this26.payment_methods = response.data.payment_methods;
        _this26.stripe_key = response.data.stripe_key;
        _this26.point_to_amount_rate = response.data.point_to_amount_rate;
        _this26.isLoading = false;
      })["catch"](function (response) {
        setTimeout(function () {
          _this26.isLoading = false;
        }, 500);
      });
    }
  },
  //----------------------------- Created function-------------------
  created: function created() {
    this.GetElements();
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/create_sale.vue?vue&type=style&index=0&id=e1ed42cc&scoped=true&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/create_sale.vue?vue&type=style&index=0&id=e1ed42cc&scoped=true&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.excel-container[data-v-e1ed42cc] {\n  padding: 20px;\n  padding-bottom: 400px; /* Massive space at bottom for scrolling */\n  background: #fff;\n}\n.excel-grid[data-v-e1ed42cc] {\n  border: 1px solid #ddd;\n  border-collapse: collapse;\n  width: 100%;\n}\n.excel-grid th[data-v-e1ed42cc] {\n  background: #f4f4f4;\n  padding: 10px;\n  border: 1px solid #ddd;\n  font-size: 1rem;\n  font-weight: 600;\n}\n.excel-grid td[data-v-e1ed42cc] {\n  padding: 0;\n  border: 1px solid #ddd;\n  min-height: 60px;\n  vertical-align: middle;\n}\n.grid-input[data-v-e1ed42cc] {\n  width: 100%;\n  height: 60px;\n  border: none;\n  padding: 10px;\n  font-size: 1.3rem;\n  outline: none;\n  background: transparent;\n  line-height: 1.5;\n}\n.grid-input[data-v-e1ed42cc]:focus {\n  background: #fff;\n  box-shadow: inset 0 0 0 2px #716aca;\n}\n.grid-v-select[data-v-e1ed42cc] .vs__dropdown-toggle {\n  border: none !important;\n  background: transparent !important;\n  border-radius: 0;\n  min-height: 60px;\n  font-size: 1.3rem;\n  display: flex;\n  align-items: center;\n}\n/* Top level warehouse and date text size */\n.main-content[data-v-e1ed42cc] .v-select, .main-content[data-v-e1ed42cc] input, .main-content[data-v-e1ed42cc] label {\n  font-size: 1.3rem !important;\n}\n.main-content[data-v-e1ed42cc] .vs__selected {\n  font-size: 1.3rem !important;\n  white-space: normal;\n}\n.grid-v-select.vs--open[data-v-e1ed42cc] .vs__dropdown-toggle {\n  background: #fff !important;\n  box-shadow: inset 0 0 0 2px #716aca;\n}\n.worksheet-grid-wrapper[data-v-e1ed42cc] {\n  overflow: visible;\n}\n.grid-row-item[data-v-e1ed42cc] {\n  display: flex;\n  align-items: center;\n  border-bottom: 1px solid #ddd;\n  height: 60px;\n}\n.grid-row-item[data-v-e1ed42cc]:last-child {\n  border-bottom: none;\n}\n.fill-height-input[data-v-e1ed42cc] {\n  height: 100%;\n  min-height: 60px;\n}\n.fill-height-select[data-v-e1ed42cc] .vs__dropdown-toggle {\n  height: 100%;\n  min-height: 60px;\n  display: flex;\n  align-items: center;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/create_sale.vue?vue&type=style&index=1&id=e1ed42cc&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/create_sale.vue?vue&type=style&index=1&id=e1ed42cc&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/create_sale.vue?vue&type=style&index=0&id=e1ed42cc&scoped=true&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/create_sale.vue?vue&type=style&index=0&id=e1ed42cc&scoped=true&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_create_sale_vue_vue_type_style_index_0_id_e1ed42cc_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./create_sale.vue?vue&type=style&index=0&id=e1ed42cc&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/create_sale.vue?vue&type=style&index=0&id=e1ed42cc&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_create_sale_vue_vue_type_style_index_0_id_e1ed42cc_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_create_sale_vue_vue_type_style_index_0_id_e1ed42cc_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/create_sale.vue?vue&type=style&index=1&id=e1ed42cc&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/create_sale.vue?vue&type=style&index=1&id=e1ed42cc&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_create_sale_vue_vue_type_style_index_1_id_e1ed42cc_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./create_sale.vue?vue&type=style&index=1&id=e1ed42cc&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/create_sale.vue?vue&type=style&index=1&id=e1ed42cc&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_create_sale_vue_vue_type_style_index_1_id_e1ed42cc_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_create_sale_vue_vue_type_style_index_1_id_e1ed42cc_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/sales/create_sale.vue":
/*!*************************************************************!*\
  !*** ./resources/src/views/app/pages/sales/create_sale.vue ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _create_sale_vue_vue_type_template_id_e1ed42cc_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create_sale.vue?vue&type=template&id=e1ed42cc&scoped=true */ "./resources/src/views/app/pages/sales/create_sale.vue?vue&type=template&id=e1ed42cc&scoped=true");
/* harmony import */ var _create_sale_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create_sale.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/sales/create_sale.vue?vue&type=script&lang=js");
/* harmony import */ var _create_sale_vue_vue_type_style_index_0_id_e1ed42cc_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./create_sale.vue?vue&type=style&index=0&id=e1ed42cc&scoped=true&lang=css */ "./resources/src/views/app/pages/sales/create_sale.vue?vue&type=style&index=0&id=e1ed42cc&scoped=true&lang=css");
/* harmony import */ var _create_sale_vue_vue_type_style_index_1_id_e1ed42cc_lang_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./create_sale.vue?vue&type=style&index=1&id=e1ed42cc&lang=css */ "./resources/src/views/app/pages/sales/create_sale.vue?vue&type=style&index=1&id=e1ed42cc&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;



/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _create_sale_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _create_sale_vue_vue_type_template_id_e1ed42cc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _create_sale_vue_vue_type_template_id_e1ed42cc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "e1ed42cc",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/sales/create_sale.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/sales/create_sale.vue?vue&type=script&lang=js":
/*!*************************************************************************************!*\
  !*** ./resources/src/views/app/pages/sales/create_sale.vue?vue&type=script&lang=js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_create_sale_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./create_sale.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/create_sale.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_create_sale_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/sales/create_sale.vue?vue&type=style&index=0&id=e1ed42cc&scoped=true&lang=css":
/*!*********************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/sales/create_sale.vue?vue&type=style&index=0&id=e1ed42cc&scoped=true&lang=css ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_create_sale_vue_vue_type_style_index_0_id_e1ed42cc_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./create_sale.vue?vue&type=style&index=0&id=e1ed42cc&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/create_sale.vue?vue&type=style&index=0&id=e1ed42cc&scoped=true&lang=css");


/***/ }),

/***/ "./resources/src/views/app/pages/sales/create_sale.vue?vue&type=style&index=1&id=e1ed42cc&lang=css":
/*!*********************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/sales/create_sale.vue?vue&type=style&index=1&id=e1ed42cc&lang=css ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_create_sale_vue_vue_type_style_index_1_id_e1ed42cc_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./create_sale.vue?vue&type=style&index=1&id=e1ed42cc&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/create_sale.vue?vue&type=style&index=1&id=e1ed42cc&lang=css");


/***/ }),

/***/ "./resources/src/views/app/pages/sales/create_sale.vue?vue&type=template&id=e1ed42cc&scoped=true":
/*!*******************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/sales/create_sale.vue?vue&type=template&id=e1ed42cc&scoped=true ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_create_sale_vue_vue_type_template_id_e1ed42cc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_create_sale_vue_vue_type_template_id_e1ed42cc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_create_sale_vue_vue_type_template_id_e1ed42cc_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./create_sale.vue?vue&type=template&id=e1ed42cc&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/create_sale.vue?vue&type=template&id=e1ed42cc&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/create_sale.vue?vue&type=template&id=e1ed42cc&scoped=true":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/create_sale.vue?vue&type=template&id=e1ed42cc&scoped=true ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"main-content"},[_c('breadcumb',{attrs:{"page":_vm.$t('AddSale'),"folder":_vm.$t('ListSales')}}),_vm._v(" "),(_vm.isLoading)?_c('div',{staticClass:"loading_page spinner spinner-primary mr-3"}):_vm._e(),_vm._v(" "),(!_vm.isLoading)?_c('validation-observer',{ref:"create_sale"},[_c('b-form',{on:{"submit":function($event){$event.preventDefault();return _vm.Submit_Sale.apply(null, arguments)}}},[_c('b-row',[_c('b-col',{attrs:{"lg":"12","md":"12","sm":"12"}},[_c('b-modal',{attrs:{"hide-footer":"","id":"open_scan","size":"md","title":"Barcode Scanner"}},[_c('qrcode-scanner',{staticStyle:{"width":"100%","height":"calc(100vh - 56px)"},attrs:{"qrbox":250,"fps":10},on:{"result":_vm.onScan}})],1),_vm._v(" "),_c('b-card',{staticClass:"mb-3 bg-light"},[_c('b-row',[_c('b-col',{attrs:{"lg":"6","md":"6","sm":"12"}},[_c('validation-provider',{attrs:{"name":"date","rules":{ required: true}},scopedSlots:_vm._u([{key:"default",fn:function(validationContext){return [_c('b-form-group',{attrs:{"label":_vm.$t('date') + ' ' + '*'}},[_c('b-form-input',{attrs:{"state":_vm.getValidationState(validationContext),"type":"date"},model:{value:(_vm.sale.date),callback:function ($$v) {_vm.$set(_vm.sale, "date", $$v)},expression:"sale.date"}})],1)]}}],null,false,2460929402)})],1),_vm._v(" "),_c('b-col',{attrs:{"lg":"6","md":"6","sm":"12"}},[_c('validation-provider',{attrs:{"name":"warehouse","rules":{ required: true}},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var valid = ref.valid;
var errors = ref.errors;
return _c('b-form-group',{attrs:{"label":_vm.$t('warehouse') + ' ' + '*'}},[_c('v-select',{class:{'is-invalid': !!errors.length},attrs:{"state":errors[0] ? false : (valid ? true : null),"disabled":_vm.details.length > 0,"reduce":function (label) { return label.value; },"placeholder":_vm.$t('Choose_Warehouse'),"options":_vm.warehouses.map(function (warehouses) { return ({label: warehouses.name, value: warehouses.id}); })},on:{"input":_vm.Selected_Warehouse},model:{value:(_vm.sale.warehouse_id),callback:function ($$v) {_vm.$set(_vm.sale, "warehouse_id", $$v)},expression:"sale.warehouse_id"}}),_vm._v(" "),_c('b-form-invalid-feedback',[_vm._v(_vm._s(errors[0]))])],1)}}],null,false,1961133601)})],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"excel-container mt-4"},[_c('div',{staticClass:"d-flex justify-content-between mb-3 align-items-center"},[_c('h3',{staticClass:"mb-0 text-dark font-weight-bold"},[_vm._v("Sales Worksheet (Grid View)")])]),_vm._v(" "),_c('div',{staticClass:"table-responsive worksheet-grid-wrapper"},[_c('table',{staticClass:"table table-bordered excel-grid"},[_c('thead',[_c('tr',[_c('th',{staticStyle:{"width":"20%"}},[_vm._v("Customer")]),_vm._v(" "),_c('th',{staticStyle:{"width":"30%"}},[_vm._v("Product")]),_vm._v(" "),_c('th',{staticStyle:{"width":"10%"}},[_vm._v("Qty")]),_vm._v(" "),_c('th',{staticStyle:{"width":"15%"}},[_vm._v("Amount")]),_vm._v(" "),_c('th',{staticStyle:{"width":"20%"}},[_vm._v("Note")]),_vm._v(" "),_c('th',{staticStyle:{"width":"5%"}})])]),_vm._v(" "),_c('tbody',_vm._l((_vm.spreadsheetRows),function(row,index){return _c('tr',{key:index},[_c('td',{staticClass:"p-0 align-middle"},[_c('v-select',{ref:'row_client_' + index,refInFor:true,staticClass:"grid-v-select fill-height-select",attrs:{"options":_vm.clients.map(function (c) { return ({label: c.name, value: c.id}); }),"reduce":function (opt) { return opt.value; },"placeholder":"Select Customer","append-to-body":""},on:{"input":function($event){return _vm.onGridCustomerChange(index)}},model:{value:(row.client_id),callback:function ($$v) {_vm.$set(row, "client_id", $$v)},expression:"row.client_id"}})],1),_vm._v(" "),_c('td',{staticClass:"p-0"},_vm._l((row.items),function(item,itemIndex){return _c('div',{key:itemIndex,staticClass:"grid-row-item d-flex align-items-center"},[_c('v-select',{ref:'row_product_' + index + '_' + itemIndex,refInFor:true,staticClass:"grid-v-select flex-grow-1",attrs:{"options":_vm.products.map(function (p) { return ({label: p.name + ' (' + p.code + ')', value: p}); }),"reduce":function (opt) { return opt.value; },"placeholder":"Select Product","append-to-body":""},on:{"input":function($event){return _vm.onGridProductChange(index, itemIndex)}},model:{value:(item.product_data),callback:function ($$v) {_vm.$set(item, "product_data", $$v)},expression:"item.product_data"}}),_vm._v(" "),(row.items.length > 1)?_c('i',{staticClass:"i-Close text-danger ml-1 mr-2 cursor-pointer",staticStyle:{"font-size":"1.2rem"},attrs:{"title":"Remove this item"},on:{"click":function($event){return _vm.removeItem(index, itemIndex)}}}):_vm._e()],1)}),0),_vm._v(" "),_c('td',{staticClass:"p-0"},_vm._l((row.items),function(item,itemIndex){return _c('div',{key:itemIndex,staticClass:"grid-row-item"},[_c('input',{directives:[{name:"model",rawName:"v-model.number",value:(item.quantity),expression:"item.quantity",modifiers:{"number":true}}],ref:'row_qty_' + index + '_' + itemIndex,refInFor:true,staticClass:"grid-input text-center",attrs:{"type":"text","inputmode":"decimal"},domProps:{"value":(item.quantity)},on:{"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.focusNextCell(index, itemIndex, 'amount')},"input":function($event){if($event.target.composing){ return; }_vm.$set(item, "quantity", _vm._n($event.target.value))},"blur":function($event){return _vm.$forceUpdate()}}})])}),0),_vm._v(" "),_c('td',{staticClass:"p-0"},_vm._l((row.items),function(item,itemIndex){return _c('div',{key:itemIndex,staticClass:"grid-row-item"},[_c('input',{directives:[{name:"model",rawName:"v-model.number",value:(item.amount),expression:"item.amount",modifiers:{"number":true}}],ref:'row_amount_' + index + '_' + itemIndex,refInFor:true,staticClass:"grid-input text-right",attrs:{"type":"text","inputmode":"decimal"},domProps:{"value":(item.amount)},on:{"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.focusNextCell(index, itemIndex, 'note')},"input":function($event){if($event.target.composing){ return; }_vm.$set(item, "amount", _vm._n($event.target.value))},"blur":function($event){return _vm.$forceUpdate()}}})])}),0),_vm._v(" "),_c('td',{staticClass:"p-0 align-middle"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(row.note),expression:"row.note"}],ref:'row_note_' + index,refInFor:true,staticClass:"grid-input fill-height-input",attrs:{"type":"text","placeholder":"Note..."},domProps:{"value":(row.note)},on:{"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.moveToNextRow(index)},"input":function($event){if($event.target.composing){ return; }_vm.$set(row, "note", $event.target.value)}}})]),_vm._v(" "),_c('td',{staticClass:"p-0 text-center align-middle"},[_c('div',{staticClass:"d-flex justify-content-center align-items-center fill-height-input",staticStyle:{"min-height":"60px"}},[_c('i',{staticClass:"i-Add text-success cursor-pointer mr-3",staticStyle:{"font-size":"1.5rem","font-weight":"bold"},attrs:{"title":"Add product to this bill"},on:{"click":function($event){return _vm.addItem(index)}}}),_vm._v(" "),_c('i',{staticClass:"i-Close-Window text-danger cursor-pointer",staticStyle:{"font-size":"1.5rem"},attrs:{"title":"Delete this bill"},on:{"click":function($event){return _vm.clearRow(index)}}})])])])}),0),_vm._v(" "),_c('tfoot',[_c('tr',[_c('td',{staticClass:"p-3 bg-light text-left",attrs:{"colspan":"6"}},[_c('b-button',{staticClass:"shadow-sm font-weight-bold",attrs:{"variant":"primary","size":"md"},on:{"click":_vm.addNewRow}},[_c('i',{staticClass:"i-Add"}),_vm._v(" Add New Row\n                      ")])],1)])])])]),_vm._v(" "),_c('div',{staticClass:"mt-4 text-right"},[_c('b-button',{staticClass:"px-5 font-weight-bold",staticStyle:{"font-size":"1.4rem"},attrs:{"variant":"success","size":"lg","disabled":_vm.is_bulk_processing},on:{"click":_vm.submitSpreadsheet}},[_c('i',{staticClass:"i-Yes mr-2"}),_vm._v(" SAVE ALL SALES\n              ")])],1),_vm._v(" "),(_vm.is_bulk_processing)?_c('div',{staticClass:"spinner lg spinner-primary mt-3 text-center"}):_vm._e()])],1)],1)],1)],1):_vm._e(),_vm._v(" "),_c('validation-observer',{ref:"Update_Detail"},[_c('b-modal',{attrs:{"hide-footer":"","size":"lg","id":"form_Update_Detail","title":_vm.detail.name}},[_c('b-form',{on:{"submit":function($event){$event.preventDefault();return _vm.submit_Update_Detail.apply(null, arguments)}}},[_c('b-row',[_c('b-col',{attrs:{"lg":"6","md":"6","sm":"12"}},[_c('validation-provider',{attrs:{"name":"Product Price","rules":{ required: true , regex: /^\d*\.?\d*$/}},scopedSlots:_vm._u([{key:"default",fn:function(validationContext){return [_c('b-form-group',{attrs:{"label":_vm.$t('ProductPrice') + ' ' + '*',"id":"Price-input"}},[_c('b-form-input',{attrs:{"label":"Product Price","state":_vm.getValidationState(validationContext),"aria-describedby":"Price-feedback"},model:{value:(_vm.detail.Unit_price),callback:function ($$v) {_vm.$set(_vm.detail, "Unit_price", $$v)},expression:"detail.Unit_price"}}),_vm._v(" "),_c('b-form-invalid-feedback',{attrs:{"id":"Price-feedback"}},[_vm._v(_vm._s(validationContext.errors[0]))])],1)]}}])})],1),_vm._v(" "),_c('b-col',{attrs:{"lg":"6","md":"6","sm":"12"}},[_c('validation-provider',{attrs:{"name":"Tax Method","rules":{ required: true}},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var valid = ref.valid;
var errors = ref.errors;
return _c('b-form-group',{attrs:{"label":_vm.$t('TaxMethod') + ' ' + '*'}},[_c('v-select',{class:{'is-invalid': !!errors.length},attrs:{"state":errors[0] ? false : (valid ? true : null),"reduce":function (label) { return label.value; },"placeholder":_vm.$t('Choose_Method'),"options":[
                          {label: 'Exclusive', value: '1'},
                          {label: 'Inclusive', value: '2'}
                         ]},model:{value:(_vm.detail.tax_method),callback:function ($$v) {_vm.$set(_vm.detail, "tax_method", $$v)},expression:"detail.tax_method"}}),_vm._v(" "),_c('b-form-invalid-feedback',[_vm._v(_vm._s(errors[0]))])],1)}}])})],1),_vm._v(" "),_c('b-col',{attrs:{"lg":"6","md":"6","sm":"12"}},[_c('validation-provider',{attrs:{"name":"Order Tax","rules":{ required: true , regex: /^\d*\.?\d*$/}},scopedSlots:_vm._u([{key:"default",fn:function(validationContext){return [_c('b-form-group',{attrs:{"label":_vm.$t('OrderTax') + ' ' + '*'}},[_c('b-input-group',{attrs:{"append":"%"}},[_c('b-form-input',{attrs:{"label":"Order Tax","state":_vm.getValidationState(validationContext),"aria-describedby":"OrderTax-feedback"},model:{value:(_vm.detail.tax_percent),callback:function ($$v) {_vm.$set(_vm.detail, "tax_percent", $$v)},expression:"detail.tax_percent"}})],1),_vm._v(" "),_c('b-form-invalid-feedback',{attrs:{"id":"OrderTax-feedback"}},[_vm._v(_vm._s(validationContext.errors[0]))])],1)]}}])})],1),_vm._v(" "),_c('b-col',{attrs:{"lg":"6","md":"6","sm":"12"}},[_c('validation-provider',{attrs:{"name":"Discount Method","rules":{ required: true}},scopedSlots:_vm._u([{key:"default",fn:function(ref){
                         var valid = ref.valid;
                         var errors = ref.errors;
return _c('b-form-group',{attrs:{"label":_vm.$t('Discount_Method') + ' ' + '*'}},[_c('v-select',{class:{'is-invalid': !!errors.length},attrs:{"reduce":function (label) { return label.value; },"placeholder":_vm.$t('Choose_Method'),"state":errors[0] ? false : (valid ? true : null),"options":[
                          {label: 'Percent %', value: '1'},
                          {label: 'Fixed', value: '2'}
                         ]},model:{value:(_vm.detail.discount_Method),callback:function ($$v) {_vm.$set(_vm.detail, "discount_Method", $$v)},expression:"detail.discount_Method"}}),_vm._v(" "),_c('b-form-invalid-feedback',[_vm._v(_vm._s(errors[0]))])],1)}}])})],1),_vm._v(" "),_c('b-col',{attrs:{"lg":"6","md":"6","sm":"12"}},[_c('validation-provider',{attrs:{"name":"Discount Rate","rules":{ required: true , regex: /^\d*\.?\d*$/}},scopedSlots:_vm._u([{key:"default",fn:function(validationContext){return [_c('b-form-group',{attrs:{"label":_vm.$t('Discount') + ' ' + '*'}},[_c('b-form-input',{attrs:{"label":"Discount","state":_vm.getValidationState(validationContext),"aria-describedby":"Discount-feedback"},model:{value:(_vm.detail.discount),callback:function ($$v) {_vm.$set(_vm.detail, "discount", _vm._n($$v))},expression:"detail.discount"}}),_vm._v(" "),_c('b-form-invalid-feedback',{attrs:{"id":"Discount-feedback"}},[_vm._v(_vm._s(validationContext.errors[0]))])],1)]}}])})],1),_vm._v(" "),(_vm.detail.product_type != 'is_service')?_c('b-col',{attrs:{"lg":"6","md":"6","sm":"12"}},[_c('validation-provider',{attrs:{"name":"Unit Sale","rules":{ required: true}},scopedSlots:_vm._u([{key:"default",fn:function(ref){
                         var valid = ref.valid;
                         var errors = ref.errors;
return _c('b-form-group',{attrs:{"label":_vm.$t('UnitSale') + ' ' + '*'}},[_c('v-select',{class:{'is-invalid': !!errors.length},attrs:{"state":errors[0] ? false : (valid ? true : null),"placeholder":_vm.$t('Choose_Unit_Sale'),"reduce":function (label) { return label.value; },"options":_vm.units.map(function (units) { return ({label: units.name, value: units.id}); })},model:{value:(_vm.detail.sale_unit_id),callback:function ($$v) {_vm.$set(_vm.detail, "sale_unit_id", $$v)},expression:"detail.sale_unit_id"}}),_vm._v(" "),_c('b-form-invalid-feedback',[_vm._v(_vm._s(errors[0]))])],1)}}],null,false,1636962053)})],1):_vm._e(),_vm._v(" "),_c('b-col',{directives:[{name:"show",rawName:"v-show",value:(_vm.detail.is_imei),expression:"detail.is_imei"}],attrs:{"lg":"12","md":"12","sm":"12"}},[_c('b-form-group',{attrs:{"label":_vm.$t('Add_product_IMEI_Serial_number')}},[_c('b-form-input',{attrs:{"label":"Add_product_IMEI_Serial_number","placeholder":_vm.$t('Add_product_IMEI_Serial_number')},model:{value:(_vm.detail.imei_number),callback:function ($$v) {_vm.$set(_vm.detail, "imei_number", $$v)},expression:"detail.imei_number"}})],1)],1),_vm._v(" "),_c('b-col',{attrs:{"md":"12"}},[_c('b-form-group',[_c('b-button',{attrs:{"variant":"primary","type":"submit","disabled":_vm.Submit_Processing_detail}},[_c('i',{staticClass:"i-Yes me-2 font-weight-bold"}),_vm._v(" "+_vm._s(_vm.$t('submit')))]),_vm._v(" "),(_vm.Submit_Processing_detail)?_vm._m(0):_vm._e()],1)],1)],1)],1)],1)],1)],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"typo__p"},[_c('div',{staticClass:"spinner sm spinner-primary mt-3"})])}]
render._withStripped = true


/***/ })

}]);