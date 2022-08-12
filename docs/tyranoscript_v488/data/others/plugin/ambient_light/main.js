'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(function (TG) {
  // 多重読み込みの禁止
  if (TG.stat.ambient_light_config !== undefined) {
    return;
  } // ステータスを作成


  TG.stat.ambient_light_config = {
    auto_adjust_color: true,
    ambient_color: '',
    shadow: true,
    shadow_size: '',
    shadow_color: '',
    shadow_opacity: '',
    blend_mode: '',
    hard_light: true,
    light_cross_fade: true,
    default_shadow: true,
    default_shadow_size: 16,
    default_shadow_opacity: 0.3,
    is_enabled: true,
    storage_map: {}
  }; //
  // プラグインがサポートされているかどうかを確認
  //
  // 環境
  // "iphone", "android", "pc"

  var env = $.userenv(); // ブラウザ
  // "chrome", "safari", "edge", "firefox", ...

  var browser = $.getBrowser(); // プラグインがサポートされていない環境ならばtrue
  // - Safari または iOS

  var is_not_supported = browser === 'safari' || env === 'iphone'; // Nodeで駆動しているか

  var is_node = $.isElectron && $.isElectron() || $.isNWJS(); // サポートされているか
  // - iOS でも Safari でもない場合はOK（Mac × Electron、Mac × Chrome は OK）
  // - Node.js 環境もOK
  // - [plugin force="true"]で強制的に有効（デバッグ用）

  var is_supported = !is_not_supported || is_node || TG.stat.mp.force === 'true'; //
  // 初期化
  //
  // filterプロパティに当てるスタイル

  var filter_value = is_supported ? 'url(#ambient_light_filter)' : ''; // フィルターサイズ

  var filter_width = TG.stat.mp.width || '1000';
  var filter_height = TG.stat.mp.height || '2000'; // 連動するタグ カンマ区切りで複数指定可

  var link_target_tag = TG.stat.mp.link || 'bg'; // SVG Filterの追加

  var j_svg = $("<svg viewbox=\"0 0 0 0\" style=\"visible: hidden;\">\n    <defs>\n      <filter id=\"ambient_light_filter\" width=\"".concat(filter_width, "\" height=\"").concat(filter_height, "\">\n\n        <feFlood id=\"ambient_light_feflood\" flood-color=\"white\" flood-opacity=\"1\" />\n        <feComposite in=\"ambient_light_feflood\" in2=\"SourceAlpha\" operator=\"atop\" result=\"color_1\"/>\n\n\n        <feFlood id=\"ambient_light_feflood_2\" flood-color=\"white\" flood-opacity=\"1\" />\n        <feComposite in=\"ambient_light_feflood_2\" in2=\"SourceAlpha\" operator=\"atop\" result=\"color_2\"/>\n\n        <feBlend id=\"ambient_light_feblend_1\" in=\"color_1\" in2=\"SourceGraphic\" mode=\"multiply\" result=\"blend_main\"/>\n        <feBlend id=\"ambient_light_feblend_2\" in=\"color_2\" in2=\"SourceGraphic\" mode=\"hard-light\" result=\"blend_sub\"/>\n        <feComponentTransfer id=\"feComponentTransfer\" in=\"blend_sub\" result=\"blend_sub_alpha\">\n          <feFuncA id=\"ambient_light_alpha\" type=\"linear\" slope=\"0\"/>\n        </feComponentTransfer>\n        <feBlend in=\"blend_sub_alpha\" in2=\"blend_main\" mode=\"normal\"/>\n        <feDropShadow id=\"ambient_light_shadow\" dx=\"0\" dy=\"0\" stdDeviation=\"12\" flood-color=\"white\" flood-opacity=\"0\" />\n\n      </filter>\n    </defs>\n  </svg>")).appendTo('body'); // <feFlood>, <feBlend>, <feDropShadow>への参照

  var e_flood_main = j_svg.find('#ambient_light_feflood').get(0);
  var e_flood_sub = j_svg.find('#ambient_light_feflood_2').get(0);
  var e_blend_main = j_svg.find('#ambient_light_feblend_1').get(0);
  var e_blend_sub = j_svg.find('#ambient_light_feblend_2').get(0);
  var e_blend_opacity = j_svg.find('#ambient_light_alpha').get(0);
  var e_shadow = j_svg.find('#ambient_light_shadow').get(0); // 初期設定

  e_flood_main.style.setProperty('transition-property', 'flood-color');
  e_flood_main.style.setProperty('transition-timing-function', 'linear');
  e_shadow.style.setProperty('transition-property', 'flood-color flood-opacity stdDeviation');
  e_shadow.style.setProperty('transition-timing-function', 'linear');
  e_shadow.setAttribute('stdDeviation', '16');
  e_shadow.setAttribute('flood-opacity', '0.3'); // スタイルの埋め込み

  var j_style = $('<style id="ambient_light_style" />').appendTo('body');
  TG.stat.ambient_light_config.css_map = {
    '.tyrano_chara': {
      filter: filter_value
    }
  };
  /**
   * 埋め込んだスタイルを css_map に従って更新
   */

  var updateStyle = function updateStyle() {
    var css_map = TG.stat.ambient_light_config.css_map;
    var css_str = ''; // 有効な場合のみ。無効な場合はスタイルを空っぽにする

    if (TG.stat.ambient_light_config.is_enabled) {
      for (var selector in css_map) {
        css_str += selector + '{';
        var style_map = css_map[selector];

        for (var prop in style_map) {
          var value = style_map[prop];
          css_str += "".concat(prop, ":").concat(value, ";");
        }

        css_str += '}';
      }
    }

    j_style.text(css_str);
  }; // 1発更新しておこう


  updateStyle(); // キャンバスの設定

  var CANVAS_WIDTH = 4;
  var CANVAS_HEIGHT = 3;
  var canvas = document.createElement('canvas');
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  var ctx = canvas.getContext('2d');
  /**
   * 画像を代表する1色のRGB値を取得する（非同期）
   * 画像のパス（例: "./data/bgimage/room.jpg"）を渡すと
   * [0.45, 0.5, 0.66] のような0.0～1.0の数値3つの配列が返ってくる
   * 数値はそれぞれR, G, Bを意味する
   * @param {string} url
   * @returns {Promise}
   */

  var getRepresentativeColor = function getRepresentativeColor(url) {
    return new Promise(function (resolve) {
      var img = new Image();

      img.onload = function () {
        ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        var imagedata = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        var pixel_count = CANVAS_WIDTH * CANVAS_HEIGHT;
        var rgb = [0, 0, 0];

        for (var i = 0; i < pixel_count; i++) {
          rgb[0] += imagedata.data[i * 4 + 0];
          rgb[1] += imagedata.data[i * 4 + 1];
          rgb[2] += imagedata.data[i * 4 + 2];
        }

        rgb = rgb.map(function (c) {
          return (1 + Math.floor(c / pixel_count)) / 256;
        });
        img = null;
        resolve(rgb);
      };

      img.src = url;
    });
  };
  /**
   * たとえば [0, 1, 1] を受け取って "rgb(0, 255, 255)" を返す
   * @param {number[]} rgb
   * @returns
   */


  var parseColorStr = function parseColorStr(rgb) {
    rgb = rgb.map(function (c) {
      return Math.max(0, Math.min(255, Math.floor(c * 256 - 1)));
    });
    return "rgb(".concat(rgb[0], ", ").concat(rgb[1], ", ").concat(rgb[2], ")");
  };
  /**
   * ブレンドモードを返す "hard-light" or "soft-light"
   * @param {number[]} rgb
   * @returns {string}
   */


  var decideBlendMode = function decideBlendMode(rgb) {
    // R, G, Bの平均
    var average_col = rgb.reduce(function (a, b) {
      return a + b;
    }, 0) / 3; // 合成モードの決定

    if (TG.stat.ambient_light_config.hard_light && average_col < 0.4) {
      // 背景が全体的に暗いときはハードライト
      return 'hard-light';
    } else {
      // 背景が明るめのときはソフトライト
      return 'soft-light';
    }
  };

  var color_cache = {};
  /**
   * Filterにセットしていく値をまとめたオプションを返す
   * @param {string} url
   * @returns {Object}
   */

  var decideFilterOptions = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(url) {
      var config, rgb, blend_mode, shadow_rgb, max_col, ambient_color, shadow_color, shadow, shadow_size, shadow_opacity;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              config = TG.stat.ambient_light_config.storage_map[url] || {};

              if (config.once) {
                delete TG.stat.ambient_light_config.storage_map[url];
              } // この背景画像を代表する1色を取得する
              // eg.) [0.5, 0.66, 0.7]


              rgb = config.ambient_rgb;

              if (rgb) {
                _context.next = 12;
                break;
              }

              if (!color_cache[url]) {
                _context.next = 8;
                break;
              }

              rgb = color_cache[url];
              _context.next = 12;
              break;

            case 8:
              _context.next = 10;
              return getRepresentativeColor(url);

            case 10:
              rgb = _context.sent;
              color_cache[url] = rgb;

            case 12:
              // 合成モード
              blend_mode = config.blend_mode;

              if (!blend_mode) {
                blend_mode = decideBlendMode(rgb); // 完全黒のハードライトを当てるとキャラまで完全黒になるので最低限の明るさを担保

                if (blend_mode === 'hard-light') {
                  rgb = rgb.map(function (c) {
                    return Math.max(0.1, c) + 0.1;
                  });
                }
              } // 逆光色


              shadow_rgb = config.shadow_rgb;

              if (!shadow_rgb) {
                // R, G, Bのうち最も大きな値
                max_col = Math.max.apply(Math, _toConsumableArray(rgb));
                shadow_rgb = rgb.map(function (c) {
                  return c / max_col;
                });
              } // 環境光色と逆光色をrgb()形式の文字列に変換


              ambient_color = parseColorStr(rgb);
              shadow_color = parseColorStr(shadow_rgb); // 逆光を有効にするか

              shadow = TG.stat.ambient_light_config.default_shadow;

              if (config.shadow) {
                shadow = config.shadow;
              } // 逆光サイズ


              shadow_size = TG.stat.ambient_light_config.default_shadow_size;

              if (config.shadow_size) {
                shadow_size = config.shadow_size;
              } // 逆光の不透明度


              shadow_opacity = TG.stat.ambient_light_config.default_shadow_opacity;

              if (config.shadow_opacity) {
                shadow_opacity = config.shadow_opacity;
              } // オプションをまとめて返却


              return _context.abrupt("return", {
                ambient_color: ambient_color,
                blend_mode: blend_mode,
                shadow: shadow,
                shadow_color: shadow_color,
                shadow_size: shadow_size,
                shadow_opacity: shadow_opacity
              });

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function decideFilterOptions(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  /**
   * <filter>の中身を書き変える
   * @param {Object} options
   */


  var updateSVGFilter = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(options) {
      var time;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              time = options.time || 0;

              if (time <= 70 || TG.stat.ambient_light_config.blend_mode === options.blend_mode) {
                // - 変化時間がほぼゼロの場合
                // - クロスフェードが無効の場合
                // - ブレンドモードの変化がない場合
                // - 変化前変化後の少なくとも一方がmultiplyの場合
                // transitionの設定
                e_flood_main.style.setProperty('transition-duration', "".concat(time, "ms"));
                e_shadow.style.setProperty('transition-duration', "".concat(time, "ms")); // 設定値を放り込んでいく

                e_flood_main.setAttribute('flood-color', options.ambient_color);
                e_blend_main.setAttribute('mode', options.blend_mode);
              } else {
                // 時間をかけて soft-light ←→ hard-light を切り替える場合
                $(e_blend_opacity).finish(); // transitionの設定

                e_flood_main.style.setProperty('transition-duration', "".concat(0, "ms"));
                e_shadow.style.setProperty('transition-duration', "".concat(time, "ms")); // 設定値を放り込んでいく

                e_blend_opacity.setAttribute('slope', 0);
                e_flood_sub.setAttribute('flood-color', options.ambient_color);
                e_blend_sub.setAttribute('mode', options.blend_mode);
                $(e_blend_opacity).animate({
                  _slope: 0
                }, 0).animate({
                  _slope: 1
                }, {
                  duration: time,
                  step: function step(now) {
                    e_blend_opacity.setAttribute('slope', now);
                  },
                  complete: function complete() {
                    e_flood_main.setAttribute('flood-color', options.ambient_color);
                    e_blend_main.setAttribute('mode', options.blend_mode);
                    e_blend_opacity.setAttribute('slope', '0');
                  }
                });
              }

              if (options.shadow) {
                e_shadow.setAttribute('flood-color', options.shadow_color);
                e_shadow.setAttribute('stdDeviation', options.shadow_size);
                e_shadow.setAttribute('flood-opacity', options.shadow_opacity);
              } else {
                e_shadow.setAttribute('flood-opacity', '0');
              } // ステータスに保存


              TG.stat.ambient_light_config.ambient_color = options.ambient_color;
              TG.stat.ambient_light_config.shadow_color = options.shadow_color;
              TG.stat.ambient_light_config.shadow = options.shadow;
              TG.stat.ambient_light_config.shadow_size = options.shadow_size;
              TG.stat.ambient_light_config.shadow_opacity = options.shadow_opacity;
              TG.stat.ambient_light_config.blend_mode = options.blend_mode;

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function updateSVGFilter(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  /**
   * "#FF0000", "0xFF0000", "rgb(255, 0, 0)" のような文字列を受け取って
   * [1, 0.00390625, 0.00390625] のような配列を返す
   * @param {string} _str
   * @returns
   */


  var parseRGB = function parseRGB(_str) {
    var str = _str.trim();

    var flag_16 = true;

    if (str.match(/^0x/)) {
      str = str.replace(/^0x/, '');
      flag_16 = true;
    } else if (str.match(/^#/)) {
      str = str.replace(/^#/, '');
      flag_16 = true;
    } else if (str.match(/^rgba?\(([^)]+)\)/)) {
      str = str.replace(/^rgba?\(([^)]+)\)/, '$1');
      flag_16 = false;
    }

    if (flag_16) {
      var r = parseInt(str.substring(0, 2), 16);
      var g = parseInt(str.substring(2, 4), 16);
      var b = parseInt(str.substring(4, 6), 16);
      return [(1 + r) / 256, (1 + g) / 256, (1 + b) / 256];
    } else {
      return str.split(',').map(function (item) {
        return (1 + parseInt(item)) / 256;
      });
    }
  };
  /**
   * ロード時の復元
   */


  var restore = function restore() {
    updateSVGFilter(TG.stat.ambient_light_config);
    updateStyle();
  }; // ================================
  // [bg]タグへの割り込み
  // ================================


  link_target_tag.split(',').forEach(function (_tag_name) {
    var tag_name = _tag_name.trim();

    if (!tag_name) {
      return;
    }

    if (!is_supported) {
      return;
    }

    if (!TG.ftag.master_tag[tag_name]) {
      return;
    } // もともとのstartメソッドを保存


    var original_start = TG.ftag.master_tag[tag_name].start; // 改めて定義

    TG.ftag.master_tag[tag_name].start = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(pm) {
        var url, options;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!TG.stat.ambient_light_config.auto_adjust_color) {
                  _context3.next = 7;
                  break;
                }

                url = pm.storage.match(/^https?:\/\//) ? pm.storage : "./data/bgimage/".concat(pm.storage);
                _context3.next = 4;
                return decideFilterOptions(url);

              case 4:
                options = _context3.sent;
                options.time = parseInt(TG.cutTimeWithSkip(pm.time)) || 0;
                updateSVGFilter(options);

              case 7:
                // 保存しておいたstartメソッドを呼び出す
                original_start.call(TG.ftag.master_tag[tag_name], pm);

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }();
  }); // ================================
  // [ambient_light_config]タグ定義
  // ================================

  TG.ftag.master_tag.ambient_light_config = {
    kag: TG,
    pm: {
      auto: '',
      shadow: '',
      shadow_size: '',
      shadow_opacity: '',
      name: '',
      hard_light: ''
    },
    start: function () {
      var _start = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(pm) {
        var config;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                config = TG.stat.ambient_light_config;

                if (pm.auto) {
                  config.auto_adjust_color = pm.auto === 'true';
                }

                if (pm.shadow) {
                  config.default_shadow = pm.shadow === 'true';
                }

                if (pm.shadow_size) {
                  config.default_shadow_size = parseInt(pm.shadow_size);
                }

                if (pm.shadow_opacity) {
                  config.default_shadow_opacity = parseInt(pm.shadow_opacity);
                }

                if (pm.hard_light) {
                  config.hard_light = pm.auto === 'true';
                }

                if (pm.name) {
                  TG.stat.ambient_light_config.css_map['.' + pm.name] = {
                    filter: filter_value
                  };
                  updateStyle();
                }

                TG.ftag.nextOrder();

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function start(_x4) {
        return _start.apply(this, arguments);
      }

      return start;
    }()
  }; // ================================
  // [ambient_light]タグ定義
  // ================================

  TG.ftag.master_tag.ambient_light = {
    kag: TG,
    pm: {
      color: '',
      shadow: '',
      shadow_color: '',
      shadow_size: '',
      shadow_opacity: '',
      storage: '',
      folder: 'bgimage',
      time: '',
      name: ''
    },
    start: function () {
      var _start2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(pm) {
        var url, _options, options;

        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (is_supported) {
                  _context5.next = 3;
                  break;
                }

                TG.ftag.nextOrder();
                return _context5.abrupt("return");

              case 3:
                if (!pm.storage) {
                  _context5.next = 10;
                  break;
                }

                url = pm.storage.match(/^https?:\/\//) ? pm.storage : "./data/".concat(pm.folder, "/").concat(pm.storage);
                _context5.next = 7;
                return decideFilterOptions(url);

              case 7:
                _options = _context5.sent;
                _options.time = parseInt(TG.cutTimeWithSkip(pm.time)) || 0;
                updateSVGFilter(_options);

              case 10:
                if (pm.name) {
                  $('.' + pm.name).css('filter', filter_value);
                }

                options = {};

                if (pm.color) {
                  if (pm.color === 'none') {
                    options.ambient_color = '#FFFFFF';
                    options.blend_mode = 'multiply';
                  } else {
                    options.ambient_color = pm.color;
                  }
                }

                if (pm.mode) {
                  options.blend_mode = pm.mode;
                }

                if (pm.shadow) {
                  options.shadow = pm.shadow === 'true';
                }

                if (pm.shadow_size) {
                  options.shadow_size = pm.shadow_size;
                }

                if (pm.shadow_color) {
                  options.shadow_color = pm.shadow_color;
                }

                if (pm.shadow_opacity) {
                  options.shadow_opacity = pm.shadow_opacity;
                }

                if (Object.keys(options).length > 0) {
                  options = $.extend({}, TG.stat.ambient_light_config, options);
                  options.time = parseInt(TG.cutTimeWithSkip(pm.time)) || 0;
                  updateSVGFilter(options);
                }

                TG.ftag.nextOrder();

              case 20:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function start(_x5) {
        return _start2.apply(this, arguments);
      }

      return start;
    }()
  }; // ================================
  // [ambient_light_def]タグ定義
  // ================================

  TG.ftag.master_tag.ambient_light_def = {
    vital: ['color', 'storage'],
    kag: TG,
    pm: {
      color: '',
      mode: '',
      shadow: 'true',
      shadow_color: '',
      shadow_opacity: '0.3',
      shadow_size: '16',
      storage: '',
      folder: 'bgimage',
      once: ''
    },
    start: function () {
      var _start3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(pm) {
        var color, ambient_rgb, blend_mode, shadow_rgb, max_col, shadow_size, shadow_opacity, shadow, url;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (is_supported) {
                  _context6.next = 3;
                  break;
                }

                TG.ftag.nextOrder();
                return _context6.abrupt("return");

              case 3:
                // 環境光色を変換
                color = pm.color === 'none' ? '#FFFFFF' : pm.color;
                ambient_rgb = parseRGB(color); // ブレンドモードを決定する

                if (pm.color === 'none') {
                  blend_mode = 'multiply';
                } else if (pm.mode) {
                  // 直接指定
                  blend_mode = pm.mode;
                } else {
                  // 自動決定
                  blend_mode = decideBlendMode(ambient_rgb);

                  if (blend_mode === 'hard-light') {
                    ambient_rgb = ambient_rgb.map(function (c) {
                      return Math.max(0.1, c) + 0.1;
                    });
                  }
                } // 逆光色を決定する


                shadow_rgb = '';

                if (pm.shadow_color) {
                  // 直接指定
                  shadow_rgb = parseRGB(pm.shadow_color);
                } else {
                  // 自動決定
                  max_col = Math.max.apply(Math, _toConsumableArray(ambient_rgb));
                  shadow_rgb = ambient_rgb.map(function (c) {
                    return c / max_col;
                  });
                }

                shadow_size = parseInt(pm.shadow_size);
                shadow_opacity = parseInt(pm.shadow_opacity);
                shadow = pm.shadow !== 'false';
                url = pm.storage.match(/^https?:\/\//) ? pm.storage : "./data/".concat(pm.folder, "/").concat(pm.storage);
                TG.stat.ambient_light_config.storage_map[url] = {
                  ambient_rgb: ambient_rgb,
                  blend_mode: blend_mode,
                  shadow: shadow,
                  shadow_rgb: shadow_rgb,
                  shadow_size: shadow_size,
                  shadow_opacity: shadow_opacity
                };

                if (pm.once === 'true') {
                  TG.stat.ambient_light_config.storage_map[url].once = true;
                }

                TG.ftag.nextOrder();

              case 15:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function start(_x6) {
        return _start3.apply(this, arguments);
      }

      return start;
    }()
  }; // ================================
  // [ambient_light_def_del]タグ定義
  // ================================

  TG.ftag.master_tag.ambient_light_def_del = {
    vital: ['storage'],
    kag: TG,
    pm: {
      storage: '',
      folder: 'bgimage'
    },
    start: function () {
      var _start4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(pm) {
        var url;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (is_supported) {
                  _context7.next = 3;
                  break;
                }

                TG.ftag.nextOrder();
                return _context7.abrupt("return");

              case 3:
                url = pm.storage.match(/^https?:\/\//) ? pm.storage : "./data/".concat(pm.folder, "/").concat(pm.storage);
                delete TG.stat.ambient_light_config.storage_map[url];
                TG.ftag.nextOrder();

              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function start(_x7) {
        return _start4.apply(this, arguments);
      }

      return start;
    }()
  }; // ================================
  // [ambient_light_restore]タグ定義
  // ================================

  TG.ftag.master_tag.ambient_light_restore = {
    kag: TG,
    pm: {},
    start: function start() {
      // 非サポート環境では即nextOrder
      if (!is_supported) {
        TG.ftag.nextOrder();
        return;
      }

      restore();
      TG.ftag.nextOrder();
    }
  }; // ================================
  // [ambient_light_on]タグ定義
  // ================================

  TG.ftag.master_tag.ambient_light_on = {
    kag: TG,
    start: function start() {
      TG.stat.ambient_light_config.is_enabled = true;
      restore();
      TG.ftag.nextOrder();
    }
  }; // ================================
  // [ambient_light_off]タグ定義
  // ================================

  TG.ftag.master_tag.ambient_light_off = {
    kag: TG,
    start: function start() {
      TG.stat.ambient_light_config.is_enabled = false;
      restore();
      TG.ftag.nextOrder();
    }
  }; // TYRANO.kag.onが使えるなら使おう

  if (TG.on !== undefined) {
    TG.on('load-beforemaking', function () {
      restore();
    });
  }
})(TYRANO.kag);
