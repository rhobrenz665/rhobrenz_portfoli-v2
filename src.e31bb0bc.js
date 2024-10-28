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
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }
  return bundleURL;
}
function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }
  return '/';
}
function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"styles/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../node_modules/@glidejs/glide/dist/glide.esm.js":[function(require,module,exports) {

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*!
 * Glide.js v3.6.2
 * (c) 2013-2024 Jędrzej Chałubek (https://github.com/jedrzejchalubek/)
 * Released under the MIT License.
 */

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }
  return _typeof(obj);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }
  return object;
}
function _get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }
      return desc.value;
    };
  }
  return _get.apply(this, arguments);
}
var defaults = {
  /**
   * Type of the movement.
   *
   * Available types:
   * `slider` - Rewinds slider to the start/end when it reaches the first or last slide.
   * `carousel` - Changes slides without starting over when it reaches the first or last slide.
   *
   * @type {String}
   */
  type: 'slider',
  /**
   * Start at specific slide number defined with zero-based index.
   *
   * @type {Number}
   */
  startAt: 0,
  /**
   * A number of slides visible on the single viewport.
   *
   * @type {Number}
   */
  perView: 1,
  /**
   * Focus currently active slide at a specified position in the track.
   *
   * Available inputs:
   * `center` - Current slide will be always focused at the center of a track.
   * `0,1,2,3...` - Current slide will be focused on the specified zero-based index.
   *
   * @type {String|Number}
   */
  focusAt: 0,
  /**
   * A size of the gap added between slides.
   *
   * @type {Number}
   */
  gap: 10,
  /**
   * Change slides after a specified interval. Use `false` for turning off autoplay.
   *
   * @type {Number|Boolean}
   */
  autoplay: false,
  /**
   * Stop autoplay on mouseover event.
   *
   * @type {Boolean}
   */
  hoverpause: true,
  /**
   * Allow for changing slides with left and right keyboard arrows.
   *
   * @type {Boolean}
   */
  keyboard: true,
  /**
   * Stop running `perView` number of slides from the end. Use this
   * option if you don't want to have an empty space after
   * a slider. Works only with `slider` type and a
   * non-centered `focusAt` setting.
   *
   * @type {Boolean}
   */
  bound: false,
  /**
   * Minimal swipe distance needed to change the slide. Use `false` for turning off a swiping.
   *
   * @type {Number|Boolean}
   */
  swipeThreshold: 80,
  /**
   * Minimal mouse drag distance needed to change the slide. Use `false` for turning off a dragging.
   *
   * @type {Number|Boolean}
   */
  dragThreshold: 120,
  /**
   * A number of slides moved on single swipe.
   *
   * Available types:
   * `` - Moves slider by one slide per swipe
   * `|` - Moves slider between views per swipe (number of slides defined in `perView` options)
   *
   * @type {String}
   */
  perSwipe: '',
  /**
   * Moving distance ratio of the slides on a swiping and dragging.
   *
   * @type {Number}
   */
  touchRatio: 0.5,
  /**
   * Angle required to activate slides moving on swiping or dragging.
   *
   * @type {Number}
   */
  touchAngle: 45,
  /**
   * Duration of the animation in milliseconds.
   *
   * @type {Number}
   */
  animationDuration: 400,
  /**
   * Allows looping the `slider` type. Slider will rewind to the first/last slide when it's at the start/end.
   *
   * @type {Boolean}
   */
  rewind: true,
  /**
   * Duration of the rewinding animation of the `slider` type in milliseconds.
   *
   * @type {Number}
   */
  rewindDuration: 800,
  /**
   * Easing function for the animation.
   *
   * @type {String}
   */
  animationTimingFunc: 'cubic-bezier(.165, .840, .440, 1)',
  /**
   * Wait for the animation to finish until the next user input can be processed
   *
   * @type {boolean}
   */
  waitForTransition: true,
  /**
   * Throttle costly events at most once per every wait milliseconds.
   *
   * @type {Number}
   */
  throttle: 10,
  /**
   * Moving direction mode.
   *
   * Available inputs:
   * - 'ltr' - left to right movement,
   * - 'rtl' - right to left movement.
   *
   * @type {String}
   */
  direction: 'ltr',
  /**
   * The distance value of the next and previous viewports which
   * have to peek in the current view. Accepts number and
   * pixels as a string. Left and right peeking can be
   * set up separately with a directions object.
   *
   * For example:
   * `100` - Peek 100px on the both sides.
   * { before: 100, after: 50 }` - Peek 100px on the left side and 50px on the right side.
   *
   * @type {Number|String|Object}
   */
  peek: 0,
  /**
   * Defines how many clones of current viewport will be generated.
   *
   * @type {Number}
   */
  cloningRatio: 1,
  /**
   * Collection of options applied at specified media breakpoints.
   * For example: display two slides per view under 800px.
   * `{
   *   '800px': {
   *     perView: 2
   *   }
   * }`
   */
  breakpoints: {},
  /**
   * Collection of internally used HTML classes.
   *
   * @todo Refactor `slider` and `carousel` properties to single `type: { slider: '', carousel: '' }` object
   * @type {Object}
   */
  classes: {
    swipeable: 'glide--swipeable',
    dragging: 'glide--dragging',
    direction: {
      ltr: 'glide--ltr',
      rtl: 'glide--rtl'
    },
    type: {
      slider: 'glide--slider',
      carousel: 'glide--carousel'
    },
    slide: {
      clone: 'glide__slide--clone',
      active: 'glide__slide--active'
    },
    arrow: {
      disabled: 'glide__arrow--disabled'
    },
    nav: {
      active: 'glide__bullet--active'
    }
  }
};

/**
 * Outputs warning message to the bowser console.
 *
 * @param  {String} msg
 * @return {Void}
 */
function warn(msg) {
  console.error("[Glide warn]: ".concat(msg));
}

/**
 * Converts value entered as number
 * or string to integer value.
 *
 * @param {String} value
 * @returns {Number}
 */
function toInt(value) {
  return parseInt(value);
}
/**
 * Converts value entered as number
 * or string to flat value.
 *
 * @param {String} value
 * @returns {Number}
 */

function toFloat(value) {
  return parseFloat(value);
}
/**
 * Indicates whether the specified value is a string.
 *
 * @param  {*}   value
 * @return {Boolean}
 */

function isString(value) {
  return typeof value === 'string';
}
/**
 * Indicates whether the specified value is an object.
 *
 * @param  {*} value
 * @return {Boolean}
 *
 * @see https://github.com/jashkenas/underscore
 */

function isObject(value) {
  var type = _typeof(value);
  return type === 'function' || type === 'object' && !!value; // eslint-disable-line no-mixed-operators
}
/**
 * Indicates whether the specified value is a function.
 *
 * @param  {*} value
 * @return {Boolean}
 */

function isFunction(value) {
  return typeof value === 'function';
}
/**
 * Indicates whether the specified value is undefined.
 *
 * @param  {*} value
 * @return {Boolean}
 */

function isUndefined(value) {
  return typeof value === 'undefined';
}
/**
 * Indicates whether the specified value is an array.
 *
 * @param  {*} value
 * @return {Boolean}
 */

function isArray(value) {
  return value.constructor === Array;
}

/**
 * Creates and initializes specified collection of extensions.
 * Each extension receives access to instance of glide and rest of components.
 *
 * @param {Object} glide
 * @param {Object} extensions
 *
 * @returns {Object}
 */

function mount(glide, extensions, events) {
  var components = {};
  for (var name in extensions) {
    if (isFunction(extensions[name])) {
      components[name] = extensions[name](glide, components, events);
    } else {
      warn('Extension must be a function');
    }
  }
  for (var _name in components) {
    if (isFunction(components[_name].mount)) {
      components[_name].mount();
    }
  }
  return components;
}

/**
 * Defines getter and setter property on the specified object.
 *
 * @param  {Object} obj         Object where property has to be defined.
 * @param  {String} prop        Name of the defined property.
 * @param  {Object} definition  Get and set definitions for the property.
 * @return {Void}
 */
function define(obj, prop, definition) {
  Object.defineProperty(obj, prop, definition);
}
/**
 * Sorts aphabetically object keys.
 *
 * @param  {Object} obj
 * @return {Object}
 */

function sortKeys(obj) {
  return Object.keys(obj).sort().reduce(function (r, k) {
    r[k] = obj[k];
    return r[k], r;
  }, {});
}
/**
 * Merges passed settings object with default options.
 *
 * @param  {Object} defaults
 * @param  {Object} settings
 * @return {Object}
 */

function mergeOptions(defaults, settings) {
  var options = Object.assign({}, defaults, settings); // `Object.assign` do not deeply merge objects, so we
  // have to do it manually for every nested object
  // in options. Although it does not look smart,
  // it's smaller and faster than some fancy
  // merging deep-merge algorithm script.

  if (settings.hasOwnProperty('classes')) {
    options.classes = Object.assign({}, defaults.classes, settings.classes);
    var properties = ['direction', 'type', 'slide', 'arrow', 'nav'];
    properties.forEach(function (property) {
      if (settings.classes.hasOwnProperty(property)) {
        options.classes[property] = _objectSpread2(_objectSpread2({}, defaults.classes[property]), settings.classes[property]);
      }
    });
  }
  if (settings.hasOwnProperty('breakpoints')) {
    options.breakpoints = Object.assign({}, defaults.breakpoints, settings.breakpoints);
  }
  return options;
}
var EventsBus = /*#__PURE__*/function () {
  /**
   * Construct a EventBus instance.
   *
   * @param {Object} events
   */
  function EventsBus() {
    var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, EventsBus);
    this.events = events;
    this.hop = events.hasOwnProperty;
  }
  /**
   * Adds listener to the specifed event.
   *
   * @param {String|Array} event
   * @param {Function} handler
   */

  _createClass(EventsBus, [{
    key: "on",
    value: function on(event, handler) {
      if (isArray(event)) {
        for (var i = 0; i < event.length; i++) {
          this.on(event[i], handler);
        }
        return;
      } // Create the event's object if not yet created

      if (!this.hop.call(this.events, event)) {
        this.events[event] = [];
      } // Add the handler to queue

      var index = this.events[event].push(handler) - 1; // Provide handle back for removal of event

      return {
        remove: function remove() {
          delete this.events[event][index];
        }
      };
    }
    /**
     * Runs registered handlers for specified event.
     *
     * @param {String|Array} event
     * @param {Object=} context
     */
  }, {
    key: "emit",
    value: function emit(event, context) {
      if (isArray(event)) {
        for (var i = 0; i < event.length; i++) {
          this.emit(event[i], context);
        }
        return;
      } // If the event doesn't exist, or there's no handlers in queue, just leave

      if (!this.hop.call(this.events, event)) {
        return;
      } // Cycle through events queue, fire!

      this.events[event].forEach(function (item) {
        item(context || {});
      });
    }
  }]);
  return EventsBus;
}();
var Glide$1 = /*#__PURE__*/function () {
  /**
   * Construct glide.
   *
   * @param  {String} selector
   * @param  {Object} options
   */
  function Glide(selector) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, Glide);
    this._c = {};
    this._t = [];
    this._e = new EventsBus();
    this.disabled = false;
    this.selector = selector;
    this.settings = mergeOptions(defaults, options);
    this.index = this.settings.startAt;
  }
  /**
   * Initializes glide.
   *
   * @param {Object} extensions Collection of extensions to initialize.
   * @return {Glide}
   */

  _createClass(Glide, [{
    key: "mount",
    value: function mount$1() {
      var extensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this._e.emit('mount.before');
      if (isObject(extensions)) {
        this._c = mount(this, extensions, this._e);
      } else {
        warn('You need to provide a object on `mount()`');
      }
      this._e.emit('mount.after');
      return this;
    }
    /**
     * Collects an instance `translate` transformers.
     *
     * @param  {Array} transformers Collection of transformers.
     * @return {Void}
     */
  }, {
    key: "mutate",
    value: function mutate() {
      var transformers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      if (isArray(transformers)) {
        this._t = transformers;
      } else {
        warn('You need to provide a array on `mutate()`');
      }
      return this;
    }
    /**
     * Updates glide with specified settings.
     *
     * @param {Object} settings
     * @return {Glide}
     */
  }, {
    key: "update",
    value: function update() {
      var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.settings = mergeOptions(this.settings, settings);
      if (settings.hasOwnProperty('startAt')) {
        this.index = settings.startAt;
      }
      this._e.emit('update');
      return this;
    }
    /**
     * Change slide with specified pattern. A pattern must be in the special format:
     * `>` - Move one forward
     * `<` - Move one backward
     * `={i}` - Go to {i} zero-based slide (eq. '=1', will go to second slide)
     * `>>` - Rewinds to end (last slide)
     * `<<` - Rewinds to start (first slide)
     * `|>` - Move one viewport forward
     * `|<` - Move one viewport backward
     *
     * @param {String} pattern
     * @return {Glide}
     */
  }, {
    key: "go",
    value: function go(pattern) {
      this._c.Run.make(pattern);
      return this;
    }
    /**
     * Move track by specified distance.
     *
     * @param {String} distance
     * @return {Glide}
     */
  }, {
    key: "move",
    value: function move(distance) {
      this._c.Transition.disable();
      this._c.Move.make(distance);
      return this;
    }
    /**
     * Destroy instance and revert all changes done by this._c.
     *
     * @return {Glide}
     */
  }, {
    key: "destroy",
    value: function destroy() {
      this._e.emit('destroy');
      return this;
    }
    /**
     * Start instance autoplaying.
     *
     * @param {Boolean|Number} interval Run autoplaying with passed interval regardless of `autoplay` settings
     * @return {Glide}
     */
  }, {
    key: "play",
    value: function play() {
      var interval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (interval) {
        this.settings.autoplay = interval;
      }
      this._e.emit('play');
      return this;
    }
    /**
     * Stop instance autoplaying.
     *
     * @return {Glide}
     */
  }, {
    key: "pause",
    value: function pause() {
      this._e.emit('pause');
      return this;
    }
    /**
     * Sets glide into a idle status.
     *
     * @return {Glide}
     */
  }, {
    key: "disable",
    value: function disable() {
      this.disabled = true;
      return this;
    }
    /**
     * Sets glide into a active status.
     *
     * @return {Glide}
     */
  }, {
    key: "enable",
    value: function enable() {
      this.disabled = false;
      return this;
    }
    /**
     * Adds cuutom event listener with handler.
     *
     * @param  {String|Array} event
     * @param  {Function} handler
     * @return {Glide}
     */
  }, {
    key: "on",
    value: function on(event, handler) {
      this._e.on(event, handler);
      return this;
    }
    /**
     * Checks if glide is a precised type.
     *
     * @param  {String} name
     * @return {Boolean}
     */
  }, {
    key: "isType",
    value: function isType(name) {
      return this.settings.type === name;
    }
    /**
     * Gets value of the core options.
     *
     * @return {Object}
     */
  }, {
    key: "settings",
    get: function get() {
      return this._o;
    }
    /**
     * Sets value of the core options.
     *
     * @param  {Object} o
     * @return {Void}
     */,

    set: function set(o) {
      if (isObject(o)) {
        this._o = o;
      } else {
        warn('Options must be an `object` instance.');
      }
    }
    /**
     * Gets current index of the slider.
     *
     * @return {Object}
     */
  }, {
    key: "index",
    get: function get() {
      return this._i;
    }
    /**
     * Sets current index a slider.
     *
     * @return {Object}
     */,

    set: function set(i) {
      this._i = toInt(i);
    }
    /**
     * Gets type name of the slider.
     *
     * @return {String}
     */
  }, {
    key: "type",
    get: function get() {
      return this.settings.type;
    }
    /**
     * Gets value of the idle status.
     *
     * @return {Boolean}
     */
  }, {
    key: "disabled",
    get: function get() {
      return this._d;
    }
    /**
     * Sets value of the idle status.
     *
     * @return {Boolean}
     */,

    set: function set(status) {
      this._d = !!status;
    }
  }]);
  return Glide;
}();
function Run(Glide, Components, Events) {
  var Run = {
    /**
     * Initializes autorunning of the glide.
     *
     * @return {Void}
     */
    mount: function mount() {
      this._o = false;
    },
    /**
     * Makes glides running based on the passed moving schema.
     *
     * @param {String} move
     */
    make: function make(move) {
      var _this = this;
      if (!Glide.disabled) {
        !Glide.settings.waitForTransition || Glide.disable();
        this.move = move;
        Events.emit('run.before', this.move);
        this.calculate();
        Events.emit('run', this.move);
        Components.Transition.after(function () {
          if (_this.isStart()) {
            Events.emit('run.start', _this.move);
          }
          if (_this.isEnd()) {
            Events.emit('run.end', _this.move);
          }
          if (_this.isOffset()) {
            _this._o = false;
            Events.emit('run.offset', _this.move);
          }
          Events.emit('run.after', _this.move);
          Glide.enable();
        });
      }
    },
    /**
     * Calculates current index based on defined move.
     *
     * @return {Number|Undefined}
     */
    calculate: function calculate() {
      var move = this.move,
        length = this.length;
      var steps = move.steps,
        direction = move.direction; // By default assume that size of view is equal to one slide

      var viewSize = 1; // While direction is `=` we want jump to
      // a specified index described in steps.

      if (direction === '=') {
        // Check if bound is true, 
        // as we want to avoid whitespaces.
        if (Glide.settings.bound && toInt(steps) > length) {
          Glide.index = length;
          return;
        }
        Glide.index = steps;
        return;
      } // When pattern is equal to `>>` we want
      // fast forward to the last slide.

      if (direction === '>' && steps === '>') {
        Glide.index = length;
        return;
      } // When pattern is equal to `<<` we want
      // fast forward to the first slide.

      if (direction === '<' && steps === '<') {
        Glide.index = 0;
        return;
      } // pagination movement

      if (direction === '|') {
        viewSize = Glide.settings.perView || 1;
      } // we are moving forward

      if (direction === '>' || direction === '|' && steps === '>') {
        var index = calculateForwardIndex(viewSize);
        if (index > length) {
          this._o = true;
        }
        Glide.index = normalizeForwardIndex(index, viewSize);
        return;
      } // we are moving backward

      if (direction === '<' || direction === '|' && steps === '<') {
        var _index = calculateBackwardIndex(viewSize);
        if (_index < 0) {
          this._o = true;
        }
        Glide.index = normalizeBackwardIndex(_index, viewSize);
        return;
      }
      warn("Invalid direction pattern [".concat(direction).concat(steps, "] has been used"));
    },
    /**
     * Checks if we are on the first slide.
     *
     * @return {Boolean}
     */
    isStart: function isStart() {
      return Glide.index <= 0;
    },
    /**
     * Checks if we are on the last slide.
     *
     * @return {Boolean}
     */
    isEnd: function isEnd() {
      return Glide.index >= this.length;
    },
    /**
     * Checks if we are making a offset run.
     *
     * @param {String} direction
     * @return {Boolean}
     */
    isOffset: function isOffset() {
      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      if (!direction) {
        return this._o;
      }
      if (!this._o) {
        return false;
      } // did we view to the right?

      if (direction === '|>') {
        return this.move.direction === '|' && this.move.steps === '>';
      } // did we view to the left?

      if (direction === '|<') {
        return this.move.direction === '|' && this.move.steps === '<';
      }
      return this.move.direction === direction;
    },
    /**
     * Checks if bound mode is active
     *
     * @return {Boolean}
     */
    isBound: function isBound() {
      return Glide.isType('slider') && Glide.settings.focusAt !== 'center' && Glide.settings.bound;
    }
  };
  /**
   * Returns index value to move forward/to the right
   *
   * @param viewSize
   * @returns {Number}
   */

  function calculateForwardIndex(viewSize) {
    var index = Glide.index;
    if (Glide.isType('carousel')) {
      return index + viewSize;
    }
    return index + (viewSize - index % viewSize);
  }
  /**
   * Normalizes the given forward index based on glide settings, preventing it to exceed certain boundaries
   *
   * @param index
   * @param length
   * @param viewSize
   * @returns {Number}
   */

  function normalizeForwardIndex(index, viewSize) {
    var length = Run.length;
    if (index <= length) {
      return index;
    }
    if (Glide.isType('carousel')) {
      return index - (length + 1);
    }
    if (Glide.settings.rewind) {
      // bound does funny things with the length, therefor we have to be certain
      // that we are on the last possible index value given by bound
      if (Run.isBound() && !Run.isEnd()) {
        return length;
      }
      return 0;
    }
    if (Run.isBound()) {
      return length;
    }
    return Math.floor(length / viewSize) * viewSize;
  }
  /**
   * Calculates index value to move backward/to the left
   *
   * @param viewSize
   * @returns {Number}
   */

  function calculateBackwardIndex(viewSize) {
    var index = Glide.index;
    if (Glide.isType('carousel')) {
      return index - viewSize;
    } // ensure our back navigation results in the same index as a forward navigation
    // to experience a homogeneous paging

    var view = Math.ceil(index / viewSize);
    return (view - 1) * viewSize;
  }
  /**
   * Normalizes the given backward index based on glide settings, preventing it to exceed certain boundaries
   *
   * @param index
   * @param length
   * @param viewSize
   * @returns {*}
   */

  function normalizeBackwardIndex(index, viewSize) {
    var length = Run.length;
    if (index >= 0) {
      return index;
    }
    if (Glide.isType('carousel')) {
      return index + (length + 1);
    }
    if (Glide.settings.rewind) {
      // bound does funny things with the length, therefor we have to be certain
      // that we are on first possible index value before we to rewind to the length given by bound
      if (Run.isBound() && Run.isStart()) {
        return length;
      }
      return Math.floor(length / viewSize) * viewSize;
    }
    return 0;
  }
  define(Run, 'move', {
    /**
     * Gets value of the move schema.
     *
     * @returns {Object}
     */
    get: function get() {
      return this._m;
    },
    /**
     * Sets value of the move schema.
     *
     * @returns {Object}
     */
    set: function set(value) {
      var step = value.substr(1);
      this._m = {
        direction: value.substr(0, 1),
        steps: step ? toInt(step) ? toInt(step) : step : 0
      };
    }
  });
  define(Run, 'length', {
    /**
     * Gets value of the running distance based
     * on zero-indexing number of slides.
     *
     * @return {Number}
     */
    get: function get() {
      var settings = Glide.settings;
      var length = Components.Html.slides.length; // If the `bound` option is active, a maximum running distance should be
      // reduced by `perView` and `focusAt` settings. Running distance
      // should end before creating an empty space after instance.

      if (this.isBound()) {
        return length - 1 - (toInt(settings.perView) - 1) + toInt(settings.focusAt);
      }
      return length - 1;
    }
  });
  define(Run, 'offset', {
    /**
     * Gets status of the offsetting flag.
     *
     * @return {Boolean}
     */
    get: function get() {
      return this._o;
    }
  });
  return Run;
}

