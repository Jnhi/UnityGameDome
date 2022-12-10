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
FlyBirdUI.UIPipe = "Pipe";
FlyBirdUI.UIOverWindow = "OverWindow";


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
                console.log(address);
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
SceneDef.FlyBird = "FlyBirdScene";
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
/* harmony import */ var _game_module_flybird_scene_FlyBirdScene__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../game/module/flybird/scene/FlyBirdScene */ "./src/game/module/flybird/scene/FlyBirdScene.ts");


// import { LoginScene } from "../../game/module/login/scene/LoginScene";



class SceneFactory {
    static createScene(sceneName) {
        let scene = null;
        switch (sceneName) {
            case _SceneDef__WEBPACK_IMPORTED_MODULE_2__.SceneDef.GameStart:
                scene = new _game_module_gamestart_scene_GameStartScene__WEBPACK_IMPORTED_MODULE_3__.GameStartScene();
                break;
            case _SceneDef__WEBPACK_IMPORTED_MODULE_2__.SceneDef.FlyBird:
                scene = new _game_module_flybird_scene_FlyBirdScene__WEBPACK_IMPORTED_MODULE_4__.FlyBirdScene();
                break;
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
/* harmony import */ var _game_module_flybird_ui_UIFlyBirdMainView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../game/module/flybird/ui/UIFlyBirdMainView */ "./src/game/module/flybird/ui/UIFlyBirdMainView.ts");
/* harmony import */ var _game_module_flyBird_ui_UIFlyBirdOverWindow__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../game/module/flyBird/ui/UIFlyBirdOverWindow */ "./src/game/module/flyBird/ui/UIFlyBirdOverWindow.ts");








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
                            ui = new _game_module_flybird_ui_UIFlyBirdMainView__WEBPACK_IMPORTED_MODULE_6__.UIFlyBirdMainView();
                            break;
                        case _data_ui_FlyBird__WEBPACK_IMPORTED_MODULE_3__.FlyBirdUI.UIOverWindow:
                            ui = new _game_module_flyBird_ui_UIFlyBirdOverWindow__WEBPACK_IMPORTED_MODULE_7__.UIFlyBirdOverWindow();
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
    update(delta) {
        var _a, _b, _c, _d;
        for (let i = 0; i < this.m_listLoadedPanel.length; ++i) {
            this.m_listLoadedPanel[i].update(delta);
        }
        (_b = (_a = this.m_currentPage) === null || _a === void 0 ? void 0 : _a.ui) === null || _b === void 0 ? void 0 : _b.update(delta);
        (_d = (_c = this.m_lastScensePage) === null || _c === void 0 ? void 0 : _c.ui) === null || _d === void 0 ? void 0 : _d.update(delta);
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
    /**
     * Unity中的Update方法
     * @param delta 每帧花的时间
     */
    onUpdate(delta) {
    }
    onDispose() { }
    ;
    awake() {
        this.onAwake();
    }
    startTimer() {
        if (!this._timer)
            this._timer = setInterval(this.update.bind(this), 200);
    }
    update(delta) {
        this.onUpdate(delta);
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

/***/ "./src/game/module/flyBird/ui/UIFlyBirdOverWindow.ts":
/*!***********************************************************!*\
  !*** ./src/game/module/flyBird/ui/UIFlyBirdOverWindow.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UIFlyBirdOverWindow": () => (/* binding */ UIFlyBirdOverWindow)
/* harmony export */ });
/* harmony import */ var _framework_ui_UIPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../framework/ui/UIPage */ "./src/framework/ui/UIPage.ts");
/* harmony import */ var _framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../framework/common/NiceDecorator */ "./src/framework/common/NiceDecorator.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


class UIFlyBirdOverWindow extends _framework_ui_UIPage__WEBPACK_IMPORTED_MODULE_0__.UIPage {
    onAwake() {
        super.onAwake();
    }
    onShow(vo) {
        super.onShow(vo);
    }
    onClose(arg) {
        super.onClose(arg);
    }
    async click_btn_start() {
    }
}
__decorate([
    (0,_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__.binder)("load_medal")
], UIFlyBirdOverWindow.prototype, "load_medal", void 0);
__decorate([
    (0,_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__.binder)("txt_Score")
], UIFlyBirdOverWindow.prototype, "txt_Score", void 0);
__decorate([
    (0,_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__.binder)("txt_BestScore")
], UIFlyBirdOverWindow.prototype, "txt_BestScore", void 0);
__decorate([
    (0,_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__.binder)("btn_reStart")
], UIFlyBirdOverWindow.prototype, "btn_reStart", void 0);


/***/ }),

/***/ "./src/game/module/flybird/scene/FlyBirdScene.ts":
/*!*******************************************************!*\
  !*** ./src/game/module/flybird/scene/FlyBirdScene.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FlyBirdScene": () => (/* binding */ FlyBirdScene)
/* harmony export */ });
/* harmony import */ var _data_ui_FlyBird__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../data/ui/FlyBird */ "./src/data/ui/FlyBird.ts");
/* harmony import */ var _framework_scene_BaseScene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../framework/scene/BaseScene */ "./src/framework/scene/BaseScene.ts");
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../global/GameConfig */ "./src/global/GameConfig.ts");
/* harmony import */ var _home_vo_VoHome__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../home/vo/VoHome */ "./src/game/module/home/vo/VoHome.ts");
// import { homeUI } from "../../../../data/ui/home";




class FlyBirdScene extends _framework_scene_BaseScene__WEBPACK_IMPORTED_MODULE_1__.BaseScene {
    constructor() {
        super();
    }
    onEnter() {
    }
    onComplete() {
        let vo = new _home_vo_VoHome__WEBPACK_IMPORTED_MODULE_3__.VoHome();
        vo.name = "Justin";
        vo.hp = 1200;
        vo.mp = 3300;
        vo.money = 666;
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__.S.UIManager.openPageInScene(_data_ui_FlyBird__WEBPACK_IMPORTED_MODULE_0__.FlyBirdUI.PackageName, _data_ui_FlyBird__WEBPACK_IMPORTED_MODULE_0__.FlyBirdUI.UIMainVIew, vo);
    }
    onLeave() {
    }
}


/***/ }),

/***/ "./src/game/module/flybird/ui/UIFlyBirdMainView.ts":
/*!*********************************************************!*\
  !*** ./src/game/module/flybird/ui/UIFlyBirdMainView.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UIFlyBirdMainView": () => (/* binding */ UIFlyBirdMainView)
/* harmony export */ });
/* harmony import */ var _framework_ui_UIPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../framework/ui/UIPage */ "./src/framework/ui/UIPage.ts");
/* harmony import */ var _framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../framework/common/NiceDecorator */ "./src/framework/common/NiceDecorator.ts");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! csharp */ "csharp");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(csharp__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../framework/logger/Logger */ "./src/framework/logger/Logger.ts");
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../global/GameConfig */ "./src/global/GameConfig.ts");
/* harmony import */ var _data_ui_FlyBird__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../data/ui/FlyBird */ "./src/data/ui/FlyBird.ts");
/* harmony import */ var _gamestart_vo_VoOverWindow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../gamestart/vo/VoOverWindow */ "./src/game/module/gamestart/vo/VoOverWindow.ts");
/* harmony import */ var _framework_common_List__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../framework/common/List */ "./src/framework/common/List.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








class UIFlyBirdMainView extends _framework_ui_UIPage__WEBPACK_IMPORTED_MODULE_0__.UIPage {
    constructor() {
        super(...arguments);
        this.curPipes = new _framework_common_List__WEBPACK_IMPORTED_MODULE_7__.List();
        this.needDestory = new _framework_common_List__WEBPACK_IMPORTED_MODULE_7__.List();
        /**地板速度 */
        this.groundSpeed = 23;
        /**背景速度速度 */
        this.skySpeed = 18;
        /**游戏是否开始 */
        this.isStart = false;
        /**点击后弹起时间 */
        this.upTime = 0.3;
        /**点击后弹起速度 */
        this.upSpeed = -1000;
        /**下落速度 */
        this.downSpeed = 70;
        /**鸟的碰撞距离 */
        this.carshDis = 30;
        /**得分 */
        this.score = 30;
        /**水管创建间隔 */
        this.pipeIntervalTime = 3;
        /**水管时间 */
        this.pipeTime = 0;
        /**水管速度 */
        this.pipeSpeed = 300;
        /**小鸟状态 */
        this.isUp = false;
    }
    onUpdate(dt) {
        // console.log(dt)
        if (this.bird && this.isStart) {
            this.list_ground.scrollPane.posX = this.list_ground.scrollPane.posX + dt * this.groundSpeed;
            this.list_bg.scrollPane.posX = this.list_bg.scrollPane.posX + dt * this.skySpeed;
            this.bird.y = Math.min(930, this.bird.y + (this.isUp ? this.upSpeed : this.downSpeed) * dt);
            // 小鸟碰撞地面
            if (this.bird.y < -600) {
                this.GameOver();
            }
            // 删除屏幕外的水管
            for (let i = 0; i < this.needDestory.count; i++) {
                this.curPipes.remove(this.needDestory[i]);
                this.needDestory[i].Dispose();
            }
            this.needDestory.clear();
            // 水管的移动
            for (let i = 0; i < this.curPipes.count; i++) {
                const element = this.curPipes[i];
                element.x = element.x - dt * this.pipeSpeed;
                if (element.x <= -700) {
                    this.needDestory.add(this.curPipes[i]);
                }
                // // 检测小鸟是否碰撞水管
                // if (isCrash(bird,curPipes[i]))
                // {
                //     GameOver();
                // }
            }
            this.pipeTime += dt;
            // 水管定时创建
            if (this.pipeTime >= this.pipeIntervalTime) {
                this.pipeTime = 0;
                this.createPipe();
            }
        }
    }
    onAwake() {
        super.onAwake();
        console.log("开始界面3");
        this.list_bg.SetVirtualAndLoop();
        this.list_bg.itemRenderer = (index, obj) => {
        };
        this.list_bg.numItems = 3;
        this.list_ground.SetVirtualAndLoop();
        this.list_ground.itemRenderer = (index, obj) => {
        };
        this.list_ground.numItems = 3;
        this.txt_Score.visible = false;
        this.btn_start.onClick.Set(() => {
            this.onClickStart();
        });
        this.list_bg.onClick.Set(() => {
            this.isUp = true;
            let timerr = 0;
            // this.bird.transform.DORotate(new Vector3(0,0,30),0.2f);
            // t.Kill();
            // t = DOTween.To(() => timerr, x => timerr = x, 1, this.upTime).OnStepComplete(()=>{
            //     this.isUp = false;
            //     this.bird.transform.DORotate(new Vector3(0,0,-30),0.2f);
            // }).SetLoops(1);
        });
    }
    /**游戏开始 */
    GameStart() {
        this.isStart = true;
        this.isUp = false;
        this.txt_Score.visible = true;
        this.startPanel.visible = false;
    }
    /**游戏结束 */
    GameOver() {
        this.isStart = false;
        if (csharp__WEBPACK_IMPORTED_MODULE_2__.UnityEngine.PlayerPrefs.HasKey("Bird_BestScore")) {
            let saveBastScore = csharp__WEBPACK_IMPORTED_MODULE_2__.UnityEngine.PlayerPrefs.GetInt("Bird_BestScore");
            if (saveBastScore < this.score) {
                csharp__WEBPACK_IMPORTED_MODULE_2__.UnityEngine.PlayerPrefs.SetInt("Bird_BestScore", this.score);
            }
        }
        else {
            csharp__WEBPACK_IMPORTED_MODULE_2__.UnityEngine.PlayerPrefs.SetInt("Bird_BestScore", this.score);
        }
        let vo = new _gamestart_vo_VoOverWindow__WEBPACK_IMPORTED_MODULE_6__.VoOverWindow();
        vo.bestScore = csharp__WEBPACK_IMPORTED_MODULE_2__.UnityEngine.PlayerPrefs.GetInt("Bird_BestScore");
        vo.score = this.score;
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_4__.S.UIManager.openWindow(_data_ui_FlyBird__WEBPACK_IMPORTED_MODULE_5__.FlyBirdUI.PackageName, _data_ui_FlyBird__WEBPACK_IMPORTED_MODULE_5__.FlyBirdUI.UIOverWindow, vo);
    }
    /**创建水管 */
    createPipe() {
        let objPipe = csharp__WEBPACK_IMPORTED_MODULE_2__.FairyGUI.UIPackage.CreateObject(_data_ui_FlyBird__WEBPACK_IMPORTED_MODULE_5__.FlyBirdUI.PackageName, _data_ui_FlyBird__WEBPACK_IMPORTED_MODULE_5__.FlyBirdUI.UIPipe).asCom;
        this.curPipes.add(objPipe);
        return objPipe;
    }
    onClickStart() {
        this.GameStart();
    }
    onShow(vo) {
        super.onShow(vo);
        // this.m_nameLbl.text = vo.name;
        // this.m_mpLbl.text = vo.mp.toString();
        // this.m_hpLbl.text = vo.hp.toString();
        // this.m_moneyLbl.text = vo.money.toString();
        // S.GameSession.listen(Opcode.MSG_GS2C_Test,function(msg:nice_ts.GS2C_Test){
        //     Logger.log("收到服务器下发的消息。。。。"+msg.testResponse)
        // })
    }
    onClose(arg) {
        super.onClose(arg);
    }
    async click_btn_start() {
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_3__.Logger.log("on chat...");
    }
}
__decorate([
    (0,_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__.binder)("list_bg")
], UIFlyBirdMainView.prototype, "list_bg", void 0);
__decorate([
    (0,_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__.binder)("list_ground")
], UIFlyBirdMainView.prototype, "list_ground", void 0);
__decorate([
    (0,_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__.binder)("btn_start")
], UIFlyBirdMainView.prototype, "btn_start", void 0);
__decorate([
    (0,_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__.binder)("txt_Score")
], UIFlyBirdMainView.prototype, "txt_Score", void 0);
__decorate([
    (0,_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__.binder)("startPanel")
], UIFlyBirdMainView.prototype, "startPanel", void 0);
__decorate([
    (0,_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__.binder)("anim_bird")
], UIFlyBirdMainView.prototype, "bird", void 0);


/***/ }),

/***/ "./src/game/module/gamestart/scene/GameStartScene.ts":
/*!***********************************************************!*\
  !*** ./src/game/module/gamestart/scene/GameStartScene.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameStartScene": () => (/* binding */ GameStartScene)
/* harmony export */ });
/* harmony import */ var _data_ui_GameStart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../data/ui/GameStart */ "./src/data/ui/GameStart.ts");
/* harmony import */ var _framework_scene_BaseScene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../framework/scene/BaseScene */ "./src/framework/scene/BaseScene.ts");
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../global/GameConfig */ "./src/global/GameConfig.ts");
/* harmony import */ var _vo_VoGameStart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../vo/VoGameStart */ "./src/game/module/gamestart/vo/VoGameStart.ts");




class GameStartScene extends _framework_scene_BaseScene__WEBPACK_IMPORTED_MODULE_1__.BaseScene {
    constructor() {
        super();
    }
    onEnter() {
        console.log("进入开始场景");
    }
    onComplete() {
        let vo = new _vo_VoGameStart__WEBPACK_IMPORTED_MODULE_3__.VoGameStart();
        console.log("进入开始场景结束");
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
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../global/GameConfig */ "./src/global/GameConfig.ts");
/* harmony import */ var _framework_scene_SceneDef__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../framework/scene/SceneDef */ "./src/framework/scene/SceneDef.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




class UIStartView extends _framework_ui_UIPage__WEBPACK_IMPORTED_MODULE_0__.UIPage {
    // @binder("bagBtn")
    // public m_bagBtn:FairyGUI.GButton;
    // @binder("shopBtn")
    // public m_shopBtn:FairyGUI.GButton;
    // @binder("levelBtn")
    // public m_levelBtn:FairyGUI.GButton;
    // @binder("nameTxt")
    // public m_nameLbl:FairyGUI.GLabel;
    // @binder("hpTxt")
    // public m_hpLbl:FairyGUI.GLabel;
    // @binder("mpTxt")
    // public m_mpLbl:FairyGUI.GLabel;
    // @binder("moneyTxt")
    // public m_moneyLbl:FairyGUI.GLabel;
    onAwake() {
        super.onAwake();
        console.log("开始界面");
        this.btn_start.onClick.Add(() => {
            console.log("2333");
            this.click_btn_start();
        });
    }
    onShow(vo) {
        super.onShow(vo);
        // S.GameSession.listen(Opcode.MSG_GS2C_Test,function(msg:nice_ts.GS2C_Test){
        //     Logger.log("收到服务器下发的消息。。。。"+msg.testResponse)
        // })
    }
    onClose(arg) {
        super.onClose(arg);
    }
    async click_btn_start() {
        await _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__.S.SceneManager.loadScene(_framework_scene_SceneDef__WEBPACK_IMPORTED_MODULE_3__.SceneDef.FlyBird);
    }
}
__decorate([
    (0,_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__.binder)("btn_start")
], UIStartView.prototype, "btn_start", void 0);


/***/ }),

/***/ "./src/game/module/gamestart/vo/VoGameStart.ts":
/*!*****************************************************!*\
  !*** ./src/game/module/gamestart/vo/VoGameStart.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VoGameStart": () => (/* binding */ VoGameStart)
/* harmony export */ });
class VoGameStart {
}


/***/ }),

/***/ "./src/game/module/gamestart/vo/VoOverWindow.ts":
/*!******************************************************!*\
  !*** ./src/game/module/gamestart/vo/VoOverWindow.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VoOverWindow": () => (/* binding */ VoOverWindow)
/* harmony export */ });
class VoOverWindow {
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





class GameMain {
    constructor() {
        csharp__WEBPACK_IMPORTED_MODULE_0__.JsManager.Instance.JsOnApplicationQuit = () => this.onApplicationQuit();
        csharp__WEBPACK_IMPORTED_MODULE_0__.JsManager.Instance.JsOnDispose = () => this.onDispose();
        csharp__WEBPACK_IMPORTED_MODULE_0__.JsManager.Instance.JsUpdate = (delta) => this.update(delta);
    }
    async start() {
        csharp__WEBPACK_IMPORTED_MODULE_0__.UnityEngine.Debug.Log('Hellp Word!2222224');
        //加载通用FairyGUI资源
        console.log(_data_ui_common__WEBPACK_IMPORTED_MODULE_1__.CommonUI.PackageName);
        await _global_GameConfig__WEBPACK_IMPORTED_MODULE_4__.S.ResManager.loadFairyGUIPackage(_data_ui_common__WEBPACK_IMPORTED_MODULE_1__.CommonUI.PackageName);
        // JSON.parse('aa');
        //do Unit Test
        // UnitTest.doTest();
        //进入登录模块
        await _global_GameConfig__WEBPACK_IMPORTED_MODULE_4__.S.SceneManager.loadScene(_framework_scene_SceneDef__WEBPACK_IMPORTED_MODULE_3__.SceneDef.GameStart);
        //JS启动完成，通知C#层
        csharp__WEBPACK_IMPORTED_MODULE_0__.GameLaunch.Instance.JsLuanchFinish();
    }
    ;
    onApplicationQuit() {
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_4__.S.GameObjectPool.cleanup(true);
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_2__.Logger.log("Game onApplicationQuit in JS....");
    }
    update(delta) {
        // console.log(delta)
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_4__.S.UIManager.update(delta);
    }
    onDispose() {
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_2__.Logger.log("Game onDispose in JS....");
    }
}
new GameMain().start();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxLQUFLO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLEtBQUs7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxjQUFjLDBDQUEwQztBQUN4RDtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzlVYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLCtEQUErRDtBQUMvRDtBQUNBO0FBQ0EsTUFBTSxhQUFhO0FBQ25CO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2hCYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixnQkFBZ0I7QUFDNUM7QUFDQSxVQUFVO0FBQ1YsV0FBVyxRQUFRO0FBQ25CLGFBQWEsWUFBWTtBQUN6QjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0JBQWdCO0FBQ3hDO0FBQ0EsVUFBVTtBQUNWLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsYUFBYSxZQUFZO0FBQ3pCLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGVBQWU7QUFDMUIsV0FBVyxZQUFZO0FBQ3ZCLFdBQVcsUUFBUTtBQUNuQixhQUFhLGVBQWU7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQy9DYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixtQkFBbUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsWUFBWTtBQUN2QixXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsWUFBWTtBQUN2QixXQUFXLFFBQVE7QUFDbkIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaLG9CQUFvQixtQkFBbUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxVQUFVO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELGFBQWE7QUFDbkU7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2QsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsVUFBVTtBQUNyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsVUFBVTtBQUNyQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxVQUFVO0FBQ3JCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFVBQVU7QUFDckIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLFVBQVU7QUFDckIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLFVBQVU7QUFDckIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLGFBQWE7QUFDYjtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxtQkFBbUI7QUFDOUIsV0FBVyxTQUFTO0FBQ3BCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixnQkFBZ0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsbUJBQW1CO0FBQzlCLFdBQVcsU0FBUztBQUNwQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsc0JBQXNCLCtDQUErQztBQUNoRixXQUFXLFVBQVU7QUFDckIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLHNCQUFzQiwrQ0FBK0M7QUFDaEYsV0FBVyxVQUFVO0FBQ3JCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLGFBQWE7QUFDYjtBQUNBLFlBQVksWUFBWTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFNBQVM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFLGtCQUFrQjtBQUNsRixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcscUJBQXFCO0FBQ2hDLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJFQUEyRSxrQkFBa0I7QUFDN0Y7QUFDQSxXQUFXLHFCQUFxQjtBQUNoQyxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcscUJBQXFCO0FBQ2hDLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRkFBaUYscUJBQXFCO0FBQ3RHO0FBQ0EsV0FBVyxxQkFBcUI7QUFDaEMsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGLHFCQUFxQjtBQUN0RztBQUNBLFdBQVcscUJBQXFCO0FBQ2hDLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxxQkFBcUI7QUFDaEMsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlGQUFpRixvQkFBb0I7QUFDckc7QUFDQSxXQUFXLHFCQUFxQjtBQUNoQyxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcscUJBQXFCO0FBQ2hDLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwRkFBMEYsMkJBQTJCO0FBQ3JIO0FBQ0EsV0FBVyxxQkFBcUI7QUFDaEMsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEZBQTBGLDJCQUEyQjtBQUNySDtBQUNBLFdBQVcscUJBQXFCO0FBQ2hDLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxxQkFBcUI7QUFDaEMsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9GQUFvRix1QkFBdUI7QUFDM0c7QUFDQSxXQUFXLHFCQUFxQjtBQUNoQyxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcscUJBQXFCO0FBQ2hDLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2RkFBNkYsOEJBQThCO0FBQzNIO0FBQ0EsV0FBVyxxQkFBcUI7QUFDaEMsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkZBQTZGLDhCQUE4QjtBQUMzSDtBQUNBLFdBQVcscUJBQXFCO0FBQ2hDLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxxQkFBcUI7QUFDaEMsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlFQUF5RSxtQkFBbUI7QUFDNUY7QUFDQSxXQUFXLHFCQUFxQjtBQUNoQyxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsa0JBQWtCO0FBQ3JFO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLHFCQUFxQjtBQUNoQyxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLHFCQUFxQjtBQUNoQyxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtFQUErRSxvQkFBb0I7QUFDbkc7QUFDQSxXQUFXLHFCQUFxQjtBQUNoQyxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcscUJBQXFCO0FBQ2hDLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEVBQTRFLG9CQUFvQjtBQUNoRztBQUNBLFdBQVcscUJBQXFCO0FBQ2hDLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLHFCQUFxQjtBQUNoQyxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCxtQkFBbUI7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0VBQW9FLGtCQUFrQjtBQUN0RjtBQUNBLFdBQVcscUJBQXFCO0FBQ2hDLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxxQkFBcUI7QUFDaEMsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRUFBZ0Usa0JBQWtCO0FBQ2xGO0FBQ0EsV0FBVyxxQkFBcUI7QUFDaEMsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFLGtCQUFrQjtBQUNsRjtBQUNBLFdBQVcscUJBQXFCO0FBQ2hDLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxxQkFBcUI7QUFDaEMsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcscUJBQXFCO0FBQ2hDLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLHFCQUFxQjtBQUNoQyxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxjQUFjO0FBQ3pCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZGQUE2RixxQkFBcUI7QUFDbEg7QUFDQSxXQUFXLGNBQWM7QUFDekIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGNBQWM7QUFDekIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkdBQTZHLHNCQUFzQjtBQUNuSTtBQUNBLFdBQVcsY0FBYztBQUN6QixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsY0FBYztBQUN6QixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0dBQXdHLDhCQUE4QjtBQUN0STtBQUNBLFdBQVcsY0FBYztBQUN6QixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3R0FBd0csOEJBQThCO0FBQ3RJO0FBQ0EsV0FBVyxjQUFjO0FBQ3pCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckIsYUFBYSxpQkFBaUI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGlCQUFpQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGlCQUFpQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGlCQUFpQjtBQUM1QixXQUFXLFVBQVU7QUFDckIsV0FBVyxVQUFVO0FBQ3JCLGFBQWEsTUFBTTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsaUJBQWlCO0FBQzVCLFdBQVcsVUFBVTtBQUNyQixhQUFhLE1BQU07QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsaUJBQWlCO0FBQzVCLFdBQVcsVUFBVTtBQUNyQixhQUFhLE1BQU07QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDMXlDQTs7QUFFYTtBQUNiLGlIQUErQzs7Ozs7Ozs7Ozs7O0FDSGxDO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QixtQkFBTyxDQUFDLHlEQUFVO0FBQzFDLHdCQUF3QixtQkFBTyxDQUFDLHVFQUFpQjtBQUNqRCx3QkFBd0IsbUJBQU8sQ0FBQyx5REFBVTtBQUMxQyx3QkFBd0IsbUJBQU8sQ0FBQyx1RUFBaUI7O0FBRWpEO0FBQ0Esd0JBQXdCLG1CQUFPLENBQUMscUVBQWdCO0FBQ2hELHdCQUF3QixtQkFBTyxDQUFDLG1EQUFPO0FBQ3ZDLHdCQUF3QixtQkFBTyxDQUFDLHVEQUFTO0FBQ3pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDbkNhO0FBQ2I7O0FBRUEsZ0JBQWdCLG1CQUFPLENBQUMscUVBQWdCOztBQUV4QyxrQkFBa0I7O0FBRWxCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFlBQVk7QUFDdkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWEscUJBQXFCLEdBQUcsb0JBQW9CLHNDQUFzQztBQUMvRixZQUFZLE9BQU87QUFDbkI7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBLGtFQUFrRTtBQUNsRSxrRUFBa0U7QUFDbEUsa0VBQWtFO0FBQ2xFLGtFQUFrRTtBQUNsRSxrRUFBa0U7O0FBRWxFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQyxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkI7O0FBRUE7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25COztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25COztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsWUFBWTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Es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TSxRQUFRO0lBRVY7UUFDSSwwRUFBc0MsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN4RSxrRUFBOEIsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDeEQsK0RBQTJCLEdBQUcsQ0FBQyxLQUFZLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVNLEtBQUssQ0FBQyxLQUFLO1FBQ2QseURBQXFCLENBQUMsb0JBQW9CLENBQUM7UUFDM0MsZ0JBQWdCO1FBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUVBQW9CLENBQUM7UUFDakMsTUFBTSxnRkFBZ0MsQ0FBQyxpRUFBb0IsQ0FBQyxDQUFDO1FBQzdELG9CQUFvQjtRQUNwQixjQUFjO1FBQ2QscUJBQXFCO1FBRXJCLFFBQVE7UUFDUixNQUFNLHdFQUF3QixDQUFDLHlFQUFrQixDQUFDLENBQUM7UUFFbkQsY0FBYztRQUNkLHNFQUFrQyxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUFBLENBQUM7SUFFSyxpQkFBaUI7UUFDcEIsd0VBQXdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsZ0VBQVUsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFTyxNQUFNLENBQUMsS0FBWTtRQUN2QixxQkFBcUI7UUFDckIsa0VBQWtCLENBQUMsS0FBSyxDQUFDO0lBQzdCLENBQUM7SUFFTSxTQUFTO1FBQ1osZ0VBQVUsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0lBQzNDLENBQUM7Q0FDSjtBQUlELElBQUksUUFBUSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90c3Byb2plY3QvLi9ub2RlX21vZHVsZXMvQHByb3RvYnVmanMvYXNwcm9taXNlL2luZGV4LmpzIiwid2VicGFjazovL3RzcHJvamVjdC8uL25vZGVfbW9kdWxlcy9AcHJvdG9idWZqcy9iYXNlNjQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL0Bwcm90b2J1ZmpzL2V2ZW50ZW1pdHRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9ub2RlX21vZHVsZXMvQHByb3RvYnVmanMvZmxvYXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL0Bwcm90b2J1ZmpzL2lucXVpcmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL0Bwcm90b2J1ZmpzL3Bvb2wvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL0Bwcm90b2J1ZmpzL3V0ZjgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL2xvbmcvc3JjL2xvbmcuanMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3Byb3RvYnVmanMvbWluaW1hbC5qcyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9zcmMvaW5kZXgtbWluaW1hbC5qcyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9zcmMvcmVhZGVyLmpzIiwid2VicGFjazovL3RzcHJvamVjdC8uL25vZGVfbW9kdWxlcy9wcm90b2J1ZmpzL3NyYy9yZWFkZXJfYnVmZmVyLmpzIiwid2VicGFjazovL3RzcHJvamVjdC8uL25vZGVfbW9kdWxlcy9wcm90b2J1ZmpzL3NyYy9yb290cy5qcyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9zcmMvcnBjLmpzIiwid2VicGFjazovL3RzcHJvamVjdC8uL25vZGVfbW9kdWxlcy9wcm90b2J1ZmpzL3NyYy9ycGMvc2VydmljZS5qcyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9zcmMvdXRpbC9sb25nYml0cy5qcyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9zcmMvdXRpbC9taW5pbWFsLmpzIiwid2VicGFjazovL3RzcHJvamVjdC8uL25vZGVfbW9kdWxlcy9wcm90b2J1ZmpzL3NyYy93cml0ZXIuanMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3Byb3RvYnVmanMvc3JjL3dyaXRlcl9idWZmZXIuanMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2RhdGEvcGIvT3Bjb2RlLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9kYXRhL3VpL0ZseUJpcmQudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2RhdGEvdWkvR2FtZVN0YXJ0LnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9kYXRhL3VpL2NvbW1vbi50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZnJhbWV3b3JrL2NvbW1vbi9HYW1lT2JqZWN0UG9vbC50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZnJhbWV3b3JrL2NvbW1vbi9MaXN0LnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvY29tbW9uL01lc3Nlbmdlci50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZnJhbWV3b3JrL2NvbW1vbi9OaWNlRGVjb3JhdG9yLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvY29tbW9uL1Jlc01hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2ZyYW1ld29yay9jb21tb24vU2luZ2xldG9uLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvbG9nZ2VyL0xvZ2dlci50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZnJhbWV3b3JrL25ldC9HYW1lU2Vzc2lvbi50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZnJhbWV3b3JrL25ldC9IdHRwTWFuYWdlci50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZnJhbWV3b3JrL25ldC9NZXNzYWdlUGFyc2VyLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvbmV0L05ldEVycm9yQ29kZS50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZnJhbWV3b3JrL25ldC9TZXNzaW9uTWFuYWdlci50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZnJhbWV3b3JrL3NjZW5lL0Jhc2VTY2VuZS50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZnJhbWV3b3JrL3NjZW5lL1NjZW5lRGVmLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvc2NlbmUvU2NlbmVGYWN0b3J5LnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvc2NlbmUvU2NlbmVNYW5hZ2VyLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvdWkvVUlCYXNlLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvdWkvVUlEZWZpbmUudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2ZyYW1ld29yay91aS9VSUZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2ZyYW1ld29yay91aS9VSUxpYi9VSUxvYWRpbmcudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2ZyYW1ld29yay91aS9VSU1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2ZyYW1ld29yay91aS9VSVBhZ2UudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2ZyYW1ld29yay91aS9VSVBhbmVsLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9nYW1lL2V2ZW50L1VJTWVzc2FnZS50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZ2FtZS9ldmVudC9VSU1lc3NhZ2VNYW5hZ2VyLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9nYW1lL21vZHVsZS9mbHlCaXJkL3VpL1VJRmx5QmlyZE92ZXJXaW5kb3cudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2dhbWUvbW9kdWxlL2ZseWJpcmQvc2NlbmUvRmx5QmlyZFNjZW5lLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9nYW1lL21vZHVsZS9mbHliaXJkL3VpL1VJRmx5QmlyZE1haW5WaWV3LnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9nYW1lL21vZHVsZS9nYW1lc3RhcnQvc2NlbmUvR2FtZVN0YXJ0U2NlbmUudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2dhbWUvbW9kdWxlL2dhbWVzdGFydC91aS9VSVN0YXJ0Vmlldy50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZ2FtZS9tb2R1bGUvZ2FtZXN0YXJ0L3ZvL1ZvR2FtZVN0YXJ0LnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9nYW1lL21vZHVsZS9nYW1lc3RhcnQvdm8vVm9PdmVyV2luZG93LnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9nYW1lL21vZHVsZS9ob21lL3NjZW5lL0hvbWVTY2VuZS50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZ2FtZS9tb2R1bGUvaG9tZS92by9Wb0hvbWUudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2dhbWUvbW9kdWxlL3B2ZS9zY2VuZS9QdmVTY2VuZS50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZ2xvYmFsL0dhbWVDb25maWcudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2RhdGEvcGIvZ2VuL3BiLmpzIiwid2VicGFjazovL3RzcHJvamVjdC9leHRlcm5hbCBjb21tb25qczIgXCJjc2hhcnBcIiIsIndlYnBhY2s6Ly90c3Byb2plY3QvZXh0ZXJuYWwgY29tbW9uanMyIFwicHVlcnRzXCIiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RzcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90c3Byb2plY3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RzcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3RzcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RzcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9HYW1lTWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPSBhc1Byb21pc2U7XHJcblxyXG4vKipcclxuICogQ2FsbGJhY2sgYXMgdXNlZCBieSB7QGxpbmsgdXRpbC5hc1Byb21pc2V9LlxyXG4gKiBAdHlwZWRlZiBhc1Byb21pc2VDYWxsYmFja1xyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XHJcbiAqIEBwYXJhbSB7RXJyb3J8bnVsbH0gZXJyb3IgRXJyb3IsIGlmIGFueVxyXG4gKiBAcGFyYW0gey4uLip9IHBhcmFtcyBBZGRpdGlvbmFsIGFyZ3VtZW50c1xyXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGEgcHJvbWlzZSBmcm9tIGEgbm9kZS1zdHlsZSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICogQG1lbWJlcm9mIHV0aWxcclxuICogQHBhcmFtIHthc1Byb21pc2VDYWxsYmFja30gZm4gRnVuY3Rpb24gdG8gY2FsbFxyXG4gKiBAcGFyYW0geyp9IGN0eCBGdW5jdGlvbiBjb250ZXh0XHJcbiAqIEBwYXJhbSB7Li4uKn0gcGFyYW1zIEZ1bmN0aW9uIGFyZ3VtZW50c1xyXG4gKiBAcmV0dXJucyB7UHJvbWlzZTwqPn0gUHJvbWlzaWZpZWQgZnVuY3Rpb25cclxuICovXHJcbmZ1bmN0aW9uIGFzUHJvbWlzZShmbiwgY3R4LyosIHZhcmFyZ3MgKi8pIHtcclxuICAgIHZhciBwYXJhbXMgID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKSxcclxuICAgICAgICBvZmZzZXQgID0gMCxcclxuICAgICAgICBpbmRleCAgID0gMixcclxuICAgICAgICBwZW5kaW5nID0gdHJ1ZTtcclxuICAgIHdoaWxlIChpbmRleCA8IGFyZ3VtZW50cy5sZW5ndGgpXHJcbiAgICAgICAgcGFyYW1zW29mZnNldCsrXSA9IGFyZ3VtZW50c1tpbmRleCsrXTtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBleGVjdXRvcihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBwYXJhbXNbb2Zmc2V0XSA9IGZ1bmN0aW9uIGNhbGxiYWNrKGVyci8qLCB2YXJhcmdzICovKSB7XHJcbiAgICAgICAgICAgIGlmIChwZW5kaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBwZW5kaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmFtcyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKG9mZnNldCA8IHBhcmFtcy5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtc1tvZmZzZXQrK10gPSBhcmd1bWVudHNbb2Zmc2V0XTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlLmFwcGx5KG51bGwsIHBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGZuLmFwcGx5KGN0eCB8fCBudWxsLCBwYXJhbXMpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBpZiAocGVuZGluZykge1xyXG4gICAgICAgICAgICAgICAgcGVuZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbi8qKlxyXG4gKiBBIG1pbmltYWwgYmFzZTY0IGltcGxlbWVudGF0aW9uIGZvciBudW1iZXIgYXJyYXlzLlxyXG4gKiBAbWVtYmVyb2YgdXRpbFxyXG4gKiBAbmFtZXNwYWNlXHJcbiAqL1xyXG52YXIgYmFzZTY0ID0gZXhwb3J0cztcclxuXHJcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBieXRlIGxlbmd0aCBvZiBhIGJhc2U2NCBlbmNvZGVkIHN0cmluZy5cclxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBCYXNlNjQgZW5jb2RlZCBzdHJpbmdcclxuICogQHJldHVybnMge251bWJlcn0gQnl0ZSBsZW5ndGhcclxuICovXHJcbmJhc2U2NC5sZW5ndGggPSBmdW5jdGlvbiBsZW5ndGgoc3RyaW5nKSB7XHJcbiAgICB2YXIgcCA9IHN0cmluZy5sZW5ndGg7XHJcbiAgICBpZiAoIXApXHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB2YXIgbiA9IDA7XHJcbiAgICB3aGlsZSAoLS1wICUgNCA+IDEgJiYgc3RyaW5nLmNoYXJBdChwKSA9PT0gXCI9XCIpXHJcbiAgICAgICAgKytuO1xyXG4gICAgcmV0dXJuIE1hdGguY2VpbChzdHJpbmcubGVuZ3RoICogMykgLyA0IC0gbjtcclxufTtcclxuXHJcbi8vIEJhc2U2NCBlbmNvZGluZyB0YWJsZVxyXG52YXIgYjY0ID0gbmV3IEFycmF5KDY0KTtcclxuXHJcbi8vIEJhc2U2NCBkZWNvZGluZyB0YWJsZVxyXG52YXIgczY0ID0gbmV3IEFycmF5KDEyMyk7XHJcblxyXG4vLyA2NS4uOTAsIDk3Li4xMjIsIDQ4Li41NywgNDMsIDQ3XHJcbmZvciAodmFyIGkgPSAwOyBpIDwgNjQ7KVxyXG4gICAgczY0W2I2NFtpXSA9IGkgPCAyNiA/IGkgKyA2NSA6IGkgPCA1MiA/IGkgKyA3MSA6IGkgPCA2MiA/IGkgLSA0IDogaSAtIDU5IHwgNDNdID0gaSsrO1xyXG5cclxuLyoqXHJcbiAqIEVuY29kZXMgYSBidWZmZXIgdG8gYSBiYXNlNjQgZW5jb2RlZCBzdHJpbmcuXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmZmVyIFNvdXJjZSBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IFNvdXJjZSBzdGFydFxyXG4gKiBAcGFyYW0ge251bWJlcn0gZW5kIFNvdXJjZSBlbmRcclxuICogQHJldHVybnMge3N0cmluZ30gQmFzZTY0IGVuY29kZWQgc3RyaW5nXHJcbiAqL1xyXG5iYXNlNjQuZW5jb2RlID0gZnVuY3Rpb24gZW5jb2RlKGJ1ZmZlciwgc3RhcnQsIGVuZCkge1xyXG4gICAgdmFyIHBhcnRzID0gbnVsbCxcclxuICAgICAgICBjaHVuayA9IFtdO1xyXG4gICAgdmFyIGkgPSAwLCAvLyBvdXRwdXQgaW5kZXhcclxuICAgICAgICBqID0gMCwgLy8gZ290byBpbmRleFxyXG4gICAgICAgIHQ7ICAgICAvLyB0ZW1wb3JhcnlcclxuICAgIHdoaWxlIChzdGFydCA8IGVuZCkge1xyXG4gICAgICAgIHZhciBiID0gYnVmZmVyW3N0YXJ0KytdO1xyXG4gICAgICAgIHN3aXRjaCAoaikge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICBjaHVua1tpKytdID0gYjY0W2IgPj4gMl07XHJcbiAgICAgICAgICAgICAgICB0ID0gKGIgJiAzKSA8PCA0O1xyXG4gICAgICAgICAgICAgICAgaiA9IDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgY2h1bmtbaSsrXSA9IGI2NFt0IHwgYiA+PiA0XTtcclxuICAgICAgICAgICAgICAgIHQgPSAoYiAmIDE1KSA8PCAyO1xyXG4gICAgICAgICAgICAgICAgaiA9IDI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgY2h1bmtbaSsrXSA9IGI2NFt0IHwgYiA+PiA2XTtcclxuICAgICAgICAgICAgICAgIGNodW5rW2krK10gPSBiNjRbYiAmIDYzXTtcclxuICAgICAgICAgICAgICAgIGogPSAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpID4gODE5MSkge1xyXG4gICAgICAgICAgICAocGFydHMgfHwgKHBhcnRzID0gW10pKS5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjaHVuaykpO1xyXG4gICAgICAgICAgICBpID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoaikge1xyXG4gICAgICAgIGNodW5rW2krK10gPSBiNjRbdF07XHJcbiAgICAgICAgY2h1bmtbaSsrXSA9IDYxO1xyXG4gICAgICAgIGlmIChqID09PSAxKVxyXG4gICAgICAgICAgICBjaHVua1tpKytdID0gNjE7XHJcbiAgICB9XHJcbiAgICBpZiAocGFydHMpIHtcclxuICAgICAgICBpZiAoaSlcclxuICAgICAgICAgICAgcGFydHMucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY2h1bmsuc2xpY2UoMCwgaSkpKTtcclxuICAgICAgICByZXR1cm4gcGFydHMuam9pbihcIlwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY2h1bmsuc2xpY2UoMCwgaSkpO1xyXG59O1xyXG5cclxudmFyIGludmFsaWRFbmNvZGluZyA9IFwiaW52YWxpZCBlbmNvZGluZ1wiO1xyXG5cclxuLyoqXHJcbiAqIERlY29kZXMgYSBiYXNlNjQgZW5jb2RlZCBzdHJpbmcgdG8gYSBidWZmZXIuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgU291cmNlIHN0cmluZ1xyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZmZlciBEZXN0aW5hdGlvbiBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCBEZXN0aW5hdGlvbiBvZmZzZXRcclxuICogQHJldHVybnMge251bWJlcn0gTnVtYmVyIG9mIGJ5dGVzIHdyaXR0ZW5cclxuICogQHRocm93cyB7RXJyb3J9IElmIGVuY29kaW5nIGlzIGludmFsaWRcclxuICovXHJcbmJhc2U2NC5kZWNvZGUgPSBmdW5jdGlvbiBkZWNvZGUoc3RyaW5nLCBidWZmZXIsIG9mZnNldCkge1xyXG4gICAgdmFyIHN0YXJ0ID0gb2Zmc2V0O1xyXG4gICAgdmFyIGogPSAwLCAvLyBnb3RvIGluZGV4XHJcbiAgICAgICAgdDsgICAgIC8vIHRlbXBvcmFyeVxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOykge1xyXG4gICAgICAgIHZhciBjID0gc3RyaW5nLmNoYXJDb2RlQXQoaSsrKTtcclxuICAgICAgICBpZiAoYyA9PT0gNjEgJiYgaiA+IDEpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGlmICgoYyA9IHM2NFtjXSkgPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoaW52YWxpZEVuY29kaW5nKTtcclxuICAgICAgICBzd2l0Y2ggKGopIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgdCA9IGM7XHJcbiAgICAgICAgICAgICAgICBqID0gMTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gdCA8PCAyIHwgKGMgJiA0OCkgPj4gNDtcclxuICAgICAgICAgICAgICAgIHQgPSBjO1xyXG4gICAgICAgICAgICAgICAgaiA9IDI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9ICh0ICYgMTUpIDw8IDQgfCAoYyAmIDYwKSA+PiAyO1xyXG4gICAgICAgICAgICAgICAgdCA9IGM7XHJcbiAgICAgICAgICAgICAgICBqID0gMztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gKHQgJiAzKSA8PCA2IHwgYztcclxuICAgICAgICAgICAgICAgIGogPSAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGogPT09IDEpXHJcbiAgICAgICAgdGhyb3cgRXJyb3IoaW52YWxpZEVuY29kaW5nKTtcclxuICAgIHJldHVybiBvZmZzZXQgLSBzdGFydDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGUgc3BlY2lmaWVkIHN0cmluZyBhcHBlYXJzIHRvIGJlIGJhc2U2NCBlbmNvZGVkLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFN0cmluZyB0byB0ZXN0XHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgcHJvYmFibHkgYmFzZTY0IGVuY29kZWQsIG90aGVyd2lzZSBmYWxzZVxyXG4gKi9cclxuYmFzZTY0LnRlc3QgPSBmdW5jdGlvbiB0ZXN0KHN0cmluZykge1xyXG4gICAgcmV0dXJuIC9eKD86W0EtWmEtejAtOSsvXXs0fSkqKD86W0EtWmEtejAtOSsvXXsyfT09fFtBLVphLXowLTkrL117M309KT8kLy50ZXN0KHN0cmluZyk7XHJcbn07XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcclxuXHJcbi8qKlxyXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IGV2ZW50IGVtaXR0ZXIgaW5zdGFuY2UuXHJcbiAqIEBjbGFzc2Rlc2MgQSBtaW5pbWFsIGV2ZW50IGVtaXR0ZXIuXHJcbiAqIEBtZW1iZXJvZiB1dGlsXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVnaXN0ZXJlZCBsaXN0ZW5lcnMuXHJcbiAgICAgKiBAdHlwZSB7T2JqZWN0LjxzdHJpbmcsKj59XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICB0aGlzLl9saXN0ZW5lcnMgPSB7fTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlZ2lzdGVycyBhbiBldmVudCBsaXN0ZW5lci5cclxuICogQHBhcmFtIHtzdHJpbmd9IGV2dCBFdmVudCBuYW1lXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuIExpc3RlbmVyXHJcbiAqIEBwYXJhbSB7Kn0gW2N0eF0gTGlzdGVuZXIgY29udGV4dFxyXG4gKiBAcmV0dXJucyB7dXRpbC5FdmVudEVtaXR0ZXJ9IGB0aGlzYFxyXG4gKi9cclxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKGV2dCwgZm4sIGN0eCkge1xyXG4gICAgKHRoaXMuX2xpc3RlbmVyc1tldnRdIHx8ICh0aGlzLl9saXN0ZW5lcnNbZXZ0XSA9IFtdKSkucHVzaCh7XHJcbiAgICAgICAgZm4gIDogZm4sXHJcbiAgICAgICAgY3R4IDogY3R4IHx8IHRoaXNcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyBhbiBldmVudCBsaXN0ZW5lciBvciBhbnkgbWF0Y2hpbmcgbGlzdGVuZXJzIGlmIGFyZ3VtZW50cyBhcmUgb21pdHRlZC5cclxuICogQHBhcmFtIHtzdHJpbmd9IFtldnRdIEV2ZW50IG5hbWUuIFJlbW92ZXMgYWxsIGxpc3RlbmVycyBpZiBvbWl0dGVkLlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBbZm5dIExpc3RlbmVyIHRvIHJlbW92ZS4gUmVtb3ZlcyBhbGwgbGlzdGVuZXJzIG9mIGBldnRgIGlmIG9taXR0ZWQuXHJcbiAqIEByZXR1cm5zIHt1dGlsLkV2ZW50RW1pdHRlcn0gYHRoaXNgXHJcbiAqL1xyXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIG9mZihldnQsIGZuKSB7XHJcbiAgICBpZiAoZXZ0ID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgdGhpcy5fbGlzdGVuZXJzID0ge307XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBpZiAoZm4gPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzW2V2dF0gPSBbXTtcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVyc1tldnRdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7KVxyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyc1tpXS5mbiA9PT0gZm4pXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICArK2k7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogRW1pdHMgYW4gZXZlbnQgYnkgY2FsbGluZyBpdHMgbGlzdGVuZXJzIHdpdGggdGhlIHNwZWNpZmllZCBhcmd1bWVudHMuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBldnQgRXZlbnQgbmFtZVxyXG4gKiBAcGFyYW0gey4uLip9IGFyZ3MgQXJndW1lbnRzXHJcbiAqIEByZXR1cm5zIHt1dGlsLkV2ZW50RW1pdHRlcn0gYHRoaXNgXHJcbiAqL1xyXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KGV2dCkge1xyXG4gICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVyc1tldnRdO1xyXG4gICAgaWYgKGxpc3RlbmVycykge1xyXG4gICAgICAgIHZhciBhcmdzID0gW10sXHJcbiAgICAgICAgICAgIGkgPSAxO1xyXG4gICAgICAgIGZvciAoOyBpIDwgYXJndW1lbnRzLmxlbmd0aDspXHJcbiAgICAgICAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7KVxyXG4gICAgICAgICAgICBsaXN0ZW5lcnNbaV0uZm4uYXBwbHkobGlzdGVuZXJzW2krK10uY3R4LCBhcmdzKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShmYWN0b3J5KTtcclxuXHJcbi8qKlxyXG4gKiBSZWFkcyAvIHdyaXRlcyBmbG9hdHMgLyBkb3VibGVzIGZyb20gLyB0byBidWZmZXJzLlxyXG4gKiBAbmFtZSB1dGlsLmZsb2F0XHJcbiAqIEBuYW1lc3BhY2VcclxuICovXHJcblxyXG4vKipcclxuICogV3JpdGVzIGEgMzIgYml0IGZsb2F0IHRvIGEgYnVmZmVyIHVzaW5nIGxpdHRsZSBlbmRpYW4gYnl0ZSBvcmRlci5cclxuICogQG5hbWUgdXRpbC5mbG9hdC53cml0ZUZsb2F0TEVcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWwgVmFsdWUgdG8gd3JpdGVcclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWYgVGFyZ2V0IGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gcG9zIFRhcmdldCBidWZmZXIgb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFdyaXRlcyBhIDMyIGJpdCBmbG9hdCB0byBhIGJ1ZmZlciB1c2luZyBiaWcgZW5kaWFuIGJ5dGUgb3JkZXIuXHJcbiAqIEBuYW1lIHV0aWwuZmxvYXQud3JpdGVGbG9hdEJFXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsIFZhbHVlIHRvIHdyaXRlXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmIFRhcmdldCBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IHBvcyBUYXJnZXQgYnVmZmVyIG9mZnNldFxyXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBSZWFkcyBhIDMyIGJpdCBmbG9hdCBmcm9tIGEgYnVmZmVyIHVzaW5nIGxpdHRsZSBlbmRpYW4gYnl0ZSBvcmRlci5cclxuICogQG5hbWUgdXRpbC5mbG9hdC5yZWFkRmxvYXRMRVxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWYgU291cmNlIGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gcG9zIFNvdXJjZSBidWZmZXIgb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcclxuICovXHJcblxyXG4vKipcclxuICogUmVhZHMgYSAzMiBiaXQgZmxvYXQgZnJvbSBhIGJ1ZmZlciB1c2luZyBiaWcgZW5kaWFuIGJ5dGUgb3JkZXIuXHJcbiAqIEBuYW1lIHV0aWwuZmxvYXQucmVhZEZsb2F0QkVcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmIFNvdXJjZSBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IHBvcyBTb3VyY2UgYnVmZmVyIG9mZnNldFxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFdyaXRlcyBhIDY0IGJpdCBkb3VibGUgdG8gYSBidWZmZXIgdXNpbmcgbGl0dGxlIGVuZGlhbiBieXRlIG9yZGVyLlxyXG4gKiBAbmFtZSB1dGlsLmZsb2F0LndyaXRlRG91YmxlTEVcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWwgVmFsdWUgdG8gd3JpdGVcclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWYgVGFyZ2V0IGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gcG9zIFRhcmdldCBidWZmZXIgb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFdyaXRlcyBhIDY0IGJpdCBkb3VibGUgdG8gYSBidWZmZXIgdXNpbmcgYmlnIGVuZGlhbiBieXRlIG9yZGVyLlxyXG4gKiBAbmFtZSB1dGlsLmZsb2F0LndyaXRlRG91YmxlQkVcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWwgVmFsdWUgdG8gd3JpdGVcclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWYgVGFyZ2V0IGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gcG9zIFRhcmdldCBidWZmZXIgb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFJlYWRzIGEgNjQgYml0IGRvdWJsZSBmcm9tIGEgYnVmZmVyIHVzaW5nIGxpdHRsZSBlbmRpYW4gYnl0ZSBvcmRlci5cclxuICogQG5hbWUgdXRpbC5mbG9hdC5yZWFkRG91YmxlTEVcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmIFNvdXJjZSBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IHBvcyBTb3VyY2UgYnVmZmVyIG9mZnNldFxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFJlYWRzIGEgNjQgYml0IGRvdWJsZSBmcm9tIGEgYnVmZmVyIHVzaW5nIGJpZyBlbmRpYW4gYnl0ZSBvcmRlci5cclxuICogQG5hbWUgdXRpbC5mbG9hdC5yZWFkRG91YmxlQkVcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmIFNvdXJjZSBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IHBvcyBTb3VyY2UgYnVmZmVyIG9mZnNldFxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXHJcbiAqL1xyXG5cclxuLy8gRmFjdG9yeSBmdW5jdGlvbiBmb3IgdGhlIHB1cnBvc2Ugb2Ygbm9kZS1iYXNlZCB0ZXN0aW5nIGluIG1vZGlmaWVkIGdsb2JhbCBlbnZpcm9ubWVudHNcclxuZnVuY3Rpb24gZmFjdG9yeShleHBvcnRzKSB7XHJcblxyXG4gICAgLy8gZmxvYXQ6IHR5cGVkIGFycmF5XHJcbiAgICBpZiAodHlwZW9mIEZsb2F0MzJBcnJheSAhPT0gXCJ1bmRlZmluZWRcIikgKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB2YXIgZjMyID0gbmV3IEZsb2F0MzJBcnJheShbIC0wIF0pLFxyXG4gICAgICAgICAgICBmOGIgPSBuZXcgVWludDhBcnJheShmMzIuYnVmZmVyKSxcclxuICAgICAgICAgICAgbGUgID0gZjhiWzNdID09PSAxMjg7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHdyaXRlRmxvYXRfZjMyX2NweSh2YWwsIGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIGYzMlswXSA9IHZhbDtcclxuICAgICAgICAgICAgYnVmW3BvcyAgICBdID0gZjhiWzBdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgMV0gPSBmOGJbMV07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAyXSA9IGY4YlsyXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDNdID0gZjhiWzNdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gd3JpdGVGbG9hdF9mMzJfcmV2KHZhbCwgYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgZjMyWzBdID0gdmFsO1xyXG4gICAgICAgICAgICBidWZbcG9zICAgIF0gPSBmOGJbM107XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAxXSA9IGY4YlsyXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDJdID0gZjhiWzFdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgM10gPSBmOGJbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgIGV4cG9ydHMud3JpdGVGbG9hdExFID0gbGUgPyB3cml0ZUZsb2F0X2YzMl9jcHkgOiB3cml0ZUZsb2F0X2YzMl9yZXY7XHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBleHBvcnRzLndyaXRlRmxvYXRCRSA9IGxlID8gd3JpdGVGbG9hdF9mMzJfcmV2IDogd3JpdGVGbG9hdF9mMzJfY3B5O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiByZWFkRmxvYXRfZjMyX2NweShidWYsIHBvcykge1xyXG4gICAgICAgICAgICBmOGJbMF0gPSBidWZbcG9zICAgIF07XHJcbiAgICAgICAgICAgIGY4YlsxXSA9IGJ1Zltwb3MgKyAxXTtcclxuICAgICAgICAgICAgZjhiWzJdID0gYnVmW3BvcyArIDJdO1xyXG4gICAgICAgICAgICBmOGJbM10gPSBidWZbcG9zICsgM107XHJcbiAgICAgICAgICAgIHJldHVybiBmMzJbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiByZWFkRmxvYXRfZjMyX3JldihidWYsIHBvcykge1xyXG4gICAgICAgICAgICBmOGJbM10gPSBidWZbcG9zICAgIF07XHJcbiAgICAgICAgICAgIGY4YlsyXSA9IGJ1Zltwb3MgKyAxXTtcclxuICAgICAgICAgICAgZjhiWzFdID0gYnVmW3BvcyArIDJdO1xyXG4gICAgICAgICAgICBmOGJbMF0gPSBidWZbcG9zICsgM107XHJcbiAgICAgICAgICAgIHJldHVybiBmMzJbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgIGV4cG9ydHMucmVhZEZsb2F0TEUgPSBsZSA/IHJlYWRGbG9hdF9mMzJfY3B5IDogcmVhZEZsb2F0X2YzMl9yZXY7XHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBleHBvcnRzLnJlYWRGbG9hdEJFID0gbGUgPyByZWFkRmxvYXRfZjMyX3JldiA6IHJlYWRGbG9hdF9mMzJfY3B5O1xyXG5cclxuICAgIC8vIGZsb2F0OiBpZWVlNzU0XHJcbiAgICB9KSgpOyBlbHNlIChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gd3JpdGVGbG9hdF9pZWVlNzU0KHdyaXRlVWludCwgdmFsLCBidWYsIHBvcykge1xyXG4gICAgICAgICAgICB2YXIgc2lnbiA9IHZhbCA8IDAgPyAxIDogMDtcclxuICAgICAgICAgICAgaWYgKHNpZ24pXHJcbiAgICAgICAgICAgICAgICB2YWwgPSAtdmFsO1xyXG4gICAgICAgICAgICBpZiAodmFsID09PSAwKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KDEgLyB2YWwgPiAwID8gLyogcG9zaXRpdmUgKi8gMCA6IC8qIG5lZ2F0aXZlIDAgKi8gMjE0NzQ4MzY0OCwgYnVmLCBwb3MpO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChpc05hTih2YWwpKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KDIxNDMyODkzNDQsIGJ1ZiwgcG9zKTtcclxuICAgICAgICAgICAgZWxzZSBpZiAodmFsID4gMy40MDI4MjM0NjYzODUyODg2ZSszOCkgLy8gKy1JbmZpbml0eVxyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KChzaWduIDw8IDMxIHwgMjEzOTA5NTA0MCkgPj4+IDAsIGJ1ZiwgcG9zKTtcclxuICAgICAgICAgICAgZWxzZSBpZiAodmFsIDwgMS4xNzU0OTQzNTA4MjIyODc1ZS0zOCkgLy8gZGVub3JtYWxcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgoc2lnbiA8PCAzMSB8IE1hdGgucm91bmQodmFsIC8gMS40MDEyOTg0NjQzMjQ4MTdlLTQ1KSkgPj4+IDAsIGJ1ZiwgcG9zKTtcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXhwb25lbnQgPSBNYXRoLmZsb29yKE1hdGgubG9nKHZhbCkgLyBNYXRoLkxOMiksXHJcbiAgICAgICAgICAgICAgICAgICAgbWFudGlzc2EgPSBNYXRoLnJvdW5kKHZhbCAqIE1hdGgucG93KDIsIC1leHBvbmVudCkgKiA4Mzg4NjA4KSAmIDgzODg2MDc7XHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoKHNpZ24gPDwgMzEgfCBleHBvbmVudCArIDEyNyA8PCAyMyB8IG1hbnRpc3NhKSA+Pj4gMCwgYnVmLCBwb3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBleHBvcnRzLndyaXRlRmxvYXRMRSA9IHdyaXRlRmxvYXRfaWVlZTc1NC5iaW5kKG51bGwsIHdyaXRlVWludExFKTtcclxuICAgICAgICBleHBvcnRzLndyaXRlRmxvYXRCRSA9IHdyaXRlRmxvYXRfaWVlZTc1NC5iaW5kKG51bGwsIHdyaXRlVWludEJFKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVhZEZsb2F0X2llZWU3NTQocmVhZFVpbnQsIGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIHZhciB1aW50ID0gcmVhZFVpbnQoYnVmLCBwb3MpLFxyXG4gICAgICAgICAgICAgICAgc2lnbiA9ICh1aW50ID4+IDMxKSAqIDIgKyAxLFxyXG4gICAgICAgICAgICAgICAgZXhwb25lbnQgPSB1aW50ID4+PiAyMyAmIDI1NSxcclxuICAgICAgICAgICAgICAgIG1hbnRpc3NhID0gdWludCAmIDgzODg2MDc7XHJcbiAgICAgICAgICAgIHJldHVybiBleHBvbmVudCA9PT0gMjU1XHJcbiAgICAgICAgICAgICAgICA/IG1hbnRpc3NhXHJcbiAgICAgICAgICAgICAgICA/IE5hTlxyXG4gICAgICAgICAgICAgICAgOiBzaWduICogSW5maW5pdHlcclxuICAgICAgICAgICAgICAgIDogZXhwb25lbnQgPT09IDAgLy8gZGVub3JtYWxcclxuICAgICAgICAgICAgICAgID8gc2lnbiAqIDEuNDAxMjk4NDY0MzI0ODE3ZS00NSAqIG1hbnRpc3NhXHJcbiAgICAgICAgICAgICAgICA6IHNpZ24gKiBNYXRoLnBvdygyLCBleHBvbmVudCAtIDE1MCkgKiAobWFudGlzc2EgKyA4Mzg4NjA4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV4cG9ydHMucmVhZEZsb2F0TEUgPSByZWFkRmxvYXRfaWVlZTc1NC5iaW5kKG51bGwsIHJlYWRVaW50TEUpO1xyXG4gICAgICAgIGV4cG9ydHMucmVhZEZsb2F0QkUgPSByZWFkRmxvYXRfaWVlZTc1NC5iaW5kKG51bGwsIHJlYWRVaW50QkUpO1xyXG5cclxuICAgIH0pKCk7XHJcblxyXG4gICAgLy8gZG91YmxlOiB0eXBlZCBhcnJheVxyXG4gICAgaWYgKHR5cGVvZiBGbG9hdDY0QXJyYXkgIT09IFwidW5kZWZpbmVkXCIpIChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdmFyIGY2NCA9IG5ldyBGbG9hdDY0QXJyYXkoWy0wXSksXHJcbiAgICAgICAgICAgIGY4YiA9IG5ldyBVaW50OEFycmF5KGY2NC5idWZmZXIpLFxyXG4gICAgICAgICAgICBsZSAgPSBmOGJbN10gPT09IDEyODtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gd3JpdGVEb3VibGVfZjY0X2NweSh2YWwsIGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIGY2NFswXSA9IHZhbDtcclxuICAgICAgICAgICAgYnVmW3BvcyAgICBdID0gZjhiWzBdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgMV0gPSBmOGJbMV07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAyXSA9IGY4YlsyXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDNdID0gZjhiWzNdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgNF0gPSBmOGJbNF07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyA1XSA9IGY4Yls1XTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDZdID0gZjhiWzZdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgN10gPSBmOGJbN107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB3cml0ZURvdWJsZV9mNjRfcmV2KHZhbCwgYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgZjY0WzBdID0gdmFsO1xyXG4gICAgICAgICAgICBidWZbcG9zICAgIF0gPSBmOGJbN107XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAxXSA9IGY4Yls2XTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDJdID0gZjhiWzVdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgM10gPSBmOGJbNF07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyA0XSA9IGY4YlszXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDVdID0gZjhiWzJdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgNl0gPSBmOGJbMV07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyA3XSA9IGY4YlswXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgZXhwb3J0cy53cml0ZURvdWJsZUxFID0gbGUgPyB3cml0ZURvdWJsZV9mNjRfY3B5IDogd3JpdGVEb3VibGVfZjY0X3JldjtcclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgIGV4cG9ydHMud3JpdGVEb3VibGVCRSA9IGxlID8gd3JpdGVEb3VibGVfZjY0X3JldiA6IHdyaXRlRG91YmxlX2Y2NF9jcHk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlYWREb3VibGVfZjY0X2NweShidWYsIHBvcykge1xyXG4gICAgICAgICAgICBmOGJbMF0gPSBidWZbcG9zICAgIF07XHJcbiAgICAgICAgICAgIGY4YlsxXSA9IGJ1Zltwb3MgKyAxXTtcclxuICAgICAgICAgICAgZjhiWzJdID0gYnVmW3BvcyArIDJdO1xyXG4gICAgICAgICAgICBmOGJbM10gPSBidWZbcG9zICsgM107XHJcbiAgICAgICAgICAgIGY4Yls0XSA9IGJ1Zltwb3MgKyA0XTtcclxuICAgICAgICAgICAgZjhiWzVdID0gYnVmW3BvcyArIDVdO1xyXG4gICAgICAgICAgICBmOGJbNl0gPSBidWZbcG9zICsgNl07XHJcbiAgICAgICAgICAgIGY4Yls3XSA9IGJ1Zltwb3MgKyA3XTtcclxuICAgICAgICAgICAgcmV0dXJuIGY2NFswXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlYWREb3VibGVfZjY0X3JldihidWYsIHBvcykge1xyXG4gICAgICAgICAgICBmOGJbN10gPSBidWZbcG9zICAgIF07XHJcbiAgICAgICAgICAgIGY4Yls2XSA9IGJ1Zltwb3MgKyAxXTtcclxuICAgICAgICAgICAgZjhiWzVdID0gYnVmW3BvcyArIDJdO1xyXG4gICAgICAgICAgICBmOGJbNF0gPSBidWZbcG9zICsgM107XHJcbiAgICAgICAgICAgIGY4YlszXSA9IGJ1Zltwb3MgKyA0XTtcclxuICAgICAgICAgICAgZjhiWzJdID0gYnVmW3BvcyArIDVdO1xyXG4gICAgICAgICAgICBmOGJbMV0gPSBidWZbcG9zICsgNl07XHJcbiAgICAgICAgICAgIGY4YlswXSA9IGJ1Zltwb3MgKyA3XTtcclxuICAgICAgICAgICAgcmV0dXJuIGY2NFswXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgZXhwb3J0cy5yZWFkRG91YmxlTEUgPSBsZSA/IHJlYWREb3VibGVfZjY0X2NweSA6IHJlYWREb3VibGVfZjY0X3JldjtcclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgIGV4cG9ydHMucmVhZERvdWJsZUJFID0gbGUgPyByZWFkRG91YmxlX2Y2NF9yZXYgOiByZWFkRG91YmxlX2Y2NF9jcHk7XHJcblxyXG4gICAgLy8gZG91YmxlOiBpZWVlNzU0XHJcbiAgICB9KSgpOyBlbHNlIChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gd3JpdGVEb3VibGVfaWVlZTc1NCh3cml0ZVVpbnQsIG9mZjAsIG9mZjEsIHZhbCwgYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgdmFyIHNpZ24gPSB2YWwgPCAwID8gMSA6IDA7XHJcbiAgICAgICAgICAgIGlmIChzaWduKVxyXG4gICAgICAgICAgICAgICAgdmFsID0gLXZhbDtcclxuICAgICAgICAgICAgaWYgKHZhbCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KDAsIGJ1ZiwgcG9zICsgb2ZmMCk7XHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoMSAvIHZhbCA+IDAgPyAvKiBwb3NpdGl2ZSAqLyAwIDogLyogbmVnYXRpdmUgMCAqLyAyMTQ3NDgzNjQ4LCBidWYsIHBvcyArIG9mZjEpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzTmFOKHZhbCkpIHtcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgwLCBidWYsIHBvcyArIG9mZjApO1xyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KDIxNDY5NTkzNjAsIGJ1ZiwgcG9zICsgb2ZmMSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsID4gMS43OTc2OTMxMzQ4NjIzMTU3ZSszMDgpIHsgLy8gKy1JbmZpbml0eVxyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KDAsIGJ1ZiwgcG9zICsgb2ZmMCk7XHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoKHNpZ24gPDwgMzEgfCAyMTQ2NDM1MDcyKSA+Pj4gMCwgYnVmLCBwb3MgKyBvZmYxKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBtYW50aXNzYTtcclxuICAgICAgICAgICAgICAgIGlmICh2YWwgPCAyLjIyNTA3Mzg1ODUwNzIwMTRlLTMwOCkgeyAvLyBkZW5vcm1hbFxyXG4gICAgICAgICAgICAgICAgICAgIG1hbnRpc3NhID0gdmFsIC8gNWUtMzI0O1xyXG4gICAgICAgICAgICAgICAgICAgIHdyaXRlVWludChtYW50aXNzYSA+Pj4gMCwgYnVmLCBwb3MgKyBvZmYwKTtcclxuICAgICAgICAgICAgICAgICAgICB3cml0ZVVpbnQoKHNpZ24gPDwgMzEgfCBtYW50aXNzYSAvIDQyOTQ5NjcyOTYpID4+PiAwLCBidWYsIHBvcyArIG9mZjEpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXhwb25lbnQgPSBNYXRoLmZsb29yKE1hdGgubG9nKHZhbCkgLyBNYXRoLkxOMik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4cG9uZW50ID09PSAxMDI0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBleHBvbmVudCA9IDEwMjM7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFudGlzc2EgPSB2YWwgKiBNYXRoLnBvdygyLCAtZXhwb25lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdyaXRlVWludChtYW50aXNzYSAqIDQ1MDM1OTk2MjczNzA0OTYgPj4+IDAsIGJ1ZiwgcG9zICsgb2ZmMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgd3JpdGVVaW50KChzaWduIDw8IDMxIHwgZXhwb25lbnQgKyAxMDIzIDw8IDIwIHwgbWFudGlzc2EgKiAxMDQ4NTc2ICYgMTA0ODU3NSkgPj4+IDAsIGJ1ZiwgcG9zICsgb2ZmMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV4cG9ydHMud3JpdGVEb3VibGVMRSA9IHdyaXRlRG91YmxlX2llZWU3NTQuYmluZChudWxsLCB3cml0ZVVpbnRMRSwgMCwgNCk7XHJcbiAgICAgICAgZXhwb3J0cy53cml0ZURvdWJsZUJFID0gd3JpdGVEb3VibGVfaWVlZTc1NC5iaW5kKG51bGwsIHdyaXRlVWludEJFLCA0LCAwKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVhZERvdWJsZV9pZWVlNzU0KHJlYWRVaW50LCBvZmYwLCBvZmYxLCBidWYsIHBvcykge1xyXG4gICAgICAgICAgICB2YXIgbG8gPSByZWFkVWludChidWYsIHBvcyArIG9mZjApLFxyXG4gICAgICAgICAgICAgICAgaGkgPSByZWFkVWludChidWYsIHBvcyArIG9mZjEpO1xyXG4gICAgICAgICAgICB2YXIgc2lnbiA9IChoaSA+PiAzMSkgKiAyICsgMSxcclxuICAgICAgICAgICAgICAgIGV4cG9uZW50ID0gaGkgPj4+IDIwICYgMjA0NyxcclxuICAgICAgICAgICAgICAgIG1hbnRpc3NhID0gNDI5NDk2NzI5NiAqIChoaSAmIDEwNDg1NzUpICsgbG87XHJcbiAgICAgICAgICAgIHJldHVybiBleHBvbmVudCA9PT0gMjA0N1xyXG4gICAgICAgICAgICAgICAgPyBtYW50aXNzYVxyXG4gICAgICAgICAgICAgICAgPyBOYU5cclxuICAgICAgICAgICAgICAgIDogc2lnbiAqIEluZmluaXR5XHJcbiAgICAgICAgICAgICAgICA6IGV4cG9uZW50ID09PSAwIC8vIGRlbm9ybWFsXHJcbiAgICAgICAgICAgICAgICA/IHNpZ24gKiA1ZS0zMjQgKiBtYW50aXNzYVxyXG4gICAgICAgICAgICAgICAgOiBzaWduICogTWF0aC5wb3coMiwgZXhwb25lbnQgLSAxMDc1KSAqIChtYW50aXNzYSArIDQ1MDM1OTk2MjczNzA0OTYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXhwb3J0cy5yZWFkRG91YmxlTEUgPSByZWFkRG91YmxlX2llZWU3NTQuYmluZChudWxsLCByZWFkVWludExFLCAwLCA0KTtcclxuICAgICAgICBleHBvcnRzLnJlYWREb3VibGVCRSA9IHJlYWREb3VibGVfaWVlZTc1NC5iaW5kKG51bGwsIHJlYWRVaW50QkUsIDQsIDApO1xyXG5cclxuICAgIH0pKCk7XHJcblxyXG4gICAgcmV0dXJuIGV4cG9ydHM7XHJcbn1cclxuXHJcbi8vIHVpbnQgaGVscGVyc1xyXG5cclxuZnVuY3Rpb24gd3JpdGVVaW50TEUodmFsLCBidWYsIHBvcykge1xyXG4gICAgYnVmW3BvcyAgICBdID0gIHZhbCAgICAgICAgJiAyNTU7XHJcbiAgICBidWZbcG9zICsgMV0gPSAgdmFsID4+PiA4ICAmIDI1NTtcclxuICAgIGJ1Zltwb3MgKyAyXSA9ICB2YWwgPj4+IDE2ICYgMjU1O1xyXG4gICAgYnVmW3BvcyArIDNdID0gIHZhbCA+Pj4gMjQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdyaXRlVWludEJFKHZhbCwgYnVmLCBwb3MpIHtcclxuICAgIGJ1Zltwb3MgICAgXSA9ICB2YWwgPj4+IDI0O1xyXG4gICAgYnVmW3BvcyArIDFdID0gIHZhbCA+Pj4gMTYgJiAyNTU7XHJcbiAgICBidWZbcG9zICsgMl0gPSAgdmFsID4+PiA4ICAmIDI1NTtcclxuICAgIGJ1Zltwb3MgKyAzXSA9ICB2YWwgICAgICAgICYgMjU1O1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWFkVWludExFKGJ1ZiwgcG9zKSB7XHJcbiAgICByZXR1cm4gKGJ1Zltwb3MgICAgXVxyXG4gICAgICAgICAgfCBidWZbcG9zICsgMV0gPDwgOFxyXG4gICAgICAgICAgfCBidWZbcG9zICsgMl0gPDwgMTZcclxuICAgICAgICAgIHwgYnVmW3BvcyArIDNdIDw8IDI0KSA+Pj4gMDtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVhZFVpbnRCRShidWYsIHBvcykge1xyXG4gICAgcmV0dXJuIChidWZbcG9zICAgIF0gPDwgMjRcclxuICAgICAgICAgIHwgYnVmW3BvcyArIDFdIDw8IDE2XHJcbiAgICAgICAgICB8IGJ1Zltwb3MgKyAyXSA8PCA4XHJcbiAgICAgICAgICB8IGJ1Zltwb3MgKyAzXSkgPj4+IDA7XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbm1vZHVsZS5leHBvcnRzID0gaW5xdWlyZTtcclxuXHJcbi8qKlxyXG4gKiBSZXF1aXJlcyBhIG1vZHVsZSBvbmx5IGlmIGF2YWlsYWJsZS5cclxuICogQG1lbWJlcm9mIHV0aWxcclxuICogQHBhcmFtIHtzdHJpbmd9IG1vZHVsZU5hbWUgTW9kdWxlIHRvIHJlcXVpcmVcclxuICogQHJldHVybnMgez9PYmplY3R9IFJlcXVpcmVkIG1vZHVsZSBpZiBhdmFpbGFibGUgYW5kIG5vdCBlbXB0eSwgb3RoZXJ3aXNlIGBudWxsYFxyXG4gKi9cclxuZnVuY3Rpb24gaW5xdWlyZShtb2R1bGVOYW1lKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHZhciBtb2QgPSBldmFsKFwicXVpcmVcIi5yZXBsYWNlKC9eLyxcInJlXCIpKShtb2R1bGVOYW1lKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1ldmFsXHJcbiAgICAgICAgaWYgKG1vZCAmJiAobW9kLmxlbmd0aCB8fCBPYmplY3Qua2V5cyhtb2QpLmxlbmd0aCkpXHJcbiAgICAgICAgICAgIHJldHVybiBtb2Q7XHJcbiAgICB9IGNhdGNoIChlKSB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWVtcHR5XHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPSBwb29sO1xyXG5cclxuLyoqXHJcbiAqIEFuIGFsbG9jYXRvciBhcyB1c2VkIGJ5IHtAbGluayB1dGlsLnBvb2x9LlxyXG4gKiBAdHlwZWRlZiBQb29sQWxsb2NhdG9yXHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICogQHBhcmFtIHtudW1iZXJ9IHNpemUgQnVmZmVyIHNpemVcclxuICogQHJldHVybnMge1VpbnQ4QXJyYXl9IEJ1ZmZlclxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBBIHNsaWNlciBhcyB1c2VkIGJ5IHtAbGluayB1dGlsLnBvb2x9LlxyXG4gKiBAdHlwZWRlZiBQb29sU2xpY2VyXHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IFN0YXJ0IG9mZnNldFxyXG4gKiBAcGFyYW0ge251bWJlcn0gZW5kIEVuZCBvZmZzZXRcclxuICogQHJldHVybnMge1VpbnQ4QXJyYXl9IEJ1ZmZlciBzbGljZVxyXG4gKiBAdGhpcyB7VWludDhBcnJheX1cclxuICovXHJcblxyXG4vKipcclxuICogQSBnZW5lcmFsIHB1cnBvc2UgYnVmZmVyIHBvb2wuXHJcbiAqIEBtZW1iZXJvZiB1dGlsXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge1Bvb2xBbGxvY2F0b3J9IGFsbG9jIEFsbG9jYXRvclxyXG4gKiBAcGFyYW0ge1Bvb2xTbGljZXJ9IHNsaWNlIFNsaWNlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gW3NpemU9ODE5Ml0gU2xhYiBzaXplXHJcbiAqIEByZXR1cm5zIHtQb29sQWxsb2NhdG9yfSBQb29sZWQgYWxsb2NhdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBwb29sKGFsbG9jLCBzbGljZSwgc2l6ZSkge1xyXG4gICAgdmFyIFNJWkUgICA9IHNpemUgfHwgODE5MjtcclxuICAgIHZhciBNQVggICAgPSBTSVpFID4+PiAxO1xyXG4gICAgdmFyIHNsYWIgICA9IG51bGw7XHJcbiAgICB2YXIgb2Zmc2V0ID0gU0laRTtcclxuICAgIHJldHVybiBmdW5jdGlvbiBwb29sX2FsbG9jKHNpemUpIHtcclxuICAgICAgICBpZiAoc2l6ZSA8IDEgfHwgc2l6ZSA+IE1BWClcclxuICAgICAgICAgICAgcmV0dXJuIGFsbG9jKHNpemUpO1xyXG4gICAgICAgIGlmIChvZmZzZXQgKyBzaXplID4gU0laRSkge1xyXG4gICAgICAgICAgICBzbGFiID0gYWxsb2MoU0laRSk7XHJcbiAgICAgICAgICAgIG9mZnNldCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBidWYgPSBzbGljZS5jYWxsKHNsYWIsIG9mZnNldCwgb2Zmc2V0ICs9IHNpemUpO1xyXG4gICAgICAgIGlmIChvZmZzZXQgJiA3KSAvLyBhbGlnbiB0byAzMiBiaXRcclxuICAgICAgICAgICAgb2Zmc2V0ID0gKG9mZnNldCB8IDcpICsgMTtcclxuICAgICAgICByZXR1cm4gYnVmO1xyXG4gICAgfTtcclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbi8qKlxyXG4gKiBBIG1pbmltYWwgVVRGOCBpbXBsZW1lbnRhdGlvbiBmb3IgbnVtYmVyIGFycmF5cy5cclxuICogQG1lbWJlcm9mIHV0aWxcclxuICogQG5hbWVzcGFjZVxyXG4gKi9cclxudmFyIHV0ZjggPSBleHBvcnRzO1xyXG5cclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIFVURjggYnl0ZSBsZW5ndGggb2YgYSBzdHJpbmcuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgU3RyaW5nXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IEJ5dGUgbGVuZ3RoXHJcbiAqL1xyXG51dGY4Lmxlbmd0aCA9IGZ1bmN0aW9uIHV0ZjhfbGVuZ3RoKHN0cmluZykge1xyXG4gICAgdmFyIGxlbiA9IDAsXHJcbiAgICAgICAgYyA9IDA7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cmluZy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIGMgPSBzdHJpbmcuY2hhckNvZGVBdChpKTtcclxuICAgICAgICBpZiAoYyA8IDEyOClcclxuICAgICAgICAgICAgbGVuICs9IDE7XHJcbiAgICAgICAgZWxzZSBpZiAoYyA8IDIwNDgpXHJcbiAgICAgICAgICAgIGxlbiArPSAyO1xyXG4gICAgICAgIGVsc2UgaWYgKChjICYgMHhGQzAwKSA9PT0gMHhEODAwICYmIChzdHJpbmcuY2hhckNvZGVBdChpICsgMSkgJiAweEZDMDApID09PSAweERDMDApIHtcclxuICAgICAgICAgICAgKytpO1xyXG4gICAgICAgICAgICBsZW4gKz0gNDtcclxuICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgbGVuICs9IDM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGVuO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlYWRzIFVURjggYnl0ZXMgYXMgYSBzdHJpbmcuXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmZmVyIFNvdXJjZSBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IFNvdXJjZSBzdGFydFxyXG4gKiBAcGFyYW0ge251bWJlcn0gZW5kIFNvdXJjZSBlbmRcclxuICogQHJldHVybnMge3N0cmluZ30gU3RyaW5nIHJlYWRcclxuICovXHJcbnV0ZjgucmVhZCA9IGZ1bmN0aW9uIHV0ZjhfcmVhZChidWZmZXIsIHN0YXJ0LCBlbmQpIHtcclxuICAgIHZhciBsZW4gPSBlbmQgLSBzdGFydDtcclxuICAgIGlmIChsZW4gPCAxKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgdmFyIHBhcnRzID0gbnVsbCxcclxuICAgICAgICBjaHVuayA9IFtdLFxyXG4gICAgICAgIGkgPSAwLCAvLyBjaGFyIG9mZnNldFxyXG4gICAgICAgIHQ7ICAgICAvLyB0ZW1wb3JhcnlcclxuICAgIHdoaWxlIChzdGFydCA8IGVuZCkge1xyXG4gICAgICAgIHQgPSBidWZmZXJbc3RhcnQrK107XHJcbiAgICAgICAgaWYgKHQgPCAxMjgpXHJcbiAgICAgICAgICAgIGNodW5rW2krK10gPSB0O1xyXG4gICAgICAgIGVsc2UgaWYgKHQgPiAxOTEgJiYgdCA8IDIyNClcclxuICAgICAgICAgICAgY2h1bmtbaSsrXSA9ICh0ICYgMzEpIDw8IDYgfCBidWZmZXJbc3RhcnQrK10gJiA2MztcclxuICAgICAgICBlbHNlIGlmICh0ID4gMjM5ICYmIHQgPCAzNjUpIHtcclxuICAgICAgICAgICAgdCA9ICgodCAmIDcpIDw8IDE4IHwgKGJ1ZmZlcltzdGFydCsrXSAmIDYzKSA8PCAxMiB8IChidWZmZXJbc3RhcnQrK10gJiA2MykgPDwgNiB8IGJ1ZmZlcltzdGFydCsrXSAmIDYzKSAtIDB4MTAwMDA7XHJcbiAgICAgICAgICAgIGNodW5rW2krK10gPSAweEQ4MDAgKyAodCA+PiAxMCk7XHJcbiAgICAgICAgICAgIGNodW5rW2krK10gPSAweERDMDAgKyAodCAmIDEwMjMpO1xyXG4gICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICBjaHVua1tpKytdID0gKHQgJiAxNSkgPDwgMTIgfCAoYnVmZmVyW3N0YXJ0KytdICYgNjMpIDw8IDYgfCBidWZmZXJbc3RhcnQrK10gJiA2MztcclxuICAgICAgICBpZiAoaSA+IDgxOTEpIHtcclxuICAgICAgICAgICAgKHBhcnRzIHx8IChwYXJ0cyA9IFtdKSkucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY2h1bmspKTtcclxuICAgICAgICAgICAgaSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHBhcnRzKSB7XHJcbiAgICAgICAgaWYgKGkpXHJcbiAgICAgICAgICAgIHBhcnRzLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNodW5rLnNsaWNlKDAsIGkpKSk7XHJcbiAgICAgICAgcmV0dXJuIHBhcnRzLmpvaW4oXCJcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNodW5rLnNsaWNlKDAsIGkpKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXcml0ZXMgYSBzdHJpbmcgYXMgVVRGOCBieXRlcy5cclxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBTb3VyY2Ugc3RyaW5nXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmZmVyIERlc3RpbmF0aW9uIGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IERlc3RpbmF0aW9uIG9mZnNldFxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBCeXRlcyB3cml0dGVuXHJcbiAqL1xyXG51dGY4LndyaXRlID0gZnVuY3Rpb24gdXRmOF93cml0ZShzdHJpbmcsIGJ1ZmZlciwgb2Zmc2V0KSB7XHJcbiAgICB2YXIgc3RhcnQgPSBvZmZzZXQsXHJcbiAgICAgICAgYzEsIC8vIGNoYXJhY3RlciAxXHJcbiAgICAgICAgYzI7IC8vIGNoYXJhY3RlciAyXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cmluZy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIGMxID0gc3RyaW5nLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgICAgaWYgKGMxIDwgMTI4KSB7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSBjMTtcclxuICAgICAgICB9IGVsc2UgaWYgKGMxIDwgMjA0OCkge1xyXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gYzEgPj4gNiAgICAgICB8IDE5MjtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxICAgICAgICYgNjMgfCAxMjg7XHJcbiAgICAgICAgfSBlbHNlIGlmICgoYzEgJiAweEZDMDApID09PSAweEQ4MDAgJiYgKChjMiA9IHN0cmluZy5jaGFyQ29kZUF0KGkgKyAxKSkgJiAweEZDMDApID09PSAweERDMDApIHtcclxuICAgICAgICAgICAgYzEgPSAweDEwMDAwICsgKChjMSAmIDB4MDNGRikgPDwgMTApICsgKGMyICYgMHgwM0ZGKTtcclxuICAgICAgICAgICAgKytpO1xyXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gYzEgPj4gMTggICAgICB8IDI0MDtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxID4+IDEyICYgNjMgfCAxMjg7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSBjMSA+PiA2ICAmIDYzIHwgMTI4O1xyXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gYzEgICAgICAgJiA2MyB8IDEyODtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gYzEgPj4gMTIgICAgICB8IDIyNDtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxID4+IDYgICYgNjMgfCAxMjg7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSBjMSAgICAgICAmIDYzIHwgMTI4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBvZmZzZXQgLSBzdGFydDtcclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBMb25nO1xyXG5cclxuLyoqXHJcbiAqIHdhc20gb3B0aW1pemF0aW9ucywgdG8gZG8gbmF0aXZlIGk2NCBtdWx0aXBsaWNhdGlvbiBhbmQgZGl2aWRlXHJcbiAqL1xyXG52YXIgd2FzbSA9IG51bGw7XHJcblxyXG50cnkge1xyXG4gIHdhc20gPSBuZXcgV2ViQXNzZW1ibHkuSW5zdGFuY2UobmV3IFdlYkFzc2VtYmx5Lk1vZHVsZShuZXcgVWludDhBcnJheShbXHJcbiAgICAwLCA5NywgMTE1LCAxMDksIDEsIDAsIDAsIDAsIDEsIDEzLCAyLCA5NiwgMCwgMSwgMTI3LCA5NiwgNCwgMTI3LCAxMjcsIDEyNywgMTI3LCAxLCAxMjcsIDMsIDcsIDYsIDAsIDEsIDEsIDEsIDEsIDEsIDYsIDYsIDEsIDEyNywgMSwgNjUsIDAsIDExLCA3LCA1MCwgNiwgMywgMTA5LCAxMTcsIDEwOCwgMCwgMSwgNSwgMTAwLCAxMDUsIDExOCwgOTUsIDExNSwgMCwgMiwgNSwgMTAwLCAxMDUsIDExOCwgOTUsIDExNywgMCwgMywgNSwgMTE0LCAxMDEsIDEwOSwgOTUsIDExNSwgMCwgNCwgNSwgMTE0LCAxMDEsIDEwOSwgOTUsIDExNywgMCwgNSwgOCwgMTAzLCAxMDEsIDExNiwgOTUsIDEwNCwgMTA1LCAxMDMsIDEwNCwgMCwgMCwgMTAsIDE5MSwgMSwgNiwgNCwgMCwgMzUsIDAsIDExLCAzNiwgMSwgMSwgMTI2LCAzMiwgMCwgMTczLCAzMiwgMSwgMTczLCA2NiwgMzIsIDEzNCwgMTMyLCAzMiwgMiwgMTczLCAzMiwgMywgMTczLCA2NiwgMzIsIDEzNCwgMTMyLCAxMjYsIDM0LCA0LCA2NiwgMzIsIDEzNSwgMTY3LCAzNiwgMCwgMzIsIDQsIDE2NywgMTEsIDM2LCAxLCAxLCAxMjYsIDMyLCAwLCAxNzMsIDMyLCAxLCAxNzMsIDY2LCAzMiwgMTM0LCAxMzIsIDMyLCAyLCAxNzMsIDMyLCAzLCAxNzMsIDY2LCAzMiwgMTM0LCAxMzIsIDEyNywgMzQsIDQsIDY2LCAzMiwgMTM1LCAxNjcsIDM2LCAwLCAzMiwgNCwgMTY3LCAxMSwgMzYsIDEsIDEsIDEyNiwgMzIsIDAsIDE3MywgMzIsIDEsIDE3MywgNjYsIDMyLCAxMzQsIDEzMiwgMzIsIDIsIDE3MywgMzIsIDMsIDE3MywgNjYsIDMyLCAxMzQsIDEzMiwgMTI4LCAzNCwgNCwgNjYsIDMyLCAxMzUsIDE2NywgMzYsIDAsIDMyLCA0LCAxNjcsIDExLCAzNiwgMSwgMSwgMTI2LCAzMiwgMCwgMTczLCAzMiwgMSwgMTczLCA2NiwgMzIsIDEzNCwgMTMyLCAzMiwgMiwgMTczLCAzMiwgMywgMTczLCA2NiwgMzIsIDEzNCwgMTMyLCAxMjksIDM0LCA0LCA2NiwgMzIsIDEzNSwgMTY3LCAzNiwgMCwgMzIsIDQsIDE2NywgMTEsIDM2LCAxLCAxLCAxMjYsIDMyLCAwLCAxNzMsIDMyLCAxLCAxNzMsIDY2LCAzMiwgMTM0LCAxMzIsIDMyLCAyLCAxNzMsIDMyLCAzLCAxNzMsIDY2LCAzMiwgMTM0LCAxMzIsIDEzMCwgMzQsIDQsIDY2LCAzMiwgMTM1LCAxNjcsIDM2LCAwLCAzMiwgNCwgMTY3LCAxMVxyXG4gIF0pKSwge30pLmV4cG9ydHM7XHJcbn0gY2F0Y2ggKGUpIHtcclxuICAvLyBubyB3YXNtIHN1cHBvcnQgOihcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnN0cnVjdHMgYSA2NCBiaXQgdHdvJ3MtY29tcGxlbWVudCBpbnRlZ2VyLCBnaXZlbiBpdHMgbG93IGFuZCBoaWdoIDMyIGJpdCB2YWx1ZXMgYXMgKnNpZ25lZCogaW50ZWdlcnMuXHJcbiAqICBTZWUgdGhlIGZyb20qIGZ1bmN0aW9ucyBiZWxvdyBmb3IgbW9yZSBjb252ZW5pZW50IHdheXMgb2YgY29uc3RydWN0aW5nIExvbmdzLlxyXG4gKiBAZXhwb3J0cyBMb25nXHJcbiAqIEBjbGFzcyBBIExvbmcgY2xhc3MgZm9yIHJlcHJlc2VudGluZyBhIDY0IGJpdCB0d28ncy1jb21wbGVtZW50IGludGVnZXIgdmFsdWUuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBsb3cgVGhlIGxvdyAoc2lnbmVkKSAzMiBiaXRzIG9mIHRoZSBsb25nXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBoaWdoIFRoZSBoaWdoIChzaWduZWQpIDMyIGJpdHMgb2YgdGhlIGxvbmdcclxuICogQHBhcmFtIHtib29sZWFuPX0gdW5zaWduZWQgV2hldGhlciB1bnNpZ25lZCBvciBub3QsIGRlZmF1bHRzIHRvIHNpZ25lZFxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIExvbmcobG93LCBoaWdoLCB1bnNpZ25lZCkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGxvdyAzMiBiaXRzIGFzIGEgc2lnbmVkIHZhbHVlLlxyXG4gICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5sb3cgPSBsb3cgfCAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGhpZ2ggMzIgYml0cyBhcyBhIHNpZ25lZCB2YWx1ZS5cclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuaGlnaCA9IGhpZ2ggfCAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2hldGhlciB1bnNpZ25lZCBvciBub3QuXHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgdGhpcy51bnNpZ25lZCA9ICEhdW5zaWduZWQ7XHJcbn1cclxuXHJcbi8vIFRoZSBpbnRlcm5hbCByZXByZXNlbnRhdGlvbiBvZiBhIGxvbmcgaXMgdGhlIHR3byBnaXZlbiBzaWduZWQsIDMyLWJpdCB2YWx1ZXMuXHJcbi8vIFdlIHVzZSAzMi1iaXQgcGllY2VzIGJlY2F1c2UgdGhlc2UgYXJlIHRoZSBzaXplIG9mIGludGVnZXJzIG9uIHdoaWNoXHJcbi8vIEphdmFzY3JpcHQgcGVyZm9ybXMgYml0LW9wZXJhdGlvbnMuICBGb3Igb3BlcmF0aW9ucyBsaWtlIGFkZGl0aW9uIGFuZFxyXG4vLyBtdWx0aXBsaWNhdGlvbiwgd2Ugc3BsaXQgZWFjaCBudW1iZXIgaW50byAxNiBiaXQgcGllY2VzLCB3aGljaCBjYW4gZWFzaWx5IGJlXHJcbi8vIG11bHRpcGxpZWQgd2l0aGluIEphdmFzY3JpcHQncyBmbG9hdGluZy1wb2ludCByZXByZXNlbnRhdGlvbiB3aXRob3V0IG92ZXJmbG93XHJcbi8vIG9yIGNoYW5nZSBpbiBzaWduLlxyXG4vL1xyXG4vLyBJbiB0aGUgYWxnb3JpdGhtcyBiZWxvdywgd2UgZnJlcXVlbnRseSByZWR1Y2UgdGhlIG5lZ2F0aXZlIGNhc2UgdG8gdGhlXHJcbi8vIHBvc2l0aXZlIGNhc2UgYnkgbmVnYXRpbmcgdGhlIGlucHV0KHMpIGFuZCB0aGVuIHBvc3QtcHJvY2Vzc2luZyB0aGUgcmVzdWx0LlxyXG4vLyBOb3RlIHRoYXQgd2UgbXVzdCBBTFdBWVMgY2hlY2sgc3BlY2lhbGx5IHdoZXRoZXIgdGhvc2UgdmFsdWVzIGFyZSBNSU5fVkFMVUVcclxuLy8gKC0yXjYzKSBiZWNhdXNlIC1NSU5fVkFMVUUgPT0gTUlOX1ZBTFVFIChzaW5jZSAyXjYzIGNhbm5vdCBiZSByZXByZXNlbnRlZCBhc1xyXG4vLyBhIHBvc2l0aXZlIG51bWJlciwgaXQgb3ZlcmZsb3dzIGJhY2sgaW50byBhIG5lZ2F0aXZlKS4gIE5vdCBoYW5kbGluZyB0aGlzXHJcbi8vIGNhc2Ugd291bGQgb2Z0ZW4gcmVzdWx0IGluIGluZmluaXRlIHJlY3Vyc2lvbi5cclxuLy9cclxuLy8gQ29tbW9uIGNvbnN0YW50IHZhbHVlcyBaRVJPLCBPTkUsIE5FR19PTkUsIGV0Yy4gYXJlIGRlZmluZWQgYmVsb3cgdGhlIGZyb20qXHJcbi8vIG1ldGhvZHMgb24gd2hpY2ggdGhleSBkZXBlbmQuXHJcblxyXG4vKipcclxuICogQW4gaW5kaWNhdG9yIHVzZWQgdG8gcmVsaWFibHkgZGV0ZXJtaW5lIGlmIGFuIG9iamVjdCBpcyBhIExvbmcgb3Igbm90LlxyXG4gKiBAdHlwZSB7Ym9vbGVhbn1cclxuICogQGNvbnN0XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5Mb25nLnByb3RvdHlwZS5fX2lzTG9uZ19fO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KExvbmcucHJvdG90eXBlLCBcIl9faXNMb25nX19cIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuXHJcbi8qKlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHsqfSBvYmogT2JqZWN0XHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKiBAaW5uZXJcclxuICovXHJcbmZ1bmN0aW9uIGlzTG9uZyhvYmopIHtcclxuICAgIHJldHVybiAob2JqICYmIG9ialtcIl9faXNMb25nX19cIl0pID09PSB0cnVlO1xyXG59XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhlIHNwZWNpZmllZCBvYmplY3QgaXMgYSBMb25nLlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHsqfSBvYmogT2JqZWN0XHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuTG9uZy5pc0xvbmcgPSBpc0xvbmc7XHJcblxyXG4vKipcclxuICogQSBjYWNoZSBvZiB0aGUgTG9uZyByZXByZXNlbnRhdGlvbnMgb2Ygc21hbGwgaW50ZWdlciB2YWx1ZXMuXHJcbiAqIEB0eXBlIHshT2JqZWN0fVxyXG4gKiBAaW5uZXJcclxuICovXHJcbnZhciBJTlRfQ0FDSEUgPSB7fTtcclxuXHJcbi8qKlxyXG4gKiBBIGNhY2hlIG9mIHRoZSBMb25nIHJlcHJlc2VudGF0aW9ucyBvZiBzbWFsbCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy5cclxuICogQHR5cGUgeyFPYmplY3R9XHJcbiAqIEBpbm5lclxyXG4gKi9cclxudmFyIFVJTlRfQ0FDSEUgPSB7fTtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWVcclxuICogQHBhcmFtIHtib29sZWFuPX0gdW5zaWduZWRcclxuICogQHJldHVybnMgeyFMb25nfVxyXG4gKiBAaW5uZXJcclxuICovXHJcbmZ1bmN0aW9uIGZyb21JbnQodmFsdWUsIHVuc2lnbmVkKSB7XHJcbiAgICB2YXIgb2JqLCBjYWNoZWRPYmosIGNhY2hlO1xyXG4gICAgaWYgKHVuc2lnbmVkKSB7XHJcbiAgICAgICAgdmFsdWUgPj4+PSAwO1xyXG4gICAgICAgIGlmIChjYWNoZSA9ICgwIDw9IHZhbHVlICYmIHZhbHVlIDwgMjU2KSkge1xyXG4gICAgICAgICAgICBjYWNoZWRPYmogPSBVSU5UX0NBQ0hFW3ZhbHVlXTtcclxuICAgICAgICAgICAgaWYgKGNhY2hlZE9iailcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZWRPYmo7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9iaiA9IGZyb21CaXRzKHZhbHVlLCAodmFsdWUgfCAwKSA8IDAgPyAtMSA6IDAsIHRydWUpO1xyXG4gICAgICAgIGlmIChjYWNoZSlcclxuICAgICAgICAgICAgVUlOVF9DQUNIRVt2YWx1ZV0gPSBvYmo7XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFsdWUgfD0gMDtcclxuICAgICAgICBpZiAoY2FjaGUgPSAoLTEyOCA8PSB2YWx1ZSAmJiB2YWx1ZSA8IDEyOCkpIHtcclxuICAgICAgICAgICAgY2FjaGVkT2JqID0gSU5UX0NBQ0hFW3ZhbHVlXTtcclxuICAgICAgICAgICAgaWYgKGNhY2hlZE9iailcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZWRPYmo7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9iaiA9IGZyb21CaXRzKHZhbHVlLCB2YWx1ZSA8IDAgPyAtMSA6IDAsIGZhbHNlKTtcclxuICAgICAgICBpZiAoY2FjaGUpXHJcbiAgICAgICAgICAgIElOVF9DQUNIRVt2YWx1ZV0gPSBvYmo7XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYSBMb25nIHJlcHJlc2VudGluZyB0aGUgZ2l2ZW4gMzIgYml0IGludGVnZXIgdmFsdWUuXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVGhlIDMyIGJpdCBpbnRlZ2VyIGluIHF1ZXN0aW9uXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IHVuc2lnbmVkIFdoZXRoZXIgdW5zaWduZWQgb3Igbm90LCBkZWZhdWx0cyB0byBzaWduZWRcclxuICogQHJldHVybnMgeyFMb25nfSBUaGUgY29ycmVzcG9uZGluZyBMb25nIHZhbHVlXHJcbiAqL1xyXG5Mb25nLmZyb21JbnQgPSBmcm9tSW50O1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZVxyXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSB1bnNpZ25lZFxyXG4gKiBAcmV0dXJucyB7IUxvbmd9XHJcbiAqIEBpbm5lclxyXG4gKi9cclxuZnVuY3Rpb24gZnJvbU51bWJlcih2YWx1ZSwgdW5zaWduZWQpIHtcclxuICAgIGlmIChpc05hTih2YWx1ZSkpXHJcbiAgICAgICAgcmV0dXJuIHVuc2lnbmVkID8gVVpFUk8gOiBaRVJPO1xyXG4gICAgaWYgKHVuc2lnbmVkKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlIDwgMClcclxuICAgICAgICAgICAgcmV0dXJuIFVaRVJPO1xyXG4gICAgICAgIGlmICh2YWx1ZSA+PSBUV09fUFdSXzY0X0RCTClcclxuICAgICAgICAgICAgcmV0dXJuIE1BWF9VTlNJR05FRF9WQUxVRTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHZhbHVlIDw9IC1UV09fUFdSXzYzX0RCTClcclxuICAgICAgICAgICAgcmV0dXJuIE1JTl9WQUxVRTtcclxuICAgICAgICBpZiAodmFsdWUgKyAxID49IFRXT19QV1JfNjNfREJMKVxyXG4gICAgICAgICAgICByZXR1cm4gTUFYX1ZBTFVFO1xyXG4gICAgfVxyXG4gICAgaWYgKHZhbHVlIDwgMClcclxuICAgICAgICByZXR1cm4gZnJvbU51bWJlcigtdmFsdWUsIHVuc2lnbmVkKS5uZWcoKTtcclxuICAgIHJldHVybiBmcm9tQml0cygodmFsdWUgJSBUV09fUFdSXzMyX0RCTCkgfCAwLCAodmFsdWUgLyBUV09fUFdSXzMyX0RCTCkgfCAwLCB1bnNpZ25lZCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGEgTG9uZyByZXByZXNlbnRpbmcgdGhlIGdpdmVuIHZhbHVlLCBwcm92aWRlZCB0aGF0IGl0IGlzIGEgZmluaXRlIG51bWJlci4gT3RoZXJ3aXNlLCB6ZXJvIGlzIHJldHVybmVkLlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFRoZSBudW1iZXIgaW4gcXVlc3Rpb25cclxuICogQHBhcmFtIHtib29sZWFuPX0gdW5zaWduZWQgV2hldGhlciB1bnNpZ25lZCBvciBub3QsIGRlZmF1bHRzIHRvIHNpZ25lZFxyXG4gKiBAcmV0dXJucyB7IUxvbmd9IFRoZSBjb3JyZXNwb25kaW5nIExvbmcgdmFsdWVcclxuICovXHJcbkxvbmcuZnJvbU51bWJlciA9IGZyb21OdW1iZXI7XHJcblxyXG4vKipcclxuICogQHBhcmFtIHtudW1iZXJ9IGxvd0JpdHNcclxuICogQHBhcmFtIHtudW1iZXJ9IGhpZ2hCaXRzXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IHVuc2lnbmVkXHJcbiAqIEByZXR1cm5zIHshTG9uZ31cclxuICogQGlubmVyXHJcbiAqL1xyXG5mdW5jdGlvbiBmcm9tQml0cyhsb3dCaXRzLCBoaWdoQml0cywgdW5zaWduZWQpIHtcclxuICAgIHJldHVybiBuZXcgTG9uZyhsb3dCaXRzLCBoaWdoQml0cywgdW5zaWduZWQpO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyBhIExvbmcgcmVwcmVzZW50aW5nIHRoZSA2NCBiaXQgaW50ZWdlciB0aGF0IGNvbWVzIGJ5IGNvbmNhdGVuYXRpbmcgdGhlIGdpdmVuIGxvdyBhbmQgaGlnaCBiaXRzLiBFYWNoIGlzXHJcbiAqICBhc3N1bWVkIHRvIHVzZSAzMiBiaXRzLlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtudW1iZXJ9IGxvd0JpdHMgVGhlIGxvdyAzMiBiaXRzXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBoaWdoQml0cyBUaGUgaGlnaCAzMiBiaXRzXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IHVuc2lnbmVkIFdoZXRoZXIgdW5zaWduZWQgb3Igbm90LCBkZWZhdWx0cyB0byBzaWduZWRcclxuICogQHJldHVybnMgeyFMb25nfSBUaGUgY29ycmVzcG9uZGluZyBMb25nIHZhbHVlXHJcbiAqL1xyXG5Mb25nLmZyb21CaXRzID0gZnJvbUJpdHM7XHJcblxyXG4vKipcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBiYXNlXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBleHBvbmVudFxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gKiBAaW5uZXJcclxuICovXHJcbnZhciBwb3dfZGJsID0gTWF0aC5wb3c7IC8vIFVzZWQgNCB0aW1lcyAoNCo4IHRvIDE1KzQpXHJcblxyXG4vKipcclxuICogQHBhcmFtIHtzdHJpbmd9IHN0clxyXG4gKiBAcGFyYW0geyhib29sZWFufG51bWJlcik9fSB1bnNpZ25lZFxyXG4gKiBAcGFyYW0ge251bWJlcj19IHJhZGl4XHJcbiAqIEByZXR1cm5zIHshTG9uZ31cclxuICogQGlubmVyXHJcbiAqL1xyXG5mdW5jdGlvbiBmcm9tU3RyaW5nKHN0ciwgdW5zaWduZWQsIHJhZGl4KSB7XHJcbiAgICBpZiAoc3RyLmxlbmd0aCA9PT0gMClcclxuICAgICAgICB0aHJvdyBFcnJvcignZW1wdHkgc3RyaW5nJyk7XHJcbiAgICBpZiAoc3RyID09PSBcIk5hTlwiIHx8IHN0ciA9PT0gXCJJbmZpbml0eVwiIHx8IHN0ciA9PT0gXCIrSW5maW5pdHlcIiB8fCBzdHIgPT09IFwiLUluZmluaXR5XCIpXHJcbiAgICAgICAgcmV0dXJuIFpFUk87XHJcbiAgICBpZiAodHlwZW9mIHVuc2lnbmVkID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgIC8vIEZvciBnb29nLm1hdGgubG9uZyBjb21wYXRpYmlsaXR5XHJcbiAgICAgICAgcmFkaXggPSB1bnNpZ25lZCxcclxuICAgICAgICB1bnNpZ25lZCA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB1bnNpZ25lZCA9ICEhIHVuc2lnbmVkO1xyXG4gICAgfVxyXG4gICAgcmFkaXggPSByYWRpeCB8fCAxMDtcclxuICAgIGlmIChyYWRpeCA8IDIgfHwgMzYgPCByYWRpeClcclxuICAgICAgICB0aHJvdyBSYW5nZUVycm9yKCdyYWRpeCcpO1xyXG5cclxuICAgIHZhciBwO1xyXG4gICAgaWYgKChwID0gc3RyLmluZGV4T2YoJy0nKSkgPiAwKVxyXG4gICAgICAgIHRocm93IEVycm9yKCdpbnRlcmlvciBoeXBoZW4nKTtcclxuICAgIGVsc2UgaWYgKHAgPT09IDApIHtcclxuICAgICAgICByZXR1cm4gZnJvbVN0cmluZyhzdHIuc3Vic3RyaW5nKDEpLCB1bnNpZ25lZCwgcmFkaXgpLm5lZygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERvIHNldmVyYWwgKDgpIGRpZ2l0cyBlYWNoIHRpbWUgdGhyb3VnaCB0aGUgbG9vcCwgc28gYXMgdG9cclxuICAgIC8vIG1pbmltaXplIHRoZSBjYWxscyB0byB0aGUgdmVyeSBleHBlbnNpdmUgZW11bGF0ZWQgZGl2LlxyXG4gICAgdmFyIHJhZGl4VG9Qb3dlciA9IGZyb21OdW1iZXIocG93X2RibChyYWRpeCwgOCkpO1xyXG5cclxuICAgIHZhciByZXN1bHQgPSBaRVJPO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpICs9IDgpIHtcclxuICAgICAgICB2YXIgc2l6ZSA9IE1hdGgubWluKDgsIHN0ci5sZW5ndGggLSBpKSxcclxuICAgICAgICAgICAgdmFsdWUgPSBwYXJzZUludChzdHIuc3Vic3RyaW5nKGksIGkgKyBzaXplKSwgcmFkaXgpO1xyXG4gICAgICAgIGlmIChzaXplIDwgOCkge1xyXG4gICAgICAgICAgICB2YXIgcG93ZXIgPSBmcm9tTnVtYmVyKHBvd19kYmwocmFkaXgsIHNpemUpKTtcclxuICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0Lm11bChwb3dlcikuYWRkKGZyb21OdW1iZXIodmFsdWUpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHQubXVsKHJhZGl4VG9Qb3dlcik7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5hZGQoZnJvbU51bWJlcih2YWx1ZSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlc3VsdC51bnNpZ25lZCA9IHVuc2lnbmVkO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYSBMb25nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBnaXZlbiBzdHJpbmcsIHdyaXR0ZW4gdXNpbmcgdGhlIHNwZWNpZmllZCByYWRpeC5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgVGhlIHRleHR1YWwgcmVwcmVzZW50YXRpb24gb2YgdGhlIExvbmdcclxuICogQHBhcmFtIHsoYm9vbGVhbnxudW1iZXIpPX0gdW5zaWduZWQgV2hldGhlciB1bnNpZ25lZCBvciBub3QsIGRlZmF1bHRzIHRvIHNpZ25lZFxyXG4gKiBAcGFyYW0ge251bWJlcj19IHJhZGl4IFRoZSByYWRpeCBpbiB3aGljaCB0aGUgdGV4dCBpcyB3cml0dGVuICgyLTM2KSwgZGVmYXVsdHMgdG8gMTBcclxuICogQHJldHVybnMgeyFMb25nfSBUaGUgY29ycmVzcG9uZGluZyBMb25nIHZhbHVlXHJcbiAqL1xyXG5Mb25nLmZyb21TdHJpbmcgPSBmcm9tU3RyaW5nO1xyXG5cclxuLyoqXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd8IXtsb3c6IG51bWJlciwgaGlnaDogbnVtYmVyLCB1bnNpZ25lZDogYm9vbGVhbn19IHZhbFxyXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSB1bnNpZ25lZFxyXG4gKiBAcmV0dXJucyB7IUxvbmd9XHJcbiAqIEBpbm5lclxyXG4gKi9cclxuZnVuY3Rpb24gZnJvbVZhbHVlKHZhbCwgdW5zaWduZWQpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJylcclxuICAgICAgICByZXR1cm4gZnJvbU51bWJlcih2YWwsIHVuc2lnbmVkKTtcclxuICAgIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJylcclxuICAgICAgICByZXR1cm4gZnJvbVN0cmluZyh2YWwsIHVuc2lnbmVkKTtcclxuICAgIC8vIFRocm93cyBmb3Igbm9uLW9iamVjdHMsIGNvbnZlcnRzIG5vbi1pbnN0YW5jZW9mIExvbmc6XHJcbiAgICByZXR1cm4gZnJvbUJpdHModmFsLmxvdywgdmFsLmhpZ2gsIHR5cGVvZiB1bnNpZ25lZCA9PT0gJ2Jvb2xlYW4nID8gdW5zaWduZWQgOiB2YWwudW5zaWduZWQpO1xyXG59XHJcblxyXG4vKipcclxuICogQ29udmVydHMgdGhlIHNwZWNpZmllZCB2YWx1ZSB0byBhIExvbmcgdXNpbmcgdGhlIGFwcHJvcHJpYXRlIGZyb20qIGZ1bmN0aW9uIGZvciBpdHMgdHlwZS5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ3whe2xvdzogbnVtYmVyLCBoaWdoOiBudW1iZXIsIHVuc2lnbmVkOiBib29sZWFufX0gdmFsIFZhbHVlXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IHVuc2lnbmVkIFdoZXRoZXIgdW5zaWduZWQgb3Igbm90LCBkZWZhdWx0cyB0byBzaWduZWRcclxuICogQHJldHVybnMgeyFMb25nfVxyXG4gKi9cclxuTG9uZy5mcm9tVmFsdWUgPSBmcm9tVmFsdWU7XHJcblxyXG4vLyBOT1RFOiB0aGUgY29tcGlsZXIgc2hvdWxkIGlubGluZSB0aGVzZSBjb25zdGFudCB2YWx1ZXMgYmVsb3cgYW5kIHRoZW4gcmVtb3ZlIHRoZXNlIHZhcmlhYmxlcywgc28gdGhlcmUgc2hvdWxkIGJlXHJcbi8vIG5vIHJ1bnRpbWUgcGVuYWx0eSBmb3IgdGhlc2UuXHJcblxyXG4vKipcclxuICogQHR5cGUge251bWJlcn1cclxuICogQGNvbnN0XHJcbiAqIEBpbm5lclxyXG4gKi9cclxudmFyIFRXT19QV1JfMTZfREJMID0gMSA8PCAxNjtcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7bnVtYmVyfVxyXG4gKiBAY29uc3RcclxuICogQGlubmVyXHJcbiAqL1xyXG52YXIgVFdPX1BXUl8yNF9EQkwgPSAxIDw8IDI0O1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHtudW1iZXJ9XHJcbiAqIEBjb25zdFxyXG4gKiBAaW5uZXJcclxuICovXHJcbnZhciBUV09fUFdSXzMyX0RCTCA9IFRXT19QV1JfMTZfREJMICogVFdPX1BXUl8xNl9EQkw7XHJcblxyXG4vKipcclxuICogQHR5cGUge251bWJlcn1cclxuICogQGNvbnN0XHJcbiAqIEBpbm5lclxyXG4gKi9cclxudmFyIFRXT19QV1JfNjRfREJMID0gVFdPX1BXUl8zMl9EQkwgKiBUV09fUFdSXzMyX0RCTDtcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7bnVtYmVyfVxyXG4gKiBAY29uc3RcclxuICogQGlubmVyXHJcbiAqL1xyXG52YXIgVFdPX1BXUl82M19EQkwgPSBUV09fUFdSXzY0X0RCTCAvIDI7XHJcblxyXG4vKipcclxuICogQHR5cGUgeyFMb25nfVxyXG4gKiBAY29uc3RcclxuICogQGlubmVyXHJcbiAqL1xyXG52YXIgVFdPX1BXUl8yNCA9IGZyb21JbnQoVFdPX1BXUl8yNF9EQkwpO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHshTG9uZ31cclxuICogQGlubmVyXHJcbiAqL1xyXG52YXIgWkVSTyA9IGZyb21JbnQoMCk7XHJcblxyXG4vKipcclxuICogU2lnbmVkIHplcm8uXHJcbiAqIEB0eXBlIHshTG9uZ31cclxuICovXHJcbkxvbmcuWkVSTyA9IFpFUk87XHJcblxyXG4vKipcclxuICogQHR5cGUgeyFMb25nfVxyXG4gKiBAaW5uZXJcclxuICovXHJcbnZhciBVWkVSTyA9IGZyb21JbnQoMCwgdHJ1ZSk7XHJcblxyXG4vKipcclxuICogVW5zaWduZWQgemVyby5cclxuICogQHR5cGUgeyFMb25nfVxyXG4gKi9cclxuTG9uZy5VWkVSTyA9IFVaRVJPO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHshTG9uZ31cclxuICogQGlubmVyXHJcbiAqL1xyXG52YXIgT05FID0gZnJvbUludCgxKTtcclxuXHJcbi8qKlxyXG4gKiBTaWduZWQgb25lLlxyXG4gKiBAdHlwZSB7IUxvbmd9XHJcbiAqL1xyXG5Mb25nLk9ORSA9IE9ORTtcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7IUxvbmd9XHJcbiAqIEBpbm5lclxyXG4gKi9cclxudmFyIFVPTkUgPSBmcm9tSW50KDEsIHRydWUpO1xyXG5cclxuLyoqXHJcbiAqIFVuc2lnbmVkIG9uZS5cclxuICogQHR5cGUgeyFMb25nfVxyXG4gKi9cclxuTG9uZy5VT05FID0gVU9ORTtcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7IUxvbmd9XHJcbiAqIEBpbm5lclxyXG4gKi9cclxudmFyIE5FR19PTkUgPSBmcm9tSW50KC0xKTtcclxuXHJcbi8qKlxyXG4gKiBTaWduZWQgbmVnYXRpdmUgb25lLlxyXG4gKiBAdHlwZSB7IUxvbmd9XHJcbiAqL1xyXG5Mb25nLk5FR19PTkUgPSBORUdfT05FO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHshTG9uZ31cclxuICogQGlubmVyXHJcbiAqL1xyXG52YXIgTUFYX1ZBTFVFID0gZnJvbUJpdHMoMHhGRkZGRkZGRnwwLCAweDdGRkZGRkZGfDAsIGZhbHNlKTtcclxuXHJcbi8qKlxyXG4gKiBNYXhpbXVtIHNpZ25lZCB2YWx1ZS5cclxuICogQHR5cGUgeyFMb25nfVxyXG4gKi9cclxuTG9uZy5NQVhfVkFMVUUgPSBNQVhfVkFMVUU7XHJcblxyXG4vKipcclxuICogQHR5cGUgeyFMb25nfVxyXG4gKiBAaW5uZXJcclxuICovXHJcbnZhciBNQVhfVU5TSUdORURfVkFMVUUgPSBmcm9tQml0cygweEZGRkZGRkZGfDAsIDB4RkZGRkZGRkZ8MCwgdHJ1ZSk7XHJcblxyXG4vKipcclxuICogTWF4aW11bSB1bnNpZ25lZCB2YWx1ZS5cclxuICogQHR5cGUgeyFMb25nfVxyXG4gKi9cclxuTG9uZy5NQVhfVU5TSUdORURfVkFMVUUgPSBNQVhfVU5TSUdORURfVkFMVUU7XHJcblxyXG4vKipcclxuICogQHR5cGUgeyFMb25nfVxyXG4gKiBAaW5uZXJcclxuICovXHJcbnZhciBNSU5fVkFMVUUgPSBmcm9tQml0cygwLCAweDgwMDAwMDAwfDAsIGZhbHNlKTtcclxuXHJcbi8qKlxyXG4gKiBNaW5pbXVtIHNpZ25lZCB2YWx1ZS5cclxuICogQHR5cGUgeyFMb25nfVxyXG4gKi9cclxuTG9uZy5NSU5fVkFMVUUgPSBNSU5fVkFMVUU7XHJcblxyXG4vKipcclxuICogQGFsaWFzIExvbmcucHJvdG90eXBlXHJcbiAqIEBpbm5lclxyXG4gKi9cclxudmFyIExvbmdQcm90b3R5cGUgPSBMb25nLnByb3RvdHlwZTtcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyB0aGUgTG9uZyB0byBhIDMyIGJpdCBpbnRlZ2VyLCBhc3N1bWluZyBpdCBpcyBhIDMyIGJpdCBpbnRlZ2VyLlxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS50b0ludCA9IGZ1bmN0aW9uIHRvSW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMudW5zaWduZWQgPyB0aGlzLmxvdyA+Pj4gMCA6IHRoaXMubG93O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIHRoZSBMb25nIHRvIGEgdGhlIG5lYXJlc3QgZmxvYXRpbmctcG9pbnQgcmVwcmVzZW50YXRpb24gb2YgdGhpcyB2YWx1ZSAoZG91YmxlLCA1MyBiaXQgbWFudGlzc2EpLlxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS50b051bWJlciA9IGZ1bmN0aW9uIHRvTnVtYmVyKCkge1xyXG4gICAgaWYgKHRoaXMudW5zaWduZWQpXHJcbiAgICAgICAgcmV0dXJuICgodGhpcy5oaWdoID4+PiAwKSAqIFRXT19QV1JfMzJfREJMKSArICh0aGlzLmxvdyA+Pj4gMCk7XHJcbiAgICByZXR1cm4gdGhpcy5oaWdoICogVFdPX1BXUl8zMl9EQkwgKyAodGhpcy5sb3cgPj4+IDApO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIHRoZSBMb25nIHRvIGEgc3RyaW5nIHdyaXR0ZW4gaW4gdGhlIHNwZWNpZmllZCByYWRpeC5cclxuICogQHBhcmFtIHtudW1iZXI9fSByYWRpeCBSYWRpeCAoMi0zNiksIGRlZmF1bHRzIHRvIDEwXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqIEBvdmVycmlkZVxyXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBJZiBgcmFkaXhgIGlzIG91dCBvZiByYW5nZVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKHJhZGl4KSB7XHJcbiAgICByYWRpeCA9IHJhZGl4IHx8IDEwO1xyXG4gICAgaWYgKHJhZGl4IDwgMiB8fCAzNiA8IHJhZGl4KVxyXG4gICAgICAgIHRocm93IFJhbmdlRXJyb3IoJ3JhZGl4Jyk7XHJcbiAgICBpZiAodGhpcy5pc1plcm8oKSlcclxuICAgICAgICByZXR1cm4gJzAnO1xyXG4gICAgaWYgKHRoaXMuaXNOZWdhdGl2ZSgpKSB7IC8vIFVuc2lnbmVkIExvbmdzIGFyZSBuZXZlciBuZWdhdGl2ZVxyXG4gICAgICAgIGlmICh0aGlzLmVxKE1JTl9WQUxVRSkpIHtcclxuICAgICAgICAgICAgLy8gV2UgbmVlZCB0byBjaGFuZ2UgdGhlIExvbmcgdmFsdWUgYmVmb3JlIGl0IGNhbiBiZSBuZWdhdGVkLCBzbyB3ZSByZW1vdmVcclxuICAgICAgICAgICAgLy8gdGhlIGJvdHRvbS1tb3N0IGRpZ2l0IGluIHRoaXMgYmFzZSBhbmQgdGhlbiByZWN1cnNlIHRvIGRvIHRoZSByZXN0LlxyXG4gICAgICAgICAgICB2YXIgcmFkaXhMb25nID0gZnJvbU51bWJlcihyYWRpeCksXHJcbiAgICAgICAgICAgICAgICBkaXYgPSB0aGlzLmRpdihyYWRpeExvbmcpLFxyXG4gICAgICAgICAgICAgICAgcmVtMSA9IGRpdi5tdWwocmFkaXhMb25nKS5zdWIodGhpcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBkaXYudG9TdHJpbmcocmFkaXgpICsgcmVtMS50b0ludCgpLnRvU3RyaW5nKHJhZGl4KTtcclxuICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuICctJyArIHRoaXMubmVnKCkudG9TdHJpbmcocmFkaXgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERvIHNldmVyYWwgKDYpIGRpZ2l0cyBlYWNoIHRpbWUgdGhyb3VnaCB0aGUgbG9vcCwgc28gYXMgdG9cclxuICAgIC8vIG1pbmltaXplIHRoZSBjYWxscyB0byB0aGUgdmVyeSBleHBlbnNpdmUgZW11bGF0ZWQgZGl2LlxyXG4gICAgdmFyIHJhZGl4VG9Qb3dlciA9IGZyb21OdW1iZXIocG93X2RibChyYWRpeCwgNiksIHRoaXMudW5zaWduZWQpLFxyXG4gICAgICAgIHJlbSA9IHRoaXM7XHJcbiAgICB2YXIgcmVzdWx0ID0gJyc7XHJcbiAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgIHZhciByZW1EaXYgPSByZW0uZGl2KHJhZGl4VG9Qb3dlciksXHJcbiAgICAgICAgICAgIGludHZhbCA9IHJlbS5zdWIocmVtRGl2Lm11bChyYWRpeFRvUG93ZXIpKS50b0ludCgpID4+PiAwLFxyXG4gICAgICAgICAgICBkaWdpdHMgPSBpbnR2YWwudG9TdHJpbmcocmFkaXgpO1xyXG4gICAgICAgIHJlbSA9IHJlbURpdjtcclxuICAgICAgICBpZiAocmVtLmlzWmVybygpKVxyXG4gICAgICAgICAgICByZXR1cm4gZGlnaXRzICsgcmVzdWx0O1xyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB3aGlsZSAoZGlnaXRzLmxlbmd0aCA8IDYpXHJcbiAgICAgICAgICAgICAgICBkaWdpdHMgPSAnMCcgKyBkaWdpdHM7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9ICcnICsgZGlnaXRzICsgcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBoaWdoIDMyIGJpdHMgYXMgYSBzaWduZWQgaW50ZWdlci5cclxuICogQHJldHVybnMge251bWJlcn0gU2lnbmVkIGhpZ2ggYml0c1xyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5nZXRIaWdoQml0cyA9IGZ1bmN0aW9uIGdldEhpZ2hCaXRzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaGlnaDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBoaWdoIDMyIGJpdHMgYXMgYW4gdW5zaWduZWQgaW50ZWdlci5cclxuICogQHJldHVybnMge251bWJlcn0gVW5zaWduZWQgaGlnaCBiaXRzXHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmdldEhpZ2hCaXRzVW5zaWduZWQgPSBmdW5jdGlvbiBnZXRIaWdoQml0c1Vuc2lnbmVkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaGlnaCA+Pj4gMDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBsb3cgMzIgYml0cyBhcyBhIHNpZ25lZCBpbnRlZ2VyLlxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBTaWduZWQgbG93IGJpdHNcclxuICovXHJcbkxvbmdQcm90b3R5cGUuZ2V0TG93Qml0cyA9IGZ1bmN0aW9uIGdldExvd0JpdHMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sb3c7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgbG93IDMyIGJpdHMgYXMgYW4gdW5zaWduZWQgaW50ZWdlci5cclxuICogQHJldHVybnMge251bWJlcn0gVW5zaWduZWQgbG93IGJpdHNcclxuICovXHJcbkxvbmdQcm90b3R5cGUuZ2V0TG93Qml0c1Vuc2lnbmVkID0gZnVuY3Rpb24gZ2V0TG93Qml0c1Vuc2lnbmVkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubG93ID4+PiAwO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIG51bWJlciBvZiBiaXRzIG5lZWRlZCB0byByZXByZXNlbnQgdGhlIGFic29sdXRlIHZhbHVlIG9mIHRoaXMgTG9uZy5cclxuICogQHJldHVybnMge251bWJlcn1cclxuICovXHJcbkxvbmdQcm90b3R5cGUuZ2V0TnVtQml0c0FicyA9IGZ1bmN0aW9uIGdldE51bUJpdHNBYnMoKSB7XHJcbiAgICBpZiAodGhpcy5pc05lZ2F0aXZlKCkpIC8vIFVuc2lnbmVkIExvbmdzIGFyZSBuZXZlciBuZWdhdGl2ZVxyXG4gICAgICAgIHJldHVybiB0aGlzLmVxKE1JTl9WQUxVRSkgPyA2NCA6IHRoaXMubmVnKCkuZ2V0TnVtQml0c0FicygpO1xyXG4gICAgdmFyIHZhbCA9IHRoaXMuaGlnaCAhPSAwID8gdGhpcy5oaWdoIDogdGhpcy5sb3c7XHJcbiAgICBmb3IgKHZhciBiaXQgPSAzMTsgYml0ID4gMDsgYml0LS0pXHJcbiAgICAgICAgaWYgKCh2YWwgJiAoMSA8PCBiaXQpKSAhPSAwKVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIHJldHVybiB0aGlzLmhpZ2ggIT0gMCA/IGJpdCArIDMzIDogYml0ICsgMTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGlzIExvbmcncyB2YWx1ZSBlcXVhbHMgemVyby5cclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmlzWmVybyA9IGZ1bmN0aW9uIGlzWmVybygpIHtcclxuICAgIHJldHVybiB0aGlzLmhpZ2ggPT09IDAgJiYgdGhpcy5sb3cgPT09IDA7XHJcbn07XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhpcyBMb25nJ3MgdmFsdWUgZXF1YWxzIHplcm8uIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIExvbmcjaXNaZXJvfS5cclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmVxeiA9IExvbmdQcm90b3R5cGUuaXNaZXJvO1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoaXMgTG9uZydzIHZhbHVlIGlzIG5lZ2F0aXZlLlxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbkxvbmdQcm90b3R5cGUuaXNOZWdhdGl2ZSA9IGZ1bmN0aW9uIGlzTmVnYXRpdmUoKSB7XHJcbiAgICByZXR1cm4gIXRoaXMudW5zaWduZWQgJiYgdGhpcy5oaWdoIDwgMDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGlzIExvbmcncyB2YWx1ZSBpcyBwb3NpdGl2ZS5cclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmlzUG9zaXRpdmUgPSBmdW5jdGlvbiBpc1Bvc2l0aXZlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudW5zaWduZWQgfHwgdGhpcy5oaWdoID49IDA7XHJcbn07XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhpcyBMb25nJ3MgdmFsdWUgaXMgb2RkLlxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbkxvbmdQcm90b3R5cGUuaXNPZGQgPSBmdW5jdGlvbiBpc09kZCgpIHtcclxuICAgIHJldHVybiAodGhpcy5sb3cgJiAxKSA9PT0gMTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGlzIExvbmcncyB2YWx1ZSBpcyBldmVuLlxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbkxvbmdQcm90b3R5cGUuaXNFdmVuID0gZnVuY3Rpb24gaXNFdmVuKCkge1xyXG4gICAgcmV0dXJuICh0aGlzLmxvdyAmIDEpID09PSAwO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoaXMgTG9uZydzIHZhbHVlIGVxdWFscyB0aGUgc3BlY2lmaWVkJ3MuXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gb3RoZXIgT3RoZXIgdmFsdWVcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIGVxdWFscyhvdGhlcikge1xyXG4gICAgaWYgKCFpc0xvbmcob3RoZXIpKVxyXG4gICAgICAgIG90aGVyID0gZnJvbVZhbHVlKG90aGVyKTtcclxuICAgIGlmICh0aGlzLnVuc2lnbmVkICE9PSBvdGhlci51bnNpZ25lZCAmJiAodGhpcy5oaWdoID4+PiAzMSkgPT09IDEgJiYgKG90aGVyLmhpZ2ggPj4+IDMxKSA9PT0gMSlcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICByZXR1cm4gdGhpcy5oaWdoID09PSBvdGhlci5oaWdoICYmIHRoaXMubG93ID09PSBvdGhlci5sb3c7XHJcbn07XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhpcyBMb25nJ3MgdmFsdWUgZXF1YWxzIHRoZSBzcGVjaWZpZWQncy4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgTG9uZyNlcXVhbHN9LlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBvdGhlciBPdGhlciB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbkxvbmdQcm90b3R5cGUuZXEgPSBMb25nUHJvdG90eXBlLmVxdWFscztcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGlzIExvbmcncyB2YWx1ZSBkaWZmZXJzIGZyb20gdGhlIHNwZWNpZmllZCdzLlxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIHZhbHVlXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5ub3RFcXVhbHMgPSBmdW5jdGlvbiBub3RFcXVhbHMob3RoZXIpIHtcclxuICAgIHJldHVybiAhdGhpcy5lcSgvKiB2YWxpZGF0ZXMgKi8gb3RoZXIpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoaXMgTG9uZydzIHZhbHVlIGRpZmZlcnMgZnJvbSB0aGUgc3BlY2lmaWVkJ3MuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIExvbmcjbm90RXF1YWxzfS5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gb3RoZXIgT3RoZXIgdmFsdWVcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLm5lcSA9IExvbmdQcm90b3R5cGUubm90RXF1YWxzO1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoaXMgTG9uZydzIHZhbHVlIGRpZmZlcnMgZnJvbSB0aGUgc3BlY2lmaWVkJ3MuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIExvbmcjbm90RXF1YWxzfS5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gb3RoZXIgT3RoZXIgdmFsdWVcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLm5lID0gTG9uZ1Byb3RvdHlwZS5ub3RFcXVhbHM7XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhpcyBMb25nJ3MgdmFsdWUgaXMgbGVzcyB0aGFuIHRoZSBzcGVjaWZpZWQncy5cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBvdGhlciBPdGhlciB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbkxvbmdQcm90b3R5cGUubGVzc1RoYW4gPSBmdW5jdGlvbiBsZXNzVGhhbihvdGhlcikge1xyXG4gICAgcmV0dXJuIHRoaXMuY29tcCgvKiB2YWxpZGF0ZXMgKi8gb3RoZXIpIDwgMDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGlzIExvbmcncyB2YWx1ZSBpcyBsZXNzIHRoYW4gdGhlIHNwZWNpZmllZCdzLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI2xlc3NUaGFufS5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gb3RoZXIgT3RoZXIgdmFsdWVcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmx0ID0gTG9uZ1Byb3RvdHlwZS5sZXNzVGhhbjtcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGlzIExvbmcncyB2YWx1ZSBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdGhlIHNwZWNpZmllZCdzLlxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIHZhbHVlXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5sZXNzVGhhbk9yRXF1YWwgPSBmdW5jdGlvbiBsZXNzVGhhbk9yRXF1YWwob3RoZXIpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbXAoLyogdmFsaWRhdGVzICovIG90aGVyKSA8PSAwO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoaXMgTG9uZydzIHZhbHVlIGlzIGxlc3MgdGhhbiBvciBlcXVhbCB0aGUgc3BlY2lmaWVkJ3MuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIExvbmcjbGVzc1RoYW5PckVxdWFsfS5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gb3RoZXIgT3RoZXIgdmFsdWVcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmx0ZSA9IExvbmdQcm90b3R5cGUubGVzc1RoYW5PckVxdWFsO1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoaXMgTG9uZydzIHZhbHVlIGlzIGxlc3MgdGhhbiBvciBlcXVhbCB0aGUgc3BlY2lmaWVkJ3MuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIExvbmcjbGVzc1RoYW5PckVxdWFsfS5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gb3RoZXIgT3RoZXIgdmFsdWVcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmxlID0gTG9uZ1Byb3RvdHlwZS5sZXNzVGhhbk9yRXF1YWw7XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhpcyBMb25nJ3MgdmFsdWUgaXMgZ3JlYXRlciB0aGFuIHRoZSBzcGVjaWZpZWQncy5cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBvdGhlciBPdGhlciB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbkxvbmdQcm90b3R5cGUuZ3JlYXRlclRoYW4gPSBmdW5jdGlvbiBncmVhdGVyVGhhbihvdGhlcikge1xyXG4gICAgcmV0dXJuIHRoaXMuY29tcCgvKiB2YWxpZGF0ZXMgKi8gb3RoZXIpID4gMDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGlzIExvbmcncyB2YWx1ZSBpcyBncmVhdGVyIHRoYW4gdGhlIHNwZWNpZmllZCdzLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI2dyZWF0ZXJUaGFufS5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gb3RoZXIgT3RoZXIgdmFsdWVcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmd0ID0gTG9uZ1Byb3RvdHlwZS5ncmVhdGVyVGhhbjtcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGlzIExvbmcncyB2YWx1ZSBpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdGhlIHNwZWNpZmllZCdzLlxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIHZhbHVlXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5ncmVhdGVyVGhhbk9yRXF1YWwgPSBmdW5jdGlvbiBncmVhdGVyVGhhbk9yRXF1YWwob3RoZXIpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbXAoLyogdmFsaWRhdGVzICovIG90aGVyKSA+PSAwO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoaXMgTG9uZydzIHZhbHVlIGlzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0aGUgc3BlY2lmaWVkJ3MuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIExvbmcjZ3JlYXRlclRoYW5PckVxdWFsfS5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gb3RoZXIgT3RoZXIgdmFsdWVcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmd0ZSA9IExvbmdQcm90b3R5cGUuZ3JlYXRlclRoYW5PckVxdWFsO1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoaXMgTG9uZydzIHZhbHVlIGlzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0aGUgc3BlY2lmaWVkJ3MuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIExvbmcjZ3JlYXRlclRoYW5PckVxdWFsfS5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gb3RoZXIgT3RoZXIgdmFsdWVcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmdlID0gTG9uZ1Byb3RvdHlwZS5ncmVhdGVyVGhhbk9yRXF1YWw7XHJcblxyXG4vKipcclxuICogQ29tcGFyZXMgdGhpcyBMb25nJ3MgdmFsdWUgd2l0aCB0aGUgc3BlY2lmaWVkJ3MuXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gb3RoZXIgT3RoZXIgdmFsdWVcclxuICogQHJldHVybnMge251bWJlcn0gMCBpZiB0aGV5IGFyZSB0aGUgc2FtZSwgMSBpZiB0aGUgdGhpcyBpcyBncmVhdGVyIGFuZCAtMVxyXG4gKiAgaWYgdGhlIGdpdmVuIG9uZSBpcyBncmVhdGVyXHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlKG90aGVyKSB7XHJcbiAgICBpZiAoIWlzTG9uZyhvdGhlcikpXHJcbiAgICAgICAgb3RoZXIgPSBmcm9tVmFsdWUob3RoZXIpO1xyXG4gICAgaWYgKHRoaXMuZXEob3RoZXIpKVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgdmFyIHRoaXNOZWcgPSB0aGlzLmlzTmVnYXRpdmUoKSxcclxuICAgICAgICBvdGhlck5lZyA9IG90aGVyLmlzTmVnYXRpdmUoKTtcclxuICAgIGlmICh0aGlzTmVnICYmICFvdGhlck5lZylcclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICBpZiAoIXRoaXNOZWcgJiYgb3RoZXJOZWcpXHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAvLyBBdCB0aGlzIHBvaW50IHRoZSBzaWduIGJpdHMgYXJlIHRoZSBzYW1lXHJcbiAgICBpZiAoIXRoaXMudW5zaWduZWQpXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ViKG90aGVyKS5pc05lZ2F0aXZlKCkgPyAtMSA6IDE7XHJcbiAgICAvLyBCb3RoIGFyZSBwb3NpdGl2ZSBpZiBhdCBsZWFzdCBvbmUgaXMgdW5zaWduZWRcclxuICAgIHJldHVybiAob3RoZXIuaGlnaCA+Pj4gMCkgPiAodGhpcy5oaWdoID4+PiAwKSB8fCAob3RoZXIuaGlnaCA9PT0gdGhpcy5oaWdoICYmIChvdGhlci5sb3cgPj4+IDApID4gKHRoaXMubG93ID4+PiAwKSkgPyAtMSA6IDE7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29tcGFyZXMgdGhpcyBMb25nJ3MgdmFsdWUgd2l0aCB0aGUgc3BlY2lmaWVkJ3MuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIExvbmcjY29tcGFyZX0uXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIHZhbHVlXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IDAgaWYgdGhleSBhcmUgdGhlIHNhbWUsIDEgaWYgdGhlIHRoaXMgaXMgZ3JlYXRlciBhbmQgLTFcclxuICogIGlmIHRoZSBnaXZlbiBvbmUgaXMgZ3JlYXRlclxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5jb21wID0gTG9uZ1Byb3RvdHlwZS5jb21wYXJlO1xyXG5cclxuLyoqXHJcbiAqIE5lZ2F0ZXMgdGhpcyBMb25nJ3MgdmFsdWUuXHJcbiAqIEByZXR1cm5zIHshTG9uZ30gTmVnYXRlZCBMb25nXHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLm5lZ2F0ZSA9IGZ1bmN0aW9uIG5lZ2F0ZSgpIHtcclxuICAgIGlmICghdGhpcy51bnNpZ25lZCAmJiB0aGlzLmVxKE1JTl9WQUxVRSkpXHJcbiAgICAgICAgcmV0dXJuIE1JTl9WQUxVRTtcclxuICAgIHJldHVybiB0aGlzLm5vdCgpLmFkZChPTkUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE5lZ2F0ZXMgdGhpcyBMb25nJ3MgdmFsdWUuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIExvbmcjbmVnYXRlfS5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEByZXR1cm5zIHshTG9uZ30gTmVnYXRlZCBMb25nXHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLm5lZyA9IExvbmdQcm90b3R5cGUubmVnYXRlO1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIHN1bSBvZiB0aGlzIGFuZCB0aGUgc3BlY2lmaWVkIExvbmcuXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gYWRkZW5kIEFkZGVuZFxyXG4gKiBAcmV0dXJucyB7IUxvbmd9IFN1bVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiBhZGQoYWRkZW5kKSB7XHJcbiAgICBpZiAoIWlzTG9uZyhhZGRlbmQpKVxyXG4gICAgICAgIGFkZGVuZCA9IGZyb21WYWx1ZShhZGRlbmQpO1xyXG5cclxuICAgIC8vIERpdmlkZSBlYWNoIG51bWJlciBpbnRvIDQgY2h1bmtzIG9mIDE2IGJpdHMsIGFuZCB0aGVuIHN1bSB0aGUgY2h1bmtzLlxyXG5cclxuICAgIHZhciBhNDggPSB0aGlzLmhpZ2ggPj4+IDE2O1xyXG4gICAgdmFyIGEzMiA9IHRoaXMuaGlnaCAmIDB4RkZGRjtcclxuICAgIHZhciBhMTYgPSB0aGlzLmxvdyA+Pj4gMTY7XHJcbiAgICB2YXIgYTAwID0gdGhpcy5sb3cgJiAweEZGRkY7XHJcblxyXG4gICAgdmFyIGI0OCA9IGFkZGVuZC5oaWdoID4+PiAxNjtcclxuICAgIHZhciBiMzIgPSBhZGRlbmQuaGlnaCAmIDB4RkZGRjtcclxuICAgIHZhciBiMTYgPSBhZGRlbmQubG93ID4+PiAxNjtcclxuICAgIHZhciBiMDAgPSBhZGRlbmQubG93ICYgMHhGRkZGO1xyXG5cclxuICAgIHZhciBjNDggPSAwLCBjMzIgPSAwLCBjMTYgPSAwLCBjMDAgPSAwO1xyXG4gICAgYzAwICs9IGEwMCArIGIwMDtcclxuICAgIGMxNiArPSBjMDAgPj4+IDE2O1xyXG4gICAgYzAwICY9IDB4RkZGRjtcclxuICAgIGMxNiArPSBhMTYgKyBiMTY7XHJcbiAgICBjMzIgKz0gYzE2ID4+PiAxNjtcclxuICAgIGMxNiAmPSAweEZGRkY7XHJcbiAgICBjMzIgKz0gYTMyICsgYjMyO1xyXG4gICAgYzQ4ICs9IGMzMiA+Pj4gMTY7XHJcbiAgICBjMzIgJj0gMHhGRkZGO1xyXG4gICAgYzQ4ICs9IGE0OCArIGI0ODtcclxuICAgIGM0OCAmPSAweEZGRkY7XHJcbiAgICByZXR1cm4gZnJvbUJpdHMoKGMxNiA8PCAxNikgfCBjMDAsIChjNDggPDwgMTYpIHwgYzMyLCB0aGlzLnVuc2lnbmVkKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBkaWZmZXJlbmNlIG9mIHRoaXMgYW5kIHRoZSBzcGVjaWZpZWQgTG9uZy5cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBzdWJ0cmFoZW5kIFN1YnRyYWhlbmRcclxuICogQHJldHVybnMgeyFMb25nfSBEaWZmZXJlbmNlXHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLnN1YnRyYWN0ID0gZnVuY3Rpb24gc3VidHJhY3Qoc3VidHJhaGVuZCkge1xyXG4gICAgaWYgKCFpc0xvbmcoc3VidHJhaGVuZCkpXHJcbiAgICAgICAgc3VidHJhaGVuZCA9IGZyb21WYWx1ZShzdWJ0cmFoZW5kKTtcclxuICAgIHJldHVybiB0aGlzLmFkZChzdWJ0cmFoZW5kLm5lZygpKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBkaWZmZXJlbmNlIG9mIHRoaXMgYW5kIHRoZSBzcGVjaWZpZWQgTG9uZy4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgTG9uZyNzdWJ0cmFjdH0uXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IHN1YnRyYWhlbmQgU3VidHJhaGVuZFxyXG4gKiBAcmV0dXJucyB7IUxvbmd9IERpZmZlcmVuY2VcclxuICovXHJcbkxvbmdQcm90b3R5cGUuc3ViID0gTG9uZ1Byb3RvdHlwZS5zdWJ0cmFjdDtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBwcm9kdWN0IG9mIHRoaXMgYW5kIHRoZSBzcGVjaWZpZWQgTG9uZy5cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBtdWx0aXBsaWVyIE11bHRpcGxpZXJcclxuICogQHJldHVybnMgeyFMb25nfSBQcm9kdWN0XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLm11bHRpcGx5ID0gZnVuY3Rpb24gbXVsdGlwbHkobXVsdGlwbGllcikge1xyXG4gICAgaWYgKHRoaXMuaXNaZXJvKCkpXHJcbiAgICAgICAgcmV0dXJuIFpFUk87XHJcbiAgICBpZiAoIWlzTG9uZyhtdWx0aXBsaWVyKSlcclxuICAgICAgICBtdWx0aXBsaWVyID0gZnJvbVZhbHVlKG11bHRpcGxpZXIpO1xyXG5cclxuICAgIC8vIHVzZSB3YXNtIHN1cHBvcnQgaWYgcHJlc2VudFxyXG4gICAgaWYgKHdhc20pIHtcclxuICAgICAgICB2YXIgbG93ID0gd2FzbS5tdWwodGhpcy5sb3csXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlnaCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGlwbGllci5sb3csXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpcGxpZXIuaGlnaCk7XHJcbiAgICAgICAgcmV0dXJuIGZyb21CaXRzKGxvdywgd2FzbS5nZXRfaGlnaCgpLCB0aGlzLnVuc2lnbmVkKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobXVsdGlwbGllci5pc1plcm8oKSlcclxuICAgICAgICByZXR1cm4gWkVSTztcclxuICAgIGlmICh0aGlzLmVxKE1JTl9WQUxVRSkpXHJcbiAgICAgICAgcmV0dXJuIG11bHRpcGxpZXIuaXNPZGQoKSA/IE1JTl9WQUxVRSA6IFpFUk87XHJcbiAgICBpZiAobXVsdGlwbGllci5lcShNSU5fVkFMVUUpKVxyXG4gICAgICAgIHJldHVybiB0aGlzLmlzT2RkKCkgPyBNSU5fVkFMVUUgOiBaRVJPO1xyXG5cclxuICAgIGlmICh0aGlzLmlzTmVnYXRpdmUoKSkge1xyXG4gICAgICAgIGlmIChtdWx0aXBsaWVyLmlzTmVnYXRpdmUoKSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubmVnKCkubXVsKG11bHRpcGxpZXIubmVnKCkpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubmVnKCkubXVsKG11bHRpcGxpZXIpLm5lZygpO1xyXG4gICAgfSBlbHNlIGlmIChtdWx0aXBsaWVyLmlzTmVnYXRpdmUoKSlcclxuICAgICAgICByZXR1cm4gdGhpcy5tdWwobXVsdGlwbGllci5uZWcoKSkubmVnKCk7XHJcblxyXG4gICAgLy8gSWYgYm90aCBsb25ncyBhcmUgc21hbGwsIHVzZSBmbG9hdCBtdWx0aXBsaWNhdGlvblxyXG4gICAgaWYgKHRoaXMubHQoVFdPX1BXUl8yNCkgJiYgbXVsdGlwbGllci5sdChUV09fUFdSXzI0KSlcclxuICAgICAgICByZXR1cm4gZnJvbU51bWJlcih0aGlzLnRvTnVtYmVyKCkgKiBtdWx0aXBsaWVyLnRvTnVtYmVyKCksIHRoaXMudW5zaWduZWQpO1xyXG5cclxuICAgIC8vIERpdmlkZSBlYWNoIGxvbmcgaW50byA0IGNodW5rcyBvZiAxNiBiaXRzLCBhbmQgdGhlbiBhZGQgdXAgNHg0IHByb2R1Y3RzLlxyXG4gICAgLy8gV2UgY2FuIHNraXAgcHJvZHVjdHMgdGhhdCB3b3VsZCBvdmVyZmxvdy5cclxuXHJcbiAgICB2YXIgYTQ4ID0gdGhpcy5oaWdoID4+PiAxNjtcclxuICAgIHZhciBhMzIgPSB0aGlzLmhpZ2ggJiAweEZGRkY7XHJcbiAgICB2YXIgYTE2ID0gdGhpcy5sb3cgPj4+IDE2O1xyXG4gICAgdmFyIGEwMCA9IHRoaXMubG93ICYgMHhGRkZGO1xyXG5cclxuICAgIHZhciBiNDggPSBtdWx0aXBsaWVyLmhpZ2ggPj4+IDE2O1xyXG4gICAgdmFyIGIzMiA9IG11bHRpcGxpZXIuaGlnaCAmIDB4RkZGRjtcclxuICAgIHZhciBiMTYgPSBtdWx0aXBsaWVyLmxvdyA+Pj4gMTY7XHJcbiAgICB2YXIgYjAwID0gbXVsdGlwbGllci5sb3cgJiAweEZGRkY7XHJcblxyXG4gICAgdmFyIGM0OCA9IDAsIGMzMiA9IDAsIGMxNiA9IDAsIGMwMCA9IDA7XHJcbiAgICBjMDAgKz0gYTAwICogYjAwO1xyXG4gICAgYzE2ICs9IGMwMCA+Pj4gMTY7XHJcbiAgICBjMDAgJj0gMHhGRkZGO1xyXG4gICAgYzE2ICs9IGExNiAqIGIwMDtcclxuICAgIGMzMiArPSBjMTYgPj4+IDE2O1xyXG4gICAgYzE2ICY9IDB4RkZGRjtcclxuICAgIGMxNiArPSBhMDAgKiBiMTY7XHJcbiAgICBjMzIgKz0gYzE2ID4+PiAxNjtcclxuICAgIGMxNiAmPSAweEZGRkY7XHJcbiAgICBjMzIgKz0gYTMyICogYjAwO1xyXG4gICAgYzQ4ICs9IGMzMiA+Pj4gMTY7XHJcbiAgICBjMzIgJj0gMHhGRkZGO1xyXG4gICAgYzMyICs9IGExNiAqIGIxNjtcclxuICAgIGM0OCArPSBjMzIgPj4+IDE2O1xyXG4gICAgYzMyICY9IDB4RkZGRjtcclxuICAgIGMzMiArPSBhMDAgKiBiMzI7XHJcbiAgICBjNDggKz0gYzMyID4+PiAxNjtcclxuICAgIGMzMiAmPSAweEZGRkY7XHJcbiAgICBjNDggKz0gYTQ4ICogYjAwICsgYTMyICogYjE2ICsgYTE2ICogYjMyICsgYTAwICogYjQ4O1xyXG4gICAgYzQ4ICY9IDB4RkZGRjtcclxuICAgIHJldHVybiBmcm9tQml0cygoYzE2IDw8IDE2KSB8IGMwMCwgKGM0OCA8PCAxNikgfCBjMzIsIHRoaXMudW5zaWduZWQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIHByb2R1Y3Qgb2YgdGhpcyBhbmQgdGhlIHNwZWNpZmllZCBMb25nLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI211bHRpcGx5fS5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gbXVsdGlwbGllciBNdWx0aXBsaWVyXHJcbiAqIEByZXR1cm5zIHshTG9uZ30gUHJvZHVjdFxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5tdWwgPSBMb25nUHJvdG90eXBlLm11bHRpcGx5O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhpcyBMb25nIGRpdmlkZWQgYnkgdGhlIHNwZWNpZmllZC4gVGhlIHJlc3VsdCBpcyBzaWduZWQgaWYgdGhpcyBMb25nIGlzIHNpZ25lZCBvclxyXG4gKiAgdW5zaWduZWQgaWYgdGhpcyBMb25nIGlzIHVuc2lnbmVkLlxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IGRpdmlzb3IgRGl2aXNvclxyXG4gKiBAcmV0dXJucyB7IUxvbmd9IFF1b3RpZW50XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmRpdmlkZSA9IGZ1bmN0aW9uIGRpdmlkZShkaXZpc29yKSB7XHJcbiAgICBpZiAoIWlzTG9uZyhkaXZpc29yKSlcclxuICAgICAgICBkaXZpc29yID0gZnJvbVZhbHVlKGRpdmlzb3IpO1xyXG4gICAgaWYgKGRpdmlzb3IuaXNaZXJvKCkpXHJcbiAgICAgICAgdGhyb3cgRXJyb3IoJ2RpdmlzaW9uIGJ5IHplcm8nKTtcclxuXHJcbiAgICAvLyB1c2Ugd2FzbSBzdXBwb3J0IGlmIHByZXNlbnRcclxuICAgIGlmICh3YXNtKSB7XHJcbiAgICAgICAgLy8gZ3VhcmQgYWdhaW5zdCBzaWduZWQgZGl2aXNpb24gb3ZlcmZsb3c6IHRoZSBsYXJnZXN0XHJcbiAgICAgICAgLy8gbmVnYXRpdmUgbnVtYmVyIC8gLTEgd291bGQgYmUgMSBsYXJnZXIgdGhhbiB0aGUgbGFyZ2VzdFxyXG4gICAgICAgIC8vIHBvc2l0aXZlIG51bWJlciwgZHVlIHRvIHR3bydzIGNvbXBsZW1lbnQuXHJcbiAgICAgICAgaWYgKCF0aGlzLnVuc2lnbmVkICYmXHJcbiAgICAgICAgICAgIHRoaXMuaGlnaCA9PT0gLTB4ODAwMDAwMDAgJiZcclxuICAgICAgICAgICAgZGl2aXNvci5sb3cgPT09IC0xICYmIGRpdmlzb3IuaGlnaCA9PT0gLTEpIHtcclxuICAgICAgICAgICAgLy8gYmUgY29uc2lzdGVudCB3aXRoIG5vbi13YXNtIGNvZGUgcGF0aFxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGxvdyA9ICh0aGlzLnVuc2lnbmVkID8gd2FzbS5kaXZfdSA6IHdhc20uZGl2X3MpKFxyXG4gICAgICAgICAgICB0aGlzLmxvdyxcclxuICAgICAgICAgICAgdGhpcy5oaWdoLFxyXG4gICAgICAgICAgICBkaXZpc29yLmxvdyxcclxuICAgICAgICAgICAgZGl2aXNvci5oaWdoXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4gZnJvbUJpdHMobG93LCB3YXNtLmdldF9oaWdoKCksIHRoaXMudW5zaWduZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmlzWmVybygpKVxyXG4gICAgICAgIHJldHVybiB0aGlzLnVuc2lnbmVkID8gVVpFUk8gOiBaRVJPO1xyXG4gICAgdmFyIGFwcHJveCwgcmVtLCByZXM7XHJcbiAgICBpZiAoIXRoaXMudW5zaWduZWQpIHtcclxuICAgICAgICAvLyBUaGlzIHNlY3Rpb24gaXMgb25seSByZWxldmFudCBmb3Igc2lnbmVkIGxvbmdzIGFuZCBpcyBkZXJpdmVkIGZyb20gdGhlXHJcbiAgICAgICAgLy8gY2xvc3VyZSBsaWJyYXJ5IGFzIGEgd2hvbGUuXHJcbiAgICAgICAgaWYgKHRoaXMuZXEoTUlOX1ZBTFVFKSkge1xyXG4gICAgICAgICAgICBpZiAoZGl2aXNvci5lcShPTkUpIHx8IGRpdmlzb3IuZXEoTkVHX09ORSkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTUlOX1ZBTFVFOyAgLy8gcmVjYWxsIHRoYXQgLU1JTl9WQUxVRSA9PSBNSU5fVkFMVUVcclxuICAgICAgICAgICAgZWxzZSBpZiAoZGl2aXNvci5lcShNSU5fVkFMVUUpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9ORTtcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBBdCB0aGlzIHBvaW50LCB3ZSBoYXZlIHxvdGhlcnwgPj0gMiwgc28gfHRoaXMvb3RoZXJ8IDwgfE1JTl9WQUxVRXwuXHJcbiAgICAgICAgICAgICAgICB2YXIgaGFsZlRoaXMgPSB0aGlzLnNocigxKTtcclxuICAgICAgICAgICAgICAgIGFwcHJveCA9IGhhbGZUaGlzLmRpdihkaXZpc29yKS5zaGwoMSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXBwcm94LmVxKFpFUk8pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRpdmlzb3IuaXNOZWdhdGl2ZSgpID8gT05FIDogTkVHX09ORTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtID0gdGhpcy5zdWIoZGl2aXNvci5tdWwoYXBwcm94KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzID0gYXBwcm94LmFkZChyZW0uZGl2KGRpdmlzb3IpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChkaXZpc29yLmVxKE1JTl9WQUxVRSkpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnVuc2lnbmVkID8gVVpFUk8gOiBaRVJPO1xyXG4gICAgICAgIGlmICh0aGlzLmlzTmVnYXRpdmUoKSkge1xyXG4gICAgICAgICAgICBpZiAoZGl2aXNvci5pc05lZ2F0aXZlKCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5uZWcoKS5kaXYoZGl2aXNvci5uZWcoKSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5lZygpLmRpdihkaXZpc29yKS5uZWcoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRpdmlzb3IuaXNOZWdhdGl2ZSgpKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXYoZGl2aXNvci5uZWcoKSkubmVnKCk7XHJcbiAgICAgICAgcmVzID0gWkVSTztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gVGhlIGFsZ29yaXRobSBiZWxvdyBoYXMgbm90IGJlZW4gbWFkZSBmb3IgdW5zaWduZWQgbG9uZ3MuIEl0J3MgdGhlcmVmb3JlXHJcbiAgICAgICAgLy8gcmVxdWlyZWQgdG8gdGFrZSBzcGVjaWFsIGNhcmUgb2YgdGhlIE1TQiBwcmlvciB0byBydW5uaW5nIGl0LlxyXG4gICAgICAgIGlmICghZGl2aXNvci51bnNpZ25lZClcclxuICAgICAgICAgICAgZGl2aXNvciA9IGRpdmlzb3IudG9VbnNpZ25lZCgpO1xyXG4gICAgICAgIGlmIChkaXZpc29yLmd0KHRoaXMpKVxyXG4gICAgICAgICAgICByZXR1cm4gVVpFUk87XHJcbiAgICAgICAgaWYgKGRpdmlzb3IuZ3QodGhpcy5zaHJ1KDEpKSkgLy8gMTUgPj4+IDEgPSA3IDsgd2l0aCBkaXZpc29yID0gOCA7IHRydWVcclxuICAgICAgICAgICAgcmV0dXJuIFVPTkU7XHJcbiAgICAgICAgcmVzID0gVVpFUk87XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVwZWF0IHRoZSBmb2xsb3dpbmcgdW50aWwgdGhlIHJlbWFpbmRlciBpcyBsZXNzIHRoYW4gb3RoZXI6ICBmaW5kIGFcclxuICAgIC8vIGZsb2F0aW5nLXBvaW50IHRoYXQgYXBwcm94aW1hdGVzIHJlbWFpbmRlciAvIG90aGVyICpmcm9tIGJlbG93KiwgYWRkIHRoaXNcclxuICAgIC8vIGludG8gdGhlIHJlc3VsdCwgYW5kIHN1YnRyYWN0IGl0IGZyb20gdGhlIHJlbWFpbmRlci4gIEl0IGlzIGNyaXRpY2FsIHRoYXRcclxuICAgIC8vIHRoZSBhcHByb3hpbWF0ZSB2YWx1ZSBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gdGhlIHJlYWwgdmFsdWUgc28gdGhhdCB0aGVcclxuICAgIC8vIHJlbWFpbmRlciBuZXZlciBiZWNvbWVzIG5lZ2F0aXZlLlxyXG4gICAgcmVtID0gdGhpcztcclxuICAgIHdoaWxlIChyZW0uZ3RlKGRpdmlzb3IpKSB7XHJcbiAgICAgICAgLy8gQXBwcm94aW1hdGUgdGhlIHJlc3VsdCBvZiBkaXZpc2lvbi4gVGhpcyBtYXkgYmUgYSBsaXR0bGUgZ3JlYXRlciBvclxyXG4gICAgICAgIC8vIHNtYWxsZXIgdGhhbiB0aGUgYWN0dWFsIHZhbHVlLlxyXG4gICAgICAgIGFwcHJveCA9IE1hdGgubWF4KDEsIE1hdGguZmxvb3IocmVtLnRvTnVtYmVyKCkgLyBkaXZpc29yLnRvTnVtYmVyKCkpKTtcclxuXHJcbiAgICAgICAgLy8gV2Ugd2lsbCB0d2VhayB0aGUgYXBwcm94aW1hdGUgcmVzdWx0IGJ5IGNoYW5naW5nIGl0IGluIHRoZSA0OC10aCBkaWdpdCBvclxyXG4gICAgICAgIC8vIHRoZSBzbWFsbGVzdCBub24tZnJhY3Rpb25hbCBkaWdpdCwgd2hpY2hldmVyIGlzIGxhcmdlci5cclxuICAgICAgICB2YXIgbG9nMiA9IE1hdGguY2VpbChNYXRoLmxvZyhhcHByb3gpIC8gTWF0aC5MTjIpLFxyXG4gICAgICAgICAgICBkZWx0YSA9IChsb2cyIDw9IDQ4KSA/IDEgOiBwb3dfZGJsKDIsIGxvZzIgLSA0OCksXHJcblxyXG4gICAgICAgIC8vIERlY3JlYXNlIHRoZSBhcHByb3hpbWF0aW9uIHVudGlsIGl0IGlzIHNtYWxsZXIgdGhhbiB0aGUgcmVtYWluZGVyLiAgTm90ZVxyXG4gICAgICAgIC8vIHRoYXQgaWYgaXQgaXMgdG9vIGxhcmdlLCB0aGUgcHJvZHVjdCBvdmVyZmxvd3MgYW5kIGlzIG5lZ2F0aXZlLlxyXG4gICAgICAgICAgICBhcHByb3hSZXMgPSBmcm9tTnVtYmVyKGFwcHJveCksXHJcbiAgICAgICAgICAgIGFwcHJveFJlbSA9IGFwcHJveFJlcy5tdWwoZGl2aXNvcik7XHJcbiAgICAgICAgd2hpbGUgKGFwcHJveFJlbS5pc05lZ2F0aXZlKCkgfHwgYXBwcm94UmVtLmd0KHJlbSkpIHtcclxuICAgICAgICAgICAgYXBwcm94IC09IGRlbHRhO1xyXG4gICAgICAgICAgICBhcHByb3hSZXMgPSBmcm9tTnVtYmVyKGFwcHJveCwgdGhpcy51bnNpZ25lZCk7XHJcbiAgICAgICAgICAgIGFwcHJveFJlbSA9IGFwcHJveFJlcy5tdWwoZGl2aXNvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBXZSBrbm93IHRoZSBhbnN3ZXIgY2FuJ3QgYmUgemVyby4uLiBhbmQgYWN0dWFsbHksIHplcm8gd291bGQgY2F1c2VcclxuICAgICAgICAvLyBpbmZpbml0ZSByZWN1cnNpb24gc2luY2Ugd2Ugd291bGQgbWFrZSBubyBwcm9ncmVzcy5cclxuICAgICAgICBpZiAoYXBwcm94UmVzLmlzWmVybygpKVxyXG4gICAgICAgICAgICBhcHByb3hSZXMgPSBPTkU7XHJcblxyXG4gICAgICAgIHJlcyA9IHJlcy5hZGQoYXBwcm94UmVzKTtcclxuICAgICAgICByZW0gPSByZW0uc3ViKGFwcHJveFJlbSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhpcyBMb25nIGRpdmlkZWQgYnkgdGhlIHNwZWNpZmllZC4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgTG9uZyNkaXZpZGV9LlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBkaXZpc29yIERpdmlzb3JcclxuICogQHJldHVybnMgeyFMb25nfSBRdW90aWVudFxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5kaXYgPSBMb25nUHJvdG90eXBlLmRpdmlkZTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoaXMgTG9uZyBtb2R1bG8gdGhlIHNwZWNpZmllZC5cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBkaXZpc29yIERpdmlzb3JcclxuICogQHJldHVybnMgeyFMb25nfSBSZW1haW5kZXJcclxuICovXHJcbkxvbmdQcm90b3R5cGUubW9kdWxvID0gZnVuY3Rpb24gbW9kdWxvKGRpdmlzb3IpIHtcclxuICAgIGlmICghaXNMb25nKGRpdmlzb3IpKVxyXG4gICAgICAgIGRpdmlzb3IgPSBmcm9tVmFsdWUoZGl2aXNvcik7XHJcblxyXG4gICAgLy8gdXNlIHdhc20gc3VwcG9ydCBpZiBwcmVzZW50XHJcbiAgICBpZiAod2FzbSkge1xyXG4gICAgICAgIHZhciBsb3cgPSAodGhpcy51bnNpZ25lZCA/IHdhc20ucmVtX3UgOiB3YXNtLnJlbV9zKShcclxuICAgICAgICAgICAgdGhpcy5sb3csXHJcbiAgICAgICAgICAgIHRoaXMuaGlnaCxcclxuICAgICAgICAgICAgZGl2aXNvci5sb3csXHJcbiAgICAgICAgICAgIGRpdmlzb3IuaGlnaFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuIGZyb21CaXRzKGxvdywgd2FzbS5nZXRfaGlnaCgpLCB0aGlzLnVuc2lnbmVkKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5zdWIodGhpcy5kaXYoZGl2aXNvcikubXVsKGRpdmlzb3IpKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoaXMgTG9uZyBtb2R1bG8gdGhlIHNwZWNpZmllZC4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgTG9uZyNtb2R1bG99LlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBkaXZpc29yIERpdmlzb3JcclxuICogQHJldHVybnMgeyFMb25nfSBSZW1haW5kZXJcclxuICovXHJcbkxvbmdQcm90b3R5cGUubW9kID0gTG9uZ1Byb3RvdHlwZS5tb2R1bG87XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGlzIExvbmcgbW9kdWxvIHRoZSBzcGVjaWZpZWQuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIExvbmcjbW9kdWxvfS5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gZGl2aXNvciBEaXZpc29yXHJcbiAqIEByZXR1cm5zIHshTG9uZ30gUmVtYWluZGVyXHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLnJlbSA9IExvbmdQcm90b3R5cGUubW9kdWxvO1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGJpdHdpc2UgTk9UIG9mIHRoaXMgTG9uZy5cclxuICogQHJldHVybnMgeyFMb25nfVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5ub3QgPSBmdW5jdGlvbiBub3QoKSB7XHJcbiAgICByZXR1cm4gZnJvbUJpdHMofnRoaXMubG93LCB+dGhpcy5oaWdoLCB0aGlzLnVuc2lnbmVkKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBiaXR3aXNlIEFORCBvZiB0aGlzIExvbmcgYW5kIHRoZSBzcGVjaWZpZWQuXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gb3RoZXIgT3RoZXIgTG9uZ1xyXG4gKiBAcmV0dXJucyB7IUxvbmd9XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmFuZCA9IGZ1bmN0aW9uIGFuZChvdGhlcikge1xyXG4gICAgaWYgKCFpc0xvbmcob3RoZXIpKVxyXG4gICAgICAgIG90aGVyID0gZnJvbVZhbHVlKG90aGVyKTtcclxuICAgIHJldHVybiBmcm9tQml0cyh0aGlzLmxvdyAmIG90aGVyLmxvdywgdGhpcy5oaWdoICYgb3RoZXIuaGlnaCwgdGhpcy51bnNpZ25lZCk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgYml0d2lzZSBPUiBvZiB0aGlzIExvbmcgYW5kIHRoZSBzcGVjaWZpZWQuXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gb3RoZXIgT3RoZXIgTG9uZ1xyXG4gKiBAcmV0dXJucyB7IUxvbmd9XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLm9yID0gZnVuY3Rpb24gb3Iob3RoZXIpIHtcclxuICAgIGlmICghaXNMb25nKG90aGVyKSlcclxuICAgICAgICBvdGhlciA9IGZyb21WYWx1ZShvdGhlcik7XHJcbiAgICByZXR1cm4gZnJvbUJpdHModGhpcy5sb3cgfCBvdGhlci5sb3csIHRoaXMuaGlnaCB8IG90aGVyLmhpZ2gsIHRoaXMudW5zaWduZWQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGJpdHdpc2UgWE9SIG9mIHRoaXMgTG9uZyBhbmQgdGhlIGdpdmVuIG9uZS5cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBvdGhlciBPdGhlciBMb25nXHJcbiAqIEByZXR1cm5zIHshTG9uZ31cclxuICovXHJcbkxvbmdQcm90b3R5cGUueG9yID0gZnVuY3Rpb24geG9yKG90aGVyKSB7XHJcbiAgICBpZiAoIWlzTG9uZyhvdGhlcikpXHJcbiAgICAgICAgb3RoZXIgPSBmcm9tVmFsdWUob3RoZXIpO1xyXG4gICAgcmV0dXJuIGZyb21CaXRzKHRoaXMubG93IF4gb3RoZXIubG93LCB0aGlzLmhpZ2ggXiBvdGhlci5oaWdoLCB0aGlzLnVuc2lnbmVkKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoaXMgTG9uZyB3aXRoIGJpdHMgc2hpZnRlZCB0byB0aGUgbGVmdCBieSB0aGUgZ2l2ZW4gYW1vdW50LlxyXG4gKiBAcGFyYW0ge251bWJlcnwhTG9uZ30gbnVtQml0cyBOdW1iZXIgb2YgYml0c1xyXG4gKiBAcmV0dXJucyB7IUxvbmd9IFNoaWZ0ZWQgTG9uZ1xyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5zaGlmdExlZnQgPSBmdW5jdGlvbiBzaGlmdExlZnQobnVtQml0cykge1xyXG4gICAgaWYgKGlzTG9uZyhudW1CaXRzKSlcclxuICAgICAgICBudW1CaXRzID0gbnVtQml0cy50b0ludCgpO1xyXG4gICAgaWYgKChudW1CaXRzICY9IDYzKSA9PT0gMClcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIGVsc2UgaWYgKG51bUJpdHMgPCAzMilcclxuICAgICAgICByZXR1cm4gZnJvbUJpdHModGhpcy5sb3cgPDwgbnVtQml0cywgKHRoaXMuaGlnaCA8PCBudW1CaXRzKSB8ICh0aGlzLmxvdyA+Pj4gKDMyIC0gbnVtQml0cykpLCB0aGlzLnVuc2lnbmVkKTtcclxuICAgIGVsc2VcclxuICAgICAgICByZXR1cm4gZnJvbUJpdHMoMCwgdGhpcy5sb3cgPDwgKG51bUJpdHMgLSAzMiksIHRoaXMudW5zaWduZWQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhpcyBMb25nIHdpdGggYml0cyBzaGlmdGVkIHRvIHRoZSBsZWZ0IGJ5IHRoZSBnaXZlbiBhbW91bnQuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIExvbmcjc2hpZnRMZWZ0fS5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7bnVtYmVyfCFMb25nfSBudW1CaXRzIE51bWJlciBvZiBiaXRzXHJcbiAqIEByZXR1cm5zIHshTG9uZ30gU2hpZnRlZCBMb25nXHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLnNobCA9IExvbmdQcm90b3R5cGUuc2hpZnRMZWZ0O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhpcyBMb25nIHdpdGggYml0cyBhcml0aG1ldGljYWxseSBzaGlmdGVkIHRvIHRoZSByaWdodCBieSB0aGUgZ2l2ZW4gYW1vdW50LlxyXG4gKiBAcGFyYW0ge251bWJlcnwhTG9uZ30gbnVtQml0cyBOdW1iZXIgb2YgYml0c1xyXG4gKiBAcmV0dXJucyB7IUxvbmd9IFNoaWZ0ZWQgTG9uZ1xyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5zaGlmdFJpZ2h0ID0gZnVuY3Rpb24gc2hpZnRSaWdodChudW1CaXRzKSB7XHJcbiAgICBpZiAoaXNMb25nKG51bUJpdHMpKVxyXG4gICAgICAgIG51bUJpdHMgPSBudW1CaXRzLnRvSW50KCk7XHJcbiAgICBpZiAoKG51bUJpdHMgJj0gNjMpID09PSAwKVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgZWxzZSBpZiAobnVtQml0cyA8IDMyKVxyXG4gICAgICAgIHJldHVybiBmcm9tQml0cygodGhpcy5sb3cgPj4+IG51bUJpdHMpIHwgKHRoaXMuaGlnaCA8PCAoMzIgLSBudW1CaXRzKSksIHRoaXMuaGlnaCA+PiBudW1CaXRzLCB0aGlzLnVuc2lnbmVkKTtcclxuICAgIGVsc2VcclxuICAgICAgICByZXR1cm4gZnJvbUJpdHModGhpcy5oaWdoID4+IChudW1CaXRzIC0gMzIpLCB0aGlzLmhpZ2ggPj0gMCA/IDAgOiAtMSwgdGhpcy51bnNpZ25lZCk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGlzIExvbmcgd2l0aCBiaXRzIGFyaXRobWV0aWNhbGx5IHNoaWZ0ZWQgdG8gdGhlIHJpZ2h0IGJ5IHRoZSBnaXZlbiBhbW91bnQuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIExvbmcjc2hpZnRSaWdodH0uXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge251bWJlcnwhTG9uZ30gbnVtQml0cyBOdW1iZXIgb2YgYml0c1xyXG4gKiBAcmV0dXJucyB7IUxvbmd9IFNoaWZ0ZWQgTG9uZ1xyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5zaHIgPSBMb25nUHJvdG90eXBlLnNoaWZ0UmlnaHQ7XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGlzIExvbmcgd2l0aCBiaXRzIGxvZ2ljYWxseSBzaGlmdGVkIHRvIHRoZSByaWdodCBieSB0aGUgZ2l2ZW4gYW1vdW50LlxyXG4gKiBAcGFyYW0ge251bWJlcnwhTG9uZ30gbnVtQml0cyBOdW1iZXIgb2YgYml0c1xyXG4gKiBAcmV0dXJucyB7IUxvbmd9IFNoaWZ0ZWQgTG9uZ1xyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5zaGlmdFJpZ2h0VW5zaWduZWQgPSBmdW5jdGlvbiBzaGlmdFJpZ2h0VW5zaWduZWQobnVtQml0cykge1xyXG4gICAgaWYgKGlzTG9uZyhudW1CaXRzKSlcclxuICAgICAgICBudW1CaXRzID0gbnVtQml0cy50b0ludCgpO1xyXG4gICAgbnVtQml0cyAmPSA2MztcclxuICAgIGlmIChudW1CaXRzID09PSAwKVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdmFyIGhpZ2ggPSB0aGlzLmhpZ2g7XHJcbiAgICAgICAgaWYgKG51bUJpdHMgPCAzMikge1xyXG4gICAgICAgICAgICB2YXIgbG93ID0gdGhpcy5sb3c7XHJcbiAgICAgICAgICAgIHJldHVybiBmcm9tQml0cygobG93ID4+PiBudW1CaXRzKSB8IChoaWdoIDw8ICgzMiAtIG51bUJpdHMpKSwgaGlnaCA+Pj4gbnVtQml0cywgdGhpcy51bnNpZ25lZCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChudW1CaXRzID09PSAzMilcclxuICAgICAgICAgICAgcmV0dXJuIGZyb21CaXRzKGhpZ2gsIDAsIHRoaXMudW5zaWduZWQpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIGZyb21CaXRzKGhpZ2ggPj4+IChudW1CaXRzIC0gMzIpLCAwLCB0aGlzLnVuc2lnbmVkKTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoaXMgTG9uZyB3aXRoIGJpdHMgbG9naWNhbGx5IHNoaWZ0ZWQgdG8gdGhlIHJpZ2h0IGJ5IHRoZSBnaXZlbiBhbW91bnQuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIExvbmcjc2hpZnRSaWdodFVuc2lnbmVkfS5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7bnVtYmVyfCFMb25nfSBudW1CaXRzIE51bWJlciBvZiBiaXRzXHJcbiAqIEByZXR1cm5zIHshTG9uZ30gU2hpZnRlZCBMb25nXHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLnNocnUgPSBMb25nUHJvdG90eXBlLnNoaWZ0UmlnaHRVbnNpZ25lZDtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoaXMgTG9uZyB3aXRoIGJpdHMgbG9naWNhbGx5IHNoaWZ0ZWQgdG8gdGhlIHJpZ2h0IGJ5IHRoZSBnaXZlbiBhbW91bnQuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIExvbmcjc2hpZnRSaWdodFVuc2lnbmVkfS5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7bnVtYmVyfCFMb25nfSBudW1CaXRzIE51bWJlciBvZiBiaXRzXHJcbiAqIEByZXR1cm5zIHshTG9uZ30gU2hpZnRlZCBMb25nXHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLnNocl91ID0gTG9uZ1Byb3RvdHlwZS5zaGlmdFJpZ2h0VW5zaWduZWQ7XHJcblxyXG4vKipcclxuICogQ29udmVydHMgdGhpcyBMb25nIHRvIHNpZ25lZC5cclxuICogQHJldHVybnMgeyFMb25nfSBTaWduZWQgbG9uZ1xyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS50b1NpZ25lZCA9IGZ1bmN0aW9uIHRvU2lnbmVkKCkge1xyXG4gICAgaWYgKCF0aGlzLnVuc2lnbmVkKVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgcmV0dXJuIGZyb21CaXRzKHRoaXMubG93LCB0aGlzLmhpZ2gsIGZhbHNlKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyB0aGlzIExvbmcgdG8gdW5zaWduZWQuXHJcbiAqIEByZXR1cm5zIHshTG9uZ30gVW5zaWduZWQgbG9uZ1xyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS50b1Vuc2lnbmVkID0gZnVuY3Rpb24gdG9VbnNpZ25lZCgpIHtcclxuICAgIGlmICh0aGlzLnVuc2lnbmVkKVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgcmV0dXJuIGZyb21CaXRzKHRoaXMubG93LCB0aGlzLmhpZ2gsIHRydWUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIHRoaXMgTG9uZyB0byBpdHMgYnl0ZSByZXByZXNlbnRhdGlvbi5cclxuICogQHBhcmFtIHtib29sZWFuPX0gbGUgV2hldGhlciBsaXR0bGUgb3IgYmlnIGVuZGlhbiwgZGVmYXVsdHMgdG8gYmlnIGVuZGlhblxyXG4gKiBAcmV0dXJucyB7IUFycmF5LjxudW1iZXI+fSBCeXRlIHJlcHJlc2VudGF0aW9uXHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLnRvQnl0ZXMgPSBmdW5jdGlvbiB0b0J5dGVzKGxlKSB7XHJcbiAgICByZXR1cm4gbGUgPyB0aGlzLnRvQnl0ZXNMRSgpIDogdGhpcy50b0J5dGVzQkUoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyB0aGlzIExvbmcgdG8gaXRzIGxpdHRsZSBlbmRpYW4gYnl0ZSByZXByZXNlbnRhdGlvbi5cclxuICogQHJldHVybnMgeyFBcnJheS48bnVtYmVyPn0gTGl0dGxlIGVuZGlhbiBieXRlIHJlcHJlc2VudGF0aW9uXHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLnRvQnl0ZXNMRSA9IGZ1bmN0aW9uIHRvQnl0ZXNMRSgpIHtcclxuICAgIHZhciBoaSA9IHRoaXMuaGlnaCxcclxuICAgICAgICBsbyA9IHRoaXMubG93O1xyXG4gICAgcmV0dXJuIFtcclxuICAgICAgICBsbyAgICAgICAgJiAweGZmLFxyXG4gICAgICAgIGxvID4+PiAgOCAmIDB4ZmYsXHJcbiAgICAgICAgbG8gPj4+IDE2ICYgMHhmZixcclxuICAgICAgICBsbyA+Pj4gMjQgICAgICAgLFxyXG4gICAgICAgIGhpICAgICAgICAmIDB4ZmYsXHJcbiAgICAgICAgaGkgPj4+ICA4ICYgMHhmZixcclxuICAgICAgICBoaSA+Pj4gMTYgJiAweGZmLFxyXG4gICAgICAgIGhpID4+PiAyNFxyXG4gICAgXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyB0aGlzIExvbmcgdG8gaXRzIGJpZyBlbmRpYW4gYnl0ZSByZXByZXNlbnRhdGlvbi5cclxuICogQHJldHVybnMgeyFBcnJheS48bnVtYmVyPn0gQmlnIGVuZGlhbiBieXRlIHJlcHJlc2VudGF0aW9uXHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLnRvQnl0ZXNCRSA9IGZ1bmN0aW9uIHRvQnl0ZXNCRSgpIHtcclxuICAgIHZhciBoaSA9IHRoaXMuaGlnaCxcclxuICAgICAgICBsbyA9IHRoaXMubG93O1xyXG4gICAgcmV0dXJuIFtcclxuICAgICAgICBoaSA+Pj4gMjQgICAgICAgLFxyXG4gICAgICAgIGhpID4+PiAxNiAmIDB4ZmYsXHJcbiAgICAgICAgaGkgPj4+ICA4ICYgMHhmZixcclxuICAgICAgICBoaSAgICAgICAgJiAweGZmLFxyXG4gICAgICAgIGxvID4+PiAyNCAgICAgICAsXHJcbiAgICAgICAgbG8gPj4+IDE2ICYgMHhmZixcclxuICAgICAgICBsbyA+Pj4gIDggJiAweGZmLFxyXG4gICAgICAgIGxvICAgICAgICAmIDB4ZmZcclxuICAgIF07XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIExvbmcgZnJvbSBpdHMgYnl0ZSByZXByZXNlbnRhdGlvbi5cclxuICogQHBhcmFtIHshQXJyYXkuPG51bWJlcj59IGJ5dGVzIEJ5dGUgcmVwcmVzZW50YXRpb25cclxuICogQHBhcmFtIHtib29sZWFuPX0gdW5zaWduZWQgV2hldGhlciB1bnNpZ25lZCBvciBub3QsIGRlZmF1bHRzIHRvIHNpZ25lZFxyXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBsZSBXaGV0aGVyIGxpdHRsZSBvciBiaWcgZW5kaWFuLCBkZWZhdWx0cyB0byBiaWcgZW5kaWFuXHJcbiAqIEByZXR1cm5zIHtMb25nfSBUaGUgY29ycmVzcG9uZGluZyBMb25nIHZhbHVlXHJcbiAqL1xyXG5Mb25nLmZyb21CeXRlcyA9IGZ1bmN0aW9uIGZyb21CeXRlcyhieXRlcywgdW5zaWduZWQsIGxlKSB7XHJcbiAgICByZXR1cm4gbGUgPyBMb25nLmZyb21CeXRlc0xFKGJ5dGVzLCB1bnNpZ25lZCkgOiBMb25nLmZyb21CeXRlc0JFKGJ5dGVzLCB1bnNpZ25lZCk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIExvbmcgZnJvbSBpdHMgbGl0dGxlIGVuZGlhbiBieXRlIHJlcHJlc2VudGF0aW9uLlxyXG4gKiBAcGFyYW0geyFBcnJheS48bnVtYmVyPn0gYnl0ZXMgTGl0dGxlIGVuZGlhbiBieXRlIHJlcHJlc2VudGF0aW9uXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IHVuc2lnbmVkIFdoZXRoZXIgdW5zaWduZWQgb3Igbm90LCBkZWZhdWx0cyB0byBzaWduZWRcclxuICogQHJldHVybnMge0xvbmd9IFRoZSBjb3JyZXNwb25kaW5nIExvbmcgdmFsdWVcclxuICovXHJcbkxvbmcuZnJvbUJ5dGVzTEUgPSBmdW5jdGlvbiBmcm9tQnl0ZXNMRShieXRlcywgdW5zaWduZWQpIHtcclxuICAgIHJldHVybiBuZXcgTG9uZyhcclxuICAgICAgICBieXRlc1swXSAgICAgICB8XHJcbiAgICAgICAgYnl0ZXNbMV0gPDwgIDggfFxyXG4gICAgICAgIGJ5dGVzWzJdIDw8IDE2IHxcclxuICAgICAgICBieXRlc1szXSA8PCAyNCxcclxuICAgICAgICBieXRlc1s0XSAgICAgICB8XHJcbiAgICAgICAgYnl0ZXNbNV0gPDwgIDggfFxyXG4gICAgICAgIGJ5dGVzWzZdIDw8IDE2IHxcclxuICAgICAgICBieXRlc1s3XSA8PCAyNCxcclxuICAgICAgICB1bnNpZ25lZFxyXG4gICAgKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgTG9uZyBmcm9tIGl0cyBiaWcgZW5kaWFuIGJ5dGUgcmVwcmVzZW50YXRpb24uXHJcbiAqIEBwYXJhbSB7IUFycmF5LjxudW1iZXI+fSBieXRlcyBCaWcgZW5kaWFuIGJ5dGUgcmVwcmVzZW50YXRpb25cclxuICogQHBhcmFtIHtib29sZWFuPX0gdW5zaWduZWQgV2hldGhlciB1bnNpZ25lZCBvciBub3QsIGRlZmF1bHRzIHRvIHNpZ25lZFxyXG4gKiBAcmV0dXJucyB7TG9uZ30gVGhlIGNvcnJlc3BvbmRpbmcgTG9uZyB2YWx1ZVxyXG4gKi9cclxuTG9uZy5mcm9tQnl0ZXNCRSA9IGZ1bmN0aW9uIGZyb21CeXRlc0JFKGJ5dGVzLCB1bnNpZ25lZCkge1xyXG4gICAgcmV0dXJuIG5ldyBMb25nKFxyXG4gICAgICAgIGJ5dGVzWzRdIDw8IDI0IHxcclxuICAgICAgICBieXRlc1s1XSA8PCAxNiB8XHJcbiAgICAgICAgYnl0ZXNbNl0gPDwgIDggfFxyXG4gICAgICAgIGJ5dGVzWzddLFxyXG4gICAgICAgIGJ5dGVzWzBdIDw8IDI0IHxcclxuICAgICAgICBieXRlc1sxXSA8PCAxNiB8XHJcbiAgICAgICAgYnl0ZXNbMl0gPDwgIDggfFxyXG4gICAgICAgIGJ5dGVzWzNdLFxyXG4gICAgICAgIHVuc2lnbmVkXHJcbiAgICApO1xyXG59O1xyXG4iLCIvLyBtaW5pbWFsIGxpYnJhcnkgZW50cnkgcG9pbnQuXG5cblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9zcmMvaW5kZXgtbWluaW1hbFwiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIHByb3RvYnVmID0gZXhwb3J0cztcblxuLyoqXG4gKiBCdWlsZCB0eXBlLCBvbmUgb2YgYFwiZnVsbFwiYCwgYFwibGlnaHRcImAgb3IgYFwibWluaW1hbFwiYC5cbiAqIEBuYW1lIGJ1aWxkXG4gKiBAdHlwZSB7c3RyaW5nfVxuICogQGNvbnN0XG4gKi9cbnByb3RvYnVmLmJ1aWxkID0gXCJtaW5pbWFsXCI7XG5cbi8vIFNlcmlhbGl6YXRpb25cbnByb3RvYnVmLldyaXRlciAgICAgICA9IHJlcXVpcmUoXCIuL3dyaXRlclwiKTtcbnByb3RvYnVmLkJ1ZmZlcldyaXRlciA9IHJlcXVpcmUoXCIuL3dyaXRlcl9idWZmZXJcIik7XG5wcm90b2J1Zi5SZWFkZXIgICAgICAgPSByZXF1aXJlKFwiLi9yZWFkZXJcIik7XG5wcm90b2J1Zi5CdWZmZXJSZWFkZXIgPSByZXF1aXJlKFwiLi9yZWFkZXJfYnVmZmVyXCIpO1xuXG4vLyBVdGlsaXR5XG5wcm90b2J1Zi51dGlsICAgICAgICAgPSByZXF1aXJlKFwiLi91dGlsL21pbmltYWxcIik7XG5wcm90b2J1Zi5ycGMgICAgICAgICAgPSByZXF1aXJlKFwiLi9ycGNcIik7XG5wcm90b2J1Zi5yb290cyAgICAgICAgPSByZXF1aXJlKFwiLi9yb290c1wiKTtcbnByb3RvYnVmLmNvbmZpZ3VyZSAgICA9IGNvbmZpZ3VyZTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbi8qKlxuICogUmVjb25maWd1cmVzIHRoZSBsaWJyYXJ5IGFjY29yZGluZyB0byB0aGUgZW52aXJvbm1lbnQuXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICovXG5mdW5jdGlvbiBjb25maWd1cmUoKSB7XG4gICAgcHJvdG9idWYudXRpbC5fY29uZmlndXJlKCk7XG4gICAgcHJvdG9idWYuV3JpdGVyLl9jb25maWd1cmUocHJvdG9idWYuQnVmZmVyV3JpdGVyKTtcbiAgICBwcm90b2J1Zi5SZWFkZXIuX2NvbmZpZ3VyZShwcm90b2J1Zi5CdWZmZXJSZWFkZXIpO1xufVxuXG4vLyBTZXQgdXAgYnVmZmVyIHV0aWxpdHkgYWNjb3JkaW5nIHRvIHRoZSBlbnZpcm9ubWVudFxuY29uZmlndXJlKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gUmVhZGVyO1xuXG52YXIgdXRpbCAgICAgID0gcmVxdWlyZShcIi4vdXRpbC9taW5pbWFsXCIpO1xuXG52YXIgQnVmZmVyUmVhZGVyOyAvLyBjeWNsaWNcblxudmFyIExvbmdCaXRzICA9IHV0aWwuTG9uZ0JpdHMsXG4gICAgdXRmOCAgICAgID0gdXRpbC51dGY4O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuZnVuY3Rpb24gaW5kZXhPdXRPZlJhbmdlKHJlYWRlciwgd3JpdGVMZW5ndGgpIHtcbiAgICByZXR1cm4gUmFuZ2VFcnJvcihcImluZGV4IG91dCBvZiByYW5nZTogXCIgKyByZWFkZXIucG9zICsgXCIgKyBcIiArICh3cml0ZUxlbmd0aCB8fCAxKSArIFwiID4gXCIgKyByZWFkZXIubGVuKTtcbn1cblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IHJlYWRlciBpbnN0YW5jZSB1c2luZyB0aGUgc3BlY2lmaWVkIGJ1ZmZlci5cbiAqIEBjbGFzc2Rlc2MgV2lyZSBmb3JtYXQgcmVhZGVyIHVzaW5nIGBVaW50OEFycmF5YCBpZiBhdmFpbGFibGUsIG90aGVyd2lzZSBgQXJyYXlgLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZmZlciBCdWZmZXIgdG8gcmVhZCBmcm9tXG4gKi9cbmZ1bmN0aW9uIFJlYWRlcihidWZmZXIpIHtcblxuICAgIC8qKlxuICAgICAqIFJlYWQgYnVmZmVyLlxuICAgICAqIEB0eXBlIHtVaW50OEFycmF5fVxuICAgICAqL1xuICAgIHRoaXMuYnVmID0gYnVmZmVyO1xuXG4gICAgLyoqXG4gICAgICogUmVhZCBidWZmZXIgcG9zaXRpb24uXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLnBvcyA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBSZWFkIGJ1ZmZlciBsZW5ndGguXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLmxlbiA9IGJ1ZmZlci5sZW5ndGg7XG59XG5cbnZhciBjcmVhdGVfYXJyYXkgPSB0eXBlb2YgVWludDhBcnJheSAhPT0gXCJ1bmRlZmluZWRcIlxuICAgID8gZnVuY3Rpb24gY3JlYXRlX3R5cGVkX2FycmF5KGJ1ZmZlcikge1xuICAgICAgICBpZiAoYnVmZmVyIGluc3RhbmNlb2YgVWludDhBcnJheSB8fCBBcnJheS5pc0FycmF5KGJ1ZmZlcikpXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlYWRlcihidWZmZXIpO1xuICAgICAgICB0aHJvdyBFcnJvcihcImlsbGVnYWwgYnVmZmVyXCIpO1xuICAgIH1cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIDogZnVuY3Rpb24gY3JlYXRlX2FycmF5KGJ1ZmZlcikge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShidWZmZXIpKVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWFkZXIoYnVmZmVyKTtcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJpbGxlZ2FsIGJ1ZmZlclwiKTtcbiAgICB9O1xuXG52YXIgY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgIHJldHVybiB1dGlsLkJ1ZmZlclxuICAgICAgICA/IGZ1bmN0aW9uIGNyZWF0ZV9idWZmZXJfc2V0dXAoYnVmZmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gKFJlYWRlci5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGVfYnVmZmVyKGJ1ZmZlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB1dGlsLkJ1ZmZlci5pc0J1ZmZlcihidWZmZXIpXG4gICAgICAgICAgICAgICAgICAgID8gbmV3IEJ1ZmZlclJlYWRlcihidWZmZXIpXG4gICAgICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgICAgICAgICAgICAgIDogY3JlYXRlX2FycmF5KGJ1ZmZlcik7XG4gICAgICAgICAgICB9KShidWZmZXIpO1xuICAgICAgICB9XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIDogY3JlYXRlX2FycmF5O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHJlYWRlciB1c2luZyB0aGUgc3BlY2lmaWVkIGJ1ZmZlci5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtVaW50OEFycmF5fEJ1ZmZlcn0gYnVmZmVyIEJ1ZmZlciB0byByZWFkIGZyb21cbiAqIEByZXR1cm5zIHtSZWFkZXJ8QnVmZmVyUmVhZGVyfSBBIHtAbGluayBCdWZmZXJSZWFkZXJ9IGlmIGBidWZmZXJgIGlzIGEgQnVmZmVyLCBvdGhlcndpc2UgYSB7QGxpbmsgUmVhZGVyfVxuICogQHRocm93cyB7RXJyb3J9IElmIGBidWZmZXJgIGlzIG5vdCBhIHZhbGlkIGJ1ZmZlclxuICovXG5SZWFkZXIuY3JlYXRlID0gY3JlYXRlKCk7XG5cblJlYWRlci5wcm90b3R5cGUuX3NsaWNlID0gdXRpbC5BcnJheS5wcm90b3R5cGUuc3ViYXJyYXkgfHwgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gdXRpbC5BcnJheS5wcm90b3R5cGUuc2xpY2U7XG5cbi8qKlxuICogUmVhZHMgYSB2YXJpbnQgYXMgYW4gdW5zaWduZWQgMzIgYml0IHZhbHVlLlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXG4gKi9cblJlYWRlci5wcm90b3R5cGUudWludDMyID0gKGZ1bmN0aW9uIHJlYWRfdWludDMyX3NldHVwKCkge1xuICAgIHZhciB2YWx1ZSA9IDQyOTQ5NjcyOTU7IC8vIG9wdGltaXplciB0eXBlLWhpbnQsIHRlbmRzIHRvIGRlb3B0IG90aGVyd2lzZSAoPyEpXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHJlYWRfdWludDMyKCkge1xuICAgICAgICB2YWx1ZSA9ICggICAgICAgICB0aGlzLmJ1Zlt0aGlzLnBvc10gJiAxMjcgICAgICAgKSA+Pj4gMDsgaWYgKHRoaXMuYnVmW3RoaXMucG9zKytdIDwgMTI4KSByZXR1cm4gdmFsdWU7XG4gICAgICAgIHZhbHVlID0gKHZhbHVlIHwgKHRoaXMuYnVmW3RoaXMucG9zXSAmIDEyNykgPDwgIDcpID4+PiAwOyBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpIHJldHVybiB2YWx1ZTtcbiAgICAgICAgdmFsdWUgPSAodmFsdWUgfCAodGhpcy5idWZbdGhpcy5wb3NdICYgMTI3KSA8PCAxNCkgPj4+IDA7IGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOCkgcmV0dXJuIHZhbHVlO1xuICAgICAgICB2YWx1ZSA9ICh2YWx1ZSB8ICh0aGlzLmJ1Zlt0aGlzLnBvc10gJiAxMjcpIDw8IDIxKSA+Pj4gMDsgaWYgKHRoaXMuYnVmW3RoaXMucG9zKytdIDwgMTI4KSByZXR1cm4gdmFsdWU7XG4gICAgICAgIHZhbHVlID0gKHZhbHVlIHwgKHRoaXMuYnVmW3RoaXMucG9zXSAmICAxNSkgPDwgMjgpID4+PiAwOyBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpIHJldHVybiB2YWx1ZTtcblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKCh0aGlzLnBvcyArPSA1KSA+IHRoaXMubGVuKSB7XG4gICAgICAgICAgICB0aGlzLnBvcyA9IHRoaXMubGVuO1xuICAgICAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMsIDEwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbn0pKCk7XG5cbi8qKlxuICogUmVhZHMgYSB2YXJpbnQgYXMgYSBzaWduZWQgMzIgYml0IHZhbHVlLlxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxuICovXG5SZWFkZXIucHJvdG90eXBlLmludDMyID0gZnVuY3Rpb24gcmVhZF9pbnQzMigpIHtcbiAgICByZXR1cm4gdGhpcy51aW50MzIoKSB8IDA7XG59O1xuXG4vKipcbiAqIFJlYWRzIGEgemlnLXphZyBlbmNvZGVkIHZhcmludCBhcyBhIHNpZ25lZCAzMiBiaXQgdmFsdWUuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXG4gKi9cblJlYWRlci5wcm90b3R5cGUuc2ludDMyID0gZnVuY3Rpb24gcmVhZF9zaW50MzIoKSB7XG4gICAgdmFyIHZhbHVlID0gdGhpcy51aW50MzIoKTtcbiAgICByZXR1cm4gdmFsdWUgPj4+IDEgXiAtKHZhbHVlICYgMSkgfCAwO1xufTtcblxuLyogZXNsaW50LWRpc2FibGUgbm8taW52YWxpZC10aGlzICovXG5cbmZ1bmN0aW9uIHJlYWRMb25nVmFyaW50KCkge1xuICAgIC8vIHRlbmRzIHRvIGRlb3B0IHdpdGggbG9jYWwgdmFycyBmb3Igb2N0ZXQgZXRjLlxuICAgIHZhciBiaXRzID0gbmV3IExvbmdCaXRzKDAsIDApO1xuICAgIHZhciBpID0gMDtcbiAgICBpZiAodGhpcy5sZW4gLSB0aGlzLnBvcyA+IDQpIHsgLy8gZmFzdCByb3V0ZSAobG8pXG4gICAgICAgIGZvciAoOyBpIDwgNDsgKytpKSB7XG4gICAgICAgICAgICAvLyAxc3QuLjR0aFxuICAgICAgICAgICAgYml0cy5sbyA9IChiaXRzLmxvIHwgKHRoaXMuYnVmW3RoaXMucG9zXSAmIDEyNykgPDwgaSAqIDcpID4+PiAwO1xuICAgICAgICAgICAgaWYgKHRoaXMuYnVmW3RoaXMucG9zKytdIDwgMTI4KVxuICAgICAgICAgICAgICAgIHJldHVybiBiaXRzO1xuICAgICAgICB9XG4gICAgICAgIC8vIDV0aFxuICAgICAgICBiaXRzLmxvID0gKGJpdHMubG8gfCAodGhpcy5idWZbdGhpcy5wb3NdICYgMTI3KSA8PCAyOCkgPj4+IDA7XG4gICAgICAgIGJpdHMuaGkgPSAoYml0cy5oaSB8ICh0aGlzLmJ1Zlt0aGlzLnBvc10gJiAxMjcpID4+ICA0KSA+Pj4gMDtcbiAgICAgICAgaWYgKHRoaXMuYnVmW3RoaXMucG9zKytdIDwgMTI4KVxuICAgICAgICAgICAgcmV0dXJuIGJpdHM7XG4gICAgICAgIGkgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAoOyBpIDwgMzsgKytpKSB7XG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgICAgIGlmICh0aGlzLnBvcyA+PSB0aGlzLmxlbilcbiAgICAgICAgICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcyk7XG4gICAgICAgICAgICAvLyAxc3QuLjN0aFxuICAgICAgICAgICAgYml0cy5sbyA9IChiaXRzLmxvIHwgKHRoaXMuYnVmW3RoaXMucG9zXSAmIDEyNykgPDwgaSAqIDcpID4+PiAwO1xuICAgICAgICAgICAgaWYgKHRoaXMuYnVmW3RoaXMucG9zKytdIDwgMTI4KVxuICAgICAgICAgICAgICAgIHJldHVybiBiaXRzO1xuICAgICAgICB9XG4gICAgICAgIC8vIDR0aFxuICAgICAgICBiaXRzLmxvID0gKGJpdHMubG8gfCAodGhpcy5idWZbdGhpcy5wb3MrK10gJiAxMjcpIDw8IGkgKiA3KSA+Pj4gMDtcbiAgICAgICAgcmV0dXJuIGJpdHM7XG4gICAgfVxuICAgIGlmICh0aGlzLmxlbiAtIHRoaXMucG9zID4gNCkgeyAvLyBmYXN0IHJvdXRlIChoaSlcbiAgICAgICAgZm9yICg7IGkgPCA1OyArK2kpIHtcbiAgICAgICAgICAgIC8vIDZ0aC4uMTB0aFxuICAgICAgICAgICAgYml0cy5oaSA9IChiaXRzLmhpIHwgKHRoaXMuYnVmW3RoaXMucG9zXSAmIDEyNykgPDwgaSAqIDcgKyAzKSA+Pj4gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOClcbiAgICAgICAgICAgICAgICByZXR1cm4gYml0cztcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAoOyBpIDwgNTsgKytpKSB7XG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgICAgIGlmICh0aGlzLnBvcyA+PSB0aGlzLmxlbilcbiAgICAgICAgICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcyk7XG4gICAgICAgICAgICAvLyA2dGguLjEwdGhcbiAgICAgICAgICAgIGJpdHMuaGkgPSAoYml0cy5oaSB8ICh0aGlzLmJ1Zlt0aGlzLnBvc10gJiAxMjcpIDw8IGkgKiA3ICsgMykgPj4+IDA7XG4gICAgICAgICAgICBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpdHM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICB0aHJvdyBFcnJvcihcImludmFsaWQgdmFyaW50IGVuY29kaW5nXCIpO1xufVxuXG4vKiBlc2xpbnQtZW5hYmxlIG5vLWludmFsaWQtdGhpcyAqL1xuXG4vKipcbiAqIFJlYWRzIGEgdmFyaW50IGFzIGEgc2lnbmVkIDY0IGJpdCB2YWx1ZS5cbiAqIEBuYW1lIFJlYWRlciNpbnQ2NFxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7TG9uZ30gVmFsdWUgcmVhZFxuICovXG5cbi8qKlxuICogUmVhZHMgYSB2YXJpbnQgYXMgYW4gdW5zaWduZWQgNjQgYml0IHZhbHVlLlxuICogQG5hbWUgUmVhZGVyI3VpbnQ2NFxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7TG9uZ30gVmFsdWUgcmVhZFxuICovXG5cbi8qKlxuICogUmVhZHMgYSB6aWctemFnIGVuY29kZWQgdmFyaW50IGFzIGEgc2lnbmVkIDY0IGJpdCB2YWx1ZS5cbiAqIEBuYW1lIFJlYWRlciNzaW50NjRcbiAqIEBmdW5jdGlvblxuICogQHJldHVybnMge0xvbmd9IFZhbHVlIHJlYWRcbiAqL1xuXG4vKipcbiAqIFJlYWRzIGEgdmFyaW50IGFzIGEgYm9vbGVhbi5cbiAqIEByZXR1cm5zIHtib29sZWFufSBWYWx1ZSByZWFkXG4gKi9cblJlYWRlci5wcm90b3R5cGUuYm9vbCA9IGZ1bmN0aW9uIHJlYWRfYm9vbCgpIHtcbiAgICByZXR1cm4gdGhpcy51aW50MzIoKSAhPT0gMDtcbn07XG5cbmZ1bmN0aW9uIHJlYWRGaXhlZDMyX2VuZChidWYsIGVuZCkgeyAvLyBub3RlIHRoYXQgdGhpcyB1c2VzIGBlbmRgLCBub3QgYHBvc2BcbiAgICByZXR1cm4gKGJ1ZltlbmQgLSA0XVxuICAgICAgICAgIHwgYnVmW2VuZCAtIDNdIDw8IDhcbiAgICAgICAgICB8IGJ1ZltlbmQgLSAyXSA8PCAxNlxuICAgICAgICAgIHwgYnVmW2VuZCAtIDFdIDw8IDI0KSA+Pj4gMDtcbn1cblxuLyoqXG4gKiBSZWFkcyBmaXhlZCAzMiBiaXRzIGFzIGFuIHVuc2lnbmVkIDMyIGJpdCBpbnRlZ2VyLlxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxuICovXG5SZWFkZXIucHJvdG90eXBlLmZpeGVkMzIgPSBmdW5jdGlvbiByZWFkX2ZpeGVkMzIoKSB7XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAodGhpcy5wb3MgKyA0ID4gdGhpcy5sZW4pXG4gICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzLCA0KTtcblxuICAgIHJldHVybiByZWFkRml4ZWQzMl9lbmQodGhpcy5idWYsIHRoaXMucG9zICs9IDQpO1xufTtcblxuLyoqXG4gKiBSZWFkcyBmaXhlZCAzMiBiaXRzIGFzIGEgc2lnbmVkIDMyIGJpdCBpbnRlZ2VyLlxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxuICovXG5SZWFkZXIucHJvdG90eXBlLnNmaXhlZDMyID0gZnVuY3Rpb24gcmVhZF9zZml4ZWQzMigpIHtcblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICh0aGlzLnBvcyArIDQgPiB0aGlzLmxlbilcbiAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMsIDQpO1xuXG4gICAgcmV0dXJuIHJlYWRGaXhlZDMyX2VuZCh0aGlzLmJ1ZiwgdGhpcy5wb3MgKz0gNCkgfCAwO1xufTtcblxuLyogZXNsaW50LWRpc2FibGUgbm8taW52YWxpZC10aGlzICovXG5cbmZ1bmN0aW9uIHJlYWRGaXhlZDY0KC8qIHRoaXM6IFJlYWRlciAqLykge1xuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKHRoaXMucG9zICsgOCA+IHRoaXMubGVuKVxuICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcywgOCk7XG5cbiAgICByZXR1cm4gbmV3IExvbmdCaXRzKHJlYWRGaXhlZDMyX2VuZCh0aGlzLmJ1ZiwgdGhpcy5wb3MgKz0gNCksIHJlYWRGaXhlZDMyX2VuZCh0aGlzLmJ1ZiwgdGhpcy5wb3MgKz0gNCkpO1xufVxuXG4vKiBlc2xpbnQtZW5hYmxlIG5vLWludmFsaWQtdGhpcyAqL1xuXG4vKipcbiAqIFJlYWRzIGZpeGVkIDY0IGJpdHMuXG4gKiBAbmFtZSBSZWFkZXIjZml4ZWQ2NFxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7TG9uZ30gVmFsdWUgcmVhZFxuICovXG5cbi8qKlxuICogUmVhZHMgemlnLXphZyBlbmNvZGVkIGZpeGVkIDY0IGJpdHMuXG4gKiBAbmFtZSBSZWFkZXIjc2ZpeGVkNjRcbiAqIEBmdW5jdGlvblxuICogQHJldHVybnMge0xvbmd9IFZhbHVlIHJlYWRcbiAqL1xuXG4vKipcbiAqIFJlYWRzIGEgZmxvYXQgKDMyIGJpdCkgYXMgYSBudW1iZXIuXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS5mbG9hdCA9IGZ1bmN0aW9uIHJlYWRfZmxvYXQoKSB7XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAodGhpcy5wb3MgKyA0ID4gdGhpcy5sZW4pXG4gICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzLCA0KTtcblxuICAgIHZhciB2YWx1ZSA9IHV0aWwuZmxvYXQucmVhZEZsb2F0TEUodGhpcy5idWYsIHRoaXMucG9zKTtcbiAgICB0aGlzLnBvcyArPSA0O1xuICAgIHJldHVybiB2YWx1ZTtcbn07XG5cbi8qKlxuICogUmVhZHMgYSBkb3VibGUgKDY0IGJpdCBmbG9hdCkgYXMgYSBudW1iZXIuXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS5kb3VibGUgPSBmdW5jdGlvbiByZWFkX2RvdWJsZSgpIHtcblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICh0aGlzLnBvcyArIDggPiB0aGlzLmxlbilcbiAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMsIDQpO1xuXG4gICAgdmFyIHZhbHVlID0gdXRpbC5mbG9hdC5yZWFkRG91YmxlTEUodGhpcy5idWYsIHRoaXMucG9zKTtcbiAgICB0aGlzLnBvcyArPSA4O1xuICAgIHJldHVybiB2YWx1ZTtcbn07XG5cbi8qKlxuICogUmVhZHMgYSBzZXF1ZW5jZSBvZiBieXRlcyBwcmVjZWVkZWQgYnkgaXRzIGxlbmd0aCBhcyBhIHZhcmludC5cbiAqIEByZXR1cm5zIHtVaW50OEFycmF5fSBWYWx1ZSByZWFkXG4gKi9cblJlYWRlci5wcm90b3R5cGUuYnl0ZXMgPSBmdW5jdGlvbiByZWFkX2J5dGVzKCkge1xuICAgIHZhciBsZW5ndGggPSB0aGlzLnVpbnQzMigpLFxuICAgICAgICBzdGFydCAgPSB0aGlzLnBvcyxcbiAgICAgICAgZW5kICAgID0gdGhpcy5wb3MgKyBsZW5ndGg7XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoZW5kID4gdGhpcy5sZW4pXG4gICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzLCBsZW5ndGgpO1xuXG4gICAgdGhpcy5wb3MgKz0gbGVuZ3RoO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuYnVmKSkgLy8gcGxhaW4gYXJyYXlcbiAgICAgICAgcmV0dXJuIHRoaXMuYnVmLnNsaWNlKHN0YXJ0LCBlbmQpO1xuICAgIHJldHVybiBzdGFydCA9PT0gZW5kIC8vIGZpeCBmb3IgSUUgMTAvV2luOCBhbmQgb3RoZXJzJyBzdWJhcnJheSByZXR1cm5pbmcgYXJyYXkgb2Ygc2l6ZSAxXG4gICAgICAgID8gbmV3IHRoaXMuYnVmLmNvbnN0cnVjdG9yKDApXG4gICAgICAgIDogdGhpcy5fc2xpY2UuY2FsbCh0aGlzLmJ1Ziwgc3RhcnQsIGVuZCk7XG59O1xuXG4vKipcbiAqIFJlYWRzIGEgc3RyaW5nIHByZWNlZWRlZCBieSBpdHMgYnl0ZSBsZW5ndGggYXMgYSB2YXJpbnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBWYWx1ZSByZWFkXG4gKi9cblJlYWRlci5wcm90b3R5cGUuc3RyaW5nID0gZnVuY3Rpb24gcmVhZF9zdHJpbmcoKSB7XG4gICAgdmFyIGJ5dGVzID0gdGhpcy5ieXRlcygpO1xuICAgIHJldHVybiB1dGY4LnJlYWQoYnl0ZXMsIDAsIGJ5dGVzLmxlbmd0aCk7XG59O1xuXG4vKipcbiAqIFNraXBzIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIGJ5dGVzIGlmIHNwZWNpZmllZCwgb3RoZXJ3aXNlIHNraXBzIGEgdmFyaW50LlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGhdIExlbmd0aCBpZiBrbm93biwgb3RoZXJ3aXNlIGEgdmFyaW50IGlzIGFzc3VtZWRcbiAqIEByZXR1cm5zIHtSZWFkZXJ9IGB0aGlzYFxuICovXG5SZWFkZXIucHJvdG90eXBlLnNraXAgPSBmdW5jdGlvbiBza2lwKGxlbmd0aCkge1xuICAgIGlmICh0eXBlb2YgbGVuZ3RoID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAodGhpcy5wb3MgKyBsZW5ndGggPiB0aGlzLmxlbilcbiAgICAgICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzLCBsZW5ndGgpO1xuICAgICAgICB0aGlzLnBvcyArPSBsZW5ndGg7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgICAgICBpZiAodGhpcy5wb3MgPj0gdGhpcy5sZW4pXG4gICAgICAgICAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMpO1xuICAgICAgICB9IHdoaWxlICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSAmIDEyOCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTa2lwcyB0aGUgbmV4dCBlbGVtZW50IG9mIHRoZSBzcGVjaWZpZWQgd2lyZSB0eXBlLlxuICogQHBhcmFtIHtudW1iZXJ9IHdpcmVUeXBlIFdpcmUgdHlwZSByZWNlaXZlZFxuICogQHJldHVybnMge1JlYWRlcn0gYHRoaXNgXG4gKi9cblJlYWRlci5wcm90b3R5cGUuc2tpcFR5cGUgPSBmdW5jdGlvbih3aXJlVHlwZSkge1xuICAgIHN3aXRjaCAod2lyZVR5cGUpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgdGhpcy5za2lwKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgdGhpcy5za2lwKDgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIHRoaXMuc2tpcCh0aGlzLnVpbnQzMigpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICB3aGlsZSAoKHdpcmVUeXBlID0gdGhpcy51aW50MzIoKSAmIDcpICE9PSA0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5za2lwVHlwZSh3aXJlVHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgdGhpcy5za2lwKDQpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IEVycm9yKFwiaW52YWxpZCB3aXJlIHR5cGUgXCIgKyB3aXJlVHlwZSArIFwiIGF0IG9mZnNldCBcIiArIHRoaXMucG9zKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG5SZWFkZXIuX2NvbmZpZ3VyZSA9IGZ1bmN0aW9uKEJ1ZmZlclJlYWRlcl8pIHtcbiAgICBCdWZmZXJSZWFkZXIgPSBCdWZmZXJSZWFkZXJfO1xuICAgIFJlYWRlci5jcmVhdGUgPSBjcmVhdGUoKTtcbiAgICBCdWZmZXJSZWFkZXIuX2NvbmZpZ3VyZSgpO1xuXG4gICAgdmFyIGZuID0gdXRpbC5Mb25nID8gXCJ0b0xvbmdcIiA6IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIFwidG9OdW1iZXJcIjtcbiAgICB1dGlsLm1lcmdlKFJlYWRlci5wcm90b3R5cGUsIHtcblxuICAgICAgICBpbnQ2NDogZnVuY3Rpb24gcmVhZF9pbnQ2NCgpIHtcbiAgICAgICAgICAgIHJldHVybiByZWFkTG9uZ1ZhcmludC5jYWxsKHRoaXMpW2ZuXShmYWxzZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdWludDY0OiBmdW5jdGlvbiByZWFkX3VpbnQ2NCgpIHtcbiAgICAgICAgICAgIHJldHVybiByZWFkTG9uZ1ZhcmludC5jYWxsKHRoaXMpW2ZuXSh0cnVlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzaW50NjQ6IGZ1bmN0aW9uIHJlYWRfc2ludDY0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlYWRMb25nVmFyaW50LmNhbGwodGhpcykuenpEZWNvZGUoKVtmbl0oZmFsc2UpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGZpeGVkNjQ6IGZ1bmN0aW9uIHJlYWRfZml4ZWQ2NCgpIHtcbiAgICAgICAgICAgIHJldHVybiByZWFkRml4ZWQ2NC5jYWxsKHRoaXMpW2ZuXSh0cnVlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZml4ZWQ2NDogZnVuY3Rpb24gcmVhZF9zZml4ZWQ2NCgpIHtcbiAgICAgICAgICAgIHJldHVybiByZWFkRml4ZWQ2NC5jYWxsKHRoaXMpW2ZuXShmYWxzZSk7XG4gICAgICAgIH1cblxuICAgIH0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBCdWZmZXJSZWFkZXI7XG5cbi8vIGV4dGVuZHMgUmVhZGVyXG52YXIgUmVhZGVyID0gcmVxdWlyZShcIi4vcmVhZGVyXCIpO1xuKEJ1ZmZlclJlYWRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFJlYWRlci5wcm90b3R5cGUpKS5jb25zdHJ1Y3RvciA9IEJ1ZmZlclJlYWRlcjtcblxudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsL21pbmltYWxcIik7XG5cbi8qKlxuICogQ29uc3RydWN0cyBhIG5ldyBidWZmZXIgcmVhZGVyIGluc3RhbmNlLlxuICogQGNsYXNzZGVzYyBXaXJlIGZvcm1hdCByZWFkZXIgdXNpbmcgbm9kZSBidWZmZXJzLlxuICogQGV4dGVuZHMgUmVhZGVyXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QnVmZmVyfSBidWZmZXIgQnVmZmVyIHRvIHJlYWQgZnJvbVxuICovXG5mdW5jdGlvbiBCdWZmZXJSZWFkZXIoYnVmZmVyKSB7XG4gICAgUmVhZGVyLmNhbGwodGhpcywgYnVmZmVyKTtcblxuICAgIC8qKlxuICAgICAqIFJlYWQgYnVmZmVyLlxuICAgICAqIEBuYW1lIEJ1ZmZlclJlYWRlciNidWZcbiAgICAgKiBAdHlwZSB7QnVmZmVyfVxuICAgICAqL1xufVxuXG5CdWZmZXJSZWFkZXIuX2NvbmZpZ3VyZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgIGlmICh1dGlsLkJ1ZmZlcilcbiAgICAgICAgQnVmZmVyUmVhZGVyLnByb3RvdHlwZS5fc2xpY2UgPSB1dGlsLkJ1ZmZlci5wcm90b3R5cGUuc2xpY2U7XG59O1xuXG5cbi8qKlxuICogQG92ZXJyaWRlXG4gKi9cbkJ1ZmZlclJlYWRlci5wcm90b3R5cGUuc3RyaW5nID0gZnVuY3Rpb24gcmVhZF9zdHJpbmdfYnVmZmVyKCkge1xuICAgIHZhciBsZW4gPSB0aGlzLnVpbnQzMigpOyAvLyBtb2RpZmllcyBwb3NcbiAgICByZXR1cm4gdGhpcy5idWYudXRmOFNsaWNlXG4gICAgICAgID8gdGhpcy5idWYudXRmOFNsaWNlKHRoaXMucG9zLCB0aGlzLnBvcyA9IE1hdGgubWluKHRoaXMucG9zICsgbGVuLCB0aGlzLmxlbikpXG4gICAgICAgIDogdGhpcy5idWYudG9TdHJpbmcoXCJ1dGYtOFwiLCB0aGlzLnBvcywgdGhpcy5wb3MgPSBNYXRoLm1pbih0aGlzLnBvcyArIGxlbiwgdGhpcy5sZW4pKTtcbn07XG5cbi8qKlxuICogUmVhZHMgYSBzZXF1ZW5jZSBvZiBieXRlcyBwcmVjZWVkZWQgYnkgaXRzIGxlbmd0aCBhcyBhIHZhcmludC5cbiAqIEBuYW1lIEJ1ZmZlclJlYWRlciNieXRlc1xuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7QnVmZmVyfSBWYWx1ZSByZWFkXG4gKi9cblxuQnVmZmVyUmVhZGVyLl9jb25maWd1cmUoKTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLyoqXG4gKiBOYW1lZCByb290cy5cbiAqIFRoaXMgaXMgd2hlcmUgcGJqcyBzdG9yZXMgZ2VuZXJhdGVkIHN0cnVjdHVyZXMgKHRoZSBvcHRpb24gYC1yLCAtLXJvb3RgIHNwZWNpZmllcyBhIG5hbWUpLlxuICogQ2FuIGFsc28gYmUgdXNlZCBtYW51YWxseSB0byBtYWtlIHJvb3RzIGF2YWlsYWJsZSBhY2Nyb3NzIG1vZHVsZXMuXG4gKiBAbmFtZSByb290c1xuICogQHR5cGUge09iamVjdC48c3RyaW5nLFJvb3Q+fVxuICogQGV4YW1wbGVcbiAqIC8vIHBianMgLXIgbXlyb290IC1vIGNvbXBpbGVkLmpzIC4uLlxuICpcbiAqIC8vIGluIGFub3RoZXIgbW9kdWxlOlxuICogcmVxdWlyZShcIi4vY29tcGlsZWQuanNcIik7XG4gKlxuICogLy8gaW4gYW55IHN1YnNlcXVlbnQgbW9kdWxlOlxuICogdmFyIHJvb3QgPSBwcm90b2J1Zi5yb290c1tcIm15cm9vdFwiXTtcbiAqL1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogU3RyZWFtaW5nIFJQQyBoZWxwZXJzLlxuICogQG5hbWVzcGFjZVxuICovXG52YXIgcnBjID0gZXhwb3J0cztcblxuLyoqXG4gKiBSUEMgaW1wbGVtZW50YXRpb24gcGFzc2VkIHRvIHtAbGluayBTZXJ2aWNlI2NyZWF0ZX0gcGVyZm9ybWluZyBhIHNlcnZpY2UgcmVxdWVzdCBvbiBuZXR3b3JrIGxldmVsLCBpLmUuIGJ5IHV0aWxpemluZyBodHRwIHJlcXVlc3RzIG9yIHdlYnNvY2tldHMuXG4gKiBAdHlwZWRlZiBSUENJbXBsXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKiBAcGFyYW0ge01ldGhvZHxycGMuU2VydmljZU1ldGhvZDxNZXNzYWdlPHt9PixNZXNzYWdlPHt9Pj59IG1ldGhvZCBSZWZsZWN0ZWQgb3Igc3RhdGljIG1ldGhvZCBiZWluZyBjYWxsZWRcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gcmVxdWVzdERhdGEgUmVxdWVzdCBkYXRhXG4gKiBAcGFyYW0ge1JQQ0ltcGxDYWxsYmFja30gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gKiBAZXhhbXBsZVxuICogZnVuY3Rpb24gcnBjSW1wbChtZXRob2QsIHJlcXVlc3REYXRhLCBjYWxsYmFjaykge1xuICogICAgIGlmIChwcm90b2J1Zi51dGlsLmxjRmlyc3QobWV0aG9kLm5hbWUpICE9PSBcIm15TWV0aG9kXCIpIC8vIGNvbXBhdGlibGUgd2l0aCBzdGF0aWMgY29kZVxuICogICAgICAgICB0aHJvdyBFcnJvcihcIm5vIHN1Y2ggbWV0aG9kXCIpO1xuICogICAgIGFzeW5jaHJvbm91c2x5T2J0YWluQVJlc3BvbnNlKHJlcXVlc3REYXRhLCBmdW5jdGlvbihlcnIsIHJlc3BvbnNlRGF0YSkge1xuICogICAgICAgICBjYWxsYmFjayhlcnIsIHJlc3BvbnNlRGF0YSk7XG4gKiAgICAgfSk7XG4gKiB9XG4gKi9cblxuLyoqXG4gKiBOb2RlLXN0eWxlIGNhbGxiYWNrIGFzIHVzZWQgYnkge0BsaW5rIFJQQ0ltcGx9LlxuICogQHR5cGVkZWYgUlBDSW1wbENhbGxiYWNrXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKiBAcGFyYW0ge0Vycm9yfG51bGx9IGVycm9yIEVycm9yLCBpZiBhbnksIG90aGVyd2lzZSBgbnVsbGBcbiAqIEBwYXJhbSB7VWludDhBcnJheXxudWxsfSBbcmVzcG9uc2VdIFJlc3BvbnNlIGRhdGEgb3IgYG51bGxgIHRvIHNpZ25hbCBlbmQgb2Ygc3RyZWFtLCBpZiB0aGVyZSBoYXNuJ3QgYmVlbiBhbiBlcnJvclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAqL1xuXG5ycGMuU2VydmljZSA9IHJlcXVpcmUoXCIuL3JwYy9zZXJ2aWNlXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IFNlcnZpY2U7XG5cbnZhciB1dGlsID0gcmVxdWlyZShcIi4uL3V0aWwvbWluaW1hbFwiKTtcblxuLy8gRXh0ZW5kcyBFdmVudEVtaXR0ZXJcbihTZXJ2aWNlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUodXRpbC5FdmVudEVtaXR0ZXIucHJvdG90eXBlKSkuY29uc3RydWN0b3IgPSBTZXJ2aWNlO1xuXG4vKipcbiAqIEEgc2VydmljZSBtZXRob2QgY2FsbGJhY2sgYXMgdXNlZCBieSB7QGxpbmsgcnBjLlNlcnZpY2VNZXRob2R8U2VydmljZU1ldGhvZH0uXG4gKlxuICogRGlmZmVycyBmcm9tIHtAbGluayBSUENJbXBsQ2FsbGJhY2t9IGluIHRoYXQgaXQgaXMgYW4gYWN0dWFsIGNhbGxiYWNrIG9mIGEgc2VydmljZSBtZXRob2Qgd2hpY2ggbWF5IG5vdCByZXR1cm4gYHJlc3BvbnNlID0gbnVsbGAuXG4gKiBAdHlwZWRlZiBycGMuU2VydmljZU1ldGhvZENhbGxiYWNrXG4gKiBAdGVtcGxhdGUgVFJlcyBleHRlbmRzIE1lc3NhZ2U8VFJlcz5cbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqIEBwYXJhbSB7RXJyb3J8bnVsbH0gZXJyb3IgRXJyb3IsIGlmIGFueVxuICogQHBhcmFtIHtUUmVzfSBbcmVzcG9uc2VdIFJlc3BvbnNlIG1lc3NhZ2VcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gKi9cblxuLyoqXG4gKiBBIHNlcnZpY2UgbWV0aG9kIHBhcnQgb2YgYSB7QGxpbmsgcnBjLlNlcnZpY2V9IGFzIGNyZWF0ZWQgYnkge0BsaW5rIFNlcnZpY2UuY3JlYXRlfS5cbiAqIEB0eXBlZGVmIHJwYy5TZXJ2aWNlTWV0aG9kXG4gKiBAdGVtcGxhdGUgVFJlcSBleHRlbmRzIE1lc3NhZ2U8VFJlcT5cbiAqIEB0ZW1wbGF0ZSBUUmVzIGV4dGVuZHMgTWVzc2FnZTxUUmVzPlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICogQHBhcmFtIHtUUmVxfFByb3BlcnRpZXM8VFJlcT59IHJlcXVlc3QgUmVxdWVzdCBtZXNzYWdlIG9yIHBsYWluIG9iamVjdFxuICogQHBhcmFtIHtycGMuU2VydmljZU1ldGhvZENhbGxiYWNrPFRSZXM+fSBbY2FsbGJhY2tdIE5vZGUtc3R5bGUgY2FsbGJhY2sgY2FsbGVkIHdpdGggdGhlIGVycm9yLCBpZiBhbnksIGFuZCB0aGUgcmVzcG9uc2UgbWVzc2FnZVxuICogQHJldHVybnMge1Byb21pc2U8TWVzc2FnZTxUUmVzPj59IFByb21pc2UgaWYgYGNhbGxiYWNrYCBoYXMgYmVlbiBvbWl0dGVkLCBvdGhlcndpc2UgYHVuZGVmaW5lZGBcbiAqL1xuXG4vKipcbiAqIENvbnN0cnVjdHMgYSBuZXcgUlBDIHNlcnZpY2UgaW5zdGFuY2UuXG4gKiBAY2xhc3NkZXNjIEFuIFJQQyBzZXJ2aWNlIGFzIHJldHVybmVkIGJ5IHtAbGluayBTZXJ2aWNlI2NyZWF0ZX0uXG4gKiBAZXhwb3J0cyBycGMuU2VydmljZVxuICogQGV4dGVuZHMgdXRpbC5FdmVudEVtaXR0ZXJcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtSUENJbXBsfSBycGNJbXBsIFJQQyBpbXBsZW1lbnRhdGlvblxuICogQHBhcmFtIHtib29sZWFufSBbcmVxdWVzdERlbGltaXRlZD1mYWxzZV0gV2hldGhlciByZXF1ZXN0cyBhcmUgbGVuZ3RoLWRlbGltaXRlZFxuICogQHBhcmFtIHtib29sZWFufSBbcmVzcG9uc2VEZWxpbWl0ZWQ9ZmFsc2VdIFdoZXRoZXIgcmVzcG9uc2VzIGFyZSBsZW5ndGgtZGVsaW1pdGVkXG4gKi9cbmZ1bmN0aW9uIFNlcnZpY2UocnBjSW1wbCwgcmVxdWVzdERlbGltaXRlZCwgcmVzcG9uc2VEZWxpbWl0ZWQpIHtcblxuICAgIGlmICh0eXBlb2YgcnBjSW1wbCAhPT0gXCJmdW5jdGlvblwiKVxuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJycGNJbXBsIG11c3QgYmUgYSBmdW5jdGlvblwiKTtcblxuICAgIHV0aWwuRXZlbnRFbWl0dGVyLmNhbGwodGhpcyk7XG5cbiAgICAvKipcbiAgICAgKiBSUEMgaW1wbGVtZW50YXRpb24uIEJlY29tZXMgYG51bGxgIG9uY2UgdGhlIHNlcnZpY2UgaXMgZW5kZWQuXG4gICAgICogQHR5cGUge1JQQ0ltcGx8bnVsbH1cbiAgICAgKi9cbiAgICB0aGlzLnJwY0ltcGwgPSBycGNJbXBsO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciByZXF1ZXN0cyBhcmUgbGVuZ3RoLWRlbGltaXRlZC5cbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLnJlcXVlc3REZWxpbWl0ZWQgPSBCb29sZWFuKHJlcXVlc3REZWxpbWl0ZWQpO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciByZXNwb25zZXMgYXJlIGxlbmd0aC1kZWxpbWl0ZWQuXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5yZXNwb25zZURlbGltaXRlZCA9IEJvb2xlYW4ocmVzcG9uc2VEZWxpbWl0ZWQpO1xufVxuXG4vKipcbiAqIENhbGxzIGEgc2VydmljZSBtZXRob2QgdGhyb3VnaCB7QGxpbmsgcnBjLlNlcnZpY2UjcnBjSW1wbHxycGNJbXBsfS5cbiAqIEBwYXJhbSB7TWV0aG9kfHJwYy5TZXJ2aWNlTWV0aG9kPFRSZXEsVFJlcz59IG1ldGhvZCBSZWZsZWN0ZWQgb3Igc3RhdGljIG1ldGhvZFxuICogQHBhcmFtIHtDb25zdHJ1Y3RvcjxUUmVxPn0gcmVxdWVzdEN0b3IgUmVxdWVzdCBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtDb25zdHJ1Y3RvcjxUUmVzPn0gcmVzcG9uc2VDdG9yIFJlc3BvbnNlIGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge1RSZXF8UHJvcGVydGllczxUUmVxPn0gcmVxdWVzdCBSZXF1ZXN0IG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0XG4gKiBAcGFyYW0ge3JwYy5TZXJ2aWNlTWV0aG9kQ2FsbGJhY2s8VFJlcz59IGNhbGxiYWNrIFNlcnZpY2UgY2FsbGJhY2tcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gKiBAdGVtcGxhdGUgVFJlcSBleHRlbmRzIE1lc3NhZ2U8VFJlcT5cbiAqIEB0ZW1wbGF0ZSBUUmVzIGV4dGVuZHMgTWVzc2FnZTxUUmVzPlxuICovXG5TZXJ2aWNlLnByb3RvdHlwZS5ycGNDYWxsID0gZnVuY3Rpb24gcnBjQ2FsbChtZXRob2QsIHJlcXVlc3RDdG9yLCByZXNwb25zZUN0b3IsIHJlcXVlc3QsIGNhbGxiYWNrKSB7XG5cbiAgICBpZiAoIXJlcXVlc3QpXG4gICAgICAgIHRocm93IFR5cGVFcnJvcihcInJlcXVlc3QgbXVzdCBiZSBzcGVjaWZpZWRcIik7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgaWYgKCFjYWxsYmFjaylcbiAgICAgICAgcmV0dXJuIHV0aWwuYXNQcm9taXNlKHJwY0NhbGwsIHNlbGYsIG1ldGhvZCwgcmVxdWVzdEN0b3IsIHJlc3BvbnNlQ3RvciwgcmVxdWVzdCk7XG5cbiAgICBpZiAoIXNlbGYucnBjSW1wbCkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBjYWxsYmFjayhFcnJvcihcImFscmVhZHkgZW5kZWRcIikpOyB9LCAwKTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gc2VsZi5ycGNJbXBsKFxuICAgICAgICAgICAgbWV0aG9kLFxuICAgICAgICAgICAgcmVxdWVzdEN0b3Jbc2VsZi5yZXF1ZXN0RGVsaW1pdGVkID8gXCJlbmNvZGVEZWxpbWl0ZWRcIiA6IFwiZW5jb2RlXCJdKHJlcXVlc3QpLmZpbmlzaCgpLFxuICAgICAgICAgICAgZnVuY3Rpb24gcnBjQ2FsbGJhY2soZXJyLCByZXNwb25zZSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmVtaXQoXCJlcnJvclwiLCBlcnIsIG1ldGhvZCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmVuZCgvKiBlbmRlZEJ5UlBDICovIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghKHJlc3BvbnNlIGluc3RhbmNlb2YgcmVzcG9uc2VDdG9yKSkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSByZXNwb25zZUN0b3Jbc2VsZi5yZXNwb25zZURlbGltaXRlZCA/IFwiZGVjb2RlRGVsaW1pdGVkXCIgOiBcImRlY29kZVwiXShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5lbWl0KFwiZXJyb3JcIiwgZXJyLCBtZXRob2QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzZWxmLmVtaXQoXCJkYXRhXCIsIHJlc3BvbnNlLCBtZXRob2QpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHNlbGYuZW1pdChcImVycm9yXCIsIGVyciwgbWV0aG9kKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgY2FsbGJhY2soZXJyKTsgfSwgMCk7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxufTtcblxuLyoqXG4gKiBFbmRzIHRoaXMgc2VydmljZSBhbmQgZW1pdHMgdGhlIGBlbmRgIGV2ZW50LlxuICogQHBhcmFtIHtib29sZWFufSBbZW5kZWRCeVJQQz1mYWxzZV0gV2hldGhlciB0aGUgc2VydmljZSBoYXMgYmVlbiBlbmRlZCBieSB0aGUgUlBDIGltcGxlbWVudGF0aW9uLlxuICogQHJldHVybnMge3JwYy5TZXJ2aWNlfSBgdGhpc2BcbiAqL1xuU2VydmljZS5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gZW5kKGVuZGVkQnlSUEMpIHtcbiAgICBpZiAodGhpcy5ycGNJbXBsKSB7XG4gICAgICAgIGlmICghZW5kZWRCeVJQQykgLy8gc2lnbmFsIGVuZCB0byBycGNJbXBsXG4gICAgICAgICAgICB0aGlzLnJwY0ltcGwobnVsbCwgbnVsbCwgbnVsbCk7XG4gICAgICAgIHRoaXMucnBjSW1wbCA9IG51bGw7XG4gICAgICAgIHRoaXMuZW1pdChcImVuZFwiKS5vZmYoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IExvbmdCaXRzO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuLi91dGlsL21pbmltYWxcIik7XG5cbi8qKlxuICogQ29uc3RydWN0cyBuZXcgbG9uZyBiaXRzLlxuICogQGNsYXNzZGVzYyBIZWxwZXIgY2xhc3MgZm9yIHdvcmtpbmcgd2l0aCB0aGUgbG93IGFuZCBoaWdoIGJpdHMgb2YgYSA2NCBiaXQgdmFsdWUuXG4gKiBAbWVtYmVyb2YgdXRpbFxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge251bWJlcn0gbG8gTG93IDMyIGJpdHMsIHVuc2lnbmVkXG4gKiBAcGFyYW0ge251bWJlcn0gaGkgSGlnaCAzMiBiaXRzLCB1bnNpZ25lZFxuICovXG5mdW5jdGlvbiBMb25nQml0cyhsbywgaGkpIHtcblxuICAgIC8vIG5vdGUgdGhhdCB0aGUgY2FzdHMgYmVsb3cgYXJlIHRoZW9yZXRpY2FsbHkgdW5uZWNlc3NhcnkgYXMgb2YgdG9kYXksIGJ1dCBvbGRlciBzdGF0aWNhbGx5XG4gICAgLy8gZ2VuZXJhdGVkIGNvbnZlcnRlciBjb2RlIG1pZ2h0IHN0aWxsIGNhbGwgdGhlIGN0b3Igd2l0aCBzaWduZWQgMzJiaXRzLiBrZXB0IGZvciBjb21wYXQuXG5cbiAgICAvKipcbiAgICAgKiBMb3cgYml0cy5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMubG8gPSBsbyA+Pj4gMDtcblxuICAgIC8qKlxuICAgICAqIEhpZ2ggYml0cy5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMuaGkgPSBoaSA+Pj4gMDtcbn1cblxuLyoqXG4gKiBaZXJvIGJpdHMuXG4gKiBAbWVtYmVyb2YgdXRpbC5Mb25nQml0c1xuICogQHR5cGUge3V0aWwuTG9uZ0JpdHN9XG4gKi9cbnZhciB6ZXJvID0gTG9uZ0JpdHMuemVybyA9IG5ldyBMb25nQml0cygwLCAwKTtcblxuemVyby50b051bWJlciA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbnplcm8uenpFbmNvZGUgPSB6ZXJvLnp6RGVjb2RlID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9O1xuemVyby5sZW5ndGggPSBmdW5jdGlvbigpIHsgcmV0dXJuIDE7IH07XG5cbi8qKlxuICogWmVybyBoYXNoLlxuICogQG1lbWJlcm9mIHV0aWwuTG9uZ0JpdHNcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKi9cbnZhciB6ZXJvSGFzaCA9IExvbmdCaXRzLnplcm9IYXNoID0gXCJcXDBcXDBcXDBcXDBcXDBcXDBcXDBcXDBcIjtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIG5ldyBsb25nIGJpdHMgZnJvbSB0aGUgc3BlY2lmaWVkIG51bWJlci5cbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBWYWx1ZVxuICogQHJldHVybnMge3V0aWwuTG9uZ0JpdHN9IEluc3RhbmNlXG4gKi9cbkxvbmdCaXRzLmZyb21OdW1iZXIgPSBmdW5jdGlvbiBmcm9tTnVtYmVyKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSAwKVxuICAgICAgICByZXR1cm4gemVybztcbiAgICB2YXIgc2lnbiA9IHZhbHVlIDwgMDtcbiAgICBpZiAoc2lnbilcbiAgICAgICAgdmFsdWUgPSAtdmFsdWU7XG4gICAgdmFyIGxvID0gdmFsdWUgPj4+IDAsXG4gICAgICAgIGhpID0gKHZhbHVlIC0gbG8pIC8gNDI5NDk2NzI5NiA+Pj4gMDtcbiAgICBpZiAoc2lnbikge1xuICAgICAgICBoaSA9IH5oaSA+Pj4gMDtcbiAgICAgICAgbG8gPSB+bG8gPj4+IDA7XG4gICAgICAgIGlmICgrK2xvID4gNDI5NDk2NzI5NSkge1xuICAgICAgICAgICAgbG8gPSAwO1xuICAgICAgICAgICAgaWYgKCsraGkgPiA0Mjk0OTY3Mjk1KVxuICAgICAgICAgICAgICAgIGhpID0gMDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3IExvbmdCaXRzKGxvLCBoaSk7XG59O1xuXG4vKipcbiAqIENvbnN0cnVjdHMgbmV3IGxvbmcgYml0cyBmcm9tIGEgbnVtYmVyLCBsb25nIG9yIHN0cmluZy5cbiAqIEBwYXJhbSB7TG9uZ3xudW1iZXJ8c3RyaW5nfSB2YWx1ZSBWYWx1ZVxuICogQHJldHVybnMge3V0aWwuTG9uZ0JpdHN9IEluc3RhbmNlXG4gKi9cbkxvbmdCaXRzLmZyb20gPSBmdW5jdGlvbiBmcm9tKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIilcbiAgICAgICAgcmV0dXJuIExvbmdCaXRzLmZyb21OdW1iZXIodmFsdWUpO1xuICAgIGlmICh1dGlsLmlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAodXRpbC5Mb25nKVxuICAgICAgICAgICAgdmFsdWUgPSB1dGlsLkxvbmcuZnJvbVN0cmluZyh2YWx1ZSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBMb25nQml0cy5mcm9tTnVtYmVyKHBhcnNlSW50KHZhbHVlLCAxMCkpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWUubG93IHx8IHZhbHVlLmhpZ2ggPyBuZXcgTG9uZ0JpdHModmFsdWUubG93ID4+PiAwLCB2YWx1ZS5oaWdoID4+PiAwKSA6IHplcm87XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIHRoaXMgbG9uZyBiaXRzIHRvIGEgcG9zc2libHkgdW5zYWZlIEphdmFTY3JpcHQgbnVtYmVyLlxuICogQHBhcmFtIHtib29sZWFufSBbdW5zaWduZWQ9ZmFsc2VdIFdoZXRoZXIgdW5zaWduZWQgb3Igbm90XG4gKiBAcmV0dXJucyB7bnVtYmVyfSBQb3NzaWJseSB1bnNhZmUgbnVtYmVyXG4gKi9cbkxvbmdCaXRzLnByb3RvdHlwZS50b051bWJlciA9IGZ1bmN0aW9uIHRvTnVtYmVyKHVuc2lnbmVkKSB7XG4gICAgaWYgKCF1bnNpZ25lZCAmJiB0aGlzLmhpID4+PiAzMSkge1xuICAgICAgICB2YXIgbG8gPSB+dGhpcy5sbyArIDEgPj4+IDAsXG4gICAgICAgICAgICBoaSA9IH50aGlzLmhpICAgICA+Pj4gMDtcbiAgICAgICAgaWYgKCFsbylcbiAgICAgICAgICAgIGhpID0gaGkgKyAxID4+PiAwO1xuICAgICAgICByZXR1cm4gLShsbyArIGhpICogNDI5NDk2NzI5Nik7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmxvICsgdGhpcy5oaSAqIDQyOTQ5NjcyOTY7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIHRoaXMgbG9uZyBiaXRzIHRvIGEgbG9uZy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3Vuc2lnbmVkPWZhbHNlXSBXaGV0aGVyIHVuc2lnbmVkIG9yIG5vdFxuICogQHJldHVybnMge0xvbmd9IExvbmdcbiAqL1xuTG9uZ0JpdHMucHJvdG90eXBlLnRvTG9uZyA9IGZ1bmN0aW9uIHRvTG9uZyh1bnNpZ25lZCkge1xuICAgIHJldHVybiB1dGlsLkxvbmdcbiAgICAgICAgPyBuZXcgdXRpbC5Mb25nKHRoaXMubG8gfCAwLCB0aGlzLmhpIHwgMCwgQm9vbGVhbih1bnNpZ25lZCkpXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIDogeyBsb3c6IHRoaXMubG8gfCAwLCBoaWdoOiB0aGlzLmhpIHwgMCwgdW5zaWduZWQ6IEJvb2xlYW4odW5zaWduZWQpIH07XG59O1xuXG52YXIgY2hhckNvZGVBdCA9IFN0cmluZy5wcm90b3R5cGUuY2hhckNvZGVBdDtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIG5ldyBsb25nIGJpdHMgZnJvbSB0aGUgc3BlY2lmaWVkIDggY2hhcmFjdGVycyBsb25nIGhhc2guXG4gKiBAcGFyYW0ge3N0cmluZ30gaGFzaCBIYXNoXG4gKiBAcmV0dXJucyB7dXRpbC5Mb25nQml0c30gQml0c1xuICovXG5Mb25nQml0cy5mcm9tSGFzaCA9IGZ1bmN0aW9uIGZyb21IYXNoKGhhc2gpIHtcbiAgICBpZiAoaGFzaCA9PT0gemVyb0hhc2gpXG4gICAgICAgIHJldHVybiB6ZXJvO1xuICAgIHJldHVybiBuZXcgTG9uZ0JpdHMoXG4gICAgICAgICggY2hhckNvZGVBdC5jYWxsKGhhc2gsIDApXG4gICAgICAgIHwgY2hhckNvZGVBdC5jYWxsKGhhc2gsIDEpIDw8IDhcbiAgICAgICAgfCBjaGFyQ29kZUF0LmNhbGwoaGFzaCwgMikgPDwgMTZcbiAgICAgICAgfCBjaGFyQ29kZUF0LmNhbGwoaGFzaCwgMykgPDwgMjQpID4+PiAwXG4gICAgLFxuICAgICAgICAoIGNoYXJDb2RlQXQuY2FsbChoYXNoLCA0KVxuICAgICAgICB8IGNoYXJDb2RlQXQuY2FsbChoYXNoLCA1KSA8PCA4XG4gICAgICAgIHwgY2hhckNvZGVBdC5jYWxsKGhhc2gsIDYpIDw8IDE2XG4gICAgICAgIHwgY2hhckNvZGVBdC5jYWxsKGhhc2gsIDcpIDw8IDI0KSA+Pj4gMFxuICAgICk7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIHRoaXMgbG9uZyBiaXRzIHRvIGEgOCBjaGFyYWN0ZXJzIGxvbmcgaGFzaC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IEhhc2hcbiAqL1xuTG9uZ0JpdHMucHJvdG90eXBlLnRvSGFzaCA9IGZ1bmN0aW9uIHRvSGFzaCgpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShcbiAgICAgICAgdGhpcy5sbyAgICAgICAgJiAyNTUsXG4gICAgICAgIHRoaXMubG8gPj4+IDggICYgMjU1LFxuICAgICAgICB0aGlzLmxvID4+PiAxNiAmIDI1NSxcbiAgICAgICAgdGhpcy5sbyA+Pj4gMjQgICAgICAsXG4gICAgICAgIHRoaXMuaGkgICAgICAgICYgMjU1LFxuICAgICAgICB0aGlzLmhpID4+PiA4ICAmIDI1NSxcbiAgICAgICAgdGhpcy5oaSA+Pj4gMTYgJiAyNTUsXG4gICAgICAgIHRoaXMuaGkgPj4+IDI0XG4gICAgKTtcbn07XG5cbi8qKlxuICogWmlnLXphZyBlbmNvZGVzIHRoaXMgbG9uZyBiaXRzLlxuICogQHJldHVybnMge3V0aWwuTG9uZ0JpdHN9IGB0aGlzYFxuICovXG5Mb25nQml0cy5wcm90b3R5cGUuenpFbmNvZGUgPSBmdW5jdGlvbiB6ekVuY29kZSgpIHtcbiAgICB2YXIgbWFzayA9ICAgdGhpcy5oaSA+PiAzMTtcbiAgICB0aGlzLmhpICA9ICgodGhpcy5oaSA8PCAxIHwgdGhpcy5sbyA+Pj4gMzEpIF4gbWFzaykgPj4+IDA7XG4gICAgdGhpcy5sbyAgPSAoIHRoaXMubG8gPDwgMSAgICAgICAgICAgICAgICAgICBeIG1hc2spID4+PiAwO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBaaWctemFnIGRlY29kZXMgdGhpcyBsb25nIGJpdHMuXG4gKiBAcmV0dXJucyB7dXRpbC5Mb25nQml0c30gYHRoaXNgXG4gKi9cbkxvbmdCaXRzLnByb3RvdHlwZS56ekRlY29kZSA9IGZ1bmN0aW9uIHp6RGVjb2RlKCkge1xuICAgIHZhciBtYXNrID0gLSh0aGlzLmxvICYgMSk7XG4gICAgdGhpcy5sbyAgPSAoKHRoaXMubG8gPj4+IDEgfCB0aGlzLmhpIDw8IDMxKSBeIG1hc2spID4+PiAwO1xuICAgIHRoaXMuaGkgID0gKCB0aGlzLmhpID4+PiAxICAgICAgICAgICAgICAgICAgXiBtYXNrKSA+Pj4gMDtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9mIHRoaXMgbG9uZ2JpdHMgd2hlbiBlbmNvZGVkIGFzIGEgdmFyaW50LlxuICogQHJldHVybnMge251bWJlcn0gTGVuZ3RoXG4gKi9cbkxvbmdCaXRzLnByb3RvdHlwZS5sZW5ndGggPSBmdW5jdGlvbiBsZW5ndGgoKSB7XG4gICAgdmFyIHBhcnQwID0gIHRoaXMubG8sXG4gICAgICAgIHBhcnQxID0gKHRoaXMubG8gPj4+IDI4IHwgdGhpcy5oaSA8PCA0KSA+Pj4gMCxcbiAgICAgICAgcGFydDIgPSAgdGhpcy5oaSA+Pj4gMjQ7XG4gICAgcmV0dXJuIHBhcnQyID09PSAwXG4gICAgICAgICA/IHBhcnQxID09PSAwXG4gICAgICAgICAgID8gcGFydDAgPCAxNjM4NFxuICAgICAgICAgICAgID8gcGFydDAgPCAxMjggPyAxIDogMlxuICAgICAgICAgICAgIDogcGFydDAgPCAyMDk3MTUyID8gMyA6IDRcbiAgICAgICAgICAgOiBwYXJ0MSA8IDE2Mzg0XG4gICAgICAgICAgICAgPyBwYXJ0MSA8IDEyOCA/IDUgOiA2XG4gICAgICAgICAgICAgOiBwYXJ0MSA8IDIwOTcxNTIgPyA3IDogOFxuICAgICAgICAgOiBwYXJ0MiA8IDEyOCA/IDkgOiAxMDtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciB1dGlsID0gZXhwb3J0cztcblxuLy8gdXNlZCB0byByZXR1cm4gYSBQcm9taXNlIHdoZXJlIGNhbGxiYWNrIGlzIG9taXR0ZWRcbnV0aWwuYXNQcm9taXNlID0gcmVxdWlyZShcIkBwcm90b2J1ZmpzL2FzcHJvbWlzZVwiKTtcblxuLy8gY29udmVydHMgdG8gLyBmcm9tIGJhc2U2NCBlbmNvZGVkIHN0cmluZ3NcbnV0aWwuYmFzZTY0ID0gcmVxdWlyZShcIkBwcm90b2J1ZmpzL2Jhc2U2NFwiKTtcblxuLy8gYmFzZSBjbGFzcyBvZiBycGMuU2VydmljZVxudXRpbC5FdmVudEVtaXR0ZXIgPSByZXF1aXJlKFwiQHByb3RvYnVmanMvZXZlbnRlbWl0dGVyXCIpO1xuXG4vLyBmbG9hdCBoYW5kbGluZyBhY2Nyb3NzIGJyb3dzZXJzXG51dGlsLmZsb2F0ID0gcmVxdWlyZShcIkBwcm90b2J1ZmpzL2Zsb2F0XCIpO1xuXG4vLyByZXF1aXJlcyBtb2R1bGVzIG9wdGlvbmFsbHkgYW5kIGhpZGVzIHRoZSBjYWxsIGZyb20gYnVuZGxlcnNcbnV0aWwuaW5xdWlyZSA9IHJlcXVpcmUoXCJAcHJvdG9idWZqcy9pbnF1aXJlXCIpO1xuXG4vLyBjb252ZXJ0cyB0byAvIGZyb20gdXRmOCBlbmNvZGVkIHN0cmluZ3NcbnV0aWwudXRmOCA9IHJlcXVpcmUoXCJAcHJvdG9idWZqcy91dGY4XCIpO1xuXG4vLyBwcm92aWRlcyBhIG5vZGUtbGlrZSBidWZmZXIgcG9vbCBpbiB0aGUgYnJvd3NlclxudXRpbC5wb29sID0gcmVxdWlyZShcIkBwcm90b2J1ZmpzL3Bvb2xcIik7XG5cbi8vIHV0aWxpdHkgdG8gd29yayB3aXRoIHRoZSBsb3cgYW5kIGhpZ2ggYml0cyBvZiBhIDY0IGJpdCB2YWx1ZVxudXRpbC5Mb25nQml0cyA9IHJlcXVpcmUoXCIuL2xvbmdiaXRzXCIpO1xuXG4vKipcbiAqIFdoZXRoZXIgcnVubmluZyB3aXRoaW4gbm9kZSBvciBub3QuXG4gKiBAbWVtYmVyb2YgdXRpbFxuICogQHR5cGUge2Jvb2xlYW59XG4gKi9cbnV0aWwuaXNOb2RlID0gQm9vbGVhbih0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiXG4gICAgICAgICAgICAgICAgICAgJiYgZ2xvYmFsXG4gICAgICAgICAgICAgICAgICAgJiYgZ2xvYmFsLnByb2Nlc3NcbiAgICAgICAgICAgICAgICAgICAmJiBnbG9iYWwucHJvY2Vzcy52ZXJzaW9uc1xuICAgICAgICAgICAgICAgICAgICYmIGdsb2JhbC5wcm9jZXNzLnZlcnNpb25zLm5vZGUpO1xuXG4vKipcbiAqIEdsb2JhbCBvYmplY3QgcmVmZXJlbmNlLlxuICogQG1lbWJlcm9mIHV0aWxcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbnV0aWwuZ2xvYmFsID0gdXRpbC5pc05vZGUgJiYgZ2xvYmFsXG4gICAgICAgICAgIHx8IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93XG4gICAgICAgICAgIHx8IHR5cGVvZiBzZWxmICAgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZlxuICAgICAgICAgICB8fCB0aGlzOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWludmFsaWQtdGhpc1xuXG4vKipcbiAqIEFuIGltbXVhYmxlIGVtcHR5IGFycmF5LlxuICogQG1lbWJlcm9mIHV0aWxcbiAqIEB0eXBlIHtBcnJheS48Kj59XG4gKiBAY29uc3RcbiAqL1xudXRpbC5lbXB0eUFycmF5ID0gT2JqZWN0LmZyZWV6ZSA/IE9iamVjdC5mcmVlemUoW10pIDogLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gW107IC8vIHVzZWQgb24gcHJvdG90eXBlc1xuXG4vKipcbiAqIEFuIGltbXV0YWJsZSBlbXB0eSBvYmplY3QuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQGNvbnN0XG4gKi9cbnV0aWwuZW1wdHlPYmplY3QgPSBPYmplY3QuZnJlZXplID8gT2JqZWN0LmZyZWV6ZSh7fSkgOiAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyB7fTsgLy8gdXNlZCBvbiBwcm90b3R5cGVzXG5cbi8qKlxuICogVGVzdHMgaWYgdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0geyp9IHZhbHVlIFZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgdGhlIHZhbHVlIGlzIGFuIGludGVnZXJcbiAqL1xudXRpbC5pc0ludGVnZXIgPSBOdW1iZXIuaXNJbnRlZ2VyIHx8IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIGZ1bmN0aW9uIGlzSW50ZWdlcih2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIgJiYgaXNGaW5pdGUodmFsdWUpICYmIE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZTtcbn07XG5cbi8qKlxuICogVGVzdHMgaWYgdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmdcbiAqL1xudXRpbC5pc1N0cmluZyA9IGZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiB8fCB2YWx1ZSBpbnN0YW5jZW9mIFN0cmluZztcbn07XG5cbi8qKlxuICogVGVzdHMgaWYgdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyBhIG5vbi1udWxsIG9iamVjdC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgdmFsdWUgaXMgYSBub24tbnVsbCBvYmplY3RcbiAqL1xudXRpbC5pc09iamVjdCA9IGZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIjtcbn07XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgcHJvcGVydHkgb24gYSBtZXNzYWdlIGlzIGNvbnNpZGVyZWQgdG8gYmUgcHJlc2VudC5cbiAqIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIHV0aWwuaXNTZXR9LlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFBsYWluIG9iamVjdCBvciBtZXNzYWdlIGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcCBQcm9wZXJ0eSBuYW1lXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIGNvbnNpZGVyZWQgdG8gYmUgcHJlc2VudCwgb3RoZXJ3aXNlIGBmYWxzZWBcbiAqL1xudXRpbC5pc3NldCA9XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgcHJvcGVydHkgb24gYSBtZXNzYWdlIGlzIGNvbnNpZGVyZWQgdG8gYmUgcHJlc2VudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogUGxhaW4gb2JqZWN0IG9yIG1lc3NhZ2UgaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wIFByb3BlcnR5IG5hbWVcbiAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgY29uc2lkZXJlZCB0byBiZSBwcmVzZW50LCBvdGhlcndpc2UgYGZhbHNlYFxuICovXG51dGlsLmlzU2V0ID0gZnVuY3Rpb24gaXNTZXQob2JqLCBwcm9wKSB7XG4gICAgdmFyIHZhbHVlID0gb2JqW3Byb3BdO1xuICAgIGlmICh2YWx1ZSAhPSBudWxsICYmIG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBlcWVxZXEsIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiIHx8IChBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLmxlbmd0aCA6IE9iamVjdC5rZXlzKHZhbHVlKS5sZW5ndGgpID4gMDtcbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG4vKipcbiAqIEFueSBjb21wYXRpYmxlIEJ1ZmZlciBpbnN0YW5jZS5cbiAqIFRoaXMgaXMgYSBtaW5pbWFsIHN0YW5kLWFsb25lIGRlZmluaXRpb24gb2YgYSBCdWZmZXIgaW5zdGFuY2UuIFRoZSBhY3R1YWwgdHlwZSBpcyB0aGF0IGV4cG9ydGVkIGJ5IG5vZGUncyB0eXBpbmdzLlxuICogQGludGVyZmFjZSBCdWZmZXJcbiAqIEBleHRlbmRzIFVpbnQ4QXJyYXlcbiAqL1xuXG4vKipcbiAqIE5vZGUncyBCdWZmZXIgY2xhc3MgaWYgYXZhaWxhYmxlLlxuICogQHR5cGUge0NvbnN0cnVjdG9yPEJ1ZmZlcj59XG4gKi9cbnV0aWwuQnVmZmVyID0gKGZ1bmN0aW9uKCkge1xuICAgIHRyeSB7XG4gICAgICAgIHZhciBCdWZmZXIgPSB1dGlsLmlucXVpcmUoXCJidWZmZXJcIikuQnVmZmVyO1xuICAgICAgICAvLyByZWZ1c2UgdG8gdXNlIG5vbi1ub2RlIGJ1ZmZlcnMgaWYgbm90IGV4cGxpY2l0bHkgYXNzaWduZWQgKHBlcmYgcmVhc29ucyk6XG4gICAgICAgIHJldHVybiBCdWZmZXIucHJvdG90eXBlLnV0ZjhXcml0ZSA/IEJ1ZmZlciA6IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIG51bGw7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59KSgpO1xuXG4vLyBJbnRlcm5hbCBhbGlhcyBvZiBvciBwb2x5ZnVsbCBmb3IgQnVmZmVyLmZyb20uXG51dGlsLl9CdWZmZXJfZnJvbSA9IG51bGw7XG5cbi8vIEludGVybmFsIGFsaWFzIG9mIG9yIHBvbHlmaWxsIGZvciBCdWZmZXIuYWxsb2NVbnNhZmUuXG51dGlsLl9CdWZmZXJfYWxsb2NVbnNhZmUgPSBudWxsO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgYnVmZmVyIG9mIHdoYXRldmVyIHR5cGUgc3VwcG9ydGVkIGJ5IHRoZSBlbnZpcm9ubWVudC5cbiAqIEBwYXJhbSB7bnVtYmVyfG51bWJlcltdfSBbc2l6ZU9yQXJyYXk9MF0gQnVmZmVyIHNpemUgb3IgbnVtYmVyIGFycmF5XG4gKiBAcmV0dXJucyB7VWludDhBcnJheXxCdWZmZXJ9IEJ1ZmZlclxuICovXG51dGlsLm5ld0J1ZmZlciA9IGZ1bmN0aW9uIG5ld0J1ZmZlcihzaXplT3JBcnJheSkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgcmV0dXJuIHR5cGVvZiBzaXplT3JBcnJheSA9PT0gXCJudW1iZXJcIlxuICAgICAgICA/IHV0aWwuQnVmZmVyXG4gICAgICAgICAgICA/IHV0aWwuX0J1ZmZlcl9hbGxvY1Vuc2FmZShzaXplT3JBcnJheSlcbiAgICAgICAgICAgIDogbmV3IHV0aWwuQXJyYXkoc2l6ZU9yQXJyYXkpXG4gICAgICAgIDogdXRpbC5CdWZmZXJcbiAgICAgICAgICAgID8gdXRpbC5fQnVmZmVyX2Zyb20oc2l6ZU9yQXJyYXkpXG4gICAgICAgICAgICA6IHR5cGVvZiBVaW50OEFycmF5ID09PSBcInVuZGVmaW5lZFwiXG4gICAgICAgICAgICAgICAgPyBzaXplT3JBcnJheVxuICAgICAgICAgICAgICAgIDogbmV3IFVpbnQ4QXJyYXkoc2l6ZU9yQXJyYXkpO1xufTtcblxuLyoqXG4gKiBBcnJheSBpbXBsZW1lbnRhdGlvbiB1c2VkIGluIHRoZSBicm93c2VyLiBgVWludDhBcnJheWAgaWYgc3VwcG9ydGVkLCBvdGhlcndpc2UgYEFycmF5YC5cbiAqIEB0eXBlIHtDb25zdHJ1Y3RvcjxVaW50OEFycmF5Pn1cbiAqL1xudXRpbC5BcnJheSA9IHR5cGVvZiBVaW50OEFycmF5ICE9PSBcInVuZGVmaW5lZFwiID8gVWludDhBcnJheSAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyA6IEFycmF5O1xuXG4vKipcbiAqIEFueSBjb21wYXRpYmxlIExvbmcgaW5zdGFuY2UuXG4gKiBUaGlzIGlzIGEgbWluaW1hbCBzdGFuZC1hbG9uZSBkZWZpbml0aW9uIG9mIGEgTG9uZyBpbnN0YW5jZS4gVGhlIGFjdHVhbCB0eXBlIGlzIHRoYXQgZXhwb3J0ZWQgYnkgbG9uZy5qcy5cbiAqIEBpbnRlcmZhY2UgTG9uZ1xuICogQHByb3BlcnR5IHtudW1iZXJ9IGxvdyBMb3cgYml0c1xuICogQHByb3BlcnR5IHtudW1iZXJ9IGhpZ2ggSGlnaCBiaXRzXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHVuc2lnbmVkIFdoZXRoZXIgdW5zaWduZWQgb3Igbm90XG4gKi9cblxuLyoqXG4gKiBMb25nLmpzJ3MgTG9uZyBjbGFzcyBpZiBhdmFpbGFibGUuXG4gKiBAdHlwZSB7Q29uc3RydWN0b3I8TG9uZz59XG4gKi9cbnV0aWwuTG9uZyA9IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIHV0aWwuZ2xvYmFsLmRjb2RlSU8gJiYgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gdXRpbC5nbG9iYWwuZGNvZGVJTy5Mb25nXG4gICAgICAgICB8fCAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyB1dGlsLmdsb2JhbC5Mb25nXG4gICAgICAgICB8fCB1dGlsLmlucXVpcmUoXCJsb25nXCIpO1xuXG4vKipcbiAqIFJlZ3VsYXIgZXhwcmVzc2lvbiB1c2VkIHRvIHZlcmlmeSAyIGJpdCAoYGJvb2xgKSBtYXAga2V5cy5cbiAqIEB0eXBlIHtSZWdFeHB9XG4gKiBAY29uc3RcbiAqL1xudXRpbC5rZXkyUmUgPSAvXnRydWV8ZmFsc2V8MHwxJC87XG5cbi8qKlxuICogUmVndWxhciBleHByZXNzaW9uIHVzZWQgdG8gdmVyaWZ5IDMyIGJpdCAoYGludDMyYCBldGMuKSBtYXAga2V5cy5cbiAqIEB0eXBlIHtSZWdFeHB9XG4gKiBAY29uc3RcbiAqL1xudXRpbC5rZXkzMlJlID0gL14tPyg/OjB8WzEtOV1bMC05XSopJC87XG5cbi8qKlxuICogUmVndWxhciBleHByZXNzaW9uIHVzZWQgdG8gdmVyaWZ5IDY0IGJpdCAoYGludDY0YCBldGMuKSBtYXAga2V5cy5cbiAqIEB0eXBlIHtSZWdFeHB9XG4gKiBAY29uc3RcbiAqL1xudXRpbC5rZXk2NFJlID0gL14oPzpbXFxcXHgwMC1cXFxceGZmXXs4fXwtPyg/OjB8WzEtOV1bMC05XSopKSQvO1xuXG4vKipcbiAqIENvbnZlcnRzIGEgbnVtYmVyIG9yIGxvbmcgdG8gYW4gOCBjaGFyYWN0ZXJzIGxvbmcgaGFzaCBzdHJpbmcuXG4gKiBAcGFyYW0ge0xvbmd8bnVtYmVyfSB2YWx1ZSBWYWx1ZSB0byBjb252ZXJ0XG4gKiBAcmV0dXJucyB7c3RyaW5nfSBIYXNoXG4gKi9cbnV0aWwubG9uZ1RvSGFzaCA9IGZ1bmN0aW9uIGxvbmdUb0hhc2godmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWVcbiAgICAgICAgPyB1dGlsLkxvbmdCaXRzLmZyb20odmFsdWUpLnRvSGFzaCgpXG4gICAgICAgIDogdXRpbC5Mb25nQml0cy56ZXJvSGFzaDtcbn07XG5cbi8qKlxuICogQ29udmVydHMgYW4gOCBjaGFyYWN0ZXJzIGxvbmcgaGFzaCBzdHJpbmcgdG8gYSBsb25nIG9yIG51bWJlci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBoYXNoIEhhc2hcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3Vuc2lnbmVkPWZhbHNlXSBXaGV0aGVyIHVuc2lnbmVkIG9yIG5vdFxuICogQHJldHVybnMge0xvbmd8bnVtYmVyfSBPcmlnaW5hbCB2YWx1ZVxuICovXG51dGlsLmxvbmdGcm9tSGFzaCA9IGZ1bmN0aW9uIGxvbmdGcm9tSGFzaChoYXNoLCB1bnNpZ25lZCkge1xuICAgIHZhciBiaXRzID0gdXRpbC5Mb25nQml0cy5mcm9tSGFzaChoYXNoKTtcbiAgICBpZiAodXRpbC5Mb25nKVxuICAgICAgICByZXR1cm4gdXRpbC5Mb25nLmZyb21CaXRzKGJpdHMubG8sIGJpdHMuaGksIHVuc2lnbmVkKTtcbiAgICByZXR1cm4gYml0cy50b051bWJlcihCb29sZWFuKHVuc2lnbmVkKSk7XG59O1xuXG4vKipcbiAqIE1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiB0aGUgc291cmNlIG9iamVjdCBpbnRvIHRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAbWVtYmVyb2YgdXRpbFxuICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gZHN0IERlc3RpbmF0aW9uIG9iamVjdFxuICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gc3JjIFNvdXJjZSBvYmplY3RcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lmTm90U2V0PWZhbHNlXSBNZXJnZXMgb25seSBpZiB0aGUga2V5IGlzIG5vdCBhbHJlYWR5IHNldFxuICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBEZXN0aW5hdGlvbiBvYmplY3RcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoZHN0LCBzcmMsIGlmTm90U2V0KSB7IC8vIHVzZWQgYnkgY29udmVydGVyc1xuICAgIGZvciAodmFyIGtleXMgPSBPYmplY3Qua2V5cyhzcmMpLCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpXG4gICAgICAgIGlmIChkc3Rba2V5c1tpXV0gPT09IHVuZGVmaW5lZCB8fCAhaWZOb3RTZXQpXG4gICAgICAgICAgICBkc3Rba2V5c1tpXV0gPSBzcmNba2V5c1tpXV07XG4gICAgcmV0dXJuIGRzdDtcbn1cblxudXRpbC5tZXJnZSA9IG1lcmdlO1xuXG4vKipcbiAqIENvbnZlcnRzIHRoZSBmaXJzdCBjaGFyYWN0ZXIgb2YgYSBzdHJpbmcgdG8gbG93ZXIgY2FzZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgU3RyaW5nIHRvIGNvbnZlcnRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IENvbnZlcnRlZCBzdHJpbmdcbiAqL1xudXRpbC5sY0ZpcnN0ID0gZnVuY3Rpb24gbGNGaXJzdChzdHIpIHtcbiAgICByZXR1cm4gc3RyLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgc3RyLnN1YnN0cmluZygxKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIGN1c3RvbSBlcnJvciBjb25zdHJ1Y3Rvci5cbiAqIEBtZW1iZXJvZiB1dGlsXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBFcnJvciBuYW1lXG4gKiBAcmV0dXJucyB7Q29uc3RydWN0b3I8RXJyb3I+fSBDdXN0b20gZXJyb3IgY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gbmV3RXJyb3IobmFtZSkge1xuXG4gICAgZnVuY3Rpb24gQ3VzdG9tRXJyb3IobWVzc2FnZSwgcHJvcGVydGllcykge1xuXG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBDdXN0b21FcnJvcikpXG4gICAgICAgICAgICByZXR1cm4gbmV3IEN1c3RvbUVycm9yKG1lc3NhZ2UsIHByb3BlcnRpZXMpO1xuXG4gICAgICAgIC8vIEVycm9yLmNhbGwodGhpcywgbWVzc2FnZSk7XG4gICAgICAgIC8vIF4ganVzdCByZXR1cm5zIGEgbmV3IGVycm9yIGluc3RhbmNlIGJlY2F1c2UgdGhlIGN0b3IgY2FuIGJlIGNhbGxlZCBhcyBhIGZ1bmN0aW9uXG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwibWVzc2FnZVwiLCB7IGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtZXNzYWdlOyB9IH0pO1xuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkgLy8gbm9kZVxuICAgICAgICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgQ3VzdG9tRXJyb3IpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJzdGFja1wiLCB7IHZhbHVlOiBuZXcgRXJyb3IoKS5zdGFjayB8fCBcIlwiIH0pO1xuXG4gICAgICAgIGlmIChwcm9wZXJ0aWVzKVxuICAgICAgICAgICAgbWVyZ2UodGhpcywgcHJvcGVydGllcyk7XG4gICAgfVxuXG4gICAgKEN1c3RvbUVycm9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXJyb3IucHJvdG90eXBlKSkuY29uc3RydWN0b3IgPSBDdXN0b21FcnJvcjtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDdXN0b21FcnJvci5wcm90b3R5cGUsIFwibmFtZVwiLCB7IGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBuYW1lOyB9IH0pO1xuXG4gICAgQ3VzdG9tRXJyb3IucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWUgKyBcIjogXCIgKyB0aGlzLm1lc3NhZ2U7XG4gICAgfTtcblxuICAgIHJldHVybiBDdXN0b21FcnJvcjtcbn1cblxudXRpbC5uZXdFcnJvciA9IG5ld0Vycm9yO1xuXG4vKipcbiAqIENvbnN0cnVjdHMgYSBuZXcgcHJvdG9jb2wgZXJyb3IuXG4gKiBAY2xhc3NkZXNjIEVycm9yIHN1YmNsYXNzIGluZGljYXRpbmcgYSBwcm90b2NvbCBzcGVjaWZjIGVycm9yLlxuICogQG1lbWJlcm9mIHV0aWxcbiAqIEBleHRlbmRzIEVycm9yXG4gKiBAdGVtcGxhdGUgVCBleHRlbmRzIE1lc3NhZ2U8VD5cbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgRXJyb3IgbWVzc2FnZVxuICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gW3Byb3BlcnRpZXNdIEFkZGl0aW9uYWwgcHJvcGVydGllc1xuICogQGV4YW1wbGVcbiAqIHRyeSB7XG4gKiAgICAgTXlNZXNzYWdlLmRlY29kZShzb21lQnVmZmVyKTsgLy8gdGhyb3dzIGlmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICogfSBjYXRjaCAoZSkge1xuICogICAgIGlmIChlIGluc3RhbmNlb2YgUHJvdG9jb2xFcnJvciAmJiBlLmluc3RhbmNlKVxuICogICAgICAgICBjb25zb2xlLmxvZyhcImRlY29kZWQgc28gZmFyOiBcIiArIEpTT04uc3RyaW5naWZ5KGUuaW5zdGFuY2UpKTtcbiAqIH1cbiAqL1xudXRpbC5Qcm90b2NvbEVycm9yID0gbmV3RXJyb3IoXCJQcm90b2NvbEVycm9yXCIpO1xuXG4vKipcbiAqIFNvIGZhciBkZWNvZGVkIG1lc3NhZ2UgaW5zdGFuY2UuXG4gKiBAbmFtZSB1dGlsLlByb3RvY29sRXJyb3IjaW5zdGFuY2VcbiAqIEB0eXBlIHtNZXNzYWdlPFQ+fVxuICovXG5cbi8qKlxuICogQSBPbmVPZiBnZXR0ZXIgYXMgcmV0dXJuZWQgYnkge0BsaW5rIHV0aWwub25lT2ZHZXR0ZXJ9LlxuICogQHR5cGVkZWYgT25lT2ZHZXR0ZXJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqIEByZXR1cm5zIHtzdHJpbmd8dW5kZWZpbmVkfSBTZXQgZmllbGQgbmFtZSwgaWYgYW55XG4gKi9cblxuLyoqXG4gKiBCdWlsZHMgYSBnZXR0ZXIgZm9yIGEgb25lb2YncyBwcmVzZW50IGZpZWxkIG5hbWUuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBmaWVsZE5hbWVzIEZpZWxkIG5hbWVzXG4gKiBAcmV0dXJucyB7T25lT2ZHZXR0ZXJ9IFVuYm91bmQgZ2V0dGVyXG4gKi9cbnV0aWwub25lT2ZHZXR0ZXIgPSBmdW5jdGlvbiBnZXRPbmVPZihmaWVsZE5hbWVzKSB7XG4gICAgdmFyIGZpZWxkTWFwID0ge307XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWVsZE5hbWVzLmxlbmd0aDsgKytpKVxuICAgICAgICBmaWVsZE1hcFtmaWVsZE5hbWVzW2ldXSA9IDE7XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfHVuZGVmaW5lZH0gU2V0IGZpZWxkIG5hbWUsIGlmIGFueVxuICAgICAqIEB0aGlzIE9iamVjdFxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgICAgICAgZm9yICh2YXIga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMpLCBpID0ga2V5cy5sZW5ndGggLSAxOyBpID4gLTE7IC0taSlcbiAgICAgICAgICAgIGlmIChmaWVsZE1hcFtrZXlzW2ldXSA9PT0gMSAmJiB0aGlzW2tleXNbaV1dICE9PSB1bmRlZmluZWQgJiYgdGhpc1trZXlzW2ldXSAhPT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5c1tpXTtcbiAgICB9O1xufTtcblxuLyoqXG4gKiBBIE9uZU9mIHNldHRlciBhcyByZXR1cm5lZCBieSB7QGxpbmsgdXRpbC5vbmVPZlNldHRlcn0uXG4gKiBAdHlwZWRlZiBPbmVPZlNldHRlclxuICogQHR5cGUge2Z1bmN0aW9ufVxuICogQHBhcmFtIHtzdHJpbmd8dW5kZWZpbmVkfSB2YWx1ZSBGaWVsZCBuYW1lXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICovXG5cbi8qKlxuICogQnVpbGRzIGEgc2V0dGVyIGZvciBhIG9uZW9mJ3MgcHJlc2VudCBmaWVsZCBuYW1lLlxuICogQHBhcmFtIHtzdHJpbmdbXX0gZmllbGROYW1lcyBGaWVsZCBuYW1lc1xuICogQHJldHVybnMge09uZU9mU2V0dGVyfSBVbmJvdW5kIHNldHRlclxuICovXG51dGlsLm9uZU9mU2V0dGVyID0gZnVuY3Rpb24gc2V0T25lT2YoZmllbGROYW1lcykge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgRmllbGQgbmFtZVxuICAgICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gICAgICogQHRoaXMgT2JqZWN0XG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHJldHVybiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmllbGROYW1lcy5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgIGlmIChmaWVsZE5hbWVzW2ldICE9PSBuYW1lKVxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzW2ZpZWxkTmFtZXNbaV1dO1xuICAgIH07XG59O1xuXG4vKipcbiAqIERlZmF1bHQgY29udmVyc2lvbiBvcHRpb25zIHVzZWQgZm9yIHtAbGluayBNZXNzYWdlI3RvSlNPTn0gaW1wbGVtZW50YXRpb25zLlxuICpcbiAqIFRoZXNlIG9wdGlvbnMgYXJlIGNsb3NlIHRvIHByb3RvMydzIEpTT04gbWFwcGluZyB3aXRoIHRoZSBleGNlcHRpb24gdGhhdCBpbnRlcm5hbCB0eXBlcyBsaWtlIEFueSBhcmUgaGFuZGxlZCBqdXN0IGxpa2UgbWVzc2FnZXMuIE1vcmUgcHJlY2lzZWx5OlxuICpcbiAqIC0gTG9uZ3MgYmVjb21lIHN0cmluZ3NcbiAqIC0gRW51bXMgYmVjb21lIHN0cmluZyBrZXlzXG4gKiAtIEJ5dGVzIGJlY29tZSBiYXNlNjQgZW5jb2RlZCBzdHJpbmdzXG4gKiAtIChTdWItKU1lc3NhZ2VzIGJlY29tZSBwbGFpbiBvYmplY3RzXG4gKiAtIE1hcHMgYmVjb21lIHBsYWluIG9iamVjdHMgd2l0aCBhbGwgc3RyaW5nIGtleXNcbiAqIC0gUmVwZWF0ZWQgZmllbGRzIGJlY29tZSBhcnJheXNcbiAqIC0gTmFOIGFuZCBJbmZpbml0eSBmb3IgZmxvYXQgYW5kIGRvdWJsZSBmaWVsZHMgYmVjb21lIHN0cmluZ3NcbiAqXG4gKiBAdHlwZSB7SUNvbnZlcnNpb25PcHRpb25zfVxuICogQHNlZSBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9wcm90b2NvbC1idWZmZXJzL2RvY3MvcHJvdG8zP2hsPWVuI2pzb25cbiAqL1xudXRpbC50b0pTT05PcHRpb25zID0ge1xuICAgIGxvbmdzOiBTdHJpbmcsXG4gICAgZW51bXM6IFN0cmluZyxcbiAgICBieXRlczogU3RyaW5nLFxuICAgIGpzb246IHRydWVcbn07XG5cbi8vIFNldHMgdXAgYnVmZmVyIHV0aWxpdHkgYWNjb3JkaW5nIHRvIHRoZSBlbnZpcm9ubWVudCAoY2FsbGVkIGluIGluZGV4LW1pbmltYWwpXG51dGlsLl9jb25maWd1cmUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgQnVmZmVyID0gdXRpbC5CdWZmZXI7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKCFCdWZmZXIpIHtcbiAgICAgICAgdXRpbC5fQnVmZmVyX2Zyb20gPSB1dGlsLl9CdWZmZXJfYWxsb2NVbnNhZmUgPSBudWxsO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIGJlY2F1c2Ugbm9kZSA0LnggYnVmZmVycyBhcmUgaW5jb21wYXRpYmxlICYgaW1tdXRhYmxlXG4gICAgLy8gc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGNvZGVJTy9wcm90b2J1Zi5qcy9wdWxsLzY2NVxuICAgIHV0aWwuX0J1ZmZlcl9mcm9tID0gQnVmZmVyLmZyb20gIT09IFVpbnQ4QXJyYXkuZnJvbSAmJiBCdWZmZXIuZnJvbSB8fFxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBmdW5jdGlvbiBCdWZmZXJfZnJvbSh2YWx1ZSwgZW5jb2RpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQnVmZmVyKHZhbHVlLCBlbmNvZGluZyk7XG4gICAgICAgIH07XG4gICAgdXRpbC5fQnVmZmVyX2FsbG9jVW5zYWZlID0gQnVmZmVyLmFsbG9jVW5zYWZlIHx8XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIGZ1bmN0aW9uIEJ1ZmZlcl9hbGxvY1Vuc2FmZShzaXplKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEJ1ZmZlcihzaXplKTtcbiAgICAgICAgfTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gV3JpdGVyO1xuXG52YXIgdXRpbCAgICAgID0gcmVxdWlyZShcIi4vdXRpbC9taW5pbWFsXCIpO1xuXG52YXIgQnVmZmVyV3JpdGVyOyAvLyBjeWNsaWNcblxudmFyIExvbmdCaXRzICA9IHV0aWwuTG9uZ0JpdHMsXG4gICAgYmFzZTY0ICAgID0gdXRpbC5iYXNlNjQsXG4gICAgdXRmOCAgICAgID0gdXRpbC51dGY4O1xuXG4vKipcbiAqIENvbnN0cnVjdHMgYSBuZXcgd3JpdGVyIG9wZXJhdGlvbiBpbnN0YW5jZS5cbiAqIEBjbGFzc2Rlc2MgU2NoZWR1bGVkIHdyaXRlciBvcGVyYXRpb24uXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKiwgVWludDhBcnJheSwgbnVtYmVyKX0gZm4gRnVuY3Rpb24gdG8gY2FsbFxuICogQHBhcmFtIHtudW1iZXJ9IGxlbiBWYWx1ZSBieXRlIGxlbmd0aFxuICogQHBhcmFtIHsqfSB2YWwgVmFsdWUgdG8gd3JpdGVcbiAqIEBpZ25vcmVcbiAqL1xuZnVuY3Rpb24gT3AoZm4sIGxlbiwgdmFsKSB7XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBjYWxsLlxuICAgICAqIEB0eXBlIHtmdW5jdGlvbihVaW50OEFycmF5LCBudW1iZXIsICopfVxuICAgICAqL1xuICAgIHRoaXMuZm4gPSBmbjtcblxuICAgIC8qKlxuICAgICAqIFZhbHVlIGJ5dGUgbGVuZ3RoLlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5sZW4gPSBsZW47XG5cbiAgICAvKipcbiAgICAgKiBOZXh0IG9wZXJhdGlvbi5cbiAgICAgKiBAdHlwZSB7V3JpdGVyLk9wfHVuZGVmaW5lZH1cbiAgICAgKi9cbiAgICB0aGlzLm5leHQgPSB1bmRlZmluZWQ7XG5cbiAgICAvKipcbiAgICAgKiBWYWx1ZSB0byB3cml0ZS5cbiAgICAgKiBAdHlwZSB7Kn1cbiAgICAgKi9cbiAgICB0aGlzLnZhbCA9IHZhbDsgLy8gdHlwZSB2YXJpZXNcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmZ1bmN0aW9uIG5vb3AoKSB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWVtcHR5LWZ1bmN0aW9uXG5cbi8qKlxuICogQ29uc3RydWN0cyBhIG5ldyB3cml0ZXIgc3RhdGUgaW5zdGFuY2UuXG4gKiBAY2xhc3NkZXNjIENvcGllZCB3cml0ZXIgc3RhdGUuXG4gKiBAbWVtYmVyb2YgV3JpdGVyXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7V3JpdGVyfSB3cml0ZXIgV3JpdGVyIHRvIGNvcHkgc3RhdGUgZnJvbVxuICogQGlnbm9yZVxuICovXG5mdW5jdGlvbiBTdGF0ZSh3cml0ZXIpIHtcblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgaGVhZC5cbiAgICAgKiBAdHlwZSB7V3JpdGVyLk9wfVxuICAgICAqL1xuICAgIHRoaXMuaGVhZCA9IHdyaXRlci5oZWFkO1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCB0YWlsLlxuICAgICAqIEB0eXBlIHtXcml0ZXIuT3B9XG4gICAgICovXG4gICAgdGhpcy50YWlsID0gd3JpdGVyLnRhaWw7XG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IGJ1ZmZlciBsZW5ndGguXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLmxlbiA9IHdyaXRlci5sZW47XG5cbiAgICAvKipcbiAgICAgKiBOZXh0IHN0YXRlLlxuICAgICAqIEB0eXBlIHtTdGF0ZXxudWxsfVxuICAgICAqL1xuICAgIHRoaXMubmV4dCA9IHdyaXRlci5zdGF0ZXM7XG59XG5cbi8qKlxuICogQ29uc3RydWN0cyBhIG5ldyB3cml0ZXIgaW5zdGFuY2UuXG4gKiBAY2xhc3NkZXNjIFdpcmUgZm9ybWF0IHdyaXRlciB1c2luZyBgVWludDhBcnJheWAgaWYgYXZhaWxhYmxlLCBvdGhlcndpc2UgYEFycmF5YC5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBXcml0ZXIoKSB7XG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IGxlbmd0aC5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMubGVuID0gMDtcblxuICAgIC8qKlxuICAgICAqIE9wZXJhdGlvbnMgaGVhZC5cbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIHRoaXMuaGVhZCA9IG5ldyBPcChub29wLCAwLCAwKTtcblxuICAgIC8qKlxuICAgICAqIE9wZXJhdGlvbnMgdGFpbFxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgdGhpcy50YWlsID0gdGhpcy5oZWFkO1xuXG4gICAgLyoqXG4gICAgICogTGlua2VkIGZvcmtlZCBzdGF0ZXMuXG4gICAgICogQHR5cGUge09iamVjdHxudWxsfVxuICAgICAqL1xuICAgIHRoaXMuc3RhdGVzID0gbnVsbDtcblxuICAgIC8vIFdoZW4gYSB2YWx1ZSBpcyB3cml0dGVuLCB0aGUgd3JpdGVyIGNhbGN1bGF0ZXMgaXRzIGJ5dGUgbGVuZ3RoIGFuZCBwdXRzIGl0IGludG8gYSBsaW5rZWRcbiAgICAvLyBsaXN0IG9mIG9wZXJhdGlvbnMgdG8gcGVyZm9ybSB3aGVuIGZpbmlzaCgpIGlzIGNhbGxlZC4gVGhpcyBib3RoIGFsbG93cyB1cyB0byBhbGxvY2F0ZVxuICAgIC8vIGJ1ZmZlcnMgb2YgdGhlIGV4YWN0IHJlcXVpcmVkIHNpemUgYW5kIHJlZHVjZXMgdGhlIGFtb3VudCBvZiB3b3JrIHdlIGhhdmUgdG8gZG8gY29tcGFyZWRcbiAgICAvLyB0byBmaXJzdCBjYWxjdWxhdGluZyBvdmVyIG9iamVjdHMgYW5kIHRoZW4gZW5jb2Rpbmcgb3ZlciBvYmplY3RzLiBJbiBvdXIgY2FzZSwgdGhlIGVuY29kaW5nXG4gICAgLy8gcGFydCBpcyBqdXN0IGEgbGlua2VkIGxpc3Qgd2FsayBjYWxsaW5nIG9wZXJhdGlvbnMgd2l0aCBhbHJlYWR5IHByZXBhcmVkIHZhbHVlcy5cbn1cblxudmFyIGNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICByZXR1cm4gdXRpbC5CdWZmZXJcbiAgICAgICAgPyBmdW5jdGlvbiBjcmVhdGVfYnVmZmVyX3NldHVwKCkge1xuICAgICAgICAgICAgcmV0dXJuIChXcml0ZXIuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlX2J1ZmZlcigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJ1ZmZlcldyaXRlcigpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICA6IGZ1bmN0aW9uIGNyZWF0ZV9hcnJheSgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgV3JpdGVyKCk7XG4gICAgICAgIH07XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgd3JpdGVyLlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7QnVmZmVyV3JpdGVyfFdyaXRlcn0gQSB7QGxpbmsgQnVmZmVyV3JpdGVyfSB3aGVuIEJ1ZmZlcnMgYXJlIHN1cHBvcnRlZCwgb3RoZXJ3aXNlIGEge0BsaW5rIFdyaXRlcn1cbiAqL1xuV3JpdGVyLmNyZWF0ZSA9IGNyZWF0ZSgpO1xuXG4vKipcbiAqIEFsbG9jYXRlcyBhIGJ1ZmZlciBvZiB0aGUgc3BlY2lmaWVkIHNpemUuXG4gKiBAcGFyYW0ge251bWJlcn0gc2l6ZSBCdWZmZXIgc2l6ZVxuICogQHJldHVybnMge1VpbnQ4QXJyYXl9IEJ1ZmZlclxuICovXG5Xcml0ZXIuYWxsb2MgPSBmdW5jdGlvbiBhbGxvYyhzaXplKSB7XG4gICAgcmV0dXJuIG5ldyB1dGlsLkFycmF5KHNpemUpO1xufTtcblxuLy8gVXNlIFVpbnQ4QXJyYXkgYnVmZmVyIHBvb2wgaW4gdGhlIGJyb3dzZXIsIGp1c3QgbGlrZSBub2RlIGRvZXMgd2l0aCBidWZmZXJzXG4vKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuaWYgKHV0aWwuQXJyYXkgIT09IEFycmF5KVxuICAgIFdyaXRlci5hbGxvYyA9IHV0aWwucG9vbChXcml0ZXIuYWxsb2MsIHV0aWwuQXJyYXkucHJvdG90eXBlLnN1YmFycmF5KTtcblxuLyoqXG4gKiBQdXNoZXMgYSBuZXcgb3BlcmF0aW9uIHRvIHRoZSBxdWV1ZS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oVWludDhBcnJheSwgbnVtYmVyLCAqKX0gZm4gRnVuY3Rpb24gdG8gY2FsbFxuICogQHBhcmFtIHtudW1iZXJ9IGxlbiBWYWx1ZSBieXRlIGxlbmd0aFxuICogQHBhcmFtIHtudW1iZXJ9IHZhbCBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKiBAcHJpdmF0ZVxuICovXG5Xcml0ZXIucHJvdG90eXBlLl9wdXNoID0gZnVuY3Rpb24gcHVzaChmbiwgbGVuLCB2YWwpIHtcbiAgICB0aGlzLnRhaWwgPSB0aGlzLnRhaWwubmV4dCA9IG5ldyBPcChmbiwgbGVuLCB2YWwpO1xuICAgIHRoaXMubGVuICs9IGxlbjtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIHdyaXRlQnl0ZSh2YWwsIGJ1ZiwgcG9zKSB7XG4gICAgYnVmW3Bvc10gPSB2YWwgJiAyNTU7XG59XG5cbmZ1bmN0aW9uIHdyaXRlVmFyaW50MzIodmFsLCBidWYsIHBvcykge1xuICAgIHdoaWxlICh2YWwgPiAxMjcpIHtcbiAgICAgICAgYnVmW3BvcysrXSA9IHZhbCAmIDEyNyB8IDEyODtcbiAgICAgICAgdmFsID4+Pj0gNztcbiAgICB9XG4gICAgYnVmW3Bvc10gPSB2YWw7XG59XG5cbi8qKlxuICogQ29uc3RydWN0cyBhIG5ldyB2YXJpbnQgd3JpdGVyIG9wZXJhdGlvbiBpbnN0YW5jZS5cbiAqIEBjbGFzc2Rlc2MgU2NoZWR1bGVkIHZhcmludCB3cml0ZXIgb3BlcmF0aW9uLlxuICogQGV4dGVuZHMgT3BcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtudW1iZXJ9IGxlbiBWYWx1ZSBieXRlIGxlbmd0aFxuICogQHBhcmFtIHtudW1iZXJ9IHZhbCBWYWx1ZSB0byB3cml0ZVxuICogQGlnbm9yZVxuICovXG5mdW5jdGlvbiBWYXJpbnRPcChsZW4sIHZhbCkge1xuICAgIHRoaXMubGVuID0gbGVuO1xuICAgIHRoaXMubmV4dCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnZhbCA9IHZhbDtcbn1cblxuVmFyaW50T3AucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShPcC5wcm90b3R5cGUpO1xuVmFyaW50T3AucHJvdG90eXBlLmZuID0gd3JpdGVWYXJpbnQzMjtcblxuLyoqXG4gKiBXcml0ZXMgYW4gdW5zaWduZWQgMzIgYml0IHZhbHVlIGFzIGEgdmFyaW50LlxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS51aW50MzIgPSBmdW5jdGlvbiB3cml0ZV91aW50MzIodmFsdWUpIHtcbiAgICAvLyBoZXJlLCB0aGUgY2FsbCB0byB0aGlzLnB1c2ggaGFzIGJlZW4gaW5saW5lZCBhbmQgYSB2YXJpbnQgc3BlY2lmaWMgT3Agc3ViY2xhc3MgaXMgdXNlZC5cbiAgICAvLyB1aW50MzIgaXMgYnkgZmFyIHRoZSBtb3N0IGZyZXF1ZW50bHkgdXNlZCBvcGVyYXRpb24gYW5kIGJlbmVmaXRzIHNpZ25pZmljYW50bHkgZnJvbSB0aGlzLlxuICAgIHRoaXMubGVuICs9ICh0aGlzLnRhaWwgPSB0aGlzLnRhaWwubmV4dCA9IG5ldyBWYXJpbnRPcChcbiAgICAgICAgKHZhbHVlID0gdmFsdWUgPj4+IDApXG4gICAgICAgICAgICAgICAgPCAxMjggICAgICAgPyAxXG4gICAgICAgIDogdmFsdWUgPCAxNjM4NCAgICAgPyAyXG4gICAgICAgIDogdmFsdWUgPCAyMDk3MTUyICAgPyAzXG4gICAgICAgIDogdmFsdWUgPCAyNjg0MzU0NTYgPyA0XG4gICAgICAgIDogICAgICAgICAgICAgICAgICAgICA1LFxuICAgIHZhbHVlKSkubGVuO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBXcml0ZXMgYSBzaWduZWQgMzIgYml0IHZhbHVlIGFzIGEgdmFyaW50LlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLmludDMyID0gZnVuY3Rpb24gd3JpdGVfaW50MzIodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPCAwXG4gICAgICAgID8gdGhpcy5fcHVzaCh3cml0ZVZhcmludDY0LCAxMCwgTG9uZ0JpdHMuZnJvbU51bWJlcih2YWx1ZSkpIC8vIDEwIGJ5dGVzIHBlciBzcGVjXG4gICAgICAgIDogdGhpcy51aW50MzIodmFsdWUpO1xufTtcblxuLyoqXG4gKiBXcml0ZXMgYSAzMiBiaXQgdmFsdWUgYXMgYSB2YXJpbnQsIHppZy16YWcgZW5jb2RlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUuc2ludDMyID0gZnVuY3Rpb24gd3JpdGVfc2ludDMyKHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMudWludDMyKCh2YWx1ZSA8PCAxIF4gdmFsdWUgPj4gMzEpID4+PiAwKTtcbn07XG5cbmZ1bmN0aW9uIHdyaXRlVmFyaW50NjQodmFsLCBidWYsIHBvcykge1xuICAgIHdoaWxlICh2YWwuaGkpIHtcbiAgICAgICAgYnVmW3BvcysrXSA9IHZhbC5sbyAmIDEyNyB8IDEyODtcbiAgICAgICAgdmFsLmxvID0gKHZhbC5sbyA+Pj4gNyB8IHZhbC5oaSA8PCAyNSkgPj4+IDA7XG4gICAgICAgIHZhbC5oaSA+Pj49IDc7XG4gICAgfVxuICAgIHdoaWxlICh2YWwubG8gPiAxMjcpIHtcbiAgICAgICAgYnVmW3BvcysrXSA9IHZhbC5sbyAmIDEyNyB8IDEyODtcbiAgICAgICAgdmFsLmxvID0gdmFsLmxvID4+PiA3O1xuICAgIH1cbiAgICBidWZbcG9zKytdID0gdmFsLmxvO1xufVxuXG4vKipcbiAqIFdyaXRlcyBhbiB1bnNpZ25lZCA2NCBiaXQgdmFsdWUgYXMgYSB2YXJpbnQuXG4gKiBAcGFyYW0ge0xvbmd8bnVtYmVyfHN0cmluZ30gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBgdmFsdWVgIGlzIGEgc3RyaW5nIGFuZCBubyBsb25nIGxpYnJhcnkgaXMgcHJlc2VudC5cbiAqL1xuV3JpdGVyLnByb3RvdHlwZS51aW50NjQgPSBmdW5jdGlvbiB3cml0ZV91aW50NjQodmFsdWUpIHtcbiAgICB2YXIgYml0cyA9IExvbmdCaXRzLmZyb20odmFsdWUpO1xuICAgIHJldHVybiB0aGlzLl9wdXNoKHdyaXRlVmFyaW50NjQsIGJpdHMubGVuZ3RoKCksIGJpdHMpO1xufTtcblxuLyoqXG4gKiBXcml0ZXMgYSBzaWduZWQgNjQgYml0IHZhbHVlIGFzIGEgdmFyaW50LlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge0xvbmd8bnVtYmVyfHN0cmluZ30gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBgdmFsdWVgIGlzIGEgc3RyaW5nIGFuZCBubyBsb25nIGxpYnJhcnkgaXMgcHJlc2VudC5cbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5pbnQ2NCA9IFdyaXRlci5wcm90b3R5cGUudWludDY0O1xuXG4vKipcbiAqIFdyaXRlcyBhIHNpZ25lZCA2NCBiaXQgdmFsdWUgYXMgYSB2YXJpbnQsIHppZy16YWcgZW5jb2RlZC5cbiAqIEBwYXJhbSB7TG9uZ3xudW1iZXJ8c3RyaW5nfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGB2YWx1ZWAgaXMgYSBzdHJpbmcgYW5kIG5vIGxvbmcgbGlicmFyeSBpcyBwcmVzZW50LlxuICovXG5Xcml0ZXIucHJvdG90eXBlLnNpbnQ2NCA9IGZ1bmN0aW9uIHdyaXRlX3NpbnQ2NCh2YWx1ZSkge1xuICAgIHZhciBiaXRzID0gTG9uZ0JpdHMuZnJvbSh2YWx1ZSkuenpFbmNvZGUoKTtcbiAgICByZXR1cm4gdGhpcy5fcHVzaCh3cml0ZVZhcmludDY0LCBiaXRzLmxlbmd0aCgpLCBiaXRzKTtcbn07XG5cbi8qKlxuICogV3JpdGVzIGEgYm9vbGlzaCB2YWx1ZSBhcyBhIHZhcmludC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLmJvb2wgPSBmdW5jdGlvbiB3cml0ZV9ib29sKHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuX3B1c2god3JpdGVCeXRlLCAxLCB2YWx1ZSA/IDEgOiAwKTtcbn07XG5cbmZ1bmN0aW9uIHdyaXRlRml4ZWQzMih2YWwsIGJ1ZiwgcG9zKSB7XG4gICAgYnVmW3BvcyAgICBdID0gIHZhbCAgICAgICAgICYgMjU1O1xuICAgIGJ1Zltwb3MgKyAxXSA9ICB2YWwgPj4+IDggICAmIDI1NTtcbiAgICBidWZbcG9zICsgMl0gPSAgdmFsID4+PiAxNiAgJiAyNTU7XG4gICAgYnVmW3BvcyArIDNdID0gIHZhbCA+Pj4gMjQ7XG59XG5cbi8qKlxuICogV3JpdGVzIGFuIHVuc2lnbmVkIDMyIGJpdCB2YWx1ZSBhcyBmaXhlZCAzMiBiaXRzLlxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5maXhlZDMyID0gZnVuY3Rpb24gd3JpdGVfZml4ZWQzMih2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzLl9wdXNoKHdyaXRlRml4ZWQzMiwgNCwgdmFsdWUgPj4+IDApO1xufTtcblxuLyoqXG4gKiBXcml0ZXMgYSBzaWduZWQgMzIgYml0IHZhbHVlIGFzIGZpeGVkIDMyIGJpdHMuXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUuc2ZpeGVkMzIgPSBXcml0ZXIucHJvdG90eXBlLmZpeGVkMzI7XG5cbi8qKlxuICogV3JpdGVzIGFuIHVuc2lnbmVkIDY0IGJpdCB2YWx1ZSBhcyBmaXhlZCA2NCBiaXRzLlxuICogQHBhcmFtIHtMb25nfG51bWJlcnxzdHJpbmd9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgYHZhbHVlYCBpcyBhIHN0cmluZyBhbmQgbm8gbG9uZyBsaWJyYXJ5IGlzIHByZXNlbnQuXG4gKi9cbldyaXRlci5wcm90b3R5cGUuZml4ZWQ2NCA9IGZ1bmN0aW9uIHdyaXRlX2ZpeGVkNjQodmFsdWUpIHtcbiAgICB2YXIgYml0cyA9IExvbmdCaXRzLmZyb20odmFsdWUpO1xuICAgIHJldHVybiB0aGlzLl9wdXNoKHdyaXRlRml4ZWQzMiwgNCwgYml0cy5sbykuX3B1c2god3JpdGVGaXhlZDMyLCA0LCBiaXRzLmhpKTtcbn07XG5cbi8qKlxuICogV3JpdGVzIGEgc2lnbmVkIDY0IGJpdCB2YWx1ZSBhcyBmaXhlZCA2NCBiaXRzLlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge0xvbmd8bnVtYmVyfHN0cmluZ30gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBgdmFsdWVgIGlzIGEgc3RyaW5nIGFuZCBubyBsb25nIGxpYnJhcnkgaXMgcHJlc2VudC5cbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5zZml4ZWQ2NCA9IFdyaXRlci5wcm90b3R5cGUuZml4ZWQ2NDtcblxuLyoqXG4gKiBXcml0ZXMgYSBmbG9hdCAoMzIgYml0KS5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5mbG9hdCA9IGZ1bmN0aW9uIHdyaXRlX2Zsb2F0KHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuX3B1c2godXRpbC5mbG9hdC53cml0ZUZsb2F0TEUsIDQsIHZhbHVlKTtcbn07XG5cbi8qKlxuICogV3JpdGVzIGEgZG91YmxlICg2NCBiaXQgZmxvYXQpLlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLmRvdWJsZSA9IGZ1bmN0aW9uIHdyaXRlX2RvdWJsZSh2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzLl9wdXNoKHV0aWwuZmxvYXQud3JpdGVEb3VibGVMRSwgOCwgdmFsdWUpO1xufTtcblxudmFyIHdyaXRlQnl0ZXMgPSB1dGlsLkFycmF5LnByb3RvdHlwZS5zZXRcbiAgICA/IGZ1bmN0aW9uIHdyaXRlQnl0ZXNfc2V0KHZhbCwgYnVmLCBwb3MpIHtcbiAgICAgICAgYnVmLnNldCh2YWwsIHBvcyk7IC8vIGFsc28gd29ya3MgZm9yIHBsYWluIGFycmF5IHZhbHVlc1xuICAgIH1cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIDogZnVuY3Rpb24gd3JpdGVCeXRlc19mb3IodmFsLCBidWYsIHBvcykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbC5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgIGJ1Zltwb3MgKyBpXSA9IHZhbFtpXTtcbiAgICB9O1xuXG4vKipcbiAqIFdyaXRlcyBhIHNlcXVlbmNlIG9mIGJ5dGVzLlxuICogQHBhcmFtIHtVaW50OEFycmF5fHN0cmluZ30gdmFsdWUgQnVmZmVyIG9yIGJhc2U2NCBlbmNvZGVkIHN0cmluZyB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUuYnl0ZXMgPSBmdW5jdGlvbiB3cml0ZV9ieXRlcyh2YWx1ZSkge1xuICAgIHZhciBsZW4gPSB2YWx1ZS5sZW5ndGggPj4+IDA7XG4gICAgaWYgKCFsZW4pXG4gICAgICAgIHJldHVybiB0aGlzLl9wdXNoKHdyaXRlQnl0ZSwgMSwgMCk7XG4gICAgaWYgKHV0aWwuaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICAgIHZhciBidWYgPSBXcml0ZXIuYWxsb2MobGVuID0gYmFzZTY0Lmxlbmd0aCh2YWx1ZSkpO1xuICAgICAgICBiYXNlNjQuZGVjb2RlKHZhbHVlLCBidWYsIDApO1xuICAgICAgICB2YWx1ZSA9IGJ1ZjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudWludDMyKGxlbikuX3B1c2god3JpdGVCeXRlcywgbGVuLCB2YWx1ZSk7XG59O1xuXG4vKipcbiAqIFdyaXRlcyBhIHN0cmluZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUuc3RyaW5nID0gZnVuY3Rpb24gd3JpdGVfc3RyaW5nKHZhbHVlKSB7XG4gICAgdmFyIGxlbiA9IHV0ZjgubGVuZ3RoKHZhbHVlKTtcbiAgICByZXR1cm4gbGVuXG4gICAgICAgID8gdGhpcy51aW50MzIobGVuKS5fcHVzaCh1dGY4LndyaXRlLCBsZW4sIHZhbHVlKVxuICAgICAgICA6IHRoaXMuX3B1c2god3JpdGVCeXRlLCAxLCAwKTtcbn07XG5cbi8qKlxuICogRm9ya3MgdGhpcyB3cml0ZXIncyBzdGF0ZSBieSBwdXNoaW5nIGl0IHRvIGEgc3RhY2suXG4gKiBDYWxsaW5nIHtAbGluayBXcml0ZXIjcmVzZXR8cmVzZXR9IG9yIHtAbGluayBXcml0ZXIjbGRlbGltfGxkZWxpbX0gcmVzZXRzIHRoZSB3cml0ZXIgdG8gdGhlIHByZXZpb3VzIHN0YXRlLlxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUuZm9yayA9IGZ1bmN0aW9uIGZvcmsoKSB7XG4gICAgdGhpcy5zdGF0ZXMgPSBuZXcgU3RhdGUodGhpcyk7XG4gICAgdGhpcy5oZWFkID0gdGhpcy50YWlsID0gbmV3IE9wKG5vb3AsIDAsIDApO1xuICAgIHRoaXMubGVuID0gMDtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVzZXRzIHRoaXMgaW5zdGFuY2UgdG8gdGhlIGxhc3Qgc3RhdGUuXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgIGlmICh0aGlzLnN0YXRlcykge1xuICAgICAgICB0aGlzLmhlYWQgICA9IHRoaXMuc3RhdGVzLmhlYWQ7XG4gICAgICAgIHRoaXMudGFpbCAgID0gdGhpcy5zdGF0ZXMudGFpbDtcbiAgICAgICAgdGhpcy5sZW4gICAgPSB0aGlzLnN0YXRlcy5sZW47XG4gICAgICAgIHRoaXMuc3RhdGVzID0gdGhpcy5zdGF0ZXMubmV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmhlYWQgPSB0aGlzLnRhaWwgPSBuZXcgT3Aobm9vcCwgMCwgMCk7XG4gICAgICAgIHRoaXMubGVuICA9IDA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZXNldHMgdG8gdGhlIGxhc3Qgc3RhdGUgYW5kIGFwcGVuZHMgdGhlIGZvcmsgc3RhdGUncyBjdXJyZW50IHdyaXRlIGxlbmd0aCBhcyBhIHZhcmludCBmb2xsb3dlZCBieSBpdHMgb3BlcmF0aW9ucy5cbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLmxkZWxpbSA9IGZ1bmN0aW9uIGxkZWxpbSgpIHtcbiAgICB2YXIgaGVhZCA9IHRoaXMuaGVhZCxcbiAgICAgICAgdGFpbCA9IHRoaXMudGFpbCxcbiAgICAgICAgbGVuICA9IHRoaXMubGVuO1xuICAgIHRoaXMucmVzZXQoKS51aW50MzIobGVuKTtcbiAgICBpZiAobGVuKSB7XG4gICAgICAgIHRoaXMudGFpbC5uZXh0ID0gaGVhZC5uZXh0OyAvLyBza2lwIG5vb3BcbiAgICAgICAgdGhpcy50YWlsID0gdGFpbDtcbiAgICAgICAgdGhpcy5sZW4gKz0gbGVuO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRmluaXNoZXMgdGhlIHdyaXRlIG9wZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtVaW50OEFycmF5fSBGaW5pc2hlZCBidWZmZXJcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5maW5pc2ggPSBmdW5jdGlvbiBmaW5pc2goKSB7XG4gICAgdmFyIGhlYWQgPSB0aGlzLmhlYWQubmV4dCwgLy8gc2tpcCBub29wXG4gICAgICAgIGJ1ZiAgPSB0aGlzLmNvbnN0cnVjdG9yLmFsbG9jKHRoaXMubGVuKSxcbiAgICAgICAgcG9zICA9IDA7XG4gICAgd2hpbGUgKGhlYWQpIHtcbiAgICAgICAgaGVhZC5mbihoZWFkLnZhbCwgYnVmLCBwb3MpO1xuICAgICAgICBwb3MgKz0gaGVhZC5sZW47XG4gICAgICAgIGhlYWQgPSBoZWFkLm5leHQ7XG4gICAgfVxuICAgIC8vIHRoaXMuaGVhZCA9IHRoaXMudGFpbCA9IG51bGw7XG4gICAgcmV0dXJuIGJ1Zjtcbn07XG5cbldyaXRlci5fY29uZmlndXJlID0gZnVuY3Rpb24oQnVmZmVyV3JpdGVyXykge1xuICAgIEJ1ZmZlcldyaXRlciA9IEJ1ZmZlcldyaXRlcl87XG4gICAgV3JpdGVyLmNyZWF0ZSA9IGNyZWF0ZSgpO1xuICAgIEJ1ZmZlcldyaXRlci5fY29uZmlndXJlKCk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IEJ1ZmZlcldyaXRlcjtcblxuLy8gZXh0ZW5kcyBXcml0ZXJcbnZhciBXcml0ZXIgPSByZXF1aXJlKFwiLi93cml0ZXJcIik7XG4oQnVmZmVyV3JpdGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoV3JpdGVyLnByb3RvdHlwZSkpLmNvbnN0cnVjdG9yID0gQnVmZmVyV3JpdGVyO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuL3V0aWwvbWluaW1hbFwiKTtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IGJ1ZmZlciB3cml0ZXIgaW5zdGFuY2UuXG4gKiBAY2xhc3NkZXNjIFdpcmUgZm9ybWF0IHdyaXRlciB1c2luZyBub2RlIGJ1ZmZlcnMuXG4gKiBAZXh0ZW5kcyBXcml0ZXJcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBCdWZmZXJXcml0ZXIoKSB7XG4gICAgV3JpdGVyLmNhbGwodGhpcyk7XG59XG5cbkJ1ZmZlcldyaXRlci5fY29uZmlndXJlID0gZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEFsbG9jYXRlcyBhIGJ1ZmZlciBvZiB0aGUgc3BlY2lmaWVkIHNpemUuXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNpemUgQnVmZmVyIHNpemVcbiAgICAgKiBAcmV0dXJucyB7QnVmZmVyfSBCdWZmZXJcbiAgICAgKi9cbiAgICBCdWZmZXJXcml0ZXIuYWxsb2MgPSB1dGlsLl9CdWZmZXJfYWxsb2NVbnNhZmU7XG5cbiAgICBCdWZmZXJXcml0ZXIud3JpdGVCeXRlc0J1ZmZlciA9IHV0aWwuQnVmZmVyICYmIHV0aWwuQnVmZmVyLnByb3RvdHlwZSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkgJiYgdXRpbC5CdWZmZXIucHJvdG90eXBlLnNldC5uYW1lID09PSBcInNldFwiXG4gICAgICAgID8gZnVuY3Rpb24gd3JpdGVCeXRlc0J1ZmZlcl9zZXQodmFsLCBidWYsIHBvcykge1xuICAgICAgICAgIGJ1Zi5zZXQodmFsLCBwb3MpOyAvLyBmYXN0ZXIgdGhhbiBjb3B5IChyZXF1aXJlcyBub2RlID49IDQgd2hlcmUgQnVmZmVycyBleHRlbmQgVWludDhBcnJheSBhbmQgc2V0IGlzIHByb3Blcmx5IGluaGVyaXRlZClcbiAgICAgICAgICAvLyBhbHNvIHdvcmtzIGZvciBwbGFpbiBhcnJheSB2YWx1ZXNcbiAgICAgICAgfVxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICA6IGZ1bmN0aW9uIHdyaXRlQnl0ZXNCdWZmZXJfY29weSh2YWwsIGJ1ZiwgcG9zKSB7XG4gICAgICAgICAgaWYgKHZhbC5jb3B5KSAvLyBCdWZmZXIgdmFsdWVzXG4gICAgICAgICAgICB2YWwuY29weShidWYsIHBvcywgMCwgdmFsLmxlbmd0aCk7XG4gICAgICAgICAgZWxzZSBmb3IgKHZhciBpID0gMDsgaSA8IHZhbC5sZW5ndGg7KSAvLyBwbGFpbiBhcnJheSB2YWx1ZXNcbiAgICAgICAgICAgIGJ1Zltwb3MrK10gPSB2YWxbaSsrXTtcbiAgICAgICAgfTtcbn07XG5cblxuLyoqXG4gKiBAb3ZlcnJpZGVcbiAqL1xuQnVmZmVyV3JpdGVyLnByb3RvdHlwZS5ieXRlcyA9IGZ1bmN0aW9uIHdyaXRlX2J5dGVzX2J1ZmZlcih2YWx1ZSkge1xuICAgIGlmICh1dGlsLmlzU3RyaW5nKHZhbHVlKSlcbiAgICAgICAgdmFsdWUgPSB1dGlsLl9CdWZmZXJfZnJvbSh2YWx1ZSwgXCJiYXNlNjRcIik7XG4gICAgdmFyIGxlbiA9IHZhbHVlLmxlbmd0aCA+Pj4gMDtcbiAgICB0aGlzLnVpbnQzMihsZW4pO1xuICAgIGlmIChsZW4pXG4gICAgICAgIHRoaXMuX3B1c2goQnVmZmVyV3JpdGVyLndyaXRlQnl0ZXNCdWZmZXIsIGxlbiwgdmFsdWUpO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gd3JpdGVTdHJpbmdCdWZmZXIodmFsLCBidWYsIHBvcykge1xuICAgIGlmICh2YWwubGVuZ3RoIDwgNDApIC8vIHBsYWluIGpzIGlzIGZhc3RlciBmb3Igc2hvcnQgc3RyaW5ncyAocHJvYmFibHkgZHVlIHRvIHJlZHVuZGFudCBhc3NlcnRpb25zKVxuICAgICAgICB1dGlsLnV0Zjgud3JpdGUodmFsLCBidWYsIHBvcyk7XG4gICAgZWxzZSBpZiAoYnVmLnV0ZjhXcml0ZSlcbiAgICAgICAgYnVmLnV0ZjhXcml0ZSh2YWwsIHBvcyk7XG4gICAgZWxzZVxuICAgICAgICBidWYud3JpdGUodmFsLCBwb3MpO1xufVxuXG4vKipcbiAqIEBvdmVycmlkZVxuICovXG5CdWZmZXJXcml0ZXIucHJvdG90eXBlLnN0cmluZyA9IGZ1bmN0aW9uIHdyaXRlX3N0cmluZ19idWZmZXIodmFsdWUpIHtcbiAgICB2YXIgbGVuID0gdXRpbC5CdWZmZXIuYnl0ZUxlbmd0aCh2YWx1ZSk7XG4gICAgdGhpcy51aW50MzIobGVuKTtcbiAgICBpZiAobGVuKVxuICAgICAgICB0aGlzLl9wdXNoKHdyaXRlU3RyaW5nQnVmZmVyLCBsZW4sIHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cblxuLyoqXG4gKiBGaW5pc2hlcyB0aGUgd3JpdGUgb3BlcmF0aW9uLlxuICogQG5hbWUgQnVmZmVyV3JpdGVyI2ZpbmlzaFxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7QnVmZmVyfSBGaW5pc2hlZCBidWZmZXJcbiAqL1xuXG5CdWZmZXJXcml0ZXIuX2NvbmZpZ3VyZSgpO1xuIiwiaW1wb3J0IHsgbmljZV90cyB9IGZyb20gXCIuL2dlbi9wYlwiO1xyXG5leHBvcnQgY2xhc3MgRGVjb2RlTXNne1xyXG5cdHB1YmxpYyBycGNJZDpudW1iZXI7XHJcblx0cHVibGljIG1zZ09iajphbnk7XHJcbn1cclxuZXhwb3J0IGNsYXNzIE9wY29kZXtcclxuXHRwdWJsaWMgc3RhdGljIE1TR19DMlJfTG9naW46bnVtYmVyID0gMTAwMDtcclxuXHRwdWJsaWMgc3RhdGljIE1TR19SMkNfTG9naW46bnVtYmVyID0gMTAwMTtcclxuXHRwdWJsaWMgc3RhdGljIE1TR19DMkdfTG9naW5HYXRlOm51bWJlciA9IDEwMDI7XHJcblx0cHVibGljIHN0YXRpYyBNU0dfRzJDX0xvZ2luR2F0ZTpudW1iZXIgPSAxMDAzO1xyXG5cclxuXHRwdWJsaWMgc3RhdGljIE1TR19DMkdTX1Rlc3Q6bnVtYmVyID0gMjAwMTtcclxuXHRwdWJsaWMgc3RhdGljIE1TR19HUzJDX1Rlc3Q6bnVtYmVyID0gMjAwMjtcclxuXHJcblx0cHVibGljIHN0YXRpYyBtYXAgPSB7XHJcblx0XHQxMDAwIDoge1wiZGVjb2RlXCI6bmljZV90cy5DMlJfTG9naW4uZGVjb2RlLFwiZW5jb2RlXCI6bmljZV90cy5DMlJfTG9naW4uZW5jb2RlfSxcclxuXHRcdDEwMDEgOiB7XCJkZWNvZGVcIjpuaWNlX3RzLlIyQ19Mb2dpbi5kZWNvZGUsXCJlbmNvZGVcIjpuaWNlX3RzLlIyQ19Mb2dpbi5lbmNvZGV9LFxyXG5cdFx0MTAwMiA6IHtcImRlY29kZVwiOm5pY2VfdHMuQzJHX0xvZ2luR2F0ZS5kZWNvZGUsXCJlbmNvZGVcIjpuaWNlX3RzLkMyR19Mb2dpbkdhdGUuZW5jb2RlfSxcclxuXHRcdDEwMDMgOiB7XCJkZWNvZGVcIjpuaWNlX3RzLkcyQ19Mb2dpbkdhdGUuZGVjb2RlLFwiZW5jb2RlXCI6bmljZV90cy5HMkNfTG9naW5HYXRlLmVuY29kZX0sXHJcblxyXG5cdFx0MjAwMSA6IHtcImRlY29kZVwiOm5pY2VfdHMuQzJHU19UZXN0LmRlY29kZSxcImVuY29kZVwiOm5pY2VfdHMuQzJHU19UZXN0LmVuY29kZX0sXHJcblx0XHQyMDAyIDoge1wiZGVjb2RlXCI6bmljZV90cy5HUzJDX1Rlc3QuZGVjb2RlLFwiZW5jb2RlXCI6bmljZV90cy5HUzJDX1Rlc3QuZW5jb2RlfVxyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIGRlY29kZShvcGNvZGU6bnVtYmVyLCBtc2c6VWludDhBcnJheSk6RGVjb2RlTXNnIHtcclxuXHRcdGxldCBtc2dPYmogPSB0aGlzLm1hcFtvcGNvZGVdW1wiZGVjb2RlXCJdKG1zZyk7XHJcblx0XHRsZXQgZGVjb2RlTXNnID0gbmV3IERlY29kZU1zZygpO1xyXG5cdFx0ZGVjb2RlTXNnLnJwY0lkID0gbXNnT2JqLlJwY0lkO1xyXG5cdFx0ZGVjb2RlTXNnLm1zZ09iaiA9IG1zZ09iajtcclxuXHRcdHJldHVybiBkZWNvZGVNc2c7XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgZW5jb2RlKG9wY29kZTpudW1iZXIsIG1zZzpVaW50OEFycmF5KXtcclxuXHRcdGxldCBidWYgPSB0aGlzLm1hcFtvcGNvZGVdW1wiZW5jb2RlXCJdKG1zZykuZmluaXNoKCk7XHJcblx0XHRyZXR1cm4gYnVmXHJcblx0fVxyXG5cclxuXHJcblxyXG59XHJcbiIsIi8qKiBUaGlzIGlzIGFuIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGNsYXNzIGJ5IEZhaXJ5R1VJLiBQbGVhc2UgZG8gbm90IG1vZGlmeSBpdC4gKiovXG5cbmV4cG9ydCBjbGFzcyBGbHlCaXJkVUlcbntcbiAgICBwdWJsaWMgc3RhdGljIFBhY2thZ2VOYW1lOnN0cmluZyA9IFwiRmx5QmlyZFwiO1xuICAgIHB1YmxpYyBzdGF0aWMgUGFja2FnZUJ5dGVzOnN0cmluZyA9IFwiRmx5QmlyZF9mdWkuYnl0ZXNcIjtcbiAgICBwdWJsaWMgc3RhdGljIFVJTWFpblZJZXc6c3RyaW5nID0gXCJNYWluVklld1wiO1xuICAgIHB1YmxpYyBzdGF0aWMgVUlQaXBlOnN0cmluZyA9IFwiUGlwZVwiO1xuICAgIHB1YmxpYyBzdGF0aWMgVUlPdmVyV2luZG93OnN0cmluZyA9IFwiT3ZlcldpbmRvd1wiO1xufSIsIi8qKiBUaGlzIGlzIGFuIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGNsYXNzIGJ5IEZhaXJ5R1VJLiBQbGVhc2UgZG8gbm90IG1vZGlmeSBpdC4gKiovXG5cbmV4cG9ydCBjbGFzcyBHYW1lU3RhcnRVSVxue1xuICAgIHB1YmxpYyBzdGF0aWMgUGFja2FnZU5hbWU6c3RyaW5nID0gXCJHYW1lU3RhcnRcIjtcbiAgICBwdWJsaWMgc3RhdGljIFBhY2thZ2VCeXRlczpzdHJpbmcgPSBcIkdhbWVTdGFydF9mdWkuYnl0ZXNcIjtcbiAgICBwdWJsaWMgc3RhdGljIFVJU3RhcnRWaWV3OnN0cmluZyA9IFwiU3RhcnRWaWV3XCI7XG59IiwiLyoqIFRoaXMgaXMgYW4gYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgY2xhc3MgYnkgRmFpcnlHVUkuIFBsZWFzZSBkbyBub3QgbW9kaWZ5IGl0LiAqKi9cblxuZXhwb3J0IGNsYXNzIENvbW1vblVJXG57XG4gICAgcHVibGljIHN0YXRpYyBQYWNrYWdlTmFtZTpzdHJpbmcgPSBcIkNvbW1vblwiO1xuICAgIHB1YmxpYyBzdGF0aWMgUGFja2FnZUJ5dGVzOnN0cmluZyA9IFwiQ29tbW9uX2Z1aS5ieXRlc1wiO1xuICAgIHB1YmxpYyBzdGF0aWMgVUlMb2FkaW5nVmlldzpzdHJpbmcgPSBcIkxvYWRpbmdWaWV3XCI7XG59IiwiXHJcbmltcG9ydCB7IFNpbmdsZXRvbiB9IGZyb20gJy4vU2luZ2xldG9uJztcclxuaW1wb3J0IHsgUmVzTWFuYWdlciB9IGZyb20gJy4vUmVzTWFuYWdlcic7XHJcbmltcG9ydCB7IFVuaXR5RW5naW5lIH0gZnJvbSAnY3NoYXJwJztcclxuXHJcblxyXG5cclxuLy8gLS0gR2FtZU9iamVjdOe8k+WtmOaxoFxyXG4vLyAtLSDms6jmhI/vvJpcclxuLy8gLS0gMeOAgeaJgOaciemcgOimgemihOiuvumDveS7jui/memHjOWKoOi9ve+8jOS4jeimgeebtOaOpeWIsFJlc291cmNlc01hbmFnZXLljrvliqDovb3vvIznlLHov5nph4znu5/kuIDlgZrnvJPlrZjnrqHnkIZcclxuLy8gLS0gMuOAgee8k+WtmOWIhuS4uuS4pOmDqOWIhu+8muS7jui1hOa6kOWxguWKoOi9veeahOWOn+Wni0dhbWVPYmplY3QoQXNzZXQp77yM5LuOR2FtZU9iamVjdOWunuS+i+WMluWHuuadpeeahOWkmuS4qkluc3RcclxuZXhwb3J0IGNsYXNzIEdhbWVPYmplY3RQb29sIGV4dGVuZHMgU2luZ2xldG9uPEdhbWVPYmplY3RQb29sPntcclxuXHJcbiAgICBwcml2YXRlIF9fY2FjaGVUcmFuc1Jvb3QgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfX2dvUG9vbCA9IG5ldyBNYXAoKTtcclxuICAgIHByaXZhdGUgX19pbnN0Q2FjaGU6TWFwPHN0cmluZyxBcnJheTxhbnk+PiA9IG5ldyBNYXA8c3RyaW5nLEFycmF5PGFueT4+KCk7XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgbGV0IGdvID0gVW5pdHlFbmdpbmUuR2FtZU9iamVjdC5GaW5kKFwiR2FtZU9iamVjdENhY2hlUm9vdFwiKTtcclxuXHJcbiAgICAgICAgaWYoZ28gPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgZ28gPSBuZXcgVW5pdHlFbmdpbmUuR2FtZU9iamVjdChcIkdhbWVPYmplY3RDYWNoZVJvb3RcIik7XHJcbiAgICAgICAgICAgIFVuaXR5RW5naW5lLk9iamVjdC5Eb250RGVzdHJveU9uTG9hZChnbyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9fY2FjaGVUcmFuc1Jvb3QgPSBnby50cmFuc2Zvcm07XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLSDmo4DmtYvmmK/lkKblt7Lnu4/ooqvnvJPlrZhcclxuICAgIHB1YmxpYyBjaGVja0hhc0NhY2hlZChwYXRoOnN0cmluZyl7XHJcblxyXG4gICAgICAgIGxldCBjYWNoZWRJbnN0OkFycmF5PGFueT4gPSB0aGlzLl9faW5zdENhY2hlLmdldChwYXRoKTtcclxuICAgICAgICBpZihjYWNoZWRJbnN0ICE9IHVuZGVmaW5lZCAmJiBjYWNoZWRJbnN0Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwb29sZWRHbyA9IHRoaXMuX19nb1Bvb2wuZ2V0KHBhdGgpO1xyXG4gICAgICAgIHJldHVybiBwb29sZWRHbyAhPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vLS0g57yT5a2Y5bm25a6e5L6L5YyWR2FtZU9iamVjdFxyXG4gICAgcHVibGljIGNhY2hlQW5kSW5zdEdhbWVPYmplY3QocGF0aDpzdHJpbmcsIGdvOmFueSwgaW5zdF9jb3VudDpudW1iZXIgPSAxKXtcclxuXHJcbiAgICAgICAgdGhpcy5fX2dvUG9vbC5zZXQocGF0aCwgZ28pO1xyXG4gICAgICAgIGlmKGluc3RfY291bnQgPiAwKXtcclxuXHJcbiAgICAgICAgICAgIGxldCBjYWNoZWRJbnN0OkFycmF5PGFueT4gPSB0aGlzLl9faW5zdENhY2hlLmdldChwYXRoKTtcclxuICAgICAgICAgICAgZm9yKGxldCBpOm51bWJlciA9MDsgaSA8IGluc3RfY291bnQ7IGkrKyl7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGluc3QgPSBVbml0eUVuZ2luZS5HYW1lT2JqZWN0Lkluc3RhbnRpYXRlKGdvKSBhcyBVbml0eUVuZ2luZS5HYW1lT2JqZWN0O1xyXG4gICAgICAgICAgICAgICAgaW5zdC50cmFuc2Zvcm0uU2V0UGFyZW50KHRoaXMuX19jYWNoZVRyYW5zUm9vdCk7XHJcbiAgICAgICAgICAgICAgICBpbnN0LlNldEFjdGl2ZShmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FjaGVkSW5zdC5wdXNoKGluc3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vLS0g5bCd6K+V5LuO57yT5a2Y5Lit6I635Y+WXHJcbiAgICBwdWJsaWMgdHJ5R2V0RnJvbUNhY2hlKHBhdGg6c3RyaW5nKTphbnl7XHJcblxyXG4gICAgICAgIGlmKCF0aGlzLmNoZWNrSGFzQ2FjaGVkKHBhdGgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGNhY2hlZEluc3Q6QXJyYXk8b2JqZWN0PiAgPSB0aGlzLl9faW5zdENhY2hlLmdldChwYXRoKTtcclxuICAgICAgICBpZihjYWNoZWRJbnN0ICE9IHVuZGVmaW5lZCAmJiBjYWNoZWRJbnN0Lmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBpbnN0ID0gY2FjaGVkSW5zdC5wb3AoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGluc3Q7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcG9vbGVkR28gPSB0aGlzLl9fZ29Qb29sLmdldChwYXRoKTtcclxuICAgICAgICBpZihwb29sZWRHbyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgaW5zdCA9IFVuaXR5RW5naW5lLkdhbWVPYmplY3QuSW5zdGFudGlhdGUocG9vbGVkR28pO1xyXG4gICAgICAgICAgICByZXR1cm4gaW5zdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8v6aKE5Yqg6L2977ya5Y+v5o+Q5L6b5Yid5aeL5a6e5L6L5YyW5Liq5pWwXHJcbiAgICBwdWJsaWMgYXN5bmMgcHJlTG9hZEdhbWVPYmplY3RBc3luYyhwYXRoOnN0cmluZywgaW5zdF9jb3VudDpudW1iZXIsIGNhbGxiYWNrOkZ1bmN0aW9uLC4uLnBhcmFtcyl7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuY2hlY2tIYXNDYWNoZWQocGF0aCkpe1xyXG4gICAgICAgICAgICBpZihjYWxsYmFjayE9bnVsbCl7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhwYXJhbXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBnbyA9IGF3YWl0IFJlc01hbmFnZXIuSW5zdGFuY2UoUmVzTWFuYWdlcikubG9hZFByZWZhYihwYXRoKTtcclxuICAgICAgICBpZihnbyE9dW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5jYWNoZUFuZEluc3RHYW1lT2JqZWN0KHBhdGgsIGdvLGluc3RfY291bnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoY2FsbGJhY2shPW51bGwpe1xyXG4gICAgICAgICAgICBjYWxsYmFjayhwYXJhbXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8tLSDlvILmraXojrflj5bvvJrlv4XopoHml7bliqDovb1cclxuICAgIHB1YmxpYyBhc3luYyBnZXRHYW1lT2JqZWN0QXN5bmMocGF0aDpzdHJpbmcsIGNhbGxiYWNrOkZ1bmN0aW9uLC4uLnBhcmFtcyl7XHJcblxyXG4gICAgICAgIGxldCBpbnN0OmFueSA9IHRoaXMudHJ5R2V0RnJvbUNhY2hlKHBhdGgpO1xyXG4gICAgICAgIGlmKGluc3QgPT1udWxsKXtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5wcmVMb2FkR2FtZU9iamVjdEFzeW5jKHBhdGgsIDEsIGNhbGxiYWNrLCBwYXJhbXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5zdCA9IHRoaXMudHJ5R2V0RnJvbUNhY2hlKHBhdGgpO1xyXG4gICAgICAgIGluc3QuU2V0QWN0aXZlKHRydWUpO1xyXG5cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8tLSDlm57mlLZcclxuICAgIHB1YmxpYyByZWN5Y2xlR2FtZU9iamVjdChwYXRoOnN0cmluZywgaW5zdDphbnkpe1xyXG5cclxuICAgICAgICBpbnN0LnRyYW5zZm9ybS5TZXRQYXJlbnQodGhpcy5fX2NhY2hlVHJhbnNSb290KTtcclxuICAgICAgICBpbnN0LlNldEFjdGl2ZShmYWxzZSk7XHJcblxyXG4gICAgICAgIGxldCBjYWNoZWRJbnN0ID0gdGhpcy5fX2luc3RDYWNoZS5nZXQocGF0aCkgfHwgbmV3IEFycmF5KCk7XHJcbiAgICAgICAgY2FjaGVkSW5zdC5wdXNoKGluc3QpO1xyXG5cclxuICAgICAgICB0aGlzLl9faW5zdENhY2hlLnNldChwYXRoLCBjYWNoZWRJbnN0KTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vLS0g5riF55CG57yT5a2YXHJcbiAgICBwdWJsaWMgY2xlYW51cChpbmNsdWRlUG9vbGVkR286Ym9vbGVhbiA9IGZhbHNlKXtcclxuXHJcbiAgICAgICAgdGhpcy5fX2luc3RDYWNoZS5mb3JFYWNoKCh2YWx1ZXMsIGtleSk9PntcclxuXHJcbiAgICAgICAgICAgIGZvcihsZXQgaW5zdCBvZiB2YWx1ZXMpe1xyXG4gICAgICAgICAgICAgICAgaWYoaW5zdCAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgICAgICBVbml0eUVuZ2luZS5HYW1lT2JqZWN0LkRlc3Ryb3koaW5zdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9faW5zdENhY2hlLmNsZWFyKCk7IFxyXG5cclxuICAgICAgICBpZihpbmNsdWRlUG9vbGVkR28pe1xyXG4gICAgICAgICAgICB0aGlzLl9fZ29Qb29sLmZvckVhY2goKGdvLCBrZXkpPT57XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoZ28gIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVzTWFuYWdlci5JbnN0YW5jZShSZXNNYW5hZ2VyKS5yZWxlYXNlQWRkcmVzc0dPKGdvKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9fZ29Qb29sLmNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG59IiwiXHJcbmV4cG9ydCAgY2xhc3MgTGlzdDxUPiBleHRlbmRzIEFycmF5PFQ+IHtcclxuXHRwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdH1cclxuIFxyXG5cdGFkZDpGdW5jdGlvbiA9IGZ1bmN0aW9uKHZhbHVlOlQpOnZvaWR7XHJcblx0XHR0aGlzLnB1c2godmFsdWUpO1xyXG5cdH1cclxuIFxyXG5cdGluc2VydDpGdW5jdGlvbiA9IGZ1bmN0aW9uKGluZGV4Om51bWJlciwgdmFsdWU6VCk6dm9pZHtcclxuXHRcdHRoaXMuc3BsaWNlKGluZGV4LCAwLCB2YWx1ZSk7XHJcblx0fVxyXG4gXHJcblx0cmVtb3ZlOkZ1bmN0aW9uID0gZnVuY3Rpb24odmFsdWU6VCk6dm9pZHtcclxuXHRcdHZhciBpbmRleDpudW1iZXIgPSB0aGlzLmluZGV4T2YodmFsdWUpO1xyXG5cdFx0dGhpcy5yZW1vdmVBdChpbmRleCk7XHJcblx0fVxyXG4gXHJcblx0cmVtb3ZlQXQ6RnVuY3Rpb24gPSBmdW5jdGlvbihpbmRleDpudW1iZXIpOnZvaWR7XHJcblx0XHR0aGlzLnNwbGljZShpbmRleCwgMSk7XHJcblx0fVxyXG4gXHJcblx0Y29udGFpbnM6RnVuY3Rpb24gPSBmdW5jdGlvbih2YWx1ZTpUKTpib29sZWFue1xyXG5cdFx0cmV0dXJuIHRoaXMuaW5kZXhPZih2YWx1ZSk+PTA7XHJcblx0fVxyXG4gXHJcblx0cHVibGljIGdldCBjb3VudCgpOm51bWJlcntcclxuXHRcdHJldHVybiB0aGlzLmxlbmd0aDtcclxuXHR9XHJcbiBcclxuXHRjbGVhcjpGdW5jdGlvbiA9IGZ1bmN0aW9uKCk6dm9pZHtcclxuXHRcdHRoaXMuc3BsaWNlKDApO1xyXG5cdH1cclxuIFxyXG5cdGZvcmVhY2g6RnVuY3Rpb24gPSBmdW5jdGlvbihjYWxsYmFjazpGdW5jdGlvbik6dm9pZCB7XHJcbiAgICAgICAgdGhpcy5fYnJlYWtpbmcgPSBmYWxzZTtcclxuICAgICAgICB2YXIgc3VtID0gdGhpcy5sZW5ndGg7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTxzdW07aSsrKXtcclxuICAgICAgICAgICAgaWYodGhpcy5fYnJlYWtpbmcpe1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FsbGJhY2sodGhpc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gXHJcbiAgICBfYnJlYWtpbmc6Ym9vbGVhbiA9IGZhbHNlO1xyXG4gICAgYnJlYWs6RnVuY3Rpb24gPSBmdW5jdGlvbigpOnZvaWQge1xyXG4gICAgICAgIHRoaXMuX2JyZWFraW5nID0gdHJ1ZTtcclxuICAgIH1cclxuIFxyXG5cdHRvQXJyYXk6RnVuY3Rpb24gPSBmdW5jdGlvbigpOlRbXXtcclxuXHRcdHZhciBhcnJheTpUW10gPSBbXTtcclxuXHRcdHRoaXMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuXHRcdFx0YXJyYXkucHVzaChlbGVtZW50KTtcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIGFycmF5O1xyXG5cdH1cclxuIFxyXG5cdGFwcGVuZDpGdW5jdGlvbiA9IGZ1bmN0aW9uKHZhbHVlOlRbXSk6dm9pZHtcclxuXHRcdHZhbHVlLmZvckVhY2goZWxlbWVudCA9PiB7XHJcblx0XHRcdHRoaXMucHVzaChlbGVtZW50KTtcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG4iLCJcclxuXHJcbmV4cG9ydCBjbGFzcyBNZXNPYmp7XHJcbiAgICBwdWJsaWMgbGlzdGVuZXJzOkFycmF5PEZ1bmN0aW9uPjtcclxuICAgIHB1YmxpYyBvYmo6YW55O1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIE1lc3NlbmdlcntcclxuXHJcbiAgICBwcml2YXRlIGxpc3RlbmVyTWFwID0gbmV3IE1hcDxudW1iZXIsTWVzT2JqPigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRMaXN0ZW5lcihlX3R5cGU6bnVtYmVyLCBlX29iajphbnksIGVfbGlzdG5lcjpGdW5jdGlvbik6dm9pZHtcclxuXHJcbiAgICAgICAgbGV0IG1zZ09iaiA9IHRoaXMubGlzdGVuZXJNYXAuZ2V0KGVfdHlwZSk7XHJcblxyXG4gICAgICAgIGlmKHR5cGVvZihtc2dPYmopID09IFwidW5kZWZpbmVkXCIpe1xyXG4gICAgICAgICAgICBtc2dPYmogPSBuZXcgTWVzT2JqKCk7XHJcbiAgICAgICAgICAgIG1zZ09iai5vYmogPSBlX29iajtcclxuICAgICAgICAgICAgbXNnT2JqLmxpc3RlbmVycyA9IG5ldyBBcnJheTxGdW5jdGlvbj4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbXNnT2JqLmxpc3RlbmVycy5wdXNoKGVfbGlzdG5lcik7XHJcblxyXG4gICAgICAgIHRoaXMubGlzdGVuZXJNYXAuc2V0KGVfdHlwZSwgbXNnT2JqKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TGlzdGVuZXIoZV90eXBlOm51bWJlcik6TWVzT2Jqe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyTWFwLmdldChlX3R5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBicm9hZGNhc3QoZV90eXBlOm51bWJlciwgLi4ucGFyYW1zOmFueVtdKSA6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgbXNnT2JqID0gdGhpcy5saXN0ZW5lck1hcC5nZXQoZV90eXBlKTtcclxuICAgICAgICBcclxuICAgICAgICBpZih0eXBlb2YobXNnT2JqKSAhPSBcInVuZGVmaW5lZFwiKXtcclxuICAgICAgICAgICAgZm9yKGxldCBsIG9mIG1zZ09iai5saXN0ZW5lcnMpe1xyXG4gICAgICAgICAgICAgICBsLmFwcGx5KG1zZ09iai5vYmosIHBhcmFtcyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHJlbW92ZUxpc3RlbmVyQnlUeXBlKGVfdHlwZTpudW1iZXIpIDp2b2lkIHtcclxuXHJcbiAgICAgICAgdGhpcy5saXN0ZW5lck1hcC5kZWxldGUoZV90eXBlKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHJlbW92ZUxpc3RlbmVyKGVfdHlwZTpudW1iZXIsIGVfbGlzdGVuZXI6RnVuY3Rpb24gKTp2b2lke1xyXG5cclxuICAgICAgICBsZXQgbXNnT2JqID0gdGhpcy5saXN0ZW5lck1hcC5nZXQoZV90eXBlKTtcclxuXHJcbiAgICAgICAgaWYodHlwZW9mKG1zZ09iaikgIT0gXCJ1bmRlZmluZWRcIil7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBmb3IobGV0IGk6bnVtYmVyID0wOyBpPCBtc2dPYmoubGlzdGVuZXJzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKG1zZ09iai5saXN0ZW5lcnNbaV0gPT0gZV9saXN0ZW5lcil7XHJcbiAgICAgICAgICAgICAgICAgICAgbXNnT2JqLmxpc3RlbmVycy5zcGxpY2UoaSwxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJ1cCgpOnZvaWR7XHJcblxyXG4gICAgICAgIHRoaXMubGlzdGVuZXJNYXAuY2xlYXIoKTtcclxuICAgIH1cclxuXHJcbn0iLCJcclxuXHJcblxyXG4vLyBGYWlyeUdVSSDlhYPku7Yg57uR5a6a5ZmoXHJcbmV4cG9ydCBmdW5jdGlvbiBiaW5kZXIobmFtZTpzdHJpbmcpe1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKHRhcmdldDphbnksIGtleTpzdHJpbmcgfCBzeW1ib2wpe1xyXG4gICAgICAgIHRhcmdldFtcImJpbmRlcnNcIl0gPSB0YXJnZXRbXCJiaW5kZXJzXCJdIHx8IHt9O1xyXG4gICAgICAgIHRhcmdldFtcImJpbmRlcnNcIl1ba2V5XSA9IG5hbWU7XHJcbiAgICB9XHJcbn0iLCJcclxuaW1wb3J0IHsgU2luZ2xldG9uIH0gZnJvbSAnLi9TaW5nbGV0b24nO1xyXG5pbXBvcnQgeyAkcHJvbWlzZSB9IGZyb20gJ3B1ZXJ0cyc7XHJcbmltcG9ydCB7TmljZVRTLCBVbml0eUVuZ2luZX0gZnJvbSAnY3NoYXJwJztcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnLi4vbG9nZ2VyL0xvZ2dlcic7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVzTWFuYWdlciBleHRlbmRzIFNpbmdsZXRvbjxSZXNNYW5hZ2VyPntcclxuXHJcbiAgICBwcml2YXRlIF9wa2dNYXA6TWFwPHN0cmluZyxudW1iZXI+ID0gbmV3IE1hcDxzdHJpbmcsbnVtYmVyPigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBsb2FkRmFpcnlHVUlQYWNrYWdlKHBhY2thZ2VOYW1lOnN0cmluZyl7XHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICBsZXQgY291bnQgPSB0aGlzLl9wa2dNYXAuZ2V0KHBhY2thZ2VOYW1lKTtcclxuICAgICAgICAgICAgaWYoY291bnQgPT0gbnVsbCB8fCBjb3VudCA8IDEpe1xyXG4gICAgICAgICAgICAgICAgLy/msqHmnInnvJPlrZjvvIzliqDovb1cclxuICAgICAgICAgICAgICAgIGxldCBhZGRyZXNzID0gcGFja2FnZU5hbWUrXCJfZnVpLmJ5dGVzXCI7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhZGRyZXNzKVxyXG4gICAgICAgICAgICAgICAgbGV0IHRhc2sgPSBOaWNlVFMuUmVzb3VyY2VNYW5hZ2VyLkxvYWRGYWlyeUdVSVBhY2thZ2UoYWRkcmVzcyxwYWNrYWdlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCAkcHJvbWlzZSh0YXNrKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BrZ01hcC5zZXQocGFja2FnZU5hbWUsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wa2dNYXAuc2V0KHBhY2thZ2VOYW1lLCBjb3VudCsxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1jYXRjaChleCl7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihgTG9hZCBmYWlyeUdVSSA6JHtwYWNrYWdlTmFtZX0gOiAke2V4fWApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgcmVsZWFzZUZhaXJ5R1VJUGFja2FnZShwYWNrYWdlTmFtZSl7XHJcblxyXG4gICAgICAgIGxldCBjb3VudCA9IHRoaXMuX3BrZ01hcC5nZXQocGFja2FnZU5hbWUpO1xyXG4gICAgICAgIGlmKGNvdW50IT1udWxsICYmIGNvdW50PjEpe1xyXG4gICAgICAgICAgICB0aGlzLl9wa2dNYXAuc2V0KHBhY2thZ2VOYW1lLCBjb3VudC0xKTtcclxuICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICAgIExvZ2dlci5sb2coYHJlbGVhc2UgZmFndWkgcGFja2FnZToke3BhY2thZ2VOYW1lfWApO1xyXG4gICAgICAgICAgICB0aGlzLl9wa2dNYXAuZGVsZXRlKHBhY2thZ2VOYW1lKTtcclxuICAgICAgICAgICAgTmljZVRTLlJlc291cmNlTWFuYWdlci5SZWxlYXNlRkdVSVBhY2thZ2UocGFja2FnZU5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBsb2FkU2NlbmUoc2NlbmVOYW1lOnN0cmluZywgbW9kZSA9IFVuaXR5RW5naW5lLlNjZW5lTWFuYWdlbWVudC5Mb2FkU2NlbmVNb2RlLlNpbmdsZSl7XHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCB0YXNrID0gTmljZVRTLlJlc291cmNlTWFuYWdlci5Mb2FkU2NlbmUoc2NlbmVOYW1lLCBtb2RlLChwcm9ncmVzczpOdW1iZXIpPT57XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwibG9hZCBzY2VuZTogXCIrcHJvZ3Jlc3MpXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbGV0IHNjZW5JbnN0YW5jZSA9IGF3YWl0ICRwcm9taXNlKHRhc2spXHJcbiAgICAgICAgICAgIHJldHVybiBzY2VuSW5zdGFuY2VcclxuXHJcbiAgICAgICAgfWNhdGNoKGV4KXtcclxuXHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihgTG9hZCBTY2VuZSA6JHtzY2VuZU5hbWV9IDogJHtleH1gKVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBhc3luYyB1bmxvYWRTY2VuZShzY2VuZUluc3RhbmNlOlVuaXR5RW5naW5lLlJlc291cmNlTWFuYWdlbWVudC5SZXNvdXJjZVByb3ZpZGVycy5TY2VuZUluc3RhbmNlKXtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGxldCB0YXNrPSBOaWNlVFMuUmVzb3VyY2VNYW5hZ2VyLlVubG9hZFNjZW5lKHNjZW5lSW5zdGFuY2UpXHJcbiAgICAgICAgICAgIGxldCBnbyA9IGF3YWl0ICRwcm9taXNlKHRhc2spO1xyXG4gICAgICAgICAgICByZXR1cm4gZ287XHJcbiAgICAgICAgfWNhdGNoKGV4KXtcclxuXHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihgVW5sb2FkIHNjZW5lICA6ICR7ZXh9YClcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdW5sb2FkU2NlbmVCeU5hbWUoc2NlbmVOYW1lOnN0cmluZyl7XHJcblxyXG4gICAgICAgIE5pY2VUUy5SZXNvdXJjZU1hbmFnZXIuVW5sb2FkU2NlbmVCeU5hbWUoc2NlbmVOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBsb2FkUHJlZmFiKGFkZHJlc3M6c3RyaW5nKXtcclxuXHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICBsZXQgdGFzaz0gTmljZVRTLlJlc291cmNlTWFuYWdlci5Mb2FkUHJlZmFiKGFkZHJlc3MpO1xyXG4gICAgICAgICAgICBsZXQgZ28gPSBhd2FpdCAkcHJvbWlzZSh0YXNrKTtcclxuICAgICAgICAgICAgcmV0dXJuIGdvO1xyXG4gICAgICAgIH1jYXRjaChleCl7XHJcblxyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoYExvYWQgcHJlZmFiIDoke2FkZHJlc3N9IDogJHtleH1gKVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBsb2FkVGV4dEFzc2V0KGFkZHJlc3M6c3RyaW5nKXtcclxuXHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICBsZXQgdGFzayA9IE5pY2VUUy5SZXNvdXJjZU1hbmFnZXIuTG9hZFRleHRBc3NldChhZGRyZXNzKTtcclxuICAgICAgICAgICAgbGV0IGdvID0gYXdhaXQgJHByb21pc2UodGFzayk7XHJcbiAgICAgICAgICAgIHJldHVybiBnbztcclxuICAgICAgICB9Y2F0Y2goZXgpe1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoYExvYWQgdGV4dGFzc2V0IDoke2FkZHJlc3N9IDogJHtleH1gKVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBhc3luYyBsb2FkVGV4dEJ5dGVzKGFkZHJlc3M6c3RyaW5nKXtcclxuXHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICBsZXQgdGFzayA9IE5pY2VUUy5SZXNvdXJjZU1hbmFnZXIuTG9hZFRleHRCeXRlcyhhZGRyZXNzKTtcclxuICAgICAgICAgICAgbGV0IGJ5dGVzID0gYXdhaXQgJHByb21pc2UodGFzayk7XHJcbiAgICAgICAgICAgIHJldHVybiBieXRlcztcclxuICAgICAgICB9Y2F0Y2goZXgpe1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoYExvYWRUZXh0Qnl0ZXMgOiR7YWRkcmVzc30gOiAke2V4fWApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGxvYWRTcHJpdGUoYWRkcmVzczpzdHJpbmcpe1xyXG5cclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGxldCB0YXNrID0gTmljZVRTLlJlc291cmNlTWFuYWdlci5Mb2FkU3ByaXRlKGFkZHJlc3MpO1xyXG4gICAgICAgICAgICBsZXQgZ28gPSBhd2FpdCAkcHJvbWlzZSh0YXNrKTtcclxuICAgICAgICAgICAgcmV0dXJuIGdvO1xyXG5cclxuICAgICAgICB9Y2F0Y2goZXgpe1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoYExvYWQgc3ByaXRlIDoke2FkZHJlc3N9IDogJHtleH1gKVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgcmVsZWFzZUFkZHJlc3NHTyhnbzphbnkpe1xyXG5cclxuICAgICAgICBOaWNlVFMuUmVzb3VyY2VNYW5hZ2VyLlJlbGVhc2VBZGRyZXNzR08oZ28pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBcclxufSIsIlxyXG5cclxuZXhwb3J0IGNsYXNzIFNpbmdsZXRvbjxUPntcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTphbnkgPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgSW5zdGFuY2U8VD4oIGM6IHsgbmV3KCk6IFQgfSApIDogVHtcclxuXHJcbiAgICAgICAgaWYodGhpcy5pbnN0YW5jZSA9PSBudWxsKXtcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBjKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBVbml0eUVuZ2luZSB9IGZyb20gJ2NzaGFycCc7XHJcbmltcG9ydCB7IEdhbWVDb25maWcgfSBmcm9tICcuLi8uLi9nbG9iYWwvR2FtZUNvbmZpZyc7XHJcbmVudW0gTG9nVHlwZSB7XHJcblx0RXJyb3IgPSAwLFxyXG5cdEFzc2VydCA9IDEsXHJcblx0V2FybmluZyA9IDIsXHJcblx0TG9nID0gMyxcclxuXHRFeGNlcHRpb24gPSA0XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBMb2dnZXJ7XHJcbiAgICBwcml2YXRlICBzdGF0aWMgIHVuaXR5X2xvZ190YXJnZXQgPSBudWxsO1xyXG5cclxuICAgIHN0YXRpYyBnZXRQcmludFN0YWNrKHR5cGU6IExvZ1R5cGUsIHNob3dTdGFjayA6IGJvb2xlYW4sIC4uLmFyZ3MpIHtcclxuICAgICAgICBsZXQgbWVzc2FnZSA9ICcnO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gYXJnc1tpXTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnb2JqZWN0JyAmJiBMb2dnZXIuTE9HX09CSkVDVF9UT19KU09OKSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlICs9IEpTT04uc3RyaW5naWZ5KGVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSArPSBlbGVtZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpIDwgYXJncy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlICs9ICcgJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGlmIChzaG93U3RhY2sgfHwgVW5pdHlFbmdpbmUuQXBwbGljYXRpb24uaXNFZGl0b3IpIHtcclxuICAgICAgICAgICAgdmFyIHN0YWNrcyA9IG5ldyBFcnJvcigpLnN0YWNrLnNwbGl0KCdcXG4nKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDM7IGkgPCBzdGFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmUgPSBzdGFja3NbaV07XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlICs9ICdcXG4nO1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSArPSBsaW5lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgaWYgKCFMb2dnZXIudW5pdHlfbG9nX3RhcmdldCkge1xyXG4gICAgICAgICAgICBMb2dnZXIudW5pdHlfbG9nX3RhcmdldCA9IG5ldyBVbml0eUVuZ2luZS5PYmplY3QoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuXHRzdGF0aWMgbG9nKC4uLmFyZ3MpOiB2b2lke1xyXG4gICAgICAgIGlmKCFHYW1lQ29uZmlnLmRlYnVnKSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBtc2cgPSBMb2dnZXIuZ2V0UHJpbnRTdGFjayhMb2dUeXBlLkxvZywgdHJ1ZSwgYXJncyk7XHJcbiAgICAgICAgY29uc29sZS5sb2cobXNnKTtcclxuICAgIH1cclxuXHJcblx0LyoqXHJcblx0ICogT3V0cHV0cyBhIHdhcm5pbmcgbWVzc2FnZSB0byB0aGUgTG9nZ2VyLlxyXG5cdCAqIEBwYXJhbSBtZXNzYWdlICBsaXN0IG9mIEphdmFTY3JpcHQgb2JqZWN0cyB0byBvdXRwdXQuIFRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb25zIG9mIGVhY2ggb2YgdGhlc2Ugb2JqZWN0cyBhcmUgYXBwZW5kZWQgdG9nZXRoZXIgaW4gdGhlIG9yZGVyIGxpc3RlZCBhbmQgb3V0cHV0LlxyXG5cdCAqL1xyXG5cdHN0YXRpYyB3YXJuKC4uLmFyZ3MpOiB2b2lke1xyXG4gICAgICAgIGlmKCFHYW1lQ29uZmlnLmRlYnVnKSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBtc2cgPSBMb2dnZXIuZ2V0UHJpbnRTdGFjayhMb2dUeXBlLldhcm5pbmcsIHRydWUsIGFyZ3MpO1xyXG4gICAgICAgIGNvbnNvbGUud2Fybihtc2cpO1xyXG4gICAgfVxyXG5cclxuXHQvKipcclxuXHQgKiBPdXRwdXRzIGFuIGVycm9yIG1lc3NhZ2UgdG8gdGhlIExvZ2dlci5cclxuXHQgKiBAcGFyYW0gbWVzc2FnZSBBIGxpc3Qgb2YgSmF2YVNjcmlwdCBvYmplY3RzIHRvIG91dHB1dC4gVGhlIHN0cmluZyByZXByZXNlbnRhdGlvbnMgb2YgZWFjaCBvZiB0aGVzZSBvYmplY3RzIGFyZSBhcHBlbmRlZCB0b2dldGhlciBpbiB0aGUgb3JkZXIgbGlzdGVkIGFuZCBvdXRwdXQuXHJcblx0ICovXHJcblx0c3RhdGljIGVycm9yKC4uLmFyZ3MpOiB2b2lke1xyXG4gICAgICAgIGlmKCFHYW1lQ29uZmlnLmRlYnVnKSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBtc2cgPSBMb2dnZXIuZ2V0UHJpbnRTdGFjayhMb2dUeXBlLkVycm9yLCB0cnVlLCBhcmdzKTtcclxuICAgICAgICBjb25zb2xlLmVycm9yKG1zZyk7XHJcbiAgICB9XHJcblxyXG5cdC8qKiBPdXRwdXRzIGEgc3RhY2sgdHJhY2UgdG8gdGhlIExvZ2dlci5cclxuXHQgKiBAcGFyYW0gbWVzc2FnZSBBIGxpc3Qgb2YgSmF2YVNjcmlwdCBvYmplY3RzIHRvIG91dHB1dC4gVGhlIHN0cmluZyByZXByZXNlbnRhdGlvbnMgb2YgZWFjaCBvZiB0aGVzZSBvYmplY3RzIGFyZSBhcHBlbmRlZCB0b2dldGhlciBpbiB0aGUgb3JkZXIgbGlzdGVkIGFuZCBvdXRwdXQuXHJcblx0Ki9cclxuXHRzdGF0aWMgdHJhY2UoLi4uYXJncyk6IHZvaWR7XHJcbiAgICAgICAgaWYoIUdhbWVDb25maWcuZGVidWcpIHJldHVybjtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgbXNnID0gTG9nZ2VyLmdldFByaW50U3RhY2soTG9nVHlwZS5Mb2csIHRydWUsIGFyZ3MpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XHJcbiAgICB9XHJcblxyXG5cdC8qKiBMb2cgSmF2YVNjcmlwdCBPYmplY3RzIGFzIEpTT04gZm9ybWF0ICovXHJcblx0c3RhdGljIExPR19PQkpFQ1RfVE9fSlNPTiguLi5hcmdzKTogYm9vbGVhbntcclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IFNpbmdsZXRvbiB9IGZyb20gXCIuLi9jb21tb24vU2luZ2xldG9uXCI7XHJcbmltcG9ydCB7IE9wY29kZSB9IGZyb20gXCIuLi8uLi9kYXRhL3BiL09wY29kZVwiO1xyXG5pbXBvcnQgeyBOZXRFcnJvckNvZGUgfSBmcm9tIFwiLi9OZXRFcnJvckNvZGVcIjtcclxuaW1wb3J0IHsgTmljZVRTIH0gZnJvbSBcImNzaGFycFwiO1xyXG5pbXBvcnQgeyBNZXNzYWdlUGFyc2VyIH0gZnJvbSBcIi4vTWVzc2FnZVBhcnNlclwiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi4vbG9nZ2VyL0xvZ2dlclwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBNc2dQYWNre1xyXG4gICAgcHVibGljIHNlbmRUaW1lOm51bWJlcjtcclxuICAgIHB1YmxpYyBjYWxsYmFjazpGdW5jdGlvbjtcclxuICAgIHB1YmxpYyByZXRyeVRpbWVzOm51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgYnl0ZXM6VWludDhBcnJheTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEdhbWVTZXNzaW9uIGV4dGVuZHMgU2luZ2xldG9uPEdhbWVTZXNzaW9uPntcclxuXHJcbiAgICBwdWJsaWMgaWQ6bnVtYmVyID0gMDsgIC8vc2Vzc2lvbiBJRFxyXG4gICAgcHJpdmF0ZSByZVNlbmRJbnRlcnZhbDpudW1iZXIgPSAxMDAwMDsgLy8xMOenkumHjeWPkeS4gOasoVxyXG4gICAgcHJpdmF0ZSB0aW1lb3V0SW50ZXJ2YWw6bnVtYmVyID0gNTAwMDsgLy8156eS5qOA5p+l5LiA5qyh5piv5ZCm6LaF5pe2XHJcbiAgICBwcml2YXRlIG1heFJlU2VuZFRpbWVzOm51bWJlciA9IDU7IC8v5pyA5aSn6YeN5Y+R5qyh5pWwXHJcbiAgICBwcml2YXRlIHRpbWVvdXRJaW1lcjphbnk7XHJcblxyXG4gICAgcHJpdmF0ZSBfcnBjSWQ6bnVtYmVyID0gMTtcclxuICAgIHByaXZhdGUgY2hhbm5lbDphbnk7XHJcbiAgICBwcml2YXRlIHJlcXVlc3RDYWxsYmFjazpNYXA8bnVtYmVyLE1zZ1BhY2s+ID0gbmV3IE1hcDxudW1iZXIsTXNnUGFjaz4oKTtcclxuICAgIHByaXZhdGUgbGlzdGVuZXJzOk1hcDxudW1iZXIsRnVuY3Rpb24+ID0gbmV3IE1hcDxudW1iZXIsRnVuY3Rpb24+KCk7XHJcblxyXG4gICAgLy/ov5Tlm57nmoTmnI3liqHlmahJRCwg57G75Z6LXHJcbiAgICBwcml2YXRlIF9zZXJ2ZXJJZDpudW1iZXIgPSAtMTtcclxuICAgIHByaXZhdGUgX3NlcnZlclR5cGU6bnVtYmVyID0gMTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBycGNJZCgpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gKyt0aGlzLl9ycGNJZDtcclxuICAgIH1cclxuXHJcbiAgICAvL2FkZHJlc3MtPiBpcDpwb3J0XHJcbiAgICBwdWJsaWMgY29ubmVjdENoYW5uZWwoYWRkcmVzczpzdHJpbmcsIGNvbm5DYWJhY2s6YW55KXtcclxuXHJcbiAgICAgICAgdGhpcy5jaGFubmVsID0gTmljZVRTLlRTZXJ2aWNlLkluc3RhbmNlLkdldENoYW5uZWwoKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmNoYW5uZWwuZXJyb3JDYWxsYmFjayA9IChjaGFubmVsOmFueSwgY29kZTpudW1iZXIpPT57XHJcbiAgICAgICAgICAgIGlmKGNvZGUgPT0gTmV0RXJyb3JDb2RlLkVSUl9Tb2NrZXRDb25uU3VjYyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVvdXRJaW1lciA9IHNldEludGVydmFsKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja1RpbWVvdXRNc2coKTtcclxuICAgICAgICAgICAgICAgIH0sIHRoaXMudGltZW91dEludGVydmFsKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29ubkNhYmFjayhjaGFubmVsLCBjb2RlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY2hhbm5lbC5yZWFkQ2FsbGJhY2sgPSAoYnVmZmVyOlVpbnQ4QXJyYXkpPT57XHJcbiAgICAgICAgICAgIHRoaXMub25SZWNlaXZlKGJ1ZmZlcik7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGFubmVsLkNvbm5lY3QoYWRkcmVzcyk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5o6l5pS25pyN5Yqh5Zmo6YCa55+lXHJcbiAgICBwdWJsaWMgbGlzdGVuKG9wY29kZTpudW1iZXIsY2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzLnNldChvcGNvZGUsIGNhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WPkemAgXByb3RvdWJm5raI5oGvXHJcbiAgICAvL+a2iOaBr++8miBycGNfaWRbNF0gLSBvcGNvZGVbMl0gLSBzZXJ2ZXJfaWRbMl0gLSBzZXJ2ZXJfdHlwZVsxXSAtIFxyXG4gICAgcHVibGljIHNlbmQob3Bjb2RlOm51bWJlcixycGNpZDpudW1iZXIsIG1lc3NhZ2U6VWludDhBcnJheSwgY2FsbEJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8v5bCB6KOF5raI5oGv77yaXHJcbiAgICAgICAgbGV0IHJwY0J1ZjpVaW50OEFycmF5ID0gTWVzc2FnZVBhcnNlci5lbmNvZGVJbnQocnBjaWQpOyAvLzRcclxuICAgICAgICBsZXQgb3Bjb2RlQnVmOlVpbnQ4QXJyYXkgPSBNZXNzYWdlUGFyc2VyLmVuY29kZVNob3J0KG9wY29kZSk7IC8vMlxyXG4gICAgICAgIGxldCBzZXJ2ZXJpZEJ1ZjpVaW50OEFycmF5ID0gTWVzc2FnZVBhcnNlci5lbmNvZGVTaG9ydCh0aGlzLl9zZXJ2ZXJJZCk7IC8vMlxyXG4gICAgICAgIGxldCBzZXJ2ZXJ0eXBlQnVmOlVpbnQ4QXJyYXkgPSBNZXNzYWdlUGFyc2VyLmVuY29kZUJ5dGUodGhpcy5fc2VydmVyVHlwZSk7IC8vMVxyXG5cclxuXHJcbiAgICAgICAgbGV0IHNlbmRBcnJheTpVaW50OEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoNCArIDIgKyAyICsgMSArbWVzc2FnZS5sZW5ndGgpO1xyXG4gICAgICAgIHNlbmRBcnJheS5zZXQocnBjQnVmKTtcclxuICAgICAgICBzZW5kQXJyYXkuc2V0KG9wY29kZUJ1ZiwgICAgNCk7XHJcbiAgICAgICAgc2VuZEFycmF5LnNldChzZXJ2ZXJpZEJ1ZiwgIDQgKyAyKTtcclxuICAgICAgICBzZW5kQXJyYXkuc2V0KHNlcnZlcnR5cGVCdWYsIDQgKyAyICsgMik7XHJcbiAgICAgICAgc2VuZEFycmF5LnNldChtZXNzYWdlLCAgICAgICA0ICsgMiArIDIgKyAxKTtcclxuICAgICAgICBcclxuICAgICAgICBpZihjYWxsQmFjayAhPSBudWxsKXtcclxuICAgICAgICAgICAgbGV0IG1zZ1BhY2s6TXNnUGFjayA9IG5ldyBNc2dQYWNrKCk7XHJcbiAgICAgICAgICAgIG1zZ1BhY2suc2VuZFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgbXNnUGFjay5jYWxsYmFjayA9IGNhbGxCYWNrO1xyXG4gICAgICAgICAgICBtc2dQYWNrLmJ5dGVzID0gc2VuZEFycmF5O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0Q2FsbGJhY2suc2V0KHJwY2lkLCBtc2dQYWNrKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZm9yKGxldCBpIGluIHNlbmRBcnJheSl7XHJcbiAgICAgICAgLy8gICAgIExvZ2dlci5sb2coXCJUUyAtLSBzZW5kIGFycmF5OiBcIitpKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy9Mb2dnZXIubG9nKFwic2VuZCBhcnJheTogXCIrc2VuZEFycmF5KTtcclxuICAgICAgICB0aGlzLmNoYW5uZWwuU2VuZChzZW5kQXJyYXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVTZW5kKGJ5dGVzOlVpbnQ4QXJyYXkpe1xyXG4gICAgICAgIHRoaXMuY2hhbm5lbC5TZW5kKGJ5dGVzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25SZWNlaXZlKGJ1ZmZlcjpVaW50OEFycmF5KXtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgbXNnQnVmID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyKTtcclxuXHJcbiAgICAgICAgbGV0IHJwY2lkID0gTWVzc2FnZVBhcnNlci5kZWNvZGVJbnQobXNnQnVmLnN1YmFycmF5KDAsNCkpO1xyXG4gICAgICAgIGxldCBvcGNvZGUgPSBNZXNzYWdlUGFyc2VyLmRlY29kZVNob3J0KG1zZ0J1Zi5zdWJhcnJheSg0LDYpKTtcclxuICAgICAgICBsZXQgc2VydmVyaWQgPSBNZXNzYWdlUGFyc2VyLmRlY29kZVNob3J0KG1zZ0J1Zi5zdWJhcnJheSg2LDgpKTtcclxuICAgICAgICBsZXQgc2VydmVydHlwZSA9IE1lc3NhZ2VQYXJzZXIuZGVjb2RlQnl0ZShtc2dCdWYuc3ViYXJyYXkoOCw5KSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3NlcnZlcklkID0gc2VydmVyaWQ7XHJcbiAgICAgICAgdGhpcy5fc2VydmVyVHlwZSA9IHNlcnZlcnR5cGU7XHJcblxyXG4gICAgICAgIGxldCBtc2dCeXRlczpVaW50OEFycmF5ID0gbXNnQnVmLnN1YmFycmF5KDkpO1xyXG5cclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGxldCBkZWNvZGVNc2cgPSAgT3Bjb2RlLmRlY29kZShvcGNvZGUsIG1zZ0J5dGVzKTtcclxuXHJcblxyXG4gICAgICAgICAgICBpZihycGNpZD09dW5kZWZpbmVkIHx8ICF0aGlzLnJlcXVlc3RDYWxsYmFjay5oYXMocnBjaWQpKXtcclxuICAgICAgICAgICAgICAgIC8v5qOA5p+l5piv5ZCm5piv5pyN5Yqh5Zmo5LiL5Y+R55qE5raI5oGvXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmxpc3RlbmVycy5oYXMob3Bjb2RlKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxpc3RlbiA9IHRoaXMubGlzdGVuZXJzLmdldChvcGNvZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbihkZWNvZGVNc2cubXNnT2JqKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGxldCBtc2dQYWNrOk1zZ1BhY2sgPSB0aGlzLnJlcXVlc3RDYWxsYmFjay5nZXQocnBjaWQpO1xyXG4gICAgICAgICAgICAgICAgbXNnUGFjay5jYWxsYmFjayhkZWNvZGVNc2cubXNnT2JqKTsgIFxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3RDYWxsYmFjay5kZWxldGUocnBjaWQpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9Y2F0Y2goZSl7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcInBhcnNlIG1zZyBlcnJvciwgb3Bjb2RlOlwiK29wY29kZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tUaW1lb3V0TXNnKCl7XHJcblxyXG4gICAgICAgIGxldCBjdXJyVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG5cclxuICAgICAgICB0aGlzLnJlcXVlc3RDYWxsYmFjay5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PntcclxuXHJcbiAgICAgICAgICAgIGlmKHZhbHVlLnJldHJ5VGltZXMgPj0gdGhpcy5tYXhSZVNlbmRUaW1lcykge1xyXG4gICAgICAgICAgICAgICAgLy/otoXov4fmnIDlpKfph43lj5HmrKHmlbDvvIzkuKLlvINcclxuICAgICAgICAgICAgICAgIExvZ2dlci5sb2coYE1lc3NhZ2UgcmVzZW5kIHRvbyBtb3JlLCBvcGNvZGU6JHtrZXl9LCBsYXN0c2VuZDoke3ZhbHVlLnNlbmRUaW1lfWApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0Q2FsbGJhY2suZGVsZXRlKGtleSk7IFxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICAgICAgICBpZigoY3VyclRpbWUgLSB2YWx1ZS5zZW5kVGltZSkgPj0gdGhpcy5yZVNlbmRJbnRlcnZhbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUucmV0cnlUaW1lcysrO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLnNlbmRUaW1lID0gY3VyclRpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/ph43lj5Hmtojmga9cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlU2VuZCh2YWx1ZS5ieXRlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhgcmVzZW5kIG1lc3NhZ2U6LCBvcGNvZGU6JHtrZXl9LCByZXRyeSB0aW1lczoke3ZhbHVlLnJldHJ5VGltZXN9YCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGRpc2Nvbm5lY3QoKTp2b2lke1xyXG5cclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMudGltZW91dElpbWVyKTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGFubmVsLkRpc3Bvc2UoKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IE5pY2VUUyB9IGZyb20gXCJjc2hhcnBcIjtcclxuaW1wb3J0IHsgJHByb21pc2UgfSBmcm9tIFwicHVlcnRzXCI7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuLi9sb2dnZXIvTG9nZ2VyXCI7XHJcbmltcG9ydCB7IFNpbmdsZXRvbiB9IGZyb20gXCIuLi9jb21tb24vU2luZ2xldG9uXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSHR0cE1hbmFnZXIgZXh0ZW5kcyBTaW5nbGV0b248SHR0cE1hbmFnZXI+e1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIGFzeW5jIGdldCh1cmw6c3RyaW5nKXtcclxuXHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICBsZXQgdGFzaz0gTmljZVRTLkh0dHBNYW5hZ2VyLkdldCh1cmwpXHJcbiAgICAgICAgICAgIGxldCB0eHQgPSBhd2FpdCAkcHJvbWlzZSh0YXNrKTtcclxuICAgICAgICAgICAgcmV0dXJuIHR4dDtcclxuICAgICAgICB9Y2F0Y2goZXgpe1xyXG5cclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBHZXQgZXJyb3IgOiR7dXJsfSA6ICR7ZXh9YClcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgcG9zdCh1cmw6c3RyaW5nLCBmb3JtOnN0cmluZyl7XHJcblxyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgbGV0IHRhc2s9IE5pY2VUUy5IdHRwTWFuYWdlci5Qb3N0KHVybCwgZm9ybSlcclxuICAgICAgICAgICAgbGV0IHR4dCA9IGF3YWl0ICRwcm9taXNlKHRhc2spO1xyXG4gICAgICAgICAgICByZXR1cm4gdHh0O1xyXG5cclxuICAgICAgICB9Y2F0Y2goZXgpe1xyXG5cclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBQb3N0IGVycm9yIDoke3VybH0gOiAke2V4fWApXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiIsIlxyXG5leHBvcnQgY2xhc3MgTWVzc2FnZVBhcnNlcntcclxuXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBlbmNvZGVJbnQobjpudW1iZXIpOlVpbnQ4QXJyYXl7XHJcblxyXG4gICAgICAgIGxldCBidWZmZXI6VWludDhBcnJheSA9IG5ldyBVaW50OEFycmF5KDQpO1xyXG4gICAgICAgIGJ1ZmZlclswXSA9IG4gPj4+IDI0O1xyXG4gICAgICAgIGJ1ZmZlclsxXSA9IG4gPj4+IDE2O1xyXG4gICAgICAgIGJ1ZmZlclsyXSA9IG4gPj4+IDg7XHJcbiAgICAgICAgYnVmZmVyWzNdID0gbiAmIDB4ZmY7XHJcblxyXG4gICAgICAgIHJldHVybiBidWZmZXJcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGRlY29kZUludChidWZmZXI6VWludDhBcnJheSk6bnVtYmVye1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBuID0gYnVmZmVyWzBdIDw8IDI0IHwgYnVmZmVyWzFdIDw8IDE2IHwgYnVmZmVyWzJdIDw8IDggfCBidWZmZXJbM107XHJcblxyXG4gICAgICAgIHJldHVybiBuO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGVuY29kZVNob3J0KG46bnVtYmVyKTpVaW50OEFycmF5e1xyXG5cclxuICAgICAgICBsZXQgYnVmZmVyIDogVWludDhBcnJheSA9IG5ldyBVaW50OEFycmF5KDIpO1xyXG4gICAgICAgIGJ1ZmZlclswXSA9IG4gPj4+IDg7XHJcbiAgICAgICAgYnVmZmVyWzFdID0gbiAmIDB4ZmY7XHJcblxyXG4gICAgICAgIHJldHVybiBidWZmZXI7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZGVjb2RlU2hvcnQoYnVmZmVyOlVpbnQ4QXJyYXkpOm51bWJlcntcclxuXHJcbiAgICAgICAgbGV0IG4gPSBidWZmZXJbMF0gPDwgOCB8IGJ1ZmZlclsxXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG47XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZW5jb2RlQnl0ZShuOm51bWJlcik6VWludDhBcnJheXtcclxuXHJcbiAgICAgICAgbGV0IGJ1ZmZlciA6IFVpbnQ4QXJyYXkgPSBuZXcgVWludDhBcnJheSgxKVxyXG4gICAgICAgIGJ1ZmZlclswXSA9IG4gJiAweGZmO1xyXG5cclxuICAgICAgICByZXR1cm4gYnVmZmVyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZGVjb2RlQnl0ZShidWZmZXI6VWludDhBcnJheSk6bnVtYmVye1xyXG5cclxuICAgICAgICBsZXQgbiA9IGJ1ZmZlclswXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG47XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn0iLCJcclxuXHJcbiBleHBvcnQgY2xhc3MgTmV0RXJyb3JDb2RlXHJcbiB7XHJcbiAgICAgcHVibGljIHN0YXRpYyAgRVJSX1NvY2tldENvbm5TdWNjOm51bWJlciA9IDEwMDAwMDtcclxuXHJcbiAgICAgcHVibGljIHN0YXRpYyAgRVJSX0Nvbm5lY3RHYXRlS2V5RXJyb3I6bnVtYmVyID0gMTAwMDA2O1xyXG5cclxuICAgICBwdWJsaWMgc3RhdGljICBFUlJfUGVlckRpc2Nvbm5lY3Q6bnVtYmVyICAgPSAxMDIwMDg7XHJcbiAgICAgcHVibGljIHN0YXRpYyAgRVJSX1NvY2tldENhbnRTZW5kOm51bWJlciAgID0gMTAyMDA5O1xyXG4gICAgIHB1YmxpYyBzdGF0aWMgIEVSUl9Tb2NrZXRFcnJvcjpudW1iZXIgICAgICA9IDEwMjAxMDtcclxuICAgICBwdWJsaWMgc3RhdGljICBFUlJfU29ja2V0Q29ubkVycm9yOm51bWJlciAgPSAxMDIwMTE7XHJcblxyXG5cclxuICAgICBcclxuXHJcbiB9IiwiXHJcbmltcG9ydCB7IE9wY29kZSB9IGZyb20gXCIuLi8uLi9kYXRhL3BiL09wY29kZVwiO1xyXG5pbXBvcnQgeyBHYW1lQ29uZmlnIH0gZnJvbSBcIi4uLy4uL2dsb2JhbC9HYW1lQ29uZmlnXCI7XHJcbmltcG9ydCB7IFNpbmdsZXRvbiB9IGZyb20gXCIuLi9jb21tb24vU2luZ2xldG9uXCI7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuLi9sb2dnZXIvTG9nZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWVTZXNzaW9uIH0gZnJvbSBcIi4vR2FtZVNlc3Npb25cIjtcclxuaW1wb3J0IHsgTmV0RXJyb3JDb2RlIH0gZnJvbSBcIi4vTmV0RXJyb3JDb2RlXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFNlc3Npb25NYW5hZ2VyIGV4dGVuZHMgU2luZ2xldG9uPFNlc3Npb25NYW5hZ2VyPntcclxuXHJcbiAgICBwcml2YXRlIHNlc3Npb25SZWFtOkdhbWVTZXNzaW9uO1xyXG4gICAgcHJpdmF0ZSBzZXNzaW9uR2F0ZTpHYW1lU2Vzc2lvbjtcclxuXHJcblxyXG4gICAgcHVibGljIGdldCByZWFsbVJwY0lEKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Vzc2lvblJlYW0ucnBjSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBnYXRlUnBjSUQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZXNzaW9uR2F0ZS5ycGNJZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgY29ubmVjdFJlYWxtU2VydmVyKCk6UHJvbWlzZTxib29sZWFuPiB7XHJcblxyXG4gICAgICAgIGxldCBwcm9taXNlID0gbmV3IFByb21pc2U8Ym9vbGVhbj4ocmVzb3ZlID0+e1xyXG4gICAgICAgICAgICB0aGlzLnNlc3Npb25SZWFtID0gR2FtZVNlc3Npb24uSW5zdGFuY2UoR2FtZVNlc3Npb24pLmNvbm5lY3RDaGFubmVsKFxyXG4gICAgICAgICAgICAgICAgR2FtZUNvbmZpZy5yZWFsbVNlcnZlcklQK1wiOlwiK0dhbWVDb25maWcucmVhbG1TZXJ2ZXJQb3J0LFxyXG4gICAgICAgICAgICAgICAgKGNoYW5uZWw6YW55LGNvZGU6bnVtYmVyKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNvZGUgPT0gTmV0RXJyb3JDb2RlLkVSUl9Tb2NrZXRDb25uU3VjYyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2Vzc2lvblJlYW0uaWQgPSBjaGFubmVsLklkO1xyXG4gICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3ZlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3ZlKGZhbHNlKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImxvZ2luIHJlYW1zZXJ2ZXIgZXJyLCBjb2RlOiBcIitjb2RlICsgXCIsaWQ6XCIrY2hhbm5lbC5JZCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2VcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHB1YmxpYyBkaXNjb25uZWN0UmVhbG1TZXJ2ZXIoKXtcclxuICAgICAgICB0aGlzLnNlc3Npb25SZWFtLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICB0aGlzLnNlc3Npb25SZWFtID0gbnVsbDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGFzeW5jIHNlbmRSZWFsbU1zZyhvcGNvZGU6bnVtYmVyLG1zZzphbnkpOlByb21pc2U8YW55PntcclxuICAgICAgICBcclxuICAgICAgICBsZXQgcnBjSUQgPSB0aGlzLnNlc3Npb25SZWFtLnJwY0lkXHJcbiAgICAgICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZTxhbnk+KChyZXNvdmUpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCBidWYgPSBPcGNvZGUuZW5jb2RlKG9wY29kZSwgbXNnKVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXNzaW9uUmVhbS5zZW5kKG9wY29kZSwgcnBjSUQsIGJ1ZiwgKHJlc3BvbnNlOmFueSk9PntcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZXNvdmUocmVzcG9uc2UpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHByb21pc2VcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGFzeW5jIGNvbm5lY3RHYXRlU2VydmVyKGFkZHJlc3M6c3RyaW5nKTpQcm9taXNlPGJvb2xlYW4+e1xyXG5cclxuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlPGJvb2xlYW4+KHJlc292ZSA9PntcclxuICAgICAgICAgICAgdGhpcy5zZXNzaW9uR2F0ZSA9IEdhbWVTZXNzaW9uLkluc3RhbmNlKEdhbWVTZXNzaW9uKS5jb25uZWN0Q2hhbm5lbChcclxuICAgICAgICAgICAgICAgIGFkZHJlc3MsXHJcbiAgICAgICAgICAgICAgICAoY2hhbm5lbDphbnksY29kZTpudW1iZXIpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhcImxvZ2luIEdhdGUgU2VydmVyOiBcIitjb2RlKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNvZGUgPT0gTmV0RXJyb3JDb2RlLkVSUl9Tb2NrZXRDb25uU3VjYyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2Vzc2lvbkdhdGUuaWQgPSBjaGFubmVsLklkO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdmUodHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3ZlKGZhbHNlKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiZ2F0ZSBzZXJ2ZXIgZXJyLCBjb2RlOiBcIitjb2RlICsgXCIsaWQ6XCIrY2hhbm5lbC5JZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcHJvbWlzZVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZGlzY29ubmVjdEdhdGVTZXJ2ZXIoKXtcclxuICAgICAgICB0aGlzLnNlc3Npb25HYXRlLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICB0aGlzLnNlc3Npb25HYXRlID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgc2VuZEdhdGVNc2cob3Bjb2RlOm51bWJlciwgbXNnOmFueSk6UHJvbWlzZTxhbnk+e1xyXG5cclxuICAgICAgICBsZXQgcnBjSUQgPSB0aGlzLnNlc3Npb25HYXRlLnJwY0lkXHJcbiAgICAgICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZTxhbnk+KChyZXNvdmUpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCBidWYgPSBPcGNvZGUuZW5jb2RlKG9wY29kZSwgbXNnKVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXNzaW9uR2F0ZS5zZW5kKG9wY29kZSwgcnBjSUQsIGJ1ZiwgKHJlc3BvbnNlOmFueSk9PntcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZXNvdmUocmVzcG9uc2UpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHByb21pc2VcclxuXHJcbiAgICB9XHJcbn0gICBcclxuIiwiaW1wb3J0IHsgVW5pdHlFbmdpbmUgfSBmcm9tIFwiY3NoYXJwXCI7XHJcbmltcG9ydCB7IFMgfSBmcm9tIFwiLi4vLi4vZ2xvYmFsL0dhbWVDb25maWdcIjtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlU2NlbmV7XHJcblxyXG4gICAgcHJpdmF0ZSBwcmVsb2FkUHJlZmFiOk1hcDxzdHJpbmcsbnVtYmVyPjtcclxuICAgIHByaXZhdGUgc2NlbmVJbnN0YW5jZTpVbml0eUVuZ2luZS5SZXNvdXJjZU1hbmFnZW1lbnQuUmVzb3VyY2VQcm92aWRlcnMuU2NlbmVJbnN0YW5jZVxyXG5cclxuICAgIHB1YmxpYyBmaW5pc2hDb3VudCA9IDA7XHJcbiAgICBwdWJsaWMgdG90YWxDb3VudCA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLnByZWxvYWRQcmVmYWIgPSBuZXcgTWFwPHN0cmluZyxudW1iZXI+KCk7XHJcbiAgICAgICAgdGhpcy5maW5pc2hDb3VudCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFByZWxvYWRQcmVmYWIoYWRkcmVzczpzdHJpbmcsIGluc3RDb3VudCl7XHJcbiAgICAgICAgaWYoIXRoaXMucHJlbG9hZFByZWZhYi5oYXMoYWRkcmVzcykpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnByZWxvYWRQcmVmYWIuc2V0KGFkZHJlc3MsIGluc3RDb3VudCk7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnByZWxvYWRQcmVmYWIuc2V0KGFkZHJlc3MsIHRoaXMucHJlbG9hZFByZWZhYi5nZXQoYWRkcmVzcykgKyBpbnN0Q291bnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRTY2VuZUluc3RhbmNlKHNjZW5lSW5zdGFuY2U6VW5pdHlFbmdpbmUuUmVzb3VyY2VNYW5hZ2VtZW50LlJlc291cmNlUHJvdmlkZXJzLlNjZW5lSW5zdGFuY2Upe1xyXG4gICAgICAgIHRoaXMuc2NlbmVJbnN0YW5jZSA9IHNjZW5lSW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IG9uRW50ZXIoKTtcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBvbkNvbXBsZXRlKCk7XHJcbiAgICBwdWJsaWMgYWJzdHJhY3Qgb25MZWF2ZSgpO1xyXG5cclxuICAgIHB1YmxpYyBhc3luYyBsb2FkQXNzZXRzQXN5bmMoKXtcclxuXHJcbiAgICAgICAgdGhpcy50b3RhbENvdW50ID0gdGhpcy5wcmVsb2FkUHJlZmFiLnNpemU7XHJcblxyXG4gICAgICAgIGxldCBwcmVtaXNlcyA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLnByZWxvYWRQcmVmYWIuZm9yRWFjaCgodmFsdWUsIGtleSk9PntcclxuICAgICAgICAgICAgbGV0IHByZW1pc2UgPSBTLkdhbWVPYmplY3RQb29sLnByZUxvYWRHYW1lT2JqZWN0QXN5bmMoa2V5LCB2YWx1ZSwoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maW5pc2hDb3VudCsrO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBwcmVtaXNlcy5wdXNoKHByZW1pc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChwcmVtaXNlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uRGVzdHJveSgpe1xyXG4gXHJcbiAgICAgICAgLy/muIXnkIbotYTmupDnvJPlrZhcclxuICAgICAgICBTLkdhbWVPYmplY3RQb29sLmNsZWFudXAodHJ1ZSk7XHJcblxyXG4gICAgICAgIC8v5Y246L295Zy65pmvXHJcbiAgICAgICAgUy5SZXNNYW5hZ2VyLnVubG9hZFNjZW5lKHRoaXMuc2NlbmVJbnN0YW5jZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5wcmVsb2FkUHJlZmFiLmNsZWFyKCk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgIGNsYXNzIFNjZW5lRGVme1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgTG9hZGluZ1NjZW5lOnN0cmluZyA9IFwiTG9hZGluZ1NjZW5lXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIEdhbWVTdGFydDpzdHJpbmcgPSBcIkdhbWVTdGFydFNjZW5lXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIEZseUJpcmQ6c3RyaW5nID0gXCJGbHlCaXJkU2NlbmVcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgTGF1bmNoU2NlbmU6c3RyaW5nID0gXCJMYXVuY2hTY2VuZVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBIb21lU2NlbmU6c3RyaW5nID0gXCJIb21lU2NlbmVcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgTG9naW5TY2VuZTpzdHJpbmcgPSBcIkxvZ2luU2NlbmVcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgUHZlU2NlbmU6c3RyaW5nID0gXCJQdmVTY2VuZVwiO1xyXG59XHJcbiIsImltcG9ydCB7IEJhc2VTY2VuZSB9IGZyb20gXCIuL0Jhc2VTY2VuZVwiO1xyXG5pbXBvcnQgeyBQdmVTY2VuZSB9IGZyb20gXCIuLi8uLi9nYW1lL21vZHVsZS9wdmUvc2NlbmUvUHZlU2NlbmVcIjtcclxuaW1wb3J0IHsgSG9tZVNjZW5lIH0gZnJvbSBcIi4uLy4uL2dhbWUvbW9kdWxlL2hvbWUvc2NlbmUvSG9tZVNjZW5lXCI7XHJcbi8vIGltcG9ydCB7IExvZ2luU2NlbmUgfSBmcm9tIFwiLi4vLi4vZ2FtZS9tb2R1bGUvbG9naW4vc2NlbmUvTG9naW5TY2VuZVwiO1xyXG5pbXBvcnQgeyBTY2VuZURlZiB9IGZyb20gXCIuL1NjZW5lRGVmXCI7XHJcbmltcG9ydCB7IEdhbWVTdGFydFNjZW5lIH0gZnJvbSBcIi4uLy4uL2dhbWUvbW9kdWxlL2dhbWVzdGFydC9zY2VuZS9HYW1lU3RhcnRTY2VuZVwiO1xyXG5pbXBvcnQgeyBGbHlCaXJkU2NlbmUgfSBmcm9tIFwiLi4vLi4vZ2FtZS9tb2R1bGUvZmx5YmlyZC9zY2VuZS9GbHlCaXJkU2NlbmVcIjtcclxuXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFNjZW5lRmFjdG9yeXtcclxuXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVTY2VuZShzY2VuZU5hbWU6c3RyaW5nKTpCYXNlU2NlbmV7XHJcblxyXG4gICAgICAgIGxldCBzY2VuZTpCYXNlU2NlbmUgPSBudWxsO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHNjZW5lTmFtZSl7XHJcbiAgICAgICAgICAgIGNhc2UgU2NlbmVEZWYuR2FtZVN0YXJ0OlxyXG4gICAgICAgICAgICAgICAgc2NlbmUgPSBuZXcgR2FtZVN0YXJ0U2NlbmUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNjZW5lRGVmLkZseUJpcmQ6XHJcbiAgICAgICAgICAgICAgICBzY2VuZSA9IG5ldyBGbHlCaXJkU2NlbmUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNjZW5lRGVmLkhvbWVTY2VuZTpcclxuICAgICAgICAgICAgICAgIHNjZW5lID0gbmV3IEhvbWVTY2VuZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2NlbmVEZWYuUHZlU2NlbmU6XHJcbiAgICAgICAgICAgICAgICBzY2VuZSA9IG5ldyBQdmVTY2VuZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc2NlbmU7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBDb21tb25VSSB9IGZyb20gXCIuLi8uLi9kYXRhL3VpL2NvbW1vblwiO1xyXG5pbXBvcnQgeyBVSU1lc3NhZ2UgfSBmcm9tIFwiLi4vLi4vZ2FtZS9ldmVudC9VSU1lc3NhZ2VcIjtcclxuaW1wb3J0IHsgUyB9IGZyb20gXCIuLi8uLi9nbG9iYWwvR2FtZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBTaW5nbGV0b24gfSBmcm9tIFwiLi4vY29tbW9uL1NpbmdsZXRvblwiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi4vbG9nZ2VyL0xvZ2dlclwiO1xyXG5pbXBvcnQgeyBCYXNlU2NlbmUgfSBmcm9tIFwiLi9CYXNlU2NlbmVcIjtcclxuaW1wb3J0IHsgU2NlbmVGYWN0b3J5IH0gZnJvbSBcIi4vU2NlbmVGYWN0b3J5XCI7XHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgU2NlbmVNYW5hZ2VyIGV4dGVuZHMgU2luZ2xldG9uPFNjZW5lTWFuYWdlcj57XHJcblxyXG4gICAgcHJpdmF0ZSBjdXJyZW50U2NlbmU6QmFzZVNjZW5lID0gbnVsbDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGxvYWRTY2VuZShzY2VuZTpzdHJpbmcpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRyeXtcclxuXHJcbiAgICAgICAgICAgIC8v5omT5byATG9hZGluZ+eVjOmdolxyXG4gICAgICAgICAgICBTLlVJTWFuYWdlci5vcGVuTG9hZGluZyhDb21tb25VSS5QYWNrYWdlTmFtZSwgQ29tbW9uVUkuVUlMb2FkaW5nVmlldyk7XHJcblxyXG4gICAgICAgICAgICAvL+a4heeQhuaXp+WcuuaZr1xyXG4gICAgICAgICAgICBpZih0aGlzLmN1cnJlbnRTY2VuZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZS5vbkxlYXZlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZS5vbkRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy/lvIDlp4vliqDovb3lnLrmma9cclxuICAgICAgICAgICAgbGV0IHNjZW5lSW5zdGFuY2UgPSBhd2FpdCBTLlJlc01hbmFnZXIubG9hZFNjZW5lKHNjZW5lKTtcclxuXHJcbiAgICAgICAgICAgIC8v5byA5aeL5Yqg6L296L+b5YWl5Zy65pmv55qE6LWE5rqQXHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNjZW5lID0gIFNjZW5lRmFjdG9yeS5jcmVhdGVTY2VuZShzY2VuZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNjZW5lLnNldFNjZW5lSW5zdGFuY2Uoc2NlbmVJbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNjZW5lLm9uRW50ZXIoKTtcclxuXHJcbiAgICAgICAgICAgIC8v6K6+572u5b2T5YmN5Zy65pmv5Yqg6L296L+b5bqmVGltZXJcclxuICAgICAgICAgICAgbGV0IHByb2dyZXNzSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKT0+e1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBwcm9ncmVzcyA9IHRoaXMuY3VycmVudFNjZW5lLmZpbmlzaENvdW50L3RoaXMuY3VycmVudFNjZW5lLnRvdGFsQ291bnQ7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwicHJvZ3Jlc3M6XCIrcHJvZ3Jlc3MgKyBcIiA9IFwiK3RoaXMuY3VycmVudFNjZW5lLmZpbmlzaENvdW50ICsgXCIgPSBcIit0aGlzLmN1cnJlbnRTY2VuZS50b3RhbENvdW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICBTLlVJTWVzc2FnZU1hbmdlci5icm9hZGNhc3QoXHJcbiAgICAgICAgICAgICAgICAgICAgVUlNZXNzYWdlLk1TR19TQ0VORV9QUk9HUkVTUyxcclxuICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcyoxMDApO1xyXG5cclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuXHJcbiAgICAgICAgICAgIC8v5Yqg6L296LWE5rqQXHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY3VycmVudFNjZW5lLmxvYWRBc3NldHNBc3luYygpO1xyXG5cclxuICAgICAgICAgICAgLy/liqDovb3lrozmiJBcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChwcm9ncmVzc0ludGVydmFsKVxyXG5cclxuICAgICAgICAgICAgLy/lhbPpl63miYDmnIlQYWdlXHJcbiAgICAgICAgICAgIFMuVUlNYW5hZ2VyLmNsb3NlQWxsUGFuZWxzKCk7XHJcblxyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmN1cnJlbnRTY2VuZS5vbkNvbXBsZXRlKClcclxuICAgICAgICAgICAgUy5VSU1hbmFnZXIuY2xvc2VMb2FkaW5nKCk7XHJcblxyXG4gICAgICAgIH1jYXRjaChleCl7XHJcbiAgICAgICAgICAgIExvZ2dlci5sb2coXCJsb2FkIHNjZW5lIGV4Y2VwOlwiK2V4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBcclxufSIsIlxyXG5leHBvcnQgY2xhc3MgVUlCYXNlIHtcclxuXHJcbiAgICBwdWJsaWMgZnVpOmFueTsgIC8vRmFpcnlHVUkg5a+56LGhXHJcblxyXG5cclxuICAgIC8v57uR5a6aRmFpcnlHVUnlhYPku7ZcclxuICAgIHB1YmxpYyBiaW5kQWxsKHRhcmdldDphbnkpOnZvaWR7XHJcbiAgICAgICAgZm9yKGxldCBrIGluIHRhcmdldFtcImJpbmRlcnNcIl0pe1xyXG4gICAgICAgICAgICBsZXQgZmd1aU5hbWUgPSB0aGlzW1wiYmluZGVyc1wiXVtrXTtcclxuICAgICAgICAgICAgdGhpc1trXSA9IHRoaXMuZnVpLkdldENoaWxkKGZndWlOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgICAgIFxyXG5cclxufSIsIlxyXG5cclxuXHJcbmV4cG9ydCBlbnVtIFVJVHlwZURlZntcclxuICAgIFVua293biA9IDAsXHJcbiAgICBQYWdlID0gMSxcclxuICAgIFdpbmRvdz0yLFxyXG4gICAgV2lkZ2V0ID0gMyxcclxuICAgIExvYWRpbmcgPTRcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFVJTGF5ZXJEZWZ7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBCYWNrZ3JvdW5kOm51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgc3RhdGljIFBhZ2U6bnVtYmVyID0gMTAwMDtcclxuICAgIHB1YmxpYyBzdGF0aWMgTm9ybWFsV2luZG93Om51bWJlciA9IDIwMDA7XHJcbiAgICBwdWJsaWMgc3RhdGljIFRvcFdpbmRvdzpudW1iZXIgPSAzMDAwO1xyXG4gICAgcHVibGljIHN0YXRpYyBXaWRnZXQ6bnVtYmVyID0gNDAwMDtcclxuICAgIHB1YmxpYyBzdGF0aWMgTG9hZGluZzpudW1iZXIgPSA1MDAwO1xyXG4gICAgcHVibGljIHN0YXRpYyBVbmtvd246bnVtYmVyID0gOTk5OTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljICBnZXREZWZhdWx0TGF5ZXIodHlwZTpVSVR5cGVEZWYpOm51bWJlcntcclxuXHJcbiAgICAgICAgc3dpdGNoKHR5cGUpe1xyXG4gICAgICAgICAgICBjYXNlIFVJVHlwZURlZi5Mb2FkaW5nOiByZXR1cm4gdGhpcy5Mb2FkaW5nO1xyXG4gICAgICAgICAgICBjYXNlIFVJVHlwZURlZi5XaWRnZXQ6IHJldHVybiB0aGlzLldpZGdldDtcclxuICAgICAgICAgICAgY2FzZSBVSVR5cGVEZWYuV2luZG93OiByZXR1cm4gdGhpcy5Ob3JtYWxXaW5kb3c7XHJcbiAgICAgICAgICAgIGNhc2UgVUlUeXBlRGVmLlBhZ2U6IHJldHVybiB0aGlzLlBhZ2U7XHJcbiAgICAgICAgICAgIGNhc2UgVUlUeXBlRGVmLlVua293bjogcmV0dXJuIHRoaXMuVW5rb3duO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gdGhpcy5Vbmtvd247IFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBVSUNvbURlZnN7XHJcbiAgICBwdWJsaWMgc3RhdGljIEJhY2tCdG4gPSBcImJhY2tfYnRuXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFdpbmRvd0Nsb3NlQnRuID0gXCJ3aW5fY2xvc2VfYnRuXCI7XHJcbn1cclxuXHJcblxyXG5cclxuIiwiXHJcbmltcG9ydCB7IFVJUGFuZWwgfSBmcm9tIFwiLi9VSVBhbmVsXCI7XHJcbmltcG9ydCB7IFVJTG9hZGluZyB9IGZyb20gXCIuL1VJTGliL1VJTG9hZGluZ1wiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi4vbG9nZ2VyL0xvZ2dlclwiO1xyXG5pbXBvcnQgeyBDb21tb25VSSB9IGZyb20gXCIuLi8uLi9kYXRhL3VpL2NvbW1vblwiO1xyXG5pbXBvcnQgeyBGbHlCaXJkVUkgfSBmcm9tIFwiLi4vLi4vZGF0YS91aS9GbHlCaXJkXCI7XHJcbmltcG9ydCB7IEdhbWVTdGFydFVJIH0gZnJvbSBcIi4uLy4uL2RhdGEvdWkvR2FtZVN0YXJ0XCI7XHJcbmltcG9ydCB7IFVJU3RhcnRWaWV3IH0gZnJvbSBcIi4uLy4uL2dhbWUvbW9kdWxlL2dhbWVzdGFydC91aS9VSVN0YXJ0Vmlld1wiO1xyXG5pbXBvcnQgeyBVSUZseUJpcmRNYWluVmlldyB9IGZyb20gXCIuLi8uLi9nYW1lL21vZHVsZS9mbHliaXJkL3VpL1VJRmx5QmlyZE1haW5WaWV3XCI7XHJcbmltcG9ydCB7IFVJRmx5QmlyZE92ZXJXaW5kb3cgfSBmcm9tIFwiLi4vLi4vZ2FtZS9tb2R1bGUvZmx5QmlyZC91aS9VSUZseUJpcmRPdmVyV2luZG93XCI7XHJcblxyXG5cclxuXHJcbmNvbnN0IENTID0gcmVxdWlyZSgnY3NoYXJwJyk7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFVJRmFjdG9yeXtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHVpQ2FjaGU6TWFwPHN0cmluZyxVSVBhbmVsPiA9IG5ldyBNYXA8c3RyaW5nLFVJUGFuZWw+KCk7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVVSShwa2c6c3RyaW5nLCBuYW1lOnN0cmluZyl7XHJcbiAgICAgICAgTG9nZ2VyLmxvZyhgY3JlYXRlIFVJOiAke3BrZ306JHtuYW1lfWApXHJcbiAgICAgICAgbGV0IGNvbXAgPSBDUy5GYWlyeUdVSS5VSVBhY2thZ2UuQ3JlYXRlT2JqZWN0KHBrZywgbmFtZSkuYXNDb21cclxuICAgICAgICBcclxuICAgICAgICBsZXQgdWk6VUlQYW5lbCA9IHRoaXMudWlDYWNoZS5nZXQobmFtZSk7XHJcblxyXG4gICAgICAgIGlmKCF1aSl7XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2gocGtnKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgQ29tbW9uVUkuUGFja2FnZU5hbWU6XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChuYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBDb21tb25VSS5VSUxvYWRpbmdWaWV3OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWkgPSBuZXcgVUlMb2FkaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGNhc2UgRmx5QmlyZFVJLlBhY2thZ2VOYW1lOlxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAobmFtZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgRmx5QmlyZFVJLlVJTWFpblZJZXc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aSA9IG5ldyBVSUZseUJpcmRNYWluVmlldygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgRmx5QmlyZFVJLlVJT3ZlcldpbmRvdzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpID0gbmV3IFVJRmx5QmlyZE92ZXJXaW5kb3coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHYW1lU3RhcnRVSS5QYWNrYWdlTmFtZTpcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG5hbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdhbWVTdGFydFVJLlVJU3RhcnRWaWV3OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWkgPSBuZXcgVUlTdGFydFZpZXcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVpQ2FjaGUuc2V0KG5hbWUsIHVpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodWkhPW51bGwpe1xyXG4gICAgICAgICAgICB1aS5mdWkgPSBjb21wO1xyXG4gICAgICAgICAgICB1aS5uYW1lID0gbmFtZTtcclxuICAgICAgICAgICAgdWkucGtnTmFtZSA9IHBrZztcclxuXHJcbiAgICAgICAgICAgIC8v57uR5a6aRmFpcnlHVUnmjqfku7ZcclxuICAgICAgICAgICAgdWkuYmluZEFsbCh1aSk7XHJcbiAgICAgICAgICAgIHVpLmF3YWtlKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihgbm90IGNyZWF0ZSB1aTogJHtwa2d9LSR7bmFtZX1gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB1aTtcclxuICAgIH1cclxuXHJcblxyXG5cclxufSIsImltcG9ydCB7IFVJUGFuZWwgfSBmcm9tIFwiLi4vVUlQYW5lbFwiO1xyXG5pbXBvcnQgeyBVSVR5cGVEZWYgfSBmcm9tIFwiLi4vVUlEZWZpbmVcIjtcclxuaW1wb3J0IHsgRmFpcnlHVUkgfSBmcm9tIFwiY3NoYXJwXCI7XHJcbmltcG9ydCB7IGJpbmRlciB9IGZyb20gXCIuLi8uLi9jb21tb24vTmljZURlY29yYXRvclwiO1xyXG5pbXBvcnQgeyBVSU1lc3NhZ2UgfSBmcm9tIFwiLi4vLi4vLi4vZ2FtZS9ldmVudC9VSU1lc3NhZ2VcIjtcclxuaW1wb3J0IHsgUyB9IGZyb20gXCIuLi8uLi8uLi9nbG9iYWwvR2FtZUNvbmZpZ1wiO1xyXG5cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgIFVJTG9hZGluZyBleHRlbmRzIFVJUGFuZWx7XHJcblxyXG5cclxuICAgIEBiaW5kZXIoXCJsb2FkaW5nX3ByZWdyZXNzXCIpXHJcbiAgICBwdWJsaWMgcHJvZ3Jlc3NMb2FkaW5nOiBGYWlyeUdVSS5HUHJvZ3Jlc3NCYXI7XHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgb25Bd2FrZSgpOiB2b2lkIHtcclxuICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IHVpVHlwZSgpOiBVSVR5cGVEZWYgeyAgICBcclxuICAgICAgICByZXR1cm4gVUlUeXBlRGVmLkxvYWRpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU2hvdyhhcmc6YW55KTp2b2lke1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NMb2FkaW5nLnZhbHVlID0gMDtcclxuICAgICAgICB0aGlzLnByb2dyZXNzTG9hZGluZy52aXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgUy5VSU1lc3NhZ2VNYW5nZXIuYWRkTGlzdGVuZXIoXHJcbiAgICAgICAgICAgIFVJTWVzc2FnZS5NU0dfU0NFTkVfUFJPR1JFU1MsXHJcbiAgICAgICAgICAgIHRoaXMsXHJcbiAgICAgICAgICAgIChwcm9ncmVzczpudW1iZXIpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzTG9hZGluZy5Ud2VlblZhbHVlKHByb2dyZXNzLCAwLjEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25DbG9zZShhcmc6YW55KTp2b2lke1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NMb2FkaW5nLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICBTLlVJTWVzc2FnZU1hbmdlci5yZW1vdmVMaXN0ZW5lckJ5Q29kZShcclxuICAgICAgICAgICAgVUlNZXNzYWdlLk1TR19TQ0VORV9QUk9HUkVTU1xyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG5cclxufSIsIlxyXG5pbXBvcnQgeyBTaW5nbGV0b24gfSBmcm9tICcuLi9jb21tb24vU2luZ2xldG9uJztcclxuaW1wb3J0IHsgVUlMb2FkaW5nIH0gZnJvbSAnLi9VSUxpYi9VSUxvYWRpbmcnO1xyXG5pbXBvcnQgeyBVSVdpbmRvdyB9IGZyb20gJy4vVUlXaW5kb3cnO1xyXG5pbXBvcnQgeyBVSVdpZGdlIH0gZnJvbSAnLi9VSVdpZGdlJztcclxuaW1wb3J0IHsgVUlQYW5lbCB9IGZyb20gJy4vVUlQYW5lbCc7XHJcbmltcG9ydCB7IFVJRmFjdG9yeSB9IGZyb20gJy4vVUlGYWN0b3J5JztcclxuaW1wb3J0IHsgUyB9IGZyb20gJy4uLy4uL2dsb2JhbC9HYW1lQ29uZmlnJztcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnLi4vbG9nZ2VyL0xvZ2dlcic7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFVJUGFnZVRyYWNre1xyXG4gICAgcHVibGljIHBrZzpzdHJpbmc7XHJcbiAgICBwdWJsaWMgbmFtZTpzdHJpbmc7XHJcbiAgICBwdWJsaWMgYXJnOmFueTtcclxuICAgIHB1YmxpYyB1aTpVSVBhbmVsO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFVJTWFuYWdlciBleHRlbmRzIFNpbmdsZXRvbjxVSU1hbmFnZXI+e1xyXG5cclxuICAgIHByaXZhdGUgIG1fcGFnZVRyYWNrU3RhY2s6QXJyYXk8VUlQYWdlVHJhY2s+O1xyXG4gICAgcHJpdmF0ZSBtX2N1cnJlbnRQYWdlOlVJUGFnZVRyYWNrO1xyXG4gICAgcHJpdmF0ZSBtX2xhc3RTY2Vuc2VQYWdlOlVJUGFnZVRyYWNrO1xyXG5cclxuICAgIHByaXZhdGUgbV9saXN0TG9hZGVkUGFuZWw6QXJyYXk8VUlQYW5lbD47XHJcblxyXG4gICAgcHJpdmF0ZSBtX2xvYWRpbmdQYWdlOlVJUGFuZWw7XHJcbiAgICBwcml2YXRlIG1fZ21QYWdlOlVJUGFuZWw7XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5tX3BhZ2VUcmFja1N0YWNrID0gbmV3IEFycmF5PFVJUGFnZVRyYWNrPigpO1xyXG4gICAgICAgIHRoaXMubV9saXN0TG9hZGVkUGFuZWwgPSBuZXcgQXJyYXk8VUlQYW5lbD4oKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShkZWx0YTpudW1iZXIpe1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tX2xpc3RMb2FkZWRQYW5lbC5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICB0aGlzLm1fbGlzdExvYWRlZFBhbmVsW2ldLnVwZGF0ZShkZWx0YSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubV9jdXJyZW50UGFnZT8udWk/LnVwZGF0ZShkZWx0YSlcclxuICAgICAgICB0aGlzLm1fbGFzdFNjZW5zZVBhZ2U/LnVpPy51cGRhdGUoZGVsdGEpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkaXN0cm95UGFuZWwocGFuZWw6VUlQYW5lbCl7XHJcbiAgICAgICAgaWYocGFuZWwuaXNPcGVuKXtcclxuICAgICAgICAgICAgcGFuZWwuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/ljbjovb3otYTmupBcclxuICAgICAgICBTLlJlc01hbmFnZXIucmVsZWFzZUZhaXJ5R1VJUGFja2FnZShwYW5lbC5wa2dOYW1lKTtcclxuICAgICAgICBwYW5lbC5kaXNwb3NlKCk7ICBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRpc3Ryb3lBbGxMb2FkZWRQYW5lbCgpOnZvaWR7XHJcbiAgICAgICAgZm9yKGxldCBpPSB0aGlzLm1fbGlzdExvYWRlZFBhbmVsLmxlbmd0aC0xOyBpPj0wOyBpLS0pe1xyXG4gICAgICAgICAgICBsZXQgcGFuZWwgPSB0aGlzLm1fbGlzdExvYWRlZFBhbmVsW2ldO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kaXN0cm95UGFuZWwocGFuZWwpO1xyXG4gICAgICAgICAgICB0aGlzLm1fbGlzdExvYWRlZFBhbmVsLnNwbGljZShpLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFuKCk6dm9pZHtcclxuXHJcbiAgICAgICAgdGhpcy5kaXN0cm95QWxsTG9hZGVkUGFuZWwoKTtcclxuXHJcbiAgICAgICAgdGhpcy5tX3BhZ2VUcmFja1N0YWNrLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5tX2xpc3RMb2FkZWRQYW5lbC5sZW5ndGggPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRQYW5lbFVJKG5hbWU6c3RyaW5nKTpVSVBhbmVse1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IHBhbmVsIG9mIHRoaXMubV9saXN0TG9hZGVkUGFuZWwpIHtcclxuICAgICAgICAgICAgaWYocGFuZWwubmFtZSA9PSBuYW1lKXtcclxuXHJcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwiZmluZCBwYW5lbCBpbiBjYWNoZTogXCIrbmFtZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhbmVsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBvcGVuKHBrZzpzdHJpbmcsIG5hbWU6c3RyaW5nLCBhcmc/OmFueSl7XHJcbiAgIFxyXG4gICAgICAgIGxldCB1aTphbnkgPSB0aGlzLmdldFBhbmVsVUkobmFtZSk7XHJcblxyXG4gICAgICAgIGlmKHVpID09IG51bGwpe1xyXG4gICAgICAgICAgICAvL+WKoOi9vSBwYWNrYWdlXHJcbiAgICAgICAgICAgIGF3YWl0IFMuUmVzTWFuYWdlci5sb2FkRmFpcnlHVUlQYWNrYWdlKHBrZyk7XHJcbiAgICAgICAgICAgIHVpID0gVUlGYWN0b3J5LmNyZWF0ZVVJKHBrZywgbmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMubV9saXN0TG9hZGVkUGFuZWwucHVzaCh1aSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih1aSAhPSBudWxsKXtcclxuICAgICAgICAgICAgLy8gIyMjICB1aSBhcyBhbnkg6LCD55So56eB5pyJ5pa55rOVXHJcbiAgICAgICAgICAgICh1aSBhcyBhbnkpLl9pbnRlcm5hbE9wZW4oYXJnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB1aTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBvcGVuUGFnZVdvcmtlcihwa2c6c3RyaW5nLCBwYWdlOnN0cmluZywgYXJnOmFueSl7XHJcblxyXG4gICAgICAgIC8v6K6+572uIG1fY3VycmVudFBhZ2VcclxuICAgICAgICB0aGlzLm1fY3VycmVudFBhZ2UgPSBuZXcgVUlQYWdlVHJhY2soKTtcclxuICAgICAgIFxyXG4gICAgICAgIHRoaXMubV9jdXJyZW50UGFnZS5wa2cgPSBwa2c7XHJcbiAgICAgICAgdGhpcy5tX2N1cnJlbnRQYWdlLm5hbWUgPSBwYWdlO1xyXG4gICAgICAgIHRoaXMubV9jdXJyZW50UGFnZS5hcmcgPSBhcmc7XHJcblxyXG4gICAgICAgIC8v5omT5byA5pawUGFnZVxyXG4gICAgICAgIGF3YWl0IFMuUmVzTWFuYWdlci5sb2FkRmFpcnlHVUlQYWNrYWdlKHBrZyk7XHJcbiAgICAgICAgbGV0IHVpID0gVUlGYWN0b3J5LmNyZWF0ZVVJKHBrZywgcGFnZSk7XHJcbiAgICAgICAgKHVpIGFzIGFueSkuX2ludGVybmFsT3BlbihhcmcpO1xyXG5cclxuICAgICAgICAvL+S/neWtmOWIsCBtX2N1cnJlbnRQYWdlXHJcbiAgICAgICAgdGhpcy5tX2N1cnJlbnRQYWdlLnVpID0gdWk7XHJcblxyXG4gICAgICAgIC8v6ZSA5q+B5b2T5YmNcGFnZSDkuK3miZPlvIDnmoTlkIToh6pQYW5lbHNcclxuICAgICAgICB0aGlzLmRpc3Ryb3lBbGxMb2FkZWRQYW5lbCgpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5tX2N1cnJlbnRQYWdlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09VUlQYWdlXHJcbiAgICAvL+aJk+W8gOWcuuaZr+mhtemdoizmraTpobXpnaLkuI3orqHlhaXpobXpnaLmoIgs5peg6L+U5Zue5LiK5LiA6Z2i5oyJ6ZKuXHJcbiAgICBwdWJsaWMgYXN5bmMgb3BlblBhZ2VJblNjZW5lKHBrZzpzdHJpbmcsIHBhZ2U6c3RyaW5nLCBhcmc6YW55KXtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgX29wZW5QYWdlID0gYXdhaXQgdGhpcy5vcGVuUGFnZVdvcmtlcihwa2csIHBhZ2UsIGFyZyk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMubV9sYXN0U2NlbnNlUGFnZSl7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzdHJveVBhbmVsKHRoaXMubV9sYXN0U2NlbnNlUGFnZS51aSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubV9sYXN0U2NlbnNlUGFnZSA9IF9vcGVuUGFnZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+aJk+W8gOmhtemdoiwg5Lya5YWz6Zet5LiK5LiA5Liq6aG16Z2i5LiK55qE5omA5pyJ56qX5Y+jLFdpZGlnZXTnrYlcclxuICAgIHB1YmxpYyBhc3luYyBvcGVuUGFnZShwa2c6c3RyaW5nLCBuYW1lOnN0cmluZywgYXJnPzphbnkpe1xyXG5cclxuICAgICAgICAvLzEsIOajgOafpeagiOS4reaYr+WQpuWtmOWcqOatpOmhtemdolxyXG4gICAgICAgIGxldCBsZW4gPSB0aGlzLm1fcGFnZVRyYWNrU3RhY2subGVuZ3RoO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IGxlbi0xOyBpID49IDAgO2ktLSl7XHJcbiAgICAgICAgICAgIGxldCB0cmFjayA9IHRoaXMubV9wYWdlVHJhY2tTdGFja1tpXTtcclxuICAgICAgICAgICAgaWYodHJhY2sucGtnID09IHBrZyAmJiB0cmFjay5uYW1lID09IG5hbWUpe1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3Ryb3lBbGxMb2FkZWRQYW5lbCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXN0cm95UGFuZWwodGhpcy5tX2N1cnJlbnRQYWdlLnVpKTtcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0cmFjay51aS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRyYWNrLnVpLm9uU2hvdyh0cmFjay5hcmcpO1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy/ljbjovb3mraTpobXmoIjkuIrpnaLnmoTnlYzpnaJcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaiA9IGxlbiAtMTsgaiA+IGk7IGotLSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRlbF90cmFjayA9IHRoaXMubV9wYWdlVHJhY2tTdGFja1tqXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3Ryb3lQYW5lbChkZWxfdHJhY2sudWkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubV9wYWdlVHJhY2tTdGFjay5zbGljZShqLDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMubV9jdXJyZW50UGFnZSA9IHRoaXMubV9wYWdlVHJhY2tTdGFjay5wb3AoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1fY3VycmVudFBhZ2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vMiDlhYjmiorlvZPliY1QYWdl5YWl5qCIXHJcbiAgICAgICAgaWYodGhpcy5tX2N1cnJlbnRQYWdlICE9IHVuZGVmaW5lZCAmJiB0aGlzLm1fY3VycmVudFBhZ2UubmFtZSE9bmFtZSl7XHJcbiAgICAgICAgICAgIHRoaXMubV9wYWdlVHJhY2tTdGFjay5wdXNoKHRoaXMubV9jdXJyZW50UGFnZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+WwhuagiOS4reWFtuWug1BhZ2Ug6K6+5Li65LiN5Y+v6KeBXHJcbiAgICAgICAgZm9yKGxldCB0cmFjayBvZiB0aGlzLm1fcGFnZVRyYWNrU3RhY2spe1xyXG4gICAgICAgICAgICB0cmFjay51aS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhd2FpdCB0aGlzLm9wZW5QYWdlV29ya2VyKHBrZywgbmFtZSwgYXJnKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy/ov5Tlm57kuIrkuIDkuKrpobXpnaJcclxuICAgIHB1YmxpYyBhc3luYyBnb0JhY2tQYWdlKCl7XHJcblxyXG4gICAgICAgIGlmKHRoaXMubV9wYWdlVHJhY2tTdGFjay5sZW5ndGggPiAwKXtcclxuXHJcbiAgICAgICAgICAgIC8v5YWz6Zet5b2T5YmN6aG16Z2iXHJcbiAgICAgICAgICAgIHRoaXMuZGlzdHJveUFsbExvYWRlZFBhbmVsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzdHJveVBhbmVsKHRoaXMubV9jdXJyZW50UGFnZS51aSk7XHJcblxyXG4gICAgICAgICAgICAvL+aJk+W8gOWghuagiOS4reeahOS4iuS4gOmhtemdolxyXG4gICAgICAgICAgICBsZXQgdHJhY2sgPSB0aGlzLm1fcGFnZVRyYWNrU3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgIHRyYWNrLnVpLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1fY3VycmVudFBhZ2UgPSB0cmFjaztcclxuXHJcbiAgICAgICAgICAgIHRyYWNrLnVpLm9uU2hvdyh0cmFjay5hcmcpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmVudGVyTWFpblBhZ2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvL+WbnuWIsOS4u+WfjlxyXG4gICAgcHVibGljIGVudGVyTWFpblBhZ2UoKTp2b2lke1xyXG5cclxuICAgICAgICAgLy/lsIbmoIjkuK3lhbblroNQYWdlIOiuvuS4uuS4jeWPr+ingVxyXG4gICAgICAgICBmb3IobGV0IHRyYWNrIG9mIHRoaXMubV9wYWdlVHJhY2tTdGFjayl7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzdHJveVBhbmVsKHRyYWNrLnVpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tX3BhZ2VUcmFja1N0YWNrLmxlbmd0aCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09VUlMb2FkaW5nXHJcbiAgICAvL+aJk+W8gExvYWRpbmfnlYzpnaJcclxuICAgIHB1YmxpYyBhc3luYyBvcGVuTG9hZGluZyhwa2c6c3RyaW5nLCBuYW1lOnN0cmluZywgYXJnPzphbnkpe1xyXG4gICAgICAgIGlmKCF0aGlzLm1fbG9hZGluZ1BhZ2Upe1xyXG4gICAgICAgICAgICB0aGlzLm1fbG9hZGluZ1BhZ2UgPSBVSUZhY3RvcnkuY3JlYXRlVUkocGtnLCBuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgKHRoaXMubV9sb2FkaW5nUGFnZSBhcyBhbnkpLl9pbnRlcm5hbE9wZW4oYXJnKTtcclxuICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8v5YWz6ZetTG9hZGluZ+eVjOmdolxyXG4gICAgcHVibGljIGNsb3NlTG9hZGluZyhhcmc/OmFueSk6dm9pZHtcclxuICAgICAgICBpZih0aGlzLm1fbG9hZGluZ1BhZ2Upe1xyXG4gICAgICAgICAgICB0aGlzLm1fbG9hZGluZ1BhZ2UuY2xvc2UoYXJnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09VUlXaW5kb3dcclxuICAgIC8v5omT5byA56qX5Y+jXHJcbiAgICBwdWJsaWMgYXN5bmMgb3BlbldpbmRvdyhwa2c6c3RyaW5nLCBuYW1lOnN0cmluZywgYXJnPzphbnkpe1xyXG5cclxuICAgICAgICBsZXQgdWk6VUlXaW5kb3cgPSBhd2FpdCB0aGlzLm9wZW4ocGtnLCBuYW1lLCBhcmcpO1xyXG5cclxuICAgICAgICByZXR1cm4gdWk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lhbPpl63nqpflj6NcclxuICAgIHB1YmxpYyBjbG9zZVdpbmRvdyhuYW1lOnN0cmluZywgYXJnOmFueSl7XHJcblxyXG4gICAgICAgIGxldCB1aTpVSVdpbmRvdyA9IHRoaXMuZ2V0UGFuZWxVSShuYW1lKSBhcyBVSVdpbmRvdztcclxuICAgICAgICBpZih1aSAhPSBudWxsKXtcclxuICAgICAgICAgICAgdWkuY2xvc2UoYXJnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09VUlXaWRnZXRcclxuICAgIC8v5omT5byAV2lkaWdldFxyXG4gICAgcHVibGljIGFzeW5jIG9wZW5XaWRnZXQocGtnOnN0cmluZywgbmFtZTpzdHJpbmcsIGFyZzphbnkpe1xyXG5cclxuICAgICAgICBsZXQgdWk6VUlXaWRnZSA9IGF3YWl0IHRoaXMub3Blbihwa2csIG5hbWUsIGFyZyk7XHJcblxyXG4gICAgICAgIHJldHVybiB1aTtcclxuICAgIH1cclxuXHJcbiAgICAvL3XlhbPpl61XaWRpZ2V0XHJcbiAgICBwdWJsaWMgY2xvc2VXaWRnZXQobmFtZTpzdHJpbmcsIGFyZzphbnkpe1xyXG5cclxuICAgICAgICBsZXQgdWk6VUlXaWRnZSA9IHRoaXMuZ2V0UGFuZWxVSShuYW1lKSBhcyBVSVdpZGdlO1xyXG4gICAgICAgIGlmKHVpIT1udWxsKXtcclxuICAgICAgICAgICAgdWkuY2xvc2UoYXJnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsb3NlQWxsUGFuZWxzKCl7XHJcbiAgICAgICAgLy/liKDpmaTpmaRMb2FkaW5n55WM6Z2i5aSW55qE5omA5pyJV2luZG93LCBXaWRnZXRcclxuICAgICAgICB0aGlzLmRpc3Ryb3lBbGxMb2FkZWRQYW5lbCgpO1xyXG4gICAgICAgIC8v5Yig6Zmk5omA5pyJUGFnZVxyXG4gICAgICAgIGxldCBsZW4gPSB0aGlzLm1fcGFnZVRyYWNrU3RhY2subGVuZ3RoO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IGxlbi0xOyBpID49IDAgO2ktLSl7XHJcbiAgICAgICAgICAgIGxldCB0cmFjayA9IHRoaXMubV9wYWdlVHJhY2tTdGFja1tpXTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuZGlzdHJveVBhbmVsKHRyYWNrLnVpKTtcclxuICAgICAgICAgICAgdGhpcy5tX3BhZ2VUcmFja1N0YWNrLnNsaWNlKGksMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgVUlQYW5lbCB9IGZyb20gXCIuL1VJUGFuZWxcIjtcclxuaW1wb3J0IHsgVUlUeXBlRGVmLCBVSUNvbURlZnMgfSBmcm9tIFwiLi9VSURlZmluZVwiO1xyXG5pbXBvcnQgeyBGYWlyeUdVSSB9IGZyb20gXCJjc2hhcnBcIjtcclxuaW1wb3J0IHsgUyB9IGZyb20gXCIuLi8uLi9nbG9iYWwvR2FtZUNvbmZpZ1wiO1xyXG5cclxuXHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVUlQYWdlIGV4dGVuZHMgVUlQYW5lbHtcclxuICAgIHB1YmxpYyBnZXQgdWlUeXBlKCk6IFVJVHlwZURlZiB7ICAgIFxyXG4gICAgICAgIHJldHVybiBVSVR5cGVEZWYuUGFnZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1fYnRuR29CYWNrOkZhaXJ5R1VJLkdCdXR0b247XHJcblxyXG5cclxuICAgIHB1YmxpYyBvbkF3YWtlKCk6dm9pZHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLm1fYnRuR29CYWNrID0gdGhpcy5mdWkuR2V0Q2hpbGQoVUlDb21EZWZzLkJhY2tCdG4pO1xyXG5cclxuICAgICAgICBpZih0aGlzLm1fYnRuR29CYWNrIT11bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLm1fYnRuR29CYWNrLm9uQ2xpY2suQWRkKCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQnRuR29CYWNrKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIG9uU2hvdyh2bzphbnkpOnZvaWR7XHJcblxyXG4gICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ2xvc2UoYXJnOmFueSk6dm9pZHtcclxuICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkJ0bkdvQmFjaygpe1xyXG4gICAgICAgIFMuVUlNYW5hZ2VyLmdvQmFja1BhZ2UoKTtcclxuICAgIH1cclxuXHJcbn0gIiwiaW1wb3J0IHsgVUlUeXBlRGVmLCBVSUxheWVyRGVmIH0gZnJvbSBcIi4vVUlEZWZpbmVcIjtcclxuaW1wb3J0IHsgRmFpcnlHVUkgfSBmcm9tIFwiY3NoYXJwXCI7XHJcbmltcG9ydCB7IFMgfSBmcm9tIFwiLi4vLi4vZ2xvYmFsL0dhbWVDb25maWdcIjtcclxuaW1wb3J0IHsgVUlCYXNlIH0gZnJvbSBcIi4vVUlCYXNlXCI7XHJcbmltcG9ydCB7IFVJQ29tcG9uZW50IH0gZnJvbSBcIi4vVUlDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTGlzdCB9IGZyb20gXCIuLi9jb21tb24vTGlzdFwiO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFVJUGFuZWwgZXh0ZW5kcyBVSUJhc2Uge1xyXG5cclxuICAgIHB1YmxpYyBwa2dOYW1lOnN0cmluZztcclxuICAgIHByaXZhdGUgX25hbWU6c3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfdGltZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfY29tcG9uZW50czpMaXN0PHN0cmluZz4gPSBuZXcgTGlzdCgpO1xyXG4gICAgcHJpdmF0ZSBfdWlDb21wb25lbnRzOkxpc3Q8VUlDb21wb25lbnQ+PW5ldyBMaXN0KCk7XHJcblxyXG5cclxuICAgIHB1YmxpYyBzZXQgbmFtZSh2OnN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IHY7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB1aVR5cGUoKTogVUlUeXBlRGVmIHsgICAgXHJcbiAgICAgICAgcmV0dXJuIFVJVHlwZURlZi5Vbmtvd247XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgbV9sYXllcjpVSUxheWVyRGVmID0gVUlMYXllckRlZi5Vbmtvd247XHJcbiAgICBwdWJsaWMgZ2V0IGxheWVyKCkgOiBVSUxheWVyRGVmIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX2xheWVyOyBcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgbGF5ZXIodiA6IFVJTGF5ZXJEZWYpIHtcclxuICAgICAgICB0aGlzLm1fbGF5ZXIgPSB2O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgIGdldCBpc09wZW4oKSA6IGJvb2xlYW57XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmZ1aS52aXNpYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgdmlzaWJsZShpc0FjdGl2YXRlOmJvb2xlYW4pe1xyXG5cclxuICAgICAgICB0aGlzLmZ1aS52aXNpYmxlID0gaXNBY3RpdmF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3Qgb25Bd2FrZSgpOnZvaWQ7XHJcbiAgICBwdWJsaWMgYWJzdHJhY3Qgb25TaG93KHZvPzphbnkpOnZvaWQ7XHJcbiAgICBwdWJsaWMgYWJzdHJhY3Qgb25DbG9zZShhcmc/OmFueSk6dm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFVuaXR55Lit55qEVXBkYXRl5pa55rOVXHJcbiAgICAgKiBAcGFyYW0gZGVsdGEg5q+P5bin6Iqx55qE5pe26Ze0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvblVwZGF0ZShkZWx0YT86bnVtYmVyKTp2b2lke1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25EaXNwb3NlKCl7fTtcclxuXHJcbiAgICBwdWJsaWMgYXdha2UoKTp2b2lke1xyXG4gICAgICAgIHRoaXMub25Bd2FrZSgpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGFydFRpbWVyKClcclxuICAgIHtcclxuICAgICAgICBpZighdGhpcy5fdGltZXIpXHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVyPXNldEludGVydmFsKHRoaXMudXBkYXRlLmJpbmQodGhpcyksMjAwKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShkZWx0YTpudW1iZXIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5vblVwZGF0ZShkZWx0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmraTnp4HmnInmlrnms5XlnKhVSSBNYW5hZ2Vy5Lit6LCD55SoIO+8jOeJueauiuiwg+eUqOOAglxyXG4gICAgICogQHBhcmFtIGFyZyBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfaW50ZXJuYWxPcGVuKGFyZzphbnkpOnZvaWR7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5sYXllciA9IFVJTGF5ZXJEZWYuZ2V0RGVmYXVsdExheWVyKHRoaXMudWlUeXBlKTtcclxuICAgICAgICBGYWlyeUdVSS5HUm9vdC5pbnN0LkFkZENoaWxkKHRoaXMuZnVpKTtcclxuXHJcbiAgICAgICAgdGhpcy5vblNob3coYXJnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgY3JlYXRlQ29tcG9uZW50PFQgZXh0ZW5kcyBVSUNvbXBvbmVudD4ocGtnOnN0cmluZywgbmFtZTpzdHJpbmcsY2xzOntuZXcoKTpUfSk6UHJvbWlzZTxUPlxyXG4gICAge1xyXG4gICAgICAgIC8v5Yqg6L2957uE5Lu2UGFja2FnZei1hOa6kFxyXG4gICAgICAgIGlmKHBrZyAhPSB0aGlzLnBrZ05hbWUgJiYgIXRoaXMuX2NvbXBvbmVudHMuY29udGFpbnMocGtnKSl7XHJcbiAgICAgICAgICAgIGF3YWl0IFMuUmVzTWFuYWdlci5sb2FkRmFpcnlHVUlQYWNrYWdlKHBrZyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudHMuYWRkKHBrZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBjb21wPW5ldyBjbHMoKTtcclxuICAgICAgICBjb21wLmNyZWF0ZVVJKHBrZyxuYW1lKTtcclxuICAgICAgICB0aGlzLl91aUNvbXBvbmVudHMuYWRkKGNvbXApO1xyXG4gICAgICAgIHJldHVybiBjb21wO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgY2xvc2UoYXJnOmFueSA9IG51bGwpOnZvaWR7XHJcblxyXG4gICAgICAgIHRoaXMub25DbG9zZShhcmcpO1xyXG4gICAgICAgIEZhaXJ5R1VJLkdSb290Lmluc3QuUmVtb3ZlQ2hpbGQodGhpcy5mdWkpO1xyXG4gICAgICAgIGlmKHRoaXMuX3RpbWVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl90aW1lcik7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVyPW51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCk6dm9pZHtcclxuXHJcbiAgICAgICAgLy/ljbjovb3nu4Tku7ZQYWNrYWdlXHJcbiAgICAgICAgdGhpcy5fY29tcG9uZW50cy5mb3JlYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICBTLlJlc01hbmFnZXIucmVsZWFzZUZhaXJ5R1VJUGFja2FnZShlbGVtZW50KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl91aUNvbXBvbmVudHMuZm9yRWFjaChlbGVtZW50PT57XHJcbiAgICAgICAgICAgICBlbGVtZW50Lm9uQ2xvc2UoKTtcclxuICAgICAgICAgICAgIGlmKGVsZW1lbnQucGFyZW50IT11bmRlZmluZWQgJiYgZWxlbWVudC5wYXJlbnQhPW51bGwpXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnBhcmVudC5SZW1vdmVDaGlsZChlbGVtZW50LmZ1aSk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBlbGVtZW50LmZ1aS5EaXNwb3NlKCk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdGhpcy5fY29tcG9uZW50cy5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuX3VpQ29tcG9uZW50cy5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuZnVpLkRpc3Bvc2UoKTtcclxuICAgICAgICB0aGlzLm9uRGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgVUlNZXNzYWdle1xyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIE1TR19TRUxFQ1RfU0VSVkVSOm51bWJlciAgPSAxMDAwO1xyXG4gICAgcHVibGljIHN0YXRpYyBNU0dfU0NFTkVfUFJPR1JFU1M6bnVtYmVyID0gMTAwMTtcclxuICAgIFxyXG5cclxuXHJcbn0iLCJpbXBvcnQgeyBNZXNzZW5nZXIgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2NvbW1vbi9NZXNzZW5nZXJcIjtcclxuaW1wb3J0IHsgU2luZ2xldG9uIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9jb21tb24vU2luZ2xldG9uXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFVJTWVzc2FnZU1hbmdlciBleHRlbmRzIFNpbmdsZXRvbjxVSU1lc3NhZ2VNYW5nZXI+e1xyXG5cclxuICAgIHByaXZhdGUgdWlNZXNzYWdlOk1lc3NlbmdlciA9IG5ldyBNZXNzZW5nZXIoKTtcclxuXHJcblxyXG4gICAgcHVibGljIGFkZExpc3RlbmVyKG1zZ0NvZGU6bnVtYmVyLG9iajphbnksIGxpc3RlbmVyOkZ1bmN0aW9uKXtcclxuXHJcbiAgICAgICAgdGhpcy51aU1lc3NhZ2UuYWRkTGlzdGVuZXIobXNnQ29kZSwgb2JqLCBsaXN0ZW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUxpc3RlbmVyKG1zZ0NvZGU6bnVtYmVyLCBsaXN0ZW5lcjpGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy51aU1lc3NhZ2UucmVtb3ZlTGlzdGVuZXIobXNnQ29kZSwgbGlzdGVuZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVMaXN0ZW5lckJ5Q29kZShtc2dDb2RlOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy51aU1lc3NhZ2UucmVtb3ZlTGlzdGVuZXJCeVR5cGUobXNnQ29kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFydXAoKXtcclxuICAgICAgICB0aGlzLnVpTWVzc2FnZS5jbGVhcnVwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGJyb2FkY2FzdChtc2dDb2RlOm51bWJlcixwYXJhbXM6YW55KXtcclxuXHJcblxyXG4gICAgICAgIHRoaXMudWlNZXNzYWdlLmJyb2FkY2FzdChtc2dDb2RlLCBwYXJhbXMpXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBVSVBhZ2UgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL3VpL1VJUGFnZVwiO1xyXG5pbXBvcnQgeyBiaW5kZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2NvbW1vbi9OaWNlRGVjb3JhdG9yXCI7XHJcbmltcG9ydCB7IEZhaXJ5R1VJLCBVbml0eUVuZ2luZSB9IGZyb20gXCJjc2hhcnBcIjtcclxuaW1wb3J0IHsgVm9PdmVyV2luZG93IH0gZnJvbSBcIi4uLy4uL2dhbWVzdGFydC92by9Wb092ZXJXaW5kb3dcIjtcclxuXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFVJRmx5QmlyZE92ZXJXaW5kb3cgZXh0ZW5kcyBVSVBhZ2V7XHJcblxyXG4gICAgQGJpbmRlcihcImxvYWRfbWVkYWxcIilcclxuICAgIHB1YmxpYyBsb2FkX21lZGFsOkZhaXJ5R1VJLkdMb2FkZXI7XHJcblxyXG4gICAgQGJpbmRlcihcInR4dF9TY29yZVwiKVxyXG4gICAgcHVibGljIHR4dF9TY29yZTpGYWlyeUdVSS5HTGFiZWw7XHJcblxyXG4gICAgQGJpbmRlcihcInR4dF9CZXN0U2NvcmVcIilcclxuICAgIHB1YmxpYyB0eHRfQmVzdFNjb3JlOkZhaXJ5R1VJLkdMYWJlbDtcclxuXHJcbiAgICBAYmluZGVyKFwiYnRuX3JlU3RhcnRcIilcclxuICAgIHB1YmxpYyBidG5fcmVTdGFydDpGYWlyeUdVSS5HQnV0dG9uO1xyXG5cclxuICAgIHB1YmxpYyBvbkF3YWtlKCk6dm9pZHtcclxuICAgICAgICBzdXBlci5vbkF3YWtlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU2hvdyh2bzpWb092ZXJXaW5kb3cpOnZvaWR7XHJcbiAgICAgICAgc3VwZXIub25TaG93KHZvKTtcclxuXHJcblxyXG4gICAgfVxyXG4gICAgcHVibGljIG9uQ2xvc2UoYXJnOmFueSk6dm9pZHtcclxuICAgICAgICBzdXBlci5vbkNsb3NlKGFyZyk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYXN5bmMgY2xpY2tfYnRuX3N0YXJ0KCl7XHJcbiAgICB9XHJcblxyXG59IiwiLy8gaW1wb3J0IHsgaG9tZVVJIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2RhdGEvdWkvaG9tZVwiO1xyXG5pbXBvcnQgeyBGbHlCaXJkVUkgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZGF0YS91aS9GbHlCaXJkXCI7XHJcbmltcG9ydCB7IEJhc2VTY2VuZSB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvc2NlbmUvQmFzZVNjZW5lXCI7XHJcbmltcG9ydCB7IFMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZ2xvYmFsL0dhbWVDb25maWdcIjtcclxuaW1wb3J0IHsgVm9Ib21lIH0gZnJvbSBcIi4uLy4uL2hvbWUvdm8vVm9Ib21lXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEZseUJpcmRTY2VuZSBleHRlbmRzIEJhc2VTY2VuZXtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uRW50ZXIoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNvbXBsZXRlKCkge1xyXG5cclxuICAgICAgICBsZXQgdm86Vm9Ib21lID0gbmV3IFZvSG9tZSgpO1xyXG4gICAgICAgIHZvLm5hbWUgPSBcIkp1c3RpblwiO1xyXG4gICAgICAgIHZvLmhwID0gMTIwMDtcclxuICAgICAgICB2by5tcCA9IDMzMDA7XHJcbiAgICAgICAgdm8ubW9uZXkgPSA2NjY7XHJcblxyXG4gICAgICAgIFMuVUlNYW5hZ2VyLm9wZW5QYWdlSW5TY2VuZShcclxuICAgICAgICAgICAgRmx5QmlyZFVJLlBhY2thZ2VOYW1lLFxyXG4gICAgICAgICAgICBGbHlCaXJkVUkuVUlNYWluVklldyxcclxuICAgICAgICAgICAgdm8pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkxlYXZlKCkge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuXHJcblxyXG59IiwiaW1wb3J0IHsgVUlQYWdlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1ld29yay91aS9VSVBhZ2VcIjtcclxuaW1wb3J0IHsgYmluZGVyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1ld29yay9jb21tb24vTmljZURlY29yYXRvclwiO1xyXG5pbXBvcnQgeyBGYWlyeUdVSSwgVW5pdHlFbmdpbmUgfSBmcm9tIFwiY3NoYXJwXCI7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvbG9nZ2VyL0xvZ2dlclwiO1xyXG5pbXBvcnQgeyBTIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2dsb2JhbC9HYW1lQ29uZmlnXCI7XHJcbmltcG9ydCB7IEZseUJpcmRVSSB9IGZyb20gXCIuLi8uLi8uLi8uLi9kYXRhL3VpL0ZseUJpcmRcIjtcclxuaW1wb3J0IHsgVm9PdmVyV2luZG93IH0gZnJvbSBcIi4uLy4uL2dhbWVzdGFydC92by9Wb092ZXJXaW5kb3dcIjtcclxuaW1wb3J0IHsgTGlzdCB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvY29tbW9uL0xpc3RcIjtcclxuXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFVJRmx5QmlyZE1haW5WaWV3IGV4dGVuZHMgVUlQYWdle1xyXG5cclxuICAgIEBiaW5kZXIoXCJsaXN0X2JnXCIpXHJcbiAgICBwdWJsaWMgbGlzdF9iZzpGYWlyeUdVSS5HTGlzdDtcclxuXHJcbiAgICBAYmluZGVyKFwibGlzdF9ncm91bmRcIilcclxuICAgIHB1YmxpYyBsaXN0X2dyb3VuZDpGYWlyeUdVSS5HTGlzdDtcclxuXHJcbiAgICBAYmluZGVyKFwiYnRuX3N0YXJ0XCIpXHJcbiAgICBwdWJsaWMgYnRuX3N0YXJ0OkZhaXJ5R1VJLkdCdXR0b247XHJcblxyXG4gICAgQGJpbmRlcihcInR4dF9TY29yZVwiKVxyXG4gICAgcHVibGljIHR4dF9TY29yZTpGYWlyeUdVSS5HTGFiZWw7XHJcblxyXG4gICAgQGJpbmRlcihcInN0YXJ0UGFuZWxcIilcclxuICAgIHB1YmxpYyBzdGFydFBhbmVsOkZhaXJ5R1VJLkdDb21wb25lbnQ7XHJcbiAgICBcclxuICAgIEBiaW5kZXIoXCJhbmltX2JpcmRcIilcclxuICAgIHB1YmxpYyBiaXJkOkZhaXJ5R1VJLkdNb3ZpZUNsaXA7XHJcblxyXG4gICAgcHJpdmF0ZSBjdXJQaXBlczpMaXN0PEZhaXJ5R1VJLkdDb21wb25lbnQ+ID0gbmV3IExpc3Q8RmFpcnlHVUkuR0NvbXBvbmVudD4oKVxyXG4gICAgcHJpdmF0ZSBuZWVkRGVzdG9yeTpMaXN0PEZhaXJ5R1VJLkdDb21wb25lbnQ+ID0gbmV3IExpc3Q8RmFpcnlHVUkuR0NvbXBvbmVudD4oKVxyXG5cclxuICAgIC8qKuWcsOadv+mAn+W6piAqL1xyXG4gICAgcHJpdmF0ZSBncm91bmRTcGVlZDpudW1iZXIgPSAyMztcclxuICAgIFxyXG4gICAgLyoq6IOM5pmv6YCf5bqm6YCf5bqmICovXHJcbiAgICBwcml2YXRlIHNreVNwZWVkOm51bWJlciA9IDE4O1xyXG5cclxuICAgIC8qKua4uOaIj+aYr+WQpuW8gOWniyAqL1xyXG4gICAgcHJpdmF0ZSBpc1N0YXJ0OmJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAvKirngrnlh7vlkI7lvLnotbfml7bpl7QgKi9cclxuICAgIHByaXZhdGUgdXBUaW1lOm51bWJlciA9IDAuMztcclxuXHJcbiAgICAvKirngrnlh7vlkI7lvLnotbfpgJ/luqYgKi9cclxuICAgIHByaXZhdGUgdXBTcGVlZDpudW1iZXIgPSAtMTAwMDtcclxuXHJcbiAgICAvKirkuIvokL3pgJ/luqYgKi9cclxuICAgIHByaXZhdGUgZG93blNwZWVkOm51bWJlciA9IDcwO1xyXG5cclxuICAgIC8qKum4n+eahOeisOaSnui3neemuyAqL1xyXG4gICAgcHJpdmF0ZSBjYXJzaERpczpudW1iZXIgPSAzMDtcclxuXHJcbiAgICAvKirlvpfliIYgKi9cclxuICAgIHByaXZhdGUgc2NvcmU6bnVtYmVyID0gMzA7XHJcblxyXG4gICAgLyoq5rC0566h5Yib5bu66Ze06ZqUICovXHJcbiAgICBwcml2YXRlIHBpcGVJbnRlcnZhbFRpbWU6bnVtYmVyID0gMztcclxuXHJcbiAgICAvKirmsLTnrqHml7bpl7QgKi9cclxuICAgIHByaXZhdGUgcGlwZVRpbWU6bnVtYmVyID0gMDtcclxuXHJcbiAgICAvKirmsLTnrqHpgJ/luqYgKi9cclxuICAgIHByaXZhdGUgcGlwZVNwZWVkOm51bWJlciA9IDMwMDtcclxuXHJcbiAgICAvKirlsI/puJ/nirbmgIEgKi9cclxuICAgIHByaXZhdGUgaXNVcDpib29sZWFuID0gZmFsc2U7XHJcbiAgICBcclxuICAgIHB1YmxpYyBvblVwZGF0ZShkdDpudW1iZXIpOnZvaWR7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coZHQpXHJcblxyXG4gICAgICAgIGlmICh0aGlzLmJpcmQgJiYgdGhpcy5pc1N0YXJ0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5saXN0X2dyb3VuZC5zY3JvbGxQYW5lLnBvc1ggPSB0aGlzLmxpc3RfZ3JvdW5kLnNjcm9sbFBhbmUucG9zWCArIGR0KnRoaXMuZ3JvdW5kU3BlZWRcclxuICAgICAgICAgICAgdGhpcy5saXN0X2JnLnNjcm9sbFBhbmUucG9zWCA9IHRoaXMubGlzdF9iZy5zY3JvbGxQYW5lLnBvc1ggKyBkdCp0aGlzLnNreVNwZWVkXHJcbiAgICAgICAgICAgIHRoaXMuYmlyZC55ID0gTWF0aC5taW4oOTMwLHRoaXMuYmlyZC55Kyh0aGlzLmlzVXA/dGhpcy51cFNwZWVkOnRoaXMuZG93blNwZWVkKSpkdClcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIOWwj+m4n+eisOaSnuWcsOmdolxyXG4gICAgICAgICAgICBpZiAodGhpcy5iaXJkLnkgPCAtNjAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkdhbWVPdmVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIOWIoOmZpOWxj+W5leWklueahOawtOeuoVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubmVlZERlc3RvcnkuY291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJQaXBlcy5yZW1vdmUodGhpcy5uZWVkRGVzdG9yeVtpXSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5lZWREZXN0b3J5W2ldLkRpc3Bvc2UoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubmVlZERlc3RvcnkuY2xlYXIoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIOawtOeuoeeahOenu+WKqFxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY3VyUGlwZXMuY291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuY3VyUGlwZXNbaV07XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnggPSBlbGVtZW50LnggLSBkdCp0aGlzLnBpcGVTcGVlZFxyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQueCA8PSAtNzAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZWVkRGVzdG9yeS5hZGQodGhpcy5jdXJQaXBlc1tpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAvLyDmo4DmtYvlsI/puJ/mmK/lkKbnorDmkp7msLTnrqFcclxuICAgICAgICAgICAgICAgIC8vIGlmIChpc0NyYXNoKGJpcmQsY3VyUGlwZXNbaV0pKVxyXG4gICAgICAgICAgICAgICAgLy8ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIEdhbWVPdmVyKCk7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMucGlwZVRpbWUgKz0gZHQ7XHJcbiAgICAgICAgICAgIC8vIOawtOeuoeWumuaXtuWIm+W7ulxyXG4gICAgICAgICAgICBpZiAodGhpcy5waXBlVGltZSA+PSB0aGlzLnBpcGVJbnRlcnZhbFRpbWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGlwZVRpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVQaXBlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQXdha2UoKTp2b2lke1xyXG4gICAgICAgIHN1cGVyLm9uQXdha2UoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuW8gOWni+eVjOmdojNcIilcclxuICAgICAgICB0aGlzLmxpc3RfYmcuU2V0VmlydHVhbEFuZExvb3AoKTtcclxuICAgICAgICB0aGlzLmxpc3RfYmcuaXRlbVJlbmRlcmVyID0gKGluZGV4Om51bWJlciwgb2JqOkZhaXJ5R1VJLkdPYmplY3QpPT57XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmxpc3RfYmcubnVtSXRlbXMgPSAzO1xyXG5cclxuICAgICAgICB0aGlzLmxpc3RfZ3JvdW5kLlNldFZpcnR1YWxBbmRMb29wKCk7XHJcbiAgICAgICAgdGhpcy5saXN0X2dyb3VuZC5pdGVtUmVuZGVyZXIgPSAoaW5kZXg6bnVtYmVyLCBvYmo6RmFpcnlHVUkuR09iamVjdCk9PntcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMubGlzdF9ncm91bmQubnVtSXRlbXMgPSAzO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy50eHRfU2NvcmUudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYnRuX3N0YXJ0Lm9uQ2xpY2suU2V0KCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMub25DbGlja1N0YXJ0KClcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMubGlzdF9iZy5vbkNsaWNrLlNldCgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmlzVXAgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgdGltZXJyID0gMDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIHRoaXMuYmlyZC50cmFuc2Zvcm0uRE9Sb3RhdGUobmV3IFZlY3RvcjMoMCwwLDMwKSwwLjJmKTtcclxuICAgICAgICAgICAgLy8gdC5LaWxsKCk7XHJcbiAgICAgICAgICAgIC8vIHQgPSBET1R3ZWVuLlRvKCgpID0+IHRpbWVyciwgeCA9PiB0aW1lcnIgPSB4LCAxLCB0aGlzLnVwVGltZSkuT25TdGVwQ29tcGxldGUoKCk9PntcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuaXNVcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5iaXJkLnRyYW5zZm9ybS5ET1JvdGF0ZShuZXcgVmVjdG9yMygwLDAsLTMwKSwwLjJmKTtcclxuICAgICAgICAgICAgLy8gfSkuU2V0TG9vcHMoMSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoq5ri45oiP5byA5aeLICovXHJcbiAgICBwcml2YXRlIEdhbWVTdGFydCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLmlzU3RhcnQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaXNVcCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudHh0X1Njb3JlLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc3RhcnRQYW5lbC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5ri45oiP57uT5p2fICovXHJcbiAgICBwcml2YXRlIEdhbWVPdmVyKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuaXNTdGFydCA9IGZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChVbml0eUVuZ2luZS5QbGF5ZXJQcmVmcy5IYXNLZXkoXCJCaXJkX0Jlc3RTY29yZVwiKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBzYXZlQmFzdFNjb3JlID0gVW5pdHlFbmdpbmUuUGxheWVyUHJlZnMuR2V0SW50KFwiQmlyZF9CZXN0U2NvcmVcIik7XHJcbiAgICAgICAgICAgIGlmIChzYXZlQmFzdFNjb3JlIDwgdGhpcy5zY29yZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVW5pdHlFbmdpbmUuUGxheWVyUHJlZnMuU2V0SW50KFwiQmlyZF9CZXN0U2NvcmVcIix0aGlzLnNjb3JlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVW5pdHlFbmdpbmUuUGxheWVyUHJlZnMuU2V0SW50KFwiQmlyZF9CZXN0U2NvcmVcIix0aGlzLnNjb3JlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHZvID0gbmV3IFZvT3ZlcldpbmRvdygpIFxyXG4gICAgICAgIHZvLmJlc3RTY29yZSA9IFVuaXR5RW5naW5lLlBsYXllclByZWZzLkdldEludChcIkJpcmRfQmVzdFNjb3JlXCIpO1xyXG4gICAgICAgIHZvLnNjb3JlID0gdGhpcy5zY29yZTtcclxuXHJcbiAgICAgICAgUy5VSU1hbmFnZXIub3BlbldpbmRvdyhcclxuICAgICAgICAgICAgRmx5QmlyZFVJLlBhY2thZ2VOYW1lLFxyXG4gICAgICAgICAgICBGbHlCaXJkVUkuVUlPdmVyV2luZG93LFxyXG4gICAgICAgICAgICB2b1xyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yib5bu65rC0566hICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZVBpcGUoKTpGYWlyeUdVSS5HQ29tcG9uZW50e1xyXG4gICAgICAgIGxldCBvYmpQaXBlOkZhaXJ5R1VJLkdDb21wb25lbnQgPSBGYWlyeUdVSS5VSVBhY2thZ2UuQ3JlYXRlT2JqZWN0KEZseUJpcmRVSS5QYWNrYWdlTmFtZSxGbHlCaXJkVUkuVUlQaXBlKS5hc0NvbTtcclxuICAgICAgICB0aGlzLmN1clBpcGVzLmFkZChvYmpQaXBlKTtcclxuICAgICAgICByZXR1cm4gb2JqUGlwZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xpY2tTdGFydCgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5HYW1lU3RhcnQoKVxyXG4gICAgfVxyXG4gICAgcHVibGljIG9uU2hvdyh2byk6dm9pZHtcclxuICAgICAgICBzdXBlci5vblNob3codm8pO1xyXG5cclxuICAgICAgICAvLyB0aGlzLm1fbmFtZUxibC50ZXh0ID0gdm8ubmFtZTtcclxuICAgICAgICAvLyB0aGlzLm1fbXBMYmwudGV4dCA9IHZvLm1wLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgLy8gdGhpcy5tX2hwTGJsLnRleHQgPSB2by5ocC50b1N0cmluZygpO1xyXG4gICAgICAgIC8vIHRoaXMubV9tb25leUxibC50ZXh0ID0gdm8ubW9uZXkudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgLy8gUy5HYW1lU2Vzc2lvbi5saXN0ZW4oT3Bjb2RlLk1TR19HUzJDX1Rlc3QsZnVuY3Rpb24obXNnOm5pY2VfdHMuR1MyQ19UZXN0KXtcclxuICAgICAgICAvLyAgICAgTG9nZ2VyLmxvZyhcIuaUtuWIsOacjeWKoeWZqOS4i+WPkeeahOa2iOaBr+OAguOAguOAguOAglwiK21zZy50ZXN0UmVzcG9uc2UpXHJcbiAgICAgICAgLy8gfSlcclxuICAgIH1cclxuICAgIHB1YmxpYyBvbkNsb3NlKGFyZzphbnkpOnZvaWR7XHJcbiAgICAgICAgc3VwZXIub25DbG9zZShhcmcpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFzeW5jIGNsaWNrX2J0bl9zdGFydCgpe1xyXG4gICAgICAgIExvZ2dlci5sb2coXCJvbiBjaGF0Li4uXCIpO1xyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJpbXBvcnQgeyBHYW1lU3RhcnRVSSB9IGZyb20gXCIuLi8uLi8uLi8uLi9kYXRhL3VpL0dhbWVTdGFydFwiO1xyXG5pbXBvcnQgeyBCYXNlU2NlbmUgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL3NjZW5lL0Jhc2VTY2VuZVwiO1xyXG5pbXBvcnQgeyBTIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2dsb2JhbC9HYW1lQ29uZmlnXCI7XHJcbmltcG9ydCB7IFZvR2FtZVN0YXJ0IH0gZnJvbSBcIi4uL3ZvL1ZvR2FtZVN0YXJ0XCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEdhbWVTdGFydFNjZW5lIGV4dGVuZHMgQmFzZVNjZW5le1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uRW50ZXIoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLov5vlhaXlvIDlp4vlnLrmma9cIilcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25Db21wbGV0ZSgpIHtcclxuXHJcbiAgICAgICAgbGV0IHZvOlZvR2FtZVN0YXJ0ID0gbmV3IFZvR2FtZVN0YXJ0KCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi6L+b5YWl5byA5aeL5Zy65pmv57uT5p2fXCIpXHJcblxyXG4gICAgICAgIFMuVUlNYW5hZ2VyLm9wZW5QYWdlSW5TY2VuZShcclxuICAgICAgICAgICAgR2FtZVN0YXJ0VUkuUGFja2FnZU5hbWUsXHJcbiAgICAgICAgICAgIEdhbWVTdGFydFVJLlVJU3RhcnRWaWV3LFxyXG4gICAgICAgICAgICB2byk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uTGVhdmUoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn0iLCJpbXBvcnQgeyBVSVBhZ2UgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL3VpL1VJUGFnZVwiO1xyXG5pbXBvcnQgeyBiaW5kZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2NvbW1vbi9OaWNlRGVjb3JhdG9yXCI7XHJcbmltcG9ydCB7IEZhaXJ5R1VJIH0gZnJvbSBcImNzaGFycFwiO1xyXG5pbXBvcnQgeyBMb2dpbkFQSSB9IGZyb20gXCIuLi8uLi8uLi9hcGkvTG9naW5BUElcIjtcclxuaW1wb3J0IHsgT3Bjb2RlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2RhdGEvcGIvT3Bjb2RlXCI7XHJcbmltcG9ydCB7IG5pY2VfdHMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZGF0YS9wYi9nZW4vcGJcIjtcclxuaW1wb3J0IHsgUyB9IGZyb20gXCIuLi8uLi8uLi8uLi9nbG9iYWwvR2FtZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2xvZ2dlci9Mb2dnZXJcIjtcclxuaW1wb3J0IHsgU2NlbmVEZWYgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL3NjZW5lL1NjZW5lRGVmXCI7XHJcbmltcG9ydCB7IFZvR2FtZVN0YXJ0IH0gZnJvbSBcIi4uL3ZvL1ZvR2FtZVN0YXJ0XCI7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBVSVN0YXJ0VmlldyBleHRlbmRzIFVJUGFnZXtcclxuXHJcbiAgICBAYmluZGVyKFwiYnRuX3N0YXJ0XCIpXHJcbiAgICBwdWJsaWMgYnRuX3N0YXJ0OkZhaXJ5R1VJLkdCdXR0b247XHJcbiAgICAvLyBAYmluZGVyKFwiYmFnQnRuXCIpXHJcbiAgICAvLyBwdWJsaWMgbV9iYWdCdG46RmFpcnlHVUkuR0J1dHRvbjtcclxuICAgIC8vIEBiaW5kZXIoXCJzaG9wQnRuXCIpXHJcbiAgICAvLyBwdWJsaWMgbV9zaG9wQnRuOkZhaXJ5R1VJLkdCdXR0b247XHJcbiAgICAvLyBAYmluZGVyKFwibGV2ZWxCdG5cIilcclxuICAgIC8vIHB1YmxpYyBtX2xldmVsQnRuOkZhaXJ5R1VJLkdCdXR0b247XHJcblxyXG4gICAgLy8gQGJpbmRlcihcIm5hbWVUeHRcIilcclxuICAgIC8vIHB1YmxpYyBtX25hbWVMYmw6RmFpcnlHVUkuR0xhYmVsO1xyXG4gICAgLy8gQGJpbmRlcihcImhwVHh0XCIpXHJcbiAgICAvLyBwdWJsaWMgbV9ocExibDpGYWlyeUdVSS5HTGFiZWw7XHJcbiAgICAvLyBAYmluZGVyKFwibXBUeHRcIilcclxuICAgIC8vIHB1YmxpYyBtX21wTGJsOkZhaXJ5R1VJLkdMYWJlbDtcclxuICAgIC8vIEBiaW5kZXIoXCJtb25leVR4dFwiKVxyXG4gICAgLy8gcHVibGljIG1fbW9uZXlMYmw6RmFpcnlHVUkuR0xhYmVsO1xyXG5cclxuXHJcbiAgICBwdWJsaWMgb25Bd2FrZSgpOnZvaWR7XHJcbiAgICAgICAgc3VwZXIub25Bd2FrZSgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5byA5aeL55WM6Z2iXCIpXHJcbiAgICAgICAgdGhpcy5idG5fc3RhcnQub25DbGljay5BZGQoKCk9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCIyMzMzXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmNsaWNrX2J0bl9zdGFydCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgcHVibGljIG9uU2hvdyh2bzpWb0dhbWVTdGFydCk6dm9pZHtcclxuICAgICAgICBzdXBlci5vblNob3codm8pO1xyXG5cclxuICAgICAgICAvLyBTLkdhbWVTZXNzaW9uLmxpc3RlbihPcGNvZGUuTVNHX0dTMkNfVGVzdCxmdW5jdGlvbihtc2c6bmljZV90cy5HUzJDX1Rlc3Qpe1xyXG4gICAgICAgIC8vICAgICBMb2dnZXIubG9nKFwi5pS25Yiw5pyN5Yqh5Zmo5LiL5Y+R55qE5raI5oGv44CC44CC44CC44CCXCIrbXNnLnRlc3RSZXNwb25zZSlcclxuICAgICAgICAvLyB9KVxyXG4gICAgfVxyXG4gICAgcHVibGljIG9uQ2xvc2UoYXJnOmFueSk6dm9pZHtcclxuICAgICAgICBzdXBlci5vbkNsb3NlKGFyZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGNsaWNrX2J0bl9zdGFydCgpe1xyXG4gICAgICAgIGF3YWl0IFMuU2NlbmVNYW5hZ2VyLmxvYWRTY2VuZShTY2VuZURlZi5GbHlCaXJkKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBWb0dhbWVTdGFydHtcclxuICAgIHB1YmxpYyBuYW1lOnN0cmluZztcclxuICAgIHB1YmxpYyBocDpudW1iZXI7XHJcbiAgICBwdWJsaWMgbXA6bnVtYmVyO1xyXG4gICAgcHVibGljIG1vbmV5Om51bWJlcjtcclxufVxyXG4iLCJcclxuZXhwb3J0IGNsYXNzIFZvT3ZlcldpbmRvd3tcclxuICAgIHB1YmxpYyBzY29yZTpudW1iZXI7XHJcbiAgICBwdWJsaWMgYmVzdFNjb3JlOm51bWJlcjtcclxuICAgIHB1YmxpYyByZVN0YXJ0RnVuYzpGdW5jdGlvbjtcclxufSIsIi8vIGltcG9ydCB7IGhvbWVVSSB9IGZyb20gXCIuLi8uLi8uLi8uLi9kYXRhL3VpL2hvbWVcIjtcclxuaW1wb3J0IHsgQmFzZVNjZW5lIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1ld29yay9zY2VuZS9CYXNlU2NlbmVcIjtcclxuaW1wb3J0IHsgUyB9IGZyb20gXCIuLi8uLi8uLi8uLi9nbG9iYWwvR2FtZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBWb0hvbWUgfSBmcm9tIFwiLi4vdm8vVm9Ib21lXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEhvbWVTY2VuZSBleHRlbmRzIEJhc2VTY2VuZXtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkVudGVyKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25Db21wbGV0ZSgpIHtcclxuXHJcbiAgICAgICAgbGV0IHZvOlZvSG9tZSA9IG5ldyBWb0hvbWUoKTtcclxuICAgICAgICB2by5uYW1lID0gXCJKdXN0aW5cIjtcclxuICAgICAgICB2by5ocCA9IDEyMDA7XHJcbiAgICAgICAgdm8ubXAgPSAzMzAwO1xyXG4gICAgICAgIHZvLm1vbmV5ID0gNjY2O1xyXG5cclxuICAgICAgICAvLyBTLlVJTWFuYWdlci5vcGVuUGFnZUluU2NlbmUoXHJcbiAgICAgICAgLy8gICAgIGhvbWVVSS5QYWNrYWdlTmFtZSxcclxuICAgICAgICAvLyAgICAgaG9tZVVJLlVJSG9tZVBhZ2UsXHJcbiAgICAgICAgLy8gICAgIHZvKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25MZWF2ZSgpIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG5cclxufSIsIlxyXG5cclxuZXhwb3J0IGNsYXNzIFZvSG9tZXtcclxuXHJcbiAgICBwdWJsaWMgbmFtZTpzdHJpbmc7XHJcbiAgICBwdWJsaWMgaHA6bnVtYmVyO1xyXG4gICAgcHVibGljIG1wOm51bWJlcjtcclxuICAgIHB1YmxpYyBtb25leTpudW1iZXI7XHJcblxyXG59IiwiaW1wb3J0IHsgQmFzZVNjZW5lIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1ld29yay9zY2VuZS9CYXNlU2NlbmVcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgUHZlU2NlbmUgZXh0ZW5kcyBCYXNlU2NlbmV7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkVudGVyKCkge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgcHVibGljIG9uQ29tcGxldGUoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgb25MZWF2ZSgpIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG5cclxufSIsImltcG9ydCB7IEpzTWFuYWdlciB9IGZyb20gXCJjc2hhcnBcIjtcclxuaW1wb3J0IHsgR2FtZU9iamVjdFBvb2wgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2NvbW1vbi9HYW1lT2JqZWN0UG9vbFwiO1xyXG5pbXBvcnQgeyBSZXNNYW5hZ2VyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9jb21tb24vUmVzTWFuYWdlclwiO1xyXG4vLyBpbXBvcnQgeyBTdG9yeU1hbmFnZXIgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2luay9TdG9yeU1hbmFnZXJcIjtcclxuLy8gaW1wb3J0IHsgU3RvcnlNZXNzYWdlTWFuYWdlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvaW5rL1N0b3J5TWVzc2FnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgR2FtZVNlc3Npb24gfSBmcm9tIFwiLi4vZnJhbWV3b3JrL25ldC9HYW1lU2Vzc2lvblwiO1xyXG5pbXBvcnQgeyBIdHRwTWFuYWdlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvbmV0L0h0dHBNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNlc3Npb25NYW5hZ2VyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9uZXQvU2Vzc2lvbk1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU2NlbmVNYW5hZ2VyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9zY2VuZS9TY2VuZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgVUlNYW5hZ2VyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay91aS9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgVUlNZXNzYWdlTWFuZ2VyIH0gZnJvbSBcIi4uL2dhbWUvZXZlbnQvVUlNZXNzYWdlTWFuYWdlclwiO1xyXG5cclxuZXhwb3J0ICBjbGFzcyBHYW1lQ29uZmlne1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZGVidWc6Ym9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZWFsbVNlcnZlcklQOnN0cmluZyA9IFwiMTI3LjAuMC4xXCI7IFxyXG4gICAgcHVibGljIHN0YXRpYyByZWFsbVNlcnZlclBvcnQ6bnVtYmVyID0gOTAwMTtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTe1xyXG4gICAgcHVibGljIHN0YXRpYyBVSU1hbmFnZXIgPSBVSU1hbmFnZXIuSW5zdGFuY2UoVUlNYW5hZ2VyKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgVUlNZXNzYWdlTWFuZ2VyID0gVUlNZXNzYWdlTWFuZ2VyLkluc3RhbmNlKFVJTWVzc2FnZU1hbmdlcik7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNjZW5lTWFuYWdlciA9IFNjZW5lTWFuYWdlci5JbnN0YW5jZShTY2VuZU1hbmFnZXIpO1xyXG4gICAgcHVibGljIHN0YXRpYyBHYW1lT2JqZWN0UG9vbCA9IEdhbWVPYmplY3RQb29sLkluc3RhbmNlKEdhbWVPYmplY3RQb29sKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgUmVzTWFuYWdlciA9IFJlc01hbmFnZXIuSW5zdGFuY2UoUmVzTWFuYWdlcik7XHJcbiAgICAvLyBwdWJsaWMgc3RhdGljIFN0b3J5TWFuYWdlciA9IFN0b3J5TWFuYWdlci5JbnN0YW5jZShTdG9yeU1hbmFnZXIpO1xyXG4gICAgcHVibGljIHN0YXRpYyBTZXNzaW9uTWFuYWdlciA9IFNlc3Npb25NYW5hZ2VyLkluc3RhbmNlKFNlc3Npb25NYW5hZ2VyKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgR2FtZVNlc3Npb24gPSBHYW1lU2Vzc2lvbi5JbnN0YW5jZShHYW1lU2Vzc2lvbik7XHJcbiAgICAvLyBwdWJsaWMgc3RhdGljIFN0b3J5TWVzc2FnZU1hbmFnZXIgPSBTdG9yeU1lc3NhZ2VNYW5hZ2VyLkluc3RhbmNlKFN0b3J5TWVzc2FnZU1hbmFnZXIpO1xyXG4gICAgcHVibGljIHN0YXRpYyBIdHRwTWFuYWdlciA9IEh0dHBNYW5hZ2VyLkluc3RhbmNlKEh0dHBNYW5hZ2VyKTtcclxufVxyXG4iLCIvKmVzbGludC1kaXNhYmxlIGJsb2NrLXNjb3BlZC12YXIsIGlkLWxlbmd0aCwgbm8tY29udHJvbC1yZWdleCwgbm8tbWFnaWMtbnVtYmVycywgbm8tcHJvdG90eXBlLWJ1aWx0aW5zLCBuby1yZWRlY2xhcmUsIG5vLXNoYWRvdywgbm8tdmFyLCBzb3J0LXZhcnMqL1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciAkcHJvdG9idWYgPSByZXF1aXJlKFwicHJvdG9idWZqcy9taW5pbWFsXCIpO1xyXG5cclxuLy8gQ29tbW9uIGFsaWFzZXNcclxudmFyICRSZWFkZXIgPSAkcHJvdG9idWYuUmVhZGVyLCAkV3JpdGVyID0gJHByb3RvYnVmLldyaXRlciwgJHV0aWwgPSAkcHJvdG9idWYudXRpbDtcclxuXHJcbnZhciBMb25nID0gcmVxdWlyZShcImxvbmdcIik7XHJcbiRwcm90b2J1Zi51dGlsLkxvbmcgPSBMb25nO1xyXG4kcHJvdG9idWYuY29uZmlndXJlKCk7XHJcblxyXG5cclxuLy8gRXhwb3J0ZWQgcm9vdCBuYW1lc3BhY2VcclxudmFyICRyb290ID0gJHByb3RvYnVmLnJvb3RzW1wiZGVmYXVsdFwiXSB8fCAoJHByb3RvYnVmLnJvb3RzW1wiZGVmYXVsdFwiXSA9IHt9KTtcclxuXHJcbiRyb290Lm5pY2VfdHMgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOYW1lc3BhY2UgbmljZV90cy5cclxuICAgICAqIEBleHBvcnRzIG5pY2VfdHNcclxuICAgICAqIEBuYW1lc3BhY2VcclxuICAgICAqL1xyXG4gICAgdmFyIG5pY2VfdHMgPSB7fTtcclxuXHJcbiAgICBuaWNlX3RzLkMyUl9Mb2dpbiA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJvcGVydGllcyBvZiBhIEMyUl9Mb2dpbi5cclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90c1xyXG4gICAgICAgICAqIEBpbnRlcmZhY2UgSUMyUl9Mb2dpblxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfG51bGx9IFtBY2NvdW50XSBDMlJfTG9naW4gQWNjb3VudFxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfG51bGx9IFtQYXNzd29yZF0gQzJSX0xvZ2luIFBhc3N3b3JkXHJcbiAgICAgICAgICovXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnN0cnVjdHMgYSBuZXcgQzJSX0xvZ2luLlxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzXHJcbiAgICAgICAgICogQGNsYXNzZGVzYyBSZXByZXNlbnRzIGEgQzJSX0xvZ2luLlxyXG4gICAgICAgICAqIEBpbXBsZW1lbnRzIElDMlJfTG9naW5cclxuICAgICAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSUMyUl9Mb2dpbj19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIEMyUl9Mb2dpbihwcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzKVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXNba2V5c1tpXV0gIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1trZXlzW2ldXSA9IHByb3BlcnRpZXNba2V5c1tpXV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDMlJfTG9naW4gQWNjb3VudC5cclxuICAgICAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IEFjY291bnRcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5DMlJfTG9naW5cclxuICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBDMlJfTG9naW4ucHJvdG90eXBlLkFjY291bnQgPSBcIlwiO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDMlJfTG9naW4gUGFzc3dvcmQuXHJcbiAgICAgICAgICogQG1lbWJlciB7c3RyaW5nfSBQYXNzd29yZFxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyUl9Mb2dpblxyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyUl9Mb2dpbi5wcm90b3R5cGUuUGFzc3dvcmQgPSBcIlwiO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGVzIGEgbmV3IEMyUl9Mb2dpbiBpbnN0YW5jZSB1c2luZyB0aGUgc3BlY2lmaWVkIHByb3BlcnRpZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGNyZWF0ZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyUl9Mb2dpblxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSUMyUl9Mb2dpbj19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuaWNlX3RzLkMyUl9Mb2dpbn0gQzJSX0xvZ2luIGluc3RhbmNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJSX0xvZ2luLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShwcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQzJSX0xvZ2luKHByb3BlcnRpZXMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBDMlJfTG9naW4gbWVzc2FnZS4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgbmljZV90cy5DMlJfTG9naW4udmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGVuY29kZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyUl9Mb2dpblxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSUMyUl9Mb2dpbn0gbWVzc2FnZSBDMlJfTG9naW4gbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXHJcbiAgICAgICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyUl9Mb2dpbi5lbmNvZGUgPSBmdW5jdGlvbiBlbmNvZGUobWVzc2FnZSwgd3JpdGVyKSB7XHJcbiAgICAgICAgICAgIGlmICghd3JpdGVyKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVyID0gJFdyaXRlci5jcmVhdGUoKTtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuQWNjb3VudCAhPSBudWxsICYmIE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1lc3NhZ2UsIFwiQWNjb3VudFwiKSlcclxuICAgICAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMSwgd2lyZVR5cGUgMiA9Ki8xMCkuc3RyaW5nKG1lc3NhZ2UuQWNjb3VudCk7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLlBhc3N3b3JkICE9IG51bGwgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobWVzc2FnZSwgXCJQYXNzd29yZFwiKSlcclxuICAgICAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMiwgd2lyZVR5cGUgMiA9Ki8xOCkuc3RyaW5nKG1lc3NhZ2UuUGFzc3dvcmQpO1xyXG4gICAgICAgICAgICByZXR1cm4gd3JpdGVyO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBDMlJfTG9naW4gbWVzc2FnZSwgbGVuZ3RoIGRlbGltaXRlZC4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgbmljZV90cy5DMlJfTG9naW4udmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZFxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyUl9Mb2dpblxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSUMyUl9Mb2dpbn0gbWVzc2FnZSBDMlJfTG9naW4gbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXHJcbiAgICAgICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyUl9Mb2dpbi5lbmNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWQobWVzc2FnZSwgd3JpdGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVuY29kZShtZXNzYWdlLCB3cml0ZXIpLmxkZWxpbSgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlY29kZXMgYSBDMlJfTG9naW4gbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlci5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZGVjb2RlXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJSX0xvZ2luXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoXSBNZXNzYWdlIGxlbmd0aCBpZiBrbm93biBiZWZvcmVoYW5kXHJcbiAgICAgICAgICogQHJldHVybnMge25pY2VfdHMuQzJSX0xvZ2lufSBDMlJfTG9naW5cclxuICAgICAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxyXG4gICAgICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyUl9Mb2dpbi5kZWNvZGUgPSBmdW5jdGlvbiBkZWNvZGUocmVhZGVyLCBsZW5ndGgpIHtcclxuICAgICAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXHJcbiAgICAgICAgICAgICAgICByZWFkZXIgPSAkUmVhZGVyLmNyZWF0ZShyZWFkZXIpO1xyXG4gICAgICAgICAgICB2YXIgZW5kID0gbGVuZ3RoID09PSB1bmRlZmluZWQgPyByZWFkZXIubGVuIDogcmVhZGVyLnBvcyArIGxlbmd0aCwgbWVzc2FnZSA9IG5ldyAkcm9vdC5uaWNlX3RzLkMyUl9Mb2dpbigpO1xyXG4gICAgICAgICAgICB3aGlsZSAocmVhZGVyLnBvcyA8IGVuZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRhZyA9IHJlYWRlci51aW50MzIoKTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodGFnID4+PiAzKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5BY2NvdW50ID0gcmVhZGVyLnN0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuUGFzc3dvcmQgPSByZWFkZXIuc3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRlci5za2lwVHlwZSh0YWcgJiA3KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWNvZGVzIGEgQzJSX0xvZ2luIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIsIGxlbmd0aCBkZWxpbWl0ZWQuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZFxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyUl9Mb2dpblxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5SZWFkZXJ8VWludDhBcnJheX0gcmVhZGVyIFJlYWRlciBvciBidWZmZXIgdG8gZGVjb2RlIGZyb21cclxuICAgICAgICAgKiBAcmV0dXJucyB7bmljZV90cy5DMlJfTG9naW59IEMyUl9Mb2dpblxyXG4gICAgICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXHJcbiAgICAgICAgICogQHRocm93cyB7JHByb3RvYnVmLnV0aWwuUHJvdG9jb2xFcnJvcn0gSWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJSX0xvZ2luLmRlY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZChyZWFkZXIpIHtcclxuICAgICAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXHJcbiAgICAgICAgICAgICAgICByZWFkZXIgPSBuZXcgJFJlYWRlcihyZWFkZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZWNvZGUocmVhZGVyLCByZWFkZXIudWludDMyKCkpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZlcmlmaWVzIGEgQzJSX0xvZ2luIG1lc3NhZ2UuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIHZlcmlmeVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyUl9Mb2dpblxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBtZXNzYWdlIFBsYWluIG9iamVjdCB0byB2ZXJpZnlcclxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9IGBudWxsYCBpZiB2YWxpZCwgb3RoZXJ3aXNlIHRoZSByZWFzb24gd2h5IGl0IGlzIG5vdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyUl9Mb2dpbi52ZXJpZnkgPSBmdW5jdGlvbiB2ZXJpZnkobWVzc2FnZSkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgIT09IFwib2JqZWN0XCIgfHwgbWVzc2FnZSA9PT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIm9iamVjdCBleHBlY3RlZFwiO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5BY2NvdW50ICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIkFjY291bnRcIikpXHJcbiAgICAgICAgICAgICAgICBpZiAoISR1dGlsLmlzU3RyaW5nKG1lc3NhZ2UuQWNjb3VudCkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiQWNjb3VudDogc3RyaW5nIGV4cGVjdGVkXCI7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLlBhc3N3b3JkICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIlBhc3N3b3JkXCIpKVxyXG4gICAgICAgICAgICAgICAgaWYgKCEkdXRpbC5pc1N0cmluZyhtZXNzYWdlLlBhc3N3b3JkKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJQYXNzd29yZDogc3RyaW5nIGV4cGVjdGVkXCI7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENyZWF0ZXMgYSBDMlJfTG9naW4gbWVzc2FnZSBmcm9tIGEgcGxhaW4gb2JqZWN0LiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byB0aGVpciByZXNwZWN0aXZlIGludGVybmFsIHR5cGVzLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBmcm9tT2JqZWN0XHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJSX0xvZ2luXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG9iamVjdCBQbGFpbiBvYmplY3RcclxuICAgICAgICAgKiBAcmV0dXJucyB7bmljZV90cy5DMlJfTG9naW59IEMyUl9Mb2dpblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyUl9Mb2dpbi5mcm9tT2JqZWN0ID0gZnVuY3Rpb24gZnJvbU9iamVjdChvYmplY3QpIHtcclxuICAgICAgICAgICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mICRyb290Lm5pY2VfdHMuQzJSX0xvZ2luKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBuZXcgJHJvb3QubmljZV90cy5DMlJfTG9naW4oKTtcclxuICAgICAgICAgICAgaWYgKG9iamVjdC5BY2NvdW50ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLkFjY291bnQgPSBTdHJpbmcob2JqZWN0LkFjY291bnQpO1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0LlBhc3N3b3JkICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLlBhc3N3b3JkID0gU3RyaW5nKG9iamVjdC5QYXNzd29yZCk7XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENyZWF0ZXMgYSBwbGFpbiBvYmplY3QgZnJvbSBhIEMyUl9Mb2dpbiBtZXNzYWdlLiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byBvdGhlciB0eXBlcyBpZiBzcGVjaWZpZWQuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIHRvT2JqZWN0XHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJSX0xvZ2luXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7bmljZV90cy5DMlJfTG9naW59IG1lc3NhZ2UgQzJSX0xvZ2luXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuSUNvbnZlcnNpb25PcHRpb25zfSBbb3B0aW9uc10gQ29udmVyc2lvbiBvcHRpb25zXHJcbiAgICAgICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBQbGFpbiBvYmplY3RcclxuICAgICAgICAgKi9cclxuICAgICAgICBDMlJfTG9naW4udG9PYmplY3QgPSBmdW5jdGlvbiB0b09iamVjdChtZXNzYWdlLCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIGlmICghb3B0aW9ucylcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB7fTtcclxuICAgICAgICAgICAgdmFyIG9iamVjdCA9IHt9O1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5kZWZhdWx0cykge1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0LkFjY291bnQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0LlBhc3N3b3JkID0gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5BY2NvdW50ICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIkFjY291bnRcIikpXHJcbiAgICAgICAgICAgICAgICBvYmplY3QuQWNjb3VudCA9IG1lc3NhZ2UuQWNjb3VudDtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuUGFzc3dvcmQgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiUGFzc3dvcmRcIikpXHJcbiAgICAgICAgICAgICAgICBvYmplY3QuUGFzc3dvcmQgPSBtZXNzYWdlLlBhc3N3b3JkO1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnZlcnRzIHRoaXMgQzJSX0xvZ2luIHRvIEpTT04uXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIHRvSlNPTlxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyUl9Mb2dpblxyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gSlNPTiBvYmplY3RcclxuICAgICAgICAgKi9cclxuICAgICAgICBDMlJfTG9naW4ucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IudG9PYmplY3QodGhpcywgJHByb3RvYnVmLnV0aWwudG9KU09OT3B0aW9ucyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIEMyUl9Mb2dpbjtcclxuICAgIH0pKCk7XHJcblxyXG4gICAgbmljZV90cy5SMkNfTG9naW4gPSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFByb3BlcnRpZXMgb2YgYSBSMkNfTG9naW4uXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHNcclxuICAgICAgICAgKiBAaW50ZXJmYWNlIElSMkNfTG9naW5cclxuICAgICAgICAgKiBAcHJvcGVydHkge251bWJlcnxudWxsfSBbRXJyb3JdIFIyQ19Mb2dpbiBFcnJvclxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfG51bGx9IFtNZXNzYWdlXSBSMkNfTG9naW4gTWVzc2FnZVxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfG51bGx9IFtBZGRyZXNzXSBSMkNfTG9naW4gQWRkcmVzc1xyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfExvbmd8bnVsbH0gW0tleV0gUjJDX0xvZ2luIEtleVxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfExvbmd8bnVsbH0gW0dhdGVJZF0gUjJDX0xvZ2luIEdhdGVJZFxyXG4gICAgICAgICAqL1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb25zdHJ1Y3RzIGEgbmV3IFIyQ19Mb2dpbi5cclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90c1xyXG4gICAgICAgICAqIEBjbGFzc2Rlc2MgUmVwcmVzZW50cyBhIFIyQ19Mb2dpbi5cclxuICAgICAgICAgKiBAaW1wbGVtZW50cyBJUjJDX0xvZ2luXHJcbiAgICAgICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLklSMkNfTG9naW49fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBSMkNfTG9naW4ocHJvcGVydGllcykge1xyXG4gICAgICAgICAgICBpZiAocHJvcGVydGllcylcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGtleXMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKSwgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzW2tleXNbaV1dICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNba2V5c1tpXV0gPSBwcm9wZXJ0aWVzW2tleXNbaV1dO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUjJDX0xvZ2luIEVycm9yLlxyXG4gICAgICAgICAqIEBtZW1iZXIge251bWJlcn0gRXJyb3JcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5SMkNfTG9naW5cclxuICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBSMkNfTG9naW4ucHJvdG90eXBlLkVycm9yID0gMDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUjJDX0xvZ2luIE1lc3NhZ2UuXHJcbiAgICAgICAgICogQG1lbWJlciB7c3RyaW5nfSBNZXNzYWdlXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuUjJDX0xvZ2luXHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgUjJDX0xvZ2luLnByb3RvdHlwZS5NZXNzYWdlID0gXCJcIjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUjJDX0xvZ2luIEFkZHJlc3MuXHJcbiAgICAgICAgICogQG1lbWJlciB7c3RyaW5nfSBBZGRyZXNzXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuUjJDX0xvZ2luXHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgUjJDX0xvZ2luLnByb3RvdHlwZS5BZGRyZXNzID0gXCJcIjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUjJDX0xvZ2luIEtleS5cclxuICAgICAgICAgKiBAbWVtYmVyIHtudW1iZXJ8TG9uZ30gS2V5XHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuUjJDX0xvZ2luXHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgUjJDX0xvZ2luLnByb3RvdHlwZS5LZXkgPSAkdXRpbC5Mb25nID8gJHV0aWwuTG9uZy5mcm9tQml0cygwLDAsZmFsc2UpIDogMDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUjJDX0xvZ2luIEdhdGVJZC5cclxuICAgICAgICAgKiBAbWVtYmVyIHtudW1iZXJ8TG9uZ30gR2F0ZUlkXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuUjJDX0xvZ2luXHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgUjJDX0xvZ2luLnByb3RvdHlwZS5HYXRlSWQgPSAkdXRpbC5Mb25nID8gJHV0aWwuTG9uZy5mcm9tQml0cygwLDAsZmFsc2UpIDogMDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlcyBhIG5ldyBSMkNfTG9naW4gaW5zdGFuY2UgdXNpbmcgdGhlIHNwZWNpZmllZCBwcm9wZXJ0aWVzLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBjcmVhdGVcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5SMkNfTG9naW5cclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLklSMkNfTG9naW49fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcclxuICAgICAgICAgKiBAcmV0dXJucyB7bmljZV90cy5SMkNfTG9naW59IFIyQ19Mb2dpbiBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFIyQ19Mb2dpbi5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUocHJvcGVydGllcykge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFIyQ19Mb2dpbihwcm9wZXJ0aWVzKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgUjJDX0xvZ2luIG1lc3NhZ2UuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIG5pY2VfdHMuUjJDX0xvZ2luLnZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBlbmNvZGVcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5SMkNfTG9naW5cclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLklSMkNfTG9naW59IG1lc3NhZ2UgUjJDX0xvZ2luIG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxyXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xyXG4gICAgICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBSMkNfTG9naW4uZW5jb2RlID0gZnVuY3Rpb24gZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikge1xyXG4gICAgICAgICAgICBpZiAoIXdyaXRlcilcclxuICAgICAgICAgICAgICAgIHdyaXRlciA9ICRXcml0ZXIuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLkFkZHJlc3MgIT0gbnVsbCAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtZXNzYWdlLCBcIkFkZHJlc3NcIikpXHJcbiAgICAgICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDEsIHdpcmVUeXBlIDIgPSovMTApLnN0cmluZyhtZXNzYWdlLkFkZHJlc3MpO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5LZXkgIT0gbnVsbCAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtZXNzYWdlLCBcIktleVwiKSlcclxuICAgICAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMiwgd2lyZVR5cGUgMCA9Ki8xNikuaW50NjQobWVzc2FnZS5LZXkpO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5HYXRlSWQgIT0gbnVsbCAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtZXNzYWdlLCBcIkdhdGVJZFwiKSlcclxuICAgICAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMywgd2lyZVR5cGUgMCA9Ki8yNCkuaW50NjQobWVzc2FnZS5HYXRlSWQpO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5FcnJvciAhPSBudWxsICYmIE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1lc3NhZ2UsIFwiRXJyb3JcIikpXHJcbiAgICAgICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDkxLCB3aXJlVHlwZSAwID0qLzcyOCkuaW50MzIobWVzc2FnZS5FcnJvcik7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLk1lc3NhZ2UgIT0gbnVsbCAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtZXNzYWdlLCBcIk1lc3NhZ2VcIikpXHJcbiAgICAgICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDkyLCB3aXJlVHlwZSAyID0qLzczOCkuc3RyaW5nKG1lc3NhZ2UuTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB3cml0ZXI7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIFIyQ19Mb2dpbiBtZXNzYWdlLCBsZW5ndGggZGVsaW1pdGVkLiBEb2VzIG5vdCBpbXBsaWNpdGx5IHtAbGluayBuaWNlX3RzLlIyQ19Mb2dpbi52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuUjJDX0xvZ2luXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7bmljZV90cy5JUjJDX0xvZ2lufSBtZXNzYWdlIFIyQ19Mb2dpbiBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cclxuICAgICAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgUjJDX0xvZ2luLmVuY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZChtZXNzYWdlLCB3cml0ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikubGRlbGltKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGVjb2RlcyBhIFIyQ19Mb2dpbiBtZXNzYWdlIGZyb20gdGhlIHNwZWNpZmllZCByZWFkZXIgb3IgYnVmZmVyLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBkZWNvZGVcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5SMkNfTG9naW5cclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGhdIE1lc3NhZ2UgbGVuZ3RoIGlmIGtub3duIGJlZm9yZWhhbmRcclxuICAgICAgICAgKiBAcmV0dXJucyB7bmljZV90cy5SMkNfTG9naW59IFIyQ19Mb2dpblxyXG4gICAgICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXHJcbiAgICAgICAgICogQHRocm93cyB7JHByb3RvYnVmLnV0aWwuUHJvdG9jb2xFcnJvcn0gSWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgUjJDX0xvZ2luLmRlY29kZSA9IGZ1bmN0aW9uIGRlY29kZShyZWFkZXIsIGxlbmd0aCkge1xyXG4gICAgICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcclxuICAgICAgICAgICAgICAgIHJlYWRlciA9ICRSZWFkZXIuY3JlYXRlKHJlYWRlcik7XHJcbiAgICAgICAgICAgIHZhciBlbmQgPSBsZW5ndGggPT09IHVuZGVmaW5lZCA/IHJlYWRlci5sZW4gOiByZWFkZXIucG9zICsgbGVuZ3RoLCBtZXNzYWdlID0gbmV3ICRyb290Lm5pY2VfdHMuUjJDX0xvZ2luKCk7XHJcbiAgICAgICAgICAgIHdoaWxlIChyZWFkZXIucG9zIDwgZW5kKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGFnID0gcmVhZGVyLnVpbnQzMigpO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0YWcgPj4+IDMpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgOTE6XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5FcnJvciA9IHJlYWRlci5pbnQzMigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA5MjpcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLk1lc3NhZ2UgPSByZWFkZXIuc3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5BZGRyZXNzID0gcmVhZGVyLnN0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuS2V5ID0gcmVhZGVyLmludDY0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5HYXRlSWQgPSByZWFkZXIuaW50NjQoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyLnNraXBUeXBlKHRhZyAmIDcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlY29kZXMgYSBSMkNfTG9naW4gbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlciwgbGVuZ3RoIGRlbGltaXRlZC5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuUjJDX0xvZ2luXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuaWNlX3RzLlIyQ19Mb2dpbn0gUjJDX0xvZ2luXHJcbiAgICAgICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcclxuICAgICAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcclxuICAgICAgICAgKi9cclxuICAgICAgICBSMkNfTG9naW4uZGVjb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkKHJlYWRlcikge1xyXG4gICAgICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcclxuICAgICAgICAgICAgICAgIHJlYWRlciA9IG5ldyAkUmVhZGVyKHJlYWRlcik7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlY29kZShyZWFkZXIsIHJlYWRlci51aW50MzIoKSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVmVyaWZpZXMgYSBSMkNfTG9naW4gbWVzc2FnZS5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gdmVyaWZ5XHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuUjJDX0xvZ2luXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG1lc3NhZ2UgUGxhaW4gb2JqZWN0IHRvIHZlcmlmeVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH0gYG51bGxgIGlmIHZhbGlkLCBvdGhlcndpc2UgdGhlIHJlYXNvbiB3aHkgaXQgaXMgbm90XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgUjJDX0xvZ2luLnZlcmlmeSA9IGZ1bmN0aW9uIHZlcmlmeShtZXNzYWdlKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSAhPT0gXCJvYmplY3RcIiB8fCBtZXNzYWdlID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwib2JqZWN0IGV4cGVjdGVkXCI7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLkVycm9yICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIkVycm9yXCIpKVxyXG4gICAgICAgICAgICAgICAgaWYgKCEkdXRpbC5pc0ludGVnZXIobWVzc2FnZS5FcnJvcikpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiRXJyb3I6IGludGVnZXIgZXhwZWN0ZWRcIjtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuTWVzc2FnZSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJNZXNzYWdlXCIpKVxyXG4gICAgICAgICAgICAgICAgaWYgKCEkdXRpbC5pc1N0cmluZyhtZXNzYWdlLk1lc3NhZ2UpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIk1lc3NhZ2U6IHN0cmluZyBleHBlY3RlZFwiO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5BZGRyZXNzICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIkFkZHJlc3NcIikpXHJcbiAgICAgICAgICAgICAgICBpZiAoISR1dGlsLmlzU3RyaW5nKG1lc3NhZ2UuQWRkcmVzcykpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiQWRkcmVzczogc3RyaW5nIGV4cGVjdGVkXCI7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLktleSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJLZXlcIikpXHJcbiAgICAgICAgICAgICAgICBpZiAoISR1dGlsLmlzSW50ZWdlcihtZXNzYWdlLktleSkgJiYgIShtZXNzYWdlLktleSAmJiAkdXRpbC5pc0ludGVnZXIobWVzc2FnZS5LZXkubG93KSAmJiAkdXRpbC5pc0ludGVnZXIobWVzc2FnZS5LZXkuaGlnaCkpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIktleTogaW50ZWdlcnxMb25nIGV4cGVjdGVkXCI7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLkdhdGVJZCAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJHYXRlSWRcIikpXHJcbiAgICAgICAgICAgICAgICBpZiAoISR1dGlsLmlzSW50ZWdlcihtZXNzYWdlLkdhdGVJZCkgJiYgIShtZXNzYWdlLkdhdGVJZCAmJiAkdXRpbC5pc0ludGVnZXIobWVzc2FnZS5HYXRlSWQubG93KSAmJiAkdXRpbC5pc0ludGVnZXIobWVzc2FnZS5HYXRlSWQuaGlnaCkpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIkdhdGVJZDogaW50ZWdlcnxMb25nIGV4cGVjdGVkXCI7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENyZWF0ZXMgYSBSMkNfTG9naW4gbWVzc2FnZSBmcm9tIGEgcGxhaW4gb2JqZWN0LiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byB0aGVpciByZXNwZWN0aXZlIGludGVybmFsIHR5cGVzLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBmcm9tT2JqZWN0XHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuUjJDX0xvZ2luXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG9iamVjdCBQbGFpbiBvYmplY3RcclxuICAgICAgICAgKiBAcmV0dXJucyB7bmljZV90cy5SMkNfTG9naW59IFIyQ19Mb2dpblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFIyQ19Mb2dpbi5mcm9tT2JqZWN0ID0gZnVuY3Rpb24gZnJvbU9iamVjdChvYmplY3QpIHtcclxuICAgICAgICAgICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mICRyb290Lm5pY2VfdHMuUjJDX0xvZ2luKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBuZXcgJHJvb3QubmljZV90cy5SMkNfTG9naW4oKTtcclxuICAgICAgICAgICAgaWYgKG9iamVjdC5FcnJvciAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5FcnJvciA9IG9iamVjdC5FcnJvciB8IDA7XHJcbiAgICAgICAgICAgIGlmIChvYmplY3QuTWVzc2FnZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5NZXNzYWdlID0gU3RyaW5nKG9iamVjdC5NZXNzYWdlKTtcclxuICAgICAgICAgICAgaWYgKG9iamVjdC5BZGRyZXNzICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLkFkZHJlc3MgPSBTdHJpbmcob2JqZWN0LkFkZHJlc3MpO1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0LktleSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgaWYgKCR1dGlsLkxvbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgKG1lc3NhZ2UuS2V5ID0gJHV0aWwuTG9uZy5mcm9tVmFsdWUob2JqZWN0LktleSkpLnVuc2lnbmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0LktleSA9PT0gXCJzdHJpbmdcIilcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLktleSA9IHBhcnNlSW50KG9iamVjdC5LZXksIDEwKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmplY3QuS2V5ID09PSBcIm51bWJlclwiKVxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuS2V5ID0gb2JqZWN0LktleTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmplY3QuS2V5ID09PSBcIm9iamVjdFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuS2V5ID0gbmV3ICR1dGlsLkxvbmdCaXRzKG9iamVjdC5LZXkubG93ID4+PiAwLCBvYmplY3QuS2V5LmhpZ2ggPj4+IDApLnRvTnVtYmVyKCk7XHJcbiAgICAgICAgICAgIGlmIChvYmplY3QuR2F0ZUlkICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBpZiAoJHV0aWwuTG9uZylcclxuICAgICAgICAgICAgICAgICAgICAobWVzc2FnZS5HYXRlSWQgPSAkdXRpbC5Mb25nLmZyb21WYWx1ZShvYmplY3QuR2F0ZUlkKSkudW5zaWduZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmplY3QuR2F0ZUlkID09PSBcInN0cmluZ1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuR2F0ZUlkID0gcGFyc2VJbnQob2JqZWN0LkdhdGVJZCwgMTApO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9iamVjdC5HYXRlSWQgPT09IFwibnVtYmVyXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5HYXRlSWQgPSBvYmplY3QuR2F0ZUlkO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9iamVjdC5HYXRlSWQgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5HYXRlSWQgPSBuZXcgJHV0aWwuTG9uZ0JpdHMob2JqZWN0LkdhdGVJZC5sb3cgPj4+IDAsIG9iamVjdC5HYXRlSWQuaGlnaCA+Pj4gMCkudG9OdW1iZXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlcyBhIHBsYWluIG9iamVjdCBmcm9tIGEgUjJDX0xvZ2luIG1lc3NhZ2UuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIG90aGVyIHR5cGVzIGlmIHNwZWNpZmllZC5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gdG9PYmplY3RcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5SMkNfTG9naW5cclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLlIyQ19Mb2dpbn0gbWVzc2FnZSBSMkNfTG9naW5cclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5JQ29udmVyc2lvbk9wdGlvbnN9IFtvcHRpb25zXSBDb252ZXJzaW9uIG9wdGlvbnNcclxuICAgICAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IFBsYWluIG9iamVjdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFIyQ19Mb2dpbi50b09iamVjdCA9IGZ1bmN0aW9uIHRvT2JqZWN0KG1lc3NhZ2UsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgaWYgKCFvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHt9O1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0ID0ge307XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmRlZmF1bHRzKSB7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QuQWRkcmVzcyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBpZiAoJHV0aWwuTG9uZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsb25nID0gbmV3ICR1dGlsLkxvbmcoMCwgMCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC5LZXkgPSBvcHRpb25zLmxvbmdzID09PSBTdHJpbmcgPyBsb25nLnRvU3RyaW5nKCkgOiBvcHRpb25zLmxvbmdzID09PSBOdW1iZXIgPyBsb25nLnRvTnVtYmVyKCkgOiBsb25nO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LktleSA9IG9wdGlvbnMubG9uZ3MgPT09IFN0cmluZyA/IFwiMFwiIDogMDtcclxuICAgICAgICAgICAgICAgIGlmICgkdXRpbC5Mb25nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxvbmcgPSBuZXcgJHV0aWwuTG9uZygwLCAwLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LkdhdGVJZCA9IG9wdGlvbnMubG9uZ3MgPT09IFN0cmluZyA/IGxvbmcudG9TdHJpbmcoKSA6IG9wdGlvbnMubG9uZ3MgPT09IE51bWJlciA/IGxvbmcudG9OdW1iZXIoKSA6IGxvbmc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3QuR2F0ZUlkID0gb3B0aW9ucy5sb25ncyA9PT0gU3RyaW5nID8gXCIwXCIgOiAwO1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0LkVycm9yID0gMDtcclxuICAgICAgICAgICAgICAgIG9iamVjdC5NZXNzYWdlID0gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5BZGRyZXNzICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIkFkZHJlc3NcIikpXHJcbiAgICAgICAgICAgICAgICBvYmplY3QuQWRkcmVzcyA9IG1lc3NhZ2UuQWRkcmVzcztcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuS2V5ICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIktleVwiKSlcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZS5LZXkgPT09IFwibnVtYmVyXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LktleSA9IG9wdGlvbnMubG9uZ3MgPT09IFN0cmluZyA/IFN0cmluZyhtZXNzYWdlLktleSkgOiBtZXNzYWdlLktleTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3QuS2V5ID0gb3B0aW9ucy5sb25ncyA9PT0gU3RyaW5nID8gJHV0aWwuTG9uZy5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChtZXNzYWdlLktleSkgOiBvcHRpb25zLmxvbmdzID09PSBOdW1iZXIgPyBuZXcgJHV0aWwuTG9uZ0JpdHMobWVzc2FnZS5LZXkubG93ID4+PiAwLCBtZXNzYWdlLktleS5oaWdoID4+PiAwKS50b051bWJlcigpIDogbWVzc2FnZS5LZXk7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLkdhdGVJZCAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJHYXRlSWRcIikpXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UuR2F0ZUlkID09PSBcIm51bWJlclwiKVxyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC5HYXRlSWQgPSBvcHRpb25zLmxvbmdzID09PSBTdHJpbmcgPyBTdHJpbmcobWVzc2FnZS5HYXRlSWQpIDogbWVzc2FnZS5HYXRlSWQ7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LkdhdGVJZCA9IG9wdGlvbnMubG9uZ3MgPT09IFN0cmluZyA/ICR1dGlsLkxvbmcucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobWVzc2FnZS5HYXRlSWQpIDogb3B0aW9ucy5sb25ncyA9PT0gTnVtYmVyID8gbmV3ICR1dGlsLkxvbmdCaXRzKG1lc3NhZ2UuR2F0ZUlkLmxvdyA+Pj4gMCwgbWVzc2FnZS5HYXRlSWQuaGlnaCA+Pj4gMCkudG9OdW1iZXIoKSA6IG1lc3NhZ2UuR2F0ZUlkO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5FcnJvciAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJFcnJvclwiKSlcclxuICAgICAgICAgICAgICAgIG9iamVjdC5FcnJvciA9IG1lc3NhZ2UuRXJyb3I7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLk1lc3NhZ2UgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiTWVzc2FnZVwiKSlcclxuICAgICAgICAgICAgICAgIG9iamVjdC5NZXNzYWdlID0gbWVzc2FnZS5NZXNzYWdlO1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnZlcnRzIHRoaXMgUjJDX0xvZ2luIHRvIEpTT04uXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIHRvSlNPTlxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLlIyQ19Mb2dpblxyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gSlNPTiBvYmplY3RcclxuICAgICAgICAgKi9cclxuICAgICAgICBSMkNfTG9naW4ucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IudG9PYmplY3QodGhpcywgJHByb3RvYnVmLnV0aWwudG9KU09OT3B0aW9ucyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFIyQ19Mb2dpbjtcclxuICAgIH0pKCk7XHJcblxyXG4gICAgbmljZV90cy5DMkdfTG9naW5HYXRlID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQcm9wZXJ0aWVzIG9mIGEgQzJHX0xvZ2luR2F0ZS5cclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90c1xyXG4gICAgICAgICAqIEBpbnRlcmZhY2UgSUMyR19Mb2dpbkdhdGVcclxuICAgICAgICAgKiBAcHJvcGVydHkge251bWJlcnxMb25nfG51bGx9IFtLZXldIEMyR19Mb2dpbkdhdGUgS2V5XHJcbiAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ8TG9uZ3xudWxsfSBbR2F0ZUlkXSBDMkdfTG9naW5HYXRlIEdhdGVJZFxyXG4gICAgICAgICAqL1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb25zdHJ1Y3RzIGEgbmV3IEMyR19Mb2dpbkdhdGUuXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHNcclxuICAgICAgICAgKiBAY2xhc3NkZXNjIFJlcHJlc2VudHMgYSBDMkdfTG9naW5HYXRlLlxyXG4gICAgICAgICAqIEBpbXBsZW1lbnRzIElDMkdfTG9naW5HYXRlXHJcbiAgICAgICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLklDMkdfTG9naW5HYXRlPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gQzJHX0xvZ2luR2F0ZShwcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzKVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXNba2V5c1tpXV0gIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1trZXlzW2ldXSA9IHByb3BlcnRpZXNba2V5c1tpXV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDMkdfTG9naW5HYXRlIEtleS5cclxuICAgICAgICAgKiBAbWVtYmVyIHtudW1iZXJ8TG9uZ30gS2V5XHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJHX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyR19Mb2dpbkdhdGUucHJvdG90eXBlLktleSA9ICR1dGlsLkxvbmcgPyAkdXRpbC5Mb25nLmZyb21CaXRzKDAsMCxmYWxzZSkgOiAwO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDMkdfTG9naW5HYXRlIEdhdGVJZC5cclxuICAgICAgICAgKiBAbWVtYmVyIHtudW1iZXJ8TG9uZ30gR2F0ZUlkXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJHX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyR19Mb2dpbkdhdGUucHJvdG90eXBlLkdhdGVJZCA9ICR1dGlsLkxvbmcgPyAkdXRpbC5Mb25nLmZyb21CaXRzKDAsMCxmYWxzZSkgOiAwO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGVzIGEgbmV3IEMyR19Mb2dpbkdhdGUgaW5zdGFuY2UgdXNpbmcgdGhlIHNwZWNpZmllZCBwcm9wZXJ0aWVzLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBjcmVhdGVcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5DMkdfTG9naW5HYXRlXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7bmljZV90cy5JQzJHX0xvZ2luR2F0ZT19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuaWNlX3RzLkMyR19Mb2dpbkdhdGV9IEMyR19Mb2dpbkdhdGUgaW5zdGFuY2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBDMkdfTG9naW5HYXRlLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShwcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQzJHX0xvZ2luR2F0ZShwcm9wZXJ0aWVzKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgQzJHX0xvZ2luR2F0ZSBtZXNzYWdlLiBEb2VzIG5vdCBpbXBsaWNpdGx5IHtAbGluayBuaWNlX3RzLkMyR19Mb2dpbkdhdGUudmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGVuY29kZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyR19Mb2dpbkdhdGVcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLklDMkdfTG9naW5HYXRlfSBtZXNzYWdlIEMyR19Mb2dpbkdhdGUgbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXHJcbiAgICAgICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyR19Mb2dpbkdhdGUuZW5jb2RlID0gZnVuY3Rpb24gZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikge1xyXG4gICAgICAgICAgICBpZiAoIXdyaXRlcilcclxuICAgICAgICAgICAgICAgIHdyaXRlciA9ICRXcml0ZXIuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLktleSAhPSBudWxsICYmIE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1lc3NhZ2UsIFwiS2V5XCIpKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAxLCB3aXJlVHlwZSAwID0qLzgpLmludDY0KG1lc3NhZ2UuS2V5KTtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuR2F0ZUlkICE9IG51bGwgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobWVzc2FnZSwgXCJHYXRlSWRcIikpXHJcbiAgICAgICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDIsIHdpcmVUeXBlIDAgPSovMTYpLmludDY0KG1lc3NhZ2UuR2F0ZUlkKTtcclxuICAgICAgICAgICAgcmV0dXJuIHdyaXRlcjtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgQzJHX0xvZ2luR2F0ZSBtZXNzYWdlLCBsZW5ndGggZGVsaW1pdGVkLiBEb2VzIG5vdCBpbXBsaWNpdGx5IHtAbGluayBuaWNlX3RzLkMyR19Mb2dpbkdhdGUudmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZFxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyR19Mb2dpbkdhdGVcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLklDMkdfTG9naW5HYXRlfSBtZXNzYWdlIEMyR19Mb2dpbkdhdGUgbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXHJcbiAgICAgICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyR19Mb2dpbkdhdGUuZW5jb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkKG1lc3NhZ2UsIHdyaXRlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbmNvZGUobWVzc2FnZSwgd3JpdGVyKS5sZGVsaW0oKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWNvZGVzIGEgQzJHX0xvZ2luR2F0ZSBtZXNzYWdlIGZyb20gdGhlIHNwZWNpZmllZCByZWFkZXIgb3IgYnVmZmVyLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBkZWNvZGVcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5DMkdfTG9naW5HYXRlXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoXSBNZXNzYWdlIGxlbmd0aCBpZiBrbm93biBiZWZvcmVoYW5kXHJcbiAgICAgICAgICogQHJldHVybnMge25pY2VfdHMuQzJHX0xvZ2luR2F0ZX0gQzJHX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXHJcbiAgICAgICAgICogQHRocm93cyB7JHByb3RvYnVmLnV0aWwuUHJvdG9jb2xFcnJvcn0gSWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJHX0xvZ2luR2F0ZS5kZWNvZGUgPSBmdW5jdGlvbiBkZWNvZGUocmVhZGVyLCBsZW5ndGgpIHtcclxuICAgICAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXHJcbiAgICAgICAgICAgICAgICByZWFkZXIgPSAkUmVhZGVyLmNyZWF0ZShyZWFkZXIpO1xyXG4gICAgICAgICAgICB2YXIgZW5kID0gbGVuZ3RoID09PSB1bmRlZmluZWQgPyByZWFkZXIubGVuIDogcmVhZGVyLnBvcyArIGxlbmd0aCwgbWVzc2FnZSA9IG5ldyAkcm9vdC5uaWNlX3RzLkMyR19Mb2dpbkdhdGUoKTtcclxuICAgICAgICAgICAgd2hpbGUgKHJlYWRlci5wb3MgPCBlbmQpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0YWcgPSByZWFkZXIudWludDMyKCk7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRhZyA+Pj4gMykge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuS2V5ID0gcmVhZGVyLmludDY0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5HYXRlSWQgPSByZWFkZXIuaW50NjQoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyLnNraXBUeXBlKHRhZyAmIDcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlY29kZXMgYSBDMkdfTG9naW5HYXRlIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIsIGxlbmd0aCBkZWxpbWl0ZWQuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZFxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyR19Mb2dpbkdhdGVcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXHJcbiAgICAgICAgICogQHJldHVybnMge25pY2VfdHMuQzJHX0xvZ2luR2F0ZX0gQzJHX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXHJcbiAgICAgICAgICogQHRocm93cyB7JHByb3RvYnVmLnV0aWwuUHJvdG9jb2xFcnJvcn0gSWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJHX0xvZ2luR2F0ZS5kZWNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBkZWNvZGVEZWxpbWl0ZWQocmVhZGVyKSB7XHJcbiAgICAgICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxyXG4gICAgICAgICAgICAgICAgcmVhZGVyID0gbmV3ICRSZWFkZXIocmVhZGVyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGVjb2RlKHJlYWRlciwgcmVhZGVyLnVpbnQzMigpKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWZXJpZmllcyBhIEMyR19Mb2dpbkdhdGUgbWVzc2FnZS5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gdmVyaWZ5XHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJHX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBtZXNzYWdlIFBsYWluIG9iamVjdCB0byB2ZXJpZnlcclxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9IGBudWxsYCBpZiB2YWxpZCwgb3RoZXJ3aXNlIHRoZSByZWFzb24gd2h5IGl0IGlzIG5vdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyR19Mb2dpbkdhdGUudmVyaWZ5ID0gZnVuY3Rpb24gdmVyaWZ5KG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSBcIm9iamVjdFwiIHx8IG1lc3NhZ2UgPT09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJvYmplY3QgZXhwZWN0ZWRcIjtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuS2V5ICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIktleVwiKSlcclxuICAgICAgICAgICAgICAgIGlmICghJHV0aWwuaXNJbnRlZ2VyKG1lc3NhZ2UuS2V5KSAmJiAhKG1lc3NhZ2UuS2V5ICYmICR1dGlsLmlzSW50ZWdlcihtZXNzYWdlLktleS5sb3cpICYmICR1dGlsLmlzSW50ZWdlcihtZXNzYWdlLktleS5oaWdoKSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiS2V5OiBpbnRlZ2VyfExvbmcgZXhwZWN0ZWRcIjtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuR2F0ZUlkICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIkdhdGVJZFwiKSlcclxuICAgICAgICAgICAgICAgIGlmICghJHV0aWwuaXNJbnRlZ2VyKG1lc3NhZ2UuR2F0ZUlkKSAmJiAhKG1lc3NhZ2UuR2F0ZUlkICYmICR1dGlsLmlzSW50ZWdlcihtZXNzYWdlLkdhdGVJZC5sb3cpICYmICR1dGlsLmlzSW50ZWdlcihtZXNzYWdlLkdhdGVJZC5oaWdoKSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiR2F0ZUlkOiBpbnRlZ2VyfExvbmcgZXhwZWN0ZWRcIjtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlcyBhIEMyR19Mb2dpbkdhdGUgbWVzc2FnZSBmcm9tIGEgcGxhaW4gb2JqZWN0LiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byB0aGVpciByZXNwZWN0aXZlIGludGVybmFsIHR5cGVzLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBmcm9tT2JqZWN0XHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJHX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBvYmplY3QgUGxhaW4gb2JqZWN0XHJcbiAgICAgICAgICogQHJldHVybnMge25pY2VfdHMuQzJHX0xvZ2luR2F0ZX0gQzJHX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyR19Mb2dpbkdhdGUuZnJvbU9iamVjdCA9IGZ1bmN0aW9uIGZyb21PYmplY3Qob2JqZWN0KSB7XHJcbiAgICAgICAgICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiAkcm9vdC5uaWNlX3RzLkMyR19Mb2dpbkdhdGUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IG5ldyAkcm9vdC5uaWNlX3RzLkMyR19Mb2dpbkdhdGUoKTtcclxuICAgICAgICAgICAgaWYgKG9iamVjdC5LZXkgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIGlmICgkdXRpbC5Mb25nKVxyXG4gICAgICAgICAgICAgICAgICAgIChtZXNzYWdlLktleSA9ICR1dGlsLkxvbmcuZnJvbVZhbHVlKG9iamVjdC5LZXkpKS51bnNpZ25lZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9iamVjdC5LZXkgPT09IFwic3RyaW5nXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5LZXkgPSBwYXJzZUludChvYmplY3QuS2V5LCAxMCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0LktleSA9PT0gXCJudW1iZXJcIilcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLktleSA9IG9iamVjdC5LZXk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0LktleSA9PT0gXCJvYmplY3RcIilcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLktleSA9IG5ldyAkdXRpbC5Mb25nQml0cyhvYmplY3QuS2V5LmxvdyA+Pj4gMCwgb2JqZWN0LktleS5oaWdoID4+PiAwKS50b051bWJlcigpO1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0LkdhdGVJZCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgaWYgKCR1dGlsLkxvbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgKG1lc3NhZ2UuR2F0ZUlkID0gJHV0aWwuTG9uZy5mcm9tVmFsdWUob2JqZWN0LkdhdGVJZCkpLnVuc2lnbmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0LkdhdGVJZCA9PT0gXCJzdHJpbmdcIilcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLkdhdGVJZCA9IHBhcnNlSW50KG9iamVjdC5HYXRlSWQsIDEwKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmplY3QuR2F0ZUlkID09PSBcIm51bWJlclwiKVxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuR2F0ZUlkID0gb2JqZWN0LkdhdGVJZDtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmplY3QuR2F0ZUlkID09PSBcIm9iamVjdFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuR2F0ZUlkID0gbmV3ICR1dGlsLkxvbmdCaXRzKG9iamVjdC5HYXRlSWQubG93ID4+PiAwLCBvYmplY3QuR2F0ZUlkLmhpZ2ggPj4+IDApLnRvTnVtYmVyKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENyZWF0ZXMgYSBwbGFpbiBvYmplY3QgZnJvbSBhIEMyR19Mb2dpbkdhdGUgbWVzc2FnZS4gQWxzbyBjb252ZXJ0cyB2YWx1ZXMgdG8gb3RoZXIgdHlwZXMgaWYgc3BlY2lmaWVkLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiB0b09iamVjdFxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyR19Mb2dpbkdhdGVcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLkMyR19Mb2dpbkdhdGV9IG1lc3NhZ2UgQzJHX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLklDb252ZXJzaW9uT3B0aW9uc30gW29wdGlvbnNdIENvbnZlcnNpb24gb3B0aW9uc1xyXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gUGxhaW4gb2JqZWN0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJHX0xvZ2luR2F0ZS50b09iamVjdCA9IGZ1bmN0aW9uIHRvT2JqZWN0KG1lc3NhZ2UsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgaWYgKCFvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHt9O1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0ID0ge307XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmRlZmF1bHRzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJHV0aWwuTG9uZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsb25nID0gbmV3ICR1dGlsLkxvbmcoMCwgMCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC5LZXkgPSBvcHRpb25zLmxvbmdzID09PSBTdHJpbmcgPyBsb25nLnRvU3RyaW5nKCkgOiBvcHRpb25zLmxvbmdzID09PSBOdW1iZXIgPyBsb25nLnRvTnVtYmVyKCkgOiBsb25nO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LktleSA9IG9wdGlvbnMubG9uZ3MgPT09IFN0cmluZyA/IFwiMFwiIDogMDtcclxuICAgICAgICAgICAgICAgIGlmICgkdXRpbC5Mb25nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxvbmcgPSBuZXcgJHV0aWwuTG9uZygwLCAwLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LkdhdGVJZCA9IG9wdGlvbnMubG9uZ3MgPT09IFN0cmluZyA/IGxvbmcudG9TdHJpbmcoKSA6IG9wdGlvbnMubG9uZ3MgPT09IE51bWJlciA/IGxvbmcudG9OdW1iZXIoKSA6IGxvbmc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3QuR2F0ZUlkID0gb3B0aW9ucy5sb25ncyA9PT0gU3RyaW5nID8gXCIwXCIgOiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLktleSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJLZXlcIikpXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UuS2V5ID09PSBcIm51bWJlclwiKVxyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC5LZXkgPSBvcHRpb25zLmxvbmdzID09PSBTdHJpbmcgPyBTdHJpbmcobWVzc2FnZS5LZXkpIDogbWVzc2FnZS5LZXk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LktleSA9IG9wdGlvbnMubG9uZ3MgPT09IFN0cmluZyA/ICR1dGlsLkxvbmcucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobWVzc2FnZS5LZXkpIDogb3B0aW9ucy5sb25ncyA9PT0gTnVtYmVyID8gbmV3ICR1dGlsLkxvbmdCaXRzKG1lc3NhZ2UuS2V5LmxvdyA+Pj4gMCwgbWVzc2FnZS5LZXkuaGlnaCA+Pj4gMCkudG9OdW1iZXIoKSA6IG1lc3NhZ2UuS2V5O1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5HYXRlSWQgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiR2F0ZUlkXCIpKVxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlLkdhdGVJZCA9PT0gXCJudW1iZXJcIilcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3QuR2F0ZUlkID0gb3B0aW9ucy5sb25ncyA9PT0gU3RyaW5nID8gU3RyaW5nKG1lc3NhZ2UuR2F0ZUlkKSA6IG1lc3NhZ2UuR2F0ZUlkO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC5HYXRlSWQgPSBvcHRpb25zLmxvbmdzID09PSBTdHJpbmcgPyAkdXRpbC5Mb25nLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG1lc3NhZ2UuR2F0ZUlkKSA6IG9wdGlvbnMubG9uZ3MgPT09IE51bWJlciA/IG5ldyAkdXRpbC5Mb25nQml0cyhtZXNzYWdlLkdhdGVJZC5sb3cgPj4+IDAsIG1lc3NhZ2UuR2F0ZUlkLmhpZ2ggPj4+IDApLnRvTnVtYmVyKCkgOiBtZXNzYWdlLkdhdGVJZDtcclxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb252ZXJ0cyB0aGlzIEMyR19Mb2dpbkdhdGUgdG8gSlNPTi5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gdG9KU09OXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJHX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gSlNPTiBvYmplY3RcclxuICAgICAgICAgKi9cclxuICAgICAgICBDMkdfTG9naW5HYXRlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLnRvT2JqZWN0KHRoaXMsICRwcm90b2J1Zi51dGlsLnRvSlNPTk9wdGlvbnMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBDMkdfTG9naW5HYXRlO1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICBuaWNlX3RzLkcyQ19Mb2dpbkdhdGUgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFByb3BlcnRpZXMgb2YgYSBHMkNfTG9naW5HYXRlLlxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzXHJcbiAgICAgICAgICogQGludGVyZmFjZSBJRzJDX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfG51bGx9IFtFcnJvcl0gRzJDX0xvZ2luR2F0ZSBFcnJvclxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfG51bGx9IFtNZXNzYWdlXSBHMkNfTG9naW5HYXRlIE1lc3NhZ2VcclxuICAgICAgICAgKiBAcHJvcGVydHkge251bWJlcnxMb25nfG51bGx9IFtQbGF5ZXJJZF0gRzJDX0xvZ2luR2F0ZSBQbGF5ZXJJZFxyXG4gICAgICAgICAqL1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb25zdHJ1Y3RzIGEgbmV3IEcyQ19Mb2dpbkdhdGUuXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHNcclxuICAgICAgICAgKiBAY2xhc3NkZXNjIFJlcHJlc2VudHMgYSBHMkNfTG9naW5HYXRlLlxyXG4gICAgICAgICAqIEBpbXBsZW1lbnRzIElHMkNfTG9naW5HYXRlXHJcbiAgICAgICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLklHMkNfTG9naW5HYXRlPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gRzJDX0xvZ2luR2F0ZShwcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzKVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXNba2V5c1tpXV0gIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1trZXlzW2ldXSA9IHByb3BlcnRpZXNba2V5c1tpXV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHMkNfTG9naW5HYXRlIEVycm9yLlxyXG4gICAgICAgICAqIEBtZW1iZXIge251bWJlcn0gRXJyb3JcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5HMkNfTG9naW5HYXRlXHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRzJDX0xvZ2luR2F0ZS5wcm90b3R5cGUuRXJyb3IgPSAwO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHMkNfTG9naW5HYXRlIE1lc3NhZ2UuXHJcbiAgICAgICAgICogQG1lbWJlciB7c3RyaW5nfSBNZXNzYWdlXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuRzJDX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEcyQ19Mb2dpbkdhdGUucHJvdG90eXBlLk1lc3NhZ2UgPSBcIlwiO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHMkNfTG9naW5HYXRlIFBsYXllcklkLlxyXG4gICAgICAgICAqIEBtZW1iZXIge251bWJlcnxMb25nfSBQbGF5ZXJJZFxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkcyQ19Mb2dpbkdhdGVcclxuICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBHMkNfTG9naW5HYXRlLnByb3RvdHlwZS5QbGF5ZXJJZCA9ICR1dGlsLkxvbmcgPyAkdXRpbC5Mb25nLmZyb21CaXRzKDAsMCxmYWxzZSkgOiAwO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGVzIGEgbmV3IEcyQ19Mb2dpbkdhdGUgaW5zdGFuY2UgdXNpbmcgdGhlIHNwZWNpZmllZCBwcm9wZXJ0aWVzLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBjcmVhdGVcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5HMkNfTG9naW5HYXRlXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7bmljZV90cy5JRzJDX0xvZ2luR2F0ZT19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuaWNlX3RzLkcyQ19Mb2dpbkdhdGV9IEcyQ19Mb2dpbkdhdGUgaW5zdGFuY2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBHMkNfTG9naW5HYXRlLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShwcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRzJDX0xvZ2luR2F0ZShwcm9wZXJ0aWVzKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgRzJDX0xvZ2luR2F0ZSBtZXNzYWdlLiBEb2VzIG5vdCBpbXBsaWNpdGx5IHtAbGluayBuaWNlX3RzLkcyQ19Mb2dpbkdhdGUudmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGVuY29kZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkcyQ19Mb2dpbkdhdGVcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLklHMkNfTG9naW5HYXRlfSBtZXNzYWdlIEcyQ19Mb2dpbkdhdGUgbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXHJcbiAgICAgICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEcyQ19Mb2dpbkdhdGUuZW5jb2RlID0gZnVuY3Rpb24gZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikge1xyXG4gICAgICAgICAgICBpZiAoIXdyaXRlcilcclxuICAgICAgICAgICAgICAgIHdyaXRlciA9ICRXcml0ZXIuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLlBsYXllcklkICE9IG51bGwgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobWVzc2FnZSwgXCJQbGF5ZXJJZFwiKSlcclxuICAgICAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMSwgd2lyZVR5cGUgMCA9Ki84KS5pbnQ2NChtZXNzYWdlLlBsYXllcklkKTtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuRXJyb3IgIT0gbnVsbCAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtZXNzYWdlLCBcIkVycm9yXCIpKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCA5MSwgd2lyZVR5cGUgMCA9Ki83MjgpLmludDMyKG1lc3NhZ2UuRXJyb3IpO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5NZXNzYWdlICE9IG51bGwgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobWVzc2FnZSwgXCJNZXNzYWdlXCIpKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCA5Miwgd2lyZVR5cGUgMiA9Ki83MzgpLnN0cmluZyhtZXNzYWdlLk1lc3NhZ2UpO1xyXG4gICAgICAgICAgICByZXR1cm4gd3JpdGVyO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBHMkNfTG9naW5HYXRlIG1lc3NhZ2UsIGxlbmd0aCBkZWxpbWl0ZWQuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIG5pY2VfdHMuRzJDX0xvZ2luR2F0ZS52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuRzJDX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSUcyQ19Mb2dpbkdhdGV9IG1lc3NhZ2UgRzJDX0xvZ2luR2F0ZSBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cclxuICAgICAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRzJDX0xvZ2luR2F0ZS5lbmNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWQobWVzc2FnZSwgd3JpdGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVuY29kZShtZXNzYWdlLCB3cml0ZXIpLmxkZWxpbSgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlY29kZXMgYSBHMkNfTG9naW5HYXRlIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGRlY29kZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkcyQ19Mb2dpbkdhdGVcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGhdIE1lc3NhZ2UgbGVuZ3RoIGlmIGtub3duIGJlZm9yZWhhbmRcclxuICAgICAgICAgKiBAcmV0dXJucyB7bmljZV90cy5HMkNfTG9naW5HYXRlfSBHMkNfTG9naW5HYXRlXHJcbiAgICAgICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcclxuICAgICAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcclxuICAgICAgICAgKi9cclxuICAgICAgICBHMkNfTG9naW5HYXRlLmRlY29kZSA9IGZ1bmN0aW9uIGRlY29kZShyZWFkZXIsIGxlbmd0aCkge1xyXG4gICAgICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcclxuICAgICAgICAgICAgICAgIHJlYWRlciA9ICRSZWFkZXIuY3JlYXRlKHJlYWRlcik7XHJcbiAgICAgICAgICAgIHZhciBlbmQgPSBsZW5ndGggPT09IHVuZGVmaW5lZCA/IHJlYWRlci5sZW4gOiByZWFkZXIucG9zICsgbGVuZ3RoLCBtZXNzYWdlID0gbmV3ICRyb290Lm5pY2VfdHMuRzJDX0xvZ2luR2F0ZSgpO1xyXG4gICAgICAgICAgICB3aGlsZSAocmVhZGVyLnBvcyA8IGVuZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRhZyA9IHJlYWRlci51aW50MzIoKTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodGFnID4+PiAzKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDkxOlxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuRXJyb3IgPSByZWFkZXIuaW50MzIoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgOTI6XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5NZXNzYWdlID0gcmVhZGVyLnN0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuUGxheWVySWQgPSByZWFkZXIuaW50NjQoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyLnNraXBUeXBlKHRhZyAmIDcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlY29kZXMgYSBHMkNfTG9naW5HYXRlIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIsIGxlbmd0aCBkZWxpbWl0ZWQuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZFxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkcyQ19Mb2dpbkdhdGVcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXHJcbiAgICAgICAgICogQHJldHVybnMge25pY2VfdHMuRzJDX0xvZ2luR2F0ZX0gRzJDX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXHJcbiAgICAgICAgICogQHRocm93cyB7JHByb3RvYnVmLnV0aWwuUHJvdG9jb2xFcnJvcn0gSWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRzJDX0xvZ2luR2F0ZS5kZWNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBkZWNvZGVEZWxpbWl0ZWQocmVhZGVyKSB7XHJcbiAgICAgICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxyXG4gICAgICAgICAgICAgICAgcmVhZGVyID0gbmV3ICRSZWFkZXIocmVhZGVyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGVjb2RlKHJlYWRlciwgcmVhZGVyLnVpbnQzMigpKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWZXJpZmllcyBhIEcyQ19Mb2dpbkdhdGUgbWVzc2FnZS5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gdmVyaWZ5XHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuRzJDX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBtZXNzYWdlIFBsYWluIG9iamVjdCB0byB2ZXJpZnlcclxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9IGBudWxsYCBpZiB2YWxpZCwgb3RoZXJ3aXNlIHRoZSByZWFzb24gd2h5IGl0IGlzIG5vdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEcyQ19Mb2dpbkdhdGUudmVyaWZ5ID0gZnVuY3Rpb24gdmVyaWZ5KG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSBcIm9iamVjdFwiIHx8IG1lc3NhZ2UgPT09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJvYmplY3QgZXhwZWN0ZWRcIjtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuRXJyb3IgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiRXJyb3JcIikpXHJcbiAgICAgICAgICAgICAgICBpZiAoISR1dGlsLmlzSW50ZWdlcihtZXNzYWdlLkVycm9yKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJFcnJvcjogaW50ZWdlciBleHBlY3RlZFwiO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5NZXNzYWdlICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIk1lc3NhZ2VcIikpXHJcbiAgICAgICAgICAgICAgICBpZiAoISR1dGlsLmlzU3RyaW5nKG1lc3NhZ2UuTWVzc2FnZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiTWVzc2FnZTogc3RyaW5nIGV4cGVjdGVkXCI7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLlBsYXllcklkICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIlBsYXllcklkXCIpKVxyXG4gICAgICAgICAgICAgICAgaWYgKCEkdXRpbC5pc0ludGVnZXIobWVzc2FnZS5QbGF5ZXJJZCkgJiYgIShtZXNzYWdlLlBsYXllcklkICYmICR1dGlsLmlzSW50ZWdlcihtZXNzYWdlLlBsYXllcklkLmxvdykgJiYgJHV0aWwuaXNJbnRlZ2VyKG1lc3NhZ2UuUGxheWVySWQuaGlnaCkpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlBsYXllcklkOiBpbnRlZ2VyfExvbmcgZXhwZWN0ZWRcIjtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlcyBhIEcyQ19Mb2dpbkdhdGUgbWVzc2FnZSBmcm9tIGEgcGxhaW4gb2JqZWN0LiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byB0aGVpciByZXNwZWN0aXZlIGludGVybmFsIHR5cGVzLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBmcm9tT2JqZWN0XHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuRzJDX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBvYmplY3QgUGxhaW4gb2JqZWN0XHJcbiAgICAgICAgICogQHJldHVybnMge25pY2VfdHMuRzJDX0xvZ2luR2F0ZX0gRzJDX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEcyQ19Mb2dpbkdhdGUuZnJvbU9iamVjdCA9IGZ1bmN0aW9uIGZyb21PYmplY3Qob2JqZWN0KSB7XHJcbiAgICAgICAgICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiAkcm9vdC5uaWNlX3RzLkcyQ19Mb2dpbkdhdGUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IG5ldyAkcm9vdC5uaWNlX3RzLkcyQ19Mb2dpbkdhdGUoKTtcclxuICAgICAgICAgICAgaWYgKG9iamVjdC5FcnJvciAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5FcnJvciA9IG9iamVjdC5FcnJvciB8IDA7XHJcbiAgICAgICAgICAgIGlmIChvYmplY3QuTWVzc2FnZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5NZXNzYWdlID0gU3RyaW5nKG9iamVjdC5NZXNzYWdlKTtcclxuICAgICAgICAgICAgaWYgKG9iamVjdC5QbGF5ZXJJZCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgaWYgKCR1dGlsLkxvbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgKG1lc3NhZ2UuUGxheWVySWQgPSAkdXRpbC5Mb25nLmZyb21WYWx1ZShvYmplY3QuUGxheWVySWQpKS51bnNpZ25lZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9iamVjdC5QbGF5ZXJJZCA9PT0gXCJzdHJpbmdcIilcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLlBsYXllcklkID0gcGFyc2VJbnQob2JqZWN0LlBsYXllcklkLCAxMCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0LlBsYXllcklkID09PSBcIm51bWJlclwiKVxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuUGxheWVySWQgPSBvYmplY3QuUGxheWVySWQ7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0LlBsYXllcklkID09PSBcIm9iamVjdFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuUGxheWVySWQgPSBuZXcgJHV0aWwuTG9uZ0JpdHMob2JqZWN0LlBsYXllcklkLmxvdyA+Pj4gMCwgb2JqZWN0LlBsYXllcklkLmhpZ2ggPj4+IDApLnRvTnVtYmVyKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENyZWF0ZXMgYSBwbGFpbiBvYmplY3QgZnJvbSBhIEcyQ19Mb2dpbkdhdGUgbWVzc2FnZS4gQWxzbyBjb252ZXJ0cyB2YWx1ZXMgdG8gb3RoZXIgdHlwZXMgaWYgc3BlY2lmaWVkLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiB0b09iamVjdFxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkcyQ19Mb2dpbkdhdGVcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLkcyQ19Mb2dpbkdhdGV9IG1lc3NhZ2UgRzJDX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLklDb252ZXJzaW9uT3B0aW9uc30gW29wdGlvbnNdIENvbnZlcnNpb24gb3B0aW9uc1xyXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gUGxhaW4gb2JqZWN0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRzJDX0xvZ2luR2F0ZS50b09iamVjdCA9IGZ1bmN0aW9uIHRvT2JqZWN0KG1lc3NhZ2UsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgaWYgKCFvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHt9O1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0ID0ge307XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmRlZmF1bHRzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJHV0aWwuTG9uZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsb25nID0gbmV3ICR1dGlsLkxvbmcoMCwgMCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC5QbGF5ZXJJZCA9IG9wdGlvbnMubG9uZ3MgPT09IFN0cmluZyA/IGxvbmcudG9TdHJpbmcoKSA6IG9wdGlvbnMubG9uZ3MgPT09IE51bWJlciA/IGxvbmcudG9OdW1iZXIoKSA6IGxvbmc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3QuUGxheWVySWQgPSBvcHRpb25zLmxvbmdzID09PSBTdHJpbmcgPyBcIjBcIiA6IDA7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QuRXJyb3IgPSAwO1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0Lk1lc3NhZ2UgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLlBsYXllcklkICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIlBsYXllcklkXCIpKVxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlLlBsYXllcklkID09PSBcIm51bWJlclwiKVxyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC5QbGF5ZXJJZCA9IG9wdGlvbnMubG9uZ3MgPT09IFN0cmluZyA/IFN0cmluZyhtZXNzYWdlLlBsYXllcklkKSA6IG1lc3NhZ2UuUGxheWVySWQ7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LlBsYXllcklkID0gb3B0aW9ucy5sb25ncyA9PT0gU3RyaW5nID8gJHV0aWwuTG9uZy5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChtZXNzYWdlLlBsYXllcklkKSA6IG9wdGlvbnMubG9uZ3MgPT09IE51bWJlciA/IG5ldyAkdXRpbC5Mb25nQml0cyhtZXNzYWdlLlBsYXllcklkLmxvdyA+Pj4gMCwgbWVzc2FnZS5QbGF5ZXJJZC5oaWdoID4+PiAwKS50b051bWJlcigpIDogbWVzc2FnZS5QbGF5ZXJJZDtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuRXJyb3IgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiRXJyb3JcIikpXHJcbiAgICAgICAgICAgICAgICBvYmplY3QuRXJyb3IgPSBtZXNzYWdlLkVycm9yO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5NZXNzYWdlICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIk1lc3NhZ2VcIikpXHJcbiAgICAgICAgICAgICAgICBvYmplY3QuTWVzc2FnZSA9IG1lc3NhZ2UuTWVzc2FnZTtcclxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb252ZXJ0cyB0aGlzIEcyQ19Mb2dpbkdhdGUgdG8gSlNPTi5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gdG9KU09OXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuRzJDX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gSlNPTiBvYmplY3RcclxuICAgICAgICAgKi9cclxuICAgICAgICBHMkNfTG9naW5HYXRlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLnRvT2JqZWN0KHRoaXMsICRwcm90b2J1Zi51dGlsLnRvSlNPTk9wdGlvbnMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBHMkNfTG9naW5HYXRlO1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICBuaWNlX3RzLkMyR1NfVGVzdCA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJvcGVydGllcyBvZiBhIEMyR1NfVGVzdC5cclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90c1xyXG4gICAgICAgICAqIEBpbnRlcmZhY2UgSUMyR1NfVGVzdFxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfG51bGx9IFt0ZXN0SURdIEMyR1NfVGVzdCB0ZXN0SURcclxuICAgICAgICAgKiBAcHJvcGVydHkge3N0cmluZ3xudWxsfSBbdGVzdE5hbWVdIEMyR1NfVGVzdCB0ZXN0TmFtZVxyXG4gICAgICAgICAqL1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb25zdHJ1Y3RzIGEgbmV3IEMyR1NfVGVzdC5cclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90c1xyXG4gICAgICAgICAqIEBjbGFzc2Rlc2MgUmVwcmVzZW50cyBhIEMyR1NfVGVzdC5cclxuICAgICAgICAgKiBAaW1wbGVtZW50cyBJQzJHU19UZXN0XHJcbiAgICAgICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLklDMkdTX1Rlc3Q9fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBDMkdTX1Rlc3QocHJvcGVydGllcykge1xyXG4gICAgICAgICAgICBpZiAocHJvcGVydGllcylcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGtleXMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKSwgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzW2tleXNbaV1dICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNba2V5c1tpXV0gPSBwcm9wZXJ0aWVzW2tleXNbaV1dO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQzJHU19UZXN0IHRlc3RJRC5cclxuICAgICAgICAgKiBAbWVtYmVyIHtudW1iZXJ9IHRlc3RJRFxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyR1NfVGVzdFxyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyR1NfVGVzdC5wcm90b3R5cGUudGVzdElEID0gMDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQzJHU19UZXN0IHRlc3ROYW1lLlxyXG4gICAgICAgICAqIEBtZW1iZXIge3N0cmluZ30gdGVzdE5hbWVcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5DMkdTX1Rlc3RcclxuICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBDMkdTX1Rlc3QucHJvdG90eXBlLnRlc3ROYW1lID0gXCJcIjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlcyBhIG5ldyBDMkdTX1Rlc3QgaW5zdGFuY2UgdXNpbmcgdGhlIHNwZWNpZmllZCBwcm9wZXJ0aWVzLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBjcmVhdGVcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5DMkdTX1Rlc3RcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLklDMkdTX1Rlc3Q9fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcclxuICAgICAgICAgKiBAcmV0dXJucyB7bmljZV90cy5DMkdTX1Rlc3R9IEMyR1NfVGVzdCBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyR1NfVGVzdC5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUocHJvcGVydGllcykge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEMyR1NfVGVzdChwcm9wZXJ0aWVzKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgQzJHU19UZXN0IG1lc3NhZ2UuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIG5pY2VfdHMuQzJHU19UZXN0LnZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBlbmNvZGVcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5DMkdTX1Rlc3RcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLklDMkdTX1Rlc3R9IG1lc3NhZ2UgQzJHU19UZXN0IG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxyXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xyXG4gICAgICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBDMkdTX1Rlc3QuZW5jb2RlID0gZnVuY3Rpb24gZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikge1xyXG4gICAgICAgICAgICBpZiAoIXdyaXRlcilcclxuICAgICAgICAgICAgICAgIHdyaXRlciA9ICRXcml0ZXIuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLnRlc3RJRCAhPSBudWxsICYmIE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1lc3NhZ2UsIFwidGVzdElEXCIpKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAxLCB3aXJlVHlwZSAwID0qLzgpLmludDMyKG1lc3NhZ2UudGVzdElEKTtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UudGVzdE5hbWUgIT0gbnVsbCAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtZXNzYWdlLCBcInRlc3ROYW1lXCIpKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAyLCB3aXJlVHlwZSAyID0qLzE4KS5zdHJpbmcobWVzc2FnZS50ZXN0TmFtZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB3cml0ZXI7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIEMyR1NfVGVzdCBtZXNzYWdlLCBsZW5ndGggZGVsaW1pdGVkLiBEb2VzIG5vdCBpbXBsaWNpdGx5IHtAbGluayBuaWNlX3RzLkMyR1NfVGVzdC52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJHU19UZXN0XHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7bmljZV90cy5JQzJHU19UZXN0fSBtZXNzYWdlIEMyR1NfVGVzdCBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cclxuICAgICAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJHU19UZXN0LmVuY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZChtZXNzYWdlLCB3cml0ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikubGRlbGltKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGVjb2RlcyBhIEMyR1NfVGVzdCBtZXNzYWdlIGZyb20gdGhlIHNwZWNpZmllZCByZWFkZXIgb3IgYnVmZmVyLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBkZWNvZGVcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5DMkdTX1Rlc3RcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGhdIE1lc3NhZ2UgbGVuZ3RoIGlmIGtub3duIGJlZm9yZWhhbmRcclxuICAgICAgICAgKiBAcmV0dXJucyB7bmljZV90cy5DMkdTX1Rlc3R9IEMyR1NfVGVzdFxyXG4gICAgICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXHJcbiAgICAgICAgICogQHRocm93cyB7JHByb3RvYnVmLnV0aWwuUHJvdG9jb2xFcnJvcn0gSWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJHU19UZXN0LmRlY29kZSA9IGZ1bmN0aW9uIGRlY29kZShyZWFkZXIsIGxlbmd0aCkge1xyXG4gICAgICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcclxuICAgICAgICAgICAgICAgIHJlYWRlciA9ICRSZWFkZXIuY3JlYXRlKHJlYWRlcik7XHJcbiAgICAgICAgICAgIHZhciBlbmQgPSBsZW5ndGggPT09IHVuZGVmaW5lZCA/IHJlYWRlci5sZW4gOiByZWFkZXIucG9zICsgbGVuZ3RoLCBtZXNzYWdlID0gbmV3ICRyb290Lm5pY2VfdHMuQzJHU19UZXN0KCk7XHJcbiAgICAgICAgICAgIHdoaWxlIChyZWFkZXIucG9zIDwgZW5kKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGFnID0gcmVhZGVyLnVpbnQzMigpO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0YWcgPj4+IDMpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLnRlc3RJRCA9IHJlYWRlci5pbnQzMigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UudGVzdE5hbWUgPSByZWFkZXIuc3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRlci5za2lwVHlwZSh0YWcgJiA3KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWNvZGVzIGEgQzJHU19UZXN0IG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIsIGxlbmd0aCBkZWxpbWl0ZWQuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZFxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyR1NfVGVzdFxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5SZWFkZXJ8VWludDhBcnJheX0gcmVhZGVyIFJlYWRlciBvciBidWZmZXIgdG8gZGVjb2RlIGZyb21cclxuICAgICAgICAgKiBAcmV0dXJucyB7bmljZV90cy5DMkdTX1Rlc3R9IEMyR1NfVGVzdFxyXG4gICAgICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXHJcbiAgICAgICAgICogQHRocm93cyB7JHByb3RvYnVmLnV0aWwuUHJvdG9jb2xFcnJvcn0gSWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJHU19UZXN0LmRlY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZChyZWFkZXIpIHtcclxuICAgICAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXHJcbiAgICAgICAgICAgICAgICByZWFkZXIgPSBuZXcgJFJlYWRlcihyZWFkZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZWNvZGUocmVhZGVyLCByZWFkZXIudWludDMyKCkpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZlcmlmaWVzIGEgQzJHU19UZXN0IG1lc3NhZ2UuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIHZlcmlmeVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyR1NfVGVzdFxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBtZXNzYWdlIFBsYWluIG9iamVjdCB0byB2ZXJpZnlcclxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9IGBudWxsYCBpZiB2YWxpZCwgb3RoZXJ3aXNlIHRoZSByZWFzb24gd2h5IGl0IGlzIG5vdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyR1NfVGVzdC52ZXJpZnkgPSBmdW5jdGlvbiB2ZXJpZnkobWVzc2FnZSkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgIT09IFwib2JqZWN0XCIgfHwgbWVzc2FnZSA9PT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIm9iamVjdCBleHBlY3RlZFwiO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS50ZXN0SUQgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwidGVzdElEXCIpKVxyXG4gICAgICAgICAgICAgICAgaWYgKCEkdXRpbC5pc0ludGVnZXIobWVzc2FnZS50ZXN0SUQpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInRlc3RJRDogaW50ZWdlciBleHBlY3RlZFwiO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS50ZXN0TmFtZSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJ0ZXN0TmFtZVwiKSlcclxuICAgICAgICAgICAgICAgIGlmICghJHV0aWwuaXNTdHJpbmcobWVzc2FnZS50ZXN0TmFtZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidGVzdE5hbWU6IHN0cmluZyBleHBlY3RlZFwiO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGVzIGEgQzJHU19UZXN0IG1lc3NhZ2UgZnJvbSBhIHBsYWluIG9iamVjdC4gQWxzbyBjb252ZXJ0cyB2YWx1ZXMgdG8gdGhlaXIgcmVzcGVjdGl2ZSBpbnRlcm5hbCB0eXBlcy5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZnJvbU9iamVjdFxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyR1NfVGVzdFxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBvYmplY3QgUGxhaW4gb2JqZWN0XHJcbiAgICAgICAgICogQHJldHVybnMge25pY2VfdHMuQzJHU19UZXN0fSBDMkdTX1Rlc3RcclxuICAgICAgICAgKi9cclxuICAgICAgICBDMkdTX1Rlc3QuZnJvbU9iamVjdCA9IGZ1bmN0aW9uIGZyb21PYmplY3Qob2JqZWN0KSB7XHJcbiAgICAgICAgICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiAkcm9vdC5uaWNlX3RzLkMyR1NfVGVzdClcclxuICAgICAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gbmV3ICRyb290Lm5pY2VfdHMuQzJHU19UZXN0KCk7XHJcbiAgICAgICAgICAgIGlmIChvYmplY3QudGVzdElEICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnRlc3RJRCA9IG9iamVjdC50ZXN0SUQgfCAwO1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0LnRlc3ROYW1lICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnRlc3ROYW1lID0gU3RyaW5nKG9iamVjdC50ZXN0TmFtZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENyZWF0ZXMgYSBwbGFpbiBvYmplY3QgZnJvbSBhIEMyR1NfVGVzdCBtZXNzYWdlLiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byBvdGhlciB0eXBlcyBpZiBzcGVjaWZpZWQuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIHRvT2JqZWN0XHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJHU19UZXN0XHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7bmljZV90cy5DMkdTX1Rlc3R9IG1lc3NhZ2UgQzJHU19UZXN0XHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuSUNvbnZlcnNpb25PcHRpb25zfSBbb3B0aW9uc10gQ29udmVyc2lvbiBvcHRpb25zXHJcbiAgICAgICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBQbGFpbiBvYmplY3RcclxuICAgICAgICAgKi9cclxuICAgICAgICBDMkdTX1Rlc3QudG9PYmplY3QgPSBmdW5jdGlvbiB0b09iamVjdChtZXNzYWdlLCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIGlmICghb3B0aW9ucylcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB7fTtcclxuICAgICAgICAgICAgdmFyIG9iamVjdCA9IHt9O1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5kZWZhdWx0cykge1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0LnRlc3RJRCA9IDA7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QudGVzdE5hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLnRlc3RJRCAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJ0ZXN0SURcIikpXHJcbiAgICAgICAgICAgICAgICBvYmplY3QudGVzdElEID0gbWVzc2FnZS50ZXN0SUQ7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLnRlc3ROYW1lICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInRlc3ROYW1lXCIpKVxyXG4gICAgICAgICAgICAgICAgb2JqZWN0LnRlc3ROYW1lID0gbWVzc2FnZS50ZXN0TmFtZTtcclxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb252ZXJ0cyB0aGlzIEMyR1NfVGVzdCB0byBKU09OLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiB0b0pTT05cclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5DMkdTX1Rlc3RcclxuICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IEpTT04gb2JqZWN0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJHU19UZXN0LnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLnRvT2JqZWN0KHRoaXMsICRwcm90b2J1Zi51dGlsLnRvSlNPTk9wdGlvbnMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBDMkdTX1Rlc3Q7XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIG5pY2VfdHMuR1MyQ19UZXN0ID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQcm9wZXJ0aWVzIG9mIGEgR1MyQ19UZXN0LlxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzXHJcbiAgICAgICAgICogQGludGVyZmFjZSBJR1MyQ19UZXN0XHJcbiAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ8bnVsbH0gW0Vycm9yXSBHUzJDX1Rlc3QgRXJyb3JcclxuICAgICAgICAgKiBAcHJvcGVydHkge3N0cmluZ3xudWxsfSBbTWVzc2FnZV0gR1MyQ19UZXN0IE1lc3NhZ2VcclxuICAgICAgICAgKiBAcHJvcGVydHkge3N0cmluZ3xudWxsfSBbdGVzdFJlc3BvbnNlXSBHUzJDX1Rlc3QgdGVzdFJlc3BvbnNlXHJcbiAgICAgICAgICovXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnN0cnVjdHMgYSBuZXcgR1MyQ19UZXN0LlxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzXHJcbiAgICAgICAgICogQGNsYXNzZGVzYyBSZXByZXNlbnRzIGEgR1MyQ19UZXN0LlxyXG4gICAgICAgICAqIEBpbXBsZW1lbnRzIElHUzJDX1Rlc3RcclxuICAgICAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSUdTMkNfVGVzdD19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIEdTMkNfVGVzdChwcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzKVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXNba2V5c1tpXV0gIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1trZXlzW2ldXSA9IHByb3BlcnRpZXNba2V5c1tpXV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHUzJDX1Rlc3QgRXJyb3IuXHJcbiAgICAgICAgICogQG1lbWJlciB7bnVtYmVyfSBFcnJvclxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkdTMkNfVGVzdFxyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEdTMkNfVGVzdC5wcm90b3R5cGUuRXJyb3IgPSAwO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHUzJDX1Rlc3QgTWVzc2FnZS5cclxuICAgICAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IE1lc3NhZ2VcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5HUzJDX1Rlc3RcclxuICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBHUzJDX1Rlc3QucHJvdG90eXBlLk1lc3NhZ2UgPSBcIlwiO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHUzJDX1Rlc3QgdGVzdFJlc3BvbnNlLlxyXG4gICAgICAgICAqIEBtZW1iZXIge3N0cmluZ30gdGVzdFJlc3BvbnNlXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuR1MyQ19UZXN0XHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgR1MyQ19UZXN0LnByb3RvdHlwZS50ZXN0UmVzcG9uc2UgPSBcIlwiO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGVzIGEgbmV3IEdTMkNfVGVzdCBpbnN0YW5jZSB1c2luZyB0aGUgc3BlY2lmaWVkIHByb3BlcnRpZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGNyZWF0ZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkdTMkNfVGVzdFxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSUdTMkNfVGVzdD19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuaWNlX3RzLkdTMkNfVGVzdH0gR1MyQ19UZXN0IGluc3RhbmNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgR1MyQ19UZXN0LmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShwcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR1MyQ19UZXN0KHByb3BlcnRpZXMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBHUzJDX1Rlc3QgbWVzc2FnZS4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgbmljZV90cy5HUzJDX1Rlc3QudmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGVuY29kZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkdTMkNfVGVzdFxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSUdTMkNfVGVzdH0gbWVzc2FnZSBHUzJDX1Rlc3QgbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXHJcbiAgICAgICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEdTMkNfVGVzdC5lbmNvZGUgPSBmdW5jdGlvbiBlbmNvZGUobWVzc2FnZSwgd3JpdGVyKSB7XHJcbiAgICAgICAgICAgIGlmICghd3JpdGVyKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVyID0gJFdyaXRlci5jcmVhdGUoKTtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UudGVzdFJlc3BvbnNlICE9IG51bGwgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobWVzc2FnZSwgXCJ0ZXN0UmVzcG9uc2VcIikpXHJcbiAgICAgICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDEsIHdpcmVUeXBlIDIgPSovMTApLnN0cmluZyhtZXNzYWdlLnRlc3RSZXNwb25zZSk7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLkVycm9yICE9IG51bGwgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobWVzc2FnZSwgXCJFcnJvclwiKSlcclxuICAgICAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgOTEsIHdpcmVUeXBlIDAgPSovNzI4KS5pbnQzMihtZXNzYWdlLkVycm9yKTtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuTWVzc2FnZSAhPSBudWxsICYmIE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1lc3NhZ2UsIFwiTWVzc2FnZVwiKSlcclxuICAgICAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgOTIsIHdpcmVUeXBlIDIgPSovNzM4KS5zdHJpbmcobWVzc2FnZS5NZXNzYWdlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHdyaXRlcjtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgR1MyQ19UZXN0IG1lc3NhZ2UsIGxlbmd0aCBkZWxpbWl0ZWQuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIG5pY2VfdHMuR1MyQ19UZXN0LnZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWRcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5HUzJDX1Rlc3RcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLklHUzJDX1Rlc3R9IG1lc3NhZ2UgR1MyQ19UZXN0IG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxyXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xyXG4gICAgICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBHUzJDX1Rlc3QuZW5jb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkKG1lc3NhZ2UsIHdyaXRlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbmNvZGUobWVzc2FnZSwgd3JpdGVyKS5sZGVsaW0oKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWNvZGVzIGEgR1MyQ19UZXN0IG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGRlY29kZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkdTMkNfVGVzdFxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5SZWFkZXJ8VWludDhBcnJheX0gcmVhZGVyIFJlYWRlciBvciBidWZmZXIgdG8gZGVjb2RlIGZyb21cclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aF0gTWVzc2FnZSBsZW5ndGggaWYga25vd24gYmVmb3JlaGFuZFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuaWNlX3RzLkdTMkNfVGVzdH0gR1MyQ19UZXN0XHJcbiAgICAgICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcclxuICAgICAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcclxuICAgICAgICAgKi9cclxuICAgICAgICBHUzJDX1Rlc3QuZGVjb2RlID0gZnVuY3Rpb24gZGVjb2RlKHJlYWRlciwgbGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxyXG4gICAgICAgICAgICAgICAgcmVhZGVyID0gJFJlYWRlci5jcmVhdGUocmVhZGVyKTtcclxuICAgICAgICAgICAgdmFyIGVuZCA9IGxlbmd0aCA9PT0gdW5kZWZpbmVkID8gcmVhZGVyLmxlbiA6IHJlYWRlci5wb3MgKyBsZW5ndGgsIG1lc3NhZ2UgPSBuZXcgJHJvb3QubmljZV90cy5HUzJDX1Rlc3QoKTtcclxuICAgICAgICAgICAgd2hpbGUgKHJlYWRlci5wb3MgPCBlbmQpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0YWcgPSByZWFkZXIudWludDMyKCk7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRhZyA+Pj4gMykge1xyXG4gICAgICAgICAgICAgICAgY2FzZSA5MTpcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLkVycm9yID0gcmVhZGVyLmludDMyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDkyOlxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuTWVzc2FnZSA9IHJlYWRlci5zdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLnRlc3RSZXNwb25zZSA9IHJlYWRlci5zdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyLnNraXBUeXBlKHRhZyAmIDcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlY29kZXMgYSBHUzJDX1Rlc3QgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlciwgbGVuZ3RoIGRlbGltaXRlZC5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuR1MyQ19UZXN0XHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuaWNlX3RzLkdTMkNfVGVzdH0gR1MyQ19UZXN0XHJcbiAgICAgICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcclxuICAgICAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcclxuICAgICAgICAgKi9cclxuICAgICAgICBHUzJDX1Rlc3QuZGVjb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkKHJlYWRlcikge1xyXG4gICAgICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcclxuICAgICAgICAgICAgICAgIHJlYWRlciA9IG5ldyAkUmVhZGVyKHJlYWRlcik7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlY29kZShyZWFkZXIsIHJlYWRlci51aW50MzIoKSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVmVyaWZpZXMgYSBHUzJDX1Rlc3QgbWVzc2FnZS5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gdmVyaWZ5XHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuR1MyQ19UZXN0XHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG1lc3NhZ2UgUGxhaW4gb2JqZWN0IHRvIHZlcmlmeVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH0gYG51bGxgIGlmIHZhbGlkLCBvdGhlcndpc2UgdGhlIHJlYXNvbiB3aHkgaXQgaXMgbm90XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgR1MyQ19UZXN0LnZlcmlmeSA9IGZ1bmN0aW9uIHZlcmlmeShtZXNzYWdlKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSAhPT0gXCJvYmplY3RcIiB8fCBtZXNzYWdlID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwib2JqZWN0IGV4cGVjdGVkXCI7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLkVycm9yICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIkVycm9yXCIpKVxyXG4gICAgICAgICAgICAgICAgaWYgKCEkdXRpbC5pc0ludGVnZXIobWVzc2FnZS5FcnJvcikpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiRXJyb3I6IGludGVnZXIgZXhwZWN0ZWRcIjtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuTWVzc2FnZSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJNZXNzYWdlXCIpKVxyXG4gICAgICAgICAgICAgICAgaWYgKCEkdXRpbC5pc1N0cmluZyhtZXNzYWdlLk1lc3NhZ2UpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIk1lc3NhZ2U6IHN0cmluZyBleHBlY3RlZFwiO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS50ZXN0UmVzcG9uc2UgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwidGVzdFJlc3BvbnNlXCIpKVxyXG4gICAgICAgICAgICAgICAgaWYgKCEkdXRpbC5pc1N0cmluZyhtZXNzYWdlLnRlc3RSZXNwb25zZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidGVzdFJlc3BvbnNlOiBzdHJpbmcgZXhwZWN0ZWRcIjtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlcyBhIEdTMkNfVGVzdCBtZXNzYWdlIGZyb20gYSBwbGFpbiBvYmplY3QuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIHRoZWlyIHJlc3BlY3RpdmUgaW50ZXJuYWwgdHlwZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGZyb21PYmplY3RcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5HUzJDX1Rlc3RcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gb2JqZWN0IFBsYWluIG9iamVjdFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuaWNlX3RzLkdTMkNfVGVzdH0gR1MyQ19UZXN0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgR1MyQ19UZXN0LmZyb21PYmplY3QgPSBmdW5jdGlvbiBmcm9tT2JqZWN0KG9iamVjdCkge1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgJHJvb3QubmljZV90cy5HUzJDX1Rlc3QpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IG5ldyAkcm9vdC5uaWNlX3RzLkdTMkNfVGVzdCgpO1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0LkVycm9yICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLkVycm9yID0gb2JqZWN0LkVycm9yIHwgMDtcclxuICAgICAgICAgICAgaWYgKG9iamVjdC5NZXNzYWdlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLk1lc3NhZ2UgPSBTdHJpbmcob2JqZWN0Lk1lc3NhZ2UpO1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0LnRlc3RSZXNwb25zZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZS50ZXN0UmVzcG9uc2UgPSBTdHJpbmcob2JqZWN0LnRlc3RSZXNwb25zZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENyZWF0ZXMgYSBwbGFpbiBvYmplY3QgZnJvbSBhIEdTMkNfVGVzdCBtZXNzYWdlLiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byBvdGhlciB0eXBlcyBpZiBzcGVjaWZpZWQuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIHRvT2JqZWN0XHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuR1MyQ19UZXN0XHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7bmljZV90cy5HUzJDX1Rlc3R9IG1lc3NhZ2UgR1MyQ19UZXN0XHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuSUNvbnZlcnNpb25PcHRpb25zfSBbb3B0aW9uc10gQ29udmVyc2lvbiBvcHRpb25zXHJcbiAgICAgICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBQbGFpbiBvYmplY3RcclxuICAgICAgICAgKi9cclxuICAgICAgICBHUzJDX1Rlc3QudG9PYmplY3QgPSBmdW5jdGlvbiB0b09iamVjdChtZXNzYWdlLCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIGlmICghb3B0aW9ucylcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB7fTtcclxuICAgICAgICAgICAgdmFyIG9iamVjdCA9IHt9O1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5kZWZhdWx0cykge1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0LnRlc3RSZXNwb25zZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QuRXJyb3IgPSAwO1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0Lk1lc3NhZ2UgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLnRlc3RSZXNwb25zZSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJ0ZXN0UmVzcG9uc2VcIikpXHJcbiAgICAgICAgICAgICAgICBvYmplY3QudGVzdFJlc3BvbnNlID0gbWVzc2FnZS50ZXN0UmVzcG9uc2U7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLkVycm9yICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIkVycm9yXCIpKVxyXG4gICAgICAgICAgICAgICAgb2JqZWN0LkVycm9yID0gbWVzc2FnZS5FcnJvcjtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuTWVzc2FnZSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJNZXNzYWdlXCIpKVxyXG4gICAgICAgICAgICAgICAgb2JqZWN0Lk1lc3NhZ2UgPSBtZXNzYWdlLk1lc3NhZ2U7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ29udmVydHMgdGhpcyBHUzJDX1Rlc3QgdG8gSlNPTi5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gdG9KU09OXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuR1MyQ19UZXN0XHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBKU09OIG9iamVjdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEdTMkNfVGVzdC5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci50b09iamVjdCh0aGlzLCAkcHJvdG9idWYudXRpbC50b0pTT05PcHRpb25zKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gR1MyQ19UZXN0O1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICByZXR1cm4gbmljZV90cztcclxufSkoKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gJHJvb3Q7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNzaGFycFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwdWVydHNcIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgR2FtZUxhdW5jaCwgSnNNYW5hZ2VyLCBVbml0eUVuZ2luZSB9IGZyb20gXCJjc2hhcnBcIjtcclxuaW1wb3J0IHsgQ29tbW9uVUkgfSBmcm9tIFwiLi9kYXRhL3VpL2NvbW1vblwiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi9mcmFtZXdvcmsvbG9nZ2VyL0xvZ2dlclwiO1xyXG5pbXBvcnQgeyBTY2VuZURlZiB9IGZyb20gXCIuL2ZyYW1ld29yay9zY2VuZS9TY2VuZURlZlwiO1xyXG5pbXBvcnQgeyBTIH0gZnJvbSBcIi4vZ2xvYmFsL0dhbWVDb25maWdcIjtcclxuaW1wb3J0IHsgVW5pdFRlc3QgfSBmcm9tIFwiLi91bml0dGVzdC9Vbml0VGVzdFwiO1xyXG5cclxuXHJcbmNsYXNzIEdhbWVNYWlue1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIEpzTWFuYWdlci5JbnN0YW5jZS5Kc09uQXBwbGljYXRpb25RdWl0ID0gKCkgPT4gdGhpcy5vbkFwcGxpY2F0aW9uUXVpdCgpO1xyXG4gICAgICAgIEpzTWFuYWdlci5JbnN0YW5jZS5Kc09uRGlzcG9zZSA9ICgpID0+IHRoaXMub25EaXNwb3NlKCk7XHJcbiAgICAgICAgSnNNYW5hZ2VyLkluc3RhbmNlLkpzVXBkYXRlID0gKGRlbHRhOm51bWJlcikgPT4gdGhpcy51cGRhdGUoZGVsdGEpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgYXN5bmMgc3RhcnQoKXtcclxuICAgICAgICBVbml0eUVuZ2luZS5EZWJ1Zy5Mb2coJ0hlbGxwIFdvcmQhMjIyMjIyNCcpXHJcbiAgICAgICAgLy/liqDovb3pgJrnlKhGYWlyeUdVSei1hOa6kFxyXG4gICAgICAgIGNvbnNvbGUubG9nKENvbW1vblVJLlBhY2thZ2VOYW1lKVxyXG4gICAgICAgIGF3YWl0IFMuUmVzTWFuYWdlci5sb2FkRmFpcnlHVUlQYWNrYWdlKENvbW1vblVJLlBhY2thZ2VOYW1lKTtcclxuICAgICAgICAvLyBKU09OLnBhcnNlKCdhYScpO1xyXG4gICAgICAgIC8vZG8gVW5pdCBUZXN0XHJcbiAgICAgICAgLy8gVW5pdFRlc3QuZG9UZXN0KCk7XHJcblxyXG4gICAgICAgIC8v6L+b5YWl55m75b2V5qih5Z2XXHJcbiAgICAgICAgYXdhaXQgUy5TY2VuZU1hbmFnZXIubG9hZFNjZW5lKFNjZW5lRGVmLkdhbWVTdGFydCk7XHJcblxyXG4gICAgICAgIC8vSlPlkK/liqjlrozmiJDvvIzpgJrnn6VDI+WxglxyXG4gICAgICAgIEdhbWVMYXVuY2guSW5zdGFuY2UuSnNMdWFuY2hGaW5pc2goKTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIG9uQXBwbGljYXRpb25RdWl0KCk6dm9pZCB7XHJcbiAgICAgICAgUy5HYW1lT2JqZWN0UG9vbC5jbGVhbnVwKHRydWUpO1xyXG4gICAgICAgIExvZ2dlci5sb2coXCJHYW1lIG9uQXBwbGljYXRpb25RdWl0IGluIEpTLi4uLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZShkZWx0YTpudW1iZXIpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhkZWx0YSlcclxuICAgICAgICBTLlVJTWFuYWdlci51cGRhdGUoZGVsdGEpXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBvbkRpc3Bvc2UoKTp2b2lkIHtcclxuICAgICAgICBMb2dnZXIubG9nKFwiR2FtZSBvbkRpc3Bvc2UgaW4gSlMuLi4uXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbm5ldyBHYW1lTWFpbigpLnN0YXJ0KCk7XHJcblxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=