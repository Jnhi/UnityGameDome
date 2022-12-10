/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@protobufjs/aspromise/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/@protobufjs/aspromise/index.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";

module.exports = asPromise;

/**
 * Callback as used by {@link util.asPromise}.
 * @typedef asPromiseCallback
 * @type {function}
 * @param {Error|null} error Error, if any
 * @param {...*} params Additional arguments
 * @returns {undefined}
 */

/**
 * Returns a promise from a node-style callback function.
 * @memberof util
 * @param {asPromiseCallback} fn Function to call
 * @param {*} ctx Function context
 * @param {...*} params Function arguments
 * @returns {Promise<*>} Promisified function
 */
function asPromise(fn, ctx/*, varargs */) {
    var params  = new Array(arguments.length - 1),
        offset  = 0,
        index   = 2,
        pending = true;
    while (index < arguments.length)
        params[offset++] = arguments[index++];
    return new Promise(function executor(resolve, reject) {
        params[offset] = function callback(err/*, varargs */) {
            if (pending) {
                pending = false;
                if (err)
                    reject(err);
                else {
                    var params = new Array(arguments.length - 1),
                        offset = 0;
                    while (offset < params.length)
                        params[offset++] = arguments[offset];
                    resolve.apply(null, params);
                }
            }
        };
        try {
            fn.apply(ctx || null, params);
        } catch (err) {
            if (pending) {
                pending = false;
                reject(err);
            }
        }
    });
}


/***/ }),

/***/ "./node_modules/@protobufjs/base64/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@protobufjs/base64/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


/**
 * A minimal base64 implementation for number arrays.
 * @memberof util
 * @namespace
 */
var base64 = exports;

/**
 * Calculates the byte length of a base64 encoded string.
 * @param {string} string Base64 encoded string
 * @returns {number} Byte length
 */
base64.length = function length(string) {
    var p = string.length;
    if (!p)
        return 0;
    var n = 0;
    while (--p % 4 > 1 && string.charAt(p) === "=")
        ++n;
    return Math.ceil(string.length * 3) / 4 - n;
};

// Base64 encoding table
var b64 = new Array(64);

// Base64 decoding table
var s64 = new Array(123);

// 65..90, 97..122, 48..57, 43, 47
for (var i = 0; i < 64;)
    s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;

/**
 * Encodes a buffer to a base64 encoded string.
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} Base64 encoded string
 */
base64.encode = function encode(buffer, start, end) {
    var parts = null,
        chunk = [];
    var i = 0, // output index
        j = 0, // goto index
        t;     // temporary
    while (start < end) {
        var b = buffer[start++];
        switch (j) {
            case 0:
                chunk[i++] = b64[b >> 2];
                t = (b & 3) << 4;
                j = 1;
                break;
            case 1:
                chunk[i++] = b64[t | b >> 4];
                t = (b & 15) << 2;
                j = 2;
                break;
            case 2:
                chunk[i++] = b64[t | b >> 6];
                chunk[i++] = b64[b & 63];
                j = 0;
                break;
        }
        if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
        }
    }
    if (j) {
        chunk[i++] = b64[t];
        chunk[i++] = 61;
        if (j === 1)
            chunk[i++] = 61;
    }
    if (parts) {
        if (i)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i));
};

var invalidEncoding = "invalid encoding";

/**
 * Decodes a base64 encoded string to a buffer.
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Number of bytes written
 * @throws {Error} If encoding is invalid
 */
base64.decode = function decode(string, buffer, offset) {
    var start = offset;
    var j = 0, // goto index
        t;     // temporary
    for (var i = 0; i < string.length;) {
        var c = string.charCodeAt(i++);
        if (c === 61 && j > 1)
            break;
        if ((c = s64[c]) === undefined)
            throw Error(invalidEncoding);
        switch (j) {
            case 0:
                t = c;
                j = 1;
                break;
            case 1:
                buffer[offset++] = t << 2 | (c & 48) >> 4;
                t = c;
                j = 2;
                break;
            case 2:
                buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
                t = c;
                j = 3;
                break;
            case 3:
                buffer[offset++] = (t & 3) << 6 | c;
                j = 0;
                break;
        }
    }
    if (j === 1)
        throw Error(invalidEncoding);
    return offset - start;
};

/**
 * Tests if the specified string appears to be base64 encoded.
 * @param {string} string String to test
 * @returns {boolean} `true` if probably base64 encoded, otherwise false
 */
base64.test = function test(string) {
    return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
};


/***/ }),

/***/ "./node_modules/@protobufjs/eventemitter/index.js":
/*!********************************************************!*\
  !*** ./node_modules/@protobufjs/eventemitter/index.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";

module.exports = EventEmitter;

/**
 * Constructs a new event emitter instance.
 * @classdesc A minimal event emitter.
 * @memberof util
 * @constructor
 */
function EventEmitter() {

    /**
     * Registered listeners.
     * @type {Object.<string,*>}
     * @private
     */
    this._listeners = {};
}

/**
 * Registers an event listener.
 * @param {string} evt Event name
 * @param {function} fn Listener
 * @param {*} [ctx] Listener context
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.on = function on(evt, fn, ctx) {
    (this._listeners[evt] || (this._listeners[evt] = [])).push({
        fn  : fn,
        ctx : ctx || this
    });
    return this;
};

/**
 * Removes an event listener or any matching listeners if arguments are omitted.
 * @param {string} [evt] Event name. Removes all listeners if omitted.
 * @param {function} [fn] Listener to remove. Removes all listeners of `evt` if omitted.
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.off = function off(evt, fn) {
    if (evt === undefined)
        this._listeners = {};
    else {
        if (fn === undefined)
            this._listeners[evt] = [];
        else {
            var listeners = this._listeners[evt];
            for (var i = 0; i < listeners.length;)
                if (listeners[i].fn === fn)
                    listeners.splice(i, 1);
                else
                    ++i;
        }
    }
    return this;
};

/**
 * Emits an event by calling its listeners with the specified arguments.
 * @param {string} evt Event name
 * @param {...*} args Arguments
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.emit = function emit(evt) {
    var listeners = this._listeners[evt];
    if (listeners) {
        var args = [],
            i = 1;
        for (; i < arguments.length;)
            args.push(arguments[i++]);
        for (i = 0; i < listeners.length;)
            listeners[i].fn.apply(listeners[i++].ctx, args);
    }
    return this;
};


/***/ }),

/***/ "./node_modules/@protobufjs/float/index.js":
/*!*************************************************!*\
  !*** ./node_modules/@protobufjs/float/index.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";


module.exports = factory(factory);

/**
 * Reads / writes floats / doubles from / to buffers.
 * @name util.float
 * @namespace
 */

/**
 * Writes a 32 bit float to a buffer using little endian byte order.
 * @name util.float.writeFloatLE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Writes a 32 bit float to a buffer using big endian byte order.
 * @name util.float.writeFloatBE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Reads a 32 bit float from a buffer using little endian byte order.
 * @name util.float.readFloatLE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Reads a 32 bit float from a buffer using big endian byte order.
 * @name util.float.readFloatBE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Writes a 64 bit double to a buffer using little endian byte order.
 * @name util.float.writeDoubleLE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Writes a 64 bit double to a buffer using big endian byte order.
 * @name util.float.writeDoubleBE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Reads a 64 bit double from a buffer using little endian byte order.
 * @name util.float.readDoubleLE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Reads a 64 bit double from a buffer using big endian byte order.
 * @name util.float.readDoubleBE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

// Factory function for the purpose of node-based testing in modified global environments
function factory(exports) {

    // float: typed array
    if (typeof Float32Array !== "undefined") (function() {

        var f32 = new Float32Array([ -0 ]),
            f8b = new Uint8Array(f32.buffer),
            le  = f8b[3] === 128;

        function writeFloat_f32_cpy(val, buf, pos) {
            f32[0] = val;
            buf[pos    ] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
        }

        function writeFloat_f32_rev(val, buf, pos) {
            f32[0] = val;
            buf[pos    ] = f8b[3];
            buf[pos + 1] = f8b[2];
            buf[pos + 2] = f8b[1];
            buf[pos + 3] = f8b[0];
        }

        /* istanbul ignore next */
        exports.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
        /* istanbul ignore next */
        exports.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;

        function readFloat_f32_cpy(buf, pos) {
            f8b[0] = buf[pos    ];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            return f32[0];
        }

        function readFloat_f32_rev(buf, pos) {
            f8b[3] = buf[pos    ];
            f8b[2] = buf[pos + 1];
            f8b[1] = buf[pos + 2];
            f8b[0] = buf[pos + 3];
            return f32[0];
        }

        /* istanbul ignore next */
        exports.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
        /* istanbul ignore next */
        exports.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;

    // float: ieee754
    })(); else (function() {

        function writeFloat_ieee754(writeUint, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
                val = -val;
            if (val === 0)
                writeUint(1 / val > 0 ? /* positive */ 0 : /* negative 0 */ 2147483648, buf, pos);
            else if (isNaN(val))
                writeUint(2143289344, buf, pos);
            else if (val > 3.4028234663852886e+38) // +-Infinity
                writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
            else if (val < 1.1754943508222875e-38) // denormal
                writeUint((sign << 31 | Math.round(val / 1.401298464324817e-45)) >>> 0, buf, pos);
            else {
                var exponent = Math.floor(Math.log(val) / Math.LN2),
                    mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
                writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
            }
        }

        exports.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
        exports.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);

        function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos),
                sign = (uint >> 31) * 2 + 1,
                exponent = uint >>> 23 & 255,
                mantissa = uint & 8388607;
            return exponent === 255
                ? mantissa
                ? NaN
                : sign * Infinity
                : exponent === 0 // denormal
                ? sign * 1.401298464324817e-45 * mantissa
                : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
        }

        exports.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
        exports.readFloatBE = readFloat_ieee754.bind(null, readUintBE);

    })();

    // double: typed array
    if (typeof Float64Array !== "undefined") (function() {

        var f64 = new Float64Array([-0]),
            f8b = new Uint8Array(f64.buffer),
            le  = f8b[7] === 128;

        function writeDouble_f64_cpy(val, buf, pos) {
            f64[0] = val;
            buf[pos    ] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
            buf[pos + 4] = f8b[4];
            buf[pos + 5] = f8b[5];
            buf[pos + 6] = f8b[6];
            buf[pos + 7] = f8b[7];
        }

        function writeDouble_f64_rev(val, buf, pos) {
            f64[0] = val;
            buf[pos    ] = f8b[7];
            buf[pos + 1] = f8b[6];
            buf[pos + 2] = f8b[5];
            buf[pos + 3] = f8b[4];
            buf[pos + 4] = f8b[3];
            buf[pos + 5] = f8b[2];
            buf[pos + 6] = f8b[1];
            buf[pos + 7] = f8b[0];
        }

        /* istanbul ignore next */
        exports.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
        /* istanbul ignore next */
        exports.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;

        function readDouble_f64_cpy(buf, pos) {
            f8b[0] = buf[pos    ];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            f8b[4] = buf[pos + 4];
            f8b[5] = buf[pos + 5];
            f8b[6] = buf[pos + 6];
            f8b[7] = buf[pos + 7];
            return f64[0];
        }

        function readDouble_f64_rev(buf, pos) {
            f8b[7] = buf[pos    ];
            f8b[6] = buf[pos + 1];
            f8b[5] = buf[pos + 2];
            f8b[4] = buf[pos + 3];
            f8b[3] = buf[pos + 4];
            f8b[2] = buf[pos + 5];
            f8b[1] = buf[pos + 6];
            f8b[0] = buf[pos + 7];
            return f64[0];
        }

        /* istanbul ignore next */
        exports.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
        /* istanbul ignore next */
        exports.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;

    // double: ieee754
    })(); else (function() {

        function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
                val = -val;
            if (val === 0) {
                writeUint(0, buf, pos + off0);
                writeUint(1 / val > 0 ? /* positive */ 0 : /* negative 0 */ 2147483648, buf, pos + off1);
            } else if (isNaN(val)) {
                writeUint(0, buf, pos + off0);
                writeUint(2146959360, buf, pos + off1);
            } else if (val > 1.7976931348623157e+308) { // +-Infinity
                writeUint(0, buf, pos + off0);
                writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
            } else {
                var mantissa;
                if (val < 2.2250738585072014e-308) { // denormal
                    mantissa = val / 5e-324;
                    writeUint(mantissa >>> 0, buf, pos + off0);
                    writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
                } else {
                    var exponent = Math.floor(Math.log(val) / Math.LN2);
                    if (exponent === 1024)
                        exponent = 1023;
                    mantissa = val * Math.pow(2, -exponent);
                    writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                    writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
                }
            }
        }

        exports.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
        exports.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);

        function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0),
                hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1,
                exponent = hi >>> 20 & 2047,
                mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047
                ? mantissa
                ? NaN
                : sign * Infinity
                : exponent === 0 // denormal
                ? sign * 5e-324 * mantissa
                : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
        }

        exports.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
        exports.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);

    })();

    return exports;
}

// uint helpers

function writeUintLE(val, buf, pos) {
    buf[pos    ] =  val        & 255;
    buf[pos + 1] =  val >>> 8  & 255;
    buf[pos + 2] =  val >>> 16 & 255;
    buf[pos + 3] =  val >>> 24;
}

function writeUintBE(val, buf, pos) {
    buf[pos    ] =  val >>> 24;
    buf[pos + 1] =  val >>> 16 & 255;
    buf[pos + 2] =  val >>> 8  & 255;
    buf[pos + 3] =  val        & 255;
}

function readUintLE(buf, pos) {
    return (buf[pos    ]
          | buf[pos + 1] << 8
          | buf[pos + 2] << 16
          | buf[pos + 3] << 24) >>> 0;
}

function readUintBE(buf, pos) {
    return (buf[pos    ] << 24
          | buf[pos + 1] << 16
          | buf[pos + 2] << 8
          | buf[pos + 3]) >>> 0;
}


/***/ }),

/***/ "./node_modules/@protobufjs/inquire/index.js":
/*!***************************************************!*\
  !*** ./node_modules/@protobufjs/inquire/index.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";

module.exports = inquire;

/**
 * Requires a module only if available.
 * @memberof util
 * @param {string} moduleName Module to require
 * @returns {?Object} Required module if available and not empty, otherwise `null`
 */
function inquire(moduleName) {
    try {
        var mod = eval("quire".replace(/^/,"re"))(moduleName); // eslint-disable-line no-eval
        if (mod && (mod.length || Object.keys(mod).length))
            return mod;
    } catch (e) {} // eslint-disable-line no-empty
    return null;
}


/***/ }),

/***/ "./node_modules/@protobufjs/pool/index.js":
/*!************************************************!*\
  !*** ./node_modules/@protobufjs/pool/index.js ***!
  \************************************************/
/***/ ((module) => {

"use strict";

module.exports = pool;

/**
 * An allocator as used by {@link util.pool}.
 * @typedef PoolAllocator
 * @type {function}
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */

/**
 * A slicer as used by {@link util.pool}.
 * @typedef PoolSlicer
 * @type {function}
 * @param {number} start Start offset
 * @param {number} end End offset
 * @returns {Uint8Array} Buffer slice
 * @this {Uint8Array}
 */

/**
 * A general purpose buffer pool.
 * @memberof util
 * @function
 * @param {PoolAllocator} alloc Allocator
 * @param {PoolSlicer} slice Slicer
 * @param {number} [size=8192] Slab size
 * @returns {PoolAllocator} Pooled allocator
 */
function pool(alloc, slice, size) {
    var SIZE   = size || 8192;
    var MAX    = SIZE >>> 1;
    var slab   = null;
    var offset = SIZE;
    return function pool_alloc(size) {
        if (size < 1 || size > MAX)
            return alloc(size);
        if (offset + size > SIZE) {
            slab = alloc(SIZE);
            offset = 0;
        }
        var buf = slice.call(slab, offset, offset += size);
        if (offset & 7) // align to 32 bit
            offset = (offset | 7) + 1;
        return buf;
    };
}


/***/ }),

/***/ "./node_modules/@protobufjs/utf8/index.js":
/*!************************************************!*\
  !*** ./node_modules/@protobufjs/utf8/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


/**
 * A minimal UTF8 implementation for number arrays.
 * @memberof util
 * @namespace
 */
var utf8 = exports;

/**
 * Calculates the UTF8 byte length of a string.
 * @param {string} string String
 * @returns {number} Byte length
 */
utf8.length = function utf8_length(string) {
    var len = 0,
        c = 0;
    for (var i = 0; i < string.length; ++i) {
        c = string.charCodeAt(i);
        if (c < 128)
            len += 1;
        else if (c < 2048)
            len += 2;
        else if ((c & 0xFC00) === 0xD800 && (string.charCodeAt(i + 1) & 0xFC00) === 0xDC00) {
            ++i;
            len += 4;
        } else
            len += 3;
    }
    return len;
};

/**
 * Reads UTF8 bytes as a string.
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} String read
 */
utf8.read = function utf8_read(buffer, start, end) {
    var len = end - start;
    if (len < 1)
        return "";
    var parts = null,
        chunk = [],
        i = 0, // char offset
        t;     // temporary
    while (start < end) {
        t = buffer[start++];
        if (t < 128)
            chunk[i++] = t;
        else if (t > 191 && t < 224)
            chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
        else if (t > 239 && t < 365) {
            t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 0x10000;
            chunk[i++] = 0xD800 + (t >> 10);
            chunk[i++] = 0xDC00 + (t & 1023);
        } else
            chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
        if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
        }
    }
    if (parts) {
        if (i)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i));
};

/**
 * Writes a string as UTF8 bytes.
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Bytes written
 */
utf8.write = function utf8_write(string, buffer, offset) {
    var start = offset,
        c1, // character 1
        c2; // character 2
    for (var i = 0; i < string.length; ++i) {
        c1 = string.charCodeAt(i);
        if (c1 < 128) {
            buffer[offset++] = c1;
        } else if (c1 < 2048) {
            buffer[offset++] = c1 >> 6       | 192;
            buffer[offset++] = c1       & 63 | 128;
        } else if ((c1 & 0xFC00) === 0xD800 && ((c2 = string.charCodeAt(i + 1)) & 0xFC00) === 0xDC00) {
            c1 = 0x10000 + ((c1 & 0x03FF) << 10) + (c2 & 0x03FF);
            ++i;
            buffer[offset++] = c1 >> 18      | 240;
            buffer[offset++] = c1 >> 12 & 63 | 128;
            buffer[offset++] = c1 >> 6  & 63 | 128;
            buffer[offset++] = c1       & 63 | 128;
        } else {
            buffer[offset++] = c1 >> 12      | 224;
            buffer[offset++] = c1 >> 6  & 63 | 128;
            buffer[offset++] = c1       & 63 | 128;
        }
    }
    return offset - start;
};


/***/ }),

/***/ "./node_modules/long/src/long.js":
/*!***************************************!*\
  !*** ./node_modules/long/src/long.js ***!
  \***************************************/
/***/ ((module) => {

module.exports = Long;

/**
 * wasm optimizations, to do native i64 multiplication and divide
 */
var wasm = null;

try {
  wasm = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
    0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11
  ])), {}).exports;
} catch (e) {
  // no wasm support :(
}

/**
 * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
 *  See the from* functions below for more convenient ways of constructing Longs.
 * @exports Long
 * @class A Long class for representing a 64 bit two's-complement integer value.
 * @param {number} low The low (signed) 32 bits of the long
 * @param {number} high The high (signed) 32 bits of the long
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @constructor
 */
function Long(low, high, unsigned) {

    /**
     * The low 32 bits as a signed value.
     * @type {number}
     */
    this.low = low | 0;

    /**
     * The high 32 bits as a signed value.
     * @type {number}
     */
    this.high = high | 0;

    /**
     * Whether unsigned or not.
     * @type {boolean}
     */
    this.unsigned = !!unsigned;
}

// The internal representation of a long is the two given signed, 32-bit values.
// We use 32-bit pieces because these are the size of integers on which
// Javascript performs bit-operations.  For operations like addition and
// multiplication, we split each number into 16 bit pieces, which can easily be
// multiplied within Javascript's floating-point representation without overflow
// or change in sign.
//
// In the algorithms below, we frequently reduce the negative case to the
// positive case by negating the input(s) and then post-processing the result.
// Note that we must ALWAYS check specially whether those values are MIN_VALUE
// (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
// a positive number, it overflows back into a negative).  Not handling this
// case would often result in infinite recursion.
//
// Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the from*
// methods on which they depend.

/**
 * An indicator used to reliably determine if an object is a Long or not.
 * @type {boolean}
 * @const
 * @private
 */
Long.prototype.__isLong__;

Object.defineProperty(Long.prototype, "__isLong__", { value: true });

/**
 * @function
 * @param {*} obj Object
 * @returns {boolean}
 * @inner
 */
function isLong(obj) {
    return (obj && obj["__isLong__"]) === true;
}

/**
 * Tests if the specified object is a Long.
 * @function
 * @param {*} obj Object
 * @returns {boolean}
 */
Long.isLong = isLong;

/**
 * A cache of the Long representations of small integer values.
 * @type {!Object}
 * @inner
 */
var INT_CACHE = {};

/**
 * A cache of the Long representations of small unsigned integer values.
 * @type {!Object}
 * @inner
 */
var UINT_CACHE = {};

/**
 * @param {number} value
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromInt(value, unsigned) {
    var obj, cachedObj, cache;
    if (unsigned) {
        value >>>= 0;
        if (cache = (0 <= value && value < 256)) {
            cachedObj = UINT_CACHE[value];
            if (cachedObj)
                return cachedObj;
        }
        obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
        if (cache)
            UINT_CACHE[value] = obj;
        return obj;
    } else {
        value |= 0;
        if (cache = (-128 <= value && value < 128)) {
            cachedObj = INT_CACHE[value];
            if (cachedObj)
                return cachedObj;
        }
        obj = fromBits(value, value < 0 ? -1 : 0, false);
        if (cache)
            INT_CACHE[value] = obj;
        return obj;
    }
}

/**
 * Returns a Long representing the given 32 bit integer value.
 * @function
 * @param {number} value The 32 bit integer in question
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long} The corresponding Long value
 */
Long.fromInt = fromInt;

/**
 * @param {number} value
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromNumber(value, unsigned) {
    if (isNaN(value))
        return unsigned ? UZERO : ZERO;
    if (unsigned) {
        if (value < 0)
            return UZERO;
        if (value >= TWO_PWR_64_DBL)
            return MAX_UNSIGNED_VALUE;
    } else {
        if (value <= -TWO_PWR_63_DBL)
            return MIN_VALUE;
        if (value + 1 >= TWO_PWR_63_DBL)
            return MAX_VALUE;
    }
    if (value < 0)
        return fromNumber(-value, unsigned).neg();
    return fromBits((value % TWO_PWR_32_DBL) | 0, (value / TWO_PWR_32_DBL) | 0, unsigned);
}

/**
 * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
 * @function
 * @param {number} value The number in question
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long} The corresponding Long value
 */
Long.fromNumber = fromNumber;

/**
 * @param {number} lowBits
 * @param {number} highBits
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromBits(lowBits, highBits, unsigned) {
    return new Long(lowBits, highBits, unsigned);
}

/**
 * Returns a Long representing the 64 bit integer that comes by concatenating the given low and high bits. Each is
 *  assumed to use 32 bits.
 * @function
 * @param {number} lowBits The low 32 bits
 * @param {number} highBits The high 32 bits
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long} The corresponding Long value
 */
Long.fromBits = fromBits;

/**
 * @function
 * @param {number} base
 * @param {number} exponent
 * @returns {number}
 * @inner
 */
var pow_dbl = Math.pow; // Used 4 times (4*8 to 15+4)

/**
 * @param {string} str
 * @param {(boolean|number)=} unsigned
 * @param {number=} radix
 * @returns {!Long}
 * @inner
 */
function fromString(str, unsigned, radix) {
    if (str.length === 0)
        throw Error('empty string');
    if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
        return ZERO;
    if (typeof unsigned === 'number') {
        // For goog.math.long compatibility
        radix = unsigned,
        unsigned = false;
    } else {
        unsigned = !! unsigned;
    }
    radix = radix || 10;
    if (radix < 2 || 36 < radix)
        throw RangeError('radix');

    var p;
    if ((p = str.indexOf('-')) > 0)
        throw Error('interior hyphen');
    else if (p === 0) {
        return fromString(str.substring(1), unsigned, radix).neg();
    }

    // Do several (8) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = fromNumber(pow_dbl(radix, 8));

    var result = ZERO;
    for (var i = 0; i < str.length; i += 8) {
        var size = Math.min(8, str.length - i),
            value = parseInt(str.substring(i, i + size), radix);
        if (size < 8) {
            var power = fromNumber(pow_dbl(radix, size));
            result = result.mul(power).add(fromNumber(value));
        } else {
            result = result.mul(radixToPower);
            result = result.add(fromNumber(value));
        }
    }
    result.unsigned = unsigned;
    return result;
}

/**
 * Returns a Long representation of the given string, written using the specified radix.
 * @function
 * @param {string} str The textual representation of the Long
 * @param {(boolean|number)=} unsigned Whether unsigned or not, defaults to signed
 * @param {number=} radix The radix in which the text is written (2-36), defaults to 10
 * @returns {!Long} The corresponding Long value
 */
Long.fromString = fromString;

/**
 * @function
 * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromValue(val, unsigned) {
    if (typeof val === 'number')
        return fromNumber(val, unsigned);
    if (typeof val === 'string')
        return fromString(val, unsigned);
    // Throws for non-objects, converts non-instanceof Long:
    return fromBits(val.low, val.high, typeof unsigned === 'boolean' ? unsigned : val.unsigned);
}

/**
 * Converts the specified value to a Long using the appropriate from* function for its type.
 * @function
 * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val Value
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long}
 */
Long.fromValue = fromValue;

// NOTE: the compiler should inline these constant values below and then remove these variables, so there should be
// no runtime penalty for these.

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_16_DBL = 1 << 16;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_24_DBL = 1 << 24;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;

/**
 * @type {!Long}
 * @const
 * @inner
 */
var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);

/**
 * @type {!Long}
 * @inner
 */
var ZERO = fromInt(0);

/**
 * Signed zero.
 * @type {!Long}
 */
Long.ZERO = ZERO;

/**
 * @type {!Long}
 * @inner
 */
var UZERO = fromInt(0, true);

/**
 * Unsigned zero.
 * @type {!Long}
 */
Long.UZERO = UZERO;

/**
 * @type {!Long}
 * @inner
 */
var ONE = fromInt(1);

/**
 * Signed one.
 * @type {!Long}
 */
Long.ONE = ONE;

/**
 * @type {!Long}
 * @inner
 */
var UONE = fromInt(1, true);

/**
 * Unsigned one.
 * @type {!Long}
 */
Long.UONE = UONE;

/**
 * @type {!Long}
 * @inner
 */
var NEG_ONE = fromInt(-1);

/**
 * Signed negative one.
 * @type {!Long}
 */
Long.NEG_ONE = NEG_ONE;

/**
 * @type {!Long}
 * @inner
 */
var MAX_VALUE = fromBits(0xFFFFFFFF|0, 0x7FFFFFFF|0, false);

/**
 * Maximum signed value.
 * @type {!Long}
 */
Long.MAX_VALUE = MAX_VALUE;

/**
 * @type {!Long}
 * @inner
 */
var MAX_UNSIGNED_VALUE = fromBits(0xFFFFFFFF|0, 0xFFFFFFFF|0, true);

/**
 * Maximum unsigned value.
 * @type {!Long}
 */
Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;

/**
 * @type {!Long}
 * @inner
 */
var MIN_VALUE = fromBits(0, 0x80000000|0, false);

/**
 * Minimum signed value.
 * @type {!Long}
 */
Long.MIN_VALUE = MIN_VALUE;

/**
 * @alias Long.prototype
 * @inner
 */
var LongPrototype = Long.prototype;

/**
 * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
 * @returns {number}
 */
LongPrototype.toInt = function toInt() {
    return this.unsigned ? this.low >>> 0 : this.low;
};

/**
 * Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa).
 * @returns {number}
 */
LongPrototype.toNumber = function toNumber() {
    if (this.unsigned)
        return ((this.high >>> 0) * TWO_PWR_32_DBL) + (this.low >>> 0);
    return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
};

/**
 * Converts the Long to a string written in the specified radix.
 * @param {number=} radix Radix (2-36), defaults to 10
 * @returns {string}
 * @override
 * @throws {RangeError} If `radix` is out of range
 */
LongPrototype.toString = function toString(radix) {
    radix = radix || 10;
    if (radix < 2 || 36 < radix)
        throw RangeError('radix');
    if (this.isZero())
        return '0';
    if (this.isNegative()) { // Unsigned Longs are never negative
        if (this.eq(MIN_VALUE)) {
            // We need to change the Long value before it can be negated, so we remove
            // the bottom-most digit in this base and then recurse to do the rest.
            var radixLong = fromNumber(radix),
                div = this.div(radixLong),
                rem1 = div.mul(radixLong).sub(this);
            return div.toString(radix) + rem1.toInt().toString(radix);
        } else
            return '-' + this.neg().toString(radix);
    }

    // Do several (6) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned),
        rem = this;
    var result = '';
    while (true) {
        var remDiv = rem.div(radixToPower),
            intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0,
            digits = intval.toString(radix);
        rem = remDiv;
        if (rem.isZero())
            return digits + result;
        else {
            while (digits.length < 6)
                digits = '0' + digits;
            result = '' + digits + result;
        }
    }
};

/**
 * Gets the high 32 bits as a signed integer.
 * @returns {number} Signed high bits
 */
LongPrototype.getHighBits = function getHighBits() {
    return this.high;
};

/**
 * Gets the high 32 bits as an unsigned integer.
 * @returns {number} Unsigned high bits
 */
LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
    return this.high >>> 0;
};

/**
 * Gets the low 32 bits as a signed integer.
 * @returns {number} Signed low bits
 */
LongPrototype.getLowBits = function getLowBits() {
    return this.low;
};

/**
 * Gets the low 32 bits as an unsigned integer.
 * @returns {number} Unsigned low bits
 */
LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
    return this.low >>> 0;
};

/**
 * Gets the number of bits needed to represent the absolute value of this Long.
 * @returns {number}
 */
LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
    if (this.isNegative()) // Unsigned Longs are never negative
        return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
    var val = this.high != 0 ? this.high : this.low;
    for (var bit = 31; bit > 0; bit--)
        if ((val & (1 << bit)) != 0)
            break;
    return this.high != 0 ? bit + 33 : bit + 1;
};

/**
 * Tests if this Long's value equals zero.
 * @returns {boolean}
 */
LongPrototype.isZero = function isZero() {
    return this.high === 0 && this.low === 0;
};

/**
 * Tests if this Long's value equals zero. This is an alias of {@link Long#isZero}.
 * @returns {boolean}
 */
LongPrototype.eqz = LongPrototype.isZero;

/**
 * Tests if this Long's value is negative.
 * @returns {boolean}
 */
LongPrototype.isNegative = function isNegative() {
    return !this.unsigned && this.high < 0;
};

/**
 * Tests if this Long's value is positive.
 * @returns {boolean}
 */
LongPrototype.isPositive = function isPositive() {
    return this.unsigned || this.high >= 0;
};

/**
 * Tests if this Long's value is odd.
 * @returns {boolean}
 */
LongPrototype.isOdd = function isOdd() {
    return (this.low & 1) === 1;
};

/**
 * Tests if this Long's value is even.
 * @returns {boolean}
 */
LongPrototype.isEven = function isEven() {
    return (this.low & 1) === 0;
};

/**
 * Tests if this Long's value equals the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.equals = function equals(other) {
    if (!isLong(other))
        other = fromValue(other);
    if (this.unsigned !== other.unsigned && (this.high >>> 31) === 1 && (other.high >>> 31) === 1)
        return false;
    return this.high === other.high && this.low === other.low;
};

/**
 * Tests if this Long's value equals the specified's. This is an alias of {@link Long#equals}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.eq = LongPrototype.equals;

/**
 * Tests if this Long's value differs from the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.notEquals = function notEquals(other) {
    return !this.eq(/* validates */ other);
};

/**
 * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.neq = LongPrototype.notEquals;

/**
 * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.ne = LongPrototype.notEquals;

/**
 * Tests if this Long's value is less than the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lessThan = function lessThan(other) {
    return this.comp(/* validates */ other) < 0;
};

/**
 * Tests if this Long's value is less than the specified's. This is an alias of {@link Long#lessThan}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lt = LongPrototype.lessThan;

/**
 * Tests if this Long's value is less than or equal the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
    return this.comp(/* validates */ other) <= 0;
};

/**
 * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lte = LongPrototype.lessThanOrEqual;

/**
 * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.le = LongPrototype.lessThanOrEqual;

/**
 * Tests if this Long's value is greater than the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.greaterThan = function greaterThan(other) {
    return this.comp(/* validates */ other) > 0;
};

/**
 * Tests if this Long's value is greater than the specified's. This is an alias of {@link Long#greaterThan}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.gt = LongPrototype.greaterThan;

/**
 * Tests if this Long's value is greater than or equal the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
    return this.comp(/* validates */ other) >= 0;
};

/**
 * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.gte = LongPrototype.greaterThanOrEqual;

/**
 * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.ge = LongPrototype.greaterThanOrEqual;

/**
 * Compares this Long's value with the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {number} 0 if they are the same, 1 if the this is greater and -1
 *  if the given one is greater
 */
LongPrototype.compare = function compare(other) {
    if (!isLong(other))
        other = fromValue(other);
    if (this.eq(other))
        return 0;
    var thisNeg = this.isNegative(),
        otherNeg = other.isNegative();
    if (thisNeg && !otherNeg)
        return -1;
    if (!thisNeg && otherNeg)
        return 1;
    // At this point the sign bits are the same
    if (!this.unsigned)
        return this.sub(other).isNegative() ? -1 : 1;
    // Both are positive if at least one is unsigned
    return (other.high >>> 0) > (this.high >>> 0) || (other.high === this.high && (other.low >>> 0) > (this.low >>> 0)) ? -1 : 1;
};

/**
 * Compares this Long's value with the specified's. This is an alias of {@link Long#compare}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {number} 0 if they are the same, 1 if the this is greater and -1
 *  if the given one is greater
 */
LongPrototype.comp = LongPrototype.compare;

/**
 * Negates this Long's value.
 * @returns {!Long} Negated Long
 */
LongPrototype.negate = function negate() {
    if (!this.unsigned && this.eq(MIN_VALUE))
        return MIN_VALUE;
    return this.not().add(ONE);
};

/**
 * Negates this Long's value. This is an alias of {@link Long#negate}.
 * @function
 * @returns {!Long} Negated Long
 */
LongPrototype.neg = LongPrototype.negate;

/**
 * Returns the sum of this and the specified Long.
 * @param {!Long|number|string} addend Addend
 * @returns {!Long} Sum
 */
LongPrototype.add = function add(addend) {
    if (!isLong(addend))
        addend = fromValue(addend);

    // Divide each number into 4 chunks of 16 bits, and then sum the chunks.

    var a48 = this.high >>> 16;
    var a32 = this.high & 0xFFFF;
    var a16 = this.low >>> 16;
    var a00 = this.low & 0xFFFF;

    var b48 = addend.high >>> 16;
    var b32 = addend.high & 0xFFFF;
    var b16 = addend.low >>> 16;
    var b00 = addend.low & 0xFFFF;

    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 + b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 + b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 + b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 + b48;
    c48 &= 0xFFFF;
    return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
};

/**
 * Returns the difference of this and the specified Long.
 * @param {!Long|number|string} subtrahend Subtrahend
 * @returns {!Long} Difference
 */
LongPrototype.subtract = function subtract(subtrahend) {
    if (!isLong(subtrahend))
        subtrahend = fromValue(subtrahend);
    return this.add(subtrahend.neg());
};

/**
 * Returns the difference of this and the specified Long. This is an alias of {@link Long#subtract}.
 * @function
 * @param {!Long|number|string} subtrahend Subtrahend
 * @returns {!Long} Difference
 */
LongPrototype.sub = LongPrototype.subtract;

/**
 * Returns the product of this and the specified Long.
 * @param {!Long|number|string} multiplier Multiplier
 * @returns {!Long} Product
 */
LongPrototype.multiply = function multiply(multiplier) {
    if (this.isZero())
        return ZERO;
    if (!isLong(multiplier))
        multiplier = fromValue(multiplier);

    // use wasm support if present
    if (wasm) {
        var low = wasm.mul(this.low,
                           this.high,
                           multiplier.low,
                           multiplier.high);
        return fromBits(low, wasm.get_high(), this.unsigned);
    }

    if (multiplier.isZero())
        return ZERO;
    if (this.eq(MIN_VALUE))
        return multiplier.isOdd() ? MIN_VALUE : ZERO;
    if (multiplier.eq(MIN_VALUE))
        return this.isOdd() ? MIN_VALUE : ZERO;

    if (this.isNegative()) {
        if (multiplier.isNegative())
            return this.neg().mul(multiplier.neg());
        else
            return this.neg().mul(multiplier).neg();
    } else if (multiplier.isNegative())
        return this.mul(multiplier.neg()).neg();

    // If both longs are small, use float multiplication
    if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
        return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);

    // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
    // We can skip products that would overflow.

    var a48 = this.high >>> 16;
    var a32 = this.high & 0xFFFF;
    var a16 = this.low >>> 16;
    var a00 = this.low & 0xFFFF;

    var b48 = multiplier.high >>> 16;
    var b32 = multiplier.high & 0xFFFF;
    var b16 = multiplier.low >>> 16;
    var b00 = multiplier.low & 0xFFFF;

    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 * b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 * b00;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c16 += a00 * b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 * b00;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a16 * b16;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a00 * b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
    c48 &= 0xFFFF;
    return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
};

/**
 * Returns the product of this and the specified Long. This is an alias of {@link Long#multiply}.
 * @function
 * @param {!Long|number|string} multiplier Multiplier
 * @returns {!Long} Product
 */
LongPrototype.mul = LongPrototype.multiply;

/**
 * Returns this Long divided by the specified. The result is signed if this Long is signed or
 *  unsigned if this Long is unsigned.
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Quotient
 */
LongPrototype.divide = function divide(divisor) {
    if (!isLong(divisor))
        divisor = fromValue(divisor);
    if (divisor.isZero())
        throw Error('division by zero');

    // use wasm support if present
    if (wasm) {
        // guard against signed division overflow: the largest
        // negative number / -1 would be 1 larger than the largest
        // positive number, due to two's complement.
        if (!this.unsigned &&
            this.high === -0x80000000 &&
            divisor.low === -1 && divisor.high === -1) {
            // be consistent with non-wasm code path
            return this;
        }
        var low = (this.unsigned ? wasm.div_u : wasm.div_s)(
            this.low,
            this.high,
            divisor.low,
            divisor.high
        );
        return fromBits(low, wasm.get_high(), this.unsigned);
    }

    if (this.isZero())
        return this.unsigned ? UZERO : ZERO;
    var approx, rem, res;
    if (!this.unsigned) {
        // This section is only relevant for signed longs and is derived from the
        // closure library as a whole.
        if (this.eq(MIN_VALUE)) {
            if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
                return MIN_VALUE;  // recall that -MIN_VALUE == MIN_VALUE
            else if (divisor.eq(MIN_VALUE))
                return ONE;
            else {
                // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
                var halfThis = this.shr(1);
                approx = halfThis.div(divisor).shl(1);
                if (approx.eq(ZERO)) {
                    return divisor.isNegative() ? ONE : NEG_ONE;
                } else {
                    rem = this.sub(divisor.mul(approx));
                    res = approx.add(rem.div(divisor));
                    return res;
                }
            }
        } else if (divisor.eq(MIN_VALUE))
            return this.unsigned ? UZERO : ZERO;
        if (this.isNegative()) {
            if (divisor.isNegative())
                return this.neg().div(divisor.neg());
            return this.neg().div(divisor).neg();
        } else if (divisor.isNegative())
            return this.div(divisor.neg()).neg();
        res = ZERO;
    } else {
        // The algorithm below has not been made for unsigned longs. It's therefore
        // required to take special care of the MSB prior to running it.
        if (!divisor.unsigned)
            divisor = divisor.toUnsigned();
        if (divisor.gt(this))
            return UZERO;
        if (divisor.gt(this.shru(1))) // 15 >>> 1 = 7 ; with divisor = 8 ; true
            return UONE;
        res = UZERO;
    }

    // Repeat the following until the remainder is less than other:  find a
    // floating-point that approximates remainder / other *from below*, add this
    // into the result, and subtract it from the remainder.  It is critical that
    // the approximate value is less than or equal to the real value so that the
    // remainder never becomes negative.
    rem = this;
    while (rem.gte(divisor)) {
        // Approximate the result of division. This may be a little greater or
        // smaller than the actual value.
        approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));

        // We will tweak the approximate result by changing it in the 48-th digit or
        // the smallest non-fractional digit, whichever is larger.
        var log2 = Math.ceil(Math.log(approx) / Math.LN2),
            delta = (log2 <= 48) ? 1 : pow_dbl(2, log2 - 48),

        // Decrease the approximation until it is smaller than the remainder.  Note
        // that if it is too large, the product overflows and is negative.
            approxRes = fromNumber(approx),
            approxRem = approxRes.mul(divisor);
        while (approxRem.isNegative() || approxRem.gt(rem)) {
            approx -= delta;
            approxRes = fromNumber(approx, this.unsigned);
            approxRem = approxRes.mul(divisor);
        }

        // We know the answer can't be zero... and actually, zero would cause
        // infinite recursion since we would make no progress.
        if (approxRes.isZero())
            approxRes = ONE;

        res = res.add(approxRes);
        rem = rem.sub(approxRem);
    }
    return res;
};

/**
 * Returns this Long divided by the specified. This is an alias of {@link Long#divide}.
 * @function
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Quotient
 */
LongPrototype.div = LongPrototype.divide;

/**
 * Returns this Long modulo the specified.
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Remainder
 */
LongPrototype.modulo = function modulo(divisor) {
    if (!isLong(divisor))
        divisor = fromValue(divisor);

    // use wasm support if present
    if (wasm) {
        var low = (this.unsigned ? wasm.rem_u : wasm.rem_s)(
            this.low,
            this.high,
            divisor.low,
            divisor.high
        );
        return fromBits(low, wasm.get_high(), this.unsigned);
    }

    return this.sub(this.div(divisor).mul(divisor));
};

/**
 * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
 * @function
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Remainder
 */
LongPrototype.mod = LongPrototype.modulo;

/**
 * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
 * @function
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Remainder
 */
LongPrototype.rem = LongPrototype.modulo;

/**
 * Returns the bitwise NOT of this Long.
 * @returns {!Long}
 */
LongPrototype.not = function not() {
    return fromBits(~this.low, ~this.high, this.unsigned);
};

/**
 * Returns the bitwise AND of this Long and the specified.
 * @param {!Long|number|string} other Other Long
 * @returns {!Long}
 */
LongPrototype.and = function and(other) {
    if (!isLong(other))
        other = fromValue(other);
    return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
};

/**
 * Returns the bitwise OR of this Long and the specified.
 * @param {!Long|number|string} other Other Long
 * @returns {!Long}
 */
LongPrototype.or = function or(other) {
    if (!isLong(other))
        other = fromValue(other);
    return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
};

/**
 * Returns the bitwise XOR of this Long and the given one.
 * @param {!Long|number|string} other Other Long
 * @returns {!Long}
 */
LongPrototype.xor = function xor(other) {
    if (!isLong(other))
        other = fromValue(other);
    return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
};

/**
 * Returns this Long with bits shifted to the left by the given amount.
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shiftLeft = function shiftLeft(numBits) {
    if (isLong(numBits))
        numBits = numBits.toInt();
    if ((numBits &= 63) === 0)
        return this;
    else if (numBits < 32)
        return fromBits(this.low << numBits, (this.high << numBits) | (this.low >>> (32 - numBits)), this.unsigned);
    else
        return fromBits(0, this.low << (numBits - 32), this.unsigned);
};

/**
 * Returns this Long with bits shifted to the left by the given amount. This is an alias of {@link Long#shiftLeft}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shl = LongPrototype.shiftLeft;

/**
 * Returns this Long with bits arithmetically shifted to the right by the given amount.
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shiftRight = function shiftRight(numBits) {
    if (isLong(numBits))
        numBits = numBits.toInt();
    if ((numBits &= 63) === 0)
        return this;
    else if (numBits < 32)
        return fromBits((this.low >>> numBits) | (this.high << (32 - numBits)), this.high >> numBits, this.unsigned);
    else
        return fromBits(this.high >> (numBits - 32), this.high >= 0 ? 0 : -1, this.unsigned);
};

/**
 * Returns this Long with bits arithmetically shifted to the right by the given amount. This is an alias of {@link Long#shiftRight}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shr = LongPrototype.shiftRight;

/**
 * Returns this Long with bits logically shifted to the right by the given amount.
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
    if (isLong(numBits))
        numBits = numBits.toInt();
    numBits &= 63;
    if (numBits === 0)
        return this;
    else {
        var high = this.high;
        if (numBits < 32) {
            var low = this.low;
            return fromBits((low >>> numBits) | (high << (32 - numBits)), high >>> numBits, this.unsigned);
        } else if (numBits === 32)
            return fromBits(high, 0, this.unsigned);
        else
            return fromBits(high >>> (numBits - 32), 0, this.unsigned);
    }
};

/**
 * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shru = LongPrototype.shiftRightUnsigned;

/**
 * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shr_u = LongPrototype.shiftRightUnsigned;

/**
 * Converts this Long to signed.
 * @returns {!Long} Signed long
 */
LongPrototype.toSigned = function toSigned() {
    if (!this.unsigned)
        return this;
    return fromBits(this.low, this.high, false);
};

/**
 * Converts this Long to unsigned.
 * @returns {!Long} Unsigned long
 */
LongPrototype.toUnsigned = function toUnsigned() {
    if (this.unsigned)
        return this;
    return fromBits(this.low, this.high, true);
};

/**
 * Converts this Long to its byte representation.
 * @param {boolean=} le Whether little or big endian, defaults to big endian
 * @returns {!Array.<number>} Byte representation
 */
LongPrototype.toBytes = function toBytes(le) {
    return le ? this.toBytesLE() : this.toBytesBE();
};

/**
 * Converts this Long to its little endian byte representation.
 * @returns {!Array.<number>} Little endian byte representation
 */
LongPrototype.toBytesLE = function toBytesLE() {
    var hi = this.high,
        lo = this.low;
    return [
        lo        & 0xff,
        lo >>>  8 & 0xff,
        lo >>> 16 & 0xff,
        lo >>> 24       ,
        hi        & 0xff,
        hi >>>  8 & 0xff,
        hi >>> 16 & 0xff,
        hi >>> 24
    ];
};

/**
 * Converts this Long to its big endian byte representation.
 * @returns {!Array.<number>} Big endian byte representation
 */
LongPrototype.toBytesBE = function toBytesBE() {
    var hi = this.high,
        lo = this.low;
    return [
        hi >>> 24       ,
        hi >>> 16 & 0xff,
        hi >>>  8 & 0xff,
        hi        & 0xff,
        lo >>> 24       ,
        lo >>> 16 & 0xff,
        lo >>>  8 & 0xff,
        lo        & 0xff
    ];
};

/**
 * Creates a Long from its byte representation.
 * @param {!Array.<number>} bytes Byte representation
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @param {boolean=} le Whether little or big endian, defaults to big endian
 * @returns {Long} The corresponding Long value
 */
Long.fromBytes = function fromBytes(bytes, unsigned, le) {
    return le ? Long.fromBytesLE(bytes, unsigned) : Long.fromBytesBE(bytes, unsigned);
};

/**
 * Creates a Long from its little endian byte representation.
 * @param {!Array.<number>} bytes Little endian byte representation
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {Long} The corresponding Long value
 */
Long.fromBytesLE = function fromBytesLE(bytes, unsigned) {
    return new Long(
        bytes[0]       |
        bytes[1] <<  8 |
        bytes[2] << 16 |
        bytes[3] << 24,
        bytes[4]       |
        bytes[5] <<  8 |
        bytes[6] << 16 |
        bytes[7] << 24,
        unsigned
    );
};

/**
 * Creates a Long from its big endian byte representation.
 * @param {!Array.<number>} bytes Big endian byte representation
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {Long} The corresponding Long value
 */
Long.fromBytesBE = function fromBytesBE(bytes, unsigned) {
    return new Long(
        bytes[4] << 24 |
        bytes[5] << 16 |
        bytes[6] <<  8 |
        bytes[7],
        bytes[0] << 24 |
        bytes[1] << 16 |
        bytes[2] <<  8 |
        bytes[3],
        unsigned
    );
};


/***/ }),

/***/ "./node_modules/protobufjs/minimal.js":
/*!********************************************!*\
  !*** ./node_modules/protobufjs/minimal.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// minimal library entry point.


module.exports = __webpack_require__(/*! ./src/index-minimal */ "./node_modules/protobufjs/src/index-minimal.js");


/***/ }),

/***/ "./node_modules/protobufjs/src/index-minimal.js":
/*!******************************************************!*\
  !*** ./node_modules/protobufjs/src/index-minimal.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var protobuf = exports;

/**
 * Build type, one of `"full"`, `"light"` or `"minimal"`.
 * @name build
 * @type {string}
 * @const
 */
protobuf.build = "minimal";

// Serialization
protobuf.Writer       = __webpack_require__(/*! ./writer */ "./node_modules/protobufjs/src/writer.js");
protobuf.BufferWriter = __webpack_require__(/*! ./writer_buffer */ "./node_modules/protobufjs/src/writer_buffer.js");
protobuf.Reader       = __webpack_require__(/*! ./reader */ "./node_modules/protobufjs/src/reader.js");
protobuf.BufferReader = __webpack_require__(/*! ./reader_buffer */ "./node_modules/protobufjs/src/reader_buffer.js");

// Utility
protobuf.util         = __webpack_require__(/*! ./util/minimal */ "./node_modules/protobufjs/src/util/minimal.js");
protobuf.rpc          = __webpack_require__(/*! ./rpc */ "./node_modules/protobufjs/src/rpc.js");
protobuf.roots        = __webpack_require__(/*! ./roots */ "./node_modules/protobufjs/src/roots.js");
protobuf.configure    = configure;

/* istanbul ignore next */
/**
 * Reconfigures the library according to the environment.
 * @returns {undefined}
 */
function configure() {
    protobuf.util._configure();
    protobuf.Writer._configure(protobuf.BufferWriter);
    protobuf.Reader._configure(protobuf.BufferReader);
}

// Set up buffer utility according to the environment
configure();


/***/ }),

/***/ "./node_modules/protobufjs/src/reader.js":
/*!***********************************************!*\
  !*** ./node_modules/protobufjs/src/reader.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

module.exports = Reader;

var util      = __webpack_require__(/*! ./util/minimal */ "./node_modules/protobufjs/src/util/minimal.js");

var BufferReader; // cyclic

var LongBits  = util.LongBits,
    utf8      = util.utf8;

/* istanbul ignore next */
function indexOutOfRange(reader, writeLength) {
    return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
}

/**
 * Constructs a new reader instance using the specified buffer.
 * @classdesc Wire format reader using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 * @param {Uint8Array} buffer Buffer to read from
 */
function Reader(buffer) {

    /**
     * Read buffer.
     * @type {Uint8Array}
     */
    this.buf = buffer;

    /**
     * Read buffer position.
     * @type {number}
     */
    this.pos = 0;

    /**
     * Read buffer length.
     * @type {number}
     */
    this.len = buffer.length;
}

var create_array = typeof Uint8Array !== "undefined"
    ? function create_typed_array(buffer) {
        if (buffer instanceof Uint8Array || Array.isArray(buffer))
            return new Reader(buffer);
        throw Error("illegal buffer");
    }
    /* istanbul ignore next */
    : function create_array(buffer) {
        if (Array.isArray(buffer))
            return new Reader(buffer);
        throw Error("illegal buffer");
    };

var create = function create() {
    return util.Buffer
        ? function create_buffer_setup(buffer) {
            return (Reader.create = function create_buffer(buffer) {
                return util.Buffer.isBuffer(buffer)
                    ? new BufferReader(buffer)
                    /* istanbul ignore next */
                    : create_array(buffer);
            })(buffer);
        }
        /* istanbul ignore next */
        : create_array;
};

/**
 * Creates a new reader using the specified buffer.
 * @function
 * @param {Uint8Array|Buffer} buffer Buffer to read from
 * @returns {Reader|BufferReader} A {@link BufferReader} if `buffer` is a Buffer, otherwise a {@link Reader}
 * @throws {Error} If `buffer` is not a valid buffer
 */
Reader.create = create();

Reader.prototype._slice = util.Array.prototype.subarray || /* istanbul ignore next */ util.Array.prototype.slice;

/**
 * Reads a varint as an unsigned 32 bit value.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.uint32 = (function read_uint32_setup() {
    var value = 4294967295; // optimizer type-hint, tends to deopt otherwise (?!)
    return function read_uint32() {
        value = (         this.buf[this.pos] & 127       ) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) <<  7) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 14) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 21) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] &  15) << 28) >>> 0; if (this.buf[this.pos++] < 128) return value;

        /* istanbul ignore if */
        if ((this.pos += 5) > this.len) {
            this.pos = this.len;
            throw indexOutOfRange(this, 10);
        }
        return value;
    };
})();

/**
 * Reads a varint as a signed 32 bit value.
 * @returns {number} Value read
 */
Reader.prototype.int32 = function read_int32() {
    return this.uint32() | 0;
};

/**
 * Reads a zig-zag encoded varint as a signed 32 bit value.
 * @returns {number} Value read
 */
Reader.prototype.sint32 = function read_sint32() {
    var value = this.uint32();
    return value >>> 1 ^ -(value & 1) | 0;
};

/* eslint-disable no-invalid-this */

function readLongVarint() {
    // tends to deopt with local vars for octet etc.
    var bits = new LongBits(0, 0);
    var i = 0;
    if (this.len - this.pos > 4) { // fast route (lo)
        for (; i < 4; ++i) {
            // 1st..4th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
        // 5th
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) >>  4) >>> 0;
        if (this.buf[this.pos++] < 128)
            return bits;
        i = 0;
    } else {
        for (; i < 3; ++i) {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
            // 1st..3th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
        // 4th
        bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
        return bits;
    }
    if (this.len - this.pos > 4) { // fast route (hi)
        for (; i < 5; ++i) {
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
    } else {
        for (; i < 5; ++i) {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
    }
    /* istanbul ignore next */
    throw Error("invalid varint encoding");
}

/* eslint-enable no-invalid-this */

/**
 * Reads a varint as a signed 64 bit value.
 * @name Reader#int64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a varint as an unsigned 64 bit value.
 * @name Reader#uint64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a zig-zag encoded varint as a signed 64 bit value.
 * @name Reader#sint64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a varint as a boolean.
 * @returns {boolean} Value read
 */
Reader.prototype.bool = function read_bool() {
    return this.uint32() !== 0;
};

function readFixed32_end(buf, end) { // note that this uses `end`, not `pos`
    return (buf[end - 4]
          | buf[end - 3] << 8
          | buf[end - 2] << 16
          | buf[end - 1] << 24) >>> 0;
}

/**
 * Reads fixed 32 bits as an unsigned 32 bit integer.
 * @returns {number} Value read
 */
Reader.prototype.fixed32 = function read_fixed32() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    return readFixed32_end(this.buf, this.pos += 4);
};

/**
 * Reads fixed 32 bits as a signed 32 bit integer.
 * @returns {number} Value read
 */
Reader.prototype.sfixed32 = function read_sfixed32() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    return readFixed32_end(this.buf, this.pos += 4) | 0;
};

/* eslint-disable no-invalid-this */

function readFixed64(/* this: Reader */) {

    /* istanbul ignore if */
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);

    return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
}

/* eslint-enable no-invalid-this */

/**
 * Reads fixed 64 bits.
 * @name Reader#fixed64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads zig-zag encoded fixed 64 bits.
 * @name Reader#sfixed64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a float (32 bit) as a number.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.float = function read_float() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    var value = util.float.readFloatLE(this.buf, this.pos);
    this.pos += 4;
    return value;
};

/**
 * Reads a double (64 bit float) as a number.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.double = function read_double() {

    /* istanbul ignore if */
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 4);

    var value = util.float.readDoubleLE(this.buf, this.pos);
    this.pos += 8;
    return value;
};

/**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @returns {Uint8Array} Value read
 */
Reader.prototype.bytes = function read_bytes() {
    var length = this.uint32(),
        start  = this.pos,
        end    = this.pos + length;

    /* istanbul ignore if */
    if (end > this.len)
        throw indexOutOfRange(this, length);

    this.pos += length;
    if (Array.isArray(this.buf)) // plain array
        return this.buf.slice(start, end);
    return start === end // fix for IE 10/Win8 and others' subarray returning array of size 1
        ? new this.buf.constructor(0)
        : this._slice.call(this.buf, start, end);
};

/**
 * Reads a string preceeded by its byte length as a varint.
 * @returns {string} Value read
 */
Reader.prototype.string = function read_string() {
    var bytes = this.bytes();
    return utf8.read(bytes, 0, bytes.length);
};

/**
 * Skips the specified number of bytes if specified, otherwise skips a varint.
 * @param {number} [length] Length if known, otherwise a varint is assumed
 * @returns {Reader} `this`
 */
Reader.prototype.skip = function skip(length) {
    if (typeof length === "number") {
        /* istanbul ignore if */
        if (this.pos + length > this.len)
            throw indexOutOfRange(this, length);
        this.pos += length;
    } else {
        do {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
        } while (this.buf[this.pos++] & 128);
    }
    return this;
};

/**
 * Skips the next element of the specified wire type.
 * @param {number} wireType Wire type received
 * @returns {Reader} `this`
 */
Reader.prototype.skipType = function(wireType) {
    switch (wireType) {
        case 0:
            this.skip();
            break;
        case 1:
            this.skip(8);
            break;
        case 2:
            this.skip(this.uint32());
            break;
        case 3:
            while ((wireType = this.uint32() & 7) !== 4) {
                this.skipType(wireType);
            }
            break;
        case 5:
            this.skip(4);
            break;

        /* istanbul ignore next */
        default:
            throw Error("invalid wire type " + wireType + " at offset " + this.pos);
    }
    return this;
};

Reader._configure = function(BufferReader_) {
    BufferReader = BufferReader_;
    Reader.create = create();
    BufferReader._configure();

    var fn = util.Long ? "toLong" : /* istanbul ignore next */ "toNumber";
    util.merge(Reader.prototype, {

        int64: function read_int64() {
            return readLongVarint.call(this)[fn](false);
        },

        uint64: function read_uint64() {
            return readLongVarint.call(this)[fn](true);
        },

        sint64: function read_sint64() {
            return readLongVarint.call(this).zzDecode()[fn](false);
        },

        fixed64: function read_fixed64() {
            return readFixed64.call(this)[fn](true);
        },

        sfixed64: function read_sfixed64() {
            return readFixed64.call(this)[fn](false);
        }

    });
};


/***/ }),

/***/ "./node_modules/protobufjs/src/reader_buffer.js":
/*!******************************************************!*\
  !*** ./node_modules/protobufjs/src/reader_buffer.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

module.exports = BufferReader;

// extends Reader
var Reader = __webpack_require__(/*! ./reader */ "./node_modules/protobufjs/src/reader.js");
(BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;

var util = __webpack_require__(/*! ./util/minimal */ "./node_modules/protobufjs/src/util/minimal.js");

/**
 * Constructs a new buffer reader instance.
 * @classdesc Wire format reader using node buffers.
 * @extends Reader
 * @constructor
 * @param {Buffer} buffer Buffer to read from
 */
function BufferReader(buffer) {
    Reader.call(this, buffer);

    /**
     * Read buffer.
     * @name BufferReader#buf
     * @type {Buffer}
     */
}

BufferReader._configure = function () {
    /* istanbul ignore else */
    if (util.Buffer)
        BufferReader.prototype._slice = util.Buffer.prototype.slice;
};


/**
 * @override
 */
BufferReader.prototype.string = function read_string_buffer() {
    var len = this.uint32(); // modifies pos
    return this.buf.utf8Slice
        ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len))
        : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
};

/**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @name BufferReader#bytes
 * @function
 * @returns {Buffer} Value read
 */

BufferReader._configure();


/***/ }),

/***/ "./node_modules/protobufjs/src/roots.js":
/*!**********************************************!*\
  !*** ./node_modules/protobufjs/src/roots.js ***!
  \**********************************************/
/***/ ((module) => {

"use strict";

module.exports = {};

/**
 * Named roots.
 * This is where pbjs stores generated structures (the option `-r, --root` specifies a name).
 * Can also be used manually to make roots available accross modules.
 * @name roots
 * @type {Object.<string,Root>}
 * @example
 * // pbjs -r myroot -o compiled.js ...
 *
 * // in another module:
 * require("./compiled.js");
 *
 * // in any subsequent module:
 * var root = protobuf.roots["myroot"];
 */


/***/ }),

/***/ "./node_modules/protobufjs/src/rpc.js":
/*!********************************************!*\
  !*** ./node_modules/protobufjs/src/rpc.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


/**
 * Streaming RPC helpers.
 * @namespace
 */
var rpc = exports;

/**
 * RPC implementation passed to {@link Service#create} performing a service request on network level, i.e. by utilizing http requests or websockets.
 * @typedef RPCImpl
 * @type {function}
 * @param {Method|rpc.ServiceMethod<Message<{}>,Message<{}>>} method Reflected or static method being called
 * @param {Uint8Array} requestData Request data
 * @param {RPCImplCallback} callback Callback function
 * @returns {undefined}
 * @example
 * function rpcImpl(method, requestData, callback) {
 *     if (protobuf.util.lcFirst(method.name) !== "myMethod") // compatible with static code
 *         throw Error("no such method");
 *     asynchronouslyObtainAResponse(requestData, function(err, responseData) {
 *         callback(err, responseData);
 *     });
 * }
 */

/**
 * Node-style callback as used by {@link RPCImpl}.
 * @typedef RPCImplCallback
 * @type {function}
 * @param {Error|null} error Error, if any, otherwise `null`
 * @param {Uint8Array|null} [response] Response data or `null` to signal end of stream, if there hasn't been an error
 * @returns {undefined}
 */

rpc.Service = __webpack_require__(/*! ./rpc/service */ "./node_modules/protobufjs/src/rpc/service.js");


/***/ }),

/***/ "./node_modules/protobufjs/src/rpc/service.js":
/*!****************************************************!*\
  !*** ./node_modules/protobufjs/src/rpc/service.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

module.exports = Service;

var util = __webpack_require__(/*! ../util/minimal */ "./node_modules/protobufjs/src/util/minimal.js");

// Extends EventEmitter
(Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;

/**
 * A service method callback as used by {@link rpc.ServiceMethod|ServiceMethod}.
 *
 * Differs from {@link RPCImplCallback} in that it is an actual callback of a service method which may not return `response = null`.
 * @typedef rpc.ServiceMethodCallback
 * @template TRes extends Message<TRes>
 * @type {function}
 * @param {Error|null} error Error, if any
 * @param {TRes} [response] Response message
 * @returns {undefined}
 */

/**
 * A service method part of a {@link rpc.Service} as created by {@link Service.create}.
 * @typedef rpc.ServiceMethod
 * @template TReq extends Message<TReq>
 * @template TRes extends Message<TRes>
 * @type {function}
 * @param {TReq|Properties<TReq>} request Request message or plain object
 * @param {rpc.ServiceMethodCallback<TRes>} [callback] Node-style callback called with the error, if any, and the response message
 * @returns {Promise<Message<TRes>>} Promise if `callback` has been omitted, otherwise `undefined`
 */

/**
 * Constructs a new RPC service instance.
 * @classdesc An RPC service as returned by {@link Service#create}.
 * @exports rpc.Service
 * @extends util.EventEmitter
 * @constructor
 * @param {RPCImpl} rpcImpl RPC implementation
 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
 */
function Service(rpcImpl, requestDelimited, responseDelimited) {

    if (typeof rpcImpl !== "function")
        throw TypeError("rpcImpl must be a function");

    util.EventEmitter.call(this);

    /**
     * RPC implementation. Becomes `null` once the service is ended.
     * @type {RPCImpl|null}
     */
    this.rpcImpl = rpcImpl;

    /**
     * Whether requests are length-delimited.
     * @type {boolean}
     */
    this.requestDelimited = Boolean(requestDelimited);

    /**
     * Whether responses are length-delimited.
     * @type {boolean}
     */
    this.responseDelimited = Boolean(responseDelimited);
}

/**
 * Calls a service method through {@link rpc.Service#rpcImpl|rpcImpl}.
 * @param {Method|rpc.ServiceMethod<TReq,TRes>} method Reflected or static method
 * @param {Constructor<TReq>} requestCtor Request constructor
 * @param {Constructor<TRes>} responseCtor Response constructor
 * @param {TReq|Properties<TReq>} request Request message or plain object
 * @param {rpc.ServiceMethodCallback<TRes>} callback Service callback
 * @returns {undefined}
 * @template TReq extends Message<TReq>
 * @template TRes extends Message<TRes>
 */
Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {

    if (!request)
        throw TypeError("request must be specified");

    var self = this;
    if (!callback)
        return util.asPromise(rpcCall, self, method, requestCtor, responseCtor, request);

    if (!self.rpcImpl) {
        setTimeout(function() { callback(Error("already ended")); }, 0);
        return undefined;
    }

    try {
        return self.rpcImpl(
            method,
            requestCtor[self.requestDelimited ? "encodeDelimited" : "encode"](request).finish(),
            function rpcCallback(err, response) {

                if (err) {
                    self.emit("error", err, method);
                    return callback(err);
                }

                if (response === null) {
                    self.end(/* endedByRPC */ true);
                    return undefined;
                }

                if (!(response instanceof responseCtor)) {
                    try {
                        response = responseCtor[self.responseDelimited ? "decodeDelimited" : "decode"](response);
                    } catch (err) {
                        self.emit("error", err, method);
                        return callback(err);
                    }
                }

                self.emit("data", response, method);
                return callback(null, response);
            }
        );
    } catch (err) {
        self.emit("error", err, method);
        setTimeout(function() { callback(err); }, 0);
        return undefined;
    }
};

/**
 * Ends this service and emits the `end` event.
 * @param {boolean} [endedByRPC=false] Whether the service has been ended by the RPC implementation.
 * @returns {rpc.Service} `this`
 */
Service.prototype.end = function end(endedByRPC) {
    if (this.rpcImpl) {
        if (!endedByRPC) // signal end to rpcImpl
            this.rpcImpl(null, null, null);
        this.rpcImpl = null;
        this.emit("end").off();
    }
    return this;
};


/***/ }),

/***/ "./node_modules/protobufjs/src/util/longbits.js":
/*!******************************************************!*\
  !*** ./node_modules/protobufjs/src/util/longbits.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

module.exports = LongBits;

var util = __webpack_require__(/*! ../util/minimal */ "./node_modules/protobufjs/src/util/minimal.js");

/**
 * Constructs new long bits.
 * @classdesc Helper class for working with the low and high bits of a 64 bit value.
 * @memberof util
 * @constructor
 * @param {number} lo Low 32 bits, unsigned
 * @param {number} hi High 32 bits, unsigned
 */
function LongBits(lo, hi) {

    // note that the casts below are theoretically unnecessary as of today, but older statically
    // generated converter code might still call the ctor with signed 32bits. kept for compat.

    /**
     * Low bits.
     * @type {number}
     */
    this.lo = lo >>> 0;

    /**
     * High bits.
     * @type {number}
     */
    this.hi = hi >>> 0;
}

/**
 * Zero bits.
 * @memberof util.LongBits
 * @type {util.LongBits}
 */
var zero = LongBits.zero = new LongBits(0, 0);

zero.toNumber = function() { return 0; };
zero.zzEncode = zero.zzDecode = function() { return this; };
zero.length = function() { return 1; };

/**
 * Zero hash.
 * @memberof util.LongBits
 * @type {string}
 */
var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";

/**
 * Constructs new long bits from the specified number.
 * @param {number} value Value
 * @returns {util.LongBits} Instance
 */
LongBits.fromNumber = function fromNumber(value) {
    if (value === 0)
        return zero;
    var sign = value < 0;
    if (sign)
        value = -value;
    var lo = value >>> 0,
        hi = (value - lo) / 4294967296 >>> 0;
    if (sign) {
        hi = ~hi >>> 0;
        lo = ~lo >>> 0;
        if (++lo > 4294967295) {
            lo = 0;
            if (++hi > 4294967295)
                hi = 0;
        }
    }
    return new LongBits(lo, hi);
};

/**
 * Constructs new long bits from a number, long or string.
 * @param {Long|number|string} value Value
 * @returns {util.LongBits} Instance
 */
LongBits.from = function from(value) {
    if (typeof value === "number")
        return LongBits.fromNumber(value);
    if (util.isString(value)) {
        /* istanbul ignore else */
        if (util.Long)
            value = util.Long.fromString(value);
        else
            return LongBits.fromNumber(parseInt(value, 10));
    }
    return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
};

/**
 * Converts this long bits to a possibly unsafe JavaScript number.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {number} Possibly unsafe number
 */
LongBits.prototype.toNumber = function toNumber(unsigned) {
    if (!unsigned && this.hi >>> 31) {
        var lo = ~this.lo + 1 >>> 0,
            hi = ~this.hi     >>> 0;
        if (!lo)
            hi = hi + 1 >>> 0;
        return -(lo + hi * 4294967296);
    }
    return this.lo + this.hi * 4294967296;
};

/**
 * Converts this long bits to a long.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long} Long
 */
LongBits.prototype.toLong = function toLong(unsigned) {
    return util.Long
        ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned))
        /* istanbul ignore next */
        : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
};

var charCodeAt = String.prototype.charCodeAt;

/**
 * Constructs new long bits from the specified 8 characters long hash.
 * @param {string} hash Hash
 * @returns {util.LongBits} Bits
 */
LongBits.fromHash = function fromHash(hash) {
    if (hash === zeroHash)
        return zero;
    return new LongBits(
        ( charCodeAt.call(hash, 0)
        | charCodeAt.call(hash, 1) << 8
        | charCodeAt.call(hash, 2) << 16
        | charCodeAt.call(hash, 3) << 24) >>> 0
    ,
        ( charCodeAt.call(hash, 4)
        | charCodeAt.call(hash, 5) << 8
        | charCodeAt.call(hash, 6) << 16
        | charCodeAt.call(hash, 7) << 24) >>> 0
    );
};

/**
 * Converts this long bits to a 8 characters long hash.
 * @returns {string} Hash
 */
LongBits.prototype.toHash = function toHash() {
    return String.fromCharCode(
        this.lo        & 255,
        this.lo >>> 8  & 255,
        this.lo >>> 16 & 255,
        this.lo >>> 24      ,
        this.hi        & 255,
        this.hi >>> 8  & 255,
        this.hi >>> 16 & 255,
        this.hi >>> 24
    );
};

/**
 * Zig-zag encodes this long bits.
 * @returns {util.LongBits} `this`
 */
LongBits.prototype.zzEncode = function zzEncode() {
    var mask =   this.hi >> 31;
    this.hi  = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
    this.lo  = ( this.lo << 1                   ^ mask) >>> 0;
    return this;
};

/**
 * Zig-zag decodes this long bits.
 * @returns {util.LongBits} `this`
 */
LongBits.prototype.zzDecode = function zzDecode() {
    var mask = -(this.lo & 1);
    this.lo  = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
    this.hi  = ( this.hi >>> 1                  ^ mask) >>> 0;
    return this;
};

/**
 * Calculates the length of this longbits when encoded as a varint.
 * @returns {number} Length
 */
LongBits.prototype.length = function length() {
    var part0 =  this.lo,
        part1 = (this.lo >>> 28 | this.hi << 4) >>> 0,
        part2 =  this.hi >>> 24;
    return part2 === 0
         ? part1 === 0
           ? part0 < 16384
             ? part0 < 128 ? 1 : 2
             : part0 < 2097152 ? 3 : 4
           : part1 < 16384
             ? part1 < 128 ? 5 : 6
             : part1 < 2097152 ? 7 : 8
         : part2 < 128 ? 9 : 10;
};


/***/ }),

/***/ "./node_modules/protobufjs/src/util/minimal.js":
/*!*****************************************************!*\
  !*** ./node_modules/protobufjs/src/util/minimal.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var util = exports;

// used to return a Promise where callback is omitted
util.asPromise = __webpack_require__(/*! @protobufjs/aspromise */ "./node_modules/@protobufjs/aspromise/index.js");

// converts to / from base64 encoded strings
util.base64 = __webpack_require__(/*! @protobufjs/base64 */ "./node_modules/@protobufjs/base64/index.js");

// base class of rpc.Service
util.EventEmitter = __webpack_require__(/*! @protobufjs/eventemitter */ "./node_modules/@protobufjs/eventemitter/index.js");

// float handling accross browsers
util.float = __webpack_require__(/*! @protobufjs/float */ "./node_modules/@protobufjs/float/index.js");

// requires modules optionally and hides the call from bundlers
util.inquire = __webpack_require__(/*! @protobufjs/inquire */ "./node_modules/@protobufjs/inquire/index.js");

// converts to / from utf8 encoded strings
util.utf8 = __webpack_require__(/*! @protobufjs/utf8 */ "./node_modules/@protobufjs/utf8/index.js");

// provides a node-like buffer pool in the browser
util.pool = __webpack_require__(/*! @protobufjs/pool */ "./node_modules/@protobufjs/pool/index.js");

// utility to work with the low and high bits of a 64 bit value
util.LongBits = __webpack_require__(/*! ./longbits */ "./node_modules/protobufjs/src/util/longbits.js");

/**
 * Whether running within node or not.
 * @memberof util
 * @type {boolean}
 */
util.isNode = Boolean(typeof __webpack_require__.g !== "undefined"
                   && __webpack_require__.g
                   && __webpack_require__.g.process
                   && __webpack_require__.g.process.versions
                   && __webpack_require__.g.process.versions.node);

/**
 * Global object reference.
 * @memberof util
 * @type {Object}
 */
util.global = util.isNode && __webpack_require__.g
           || typeof window !== "undefined" && window
           || typeof self   !== "undefined" && self
           || this; // eslint-disable-line no-invalid-this

/**
 * An immuable empty array.
 * @memberof util
 * @type {Array.<*>}
 * @const
 */
util.emptyArray = Object.freeze ? Object.freeze([]) : /* istanbul ignore next */ []; // used on prototypes

/**
 * An immutable empty object.
 * @type {Object}
 * @const
 */
util.emptyObject = Object.freeze ? Object.freeze({}) : /* istanbul ignore next */ {}; // used on prototypes

/**
 * Tests if the specified value is an integer.
 * @function
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is an integer
 */
util.isInteger = Number.isInteger || /* istanbul ignore next */ function isInteger(value) {
    return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
};

/**
 * Tests if the specified value is a string.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a string
 */
util.isString = function isString(value) {
    return typeof value === "string" || value instanceof String;
};

/**
 * Tests if the specified value is a non-null object.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a non-null object
 */
util.isObject = function isObject(value) {
    return value && typeof value === "object";
};

/**
 * Checks if a property on a message is considered to be present.
 * This is an alias of {@link util.isSet}.
 * @function
 * @param {Object} obj Plain object or message instance
 * @param {string} prop Property name
 * @returns {boolean} `true` if considered to be present, otherwise `false`
 */
util.isset =

/**
 * Checks if a property on a message is considered to be present.
 * @param {Object} obj Plain object or message instance
 * @param {string} prop Property name
 * @returns {boolean} `true` if considered to be present, otherwise `false`
 */
util.isSet = function isSet(obj, prop) {
    var value = obj[prop];
    if (value != null && obj.hasOwnProperty(prop)) // eslint-disable-line eqeqeq, no-prototype-builtins
        return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
    return false;
};

/**
 * Any compatible Buffer instance.
 * This is a minimal stand-alone definition of a Buffer instance. The actual type is that exported by node's typings.
 * @interface Buffer
 * @extends Uint8Array
 */

/**
 * Node's Buffer class if available.
 * @type {Constructor<Buffer>}
 */
util.Buffer = (function() {
    try {
        var Buffer = util.inquire("buffer").Buffer;
        // refuse to use non-node buffers if not explicitly assigned (perf reasons):
        return Buffer.prototype.utf8Write ? Buffer : /* istanbul ignore next */ null;
    } catch (e) {
        /* istanbul ignore next */
        return null;
    }
})();

// Internal alias of or polyfull for Buffer.from.
util._Buffer_from = null;

// Internal alias of or polyfill for Buffer.allocUnsafe.
util._Buffer_allocUnsafe = null;

/**
 * Creates a new buffer of whatever type supported by the environment.
 * @param {number|number[]} [sizeOrArray=0] Buffer size or number array
 * @returns {Uint8Array|Buffer} Buffer
 */
util.newBuffer = function newBuffer(sizeOrArray) {
    /* istanbul ignore next */
    return typeof sizeOrArray === "number"
        ? util.Buffer
            ? util._Buffer_allocUnsafe(sizeOrArray)
            : new util.Array(sizeOrArray)
        : util.Buffer
            ? util._Buffer_from(sizeOrArray)
            : typeof Uint8Array === "undefined"
                ? sizeOrArray
                : new Uint8Array(sizeOrArray);
};

/**
 * Array implementation used in the browser. `Uint8Array` if supported, otherwise `Array`.
 * @type {Constructor<Uint8Array>}
 */
util.Array = typeof Uint8Array !== "undefined" ? Uint8Array /* istanbul ignore next */ : Array;

/**
 * Any compatible Long instance.
 * This is a minimal stand-alone definition of a Long instance. The actual type is that exported by long.js.
 * @interface Long
 * @property {number} low Low bits
 * @property {number} high High bits
 * @property {boolean} unsigned Whether unsigned or not
 */

/**
 * Long.js's Long class if available.
 * @type {Constructor<Long>}
 */
util.Long = /* istanbul ignore next */ util.global.dcodeIO && /* istanbul ignore next */ util.global.dcodeIO.Long
         || /* istanbul ignore next */ util.global.Long
         || util.inquire("long");

/**
 * Regular expression used to verify 2 bit (`bool`) map keys.
 * @type {RegExp}
 * @const
 */
util.key2Re = /^true|false|0|1$/;

/**
 * Regular expression used to verify 32 bit (`int32` etc.) map keys.
 * @type {RegExp}
 * @const
 */
util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;

/**
 * Regular expression used to verify 64 bit (`int64` etc.) map keys.
 * @type {RegExp}
 * @const
 */
util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;

/**
 * Converts a number or long to an 8 characters long hash string.
 * @param {Long|number} value Value to convert
 * @returns {string} Hash
 */
util.longToHash = function longToHash(value) {
    return value
        ? util.LongBits.from(value).toHash()
        : util.LongBits.zeroHash;
};

/**
 * Converts an 8 characters long hash string to a long or number.
 * @param {string} hash Hash
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long|number} Original value
 */
util.longFromHash = function longFromHash(hash, unsigned) {
    var bits = util.LongBits.fromHash(hash);
    if (util.Long)
        return util.Long.fromBits(bits.lo, bits.hi, unsigned);
    return bits.toNumber(Boolean(unsigned));
};

/**
 * Merges the properties of the source object into the destination object.
 * @memberof util
 * @param {Object.<string,*>} dst Destination object
 * @param {Object.<string,*>} src Source object
 * @param {boolean} [ifNotSet=false] Merges only if the key is not already set
 * @returns {Object.<string,*>} Destination object
 */
function merge(dst, src, ifNotSet) { // used by converters
    for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
        if (dst[keys[i]] === undefined || !ifNotSet)
            dst[keys[i]] = src[keys[i]];
    return dst;
}

util.merge = merge;

/**
 * Converts the first character of a string to lower case.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */
util.lcFirst = function lcFirst(str) {
    return str.charAt(0).toLowerCase() + str.substring(1);
};

/**
 * Creates a custom error constructor.
 * @memberof util
 * @param {string} name Error name
 * @returns {Constructor<Error>} Custom error constructor
 */
function newError(name) {

    function CustomError(message, properties) {

        if (!(this instanceof CustomError))
            return new CustomError(message, properties);

        // Error.call(this, message);
        // ^ just returns a new error instance because the ctor can be called as a function

        Object.defineProperty(this, "message", { get: function() { return message; } });

        /* istanbul ignore next */
        if (Error.captureStackTrace) // node
            Error.captureStackTrace(this, CustomError);
        else
            Object.defineProperty(this, "stack", { value: new Error().stack || "" });

        if (properties)
            merge(this, properties);
    }

    (CustomError.prototype = Object.create(Error.prototype)).constructor = CustomError;

    Object.defineProperty(CustomError.prototype, "name", { get: function() { return name; } });

    CustomError.prototype.toString = function toString() {
        return this.name + ": " + this.message;
    };

    return CustomError;
}

util.newError = newError;

/**
 * Constructs a new protocol error.
 * @classdesc Error subclass indicating a protocol specifc error.
 * @memberof util
 * @extends Error
 * @template T extends Message<T>
 * @constructor
 * @param {string} message Error message
 * @param {Object.<string,*>} [properties] Additional properties
 * @example
 * try {
 *     MyMessage.decode(someBuffer); // throws if required fields are missing
 * } catch (e) {
 *     if (e instanceof ProtocolError && e.instance)
 *         console.log("decoded so far: " + JSON.stringify(e.instance));
 * }
 */
util.ProtocolError = newError("ProtocolError");

/**
 * So far decoded message instance.
 * @name util.ProtocolError#instance
 * @type {Message<T>}
 */

/**
 * A OneOf getter as returned by {@link util.oneOfGetter}.
 * @typedef OneOfGetter
 * @type {function}
 * @returns {string|undefined} Set field name, if any
 */

/**
 * Builds a getter for a oneof's present field name.
 * @param {string[]} fieldNames Field names
 * @returns {OneOfGetter} Unbound getter
 */
util.oneOfGetter = function getOneOf(fieldNames) {
    var fieldMap = {};
    for (var i = 0; i < fieldNames.length; ++i)
        fieldMap[fieldNames[i]] = 1;

    /**
     * @returns {string|undefined} Set field name, if any
     * @this Object
     * @ignore
     */
    return function() { // eslint-disable-line consistent-return
        for (var keys = Object.keys(this), i = keys.length - 1; i > -1; --i)
            if (fieldMap[keys[i]] === 1 && this[keys[i]] !== undefined && this[keys[i]] !== null)
                return keys[i];
    };
};

/**
 * A OneOf setter as returned by {@link util.oneOfSetter}.
 * @typedef OneOfSetter
 * @type {function}
 * @param {string|undefined} value Field name
 * @returns {undefined}
 */

/**
 * Builds a setter for a oneof's present field name.
 * @param {string[]} fieldNames Field names
 * @returns {OneOfSetter} Unbound setter
 */
util.oneOfSetter = function setOneOf(fieldNames) {

    /**
     * @param {string} name Field name
     * @returns {undefined}
     * @this Object
     * @ignore
     */
    return function(name) {
        for (var i = 0; i < fieldNames.length; ++i)
            if (fieldNames[i] !== name)
                delete this[fieldNames[i]];
    };
};

/**
 * Default conversion options used for {@link Message#toJSON} implementations.
 *
 * These options are close to proto3's JSON mapping with the exception that internal types like Any are handled just like messages. More precisely:
 *
 * - Longs become strings
 * - Enums become string keys
 * - Bytes become base64 encoded strings
 * - (Sub-)Messages become plain objects
 * - Maps become plain objects with all string keys
 * - Repeated fields become arrays
 * - NaN and Infinity for float and double fields become strings
 *
 * @type {IConversionOptions}
 * @see https://developers.google.com/protocol-buffers/docs/proto3?hl=en#json
 */
util.toJSONOptions = {
    longs: String,
    enums: String,
    bytes: String,
    json: true
};

// Sets up buffer utility according to the environment (called in index-minimal)
util._configure = function() {
    var Buffer = util.Buffer;
    /* istanbul ignore if */
    if (!Buffer) {
        util._Buffer_from = util._Buffer_allocUnsafe = null;
        return;
    }
    // because node 4.x buffers are incompatible & immutable
    // see: https://github.com/dcodeIO/protobuf.js/pull/665
    util._Buffer_from = Buffer.from !== Uint8Array.from && Buffer.from ||
        /* istanbul ignore next */
        function Buffer_from(value, encoding) {
            return new Buffer(value, encoding);
        };
    util._Buffer_allocUnsafe = Buffer.allocUnsafe ||
        /* istanbul ignore next */
        function Buffer_allocUnsafe(size) {
            return new Buffer(size);
        };
};


/***/ }),

/***/ "./node_modules/protobufjs/src/writer.js":
/*!***********************************************!*\
  !*** ./node_modules/protobufjs/src/writer.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

module.exports = Writer;

var util      = __webpack_require__(/*! ./util/minimal */ "./node_modules/protobufjs/src/util/minimal.js");

var BufferWriter; // cyclic

var LongBits  = util.LongBits,
    base64    = util.base64,
    utf8      = util.utf8;

/**
 * Constructs a new writer operation instance.
 * @classdesc Scheduled writer operation.
 * @constructor
 * @param {function(*, Uint8Array, number)} fn Function to call
 * @param {number} len Value byte length
 * @param {*} val Value to write
 * @ignore
 */
function Op(fn, len, val) {

    /**
     * Function to call.
     * @type {function(Uint8Array, number, *)}
     */
    this.fn = fn;

    /**
     * Value byte length.
     * @type {number}
     */
    this.len = len;

    /**
     * Next operation.
     * @type {Writer.Op|undefined}
     */
    this.next = undefined;

    /**
     * Value to write.
     * @type {*}
     */
    this.val = val; // type varies
}

/* istanbul ignore next */
function noop() {} // eslint-disable-line no-empty-function

/**
 * Constructs a new writer state instance.
 * @classdesc Copied writer state.
 * @memberof Writer
 * @constructor
 * @param {Writer} writer Writer to copy state from
 * @ignore
 */
function State(writer) {

    /**
     * Current head.
     * @type {Writer.Op}
     */
    this.head = writer.head;

    /**
     * Current tail.
     * @type {Writer.Op}
     */
    this.tail = writer.tail;

    /**
     * Current buffer length.
     * @type {number}
     */
    this.len = writer.len;

    /**
     * Next state.
     * @type {State|null}
     */
    this.next = writer.states;
}

/**
 * Constructs a new writer instance.
 * @classdesc Wire format writer using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 */
function Writer() {

    /**
     * Current length.
     * @type {number}
     */
    this.len = 0;

    /**
     * Operations head.
     * @type {Object}
     */
    this.head = new Op(noop, 0, 0);

    /**
     * Operations tail
     * @type {Object}
     */
    this.tail = this.head;

    /**
     * Linked forked states.
     * @type {Object|null}
     */
    this.states = null;

    // When a value is written, the writer calculates its byte length and puts it into a linked
    // list of operations to perform when finish() is called. This both allows us to allocate
    // buffers of the exact required size and reduces the amount of work we have to do compared
    // to first calculating over objects and then encoding over objects. In our case, the encoding
    // part is just a linked list walk calling operations with already prepared values.
}

var create = function create() {
    return util.Buffer
        ? function create_buffer_setup() {
            return (Writer.create = function create_buffer() {
                return new BufferWriter();
            })();
        }
        /* istanbul ignore next */
        : function create_array() {
            return new Writer();
        };
};

/**
 * Creates a new writer.
 * @function
 * @returns {BufferWriter|Writer} A {@link BufferWriter} when Buffers are supported, otherwise a {@link Writer}
 */
Writer.create = create();

/**
 * Allocates a buffer of the specified size.
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */
Writer.alloc = function alloc(size) {
    return new util.Array(size);
};

// Use Uint8Array buffer pool in the browser, just like node does with buffers
/* istanbul ignore else */
if (util.Array !== Array)
    Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);

/**
 * Pushes a new operation to the queue.
 * @param {function(Uint8Array, number, *)} fn Function to call
 * @param {number} len Value byte length
 * @param {number} val Value to write
 * @returns {Writer} `this`
 * @private
 */
Writer.prototype._push = function push(fn, len, val) {
    this.tail = this.tail.next = new Op(fn, len, val);
    this.len += len;
    return this;
};

function writeByte(val, buf, pos) {
    buf[pos] = val & 255;
}

function writeVarint32(val, buf, pos) {
    while (val > 127) {
        buf[pos++] = val & 127 | 128;
        val >>>= 7;
    }
    buf[pos] = val;
}

/**
 * Constructs a new varint writer operation instance.
 * @classdesc Scheduled varint writer operation.
 * @extends Op
 * @constructor
 * @param {number} len Value byte length
 * @param {number} val Value to write
 * @ignore
 */
function VarintOp(len, val) {
    this.len = len;
    this.next = undefined;
    this.val = val;
}

VarintOp.prototype = Object.create(Op.prototype);
VarintOp.prototype.fn = writeVarint32;

/**
 * Writes an unsigned 32 bit value as a varint.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.uint32 = function write_uint32(value) {
    // here, the call to this.push has been inlined and a varint specific Op subclass is used.
    // uint32 is by far the most frequently used operation and benefits significantly from this.
    this.len += (this.tail = this.tail.next = new VarintOp(
        (value = value >>> 0)
                < 128       ? 1
        : value < 16384     ? 2
        : value < 2097152   ? 3
        : value < 268435456 ? 4
        :                     5,
    value)).len;
    return this;
};

/**
 * Writes a signed 32 bit value as a varint.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.int32 = function write_int32(value) {
    return value < 0
        ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) // 10 bytes per spec
        : this.uint32(value);
};

/**
 * Writes a 32 bit value as a varint, zig-zag encoded.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.sint32 = function write_sint32(value) {
    return this.uint32((value << 1 ^ value >> 31) >>> 0);
};

function writeVarint64(val, buf, pos) {
    while (val.hi) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
        val.hi >>>= 7;
    }
    while (val.lo > 127) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = val.lo >>> 7;
    }
    buf[pos++] = val.lo;
}

/**
 * Writes an unsigned 64 bit value as a varint.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.uint64 = function write_uint64(value) {
    var bits = LongBits.from(value);
    return this._push(writeVarint64, bits.length(), bits);
};

/**
 * Writes a signed 64 bit value as a varint.
 * @function
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.int64 = Writer.prototype.uint64;

/**
 * Writes a signed 64 bit value as a varint, zig-zag encoded.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.sint64 = function write_sint64(value) {
    var bits = LongBits.from(value).zzEncode();
    return this._push(writeVarint64, bits.length(), bits);
};

/**
 * Writes a boolish value as a varint.
 * @param {boolean} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.bool = function write_bool(value) {
    return this._push(writeByte, 1, value ? 1 : 0);
};

function writeFixed32(val, buf, pos) {
    buf[pos    ] =  val         & 255;
    buf[pos + 1] =  val >>> 8   & 255;
    buf[pos + 2] =  val >>> 16  & 255;
    buf[pos + 3] =  val >>> 24;
}

/**
 * Writes an unsigned 32 bit value as fixed 32 bits.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.fixed32 = function write_fixed32(value) {
    return this._push(writeFixed32, 4, value >>> 0);
};

/**
 * Writes a signed 32 bit value as fixed 32 bits.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.sfixed32 = Writer.prototype.fixed32;

/**
 * Writes an unsigned 64 bit value as fixed 64 bits.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.fixed64 = function write_fixed64(value) {
    var bits = LongBits.from(value);
    return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
};

/**
 * Writes a signed 64 bit value as fixed 64 bits.
 * @function
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.sfixed64 = Writer.prototype.fixed64;

/**
 * Writes a float (32 bit).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.float = function write_float(value) {
    return this._push(util.float.writeFloatLE, 4, value);
};

/**
 * Writes a double (64 bit float).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.double = function write_double(value) {
    return this._push(util.float.writeDoubleLE, 8, value);
};

var writeBytes = util.Array.prototype.set
    ? function writeBytes_set(val, buf, pos) {
        buf.set(val, pos); // also works for plain array values
    }
    /* istanbul ignore next */
    : function writeBytes_for(val, buf, pos) {
        for (var i = 0; i < val.length; ++i)
            buf[pos + i] = val[i];
    };

/**
 * Writes a sequence of bytes.
 * @param {Uint8Array|string} value Buffer or base64 encoded string to write
 * @returns {Writer} `this`
 */
Writer.prototype.bytes = function write_bytes(value) {
    var len = value.length >>> 0;
    if (!len)
        return this._push(writeByte, 1, 0);
    if (util.isString(value)) {
        var buf = Writer.alloc(len = base64.length(value));
        base64.decode(value, buf, 0);
        value = buf;
    }
    return this.uint32(len)._push(writeBytes, len, value);
};

/**
 * Writes a string.
 * @param {string} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.string = function write_string(value) {
    var len = utf8.length(value);
    return len
        ? this.uint32(len)._push(utf8.write, len, value)
        : this._push(writeByte, 1, 0);
};

/**
 * Forks this writer's state by pushing it to a stack.
 * Calling {@link Writer#reset|reset} or {@link Writer#ldelim|ldelim} resets the writer to the previous state.
 * @returns {Writer} `this`
 */
Writer.prototype.fork = function fork() {
    this.states = new State(this);
    this.head = this.tail = new Op(noop, 0, 0);
    this.len = 0;
    return this;
};

/**
 * Resets this instance to the last state.
 * @returns {Writer} `this`
 */
Writer.prototype.reset = function reset() {
    if (this.states) {
        this.head   = this.states.head;
        this.tail   = this.states.tail;
        this.len    = this.states.len;
        this.states = this.states.next;
    } else {
        this.head = this.tail = new Op(noop, 0, 0);
        this.len  = 0;
    }
    return this;
};

/**
 * Resets to the last state and appends the fork state's current write length as a varint followed by its operations.
 * @returns {Writer} `this`
 */
Writer.prototype.ldelim = function ldelim() {
    var head = this.head,
        tail = this.tail,
        len  = this.len;
    this.reset().uint32(len);
    if (len) {
        this.tail.next = head.next; // skip noop
        this.tail = tail;
        this.len += len;
    }
    return this;
};

/**
 * Finishes the write operation.
 * @returns {Uint8Array} Finished buffer
 */
Writer.prototype.finish = function finish() {
    var head = this.head.next, // skip noop
        buf  = this.constructor.alloc(this.len),
        pos  = 0;
    while (head) {
        head.fn(head.val, buf, pos);
        pos += head.len;
        head = head.next;
    }
    // this.head = this.tail = null;
    return buf;
};

Writer._configure = function(BufferWriter_) {
    BufferWriter = BufferWriter_;
    Writer.create = create();
    BufferWriter._configure();
};


/***/ }),

/***/ "./node_modules/protobufjs/src/writer_buffer.js":
/*!******************************************************!*\
  !*** ./node_modules/protobufjs/src/writer_buffer.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

module.exports = BufferWriter;

// extends Writer
var Writer = __webpack_require__(/*! ./writer */ "./node_modules/protobufjs/src/writer.js");
(BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;

var util = __webpack_require__(/*! ./util/minimal */ "./node_modules/protobufjs/src/util/minimal.js");

/**
 * Constructs a new buffer writer instance.
 * @classdesc Wire format writer using node buffers.
 * @extends Writer
 * @constructor
 */
function BufferWriter() {
    Writer.call(this);
}

BufferWriter._configure = function () {
    /**
     * Allocates a buffer of the specified size.
     * @function
     * @param {number} size Buffer size
     * @returns {Buffer} Buffer
     */
    BufferWriter.alloc = util._Buffer_allocUnsafe;

    BufferWriter.writeBytesBuffer = util.Buffer && util.Buffer.prototype instanceof Uint8Array && util.Buffer.prototype.set.name === "set"
        ? function writeBytesBuffer_set(val, buf, pos) {
          buf.set(val, pos); // faster than copy (requires node >= 4 where Buffers extend Uint8Array and set is properly inherited)
          // also works for plain array values
        }
        /* istanbul ignore next */
        : function writeBytesBuffer_copy(val, buf, pos) {
          if (val.copy) // Buffer values
            val.copy(buf, pos, 0, val.length);
          else for (var i = 0; i < val.length;) // plain array values
            buf[pos++] = val[i++];
        };
};


/**
 * @override
 */
BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
    if (util.isString(value))
        value = util._Buffer_from(value, "base64");
    var len = value.length >>> 0;
    this.uint32(len);
    if (len)
        this._push(BufferWriter.writeBytesBuffer, len, value);
    return this;
};

function writeStringBuffer(val, buf, pos) {
    if (val.length < 40) // plain js is faster for short strings (probably due to redundant assertions)
        util.utf8.write(val, buf, pos);
    else if (buf.utf8Write)
        buf.utf8Write(val, pos);
    else
        buf.write(val, pos);
}

/**
 * @override
 */
BufferWriter.prototype.string = function write_string_buffer(value) {
    var len = util.Buffer.byteLength(value);
    this.uint32(len);
    if (len)
        this._push(writeStringBuffer, len, value);
    return this;
};


/**
 * Finishes the write operation.
 * @name BufferWriter#finish
 * @function
 * @returns {Buffer} Finished buffer
 */

BufferWriter._configure();


/***/ }),

/***/ "./src/data/excel/SkillConfig.ts":
/*!***************************************!*\
  !*** ./src/data/excel/SkillConfig.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SkillConfigTB": () => (/* binding */ SkillConfigTB),
/* harmony export */   "SkillConfigTR": () => (/* binding */ SkillConfigTR)
/* harmony export */ });
/* harmony import */ var _framework_common_Singleton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../framework/common/Singleton */ "./src/framework/common/Singleton.ts");

class SkillConfigTR {
    constructor(_id, _Name, _Description, _CoolTime, _CostSP, _AttackDistance, _AttackAngle, _AttackTargetTags, _ImpactType, _NextBattlerId, _AtkRatio, _DurationTime, _AtkInterval, _SkillPrefab, _AnimationName, _HitFxPrefab, _Level, _AttackType, _SelectorType) {
        this._id = _id;
        this._Name = _Name;
        this._Description = _Description;
        this._CoolTime = _CoolTime;
        this._CostSP = _CostSP;
        this._AttackDistance = _AttackDistance;
        this._AttackAngle = _AttackAngle;
        this._AttackTargetTags = _AttackTargetTags;
        this._ImpactType = _ImpactType;
        this._NextBattlerId = _NextBattlerId;
        this._AtkRatio = _AtkRatio;
        this._DurationTime = _DurationTime;
        this._AtkInterval = _AtkInterval;
        this._SkillPrefab = _SkillPrefab;
        this._AnimationName = _AnimationName;
        this._HitFxPrefab = _HitFxPrefab;
        this._Level = _Level;
        this._AttackType = _AttackType;
        this._SelectorType = _SelectorType;
    }
}
class SkillConfigTB extends _framework_common_Singleton__WEBPACK_IMPORTED_MODULE_0__.Singleton {
    constructor() {
        super();
        this.trs = new Map();
        this.trs.set(1001, new SkillConfigTR(1001, "降龙十八掌", "带有强力攻击技能", 10, 178, 1, 30, ["Enemy"], ["CostSP", "Damage"], 0, 2, 2, 1, "Effect/Prefab/UI/ef_ui_TaskFinish.prefab", "skill1", "Effect/Prefab/UI/ef_ui_TaskFinish.prefab", 1, 1, 1));
        this.trs.set(1002, new SkillConfigTR(1002, "暴雨梨花", "带有强力攻击技能", 10, 178, 1, 30, ["Enemy"], ["CostSP", "Damage"], 0, 2, 2, 1, "Effect/Prefab/UI/ef_ui_TaskFinish.prefab", "skill2", "Effect/Prefab/UI/ef_ui_TaskFinish.prefab", 1, 1, 1));
        this.trs.set(1003, new SkillConfigTR(1003, "排山倒海", "带有强力攻击技能", 10, 178, 1, 30, ["Enemy"], ["CostSP", "Damage"], 0, 2, 2, 1, "Effect/Prefab/UI/ef_ui_TaskFinish.prefab", "skill3", "Effect/Prefab/UI/ef_ui_TaskFinish.prefab", 1, 1, 1));
        this.trs.set(1004, new SkillConfigTR(1004, "葵花点穴手", "带有强力攻击技能", 10, 178, 1, 30, ["Enemy"], ["CostSP", "Damage"], 0, 2, 2, 1, "Effect/Prefab/UI/ef_ui_TaskFinish.prefab", "skill4", "Effect/Prefab/UI/ef_ui_TaskFinish.prefab", 1, 1, 1));
    }
}


/***/ }),

/***/ "./src/data/pb/Opcode.ts":
/*!*******************************!*\
  !*** ./src/data/pb/Opcode.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DecodeMsg": () => (/* binding */ DecodeMsg),
/* harmony export */   "Opcode": () => (/* binding */ Opcode)
/* harmony export */ });
/* harmony import */ var _gen_pb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gen/pb */ "./src/data/pb/gen/pb.js");
/* harmony import */ var _gen_pb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_gen_pb__WEBPACK_IMPORTED_MODULE_0__);

class DecodeMsg {
}
class Opcode {
    static decode(opcode, msg) {
        let msgObj = this.map[opcode]["decode"](msg);
        let decodeMsg = new DecodeMsg();
        decodeMsg.rpcId = msgObj.RpcId;
        decodeMsg.msgObj = msgObj;
        return decodeMsg;
    }
    static encode(opcode, msg) {
        let buf = this.map[opcode]["encode"](msg).finish();
        return buf;
    }
}
Opcode.MSG_C2R_Login = 1000;
Opcode.MSG_R2C_Login = 1001;
Opcode.MSG_C2G_LoginGate = 1002;
Opcode.MSG_G2C_LoginGate = 1003;
Opcode.MSG_C2GS_Test = 2001;
Opcode.MSG_GS2C_Test = 2002;
Opcode.map = {
    1000: { "decode": _gen_pb__WEBPACK_IMPORTED_MODULE_0__.nice_ts.C2R_Login.decode, "encode": _gen_pb__WEBPACK_IMPORTED_MODULE_0__.nice_ts.C2R_Login.encode },
    1001: { "decode": _gen_pb__WEBPACK_IMPORTED_MODULE_0__.nice_ts.R2C_Login.decode, "encode": _gen_pb__WEBPACK_IMPORTED_MODULE_0__.nice_ts.R2C_Login.encode },
    1002: { "decode": _gen_pb__WEBPACK_IMPORTED_MODULE_0__.nice_ts.C2G_LoginGate.decode, "encode": _gen_pb__WEBPACK_IMPORTED_MODULE_0__.nice_ts.C2G_LoginGate.encode },
    1003: { "decode": _gen_pb__WEBPACK_IMPORTED_MODULE_0__.nice_ts.G2C_LoginGate.decode, "encode": _gen_pb__WEBPACK_IMPORTED_MODULE_0__.nice_ts.G2C_LoginGate.encode },
    2001: { "decode": _gen_pb__WEBPACK_IMPORTED_MODULE_0__.nice_ts.C2GS_Test.decode, "encode": _gen_pb__WEBPACK_IMPORTED_MODULE_0__.nice_ts.C2GS_Test.encode },
    2002: { "decode": _gen_pb__WEBPACK_IMPORTED_MODULE_0__.nice_ts.GS2C_Test.decode, "encode": _gen_pb__WEBPACK_IMPORTED_MODULE_0__.nice_ts.GS2C_Test.encode }
};


/***/ }),

/***/ "./src/data/ui/FlyBird.ts":
/*!********************************!*\
  !*** ./src/data/ui/FlyBird.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FlyBirdUI": () => (/* binding */ FlyBirdUI)
/* harmony export */ });
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class FlyBirdUI {
}
FlyBirdUI.PackageName = "FlyBird";
FlyBirdUI.PackageBytes = "FlyBird_fui.bytes";
FlyBirdUI.UIMainVIew = "MainVIew";


/***/ }),

/***/ "./src/data/ui/GameStart.ts":
/*!**********************************!*\
  !*** ./src/data/ui/GameStart.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameStartUI": () => (/* binding */ GameStartUI)
/* harmony export */ });
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class GameStartUI {
}
GameStartUI.PackageName = "GameStart";
GameStartUI.PackageBytes = "GameStart_fui.bytes";
GameStartUI.UIStartView = "StartView";


/***/ }),

/***/ "./src/data/ui/common.ts":
/*!*******************************!*\
  !*** ./src/data/ui/common.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CommonUI": () => (/* binding */ CommonUI)
/* harmony export */ });
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class CommonUI {
}
CommonUI.PackageName = "Common";
CommonUI.PackageBytes = "Common_fui.bytes";
CommonUI.UILoadingView = "LoadingView";


/***/ }),

/***/ "./src/framework/common/GameObjectPool.ts":
/*!************************************************!*\
  !*** ./src/framework/common/GameObjectPool.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameObjectPool": () => (/* binding */ GameObjectPool)
/* harmony export */ });
/* harmony import */ var _Singleton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Singleton */ "./src/framework/common/Singleton.ts");
/* harmony import */ var _ResManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ResManager */ "./src/framework/common/ResManager.ts");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! csharp */ "csharp");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(csharp__WEBPACK_IMPORTED_MODULE_2__);



// -- GameObject缓存池
// -- 注意：
// -- 1、所有需要预设都从这里加载，不要直接到ResourcesManager去加载，由这里统一做缓存管理
// -- 2、缓存分为两部分：从资源层加载的原始GameObject(Asset)，从GameObject实例化出来的多个Inst
class GameObjectPool extends _Singleton__WEBPACK_IMPORTED_MODULE_0__.Singleton {
    constructor() {
        super();
        this.__cacheTransRoot = null;
        this.__goPool = new Map();
        this.__instCache = new Map();
        let go = csharp__WEBPACK_IMPORTED_MODULE_2__.UnityEngine.GameObject.Find("GameObjectCacheRoot");
        if (go == undefined) {
            go = new csharp__WEBPACK_IMPORTED_MODULE_2__.UnityEngine.GameObject("GameObjectCacheRoot");
            csharp__WEBPACK_IMPORTED_MODULE_2__.UnityEngine.Object.DontDestroyOnLoad(go);
        }
        this.__cacheTransRoot = go.transform;
    }
    //-- 检测是否已经被缓存
    checkHasCached(path) {
        let cachedInst = this.__instCache.get(path);
        if (cachedInst != undefined && cachedInst.length > 0) {
            return true;
        }
        let pooledGo = this.__goPool.get(path);
        return pooledGo != undefined;
    }
    //-- 缓存并实例化GameObject
    cacheAndInstGameObject(path, go, inst_count = 1) {
        this.__goPool.set(path, go);
        if (inst_count > 0) {
            let cachedInst = this.__instCache.get(path);
            for (let i = 0; i < inst_count; i++) {
                let inst = csharp__WEBPACK_IMPORTED_MODULE_2__.UnityEngine.GameObject.Instantiate(go);
                inst.transform.SetParent(this.__cacheTransRoot);
                inst.SetActive(false);
                cachedInst.push(inst);
            }
        }
    }
    //-- 尝试从缓存中获取
    tryGetFromCache(path) {
        if (!this.checkHasCached(path)) {
            return null;
        }
        let cachedInst = this.__instCache.get(path);
        if (cachedInst != undefined && cachedInst.length > 0) {
            let inst = cachedInst.pop();
            return inst;
        }
        let pooledGo = this.__goPool.get(path);
        if (pooledGo != undefined) {
            let inst = csharp__WEBPACK_IMPORTED_MODULE_2__.UnityEngine.GameObject.Instantiate(pooledGo);
            return inst;
        }
        return null;
    }
    //预加载：可提供初始实例化个数
    async preLoadGameObjectAsync(path, inst_count, callback, ...params) {
        if (this.checkHasCached(path)) {
            if (callback != null) {
                callback(params);
            }
            return;
        }
        let go = await _ResManager__WEBPACK_IMPORTED_MODULE_1__.ResManager.Instance(_ResManager__WEBPACK_IMPORTED_MODULE_1__.ResManager).loadPrefab(path);
        if (go != undefined) {
            this.cacheAndInstGameObject(path, go, inst_count);
        }
        if (callback != null) {
            callback(params);
        }
    }
    //-- 异步获取：必要时加载
    async getGameObjectAsync(path, callback, ...params) {
        let inst = this.tryGetFromCache(path);
        if (inst == null) {
            await this.preLoadGameObjectAsync(path, 1, callback, params);
        }
        inst = this.tryGetFromCache(path);
        inst.SetActive(true);
    }
    //-- 回收
    recycleGameObject(path, inst) {
        inst.transform.SetParent(this.__cacheTransRoot);
        inst.SetActive(false);
        let cachedInst = this.__instCache.get(path) || new Array();
        cachedInst.push(inst);
        this.__instCache.set(path, cachedInst);
    }
    //-- 清理缓存
    cleanup(includePooledGo = false) {
        this.__instCache.forEach((values, key) => {
            for (let inst of values) {
                if (inst != null) {
                    csharp__WEBPACK_IMPORTED_MODULE_2__.UnityEngine.GameObject.Destroy(inst);
                }
            }
        });
        this.__instCache.clear();
        if (includePooledGo) {
            this.__goPool.forEach((go, key) => {
                if (go != null) {
                    _ResManager__WEBPACK_IMPORTED_MODULE_1__.ResManager.Instance(_ResManager__WEBPACK_IMPORTED_MODULE_1__.ResManager).releaseAddressGO(go);
                }
            });
            this.__goPool.clear();
        }
    }
}


/***/ }),

/***/ "./src/framework/common/List.ts":
/*!**************************************!*\
  !*** ./src/framework/common/List.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "List": () => (/* binding */ List)
/* harmony export */ });
class List extends Array {
    constructor() {
        super();
        this.add = function (value) {
            this.push(value);
        };
        this.insert = function (index, value) {
            this.splice(index, 0, value);
        };
        this.remove = function (value) {
            var index = this.indexOf(value);
            this.removeAt(index);
        };
        this.removeAt = function (index) {
            this.splice(index, 1);
        };
        this.contains = function (value) {
            return this.indexOf(value) >= 0;
        };
        this.clear = function () {
            this.splice(0);
        };
        this.foreach = function (callback) {
            this._breaking = false;
            var sum = this.length;
            for (var i = 0; i < sum; i++) {
                if (this._breaking) {
                    break;
                }
                callback(this[i]);
            }
        };
        this._breaking = false;
        this.break = function () {
            this._breaking = true;
        };
        this.toArray = function () {
            var array = [];
            this.forEach(element => {
                array.push(element);
            });
            return array;
        };
        this.append = function (value) {
            value.forEach(element => {
                this.push(element);
            });
        };
    }
    get count() {
        return this.length;
    }
}


/***/ }),

/***/ "./src/framework/common/Messenger.ts":
/*!*******************************************!*\
  !*** ./src/framework/common/Messenger.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MesObj": () => (/* binding */ MesObj),
/* harmony export */   "Messenger": () => (/* binding */ Messenger)
/* harmony export */ });
class MesObj {
}
class Messenger {
    constructor() {
        this.listenerMap = new Map();
    }
    addListener(e_type, e_obj, e_listner) {
        let msgObj = this.listenerMap.get(e_type);
        if (typeof (msgObj) == "undefined") {
            msgObj = new MesObj();
            msgObj.obj = e_obj;
            msgObj.listeners = new Array();
        }
        msgObj.listeners.push(e_listner);
        this.listenerMap.set(e_type, msgObj);
    }
    getListener(e_type) {
        return this.listenerMap.get(e_type);
    }
    broadcast(e_type, ...params) {
        let msgObj = this.listenerMap.get(e_type);
        if (typeof (msgObj) != "undefined") {
            for (let l of msgObj.listeners) {
                l.apply(msgObj.obj, params);
            }
        }
    }
    removeListenerByType(e_type) {
        this.listenerMap.delete(e_type);
    }
    removeListener(e_type, e_listener) {
        let msgObj = this.listenerMap.get(e_type);
        if (typeof (msgObj) != "undefined") {
            for (let i = 0; i < msgObj.listeners.length; i++) {
                if (msgObj.listeners[i] == e_listener) {
                    msgObj.listeners.splice(i, 1);
                }
            }
        }
    }
    clearup() {
        this.listenerMap.clear();
    }
}


/***/ }),

/***/ "./src/framework/common/NiceDecorator.ts":
/*!***********************************************!*\
  !*** ./src/framework/common/NiceDecorator.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "binder": () => (/* binding */ binder)
/* harmony export */ });
// FairyGUI 元件 绑定器
function binder(name) {
    return function (target, key) {
        target["binders"] = target["binders"] || {};
        target["binders"][key] = name;
    };
}


/***/ }),

/***/ "./src/framework/common/ResManager.ts":
/*!********************************************!*\
  !*** ./src/framework/common/ResManager.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ResManager": () => (/* binding */ ResManager)
/* harmony export */ });
/* harmony import */ var _Singleton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Singleton */ "./src/framework/common/Singleton.ts");
/* harmony import */ var puerts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! puerts */ "puerts");
/* harmony import */ var puerts__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(puerts__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! csharp */ "csharp");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(csharp__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _logger_Logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../logger/Logger */ "./src/framework/logger/Logger.ts");




class ResManager extends _Singleton__WEBPACK_IMPORTED_MODULE_0__.Singleton {
    constructor() {
        super();
        this._pkgMap = new Map();
    }
    async loadFairyGUIPackage(packageName) {
        try {
            let count = this._pkgMap.get(packageName);
            if (count == null || count < 1) {
                //没有缓存，加载
                let address = packageName + "_fui.bytes";
                let task = csharp__WEBPACK_IMPORTED_MODULE_2__.NiceTS.ResourceManager.LoadFairyGUIPackage(address, packageName);
                await (0,puerts__WEBPACK_IMPORTED_MODULE_1__.$promise)(task);
                this._pkgMap.set(packageName, 1);
            }
            else {
                this._pkgMap.set(packageName, count + 1);
            }
        }
        catch (ex) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_3__.Logger.error(`Load fairyGUI :${packageName} : ${ex}`);
        }
    }
    releaseFairyGUIPackage(packageName) {
        let count = this._pkgMap.get(packageName);
        if (count != null && count > 1) {
            this._pkgMap.set(packageName, count - 1);
        }
        else {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_3__.Logger.log(`release fagui package:${packageName}`);
            this._pkgMap.delete(packageName);
            csharp__WEBPACK_IMPORTED_MODULE_2__.NiceTS.ResourceManager.ReleaseFGUIPackage(packageName);
        }
    }
    async loadScene(sceneName, mode = csharp__WEBPACK_IMPORTED_MODULE_2__.UnityEngine.SceneManagement.LoadSceneMode.Single) {
        try {
            let task = csharp__WEBPACK_IMPORTED_MODULE_2__.NiceTS.ResourceManager.LoadScene(sceneName, mode, (progress) => {
                _logger_Logger__WEBPACK_IMPORTED_MODULE_3__.Logger.log("load scene: " + progress);
            });
            let scenInstance = await (0,puerts__WEBPACK_IMPORTED_MODULE_1__.$promise)(task);
            return scenInstance;
        }
        catch (ex) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_3__.Logger.error(`Load Scene :${sceneName} : ${ex}`);
            return null;
        }
    }
    async unloadScene(sceneInstance) {
        try {
            let task = csharp__WEBPACK_IMPORTED_MODULE_2__.NiceTS.ResourceManager.UnloadScene(sceneInstance);
            let go = await (0,puerts__WEBPACK_IMPORTED_MODULE_1__.$promise)(task);
            return go;
        }
        catch (ex) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_3__.Logger.error(`Unload scene  : ${ex}`);
            return null;
        }
    }
    unloadSceneByName(sceneName) {
        csharp__WEBPACK_IMPORTED_MODULE_2__.NiceTS.ResourceManager.UnloadSceneByName(sceneName);
    }
    async loadPrefab(address) {
        try {
            let task = csharp__WEBPACK_IMPORTED_MODULE_2__.NiceTS.ResourceManager.LoadPrefab(address);
            let go = await (0,puerts__WEBPACK_IMPORTED_MODULE_1__.$promise)(task);
            return go;
        }
        catch (ex) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_3__.Logger.error(`Load prefab :${address} : ${ex}`);
            return null;
        }
    }
    async loadTextAsset(address) {
        try {
            let task = csharp__WEBPACK_IMPORTED_MODULE_2__.NiceTS.ResourceManager.LoadTextAsset(address);
            let go = await (0,puerts__WEBPACK_IMPORTED_MODULE_1__.$promise)(task);
            return go;
        }
        catch (ex) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_3__.Logger.error(`Load textasset :${address} : ${ex}`);
            return null;
        }
    }
    async loadTextBytes(address) {
        try {
            let task = csharp__WEBPACK_IMPORTED_MODULE_2__.NiceTS.ResourceManager.LoadTextBytes(address);
            let bytes = await (0,puerts__WEBPACK_IMPORTED_MODULE_1__.$promise)(task);
            return bytes;
        }
        catch (ex) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_3__.Logger.error(`LoadTextBytes :${address} : ${ex}`);
        }
    }
    async loadSprite(address) {
        try {
            let task = csharp__WEBPACK_IMPORTED_MODULE_2__.NiceTS.ResourceManager.LoadSprite(address);
            let go = await (0,puerts__WEBPACK_IMPORTED_MODULE_1__.$promise)(task);
            return go;
        }
        catch (ex) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_3__.Logger.error(`Load sprite :${address} : ${ex}`);
            return null;
        }
    }
    releaseAddressGO(go) {
        csharp__WEBPACK_IMPORTED_MODULE_2__.NiceTS.ResourceManager.ReleaseAddressGO(go);
    }
}


/***/ }),

/***/ "./src/framework/common/Singleton.ts":
/*!*******************************************!*\
  !*** ./src/framework/common/Singleton.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Singleton": () => (/* binding */ Singleton)
/* harmony export */ });
class Singleton {
    static Instance(c) {
        if (this.instance == null) {
            this.instance = new c();
        }
        return this.instance;
    }
}
Singleton.instance = null;


/***/ }),

/***/ "./src/framework/core/ArrayMap.ts":
/*!****************************************!*\
  !*** ./src/framework/core/ArrayMap.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ArrayMap": () => (/* binding */ ArrayMap)
/* harmony export */ });
class ArrayMap {
    constructor() {
        this._arr = new Array();
        this._map = new Map();
    }
    add(key, value) {
        this._map.set(key, value);
        this._arr.push(value);
        return value;
    }
    get(key) {
        return this._map.get(key);
    }
    remove(key) {
        var obj = this._map.get(key);
        if (!obj)
            return null;
        var index = this._arr.indexOf(obj);
        this._arr.splice(index, 1);
        this._map.delete(key);
        return obj;
    }
    /**
     * 返回新的数组实例
     */
    getArr() {
        return this._arr;
    }
    dispose() {
        this._arr.length = 0;
        this._map.clear();
    }
}


/***/ }),

/***/ "./src/framework/entity/AEntity.ts":
/*!*****************************************!*\
  !*** ./src/framework/entity/AEntity.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AEntity": () => (/* binding */ AEntity)
/* harmony export */ });
/* harmony import */ var _core_ArrayMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/ArrayMap */ "./src/framework/core/ArrayMap.ts");
/* harmony import */ var _logger_Logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../logger/Logger */ "./src/framework/logger/Logger.ts");


class AEntity {
    constructor() {
        this.uuid = 0;
        this.eventsMap = new Map();
        this.components = new Map();
        this.parent = null;
        this._children = new _core_ArrayMap__WEBPACK_IMPORTED_MODULE_0__.ArrayMap();
        this._typeChildren = new Map();
    }
    addChild(child, c) {
        child.parent = this;
        this._children.add(child.uuid, child);
        let childrenArr = this._typeChildren.get(c.name);
        if (childrenArr == null) {
            childrenArr = new Array();
            this._typeChildren.set(c.name, childrenArr);
        }
        childrenArr.push(child);
    }
    removeChild(child) {
        let entity = this._children.remove(child.uuid);
        entity.dispose();
    }
    getChildren() {
        return this._children.getArr();
    }
    getChildByUUID(uuid) {
        return this._children.get(uuid);
    }
    getChildrenByType(c) {
        return this._typeChildren.get(c.name);
    }
    getChildByType(c) {
        return this.getChildrenByType(c)[0];
    }
    addComponent(c) {
        let cc = new c();
        cc.entity = this;
        this.components[c.name] = cc;
        return cc;
    }
    getComponent(c) {
        return this.components[c.name];
    }
    getOrAddComponent(c) {
        let com = this.getComponent(c);
        if (com == null) {
            com = this.addComponent(c);
        }
        return com;
    }
    publish(event, c) {
        let array = this.eventsMap.get(c.name);
        if (array == null || array.length == 0) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_1__.Logger.log("this event not subscribed...");
            return;
        }
        for (let i = 0; i < array.length; i++) {
            let f = array[i];
            if (f != null)
                f(event);
        }
    }
    subscribe(action, c) {
        let array = this.eventsMap.get(c.name);
        if (array == null) {
            array = new Array();
            this.eventsMap.set(c.name, array);
        }
        array.push(action);
    }
    unSubscribe(action, c) {
        let array = this.eventsMap.get(c.name);
        let index = array.indexOf(action, 0);
        if (index > -1) {
            array.splice(index, 1);
        }
    }
    dispose() {
        let children = this.getChildren;
        for (let i = 0; i < children.length; i++) {
            children[i].dispose();
        }
        this.components.clear();
        this.eventsMap.clear();
        this._typeChildren.clear();
        this._children.dispose();
        this.parent = null;
    }
}


/***/ }),

/***/ "./src/framework/entity/Component.ts":
/*!*******************************************!*\
  !*** ./src/framework/entity/Component.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Component": () => (/* binding */ Component)
/* harmony export */ });
class Component {
    publish(event, c) {
        this.entity.publish(event, c);
    }
    subscribe(action, c) {
        this.entity.subscribe(action, c);
    }
    unSubscribe(action, c) {
        this.entity.unSubscribe(action, c);
    }
}


/***/ }),

/***/ "./src/framework/entity/EntityFactory.ts":
/*!***********************************************!*\
  !*** ./src/framework/entity/EntityFactory.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EntityFactory": () => (/* binding */ EntityFactory)
/* harmony export */ });
/* harmony import */ var _common_Singleton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/Singleton */ "./src/framework/common/Singleton.ts");

class EntityFactory extends _common_Singleton__WEBPACK_IMPORTED_MODULE_0__.Singleton {
    constructor() {
        super(...arguments);
        this.autoID = 0;
    }
    create(c) {
        let cc = new c();
        cc.uuid = ++this.autoID;
        cc.onAwake(null);
        return cc;
    }
    createWithData(initData, c) {
        let cc = new c();
        cc.uuid = ++this.autoID;
        cc.onAwake(initData);
        return cc;
    }
}


/***/ }),

/***/ "./src/framework/logger/Logger.ts":
/*!****************************************!*\
  !*** ./src/framework/logger/Logger.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Logger": () => (/* binding */ Logger)
/* harmony export */ });
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! csharp */ "csharp");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(csharp__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../global/GameConfig */ "./src/global/GameConfig.ts");


var LogType;
(function (LogType) {
    LogType[LogType["Error"] = 0] = "Error";
    LogType[LogType["Assert"] = 1] = "Assert";
    LogType[LogType["Warning"] = 2] = "Warning";
    LogType[LogType["Log"] = 3] = "Log";
    LogType[LogType["Exception"] = 4] = "Exception";
})(LogType || (LogType = {}));
class Logger {
    static getPrintStack(type, showStack, ...args) {
        let message = '';
        for (let i = 0; i < args.length; i++) {
            const element = args[i];
            if (typeof element === 'object' && Logger.LOG_OBJECT_TO_JSON) {
                message += JSON.stringify(element);
            }
            else {
                message += element;
            }
            if (i < args.length - 1) {
                message += ' ';
            }
        }
        if (showStack || csharp__WEBPACK_IMPORTED_MODULE_0__.UnityEngine.Application.isEditor) {
            var stacks = new Error().stack.split('\n');
            for (let i = 3; i < stacks.length; i++) {
                const line = stacks[i];
                message += '\n';
                message += line;
            }
        }
        if (!Logger.unity_log_target) {
            Logger.unity_log_target = new csharp__WEBPACK_IMPORTED_MODULE_0__.UnityEngine.Object();
        }
        return message;
    }
    static log(...args) {
        if (!_global_GameConfig__WEBPACK_IMPORTED_MODULE_1__.GameConfig.debug)
            return;
        let msg = Logger.getPrintStack(LogType.Log, true, args);
        console.log(msg);
    }
    /**
     * Outputs a warning message to the Logger.
     * @param message  list of JavaScript objects to output. The string representations of each of these objects are appended together in the order listed and output.
     */
    static warn(...args) {
        if (!_global_GameConfig__WEBPACK_IMPORTED_MODULE_1__.GameConfig.debug)
            return;
        let msg = Logger.getPrintStack(LogType.Warning, true, args);
        console.warn(msg);
    }
    /**
     * Outputs an error message to the Logger.
     * @param message A list of JavaScript objects to output. The string representations of each of these objects are appended together in the order listed and output.
     */
    static error(...args) {
        if (!_global_GameConfig__WEBPACK_IMPORTED_MODULE_1__.GameConfig.debug)
            return;
        let msg = Logger.getPrintStack(LogType.Error, true, args);
        console.error(msg);
    }
    /** Outputs a stack trace to the Logger.
     * @param message A list of JavaScript objects to output. The string representations of each of these objects are appended together in the order listed and output.
    */
    static trace(...args) {
        if (!_global_GameConfig__WEBPACK_IMPORTED_MODULE_1__.GameConfig.debug)
            return;
        let msg = Logger.getPrintStack(LogType.Log, true, args);
        console.log(msg);
    }
    /** Log JavaScript Objects as JSON format */
    static LOG_OBJECT_TO_JSON(...args) {
        return false;
    }
}
Logger.unity_log_target = null;


/***/ }),

/***/ "./src/framework/net/GameSession.ts":
/*!******************************************!*\
  !*** ./src/framework/net/GameSession.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameSession": () => (/* binding */ GameSession),
/* harmony export */   "MsgPack": () => (/* binding */ MsgPack)
/* harmony export */ });
/* harmony import */ var _common_Singleton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/Singleton */ "./src/framework/common/Singleton.ts");
/* harmony import */ var _data_pb_Opcode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../data/pb/Opcode */ "./src/data/pb/Opcode.ts");
/* harmony import */ var _NetErrorCode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NetErrorCode */ "./src/framework/net/NetErrorCode.ts");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! csharp */ "csharp");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(csharp__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _MessageParser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MessageParser */ "./src/framework/net/MessageParser.ts");
/* harmony import */ var _logger_Logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../logger/Logger */ "./src/framework/logger/Logger.ts");






class MsgPack {
    constructor() {
        this.retryTimes = 0;
    }
}
class GameSession extends _common_Singleton__WEBPACK_IMPORTED_MODULE_0__.Singleton {
    constructor() {
        super();
        this.id = 0; //session ID
        this.reSendInterval = 10000; //10秒重发一次
        this.timeoutInterval = 5000; //5秒检查一次是否超时
        this.maxReSendTimes = 5; //最大重发次数
        this._rpcId = 1;
        this.requestCallback = new Map();
        this.listeners = new Map();
        //返回的服务器ID, 类型
        this._serverId = -1;
        this._serverType = 1;
    }
    get rpcId() {
        return ++this._rpcId;
    }
    //address-> ip:port
    connectChannel(address, connCaback) {
        this.channel = csharp__WEBPACK_IMPORTED_MODULE_3__.NiceTS.TService.Instance.GetChannel();
        this.channel.errorCallback = (channel, code) => {
            if (code == _NetErrorCode__WEBPACK_IMPORTED_MODULE_2__.NetErrorCode.ERR_SocketConnSucc) {
                this.timeoutIimer = setInterval(() => {
                    this.checkTimeoutMsg();
                }, this.timeoutInterval);
            }
            connCaback(channel, code);
        };
        this.channel.readCallback = (buffer) => {
            this.onReceive(buffer);
        };
        this.channel.Connect(address);
        return this;
    }
    //接收服务器通知
    listen(opcode, callback) {
        this.listeners.set(opcode, callback);
    }
    //发送protoubf消息
    //消息： rpc_id[4] - opcode[2] - server_id[2] - server_type[1] - 
    send(opcode, rpcid, message, callBack) {
        //封装消息：
        let rpcBuf = _MessageParser__WEBPACK_IMPORTED_MODULE_4__.MessageParser.encodeInt(rpcid); //4
        let opcodeBuf = _MessageParser__WEBPACK_IMPORTED_MODULE_4__.MessageParser.encodeShort(opcode); //2
        let serveridBuf = _MessageParser__WEBPACK_IMPORTED_MODULE_4__.MessageParser.encodeShort(this._serverId); //2
        let servertypeBuf = _MessageParser__WEBPACK_IMPORTED_MODULE_4__.MessageParser.encodeByte(this._serverType); //1
        let sendArray = new Uint8Array(4 + 2 + 2 + 1 + message.length);
        sendArray.set(rpcBuf);
        sendArray.set(opcodeBuf, 4);
        sendArray.set(serveridBuf, 4 + 2);
        sendArray.set(servertypeBuf, 4 + 2 + 2);
        sendArray.set(message, 4 + 2 + 2 + 1);
        if (callBack != null) {
            let msgPack = new MsgPack();
            msgPack.sendTime = new Date().getTime();
            msgPack.callback = callBack;
            msgPack.bytes = sendArray;
            this.requestCallback.set(rpcid, msgPack);
        }
        // for(let i in sendArray){
        //     Logger.log("TS -- send array: "+i);
        // }
        //Logger.log("send array: "+sendArray);
        this.channel.Send(sendArray);
    }
    reSend(bytes) {
        this.channel.Send(bytes);
    }
    onReceive(buffer) {
        let msgBuf = new Uint8Array(buffer);
        let rpcid = _MessageParser__WEBPACK_IMPORTED_MODULE_4__.MessageParser.decodeInt(msgBuf.subarray(0, 4));
        let opcode = _MessageParser__WEBPACK_IMPORTED_MODULE_4__.MessageParser.decodeShort(msgBuf.subarray(4, 6));
        let serverid = _MessageParser__WEBPACK_IMPORTED_MODULE_4__.MessageParser.decodeShort(msgBuf.subarray(6, 8));
        let servertype = _MessageParser__WEBPACK_IMPORTED_MODULE_4__.MessageParser.decodeByte(msgBuf.subarray(8, 9));
        this._serverId = serverid;
        this._serverType = servertype;
        let msgBytes = msgBuf.subarray(9);
        try {
            let decodeMsg = _data_pb_Opcode__WEBPACK_IMPORTED_MODULE_1__.Opcode.decode(opcode, msgBytes);
            if (rpcid == undefined || !this.requestCallback.has(rpcid)) {
                //检查是否是服务器下发的消息
                if (this.listeners.has(opcode)) {
                    let listen = this.listeners.get(opcode);
                    listen(decodeMsg.msgObj);
                }
            }
            else {
                let msgPack = this.requestCallback.get(rpcid);
                msgPack.callback(decodeMsg.msgObj);
                this.requestCallback.delete(rpcid);
            }
        }
        catch (e) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_5__.Logger.error("parse msg error, opcode:" + opcode);
        }
    }
    checkTimeoutMsg() {
        let currTime = new Date().getTime();
        this.requestCallback.forEach((value, key) => {
            if (value.retryTimes >= this.maxReSendTimes) {
                //超过最大重发次数，丢弃
                _logger_Logger__WEBPACK_IMPORTED_MODULE_5__.Logger.log(`Message resend too more, opcode:${key}, lastsend:${value.sendTime}`);
                this.requestCallback.delete(key);
            }
            else {
                if ((currTime - value.sendTime) >= this.reSendInterval) {
                    value.retryTimes++;
                    value.sendTime = currTime;
                    //重发消息
                    this.reSend(value.bytes);
                    _logger_Logger__WEBPACK_IMPORTED_MODULE_5__.Logger.log(`resend message:, opcode:${key}, retry times:${value.retryTimes}`);
                }
            }
        });
    }
    disconnect() {
        clearInterval(this.timeoutIimer);
        this.channel.Dispose();
    }
}


/***/ }),

/***/ "./src/framework/net/HttpManager.ts":
/*!******************************************!*\
  !*** ./src/framework/net/HttpManager.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HttpManager": () => (/* binding */ HttpManager)
/* harmony export */ });
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! csharp */ "csharp");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(csharp__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var puerts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! puerts */ "puerts");
/* harmony import */ var puerts__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(puerts__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _logger_Logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../logger/Logger */ "./src/framework/logger/Logger.ts");
/* harmony import */ var _common_Singleton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/Singleton */ "./src/framework/common/Singleton.ts");




class HttpManager extends _common_Singleton__WEBPACK_IMPORTED_MODULE_3__.Singleton {
    constructor() {
        super();
    }
    async get(url) {
        try {
            let task = csharp__WEBPACK_IMPORTED_MODULE_0__.NiceTS.HttpManager.Get(url);
            let txt = await (0,puerts__WEBPACK_IMPORTED_MODULE_1__.$promise)(task);
            return txt;
        }
        catch (ex) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_2__.Logger.error(`Get error :${url} : ${ex}`);
            return null;
        }
    }
    async post(url, form) {
        try {
            let task = csharp__WEBPACK_IMPORTED_MODULE_0__.NiceTS.HttpManager.Post(url, form);
            let txt = await (0,puerts__WEBPACK_IMPORTED_MODULE_1__.$promise)(task);
            return txt;
        }
        catch (ex) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_2__.Logger.error(`Post error :${url} : ${ex}`);
            return null;
        }
    }
}


/***/ }),

/***/ "./src/framework/net/MessageParser.ts":
/*!********************************************!*\
  !*** ./src/framework/net/MessageParser.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MessageParser": () => (/* binding */ MessageParser)
/* harmony export */ });
class MessageParser {
    static encodeInt(n) {
        let buffer = new Uint8Array(4);
        buffer[0] = n >>> 24;
        buffer[1] = n >>> 16;
        buffer[2] = n >>> 8;
        buffer[3] = n & 0xff;
        return buffer;
    }
    static decodeInt(buffer) {
        let n = buffer[0] << 24 | buffer[1] << 16 | buffer[2] << 8 | buffer[3];
        return n;
    }
    static encodeShort(n) {
        let buffer = new Uint8Array(2);
        buffer[0] = n >>> 8;
        buffer[1] = n & 0xff;
        return buffer;
    }
    static decodeShort(buffer) {
        let n = buffer[0] << 8 | buffer[1];
        return n;
    }
    static encodeByte(n) {
        let buffer = new Uint8Array(1);
        buffer[0] = n & 0xff;
        return buffer;
    }
    static decodeByte(buffer) {
        let n = buffer[0];
        return n;
    }
}


/***/ }),

/***/ "./src/framework/net/NetErrorCode.ts":
/*!*******************************************!*\
  !*** ./src/framework/net/NetErrorCode.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NetErrorCode": () => (/* binding */ NetErrorCode)
/* harmony export */ });
class NetErrorCode {
}
NetErrorCode.ERR_SocketConnSucc = 100000;
NetErrorCode.ERR_ConnectGateKeyError = 100006;
NetErrorCode.ERR_PeerDisconnect = 102008;
NetErrorCode.ERR_SocketCantSend = 102009;
NetErrorCode.ERR_SocketError = 102010;
NetErrorCode.ERR_SocketConnError = 102011;


/***/ }),

/***/ "./src/framework/net/SessionManager.ts":
/*!*********************************************!*\
  !*** ./src/framework/net/SessionManager.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SessionManager": () => (/* binding */ SessionManager)
/* harmony export */ });
/* harmony import */ var _data_pb_Opcode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../data/pb/Opcode */ "./src/data/pb/Opcode.ts");
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../global/GameConfig */ "./src/global/GameConfig.ts");
/* harmony import */ var _common_Singleton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/Singleton */ "./src/framework/common/Singleton.ts");
/* harmony import */ var _logger_Logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../logger/Logger */ "./src/framework/logger/Logger.ts");
/* harmony import */ var _GameSession__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./GameSession */ "./src/framework/net/GameSession.ts");
/* harmony import */ var _NetErrorCode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NetErrorCode */ "./src/framework/net/NetErrorCode.ts");






class SessionManager extends _common_Singleton__WEBPACK_IMPORTED_MODULE_2__.Singleton {
    get realmRpcID() {
        return this.sessionReam.rpcId;
    }
    get gateRpcID() {
        return this.sessionGate.rpcId;
    }
    async connectRealmServer() {
        let promise = new Promise(resove => {
            this.sessionReam = _GameSession__WEBPACK_IMPORTED_MODULE_4__.GameSession.Instance(_GameSession__WEBPACK_IMPORTED_MODULE_4__.GameSession).connectChannel(_global_GameConfig__WEBPACK_IMPORTED_MODULE_1__.GameConfig.realmServerIP + ":" + _global_GameConfig__WEBPACK_IMPORTED_MODULE_1__.GameConfig.realmServerPort, (channel, code) => {
                if (code == _NetErrorCode__WEBPACK_IMPORTED_MODULE_5__.NetErrorCode.ERR_SocketConnSucc) {
                    this.sessionReam.id = channel.Id;
                    resove(true);
                }
                else {
                    resove(false);
                    _logger_Logger__WEBPACK_IMPORTED_MODULE_3__.Logger.error("login reamserver err, code: " + code + ",id:" + channel.Id);
                }
            });
        });
        return promise;
    }
    disconnectRealmServer() {
        this.sessionReam.disconnect();
        this.sessionReam = null;
    }
    async sendRealmMsg(opcode, msg) {
        let rpcID = this.sessionReam.rpcId;
        let promise = new Promise((resove) => {
            let buf = _data_pb_Opcode__WEBPACK_IMPORTED_MODULE_0__.Opcode.encode(opcode, msg);
            this.sessionReam.send(opcode, rpcID, buf, (response) => {
                resove(response);
            });
        });
        return promise;
    }
    async connectGateServer(address) {
        let promise = new Promise(resove => {
            this.sessionGate = _GameSession__WEBPACK_IMPORTED_MODULE_4__.GameSession.Instance(_GameSession__WEBPACK_IMPORTED_MODULE_4__.GameSession).connectChannel(address, (channel, code) => {
                _logger_Logger__WEBPACK_IMPORTED_MODULE_3__.Logger.log("login Gate Server: " + code);
                if (code == _NetErrorCode__WEBPACK_IMPORTED_MODULE_5__.NetErrorCode.ERR_SocketConnSucc) {
                    this.sessionGate.id = channel.Id;
                    resove(true);
                }
                else {
                    resove(false);
                    _logger_Logger__WEBPACK_IMPORTED_MODULE_3__.Logger.error("gate server err, code: " + code + ",id:" + channel.Id);
                }
            });
        });
        return promise;
    }
    disconnectGateServer() {
        this.sessionGate.disconnect();
        this.sessionGate = null;
    }
    async sendGateMsg(opcode, msg) {
        let rpcID = this.sessionGate.rpcId;
        let promise = new Promise((resove) => {
            let buf = _data_pb_Opcode__WEBPACK_IMPORTED_MODULE_0__.Opcode.encode(opcode, msg);
            this.sessionGate.send(opcode, rpcID, buf, (response) => {
                resove(response);
            });
        });
        return promise;
    }
}


/***/ }),

/***/ "./src/framework/redhints/RedHintsManager.ts":
/*!***************************************************!*\
  !*** ./src/framework/redhints/RedHintsManager.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RedHintsManager": () => (/* binding */ RedHintsManager),
/* harmony export */   "enumRedHints": () => (/* binding */ enumRedHints)
/* harmony export */ });
/* harmony import */ var _common_Singleton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/Singleton */ "./src/framework/common/Singleton.ts");
/* harmony import */ var _logger_Logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../logger/Logger */ "./src/framework/logger/Logger.ts");
/* harmony import */ var _RedHintsMessageManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RedHintsMessageManager */ "./src/framework/redhints/RedHintsMessageManager.ts");



var enumRedHints;
(function (enumRedHints) {
    /** 标记位 */
    enumRedHints[enumRedHints["none"] = 0] = "none";
    /** 聊天 */
    enumRedHints[enumRedHints["chat"] = 1] = "chat";
    /** 聊天世界频道 */
    enumRedHints[enumRedHints["chat_world"] = 2] = "chat_world";
    /** 聊天公会频道 */
    enumRedHints[enumRedHints["chat_family"] = 3] = "chat_family";
    /** 聊天系统频道 */
    enumRedHints[enumRedHints["chat_system"] = 4] = "chat_system";
})(enumRedHints || (enumRedHints = {}));
class RedHintsManager extends _common_Singleton__WEBPACK_IMPORTED_MODULE_0__.Singleton {
    constructor() {
        super();
        this.init();
    }
    init() {
        this._data = [0]; //第一位无意义
        this._parentIndex = [0];
        this._childNum = [0];
        this._childIndex = [0];
        //------------------------记录父子关系-----------------------
        //聊天
        this.setParent(enumRedHints.chat_world, enumRedHints.chat);
        this.setParent(enumRedHints.chat_family, enumRedHints.chat);
        this.setParent(enumRedHints.chat_system, enumRedHints.chat);
    }
    /**
     * 设置红点的开启和关闭
    */
    setRedHintOpenOrClose(red, isOpen) {
        if (this._childNum[red] > 0) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_1__.Logger.log("红点数据设置错误：不能直接对高级的红点数据操作");
            return;
        }
        this.doSetRedHintOpenOrClose(red, isOpen ? 1 : 0);
    }
    /**
     * 记录父子关系：子---父
    */
    setParent(child, parent) {
        if (this._parentIndex[parent] == child) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_1__.Logger.log("关系反了");
            return;
        }
        if (this._parentIndex[child]) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_1__.Logger.log("重复设置");
            return;
        }
        this._parentIndex[child] = parent;
        if (isNaN(this._childNum[parent])) {
            this._childNum[parent] = 0;
        }
        this._childNum[parent]++; //子项数量增加
        this._childIndex[child] = this._childNum[parent]; //子项的索引 从1开始
    }
    doSetRedHintOpenOrClose(red, value) {
        if (this._data[red] != value) {
            this._data[red] = value;
            let _parent = this._parentIndex[red];
            if (_parent) {
                //如果有父级，更新父级
                let index = this._childIndex[red]; //获取在父级中的索引
                this.doSetRedHintOpenOrClose(_parent, value > 0 ? this._data[_parent] | this.addV(index) : this._data[_parent] & this.subV(index)); //设置父级的值
            }
            //发改变事件:全局事件
            //emit(RedHintsManager.RED_HINT_VALUE_CHANGED, red);
            //红点事件，局部事件
            _RedHintsMessageManager__WEBPACK_IMPORTED_MODULE_2__.RedHintsMessageManager.Instance(_RedHintsMessageManager__WEBPACK_IMPORTED_MODULE_2__.RedHintsMessageManager).broadcast(red, value);
        }
    }
    addV(index) {
        return 1 << (index - 1);
    }
    subV(index) {
        return ~this.addV(index);
    }
    /**
     * 查看红点是否开启
    */
    checkRedIsOpen(red) {
        return this._data[red] > 0;
    }
}
/**
 * 红点值改变
*/
RedHintsManager.RED_HINT_VALUE_CHANGED = "RED_HINT_VALUE_CHANGED";


/***/ }),

/***/ "./src/framework/redhints/RedHintsMessageManager.ts":
/*!**********************************************************!*\
  !*** ./src/framework/redhints/RedHintsMessageManager.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RedHintsMessageManager": () => (/* binding */ RedHintsMessageManager)
/* harmony export */ });
/* harmony import */ var _common_Messenger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/Messenger */ "./src/framework/common/Messenger.ts");
/* harmony import */ var _common_Singleton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/Singleton */ "./src/framework/common/Singleton.ts");


class RedHintsMessageManager extends _common_Singleton__WEBPACK_IMPORTED_MODULE_1__.Singleton {
    constructor() {
        super(...arguments);
        this.redhintsMessage = new _common_Messenger__WEBPACK_IMPORTED_MODULE_0__.Messenger();
    }
    addListener(msgCode, obj, listener) {
        this.redhintsMessage.addListener(msgCode, obj, listener);
    }
    removeListener(msgCode, listener) {
        this.redhintsMessage.removeListener(msgCode, listener);
    }
    removeListenerByCode(msgCode) {
        this.redhintsMessage.removeListenerByType(msgCode);
    }
    clearup() {
        this.redhintsMessage.clearup();
    }
    broadcast(msgCode, params) {
        this.redhintsMessage.broadcast(msgCode, params);
    }
}


/***/ }),

/***/ "./src/framework/scene/BaseScene.ts":
/*!******************************************!*\
  !*** ./src/framework/scene/BaseScene.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseScene": () => (/* binding */ BaseScene)
/* harmony export */ });
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../global/GameConfig */ "./src/global/GameConfig.ts");

class BaseScene {
    constructor() {
        this.finishCount = 0;
        this.totalCount = 0;
        this.preloadPrefab = new Map();
        this.finishCount = 0;
    }
    addPreloadPrefab(address, instCount) {
        if (!this.preloadPrefab.has(address)) {
            this.preloadPrefab.set(address, instCount);
            return;
        }
        this.preloadPrefab.set(address, this.preloadPrefab.get(address) + instCount);
    }
    setSceneInstance(sceneInstance) {
        this.sceneInstance = sceneInstance;
    }
    async loadAssetsAsync() {
        this.totalCount = this.preloadPrefab.size;
        let premises = [];
        this.preloadPrefab.forEach((value, key) => {
            let premise = _global_GameConfig__WEBPACK_IMPORTED_MODULE_0__.S.GameObjectPool.preLoadGameObjectAsync(key, value, () => {
                this.finishCount++;
            });
            premises.push(premise);
        });
        await Promise.all(premises);
    }
    onDestroy() {
        //清理资源缓存
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_0__.S.GameObjectPool.cleanup(true);
        //卸载场景
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_0__.S.ResManager.unloadScene(this.sceneInstance);
        this.preloadPrefab.clear();
    }
}


/***/ }),

/***/ "./src/framework/scene/SceneDef.ts":
/*!*****************************************!*\
  !*** ./src/framework/scene/SceneDef.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SceneDef": () => (/* binding */ SceneDef)
/* harmony export */ });
class SceneDef {
}
SceneDef.LoadingScene = "LoadingScene";
SceneDef.GameStart = "GameStartScene";
SceneDef.LaunchScene = "LaunchScene";
SceneDef.HomeScene = "HomeScene";
SceneDef.LoginScene = "LoginScene";
SceneDef.PveScene = "PveScene";


/***/ }),

/***/ "./src/framework/scene/SceneFactory.ts":
/*!*********************************************!*\
  !*** ./src/framework/scene/SceneFactory.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SceneFactory": () => (/* binding */ SceneFactory)
/* harmony export */ });
/* harmony import */ var _game_module_pve_scene_PveScene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game/module/pve/scene/PveScene */ "./src/game/module/pve/scene/PveScene.ts");
/* harmony import */ var _game_module_home_scene_HomeScene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game/module/home/scene/HomeScene */ "./src/game/module/home/scene/HomeScene.ts");
/* harmony import */ var _SceneDef__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SceneDef */ "./src/framework/scene/SceneDef.ts");
/* harmony import */ var _game_module_gamestart_scene_GameStartScene__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../game/module/gamestart/scene/GameStartScene */ "./src/game/module/gamestart/scene/GameStartScene.ts");


// import { LoginScene } from "../../game/module/login/scene/LoginScene";


class SceneFactory {
    static createScene(sceneName) {
        let scene = null;
        switch (sceneName) {
            case _SceneDef__WEBPACK_IMPORTED_MODULE_2__.SceneDef.GameStart:
                scene = new _game_module_gamestart_scene_GameStartScene__WEBPACK_IMPORTED_MODULE_3__.GameStart();
                break;
            // case SceneDef.LoginScene:
            //     scene = new LoginScene();
            //     break;
            case _SceneDef__WEBPACK_IMPORTED_MODULE_2__.SceneDef.HomeScene:
                scene = new _game_module_home_scene_HomeScene__WEBPACK_IMPORTED_MODULE_1__.HomeScene();
                break;
            case _SceneDef__WEBPACK_IMPORTED_MODULE_2__.SceneDef.PveScene:
                scene = new _game_module_pve_scene_PveScene__WEBPACK_IMPORTED_MODULE_0__.PveScene();
                break;
        }
        return scene;
    }
}


/***/ }),

/***/ "./src/framework/scene/SceneManager.ts":
/*!*********************************************!*\
  !*** ./src/framework/scene/SceneManager.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SceneManager": () => (/* binding */ SceneManager)
/* harmony export */ });
/* harmony import */ var _data_ui_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../data/ui/common */ "./src/data/ui/common.ts");
/* harmony import */ var _game_event_UIMessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game/event/UIMessage */ "./src/game/event/UIMessage.ts");
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../global/GameConfig */ "./src/global/GameConfig.ts");
/* harmony import */ var _common_Singleton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/Singleton */ "./src/framework/common/Singleton.ts");
/* harmony import */ var _logger_Logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../logger/Logger */ "./src/framework/logger/Logger.ts");
/* harmony import */ var _SceneFactory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SceneFactory */ "./src/framework/scene/SceneFactory.ts");






class SceneManager extends _common_Singleton__WEBPACK_IMPORTED_MODULE_3__.Singleton {
    constructor() {
        super();
        this.currentScene = null;
    }
    async loadScene(scene) {
        try {
            //打开Loading界面
            _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__.S.UIManager.openLoading(_data_ui_common__WEBPACK_IMPORTED_MODULE_0__.CommonUI.PackageName, _data_ui_common__WEBPACK_IMPORTED_MODULE_0__.CommonUI.UILoadingView);
            //清理旧场景
            if (this.currentScene) {
                this.currentScene.onLeave();
                this.currentScene.onDestroy();
            }
            //开始加载场景
            let sceneInstance = await _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__.S.ResManager.loadScene(scene);
            //开始加载进入场景的资源
            this.currentScene = _SceneFactory__WEBPACK_IMPORTED_MODULE_5__.SceneFactory.createScene(scene);
            this.currentScene.setSceneInstance(sceneInstance);
            this.currentScene.onEnter();
            //设置当前场景加载进度Timer
            let progressInterval = setInterval(() => {
                let progress = this.currentScene.finishCount / this.currentScene.totalCount;
                _logger_Logger__WEBPACK_IMPORTED_MODULE_4__.Logger.log("progress:" + progress + " = " + this.currentScene.finishCount + " = " + this.currentScene.totalCount);
                _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__.S.UIMessageManger.broadcast(_game_event_UIMessage__WEBPACK_IMPORTED_MODULE_1__.UIMessage.MSG_SCENE_PROGRESS, progress * 100);
            }, 100);
            //加载资源
            await this.currentScene.loadAssetsAsync();
            //加载完成
            clearInterval(progressInterval);
            //关闭所有Page
            _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__.S.UIManager.closeAllPanels();
            await this.currentScene.onComplete();
            _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__.S.UIManager.closeLoading();
        }
        catch (ex) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_4__.Logger.log("load scene excep:" + ex);
        }
    }
}


/***/ }),

/***/ "./src/framework/ui/UIBase.ts":
/*!************************************!*\
  !*** ./src/framework/ui/UIBase.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UIBase": () => (/* binding */ UIBase)
/* harmony export */ });
class UIBase {
    //绑定FairyGUI元件
    bindAll(target) {
        for (let k in target["binders"]) {
            let fguiName = this["binders"][k];
            this[k] = this.fui.GetChild(fguiName);
        }
    }
}


/***/ }),

/***/ "./src/framework/ui/UIDefine.ts":
/*!**************************************!*\
  !*** ./src/framework/ui/UIDefine.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UIComDefs": () => (/* binding */ UIComDefs),
/* harmony export */   "UILayerDef": () => (/* binding */ UILayerDef),
/* harmony export */   "UITypeDef": () => (/* binding */ UITypeDef)
/* harmony export */ });
var UITypeDef;
(function (UITypeDef) {
    UITypeDef[UITypeDef["Unkown"] = 0] = "Unkown";
    UITypeDef[UITypeDef["Page"] = 1] = "Page";
    UITypeDef[UITypeDef["Window"] = 2] = "Window";
    UITypeDef[UITypeDef["Widget"] = 3] = "Widget";
    UITypeDef[UITypeDef["Loading"] = 4] = "Loading";
})(UITypeDef || (UITypeDef = {}));
class UILayerDef {
    static getDefaultLayer(type) {
        switch (type) {
            case UITypeDef.Loading: return this.Loading;
            case UITypeDef.Widget: return this.Widget;
            case UITypeDef.Window: return this.NormalWindow;
            case UITypeDef.Page: return this.Page;
            case UITypeDef.Unkown: return this.Unkown;
            default: return this.Unkown;
        }
    }
}
UILayerDef.Background = 0;
UILayerDef.Page = 1000;
UILayerDef.NormalWindow = 2000;
UILayerDef.TopWindow = 3000;
UILayerDef.Widget = 4000;
UILayerDef.Loading = 5000;
UILayerDef.Unkown = 9999;
class UIComDefs {
}
UIComDefs.BackBtn = "back_btn";
UIComDefs.WindowCloseBtn = "win_close_btn";


/***/ }),

/***/ "./src/framework/ui/UIFactory.ts":
/*!***************************************!*\
  !*** ./src/framework/ui/UIFactory.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UIFactory": () => (/* binding */ UIFactory)
/* harmony export */ });
/* harmony import */ var _UILib_UILoading__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UILib/UILoading */ "./src/framework/ui/UILib/UILoading.ts");
/* harmony import */ var _logger_Logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../logger/Logger */ "./src/framework/logger/Logger.ts");
/* harmony import */ var _data_ui_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../data/ui/common */ "./src/data/ui/common.ts");
/* harmony import */ var _data_ui_FlyBird__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../data/ui/FlyBird */ "./src/data/ui/FlyBird.ts");
/* harmony import */ var _data_ui_GameStart__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../data/ui/GameStart */ "./src/data/ui/GameStart.ts");
/* harmony import */ var _game_module_gamestart_ui_UIStartView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../game/module/gamestart/ui/UIStartView */ "./src/game/module/gamestart/ui/UIStartView.ts");






const CS = __webpack_require__(/*! csharp */ "csharp");
class UIFactory {
    static createUI(pkg, name) {
        _logger_Logger__WEBPACK_IMPORTED_MODULE_1__.Logger.log(`create UI: ${pkg}:${name}`);
        let comp = CS.FairyGUI.UIPackage.CreateObject(pkg, name).asCom;
        let ui = this.uiCache.get(name);
        if (!ui) {
            switch (pkg) {
                case _data_ui_common__WEBPACK_IMPORTED_MODULE_2__.CommonUI.PackageName:
                    switch (name) {
                        case _data_ui_common__WEBPACK_IMPORTED_MODULE_2__.CommonUI.UILoadingView:
                            ui = new _UILib_UILoading__WEBPACK_IMPORTED_MODULE_0__.UILoading();
                            break;
                    }
                    break;
                case _data_ui_FlyBird__WEBPACK_IMPORTED_MODULE_3__.FlyBirdUI.PackageName:
                    switch (name) {
                        case _data_ui_FlyBird__WEBPACK_IMPORTED_MODULE_3__.FlyBirdUI.UIMainVIew:
                            // ui = new UILoginPage();
                            break;
                    }
                    break;
                case _data_ui_GameStart__WEBPACK_IMPORTED_MODULE_4__.GameStartUI.PackageName:
                    switch (name) {
                        case _data_ui_GameStart__WEBPACK_IMPORTED_MODULE_4__.GameStartUI.UIStartView:
                            ui = new _game_module_gamestart_ui_UIStartView__WEBPACK_IMPORTED_MODULE_5__.UIStartView();
                            break;
                    }
                    break;
                    // case homeUI.PackageName:
                    //     switch (name){
                    //         case homeUI.UIHomePage:
                    //             ui = new UIHomePage();
                    //             break;
                    //         case homeUI.UIShopPage:
                    //             ui = new UIShopPage();
                    //             break;
                    //     }
                    //     break
                    // case storyUI.PackageName:
                    //     switch (name){
                    //         case storyUI.UIStoryWin:
                    //             ui = new UIStoryWin();
                    //             break;
                    //     }
                    break;
            }
            this.uiCache.set(name, ui);
        }
        if (ui != null) {
            ui.fui = comp;
            ui.name = name;
            ui.pkgName = pkg;
            //绑定FairyGUI控件
            ui.bindAll(ui);
            ui.awake();
        }
        else {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_1__.Logger.error(`not create ui: ${pkg}-${name}`);
        }
        return ui;
    }
}
UIFactory.uiCache = new Map();


/***/ }),

/***/ "./src/framework/ui/UILib/UILoading.ts":
/*!*********************************************!*\
  !*** ./src/framework/ui/UILib/UILoading.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UILoading": () => (/* binding */ UILoading)
/* harmony export */ });
/* harmony import */ var _UIPanel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../UIPanel */ "./src/framework/ui/UIPanel.ts");
/* harmony import */ var _UIDefine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../UIDefine */ "./src/framework/ui/UIDefine.ts");
/* harmony import */ var _common_NiceDecorator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/NiceDecorator */ "./src/framework/common/NiceDecorator.ts");
/* harmony import */ var _game_event_UIMessage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../game/event/UIMessage */ "./src/game/event/UIMessage.ts");
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../global/GameConfig */ "./src/global/GameConfig.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





class UILoading extends _UIPanel__WEBPACK_IMPORTED_MODULE_0__.UIPanel {
    onAwake() {
    }
    get uiType() {
        return _UIDefine__WEBPACK_IMPORTED_MODULE_1__.UITypeDef.Loading;
    }
    onShow(arg) {
        this.progressLoading.value = 0;
        this.progressLoading.visible = true;
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_4__.S.UIMessageManger.addListener(_game_event_UIMessage__WEBPACK_IMPORTED_MODULE_3__.UIMessage.MSG_SCENE_PROGRESS, this, (progress) => {
            this.progressLoading.TweenValue(progress, 0.1);
        });
    }
    onClose(arg) {
        this.progressLoading.visible = false;
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_4__.S.UIMessageManger.removeListenerByCode(_game_event_UIMessage__WEBPACK_IMPORTED_MODULE_3__.UIMessage.MSG_SCENE_PROGRESS);
    }
}
__decorate([
    (0,_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_2__.binder)("loading_pregress")
], UILoading.prototype, "progressLoading", void 0);


/***/ }),

/***/ "./src/framework/ui/UIManager.ts":
/*!***************************************!*\
  !*** ./src/framework/ui/UIManager.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UIManager": () => (/* binding */ UIManager),
/* harmony export */   "UIPageTrack": () => (/* binding */ UIPageTrack)
/* harmony export */ });
/* harmony import */ var _common_Singleton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/Singleton */ "./src/framework/common/Singleton.ts");
/* harmony import */ var _UIFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UIFactory */ "./src/framework/ui/UIFactory.ts");
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../global/GameConfig */ "./src/global/GameConfig.ts");
/* harmony import */ var _logger_Logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../logger/Logger */ "./src/framework/logger/Logger.ts");




class UIPageTrack {
}
class UIManager extends _common_Singleton__WEBPACK_IMPORTED_MODULE_0__.Singleton {
    constructor() {
        super();
        this.m_pageTrackStack = new Array();
        this.m_listLoadedPanel = new Array();
    }
    distroyPanel(panel) {
        if (panel.isOpen) {
            panel.close();
        }
        //卸载资源
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__.S.ResManager.releaseFairyGUIPackage(panel.pkgName);
        panel.dispose();
    }
    distroyAllLoadedPanel() {
        for (let i = this.m_listLoadedPanel.length - 1; i >= 0; i--) {
            let panel = this.m_listLoadedPanel[i];
            this.distroyPanel(panel);
            this.m_listLoadedPanel.splice(i, 1);
        }
    }
    clean() {
        this.distroyAllLoadedPanel();
        this.m_pageTrackStack.length = 0;
        this.m_listLoadedPanel.length = 0;
    }
    getPanelUI(name) {
        for (const panel of this.m_listLoadedPanel) {
            if (panel.name == name) {
                _logger_Logger__WEBPACK_IMPORTED_MODULE_3__.Logger.log("find panel in cache: " + name);
                return panel;
            }
        }
        return null;
    }
    async open(pkg, name, arg) {
        let ui = this.getPanelUI(name);
        if (ui == null) {
            //加载 package
            await _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__.S.ResManager.loadFairyGUIPackage(pkg);
            ui = _UIFactory__WEBPACK_IMPORTED_MODULE_1__.UIFactory.createUI(pkg, name);
            this.m_listLoadedPanel.push(ui);
        }
        if (ui != null) {
            // ###  ui as any 调用私有方法
            ui._internalOpen(arg);
        }
        return ui;
    }
    async openPageWorker(pkg, page, arg) {
        //设置 m_currentPage
        this.m_currentPage = new UIPageTrack();
        this.m_currentPage.pkg = pkg;
        this.m_currentPage.name = page;
        this.m_currentPage.arg = arg;
        //打开新Page
        await _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__.S.ResManager.loadFairyGUIPackage(pkg);
        let ui = _UIFactory__WEBPACK_IMPORTED_MODULE_1__.UIFactory.createUI(pkg, page);
        ui._internalOpen(arg);
        //保存到 m_currentPage
        this.m_currentPage.ui = ui;
        //销毁当前page 中打开的各自Panels
        this.distroyAllLoadedPanel();
        return this.m_currentPage;
    }
    //==========================================================UIPage
    //打开场景页面,此页面不计入页面栈,无返回上一面按钮
    async openPageInScene(pkg, page, arg) {
        let _openPage = await this.openPageWorker(pkg, page, arg);
        if (this.m_lastScensePage) {
            this.distroyPanel(this.m_lastScensePage.ui);
        }
        this.m_lastScensePage = _openPage;
    }
    //打开页面, 会关闭上一个页面上的所有窗口,Widiget等
    async openPage(pkg, name, arg) {
        //1, 检查栈中是否存在此页面
        let len = this.m_pageTrackStack.length;
        for (let i = len - 1; i >= 0; i--) {
            let track = this.m_pageTrackStack[i];
            if (track.pkg == pkg && track.name == name) {
                this.distroyAllLoadedPanel();
                this.distroyPanel(this.m_currentPage.ui);
                track.ui.visible = true;
                track.ui.onShow(track.arg);
                //卸载此页栈上面的界面
                for (let j = len - 1; j > i; j--) {
                    let del_track = this.m_pageTrackStack[j];
                    this.distroyPanel(del_track.ui);
                    this.m_pageTrackStack.slice(j, 1);
                }
                this.m_currentPage = this.m_pageTrackStack.pop();
                return this.m_currentPage;
            }
        }
        //2 先把当前Page入栈
        if (this.m_currentPage != undefined && this.m_currentPage.name != name) {
            this.m_pageTrackStack.push(this.m_currentPage);
        }
        //将栈中其它Page 设为不可见
        for (let track of this.m_pageTrackStack) {
            track.ui.visible = false;
        }
        await this.openPageWorker(pkg, name, arg);
    }
    //返回上一个页面
    async goBackPage() {
        if (this.m_pageTrackStack.length > 0) {
            //关闭当前页面
            this.distroyAllLoadedPanel();
            this.distroyPanel(this.m_currentPage.ui);
            //打开堆栈中的上一页面
            let track = this.m_pageTrackStack.pop();
            track.ui.visible = true;
            this.m_currentPage = track;
            track.ui.onShow(track.arg);
        }
        else {
            await this.enterMainPage();
        }
    }
    //回到主城
    enterMainPage() {
        //将栈中其它Page 设为不可见
        for (let track of this.m_pageTrackStack) {
            this.distroyPanel(track.ui);
        }
        this.m_pageTrackStack.length = 0;
    }
    //==========================================================UILoading
    //打开Loading界面
    async openLoading(pkg, name, arg) {
        if (!this.m_loadingPage) {
            this.m_loadingPage = _UIFactory__WEBPACK_IMPORTED_MODULE_1__.UIFactory.createUI(pkg, name);
        }
        this.m_loadingPage._internalOpen(arg);
    }
    //关闭Loading界面
    closeLoading(arg) {
        if (this.m_loadingPage) {
            this.m_loadingPage.close(arg);
        }
    }
    //==========================================================UIWindow
    //打开窗口
    async openWindow(pkg, name, arg) {
        let ui = await this.open(pkg, name, arg);
        return ui;
    }
    //关闭窗口
    closeWindow(name, arg) {
        let ui = this.getPanelUI(name);
        if (ui != null) {
            ui.close(arg);
        }
    }
    //==========================================================UIWidget
    //打开Widiget
    async openWidget(pkg, name, arg) {
        let ui = await this.open(pkg, name, arg);
        return ui;
    }
    //u关闭Widiget
    closeWidget(name, arg) {
        let ui = this.getPanelUI(name);
        if (ui != null) {
            ui.close(arg);
        }
    }
    closeAllPanels() {
        //删除除Loading界面外的所有Window, Widget
        this.distroyAllLoadedPanel();
        //删除所有Page
        let len = this.m_pageTrackStack.length;
        for (let i = len - 1; i >= 0; i--) {
            let track = this.m_pageTrackStack[i];
            this.distroyPanel(track.ui);
            this.m_pageTrackStack.slice(i, 1);
        }
    }
}


/***/ }),

/***/ "./src/framework/ui/UIPage.ts":
/*!************************************!*\
  !*** ./src/framework/ui/UIPage.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UIPage": () => (/* binding */ UIPage)
/* harmony export */ });
/* harmony import */ var _UIPanel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UIPanel */ "./src/framework/ui/UIPanel.ts");
/* harmony import */ var _UIDefine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UIDefine */ "./src/framework/ui/UIDefine.ts");
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../global/GameConfig */ "./src/global/GameConfig.ts");



class UIPage extends _UIPanel__WEBPACK_IMPORTED_MODULE_0__.UIPanel {
    get uiType() {
        return _UIDefine__WEBPACK_IMPORTED_MODULE_1__.UITypeDef.Page;
    }
    onAwake() {
        this.m_btnGoBack = this.fui.GetChild(_UIDefine__WEBPACK_IMPORTED_MODULE_1__.UIComDefs.BackBtn);
        if (this.m_btnGoBack != undefined) {
            this.m_btnGoBack.onClick.Add(() => {
                this.onBtnGoBack();
            });
        }
    }
    onShow(vo) {
    }
    onClose(arg) {
    }
    onBtnGoBack() {
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__.S.UIManager.goBackPage();
    }
}


/***/ }),

/***/ "./src/framework/ui/UIPanel.ts":
/*!*************************************!*\
  !*** ./src/framework/ui/UIPanel.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UIPanel": () => (/* binding */ UIPanel)
/* harmony export */ });
/* harmony import */ var _UIDefine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UIDefine */ "./src/framework/ui/UIDefine.ts");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! csharp */ "csharp");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(csharp__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../global/GameConfig */ "./src/global/GameConfig.ts");
/* harmony import */ var _UIBase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UIBase */ "./src/framework/ui/UIBase.ts");
/* harmony import */ var _common_List__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/List */ "./src/framework/common/List.ts");





class UIPanel extends _UIBase__WEBPACK_IMPORTED_MODULE_3__.UIBase {
    constructor() {
        super(...arguments);
        this._components = new _common_List__WEBPACK_IMPORTED_MODULE_4__.List();
        this._uiComponents = new _common_List__WEBPACK_IMPORTED_MODULE_4__.List();
        this.m_layer = _UIDefine__WEBPACK_IMPORTED_MODULE_0__.UILayerDef.Unkown;
    }
    set name(v) {
        this._name = v;
    }
    get name() {
        return this._name;
    }
    get uiType() {
        return _UIDefine__WEBPACK_IMPORTED_MODULE_0__.UITypeDef.Unkown;
    }
    get layer() {
        return this.m_layer;
    }
    set layer(v) {
        this.m_layer = v;
    }
    get isOpen() {
        return this.fui.visible;
    }
    set visible(isActivate) {
        this.fui.visible = isActivate;
    }
    onDispose() { }
    ;
    onUpdate() { }
    awake() {
        this.onAwake();
    }
    startTimer() {
        if (!this._timer)
            this._timer = setInterval(this.update.bind(this), 200);
    }
    update() {
        this.onUpdate();
    }
    /**
     * 此私有方法在UI Manager中调用 ，特殊调用。
     * @param arg
     */
    _internalOpen(arg) {
        this.layer = _UIDefine__WEBPACK_IMPORTED_MODULE_0__.UILayerDef.getDefaultLayer(this.uiType);
        csharp__WEBPACK_IMPORTED_MODULE_1__.FairyGUI.GRoot.inst.AddChild(this.fui);
        this.onShow(arg);
    }
    async createComponent(pkg, name, cls) {
        //加载组件Package资源
        if (pkg != this.pkgName && !this._components.contains(pkg)) {
            await _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__.S.ResManager.loadFairyGUIPackage(pkg);
            this._components.add(pkg);
        }
        let comp = new cls();
        comp.createUI(pkg, name);
        this._uiComponents.add(comp);
        return comp;
    }
    close(arg = null) {
        this.onClose(arg);
        csharp__WEBPACK_IMPORTED_MODULE_1__.FairyGUI.GRoot.inst.RemoveChild(this.fui);
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = null;
        }
    }
    dispose() {
        //卸载组件Package
        this._components.foreach(element => {
            _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__.S.ResManager.releaseFairyGUIPackage(element);
        });
        this._uiComponents.forEach(element => {
            element.onClose();
            if (element.parent != undefined && element.parent != null) {
                element.parent.RemoveChild(element.fui);
            }
            element.fui.Dispose();
        });
        this._components.clear();
        this._uiComponents.clear();
        this.fui.Dispose();
        this.onDispose();
    }
}


/***/ }),

/***/ "./src/framework/util/TimeUtil.ts":
/*!****************************************!*\
  !*** ./src/framework/util/TimeUtil.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TimeUtil": () => (/* binding */ TimeUtil)
/* harmony export */ });
/* harmony import */ var _logger_Logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../logger/Logger */ "./src/framework/logger/Logger.ts");

class TimeUtil {
    static prefixInteger(num, length) {
        return (Array(length).join('0') + num).slice(-length);
    }
    //将一个时间数转换成"00:00:00"格式
    static getTimeString1(timeInt) {
        if (timeInt <= 0) {
            return "00:00:00";
        }
        else {
            let hour = Math.floor(timeInt / (60 * 60));
            let hourstr = this.prefixInteger(hour, 2);
            let minnute = Math.floor(timeInt / 60) % 60;
            let minutestr = this.prefixInteger(minnute, 2);
            let second = timeInt % 60;
            let secondstr = this.prefixInteger(second, 2);
            return `${hourstr}:${minutestr}:${secondstr}`;
        }
    }
    //将一个时间数转换成"00:00"格式
    static getTimeString(timeInt) {
        if (timeInt <= 0) {
            return "00:00:00";
        }
        else {
            let hour = Math.floor(timeInt / (60 * 60));
            let hourstr = this.prefixInteger(hour, 2);
            let minnute = Math.floor(timeInt / 60) % 60;
            let minutestr = this.prefixInteger(minnute, 2);
            return `${hourstr}:${minutestr}`;
        }
    }
    //将一个时间数转换成"00"分格式
    static getTimeMinuteString(timeInt) {
        if (timeInt <= 0) {
            return "00:00:00";
        }
        else {
            let minnute = Math.floor(timeInt / 60) % 60;
            let minutestr = this.prefixInteger(minnute, 2);
            return `${minutestr}`;
        }
    }
    //将一个时间数转换成"00“秒格式
    static getTimeSecondString(timeInt) {
        if (timeInt <= 0) {
            return "00:00:00";
        }
        else {
            let second = timeInt % 60;
            let secondstr = this.prefixInteger(second, 2);
            return `${secondstr}`;
        }
    }
    //获取本月1号是星期几
    static getWeekOfMonthFirstDay(time) {
        let date = new Date(time);
        date.setDate(1);
        return date.getDay();
    }
    //判断是否为闰年
    static isLeapYear(year) {
        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
            return true;
        }
        return false;
    }
    static getMonthDays_(year, month) {
        if (month == 2) {
            if (this.isLeapYear(year))
                return 29;
            else {
                return 28;
            }
        }
        else {
            return this.months[month];
        }
    }
    static getMonthDays(time) {
        let t = new Date(time);
        return this.getMonthDays_(t.getFullYear(), t.getMonth());
    }
    static async sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('');
            }, ms);
        });
    }
    static test() {
        let t1 = this.getTimeString1(5000);
        _logger_Logger__WEBPACK_IMPORTED_MODULE_0__.Logger.log(t1);
        let t2 = this.getTimeString(5000);
        _logger_Logger__WEBPACK_IMPORTED_MODULE_0__.Logger.log(t2);
        let t3 = this.getTimeMinuteString(5000);
        _logger_Logger__WEBPACK_IMPORTED_MODULE_0__.Logger.log(t3);
        let t4 = this.getTimeSecondString(5000);
        _logger_Logger__WEBPACK_IMPORTED_MODULE_0__.Logger.log(t4);
        let time = new Date().getTime();
        let t5 = this.getWeekOfMonthFirstDay(time);
        _logger_Logger__WEBPACK_IMPORTED_MODULE_0__.Logger.log("getWeekOfMonthFirstDay: " + t5 + " ,time:" + time);
        let t6 = this.getMonthDays(time);
        _logger_Logger__WEBPACK_IMPORTED_MODULE_0__.Logger.log("getMonthDays: " + t6);
    }
}
//每个月对应的天数
TimeUtil.months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


/***/ }),

/***/ "./src/game/api/LoginAPI.ts":
/*!**********************************!*\
  !*** ./src/game/api/LoginAPI.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginAPI": () => (/* binding */ LoginAPI)
/* harmony export */ });
/* harmony import */ var _data_pb_gen_pb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../data/pb/gen/pb */ "./src/data/pb/gen/pb.js");
/* harmony import */ var _data_pb_gen_pb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_data_pb_gen_pb__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _data_pb_Opcode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../data/pb/Opcode */ "./src/data/pb/Opcode.ts");
/* harmony import */ var _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../framework/logger/Logger */ "./src/framework/logger/Logger.ts");
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../global/GameConfig */ "./src/global/GameConfig.ts");




class LoginAPI {
    static async benchmarkTest() {
        for (let i = 1; i < 2; i++) {
            let msg = _data_pb_gen_pb__WEBPACK_IMPORTED_MODULE_0__.nice_ts.C2GS_Test.create();
            msg.testID = i;
            msg.testName = "benchmark test";
            let response = await _global_GameConfig__WEBPACK_IMPORTED_MODULE_3__.S.SessionManager.sendGateMsg(_data_pb_Opcode__WEBPACK_IMPORTED_MODULE_1__.Opcode.MSG_C2GS_Test, msg);
            let test = response;
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_2__.Logger.log("code: " + test.Error + ",msg:" + test.Message + ",res:" + test.testResponse);
        }
    }
    static async loginRealmServer(account, password) {
        let msg = _data_pb_gen_pb__WEBPACK_IMPORTED_MODULE_0__.nice_ts.C2R_Login.create();
        msg.Account = account;
        msg.Password = password;
        let response = await _global_GameConfig__WEBPACK_IMPORTED_MODULE_3__.S.SessionManager.sendRealmMsg(_data_pb_Opcode__WEBPACK_IMPORTED_MODULE_1__.Opcode.MSG_C2R_Login, msg);
        return response;
    }
    static async loginGateServer(gateId, gateKey) {
        let msg = _data_pb_gen_pb__WEBPACK_IMPORTED_MODULE_0__.nice_ts.C2G_LoginGate.create();
        msg.GateId = gateId;
        msg.Key = gateKey;
        let response = await _global_GameConfig__WEBPACK_IMPORTED_MODULE_3__.S.SessionManager.sendGateMsg(_data_pb_Opcode__WEBPACK_IMPORTED_MODULE_1__.Opcode.MSG_C2G_LoginGate, msg);
        return response;
    }
}


/***/ }),

/***/ "./src/game/entity/Player.ts":
/*!***********************************!*\
  !*** ./src/game/entity/Player.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _framework_entity_AEntity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../framework/entity/AEntity */ "./src/framework/entity/AEntity.ts");

class Player extends _framework_entity_AEntity__WEBPACK_IMPORTED_MODULE_0__.AEntity {
    onAwake(initData) {
    }
    constructor() {
        super();
        this.level = 1;
        this.hp = 100;
    }
}


/***/ }),

/***/ "./src/game/entity/PlayerManager.ts":
/*!******************************************!*\
  !*** ./src/game/entity/PlayerManager.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlayerManager": () => (/* binding */ PlayerManager)
/* harmony export */ });
/* harmony import */ var _framework_common_Singleton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../framework/common/Singleton */ "./src/framework/common/Singleton.ts");
/* harmony import */ var _framework_entity_EntityFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../framework/entity/EntityFactory */ "./src/framework/entity/EntityFactory.ts");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Player */ "./src/game/entity/Player.ts");



class PlayerManager extends _framework_common_Singleton__WEBPACK_IMPORTED_MODULE_0__.Singleton {
    getPlayer(reCreate = false) {
        if (reCreate) {
            this.player = null;
            this.player = _framework_entity_EntityFactory__WEBPACK_IMPORTED_MODULE_1__.EntityFactory.Instance(_framework_entity_EntityFactory__WEBPACK_IMPORTED_MODULE_1__.EntityFactory).create(_Player__WEBPACK_IMPORTED_MODULE_2__.Player);
        }
        else {
            if (this.player == null) {
                this.player = _framework_entity_EntityFactory__WEBPACK_IMPORTED_MODULE_1__.EntityFactory.Instance(_framework_entity_EntityFactory__WEBPACK_IMPORTED_MODULE_1__.EntityFactory).create(_Player__WEBPACK_IMPORTED_MODULE_2__.Player);
            }
        }
        return this.player;
    }
}


/***/ }),

/***/ "./src/game/entity/component/BagComponent.ts":
/*!***************************************************!*\
  !*** ./src/game/entity/component/BagComponent.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BagComponent": () => (/* binding */ BagComponent)
/* harmony export */ });
/* harmony import */ var _framework_entity_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../framework/entity/Component */ "./src/framework/entity/Component.ts");

class BagComponent extends _framework_entity_Component__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor() {
        super(...arguments);
        this.name = "hello";
        this.size = 100;
    }
}


/***/ }),

/***/ "./src/game/entity/component/PlayerInfoComponent.ts":
/*!**********************************************************!*\
  !*** ./src/game/entity/component/PlayerInfoComponent.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlayerInfoComponent": () => (/* binding */ PlayerInfoComponent)
/* harmony export */ });
/* harmony import */ var _framework_entity_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../framework/entity/Component */ "./src/framework/entity/Component.ts");

class PlayerInfoComponent extends _framework_entity_Component__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor() {
        super(...arguments);
        this.nickName = "Justin";
        this.money = 1000001;
    }
}


/***/ }),

/***/ "./src/game/event/UIMessage.ts":
/*!*************************************!*\
  !*** ./src/game/event/UIMessage.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UIMessage": () => (/* binding */ UIMessage)
/* harmony export */ });
class UIMessage {
}
UIMessage.MSG_SELECT_SERVER = 1000;
UIMessage.MSG_SCENE_PROGRESS = 1001;


/***/ }),

/***/ "./src/game/event/UIMessageManager.ts":
/*!********************************************!*\
  !*** ./src/game/event/UIMessageManager.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UIMessageManger": () => (/* binding */ UIMessageManger)
/* harmony export */ });
/* harmony import */ var _framework_common_Messenger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../framework/common/Messenger */ "./src/framework/common/Messenger.ts");
/* harmony import */ var _framework_common_Singleton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../framework/common/Singleton */ "./src/framework/common/Singleton.ts");


class UIMessageManger extends _framework_common_Singleton__WEBPACK_IMPORTED_MODULE_1__.Singleton {
    constructor() {
        super(...arguments);
        this.uiMessage = new _framework_common_Messenger__WEBPACK_IMPORTED_MODULE_0__.Messenger();
    }
    addListener(msgCode, obj, listener) {
        this.uiMessage.addListener(msgCode, obj, listener);
    }
    removeListener(msgCode, listener) {
        this.uiMessage.removeListener(msgCode, listener);
    }
    removeListenerByCode(msgCode) {
        this.uiMessage.removeListenerByType(msgCode);
    }
    clearup() {
        this.uiMessage.clearup();
    }
    broadcast(msgCode, params) {
        this.uiMessage.broadcast(msgCode, params);
    }
}


/***/ }),

/***/ "./src/game/module/gamestart/scene/GameStartScene.ts":
/*!***********************************************************!*\
  !*** ./src/game/module/gamestart/scene/GameStartScene.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameStart": () => (/* binding */ GameStart)
/* harmony export */ });
/* harmony import */ var _data_ui_GameStart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../data/ui/GameStart */ "./src/data/ui/GameStart.ts");
/* harmony import */ var _framework_scene_BaseScene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../framework/scene/BaseScene */ "./src/framework/scene/BaseScene.ts");
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../global/GameConfig */ "./src/global/GameConfig.ts");
/* harmony import */ var _vo_VoHome__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../vo/VoHome */ "./src/game/module/gamestart/vo/VoHome.ts");




class GameStart extends _framework_scene_BaseScene__WEBPACK_IMPORTED_MODULE_1__.BaseScene {
    constructor() {
        super();
    }
    onEnter() {
    }
    onComplete() {
        let vo = new _vo_VoHome__WEBPACK_IMPORTED_MODULE_3__.VoHome();
        vo.name = "Justin";
        vo.hp = 1200;
        vo.mp = 3300;
        vo.money = 666;
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__.S.UIManager.openPageInScene(_data_ui_GameStart__WEBPACK_IMPORTED_MODULE_0__.GameStartUI.PackageName, _data_ui_GameStart__WEBPACK_IMPORTED_MODULE_0__.GameStartUI.UIStartView, vo);
    }
    onLeave() {
    }
}


/***/ }),

/***/ "./src/game/module/gamestart/ui/UIStartView.ts":
/*!*****************************************************!*\
  !*** ./src/game/module/gamestart/ui/UIStartView.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UIStartView": () => (/* binding */ UIStartView)
/* harmony export */ });
/* harmony import */ var _framework_ui_UIPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../framework/ui/UIPage */ "./src/framework/ui/UIPage.ts");
/* harmony import */ var _framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../framework/common/NiceDecorator */ "./src/framework/common/NiceDecorator.ts");
/* harmony import */ var _api_LoginAPI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../api/LoginAPI */ "./src/game/api/LoginAPI.ts");
/* harmony import */ var _data_pb_Opcode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../data/pb/Opcode */ "./src/data/pb/Opcode.ts");
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../global/GameConfig */ "./src/global/GameConfig.ts");
/* harmony import */ var _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../framework/logger/Logger */ "./src/framework/logger/Logger.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






class UIStartView extends _framework_ui_UIPage__WEBPACK_IMPORTED_MODULE_0__.UIPage {
    onAwake() {
        super.onAwake();
        this.m_chatBtn.onClick.Add(() => {
            this.onchatBtn();
        });
        this.m_bagBtn.onClick.Add(() => {
            this.onbagBtn();
        });
        this.m_shopBtn.onClick.Add(() => {
            this.onshopBtn();
        });
        this.m_levelBtn.onClick.Add(() => {
            this.onlevelBtn();
        });
    }
    onShow(vo) {
        super.onShow(vo);
        this.m_nameLbl.text = vo.name;
        this.m_mpLbl.text = vo.mp.toString();
        this.m_hpLbl.text = vo.hp.toString();
        this.m_moneyLbl.text = vo.money.toString();
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_4__.S.GameSession.listen(_data_pb_Opcode__WEBPACK_IMPORTED_MODULE_3__.Opcode.MSG_GS2C_Test, function (msg) {
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_5__.Logger.log("收到服务器下发的消息。。。。" + msg.testResponse);
        });
    }
    onClose(arg) {
        super.onClose(arg);
    }
    onchatBtn() {
        // S.UIManager.openWindow(
        //     commonUI.PackageName,
        //     commonUI.UIUINoticeWin,
        //     null);
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_5__.Logger.log("on chat...");
    }
    onbagBtn() {
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_5__.Logger.log("on bag ..");
        //benchmark test
        _api_LoginAPI__WEBPACK_IMPORTED_MODULE_2__.LoginAPI.benchmarkTest();
    }
    onshopBtn() {
        // S.UIManager.openPage(
        //     homeUI.PackageName,
        //     homeUI.UIShopPage);
    }
    onlevelBtn() {
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_5__.Logger.log("on level...");
    }
}
__decorate([
    (0,_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__.binder)("chatBtn")
], UIStartView.prototype, "m_chatBtn", void 0);
__decorate([
    (0,_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__.binder)("bagBtn")
], UIStartView.prototype, "m_bagBtn", void 0);
__decorate([
    (0,_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__.binder)("shopBtn")
], UIStartView.prototype, "m_shopBtn", void 0);
__decorate([
    (0,_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__.binder)("levelBtn")
], UIStartView.prototype, "m_levelBtn", void 0);
__decorate([
    (0,_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__.binder)("nameTxt")
], UIStartView.prototype, "m_nameLbl", void 0);
__decorate([
    (0,_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__.binder)("hpTxt")
], UIStartView.prototype, "m_hpLbl", void 0);
__decorate([
    (0,_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__.binder)("mpTxt")
], UIStartView.prototype, "m_mpLbl", void 0);
__decorate([
    (0,_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__.binder)("moneyTxt")
], UIStartView.prototype, "m_moneyLbl", void 0);


/***/ }),

/***/ "./src/game/module/gamestart/vo/VoHome.ts":
/*!************************************************!*\
  !*** ./src/game/module/gamestart/vo/VoHome.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VoHome": () => (/* binding */ VoHome)
/* harmony export */ });
class VoHome {
}


/***/ }),

/***/ "./src/game/module/home/scene/HomeScene.ts":
/*!*************************************************!*\
  !*** ./src/game/module/home/scene/HomeScene.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomeScene": () => (/* binding */ HomeScene)
/* harmony export */ });
/* harmony import */ var _framework_scene_BaseScene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../framework/scene/BaseScene */ "./src/framework/scene/BaseScene.ts");
/* harmony import */ var _vo_VoHome__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vo/VoHome */ "./src/game/module/home/vo/VoHome.ts");
// import { homeUI } from "../../../../data/ui/home";


class HomeScene extends _framework_scene_BaseScene__WEBPACK_IMPORTED_MODULE_0__.BaseScene {
    constructor() {
        super();
    }
    onEnter() {
    }
    onComplete() {
        let vo = new _vo_VoHome__WEBPACK_IMPORTED_MODULE_1__.VoHome();
        vo.name = "Justin";
        vo.hp = 1200;
        vo.mp = 3300;
        vo.money = 666;
        // S.UIManager.openPageInScene(
        //     homeUI.PackageName,
        //     homeUI.UIHomePage,
        //     vo);
    }
    onLeave() {
    }
}


/***/ }),

/***/ "./src/game/module/home/vo/VoHome.ts":
/*!*******************************************!*\
  !*** ./src/game/module/home/vo/VoHome.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VoHome": () => (/* binding */ VoHome)
/* harmony export */ });
class VoHome {
}


/***/ }),

/***/ "./src/game/module/pve/scene/PveScene.ts":
/*!***********************************************!*\
  !*** ./src/game/module/pve/scene/PveScene.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PveScene": () => (/* binding */ PveScene)
/* harmony export */ });
/* harmony import */ var _framework_scene_BaseScene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../framework/scene/BaseScene */ "./src/framework/scene/BaseScene.ts");

class PveScene extends _framework_scene_BaseScene__WEBPACK_IMPORTED_MODULE_0__.BaseScene {
    constructor() {
        super();
    }
    onEnter() {
    }
    onComplete() {
    }
    onLeave() {
    }
}


/***/ }),

/***/ "./src/global/GameConfig.ts":
/*!**********************************!*\
  !*** ./src/global/GameConfig.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameConfig": () => (/* binding */ GameConfig),
/* harmony export */   "S": () => (/* binding */ S)
/* harmony export */ });
/* harmony import */ var _framework_common_GameObjectPool__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/common/GameObjectPool */ "./src/framework/common/GameObjectPool.ts");
/* harmony import */ var _framework_common_ResManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../framework/common/ResManager */ "./src/framework/common/ResManager.ts");
/* harmony import */ var _framework_net_GameSession__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../framework/net/GameSession */ "./src/framework/net/GameSession.ts");
/* harmony import */ var _framework_net_HttpManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../framework/net/HttpManager */ "./src/framework/net/HttpManager.ts");
/* harmony import */ var _framework_net_SessionManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../framework/net/SessionManager */ "./src/framework/net/SessionManager.ts");
/* harmony import */ var _framework_scene_SceneManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../framework/scene/SceneManager */ "./src/framework/scene/SceneManager.ts");
/* harmony import */ var _framework_ui_UIManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../framework/ui/UIManager */ "./src/framework/ui/UIManager.ts");
/* harmony import */ var _game_event_UIMessageManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../game/event/UIMessageManager */ "./src/game/event/UIMessageManager.ts");


// import { StoryManager } from "../framework/ink/StoryManager";
// import { StoryMessageManager } from "../framework/ink/StoryMessageManager";






class GameConfig {
}
GameConfig.debug = true;
GameConfig.realmServerIP = "127.0.0.1";
GameConfig.realmServerPort = 9001;
class S {
}
S.UIManager = _framework_ui_UIManager__WEBPACK_IMPORTED_MODULE_6__.UIManager.Instance(_framework_ui_UIManager__WEBPACK_IMPORTED_MODULE_6__.UIManager);
S.UIMessageManger = _game_event_UIMessageManager__WEBPACK_IMPORTED_MODULE_7__.UIMessageManger.Instance(_game_event_UIMessageManager__WEBPACK_IMPORTED_MODULE_7__.UIMessageManger);
S.SceneManager = _framework_scene_SceneManager__WEBPACK_IMPORTED_MODULE_5__.SceneManager.Instance(_framework_scene_SceneManager__WEBPACK_IMPORTED_MODULE_5__.SceneManager);
S.GameObjectPool = _framework_common_GameObjectPool__WEBPACK_IMPORTED_MODULE_0__.GameObjectPool.Instance(_framework_common_GameObjectPool__WEBPACK_IMPORTED_MODULE_0__.GameObjectPool);
S.ResManager = _framework_common_ResManager__WEBPACK_IMPORTED_MODULE_1__.ResManager.Instance(_framework_common_ResManager__WEBPACK_IMPORTED_MODULE_1__.ResManager);
// public static StoryManager = StoryManager.Instance(StoryManager);
S.SessionManager = _framework_net_SessionManager__WEBPACK_IMPORTED_MODULE_4__.SessionManager.Instance(_framework_net_SessionManager__WEBPACK_IMPORTED_MODULE_4__.SessionManager);
S.GameSession = _framework_net_GameSession__WEBPACK_IMPORTED_MODULE_2__.GameSession.Instance(_framework_net_GameSession__WEBPACK_IMPORTED_MODULE_2__.GameSession);
// public static StoryMessageManager = StoryMessageManager.Instance(StoryMessageManager);
S.HttpManager = _framework_net_HttpManager__WEBPACK_IMPORTED_MODULE_3__.HttpManager.Instance(_framework_net_HttpManager__WEBPACK_IMPORTED_MODULE_3__.HttpManager);


/***/ }),

/***/ "./src/unittest/SingletonTest.ts":
/*!***************************************!*\
  !*** ./src/unittest/SingletonTest.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SingletonTest": () => (/* binding */ SingletonTest)
/* harmony export */ });
/* harmony import */ var _framework_common_Singleton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/common/Singleton */ "./src/framework/common/Singleton.ts");
/* harmony import */ var _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../framework/logger/Logger */ "./src/framework/logger/Logger.ts");


class SingletonTest extends _framework_common_Singleton__WEBPACK_IMPORTED_MODULE_0__.Singleton {
    constructor() {
        super();
        this.num = 0;
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_1__.Logger.log("SingletonTest call constructor");
    }
    add() {
        this.num += 1;
    }
    test() {
        return this.num;
    }
}


/***/ }),

/***/ "./src/unittest/UnitTest.ts":
/*!**********************************!*\
  !*** ./src/unittest/UnitTest.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Event": () => (/* binding */ Event),
/* harmony export */   "UnitTest": () => (/* binding */ UnitTest)
/* harmony export */ });
/* harmony import */ var _framework_util_TimeUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/util/TimeUtil */ "./src/framework/util/TimeUtil.ts");
/* harmony import */ var _SingletonTest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SingletonTest */ "./src/unittest/SingletonTest.ts");
/* harmony import */ var _framework_common_Messenger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../framework/common/Messenger */ "./src/framework/common/Messenger.ts");
/* harmony import */ var _data_excel_SkillConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../data/excel/SkillConfig */ "./src/data/excel/SkillConfig.ts");
/* harmony import */ var _framework_redhints_RedHintsMessageManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../framework/redhints/RedHintsMessageManager */ "./src/framework/redhints/RedHintsMessageManager.ts");
/* harmony import */ var _framework_redhints_RedHintsManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../framework/redhints/RedHintsManager */ "./src/framework/redhints/RedHintsManager.ts");
/* harmony import */ var _data_pb_gen_pb__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../data/pb/gen/pb */ "./src/data/pb/gen/pb.js");
/* harmony import */ var _data_pb_gen_pb__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_data_pb_gen_pb__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../global/GameConfig */ "./src/global/GameConfig.ts");
/* harmony import */ var _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../framework/logger/Logger */ "./src/framework/logger/Logger.ts");
/* harmony import */ var _game_entity_PlayerManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../game/entity/PlayerManager */ "./src/game/entity/PlayerManager.ts");
/* harmony import */ var _game_entity_component_BagComponent__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../game/entity/component/BagComponent */ "./src/game/entity/component/BagComponent.ts");
/* harmony import */ var _game_entity_component_PlayerInfoComponent__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../game/entity/component/PlayerInfoComponent */ "./src/game/entity/component/PlayerInfoComponent.ts");






// import { Story } from 'inkjs';






// import { TestC, TestP } from 'csharp';
class UnitTest {
    static async doTest() {
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log("TimeUtil =============================");
        _framework_util_TimeUtil__WEBPACK_IMPORTED_MODULE_0__.TimeUtil.test();
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log("Singleton =============================");
        _SingletonTest__WEBPACK_IMPORTED_MODULE_1__.SingletonTest.Instance(_SingletonTest__WEBPACK_IMPORTED_MODULE_1__.SingletonTest);
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log("===");
        let t1 = _SingletonTest__WEBPACK_IMPORTED_MODULE_1__.SingletonTest.Instance(_SingletonTest__WEBPACK_IMPORTED_MODULE_1__.SingletonTest);
        let t2 = _SingletonTest__WEBPACK_IMPORTED_MODULE_1__.SingletonTest.Instance(_SingletonTest__WEBPACK_IMPORTED_MODULE_1__.SingletonTest);
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log(t1.test() + " : " + t2.test());
        t1.add();
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log(t1.test() + " : " + t2.test());
        t2.add();
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log(t1.test() + " : " + t2.test());
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log("Messager =============================");
        let messenger = new _framework_common_Messenger__WEBPACK_IMPORTED_MODULE_2__.Messenger();
        let listen = function (a, b) {
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log(`listen call: ${a} , ${b}`);
        };
        let listen2 = function (a, b) {
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log(`listen call2: ${a} , ${b}`);
        };
        let EVENT_CODE = 100;
        messenger.addListener(EVENT_CODE, this, listen);
        messenger.addListener(EVENT_CODE, this, listen2);
        messenger.broadcast(EVENT_CODE, 999, " Hello");
        messenger.removeListener(EVENT_CODE, listen);
        messenger.broadcast(EVENT_CODE, 999, " Hello");
        messenger.clearup();
        messenger.broadcast(EVENT_CODE, 999, " Hello");
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log("Timer =============================");
        let interval = setInterval(() => {
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log("inter val..");
        }, 1000);
        let timeout = setTimeout(() => {
            clearInterval(interval);
        }, 5000);
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log("ResourceManager =============================");
        // let prefab = await ResManager.Instance(ResManager).loadPrefab("Models/1001/Character.prefab") ;
        //Logger.log(prefab);
        //let inst = CS.UnityEngine.GameObject.Instantiate(prefab);
        //inst.name = "Test Ch";
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log("引用类型 =============================");
        let testMap = new Map();
        testMap.set("key1", new Array());
        let arr1 = testMap.get("key1");
        arr1.push(12);
        arr1.push(333);
        let arr2 = testMap.get("key1");
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log(arr2);
        // Logger.log("FariyGUI =============================");
        //  let page:UI_LoginPage = new UI_LoginPage();
        //  CS.FairyGUI.GRoot.inst.AddChild(page._ui);
        //  Logger.log(page._ui);
        // Logger.log("ModuleManager =============================");
        // ModuleManager.Instance(ModuleManager).createModule(ModuleDef.LoginModule,"create login");
        // ModuleManager.Instance(ModuleManager).sendMessage(ModuleDef.LoginModule, "test1",2233);
        // ModuleManager.Instance(ModuleManager).sendMessage(ModuleDef.HomeModule, "test2",2233);
        // Logger.log("then create Home");
        // ModuleManager.Instance(ModuleManager).createModule(ModuleDef.HomeModule,"create login");
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log("UIManager =============================");
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log("excel data =============================");
        let skillMap = _data_excel_SkillConfig__WEBPACK_IMPORTED_MODULE_3__.SkillConfigTB.Instance(_data_excel_SkillConfig__WEBPACK_IMPORTED_MODULE_3__.SkillConfigTB).trs;
        let skilltr = skillMap.get(1003);
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log(`${skilltr._Name} : ${skilltr._AttackType}`);
        let impacttype = skilltr._ImpactType;
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log(impacttype);
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log("Protobuf =============================");
        try {
            let c2rLogin = {
                "Account": "test",
                "Password": "1234"
            };
            //验证
            let v1 = _data_pb_gen_pb__WEBPACK_IMPORTED_MODULE_6__.nice_ts.C2R_Login.verify(c2rLogin);
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log("verify pb: " + v1);
            let msg = _data_pb_gen_pb__WEBPACK_IMPORTED_MODULE_6__.nice_ts.C2R_Login.create(c2rLogin);
            msg.Account = "test1";
            msg.Password = "1122";
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log(msg);
            let buf = _data_pb_gen_pb__WEBPACK_IMPORTED_MODULE_6__.nice_ts.C2R_Login.encode(msg).finish();
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log(buf);
            let de_buf = _data_pb_gen_pb__WEBPACK_IMPORTED_MODULE_6__.nice_ts.C2R_Login.decode(buf);
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log(de_buf.Account);
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log(de_buf.Password);
        }
        catch (ex) {
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log(ex);
        }
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log("UintArray =============================");
        let opcode_arr = new Uint8Array([257, 25]);
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log(opcode_arr.subarray(0, 1));
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log(opcode_arr.length);
        let opcode_arr2 = new Uint8Array([33]);
        //合并 Uint8Array
        let merge_arr = new Uint8Array(opcode_arr.length + opcode_arr2.length);
        merge_arr.set(opcode_arr2);
        merge_arr.set(opcode_arr, opcode_arr2.length);
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log(merge_arr.length);
        let n = 5678;
        let buffer = new Uint8Array(4);
        // << 左移  >> 右移  >>> 无符号右移
        //n转uint8Array
        buffer[0] = n >>> 24;
        buffer[1] = n >>> 16;
        buffer[2] = n >>> 8;
        buffer[3] = n & 0xff;
        //unit8Array转n
        n = buffer[0] << 24 | buffer[1] << 16 | buffer[2] << 8 | buffer[3];
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log(n);
        n = 300;
        let buffer1 = new Uint8Array(2);
        buffer1[0] = n >>> 8;
        buffer1[1] = n & 0xff;
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log(buffer1);
        n = buffer1[0] << 8 | buffer1[1];
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log(n);
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log("sleep =============================");
        await _framework_util_TimeUtil__WEBPACK_IMPORTED_MODULE_0__.TimeUtil.sleep(1000);
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log("sleep ..end");
        // Logger.log("flatbuffer =============================");
        // try{
        //     let bytes:ArrayBuffer = await ResManager.Instance(ResManager).loadTextBytes("Config/fb/unitconfig.bytes")
        //     let unitByte = new flatbuffers.ByteBuffer(new Uint8Array(bytes));
        //     Logger.log(unitByte);
        //     let unitconfig:fb.unitconfigTB = fb.unitconfigTB.getRootAsunitconfigTB(unitByte)
        //     Logger.log(unitconfig.unitconfigTRSLength());
        //     for(let i=0; i<unitconfig.unitconfigTRSLength(); i++){
        //         let a =  unitconfig.unitconfigTRS(i);
        //         Logger.log(a.Name());
        //     }
        // }catch(ex){
        //     Logger.error(ex);
        // }
        try {
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log("测试红点系统 =============================");
            _framework_redhints_RedHintsMessageManager__WEBPACK_IMPORTED_MODULE_4__.RedHintsMessageManager.Instance(_framework_redhints_RedHintsMessageManager__WEBPACK_IMPORTED_MODULE_4__.RedHintsMessageManager).addListener(_framework_redhints_RedHintsManager__WEBPACK_IMPORTED_MODULE_5__.enumRedHints.chat, this, function () {
                _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log("red hints chat...");
            });
            _framework_redhints_RedHintsMessageManager__WEBPACK_IMPORTED_MODULE_4__.RedHintsMessageManager.Instance(_framework_redhints_RedHintsMessageManager__WEBPACK_IMPORTED_MODULE_4__.RedHintsMessageManager).addListener(_framework_redhints_RedHintsManager__WEBPACK_IMPORTED_MODULE_5__.enumRedHints.chat_family, this, function () {
                _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log("red hints chat_family...");
            });
            _framework_redhints_RedHintsMessageManager__WEBPACK_IMPORTED_MODULE_4__.RedHintsMessageManager.Instance(_framework_redhints_RedHintsMessageManager__WEBPACK_IMPORTED_MODULE_4__.RedHintsMessageManager).addListener(_framework_redhints_RedHintsManager__WEBPACK_IMPORTED_MODULE_5__.enumRedHints.chat_system, this, function () {
                _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log("red hints chat...");
            });
            _framework_redhints_RedHintsManager__WEBPACK_IMPORTED_MODULE_5__.RedHintsManager.Instance(_framework_redhints_RedHintsManager__WEBPACK_IMPORTED_MODULE_5__.RedHintsManager).setRedHintOpenOrClose(_framework_redhints_RedHintsManager__WEBPACK_IMPORTED_MODULE_5__.enumRedHints.chat_family, true);
            let r_chat = _framework_redhints_RedHintsManager__WEBPACK_IMPORTED_MODULE_5__.RedHintsManager.Instance(_framework_redhints_RedHintsManager__WEBPACK_IMPORTED_MODULE_5__.RedHintsManager).checkRedIsOpen(_framework_redhints_RedHintsManager__WEBPACK_IMPORTED_MODULE_5__.enumRedHints.chat);
            let r_chat_family = _framework_redhints_RedHintsManager__WEBPACK_IMPORTED_MODULE_5__.RedHintsManager.Instance(_framework_redhints_RedHintsManager__WEBPACK_IMPORTED_MODULE_5__.RedHintsManager).checkRedIsOpen(_framework_redhints_RedHintsManager__WEBPACK_IMPORTED_MODULE_5__.enumRedHints.chat_family);
            let r_chat_system = _framework_redhints_RedHintsManager__WEBPACK_IMPORTED_MODULE_5__.RedHintsManager.Instance(_framework_redhints_RedHintsManager__WEBPACK_IMPORTED_MODULE_5__.RedHintsManager).checkRedIsOpen(_framework_redhints_RedHintsManager__WEBPACK_IMPORTED_MODULE_5__.enumRedHints.chat_system);
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log(r_chat, r_chat_family, r_chat_system);
        }
        catch (error) {
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log(error);
        }
        try {
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log("Ink Story =============================");
            // var json = await (await ResManager.Instance(ResManager).loadTextAsset("Story/TestStory.json")).text;
            // let story = new Story(json);
            // story.ChoosePathString("story1", true);
            // story.BindExternalFunction("GetCharacterName",()=>{
            //     return "Justin Test";
            // })
            // story.BindExternalFunctionGeneral("GetCharacterNameByMutiParams",(args:[])=>{
            //     Logger.log(args.length);
            //     return "TTTT";
            // })
            // Logger.log(story.Continue());
            // Logger.log(story.Continue());
            // Logger.log(story.Continue());
        }
        catch (error) {
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log(error);
        }
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log("HttpManager=========================");
        let txt = await _global_GameConfig__WEBPACK_IMPORTED_MODULE_7__.S.HttpManager.get("https://www.baidu.com/");
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_8__.Logger.log(txt);
        //Logger.log("entity=========================")
        let player = _game_entity_PlayerManager__WEBPACK_IMPORTED_MODULE_9__.PlayerManager.Instance(_game_entity_PlayerManager__WEBPACK_IMPORTED_MODULE_9__.PlayerManager).getPlayer();
        let bagC = player.addComponent(_game_entity_component_BagComponent__WEBPACK_IMPORTED_MODULE_10__.BagComponent);
        //Logger.log(bagC.name);
        let infoC = player.addComponent(_game_entity_component_PlayerInfoComponent__WEBPACK_IMPORTED_MODULE_11__.PlayerInfoComponent);
        //Logger.log(infoC.nickName);
        //测试事件
        let event = new Event();
        event.name = "helloEvent";
        //Lambda 表达式订阅
        bagC.subscribe((e) => {
            //Logger.log("Event trigger:"+e.name)
        }, Event);
        let trigger2 = (e) => {
            //Logger.log("Event trigger2:"+e.name)
        };
        //订阅
        bagC.subscribe(trigger2, Event);
        //取消订阅
        bagC.unSubscribe(trigger2, Event);
        bagC.publish(event, Event);
        //test delegate
        // TestC.SetPackageItemExtension(new TTestC())
        // setInterval(()=>{
        //     let p = TestC.getObj();
        //     if(p instanceof TTestC){
        //         console.log("aaaaaaaaaaaaaaaa")
        //     }else{
        //         console.log("bbbbbbbbbbbbbbbbbbbb")
        //     }
        // },1000)
    }
}
UnitTest.testVar = 10000;
// class TTestC extends TestP{
//     public test(){
//         console.log("hello test delegate")
//     }
// }
class Event {
}


/***/ }),

/***/ "./src/data/pb/gen/pb.js":
/*!*******************************!*\
  !*** ./src/data/pb/gen/pb.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/


var $protobuf = __webpack_require__(/*! protobufjs/minimal */ "./node_modules/protobufjs/minimal.js");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

var Long = __webpack_require__(/*! long */ "./node_modules/long/src/long.js");
$protobuf.util.Long = Long;
$protobuf.configure();


// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.nice_ts = (function() {

    /**
     * Namespace nice_ts.
     * @exports nice_ts
     * @namespace
     */
    var nice_ts = {};

    nice_ts.C2R_Login = (function() {

        /**
         * Properties of a C2R_Login.
         * @memberof nice_ts
         * @interface IC2R_Login
         * @property {string|null} [Account] C2R_Login Account
         * @property {string|null} [Password] C2R_Login Password
         */

        /**
         * Constructs a new C2R_Login.
         * @memberof nice_ts
         * @classdesc Represents a C2R_Login.
         * @implements IC2R_Login
         * @constructor
         * @param {nice_ts.IC2R_Login=} [properties] Properties to set
         */
        function C2R_Login(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * C2R_Login Account.
         * @member {string} Account
         * @memberof nice_ts.C2R_Login
         * @instance
         */
        C2R_Login.prototype.Account = "";

        /**
         * C2R_Login Password.
         * @member {string} Password
         * @memberof nice_ts.C2R_Login
         * @instance
         */
        C2R_Login.prototype.Password = "";

        /**
         * Creates a new C2R_Login instance using the specified properties.
         * @function create
         * @memberof nice_ts.C2R_Login
         * @static
         * @param {nice_ts.IC2R_Login=} [properties] Properties to set
         * @returns {nice_ts.C2R_Login} C2R_Login instance
         */
        C2R_Login.create = function create(properties) {
            return new C2R_Login(properties);
        };

        /**
         * Encodes the specified C2R_Login message. Does not implicitly {@link nice_ts.C2R_Login.verify|verify} messages.
         * @function encode
         * @memberof nice_ts.C2R_Login
         * @static
         * @param {nice_ts.IC2R_Login} message C2R_Login message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2R_Login.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Account != null && Object.hasOwnProperty.call(message, "Account"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.Account);
            if (message.Password != null && Object.hasOwnProperty.call(message, "Password"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.Password);
            return writer;
        };

        /**
         * Encodes the specified C2R_Login message, length delimited. Does not implicitly {@link nice_ts.C2R_Login.verify|verify} messages.
         * @function encodeDelimited
         * @memberof nice_ts.C2R_Login
         * @static
         * @param {nice_ts.IC2R_Login} message C2R_Login message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2R_Login.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2R_Login message from the specified reader or buffer.
         * @function decode
         * @memberof nice_ts.C2R_Login
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {nice_ts.C2R_Login} C2R_Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2R_Login.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.nice_ts.C2R_Login();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Account = reader.string();
                    break;
                case 2:
                    message.Password = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2R_Login message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof nice_ts.C2R_Login
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {nice_ts.C2R_Login} C2R_Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2R_Login.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2R_Login message.
         * @function verify
         * @memberof nice_ts.C2R_Login
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2R_Login.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Account != null && message.hasOwnProperty("Account"))
                if (!$util.isString(message.Account))
                    return "Account: string expected";
            if (message.Password != null && message.hasOwnProperty("Password"))
                if (!$util.isString(message.Password))
                    return "Password: string expected";
            return null;
        };

        /**
         * Creates a C2R_Login message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof nice_ts.C2R_Login
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {nice_ts.C2R_Login} C2R_Login
         */
        C2R_Login.fromObject = function fromObject(object) {
            if (object instanceof $root.nice_ts.C2R_Login)
                return object;
            var message = new $root.nice_ts.C2R_Login();
            if (object.Account != null)
                message.Account = String(object.Account);
            if (object.Password != null)
                message.Password = String(object.Password);
            return message;
        };

        /**
         * Creates a plain object from a C2R_Login message. Also converts values to other types if specified.
         * @function toObject
         * @memberof nice_ts.C2R_Login
         * @static
         * @param {nice_ts.C2R_Login} message C2R_Login
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2R_Login.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.Account = "";
                object.Password = "";
            }
            if (message.Account != null && message.hasOwnProperty("Account"))
                object.Account = message.Account;
            if (message.Password != null && message.hasOwnProperty("Password"))
                object.Password = message.Password;
            return object;
        };

        /**
         * Converts this C2R_Login to JSON.
         * @function toJSON
         * @memberof nice_ts.C2R_Login
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2R_Login.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2R_Login;
    })();

    nice_ts.R2C_Login = (function() {

        /**
         * Properties of a R2C_Login.
         * @memberof nice_ts
         * @interface IR2C_Login
         * @property {number|null} [Error] R2C_Login Error
         * @property {string|null} [Message] R2C_Login Message
         * @property {string|null} [Address] R2C_Login Address
         * @property {number|Long|null} [Key] R2C_Login Key
         * @property {number|Long|null} [GateId] R2C_Login GateId
         */

        /**
         * Constructs a new R2C_Login.
         * @memberof nice_ts
         * @classdesc Represents a R2C_Login.
         * @implements IR2C_Login
         * @constructor
         * @param {nice_ts.IR2C_Login=} [properties] Properties to set
         */
        function R2C_Login(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * R2C_Login Error.
         * @member {number} Error
         * @memberof nice_ts.R2C_Login
         * @instance
         */
        R2C_Login.prototype.Error = 0;

        /**
         * R2C_Login Message.
         * @member {string} Message
         * @memberof nice_ts.R2C_Login
         * @instance
         */
        R2C_Login.prototype.Message = "";

        /**
         * R2C_Login Address.
         * @member {string} Address
         * @memberof nice_ts.R2C_Login
         * @instance
         */
        R2C_Login.prototype.Address = "";

        /**
         * R2C_Login Key.
         * @member {number|Long} Key
         * @memberof nice_ts.R2C_Login
         * @instance
         */
        R2C_Login.prototype.Key = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * R2C_Login GateId.
         * @member {number|Long} GateId
         * @memberof nice_ts.R2C_Login
         * @instance
         */
        R2C_Login.prototype.GateId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new R2C_Login instance using the specified properties.
         * @function create
         * @memberof nice_ts.R2C_Login
         * @static
         * @param {nice_ts.IR2C_Login=} [properties] Properties to set
         * @returns {nice_ts.R2C_Login} R2C_Login instance
         */
        R2C_Login.create = function create(properties) {
            return new R2C_Login(properties);
        };

        /**
         * Encodes the specified R2C_Login message. Does not implicitly {@link nice_ts.R2C_Login.verify|verify} messages.
         * @function encode
         * @memberof nice_ts.R2C_Login
         * @static
         * @param {nice_ts.IR2C_Login} message R2C_Login message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        R2C_Login.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Address != null && Object.hasOwnProperty.call(message, "Address"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.Address);
            if (message.Key != null && Object.hasOwnProperty.call(message, "Key"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.Key);
            if (message.GateId != null && Object.hasOwnProperty.call(message, "GateId"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.GateId);
            if (message.Error != null && Object.hasOwnProperty.call(message, "Error"))
                writer.uint32(/* id 91, wireType 0 =*/728).int32(message.Error);
            if (message.Message != null && Object.hasOwnProperty.call(message, "Message"))
                writer.uint32(/* id 92, wireType 2 =*/738).string(message.Message);
            return writer;
        };

        /**
         * Encodes the specified R2C_Login message, length delimited. Does not implicitly {@link nice_ts.R2C_Login.verify|verify} messages.
         * @function encodeDelimited
         * @memberof nice_ts.R2C_Login
         * @static
         * @param {nice_ts.IR2C_Login} message R2C_Login message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        R2C_Login.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a R2C_Login message from the specified reader or buffer.
         * @function decode
         * @memberof nice_ts.R2C_Login
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {nice_ts.R2C_Login} R2C_Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        R2C_Login.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.nice_ts.R2C_Login();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 91:
                    message.Error = reader.int32();
                    break;
                case 92:
                    message.Message = reader.string();
                    break;
                case 1:
                    message.Address = reader.string();
                    break;
                case 2:
                    message.Key = reader.int64();
                    break;
                case 3:
                    message.GateId = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a R2C_Login message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof nice_ts.R2C_Login
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {nice_ts.R2C_Login} R2C_Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        R2C_Login.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a R2C_Login message.
         * @function verify
         * @memberof nice_ts.R2C_Login
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        R2C_Login.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Error != null && message.hasOwnProperty("Error"))
                if (!$util.isInteger(message.Error))
                    return "Error: integer expected";
            if (message.Message != null && message.hasOwnProperty("Message"))
                if (!$util.isString(message.Message))
                    return "Message: string expected";
            if (message.Address != null && message.hasOwnProperty("Address"))
                if (!$util.isString(message.Address))
                    return "Address: string expected";
            if (message.Key != null && message.hasOwnProperty("Key"))
                if (!$util.isInteger(message.Key) && !(message.Key && $util.isInteger(message.Key.low) && $util.isInteger(message.Key.high)))
                    return "Key: integer|Long expected";
            if (message.GateId != null && message.hasOwnProperty("GateId"))
                if (!$util.isInteger(message.GateId) && !(message.GateId && $util.isInteger(message.GateId.low) && $util.isInteger(message.GateId.high)))
                    return "GateId: integer|Long expected";
            return null;
        };

        /**
         * Creates a R2C_Login message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof nice_ts.R2C_Login
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {nice_ts.R2C_Login} R2C_Login
         */
        R2C_Login.fromObject = function fromObject(object) {
            if (object instanceof $root.nice_ts.R2C_Login)
                return object;
            var message = new $root.nice_ts.R2C_Login();
            if (object.Error != null)
                message.Error = object.Error | 0;
            if (object.Message != null)
                message.Message = String(object.Message);
            if (object.Address != null)
                message.Address = String(object.Address);
            if (object.Key != null)
                if ($util.Long)
                    (message.Key = $util.Long.fromValue(object.Key)).unsigned = false;
                else if (typeof object.Key === "string")
                    message.Key = parseInt(object.Key, 10);
                else if (typeof object.Key === "number")
                    message.Key = object.Key;
                else if (typeof object.Key === "object")
                    message.Key = new $util.LongBits(object.Key.low >>> 0, object.Key.high >>> 0).toNumber();
            if (object.GateId != null)
                if ($util.Long)
                    (message.GateId = $util.Long.fromValue(object.GateId)).unsigned = false;
                else if (typeof object.GateId === "string")
                    message.GateId = parseInt(object.GateId, 10);
                else if (typeof object.GateId === "number")
                    message.GateId = object.GateId;
                else if (typeof object.GateId === "object")
                    message.GateId = new $util.LongBits(object.GateId.low >>> 0, object.GateId.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a R2C_Login message. Also converts values to other types if specified.
         * @function toObject
         * @memberof nice_ts.R2C_Login
         * @static
         * @param {nice_ts.R2C_Login} message R2C_Login
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        R2C_Login.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.Address = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.Key = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.Key = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.GateId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.GateId = options.longs === String ? "0" : 0;
                object.Error = 0;
                object.Message = "";
            }
            if (message.Address != null && message.hasOwnProperty("Address"))
                object.Address = message.Address;
            if (message.Key != null && message.hasOwnProperty("Key"))
                if (typeof message.Key === "number")
                    object.Key = options.longs === String ? String(message.Key) : message.Key;
                else
                    object.Key = options.longs === String ? $util.Long.prototype.toString.call(message.Key) : options.longs === Number ? new $util.LongBits(message.Key.low >>> 0, message.Key.high >>> 0).toNumber() : message.Key;
            if (message.GateId != null && message.hasOwnProperty("GateId"))
                if (typeof message.GateId === "number")
                    object.GateId = options.longs === String ? String(message.GateId) : message.GateId;
                else
                    object.GateId = options.longs === String ? $util.Long.prototype.toString.call(message.GateId) : options.longs === Number ? new $util.LongBits(message.GateId.low >>> 0, message.GateId.high >>> 0).toNumber() : message.GateId;
            if (message.Error != null && message.hasOwnProperty("Error"))
                object.Error = message.Error;
            if (message.Message != null && message.hasOwnProperty("Message"))
                object.Message = message.Message;
            return object;
        };

        /**
         * Converts this R2C_Login to JSON.
         * @function toJSON
         * @memberof nice_ts.R2C_Login
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        R2C_Login.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return R2C_Login;
    })();

    nice_ts.C2G_LoginGate = (function() {

        /**
         * Properties of a C2G_LoginGate.
         * @memberof nice_ts
         * @interface IC2G_LoginGate
         * @property {number|Long|null} [Key] C2G_LoginGate Key
         * @property {number|Long|null} [GateId] C2G_LoginGate GateId
         */

        /**
         * Constructs a new C2G_LoginGate.
         * @memberof nice_ts
         * @classdesc Represents a C2G_LoginGate.
         * @implements IC2G_LoginGate
         * @constructor
         * @param {nice_ts.IC2G_LoginGate=} [properties] Properties to set
         */
        function C2G_LoginGate(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * C2G_LoginGate Key.
         * @member {number|Long} Key
         * @memberof nice_ts.C2G_LoginGate
         * @instance
         */
        C2G_LoginGate.prototype.Key = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * C2G_LoginGate GateId.
         * @member {number|Long} GateId
         * @memberof nice_ts.C2G_LoginGate
         * @instance
         */
        C2G_LoginGate.prototype.GateId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new C2G_LoginGate instance using the specified properties.
         * @function create
         * @memberof nice_ts.C2G_LoginGate
         * @static
         * @param {nice_ts.IC2G_LoginGate=} [properties] Properties to set
         * @returns {nice_ts.C2G_LoginGate} C2G_LoginGate instance
         */
        C2G_LoginGate.create = function create(properties) {
            return new C2G_LoginGate(properties);
        };

        /**
         * Encodes the specified C2G_LoginGate message. Does not implicitly {@link nice_ts.C2G_LoginGate.verify|verify} messages.
         * @function encode
         * @memberof nice_ts.C2G_LoginGate
         * @static
         * @param {nice_ts.IC2G_LoginGate} message C2G_LoginGate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2G_LoginGate.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Key != null && Object.hasOwnProperty.call(message, "Key"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.Key);
            if (message.GateId != null && Object.hasOwnProperty.call(message, "GateId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.GateId);
            return writer;
        };

        /**
         * Encodes the specified C2G_LoginGate message, length delimited. Does not implicitly {@link nice_ts.C2G_LoginGate.verify|verify} messages.
         * @function encodeDelimited
         * @memberof nice_ts.C2G_LoginGate
         * @static
         * @param {nice_ts.IC2G_LoginGate} message C2G_LoginGate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2G_LoginGate.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2G_LoginGate message from the specified reader or buffer.
         * @function decode
         * @memberof nice_ts.C2G_LoginGate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {nice_ts.C2G_LoginGate} C2G_LoginGate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2G_LoginGate.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.nice_ts.C2G_LoginGate();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Key = reader.int64();
                    break;
                case 2:
                    message.GateId = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2G_LoginGate message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof nice_ts.C2G_LoginGate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {nice_ts.C2G_LoginGate} C2G_LoginGate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2G_LoginGate.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2G_LoginGate message.
         * @function verify
         * @memberof nice_ts.C2G_LoginGate
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2G_LoginGate.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Key != null && message.hasOwnProperty("Key"))
                if (!$util.isInteger(message.Key) && !(message.Key && $util.isInteger(message.Key.low) && $util.isInteger(message.Key.high)))
                    return "Key: integer|Long expected";
            if (message.GateId != null && message.hasOwnProperty("GateId"))
                if (!$util.isInteger(message.GateId) && !(message.GateId && $util.isInteger(message.GateId.low) && $util.isInteger(message.GateId.high)))
                    return "GateId: integer|Long expected";
            return null;
        };

        /**
         * Creates a C2G_LoginGate message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof nice_ts.C2G_LoginGate
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {nice_ts.C2G_LoginGate} C2G_LoginGate
         */
        C2G_LoginGate.fromObject = function fromObject(object) {
            if (object instanceof $root.nice_ts.C2G_LoginGate)
                return object;
            var message = new $root.nice_ts.C2G_LoginGate();
            if (object.Key != null)
                if ($util.Long)
                    (message.Key = $util.Long.fromValue(object.Key)).unsigned = false;
                else if (typeof object.Key === "string")
                    message.Key = parseInt(object.Key, 10);
                else if (typeof object.Key === "number")
                    message.Key = object.Key;
                else if (typeof object.Key === "object")
                    message.Key = new $util.LongBits(object.Key.low >>> 0, object.Key.high >>> 0).toNumber();
            if (object.GateId != null)
                if ($util.Long)
                    (message.GateId = $util.Long.fromValue(object.GateId)).unsigned = false;
                else if (typeof object.GateId === "string")
                    message.GateId = parseInt(object.GateId, 10);
                else if (typeof object.GateId === "number")
                    message.GateId = object.GateId;
                else if (typeof object.GateId === "object")
                    message.GateId = new $util.LongBits(object.GateId.low >>> 0, object.GateId.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a C2G_LoginGate message. Also converts values to other types if specified.
         * @function toObject
         * @memberof nice_ts.C2G_LoginGate
         * @static
         * @param {nice_ts.C2G_LoginGate} message C2G_LoginGate
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2G_LoginGate.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.Key = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.Key = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.GateId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.GateId = options.longs === String ? "0" : 0;
            }
            if (message.Key != null && message.hasOwnProperty("Key"))
                if (typeof message.Key === "number")
                    object.Key = options.longs === String ? String(message.Key) : message.Key;
                else
                    object.Key = options.longs === String ? $util.Long.prototype.toString.call(message.Key) : options.longs === Number ? new $util.LongBits(message.Key.low >>> 0, message.Key.high >>> 0).toNumber() : message.Key;
            if (message.GateId != null && message.hasOwnProperty("GateId"))
                if (typeof message.GateId === "number")
                    object.GateId = options.longs === String ? String(message.GateId) : message.GateId;
                else
                    object.GateId = options.longs === String ? $util.Long.prototype.toString.call(message.GateId) : options.longs === Number ? new $util.LongBits(message.GateId.low >>> 0, message.GateId.high >>> 0).toNumber() : message.GateId;
            return object;
        };

        /**
         * Converts this C2G_LoginGate to JSON.
         * @function toJSON
         * @memberof nice_ts.C2G_LoginGate
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2G_LoginGate.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2G_LoginGate;
    })();

    nice_ts.G2C_LoginGate = (function() {

        /**
         * Properties of a G2C_LoginGate.
         * @memberof nice_ts
         * @interface IG2C_LoginGate
         * @property {number|null} [Error] G2C_LoginGate Error
         * @property {string|null} [Message] G2C_LoginGate Message
         * @property {number|Long|null} [PlayerId] G2C_LoginGate PlayerId
         */

        /**
         * Constructs a new G2C_LoginGate.
         * @memberof nice_ts
         * @classdesc Represents a G2C_LoginGate.
         * @implements IG2C_LoginGate
         * @constructor
         * @param {nice_ts.IG2C_LoginGate=} [properties] Properties to set
         */
        function G2C_LoginGate(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * G2C_LoginGate Error.
         * @member {number} Error
         * @memberof nice_ts.G2C_LoginGate
         * @instance
         */
        G2C_LoginGate.prototype.Error = 0;

        /**
         * G2C_LoginGate Message.
         * @member {string} Message
         * @memberof nice_ts.G2C_LoginGate
         * @instance
         */
        G2C_LoginGate.prototype.Message = "";

        /**
         * G2C_LoginGate PlayerId.
         * @member {number|Long} PlayerId
         * @memberof nice_ts.G2C_LoginGate
         * @instance
         */
        G2C_LoginGate.prototype.PlayerId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new G2C_LoginGate instance using the specified properties.
         * @function create
         * @memberof nice_ts.G2C_LoginGate
         * @static
         * @param {nice_ts.IG2C_LoginGate=} [properties] Properties to set
         * @returns {nice_ts.G2C_LoginGate} G2C_LoginGate instance
         */
        G2C_LoginGate.create = function create(properties) {
            return new G2C_LoginGate(properties);
        };

        /**
         * Encodes the specified G2C_LoginGate message. Does not implicitly {@link nice_ts.G2C_LoginGate.verify|verify} messages.
         * @function encode
         * @memberof nice_ts.G2C_LoginGate
         * @static
         * @param {nice_ts.IG2C_LoginGate} message G2C_LoginGate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        G2C_LoginGate.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.PlayerId != null && Object.hasOwnProperty.call(message, "PlayerId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.PlayerId);
            if (message.Error != null && Object.hasOwnProperty.call(message, "Error"))
                writer.uint32(/* id 91, wireType 0 =*/728).int32(message.Error);
            if (message.Message != null && Object.hasOwnProperty.call(message, "Message"))
                writer.uint32(/* id 92, wireType 2 =*/738).string(message.Message);
            return writer;
        };

        /**
         * Encodes the specified G2C_LoginGate message, length delimited. Does not implicitly {@link nice_ts.G2C_LoginGate.verify|verify} messages.
         * @function encodeDelimited
         * @memberof nice_ts.G2C_LoginGate
         * @static
         * @param {nice_ts.IG2C_LoginGate} message G2C_LoginGate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        G2C_LoginGate.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a G2C_LoginGate message from the specified reader or buffer.
         * @function decode
         * @memberof nice_ts.G2C_LoginGate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {nice_ts.G2C_LoginGate} G2C_LoginGate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        G2C_LoginGate.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.nice_ts.G2C_LoginGate();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 91:
                    message.Error = reader.int32();
                    break;
                case 92:
                    message.Message = reader.string();
                    break;
                case 1:
                    message.PlayerId = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a G2C_LoginGate message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof nice_ts.G2C_LoginGate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {nice_ts.G2C_LoginGate} G2C_LoginGate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        G2C_LoginGate.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a G2C_LoginGate message.
         * @function verify
         * @memberof nice_ts.G2C_LoginGate
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        G2C_LoginGate.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Error != null && message.hasOwnProperty("Error"))
                if (!$util.isInteger(message.Error))
                    return "Error: integer expected";
            if (message.Message != null && message.hasOwnProperty("Message"))
                if (!$util.isString(message.Message))
                    return "Message: string expected";
            if (message.PlayerId != null && message.hasOwnProperty("PlayerId"))
                if (!$util.isInteger(message.PlayerId) && !(message.PlayerId && $util.isInteger(message.PlayerId.low) && $util.isInteger(message.PlayerId.high)))
                    return "PlayerId: integer|Long expected";
            return null;
        };

        /**
         * Creates a G2C_LoginGate message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof nice_ts.G2C_LoginGate
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {nice_ts.G2C_LoginGate} G2C_LoginGate
         */
        G2C_LoginGate.fromObject = function fromObject(object) {
            if (object instanceof $root.nice_ts.G2C_LoginGate)
                return object;
            var message = new $root.nice_ts.G2C_LoginGate();
            if (object.Error != null)
                message.Error = object.Error | 0;
            if (object.Message != null)
                message.Message = String(object.Message);
            if (object.PlayerId != null)
                if ($util.Long)
                    (message.PlayerId = $util.Long.fromValue(object.PlayerId)).unsigned = false;
                else if (typeof object.PlayerId === "string")
                    message.PlayerId = parseInt(object.PlayerId, 10);
                else if (typeof object.PlayerId === "number")
                    message.PlayerId = object.PlayerId;
                else if (typeof object.PlayerId === "object")
                    message.PlayerId = new $util.LongBits(object.PlayerId.low >>> 0, object.PlayerId.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a G2C_LoginGate message. Also converts values to other types if specified.
         * @function toObject
         * @memberof nice_ts.G2C_LoginGate
         * @static
         * @param {nice_ts.G2C_LoginGate} message G2C_LoginGate
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        G2C_LoginGate.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.PlayerId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.PlayerId = options.longs === String ? "0" : 0;
                object.Error = 0;
                object.Message = "";
            }
            if (message.PlayerId != null && message.hasOwnProperty("PlayerId"))
                if (typeof message.PlayerId === "number")
                    object.PlayerId = options.longs === String ? String(message.PlayerId) : message.PlayerId;
                else
                    object.PlayerId = options.longs === String ? $util.Long.prototype.toString.call(message.PlayerId) : options.longs === Number ? new $util.LongBits(message.PlayerId.low >>> 0, message.PlayerId.high >>> 0).toNumber() : message.PlayerId;
            if (message.Error != null && message.hasOwnProperty("Error"))
                object.Error = message.Error;
            if (message.Message != null && message.hasOwnProperty("Message"))
                object.Message = message.Message;
            return object;
        };

        /**
         * Converts this G2C_LoginGate to JSON.
         * @function toJSON
         * @memberof nice_ts.G2C_LoginGate
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        G2C_LoginGate.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return G2C_LoginGate;
    })();

    nice_ts.C2GS_Test = (function() {

        /**
         * Properties of a C2GS_Test.
         * @memberof nice_ts
         * @interface IC2GS_Test
         * @property {number|null} [testID] C2GS_Test testID
         * @property {string|null} [testName] C2GS_Test testName
         */

        /**
         * Constructs a new C2GS_Test.
         * @memberof nice_ts
         * @classdesc Represents a C2GS_Test.
         * @implements IC2GS_Test
         * @constructor
         * @param {nice_ts.IC2GS_Test=} [properties] Properties to set
         */
        function C2GS_Test(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * C2GS_Test testID.
         * @member {number} testID
         * @memberof nice_ts.C2GS_Test
         * @instance
         */
        C2GS_Test.prototype.testID = 0;

        /**
         * C2GS_Test testName.
         * @member {string} testName
         * @memberof nice_ts.C2GS_Test
         * @instance
         */
        C2GS_Test.prototype.testName = "";

        /**
         * Creates a new C2GS_Test instance using the specified properties.
         * @function create
         * @memberof nice_ts.C2GS_Test
         * @static
         * @param {nice_ts.IC2GS_Test=} [properties] Properties to set
         * @returns {nice_ts.C2GS_Test} C2GS_Test instance
         */
        C2GS_Test.create = function create(properties) {
            return new C2GS_Test(properties);
        };

        /**
         * Encodes the specified C2GS_Test message. Does not implicitly {@link nice_ts.C2GS_Test.verify|verify} messages.
         * @function encode
         * @memberof nice_ts.C2GS_Test
         * @static
         * @param {nice_ts.IC2GS_Test} message C2GS_Test message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2GS_Test.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.testID != null && Object.hasOwnProperty.call(message, "testID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.testID);
            if (message.testName != null && Object.hasOwnProperty.call(message, "testName"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.testName);
            return writer;
        };

        /**
         * Encodes the specified C2GS_Test message, length delimited. Does not implicitly {@link nice_ts.C2GS_Test.verify|verify} messages.
         * @function encodeDelimited
         * @memberof nice_ts.C2GS_Test
         * @static
         * @param {nice_ts.IC2GS_Test} message C2GS_Test message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2GS_Test.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2GS_Test message from the specified reader or buffer.
         * @function decode
         * @memberof nice_ts.C2GS_Test
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {nice_ts.C2GS_Test} C2GS_Test
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2GS_Test.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.nice_ts.C2GS_Test();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.testID = reader.int32();
                    break;
                case 2:
                    message.testName = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2GS_Test message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof nice_ts.C2GS_Test
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {nice_ts.C2GS_Test} C2GS_Test
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2GS_Test.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2GS_Test message.
         * @function verify
         * @memberof nice_ts.C2GS_Test
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2GS_Test.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.testID != null && message.hasOwnProperty("testID"))
                if (!$util.isInteger(message.testID))
                    return "testID: integer expected";
            if (message.testName != null && message.hasOwnProperty("testName"))
                if (!$util.isString(message.testName))
                    return "testName: string expected";
            return null;
        };

        /**
         * Creates a C2GS_Test message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof nice_ts.C2GS_Test
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {nice_ts.C2GS_Test} C2GS_Test
         */
        C2GS_Test.fromObject = function fromObject(object) {
            if (object instanceof $root.nice_ts.C2GS_Test)
                return object;
            var message = new $root.nice_ts.C2GS_Test();
            if (object.testID != null)
                message.testID = object.testID | 0;
            if (object.testName != null)
                message.testName = String(object.testName);
            return message;
        };

        /**
         * Creates a plain object from a C2GS_Test message. Also converts values to other types if specified.
         * @function toObject
         * @memberof nice_ts.C2GS_Test
         * @static
         * @param {nice_ts.C2GS_Test} message C2GS_Test
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2GS_Test.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.testID = 0;
                object.testName = "";
            }
            if (message.testID != null && message.hasOwnProperty("testID"))
                object.testID = message.testID;
            if (message.testName != null && message.hasOwnProperty("testName"))
                object.testName = message.testName;
            return object;
        };

        /**
         * Converts this C2GS_Test to JSON.
         * @function toJSON
         * @memberof nice_ts.C2GS_Test
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2GS_Test.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2GS_Test;
    })();

    nice_ts.GS2C_Test = (function() {

        /**
         * Properties of a GS2C_Test.
         * @memberof nice_ts
         * @interface IGS2C_Test
         * @property {number|null} [Error] GS2C_Test Error
         * @property {string|null} [Message] GS2C_Test Message
         * @property {string|null} [testResponse] GS2C_Test testResponse
         */

        /**
         * Constructs a new GS2C_Test.
         * @memberof nice_ts
         * @classdesc Represents a GS2C_Test.
         * @implements IGS2C_Test
         * @constructor
         * @param {nice_ts.IGS2C_Test=} [properties] Properties to set
         */
        function GS2C_Test(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GS2C_Test Error.
         * @member {number} Error
         * @memberof nice_ts.GS2C_Test
         * @instance
         */
        GS2C_Test.prototype.Error = 0;

        /**
         * GS2C_Test Message.
         * @member {string} Message
         * @memberof nice_ts.GS2C_Test
         * @instance
         */
        GS2C_Test.prototype.Message = "";

        /**
         * GS2C_Test testResponse.
         * @member {string} testResponse
         * @memberof nice_ts.GS2C_Test
         * @instance
         */
        GS2C_Test.prototype.testResponse = "";

        /**
         * Creates a new GS2C_Test instance using the specified properties.
         * @function create
         * @memberof nice_ts.GS2C_Test
         * @static
         * @param {nice_ts.IGS2C_Test=} [properties] Properties to set
         * @returns {nice_ts.GS2C_Test} GS2C_Test instance
         */
        GS2C_Test.create = function create(properties) {
            return new GS2C_Test(properties);
        };

        /**
         * Encodes the specified GS2C_Test message. Does not implicitly {@link nice_ts.GS2C_Test.verify|verify} messages.
         * @function encode
         * @memberof nice_ts.GS2C_Test
         * @static
         * @param {nice_ts.IGS2C_Test} message GS2C_Test message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GS2C_Test.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.testResponse != null && Object.hasOwnProperty.call(message, "testResponse"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.testResponse);
            if (message.Error != null && Object.hasOwnProperty.call(message, "Error"))
                writer.uint32(/* id 91, wireType 0 =*/728).int32(message.Error);
            if (message.Message != null && Object.hasOwnProperty.call(message, "Message"))
                writer.uint32(/* id 92, wireType 2 =*/738).string(message.Message);
            return writer;
        };

        /**
         * Encodes the specified GS2C_Test message, length delimited. Does not implicitly {@link nice_ts.GS2C_Test.verify|verify} messages.
         * @function encodeDelimited
         * @memberof nice_ts.GS2C_Test
         * @static
         * @param {nice_ts.IGS2C_Test} message GS2C_Test message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GS2C_Test.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GS2C_Test message from the specified reader or buffer.
         * @function decode
         * @memberof nice_ts.GS2C_Test
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {nice_ts.GS2C_Test} GS2C_Test
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GS2C_Test.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.nice_ts.GS2C_Test();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 91:
                    message.Error = reader.int32();
                    break;
                case 92:
                    message.Message = reader.string();
                    break;
                case 1:
                    message.testResponse = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GS2C_Test message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof nice_ts.GS2C_Test
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {nice_ts.GS2C_Test} GS2C_Test
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GS2C_Test.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GS2C_Test message.
         * @function verify
         * @memberof nice_ts.GS2C_Test
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GS2C_Test.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Error != null && message.hasOwnProperty("Error"))
                if (!$util.isInteger(message.Error))
                    return "Error: integer expected";
            if (message.Message != null && message.hasOwnProperty("Message"))
                if (!$util.isString(message.Message))
                    return "Message: string expected";
            if (message.testResponse != null && message.hasOwnProperty("testResponse"))
                if (!$util.isString(message.testResponse))
                    return "testResponse: string expected";
            return null;
        };

        /**
         * Creates a GS2C_Test message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof nice_ts.GS2C_Test
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {nice_ts.GS2C_Test} GS2C_Test
         */
        GS2C_Test.fromObject = function fromObject(object) {
            if (object instanceof $root.nice_ts.GS2C_Test)
                return object;
            var message = new $root.nice_ts.GS2C_Test();
            if (object.Error != null)
                message.Error = object.Error | 0;
            if (object.Message != null)
                message.Message = String(object.Message);
            if (object.testResponse != null)
                message.testResponse = String(object.testResponse);
            return message;
        };

        /**
         * Creates a plain object from a GS2C_Test message. Also converts values to other types if specified.
         * @function toObject
         * @memberof nice_ts.GS2C_Test
         * @static
         * @param {nice_ts.GS2C_Test} message GS2C_Test
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GS2C_Test.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.testResponse = "";
                object.Error = 0;
                object.Message = "";
            }
            if (message.testResponse != null && message.hasOwnProperty("testResponse"))
                object.testResponse = message.testResponse;
            if (message.Error != null && message.hasOwnProperty("Error"))
                object.Error = message.Error;
            if (message.Message != null && message.hasOwnProperty("Message"))
                object.Message = message.Message;
            return object;
        };

        /**
         * Converts this GS2C_Test to JSON.
         * @function toJSON
         * @memberof nice_ts.GS2C_Test
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GS2C_Test.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GS2C_Test;
    })();

    return nice_ts;
})();

module.exports = $root;


/***/ }),

/***/ "csharp":
/*!*************************!*\
  !*** external "csharp" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("csharp");

/***/ }),

/***/ "puerts":
/*!*************************!*\
  !*** external "puerts" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("puerts");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*************************!*\
  !*** ./src/GameMain.ts ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! csharp */ "csharp");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(csharp__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _data_ui_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data/ui/common */ "./src/data/ui/common.ts");
/* harmony import */ var _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./framework/logger/Logger */ "./src/framework/logger/Logger.ts");
/* harmony import */ var _framework_scene_SceneDef__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./framework/scene/SceneDef */ "./src/framework/scene/SceneDef.ts");
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./global/GameConfig */ "./src/global/GameConfig.ts");
/* harmony import */ var _unittest_UnitTest__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./unittest/UnitTest */ "./src/unittest/UnitTest.ts");






class GameMain {
    constructor() {
        csharp__WEBPACK_IMPORTED_MODULE_0__.JsManager.Instance.JsOnApplicationQuit = () => this.onApplicationQuit();
        csharp__WEBPACK_IMPORTED_MODULE_0__.JsManager.Instance.JsOnDispose = () => this.onDispose();
    }
    async start() {
        csharp__WEBPACK_IMPORTED_MODULE_0__.UnityEngine.Debug.Log('Hellp Word!222222');
        //加载通用FairyGUI资源
        await _global_GameConfig__WEBPACK_IMPORTED_MODULE_4__.S.ResManager.loadFairyGUIPackage(_data_ui_common__WEBPACK_IMPORTED_MODULE_1__.CommonUI.PackageName);
        //do Unit Test
        _unittest_UnitTest__WEBPACK_IMPORTED_MODULE_5__.UnitTest.doTest();
        //进入登录模块
        await _global_GameConfig__WEBPACK_IMPORTED_MODULE_4__.S.SceneManager.loadScene(_framework_scene_SceneDef__WEBPACK_IMPORTED_MODULE_3__.SceneDef.GameStart);
    }
    ;
    onApplicationQuit() {
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_4__.S.GameObjectPool.cleanup(true);
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_2__.Logger.log("Game onApplicationQuit in JS....");
    }
    onDispose() {
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_2__.Logger.log("Game onDispose in JS....");
    }
}
new GameMain().start();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxLQUFLO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLEtBQUs7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxjQUFjLDBDQUEwQztBQUN4RDtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQTtB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QUFVO0FBQ3JCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLGFBQWE7QUFDYjtBQUNBLFlBQVksWUFBWTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFNBQVM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFLGtCQUFrQjtBQUNsRixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFD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QTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkI7O0FBRUE7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25COztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25COztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsWUFBWTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Es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QUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3hFLGtFQUE4QixHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM1RCxDQUFDO0lBRU0sS0FBSyxDQUFDLEtBQUs7UUFDZCx5REFBcUIsQ0FBQyxtQkFBbUIsQ0FBQztRQUMxQyxnQkFBZ0I7UUFDaEIsTUFBTSxnRkFBZ0MsQ0FBQyxpRUFBb0IsQ0FBQyxDQUFDO1FBRTdELGNBQWM7UUFDZCwrREFBZSxFQUFFLENBQUM7UUFFbEIsUUFBUTtRQUNSLE1BQU0sd0VBQXdCLENBQUMseUVBQWtCLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBQUEsQ0FBQztJQUVLLGlCQUFpQjtRQUNwQix3RUFBd0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixnRUFBVSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVNLFNBQVM7UUFDWixnRUFBVSxDQUFDLDBCQUEwQixDQUFDLENBQUM7SUFDM0MsQ0FBQztDQUNKO0FBSUQsSUFBSSxRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RzcHJvamVjdC8uL25vZGVfbW9kdWxlcy9AcHJvdG9idWZqcy9hc3Byb21pc2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL0Bwcm90b2J1ZmpzL2Jhc2U2NC9pbmRleC5qcyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9ub2RlX21vZHVsZXMvQHByb3RvYnVmanMvZXZlbnRlbWl0dGVyL2luZGV4LmpzIiwid2VicGFjazovL3RzcHJvamVjdC8uL25vZGVfbW9kdWxlcy9AcHJvdG9idWZqcy9mbG9hdC9pbmRleC5qcyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9ub2RlX21vZHVsZXMvQHByb3RvYnVmanMvaW5xdWlyZS9pbmRleC5qcyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9ub2RlX21vZHVsZXMvQHByb3RvYnVmanMvcG9vbC9pbmRleC5qcyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9ub2RlX21vZHVsZXMvQHByb3RvYnVmanMvdXRmOC9pbmRleC5qcyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9ub2RlX21vZHVsZXMvbG9uZy9zcmMvbG9uZy5qcyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9taW5pbWFsLmpzIiwid2VicGFjazovL3RzcHJvamVjdC8uL25vZGVfbW9kdWxlcy9wcm90b2J1ZmpzL3NyYy9pbmRleC1taW5pbWFsLmpzIiwid2VicGFjazovL3RzcHJvamVjdC8uL25vZGVfbW9kdWxlcy9wcm90b2J1ZmpzL3NyYy9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3Byb3RvYnVmanMvc3JjL3JlYWRlcl9idWZmZXIuanMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3Byb3RvYnVmanMvc3JjL3Jvb3RzLmpzIiwid2VicGFjazovL3RzcHJvamVjdC8uL25vZGVfbW9kdWxlcy9wcm90b2J1ZmpzL3NyYy9ycGMuanMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3Byb3RvYnVmanMvc3JjL3JwYy9zZXJ2aWNlLmpzIiwid2VicGFjazovL3RzcHJvamVjdC8uL25vZGVfbW9kdWxlcy9wcm90b2J1ZmpzL3NyYy91dGlsL2xvbmdiaXRzLmpzIiwid2VicGFjazovL3RzcHJvamVjdC8uL25vZGVfbW9kdWxlcy9wcm90b2J1ZmpzL3NyYy91dGlsL21pbmltYWwuanMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3Byb3RvYnVmanMvc3JjL3dyaXRlci5qcyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9zcmMvd3JpdGVyX2J1ZmZlci5qcyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZGF0YS9leGNlbC9Ta2lsbENvbmZpZy50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZGF0YS9wYi9PcGNvZGUudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2RhdGEvdWkvRmx5QmlyZC50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZGF0YS91aS9HYW1lU3RhcnQudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2RhdGEvdWkvY29tbW9uLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvY29tbW9uL0dhbWVPYmplY3RQb29sLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvY29tbW9uL0xpc3QudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2ZyYW1ld29yay9jb21tb24vTWVzc2VuZ2VyLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvY29tbW9uL05pY2VEZWNvcmF0b3IudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2ZyYW1ld29yay9jb21tb24vUmVzTWFuYWdlci50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZnJhbWV3b3JrL2NvbW1vbi9TaW5nbGV0b24udHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2ZyYW1ld29yay9jb3JlL0FycmF5TWFwLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvZW50aXR5L0FFbnRpdHkudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2ZyYW1ld29yay9lbnRpdHkvQ29tcG9uZW50LnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvZW50aXR5L0VudGl0eUZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2ZyYW1ld29yay9sb2dnZXIvTG9nZ2VyLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvbmV0L0dhbWVTZXNzaW9uLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvbmV0L0h0dHBNYW5hZ2VyLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvbmV0L01lc3NhZ2VQYXJzZXIudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2ZyYW1ld29yay9uZXQvTmV0RXJyb3JDb2RlLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvbmV0L1Nlc3Npb25NYW5hZ2VyLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvcmVkaGludHMvUmVkSGludHNNYW5hZ2VyLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvcmVkaGludHMvUmVkSGludHNNZXNzYWdlTWFuYWdlci50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZnJhbWV3b3JrL3NjZW5lL0Jhc2VTY2VuZS50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZnJhbWV3b3JrL3NjZW5lL1NjZW5lRGVmLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvc2NlbmUvU2NlbmVGYWN0b3J5LnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvc2NlbmUvU2NlbmVNYW5hZ2VyLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvdWkvVUlCYXNlLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvdWkvVUlEZWZpbmUudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2ZyYW1ld29yay91aS9VSUZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2ZyYW1ld29yay91aS9VSUxpYi9VSUxvYWRpbmcudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2ZyYW1ld29yay91aS9VSU1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2ZyYW1ld29yay91aS9VSVBhZ2UudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2ZyYW1ld29yay91aS9VSVBhbmVsLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvdXRpbC9UaW1lVXRpbC50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZ2FtZS9hcGkvTG9naW5BUEkudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2dhbWUvZW50aXR5L1BsYXllci50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZ2FtZS9lbnRpdHkvUGxheWVyTWFuYWdlci50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZ2FtZS9lbnRpdHkvY29tcG9uZW50L0JhZ0NvbXBvbmVudC50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZ2FtZS9lbnRpdHkvY29tcG9uZW50L1BsYXllckluZm9Db21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2dhbWUvZXZlbnQvVUlNZXNzYWdlLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9nYW1lL2V2ZW50L1VJTWVzc2FnZU1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2dhbWUvbW9kdWxlL2dhbWVzdGFydC9zY2VuZS9HYW1lU3RhcnRTY2VuZS50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZ2FtZS9tb2R1bGUvZ2FtZXN0YXJ0L3VpL1VJU3RhcnRWaWV3LnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9nYW1lL21vZHVsZS9nYW1lc3RhcnQvdm8vVm9Ib21lLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9nYW1lL21vZHVsZS9ob21lL3NjZW5lL0hvbWVTY2VuZS50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZ2FtZS9tb2R1bGUvaG9tZS92by9Wb0hvbWUudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2dhbWUvbW9kdWxlL3B2ZS9zY2VuZS9QdmVTY2VuZS50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZ2xvYmFsL0dhbWVDb25maWcudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL3VuaXR0ZXN0L1NpbmdsZXRvblRlc3QudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL3VuaXR0ZXN0L1VuaXRUZXN0LnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9kYXRhL3BiL2dlbi9wYi5qcyIsIndlYnBhY2s6Ly90c3Byb2plY3QvZXh0ZXJuYWwgY29tbW9uanMyIFwiY3NoYXJwXCIiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0L2V4dGVybmFsIGNvbW1vbmpzMiBcInB1ZXJ0c1wiIiwid2VicGFjazovL3RzcHJvamVjdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90c3Byb2plY3Qvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90c3Byb2plY3Qvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly90c3Byb2plY3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90c3Byb2plY3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvR2FtZU1haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbm1vZHVsZS5leHBvcnRzID0gYXNQcm9taXNlO1xyXG5cclxuLyoqXHJcbiAqIENhbGxiYWNrIGFzIHVzZWQgYnkge0BsaW5rIHV0aWwuYXNQcm9taXNlfS5cclxuICogQHR5cGVkZWYgYXNQcm9taXNlQ2FsbGJhY2tcclxuICogQHR5cGUge2Z1bmN0aW9ufVxyXG4gKiBAcGFyYW0ge0Vycm9yfG51bGx9IGVycm9yIEVycm9yLCBpZiBhbnlcclxuICogQHBhcmFtIHsuLi4qfSBwYXJhbXMgQWRkaXRpb25hbCBhcmd1bWVudHNcclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICovXHJcblxyXG4vKipcclxuICogUmV0dXJucyBhIHByb21pc2UgZnJvbSBhIG5vZGUtc3R5bGUgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAqIEBtZW1iZXJvZiB1dGlsXHJcbiAqIEBwYXJhbSB7YXNQcm9taXNlQ2FsbGJhY2t9IGZuIEZ1bmN0aW9uIHRvIGNhbGxcclxuICogQHBhcmFtIHsqfSBjdHggRnVuY3Rpb24gY29udGV4dFxyXG4gKiBAcGFyYW0gey4uLip9IHBhcmFtcyBGdW5jdGlvbiBhcmd1bWVudHNcclxuICogQHJldHVybnMge1Byb21pc2U8Kj59IFByb21pc2lmaWVkIGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBhc1Byb21pc2UoZm4sIGN0eC8qLCB2YXJhcmdzICovKSB7XHJcbiAgICB2YXIgcGFyYW1zICA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSksXHJcbiAgICAgICAgb2Zmc2V0ICA9IDAsXHJcbiAgICAgICAgaW5kZXggICA9IDIsXHJcbiAgICAgICAgcGVuZGluZyA9IHRydWU7XHJcbiAgICB3aGlsZSAoaW5kZXggPCBhcmd1bWVudHMubGVuZ3RoKVxyXG4gICAgICAgIHBhcmFtc1tvZmZzZXQrK10gPSBhcmd1bWVudHNbaW5kZXgrK107XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZXhlY3V0b3IocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgcGFyYW1zW29mZnNldF0gPSBmdW5jdGlvbiBjYWxsYmFjayhlcnIvKiwgdmFyYXJncyAqLykge1xyXG4gICAgICAgICAgICBpZiAocGVuZGluZykge1xyXG4gICAgICAgICAgICAgICAgcGVuZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycilcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJhbXMgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChvZmZzZXQgPCBwYXJhbXMubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXNbb2Zmc2V0KytdID0gYXJndW1lbnRzW29mZnNldF07XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZS5hcHBseShudWxsLCBwYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBmbi5hcHBseShjdHggfHwgbnVsbCwgcGFyYW1zKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgaWYgKHBlbmRpbmcpIHtcclxuICAgICAgICAgICAgICAgIHBlbmRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4vKipcclxuICogQSBtaW5pbWFsIGJhc2U2NCBpbXBsZW1lbnRhdGlvbiBmb3IgbnVtYmVyIGFycmF5cy5cclxuICogQG1lbWJlcm9mIHV0aWxcclxuICogQG5hbWVzcGFjZVxyXG4gKi9cclxudmFyIGJhc2U2NCA9IGV4cG9ydHM7XHJcblxyXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgYnl0ZSBsZW5ndGggb2YgYSBiYXNlNjQgZW5jb2RlZCBzdHJpbmcuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgQmFzZTY0IGVuY29kZWQgc3RyaW5nXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IEJ5dGUgbGVuZ3RoXHJcbiAqL1xyXG5iYXNlNjQubGVuZ3RoID0gZnVuY3Rpb24gbGVuZ3RoKHN0cmluZykge1xyXG4gICAgdmFyIHAgPSBzdHJpbmcubGVuZ3RoO1xyXG4gICAgaWYgKCFwKVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgdmFyIG4gPSAwO1xyXG4gICAgd2hpbGUgKC0tcCAlIDQgPiAxICYmIHN0cmluZy5jaGFyQXQocCkgPT09IFwiPVwiKVxyXG4gICAgICAgICsrbjtcclxuICAgIHJldHVybiBNYXRoLmNlaWwoc3RyaW5nLmxlbmd0aCAqIDMpIC8gNCAtIG47XHJcbn07XHJcblxyXG4vLyBCYXNlNjQgZW5jb2RpbmcgdGFibGVcclxudmFyIGI2NCA9IG5ldyBBcnJheSg2NCk7XHJcblxyXG4vLyBCYXNlNjQgZGVjb2RpbmcgdGFibGVcclxudmFyIHM2NCA9IG5ldyBBcnJheSgxMjMpO1xyXG5cclxuLy8gNjUuLjkwLCA5Ny4uMTIyLCA0OC4uNTcsIDQzLCA0N1xyXG5mb3IgKHZhciBpID0gMDsgaSA8IDY0OylcclxuICAgIHM2NFtiNjRbaV0gPSBpIDwgMjYgPyBpICsgNjUgOiBpIDwgNTIgPyBpICsgNzEgOiBpIDwgNjIgPyBpIC0gNCA6IGkgLSA1OSB8IDQzXSA9IGkrKztcclxuXHJcbi8qKlxyXG4gKiBFbmNvZGVzIGEgYnVmZmVyIHRvIGEgYmFzZTY0IGVuY29kZWQgc3RyaW5nLlxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZmZlciBTb3VyY2UgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCBTb3VyY2Ugc3RhcnRcclxuICogQHBhcmFtIHtudW1iZXJ9IGVuZCBTb3VyY2UgZW5kXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEJhc2U2NCBlbmNvZGVkIHN0cmluZ1xyXG4gKi9cclxuYmFzZTY0LmVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShidWZmZXIsIHN0YXJ0LCBlbmQpIHtcclxuICAgIHZhciBwYXJ0cyA9IG51bGwsXHJcbiAgICAgICAgY2h1bmsgPSBbXTtcclxuICAgIHZhciBpID0gMCwgLy8gb3V0cHV0IGluZGV4XHJcbiAgICAgICAgaiA9IDAsIC8vIGdvdG8gaW5kZXhcclxuICAgICAgICB0OyAgICAgLy8gdGVtcG9yYXJ5XHJcbiAgICB3aGlsZSAoc3RhcnQgPCBlbmQpIHtcclxuICAgICAgICB2YXIgYiA9IGJ1ZmZlcltzdGFydCsrXTtcclxuICAgICAgICBzd2l0Y2ggKGopIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgY2h1bmtbaSsrXSA9IGI2NFtiID4+IDJdO1xyXG4gICAgICAgICAgICAgICAgdCA9IChiICYgMykgPDwgNDtcclxuICAgICAgICAgICAgICAgIGogPSAxO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIGNodW5rW2krK10gPSBiNjRbdCB8IGIgPj4gNF07XHJcbiAgICAgICAgICAgICAgICB0ID0gKGIgJiAxNSkgPDwgMjtcclxuICAgICAgICAgICAgICAgIGogPSAyO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIGNodW5rW2krK10gPSBiNjRbdCB8IGIgPj4gNl07XHJcbiAgICAgICAgICAgICAgICBjaHVua1tpKytdID0gYjY0W2IgJiA2M107XHJcbiAgICAgICAgICAgICAgICBqID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaSA+IDgxOTEpIHtcclxuICAgICAgICAgICAgKHBhcnRzIHx8IChwYXJ0cyA9IFtdKSkucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY2h1bmspKTtcclxuICAgICAgICAgICAgaSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGopIHtcclxuICAgICAgICBjaHVua1tpKytdID0gYjY0W3RdO1xyXG4gICAgICAgIGNodW5rW2krK10gPSA2MTtcclxuICAgICAgICBpZiAoaiA9PT0gMSlcclxuICAgICAgICAgICAgY2h1bmtbaSsrXSA9IDYxO1xyXG4gICAgfVxyXG4gICAgaWYgKHBhcnRzKSB7XHJcbiAgICAgICAgaWYgKGkpXHJcbiAgICAgICAgICAgIHBhcnRzLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNodW5rLnNsaWNlKDAsIGkpKSk7XHJcbiAgICAgICAgcmV0dXJuIHBhcnRzLmpvaW4oXCJcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNodW5rLnNsaWNlKDAsIGkpKTtcclxufTtcclxuXHJcbnZhciBpbnZhbGlkRW5jb2RpbmcgPSBcImludmFsaWQgZW5jb2RpbmdcIjtcclxuXHJcbi8qKlxyXG4gKiBEZWNvZGVzIGEgYmFzZTY0IGVuY29kZWQgc3RyaW5nIHRvIGEgYnVmZmVyLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFNvdXJjZSBzdHJpbmdcclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWZmZXIgRGVzdGluYXRpb24gYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgRGVzdGluYXRpb24gb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IE51bWJlciBvZiBieXRlcyB3cml0dGVuXHJcbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiBlbmNvZGluZyBpcyBpbnZhbGlkXHJcbiAqL1xyXG5iYXNlNjQuZGVjb2RlID0gZnVuY3Rpb24gZGVjb2RlKHN0cmluZywgYnVmZmVyLCBvZmZzZXQpIHtcclxuICAgIHZhciBzdGFydCA9IG9mZnNldDtcclxuICAgIHZhciBqID0gMCwgLy8gZ290byBpbmRleFxyXG4gICAgICAgIHQ7ICAgICAvLyB0ZW1wb3JhcnlcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDspIHtcclxuICAgICAgICB2YXIgYyA9IHN0cmluZy5jaGFyQ29kZUF0KGkrKyk7XHJcbiAgICAgICAgaWYgKGMgPT09IDYxICYmIGogPiAxKVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBpZiAoKGMgPSBzNjRbY10pID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKGludmFsaWRFbmNvZGluZyk7XHJcbiAgICAgICAgc3dpdGNoIChqKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIHQgPSBjO1xyXG4gICAgICAgICAgICAgICAgaiA9IDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IHQgPDwgMiB8IChjICYgNDgpID4+IDQ7XHJcbiAgICAgICAgICAgICAgICB0ID0gYztcclxuICAgICAgICAgICAgICAgIGogPSAyO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSAodCAmIDE1KSA8PCA0IHwgKGMgJiA2MCkgPj4gMjtcclxuICAgICAgICAgICAgICAgIHQgPSBjO1xyXG4gICAgICAgICAgICAgICAgaiA9IDM7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9ICh0ICYgMykgPDwgNiB8IGM7XHJcbiAgICAgICAgICAgICAgICBqID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChqID09PSAxKVxyXG4gICAgICAgIHRocm93IEVycm9yKGludmFsaWRFbmNvZGluZyk7XHJcbiAgICByZXR1cm4gb2Zmc2V0IC0gc3RhcnQ7XHJcbn07XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhlIHNwZWNpZmllZCBzdHJpbmcgYXBwZWFycyB0byBiZSBiYXNlNjQgZW5jb2RlZC5cclxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBTdHJpbmcgdG8gdGVzdFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHByb2JhYmx5IGJhc2U2NCBlbmNvZGVkLCBvdGhlcndpc2UgZmFsc2VcclxuICovXHJcbmJhc2U2NC50ZXN0ID0gZnVuY3Rpb24gdGVzdChzdHJpbmcpIHtcclxuICAgIHJldHVybiAvXig/OltBLVphLXowLTkrL117NH0pKig/OltBLVphLXowLTkrL117Mn09PXxbQS1aYS16MC05Ky9dezN9PSk/JC8udGVzdChzdHJpbmcpO1xyXG59O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XHJcblxyXG4vKipcclxuICogQ29uc3RydWN0cyBhIG5ldyBldmVudCBlbWl0dGVyIGluc3RhbmNlLlxyXG4gKiBAY2xhc3NkZXNjIEEgbWluaW1hbCBldmVudCBlbWl0dGVyLlxyXG4gKiBAbWVtYmVyb2YgdXRpbFxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZ2lzdGVyZWQgbGlzdGVuZXJzLlxyXG4gICAgICogQHR5cGUge09iamVjdC48c3RyaW5nLCo+fVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgdGhpcy5fbGlzdGVuZXJzID0ge307XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZWdpc3RlcnMgYW4gZXZlbnQgbGlzdGVuZXIuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBldnQgRXZlbnQgbmFtZVxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmbiBMaXN0ZW5lclxyXG4gKiBAcGFyYW0geyp9IFtjdHhdIExpc3RlbmVyIGNvbnRleHRcclxuICogQHJldHVybnMge3V0aWwuRXZlbnRFbWl0dGVyfSBgdGhpc2BcclxuICovXHJcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbihldnQsIGZuLCBjdHgpIHtcclxuICAgICh0aGlzLl9saXN0ZW5lcnNbZXZ0XSB8fCAodGhpcy5fbGlzdGVuZXJzW2V2dF0gPSBbXSkpLnB1c2goe1xyXG4gICAgICAgIGZuICA6IGZuLFxyXG4gICAgICAgIGN0eCA6IGN0eCB8fCB0aGlzXHJcbiAgICB9KTtcclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgYW4gZXZlbnQgbGlzdGVuZXIgb3IgYW55IG1hdGNoaW5nIGxpc3RlbmVycyBpZiBhcmd1bWVudHMgYXJlIG9taXR0ZWQuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbZXZ0XSBFdmVudCBuYW1lLiBSZW1vdmVzIGFsbCBsaXN0ZW5lcnMgaWYgb21pdHRlZC5cclxuICogQHBhcmFtIHtmdW5jdGlvbn0gW2ZuXSBMaXN0ZW5lciB0byByZW1vdmUuIFJlbW92ZXMgYWxsIGxpc3RlbmVycyBvZiBgZXZ0YCBpZiBvbWl0dGVkLlxyXG4gKiBAcmV0dXJucyB7dXRpbC5FdmVudEVtaXR0ZXJ9IGB0aGlzYFxyXG4gKi9cclxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiBvZmYoZXZ0LCBmbikge1xyXG4gICAgaWYgKGV2dCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHRoaXMuX2xpc3RlbmVycyA9IHt9O1xyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgaWYgKGZuID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyc1tldnRdID0gW107XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnNbZXZ0XTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOylcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lcnNbaV0uZm4gPT09IGZuKVxyXG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgKytpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEVtaXRzIGFuIGV2ZW50IGJ5IGNhbGxpbmcgaXRzIGxpc3RlbmVycyB3aXRoIHRoZSBzcGVjaWZpZWQgYXJndW1lbnRzLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZ0IEV2ZW50IG5hbWVcclxuICogQHBhcmFtIHsuLi4qfSBhcmdzIEFyZ3VtZW50c1xyXG4gKiBAcmV0dXJucyB7dXRpbC5FdmVudEVtaXR0ZXJ9IGB0aGlzYFxyXG4gKi9cclxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdChldnQpIHtcclxuICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnNbZXZ0XTtcclxuICAgIGlmIChsaXN0ZW5lcnMpIHtcclxuICAgICAgICB2YXIgYXJncyA9IFtdLFxyXG4gICAgICAgICAgICBpID0gMTtcclxuICAgICAgICBmb3IgKDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7KVxyXG4gICAgICAgICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOylcclxuICAgICAgICAgICAgbGlzdGVuZXJzW2ldLmZuLmFwcGx5KGxpc3RlbmVyc1tpKytdLmN0eCwgYXJncyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoZmFjdG9yeSk7XHJcblxyXG4vKipcclxuICogUmVhZHMgLyB3cml0ZXMgZmxvYXRzIC8gZG91YmxlcyBmcm9tIC8gdG8gYnVmZmVycy5cclxuICogQG5hbWUgdXRpbC5mbG9hdFxyXG4gKiBAbmFtZXNwYWNlXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFdyaXRlcyBhIDMyIGJpdCBmbG9hdCB0byBhIGJ1ZmZlciB1c2luZyBsaXR0bGUgZW5kaWFuIGJ5dGUgb3JkZXIuXHJcbiAqIEBuYW1lIHV0aWwuZmxvYXQud3JpdGVGbG9hdExFXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsIFZhbHVlIHRvIHdyaXRlXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmIFRhcmdldCBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IHBvcyBUYXJnZXQgYnVmZmVyIG9mZnNldFxyXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBXcml0ZXMgYSAzMiBiaXQgZmxvYXQgdG8gYSBidWZmZXIgdXNpbmcgYmlnIGVuZGlhbiBieXRlIG9yZGVyLlxyXG4gKiBAbmFtZSB1dGlsLmZsb2F0LndyaXRlRmxvYXRCRVxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtudW1iZXJ9IHZhbCBWYWx1ZSB0byB3cml0ZVxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZiBUYXJnZXQgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwb3MgVGFyZ2V0IGJ1ZmZlciBvZmZzZXRcclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICovXHJcblxyXG4vKipcclxuICogUmVhZHMgYSAzMiBiaXQgZmxvYXQgZnJvbSBhIGJ1ZmZlciB1c2luZyBsaXR0bGUgZW5kaWFuIGJ5dGUgb3JkZXIuXHJcbiAqIEBuYW1lIHV0aWwuZmxvYXQucmVhZEZsb2F0TEVcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmIFNvdXJjZSBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IHBvcyBTb3VyY2UgYnVmZmVyIG9mZnNldFxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFJlYWRzIGEgMzIgYml0IGZsb2F0IGZyb20gYSBidWZmZXIgdXNpbmcgYmlnIGVuZGlhbiBieXRlIG9yZGVyLlxyXG4gKiBAbmFtZSB1dGlsLmZsb2F0LnJlYWRGbG9hdEJFXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZiBTb3VyY2UgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwb3MgU291cmNlIGJ1ZmZlciBvZmZzZXRcclxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBXcml0ZXMgYSA2NCBiaXQgZG91YmxlIHRvIGEgYnVmZmVyIHVzaW5nIGxpdHRsZSBlbmRpYW4gYnl0ZSBvcmRlci5cclxuICogQG5hbWUgdXRpbC5mbG9hdC53cml0ZURvdWJsZUxFXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsIFZhbHVlIHRvIHdyaXRlXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmIFRhcmdldCBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IHBvcyBUYXJnZXQgYnVmZmVyIG9mZnNldFxyXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBXcml0ZXMgYSA2NCBiaXQgZG91YmxlIHRvIGEgYnVmZmVyIHVzaW5nIGJpZyBlbmRpYW4gYnl0ZSBvcmRlci5cclxuICogQG5hbWUgdXRpbC5mbG9hdC53cml0ZURvdWJsZUJFXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsIFZhbHVlIHRvIHdyaXRlXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmIFRhcmdldCBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IHBvcyBUYXJnZXQgYnVmZmVyIG9mZnNldFxyXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBSZWFkcyBhIDY0IGJpdCBkb3VibGUgZnJvbSBhIGJ1ZmZlciB1c2luZyBsaXR0bGUgZW5kaWFuIGJ5dGUgb3JkZXIuXHJcbiAqIEBuYW1lIHV0aWwuZmxvYXQucmVhZERvdWJsZUxFXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZiBTb3VyY2UgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwb3MgU291cmNlIGJ1ZmZlciBvZmZzZXRcclxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBSZWFkcyBhIDY0IGJpdCBkb3VibGUgZnJvbSBhIGJ1ZmZlciB1c2luZyBiaWcgZW5kaWFuIGJ5dGUgb3JkZXIuXHJcbiAqIEBuYW1lIHV0aWwuZmxvYXQucmVhZERvdWJsZUJFXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZiBTb3VyY2UgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwb3MgU291cmNlIGJ1ZmZlciBvZmZzZXRcclxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxyXG4gKi9cclxuXHJcbi8vIEZhY3RvcnkgZnVuY3Rpb24gZm9yIHRoZSBwdXJwb3NlIG9mIG5vZGUtYmFzZWQgdGVzdGluZyBpbiBtb2RpZmllZCBnbG9iYWwgZW52aXJvbm1lbnRzXHJcbmZ1bmN0aW9uIGZhY3RvcnkoZXhwb3J0cykge1xyXG5cclxuICAgIC8vIGZsb2F0OiB0eXBlZCBhcnJheVxyXG4gICAgaWYgKHR5cGVvZiBGbG9hdDMyQXJyYXkgIT09IFwidW5kZWZpbmVkXCIpIChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdmFyIGYzMiA9IG5ldyBGbG9hdDMyQXJyYXkoWyAtMCBdKSxcclxuICAgICAgICAgICAgZjhiID0gbmV3IFVpbnQ4QXJyYXkoZjMyLmJ1ZmZlciksXHJcbiAgICAgICAgICAgIGxlICA9IGY4YlszXSA9PT0gMTI4O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB3cml0ZUZsb2F0X2YzMl9jcHkodmFsLCBidWYsIHBvcykge1xyXG4gICAgICAgICAgICBmMzJbMF0gPSB2YWw7XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgICAgXSA9IGY4YlswXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDFdID0gZjhiWzFdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgMl0gPSBmOGJbMl07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAzXSA9IGY4YlszXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHdyaXRlRmxvYXRfZjMyX3Jldih2YWwsIGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIGYzMlswXSA9IHZhbDtcclxuICAgICAgICAgICAgYnVmW3BvcyAgICBdID0gZjhiWzNdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgMV0gPSBmOGJbMl07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAyXSA9IGY4YlsxXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDNdID0gZjhiWzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBleHBvcnRzLndyaXRlRmxvYXRMRSA9IGxlID8gd3JpdGVGbG9hdF9mMzJfY3B5IDogd3JpdGVGbG9hdF9mMzJfcmV2O1xyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgZXhwb3J0cy53cml0ZUZsb2F0QkUgPSBsZSA/IHdyaXRlRmxvYXRfZjMyX3JldiA6IHdyaXRlRmxvYXRfZjMyX2NweTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVhZEZsb2F0X2YzMl9jcHkoYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgZjhiWzBdID0gYnVmW3BvcyAgICBdO1xyXG4gICAgICAgICAgICBmOGJbMV0gPSBidWZbcG9zICsgMV07XHJcbiAgICAgICAgICAgIGY4YlsyXSA9IGJ1Zltwb3MgKyAyXTtcclxuICAgICAgICAgICAgZjhiWzNdID0gYnVmW3BvcyArIDNdO1xyXG4gICAgICAgICAgICByZXR1cm4gZjMyWzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVhZEZsb2F0X2YzMl9yZXYoYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgZjhiWzNdID0gYnVmW3BvcyAgICBdO1xyXG4gICAgICAgICAgICBmOGJbMl0gPSBidWZbcG9zICsgMV07XHJcbiAgICAgICAgICAgIGY4YlsxXSA9IGJ1Zltwb3MgKyAyXTtcclxuICAgICAgICAgICAgZjhiWzBdID0gYnVmW3BvcyArIDNdO1xyXG4gICAgICAgICAgICByZXR1cm4gZjMyWzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBleHBvcnRzLnJlYWRGbG9hdExFID0gbGUgPyByZWFkRmxvYXRfZjMyX2NweSA6IHJlYWRGbG9hdF9mMzJfcmV2O1xyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgZXhwb3J0cy5yZWFkRmxvYXRCRSA9IGxlID8gcmVhZEZsb2F0X2YzMl9yZXYgOiByZWFkRmxvYXRfZjMyX2NweTtcclxuXHJcbiAgICAvLyBmbG9hdDogaWVlZTc1NFxyXG4gICAgfSkoKTsgZWxzZSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHdyaXRlRmxvYXRfaWVlZTc1NCh3cml0ZVVpbnQsIHZhbCwgYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgdmFyIHNpZ24gPSB2YWwgPCAwID8gMSA6IDA7XHJcbiAgICAgICAgICAgIGlmIChzaWduKVxyXG4gICAgICAgICAgICAgICAgdmFsID0gLXZhbDtcclxuICAgICAgICAgICAgaWYgKHZhbCA9PT0gMClcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgxIC8gdmFsID4gMCA/IC8qIHBvc2l0aXZlICovIDAgOiAvKiBuZWdhdGl2ZSAwICovIDIxNDc0ODM2NDgsIGJ1ZiwgcG9zKTtcclxuICAgICAgICAgICAgZWxzZSBpZiAoaXNOYU4odmFsKSlcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgyMTQzMjg5MzQ0LCBidWYsIHBvcyk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHZhbCA+IDMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgpIC8vICstSW5maW5pdHlcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgoc2lnbiA8PCAzMSB8IDIxMzkwOTUwNDApID4+PiAwLCBidWYsIHBvcyk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHZhbCA8IDEuMTc1NDk0MzUwODIyMjg3NWUtMzgpIC8vIGRlbm9ybWFsXHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoKHNpZ24gPDwgMzEgfCBNYXRoLnJvdW5kKHZhbCAvIDEuNDAxMjk4NDY0MzI0ODE3ZS00NSkpID4+PiAwLCBidWYsIHBvcyk7XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIGV4cG9uZW50ID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWwpIC8gTWF0aC5MTjIpLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hbnRpc3NhID0gTWF0aC5yb3VuZCh2YWwgKiBNYXRoLnBvdygyLCAtZXhwb25lbnQpICogODM4ODYwOCkgJiA4Mzg4NjA3O1xyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KChzaWduIDw8IDMxIHwgZXhwb25lbnQgKyAxMjcgPDwgMjMgfCBtYW50aXNzYSkgPj4+IDAsIGJ1ZiwgcG9zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXhwb3J0cy53cml0ZUZsb2F0TEUgPSB3cml0ZUZsb2F0X2llZWU3NTQuYmluZChudWxsLCB3cml0ZVVpbnRMRSk7XHJcbiAgICAgICAgZXhwb3J0cy53cml0ZUZsb2F0QkUgPSB3cml0ZUZsb2F0X2llZWU3NTQuYmluZChudWxsLCB3cml0ZVVpbnRCRSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlYWRGbG9hdF9pZWVlNzU0KHJlYWRVaW50LCBidWYsIHBvcykge1xyXG4gICAgICAgICAgICB2YXIgdWludCA9IHJlYWRVaW50KGJ1ZiwgcG9zKSxcclxuICAgICAgICAgICAgICAgIHNpZ24gPSAodWludCA+PiAzMSkgKiAyICsgMSxcclxuICAgICAgICAgICAgICAgIGV4cG9uZW50ID0gdWludCA+Pj4gMjMgJiAyNTUsXHJcbiAgICAgICAgICAgICAgICBtYW50aXNzYSA9IHVpbnQgJiA4Mzg4NjA3O1xyXG4gICAgICAgICAgICByZXR1cm4gZXhwb25lbnQgPT09IDI1NVxyXG4gICAgICAgICAgICAgICAgPyBtYW50aXNzYVxyXG4gICAgICAgICAgICAgICAgPyBOYU5cclxuICAgICAgICAgICAgICAgIDogc2lnbiAqIEluZmluaXR5XHJcbiAgICAgICAgICAgICAgICA6IGV4cG9uZW50ID09PSAwIC8vIGRlbm9ybWFsXHJcbiAgICAgICAgICAgICAgICA/IHNpZ24gKiAxLjQwMTI5ODQ2NDMyNDgxN2UtNDUgKiBtYW50aXNzYVxyXG4gICAgICAgICAgICAgICAgOiBzaWduICogTWF0aC5wb3coMiwgZXhwb25lbnQgLSAxNTApICogKG1hbnRpc3NhICsgODM4ODYwOCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBleHBvcnRzLnJlYWRGbG9hdExFID0gcmVhZEZsb2F0X2llZWU3NTQuYmluZChudWxsLCByZWFkVWludExFKTtcclxuICAgICAgICBleHBvcnRzLnJlYWRGbG9hdEJFID0gcmVhZEZsb2F0X2llZWU3NTQuYmluZChudWxsLCByZWFkVWludEJFKTtcclxuXHJcbiAgICB9KSgpO1xyXG5cclxuICAgIC8vIGRvdWJsZTogdHlwZWQgYXJyYXlcclxuICAgIGlmICh0eXBlb2YgRmxvYXQ2NEFycmF5ICE9PSBcInVuZGVmaW5lZFwiKSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHZhciBmNjQgPSBuZXcgRmxvYXQ2NEFycmF5KFstMF0pLFxyXG4gICAgICAgICAgICBmOGIgPSBuZXcgVWludDhBcnJheShmNjQuYnVmZmVyKSxcclxuICAgICAgICAgICAgbGUgID0gZjhiWzddID09PSAxMjg7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHdyaXRlRG91YmxlX2Y2NF9jcHkodmFsLCBidWYsIHBvcykge1xyXG4gICAgICAgICAgICBmNjRbMF0gPSB2YWw7XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgICAgXSA9IGY4YlswXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDFdID0gZjhiWzFdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgMl0gPSBmOGJbMl07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAzXSA9IGY4YlszXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDRdID0gZjhiWzRdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgNV0gPSBmOGJbNV07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyA2XSA9IGY4Yls2XTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDddID0gZjhiWzddO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gd3JpdGVEb3VibGVfZjY0X3Jldih2YWwsIGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIGY2NFswXSA9IHZhbDtcclxuICAgICAgICAgICAgYnVmW3BvcyAgICBdID0gZjhiWzddO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgMV0gPSBmOGJbNl07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAyXSA9IGY4Yls1XTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDNdID0gZjhiWzRdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgNF0gPSBmOGJbM107XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyA1XSA9IGY4YlsyXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDZdID0gZjhiWzFdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgN10gPSBmOGJbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgIGV4cG9ydHMud3JpdGVEb3VibGVMRSA9IGxlID8gd3JpdGVEb3VibGVfZjY0X2NweSA6IHdyaXRlRG91YmxlX2Y2NF9yZXY7XHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBleHBvcnRzLndyaXRlRG91YmxlQkUgPSBsZSA/IHdyaXRlRG91YmxlX2Y2NF9yZXYgOiB3cml0ZURvdWJsZV9mNjRfY3B5O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiByZWFkRG91YmxlX2Y2NF9jcHkoYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgZjhiWzBdID0gYnVmW3BvcyAgICBdO1xyXG4gICAgICAgICAgICBmOGJbMV0gPSBidWZbcG9zICsgMV07XHJcbiAgICAgICAgICAgIGY4YlsyXSA9IGJ1Zltwb3MgKyAyXTtcclxuICAgICAgICAgICAgZjhiWzNdID0gYnVmW3BvcyArIDNdO1xyXG4gICAgICAgICAgICBmOGJbNF0gPSBidWZbcG9zICsgNF07XHJcbiAgICAgICAgICAgIGY4Yls1XSA9IGJ1Zltwb3MgKyA1XTtcclxuICAgICAgICAgICAgZjhiWzZdID0gYnVmW3BvcyArIDZdO1xyXG4gICAgICAgICAgICBmOGJbN10gPSBidWZbcG9zICsgN107XHJcbiAgICAgICAgICAgIHJldHVybiBmNjRbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiByZWFkRG91YmxlX2Y2NF9yZXYoYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgZjhiWzddID0gYnVmW3BvcyAgICBdO1xyXG4gICAgICAgICAgICBmOGJbNl0gPSBidWZbcG9zICsgMV07XHJcbiAgICAgICAgICAgIGY4Yls1XSA9IGJ1Zltwb3MgKyAyXTtcclxuICAgICAgICAgICAgZjhiWzRdID0gYnVmW3BvcyArIDNdO1xyXG4gICAgICAgICAgICBmOGJbM10gPSBidWZbcG9zICsgNF07XHJcbiAgICAgICAgICAgIGY4YlsyXSA9IGJ1Zltwb3MgKyA1XTtcclxuICAgICAgICAgICAgZjhiWzFdID0gYnVmW3BvcyArIDZdO1xyXG4gICAgICAgICAgICBmOGJbMF0gPSBidWZbcG9zICsgN107XHJcbiAgICAgICAgICAgIHJldHVybiBmNjRbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgIGV4cG9ydHMucmVhZERvdWJsZUxFID0gbGUgPyByZWFkRG91YmxlX2Y2NF9jcHkgOiByZWFkRG91YmxlX2Y2NF9yZXY7XHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBleHBvcnRzLnJlYWREb3VibGVCRSA9IGxlID8gcmVhZERvdWJsZV9mNjRfcmV2IDogcmVhZERvdWJsZV9mNjRfY3B5O1xyXG5cclxuICAgIC8vIGRvdWJsZTogaWVlZTc1NFxyXG4gICAgfSkoKTsgZWxzZSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHdyaXRlRG91YmxlX2llZWU3NTQod3JpdGVVaW50LCBvZmYwLCBvZmYxLCB2YWwsIGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIHZhciBzaWduID0gdmFsIDwgMCA/IDEgOiAwO1xyXG4gICAgICAgICAgICBpZiAoc2lnbilcclxuICAgICAgICAgICAgICAgIHZhbCA9IC12YWw7XHJcbiAgICAgICAgICAgIGlmICh2YWwgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgwLCBidWYsIHBvcyArIG9mZjApO1xyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KDEgLyB2YWwgPiAwID8gLyogcG9zaXRpdmUgKi8gMCA6IC8qIG5lZ2F0aXZlIDAgKi8gMjE0NzQ4MzY0OCwgYnVmLCBwb3MgKyBvZmYxKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc05hTih2YWwpKSB7XHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoMCwgYnVmLCBwb3MgKyBvZmYwKTtcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgyMTQ2OTU5MzYwLCBidWYsIHBvcyArIG9mZjEpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbCA+IDEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4KSB7IC8vICstSW5maW5pdHlcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgwLCBidWYsIHBvcyArIG9mZjApO1xyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KChzaWduIDw8IDMxIHwgMjE0NjQzNTA3MikgPj4+IDAsIGJ1ZiwgcG9zICsgb2ZmMSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWFudGlzc2E7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsIDwgMi4yMjUwNzM4NTg1MDcyMDE0ZS0zMDgpIHsgLy8gZGVub3JtYWxcclxuICAgICAgICAgICAgICAgICAgICBtYW50aXNzYSA9IHZhbCAvIDVlLTMyNDtcclxuICAgICAgICAgICAgICAgICAgICB3cml0ZVVpbnQobWFudGlzc2EgPj4+IDAsIGJ1ZiwgcG9zICsgb2ZmMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgd3JpdGVVaW50KChzaWduIDw8IDMxIHwgbWFudGlzc2EgLyA0Mjk0OTY3Mjk2KSA+Pj4gMCwgYnVmLCBwb3MgKyBvZmYxKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV4cG9uZW50ID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWwpIC8gTWF0aC5MTjIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChleHBvbmVudCA9PT0gMTAyNClcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwb25lbnQgPSAxMDIzO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hbnRpc3NhID0gdmFsICogTWF0aC5wb3coMiwgLWV4cG9uZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB3cml0ZVVpbnQobWFudGlzc2EgKiA0NTAzNTk5NjI3MzcwNDk2ID4+PiAwLCBidWYsIHBvcyArIG9mZjApO1xyXG4gICAgICAgICAgICAgICAgICAgIHdyaXRlVWludCgoc2lnbiA8PCAzMSB8IGV4cG9uZW50ICsgMTAyMyA8PCAyMCB8IG1hbnRpc3NhICogMTA0ODU3NiAmIDEwNDg1NzUpID4+PiAwLCBidWYsIHBvcyArIG9mZjEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBleHBvcnRzLndyaXRlRG91YmxlTEUgPSB3cml0ZURvdWJsZV9pZWVlNzU0LmJpbmQobnVsbCwgd3JpdGVVaW50TEUsIDAsIDQpO1xyXG4gICAgICAgIGV4cG9ydHMud3JpdGVEb3VibGVCRSA9IHdyaXRlRG91YmxlX2llZWU3NTQuYmluZChudWxsLCB3cml0ZVVpbnRCRSwgNCwgMCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlYWREb3VibGVfaWVlZTc1NChyZWFkVWludCwgb2ZmMCwgb2ZmMSwgYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgdmFyIGxvID0gcmVhZFVpbnQoYnVmLCBwb3MgKyBvZmYwKSxcclxuICAgICAgICAgICAgICAgIGhpID0gcmVhZFVpbnQoYnVmLCBwb3MgKyBvZmYxKTtcclxuICAgICAgICAgICAgdmFyIHNpZ24gPSAoaGkgPj4gMzEpICogMiArIDEsXHJcbiAgICAgICAgICAgICAgICBleHBvbmVudCA9IGhpID4+PiAyMCAmIDIwNDcsXHJcbiAgICAgICAgICAgICAgICBtYW50aXNzYSA9IDQyOTQ5NjcyOTYgKiAoaGkgJiAxMDQ4NTc1KSArIGxvO1xyXG4gICAgICAgICAgICByZXR1cm4gZXhwb25lbnQgPT09IDIwNDdcclxuICAgICAgICAgICAgICAgID8gbWFudGlzc2FcclxuICAgICAgICAgICAgICAgID8gTmFOXHJcbiAgICAgICAgICAgICAgICA6IHNpZ24gKiBJbmZpbml0eVxyXG4gICAgICAgICAgICAgICAgOiBleHBvbmVudCA9PT0gMCAvLyBkZW5vcm1hbFxyXG4gICAgICAgICAgICAgICAgPyBzaWduICogNWUtMzI0ICogbWFudGlzc2FcclxuICAgICAgICAgICAgICAgIDogc2lnbiAqIE1hdGgucG93KDIsIGV4cG9uZW50IC0gMTA3NSkgKiAobWFudGlzc2EgKyA0NTAzNTk5NjI3MzcwNDk2KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV4cG9ydHMucmVhZERvdWJsZUxFID0gcmVhZERvdWJsZV9pZWVlNzU0LmJpbmQobnVsbCwgcmVhZFVpbnRMRSwgMCwgNCk7XHJcbiAgICAgICAgZXhwb3J0cy5yZWFkRG91YmxlQkUgPSByZWFkRG91YmxlX2llZWU3NTQuYmluZChudWxsLCByZWFkVWludEJFLCA0LCAwKTtcclxuXHJcbiAgICB9KSgpO1xyXG5cclxuICAgIHJldHVybiBleHBvcnRzO1xyXG59XHJcblxyXG4vLyB1aW50IGhlbHBlcnNcclxuXHJcbmZ1bmN0aW9uIHdyaXRlVWludExFKHZhbCwgYnVmLCBwb3MpIHtcclxuICAgIGJ1Zltwb3MgICAgXSA9ICB2YWwgICAgICAgICYgMjU1O1xyXG4gICAgYnVmW3BvcyArIDFdID0gIHZhbCA+Pj4gOCAgJiAyNTU7XHJcbiAgICBidWZbcG9zICsgMl0gPSAgdmFsID4+PiAxNiAmIDI1NTtcclxuICAgIGJ1Zltwb3MgKyAzXSA9ICB2YWwgPj4+IDI0O1xyXG59XHJcblxyXG5mdW5jdGlvbiB3cml0ZVVpbnRCRSh2YWwsIGJ1ZiwgcG9zKSB7XHJcbiAgICBidWZbcG9zICAgIF0gPSAgdmFsID4+PiAyNDtcclxuICAgIGJ1Zltwb3MgKyAxXSA9ICB2YWwgPj4+IDE2ICYgMjU1O1xyXG4gICAgYnVmW3BvcyArIDJdID0gIHZhbCA+Pj4gOCAgJiAyNTU7XHJcbiAgICBidWZbcG9zICsgM10gPSAgdmFsICAgICAgICAmIDI1NTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVhZFVpbnRMRShidWYsIHBvcykge1xyXG4gICAgcmV0dXJuIChidWZbcG9zICAgIF1cclxuICAgICAgICAgIHwgYnVmW3BvcyArIDFdIDw8IDhcclxuICAgICAgICAgIHwgYnVmW3BvcyArIDJdIDw8IDE2XHJcbiAgICAgICAgICB8IGJ1Zltwb3MgKyAzXSA8PCAyNCkgPj4+IDA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlYWRVaW50QkUoYnVmLCBwb3MpIHtcclxuICAgIHJldHVybiAoYnVmW3BvcyAgICBdIDw8IDI0XHJcbiAgICAgICAgICB8IGJ1Zltwb3MgKyAxXSA8PCAxNlxyXG4gICAgICAgICAgfCBidWZbcG9zICsgMl0gPDwgOFxyXG4gICAgICAgICAgfCBidWZbcG9zICsgM10pID4+PiAwO1xyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGlucXVpcmU7XHJcblxyXG4vKipcclxuICogUmVxdWlyZXMgYSBtb2R1bGUgb25seSBpZiBhdmFpbGFibGUuXHJcbiAqIEBtZW1iZXJvZiB1dGlsXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2R1bGVOYW1lIE1vZHVsZSB0byByZXF1aXJlXHJcbiAqIEByZXR1cm5zIHs/T2JqZWN0fSBSZXF1aXJlZCBtb2R1bGUgaWYgYXZhaWxhYmxlIGFuZCBub3QgZW1wdHksIG90aGVyd2lzZSBgbnVsbGBcclxuICovXHJcbmZ1bmN0aW9uIGlucXVpcmUobW9kdWxlTmFtZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB2YXIgbW9kID0gZXZhbChcInF1aXJlXCIucmVwbGFjZSgvXi8sXCJyZVwiKSkobW9kdWxlTmFtZSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZXZhbFxyXG4gICAgICAgIGlmIChtb2QgJiYgKG1vZC5sZW5ndGggfHwgT2JqZWN0LmtleXMobW9kKS5sZW5ndGgpKVxyXG4gICAgICAgICAgICByZXR1cm4gbW9kO1xyXG4gICAgfSBjYXRjaCAoZSkge30gLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1lbXB0eVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbm1vZHVsZS5leHBvcnRzID0gcG9vbDtcclxuXHJcbi8qKlxyXG4gKiBBbiBhbGxvY2F0b3IgYXMgdXNlZCBieSB7QGxpbmsgdXRpbC5wb29sfS5cclxuICogQHR5cGVkZWYgUG9vbEFsbG9jYXRvclxyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzaXplIEJ1ZmZlciBzaXplXHJcbiAqIEByZXR1cm5zIHtVaW50OEFycmF5fSBCdWZmZXJcclxuICovXHJcblxyXG4vKipcclxuICogQSBzbGljZXIgYXMgdXNlZCBieSB7QGxpbmsgdXRpbC5wb29sfS5cclxuICogQHR5cGVkZWYgUG9vbFNsaWNlclxyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCBTdGFydCBvZmZzZXRcclxuICogQHBhcmFtIHtudW1iZXJ9IGVuZCBFbmQgb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHtVaW50OEFycmF5fSBCdWZmZXIgc2xpY2VcclxuICogQHRoaXMge1VpbnQ4QXJyYXl9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEEgZ2VuZXJhbCBwdXJwb3NlIGJ1ZmZlciBwb29sLlxyXG4gKiBAbWVtYmVyb2YgdXRpbFxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtQb29sQWxsb2NhdG9yfSBhbGxvYyBBbGxvY2F0b3JcclxuICogQHBhcmFtIHtQb29sU2xpY2VyfSBzbGljZSBTbGljZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IFtzaXplPTgxOTJdIFNsYWIgc2l6ZVxyXG4gKiBAcmV0dXJucyB7UG9vbEFsbG9jYXRvcn0gUG9vbGVkIGFsbG9jYXRvclxyXG4gKi9cclxuZnVuY3Rpb24gcG9vbChhbGxvYywgc2xpY2UsIHNpemUpIHtcclxuICAgIHZhciBTSVpFICAgPSBzaXplIHx8IDgxOTI7XHJcbiAgICB2YXIgTUFYICAgID0gU0laRSA+Pj4gMTtcclxuICAgIHZhciBzbGFiICAgPSBudWxsO1xyXG4gICAgdmFyIG9mZnNldCA9IFNJWkU7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gcG9vbF9hbGxvYyhzaXplKSB7XHJcbiAgICAgICAgaWYgKHNpemUgPCAxIHx8IHNpemUgPiBNQVgpXHJcbiAgICAgICAgICAgIHJldHVybiBhbGxvYyhzaXplKTtcclxuICAgICAgICBpZiAob2Zmc2V0ICsgc2l6ZSA+IFNJWkUpIHtcclxuICAgICAgICAgICAgc2xhYiA9IGFsbG9jKFNJWkUpO1xyXG4gICAgICAgICAgICBvZmZzZXQgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgYnVmID0gc2xpY2UuY2FsbChzbGFiLCBvZmZzZXQsIG9mZnNldCArPSBzaXplKTtcclxuICAgICAgICBpZiAob2Zmc2V0ICYgNykgLy8gYWxpZ24gdG8gMzIgYml0XHJcbiAgICAgICAgICAgIG9mZnNldCA9IChvZmZzZXQgfCA3KSArIDE7XHJcbiAgICAgICAgcmV0dXJuIGJ1ZjtcclxuICAgIH07XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4vKipcclxuICogQSBtaW5pbWFsIFVURjggaW1wbGVtZW50YXRpb24gZm9yIG51bWJlciBhcnJheXMuXHJcbiAqIEBtZW1iZXJvZiB1dGlsXHJcbiAqIEBuYW1lc3BhY2VcclxuICovXHJcbnZhciB1dGY4ID0gZXhwb3J0cztcclxuXHJcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBVVEY4IGJ5dGUgbGVuZ3RoIG9mIGEgc3RyaW5nLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFN0cmluZ1xyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBCeXRlIGxlbmd0aFxyXG4gKi9cclxudXRmOC5sZW5ndGggPSBmdW5jdGlvbiB1dGY4X2xlbmd0aChzdHJpbmcpIHtcclxuICAgIHZhciBsZW4gPSAwLFxyXG4gICAgICAgIGMgPSAwO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBjID0gc3RyaW5nLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgICAgaWYgKGMgPCAxMjgpXHJcbiAgICAgICAgICAgIGxlbiArPSAxO1xyXG4gICAgICAgIGVsc2UgaWYgKGMgPCAyMDQ4KVxyXG4gICAgICAgICAgICBsZW4gKz0gMjtcclxuICAgICAgICBlbHNlIGlmICgoYyAmIDB4RkMwMCkgPT09IDB4RDgwMCAmJiAoc3RyaW5nLmNoYXJDb2RlQXQoaSArIDEpICYgMHhGQzAwKSA9PT0gMHhEQzAwKSB7XHJcbiAgICAgICAgICAgICsraTtcclxuICAgICAgICAgICAgbGVuICs9IDQ7XHJcbiAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgIGxlbiArPSAzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxlbjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZWFkcyBVVEY4IGJ5dGVzIGFzIGEgc3RyaW5nLlxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZmZlciBTb3VyY2UgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCBTb3VyY2Ugc3RhcnRcclxuICogQHBhcmFtIHtudW1iZXJ9IGVuZCBTb3VyY2UgZW5kXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFN0cmluZyByZWFkXHJcbiAqL1xyXG51dGY4LnJlYWQgPSBmdW5jdGlvbiB1dGY4X3JlYWQoYnVmZmVyLCBzdGFydCwgZW5kKSB7XHJcbiAgICB2YXIgbGVuID0gZW5kIC0gc3RhcnQ7XHJcbiAgICBpZiAobGVuIDwgMSlcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIHZhciBwYXJ0cyA9IG51bGwsXHJcbiAgICAgICAgY2h1bmsgPSBbXSxcclxuICAgICAgICBpID0gMCwgLy8gY2hhciBvZmZzZXRcclxuICAgICAgICB0OyAgICAgLy8gdGVtcG9yYXJ5XHJcbiAgICB3aGlsZSAoc3RhcnQgPCBlbmQpIHtcclxuICAgICAgICB0ID0gYnVmZmVyW3N0YXJ0KytdO1xyXG4gICAgICAgIGlmICh0IDwgMTI4KVxyXG4gICAgICAgICAgICBjaHVua1tpKytdID0gdDtcclxuICAgICAgICBlbHNlIGlmICh0ID4gMTkxICYmIHQgPCAyMjQpXHJcbiAgICAgICAgICAgIGNodW5rW2krK10gPSAodCAmIDMxKSA8PCA2IHwgYnVmZmVyW3N0YXJ0KytdICYgNjM7XHJcbiAgICAgICAgZWxzZSBpZiAodCA+IDIzOSAmJiB0IDwgMzY1KSB7XHJcbiAgICAgICAgICAgIHQgPSAoKHQgJiA3KSA8PCAxOCB8IChidWZmZXJbc3RhcnQrK10gJiA2MykgPDwgMTIgfCAoYnVmZmVyW3N0YXJ0KytdICYgNjMpIDw8IDYgfCBidWZmZXJbc3RhcnQrK10gJiA2MykgLSAweDEwMDAwO1xyXG4gICAgICAgICAgICBjaHVua1tpKytdID0gMHhEODAwICsgKHQgPj4gMTApO1xyXG4gICAgICAgICAgICBjaHVua1tpKytdID0gMHhEQzAwICsgKHQgJiAxMDIzKTtcclxuICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgY2h1bmtbaSsrXSA9ICh0ICYgMTUpIDw8IDEyIHwgKGJ1ZmZlcltzdGFydCsrXSAmIDYzKSA8PCA2IHwgYnVmZmVyW3N0YXJ0KytdICYgNjM7XHJcbiAgICAgICAgaWYgKGkgPiA4MTkxKSB7XHJcbiAgICAgICAgICAgIChwYXJ0cyB8fCAocGFydHMgPSBbXSkpLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNodW5rKSk7XHJcbiAgICAgICAgICAgIGkgPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChwYXJ0cykge1xyXG4gICAgICAgIGlmIChpKVxyXG4gICAgICAgICAgICBwYXJ0cy5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjaHVuay5zbGljZSgwLCBpKSkpO1xyXG4gICAgICAgIHJldHVybiBwYXJ0cy5qb2luKFwiXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjaHVuay5zbGljZSgwLCBpKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogV3JpdGVzIGEgc3RyaW5nIGFzIFVURjggYnl0ZXMuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgU291cmNlIHN0cmluZ1xyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZmZlciBEZXN0aW5hdGlvbiBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCBEZXN0aW5hdGlvbiBvZmZzZXRcclxuICogQHJldHVybnMge251bWJlcn0gQnl0ZXMgd3JpdHRlblxyXG4gKi9cclxudXRmOC53cml0ZSA9IGZ1bmN0aW9uIHV0Zjhfd3JpdGUoc3RyaW5nLCBidWZmZXIsIG9mZnNldCkge1xyXG4gICAgdmFyIHN0YXJ0ID0gb2Zmc2V0LFxyXG4gICAgICAgIGMxLCAvLyBjaGFyYWN0ZXIgMVxyXG4gICAgICAgIGMyOyAvLyBjaGFyYWN0ZXIgMlxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBjMSA9IHN0cmluZy5jaGFyQ29kZUF0KGkpO1xyXG4gICAgICAgIGlmIChjMSA8IDEyOCkge1xyXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gYzE7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjMSA8IDIwNDgpIHtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxID4+IDYgICAgICAgfCAxOTI7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSBjMSAgICAgICAmIDYzIHwgMTI4O1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKGMxICYgMHhGQzAwKSA9PT0gMHhEODAwICYmICgoYzIgPSBzdHJpbmcuY2hhckNvZGVBdChpICsgMSkpICYgMHhGQzAwKSA9PT0gMHhEQzAwKSB7XHJcbiAgICAgICAgICAgIGMxID0gMHgxMDAwMCArICgoYzEgJiAweDAzRkYpIDw8IDEwKSArIChjMiAmIDB4MDNGRik7XHJcbiAgICAgICAgICAgICsraTtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxID4+IDE4ICAgICAgfCAyNDA7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSBjMSA+PiAxMiAmIDYzIHwgMTI4O1xyXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gYzEgPj4gNiAgJiA2MyB8IDEyODtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxICAgICAgICYgNjMgfCAxMjg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxID4+IDEyICAgICAgfCAyMjQ7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSBjMSA+PiA2ICAmIDYzIHwgMTI4O1xyXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gYzEgICAgICAgJiA2MyB8IDEyODtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2Zmc2V0IC0gc3RhcnQ7XHJcbn07XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gTG9uZztcclxuXHJcbi8qKlxyXG4gKiB3YXNtIG9wdGltaXphdGlvbnMsIHRvIGRvIG5hdGl2ZSBpNjQgbXVsdGlwbGljYXRpb24gYW5kIGRpdmlkZVxyXG4gKi9cclxudmFyIHdhc20gPSBudWxsO1xyXG5cclxudHJ5IHtcclxuICB3YXNtID0gbmV3IFdlYkFzc2VtYmx5Lkluc3RhbmNlKG5ldyBXZWJBc3NlbWJseS5Nb2R1bGUobmV3IFVpbnQ4QXJyYXkoW1xyXG4gICAgMCwgOTcsIDExNSwgMTA5LCAxLCAwLCAwLCAwLCAxLCAxMywgMiwgOTYsIDAsIDEsIDEyNywgOTYsIDQsIDEyNywgMTI3LCAxMjcsIDEyNywgMSwgMTI3LCAzLCA3LCA2LCAwLCAxLCAxLCAxLCAxLCAxLCA2LCA2LCAxLCAxMjcsIDEsIDY1LCAwLCAxMSwgNywgNTAsIDYsIDMsIDEwOSwgMTE3LCAxMDgsIDAsIDEsIDUsIDEwMCwgMTA1LCAxMTgsIDk1LCAxMTUsIDAsIDIsIDUsIDEwMCwgMTA1LCAxMTgsIDk1LCAxMTcsIDAsIDMsIDUsIDExNCwgMTAxLCAxMDksIDk1LCAxMTUsIDAsIDQsIDUsIDExNCwgMTAxLCAxMDksIDk1LCAxMTcsIDAsIDUsIDgsIDEwMywgMTAxLCAxMTYsIDk1LCAxMDQsIDEwNSwgMTAzLCAxMDQsIDAsIDAsIDEwLCAxOTEsIDEsIDYsIDQsIDAsIDM1LCAwLCAxMSwgMzYsIDEsIDEsIDEyNiwgMzIsIDAsIDE3MywgMzIsIDEsIDE3MywgNjYsIDMyLCAxMzQsIDEzMiwgMzIsIDIsIDE3MywgMzIsIDMsIDE3MywgNjYsIDMyLCAxMzQsIDEzMiwgMTI2LCAzNCwgNCwgNjYsIDMyLCAxMzUsIDE2NywgMzYsIDAsIDMyLCA0LCAxNjcsIDExLCAzNiwgMSwgMSwgMTI2LCAzMiwgMCwgMTczLCAzMiwgMSwgMTczLCA2NiwgMzIsIDEzNCwgMTMyLCAzMiwgMiwgMTczLCAzMiwgMywgMTczLCA2NiwgMzIsIDEzNCwgMTMyLCAxMjcsIDM0LCA0LCA2NiwgMzIsIDEzNSwgMTY3LCAzNiwgMCwgMzIsIDQsIDE2NywgMTEsIDM2LCAxLCAxLCAxMjYsIDMyLCAwLCAxNzMsIDMyLCAxLCAxNzMsIDY2LCAzMiwgMTM0LCAxMzIsIDMyLCAyLCAxNzMsIDMyLCAzLCAxNzMsIDY2LCAzMiwgMTM0LCAxMzIsIDEyOCwgMzQsIDQsIDY2LCAzMiwgMTM1LCAxNjcsIDM2LCAwLCAzMiwgNCwgMTY3LCAxMSwgMzYsIDEsIDEsIDEyNiwgMzIsIDAsIDE3MywgMzIsIDEsIDE3MywgNjYsIDMyLCAxMzQsIDEzMiwgMzIsIDIsIDE3MywgMzIsIDMsIDE3MywgNjYsIDMyLCAxMzQsIDEzMiwgMTI5LCAzNCwgNCwgNjYsIDMyLCAxMzUsIDE2NywgMzYsIDAsIDMyLCA0LCAxNjcsIDExLCAzNiwgMSwgMSwgMTI2LCAzMiwgMCwgMTczLCAzMiwgMSwgMTczLCA2NiwgMzIsIDEzNCwgMTMyLCAzMiwgMiwgMTczLCAzMiwgMywgMTczLCA2NiwgMzIsIDEzNCwgMTMyLCAxMzAsIDM0LCA0LCA2NiwgMzIsIDEzNSwgMTY3LCAzNiwgMCwgMzIsIDQsIDE2NywgMTFcclxuICBdKSksIHt9KS5leHBvcnRzO1xyXG59IGNhdGNoIChlKSB7XHJcbiAgLy8gbm8gd2FzbSBzdXBwb3J0IDooXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb25zdHJ1Y3RzIGEgNjQgYml0IHR3bydzLWNvbXBsZW1lbnQgaW50ZWdlciwgZ2l2ZW4gaXRzIGxvdyBhbmQgaGlnaCAzMiBiaXQgdmFsdWVzIGFzICpzaWduZWQqIGludGVnZXJzLlxyXG4gKiAgU2VlIHRoZSBmcm9tKiBmdW5jdGlvbnMgYmVsb3cgZm9yIG1vcmUgY29udmVuaWVudCB3YXlzIG9mIGNvbnN0cnVjdGluZyBMb25ncy5cclxuICogQGV4cG9ydHMgTG9uZ1xyXG4gKiBAY2xhc3MgQSBMb25nIGNsYXNzIGZvciByZXByZXNlbnRpbmcgYSA2NCBiaXQgdHdvJ3MtY29tcGxlbWVudCBpbnRlZ2VyIHZhbHVlLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gbG93IFRoZSBsb3cgKHNpZ25lZCkgMzIgYml0cyBvZiB0aGUgbG9uZ1xyXG4gKiBAcGFyYW0ge251bWJlcn0gaGlnaCBUaGUgaGlnaCAoc2lnbmVkKSAzMiBiaXRzIG9mIHRoZSBsb25nXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IHVuc2lnbmVkIFdoZXRoZXIgdW5zaWduZWQgb3Igbm90LCBkZWZhdWx0cyB0byBzaWduZWRcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBMb25nKGxvdywgaGlnaCwgdW5zaWduZWQpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBsb3cgMzIgYml0cyBhcyBhIHNpZ25lZCB2YWx1ZS5cclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHRoaXMubG93ID0gbG93IHwgMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBoaWdoIDMyIGJpdHMgYXMgYSBzaWduZWQgdmFsdWUuXHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmhpZ2ggPSBoaWdoIHwgMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdoZXRoZXIgdW5zaWduZWQgb3Igbm90LlxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIHRoaXMudW5zaWduZWQgPSAhIXVuc2lnbmVkO1xyXG59XHJcblxyXG4vLyBUaGUgaW50ZXJuYWwgcmVwcmVzZW50YXRpb24gb2YgYSBsb25nIGlzIHRoZSB0d28gZ2l2ZW4gc2lnbmVkLCAzMi1iaXQgdmFsdWVzLlxyXG4vLyBXZSB1c2UgMzItYml0IHBpZWNlcyBiZWNhdXNlIHRoZXNlIGFyZSB0aGUgc2l6ZSBvZiBpbnRlZ2VycyBvbiB3aGljaFxyXG4vLyBKYXZhc2NyaXB0IHBlcmZvcm1zIGJpdC1vcGVyYXRpb25zLiAgRm9yIG9wZXJhdGlvbnMgbGlrZSBhZGRpdGlvbiBhbmRcclxuLy8gbXVsdGlwbGljYXRpb24sIHdlIHNwbGl0IGVhY2ggbnVtYmVyIGludG8gMTYgYml0IHBpZWNlcywgd2hpY2ggY2FuIGVhc2lseSBiZVxyXG4vLyBtdWx0aXBsaWVkIHdpdGhpbiBKYXZhc2NyaXB0J3MgZmxvYXRpbmctcG9pbnQgcmVwcmVzZW50YXRpb24gd2l0aG91dCBvdmVyZmxvd1xyXG4vLyBvciBjaGFuZ2UgaW4gc2lnbi5cclxuLy9cclxuLy8gSW4gdGhlIGFsZ29yaXRobXMgYmVsb3csIHdlIGZyZXF1ZW50bHkgcmVkdWNlIHRoZSBuZWdhdGl2ZSBjYXNlIHRvIHRoZVxyXG4vLyBwb3NpdGl2ZSBjYXNlIGJ5IG5lZ2F0aW5nIHRoZSBpbnB1dChzKSBhbmQgdGhlbiBwb3N0LXByb2Nlc3NpbmcgdGhlIHJlc3VsdC5cclxuLy8gTm90ZSB0aGF0IHdlIG11c3QgQUxXQVlTIGNoZWNrIHNwZWNpYWxseSB3aGV0aGVyIHRob3NlIHZhbHVlcyBhcmUgTUlOX1ZBTFVFXHJcbi8vICgtMl42MykgYmVjYXVzZSAtTUlOX1ZBTFVFID09IE1JTl9WQUxVRSAoc2luY2UgMl42MyBjYW5ub3QgYmUgcmVwcmVzZW50ZWQgYXNcclxuLy8gYSBwb3NpdGl2ZSBudW1iZXIsIGl0IG92ZXJmbG93cyBiYWNrIGludG8gYSBuZWdhdGl2ZSkuICBOb3QgaGFuZGxpbmcgdGhpc1xyXG4vLyBjYXNlIHdvdWxkIG9mdGVuIHJlc3VsdCBpbiBpbmZpbml0ZSByZWN1cnNpb24uXHJcbi8vXHJcbi8vIENvbW1vbiBjb25zdGFudCB2YWx1ZXMgWkVSTywgT05FLCBORUdfT05FLCBldGMuIGFyZSBkZWZpbmVkIGJlbG93IHRoZSBmcm9tKlxyXG4vLyBtZXRob2RzIG9uIHdoaWNoIHRoZXkgZGVwZW5kLlxyXG5cclxuLyoqXHJcbiAqIEFuIGluZGljYXRvciB1c2VkIHRvIHJlbGlhYmx5IGRldGVybWluZSBpZiBhbiBvYmplY3QgaXMgYSBMb25nIG9yIG5vdC5cclxuICogQHR5cGUge2Jvb2xlYW59XHJcbiAqIEBjb25zdFxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuTG9uZy5wcm90b3R5cGUuX19pc0xvbmdfXztcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShMb25nLnByb3RvdHlwZSwgXCJfX2lzTG9uZ19fXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcblxyXG4vKipcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7Kn0gb2JqIE9iamVjdFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICogQGlubmVyXHJcbiAqL1xyXG5mdW5jdGlvbiBpc0xvbmcob2JqKSB7XHJcbiAgICByZXR1cm4gKG9iaiAmJiBvYmpbXCJfX2lzTG9uZ19fXCJdKSA9PT0gdHJ1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoZSBzcGVjaWZpZWQgb2JqZWN0IGlzIGEgTG9uZy5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7Kn0gb2JqIE9iamVjdFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbkxvbmcuaXNMb25nID0gaXNMb25nO1xyXG5cclxuLyoqXHJcbiAqIEEgY2FjaGUgb2YgdGhlIExvbmcgcmVwcmVzZW50YXRpb25zIG9mIHNtYWxsIGludGVnZXIgdmFsdWVzLlxyXG4gKiBAdHlwZSB7IU9iamVjdH1cclxuICogQGlubmVyXHJcbiAqL1xyXG52YXIgSU5UX0NBQ0hFID0ge307XHJcblxyXG4vKipcclxuICogQSBjYWNoZSBvZiB0aGUgTG9uZyByZXByZXNlbnRhdGlvbnMgb2Ygc21hbGwgdW5zaWduZWQgaW50ZWdlciB2YWx1ZXMuXHJcbiAqIEB0eXBlIHshT2JqZWN0fVxyXG4gKiBAaW5uZXJcclxuICovXHJcbnZhciBVSU5UX0NBQ0hFID0ge307XHJcblxyXG4vKipcclxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IHVuc2lnbmVkXHJcbiAqIEByZXR1cm5zIHshTG9uZ31cclxuICogQGlubmVyXHJcbiAqL1xyXG5mdW5jdGlvbiBmcm9tSW50KHZhbHVlLCB1bnNpZ25lZCkge1xyXG4gICAgdmFyIG9iaiwgY2FjaGVkT2JqLCBjYWNoZTtcclxuICAgIGlmICh1bnNpZ25lZCkge1xyXG4gICAgICAgIHZhbHVlID4+Pj0gMDtcclxuICAgICAgICBpZiAoY2FjaGUgPSAoMCA8PSB2YWx1ZSAmJiB2YWx1ZSA8IDI1NikpIHtcclxuICAgICAgICAgICAgY2FjaGVkT2JqID0gVUlOVF9DQUNIRVt2YWx1ZV07XHJcbiAgICAgICAgICAgIGlmIChjYWNoZWRPYmopXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGVkT2JqO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvYmogPSBmcm9tQml0cyh2YWx1ZSwgKHZhbHVlIHwgMCkgPCAwID8gLTEgOiAwLCB0cnVlKTtcclxuICAgICAgICBpZiAoY2FjaGUpXHJcbiAgICAgICAgICAgIFVJTlRfQ0FDSEVbdmFsdWVdID0gb2JqO1xyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhbHVlIHw9IDA7XHJcbiAgICAgICAgaWYgKGNhY2hlID0gKC0xMjggPD0gdmFsdWUgJiYgdmFsdWUgPCAxMjgpKSB7XHJcbiAgICAgICAgICAgIGNhY2hlZE9iaiA9IElOVF9DQUNIRVt2YWx1ZV07XHJcbiAgICAgICAgICAgIGlmIChjYWNoZWRPYmopXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGVkT2JqO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvYmogPSBmcm9tQml0cyh2YWx1ZSwgdmFsdWUgPCAwID8gLTEgOiAwLCBmYWxzZSk7XHJcbiAgICAgICAgaWYgKGNhY2hlKVxyXG4gICAgICAgICAgICBJTlRfQ0FDSEVbdmFsdWVdID0gb2JqO1xyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGEgTG9uZyByZXByZXNlbnRpbmcgdGhlIGdpdmVuIDMyIGJpdCBpbnRlZ2VyIHZhbHVlLlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFRoZSAzMiBiaXQgaW50ZWdlciBpbiBxdWVzdGlvblxyXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSB1bnNpZ25lZCBXaGV0aGVyIHVuc2lnbmVkIG9yIG5vdCwgZGVmYXVsdHMgdG8gc2lnbmVkXHJcbiAqIEByZXR1cm5zIHshTG9uZ30gVGhlIGNvcnJlc3BvbmRpbmcgTG9uZyB2YWx1ZVxyXG4gKi9cclxuTG9uZy5mcm9tSW50ID0gZnJvbUludDtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWVcclxuICogQHBhcmFtIHtib29sZWFuPX0gdW5zaWduZWRcclxuICogQHJldHVybnMgeyFMb25nfVxyXG4gKiBAaW5uZXJcclxuICovXHJcbmZ1bmN0aW9uIGZyb21OdW1iZXIodmFsdWUsIHVuc2lnbmVkKSB7XHJcbiAgICBpZiAoaXNOYU4odmFsdWUpKVxyXG4gICAgICAgIHJldHVybiB1bnNpZ25lZCA/IFVaRVJPIDogWkVSTztcclxuICAgIGlmICh1bnNpZ25lZCkge1xyXG4gICAgICAgIGlmICh2YWx1ZSA8IDApXHJcbiAgICAgICAgICAgIHJldHVybiBVWkVSTztcclxuICAgICAgICBpZiAodmFsdWUgPj0gVFdPX1BXUl82NF9EQkwpXHJcbiAgICAgICAgICAgIHJldHVybiBNQVhfVU5TSUdORURfVkFMVUU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICh2YWx1ZSA8PSAtVFdPX1BXUl82M19EQkwpXHJcbiAgICAgICAgICAgIHJldHVybiBNSU5fVkFMVUU7XHJcbiAgICAgICAgaWYgKHZhbHVlICsgMSA+PSBUV09fUFdSXzYzX0RCTClcclxuICAgICAgICAgICAgcmV0dXJuIE1BWF9WQUxVRTtcclxuICAgIH1cclxuICAgIGlmICh2YWx1ZSA8IDApXHJcbiAgICAgICAgcmV0dXJuIGZyb21OdW1iZXIoLXZhbHVlLCB1bnNpZ25lZCkubmVnKCk7XHJcbiAgICByZXR1cm4gZnJvbUJpdHMoKHZhbHVlICUgVFdPX1BXUl8zMl9EQkwpIHwgMCwgKHZhbHVlIC8gVFdPX1BXUl8zMl9EQkwpIHwgMCwgdW5zaWduZWQpO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyBhIExvbmcgcmVwcmVzZW50aW5nIHRoZSBnaXZlbiB2YWx1ZSwgcHJvdmlkZWQgdGhhdCBpdCBpcyBhIGZpbml0ZSBudW1iZXIuIE90aGVyd2lzZSwgemVybyBpcyByZXR1cm5lZC5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBUaGUgbnVtYmVyIGluIHF1ZXN0aW9uXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IHVuc2lnbmVkIFdoZXRoZXIgdW5zaWduZWQgb3Igbm90LCBkZWZhdWx0cyB0byBzaWduZWRcclxuICogQHJldHVybnMgeyFMb25nfSBUaGUgY29ycmVzcG9uZGluZyBMb25nIHZhbHVlXHJcbiAqL1xyXG5Mb25nLmZyb21OdW1iZXIgPSBmcm9tTnVtYmVyO1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBsb3dCaXRzXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBoaWdoQml0c1xyXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSB1bnNpZ25lZFxyXG4gKiBAcmV0dXJucyB7IUxvbmd9XHJcbiAqIEBpbm5lclxyXG4gKi9cclxuZnVuY3Rpb24gZnJvbUJpdHMobG93Qml0cywgaGlnaEJpdHMsIHVuc2lnbmVkKSB7XHJcbiAgICByZXR1cm4gbmV3IExvbmcobG93Qml0cywgaGlnaEJpdHMsIHVuc2lnbmVkKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYSBMb25nIHJlcHJlc2VudGluZyB0aGUgNjQgYml0IGludGVnZXIgdGhhdCBjb21lcyBieSBjb25jYXRlbmF0aW5nIHRoZSBnaXZlbiBsb3cgYW5kIGhpZ2ggYml0cy4gRWFjaCBpc1xyXG4gKiAgYXNzdW1lZCB0byB1c2UgMzIgYml0cy5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBsb3dCaXRzIFRoZSBsb3cgMzIgYml0c1xyXG4gKiBAcGFyYW0ge251bWJlcn0gaGlnaEJpdHMgVGhlIGhpZ2ggMzIgYml0c1xyXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSB1bnNpZ25lZCBXaGV0aGVyIHVuc2lnbmVkIG9yIG5vdCwgZGVmYXVsdHMgdG8gc2lnbmVkXHJcbiAqIEByZXR1cm5zIHshTG9uZ30gVGhlIGNvcnJlc3BvbmRpbmcgTG9uZyB2YWx1ZVxyXG4gKi9cclxuTG9uZy5mcm9tQml0cyA9IGZyb21CaXRzO1xyXG5cclxuLyoqXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge251bWJlcn0gYmFzZVxyXG4gKiBAcGFyYW0ge251bWJlcn0gZXhwb25lbnRcclxuICogQHJldHVybnMge251bWJlcn1cclxuICogQGlubmVyXHJcbiAqL1xyXG52YXIgcG93X2RibCA9IE1hdGgucG93OyAvLyBVc2VkIDQgdGltZXMgKDQqOCB0byAxNSs0KVxyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcclxuICogQHBhcmFtIHsoYm9vbGVhbnxudW1iZXIpPX0gdW5zaWduZWRcclxuICogQHBhcmFtIHtudW1iZXI9fSByYWRpeFxyXG4gKiBAcmV0dXJucyB7IUxvbmd9XHJcbiAqIEBpbm5lclxyXG4gKi9cclxuZnVuY3Rpb24gZnJvbVN0cmluZyhzdHIsIHVuc2lnbmVkLCByYWRpeCkge1xyXG4gICAgaWYgKHN0ci5sZW5ndGggPT09IDApXHJcbiAgICAgICAgdGhyb3cgRXJyb3IoJ2VtcHR5IHN0cmluZycpO1xyXG4gICAgaWYgKHN0ciA9PT0gXCJOYU5cIiB8fCBzdHIgPT09IFwiSW5maW5pdHlcIiB8fCBzdHIgPT09IFwiK0luZmluaXR5XCIgfHwgc3RyID09PSBcIi1JbmZpbml0eVwiKVxyXG4gICAgICAgIHJldHVybiBaRVJPO1xyXG4gICAgaWYgKHR5cGVvZiB1bnNpZ25lZCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAvLyBGb3IgZ29vZy5tYXRoLmxvbmcgY29tcGF0aWJpbGl0eVxyXG4gICAgICAgIHJhZGl4ID0gdW5zaWduZWQsXHJcbiAgICAgICAgdW5zaWduZWQgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdW5zaWduZWQgPSAhISB1bnNpZ25lZDtcclxuICAgIH1cclxuICAgIHJhZGl4ID0gcmFkaXggfHwgMTA7XHJcbiAgICBpZiAocmFkaXggPCAyIHx8IDM2IDwgcmFkaXgpXHJcbiAgICAgICAgdGhyb3cgUmFuZ2VFcnJvcigncmFkaXgnKTtcclxuXHJcbiAgICB2YXIgcDtcclxuICAgIGlmICgocCA9IHN0ci5pbmRleE9mKCctJykpID4gMClcclxuICAgICAgICB0aHJvdyBFcnJvcignaW50ZXJpb3IgaHlwaGVuJyk7XHJcbiAgICBlbHNlIGlmIChwID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIGZyb21TdHJpbmcoc3RyLnN1YnN0cmluZygxKSwgdW5zaWduZWQsIHJhZGl4KS5uZWcoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBEbyBzZXZlcmFsICg4KSBkaWdpdHMgZWFjaCB0aW1lIHRocm91Z2ggdGhlIGxvb3AsIHNvIGFzIHRvXHJcbiAgICAvLyBtaW5pbWl6ZSB0aGUgY2FsbHMgdG8gdGhlIHZlcnkgZXhwZW5zaXZlIGVtdWxhdGVkIGRpdi5cclxuICAgIHZhciByYWRpeFRvUG93ZXIgPSBmcm9tTnVtYmVyKHBvd19kYmwocmFkaXgsIDgpKTtcclxuXHJcbiAgICB2YXIgcmVzdWx0ID0gWkVSTztcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSArPSA4KSB7XHJcbiAgICAgICAgdmFyIHNpemUgPSBNYXRoLm1pbig4LCBzdHIubGVuZ3RoIC0gaSksXHJcbiAgICAgICAgICAgIHZhbHVlID0gcGFyc2VJbnQoc3RyLnN1YnN0cmluZyhpLCBpICsgc2l6ZSksIHJhZGl4KTtcclxuICAgICAgICBpZiAoc2l6ZSA8IDgpIHtcclxuICAgICAgICAgICAgdmFyIHBvd2VyID0gZnJvbU51bWJlcihwb3dfZGJsKHJhZGl4LCBzaXplKSk7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5tdWwocG93ZXIpLmFkZChmcm9tTnVtYmVyKHZhbHVlKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0Lm11bChyYWRpeFRvUG93ZXIpO1xyXG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuYWRkKGZyb21OdW1iZXIodmFsdWUpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXN1bHQudW5zaWduZWQgPSB1bnNpZ25lZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGEgTG9uZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgZ2l2ZW4gc3RyaW5nLCB3cml0dGVuIHVzaW5nIHRoZSBzcGVjaWZpZWQgcmFkaXguXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIFRoZSB0ZXh0dWFsIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBMb25nXHJcbiAqIEBwYXJhbSB7KGJvb2xlYW58bnVtYmVyKT19IHVuc2lnbmVkIFdoZXRoZXIgdW5zaWduZWQgb3Igbm90LCBkZWZhdWx0cyB0byBzaWduZWRcclxuICogQHBhcmFtIHtudW1iZXI9fSByYWRpeCBUaGUgcmFkaXggaW4gd2hpY2ggdGhlIHRleHQgaXMgd3JpdHRlbiAoMi0zNiksIGRlZmF1bHRzIHRvIDEwXHJcbiAqIEByZXR1cm5zIHshTG9uZ30gVGhlIGNvcnJlc3BvbmRpbmcgTG9uZyB2YWx1ZVxyXG4gKi9cclxuTG9uZy5mcm9tU3RyaW5nID0gZnJvbVN0cmluZztcclxuXHJcbi8qKlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfCF7bG93OiBudW1iZXIsIGhpZ2g6IG51bWJlciwgdW5zaWduZWQ6IGJvb2xlYW59fSB2YWxcclxuICogQHBhcmFtIHtib29sZWFuPX0gdW5zaWduZWRcclxuICogQHJldHVybnMgeyFMb25nfVxyXG4gKiBAaW5uZXJcclxuICovXHJcbmZ1bmN0aW9uIGZyb21WYWx1ZSh2YWwsIHVuc2lnbmVkKSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpXHJcbiAgICAgICAgcmV0dXJuIGZyb21OdW1iZXIodmFsLCB1bnNpZ25lZCk7XHJcbiAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpXHJcbiAgICAgICAgcmV0dXJuIGZyb21TdHJpbmcodmFsLCB1bnNpZ25lZCk7XHJcbiAgICAvLyBUaHJvd3MgZm9yIG5vbi1vYmplY3RzLCBjb252ZXJ0cyBub24taW5zdGFuY2VvZiBMb25nOlxyXG4gICAgcmV0dXJuIGZyb21CaXRzKHZhbC5sb3csIHZhbC5oaWdoLCB0eXBlb2YgdW5zaWduZWQgPT09ICdib29sZWFuJyA/IHVuc2lnbmVkIDogdmFsLnVuc2lnbmVkKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIHRoZSBzcGVjaWZpZWQgdmFsdWUgdG8gYSBMb25nIHVzaW5nIHRoZSBhcHByb3ByaWF0ZSBmcm9tKiBmdW5jdGlvbiBmb3IgaXRzIHR5cGUuXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd8IXtsb3c6IG51bWJlciwgaGlnaDogbnVtYmVyLCB1bnNpZ25lZDogYm9vbGVhbn19IHZhbCBWYWx1ZVxyXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSB1bnNpZ25lZCBXaGV0aGVyIHVuc2lnbmVkIG9yIG5vdCwgZGVmYXVsdHMgdG8gc2lnbmVkXHJcbiAqIEByZXR1cm5zIHshTG9uZ31cclxuICovXHJcbkxvbmcuZnJvbVZhbHVlID0gZnJvbVZhbHVlO1xyXG5cclxuLy8gTk9URTogdGhlIGNvbXBpbGVyIHNob3VsZCBpbmxpbmUgdGhlc2UgY29uc3RhbnQgdmFsdWVzIGJlbG93IGFuZCB0aGVuIHJlbW92ZSB0aGVzZSB2YXJpYWJsZXMsIHNvIHRoZXJlIHNob3VsZCBiZVxyXG4vLyBubyBydW50aW1lIHBlbmFsdHkgZm9yIHRoZXNlLlxyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHtudW1iZXJ9XHJcbiAqIEBjb25zdFxyXG4gKiBAaW5uZXJcclxuICovXHJcbnZhciBUV09fUFdSXzE2X0RCTCA9IDEgPDwgMTY7XHJcblxyXG4vKipcclxuICogQHR5cGUge251bWJlcn1cclxuICogQGNvbnN0XHJcbiAqIEBpbm5lclxyXG4gKi9cclxudmFyIFRXT19QV1JfMjRfREJMID0gMSA8PCAyNDtcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7bnVtYmVyfVxyXG4gKiBAY29uc3RcclxuICogQGlubmVyXHJcbiAqL1xyXG52YXIgVFdPX1BXUl8zMl9EQkwgPSBUV09fUFdSXzE2X0RCTCAqIFRXT19QV1JfMTZfREJMO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHtudW1iZXJ9XHJcbiAqIEBjb25zdFxyXG4gKiBAaW5uZXJcclxuICovXHJcbnZhciBUV09fUFdSXzY0X0RCTCA9IFRXT19QV1JfMzJfREJMICogVFdPX1BXUl8zMl9EQkw7XHJcblxyXG4vKipcclxuICogQHR5cGUge251bWJlcn1cclxuICogQGNvbnN0XHJcbiAqIEBpbm5lclxyXG4gKi9cclxudmFyIFRXT19QV1JfNjNfREJMID0gVFdPX1BXUl82NF9EQkwgLyAyO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHshTG9uZ31cclxuICogQGNvbnN0XHJcbiAqIEBpbm5lclxyXG4gKi9cclxudmFyIFRXT19QV1JfMjQgPSBmcm9tSW50KFRXT19QV1JfMjRfREJMKTtcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7IUxvbmd9XHJcbiAqIEBpbm5lclxyXG4gKi9cclxudmFyIFpFUk8gPSBmcm9tSW50KDApO1xyXG5cclxuLyoqXHJcbiAqIFNpZ25lZCB6ZXJvLlxyXG4gKiBAdHlwZSB7IUxvbmd9XHJcbiAqL1xyXG5Mb25nLlpFUk8gPSBaRVJPO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHshTG9uZ31cclxuICogQGlubmVyXHJcbiAqL1xyXG52YXIgVVpFUk8gPSBmcm9tSW50KDAsIHRydWUpO1xyXG5cclxuLyoqXHJcbiAqIFVuc2lnbmVkIHplcm8uXHJcbiAqIEB0eXBlIHshTG9uZ31cclxuICovXHJcbkxvbmcuVVpFUk8gPSBVWkVSTztcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7IUxvbmd9XHJcbiAqIEBpbm5lclxyXG4gKi9cclxudmFyIE9ORSA9IGZyb21JbnQoMSk7XHJcblxyXG4vKipcclxuICogU2lnbmVkIG9uZS5cclxuICogQHR5cGUgeyFMb25nfVxyXG4gKi9cclxuTG9uZy5PTkUgPSBPTkU7XHJcblxyXG4vKipcclxuICogQHR5cGUgeyFMb25nfVxyXG4gKiBAaW5uZXJcclxuICovXHJcbnZhciBVT05FID0gZnJvbUludCgxLCB0cnVlKTtcclxuXHJcbi8qKlxyXG4gKiBVbnNpZ25lZCBvbmUuXHJcbiAqIEB0eXBlIHshTG9uZ31cclxuICovXHJcbkxvbmcuVU9ORSA9IFVPTkU7XHJcblxyXG4vKipcclxuICogQHR5cGUgeyFMb25nfVxyXG4gKiBAaW5uZXJcclxuICovXHJcbnZhciBORUdfT05FID0gZnJvbUludCgtMSk7XHJcblxyXG4vKipcclxuICogU2lnbmVkIG5lZ2F0aXZlIG9uZS5cclxuICogQHR5cGUgeyFMb25nfVxyXG4gKi9cclxuTG9uZy5ORUdfT05FID0gTkVHX09ORTtcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7IUxvbmd9XHJcbiAqIEBpbm5lclxyXG4gKi9cclxudmFyIE1BWF9WQUxVRSA9IGZyb21CaXRzKDB4RkZGRkZGRkZ8MCwgMHg3RkZGRkZGRnwwLCBmYWxzZSk7XHJcblxyXG4vKipcclxuICogTWF4aW11bSBzaWduZWQgdmFsdWUuXHJcbiAqIEB0eXBlIHshTG9uZ31cclxuICovXHJcbkxvbmcuTUFYX1ZBTFVFID0gTUFYX1ZBTFVFO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHshTG9uZ31cclxuICogQGlubmVyXHJcbiAqL1xyXG52YXIgTUFYX1VOU0lHTkVEX1ZBTFVFID0gZnJvbUJpdHMoMHhGRkZGRkZGRnwwLCAweEZGRkZGRkZGfDAsIHRydWUpO1xyXG5cclxuLyoqXHJcbiAqIE1heGltdW0gdW5zaWduZWQgdmFsdWUuXHJcbiAqIEB0eXBlIHshTG9uZ31cclxuICovXHJcbkxvbmcuTUFYX1VOU0lHTkVEX1ZBTFVFID0gTUFYX1VOU0lHTkVEX1ZBTFVFO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHshTG9uZ31cclxuICogQGlubmVyXHJcbiAqL1xyXG52YXIgTUlOX1ZBTFVFID0gZnJvbUJpdHMoMCwgMHg4MDAwMDAwMHwwLCBmYWxzZSk7XHJcblxyXG4vKipcclxuICogTWluaW11bSBzaWduZWQgdmFsdWUuXHJcbiAqIEB0eXBlIHshTG9uZ31cclxuICovXHJcbkxvbmcuTUlOX1ZBTFVFID0gTUlOX1ZBTFVFO1xyXG5cclxuLyoqXHJcbiAqIEBhbGlhcyBMb25nLnByb3RvdHlwZVxyXG4gKiBAaW5uZXJcclxuICovXHJcbnZhciBMb25nUHJvdG90eXBlID0gTG9uZy5wcm90b3R5cGU7XHJcblxyXG4vKipcclxuICogQ29udmVydHMgdGhlIExvbmcgdG8gYSAzMiBiaXQgaW50ZWdlciwgYXNzdW1pbmcgaXQgaXMgYSAzMiBiaXQgaW50ZWdlci5cclxuICogQHJldHVybnMge251bWJlcn1cclxuICovXHJcbkxvbmdQcm90b3R5cGUudG9JbnQgPSBmdW5jdGlvbiB0b0ludCgpIHtcclxuICAgIHJldHVybiB0aGlzLnVuc2lnbmVkID8gdGhpcy5sb3cgPj4+IDAgOiB0aGlzLmxvdztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyB0aGUgTG9uZyB0byBhIHRoZSBuZWFyZXN0IGZsb2F0aW5nLXBvaW50IHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgdmFsdWUgKGRvdWJsZSwgNTMgYml0IG1hbnRpc3NhKS5cclxuICogQHJldHVybnMge251bWJlcn1cclxuICovXHJcbkxvbmdQcm90b3R5cGUudG9OdW1iZXIgPSBmdW5jdGlvbiB0b051bWJlcigpIHtcclxuICAgIGlmICh0aGlzLnVuc2lnbmVkKVxyXG4gICAgICAgIHJldHVybiAoKHRoaXMuaGlnaCA+Pj4gMCkgKiBUV09fUFdSXzMyX0RCTCkgKyAodGhpcy5sb3cgPj4+IDApO1xyXG4gICAgcmV0dXJuIHRoaXMuaGlnaCAqIFRXT19QV1JfMzJfREJMICsgKHRoaXMubG93ID4+PiAwKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyB0aGUgTG9uZyB0byBhIHN0cmluZyB3cml0dGVuIGluIHRoZSBzcGVjaWZpZWQgcmFkaXguXHJcbiAqIEBwYXJhbSB7bnVtYmVyPX0gcmFkaXggUmFkaXggKDItMzYpLCBkZWZhdWx0cyB0byAxMFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKiBAb3ZlcnJpZGVcclxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gSWYgYHJhZGl4YCBpcyBvdXQgb2YgcmFuZ2VcclxuICovXHJcbkxvbmdQcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyhyYWRpeCkge1xyXG4gICAgcmFkaXggPSByYWRpeCB8fCAxMDtcclxuICAgIGlmIChyYWRpeCA8IDIgfHwgMzYgPCByYWRpeClcclxuICAgICAgICB0aHJvdyBSYW5nZUVycm9yKCdyYWRpeCcpO1xyXG4gICAgaWYgKHRoaXMuaXNaZXJvKCkpXHJcbiAgICAgICAgcmV0dXJuICcwJztcclxuICAgIGlmICh0aGlzLmlzTmVnYXRpdmUoKSkgeyAvLyBVbnNpZ25lZCBMb25ncyBhcmUgbmV2ZXIgbmVnYXRpdmVcclxuICAgICAgICBpZiAodGhpcy5lcShNSU5fVkFMVUUpKSB7XHJcbiAgICAgICAgICAgIC8vIFdlIG5lZWQgdG8gY2hhbmdlIHRoZSBMb25nIHZhbHVlIGJlZm9yZSBpdCBjYW4gYmUgbmVnYXRlZCwgc28gd2UgcmVtb3ZlXHJcbiAgICAgICAgICAgIC8vIHRoZSBib3R0b20tbW9zdCBkaWdpdCBpbiB0aGlzIGJhc2UgYW5kIHRoZW4gcmVjdXJzZSB0byBkbyB0aGUgcmVzdC5cclxuICAgICAgICAgICAgdmFyIHJhZGl4TG9uZyA9IGZyb21OdW1iZXIocmFkaXgpLFxyXG4gICAgICAgICAgICAgICAgZGl2ID0gdGhpcy5kaXYocmFkaXhMb25nKSxcclxuICAgICAgICAgICAgICAgIHJlbTEgPSBkaXYubXVsKHJhZGl4TG9uZykuc3ViKHRoaXMpO1xyXG4gICAgICAgICAgICByZXR1cm4gZGl2LnRvU3RyaW5nKHJhZGl4KSArIHJlbTEudG9JbnQoKS50b1N0cmluZyhyYWRpeCk7XHJcbiAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiAnLScgKyB0aGlzLm5lZygpLnRvU3RyaW5nKHJhZGl4KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBEbyBzZXZlcmFsICg2KSBkaWdpdHMgZWFjaCB0aW1lIHRocm91Z2ggdGhlIGxvb3AsIHNvIGFzIHRvXHJcbiAgICAvLyBtaW5pbWl6ZSB0aGUgY2FsbHMgdG8gdGhlIHZlcnkgZXhwZW5zaXZlIGVtdWxhdGVkIGRpdi5cclxuICAgIHZhciByYWRpeFRvUG93ZXIgPSBmcm9tTnVtYmVyKHBvd19kYmwocmFkaXgsIDYpLCB0aGlzLnVuc2lnbmVkKSxcclxuICAgICAgICByZW0gPSB0aGlzO1xyXG4gICAgdmFyIHJlc3VsdCA9ICcnO1xyXG4gICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgICB2YXIgcmVtRGl2ID0gcmVtLmRpdihyYWRpeFRvUG93ZXIpLFxyXG4gICAgICAgICAgICBpbnR2YWwgPSByZW0uc3ViKHJlbURpdi5tdWwocmFkaXhUb1Bvd2VyKSkudG9JbnQoKSA+Pj4gMCxcclxuICAgICAgICAgICAgZGlnaXRzID0gaW50dmFsLnRvU3RyaW5nKHJhZGl4KTtcclxuICAgICAgICByZW0gPSByZW1EaXY7XHJcbiAgICAgICAgaWYgKHJlbS5pc1plcm8oKSlcclxuICAgICAgICAgICAgcmV0dXJuIGRpZ2l0cyArIHJlc3VsdDtcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgd2hpbGUgKGRpZ2l0cy5sZW5ndGggPCA2KVxyXG4gICAgICAgICAgICAgICAgZGlnaXRzID0gJzAnICsgZGlnaXRzO1xyXG4gICAgICAgICAgICByZXN1bHQgPSAnJyArIGRpZ2l0cyArIHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgaGlnaCAzMiBiaXRzIGFzIGEgc2lnbmVkIGludGVnZXIuXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFNpZ25lZCBoaWdoIGJpdHNcclxuICovXHJcbkxvbmdQcm90b3R5cGUuZ2V0SGlnaEJpdHMgPSBmdW5jdGlvbiBnZXRIaWdoQml0cygpIHtcclxuICAgIHJldHVybiB0aGlzLmhpZ2g7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgaGlnaCAzMiBiaXRzIGFzIGFuIHVuc2lnbmVkIGludGVnZXIuXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFVuc2lnbmVkIGhpZ2ggYml0c1xyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5nZXRIaWdoQml0c1Vuc2lnbmVkID0gZnVuY3Rpb24gZ2V0SGlnaEJpdHNVbnNpZ25lZCgpIHtcclxuICAgIHJldHVybiB0aGlzLmhpZ2ggPj4+IDA7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgbG93IDMyIGJpdHMgYXMgYSBzaWduZWQgaW50ZWdlci5cclxuICogQHJldHVybnMge251bWJlcn0gU2lnbmVkIGxvdyBiaXRzXHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmdldExvd0JpdHMgPSBmdW5jdGlvbiBnZXRMb3dCaXRzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubG93O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIGxvdyAzMiBiaXRzIGFzIGFuIHVuc2lnbmVkIGludGVnZXIuXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFVuc2lnbmVkIGxvdyBiaXRzXHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmdldExvd0JpdHNVbnNpZ25lZCA9IGZ1bmN0aW9uIGdldExvd0JpdHNVbnNpZ25lZCgpIHtcclxuICAgIHJldHVybiB0aGlzLmxvdyA+Pj4gMDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBudW1iZXIgb2YgYml0cyBuZWVkZWQgdG8gcmVwcmVzZW50IHRoZSBhYnNvbHV0ZSB2YWx1ZSBvZiB0aGlzIExvbmcuXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmdldE51bUJpdHNBYnMgPSBmdW5jdGlvbiBnZXROdW1CaXRzQWJzKCkge1xyXG4gICAgaWYgKHRoaXMuaXNOZWdhdGl2ZSgpKSAvLyBVbnNpZ25lZCBMb25ncyBhcmUgbmV2ZXIgbmVnYXRpdmVcclxuICAgICAgICByZXR1cm4gdGhpcy5lcShNSU5fVkFMVUUpID8gNjQgOiB0aGlzLm5lZygpLmdldE51bUJpdHNBYnMoKTtcclxuICAgIHZhciB2YWwgPSB0aGlzLmhpZ2ggIT0gMCA/IHRoaXMuaGlnaCA6IHRoaXMubG93O1xyXG4gICAgZm9yICh2YXIgYml0ID0gMzE7IGJpdCA+IDA7IGJpdC0tKVxyXG4gICAgICAgIGlmICgodmFsICYgKDEgPDwgYml0KSkgIT0gMClcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICByZXR1cm4gdGhpcy5oaWdoICE9IDAgPyBiaXQgKyAzMyA6IGJpdCArIDE7XHJcbn07XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhpcyBMb25nJ3MgdmFsdWUgZXF1YWxzIHplcm8uXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5pc1plcm8gPSBmdW5jdGlvbiBpc1plcm8oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5oaWdoID09PSAwICYmIHRoaXMubG93ID09PSAwO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoaXMgTG9uZydzIHZhbHVlIGVxdWFscyB6ZXJvLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI2lzWmVyb30uXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5lcXogPSBMb25nUHJvdG90eXBlLmlzWmVybztcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGlzIExvbmcncyB2YWx1ZSBpcyBuZWdhdGl2ZS5cclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmlzTmVnYXRpdmUgPSBmdW5jdGlvbiBpc05lZ2F0aXZlKCkge1xyXG4gICAgcmV0dXJuICF0aGlzLnVuc2lnbmVkICYmIHRoaXMuaGlnaCA8IDA7XHJcbn07XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhpcyBMb25nJ3MgdmFsdWUgaXMgcG9zaXRpdmUuXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5pc1Bvc2l0aXZlID0gZnVuY3Rpb24gaXNQb3NpdGl2ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnVuc2lnbmVkIHx8IHRoaXMuaGlnaCA+PSAwO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoaXMgTG9uZydzIHZhbHVlIGlzIG9kZC5cclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmlzT2RkID0gZnVuY3Rpb24gaXNPZGQoKSB7XHJcbiAgICByZXR1cm4gKHRoaXMubG93ICYgMSkgPT09IDE7XHJcbn07XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhpcyBMb25nJ3MgdmFsdWUgaXMgZXZlbi5cclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmlzRXZlbiA9IGZ1bmN0aW9uIGlzRXZlbigpIHtcclxuICAgIHJldHVybiAodGhpcy5sb3cgJiAxKSA9PT0gMDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGlzIExvbmcncyB2YWx1ZSBlcXVhbHMgdGhlIHNwZWNpZmllZCdzLlxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIHZhbHVlXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiBlcXVhbHMob3RoZXIpIHtcclxuICAgIGlmICghaXNMb25nKG90aGVyKSlcclxuICAgICAgICBvdGhlciA9IGZyb21WYWx1ZShvdGhlcik7XHJcbiAgICBpZiAodGhpcy51bnNpZ25lZCAhPT0gb3RoZXIudW5zaWduZWQgJiYgKHRoaXMuaGlnaCA+Pj4gMzEpID09PSAxICYmIChvdGhlci5oaWdoID4+PiAzMSkgPT09IDEpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgcmV0dXJuIHRoaXMuaGlnaCA9PT0gb3RoZXIuaGlnaCAmJiB0aGlzLmxvdyA9PT0gb3RoZXIubG93O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoaXMgTG9uZydzIHZhbHVlIGVxdWFscyB0aGUgc3BlY2lmaWVkJ3MuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIExvbmcjZXF1YWxzfS5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gb3RoZXIgT3RoZXIgdmFsdWVcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmVxID0gTG9uZ1Byb3RvdHlwZS5lcXVhbHM7XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhpcyBMb25nJ3MgdmFsdWUgZGlmZmVycyBmcm9tIHRoZSBzcGVjaWZpZWQncy5cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBvdGhlciBPdGhlciB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbkxvbmdQcm90b3R5cGUubm90RXF1YWxzID0gZnVuY3Rpb24gbm90RXF1YWxzKG90aGVyKSB7XHJcbiAgICByZXR1cm4gIXRoaXMuZXEoLyogdmFsaWRhdGVzICovIG90aGVyKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGlzIExvbmcncyB2YWx1ZSBkaWZmZXJzIGZyb20gdGhlIHNwZWNpZmllZCdzLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI25vdEVxdWFsc30uXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIHZhbHVlXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5uZXEgPSBMb25nUHJvdG90eXBlLm5vdEVxdWFscztcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGlzIExvbmcncyB2YWx1ZSBkaWZmZXJzIGZyb20gdGhlIHNwZWNpZmllZCdzLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI25vdEVxdWFsc30uXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIHZhbHVlXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5uZSA9IExvbmdQcm90b3R5cGUubm90RXF1YWxzO1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoaXMgTG9uZydzIHZhbHVlIGlzIGxlc3MgdGhhbiB0aGUgc3BlY2lmaWVkJ3MuXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gb3RoZXIgT3RoZXIgdmFsdWVcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmxlc3NUaGFuID0gZnVuY3Rpb24gbGVzc1RoYW4ob3RoZXIpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbXAoLyogdmFsaWRhdGVzICovIG90aGVyKSA8IDA7XHJcbn07XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhpcyBMb25nJ3MgdmFsdWUgaXMgbGVzcyB0aGFuIHRoZSBzcGVjaWZpZWQncy4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgTG9uZyNsZXNzVGhhbn0uXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIHZhbHVlXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5sdCA9IExvbmdQcm90b3R5cGUubGVzc1RoYW47XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhpcyBMb25nJ3MgdmFsdWUgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRoZSBzcGVjaWZpZWQncy5cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBvdGhlciBPdGhlciB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbkxvbmdQcm90b3R5cGUubGVzc1RoYW5PckVxdWFsID0gZnVuY3Rpb24gbGVzc1RoYW5PckVxdWFsKG90aGVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb21wKC8qIHZhbGlkYXRlcyAqLyBvdGhlcikgPD0gMDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGlzIExvbmcncyB2YWx1ZSBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdGhlIHNwZWNpZmllZCdzLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI2xlc3NUaGFuT3JFcXVhbH0uXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIHZhbHVlXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5sdGUgPSBMb25nUHJvdG90eXBlLmxlc3NUaGFuT3JFcXVhbDtcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGlzIExvbmcncyB2YWx1ZSBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdGhlIHNwZWNpZmllZCdzLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI2xlc3NUaGFuT3JFcXVhbH0uXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIHZhbHVlXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5sZSA9IExvbmdQcm90b3R5cGUubGVzc1RoYW5PckVxdWFsO1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoaXMgTG9uZydzIHZhbHVlIGlzIGdyZWF0ZXIgdGhhbiB0aGUgc3BlY2lmaWVkJ3MuXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gb3RoZXIgT3RoZXIgdmFsdWVcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmdyZWF0ZXJUaGFuID0gZnVuY3Rpb24gZ3JlYXRlclRoYW4ob3RoZXIpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbXAoLyogdmFsaWRhdGVzICovIG90aGVyKSA+IDA7XHJcbn07XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhpcyBMb25nJ3MgdmFsdWUgaXMgZ3JlYXRlciB0aGFuIHRoZSBzcGVjaWZpZWQncy4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgTG9uZyNncmVhdGVyVGhhbn0uXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIHZhbHVlXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5ndCA9IExvbmdQcm90b3R5cGUuZ3JlYXRlclRoYW47XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhpcyBMb25nJ3MgdmFsdWUgaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRoZSBzcGVjaWZpZWQncy5cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBvdGhlciBPdGhlciB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbkxvbmdQcm90b3R5cGUuZ3JlYXRlclRoYW5PckVxdWFsID0gZnVuY3Rpb24gZ3JlYXRlclRoYW5PckVxdWFsKG90aGVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb21wKC8qIHZhbGlkYXRlcyAqLyBvdGhlcikgPj0gMDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGlzIExvbmcncyB2YWx1ZSBpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdGhlIHNwZWNpZmllZCdzLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI2dyZWF0ZXJUaGFuT3JFcXVhbH0uXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIHZhbHVlXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5ndGUgPSBMb25nUHJvdG90eXBlLmdyZWF0ZXJUaGFuT3JFcXVhbDtcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGlzIExvbmcncyB2YWx1ZSBpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdGhlIHNwZWNpZmllZCdzLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI2dyZWF0ZXJUaGFuT3JFcXVhbH0uXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIHZhbHVlXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5nZSA9IExvbmdQcm90b3R5cGUuZ3JlYXRlclRoYW5PckVxdWFsO1xyXG5cclxuLyoqXHJcbiAqIENvbXBhcmVzIHRoaXMgTG9uZydzIHZhbHVlIHdpdGggdGhlIHNwZWNpZmllZCdzLlxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIHZhbHVlXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IDAgaWYgdGhleSBhcmUgdGhlIHNhbWUsIDEgaWYgdGhlIHRoaXMgaXMgZ3JlYXRlciBhbmQgLTFcclxuICogIGlmIHRoZSBnaXZlbiBvbmUgaXMgZ3JlYXRlclxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZShvdGhlcikge1xyXG4gICAgaWYgKCFpc0xvbmcob3RoZXIpKVxyXG4gICAgICAgIG90aGVyID0gZnJvbVZhbHVlKG90aGVyKTtcclxuICAgIGlmICh0aGlzLmVxKG90aGVyKSlcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIHZhciB0aGlzTmVnID0gdGhpcy5pc05lZ2F0aXZlKCksXHJcbiAgICAgICAgb3RoZXJOZWcgPSBvdGhlci5pc05lZ2F0aXZlKCk7XHJcbiAgICBpZiAodGhpc05lZyAmJiAhb3RoZXJOZWcpXHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgaWYgKCF0aGlzTmVnICYmIG90aGVyTmVnKVxyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgLy8gQXQgdGhpcyBwb2ludCB0aGUgc2lnbiBiaXRzIGFyZSB0aGUgc2FtZVxyXG4gICAgaWYgKCF0aGlzLnVuc2lnbmVkKVxyXG4gICAgICAgIHJldHVybiB0aGlzLnN1YihvdGhlcikuaXNOZWdhdGl2ZSgpID8gLTEgOiAxO1xyXG4gICAgLy8gQm90aCBhcmUgcG9zaXRpdmUgaWYgYXQgbGVhc3Qgb25lIGlzIHVuc2lnbmVkXHJcbiAgICByZXR1cm4gKG90aGVyLmhpZ2ggPj4+IDApID4gKHRoaXMuaGlnaCA+Pj4gMCkgfHwgKG90aGVyLmhpZ2ggPT09IHRoaXMuaGlnaCAmJiAob3RoZXIubG93ID4+PiAwKSA+ICh0aGlzLmxvdyA+Pj4gMCkpID8gLTEgOiAxO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbXBhcmVzIHRoaXMgTG9uZydzIHZhbHVlIHdpdGggdGhlIHNwZWNpZmllZCdzLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI2NvbXBhcmV9LlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBvdGhlciBPdGhlciB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAwIGlmIHRoZXkgYXJlIHRoZSBzYW1lLCAxIGlmIHRoZSB0aGlzIGlzIGdyZWF0ZXIgYW5kIC0xXHJcbiAqICBpZiB0aGUgZ2l2ZW4gb25lIGlzIGdyZWF0ZXJcclxuICovXHJcbkxvbmdQcm90b3R5cGUuY29tcCA9IExvbmdQcm90b3R5cGUuY29tcGFyZTtcclxuXHJcbi8qKlxyXG4gKiBOZWdhdGVzIHRoaXMgTG9uZydzIHZhbHVlLlxyXG4gKiBAcmV0dXJucyB7IUxvbmd9IE5lZ2F0ZWQgTG9uZ1xyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5uZWdhdGUgPSBmdW5jdGlvbiBuZWdhdGUoKSB7XHJcbiAgICBpZiAoIXRoaXMudW5zaWduZWQgJiYgdGhpcy5lcShNSU5fVkFMVUUpKVxyXG4gICAgICAgIHJldHVybiBNSU5fVkFMVUU7XHJcbiAgICByZXR1cm4gdGhpcy5ub3QoKS5hZGQoT05FKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBOZWdhdGVzIHRoaXMgTG9uZydzIHZhbHVlLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI25lZ2F0ZX0uXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcmV0dXJucyB7IUxvbmd9IE5lZ2F0ZWQgTG9uZ1xyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5uZWcgPSBMb25nUHJvdG90eXBlLm5lZ2F0ZTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBzdW0gb2YgdGhpcyBhbmQgdGhlIHNwZWNpZmllZCBMb25nLlxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IGFkZGVuZCBBZGRlbmRcclxuICogQHJldHVybnMgeyFMb25nfSBTdW1cclxuICovXHJcbkxvbmdQcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gYWRkKGFkZGVuZCkge1xyXG4gICAgaWYgKCFpc0xvbmcoYWRkZW5kKSlcclxuICAgICAgICBhZGRlbmQgPSBmcm9tVmFsdWUoYWRkZW5kKTtcclxuXHJcbiAgICAvLyBEaXZpZGUgZWFjaCBudW1iZXIgaW50byA0IGNodW5rcyBvZiAxNiBiaXRzLCBhbmQgdGhlbiBzdW0gdGhlIGNodW5rcy5cclxuXHJcbiAgICB2YXIgYTQ4ID0gdGhpcy5oaWdoID4+PiAxNjtcclxuICAgIHZhciBhMzIgPSB0aGlzLmhpZ2ggJiAweEZGRkY7XHJcbiAgICB2YXIgYTE2ID0gdGhpcy5sb3cgPj4+IDE2O1xyXG4gICAgdmFyIGEwMCA9IHRoaXMubG93ICYgMHhGRkZGO1xyXG5cclxuICAgIHZhciBiNDggPSBhZGRlbmQuaGlnaCA+Pj4gMTY7XHJcbiAgICB2YXIgYjMyID0gYWRkZW5kLmhpZ2ggJiAweEZGRkY7XHJcbiAgICB2YXIgYjE2ID0gYWRkZW5kLmxvdyA+Pj4gMTY7XHJcbiAgICB2YXIgYjAwID0gYWRkZW5kLmxvdyAmIDB4RkZGRjtcclxuXHJcbiAgICB2YXIgYzQ4ID0gMCwgYzMyID0gMCwgYzE2ID0gMCwgYzAwID0gMDtcclxuICAgIGMwMCArPSBhMDAgKyBiMDA7XHJcbiAgICBjMTYgKz0gYzAwID4+PiAxNjtcclxuICAgIGMwMCAmPSAweEZGRkY7XHJcbiAgICBjMTYgKz0gYTE2ICsgYjE2O1xyXG4gICAgYzMyICs9IGMxNiA+Pj4gMTY7XHJcbiAgICBjMTYgJj0gMHhGRkZGO1xyXG4gICAgYzMyICs9IGEzMiArIGIzMjtcclxuICAgIGM0OCArPSBjMzIgPj4+IDE2O1xyXG4gICAgYzMyICY9IDB4RkZGRjtcclxuICAgIGM0OCArPSBhNDggKyBiNDg7XHJcbiAgICBjNDggJj0gMHhGRkZGO1xyXG4gICAgcmV0dXJuIGZyb21CaXRzKChjMTYgPDwgMTYpIHwgYzAwLCAoYzQ4IDw8IDE2KSB8IGMzMiwgdGhpcy51bnNpZ25lZCk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgZGlmZmVyZW5jZSBvZiB0aGlzIGFuZCB0aGUgc3BlY2lmaWVkIExvbmcuXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gc3VidHJhaGVuZCBTdWJ0cmFoZW5kXHJcbiAqIEByZXR1cm5zIHshTG9uZ30gRGlmZmVyZW5jZVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5zdWJ0cmFjdCA9IGZ1bmN0aW9uIHN1YnRyYWN0KHN1YnRyYWhlbmQpIHtcclxuICAgIGlmICghaXNMb25nKHN1YnRyYWhlbmQpKVxyXG4gICAgICAgIHN1YnRyYWhlbmQgPSBmcm9tVmFsdWUoc3VidHJhaGVuZCk7XHJcbiAgICByZXR1cm4gdGhpcy5hZGQoc3VidHJhaGVuZC5uZWcoKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgZGlmZmVyZW5jZSBvZiB0aGlzIGFuZCB0aGUgc3BlY2lmaWVkIExvbmcuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIExvbmcjc3VidHJhY3R9LlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBzdWJ0cmFoZW5kIFN1YnRyYWhlbmRcclxuICogQHJldHVybnMgeyFMb25nfSBEaWZmZXJlbmNlXHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLnN1YiA9IExvbmdQcm90b3R5cGUuc3VidHJhY3Q7XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgcHJvZHVjdCBvZiB0aGlzIGFuZCB0aGUgc3BlY2lmaWVkIExvbmcuXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gbXVsdGlwbGllciBNdWx0aXBsaWVyXHJcbiAqIEByZXR1cm5zIHshTG9uZ30gUHJvZHVjdFxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5tdWx0aXBseSA9IGZ1bmN0aW9uIG11bHRpcGx5KG11bHRpcGxpZXIpIHtcclxuICAgIGlmICh0aGlzLmlzWmVybygpKVxyXG4gICAgICAgIHJldHVybiBaRVJPO1xyXG4gICAgaWYgKCFpc0xvbmcobXVsdGlwbGllcikpXHJcbiAgICAgICAgbXVsdGlwbGllciA9IGZyb21WYWx1ZShtdWx0aXBsaWVyKTtcclxuXHJcbiAgICAvLyB1c2Ugd2FzbSBzdXBwb3J0IGlmIHByZXNlbnRcclxuICAgIGlmICh3YXNtKSB7XHJcbiAgICAgICAgdmFyIGxvdyA9IHdhc20ubXVsKHRoaXMubG93LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZ2gsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpcGxpZXIubG93LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBtdWx0aXBsaWVyLmhpZ2gpO1xyXG4gICAgICAgIHJldHVybiBmcm9tQml0cyhsb3csIHdhc20uZ2V0X2hpZ2goKSwgdGhpcy51bnNpZ25lZCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG11bHRpcGxpZXIuaXNaZXJvKCkpXHJcbiAgICAgICAgcmV0dXJuIFpFUk87XHJcbiAgICBpZiAodGhpcy5lcShNSU5fVkFMVUUpKVxyXG4gICAgICAgIHJldHVybiBtdWx0aXBsaWVyLmlzT2RkKCkgPyBNSU5fVkFMVUUgOiBaRVJPO1xyXG4gICAgaWYgKG11bHRpcGxpZXIuZXEoTUlOX1ZBTFVFKSlcclxuICAgICAgICByZXR1cm4gdGhpcy5pc09kZCgpID8gTUlOX1ZBTFVFIDogWkVSTztcclxuXHJcbiAgICBpZiAodGhpcy5pc05lZ2F0aXZlKCkpIHtcclxuICAgICAgICBpZiAobXVsdGlwbGllci5pc05lZ2F0aXZlKCkpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5lZygpLm11bChtdWx0aXBsaWVyLm5lZygpKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5lZygpLm11bChtdWx0aXBsaWVyKS5uZWcoKTtcclxuICAgIH0gZWxzZSBpZiAobXVsdGlwbGllci5pc05lZ2F0aXZlKCkpXHJcbiAgICAgICAgcmV0dXJuIHRoaXMubXVsKG11bHRpcGxpZXIubmVnKCkpLm5lZygpO1xyXG5cclxuICAgIC8vIElmIGJvdGggbG9uZ3MgYXJlIHNtYWxsLCB1c2UgZmxvYXQgbXVsdGlwbGljYXRpb25cclxuICAgIGlmICh0aGlzLmx0KFRXT19QV1JfMjQpICYmIG11bHRpcGxpZXIubHQoVFdPX1BXUl8yNCkpXHJcbiAgICAgICAgcmV0dXJuIGZyb21OdW1iZXIodGhpcy50b051bWJlcigpICogbXVsdGlwbGllci50b051bWJlcigpLCB0aGlzLnVuc2lnbmVkKTtcclxuXHJcbiAgICAvLyBEaXZpZGUgZWFjaCBsb25nIGludG8gNCBjaHVua3Mgb2YgMTYgYml0cywgYW5kIHRoZW4gYWRkIHVwIDR4NCBwcm9kdWN0cy5cclxuICAgIC8vIFdlIGNhbiBza2lwIHByb2R1Y3RzIHRoYXQgd291bGQgb3ZlcmZsb3cuXHJcblxyXG4gICAgdmFyIGE0OCA9IHRoaXMuaGlnaCA+Pj4gMTY7XHJcbiAgICB2YXIgYTMyID0gdGhpcy5oaWdoICYgMHhGRkZGO1xyXG4gICAgdmFyIGExNiA9IHRoaXMubG93ID4+PiAxNjtcclxuICAgIHZhciBhMDAgPSB0aGlzLmxvdyAmIDB4RkZGRjtcclxuXHJcbiAgICB2YXIgYjQ4ID0gbXVsdGlwbGllci5oaWdoID4+PiAxNjtcclxuICAgIHZhciBiMzIgPSBtdWx0aXBsaWVyLmhpZ2ggJiAweEZGRkY7XHJcbiAgICB2YXIgYjE2ID0gbXVsdGlwbGllci5sb3cgPj4+IDE2O1xyXG4gICAgdmFyIGIwMCA9IG11bHRpcGxpZXIubG93ICYgMHhGRkZGO1xyXG5cclxuICAgIHZhciBjNDggPSAwLCBjMzIgPSAwLCBjMTYgPSAwLCBjMDAgPSAwO1xyXG4gICAgYzAwICs9IGEwMCAqIGIwMDtcclxuICAgIGMxNiArPSBjMDAgPj4+IDE2O1xyXG4gICAgYzAwICY9IDB4RkZGRjtcclxuICAgIGMxNiArPSBhMTYgKiBiMDA7XHJcbiAgICBjMzIgKz0gYzE2ID4+PiAxNjtcclxuICAgIGMxNiAmPSAweEZGRkY7XHJcbiAgICBjMTYgKz0gYTAwICogYjE2O1xyXG4gICAgYzMyICs9IGMxNiA+Pj4gMTY7XHJcbiAgICBjMTYgJj0gMHhGRkZGO1xyXG4gICAgYzMyICs9IGEzMiAqIGIwMDtcclxuICAgIGM0OCArPSBjMzIgPj4+IDE2O1xyXG4gICAgYzMyICY9IDB4RkZGRjtcclxuICAgIGMzMiArPSBhMTYgKiBiMTY7XHJcbiAgICBjNDggKz0gYzMyID4+PiAxNjtcclxuICAgIGMzMiAmPSAweEZGRkY7XHJcbiAgICBjMzIgKz0gYTAwICogYjMyO1xyXG4gICAgYzQ4ICs9IGMzMiA+Pj4gMTY7XHJcbiAgICBjMzIgJj0gMHhGRkZGO1xyXG4gICAgYzQ4ICs9IGE0OCAqIGIwMCArIGEzMiAqIGIxNiArIGExNiAqIGIzMiArIGEwMCAqIGI0ODtcclxuICAgIGM0OCAmPSAweEZGRkY7XHJcbiAgICByZXR1cm4gZnJvbUJpdHMoKGMxNiA8PCAxNikgfCBjMDAsIChjNDggPDwgMTYpIHwgYzMyLCB0aGlzLnVuc2lnbmVkKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBwcm9kdWN0IG9mIHRoaXMgYW5kIHRoZSBzcGVjaWZpZWQgTG9uZy4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgTG9uZyNtdWx0aXBseX0uXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG11bHRpcGxpZXIgTXVsdGlwbGllclxyXG4gKiBAcmV0dXJucyB7IUxvbmd9IFByb2R1Y3RcclxuICovXHJcbkxvbmdQcm90b3R5cGUubXVsID0gTG9uZ1Byb3RvdHlwZS5tdWx0aXBseTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoaXMgTG9uZyBkaXZpZGVkIGJ5IHRoZSBzcGVjaWZpZWQuIFRoZSByZXN1bHQgaXMgc2lnbmVkIGlmIHRoaXMgTG9uZyBpcyBzaWduZWQgb3JcclxuICogIHVuc2lnbmVkIGlmIHRoaXMgTG9uZyBpcyB1bnNpZ25lZC5cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBkaXZpc29yIERpdmlzb3JcclxuICogQHJldHVybnMgeyFMb25nfSBRdW90aWVudFxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5kaXZpZGUgPSBmdW5jdGlvbiBkaXZpZGUoZGl2aXNvcikge1xyXG4gICAgaWYgKCFpc0xvbmcoZGl2aXNvcikpXHJcbiAgICAgICAgZGl2aXNvciA9IGZyb21WYWx1ZShkaXZpc29yKTtcclxuICAgIGlmIChkaXZpc29yLmlzWmVybygpKVxyXG4gICAgICAgIHRocm93IEVycm9yKCdkaXZpc2lvbiBieSB6ZXJvJyk7XHJcblxyXG4gICAgLy8gdXNlIHdhc20gc3VwcG9ydCBpZiBwcmVzZW50XHJcbiAgICBpZiAod2FzbSkge1xyXG4gICAgICAgIC8vIGd1YXJkIGFnYWluc3Qgc2lnbmVkIGRpdmlzaW9uIG92ZXJmbG93OiB0aGUgbGFyZ2VzdFxyXG4gICAgICAgIC8vIG5lZ2F0aXZlIG51bWJlciAvIC0xIHdvdWxkIGJlIDEgbGFyZ2VyIHRoYW4gdGhlIGxhcmdlc3RcclxuICAgICAgICAvLyBwb3NpdGl2ZSBudW1iZXIsIGR1ZSB0byB0d28ncyBjb21wbGVtZW50LlxyXG4gICAgICAgIGlmICghdGhpcy51bnNpZ25lZCAmJlxyXG4gICAgICAgICAgICB0aGlzLmhpZ2ggPT09IC0weDgwMDAwMDAwICYmXHJcbiAgICAgICAgICAgIGRpdmlzb3IubG93ID09PSAtMSAmJiBkaXZpc29yLmhpZ2ggPT09IC0xKSB7XHJcbiAgICAgICAgICAgIC8vIGJlIGNvbnNpc3RlbnQgd2l0aCBub24td2FzbSBjb2RlIHBhdGhcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBsb3cgPSAodGhpcy51bnNpZ25lZCA/IHdhc20uZGl2X3UgOiB3YXNtLmRpdl9zKShcclxuICAgICAgICAgICAgdGhpcy5sb3csXHJcbiAgICAgICAgICAgIHRoaXMuaGlnaCxcclxuICAgICAgICAgICAgZGl2aXNvci5sb3csXHJcbiAgICAgICAgICAgIGRpdmlzb3IuaGlnaFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuIGZyb21CaXRzKGxvdywgd2FzbS5nZXRfaGlnaCgpLCB0aGlzLnVuc2lnbmVkKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5pc1plcm8oKSlcclxuICAgICAgICByZXR1cm4gdGhpcy51bnNpZ25lZCA/IFVaRVJPIDogWkVSTztcclxuICAgIHZhciBhcHByb3gsIHJlbSwgcmVzO1xyXG4gICAgaWYgKCF0aGlzLnVuc2lnbmVkKSB7XHJcbiAgICAgICAgLy8gVGhpcyBzZWN0aW9uIGlzIG9ubHkgcmVsZXZhbnQgZm9yIHNpZ25lZCBsb25ncyBhbmQgaXMgZGVyaXZlZCBmcm9tIHRoZVxyXG4gICAgICAgIC8vIGNsb3N1cmUgbGlicmFyeSBhcyBhIHdob2xlLlxyXG4gICAgICAgIGlmICh0aGlzLmVxKE1JTl9WQUxVRSkpIHtcclxuICAgICAgICAgICAgaWYgKGRpdmlzb3IuZXEoT05FKSB8fCBkaXZpc29yLmVxKE5FR19PTkUpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1JTl9WQUxVRTsgIC8vIHJlY2FsbCB0aGF0IC1NSU5fVkFMVUUgPT0gTUlOX1ZBTFVFXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGRpdmlzb3IuZXEoTUlOX1ZBTFVFKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBPTkU7XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gQXQgdGhpcyBwb2ludCwgd2UgaGF2ZSB8b3RoZXJ8ID49IDIsIHNvIHx0aGlzL290aGVyfCA8IHxNSU5fVkFMVUV8LlxyXG4gICAgICAgICAgICAgICAgdmFyIGhhbGZUaGlzID0gdGhpcy5zaHIoMSk7XHJcbiAgICAgICAgICAgICAgICBhcHByb3ggPSBoYWxmVGhpcy5kaXYoZGl2aXNvcikuc2hsKDEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFwcHJveC5lcShaRVJPKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkaXZpc29yLmlzTmVnYXRpdmUoKSA/IE9ORSA6IE5FR19PTkU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbSA9IHRoaXMuc3ViKGRpdmlzb3IubXVsKGFwcHJveCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcyA9IGFwcHJveC5hZGQocmVtLmRpdihkaXZpc29yKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoZGl2aXNvci5lcShNSU5fVkFMVUUpKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy51bnNpZ25lZCA/IFVaRVJPIDogWkVSTztcclxuICAgICAgICBpZiAodGhpcy5pc05lZ2F0aXZlKCkpIHtcclxuICAgICAgICAgICAgaWYgKGRpdmlzb3IuaXNOZWdhdGl2ZSgpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubmVnKCkuZGl2KGRpdmlzb3IubmVnKCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5uZWcoKS5kaXYoZGl2aXNvcikubmVnKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkaXZpc29yLmlzTmVnYXRpdmUoKSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGl2KGRpdmlzb3IubmVnKCkpLm5lZygpO1xyXG4gICAgICAgIHJlcyA9IFpFUk87XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIFRoZSBhbGdvcml0aG0gYmVsb3cgaGFzIG5vdCBiZWVuIG1hZGUgZm9yIHVuc2lnbmVkIGxvbmdzLiBJdCdzIHRoZXJlZm9yZVxyXG4gICAgICAgIC8vIHJlcXVpcmVkIHRvIHRha2Ugc3BlY2lhbCBjYXJlIG9mIHRoZSBNU0IgcHJpb3IgdG8gcnVubmluZyBpdC5cclxuICAgICAgICBpZiAoIWRpdmlzb3IudW5zaWduZWQpXHJcbiAgICAgICAgICAgIGRpdmlzb3IgPSBkaXZpc29yLnRvVW5zaWduZWQoKTtcclxuICAgICAgICBpZiAoZGl2aXNvci5ndCh0aGlzKSlcclxuICAgICAgICAgICAgcmV0dXJuIFVaRVJPO1xyXG4gICAgICAgIGlmIChkaXZpc29yLmd0KHRoaXMuc2hydSgxKSkpIC8vIDE1ID4+PiAxID0gNyA7IHdpdGggZGl2aXNvciA9IDggOyB0cnVlXHJcbiAgICAgICAgICAgIHJldHVybiBVT05FO1xyXG4gICAgICAgIHJlcyA9IFVaRVJPO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlcGVhdCB0aGUgZm9sbG93aW5nIHVudGlsIHRoZSByZW1haW5kZXIgaXMgbGVzcyB0aGFuIG90aGVyOiAgZmluZCBhXHJcbiAgICAvLyBmbG9hdGluZy1wb2ludCB0aGF0IGFwcHJveGltYXRlcyByZW1haW5kZXIgLyBvdGhlciAqZnJvbSBiZWxvdyosIGFkZCB0aGlzXHJcbiAgICAvLyBpbnRvIHRoZSByZXN1bHQsIGFuZCBzdWJ0cmFjdCBpdCBmcm9tIHRoZSByZW1haW5kZXIuICBJdCBpcyBjcml0aWNhbCB0aGF0XHJcbiAgICAvLyB0aGUgYXBwcm94aW1hdGUgdmFsdWUgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIHRoZSByZWFsIHZhbHVlIHNvIHRoYXQgdGhlXHJcbiAgICAvLyByZW1haW5kZXIgbmV2ZXIgYmVjb21lcyBuZWdhdGl2ZS5cclxuICAgIHJlbSA9IHRoaXM7XHJcbiAgICB3aGlsZSAocmVtLmd0ZShkaXZpc29yKSkge1xyXG4gICAgICAgIC8vIEFwcHJveGltYXRlIHRoZSByZXN1bHQgb2YgZGl2aXNpb24uIFRoaXMgbWF5IGJlIGEgbGl0dGxlIGdyZWF0ZXIgb3JcclxuICAgICAgICAvLyBzbWFsbGVyIHRoYW4gdGhlIGFjdHVhbCB2YWx1ZS5cclxuICAgICAgICBhcHByb3ggPSBNYXRoLm1heCgxLCBNYXRoLmZsb29yKHJlbS50b051bWJlcigpIC8gZGl2aXNvci50b051bWJlcigpKSk7XHJcblxyXG4gICAgICAgIC8vIFdlIHdpbGwgdHdlYWsgdGhlIGFwcHJveGltYXRlIHJlc3VsdCBieSBjaGFuZ2luZyBpdCBpbiB0aGUgNDgtdGggZGlnaXQgb3JcclxuICAgICAgICAvLyB0aGUgc21hbGxlc3Qgbm9uLWZyYWN0aW9uYWwgZGlnaXQsIHdoaWNoZXZlciBpcyBsYXJnZXIuXHJcbiAgICAgICAgdmFyIGxvZzIgPSBNYXRoLmNlaWwoTWF0aC5sb2coYXBwcm94KSAvIE1hdGguTE4yKSxcclxuICAgICAgICAgICAgZGVsdGEgPSAobG9nMiA8PSA0OCkgPyAxIDogcG93X2RibCgyLCBsb2cyIC0gNDgpLFxyXG5cclxuICAgICAgICAvLyBEZWNyZWFzZSB0aGUgYXBwcm94aW1hdGlvbiB1bnRpbCBpdCBpcyBzbWFsbGVyIHRoYW4gdGhlIHJlbWFpbmRlci4gIE5vdGVcclxuICAgICAgICAvLyB0aGF0IGlmIGl0IGlzIHRvbyBsYXJnZSwgdGhlIHByb2R1Y3Qgb3ZlcmZsb3dzIGFuZCBpcyBuZWdhdGl2ZS5cclxuICAgICAgICAgICAgYXBwcm94UmVzID0gZnJvbU51bWJlcihhcHByb3gpLFxyXG4gICAgICAgICAgICBhcHByb3hSZW0gPSBhcHByb3hSZXMubXVsKGRpdmlzb3IpO1xyXG4gICAgICAgIHdoaWxlIChhcHByb3hSZW0uaXNOZWdhdGl2ZSgpIHx8IGFwcHJveFJlbS5ndChyZW0pKSB7XHJcbiAgICAgICAgICAgIGFwcHJveCAtPSBkZWx0YTtcclxuICAgICAgICAgICAgYXBwcm94UmVzID0gZnJvbU51bWJlcihhcHByb3gsIHRoaXMudW5zaWduZWQpO1xyXG4gICAgICAgICAgICBhcHByb3hSZW0gPSBhcHByb3hSZXMubXVsKGRpdmlzb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gV2Uga25vdyB0aGUgYW5zd2VyIGNhbid0IGJlIHplcm8uLi4gYW5kIGFjdHVhbGx5LCB6ZXJvIHdvdWxkIGNhdXNlXHJcbiAgICAgICAgLy8gaW5maW5pdGUgcmVjdXJzaW9uIHNpbmNlIHdlIHdvdWxkIG1ha2Ugbm8gcHJvZ3Jlc3MuXHJcbiAgICAgICAgaWYgKGFwcHJveFJlcy5pc1plcm8oKSlcclxuICAgICAgICAgICAgYXBwcm94UmVzID0gT05FO1xyXG5cclxuICAgICAgICByZXMgPSByZXMuYWRkKGFwcHJveFJlcyk7XHJcbiAgICAgICAgcmVtID0gcmVtLnN1YihhcHByb3hSZW0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoaXMgTG9uZyBkaXZpZGVkIGJ5IHRoZSBzcGVjaWZpZWQuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIExvbmcjZGl2aWRlfS5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gZGl2aXNvciBEaXZpc29yXHJcbiAqIEByZXR1cm5zIHshTG9uZ30gUXVvdGllbnRcclxuICovXHJcbkxvbmdQcm90b3R5cGUuZGl2ID0gTG9uZ1Byb3RvdHlwZS5kaXZpZGU7XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGlzIExvbmcgbW9kdWxvIHRoZSBzcGVjaWZpZWQuXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gZGl2aXNvciBEaXZpc29yXHJcbiAqIEByZXR1cm5zIHshTG9uZ30gUmVtYWluZGVyXHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLm1vZHVsbyA9IGZ1bmN0aW9uIG1vZHVsbyhkaXZpc29yKSB7XHJcbiAgICBpZiAoIWlzTG9uZyhkaXZpc29yKSlcclxuICAgICAgICBkaXZpc29yID0gZnJvbVZhbHVlKGRpdmlzb3IpO1xyXG5cclxuICAgIC8vIHVzZSB3YXNtIHN1cHBvcnQgaWYgcHJlc2VudFxyXG4gICAgaWYgKHdhc20pIHtcclxuICAgICAgICB2YXIgbG93ID0gKHRoaXMudW5zaWduZWQgPyB3YXNtLnJlbV91IDogd2FzbS5yZW1fcykoXHJcbiAgICAgICAgICAgIHRoaXMubG93LFxyXG4gICAgICAgICAgICB0aGlzLmhpZ2gsXHJcbiAgICAgICAgICAgIGRpdmlzb3IubG93LFxyXG4gICAgICAgICAgICBkaXZpc29yLmhpZ2hcclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybiBmcm9tQml0cyhsb3csIHdhc20uZ2V0X2hpZ2goKSwgdGhpcy51bnNpZ25lZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuc3ViKHRoaXMuZGl2KGRpdmlzb3IpLm11bChkaXZpc29yKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGlzIExvbmcgbW9kdWxvIHRoZSBzcGVjaWZpZWQuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIExvbmcjbW9kdWxvfS5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gZGl2aXNvciBEaXZpc29yXHJcbiAqIEByZXR1cm5zIHshTG9uZ30gUmVtYWluZGVyXHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLm1vZCA9IExvbmdQcm90b3R5cGUubW9kdWxvO1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhpcyBMb25nIG1vZHVsbyB0aGUgc3BlY2lmaWVkLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI21vZHVsb30uXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IGRpdmlzb3IgRGl2aXNvclxyXG4gKiBAcmV0dXJucyB7IUxvbmd9IFJlbWFpbmRlclxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5yZW0gPSBMb25nUHJvdG90eXBlLm1vZHVsbztcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBiaXR3aXNlIE5PVCBvZiB0aGlzIExvbmcuXHJcbiAqIEByZXR1cm5zIHshTG9uZ31cclxuICovXHJcbkxvbmdQcm90b3R5cGUubm90ID0gZnVuY3Rpb24gbm90KCkge1xyXG4gICAgcmV0dXJuIGZyb21CaXRzKH50aGlzLmxvdywgfnRoaXMuaGlnaCwgdGhpcy51bnNpZ25lZCk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgYml0d2lzZSBBTkQgb2YgdGhpcyBMb25nIGFuZCB0aGUgc3BlY2lmaWVkLlxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIExvbmdcclxuICogQHJldHVybnMgeyFMb25nfVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5hbmQgPSBmdW5jdGlvbiBhbmQob3RoZXIpIHtcclxuICAgIGlmICghaXNMb25nKG90aGVyKSlcclxuICAgICAgICBvdGhlciA9IGZyb21WYWx1ZShvdGhlcik7XHJcbiAgICByZXR1cm4gZnJvbUJpdHModGhpcy5sb3cgJiBvdGhlci5sb3csIHRoaXMuaGlnaCAmIG90aGVyLmhpZ2gsIHRoaXMudW5zaWduZWQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGJpdHdpc2UgT1Igb2YgdGhpcyBMb25nIGFuZCB0aGUgc3BlY2lmaWVkLlxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIExvbmdcclxuICogQHJldHVybnMgeyFMb25nfVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5vciA9IGZ1bmN0aW9uIG9yKG90aGVyKSB7XHJcbiAgICBpZiAoIWlzTG9uZyhvdGhlcikpXHJcbiAgICAgICAgb3RoZXIgPSBmcm9tVmFsdWUob3RoZXIpO1xyXG4gICAgcmV0dXJuIGZyb21CaXRzKHRoaXMubG93IHwgb3RoZXIubG93LCB0aGlzLmhpZ2ggfCBvdGhlci5oaWdoLCB0aGlzLnVuc2lnbmVkKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBiaXR3aXNlIFhPUiBvZiB0aGlzIExvbmcgYW5kIHRoZSBnaXZlbiBvbmUuXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gb3RoZXIgT3RoZXIgTG9uZ1xyXG4gKiBAcmV0dXJucyB7IUxvbmd9XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLnhvciA9IGZ1bmN0aW9uIHhvcihvdGhlcikge1xyXG4gICAgaWYgKCFpc0xvbmcob3RoZXIpKVxyXG4gICAgICAgIG90aGVyID0gZnJvbVZhbHVlKG90aGVyKTtcclxuICAgIHJldHVybiBmcm9tQml0cyh0aGlzLmxvdyBeIG90aGVyLmxvdywgdGhpcy5oaWdoIF4gb3RoZXIuaGlnaCwgdGhpcy51bnNpZ25lZCk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGlzIExvbmcgd2l0aCBiaXRzIHNoaWZ0ZWQgdG8gdGhlIGxlZnQgYnkgdGhlIGdpdmVuIGFtb3VudC5cclxuICogQHBhcmFtIHtudW1iZXJ8IUxvbmd9IG51bUJpdHMgTnVtYmVyIG9mIGJpdHNcclxuICogQHJldHVybnMgeyFMb25nfSBTaGlmdGVkIExvbmdcclxuICovXHJcbkxvbmdQcm90b3R5cGUuc2hpZnRMZWZ0ID0gZnVuY3Rpb24gc2hpZnRMZWZ0KG51bUJpdHMpIHtcclxuICAgIGlmIChpc0xvbmcobnVtQml0cykpXHJcbiAgICAgICAgbnVtQml0cyA9IG51bUJpdHMudG9JbnQoKTtcclxuICAgIGlmICgobnVtQml0cyAmPSA2MykgPT09IDApXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICBlbHNlIGlmIChudW1CaXRzIDwgMzIpXHJcbiAgICAgICAgcmV0dXJuIGZyb21CaXRzKHRoaXMubG93IDw8IG51bUJpdHMsICh0aGlzLmhpZ2ggPDwgbnVtQml0cykgfCAodGhpcy5sb3cgPj4+ICgzMiAtIG51bUJpdHMpKSwgdGhpcy51bnNpZ25lZCk7XHJcbiAgICBlbHNlXHJcbiAgICAgICAgcmV0dXJuIGZyb21CaXRzKDAsIHRoaXMubG93IDw8IChudW1CaXRzIC0gMzIpLCB0aGlzLnVuc2lnbmVkKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoaXMgTG9uZyB3aXRoIGJpdHMgc2hpZnRlZCB0byB0aGUgbGVmdCBieSB0aGUgZ2l2ZW4gYW1vdW50LiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI3NoaWZ0TGVmdH0uXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge251bWJlcnwhTG9uZ30gbnVtQml0cyBOdW1iZXIgb2YgYml0c1xyXG4gKiBAcmV0dXJucyB7IUxvbmd9IFNoaWZ0ZWQgTG9uZ1xyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5zaGwgPSBMb25nUHJvdG90eXBlLnNoaWZ0TGVmdDtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoaXMgTG9uZyB3aXRoIGJpdHMgYXJpdGhtZXRpY2FsbHkgc2hpZnRlZCB0byB0aGUgcmlnaHQgYnkgdGhlIGdpdmVuIGFtb3VudC5cclxuICogQHBhcmFtIHtudW1iZXJ8IUxvbmd9IG51bUJpdHMgTnVtYmVyIG9mIGJpdHNcclxuICogQHJldHVybnMgeyFMb25nfSBTaGlmdGVkIExvbmdcclxuICovXHJcbkxvbmdQcm90b3R5cGUuc2hpZnRSaWdodCA9IGZ1bmN0aW9uIHNoaWZ0UmlnaHQobnVtQml0cykge1xyXG4gICAgaWYgKGlzTG9uZyhudW1CaXRzKSlcclxuICAgICAgICBudW1CaXRzID0gbnVtQml0cy50b0ludCgpO1xyXG4gICAgaWYgKChudW1CaXRzICY9IDYzKSA9PT0gMClcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIGVsc2UgaWYgKG51bUJpdHMgPCAzMilcclxuICAgICAgICByZXR1cm4gZnJvbUJpdHMoKHRoaXMubG93ID4+PiBudW1CaXRzKSB8ICh0aGlzLmhpZ2ggPDwgKDMyIC0gbnVtQml0cykpLCB0aGlzLmhpZ2ggPj4gbnVtQml0cywgdGhpcy51bnNpZ25lZCk7XHJcbiAgICBlbHNlXHJcbiAgICAgICAgcmV0dXJuIGZyb21CaXRzKHRoaXMuaGlnaCA+PiAobnVtQml0cyAtIDMyKSwgdGhpcy5oaWdoID49IDAgPyAwIDogLTEsIHRoaXMudW5zaWduZWQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhpcyBMb25nIHdpdGggYml0cyBhcml0aG1ldGljYWxseSBzaGlmdGVkIHRvIHRoZSByaWdodCBieSB0aGUgZ2l2ZW4gYW1vdW50LiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI3NoaWZ0UmlnaHR9LlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtudW1iZXJ8IUxvbmd9IG51bUJpdHMgTnVtYmVyIG9mIGJpdHNcclxuICogQHJldHVybnMgeyFMb25nfSBTaGlmdGVkIExvbmdcclxuICovXHJcbkxvbmdQcm90b3R5cGUuc2hyID0gTG9uZ1Byb3RvdHlwZS5zaGlmdFJpZ2h0O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhpcyBMb25nIHdpdGggYml0cyBsb2dpY2FsbHkgc2hpZnRlZCB0byB0aGUgcmlnaHQgYnkgdGhlIGdpdmVuIGFtb3VudC5cclxuICogQHBhcmFtIHtudW1iZXJ8IUxvbmd9IG51bUJpdHMgTnVtYmVyIG9mIGJpdHNcclxuICogQHJldHVybnMgeyFMb25nfSBTaGlmdGVkIExvbmdcclxuICovXHJcbkxvbmdQcm90b3R5cGUuc2hpZnRSaWdodFVuc2lnbmVkID0gZnVuY3Rpb24gc2hpZnRSaWdodFVuc2lnbmVkKG51bUJpdHMpIHtcclxuICAgIGlmIChpc0xvbmcobnVtQml0cykpXHJcbiAgICAgICAgbnVtQml0cyA9IG51bUJpdHMudG9JbnQoKTtcclxuICAgIG51bUJpdHMgJj0gNjM7XHJcbiAgICBpZiAobnVtQml0cyA9PT0gMClcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHZhciBoaWdoID0gdGhpcy5oaWdoO1xyXG4gICAgICAgIGlmIChudW1CaXRzIDwgMzIpIHtcclxuICAgICAgICAgICAgdmFyIGxvdyA9IHRoaXMubG93O1xyXG4gICAgICAgICAgICByZXR1cm4gZnJvbUJpdHMoKGxvdyA+Pj4gbnVtQml0cykgfCAoaGlnaCA8PCAoMzIgLSBudW1CaXRzKSksIGhpZ2ggPj4+IG51bUJpdHMsIHRoaXMudW5zaWduZWQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobnVtQml0cyA9PT0gMzIpXHJcbiAgICAgICAgICAgIHJldHVybiBmcm9tQml0cyhoaWdoLCAwLCB0aGlzLnVuc2lnbmVkKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBmcm9tQml0cyhoaWdoID4+PiAobnVtQml0cyAtIDMyKSwgMCwgdGhpcy51bnNpZ25lZCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGlzIExvbmcgd2l0aCBiaXRzIGxvZ2ljYWxseSBzaGlmdGVkIHRvIHRoZSByaWdodCBieSB0aGUgZ2l2ZW4gYW1vdW50LiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI3NoaWZ0UmlnaHRVbnNpZ25lZH0uXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge251bWJlcnwhTG9uZ30gbnVtQml0cyBOdW1iZXIgb2YgYml0c1xyXG4gKiBAcmV0dXJucyB7IUxvbmd9IFNoaWZ0ZWQgTG9uZ1xyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5zaHJ1ID0gTG9uZ1Byb3RvdHlwZS5zaGlmdFJpZ2h0VW5zaWduZWQ7XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGlzIExvbmcgd2l0aCBiaXRzIGxvZ2ljYWxseSBzaGlmdGVkIHRvIHRoZSByaWdodCBieSB0aGUgZ2l2ZW4gYW1vdW50LiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI3NoaWZ0UmlnaHRVbnNpZ25lZH0uXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge251bWJlcnwhTG9uZ30gbnVtQml0cyBOdW1iZXIgb2YgYml0c1xyXG4gKiBAcmV0dXJucyB7IUxvbmd9IFNoaWZ0ZWQgTG9uZ1xyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5zaHJfdSA9IExvbmdQcm90b3R5cGUuc2hpZnRSaWdodFVuc2lnbmVkO1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIHRoaXMgTG9uZyB0byBzaWduZWQuXHJcbiAqIEByZXR1cm5zIHshTG9uZ30gU2lnbmVkIGxvbmdcclxuICovXHJcbkxvbmdQcm90b3R5cGUudG9TaWduZWQgPSBmdW5jdGlvbiB0b1NpZ25lZCgpIHtcclxuICAgIGlmICghdGhpcy51bnNpZ25lZClcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIHJldHVybiBmcm9tQml0cyh0aGlzLmxvdywgdGhpcy5oaWdoLCBmYWxzZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29udmVydHMgdGhpcyBMb25nIHRvIHVuc2lnbmVkLlxyXG4gKiBAcmV0dXJucyB7IUxvbmd9IFVuc2lnbmVkIGxvbmdcclxuICovXHJcbkxvbmdQcm90b3R5cGUudG9VbnNpZ25lZCA9IGZ1bmN0aW9uIHRvVW5zaWduZWQoKSB7XHJcbiAgICBpZiAodGhpcy51bnNpZ25lZClcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIHJldHVybiBmcm9tQml0cyh0aGlzLmxvdywgdGhpcy5oaWdoLCB0cnVlKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyB0aGlzIExvbmcgdG8gaXRzIGJ5dGUgcmVwcmVzZW50YXRpb24uXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IGxlIFdoZXRoZXIgbGl0dGxlIG9yIGJpZyBlbmRpYW4sIGRlZmF1bHRzIHRvIGJpZyBlbmRpYW5cclxuICogQHJldHVybnMgeyFBcnJheS48bnVtYmVyPn0gQnl0ZSByZXByZXNlbnRhdGlvblxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS50b0J5dGVzID0gZnVuY3Rpb24gdG9CeXRlcyhsZSkge1xyXG4gICAgcmV0dXJuIGxlID8gdGhpcy50b0J5dGVzTEUoKSA6IHRoaXMudG9CeXRlc0JFKCk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29udmVydHMgdGhpcyBMb25nIHRvIGl0cyBsaXR0bGUgZW5kaWFuIGJ5dGUgcmVwcmVzZW50YXRpb24uXHJcbiAqIEByZXR1cm5zIHshQXJyYXkuPG51bWJlcj59IExpdHRsZSBlbmRpYW4gYnl0ZSByZXByZXNlbnRhdGlvblxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS50b0J5dGVzTEUgPSBmdW5jdGlvbiB0b0J5dGVzTEUoKSB7XHJcbiAgICB2YXIgaGkgPSB0aGlzLmhpZ2gsXHJcbiAgICAgICAgbG8gPSB0aGlzLmxvdztcclxuICAgIHJldHVybiBbXHJcbiAgICAgICAgbG8gICAgICAgICYgMHhmZixcclxuICAgICAgICBsbyA+Pj4gIDggJiAweGZmLFxyXG4gICAgICAgIGxvID4+PiAxNiAmIDB4ZmYsXHJcbiAgICAgICAgbG8gPj4+IDI0ICAgICAgICxcclxuICAgICAgICBoaSAgICAgICAgJiAweGZmLFxyXG4gICAgICAgIGhpID4+PiAgOCAmIDB4ZmYsXHJcbiAgICAgICAgaGkgPj4+IDE2ICYgMHhmZixcclxuICAgICAgICBoaSA+Pj4gMjRcclxuICAgIF07XHJcbn07XHJcblxyXG4vKipcclxuICogQ29udmVydHMgdGhpcyBMb25nIHRvIGl0cyBiaWcgZW5kaWFuIGJ5dGUgcmVwcmVzZW50YXRpb24uXHJcbiAqIEByZXR1cm5zIHshQXJyYXkuPG51bWJlcj59IEJpZyBlbmRpYW4gYnl0ZSByZXByZXNlbnRhdGlvblxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS50b0J5dGVzQkUgPSBmdW5jdGlvbiB0b0J5dGVzQkUoKSB7XHJcbiAgICB2YXIgaGkgPSB0aGlzLmhpZ2gsXHJcbiAgICAgICAgbG8gPSB0aGlzLmxvdztcclxuICAgIHJldHVybiBbXHJcbiAgICAgICAgaGkgPj4+IDI0ICAgICAgICxcclxuICAgICAgICBoaSA+Pj4gMTYgJiAweGZmLFxyXG4gICAgICAgIGhpID4+PiAgOCAmIDB4ZmYsXHJcbiAgICAgICAgaGkgICAgICAgICYgMHhmZixcclxuICAgICAgICBsbyA+Pj4gMjQgICAgICAgLFxyXG4gICAgICAgIGxvID4+PiAxNiAmIDB4ZmYsXHJcbiAgICAgICAgbG8gPj4+ICA4ICYgMHhmZixcclxuICAgICAgICBsbyAgICAgICAgJiAweGZmXHJcbiAgICBdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBMb25nIGZyb20gaXRzIGJ5dGUgcmVwcmVzZW50YXRpb24uXHJcbiAqIEBwYXJhbSB7IUFycmF5LjxudW1iZXI+fSBieXRlcyBCeXRlIHJlcHJlc2VudGF0aW9uXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IHVuc2lnbmVkIFdoZXRoZXIgdW5zaWduZWQgb3Igbm90LCBkZWZhdWx0cyB0byBzaWduZWRcclxuICogQHBhcmFtIHtib29sZWFuPX0gbGUgV2hldGhlciBsaXR0bGUgb3IgYmlnIGVuZGlhbiwgZGVmYXVsdHMgdG8gYmlnIGVuZGlhblxyXG4gKiBAcmV0dXJucyB7TG9uZ30gVGhlIGNvcnJlc3BvbmRpbmcgTG9uZyB2YWx1ZVxyXG4gKi9cclxuTG9uZy5mcm9tQnl0ZXMgPSBmdW5jdGlvbiBmcm9tQnl0ZXMoYnl0ZXMsIHVuc2lnbmVkLCBsZSkge1xyXG4gICAgcmV0dXJuIGxlID8gTG9uZy5mcm9tQnl0ZXNMRShieXRlcywgdW5zaWduZWQpIDogTG9uZy5mcm9tQnl0ZXNCRShieXRlcywgdW5zaWduZWQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBMb25nIGZyb20gaXRzIGxpdHRsZSBlbmRpYW4gYnl0ZSByZXByZXNlbnRhdGlvbi5cclxuICogQHBhcmFtIHshQXJyYXkuPG51bWJlcj59IGJ5dGVzIExpdHRsZSBlbmRpYW4gYnl0ZSByZXByZXNlbnRhdGlvblxyXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSB1bnNpZ25lZCBXaGV0aGVyIHVuc2lnbmVkIG9yIG5vdCwgZGVmYXVsdHMgdG8gc2lnbmVkXHJcbiAqIEByZXR1cm5zIHtMb25nfSBUaGUgY29ycmVzcG9uZGluZyBMb25nIHZhbHVlXHJcbiAqL1xyXG5Mb25nLmZyb21CeXRlc0xFID0gZnVuY3Rpb24gZnJvbUJ5dGVzTEUoYnl0ZXMsIHVuc2lnbmVkKSB7XHJcbiAgICByZXR1cm4gbmV3IExvbmcoXHJcbiAgICAgICAgYnl0ZXNbMF0gICAgICAgfFxyXG4gICAgICAgIGJ5dGVzWzFdIDw8ICA4IHxcclxuICAgICAgICBieXRlc1syXSA8PCAxNiB8XHJcbiAgICAgICAgYnl0ZXNbM10gPDwgMjQsXHJcbiAgICAgICAgYnl0ZXNbNF0gICAgICAgfFxyXG4gICAgICAgIGJ5dGVzWzVdIDw8ICA4IHxcclxuICAgICAgICBieXRlc1s2XSA8PCAxNiB8XHJcbiAgICAgICAgYnl0ZXNbN10gPDwgMjQsXHJcbiAgICAgICAgdW5zaWduZWRcclxuICAgICk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIExvbmcgZnJvbSBpdHMgYmlnIGVuZGlhbiBieXRlIHJlcHJlc2VudGF0aW9uLlxyXG4gKiBAcGFyYW0geyFBcnJheS48bnVtYmVyPn0gYnl0ZXMgQmlnIGVuZGlhbiBieXRlIHJlcHJlc2VudGF0aW9uXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IHVuc2lnbmVkIFdoZXRoZXIgdW5zaWduZWQgb3Igbm90LCBkZWZhdWx0cyB0byBzaWduZWRcclxuICogQHJldHVybnMge0xvbmd9IFRoZSBjb3JyZXNwb25kaW5nIExvbmcgdmFsdWVcclxuICovXHJcbkxvbmcuZnJvbUJ5dGVzQkUgPSBmdW5jdGlvbiBmcm9tQnl0ZXNCRShieXRlcywgdW5zaWduZWQpIHtcclxuICAgIHJldHVybiBuZXcgTG9uZyhcclxuICAgICAgICBieXRlc1s0XSA8PCAyNCB8XHJcbiAgICAgICAgYnl0ZXNbNV0gPDwgMTYgfFxyXG4gICAgICAgIGJ5dGVzWzZdIDw8ICA4IHxcclxuICAgICAgICBieXRlc1s3XSxcclxuICAgICAgICBieXRlc1swXSA8PCAyNCB8XHJcbiAgICAgICAgYnl0ZXNbMV0gPDwgMTYgfFxyXG4gICAgICAgIGJ5dGVzWzJdIDw8ICA4IHxcclxuICAgICAgICBieXRlc1szXSxcclxuICAgICAgICB1bnNpZ25lZFxyXG4gICAgKTtcclxufTtcclxuIiwiLy8gbWluaW1hbCBsaWJyYXJ5IGVudHJ5IHBvaW50LlxuXG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vc3JjL2luZGV4LW1pbmltYWxcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBwcm90b2J1ZiA9IGV4cG9ydHM7XG5cbi8qKlxuICogQnVpbGQgdHlwZSwgb25lIG9mIGBcImZ1bGxcImAsIGBcImxpZ2h0XCJgIG9yIGBcIm1pbmltYWxcImAuXG4gKiBAbmFtZSBidWlsZFxuICogQHR5cGUge3N0cmluZ31cbiAqIEBjb25zdFxuICovXG5wcm90b2J1Zi5idWlsZCA9IFwibWluaW1hbFwiO1xuXG4vLyBTZXJpYWxpemF0aW9uXG5wcm90b2J1Zi5Xcml0ZXIgICAgICAgPSByZXF1aXJlKFwiLi93cml0ZXJcIik7XG5wcm90b2J1Zi5CdWZmZXJXcml0ZXIgPSByZXF1aXJlKFwiLi93cml0ZXJfYnVmZmVyXCIpO1xucHJvdG9idWYuUmVhZGVyICAgICAgID0gcmVxdWlyZShcIi4vcmVhZGVyXCIpO1xucHJvdG9idWYuQnVmZmVyUmVhZGVyID0gcmVxdWlyZShcIi4vcmVhZGVyX2J1ZmZlclwiKTtcblxuLy8gVXRpbGl0eVxucHJvdG9idWYudXRpbCAgICAgICAgID0gcmVxdWlyZShcIi4vdXRpbC9taW5pbWFsXCIpO1xucHJvdG9idWYucnBjICAgICAgICAgID0gcmVxdWlyZShcIi4vcnBjXCIpO1xucHJvdG9idWYucm9vdHMgICAgICAgID0gcmVxdWlyZShcIi4vcm9vdHNcIik7XG5wcm90b2J1Zi5jb25maWd1cmUgICAgPSBjb25maWd1cmU7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4vKipcbiAqIFJlY29uZmlndXJlcyB0aGUgbGlicmFyeSBhY2NvcmRpbmcgdG8gdGhlIGVudmlyb25tZW50LlxuICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAqL1xuZnVuY3Rpb24gY29uZmlndXJlKCkge1xuICAgIHByb3RvYnVmLnV0aWwuX2NvbmZpZ3VyZSgpO1xuICAgIHByb3RvYnVmLldyaXRlci5fY29uZmlndXJlKHByb3RvYnVmLkJ1ZmZlcldyaXRlcik7XG4gICAgcHJvdG9idWYuUmVhZGVyLl9jb25maWd1cmUocHJvdG9idWYuQnVmZmVyUmVhZGVyKTtcbn1cblxuLy8gU2V0IHVwIGJ1ZmZlciB1dGlsaXR5IGFjY29yZGluZyB0byB0aGUgZW52aXJvbm1lbnRcbmNvbmZpZ3VyZSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IFJlYWRlcjtcblxudmFyIHV0aWwgICAgICA9IHJlcXVpcmUoXCIuL3V0aWwvbWluaW1hbFwiKTtcblxudmFyIEJ1ZmZlclJlYWRlcjsgLy8gY3ljbGljXG5cbnZhciBMb25nQml0cyAgPSB1dGlsLkxvbmdCaXRzLFxuICAgIHV0ZjggICAgICA9IHV0aWwudXRmODtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmZ1bmN0aW9uIGluZGV4T3V0T2ZSYW5nZShyZWFkZXIsIHdyaXRlTGVuZ3RoKSB7XG4gICAgcmV0dXJuIFJhbmdlRXJyb3IoXCJpbmRleCBvdXQgb2YgcmFuZ2U6IFwiICsgcmVhZGVyLnBvcyArIFwiICsgXCIgKyAod3JpdGVMZW5ndGggfHwgMSkgKyBcIiA+IFwiICsgcmVhZGVyLmxlbik7XG59XG5cbi8qKlxuICogQ29uc3RydWN0cyBhIG5ldyByZWFkZXIgaW5zdGFuY2UgdXNpbmcgdGhlIHNwZWNpZmllZCBidWZmZXIuXG4gKiBAY2xhc3NkZXNjIFdpcmUgZm9ybWF0IHJlYWRlciB1c2luZyBgVWludDhBcnJheWAgaWYgYXZhaWxhYmxlLCBvdGhlcndpc2UgYEFycmF5YC5cbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWZmZXIgQnVmZmVyIHRvIHJlYWQgZnJvbVxuICovXG5mdW5jdGlvbiBSZWFkZXIoYnVmZmVyKSB7XG5cbiAgICAvKipcbiAgICAgKiBSZWFkIGJ1ZmZlci5cbiAgICAgKiBAdHlwZSB7VWludDhBcnJheX1cbiAgICAgKi9cbiAgICB0aGlzLmJ1ZiA9IGJ1ZmZlcjtcblxuICAgIC8qKlxuICAgICAqIFJlYWQgYnVmZmVyIHBvc2l0aW9uLlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5wb3MgPSAwO1xuXG4gICAgLyoqXG4gICAgICogUmVhZCBidWZmZXIgbGVuZ3RoLlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5sZW4gPSBidWZmZXIubGVuZ3RoO1xufVxuXG52YXIgY3JlYXRlX2FycmF5ID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09IFwidW5kZWZpbmVkXCJcbiAgICA/IGZ1bmN0aW9uIGNyZWF0ZV90eXBlZF9hcnJheShidWZmZXIpIHtcbiAgICAgICAgaWYgKGJ1ZmZlciBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkgfHwgQXJyYXkuaXNBcnJheShidWZmZXIpKVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWFkZXIoYnVmZmVyKTtcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJpbGxlZ2FsIGJ1ZmZlclwiKTtcbiAgICB9XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICA6IGZ1bmN0aW9uIGNyZWF0ZV9hcnJheShidWZmZXIpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYnVmZmVyKSlcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVhZGVyKGJ1ZmZlcik7XG4gICAgICAgIHRocm93IEVycm9yKFwiaWxsZWdhbCBidWZmZXJcIik7XG4gICAgfTtcblxudmFyIGNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICByZXR1cm4gdXRpbC5CdWZmZXJcbiAgICAgICAgPyBmdW5jdGlvbiBjcmVhdGVfYnVmZmVyX3NldHVwKGJ1ZmZlcikge1xuICAgICAgICAgICAgcmV0dXJuIChSZWFkZXIuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlX2J1ZmZlcihidWZmZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdXRpbC5CdWZmZXIuaXNCdWZmZXIoYnVmZmVyKVxuICAgICAgICAgICAgICAgICAgICA/IG5ldyBCdWZmZXJSZWFkZXIoYnVmZmVyKVxuICAgICAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICAgICAgICAgICAgICA6IGNyZWF0ZV9hcnJheShidWZmZXIpO1xuICAgICAgICAgICAgfSkoYnVmZmVyKTtcbiAgICAgICAgfVxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICA6IGNyZWF0ZV9hcnJheTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyByZWFkZXIgdXNpbmcgdGhlIHNwZWNpZmllZCBidWZmZXIuXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7VWludDhBcnJheXxCdWZmZXJ9IGJ1ZmZlciBCdWZmZXIgdG8gcmVhZCBmcm9tXG4gKiBAcmV0dXJucyB7UmVhZGVyfEJ1ZmZlclJlYWRlcn0gQSB7QGxpbmsgQnVmZmVyUmVhZGVyfSBpZiBgYnVmZmVyYCBpcyBhIEJ1ZmZlciwgb3RoZXJ3aXNlIGEge0BsaW5rIFJlYWRlcn1cbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiBgYnVmZmVyYCBpcyBub3QgYSB2YWxpZCBidWZmZXJcbiAqL1xuUmVhZGVyLmNyZWF0ZSA9IGNyZWF0ZSgpO1xuXG5SZWFkZXIucHJvdG90eXBlLl9zbGljZSA9IHV0aWwuQXJyYXkucHJvdG90eXBlLnN1YmFycmF5IHx8IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIHV0aWwuQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuXG4vKipcbiAqIFJlYWRzIGEgdmFyaW50IGFzIGFuIHVuc2lnbmVkIDMyIGJpdCB2YWx1ZS5cbiAqIEBmdW5jdGlvblxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxuICovXG5SZWFkZXIucHJvdG90eXBlLnVpbnQzMiA9IChmdW5jdGlvbiByZWFkX3VpbnQzMl9zZXR1cCgpIHtcbiAgICB2YXIgdmFsdWUgPSA0Mjk0OTY3Mjk1OyAvLyBvcHRpbWl6ZXIgdHlwZS1oaW50LCB0ZW5kcyB0byBkZW9wdCBvdGhlcndpc2UgKD8hKVxuICAgIHJldHVybiBmdW5jdGlvbiByZWFkX3VpbnQzMigpIHtcbiAgICAgICAgdmFsdWUgPSAoICAgICAgICAgdGhpcy5idWZbdGhpcy5wb3NdICYgMTI3ICAgICAgICkgPj4+IDA7IGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOCkgcmV0dXJuIHZhbHVlO1xuICAgICAgICB2YWx1ZSA9ICh2YWx1ZSB8ICh0aGlzLmJ1Zlt0aGlzLnBvc10gJiAxMjcpIDw8ICA3KSA+Pj4gMDsgaWYgKHRoaXMuYnVmW3RoaXMucG9zKytdIDwgMTI4KSByZXR1cm4gdmFsdWU7XG4gICAgICAgIHZhbHVlID0gKHZhbHVlIHwgKHRoaXMuYnVmW3RoaXMucG9zXSAmIDEyNykgPDwgMTQpID4+PiAwOyBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpIHJldHVybiB2YWx1ZTtcbiAgICAgICAgdmFsdWUgPSAodmFsdWUgfCAodGhpcy5idWZbdGhpcy5wb3NdICYgMTI3KSA8PCAyMSkgPj4+IDA7IGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOCkgcmV0dXJuIHZhbHVlO1xuICAgICAgICB2YWx1ZSA9ICh2YWx1ZSB8ICh0aGlzLmJ1Zlt0aGlzLnBvc10gJiAgMTUpIDw8IDI4KSA+Pj4gMDsgaWYgKHRoaXMuYnVmW3RoaXMucG9zKytdIDwgMTI4KSByZXR1cm4gdmFsdWU7XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmICgodGhpcy5wb3MgKz0gNSkgPiB0aGlzLmxlbikge1xuICAgICAgICAgICAgdGhpcy5wb3MgPSB0aGlzLmxlbjtcbiAgICAgICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzLCAxMCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG59KSgpO1xuXG4vKipcbiAqIFJlYWRzIGEgdmFyaW50IGFzIGEgc2lnbmVkIDMyIGJpdCB2YWx1ZS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS5pbnQzMiA9IGZ1bmN0aW9uIHJlYWRfaW50MzIoKSB7XG4gICAgcmV0dXJuIHRoaXMudWludDMyKCkgfCAwO1xufTtcblxuLyoqXG4gKiBSZWFkcyBhIHppZy16YWcgZW5jb2RlZCB2YXJpbnQgYXMgYSBzaWduZWQgMzIgYml0IHZhbHVlLlxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxuICovXG5SZWFkZXIucHJvdG90eXBlLnNpbnQzMiA9IGZ1bmN0aW9uIHJlYWRfc2ludDMyKCkge1xuICAgIHZhciB2YWx1ZSA9IHRoaXMudWludDMyKCk7XG4gICAgcmV0dXJuIHZhbHVlID4+PiAxIF4gLSh2YWx1ZSAmIDEpIHwgMDtcbn07XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLWludmFsaWQtdGhpcyAqL1xuXG5mdW5jdGlvbiByZWFkTG9uZ1ZhcmludCgpIHtcbiAgICAvLyB0ZW5kcyB0byBkZW9wdCB3aXRoIGxvY2FsIHZhcnMgZm9yIG9jdGV0IGV0Yy5cbiAgICB2YXIgYml0cyA9IG5ldyBMb25nQml0cygwLCAwKTtcbiAgICB2YXIgaSA9IDA7XG4gICAgaWYgKHRoaXMubGVuIC0gdGhpcy5wb3MgPiA0KSB7IC8vIGZhc3Qgcm91dGUgKGxvKVxuICAgICAgICBmb3IgKDsgaSA8IDQ7ICsraSkge1xuICAgICAgICAgICAgLy8gMXN0Li40dGhcbiAgICAgICAgICAgIGJpdHMubG8gPSAoYml0cy5sbyB8ICh0aGlzLmJ1Zlt0aGlzLnBvc10gJiAxMjcpIDw8IGkgKiA3KSA+Pj4gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOClcbiAgICAgICAgICAgICAgICByZXR1cm4gYml0cztcbiAgICAgICAgfVxuICAgICAgICAvLyA1dGhcbiAgICAgICAgYml0cy5sbyA9IChiaXRzLmxvIHwgKHRoaXMuYnVmW3RoaXMucG9zXSAmIDEyNykgPDwgMjgpID4+PiAwO1xuICAgICAgICBiaXRzLmhpID0gKGJpdHMuaGkgfCAodGhpcy5idWZbdGhpcy5wb3NdICYgMTI3KSA+PiAgNCkgPj4+IDA7XG4gICAgICAgIGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOClcbiAgICAgICAgICAgIHJldHVybiBiaXRzO1xuICAgICAgICBpID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKDsgaSA8IDM7ICsraSkge1xuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgICAgICBpZiAodGhpcy5wb3MgPj0gdGhpcy5sZW4pXG4gICAgICAgICAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMpO1xuICAgICAgICAgICAgLy8gMXN0Li4zdGhcbiAgICAgICAgICAgIGJpdHMubG8gPSAoYml0cy5sbyB8ICh0aGlzLmJ1Zlt0aGlzLnBvc10gJiAxMjcpIDw8IGkgKiA3KSA+Pj4gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOClcbiAgICAgICAgICAgICAgICByZXR1cm4gYml0cztcbiAgICAgICAgfVxuICAgICAgICAvLyA0dGhcbiAgICAgICAgYml0cy5sbyA9IChiaXRzLmxvIHwgKHRoaXMuYnVmW3RoaXMucG9zKytdICYgMTI3KSA8PCBpICogNykgPj4+IDA7XG4gICAgICAgIHJldHVybiBiaXRzO1xuICAgIH1cbiAgICBpZiAodGhpcy5sZW4gLSB0aGlzLnBvcyA+IDQpIHsgLy8gZmFzdCByb3V0ZSAoaGkpXG4gICAgICAgIGZvciAoOyBpIDwgNTsgKytpKSB7XG4gICAgICAgICAgICAvLyA2dGguLjEwdGhcbiAgICAgICAgICAgIGJpdHMuaGkgPSAoYml0cy5oaSB8ICh0aGlzLmJ1Zlt0aGlzLnBvc10gJiAxMjcpIDw8IGkgKiA3ICsgMykgPj4+IDA7XG4gICAgICAgICAgICBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpdHM7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKDsgaSA8IDU7ICsraSkge1xuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgICAgICBpZiAodGhpcy5wb3MgPj0gdGhpcy5sZW4pXG4gICAgICAgICAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMpO1xuICAgICAgICAgICAgLy8gNnRoLi4xMHRoXG4gICAgICAgICAgICBiaXRzLmhpID0gKGJpdHMuaGkgfCAodGhpcy5idWZbdGhpcy5wb3NdICYgMTI3KSA8PCBpICogNyArIDMpID4+PiAwO1xuICAgICAgICAgICAgaWYgKHRoaXMuYnVmW3RoaXMucG9zKytdIDwgMTI4KVxuICAgICAgICAgICAgICAgIHJldHVybiBiaXRzO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgdGhyb3cgRXJyb3IoXCJpbnZhbGlkIHZhcmludCBlbmNvZGluZ1wiKTtcbn1cblxuLyogZXNsaW50LWVuYWJsZSBuby1pbnZhbGlkLXRoaXMgKi9cblxuLyoqXG4gKiBSZWFkcyBhIHZhcmludCBhcyBhIHNpZ25lZCA2NCBiaXQgdmFsdWUuXG4gKiBAbmFtZSBSZWFkZXIjaW50NjRcbiAqIEBmdW5jdGlvblxuICogQHJldHVybnMge0xvbmd9IFZhbHVlIHJlYWRcbiAqL1xuXG4vKipcbiAqIFJlYWRzIGEgdmFyaW50IGFzIGFuIHVuc2lnbmVkIDY0IGJpdCB2YWx1ZS5cbiAqIEBuYW1lIFJlYWRlciN1aW50NjRcbiAqIEBmdW5jdGlvblxuICogQHJldHVybnMge0xvbmd9IFZhbHVlIHJlYWRcbiAqL1xuXG4vKipcbiAqIFJlYWRzIGEgemlnLXphZyBlbmNvZGVkIHZhcmludCBhcyBhIHNpZ25lZCA2NCBiaXQgdmFsdWUuXG4gKiBAbmFtZSBSZWFkZXIjc2ludDY0XG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtMb25nfSBWYWx1ZSByZWFkXG4gKi9cblxuLyoqXG4gKiBSZWFkcyBhIHZhcmludCBhcyBhIGJvb2xlYW4uXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVmFsdWUgcmVhZFxuICovXG5SZWFkZXIucHJvdG90eXBlLmJvb2wgPSBmdW5jdGlvbiByZWFkX2Jvb2woKSB7XG4gICAgcmV0dXJuIHRoaXMudWludDMyKCkgIT09IDA7XG59O1xuXG5mdW5jdGlvbiByZWFkRml4ZWQzMl9lbmQoYnVmLCBlbmQpIHsgLy8gbm90ZSB0aGF0IHRoaXMgdXNlcyBgZW5kYCwgbm90IGBwb3NgXG4gICAgcmV0dXJuIChidWZbZW5kIC0gNF1cbiAgICAgICAgICB8IGJ1ZltlbmQgLSAzXSA8PCA4XG4gICAgICAgICAgfCBidWZbZW5kIC0gMl0gPDwgMTZcbiAgICAgICAgICB8IGJ1ZltlbmQgLSAxXSA8PCAyNCkgPj4+IDA7XG59XG5cbi8qKlxuICogUmVhZHMgZml4ZWQgMzIgYml0cyBhcyBhbiB1bnNpZ25lZCAzMiBiaXQgaW50ZWdlci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS5maXhlZDMyID0gZnVuY3Rpb24gcmVhZF9maXhlZDMyKCkge1xuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKHRoaXMucG9zICsgNCA+IHRoaXMubGVuKVxuICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcywgNCk7XG5cbiAgICByZXR1cm4gcmVhZEZpeGVkMzJfZW5kKHRoaXMuYnVmLCB0aGlzLnBvcyArPSA0KTtcbn07XG5cbi8qKlxuICogUmVhZHMgZml4ZWQgMzIgYml0cyBhcyBhIHNpZ25lZCAzMiBiaXQgaW50ZWdlci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS5zZml4ZWQzMiA9IGZ1bmN0aW9uIHJlYWRfc2ZpeGVkMzIoKSB7XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAodGhpcy5wb3MgKyA0ID4gdGhpcy5sZW4pXG4gICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzLCA0KTtcblxuICAgIHJldHVybiByZWFkRml4ZWQzMl9lbmQodGhpcy5idWYsIHRoaXMucG9zICs9IDQpIHwgMDtcbn07XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLWludmFsaWQtdGhpcyAqL1xuXG5mdW5jdGlvbiByZWFkRml4ZWQ2NCgvKiB0aGlzOiBSZWFkZXIgKi8pIHtcblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICh0aGlzLnBvcyArIDggPiB0aGlzLmxlbilcbiAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMsIDgpO1xuXG4gICAgcmV0dXJuIG5ldyBMb25nQml0cyhyZWFkRml4ZWQzMl9lbmQodGhpcy5idWYsIHRoaXMucG9zICs9IDQpLCByZWFkRml4ZWQzMl9lbmQodGhpcy5idWYsIHRoaXMucG9zICs9IDQpKTtcbn1cblxuLyogZXNsaW50LWVuYWJsZSBuby1pbnZhbGlkLXRoaXMgKi9cblxuLyoqXG4gKiBSZWFkcyBmaXhlZCA2NCBiaXRzLlxuICogQG5hbWUgUmVhZGVyI2ZpeGVkNjRcbiAqIEBmdW5jdGlvblxuICogQHJldHVybnMge0xvbmd9IFZhbHVlIHJlYWRcbiAqL1xuXG4vKipcbiAqIFJlYWRzIHppZy16YWcgZW5jb2RlZCBmaXhlZCA2NCBiaXRzLlxuICogQG5hbWUgUmVhZGVyI3NmaXhlZDY0XG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtMb25nfSBWYWx1ZSByZWFkXG4gKi9cblxuLyoqXG4gKiBSZWFkcyBhIGZsb2F0ICgzMiBiaXQpIGFzIGEgbnVtYmVyLlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXG4gKi9cblJlYWRlci5wcm90b3R5cGUuZmxvYXQgPSBmdW5jdGlvbiByZWFkX2Zsb2F0KCkge1xuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKHRoaXMucG9zICsgNCA+IHRoaXMubGVuKVxuICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcywgNCk7XG5cbiAgICB2YXIgdmFsdWUgPSB1dGlsLmZsb2F0LnJlYWRGbG9hdExFKHRoaXMuYnVmLCB0aGlzLnBvcyk7XG4gICAgdGhpcy5wb3MgKz0gNDtcbiAgICByZXR1cm4gdmFsdWU7XG59O1xuXG4vKipcbiAqIFJlYWRzIGEgZG91YmxlICg2NCBiaXQgZmxvYXQpIGFzIGEgbnVtYmVyLlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXG4gKi9cblJlYWRlci5wcm90b3R5cGUuZG91YmxlID0gZnVuY3Rpb24gcmVhZF9kb3VibGUoKSB7XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAodGhpcy5wb3MgKyA4ID4gdGhpcy5sZW4pXG4gICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzLCA0KTtcblxuICAgIHZhciB2YWx1ZSA9IHV0aWwuZmxvYXQucmVhZERvdWJsZUxFKHRoaXMuYnVmLCB0aGlzLnBvcyk7XG4gICAgdGhpcy5wb3MgKz0gODtcbiAgICByZXR1cm4gdmFsdWU7XG59O1xuXG4vKipcbiAqIFJlYWRzIGEgc2VxdWVuY2Ugb2YgYnl0ZXMgcHJlY2VlZGVkIGJ5IGl0cyBsZW5ndGggYXMgYSB2YXJpbnQuXG4gKiBAcmV0dXJucyB7VWludDhBcnJheX0gVmFsdWUgcmVhZFxuICovXG5SZWFkZXIucHJvdG90eXBlLmJ5dGVzID0gZnVuY3Rpb24gcmVhZF9ieXRlcygpIHtcbiAgICB2YXIgbGVuZ3RoID0gdGhpcy51aW50MzIoKSxcbiAgICAgICAgc3RhcnQgID0gdGhpcy5wb3MsXG4gICAgICAgIGVuZCAgICA9IHRoaXMucG9zICsgbGVuZ3RoO1xuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKGVuZCA+IHRoaXMubGVuKVxuICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcywgbGVuZ3RoKTtcblxuICAgIHRoaXMucG9zICs9IGxlbmd0aDtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmJ1ZikpIC8vIHBsYWluIGFycmF5XG4gICAgICAgIHJldHVybiB0aGlzLmJ1Zi5zbGljZShzdGFydCwgZW5kKTtcbiAgICByZXR1cm4gc3RhcnQgPT09IGVuZCAvLyBmaXggZm9yIElFIDEwL1dpbjggYW5kIG90aGVycycgc3ViYXJyYXkgcmV0dXJuaW5nIGFycmF5IG9mIHNpemUgMVxuICAgICAgICA/IG5ldyB0aGlzLmJ1Zi5jb25zdHJ1Y3RvcigwKVxuICAgICAgICA6IHRoaXMuX3NsaWNlLmNhbGwodGhpcy5idWYsIHN0YXJ0LCBlbmQpO1xufTtcblxuLyoqXG4gKiBSZWFkcyBhIHN0cmluZyBwcmVjZWVkZWQgYnkgaXRzIGJ5dGUgbGVuZ3RoIGFzIGEgdmFyaW50LlxuICogQHJldHVybnMge3N0cmluZ30gVmFsdWUgcmVhZFxuICovXG5SZWFkZXIucHJvdG90eXBlLnN0cmluZyA9IGZ1bmN0aW9uIHJlYWRfc3RyaW5nKCkge1xuICAgIHZhciBieXRlcyA9IHRoaXMuYnl0ZXMoKTtcbiAgICByZXR1cm4gdXRmOC5yZWFkKGJ5dGVzLCAwLCBieXRlcy5sZW5ndGgpO1xufTtcblxuLyoqXG4gKiBTa2lwcyB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBieXRlcyBpZiBzcGVjaWZpZWQsIG90aGVyd2lzZSBza2lwcyBhIHZhcmludC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoXSBMZW5ndGggaWYga25vd24sIG90aGVyd2lzZSBhIHZhcmludCBpcyBhc3N1bWVkXG4gKiBAcmV0dXJucyB7UmVhZGVyfSBgdGhpc2BcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS5za2lwID0gZnVuY3Rpb24gc2tpcChsZW5ndGgpIHtcbiAgICBpZiAodHlwZW9mIGxlbmd0aCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKHRoaXMucG9zICsgbGVuZ3RoID4gdGhpcy5sZW4pXG4gICAgICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcywgbGVuZ3RoKTtcbiAgICAgICAgdGhpcy5wb3MgKz0gbGVuZ3RoO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICAgICAgaWYgKHRoaXMucG9zID49IHRoaXMubGVuKVxuICAgICAgICAgICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzKTtcbiAgICAgICAgfSB3aGlsZSAodGhpcy5idWZbdGhpcy5wb3MrK10gJiAxMjgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2tpcHMgdGhlIG5leHQgZWxlbWVudCBvZiB0aGUgc3BlY2lmaWVkIHdpcmUgdHlwZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSB3aXJlVHlwZSBXaXJlIHR5cGUgcmVjZWl2ZWRcbiAqIEByZXR1cm5zIHtSZWFkZXJ9IGB0aGlzYFxuICovXG5SZWFkZXIucHJvdG90eXBlLnNraXBUeXBlID0gZnVuY3Rpb24od2lyZVR5cGUpIHtcbiAgICBzd2l0Y2ggKHdpcmVUeXBlKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIHRoaXMuc2tpcCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIHRoaXMuc2tpcCg4KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICB0aGlzLnNraXAodGhpcy51aW50MzIoKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgd2hpbGUgKCh3aXJlVHlwZSA9IHRoaXMudWludDMyKCkgJiA3KSAhPT0gNCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2tpcFR5cGUod2lyZVR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgIHRoaXMuc2tpcCg0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcImludmFsaWQgd2lyZSB0eXBlIFwiICsgd2lyZVR5cGUgKyBcIiBhdCBvZmZzZXQgXCIgKyB0aGlzLnBvcyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblxuUmVhZGVyLl9jb25maWd1cmUgPSBmdW5jdGlvbihCdWZmZXJSZWFkZXJfKSB7XG4gICAgQnVmZmVyUmVhZGVyID0gQnVmZmVyUmVhZGVyXztcbiAgICBSZWFkZXIuY3JlYXRlID0gY3JlYXRlKCk7XG4gICAgQnVmZmVyUmVhZGVyLl9jb25maWd1cmUoKTtcblxuICAgIHZhciBmbiA9IHV0aWwuTG9uZyA/IFwidG9Mb25nXCIgOiAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyBcInRvTnVtYmVyXCI7XG4gICAgdXRpbC5tZXJnZShSZWFkZXIucHJvdG90eXBlLCB7XG5cbiAgICAgICAgaW50NjQ6IGZ1bmN0aW9uIHJlYWRfaW50NjQoKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVhZExvbmdWYXJpbnQuY2FsbCh0aGlzKVtmbl0oZmFsc2UpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHVpbnQ2NDogZnVuY3Rpb24gcmVhZF91aW50NjQoKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVhZExvbmdWYXJpbnQuY2FsbCh0aGlzKVtmbl0odHJ1ZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2ludDY0OiBmdW5jdGlvbiByZWFkX3NpbnQ2NCgpIHtcbiAgICAgICAgICAgIHJldHVybiByZWFkTG9uZ1ZhcmludC5jYWxsKHRoaXMpLnp6RGVjb2RlKClbZm5dKGZhbHNlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBmaXhlZDY0OiBmdW5jdGlvbiByZWFkX2ZpeGVkNjQoKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVhZEZpeGVkNjQuY2FsbCh0aGlzKVtmbl0odHJ1ZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2ZpeGVkNjQ6IGZ1bmN0aW9uIHJlYWRfc2ZpeGVkNjQoKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVhZEZpeGVkNjQuY2FsbCh0aGlzKVtmbl0oZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gQnVmZmVyUmVhZGVyO1xuXG4vLyBleHRlbmRzIFJlYWRlclxudmFyIFJlYWRlciA9IHJlcXVpcmUoXCIuL3JlYWRlclwiKTtcbihCdWZmZXJSZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShSZWFkZXIucHJvdG90eXBlKSkuY29uc3RydWN0b3IgPSBCdWZmZXJSZWFkZXI7XG5cbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbC9taW5pbWFsXCIpO1xuXG4vKipcbiAqIENvbnN0cnVjdHMgYSBuZXcgYnVmZmVyIHJlYWRlciBpbnN0YW5jZS5cbiAqIEBjbGFzc2Rlc2MgV2lyZSBmb3JtYXQgcmVhZGVyIHVzaW5nIG5vZGUgYnVmZmVycy5cbiAqIEBleHRlbmRzIFJlYWRlclxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0J1ZmZlcn0gYnVmZmVyIEJ1ZmZlciB0byByZWFkIGZyb21cbiAqL1xuZnVuY3Rpb24gQnVmZmVyUmVhZGVyKGJ1ZmZlcikge1xuICAgIFJlYWRlci5jYWxsKHRoaXMsIGJ1ZmZlcik7XG5cbiAgICAvKipcbiAgICAgKiBSZWFkIGJ1ZmZlci5cbiAgICAgKiBAbmFtZSBCdWZmZXJSZWFkZXIjYnVmXG4gICAgICogQHR5cGUge0J1ZmZlcn1cbiAgICAgKi9cbn1cblxuQnVmZmVyUmVhZGVyLl9jb25maWd1cmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICBpZiAodXRpbC5CdWZmZXIpXG4gICAgICAgIEJ1ZmZlclJlYWRlci5wcm90b3R5cGUuX3NsaWNlID0gdXRpbC5CdWZmZXIucHJvdG90eXBlLnNsaWNlO1xufTtcblxuXG4vKipcbiAqIEBvdmVycmlkZVxuICovXG5CdWZmZXJSZWFkZXIucHJvdG90eXBlLnN0cmluZyA9IGZ1bmN0aW9uIHJlYWRfc3RyaW5nX2J1ZmZlcigpIHtcbiAgICB2YXIgbGVuID0gdGhpcy51aW50MzIoKTsgLy8gbW9kaWZpZXMgcG9zXG4gICAgcmV0dXJuIHRoaXMuYnVmLnV0ZjhTbGljZVxuICAgICAgICA/IHRoaXMuYnVmLnV0ZjhTbGljZSh0aGlzLnBvcywgdGhpcy5wb3MgPSBNYXRoLm1pbih0aGlzLnBvcyArIGxlbiwgdGhpcy5sZW4pKVxuICAgICAgICA6IHRoaXMuYnVmLnRvU3RyaW5nKFwidXRmLThcIiwgdGhpcy5wb3MsIHRoaXMucG9zID0gTWF0aC5taW4odGhpcy5wb3MgKyBsZW4sIHRoaXMubGVuKSk7XG59O1xuXG4vKipcbiAqIFJlYWRzIGEgc2VxdWVuY2Ugb2YgYnl0ZXMgcHJlY2VlZGVkIGJ5IGl0cyBsZW5ndGggYXMgYSB2YXJpbnQuXG4gKiBAbmFtZSBCdWZmZXJSZWFkZXIjYnl0ZXNcbiAqIEBmdW5jdGlvblxuICogQHJldHVybnMge0J1ZmZlcn0gVmFsdWUgcmVhZFxuICovXG5cbkJ1ZmZlclJlYWRlci5fY29uZmlndXJlKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0ge307XG5cbi8qKlxuICogTmFtZWQgcm9vdHMuXG4gKiBUaGlzIGlzIHdoZXJlIHBianMgc3RvcmVzIGdlbmVyYXRlZCBzdHJ1Y3R1cmVzICh0aGUgb3B0aW9uIGAtciwgLS1yb290YCBzcGVjaWZpZXMgYSBuYW1lKS5cbiAqIENhbiBhbHNvIGJlIHVzZWQgbWFudWFsbHkgdG8gbWFrZSByb290cyBhdmFpbGFibGUgYWNjcm9zcyBtb2R1bGVzLlxuICogQG5hbWUgcm9vdHNcbiAqIEB0eXBlIHtPYmplY3QuPHN0cmluZyxSb290Pn1cbiAqIEBleGFtcGxlXG4gKiAvLyBwYmpzIC1yIG15cm9vdCAtbyBjb21waWxlZC5qcyAuLi5cbiAqXG4gKiAvLyBpbiBhbm90aGVyIG1vZHVsZTpcbiAqIHJlcXVpcmUoXCIuL2NvbXBpbGVkLmpzXCIpO1xuICpcbiAqIC8vIGluIGFueSBzdWJzZXF1ZW50IG1vZHVsZTpcbiAqIHZhciByb290ID0gcHJvdG9idWYucm9vdHNbXCJteXJvb3RcIl07XG4gKi9cbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIFN0cmVhbWluZyBSUEMgaGVscGVycy5cbiAqIEBuYW1lc3BhY2VcbiAqL1xudmFyIHJwYyA9IGV4cG9ydHM7XG5cbi8qKlxuICogUlBDIGltcGxlbWVudGF0aW9uIHBhc3NlZCB0byB7QGxpbmsgU2VydmljZSNjcmVhdGV9IHBlcmZvcm1pbmcgYSBzZXJ2aWNlIHJlcXVlc3Qgb24gbmV0d29yayBsZXZlbCwgaS5lLiBieSB1dGlsaXppbmcgaHR0cCByZXF1ZXN0cyBvciB3ZWJzb2NrZXRzLlxuICogQHR5cGVkZWYgUlBDSW1wbFxuICogQHR5cGUge2Z1bmN0aW9ufVxuICogQHBhcmFtIHtNZXRob2R8cnBjLlNlcnZpY2VNZXRob2Q8TWVzc2FnZTx7fT4sTWVzc2FnZTx7fT4+fSBtZXRob2QgUmVmbGVjdGVkIG9yIHN0YXRpYyBtZXRob2QgYmVpbmcgY2FsbGVkXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IHJlcXVlc3REYXRhIFJlcXVlc3QgZGF0YVxuICogQHBhcmFtIHtSUENJbXBsQ2FsbGJhY2t9IGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICogQGV4YW1wbGVcbiAqIGZ1bmN0aW9uIHJwY0ltcGwobWV0aG9kLCByZXF1ZXN0RGF0YSwgY2FsbGJhY2spIHtcbiAqICAgICBpZiAocHJvdG9idWYudXRpbC5sY0ZpcnN0KG1ldGhvZC5uYW1lKSAhPT0gXCJteU1ldGhvZFwiKSAvLyBjb21wYXRpYmxlIHdpdGggc3RhdGljIGNvZGVcbiAqICAgICAgICAgdGhyb3cgRXJyb3IoXCJubyBzdWNoIG1ldGhvZFwiKTtcbiAqICAgICBhc3luY2hyb25vdXNseU9idGFpbkFSZXNwb25zZShyZXF1ZXN0RGF0YSwgZnVuY3Rpb24oZXJyLCByZXNwb25zZURhdGEpIHtcbiAqICAgICAgICAgY2FsbGJhY2soZXJyLCByZXNwb25zZURhdGEpO1xuICogICAgIH0pO1xuICogfVxuICovXG5cbi8qKlxuICogTm9kZS1zdHlsZSBjYWxsYmFjayBhcyB1c2VkIGJ5IHtAbGluayBSUENJbXBsfS5cbiAqIEB0eXBlZGVmIFJQQ0ltcGxDYWxsYmFja1xuICogQHR5cGUge2Z1bmN0aW9ufVxuICogQHBhcmFtIHtFcnJvcnxudWxsfSBlcnJvciBFcnJvciwgaWYgYW55LCBvdGhlcndpc2UgYG51bGxgXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl8bnVsbH0gW3Jlc3BvbnNlXSBSZXNwb25zZSBkYXRhIG9yIGBudWxsYCB0byBzaWduYWwgZW5kIG9mIHN0cmVhbSwgaWYgdGhlcmUgaGFzbid0IGJlZW4gYW4gZXJyb3JcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gKi9cblxucnBjLlNlcnZpY2UgPSByZXF1aXJlKFwiLi9ycGMvc2VydmljZVwiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBTZXJ2aWNlO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuLi91dGlsL21pbmltYWxcIik7XG5cbi8vIEV4dGVuZHMgRXZlbnRFbWl0dGVyXG4oU2VydmljZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHV0aWwuRXZlbnRFbWl0dGVyLnByb3RvdHlwZSkpLmNvbnN0cnVjdG9yID0gU2VydmljZTtcblxuLyoqXG4gKiBBIHNlcnZpY2UgbWV0aG9kIGNhbGxiYWNrIGFzIHVzZWQgYnkge0BsaW5rIHJwYy5TZXJ2aWNlTWV0aG9kfFNlcnZpY2VNZXRob2R9LlxuICpcbiAqIERpZmZlcnMgZnJvbSB7QGxpbmsgUlBDSW1wbENhbGxiYWNrfSBpbiB0aGF0IGl0IGlzIGFuIGFjdHVhbCBjYWxsYmFjayBvZiBhIHNlcnZpY2UgbWV0aG9kIHdoaWNoIG1heSBub3QgcmV0dXJuIGByZXNwb25zZSA9IG51bGxgLlxuICogQHR5cGVkZWYgcnBjLlNlcnZpY2VNZXRob2RDYWxsYmFja1xuICogQHRlbXBsYXRlIFRSZXMgZXh0ZW5kcyBNZXNzYWdlPFRSZXM+XG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKiBAcGFyYW0ge0Vycm9yfG51bGx9IGVycm9yIEVycm9yLCBpZiBhbnlcbiAqIEBwYXJhbSB7VFJlc30gW3Jlc3BvbnNlXSBSZXNwb25zZSBtZXNzYWdlXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICovXG5cbi8qKlxuICogQSBzZXJ2aWNlIG1ldGhvZCBwYXJ0IG9mIGEge0BsaW5rIHJwYy5TZXJ2aWNlfSBhcyBjcmVhdGVkIGJ5IHtAbGluayBTZXJ2aWNlLmNyZWF0ZX0uXG4gKiBAdHlwZWRlZiBycGMuU2VydmljZU1ldGhvZFxuICogQHRlbXBsYXRlIFRSZXEgZXh0ZW5kcyBNZXNzYWdlPFRSZXE+XG4gKiBAdGVtcGxhdGUgVFJlcyBleHRlbmRzIE1lc3NhZ2U8VFJlcz5cbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqIEBwYXJhbSB7VFJlcXxQcm9wZXJ0aWVzPFRSZXE+fSByZXF1ZXN0IFJlcXVlc3QgbWVzc2FnZSBvciBwbGFpbiBvYmplY3RcbiAqIEBwYXJhbSB7cnBjLlNlcnZpY2VNZXRob2RDYWxsYmFjazxUUmVzPn0gW2NhbGxiYWNrXSBOb2RlLXN0eWxlIGNhbGxiYWNrIGNhbGxlZCB3aXRoIHRoZSBlcnJvciwgaWYgYW55LCBhbmQgdGhlIHJlc3BvbnNlIG1lc3NhZ2VcbiAqIEByZXR1cm5zIHtQcm9taXNlPE1lc3NhZ2U8VFJlcz4+fSBQcm9taXNlIGlmIGBjYWxsYmFja2AgaGFzIGJlZW4gb21pdHRlZCwgb3RoZXJ3aXNlIGB1bmRlZmluZWRgXG4gKi9cblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IFJQQyBzZXJ2aWNlIGluc3RhbmNlLlxuICogQGNsYXNzZGVzYyBBbiBSUEMgc2VydmljZSBhcyByZXR1cm5lZCBieSB7QGxpbmsgU2VydmljZSNjcmVhdGV9LlxuICogQGV4cG9ydHMgcnBjLlNlcnZpY2VcbiAqIEBleHRlbmRzIHV0aWwuRXZlbnRFbWl0dGVyXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7UlBDSW1wbH0gcnBjSW1wbCBSUEMgaW1wbGVtZW50YXRpb25cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3JlcXVlc3REZWxpbWl0ZWQ9ZmFsc2VdIFdoZXRoZXIgcmVxdWVzdHMgYXJlIGxlbmd0aC1kZWxpbWl0ZWRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3Jlc3BvbnNlRGVsaW1pdGVkPWZhbHNlXSBXaGV0aGVyIHJlc3BvbnNlcyBhcmUgbGVuZ3RoLWRlbGltaXRlZFxuICovXG5mdW5jdGlvbiBTZXJ2aWNlKHJwY0ltcGwsIHJlcXVlc3REZWxpbWl0ZWQsIHJlc3BvbnNlRGVsaW1pdGVkKSB7XG5cbiAgICBpZiAodHlwZW9mIHJwY0ltcGwgIT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwicnBjSW1wbCBtdXN0IGJlIGEgZnVuY3Rpb25cIik7XG5cbiAgICB1dGlsLkV2ZW50RW1pdHRlci5jYWxsKHRoaXMpO1xuXG4gICAgLyoqXG4gICAgICogUlBDIGltcGxlbWVudGF0aW9uLiBCZWNvbWVzIGBudWxsYCBvbmNlIHRoZSBzZXJ2aWNlIGlzIGVuZGVkLlxuICAgICAqIEB0eXBlIHtSUENJbXBsfG51bGx9XG4gICAgICovXG4gICAgdGhpcy5ycGNJbXBsID0gcnBjSW1wbDtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgcmVxdWVzdHMgYXJlIGxlbmd0aC1kZWxpbWl0ZWQuXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5yZXF1ZXN0RGVsaW1pdGVkID0gQm9vbGVhbihyZXF1ZXN0RGVsaW1pdGVkKTtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgcmVzcG9uc2VzIGFyZSBsZW5ndGgtZGVsaW1pdGVkLlxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMucmVzcG9uc2VEZWxpbWl0ZWQgPSBCb29sZWFuKHJlc3BvbnNlRGVsaW1pdGVkKTtcbn1cblxuLyoqXG4gKiBDYWxscyBhIHNlcnZpY2UgbWV0aG9kIHRocm91Z2gge0BsaW5rIHJwYy5TZXJ2aWNlI3JwY0ltcGx8cnBjSW1wbH0uXG4gKiBAcGFyYW0ge01ldGhvZHxycGMuU2VydmljZU1ldGhvZDxUUmVxLFRSZXM+fSBtZXRob2QgUmVmbGVjdGVkIG9yIHN0YXRpYyBtZXRob2RcbiAqIEBwYXJhbSB7Q29uc3RydWN0b3I8VFJlcT59IHJlcXVlc3RDdG9yIFJlcXVlc3QgY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7Q29uc3RydWN0b3I8VFJlcz59IHJlc3BvbnNlQ3RvciBSZXNwb25zZSBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtUUmVxfFByb3BlcnRpZXM8VFJlcT59IHJlcXVlc3QgUmVxdWVzdCBtZXNzYWdlIG9yIHBsYWluIG9iamVjdFxuICogQHBhcmFtIHtycGMuU2VydmljZU1ldGhvZENhbGxiYWNrPFRSZXM+fSBjYWxsYmFjayBTZXJ2aWNlIGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICogQHRlbXBsYXRlIFRSZXEgZXh0ZW5kcyBNZXNzYWdlPFRSZXE+XG4gKiBAdGVtcGxhdGUgVFJlcyBleHRlbmRzIE1lc3NhZ2U8VFJlcz5cbiAqL1xuU2VydmljZS5wcm90b3R5cGUucnBjQ2FsbCA9IGZ1bmN0aW9uIHJwY0NhbGwobWV0aG9kLCByZXF1ZXN0Q3RvciwgcmVzcG9uc2VDdG9yLCByZXF1ZXN0LCBjYWxsYmFjaykge1xuXG4gICAgaWYgKCFyZXF1ZXN0KVxuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJyZXF1ZXN0IG11c3QgYmUgc3BlY2lmaWVkXCIpO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGlmICghY2FsbGJhY2spXG4gICAgICAgIHJldHVybiB1dGlsLmFzUHJvbWlzZShycGNDYWxsLCBzZWxmLCBtZXRob2QsIHJlcXVlc3RDdG9yLCByZXNwb25zZUN0b3IsIHJlcXVlc3QpO1xuXG4gICAgaWYgKCFzZWxmLnJwY0ltcGwpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgY2FsbGJhY2soRXJyb3IoXCJhbHJlYWR5IGVuZGVkXCIpKTsgfSwgMCk7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIHNlbGYucnBjSW1wbChcbiAgICAgICAgICAgIG1ldGhvZCxcbiAgICAgICAgICAgIHJlcXVlc3RDdG9yW3NlbGYucmVxdWVzdERlbGltaXRlZCA/IFwiZW5jb2RlRGVsaW1pdGVkXCIgOiBcImVuY29kZVwiXShyZXF1ZXN0KS5maW5pc2goKSxcbiAgICAgICAgICAgIGZ1bmN0aW9uIHJwY0NhbGxiYWNrKGVyciwgcmVzcG9uc2UpIHtcblxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lbWl0KFwiZXJyb3JcIiwgZXJyLCBtZXRob2QpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lbmQoLyogZW5kZWRCeVJQQyAqLyB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIShyZXNwb25zZSBpbnN0YW5jZW9mIHJlc3BvbnNlQ3RvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gcmVzcG9uc2VDdG9yW3NlbGYucmVzcG9uc2VEZWxpbWl0ZWQgPyBcImRlY29kZURlbGltaXRlZFwiIDogXCJkZWNvZGVcIl0ocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZW1pdChcImVycm9yXCIsIGVyciwgbWV0aG9kKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2VsZi5lbWl0KFwiZGF0YVwiLCByZXNwb25zZSwgbWV0aG9kKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBzZWxmLmVtaXQoXCJlcnJvclwiLCBlcnIsIG1ldGhvZCk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IGNhbGxiYWNrKGVycik7IH0sIDApO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbn07XG5cbi8qKlxuICogRW5kcyB0aGlzIHNlcnZpY2UgYW5kIGVtaXRzIHRoZSBgZW5kYCBldmVudC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2VuZGVkQnlSUEM9ZmFsc2VdIFdoZXRoZXIgdGhlIHNlcnZpY2UgaGFzIGJlZW4gZW5kZWQgYnkgdGhlIFJQQyBpbXBsZW1lbnRhdGlvbi5cbiAqIEByZXR1cm5zIHtycGMuU2VydmljZX0gYHRoaXNgXG4gKi9cblNlcnZpY2UucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uIGVuZChlbmRlZEJ5UlBDKSB7XG4gICAgaWYgKHRoaXMucnBjSW1wbCkge1xuICAgICAgICBpZiAoIWVuZGVkQnlSUEMpIC8vIHNpZ25hbCBlbmQgdG8gcnBjSW1wbFxuICAgICAgICAgICAgdGhpcy5ycGNJbXBsKG51bGwsIG51bGwsIG51bGwpO1xuICAgICAgICB0aGlzLnJwY0ltcGwgPSBudWxsO1xuICAgICAgICB0aGlzLmVtaXQoXCJlbmRcIikub2ZmKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBMb25nQml0cztcblxudmFyIHV0aWwgPSByZXF1aXJlKFwiLi4vdXRpbC9taW5pbWFsXCIpO1xuXG4vKipcbiAqIENvbnN0cnVjdHMgbmV3IGxvbmcgYml0cy5cbiAqIEBjbGFzc2Rlc2MgSGVscGVyIGNsYXNzIGZvciB3b3JraW5nIHdpdGggdGhlIGxvdyBhbmQgaGlnaCBiaXRzIG9mIGEgNjQgYml0IHZhbHVlLlxuICogQG1lbWJlcm9mIHV0aWxcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtudW1iZXJ9IGxvIExvdyAzMiBiaXRzLCB1bnNpZ25lZFxuICogQHBhcmFtIHtudW1iZXJ9IGhpIEhpZ2ggMzIgYml0cywgdW5zaWduZWRcbiAqL1xuZnVuY3Rpb24gTG9uZ0JpdHMobG8sIGhpKSB7XG5cbiAgICAvLyBub3RlIHRoYXQgdGhlIGNhc3RzIGJlbG93IGFyZSB0aGVvcmV0aWNhbGx5IHVubmVjZXNzYXJ5IGFzIG9mIHRvZGF5LCBidXQgb2xkZXIgc3RhdGljYWxseVxuICAgIC8vIGdlbmVyYXRlZCBjb252ZXJ0ZXIgY29kZSBtaWdodCBzdGlsbCBjYWxsIHRoZSBjdG9yIHdpdGggc2lnbmVkIDMyYml0cy4ga2VwdCBmb3IgY29tcGF0LlxuXG4gICAgLyoqXG4gICAgICogTG93IGJpdHMuXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLmxvID0gbG8gPj4+IDA7XG5cbiAgICAvKipcbiAgICAgKiBIaWdoIGJpdHMuXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLmhpID0gaGkgPj4+IDA7XG59XG5cbi8qKlxuICogWmVybyBiaXRzLlxuICogQG1lbWJlcm9mIHV0aWwuTG9uZ0JpdHNcbiAqIEB0eXBlIHt1dGlsLkxvbmdCaXRzfVxuICovXG52YXIgemVybyA9IExvbmdCaXRzLnplcm8gPSBuZXcgTG9uZ0JpdHMoMCwgMCk7XG5cbnplcm8udG9OdW1iZXIgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG56ZXJvLnp6RW5jb2RlID0gemVyby56ekRlY29kZSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfTtcbnplcm8ubGVuZ3RoID0gZnVuY3Rpb24oKSB7IHJldHVybiAxOyB9O1xuXG4vKipcbiAqIFplcm8gaGFzaC5cbiAqIEBtZW1iZXJvZiB1dGlsLkxvbmdCaXRzXG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG52YXIgemVyb0hhc2ggPSBMb25nQml0cy56ZXJvSGFzaCA9IFwiXFwwXFwwXFwwXFwwXFwwXFwwXFwwXFwwXCI7XG5cbi8qKlxuICogQ29uc3RydWN0cyBuZXcgbG9uZyBiaXRzIGZyb20gdGhlIHNwZWNpZmllZCBudW1iZXIuXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWVcbiAqIEByZXR1cm5zIHt1dGlsLkxvbmdCaXRzfSBJbnN0YW5jZVxuICovXG5Mb25nQml0cy5mcm9tTnVtYmVyID0gZnVuY3Rpb24gZnJvbU51bWJlcih2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gMClcbiAgICAgICAgcmV0dXJuIHplcm87XG4gICAgdmFyIHNpZ24gPSB2YWx1ZSA8IDA7XG4gICAgaWYgKHNpZ24pXG4gICAgICAgIHZhbHVlID0gLXZhbHVlO1xuICAgIHZhciBsbyA9IHZhbHVlID4+PiAwLFxuICAgICAgICBoaSA9ICh2YWx1ZSAtIGxvKSAvIDQyOTQ5NjcyOTYgPj4+IDA7XG4gICAgaWYgKHNpZ24pIHtcbiAgICAgICAgaGkgPSB+aGkgPj4+IDA7XG4gICAgICAgIGxvID0gfmxvID4+PiAwO1xuICAgICAgICBpZiAoKytsbyA+IDQyOTQ5NjcyOTUpIHtcbiAgICAgICAgICAgIGxvID0gMDtcbiAgICAgICAgICAgIGlmICgrK2hpID4gNDI5NDk2NzI5NSlcbiAgICAgICAgICAgICAgICBoaSA9IDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ldyBMb25nQml0cyhsbywgaGkpO1xufTtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIG5ldyBsb25nIGJpdHMgZnJvbSBhIG51bWJlciwgbG9uZyBvciBzdHJpbmcuXG4gKiBAcGFyYW0ge0xvbmd8bnVtYmVyfHN0cmluZ30gdmFsdWUgVmFsdWVcbiAqIEByZXR1cm5zIHt1dGlsLkxvbmdCaXRzfSBJbnN0YW5jZVxuICovXG5Mb25nQml0cy5mcm9tID0gZnVuY3Rpb24gZnJvbSh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpXG4gICAgICAgIHJldHVybiBMb25nQml0cy5mcm9tTnVtYmVyKHZhbHVlKTtcbiAgICBpZiAodXRpbC5pc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgaWYgKHV0aWwuTG9uZylcbiAgICAgICAgICAgIHZhbHVlID0gdXRpbC5Mb25nLmZyb21TdHJpbmcodmFsdWUpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gTG9uZ0JpdHMuZnJvbU51bWJlcihwYXJzZUludCh2YWx1ZSwgMTApKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlLmxvdyB8fCB2YWx1ZS5oaWdoID8gbmV3IExvbmdCaXRzKHZhbHVlLmxvdyA+Pj4gMCwgdmFsdWUuaGlnaCA+Pj4gMCkgOiB6ZXJvO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyB0aGlzIGxvbmcgYml0cyB0byBhIHBvc3NpYmx5IHVuc2FmZSBKYXZhU2NyaXB0IG51bWJlci5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3Vuc2lnbmVkPWZhbHNlXSBXaGV0aGVyIHVuc2lnbmVkIG9yIG5vdFxuICogQHJldHVybnMge251bWJlcn0gUG9zc2libHkgdW5zYWZlIG51bWJlclxuICovXG5Mb25nQml0cy5wcm90b3R5cGUudG9OdW1iZXIgPSBmdW5jdGlvbiB0b051bWJlcih1bnNpZ25lZCkge1xuICAgIGlmICghdW5zaWduZWQgJiYgdGhpcy5oaSA+Pj4gMzEpIHtcbiAgICAgICAgdmFyIGxvID0gfnRoaXMubG8gKyAxID4+PiAwLFxuICAgICAgICAgICAgaGkgPSB+dGhpcy5oaSAgICAgPj4+IDA7XG4gICAgICAgIGlmICghbG8pXG4gICAgICAgICAgICBoaSA9IGhpICsgMSA+Pj4gMDtcbiAgICAgICAgcmV0dXJuIC0obG8gKyBoaSAqIDQyOTQ5NjcyOTYpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5sbyArIHRoaXMuaGkgKiA0Mjk0OTY3Mjk2O1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyB0aGlzIGxvbmcgYml0cyB0byBhIGxvbmcuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFt1bnNpZ25lZD1mYWxzZV0gV2hldGhlciB1bnNpZ25lZCBvciBub3RcbiAqIEByZXR1cm5zIHtMb25nfSBMb25nXG4gKi9cbkxvbmdCaXRzLnByb3RvdHlwZS50b0xvbmcgPSBmdW5jdGlvbiB0b0xvbmcodW5zaWduZWQpIHtcbiAgICByZXR1cm4gdXRpbC5Mb25nXG4gICAgICAgID8gbmV3IHV0aWwuTG9uZyh0aGlzLmxvIHwgMCwgdGhpcy5oaSB8IDAsIEJvb2xlYW4odW5zaWduZWQpKVxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICA6IHsgbG93OiB0aGlzLmxvIHwgMCwgaGlnaDogdGhpcy5oaSB8IDAsIHVuc2lnbmVkOiBCb29sZWFuKHVuc2lnbmVkKSB9O1xufTtcblxudmFyIGNoYXJDb2RlQXQgPSBTdHJpbmcucHJvdG90eXBlLmNoYXJDb2RlQXQ7XG5cbi8qKlxuICogQ29uc3RydWN0cyBuZXcgbG9uZyBiaXRzIGZyb20gdGhlIHNwZWNpZmllZCA4IGNoYXJhY3RlcnMgbG9uZyBoYXNoLlxuICogQHBhcmFtIHtzdHJpbmd9IGhhc2ggSGFzaFxuICogQHJldHVybnMge3V0aWwuTG9uZ0JpdHN9IEJpdHNcbiAqL1xuTG9uZ0JpdHMuZnJvbUhhc2ggPSBmdW5jdGlvbiBmcm9tSGFzaChoYXNoKSB7XG4gICAgaWYgKGhhc2ggPT09IHplcm9IYXNoKVxuICAgICAgICByZXR1cm4gemVybztcbiAgICByZXR1cm4gbmV3IExvbmdCaXRzKFxuICAgICAgICAoIGNoYXJDb2RlQXQuY2FsbChoYXNoLCAwKVxuICAgICAgICB8IGNoYXJDb2RlQXQuY2FsbChoYXNoLCAxKSA8PCA4XG4gICAgICAgIHwgY2hhckNvZGVBdC5jYWxsKGhhc2gsIDIpIDw8IDE2XG4gICAgICAgIHwgY2hhckNvZGVBdC5jYWxsKGhhc2gsIDMpIDw8IDI0KSA+Pj4gMFxuICAgICxcbiAgICAgICAgKCBjaGFyQ29kZUF0LmNhbGwoaGFzaCwgNClcbiAgICAgICAgfCBjaGFyQ29kZUF0LmNhbGwoaGFzaCwgNSkgPDwgOFxuICAgICAgICB8IGNoYXJDb2RlQXQuY2FsbChoYXNoLCA2KSA8PCAxNlxuICAgICAgICB8IGNoYXJDb2RlQXQuY2FsbChoYXNoLCA3KSA8PCAyNCkgPj4+IDBcbiAgICApO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyB0aGlzIGxvbmcgYml0cyB0byBhIDggY2hhcmFjdGVycyBsb25nIGhhc2guXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBIYXNoXG4gKi9cbkxvbmdCaXRzLnByb3RvdHlwZS50b0hhc2ggPSBmdW5jdGlvbiB0b0hhc2goKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoXG4gICAgICAgIHRoaXMubG8gICAgICAgICYgMjU1LFxuICAgICAgICB0aGlzLmxvID4+PiA4ICAmIDI1NSxcbiAgICAgICAgdGhpcy5sbyA+Pj4gMTYgJiAyNTUsXG4gICAgICAgIHRoaXMubG8gPj4+IDI0ICAgICAgLFxuICAgICAgICB0aGlzLmhpICAgICAgICAmIDI1NSxcbiAgICAgICAgdGhpcy5oaSA+Pj4gOCAgJiAyNTUsXG4gICAgICAgIHRoaXMuaGkgPj4+IDE2ICYgMjU1LFxuICAgICAgICB0aGlzLmhpID4+PiAyNFxuICAgICk7XG59O1xuXG4vKipcbiAqIFppZy16YWcgZW5jb2RlcyB0aGlzIGxvbmcgYml0cy5cbiAqIEByZXR1cm5zIHt1dGlsLkxvbmdCaXRzfSBgdGhpc2BcbiAqL1xuTG9uZ0JpdHMucHJvdG90eXBlLnp6RW5jb2RlID0gZnVuY3Rpb24genpFbmNvZGUoKSB7XG4gICAgdmFyIG1hc2sgPSAgIHRoaXMuaGkgPj4gMzE7XG4gICAgdGhpcy5oaSAgPSAoKHRoaXMuaGkgPDwgMSB8IHRoaXMubG8gPj4+IDMxKSBeIG1hc2spID4+PiAwO1xuICAgIHRoaXMubG8gID0gKCB0aGlzLmxvIDw8IDEgICAgICAgICAgICAgICAgICAgXiBtYXNrKSA+Pj4gMDtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogWmlnLXphZyBkZWNvZGVzIHRoaXMgbG9uZyBiaXRzLlxuICogQHJldHVybnMge3V0aWwuTG9uZ0JpdHN9IGB0aGlzYFxuICovXG5Mb25nQml0cy5wcm90b3R5cGUuenpEZWNvZGUgPSBmdW5jdGlvbiB6ekRlY29kZSgpIHtcbiAgICB2YXIgbWFzayA9IC0odGhpcy5sbyAmIDEpO1xuICAgIHRoaXMubG8gID0gKCh0aGlzLmxvID4+PiAxIHwgdGhpcy5oaSA8PCAzMSkgXiBtYXNrKSA+Pj4gMDtcbiAgICB0aGlzLmhpICA9ICggdGhpcy5oaSA+Pj4gMSAgICAgICAgICAgICAgICAgIF4gbWFzaykgPj4+IDA7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGxlbmd0aCBvZiB0aGlzIGxvbmdiaXRzIHdoZW4gZW5jb2RlZCBhcyBhIHZhcmludC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IExlbmd0aFxuICovXG5Mb25nQml0cy5wcm90b3R5cGUubGVuZ3RoID0gZnVuY3Rpb24gbGVuZ3RoKCkge1xuICAgIHZhciBwYXJ0MCA9ICB0aGlzLmxvLFxuICAgICAgICBwYXJ0MSA9ICh0aGlzLmxvID4+PiAyOCB8IHRoaXMuaGkgPDwgNCkgPj4+IDAsXG4gICAgICAgIHBhcnQyID0gIHRoaXMuaGkgPj4+IDI0O1xuICAgIHJldHVybiBwYXJ0MiA9PT0gMFxuICAgICAgICAgPyBwYXJ0MSA9PT0gMFxuICAgICAgICAgICA/IHBhcnQwIDwgMTYzODRcbiAgICAgICAgICAgICA/IHBhcnQwIDwgMTI4ID8gMSA6IDJcbiAgICAgICAgICAgICA6IHBhcnQwIDwgMjA5NzE1MiA/IDMgOiA0XG4gICAgICAgICAgIDogcGFydDEgPCAxNjM4NFxuICAgICAgICAgICAgID8gcGFydDEgPCAxMjggPyA1IDogNlxuICAgICAgICAgICAgIDogcGFydDEgPCAyMDk3MTUyID8gNyA6IDhcbiAgICAgICAgIDogcGFydDIgPCAxMjggPyA5IDogMTA7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgdXRpbCA9IGV4cG9ydHM7XG5cbi8vIHVzZWQgdG8gcmV0dXJuIGEgUHJvbWlzZSB3aGVyZSBjYWxsYmFjayBpcyBvbWl0dGVkXG51dGlsLmFzUHJvbWlzZSA9IHJlcXVpcmUoXCJAcHJvdG9idWZqcy9hc3Byb21pc2VcIik7XG5cbi8vIGNvbnZlcnRzIHRvIC8gZnJvbSBiYXNlNjQgZW5jb2RlZCBzdHJpbmdzXG51dGlsLmJhc2U2NCA9IHJlcXVpcmUoXCJAcHJvdG9idWZqcy9iYXNlNjRcIik7XG5cbi8vIGJhc2UgY2xhc3Mgb2YgcnBjLlNlcnZpY2VcbnV0aWwuRXZlbnRFbWl0dGVyID0gcmVxdWlyZShcIkBwcm90b2J1ZmpzL2V2ZW50ZW1pdHRlclwiKTtcblxuLy8gZmxvYXQgaGFuZGxpbmcgYWNjcm9zcyBicm93c2Vyc1xudXRpbC5mbG9hdCA9IHJlcXVpcmUoXCJAcHJvdG9idWZqcy9mbG9hdFwiKTtcblxuLy8gcmVxdWlyZXMgbW9kdWxlcyBvcHRpb25hbGx5IGFuZCBoaWRlcyB0aGUgY2FsbCBmcm9tIGJ1bmRsZXJzXG51dGlsLmlucXVpcmUgPSByZXF1aXJlKFwiQHByb3RvYnVmanMvaW5xdWlyZVwiKTtcblxuLy8gY29udmVydHMgdG8gLyBmcm9tIHV0ZjggZW5jb2RlZCBzdHJpbmdzXG51dGlsLnV0ZjggPSByZXF1aXJlKFwiQHByb3RvYnVmanMvdXRmOFwiKTtcblxuLy8gcHJvdmlkZXMgYSBub2RlLWxpa2UgYnVmZmVyIHBvb2wgaW4gdGhlIGJyb3dzZXJcbnV0aWwucG9vbCA9IHJlcXVpcmUoXCJAcHJvdG9idWZqcy9wb29sXCIpO1xuXG4vLyB1dGlsaXR5IHRvIHdvcmsgd2l0aCB0aGUgbG93IGFuZCBoaWdoIGJpdHMgb2YgYSA2NCBiaXQgdmFsdWVcbnV0aWwuTG9uZ0JpdHMgPSByZXF1aXJlKFwiLi9sb25nYml0c1wiKTtcblxuLyoqXG4gKiBXaGV0aGVyIHJ1bm5pbmcgd2l0aGluIG5vZGUgb3Igbm90LlxuICogQG1lbWJlcm9mIHV0aWxcbiAqIEB0eXBlIHtib29sZWFufVxuICovXG51dGlsLmlzTm9kZSA9IEJvb2xlYW4odHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIlxuICAgICAgICAgICAgICAgICAgICYmIGdsb2JhbFxuICAgICAgICAgICAgICAgICAgICYmIGdsb2JhbC5wcm9jZXNzXG4gICAgICAgICAgICAgICAgICAgJiYgZ2xvYmFsLnByb2Nlc3MudmVyc2lvbnNcbiAgICAgICAgICAgICAgICAgICAmJiBnbG9iYWwucHJvY2Vzcy52ZXJzaW9ucy5ub2RlKTtcblxuLyoqXG4gKiBHbG9iYWwgb2JqZWN0IHJlZmVyZW5jZS5cbiAqIEBtZW1iZXJvZiB1dGlsXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG51dGlsLmdsb2JhbCA9IHV0aWwuaXNOb2RlICYmIGdsb2JhbFxuICAgICAgICAgICB8fCB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvd1xuICAgICAgICAgICB8fCB0eXBlb2Ygc2VsZiAgICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGZcbiAgICAgICAgICAgfHwgdGhpczsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1pbnZhbGlkLXRoaXNcblxuLyoqXG4gKiBBbiBpbW11YWJsZSBlbXB0eSBhcnJheS5cbiAqIEBtZW1iZXJvZiB1dGlsXG4gKiBAdHlwZSB7QXJyYXkuPCo+fVxuICogQGNvbnN0XG4gKi9cbnV0aWwuZW1wdHlBcnJheSA9IE9iamVjdC5mcmVlemUgPyBPYmplY3QuZnJlZXplKFtdKSA6IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIFtdOyAvLyB1c2VkIG9uIHByb3RvdHlwZXNcblxuLyoqXG4gKiBBbiBpbW11dGFibGUgZW1wdHkgb2JqZWN0LlxuICogQHR5cGUge09iamVjdH1cbiAqIEBjb25zdFxuICovXG51dGlsLmVtcHR5T2JqZWN0ID0gT2JqZWN0LmZyZWV6ZSA/IE9iamVjdC5mcmVlemUoe30pIDogLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8ge307IC8vIHVzZWQgb24gcHJvdG90eXBlc1xuXG4vKipcbiAqIFRlc3RzIGlmIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHsqfSB2YWx1ZSBWYWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHRoZSB2YWx1ZSBpcyBhbiBpbnRlZ2VyXG4gKi9cbnV0aWwuaXNJbnRlZ2VyID0gTnVtYmVyLmlzSW50ZWdlciB8fCAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyBmdW5jdGlvbiBpc0ludGVnZXIodmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiICYmIGlzRmluaXRlKHZhbHVlKSAmJiBNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWU7XG59O1xuXG4vKipcbiAqIFRlc3RzIGlmIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nXG4gKi9cbnV0aWwuaXNTdHJpbmcgPSBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgfHwgdmFsdWUgaW5zdGFuY2VvZiBTdHJpbmc7XG59O1xuXG4vKipcbiAqIFRlc3RzIGlmIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgYSBub24tbnVsbCBvYmplY3QuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgdGhlIHZhbHVlIGlzIGEgbm9uLW51bGwgb2JqZWN0XG4gKi9cbnV0aWwuaXNPYmplY3QgPSBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCI7XG59O1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIHByb3BlcnR5IG9uIGEgbWVzc2FnZSBpcyBjb25zaWRlcmVkIHRvIGJlIHByZXNlbnQuXG4gKiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayB1dGlsLmlzU2V0fS5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBQbGFpbiBvYmplY3Qgb3IgbWVzc2FnZSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IHByb3AgUHJvcGVydHkgbmFtZVxuICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiBjb25zaWRlcmVkIHRvIGJlIHByZXNlbnQsIG90aGVyd2lzZSBgZmFsc2VgXG4gKi9cbnV0aWwuaXNzZXQgPVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIHByb3BlcnR5IG9uIGEgbWVzc2FnZSBpcyBjb25zaWRlcmVkIHRvIGJlIHByZXNlbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFBsYWluIG9iamVjdCBvciBtZXNzYWdlIGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcCBQcm9wZXJ0eSBuYW1lXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIGNvbnNpZGVyZWQgdG8gYmUgcHJlc2VudCwgb3RoZXJ3aXNlIGBmYWxzZWBcbiAqL1xudXRpbC5pc1NldCA9IGZ1bmN0aW9uIGlzU2V0KG9iaiwgcHJvcCkge1xuICAgIHZhciB2YWx1ZSA9IG9ialtwcm9wXTtcbiAgICBpZiAodmFsdWUgIT0gbnVsbCAmJiBvYmouaGFzT3duUHJvcGVydHkocHJvcCkpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZXFlcWVxLCBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiB8fCAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5sZW5ndGggOiBPYmplY3Qua2V5cyh2YWx1ZSkubGVuZ3RoKSA+IDA7XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBBbnkgY29tcGF0aWJsZSBCdWZmZXIgaW5zdGFuY2UuXG4gKiBUaGlzIGlzIGEgbWluaW1hbCBzdGFuZC1hbG9uZSBkZWZpbml0aW9uIG9mIGEgQnVmZmVyIGluc3RhbmNlLiBUaGUgYWN0dWFsIHR5cGUgaXMgdGhhdCBleHBvcnRlZCBieSBub2RlJ3MgdHlwaW5ncy5cbiAqIEBpbnRlcmZhY2UgQnVmZmVyXG4gKiBAZXh0ZW5kcyBVaW50OEFycmF5XG4gKi9cblxuLyoqXG4gKiBOb2RlJ3MgQnVmZmVyIGNsYXNzIGlmIGF2YWlsYWJsZS5cbiAqIEB0eXBlIHtDb25zdHJ1Y3RvcjxCdWZmZXI+fVxuICovXG51dGlsLkJ1ZmZlciA9IChmdW5jdGlvbigpIHtcbiAgICB0cnkge1xuICAgICAgICB2YXIgQnVmZmVyID0gdXRpbC5pbnF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcjtcbiAgICAgICAgLy8gcmVmdXNlIHRvIHVzZSBub24tbm9kZSBidWZmZXJzIGlmIG5vdCBleHBsaWNpdGx5IGFzc2lnbmVkIChwZXJmIHJlYXNvbnMpOlxuICAgICAgICByZXR1cm4gQnVmZmVyLnByb3RvdHlwZS51dGY4V3JpdGUgPyBCdWZmZXIgOiAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyBudWxsO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufSkoKTtcblxuLy8gSW50ZXJuYWwgYWxpYXMgb2Ygb3IgcG9seWZ1bGwgZm9yIEJ1ZmZlci5mcm9tLlxudXRpbC5fQnVmZmVyX2Zyb20gPSBudWxsO1xuXG4vLyBJbnRlcm5hbCBhbGlhcyBvZiBvciBwb2x5ZmlsbCBmb3IgQnVmZmVyLmFsbG9jVW5zYWZlLlxudXRpbC5fQnVmZmVyX2FsbG9jVW5zYWZlID0gbnVsbDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGJ1ZmZlciBvZiB3aGF0ZXZlciB0eXBlIHN1cHBvcnRlZCBieSB0aGUgZW52aXJvbm1lbnQuXG4gKiBAcGFyYW0ge251bWJlcnxudW1iZXJbXX0gW3NpemVPckFycmF5PTBdIEJ1ZmZlciBzaXplIG9yIG51bWJlciBhcnJheVxuICogQHJldHVybnMge1VpbnQ4QXJyYXl8QnVmZmVyfSBCdWZmZXJcbiAqL1xudXRpbC5uZXdCdWZmZXIgPSBmdW5jdGlvbiBuZXdCdWZmZXIoc2l6ZU9yQXJyYXkpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIHJldHVybiB0eXBlb2Ygc2l6ZU9yQXJyYXkgPT09IFwibnVtYmVyXCJcbiAgICAgICAgPyB1dGlsLkJ1ZmZlclxuICAgICAgICAgICAgPyB1dGlsLl9CdWZmZXJfYWxsb2NVbnNhZmUoc2l6ZU9yQXJyYXkpXG4gICAgICAgICAgICA6IG5ldyB1dGlsLkFycmF5KHNpemVPckFycmF5KVxuICAgICAgICA6IHV0aWwuQnVmZmVyXG4gICAgICAgICAgICA/IHV0aWwuX0J1ZmZlcl9mcm9tKHNpemVPckFycmF5KVxuICAgICAgICAgICAgOiB0eXBlb2YgVWludDhBcnJheSA9PT0gXCJ1bmRlZmluZWRcIlxuICAgICAgICAgICAgICAgID8gc2l6ZU9yQXJyYXlcbiAgICAgICAgICAgICAgICA6IG5ldyBVaW50OEFycmF5KHNpemVPckFycmF5KTtcbn07XG5cbi8qKlxuICogQXJyYXkgaW1wbGVtZW50YXRpb24gdXNlZCBpbiB0aGUgYnJvd3Nlci4gYFVpbnQ4QXJyYXlgIGlmIHN1cHBvcnRlZCwgb3RoZXJ3aXNlIGBBcnJheWAuXG4gKiBAdHlwZSB7Q29uc3RydWN0b3I8VWludDhBcnJheT59XG4gKi9cbnV0aWwuQXJyYXkgPSB0eXBlb2YgVWludDhBcnJheSAhPT0gXCJ1bmRlZmluZWRcIiA/IFVpbnQ4QXJyYXkgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gOiBBcnJheTtcblxuLyoqXG4gKiBBbnkgY29tcGF0aWJsZSBMb25nIGluc3RhbmNlLlxuICogVGhpcyBpcyBhIG1pbmltYWwgc3RhbmQtYWxvbmUgZGVmaW5pdGlvbiBvZiBhIExvbmcgaW5zdGFuY2UuIFRoZSBhY3R1YWwgdHlwZSBpcyB0aGF0IGV4cG9ydGVkIGJ5IGxvbmcuanMuXG4gKiBAaW50ZXJmYWNlIExvbmdcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBsb3cgTG93IGJpdHNcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBoaWdoIEhpZ2ggYml0c1xuICogQHByb3BlcnR5IHtib29sZWFufSB1bnNpZ25lZCBXaGV0aGVyIHVuc2lnbmVkIG9yIG5vdFxuICovXG5cbi8qKlxuICogTG9uZy5qcydzIExvbmcgY2xhc3MgaWYgYXZhaWxhYmxlLlxuICogQHR5cGUge0NvbnN0cnVjdG9yPExvbmc+fVxuICovXG51dGlsLkxvbmcgPSAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyB1dGlsLmdsb2JhbC5kY29kZUlPICYmIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIHV0aWwuZ2xvYmFsLmRjb2RlSU8uTG9uZ1xuICAgICAgICAgfHwgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gdXRpbC5nbG9iYWwuTG9uZ1xuICAgICAgICAgfHwgdXRpbC5pbnF1aXJlKFwibG9uZ1wiKTtcblxuLyoqXG4gKiBSZWd1bGFyIGV4cHJlc3Npb24gdXNlZCB0byB2ZXJpZnkgMiBiaXQgKGBib29sYCkgbWFwIGtleXMuXG4gKiBAdHlwZSB7UmVnRXhwfVxuICogQGNvbnN0XG4gKi9cbnV0aWwua2V5MlJlID0gL150cnVlfGZhbHNlfDB8MSQvO1xuXG4vKipcbiAqIFJlZ3VsYXIgZXhwcmVzc2lvbiB1c2VkIHRvIHZlcmlmeSAzMiBiaXQgKGBpbnQzMmAgZXRjLikgbWFwIGtleXMuXG4gKiBAdHlwZSB7UmVnRXhwfVxuICogQGNvbnN0XG4gKi9cbnV0aWwua2V5MzJSZSA9IC9eLT8oPzowfFsxLTldWzAtOV0qKSQvO1xuXG4vKipcbiAqIFJlZ3VsYXIgZXhwcmVzc2lvbiB1c2VkIHRvIHZlcmlmeSA2NCBiaXQgKGBpbnQ2NGAgZXRjLikgbWFwIGtleXMuXG4gKiBAdHlwZSB7UmVnRXhwfVxuICogQGNvbnN0XG4gKi9cbnV0aWwua2V5NjRSZSA9IC9eKD86W1xcXFx4MDAtXFxcXHhmZl17OH18LT8oPzowfFsxLTldWzAtOV0qKSkkLztcblxuLyoqXG4gKiBDb252ZXJ0cyBhIG51bWJlciBvciBsb25nIHRvIGFuIDggY2hhcmFjdGVycyBsb25nIGhhc2ggc3RyaW5nLlxuICogQHBhcmFtIHtMb25nfG51bWJlcn0gdmFsdWUgVmFsdWUgdG8gY29udmVydFxuICogQHJldHVybnMge3N0cmluZ30gSGFzaFxuICovXG51dGlsLmxvbmdUb0hhc2ggPSBmdW5jdGlvbiBsb25nVG9IYXNoKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlXG4gICAgICAgID8gdXRpbC5Mb25nQml0cy5mcm9tKHZhbHVlKS50b0hhc2goKVxuICAgICAgICA6IHV0aWwuTG9uZ0JpdHMuemVyb0hhc2g7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIGFuIDggY2hhcmFjdGVycyBsb25nIGhhc2ggc3RyaW5nIHRvIGEgbG9uZyBvciBudW1iZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gaGFzaCBIYXNoXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFt1bnNpZ25lZD1mYWxzZV0gV2hldGhlciB1bnNpZ25lZCBvciBub3RcbiAqIEByZXR1cm5zIHtMb25nfG51bWJlcn0gT3JpZ2luYWwgdmFsdWVcbiAqL1xudXRpbC5sb25nRnJvbUhhc2ggPSBmdW5jdGlvbiBsb25nRnJvbUhhc2goaGFzaCwgdW5zaWduZWQpIHtcbiAgICB2YXIgYml0cyA9IHV0aWwuTG9uZ0JpdHMuZnJvbUhhc2goaGFzaCk7XG4gICAgaWYgKHV0aWwuTG9uZylcbiAgICAgICAgcmV0dXJuIHV0aWwuTG9uZy5mcm9tQml0cyhiaXRzLmxvLCBiaXRzLmhpLCB1bnNpZ25lZCk7XG4gICAgcmV0dXJuIGJpdHMudG9OdW1iZXIoQm9vbGVhbih1bnNpZ25lZCkpO1xufTtcblxuLyoqXG4gKiBNZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgdGhlIHNvdXJjZSBvYmplY3QgaW50byB0aGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQG1lbWJlcm9mIHV0aWxcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IGRzdCBEZXN0aW5hdGlvbiBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IHNyYyBTb3VyY2Ugb2JqZWN0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpZk5vdFNldD1mYWxzZV0gTWVyZ2VzIG9ubHkgaWYgdGhlIGtleSBpcyBub3QgYWxyZWFkeSBzZXRcbiAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gRGVzdGluYXRpb24gb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIG1lcmdlKGRzdCwgc3JjLCBpZk5vdFNldCkgeyAvLyB1c2VkIGJ5IGNvbnZlcnRlcnNcbiAgICBmb3IgKHZhciBrZXlzID0gT2JqZWN0LmtleXMoc3JjKSwgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKVxuICAgICAgICBpZiAoZHN0W2tleXNbaV1dID09PSB1bmRlZmluZWQgfHwgIWlmTm90U2V0KVxuICAgICAgICAgICAgZHN0W2tleXNbaV1dID0gc3JjW2tleXNbaV1dO1xuICAgIHJldHVybiBkc3Q7XG59XG5cbnV0aWwubWVyZ2UgPSBtZXJnZTtcblxuLyoqXG4gKiBDb252ZXJ0cyB0aGUgZmlyc3QgY2hhcmFjdGVyIG9mIGEgc3RyaW5nIHRvIGxvd2VyIGNhc2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIFN0cmluZyB0byBjb252ZXJ0XG4gKiBAcmV0dXJucyB7c3RyaW5nfSBDb252ZXJ0ZWQgc3RyaW5nXG4gKi9cbnV0aWwubGNGaXJzdCA9IGZ1bmN0aW9uIGxjRmlyc3Qoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIHN0ci5zdWJzdHJpbmcoMSk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBjdXN0b20gZXJyb3IgY29uc3RydWN0b3IuXG4gKiBAbWVtYmVyb2YgdXRpbFxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgRXJyb3IgbmFtZVxuICogQHJldHVybnMge0NvbnN0cnVjdG9yPEVycm9yPn0gQ3VzdG9tIGVycm9yIGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIG5ld0Vycm9yKG5hbWUpIHtcblxuICAgIGZ1bmN0aW9uIEN1c3RvbUVycm9yKG1lc3NhZ2UsIHByb3BlcnRpZXMpIHtcblxuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgQ3VzdG9tRXJyb3IpKVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBDdXN0b21FcnJvcihtZXNzYWdlLCBwcm9wZXJ0aWVzKTtcblxuICAgICAgICAvLyBFcnJvci5jYWxsKHRoaXMsIG1lc3NhZ2UpO1xuICAgICAgICAvLyBeIGp1c3QgcmV0dXJucyBhIG5ldyBlcnJvciBpbnN0YW5jZSBiZWNhdXNlIHRoZSBjdG9yIGNhbiBiZSBjYWxsZWQgYXMgYSBmdW5jdGlvblxuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcIm1lc3NhZ2VcIiwgeyBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbWVzc2FnZTsgfSB9KTtcblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIC8vIG5vZGVcbiAgICAgICAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIEN1c3RvbUVycm9yKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwic3RhY2tcIiwgeyB2YWx1ZTogbmV3IEVycm9yKCkuc3RhY2sgfHwgXCJcIiB9KTtcblxuICAgICAgICBpZiAocHJvcGVydGllcylcbiAgICAgICAgICAgIG1lcmdlKHRoaXMsIHByb3BlcnRpZXMpO1xuICAgIH1cblxuICAgIChDdXN0b21FcnJvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSkpLmNvbnN0cnVjdG9yID0gQ3VzdG9tRXJyb3I7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ3VzdG9tRXJyb3IucHJvdG90eXBlLCBcIm5hbWVcIiwgeyBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbmFtZTsgfSB9KTtcblxuICAgIEN1c3RvbUVycm9yLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lICsgXCI6IFwiICsgdGhpcy5tZXNzYWdlO1xuICAgIH07XG5cbiAgICByZXR1cm4gQ3VzdG9tRXJyb3I7XG59XG5cbnV0aWwubmV3RXJyb3IgPSBuZXdFcnJvcjtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IHByb3RvY29sIGVycm9yLlxuICogQGNsYXNzZGVzYyBFcnJvciBzdWJjbGFzcyBpbmRpY2F0aW5nIGEgcHJvdG9jb2wgc3BlY2lmYyBlcnJvci5cbiAqIEBtZW1iZXJvZiB1dGlsXG4gKiBAZXh0ZW5kcyBFcnJvclxuICogQHRlbXBsYXRlIFQgZXh0ZW5kcyBNZXNzYWdlPFQ+XG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIEVycm9yIG1lc3NhZ2VcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IFtwcm9wZXJ0aWVzXSBBZGRpdGlvbmFsIHByb3BlcnRpZXNcbiAqIEBleGFtcGxlXG4gKiB0cnkge1xuICogICAgIE15TWVzc2FnZS5kZWNvZGUoc29tZUJ1ZmZlcik7IC8vIHRocm93cyBpZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcbiAqIH0gY2F0Y2ggKGUpIHtcbiAqICAgICBpZiAoZSBpbnN0YW5jZW9mIFByb3RvY29sRXJyb3IgJiYgZS5pbnN0YW5jZSlcbiAqICAgICAgICAgY29uc29sZS5sb2coXCJkZWNvZGVkIHNvIGZhcjogXCIgKyBKU09OLnN0cmluZ2lmeShlLmluc3RhbmNlKSk7XG4gKiB9XG4gKi9cbnV0aWwuUHJvdG9jb2xFcnJvciA9IG5ld0Vycm9yKFwiUHJvdG9jb2xFcnJvclwiKTtcblxuLyoqXG4gKiBTbyBmYXIgZGVjb2RlZCBtZXNzYWdlIGluc3RhbmNlLlxuICogQG5hbWUgdXRpbC5Qcm90b2NvbEVycm9yI2luc3RhbmNlXG4gKiBAdHlwZSB7TWVzc2FnZTxUPn1cbiAqL1xuXG4vKipcbiAqIEEgT25lT2YgZ2V0dGVyIGFzIHJldHVybmVkIGJ5IHtAbGluayB1dGlsLm9uZU9mR2V0dGVyfS5cbiAqIEB0eXBlZGVmIE9uZU9mR2V0dGVyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKiBAcmV0dXJucyB7c3RyaW5nfHVuZGVmaW5lZH0gU2V0IGZpZWxkIG5hbWUsIGlmIGFueVxuICovXG5cbi8qKlxuICogQnVpbGRzIGEgZ2V0dGVyIGZvciBhIG9uZW9mJ3MgcHJlc2VudCBmaWVsZCBuYW1lLlxuICogQHBhcmFtIHtzdHJpbmdbXX0gZmllbGROYW1lcyBGaWVsZCBuYW1lc1xuICogQHJldHVybnMge09uZU9mR2V0dGVyfSBVbmJvdW5kIGdldHRlclxuICovXG51dGlsLm9uZU9mR2V0dGVyID0gZnVuY3Rpb24gZ2V0T25lT2YoZmllbGROYW1lcykge1xuICAgIHZhciBmaWVsZE1hcCA9IHt9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmllbGROYW1lcy5sZW5ndGg7ICsraSlcbiAgICAgICAgZmllbGRNYXBbZmllbGROYW1lc1tpXV0gPSAxO1xuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3N0cmluZ3x1bmRlZmluZWR9IFNldCBmaWVsZCBuYW1lLCBpZiBhbnlcbiAgICAgKiBAdGhpcyBPYmplY3RcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gICAgICAgIGZvciAodmFyIGtleXMgPSBPYmplY3Qua2V5cyh0aGlzKSwgaSA9IGtleXMubGVuZ3RoIC0gMTsgaSA+IC0xOyAtLWkpXG4gICAgICAgICAgICBpZiAoZmllbGRNYXBba2V5c1tpXV0gPT09IDEgJiYgdGhpc1trZXlzW2ldXSAhPT0gdW5kZWZpbmVkICYmIHRoaXNba2V5c1tpXV0gIT09IG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleXNbaV07XG4gICAgfTtcbn07XG5cbi8qKlxuICogQSBPbmVPZiBzZXR0ZXIgYXMgcmV0dXJuZWQgYnkge0BsaW5rIHV0aWwub25lT2ZTZXR0ZXJ9LlxuICogQHR5cGVkZWYgT25lT2ZTZXR0ZXJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqIEBwYXJhbSB7c3RyaW5nfHVuZGVmaW5lZH0gdmFsdWUgRmllbGQgbmFtZVxuICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAqL1xuXG4vKipcbiAqIEJ1aWxkcyBhIHNldHRlciBmb3IgYSBvbmVvZidzIHByZXNlbnQgZmllbGQgbmFtZS5cbiAqIEBwYXJhbSB7c3RyaW5nW119IGZpZWxkTmFtZXMgRmllbGQgbmFtZXNcbiAqIEByZXR1cm5zIHtPbmVPZlNldHRlcn0gVW5ib3VuZCBzZXR0ZXJcbiAqL1xudXRpbC5vbmVPZlNldHRlciA9IGZ1bmN0aW9uIHNldE9uZU9mKGZpZWxkTmFtZXMpIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIEZpZWxkIG5hbWVcbiAgICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICAgICAqIEB0aGlzIE9iamVjdFxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICByZXR1cm4gZnVuY3Rpb24obmFtZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpZWxkTmFtZXMubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICBpZiAoZmllbGROYW1lc1tpXSAhPT0gbmFtZSlcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpc1tmaWVsZE5hbWVzW2ldXTtcbiAgICB9O1xufTtcblxuLyoqXG4gKiBEZWZhdWx0IGNvbnZlcnNpb24gb3B0aW9ucyB1c2VkIGZvciB7QGxpbmsgTWVzc2FnZSN0b0pTT059IGltcGxlbWVudGF0aW9ucy5cbiAqXG4gKiBUaGVzZSBvcHRpb25zIGFyZSBjbG9zZSB0byBwcm90bzMncyBKU09OIG1hcHBpbmcgd2l0aCB0aGUgZXhjZXB0aW9uIHRoYXQgaW50ZXJuYWwgdHlwZXMgbGlrZSBBbnkgYXJlIGhhbmRsZWQganVzdCBsaWtlIG1lc3NhZ2VzLiBNb3JlIHByZWNpc2VseTpcbiAqXG4gKiAtIExvbmdzIGJlY29tZSBzdHJpbmdzXG4gKiAtIEVudW1zIGJlY29tZSBzdHJpbmcga2V5c1xuICogLSBCeXRlcyBiZWNvbWUgYmFzZTY0IGVuY29kZWQgc3RyaW5nc1xuICogLSAoU3ViLSlNZXNzYWdlcyBiZWNvbWUgcGxhaW4gb2JqZWN0c1xuICogLSBNYXBzIGJlY29tZSBwbGFpbiBvYmplY3RzIHdpdGggYWxsIHN0cmluZyBrZXlzXG4gKiAtIFJlcGVhdGVkIGZpZWxkcyBiZWNvbWUgYXJyYXlzXG4gKiAtIE5hTiBhbmQgSW5maW5pdHkgZm9yIGZsb2F0IGFuZCBkb3VibGUgZmllbGRzIGJlY29tZSBzdHJpbmdzXG4gKlxuICogQHR5cGUge0lDb252ZXJzaW9uT3B0aW9uc31cbiAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vcHJvdG9jb2wtYnVmZmVycy9kb2NzL3Byb3RvMz9obD1lbiNqc29uXG4gKi9cbnV0aWwudG9KU09OT3B0aW9ucyA9IHtcbiAgICBsb25nczogU3RyaW5nLFxuICAgIGVudW1zOiBTdHJpbmcsXG4gICAgYnl0ZXM6IFN0cmluZyxcbiAgICBqc29uOiB0cnVlXG59O1xuXG4vLyBTZXRzIHVwIGJ1ZmZlciB1dGlsaXR5IGFjY29yZGluZyB0byB0aGUgZW52aXJvbm1lbnQgKGNhbGxlZCBpbiBpbmRleC1taW5pbWFsKVxudXRpbC5fY29uZmlndXJlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIEJ1ZmZlciA9IHV0aWwuQnVmZmVyO1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICghQnVmZmVyKSB7XG4gICAgICAgIHV0aWwuX0J1ZmZlcl9mcm9tID0gdXRpbC5fQnVmZmVyX2FsbG9jVW5zYWZlID0gbnVsbDtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBiZWNhdXNlIG5vZGUgNC54IGJ1ZmZlcnMgYXJlIGluY29tcGF0aWJsZSAmIGltbXV0YWJsZVxuICAgIC8vIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL2Rjb2RlSU8vcHJvdG9idWYuanMvcHVsbC82NjVcbiAgICB1dGlsLl9CdWZmZXJfZnJvbSA9IEJ1ZmZlci5mcm9tICE9PSBVaW50OEFycmF5LmZyb20gJiYgQnVmZmVyLmZyb20gfHxcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgZnVuY3Rpb24gQnVmZmVyX2Zyb20odmFsdWUsIGVuY29kaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEJ1ZmZlcih2YWx1ZSwgZW5jb2RpbmcpO1xuICAgICAgICB9O1xuICAgIHV0aWwuX0J1ZmZlcl9hbGxvY1Vuc2FmZSA9IEJ1ZmZlci5hbGxvY1Vuc2FmZSB8fFxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBmdW5jdGlvbiBCdWZmZXJfYWxsb2NVbnNhZmUoc2l6ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBCdWZmZXIoc2l6ZSk7XG4gICAgICAgIH07XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IFdyaXRlcjtcblxudmFyIHV0aWwgICAgICA9IHJlcXVpcmUoXCIuL3V0aWwvbWluaW1hbFwiKTtcblxudmFyIEJ1ZmZlcldyaXRlcjsgLy8gY3ljbGljXG5cbnZhciBMb25nQml0cyAgPSB1dGlsLkxvbmdCaXRzLFxuICAgIGJhc2U2NCAgICA9IHV0aWwuYmFzZTY0LFxuICAgIHV0ZjggICAgICA9IHV0aWwudXRmODtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IHdyaXRlciBvcGVyYXRpb24gaW5zdGFuY2UuXG4gKiBAY2xhc3NkZXNjIFNjaGVkdWxlZCB3cml0ZXIgb3BlcmF0aW9uLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCosIFVpbnQ4QXJyYXksIG51bWJlcil9IGZuIEZ1bmN0aW9uIHRvIGNhbGxcbiAqIEBwYXJhbSB7bnVtYmVyfSBsZW4gVmFsdWUgYnl0ZSBsZW5ndGhcbiAqIEBwYXJhbSB7Kn0gdmFsIFZhbHVlIHRvIHdyaXRlXG4gKiBAaWdub3JlXG4gKi9cbmZ1bmN0aW9uIE9wKGZuLCBsZW4sIHZhbCkge1xuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gY2FsbC5cbiAgICAgKiBAdHlwZSB7ZnVuY3Rpb24oVWludDhBcnJheSwgbnVtYmVyLCAqKX1cbiAgICAgKi9cbiAgICB0aGlzLmZuID0gZm47XG5cbiAgICAvKipcbiAgICAgKiBWYWx1ZSBieXRlIGxlbmd0aC5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMubGVuID0gbGVuO1xuXG4gICAgLyoqXG4gICAgICogTmV4dCBvcGVyYXRpb24uXG4gICAgICogQHR5cGUge1dyaXRlci5PcHx1bmRlZmluZWR9XG4gICAgICovXG4gICAgdGhpcy5uZXh0ID0gdW5kZWZpbmVkO1xuXG4gICAgLyoqXG4gICAgICogVmFsdWUgdG8gd3JpdGUuXG4gICAgICogQHR5cGUgeyp9XG4gICAgICovXG4gICAgdGhpcy52YWwgPSB2YWw7IC8vIHR5cGUgdmFyaWVzXG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5mdW5jdGlvbiBub29wKCkge30gLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1lbXB0eS1mdW5jdGlvblxuXG4vKipcbiAqIENvbnN0cnVjdHMgYSBuZXcgd3JpdGVyIHN0YXRlIGluc3RhbmNlLlxuICogQGNsYXNzZGVzYyBDb3BpZWQgd3JpdGVyIHN0YXRlLlxuICogQG1lbWJlcm9mIFdyaXRlclxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge1dyaXRlcn0gd3JpdGVyIFdyaXRlciB0byBjb3B5IHN0YXRlIGZyb21cbiAqIEBpZ25vcmVcbiAqL1xuZnVuY3Rpb24gU3RhdGUod3JpdGVyKSB7XG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IGhlYWQuXG4gICAgICogQHR5cGUge1dyaXRlci5PcH1cbiAgICAgKi9cbiAgICB0aGlzLmhlYWQgPSB3cml0ZXIuaGVhZDtcblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgdGFpbC5cbiAgICAgKiBAdHlwZSB7V3JpdGVyLk9wfVxuICAgICAqL1xuICAgIHRoaXMudGFpbCA9IHdyaXRlci50YWlsO1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBidWZmZXIgbGVuZ3RoLlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5sZW4gPSB3cml0ZXIubGVuO1xuXG4gICAgLyoqXG4gICAgICogTmV4dCBzdGF0ZS5cbiAgICAgKiBAdHlwZSB7U3RhdGV8bnVsbH1cbiAgICAgKi9cbiAgICB0aGlzLm5leHQgPSB3cml0ZXIuc3RhdGVzO1xufVxuXG4vKipcbiAqIENvbnN0cnVjdHMgYSBuZXcgd3JpdGVyIGluc3RhbmNlLlxuICogQGNsYXNzZGVzYyBXaXJlIGZvcm1hdCB3cml0ZXIgdXNpbmcgYFVpbnQ4QXJyYXlgIGlmIGF2YWlsYWJsZSwgb3RoZXJ3aXNlIGBBcnJheWAuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gV3JpdGVyKCkge1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBsZW5ndGguXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLmxlbiA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBPcGVyYXRpb25zIGhlYWQuXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICB0aGlzLmhlYWQgPSBuZXcgT3Aobm9vcCwgMCwgMCk7XG5cbiAgICAvKipcbiAgICAgKiBPcGVyYXRpb25zIHRhaWxcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIHRoaXMudGFpbCA9IHRoaXMuaGVhZDtcblxuICAgIC8qKlxuICAgICAqIExpbmtlZCBmb3JrZWQgc3RhdGVzLlxuICAgICAqIEB0eXBlIHtPYmplY3R8bnVsbH1cbiAgICAgKi9cbiAgICB0aGlzLnN0YXRlcyA9IG51bGw7XG5cbiAgICAvLyBXaGVuIGEgdmFsdWUgaXMgd3JpdHRlbiwgdGhlIHdyaXRlciBjYWxjdWxhdGVzIGl0cyBieXRlIGxlbmd0aCBhbmQgcHV0cyBpdCBpbnRvIGEgbGlua2VkXG4gICAgLy8gbGlzdCBvZiBvcGVyYXRpb25zIHRvIHBlcmZvcm0gd2hlbiBmaW5pc2goKSBpcyBjYWxsZWQuIFRoaXMgYm90aCBhbGxvd3MgdXMgdG8gYWxsb2NhdGVcbiAgICAvLyBidWZmZXJzIG9mIHRoZSBleGFjdCByZXF1aXJlZCBzaXplIGFuZCByZWR1Y2VzIHRoZSBhbW91bnQgb2Ygd29yayB3ZSBoYXZlIHRvIGRvIGNvbXBhcmVkXG4gICAgLy8gdG8gZmlyc3QgY2FsY3VsYXRpbmcgb3ZlciBvYmplY3RzIGFuZCB0aGVuIGVuY29kaW5nIG92ZXIgb2JqZWN0cy4gSW4gb3VyIGNhc2UsIHRoZSBlbmNvZGluZ1xuICAgIC8vIHBhcnQgaXMganVzdCBhIGxpbmtlZCBsaXN0IHdhbGsgY2FsbGluZyBvcGVyYXRpb25zIHdpdGggYWxyZWFkeSBwcmVwYXJlZCB2YWx1ZXMuXG59XG5cbnZhciBjcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgcmV0dXJuIHV0aWwuQnVmZmVyXG4gICAgICAgID8gZnVuY3Rpb24gY3JlYXRlX2J1ZmZlcl9zZXR1cCgpIHtcbiAgICAgICAgICAgIHJldHVybiAoV3JpdGVyLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZV9idWZmZXIoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCdWZmZXJXcml0ZXIoKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgOiBmdW5jdGlvbiBjcmVhdGVfYXJyYXkoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFdyaXRlcigpO1xuICAgICAgICB9O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHdyaXRlci5cbiAqIEBmdW5jdGlvblxuICogQHJldHVybnMge0J1ZmZlcldyaXRlcnxXcml0ZXJ9IEEge0BsaW5rIEJ1ZmZlcldyaXRlcn0gd2hlbiBCdWZmZXJzIGFyZSBzdXBwb3J0ZWQsIG90aGVyd2lzZSBhIHtAbGluayBXcml0ZXJ9XG4gKi9cbldyaXRlci5jcmVhdGUgPSBjcmVhdGUoKTtcblxuLyoqXG4gKiBBbGxvY2F0ZXMgYSBidWZmZXIgb2YgdGhlIHNwZWNpZmllZCBzaXplLlxuICogQHBhcmFtIHtudW1iZXJ9IHNpemUgQnVmZmVyIHNpemVcbiAqIEByZXR1cm5zIHtVaW50OEFycmF5fSBCdWZmZXJcbiAqL1xuV3JpdGVyLmFsbG9jID0gZnVuY3Rpb24gYWxsb2Moc2l6ZSkge1xuICAgIHJldHVybiBuZXcgdXRpbC5BcnJheShzaXplKTtcbn07XG5cbi8vIFVzZSBVaW50OEFycmF5IGJ1ZmZlciBwb29sIGluIHRoZSBicm93c2VyLCBqdXN0IGxpa2Ugbm9kZSBkb2VzIHdpdGggYnVmZmVyc1xuLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbmlmICh1dGlsLkFycmF5ICE9PSBBcnJheSlcbiAgICBXcml0ZXIuYWxsb2MgPSB1dGlsLnBvb2woV3JpdGVyLmFsbG9jLCB1dGlsLkFycmF5LnByb3RvdHlwZS5zdWJhcnJheSk7XG5cbi8qKlxuICogUHVzaGVzIGEgbmV3IG9wZXJhdGlvbiB0byB0aGUgcXVldWUuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKFVpbnQ4QXJyYXksIG51bWJlciwgKil9IGZuIEZ1bmN0aW9uIHRvIGNhbGxcbiAqIEBwYXJhbSB7bnVtYmVyfSBsZW4gVmFsdWUgYnl0ZSBsZW5ndGhcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWwgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICogQHByaXZhdGVcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5fcHVzaCA9IGZ1bmN0aW9uIHB1c2goZm4sIGxlbiwgdmFsKSB7XG4gICAgdGhpcy50YWlsID0gdGhpcy50YWlsLm5leHQgPSBuZXcgT3AoZm4sIGxlbiwgdmFsKTtcbiAgICB0aGlzLmxlbiArPSBsZW47XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiB3cml0ZUJ5dGUodmFsLCBidWYsIHBvcykge1xuICAgIGJ1Zltwb3NdID0gdmFsICYgMjU1O1xufVxuXG5mdW5jdGlvbiB3cml0ZVZhcmludDMyKHZhbCwgYnVmLCBwb3MpIHtcbiAgICB3aGlsZSAodmFsID4gMTI3KSB7XG4gICAgICAgIGJ1Zltwb3MrK10gPSB2YWwgJiAxMjcgfCAxMjg7XG4gICAgICAgIHZhbCA+Pj49IDc7XG4gICAgfVxuICAgIGJ1Zltwb3NdID0gdmFsO1xufVxuXG4vKipcbiAqIENvbnN0cnVjdHMgYSBuZXcgdmFyaW50IHdyaXRlciBvcGVyYXRpb24gaW5zdGFuY2UuXG4gKiBAY2xhc3NkZXNjIFNjaGVkdWxlZCB2YXJpbnQgd3JpdGVyIG9wZXJhdGlvbi5cbiAqIEBleHRlbmRzIE9wXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBsZW4gVmFsdWUgYnl0ZSBsZW5ndGhcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWwgVmFsdWUgdG8gd3JpdGVcbiAqIEBpZ25vcmVcbiAqL1xuZnVuY3Rpb24gVmFyaW50T3AobGVuLCB2YWwpIHtcbiAgICB0aGlzLmxlbiA9IGxlbjtcbiAgICB0aGlzLm5leHQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy52YWwgPSB2YWw7XG59XG5cblZhcmludE9wLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoT3AucHJvdG90eXBlKTtcblZhcmludE9wLnByb3RvdHlwZS5mbiA9IHdyaXRlVmFyaW50MzI7XG5cbi8qKlxuICogV3JpdGVzIGFuIHVuc2lnbmVkIDMyIGJpdCB2YWx1ZSBhcyBhIHZhcmludC5cbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUudWludDMyID0gZnVuY3Rpb24gd3JpdGVfdWludDMyKHZhbHVlKSB7XG4gICAgLy8gaGVyZSwgdGhlIGNhbGwgdG8gdGhpcy5wdXNoIGhhcyBiZWVuIGlubGluZWQgYW5kIGEgdmFyaW50IHNwZWNpZmljIE9wIHN1YmNsYXNzIGlzIHVzZWQuXG4gICAgLy8gdWludDMyIGlzIGJ5IGZhciB0aGUgbW9zdCBmcmVxdWVudGx5IHVzZWQgb3BlcmF0aW9uIGFuZCBiZW5lZml0cyBzaWduaWZpY2FudGx5IGZyb20gdGhpcy5cbiAgICB0aGlzLmxlbiArPSAodGhpcy50YWlsID0gdGhpcy50YWlsLm5leHQgPSBuZXcgVmFyaW50T3AoXG4gICAgICAgICh2YWx1ZSA9IHZhbHVlID4+PiAwKVxuICAgICAgICAgICAgICAgIDwgMTI4ICAgICAgID8gMVxuICAgICAgICA6IHZhbHVlIDwgMTYzODQgICAgID8gMlxuICAgICAgICA6IHZhbHVlIDwgMjA5NzE1MiAgID8gM1xuICAgICAgICA6IHZhbHVlIDwgMjY4NDM1NDU2ID8gNFxuICAgICAgICA6ICAgICAgICAgICAgICAgICAgICAgNSxcbiAgICB2YWx1ZSkpLmxlbjtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogV3JpdGVzIGEgc2lnbmVkIDMyIGJpdCB2YWx1ZSBhcyBhIHZhcmludC5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5pbnQzMiA9IGZ1bmN0aW9uIHdyaXRlX2ludDMyKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlIDwgMFxuICAgICAgICA/IHRoaXMuX3B1c2god3JpdGVWYXJpbnQ2NCwgMTAsIExvbmdCaXRzLmZyb21OdW1iZXIodmFsdWUpKSAvLyAxMCBieXRlcyBwZXIgc3BlY1xuICAgICAgICA6IHRoaXMudWludDMyKHZhbHVlKTtcbn07XG5cbi8qKlxuICogV3JpdGVzIGEgMzIgYml0IHZhbHVlIGFzIGEgdmFyaW50LCB6aWctemFnIGVuY29kZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLnNpbnQzMiA9IGZ1bmN0aW9uIHdyaXRlX3NpbnQzMih2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzLnVpbnQzMigodmFsdWUgPDwgMSBeIHZhbHVlID4+IDMxKSA+Pj4gMCk7XG59O1xuXG5mdW5jdGlvbiB3cml0ZVZhcmludDY0KHZhbCwgYnVmLCBwb3MpIHtcbiAgICB3aGlsZSAodmFsLmhpKSB7XG4gICAgICAgIGJ1Zltwb3MrK10gPSB2YWwubG8gJiAxMjcgfCAxMjg7XG4gICAgICAgIHZhbC5sbyA9ICh2YWwubG8gPj4+IDcgfCB2YWwuaGkgPDwgMjUpID4+PiAwO1xuICAgICAgICB2YWwuaGkgPj4+PSA3O1xuICAgIH1cbiAgICB3aGlsZSAodmFsLmxvID4gMTI3KSB7XG4gICAgICAgIGJ1Zltwb3MrK10gPSB2YWwubG8gJiAxMjcgfCAxMjg7XG4gICAgICAgIHZhbC5sbyA9IHZhbC5sbyA+Pj4gNztcbiAgICB9XG4gICAgYnVmW3BvcysrXSA9IHZhbC5sbztcbn1cblxuLyoqXG4gKiBXcml0ZXMgYW4gdW5zaWduZWQgNjQgYml0IHZhbHVlIGFzIGEgdmFyaW50LlxuICogQHBhcmFtIHtMb25nfG51bWJlcnxzdHJpbmd9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgYHZhbHVlYCBpcyBhIHN0cmluZyBhbmQgbm8gbG9uZyBsaWJyYXJ5IGlzIHByZXNlbnQuXG4gKi9cbldyaXRlci5wcm90b3R5cGUudWludDY0ID0gZnVuY3Rpb24gd3JpdGVfdWludDY0KHZhbHVlKSB7XG4gICAgdmFyIGJpdHMgPSBMb25nQml0cy5mcm9tKHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcy5fcHVzaCh3cml0ZVZhcmludDY0LCBiaXRzLmxlbmd0aCgpLCBiaXRzKTtcbn07XG5cbi8qKlxuICogV3JpdGVzIGEgc2lnbmVkIDY0IGJpdCB2YWx1ZSBhcyBhIHZhcmludC5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtMb25nfG51bWJlcnxzdHJpbmd9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgYHZhbHVlYCBpcyBhIHN0cmluZyBhbmQgbm8gbG9uZyBsaWJyYXJ5IGlzIHByZXNlbnQuXG4gKi9cbldyaXRlci5wcm90b3R5cGUuaW50NjQgPSBXcml0ZXIucHJvdG90eXBlLnVpbnQ2NDtcblxuLyoqXG4gKiBXcml0ZXMgYSBzaWduZWQgNjQgYml0IHZhbHVlIGFzIGEgdmFyaW50LCB6aWctemFnIGVuY29kZWQuXG4gKiBAcGFyYW0ge0xvbmd8bnVtYmVyfHN0cmluZ30gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBgdmFsdWVgIGlzIGEgc3RyaW5nIGFuZCBubyBsb25nIGxpYnJhcnkgaXMgcHJlc2VudC5cbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5zaW50NjQgPSBmdW5jdGlvbiB3cml0ZV9zaW50NjQodmFsdWUpIHtcbiAgICB2YXIgYml0cyA9IExvbmdCaXRzLmZyb20odmFsdWUpLnp6RW5jb2RlKCk7XG4gICAgcmV0dXJuIHRoaXMuX3B1c2god3JpdGVWYXJpbnQ2NCwgYml0cy5sZW5ndGgoKSwgYml0cyk7XG59O1xuXG4vKipcbiAqIFdyaXRlcyBhIGJvb2xpc2ggdmFsdWUgYXMgYSB2YXJpbnQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5ib29sID0gZnVuY3Rpb24gd3JpdGVfYm9vbCh2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzLl9wdXNoKHdyaXRlQnl0ZSwgMSwgdmFsdWUgPyAxIDogMCk7XG59O1xuXG5mdW5jdGlvbiB3cml0ZUZpeGVkMzIodmFsLCBidWYsIHBvcykge1xuICAgIGJ1Zltwb3MgICAgXSA9ICB2YWwgICAgICAgICAmIDI1NTtcbiAgICBidWZbcG9zICsgMV0gPSAgdmFsID4+PiA4ICAgJiAyNTU7XG4gICAgYnVmW3BvcyArIDJdID0gIHZhbCA+Pj4gMTYgICYgMjU1O1xuICAgIGJ1Zltwb3MgKyAzXSA9ICB2YWwgPj4+IDI0O1xufVxuXG4vKipcbiAqIFdyaXRlcyBhbiB1bnNpZ25lZCAzMiBiaXQgdmFsdWUgYXMgZml4ZWQgMzIgYml0cy5cbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUuZml4ZWQzMiA9IGZ1bmN0aW9uIHdyaXRlX2ZpeGVkMzIodmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5fcHVzaCh3cml0ZUZpeGVkMzIsIDQsIHZhbHVlID4+PiAwKTtcbn07XG5cbi8qKlxuICogV3JpdGVzIGEgc2lnbmVkIDMyIGJpdCB2YWx1ZSBhcyBmaXhlZCAzMiBiaXRzLlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLnNmaXhlZDMyID0gV3JpdGVyLnByb3RvdHlwZS5maXhlZDMyO1xuXG4vKipcbiAqIFdyaXRlcyBhbiB1bnNpZ25lZCA2NCBiaXQgdmFsdWUgYXMgZml4ZWQgNjQgYml0cy5cbiAqIEBwYXJhbSB7TG9uZ3xudW1iZXJ8c3RyaW5nfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGB2YWx1ZWAgaXMgYSBzdHJpbmcgYW5kIG5vIGxvbmcgbGlicmFyeSBpcyBwcmVzZW50LlxuICovXG5Xcml0ZXIucHJvdG90eXBlLmZpeGVkNjQgPSBmdW5jdGlvbiB3cml0ZV9maXhlZDY0KHZhbHVlKSB7XG4gICAgdmFyIGJpdHMgPSBMb25nQml0cy5mcm9tKHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcy5fcHVzaCh3cml0ZUZpeGVkMzIsIDQsIGJpdHMubG8pLl9wdXNoKHdyaXRlRml4ZWQzMiwgNCwgYml0cy5oaSk7XG59O1xuXG4vKipcbiAqIFdyaXRlcyBhIHNpZ25lZCA2NCBiaXQgdmFsdWUgYXMgZml4ZWQgNjQgYml0cy5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtMb25nfG51bWJlcnxzdHJpbmd9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgYHZhbHVlYCBpcyBhIHN0cmluZyBhbmQgbm8gbG9uZyBsaWJyYXJ5IGlzIHByZXNlbnQuXG4gKi9cbldyaXRlci5wcm90b3R5cGUuc2ZpeGVkNjQgPSBXcml0ZXIucHJvdG90eXBlLmZpeGVkNjQ7XG5cbi8qKlxuICogV3JpdGVzIGEgZmxvYXQgKDMyIGJpdCkuXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUuZmxvYXQgPSBmdW5jdGlvbiB3cml0ZV9mbG9hdCh2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzLl9wdXNoKHV0aWwuZmxvYXQud3JpdGVGbG9hdExFLCA0LCB2YWx1ZSk7XG59O1xuXG4vKipcbiAqIFdyaXRlcyBhIGRvdWJsZSAoNjQgYml0IGZsb2F0KS5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5kb3VibGUgPSBmdW5jdGlvbiB3cml0ZV9kb3VibGUodmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5fcHVzaCh1dGlsLmZsb2F0LndyaXRlRG91YmxlTEUsIDgsIHZhbHVlKTtcbn07XG5cbnZhciB3cml0ZUJ5dGVzID0gdXRpbC5BcnJheS5wcm90b3R5cGUuc2V0XG4gICAgPyBmdW5jdGlvbiB3cml0ZUJ5dGVzX3NldCh2YWwsIGJ1ZiwgcG9zKSB7XG4gICAgICAgIGJ1Zi5zZXQodmFsLCBwb3MpOyAvLyBhbHNvIHdvcmtzIGZvciBwbGFpbiBhcnJheSB2YWx1ZXNcbiAgICB9XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICA6IGZ1bmN0aW9uIHdyaXRlQnl0ZXNfZm9yKHZhbCwgYnVmLCBwb3MpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWwubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICBidWZbcG9zICsgaV0gPSB2YWxbaV07XG4gICAgfTtcblxuLyoqXG4gKiBXcml0ZXMgYSBzZXF1ZW5jZSBvZiBieXRlcy5cbiAqIEBwYXJhbSB7VWludDhBcnJheXxzdHJpbmd9IHZhbHVlIEJ1ZmZlciBvciBiYXNlNjQgZW5jb2RlZCBzdHJpbmcgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLmJ5dGVzID0gZnVuY3Rpb24gd3JpdGVfYnl0ZXModmFsdWUpIHtcbiAgICB2YXIgbGVuID0gdmFsdWUubGVuZ3RoID4+PiAwO1xuICAgIGlmICghbGVuKVxuICAgICAgICByZXR1cm4gdGhpcy5fcHVzaCh3cml0ZUJ5dGUsIDEsIDApO1xuICAgIGlmICh1dGlsLmlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICB2YXIgYnVmID0gV3JpdGVyLmFsbG9jKGxlbiA9IGJhc2U2NC5sZW5ndGgodmFsdWUpKTtcbiAgICAgICAgYmFzZTY0LmRlY29kZSh2YWx1ZSwgYnVmLCAwKTtcbiAgICAgICAgdmFsdWUgPSBidWY7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnVpbnQzMihsZW4pLl9wdXNoKHdyaXRlQnl0ZXMsIGxlbiwgdmFsdWUpO1xufTtcblxuLyoqXG4gKiBXcml0ZXMgYSBzdHJpbmcuXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLnN0cmluZyA9IGZ1bmN0aW9uIHdyaXRlX3N0cmluZyh2YWx1ZSkge1xuICAgIHZhciBsZW4gPSB1dGY4Lmxlbmd0aCh2YWx1ZSk7XG4gICAgcmV0dXJuIGxlblxuICAgICAgICA/IHRoaXMudWludDMyKGxlbikuX3B1c2godXRmOC53cml0ZSwgbGVuLCB2YWx1ZSlcbiAgICAgICAgOiB0aGlzLl9wdXNoKHdyaXRlQnl0ZSwgMSwgMCk7XG59O1xuXG4vKipcbiAqIEZvcmtzIHRoaXMgd3JpdGVyJ3Mgc3RhdGUgYnkgcHVzaGluZyBpdCB0byBhIHN0YWNrLlxuICogQ2FsbGluZyB7QGxpbmsgV3JpdGVyI3Jlc2V0fHJlc2V0fSBvciB7QGxpbmsgV3JpdGVyI2xkZWxpbXxsZGVsaW19IHJlc2V0cyB0aGUgd3JpdGVyIHRvIHRoZSBwcmV2aW91cyBzdGF0ZS5cbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLmZvcmsgPSBmdW5jdGlvbiBmb3JrKCkge1xuICAgIHRoaXMuc3RhdGVzID0gbmV3IFN0YXRlKHRoaXMpO1xuICAgIHRoaXMuaGVhZCA9IHRoaXMudGFpbCA9IG5ldyBPcChub29wLCAwLCAwKTtcbiAgICB0aGlzLmxlbiA9IDA7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlc2V0cyB0aGlzIGluc3RhbmNlIHRvIHRoZSBsYXN0IHN0YXRlLlxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiByZXNldCgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZXMpIHtcbiAgICAgICAgdGhpcy5oZWFkICAgPSB0aGlzLnN0YXRlcy5oZWFkO1xuICAgICAgICB0aGlzLnRhaWwgICA9IHRoaXMuc3RhdGVzLnRhaWw7XG4gICAgICAgIHRoaXMubGVuICAgID0gdGhpcy5zdGF0ZXMubGVuO1xuICAgICAgICB0aGlzLnN0YXRlcyA9IHRoaXMuc3RhdGVzLm5leHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5oZWFkID0gdGhpcy50YWlsID0gbmV3IE9wKG5vb3AsIDAsIDApO1xuICAgICAgICB0aGlzLmxlbiAgPSAwO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVzZXRzIHRvIHRoZSBsYXN0IHN0YXRlIGFuZCBhcHBlbmRzIHRoZSBmb3JrIHN0YXRlJ3MgY3VycmVudCB3cml0ZSBsZW5ndGggYXMgYSB2YXJpbnQgZm9sbG93ZWQgYnkgaXRzIG9wZXJhdGlvbnMuXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5sZGVsaW0gPSBmdW5jdGlvbiBsZGVsaW0oKSB7XG4gICAgdmFyIGhlYWQgPSB0aGlzLmhlYWQsXG4gICAgICAgIHRhaWwgPSB0aGlzLnRhaWwsXG4gICAgICAgIGxlbiAgPSB0aGlzLmxlbjtcbiAgICB0aGlzLnJlc2V0KCkudWludDMyKGxlbik7XG4gICAgaWYgKGxlbikge1xuICAgICAgICB0aGlzLnRhaWwubmV4dCA9IGhlYWQubmV4dDsgLy8gc2tpcCBub29wXG4gICAgICAgIHRoaXMudGFpbCA9IHRhaWw7XG4gICAgICAgIHRoaXMubGVuICs9IGxlbjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEZpbmlzaGVzIHRoZSB3cml0ZSBvcGVyYXRpb24uXG4gKiBAcmV0dXJucyB7VWludDhBcnJheX0gRmluaXNoZWQgYnVmZmVyXG4gKi9cbldyaXRlci5wcm90b3R5cGUuZmluaXNoID0gZnVuY3Rpb24gZmluaXNoKCkge1xuICAgIHZhciBoZWFkID0gdGhpcy5oZWFkLm5leHQsIC8vIHNraXAgbm9vcFxuICAgICAgICBidWYgID0gdGhpcy5jb25zdHJ1Y3Rvci5hbGxvYyh0aGlzLmxlbiksXG4gICAgICAgIHBvcyAgPSAwO1xuICAgIHdoaWxlIChoZWFkKSB7XG4gICAgICAgIGhlYWQuZm4oaGVhZC52YWwsIGJ1ZiwgcG9zKTtcbiAgICAgICAgcG9zICs9IGhlYWQubGVuO1xuICAgICAgICBoZWFkID0gaGVhZC5uZXh0O1xuICAgIH1cbiAgICAvLyB0aGlzLmhlYWQgPSB0aGlzLnRhaWwgPSBudWxsO1xuICAgIHJldHVybiBidWY7XG59O1xuXG5Xcml0ZXIuX2NvbmZpZ3VyZSA9IGZ1bmN0aW9uKEJ1ZmZlcldyaXRlcl8pIHtcbiAgICBCdWZmZXJXcml0ZXIgPSBCdWZmZXJXcml0ZXJfO1xuICAgIFdyaXRlci5jcmVhdGUgPSBjcmVhdGUoKTtcbiAgICBCdWZmZXJXcml0ZXIuX2NvbmZpZ3VyZSgpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBCdWZmZXJXcml0ZXI7XG5cbi8vIGV4dGVuZHMgV3JpdGVyXG52YXIgV3JpdGVyID0gcmVxdWlyZShcIi4vd3JpdGVyXCIpO1xuKEJ1ZmZlcldyaXRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFdyaXRlci5wcm90b3R5cGUpKS5jb25zdHJ1Y3RvciA9IEJ1ZmZlcldyaXRlcjtcblxudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsL21pbmltYWxcIik7XG5cbi8qKlxuICogQ29uc3RydWN0cyBhIG5ldyBidWZmZXIgd3JpdGVyIGluc3RhbmNlLlxuICogQGNsYXNzZGVzYyBXaXJlIGZvcm1hdCB3cml0ZXIgdXNpbmcgbm9kZSBidWZmZXJzLlxuICogQGV4dGVuZHMgV3JpdGVyXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQnVmZmVyV3JpdGVyKCkge1xuICAgIFdyaXRlci5jYWxsKHRoaXMpO1xufVxuXG5CdWZmZXJXcml0ZXIuX2NvbmZpZ3VyZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBBbGxvY2F0ZXMgYSBidWZmZXIgb2YgdGhlIHNwZWNpZmllZCBzaXplLlxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzaXplIEJ1ZmZlciBzaXplXG4gICAgICogQHJldHVybnMge0J1ZmZlcn0gQnVmZmVyXG4gICAgICovXG4gICAgQnVmZmVyV3JpdGVyLmFsbG9jID0gdXRpbC5fQnVmZmVyX2FsbG9jVW5zYWZlO1xuXG4gICAgQnVmZmVyV3JpdGVyLndyaXRlQnl0ZXNCdWZmZXIgPSB1dGlsLkJ1ZmZlciAmJiB1dGlsLkJ1ZmZlci5wcm90b3R5cGUgaW5zdGFuY2VvZiBVaW50OEFycmF5ICYmIHV0aWwuQnVmZmVyLnByb3RvdHlwZS5zZXQubmFtZSA9PT0gXCJzZXRcIlxuICAgICAgICA/IGZ1bmN0aW9uIHdyaXRlQnl0ZXNCdWZmZXJfc2V0KHZhbCwgYnVmLCBwb3MpIHtcbiAgICAgICAgICBidWYuc2V0KHZhbCwgcG9zKTsgLy8gZmFzdGVyIHRoYW4gY29weSAocmVxdWlyZXMgbm9kZSA+PSA0IHdoZXJlIEJ1ZmZlcnMgZXh0ZW5kIFVpbnQ4QXJyYXkgYW5kIHNldCBpcyBwcm9wZXJseSBpbmhlcml0ZWQpXG4gICAgICAgICAgLy8gYWxzbyB3b3JrcyBmb3IgcGxhaW4gYXJyYXkgdmFsdWVzXG4gICAgICAgIH1cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgOiBmdW5jdGlvbiB3cml0ZUJ5dGVzQnVmZmVyX2NvcHkodmFsLCBidWYsIHBvcykge1xuICAgICAgICAgIGlmICh2YWwuY29weSkgLy8gQnVmZmVyIHZhbHVlc1xuICAgICAgICAgICAgdmFsLmNvcHkoYnVmLCBwb3MsIDAsIHZhbC5sZW5ndGgpO1xuICAgICAgICAgIGVsc2UgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWwubGVuZ3RoOykgLy8gcGxhaW4gYXJyYXkgdmFsdWVzXG4gICAgICAgICAgICBidWZbcG9zKytdID0gdmFsW2krK107XG4gICAgICAgIH07XG59O1xuXG5cbi8qKlxuICogQG92ZXJyaWRlXG4gKi9cbkJ1ZmZlcldyaXRlci5wcm90b3R5cGUuYnl0ZXMgPSBmdW5jdGlvbiB3cml0ZV9ieXRlc19idWZmZXIodmFsdWUpIHtcbiAgICBpZiAodXRpbC5pc1N0cmluZyh2YWx1ZSkpXG4gICAgICAgIHZhbHVlID0gdXRpbC5fQnVmZmVyX2Zyb20odmFsdWUsIFwiYmFzZTY0XCIpO1xuICAgIHZhciBsZW4gPSB2YWx1ZS5sZW5ndGggPj4+IDA7XG4gICAgdGhpcy51aW50MzIobGVuKTtcbiAgICBpZiAobGVuKVxuICAgICAgICB0aGlzLl9wdXNoKEJ1ZmZlcldyaXRlci53cml0ZUJ5dGVzQnVmZmVyLCBsZW4sIHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIHdyaXRlU3RyaW5nQnVmZmVyKHZhbCwgYnVmLCBwb3MpIHtcbiAgICBpZiAodmFsLmxlbmd0aCA8IDQwKSAvLyBwbGFpbiBqcyBpcyBmYXN0ZXIgZm9yIHNob3J0IHN0cmluZ3MgKHByb2JhYmx5IGR1ZSB0byByZWR1bmRhbnQgYXNzZXJ0aW9ucylcbiAgICAgICAgdXRpbC51dGY4LndyaXRlKHZhbCwgYnVmLCBwb3MpO1xuICAgIGVsc2UgaWYgKGJ1Zi51dGY4V3JpdGUpXG4gICAgICAgIGJ1Zi51dGY4V3JpdGUodmFsLCBwb3MpO1xuICAgIGVsc2VcbiAgICAgICAgYnVmLndyaXRlKHZhbCwgcG9zKTtcbn1cblxuLyoqXG4gKiBAb3ZlcnJpZGVcbiAqL1xuQnVmZmVyV3JpdGVyLnByb3RvdHlwZS5zdHJpbmcgPSBmdW5jdGlvbiB3cml0ZV9zdHJpbmdfYnVmZmVyKHZhbHVlKSB7XG4gICAgdmFyIGxlbiA9IHV0aWwuQnVmZmVyLmJ5dGVMZW5ndGgodmFsdWUpO1xuICAgIHRoaXMudWludDMyKGxlbik7XG4gICAgaWYgKGxlbilcbiAgICAgICAgdGhpcy5fcHVzaCh3cml0ZVN0cmluZ0J1ZmZlciwgbGVuLCB2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG5cbi8qKlxuICogRmluaXNoZXMgdGhlIHdyaXRlIG9wZXJhdGlvbi5cbiAqIEBuYW1lIEJ1ZmZlcldyaXRlciNmaW5pc2hcbiAqIEBmdW5jdGlvblxuICogQHJldHVybnMge0J1ZmZlcn0gRmluaXNoZWQgYnVmZmVyXG4gKi9cblxuQnVmZmVyV3JpdGVyLl9jb25maWd1cmUoKTtcbiIsImltcG9ydCB7IFNpbmdsZXRvbiB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvY29tbW9uL1NpbmdsZXRvblwiO1xyXG5leHBvcnQgY2xhc3MgU2tpbGxDb25maWdUUntcclxuXHQgcHVibGljIF9pZDpudW1iZXIgO1xyXG5cdCBwdWJsaWMgX05hbWU6c3RyaW5nIDtcclxuXHQgcHVibGljIF9EZXNjcmlwdGlvbjpzdHJpbmcgO1xyXG5cdCBwdWJsaWMgX0Nvb2xUaW1lOm51bWJlciA7XHJcblx0IHB1YmxpYyBfQ29zdFNQOm51bWJlciA7XHJcblx0IHB1YmxpYyBfQXR0YWNrRGlzdGFuY2U6bnVtYmVyIDtcclxuXHQgcHVibGljIF9BdHRhY2tBbmdsZTpudW1iZXIgO1xyXG5cdCBwdWJsaWMgX0F0dGFja1RhcmdldFRhZ3M6QXJyYXk8c3RyaW5nPiA7XHJcblx0IHB1YmxpYyBfSW1wYWN0VHlwZTpBcnJheTxzdHJpbmc+IDtcclxuXHQgcHVibGljIF9OZXh0QmF0dGxlcklkOm51bWJlciA7XHJcblx0IHB1YmxpYyBfQXRrUmF0aW86bnVtYmVyIDtcclxuXHQgcHVibGljIF9EdXJhdGlvblRpbWU6bnVtYmVyIDtcclxuXHQgcHVibGljIF9BdGtJbnRlcnZhbDpudW1iZXIgO1xyXG5cdCBwdWJsaWMgX1NraWxsUHJlZmFiOnN0cmluZyA7XHJcblx0IHB1YmxpYyBfQW5pbWF0aW9uTmFtZTpzdHJpbmcgO1xyXG5cdCBwdWJsaWMgX0hpdEZ4UHJlZmFiOnN0cmluZyA7XHJcblx0IHB1YmxpYyBfTGV2ZWw6bnVtYmVyIDtcclxuXHQgcHVibGljIF9BdHRhY2tUeXBlOm51bWJlciA7XHJcblx0IHB1YmxpYyBfU2VsZWN0b3JUeXBlOm51bWJlciA7XHJcblxyXG5cdGNvbnN0cnVjdG9yKF9pZDpudW1iZXIsIF9OYW1lOnN0cmluZywgX0Rlc2NyaXB0aW9uOnN0cmluZywgX0Nvb2xUaW1lOm51bWJlciwgX0Nvc3RTUDpudW1iZXIsIF9BdHRhY2tEaXN0YW5jZTpudW1iZXIsIF9BdHRhY2tBbmdsZTpudW1iZXIsIF9BdHRhY2tUYXJnZXRUYWdzOkFycmF5PHN0cmluZz4sIF9JbXBhY3RUeXBlOkFycmF5PHN0cmluZz4sIF9OZXh0QmF0dGxlcklkOm51bWJlciwgX0F0a1JhdGlvOm51bWJlciwgX0R1cmF0aW9uVGltZTpudW1iZXIsIF9BdGtJbnRlcnZhbDpudW1iZXIsIF9Ta2lsbFByZWZhYjpzdHJpbmcsIF9BbmltYXRpb25OYW1lOnN0cmluZywgX0hpdEZ4UHJlZmFiOnN0cmluZywgX0xldmVsOm51bWJlciwgX0F0dGFja1R5cGU6bnVtYmVyLCBfU2VsZWN0b3JUeXBlOm51bWJlcil7XHJcblx0XHR0aGlzLl9pZCA9IF9pZDtcclxuXHRcdHRoaXMuX05hbWUgPSBfTmFtZTtcclxuXHRcdHRoaXMuX0Rlc2NyaXB0aW9uID0gX0Rlc2NyaXB0aW9uO1xyXG5cdFx0dGhpcy5fQ29vbFRpbWUgPSBfQ29vbFRpbWU7XHJcblx0XHR0aGlzLl9Db3N0U1AgPSBfQ29zdFNQO1xyXG5cdFx0dGhpcy5fQXR0YWNrRGlzdGFuY2UgPSBfQXR0YWNrRGlzdGFuY2U7XHJcblx0XHR0aGlzLl9BdHRhY2tBbmdsZSA9IF9BdHRhY2tBbmdsZTtcclxuXHRcdHRoaXMuX0F0dGFja1RhcmdldFRhZ3MgPSBfQXR0YWNrVGFyZ2V0VGFncztcclxuXHRcdHRoaXMuX0ltcGFjdFR5cGUgPSBfSW1wYWN0VHlwZTtcclxuXHRcdHRoaXMuX05leHRCYXR0bGVySWQgPSBfTmV4dEJhdHRsZXJJZDtcclxuXHRcdHRoaXMuX0F0a1JhdGlvID0gX0F0a1JhdGlvO1xyXG5cdFx0dGhpcy5fRHVyYXRpb25UaW1lID0gX0R1cmF0aW9uVGltZTtcclxuXHRcdHRoaXMuX0F0a0ludGVydmFsID0gX0F0a0ludGVydmFsO1xyXG5cdFx0dGhpcy5fU2tpbGxQcmVmYWIgPSBfU2tpbGxQcmVmYWI7XHJcblx0XHR0aGlzLl9BbmltYXRpb25OYW1lID0gX0FuaW1hdGlvbk5hbWU7XHJcblx0XHR0aGlzLl9IaXRGeFByZWZhYiA9IF9IaXRGeFByZWZhYjtcclxuXHRcdHRoaXMuX0xldmVsID0gX0xldmVsO1xyXG5cdFx0dGhpcy5fQXR0YWNrVHlwZSA9IF9BdHRhY2tUeXBlO1xyXG5cdFx0dGhpcy5fU2VsZWN0b3JUeXBlID0gX1NlbGVjdG9yVHlwZTtcclxuXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2tpbGxDb25maWdUQiBleHRlbmRzIFNpbmdsZXRvbjxTa2lsbENvbmZpZ1RCPnsgXHJcblx0cHVibGljIHRyczpNYXA8bnVtYmVyLCBTa2lsbENvbmZpZ1RSPiA9IG5ldyBNYXA8bnVtYmVyLCBTa2lsbENvbmZpZ1RSPigpO1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy50cnMuc2V0KDEwMDEsIG5ldyBTa2lsbENvbmZpZ1RSKDEwMDEsIFwi6ZmN6b6Z5Y2B5YWr5o6MXCIsIFwi5bim5pyJ5by65Yqb5pS75Ye75oqA6IO9XCIsIDEwLCAxNzgsIDEsIDMwLCBbXCJFbmVteVwiXSwgW1wiQ29zdFNQXCIsIFwiRGFtYWdlXCJdLCAwLCAyLCAyLCAxLCBcIkVmZmVjdC9QcmVmYWIvVUkvZWZfdWlfVGFza0ZpbmlzaC5wcmVmYWJcIiwgXCJza2lsbDFcIiwgXCJFZmZlY3QvUHJlZmFiL1VJL2VmX3VpX1Rhc2tGaW5pc2gucHJlZmFiXCIsIDEsIDEsIDEpKTtcclxuXHRcdHRoaXMudHJzLnNldCgxMDAyLCBuZXcgU2tpbGxDb25maWdUUigxMDAyLCBcIuaatOmbqOaiqOiKsVwiLCBcIuW4puacieW8uuWKm+aUu+WHu+aKgOiDvVwiLCAxMCwgMTc4LCAxLCAzMCwgW1wiRW5lbXlcIl0sIFtcIkNvc3RTUFwiLCBcIkRhbWFnZVwiXSwgMCwgMiwgMiwgMSwgXCJFZmZlY3QvUHJlZmFiL1VJL2VmX3VpX1Rhc2tGaW5pc2gucHJlZmFiXCIsIFwic2tpbGwyXCIsIFwiRWZmZWN0L1ByZWZhYi9VSS9lZl91aV9UYXNrRmluaXNoLnByZWZhYlwiLCAxLCAxLCAxKSk7XHJcblx0XHR0aGlzLnRycy5zZXQoMTAwMywgbmV3IFNraWxsQ29uZmlnVFIoMTAwMywgXCLmjpLlsbHlgJLmtbdcIiwgXCLluKbmnInlvLrlipvmlLvlh7vmioDog71cIiwgMTAsIDE3OCwgMSwgMzAsIFtcIkVuZW15XCJdLCBbXCJDb3N0U1BcIiwgXCJEYW1hZ2VcIl0sIDAsIDIsIDIsIDEsIFwiRWZmZWN0L1ByZWZhYi9VSS9lZl91aV9UYXNrRmluaXNoLnByZWZhYlwiLCBcInNraWxsM1wiLCBcIkVmZmVjdC9QcmVmYWIvVUkvZWZfdWlfVGFza0ZpbmlzaC5wcmVmYWJcIiwgMSwgMSwgMSkpO1xyXG5cdFx0dGhpcy50cnMuc2V0KDEwMDQsIG5ldyBTa2lsbENvbmZpZ1RSKDEwMDQsIFwi6JG16Iqx54K556m05omLXCIsIFwi5bim5pyJ5by65Yqb5pS75Ye75oqA6IO9XCIsIDEwLCAxNzgsIDEsIDMwLCBbXCJFbmVteVwiXSwgW1wiQ29zdFNQXCIsIFwiRGFtYWdlXCJdLCAwLCAyLCAyLCAxLCBcIkVmZmVjdC9QcmVmYWIvVUkvZWZfdWlfVGFza0ZpbmlzaC5wcmVmYWJcIiwgXCJza2lsbDRcIiwgXCJFZmZlY3QvUHJlZmFiL1VJL2VmX3VpX1Rhc2tGaW5pc2gucHJlZmFiXCIsIDEsIDEsIDEpKTtcclxuXHQgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBuaWNlX3RzIH0gZnJvbSBcIi4vZ2VuL3BiXCI7XHJcbmV4cG9ydCBjbGFzcyBEZWNvZGVNc2d7XHJcblx0cHVibGljIHJwY0lkOm51bWJlcjtcclxuXHRwdWJsaWMgbXNnT2JqOmFueTtcclxufVxyXG5leHBvcnQgY2xhc3MgT3Bjb2Rle1xyXG5cdHB1YmxpYyBzdGF0aWMgTVNHX0MyUl9Mb2dpbjpudW1iZXIgPSAxMDAwO1xyXG5cdHB1YmxpYyBzdGF0aWMgTVNHX1IyQ19Mb2dpbjpudW1iZXIgPSAxMDAxO1xyXG5cdHB1YmxpYyBzdGF0aWMgTVNHX0MyR19Mb2dpbkdhdGU6bnVtYmVyID0gMTAwMjtcclxuXHRwdWJsaWMgc3RhdGljIE1TR19HMkNfTG9naW5HYXRlOm51bWJlciA9IDEwMDM7XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgTVNHX0MyR1NfVGVzdDpudW1iZXIgPSAyMDAxO1xyXG5cdHB1YmxpYyBzdGF0aWMgTVNHX0dTMkNfVGVzdDpudW1iZXIgPSAyMDAyO1xyXG5cclxuXHRwdWJsaWMgc3RhdGljIG1hcCA9IHtcclxuXHRcdDEwMDAgOiB7XCJkZWNvZGVcIjpuaWNlX3RzLkMyUl9Mb2dpbi5kZWNvZGUsXCJlbmNvZGVcIjpuaWNlX3RzLkMyUl9Mb2dpbi5lbmNvZGV9LFxyXG5cdFx0MTAwMSA6IHtcImRlY29kZVwiOm5pY2VfdHMuUjJDX0xvZ2luLmRlY29kZSxcImVuY29kZVwiOm5pY2VfdHMuUjJDX0xvZ2luLmVuY29kZX0sXHJcblx0XHQxMDAyIDoge1wiZGVjb2RlXCI6bmljZV90cy5DMkdfTG9naW5HYXRlLmRlY29kZSxcImVuY29kZVwiOm5pY2VfdHMuQzJHX0xvZ2luR2F0ZS5lbmNvZGV9LFxyXG5cdFx0MTAwMyA6IHtcImRlY29kZVwiOm5pY2VfdHMuRzJDX0xvZ2luR2F0ZS5kZWNvZGUsXCJlbmNvZGVcIjpuaWNlX3RzLkcyQ19Mb2dpbkdhdGUuZW5jb2RlfSxcclxuXHJcblx0XHQyMDAxIDoge1wiZGVjb2RlXCI6bmljZV90cy5DMkdTX1Rlc3QuZGVjb2RlLFwiZW5jb2RlXCI6bmljZV90cy5DMkdTX1Rlc3QuZW5jb2RlfSxcclxuXHRcdDIwMDIgOiB7XCJkZWNvZGVcIjpuaWNlX3RzLkdTMkNfVGVzdC5kZWNvZGUsXCJlbmNvZGVcIjpuaWNlX3RzLkdTMkNfVGVzdC5lbmNvZGV9XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgZGVjb2RlKG9wY29kZTpudW1iZXIsIG1zZzpVaW50OEFycmF5KTpEZWNvZGVNc2cge1xyXG5cdFx0bGV0IG1zZ09iaiA9IHRoaXMubWFwW29wY29kZV1bXCJkZWNvZGVcIl0obXNnKTtcclxuXHRcdGxldCBkZWNvZGVNc2cgPSBuZXcgRGVjb2RlTXNnKCk7XHJcblx0XHRkZWNvZGVNc2cucnBjSWQgPSBtc2dPYmouUnBjSWQ7XHJcblx0XHRkZWNvZGVNc2cubXNnT2JqID0gbXNnT2JqO1xyXG5cdFx0cmV0dXJuIGRlY29kZU1zZztcclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBlbmNvZGUob3Bjb2RlOm51bWJlciwgbXNnOlVpbnQ4QXJyYXkpe1xyXG5cdFx0bGV0IGJ1ZiA9IHRoaXMubWFwW29wY29kZV1bXCJlbmNvZGVcIl0obXNnKS5maW5pc2goKTtcclxuXHRcdHJldHVybiBidWZcclxuXHR9XHJcblxyXG5cclxuXHJcbn1cclxuIiwiLyoqIFRoaXMgaXMgYW4gYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgY2xhc3MgYnkgRmFpcnlHVUkuIFBsZWFzZSBkbyBub3QgbW9kaWZ5IGl0LiAqKi9cblxuZXhwb3J0IGNsYXNzIEZseUJpcmRVSVxue1xuICAgIHB1YmxpYyBzdGF0aWMgUGFja2FnZU5hbWU6c3RyaW5nID0gXCJGbHlCaXJkXCI7XG4gICAgcHVibGljIHN0YXRpYyBQYWNrYWdlQnl0ZXM6c3RyaW5nID0gXCJGbHlCaXJkX2Z1aS5ieXRlc1wiO1xuICAgIHB1YmxpYyBzdGF0aWMgVUlNYWluVklldzpzdHJpbmcgPSBcIk1haW5WSWV3XCI7XG59IiwiLyoqIFRoaXMgaXMgYW4gYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgY2xhc3MgYnkgRmFpcnlHVUkuIFBsZWFzZSBkbyBub3QgbW9kaWZ5IGl0LiAqKi9cblxuZXhwb3J0IGNsYXNzIEdhbWVTdGFydFVJXG57XG4gICAgcHVibGljIHN0YXRpYyBQYWNrYWdlTmFtZTpzdHJpbmcgPSBcIkdhbWVTdGFydFwiO1xuICAgIHB1YmxpYyBzdGF0aWMgUGFja2FnZUJ5dGVzOnN0cmluZyA9IFwiR2FtZVN0YXJ0X2Z1aS5ieXRlc1wiO1xuICAgIHB1YmxpYyBzdGF0aWMgVUlTdGFydFZpZXc6c3RyaW5nID0gXCJTdGFydFZpZXdcIjtcbn0iLCIvKiogVGhpcyBpcyBhbiBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBjbGFzcyBieSBGYWlyeUdVSS4gUGxlYXNlIGRvIG5vdCBtb2RpZnkgaXQuICoqL1xuXG5leHBvcnQgY2xhc3MgQ29tbW9uVUlcbntcbiAgICBwdWJsaWMgc3RhdGljIFBhY2thZ2VOYW1lOnN0cmluZyA9IFwiQ29tbW9uXCI7XG4gICAgcHVibGljIHN0YXRpYyBQYWNrYWdlQnl0ZXM6c3RyaW5nID0gXCJDb21tb25fZnVpLmJ5dGVzXCI7XG4gICAgcHVibGljIHN0YXRpYyBVSUxvYWRpbmdWaWV3OnN0cmluZyA9IFwiTG9hZGluZ1ZpZXdcIjtcbn0iLCJcclxuaW1wb3J0IHsgU2luZ2xldG9uIH0gZnJvbSAnLi9TaW5nbGV0b24nO1xyXG5pbXBvcnQgeyBSZXNNYW5hZ2VyIH0gZnJvbSAnLi9SZXNNYW5hZ2VyJztcclxuaW1wb3J0IHsgVW5pdHlFbmdpbmUgfSBmcm9tICdjc2hhcnAnO1xyXG5cclxuXHJcblxyXG4vLyAtLSBHYW1lT2JqZWN057yT5a2Y5rGgXHJcbi8vIC0tIOazqOaEj++8mlxyXG4vLyAtLSAx44CB5omA5pyJ6ZyA6KaB6aKE6K6+6YO95LuO6L+Z6YeM5Yqg6L2977yM5LiN6KaB55u05o6l5YiwUmVzb3VyY2VzTWFuYWdlcuWOu+WKoOi9ve+8jOeUsei/memHjOe7n+S4gOWBmue8k+WtmOeuoeeQhlxyXG4vLyAtLSAy44CB57yT5a2Y5YiG5Li65Lik6YOo5YiG77ya5LuO6LWE5rqQ5bGC5Yqg6L2955qE5Y6f5aeLR2FtZU9iamVjdChBc3NldCnvvIzku45HYW1lT2JqZWN05a6e5L6L5YyW5Ye65p2l55qE5aSa5LiqSW5zdFxyXG5leHBvcnQgY2xhc3MgR2FtZU9iamVjdFBvb2wgZXh0ZW5kcyBTaW5nbGV0b248R2FtZU9iamVjdFBvb2w+e1xyXG5cclxuICAgIHByaXZhdGUgX19jYWNoZVRyYW5zUm9vdCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9fZ29Qb29sID0gbmV3IE1hcCgpO1xyXG4gICAgcHJpdmF0ZSBfX2luc3RDYWNoZTpNYXA8c3RyaW5nLEFycmF5PGFueT4+ID0gbmV3IE1hcDxzdHJpbmcsQXJyYXk8YW55Pj4oKTtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICBsZXQgZ28gPSBVbml0eUVuZ2luZS5HYW1lT2JqZWN0LkZpbmQoXCJHYW1lT2JqZWN0Q2FjaGVSb290XCIpO1xyXG5cclxuICAgICAgICBpZihnbyA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBnbyA9IG5ldyBVbml0eUVuZ2luZS5HYW1lT2JqZWN0KFwiR2FtZU9iamVjdENhY2hlUm9vdFwiKTtcclxuICAgICAgICAgICAgVW5pdHlFbmdpbmUuT2JqZWN0LkRvbnREZXN0cm95T25Mb2FkKGdvKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX19jYWNoZVRyYW5zUm9vdCA9IGdvLnRyYW5zZm9ybTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tIOajgOa1i+aYr+WQpuW3sue7j+iiq+e8k+WtmFxyXG4gICAgcHVibGljIGNoZWNrSGFzQ2FjaGVkKHBhdGg6c3RyaW5nKXtcclxuXHJcbiAgICAgICAgbGV0IGNhY2hlZEluc3Q6QXJyYXk8YW55PiA9IHRoaXMuX19pbnN0Q2FjaGUuZ2V0KHBhdGgpO1xyXG4gICAgICAgIGlmKGNhY2hlZEluc3QgIT0gdW5kZWZpbmVkICYmIGNhY2hlZEluc3QubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBvb2xlZEdvID0gdGhpcy5fX2dvUG9vbC5nZXQocGF0aCk7XHJcbiAgICAgICAgcmV0dXJuIHBvb2xlZEdvICE9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8tLSDnvJPlrZjlubblrp7kvovljJZHYW1lT2JqZWN0XHJcbiAgICBwdWJsaWMgY2FjaGVBbmRJbnN0R2FtZU9iamVjdChwYXRoOnN0cmluZywgZ286YW55LCBpbnN0X2NvdW50Om51bWJlciA9IDEpe1xyXG5cclxuICAgICAgICB0aGlzLl9fZ29Qb29sLnNldChwYXRoLCBnbyk7XHJcbiAgICAgICAgaWYoaW5zdF9jb3VudCA+IDApe1xyXG5cclxuICAgICAgICAgICAgbGV0IGNhY2hlZEluc3Q6QXJyYXk8YW55PiA9IHRoaXMuX19pbnN0Q2FjaGUuZ2V0KHBhdGgpO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk6bnVtYmVyID0wOyBpIDwgaW5zdF9jb3VudDsgaSsrKXtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgaW5zdCA9IFVuaXR5RW5naW5lLkdhbWVPYmplY3QuSW5zdGFudGlhdGUoZ28pIGFzIFVuaXR5RW5naW5lLkdhbWVPYmplY3Q7XHJcbiAgICAgICAgICAgICAgICBpbnN0LnRyYW5zZm9ybS5TZXRQYXJlbnQodGhpcy5fX2NhY2hlVHJhbnNSb290KTtcclxuICAgICAgICAgICAgICAgIGluc3QuU2V0QWN0aXZlKGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjYWNoZWRJbnN0LnB1c2goaW5zdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLSDlsJ3or5Xku47nvJPlrZjkuK3ojrflj5ZcclxuICAgIHB1YmxpYyB0cnlHZXRGcm9tQ2FjaGUocGF0aDpzdHJpbmcpOmFueXtcclxuXHJcbiAgICAgICAgaWYoIXRoaXMuY2hlY2tIYXNDYWNoZWQocGF0aCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY2FjaGVkSW5zdDpBcnJheTxvYmplY3Q+ICA9IHRoaXMuX19pbnN0Q2FjaGUuZ2V0KHBhdGgpO1xyXG4gICAgICAgIGlmKGNhY2hlZEluc3QgIT0gdW5kZWZpbmVkICYmIGNhY2hlZEluc3QubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGluc3QgPSBjYWNoZWRJbnN0LnBvcCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gaW5zdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwb29sZWRHbyA9IHRoaXMuX19nb1Bvb2wuZ2V0KHBhdGgpO1xyXG4gICAgICAgIGlmKHBvb2xlZEdvICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBpbnN0ID0gVW5pdHlFbmdpbmUuR2FtZU9iamVjdC5JbnN0YW50aWF0ZShwb29sZWRHbyk7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy/pooTliqDovb3vvJrlj6/mj5DkvpvliJ3lp4vlrp7kvovljJbkuKrmlbBcclxuICAgIHB1YmxpYyBhc3luYyBwcmVMb2FkR2FtZU9iamVjdEFzeW5jKHBhdGg6c3RyaW5nLCBpbnN0X2NvdW50Om51bWJlciwgY2FsbGJhY2s6RnVuY3Rpb24sLi4ucGFyYW1zKXtcclxuXHJcbiAgICAgICAgaWYodGhpcy5jaGVja0hhc0NhY2hlZChwYXRoKSl7XHJcbiAgICAgICAgICAgIGlmKGNhbGxiYWNrIT1udWxsKXtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHBhcmFtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGdvID0gYXdhaXQgUmVzTWFuYWdlci5JbnN0YW5jZShSZXNNYW5hZ2VyKS5sb2FkUHJlZmFiKHBhdGgpO1xyXG4gICAgICAgIGlmKGdvIT11bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmNhY2hlQW5kSW5zdEdhbWVPYmplY3QocGF0aCwgZ28saW5zdF9jb3VudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihjYWxsYmFjayE9bnVsbCl7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKHBhcmFtcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLy0tIOW8guatpeiOt+WPlu+8muW/heimgeaXtuWKoOi9vVxyXG4gICAgcHVibGljIGFzeW5jIGdldEdhbWVPYmplY3RBc3luYyhwYXRoOnN0cmluZywgY2FsbGJhY2s6RnVuY3Rpb24sLi4ucGFyYW1zKXtcclxuXHJcbiAgICAgICAgbGV0IGluc3Q6YW55ID0gdGhpcy50cnlHZXRGcm9tQ2FjaGUocGF0aCk7XHJcbiAgICAgICAgaWYoaW5zdCA9PW51bGwpe1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnByZUxvYWRHYW1lT2JqZWN0QXN5bmMocGF0aCwgMSwgY2FsbGJhY2ssIHBhcmFtcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnN0ID0gdGhpcy50cnlHZXRGcm9tQ2FjaGUocGF0aCk7XHJcbiAgICAgICAgaW5zdC5TZXRBY3RpdmUodHJ1ZSk7XHJcblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLy0tIOWbnuaUtlxyXG4gICAgcHVibGljIHJlY3ljbGVHYW1lT2JqZWN0KHBhdGg6c3RyaW5nLCBpbnN0OmFueSl7XHJcblxyXG4gICAgICAgIGluc3QudHJhbnNmb3JtLlNldFBhcmVudCh0aGlzLl9fY2FjaGVUcmFuc1Jvb3QpO1xyXG4gICAgICAgIGluc3QuU2V0QWN0aXZlKGZhbHNlKTtcclxuXHJcbiAgICAgICAgbGV0IGNhY2hlZEluc3QgPSB0aGlzLl9faW5zdENhY2hlLmdldChwYXRoKSB8fCBuZXcgQXJyYXkoKTtcclxuICAgICAgICBjYWNoZWRJbnN0LnB1c2goaW5zdCk7XHJcblxyXG4gICAgICAgIHRoaXMuX19pbnN0Q2FjaGUuc2V0KHBhdGgsIGNhY2hlZEluc3QpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8tLSDmuIXnkIbnvJPlrZhcclxuICAgIHB1YmxpYyBjbGVhbnVwKGluY2x1ZGVQb29sZWRHbzpib29sZWFuID0gZmFsc2Upe1xyXG5cclxuICAgICAgICB0aGlzLl9faW5zdENhY2hlLmZvckVhY2goKHZhbHVlcywga2V5KT0+e1xyXG5cclxuICAgICAgICAgICAgZm9yKGxldCBpbnN0IG9mIHZhbHVlcyl7XHJcbiAgICAgICAgICAgICAgICBpZihpbnN0ICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgIFVuaXR5RW5naW5lLkdhbWVPYmplY3QuRGVzdHJveShpbnN0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX19pbnN0Q2FjaGUuY2xlYXIoKTsgXHJcblxyXG4gICAgICAgIGlmKGluY2x1ZGVQb29sZWRHbyl7XHJcbiAgICAgICAgICAgIHRoaXMuX19nb1Bvb2wuZm9yRWFjaCgoZ28sIGtleSk9PntcclxuXHJcbiAgICAgICAgICAgICAgICBpZihnbyAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgICAgICBSZXNNYW5hZ2VyLkluc3RhbmNlKFJlc01hbmFnZXIpLnJlbGVhc2VBZGRyZXNzR08oZ28pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX19nb1Bvb2wuY2xlYXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJcclxuZXhwb3J0ICBjbGFzcyBMaXN0PFQ+IGV4dGVuZHMgQXJyYXk8VD4ge1xyXG5cdHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0fVxyXG4gXHJcblx0YWRkOkZ1bmN0aW9uID0gZnVuY3Rpb24odmFsdWU6VCk6dm9pZHtcclxuXHRcdHRoaXMucHVzaCh2YWx1ZSk7XHJcblx0fVxyXG4gXHJcblx0aW5zZXJ0OkZ1bmN0aW9uID0gZnVuY3Rpb24oaW5kZXg6bnVtYmVyLCB2YWx1ZTpUKTp2b2lke1xyXG5cdFx0dGhpcy5zcGxpY2UoaW5kZXgsIDAsIHZhbHVlKTtcclxuXHR9XHJcbiBcclxuXHRyZW1vdmU6RnVuY3Rpb24gPSBmdW5jdGlvbih2YWx1ZTpUKTp2b2lke1xyXG5cdFx0dmFyIGluZGV4Om51bWJlciA9IHRoaXMuaW5kZXhPZih2YWx1ZSk7XHJcblx0XHR0aGlzLnJlbW92ZUF0KGluZGV4KTtcclxuXHR9XHJcbiBcclxuXHRyZW1vdmVBdDpGdW5jdGlvbiA9IGZ1bmN0aW9uKGluZGV4Om51bWJlcik6dm9pZHtcclxuXHRcdHRoaXMuc3BsaWNlKGluZGV4LCAxKTtcclxuXHR9XHJcbiBcclxuXHRjb250YWluczpGdW5jdGlvbiA9IGZ1bmN0aW9uKHZhbHVlOlQpOmJvb2xlYW57XHJcblx0XHRyZXR1cm4gdGhpcy5pbmRleE9mKHZhbHVlKT49MDtcclxuXHR9XHJcbiBcclxuXHRwdWJsaWMgZ2V0IGNvdW50KCk6bnVtYmVye1xyXG5cdFx0cmV0dXJuIHRoaXMubGVuZ3RoO1xyXG5cdH1cclxuIFxyXG5cdGNsZWFyOkZ1bmN0aW9uID0gZnVuY3Rpb24oKTp2b2lke1xyXG5cdFx0dGhpcy5zcGxpY2UoMCk7XHJcblx0fVxyXG4gXHJcblx0Zm9yZWFjaDpGdW5jdGlvbiA9IGZ1bmN0aW9uKGNhbGxiYWNrOkZ1bmN0aW9uKTp2b2lkIHtcclxuICAgICAgICB0aGlzLl9icmVha2luZyA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBzdW0gPSB0aGlzLmxlbmd0aDtcclxuICAgICAgICBmb3IodmFyIGk9MDtpPHN1bTtpKyspe1xyXG4gICAgICAgICAgICBpZih0aGlzLl9icmVha2luZyl7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYWxsYmFjayh0aGlzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiBcclxuICAgIF9icmVha2luZzpib29sZWFuID0gZmFsc2U7XHJcbiAgICBicmVhazpGdW5jdGlvbiA9IGZ1bmN0aW9uKCk6dm9pZCB7XHJcbiAgICAgICAgdGhpcy5fYnJlYWtpbmcgPSB0cnVlO1xyXG4gICAgfVxyXG4gXHJcblx0dG9BcnJheTpGdW5jdGlvbiA9IGZ1bmN0aW9uKCk6VFtde1xyXG5cdFx0dmFyIGFycmF5OlRbXSA9IFtdO1xyXG5cdFx0dGhpcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG5cdFx0XHRhcnJheS5wdXNoKGVsZW1lbnQpO1xyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gYXJyYXk7XHJcblx0fVxyXG4gXHJcblx0YXBwZW5kOkZ1bmN0aW9uID0gZnVuY3Rpb24odmFsdWU6VFtdKTp2b2lke1xyXG5cdFx0dmFsdWUuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuXHRcdFx0dGhpcy5wdXNoKGVsZW1lbnQpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcbiIsIlxyXG5cclxuZXhwb3J0IGNsYXNzIE1lc09iantcclxuICAgIHB1YmxpYyBsaXN0ZW5lcnM6QXJyYXk8RnVuY3Rpb24+O1xyXG4gICAgcHVibGljIG9iajphbnk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgTWVzc2VuZ2Vye1xyXG5cclxuICAgIHByaXZhdGUgbGlzdGVuZXJNYXAgPSBuZXcgTWFwPG51bWJlcixNZXNPYmo+KCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZExpc3RlbmVyKGVfdHlwZTpudW1iZXIsIGVfb2JqOmFueSwgZV9saXN0bmVyOkZ1bmN0aW9uKTp2b2lke1xyXG5cclxuICAgICAgICBsZXQgbXNnT2JqID0gdGhpcy5saXN0ZW5lck1hcC5nZXQoZV90eXBlKTtcclxuXHJcbiAgICAgICAgaWYodHlwZW9mKG1zZ09iaikgPT0gXCJ1bmRlZmluZWRcIil7XHJcbiAgICAgICAgICAgIG1zZ09iaiA9IG5ldyBNZXNPYmooKTtcclxuICAgICAgICAgICAgbXNnT2JqLm9iaiA9IGVfb2JqO1xyXG4gICAgICAgICAgICBtc2dPYmoubGlzdGVuZXJzID0gbmV3IEFycmF5PEZ1bmN0aW9uPigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtc2dPYmoubGlzdGVuZXJzLnB1c2goZV9saXN0bmVyKTtcclxuXHJcbiAgICAgICAgdGhpcy5saXN0ZW5lck1hcC5zZXQoZV90eXBlLCBtc2dPYmopO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRMaXN0ZW5lcihlX3R5cGU6bnVtYmVyKTpNZXNPYmp7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdGVuZXJNYXAuZ2V0KGVfdHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGJyb2FkY2FzdChlX3R5cGU6bnVtYmVyLCAuLi5wYXJhbXM6YW55W10pIDogdm9pZCB7XHJcblxyXG4gICAgICAgIGxldCBtc2dPYmogPSB0aGlzLmxpc3RlbmVyTWFwLmdldChlX3R5cGUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHR5cGVvZihtc2dPYmopICE9IFwidW5kZWZpbmVkXCIpe1xyXG4gICAgICAgICAgICBmb3IobGV0IGwgb2YgbXNnT2JqLmxpc3RlbmVycyl7XHJcbiAgICAgICAgICAgICAgIGwuYXBwbHkobXNnT2JqLm9iaiwgcGFyYW1zKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlTGlzdGVuZXJCeVR5cGUoZV90eXBlOm51bWJlcikgOnZvaWQge1xyXG5cclxuICAgICAgICB0aGlzLmxpc3RlbmVyTWFwLmRlbGV0ZShlX3R5cGUpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlTGlzdGVuZXIoZV90eXBlOm51bWJlciwgZV9saXN0ZW5lcjpGdW5jdGlvbiApOnZvaWR7XHJcblxyXG4gICAgICAgIGxldCBtc2dPYmogPSB0aGlzLmxpc3RlbmVyTWFwLmdldChlX3R5cGUpO1xyXG5cclxuICAgICAgICBpZih0eXBlb2YobXNnT2JqKSAhPSBcInVuZGVmaW5lZFwiKXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZvcihsZXQgaTpudW1iZXIgPTA7IGk8IG1zZ09iai5saXN0ZW5lcnMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYobXNnT2JqLmxpc3RlbmVyc1tpXSA9PSBlX2xpc3RlbmVyKXtcclxuICAgICAgICAgICAgICAgICAgICBtc2dPYmoubGlzdGVuZXJzLnNwbGljZShpLDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcnVwKCk6dm9pZHtcclxuXHJcbiAgICAgICAgdGhpcy5saXN0ZW5lck1hcC5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxufSIsIlxyXG5cclxuXHJcbi8vIEZhaXJ5R1VJIOWFg+S7tiDnu5HlrprlmahcclxuZXhwb3J0IGZ1bmN0aW9uIGJpbmRlcihuYW1lOnN0cmluZyl7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24odGFyZ2V0OmFueSwga2V5OnN0cmluZyB8IHN5bWJvbCl7XHJcbiAgICAgICAgdGFyZ2V0W1wiYmluZGVyc1wiXSA9IHRhcmdldFtcImJpbmRlcnNcIl0gfHwge307XHJcbiAgICAgICAgdGFyZ2V0W1wiYmluZGVyc1wiXVtrZXldID0gbmFtZTtcclxuICAgIH1cclxufSIsIlxyXG5pbXBvcnQgeyBTaW5nbGV0b24gfSBmcm9tICcuL1NpbmdsZXRvbic7XHJcbmltcG9ydCB7ICRwcm9taXNlIH0gZnJvbSAncHVlcnRzJztcclxuaW1wb3J0IHtOaWNlVFMsIFVuaXR5RW5naW5lfSBmcm9tICdjc2hhcnAnO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICcuLi9sb2dnZXIvTG9nZ2VyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBSZXNNYW5hZ2VyIGV4dGVuZHMgU2luZ2xldG9uPFJlc01hbmFnZXI+e1xyXG5cclxuICAgIHByaXZhdGUgX3BrZ01hcDpNYXA8c3RyaW5nLG51bWJlcj4gPSBuZXcgTWFwPHN0cmluZyxudW1iZXI+KCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGxvYWRGYWlyeUdVSVBhY2thZ2UocGFja2FnZU5hbWU6c3RyaW5nKXtcclxuXHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICBsZXQgY291bnQgPSB0aGlzLl9wa2dNYXAuZ2V0KHBhY2thZ2VOYW1lKTtcclxuICAgICAgICAgICAgaWYoY291bnQgPT0gbnVsbCB8fCBjb3VudCA8IDEpe1xyXG4gICAgICAgICAgICAgICAgLy/msqHmnInnvJPlrZjvvIzliqDovb1cclxuICAgICAgICAgICAgICAgIGxldCBhZGRyZXNzID0gcGFja2FnZU5hbWUrXCJfZnVpLmJ5dGVzXCI7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFzayA9IE5pY2VUUy5SZXNvdXJjZU1hbmFnZXIuTG9hZEZhaXJ5R1VJUGFja2FnZShhZGRyZXNzLHBhY2thZ2VOYW1lKTtcclxuICAgICAgICAgICAgICAgIGF3YWl0ICRwcm9taXNlKHRhc2spO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wa2dNYXAuc2V0KHBhY2thZ2VOYW1lLCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGtnTWFwLnNldChwYWNrYWdlTmFtZSwgY291bnQrMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9Y2F0Y2goZXgpe1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoYExvYWQgZmFpcnlHVUkgOiR7cGFja2FnZU5hbWV9IDogJHtleH1gKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIHJlbGVhc2VGYWlyeUdVSVBhY2thZ2UocGFja2FnZU5hbWUpe1xyXG5cclxuICAgICAgICBsZXQgY291bnQgPSB0aGlzLl9wa2dNYXAuZ2V0KHBhY2thZ2VOYW1lKTtcclxuICAgICAgICBpZihjb3VudCE9bnVsbCAmJiBjb3VudD4xKXtcclxuICAgICAgICAgICAgdGhpcy5fcGtnTWFwLnNldChwYWNrYWdlTmFtZSwgY291bnQtMSk7XHJcbiAgICAgICAgfWVsc2V7XHJcblxyXG4gICAgICAgICAgICBMb2dnZXIubG9nKGByZWxlYXNlIGZhZ3VpIHBhY2thZ2U6JHtwYWNrYWdlTmFtZX1gKTtcclxuICAgICAgICAgICAgdGhpcy5fcGtnTWFwLmRlbGV0ZShwYWNrYWdlTmFtZSk7XHJcbiAgICAgICAgICAgIE5pY2VUUy5SZXNvdXJjZU1hbmFnZXIuUmVsZWFzZUZHVUlQYWNrYWdlKHBhY2thZ2VOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgbG9hZFNjZW5lKHNjZW5lTmFtZTpzdHJpbmcsIG1vZGUgPSBVbml0eUVuZ2luZS5TY2VuZU1hbmFnZW1lbnQuTG9hZFNjZW5lTW9kZS5TaW5nbGUpe1xyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgdGFzayA9IE5pY2VUUy5SZXNvdXJjZU1hbmFnZXIuTG9hZFNjZW5lKHNjZW5lTmFtZSwgbW9kZSwocHJvZ3Jlc3M6TnVtYmVyKT0+e1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhcImxvYWQgc2NlbmU6IFwiK3Byb2dyZXNzKVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzY2VuSW5zdGFuY2UgPSBhd2FpdCAkcHJvbWlzZSh0YXNrKVxyXG4gICAgICAgICAgICByZXR1cm4gc2Nlbkluc3RhbmNlXHJcblxyXG4gICAgICAgIH1jYXRjaChleCl7XHJcblxyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoYExvYWQgU2NlbmUgOiR7c2NlbmVOYW1lfSA6ICR7ZXh9YClcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgYXN5bmMgdW5sb2FkU2NlbmUoc2NlbmVJbnN0YW5jZTpVbml0eUVuZ2luZS5SZXNvdXJjZU1hbmFnZW1lbnQuUmVzb3VyY2VQcm92aWRlcnMuU2NlbmVJbnN0YW5jZSl7XHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICBsZXQgdGFzaz0gTmljZVRTLlJlc291cmNlTWFuYWdlci5VbmxvYWRTY2VuZShzY2VuZUluc3RhbmNlKVxyXG4gICAgICAgICAgICBsZXQgZ28gPSBhd2FpdCAkcHJvbWlzZSh0YXNrKTtcclxuICAgICAgICAgICAgcmV0dXJuIGdvO1xyXG4gICAgICAgIH1jYXRjaChleCl7XHJcblxyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoYFVubG9hZCBzY2VuZSAgOiAke2V4fWApXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVubG9hZFNjZW5lQnlOYW1lKHNjZW5lTmFtZTpzdHJpbmcpe1xyXG5cclxuICAgICAgICBOaWNlVFMuUmVzb3VyY2VNYW5hZ2VyLlVubG9hZFNjZW5lQnlOYW1lKHNjZW5lTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgbG9hZFByZWZhYihhZGRyZXNzOnN0cmluZyl7XHJcblxyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgbGV0IHRhc2s9IE5pY2VUUy5SZXNvdXJjZU1hbmFnZXIuTG9hZFByZWZhYihhZGRyZXNzKTtcclxuICAgICAgICAgICAgbGV0IGdvID0gYXdhaXQgJHByb21pc2UodGFzayk7XHJcbiAgICAgICAgICAgIHJldHVybiBnbztcclxuICAgICAgICB9Y2F0Y2goZXgpe1xyXG5cclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBMb2FkIHByZWZhYiA6JHthZGRyZXNzfSA6ICR7ZXh9YClcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgbG9hZFRleHRBc3NldChhZGRyZXNzOnN0cmluZyl7XHJcblxyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgbGV0IHRhc2sgPSBOaWNlVFMuUmVzb3VyY2VNYW5hZ2VyLkxvYWRUZXh0QXNzZXQoYWRkcmVzcyk7XHJcbiAgICAgICAgICAgIGxldCBnbyA9IGF3YWl0ICRwcm9taXNlKHRhc2spO1xyXG4gICAgICAgICAgICByZXR1cm4gZ287XHJcbiAgICAgICAgfWNhdGNoKGV4KXtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBMb2FkIHRleHRhc3NldCA6JHthZGRyZXNzfSA6ICR7ZXh9YClcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgYXN5bmMgbG9hZFRleHRCeXRlcyhhZGRyZXNzOnN0cmluZyl7XHJcblxyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgbGV0IHRhc2sgPSBOaWNlVFMuUmVzb3VyY2VNYW5hZ2VyLkxvYWRUZXh0Qnl0ZXMoYWRkcmVzcyk7XHJcbiAgICAgICAgICAgIGxldCBieXRlcyA9IGF3YWl0ICRwcm9taXNlKHRhc2spO1xyXG4gICAgICAgICAgICByZXR1cm4gYnl0ZXM7XHJcbiAgICAgICAgfWNhdGNoKGV4KXtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBMb2FkVGV4dEJ5dGVzIDoke2FkZHJlc3N9IDogJHtleH1gKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBsb2FkU3ByaXRlKGFkZHJlc3M6c3RyaW5nKXtcclxuXHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICBsZXQgdGFzayA9IE5pY2VUUy5SZXNvdXJjZU1hbmFnZXIuTG9hZFNwcml0ZShhZGRyZXNzKTtcclxuICAgICAgICAgICAgbGV0IGdvID0gYXdhaXQgJHByb21pc2UodGFzayk7XHJcbiAgICAgICAgICAgIHJldHVybiBnbztcclxuXHJcbiAgICAgICAgfWNhdGNoKGV4KXtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBMb2FkIHNwcml0ZSA6JHthZGRyZXNzfSA6ICR7ZXh9YClcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHJlbGVhc2VBZGRyZXNzR08oZ286YW55KXtcclxuXHJcbiAgICAgICAgTmljZVRTLlJlc291cmNlTWFuYWdlci5SZWxlYXNlQWRkcmVzc0dPKGdvKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgXHJcbn0iLCJcclxuXHJcbmV4cG9ydCBjbGFzcyBTaW5nbGV0b248VD57XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6YW55ID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEluc3RhbmNlPFQ+KCBjOiB7IG5ldygpOiBUIH0gKSA6IFR7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuaW5zdGFuY2UgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgYygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG59IiwiZXhwb3J0IGNsYXNzIEFycmF5TWFwPEssIFY+XHJcbntcclxuICAgIHByaXZhdGUgX2FycjpBcnJheTxWPiA9IG5ldyBBcnJheTxWPigpO1xyXG4gICAgcHJpdmF0ZSBfbWFwOk1hcDxLLFY+ID0gbmV3IE1hcDxLLFY+KCk7XHJcbiAgICBwdWJsaWMgYWRkKGtleTpLLHZhbHVlOlYpOlZcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9tYXAuc2V0KGtleSwgdmFsdWUpO1xyXG4gICAgICAgIHRoaXMuX2Fyci5wdXNoKHZhbHVlKTtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldChrZXk6Syk6VlxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAuZ2V0KGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZShrZXk6Syk6VlxyXG4gICAge1xyXG4gICAgICAgIHZhciBvYmo9dGhpcy5fbWFwLmdldChrZXkpO1xyXG4gICAgICAgIGlmKCFvYmopcmV0dXJuIG51bGw7XHJcbiAgICAgICAgdmFyIGluZGV4PXRoaXMuX2Fyci5pbmRleE9mKG9iaik7XHJcbiAgICAgICAgdGhpcy5fYXJyLnNwbGljZShpbmRleCwxKTtcclxuICAgICAgICB0aGlzLl9tYXAuZGVsZXRlKGtleSk7XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuaWsOeahOaVsOe7hOWunuS+i1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0QXJyKCk6QXJyYXk8Vj5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYXJyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9hcnIubGVuZ3RoPTA7XHJcbiAgICAgICAgdGhpcy5fbWFwLmNsZWFyKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBBcnJheU1hcCB9IGZyb20gXCIuLi9jb3JlL0FycmF5TWFwXCI7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuLi9sb2dnZXIvTG9nZ2VyXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL0NvbXBvbmVudFwiO1xyXG5cclxudHlwZSBDbGFzczxUPiA9IG5ldyAoLi4uYXJnczogYW55W10pID0+IFQ7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQUVudGl0eXtcclxuICAgIHB1YmxpYyB1dWlkOm51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIGV2ZW50c01hcDpNYXA8c3RyaW5nLEFycmF5PEZ1bmN0aW9uPj4gPSBuZXcgTWFwPHN0cmluZyxBcnJheTxGdW5jdGlvbj4+KCk7XHJcbiAgICBwcml2YXRlIGNvbXBvbmVudHM6TWFwPHN0cmluZyxDb21wb25lbnQ+ID0gbmV3IE1hcDxzdHJpbmcsQ29tcG9uZW50PigpO1xyXG5cclxuICAgIHB1YmxpYyBwYXJlbnQ6QUVudGl0eSA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9jaGlsZHJlbjpBcnJheU1hcDxudW1iZXIsQUVudGl0eT4gPSBuZXcgQXJyYXlNYXA8bnVtYmVyLCBBRW50aXR5PigpO1xyXG4gICAgcHJpdmF0ZSBfdHlwZUNoaWxkcmVuOk1hcDxzdHJpbmcsIEFycmF5PEFFbnRpdHk+PiA9IG5ldyBNYXA8c3RyaW5nLCBBcnJheTxBRW50aXR5Pj4oKTtcclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3Qgb25Bd2FrZShpbml0RGF0YTphbnkpXHJcblxyXG5cclxuICAgIHB1YmxpYyBhZGRDaGlsZDxUPihjaGlsZDpBRW50aXR5LGM6IHtuZXcoKTpUO30pe1xyXG4gICAgICAgIGNoaWxkLnBhcmVudCA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5fY2hpbGRyZW4uYWRkKGNoaWxkLnV1aWQsIGNoaWxkKTtcclxuXHJcbiAgICAgICAgbGV0IGNoaWxkcmVuQXJyID0gdGhpcy5fdHlwZUNoaWxkcmVuLmdldChjLm5hbWUpO1xyXG4gICAgICAgIGlmKGNoaWxkcmVuQXJyID09IG51bGwpe1xyXG4gICAgICAgICAgICBjaGlsZHJlbkFyciA9IG5ldyBBcnJheTxBRW50aXR5PigpO1xyXG4gICAgICAgICAgICB0aGlzLl90eXBlQ2hpbGRyZW4uc2V0KGMubmFtZSwgY2hpbGRyZW5BcnIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjaGlsZHJlbkFyci5wdXNoKGNoaWxkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlQ2hpbGQoY2hpbGQ6QUVudGl0eSl7XHJcbiAgICAgICAgbGV0IGVudGl0eSA9IHRoaXMuX2NoaWxkcmVuLnJlbW92ZShjaGlsZC51dWlkKTtcclxuICAgICAgICBlbnRpdHkuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDaGlsZHJlbigpOkFycmF5PEFFbnRpdHk+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbi5nZXRBcnIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q2hpbGRCeVVVSUQodXVpZDpudW1iZXIpOkFFbnRpdHl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuLmdldCh1dWlkKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldENoaWxkcmVuQnlUeXBlPFQgZXh0ZW5kcyBBRW50aXR5PihjOiB7bmV3KCk6VDt9KTpBcnJheTxBRW50aXR5PntcclxuICAgICAgICByZXR1cm4gdGhpcy5fdHlwZUNoaWxkcmVuLmdldChjLm5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDaGlsZEJ5VHlwZTxUIGV4dGVuZHMgQUVudGl0eT4oYzoge25ldygpOlQ7fSk6QUVudGl0eXtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRDaGlsZHJlbkJ5VHlwZShjKVswXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgIGFkZENvbXBvbmVudDxUIGV4dGVuZHMgQ29tcG9uZW50PihjOiB7bmV3KCk6VDt9KSA6VCB7XHJcbiAgICAgICAgbGV0IGNjID0gbmV3IGMoKTtcclxuICAgICAgICBjYy5lbnRpdHkgPSB0aGlzO1xyXG5cclxuICAgICAgICB0aGlzLmNvbXBvbmVudHNbYy5uYW1lXSA9IGNjO1xyXG4gICAgICAgIHJldHVybiBjYztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q29tcG9uZW50PFQgZXh0ZW5kcyBDb21wb25lbnQ+KGM6IHtuZXcoKTpUO30pIDogVCB7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudHNbYy5uYW1lXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0T3JBZGRDb21wb25lbnQ8VCBleHRlbmRzIENvbXBvbmVudD4oYzoge25ldygpOlQ7fSkgOiBUIHtcclxuICAgICAgICBsZXQgY29tID0gdGhpcy5nZXRDb21wb25lbnQ8VD4oYyk7XHJcbiAgICAgICAgaWYoY29tID09IG51bGwpe1xyXG4gICAgICAgICAgIGNvbSA9IHRoaXMuYWRkQ29tcG9uZW50PFQ+KGMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29tO1xyXG4gICAgfVxyXG4gXHJcbiAgICBwdWJsaWMgcHVibGlzaDxUPihldmVudDpULCBjOiB7bmV3KCk6VDt9KXtcclxuXHJcbiAgICAgICAgbGV0IGFycmF5ID0gdGhpcy5ldmVudHNNYXAuZ2V0KGMubmFtZSk7XHJcbiAgICAgICAgaWYoYXJyYXk9PW51bGwgfHwgYXJyYXkubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgICBMb2dnZXIubG9nKFwidGhpcyBldmVudCBub3Qgc3Vic2NyaWJlZC4uLlwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxhcnJheS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBmID0gYXJyYXlbaV07XHJcbiAgICAgICAgICAgIGlmKGYgIT0gbnVsbCkgZihldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdWJzY3JpYmU8VD4oYWN0aW9uOih0OlQpPT52b2lkLCBjOiB7bmV3KCk6VDt9KXtcclxuXHJcbiAgICAgICAgbGV0IGFycmF5ID0gdGhpcy5ldmVudHNNYXAuZ2V0KGMubmFtZSk7XHJcbiAgICAgICAgaWYoYXJyYXkgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIGFycmF5ID0gbmV3IEFycmF5PEZ1bmN0aW9uPigpO1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50c01hcC5zZXQoYy5uYW1lLGFycmF5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXJyYXkucHVzaChhY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1blN1YnNjcmliZTxUPihhY3Rpb246KHQ6VCk9PnZvaWQsIGM6IHtuZXcoKTpUO30pe1xyXG5cclxuICAgICAgICBsZXQgYXJyYXkgPSB0aGlzLmV2ZW50c01hcC5nZXQoYy5uYW1lKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgaW5kZXggPSBhcnJheS5pbmRleE9mKGFjdGlvbiwgMCk7XHJcbiAgICAgICAgaWYoaW5kZXggPiAtMSl7XHJcbiAgICAgICAgICAgIGFycmF5LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpe1xyXG5cclxuICAgICAgICBsZXQgY2hpbGRyZW49IHRoaXMuZ2V0Q2hpbGRyZW47XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8Y2hpbGRyZW4ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBjaGlsZHJlbltpXS5kaXNwb3NlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvbXBvbmVudHMuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLmV2ZW50c01hcC5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuX3R5cGVDaGlsZHJlbi5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuX2NoaWxkcmVuLmRpc3Bvc2UoKTtcclxuICAgICAgICB0aGlzLnBhcmVudCA9IG51bGw7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBBRW50aXR5IH0gZnJvbSBcIi4vQUVudGl0eVwiO1xyXG5cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDb21wb25lbnR7XHJcblxyXG4gICAgcHVibGljIGVudGl0eTpBRW50aXR5O1xyXG4gICBcclxuICAgIHB1YmxpYyBwdWJsaXNoPFQ+KGV2ZW50OlQsIGM6IHtuZXcoKTpUO30pe1xyXG5cclxuICAgICAgICB0aGlzLmVudGl0eS5wdWJsaXNoKGV2ZW50LCBjKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3Vic2NyaWJlPFQ+KGFjdGlvbjoodDpUKT0+dm9pZCwgYzoge25ldygpOlQ7fSl7XHJcblxyXG4gICAgICAgIHRoaXMuZW50aXR5LnN1YnNjcmliZTxUPihhY3Rpb24sIGMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1blN1YnNjcmliZTxUPihhY3Rpb246KHQ6VCk9PnZvaWQsIGM6IHtuZXcoKTpUO30pe1xyXG5cclxuICAgICAgIHRoaXMuZW50aXR5LnVuU3Vic2NyaWJlPFQ+KGFjdGlvbiwgYyk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTaW5nbGV0b24gfSBmcm9tIFwiLi4vY29tbW9uL1NpbmdsZXRvblwiO1xyXG5pbXBvcnQgeyBBRW50aXR5IH0gZnJvbSBcIi4vQUVudGl0eVwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBFbnRpdHlGYWN0b3J5IGV4dGVuZHMgU2luZ2xldG9uPEVudGl0eUZhY3Rvcnk+e1xyXG4gICAgcHJpdmF0ZSBhdXRvSUQ6bnVtYmVyID0gMDtcclxuXHJcbiAgICBwdWJsaWMgY3JlYXRlPFQgZXh0ZW5kcyBBRW50aXR5PiAoIGM6IHtuZXcoKTpUO30pIDogVCB7XHJcbiAgICAgICAgbGV0IGNjID0gbmV3IGMoKTtcclxuICAgICAgICBjYy51dWlkID0gKyt0aGlzLmF1dG9JRDtcclxuXHJcbiAgICAgICAgY2Mub25Bd2FrZShudWxsKTtcclxuICAgICAgICByZXR1cm4gY2M7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNyZWF0ZVdpdGhEYXRhPFQgZXh0ZW5kcyBBRW50aXR5PiAoaW5pdERhdGE6YW55LCBjOiB7bmV3KCk6VDt9KSA6IFQge1xyXG4gICAgICAgIGxldCBjYyA9IG5ldyBjKCk7XHJcbiAgICAgICAgY2MudXVpZCA9ICsrdGhpcy5hdXRvSUQ7XHJcbiAgICAgICAgY2Mub25Bd2FrZShpbml0RGF0YSk7XHJcbiAgICAgICAgcmV0dXJuIGNjO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG59IiwiaW1wb3J0IHsgVW5pdHlFbmdpbmUgfSBmcm9tICdjc2hhcnAnO1xyXG5pbXBvcnQgeyBHYW1lQ29uZmlnIH0gZnJvbSAnLi4vLi4vZ2xvYmFsL0dhbWVDb25maWcnO1xyXG5lbnVtIExvZ1R5cGUge1xyXG5cdEVycm9yID0gMCxcclxuXHRBc3NlcnQgPSAxLFxyXG5cdFdhcm5pbmcgPSAyLFxyXG5cdExvZyA9IDMsXHJcblx0RXhjZXB0aW9uID0gNFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTG9nZ2Vye1xyXG4gICAgcHJpdmF0ZSAgc3RhdGljICB1bml0eV9sb2dfdGFyZ2V0ID0gbnVsbDtcclxuXHJcbiAgICBzdGF0aWMgZ2V0UHJpbnRTdGFjayh0eXBlOiBMb2dUeXBlLCBzaG93U3RhY2sgOiBib29sZWFuLCAuLi5hcmdzKSB7XHJcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSAnJztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGFyZ3NbaV07XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ29iamVjdCcgJiYgTG9nZ2VyLkxPR19PQkpFQ1RfVE9fSlNPTikge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSArPSBKU09OLnN0cmluZ2lmeShlbGVtZW50KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgKz0gZWxlbWVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaSA8IGFyZ3MubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSArPSAnICc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBpZiAoc2hvd1N0YWNrIHx8IFVuaXR5RW5naW5lLkFwcGxpY2F0aW9uLmlzRWRpdG9yKSB7XHJcbiAgICAgICAgICAgIHZhciBzdGFja3MgPSBuZXcgRXJyb3IoKS5zdGFjay5zcGxpdCgnXFxuJyk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAzOyBpIDwgc3RhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lID0gc3RhY2tzW2ldO1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSArPSAnXFxuJztcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgKz0gbGluZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGlmICghTG9nZ2VyLnVuaXR5X2xvZ190YXJnZXQpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLnVuaXR5X2xvZ190YXJnZXQgPSBuZXcgVW5pdHlFbmdpbmUuT2JqZWN0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWVzc2FnZTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcblx0c3RhdGljIGxvZyguLi5hcmdzKTogdm9pZHtcclxuICAgICAgICBpZighR2FtZUNvbmZpZy5kZWJ1ZykgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgbXNnID0gTG9nZ2VyLmdldFByaW50U3RhY2soTG9nVHlwZS5Mb2csIHRydWUsIGFyZ3MpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XHJcbiAgICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE91dHB1dHMgYSB3YXJuaW5nIG1lc3NhZ2UgdG8gdGhlIExvZ2dlci5cclxuXHQgKiBAcGFyYW0gbWVzc2FnZSAgbGlzdCBvZiBKYXZhU2NyaXB0IG9iamVjdHMgdG8gb3V0cHV0LiBUaGUgc3RyaW5nIHJlcHJlc2VudGF0aW9ucyBvZiBlYWNoIG9mIHRoZXNlIG9iamVjdHMgYXJlIGFwcGVuZGVkIHRvZ2V0aGVyIGluIHRoZSBvcmRlciBsaXN0ZWQgYW5kIG91dHB1dC5cclxuXHQgKi9cclxuXHRzdGF0aWMgd2FybiguLi5hcmdzKTogdm9pZHtcclxuICAgICAgICBpZighR2FtZUNvbmZpZy5kZWJ1ZykgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgbXNnID0gTG9nZ2VyLmdldFByaW50U3RhY2soTG9nVHlwZS5XYXJuaW5nLCB0cnVlLCBhcmdzKTtcclxuICAgICAgICBjb25zb2xlLndhcm4obXNnKTtcclxuICAgIH1cclxuXHJcblx0LyoqXHJcblx0ICogT3V0cHV0cyBhbiBlcnJvciBtZXNzYWdlIHRvIHRoZSBMb2dnZXIuXHJcblx0ICogQHBhcmFtIG1lc3NhZ2UgQSBsaXN0IG9mIEphdmFTY3JpcHQgb2JqZWN0cyB0byBvdXRwdXQuIFRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb25zIG9mIGVhY2ggb2YgdGhlc2Ugb2JqZWN0cyBhcmUgYXBwZW5kZWQgdG9nZXRoZXIgaW4gdGhlIG9yZGVyIGxpc3RlZCBhbmQgb3V0cHV0LlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBlcnJvciguLi5hcmdzKTogdm9pZHtcclxuICAgICAgICBpZighR2FtZUNvbmZpZy5kZWJ1ZykgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgbXNnID0gTG9nZ2VyLmdldFByaW50U3RhY2soTG9nVHlwZS5FcnJvciwgdHJ1ZSwgYXJncyk7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihtc2cpO1xyXG4gICAgfVxyXG5cclxuXHQvKiogT3V0cHV0cyBhIHN0YWNrIHRyYWNlIHRvIHRoZSBMb2dnZXIuXHJcblx0ICogQHBhcmFtIG1lc3NhZ2UgQSBsaXN0IG9mIEphdmFTY3JpcHQgb2JqZWN0cyB0byBvdXRwdXQuIFRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb25zIG9mIGVhY2ggb2YgdGhlc2Ugb2JqZWN0cyBhcmUgYXBwZW5kZWQgdG9nZXRoZXIgaW4gdGhlIG9yZGVyIGxpc3RlZCBhbmQgb3V0cHV0LlxyXG5cdCovXHJcblx0c3RhdGljIHRyYWNlKC4uLmFyZ3MpOiB2b2lke1xyXG4gICAgICAgIGlmKCFHYW1lQ29uZmlnLmRlYnVnKSByZXR1cm47XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IG1zZyA9IExvZ2dlci5nZXRQcmludFN0YWNrKExvZ1R5cGUuTG9nLCB0cnVlLCBhcmdzKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xyXG4gICAgfVxyXG5cclxuXHQvKiogTG9nIEphdmFTY3JpcHQgT2JqZWN0cyBhcyBKU09OIGZvcm1hdCAqL1xyXG5cdHN0YXRpYyBMT0dfT0JKRUNUX1RPX0pTT04oLi4uYXJncyk6IGJvb2xlYW57XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBTaW5nbGV0b24gfSBmcm9tIFwiLi4vY29tbW9uL1NpbmdsZXRvblwiO1xyXG5pbXBvcnQgeyBPcGNvZGUgfSBmcm9tIFwiLi4vLi4vZGF0YS9wYi9PcGNvZGVcIjtcclxuaW1wb3J0IHsgTmV0RXJyb3JDb2RlIH0gZnJvbSBcIi4vTmV0RXJyb3JDb2RlXCI7XHJcbmltcG9ydCB7IE5pY2VUUyB9IGZyb20gXCJjc2hhcnBcIjtcclxuaW1wb3J0IHsgTWVzc2FnZVBhcnNlciB9IGZyb20gXCIuL01lc3NhZ2VQYXJzZXJcIjtcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4uL2xvZ2dlci9Mb2dnZXJcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgTXNnUGFja3tcclxuICAgIHB1YmxpYyBzZW5kVGltZTpudW1iZXI7XHJcbiAgICBwdWJsaWMgY2FsbGJhY2s6RnVuY3Rpb247XHJcbiAgICBwdWJsaWMgcmV0cnlUaW1lczpudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGJ5dGVzOlVpbnQ4QXJyYXk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBHYW1lU2Vzc2lvbiBleHRlbmRzIFNpbmdsZXRvbjxHYW1lU2Vzc2lvbj57XHJcblxyXG4gICAgcHVibGljIGlkOm51bWJlciA9IDA7ICAvL3Nlc3Npb24gSURcclxuICAgIHByaXZhdGUgcmVTZW5kSW50ZXJ2YWw6bnVtYmVyID0gMTAwMDA7IC8vMTDnp5Lph43lj5HkuIDmrKFcclxuICAgIHByaXZhdGUgdGltZW91dEludGVydmFsOm51bWJlciA9IDUwMDA7IC8vNeenkuajgOafpeS4gOasoeaYr+WQpui2heaXtlxyXG4gICAgcHJpdmF0ZSBtYXhSZVNlbmRUaW1lczpudW1iZXIgPSA1OyAvL+acgOWkp+mHjeWPkeasoeaVsFxyXG4gICAgcHJpdmF0ZSB0aW1lb3V0SWltZXI6YW55O1xyXG5cclxuICAgIHByaXZhdGUgX3JwY0lkOm51bWJlciA9IDE7XHJcbiAgICBwcml2YXRlIGNoYW5uZWw6YW55O1xyXG4gICAgcHJpdmF0ZSByZXF1ZXN0Q2FsbGJhY2s6TWFwPG51bWJlcixNc2dQYWNrPiA9IG5ldyBNYXA8bnVtYmVyLE1zZ1BhY2s+KCk7XHJcbiAgICBwcml2YXRlIGxpc3RlbmVyczpNYXA8bnVtYmVyLEZ1bmN0aW9uPiA9IG5ldyBNYXA8bnVtYmVyLEZ1bmN0aW9uPigpO1xyXG5cclxuICAgIC8v6L+U5Zue55qE5pyN5Yqh5ZmoSUQsIOexu+Wei1xyXG4gICAgcHJpdmF0ZSBfc2VydmVySWQ6bnVtYmVyID0gLTE7XHJcbiAgICBwcml2YXRlIF9zZXJ2ZXJUeXBlOm51bWJlciA9IDE7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcnBjSWQoKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuICsrdGhpcy5fcnBjSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy9hZGRyZXNzLT4gaXA6cG9ydFxyXG4gICAgcHVibGljIGNvbm5lY3RDaGFubmVsKGFkZHJlc3M6c3RyaW5nLCBjb25uQ2FiYWNrOmFueSl7XHJcblxyXG4gICAgICAgIHRoaXMuY2hhbm5lbCA9IE5pY2VUUy5UU2VydmljZS5JbnN0YW5jZS5HZXRDaGFubmVsKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jaGFubmVsLmVycm9yQ2FsbGJhY2sgPSAoY2hhbm5lbDphbnksIGNvZGU6bnVtYmVyKT0+e1xyXG4gICAgICAgICAgICBpZihjb2RlID09IE5ldEVycm9yQ29kZS5FUlJfU29ja2V0Q29ublN1Y2Mpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lb3V0SWltZXIgPSBzZXRJbnRlcnZhbCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tUaW1lb3V0TXNnKCk7XHJcbiAgICAgICAgICAgICAgICB9LCB0aGlzLnRpbWVvdXRJbnRlcnZhbCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbm5DYWJhY2soY2hhbm5lbCwgY29kZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmNoYW5uZWwucmVhZENhbGxiYWNrID0gKGJ1ZmZlcjpVaW50OEFycmF5KT0+e1xyXG4gICAgICAgICAgICB0aGlzLm9uUmVjZWl2ZShidWZmZXIpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuY2hhbm5lbC5Db25uZWN0KGFkZHJlc3MpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvL+aOpeaUtuacjeWKoeWZqOmAmuefpVxyXG4gICAgcHVibGljIGxpc3RlbihvcGNvZGU6bnVtYmVyLGNhbGxiYWNrOkZ1bmN0aW9uKXtcclxuICAgICAgICB0aGlzLmxpc3RlbmVycy5zZXQob3Bjb2RlLCBjYWxsYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lj5HpgIFwcm90b3ViZua2iOaBr1xyXG4gICAgLy/mtojmga/vvJogcnBjX2lkWzRdIC0gb3Bjb2RlWzJdIC0gc2VydmVyX2lkWzJdIC0gc2VydmVyX3R5cGVbMV0gLSBcclxuICAgIHB1YmxpYyBzZW5kKG9wY29kZTpudW1iZXIscnBjaWQ6bnVtYmVyLCBtZXNzYWdlOlVpbnQ4QXJyYXksIGNhbGxCYWNrOkZ1bmN0aW9uKXtcclxuICAgICAgICBcclxuICAgICAgICAvL+Wwgeijhea2iOaBr++8mlxyXG4gICAgICAgIGxldCBycGNCdWY6VWludDhBcnJheSA9IE1lc3NhZ2VQYXJzZXIuZW5jb2RlSW50KHJwY2lkKTsgLy80XHJcbiAgICAgICAgbGV0IG9wY29kZUJ1ZjpVaW50OEFycmF5ID0gTWVzc2FnZVBhcnNlci5lbmNvZGVTaG9ydChvcGNvZGUpOyAvLzJcclxuICAgICAgICBsZXQgc2VydmVyaWRCdWY6VWludDhBcnJheSA9IE1lc3NhZ2VQYXJzZXIuZW5jb2RlU2hvcnQodGhpcy5fc2VydmVySWQpOyAvLzJcclxuICAgICAgICBsZXQgc2VydmVydHlwZUJ1ZjpVaW50OEFycmF5ID0gTWVzc2FnZVBhcnNlci5lbmNvZGVCeXRlKHRoaXMuX3NlcnZlclR5cGUpOyAvLzFcclxuXHJcblxyXG4gICAgICAgIGxldCBzZW5kQXJyYXk6VWludDhBcnJheSA9IG5ldyBVaW50OEFycmF5KDQgKyAyICsgMiArIDEgK21lc3NhZ2UubGVuZ3RoKTtcclxuICAgICAgICBzZW5kQXJyYXkuc2V0KHJwY0J1Zik7XHJcbiAgICAgICAgc2VuZEFycmF5LnNldChvcGNvZGVCdWYsICAgIDQpO1xyXG4gICAgICAgIHNlbmRBcnJheS5zZXQoc2VydmVyaWRCdWYsICA0ICsgMik7XHJcbiAgICAgICAgc2VuZEFycmF5LnNldChzZXJ2ZXJ0eXBlQnVmLCA0ICsgMiArIDIpO1xyXG4gICAgICAgIHNlbmRBcnJheS5zZXQobWVzc2FnZSwgICAgICAgNCArIDIgKyAyICsgMSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoY2FsbEJhY2sgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIGxldCBtc2dQYWNrOk1zZ1BhY2sgPSBuZXcgTXNnUGFjaygpO1xyXG4gICAgICAgICAgICBtc2dQYWNrLnNlbmRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgIG1zZ1BhY2suY2FsbGJhY2sgPSBjYWxsQmFjaztcclxuICAgICAgICAgICAgbXNnUGFjay5ieXRlcyA9IHNlbmRBcnJheTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdENhbGxiYWNrLnNldChycGNpZCwgbXNnUGFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGZvcihsZXQgaSBpbiBzZW5kQXJyYXkpe1xyXG4gICAgICAgIC8vICAgICBMb2dnZXIubG9nKFwiVFMgLS0gc2VuZCBhcnJheTogXCIraSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vTG9nZ2VyLmxvZyhcInNlbmQgYXJyYXk6IFwiK3NlbmRBcnJheSk7XHJcbiAgICAgICAgdGhpcy5jaGFubmVsLlNlbmQoc2VuZEFycmF5KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlU2VuZChieXRlczpVaW50OEFycmF5KXtcclxuICAgICAgICB0aGlzLmNoYW5uZWwuU2VuZChieXRlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uUmVjZWl2ZShidWZmZXI6VWludDhBcnJheSl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IG1zZ0J1ZiA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlcik7XHJcblxyXG4gICAgICAgIGxldCBycGNpZCA9IE1lc3NhZ2VQYXJzZXIuZGVjb2RlSW50KG1zZ0J1Zi5zdWJhcnJheSgwLDQpKTtcclxuICAgICAgICBsZXQgb3Bjb2RlID0gTWVzc2FnZVBhcnNlci5kZWNvZGVTaG9ydChtc2dCdWYuc3ViYXJyYXkoNCw2KSk7XHJcbiAgICAgICAgbGV0IHNlcnZlcmlkID0gTWVzc2FnZVBhcnNlci5kZWNvZGVTaG9ydChtc2dCdWYuc3ViYXJyYXkoNiw4KSk7XHJcbiAgICAgICAgbGV0IHNlcnZlcnR5cGUgPSBNZXNzYWdlUGFyc2VyLmRlY29kZUJ5dGUobXNnQnVmLnN1YmFycmF5KDgsOSkpO1xyXG5cclxuICAgICAgICB0aGlzLl9zZXJ2ZXJJZCA9IHNlcnZlcmlkO1xyXG4gICAgICAgIHRoaXMuX3NlcnZlclR5cGUgPSBzZXJ2ZXJ0eXBlO1xyXG5cclxuICAgICAgICBsZXQgbXNnQnl0ZXM6VWludDhBcnJheSA9IG1zZ0J1Zi5zdWJhcnJheSg5KTtcclxuXHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICBsZXQgZGVjb2RlTXNnID0gIE9wY29kZS5kZWNvZGUob3Bjb2RlLCBtc2dCeXRlcyk7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYocnBjaWQ9PXVuZGVmaW5lZCB8fCAhdGhpcy5yZXF1ZXN0Q2FsbGJhY2suaGFzKHJwY2lkKSl7XHJcbiAgICAgICAgICAgICAgICAvL+ajgOafpeaYr+WQpuaYr+acjeWKoeWZqOS4i+WPkeeahOa2iOaBr1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5saXN0ZW5lcnMuaGFzKG9wY29kZSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsaXN0ZW4gPSB0aGlzLmxpc3RlbmVycy5nZXQob3Bjb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW4oZGVjb2RlTXNnLm1zZ09iaik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBsZXQgbXNnUGFjazpNc2dQYWNrID0gdGhpcy5yZXF1ZXN0Q2FsbGJhY2suZ2V0KHJwY2lkKTtcclxuICAgICAgICAgICAgICAgIG1zZ1BhY2suY2FsbGJhY2soZGVjb2RlTXNnLm1zZ09iaik7ICBcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0Q2FsbGJhY2suZGVsZXRlKHJwY2lkKTtcclxuICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWNhdGNoKGUpe1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJwYXJzZSBtc2cgZXJyb3IsIG9wY29kZTpcIitvcGNvZGUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrVGltZW91dE1zZygpe1xyXG5cclxuICAgICAgICBsZXQgY3VyclRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZXF1ZXN0Q2FsbGJhY2suZm9yRWFjaCgodmFsdWUsIGtleSkgPT57XHJcblxyXG4gICAgICAgICAgICBpZih2YWx1ZS5yZXRyeVRpbWVzID49IHRoaXMubWF4UmVTZW5kVGltZXMpIHtcclxuICAgICAgICAgICAgICAgIC8v6LaF6L+H5pyA5aSn6YeN5Y+R5qyh5pWw77yM5Lii5byDXHJcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKGBNZXNzYWdlIHJlc2VuZCB0b28gbW9yZSwgb3Bjb2RlOiR7a2V5fSwgbGFzdHNlbmQ6JHt2YWx1ZS5zZW5kVGltZX1gKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdENhbGxiYWNrLmRlbGV0ZShrZXkpOyBcclxuICAgICAgICAgICAgfWVsc2V7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoKGN1cnJUaW1lIC0gdmFsdWUuc2VuZFRpbWUpID49IHRoaXMucmVTZW5kSW50ZXJ2YWwpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLnJldHJ5VGltZXMrKztcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZS5zZW5kVGltZSA9IGN1cnJUaW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6YeN5Y+R5raI5oGvXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZVNlbmQodmFsdWUuYnl0ZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5sb2coYHJlc2VuZCBtZXNzYWdlOiwgb3Bjb2RlOiR7a2V5fSwgcmV0cnkgdGltZXM6JHt2YWx1ZS5yZXRyeVRpbWVzfWApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBkaXNjb25uZWN0KCk6dm9pZHtcclxuXHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVvdXRJaW1lcik7XHJcblxyXG4gICAgICAgIHRoaXMuY2hhbm5lbC5EaXNwb3NlKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBOaWNlVFMgfSBmcm9tIFwiY3NoYXJwXCI7XHJcbmltcG9ydCB7ICRwcm9taXNlIH0gZnJvbSBcInB1ZXJ0c1wiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi4vbG9nZ2VyL0xvZ2dlclwiO1xyXG5pbXBvcnQgeyBTaW5nbGV0b24gfSBmcm9tIFwiLi4vY29tbW9uL1NpbmdsZXRvblwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEh0dHBNYW5hZ2VyIGV4dGVuZHMgU2luZ2xldG9uPEh0dHBNYW5hZ2VyPntcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBhc3luYyBnZXQodXJsOnN0cmluZyl7XHJcblxyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgbGV0IHRhc2s9IE5pY2VUUy5IdHRwTWFuYWdlci5HZXQodXJsKVxyXG4gICAgICAgICAgICBsZXQgdHh0ID0gYXdhaXQgJHByb21pc2UodGFzayk7XHJcbiAgICAgICAgICAgIHJldHVybiB0eHQ7XHJcbiAgICAgICAgfWNhdGNoKGV4KXtcclxuXHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihgR2V0IGVycm9yIDoke3VybH0gOiAke2V4fWApXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHBvc3QodXJsOnN0cmluZywgZm9ybTpzdHJpbmcpe1xyXG5cclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGxldCB0YXNrPSBOaWNlVFMuSHR0cE1hbmFnZXIuUG9zdCh1cmwsIGZvcm0pXHJcbiAgICAgICAgICAgIGxldCB0eHQgPSBhd2FpdCAkcHJvbWlzZSh0YXNrKTtcclxuICAgICAgICAgICAgcmV0dXJuIHR4dDtcclxuXHJcbiAgICAgICAgfWNhdGNoKGV4KXtcclxuXHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihgUG9zdCBlcnJvciA6JHt1cmx9IDogJHtleH1gKVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJcclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VQYXJzZXJ7XHJcblxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZW5jb2RlSW50KG46bnVtYmVyKTpVaW50OEFycmF5e1xyXG5cclxuICAgICAgICBsZXQgYnVmZmVyOlVpbnQ4QXJyYXkgPSBuZXcgVWludDhBcnJheSg0KTtcclxuICAgICAgICBidWZmZXJbMF0gPSBuID4+PiAyNDtcclxuICAgICAgICBidWZmZXJbMV0gPSBuID4+PiAxNjtcclxuICAgICAgICBidWZmZXJbMl0gPSBuID4+PiA4O1xyXG4gICAgICAgIGJ1ZmZlclszXSA9IG4gJiAweGZmO1xyXG5cclxuICAgICAgICByZXR1cm4gYnVmZmVyXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBkZWNvZGVJbnQoYnVmZmVyOlVpbnQ4QXJyYXkpOm51bWJlcntcclxuICAgICAgICBcclxuICAgICAgICBsZXQgbiA9IGJ1ZmZlclswXSA8PCAyNCB8IGJ1ZmZlclsxXSA8PCAxNiB8IGJ1ZmZlclsyXSA8PCA4IHwgYnVmZmVyWzNdO1xyXG5cclxuICAgICAgICByZXR1cm4gbjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBlbmNvZGVTaG9ydChuOm51bWJlcik6VWludDhBcnJheXtcclxuXHJcbiAgICAgICAgbGV0IGJ1ZmZlciA6IFVpbnQ4QXJyYXkgPSBuZXcgVWludDhBcnJheSgyKTtcclxuICAgICAgICBidWZmZXJbMF0gPSBuID4+PiA4O1xyXG4gICAgICAgIGJ1ZmZlclsxXSA9IG4gJiAweGZmO1xyXG5cclxuICAgICAgICByZXR1cm4gYnVmZmVyO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGRlY29kZVNob3J0KGJ1ZmZlcjpVaW50OEFycmF5KTpudW1iZXJ7XHJcblxyXG4gICAgICAgIGxldCBuID0gYnVmZmVyWzBdIDw8IDggfCBidWZmZXJbMV07XHJcblxyXG4gICAgICAgIHJldHVybiBuO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGVuY29kZUJ5dGUobjpudW1iZXIpOlVpbnQ4QXJyYXl7XHJcblxyXG4gICAgICAgIGxldCBidWZmZXIgOiBVaW50OEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoMSlcclxuICAgICAgICBidWZmZXJbMF0gPSBuICYgMHhmZjtcclxuXHJcbiAgICAgICAgcmV0dXJuIGJ1ZmZlcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGRlY29kZUJ5dGUoYnVmZmVyOlVpbnQ4QXJyYXkpOm51bWJlcntcclxuXHJcbiAgICAgICAgbGV0IG4gPSBidWZmZXJbMF07XHJcblxyXG4gICAgICAgIHJldHVybiBuO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG59IiwiXHJcblxyXG4gZXhwb3J0IGNsYXNzIE5ldEVycm9yQ29kZVxyXG4ge1xyXG4gICAgIHB1YmxpYyBzdGF0aWMgIEVSUl9Tb2NrZXRDb25uU3VjYzpudW1iZXIgPSAxMDAwMDA7XHJcblxyXG4gICAgIHB1YmxpYyBzdGF0aWMgIEVSUl9Db25uZWN0R2F0ZUtleUVycm9yOm51bWJlciA9IDEwMDAwNjtcclxuXHJcbiAgICAgcHVibGljIHN0YXRpYyAgRVJSX1BlZXJEaXNjb25uZWN0Om51bWJlciAgID0gMTAyMDA4O1xyXG4gICAgIHB1YmxpYyBzdGF0aWMgIEVSUl9Tb2NrZXRDYW50U2VuZDpudW1iZXIgICA9IDEwMjAwOTtcclxuICAgICBwdWJsaWMgc3RhdGljICBFUlJfU29ja2V0RXJyb3I6bnVtYmVyICAgICAgPSAxMDIwMTA7XHJcbiAgICAgcHVibGljIHN0YXRpYyAgRVJSX1NvY2tldENvbm5FcnJvcjpudW1iZXIgID0gMTAyMDExO1xyXG5cclxuXHJcbiAgICAgXHJcblxyXG4gfSIsIlxyXG5pbXBvcnQgeyBPcGNvZGUgfSBmcm9tIFwiLi4vLi4vZGF0YS9wYi9PcGNvZGVcIjtcclxuaW1wb3J0IHsgR2FtZUNvbmZpZyB9IGZyb20gXCIuLi8uLi9nbG9iYWwvR2FtZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBTaW5nbGV0b24gfSBmcm9tIFwiLi4vY29tbW9uL1NpbmdsZXRvblwiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi4vbG9nZ2VyL0xvZ2dlclwiO1xyXG5pbXBvcnQgeyBHYW1lU2Vzc2lvbiB9IGZyb20gXCIuL0dhbWVTZXNzaW9uXCI7XHJcbmltcG9ydCB7IE5ldEVycm9yQ29kZSB9IGZyb20gXCIuL05ldEVycm9yQ29kZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBTZXNzaW9uTWFuYWdlciBleHRlbmRzIFNpbmdsZXRvbjxTZXNzaW9uTWFuYWdlcj57XHJcblxyXG4gICAgcHJpdmF0ZSBzZXNzaW9uUmVhbTpHYW1lU2Vzc2lvbjtcclxuICAgIHByaXZhdGUgc2Vzc2lvbkdhdGU6R2FtZVNlc3Npb247XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXQgcmVhbG1ScGNJRCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlc3Npb25SZWFtLnJwY0lkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZ2F0ZVJwY0lEKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Vzc2lvbkdhdGUucnBjSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGNvbm5lY3RSZWFsbVNlcnZlcigpOlByb21pc2U8Ym9vbGVhbj4ge1xyXG5cclxuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlPGJvb2xlYW4+KHJlc292ZSA9PntcclxuICAgICAgICAgICAgdGhpcy5zZXNzaW9uUmVhbSA9IEdhbWVTZXNzaW9uLkluc3RhbmNlKEdhbWVTZXNzaW9uKS5jb25uZWN0Q2hhbm5lbChcclxuICAgICAgICAgICAgICAgIEdhbWVDb25maWcucmVhbG1TZXJ2ZXJJUCtcIjpcIitHYW1lQ29uZmlnLnJlYWxtU2VydmVyUG9ydCxcclxuICAgICAgICAgICAgICAgIChjaGFubmVsOmFueSxjb2RlOm51bWJlcik9PntcclxuICAgICAgICAgICAgICAgICAgICBpZihjb2RlID09IE5ldEVycm9yQ29kZS5FUlJfU29ja2V0Q29ublN1Y2Mpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlc3Npb25SZWFtLmlkID0gY2hhbm5lbC5JZDtcclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc292ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc292ZShmYWxzZSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJsb2dpbiByZWFtc2VydmVyIGVyciwgY29kZTogXCIrY29kZSArIFwiLGlkOlwiK2NoYW5uZWwuSWQpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBwcm9taXNlXHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBwdWJsaWMgZGlzY29ubmVjdFJlYWxtU2VydmVyKCl7XHJcbiAgICAgICAgdGhpcy5zZXNzaW9uUmVhbS5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgdGhpcy5zZXNzaW9uUmVhbSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBzZW5kUmVhbG1Nc2cob3Bjb2RlOm51bWJlcixtc2c6YW55KTpQcm9taXNlPGFueT57XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHJwY0lEID0gdGhpcy5zZXNzaW9uUmVhbS5ycGNJZFxyXG4gICAgICAgIGxldCBwcm9taXNlID0gbmV3IFByb21pc2U8YW55PigocmVzb3ZlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgYnVmID0gT3Bjb2RlLmVuY29kZShvcGNvZGUsIG1zZylcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2Vzc2lvblJlYW0uc2VuZChvcGNvZGUsIHJwY0lELCBidWYsIChyZXNwb25zZTphbnkpPT57XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcmVzb3ZlKHJlc3BvbnNlKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBwcm9taXNlXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBjb25uZWN0R2F0ZVNlcnZlcihhZGRyZXNzOnN0cmluZyk6UHJvbWlzZTxib29sZWFuPntcclxuXHJcbiAgICAgICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZTxib29sZWFuPihyZXNvdmUgPT57XHJcbiAgICAgICAgICAgIHRoaXMuc2Vzc2lvbkdhdGUgPSBHYW1lU2Vzc2lvbi5JbnN0YW5jZShHYW1lU2Vzc2lvbikuY29ubmVjdENoYW5uZWwoXHJcbiAgICAgICAgICAgICAgICBhZGRyZXNzLFxyXG4gICAgICAgICAgICAgICAgKGNoYW5uZWw6YW55LGNvZGU6bnVtYmVyKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCJsb2dpbiBHYXRlIFNlcnZlcjogXCIrY29kZSk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZihjb2RlID09IE5ldEVycm9yQ29kZS5FUlJfU29ja2V0Q29ublN1Y2Mpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlc3Npb25HYXRlLmlkID0gY2hhbm5lbC5JZDtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3ZlKHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc292ZShmYWxzZSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImdhdGUgc2VydmVyIGVyciwgY29kZTogXCIrY29kZSArIFwiLGlkOlwiK2NoYW5uZWwuSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2VcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGRpc2Nvbm5lY3RHYXRlU2VydmVyKCl7XHJcbiAgICAgICAgdGhpcy5zZXNzaW9uR2F0ZS5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgdGhpcy5zZXNzaW9uR2F0ZSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHNlbmRHYXRlTXNnKG9wY29kZTpudW1iZXIsIG1zZzphbnkpOlByb21pc2U8YW55PntcclxuXHJcbiAgICAgICAgbGV0IHJwY0lEID0gdGhpcy5zZXNzaW9uR2F0ZS5ycGNJZFxyXG4gICAgICAgIGxldCBwcm9taXNlID0gbmV3IFByb21pc2U8YW55PigocmVzb3ZlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgYnVmID0gT3Bjb2RlLmVuY29kZShvcGNvZGUsIG1zZylcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2Vzc2lvbkdhdGUuc2VuZChvcGNvZGUsIHJwY0lELCBidWYsIChyZXNwb25zZTphbnkpPT57XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcmVzb3ZlKHJlc3BvbnNlKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBwcm9taXNlXHJcblxyXG4gICAgfVxyXG59ICAgXHJcbiIsImltcG9ydCB7IGVtaXQgfSBmcm9tIFwicHVlcnRzXCI7XHJcbmltcG9ydCB7IFNpbmdsZXRvbiB9IGZyb20gXCIuLi9jb21tb24vU2luZ2xldG9uXCI7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuLi9sb2dnZXIvTG9nZ2VyXCI7XHJcbmltcG9ydCB7IFJlZEhpbnRzTWVzc2FnZU1hbmFnZXIgfSBmcm9tIFwiLi9SZWRIaW50c01lc3NhZ2VNYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgZW51bSBlbnVtUmVkSGludHMge1xyXG4gICAgLyoqIOagh+iusOS9jSAqL1xyXG4gICAgbm9uZSA9IDAsXHJcbiAgICAvKiog6IGK5aSpICovXHJcbiAgICBjaGF0ID0gMSxcclxuICAgIC8qKiDogYrlpKnkuJbnlYzpopHpgZMgKi9cclxuICAgIGNoYXRfd29ybGQgPSAyLFxyXG4gICAgLyoqIOiBiuWkqeWFrOS8mumikemBkyAqL1xyXG4gICAgY2hhdF9mYW1pbHkgPSAzLFxyXG4gICAgLyoqIOiBiuWkqeezu+e7n+mikemBkyAqL1xyXG4gICAgY2hhdF9zeXN0ZW0gPSA0LFxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFJlZEhpbnRzTWFuYWdlciBleHRlbmRzIFNpbmdsZXRvbjxSZWRIaW50c01hbmFnZXI+e1xyXG5cclxuICAgIHByaXZhdGUgX2RhdGE6IEFycmF5PG51bWJlcj47Ly/orrDlvZXmr4/kuKrnuqLngrnnmoTmlbDlgLxcclxuICAgIHByaXZhdGUgX3BhcmVudEluZGV4OiBBcnJheTxudW1iZXI+Oy8v6K6w5b2V54i257qn57Si5byVXHJcbiAgICBwcml2YXRlIF9jaGlsZE51bTogQXJyYXk8bnVtYmVyPjsvL+iusOW9leWtkOmhueaVsOmHj1xyXG4gICAgcHJpdmF0ZSBfY2hpbGRJbmRleDogQXJyYXk8bnVtYmVyPjsvL+iusOW9leWtkOmhueWcqOeItue6p+S4reeahOaOkuW6j+e0ouW8lVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57qi54K55YC85pS55Y+YXHJcbiAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBSRURfSElOVF9WQUxVRV9DSEFOR0VEOiBzdHJpbmcgPSBcIlJFRF9ISU5UX1ZBTFVFX0NIQU5HRURcIjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSBbMF07Ly/nrKzkuIDkvY3ml6DmhI/kuYlcclxuICAgICAgICB0aGlzLl9wYXJlbnRJbmRleCA9IFswXTtcclxuICAgICAgICB0aGlzLl9jaGlsZE51bSA9IFswXTtcclxuICAgICAgICB0aGlzLl9jaGlsZEluZGV4ID0gWzBdO1xyXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t6K6w5b2V54i25a2Q5YWz57O7LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvL+iBiuWkqVxyXG4gICAgICAgIHRoaXMuc2V0UGFyZW50KGVudW1SZWRIaW50cy5jaGF0X3dvcmxkLCBlbnVtUmVkSGludHMuY2hhdCk7XHJcbiAgICAgICAgdGhpcy5zZXRQYXJlbnQoZW51bVJlZEhpbnRzLmNoYXRfZmFtaWx5LCBlbnVtUmVkSGludHMuY2hhdCk7XHJcbiAgICAgICAgdGhpcy5zZXRQYXJlbnQoZW51bVJlZEhpbnRzLmNoYXRfc3lzdGVtLCBlbnVtUmVkSGludHMuY2hhdCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7nuqLngrnnmoTlvIDlkK/lkozlhbPpl61cclxuICAgICovXHJcbiAgIHB1YmxpYyBzZXRSZWRIaW50T3Blbk9yQ2xvc2UocmVkOiBudW1iZXIsIGlzT3BlbjogYm9vbGVhbikge1xyXG4gICAgICAgIGlmICh0aGlzLl9jaGlsZE51bVtyZWRdID4gMCkge1xyXG4gICAgICAgICAgICBMb2dnZXIubG9nKFwi57qi54K55pWw5o2u6K6+572u6ZSZ6K+v77ya5LiN6IO955u05o6l5a+56auY57qn55qE57qi54K55pWw5o2u5pON5L2cXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZG9TZXRSZWRIaW50T3Blbk9yQ2xvc2UocmVkLCBpc09wZW4gPyAxIDogMCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6w5b2V54i25a2Q5YWz57O777ya5a2QLS0t54i2XHJcbiAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRQYXJlbnQoY2hpbGQ6IG51bWJlciwgcGFyZW50OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5fcGFyZW50SW5kZXhbcGFyZW50XSA9PSBjaGlsZCkge1xyXG4gICAgICAgICAgICBMb2dnZXIubG9nKFwi5YWz57O75Y+N5LqGXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9wYXJlbnRJbmRleFtjaGlsZF0pIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIumHjeWkjeiuvue9rlwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9wYXJlbnRJbmRleFtjaGlsZF0gPSBwYXJlbnQ7XHJcbiAgICAgICAgaWYgKGlzTmFOKHRoaXMuX2NoaWxkTnVtW3BhcmVudF0pKSB7IHRoaXMuX2NoaWxkTnVtW3BhcmVudF0gPSAwIH1cclxuICAgICAgICB0aGlzLl9jaGlsZE51bVtwYXJlbnRdKys7Ly/lrZDpobnmlbDph4/lop7liqBcclxuICAgICAgICB0aGlzLl9jaGlsZEluZGV4W2NoaWxkXSA9IHRoaXMuX2NoaWxkTnVtW3BhcmVudF07Ly/lrZDpobnnmoTntKLlvJUg5LuOMeW8gOWni1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZG9TZXRSZWRIaW50T3Blbk9yQ2xvc2UocmVkOiBudW1iZXIsIHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5fZGF0YVtyZWRdICE9IHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFbcmVkXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICBsZXQgX3BhcmVudDogbnVtYmVyID0gdGhpcy5fcGFyZW50SW5kZXhbcmVkXVxyXG4gICAgICAgICAgICBpZiAoX3BhcmVudCkge1xyXG4gICAgICAgICAgICAgICAgLy/lpoLmnpzmnInniLbnuqfvvIzmm7TmlrDniLbnuqdcclxuICAgICAgICAgICAgICAgIGxldCBpbmRleDogbnVtYmVyID0gdGhpcy5fY2hpbGRJbmRleFtyZWRdOy8v6I635Y+W5Zyo54i257qn5Lit55qE57Si5byVXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRvU2V0UmVkSGludE9wZW5PckNsb3NlKF9wYXJlbnQsIHZhbHVlID4gMCA/IHRoaXMuX2RhdGFbX3BhcmVudF0gfCB0aGlzLmFkZFYoaW5kZXgpIDogdGhpcy5fZGF0YVtfcGFyZW50XSAmIHRoaXMuc3ViVihpbmRleCkpOy8v6K6+572u54i257qn55qE5YC8XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8v5Y+R5pS55Y+Y5LqL5Lu2OuWFqOWxgOS6i+S7tlxyXG4gICAgICAgICAgICAvL2VtaXQoUmVkSGludHNNYW5hZ2VyLlJFRF9ISU5UX1ZBTFVFX0NIQU5HRUQsIHJlZCk7XHJcbiAgICAgICAgICAgIC8v57qi54K55LqL5Lu277yM5bGA6YOo5LqL5Lu2XHJcbiAgICAgICAgICAgIFJlZEhpbnRzTWVzc2FnZU1hbmFnZXIuSW5zdGFuY2UoUmVkSGludHNNZXNzYWdlTWFuYWdlcikuYnJvYWRjYXN0KHJlZCwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgYWRkVihpbmRleDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gMSA8PCAoaW5kZXggLSAxKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc3ViVihpbmRleDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gfnRoaXMuYWRkVihpbmRleCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOafpeeci+e6oueCueaYr+WQpuW8gOWQr1xyXG4gICAgKi9cclxuICAgIHB1YmxpYyBjaGVja1JlZElzT3BlbihyZWQ6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhW3JlZF0gPiAwO1xyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJpbXBvcnQgeyBNZXNzZW5nZXIgfSBmcm9tIFwiLi4vY29tbW9uL01lc3NlbmdlclwiO1xyXG5pbXBvcnQgeyBTaW5nbGV0b24gfSBmcm9tIFwiLi4vY29tbW9uL1NpbmdsZXRvblwiO1xyXG5cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgUmVkSGludHNNZXNzYWdlTWFuYWdlciBleHRlbmRzIFNpbmdsZXRvbjxSZWRIaW50c01lc3NhZ2VNYW5hZ2VyPntcclxuXHJcbiAgICBwcml2YXRlIHJlZGhpbnRzTWVzc2FnZTpNZXNzZW5nZXIgPSBuZXcgTWVzc2VuZ2VyKCk7XHJcblxyXG5cclxuICAgIHB1YmxpYyBhZGRMaXN0ZW5lcihtc2dDb2RlOm51bWJlcixvYmo6YW55LCBsaXN0ZW5lcjpGdW5jdGlvbil7XHJcblxyXG4gICAgICAgIHRoaXMucmVkaGludHNNZXNzYWdlLmFkZExpc3RlbmVyKG1zZ0NvZGUsIG9iaiwgbGlzdGVuZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVMaXN0ZW5lcihtc2dDb2RlOm51bWJlciwgbGlzdGVuZXI6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMucmVkaGludHNNZXNzYWdlLnJlbW92ZUxpc3RlbmVyKG1zZ0NvZGUsIGxpc3RlbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlTGlzdGVuZXJCeUNvZGUobXNnQ29kZTpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMucmVkaGludHNNZXNzYWdlLnJlbW92ZUxpc3RlbmVyQnlUeXBlKG1zZ0NvZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcnVwKCl7XHJcbiAgICAgICAgdGhpcy5yZWRoaW50c01lc3NhZ2UuY2xlYXJ1cCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBicm9hZGNhc3QobXNnQ29kZTpudW1iZXIscGFyYW1zOmFueSl7XHJcblxyXG5cclxuICAgICAgICB0aGlzLnJlZGhpbnRzTWVzc2FnZS5icm9hZGNhc3QobXNnQ29kZSwgcGFyYW1zKVxyXG4gICAgfVxyXG4gICAgXHJcblxyXG59IiwiaW1wb3J0IHsgVW5pdHlFbmdpbmUgfSBmcm9tIFwiY3NoYXJwXCI7XHJcbmltcG9ydCB7IFMgfSBmcm9tIFwiLi4vLi4vZ2xvYmFsL0dhbWVDb25maWdcIjtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlU2NlbmV7XHJcblxyXG4gICAgcHJpdmF0ZSBwcmVsb2FkUHJlZmFiOk1hcDxzdHJpbmcsbnVtYmVyPjtcclxuICAgIHByaXZhdGUgc2NlbmVJbnN0YW5jZTpVbml0eUVuZ2luZS5SZXNvdXJjZU1hbmFnZW1lbnQuUmVzb3VyY2VQcm92aWRlcnMuU2NlbmVJbnN0YW5jZVxyXG5cclxuICAgIHB1YmxpYyBmaW5pc2hDb3VudCA9IDA7XHJcbiAgICBwdWJsaWMgdG90YWxDb3VudCA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLnByZWxvYWRQcmVmYWIgPSBuZXcgTWFwPHN0cmluZyxudW1iZXI+KCk7XHJcbiAgICAgICAgdGhpcy5maW5pc2hDb3VudCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFByZWxvYWRQcmVmYWIoYWRkcmVzczpzdHJpbmcsIGluc3RDb3VudCl7XHJcbiAgICAgICAgaWYoIXRoaXMucHJlbG9hZFByZWZhYi5oYXMoYWRkcmVzcykpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnByZWxvYWRQcmVmYWIuc2V0KGFkZHJlc3MsIGluc3RDb3VudCk7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnByZWxvYWRQcmVmYWIuc2V0KGFkZHJlc3MsIHRoaXMucHJlbG9hZFByZWZhYi5nZXQoYWRkcmVzcykgKyBpbnN0Q291bnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRTY2VuZUluc3RhbmNlKHNjZW5lSW5zdGFuY2U6VW5pdHlFbmdpbmUuUmVzb3VyY2VNYW5hZ2VtZW50LlJlc291cmNlUHJvdmlkZXJzLlNjZW5lSW5zdGFuY2Upe1xyXG4gICAgICAgIHRoaXMuc2NlbmVJbnN0YW5jZSA9IHNjZW5lSW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IG9uRW50ZXIoKTtcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBvbkNvbXBsZXRlKCk7XHJcbiAgICBwdWJsaWMgYWJzdHJhY3Qgb25MZWF2ZSgpO1xyXG5cclxuICAgIHB1YmxpYyBhc3luYyBsb2FkQXNzZXRzQXN5bmMoKXtcclxuXHJcbiAgICAgICAgdGhpcy50b3RhbENvdW50ID0gdGhpcy5wcmVsb2FkUHJlZmFiLnNpemU7XHJcblxyXG4gICAgICAgIGxldCBwcmVtaXNlcyA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLnByZWxvYWRQcmVmYWIuZm9yRWFjaCgodmFsdWUsIGtleSk9PntcclxuICAgICAgICAgICAgbGV0IHByZW1pc2UgPSBTLkdhbWVPYmplY3RQb29sLnByZUxvYWRHYW1lT2JqZWN0QXN5bmMoa2V5LCB2YWx1ZSwoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maW5pc2hDb3VudCsrO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBwcmVtaXNlcy5wdXNoKHByZW1pc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChwcmVtaXNlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uRGVzdHJveSgpe1xyXG4gXHJcbiAgICAgICAgLy/muIXnkIbotYTmupDnvJPlrZhcclxuICAgICAgICBTLkdhbWVPYmplY3RQb29sLmNsZWFudXAodHJ1ZSk7XHJcblxyXG4gICAgICAgIC8v5Y246L295Zy65pmvXHJcbiAgICAgICAgUy5SZXNNYW5hZ2VyLnVubG9hZFNjZW5lKHRoaXMuc2NlbmVJbnN0YW5jZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5wcmVsb2FkUHJlZmFiLmNsZWFyKCk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgIGNsYXNzIFNjZW5lRGVme1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgTG9hZGluZ1NjZW5lOnN0cmluZyA9IFwiTG9hZGluZ1NjZW5lXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIEdhbWVTdGFydDpzdHJpbmcgPSBcIkdhbWVTdGFydFNjZW5lXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIExhdW5jaFNjZW5lOnN0cmluZyA9IFwiTGF1bmNoU2NlbmVcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgSG9tZVNjZW5lOnN0cmluZyA9IFwiSG9tZVNjZW5lXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIExvZ2luU2NlbmU6c3RyaW5nID0gXCJMb2dpblNjZW5lXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFB2ZVNjZW5lOnN0cmluZyA9IFwiUHZlU2NlbmVcIjtcclxufVxyXG4iLCJpbXBvcnQgeyBCYXNlU2NlbmUgfSBmcm9tIFwiLi9CYXNlU2NlbmVcIjtcclxuaW1wb3J0IHsgUHZlU2NlbmUgfSBmcm9tIFwiLi4vLi4vZ2FtZS9tb2R1bGUvcHZlL3NjZW5lL1B2ZVNjZW5lXCI7XHJcbmltcG9ydCB7IEhvbWVTY2VuZSB9IGZyb20gXCIuLi8uLi9nYW1lL21vZHVsZS9ob21lL3NjZW5lL0hvbWVTY2VuZVwiO1xyXG4vLyBpbXBvcnQgeyBMb2dpblNjZW5lIH0gZnJvbSBcIi4uLy4uL2dhbWUvbW9kdWxlL2xvZ2luL3NjZW5lL0xvZ2luU2NlbmVcIjtcclxuaW1wb3J0IHsgU2NlbmVEZWYgfSBmcm9tIFwiLi9TY2VuZURlZlwiO1xyXG5pbXBvcnQgeyBHYW1lU3RhcnQgfSBmcm9tIFwiLi4vLi4vZ2FtZS9tb2R1bGUvZ2FtZXN0YXJ0L3NjZW5lL0dhbWVTdGFydFNjZW5lXCI7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBTY2VuZUZhY3Rvcnl7XHJcblxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlU2NlbmUoc2NlbmVOYW1lOnN0cmluZyk6QmFzZVNjZW5le1xyXG5cclxuICAgICAgICBsZXQgc2NlbmU6QmFzZVNjZW5lID0gbnVsbDtcclxuXHJcbiAgICAgICAgc3dpdGNoIChzY2VuZU5hbWUpe1xyXG4gICAgICAgICAgICBjYXNlIFNjZW5lRGVmLkdhbWVTdGFydDpcclxuICAgICAgICAgICAgICAgIHNjZW5lID0gbmV3IEdhbWVTdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8vIGNhc2UgU2NlbmVEZWYuTG9naW5TY2VuZTpcclxuICAgICAgICAgICAgLy8gICAgIHNjZW5lID0gbmV3IExvZ2luU2NlbmUoKTtcclxuICAgICAgICAgICAgLy8gICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNjZW5lRGVmLkhvbWVTY2VuZTpcclxuICAgICAgICAgICAgICAgIHNjZW5lID0gbmV3IEhvbWVTY2VuZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2NlbmVEZWYuUHZlU2NlbmU6XHJcbiAgICAgICAgICAgICAgICBzY2VuZSA9IG5ldyBQdmVTY2VuZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc2NlbmU7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBDb21tb25VSSB9IGZyb20gXCIuLi8uLi9kYXRhL3VpL2NvbW1vblwiO1xyXG5pbXBvcnQgeyBVSU1lc3NhZ2UgfSBmcm9tIFwiLi4vLi4vZ2FtZS9ldmVudC9VSU1lc3NhZ2VcIjtcclxuaW1wb3J0IHsgUyB9IGZyb20gXCIuLi8uLi9nbG9iYWwvR2FtZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBTaW5nbGV0b24gfSBmcm9tIFwiLi4vY29tbW9uL1NpbmdsZXRvblwiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi4vbG9nZ2VyL0xvZ2dlclwiO1xyXG5pbXBvcnQgeyBCYXNlU2NlbmUgfSBmcm9tIFwiLi9CYXNlU2NlbmVcIjtcclxuaW1wb3J0IHsgU2NlbmVGYWN0b3J5IH0gZnJvbSBcIi4vU2NlbmVGYWN0b3J5XCI7XHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgU2NlbmVNYW5hZ2VyIGV4dGVuZHMgU2luZ2xldG9uPFNjZW5lTWFuYWdlcj57XHJcblxyXG4gICAgcHJpdmF0ZSBjdXJyZW50U2NlbmU6QmFzZVNjZW5lID0gbnVsbDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGxvYWRTY2VuZShzY2VuZTpzdHJpbmcpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRyeXtcclxuXHJcbiAgICAgICAgICAgIC8v5omT5byATG9hZGluZ+eVjOmdolxyXG4gICAgICAgICAgICBTLlVJTWFuYWdlci5vcGVuTG9hZGluZyhDb21tb25VSS5QYWNrYWdlTmFtZSwgQ29tbW9uVUkuVUlMb2FkaW5nVmlldyk7XHJcblxyXG4gICAgICAgICAgICAvL+a4heeQhuaXp+WcuuaZr1xyXG4gICAgICAgICAgICBpZih0aGlzLmN1cnJlbnRTY2VuZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZS5vbkxlYXZlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZS5vbkRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy/lvIDlp4vliqDovb3lnLrmma9cclxuICAgICAgICAgICAgbGV0IHNjZW5lSW5zdGFuY2UgPSBhd2FpdCBTLlJlc01hbmFnZXIubG9hZFNjZW5lKHNjZW5lKTtcclxuXHJcbiAgICAgICAgICAgIC8v5byA5aeL5Yqg6L296L+b5YWl5Zy65pmv55qE6LWE5rqQXHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNjZW5lID0gIFNjZW5lRmFjdG9yeS5jcmVhdGVTY2VuZShzY2VuZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNjZW5lLnNldFNjZW5lSW5zdGFuY2Uoc2NlbmVJbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNjZW5lLm9uRW50ZXIoKTtcclxuXHJcbiAgICAgICAgICAgIC8v6K6+572u5b2T5YmN5Zy65pmv5Yqg6L296L+b5bqmVGltZXJcclxuICAgICAgICAgICAgbGV0IHByb2dyZXNzSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKT0+e1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBwcm9ncmVzcyA9IHRoaXMuY3VycmVudFNjZW5lLmZpbmlzaENvdW50L3RoaXMuY3VycmVudFNjZW5lLnRvdGFsQ291bnQ7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwicHJvZ3Jlc3M6XCIrcHJvZ3Jlc3MgKyBcIiA9IFwiK3RoaXMuY3VycmVudFNjZW5lLmZpbmlzaENvdW50ICsgXCIgPSBcIit0aGlzLmN1cnJlbnRTY2VuZS50b3RhbENvdW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICBTLlVJTWVzc2FnZU1hbmdlci5icm9hZGNhc3QoXHJcbiAgICAgICAgICAgICAgICAgICAgVUlNZXNzYWdlLk1TR19TQ0VORV9QUk9HUkVTUyxcclxuICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcyoxMDApO1xyXG5cclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuXHJcbiAgICAgICAgICAgIC8v5Yqg6L296LWE5rqQXHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY3VycmVudFNjZW5lLmxvYWRBc3NldHNBc3luYygpO1xyXG5cclxuICAgICAgICAgICAgLy/liqDovb3lrozmiJBcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChwcm9ncmVzc0ludGVydmFsKVxyXG5cclxuICAgICAgICAgICAgLy/lhbPpl63miYDmnIlQYWdlXHJcbiAgICAgICAgICAgIFMuVUlNYW5hZ2VyLmNsb3NlQWxsUGFuZWxzKCk7XHJcblxyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmN1cnJlbnRTY2VuZS5vbkNvbXBsZXRlKClcclxuICAgICAgICAgICAgUy5VSU1hbmFnZXIuY2xvc2VMb2FkaW5nKCk7XHJcblxyXG4gICAgICAgIH1jYXRjaChleCl7XHJcbiAgICAgICAgICAgIExvZ2dlci5sb2coXCJsb2FkIHNjZW5lIGV4Y2VwOlwiK2V4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBcclxufSIsIlxyXG5leHBvcnQgY2xhc3MgVUlCYXNlIHtcclxuXHJcbiAgICBwdWJsaWMgZnVpOmFueTsgIC8vRmFpcnlHVUkg5a+56LGhXHJcblxyXG5cclxuICAgIC8v57uR5a6aRmFpcnlHVUnlhYPku7ZcclxuICAgIHB1YmxpYyBiaW5kQWxsKHRhcmdldDphbnkpOnZvaWR7XHJcbiAgICAgICAgZm9yKGxldCBrIGluIHRhcmdldFtcImJpbmRlcnNcIl0pe1xyXG4gICAgICAgICAgICBsZXQgZmd1aU5hbWUgPSB0aGlzW1wiYmluZGVyc1wiXVtrXTtcclxuICAgICAgICAgICAgdGhpc1trXSA9IHRoaXMuZnVpLkdldENoaWxkKGZndWlOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgICAgIFxyXG5cclxufSIsIlxyXG5cclxuXHJcbmV4cG9ydCBlbnVtIFVJVHlwZURlZntcclxuICAgIFVua293biA9IDAsXHJcbiAgICBQYWdlID0gMSxcclxuICAgIFdpbmRvdz0yLFxyXG4gICAgV2lkZ2V0ID0gMyxcclxuICAgIExvYWRpbmcgPTRcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFVJTGF5ZXJEZWZ7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBCYWNrZ3JvdW5kOm51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgc3RhdGljIFBhZ2U6bnVtYmVyID0gMTAwMDtcclxuICAgIHB1YmxpYyBzdGF0aWMgTm9ybWFsV2luZG93Om51bWJlciA9IDIwMDA7XHJcbiAgICBwdWJsaWMgc3RhdGljIFRvcFdpbmRvdzpudW1iZXIgPSAzMDAwO1xyXG4gICAgcHVibGljIHN0YXRpYyBXaWRnZXQ6bnVtYmVyID0gNDAwMDtcclxuICAgIHB1YmxpYyBzdGF0aWMgTG9hZGluZzpudW1iZXIgPSA1MDAwO1xyXG4gICAgcHVibGljIHN0YXRpYyBVbmtvd246bnVtYmVyID0gOTk5OTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljICBnZXREZWZhdWx0TGF5ZXIodHlwZTpVSVR5cGVEZWYpOm51bWJlcntcclxuXHJcbiAgICAgICAgc3dpdGNoKHR5cGUpe1xyXG4gICAgICAgICAgICBjYXNlIFVJVHlwZURlZi5Mb2FkaW5nOiByZXR1cm4gdGhpcy5Mb2FkaW5nO1xyXG4gICAgICAgICAgICBjYXNlIFVJVHlwZURlZi5XaWRnZXQ6IHJldHVybiB0aGlzLldpZGdldDtcclxuICAgICAgICAgICAgY2FzZSBVSVR5cGVEZWYuV2luZG93OiByZXR1cm4gdGhpcy5Ob3JtYWxXaW5kb3c7XHJcbiAgICAgICAgICAgIGNhc2UgVUlUeXBlRGVmLlBhZ2U6IHJldHVybiB0aGlzLlBhZ2U7XHJcbiAgICAgICAgICAgIGNhc2UgVUlUeXBlRGVmLlVua293bjogcmV0dXJuIHRoaXMuVW5rb3duO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gdGhpcy5Vbmtvd247IFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBVSUNvbURlZnN7XHJcbiAgICBwdWJsaWMgc3RhdGljIEJhY2tCdG4gPSBcImJhY2tfYnRuXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFdpbmRvd0Nsb3NlQnRuID0gXCJ3aW5fY2xvc2VfYnRuXCI7XHJcbn1cclxuXHJcblxyXG5cclxuIiwiXHJcbmltcG9ydCB7IFVJUGFuZWwgfSBmcm9tIFwiLi9VSVBhbmVsXCI7XHJcbmltcG9ydCB7IFVJTG9hZGluZyB9IGZyb20gXCIuL1VJTGliL1VJTG9hZGluZ1wiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi4vbG9nZ2VyL0xvZ2dlclwiO1xyXG5pbXBvcnQgeyBDb21tb25VSSB9IGZyb20gXCIuLi8uLi9kYXRhL3VpL2NvbW1vblwiO1xyXG5pbXBvcnQgeyBGbHlCaXJkVUkgfSBmcm9tIFwiLi4vLi4vZGF0YS91aS9GbHlCaXJkXCI7XHJcbmltcG9ydCB7IEdhbWVTdGFydFVJIH0gZnJvbSBcIi4uLy4uL2RhdGEvdWkvR2FtZVN0YXJ0XCI7XHJcbmltcG9ydCB7IFVJU3RhcnRWaWV3IH0gZnJvbSBcIi4uLy4uL2dhbWUvbW9kdWxlL2dhbWVzdGFydC91aS9VSVN0YXJ0Vmlld1wiO1xyXG5cclxuXHJcblxyXG5jb25zdCBDUyA9IHJlcXVpcmUoJ2NzaGFycCcpO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBVSUZhY3Rvcnl7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyB1aUNhY2hlOk1hcDxzdHJpbmcsVUlQYW5lbD4gPSBuZXcgTWFwPHN0cmluZyxVSVBhbmVsPigpO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlVUkocGtnOnN0cmluZywgbmFtZTpzdHJpbmcpe1xyXG4gICAgICAgIExvZ2dlci5sb2coYGNyZWF0ZSBVSTogJHtwa2d9OiR7bmFtZX1gKVxyXG4gICAgICAgIGxldCBjb21wID0gQ1MuRmFpcnlHVUkuVUlQYWNrYWdlLkNyZWF0ZU9iamVjdChwa2csIG5hbWUpLmFzQ29tXHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHVpOlVJUGFuZWwgPSB0aGlzLnVpQ2FjaGUuZ2V0KG5hbWUpO1xyXG5cclxuICAgICAgICBpZighdWkpe1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoKHBrZyl7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSBDb21tb25VSS5QYWNrYWdlTmFtZTpcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG5hbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIENvbW1vblVJLlVJTG9hZGluZ1ZpZXc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aSA9IG5ldyBVSUxvYWRpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgY2FzZSBGbHlCaXJkVUkuUGFja2FnZU5hbWU6XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChuYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBGbHlCaXJkVUkuVUlNYWluVklldzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVpID0gbmV3IFVJTG9naW5QYWdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGNhc2UgR2FtZVN0YXJ0VUkuUGFja2FnZU5hbWU6XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChuYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBHYW1lU3RhcnRVSS5VSVN0YXJ0VmlldzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpID0gbmV3IFVJU3RhcnRWaWV3KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIC8vIGNhc2UgaG9tZVVJLlBhY2thZ2VOYW1lOlxyXG4gICAgICAgICAgICAgICAgLy8gICAgIHN3aXRjaCAobmFtZSl7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNhc2UgaG9tZVVJLlVJSG9tZVBhZ2U6XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICB1aSA9IG5ldyBVSUhvbWVQYWdlKCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgY2FzZSBob21lVUkuVUlTaG9wUGFnZTpcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIHVpID0gbmV3IFVJU2hvcFBhZ2UoKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgLy8gY2FzZSBzdG9yeVVJLlBhY2thZ2VOYW1lOlxyXG4gICAgICAgICAgICAgICAgLy8gICAgIHN3aXRjaCAobmFtZSl7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNhc2Ugc3RvcnlVSS5VSVN0b3J5V2luOlxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgdWkgPSBuZXcgVUlTdG9yeVdpbigpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVpQ2FjaGUuc2V0KG5hbWUsIHVpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodWkhPW51bGwpe1xyXG4gICAgICAgICAgICB1aS5mdWkgPSBjb21wO1xyXG4gICAgICAgICAgICB1aS5uYW1lID0gbmFtZTtcclxuICAgICAgICAgICAgdWkucGtnTmFtZSA9IHBrZztcclxuXHJcbiAgICAgICAgICAgIC8v57uR5a6aRmFpcnlHVUnmjqfku7ZcclxuICAgICAgICAgICAgdWkuYmluZEFsbCh1aSk7XHJcbiAgICAgICAgICAgIHVpLmF3YWtlKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihgbm90IGNyZWF0ZSB1aTogJHtwa2d9LSR7bmFtZX1gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB1aTtcclxuICAgIH1cclxuXHJcblxyXG5cclxufSIsImltcG9ydCB7IFVJUGFuZWwgfSBmcm9tIFwiLi4vVUlQYW5lbFwiO1xyXG5pbXBvcnQgeyBVSVR5cGVEZWYgfSBmcm9tIFwiLi4vVUlEZWZpbmVcIjtcclxuaW1wb3J0IHsgRmFpcnlHVUkgfSBmcm9tIFwiY3NoYXJwXCI7XHJcbmltcG9ydCB7IGJpbmRlciB9IGZyb20gXCIuLi8uLi9jb21tb24vTmljZURlY29yYXRvclwiO1xyXG5pbXBvcnQgeyBVSU1lc3NhZ2UgfSBmcm9tIFwiLi4vLi4vLi4vZ2FtZS9ldmVudC9VSU1lc3NhZ2VcIjtcclxuaW1wb3J0IHsgUyB9IGZyb20gXCIuLi8uLi8uLi9nbG9iYWwvR2FtZUNvbmZpZ1wiO1xyXG5cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgIFVJTG9hZGluZyBleHRlbmRzIFVJUGFuZWx7XHJcblxyXG5cclxuICAgIEBiaW5kZXIoXCJsb2FkaW5nX3ByZWdyZXNzXCIpXHJcbiAgICBwdWJsaWMgcHJvZ3Jlc3NMb2FkaW5nOiBGYWlyeUdVSS5HUHJvZ3Jlc3NCYXI7XHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgb25Bd2FrZSgpOiB2b2lkIHtcclxuICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IHVpVHlwZSgpOiBVSVR5cGVEZWYgeyAgICBcclxuICAgICAgICByZXR1cm4gVUlUeXBlRGVmLkxvYWRpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU2hvdyhhcmc6YW55KTp2b2lke1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NMb2FkaW5nLnZhbHVlID0gMDtcclxuICAgICAgICB0aGlzLnByb2dyZXNzTG9hZGluZy52aXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgUy5VSU1lc3NhZ2VNYW5nZXIuYWRkTGlzdGVuZXIoXHJcbiAgICAgICAgICAgIFVJTWVzc2FnZS5NU0dfU0NFTkVfUFJPR1JFU1MsXHJcbiAgICAgICAgICAgIHRoaXMsXHJcbiAgICAgICAgICAgIChwcm9ncmVzczpudW1iZXIpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzTG9hZGluZy5Ud2VlblZhbHVlKHByb2dyZXNzLCAwLjEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25DbG9zZShhcmc6YW55KTp2b2lke1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NMb2FkaW5nLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICBTLlVJTWVzc2FnZU1hbmdlci5yZW1vdmVMaXN0ZW5lckJ5Q29kZShcclxuICAgICAgICAgICAgVUlNZXNzYWdlLk1TR19TQ0VORV9QUk9HUkVTU1xyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG5cclxufSIsIlxyXG5pbXBvcnQgeyBTaW5nbGV0b24gfSBmcm9tICcuLi9jb21tb24vU2luZ2xldG9uJztcclxuaW1wb3J0IHsgVUlMb2FkaW5nIH0gZnJvbSAnLi9VSUxpYi9VSUxvYWRpbmcnO1xyXG5pbXBvcnQgeyBVSVdpbmRvdyB9IGZyb20gJy4vVUlXaW5kb3cnO1xyXG5pbXBvcnQgeyBVSVdpZGdlIH0gZnJvbSAnLi9VSVdpZGdlJztcclxuaW1wb3J0IHsgVUlQYW5lbCB9IGZyb20gJy4vVUlQYW5lbCc7XHJcbmltcG9ydCB7IFVJRmFjdG9yeSB9IGZyb20gJy4vVUlGYWN0b3J5JztcclxuaW1wb3J0IHsgUyB9IGZyb20gJy4uLy4uL2dsb2JhbC9HYW1lQ29uZmlnJztcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnLi4vbG9nZ2VyL0xvZ2dlcic7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFVJUGFnZVRyYWNre1xyXG4gICAgcHVibGljIHBrZzpzdHJpbmc7XHJcbiAgICBwdWJsaWMgbmFtZTpzdHJpbmc7XHJcbiAgICBwdWJsaWMgYXJnOmFueTtcclxuICAgIHB1YmxpYyB1aTpVSVBhbmVsO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFVJTWFuYWdlciBleHRlbmRzIFNpbmdsZXRvbjxVSU1hbmFnZXI+e1xyXG5cclxuICAgIHByaXZhdGUgIG1fcGFnZVRyYWNrU3RhY2s6QXJyYXk8VUlQYWdlVHJhY2s+O1xyXG4gICAgcHJpdmF0ZSBtX2N1cnJlbnRQYWdlOlVJUGFnZVRyYWNrO1xyXG4gICAgcHJpdmF0ZSBtX2xhc3RTY2Vuc2VQYWdlOlVJUGFnZVRyYWNrO1xyXG5cclxuICAgIHByaXZhdGUgbV9saXN0TG9hZGVkUGFuZWw6QXJyYXk8VUlQYW5lbD47XHJcblxyXG4gICAgcHJpdmF0ZSBtX2xvYWRpbmdQYWdlOlVJUGFuZWw7XHJcbiAgICBwcml2YXRlIG1fZ21QYWdlOlVJUGFuZWw7XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5tX3BhZ2VUcmFja1N0YWNrID0gbmV3IEFycmF5PFVJUGFnZVRyYWNrPigpO1xyXG4gICAgICAgIHRoaXMubV9saXN0TG9hZGVkUGFuZWwgPSBuZXcgQXJyYXk8VUlQYW5lbD4oKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkaXN0cm95UGFuZWwocGFuZWw6VUlQYW5lbCl7XHJcbiAgICAgICAgaWYocGFuZWwuaXNPcGVuKXtcclxuICAgICAgICAgICAgcGFuZWwuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/ljbjovb3otYTmupBcclxuICAgICAgICBTLlJlc01hbmFnZXIucmVsZWFzZUZhaXJ5R1VJUGFja2FnZShwYW5lbC5wa2dOYW1lKTtcclxuICAgICAgICBwYW5lbC5kaXNwb3NlKCk7ICBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRpc3Ryb3lBbGxMb2FkZWRQYW5lbCgpOnZvaWR7XHJcbiAgICAgICAgZm9yKGxldCBpPSB0aGlzLm1fbGlzdExvYWRlZFBhbmVsLmxlbmd0aC0xOyBpPj0wOyBpLS0pe1xyXG4gICAgICAgICAgICBsZXQgcGFuZWwgPSB0aGlzLm1fbGlzdExvYWRlZFBhbmVsW2ldO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kaXN0cm95UGFuZWwocGFuZWwpO1xyXG4gICAgICAgICAgICB0aGlzLm1fbGlzdExvYWRlZFBhbmVsLnNwbGljZShpLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFuKCk6dm9pZHtcclxuXHJcbiAgICAgICAgdGhpcy5kaXN0cm95QWxsTG9hZGVkUGFuZWwoKTtcclxuXHJcbiAgICAgICAgdGhpcy5tX3BhZ2VUcmFja1N0YWNrLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5tX2xpc3RMb2FkZWRQYW5lbC5sZW5ndGggPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRQYW5lbFVJKG5hbWU6c3RyaW5nKTpVSVBhbmVse1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IHBhbmVsIG9mIHRoaXMubV9saXN0TG9hZGVkUGFuZWwpIHtcclxuICAgICAgICAgICAgaWYocGFuZWwubmFtZSA9PSBuYW1lKXtcclxuXHJcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwiZmluZCBwYW5lbCBpbiBjYWNoZTogXCIrbmFtZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhbmVsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBvcGVuKHBrZzpzdHJpbmcsIG5hbWU6c3RyaW5nLCBhcmc/OmFueSl7XHJcbiAgIFxyXG4gICAgICAgIGxldCB1aTphbnkgPSB0aGlzLmdldFBhbmVsVUkobmFtZSk7XHJcblxyXG4gICAgICAgIGlmKHVpID09IG51bGwpe1xyXG4gICAgICAgICAgICAvL+WKoOi9vSBwYWNrYWdlXHJcbiAgICAgICAgICAgIGF3YWl0IFMuUmVzTWFuYWdlci5sb2FkRmFpcnlHVUlQYWNrYWdlKHBrZyk7XHJcbiAgICAgICAgICAgIHVpID0gVUlGYWN0b3J5LmNyZWF0ZVVJKHBrZywgbmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMubV9saXN0TG9hZGVkUGFuZWwucHVzaCh1aSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih1aSAhPSBudWxsKXtcclxuICAgICAgICAgICAgLy8gIyMjICB1aSBhcyBhbnkg6LCD55So56eB5pyJ5pa55rOVXHJcbiAgICAgICAgICAgICh1aSBhcyBhbnkpLl9pbnRlcm5hbE9wZW4oYXJnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB1aTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBvcGVuUGFnZVdvcmtlcihwa2c6c3RyaW5nLCBwYWdlOnN0cmluZywgYXJnOmFueSl7XHJcblxyXG4gICAgICAgIC8v6K6+572uIG1fY3VycmVudFBhZ2VcclxuICAgICAgICB0aGlzLm1fY3VycmVudFBhZ2UgPSBuZXcgVUlQYWdlVHJhY2soKTtcclxuICAgICAgIFxyXG4gICAgICAgIHRoaXMubV9jdXJyZW50UGFnZS5wa2cgPSBwa2c7XHJcbiAgICAgICAgdGhpcy5tX2N1cnJlbnRQYWdlLm5hbWUgPSBwYWdlO1xyXG4gICAgICAgIHRoaXMubV9jdXJyZW50UGFnZS5hcmcgPSBhcmc7XHJcblxyXG4gICAgICAgIC8v5omT5byA5pawUGFnZVxyXG4gICAgICAgIGF3YWl0IFMuUmVzTWFuYWdlci5sb2FkRmFpcnlHVUlQYWNrYWdlKHBrZyk7XHJcbiAgICAgICAgbGV0IHVpID0gVUlGYWN0b3J5LmNyZWF0ZVVJKHBrZywgcGFnZSk7XHJcbiAgICAgICAgKHVpIGFzIGFueSkuX2ludGVybmFsT3BlbihhcmcpO1xyXG5cclxuICAgICAgICAvL+S/neWtmOWIsCBtX2N1cnJlbnRQYWdlXHJcbiAgICAgICAgdGhpcy5tX2N1cnJlbnRQYWdlLnVpID0gdWk7XHJcblxyXG4gICAgICAgIC8v6ZSA5q+B5b2T5YmNcGFnZSDkuK3miZPlvIDnmoTlkIToh6pQYW5lbHNcclxuICAgICAgICB0aGlzLmRpc3Ryb3lBbGxMb2FkZWRQYW5lbCgpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5tX2N1cnJlbnRQYWdlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09VUlQYWdlXHJcbiAgICAvL+aJk+W8gOWcuuaZr+mhtemdoizmraTpobXpnaLkuI3orqHlhaXpobXpnaLmoIgs5peg6L+U5Zue5LiK5LiA6Z2i5oyJ6ZKuXHJcbiAgICBwdWJsaWMgYXN5bmMgb3BlblBhZ2VJblNjZW5lKHBrZzpzdHJpbmcsIHBhZ2U6c3RyaW5nLCBhcmc6YW55KXtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgX29wZW5QYWdlID0gYXdhaXQgdGhpcy5vcGVuUGFnZVdvcmtlcihwa2csIHBhZ2UsIGFyZyk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMubV9sYXN0U2NlbnNlUGFnZSl7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzdHJveVBhbmVsKHRoaXMubV9sYXN0U2NlbnNlUGFnZS51aSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubV9sYXN0U2NlbnNlUGFnZSA9IF9vcGVuUGFnZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+aJk+W8gOmhtemdoiwg5Lya5YWz6Zet5LiK5LiA5Liq6aG16Z2i5LiK55qE5omA5pyJ56qX5Y+jLFdpZGlnZXTnrYlcclxuICAgIHB1YmxpYyBhc3luYyBvcGVuUGFnZShwa2c6c3RyaW5nLCBuYW1lOnN0cmluZywgYXJnPzphbnkpe1xyXG5cclxuICAgICAgICAvLzEsIOajgOafpeagiOS4reaYr+WQpuWtmOWcqOatpOmhtemdolxyXG4gICAgICAgIGxldCBsZW4gPSB0aGlzLm1fcGFnZVRyYWNrU3RhY2subGVuZ3RoO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IGxlbi0xOyBpID49IDAgO2ktLSl7XHJcbiAgICAgICAgICAgIGxldCB0cmFjayA9IHRoaXMubV9wYWdlVHJhY2tTdGFja1tpXTtcclxuICAgICAgICAgICAgaWYodHJhY2sucGtnID09IHBrZyAmJiB0cmFjay5uYW1lID09IG5hbWUpe1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3Ryb3lBbGxMb2FkZWRQYW5lbCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXN0cm95UGFuZWwodGhpcy5tX2N1cnJlbnRQYWdlLnVpKTtcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0cmFjay51aS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRyYWNrLnVpLm9uU2hvdyh0cmFjay5hcmcpO1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy/ljbjovb3mraTpobXmoIjkuIrpnaLnmoTnlYzpnaJcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaiA9IGxlbiAtMTsgaiA+IGk7IGotLSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRlbF90cmFjayA9IHRoaXMubV9wYWdlVHJhY2tTdGFja1tqXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3Ryb3lQYW5lbChkZWxfdHJhY2sudWkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubV9wYWdlVHJhY2tTdGFjay5zbGljZShqLDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMubV9jdXJyZW50UGFnZSA9IHRoaXMubV9wYWdlVHJhY2tTdGFjay5wb3AoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1fY3VycmVudFBhZ2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vMiDlhYjmiorlvZPliY1QYWdl5YWl5qCIXHJcbiAgICAgICAgaWYodGhpcy5tX2N1cnJlbnRQYWdlICE9IHVuZGVmaW5lZCAmJiB0aGlzLm1fY3VycmVudFBhZ2UubmFtZSE9bmFtZSl7XHJcbiAgICAgICAgICAgIHRoaXMubV9wYWdlVHJhY2tTdGFjay5wdXNoKHRoaXMubV9jdXJyZW50UGFnZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+WwhuagiOS4reWFtuWug1BhZ2Ug6K6+5Li65LiN5Y+v6KeBXHJcbiAgICAgICAgZm9yKGxldCB0cmFjayBvZiB0aGlzLm1fcGFnZVRyYWNrU3RhY2spe1xyXG4gICAgICAgICAgICB0cmFjay51aS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhd2FpdCB0aGlzLm9wZW5QYWdlV29ya2VyKHBrZywgbmFtZSwgYXJnKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy/ov5Tlm57kuIrkuIDkuKrpobXpnaJcclxuICAgIHB1YmxpYyBhc3luYyBnb0JhY2tQYWdlKCl7XHJcblxyXG4gICAgICAgIGlmKHRoaXMubV9wYWdlVHJhY2tTdGFjay5sZW5ndGggPiAwKXtcclxuXHJcbiAgICAgICAgICAgIC8v5YWz6Zet5b2T5YmN6aG16Z2iXHJcbiAgICAgICAgICAgIHRoaXMuZGlzdHJveUFsbExvYWRlZFBhbmVsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzdHJveVBhbmVsKHRoaXMubV9jdXJyZW50UGFnZS51aSk7XHJcblxyXG4gICAgICAgICAgICAvL+aJk+W8gOWghuagiOS4reeahOS4iuS4gOmhtemdolxyXG4gICAgICAgICAgICBsZXQgdHJhY2sgPSB0aGlzLm1fcGFnZVRyYWNrU3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgIHRyYWNrLnVpLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1fY3VycmVudFBhZ2UgPSB0cmFjaztcclxuXHJcbiAgICAgICAgICAgIHRyYWNrLnVpLm9uU2hvdyh0cmFjay5hcmcpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmVudGVyTWFpblBhZ2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvL+WbnuWIsOS4u+WfjlxyXG4gICAgcHVibGljIGVudGVyTWFpblBhZ2UoKTp2b2lke1xyXG5cclxuICAgICAgICAgLy/lsIbmoIjkuK3lhbblroNQYWdlIOiuvuS4uuS4jeWPr+ingVxyXG4gICAgICAgICBmb3IobGV0IHRyYWNrIG9mIHRoaXMubV9wYWdlVHJhY2tTdGFjayl7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzdHJveVBhbmVsKHRyYWNrLnVpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tX3BhZ2VUcmFja1N0YWNrLmxlbmd0aCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09VUlMb2FkaW5nXHJcbiAgICAvL+aJk+W8gExvYWRpbmfnlYzpnaJcclxuICAgIHB1YmxpYyBhc3luYyBvcGVuTG9hZGluZyhwa2c6c3RyaW5nLCBuYW1lOnN0cmluZywgYXJnPzphbnkpe1xyXG4gICAgICAgIGlmKCF0aGlzLm1fbG9hZGluZ1BhZ2Upe1xyXG4gICAgICAgICAgICB0aGlzLm1fbG9hZGluZ1BhZ2UgPSBVSUZhY3RvcnkuY3JlYXRlVUkocGtnLCBuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgKHRoaXMubV9sb2FkaW5nUGFnZSBhcyBhbnkpLl9pbnRlcm5hbE9wZW4oYXJnKTtcclxuICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8v5YWz6ZetTG9hZGluZ+eVjOmdolxyXG4gICAgcHVibGljIGNsb3NlTG9hZGluZyhhcmc/OmFueSk6dm9pZHtcclxuICAgICAgICBpZih0aGlzLm1fbG9hZGluZ1BhZ2Upe1xyXG4gICAgICAgICAgICB0aGlzLm1fbG9hZGluZ1BhZ2UuY2xvc2UoYXJnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09VUlXaW5kb3dcclxuICAgIC8v5omT5byA56qX5Y+jXHJcbiAgICBwdWJsaWMgYXN5bmMgb3BlbldpbmRvdyhwa2c6c3RyaW5nLCBuYW1lOnN0cmluZywgYXJnOmFueSl7XHJcblxyXG4gICAgICAgIGxldCB1aTpVSVdpbmRvdyA9IGF3YWl0IHRoaXMub3Blbihwa2csIG5hbWUsIGFyZyk7XHJcblxyXG4gICAgICAgIHJldHVybiB1aTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WFs+mXreeql+WPo1xyXG4gICAgcHVibGljIGNsb3NlV2luZG93KG5hbWU6c3RyaW5nLCBhcmc6YW55KXtcclxuXHJcbiAgICAgICAgbGV0IHVpOlVJV2luZG93ID0gdGhpcy5nZXRQYW5lbFVJKG5hbWUpIGFzIFVJV2luZG93O1xyXG4gICAgICAgIGlmKHVpICE9IG51bGwpe1xyXG4gICAgICAgICAgICB1aS5jbG9zZShhcmcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1VSVdpZGdldFxyXG4gICAgLy/miZPlvIBXaWRpZ2V0XHJcbiAgICBwdWJsaWMgYXN5bmMgb3BlbldpZGdldChwa2c6c3RyaW5nLCBuYW1lOnN0cmluZywgYXJnOmFueSl7XHJcblxyXG4gICAgICAgIGxldCB1aTpVSVdpZGdlID0gYXdhaXQgdGhpcy5vcGVuKHBrZywgbmFtZSwgYXJnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHVpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vdeWFs+mXrVdpZGlnZXRcclxuICAgIHB1YmxpYyBjbG9zZVdpZGdldChuYW1lOnN0cmluZywgYXJnOmFueSl7XHJcblxyXG4gICAgICAgIGxldCB1aTpVSVdpZGdlID0gdGhpcy5nZXRQYW5lbFVJKG5hbWUpIGFzIFVJV2lkZ2U7XHJcbiAgICAgICAgaWYodWkhPW51bGwpe1xyXG4gICAgICAgICAgICB1aS5jbG9zZShhcmcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2VBbGxQYW5lbHMoKXtcclxuICAgICAgICAvL+WIoOmZpOmZpExvYWRpbmfnlYzpnaLlpJbnmoTmiYDmnIlXaW5kb3csIFdpZGdldFxyXG4gICAgICAgIHRoaXMuZGlzdHJveUFsbExvYWRlZFBhbmVsKCk7XHJcbiAgICAgICAgLy/liKDpmaTmiYDmnIlQYWdlXHJcbiAgICAgICAgbGV0IGxlbiA9IHRoaXMubV9wYWdlVHJhY2tTdGFjay5sZW5ndGg7XHJcbiAgICAgICAgZm9yKGxldCBpID0gbGVuLTE7IGkgPj0gMCA7aS0tKXtcclxuICAgICAgICAgICAgbGV0IHRyYWNrID0gdGhpcy5tX3BhZ2VUcmFja1N0YWNrW2ldO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5kaXN0cm95UGFuZWwodHJhY2sudWkpO1xyXG4gICAgICAgICAgICB0aGlzLm1fcGFnZVRyYWNrU3RhY2suc2xpY2UoaSwxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBVSVBhbmVsIH0gZnJvbSBcIi4vVUlQYW5lbFwiO1xyXG5pbXBvcnQgeyBVSVR5cGVEZWYsIFVJQ29tRGVmcyB9IGZyb20gXCIuL1VJRGVmaW5lXCI7XHJcbmltcG9ydCB7IEZhaXJ5R1VJIH0gZnJvbSBcImNzaGFycFwiO1xyXG5pbXBvcnQgeyBTIH0gZnJvbSBcIi4uLy4uL2dsb2JhbC9HYW1lQ29uZmlnXCI7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBVSVBhZ2UgZXh0ZW5kcyBVSVBhbmVse1xyXG4gICAgcHVibGljIGdldCB1aVR5cGUoKTogVUlUeXBlRGVmIHsgICAgXHJcbiAgICAgICAgcmV0dXJuIFVJVHlwZURlZi5QYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbV9idG5Hb0JhY2s6RmFpcnlHVUkuR0J1dHRvbjtcclxuXHJcblxyXG4gICAgcHVibGljIG9uQXdha2UoKTp2b2lke1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubV9idG5Hb0JhY2sgPSB0aGlzLmZ1aS5HZXRDaGlsZChVSUNvbURlZnMuQmFja0J0bik7XHJcblxyXG4gICAgICAgIGlmKHRoaXMubV9idG5Hb0JhY2shPXVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMubV9idG5Hb0JhY2sub25DbGljay5BZGQoKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMub25CdG5Hb0JhY2soKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgb25TaG93KHZvOmFueSk6dm9pZHtcclxuXHJcbiAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25DbG9zZShhcmc6YW55KTp2b2lke1xyXG4gICBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQnRuR29CYWNrKCl7XHJcbiAgICAgICAgUy5VSU1hbmFnZXIuZ29CYWNrUGFnZSgpO1xyXG4gICAgfVxyXG5cclxufSAiLCJpbXBvcnQgeyBVSVR5cGVEZWYsIFVJTGF5ZXJEZWYgfSBmcm9tIFwiLi9VSURlZmluZVwiO1xyXG5pbXBvcnQgeyBGYWlyeUdVSSB9IGZyb20gXCJjc2hhcnBcIjtcclxuaW1wb3J0IHsgUyB9IGZyb20gXCIuLi8uLi9nbG9iYWwvR2FtZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBVSUJhc2UgfSBmcm9tIFwiLi9VSUJhc2VcIjtcclxuaW1wb3J0IHsgVUlDb21wb25lbnQgfSBmcm9tIFwiLi9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBMaXN0IH0gZnJvbSBcIi4uL2NvbW1vbi9MaXN0XCI7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVUlQYW5lbCBleHRlbmRzIFVJQmFzZSB7XHJcblxyXG4gICAgcHVibGljIHBrZ05hbWU6c3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfbmFtZTpzdHJpbmc7XHJcbiAgICBwcml2YXRlIF90aW1lcjtcclxuXHJcbiAgICBwcml2YXRlIF9jb21wb25lbnRzOkxpc3Q8c3RyaW5nPiA9IG5ldyBMaXN0KCk7XHJcbiAgICBwcml2YXRlIF91aUNvbXBvbmVudHM6TGlzdDxVSUNvbXBvbmVudD49bmV3IExpc3QoKTtcclxuXHJcblxyXG4gICAgcHVibGljIHNldCBuYW1lKHY6c3RyaW5nKXtcclxuICAgICAgICB0aGlzLl9uYW1lID0gdjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOnN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHVpVHlwZSgpOiBVSVR5cGVEZWYgeyAgICBcclxuICAgICAgICByZXR1cm4gVUlUeXBlRGVmLlVua293bjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBtX2xheWVyOlVJTGF5ZXJEZWYgPSBVSUxheWVyRGVmLlVua293bjtcclxuICAgIHB1YmxpYyBnZXQgbGF5ZXIoKSA6IFVJTGF5ZXJEZWYge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fbGF5ZXI7IFxyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBsYXllcih2IDogVUlMYXllckRlZikge1xyXG4gICAgICAgIHRoaXMubV9sYXllciA9IHY7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyAgZ2V0IGlzT3BlbigpIDogYm9vbGVhbntcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZnVpLnZpc2libGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCB2aXNpYmxlKGlzQWN0aXZhdGU6Ym9vbGVhbil7XHJcblxyXG4gICAgICAgIHRoaXMuZnVpLnZpc2libGUgPSBpc0FjdGl2YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBvbkF3YWtlKCk6dm9pZDtcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBvblNob3codm8/OmFueSk6dm9pZDtcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBvbkNsb3NlKGFyZz86YW55KTp2b2lkO1xyXG4gICAgcHVibGljIG9uRGlzcG9zZSgpe307XHJcblxyXG4gICAgcHVibGljIG9uVXBkYXRlKCk6dm9pZHt9XHJcblxyXG4gICAgcHVibGljIGF3YWtlKCk6dm9pZHtcclxuICAgICAgICB0aGlzLm9uQXdha2UoKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhcnRUaW1lcigpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuX3RpbWVyKVxyXG4gICAgICAgICAgICB0aGlzLl90aW1lcj1zZXRJbnRlcnZhbCh0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpLDIwMCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTp2b2lke1xyXG4gICAgICAgIHRoaXMub25VcGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOatpOengeacieaWueazleWcqFVJIE1hbmFnZXLkuK3osIPnlKgg77yM54m55q6K6LCD55So44CCXHJcbiAgICAgKiBAcGFyYW0gYXJnIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9pbnRlcm5hbE9wZW4oYXJnOmFueSk6dm9pZHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmxheWVyID0gVUlMYXllckRlZi5nZXREZWZhdWx0TGF5ZXIodGhpcy51aVR5cGUpO1xyXG4gICAgICAgIEZhaXJ5R1VJLkdSb290Lmluc3QuQWRkQ2hpbGQodGhpcy5mdWkpO1xyXG5cclxuICAgICAgICB0aGlzLm9uU2hvdyhhcmcpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBjcmVhdGVDb21wb25lbnQ8VCBleHRlbmRzIFVJQ29tcG9uZW50Pihwa2c6c3RyaW5nLCBuYW1lOnN0cmluZyxjbHM6e25ldygpOlR9KTpQcm9taXNlPFQ+XHJcbiAgICB7XHJcbiAgICAgICAgLy/liqDovb3nu4Tku7ZQYWNrYWdl6LWE5rqQXHJcbiAgICAgICAgaWYocGtnICE9IHRoaXMucGtnTmFtZSAmJiAhdGhpcy5fY29tcG9uZW50cy5jb250YWlucyhwa2cpKXtcclxuICAgICAgICAgICAgYXdhaXQgUy5SZXNNYW5hZ2VyLmxvYWRGYWlyeUdVSVBhY2thZ2UocGtnKTtcclxuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50cy5hZGQocGtnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGNvbXA9bmV3IGNscygpO1xyXG4gICAgICAgIGNvbXAuY3JlYXRlVUkocGtnLG5hbWUpO1xyXG4gICAgICAgIHRoaXMuX3VpQ29tcG9uZW50cy5hZGQoY29tcCk7XHJcbiAgICAgICAgcmV0dXJuIGNvbXA7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBjbG9zZShhcmc6YW55ID0gbnVsbCk6dm9pZHtcclxuXHJcbiAgICAgICAgdGhpcy5vbkNsb3NlKGFyZyk7XHJcbiAgICAgICAgRmFpcnlHVUkuR1Jvb3QuaW5zdC5SZW1vdmVDaGlsZCh0aGlzLmZ1aSk7XHJcbiAgICAgICAgaWYodGhpcy5fdGltZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX3RpbWVyKTtcclxuICAgICAgICAgICAgdGhpcy5fdGltZXI9bnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2UoKTp2b2lke1xyXG5cclxuICAgICAgICAvL+WNuOi9vee7hOS7tlBhY2thZ2VcclxuICAgICAgICB0aGlzLl9jb21wb25lbnRzLmZvcmVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIFMuUmVzTWFuYWdlci5yZWxlYXNlRmFpcnlHVUlQYWNrYWdlKGVsZW1lbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3VpQ29tcG9uZW50cy5mb3JFYWNoKGVsZW1lbnQ9PntcclxuICAgICAgICAgICAgIGVsZW1lbnQub25DbG9zZSgpO1xyXG4gICAgICAgICAgICAgaWYoZWxlbWVudC5wYXJlbnQhPXVuZGVmaW5lZCAmJiBlbGVtZW50LnBhcmVudCE9bnVsbClcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQucGFyZW50LlJlbW92ZUNoaWxkKGVsZW1lbnQuZnVpKTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGVsZW1lbnQuZnVpLkRpc3Bvc2UoKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0aGlzLl9jb21wb25lbnRzLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5fdWlDb21wb25lbnRzLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5mdWkuRGlzcG9zZSgpO1xyXG4gICAgICAgIHRoaXMub25EaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG5cclxufSIsImltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuLi9sb2dnZXIvTG9nZ2VyXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFRpbWVVdGlse1xyXG5cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBwcmVmaXhJbnRlZ2VyKG51bSwgbGVuZ3RoKTpzdHJpbmd7XHJcblxyXG4gICAgICAgIHJldHVybiAgKEFycmF5KGxlbmd0aCkuam9pbignMCcpICsgbnVtKS5zbGljZSgtbGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WwhuS4gOS4quaXtumXtOaVsOi9rOaNouaIkFwiMDA6MDA6MDBcIuagvOW8j1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRUaW1lU3RyaW5nMSh0aW1lSW50IDogbnVtYmVyKTpzdHJpbmcge1xyXG5cclxuICAgICAgICBpZih0aW1lSW50IDw9IDApe1xyXG4gICAgICAgICAgICByZXR1cm4gXCIwMDowMDowMFwiO1xyXG4gICAgICAgIH1lbHNle1xyXG5cclxuICAgICAgICAgICAgbGV0IGhvdXI6bnVtYmVyID0gTWF0aC5mbG9vcih0aW1lSW50IC8gKDYwICogNjApKTtcclxuICAgICAgICAgICAgbGV0IGhvdXJzdHIgPSB0aGlzLnByZWZpeEludGVnZXIoaG91ciwgMik7XHJcblxyXG4gICAgICAgICAgICBsZXQgbWlubnV0ZTpudW1iZXIgPSBNYXRoLmZsb29yKHRpbWVJbnQvIDYwKSAlIDYwO1xyXG4gICAgICAgICAgICBsZXQgbWludXRlc3RyOnN0cmluZyA9IHRoaXMucHJlZml4SW50ZWdlcihtaW5udXRlLCAyKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzZWNvbmQ6bnVtYmVyID0gdGltZUludCAlIDYwO1xyXG4gICAgICAgICAgICBsZXQgc2Vjb25kc3RyOnN0cmluZyA9IHRoaXMucHJlZml4SW50ZWdlcihzZWNvbmQsMik7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYCR7aG91cnN0cn06JHttaW51dGVzdHJ9OiR7c2Vjb25kc3RyfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8v5bCG5LiA5Liq5pe26Ze05pWw6L2s5o2i5oiQXCIwMDowMFwi5qC85byPXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFRpbWVTdHJpbmcodGltZUludDpudW1iZXIpOnN0cmluZ3tcclxuXHJcbiAgICAgICAgaWYodGltZUludCA8PSAwKXtcclxuICAgICAgICAgICAgcmV0dXJuIFwiMDA6MDA6MDBcIjtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IGhvdXI6bnVtYmVyID0gTWF0aC5mbG9vcih0aW1lSW50IC8gKDYwICogNjApKTtcclxuICAgICAgICAgICAgbGV0IGhvdXJzdHIgPSB0aGlzLnByZWZpeEludGVnZXIoaG91ciwgMik7XHJcblxyXG4gICAgICAgICAgICBsZXQgbWlubnV0ZTpudW1iZXIgPSBNYXRoLmZsb29yKHRpbWVJbnQvIDYwKSAlIDYwO1xyXG4gICAgICAgICAgICBsZXQgbWludXRlc3RyOnN0cmluZyA9IHRoaXMucHJlZml4SW50ZWdlcihtaW5udXRlLCAyKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBgJHtob3Vyc3RyfToke21pbnV0ZXN0cn1gO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+WwhuS4gOS4quaXtumXtOaVsOi9rOaNouaIkFwiMDBcIuWIhuagvOW8j1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRUaW1lTWludXRlU3RyaW5nKHRpbWVJbnQ6bnVtYmVyKTpzdHJpbmd7XHJcblxyXG4gICAgICAgIGlmKHRpbWVJbnQgPD0gMCl7XHJcbiAgICAgICAgICAgIHJldHVybiBcIjAwOjAwOjAwXCI7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBtaW5udXRlOm51bWJlciA9IE1hdGguZmxvb3IodGltZUludC8gNjApICUgNjA7XHJcbiAgICAgICAgICAgIGxldCBtaW51dGVzdHI6c3RyaW5nID0gdGhpcy5wcmVmaXhJbnRlZ2VyKG1pbm51dGUsIDIpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGAke21pbnV0ZXN0cn1gO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+WwhuS4gOS4quaXtumXtOaVsOi9rOaNouaIkFwiMDDigJznp5LmoLzlvI9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0VGltZVNlY29uZFN0cmluZyh0aW1lSW50Om51bWJlcik6c3RyaW5ne1xyXG5cclxuICAgICAgICBpZih0aW1lSW50IDw9IDApe1xyXG4gICAgICAgICAgICByZXR1cm4gXCIwMDowMDowMFwiO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgc2Vjb25kOm51bWJlciA9IHRpbWVJbnQgJSA2MDtcclxuICAgICAgICAgICAgbGV0IHNlY29uZHN0cjpzdHJpbmcgPSB0aGlzLnByZWZpeEludGVnZXIoc2Vjb25kLDIpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGAke3NlY29uZHN0cn1gO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPluacrOaciDHlj7fmmK/mmJ/mnJ/lh6BcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0V2Vla09mTW9udGhGaXJzdERheSh0aW1lOm51bWJlcik6bnVtYmVye1xyXG5cclxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKHRpbWUpO1xyXG4gICAgICAgIGRhdGUuc2V0RGF0ZSgxKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRhdGUuZ2V0RGF5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liKTmlq3mmK/lkKbkuLrpl7DlubRcclxuICAgIHB1YmxpYyBzdGF0aWMgaXNMZWFwWWVhcih5ZWFyOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICBpZiAoICh5ZWFyICUgNCA9PSAwICYmIHllYXIgJSAxMDAgIT0gMCkgfHwgKHllYXIgJSA0MDAgPT0gMCkgKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+avj+S4quaciOWvueW6lOeahOWkqeaVsFxyXG4gICAgc3RhdGljICBtb250aHM6QXJyYXk8bnVtYmVyPiA9IFszMSwgMjgsIDMxLCAzMCwgMzEsIDMwLCAzMSwgMzEsIDMwLCAzMSwgMzAsIDMxXTtcclxuICAgIHByaXZhdGUgc3RhdGljIGdldE1vbnRoRGF5c18oeWVhcjpudW1iZXIsIG1vbnRoOm51bWJlcik6bnVtYmVye1xyXG4gICAgICAgIGlmKG1vbnRoID09IDIpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzTGVhcFllYXIoeWVhcikpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMjk7XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMjg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9udGhzW21vbnRoXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNb250aERheXModGltZTpudW1iZXIpOm51bWJlciB7XHJcblxyXG4gICAgICAgIGxldCB0ID0gbmV3IERhdGUodGltZSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1vbnRoRGF5c18odC5nZXRGdWxsWWVhcigpLCB0LmdldE1vbnRoKCkpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIHNsZWVwKG1zOm51bWJlcil7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PntcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgnJyk7XHJcbiAgICAgICAgICAgIH0sIG1zKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyB0ZXN0KCk6dm9pZHtcclxuXHJcbiAgICAgICAgbGV0IHQxOnN0cmluZyA9IHRoaXMuZ2V0VGltZVN0cmluZzEoNTAwMCk7XHJcbiAgICAgICAgTG9nZ2VyLmxvZyh0MSk7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIGxldCB0MjpzdHJpbmcgPSB0aGlzLmdldFRpbWVTdHJpbmcoNTAwMCk7XHJcbiAgICAgICAgTG9nZ2VyLmxvZyh0Mik7XHJcblxyXG4gICAgICAgIGxldCB0MzpzdHJpbmcgPSB0aGlzLmdldFRpbWVNaW51dGVTdHJpbmcoNTAwMCk7XHJcbiAgICAgICAgTG9nZ2VyLmxvZyh0Myk7XHJcblxyXG4gICAgICAgIGxldCB0NDpzdHJpbmcgPSB0aGlzLmdldFRpbWVTZWNvbmRTdHJpbmcoNTAwMCk7XHJcbiAgICAgICAgTG9nZ2VyLmxvZyh0NCk7XHJcblxyXG4gICAgICAgIGxldCB0aW1lOm51bWJlciA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG5cclxuICAgICAgICBsZXQgdDU6bnVtYmVyID0gdGhpcy5nZXRXZWVrT2ZNb250aEZpcnN0RGF5KHRpbWUpO1xyXG4gICAgICAgIExvZ2dlci5sb2coXCJnZXRXZWVrT2ZNb250aEZpcnN0RGF5OiBcIit0NSArIFwiICx0aW1lOlwiK3RpbWUpO1xyXG5cclxuICAgICAgICBsZXQgdDY6bnVtYmVyID0gdGhpcy5nZXRNb250aERheXModGltZSk7XHJcbiAgICAgICAgTG9nZ2VyLmxvZyhcImdldE1vbnRoRGF5czogXCIrdDYpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG59IiwiaW1wb3J0IHsgbmljZV90cyB9IGZyb20gXCIuLi8uLi9kYXRhL3BiL2dlbi9wYlwiO1xyXG5pbXBvcnQgeyBPcGNvZGUgfSBmcm9tIFwiLi4vLi4vZGF0YS9wYi9PcGNvZGVcIjtcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9sb2dnZXIvTG9nZ2VyXCI7XHJcbmltcG9ydCB7IFMgfSBmcm9tIFwiLi4vLi4vZ2xvYmFsL0dhbWVDb25maWdcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgTG9naW5BUEl7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBiZW5jaG1hcmtUZXN0KCl7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIGZvcihsZXQgaT0xOyBpPDI7aSsrKXtcclxuICAgICAgICAgICAgbGV0IG1zZyA9IG5pY2VfdHMuQzJHU19UZXN0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICBtc2cudGVzdElEID0gaTtcclxuICAgICAgICAgICAgbXNnLnRlc3ROYW1lID0gXCJiZW5jaG1hcmsgdGVzdFwiO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgUy5TZXNzaW9uTWFuYWdlci5zZW5kR2F0ZU1zZyhcclxuICAgICAgICAgICAgICAgIE9wY29kZS5NU0dfQzJHU19UZXN0LFxyXG4gICAgICAgICAgICAgICAgbXNnXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgbGV0IHRlc3QgID0gIHJlc3BvbnNlIGFzIG5pY2VfdHMuR1MyQ19UZXN0O1xyXG4gICAgICAgICAgICBMb2dnZXIubG9nKFwiY29kZTogXCIrdGVzdC5FcnJvciArXCIsbXNnOlwiK3Rlc3QuTWVzc2FnZSArXCIscmVzOlwiK3Rlc3QudGVzdFJlc3BvbnNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgbG9naW5SZWFsbVNlcnZlcihhY2NvdW50OnN0cmluZywgcGFzc3dvcmQ6c3RyaW5nKTpQcm9taXNlPG5pY2VfdHMuUjJDX0xvZ2luPntcclxuXHJcbiAgICAgICAgIGxldCBtc2cgPSBuaWNlX3RzLkMyUl9Mb2dpbi5jcmVhdGUoKTtcclxuICAgICAgICAgbXNnLkFjY291bnQgPSBhY2NvdW50O1xyXG4gICAgICAgICBtc2cuUGFzc3dvcmQgPSBwYXNzd29yZDtcclxuXHJcbiAgICAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IFMuU2Vzc2lvbk1hbmFnZXIuc2VuZFJlYWxtTXNnKFxyXG4gICAgICAgICAgICBPcGNvZGUuTVNHX0MyUl9Mb2dpbixcclxuICAgICAgICAgICAgbXNnXHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzcG9uc2UgYXMgbmljZV90cy5SMkNfTG9naW47XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIGxvZ2luR2F0ZVNlcnZlcihnYXRlSWQsIGdhdGVLZXkpOlByb21pc2U8bmljZV90cy5HMkNfTG9naW5HYXRlPntcclxuXHJcbiAgICAgICAgbGV0IG1zZyA9IG5pY2VfdHMuQzJHX0xvZ2luR2F0ZS5jcmVhdGUoKTtcclxuICAgICAgICBtc2cuR2F0ZUlkID0gZ2F0ZUlkO1xyXG4gICAgICAgIG1zZy5LZXkgPSBnYXRlS2V5O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IFMuU2Vzc2lvbk1hbmFnZXIuc2VuZEdhdGVNc2coXHJcbiAgICAgICAgICAgIE9wY29kZS5NU0dfQzJHX0xvZ2luR2F0ZSxcclxuICAgICAgICAgICAgbXNnXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlIGFzIG5pY2VfdHMuRzJDX0xvZ2luR2F0ZTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEFFbnRpdHkgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2VudGl0eS9BRW50aXR5XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUGxheWVyIGV4dGVuZHMgQUVudGl0eSB7XHJcblxyXG4gICAgcHVibGljIG9uQXdha2UoaW5pdERhdGE6IGFueSkge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsZXZlbDpudW1iZXI7XHJcbiAgICBwdWJsaWMgaHA6bnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmxldmVsID0gMTtcclxuICAgICAgICB0aGlzLmhwID0gMTAwO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBTaW5nbGV0b24gfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2NvbW1vbi9TaW5nbGV0b25cIjtcclxuaW1wb3J0IHsgRW50aXR5RmFjdG9yeSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZW50aXR5L0VudGl0eUZhY3RvcnlcIjtcclxuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vUGxheWVyXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFBsYXllck1hbmFnZXIgZXh0ZW5kcyBTaW5nbGV0b248UGxheWVyTWFuYWdlcj57XHJcblxyXG4gICAgcHJpdmF0ZSBwbGF5ZXI6UGxheWVyO1xyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0UGxheWVyKHJlQ3JlYXRlOmJvb2xlYW49ZmFsc2UpOlBsYXllcntcclxuICAgICAgICBpZiAocmVDcmVhdGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllcj1udWxsO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllciA9IEVudGl0eUZhY3RvcnkuSW5zdGFuY2UoRW50aXR5RmFjdG9yeSkuY3JlYXRlKFBsYXllcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZih0aGlzLnBsYXllcj09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyID0gRW50aXR5RmFjdG9yeS5JbnN0YW5jZShFbnRpdHlGYWN0b3J5KS5jcmVhdGUoUGxheWVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnBsYXllcjtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2VudGl0eS9Db21wb25lbnRcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQmFnQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cclxuICAgIHB1YmxpYyBuYW1lOnN0cmluZyA9IFwiaGVsbG9cIjtcclxuICAgIHB1YmxpYyBzaXplOm51bWJlciA9IDEwMDtcclxufSIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvZW50aXR5L0NvbXBvbmVudFwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBQbGF5ZXJJbmZvQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cclxuICAgIHB1YmxpYyBuaWNrTmFtZTpzdHJpbmcgPSBcIkp1c3RpblwiO1xyXG4gICAgcHVibGljIG1vbmV5Om51bWJlciA9IDEwMDAwMDE7XHJcbn0iLCJcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgVUlNZXNzYWdle1xyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIE1TR19TRUxFQ1RfU0VSVkVSOm51bWJlciAgPSAxMDAwO1xyXG4gICAgcHVibGljIHN0YXRpYyBNU0dfU0NFTkVfUFJPR1JFU1M6bnVtYmVyID0gMTAwMTtcclxuICAgIFxyXG5cclxuXHJcbn0iLCJpbXBvcnQgeyBNZXNzZW5nZXIgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2NvbW1vbi9NZXNzZW5nZXJcIjtcclxuaW1wb3J0IHsgU2luZ2xldG9uIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9jb21tb24vU2luZ2xldG9uXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFVJTWVzc2FnZU1hbmdlciBleHRlbmRzIFNpbmdsZXRvbjxVSU1lc3NhZ2VNYW5nZXI+e1xyXG5cclxuICAgIHByaXZhdGUgdWlNZXNzYWdlOk1lc3NlbmdlciA9IG5ldyBNZXNzZW5nZXIoKTtcclxuXHJcblxyXG4gICAgcHVibGljIGFkZExpc3RlbmVyKG1zZ0NvZGU6bnVtYmVyLG9iajphbnksIGxpc3RlbmVyOkZ1bmN0aW9uKXtcclxuXHJcbiAgICAgICAgdGhpcy51aU1lc3NhZ2UuYWRkTGlzdGVuZXIobXNnQ29kZSwgb2JqLCBsaXN0ZW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUxpc3RlbmVyKG1zZ0NvZGU6bnVtYmVyLCBsaXN0ZW5lcjpGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy51aU1lc3NhZ2UucmVtb3ZlTGlzdGVuZXIobXNnQ29kZSwgbGlzdGVuZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVMaXN0ZW5lckJ5Q29kZShtc2dDb2RlOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy51aU1lc3NhZ2UucmVtb3ZlTGlzdGVuZXJCeVR5cGUobXNnQ29kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFydXAoKXtcclxuICAgICAgICB0aGlzLnVpTWVzc2FnZS5jbGVhcnVwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGJyb2FkY2FzdChtc2dDb2RlOm51bWJlcixwYXJhbXM6YW55KXtcclxuXHJcblxyXG4gICAgICAgIHRoaXMudWlNZXNzYWdlLmJyb2FkY2FzdChtc2dDb2RlLCBwYXJhbXMpXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBHYW1lU3RhcnRVSSB9IGZyb20gXCIuLi8uLi8uLi8uLi9kYXRhL3VpL0dhbWVTdGFydFwiO1xyXG5pbXBvcnQgeyBCYXNlU2NlbmUgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL3NjZW5lL0Jhc2VTY2VuZVwiO1xyXG5pbXBvcnQgeyBTIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2dsb2JhbC9HYW1lQ29uZmlnXCI7XHJcbmltcG9ydCB7IFZvSG9tZSB9IGZyb20gXCIuLi92by9Wb0hvbWVcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgR2FtZVN0YXJ0IGV4dGVuZHMgQmFzZVNjZW5le1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uRW50ZXIoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNvbXBsZXRlKCkge1xyXG5cclxuICAgICAgICBsZXQgdm86Vm9Ib21lID0gbmV3IFZvSG9tZSgpO1xyXG4gICAgICAgIHZvLm5hbWUgPSBcIkp1c3RpblwiO1xyXG4gICAgICAgIHZvLmhwID0gMTIwMDtcclxuICAgICAgICB2by5tcCA9IDMzMDA7XHJcbiAgICAgICAgdm8ubW9uZXkgPSA2NjY7XHJcblxyXG4gICAgICAgIFMuVUlNYW5hZ2VyLm9wZW5QYWdlSW5TY2VuZShcclxuICAgICAgICAgICAgR2FtZVN0YXJ0VUkuUGFja2FnZU5hbWUsXHJcbiAgICAgICAgICAgIEdhbWVTdGFydFVJLlVJU3RhcnRWaWV3LFxyXG4gICAgICAgICAgICB2byk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uTGVhdmUoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn0iLCJpbXBvcnQgeyBVSVBhZ2UgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL3VpL1VJUGFnZVwiO1xyXG5pbXBvcnQgeyBiaW5kZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2NvbW1vbi9OaWNlRGVjb3JhdG9yXCI7XHJcbmltcG9ydCB7IEZhaXJ5R1VJIH0gZnJvbSBcImNzaGFycFwiO1xyXG5pbXBvcnQgeyBWb0hvbWUgfSBmcm9tIFwiLi4vdm8vVm9Ib21lXCI7XHJcbmltcG9ydCB7IExvZ2luQVBJIH0gZnJvbSBcIi4uLy4uLy4uL2FwaS9Mb2dpbkFQSVwiO1xyXG5pbXBvcnQgeyBPcGNvZGUgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZGF0YS9wYi9PcGNvZGVcIjtcclxuaW1wb3J0IHsgbmljZV90cyB9IGZyb20gXCIuLi8uLi8uLi8uLi9kYXRhL3BiL2dlbi9wYlwiO1xyXG5pbXBvcnQgeyBTIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2dsb2JhbC9HYW1lQ29uZmlnXCI7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvbG9nZ2VyL0xvZ2dlclwiO1xyXG5cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgVUlTdGFydFZpZXcgZXh0ZW5kcyBVSVBhZ2V7XHJcblxyXG4gICAgQGJpbmRlcihcImNoYXRCdG5cIilcclxuICAgIHB1YmxpYyBtX2NoYXRCdG46RmFpcnlHVUkuR0J1dHRvbjtcclxuICAgIEBiaW5kZXIoXCJiYWdCdG5cIilcclxuICAgIHB1YmxpYyBtX2JhZ0J0bjpGYWlyeUdVSS5HQnV0dG9uO1xyXG4gICAgQGJpbmRlcihcInNob3BCdG5cIilcclxuICAgIHB1YmxpYyBtX3Nob3BCdG46RmFpcnlHVUkuR0J1dHRvbjtcclxuICAgIEBiaW5kZXIoXCJsZXZlbEJ0blwiKVxyXG4gICAgcHVibGljIG1fbGV2ZWxCdG46RmFpcnlHVUkuR0J1dHRvbjtcclxuXHJcbiAgICBAYmluZGVyKFwibmFtZVR4dFwiKVxyXG4gICAgcHVibGljIG1fbmFtZUxibDpGYWlyeUdVSS5HTGFiZWw7XHJcbiAgICBAYmluZGVyKFwiaHBUeHRcIilcclxuICAgIHB1YmxpYyBtX2hwTGJsOkZhaXJ5R1VJLkdMYWJlbDtcclxuICAgIEBiaW5kZXIoXCJtcFR4dFwiKVxyXG4gICAgcHVibGljIG1fbXBMYmw6RmFpcnlHVUkuR0xhYmVsO1xyXG4gICAgQGJpbmRlcihcIm1vbmV5VHh0XCIpXHJcbiAgICBwdWJsaWMgbV9tb25leUxibDpGYWlyeUdVSS5HTGFiZWw7XHJcblxyXG5cclxuICAgIHB1YmxpYyBvbkF3YWtlKCk6dm9pZHtcclxuICAgICAgICBzdXBlci5vbkF3YWtlKCk7XHJcblxyXG4gICAgICAgIHRoaXMubV9jaGF0QnRuLm9uQ2xpY2suQWRkKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMub25jaGF0QnRuKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5tX2JhZ0J0bi5vbkNsaWNrLkFkZCgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLm9uYmFnQnRuKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5tX3Nob3BCdG4ub25DbGljay5BZGQoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5vbnNob3BCdG4oKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm1fbGV2ZWxCdG4ub25DbGljay5BZGQoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5vbmxldmVsQnRuKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBwdWJsaWMgb25TaG93KHZvOlZvSG9tZSk6dm9pZHtcclxuICAgICAgICBzdXBlci5vblNob3codm8pO1xyXG5cclxuICAgICAgICB0aGlzLm1fbmFtZUxibC50ZXh0ID0gdm8ubmFtZTtcclxuICAgICAgICB0aGlzLm1fbXBMYmwudGV4dCA9IHZvLm1wLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy5tX2hwTGJsLnRleHQgPSB2by5ocC50b1N0cmluZygpO1xyXG4gICAgICAgIHRoaXMubV9tb25leUxibC50ZXh0ID0gdm8ubW9uZXkudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgUy5HYW1lU2Vzc2lvbi5saXN0ZW4oT3Bjb2RlLk1TR19HUzJDX1Rlc3QsZnVuY3Rpb24obXNnOm5pY2VfdHMuR1MyQ19UZXN0KXtcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIuaUtuWIsOacjeWKoeWZqOS4i+WPkeeahOa2iOaBr+OAguOAguOAguOAglwiK21zZy50ZXN0UmVzcG9uc2UpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIHB1YmxpYyBvbkNsb3NlKGFyZzphbnkpOnZvaWR7XHJcbiAgICAgICAgc3VwZXIub25DbG9zZShhcmcpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIG9uY2hhdEJ0bigpe1xyXG5cclxuICAgICAgICAvLyBTLlVJTWFuYWdlci5vcGVuV2luZG93KFxyXG4gICAgICAgIC8vICAgICBjb21tb25VSS5QYWNrYWdlTmFtZSxcclxuICAgICAgICAvLyAgICAgY29tbW9uVUkuVUlVSU5vdGljZVdpbixcclxuICAgICAgICAvLyAgICAgbnVsbCk7XHJcbiAgICAgICAgTG9nZ2VyLmxvZyhcIm9uIGNoYXQuLi5cIik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgb25iYWdCdG4oKXtcclxuICAgICAgICBMb2dnZXIubG9nKFwib24gYmFnIC4uXCIpO1xyXG5cclxuICAgICAgICAvL2JlbmNobWFyayB0ZXN0XHJcbiAgICAgICAgTG9naW5BUEkuYmVuY2htYXJrVGVzdCgpO1xyXG5cclxuICAgIH1cclxuICAgIHB1YmxpYyBvbnNob3BCdG4oKXtcclxuICAgICAgICBcclxuICAgICAgICAvLyBTLlVJTWFuYWdlci5vcGVuUGFnZShcclxuICAgICAgICAvLyAgICAgaG9tZVVJLlBhY2thZ2VOYW1lLFxyXG4gICAgICAgIC8vICAgICBob21lVUkuVUlTaG9wUGFnZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgb25sZXZlbEJ0bigpe1xyXG4gICAgICAgIExvZ2dlci5sb2coXCJvbiBsZXZlbC4uLlwiKTtcclxuICAgIH1cclxuXHJcbn0iLCJcclxuXHJcbmV4cG9ydCBjbGFzcyBWb0hvbWV7XHJcblxyXG4gICAgcHVibGljIG5hbWU6c3RyaW5nO1xyXG4gICAgcHVibGljIGhwOm51bWJlcjtcclxuICAgIHB1YmxpYyBtcDpudW1iZXI7XHJcbiAgICBwdWJsaWMgbW9uZXk6bnVtYmVyO1xyXG5cclxufSIsIi8vIGltcG9ydCB7IGhvbWVVSSB9IGZyb20gXCIuLi8uLi8uLi8uLi9kYXRhL3VpL2hvbWVcIjtcclxuaW1wb3J0IHsgQmFzZVNjZW5lIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1ld29yay9zY2VuZS9CYXNlU2NlbmVcIjtcclxuaW1wb3J0IHsgUyB9IGZyb20gXCIuLi8uLi8uLi8uLi9nbG9iYWwvR2FtZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBWb0hvbWUgfSBmcm9tIFwiLi4vdm8vVm9Ib21lXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEhvbWVTY2VuZSBleHRlbmRzIEJhc2VTY2VuZXtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkVudGVyKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25Db21wbGV0ZSgpIHtcclxuXHJcbiAgICAgICAgbGV0IHZvOlZvSG9tZSA9IG5ldyBWb0hvbWUoKTtcclxuICAgICAgICB2by5uYW1lID0gXCJKdXN0aW5cIjtcclxuICAgICAgICB2by5ocCA9IDEyMDA7XHJcbiAgICAgICAgdm8ubXAgPSAzMzAwO1xyXG4gICAgICAgIHZvLm1vbmV5ID0gNjY2O1xyXG5cclxuICAgICAgICAvLyBTLlVJTWFuYWdlci5vcGVuUGFnZUluU2NlbmUoXHJcbiAgICAgICAgLy8gICAgIGhvbWVVSS5QYWNrYWdlTmFtZSxcclxuICAgICAgICAvLyAgICAgaG9tZVVJLlVJSG9tZVBhZ2UsXHJcbiAgICAgICAgLy8gICAgIHZvKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25MZWF2ZSgpIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG5cclxufSIsIlxyXG5cclxuZXhwb3J0IGNsYXNzIFZvSG9tZXtcclxuXHJcbiAgICBwdWJsaWMgbmFtZTpzdHJpbmc7XHJcbiAgICBwdWJsaWMgaHA6bnVtYmVyO1xyXG4gICAgcHVibGljIG1wOm51bWJlcjtcclxuICAgIHB1YmxpYyBtb25leTpudW1iZXI7XHJcblxyXG59IiwiaW1wb3J0IHsgQmFzZVNjZW5lIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1ld29yay9zY2VuZS9CYXNlU2NlbmVcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgUHZlU2NlbmUgZXh0ZW5kcyBCYXNlU2NlbmV7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkVudGVyKCkge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgcHVibGljIG9uQ29tcGxldGUoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgb25MZWF2ZSgpIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG5cclxufSIsImltcG9ydCB7IEpzTWFuYWdlciB9IGZyb20gXCJjc2hhcnBcIjtcclxuaW1wb3J0IHsgR2FtZU9iamVjdFBvb2wgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2NvbW1vbi9HYW1lT2JqZWN0UG9vbFwiO1xyXG5pbXBvcnQgeyBSZXNNYW5hZ2VyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9jb21tb24vUmVzTWFuYWdlclwiO1xyXG4vLyBpbXBvcnQgeyBTdG9yeU1hbmFnZXIgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2luay9TdG9yeU1hbmFnZXJcIjtcclxuLy8gaW1wb3J0IHsgU3RvcnlNZXNzYWdlTWFuYWdlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvaW5rL1N0b3J5TWVzc2FnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgR2FtZVNlc3Npb24gfSBmcm9tIFwiLi4vZnJhbWV3b3JrL25ldC9HYW1lU2Vzc2lvblwiO1xyXG5pbXBvcnQgeyBIdHRwTWFuYWdlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvbmV0L0h0dHBNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNlc3Npb25NYW5hZ2VyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9uZXQvU2Vzc2lvbk1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU2NlbmVNYW5hZ2VyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9zY2VuZS9TY2VuZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgVUlNYW5hZ2VyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay91aS9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgVUlNZXNzYWdlTWFuZ2VyIH0gZnJvbSBcIi4uL2dhbWUvZXZlbnQvVUlNZXNzYWdlTWFuYWdlclwiO1xyXG5cclxuZXhwb3J0ICBjbGFzcyBHYW1lQ29uZmlne1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZGVidWc6Ym9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZWFsbVNlcnZlcklQOnN0cmluZyA9IFwiMTI3LjAuMC4xXCI7IFxyXG4gICAgcHVibGljIHN0YXRpYyByZWFsbVNlcnZlclBvcnQ6bnVtYmVyID0gOTAwMTtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTe1xyXG4gICAgcHVibGljIHN0YXRpYyBVSU1hbmFnZXIgPSBVSU1hbmFnZXIuSW5zdGFuY2UoVUlNYW5hZ2VyKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgVUlNZXNzYWdlTWFuZ2VyID0gVUlNZXNzYWdlTWFuZ2VyLkluc3RhbmNlKFVJTWVzc2FnZU1hbmdlcik7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNjZW5lTWFuYWdlciA9IFNjZW5lTWFuYWdlci5JbnN0YW5jZShTY2VuZU1hbmFnZXIpO1xyXG4gICAgcHVibGljIHN0YXRpYyBHYW1lT2JqZWN0UG9vbCA9IEdhbWVPYmplY3RQb29sLkluc3RhbmNlKEdhbWVPYmplY3RQb29sKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgUmVzTWFuYWdlciA9IFJlc01hbmFnZXIuSW5zdGFuY2UoUmVzTWFuYWdlcik7XHJcbiAgICAvLyBwdWJsaWMgc3RhdGljIFN0b3J5TWFuYWdlciA9IFN0b3J5TWFuYWdlci5JbnN0YW5jZShTdG9yeU1hbmFnZXIpO1xyXG4gICAgcHVibGljIHN0YXRpYyBTZXNzaW9uTWFuYWdlciA9IFNlc3Npb25NYW5hZ2VyLkluc3RhbmNlKFNlc3Npb25NYW5hZ2VyKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgR2FtZVNlc3Npb24gPSBHYW1lU2Vzc2lvbi5JbnN0YW5jZShHYW1lU2Vzc2lvbik7XHJcbiAgICAvLyBwdWJsaWMgc3RhdGljIFN0b3J5TWVzc2FnZU1hbmFnZXIgPSBTdG9yeU1lc3NhZ2VNYW5hZ2VyLkluc3RhbmNlKFN0b3J5TWVzc2FnZU1hbmFnZXIpO1xyXG4gICAgcHVibGljIHN0YXRpYyBIdHRwTWFuYWdlciA9IEh0dHBNYW5hZ2VyLkluc3RhbmNlKEh0dHBNYW5hZ2VyKTtcclxufVxyXG4iLCJcclxuXHJcbmltcG9ydCB7U2luZ2xldG9ufSBmcm9tICcuLi9mcmFtZXdvcmsvY29tbW9uL1NpbmdsZXRvbic7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJy4uL2ZyYW1ld29yay9sb2dnZXIvTG9nZ2VyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTaW5nbGV0b25UZXN0IGV4dGVuZHMgU2luZ2xldG9uPFNpbmdsZXRvblRlc3Q+e1xyXG5cclxuICAgIHByaXZhdGUgbnVtOm51bWJlciA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICBMb2dnZXIubG9nKFwiU2luZ2xldG9uVGVzdCBjYWxsIGNvbnN0cnVjdG9yXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGQoKSA6IHZvaWQge1xyXG5cclxuICAgICAgICB0aGlzLm51bSArPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0ZXN0KCkgOiBudW1iZXJ7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLm51bTtcclxuXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHtUaW1lVXRpbH0gZnJvbSAnLi4vZnJhbWV3b3JrL3V0aWwvVGltZVV0aWwnO1xyXG5pbXBvcnQge1NpbmdsZXRvblRlc3R9IGZyb20gJy4vU2luZ2xldG9uVGVzdCc7XHJcbmltcG9ydCB7TWVzc2VuZ2VyfSBmcm9tICcuLi9mcmFtZXdvcmsvY29tbW9uL01lc3Nlbmdlcic7XHJcbmltcG9ydCB7IFJlc01hbmFnZXIgfSBmcm9tICcuLi9mcmFtZXdvcmsvY29tbW9uL1Jlc01hbmFnZXInO1xyXG5pbXBvcnQgeyBTa2lsbENvbmZpZ1RCLCBTa2lsbENvbmZpZ1RSIH0gZnJvbSAnLi4vZGF0YS9leGNlbC9Ta2lsbENvbmZpZyc7XHJcbmltcG9ydCB7IFJlZEhpbnRzTWVzc2FnZU1hbmFnZXIgfSBmcm9tICcuLi9mcmFtZXdvcmsvcmVkaGludHMvUmVkSGludHNNZXNzYWdlTWFuYWdlcic7XHJcbmltcG9ydCB7IGVudW1SZWRIaW50cywgUmVkSGludHNNYW5hZ2VyIH0gZnJvbSAnLi4vZnJhbWV3b3JrL3JlZGhpbnRzL1JlZEhpbnRzTWFuYWdlcic7XHJcbi8vIGltcG9ydCB7IFN0b3J5IH0gZnJvbSAnaW5ranMnO1xyXG5pbXBvcnQgeyBuaWNlX3RzIH0gZnJvbSAnLi4vZGF0YS9wYi9nZW4vcGInO1xyXG5pbXBvcnQgeyBTIH0gZnJvbSAnLi4vZ2xvYmFsL0dhbWVDb25maWcnO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICcuLi9mcmFtZXdvcmsvbG9nZ2VyL0xvZ2dlcic7XHJcbmltcG9ydCB7IFBsYXllck1hbmFnZXIgfSBmcm9tICcuLi9nYW1lL2VudGl0eS9QbGF5ZXJNYW5hZ2VyJztcclxuaW1wb3J0IHsgQmFnQ29tcG9uZW50IH0gZnJvbSAnLi4vZ2FtZS9lbnRpdHkvY29tcG9uZW50L0JhZ0NvbXBvbmVudCc7XHJcbmltcG9ydCB7IFBsYXllckluZm9Db21wb25lbnQgfSBmcm9tICcuLi9nYW1lL2VudGl0eS9jb21wb25lbnQvUGxheWVySW5mb0NvbXBvbmVudCc7XHJcbi8vIGltcG9ydCB7IFRlc3RDLCBUZXN0UCB9IGZyb20gJ2NzaGFycCc7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFVuaXRUZXN0e1xyXG4gICAgcHVibGljIHN0YXRpYyB0ZXN0VmFyOm51bWJlciA9IDEwMDAwO1xyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIGRvVGVzdCgpe1xyXG5cclxuICAgICAgICBMb2dnZXIubG9nKFwiVGltZVV0aWwgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cIik7XHJcbiAgICAgICAgVGltZVV0aWwudGVzdCgpO1xyXG5cclxuICAgICAgICBMb2dnZXIubG9nKFwiU2luZ2xldG9uID09PT09PT09PT09PT09PT09PT09PT09PT09PT09XCIpO1xyXG4gICAgICAgIFNpbmdsZXRvblRlc3QuSW5zdGFuY2UoU2luZ2xldG9uVGVzdCk7XHJcbiAgICAgICAgTG9nZ2VyLmxvZyhcIj09PVwiKTtcclxuICAgICAgICBsZXQgdDE6IFNpbmdsZXRvblRlc3QgPSBTaW5nbGV0b25UZXN0Lkluc3RhbmNlKFNpbmdsZXRvblRlc3QpO1xyXG4gICAgICAgIGxldCB0MjogU2luZ2xldG9uVGVzdCA9IFNpbmdsZXRvblRlc3QuSW5zdGFuY2UoU2luZ2xldG9uVGVzdCk7XHJcblxyXG4gICAgICAgIExvZ2dlci5sb2codDEudGVzdCgpICsgXCIgOiBcIiArIHQyLnRlc3QoKSk7XHJcbiAgICAgICAgdDEuYWRkKCk7XHJcbiAgICAgICAgTG9nZ2VyLmxvZyh0MS50ZXN0KCkgKyBcIiA6IFwiICsgdDIudGVzdCgpKTtcclxuICAgICAgICB0Mi5hZGQoKTtcclxuICAgICAgICBMb2dnZXIubG9nKHQxLnRlc3QoKSArIFwiIDogXCIgKyB0Mi50ZXN0KCkpO1xyXG5cclxuXHJcbiAgICAgICAgTG9nZ2VyLmxvZyhcIk1lc3NhZ2VyID09PT09PT09PT09PT09PT09PT09PT09PT09PT09XCIpO1xyXG5cclxuICAgICAgICBsZXQgbWVzc2VuZ2VyOk1lc3NlbmdlciA9IG5ldyBNZXNzZW5nZXIoKTtcclxuICAgICAgICBsZXQgbGlzdGVuOkZ1bmN0aW9uID0gZnVuY3Rpb24oYTpudW1iZXIsIGI6c3RyaW5nKXtcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhgbGlzdGVuIGNhbGw6ICR7YX0gLCAke2J9YClcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxpc3RlbjI6RnVuY3Rpb24gPSBmdW5jdGlvbihhOm51bWJlciwgYjpzdHJpbmcpe1xyXG4gICAgICAgICAgICBMb2dnZXIubG9nKGBsaXN0ZW4gY2FsbDI6ICR7YX0gLCAke2J9YClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCAgRVZFTlRfQ09ERTpudW1iZXIgPSAxMDA7XHJcbiAgICAgICAgbWVzc2VuZ2VyLmFkZExpc3RlbmVyKEVWRU5UX0NPREUsdGhpcywgbGlzdGVuKTtcclxuICAgICAgICBtZXNzZW5nZXIuYWRkTGlzdGVuZXIoRVZFTlRfQ09ERSx0aGlzLCBsaXN0ZW4yKTtcclxuICAgICAgICBtZXNzZW5nZXIuYnJvYWRjYXN0KEVWRU5UX0NPREUsIDk5OSxcIiBIZWxsb1wiKTtcclxuXHJcbiAgICAgICAgbWVzc2VuZ2VyLnJlbW92ZUxpc3RlbmVyKEVWRU5UX0NPREUsbGlzdGVuKTtcclxuICAgICAgICBtZXNzZW5nZXIuYnJvYWRjYXN0KEVWRU5UX0NPREUsIDk5OSxcIiBIZWxsb1wiKTtcclxuXHJcbiAgICAgICAgbWVzc2VuZ2VyLmNsZWFydXAoKTtcclxuICAgICAgICBtZXNzZW5nZXIuYnJvYWRjYXN0KEVWRU5UX0NPREUsIDk5OSxcIiBIZWxsb1wiKTtcclxuXHJcblxyXG4gICAgICAgIExvZ2dlci5sb2coXCJUaW1lciA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PVwiKTtcclxuXHJcbiAgICAgICAgbGV0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCk9PntcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhcImludGVyIHZhbC4uXCIpXHJcbiAgICAgICAgfSwxMDAwKTtcclxuICAgICAgICBsZXQgdGltZW91dCA9IHNldFRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XHJcbiAgICAgICAgfSw1MDAwKTsgXHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICBMb2dnZXIubG9nKFwiUmVzb3VyY2VNYW5hZ2VyID09PT09PT09PT09PT09PT09PT09PT09PT09PT09XCIpO1xyXG5cclxuICAgICAgIC8vIGxldCBwcmVmYWIgPSBhd2FpdCBSZXNNYW5hZ2VyLkluc3RhbmNlKFJlc01hbmFnZXIpLmxvYWRQcmVmYWIoXCJNb2RlbHMvMTAwMS9DaGFyYWN0ZXIucHJlZmFiXCIpIDtcclxuICAgICAgICBcclxuICAgICAgICAvL0xvZ2dlci5sb2cocHJlZmFiKTtcclxuXHJcbiAgICAgICAgLy9sZXQgaW5zdCA9IENTLlVuaXR5RW5naW5lLkdhbWVPYmplY3QuSW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAvL2luc3QubmFtZSA9IFwiVGVzdCBDaFwiO1xyXG5cclxuXHJcbiAgICAgICAgTG9nZ2VyLmxvZyhcIuW8leeUqOexu+WeiyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PVwiKTtcclxuICAgICAgICBsZXQgdGVzdE1hcDpNYXA8c3RyaW5nLEFycmF5PG51bWJlcj4+ID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIHRlc3RNYXAuc2V0KFwia2V5MVwiICxuZXcgQXJyYXkoKSk7XHJcblxyXG4gICAgICAgIGxldCBhcnIxOkFycmF5PG51bWJlcj4gPSB0ZXN0TWFwLmdldChcImtleTFcIik7XHJcbiAgICAgICAgYXJyMS5wdXNoKDEyKTtcclxuICAgICAgICBhcnIxLnB1c2goMzMzKTtcclxuXHJcbiAgICAgICAgbGV0IGFycjI6QXJyYXk8bnVtYmVyPiA9IHRlc3RNYXAuZ2V0KFwia2V5MVwiKTtcclxuICAgICAgICBMb2dnZXIubG9nKGFycjIpO1xyXG5cclxuXHJcbiAgICAgICAgLy8gTG9nZ2VyLmxvZyhcIkZhcml5R1VJID09PT09PT09PT09PT09PT09PT09PT09PT09PT09XCIpO1xyXG4gICAgICAgIC8vICBsZXQgcGFnZTpVSV9Mb2dpblBhZ2UgPSBuZXcgVUlfTG9naW5QYWdlKCk7XHJcbiAgICAgICAgLy8gIENTLkZhaXJ5R1VJLkdSb290Lmluc3QuQWRkQ2hpbGQocGFnZS5fdWkpO1xyXG4gICAgICAgIC8vICBMb2dnZXIubG9nKHBhZ2UuX3VpKTtcclxuXHJcbiAgICAgICAgLy8gTG9nZ2VyLmxvZyhcIk1vZHVsZU1hbmFnZXIgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cIik7XHJcblxyXG4gICAgICAgIC8vIE1vZHVsZU1hbmFnZXIuSW5zdGFuY2UoTW9kdWxlTWFuYWdlcikuY3JlYXRlTW9kdWxlKE1vZHVsZURlZi5Mb2dpbk1vZHVsZSxcImNyZWF0ZSBsb2dpblwiKTtcclxuXHJcbiAgICAgICAgLy8gTW9kdWxlTWFuYWdlci5JbnN0YW5jZShNb2R1bGVNYW5hZ2VyKS5zZW5kTWVzc2FnZShNb2R1bGVEZWYuTG9naW5Nb2R1bGUsIFwidGVzdDFcIiwyMjMzKTtcclxuICAgICAgICAvLyBNb2R1bGVNYW5hZ2VyLkluc3RhbmNlKE1vZHVsZU1hbmFnZXIpLnNlbmRNZXNzYWdlKE1vZHVsZURlZi5Ib21lTW9kdWxlLCBcInRlc3QyXCIsMjIzMyk7XHJcbiAgICAgICAgLy8gTG9nZ2VyLmxvZyhcInRoZW4gY3JlYXRlIEhvbWVcIik7XHJcbiAgICAgICAgLy8gTW9kdWxlTWFuYWdlci5JbnN0YW5jZShNb2R1bGVNYW5hZ2VyKS5jcmVhdGVNb2R1bGUoTW9kdWxlRGVmLkhvbWVNb2R1bGUsXCJjcmVhdGUgbG9naW5cIik7XHJcbiAgICBcclxuICAgICAgICBcclxuICAgICAgICBMb2dnZXIubG9nKFwiVUlNYW5hZ2VyID09PT09PT09PT09PT09PT09PT09PT09PT09PT09XCIpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIExvZ2dlci5sb2coXCJleGNlbCBkYXRhID09PT09PT09PT09PT09PT09PT09PT09PT09PT09XCIpO1xyXG4gICAgICAgIGxldCBza2lsbE1hcCA9IFNraWxsQ29uZmlnVEIuSW5zdGFuY2UoU2tpbGxDb25maWdUQikudHJzO1xyXG4gICAgICAgIGxldCBza2lsbHRyOlNraWxsQ29uZmlnVFIgPSBza2lsbE1hcC5nZXQoMTAwMyk7XHJcbiAgICAgICAgTG9nZ2VyLmxvZyhgJHtza2lsbHRyLl9OYW1lfSA6ICR7c2tpbGx0ci5fQXR0YWNrVHlwZX1gKVxyXG4gICAgICAgIGxldCBpbXBhY3R0eXBlID0gc2tpbGx0ci5fSW1wYWN0VHlwZTtcclxuICAgICAgICBMb2dnZXIubG9nKGltcGFjdHR5cGUpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIExvZ2dlci5sb2coXCJQcm90b2J1ZiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PVwiKTtcclxuXHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICBsZXQgYzJyTG9naW4gPSB7XHJcbiAgICAgICAgICAgICAgICBcIkFjY291bnRcIiA6IFwidGVzdFwiLFxyXG4gICAgICAgICAgICAgICAgXCJQYXNzd29yZFwiIDogXCIxMjM0XCJcclxuICAgICAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgICAgICAvL+mqjOivgVxyXG4gICAgICAgICAgICBsZXQgdjEgPSBuaWNlX3RzLkMyUl9Mb2dpbi52ZXJpZnkoYzJyTG9naW4pO1xyXG4gICAgICAgICAgICBMb2dnZXIubG9nKFwidmVyaWZ5IHBiOiBcIisgdjEpO1xyXG5cclxuICAgICAgICAgICAgbGV0IG1zZyA9IG5pY2VfdHMuQzJSX0xvZ2luLmNyZWF0ZShjMnJMb2dpbilcclxuICAgICAgICAgICAgbXNnLkFjY291bnQgPSBcInRlc3QxXCJcclxuICAgICAgICAgICAgbXNnLlBhc3N3b3JkID0gXCIxMTIyXCJcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhtc2cpXHJcblxyXG4gICAgICAgICAgICBsZXQgYnVmID0gbmljZV90cy5DMlJfTG9naW4uZW5jb2RlKG1zZykuZmluaXNoKClcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhidWYpXHJcblxyXG4gICAgICAgICAgICBsZXQgZGVfYnVmID0gbmljZV90cy5DMlJfTG9naW4uZGVjb2RlKGJ1ZilcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhkZV9idWYuQWNjb3VudClcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhkZV9idWYuUGFzc3dvcmQpXHJcblxyXG5cclxuICAgICAgICB9Y2F0Y2goZXgpe1xyXG4gICAgICAgICAgICBMb2dnZXIubG9nKGV4KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBMb2dnZXIubG9nKFwiVWludEFycmF5ID09PT09PT09PT09PT09PT09PT09PT09PT09PT09XCIpO1xyXG5cclxuICAgICAgICBsZXQgIG9wY29kZV9hcnIgPSBuZXcgVWludDhBcnJheShbMjU3LDI1XSk7XHJcbiAgICAgICAgTG9nZ2VyLmxvZyhvcGNvZGVfYXJyLnN1YmFycmF5KDAsMSkpO1xyXG4gICAgICAgIExvZ2dlci5sb2cob3Bjb2RlX2Fyci5sZW5ndGgpO1xyXG5cclxuICAgICAgICBsZXQgb3Bjb2RlX2FycjIgPSBuZXcgVWludDhBcnJheShbMzNdKTtcclxuXHJcbiAgICAgICAgLy/lkIjlubYgVWludDhBcnJheVxyXG4gICAgICAgIGxldCBtZXJnZV9hcnIgPSBuZXcgVWludDhBcnJheShvcGNvZGVfYXJyLmxlbmd0aCArIG9wY29kZV9hcnIyLmxlbmd0aCk7XHJcbiAgICAgICAgbWVyZ2VfYXJyLnNldChvcGNvZGVfYXJyMik7XHJcbiAgICAgICAgbWVyZ2VfYXJyLnNldChvcGNvZGVfYXJyLCBvcGNvZGVfYXJyMi5sZW5ndGgpO1xyXG4gICAgICAgIExvZ2dlci5sb2cobWVyZ2VfYXJyLmxlbmd0aCk7XHJcbiAgICAgXHJcbiAgICAgICAgbGV0IG46bnVtYmVyID0gNTY3ODtcclxuICAgICAgICBsZXQgYnVmZmVyOlVpbnQ4QXJyYXkgPSBuZXcgVWludDhBcnJheSg0KTtcclxuXHJcbiAgICAgICAgLy8gPDwg5bem56e7ICA+PiDlj7Pnp7sgID4+PiDml6DnrKblj7flj7Pnp7tcclxuICAgICAgICAvL27ovax1aW50OEFycmF5XHJcbiAgICAgICAgYnVmZmVyWzBdID0gbiA+Pj4gMjQ7XHJcbiAgICAgICAgYnVmZmVyWzFdID0gbiA+Pj4gMTY7XHJcbiAgICAgICAgYnVmZmVyWzJdID0gbiA+Pj4gODtcclxuICAgICAgICBidWZmZXJbM10gPSBuICYgMHhmZjtcclxuXHJcblxyXG4gICAgICAgIC8vdW5pdDhBcnJheei9rG5cclxuICAgICAgICBuID0gYnVmZmVyWzBdIDw8IDI0IHwgYnVmZmVyWzFdIDw8IDE2IHwgYnVmZmVyWzJdIDw8IDggfCBidWZmZXJbM107XHJcbiAgICAgICAgTG9nZ2VyLmxvZyhuKTtcclxuXHJcblxyXG4gICAgICAgIG4gPSAzMDA7XHJcbiAgICAgICAgbGV0IGJ1ZmZlcjE6VWludDhBcnJheSA9IG5ldyBVaW50OEFycmF5KDIpO1xyXG4gICAgICAgIGJ1ZmZlcjFbMF0gPSBuID4+PiA4O1xyXG4gICAgICAgIGJ1ZmZlcjFbMV0gPSBuICYgMHhmZjtcclxuXHJcbiAgICAgICAgTG9nZ2VyLmxvZyhidWZmZXIxKTtcclxuICAgICAgICBuID0gYnVmZmVyMVswXTw8OCB8IGJ1ZmZlcjFbMV07XHJcbiAgICAgICAgTG9nZ2VyLmxvZyhuKTtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgTG9nZ2VyLmxvZyhcInNsZWVwID09PT09PT09PT09PT09PT09PT09PT09PT09PT09XCIpO1xyXG4gICAgICAgIGF3YWl0IFRpbWVVdGlsLnNsZWVwKDEwMDApO1xyXG4gICAgICAgIExvZ2dlci5sb2coXCJzbGVlcCAuLmVuZFwiKTtcclxuXHJcblxyXG4gICAgICAgIC8vIExvZ2dlci5sb2coXCJmbGF0YnVmZmVyID09PT09PT09PT09PT09PT09PT09PT09PT09PT09XCIpO1xyXG4gICAgICAgIC8vIHRyeXtcclxuICAgICAgICAvLyAgICAgbGV0IGJ5dGVzOkFycmF5QnVmZmVyID0gYXdhaXQgUmVzTWFuYWdlci5JbnN0YW5jZShSZXNNYW5hZ2VyKS5sb2FkVGV4dEJ5dGVzKFwiQ29uZmlnL2ZiL3VuaXRjb25maWcuYnl0ZXNcIilcclxuICAgICAgICAvLyAgICAgbGV0IHVuaXRCeXRlID0gbmV3IGZsYXRidWZmZXJzLkJ5dGVCdWZmZXIobmV3IFVpbnQ4QXJyYXkoYnl0ZXMpKTtcclxuICAgICAgICAvLyAgICAgTG9nZ2VyLmxvZyh1bml0Qnl0ZSk7XHJcbiAgICAgICAgLy8gICAgIGxldCB1bml0Y29uZmlnOmZiLnVuaXRjb25maWdUQiA9IGZiLnVuaXRjb25maWdUQi5nZXRSb290QXN1bml0Y29uZmlnVEIodW5pdEJ5dGUpXHJcbiAgICAgICAgLy8gICAgIExvZ2dlci5sb2codW5pdGNvbmZpZy51bml0Y29uZmlnVFJTTGVuZ3RoKCkpO1xyXG4gICAgICAgICAgICBcclxuICAgIFxyXG4gICAgICAgIC8vICAgICBmb3IobGV0IGk9MDsgaTx1bml0Y29uZmlnLnVuaXRjb25maWdUUlNMZW5ndGgoKTsgaSsrKXtcclxuICAgICAgICAvLyAgICAgICAgIGxldCBhID0gIHVuaXRjb25maWcudW5pdGNvbmZpZ1RSUyhpKTtcclxuICAgICAgICAvLyAgICAgICAgIExvZ2dlci5sb2coYS5OYW1lKCkpO1xyXG4gICAgICAgIC8vICAgICB9XHJcblxyXG4gICAgICAgIC8vIH1jYXRjaChleCl7XHJcbiAgICAgICAgLy8gICAgIExvZ2dlci5lcnJvcihleCk7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuXHJcblxyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIua1i+ivlee6oueCueezu+e7nyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PVwiKTtcclxuXHJcbiAgICAgICAgICAgIFJlZEhpbnRzTWVzc2FnZU1hbmFnZXIuSW5zdGFuY2UoUmVkSGludHNNZXNzYWdlTWFuYWdlcikuYWRkTGlzdGVuZXIoXHJcbiAgICAgICAgICAgICAgICBlbnVtUmVkSGludHMuY2hhdCxcclxuICAgICAgICAgICAgICAgIHRoaXMsXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCJyZWQgaGludHMgY2hhdC4uLlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgUmVkSGludHNNZXNzYWdlTWFuYWdlci5JbnN0YW5jZShSZWRIaW50c01lc3NhZ2VNYW5hZ2VyKS5hZGRMaXN0ZW5lcihcclxuICAgICAgICAgICAgICAgIGVudW1SZWRIaW50cy5jaGF0X2ZhbWlseSxcclxuICAgICAgICAgICAgICAgIHRoaXMsXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCJyZWQgaGludHMgY2hhdF9mYW1pbHkuLi5cIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIFJlZEhpbnRzTWVzc2FnZU1hbmFnZXIuSW5zdGFuY2UoUmVkSGludHNNZXNzYWdlTWFuYWdlcikuYWRkTGlzdGVuZXIoXHJcbiAgICAgICAgICAgICAgICBlbnVtUmVkSGludHMuY2hhdF9zeXN0ZW0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwicmVkIGhpbnRzIGNoYXQuLi5cIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBSZWRIaW50c01hbmFnZXIuSW5zdGFuY2UoUmVkSGludHNNYW5hZ2VyKS5zZXRSZWRIaW50T3Blbk9yQ2xvc2UoXHJcbiAgICAgICAgICAgICAgICBlbnVtUmVkSGludHMuY2hhdF9mYW1pbHksIHRydWVcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgbGV0IHJfY2hhdCA9IFJlZEhpbnRzTWFuYWdlci5JbnN0YW5jZShSZWRIaW50c01hbmFnZXIpLmNoZWNrUmVkSXNPcGVuKFxyXG4gICAgICAgICAgICAgICAgZW51bVJlZEhpbnRzLmNoYXRcclxuICAgICAgICAgICAgKSA7XHJcbiAgICAgICAgICAgIGxldCByX2NoYXRfZmFtaWx5ID0gUmVkSGludHNNYW5hZ2VyLkluc3RhbmNlKFJlZEhpbnRzTWFuYWdlcikuY2hlY2tSZWRJc09wZW4oXHJcbiAgICAgICAgICAgICAgICBlbnVtUmVkSGludHMuY2hhdF9mYW1pbHlcclxuICAgICAgICAgICAgKSA7XHJcbiAgICAgICAgICAgIGxldCByX2NoYXRfc3lzdGVtID0gUmVkSGludHNNYW5hZ2VyLkluc3RhbmNlKFJlZEhpbnRzTWFuYWdlcikuY2hlY2tSZWRJc09wZW4oXHJcbiAgICAgICAgICAgICAgICBlbnVtUmVkSGludHMuY2hhdF9zeXN0ZW1cclxuICAgICAgICAgICAgKSA7XHJcbiAgICAgICAgICAgIExvZ2dlci5sb2cocl9jaGF0LCByX2NoYXRfZmFtaWx5LCByX2NoYXRfc3lzdGVtKVxyXG5cclxuICAgICAgICB9Y2F0Y2goZXJyb3Ipe1xyXG4gICAgICAgICAgICBMb2dnZXIubG9nKGVycm9yKVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIkluayBTdG9yeSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PVwiKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyB2YXIganNvbiA9IGF3YWl0IChhd2FpdCBSZXNNYW5hZ2VyLkluc3RhbmNlKFJlc01hbmFnZXIpLmxvYWRUZXh0QXNzZXQoXCJTdG9yeS9UZXN0U3RvcnkuanNvblwiKSkudGV4dDtcclxuICAgICAgICAgICAgLy8gbGV0IHN0b3J5ID0gbmV3IFN0b3J5KGpzb24pO1xyXG4gICAgICAgICAgICAvLyBzdG9yeS5DaG9vc2VQYXRoU3RyaW5nKFwic3RvcnkxXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAvLyBzdG9yeS5CaW5kRXh0ZXJuYWxGdW5jdGlvbihcIkdldENoYXJhY3Rlck5hbWVcIiwoKT0+e1xyXG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuIFwiSnVzdGluIFRlc3RcIjtcclxuICAgICAgICAgICAgLy8gfSlcclxuICAgICAgICAgICAgLy8gc3RvcnkuQmluZEV4dGVybmFsRnVuY3Rpb25HZW5lcmFsKFwiR2V0Q2hhcmFjdGVyTmFtZUJ5TXV0aVBhcmFtc1wiLChhcmdzOltdKT0+e1xyXG4gICAgICAgICAgICAvLyAgICAgTG9nZ2VyLmxvZyhhcmdzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIC8vICAgICByZXR1cm4gXCJUVFRUXCI7XHJcbiAgICAgICAgICAgIC8vIH0pXHJcblxyXG4gICAgICAgICAgICAvLyBMb2dnZXIubG9nKHN0b3J5LkNvbnRpbnVlKCkpO1xyXG4gICAgICAgICAgICAvLyBMb2dnZXIubG9nKHN0b3J5LkNvbnRpbnVlKCkpO1xyXG4gICAgICAgICAgICAvLyBMb2dnZXIubG9nKHN0b3J5LkNvbnRpbnVlKCkpO1xyXG4gICAgICAgIH1jYXRjaChlcnJvcil7XHJcbiAgICAgICAgICAgIExvZ2dlci5sb2coZXJyb3IpXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgTG9nZ2VyLmxvZyhcIkh0dHBNYW5hZ2VyPT09PT09PT09PT09PT09PT09PT09PT09PVwiKVxyXG5cclxuICAgICAgICBsZXQgdHh0ID0gYXdhaXQgUy5IdHRwTWFuYWdlci5nZXQoXCJodHRwczovL3d3dy5iYWlkdS5jb20vXCIpO1xyXG4gICAgICAgIExvZ2dlci5sb2codHh0KTtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgIC8vTG9nZ2VyLmxvZyhcImVudGl0eT09PT09PT09PT09PT09PT09PT09PT09PT1cIilcclxuXHJcbiAgICAgICAgIGxldCBwbGF5ZXIgPSBQbGF5ZXJNYW5hZ2VyLkluc3RhbmNlKFBsYXllck1hbmFnZXIpLmdldFBsYXllcigpO1xyXG4gICAgICAgICBsZXQgYmFnQyA9ICBwbGF5ZXIuYWRkQ29tcG9uZW50PEJhZ0NvbXBvbmVudD4oQmFnQ29tcG9uZW50KTtcclxuICAgICAgICAgLy9Mb2dnZXIubG9nKGJhZ0MubmFtZSk7XHJcbiBcclxuICAgICAgICAgbGV0IGluZm9DID0gcGxheWVyLmFkZENvbXBvbmVudDxQbGF5ZXJJbmZvQ29tcG9uZW50PihQbGF5ZXJJbmZvQ29tcG9uZW50KTtcclxuICAgICAgICAgLy9Mb2dnZXIubG9nKGluZm9DLm5pY2tOYW1lKTtcclxuIFxyXG4gICAgICAgICAvL+a1i+ivleS6i+S7tlxyXG4gICAgICAgICBsZXQgZXZlbnQgPSBuZXcgRXZlbnQoKTtcclxuICAgICAgICAgZXZlbnQubmFtZSA9IFwiaGVsbG9FdmVudFwiXHJcbiBcclxuICAgICAgICAgLy9MYW1iZGEg6KGo6L6+5byP6K6i6ZiFXHJcbiAgICAgICAgIGJhZ0Muc3Vic2NyaWJlPEV2ZW50PihcclxuICAgICAgICAgICAgIChlKT0+e1xyXG4gICAgICAgICAgICAgICAgIC8vTG9nZ2VyLmxvZyhcIkV2ZW50IHRyaWdnZXI6XCIrZS5uYW1lKVxyXG4gICAgICAgICAgICAgfSwgRXZlbnQpXHJcbiAgICAgICAgIFxyXG4gICAgICAgICBsZXQgdHJpZ2dlcjIgPSAoZTpFdmVudCk9PntcclxuICAgICAgICAgICAgIC8vTG9nZ2VyLmxvZyhcIkV2ZW50IHRyaWdnZXIyOlwiK2UubmFtZSlcclxuICAgICAgICAgfVxyXG4gXHJcbiAgICAgICAgIC8v6K6i6ZiFXHJcbiAgICAgICAgIGJhZ0Muc3Vic2NyaWJlPEV2ZW50Pih0cmlnZ2VyMiwgRXZlbnQpXHJcbiAgICAgICAgIC8v5Y+W5raI6K6i6ZiFXHJcbiAgICAgICAgIGJhZ0MudW5TdWJzY3JpYmU8RXZlbnQ+KHRyaWdnZXIyLCBFdmVudCk7XHJcbiBcclxuICAgICAgICAgYmFnQy5wdWJsaXNoPEV2ZW50PihldmVudCwgRXZlbnQpO1xyXG5cclxuXHJcbiAgICAgICAgLy90ZXN0IGRlbGVnYXRlXHJcbiAgICAgICAgLy8gVGVzdEMuU2V0UGFja2FnZUl0ZW1FeHRlbnNpb24obmV3IFRUZXN0QygpKVxyXG5cclxuICAgICAgICAvLyBzZXRJbnRlcnZhbCgoKT0+e1xyXG5cclxuICAgICAgICAvLyAgICAgbGV0IHAgPSBUZXN0Qy5nZXRPYmooKTtcclxuXHJcbiAgICAgICAgLy8gICAgIGlmKHAgaW5zdGFuY2VvZiBUVGVzdEMpe1xyXG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJhYWFhYWFhYWFhYWFhYWFhXCIpXHJcbiAgICAgICAgLy8gICAgIH1lbHNle1xyXG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJiYmJiYmJiYmJiYmJiYmJiYmJiYlwiKVxyXG4gICAgICAgIC8vICAgICB9XHJcblxyXG4gICAgICAgIC8vIH0sMTAwMClcclxuIFxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcbi8vIGNsYXNzIFRUZXN0QyBleHRlbmRzIFRlc3RQe1xyXG5cclxuLy8gICAgIHB1YmxpYyB0ZXN0KCl7XHJcbi8vICAgICAgICAgY29uc29sZS5sb2coXCJoZWxsbyB0ZXN0IGRlbGVnYXRlXCIpXHJcbi8vICAgICB9XHJcbi8vIH1cclxuXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEV2ZW50e1xyXG4gICAgaWQ6bnVtYmVyO1xyXG4gICAgbmFtZTpzdHJpbmc7XHJcbn1cclxuXHJcblxyXG4iLCIvKmVzbGludC1kaXNhYmxlIGJsb2NrLXNjb3BlZC12YXIsIGlkLWxlbmd0aCwgbm8tY29udHJvbC1yZWdleCwgbm8tbWFnaWMtbnVtYmVycywgbm8tcHJvdG90eXBlLWJ1aWx0aW5zLCBuby1yZWRlY2xhcmUsIG5vLXNoYWRvdywgbm8tdmFyLCBzb3J0LXZhcnMqL1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciAkcHJvdG9idWYgPSByZXF1aXJlKFwicHJvdG9idWZqcy9taW5pbWFsXCIpO1xyXG5cclxuLy8gQ29tbW9uIGFsaWFzZXNcclxudmFyICRSZWFkZXIgPSAkcHJvdG9idWYuUmVhZGVyLCAkV3JpdGVyID0gJHByb3RvYnVmLldyaXRlciwgJHV0aWwgPSAkcHJvdG9idWYudXRpbDtcclxuXHJcbnZhciBMb25nID0gcmVxdWlyZShcImxvbmdcIik7XHJcbiRwcm90b2J1Zi51dGlsLkxvbmcgPSBMb25nO1xyXG4kcHJvdG9idWYuY29uZmlndXJlKCk7XHJcblxyXG5cclxuLy8gRXhwb3J0ZWQgcm9vdCBuYW1lc3BhY2VcclxudmFyICRyb290ID0gJHByb3RvYnVmLnJvb3RzW1wiZGVmYXVsdFwiXSB8fCAoJHByb3RvYnVmLnJvb3RzW1wiZGVmYXVsdFwiXSA9IHt9KTtcclxuXHJcbiRyb290Lm5pY2VfdHMgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOYW1lc3BhY2UgbmljZV90cy5cclxuICAgICAqIEBleHBvcnRzIG5pY2VfdHNcclxuICAgICAqIEBuYW1lc3BhY2VcclxuICAgICAqL1xyXG4gICAgdmFyIG5pY2VfdHMgPSB7fTtcclxuXHJcbiAgICBuaWNlX3RzLkMyUl9Mb2dpbiA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJvcGVydGllcyBvZiBhIEMyUl9Mb2dpbi5cclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90c1xyXG4gICAgICAgICAqIEBpbnRlcmZhY2UgSUMyUl9Mb2dpblxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfG51bGx9IFtBY2NvdW50XSBDMlJfTG9naW4gQWNjb3VudFxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfG51bGx9IFtQYXNzd29yZF0gQzJSX0xvZ2luIFBhc3N3b3JkXHJcbiAgICAgICAgICovXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnN0cnVjdHMgYSBuZXcgQzJSX0xvZ2luLlxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzXHJcbiAgICAgICAgICogQGNsYXNzZGVzYyBSZXByZXNlbnRzIGEgQzJSX0xvZ2luLlxyXG4gICAgICAgICAqIEBpbXBsZW1lbnRzIElDMlJfTG9naW5cclxuICAgICAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSUMyUl9Mb2dpbj19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIEMyUl9Mb2dpbihwcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzKVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXNba2V5c1tpXV0gIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1trZXlzW2ldXSA9IHByb3BlcnRpZXNba2V5c1tpXV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDMlJfTG9naW4gQWNjb3VudC5cclxuICAgICAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IEFjY291bnRcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5DMlJfTG9naW5cclxuICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBDMlJfTG9naW4ucHJvdG90eXBlLkFjY291bnQgPSBcIlwiO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDMlJfTG9naW4gUGFzc3dvcmQuXHJcbiAgICAgICAgICogQG1lbWJlciB7c3RyaW5nfSBQYXNzd29yZFxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyUl9Mb2dpblxyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyUl9Mb2dpbi5wcm90b3R5cGUuUGFzc3dvcmQgPSBcIlwiO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGVzIGEgbmV3IEMyUl9Mb2dpbiBpbnN0YW5jZSB1c2luZyB0aGUgc3BlY2lmaWVkIHByb3BlcnRpZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGNyZWF0ZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyUl9Mb2dpblxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSUMyUl9Mb2dpbj19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuaWNlX3RzLkMyUl9Mb2dpbn0gQzJSX0xvZ2luIGluc3RhbmNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJSX0xvZ2luLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShwcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQzJSX0xvZ2luKHByb3BlcnRpZXMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBDMlJfTG9naW4gbWVzc2FnZS4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgbmljZV90cy5DMlJfTG9naW4udmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGVuY29kZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyUl9Mb2dpblxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSUMyUl9Mb2dpbn0gbWVzc2FnZSBDMlJfTG9naW4gbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXHJcbiAgICAgICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyUl9Mb2dpbi5lbmNvZGUgPSBmdW5jdGlvbiBlbmNvZGUobWVzc2FnZSwgd3JpdGVyKSB7XHJcbiAgICAgICAgICAgIGlmICghd3JpdGVyKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVyID0gJFdyaXRlci5jcmVhdGUoKTtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuQWNjb3VudCAhPSBudWxsICYmIE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1lc3NhZ2UsIFwiQWNjb3VudFwiKSlcclxuICAgICAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMSwgd2lyZVR5cGUgMiA9Ki8xMCkuc3RyaW5nKG1lc3NhZ2UuQWNjb3VudCk7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLlBhc3N3b3JkICE9IG51bGwgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobWVzc2FnZSwgXCJQYXNzd29yZFwiKSlcclxuICAgICAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMiwgd2lyZVR5cGUgMiA9Ki8xOCkuc3RyaW5nKG1lc3NhZ2UuUGFzc3dvcmQpO1xyXG4gICAgICAgICAgICByZXR1cm4gd3JpdGVyO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBDMlJfTG9naW4gbWVzc2FnZSwgbGVuZ3RoIGRlbGltaXRlZC4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgbmljZV90cy5DMlJfTG9naW4udmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZFxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyUl9Mb2dpblxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSUMyUl9Mb2dpbn0gbWVzc2FnZSBDMlJfTG9naW4gbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXHJcbiAgICAgICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyUl9Mb2dpbi5lbmNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWQobWVzc2FnZSwgd3JpdGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVuY29kZShtZXNzYWdlLCB3cml0ZXIpLmxkZWxpbSgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlY29kZXMgYSBDMlJfTG9naW4gbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlci5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZGVjb2RlXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJSX0xvZ2luXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoXSBNZXNzYWdlIGxlbmd0aCBpZiBrbm93biBiZWZvcmVoYW5kXHJcbiAgICAgICAgICogQHJldHVybnMge25pY2VfdHMuQzJSX0xvZ2lufSBDMlJfTG9naW5cclxuICAgICAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxyXG4gICAgICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyUl9Mb2dpbi5kZWNvZGUgPSBmdW5jdGlvbiBkZWNvZGUocmVhZGVyLCBsZW5ndGgpIHtcclxuICAgICAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXHJcbiAgICAgICAgICAgICAgICByZWFkZXIgPSAkUmVhZGVyLmNyZWF0ZShyZWFkZXIpO1xyXG4gICAgICAgICAgICB2YXIgZW5kID0gbGVuZ3RoID09PSB1bmRlZmluZWQgPyByZWFkZXIubGVuIDogcmVhZGVyLnBvcyArIGxlbmd0aCwgbWVzc2FnZSA9IG5ldyAkcm9vdC5uaWNlX3RzLkMyUl9Mb2dpbigpO1xyXG4gICAgICAgICAgICB3aGlsZSAocmVhZGVyLnBvcyA8IGVuZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRhZyA9IHJlYWRlci51aW50MzIoKTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodGFnID4+PiAzKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5BY2NvdW50ID0gcmVhZGVyLnN0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuUGFzc3dvcmQgPSByZWFkZXIuc3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRlci5za2lwVHlwZSh0YWcgJiA3KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWNvZGVzIGEgQzJSX0xvZ2luIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIsIGxlbmd0aCBkZWxpbWl0ZWQuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZFxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyUl9Mb2dpblxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5SZWFkZXJ8VWludDhBcnJheX0gcmVhZGVyIFJlYWRlciBvciBidWZmZXIgdG8gZGVjb2RlIGZyb21cclxuICAgICAgICAgKiBAcmV0dXJucyB7bmljZV90cy5DMlJfTG9naW59IEMyUl9Mb2dpblxyXG4gICAgICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXHJcbiAgICAgICAgICogQHRocm93cyB7JHByb3RvYnVmLnV0aWwuUHJvdG9jb2xFcnJvcn0gSWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJSX0xvZ2luLmRlY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZChyZWFkZXIpIHtcclxuICAgICAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXHJcbiAgICAgICAgICAgICAgICByZWFkZXIgPSBuZXcgJFJlYWRlcihyZWFkZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZWNvZGUocmVhZGVyLCByZWFkZXIudWludDMyKCkpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZlcmlmaWVzIGEgQzJSX0xvZ2luIG1lc3NhZ2UuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIHZlcmlmeVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyUl9Mb2dpblxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBtZXNzYWdlIFBsYWluIG9iamVjdCB0byB2ZXJpZnlcclxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9IGBudWxsYCBpZiB2YWxpZCwgb3RoZXJ3aXNlIHRoZSByZWFzb24gd2h5IGl0IGlzIG5vdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyUl9Mb2dpbi52ZXJpZnkgPSBmdW5jdGlvbiB2ZXJpZnkobWVzc2FnZSkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgIT09IFwib2JqZWN0XCIgfHwgbWVzc2FnZSA9PT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIm9iamVjdCBleHBlY3RlZFwiO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5BY2NvdW50ICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIkFjY291bnRcIikpXHJcbiAgICAgICAgICAgICAgICBpZiAoISR1dGlsLmlzU3RyaW5nKG1lc3NhZ2UuQWNjb3VudCkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiQWNjb3VudDogc3RyaW5nIGV4cGVjdGVkXCI7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLlBhc3N3b3JkICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIlBhc3N3b3JkXCIpKVxyXG4gICAgICAgICAgICAgICAgaWYgKCEkdXRpbC5pc1N0cmluZyhtZXNzYWdlLlBhc3N3b3JkKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJQYXNzd29yZDogc3RyaW5nIGV4cGVjdGVkXCI7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENyZWF0ZXMgYSBDMlJfTG9naW4gbWVzc2FnZSBmcm9tIGEgcGxhaW4gb2JqZWN0LiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byB0aGVpciByZXNwZWN0aXZlIGludGVybmFsIHR5cGVzLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBmcm9tT2JqZWN0XHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJSX0xvZ2luXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG9iamVjdCBQbGFpbiBvYmplY3RcclxuICAgICAgICAgKiBAcmV0dXJucyB7bmljZV90cy5DMlJfTG9naW59IEMyUl9Mb2dpblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyUl9Mb2dpbi5mcm9tT2JqZWN0ID0gZnVuY3Rpb24gZnJvbU9iamVjdChvYmplY3QpIHtcclxuICAgICAgICAgICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mICRyb290Lm5pY2VfdHMuQzJSX0xvZ2luKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBuZXcgJHJvb3QubmljZV90cy5DMlJfTG9naW4oKTtcclxuICAgICAgICAgICAgaWYgKG9iamVjdC5BY2NvdW50ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLkFjY291bnQgPSBTdHJpbmcob2JqZWN0LkFjY291bnQpO1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0LlBhc3N3b3JkICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLlBhc3N3b3JkID0gU3RyaW5nKG9iamVjdC5QYXNzd29yZCk7XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENyZWF0ZXMgYSBwbGFpbiBvYmplY3QgZnJvbSBhIEMyUl9Mb2dpbiBtZXNzYWdlLiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byBvdGhlciB0eXBlcyBpZiBzcGVjaWZpZWQuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIHRvT2JqZWN0XHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJSX0xvZ2luXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7bmljZV90cy5DMlJfTG9naW59IG1lc3NhZ2UgQzJSX0xvZ2luXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuSUNvbnZlcnNpb25PcHRpb25zfSBbb3B0aW9uc10gQ29udmVyc2lvbiBvcHRpb25zXHJcbiAgICAgICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBQbGFpbiBvYmplY3RcclxuICAgICAgICAgKi9cclxuICAgICAgICBDMlJfTG9naW4udG9PYmplY3QgPSBmdW5jdGlvbiB0b09iamVjdChtZXNzYWdlLCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIGlmICghb3B0aW9ucylcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB7fTtcclxuICAgICAgICAgICAgdmFyIG9iamVjdCA9IHt9O1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5kZWZhdWx0cykge1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0LkFjY291bnQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0LlBhc3N3b3JkID0gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5BY2NvdW50ICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIkFjY291bnRcIikpXHJcbiAgICAgICAgICAgICAgICBvYmplY3QuQWNjb3VudCA9IG1lc3NhZ2UuQWNjb3VudDtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuUGFzc3dvcmQgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiUGFzc3dvcmRcIikpXHJcbiAgICAgICAgICAgICAgICBvYmplY3QuUGFzc3dvcmQgPSBtZXNzYWdlLlBhc3N3b3JkO1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnZlcnRzIHRoaXMgQzJSX0xvZ2luIHRvIEpTT04uXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIHRvSlNPTlxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyUl9Mb2dpblxyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gSlNPTiBvYmplY3RcclxuICAgICAgICAgKi9cclxuICAgICAgICBDMlJfTG9naW4ucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IudG9PYmplY3QodGhpcywgJHByb3RvYnVmLnV0aWwudG9KU09OT3B0aW9ucyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIEMyUl9Mb2dpbjtcclxuICAgIH0pKCk7XHJcblxyXG4gICAgbmljZV90cy5SMkNfTG9naW4gPSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFByb3BlcnRpZXMgb2YgYSBSMkNfTG9naW4uXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHNcclxuICAgICAgICAgKiBAaW50ZXJmYWNlIElSMkNfTG9naW5cclxuICAgICAgICAgKiBAcHJvcGVydHkge251bWJlcnxudWxsfSBbRXJyb3JdIFIyQ19Mb2dpbiBFcnJvclxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfG51bGx9IFtNZXNzYWdlXSBSMkNfTG9naW4gTWVzc2FnZVxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfG51bGx9IFtBZGRyZXNzXSBSMkNfTG9naW4gQWRkcmVzc1xyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfExvbmd8bnVsbH0gW0tleV0gUjJDX0xvZ2luIEtleVxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfExvbmd8bnVsbH0gW0dhdGVJZF0gUjJDX0xvZ2luIEdhdGVJZFxyXG4gICAgICAgICAqL1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb25zdHJ1Y3RzIGEgbmV3IFIyQ19Mb2dpbi5cclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90c1xyXG4gICAgICAgICAqIEBjbGFzc2Rlc2MgUmVwcmVzZW50cyBhIFIyQ19Mb2dpbi5cclxuICAgICAgICAgKiBAaW1wbGVtZW50cyBJUjJDX0xvZ2luXHJcbiAgICAgICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLklSMkNfTG9naW49fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBSMkNfTG9naW4ocHJvcGVydGllcykge1xyXG4gICAgICAgICAgICBpZiAocHJvcGVydGllcylcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGtleXMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKSwgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzW2tleXNbaV1dICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNba2V5c1tpXV0gPSBwcm9wZXJ0aWVzW2tleXNbaV1dO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUjJDX0xvZ2luIEVycm9yLlxyXG4gICAgICAgICAqIEBtZW1iZXIge251bWJlcn0gRXJyb3JcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5SMkNfTG9naW5cclxuICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBSMkNfTG9naW4ucHJvdG90eXBlLkVycm9yID0gMDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUjJDX0xvZ2luIE1lc3NhZ2UuXHJcbiAgICAgICAgICogQG1lbWJlciB7c3RyaW5nfSBNZXNzYWdlXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuUjJDX0xvZ2luXHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgUjJDX0xvZ2luLnByb3RvdHlwZS5NZXNzYWdlID0gXCJcIjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUjJDX0xvZ2luIEFkZHJlc3MuXHJcbiAgICAgICAgICogQG1lbWJlciB7c3RyaW5nfSBBZGRyZXNzXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuUjJDX0xvZ2luXHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgUjJDX0xvZ2luLnByb3RvdHlwZS5BZGRyZXNzID0gXCJcIjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUjJDX0xvZ2luIEtleS5cclxuICAgICAgICAgKiBAbWVtYmVyIHtudW1iZXJ8TG9uZ30gS2V5XHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuUjJDX0xvZ2luXHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgUjJDX0xvZ2luLnByb3RvdHlwZS5LZXkgPSAkdXRpbC5Mb25nID8gJHV0aWwuTG9uZy5mcm9tQml0cygwLDAsZmFsc2UpIDogMDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUjJDX0xvZ2luIEdhdGVJZC5cclxuICAgICAgICAgKiBAbWVtYmVyIHtudW1iZXJ8TG9uZ30gR2F0ZUlkXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuUjJDX0xvZ2luXHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgUjJDX0xvZ2luLnByb3RvdHlwZS5HYXRlSWQgPSAkdXRpbC5Mb25nID8gJHV0aWwuTG9uZy5mcm9tQml0cygwLDAsZmFsc2UpIDogMDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlcyBhIG5ldyBSMkNfTG9naW4gaW5zdGFuY2UgdXNpbmcgdGhlIHNwZWNpZmllZCBwcm9wZXJ0aWVzLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBjcmVhdGVcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5SMkNfTG9naW5cclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLklSMkNfTG9naW49fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcclxuICAgICAgICAgKiBAcmV0dXJucyB7bmljZV90cy5SMkNfTG9naW59IFIyQ19Mb2dpbiBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFIyQ19Mb2dpbi5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUocHJvcGVydGllcykge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFIyQ19Mb2dpbihwcm9wZXJ0aWVzKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgUjJDX0xvZ2luIG1lc3NhZ2UuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIG5pY2VfdHMuUjJDX0xvZ2luLnZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBlbmNvZGVcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5SMkNfTG9naW5cclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLklSMkNfTG9naW59IG1lc3NhZ2UgUjJDX0xvZ2luIG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxyXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xyXG4gICAgICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBSMkNfTG9naW4uZW5jb2RlID0gZnVuY3Rpb24gZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikge1xyXG4gICAgICAgICAgICBpZiAoIXdyaXRlcilcclxuICAgICAgICAgICAgICAgIHdyaXRlciA9ICRXcml0ZXIuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLkFkZHJlc3MgIT0gbnVsbCAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtZXNzYWdlLCBcIkFkZHJlc3NcIikpXHJcbiAgICAgICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDEsIHdpcmVUeXBlIDIgPSovMTApLnN0cmluZyhtZXNzYWdlLkFkZHJlc3MpO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5LZXkgIT0gbnVsbCAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtZXNzYWdlLCBcIktleVwiKSlcclxuICAgICAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMiwgd2lyZVR5cGUgMCA9Ki8xNikuaW50NjQobWVzc2FnZS5LZXkpO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5HYXRlSWQgIT0gbnVsbCAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtZXNzYWdlLCBcIkdhdGVJZFwiKSlcclxuICAgICAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMywgd2lyZVR5cGUgMCA9Ki8yNCkuaW50NjQobWVzc2FnZS5HYXRlSWQpO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5FcnJvciAhPSBudWxsICYmIE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1lc3NhZ2UsIFwiRXJyb3JcIikpXHJcbiAgICAgICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDkxLCB3aXJlVHlwZSAwID0qLzcyOCkuaW50MzIobWVzc2FnZS5FcnJvcik7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLk1lc3NhZ2UgIT0gbnVsbCAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtZXNzYWdlLCBcIk1lc3NhZ2VcIikpXHJcbiAgICAgICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDkyLCB3aXJlVHlwZSAyID0qLzczOCkuc3RyaW5nKG1lc3NhZ2UuTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB3cml0ZXI7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIFIyQ19Mb2dpbiBtZXNzYWdlLCBsZW5ndGggZGVsaW1pdGVkLiBEb2VzIG5vdCBpbXBsaWNpdGx5IHtAbGluayBuaWNlX3RzLlIyQ19Mb2dpbi52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuUjJDX0xvZ2luXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7bmljZV90cy5JUjJDX0xvZ2lufSBtZXNzYWdlIFIyQ19Mb2dpbiBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cclxuICAgICAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgUjJDX0xvZ2luLmVuY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZChtZXNzYWdlLCB3cml0ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikubGRlbGltKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGVjb2RlcyBhIFIyQ19Mb2dpbiBtZXNzYWdlIGZyb20gdGhlIHNwZWNpZmllZCByZWFkZXIgb3IgYnVmZmVyLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBkZWNvZGVcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5SMkNfTG9naW5cclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGhdIE1lc3NhZ2UgbGVuZ3RoIGlmIGtub3duIGJlZm9yZWhhbmRcclxuICAgICAgICAgKiBAcmV0dXJucyB7bmljZV90cy5SMkNfTG9naW59IFIyQ19Mb2dpblxyXG4gICAgICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXHJcbiAgICAgICAgICogQHRocm93cyB7JHByb3RvYnVmLnV0aWwuUHJvdG9jb2xFcnJvcn0gSWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgUjJDX0xvZ2luLmRlY29kZSA9IGZ1bmN0aW9uIGRlY29kZShyZWFkZXIsIGxlbmd0aCkge1xyXG4gICAgICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcclxuICAgICAgICAgICAgICAgIHJlYWRlciA9ICRSZWFkZXIuY3JlYXRlKHJlYWRlcik7XHJcbiAgICAgICAgICAgIHZhciBlbmQgPSBsZW5ndGggPT09IHVuZGVmaW5lZCA/IHJlYWRlci5sZW4gOiByZWFkZXIucG9zICsgbGVuZ3RoLCBtZXNzYWdlID0gbmV3ICRyb290Lm5pY2VfdHMuUjJDX0xvZ2luKCk7XHJcbiAgICAgICAgICAgIHdoaWxlIChyZWFkZXIucG9zIDwgZW5kKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGFnID0gcmVhZGVyLnVpbnQzMigpO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0YWcgPj4+IDMpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgOTE6XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5FcnJvciA9IHJlYWRlci5pbnQzMigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA5MjpcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLk1lc3NhZ2UgPSByZWFkZXIuc3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5BZGRyZXNzID0gcmVhZGVyLnN0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuS2V5ID0gcmVhZGVyLmludDY0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5HYXRlSWQgPSByZWFkZXIuaW50NjQoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyLnNraXBUeXBlKHRhZyAmIDcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlY29kZXMgYSBSMkNfTG9naW4gbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlciwgbGVuZ3RoIGRlbGltaXRlZC5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuUjJDX0xvZ2luXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuaWNlX3RzLlIyQ19Mb2dpbn0gUjJDX0xvZ2luXHJcbiAgICAgICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcclxuICAgICAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcclxuICAgICAgICAgKi9cclxuICAgICAgICBSMkNfTG9naW4uZGVjb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkKHJlYWRlcikge1xyXG4gICAgICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcclxuICAgICAgICAgICAgICAgIHJlYWRlciA9IG5ldyAkUmVhZGVyKHJlYWRlcik7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlY29kZShyZWFkZXIsIHJlYWRlci51aW50MzIoKSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVmVyaWZpZXMgYSBSMkNfTG9naW4gbWVzc2FnZS5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gdmVyaWZ5XHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuUjJDX0xvZ2luXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG1lc3NhZ2UgUGxhaW4gb2JqZWN0IHRvIHZlcmlmeVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH0gYG51bGxgIGlmIHZhbGlkLCBvdGhlcndpc2UgdGhlIHJlYXNvbiB3aHkgaXQgaXMgbm90XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgUjJDX0xvZ2luLnZlcmlmeSA9IGZ1bmN0aW9uIHZlcmlmeShtZXNzYWdlKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSAhPT0gXCJvYmplY3RcIiB8fCBtZXNzYWdlID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwib2JqZWN0IGV4cGVjdGVkXCI7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLkVycm9yICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIkVycm9yXCIpKVxyXG4gICAgICAgICAgICAgICAgaWYgKCEkdXRpbC5pc0ludGVnZXIobWVzc2FnZS5FcnJvcikpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiRXJyb3I6IGludGVnZXIgZXhwZWN0ZWRcIjtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuTWVzc2FnZSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJNZXNzYWdlXCIpKVxyXG4gICAgICAgICAgICAgICAgaWYgKCEkdXRpbC5pc1N0cmluZyhtZXNzYWdlLk1lc3NhZ2UpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIk1lc3NhZ2U6IHN0cmluZyBleHBlY3RlZFwiO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5BZGRyZXNzICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIkFkZHJlc3NcIikpXHJcbiAgICAgICAgICAgICAgICBpZiAoISR1dGlsLmlzU3RyaW5nKG1lc3NhZ2UuQWRkcmVzcykpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiQWRkcmVzczogc3RyaW5nIGV4cGVjdGVkXCI7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLktleSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJLZXlcIikpXHJcbiAgICAgICAgICAgICAgICBpZiAoISR1dGlsLmlzSW50ZWdlcihtZXNzYWdlLktleSkgJiYgIShtZXNzYWdlLktleSAmJiAkdXRpbC5pc0ludGVnZXIobWVzc2FnZS5LZXkubG93KSAmJiAkdXRpbC5pc0ludGVnZXIobWVzc2FnZS5LZXkuaGlnaCkpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIktleTogaW50ZWdlcnxMb25nIGV4cGVjdGVkXCI7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLkdhdGVJZCAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJHYXRlSWRcIikpXHJcbiAgICAgICAgICAgICAgICBpZiAoISR1dGlsLmlzSW50ZWdlcihtZXNzYWdlLkdhdGVJZCkgJiYgIShtZXNzYWdlLkdhdGVJZCAmJiAkdXRpbC5pc0ludGVnZXIobWVzc2FnZS5HYXRlSWQubG93KSAmJiAkdXRpbC5pc0ludGVnZXIobWVzc2FnZS5HYXRlSWQuaGlnaCkpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIkdhdGVJZDogaW50ZWdlcnxMb25nIGV4cGVjdGVkXCI7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENyZWF0ZXMgYSBSMkNfTG9naW4gbWVzc2FnZSBmcm9tIGEgcGxhaW4gb2JqZWN0LiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byB0aGVpciByZXNwZWN0aXZlIGludGVybmFsIHR5cGVzLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBmcm9tT2JqZWN0XHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuUjJDX0xvZ2luXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG9iamVjdCBQbGFpbiBvYmplY3RcclxuICAgICAgICAgKiBAcmV0dXJucyB7bmljZV90cy5SMkNfTG9naW59IFIyQ19Mb2dpblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFIyQ19Mb2dpbi5mcm9tT2JqZWN0ID0gZnVuY3Rpb24gZnJvbU9iamVjdChvYmplY3QpIHtcclxuICAgICAgICAgICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mICRyb290Lm5pY2VfdHMuUjJDX0xvZ2luKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBuZXcgJHJvb3QubmljZV90cy5SMkNfTG9naW4oKTtcclxuICAgICAgICAgICAgaWYgKG9iamVjdC5FcnJvciAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5FcnJvciA9IG9iamVjdC5FcnJvciB8IDA7XHJcbiAgICAgICAgICAgIGlmIChvYmplY3QuTWVzc2FnZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5NZXNzYWdlID0gU3RyaW5nKG9iamVjdC5NZXNzYWdlKTtcclxuICAgICAgICAgICAgaWYgKG9iamVjdC5BZGRyZXNzICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLkFkZHJlc3MgPSBTdHJpbmcob2JqZWN0LkFkZHJlc3MpO1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0LktleSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgaWYgKCR1dGlsLkxvbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgKG1lc3NhZ2UuS2V5ID0gJHV0aWwuTG9uZy5mcm9tVmFsdWUob2JqZWN0LktleSkpLnVuc2lnbmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0LktleSA9PT0gXCJzdHJpbmdcIilcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLktleSA9IHBhcnNlSW50KG9iamVjdC5LZXksIDEwKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmplY3QuS2V5ID09PSBcIm51bWJlclwiKVxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuS2V5ID0gb2JqZWN0LktleTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmplY3QuS2V5ID09PSBcIm9iamVjdFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuS2V5ID0gbmV3ICR1dGlsLkxvbmdCaXRzKG9iamVjdC5LZXkubG93ID4+PiAwLCBvYmplY3QuS2V5LmhpZ2ggPj4+IDApLnRvTnVtYmVyKCk7XHJcbiAgICAgICAgICAgIGlmIChvYmplY3QuR2F0ZUlkICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBpZiAoJHV0aWwuTG9uZylcclxuICAgICAgICAgICAgICAgICAgICAobWVzc2FnZS5HYXRlSWQgPSAkdXRpbC5Mb25nLmZyb21WYWx1ZShvYmplY3QuR2F0ZUlkKSkudW5zaWduZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmplY3QuR2F0ZUlkID09PSBcInN0cmluZ1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuR2F0ZUlkID0gcGFyc2VJbnQob2JqZWN0LkdhdGVJZCwgMTApO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9iamVjdC5HYXRlSWQgPT09IFwibnVtYmVyXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5HYXRlSWQgPSBvYmplY3QuR2F0ZUlkO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9iamVjdC5HYXRlSWQgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5HYXRlSWQgPSBuZXcgJHV0aWwuTG9uZ0JpdHMob2JqZWN0LkdhdGVJZC5sb3cgPj4+IDAsIG9iamVjdC5HYXRlSWQuaGlnaCA+Pj4gMCkudG9OdW1iZXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlcyBhIHBsYWluIG9iamVjdCBmcm9tIGEgUjJDX0xvZ2luIG1lc3NhZ2UuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIG90aGVyIHR5cGVzIGlmIHNwZWNpZmllZC5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gdG9PYmplY3RcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5SMkNfTG9naW5cclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLlIyQ19Mb2dpbn0gbWVzc2FnZSBSMkNfTG9naW5cclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5JQ29udmVyc2lvbk9wdGlvbnN9IFtvcHRpb25zXSBDb252ZXJzaW9uIG9wdGlvbnNcclxuICAgICAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IFBsYWluIG9iamVjdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFIyQ19Mb2dpbi50b09iamVjdCA9IGZ1bmN0aW9uIHRvT2JqZWN0KG1lc3NhZ2UsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgaWYgKCFvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHt9O1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0ID0ge307XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmRlZmF1bHRzKSB7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QuQWRkcmVzcyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBpZiAoJHV0aWwuTG9uZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsb25nID0gbmV3ICR1dGlsLkxvbmcoMCwgMCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC5LZXkgPSBvcHRpb25zLmxvbmdzID09PSBTdHJpbmcgPyBsb25nLnRvU3RyaW5nKCkgOiBvcHRpb25zLmxvbmdzID09PSBOdW1iZXIgPyBsb25nLnRvTnVtYmVyKCkgOiBsb25nO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LktleSA9IG9wdGlvbnMubG9uZ3MgPT09IFN0cmluZyA/IFwiMFwiIDogMDtcclxuICAgICAgICAgICAgICAgIGlmICgkdXRpbC5Mb25nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxvbmcgPSBuZXcgJHV0aWwuTG9uZygwLCAwLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LkdhdGVJZCA9IG9wdGlvbnMubG9uZ3MgPT09IFN0cmluZyA/IGxvbmcudG9TdHJpbmcoKSA6IG9wdGlvbnMubG9uZ3MgPT09IE51bWJlciA/IGxvbmcudG9OdW1iZXIoKSA6IGxvbmc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3QuR2F0ZUlkID0gb3B0aW9ucy5sb25ncyA9PT0gU3RyaW5nID8gXCIwXCIgOiAwO1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0LkVycm9yID0gMDtcclxuICAgICAgICAgICAgICAgIG9iamVjdC5NZXNzYWdlID0gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5BZGRyZXNzICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIkFkZHJlc3NcIikpXHJcbiAgICAgICAgICAgICAgICBvYmplY3QuQWRkcmVzcyA9IG1lc3NhZ2UuQWRkcmVzcztcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuS2V5ICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIktleVwiKSlcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZS5LZXkgPT09IFwibnVtYmVyXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LktleSA9IG9wdGlvbnMubG9uZ3MgPT09IFN0cmluZyA/IFN0cmluZyhtZXNzYWdlLktleSkgOiBtZXNzYWdlLktleTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3QuS2V5ID0gb3B0aW9ucy5sb25ncyA9PT0gU3RyaW5nID8gJHV0aWwuTG9uZy5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChtZXNzYWdlLktleSkgOiBvcHRpb25zLmxvbmdzID09PSBOdW1iZXIgPyBuZXcgJHV0aWwuTG9uZ0JpdHMobWVzc2FnZS5LZXkubG93ID4+PiAwLCBtZXNzYWdlLktleS5oaWdoID4+PiAwKS50b051bWJlcigpIDogbWVzc2FnZS5LZXk7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLkdhdGVJZCAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJHYXRlSWRcIikpXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UuR2F0ZUlkID09PSBcIm51bWJlclwiKVxyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC5HYXRlSWQgPSBvcHRpb25zLmxvbmdzID09PSBTdHJpbmcgPyBTdHJpbmcobWVzc2FnZS5HYXRlSWQpIDogbWVzc2FnZS5HYXRlSWQ7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LkdhdGVJZCA9IG9wdGlvbnMubG9uZ3MgPT09IFN0cmluZyA/ICR1dGlsLkxvbmcucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobWVzc2FnZS5HYXRlSWQpIDogb3B0aW9ucy5sb25ncyA9PT0gTnVtYmVyID8gbmV3ICR1dGlsLkxvbmdCaXRzKG1lc3NhZ2UuR2F0ZUlkLmxvdyA+Pj4gMCwgbWVzc2FnZS5HYXRlSWQuaGlnaCA+Pj4gMCkudG9OdW1iZXIoKSA6IG1lc3NhZ2UuR2F0ZUlkO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5FcnJvciAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJFcnJvclwiKSlcclxuICAgICAgICAgICAgICAgIG9iamVjdC5FcnJvciA9IG1lc3NhZ2UuRXJyb3I7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLk1lc3NhZ2UgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiTWVzc2FnZVwiKSlcclxuICAgICAgICAgICAgICAgIG9iamVjdC5NZXNzYWdlID0gbWVzc2FnZS5NZXNzYWdlO1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnZlcnRzIHRoaXMgUjJDX0xvZ2luIHRvIEpTT04uXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIHRvSlNPTlxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLlIyQ19Mb2dpblxyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gSlNPTiBvYmplY3RcclxuICAgICAgICAgKi9cclxuICAgICAgICBSMkNfTG9naW4ucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IudG9PYmplY3QodGhpcywgJHByb3RvYnVmLnV0aWwudG9KU09OT3B0aW9ucyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFIyQ19Mb2dpbjtcclxuICAgIH0pKCk7XHJcblxyXG4gICAgbmljZV90cy5DMkdfTG9naW5HYXRlID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQcm9wZXJ0aWVzIG9mIGEgQzJHX0xvZ2luR2F0ZS5cclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90c1xyXG4gICAgICAgICAqIEBpbnRlcmZhY2UgSUMyR19Mb2dpbkdhdGVcclxuICAgICAgICAgKiBAcHJvcGVydHkge251bWJlcnxMb25nfG51bGx9IFtLZXldIEMyR19Mb2dpbkdhdGUgS2V5XHJcbiAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ8TG9uZ3xudWxsfSBbR2F0ZUlkXSBDMkdfTG9naW5HYXRlIEdhdGVJZFxyXG4gICAgICAgICAqL1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb25zdHJ1Y3RzIGEgbmV3IEMyR19Mb2dpbkdhdGUuXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHNcclxuICAgICAgICAgKiBAY2xhc3NkZXNjIFJlcHJlc2VudHMgYSBDMkdfTG9naW5HYXRlLlxyXG4gICAgICAgICAqIEBpbXBsZW1lbnRzIElDMkdfTG9naW5HYXRlXHJcbiAgICAgICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLklDMkdfTG9naW5HYXRlPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gQzJHX0xvZ2luR2F0ZShwcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzKVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXNba2V5c1tpXV0gIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1trZXlzW2ldXSA9IHByb3BlcnRpZXNba2V5c1tpXV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDMkdfTG9naW5HYXRlIEtleS5cclxuICAgICAgICAgKiBAbWVtYmVyIHtudW1iZXJ8TG9uZ30gS2V5XHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJHX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyR19Mb2dpbkdhdGUucHJvdG90eXBlLktleSA9ICR1dGlsLkxvbmcgPyAkdXRpbC5Mb25nLmZyb21CaXRzKDAsMCxmYWxzZSkgOiAwO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDMkdfTG9naW5HYXRlIEdhdGVJZC5cclxuICAgICAgICAgKiBAbWVtYmVyIHtudW1iZXJ8TG9uZ30gR2F0ZUlkXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJHX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyR19Mb2dpbkdhdGUucHJvdG90eXBlLkdhdGVJZCA9ICR1dGlsLkxvbmcgPyAkdXRpbC5Mb25nLmZyb21CaXRzKDAsMCxmYWxzZSkgOiAwO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGVzIGEgbmV3IEMyR19Mb2dpbkdhdGUgaW5zdGFuY2UgdXNpbmcgdGhlIHNwZWNpZmllZCBwcm9wZXJ0aWVzLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBjcmVhdGVcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5DMkdfTG9naW5HYXRlXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7bmljZV90cy5JQzJHX0xvZ2luR2F0ZT19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuaWNlX3RzLkMyR19Mb2dpbkdhdGV9IEMyR19Mb2dpbkdhdGUgaW5zdGFuY2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBDMkdfTG9naW5HYXRlLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShwcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQzJHX0xvZ2luR2F0ZShwcm9wZXJ0aWVzKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgQzJHX0xvZ2luR2F0ZSBtZXNzYWdlLiBEb2VzIG5vdCBpbXBsaWNpdGx5IHtAbGluayBuaWNlX3RzLkMyR19Mb2dpbkdhdGUudmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGVuY29kZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyR19Mb2dpbkdhdGVcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLklDMkdfTG9naW5HYXRlfSBtZXNzYWdlIEMyR19Mb2dpbkdhdGUgbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXHJcbiAgICAgICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyR19Mb2dpbkdhdGUuZW5jb2RlID0gZnVuY3Rpb24gZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikge1xyXG4gICAgICAgICAgICBpZiAoIXdyaXRlcilcclxuICAgICAgICAgICAgICAgIHdyaXRlciA9ICRXcml0ZXIuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLktleSAhPSBudWxsICYmIE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1lc3NhZ2UsIFwiS2V5XCIpKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAxLCB3aXJlVHlwZSAwID0qLzgpLmludDY0KG1lc3NhZ2UuS2V5KTtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuR2F0ZUlkICE9IG51bGwgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobWVzc2FnZSwgXCJHYXRlSWRcIikpXHJcbiAgICAgICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDIsIHdpcmVUeXBlIDAgPSovMTYpLmludDY0KG1lc3NhZ2UuR2F0ZUlkKTtcclxuICAgICAgICAgICAgcmV0dXJuIHdyaXRlcjtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgQzJHX0xvZ2luR2F0ZSBtZXNzYWdlLCBsZW5ndGggZGVsaW1pdGVkLiBEb2VzIG5vdCBpbXBsaWNpdGx5IHtAbGluayBuaWNlX3RzLkMyR19Mb2dpbkdhdGUudmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZFxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyR19Mb2dpbkdhdGVcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLklDMkdfTG9naW5HYXRlfSBtZXNzYWdlIEMyR19Mb2dpbkdhdGUgbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXHJcbiAgICAgICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyR19Mb2dpbkdhdGUuZW5jb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkKG1lc3NhZ2UsIHdyaXRlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbmNvZGUobWVzc2FnZSwgd3JpdGVyKS5sZGVsaW0oKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWNvZGVzIGEgQzJHX0xvZ2luR2F0ZSBtZXNzYWdlIGZyb20gdGhlIHNwZWNpZmllZCByZWFkZXIgb3IgYnVmZmVyLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBkZWNvZGVcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5DMkdfTG9naW5HYXRlXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoXSBNZXNzYWdlIGxlbmd0aCBpZiBrbm93biBiZWZvcmVoYW5kXHJcbiAgICAgICAgICogQHJldHVybnMge25pY2VfdHMuQzJHX0xvZ2luR2F0ZX0gQzJHX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXHJcbiAgICAgICAgICogQHRocm93cyB7JHByb3RvYnVmLnV0aWwuUHJvdG9jb2xFcnJvcn0gSWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJHX0xvZ2luR2F0ZS5kZWNvZGUgPSBmdW5jdGlvbiBkZWNvZGUocmVhZGVyLCBsZW5ndGgpIHtcclxuICAgICAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXHJcbiAgICAgICAgICAgICAgICByZWFkZXIgPSAkUmVhZGVyLmNyZWF0ZShyZWFkZXIpO1xyXG4gICAgICAgICAgICB2YXIgZW5kID0gbGVuZ3RoID09PSB1bmRlZmluZWQgPyByZWFkZXIubGVuIDogcmVhZGVyLnBvcyArIGxlbmd0aCwgbWVzc2FnZSA9IG5ldyAkcm9vdC5uaWNlX3RzLkMyR19Mb2dpbkdhdGUoKTtcclxuICAgICAgICAgICAgd2hpbGUgKHJlYWRlci5wb3MgPCBlbmQpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0YWcgPSByZWFkZXIudWludDMyKCk7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRhZyA+Pj4gMykge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuS2V5ID0gcmVhZGVyLmludDY0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5HYXRlSWQgPSByZWFkZXIuaW50NjQoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyLnNraXBUeXBlKHRhZyAmIDcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlY29kZXMgYSBDMkdfTG9naW5HYXRlIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIsIGxlbmd0aCBkZWxpbWl0ZWQuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZFxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyR19Mb2dpbkdhdGVcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXHJcbiAgICAgICAgICogQHJldHVybnMge25pY2VfdHMuQzJHX0xvZ2luR2F0ZX0gQzJHX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXHJcbiAgICAgICAgICogQHRocm93cyB7JHByb3RvYnVmLnV0aWwuUHJvdG9jb2xFcnJvcn0gSWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJHX0xvZ2luR2F0ZS5kZWNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBkZWNvZGVEZWxpbWl0ZWQocmVhZGVyKSB7XHJcbiAgICAgICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxyXG4gICAgICAgICAgICAgICAgcmVhZGVyID0gbmV3ICRSZWFkZXIocmVhZGVyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGVjb2RlKHJlYWRlciwgcmVhZGVyLnVpbnQzMigpKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWZXJpZmllcyBhIEMyR19Mb2dpbkdhdGUgbWVzc2FnZS5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gdmVyaWZ5XHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJHX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBtZXNzYWdlIFBsYWluIG9iamVjdCB0byB2ZXJpZnlcclxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9IGBudWxsYCBpZiB2YWxpZCwgb3RoZXJ3aXNlIHRoZSByZWFzb24gd2h5IGl0IGlzIG5vdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyR19Mb2dpbkdhdGUudmVyaWZ5ID0gZnVuY3Rpb24gdmVyaWZ5KG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSBcIm9iamVjdFwiIHx8IG1lc3NhZ2UgPT09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJvYmplY3QgZXhwZWN0ZWRcIjtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuS2V5ICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIktleVwiKSlcclxuICAgICAgICAgICAgICAgIGlmICghJHV0aWwuaXNJbnRlZ2VyKG1lc3NhZ2UuS2V5KSAmJiAhKG1lc3NhZ2UuS2V5ICYmICR1dGlsLmlzSW50ZWdlcihtZXNzYWdlLktleS5sb3cpICYmICR1dGlsLmlzSW50ZWdlcihtZXNzYWdlLktleS5oaWdoKSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiS2V5OiBpbnRlZ2VyfExvbmcgZXhwZWN0ZWRcIjtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuR2F0ZUlkICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIkdhdGVJZFwiKSlcclxuICAgICAgICAgICAgICAgIGlmICghJHV0aWwuaXNJbnRlZ2VyKG1lc3NhZ2UuR2F0ZUlkKSAmJiAhKG1lc3NhZ2UuR2F0ZUlkICYmICR1dGlsLmlzSW50ZWdlcihtZXNzYWdlLkdhdGVJZC5sb3cpICYmICR1dGlsLmlzSW50ZWdlcihtZXNzYWdlLkdhdGVJZC5oaWdoKSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiR2F0ZUlkOiBpbnRlZ2VyfExvbmcgZXhwZWN0ZWRcIjtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlcyBhIEMyR19Mb2dpbkdhdGUgbWVzc2FnZSBmcm9tIGEgcGxhaW4gb2JqZWN0LiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byB0aGVpciByZXNwZWN0aXZlIGludGVybmFsIHR5cGVzLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBmcm9tT2JqZWN0XHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJHX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBvYmplY3QgUGxhaW4gb2JqZWN0XHJcbiAgICAgICAgICogQHJldHVybnMge25pY2VfdHMuQzJHX0xvZ2luR2F0ZX0gQzJHX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyR19Mb2dpbkdhdGUuZnJvbU9iamVjdCA9IGZ1bmN0aW9uIGZyb21PYmplY3Qob2JqZWN0KSB7XHJcbiAgICAgICAgICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiAkcm9vdC5uaWNlX3RzLkMyR19Mb2dpbkdhdGUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IG5ldyAkcm9vdC5uaWNlX3RzLkMyR19Mb2dpbkdhdGUoKTtcclxuICAgICAgICAgICAgaWYgKG9iamVjdC5LZXkgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIGlmICgkdXRpbC5Mb25nKVxyXG4gICAgICAgICAgICAgICAgICAgIChtZXNzYWdlLktleSA9ICR1dGlsLkxvbmcuZnJvbVZhbHVlKG9iamVjdC5LZXkpKS51bnNpZ25lZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9iamVjdC5LZXkgPT09IFwic3RyaW5nXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5LZXkgPSBwYXJzZUludChvYmplY3QuS2V5LCAxMCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0LktleSA9PT0gXCJudW1iZXJcIilcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLktleSA9IG9iamVjdC5LZXk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0LktleSA9PT0gXCJvYmplY3RcIilcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLktleSA9IG5ldyAkdXRpbC5Mb25nQml0cyhvYmplY3QuS2V5LmxvdyA+Pj4gMCwgb2JqZWN0LktleS5oaWdoID4+PiAwKS50b051bWJlcigpO1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0LkdhdGVJZCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgaWYgKCR1dGlsLkxvbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgKG1lc3NhZ2UuR2F0ZUlkID0gJHV0aWwuTG9uZy5mcm9tVmFsdWUob2JqZWN0LkdhdGVJZCkpLnVuc2lnbmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0LkdhdGVJZCA9PT0gXCJzdHJpbmdcIilcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLkdhdGVJZCA9IHBhcnNlSW50KG9iamVjdC5HYXRlSWQsIDEwKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmplY3QuR2F0ZUlkID09PSBcIm51bWJlclwiKVxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuR2F0ZUlkID0gb2JqZWN0LkdhdGVJZDtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmplY3QuR2F0ZUlkID09PSBcIm9iamVjdFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuR2F0ZUlkID0gbmV3ICR1dGlsLkxvbmdCaXRzKG9iamVjdC5HYXRlSWQubG93ID4+PiAwLCBvYmplY3QuR2F0ZUlkLmhpZ2ggPj4+IDApLnRvTnVtYmVyKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENyZWF0ZXMgYSBwbGFpbiBvYmplY3QgZnJvbSBhIEMyR19Mb2dpbkdhdGUgbWVzc2FnZS4gQWxzbyBjb252ZXJ0cyB2YWx1ZXMgdG8gb3RoZXIgdHlwZXMgaWYgc3BlY2lmaWVkLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiB0b09iamVjdFxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyR19Mb2dpbkdhdGVcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLkMyR19Mb2dpbkdhdGV9IG1lc3NhZ2UgQzJHX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLklDb252ZXJzaW9uT3B0aW9uc30gW29wdGlvbnNdIENvbnZlcnNpb24gb3B0aW9uc1xyXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gUGxhaW4gb2JqZWN0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJHX0xvZ2luR2F0ZS50b09iamVjdCA9IGZ1bmN0aW9uIHRvT2JqZWN0KG1lc3NhZ2UsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgaWYgKCFvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHt9O1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0ID0ge307XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmRlZmF1bHRzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJHV0aWwuTG9uZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsb25nID0gbmV3ICR1dGlsLkxvbmcoMCwgMCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC5LZXkgPSBvcHRpb25zLmxvbmdzID09PSBTdHJpbmcgPyBsb25nLnRvU3RyaW5nKCkgOiBvcHRpb25zLmxvbmdzID09PSBOdW1iZXIgPyBsb25nLnRvTnVtYmVyKCkgOiBsb25nO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LktleSA9IG9wdGlvbnMubG9uZ3MgPT09IFN0cmluZyA/IFwiMFwiIDogMDtcclxuICAgICAgICAgICAgICAgIGlmICgkdXRpbC5Mb25nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxvbmcgPSBuZXcgJHV0aWwuTG9uZygwLCAwLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LkdhdGVJZCA9IG9wdGlvbnMubG9uZ3MgPT09IFN0cmluZyA/IGxvbmcudG9TdHJpbmcoKSA6IG9wdGlvbnMubG9uZ3MgPT09IE51bWJlciA/IGxvbmcudG9OdW1iZXIoKSA6IGxvbmc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3QuR2F0ZUlkID0gb3B0aW9ucy5sb25ncyA9PT0gU3RyaW5nID8gXCIwXCIgOiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLktleSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJLZXlcIikpXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UuS2V5ID09PSBcIm51bWJlclwiKVxyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC5LZXkgPSBvcHRpb25zLmxvbmdzID09PSBTdHJpbmcgPyBTdHJpbmcobWVzc2FnZS5LZXkpIDogbWVzc2FnZS5LZXk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LktleSA9IG9wdGlvbnMubG9uZ3MgPT09IFN0cmluZyA/ICR1dGlsLkxvbmcucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobWVzc2FnZS5LZXkpIDogb3B0aW9ucy5sb25ncyA9PT0gTnVtYmVyID8gbmV3ICR1dGlsLkxvbmdCaXRzKG1lc3NhZ2UuS2V5LmxvdyA+Pj4gMCwgbWVzc2FnZS5LZXkuaGlnaCA+Pj4gMCkudG9OdW1iZXIoKSA6IG1lc3NhZ2UuS2V5O1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5HYXRlSWQgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiR2F0ZUlkXCIpKVxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlLkdhdGVJZCA9PT0gXCJudW1iZXJcIilcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3QuR2F0ZUlkID0gb3B0aW9ucy5sb25ncyA9PT0gU3RyaW5nID8gU3RyaW5nKG1lc3NhZ2UuR2F0ZUlkKSA6IG1lc3NhZ2UuR2F0ZUlkO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC5HYXRlSWQgPSBvcHRpb25zLmxvbmdzID09PSBTdHJpbmcgPyAkdXRpbC5Mb25nLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG1lc3NhZ2UuR2F0ZUlkKSA6IG9wdGlvbnMubG9uZ3MgPT09IE51bWJlciA/IG5ldyAkdXRpbC5Mb25nQml0cyhtZXNzYWdlLkdhdGVJZC5sb3cgPj4+IDAsIG1lc3NhZ2UuR2F0ZUlkLmhpZ2ggPj4+IDApLnRvTnVtYmVyKCkgOiBtZXNzYWdlLkdhdGVJZDtcclxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb252ZXJ0cyB0aGlzIEMyR19Mb2dpbkdhdGUgdG8gSlNPTi5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gdG9KU09OXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJHX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gSlNPTiBvYmplY3RcclxuICAgICAgICAgKi9cclxuICAgICAgICBDMkdfTG9naW5HYXRlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLnRvT2JqZWN0KHRoaXMsICRwcm90b2J1Zi51dGlsLnRvSlNPTk9wdGlvbnMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBDMkdfTG9naW5HYXRlO1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICBuaWNlX3RzLkcyQ19Mb2dpbkdhdGUgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFByb3BlcnRpZXMgb2YgYSBHMkNfTG9naW5HYXRlLlxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzXHJcbiAgICAgICAgICogQGludGVyZmFjZSBJRzJDX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfG51bGx9IFtFcnJvcl0gRzJDX0xvZ2luR2F0ZSBFcnJvclxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfG51bGx9IFtNZXNzYWdlXSBHMkNfTG9naW5HYXRlIE1lc3NhZ2VcclxuICAgICAgICAgKiBAcHJvcGVydHkge251bWJlcnxMb25nfG51bGx9IFtQbGF5ZXJJZF0gRzJDX0xvZ2luR2F0ZSBQbGF5ZXJJZFxyXG4gICAgICAgICAqL1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb25zdHJ1Y3RzIGEgbmV3IEcyQ19Mb2dpbkdhdGUuXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHNcclxuICAgICAgICAgKiBAY2xhc3NkZXNjIFJlcHJlc2VudHMgYSBHMkNfTG9naW5HYXRlLlxyXG4gICAgICAgICAqIEBpbXBsZW1lbnRzIElHMkNfTG9naW5HYXRlXHJcbiAgICAgICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLklHMkNfTG9naW5HYXRlPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gRzJDX0xvZ2luR2F0ZShwcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzKVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXNba2V5c1tpXV0gIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1trZXlzW2ldXSA9IHByb3BlcnRpZXNba2V5c1tpXV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHMkNfTG9naW5HYXRlIEVycm9yLlxyXG4gICAgICAgICAqIEBtZW1iZXIge251bWJlcn0gRXJyb3JcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5HMkNfTG9naW5HYXRlXHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRzJDX0xvZ2luR2F0ZS5wcm90b3R5cGUuRXJyb3IgPSAwO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHMkNfTG9naW5HYXRlIE1lc3NhZ2UuXHJcbiAgICAgICAgICogQG1lbWJlciB7c3RyaW5nfSBNZXNzYWdlXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuRzJDX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEcyQ19Mb2dpbkdhdGUucHJvdG90eXBlLk1lc3NhZ2UgPSBcIlwiO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHMkNfTG9naW5HYXRlIFBsYXllcklkLlxyXG4gICAgICAgICAqIEBtZW1iZXIge251bWJlcnxMb25nfSBQbGF5ZXJJZFxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkcyQ19Mb2dpbkdhdGVcclxuICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBHMkNfTG9naW5HYXRlLnByb3RvdHlwZS5QbGF5ZXJJZCA9ICR1dGlsLkxvbmcgPyAkdXRpbC5Mb25nLmZyb21CaXRzKDAsMCxmYWxzZSkgOiAwO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGVzIGEgbmV3IEcyQ19Mb2dpbkdhdGUgaW5zdGFuY2UgdXNpbmcgdGhlIHNwZWNpZmllZCBwcm9wZXJ0aWVzLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBjcmVhdGVcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5HMkNfTG9naW5HYXRlXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7bmljZV90cy5JRzJDX0xvZ2luR2F0ZT19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuaWNlX3RzLkcyQ19Mb2dpbkdhdGV9IEcyQ19Mb2dpbkdhdGUgaW5zdGFuY2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBHMkNfTG9naW5HYXRlLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShwcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRzJDX0xvZ2luR2F0ZShwcm9wZXJ0aWVzKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgRzJDX0xvZ2luR2F0ZSBtZXNzYWdlLiBEb2VzIG5vdCBpbXBsaWNpdGx5IHtAbGluayBuaWNlX3RzLkcyQ19Mb2dpbkdhdGUudmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGVuY29kZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkcyQ19Mb2dpbkdhdGVcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLklHMkNfTG9naW5HYXRlfSBtZXNzYWdlIEcyQ19Mb2dpbkdhdGUgbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXHJcbiAgICAgICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEcyQ19Mb2dpbkdhdGUuZW5jb2RlID0gZnVuY3Rpb24gZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikge1xyXG4gICAgICAgICAgICBpZiAoIXdyaXRlcilcclxuICAgICAgICAgICAgICAgIHdyaXRlciA9ICRXcml0ZXIuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLlBsYXllcklkICE9IG51bGwgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobWVzc2FnZSwgXCJQbGF5ZXJJZFwiKSlcclxuICAgICAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMSwgd2lyZVR5cGUgMCA9Ki84KS5pbnQ2NChtZXNzYWdlLlBsYXllcklkKTtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuRXJyb3IgIT0gbnVsbCAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtZXNzYWdlLCBcIkVycm9yXCIpKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCA5MSwgd2lyZVR5cGUgMCA9Ki83MjgpLmludDMyKG1lc3NhZ2UuRXJyb3IpO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5NZXNzYWdlICE9IG51bGwgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobWVzc2FnZSwgXCJNZXNzYWdlXCIpKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCA5Miwgd2lyZVR5cGUgMiA9Ki83MzgpLnN0cmluZyhtZXNzYWdlLk1lc3NhZ2UpO1xyXG4gICAgICAgICAgICByZXR1cm4gd3JpdGVyO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBHMkNfTG9naW5HYXRlIG1lc3NhZ2UsIGxlbmd0aCBkZWxpbWl0ZWQuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIG5pY2VfdHMuRzJDX0xvZ2luR2F0ZS52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuRzJDX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSUcyQ19Mb2dpbkdhdGV9IG1lc3NhZ2UgRzJDX0xvZ2luR2F0ZSBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cclxuICAgICAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRzJDX0xvZ2luR2F0ZS5lbmNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWQobWVzc2FnZSwgd3JpdGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVuY29kZShtZXNzYWdlLCB3cml0ZXIpLmxkZWxpbSgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlY29kZXMgYSBHMkNfTG9naW5HYXRlIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGRlY29kZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkcyQ19Mb2dpbkdhdGVcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGhdIE1lc3NhZ2UgbGVuZ3RoIGlmIGtub3duIGJlZm9yZWhhbmRcclxuICAgICAgICAgKiBAcmV0dXJucyB7bmljZV90cy5HMkNfTG9naW5HYXRlfSBHMkNfTG9naW5HYXRlXHJcbiAgICAgICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcclxuICAgICAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcclxuICAgICAgICAgKi9cclxuICAgICAgICBHMkNfTG9naW5HYXRlLmRlY29kZSA9IGZ1bmN0aW9uIGRlY29kZShyZWFkZXIsIGxlbmd0aCkge1xyXG4gICAgICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcclxuICAgICAgICAgICAgICAgIHJlYWRlciA9ICRSZWFkZXIuY3JlYXRlKHJlYWRlcik7XHJcbiAgICAgICAgICAgIHZhciBlbmQgPSBsZW5ndGggPT09IHVuZGVmaW5lZCA/IHJlYWRlci5sZW4gOiByZWFkZXIucG9zICsgbGVuZ3RoLCBtZXNzYWdlID0gbmV3ICRyb290Lm5pY2VfdHMuRzJDX0xvZ2luR2F0ZSgpO1xyXG4gICAgICAgICAgICB3aGlsZSAocmVhZGVyLnBvcyA8IGVuZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRhZyA9IHJlYWRlci51aW50MzIoKTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodGFnID4+PiAzKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDkxOlxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuRXJyb3IgPSByZWFkZXIuaW50MzIoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgOTI6XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5NZXNzYWdlID0gcmVhZGVyLnN0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuUGxheWVySWQgPSByZWFkZXIuaW50NjQoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyLnNraXBUeXBlKHRhZyAmIDcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlY29kZXMgYSBHMkNfTG9naW5HYXRlIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIsIGxlbmd0aCBkZWxpbWl0ZWQuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZFxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkcyQ19Mb2dpbkdhdGVcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXHJcbiAgICAgICAgICogQHJldHVybnMge25pY2VfdHMuRzJDX0xvZ2luR2F0ZX0gRzJDX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXHJcbiAgICAgICAgICogQHRocm93cyB7JHByb3RvYnVmLnV0aWwuUHJvdG9jb2xFcnJvcn0gSWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRzJDX0xvZ2luR2F0ZS5kZWNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBkZWNvZGVEZWxpbWl0ZWQocmVhZGVyKSB7XHJcbiAgICAgICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxyXG4gICAgICAgICAgICAgICAgcmVhZGVyID0gbmV3ICRSZWFkZXIocmVhZGVyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGVjb2RlKHJlYWRlciwgcmVhZGVyLnVpbnQzMigpKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWZXJpZmllcyBhIEcyQ19Mb2dpbkdhdGUgbWVzc2FnZS5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gdmVyaWZ5XHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuRzJDX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBtZXNzYWdlIFBsYWluIG9iamVjdCB0byB2ZXJpZnlcclxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9IGBudWxsYCBpZiB2YWxpZCwgb3RoZXJ3aXNlIHRoZSByZWFzb24gd2h5IGl0IGlzIG5vdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEcyQ19Mb2dpbkdhdGUudmVyaWZ5ID0gZnVuY3Rpb24gdmVyaWZ5KG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSBcIm9iamVjdFwiIHx8IG1lc3NhZ2UgPT09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJvYmplY3QgZXhwZWN0ZWRcIjtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuRXJyb3IgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiRXJyb3JcIikpXHJcbiAgICAgICAgICAgICAgICBpZiAoISR1dGlsLmlzSW50ZWdlcihtZXNzYWdlLkVycm9yKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJFcnJvcjogaW50ZWdlciBleHBlY3RlZFwiO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5NZXNzYWdlICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIk1lc3NhZ2VcIikpXHJcbiAgICAgICAgICAgICAgICBpZiAoISR1dGlsLmlzU3RyaW5nKG1lc3NhZ2UuTWVzc2FnZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiTWVzc2FnZTogc3RyaW5nIGV4cGVjdGVkXCI7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLlBsYXllcklkICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIlBsYXllcklkXCIpKVxyXG4gICAgICAgICAgICAgICAgaWYgKCEkdXRpbC5pc0ludGVnZXIobWVzc2FnZS5QbGF5ZXJJZCkgJiYgIShtZXNzYWdlLlBsYXllcklkICYmICR1dGlsLmlzSW50ZWdlcihtZXNzYWdlLlBsYXllcklkLmxvdykgJiYgJHV0aWwuaXNJbnRlZ2VyKG1lc3NhZ2UuUGxheWVySWQuaGlnaCkpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlBsYXllcklkOiBpbnRlZ2VyfExvbmcgZXhwZWN0ZWRcIjtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlcyBhIEcyQ19Mb2dpbkdhdGUgbWVzc2FnZSBmcm9tIGEgcGxhaW4gb2JqZWN0LiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byB0aGVpciByZXNwZWN0aXZlIGludGVybmFsIHR5cGVzLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBmcm9tT2JqZWN0XHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuRzJDX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBvYmplY3QgUGxhaW4gb2JqZWN0XHJcbiAgICAgICAgICogQHJldHVybnMge25pY2VfdHMuRzJDX0xvZ2luR2F0ZX0gRzJDX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEcyQ19Mb2dpbkdhdGUuZnJvbU9iamVjdCA9IGZ1bmN0aW9uIGZyb21PYmplY3Qob2JqZWN0KSB7XHJcbiAgICAgICAgICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiAkcm9vdC5uaWNlX3RzLkcyQ19Mb2dpbkdhdGUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IG5ldyAkcm9vdC5uaWNlX3RzLkcyQ19Mb2dpbkdhdGUoKTtcclxuICAgICAgICAgICAgaWYgKG9iamVjdC5FcnJvciAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5FcnJvciA9IG9iamVjdC5FcnJvciB8IDA7XHJcbiAgICAgICAgICAgIGlmIChvYmplY3QuTWVzc2FnZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5NZXNzYWdlID0gU3RyaW5nKG9iamVjdC5NZXNzYWdlKTtcclxuICAgICAgICAgICAgaWYgKG9iamVjdC5QbGF5ZXJJZCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgaWYgKCR1dGlsLkxvbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgKG1lc3NhZ2UuUGxheWVySWQgPSAkdXRpbC5Mb25nLmZyb21WYWx1ZShvYmplY3QuUGxheWVySWQpKS51bnNpZ25lZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9iamVjdC5QbGF5ZXJJZCA9PT0gXCJzdHJpbmdcIilcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLlBsYXllcklkID0gcGFyc2VJbnQob2JqZWN0LlBsYXllcklkLCAxMCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0LlBsYXllcklkID09PSBcIm51bWJlclwiKVxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuUGxheWVySWQgPSBvYmplY3QuUGxheWVySWQ7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0LlBsYXllcklkID09PSBcIm9iamVjdFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuUGxheWVySWQgPSBuZXcgJHV0aWwuTG9uZ0JpdHMob2JqZWN0LlBsYXllcklkLmxvdyA+Pj4gMCwgb2JqZWN0LlBsYXllcklkLmhpZ2ggPj4+IDApLnRvTnVtYmVyKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENyZWF0ZXMgYSBwbGFpbiBvYmplY3QgZnJvbSBhIEcyQ19Mb2dpbkdhdGUgbWVzc2FnZS4gQWxzbyBjb252ZXJ0cyB2YWx1ZXMgdG8gb3RoZXIgdHlwZXMgaWYgc3BlY2lmaWVkLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiB0b09iamVjdFxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkcyQ19Mb2dpbkdhdGVcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLkcyQ19Mb2dpbkdhdGV9IG1lc3NhZ2UgRzJDX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLklDb252ZXJzaW9uT3B0aW9uc30gW29wdGlvbnNdIENvbnZlcnNpb24gb3B0aW9uc1xyXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gUGxhaW4gb2JqZWN0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRzJDX0xvZ2luR2F0ZS50b09iamVjdCA9IGZ1bmN0aW9uIHRvT2JqZWN0KG1lc3NhZ2UsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgaWYgKCFvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHt9O1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0ID0ge307XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmRlZmF1bHRzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJHV0aWwuTG9uZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsb25nID0gbmV3ICR1dGlsLkxvbmcoMCwgMCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC5QbGF5ZXJJZCA9IG9wdGlvbnMubG9uZ3MgPT09IFN0cmluZyA/IGxvbmcudG9TdHJpbmcoKSA6IG9wdGlvbnMubG9uZ3MgPT09IE51bWJlciA/IGxvbmcudG9OdW1iZXIoKSA6IGxvbmc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3QuUGxheWVySWQgPSBvcHRpb25zLmxvbmdzID09PSBTdHJpbmcgPyBcIjBcIiA6IDA7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QuRXJyb3IgPSAwO1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0Lk1lc3NhZ2UgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLlBsYXllcklkICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIlBsYXllcklkXCIpKVxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlLlBsYXllcklkID09PSBcIm51bWJlclwiKVxyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC5QbGF5ZXJJZCA9IG9wdGlvbnMubG9uZ3MgPT09IFN0cmluZyA/IFN0cmluZyhtZXNzYWdlLlBsYXllcklkKSA6IG1lc3NhZ2UuUGxheWVySWQ7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LlBsYXllcklkID0gb3B0aW9ucy5sb25ncyA9PT0gU3RyaW5nID8gJHV0aWwuTG9uZy5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChtZXNzYWdlLlBsYXllcklkKSA6IG9wdGlvbnMubG9uZ3MgPT09IE51bWJlciA/IG5ldyAkdXRpbC5Mb25nQml0cyhtZXNzYWdlLlBsYXllcklkLmxvdyA+Pj4gMCwgbWVzc2FnZS5QbGF5ZXJJZC5oaWdoID4+PiAwKS50b051bWJlcigpIDogbWVzc2FnZS5QbGF5ZXJJZDtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuRXJyb3IgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiRXJyb3JcIikpXHJcbiAgICAgICAgICAgICAgICBvYmplY3QuRXJyb3IgPSBtZXNzYWdlLkVycm9yO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5NZXNzYWdlICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIk1lc3NhZ2VcIikpXHJcbiAgICAgICAgICAgICAgICBvYmplY3QuTWVzc2FnZSA9IG1lc3NhZ2UuTWVzc2FnZTtcclxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb252ZXJ0cyB0aGlzIEcyQ19Mb2dpbkdhdGUgdG8gSlNPTi5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gdG9KU09OXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuRzJDX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gSlNPTiBvYmplY3RcclxuICAgICAgICAgKi9cclxuICAgICAgICBHMkNfTG9naW5HYXRlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLnRvT2JqZWN0KHRoaXMsICRwcm90b2J1Zi51dGlsLnRvSlNPTk9wdGlvbnMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBHMkNfTG9naW5HYXRlO1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICBuaWNlX3RzLkMyR1NfVGVzdCA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJvcGVydGllcyBvZiBhIEMyR1NfVGVzdC5cclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90c1xyXG4gICAgICAgICAqIEBpbnRlcmZhY2UgSUMyR1NfVGVzdFxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfG51bGx9IFt0ZXN0SURdIEMyR1NfVGVzdCB0ZXN0SURcclxuICAgICAgICAgKiBAcHJvcGVydHkge3N0cmluZ3xudWxsfSBbdGVzdE5hbWVdIEMyR1NfVGVzdCB0ZXN0TmFtZVxyXG4gICAgICAgICAqL1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb25zdHJ1Y3RzIGEgbmV3IEMyR1NfVGVzdC5cclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90c1xyXG4gICAgICAgICAqIEBjbGFzc2Rlc2MgUmVwcmVzZW50cyBhIEMyR1NfVGVzdC5cclxuICAgICAgICAgKiBAaW1wbGVtZW50cyBJQzJHU19UZXN0XHJcbiAgICAgICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLklDMkdTX1Rlc3Q9fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBDMkdTX1Rlc3QocHJvcGVydGllcykge1xyXG4gICAgICAgICAgICBpZiAocHJvcGVydGllcylcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGtleXMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKSwgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzW2tleXNbaV1dICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNba2V5c1tpXV0gPSBwcm9wZXJ0aWVzW2tleXNbaV1dO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQzJHU19UZXN0IHRlc3RJRC5cclxuICAgICAgICAgKiBAbWVtYmVyIHtudW1iZXJ9IHRlc3RJRFxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyR1NfVGVzdFxyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyR1NfVGVzdC5wcm90b3R5cGUudGVzdElEID0gMDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQzJHU19UZXN0IHRlc3ROYW1lLlxyXG4gICAgICAgICAqIEBtZW1iZXIge3N0cmluZ30gdGVzdE5hbWVcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5DMkdTX1Rlc3RcclxuICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBDMkdTX1Rlc3QucHJvdG90eXBlLnRlc3ROYW1lID0gXCJcIjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlcyBhIG5ldyBDMkdTX1Rlc3QgaW5zdGFuY2UgdXNpbmcgdGhlIHNwZWNpZmllZCBwcm9wZXJ0aWVzLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBjcmVhdGVcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5DMkdTX1Rlc3RcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLklDMkdTX1Rlc3Q9fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcclxuICAgICAgICAgKiBAcmV0dXJucyB7bmljZV90cy5DMkdTX1Rlc3R9IEMyR1NfVGVzdCBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyR1NfVGVzdC5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUocHJvcGVydGllcykge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEMyR1NfVGVzdChwcm9wZXJ0aWVzKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgQzJHU19UZXN0IG1lc3NhZ2UuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIG5pY2VfdHMuQzJHU19UZXN0LnZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBlbmNvZGVcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5DMkdTX1Rlc3RcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLklDMkdTX1Rlc3R9IG1lc3NhZ2UgQzJHU19UZXN0IG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxyXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xyXG4gICAgICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBDMkdTX1Rlc3QuZW5jb2RlID0gZnVuY3Rpb24gZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikge1xyXG4gICAgICAgICAgICBpZiAoIXdyaXRlcilcclxuICAgICAgICAgICAgICAgIHdyaXRlciA9ICRXcml0ZXIuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLnRlc3RJRCAhPSBudWxsICYmIE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1lc3NhZ2UsIFwidGVzdElEXCIpKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAxLCB3aXJlVHlwZSAwID0qLzgpLmludDMyKG1lc3NhZ2UudGVzdElEKTtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UudGVzdE5hbWUgIT0gbnVsbCAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtZXNzYWdlLCBcInRlc3ROYW1lXCIpKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAyLCB3aXJlVHlwZSAyID0qLzE4KS5zdHJpbmcobWVzc2FnZS50ZXN0TmFtZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB3cml0ZXI7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIEMyR1NfVGVzdCBtZXNzYWdlLCBsZW5ndGggZGVsaW1pdGVkLiBEb2VzIG5vdCBpbXBsaWNpdGx5IHtAbGluayBuaWNlX3RzLkMyR1NfVGVzdC52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJHU19UZXN0XHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7bmljZV90cy5JQzJHU19UZXN0fSBtZXNzYWdlIEMyR1NfVGVzdCBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cclxuICAgICAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJHU19UZXN0LmVuY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZChtZXNzYWdlLCB3cml0ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikubGRlbGltKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGVjb2RlcyBhIEMyR1NfVGVzdCBtZXNzYWdlIGZyb20gdGhlIHNwZWNpZmllZCByZWFkZXIgb3IgYnVmZmVyLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBkZWNvZGVcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5DMkdTX1Rlc3RcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGhdIE1lc3NhZ2UgbGVuZ3RoIGlmIGtub3duIGJlZm9yZWhhbmRcclxuICAgICAgICAgKiBAcmV0dXJucyB7bmljZV90cy5DMkdTX1Rlc3R9IEMyR1NfVGVzdFxyXG4gICAgICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXHJcbiAgICAgICAgICogQHRocm93cyB7JHByb3RvYnVmLnV0aWwuUHJvdG9jb2xFcnJvcn0gSWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJHU19UZXN0LmRlY29kZSA9IGZ1bmN0aW9uIGRlY29kZShyZWFkZXIsIGxlbmd0aCkge1xyXG4gICAgICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcclxuICAgICAgICAgICAgICAgIHJlYWRlciA9ICRSZWFkZXIuY3JlYXRlKHJlYWRlcik7XHJcbiAgICAgICAgICAgIHZhciBlbmQgPSBsZW5ndGggPT09IHVuZGVmaW5lZCA/IHJlYWRlci5sZW4gOiByZWFkZXIucG9zICsgbGVuZ3RoLCBtZXNzYWdlID0gbmV3ICRyb290Lm5pY2VfdHMuQzJHU19UZXN0KCk7XHJcbiAgICAgICAgICAgIHdoaWxlIChyZWFkZXIucG9zIDwgZW5kKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGFnID0gcmVhZGVyLnVpbnQzMigpO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0YWcgPj4+IDMpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLnRlc3RJRCA9IHJlYWRlci5pbnQzMigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UudGVzdE5hbWUgPSByZWFkZXIuc3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRlci5za2lwVHlwZSh0YWcgJiA3KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWNvZGVzIGEgQzJHU19UZXN0IG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIsIGxlbmd0aCBkZWxpbWl0ZWQuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZFxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyR1NfVGVzdFxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5SZWFkZXJ8VWludDhBcnJheX0gcmVhZGVyIFJlYWRlciBvciBidWZmZXIgdG8gZGVjb2RlIGZyb21cclxuICAgICAgICAgKiBAcmV0dXJucyB7bmljZV90cy5DMkdTX1Rlc3R9IEMyR1NfVGVzdFxyXG4gICAgICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXHJcbiAgICAgICAgICogQHRocm93cyB7JHByb3RvYnVmLnV0aWwuUHJvdG9jb2xFcnJvcn0gSWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJHU19UZXN0LmRlY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZChyZWFkZXIpIHtcclxuICAgICAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXHJcbiAgICAgICAgICAgICAgICByZWFkZXIgPSBuZXcgJFJlYWRlcihyZWFkZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZWNvZGUocmVhZGVyLCByZWFkZXIudWludDMyKCkpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZlcmlmaWVzIGEgQzJHU19UZXN0IG1lc3NhZ2UuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIHZlcmlmeVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyR1NfVGVzdFxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBtZXNzYWdlIFBsYWluIG9iamVjdCB0byB2ZXJpZnlcclxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9IGBudWxsYCBpZiB2YWxpZCwgb3RoZXJ3aXNlIHRoZSByZWFzb24gd2h5IGl0IGlzIG5vdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyR1NfVGVzdC52ZXJpZnkgPSBmdW5jdGlvbiB2ZXJpZnkobWVzc2FnZSkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgIT09IFwib2JqZWN0XCIgfHwgbWVzc2FnZSA9PT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIm9iamVjdCBleHBlY3RlZFwiO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS50ZXN0SUQgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwidGVzdElEXCIpKVxyXG4gICAgICAgICAgICAgICAgaWYgKCEkdXRpbC5pc0ludGVnZXIobWVzc2FnZS50ZXN0SUQpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInRlc3RJRDogaW50ZWdlciBleHBlY3RlZFwiO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS50ZXN0TmFtZSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJ0ZXN0TmFtZVwiKSlcclxuICAgICAgICAgICAgICAgIGlmICghJHV0aWwuaXNTdHJpbmcobWVzc2FnZS50ZXN0TmFtZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidGVzdE5hbWU6IHN0cmluZyBleHBlY3RlZFwiO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGVzIGEgQzJHU19UZXN0IG1lc3NhZ2UgZnJvbSBhIHBsYWluIG9iamVjdC4gQWxzbyBjb252ZXJ0cyB2YWx1ZXMgdG8gdGhlaXIgcmVzcGVjdGl2ZSBpbnRlcm5hbCB0eXBlcy5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZnJvbU9iamVjdFxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyR1NfVGVzdFxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBvYmplY3QgUGxhaW4gb2JqZWN0XHJcbiAgICAgICAgICogQHJldHVybnMge25pY2VfdHMuQzJHU19UZXN0fSBDMkdTX1Rlc3RcclxuICAgICAgICAgKi9cclxuICAgICAgICBDMkdTX1Rlc3QuZnJvbU9iamVjdCA9IGZ1bmN0aW9uIGZyb21PYmplY3Qob2JqZWN0KSB7XHJcbiAgICAgICAgICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiAkcm9vdC5uaWNlX3RzLkMyR1NfVGVzdClcclxuICAgICAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gbmV3ICRyb290Lm5pY2VfdHMuQzJHU19UZXN0KCk7XHJcbiAgICAgICAgICAgIGlmIChvYmplY3QudGVzdElEICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnRlc3RJRCA9IG9iamVjdC50ZXN0SUQgfCAwO1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0LnRlc3ROYW1lICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnRlc3ROYW1lID0gU3RyaW5nKG9iamVjdC50ZXN0TmFtZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENyZWF0ZXMgYSBwbGFpbiBvYmplY3QgZnJvbSBhIEMyR1NfVGVzdCBtZXNzYWdlLiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byBvdGhlciB0eXBlcyBpZiBzcGVjaWZpZWQuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIHRvT2JqZWN0XHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJHU19UZXN0XHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7bmljZV90cy5DMkdTX1Rlc3R9IG1lc3NhZ2UgQzJHU19UZXN0XHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuSUNvbnZlcnNpb25PcHRpb25zfSBbb3B0aW9uc10gQ29udmVyc2lvbiBvcHRpb25zXHJcbiAgICAgICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBQbGFpbiBvYmplY3RcclxuICAgICAgICAgKi9cclxuICAgICAgICBDMkdTX1Rlc3QudG9PYmplY3QgPSBmdW5jdGlvbiB0b09iamVjdChtZXNzYWdlLCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIGlmICghb3B0aW9ucylcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB7fTtcclxuICAgICAgICAgICAgdmFyIG9iamVjdCA9IHt9O1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5kZWZhdWx0cykge1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0LnRlc3RJRCA9IDA7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QudGVzdE5hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLnRlc3RJRCAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJ0ZXN0SURcIikpXHJcbiAgICAgICAgICAgICAgICBvYmplY3QudGVzdElEID0gbWVzc2FnZS50ZXN0SUQ7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLnRlc3ROYW1lICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInRlc3ROYW1lXCIpKVxyXG4gICAgICAgICAgICAgICAgb2JqZWN0LnRlc3ROYW1lID0gbWVzc2FnZS50ZXN0TmFtZTtcclxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb252ZXJ0cyB0aGlzIEMyR1NfVGVzdCB0byBKU09OLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiB0b0pTT05cclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5DMkdTX1Rlc3RcclxuICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IEpTT04gb2JqZWN0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJHU19UZXN0LnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLnRvT2JqZWN0KHRoaXMsICRwcm90b2J1Zi51dGlsLnRvSlNPTk9wdGlvbnMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBDMkdTX1Rlc3Q7XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIG5pY2VfdHMuR1MyQ19UZXN0ID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQcm9wZXJ0aWVzIG9mIGEgR1MyQ19UZXN0LlxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzXHJcbiAgICAgICAgICogQGludGVyZmFjZSBJR1MyQ19UZXN0XHJcbiAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ8bnVsbH0gW0Vycm9yXSBHUzJDX1Rlc3QgRXJyb3JcclxuICAgICAgICAgKiBAcHJvcGVydHkge3N0cmluZ3xudWxsfSBbTWVzc2FnZV0gR1MyQ19UZXN0IE1lc3NhZ2VcclxuICAgICAgICAgKiBAcHJvcGVydHkge3N0cmluZ3xudWxsfSBbdGVzdFJlc3BvbnNlXSBHUzJDX1Rlc3QgdGVzdFJlc3BvbnNlXHJcbiAgICAgICAgICovXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnN0cnVjdHMgYSBuZXcgR1MyQ19UZXN0LlxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzXHJcbiAgICAgICAgICogQGNsYXNzZGVzYyBSZXByZXNlbnRzIGEgR1MyQ19UZXN0LlxyXG4gICAgICAgICAqIEBpbXBsZW1lbnRzIElHUzJDX1Rlc3RcclxuICAgICAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSUdTMkNfVGVzdD19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIEdTMkNfVGVzdChwcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzKVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXNba2V5c1tpXV0gIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1trZXlzW2ldXSA9IHByb3BlcnRpZXNba2V5c1tpXV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHUzJDX1Rlc3QgRXJyb3IuXHJcbiAgICAgICAgICogQG1lbWJlciB7bnVtYmVyfSBFcnJvclxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkdTMkNfVGVzdFxyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEdTMkNfVGVzdC5wcm90b3R5cGUuRXJyb3IgPSAwO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHUzJDX1Rlc3QgTWVzc2FnZS5cclxuICAgICAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IE1lc3NhZ2VcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5HUzJDX1Rlc3RcclxuICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBHUzJDX1Rlc3QucHJvdG90eXBlLk1lc3NhZ2UgPSBcIlwiO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHUzJDX1Rlc3QgdGVzdFJlc3BvbnNlLlxyXG4gICAgICAgICAqIEBtZW1iZXIge3N0cmluZ30gdGVzdFJlc3BvbnNlXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuR1MyQ19UZXN0XHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgR1MyQ19UZXN0LnByb3RvdHlwZS50ZXN0UmVzcG9uc2UgPSBcIlwiO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGVzIGEgbmV3IEdTMkNfVGVzdCBpbnN0YW5jZSB1c2luZyB0aGUgc3BlY2lmaWVkIHByb3BlcnRpZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGNyZWF0ZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkdTMkNfVGVzdFxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSUdTMkNfVGVzdD19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuaWNlX3RzLkdTMkNfVGVzdH0gR1MyQ19UZXN0IGluc3RhbmNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgR1MyQ19UZXN0LmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShwcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR1MyQ19UZXN0KHByb3BlcnRpZXMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBHUzJDX1Rlc3QgbWVzc2FnZS4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgbmljZV90cy5HUzJDX1Rlc3QudmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGVuY29kZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkdTMkNfVGVzdFxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSUdTMkNfVGVzdH0gbWVzc2FnZSBHUzJDX1Rlc3QgbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXHJcbiAgICAgICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEdTMkNfVGVzdC5lbmNvZGUgPSBmdW5jdGlvbiBlbmNvZGUobWVzc2FnZSwgd3JpdGVyKSB7XHJcbiAgICAgICAgICAgIGlmICghd3JpdGVyKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVyID0gJFdyaXRlci5jcmVhdGUoKTtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UudGVzdFJlc3BvbnNlICE9IG51bGwgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobWVzc2FnZSwgXCJ0ZXN0UmVzcG9uc2VcIikpXHJcbiAgICAgICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDEsIHdpcmVUeXBlIDIgPSovMTApLnN0cmluZyhtZXNzYWdlLnRlc3RSZXNwb25zZSk7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLkVycm9yICE9IG51bGwgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobWVzc2FnZSwgXCJFcnJvclwiKSlcclxuICAgICAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgOTEsIHdpcmVUeXBlIDAgPSovNzI4KS5pbnQzMihtZXNzYWdlLkVycm9yKTtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuTWVzc2FnZSAhPSBudWxsICYmIE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1lc3NhZ2UsIFwiTWVzc2FnZVwiKSlcclxuICAgICAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgOTIsIHdpcmVUeXBlIDIgPSovNzM4KS5zdHJpbmcobWVzc2FnZS5NZXNzYWdlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHdyaXRlcjtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgR1MyQ19UZXN0IG1lc3NhZ2UsIGxlbmd0aCBkZWxpbWl0ZWQuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIG5pY2VfdHMuR1MyQ19UZXN0LnZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWRcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5HUzJDX1Rlc3RcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLklHUzJDX1Rlc3R9IG1lc3NhZ2UgR1MyQ19UZXN0IG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxyXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xyXG4gICAgICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBHUzJDX1Rlc3QuZW5jb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkKG1lc3NhZ2UsIHdyaXRlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbmNvZGUobWVzc2FnZSwgd3JpdGVyKS5sZGVsaW0oKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWNvZGVzIGEgR1MyQ19UZXN0IG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGRlY29kZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkdTMkNfVGVzdFxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5SZWFkZXJ8VWludDhBcnJheX0gcmVhZGVyIFJlYWRlciBvciBidWZmZXIgdG8gZGVjb2RlIGZyb21cclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aF0gTWVzc2FnZSBsZW5ndGggaWYga25vd24gYmVmb3JlaGFuZFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuaWNlX3RzLkdTMkNfVGVzdH0gR1MyQ19UZXN0XHJcbiAgICAgICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcclxuICAgICAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcclxuICAgICAgICAgKi9cclxuICAgICAgICBHUzJDX1Rlc3QuZGVjb2RlID0gZnVuY3Rpb24gZGVjb2RlKHJlYWRlciwgbGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxyXG4gICAgICAgICAgICAgICAgcmVhZGVyID0gJFJlYWRlci5jcmVhdGUocmVhZGVyKTtcclxuICAgICAgICAgICAgdmFyIGVuZCA9IGxlbmd0aCA9PT0gdW5kZWZpbmVkID8gcmVhZGVyLmxlbiA6IHJlYWRlci5wb3MgKyBsZW5ndGgsIG1lc3NhZ2UgPSBuZXcgJHJvb3QubmljZV90cy5HUzJDX1Rlc3QoKTtcclxuICAgICAgICAgICAgd2hpbGUgKHJlYWRlci5wb3MgPCBlbmQpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0YWcgPSByZWFkZXIudWludDMyKCk7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRhZyA+Pj4gMykge1xyXG4gICAgICAgICAgICAgICAgY2FzZSA5MTpcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLkVycm9yID0gcmVhZGVyLmludDMyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDkyOlxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuTWVzc2FnZSA9IHJlYWRlci5zdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLnRlc3RSZXNwb25zZSA9IHJlYWRlci5zdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyLnNraXBUeXBlKHRhZyAmIDcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlY29kZXMgYSBHUzJDX1Rlc3QgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlciwgbGVuZ3RoIGRlbGltaXRlZC5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuR1MyQ19UZXN0XHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuaWNlX3RzLkdTMkNfVGVzdH0gR1MyQ19UZXN0XHJcbiAgICAgICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcclxuICAgICAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcclxuICAgICAgICAgKi9cclxuICAgICAgICBHUzJDX1Rlc3QuZGVjb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkKHJlYWRlcikge1xyXG4gICAgICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcclxuICAgICAgICAgICAgICAgIHJlYWRlciA9IG5ldyAkUmVhZGVyKHJlYWRlcik7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlY29kZShyZWFkZXIsIHJlYWRlci51aW50MzIoKSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVmVyaWZpZXMgYSBHUzJDX1Rlc3QgbWVzc2FnZS5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gdmVyaWZ5XHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuR1MyQ19UZXN0XHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG1lc3NhZ2UgUGxhaW4gb2JqZWN0IHRvIHZlcmlmeVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH0gYG51bGxgIGlmIHZhbGlkLCBvdGhlcndpc2UgdGhlIHJlYXNvbiB3aHkgaXQgaXMgbm90XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgR1MyQ19UZXN0LnZlcmlmeSA9IGZ1bmN0aW9uIHZlcmlmeShtZXNzYWdlKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSAhPT0gXCJvYmplY3RcIiB8fCBtZXNzYWdlID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwib2JqZWN0IGV4cGVjdGVkXCI7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLkVycm9yICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIkVycm9yXCIpKVxyXG4gICAgICAgICAgICAgICAgaWYgKCEkdXRpbC5pc0ludGVnZXIobWVzc2FnZS5FcnJvcikpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiRXJyb3I6IGludGVnZXIgZXhwZWN0ZWRcIjtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuTWVzc2FnZSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJNZXNzYWdlXCIpKVxyXG4gICAgICAgICAgICAgICAgaWYgKCEkdXRpbC5pc1N0cmluZyhtZXNzYWdlLk1lc3NhZ2UpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIk1lc3NhZ2U6IHN0cmluZyBleHBlY3RlZFwiO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS50ZXN0UmVzcG9uc2UgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwidGVzdFJlc3BvbnNlXCIpKVxyXG4gICAgICAgICAgICAgICAgaWYgKCEkdXRpbC5pc1N0cmluZyhtZXNzYWdlLnRlc3RSZXNwb25zZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidGVzdFJlc3BvbnNlOiBzdHJpbmcgZXhwZWN0ZWRcIjtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlcyBhIEdTMkNfVGVzdCBtZXNzYWdlIGZyb20gYSBwbGFpbiBvYmplY3QuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIHRoZWlyIHJlc3BlY3RpdmUgaW50ZXJuYWwgdHlwZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGZyb21PYmplY3RcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5HUzJDX1Rlc3RcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gb2JqZWN0IFBsYWluIG9iamVjdFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuaWNlX3RzLkdTMkNfVGVzdH0gR1MyQ19UZXN0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgR1MyQ19UZXN0LmZyb21PYmplY3QgPSBmdW5jdGlvbiBmcm9tT2JqZWN0KG9iamVjdCkge1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgJHJvb3QubmljZV90cy5HUzJDX1Rlc3QpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IG5ldyAkcm9vdC5uaWNlX3RzLkdTMkNfVGVzdCgpO1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0LkVycm9yICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLkVycm9yID0gb2JqZWN0LkVycm9yIHwgMDtcclxuICAgICAgICAgICAgaWYgKG9iamVjdC5NZXNzYWdlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLk1lc3NhZ2UgPSBTdHJpbmcob2JqZWN0Lk1lc3NhZ2UpO1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0LnRlc3RSZXNwb25zZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZS50ZXN0UmVzcG9uc2UgPSBTdHJpbmcob2JqZWN0LnRlc3RSZXNwb25zZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENyZWF0ZXMgYSBwbGFpbiBvYmplY3QgZnJvbSBhIEdTMkNfVGVzdCBtZXNzYWdlLiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byBvdGhlciB0eXBlcyBpZiBzcGVjaWZpZWQuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIHRvT2JqZWN0XHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuR1MyQ19UZXN0XHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7bmljZV90cy5HUzJDX1Rlc3R9IG1lc3NhZ2UgR1MyQ19UZXN0XHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuSUNvbnZlcnNpb25PcHRpb25zfSBbb3B0aW9uc10gQ29udmVyc2lvbiBvcHRpb25zXHJcbiAgICAgICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBQbGFpbiBvYmplY3RcclxuICAgICAgICAgKi9cclxuICAgICAgICBHUzJDX1Rlc3QudG9PYmplY3QgPSBmdW5jdGlvbiB0b09iamVjdChtZXNzYWdlLCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIGlmICghb3B0aW9ucylcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB7fTtcclxuICAgICAgICAgICAgdmFyIG9iamVjdCA9IHt9O1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5kZWZhdWx0cykge1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0LnRlc3RSZXNwb25zZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QuRXJyb3IgPSAwO1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0Lk1lc3NhZ2UgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLnRlc3RSZXNwb25zZSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJ0ZXN0UmVzcG9uc2VcIikpXHJcbiAgICAgICAgICAgICAgICBvYmplY3QudGVzdFJlc3BvbnNlID0gbWVzc2FnZS50ZXN0UmVzcG9uc2U7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLkVycm9yICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIkVycm9yXCIpKVxyXG4gICAgICAgICAgICAgICAgb2JqZWN0LkVycm9yID0gbWVzc2FnZS5FcnJvcjtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuTWVzc2FnZSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJNZXNzYWdlXCIpKVxyXG4gICAgICAgICAgICAgICAgb2JqZWN0Lk1lc3NhZ2UgPSBtZXNzYWdlLk1lc3NhZ2U7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ29udmVydHMgdGhpcyBHUzJDX1Rlc3QgdG8gSlNPTi5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gdG9KU09OXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuR1MyQ19UZXN0XHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBKU09OIG9iamVjdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEdTMkNfVGVzdC5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci50b09iamVjdCh0aGlzLCAkcHJvdG9idWYudXRpbC50b0pTT05PcHRpb25zKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gR1MyQ19UZXN0O1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICByZXR1cm4gbmljZV90cztcclxufSkoKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gJHJvb3Q7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNzaGFycFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwdWVydHNcIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgSnNNYW5hZ2VyLCBVbml0eUVuZ2luZSB9IGZyb20gXCJjc2hhcnBcIjtcclxuaW1wb3J0IHsgQ29tbW9uVUkgfSBmcm9tIFwiLi9kYXRhL3VpL2NvbW1vblwiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi9mcmFtZXdvcmsvbG9nZ2VyL0xvZ2dlclwiO1xyXG5pbXBvcnQgeyBTY2VuZURlZiB9IGZyb20gXCIuL2ZyYW1ld29yay9zY2VuZS9TY2VuZURlZlwiO1xyXG5pbXBvcnQgeyBTIH0gZnJvbSBcIi4vZ2xvYmFsL0dhbWVDb25maWdcIjtcclxuaW1wb3J0IHsgVW5pdFRlc3QgfSBmcm9tIFwiLi91bml0dGVzdC9Vbml0VGVzdFwiO1xyXG5cclxuY2xhc3MgR2FtZU1haW57XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgSnNNYW5hZ2VyLkluc3RhbmNlLkpzT25BcHBsaWNhdGlvblF1aXQgPSAoKSA9PiB0aGlzLm9uQXBwbGljYXRpb25RdWl0KCk7XHJcbiAgICAgICAgSnNNYW5hZ2VyLkluc3RhbmNlLkpzT25EaXNwb3NlID0gKCkgPT4gdGhpcy5vbkRpc3Bvc2UoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGFzeW5jIHN0YXJ0KCl7XHJcbiAgICAgICAgVW5pdHlFbmdpbmUuRGVidWcuTG9nKCdIZWxscCBXb3JkITIyMjIyMicpXHJcbiAgICAgICAgLy/liqDovb3pgJrnlKhGYWlyeUdVSei1hOa6kFxyXG4gICAgICAgIGF3YWl0IFMuUmVzTWFuYWdlci5sb2FkRmFpcnlHVUlQYWNrYWdlKENvbW1vblVJLlBhY2thZ2VOYW1lKTtcclxuXHJcbiAgICAgICAgLy9kbyBVbml0IFRlc3RcclxuICAgICAgICBVbml0VGVzdC5kb1Rlc3QoKTtcclxuXHJcbiAgICAgICAgLy/ov5vlhaXnmbvlvZXmqKHlnZdcclxuICAgICAgICBhd2FpdCBTLlNjZW5lTWFuYWdlci5sb2FkU2NlbmUoU2NlbmVEZWYuR2FtZVN0YXJ0KTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIG9uQXBwbGljYXRpb25RdWl0KCk6dm9pZCB7XHJcbiAgICAgICAgUy5HYW1lT2JqZWN0UG9vbC5jbGVhbnVwKHRydWUpO1xyXG4gICAgICAgIExvZ2dlci5sb2coXCJHYW1lIG9uQXBwbGljYXRpb25RdWl0IGluIEpTLi4uLlwiKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIG9uRGlzcG9zZSgpOnZvaWQge1xyXG4gICAgICAgIExvZ2dlci5sb2coXCJHYW1lIG9uRGlzcG9zZSBpbiBKUy4uLi5cIik7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxubmV3IEdhbWVNYWluKCkuc3RhcnQoKTtcclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==