/**
 * Returns a current time.
 *
 * @return {Number}
 */
function now() {
  return new Date().getTime();
}

/**
 * Returns a function, that, when invoked, will only be triggered
 * at most once during a given window of time.
 *
 * @param {Function} func
 * @param {Number} wait
 * @param {Object=} options
 * @return {Function}
 *
 * @see https://github.com/jashkenas/underscore
 */

function throttle(func, wait) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var timeout, context, args, result;
  var previous = 0;
  var later = function later() {
    previous = options.leading === false ? 0 : now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  var throttled = function throttled() {
    var at = now();
    if (!previous && options.leading === false) previous = at;
    var remaining = wait - (at - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = at;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };
  return throttled;
}
var MARGIN_TYPE = {
  ltr: ['marginLeft', 'marginRight'],
  rtl: ['marginRight', 'marginLeft']
};
function Gaps(Glide, Components, Events) {
  var Gaps = {
    /**
     * Applies gaps between slides. First and last
     * slides do not receive it's edge margins.
     *
     * @param {HTMLCollection} slides
     * @return {Void}
     */
    apply: function apply(slides) {
      for (var i = 0, len = slides.length; i < len; i++) {
        var style = slides[i].style;
        var direction = Components.Direction.value;
        if (i !== 0) {
          style[MARGIN_TYPE[direction][0]] = "".concat(this.value / 2, "px");
        } else {
          style[MARGIN_TYPE[direction][0]] = '';
        }
        if (i !== slides.length - 1) {
          style[MARGIN_TYPE[direction][1]] = "".concat(this.value / 2, "px");
        } else {
          style[MARGIN_TYPE[direction][1]] = '';
        }
      }
    },
    /**
     * Removes gaps from the slides.
     *
     * @param {HTMLCollection} slides
     * @returns {Void}
    */
    remove: function remove(slides) {
      for (var i = 0, len = slides.length; i < len; i++) {
        var style = slides[i].style;
        style.marginLeft = '';
        style.marginRight = '';
      }
    }
  };
  define(Gaps, 'value', {
    /**
     * Gets value of the gap.
     *
     * @returns {Number}
     */
    get: function get() {
      return toInt(Glide.settings.gap);
    }
  });
  define(Gaps, 'grow', {
    /**
     * Gets additional dimensions value caused by gaps.
     * Used to increase width of the slides wrapper.
     *
     * @returns {Number}
     */
    get: function get() {
      return Gaps.value * Components.Sizes.length;
    }
  });
  define(Gaps, 'reductor', {
    /**
     * Gets reduction value caused by gaps.
     * Used to subtract width of the slides.
     *
     * @returns {Number}
     */
    get: function get() {
      var perView = Glide.settings.perView;
      return Gaps.value * (perView - 1) / perView;
    }
  });
  /**
   * Apply calculated gaps:
   * - after building, so slides (including clones) will receive proper margins
   * - on updating via API, to recalculate gaps with new options
   */

  Events.on(['build.after', 'update'], throttle(function () {
    Gaps.apply(Components.Html.wrapper.children);
  }, 30));
  /**
   * Remove gaps:
   * - on destroying to bring markup to its inital state
   */

  Events.on('destroy', function () {
    Gaps.remove(Components.Html.wrapper.children);
  });
  return Gaps;
}

/**
 * Finds siblings nodes of the passed node.
 *
 * @param  {Element} node
 * @return {Array}
 */
function siblings(node) {
  if (node && node.parentNode) {
    var n = node.parentNode.firstChild;
    var matched = [];
    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== node) {
        matched.push(n);
      }
    }
    return matched;
  }
  return [];
}
/**
 * Coerces a NodeList to an Array.
 *
 * @param  {NodeList} nodeList
 * @return {Array}
 */

function toArray(nodeList) {
  return Array.prototype.slice.call(nodeList);
}
var TRACK_SELECTOR = '[data-glide-el="track"]';
function Html(Glide, Components, Events) {
  var Html = {
    /**
     * Setup slider HTML nodes.
     *
     * @param {Glide} glide
     */
    mount: function mount() {
      this.root = Glide.selector;
      this.track = this.root.querySelector(TRACK_SELECTOR);
      this.collectSlides();
    },
    /**
     * Collect slides
     */
    collectSlides: function collectSlides() {
      this.slides = toArray(this.wrapper.children).filter(function (slide) {
        return !slide.classList.contains(Glide.settings.classes.slide.clone);
      });
    }
  };
  define(Html, 'root', {
    /**
     * Gets node of the glide main element.
     *
     * @return {Object}
     */
    get: function get() {
      return Html._r;
    },
    /**
     * Sets node of the glide main element.
     *
     * @return {Object}
     */
    set: function set(r) {
      if (isString(r)) {
        r = document.querySelector(r);
      }
      if (r !== null) {
        Html._r = r;
      } else {
        warn('Root element must be a existing Html node');
      }
    }
  });
  define(Html, 'track', {
    /**
     * Gets node of the glide track with slides.
     *
     * @return {Object}
     */
    get: function get() {
      return Html._t;
    },
    /**
     * Sets node of the glide track with slides.
     *
     * @return {Object}
     */
    set: function set(t) {
      Html._t = t;
    }
  });
  define(Html, 'wrapper', {
    /**
     * Gets node of the slides wrapper.
     *
     * @return {Object}
     */
    get: function get() {
      return Html.track.children[0];
    }
  });
  /**
   * Add/remove/reorder dynamic slides
   */

  Events.on('update', function () {
    Html.collectSlides();
  });
  return Html;
}
function Peek(Glide, Components, Events) {
  var Peek = {
    /**
     * Setups how much to peek based on settings.
     *
     * @return {Void}
     */
    mount: function mount() {
      this.value = Glide.settings.peek;
    }
  };
  define(Peek, 'value', {
    /**
     * Gets value of the peek.
     *
     * @returns {Number|Object}
     */
    get: function get() {
      return Peek._v;
    },
    /**
     * Sets value of the peek.
     *
     * @param {Number|Object} value
     * @return {Void}
     */
    set: function set(value) {
      if (isObject(value)) {
        value.before = toInt(value.before);
        value.after = toInt(value.after);
      } else {
        value = toInt(value);
      }
      Peek._v = value;
    }
  });
  define(Peek, 'reductor', {
    /**
     * Gets reduction value caused by peek.
     *
     * @returns {Number}
     */
    get: function get() {
      var value = Peek.value;
      var perView = Glide.settings.perView;
      if (isObject(value)) {
        return value.before / perView + value.after / perView;
      }
      return value * 2 / perView;
    }
  });
  /**
   * Recalculate peeking sizes on:
   * - when resizing window to update to proper percents
   */

  Events.on(['resize', 'update'], function () {
    Peek.mount();
  });
  return Peek;
}
function Move(Glide, Components, Events) {
  var Move = {
    /**
     * Constructs move component.
     *
     * @returns {Void}
     */
    mount: function mount() {
      this._o = 0;
    },
    /**
     * Calculates a movement value based on passed offset and currently active index.
     *
     * @param  {Number} offset
     * @return {Void}
     */
    make: function make() {
      var _this = this;
      var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      this.offset = offset;
      Events.emit('move', {
        movement: this.value
      });
      Components.Transition.after(function () {
        Events.emit('move.after', {
          movement: _this.value
        });
      });
    }
  };
  define(Move, 'offset', {
    /**
     * Gets an offset value used to modify current translate.
     *
     * @return {Object}
     */
    get: function get() {
      return Move._o;
    },
    /**
     * Sets an offset value used to modify current translate.
     *
     * @return {Object}
     */
    set: function set(value) {
      Move._o = !isUndefined(value) ? toInt(value) : 0;
    }
  });
  define(Move, 'translate', {
    /**
     * Gets a raw movement value.
     *
     * @return {Number}
     */
    get: function get() {
      return Components.Sizes.slideWidth * Glide.index;
    }
  });
  define(Move, 'value', {
    /**
     * Gets an actual movement value corrected by offset.
     *
     * @return {Number}
     */
    get: function get() {
      var offset = this.offset;
      var translate = this.translate;
      if (Components.Direction.is('rtl')) {
        return translate + offset;
      }
      return translate - offset;
    }
  });
  /**
   * Make movement to proper slide on:
   * - before build, so glide will start at `startAt` index
   * - on each standard run to move to newly calculated index
   */

  Events.on(['build.before', 'run'], function () {
    Move.make();
  });
  return Move;
}
function Sizes(Glide, Components, Events) {
  var Sizes = {
    /**
     * Setups dimensions of slides.
     *
     * @return {Void}
     */
    setupSlides: function setupSlides() {
      var width = "".concat(this.slideWidth, "px");
      var slides = Components.Html.slides;
      for (var i = 0; i < slides.length; i++) {
        slides[i].style.width = width;
      }
    },
    /**
     * Setups dimensions of slides wrapper.
     *
     * @return {Void}
     */
    setupWrapper: function setupWrapper() {
      Components.Html.wrapper.style.width = "".concat(this.wrapperSize, "px");
    },
    /**
     * Removes applied styles from HTML elements.
     *
     * @returns {Void}
     */
    remove: function remove() {
      var slides = Components.Html.slides;
      for (var i = 0; i < slides.length; i++) {
        slides[i].style.width = '';
      }
      Components.Html.wrapper.style.width = '';
    }
  };
  define(Sizes, 'length', {
    /**
     * Gets count number of the slides.
     *
     * @return {Number}
     */
    get: function get() {
      return Components.Html.slides.length;
    }
  });
  define(Sizes, 'width', {
    /**
     * Gets width value of the slider (visible area).
     *
     * @return {Number}
     */
    get: function get() {
      return Components.Html.track.offsetWidth;
    }
  });
  define(Sizes, 'wrapperSize', {
    /**
     * Gets size of the slides wrapper.
     *
     * @return {Number}
     */
    get: function get() {
      return Sizes.slideWidth * Sizes.length + Components.Gaps.grow + Components.Clones.grow;
    }
  });
  define(Sizes, 'slideWidth', {
    /**
     * Gets width value of a single slide.
     *
     * @return {Number}
     */
    get: function get() {
      return Sizes.width / Glide.settings.perView - Components.Peek.reductor - Components.Gaps.reductor;
    }
  });
  /**
   * Apply calculated glide's dimensions:
   * - before building, so other dimensions (e.g. translate) will be calculated propertly
   * - when resizing window to recalculate sildes dimensions
   * - on updating via API, to calculate dimensions based on new options
   */

  Events.on(['build.before', 'resize', 'update'], function () {
    Sizes.setupSlides();
    Sizes.setupWrapper();
  });
  /**
   * Remove calculated glide's dimensions:
   * - on destoting to bring markup to its inital state
   */

  Events.on('destroy', function () {
    Sizes.remove();
  });
  return Sizes;
}
function Build(Glide, Components, Events) {
  var Build = {
    /**
     * Init glide building. Adds classes, sets
     * dimensions and setups initial state.
     *
     * @return {Void}
     */
    mount: function mount() {
      Events.emit('build.before');
      this.typeClass();
      this.activeClass();
      Events.emit('build.after');
    },
    /**
     * Adds `type` class to the glide element.
     *
     * @return {Void}
     */
    typeClass: function typeClass() {
      Components.Html.root.classList.add(Glide.settings.classes.type[Glide.settings.type]);
    },
    /**
     * Sets active class to current slide.
     *
     * @return {Void}
     */
    activeClass: function activeClass() {
      var classes = Glide.settings.classes;
      var slide = Components.Html.slides[Glide.index];
      if (slide) {
        slide.classList.add(classes.slide.active);
        siblings(slide).forEach(function (sibling) {
          sibling.classList.remove(classes.slide.active);
        });
      }
    },
    /**
     * Removes HTML classes applied at building.
     *
     * @return {Void}
     */
    removeClasses: function removeClasses() {
      var _Glide$settings$class = Glide.settings.classes,
        type = _Glide$settings$class.type,
        slide = _Glide$settings$class.slide;
      Components.Html.root.classList.remove(type[Glide.settings.type]);
      Components.Html.slides.forEach(function (sibling) {
        sibling.classList.remove(slide.active);
      });
    }
  };
  /**
   * Clear building classes:
   * - on destroying to bring HTML to its initial state
   * - on updating to remove classes before remounting component
   */

  Events.on(['destroy', 'update'], function () {
    Build.removeClasses();
  });
  /**
   * Remount component:
   * - on resizing of the window to calculate new dimensions
   * - on updating settings via API
   */

  Events.on(['resize', 'update'], function () {
    Build.mount();
  });
  /**
   * Swap active class of current slide:
   * - after each move to the new index
   */

  Events.on('move.after', function () {
    Build.activeClass();
  });
  return Build;
}
function Clones(Glide, Components, Events) {
  var Clones = {
    /**
     * Create pattern map and collect slides to be cloned.
     */
    mount: function mount() {
      this.items = [];
      if (Glide.isType('carousel')) {
        this.items = this.collect();
      }
    },
    /**
     * Collect clones with pattern.
     *
     * @return {[]}
     */
    collect: function collect() {
      var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var slides = Components.Html.slides;
      var _Glide$settings = Glide.settings,
        perView = _Glide$settings.perView,
        classes = _Glide$settings.classes,
        cloningRatio = _Glide$settings.cloningRatio;
      if (slides.length > 0) {
        var peekIncrementer = +!!Glide.settings.peek;
        var cloneCount = perView + peekIncrementer + Math.round(perView / 2);
        var append = slides.slice(0, cloneCount).reverse();
        var prepend = slides.slice(cloneCount * -1);
        for (var r = 0; r < Math.max(cloningRatio, Math.floor(perView / slides.length)); r++) {
          for (var i = 0; i < append.length; i++) {
            var clone = append[i].cloneNode(true);
            clone.classList.add(classes.slide.clone);
            items.push(clone);
          }
          for (var _i = 0; _i < prepend.length; _i++) {
            var _clone = prepend[_i].cloneNode(true);
            _clone.classList.add(classes.slide.clone);
            items.unshift(_clone);
          }
        }
      }
      return items;
    },
    /**
     * Append cloned slides with generated pattern.
     *
     * @return {Void}
     */
    append: function append() {
      var items = this.items;
      var _Components$Html = Components.Html,
        wrapper = _Components$Html.wrapper,
        slides = _Components$Html.slides;
      var half = Math.floor(items.length / 2);
      var prepend = items.slice(0, half).reverse();
      var append = items.slice(half * -1).reverse();
      var width = "".concat(Components.Sizes.slideWidth, "px");
      for (var i = 0; i < append.length; i++) {
        wrapper.appendChild(append[i]);
      }
      for (var _i2 = 0; _i2 < prepend.length; _i2++) {
        wrapper.insertBefore(prepend[_i2], slides[0]);
      }
      for (var _i3 = 0; _i3 < items.length; _i3++) {
        items[_i3].style.width = width;
      }
    },
    /**
     * Remove all cloned slides.
     *
     * @return {Void}
     */
    remove: function remove() {
      var items = this.items;
      for (var i = 0; i < items.length; i++) {
        Components.Html.wrapper.removeChild(items[i]);
      }
    }
  };
  define(Clones, 'grow', {
    /**
     * Gets additional dimensions value caused by clones.
     *
     * @return {Number}
     */
    get: function get() {
      return (Components.Sizes.slideWidth + Components.Gaps.value) * Clones.items.length;
    }
  });
  /**
   * Append additional slide's clones:
   * - while glide's type is `carousel`
   */

  Events.on('update', function () {
    Clones.remove();
    Clones.mount();
    Clones.append();
  });
  /**
   * Append additional slide's clones:
   * - while glide's type is `carousel`
   */

  Events.on('build.before', function () {
    if (Glide.isType('carousel')) {
      Clones.append();
    }
  });
  /**
   * Remove clones HTMLElements:
   * - on destroying, to bring HTML to its initial state
   */

  Events.on('destroy', function () {
    Clones.remove();
  });
  return Clones;
}
var EventsBinder = /*#__PURE__*/function () {
  /**
   * Construct a EventsBinder instance.
   */
  function EventsBinder() {
    var listeners = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, EventsBinder);
    this.listeners = listeners;
  }
  /**
   * Adds events listeners to arrows HTML elements.
   *
   * @param  {String|Array} events
   * @param  {Element|Window|Document} el
   * @param  {Function} closure
   * @param  {Boolean|Object} capture
   * @return {Void}
   */

  _createClass(EventsBinder, [{
    key: "on",
    value: function on(events, el, closure) {
      var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      if (isString(events)) {
        events = [events];
      }
      for (var i = 0; i < events.length; i++) {
        this.listeners[events[i]] = closure;
        el.addEventListener(events[i], this.listeners[events[i]], capture);
      }
    }
    /**
     * Removes event listeners from arrows HTML elements.
     *
     * @param  {String|Array} events
     * @param  {Element|Window|Document} el
     * @param  {Boolean|Object} capture
     * @return {Void}
     */
  }, {
    key: "off",
    value: function off(events, el) {
      var capture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (isString(events)) {
        events = [events];
      }
      for (var i = 0; i < events.length; i++) {
        el.removeEventListener(events[i], this.listeners[events[i]], capture);
      }
    }
    /**
     * Destroy collected listeners.
     *
     * @returns {Void}
     */
  }, {
    key: "destroy",
    value: function destroy() {
      delete this.listeners;
    }
  }]);
  return EventsBinder;
}();
function Resize(Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();
  var Resize = {
    /**
     * Initializes window bindings.
     */
    mount: function mount() {
      this.bind();
    },
    /**
     * Binds `rezsize` listener to the window.
     * It's a costly event, so we are debouncing it.
     *
     * @return {Void}
     */
    bind: function bind() {
      Binder.on('resize', window, throttle(function () {
        Events.emit('resize');
      }, Glide.settings.throttle));
    },
    /**
     * Unbinds listeners from the window.
     *
     * @return {Void}
     */
    unbind: function unbind() {
      Binder.off('resize', window);
    }
  };
  /**
   * Remove bindings from window:
   * - on destroying, to remove added EventListener
   */

  Events.on('destroy', function () {
    Resize.unbind();
    Binder.destroy();
  });
  return Resize;
}
var VALID_DIRECTIONS = ['ltr', 'rtl'];
var FLIPED_MOVEMENTS = {
  '>': '<',
  '<': '>',
  '=': '='
};
function Direction(Glide, Components, Events) {
  var Direction = {
    /**
     * Setups gap value based on settings.
     *
     * @return {Void}
     */
    mount: function mount() {
      this.value = Glide.settings.direction;
    },
    /**
     * Resolves pattern based on direction value
     *
     * @param {String} pattern
     * @returns {String}
     */
    resolve: function resolve(pattern) {
      var token = pattern.slice(0, 1);
      if (this.is('rtl')) {
        return pattern.split(token).join(FLIPED_MOVEMENTS[token]);
      }
      return pattern;
    },
    /**
     * Checks value of direction mode.
     *
     * @param {String} direction
     * @returns {Boolean}
     */
    is: function is(direction) {
      return this.value === direction;
    },
    /**
     * Applies direction class to the root HTML element.
     *
     * @return {Void}
     */
    addClass: function addClass() {
      Components.Html.root.classList.add(Glide.settings.classes.direction[this.value]);
    },
    /**
     * Removes direction class from the root HTML element.
     *
     * @return {Void}
     */
    removeClass: function removeClass() {
      Components.Html.root.classList.remove(Glide.settings.classes.direction[this.value]);
    }
  };
  define(Direction, 'value', {
    /**
     * Gets value of the direction.
     *
     * @returns {Number}
     */
    get: function get() {
      return Direction._v;
    },
    /**
     * Sets value of the direction.
     *
     * @param {String} value
     * @return {Void}
     */
    set: function set(value) {
      if (VALID_DIRECTIONS.indexOf(value) > -1) {
        Direction._v = value;
      } else {
        warn('Direction value must be `ltr` or `rtl`');
      }
    }
  });
  /**
   * Clear direction class:
   * - on destroy to bring HTML to its initial state
   * - on update to remove class before reappling bellow
   */

  Events.on(['destroy', 'update'], function () {
    Direction.removeClass();
  });
  /**
   * Remount component:
   * - on update to reflect changes in direction value
   */

  Events.on('update', function () {
    Direction.mount();
  });
  /**
   * Apply direction class:
   * - before building to apply class for the first time
   * - on updating to reapply direction class that may changed
   */

  Events.on(['build.before', 'update'], function () {
    Direction.addClass();
  });
  return Direction;
}

