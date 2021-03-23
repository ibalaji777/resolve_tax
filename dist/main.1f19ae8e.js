// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.js":[function(require,module,exports) {
var sales_item_calc = {};

function gst(rate, qty, cgst, sgst, igst, cess, tax_type, discount, get) {
  var cgst_each_price;
  var sgst_each_price;
  var igst_each_price;
  var cess_each_price;
  var final_total_tax_percent;
  var final_subtotal;
  var p_cgst = cgst == "" ? 0 : cgst;
  var p_sgst = sgst == "" ? 0 : sgst;
  var p_igst = igst == "" ? 0 : igst;
  var p_cess = cess == "" ? 0 : cess;
  var p_discount = discount == "" ? 0 : discount; // var p_discount_price=discount_price==""?0:discount_price;

  var cgst_input = p_cgst;
  var sgst_input = p_sgst;
  var igst_input = p_igst;
  var cess_input = p_cess;
  var total_tax = parseFloat(cgst_input) + parseFloat(sgst_input) + parseFloat(igst_input) + parseFloat(cess_input);
  var f_discount_price;
  var final_discount_price;
  var reduce_tax; //exclusive

  if (tax_type == "INCLUSIVE") {
    // this.isat_toast("this.purchase.total_ammount","error")
    //inclusive tax
    //ammount=price rate*100/(100+taxpercent)*qty
    //tax=price*taxpercent/(100+taxpercent)*qty
    //discount Price=rate/100*discount
    //reduce_tax=(discount/100)*tax(cgst+sgst+igst+cess);
    //(cgst,sgst,igst,cess)=reduce_tax/(cgst,+sgst+igst+cess)*(cgst,sgst,igst,cess)
    //gst_amount=tax_amount-reduce_tax
    //total=subtotal+gst_amount-discount price
    // var totaltax_in_percent=parseFloat(cgst_input) + parseFloat(sgst_input) +parseFloat(igst_input) + parseFloat(cess_input);
    var sub_total = rate * 100 / (100 + total_tax);
    var sub_total_qty = (sub_total * qty).toFixed(2);
    final_subtotal = isNaN(sub_total_qty) ? 0 : sub_total_qty;
    var tax = rate * total_tax / (100 + total_tax) / total_tax * qty;
    var cgst_in = tax * p_cgst;
    var sgst_in = tax * p_sgst;
    var igst_in = tax * p_igst;
    var cess_in = tax * p_cess;
    f_discount_price = final_subtotal / 100 * p_discount;
    final_discount_price = isNaN(f_discount_price) ? 0 : f_discount_price;
    reduce_tax = final_discount_price / 100 * (parseFloat(cgst_input) + parseFloat(sgst_input) + parseFloat(igst_input) + parseFloat(cess_input));
    var total_actual_tax = (cgst_in + sgst_in + igst_in + cess_in - reduce_tax).toFixed(2);
    final_total_tax_percent = isNaN(total_actual_tax) ? 0 : total_actual_tax;

    if (p_discount == 0) {
      cgst_each_price = isNaN(cgst_in) ? 0 : cgst_in.toFixed(3);
      sgst_each_price = isNaN(sgst_in) ? 0 : sgst_in.toFixed(3);
      igst_each_price = isNaN(igst_in) ? 0 : igst_in.toFixed(3);
      cess_each_price = isNaN(cess_in) ? 0 : cess_in.toFixed(3);
    } else {
      cgst_each_price = parseFloat(final_total_tax_percent) / parseFloat(total_tax) * parseFloat(cgst_input);
      sgst_each_price = parseFloat(final_total_tax_percent) / parseFloat(total_tax) * parseFloat(sgst_input);
      igst_each_price = parseFloat(final_total_tax_percent) / parseFloat(total_tax) * parseFloat(igst_input);
      cess_each_price = parseFloat(final_total_tax_percent) / parseFloat(total_tax) * parseFloat(cess_input);
    }
  } else {
    var sub_total_qty_ex = parseFloat(rate) * qty;
    final_subtotal = isNaN(sub_total_qty_ex) ? 0 : sub_total_qty_ex;
    f_discount_price = final_subtotal / 100 * p_discount;
    final_discount_price = isNaN(f_discount_price) ? 0 : f_discount_price;
    reduce_tax = final_discount_price / 100 * (parseFloat(cgst_input) + parseFloat(sgst_input) + parseFloat(igst_input) + parseFloat(cess_input)); // this.discount_price=discount;

    var t_tax = parseFloat(p_cgst) + parseFloat(p_sgst) + parseFloat(p_igst) + parseFloat(p_cess);
    var tax_price = parseFloat(final_subtotal) / 100 * parseFloat(t_tax);
    var final_tax = parseFloat((tax_price - reduce_tax).toFixed(2));
    final_total_tax_percent = isNaN(final_tax) ? 0 : final_tax;
    var each_discount = final_total_tax_percent / total_tax; // this.isat_toast("this.purchase.total_ammount"+(this.purchase.tax + this.purchase.subtotal - this.discount_price),"error")

    var each_tax = tax_price / t_tax;

    if (discount == 0) {
      cgst_each_price = each_tax * p_cgst;
      sgst_each_price = each_tax * p_sgst;
      igst_each_price = each_tax * p_igst;
      cess_each_price = each_tax * p_cess;
    } else {
      cgst_each_price = parseFloat((each_discount * cgst_input).toFixed(3));
      sgst_each_price = parseFloat((each_discount * sgst_input).toFixed(3));
      igst_each_price = parseFloat((each_discount * igst_input).toFixed(3));
      cess_each_price = parseFloat((each_discount * cess_input).toFixed(3));
    }
  }

  var product_cgst_amt = isNaN(cgst_each_price) ? 0 : cgst_each_price;
  var product_sgst_amt = isNaN(sgst_each_price) ? 0 : sgst_each_price;
  var product_igst_amt = isNaN(igst_each_price) ? 0 : igst_each_price;
  var product_cess_amt = isNaN(cgst_each_price) ? 0 : cess_each_price;
  var total_ammount = parseFloat(final_total_tax_percent) + parseFloat(final_subtotal) - parseFloat(final_discount_price);
  var final_total_ammount = isNaN(total_ammount) ? 0 : parseFloat(total_ammount.toFixed(2)); // alert("sub total :"+final_subtotal+"tax:"+final_total_tax_percent+"cgst :"+product_cgst_amt+"sgst"+product_sgst_amt+"igst :"+product_igst_amt+"cess"+product_cess_amt+"total"+final_total_ammount)

  sales_item_calc["tax_type"] = tax_type;
  sales_item_calc["sales rate"] = rate;
  sales_item_calc["qty"] = qty;
  sales_item_calc["discount"] = p_discount;
  sales_item_calc["sub_total"] = final_subtotal;
  sales_item_calc["total_tax"] = final_total_tax_percent;
  sales_item_calc["cgst"] = p_cgst;
  sales_item_calc["sgst"] = p_sgst;
  sales_item_calc["igst"] = p_igst;
  sales_item_calc["cess"] = p_cess;
  sales_item_calc["cgst_price"] = product_cgst_amt;
  sales_item_calc["sgst_price"] = product_sgst_amt;
  sales_item_calc["igst_price"] = p_igst;
  sales_item_calc["igst_price"] = product_igst_amt;
  sales_item_calc["cess_price"] = product_cess_amt;
  sales_item_calc["sub_total"] = final_subtotal;
  sales_item_calc["sub_total"] = final_subtotal;
  sales_item_calc["final ammount"] = final_total_ammount;
  get(sales_item_calc);
}

module.exports = {
  gst: gst
};
},{}],"main.js":[function(require,module,exports) {
"use strict";

var _index = require("./index");

// const gst=require('./index');
(0, _index.gst)(580, 2, 6, 6, 0, 0, 'INCLUSIVE', 25, function (result) {
  console.log(result);
});
},{"./index":"index.js"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54652" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map