/**
 * Reflects value of glide movement.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */
function Rtl(Glide, Components) {
  return {
    /**
     * Negates the passed translate if glide is in RTL option.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function modify(translate) {
      if (Components.Direction.is('rtl')) {
        return -translate;
      }
      return translate;
    }
  };
}

/**
 * Updates glide movement with a `gap` settings.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */
function Gap(Glide, Components) {
  return {
    /**
     * Modifies passed translate value with number in the `gap` settings.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function modify(translate) {
      var multiplier = Math.floor(translate / Components.Sizes.slideWidth);
      return translate + Components.Gaps.value * multiplier;
    }
  };
}

/**
 * Updates glide movement with width of additional clones width.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */
function Grow(Glide, Components) {
  return {
    /**
     * Adds to the passed translate width of the half of clones.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function modify(translate) {
      return translate + Components.Clones.grow / 2;
    }
  };
}

/**
 * Updates glide movement with a `peek` settings.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */

function Peeking(Glide, Components) {
  return {
    /**
     * Modifies passed translate value with a `peek` setting.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function modify(translate) {
      if (Glide.settings.focusAt >= 0) {
        var peek = Components.Peek.value;
        if (isObject(peek)) {
          return translate - peek.before;
        }
        return translate - peek;
      }
      return translate;
    }
  };
}

/**
 * Updates glide movement with a `focusAt` settings.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */
function Focusing(Glide, Components) {
  return {
    /**
     * Modifies passed translate value with index in the `focusAt` setting.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function modify(translate) {
      var gap = Components.Gaps.value;
      var width = Components.Sizes.width;
      var focusAt = Glide.settings.focusAt;
      var slideWidth = Components.Sizes.slideWidth;
      if (focusAt === 'center') {
        return translate - (width / 2 - slideWidth / 2);
      }
      return translate - slideWidth * focusAt - gap * focusAt;
    }
  };
}

/**
 * Applies diffrent transformers on translate value.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */

function mutator(Glide, Components, Events) {
  /**
   * Merge instance transformers with collection of default transformers.
   * It's important that the Rtl component be last on the list,
   * so it reflects all previous transformations.
   *
   * @type {Array}
   */
  var TRANSFORMERS = [Gap, Grow, Peeking, Focusing].concat(Glide._t, [Rtl]);
  return {
    /**
     * Piplines translate value with registered transformers.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    mutate: function mutate(translate) {
      for (var i = 0; i < TRANSFORMERS.length; i++) {
        var transformer = TRANSFORMERS[i];
        if (isFunction(transformer) && isFunction(transformer().modify)) {
          translate = transformer(Glide, Components, Events).modify(translate);
        } else {
          warn('Transformer should be a function that returns an object with `modify()` method');
        }
      }
      return translate;
    }
  };
}
function Translate(Glide, Components, Events) {
  var Translate = {
    /**
     * Sets value of translate on HTML element.
     *
     * @param {Number} value
     * @return {Void}
     */
    set: function set(value) {
      var transform = mutator(Glide, Components).mutate(value);
      var translate3d = "translate3d(".concat(-1 * transform, "px, 0px, 0px)");
      Components.Html.wrapper.style.mozTransform = translate3d; // needed for supported Firefox 10-15

      Components.Html.wrapper.style.webkitTransform = translate3d; // needed for supported Chrome 10-35, Safari 5.1-8, and Opera 15-22

      Components.Html.wrapper.style.transform = translate3d;
    },
    /**
     * Removes value of translate from HTML element.
     *
     * @return {Void}
     */
    remove: function remove() {
      Components.Html.wrapper.style.transform = '';
    },
    /**
     * @return {number}
     */
    getStartIndex: function getStartIndex() {
      var length = Components.Sizes.length;
      var index = Glide.index;
      var perView = Glide.settings.perView;
      if (Components.Run.isOffset('>') || Components.Run.isOffset('|>')) {
        return length + (index - perView);
      } // "modulo length" converts an index that equals length to zero

      return (index + perView) % length;
    },
    /**
     * @return {number}
     */
    getTravelDistance: function getTravelDistance() {
      var travelDistance = Components.Sizes.slideWidth * Glide.settings.perView;
      if (Components.Run.isOffset('>') || Components.Run.isOffset('|>')) {
        // reverse travel distance so that we don't have to change subtract operations
        return travelDistance * -1;
      }
      return travelDistance;
    }
  };
  /**
   * Set new translate value:
   * - on move to reflect index change
   * - on updating via API to reflect possible changes in options
   */

  Events.on('move', function (context) {
    if (!Glide.isType('carousel') || !Components.Run.isOffset()) {
      return Translate.set(context.movement);
    }
    Components.Transition.after(function () {
      Events.emit('translate.jump');
      Translate.set(Components.Sizes.slideWidth * Glide.index);
    });
    var startWidth = Components.Sizes.slideWidth * Components.Translate.getStartIndex();
    return Translate.set(startWidth - Components.Translate.getTravelDistance());
  });
  /**
   * Remove translate:
   * - on destroying to bring markup to its inital state
   */

  Events.on('destroy', function () {
    Translate.remove();
  });
  return Translate;
}
function Transition(Glide, Components, Events) {
  /**
   * Holds inactivity status of transition.
   * When true transition is not applied.
   *
   * @type {Boolean}
   */
  var disabled = false;
  var Transition = {
    /**
     * Composes string of the CSS transition.
     *
     * @param {String} property
     * @return {String}
     */
    compose: function compose(property) {
      var settings = Glide.settings;
      if (disabled) {
        return "".concat(property, " 0ms ").concat(settings.animationTimingFunc);
      }
      return "".concat(property, " ").concat(this.duration, "ms ").concat(settings.animationTimingFunc);
    },
    /**
     * Sets value of transition on HTML element.
     *
     * @param {String=} property
     * @return {Void}
     */
    set: function set() {
      var property = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'transform';
      Components.Html.wrapper.style.transition = this.compose(property);
    },
    /**
     * Removes value of transition from HTML element.
     *
     * @return {Void}
     */
    remove: function remove() {
      Components.Html.wrapper.style.transition = '';
    },
    /**
     * Runs callback after animation.
     *
     * @param  {Function} callback
     * @return {Void}
     */
    after: function after(callback) {
      setTimeout(function () {
        callback();
      }, this.duration);
    },
    /**
     * Enable transition.
     *
     * @return {Void}
     */
    enable: function enable() {
      disabled = false;
      this.set();
    },
    /**
     * Disable transition.
     *
     * @return {Void}
     */
    disable: function disable() {
      disabled = true;
      this.set();
    }
  };
  define(Transition, 'duration', {
    /**
     * Gets duration of the transition based
     * on currently running animation type.
     *
     * @return {Number}
     */
    get: function get() {
      var settings = Glide.settings;
      if (Glide.isType('slider') && Components.Run.offset) {
        return settings.rewindDuration;
      }
      return settings.animationDuration;
    }
  });
  /**
   * Set transition `style` value:
   * - on each moving, because it may be cleared by offset move
   */

  Events.on('move', function () {
    Transition.set();
  });
  /**
   * Disable transition:
   * - before initial build to avoid transitioning from `0` to `startAt` index
   * - while resizing window and recalculating dimensions
   * - on jumping from offset transition at start and end edges in `carousel` type
   */

  Events.on(['build.before', 'resize', 'translate.jump'], function () {
    Transition.disable();
  });
  /**
   * Enable transition:
   * - on each running, because it may be disabled by offset move
   */

  Events.on('run', function () {
    Transition.enable();
  });
  /**
   * Remove transition:
   * - on destroying to bring markup to its inital state
   */

  Events.on('destroy', function () {
    Transition.remove();
  });
  return Transition;
}

/**
 * Test via a getter in the options object to see
 * if the passive property is accessed.
 *
 * @see https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
 */
var supportsPassive = false;
try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function get() {
      supportsPassive = true;
    }
  });
  window.addEventListener('testPassive', null, opts);
  window.removeEventListener('testPassive', null, opts);
} catch (e) {}
var supportsPassive$1 = supportsPassive;
var START_EVENTS = ['touchstart', 'mousedown'];
var MOVE_EVENTS = ['touchmove', 'mousemove'];
var END_EVENTS = ['touchend', 'touchcancel', 'mouseup', 'mouseleave'];
var MOUSE_EVENTS = ['mousedown', 'mousemove', 'mouseup', 'mouseleave'];
function Swipe(Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();
  var swipeSin = 0;
  var swipeStartX = 0;
  var swipeStartY = 0;
  var disabled = false;
  var capture = supportsPassive$1 ? {
    passive: true
  } : false;
  var Swipe = {
    /**
     * Initializes swipe bindings.
     *
     * @return {Void}
     */
    mount: function mount() {
      this.bindSwipeStart();
    },
    /**
     * Handler for `swipestart` event. Calculates entry points of the user's tap.
     *
     * @param {Object} event
     * @return {Void}
     */
    start: function start(event) {
      if (!disabled && !Glide.disabled) {
        this.disable();
        var swipe = this.touches(event);
        swipeSin = null;
        swipeStartX = toInt(swipe.pageX);
        swipeStartY = toInt(swipe.pageY);
        this.bindSwipeMove();
        this.bindSwipeEnd();
        Events.emit('swipe.start');
      }
    },
    /**
     * Handler for `swipemove` event. Calculates user's tap angle and distance.
     *
     * @param {Object} event
     */
    move: function move(event) {
      if (!Glide.disabled) {
        var _Glide$settings = Glide.settings,
          touchAngle = _Glide$settings.touchAngle,
          touchRatio = _Glide$settings.touchRatio,
          classes = _Glide$settings.classes;
        var swipe = this.touches(event);
        var subExSx = toInt(swipe.pageX) - swipeStartX;
        var subEySy = toInt(swipe.pageY) - swipeStartY;
        var powEX = Math.abs(subExSx << 2);
        var powEY = Math.abs(subEySy << 2);
        var swipeHypotenuse = Math.sqrt(powEX + powEY);
        var swipeCathetus = Math.sqrt(powEY);
        swipeSin = Math.asin(swipeCathetus / swipeHypotenuse);
        if (swipeSin * 180 / Math.PI < touchAngle) {
          event.stopPropagation();
          Components.Move.make(subExSx * toFloat(touchRatio));
          Components.Html.root.classList.add(classes.dragging);
          Events.emit('swipe.move');
        } else {
          return false;
        }
      }
    },
    /**
     * Handler for `swipeend` event. Finitializes user's tap and decides about glide move.
     *
     * @param {Object} event
     * @return {Void}
     */
    end: function end(event) {
      if (!Glide.disabled) {
        var _Glide$settings2 = Glide.settings,
          perSwipe = _Glide$settings2.perSwipe,
          touchAngle = _Glide$settings2.touchAngle,
          classes = _Glide$settings2.classes;
        var swipe = this.touches(event);
        var threshold = this.threshold(event);
        var swipeDistance = swipe.pageX - swipeStartX;
        var swipeDeg = swipeSin * 180 / Math.PI;
        this.enable();
        if (swipeDistance > threshold && swipeDeg < touchAngle) {
          Components.Run.make(Components.Direction.resolve("".concat(perSwipe, "<")));
        } else if (swipeDistance < -threshold && swipeDeg < touchAngle) {
          Components.Run.make(Components.Direction.resolve("".concat(perSwipe, ">")));
        } else {
          // While swipe don't reach distance apply previous transform.
          Components.Move.make();
        }
        Components.Html.root.classList.remove(classes.dragging);
        this.unbindSwipeMove();
        this.unbindSwipeEnd();
        Events.emit('swipe.end');
      }
    },
    /**
     * Binds swipe's starting event.
     *
     * @return {Void}
     */
    bindSwipeStart: function bindSwipeStart() {
      var _this = this;
      var _Glide$settings3 = Glide.settings,
        swipeThreshold = _Glide$settings3.swipeThreshold,
        dragThreshold = _Glide$settings3.dragThreshold;
      if (swipeThreshold) {
        Binder.on(START_EVENTS[0], Components.Html.wrapper, function (event) {
          _this.start(event);
        }, capture);
      }
      if (dragThreshold) {
        Binder.on(START_EVENTS[1], Components.Html.wrapper, function (event) {
          _this.start(event);
        }, capture);
      }
    },
    /**
     * Unbinds swipe's starting event.
     *
     * @return {Void}
     */
    unbindSwipeStart: function unbindSwipeStart() {
      Binder.off(START_EVENTS[0], Components.Html.wrapper, capture);
      Binder.off(START_EVENTS[1], Components.Html.wrapper, capture);
    },
    /**
     * Binds swipe's moving event.
     *
     * @return {Void}
     */
    bindSwipeMove: function bindSwipeMove() {
      var _this2 = this;
      Binder.on(MOVE_EVENTS, Components.Html.wrapper, throttle(function (event) {
        _this2.move(event);
      }, Glide.settings.throttle), capture);
    },
    /**
     * Unbinds swipe's moving event.
     *
     * @return {Void}
     */
    unbindSwipeMove: function unbindSwipeMove() {
      Binder.off(MOVE_EVENTS, Components.Html.wrapper, capture);
    },
    /**
     * Binds swipe's ending event.
     *
     * @return {Void}
     */
    bindSwipeEnd: function bindSwipeEnd() {
      var _this3 = this;
      Binder.on(END_EVENTS, Components.Html.wrapper, function (event) {
        _this3.end(event);
      });
    },
    /**
     * Unbinds swipe's ending event.
     *
     * @return {Void}
     */
    unbindSwipeEnd: function unbindSwipeEnd() {
      Binder.off(END_EVENTS, Components.Html.wrapper);
    },
    /**
     * Normalizes event touches points accorting to different types.
     *
     * @param {Object} event
     */
    touches: function touches(event) {
      if (MOUSE_EVENTS.indexOf(event.type) > -1) {
        return event;
      }
      return event.touches[0] || event.changedTouches[0];
    },
    /**
     * Gets value of minimum swipe distance settings based on event type.
     *
     * @return {Number}
     */
    threshold: function threshold(event) {
      var settings = Glide.settings;
      if (MOUSE_EVENTS.indexOf(event.type) > -1) {
        return settings.dragThreshold;
      }
      return settings.swipeThreshold;
    },
    /**
     * Enables swipe event.
     *
     * @return {self}
     */
    enable: function enable() {
      disabled = false;
      Components.Transition.enable();
      return this;
    },
    /**
     * Disables swipe event.
     *
     * @return {self}
     */
    disable: function disable() {
      disabled = true;
      Components.Transition.disable();
      return this;
    }
  };
  /**
   * Add component class:
   * - after initial building
   */

  Events.on('build.after', function () {
    Components.Html.root.classList.add(Glide.settings.classes.swipeable);
  });
  /**
   * Remove swiping bindings:
   * - on destroying, to remove added EventListeners
   */

  Events.on('destroy', function () {
    Swipe.unbindSwipeStart();
    Swipe.unbindSwipeMove();
    Swipe.unbindSwipeEnd();
    Binder.destroy();
  });
  return Swipe;
}
function Images(Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();
  var Images = {
    /**
     * Binds listener to glide wrapper.
     *
     * @return {Void}
     */
    mount: function mount() {
      this.bind();
    },
    /**
     * Binds `dragstart` event on wrapper to prevent dragging images.
     *
     * @return {Void}
     */
    bind: function bind() {
      Binder.on('dragstart', Components.Html.wrapper, this.dragstart);
    },
    /**
     * Unbinds `dragstart` event on wrapper.
     *
     * @return {Void}
     */
    unbind: function unbind() {
      Binder.off('dragstart', Components.Html.wrapper);
    },
    /**
     * Event handler. Prevents dragging.
     *
     * @return {Void}
     */
    dragstart: function dragstart(event) {
      event.preventDefault();
    }
  };
  /**
   * Remove bindings from images:
   * - on destroying, to remove added EventListeners
   */

  Events.on('destroy', function () {
    Images.unbind();
    Binder.destroy();
  });
  return Images;
}
function Anchors(Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();
  /**
   * Holds detaching status of anchors.
   * Prevents detaching of already detached anchors.
   *
   * @private
   * @type {Boolean}
   */

  var detached = false;
  /**
   * Holds preventing status of anchors.
   * If `true` redirection after click will be disabled.
   *
   * @private
   * @type {Boolean}
   */

  var prevented = false;
  var Anchors = {
    /**
     * Setups a initial state of anchors component.
     *
     * @returns {Void}
     */
    mount: function mount() {
      /**
       * Holds collection of anchors elements.
       *
       * @private
       * @type {HTMLCollection}
       */
      this._a = Components.Html.wrapper.querySelectorAll('a');
      this.bind();
    },
    /**
     * Binds events to anchors inside a track.
     *
     * @return {Void}
     */
    bind: function bind() {
      Binder.on('click', Components.Html.wrapper, this.click);
    },
    /**
     * Unbinds events attached to anchors inside a track.
     *
     * @return {Void}
     */
    unbind: function unbind() {
      Binder.off('click', Components.Html.wrapper);
    },
    /**
     * Handler for click event. Prevents clicks when glide is in `prevent` status.
     *
     * @param  {Object} event
     * @return {Void}
     */
    click: function click(event) {
      if (prevented) {
        event.stopPropagation();
        event.preventDefault();
      }
    },
    /**
     * Detaches anchors click event inside glide.
     *
     * @return {self}
     */
    detach: function detach() {
      prevented = true;
      if (!detached) {
        for (var i = 0; i < this.items.length; i++) {
          this.items[i].draggable = false;
        }
        detached = true;
      }
      return this;
    },
    /**
     * Attaches anchors click events inside glide.
     *
     * @return {self}
     */
    attach: function attach() {
      prevented = false;
      if (detached) {
        for (var i = 0; i < this.items.length; i++) {
          this.items[i].draggable = true;
        }
        detached = false;
      }
      return this;
    }
  };
  define(Anchors, 'items', {
    /**
     * Gets collection of the arrows HTML elements.
     *
     * @return {HTMLElement[]}
     */
    get: function get() {
      return Anchors._a;
    }
  });
  /**
   * Detach anchors inside slides:
   * - on swiping, so they won't redirect to its `href` attributes
   */

  Events.on('swipe.move', function () {
    Anchors.detach();
  });
  /**
   * Attach anchors inside slides:
   * - after swiping and transitions ends, so they can redirect after click again
   */

  Events.on('swipe.end', function () {
    Components.Transition.after(function () {
      Anchors.attach();
    });
  });
  /**
   * Unbind anchors inside slides:
   * - on destroying, to bring anchors to its initial state
   */

  Events.on('destroy', function () {
    Anchors.attach();
    Anchors.unbind();
    Binder.destroy();
  });
  return Anchors;
}
var NAV_SELECTOR = '[data-glide-el="controls[nav]"]';
var CONTROLS_SELECTOR = '[data-glide-el^="controls"]';
var PREVIOUS_CONTROLS_SELECTOR = "".concat(CONTROLS_SELECTOR, " [data-glide-dir*=\"<\"]");
var NEXT_CONTROLS_SELECTOR = "".concat(CONTROLS_SELECTOR, " [data-glide-dir*=\">\"]");
function Controls(Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();
  var capture = supportsPassive$1 ? {
    passive: true
  } : false;
  var Controls = {
    /**
     * Inits arrows. Binds events listeners
     * to the arrows HTML elements.
     *
     * @return {Void}
     */
    mount: function mount() {
      /**
       * Collection of navigation HTML elements.
       *
       * @private
       * @type {HTMLCollection}
       */
      this._n = Components.Html.root.querySelectorAll(NAV_SELECTOR);
      /**
       * Collection of controls HTML elements.
       *
       * @private
       * @type {HTMLCollection}
       */

      this._c = Components.Html.root.querySelectorAll(CONTROLS_SELECTOR);
      /**
       * Collection of arrow control HTML elements.
       *
       * @private
       * @type {Object}
       */

      this._arrowControls = {
        previous: Components.Html.root.querySelectorAll(PREVIOUS_CONTROLS_SELECTOR),
        next: Components.Html.root.querySelectorAll(NEXT_CONTROLS_SELECTOR)
      };
      this.addBindings();
    },
    /**
     * Sets active class to current slide.
     *
     * @return {Void}
     */
    setActive: function setActive() {
      for (var i = 0; i < this._n.length; i++) {
        this.addClass(this._n[i].children);
      }
    },
    /**
     * Removes active class to current slide.
     *
     * @return {Void}
     */
    removeActive: function removeActive() {
      for (var i = 0; i < this._n.length; i++) {
        this.removeClass(this._n[i].children);
      }
    },
    /**
     * Toggles active class on items inside navigation.
     *
     * @param  {HTMLElement} controls
     * @return {Void}
     */
    addClass: function addClass(controls) {
      var settings = Glide.settings;
      var item = controls[Glide.index];
      if (!item) {
        return;
      }
      item.classList.add(settings.classes.nav.active);
      siblings(item).forEach(function (sibling) {
        sibling.classList.remove(settings.classes.nav.active);
      });
    },
    /**
     * Removes active class from active control.
     *
     * @param  {HTMLElement} controls
     * @return {Void}
     */
    removeClass: function removeClass(controls) {
      var item = controls[Glide.index];
      item === null || item === void 0 ? void 0 : item.classList.remove(Glide.settings.classes.nav.active);
    },
    /**
     * Calculates, removes or adds `Glide.settings.classes.disabledArrow` class on the control arrows
     */
    setArrowState: function setArrowState() {
      if (Glide.settings.rewind) {
        return;
      }
      var next = Controls._arrowControls.next;
      var previous = Controls._arrowControls.previous;
      this.resetArrowState(next, previous);
      if (Glide.index === 0) {
        this.disableArrow(previous);
      }
      if (Glide.index === Components.Run.length) {
        this.disableArrow(next);
      }
    },
    /**
     * Removes `Glide.settings.classes.disabledArrow` from given NodeList elements
     *
     * @param {NodeList[]} lists
     */
    resetArrowState: function resetArrowState() {
      var settings = Glide.settings;
      for (var _len = arguments.length, lists = new Array(_len), _key = 0; _key < _len; _key++) {
        lists[_key] = arguments[_key];
      }
      lists.forEach(function (list) {
        toArray(list).forEach(function (element) {
          element.classList.remove(settings.classes.arrow.disabled);
        });
      });
    },
    /**
     * Adds `Glide.settings.classes.disabledArrow` to given NodeList elements
     *
     * @param {NodeList[]} lists
     */
    disableArrow: function disableArrow() {
      var settings = Glide.settings;
      for (var _len2 = arguments.length, lists = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        lists[_key2] = arguments[_key2];
      }
      lists.forEach(function (list) {
        toArray(list).forEach(function (element) {
          element.classList.add(settings.classes.arrow.disabled);
        });
      });
    },
    /**
     * Adds handles to the each group of controls.
     *
     * @return {Void}
     */
    addBindings: function addBindings() {
      for (var i = 0; i < this._c.length; i++) {
        this.bind(this._c[i].children);
      }
    },
    /**
     * Removes handles from the each group of controls.
     *
     * @return {Void}
     */
    removeBindings: function removeBindings() {
      for (var i = 0; i < this._c.length; i++) {
        this.unbind(this._c[i].children);
      }
    },
    /**
     * Binds events to arrows HTML elements.
     *
     * @param {HTMLCollection} elements
     * @return {Void}
     */
    bind: function bind(elements) {
      for (var i = 0; i < elements.length; i++) {
        Binder.on('click', elements[i], this.click);
        Binder.on('touchstart', elements[i], this.click, capture);
      }
    },
    /**
     * Unbinds events binded to the arrows HTML elements.
     *
     * @param {HTMLCollection} elements
     * @return {Void}
     */
    unbind: function unbind(elements) {
      for (var i = 0; i < elements.length; i++) {
        Binder.off(['click', 'touchstart'], elements[i]);
      }
    },
    /**
     * Handles `click` event on the arrows HTML elements.
     * Moves slider in direction given via the
     * `data-glide-dir` attribute.
     *
     * @param {Object} event
     * @return {void}
     */
    click: function click(event) {
      if (!supportsPassive$1 && event.type === 'touchstart') {
        event.preventDefault();
      }
      var direction = event.currentTarget.getAttribute('data-glide-dir');
      Components.Run.make(Components.Direction.resolve(direction));
    }
  };
  define(Controls, 'items', {
    /**
     * Gets collection of the controls HTML elements.
     *
     * @return {HTMLElement[]}
     */
    get: function get() {
      return Controls._c;
    }
  });
  /**
   * Swap active class of current navigation item:
   * - after mounting to set it to initial index
   * - after each move to the new index
   */

  Events.on(['mount.after', 'move.after'], function () {
    Controls.setActive();
  });
  /**
   * Add or remove disabled class of arrow elements
   */

  Events.on(['mount.after', 'run'], function () {
    Controls.setArrowState();
  });
  /**
   * Remove bindings and HTML Classes:
   * - on destroying, to bring markup to its initial state
   */

  Events.on('destroy', function () {
    Controls.removeBindings();
    Controls.removeActive();
    Binder.destroy();
  });
  return Controls;
}
function Keyboard(Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();
  var Keyboard = {
    /**
     * Binds keyboard events on component mount.
     *
     * @return {Void}
     */
    mount: function mount() {
      if (Glide.settings.keyboard) {
        this.bind();
      }
    },
    /**
     * Adds keyboard press events.
     *
     * @return {Void}
     */
    bind: function bind() {
      Binder.on('keyup', document, this.press);
    },
    /**
     * Removes keyboard press events.
     *
     * @return {Void}
     */
    unbind: function unbind() {
      Binder.off('keyup', document);
    },
    /**
     * Handles keyboard's arrows press and moving glide foward and backward.
     *
     * @param  {Object} event
     * @return {Void}
     */
    press: function press(event) {
      var perSwipe = Glide.settings.perSwipe;
      var arrowSymbols = {
        ArrowRight: '>',
        ArrowLeft: '<'
      };
      if (['ArrowRight', 'ArrowLeft'].includes(event.code)) {
        Components.Run.make(Components.Direction.resolve("".concat(perSwipe).concat(arrowSymbols[event.code])));
      }
    }
  };
  /**
   * Remove bindings from keyboard:
   * - on destroying to remove added events
   * - on updating to remove events before remounting
   */

  Events.on(['destroy', 'update'], function () {
    Keyboard.unbind();
  });
  /**
   * Remount component
   * - on updating to reflect potential changes in settings
   */

  Events.on('update', function () {
    Keyboard.mount();
  });
  /**
   * Destroy binder:
   * - on destroying to remove listeners
   */

  Events.on('destroy', function () {
    Binder.destroy();
  });
  return Keyboard;
}
function Autoplay(Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();
  var Autoplay = {
    /**
     * Initializes autoplaying and events.
     *
     * @return {Void}
     */
    mount: function mount() {
      this.enable();
      this.start();
      if (Glide.settings.hoverpause) {
        this.bind();
      }
    },
    /**
     * Enables autoplaying
     *
     * @returns {Void}
     */
    enable: function enable() {
      this._e = true;
    },
    /**
     * Disables autoplaying.
     *
     * @returns {Void}
     */
    disable: function disable() {
      this._e = false;
    },
    /**
     * Starts autoplaying in configured interval.
     *
     * @param {Boolean|Number} force Run autoplaying with passed interval regardless of `autoplay` settings
     * @return {Void}
     */
    start: function start() {
      var _this = this;
      if (!this._e) {
        return;
      }
      this.enable();
      if (Glide.settings.autoplay) {
        if (isUndefined(this._i)) {
          this._i = setInterval(function () {
            _this.stop();
            Components.Run.make('>');
            _this.start();
            Events.emit('autoplay');
          }, this.time);
        }
      }
    },
    /**
     * Stops autorunning of the glide.
     *
     * @return {Void}
     */
    stop: function stop() {
      this._i = clearInterval(this._i);
    },
    /**
     * Stops autoplaying while mouse is over glide's area.
     *
     * @return {Void}
     */
    bind: function bind() {
      var _this2 = this;
      Binder.on('mouseover', Components.Html.root, function () {
        if (_this2._e) {
          _this2.stop();
        }
      });
      Binder.on('mouseout', Components.Html.root, function () {
        if (_this2._e) {
          _this2.start();
        }
      });
    },
    /**
     * Unbind mouseover events.
     *
     * @returns {Void}
     */
    unbind: function unbind() {
      Binder.off(['mouseover', 'mouseout'], Components.Html.root);
    }
  };
  define(Autoplay, 'time', {
    /**
     * Gets time period value for the autoplay interval. Prioritizes
     * times in `data-glide-autoplay` attrubutes over options.
     *
     * @return {Number}
     */
    get: function get() {
      var autoplay = Components.Html.slides[Glide.index].getAttribute('data-glide-autoplay');
      if (autoplay) {
        return toInt(autoplay);
      }
      return toInt(Glide.settings.autoplay);
    }
  });
  /**
   * Stop autoplaying and unbind events:
   * - on destroying, to clear defined interval
   * - on updating via API to reset interval that may changed
   */

  Events.on(['destroy', 'update'], function () {
    Autoplay.unbind();
  });
  /**
   * Stop autoplaying:
   * - before each run, to restart autoplaying
   * - on pausing via API
   * - on destroying, to clear defined interval
   * - while starting a swipe
   * - on updating via API to reset interval that may changed
   */

  Events.on(['run.before', 'swipe.start', 'update'], function () {
    Autoplay.stop();
  });
  Events.on(['pause', 'destroy'], function () {
    Autoplay.disable();
    Autoplay.stop();
  });
  /**
   * Start autoplaying:
   * - after each run, to restart autoplaying
   * - on playing via API
   * - while ending a swipe
   */

  Events.on(['run.after', 'swipe.end'], function () {
    Autoplay.start();
  });
  /**
   * Start autoplaying:
   * - after each run, to restart autoplaying
   * - on playing via API
   * - while ending a swipe
   */

  Events.on(['play'], function () {
    Autoplay.enable();
    Autoplay.start();
  });
  /**
   * Remount autoplaying:
   * - on updating via API to reset interval that may changed
   */

  Events.on('update', function () {
    Autoplay.mount();
  });
  /**
   * Destroy a binder:
   * - on destroying glide instance to clearup listeners
   */

  Events.on('destroy', function () {
    Binder.destroy();
  });
  return Autoplay;
}

/**
 * Sorts keys of breakpoint object so they will be ordered from lower to bigger.
 *
 * @param {Object} points
 * @returns {Object}
 */

function sortBreakpoints(points) {
  if (isObject(points)) {
    return sortKeys(points);
  } else {
    warn("Breakpoints option must be an object");
  }
  return {};
}
function Breakpoints(Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();
  /**
   * Holds reference to settings.
   *
   * @type {Object}
   */

  var settings = Glide.settings;
  /**
   * Holds reference to breakpoints object in settings. Sorts breakpoints
   * from smaller to larger. It is required in order to proper
   * matching currently active breakpoint settings.
   *
   * @type {Object}
   */

  var points = sortBreakpoints(settings.breakpoints);
  /**
   * Cache initial settings before overwritting.
   *
   * @type {Object}
   */

  var defaults = Object.assign({}, settings);
  var Breakpoints = {
    /**
     * Matches settings for currectly matching media breakpoint.
     *
     * @param {Object} points
     * @returns {Object}
     */
    match: function match(points) {
      if (typeof window.matchMedia !== 'undefined') {
        for (var point in points) {
          if (points.hasOwnProperty(point)) {
            if (window.matchMedia("(max-width: ".concat(point, "px)")).matches) {
              return points[point];
            }
          }
        }
      }
      return defaults;
    }
  };
  /**
   * Overwrite instance settings with currently matching breakpoint settings.
   * This happens right after component initialization.
   */

  Object.assign(settings, Breakpoints.match(points));
  /**
   * Update glide with settings of matched brekpoint:
   * - window resize to update slider
   */

  Binder.on('resize', window, throttle(function () {
    Glide.settings = mergeOptions(settings, Breakpoints.match(points));
  }, Glide.settings.throttle));
  /**
   * Resort and update default settings:
   * - on reinit via API, so breakpoint matching will be performed with options
   */

  Events.on('update', function () {
    points = sortBreakpoints(points);
    defaults = Object.assign({}, settings);
  });
  /**
   * Unbind resize listener:
   * - on destroying, to bring markup to its initial state
   */

  Events.on('destroy', function () {
    Binder.off('resize', window);
  });
  return Breakpoints;
}
var COMPONENTS = {
  // Required
  Html: Html,
  Translate: Translate,
  Transition: Transition,
  Direction: Direction,
  Peek: Peek,
  Sizes: Sizes,
  Gaps: Gaps,
  Move: Move,
  Clones: Clones,
  Resize: Resize,
  Build: Build,
  Run: Run,
  // Optional
  Swipe: Swipe,
  Images: Images,
  Anchors: Anchors,
  Controls: Controls,
  Keyboard: Keyboard,
  Autoplay: Autoplay,
  Breakpoints: Breakpoints
};
var Glide = exports.default = /*#__PURE__*/function (_Core) {
  _inherits(Glide, _Core);
  var _super = _createSuper(Glide);
  function Glide() {
    _classCallCheck(this, Glide);
    return _super.apply(this, arguments);
  }
  _createClass(Glide, [{
    key: "mount",
    value: function mount() {
      var extensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _get(_getPrototypeOf(Glide.prototype), "mount", this).call(this, Object.assign({}, COMPONENTS, extensions));
    }
  }]);
  return Glide;
}(Glide$1);
},{}],"../node_modules/typeit/dist/typeit.es.min.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
/**
  * TypeIt - The most versatile animated typing utility on the planet.
  * Author: Alex MacArthur <alex@macarthur.me> (https://macarthur.me)
  * Version: v7.0.4
  * License: GPL-2.0
  * URL: https://typeitjs.com
  */
var e = {
    strings: [],
    speed: 100,
    cursor: !0,
    cursorChar: "|",
    cursorSpeed: 1e3,
    deleteSpeed: null,
    lifeLike: !0,
    breakLines: !0,
    startDelay: 250,
    startDelete: !1,
    nextStringDelay: 750,
    loop: !1,
    loopDelay: 750,
    html: !0,
    waitUntilVisible: !1,
    beforeString: () => {},
    afterString: () => {},
    beforeStep: () => {},
    afterStep: () => {},
    afterComplete: () => {}
  },
  t = e => e.map(e => (void 0 === e[1] && e.push(null), void 0 === e[2] && e.push({}), e)),
  n = (e, t) => Object.assign({}, e, t),
  r = e => Array.isArray(e),
  i = (e, t) => (e[2] = n(e[2], t) || t, e),
  o = (e, t) => r(e[0]) ? e.map(e => i(e, t)) : i(e, t),
  a = (e, t, n, i) => {
    i = i || !1, n = n || {};
    var a = !r(e),
      u = e.length;
    return (e = a ? new Array(e).fill(0) : e).map((e, r) => {
      if (a) return t;
      var c = [t, e, n];
      return i && (0 === r && (c = o(c, {
        isFirst: !0
      })), r + 1 === u && (c = o(c, {
        isLast: !0
      }))), c;
    });
  };
function u(e) {
  this.insert = function (e, t) {
    i.splice(e, 0, t);
  }, this.add = function (e, u, c) {
    return e = r(e) ? e : [e, null], c = c || !1, u = u || 1, r(e[0]) || (e = a(u, e)), e = t(e).map(e => (e[2] = n(e[2], {
      id: o
    }), o++, e)), i = c ? e.concat(i) : i.concat(e), this;
  }, this.set = function (e, t) {
    i[e] = t;
  }, this.reset = function () {
    i = i.map(e => (e[2].executed = !1, e));
  }, this.getItems = function () {
    return (i = t(i)).filter(e => !e[2].executed);
  }, this.setMeta = function (e, t) {
    var r = i.findIndex(t => t[2].id === e);
    i[r][2] = n(i[r][2], t);
  };
  var i = [],
    o = 0;
  this.add(e);
}
var c = e => Array.from(e),
  s = e => {
    var t = [];
    return t.concat.apply(t, e);
  },
  l = e => {
    var t = document.implementation.createHTMLDocument("");
    return t.body.innerHTML = e, t.body;
  },
  f = (e, t, n) => {
    t = t || null, n = void 0 !== n && n;
    var r = c(e.childNodes).map(e => {
      return 3 === (t = e).nodeType || "BR" === t.tagName ? e : f(e);
      var t;
    });
    return r = s(r), t && (r = r.filter(e => !t.contains(e))), n ? r.reverse() : r;
  },
  d = e => "BODY" === e.tagName,
  h = (e, t) => {
    t = t || null;
    var n = e instanceof HTMLElement;
    return {
      node: t,
      isTopLevelText: (!t || d(t.parentNode)) && !n,
      isHTMLElement: n,
      content: e
    };
  };
function v(e) {
  var t,
    n = l(e);
  return t = f(n).map(e => e.nodeValue ? c(e.nodeValue).map(t => h(t, e)) : h(e)), s(t);
}
function p(e, t) {
  return (t = void 0 === t || t) ? v(e) : c(e).map(e => h(e));
}
var m = e => document.createElement(e),
  y = (e, t) => {
    var n = m("style");
    n.id = t || "", n.appendChild(document.createTextNode(e)), document.head.appendChild(n);
  },
  g = e => (r(e) || (e = [e / 2, e / 2]), {
    before: e[0],
    after: e[1],
    total: e[0] + e[1]
  }),
  b = (e, t) => Math.abs(Math.random() * (e + t - (e - t)) + (e - t));
var N = e => ["textarea", "input"].indexOf(e.tagName.toLowerCase()) > -1,
  S = (e, t) => {
    var n = t.querySelectorAll("*");
    return [t].concat(c(n).reverse()).find(t => t.cloneNode().outerHTML === e.outerHTML);
  },
  T = (e, t, n, r) => {
    n = n || null;
    var i = t.isHTMLElement,
      o = i ? t.content : document.createTextNode(t.content);
    if (N(e)) e.value = "".concat(e.value).concat(t.content);else {
      if (!t.isTopLevelText && !i) {
        var a = t.node.parentNode,
          u = S(a.cloneNode(), e);
        if (((e, t) => {
          if (!e) return !1;
          var n = e.nextSibling;
          return !n || n.isEqualNode(t);
        })(u, n)) e = u;else if ((o = a.cloneNode()).innerText = t.content, !d(a.parentNode)) {
          for (var c = a.parentNode, s = c.cloneNode(), l = S(s, e); !l && !d(c);) s.innerHTML = o.outerHTML, o = s, s = c.parentNode.cloneNode(), c = c.parentNode, l = S(s, e);
          e = l || e;
        }
      }
      var h = f(e, n, !0)[r - 1],
        v = h ? h.parentNode : e;
      v.insertBefore(o, v.contains(n) ? n : null);
    }
  },
  L = e => {
    var t;
    return null == e || null === (t = e.parentNode) || void 0 === t ? void 0 : t.removeChild(e);
  };
var M = (e, t, n) => {
    var r,
      i = "string" == typeof e,
      o = !1,
      a = -1 * e;
    return i && (a = (r = "END" === e.toUpperCase()) ? -1 : 1, o = r ? t + a > 0 : t + a < n.length), {
      isString: i,
      numberOfSteps: a,
      canKeepMoving: o
    };
  },
  x = e => {
    var t,
      n = ["font", "lineHeight", "color"],
      r = m("SPAN"),
      i = (t = e, window.getComputedStyle(t, null));
    for (var o in i) n.indexOf(o) > -1 && i[o] && (r.style[o] = i[o]);
    return r.style.cssText;
  };
function w(e, t, n) {
  return n ? t ? t(e) : e : (e && e.then || (e = Promise.resolve(e)), t ? e.then(t) : e);
}
function D(e) {
  return function () {
    for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
    try {
      return Promise.resolve(e.apply(this, t));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}
function H() {}
function E(e, t) {
  if (!t) return e && e.then ? e.then(H) : Promise.resolve();
}
function C(e, t) {
  var n = e();
  return n && n.then ? n.then(t) : t(n);
}
function A(e, t, n) {
  if (!e.s) {
    if (n instanceof k) {
      if (!n.s) return void (n.o = A.bind(null, e, t));
      1 & t && (t = n.s), n = n.v;
    }
    if (n && n.then) return void n.then(A.bind(null, e, t), A.bind(null, e, 2));
    e.s = t, e.v = n;
    var r = e.o;
    r && r(e);
  }
}
var k = function () {
  function e() {}
  return e.prototype.then = function (t, n) {
    var r = new e(),
      i = this.s;
    if (i) {
      var o = 1 & i ? t : n;
      if (o) {
        try {
          A(r, 1, o(this.v));
        } catch (e) {
          A(r, 2, e);
        }
        return r;
      }
      return this;
    }
    return this.o = function (e) {
      try {
        var i = e.v;
        1 & e.s ? A(r, 1, t ? t(i) : i) : n ? A(r, 1, n(i)) : A(r, 2, i);
      } catch (e) {
        A(r, 2, e);
      }
    }, r;
  }, e;
}();
function O(e, t) {
  return e && e.then ? e.then(t) : t(e);
}
function _default(t, i) {
  var o = this;
  i = i || {};
  var s = (e, t, n) => (e = r(e[0]) ? e : [e], oe.add(e, t), (e => {
      var t = (e = e || {}).delay;
      t && oe.add([V, t]);
    })(n), this),
    d = e => [[F, e = "object" == typeof e ? e : {}, {
      force: !0
    }], [F, ee, {
      force: !0
    }]],
    S = () => J ? c(G.value) : f(G, ae, !0),
    P = (e, t) => {
      t = t || 1;
      var n = ee.nextStringDelay;
      oe.insert(e, [V, n.before]), oe.insert(e + t + 1, [V, n.after]);
    },
    z = D(function () {
      if (ae) {
        var e = "[data-typeit-id='".concat(ie, "'] .ti-cursor");
        y("@keyframes blink-".concat(ie, " { 0% {opacity: 0} 49% {opacity: 0} 50% {opacity: 1} } ").concat(e, " { animation: blink-").concat(ie, " ").concat(ee.cursorSpeed / 1e3, "s infinite; } ").concat(e, ".with-delay { animation-delay: 500ms; } ").concat(e, ".disabled { animation: none; }"), ie), G.appendChild(ae);
        var t = "loaded" === document.fonts.status;
        return w(t || document.fonts.ready, function (e) {
          var t = ae.getBoundingClientRect().width / 2;
          ae.style.margin = "0 -".concat(t + 2, "px 0 -").concat(t - 2, "px");
        }, t);
      }
    }),
    B = e => {
      ae && (ae.classList.toggle("disabled", e), ae.classList.toggle("with-delay", !e));
    },
    I = D(function (e, t) {
      return X.push(setTimeout(e, t)), w();
    }),
    R = D(function (e) {
      var t = Z;
      return w(t && j(Z), function (t) {
        return oe.reset(), oe.set(0, [V, e.before]), E(Q(!0));
      }, !t);
    }),
    q = D(function () {
      _.started = !0;
      var e,
        t = oe.getItems();
      return O(function (e, t) {
        try {
          var n = e();
        } catch (e) {
          return t(e);
        }
        return n && n.then ? n.then(void 0, t) : n;
      }(function () {
        return O(function (e, t, n) {
          var r,
            i,
            o = -1;
          return function a(u) {
            try {
              for (; ++o < e.length && (!n || !n());) if ((u = t(o)) && u.then) {
                if (!((c = u) instanceof k && 1 & c.s)) return void u.then(a, i || (i = A.bind(null, r = new k(), 2)));
                u = u.v;
              }
              r ? A(r, 1, u) : r = u;
            } catch (e) {
              A(r || (r = new k()), 2, e);
            }
            var c;
          }(), r;
        }(t, function (n) {
          if (_.frozen || _.destroyed) throw "";
          var r,
            i,
            a,
            u,
            c = t[n],
            s = c[2];
          return e = [c, o], s.freezeCursor && B(!0), r = ee.speed, i = ee.deleteSpeed, a = ee.lifeLike, u = (i = null !== i ? i : r / 3) / 2, W = a ? [b(r, r / 2), b(i, u)] : [r, i], C(function () {
            var t;
            if (null == s ? void 0 : s.isFirst) return E((t = ee).beforeString.apply(t, e));
          }, function () {
            var t;
            return w((t = ee).beforeStep.apply(t, e), function () {
              return w(c[0].call(o, c[1], s), function () {
                return C(function () {
                  var t, n;
                  if (null === (t = c[2]) || void 0 === t ? void 0 : t.isLast) return E((n = ee).afterString.apply(n, e));
                }, function () {
                  var t;
                  return w((t = ee).afterStep.apply(t, e), function () {
                    oe.setMeta(s.id, {
                      executed: !0
                    }), B(!1);
                  });
                });
              });
            });
          });
        }, function () {
          return !1;
        }), function (t) {
          var n;
          return _.completed = !0, w((n = ee).afterComplete.apply(n, e), function () {
            if (!ee.loop) throw "";
            var e = ee.loopDelay;
            I(function () {
              return w(R(e), function () {
                q();
              });
            }, e.after);
          });
        });
      }, H), function (e) {
        return o;
      });
    }),
    V = e => new Promise(t => {
      I(() => t(), e || 0);
    }),
    j = e => {
      var t = S(),
        n = M(e, Z, t);
      return Z += n.numberOfSteps, new Promise(e => {
        I(D(function () {
          return ((e, t, n, r) => {
            if (n) {
              var i = r,
                o = t[(i = i > t.length ? t.length : i) - 1];
              (e = o ? o.parentNode : e).insertBefore(n, o || null);
            }
          })(G, S(), ae, Z), C(function () {
            if (n.isString && n.canKeepMoving) return E(j(n.numberOfSteps > 0 ? "START" : "END"));
          }, function () {
            return e();
          });
        }), W[0]);
      });
    },
    U = e => new Promise(t => {
      I(() => (T(G, e, ae, Z), t()), W[0]);
    }),
    F = D(function (e) {
      ee = n(ee, e);
    }),
    K = D(function () {
      J ? G.value = "" : S().forEach(e => {
        L(e);
      });
    }),
    Q = e => (e = !0 === e, new Promise(t => {
      I(D(function () {
        var n = !1,
          r = S();
        return r.length && (J ? G.value = G.value.slice(0, -1) : L(r[Z])), c(G.querySelectorAll("*")).forEach(e => {
          if (!e.innerHTML && "BR" !== e.tagName) {
            for (var t = e; 1 === t.parentNode.childNodes.length && t.parentNode.childNodes[0].isEqualNode(t);) t = t.parentNode;
            L(t);
          }
        }), C(function () {
          if (e && r.length - 1 > 0) return w(Q(!0), function () {
            return n = !0, t();
          });
        }, function (e) {
          return n ? e : t();
        });
      }), W[1]);
    }));
  this.break = function (e) {
    return s([U, h(m("BR"))], 1, e);
  }, this.delete = function (e, t) {
    var n = d(t);
    return s([n[0]].concat([].concat(Array(Math.abs(e) || 1)).fill().map(() => [Q, !e, $]), [n[1]]), 1, t);
  }, this.empty = function () {
    return s(K, 1, arguments);
  }, this.exec = function (e, t) {
    var n = d(t);
    return s([n[0], [e, null], n[1]], 1, t);
  }, this.move = function (e, t) {
    var n = M(e, Z, S()),
      r = d(t),
      i = n.isString ? e : Math.sign(e);
    return s([r[0]].concat([].concat(Array(Math.abs(e) || 1)).fill().map(() => [j, i, $]), [r[1]]), 1, t);
  }, this.options = function (e) {
    return s([F, e], 1, e);
  }, this.pause = function (e, t) {
    return s([V, e], 1, t);
  }, this.type = function (e, t) {
    var n = d(t),
      r = p(e, ee.html),
      i = [n[0]].concat(a(r, U, $, !0), [n[1]]);
    return s(i, 1, t);
  }, this.is = function (e) {
    return _[e];
  }, this.destroy = function (e) {
    e = void 0 === e || e, X.forEach(e => {
      clearTimeout(e);
    }), X = [], e && L(ae), _.destroyed = !0;
  }, this.freeze = function () {
    _.frozen = !0;
  }, this.unfreeze = function () {
    _.frozen = !1, q();
  }, this.reset = function () {
    for (var e in !this.is("destroyed") && this.destroy(), oe.reset(), Z = 0, _) _[e] = !1;
    return J ? G.value = "" : G.innerHTML = "", this;
  }, this.go = function () {
    return _.started ? this : (z(), ee.waitUntilVisible ? (((e, t) => {
      new IntersectionObserver((n, r) => {
        n.forEach(n => {
          n.isIntersecting && (t(), r.unobserve(e));
        });
      }, {
        threshold: 1
      }).observe(e);
    })(G, q.bind(this)), this) : (q(), this));
  }, this.getQueue = function () {
    return oe;
  }, this.getOptions = function () {
    return ee;
  }, this.getElement = function () {
    return G;
  };
  var Y,
    G = "string" == typeof (Y = t) ? document.querySelector(Y) : Y,
    J = N(G),
    W = [],
    X = [],
    Z = 0,
    $ = {
      freezeCursor: !0
    },
    _ = {
      started: !1,
      completed: !1,
      frozen: !1,
      destroyed: !1
    },
    ee = n(e, i);
  ee = n(ee, {
    html: !J && ee.html,
    nextStringDelay: g(ee.nextStringDelay),
    loopDelay: g(ee.loopDelay)
  });
  var te,
    ne,
    re,
    ie = Math.random().toString().substring(2, 9),
    oe = new u([V, ee.startDelay]);
  G.setAttribute("data-typeit-id", ie), y("[data-typeit-id]:before {content: '.'; display: inline-block; width: 0; visibility: hidden;}[data-typeit-id]"), ee.strings = (re = ee.strings, te = r(re) ? re : [re], (ne = (e => e.innerHTML.replace(/<\!--.*?-->/g, "").trim())(G)) ? (G.innerHTML = "", ee.startDelete ? (v(ne).forEach(e => {
    T(G, e, ae, Z);
  }), oe.add([Q, !0]), P(1), te) : [ne.trim()].concat(te)) : te);
  var ae = (() => {
    if (J || !ee.cursor) return null;
    var e = m("span");
    return e.innerHTML = l(ee.cursorChar).innerHTML, e.className = "ti-cursor", e.style.cssText = "display:inline;".concat(x(G)), e;
  })();
  ee.strings.length && (() => {
    var e = ee.strings.filter(e => !!e);
    e.forEach((t, n) => {
      var r = p(t, ee.html);
      oe.add(a(r, U, $, !0));
      var i = oe.getItems().length;
      if (n + 1 !== e.length) {
        if (ee.breakLines) {
          var o = h(m("BR"));
          return oe.add([U, o, $]), void P(i);
        }
        oe.add(a(r, Q, $)), P(i, t.length);
      }
    });
  })();
}
},{}],"../node_modules/is-dom-node/dist/is-dom-node.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*! @license is-dom-node v1.0.4

	Copyright 2018 Fisssion LLC.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.

*/
function isDomNode(x) {
  return typeof window.Node === 'object' ? x instanceof window.Node : x !== null && typeof x === 'object' && typeof x.nodeType === 'number' && typeof x.nodeName === 'string';
}
var _default = exports.default = isDomNode;
},{}],"../node_modules/is-dom-node-list/dist/is-dom-node-list.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isDomNode = _interopRequireDefault(require("is-dom-node"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/*! @license is-dom-node-list v1.2.1

	Copyright 2018 Fisssion LLC.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.

*/

function isDomNodeList(x) {
  var prototypeToString = Object.prototype.toString.call(x);
  var regex = /^\[object (HTMLCollection|NodeList|Object)\]$/;
  return typeof window.NodeList === 'object' ? x instanceof window.NodeList : x !== null && typeof x === 'object' && typeof x.length === 'number' && regex.test(prototypeToString) && (x.length === 0 || (0, _isDomNode.default)(x[0]));
}
var _default = exports.default = isDomNodeList;
},{"is-dom-node":"../node_modules/is-dom-node/dist/is-dom-node.es.js"}],"../node_modules/tealight/dist/tealight.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isDomNode = _interopRequireDefault(require("is-dom-node"));
var _isDomNodeList = _interopRequireDefault(require("is-dom-node-list"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/*! @license Tealight v0.3.6

	Copyright 2018 Fisssion LLC.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.

*/

function tealight(target, context) {
  if (context === void 0) context = document;
  if (target instanceof Array) {
    return target.filter(_isDomNode.default);
  }
  if ((0, _isDomNode.default)(target)) {
    return [target];
  }
  if ((0, _isDomNodeList.default)(target)) {
    return Array.prototype.slice.call(target);
  }
  if (typeof target === "string") {
    try {
      var query = context.querySelectorAll(target);
      return Array.prototype.slice.call(query);
    } catch (err) {
      return [];
    }
  }
  return [];
}
var _default = exports.default = tealight;
},{"is-dom-node":"../node_modules/is-dom-node/dist/is-dom-node.es.js","is-dom-node-list":"../node_modules/is-dom-node-list/dist/is-dom-node-list.es.js"}],"../node_modules/rematrix/dist/rematrix.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.format = format;
exports.identity = identity;
exports.inverse = inverse;
exports.multiply = multiply;
exports.parse = parse;
exports.rotate = rotate;
exports.rotateX = rotateX;
exports.rotateY = rotateY;
exports.rotateZ = rotateZ;
exports.scale = scale;
exports.scaleX = scaleX;
exports.scaleY = scaleY;
exports.scaleZ = scaleZ;
exports.skew = skew;
exports.skewX = skewX;
exports.skewY = skewY;
exports.toString = toString;
exports.translate = translate;
exports.translateX = translateX;
exports.translateY = translateY;
exports.translateZ = translateZ;
/*! @license Rematrix v0.3.0

	Copyright 2018 Julian Lloyd.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
*/
/**
 * @module Rematrix
 */

/**
 * Transformation matrices in the browser come in two flavors:
 *
 *  - `matrix` using 6 values (short)
 *  - `matrix3d` using 16 values (long)
 *
 * This utility follows this [conversion guide](https://goo.gl/EJlUQ1)
 * to expand short form matrices to their equivalent long form.
 *
 * @param  {array} source - Accepts both short and long form matrices.
 * @return {array}
 */
function format(source) {
  if (source.constructor !== Array) {
    throw new TypeError('Expected array.');
  }
  if (source.length === 16) {
    return source;
  }
  if (source.length === 6) {
    var matrix = identity();
    matrix[0] = source[0];
    matrix[1] = source[1];
    matrix[4] = source[2];
    matrix[5] = source[3];
    matrix[12] = source[4];
    matrix[13] = source[5];
    return matrix;
  }
  throw new RangeError('Expected array with either 6 or 16 values.');
}

/**
 * Returns a matrix representing no transformation. The product of any matrix
 * multiplied by the identity matrix will be the original matrix.
 *
 * > **Tip:** Similar to how `5 * 1 === 5`, where `1` is the identity.
 *
 * @return {array}
 */
function identity() {
  var matrix = [];
  for (var i = 0; i < 16; i++) {
    i % 5 == 0 ? matrix.push(1) : matrix.push(0);
  }
  return matrix;
}

/**
 * Returns a matrix describing the inverse transformation of the source
 * matrix. The product of any matrix multiplied by its inverse will be the
 * identity matrix.
 *
 * > **Tip:** Similar to how `5 * (1/5) === 1`, where `1/5` is the inverse.
 *
 * @param  {array} source - Accepts both short and long form matrices.
 * @return {array}
 */
function inverse(source) {
  var m = format(source);
  var s0 = m[0] * m[5] - m[4] * m[1];
  var s1 = m[0] * m[6] - m[4] * m[2];
  var s2 = m[0] * m[7] - m[4] * m[3];
  var s3 = m[1] * m[6] - m[5] * m[2];
  var s4 = m[1] * m[7] - m[5] * m[3];
  var s5 = m[2] * m[7] - m[6] * m[3];
  var c5 = m[10] * m[15] - m[14] * m[11];
  var c4 = m[9] * m[15] - m[13] * m[11];
  var c3 = m[9] * m[14] - m[13] * m[10];
  var c2 = m[8] * m[15] - m[12] * m[11];
  var c1 = m[8] * m[14] - m[12] * m[10];
  var c0 = m[8] * m[13] - m[12] * m[9];
  var determinant = 1 / (s0 * c5 - s1 * c4 + s2 * c3 + s3 * c2 - s4 * c1 + s5 * c0);
  if (isNaN(determinant) || determinant === Infinity) {
    throw new Error('Inverse determinant attempted to divide by zero.');
  }
  return [(m[5] * c5 - m[6] * c4 + m[7] * c3) * determinant, (-m[1] * c5 + m[2] * c4 - m[3] * c3) * determinant, (m[13] * s5 - m[14] * s4 + m[15] * s3) * determinant, (-m[9] * s5 + m[10] * s4 - m[11] * s3) * determinant, (-m[4] * c5 + m[6] * c2 - m[7] * c1) * determinant, (m[0] * c5 - m[2] * c2 + m[3] * c1) * determinant, (-m[12] * s5 + m[14] * s2 - m[15] * s1) * determinant, (m[8] * s5 - m[10] * s2 + m[11] * s1) * determinant, (m[4] * c4 - m[5] * c2 + m[7] * c0) * determinant, (-m[0] * c4 + m[1] * c2 - m[3] * c0) * determinant, (m[12] * s4 - m[13] * s2 + m[15] * s0) * determinant, (-m[8] * s4 + m[9] * s2 - m[11] * s0) * determinant, (-m[4] * c3 + m[5] * c1 - m[6] * c0) * determinant, (m[0] * c3 - m[1] * c1 + m[2] * c0) * determinant, (-m[12] * s3 + m[13] * s1 - m[14] * s0) * determinant, (m[8] * s3 - m[9] * s1 + m[10] * s0) * determinant];
}

/**
 * Returns a 4x4 matrix describing the combined transformations
 * of both arguments.
 *
 * > **Note:** Order is very important. For example, rotating 45°
 * along the Z-axis, followed by translating 500 pixels along the
 * Y-axis... is not the same as translating 500 pixels along the
 * Y-axis, followed by rotating 45° along on the Z-axis.
 *
 * @param  {array} m - Accepts both short and long form matrices.
 * @param  {array} x - Accepts both short and long form matrices.
 * @return {array}
 */
function multiply(m, x) {
  var fm = format(m);
  var fx = format(x);
  var product = [];
  for (var i = 0; i < 4; i++) {
    var row = [fm[i], fm[i + 4], fm[i + 8], fm[i + 12]];
    for (var j = 0; j < 4; j++) {
      var k = j * 4;
      var col = [fx[k], fx[k + 1], fx[k + 2], fx[k + 3]];
      var result = row[0] * col[0] + row[1] * col[1] + row[2] * col[2] + row[3] * col[3];
      product[i + k] = result;
    }
  }
  return product;
}

/**
 * Attempts to return a 4x4 matrix describing the CSS transform
 * matrix passed in, but will return the identity matrix as a
 * fallback.
 *
 * > **Tip:** This method is used to convert a CSS matrix (retrieved as a
 * `string` from computed styles) to its equivalent array format.
 *
 * @param  {string} source - `matrix` or `matrix3d` CSS Transform value.
 * @return {array}
 */
function parse(source) {
  if (typeof source === 'string') {
    var match = source.match(/matrix(3d)?\(([^)]+)\)/);
    if (match) {
      var raw = match[2].split(', ').map(parseFloat);
      return format(raw);
    }
  }
  return identity();
}

/**
 * Returns a 4x4 matrix describing Z-axis rotation.
 *
 * > **Tip:** This is just an alias for `Rematrix.rotateZ` for parity with CSS
 *
 * @param  {number} angle - Measured in degrees.
 * @return {array}
 */
function rotate(angle) {
  return rotateZ(angle);
}

/**
 * Returns a 4x4 matrix describing X-axis rotation.
 *
 * @param  {number} angle - Measured in degrees.
 * @return {array}
 */
function rotateX(angle) {
  var theta = Math.PI / 180 * angle;
  var matrix = identity();
  matrix[5] = matrix[10] = Math.cos(theta);
  matrix[6] = matrix[9] = Math.sin(theta);
  matrix[9] *= -1;
  return matrix;
}

/**
 * Returns a 4x4 matrix describing Y-axis rotation.
 *
 * @param  {number} angle - Measured in degrees.
 * @return {array}
 */
function rotateY(angle) {
  var theta = Math.PI / 180 * angle;
  var matrix = identity();
  matrix[0] = matrix[10] = Math.cos(theta);
  matrix[2] = matrix[8] = Math.sin(theta);
  matrix[2] *= -1;
  return matrix;
}

/**
 * Returns a 4x4 matrix describing Z-axis rotation.
 *
 * @param  {number} angle - Measured in degrees.
 * @return {array}
 */
function rotateZ(angle) {
  var theta = Math.PI / 180 * angle;
  var matrix = identity();
  matrix[0] = matrix[5] = Math.cos(theta);
  matrix[1] = matrix[4] = Math.sin(theta);
  matrix[4] *= -1;
  return matrix;
}

/**
 * Returns a 4x4 matrix describing 2D scaling. The first argument
 * is used for both X and Y-axis scaling, unless an optional
 * second argument is provided to explicitly define Y-axis scaling.
 *
 * @param  {number} scalar    - Decimal multiplier.
 * @param  {number} [scalarY] - Decimal multiplier.
 * @return {array}
 */
function scale(scalar, scalarY) {
  var matrix = identity();
  matrix[0] = scalar;
  matrix[5] = typeof scalarY === 'number' ? scalarY : scalar;
  return matrix;
}

/**
 * Returns a 4x4 matrix describing X-axis scaling.
 *
 * @param  {number} scalar - Decimal multiplier.
 * @return {array}
 */
function scaleX(scalar) {
  var matrix = identity();
  matrix[0] = scalar;
  return matrix;
}

/**
 * Returns a 4x4 matrix describing Y-axis scaling.
 *
 * @param  {number} scalar - Decimal multiplier.
 * @return {array}
 */
function scaleY(scalar) {
  var matrix = identity();
  matrix[5] = scalar;
  return matrix;
}

/**
 * Returns a 4x4 matrix describing Z-axis scaling.
 *
 * @param  {number} scalar - Decimal multiplier.
 * @return {array}
 */
function scaleZ(scalar) {
  var matrix = identity();
  matrix[10] = scalar;
  return matrix;
}

/**
 * Returns a 4x4 matrix describing shear. The first argument
 * defines X-axis shearing, and an optional second argument
 * defines Y-axis shearing.
 *
 * @param  {number} angleX   - Measured in degrees.
 * @param  {number} [angleY] - Measured in degrees.
 * @return {array}
 */
function skew(angleX, angleY) {
  var thetaX = Math.PI / 180 * angleX;
  var matrix = identity();
  matrix[4] = Math.tan(thetaX);
  if (angleY) {
    var thetaY = Math.PI / 180 * angleY;
    matrix[1] = Math.tan(thetaY);
  }
  return matrix;
}

/**
 * Returns a 4x4 matrix describing X-axis shear.
 *
 * @param  {number} angle - Measured in degrees.
 * @return {array}
 */
function skewX(angle) {
  var theta = Math.PI / 180 * angle;
  var matrix = identity();
  matrix[4] = Math.tan(theta);
  return matrix;
}

/**
 * Returns a 4x4 matrix describing Y-axis shear.
 *
 * @param  {number} angle - Measured in degrees
 * @return {array}
 */
function skewY(angle) {
  var theta = Math.PI / 180 * angle;
  var matrix = identity();
  matrix[1] = Math.tan(theta);
  return matrix;
}

/**
 * Returns a CSS Transform property value equivalent to the source matrix.
 *
 * @param  {array} source - Accepts both short and long form matrices.
 * @return {string}
 */
function toString(source) {
  return "matrix3d(" + format(source).join(', ') + ")";
}

/**
 * Returns a 4x4 matrix describing 2D translation. The first
 * argument defines X-axis translation, and an optional second
 * argument defines Y-axis translation.
 *
 * @param  {number} distanceX   - Measured in pixels.
 * @param  {number} [distanceY] - Measured in pixels.
 * @return {array}
 */
function translate(distanceX, distanceY) {
  var matrix = identity();
  matrix[12] = distanceX;
  if (distanceY) {
    matrix[13] = distanceY;
  }
  return matrix;
}

/**
 * Returns a 4x4 matrix describing X-axis translation.
 *
 * @param  {number} distance - Measured in pixels.
 * @return {array}
 */
function translateX(distance) {
  var matrix = identity();
  matrix[12] = distance;
  return matrix;
}

/**
 * Returns a 4x4 matrix describing Y-axis translation.
 *
 * @param  {number} distance - Measured in pixels.
 * @return {array}
 */
function translateY(distance) {
  var matrix = identity();
  matrix[13] = distance;
  return matrix;
}

/**
 * Returns a 4x4 matrix describing Z-axis translation.
 *
 * @param  {number} distance - Measured in pixels.
 * @return {array}
 */
function translateZ(distance) {
  var matrix = identity();
  matrix[14] = distance;
  return matrix;
}
},{}],"../node_modules/miniraf/dist/miniraf.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*! @license miniraf v1.0.0

	Copyright 2018 Fisssion LLC.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.

*/
var polyfill = function () {
  var clock = Date.now();
  return function (callback) {
    var currentTime = Date.now();
    if (currentTime - clock > 16) {
      clock = currentTime;
      callback(currentTime);
    } else {
      setTimeout(function () {
        return polyfill(callback);
      }, 0);
    }
  };
}();
var index = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || polyfill;
var _default = exports.default = index;
},{}],"../node_modules/scrollreveal/dist/scrollreveal.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tealight = _interopRequireDefault(require("tealight"));
var _rematrix = require("rematrix");
var _miniraf = _interopRequireDefault(require("miniraf"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/*! @license ScrollReveal v4.0.9

	Copyright 2021 Fisssion LLC.

	Licensed under the GNU General Public License 3.0 for
	compatible open source projects and non-commercial use.

	For commercial sites, themes, projects, and applications,
	keep your source code private/proprietary by purchasing
	a commercial license from https://scrollrevealjs.org/
*/

var defaults = {
  delay: 0,
  distance: '0',
  duration: 600,
  easing: 'cubic-bezier(0.5, 0, 0, 1)',
  interval: 0,
  opacity: 0,
  origin: 'bottom',
  rotate: {
    x: 0,
    y: 0,
    z: 0
  },
  scale: 1,
  cleanup: false,
  container: document.documentElement,
  desktop: true,
  mobile: true,
  reset: false,
  useDelay: 'always',
  viewFactor: 0.0,
  viewOffset: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  afterReset: function afterReset() {},
  afterReveal: function afterReveal() {},
  beforeReset: function beforeReset() {},
  beforeReveal: function beforeReveal() {}
};
function failure() {
  document.documentElement.classList.remove('sr');
  return {
    clean: function clean() {},
    destroy: function destroy() {},
    reveal: function reveal() {},
    sync: function sync() {},
    get noop() {
      return true;
    }
  };
}
function success() {
  document.documentElement.classList.add('sr');
  if (document.body) {
    document.body.style.height = '100%';
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      document.body.style.height = '100%';
    });
  }
}
var mount = {
  success: success,
  failure: failure
};
function isObject(x) {
  return x !== null && x instanceof Object && (x.constructor === Object || Object.prototype.toString.call(x) === '[object Object]');
}
function each(collection, callback) {
  if (isObject(collection)) {
    var keys = Object.keys(collection);
    return keys.forEach(function (key) {
      return callback(collection[key], key, collection);
    });
  }
  if (collection instanceof Array) {
    return collection.forEach(function (item, i) {
      return callback(item, i, collection);
    });
  }
  throw new TypeError('Expected either an array or object literal.');
}
function logger(message) {
  var details = [],
    len = arguments.length - 1;
  while (len-- > 0) details[len] = arguments[len + 1];
  if (this.constructor.debug && console) {
    var report = "%cScrollReveal: " + message;
    details.forEach(function (detail) {
      return report += "\n — " + detail;
    });
    console.log(report, 'color: #ea654b;'); // eslint-disable-line no-console
  }
}
function rinse() {
  var this$1 = this;
  var struct = function () {
    return {
      active: [],
      stale: []
    };
  };
  var elementIds = struct();
  var sequenceIds = struct();
  var containerIds = struct();

  /**
   * Take stock of active element IDs.
   */
  try {
    each((0, _tealight.default)('[data-sr-id]'), function (node) {
      var id = parseInt(node.getAttribute('data-sr-id'));
      elementIds.active.push(id);
    });
  } catch (e) {
    throw e;
  }
  /**
   * Destroy stale elements.
   */
  each(this.store.elements, function (element) {
    if (elementIds.active.indexOf(element.id) === -1) {
      elementIds.stale.push(element.id);
    }
  });
  each(elementIds.stale, function (staleId) {
    return delete this$1.store.elements[staleId];
  });

  /**
   * Take stock of active container and sequence IDs.
   */
  each(this.store.elements, function (element) {
    if (containerIds.active.indexOf(element.containerId) === -1) {
      containerIds.active.push(element.containerId);
    }
    if (element.hasOwnProperty('sequence')) {
      if (sequenceIds.active.indexOf(element.sequence.id) === -1) {
        sequenceIds.active.push(element.sequence.id);
      }
    }
  });

  /**
   * Destroy stale containers.
   */
  each(this.store.containers, function (container) {
    if (containerIds.active.indexOf(container.id) === -1) {
      containerIds.stale.push(container.id);
    }
  });
  each(containerIds.stale, function (staleId) {
    var stale = this$1.store.containers[staleId].node;
    stale.removeEventListener('scroll', this$1.delegate);
    stale.removeEventListener('resize', this$1.delegate);
    delete this$1.store.containers[staleId];
  });

  /**
   * Destroy stale sequences.
   */
  each(this.store.sequences, function (sequence) {
    if (sequenceIds.active.indexOf(sequence.id) === -1) {
      sequenceIds.stale.push(sequence.id);
    }
  });
  each(sequenceIds.stale, function (staleId) {
    return delete this$1.store.sequences[staleId];
  });
}
var getPrefixedCssProp = function () {
  var properties = {};
  var style = document.documentElement.style;
  function getPrefixedCssProperty(name, source) {
    if (source === void 0) source = style;
    if (name && typeof name === 'string') {
      if (properties[name]) {
        return properties[name];
      }
      if (typeof source[name] === 'string') {
        return properties[name] = name;
      }
      if (typeof source["-webkit-" + name] === 'string') {
        return properties[name] = "-webkit-" + name;
      }
      throw new RangeError("Unable to find \"" + name + "\" style property.");
    }
    throw new TypeError('Expected a string.');
  }
  getPrefixedCssProperty.clearCache = function () {
    return properties = {};
  };
  return getPrefixedCssProperty;
}();
function style(element) {
  var computed = window.getComputedStyle(element.node);
  var position = computed.position;
  var config = element.config;

  /**
   * Generate inline styles
   */
  var inline = {};
  var inlineStyle = element.node.getAttribute('style') || '';
  var inlineMatch = inlineStyle.match(/[\w-]+\s*:\s*[^;]+\s*/gi) || [];
  inline.computed = inlineMatch ? inlineMatch.map(function (m) {
    return m.trim();
  }).join('; ') + ';' : '';
  inline.generated = inlineMatch.some(function (m) {
    return m.match(/visibility\s?:\s?visible/i);
  }) ? inline.computed : inlineMatch.concat(['visibility: visible']).map(function (m) {
    return m.trim();
  }).join('; ') + ';';

  /**
   * Generate opacity styles
   */
  var computedOpacity = parseFloat(computed.opacity);
  var configOpacity = !isNaN(parseFloat(config.opacity)) ? parseFloat(config.opacity) : parseFloat(computed.opacity);
  var opacity = {
    computed: computedOpacity !== configOpacity ? "opacity: " + computedOpacity + ";" : '',
    generated: computedOpacity !== configOpacity ? "opacity: " + configOpacity + ";" : ''
  };

  /**
   * Generate transformation styles
   */
  var transformations = [];
  if (parseFloat(config.distance)) {
    var axis = config.origin === 'top' || config.origin === 'bottom' ? 'Y' : 'X';

    /**
     * Let’s make sure our our pixel distances are negative for top and left.
     * e.g. { origin: 'top', distance: '25px' } starts at `top: -25px` in CSS.
     */
    var distance = config.distance;
    if (config.origin === 'top' || config.origin === 'left') {
      distance = /^-/.test(distance) ? distance.substr(1) : "-" + distance;
    }
    var ref = distance.match(/(^-?\d+\.?\d?)|(em$|px$|%$)/g);
    var value = ref[0];
    var unit = ref[1];
    switch (unit) {
      case 'em':
        distance = parseInt(computed.fontSize) * value;
        break;
      case 'px':
        distance = value;
        break;
      case '%':
        /**
         * Here we use `getBoundingClientRect` instead of
         * the existing data attached to `element.geometry`
         * because only the former includes any transformations
         * current applied to the element.
         *
         * If that behavior ends up being unintuitive, this
         * logic could instead utilize `element.geometry.height`
         * and `element.geoemetry.width` for the distance calculation
         */
        distance = axis === 'Y' ? element.node.getBoundingClientRect().height * value / 100 : element.node.getBoundingClientRect().width * value / 100;
        break;
      default:
        throw new RangeError('Unrecognized or missing distance unit.');
    }
    if (axis === 'Y') {
      transformations.push((0, _rematrix.translateY)(distance));
    } else {
      transformations.push((0, _rematrix.translateX)(distance));
    }
  }
  if (config.rotate.x) {
    transformations.push((0, _rematrix.rotateX)(config.rotate.x));
  }
  if (config.rotate.y) {
    transformations.push((0, _rematrix.rotateY)(config.rotate.y));
  }
  if (config.rotate.z) {
    transformations.push((0, _rematrix.rotateZ)(config.rotate.z));
  }
  if (config.scale !== 1) {
    if (config.scale === 0) {
      /**
       * The CSS Transforms matrix interpolation specification
       * basically disallows transitions of non-invertible
       * matrixes, which means browsers won't transition
       * elements with zero scale.
       *
       * That’s inconvenient for the API and developer
       * experience, so we simply nudge their value
       * slightly above zero; this allows browsers
       * to transition our element as expected.
       *
       * `0.0002` was the smallest number
       * that performed across browsers.
       */
      transformations.push((0, _rematrix.scale)(0.0002));
    } else {
      transformations.push((0, _rematrix.scale)(config.scale));
    }
  }
  var transform = {};
  if (transformations.length) {
    transform.property = getPrefixedCssProp('transform');
    /**
     * The default computed transform value should be one of:
     * undefined || 'none' || 'matrix()' || 'matrix3d()'
     */
    transform.computed = {
      raw: computed[transform.property],
      matrix: (0, _rematrix.parse)(computed[transform.property])
    };
    transformations.unshift(transform.computed.matrix);
    var product = transformations.reduce(_rematrix.multiply);
    transform.generated = {
      initial: transform.property + ": matrix3d(" + product.join(', ') + ");",
      final: transform.property + ": matrix3d(" + transform.computed.matrix.join(', ') + ");"
    };
  } else {
    transform.generated = {
      initial: '',
      final: ''
    };
  }

  /**
   * Generate transition styles
   */
  var transition = {};
  if (opacity.generated || transform.generated.initial) {
    transition.property = getPrefixedCssProp('transition');
    transition.computed = computed[transition.property];
    transition.fragments = [];
    var delay = config.delay;
    var duration = config.duration;
    var easing = config.easing;
    if (opacity.generated) {
      transition.fragments.push({
        delayed: "opacity " + duration / 1000 + "s " + easing + " " + delay / 1000 + "s",
        instant: "opacity " + duration / 1000 + "s " + easing + " 0s"
      });
    }
    if (transform.generated.initial) {
      transition.fragments.push({
        delayed: transform.property + " " + duration / 1000 + "s " + easing + " " + delay / 1000 + "s",
        instant: transform.property + " " + duration / 1000 + "s " + easing + " 0s"
      });
    }

    /**
     * The default computed transition property should be undefined, or one of:
     * '' || 'none 0s ease 0s' || 'all 0s ease 0s' || 'all 0s 0s cubic-bezier()'
     */
    var hasCustomTransition = transition.computed && !transition.computed.match(/all 0s|none 0s/);
    if (hasCustomTransition) {
      transition.fragments.unshift({
        delayed: transition.computed,
        instant: transition.computed
      });
    }
    var composed = transition.fragments.reduce(function (composition, fragment, i) {
      composition.delayed += i === 0 ? fragment.delayed : ", " + fragment.delayed;
      composition.instant += i === 0 ? fragment.instant : ", " + fragment.instant;
      return composition;
    }, {
      delayed: '',
      instant: ''
    });
    transition.generated = {
      delayed: transition.property + ": " + composed.delayed + ";",
      instant: transition.property + ": " + composed.instant + ";"
    };
  } else {
    transition.generated = {
      delayed: '',
      instant: ''
    };
  }
  return {
    inline: inline,
    opacity: opacity,
    position: position,
    transform: transform,
    transition: transition
  };
}

/**
 * apply a CSS string to an element using the CSSOM (element.style) rather
 * than setAttribute, which may violate the content security policy.
 *
 * @param {Node}   [el]  Element to receive styles.
 * @param {string} [declaration] Styles to apply.
 */
function applyStyle(el, declaration) {
  declaration.split(';').forEach(function (pair) {
    var ref = pair.split(':');
    var property = ref[0];
    var value = ref.slice(1);
    if (property && value) {
      el.style[property.trim()] = value.join(':');
    }
  });
}
function clean(target) {
  var this$1 = this;
  var dirty;
  try {
    each((0, _tealight.default)(target), function (node) {
      var id = node.getAttribute('data-sr-id');
      if (id !== null) {
        dirty = true;
        var element = this$1.store.elements[id];
        if (element.callbackTimer) {
          window.clearTimeout(element.callbackTimer.clock);
        }
        applyStyle(element.node, element.styles.inline.generated);
        node.removeAttribute('data-sr-id');
        delete this$1.store.elements[id];
      }
    });
  } catch (e) {
    return logger.call(this, 'Clean failed.', e.message);
  }
  if (dirty) {
    try {
      rinse.call(this);
    } catch (e) {
      return logger.call(this, 'Clean failed.', e.message);
    }
  }
}
function destroy() {
  var this$1 = this;

  /**
   * Remove all generated styles and element ids
   */
  each(this.store.elements, function (element) {
    applyStyle(element.node, element.styles.inline.generated);
    element.node.removeAttribute('data-sr-id');
  });

  /**
   * Remove all event listeners.
   */
  each(this.store.containers, function (container) {
    var target = container.node === document.documentElement ? window : container.node;
    target.removeEventListener('scroll', this$1.delegate);
    target.removeEventListener('resize', this$1.delegate);
  });

  /**
   * Clear all data from the store
   */
  this.store = {
    containers: {},
    elements: {},
    history: [],
    sequences: {}
  };
}
function deepAssign(target) {
  var sources = [],
    len = arguments.length - 1;
  while (len-- > 0) sources[len] = arguments[len + 1];
  if (isObject(target)) {
    each(sources, function (source) {
      each(source, function (data, key) {
        if (isObject(data)) {
          if (!target[key] || !isObject(target[key])) {
            target[key] = {};
          }
          deepAssign(target[key], data);
        } else {
          target[key] = data;
        }
      });
    });
    return target;
  } else {
    throw new TypeError('Target must be an object literal.');
  }
}
function isMobile(agent) {
  if (agent === void 0) agent = navigator.userAgent;
  return /Android|iPhone|iPad|iPod/i.test(agent);
}
var nextUniqueId = function () {
  var uid = 0;
  return function () {
    return uid++;
  };
}();
function initialize() {
  var this$1 = this;
  rinse.call(this);
  each(this.store.elements, function (element) {
    var styles = [element.styles.inline.generated];
    if (element.visible) {
      styles.push(element.styles.opacity.computed);
      styles.push(element.styles.transform.generated.final);
      element.revealed = true;
    } else {
      styles.push(element.styles.opacity.generated);
      styles.push(element.styles.transform.generated.initial);
      element.revealed = false;
    }
    applyStyle(element.node, styles.filter(function (s) {
      return s !== '';
    }).join(' '));
  });
  each(this.store.containers, function (container) {
    var target = container.node === document.documentElement ? window : container.node;
    target.addEventListener('scroll', this$1.delegate);
    target.addEventListener('resize', this$1.delegate);
  });

  /**
   * Manually invoke delegate once to capture
   * element and container dimensions, container
   * scroll position, and trigger any valid reveals
   */
  this.delegate();

  /**
   * Wipe any existing `setTimeout` now
   * that initialization has completed.
   */
  this.initTimeout = null;
}
function animate(element, force) {
  if (force === void 0) force = {};
  var pristine = force.pristine || this.pristine;
  var delayed = element.config.useDelay === 'always' || element.config.useDelay === 'onload' && pristine || element.config.useDelay === 'once' && !element.seen;
  var shouldReveal = element.visible && !element.revealed;
  var shouldReset = !element.visible && element.revealed && element.config.reset;
  if (force.reveal || shouldReveal) {
    return triggerReveal.call(this, element, delayed);
  }
  if (force.reset || shouldReset) {
    return triggerReset.call(this, element);
  }
}
function triggerReveal(element, delayed) {
  var styles = [element.styles.inline.generated, element.styles.opacity.computed, element.styles.transform.generated.final];
  if (delayed) {
    styles.push(element.styles.transition.generated.delayed);
  } else {
    styles.push(element.styles.transition.generated.instant);
  }
  element.revealed = element.seen = true;
  applyStyle(element.node, styles.filter(function (s) {
    return s !== '';
  }).join(' '));
  registerCallbacks.call(this, element, delayed);
}
function triggerReset(element) {
  var styles = [element.styles.inline.generated, element.styles.opacity.generated, element.styles.transform.generated.initial, element.styles.transition.generated.instant];
  element.revealed = false;
  applyStyle(element.node, styles.filter(function (s) {
    return s !== '';
  }).join(' '));
  registerCallbacks.call(this, element);
}
function registerCallbacks(element, isDelayed) {
  var this$1 = this;
  var duration = isDelayed ? element.config.duration + element.config.delay : element.config.duration;
  var beforeCallback = element.revealed ? element.config.beforeReveal : element.config.beforeReset;
  var afterCallback = element.revealed ? element.config.afterReveal : element.config.afterReset;
  var elapsed = 0;
  if (element.callbackTimer) {
    elapsed = Date.now() - element.callbackTimer.start;
    window.clearTimeout(element.callbackTimer.clock);
  }
  beforeCallback(element.node);
  element.callbackTimer = {
    start: Date.now(),
    clock: window.setTimeout(function () {
      afterCallback(element.node);
      element.callbackTimer = null;
      if (element.revealed && !element.config.reset && element.config.cleanup) {
        clean.call(this$1, element.node);
      }
    }, duration - elapsed)
  };
}
function sequence(element, pristine) {
  if (pristine === void 0) pristine = this.pristine;

  /**
   * We first check if the element should reset.
   */
  if (!element.visible && element.revealed && element.config.reset) {
    return animate.call(this, element, {
      reset: true
    });
  }
  var seq = this.store.sequences[element.sequence.id];
  var i = element.sequence.index;
  if (seq) {
    var visible = new SequenceModel(seq, 'visible', this.store);
    var revealed = new SequenceModel(seq, 'revealed', this.store);
    seq.models = {
      visible: visible,
      revealed: revealed
    };

    /**
     * If the sequence has no revealed members,
     * then we reveal the first visible element
     * within that sequence.
     *
     * The sequence then cues a recursive call
     * in both directions.
     */
    if (!revealed.body.length) {
      var nextId = seq.members[visible.body[0]];
      var nextElement = this.store.elements[nextId];
      if (nextElement) {
        cue.call(this, seq, visible.body[0], -1, pristine);
        cue.call(this, seq, visible.body[0], +1, pristine);
        return animate.call(this, nextElement, {
          reveal: true,
          pristine: pristine
        });
      }
    }

    /**
     * If our element isn’t resetting, we check the
     * element sequence index against the head, and
     * then the foot of the sequence.
     */
    if (!seq.blocked.head && i === [].concat(revealed.head).pop() && i >= [].concat(visible.body).shift()) {
      cue.call(this, seq, i, -1, pristine);
      return animate.call(this, element, {
        reveal: true,
        pristine: pristine
      });
    }
    if (!seq.blocked.foot && i === [].concat(revealed.foot).shift() && i <= [].concat(visible.body).pop()) {
      cue.call(this, seq, i, +1, pristine);
      return animate.call(this, element, {
        reveal: true,
        pristine: pristine
      });
    }
  }
}
function Sequence(interval) {
  var i = Math.abs(interval);
  if (!isNaN(i)) {
    this.id = nextUniqueId();
    this.interval = Math.max(i, 16);
    this.members = [];
    this.models = {};
    this.blocked = {
      head: false,
      foot: false
    };
  } else {
    throw new RangeError('Invalid sequence interval.');
  }
}
function SequenceModel(seq, prop, store) {
  var this$1 = this;
  this.head = [];
  this.body = [];
  this.foot = [];
  each(seq.members, function (id, index) {
    var element = store.elements[id];
    if (element && element[prop]) {
      this$1.body.push(index);
    }
  });
  if (this.body.length) {
    each(seq.members, function (id, index) {
      var element = store.elements[id];
      if (element && !element[prop]) {
        if (index < this$1.body[0]) {
          this$1.head.push(index);
        } else {
          this$1.foot.push(index);
        }
      }
    });
  }
}
function cue(seq, i, direction, pristine) {
  var this$1 = this;
  var blocked = ['head', null, 'foot'][1 + direction];
  var nextId = seq.members[i + direction];
  var nextElement = this.store.elements[nextId];
  seq.blocked[blocked] = true;
  setTimeout(function () {
    seq.blocked[blocked] = false;
    if (nextElement) {
      sequence.call(this$1, nextElement, pristine);
    }
  }, seq.interval);
}
function reveal(target, options, syncing) {
  var this$1 = this;
  if (options === void 0) options = {};
  if (syncing === void 0) syncing = false;
  var containerBuffer = [];
  var sequence$$1;
  var interval = options.interval || defaults.interval;
  try {
    if (interval) {
      sequence$$1 = new Sequence(interval);
    }
    var nodes = (0, _tealight.default)(target);
    if (!nodes.length) {
      throw new Error('Invalid reveal target.');
    }
    var elements = nodes.reduce(function (elementBuffer, elementNode) {
      var element = {};
      var existingId = elementNode.getAttribute('data-sr-id');
      if (existingId) {
        deepAssign(element, this$1.store.elements[existingId]);

        /**
         * In order to prevent previously generated styles
         * from throwing off the new styles, the style tag
         * has to be reverted to its pre-reveal state.
         */
        applyStyle(element.node, element.styles.inline.computed);
      } else {
        element.id = nextUniqueId();
        element.node = elementNode;
        element.seen = false;
        element.revealed = false;
        element.visible = false;
      }
      var config = deepAssign({}, element.config || this$1.defaults, options);
      if (!config.mobile && isMobile() || !config.desktop && !isMobile()) {
        if (existingId) {
          clean.call(this$1, element);
        }
        return elementBuffer; // skip elements that are disabled
      }
      var containerNode = (0, _tealight.default)(config.container)[0];
      if (!containerNode) {
        throw new Error('Invalid container.');
      }
      if (!containerNode.contains(elementNode)) {
        return elementBuffer; // skip elements found outside the container
      }
      var containerId;
      {
        containerId = getContainerId(containerNode, containerBuffer, this$1.store.containers);
        if (containerId === null) {
          containerId = nextUniqueId();
          containerBuffer.push({
            id: containerId,
            node: containerNode
          });
        }
      }
      element.config = config;
      element.containerId = containerId;
      element.styles = style(element);
      if (sequence$$1) {
        element.sequence = {
          id: sequence$$1.id,
          index: sequence$$1.members.length
        };
        sequence$$1.members.push(element.id);
      }
      elementBuffer.push(element);
      return elementBuffer;
    }, []);

    /**
     * Modifying the DOM via setAttribute needs to be handled
     * separately from reading computed styles in the map above
     * for the browser to batch DOM changes (limiting reflows)
     */
    each(elements, function (element) {
      this$1.store.elements[element.id] = element;
      element.node.setAttribute('data-sr-id', element.id);
    });
  } catch (e) {
    return logger.call(this, 'Reveal failed.', e.message);
  }

  /**
   * Now that element set-up is complete...
   * Let’s commit any container and sequence data we have to the store.
   */
  each(containerBuffer, function (container) {
    this$1.store.containers[container.id] = {
      id: container.id,
      node: container.node
    };
  });
  if (sequence$$1) {
    this.store.sequences[sequence$$1.id] = sequence$$1;
  }

  /**
   * If reveal wasn't invoked by sync, we want to
   * make sure to add this call to the history.
   */
  if (syncing !== true) {
    this.store.history.push({
      target: target,
      options: options
    });

    /**
     * Push initialization to the event queue, giving
     * multiple reveal calls time to be interpreted.
     */
    if (this.initTimeout) {
      window.clearTimeout(this.initTimeout);
    }
    this.initTimeout = window.setTimeout(initialize.bind(this), 0);
  }
}
function getContainerId(node) {
  var collections = [],
    len = arguments.length - 1;
  while (len-- > 0) collections[len] = arguments[len + 1];
  var id = null;
  each(collections, function (collection) {
    each(collection, function (container) {
      if (id === null && container.node === node) {
        id = container.id;
      }
    });
  });
  return id;
}

/**
 * Re-runs the reveal method for each record stored in history,
 * for capturing new content asynchronously loaded into the DOM.
 */
function sync() {
  var this$1 = this;
  each(this.store.history, function (record) {
    reveal.call(this$1, record.target, record.options, true);
  });
  initialize.call(this);
}
var polyfill = function (x) {
  return (x > 0) - (x < 0) || +x;
};
var mathSign = Math.sign || polyfill;
function getGeometry(target, isContainer) {
  /**
   * We want to ignore padding and scrollbars for container elements.
   * More information here: https://goo.gl/vOZpbz
   */
  var height = isContainer ? target.node.clientHeight : target.node.offsetHeight;
  var width = isContainer ? target.node.clientWidth : target.node.offsetWidth;
  var offsetTop = 0;
  var offsetLeft = 0;
  var node = target.node;
  do {
    if (!isNaN(node.offsetTop)) {
      offsetTop += node.offsetTop;
    }
    if (!isNaN(node.offsetLeft)) {
      offsetLeft += node.offsetLeft;
    }
    node = node.offsetParent;
  } while (node);
  return {
    bounds: {
      top: offsetTop,
      right: offsetLeft + width,
      bottom: offsetTop + height,
      left: offsetLeft
    },
    height: height,
    width: width
  };
}
function getScrolled(container) {
  var top, left;
  if (container.node === document.documentElement) {
    top = window.pageYOffset;
    left = window.pageXOffset;
  } else {
    top = container.node.scrollTop;
    left = container.node.scrollLeft;
  }
  return {
    top: top,
    left: left
  };
}
function isElementVisible(element) {
  if (element === void 0) element = {};
  var container = this.store.containers[element.containerId];
  if (!container) {
    return;
  }
  var viewFactor = Math.max(0, Math.min(1, element.config.viewFactor));
  var viewOffset = element.config.viewOffset;
  var elementBounds = {
    top: element.geometry.bounds.top + element.geometry.height * viewFactor,
    right: element.geometry.bounds.right - element.geometry.width * viewFactor,
    bottom: element.geometry.bounds.bottom - element.geometry.height * viewFactor,
    left: element.geometry.bounds.left + element.geometry.width * viewFactor
  };
  var containerBounds = {
    top: container.geometry.bounds.top + container.scroll.top + viewOffset.top,
    right: container.geometry.bounds.right + container.scroll.left - viewOffset.right,
    bottom: container.geometry.bounds.bottom + container.scroll.top - viewOffset.bottom,
    left: container.geometry.bounds.left + container.scroll.left + viewOffset.left
  };
  return elementBounds.top < containerBounds.bottom && elementBounds.right > containerBounds.left && elementBounds.bottom > containerBounds.top && elementBounds.left < containerBounds.right || element.styles.position === 'fixed';
}
function delegate(event, elements) {
  var this$1 = this;
  if (event === void 0) event = {
    type: 'init'
  };
  if (elements === void 0) elements = this.store.elements;
  (0, _miniraf.default)(function () {
    var stale = event.type === 'init' || event.type === 'resize';
    each(this$1.store.containers, function (container) {
      if (stale) {
        container.geometry = getGeometry.call(this$1, container, true);
      }
      var scroll = getScrolled.call(this$1, container);
      if (container.scroll) {
        container.direction = {
          x: mathSign(scroll.left - container.scroll.left),
          y: mathSign(scroll.top - container.scroll.top)
        };
      }
      container.scroll = scroll;
    });

    /**
     * Due to how the sequencer is implemented, it’s
     * important that we update the state of all
     * elements, before any animation logic is
     * evaluated (in the second loop below).
     */
    each(elements, function (element) {
      if (stale || element.geometry === undefined) {
        element.geometry = getGeometry.call(this$1, element);
      }
      element.visible = isElementVisible.call(this$1, element);
    });
    each(elements, function (element) {
      if (element.sequence) {
        sequence.call(this$1, element);
      } else {
        animate.call(this$1, element);
      }
    });
    this$1.pristine = false;
  });
}
function isTransformSupported() {
  var style = document.documentElement.style;
  return 'transform' in style || 'WebkitTransform' in style;
}
function isTransitionSupported() {
  var style = document.documentElement.style;
  return 'transition' in style || 'WebkitTransition' in style;
}
var version = "4.0.9";
var boundDelegate;
var boundDestroy;
var boundReveal;
var boundClean;
var boundSync;
var config;
var debug;
var instance;
function ScrollReveal(options) {
  if (options === void 0) options = {};
  var invokedWithoutNew = typeof this === 'undefined' || Object.getPrototypeOf(this) !== ScrollReveal.prototype;
  if (invokedWithoutNew) {
    return new ScrollReveal(options);
  }
  if (!ScrollReveal.isSupported()) {
    logger.call(this, 'Instantiation failed.', 'This browser is not supported.');
    return mount.failure();
  }
  var buffer;
  try {
    buffer = config ? deepAssign({}, config, options) : deepAssign({}, defaults, options);
  } catch (e) {
    logger.call(this, 'Invalid configuration.', e.message);
    return mount.failure();
  }
  try {
    var container = (0, _tealight.default)(buffer.container)[0];
    if (!container) {
      throw new Error('Invalid container.');
    }
  } catch (e) {
    logger.call(this, e.message);
    return mount.failure();
  }
  config = buffer;
  if (!config.mobile && isMobile() || !config.desktop && !isMobile()) {
    logger.call(this, 'This device is disabled.', "desktop: " + config.desktop, "mobile: " + config.mobile);
    return mount.failure();
  }
  mount.success();
  this.store = {
    containers: {},
    elements: {},
    history: [],
    sequences: {}
  };
  this.pristine = true;
  boundDelegate = boundDelegate || delegate.bind(this);
  boundDestroy = boundDestroy || destroy.bind(this);
  boundReveal = boundReveal || reveal.bind(this);
  boundClean = boundClean || clean.bind(this);
  boundSync = boundSync || sync.bind(this);
  Object.defineProperty(this, 'delegate', {
    get: function () {
      return boundDelegate;
    }
  });
  Object.defineProperty(this, 'destroy', {
    get: function () {
      return boundDestroy;
    }
  });
  Object.defineProperty(this, 'reveal', {
    get: function () {
      return boundReveal;
    }
  });
  Object.defineProperty(this, 'clean', {
    get: function () {
      return boundClean;
    }
  });
  Object.defineProperty(this, 'sync', {
    get: function () {
      return boundSync;
    }
  });
  Object.defineProperty(this, 'defaults', {
    get: function () {
      return config;
    }
  });
  Object.defineProperty(this, 'version', {
    get: function () {
      return version;
    }
  });
  Object.defineProperty(this, 'noop', {
    get: function () {
      return false;
    }
  });
  return instance ? instance : instance = this;
}
ScrollReveal.isSupported = function () {
  return isTransformSupported() && isTransitionSupported();
};
Object.defineProperty(ScrollReveal, 'debug', {
  get: function () {
    return debug || false;
  },
  set: function (value) {
    return debug = typeof value === 'boolean' ? value : debug;
  }
});
ScrollReveal();
var _default = exports.default = ScrollReveal;
},{"tealight":"../node_modules/tealight/dist/tealight.es.js","rematrix":"../node_modules/rematrix/dist/rematrix.es.js","miniraf":"../node_modules/miniraf/dist/miniraf.es.js"}],"index.js":[function(require,module,exports) {
"use strict";

require("./styles/main.scss");
var _glide = _interopRequireDefault(require("@glidejs/glide"));
var _typeit = _interopRequireDefault(require("typeit"));
var _scrollreveal = _interopRequireDefault(require("scrollreveal"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
new _glide.default('.glide', {
  type: 'carousel',
  perView: 2,
  breakpoints: {
    800: {
      perView: 1
    }
  }
}).mount();

// Type It
new _typeit.default('#type1', {
  speed: 120,
  loop: true,
  waitUntilVisible: true
}).type('Designer', {
  delay: 700
}).pause(800).delete(9).type('Developer', {
  delay: 700
}).pause(800).delete(9).go();
new _typeit.default('#type2', {
  speed: 120,
  loop: true,
  waitUntilVisible: true
}).type('Designer', {
  delay: 400
}).pause(100).delete(9).type('Developer', {
  delay: 400
}).pause(700).delete(20).go();
var scrollReveal = (0, _scrollreveal.default)({
  origin: 'top',
  distance: '80px',
  duration: 2000,
  reset: true
});

// Scroll Reveal Header
scrollReveal.reveal('.banner__content', {});
scrollReveal.reveal('.btn', {
  delay: 80
});
scrollReveal.reveal('.banner__image', {
  delay: 100
});

// Scroll Reveal About
scrollReveal.reveal('.about__left', {});
scrollReveal.reveal('.about__right', {
  delay: 80
});

// Scroll Reveal Skills
scrollReveal.reveal('.skills__left', {
  delay: 80
});
scrollReveal.reveal('.skills__right', {});

// Scroll Reveal Projects
scrollReveal.reveal('.work__box', {
  delay: 100
});

// Scroll Reveal Contact
scrollReveal.reveal('.contact__container', {});
scrollReveal.reveal('.contact__info', {
  delay: 80
});
scrollReveal.reveal('.contact__form', {
  delay: 100
});
window.addEventListener('scroll', function () {
  var nav = document.querySelector('.navigation');
  var windowPosition = window.scrollY > 0;
  nav.classList.toggle('fix__nav', windowPosition);
});

// const links = document.querySelectorAll('.nav__link');
// const sections = document.querySelectorAll('.section');

// function changeLinkState() {
//   let index = sections.length;
//   while (--index && window.scrollY + 150 < sections[index].offsetTop) {}
//   console.log(window.scrollY);
//   links.forEach(link => link.classList.remove('active'));
//   links[index].classList.add('active');
// }

// const throttle = (fn, limit) => {
//   let flag = true;
//   return function () {
//     let context = this;
//     let args = arguments;
//     if (flag) {
//       fn.apply(context, args);
//       flag = false;
//       setTimeout(() => {
//         flag = true;
//       }, limit);
//     }
//   };
// };

// window.onscroll = throttle(changeLinkState, 100);

var navOpen = document.querySelector('.nav__toggle');
var navContainer = document.querySelector('.nav__menu');
var navList = document.querySelector('.nav__list');
navOpen.addEventListener('click', menuOnClick);
function menuOnClick() {
  document.querySelector('.nav__toggle').classList.toggle('change');
  document.querySelector('.navigation').classList.toggle('change-bg');
  var listHeight = navList.getBoundingClientRect().height;
  var containerHeight = navContainer.getBoundingClientRect().height;
  if (containerHeight === 0) {
    navContainer.style.height = "".concat(listHeight + 10, "px");
  } else {
    navContainer.style.height = '0px';
  }
}
document.getElementById("current-year").textContent = new Date().getFullYear();
},{"./styles/main.scss":"styles/main.scss","@glidejs/glide":"../node_modules/@glidejs/glide/dist/glide.esm.js","typeit":"../node_modules/typeit/dist/typeit.es.min.js","scrollreveal":"../node_modules/scrollreveal/dist/scrollreveal.es.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55820" + '/');
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
      });

      // Enable HMR for CSS by default.
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
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
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
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map