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
FlyBirdUI.UIBird = "Bird";


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

/***/ "./src/framework/common/Random.ts":
/*!****************************************!*\
  !*** ./src/framework/common/Random.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Random": () => (/* binding */ Random)
/* harmony export */ });
class Random {
}
Random.random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);


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
/* harmony import */ var _SceneDef__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SceneDef */ "./src/framework/scene/SceneDef.ts");
/* harmony import */ var _game_module_gamestart_scene_GameStartScene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game/module/gamestart/scene/GameStartScene */ "./src/game/module/gamestart/scene/GameStartScene.ts");
/* harmony import */ var _game_module_flybird_scene_FlyBirdScene__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../game/module/flybird/scene/FlyBirdScene */ "./src/game/module/flybird/scene/FlyBirdScene.ts");



class SceneFactory {
    static createScene(sceneName) {
        let scene = null;
        switch (sceneName) {
            case _SceneDef__WEBPACK_IMPORTED_MODULE_0__.SceneDef.GameStart:
                scene = new _game_module_gamestart_scene_GameStartScene__WEBPACK_IMPORTED_MODULE_1__.GameStartScene();
                break;
            case _SceneDef__WEBPACK_IMPORTED_MODULE_0__.SceneDef.FlyBird:
                scene = new _game_module_flybird_scene_FlyBirdScene__WEBPACK_IMPORTED_MODULE_2__.FlyBirdScene();
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

/***/ "./src/framework/ui/UIWindow.ts":
/*!**************************************!*\
  !*** ./src/framework/ui/UIWindow.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UIWindow": () => (/* binding */ UIWindow)
/* harmony export */ });
/* harmony import */ var _UIPanel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UIPanel */ "./src/framework/ui/UIPanel.ts");
/* harmony import */ var _UIDefine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UIDefine */ "./src/framework/ui/UIDefine.ts");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! csharp */ "csharp");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(csharp__WEBPACK_IMPORTED_MODULE_2__);



class UIWindow extends _UIPanel__WEBPACK_IMPORTED_MODULE_0__.UIPanel {
    get uiType() {
        return _UIDefine__WEBPACK_IMPORTED_MODULE_1__.UITypeDef.Window;
    }
    onAwake() {
        this.m_btnClose = this.fui.GetChild(_UIDefine__WEBPACK_IMPORTED_MODULE_1__.UIComDefs.WindowCloseBtn);
    }
    onShow(arg) {
        this.fui.x = csharp__WEBPACK_IMPORTED_MODULE_2__.FairyGUI.GRoot.inst.width / 2 - this.fui.width / 2;
        this.fui.y = csharp__WEBPACK_IMPORTED_MODULE_2__.FairyGUI.GRoot.inst.height / 2 - this.fui.height / 2;
        if (this.m_btnClose != undefined) {
            this.m_btnClose.onClick.Add(this.onBtnClose);
        }
    }
    onClose(arg) {
        if (this.m_btnClose != undefined) {
            this.m_btnClose.onClick.Remove(this.onBtnClose);
        }
    }
    onBtnClose() {
        this.close(0);
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
/* harmony import */ var _framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../framework/common/NiceDecorator */ "./src/framework/common/NiceDecorator.ts");
/* harmony import */ var _framework_ui_UIWindow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../framework/ui/UIWindow */ "./src/framework/ui/UIWindow.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


class UIFlyBirdOverWindow extends _framework_ui_UIWindow__WEBPACK_IMPORTED_MODULE_1__.UIWindow {
    onAwake() {
        this.btn_reStart.onClick.Set(() => {
            this.click_btn_reStart();
        });
    }
    onShow(vo) {
        this.txt_BestScore.text = vo.bestScore.toString();
        this.txt_Score.text = vo.score.toString();
        this.reStartFunc = vo.reStartFunc;
        let medalPath;
        if (vo.score <= 3) {
            medalPath = "ui://FlyBird/medals_1";
        }
        else if (vo.score <= 8) {
            medalPath = "ui://FlyBird/medals_2";
        }
        else if (vo.score <= 15) {
            medalPath = "ui://FlyBird/medals_3";
        }
        else {
            medalPath = "ui://FlyBird/medals_4";
        }
        this.load_medal.url = medalPath;
    }
    onClose(arg) {
    }
    async click_btn_reStart() {
        this.close();
        this.reStartFunc();
    }
    TurnInTween(tweener) {
        console.log(tweener);
        if (tweener) {
            let v = tweener.value.x;
        }
    }
}
__decorate([
    (0,_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_0__.binder)("load_medal")
], UIFlyBirdOverWindow.prototype, "load_medal", void 0);
__decorate([
    (0,_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_0__.binder)("txt_Score")
], UIFlyBirdOverWindow.prototype, "txt_Score", void 0);
__decorate([
    (0,_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_0__.binder)("txt_BestScore")
], UIFlyBirdOverWindow.prototype, "txt_BestScore", void 0);
__decorate([
    (0,_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_0__.binder)("btn_reStart")
], UIFlyBirdOverWindow.prototype, "btn_reStart", void 0);


/***/ }),

/***/ "./src/game/module/flybird/item/Bird.ts":
/*!**********************************************!*\
  !*** ./src/game/module/flybird/item/Bird.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Bird": () => (/* binding */ Bird)
/* harmony export */ });
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! csharp */ "csharp");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(csharp__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _data_ui_FlyBird__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../data/ui/FlyBird */ "./src/data/ui/FlyBird.ts");
/* harmony import */ var _framework_common_List__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../framework/common/List */ "./src/framework/common/List.ts");
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../global/GameConfig */ "./src/global/GameConfig.ts");




class Bird {
    constructor() {
        /**小鸟状态 */
        this.isUp = false;
        /**点击后弹起时间 */
        this.upTime = 0.3;
        /**点击后弹起速度 */
        this.upSpeed = -400;
        /**下落速度 */
        this.downSpeed = 300;
        this.birdTween = new _framework_common_List__WEBPACK_IMPORTED_MODULE_2__.List();
        this.objBird = csharp__WEBPACK_IMPORTED_MODULE_0__.FairyGUI.UIPackage.CreateObject(_data_ui_FlyBird__WEBPACK_IMPORTED_MODULE_1__.FlyBirdUI.PackageName, _data_ui_FlyBird__WEBPACK_IMPORTED_MODULE_1__.FlyBirdUI.UIBird).asCom;
        this.objBird.touchable = false;
    }
    Dispose() {
        this.objBird.Dispose();
    }
    flyUp() {
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_3__.S.AudioManager.Play("FlyBird/Music/fly.wav");
        this.isUp = true;
        this.birdTween.forEach(element => {
            element.Kill(false);
        });
        this.birdTween.clear();
        let tw1 = this.objBird.TweenRotate(-30, 0.2);
        this.birdTween.add(tw1);
        let tw2 = csharp__WEBPACK_IMPORTED_MODULE_0__.FairyGUI.GTween.DelayedCall(this.upTime).SetTarget(this.objBird).OnComplete(() => {
            this.isUp = false;
            let tw3 = this.objBird.TweenRotate(30, 0.2);
            this.birdTween.add(tw3);
        });
        this.birdTween.add(tw2);
    }
    fly(dt) {
        this.objBird.y = Math.min(500, Math.max(-800, this.objBird.y + (this.isUp ? this.upSpeed : this.downSpeed) * dt));
    }
    isCrashGround() {
        // 小鸟碰撞地面
        if (this.objBird.y >= 450) {
            return true;
        }
        return false;
    }
    reGameStart() {
        this.objBird.rotation = 0;
        this.objBird.y = 0;
        this.objBird.GetChild("anim_bird").asMovieClip.playing = true;
    }
    GameOver() {
        this.isUp = false;
        this.birdTween.forEach(element => {
            element.Kill(false);
        });
        this.birdTween.clear();
        this.objBird.GetChild("anim_bird").asMovieClip.playing = false;
    }
}


/***/ }),

/***/ "./src/game/module/flybird/item/pipe.ts":
/*!**********************************************!*\
  !*** ./src/game/module/flybird/item/pipe.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Pipe": () => (/* binding */ Pipe)
/* harmony export */ });
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! csharp */ "csharp");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(csharp__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _data_ui_FlyBird__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../data/ui/FlyBird */ "./src/data/ui/FlyBird.ts");


class Pipe {
    constructor(spacing, y) {
        this.pipeSpeed = 200;
        this.carshDis = 30;
        this.canAddScore = true;
        this.spacing = spacing;
        this.objPipe = csharp__WEBPACK_IMPORTED_MODULE_0__.FairyGUI.UIPackage.CreateObject(_data_ui_FlyBird__WEBPACK_IMPORTED_MODULE_1__.FlyBirdUI.PackageName, _data_ui_FlyBird__WEBPACK_IMPORTED_MODULE_1__.FlyBirdUI.UIPipe).asCom;
        this.img_Up = this.objPipe.GetChild("img_Up").asImage;
        this.img_Down = this.objPipe.GetChild("img_Down").asImage;
        this.img_Up.y = -spacing;
        this.img_Down.y = spacing;
        this.objPipe.y = y;
    }
    Dispose() {
        this.objPipe.Dispose();
    }
    move(dt) {
        this.objPipe.x = this.objPipe.x - dt * this.pipeSpeed;
    }
    isCrashBird(bird) {
        let disX = Math.abs(bird.x - this.objPipe.x);
        if (disX <= 116) {
            let disY = Math.abs(bird.y - this.objPipe.y);
            if (disY + this.carshDis >= this.spacing) {
                return true;
            }
        }
        return false;
    }
}


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
// import { homeUI } from "../../../../data/ui/home";



class FlyBirdScene extends _framework_scene_BaseScene__WEBPACK_IMPORTED_MODULE_1__.BaseScene {
    constructor() {
        super();
    }
    onEnter() {
    }
    onComplete() {
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__.S.UIManager.openPageInScene(_data_ui_FlyBird__WEBPACK_IMPORTED_MODULE_0__.FlyBirdUI.PackageName, _data_ui_FlyBird__WEBPACK_IMPORTED_MODULE_0__.FlyBirdUI.UIMainVIew);
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
/* harmony import */ var _item_pipe__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../item/pipe */ "./src/game/module/flybird/item/pipe.ts");
/* harmony import */ var _framework_common_Random__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../framework/common/Random */ "./src/framework/common/Random.ts");
/* harmony import */ var _item_Bird__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../item/Bird */ "./src/game/module/flybird/item/Bird.ts");
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
        this.groundSpeed = 46;
        /**背景速度速度 */
        this.skySpeed = 36;
        /**游戏是否开始 */
        this.isStart = false;
        /**得分 */
        this.score = 0;
        /**水管创建间隔 */
        this.pipeIntervalTime = 4;
        /**水管时间 */
        this.pipeTime = 0;
    }
    onUpdate(dt) {
        if (this.bird && this.isStart) {
            this.list_ground.scrollPane.posX = this.list_ground.scrollPane.posX + dt * this.groundSpeed;
            this.list_bg.scrollPane.posX = this.list_bg.scrollPane.posX + dt * this.skySpeed;
            this.bird.fly(dt);
            // 删除屏幕外的水管
            for (let i = 0; i < this.needDestory.count; i++) {
                this.curPipes.remove(this.needDestory[i]);
                this.needDestory[i].Dispose();
            }
            this.needDestory.clear();
            // 水管的移动
            for (let i = 0; i < this.curPipes.count; i++) {
                const element = this.curPipes[i];
                element.move(dt);
                if (element.objPipe.x <= -700) {
                    this.needDestory.add(this.curPipes[i]);
                }
                if (element.objPipe.x <= 0 && element.canAddScore) {
                    _global_GameConfig__WEBPACK_IMPORTED_MODULE_4__.S.AudioManager.Play("FlyBird/Music/getScore.wav");
                    this.score++;
                    element.canAddScore = false;
                    this.upDataScore(this.score);
                }
            }
            // 检测小鸟是否碰撞水管以及地面
            if (this.bird.isCrashGround() || this.isCrash()) {
                this.GameOver();
            }
            this.pipeTime += dt;
            // 水管定时创建
            if (this.pipeTime >= this.pipeIntervalTime) {
                this.pipeTime = 0;
                this.createPipe();
            }
        }
    }
    isCrash() {
        for (const iterator of this.curPipes) {
            if (iterator.isCrashBird(this.bird.objBird)) {
                return true;
            }
        }
        return false;
    }
    onAwake() {
        super.onAwake();
        this.fui.MakeFullScreen();
        this.list_bg.SetVirtualAndLoop();
        this.list_bg.itemRenderer = (index, obj) => {
        };
        this.list_bg.numItems = 3;
        this.list_ground.SetVirtualAndLoop();
        this.list_ground.itemRenderer = (index, obj) => {
        };
        this.list_ground.numItems = 3;
        this.txt_Score.visible = false;
        this.bird = new _item_Bird__WEBPACK_IMPORTED_MODULE_10__.Bird();
        this.gBirdAndPipe.AddChild(this.bird.objBird);
        this.btn_start.onClick.Set(() => {
            this.onClickStart();
        });
        this.list_bg.onTouchBegin.Set(() => {
            this.bird.flyUp();
        });
    }
    /**游戏开始 */
    GameStart() {
        this.isStart = true;
        this.txt_Score.visible = true;
        this.startPanel.visible = false;
        this.upDataScore(0);
    }
    /**重新开始 */
    reGameStart() {
        this.bird.reGameStart();
        this.bird.objBird.y = 0;
        // bird.GetComponent<SpriteAnimation>().Play("fly");
        // 删除屏幕外的水管
        for (const iterator of this.needDestory) {
            iterator.Dispose();
        }
        this.needDestory.clear();
        for (const iterator of this.curPipes) {
            iterator.Dispose();
        }
        this.curPipes.clear();
        this.score = 0;
        this.GameStart();
    }
    /**更新分数 */
    upDataScore(score) {
        this.txt_Score.text = score.toString();
    }
    /**游戏结束 */
    GameOver() {
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_4__.S.AudioManager.Play("FlyBird/Music/crash.wav");
        this.isStart = false;
        this.bird.GameOver();
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
        vo.reStartFunc = () => {
            this.reGameStart();
        };
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_4__.S.UIManager.openWindow(_data_ui_FlyBird__WEBPACK_IMPORTED_MODULE_5__.FlyBirdUI.PackageName, _data_ui_FlyBird__WEBPACK_IMPORTED_MODULE_5__.FlyBirdUI.UIOverWindow, vo);
    }
    /**创建水管 */
    createPipe() {
        let pipe = new _item_pipe__WEBPACK_IMPORTED_MODULE_8__.Pipe(_framework_common_Random__WEBPACK_IMPORTED_MODULE_9__.Random.random(170, 220), _framework_common_Random__WEBPACK_IMPORTED_MODULE_9__.Random.random(-300, 200));
        this.curPipes.add(pipe);
        this.gBirdAndPipe.AddChild(pipe.objPipe);
        pipe.objPipe.x = 1000;
    }
    onClickStart() {
        this.GameStart();
    }
    onShow(vo) {
        super.onShow(vo);
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
    (0,_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__.binder)("gBirdAndPipe")
], UIFlyBirdMainView.prototype, "gBirdAndPipe", void 0);


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



class GameStartScene extends _framework_scene_BaseScene__WEBPACK_IMPORTED_MODULE_1__.BaseScene {
    constructor() {
        super();
    }
    onEnter() {
    }
    onComplete() {
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__.S.UIManager.openPageInScene(_data_ui_GameStart__WEBPACK_IMPORTED_MODULE_0__.GameStartUI.PackageName, _data_ui_GameStart__WEBPACK_IMPORTED_MODULE_0__.GameStartUI.UIStartView);
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
    onAwake() {
        super.onAwake();
        console.log("开始界面333");
        this.fui.MakeFullScreen();
        this.btn_start.onClick.Add(() => {
            this.click_btn_start();
        });
    }
    onShow() {
        super.onShow();
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
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! csharp */ "csharp");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(csharp__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _framework_common_GameObjectPool__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../framework/common/GameObjectPool */ "./src/framework/common/GameObjectPool.ts");
/* harmony import */ var _framework_common_ResManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../framework/common/ResManager */ "./src/framework/common/ResManager.ts");
/* harmony import */ var _framework_net_GameSession__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../framework/net/GameSession */ "./src/framework/net/GameSession.ts");
/* harmony import */ var _framework_net_HttpManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../framework/net/HttpManager */ "./src/framework/net/HttpManager.ts");
/* harmony import */ var _framework_net_SessionManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../framework/net/SessionManager */ "./src/framework/net/SessionManager.ts");
/* harmony import */ var _framework_scene_SceneManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../framework/scene/SceneManager */ "./src/framework/scene/SceneManager.ts");
/* harmony import */ var _framework_ui_UIManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../framework/ui/UIManager */ "./src/framework/ui/UIManager.ts");
/* harmony import */ var _game_event_UIMessageManager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../game/event/UIMessageManager */ "./src/game/event/UIMessageManager.ts");



// import { StoryManager } from "../framework/ink/StoryManager";
// import { StoryMessageManager } from "../framework/ink/StoryMessageManager";






class GameConfig {
}
GameConfig.debug = true;
GameConfig.realmServerIP = "127.0.0.1";
GameConfig.realmServerPort = 9001;
class S {
}
S.UIManager = _framework_ui_UIManager__WEBPACK_IMPORTED_MODULE_7__.UIManager.Instance(_framework_ui_UIManager__WEBPACK_IMPORTED_MODULE_7__.UIManager);
S.UIMessageManger = _game_event_UIMessageManager__WEBPACK_IMPORTED_MODULE_8__.UIMessageManger.Instance(_game_event_UIMessageManager__WEBPACK_IMPORTED_MODULE_8__.UIMessageManger);
S.SceneManager = _framework_scene_SceneManager__WEBPACK_IMPORTED_MODULE_6__.SceneManager.Instance(_framework_scene_SceneManager__WEBPACK_IMPORTED_MODULE_6__.SceneManager);
S.GameObjectPool = _framework_common_GameObjectPool__WEBPACK_IMPORTED_MODULE_1__.GameObjectPool.Instance(_framework_common_GameObjectPool__WEBPACK_IMPORTED_MODULE_1__.GameObjectPool);
S.ResManager = _framework_common_ResManager__WEBPACK_IMPORTED_MODULE_2__.ResManager.Instance(_framework_common_ResManager__WEBPACK_IMPORTED_MODULE_2__.ResManager);
S.SessionManager = _framework_net_SessionManager__WEBPACK_IMPORTED_MODULE_5__.SessionManager.Instance(_framework_net_SessionManager__WEBPACK_IMPORTED_MODULE_5__.SessionManager);
S.GameSession = _framework_net_GameSession__WEBPACK_IMPORTED_MODULE_3__.GameSession.Instance(_framework_net_GameSession__WEBPACK_IMPORTED_MODULE_3__.GameSession);
S.HttpManager = _framework_net_HttpManager__WEBPACK_IMPORTED_MODULE_4__.HttpManager.Instance(_framework_net_HttpManager__WEBPACK_IMPORTED_MODULE_4__.HttpManager);
S.AudioManager = csharp__WEBPACK_IMPORTED_MODULE_0__.AudioManager.Instance;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLm1qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IscUJBQXFCO0FBQzdDO0FBQ0EsVUFBVTtBQUNWLFdBQVcsWUFBWTtBQUN2QixXQUFXLE1BQU07QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixXQUFXLEdBQUc7QUFDZCxXQUFXLE1BQU07QUFDakIsYUFBYSxZQUFZO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7OztBQ25EYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsWUFBWTtBQUN2QixXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsWUFBWTtBQUN2QixXQUFXLFFBQVE7QUFDbkIsYUFBYSxRQUFRO0FBQ3JCLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZixvQkFBb0Isa0JBQWtCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBLDhCQUE4QixFQUFFLG1CQUFtQixFQUFFLGlCQUFpQixFQUFFO0FBQ3hFOzs7Ozs7Ozs7Ozs7QUMxSWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxVQUFVO0FBQ3JCLFdBQVcsR0FBRztBQUNkLGFBQWEsbUJBQW1CO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFVBQVU7QUFDckIsYUFBYSxtQkFBbUI7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHFCQUFxQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsTUFBTTtBQUNqQixhQUFhLG1CQUFtQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHFCQUFxQjtBQUNwQztBQUNBLG9CQUFvQixxQkFBcUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzNFYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsWUFBWTtBQUN2QixXQUFXLFFBQVE7QUFDbkIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFlBQVk7QUFDdkIsV0FBVyxRQUFRO0FBQ25CLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFlBQVk7QUFDdkIsV0FBVyxRQUFRO0FBQ25CLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFlBQVk7QUFDdkIsV0FBVyxRQUFRO0FBQ25CLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxZQUFZO0FBQ3ZCLFdBQVcsUUFBUTtBQUNuQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsWUFBWTtBQUN2QixXQUFXLFFBQVE7QUFDbkIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsWUFBWTtBQUN2QixXQUFXLFFBQVE7QUFDbkIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsWUFBWTtBQUN2QixXQUFXLFFBQVE7QUFDbkIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxLQUFLO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLEtBQUs7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxjQUFjLDBDQUEwQztBQUN4RDtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQTtB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QUFVO0FBQ3JCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLGFBQWE7QUFDYjtBQUNBLFlBQVksWUFBWTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFNBQVM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFLGtCQUFrQjtBQUNsRixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFD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QTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkI7O0FBRUE7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25COztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25COztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsWUFBWTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Es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Q2Qsc0VBQWtDLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBQUEsQ0FBQztJQUVLLGlCQUFpQjtRQUNwQix3RUFBd0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixnRUFBVSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVPLE1BQU0sQ0FBQyxLQUFZO1FBQ3ZCLHFCQUFxQjtRQUNyQixrRUFBa0IsQ0FBQyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQUVNLFNBQVM7UUFDWixnRUFBVSxDQUFDLDBCQUEwQixDQUFDLENBQUM7SUFDM0MsQ0FBQztDQUNKO0FBSUQsSUFBSSxRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RzcHJvamVjdC8uL25vZGVfbW9kdWxlcy9AcHJvdG9idWZqcy9hc3Byb21pc2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL0Bwcm90b2J1ZmpzL2Jhc2U2NC9pbmRleC5qcyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9ub2RlX21vZHVsZXMvQHByb3RvYnVmanMvZXZlbnRlbWl0dGVyL2luZGV4LmpzIiwid2VicGFjazovL3RzcHJvamVjdC8uL25vZGVfbW9kdWxlcy9AcHJvdG9idWZqcy9mbG9hdC9pbmRleC5qcyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9ub2RlX21vZHVsZXMvQHByb3RvYnVmanMvaW5xdWlyZS9pbmRleC5qcyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9ub2RlX21vZHVsZXMvQHByb3RvYnVmanMvcG9vbC9pbmRleC5qcyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9ub2RlX21vZHVsZXMvQHByb3RvYnVmanMvdXRmOC9pbmRleC5qcyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9ub2RlX21vZHVsZXMvbG9uZy9zcmMvbG9uZy5qcyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9taW5pbWFsLmpzIiwid2VicGFjazovL3RzcHJvamVjdC8uL25vZGVfbW9kdWxlcy9wcm90b2J1ZmpzL3NyYy9pbmRleC1taW5pbWFsLmpzIiwid2VicGFjazovL3RzcHJvamVjdC8uL25vZGVfbW9kdWxlcy9wcm90b2J1ZmpzL3NyYy9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3Byb3RvYnVmanMvc3JjL3JlYWRlcl9idWZmZXIuanMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3Byb3RvYnVmanMvc3JjL3Jvb3RzLmpzIiwid2VicGFjazovL3RzcHJvamVjdC8uL25vZGVfbW9kdWxlcy9wcm90b2J1ZmpzL3NyYy9ycGMuanMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3Byb3RvYnVmanMvc3JjL3JwYy9zZXJ2aWNlLmpzIiwid2VicGFjazovL3RzcHJvamVjdC8uL25vZGVfbW9kdWxlcy9wcm90b2J1ZmpzL3NyYy91dGlsL2xvbmdiaXRzLmpzIiwid2VicGFjazovL3RzcHJvamVjdC8uL25vZGVfbW9kdWxlcy9wcm90b2J1ZmpzL3NyYy91dGlsL21pbmltYWwuanMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3Byb3RvYnVmanMvc3JjL3dyaXRlci5qcyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9zcmMvd3JpdGVyX2J1ZmZlci5qcyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZGF0YS9wYi9PcGNvZGUudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2RhdGEvdWkvRmx5QmlyZC50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZGF0YS91aS9HYW1lU3RhcnQudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2RhdGEvdWkvY29tbW9uLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvY29tbW9uL0dhbWVPYmplY3RQb29sLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvY29tbW9uL0xpc3QudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2ZyYW1ld29yay9jb21tb24vTWVzc2VuZ2VyLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvY29tbW9uL05pY2VEZWNvcmF0b3IudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2ZyYW1ld29yay9jb21tb24vUmFuZG9tLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvY29tbW9uL1Jlc01hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2ZyYW1ld29yay9jb21tb24vU2luZ2xldG9uLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvbG9nZ2VyL0xvZ2dlci50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZnJhbWV3b3JrL25ldC9HYW1lU2Vzc2lvbi50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZnJhbWV3b3JrL25ldC9IdHRwTWFuYWdlci50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZnJhbWV3b3JrL25ldC9NZXNzYWdlUGFyc2VyLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvbmV0L05ldEVycm9yQ29kZS50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZnJhbWV3b3JrL25ldC9TZXNzaW9uTWFuYWdlci50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZnJhbWV3b3JrL3NjZW5lL0Jhc2VTY2VuZS50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZnJhbWV3b3JrL3NjZW5lL1NjZW5lRGVmLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvc2NlbmUvU2NlbmVGYWN0b3J5LnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvc2NlbmUvU2NlbmVNYW5hZ2VyLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvdWkvVUlCYXNlLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvdWkvVUlEZWZpbmUudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2ZyYW1ld29yay91aS9VSUZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2ZyYW1ld29yay91aS9VSUxpYi9VSUxvYWRpbmcudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2ZyYW1ld29yay91aS9VSU1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2ZyYW1ld29yay91aS9VSVBhZ2UudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2ZyYW1ld29yay91aS9VSVBhbmVsLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvdWkvVUlXaW5kb3cudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2dhbWUvZXZlbnQvVUlNZXNzYWdlLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9nYW1lL2V2ZW50L1VJTWVzc2FnZU1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2dhbWUvbW9kdWxlL2ZseUJpcmQvdWkvVUlGbHlCaXJkT3ZlcldpbmRvdy50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZ2FtZS9tb2R1bGUvZmx5YmlyZC9pdGVtL0JpcmQudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2dhbWUvbW9kdWxlL2ZseWJpcmQvaXRlbS9waXBlLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9nYW1lL21vZHVsZS9mbHliaXJkL3NjZW5lL0ZseUJpcmRTY2VuZS50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZ2FtZS9tb2R1bGUvZmx5YmlyZC91aS9VSUZseUJpcmRNYWluVmlldy50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZ2FtZS9tb2R1bGUvZ2FtZXN0YXJ0L3NjZW5lL0dhbWVTdGFydFNjZW5lLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9nYW1lL21vZHVsZS9nYW1lc3RhcnQvdWkvVUlTdGFydFZpZXcudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2dhbWUvbW9kdWxlL2dhbWVzdGFydC92by9Wb092ZXJXaW5kb3cudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2dsb2JhbC9HYW1lQ29uZmlnLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9kYXRhL3BiL2dlbi9wYi5qcyIsIndlYnBhY2s6Ly90c3Byb2plY3QvZXh0ZXJuYWwgY29tbW9uanMyIFwiY3NoYXJwXCIiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0L2V4dGVybmFsIGNvbW1vbmpzMiBcInB1ZXJ0c1wiIiwid2VicGFjazovL3RzcHJvamVjdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90c3Byb2plY3Qvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90c3Byb2plY3Qvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly90c3Byb2plY3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90c3Byb2plY3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvR2FtZU1haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbm1vZHVsZS5leHBvcnRzID0gYXNQcm9taXNlO1xyXG5cclxuLyoqXHJcbiAqIENhbGxiYWNrIGFzIHVzZWQgYnkge0BsaW5rIHV0aWwuYXNQcm9taXNlfS5cclxuICogQHR5cGVkZWYgYXNQcm9taXNlQ2FsbGJhY2tcclxuICogQHR5cGUge2Z1bmN0aW9ufVxyXG4gKiBAcGFyYW0ge0Vycm9yfG51bGx9IGVycm9yIEVycm9yLCBpZiBhbnlcclxuICogQHBhcmFtIHsuLi4qfSBwYXJhbXMgQWRkaXRpb25hbCBhcmd1bWVudHNcclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICovXHJcblxyXG4vKipcclxuICogUmV0dXJucyBhIHByb21pc2UgZnJvbSBhIG5vZGUtc3R5bGUgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAqIEBtZW1iZXJvZiB1dGlsXHJcbiAqIEBwYXJhbSB7YXNQcm9taXNlQ2FsbGJhY2t9IGZuIEZ1bmN0aW9uIHRvIGNhbGxcclxuICogQHBhcmFtIHsqfSBjdHggRnVuY3Rpb24gY29udGV4dFxyXG4gKiBAcGFyYW0gey4uLip9IHBhcmFtcyBGdW5jdGlvbiBhcmd1bWVudHNcclxuICogQHJldHVybnMge1Byb21pc2U8Kj59IFByb21pc2lmaWVkIGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBhc1Byb21pc2UoZm4sIGN0eC8qLCB2YXJhcmdzICovKSB7XHJcbiAgICB2YXIgcGFyYW1zICA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSksXHJcbiAgICAgICAgb2Zmc2V0ICA9IDAsXHJcbiAgICAgICAgaW5kZXggICA9IDIsXHJcbiAgICAgICAgcGVuZGluZyA9IHRydWU7XHJcbiAgICB3aGlsZSAoaW5kZXggPCBhcmd1bWVudHMubGVuZ3RoKVxyXG4gICAgICAgIHBhcmFtc1tvZmZzZXQrK10gPSBhcmd1bWVudHNbaW5kZXgrK107XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZXhlY3V0b3IocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgcGFyYW1zW29mZnNldF0gPSBmdW5jdGlvbiBjYWxsYmFjayhlcnIvKiwgdmFyYXJncyAqLykge1xyXG4gICAgICAgICAgICBpZiAocGVuZGluZykge1xyXG4gICAgICAgICAgICAgICAgcGVuZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycilcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJhbXMgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChvZmZzZXQgPCBwYXJhbXMubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXNbb2Zmc2V0KytdID0gYXJndW1lbnRzW29mZnNldF07XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZS5hcHBseShudWxsLCBwYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBmbi5hcHBseShjdHggfHwgbnVsbCwgcGFyYW1zKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgaWYgKHBlbmRpbmcpIHtcclxuICAgICAgICAgICAgICAgIHBlbmRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4vKipcclxuICogQSBtaW5pbWFsIGJhc2U2NCBpbXBsZW1lbnRhdGlvbiBmb3IgbnVtYmVyIGFycmF5cy5cclxuICogQG1lbWJlcm9mIHV0aWxcclxuICogQG5hbWVzcGFjZVxyXG4gKi9cclxudmFyIGJhc2U2NCA9IGV4cG9ydHM7XHJcblxyXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgYnl0ZSBsZW5ndGggb2YgYSBiYXNlNjQgZW5jb2RlZCBzdHJpbmcuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgQmFzZTY0IGVuY29kZWQgc3RyaW5nXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IEJ5dGUgbGVuZ3RoXHJcbiAqL1xyXG5iYXNlNjQubGVuZ3RoID0gZnVuY3Rpb24gbGVuZ3RoKHN0cmluZykge1xyXG4gICAgdmFyIHAgPSBzdHJpbmcubGVuZ3RoO1xyXG4gICAgaWYgKCFwKVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgdmFyIG4gPSAwO1xyXG4gICAgd2hpbGUgKC0tcCAlIDQgPiAxICYmIHN0cmluZy5jaGFyQXQocCkgPT09IFwiPVwiKVxyXG4gICAgICAgICsrbjtcclxuICAgIHJldHVybiBNYXRoLmNlaWwoc3RyaW5nLmxlbmd0aCAqIDMpIC8gNCAtIG47XHJcbn07XHJcblxyXG4vLyBCYXNlNjQgZW5jb2RpbmcgdGFibGVcclxudmFyIGI2NCA9IG5ldyBBcnJheSg2NCk7XHJcblxyXG4vLyBCYXNlNjQgZGVjb2RpbmcgdGFibGVcclxudmFyIHM2NCA9IG5ldyBBcnJheSgxMjMpO1xyXG5cclxuLy8gNjUuLjkwLCA5Ny4uMTIyLCA0OC4uNTcsIDQzLCA0N1xyXG5mb3IgKHZhciBpID0gMDsgaSA8IDY0OylcclxuICAgIHM2NFtiNjRbaV0gPSBpIDwgMjYgPyBpICsgNjUgOiBpIDwgNTIgPyBpICsgNzEgOiBpIDwgNjIgPyBpIC0gNCA6IGkgLSA1OSB8IDQzXSA9IGkrKztcclxuXHJcbi8qKlxyXG4gKiBFbmNvZGVzIGEgYnVmZmVyIHRvIGEgYmFzZTY0IGVuY29kZWQgc3RyaW5nLlxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZmZlciBTb3VyY2UgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCBTb3VyY2Ugc3RhcnRcclxuICogQHBhcmFtIHtudW1iZXJ9IGVuZCBTb3VyY2UgZW5kXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEJhc2U2NCBlbmNvZGVkIHN0cmluZ1xyXG4gKi9cclxuYmFzZTY0LmVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShidWZmZXIsIHN0YXJ0LCBlbmQpIHtcclxuICAgIHZhciBwYXJ0cyA9IG51bGwsXHJcbiAgICAgICAgY2h1bmsgPSBbXTtcclxuICAgIHZhciBpID0gMCwgLy8gb3V0cHV0IGluZGV4XHJcbiAgICAgICAgaiA9IDAsIC8vIGdvdG8gaW5kZXhcclxuICAgICAgICB0OyAgICAgLy8gdGVtcG9yYXJ5XHJcbiAgICB3aGlsZSAoc3RhcnQgPCBlbmQpIHtcclxuICAgICAgICB2YXIgYiA9IGJ1ZmZlcltzdGFydCsrXTtcclxuICAgICAgICBzd2l0Y2ggKGopIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgY2h1bmtbaSsrXSA9IGI2NFtiID4+IDJdO1xyXG4gICAgICAgICAgICAgICAgdCA9IChiICYgMykgPDwgNDtcclxuICAgICAgICAgICAgICAgIGogPSAxO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIGNodW5rW2krK10gPSBiNjRbdCB8IGIgPj4gNF07XHJcbiAgICAgICAgICAgICAgICB0ID0gKGIgJiAxNSkgPDwgMjtcclxuICAgICAgICAgICAgICAgIGogPSAyO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIGNodW5rW2krK10gPSBiNjRbdCB8IGIgPj4gNl07XHJcbiAgICAgICAgICAgICAgICBjaHVua1tpKytdID0gYjY0W2IgJiA2M107XHJcbiAgICAgICAgICAgICAgICBqID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaSA+IDgxOTEpIHtcclxuICAgICAgICAgICAgKHBhcnRzIHx8IChwYXJ0cyA9IFtdKSkucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY2h1bmspKTtcclxuICAgICAgICAgICAgaSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGopIHtcclxuICAgICAgICBjaHVua1tpKytdID0gYjY0W3RdO1xyXG4gICAgICAgIGNodW5rW2krK10gPSA2MTtcclxuICAgICAgICBpZiAoaiA9PT0gMSlcclxuICAgICAgICAgICAgY2h1bmtbaSsrXSA9IDYxO1xyXG4gICAgfVxyXG4gICAgaWYgKHBhcnRzKSB7XHJcbiAgICAgICAgaWYgKGkpXHJcbiAgICAgICAgICAgIHBhcnRzLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNodW5rLnNsaWNlKDAsIGkpKSk7XHJcbiAgICAgICAgcmV0dXJuIHBhcnRzLmpvaW4oXCJcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNodW5rLnNsaWNlKDAsIGkpKTtcclxufTtcclxuXHJcbnZhciBpbnZhbGlkRW5jb2RpbmcgPSBcImludmFsaWQgZW5jb2RpbmdcIjtcclxuXHJcbi8qKlxyXG4gKiBEZWNvZGVzIGEgYmFzZTY0IGVuY29kZWQgc3RyaW5nIHRvIGEgYnVmZmVyLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFNvdXJjZSBzdHJpbmdcclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWZmZXIgRGVzdGluYXRpb24gYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgRGVzdGluYXRpb24gb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IE51bWJlciBvZiBieXRlcyB3cml0dGVuXHJcbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiBlbmNvZGluZyBpcyBpbnZhbGlkXHJcbiAqL1xyXG5iYXNlNjQuZGVjb2RlID0gZnVuY3Rpb24gZGVjb2RlKHN0cmluZywgYnVmZmVyLCBvZmZzZXQpIHtcclxuICAgIHZhciBzdGFydCA9IG9mZnNldDtcclxuICAgIHZhciBqID0gMCwgLy8gZ290byBpbmRleFxyXG4gICAgICAgIHQ7ICAgICAvLyB0ZW1wb3JhcnlcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDspIHtcclxuICAgICAgICB2YXIgYyA9IHN0cmluZy5jaGFyQ29kZUF0KGkrKyk7XHJcbiAgICAgICAgaWYgKGMgPT09IDYxICYmIGogPiAxKVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBpZiAoKGMgPSBzNjRbY10pID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKGludmFsaWRFbmNvZGluZyk7XHJcbiAgICAgICAgc3dpdGNoIChqKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIHQgPSBjO1xyXG4gICAgICAgICAgICAgICAgaiA9IDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IHQgPDwgMiB8IChjICYgNDgpID4+IDQ7XHJcbiAgICAgICAgICAgICAgICB0ID0gYztcclxuICAgICAgICAgICAgICAgIGogPSAyO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSAodCAmIDE1KSA8PCA0IHwgKGMgJiA2MCkgPj4gMjtcclxuICAgICAgICAgICAgICAgIHQgPSBjO1xyXG4gICAgICAgICAgICAgICAgaiA9IDM7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9ICh0ICYgMykgPDwgNiB8IGM7XHJcbiAgICAgICAgICAgICAgICBqID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChqID09PSAxKVxyXG4gICAgICAgIHRocm93IEVycm9yKGludmFsaWRFbmNvZGluZyk7XHJcbiAgICByZXR1cm4gb2Zmc2V0IC0gc3RhcnQ7XHJcbn07XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhlIHNwZWNpZmllZCBzdHJpbmcgYXBwZWFycyB0byBiZSBiYXNlNjQgZW5jb2RlZC5cclxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBTdHJpbmcgdG8gdGVzdFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHByb2JhYmx5IGJhc2U2NCBlbmNvZGVkLCBvdGhlcndpc2UgZmFsc2VcclxuICovXHJcbmJhc2U2NC50ZXN0ID0gZnVuY3Rpb24gdGVzdChzdHJpbmcpIHtcclxuICAgIHJldHVybiAvXig/OltBLVphLXowLTkrL117NH0pKig/OltBLVphLXowLTkrL117Mn09PXxbQS1aYS16MC05Ky9dezN9PSk/JC8udGVzdChzdHJpbmcpO1xyXG59O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XHJcblxyXG4vKipcclxuICogQ29uc3RydWN0cyBhIG5ldyBldmVudCBlbWl0dGVyIGluc3RhbmNlLlxyXG4gKiBAY2xhc3NkZXNjIEEgbWluaW1hbCBldmVudCBlbWl0dGVyLlxyXG4gKiBAbWVtYmVyb2YgdXRpbFxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZ2lzdGVyZWQgbGlzdGVuZXJzLlxyXG4gICAgICogQHR5cGUge09iamVjdC48c3RyaW5nLCo+fVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgdGhpcy5fbGlzdGVuZXJzID0ge307XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZWdpc3RlcnMgYW4gZXZlbnQgbGlzdGVuZXIuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBldnQgRXZlbnQgbmFtZVxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmbiBMaXN0ZW5lclxyXG4gKiBAcGFyYW0geyp9IFtjdHhdIExpc3RlbmVyIGNvbnRleHRcclxuICogQHJldHVybnMge3V0aWwuRXZlbnRFbWl0dGVyfSBgdGhpc2BcclxuICovXHJcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbihldnQsIGZuLCBjdHgpIHtcclxuICAgICh0aGlzLl9saXN0ZW5lcnNbZXZ0XSB8fCAodGhpcy5fbGlzdGVuZXJzW2V2dF0gPSBbXSkpLnB1c2goe1xyXG4gICAgICAgIGZuICA6IGZuLFxyXG4gICAgICAgIGN0eCA6IGN0eCB8fCB0aGlzXHJcbiAgICB9KTtcclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgYW4gZXZlbnQgbGlzdGVuZXIgb3IgYW55IG1hdGNoaW5nIGxpc3RlbmVycyBpZiBhcmd1bWVudHMgYXJlIG9taXR0ZWQuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbZXZ0XSBFdmVudCBuYW1lLiBSZW1vdmVzIGFsbCBsaXN0ZW5lcnMgaWYgb21pdHRlZC5cclxuICogQHBhcmFtIHtmdW5jdGlvbn0gW2ZuXSBMaXN0ZW5lciB0byByZW1vdmUuIFJlbW92ZXMgYWxsIGxpc3RlbmVycyBvZiBgZXZ0YCBpZiBvbWl0dGVkLlxyXG4gKiBAcmV0dXJucyB7dXRpbC5FdmVudEVtaXR0ZXJ9IGB0aGlzYFxyXG4gKi9cclxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiBvZmYoZXZ0LCBmbikge1xyXG4gICAgaWYgKGV2dCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHRoaXMuX2xpc3RlbmVycyA9IHt9O1xyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgaWYgKGZuID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyc1tldnRdID0gW107XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnNbZXZ0XTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOylcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lcnNbaV0uZm4gPT09IGZuKVxyXG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgKytpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEVtaXRzIGFuIGV2ZW50IGJ5IGNhbGxpbmcgaXRzIGxpc3RlbmVycyB3aXRoIHRoZSBzcGVjaWZpZWQgYXJndW1lbnRzLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZ0IEV2ZW50IG5hbWVcclxuICogQHBhcmFtIHsuLi4qfSBhcmdzIEFyZ3VtZW50c1xyXG4gKiBAcmV0dXJucyB7dXRpbC5FdmVudEVtaXR0ZXJ9IGB0aGlzYFxyXG4gKi9cclxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdChldnQpIHtcclxuICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnNbZXZ0XTtcclxuICAgIGlmIChsaXN0ZW5lcnMpIHtcclxuICAgICAgICB2YXIgYXJncyA9IFtdLFxyXG4gICAgICAgICAgICBpID0gMTtcclxuICAgICAgICBmb3IgKDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7KVxyXG4gICAgICAgICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOylcclxuICAgICAgICAgICAgbGlzdGVuZXJzW2ldLmZuLmFwcGx5KGxpc3RlbmVyc1tpKytdLmN0eCwgYXJncyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoZmFjdG9yeSk7XHJcblxyXG4vKipcclxuICogUmVhZHMgLyB3cml0ZXMgZmxvYXRzIC8gZG91YmxlcyBmcm9tIC8gdG8gYnVmZmVycy5cclxuICogQG5hbWUgdXRpbC5mbG9hdFxyXG4gKiBAbmFtZXNwYWNlXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFdyaXRlcyBhIDMyIGJpdCBmbG9hdCB0byBhIGJ1ZmZlciB1c2luZyBsaXR0bGUgZW5kaWFuIGJ5dGUgb3JkZXIuXHJcbiAqIEBuYW1lIHV0aWwuZmxvYXQud3JpdGVGbG9hdExFXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsIFZhbHVlIHRvIHdyaXRlXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmIFRhcmdldCBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IHBvcyBUYXJnZXQgYnVmZmVyIG9mZnNldFxyXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBXcml0ZXMgYSAzMiBiaXQgZmxvYXQgdG8gYSBidWZmZXIgdXNpbmcgYmlnIGVuZGlhbiBieXRlIG9yZGVyLlxyXG4gKiBAbmFtZSB1dGlsLmZsb2F0LndyaXRlRmxvYXRCRVxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtudW1iZXJ9IHZhbCBWYWx1ZSB0byB3cml0ZVxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZiBUYXJnZXQgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwb3MgVGFyZ2V0IGJ1ZmZlciBvZmZzZXRcclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICovXHJcblxyXG4vKipcclxuICogUmVhZHMgYSAzMiBiaXQgZmxvYXQgZnJvbSBhIGJ1ZmZlciB1c2luZyBsaXR0bGUgZW5kaWFuIGJ5dGUgb3JkZXIuXHJcbiAqIEBuYW1lIHV0aWwuZmxvYXQucmVhZEZsb2F0TEVcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmIFNvdXJjZSBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IHBvcyBTb3VyY2UgYnVmZmVyIG9mZnNldFxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFJlYWRzIGEgMzIgYml0IGZsb2F0IGZyb20gYSBidWZmZXIgdXNpbmcgYmlnIGVuZGlhbiBieXRlIG9yZGVyLlxyXG4gKiBAbmFtZSB1dGlsLmZsb2F0LnJlYWRGbG9hdEJFXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZiBTb3VyY2UgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwb3MgU291cmNlIGJ1ZmZlciBvZmZzZXRcclxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBXcml0ZXMgYSA2NCBiaXQgZG91YmxlIHRvIGEgYnVmZmVyIHVzaW5nIGxpdHRsZSBlbmRpYW4gYnl0ZSBvcmRlci5cclxuICogQG5hbWUgdXRpbC5mbG9hdC53cml0ZURvdWJsZUxFXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsIFZhbHVlIHRvIHdyaXRlXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmIFRhcmdldCBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IHBvcyBUYXJnZXQgYnVmZmVyIG9mZnNldFxyXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBXcml0ZXMgYSA2NCBiaXQgZG91YmxlIHRvIGEgYnVmZmVyIHVzaW5nIGJpZyBlbmRpYW4gYnl0ZSBvcmRlci5cclxuICogQG5hbWUgdXRpbC5mbG9hdC53cml0ZURvdWJsZUJFXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsIFZhbHVlIHRvIHdyaXRlXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmIFRhcmdldCBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IHBvcyBUYXJnZXQgYnVmZmVyIG9mZnNldFxyXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBSZWFkcyBhIDY0IGJpdCBkb3VibGUgZnJvbSBhIGJ1ZmZlciB1c2luZyBsaXR0bGUgZW5kaWFuIGJ5dGUgb3JkZXIuXHJcbiAqIEBuYW1lIHV0aWwuZmxvYXQucmVhZERvdWJsZUxFXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZiBTb3VyY2UgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwb3MgU291cmNlIGJ1ZmZlciBvZmZzZXRcclxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBSZWFkcyBhIDY0IGJpdCBkb3VibGUgZnJvbSBhIGJ1ZmZlciB1c2luZyBiaWcgZW5kaWFuIGJ5dGUgb3JkZXIuXHJcbiAqIEBuYW1lIHV0aWwuZmxvYXQucmVhZERvdWJsZUJFXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZiBTb3VyY2UgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwb3MgU291cmNlIGJ1ZmZlciBvZmZzZXRcclxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxyXG4gKi9cclxuXHJcbi8vIEZhY3RvcnkgZnVuY3Rpb24gZm9yIHRoZSBwdXJwb3NlIG9mIG5vZGUtYmFzZWQgdGVzdGluZyBpbiBtb2RpZmllZCBnbG9iYWwgZW52aXJvbm1lbnRzXHJcbmZ1bmN0aW9uIGZhY3RvcnkoZXhwb3J0cykge1xyXG5cclxuICAgIC8vIGZsb2F0OiB0eXBlZCBhcnJheVxyXG4gICAgaWYgKHR5cGVvZiBGbG9hdDMyQXJyYXkgIT09IFwidW5kZWZpbmVkXCIpIChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdmFyIGYzMiA9IG5ldyBGbG9hdDMyQXJyYXkoWyAtMCBdKSxcclxuICAgICAgICAgICAgZjhiID0gbmV3IFVpbnQ4QXJyYXkoZjMyLmJ1ZmZlciksXHJcbiAgICAgICAgICAgIGxlICA9IGY4YlszXSA9PT0gMTI4O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB3cml0ZUZsb2F0X2YzMl9jcHkodmFsLCBidWYsIHBvcykge1xyXG4gICAgICAgICAgICBmMzJbMF0gPSB2YWw7XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgICAgXSA9IGY4YlswXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDFdID0gZjhiWzFdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgMl0gPSBmOGJbMl07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAzXSA9IGY4YlszXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHdyaXRlRmxvYXRfZjMyX3Jldih2YWwsIGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIGYzMlswXSA9IHZhbDtcclxuICAgICAgICAgICAgYnVmW3BvcyAgICBdID0gZjhiWzNdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgMV0gPSBmOGJbMl07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAyXSA9IGY4YlsxXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDNdID0gZjhiWzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBleHBvcnRzLndyaXRlRmxvYXRMRSA9IGxlID8gd3JpdGVGbG9hdF9mMzJfY3B5IDogd3JpdGVGbG9hdF9mMzJfcmV2O1xyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgZXhwb3J0cy53cml0ZUZsb2F0QkUgPSBsZSA/IHdyaXRlRmxvYXRfZjMyX3JldiA6IHdyaXRlRmxvYXRfZjMyX2NweTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVhZEZsb2F0X2YzMl9jcHkoYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgZjhiWzBdID0gYnVmW3BvcyAgICBdO1xyXG4gICAgICAgICAgICBmOGJbMV0gPSBidWZbcG9zICsgMV07XHJcbiAgICAgICAgICAgIGY4YlsyXSA9IGJ1Zltwb3MgKyAyXTtcclxuICAgICAgICAgICAgZjhiWzNdID0gYnVmW3BvcyArIDNdO1xyXG4gICAgICAgICAgICByZXR1cm4gZjMyWzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVhZEZsb2F0X2YzMl9yZXYoYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgZjhiWzNdID0gYnVmW3BvcyAgICBdO1xyXG4gICAgICAgICAgICBmOGJbMl0gPSBidWZbcG9zICsgMV07XHJcbiAgICAgICAgICAgIGY4YlsxXSA9IGJ1Zltwb3MgKyAyXTtcclxuICAgICAgICAgICAgZjhiWzBdID0gYnVmW3BvcyArIDNdO1xyXG4gICAgICAgICAgICByZXR1cm4gZjMyWzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBleHBvcnRzLnJlYWRGbG9hdExFID0gbGUgPyByZWFkRmxvYXRfZjMyX2NweSA6IHJlYWRGbG9hdF9mMzJfcmV2O1xyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgZXhwb3J0cy5yZWFkRmxvYXRCRSA9IGxlID8gcmVhZEZsb2F0X2YzMl9yZXYgOiByZWFkRmxvYXRfZjMyX2NweTtcclxuXHJcbiAgICAvLyBmbG9hdDogaWVlZTc1NFxyXG4gICAgfSkoKTsgZWxzZSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHdyaXRlRmxvYXRfaWVlZTc1NCh3cml0ZVVpbnQsIHZhbCwgYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgdmFyIHNpZ24gPSB2YWwgPCAwID8gMSA6IDA7XHJcbiAgICAgICAgICAgIGlmIChzaWduKVxyXG4gICAgICAgICAgICAgICAgdmFsID0gLXZhbDtcclxuICAgICAgICAgICAgaWYgKHZhbCA9PT0gMClcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgxIC8gdmFsID4gMCA/IC8qIHBvc2l0aXZlICovIDAgOiAvKiBuZWdhdGl2ZSAwICovIDIxNDc0ODM2NDgsIGJ1ZiwgcG9zKTtcclxuICAgICAgICAgICAgZWxzZSBpZiAoaXNOYU4odmFsKSlcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgyMTQzMjg5MzQ0LCBidWYsIHBvcyk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHZhbCA+IDMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgpIC8vICstSW5maW5pdHlcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgoc2lnbiA8PCAzMSB8IDIxMzkwOTUwNDApID4+PiAwLCBidWYsIHBvcyk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHZhbCA8IDEuMTc1NDk0MzUwODIyMjg3NWUtMzgpIC8vIGRlbm9ybWFsXHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoKHNpZ24gPDwgMzEgfCBNYXRoLnJvdW5kKHZhbCAvIDEuNDAxMjk4NDY0MzI0ODE3ZS00NSkpID4+PiAwLCBidWYsIHBvcyk7XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIGV4cG9uZW50ID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWwpIC8gTWF0aC5MTjIpLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hbnRpc3NhID0gTWF0aC5yb3VuZCh2YWwgKiBNYXRoLnBvdygyLCAtZXhwb25lbnQpICogODM4ODYwOCkgJiA4Mzg4NjA3O1xyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KChzaWduIDw8IDMxIHwgZXhwb25lbnQgKyAxMjcgPDwgMjMgfCBtYW50aXNzYSkgPj4+IDAsIGJ1ZiwgcG9zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXhwb3J0cy53cml0ZUZsb2F0TEUgPSB3cml0ZUZsb2F0X2llZWU3NTQuYmluZChudWxsLCB3cml0ZVVpbnRMRSk7XHJcbiAgICAgICAgZXhwb3J0cy53cml0ZUZsb2F0QkUgPSB3cml0ZUZsb2F0X2llZWU3NTQuYmluZChudWxsLCB3cml0ZVVpbnRCRSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlYWRGbG9hdF9pZWVlNzU0KHJlYWRVaW50LCBidWYsIHBvcykge1xyXG4gICAgICAgICAgICB2YXIgdWludCA9IHJlYWRVaW50KGJ1ZiwgcG9zKSxcclxuICAgICAgICAgICAgICAgIHNpZ24gPSAodWludCA+PiAzMSkgKiAyICsgMSxcclxuICAgICAgICAgICAgICAgIGV4cG9uZW50ID0gdWludCA+Pj4gMjMgJiAyNTUsXHJcbiAgICAgICAgICAgICAgICBtYW50aXNzYSA9IHVpbnQgJiA4Mzg4NjA3O1xyXG4gICAgICAgICAgICByZXR1cm4gZXhwb25lbnQgPT09IDI1NVxyXG4gICAgICAgICAgICAgICAgPyBtYW50aXNzYVxyXG4gICAgICAgICAgICAgICAgPyBOYU5cclxuICAgICAgICAgICAgICAgIDogc2lnbiAqIEluZmluaXR5XHJcbiAgICAgICAgICAgICAgICA6IGV4cG9uZW50ID09PSAwIC8vIGRlbm9ybWFsXHJcbiAgICAgICAgICAgICAgICA/IHNpZ24gKiAxLjQwMTI5ODQ2NDMyNDgxN2UtNDUgKiBtYW50aXNzYVxyXG4gICAgICAgICAgICAgICAgOiBzaWduICogTWF0aC5wb3coMiwgZXhwb25lbnQgLSAxNTApICogKG1hbnRpc3NhICsgODM4ODYwOCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBleHBvcnRzLnJlYWRGbG9hdExFID0gcmVhZEZsb2F0X2llZWU3NTQuYmluZChudWxsLCByZWFkVWludExFKTtcclxuICAgICAgICBleHBvcnRzLnJlYWRGbG9hdEJFID0gcmVhZEZsb2F0X2llZWU3NTQuYmluZChudWxsLCByZWFkVWludEJFKTtcclxuXHJcbiAgICB9KSgpO1xyXG5cclxuICAgIC8vIGRvdWJsZTogdHlwZWQgYXJyYXlcclxuICAgIGlmICh0eXBlb2YgRmxvYXQ2NEFycmF5ICE9PSBcInVuZGVmaW5lZFwiKSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHZhciBmNjQgPSBuZXcgRmxvYXQ2NEFycmF5KFstMF0pLFxyXG4gICAgICAgICAgICBmOGIgPSBuZXcgVWludDhBcnJheShmNjQuYnVmZmVyKSxcclxuICAgICAgICAgICAgbGUgID0gZjhiWzddID09PSAxMjg7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHdyaXRlRG91YmxlX2Y2NF9jcHkodmFsLCBidWYsIHBvcykge1xyXG4gICAgICAgICAgICBmNjRbMF0gPSB2YWw7XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgICAgXSA9IGY4YlswXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDFdID0gZjhiWzFdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgMl0gPSBmOGJbMl07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAzXSA9IGY4YlszXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDRdID0gZjhiWzRdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgNV0gPSBmOGJbNV07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyA2XSA9IGY4Yls2XTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDddID0gZjhiWzddO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gd3JpdGVEb3VibGVfZjY0X3Jldih2YWwsIGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIGY2NFswXSA9IHZhbDtcclxuICAgICAgICAgICAgYnVmW3BvcyAgICBdID0gZjhiWzddO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgMV0gPSBmOGJbNl07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAyXSA9IGY4Yls1XTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDNdID0gZjhiWzRdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgNF0gPSBmOGJbM107XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyA1XSA9IGY4YlsyXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDZdID0gZjhiWzFdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgN10gPSBmOGJbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgIGV4cG9ydHMud3JpdGVEb3VibGVMRSA9IGxlID8gd3JpdGVEb3VibGVfZjY0X2NweSA6IHdyaXRlRG91YmxlX2Y2NF9yZXY7XHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBleHBvcnRzLndyaXRlRG91YmxlQkUgPSBsZSA/IHdyaXRlRG91YmxlX2Y2NF9yZXYgOiB3cml0ZURvdWJsZV9mNjRfY3B5O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiByZWFkRG91YmxlX2Y2NF9jcHkoYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgZjhiWzBdID0gYnVmW3BvcyAgICBdO1xyXG4gICAgICAgICAgICBmOGJbMV0gPSBidWZbcG9zICsgMV07XHJcbiAgICAgICAgICAgIGY4YlsyXSA9IGJ1Zltwb3MgKyAyXTtcclxuICAgICAgICAgICAgZjhiWzNdID0gYnVmW3BvcyArIDNdO1xyXG4gICAgICAgICAgICBmOGJbNF0gPSBidWZbcG9zICsgNF07XHJcbiAgICAgICAgICAgIGY4Yls1XSA9IGJ1Zltwb3MgKyA1XTtcclxuICAgICAgICAgICAgZjhiWzZdID0gYnVmW3BvcyArIDZdO1xyXG4gICAgICAgICAgICBmOGJbN10gPSBidWZbcG9zICsgN107XHJcbiAgICAgICAgICAgIHJldHVybiBmNjRbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiByZWFkRG91YmxlX2Y2NF9yZXYoYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgZjhiWzddID0gYnVmW3BvcyAgICBdO1xyXG4gICAgICAgICAgICBmOGJbNl0gPSBidWZbcG9zICsgMV07XHJcbiAgICAgICAgICAgIGY4Yls1XSA9IGJ1Zltwb3MgKyAyXTtcclxuICAgICAgICAgICAgZjhiWzRdID0gYnVmW3BvcyArIDNdO1xyXG4gICAgICAgICAgICBmOGJbM10gPSBidWZbcG9zICsgNF07XHJcbiAgICAgICAgICAgIGY4YlsyXSA9IGJ1Zltwb3MgKyA1XTtcclxuICAgICAgICAgICAgZjhiWzFdID0gYnVmW3BvcyArIDZdO1xyXG4gICAgICAgICAgICBmOGJbMF0gPSBidWZbcG9zICsgN107XHJcbiAgICAgICAgICAgIHJldHVybiBmNjRbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgIGV4cG9ydHMucmVhZERvdWJsZUxFID0gbGUgPyByZWFkRG91YmxlX2Y2NF9jcHkgOiByZWFkRG91YmxlX2Y2NF9yZXY7XHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBleHBvcnRzLnJlYWREb3VibGVCRSA9IGxlID8gcmVhZERvdWJsZV9mNjRfcmV2IDogcmVhZERvdWJsZV9mNjRfY3B5O1xyXG5cclxuICAgIC8vIGRvdWJsZTogaWVlZTc1NFxyXG4gICAgfSkoKTsgZWxzZSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHdyaXRlRG91YmxlX2llZWU3NTQod3JpdGVVaW50LCBvZmYwLCBvZmYxLCB2YWwsIGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIHZhciBzaWduID0gdmFsIDwgMCA/IDEgOiAwO1xyXG4gICAgICAgICAgICBpZiAoc2lnbilcclxuICAgICAgICAgICAgICAgIHZhbCA9IC12YWw7XHJcbiAgICAgICAgICAgIGlmICh2YWwgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgwLCBidWYsIHBvcyArIG9mZjApO1xyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KDEgLyB2YWwgPiAwID8gLyogcG9zaXRpdmUgKi8gMCA6IC8qIG5lZ2F0aXZlIDAgKi8gMjE0NzQ4MzY0OCwgYnVmLCBwb3MgKyBvZmYxKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc05hTih2YWwpKSB7XHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoMCwgYnVmLCBwb3MgKyBvZmYwKTtcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgyMTQ2OTU5MzYwLCBidWYsIHBvcyArIG9mZjEpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbCA+IDEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4KSB7IC8vICstSW5maW5pdHlcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgwLCBidWYsIHBvcyArIG9mZjApO1xyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KChzaWduIDw8IDMxIHwgMjE0NjQzNTA3MikgPj4+IDAsIGJ1ZiwgcG9zICsgb2ZmMSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWFudGlzc2E7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsIDwgMi4yMjUwNzM4NTg1MDcyMDE0ZS0zMDgpIHsgLy8gZGVub3JtYWxcclxuICAgICAgICAgICAgICAgICAgICBtYW50aXNzYSA9IHZhbCAvIDVlLTMyNDtcclxuICAgICAgICAgICAgICAgICAgICB3cml0ZVVpbnQobWFudGlzc2EgPj4+IDAsIGJ1ZiwgcG9zICsgb2ZmMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgd3JpdGVVaW50KChzaWduIDw8IDMxIHwgbWFudGlzc2EgLyA0Mjk0OTY3Mjk2KSA+Pj4gMCwgYnVmLCBwb3MgKyBvZmYxKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV4cG9uZW50ID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWwpIC8gTWF0aC5MTjIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChleHBvbmVudCA9PT0gMTAyNClcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwb25lbnQgPSAxMDIzO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hbnRpc3NhID0gdmFsICogTWF0aC5wb3coMiwgLWV4cG9uZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB3cml0ZVVpbnQobWFudGlzc2EgKiA0NTAzNTk5NjI3MzcwNDk2ID4+PiAwLCBidWYsIHBvcyArIG9mZjApO1xyXG4gICAgICAgICAgICAgICAgICAgIHdyaXRlVWludCgoc2lnbiA8PCAzMSB8IGV4cG9uZW50ICsgMTAyMyA8PCAyMCB8IG1hbnRpc3NhICogMTA0ODU3NiAmIDEwNDg1NzUpID4+PiAwLCBidWYsIHBvcyArIG9mZjEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBleHBvcnRzLndyaXRlRG91YmxlTEUgPSB3cml0ZURvdWJsZV9pZWVlNzU0LmJpbmQobnVsbCwgd3JpdGVVaW50TEUsIDAsIDQpO1xyXG4gICAgICAgIGV4cG9ydHMud3JpdGVEb3VibGVCRSA9IHdyaXRlRG91YmxlX2llZWU3NTQuYmluZChudWxsLCB3cml0ZVVpbnRCRSwgNCwgMCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlYWREb3VibGVfaWVlZTc1NChyZWFkVWludCwgb2ZmMCwgb2ZmMSwgYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgdmFyIGxvID0gcmVhZFVpbnQoYnVmLCBwb3MgKyBvZmYwKSxcclxuICAgICAgICAgICAgICAgIGhpID0gcmVhZFVpbnQoYnVmLCBwb3MgKyBvZmYxKTtcclxuICAgICAgICAgICAgdmFyIHNpZ24gPSAoaGkgPj4gMzEpICogMiArIDEsXHJcbiAgICAgICAgICAgICAgICBleHBvbmVudCA9IGhpID4+PiAyMCAmIDIwNDcsXHJcbiAgICAgICAgICAgICAgICBtYW50aXNzYSA9IDQyOTQ5NjcyOTYgKiAoaGkgJiAxMDQ4NTc1KSArIGxvO1xyXG4gICAgICAgICAgICByZXR1cm4gZXhwb25lbnQgPT09IDIwNDdcclxuICAgICAgICAgICAgICAgID8gbWFudGlzc2FcclxuICAgICAgICAgICAgICAgID8gTmFOXHJcbiAgICAgICAgICAgICAgICA6IHNpZ24gKiBJbmZpbml0eVxyXG4gICAgICAgICAgICAgICAgOiBleHBvbmVudCA9PT0gMCAvLyBkZW5vcm1hbFxyXG4gICAgICAgICAgICAgICAgPyBzaWduICogNWUtMzI0ICogbWFudGlzc2FcclxuICAgICAgICAgICAgICAgIDogc2lnbiAqIE1hdGgucG93KDIsIGV4cG9uZW50IC0gMTA3NSkgKiAobWFudGlzc2EgKyA0NTAzNTk5NjI3MzcwNDk2KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV4cG9ydHMucmVhZERvdWJsZUxFID0gcmVhZERvdWJsZV9pZWVlNzU0LmJpbmQobnVsbCwgcmVhZFVpbnRMRSwgMCwgNCk7XHJcbiAgICAgICAgZXhwb3J0cy5yZWFkRG91YmxlQkUgPSByZWFkRG91YmxlX2llZWU3NTQuYmluZChudWxsLCByZWFkVWludEJFLCA0LCAwKTtcclxuXHJcbiAgICB9KSgpO1xyXG5cclxuICAgIHJldHVybiBleHBvcnRzO1xyXG59XHJcblxyXG4vLyB1aW50IGhlbHBlcnNcclxuXHJcbmZ1bmN0aW9uIHdyaXRlVWludExFKHZhbCwgYnVmLCBwb3MpIHtcclxuICAgIGJ1Zltwb3MgICAgXSA9ICB2YWwgICAgICAgICYgMjU1O1xyXG4gICAgYnVmW3BvcyArIDFdID0gIHZhbCA+Pj4gOCAgJiAyNTU7XHJcbiAgICBidWZbcG9zICsgMl0gPSAgdmFsID4+PiAxNiAmIDI1NTtcclxuICAgIGJ1Zltwb3MgKyAzXSA9ICB2YWwgPj4+IDI0O1xyXG59XHJcblxyXG5mdW5jdGlvbiB3cml0ZVVpbnRCRSh2YWwsIGJ1ZiwgcG9zKSB7XHJcbiAgICBidWZbcG9zICAgIF0gPSAgdmFsID4+PiAyNDtcclxuICAgIGJ1Zltwb3MgKyAxXSA9ICB2YWwgPj4+IDE2ICYgMjU1O1xyXG4gICAgYnVmW3BvcyArIDJdID0gIHZhbCA+Pj4gOCAgJiAyNTU7XHJcbiAgICBidWZbcG9zICsgM10gPSAgdmFsICAgICAgICAmIDI1NTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVhZFVpbnRMRShidWYsIHBvcykge1xyXG4gICAgcmV0dXJuIChidWZbcG9zICAgIF1cclxuICAgICAgICAgIHwgYnVmW3BvcyArIDFdIDw8IDhcclxuICAgICAgICAgIHwgYnVmW3BvcyArIDJdIDw8IDE2XHJcbiAgICAgICAgICB8IGJ1Zltwb3MgKyAzXSA8PCAyNCkgPj4+IDA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlYWRVaW50QkUoYnVmLCBwb3MpIHtcclxuICAgIHJldHVybiAoYnVmW3BvcyAgICBdIDw8IDI0XHJcbiAgICAgICAgICB8IGJ1Zltwb3MgKyAxXSA8PCAxNlxyXG4gICAgICAgICAgfCBidWZbcG9zICsgMl0gPDwgOFxyXG4gICAgICAgICAgfCBidWZbcG9zICsgM10pID4+PiAwO1xyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGlucXVpcmU7XHJcblxyXG4vKipcclxuICogUmVxdWlyZXMgYSBtb2R1bGUgb25seSBpZiBhdmFpbGFibGUuXHJcbiAqIEBtZW1iZXJvZiB1dGlsXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2R1bGVOYW1lIE1vZHVsZSB0byByZXF1aXJlXHJcbiAqIEByZXR1cm5zIHs/T2JqZWN0fSBSZXF1aXJlZCBtb2R1bGUgaWYgYXZhaWxhYmxlIGFuZCBub3QgZW1wdHksIG90aGVyd2lzZSBgbnVsbGBcclxuICovXHJcbmZ1bmN0aW9uIGlucXVpcmUobW9kdWxlTmFtZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB2YXIgbW9kID0gZXZhbChcInF1aXJlXCIucmVwbGFjZSgvXi8sXCJyZVwiKSkobW9kdWxlTmFtZSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZXZhbFxyXG4gICAgICAgIGlmIChtb2QgJiYgKG1vZC5sZW5ndGggfHwgT2JqZWN0LmtleXMobW9kKS5sZW5ndGgpKVxyXG4gICAgICAgICAgICByZXR1cm4gbW9kO1xyXG4gICAgfSBjYXRjaCAoZSkge30gLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1lbXB0eVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbm1vZHVsZS5leHBvcnRzID0gcG9vbDtcclxuXHJcbi8qKlxyXG4gKiBBbiBhbGxvY2F0b3IgYXMgdXNlZCBieSB7QGxpbmsgdXRpbC5wb29sfS5cclxuICogQHR5cGVkZWYgUG9vbEFsbG9jYXRvclxyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzaXplIEJ1ZmZlciBzaXplXHJcbiAqIEByZXR1cm5zIHtVaW50OEFycmF5fSBCdWZmZXJcclxuICovXHJcblxyXG4vKipcclxuICogQSBzbGljZXIgYXMgdXNlZCBieSB7QGxpbmsgdXRpbC5wb29sfS5cclxuICogQHR5cGVkZWYgUG9vbFNsaWNlclxyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCBTdGFydCBvZmZzZXRcclxuICogQHBhcmFtIHtudW1iZXJ9IGVuZCBFbmQgb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHtVaW50OEFycmF5fSBCdWZmZXIgc2xpY2VcclxuICogQHRoaXMge1VpbnQ4QXJyYXl9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEEgZ2VuZXJhbCBwdXJwb3NlIGJ1ZmZlciBwb29sLlxyXG4gKiBAbWVtYmVyb2YgdXRpbFxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtQb29sQWxsb2NhdG9yfSBhbGxvYyBBbGxvY2F0b3JcclxuICogQHBhcmFtIHtQb29sU2xpY2VyfSBzbGljZSBTbGljZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IFtzaXplPTgxOTJdIFNsYWIgc2l6ZVxyXG4gKiBAcmV0dXJucyB7UG9vbEFsbG9jYXRvcn0gUG9vbGVkIGFsbG9jYXRvclxyXG4gKi9cclxuZnVuY3Rpb24gcG9vbChhbGxvYywgc2xpY2UsIHNpemUpIHtcclxuICAgIHZhciBTSVpFICAgPSBzaXplIHx8IDgxOTI7XHJcbiAgICB2YXIgTUFYICAgID0gU0laRSA+Pj4gMTtcclxuICAgIHZhciBzbGFiICAgPSBudWxsO1xyXG4gICAgdmFyIG9mZnNldCA9IFNJWkU7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gcG9vbF9hbGxvYyhzaXplKSB7XHJcbiAgICAgICAgaWYgKHNpemUgPCAxIHx8IHNpemUgPiBNQVgpXHJcbiAgICAgICAgICAgIHJldHVybiBhbGxvYyhzaXplKTtcclxuICAgICAgICBpZiAob2Zmc2V0ICsgc2l6ZSA+IFNJWkUpIHtcclxuICAgICAgICAgICAgc2xhYiA9IGFsbG9jKFNJWkUpO1xyXG4gICAgICAgICAgICBvZmZzZXQgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgYnVmID0gc2xpY2UuY2FsbChzbGFiLCBvZmZzZXQsIG9mZnNldCArPSBzaXplKTtcclxuICAgICAgICBpZiAob2Zmc2V0ICYgNykgLy8gYWxpZ24gdG8gMzIgYml0XHJcbiAgICAgICAgICAgIG9mZnNldCA9IChvZmZzZXQgfCA3KSArIDE7XHJcbiAgICAgICAgcmV0dXJuIGJ1ZjtcclxuICAgIH07XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4vKipcclxuICogQSBtaW5pbWFsIFVURjggaW1wbGVtZW50YXRpb24gZm9yIG51bWJlciBhcnJheXMuXHJcbiAqIEBtZW1iZXJvZiB1dGlsXHJcbiAqIEBuYW1lc3BhY2VcclxuICovXHJcbnZhciB1dGY4ID0gZXhwb3J0cztcclxuXHJcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBVVEY4IGJ5dGUgbGVuZ3RoIG9mIGEgc3RyaW5nLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFN0cmluZ1xyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBCeXRlIGxlbmd0aFxyXG4gKi9cclxudXRmOC5sZW5ndGggPSBmdW5jdGlvbiB1dGY4X2xlbmd0aChzdHJpbmcpIHtcclxuICAgIHZhciBsZW4gPSAwLFxyXG4gICAgICAgIGMgPSAwO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBjID0gc3RyaW5nLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgICAgaWYgKGMgPCAxMjgpXHJcbiAgICAgICAgICAgIGxlbiArPSAxO1xyXG4gICAgICAgIGVsc2UgaWYgKGMgPCAyMDQ4KVxyXG4gICAgICAgICAgICBsZW4gKz0gMjtcclxuICAgICAgICBlbHNlIGlmICgoYyAmIDB4RkMwMCkgPT09IDB4RDgwMCAmJiAoc3RyaW5nLmNoYXJDb2RlQXQoaSArIDEpICYgMHhGQzAwKSA9PT0gMHhEQzAwKSB7XHJcbiAgICAgICAgICAgICsraTtcclxuICAgICAgICAgICAgbGVuICs9IDQ7XHJcbiAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgIGxlbiArPSAzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxlbjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZWFkcyBVVEY4IGJ5dGVzIGFzIGEgc3RyaW5nLlxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZmZlciBTb3VyY2UgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCBTb3VyY2Ugc3RhcnRcclxuICogQHBhcmFtIHtudW1iZXJ9IGVuZCBTb3VyY2UgZW5kXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFN0cmluZyByZWFkXHJcbiAqL1xyXG51dGY4LnJlYWQgPSBmdW5jdGlvbiB1dGY4X3JlYWQoYnVmZmVyLCBzdGFydCwgZW5kKSB7XHJcbiAgICB2YXIgbGVuID0gZW5kIC0gc3RhcnQ7XHJcbiAgICBpZiAobGVuIDwgMSlcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIHZhciBwYXJ0cyA9IG51bGwsXHJcbiAgICAgICAgY2h1bmsgPSBbXSxcclxuICAgICAgICBpID0gMCwgLy8gY2hhciBvZmZzZXRcclxuICAgICAgICB0OyAgICAgLy8gdGVtcG9yYXJ5XHJcbiAgICB3aGlsZSAoc3RhcnQgPCBlbmQpIHtcclxuICAgICAgICB0ID0gYnVmZmVyW3N0YXJ0KytdO1xyXG4gICAgICAgIGlmICh0IDwgMTI4KVxyXG4gICAgICAgICAgICBjaHVua1tpKytdID0gdDtcclxuICAgICAgICBlbHNlIGlmICh0ID4gMTkxICYmIHQgPCAyMjQpXHJcbiAgICAgICAgICAgIGNodW5rW2krK10gPSAodCAmIDMxKSA8PCA2IHwgYnVmZmVyW3N0YXJ0KytdICYgNjM7XHJcbiAgICAgICAgZWxzZSBpZiAodCA+IDIzOSAmJiB0IDwgMzY1KSB7XHJcbiAgICAgICAgICAgIHQgPSAoKHQgJiA3KSA8PCAxOCB8IChidWZmZXJbc3RhcnQrK10gJiA2MykgPDwgMTIgfCAoYnVmZmVyW3N0YXJ0KytdICYgNjMpIDw8IDYgfCBidWZmZXJbc3RhcnQrK10gJiA2MykgLSAweDEwMDAwO1xyXG4gICAgICAgICAgICBjaHVua1tpKytdID0gMHhEODAwICsgKHQgPj4gMTApO1xyXG4gICAgICAgICAgICBjaHVua1tpKytdID0gMHhEQzAwICsgKHQgJiAxMDIzKTtcclxuICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgY2h1bmtbaSsrXSA9ICh0ICYgMTUpIDw8IDEyIHwgKGJ1ZmZlcltzdGFydCsrXSAmIDYzKSA8PCA2IHwgYnVmZmVyW3N0YXJ0KytdICYgNjM7XHJcbiAgICAgICAgaWYgKGkgPiA4MTkxKSB7XHJcbiAgICAgICAgICAgIChwYXJ0cyB8fCAocGFydHMgPSBbXSkpLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNodW5rKSk7XHJcbiAgICAgICAgICAgIGkgPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChwYXJ0cykge1xyXG4gICAgICAgIGlmIChpKVxyXG4gICAgICAgICAgICBwYXJ0cy5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjaHVuay5zbGljZSgwLCBpKSkpO1xyXG4gICAgICAgIHJldHVybiBwYXJ0cy5qb2luKFwiXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjaHVuay5zbGljZSgwLCBpKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogV3JpdGVzIGEgc3RyaW5nIGFzIFVURjggYnl0ZXMuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgU291cmNlIHN0cmluZ1xyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZmZlciBEZXN0aW5hdGlvbiBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCBEZXN0aW5hdGlvbiBvZmZzZXRcclxuICogQHJldHVybnMge251bWJlcn0gQnl0ZXMgd3JpdHRlblxyXG4gKi9cclxudXRmOC53cml0ZSA9IGZ1bmN0aW9uIHV0Zjhfd3JpdGUoc3RyaW5nLCBidWZmZXIsIG9mZnNldCkge1xyXG4gICAgdmFyIHN0YXJ0ID0gb2Zmc2V0LFxyXG4gICAgICAgIGMxLCAvLyBjaGFyYWN0ZXIgMVxyXG4gICAgICAgIGMyOyAvLyBjaGFyYWN0ZXIgMlxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBjMSA9IHN0cmluZy5jaGFyQ29kZUF0KGkpO1xyXG4gICAgICAgIGlmIChjMSA8IDEyOCkge1xyXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gYzE7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjMSA8IDIwNDgpIHtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxID4+IDYgICAgICAgfCAxOTI7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSBjMSAgICAgICAmIDYzIHwgMTI4O1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKGMxICYgMHhGQzAwKSA9PT0gMHhEODAwICYmICgoYzIgPSBzdHJpbmcuY2hhckNvZGVBdChpICsgMSkpICYgMHhGQzAwKSA9PT0gMHhEQzAwKSB7XHJcbiAgICAgICAgICAgIGMxID0gMHgxMDAwMCArICgoYzEgJiAweDAzRkYpIDw8IDEwKSArIChjMiAmIDB4MDNGRik7XHJcbiAgICAgICAgICAgICsraTtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxID4+IDE4ICAgICAgfCAyNDA7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSBjMSA+PiAxMiAmIDYzIHwgMTI4O1xyXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gYzEgPj4gNiAgJiA2MyB8IDEyODtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxICAgICAgICYgNjMgfCAxMjg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxID4+IDEyICAgICAgfCAyMjQ7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSBjMSA+PiA2ICAmIDYzIHwgMTI4O1xyXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gYzEgICAgICAgJiA2MyB8IDEyODtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2Zmc2V0IC0gc3RhcnQ7XHJcbn07XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gTG9uZztcclxuXHJcbi8qKlxyXG4gKiB3YXNtIG9wdGltaXphdGlvbnMsIHRvIGRvIG5hdGl2ZSBpNjQgbXVsdGlwbGljYXRpb24gYW5kIGRpdmlkZVxyXG4gKi9cclxudmFyIHdhc20gPSBudWxsO1xyXG5cclxudHJ5IHtcclxuICB3YXNtID0gbmV3IFdlYkFzc2VtYmx5Lkluc3RhbmNlKG5ldyBXZWJBc3NlbWJseS5Nb2R1bGUobmV3IFVpbnQ4QXJyYXkoW1xyXG4gICAgMCwgOTcsIDExNSwgMTA5LCAxLCAwLCAwLCAwLCAxLCAxMywgMiwgOTYsIDAsIDEsIDEyNywgOTYsIDQsIDEyNywgMTI3LCAxMjcsIDEyNywgMSwgMTI3LCAzLCA3LCA2LCAwLCAxLCAxLCAxLCAxLCAxLCA2LCA2LCAxLCAxMjcsIDEsIDY1LCAwLCAxMSwgNywgNTAsIDYsIDMsIDEwOSwgMTE3LCAxMDgsIDAsIDEsIDUsIDEwMCwgMTA1LCAxMTgsIDk1LCAxMTUsIDAsIDIsIDUsIDEwMCwgMTA1LCAxMTgsIDk1LCAxMTcsIDAsIDMsIDUsIDExNCwgMTAxLCAxMDksIDk1LCAxMTUsIDAsIDQsIDUsIDExNCwgMTAxLCAxMDksIDk1LCAxMTcsIDAsIDUsIDgsIDEwMywgMTAxLCAxMTYsIDk1LCAxMDQsIDEwNSwgMTAzLCAxMDQsIDAsIDAsIDEwLCAxOTEsIDEsIDYsIDQsIDAsIDM1LCAwLCAxMSwgMzYsIDEsIDEsIDEyNiwgMzIsIDAsIDE3MywgMzIsIDEsIDE3MywgNjYsIDMyLCAxMzQsIDEzMiwgMzIsIDIsIDE3MywgMzIsIDMsIDE3MywgNjYsIDMyLCAxMzQsIDEzMiwgMTI2LCAzNCwgNCwgNjYsIDMyLCAxMzUsIDE2NywgMzYsIDAsIDMyLCA0LCAxNjcsIDExLCAzNiwgMSwgMSwgMTI2LCAzMiwgMCwgMTczLCAzMiwgMSwgMTczLCA2NiwgMzIsIDEzNCwgMTMyLCAzMiwgMiwgMTczLCAzMiwgMywgMTczLCA2NiwgMzIsIDEzNCwgMTMyLCAxMjcsIDM0LCA0LCA2NiwgMzIsIDEzNSwgMTY3LCAzNiwgMCwgMzIsIDQsIDE2NywgMTEsIDM2LCAxLCAxLCAxMjYsIDMyLCAwLCAxNzMsIDMyLCAxLCAxNzMsIDY2LCAzMiwgMTM0LCAxMzIsIDMyLCAyLCAxNzMsIDMyLCAzLCAxNzMsIDY2LCAzMiwgMTM0LCAxMzIsIDEyOCwgMzQsIDQsIDY2LCAzMiwgMTM1LCAxNjcsIDM2LCAwLCAzMiwgNCwgMTY3LCAxMSwgMzYsIDEsIDEsIDEyNiwgMzIsIDAsIDE3MywgMzIsIDEsIDE3MywgNjYsIDMyLCAxMzQsIDEzMiwgMzIsIDIsIDE3MywgMzIsIDMsIDE3MywgNjYsIDMyLCAxMzQsIDEzMiwgMTI5LCAzNCwgNCwgNjYsIDMyLCAxMzUsIDE2NywgMzYsIDAsIDMyLCA0LCAxNjcsIDExLCAzNiwgMSwgMSwgMTI2LCAzMiwgMCwgMTczLCAzMiwgMSwgMTczLCA2NiwgMzIsIDEzNCwgMTMyLCAzMiwgMiwgMTczLCAzMiwgMywgMTczLCA2NiwgMzIsIDEzNCwgMTMyLCAxMzAsIDM0LCA0LCA2NiwgMzIsIDEzNSwgMTY3LCAzNiwgMCwgMzIsIDQsIDE2NywgMTFcclxuICBdKSksIHt9KS5leHBvcnRzO1xyXG59IGNhdGNoIChlKSB7XHJcbiAgLy8gbm8gd2FzbSBzdXBwb3J0IDooXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb25zdHJ1Y3RzIGEgNjQgYml0IHR3bydzLWNvbXBsZW1lbnQgaW50ZWdlciwgZ2l2ZW4gaXRzIGxvdyBhbmQgaGlnaCAzMiBiaXQgdmFsdWVzIGFzICpzaWduZWQqIGludGVnZXJzLlxyXG4gKiAgU2VlIHRoZSBmcm9tKiBmdW5jdGlvbnMgYmVsb3cgZm9yIG1vcmUgY29udmVuaWVudCB3YXlzIG9mIGNvbnN0cnVjdGluZyBMb25ncy5cclxuICogQGV4cG9ydHMgTG9uZ1xyXG4gKiBAY2xhc3MgQSBMb25nIGNsYXNzIGZvciByZXByZXNlbnRpbmcgYSA2NCBiaXQgdHdvJ3MtY29tcGxlbWVudCBpbnRlZ2VyIHZhbHVlLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gbG93IFRoZSBsb3cgKHNpZ25lZCkgMzIgYml0cyBvZiB0aGUgbG9uZ1xyXG4gKiBAcGFyYW0ge251bWJlcn0gaGlnaCBUaGUgaGlnaCAoc2lnbmVkKSAzMiBiaXRzIG9mIHRoZSBsb25nXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IHVuc2lnbmVkIFdoZXRoZXIgdW5zaWduZWQgb3Igbm90LCBkZWZhdWx0cyB0byBzaWduZWRcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBMb25nKGxvdywgaGlnaCwgdW5zaWduZWQpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBsb3cgMzIgYml0cyBhcyBhIHNpZ25lZCB2YWx1ZS5cclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHRoaXMubG93ID0gbG93IHwgMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBoaWdoIDMyIGJpdHMgYXMgYSBzaWduZWQgdmFsdWUuXHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmhpZ2ggPSBoaWdoIHwgMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdoZXRoZXIgdW5zaWduZWQgb3Igbm90LlxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIHRoaXMudW5zaWduZWQgPSAhIXVuc2lnbmVkO1xyXG59XHJcblxyXG4vLyBUaGUgaW50ZXJuYWwgcmVwcmVzZW50YXRpb24gb2YgYSBsb25nIGlzIHRoZSB0d28gZ2l2ZW4gc2lnbmVkLCAzMi1iaXQgdmFsdWVzLlxyXG4vLyBXZSB1c2UgMzItYml0IHBpZWNlcyBiZWNhdXNlIHRoZXNlIGFyZSB0aGUgc2l6ZSBvZiBpbnRlZ2VycyBvbiB3aGljaFxyXG4vLyBKYXZhc2NyaXB0IHBlcmZvcm1zIGJpdC1vcGVyYXRpb25zLiAgRm9yIG9wZXJhdGlvbnMgbGlrZSBhZGRpdGlvbiBhbmRcclxuLy8gbXVsdGlwbGljYXRpb24sIHdlIHNwbGl0IGVhY2ggbnVtYmVyIGludG8gMTYgYml0IHBpZWNlcywgd2hpY2ggY2FuIGVhc2lseSBiZVxyXG4vLyBtdWx0aXBsaWVkIHdpdGhpbiBKYXZhc2NyaXB0J3MgZmxvYXRpbmctcG9pbnQgcmVwcmVzZW50YXRpb24gd2l0aG91dCBvdmVyZmxvd1xyXG4vLyBvciBjaGFuZ2UgaW4gc2lnbi5cclxuLy9cclxuLy8gSW4gdGhlIGFsZ29yaXRobXMgYmVsb3csIHdlIGZyZXF1ZW50bHkgcmVkdWNlIHRoZSBuZWdhdGl2ZSBjYXNlIHRvIHRoZVxyXG4vLyBwb3NpdGl2ZSBjYXNlIGJ5IG5lZ2F0aW5nIHRoZSBpbnB1dChzKSBhbmQgdGhlbiBwb3N0LXByb2Nlc3NpbmcgdGhlIHJlc3VsdC5cclxuLy8gTm90ZSB0aGF0IHdlIG11c3QgQUxXQVlTIGNoZWNrIHNwZWNpYWxseSB3aGV0aGVyIHRob3NlIHZhbHVlcyBhcmUgTUlOX1ZBTFVFXHJcbi8vICgtMl42MykgYmVjYXVzZSAtTUlOX1ZBTFVFID09IE1JTl9WQUxVRSAoc2luY2UgMl42MyBjYW5ub3QgYmUgcmVwcmVzZW50ZWQgYXNcclxuLy8gYSBwb3NpdGl2ZSBudW1iZXIsIGl0IG92ZXJmbG93cyBiYWNrIGludG8gYSBuZWdhdGl2ZSkuICBOb3QgaGFuZGxpbmcgdGhpc1xyXG4vLyBjYXNlIHdvdWxkIG9mdGVuIHJlc3VsdCBpbiBpbmZpbml0ZSByZWN1cnNpb24uXHJcbi8vXHJcbi8vIENvbW1vbiBjb25zdGFudCB2YWx1ZXMgWkVSTywgT05FLCBORUdfT05FLCBldGMuIGFyZSBkZWZpbmVkIGJlbG93IHRoZSBmcm9tKlxyXG4vLyBtZXRob2RzIG9uIHdoaWNoIHRoZXkgZGVwZW5kLlxyXG5cclxuLyoqXHJcbiAqIEFuIGluZGljYXRvciB1c2VkIHRvIHJlbGlhYmx5IGRldGVybWluZSBpZiBhbiBvYmplY3QgaXMgYSBMb25nIG9yIG5vdC5cclxuICogQHR5cGUge2Jvb2xlYW59XHJcbiAqIEBjb25zdFxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuTG9uZy5wcm90b3R5cGUuX19pc0xvbmdfXztcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShMb25nLnByb3RvdHlwZSwgXCJfX2lzTG9uZ19fXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcblxyXG4vKipcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7Kn0gb2JqIE9iamVjdFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICogQGlubmVyXHJcbiAqL1xyXG5mdW5jdGlvbiBpc0xvbmcob2JqKSB7XHJcbiAgICByZXR1cm4gKG9iaiAmJiBvYmpbXCJfX2lzTG9uZ19fXCJdKSA9PT0gdHJ1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoZSBzcGVjaWZpZWQgb2JqZWN0IGlzIGEgTG9uZy5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7Kn0gb2JqIE9iamVjdFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbkxvbmcuaXNMb25nID0gaXNMb25nO1xyXG5cclxuLyoqXHJcbiAqIEEgY2FjaGUgb2YgdGhlIExvbmcgcmVwcmVzZW50YXRpb25zIG9mIHNtYWxsIGludGVnZXIgdmFsdWVzLlxyXG4gKiBAdHlwZSB7IU9iamVjdH1cclxuICogQGlubmVyXHJcbiAqL1xyXG52YXIgSU5UX0NBQ0hFID0ge307XHJcblxyXG4vKipcclxuICogQSBjYWNoZSBvZiB0aGUgTG9uZyByZXByZXNlbnRhdGlvbnMgb2Ygc21hbGwgdW5zaWduZWQgaW50ZWdlciB2YWx1ZXMuXHJcbiAqIEB0eXBlIHshT2JqZWN0fVxyXG4gKiBAaW5uZXJcclxuICovXHJcbnZhciBVSU5UX0NBQ0hFID0ge307XHJcblxyXG4vKipcclxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IHVuc2lnbmVkXHJcbiAqIEByZXR1cm5zIHshTG9uZ31cclxuICogQGlubmVyXHJcbiAqL1xyXG5mdW5jdGlvbiBmcm9tSW50KHZhbHVlLCB1bnNpZ25lZCkge1xyXG4gICAgdmFyIG9iaiwgY2FjaGVkT2JqLCBjYWNoZTtcclxuICAgIGlmICh1bnNpZ25lZCkge1xyXG4gICAgICAgIHZhbHVlID4+Pj0gMDtcclxuICAgICAgICBpZiAoY2FjaGUgPSAoMCA8PSB2YWx1ZSAmJiB2YWx1ZSA8IDI1NikpIHtcclxuICAgICAgICAgICAgY2FjaGVkT2JqID0gVUlOVF9DQUNIRVt2YWx1ZV07XHJcbiAgICAgICAgICAgIGlmIChjYWNoZWRPYmopXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGVkT2JqO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvYmogPSBmcm9tQml0cyh2YWx1ZSwgKHZhbHVlIHwgMCkgPCAwID8gLTEgOiAwLCB0cnVlKTtcclxuICAgICAgICBpZiAoY2FjaGUpXHJcbiAgICAgICAgICAgIFVJTlRfQ0FDSEVbdmFsdWVdID0gb2JqO1xyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhbHVlIHw9IDA7XHJcbiAgICAgICAgaWYgKGNhY2hlID0gKC0xMjggPD0gdmFsdWUgJiYgdmFsdWUgPCAxMjgpKSB7XHJcbiAgICAgICAgICAgIGNhY2hlZE9iaiA9IElOVF9DQUNIRVt2YWx1ZV07XHJcbiAgICAgICAgICAgIGlmIChjYWNoZWRPYmopXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGVkT2JqO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvYmogPSBmcm9tQml0cyh2YWx1ZSwgdmFsdWUgPCAwID8gLTEgOiAwLCBmYWxzZSk7XHJcbiAgICAgICAgaWYgKGNhY2hlKVxyXG4gICAgICAgICAgICBJTlRfQ0FDSEVbdmFsdWVdID0gb2JqO1xyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGEgTG9uZyByZXByZXNlbnRpbmcgdGhlIGdpdmVuIDMyIGJpdCBpbnRlZ2VyIHZhbHVlLlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFRoZSAzMiBiaXQgaW50ZWdlciBpbiBxdWVzdGlvblxyXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSB1bnNpZ25lZCBXaGV0aGVyIHVuc2lnbmVkIG9yIG5vdCwgZGVmYXVsdHMgdG8gc2lnbmVkXHJcbiAqIEByZXR1cm5zIHshTG9uZ30gVGhlIGNvcnJlc3BvbmRpbmcgTG9uZyB2YWx1ZVxyXG4gKi9cclxuTG9uZy5mcm9tSW50ID0gZnJvbUludDtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWVcclxuICogQHBhcmFtIHtib29sZWFuPX0gdW5zaWduZWRcclxuICogQHJldHVybnMgeyFMb25nfVxyXG4gKiBAaW5uZXJcclxuICovXHJcbmZ1bmN0aW9uIGZyb21OdW1iZXIodmFsdWUsIHVuc2lnbmVkKSB7XHJcbiAgICBpZiAoaXNOYU4odmFsdWUpKVxyXG4gICAgICAgIHJldHVybiB1bnNpZ25lZCA/IFVaRVJPIDogWkVSTztcclxuICAgIGlmICh1bnNpZ25lZCkge1xyXG4gICAgICAgIGlmICh2YWx1ZSA8IDApXHJcbiAgICAgICAgICAgIHJldHVybiBVWkVSTztcclxuICAgICAgICBpZiAodmFsdWUgPj0gVFdPX1BXUl82NF9EQkwpXHJcbiAgICAgICAgICAgIHJldHVybiBNQVhfVU5TSUdORURfVkFMVUU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICh2YWx1ZSA8PSAtVFdPX1BXUl82M19EQkwpXHJcbiAgICAgICAgICAgIHJldHVybiBNSU5fVkFMVUU7XHJcbiAgICAgICAgaWYgKHZhbHVlICsgMSA+PSBUV09fUFdSXzYzX0RCTClcclxuICAgICAgICAgICAgcmV0dXJuIE1BWF9WQUxVRTtcclxuICAgIH1cclxuICAgIGlmICh2YWx1ZSA8IDApXHJcbiAgICAgICAgcmV0dXJuIGZyb21OdW1iZXIoLXZhbHVlLCB1bnNpZ25lZCkubmVnKCk7XHJcbiAgICByZXR1cm4gZnJvbUJpdHMoKHZhbHVlICUgVFdPX1BXUl8zMl9EQkwpIHwgMCwgKHZhbHVlIC8gVFdPX1BXUl8zMl9EQkwpIHwgMCwgdW5zaWduZWQpO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyBhIExvbmcgcmVwcmVzZW50aW5nIHRoZSBnaXZlbiB2YWx1ZSwgcHJvdmlkZWQgdGhhdCBpdCBpcyBhIGZpbml0ZSBudW1iZXIuIE90aGVyd2lzZSwgemVybyBpcyByZXR1cm5lZC5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBUaGUgbnVtYmVyIGluIHF1ZXN0aW9uXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IHVuc2lnbmVkIFdoZXRoZXIgdW5zaWduZWQgb3Igbm90LCBkZWZhdWx0cyB0byBzaWduZWRcclxuICogQHJldHVybnMgeyFMb25nfSBUaGUgY29ycmVzcG9uZGluZyBMb25nIHZhbHVlXHJcbiAqL1xyXG5Mb25nLmZyb21OdW1iZXIgPSBmcm9tTnVtYmVyO1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBsb3dCaXRzXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBoaWdoQml0c1xyXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSB1bnNpZ25lZFxyXG4gKiBAcmV0dXJucyB7IUxvbmd9XHJcbiAqIEBpbm5lclxyXG4gKi9cclxuZnVuY3Rpb24gZnJvbUJpdHMobG93Qml0cywgaGlnaEJpdHMsIHVuc2lnbmVkKSB7XHJcbiAgICByZXR1cm4gbmV3IExvbmcobG93Qml0cywgaGlnaEJpdHMsIHVuc2lnbmVkKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYSBMb25nIHJlcHJlc2VudGluZyB0aGUgNjQgYml0IGludGVnZXIgdGhhdCBjb21lcyBieSBjb25jYXRlbmF0aW5nIHRoZSBnaXZlbiBsb3cgYW5kIGhpZ2ggYml0cy4gRWFjaCBpc1xyXG4gKiAgYXNzdW1lZCB0byB1c2UgMzIgYml0cy5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBsb3dCaXRzIFRoZSBsb3cgMzIgYml0c1xyXG4gKiBAcGFyYW0ge251bWJlcn0gaGlnaEJpdHMgVGhlIGhpZ2ggMzIgYml0c1xyXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSB1bnNpZ25lZCBXaGV0aGVyIHVuc2lnbmVkIG9yIG5vdCwgZGVmYXVsdHMgdG8gc2lnbmVkXHJcbiAqIEByZXR1cm5zIHshTG9uZ30gVGhlIGNvcnJlc3BvbmRpbmcgTG9uZyB2YWx1ZVxyXG4gKi9cclxuTG9uZy5mcm9tQml0cyA9IGZyb21CaXRzO1xyXG5cclxuLyoqXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge251bWJlcn0gYmFzZVxyXG4gKiBAcGFyYW0ge251bWJlcn0gZXhwb25lbnRcclxuICogQHJldHVybnMge251bWJlcn1cclxuICogQGlubmVyXHJcbiAqL1xyXG52YXIgcG93X2RibCA9IE1hdGgucG93OyAvLyBVc2VkIDQgdGltZXMgKDQqOCB0byAxNSs0KVxyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcclxuICogQHBhcmFtIHsoYm9vbGVhbnxudW1iZXIpPX0gdW5zaWduZWRcclxuICogQHBhcmFtIHtudW1iZXI9fSByYWRpeFxyXG4gKiBAcmV0dXJucyB7IUxvbmd9XHJcbiAqIEBpbm5lclxyXG4gKi9cclxuZnVuY3Rpb24gZnJvbVN0cmluZyhzdHIsIHVuc2lnbmVkLCByYWRpeCkge1xyXG4gICAgaWYgKHN0ci5sZW5ndGggPT09IDApXHJcbiAgICAgICAgdGhyb3cgRXJyb3IoJ2VtcHR5IHN0cmluZycpO1xyXG4gICAgaWYgKHN0ciA9PT0gXCJOYU5cIiB8fCBzdHIgPT09IFwiSW5maW5pdHlcIiB8fCBzdHIgPT09IFwiK0luZmluaXR5XCIgfHwgc3RyID09PSBcIi1JbmZpbml0eVwiKVxyXG4gICAgICAgIHJldHVybiBaRVJPO1xyXG4gICAgaWYgKHR5cGVvZiB1bnNpZ25lZCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAvLyBGb3IgZ29vZy5tYXRoLmxvbmcgY29tcGF0aWJpbGl0eVxyXG4gICAgICAgIHJhZGl4ID0gdW5zaWduZWQsXHJcbiAgICAgICAgdW5zaWduZWQgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdW5zaWduZWQgPSAhISB1bnNpZ25lZDtcclxuICAgIH1cclxuICAgIHJhZGl4ID0gcmFkaXggfHwgMTA7XHJcbiAgICBpZiAocmFkaXggPCAyIHx8IDM2IDwgcmFkaXgpXHJcbiAgICAgICAgdGhyb3cgUmFuZ2VFcnJvcigncmFkaXgnKTtcclxuXHJcbiAgICB2YXIgcDtcclxuICAgIGlmICgocCA9IHN0ci5pbmRleE9mKCctJykpID4gMClcclxuICAgICAgICB0aHJvdyBFcnJvcignaW50ZXJpb3IgaHlwaGVuJyk7XHJcbiAgICBlbHNlIGlmIChwID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIGZyb21TdHJpbmcoc3RyLnN1YnN0cmluZygxKSwgdW5zaWduZWQsIHJhZGl4KS5uZWcoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBEbyBzZXZlcmFsICg4KSBkaWdpdHMgZWFjaCB0aW1lIHRocm91Z2ggdGhlIGxvb3AsIHNvIGFzIHRvXHJcbiAgICAvLyBtaW5pbWl6ZSB0aGUgY2FsbHMgdG8gdGhlIHZlcnkgZXhwZW5zaXZlIGVtdWxhdGVkIGRpdi5cclxuICAgIHZhciByYWRpeFRvUG93ZXIgPSBmcm9tTnVtYmVyKHBvd19kYmwocmFkaXgsIDgpKTtcclxuXHJcbiAgICB2YXIgcmVzdWx0ID0gWkVSTztcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSArPSA4KSB7XHJcbiAgICAgICAgdmFyIHNpemUgPSBNYXRoLm1pbig4LCBzdHIubGVuZ3RoIC0gaSksXHJcbiAgICAgICAgICAgIHZhbHVlID0gcGFyc2VJbnQoc3RyLnN1YnN0cmluZyhpLCBpICsgc2l6ZSksIHJhZGl4KTtcclxuICAgICAgICBpZiAoc2l6ZSA8IDgpIHtcclxuICAgICAgICAgICAgdmFyIHBvd2VyID0gZnJvbU51bWJlcihwb3dfZGJsKHJhZGl4LCBzaXplKSk7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5tdWwocG93ZXIpLmFkZChmcm9tTnVtYmVyKHZhbHVlKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0Lm11bChyYWRpeFRvUG93ZXIpO1xyXG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuYWRkKGZyb21OdW1iZXIodmFsdWUpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXN1bHQudW5zaWduZWQgPSB1bnNpZ25lZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGEgTG9uZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgZ2l2ZW4gc3RyaW5nLCB3cml0dGVuIHVzaW5nIHRoZSBzcGVjaWZpZWQgcmFkaXguXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIFRoZSB0ZXh0dWFsIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBMb25nXHJcbiAqIEBwYXJhbSB7KGJvb2xlYW58bnVtYmVyKT19IHVuc2lnbmVkIFdoZXRoZXIgdW5zaWduZWQgb3Igbm90LCBkZWZhdWx0cyB0byBzaWduZWRcclxuICogQHBhcmFtIHtudW1iZXI9fSByYWRpeCBUaGUgcmFkaXggaW4gd2hpY2ggdGhlIHRleHQgaXMgd3JpdHRlbiAoMi0zNiksIGRlZmF1bHRzIHRvIDEwXHJcbiAqIEByZXR1cm5zIHshTG9uZ30gVGhlIGNvcnJlc3BvbmRpbmcgTG9uZyB2YWx1ZVxyXG4gKi9cclxuTG9uZy5mcm9tU3RyaW5nID0gZnJvbVN0cmluZztcclxuXHJcbi8qKlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfCF7bG93OiBudW1iZXIsIGhpZ2g6IG51bWJlciwgdW5zaWduZWQ6IGJvb2xlYW59fSB2YWxcclxuICogQHBhcmFtIHtib29sZWFuPX0gdW5zaWduZWRcclxuICogQHJldHVybnMgeyFMb25nfVxyXG4gKiBAaW5uZXJcclxuICovXHJcbmZ1bmN0aW9uIGZyb21WYWx1ZSh2YWwsIHVuc2lnbmVkKSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpXHJcbiAgICAgICAgcmV0dXJuIGZyb21OdW1iZXIodmFsLCB1bnNpZ25lZCk7XHJcbiAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpXHJcbiAgICAgICAgcmV0dXJuIGZyb21TdHJpbmcodmFsLCB1bnNpZ25lZCk7XHJcbiAgICAvLyBUaHJvd3MgZm9yIG5vbi1vYmplY3RzLCBjb252ZXJ0cyBub24taW5zdGFuY2VvZiBMb25nOlxyXG4gICAgcmV0dXJuIGZyb21CaXRzKHZhbC5sb3csIHZhbC5oaWdoLCB0eXBlb2YgdW5zaWduZWQgPT09ICdib29sZWFuJyA/IHVuc2lnbmVkIDogdmFsLnVuc2lnbmVkKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIHRoZSBzcGVjaWZpZWQgdmFsdWUgdG8gYSBMb25nIHVzaW5nIHRoZSBhcHByb3ByaWF0ZSBmcm9tKiBmdW5jdGlvbiBmb3IgaXRzIHR5cGUuXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd8IXtsb3c6IG51bWJlciwgaGlnaDogbnVtYmVyLCB1bnNpZ25lZDogYm9vbGVhbn19IHZhbCBWYWx1ZVxyXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSB1bnNpZ25lZCBXaGV0aGVyIHVuc2lnbmVkIG9yIG5vdCwgZGVmYXVsdHMgdG8gc2lnbmVkXHJcbiAqIEByZXR1cm5zIHshTG9uZ31cclxuICovXHJcbkxvbmcuZnJvbVZhbHVlID0gZnJvbVZhbHVlO1xyXG5cclxuLy8gTk9URTogdGhlIGNvbXBpbGVyIHNob3VsZCBpbmxpbmUgdGhlc2UgY29uc3RhbnQgdmFsdWVzIGJlbG93IGFuZCB0aGVuIHJlbW92ZSB0aGVzZSB2YXJpYWJsZXMsIHNvIHRoZXJlIHNob3VsZCBiZVxyXG4vLyBubyBydW50aW1lIHBlbmFsdHkgZm9yIHRoZXNlLlxyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHtudW1iZXJ9XHJcbiAqIEBjb25zdFxyXG4gKiBAaW5uZXJcclxuICovXHJcbnZhciBUV09fUFdSXzE2X0RCTCA9IDEgPDwgMTY7XHJcblxyXG4vKipcclxuICogQHR5cGUge251bWJlcn1cclxuICogQGNvbnN0XHJcbiAqIEBpbm5lclxyXG4gKi9cclxudmFyIFRXT19QV1JfMjRfREJMID0gMSA8PCAyNDtcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7bnVtYmVyfVxyXG4gKiBAY29uc3RcclxuICogQGlubmVyXHJcbiAqL1xyXG52YXIgVFdPX1BXUl8zMl9EQkwgPSBUV09fUFdSXzE2X0RCTCAqIFRXT19QV1JfMTZfREJMO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHtudW1iZXJ9XHJcbiAqIEBjb25zdFxyXG4gKiBAaW5uZXJcclxuICovXHJcbnZhciBUV09fUFdSXzY0X0RCTCA9IFRXT19QV1JfMzJfREJMICogVFdPX1BXUl8zMl9EQkw7XHJcblxyXG4vKipcclxuICogQHR5cGUge251bWJlcn1cclxuICogQGNvbnN0XHJcbiAqIEBpbm5lclxyXG4gKi9cclxudmFyIFRXT19QV1JfNjNfREJMID0gVFdPX1BXUl82NF9EQkwgLyAyO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHshTG9uZ31cclxuICogQGNvbnN0XHJcbiAqIEBpbm5lclxyXG4gKi9cclxudmFyIFRXT19QV1JfMjQgPSBmcm9tSW50KFRXT19QV1JfMjRfREJMKTtcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7IUxvbmd9XHJcbiAqIEBpbm5lclxyXG4gKi9cclxudmFyIFpFUk8gPSBmcm9tSW50KDApO1xyXG5cclxuLyoqXHJcbiAqIFNpZ25lZCB6ZXJvLlxyXG4gKiBAdHlwZSB7IUxvbmd9XHJcbiAqL1xyXG5Mb25nLlpFUk8gPSBaRVJPO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHshTG9uZ31cclxuICogQGlubmVyXHJcbiAqL1xyXG52YXIgVVpFUk8gPSBmcm9tSW50KDAsIHRydWUpO1xyXG5cclxuLyoqXHJcbiAqIFVuc2lnbmVkIHplcm8uXHJcbiAqIEB0eXBlIHshTG9uZ31cclxuICovXHJcbkxvbmcuVVpFUk8gPSBVWkVSTztcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7IUxvbmd9XHJcbiAqIEBpbm5lclxyXG4gKi9cclxudmFyIE9ORSA9IGZyb21JbnQoMSk7XHJcblxyXG4vKipcclxuICogU2lnbmVkIG9uZS5cclxuICogQHR5cGUgeyFMb25nfVxyXG4gKi9cclxuTG9uZy5PTkUgPSBPTkU7XHJcblxyXG4vKipcclxuICogQHR5cGUgeyFMb25nfVxyXG4gKiBAaW5uZXJcclxuICovXHJcbnZhciBVT05FID0gZnJvbUludCgxLCB0cnVlKTtcclxuXHJcbi8qKlxyXG4gKiBVbnNpZ25lZCBvbmUuXHJcbiAqIEB0eXBlIHshTG9uZ31cclxuICovXHJcbkxvbmcuVU9ORSA9IFVPTkU7XHJcblxyXG4vKipcclxuICogQHR5cGUgeyFMb25nfVxyXG4gKiBAaW5uZXJcclxuICovXHJcbnZhciBORUdfT05FID0gZnJvbUludCgtMSk7XHJcblxyXG4vKipcclxuICogU2lnbmVkIG5lZ2F0aXZlIG9uZS5cclxuICogQHR5cGUgeyFMb25nfVxyXG4gKi9cclxuTG9uZy5ORUdfT05FID0gTkVHX09ORTtcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7IUxvbmd9XHJcbiAqIEBpbm5lclxyXG4gKi9cclxudmFyIE1BWF9WQUxVRSA9IGZyb21CaXRzKDB4RkZGRkZGRkZ8MCwgMHg3RkZGRkZGRnwwLCBmYWxzZSk7XHJcblxyXG4vKipcclxuICogTWF4aW11bSBzaWduZWQgdmFsdWUuXHJcbiAqIEB0eXBlIHshTG9uZ31cclxuICovXHJcbkxvbmcuTUFYX1ZBTFVFID0gTUFYX1ZBTFVFO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHshTG9uZ31cclxuICogQGlubmVyXHJcbiAqL1xyXG52YXIgTUFYX1VOU0lHTkVEX1ZBTFVFID0gZnJvbUJpdHMoMHhGRkZGRkZGRnwwLCAweEZGRkZGRkZGfDAsIHRydWUpO1xyXG5cclxuLyoqXHJcbiAqIE1heGltdW0gdW5zaWduZWQgdmFsdWUuXHJcbiAqIEB0eXBlIHshTG9uZ31cclxuICovXHJcbkxvbmcuTUFYX1VOU0lHTkVEX1ZBTFVFID0gTUFYX1VOU0lHTkVEX1ZBTFVFO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHshTG9uZ31cclxuICogQGlubmVyXHJcbiAqL1xyXG52YXIgTUlOX1ZBTFVFID0gZnJvbUJpdHMoMCwgMHg4MDAwMDAwMHwwLCBmYWxzZSk7XHJcblxyXG4vKipcclxuICogTWluaW11bSBzaWduZWQgdmFsdWUuXHJcbiAqIEB0eXBlIHshTG9uZ31cclxuICovXHJcbkxvbmcuTUlOX1ZBTFVFID0gTUlOX1ZBTFVFO1xyXG5cclxuLyoqXHJcbiAqIEBhbGlhcyBMb25nLnByb3RvdHlwZVxyXG4gKiBAaW5uZXJcclxuICovXHJcbnZhciBMb25nUHJvdG90eXBlID0gTG9uZy5wcm90b3R5cGU7XHJcblxyXG4vKipcclxuICogQ29udmVydHMgdGhlIExvbmcgdG8gYSAzMiBiaXQgaW50ZWdlciwgYXNzdW1pbmcgaXQgaXMgYSAzMiBiaXQgaW50ZWdlci5cclxuICogQHJldHVybnMge251bWJlcn1cclxuICovXHJcbkxvbmdQcm90b3R5cGUudG9JbnQgPSBmdW5jdGlvbiB0b0ludCgpIHtcclxuICAgIHJldHVybiB0aGlzLnVuc2lnbmVkID8gdGhpcy5sb3cgPj4+IDAgOiB0aGlzLmxvdztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyB0aGUgTG9uZyB0byBhIHRoZSBuZWFyZXN0IGZsb2F0aW5nLXBvaW50IHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgdmFsdWUgKGRvdWJsZSwgNTMgYml0IG1hbnRpc3NhKS5cclxuICogQHJldHVybnMge251bWJlcn1cclxuICovXHJcbkxvbmdQcm90b3R5cGUudG9OdW1iZXIgPSBmdW5jdGlvbiB0b051bWJlcigpIHtcclxuICAgIGlmICh0aGlzLnVuc2lnbmVkKVxyXG4gICAgICAgIHJldHVybiAoKHRoaXMuaGlnaCA+Pj4gMCkgKiBUV09fUFdSXzMyX0RCTCkgKyAodGhpcy5sb3cgPj4+IDApO1xyXG4gICAgcmV0dXJuIHRoaXMuaGlnaCAqIFRXT19QV1JfMzJfREJMICsgKHRoaXMubG93ID4+PiAwKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyB0aGUgTG9uZyB0byBhIHN0cmluZyB3cml0dGVuIGluIHRoZSBzcGVjaWZpZWQgcmFkaXguXHJcbiAqIEBwYXJhbSB7bnVtYmVyPX0gcmFkaXggUmFkaXggKDItMzYpLCBkZWZhdWx0cyB0byAxMFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKiBAb3ZlcnJpZGVcclxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gSWYgYHJhZGl4YCBpcyBvdXQgb2YgcmFuZ2VcclxuICovXHJcbkxvbmdQcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyhyYWRpeCkge1xyXG4gICAgcmFkaXggPSByYWRpeCB8fCAxMDtcclxuICAgIGlmIChyYWRpeCA8IDIgfHwgMzYgPCByYWRpeClcclxuICAgICAgICB0aHJvdyBSYW5nZUVycm9yKCdyYWRpeCcpO1xyXG4gICAgaWYgKHRoaXMuaXNaZXJvKCkpXHJcbiAgICAgICAgcmV0dXJuICcwJztcclxuICAgIGlmICh0aGlzLmlzTmVnYXRpdmUoKSkgeyAvLyBVbnNpZ25lZCBMb25ncyBhcmUgbmV2ZXIgbmVnYXRpdmVcclxuICAgICAgICBpZiAodGhpcy5lcShNSU5fVkFMVUUpKSB7XHJcbiAgICAgICAgICAgIC8vIFdlIG5lZWQgdG8gY2hhbmdlIHRoZSBMb25nIHZhbHVlIGJlZm9yZSBpdCBjYW4gYmUgbmVnYXRlZCwgc28gd2UgcmVtb3ZlXHJcbiAgICAgICAgICAgIC8vIHRoZSBib3R0b20tbW9zdCBkaWdpdCBpbiB0aGlzIGJhc2UgYW5kIHRoZW4gcmVjdXJzZSB0byBkbyB0aGUgcmVzdC5cclxuICAgICAgICAgICAgdmFyIHJhZGl4TG9uZyA9IGZyb21OdW1iZXIocmFkaXgpLFxyXG4gICAgICAgICAgICAgICAgZGl2ID0gdGhpcy5kaXYocmFkaXhMb25nKSxcclxuICAgICAgICAgICAgICAgIHJlbTEgPSBkaXYubXVsKHJhZGl4TG9uZykuc3ViKHRoaXMpO1xyXG4gICAgICAgICAgICByZXR1cm4gZGl2LnRvU3RyaW5nKHJhZGl4KSArIHJlbTEudG9JbnQoKS50b1N0cmluZyhyYWRpeCk7XHJcbiAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiAnLScgKyB0aGlzLm5lZygpLnRvU3RyaW5nKHJhZGl4KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBEbyBzZXZlcmFsICg2KSBkaWdpdHMgZWFjaCB0aW1lIHRocm91Z2ggdGhlIGxvb3AsIHNvIGFzIHRvXHJcbiAgICAvLyBtaW5pbWl6ZSB0aGUgY2FsbHMgdG8gdGhlIHZlcnkgZXhwZW5zaXZlIGVtdWxhdGVkIGRpdi5cclxuICAgIHZhciByYWRpeFRvUG93ZXIgPSBmcm9tTnVtYmVyKHBvd19kYmwocmFkaXgsIDYpLCB0aGlzLnVuc2lnbmVkKSxcclxuICAgICAgICByZW0gPSB0aGlzO1xyXG4gICAgdmFyIHJlc3VsdCA9ICcnO1xyXG4gICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgICB2YXIgcmVtRGl2ID0gcmVtLmRpdihyYWRpeFRvUG93ZXIpLFxyXG4gICAgICAgICAgICBpbnR2YWwgPSByZW0uc3ViKHJlbURpdi5tdWwocmFkaXhUb1Bvd2VyKSkudG9JbnQoKSA+Pj4gMCxcclxuICAgICAgICAgICAgZGlnaXRzID0gaW50dmFsLnRvU3RyaW5nKHJhZGl4KTtcclxuICAgICAgICByZW0gPSByZW1EaXY7XHJcbiAgICAgICAgaWYgKHJlbS5pc1plcm8oKSlcclxuICAgICAgICAgICAgcmV0dXJuIGRpZ2l0cyArIHJlc3VsdDtcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgd2hpbGUgKGRpZ2l0cy5sZW5ndGggPCA2KVxyXG4gICAgICAgICAgICAgICAgZGlnaXRzID0gJzAnICsgZGlnaXRzO1xyXG4gICAgICAgICAgICByZXN1bHQgPSAnJyArIGRpZ2l0cyArIHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgaGlnaCAzMiBiaXRzIGFzIGEgc2lnbmVkIGludGVnZXIuXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFNpZ25lZCBoaWdoIGJpdHNcclxuICovXHJcbkxvbmdQcm90b3R5cGUuZ2V0SGlnaEJpdHMgPSBmdW5jdGlvbiBnZXRIaWdoQml0cygpIHtcclxuICAgIHJldHVybiB0aGlzLmhpZ2g7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgaGlnaCAzMiBiaXRzIGFzIGFuIHVuc2lnbmVkIGludGVnZXIuXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFVuc2lnbmVkIGhpZ2ggYml0c1xyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5nZXRIaWdoQml0c1Vuc2lnbmVkID0gZnVuY3Rpb24gZ2V0SGlnaEJpdHNVbnNpZ25lZCgpIHtcclxuICAgIHJldHVybiB0aGlzLmhpZ2ggPj4+IDA7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgbG93IDMyIGJpdHMgYXMgYSBzaWduZWQgaW50ZWdlci5cclxuICogQHJldHVybnMge251bWJlcn0gU2lnbmVkIGxvdyBiaXRzXHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmdldExvd0JpdHMgPSBmdW5jdGlvbiBnZXRMb3dCaXRzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubG93O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIGxvdyAzMiBiaXRzIGFzIGFuIHVuc2lnbmVkIGludGVnZXIuXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFVuc2lnbmVkIGxvdyBiaXRzXHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmdldExvd0JpdHNVbnNpZ25lZCA9IGZ1bmN0aW9uIGdldExvd0JpdHNVbnNpZ25lZCgpIHtcclxuICAgIHJldHVybiB0aGlzLmxvdyA+Pj4gMDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBudW1iZXIgb2YgYml0cyBuZWVkZWQgdG8gcmVwcmVzZW50IHRoZSBhYnNvbHV0ZSB2YWx1ZSBvZiB0aGlzIExvbmcuXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmdldE51bUJpdHNBYnMgPSBmdW5jdGlvbiBnZXROdW1CaXRzQWJzKCkge1xyXG4gICAgaWYgKHRoaXMuaXNOZWdhdGl2ZSgpKSAvLyBVbnNpZ25lZCBMb25ncyBhcmUgbmV2ZXIgbmVnYXRpdmVcclxuICAgICAgICByZXR1cm4gdGhpcy5lcShNSU5fVkFMVUUpID8gNjQgOiB0aGlzLm5lZygpLmdldE51bUJpdHNBYnMoKTtcclxuICAgIHZhciB2YWwgPSB0aGlzLmhpZ2ggIT0gMCA/IHRoaXMuaGlnaCA6IHRoaXMubG93O1xyXG4gICAgZm9yICh2YXIgYml0ID0gMzE7IGJpdCA+IDA7IGJpdC0tKVxyXG4gICAgICAgIGlmICgodmFsICYgKDEgPDwgYml0KSkgIT0gMClcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICByZXR1cm4gdGhpcy5oaWdoICE9IDAgPyBiaXQgKyAzMyA6IGJpdCArIDE7XHJcbn07XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhpcyBMb25nJ3MgdmFsdWUgZXF1YWxzIHplcm8uXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5pc1plcm8gPSBmdW5jdGlvbiBpc1plcm8oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5oaWdoID09PSAwICYmIHRoaXMubG93ID09PSAwO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoaXMgTG9uZydzIHZhbHVlIGVxdWFscyB6ZXJvLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI2lzWmVyb30uXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5lcXogPSBMb25nUHJvdG90eXBlLmlzWmVybztcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGlzIExvbmcncyB2YWx1ZSBpcyBuZWdhdGl2ZS5cclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmlzTmVnYXRpdmUgPSBmdW5jdGlvbiBpc05lZ2F0aXZlKCkge1xyXG4gICAgcmV0dXJuICF0aGlzLnVuc2lnbmVkICYmIHRoaXMuaGlnaCA8IDA7XHJcbn07XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhpcyBMb25nJ3MgdmFsdWUgaXMgcG9zaXRpdmUuXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5pc1Bvc2l0aXZlID0gZnVuY3Rpb24gaXNQb3NpdGl2ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnVuc2lnbmVkIHx8IHRoaXMuaGlnaCA+PSAwO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoaXMgTG9uZydzIHZhbHVlIGlzIG9kZC5cclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmlzT2RkID0gZnVuY3Rpb24gaXNPZGQoKSB7XHJcbiAgICByZXR1cm4gKHRoaXMubG93ICYgMSkgPT09IDE7XHJcbn07XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhpcyBMb25nJ3MgdmFsdWUgaXMgZXZlbi5cclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmlzRXZlbiA9IGZ1bmN0aW9uIGlzRXZlbigpIHtcclxuICAgIHJldHVybiAodGhpcy5sb3cgJiAxKSA9PT0gMDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGlzIExvbmcncyB2YWx1ZSBlcXVhbHMgdGhlIHNwZWNpZmllZCdzLlxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIHZhbHVlXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiBlcXVhbHMob3RoZXIpIHtcclxuICAgIGlmICghaXNMb25nKG90aGVyKSlcclxuICAgICAgICBvdGhlciA9IGZyb21WYWx1ZShvdGhlcik7XHJcbiAgICBpZiAodGhpcy51bnNpZ25lZCAhPT0gb3RoZXIudW5zaWduZWQgJiYgKHRoaXMuaGlnaCA+Pj4gMzEpID09PSAxICYmIChvdGhlci5oaWdoID4+PiAzMSkgPT09IDEpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgcmV0dXJuIHRoaXMuaGlnaCA9PT0gb3RoZXIuaGlnaCAmJiB0aGlzLmxvdyA9PT0gb3RoZXIubG93O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoaXMgTG9uZydzIHZhbHVlIGVxdWFscyB0aGUgc3BlY2lmaWVkJ3MuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIExvbmcjZXF1YWxzfS5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gb3RoZXIgT3RoZXIgdmFsdWVcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmVxID0gTG9uZ1Byb3RvdHlwZS5lcXVhbHM7XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhpcyBMb25nJ3MgdmFsdWUgZGlmZmVycyBmcm9tIHRoZSBzcGVjaWZpZWQncy5cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBvdGhlciBPdGhlciB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbkxvbmdQcm90b3R5cGUubm90RXF1YWxzID0gZnVuY3Rpb24gbm90RXF1YWxzKG90aGVyKSB7XHJcbiAgICByZXR1cm4gIXRoaXMuZXEoLyogdmFsaWRhdGVzICovIG90aGVyKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGlzIExvbmcncyB2YWx1ZSBkaWZmZXJzIGZyb20gdGhlIHNwZWNpZmllZCdzLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI25vdEVxdWFsc30uXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIHZhbHVlXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5uZXEgPSBMb25nUHJvdG90eXBlLm5vdEVxdWFscztcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGlzIExvbmcncyB2YWx1ZSBkaWZmZXJzIGZyb20gdGhlIHNwZWNpZmllZCdzLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI25vdEVxdWFsc30uXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIHZhbHVlXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5uZSA9IExvbmdQcm90b3R5cGUubm90RXF1YWxzO1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoaXMgTG9uZydzIHZhbHVlIGlzIGxlc3MgdGhhbiB0aGUgc3BlY2lmaWVkJ3MuXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gb3RoZXIgT3RoZXIgdmFsdWVcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmxlc3NUaGFuID0gZnVuY3Rpb24gbGVzc1RoYW4ob3RoZXIpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbXAoLyogdmFsaWRhdGVzICovIG90aGVyKSA8IDA7XHJcbn07XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhpcyBMb25nJ3MgdmFsdWUgaXMgbGVzcyB0aGFuIHRoZSBzcGVjaWZpZWQncy4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgTG9uZyNsZXNzVGhhbn0uXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIHZhbHVlXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5sdCA9IExvbmdQcm90b3R5cGUubGVzc1RoYW47XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhpcyBMb25nJ3MgdmFsdWUgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRoZSBzcGVjaWZpZWQncy5cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBvdGhlciBPdGhlciB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbkxvbmdQcm90b3R5cGUubGVzc1RoYW5PckVxdWFsID0gZnVuY3Rpb24gbGVzc1RoYW5PckVxdWFsKG90aGVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb21wKC8qIHZhbGlkYXRlcyAqLyBvdGhlcikgPD0gMDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGlzIExvbmcncyB2YWx1ZSBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdGhlIHNwZWNpZmllZCdzLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI2xlc3NUaGFuT3JFcXVhbH0uXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIHZhbHVlXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5sdGUgPSBMb25nUHJvdG90eXBlLmxlc3NUaGFuT3JFcXVhbDtcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGlzIExvbmcncyB2YWx1ZSBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdGhlIHNwZWNpZmllZCdzLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI2xlc3NUaGFuT3JFcXVhbH0uXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIHZhbHVlXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5sZSA9IExvbmdQcm90b3R5cGUubGVzc1RoYW5PckVxdWFsO1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoaXMgTG9uZydzIHZhbHVlIGlzIGdyZWF0ZXIgdGhhbiB0aGUgc3BlY2lmaWVkJ3MuXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gb3RoZXIgT3RoZXIgdmFsdWVcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmdyZWF0ZXJUaGFuID0gZnVuY3Rpb24gZ3JlYXRlclRoYW4ob3RoZXIpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbXAoLyogdmFsaWRhdGVzICovIG90aGVyKSA+IDA7XHJcbn07XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhpcyBMb25nJ3MgdmFsdWUgaXMgZ3JlYXRlciB0aGFuIHRoZSBzcGVjaWZpZWQncy4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgTG9uZyNncmVhdGVyVGhhbn0uXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIHZhbHVlXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5ndCA9IExvbmdQcm90b3R5cGUuZ3JlYXRlclRoYW47XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhpcyBMb25nJ3MgdmFsdWUgaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRoZSBzcGVjaWZpZWQncy5cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBvdGhlciBPdGhlciB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbkxvbmdQcm90b3R5cGUuZ3JlYXRlclRoYW5PckVxdWFsID0gZnVuY3Rpb24gZ3JlYXRlclRoYW5PckVxdWFsKG90aGVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb21wKC8qIHZhbGlkYXRlcyAqLyBvdGhlcikgPj0gMDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGlzIExvbmcncyB2YWx1ZSBpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdGhlIHNwZWNpZmllZCdzLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI2dyZWF0ZXJUaGFuT3JFcXVhbH0uXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIHZhbHVlXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5ndGUgPSBMb25nUHJvdG90eXBlLmdyZWF0ZXJUaGFuT3JFcXVhbDtcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGlzIExvbmcncyB2YWx1ZSBpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdGhlIHNwZWNpZmllZCdzLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI2dyZWF0ZXJUaGFuT3JFcXVhbH0uXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIHZhbHVlXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5nZSA9IExvbmdQcm90b3R5cGUuZ3JlYXRlclRoYW5PckVxdWFsO1xyXG5cclxuLyoqXHJcbiAqIENvbXBhcmVzIHRoaXMgTG9uZydzIHZhbHVlIHdpdGggdGhlIHNwZWNpZmllZCdzLlxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIHZhbHVlXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IDAgaWYgdGhleSBhcmUgdGhlIHNhbWUsIDEgaWYgdGhlIHRoaXMgaXMgZ3JlYXRlciBhbmQgLTFcclxuICogIGlmIHRoZSBnaXZlbiBvbmUgaXMgZ3JlYXRlclxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZShvdGhlcikge1xyXG4gICAgaWYgKCFpc0xvbmcob3RoZXIpKVxyXG4gICAgICAgIG90aGVyID0gZnJvbVZhbHVlKG90aGVyKTtcclxuICAgIGlmICh0aGlzLmVxKG90aGVyKSlcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIHZhciB0aGlzTmVnID0gdGhpcy5pc05lZ2F0aXZlKCksXHJcbiAgICAgICAgb3RoZXJOZWcgPSBvdGhlci5pc05lZ2F0aXZlKCk7XHJcbiAgICBpZiAodGhpc05lZyAmJiAhb3RoZXJOZWcpXHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgaWYgKCF0aGlzTmVnICYmIG90aGVyTmVnKVxyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgLy8gQXQgdGhpcyBwb2ludCB0aGUgc2lnbiBiaXRzIGFyZSB0aGUgc2FtZVxyXG4gICAgaWYgKCF0aGlzLnVuc2lnbmVkKVxyXG4gICAgICAgIHJldHVybiB0aGlzLnN1YihvdGhlcikuaXNOZWdhdGl2ZSgpID8gLTEgOiAxO1xyXG4gICAgLy8gQm90aCBhcmUgcG9zaXRpdmUgaWYgYXQgbGVhc3Qgb25lIGlzIHVuc2lnbmVkXHJcbiAgICByZXR1cm4gKG90aGVyLmhpZ2ggPj4+IDApID4gKHRoaXMuaGlnaCA+Pj4gMCkgfHwgKG90aGVyLmhpZ2ggPT09IHRoaXMuaGlnaCAmJiAob3RoZXIubG93ID4+PiAwKSA+ICh0aGlzLmxvdyA+Pj4gMCkpID8gLTEgOiAxO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbXBhcmVzIHRoaXMgTG9uZydzIHZhbHVlIHdpdGggdGhlIHNwZWNpZmllZCdzLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI2NvbXBhcmV9LlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBvdGhlciBPdGhlciB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAwIGlmIHRoZXkgYXJlIHRoZSBzYW1lLCAxIGlmIHRoZSB0aGlzIGlzIGdyZWF0ZXIgYW5kIC0xXHJcbiAqICBpZiB0aGUgZ2l2ZW4gb25lIGlzIGdyZWF0ZXJcclxuICovXHJcbkxvbmdQcm90b3R5cGUuY29tcCA9IExvbmdQcm90b3R5cGUuY29tcGFyZTtcclxuXHJcbi8qKlxyXG4gKiBOZWdhdGVzIHRoaXMgTG9uZydzIHZhbHVlLlxyXG4gKiBAcmV0dXJucyB7IUxvbmd9IE5lZ2F0ZWQgTG9uZ1xyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5uZWdhdGUgPSBmdW5jdGlvbiBuZWdhdGUoKSB7XHJcbiAgICBpZiAoIXRoaXMudW5zaWduZWQgJiYgdGhpcy5lcShNSU5fVkFMVUUpKVxyXG4gICAgICAgIHJldHVybiBNSU5fVkFMVUU7XHJcbiAgICByZXR1cm4gdGhpcy5ub3QoKS5hZGQoT05FKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBOZWdhdGVzIHRoaXMgTG9uZydzIHZhbHVlLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI25lZ2F0ZX0uXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcmV0dXJucyB7IUxvbmd9IE5lZ2F0ZWQgTG9uZ1xyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5uZWcgPSBMb25nUHJvdG90eXBlLm5lZ2F0ZTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBzdW0gb2YgdGhpcyBhbmQgdGhlIHNwZWNpZmllZCBMb25nLlxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IGFkZGVuZCBBZGRlbmRcclxuICogQHJldHVybnMgeyFMb25nfSBTdW1cclxuICovXHJcbkxvbmdQcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gYWRkKGFkZGVuZCkge1xyXG4gICAgaWYgKCFpc0xvbmcoYWRkZW5kKSlcclxuICAgICAgICBhZGRlbmQgPSBmcm9tVmFsdWUoYWRkZW5kKTtcclxuXHJcbiAgICAvLyBEaXZpZGUgZWFjaCBudW1iZXIgaW50byA0IGNodW5rcyBvZiAxNiBiaXRzLCBhbmQgdGhlbiBzdW0gdGhlIGNodW5rcy5cclxuXHJcbiAgICB2YXIgYTQ4ID0gdGhpcy5oaWdoID4+PiAxNjtcclxuICAgIHZhciBhMzIgPSB0aGlzLmhpZ2ggJiAweEZGRkY7XHJcbiAgICB2YXIgYTE2ID0gdGhpcy5sb3cgPj4+IDE2O1xyXG4gICAgdmFyIGEwMCA9IHRoaXMubG93ICYgMHhGRkZGO1xyXG5cclxuICAgIHZhciBiNDggPSBhZGRlbmQuaGlnaCA+Pj4gMTY7XHJcbiAgICB2YXIgYjMyID0gYWRkZW5kLmhpZ2ggJiAweEZGRkY7XHJcbiAgICB2YXIgYjE2ID0gYWRkZW5kLmxvdyA+Pj4gMTY7XHJcbiAgICB2YXIgYjAwID0gYWRkZW5kLmxvdyAmIDB4RkZGRjtcclxuXHJcbiAgICB2YXIgYzQ4ID0gMCwgYzMyID0gMCwgYzE2ID0gMCwgYzAwID0gMDtcclxuICAgIGMwMCArPSBhMDAgKyBiMDA7XHJcbiAgICBjMTYgKz0gYzAwID4+PiAxNjtcclxuICAgIGMwMCAmPSAweEZGRkY7XHJcbiAgICBjMTYgKz0gYTE2ICsgYjE2O1xyXG4gICAgYzMyICs9IGMxNiA+Pj4gMTY7XHJcbiAgICBjMTYgJj0gMHhGRkZGO1xyXG4gICAgYzMyICs9IGEzMiArIGIzMjtcclxuICAgIGM0OCArPSBjMzIgPj4+IDE2O1xyXG4gICAgYzMyICY9IDB4RkZGRjtcclxuICAgIGM0OCArPSBhNDggKyBiNDg7XHJcbiAgICBjNDggJj0gMHhGRkZGO1xyXG4gICAgcmV0dXJuIGZyb21CaXRzKChjMTYgPDwgMTYpIHwgYzAwLCAoYzQ4IDw8IDE2KSB8IGMzMiwgdGhpcy51bnNpZ25lZCk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgZGlmZmVyZW5jZSBvZiB0aGlzIGFuZCB0aGUgc3BlY2lmaWVkIExvbmcuXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gc3VidHJhaGVuZCBTdWJ0cmFoZW5kXHJcbiAqIEByZXR1cm5zIHshTG9uZ30gRGlmZmVyZW5jZVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5zdWJ0cmFjdCA9IGZ1bmN0aW9uIHN1YnRyYWN0KHN1YnRyYWhlbmQpIHtcclxuICAgIGlmICghaXNMb25nKHN1YnRyYWhlbmQpKVxyXG4gICAgICAgIHN1YnRyYWhlbmQgPSBmcm9tVmFsdWUoc3VidHJhaGVuZCk7XHJcbiAgICByZXR1cm4gdGhpcy5hZGQoc3VidHJhaGVuZC5uZWcoKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgZGlmZmVyZW5jZSBvZiB0aGlzIGFuZCB0aGUgc3BlY2lmaWVkIExvbmcuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIExvbmcjc3VidHJhY3R9LlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBzdWJ0cmFoZW5kIFN1YnRyYWhlbmRcclxuICogQHJldHVybnMgeyFMb25nfSBEaWZmZXJlbmNlXHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLnN1YiA9IExvbmdQcm90b3R5cGUuc3VidHJhY3Q7XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgcHJvZHVjdCBvZiB0aGlzIGFuZCB0aGUgc3BlY2lmaWVkIExvbmcuXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gbXVsdGlwbGllciBNdWx0aXBsaWVyXHJcbiAqIEByZXR1cm5zIHshTG9uZ30gUHJvZHVjdFxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5tdWx0aXBseSA9IGZ1bmN0aW9uIG11bHRpcGx5KG11bHRpcGxpZXIpIHtcclxuICAgIGlmICh0aGlzLmlzWmVybygpKVxyXG4gICAgICAgIHJldHVybiBaRVJPO1xyXG4gICAgaWYgKCFpc0xvbmcobXVsdGlwbGllcikpXHJcbiAgICAgICAgbXVsdGlwbGllciA9IGZyb21WYWx1ZShtdWx0aXBsaWVyKTtcclxuXHJcbiAgICAvLyB1c2Ugd2FzbSBzdXBwb3J0IGlmIHByZXNlbnRcclxuICAgIGlmICh3YXNtKSB7XHJcbiAgICAgICAgdmFyIGxvdyA9IHdhc20ubXVsKHRoaXMubG93LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZ2gsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpcGxpZXIubG93LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBtdWx0aXBsaWVyLmhpZ2gpO1xyXG4gICAgICAgIHJldHVybiBmcm9tQml0cyhsb3csIHdhc20uZ2V0X2hpZ2goKSwgdGhpcy51bnNpZ25lZCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG11bHRpcGxpZXIuaXNaZXJvKCkpXHJcbiAgICAgICAgcmV0dXJuIFpFUk87XHJcbiAgICBpZiAodGhpcy5lcShNSU5fVkFMVUUpKVxyXG4gICAgICAgIHJldHVybiBtdWx0aXBsaWVyLmlzT2RkKCkgPyBNSU5fVkFMVUUgOiBaRVJPO1xyXG4gICAgaWYgKG11bHRpcGxpZXIuZXEoTUlOX1ZBTFVFKSlcclxuICAgICAgICByZXR1cm4gdGhpcy5pc09kZCgpID8gTUlOX1ZBTFVFIDogWkVSTztcclxuXHJcbiAgICBpZiAodGhpcy5pc05lZ2F0aXZlKCkpIHtcclxuICAgICAgICBpZiAobXVsdGlwbGllci5pc05lZ2F0aXZlKCkpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5lZygpLm11bChtdWx0aXBsaWVyLm5lZygpKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5lZygpLm11bChtdWx0aXBsaWVyKS5uZWcoKTtcclxuICAgIH0gZWxzZSBpZiAobXVsdGlwbGllci5pc05lZ2F0aXZlKCkpXHJcbiAgICAgICAgcmV0dXJuIHRoaXMubXVsKG11bHRpcGxpZXIubmVnKCkpLm5lZygpO1xyXG5cclxuICAgIC8vIElmIGJvdGggbG9uZ3MgYXJlIHNtYWxsLCB1c2UgZmxvYXQgbXVsdGlwbGljYXRpb25cclxuICAgIGlmICh0aGlzLmx0KFRXT19QV1JfMjQpICYmIG11bHRpcGxpZXIubHQoVFdPX1BXUl8yNCkpXHJcbiAgICAgICAgcmV0dXJuIGZyb21OdW1iZXIodGhpcy50b051bWJlcigpICogbXVsdGlwbGllci50b051bWJlcigpLCB0aGlzLnVuc2lnbmVkKTtcclxuXHJcbiAgICAvLyBEaXZpZGUgZWFjaCBsb25nIGludG8gNCBjaHVua3Mgb2YgMTYgYml0cywgYW5kIHRoZW4gYWRkIHVwIDR4NCBwcm9kdWN0cy5cclxuICAgIC8vIFdlIGNhbiBza2lwIHByb2R1Y3RzIHRoYXQgd291bGQgb3ZlcmZsb3cuXHJcblxyXG4gICAgdmFyIGE0OCA9IHRoaXMuaGlnaCA+Pj4gMTY7XHJcbiAgICB2YXIgYTMyID0gdGhpcy5oaWdoICYgMHhGRkZGO1xyXG4gICAgdmFyIGExNiA9IHRoaXMubG93ID4+PiAxNjtcclxuICAgIHZhciBhMDAgPSB0aGlzLmxvdyAmIDB4RkZGRjtcclxuXHJcbiAgICB2YXIgYjQ4ID0gbXVsdGlwbGllci5oaWdoID4+PiAxNjtcclxuICAgIHZhciBiMzIgPSBtdWx0aXBsaWVyLmhpZ2ggJiAweEZGRkY7XHJcbiAgICB2YXIgYjE2ID0gbXVsdGlwbGllci5sb3cgPj4+IDE2O1xyXG4gICAgdmFyIGIwMCA9IG11bHRpcGxpZXIubG93ICYgMHhGRkZGO1xyXG5cclxuICAgIHZhciBjNDggPSAwLCBjMzIgPSAwLCBjMTYgPSAwLCBjMDAgPSAwO1xyXG4gICAgYzAwICs9IGEwMCAqIGIwMDtcclxuICAgIGMxNiArPSBjMDAgPj4+IDE2O1xyXG4gICAgYzAwICY9IDB4RkZGRjtcclxuICAgIGMxNiArPSBhMTYgKiBiMDA7XHJcbiAgICBjMzIgKz0gYzE2ID4+PiAxNjtcclxuICAgIGMxNiAmPSAweEZGRkY7XHJcbiAgICBjMTYgKz0gYTAwICogYjE2O1xyXG4gICAgYzMyICs9IGMxNiA+Pj4gMTY7XHJcbiAgICBjMTYgJj0gMHhGRkZGO1xyXG4gICAgYzMyICs9IGEzMiAqIGIwMDtcclxuICAgIGM0OCArPSBjMzIgPj4+IDE2O1xyXG4gICAgYzMyICY9IDB4RkZGRjtcclxuICAgIGMzMiArPSBhMTYgKiBiMTY7XHJcbiAgICBjNDggKz0gYzMyID4+PiAxNjtcclxuICAgIGMzMiAmPSAweEZGRkY7XHJcbiAgICBjMzIgKz0gYTAwICogYjMyO1xyXG4gICAgYzQ4ICs9IGMzMiA+Pj4gMTY7XHJcbiAgICBjMzIgJj0gMHhGRkZGO1xyXG4gICAgYzQ4ICs9IGE0OCAqIGIwMCArIGEzMiAqIGIxNiArIGExNiAqIGIzMiArIGEwMCAqIGI0ODtcclxuICAgIGM0OCAmPSAweEZGRkY7XHJcbiAgICByZXR1cm4gZnJvbUJpdHMoKGMxNiA8PCAxNikgfCBjMDAsIChjNDggPDwgMTYpIHwgYzMyLCB0aGlzLnVuc2lnbmVkKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBwcm9kdWN0IG9mIHRoaXMgYW5kIHRoZSBzcGVjaWZpZWQgTG9uZy4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgTG9uZyNtdWx0aXBseX0uXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG11bHRpcGxpZXIgTXVsdGlwbGllclxyXG4gKiBAcmV0dXJucyB7IUxvbmd9IFByb2R1Y3RcclxuICovXHJcbkxvbmdQcm90b3R5cGUubXVsID0gTG9uZ1Byb3RvdHlwZS5tdWx0aXBseTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoaXMgTG9uZyBkaXZpZGVkIGJ5IHRoZSBzcGVjaWZpZWQuIFRoZSByZXN1bHQgaXMgc2lnbmVkIGlmIHRoaXMgTG9uZyBpcyBzaWduZWQgb3JcclxuICogIHVuc2lnbmVkIGlmIHRoaXMgTG9uZyBpcyB1bnNpZ25lZC5cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBkaXZpc29yIERpdmlzb3JcclxuICogQHJldHVybnMgeyFMb25nfSBRdW90aWVudFxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5kaXZpZGUgPSBmdW5jdGlvbiBkaXZpZGUoZGl2aXNvcikge1xyXG4gICAgaWYgKCFpc0xvbmcoZGl2aXNvcikpXHJcbiAgICAgICAgZGl2aXNvciA9IGZyb21WYWx1ZShkaXZpc29yKTtcclxuICAgIGlmIChkaXZpc29yLmlzWmVybygpKVxyXG4gICAgICAgIHRocm93IEVycm9yKCdkaXZpc2lvbiBieSB6ZXJvJyk7XHJcblxyXG4gICAgLy8gdXNlIHdhc20gc3VwcG9ydCBpZiBwcmVzZW50XHJcbiAgICBpZiAod2FzbSkge1xyXG4gICAgICAgIC8vIGd1YXJkIGFnYWluc3Qgc2lnbmVkIGRpdmlzaW9uIG92ZXJmbG93OiB0aGUgbGFyZ2VzdFxyXG4gICAgICAgIC8vIG5lZ2F0aXZlIG51bWJlciAvIC0xIHdvdWxkIGJlIDEgbGFyZ2VyIHRoYW4gdGhlIGxhcmdlc3RcclxuICAgICAgICAvLyBwb3NpdGl2ZSBudW1iZXIsIGR1ZSB0byB0d28ncyBjb21wbGVtZW50LlxyXG4gICAgICAgIGlmICghdGhpcy51bnNpZ25lZCAmJlxyXG4gICAgICAgICAgICB0aGlzLmhpZ2ggPT09IC0weDgwMDAwMDAwICYmXHJcbiAgICAgICAgICAgIGRpdmlzb3IubG93ID09PSAtMSAmJiBkaXZpc29yLmhpZ2ggPT09IC0xKSB7XHJcbiAgICAgICAgICAgIC8vIGJlIGNvbnNpc3RlbnQgd2l0aCBub24td2FzbSBjb2RlIHBhdGhcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBsb3cgPSAodGhpcy51bnNpZ25lZCA/IHdhc20uZGl2X3UgOiB3YXNtLmRpdl9zKShcclxuICAgICAgICAgICAgdGhpcy5sb3csXHJcbiAgICAgICAgICAgIHRoaXMuaGlnaCxcclxuICAgICAgICAgICAgZGl2aXNvci5sb3csXHJcbiAgICAgICAgICAgIGRpdmlzb3IuaGlnaFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuIGZyb21CaXRzKGxvdywgd2FzbS5nZXRfaGlnaCgpLCB0aGlzLnVuc2lnbmVkKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5pc1plcm8oKSlcclxuICAgICAgICByZXR1cm4gdGhpcy51bnNpZ25lZCA/IFVaRVJPIDogWkVSTztcclxuICAgIHZhciBhcHByb3gsIHJlbSwgcmVzO1xyXG4gICAgaWYgKCF0aGlzLnVuc2lnbmVkKSB7XHJcbiAgICAgICAgLy8gVGhpcyBzZWN0aW9uIGlzIG9ubHkgcmVsZXZhbnQgZm9yIHNpZ25lZCBsb25ncyBhbmQgaXMgZGVyaXZlZCBmcm9tIHRoZVxyXG4gICAgICAgIC8vIGNsb3N1cmUgbGlicmFyeSBhcyBhIHdob2xlLlxyXG4gICAgICAgIGlmICh0aGlzLmVxKE1JTl9WQUxVRSkpIHtcclxuICAgICAgICAgICAgaWYgKGRpdmlzb3IuZXEoT05FKSB8fCBkaXZpc29yLmVxKE5FR19PTkUpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1JTl9WQUxVRTsgIC8vIHJlY2FsbCB0aGF0IC1NSU5fVkFMVUUgPT0gTUlOX1ZBTFVFXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGRpdmlzb3IuZXEoTUlOX1ZBTFVFKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBPTkU7XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gQXQgdGhpcyBwb2ludCwgd2UgaGF2ZSB8b3RoZXJ8ID49IDIsIHNvIHx0aGlzL290aGVyfCA8IHxNSU5fVkFMVUV8LlxyXG4gICAgICAgICAgICAgICAgdmFyIGhhbGZUaGlzID0gdGhpcy5zaHIoMSk7XHJcbiAgICAgICAgICAgICAgICBhcHByb3ggPSBoYWxmVGhpcy5kaXYoZGl2aXNvcikuc2hsKDEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFwcHJveC5lcShaRVJPKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkaXZpc29yLmlzTmVnYXRpdmUoKSA/IE9ORSA6IE5FR19PTkU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbSA9IHRoaXMuc3ViKGRpdmlzb3IubXVsKGFwcHJveCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcyA9IGFwcHJveC5hZGQocmVtLmRpdihkaXZpc29yKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoZGl2aXNvci5lcShNSU5fVkFMVUUpKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy51bnNpZ25lZCA/IFVaRVJPIDogWkVSTztcclxuICAgICAgICBpZiAodGhpcy5pc05lZ2F0aXZlKCkpIHtcclxuICAgICAgICAgICAgaWYgKGRpdmlzb3IuaXNOZWdhdGl2ZSgpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubmVnKCkuZGl2KGRpdmlzb3IubmVnKCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5uZWcoKS5kaXYoZGl2aXNvcikubmVnKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkaXZpc29yLmlzTmVnYXRpdmUoKSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGl2KGRpdmlzb3IubmVnKCkpLm5lZygpO1xyXG4gICAgICAgIHJlcyA9IFpFUk87XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIFRoZSBhbGdvcml0aG0gYmVsb3cgaGFzIG5vdCBiZWVuIG1hZGUgZm9yIHVuc2lnbmVkIGxvbmdzLiBJdCdzIHRoZXJlZm9yZVxyXG4gICAgICAgIC8vIHJlcXVpcmVkIHRvIHRha2Ugc3BlY2lhbCBjYXJlIG9mIHRoZSBNU0IgcHJpb3IgdG8gcnVubmluZyBpdC5cclxuICAgICAgICBpZiAoIWRpdmlzb3IudW5zaWduZWQpXHJcbiAgICAgICAgICAgIGRpdmlzb3IgPSBkaXZpc29yLnRvVW5zaWduZWQoKTtcclxuICAgICAgICBpZiAoZGl2aXNvci5ndCh0aGlzKSlcclxuICAgICAgICAgICAgcmV0dXJuIFVaRVJPO1xyXG4gICAgICAgIGlmIChkaXZpc29yLmd0KHRoaXMuc2hydSgxKSkpIC8vIDE1ID4+PiAxID0gNyA7IHdpdGggZGl2aXNvciA9IDggOyB0cnVlXHJcbiAgICAgICAgICAgIHJldHVybiBVT05FO1xyXG4gICAgICAgIHJlcyA9IFVaRVJPO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlcGVhdCB0aGUgZm9sbG93aW5nIHVudGlsIHRoZSByZW1haW5kZXIgaXMgbGVzcyB0aGFuIG90aGVyOiAgZmluZCBhXHJcbiAgICAvLyBmbG9hdGluZy1wb2ludCB0aGF0IGFwcHJveGltYXRlcyByZW1haW5kZXIgLyBvdGhlciAqZnJvbSBiZWxvdyosIGFkZCB0aGlzXHJcbiAgICAvLyBpbnRvIHRoZSByZXN1bHQsIGFuZCBzdWJ0cmFjdCBpdCBmcm9tIHRoZSByZW1haW5kZXIuICBJdCBpcyBjcml0aWNhbCB0aGF0XHJcbiAgICAvLyB0aGUgYXBwcm94aW1hdGUgdmFsdWUgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIHRoZSByZWFsIHZhbHVlIHNvIHRoYXQgdGhlXHJcbiAgICAvLyByZW1haW5kZXIgbmV2ZXIgYmVjb21lcyBuZWdhdGl2ZS5cclxuICAgIHJlbSA9IHRoaXM7XHJcbiAgICB3aGlsZSAocmVtLmd0ZShkaXZpc29yKSkge1xyXG4gICAgICAgIC8vIEFwcHJveGltYXRlIHRoZSByZXN1bHQgb2YgZGl2aXNpb24uIFRoaXMgbWF5IGJlIGEgbGl0dGxlIGdyZWF0ZXIgb3JcclxuICAgICAgICAvLyBzbWFsbGVyIHRoYW4gdGhlIGFjdHVhbCB2YWx1ZS5cclxuICAgICAgICBhcHByb3ggPSBNYXRoLm1heCgxLCBNYXRoLmZsb29yKHJlbS50b051bWJlcigpIC8gZGl2aXNvci50b051bWJlcigpKSk7XHJcblxyXG4gICAgICAgIC8vIFdlIHdpbGwgdHdlYWsgdGhlIGFwcHJveGltYXRlIHJlc3VsdCBieSBjaGFuZ2luZyBpdCBpbiB0aGUgNDgtdGggZGlnaXQgb3JcclxuICAgICAgICAvLyB0aGUgc21hbGxlc3Qgbm9uLWZyYWN0aW9uYWwgZGlnaXQsIHdoaWNoZXZlciBpcyBsYXJnZXIuXHJcbiAgICAgICAgdmFyIGxvZzIgPSBNYXRoLmNlaWwoTWF0aC5sb2coYXBwcm94KSAvIE1hdGguTE4yKSxcclxuICAgICAgICAgICAgZGVsdGEgPSAobG9nMiA8PSA0OCkgPyAxIDogcG93X2RibCgyLCBsb2cyIC0gNDgpLFxyXG5cclxuICAgICAgICAvLyBEZWNyZWFzZSB0aGUgYXBwcm94aW1hdGlvbiB1bnRpbCBpdCBpcyBzbWFsbGVyIHRoYW4gdGhlIHJlbWFpbmRlci4gIE5vdGVcclxuICAgICAgICAvLyB0aGF0IGlmIGl0IGlzIHRvbyBsYXJnZSwgdGhlIHByb2R1Y3Qgb3ZlcmZsb3dzIGFuZCBpcyBuZWdhdGl2ZS5cclxuICAgICAgICAgICAgYXBwcm94UmVzID0gZnJvbU51bWJlcihhcHByb3gpLFxyXG4gICAgICAgICAgICBhcHByb3hSZW0gPSBhcHByb3hSZXMubXVsKGRpdmlzb3IpO1xyXG4gICAgICAgIHdoaWxlIChhcHByb3hSZW0uaXNOZWdhdGl2ZSgpIHx8IGFwcHJveFJlbS5ndChyZW0pKSB7XHJcbiAgICAgICAgICAgIGFwcHJveCAtPSBkZWx0YTtcclxuICAgICAgICAgICAgYXBwcm94UmVzID0gZnJvbU51bWJlcihhcHByb3gsIHRoaXMudW5zaWduZWQpO1xyXG4gICAgICAgICAgICBhcHByb3hSZW0gPSBhcHByb3hSZXMubXVsKGRpdmlzb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gV2Uga25vdyB0aGUgYW5zd2VyIGNhbid0IGJlIHplcm8uLi4gYW5kIGFjdHVhbGx5LCB6ZXJvIHdvdWxkIGNhdXNlXHJcbiAgICAgICAgLy8gaW5maW5pdGUgcmVjdXJzaW9uIHNpbmNlIHdlIHdvdWxkIG1ha2Ugbm8gcHJvZ3Jlc3MuXHJcbiAgICAgICAgaWYgKGFwcHJveFJlcy5pc1plcm8oKSlcclxuICAgICAgICAgICAgYXBwcm94UmVzID0gT05FO1xyXG5cclxuICAgICAgICByZXMgPSByZXMuYWRkKGFwcHJveFJlcyk7XHJcbiAgICAgICAgcmVtID0gcmVtLnN1YihhcHByb3hSZW0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoaXMgTG9uZyBkaXZpZGVkIGJ5IHRoZSBzcGVjaWZpZWQuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIExvbmcjZGl2aWRlfS5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gZGl2aXNvciBEaXZpc29yXHJcbiAqIEByZXR1cm5zIHshTG9uZ30gUXVvdGllbnRcclxuICovXHJcbkxvbmdQcm90b3R5cGUuZGl2ID0gTG9uZ1Byb3RvdHlwZS5kaXZpZGU7XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGlzIExvbmcgbW9kdWxvIHRoZSBzcGVjaWZpZWQuXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gZGl2aXNvciBEaXZpc29yXHJcbiAqIEByZXR1cm5zIHshTG9uZ30gUmVtYWluZGVyXHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLm1vZHVsbyA9IGZ1bmN0aW9uIG1vZHVsbyhkaXZpc29yKSB7XHJcbiAgICBpZiAoIWlzTG9uZyhkaXZpc29yKSlcclxuICAgICAgICBkaXZpc29yID0gZnJvbVZhbHVlKGRpdmlzb3IpO1xyXG5cclxuICAgIC8vIHVzZSB3YXNtIHN1cHBvcnQgaWYgcHJlc2VudFxyXG4gICAgaWYgKHdhc20pIHtcclxuICAgICAgICB2YXIgbG93ID0gKHRoaXMudW5zaWduZWQgPyB3YXNtLnJlbV91IDogd2FzbS5yZW1fcykoXHJcbiAgICAgICAgICAgIHRoaXMubG93LFxyXG4gICAgICAgICAgICB0aGlzLmhpZ2gsXHJcbiAgICAgICAgICAgIGRpdmlzb3IubG93LFxyXG4gICAgICAgICAgICBkaXZpc29yLmhpZ2hcclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybiBmcm9tQml0cyhsb3csIHdhc20uZ2V0X2hpZ2goKSwgdGhpcy51bnNpZ25lZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuc3ViKHRoaXMuZGl2KGRpdmlzb3IpLm11bChkaXZpc29yKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGlzIExvbmcgbW9kdWxvIHRoZSBzcGVjaWZpZWQuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIExvbmcjbW9kdWxvfS5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gZGl2aXNvciBEaXZpc29yXHJcbiAqIEByZXR1cm5zIHshTG9uZ30gUmVtYWluZGVyXHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLm1vZCA9IExvbmdQcm90b3R5cGUubW9kdWxvO1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhpcyBMb25nIG1vZHVsbyB0aGUgc3BlY2lmaWVkLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI21vZHVsb30uXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IGRpdmlzb3IgRGl2aXNvclxyXG4gKiBAcmV0dXJucyB7IUxvbmd9IFJlbWFpbmRlclxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5yZW0gPSBMb25nUHJvdG90eXBlLm1vZHVsbztcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBiaXR3aXNlIE5PVCBvZiB0aGlzIExvbmcuXHJcbiAqIEByZXR1cm5zIHshTG9uZ31cclxuICovXHJcbkxvbmdQcm90b3R5cGUubm90ID0gZnVuY3Rpb24gbm90KCkge1xyXG4gICAgcmV0dXJuIGZyb21CaXRzKH50aGlzLmxvdywgfnRoaXMuaGlnaCwgdGhpcy51bnNpZ25lZCk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgYml0d2lzZSBBTkQgb2YgdGhpcyBMb25nIGFuZCB0aGUgc3BlY2lmaWVkLlxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIExvbmdcclxuICogQHJldHVybnMgeyFMb25nfVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5hbmQgPSBmdW5jdGlvbiBhbmQob3RoZXIpIHtcclxuICAgIGlmICghaXNMb25nKG90aGVyKSlcclxuICAgICAgICBvdGhlciA9IGZyb21WYWx1ZShvdGhlcik7XHJcbiAgICByZXR1cm4gZnJvbUJpdHModGhpcy5sb3cgJiBvdGhlci5sb3csIHRoaXMuaGlnaCAmIG90aGVyLmhpZ2gsIHRoaXMudW5zaWduZWQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGJpdHdpc2UgT1Igb2YgdGhpcyBMb25nIGFuZCB0aGUgc3BlY2lmaWVkLlxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIExvbmdcclxuICogQHJldHVybnMgeyFMb25nfVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5vciA9IGZ1bmN0aW9uIG9yKG90aGVyKSB7XHJcbiAgICBpZiAoIWlzTG9uZyhvdGhlcikpXHJcbiAgICAgICAgb3RoZXIgPSBmcm9tVmFsdWUob3RoZXIpO1xyXG4gICAgcmV0dXJuIGZyb21CaXRzKHRoaXMubG93IHwgb3RoZXIubG93LCB0aGlzLmhpZ2ggfCBvdGhlci5oaWdoLCB0aGlzLnVuc2lnbmVkKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBiaXR3aXNlIFhPUiBvZiB0aGlzIExvbmcgYW5kIHRoZSBnaXZlbiBvbmUuXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gb3RoZXIgT3RoZXIgTG9uZ1xyXG4gKiBAcmV0dXJucyB7IUxvbmd9XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLnhvciA9IGZ1bmN0aW9uIHhvcihvdGhlcikge1xyXG4gICAgaWYgKCFpc0xvbmcob3RoZXIpKVxyXG4gICAgICAgIG90aGVyID0gZnJvbVZhbHVlKG90aGVyKTtcclxuICAgIHJldHVybiBmcm9tQml0cyh0aGlzLmxvdyBeIG90aGVyLmxvdywgdGhpcy5oaWdoIF4gb3RoZXIuaGlnaCwgdGhpcy51bnNpZ25lZCk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGlzIExvbmcgd2l0aCBiaXRzIHNoaWZ0ZWQgdG8gdGhlIGxlZnQgYnkgdGhlIGdpdmVuIGFtb3VudC5cclxuICogQHBhcmFtIHtudW1iZXJ8IUxvbmd9IG51bUJpdHMgTnVtYmVyIG9mIGJpdHNcclxuICogQHJldHVybnMgeyFMb25nfSBTaGlmdGVkIExvbmdcclxuICovXHJcbkxvbmdQcm90b3R5cGUuc2hpZnRMZWZ0ID0gZnVuY3Rpb24gc2hpZnRMZWZ0KG51bUJpdHMpIHtcclxuICAgIGlmIChpc0xvbmcobnVtQml0cykpXHJcbiAgICAgICAgbnVtQml0cyA9IG51bUJpdHMudG9JbnQoKTtcclxuICAgIGlmICgobnVtQml0cyAmPSA2MykgPT09IDApXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICBlbHNlIGlmIChudW1CaXRzIDwgMzIpXHJcbiAgICAgICAgcmV0dXJuIGZyb21CaXRzKHRoaXMubG93IDw8IG51bUJpdHMsICh0aGlzLmhpZ2ggPDwgbnVtQml0cykgfCAodGhpcy5sb3cgPj4+ICgzMiAtIG51bUJpdHMpKSwgdGhpcy51bnNpZ25lZCk7XHJcbiAgICBlbHNlXHJcbiAgICAgICAgcmV0dXJuIGZyb21CaXRzKDAsIHRoaXMubG93IDw8IChudW1CaXRzIC0gMzIpLCB0aGlzLnVuc2lnbmVkKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoaXMgTG9uZyB3aXRoIGJpdHMgc2hpZnRlZCB0byB0aGUgbGVmdCBieSB0aGUgZ2l2ZW4gYW1vdW50LiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI3NoaWZ0TGVmdH0uXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge251bWJlcnwhTG9uZ30gbnVtQml0cyBOdW1iZXIgb2YgYml0c1xyXG4gKiBAcmV0dXJucyB7IUxvbmd9IFNoaWZ0ZWQgTG9uZ1xyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5zaGwgPSBMb25nUHJvdG90eXBlLnNoaWZ0TGVmdDtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoaXMgTG9uZyB3aXRoIGJpdHMgYXJpdGhtZXRpY2FsbHkgc2hpZnRlZCB0byB0aGUgcmlnaHQgYnkgdGhlIGdpdmVuIGFtb3VudC5cclxuICogQHBhcmFtIHtudW1iZXJ8IUxvbmd9IG51bUJpdHMgTnVtYmVyIG9mIGJpdHNcclxuICogQHJldHVybnMgeyFMb25nfSBTaGlmdGVkIExvbmdcclxuICovXHJcbkxvbmdQcm90b3R5cGUuc2hpZnRSaWdodCA9IGZ1bmN0aW9uIHNoaWZ0UmlnaHQobnVtQml0cykge1xyXG4gICAgaWYgKGlzTG9uZyhudW1CaXRzKSlcclxuICAgICAgICBudW1CaXRzID0gbnVtQml0cy50b0ludCgpO1xyXG4gICAgaWYgKChudW1CaXRzICY9IDYzKSA9PT0gMClcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIGVsc2UgaWYgKG51bUJpdHMgPCAzMilcclxuICAgICAgICByZXR1cm4gZnJvbUJpdHMoKHRoaXMubG93ID4+PiBudW1CaXRzKSB8ICh0aGlzLmhpZ2ggPDwgKDMyIC0gbnVtQml0cykpLCB0aGlzLmhpZ2ggPj4gbnVtQml0cywgdGhpcy51bnNpZ25lZCk7XHJcbiAgICBlbHNlXHJcbiAgICAgICAgcmV0dXJuIGZyb21CaXRzKHRoaXMuaGlnaCA+PiAobnVtQml0cyAtIDMyKSwgdGhpcy5oaWdoID49IDAgPyAwIDogLTEsIHRoaXMudW5zaWduZWQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhpcyBMb25nIHdpdGggYml0cyBhcml0aG1ldGljYWxseSBzaGlmdGVkIHRvIHRoZSByaWdodCBieSB0aGUgZ2l2ZW4gYW1vdW50LiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI3NoaWZ0UmlnaHR9LlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtudW1iZXJ8IUxvbmd9IG51bUJpdHMgTnVtYmVyIG9mIGJpdHNcclxuICogQHJldHVybnMgeyFMb25nfSBTaGlmdGVkIExvbmdcclxuICovXHJcbkxvbmdQcm90b3R5cGUuc2hyID0gTG9uZ1Byb3RvdHlwZS5zaGlmdFJpZ2h0O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhpcyBMb25nIHdpdGggYml0cyBsb2dpY2FsbHkgc2hpZnRlZCB0byB0aGUgcmlnaHQgYnkgdGhlIGdpdmVuIGFtb3VudC5cclxuICogQHBhcmFtIHtudW1iZXJ8IUxvbmd9IG51bUJpdHMgTnVtYmVyIG9mIGJpdHNcclxuICogQHJldHVybnMgeyFMb25nfSBTaGlmdGVkIExvbmdcclxuICovXHJcbkxvbmdQcm90b3R5cGUuc2hpZnRSaWdodFVuc2lnbmVkID0gZnVuY3Rpb24gc2hpZnRSaWdodFVuc2lnbmVkKG51bUJpdHMpIHtcclxuICAgIGlmIChpc0xvbmcobnVtQml0cykpXHJcbiAgICAgICAgbnVtQml0cyA9IG51bUJpdHMudG9JbnQoKTtcclxuICAgIG51bUJpdHMgJj0gNjM7XHJcbiAgICBpZiAobnVtQml0cyA9PT0gMClcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHZhciBoaWdoID0gdGhpcy5oaWdoO1xyXG4gICAgICAgIGlmIChudW1CaXRzIDwgMzIpIHtcclxuICAgICAgICAgICAgdmFyIGxvdyA9IHRoaXMubG93O1xyXG4gICAgICAgICAgICByZXR1cm4gZnJvbUJpdHMoKGxvdyA+Pj4gbnVtQml0cykgfCAoaGlnaCA8PCAoMzIgLSBudW1CaXRzKSksIGhpZ2ggPj4+IG51bUJpdHMsIHRoaXMudW5zaWduZWQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobnVtQml0cyA9PT0gMzIpXHJcbiAgICAgICAgICAgIHJldHVybiBmcm9tQml0cyhoaWdoLCAwLCB0aGlzLnVuc2lnbmVkKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBmcm9tQml0cyhoaWdoID4+PiAobnVtQml0cyAtIDMyKSwgMCwgdGhpcy51bnNpZ25lZCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGlzIExvbmcgd2l0aCBiaXRzIGxvZ2ljYWxseSBzaGlmdGVkIHRvIHRoZSByaWdodCBieSB0aGUgZ2l2ZW4gYW1vdW50LiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI3NoaWZ0UmlnaHRVbnNpZ25lZH0uXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge251bWJlcnwhTG9uZ30gbnVtQml0cyBOdW1iZXIgb2YgYml0c1xyXG4gKiBAcmV0dXJucyB7IUxvbmd9IFNoaWZ0ZWQgTG9uZ1xyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5zaHJ1ID0gTG9uZ1Byb3RvdHlwZS5zaGlmdFJpZ2h0VW5zaWduZWQ7XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGlzIExvbmcgd2l0aCBiaXRzIGxvZ2ljYWxseSBzaGlmdGVkIHRvIHRoZSByaWdodCBieSB0aGUgZ2l2ZW4gYW1vdW50LiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI3NoaWZ0UmlnaHRVbnNpZ25lZH0uXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge251bWJlcnwhTG9uZ30gbnVtQml0cyBOdW1iZXIgb2YgYml0c1xyXG4gKiBAcmV0dXJucyB7IUxvbmd9IFNoaWZ0ZWQgTG9uZ1xyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5zaHJfdSA9IExvbmdQcm90b3R5cGUuc2hpZnRSaWdodFVuc2lnbmVkO1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIHRoaXMgTG9uZyB0byBzaWduZWQuXHJcbiAqIEByZXR1cm5zIHshTG9uZ30gU2lnbmVkIGxvbmdcclxuICovXHJcbkxvbmdQcm90b3R5cGUudG9TaWduZWQgPSBmdW5jdGlvbiB0b1NpZ25lZCgpIHtcclxuICAgIGlmICghdGhpcy51bnNpZ25lZClcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIHJldHVybiBmcm9tQml0cyh0aGlzLmxvdywgdGhpcy5oaWdoLCBmYWxzZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29udmVydHMgdGhpcyBMb25nIHRvIHVuc2lnbmVkLlxyXG4gKiBAcmV0dXJucyB7IUxvbmd9IFVuc2lnbmVkIGxvbmdcclxuICovXHJcbkxvbmdQcm90b3R5cGUudG9VbnNpZ25lZCA9IGZ1bmN0aW9uIHRvVW5zaWduZWQoKSB7XHJcbiAgICBpZiAodGhpcy51bnNpZ25lZClcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIHJldHVybiBmcm9tQml0cyh0aGlzLmxvdywgdGhpcy5oaWdoLCB0cnVlKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyB0aGlzIExvbmcgdG8gaXRzIGJ5dGUgcmVwcmVzZW50YXRpb24uXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IGxlIFdoZXRoZXIgbGl0dGxlIG9yIGJpZyBlbmRpYW4sIGRlZmF1bHRzIHRvIGJpZyBlbmRpYW5cclxuICogQHJldHVybnMgeyFBcnJheS48bnVtYmVyPn0gQnl0ZSByZXByZXNlbnRhdGlvblxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS50b0J5dGVzID0gZnVuY3Rpb24gdG9CeXRlcyhsZSkge1xyXG4gICAgcmV0dXJuIGxlID8gdGhpcy50b0J5dGVzTEUoKSA6IHRoaXMudG9CeXRlc0JFKCk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29udmVydHMgdGhpcyBMb25nIHRvIGl0cyBsaXR0bGUgZW5kaWFuIGJ5dGUgcmVwcmVzZW50YXRpb24uXHJcbiAqIEByZXR1cm5zIHshQXJyYXkuPG51bWJlcj59IExpdHRsZSBlbmRpYW4gYnl0ZSByZXByZXNlbnRhdGlvblxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS50b0J5dGVzTEUgPSBmdW5jdGlvbiB0b0J5dGVzTEUoKSB7XHJcbiAgICB2YXIgaGkgPSB0aGlzLmhpZ2gsXHJcbiAgICAgICAgbG8gPSB0aGlzLmxvdztcclxuICAgIHJldHVybiBbXHJcbiAgICAgICAgbG8gICAgICAgICYgMHhmZixcclxuICAgICAgICBsbyA+Pj4gIDggJiAweGZmLFxyXG4gICAgICAgIGxvID4+PiAxNiAmIDB4ZmYsXHJcbiAgICAgICAgbG8gPj4+IDI0ICAgICAgICxcclxuICAgICAgICBoaSAgICAgICAgJiAweGZmLFxyXG4gICAgICAgIGhpID4+PiAgOCAmIDB4ZmYsXHJcbiAgICAgICAgaGkgPj4+IDE2ICYgMHhmZixcclxuICAgICAgICBoaSA+Pj4gMjRcclxuICAgIF07XHJcbn07XHJcblxyXG4vKipcclxuICogQ29udmVydHMgdGhpcyBMb25nIHRvIGl0cyBiaWcgZW5kaWFuIGJ5dGUgcmVwcmVzZW50YXRpb24uXHJcbiAqIEByZXR1cm5zIHshQXJyYXkuPG51bWJlcj59IEJpZyBlbmRpYW4gYnl0ZSByZXByZXNlbnRhdGlvblxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS50b0J5dGVzQkUgPSBmdW5jdGlvbiB0b0J5dGVzQkUoKSB7XHJcbiAgICB2YXIgaGkgPSB0aGlzLmhpZ2gsXHJcbiAgICAgICAgbG8gPSB0aGlzLmxvdztcclxuICAgIHJldHVybiBbXHJcbiAgICAgICAgaGkgPj4+IDI0ICAgICAgICxcclxuICAgICAgICBoaSA+Pj4gMTYgJiAweGZmLFxyXG4gICAgICAgIGhpID4+PiAgOCAmIDB4ZmYsXHJcbiAgICAgICAgaGkgICAgICAgICYgMHhmZixcclxuICAgICAgICBsbyA+Pj4gMjQgICAgICAgLFxyXG4gICAgICAgIGxvID4+PiAxNiAmIDB4ZmYsXHJcbiAgICAgICAgbG8gPj4+ICA4ICYgMHhmZixcclxuICAgICAgICBsbyAgICAgICAgJiAweGZmXHJcbiAgICBdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBMb25nIGZyb20gaXRzIGJ5dGUgcmVwcmVzZW50YXRpb24uXHJcbiAqIEBwYXJhbSB7IUFycmF5LjxudW1iZXI+fSBieXRlcyBCeXRlIHJlcHJlc2VudGF0aW9uXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IHVuc2lnbmVkIFdoZXRoZXIgdW5zaWduZWQgb3Igbm90LCBkZWZhdWx0cyB0byBzaWduZWRcclxuICogQHBhcmFtIHtib29sZWFuPX0gbGUgV2hldGhlciBsaXR0bGUgb3IgYmlnIGVuZGlhbiwgZGVmYXVsdHMgdG8gYmlnIGVuZGlhblxyXG4gKiBAcmV0dXJucyB7TG9uZ30gVGhlIGNvcnJlc3BvbmRpbmcgTG9uZyB2YWx1ZVxyXG4gKi9cclxuTG9uZy5mcm9tQnl0ZXMgPSBmdW5jdGlvbiBmcm9tQnl0ZXMoYnl0ZXMsIHVuc2lnbmVkLCBsZSkge1xyXG4gICAgcmV0dXJuIGxlID8gTG9uZy5mcm9tQnl0ZXNMRShieXRlcywgdW5zaWduZWQpIDogTG9uZy5mcm9tQnl0ZXNCRShieXRlcywgdW5zaWduZWQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBMb25nIGZyb20gaXRzIGxpdHRsZSBlbmRpYW4gYnl0ZSByZXByZXNlbnRhdGlvbi5cclxuICogQHBhcmFtIHshQXJyYXkuPG51bWJlcj59IGJ5dGVzIExpdHRsZSBlbmRpYW4gYnl0ZSByZXByZXNlbnRhdGlvblxyXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSB1bnNpZ25lZCBXaGV0aGVyIHVuc2lnbmVkIG9yIG5vdCwgZGVmYXVsdHMgdG8gc2lnbmVkXHJcbiAqIEByZXR1cm5zIHtMb25nfSBUaGUgY29ycmVzcG9uZGluZyBMb25nIHZhbHVlXHJcbiAqL1xyXG5Mb25nLmZyb21CeXRlc0xFID0gZnVuY3Rpb24gZnJvbUJ5dGVzTEUoYnl0ZXMsIHVuc2lnbmVkKSB7XHJcbiAgICByZXR1cm4gbmV3IExvbmcoXHJcbiAgICAgICAgYnl0ZXNbMF0gICAgICAgfFxyXG4gICAgICAgIGJ5dGVzWzFdIDw8ICA4IHxcclxuICAgICAgICBieXRlc1syXSA8PCAxNiB8XHJcbiAgICAgICAgYnl0ZXNbM10gPDwgMjQsXHJcbiAgICAgICAgYnl0ZXNbNF0gICAgICAgfFxyXG4gICAgICAgIGJ5dGVzWzVdIDw8ICA4IHxcclxuICAgICAgICBieXRlc1s2XSA8PCAxNiB8XHJcbiAgICAgICAgYnl0ZXNbN10gPDwgMjQsXHJcbiAgICAgICAgdW5zaWduZWRcclxuICAgICk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIExvbmcgZnJvbSBpdHMgYmlnIGVuZGlhbiBieXRlIHJlcHJlc2VudGF0aW9uLlxyXG4gKiBAcGFyYW0geyFBcnJheS48bnVtYmVyPn0gYnl0ZXMgQmlnIGVuZGlhbiBieXRlIHJlcHJlc2VudGF0aW9uXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IHVuc2lnbmVkIFdoZXRoZXIgdW5zaWduZWQgb3Igbm90LCBkZWZhdWx0cyB0byBzaWduZWRcclxuICogQHJldHVybnMge0xvbmd9IFRoZSBjb3JyZXNwb25kaW5nIExvbmcgdmFsdWVcclxuICovXHJcbkxvbmcuZnJvbUJ5dGVzQkUgPSBmdW5jdGlvbiBmcm9tQnl0ZXNCRShieXRlcywgdW5zaWduZWQpIHtcclxuICAgIHJldHVybiBuZXcgTG9uZyhcclxuICAgICAgICBieXRlc1s0XSA8PCAyNCB8XHJcbiAgICAgICAgYnl0ZXNbNV0gPDwgMTYgfFxyXG4gICAgICAgIGJ5dGVzWzZdIDw8ICA4IHxcclxuICAgICAgICBieXRlc1s3XSxcclxuICAgICAgICBieXRlc1swXSA8PCAyNCB8XHJcbiAgICAgICAgYnl0ZXNbMV0gPDwgMTYgfFxyXG4gICAgICAgIGJ5dGVzWzJdIDw8ICA4IHxcclxuICAgICAgICBieXRlc1szXSxcclxuICAgICAgICB1bnNpZ25lZFxyXG4gICAgKTtcclxufTtcclxuIiwiLy8gbWluaW1hbCBsaWJyYXJ5IGVudHJ5IHBvaW50LlxuXG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vc3JjL2luZGV4LW1pbmltYWxcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBwcm90b2J1ZiA9IGV4cG9ydHM7XG5cbi8qKlxuICogQnVpbGQgdHlwZSwgb25lIG9mIGBcImZ1bGxcImAsIGBcImxpZ2h0XCJgIG9yIGBcIm1pbmltYWxcImAuXG4gKiBAbmFtZSBidWlsZFxuICogQHR5cGUge3N0cmluZ31cbiAqIEBjb25zdFxuICovXG5wcm90b2J1Zi5idWlsZCA9IFwibWluaW1hbFwiO1xuXG4vLyBTZXJpYWxpemF0aW9uXG5wcm90b2J1Zi5Xcml0ZXIgICAgICAgPSByZXF1aXJlKFwiLi93cml0ZXJcIik7XG5wcm90b2J1Zi5CdWZmZXJXcml0ZXIgPSByZXF1aXJlKFwiLi93cml0ZXJfYnVmZmVyXCIpO1xucHJvdG9idWYuUmVhZGVyICAgICAgID0gcmVxdWlyZShcIi4vcmVhZGVyXCIpO1xucHJvdG9idWYuQnVmZmVyUmVhZGVyID0gcmVxdWlyZShcIi4vcmVhZGVyX2J1ZmZlclwiKTtcblxuLy8gVXRpbGl0eVxucHJvdG9idWYudXRpbCAgICAgICAgID0gcmVxdWlyZShcIi4vdXRpbC9taW5pbWFsXCIpO1xucHJvdG9idWYucnBjICAgICAgICAgID0gcmVxdWlyZShcIi4vcnBjXCIpO1xucHJvdG9idWYucm9vdHMgICAgICAgID0gcmVxdWlyZShcIi4vcm9vdHNcIik7XG5wcm90b2J1Zi5jb25maWd1cmUgICAgPSBjb25maWd1cmU7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4vKipcbiAqIFJlY29uZmlndXJlcyB0aGUgbGlicmFyeSBhY2NvcmRpbmcgdG8gdGhlIGVudmlyb25tZW50LlxuICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAqL1xuZnVuY3Rpb24gY29uZmlndXJlKCkge1xuICAgIHByb3RvYnVmLnV0aWwuX2NvbmZpZ3VyZSgpO1xuICAgIHByb3RvYnVmLldyaXRlci5fY29uZmlndXJlKHByb3RvYnVmLkJ1ZmZlcldyaXRlcik7XG4gICAgcHJvdG9idWYuUmVhZGVyLl9jb25maWd1cmUocHJvdG9idWYuQnVmZmVyUmVhZGVyKTtcbn1cblxuLy8gU2V0IHVwIGJ1ZmZlciB1dGlsaXR5IGFjY29yZGluZyB0byB0aGUgZW52aXJvbm1lbnRcbmNvbmZpZ3VyZSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IFJlYWRlcjtcblxudmFyIHV0aWwgICAgICA9IHJlcXVpcmUoXCIuL3V0aWwvbWluaW1hbFwiKTtcblxudmFyIEJ1ZmZlclJlYWRlcjsgLy8gY3ljbGljXG5cbnZhciBMb25nQml0cyAgPSB1dGlsLkxvbmdCaXRzLFxuICAgIHV0ZjggICAgICA9IHV0aWwudXRmODtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmZ1bmN0aW9uIGluZGV4T3V0T2ZSYW5nZShyZWFkZXIsIHdyaXRlTGVuZ3RoKSB7XG4gICAgcmV0dXJuIFJhbmdlRXJyb3IoXCJpbmRleCBvdXQgb2YgcmFuZ2U6IFwiICsgcmVhZGVyLnBvcyArIFwiICsgXCIgKyAod3JpdGVMZW5ndGggfHwgMSkgKyBcIiA+IFwiICsgcmVhZGVyLmxlbik7XG59XG5cbi8qKlxuICogQ29uc3RydWN0cyBhIG5ldyByZWFkZXIgaW5zdGFuY2UgdXNpbmcgdGhlIHNwZWNpZmllZCBidWZmZXIuXG4gKiBAY2xhc3NkZXNjIFdpcmUgZm9ybWF0IHJlYWRlciB1c2luZyBgVWludDhBcnJheWAgaWYgYXZhaWxhYmxlLCBvdGhlcndpc2UgYEFycmF5YC5cbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWZmZXIgQnVmZmVyIHRvIHJlYWQgZnJvbVxuICovXG5mdW5jdGlvbiBSZWFkZXIoYnVmZmVyKSB7XG5cbiAgICAvKipcbiAgICAgKiBSZWFkIGJ1ZmZlci5cbiAgICAgKiBAdHlwZSB7VWludDhBcnJheX1cbiAgICAgKi9cbiAgICB0aGlzLmJ1ZiA9IGJ1ZmZlcjtcblxuICAgIC8qKlxuICAgICAqIFJlYWQgYnVmZmVyIHBvc2l0aW9uLlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5wb3MgPSAwO1xuXG4gICAgLyoqXG4gICAgICogUmVhZCBidWZmZXIgbGVuZ3RoLlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5sZW4gPSBidWZmZXIubGVuZ3RoO1xufVxuXG52YXIgY3JlYXRlX2FycmF5ID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09IFwidW5kZWZpbmVkXCJcbiAgICA/IGZ1bmN0aW9uIGNyZWF0ZV90eXBlZF9hcnJheShidWZmZXIpIHtcbiAgICAgICAgaWYgKGJ1ZmZlciBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkgfHwgQXJyYXkuaXNBcnJheShidWZmZXIpKVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWFkZXIoYnVmZmVyKTtcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJpbGxlZ2FsIGJ1ZmZlclwiKTtcbiAgICB9XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICA6IGZ1bmN0aW9uIGNyZWF0ZV9hcnJheShidWZmZXIpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYnVmZmVyKSlcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVhZGVyKGJ1ZmZlcik7XG4gICAgICAgIHRocm93IEVycm9yKFwiaWxsZWdhbCBidWZmZXJcIik7XG4gICAgfTtcblxudmFyIGNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICByZXR1cm4gdXRpbC5CdWZmZXJcbiAgICAgICAgPyBmdW5jdGlvbiBjcmVhdGVfYnVmZmVyX3NldHVwKGJ1ZmZlcikge1xuICAgICAgICAgICAgcmV0dXJuIChSZWFkZXIuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlX2J1ZmZlcihidWZmZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdXRpbC5CdWZmZXIuaXNCdWZmZXIoYnVmZmVyKVxuICAgICAgICAgICAgICAgICAgICA/IG5ldyBCdWZmZXJSZWFkZXIoYnVmZmVyKVxuICAgICAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICAgICAgICAgICAgICA6IGNyZWF0ZV9hcnJheShidWZmZXIpO1xuICAgICAgICAgICAgfSkoYnVmZmVyKTtcbiAgICAgICAgfVxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICA6IGNyZWF0ZV9hcnJheTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyByZWFkZXIgdXNpbmcgdGhlIHNwZWNpZmllZCBidWZmZXIuXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7VWludDhBcnJheXxCdWZmZXJ9IGJ1ZmZlciBCdWZmZXIgdG8gcmVhZCBmcm9tXG4gKiBAcmV0dXJucyB7UmVhZGVyfEJ1ZmZlclJlYWRlcn0gQSB7QGxpbmsgQnVmZmVyUmVhZGVyfSBpZiBgYnVmZmVyYCBpcyBhIEJ1ZmZlciwgb3RoZXJ3aXNlIGEge0BsaW5rIFJlYWRlcn1cbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiBgYnVmZmVyYCBpcyBub3QgYSB2YWxpZCBidWZmZXJcbiAqL1xuUmVhZGVyLmNyZWF0ZSA9IGNyZWF0ZSgpO1xuXG5SZWFkZXIucHJvdG90eXBlLl9zbGljZSA9IHV0aWwuQXJyYXkucHJvdG90eXBlLnN1YmFycmF5IHx8IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIHV0aWwuQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuXG4vKipcbiAqIFJlYWRzIGEgdmFyaW50IGFzIGFuIHVuc2lnbmVkIDMyIGJpdCB2YWx1ZS5cbiAqIEBmdW5jdGlvblxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxuICovXG5SZWFkZXIucHJvdG90eXBlLnVpbnQzMiA9IChmdW5jdGlvbiByZWFkX3VpbnQzMl9zZXR1cCgpIHtcbiAgICB2YXIgdmFsdWUgPSA0Mjk0OTY3Mjk1OyAvLyBvcHRpbWl6ZXIgdHlwZS1oaW50LCB0ZW5kcyB0byBkZW9wdCBvdGhlcndpc2UgKD8hKVxuICAgIHJldHVybiBmdW5jdGlvbiByZWFkX3VpbnQzMigpIHtcbiAgICAgICAgdmFsdWUgPSAoICAgICAgICAgdGhpcy5idWZbdGhpcy5wb3NdICYgMTI3ICAgICAgICkgPj4+IDA7IGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOCkgcmV0dXJuIHZhbHVlO1xuICAgICAgICB2YWx1ZSA9ICh2YWx1ZSB8ICh0aGlzLmJ1Zlt0aGlzLnBvc10gJiAxMjcpIDw8ICA3KSA+Pj4gMDsgaWYgKHRoaXMuYnVmW3RoaXMucG9zKytdIDwgMTI4KSByZXR1cm4gdmFsdWU7XG4gICAgICAgIHZhbHVlID0gKHZhbHVlIHwgKHRoaXMuYnVmW3RoaXMucG9zXSAmIDEyNykgPDwgMTQpID4+PiAwOyBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpIHJldHVybiB2YWx1ZTtcbiAgICAgICAgdmFsdWUgPSAodmFsdWUgfCAodGhpcy5idWZbdGhpcy5wb3NdICYgMTI3KSA8PCAyMSkgPj4+IDA7IGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOCkgcmV0dXJuIHZhbHVlO1xuICAgICAgICB2YWx1ZSA9ICh2YWx1ZSB8ICh0aGlzLmJ1Zlt0aGlzLnBvc10gJiAgMTUpIDw8IDI4KSA+Pj4gMDsgaWYgKHRoaXMuYnVmW3RoaXMucG9zKytdIDwgMTI4KSByZXR1cm4gdmFsdWU7XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmICgodGhpcy5wb3MgKz0gNSkgPiB0aGlzLmxlbikge1xuICAgICAgICAgICAgdGhpcy5wb3MgPSB0aGlzLmxlbjtcbiAgICAgICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzLCAxMCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG59KSgpO1xuXG4vKipcbiAqIFJlYWRzIGEgdmFyaW50IGFzIGEgc2lnbmVkIDMyIGJpdCB2YWx1ZS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS5pbnQzMiA9IGZ1bmN0aW9uIHJlYWRfaW50MzIoKSB7XG4gICAgcmV0dXJuIHRoaXMudWludDMyKCkgfCAwO1xufTtcblxuLyoqXG4gKiBSZWFkcyBhIHppZy16YWcgZW5jb2RlZCB2YXJpbnQgYXMgYSBzaWduZWQgMzIgYml0IHZhbHVlLlxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxuICovXG5SZWFkZXIucHJvdG90eXBlLnNpbnQzMiA9IGZ1bmN0aW9uIHJlYWRfc2ludDMyKCkge1xuICAgIHZhciB2YWx1ZSA9IHRoaXMudWludDMyKCk7XG4gICAgcmV0dXJuIHZhbHVlID4+PiAxIF4gLSh2YWx1ZSAmIDEpIHwgMDtcbn07XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLWludmFsaWQtdGhpcyAqL1xuXG5mdW5jdGlvbiByZWFkTG9uZ1ZhcmludCgpIHtcbiAgICAvLyB0ZW5kcyB0byBkZW9wdCB3aXRoIGxvY2FsIHZhcnMgZm9yIG9jdGV0IGV0Yy5cbiAgICB2YXIgYml0cyA9IG5ldyBMb25nQml0cygwLCAwKTtcbiAgICB2YXIgaSA9IDA7XG4gICAgaWYgKHRoaXMubGVuIC0gdGhpcy5wb3MgPiA0KSB7IC8vIGZhc3Qgcm91dGUgKGxvKVxuICAgICAgICBmb3IgKDsgaSA8IDQ7ICsraSkge1xuICAgICAgICAgICAgLy8gMXN0Li40dGhcbiAgICAgICAgICAgIGJpdHMubG8gPSAoYml0cy5sbyB8ICh0aGlzLmJ1Zlt0aGlzLnBvc10gJiAxMjcpIDw8IGkgKiA3KSA+Pj4gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOClcbiAgICAgICAgICAgICAgICByZXR1cm4gYml0cztcbiAgICAgICAgfVxuICAgICAgICAvLyA1dGhcbiAgICAgICAgYml0cy5sbyA9IChiaXRzLmxvIHwgKHRoaXMuYnVmW3RoaXMucG9zXSAmIDEyNykgPDwgMjgpID4+PiAwO1xuICAgICAgICBiaXRzLmhpID0gKGJpdHMuaGkgfCAodGhpcy5idWZbdGhpcy5wb3NdICYgMTI3KSA+PiAgNCkgPj4+IDA7XG4gICAgICAgIGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOClcbiAgICAgICAgICAgIHJldHVybiBiaXRzO1xuICAgICAgICBpID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKDsgaSA8IDM7ICsraSkge1xuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgICAgICBpZiAodGhpcy5wb3MgPj0gdGhpcy5sZW4pXG4gICAgICAgICAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMpO1xuICAgICAgICAgICAgLy8gMXN0Li4zdGhcbiAgICAgICAgICAgIGJpdHMubG8gPSAoYml0cy5sbyB8ICh0aGlzLmJ1Zlt0aGlzLnBvc10gJiAxMjcpIDw8IGkgKiA3KSA+Pj4gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOClcbiAgICAgICAgICAgICAgICByZXR1cm4gYml0cztcbiAgICAgICAgfVxuICAgICAgICAvLyA0dGhcbiAgICAgICAgYml0cy5sbyA9IChiaXRzLmxvIHwgKHRoaXMuYnVmW3RoaXMucG9zKytdICYgMTI3KSA8PCBpICogNykgPj4+IDA7XG4gICAgICAgIHJldHVybiBiaXRzO1xuICAgIH1cbiAgICBpZiAodGhpcy5sZW4gLSB0aGlzLnBvcyA+IDQpIHsgLy8gZmFzdCByb3V0ZSAoaGkpXG4gICAgICAgIGZvciAoOyBpIDwgNTsgKytpKSB7XG4gICAgICAgICAgICAvLyA2dGguLjEwdGhcbiAgICAgICAgICAgIGJpdHMuaGkgPSAoYml0cy5oaSB8ICh0aGlzLmJ1Zlt0aGlzLnBvc10gJiAxMjcpIDw8IGkgKiA3ICsgMykgPj4+IDA7XG4gICAgICAgICAgICBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpdHM7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKDsgaSA8IDU7ICsraSkge1xuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgICAgICBpZiAodGhpcy5wb3MgPj0gdGhpcy5sZW4pXG4gICAgICAgICAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMpO1xuICAgICAgICAgICAgLy8gNnRoLi4xMHRoXG4gICAgICAgICAgICBiaXRzLmhpID0gKGJpdHMuaGkgfCAodGhpcy5idWZbdGhpcy5wb3NdICYgMTI3KSA8PCBpICogNyArIDMpID4+PiAwO1xuICAgICAgICAgICAgaWYgKHRoaXMuYnVmW3RoaXMucG9zKytdIDwgMTI4KVxuICAgICAgICAgICAgICAgIHJldHVybiBiaXRzO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgdGhyb3cgRXJyb3IoXCJpbnZhbGlkIHZhcmludCBlbmNvZGluZ1wiKTtcbn1cblxuLyogZXNsaW50LWVuYWJsZSBuby1pbnZhbGlkLXRoaXMgKi9cblxuLyoqXG4gKiBSZWFkcyBhIHZhcmludCBhcyBhIHNpZ25lZCA2NCBiaXQgdmFsdWUuXG4gKiBAbmFtZSBSZWFkZXIjaW50NjRcbiAqIEBmdW5jdGlvblxuICogQHJldHVybnMge0xvbmd9IFZhbHVlIHJlYWRcbiAqL1xuXG4vKipcbiAqIFJlYWRzIGEgdmFyaW50IGFzIGFuIHVuc2lnbmVkIDY0IGJpdCB2YWx1ZS5cbiAqIEBuYW1lIFJlYWRlciN1aW50NjRcbiAqIEBmdW5jdGlvblxuICogQHJldHVybnMge0xvbmd9IFZhbHVlIHJlYWRcbiAqL1xuXG4vKipcbiAqIFJlYWRzIGEgemlnLXphZyBlbmNvZGVkIHZhcmludCBhcyBhIHNpZ25lZCA2NCBiaXQgdmFsdWUuXG4gKiBAbmFtZSBSZWFkZXIjc2ludDY0XG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtMb25nfSBWYWx1ZSByZWFkXG4gKi9cblxuLyoqXG4gKiBSZWFkcyBhIHZhcmludCBhcyBhIGJvb2xlYW4uXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVmFsdWUgcmVhZFxuICovXG5SZWFkZXIucHJvdG90eXBlLmJvb2wgPSBmdW5jdGlvbiByZWFkX2Jvb2woKSB7XG4gICAgcmV0dXJuIHRoaXMudWludDMyKCkgIT09IDA7XG59O1xuXG5mdW5jdGlvbiByZWFkRml4ZWQzMl9lbmQoYnVmLCBlbmQpIHsgLy8gbm90ZSB0aGF0IHRoaXMgdXNlcyBgZW5kYCwgbm90IGBwb3NgXG4gICAgcmV0dXJuIChidWZbZW5kIC0gNF1cbiAgICAgICAgICB8IGJ1ZltlbmQgLSAzXSA8PCA4XG4gICAgICAgICAgfCBidWZbZW5kIC0gMl0gPDwgMTZcbiAgICAgICAgICB8IGJ1ZltlbmQgLSAxXSA8PCAyNCkgPj4+IDA7XG59XG5cbi8qKlxuICogUmVhZHMgZml4ZWQgMzIgYml0cyBhcyBhbiB1bnNpZ25lZCAzMiBiaXQgaW50ZWdlci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS5maXhlZDMyID0gZnVuY3Rpb24gcmVhZF9maXhlZDMyKCkge1xuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKHRoaXMucG9zICsgNCA+IHRoaXMubGVuKVxuICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcywgNCk7XG5cbiAgICByZXR1cm4gcmVhZEZpeGVkMzJfZW5kKHRoaXMuYnVmLCB0aGlzLnBvcyArPSA0KTtcbn07XG5cbi8qKlxuICogUmVhZHMgZml4ZWQgMzIgYml0cyBhcyBhIHNpZ25lZCAzMiBiaXQgaW50ZWdlci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS5zZml4ZWQzMiA9IGZ1bmN0aW9uIHJlYWRfc2ZpeGVkMzIoKSB7XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAodGhpcy5wb3MgKyA0ID4gdGhpcy5sZW4pXG4gICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzLCA0KTtcblxuICAgIHJldHVybiByZWFkRml4ZWQzMl9lbmQodGhpcy5idWYsIHRoaXMucG9zICs9IDQpIHwgMDtcbn07XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLWludmFsaWQtdGhpcyAqL1xuXG5mdW5jdGlvbiByZWFkRml4ZWQ2NCgvKiB0aGlzOiBSZWFkZXIgKi8pIHtcblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICh0aGlzLnBvcyArIDggPiB0aGlzLmxlbilcbiAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMsIDgpO1xuXG4gICAgcmV0dXJuIG5ldyBMb25nQml0cyhyZWFkRml4ZWQzMl9lbmQodGhpcy5idWYsIHRoaXMucG9zICs9IDQpLCByZWFkRml4ZWQzMl9lbmQodGhpcy5idWYsIHRoaXMucG9zICs9IDQpKTtcbn1cblxuLyogZXNsaW50LWVuYWJsZSBuby1pbnZhbGlkLXRoaXMgKi9cblxuLyoqXG4gKiBSZWFkcyBmaXhlZCA2NCBiaXRzLlxuICogQG5hbWUgUmVhZGVyI2ZpeGVkNjRcbiAqIEBmdW5jdGlvblxuICogQHJldHVybnMge0xvbmd9IFZhbHVlIHJlYWRcbiAqL1xuXG4vKipcbiAqIFJlYWRzIHppZy16YWcgZW5jb2RlZCBmaXhlZCA2NCBiaXRzLlxuICogQG5hbWUgUmVhZGVyI3NmaXhlZDY0XG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtMb25nfSBWYWx1ZSByZWFkXG4gKi9cblxuLyoqXG4gKiBSZWFkcyBhIGZsb2F0ICgzMiBiaXQpIGFzIGEgbnVtYmVyLlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXG4gKi9cblJlYWRlci5wcm90b3R5cGUuZmxvYXQgPSBmdW5jdGlvbiByZWFkX2Zsb2F0KCkge1xuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKHRoaXMucG9zICsgNCA+IHRoaXMubGVuKVxuICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcywgNCk7XG5cbiAgICB2YXIgdmFsdWUgPSB1dGlsLmZsb2F0LnJlYWRGbG9hdExFKHRoaXMuYnVmLCB0aGlzLnBvcyk7XG4gICAgdGhpcy5wb3MgKz0gNDtcbiAgICByZXR1cm4gdmFsdWU7XG59O1xuXG4vKipcbiAqIFJlYWRzIGEgZG91YmxlICg2NCBiaXQgZmxvYXQpIGFzIGEgbnVtYmVyLlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXG4gKi9cblJlYWRlci5wcm90b3R5cGUuZG91YmxlID0gZnVuY3Rpb24gcmVhZF9kb3VibGUoKSB7XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAodGhpcy5wb3MgKyA4ID4gdGhpcy5sZW4pXG4gICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzLCA0KTtcblxuICAgIHZhciB2YWx1ZSA9IHV0aWwuZmxvYXQucmVhZERvdWJsZUxFKHRoaXMuYnVmLCB0aGlzLnBvcyk7XG4gICAgdGhpcy5wb3MgKz0gODtcbiAgICByZXR1cm4gdmFsdWU7XG59O1xuXG4vKipcbiAqIFJlYWRzIGEgc2VxdWVuY2Ugb2YgYnl0ZXMgcHJlY2VlZGVkIGJ5IGl0cyBsZW5ndGggYXMgYSB2YXJpbnQuXG4gKiBAcmV0dXJucyB7VWludDhBcnJheX0gVmFsdWUgcmVhZFxuICovXG5SZWFkZXIucHJvdG90eXBlLmJ5dGVzID0gZnVuY3Rpb24gcmVhZF9ieXRlcygpIHtcbiAgICB2YXIgbGVuZ3RoID0gdGhpcy51aW50MzIoKSxcbiAgICAgICAgc3RhcnQgID0gdGhpcy5wb3MsXG4gICAgICAgIGVuZCAgICA9IHRoaXMucG9zICsgbGVuZ3RoO1xuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKGVuZCA+IHRoaXMubGVuKVxuICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcywgbGVuZ3RoKTtcblxuICAgIHRoaXMucG9zICs9IGxlbmd0aDtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmJ1ZikpIC8vIHBsYWluIGFycmF5XG4gICAgICAgIHJldHVybiB0aGlzLmJ1Zi5zbGljZShzdGFydCwgZW5kKTtcbiAgICByZXR1cm4gc3RhcnQgPT09IGVuZCAvLyBmaXggZm9yIElFIDEwL1dpbjggYW5kIG90aGVycycgc3ViYXJyYXkgcmV0dXJuaW5nIGFycmF5IG9mIHNpemUgMVxuICAgICAgICA/IG5ldyB0aGlzLmJ1Zi5jb25zdHJ1Y3RvcigwKVxuICAgICAgICA6IHRoaXMuX3NsaWNlLmNhbGwodGhpcy5idWYsIHN0YXJ0LCBlbmQpO1xufTtcblxuLyoqXG4gKiBSZWFkcyBhIHN0cmluZyBwcmVjZWVkZWQgYnkgaXRzIGJ5dGUgbGVuZ3RoIGFzIGEgdmFyaW50LlxuICogQHJldHVybnMge3N0cmluZ30gVmFsdWUgcmVhZFxuICovXG5SZWFkZXIucHJvdG90eXBlLnN0cmluZyA9IGZ1bmN0aW9uIHJlYWRfc3RyaW5nKCkge1xuICAgIHZhciBieXRlcyA9IHRoaXMuYnl0ZXMoKTtcbiAgICByZXR1cm4gdXRmOC5yZWFkKGJ5dGVzLCAwLCBieXRlcy5sZW5ndGgpO1xufTtcblxuLyoqXG4gKiBTa2lwcyB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBieXRlcyBpZiBzcGVjaWZpZWQsIG90aGVyd2lzZSBza2lwcyBhIHZhcmludC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoXSBMZW5ndGggaWYga25vd24sIG90aGVyd2lzZSBhIHZhcmludCBpcyBhc3N1bWVkXG4gKiBAcmV0dXJucyB7UmVhZGVyfSBgdGhpc2BcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS5za2lwID0gZnVuY3Rpb24gc2tpcChsZW5ndGgpIHtcbiAgICBpZiAodHlwZW9mIGxlbmd0aCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKHRoaXMucG9zICsgbGVuZ3RoID4gdGhpcy5sZW4pXG4gICAgICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcywgbGVuZ3RoKTtcbiAgICAgICAgdGhpcy5wb3MgKz0gbGVuZ3RoO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICAgICAgaWYgKHRoaXMucG9zID49IHRoaXMubGVuKVxuICAgICAgICAgICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzKTtcbiAgICAgICAgfSB3aGlsZSAodGhpcy5idWZbdGhpcy5wb3MrK10gJiAxMjgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2tpcHMgdGhlIG5leHQgZWxlbWVudCBvZiB0aGUgc3BlY2lmaWVkIHdpcmUgdHlwZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSB3aXJlVHlwZSBXaXJlIHR5cGUgcmVjZWl2ZWRcbiAqIEByZXR1cm5zIHtSZWFkZXJ9IGB0aGlzYFxuICovXG5SZWFkZXIucHJvdG90eXBlLnNraXBUeXBlID0gZnVuY3Rpb24od2lyZVR5cGUpIHtcbiAgICBzd2l0Y2ggKHdpcmVUeXBlKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIHRoaXMuc2tpcCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIHRoaXMuc2tpcCg4KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICB0aGlzLnNraXAodGhpcy51aW50MzIoKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgd2hpbGUgKCh3aXJlVHlwZSA9IHRoaXMudWludDMyKCkgJiA3KSAhPT0gNCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2tpcFR5cGUod2lyZVR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgIHRoaXMuc2tpcCg0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcImludmFsaWQgd2lyZSB0eXBlIFwiICsgd2lyZVR5cGUgKyBcIiBhdCBvZmZzZXQgXCIgKyB0aGlzLnBvcyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblxuUmVhZGVyLl9jb25maWd1cmUgPSBmdW5jdGlvbihCdWZmZXJSZWFkZXJfKSB7XG4gICAgQnVmZmVyUmVhZGVyID0gQnVmZmVyUmVhZGVyXztcbiAgICBSZWFkZXIuY3JlYXRlID0gY3JlYXRlKCk7XG4gICAgQnVmZmVyUmVhZGVyLl9jb25maWd1cmUoKTtcblxuICAgIHZhciBmbiA9IHV0aWwuTG9uZyA/IFwidG9Mb25nXCIgOiAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyBcInRvTnVtYmVyXCI7XG4gICAgdXRpbC5tZXJnZShSZWFkZXIucHJvdG90eXBlLCB7XG5cbiAgICAgICAgaW50NjQ6IGZ1bmN0aW9uIHJlYWRfaW50NjQoKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVhZExvbmdWYXJpbnQuY2FsbCh0aGlzKVtmbl0oZmFsc2UpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHVpbnQ2NDogZnVuY3Rpb24gcmVhZF91aW50NjQoKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVhZExvbmdWYXJpbnQuY2FsbCh0aGlzKVtmbl0odHJ1ZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2ludDY0OiBmdW5jdGlvbiByZWFkX3NpbnQ2NCgpIHtcbiAgICAgICAgICAgIHJldHVybiByZWFkTG9uZ1ZhcmludC5jYWxsKHRoaXMpLnp6RGVjb2RlKClbZm5dKGZhbHNlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBmaXhlZDY0OiBmdW5jdGlvbiByZWFkX2ZpeGVkNjQoKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVhZEZpeGVkNjQuY2FsbCh0aGlzKVtmbl0odHJ1ZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2ZpeGVkNjQ6IGZ1bmN0aW9uIHJlYWRfc2ZpeGVkNjQoKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVhZEZpeGVkNjQuY2FsbCh0aGlzKVtmbl0oZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gQnVmZmVyUmVhZGVyO1xuXG4vLyBleHRlbmRzIFJlYWRlclxudmFyIFJlYWRlciA9IHJlcXVpcmUoXCIuL3JlYWRlclwiKTtcbihCdWZmZXJSZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShSZWFkZXIucHJvdG90eXBlKSkuY29uc3RydWN0b3IgPSBCdWZmZXJSZWFkZXI7XG5cbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbC9taW5pbWFsXCIpO1xuXG4vKipcbiAqIENvbnN0cnVjdHMgYSBuZXcgYnVmZmVyIHJlYWRlciBpbnN0YW5jZS5cbiAqIEBjbGFzc2Rlc2MgV2lyZSBmb3JtYXQgcmVhZGVyIHVzaW5nIG5vZGUgYnVmZmVycy5cbiAqIEBleHRlbmRzIFJlYWRlclxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0J1ZmZlcn0gYnVmZmVyIEJ1ZmZlciB0byByZWFkIGZyb21cbiAqL1xuZnVuY3Rpb24gQnVmZmVyUmVhZGVyKGJ1ZmZlcikge1xuICAgIFJlYWRlci5jYWxsKHRoaXMsIGJ1ZmZlcik7XG5cbiAgICAvKipcbiAgICAgKiBSZWFkIGJ1ZmZlci5cbiAgICAgKiBAbmFtZSBCdWZmZXJSZWFkZXIjYnVmXG4gICAgICogQHR5cGUge0J1ZmZlcn1cbiAgICAgKi9cbn1cblxuQnVmZmVyUmVhZGVyLl9jb25maWd1cmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICBpZiAodXRpbC5CdWZmZXIpXG4gICAgICAgIEJ1ZmZlclJlYWRlci5wcm90b3R5cGUuX3NsaWNlID0gdXRpbC5CdWZmZXIucHJvdG90eXBlLnNsaWNlO1xufTtcblxuXG4vKipcbiAqIEBvdmVycmlkZVxuICovXG5CdWZmZXJSZWFkZXIucHJvdG90eXBlLnN0cmluZyA9IGZ1bmN0aW9uIHJlYWRfc3RyaW5nX2J1ZmZlcigpIHtcbiAgICB2YXIgbGVuID0gdGhpcy51aW50MzIoKTsgLy8gbW9kaWZpZXMgcG9zXG4gICAgcmV0dXJuIHRoaXMuYnVmLnV0ZjhTbGljZVxuICAgICAgICA/IHRoaXMuYnVmLnV0ZjhTbGljZSh0aGlzLnBvcywgdGhpcy5wb3MgPSBNYXRoLm1pbih0aGlzLnBvcyArIGxlbiwgdGhpcy5sZW4pKVxuICAgICAgICA6IHRoaXMuYnVmLnRvU3RyaW5nKFwidXRmLThcIiwgdGhpcy5wb3MsIHRoaXMucG9zID0gTWF0aC5taW4odGhpcy5wb3MgKyBsZW4sIHRoaXMubGVuKSk7XG59O1xuXG4vKipcbiAqIFJlYWRzIGEgc2VxdWVuY2Ugb2YgYnl0ZXMgcHJlY2VlZGVkIGJ5IGl0cyBsZW5ndGggYXMgYSB2YXJpbnQuXG4gKiBAbmFtZSBCdWZmZXJSZWFkZXIjYnl0ZXNcbiAqIEBmdW5jdGlvblxuICogQHJldHVybnMge0J1ZmZlcn0gVmFsdWUgcmVhZFxuICovXG5cbkJ1ZmZlclJlYWRlci5fY29uZmlndXJlKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0ge307XG5cbi8qKlxuICogTmFtZWQgcm9vdHMuXG4gKiBUaGlzIGlzIHdoZXJlIHBianMgc3RvcmVzIGdlbmVyYXRlZCBzdHJ1Y3R1cmVzICh0aGUgb3B0aW9uIGAtciwgLS1yb290YCBzcGVjaWZpZXMgYSBuYW1lKS5cbiAqIENhbiBhbHNvIGJlIHVzZWQgbWFudWFsbHkgdG8gbWFrZSByb290cyBhdmFpbGFibGUgYWNjcm9zcyBtb2R1bGVzLlxuICogQG5hbWUgcm9vdHNcbiAqIEB0eXBlIHtPYmplY3QuPHN0cmluZyxSb290Pn1cbiAqIEBleGFtcGxlXG4gKiAvLyBwYmpzIC1yIG15cm9vdCAtbyBjb21waWxlZC5qcyAuLi5cbiAqXG4gKiAvLyBpbiBhbm90aGVyIG1vZHVsZTpcbiAqIHJlcXVpcmUoXCIuL2NvbXBpbGVkLmpzXCIpO1xuICpcbiAqIC8vIGluIGFueSBzdWJzZXF1ZW50IG1vZHVsZTpcbiAqIHZhciByb290ID0gcHJvdG9idWYucm9vdHNbXCJteXJvb3RcIl07XG4gKi9cbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIFN0cmVhbWluZyBSUEMgaGVscGVycy5cbiAqIEBuYW1lc3BhY2VcbiAqL1xudmFyIHJwYyA9IGV4cG9ydHM7XG5cbi8qKlxuICogUlBDIGltcGxlbWVudGF0aW9uIHBhc3NlZCB0byB7QGxpbmsgU2VydmljZSNjcmVhdGV9IHBlcmZvcm1pbmcgYSBzZXJ2aWNlIHJlcXVlc3Qgb24gbmV0d29yayBsZXZlbCwgaS5lLiBieSB1dGlsaXppbmcgaHR0cCByZXF1ZXN0cyBvciB3ZWJzb2NrZXRzLlxuICogQHR5cGVkZWYgUlBDSW1wbFxuICogQHR5cGUge2Z1bmN0aW9ufVxuICogQHBhcmFtIHtNZXRob2R8cnBjLlNlcnZpY2VNZXRob2Q8TWVzc2FnZTx7fT4sTWVzc2FnZTx7fT4+fSBtZXRob2QgUmVmbGVjdGVkIG9yIHN0YXRpYyBtZXRob2QgYmVpbmcgY2FsbGVkXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IHJlcXVlc3REYXRhIFJlcXVlc3QgZGF0YVxuICogQHBhcmFtIHtSUENJbXBsQ2FsbGJhY2t9IGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICogQGV4YW1wbGVcbiAqIGZ1bmN0aW9uIHJwY0ltcGwobWV0aG9kLCByZXF1ZXN0RGF0YSwgY2FsbGJhY2spIHtcbiAqICAgICBpZiAocHJvdG9idWYudXRpbC5sY0ZpcnN0KG1ldGhvZC5uYW1lKSAhPT0gXCJteU1ldGhvZFwiKSAvLyBjb21wYXRpYmxlIHdpdGggc3RhdGljIGNvZGVcbiAqICAgICAgICAgdGhyb3cgRXJyb3IoXCJubyBzdWNoIG1ldGhvZFwiKTtcbiAqICAgICBhc3luY2hyb25vdXNseU9idGFpbkFSZXNwb25zZShyZXF1ZXN0RGF0YSwgZnVuY3Rpb24oZXJyLCByZXNwb25zZURhdGEpIHtcbiAqICAgICAgICAgY2FsbGJhY2soZXJyLCByZXNwb25zZURhdGEpO1xuICogICAgIH0pO1xuICogfVxuICovXG5cbi8qKlxuICogTm9kZS1zdHlsZSBjYWxsYmFjayBhcyB1c2VkIGJ5IHtAbGluayBSUENJbXBsfS5cbiAqIEB0eXBlZGVmIFJQQ0ltcGxDYWxsYmFja1xuICogQHR5cGUge2Z1bmN0aW9ufVxuICogQHBhcmFtIHtFcnJvcnxudWxsfSBlcnJvciBFcnJvciwgaWYgYW55LCBvdGhlcndpc2UgYG51bGxgXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl8bnVsbH0gW3Jlc3BvbnNlXSBSZXNwb25zZSBkYXRhIG9yIGBudWxsYCB0byBzaWduYWwgZW5kIG9mIHN0cmVhbSwgaWYgdGhlcmUgaGFzbid0IGJlZW4gYW4gZXJyb3JcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gKi9cblxucnBjLlNlcnZpY2UgPSByZXF1aXJlKFwiLi9ycGMvc2VydmljZVwiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBTZXJ2aWNlO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuLi91dGlsL21pbmltYWxcIik7XG5cbi8vIEV4dGVuZHMgRXZlbnRFbWl0dGVyXG4oU2VydmljZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHV0aWwuRXZlbnRFbWl0dGVyLnByb3RvdHlwZSkpLmNvbnN0cnVjdG9yID0gU2VydmljZTtcblxuLyoqXG4gKiBBIHNlcnZpY2UgbWV0aG9kIGNhbGxiYWNrIGFzIHVzZWQgYnkge0BsaW5rIHJwYy5TZXJ2aWNlTWV0aG9kfFNlcnZpY2VNZXRob2R9LlxuICpcbiAqIERpZmZlcnMgZnJvbSB7QGxpbmsgUlBDSW1wbENhbGxiYWNrfSBpbiB0aGF0IGl0IGlzIGFuIGFjdHVhbCBjYWxsYmFjayBvZiBhIHNlcnZpY2UgbWV0aG9kIHdoaWNoIG1heSBub3QgcmV0dXJuIGByZXNwb25zZSA9IG51bGxgLlxuICogQHR5cGVkZWYgcnBjLlNlcnZpY2VNZXRob2RDYWxsYmFja1xuICogQHRlbXBsYXRlIFRSZXMgZXh0ZW5kcyBNZXNzYWdlPFRSZXM+XG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKiBAcGFyYW0ge0Vycm9yfG51bGx9IGVycm9yIEVycm9yLCBpZiBhbnlcbiAqIEBwYXJhbSB7VFJlc30gW3Jlc3BvbnNlXSBSZXNwb25zZSBtZXNzYWdlXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICovXG5cbi8qKlxuICogQSBzZXJ2aWNlIG1ldGhvZCBwYXJ0IG9mIGEge0BsaW5rIHJwYy5TZXJ2aWNlfSBhcyBjcmVhdGVkIGJ5IHtAbGluayBTZXJ2aWNlLmNyZWF0ZX0uXG4gKiBAdHlwZWRlZiBycGMuU2VydmljZU1ldGhvZFxuICogQHRlbXBsYXRlIFRSZXEgZXh0ZW5kcyBNZXNzYWdlPFRSZXE+XG4gKiBAdGVtcGxhdGUgVFJlcyBleHRlbmRzIE1lc3NhZ2U8VFJlcz5cbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqIEBwYXJhbSB7VFJlcXxQcm9wZXJ0aWVzPFRSZXE+fSByZXF1ZXN0IFJlcXVlc3QgbWVzc2FnZSBvciBwbGFpbiBvYmplY3RcbiAqIEBwYXJhbSB7cnBjLlNlcnZpY2VNZXRob2RDYWxsYmFjazxUUmVzPn0gW2NhbGxiYWNrXSBOb2RlLXN0eWxlIGNhbGxiYWNrIGNhbGxlZCB3aXRoIHRoZSBlcnJvciwgaWYgYW55LCBhbmQgdGhlIHJlc3BvbnNlIG1lc3NhZ2VcbiAqIEByZXR1cm5zIHtQcm9taXNlPE1lc3NhZ2U8VFJlcz4+fSBQcm9taXNlIGlmIGBjYWxsYmFja2AgaGFzIGJlZW4gb21pdHRlZCwgb3RoZXJ3aXNlIGB1bmRlZmluZWRgXG4gKi9cblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IFJQQyBzZXJ2aWNlIGluc3RhbmNlLlxuICogQGNsYXNzZGVzYyBBbiBSUEMgc2VydmljZSBhcyByZXR1cm5lZCBieSB7QGxpbmsgU2VydmljZSNjcmVhdGV9LlxuICogQGV4cG9ydHMgcnBjLlNlcnZpY2VcbiAqIEBleHRlbmRzIHV0aWwuRXZlbnRFbWl0dGVyXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7UlBDSW1wbH0gcnBjSW1wbCBSUEMgaW1wbGVtZW50YXRpb25cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3JlcXVlc3REZWxpbWl0ZWQ9ZmFsc2VdIFdoZXRoZXIgcmVxdWVzdHMgYXJlIGxlbmd0aC1kZWxpbWl0ZWRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3Jlc3BvbnNlRGVsaW1pdGVkPWZhbHNlXSBXaGV0aGVyIHJlc3BvbnNlcyBhcmUgbGVuZ3RoLWRlbGltaXRlZFxuICovXG5mdW5jdGlvbiBTZXJ2aWNlKHJwY0ltcGwsIHJlcXVlc3REZWxpbWl0ZWQsIHJlc3BvbnNlRGVsaW1pdGVkKSB7XG5cbiAgICBpZiAodHlwZW9mIHJwY0ltcGwgIT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwicnBjSW1wbCBtdXN0IGJlIGEgZnVuY3Rpb25cIik7XG5cbiAgICB1dGlsLkV2ZW50RW1pdHRlci5jYWxsKHRoaXMpO1xuXG4gICAgLyoqXG4gICAgICogUlBDIGltcGxlbWVudGF0aW9uLiBCZWNvbWVzIGBudWxsYCBvbmNlIHRoZSBzZXJ2aWNlIGlzIGVuZGVkLlxuICAgICAqIEB0eXBlIHtSUENJbXBsfG51bGx9XG4gICAgICovXG4gICAgdGhpcy5ycGNJbXBsID0gcnBjSW1wbDtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgcmVxdWVzdHMgYXJlIGxlbmd0aC1kZWxpbWl0ZWQuXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5yZXF1ZXN0RGVsaW1pdGVkID0gQm9vbGVhbihyZXF1ZXN0RGVsaW1pdGVkKTtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgcmVzcG9uc2VzIGFyZSBsZW5ndGgtZGVsaW1pdGVkLlxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMucmVzcG9uc2VEZWxpbWl0ZWQgPSBCb29sZWFuKHJlc3BvbnNlRGVsaW1pdGVkKTtcbn1cblxuLyoqXG4gKiBDYWxscyBhIHNlcnZpY2UgbWV0aG9kIHRocm91Z2gge0BsaW5rIHJwYy5TZXJ2aWNlI3JwY0ltcGx8cnBjSW1wbH0uXG4gKiBAcGFyYW0ge01ldGhvZHxycGMuU2VydmljZU1ldGhvZDxUUmVxLFRSZXM+fSBtZXRob2QgUmVmbGVjdGVkIG9yIHN0YXRpYyBtZXRob2RcbiAqIEBwYXJhbSB7Q29uc3RydWN0b3I8VFJlcT59IHJlcXVlc3RDdG9yIFJlcXVlc3QgY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7Q29uc3RydWN0b3I8VFJlcz59IHJlc3BvbnNlQ3RvciBSZXNwb25zZSBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtUUmVxfFByb3BlcnRpZXM8VFJlcT59IHJlcXVlc3QgUmVxdWVzdCBtZXNzYWdlIG9yIHBsYWluIG9iamVjdFxuICogQHBhcmFtIHtycGMuU2VydmljZU1ldGhvZENhbGxiYWNrPFRSZXM+fSBjYWxsYmFjayBTZXJ2aWNlIGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICogQHRlbXBsYXRlIFRSZXEgZXh0ZW5kcyBNZXNzYWdlPFRSZXE+XG4gKiBAdGVtcGxhdGUgVFJlcyBleHRlbmRzIE1lc3NhZ2U8VFJlcz5cbiAqL1xuU2VydmljZS5wcm90b3R5cGUucnBjQ2FsbCA9IGZ1bmN0aW9uIHJwY0NhbGwobWV0aG9kLCByZXF1ZXN0Q3RvciwgcmVzcG9uc2VDdG9yLCByZXF1ZXN0LCBjYWxsYmFjaykge1xuXG4gICAgaWYgKCFyZXF1ZXN0KVxuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJyZXF1ZXN0IG11c3QgYmUgc3BlY2lmaWVkXCIpO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGlmICghY2FsbGJhY2spXG4gICAgICAgIHJldHVybiB1dGlsLmFzUHJvbWlzZShycGNDYWxsLCBzZWxmLCBtZXRob2QsIHJlcXVlc3RDdG9yLCByZXNwb25zZUN0b3IsIHJlcXVlc3QpO1xuXG4gICAgaWYgKCFzZWxmLnJwY0ltcGwpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgY2FsbGJhY2soRXJyb3IoXCJhbHJlYWR5IGVuZGVkXCIpKTsgfSwgMCk7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIHNlbGYucnBjSW1wbChcbiAgICAgICAgICAgIG1ldGhvZCxcbiAgICAgICAgICAgIHJlcXVlc3RDdG9yW3NlbGYucmVxdWVzdERlbGltaXRlZCA/IFwiZW5jb2RlRGVsaW1pdGVkXCIgOiBcImVuY29kZVwiXShyZXF1ZXN0KS5maW5pc2goKSxcbiAgICAgICAgICAgIGZ1bmN0aW9uIHJwY0NhbGxiYWNrKGVyciwgcmVzcG9uc2UpIHtcblxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lbWl0KFwiZXJyb3JcIiwgZXJyLCBtZXRob2QpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lbmQoLyogZW5kZWRCeVJQQyAqLyB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIShyZXNwb25zZSBpbnN0YW5jZW9mIHJlc3BvbnNlQ3RvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gcmVzcG9uc2VDdG9yW3NlbGYucmVzcG9uc2VEZWxpbWl0ZWQgPyBcImRlY29kZURlbGltaXRlZFwiIDogXCJkZWNvZGVcIl0ocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZW1pdChcImVycm9yXCIsIGVyciwgbWV0aG9kKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2VsZi5lbWl0KFwiZGF0YVwiLCByZXNwb25zZSwgbWV0aG9kKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBzZWxmLmVtaXQoXCJlcnJvclwiLCBlcnIsIG1ldGhvZCk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IGNhbGxiYWNrKGVycik7IH0sIDApO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbn07XG5cbi8qKlxuICogRW5kcyB0aGlzIHNlcnZpY2UgYW5kIGVtaXRzIHRoZSBgZW5kYCBldmVudC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2VuZGVkQnlSUEM9ZmFsc2VdIFdoZXRoZXIgdGhlIHNlcnZpY2UgaGFzIGJlZW4gZW5kZWQgYnkgdGhlIFJQQyBpbXBsZW1lbnRhdGlvbi5cbiAqIEByZXR1cm5zIHtycGMuU2VydmljZX0gYHRoaXNgXG4gKi9cblNlcnZpY2UucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uIGVuZChlbmRlZEJ5UlBDKSB7XG4gICAgaWYgKHRoaXMucnBjSW1wbCkge1xuICAgICAgICBpZiAoIWVuZGVkQnlSUEMpIC8vIHNpZ25hbCBlbmQgdG8gcnBjSW1wbFxuICAgICAgICAgICAgdGhpcy5ycGNJbXBsKG51bGwsIG51bGwsIG51bGwpO1xuICAgICAgICB0aGlzLnJwY0ltcGwgPSBudWxsO1xuICAgICAgICB0aGlzLmVtaXQoXCJlbmRcIikub2ZmKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBMb25nQml0cztcblxudmFyIHV0aWwgPSByZXF1aXJlKFwiLi4vdXRpbC9taW5pbWFsXCIpO1xuXG4vKipcbiAqIENvbnN0cnVjdHMgbmV3IGxvbmcgYml0cy5cbiAqIEBjbGFzc2Rlc2MgSGVscGVyIGNsYXNzIGZvciB3b3JraW5nIHdpdGggdGhlIGxvdyBhbmQgaGlnaCBiaXRzIG9mIGEgNjQgYml0IHZhbHVlLlxuICogQG1lbWJlcm9mIHV0aWxcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtudW1iZXJ9IGxvIExvdyAzMiBiaXRzLCB1bnNpZ25lZFxuICogQHBhcmFtIHtudW1iZXJ9IGhpIEhpZ2ggMzIgYml0cywgdW5zaWduZWRcbiAqL1xuZnVuY3Rpb24gTG9uZ0JpdHMobG8sIGhpKSB7XG5cbiAgICAvLyBub3RlIHRoYXQgdGhlIGNhc3RzIGJlbG93IGFyZSB0aGVvcmV0aWNhbGx5IHVubmVjZXNzYXJ5IGFzIG9mIHRvZGF5LCBidXQgb2xkZXIgc3RhdGljYWxseVxuICAgIC8vIGdlbmVyYXRlZCBjb252ZXJ0ZXIgY29kZSBtaWdodCBzdGlsbCBjYWxsIHRoZSBjdG9yIHdpdGggc2lnbmVkIDMyYml0cy4ga2VwdCBmb3IgY29tcGF0LlxuXG4gICAgLyoqXG4gICAgICogTG93IGJpdHMuXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLmxvID0gbG8gPj4+IDA7XG5cbiAgICAvKipcbiAgICAgKiBIaWdoIGJpdHMuXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLmhpID0gaGkgPj4+IDA7XG59XG5cbi8qKlxuICogWmVybyBiaXRzLlxuICogQG1lbWJlcm9mIHV0aWwuTG9uZ0JpdHNcbiAqIEB0eXBlIHt1dGlsLkxvbmdCaXRzfVxuICovXG52YXIgemVybyA9IExvbmdCaXRzLnplcm8gPSBuZXcgTG9uZ0JpdHMoMCwgMCk7XG5cbnplcm8udG9OdW1iZXIgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG56ZXJvLnp6RW5jb2RlID0gemVyby56ekRlY29kZSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfTtcbnplcm8ubGVuZ3RoID0gZnVuY3Rpb24oKSB7IHJldHVybiAxOyB9O1xuXG4vKipcbiAqIFplcm8gaGFzaC5cbiAqIEBtZW1iZXJvZiB1dGlsLkxvbmdCaXRzXG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG52YXIgemVyb0hhc2ggPSBMb25nQml0cy56ZXJvSGFzaCA9IFwiXFwwXFwwXFwwXFwwXFwwXFwwXFwwXFwwXCI7XG5cbi8qKlxuICogQ29uc3RydWN0cyBuZXcgbG9uZyBiaXRzIGZyb20gdGhlIHNwZWNpZmllZCBudW1iZXIuXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWVcbiAqIEByZXR1cm5zIHt1dGlsLkxvbmdCaXRzfSBJbnN0YW5jZVxuICovXG5Mb25nQml0cy5mcm9tTnVtYmVyID0gZnVuY3Rpb24gZnJvbU51bWJlcih2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gMClcbiAgICAgICAgcmV0dXJuIHplcm87XG4gICAgdmFyIHNpZ24gPSB2YWx1ZSA8IDA7XG4gICAgaWYgKHNpZ24pXG4gICAgICAgIHZhbHVlID0gLXZhbHVlO1xuICAgIHZhciBsbyA9IHZhbHVlID4+PiAwLFxuICAgICAgICBoaSA9ICh2YWx1ZSAtIGxvKSAvIDQyOTQ5NjcyOTYgPj4+IDA7XG4gICAgaWYgKHNpZ24pIHtcbiAgICAgICAgaGkgPSB+aGkgPj4+IDA7XG4gICAgICAgIGxvID0gfmxvID4+PiAwO1xuICAgICAgICBpZiAoKytsbyA+IDQyOTQ5NjcyOTUpIHtcbiAgICAgICAgICAgIGxvID0gMDtcbiAgICAgICAgICAgIGlmICgrK2hpID4gNDI5NDk2NzI5NSlcbiAgICAgICAgICAgICAgICBoaSA9IDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ldyBMb25nQml0cyhsbywgaGkpO1xufTtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIG5ldyBsb25nIGJpdHMgZnJvbSBhIG51bWJlciwgbG9uZyBvciBzdHJpbmcuXG4gKiBAcGFyYW0ge0xvbmd8bnVtYmVyfHN0cmluZ30gdmFsdWUgVmFsdWVcbiAqIEByZXR1cm5zIHt1dGlsLkxvbmdCaXRzfSBJbnN0YW5jZVxuICovXG5Mb25nQml0cy5mcm9tID0gZnVuY3Rpb24gZnJvbSh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpXG4gICAgICAgIHJldHVybiBMb25nQml0cy5mcm9tTnVtYmVyKHZhbHVlKTtcbiAgICBpZiAodXRpbC5pc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgaWYgKHV0aWwuTG9uZylcbiAgICAgICAgICAgIHZhbHVlID0gdXRpbC5Mb25nLmZyb21TdHJpbmcodmFsdWUpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gTG9uZ0JpdHMuZnJvbU51bWJlcihwYXJzZUludCh2YWx1ZSwgMTApKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlLmxvdyB8fCB2YWx1ZS5oaWdoID8gbmV3IExvbmdCaXRzKHZhbHVlLmxvdyA+Pj4gMCwgdmFsdWUuaGlnaCA+Pj4gMCkgOiB6ZXJvO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyB0aGlzIGxvbmcgYml0cyB0byBhIHBvc3NpYmx5IHVuc2FmZSBKYXZhU2NyaXB0IG51bWJlci5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3Vuc2lnbmVkPWZhbHNlXSBXaGV0aGVyIHVuc2lnbmVkIG9yIG5vdFxuICogQHJldHVybnMge251bWJlcn0gUG9zc2libHkgdW5zYWZlIG51bWJlclxuICovXG5Mb25nQml0cy5wcm90b3R5cGUudG9OdW1iZXIgPSBmdW5jdGlvbiB0b051bWJlcih1bnNpZ25lZCkge1xuICAgIGlmICghdW5zaWduZWQgJiYgdGhpcy5oaSA+Pj4gMzEpIHtcbiAgICAgICAgdmFyIGxvID0gfnRoaXMubG8gKyAxID4+PiAwLFxuICAgICAgICAgICAgaGkgPSB+dGhpcy5oaSAgICAgPj4+IDA7XG4gICAgICAgIGlmICghbG8pXG4gICAgICAgICAgICBoaSA9IGhpICsgMSA+Pj4gMDtcbiAgICAgICAgcmV0dXJuIC0obG8gKyBoaSAqIDQyOTQ5NjcyOTYpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5sbyArIHRoaXMuaGkgKiA0Mjk0OTY3Mjk2O1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyB0aGlzIGxvbmcgYml0cyB0byBhIGxvbmcuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFt1bnNpZ25lZD1mYWxzZV0gV2hldGhlciB1bnNpZ25lZCBvciBub3RcbiAqIEByZXR1cm5zIHtMb25nfSBMb25nXG4gKi9cbkxvbmdCaXRzLnByb3RvdHlwZS50b0xvbmcgPSBmdW5jdGlvbiB0b0xvbmcodW5zaWduZWQpIHtcbiAgICByZXR1cm4gdXRpbC5Mb25nXG4gICAgICAgID8gbmV3IHV0aWwuTG9uZyh0aGlzLmxvIHwgMCwgdGhpcy5oaSB8IDAsIEJvb2xlYW4odW5zaWduZWQpKVxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICA6IHsgbG93OiB0aGlzLmxvIHwgMCwgaGlnaDogdGhpcy5oaSB8IDAsIHVuc2lnbmVkOiBCb29sZWFuKHVuc2lnbmVkKSB9O1xufTtcblxudmFyIGNoYXJDb2RlQXQgPSBTdHJpbmcucHJvdG90eXBlLmNoYXJDb2RlQXQ7XG5cbi8qKlxuICogQ29uc3RydWN0cyBuZXcgbG9uZyBiaXRzIGZyb20gdGhlIHNwZWNpZmllZCA4IGNoYXJhY3RlcnMgbG9uZyBoYXNoLlxuICogQHBhcmFtIHtzdHJpbmd9IGhhc2ggSGFzaFxuICogQHJldHVybnMge3V0aWwuTG9uZ0JpdHN9IEJpdHNcbiAqL1xuTG9uZ0JpdHMuZnJvbUhhc2ggPSBmdW5jdGlvbiBmcm9tSGFzaChoYXNoKSB7XG4gICAgaWYgKGhhc2ggPT09IHplcm9IYXNoKVxuICAgICAgICByZXR1cm4gemVybztcbiAgICByZXR1cm4gbmV3IExvbmdCaXRzKFxuICAgICAgICAoIGNoYXJDb2RlQXQuY2FsbChoYXNoLCAwKVxuICAgICAgICB8IGNoYXJDb2RlQXQuY2FsbChoYXNoLCAxKSA8PCA4XG4gICAgICAgIHwgY2hhckNvZGVBdC5jYWxsKGhhc2gsIDIpIDw8IDE2XG4gICAgICAgIHwgY2hhckNvZGVBdC5jYWxsKGhhc2gsIDMpIDw8IDI0KSA+Pj4gMFxuICAgICxcbiAgICAgICAgKCBjaGFyQ29kZUF0LmNhbGwoaGFzaCwgNClcbiAgICAgICAgfCBjaGFyQ29kZUF0LmNhbGwoaGFzaCwgNSkgPDwgOFxuICAgICAgICB8IGNoYXJDb2RlQXQuY2FsbChoYXNoLCA2KSA8PCAxNlxuICAgICAgICB8IGNoYXJDb2RlQXQuY2FsbChoYXNoLCA3KSA8PCAyNCkgPj4+IDBcbiAgICApO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyB0aGlzIGxvbmcgYml0cyB0byBhIDggY2hhcmFjdGVycyBsb25nIGhhc2guXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBIYXNoXG4gKi9cbkxvbmdCaXRzLnByb3RvdHlwZS50b0hhc2ggPSBmdW5jdGlvbiB0b0hhc2goKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoXG4gICAgICAgIHRoaXMubG8gICAgICAgICYgMjU1LFxuICAgICAgICB0aGlzLmxvID4+PiA4ICAmIDI1NSxcbiAgICAgICAgdGhpcy5sbyA+Pj4gMTYgJiAyNTUsXG4gICAgICAgIHRoaXMubG8gPj4+IDI0ICAgICAgLFxuICAgICAgICB0aGlzLmhpICAgICAgICAmIDI1NSxcbiAgICAgICAgdGhpcy5oaSA+Pj4gOCAgJiAyNTUsXG4gICAgICAgIHRoaXMuaGkgPj4+IDE2ICYgMjU1LFxuICAgICAgICB0aGlzLmhpID4+PiAyNFxuICAgICk7XG59O1xuXG4vKipcbiAqIFppZy16YWcgZW5jb2RlcyB0aGlzIGxvbmcgYml0cy5cbiAqIEByZXR1cm5zIHt1dGlsLkxvbmdCaXRzfSBgdGhpc2BcbiAqL1xuTG9uZ0JpdHMucHJvdG90eXBlLnp6RW5jb2RlID0gZnVuY3Rpb24genpFbmNvZGUoKSB7XG4gICAgdmFyIG1hc2sgPSAgIHRoaXMuaGkgPj4gMzE7XG4gICAgdGhpcy5oaSAgPSAoKHRoaXMuaGkgPDwgMSB8IHRoaXMubG8gPj4+IDMxKSBeIG1hc2spID4+PiAwO1xuICAgIHRoaXMubG8gID0gKCB0aGlzLmxvIDw8IDEgICAgICAgICAgICAgICAgICAgXiBtYXNrKSA+Pj4gMDtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogWmlnLXphZyBkZWNvZGVzIHRoaXMgbG9uZyBiaXRzLlxuICogQHJldHVybnMge3V0aWwuTG9uZ0JpdHN9IGB0aGlzYFxuICovXG5Mb25nQml0cy5wcm90b3R5cGUuenpEZWNvZGUgPSBmdW5jdGlvbiB6ekRlY29kZSgpIHtcbiAgICB2YXIgbWFzayA9IC0odGhpcy5sbyAmIDEpO1xuICAgIHRoaXMubG8gID0gKCh0aGlzLmxvID4+PiAxIHwgdGhpcy5oaSA8PCAzMSkgXiBtYXNrKSA+Pj4gMDtcbiAgICB0aGlzLmhpICA9ICggdGhpcy5oaSA+Pj4gMSAgICAgICAgICAgICAgICAgIF4gbWFzaykgPj4+IDA7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGxlbmd0aCBvZiB0aGlzIGxvbmdiaXRzIHdoZW4gZW5jb2RlZCBhcyBhIHZhcmludC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IExlbmd0aFxuICovXG5Mb25nQml0cy5wcm90b3R5cGUubGVuZ3RoID0gZnVuY3Rpb24gbGVuZ3RoKCkge1xuICAgIHZhciBwYXJ0MCA9ICB0aGlzLmxvLFxuICAgICAgICBwYXJ0MSA9ICh0aGlzLmxvID4+PiAyOCB8IHRoaXMuaGkgPDwgNCkgPj4+IDAsXG4gICAgICAgIHBhcnQyID0gIHRoaXMuaGkgPj4+IDI0O1xuICAgIHJldHVybiBwYXJ0MiA9PT0gMFxuICAgICAgICAgPyBwYXJ0MSA9PT0gMFxuICAgICAgICAgICA/IHBhcnQwIDwgMTYzODRcbiAgICAgICAgICAgICA/IHBhcnQwIDwgMTI4ID8gMSA6IDJcbiAgICAgICAgICAgICA6IHBhcnQwIDwgMjA5NzE1MiA/IDMgOiA0XG4gICAgICAgICAgIDogcGFydDEgPCAxNjM4NFxuICAgICAgICAgICAgID8gcGFydDEgPCAxMjggPyA1IDogNlxuICAgICAgICAgICAgIDogcGFydDEgPCAyMDk3MTUyID8gNyA6IDhcbiAgICAgICAgIDogcGFydDIgPCAxMjggPyA5IDogMTA7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgdXRpbCA9IGV4cG9ydHM7XG5cbi8vIHVzZWQgdG8gcmV0dXJuIGEgUHJvbWlzZSB3aGVyZSBjYWxsYmFjayBpcyBvbWl0dGVkXG51dGlsLmFzUHJvbWlzZSA9IHJlcXVpcmUoXCJAcHJvdG9idWZqcy9hc3Byb21pc2VcIik7XG5cbi8vIGNvbnZlcnRzIHRvIC8gZnJvbSBiYXNlNjQgZW5jb2RlZCBzdHJpbmdzXG51dGlsLmJhc2U2NCA9IHJlcXVpcmUoXCJAcHJvdG9idWZqcy9iYXNlNjRcIik7XG5cbi8vIGJhc2UgY2xhc3Mgb2YgcnBjLlNlcnZpY2VcbnV0aWwuRXZlbnRFbWl0dGVyID0gcmVxdWlyZShcIkBwcm90b2J1ZmpzL2V2ZW50ZW1pdHRlclwiKTtcblxuLy8gZmxvYXQgaGFuZGxpbmcgYWNjcm9zcyBicm93c2Vyc1xudXRpbC5mbG9hdCA9IHJlcXVpcmUoXCJAcHJvdG9idWZqcy9mbG9hdFwiKTtcblxuLy8gcmVxdWlyZXMgbW9kdWxlcyBvcHRpb25hbGx5IGFuZCBoaWRlcyB0aGUgY2FsbCBmcm9tIGJ1bmRsZXJzXG51dGlsLmlucXVpcmUgPSByZXF1aXJlKFwiQHByb3RvYnVmanMvaW5xdWlyZVwiKTtcblxuLy8gY29udmVydHMgdG8gLyBmcm9tIHV0ZjggZW5jb2RlZCBzdHJpbmdzXG51dGlsLnV0ZjggPSByZXF1aXJlKFwiQHByb3RvYnVmanMvdXRmOFwiKTtcblxuLy8gcHJvdmlkZXMgYSBub2RlLWxpa2UgYnVmZmVyIHBvb2wgaW4gdGhlIGJyb3dzZXJcbnV0aWwucG9vbCA9IHJlcXVpcmUoXCJAcHJvdG9idWZqcy9wb29sXCIpO1xuXG4vLyB1dGlsaXR5IHRvIHdvcmsgd2l0aCB0aGUgbG93IGFuZCBoaWdoIGJpdHMgb2YgYSA2NCBiaXQgdmFsdWVcbnV0aWwuTG9uZ0JpdHMgPSByZXF1aXJlKFwiLi9sb25nYml0c1wiKTtcblxuLyoqXG4gKiBXaGV0aGVyIHJ1bm5pbmcgd2l0aGluIG5vZGUgb3Igbm90LlxuICogQG1lbWJlcm9mIHV0aWxcbiAqIEB0eXBlIHtib29sZWFufVxuICovXG51dGlsLmlzTm9kZSA9IEJvb2xlYW4odHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIlxuICAgICAgICAgICAgICAgICAgICYmIGdsb2JhbFxuICAgICAgICAgICAgICAgICAgICYmIGdsb2JhbC5wcm9jZXNzXG4gICAgICAgICAgICAgICAgICAgJiYgZ2xvYmFsLnByb2Nlc3MudmVyc2lvbnNcbiAgICAgICAgICAgICAgICAgICAmJiBnbG9iYWwucHJvY2Vzcy52ZXJzaW9ucy5ub2RlKTtcblxuLyoqXG4gKiBHbG9iYWwgb2JqZWN0IHJlZmVyZW5jZS5cbiAqIEBtZW1iZXJvZiB1dGlsXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG51dGlsLmdsb2JhbCA9IHV0aWwuaXNOb2RlICYmIGdsb2JhbFxuICAgICAgICAgICB8fCB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvd1xuICAgICAgICAgICB8fCB0eXBlb2Ygc2VsZiAgICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGZcbiAgICAgICAgICAgfHwgdGhpczsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1pbnZhbGlkLXRoaXNcblxuLyoqXG4gKiBBbiBpbW11YWJsZSBlbXB0eSBhcnJheS5cbiAqIEBtZW1iZXJvZiB1dGlsXG4gKiBAdHlwZSB7QXJyYXkuPCo+fVxuICogQGNvbnN0XG4gKi9cbnV0aWwuZW1wdHlBcnJheSA9IE9iamVjdC5mcmVlemUgPyBPYmplY3QuZnJlZXplKFtdKSA6IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIFtdOyAvLyB1c2VkIG9uIHByb3RvdHlwZXNcblxuLyoqXG4gKiBBbiBpbW11dGFibGUgZW1wdHkgb2JqZWN0LlxuICogQHR5cGUge09iamVjdH1cbiAqIEBjb25zdFxuICovXG51dGlsLmVtcHR5T2JqZWN0ID0gT2JqZWN0LmZyZWV6ZSA/IE9iamVjdC5mcmVlemUoe30pIDogLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8ge307IC8vIHVzZWQgb24gcHJvdG90eXBlc1xuXG4vKipcbiAqIFRlc3RzIGlmIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHsqfSB2YWx1ZSBWYWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHRoZSB2YWx1ZSBpcyBhbiBpbnRlZ2VyXG4gKi9cbnV0aWwuaXNJbnRlZ2VyID0gTnVtYmVyLmlzSW50ZWdlciB8fCAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyBmdW5jdGlvbiBpc0ludGVnZXIodmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiICYmIGlzRmluaXRlKHZhbHVlKSAmJiBNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWU7XG59O1xuXG4vKipcbiAqIFRlc3RzIGlmIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nXG4gKi9cbnV0aWwuaXNTdHJpbmcgPSBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgfHwgdmFsdWUgaW5zdGFuY2VvZiBTdHJpbmc7XG59O1xuXG4vKipcbiAqIFRlc3RzIGlmIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgYSBub24tbnVsbCBvYmplY3QuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgdGhlIHZhbHVlIGlzIGEgbm9uLW51bGwgb2JqZWN0XG4gKi9cbnV0aWwuaXNPYmplY3QgPSBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCI7XG59O1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIHByb3BlcnR5IG9uIGEgbWVzc2FnZSBpcyBjb25zaWRlcmVkIHRvIGJlIHByZXNlbnQuXG4gKiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayB1dGlsLmlzU2V0fS5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBQbGFpbiBvYmplY3Qgb3IgbWVzc2FnZSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IHByb3AgUHJvcGVydHkgbmFtZVxuICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiBjb25zaWRlcmVkIHRvIGJlIHByZXNlbnQsIG90aGVyd2lzZSBgZmFsc2VgXG4gKi9cbnV0aWwuaXNzZXQgPVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIHByb3BlcnR5IG9uIGEgbWVzc2FnZSBpcyBjb25zaWRlcmVkIHRvIGJlIHByZXNlbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFBsYWluIG9iamVjdCBvciBtZXNzYWdlIGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcCBQcm9wZXJ0eSBuYW1lXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIGNvbnNpZGVyZWQgdG8gYmUgcHJlc2VudCwgb3RoZXJ3aXNlIGBmYWxzZWBcbiAqL1xudXRpbC5pc1NldCA9IGZ1bmN0aW9uIGlzU2V0KG9iaiwgcHJvcCkge1xuICAgIHZhciB2YWx1ZSA9IG9ialtwcm9wXTtcbiAgICBpZiAodmFsdWUgIT0gbnVsbCAmJiBvYmouaGFzT3duUHJvcGVydHkocHJvcCkpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZXFlcWVxLCBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiB8fCAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5sZW5ndGggOiBPYmplY3Qua2V5cyh2YWx1ZSkubGVuZ3RoKSA+IDA7XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBBbnkgY29tcGF0aWJsZSBCdWZmZXIgaW5zdGFuY2UuXG4gKiBUaGlzIGlzIGEgbWluaW1hbCBzdGFuZC1hbG9uZSBkZWZpbml0aW9uIG9mIGEgQnVmZmVyIGluc3RhbmNlLiBUaGUgYWN0dWFsIHR5cGUgaXMgdGhhdCBleHBvcnRlZCBieSBub2RlJ3MgdHlwaW5ncy5cbiAqIEBpbnRlcmZhY2UgQnVmZmVyXG4gKiBAZXh0ZW5kcyBVaW50OEFycmF5XG4gKi9cblxuLyoqXG4gKiBOb2RlJ3MgQnVmZmVyIGNsYXNzIGlmIGF2YWlsYWJsZS5cbiAqIEB0eXBlIHtDb25zdHJ1Y3RvcjxCdWZmZXI+fVxuICovXG51dGlsLkJ1ZmZlciA9IChmdW5jdGlvbigpIHtcbiAgICB0cnkge1xuICAgICAgICB2YXIgQnVmZmVyID0gdXRpbC5pbnF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcjtcbiAgICAgICAgLy8gcmVmdXNlIHRvIHVzZSBub24tbm9kZSBidWZmZXJzIGlmIG5vdCBleHBsaWNpdGx5IGFzc2lnbmVkIChwZXJmIHJlYXNvbnMpOlxuICAgICAgICByZXR1cm4gQnVmZmVyLnByb3RvdHlwZS51dGY4V3JpdGUgPyBCdWZmZXIgOiAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyBudWxsO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufSkoKTtcblxuLy8gSW50ZXJuYWwgYWxpYXMgb2Ygb3IgcG9seWZ1bGwgZm9yIEJ1ZmZlci5mcm9tLlxudXRpbC5fQnVmZmVyX2Zyb20gPSBudWxsO1xuXG4vLyBJbnRlcm5hbCBhbGlhcyBvZiBvciBwb2x5ZmlsbCBmb3IgQnVmZmVyLmFsbG9jVW5zYWZlLlxudXRpbC5fQnVmZmVyX2FsbG9jVW5zYWZlID0gbnVsbDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGJ1ZmZlciBvZiB3aGF0ZXZlciB0eXBlIHN1cHBvcnRlZCBieSB0aGUgZW52aXJvbm1lbnQuXG4gKiBAcGFyYW0ge251bWJlcnxudW1iZXJbXX0gW3NpemVPckFycmF5PTBdIEJ1ZmZlciBzaXplIG9yIG51bWJlciBhcnJheVxuICogQHJldHVybnMge1VpbnQ4QXJyYXl8QnVmZmVyfSBCdWZmZXJcbiAqL1xudXRpbC5uZXdCdWZmZXIgPSBmdW5jdGlvbiBuZXdCdWZmZXIoc2l6ZU9yQXJyYXkpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIHJldHVybiB0eXBlb2Ygc2l6ZU9yQXJyYXkgPT09IFwibnVtYmVyXCJcbiAgICAgICAgPyB1dGlsLkJ1ZmZlclxuICAgICAgICAgICAgPyB1dGlsLl9CdWZmZXJfYWxsb2NVbnNhZmUoc2l6ZU9yQXJyYXkpXG4gICAgICAgICAgICA6IG5ldyB1dGlsLkFycmF5KHNpemVPckFycmF5KVxuICAgICAgICA6IHV0aWwuQnVmZmVyXG4gICAgICAgICAgICA/IHV0aWwuX0J1ZmZlcl9mcm9tKHNpemVPckFycmF5KVxuICAgICAgICAgICAgOiB0eXBlb2YgVWludDhBcnJheSA9PT0gXCJ1bmRlZmluZWRcIlxuICAgICAgICAgICAgICAgID8gc2l6ZU9yQXJyYXlcbiAgICAgICAgICAgICAgICA6IG5ldyBVaW50OEFycmF5KHNpemVPckFycmF5KTtcbn07XG5cbi8qKlxuICogQXJyYXkgaW1wbGVtZW50YXRpb24gdXNlZCBpbiB0aGUgYnJvd3Nlci4gYFVpbnQ4QXJyYXlgIGlmIHN1cHBvcnRlZCwgb3RoZXJ3aXNlIGBBcnJheWAuXG4gKiBAdHlwZSB7Q29uc3RydWN0b3I8VWludDhBcnJheT59XG4gKi9cbnV0aWwuQXJyYXkgPSB0eXBlb2YgVWludDhBcnJheSAhPT0gXCJ1bmRlZmluZWRcIiA/IFVpbnQ4QXJyYXkgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gOiBBcnJheTtcblxuLyoqXG4gKiBBbnkgY29tcGF0aWJsZSBMb25nIGluc3RhbmNlLlxuICogVGhpcyBpcyBhIG1pbmltYWwgc3RhbmQtYWxvbmUgZGVmaW5pdGlvbiBvZiBhIExvbmcgaW5zdGFuY2UuIFRoZSBhY3R1YWwgdHlwZSBpcyB0aGF0IGV4cG9ydGVkIGJ5IGxvbmcuanMuXG4gKiBAaW50ZXJmYWNlIExvbmdcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBsb3cgTG93IGJpdHNcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBoaWdoIEhpZ2ggYml0c1xuICogQHByb3BlcnR5IHtib29sZWFufSB1bnNpZ25lZCBXaGV0aGVyIHVuc2lnbmVkIG9yIG5vdFxuICovXG5cbi8qKlxuICogTG9uZy5qcydzIExvbmcgY2xhc3MgaWYgYXZhaWxhYmxlLlxuICogQHR5cGUge0NvbnN0cnVjdG9yPExvbmc+fVxuICovXG51dGlsLkxvbmcgPSAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyB1dGlsLmdsb2JhbC5kY29kZUlPICYmIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIHV0aWwuZ2xvYmFsLmRjb2RlSU8uTG9uZ1xuICAgICAgICAgfHwgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gdXRpbC5nbG9iYWwuTG9uZ1xuICAgICAgICAgfHwgdXRpbC5pbnF1aXJlKFwibG9uZ1wiKTtcblxuLyoqXG4gKiBSZWd1bGFyIGV4cHJlc3Npb24gdXNlZCB0byB2ZXJpZnkgMiBiaXQgKGBib29sYCkgbWFwIGtleXMuXG4gKiBAdHlwZSB7UmVnRXhwfVxuICogQGNvbnN0XG4gKi9cbnV0aWwua2V5MlJlID0gL150cnVlfGZhbHNlfDB8MSQvO1xuXG4vKipcbiAqIFJlZ3VsYXIgZXhwcmVzc2lvbiB1c2VkIHRvIHZlcmlmeSAzMiBiaXQgKGBpbnQzMmAgZXRjLikgbWFwIGtleXMuXG4gKiBAdHlwZSB7UmVnRXhwfVxuICogQGNvbnN0XG4gKi9cbnV0aWwua2V5MzJSZSA9IC9eLT8oPzowfFsxLTldWzAtOV0qKSQvO1xuXG4vKipcbiAqIFJlZ3VsYXIgZXhwcmVzc2lvbiB1c2VkIHRvIHZlcmlmeSA2NCBiaXQgKGBpbnQ2NGAgZXRjLikgbWFwIGtleXMuXG4gKiBAdHlwZSB7UmVnRXhwfVxuICogQGNvbnN0XG4gKi9cbnV0aWwua2V5NjRSZSA9IC9eKD86W1xcXFx4MDAtXFxcXHhmZl17OH18LT8oPzowfFsxLTldWzAtOV0qKSkkLztcblxuLyoqXG4gKiBDb252ZXJ0cyBhIG51bWJlciBvciBsb25nIHRvIGFuIDggY2hhcmFjdGVycyBsb25nIGhhc2ggc3RyaW5nLlxuICogQHBhcmFtIHtMb25nfG51bWJlcn0gdmFsdWUgVmFsdWUgdG8gY29udmVydFxuICogQHJldHVybnMge3N0cmluZ30gSGFzaFxuICovXG51dGlsLmxvbmdUb0hhc2ggPSBmdW5jdGlvbiBsb25nVG9IYXNoKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlXG4gICAgICAgID8gdXRpbC5Mb25nQml0cy5mcm9tKHZhbHVlKS50b0hhc2goKVxuICAgICAgICA6IHV0aWwuTG9uZ0JpdHMuemVyb0hhc2g7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIGFuIDggY2hhcmFjdGVycyBsb25nIGhhc2ggc3RyaW5nIHRvIGEgbG9uZyBvciBudW1iZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gaGFzaCBIYXNoXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFt1bnNpZ25lZD1mYWxzZV0gV2hldGhlciB1bnNpZ25lZCBvciBub3RcbiAqIEByZXR1cm5zIHtMb25nfG51bWJlcn0gT3JpZ2luYWwgdmFsdWVcbiAqL1xudXRpbC5sb25nRnJvbUhhc2ggPSBmdW5jdGlvbiBsb25nRnJvbUhhc2goaGFzaCwgdW5zaWduZWQpIHtcbiAgICB2YXIgYml0cyA9IHV0aWwuTG9uZ0JpdHMuZnJvbUhhc2goaGFzaCk7XG4gICAgaWYgKHV0aWwuTG9uZylcbiAgICAgICAgcmV0dXJuIHV0aWwuTG9uZy5mcm9tQml0cyhiaXRzLmxvLCBiaXRzLmhpLCB1bnNpZ25lZCk7XG4gICAgcmV0dXJuIGJpdHMudG9OdW1iZXIoQm9vbGVhbih1bnNpZ25lZCkpO1xufTtcblxuLyoqXG4gKiBNZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgdGhlIHNvdXJjZSBvYmplY3QgaW50byB0aGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQG1lbWJlcm9mIHV0aWxcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IGRzdCBEZXN0aW5hdGlvbiBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IHNyYyBTb3VyY2Ugb2JqZWN0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpZk5vdFNldD1mYWxzZV0gTWVyZ2VzIG9ubHkgaWYgdGhlIGtleSBpcyBub3QgYWxyZWFkeSBzZXRcbiAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gRGVzdGluYXRpb24gb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIG1lcmdlKGRzdCwgc3JjLCBpZk5vdFNldCkgeyAvLyB1c2VkIGJ5IGNvbnZlcnRlcnNcbiAgICBmb3IgKHZhciBrZXlzID0gT2JqZWN0LmtleXMoc3JjKSwgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKVxuICAgICAgICBpZiAoZHN0W2tleXNbaV1dID09PSB1bmRlZmluZWQgfHwgIWlmTm90U2V0KVxuICAgICAgICAgICAgZHN0W2tleXNbaV1dID0gc3JjW2tleXNbaV1dO1xuICAgIHJldHVybiBkc3Q7XG59XG5cbnV0aWwubWVyZ2UgPSBtZXJnZTtcblxuLyoqXG4gKiBDb252ZXJ0cyB0aGUgZmlyc3QgY2hhcmFjdGVyIG9mIGEgc3RyaW5nIHRvIGxvd2VyIGNhc2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIFN0cmluZyB0byBjb252ZXJ0XG4gKiBAcmV0dXJucyB7c3RyaW5nfSBDb252ZXJ0ZWQgc3RyaW5nXG4gKi9cbnV0aWwubGNGaXJzdCA9IGZ1bmN0aW9uIGxjRmlyc3Qoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIHN0ci5zdWJzdHJpbmcoMSk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBjdXN0b20gZXJyb3IgY29uc3RydWN0b3IuXG4gKiBAbWVtYmVyb2YgdXRpbFxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgRXJyb3IgbmFtZVxuICogQHJldHVybnMge0NvbnN0cnVjdG9yPEVycm9yPn0gQ3VzdG9tIGVycm9yIGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIG5ld0Vycm9yKG5hbWUpIHtcblxuICAgIGZ1bmN0aW9uIEN1c3RvbUVycm9yKG1lc3NhZ2UsIHByb3BlcnRpZXMpIHtcblxuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgQ3VzdG9tRXJyb3IpKVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBDdXN0b21FcnJvcihtZXNzYWdlLCBwcm9wZXJ0aWVzKTtcblxuICAgICAgICAvLyBFcnJvci5jYWxsKHRoaXMsIG1lc3NhZ2UpO1xuICAgICAgICAvLyBeIGp1c3QgcmV0dXJucyBhIG5ldyBlcnJvciBpbnN0YW5jZSBiZWNhdXNlIHRoZSBjdG9yIGNhbiBiZSBjYWxsZWQgYXMgYSBmdW5jdGlvblxuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcIm1lc3NhZ2VcIiwgeyBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbWVzc2FnZTsgfSB9KTtcblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIC8vIG5vZGVcbiAgICAgICAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIEN1c3RvbUVycm9yKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwic3RhY2tcIiwgeyB2YWx1ZTogbmV3IEVycm9yKCkuc3RhY2sgfHwgXCJcIiB9KTtcblxuICAgICAgICBpZiAocHJvcGVydGllcylcbiAgICAgICAgICAgIG1lcmdlKHRoaXMsIHByb3BlcnRpZXMpO1xuICAgIH1cblxuICAgIChDdXN0b21FcnJvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSkpLmNvbnN0cnVjdG9yID0gQ3VzdG9tRXJyb3I7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ3VzdG9tRXJyb3IucHJvdG90eXBlLCBcIm5hbWVcIiwgeyBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbmFtZTsgfSB9KTtcblxuICAgIEN1c3RvbUVycm9yLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lICsgXCI6IFwiICsgdGhpcy5tZXNzYWdlO1xuICAgIH07XG5cbiAgICByZXR1cm4gQ3VzdG9tRXJyb3I7XG59XG5cbnV0aWwubmV3RXJyb3IgPSBuZXdFcnJvcjtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IHByb3RvY29sIGVycm9yLlxuICogQGNsYXNzZGVzYyBFcnJvciBzdWJjbGFzcyBpbmRpY2F0aW5nIGEgcHJvdG9jb2wgc3BlY2lmYyBlcnJvci5cbiAqIEBtZW1iZXJvZiB1dGlsXG4gKiBAZXh0ZW5kcyBFcnJvclxuICogQHRlbXBsYXRlIFQgZXh0ZW5kcyBNZXNzYWdlPFQ+XG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIEVycm9yIG1lc3NhZ2VcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IFtwcm9wZXJ0aWVzXSBBZGRpdGlvbmFsIHByb3BlcnRpZXNcbiAqIEBleGFtcGxlXG4gKiB0cnkge1xuICogICAgIE15TWVzc2FnZS5kZWNvZGUoc29tZUJ1ZmZlcik7IC8vIHRocm93cyBpZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcbiAqIH0gY2F0Y2ggKGUpIHtcbiAqICAgICBpZiAoZSBpbnN0YW5jZW9mIFByb3RvY29sRXJyb3IgJiYgZS5pbnN0YW5jZSlcbiAqICAgICAgICAgY29uc29sZS5sb2coXCJkZWNvZGVkIHNvIGZhcjogXCIgKyBKU09OLnN0cmluZ2lmeShlLmluc3RhbmNlKSk7XG4gKiB9XG4gKi9cbnV0aWwuUHJvdG9jb2xFcnJvciA9IG5ld0Vycm9yKFwiUHJvdG9jb2xFcnJvclwiKTtcblxuLyoqXG4gKiBTbyBmYXIgZGVjb2RlZCBtZXNzYWdlIGluc3RhbmNlLlxuICogQG5hbWUgdXRpbC5Qcm90b2NvbEVycm9yI2luc3RhbmNlXG4gKiBAdHlwZSB7TWVzc2FnZTxUPn1cbiAqL1xuXG4vKipcbiAqIEEgT25lT2YgZ2V0dGVyIGFzIHJldHVybmVkIGJ5IHtAbGluayB1dGlsLm9uZU9mR2V0dGVyfS5cbiAqIEB0eXBlZGVmIE9uZU9mR2V0dGVyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKiBAcmV0dXJucyB7c3RyaW5nfHVuZGVmaW5lZH0gU2V0IGZpZWxkIG5hbWUsIGlmIGFueVxuICovXG5cbi8qKlxuICogQnVpbGRzIGEgZ2V0dGVyIGZvciBhIG9uZW9mJ3MgcHJlc2VudCBmaWVsZCBuYW1lLlxuICogQHBhcmFtIHtzdHJpbmdbXX0gZmllbGROYW1lcyBGaWVsZCBuYW1lc1xuICogQHJldHVybnMge09uZU9mR2V0dGVyfSBVbmJvdW5kIGdldHRlclxuICovXG51dGlsLm9uZU9mR2V0dGVyID0gZnVuY3Rpb24gZ2V0T25lT2YoZmllbGROYW1lcykge1xuICAgIHZhciBmaWVsZE1hcCA9IHt9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmllbGROYW1lcy5sZW5ndGg7ICsraSlcbiAgICAgICAgZmllbGRNYXBbZmllbGROYW1lc1tpXV0gPSAxO1xuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3N0cmluZ3x1bmRlZmluZWR9IFNldCBmaWVsZCBuYW1lLCBpZiBhbnlcbiAgICAgKiBAdGhpcyBPYmplY3RcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gICAgICAgIGZvciAodmFyIGtleXMgPSBPYmplY3Qua2V5cyh0aGlzKSwgaSA9IGtleXMubGVuZ3RoIC0gMTsgaSA+IC0xOyAtLWkpXG4gICAgICAgICAgICBpZiAoZmllbGRNYXBba2V5c1tpXV0gPT09IDEgJiYgdGhpc1trZXlzW2ldXSAhPT0gdW5kZWZpbmVkICYmIHRoaXNba2V5c1tpXV0gIT09IG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleXNbaV07XG4gICAgfTtcbn07XG5cbi8qKlxuICogQSBPbmVPZiBzZXR0ZXIgYXMgcmV0dXJuZWQgYnkge0BsaW5rIHV0aWwub25lT2ZTZXR0ZXJ9LlxuICogQHR5cGVkZWYgT25lT2ZTZXR0ZXJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqIEBwYXJhbSB7c3RyaW5nfHVuZGVmaW5lZH0gdmFsdWUgRmllbGQgbmFtZVxuICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAqL1xuXG4vKipcbiAqIEJ1aWxkcyBhIHNldHRlciBmb3IgYSBvbmVvZidzIHByZXNlbnQgZmllbGQgbmFtZS5cbiAqIEBwYXJhbSB7c3RyaW5nW119IGZpZWxkTmFtZXMgRmllbGQgbmFtZXNcbiAqIEByZXR1cm5zIHtPbmVPZlNldHRlcn0gVW5ib3VuZCBzZXR0ZXJcbiAqL1xudXRpbC5vbmVPZlNldHRlciA9IGZ1bmN0aW9uIHNldE9uZU9mKGZpZWxkTmFtZXMpIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIEZpZWxkIG5hbWVcbiAgICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICAgICAqIEB0aGlzIE9iamVjdFxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICByZXR1cm4gZnVuY3Rpb24obmFtZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpZWxkTmFtZXMubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICBpZiAoZmllbGROYW1lc1tpXSAhPT0gbmFtZSlcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpc1tmaWVsZE5hbWVzW2ldXTtcbiAgICB9O1xufTtcblxuLyoqXG4gKiBEZWZhdWx0IGNvbnZlcnNpb24gb3B0aW9ucyB1c2VkIGZvciB7QGxpbmsgTWVzc2FnZSN0b0pTT059IGltcGxlbWVudGF0aW9ucy5cbiAqXG4gKiBUaGVzZSBvcHRpb25zIGFyZSBjbG9zZSB0byBwcm90bzMncyBKU09OIG1hcHBpbmcgd2l0aCB0aGUgZXhjZXB0aW9uIHRoYXQgaW50ZXJuYWwgdHlwZXMgbGlrZSBBbnkgYXJlIGhhbmRsZWQganVzdCBsaWtlIG1lc3NhZ2VzLiBNb3JlIHByZWNpc2VseTpcbiAqXG4gKiAtIExvbmdzIGJlY29tZSBzdHJpbmdzXG4gKiAtIEVudW1zIGJlY29tZSBzdHJpbmcga2V5c1xuICogLSBCeXRlcyBiZWNvbWUgYmFzZTY0IGVuY29kZWQgc3RyaW5nc1xuICogLSAoU3ViLSlNZXNzYWdlcyBiZWNvbWUgcGxhaW4gb2JqZWN0c1xuICogLSBNYXBzIGJlY29tZSBwbGFpbiBvYmplY3RzIHdpdGggYWxsIHN0cmluZyBrZXlzXG4gKiAtIFJlcGVhdGVkIGZpZWxkcyBiZWNvbWUgYXJyYXlzXG4gKiAtIE5hTiBhbmQgSW5maW5pdHkgZm9yIGZsb2F0IGFuZCBkb3VibGUgZmllbGRzIGJlY29tZSBzdHJpbmdzXG4gKlxuICogQHR5cGUge0lDb252ZXJzaW9uT3B0aW9uc31cbiAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vcHJvdG9jb2wtYnVmZmVycy9kb2NzL3Byb3RvMz9obD1lbiNqc29uXG4gKi9cbnV0aWwudG9KU09OT3B0aW9ucyA9IHtcbiAgICBsb25nczogU3RyaW5nLFxuICAgIGVudW1zOiBTdHJpbmcsXG4gICAgYnl0ZXM6IFN0cmluZyxcbiAgICBqc29uOiB0cnVlXG59O1xuXG4vLyBTZXRzIHVwIGJ1ZmZlciB1dGlsaXR5IGFjY29yZGluZyB0byB0aGUgZW52aXJvbm1lbnQgKGNhbGxlZCBpbiBpbmRleC1taW5pbWFsKVxudXRpbC5fY29uZmlndXJlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIEJ1ZmZlciA9IHV0aWwuQnVmZmVyO1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICghQnVmZmVyKSB7XG4gICAgICAgIHV0aWwuX0J1ZmZlcl9mcm9tID0gdXRpbC5fQnVmZmVyX2FsbG9jVW5zYWZlID0gbnVsbDtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBiZWNhdXNlIG5vZGUgNC54IGJ1ZmZlcnMgYXJlIGluY29tcGF0aWJsZSAmIGltbXV0YWJsZVxuICAgIC8vIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL2Rjb2RlSU8vcHJvdG9idWYuanMvcHVsbC82NjVcbiAgICB1dGlsLl9CdWZmZXJfZnJvbSA9IEJ1ZmZlci5mcm9tICE9PSBVaW50OEFycmF5LmZyb20gJiYgQnVmZmVyLmZyb20gfHxcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgZnVuY3Rpb24gQnVmZmVyX2Zyb20odmFsdWUsIGVuY29kaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEJ1ZmZlcih2YWx1ZSwgZW5jb2RpbmcpO1xuICAgICAgICB9O1xuICAgIHV0aWwuX0J1ZmZlcl9hbGxvY1Vuc2FmZSA9IEJ1ZmZlci5hbGxvY1Vuc2FmZSB8fFxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBmdW5jdGlvbiBCdWZmZXJfYWxsb2NVbnNhZmUoc2l6ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBCdWZmZXIoc2l6ZSk7XG4gICAgICAgIH07XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IFdyaXRlcjtcblxudmFyIHV0aWwgICAgICA9IHJlcXVpcmUoXCIuL3V0aWwvbWluaW1hbFwiKTtcblxudmFyIEJ1ZmZlcldyaXRlcjsgLy8gY3ljbGljXG5cbnZhciBMb25nQml0cyAgPSB1dGlsLkxvbmdCaXRzLFxuICAgIGJhc2U2NCAgICA9IHV0aWwuYmFzZTY0LFxuICAgIHV0ZjggICAgICA9IHV0aWwudXRmODtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IHdyaXRlciBvcGVyYXRpb24gaW5zdGFuY2UuXG4gKiBAY2xhc3NkZXNjIFNjaGVkdWxlZCB3cml0ZXIgb3BlcmF0aW9uLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCosIFVpbnQ4QXJyYXksIG51bWJlcil9IGZuIEZ1bmN0aW9uIHRvIGNhbGxcbiAqIEBwYXJhbSB7bnVtYmVyfSBsZW4gVmFsdWUgYnl0ZSBsZW5ndGhcbiAqIEBwYXJhbSB7Kn0gdmFsIFZhbHVlIHRvIHdyaXRlXG4gKiBAaWdub3JlXG4gKi9cbmZ1bmN0aW9uIE9wKGZuLCBsZW4sIHZhbCkge1xuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gY2FsbC5cbiAgICAgKiBAdHlwZSB7ZnVuY3Rpb24oVWludDhBcnJheSwgbnVtYmVyLCAqKX1cbiAgICAgKi9cbiAgICB0aGlzLmZuID0gZm47XG5cbiAgICAvKipcbiAgICAgKiBWYWx1ZSBieXRlIGxlbmd0aC5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMubGVuID0gbGVuO1xuXG4gICAgLyoqXG4gICAgICogTmV4dCBvcGVyYXRpb24uXG4gICAgICogQHR5cGUge1dyaXRlci5PcHx1bmRlZmluZWR9XG4gICAgICovXG4gICAgdGhpcy5uZXh0ID0gdW5kZWZpbmVkO1xuXG4gICAgLyoqXG4gICAgICogVmFsdWUgdG8gd3JpdGUuXG4gICAgICogQHR5cGUgeyp9XG4gICAgICovXG4gICAgdGhpcy52YWwgPSB2YWw7IC8vIHR5cGUgdmFyaWVzXG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5mdW5jdGlvbiBub29wKCkge30gLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1lbXB0eS1mdW5jdGlvblxuXG4vKipcbiAqIENvbnN0cnVjdHMgYSBuZXcgd3JpdGVyIHN0YXRlIGluc3RhbmNlLlxuICogQGNsYXNzZGVzYyBDb3BpZWQgd3JpdGVyIHN0YXRlLlxuICogQG1lbWJlcm9mIFdyaXRlclxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge1dyaXRlcn0gd3JpdGVyIFdyaXRlciB0byBjb3B5IHN0YXRlIGZyb21cbiAqIEBpZ25vcmVcbiAqL1xuZnVuY3Rpb24gU3RhdGUod3JpdGVyKSB7XG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IGhlYWQuXG4gICAgICogQHR5cGUge1dyaXRlci5PcH1cbiAgICAgKi9cbiAgICB0aGlzLmhlYWQgPSB3cml0ZXIuaGVhZDtcblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgdGFpbC5cbiAgICAgKiBAdHlwZSB7V3JpdGVyLk9wfVxuICAgICAqL1xuICAgIHRoaXMudGFpbCA9IHdyaXRlci50YWlsO1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBidWZmZXIgbGVuZ3RoLlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5sZW4gPSB3cml0ZXIubGVuO1xuXG4gICAgLyoqXG4gICAgICogTmV4dCBzdGF0ZS5cbiAgICAgKiBAdHlwZSB7U3RhdGV8bnVsbH1cbiAgICAgKi9cbiAgICB0aGlzLm5leHQgPSB3cml0ZXIuc3RhdGVzO1xufVxuXG4vKipcbiAqIENvbnN0cnVjdHMgYSBuZXcgd3JpdGVyIGluc3RhbmNlLlxuICogQGNsYXNzZGVzYyBXaXJlIGZvcm1hdCB3cml0ZXIgdXNpbmcgYFVpbnQ4QXJyYXlgIGlmIGF2YWlsYWJsZSwgb3RoZXJ3aXNlIGBBcnJheWAuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gV3JpdGVyKCkge1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBsZW5ndGguXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLmxlbiA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBPcGVyYXRpb25zIGhlYWQuXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICB0aGlzLmhlYWQgPSBuZXcgT3Aobm9vcCwgMCwgMCk7XG5cbiAgICAvKipcbiAgICAgKiBPcGVyYXRpb25zIHRhaWxcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIHRoaXMudGFpbCA9IHRoaXMuaGVhZDtcblxuICAgIC8qKlxuICAgICAqIExpbmtlZCBmb3JrZWQgc3RhdGVzLlxuICAgICAqIEB0eXBlIHtPYmplY3R8bnVsbH1cbiAgICAgKi9cbiAgICB0aGlzLnN0YXRlcyA9IG51bGw7XG5cbiAgICAvLyBXaGVuIGEgdmFsdWUgaXMgd3JpdHRlbiwgdGhlIHdyaXRlciBjYWxjdWxhdGVzIGl0cyBieXRlIGxlbmd0aCBhbmQgcHV0cyBpdCBpbnRvIGEgbGlua2VkXG4gICAgLy8gbGlzdCBvZiBvcGVyYXRpb25zIHRvIHBlcmZvcm0gd2hlbiBmaW5pc2goKSBpcyBjYWxsZWQuIFRoaXMgYm90aCBhbGxvd3MgdXMgdG8gYWxsb2NhdGVcbiAgICAvLyBidWZmZXJzIG9mIHRoZSBleGFjdCByZXF1aXJlZCBzaXplIGFuZCByZWR1Y2VzIHRoZSBhbW91bnQgb2Ygd29yayB3ZSBoYXZlIHRvIGRvIGNvbXBhcmVkXG4gICAgLy8gdG8gZmlyc3QgY2FsY3VsYXRpbmcgb3ZlciBvYmplY3RzIGFuZCB0aGVuIGVuY29kaW5nIG92ZXIgb2JqZWN0cy4gSW4gb3VyIGNhc2UsIHRoZSBlbmNvZGluZ1xuICAgIC8vIHBhcnQgaXMganVzdCBhIGxpbmtlZCBsaXN0IHdhbGsgY2FsbGluZyBvcGVyYXRpb25zIHdpdGggYWxyZWFkeSBwcmVwYXJlZCB2YWx1ZXMuXG59XG5cbnZhciBjcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgcmV0dXJuIHV0aWwuQnVmZmVyXG4gICAgICAgID8gZnVuY3Rpb24gY3JlYXRlX2J1ZmZlcl9zZXR1cCgpIHtcbiAgICAgICAgICAgIHJldHVybiAoV3JpdGVyLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZV9idWZmZXIoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCdWZmZXJXcml0ZXIoKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgOiBmdW5jdGlvbiBjcmVhdGVfYXJyYXkoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFdyaXRlcigpO1xuICAgICAgICB9O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHdyaXRlci5cbiAqIEBmdW5jdGlvblxuICogQHJldHVybnMge0J1ZmZlcldyaXRlcnxXcml0ZXJ9IEEge0BsaW5rIEJ1ZmZlcldyaXRlcn0gd2hlbiBCdWZmZXJzIGFyZSBzdXBwb3J0ZWQsIG90aGVyd2lzZSBhIHtAbGluayBXcml0ZXJ9XG4gKi9cbldyaXRlci5jcmVhdGUgPSBjcmVhdGUoKTtcblxuLyoqXG4gKiBBbGxvY2F0ZXMgYSBidWZmZXIgb2YgdGhlIHNwZWNpZmllZCBzaXplLlxuICogQHBhcmFtIHtudW1iZXJ9IHNpemUgQnVmZmVyIHNpemVcbiAqIEByZXR1cm5zIHtVaW50OEFycmF5fSBCdWZmZXJcbiAqL1xuV3JpdGVyLmFsbG9jID0gZnVuY3Rpb24gYWxsb2Moc2l6ZSkge1xuICAgIHJldHVybiBuZXcgdXRpbC5BcnJheShzaXplKTtcbn07XG5cbi8vIFVzZSBVaW50OEFycmF5IGJ1ZmZlciBwb29sIGluIHRoZSBicm93c2VyLCBqdXN0IGxpa2Ugbm9kZSBkb2VzIHdpdGggYnVmZmVyc1xuLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbmlmICh1dGlsLkFycmF5ICE9PSBBcnJheSlcbiAgICBXcml0ZXIuYWxsb2MgPSB1dGlsLnBvb2woV3JpdGVyLmFsbG9jLCB1dGlsLkFycmF5LnByb3RvdHlwZS5zdWJhcnJheSk7XG5cbi8qKlxuICogUHVzaGVzIGEgbmV3IG9wZXJhdGlvbiB0byB0aGUgcXVldWUuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKFVpbnQ4QXJyYXksIG51bWJlciwgKil9IGZuIEZ1bmN0aW9uIHRvIGNhbGxcbiAqIEBwYXJhbSB7bnVtYmVyfSBsZW4gVmFsdWUgYnl0ZSBsZW5ndGhcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWwgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICogQHByaXZhdGVcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5fcHVzaCA9IGZ1bmN0aW9uIHB1c2goZm4sIGxlbiwgdmFsKSB7XG4gICAgdGhpcy50YWlsID0gdGhpcy50YWlsLm5leHQgPSBuZXcgT3AoZm4sIGxlbiwgdmFsKTtcbiAgICB0aGlzLmxlbiArPSBsZW47XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiB3cml0ZUJ5dGUodmFsLCBidWYsIHBvcykge1xuICAgIGJ1Zltwb3NdID0gdmFsICYgMjU1O1xufVxuXG5mdW5jdGlvbiB3cml0ZVZhcmludDMyKHZhbCwgYnVmLCBwb3MpIHtcbiAgICB3aGlsZSAodmFsID4gMTI3KSB7XG4gICAgICAgIGJ1Zltwb3MrK10gPSB2YWwgJiAxMjcgfCAxMjg7XG4gICAgICAgIHZhbCA+Pj49IDc7XG4gICAgfVxuICAgIGJ1Zltwb3NdID0gdmFsO1xufVxuXG4vKipcbiAqIENvbnN0cnVjdHMgYSBuZXcgdmFyaW50IHdyaXRlciBvcGVyYXRpb24gaW5zdGFuY2UuXG4gKiBAY2xhc3NkZXNjIFNjaGVkdWxlZCB2YXJpbnQgd3JpdGVyIG9wZXJhdGlvbi5cbiAqIEBleHRlbmRzIE9wXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBsZW4gVmFsdWUgYnl0ZSBsZW5ndGhcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWwgVmFsdWUgdG8gd3JpdGVcbiAqIEBpZ25vcmVcbiAqL1xuZnVuY3Rpb24gVmFyaW50T3AobGVuLCB2YWwpIHtcbiAgICB0aGlzLmxlbiA9IGxlbjtcbiAgICB0aGlzLm5leHQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy52YWwgPSB2YWw7XG59XG5cblZhcmludE9wLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoT3AucHJvdG90eXBlKTtcblZhcmludE9wLnByb3RvdHlwZS5mbiA9IHdyaXRlVmFyaW50MzI7XG5cbi8qKlxuICogV3JpdGVzIGFuIHVuc2lnbmVkIDMyIGJpdCB2YWx1ZSBhcyBhIHZhcmludC5cbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUudWludDMyID0gZnVuY3Rpb24gd3JpdGVfdWludDMyKHZhbHVlKSB7XG4gICAgLy8gaGVyZSwgdGhlIGNhbGwgdG8gdGhpcy5wdXNoIGhhcyBiZWVuIGlubGluZWQgYW5kIGEgdmFyaW50IHNwZWNpZmljIE9wIHN1YmNsYXNzIGlzIHVzZWQuXG4gICAgLy8gdWludDMyIGlzIGJ5IGZhciB0aGUgbW9zdCBmcmVxdWVudGx5IHVzZWQgb3BlcmF0aW9uIGFuZCBiZW5lZml0cyBzaWduaWZpY2FudGx5IGZyb20gdGhpcy5cbiAgICB0aGlzLmxlbiArPSAodGhpcy50YWlsID0gdGhpcy50YWlsLm5leHQgPSBuZXcgVmFyaW50T3AoXG4gICAgICAgICh2YWx1ZSA9IHZhbHVlID4+PiAwKVxuICAgICAgICAgICAgICAgIDwgMTI4ICAgICAgID8gMVxuICAgICAgICA6IHZhbHVlIDwgMTYzODQgICAgID8gMlxuICAgICAgICA6IHZhbHVlIDwgMjA5NzE1MiAgID8gM1xuICAgICAgICA6IHZhbHVlIDwgMjY4NDM1NDU2ID8gNFxuICAgICAgICA6ICAgICAgICAgICAgICAgICAgICAgNSxcbiAgICB2YWx1ZSkpLmxlbjtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogV3JpdGVzIGEgc2lnbmVkIDMyIGJpdCB2YWx1ZSBhcyBhIHZhcmludC5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5pbnQzMiA9IGZ1bmN0aW9uIHdyaXRlX2ludDMyKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlIDwgMFxuICAgICAgICA/IHRoaXMuX3B1c2god3JpdGVWYXJpbnQ2NCwgMTAsIExvbmdCaXRzLmZyb21OdW1iZXIodmFsdWUpKSAvLyAxMCBieXRlcyBwZXIgc3BlY1xuICAgICAgICA6IHRoaXMudWludDMyKHZhbHVlKTtcbn07XG5cbi8qKlxuICogV3JpdGVzIGEgMzIgYml0IHZhbHVlIGFzIGEgdmFyaW50LCB6aWctemFnIGVuY29kZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLnNpbnQzMiA9IGZ1bmN0aW9uIHdyaXRlX3NpbnQzMih2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzLnVpbnQzMigodmFsdWUgPDwgMSBeIHZhbHVlID4+IDMxKSA+Pj4gMCk7XG59O1xuXG5mdW5jdGlvbiB3cml0ZVZhcmludDY0KHZhbCwgYnVmLCBwb3MpIHtcbiAgICB3aGlsZSAodmFsLmhpKSB7XG4gICAgICAgIGJ1Zltwb3MrK10gPSB2YWwubG8gJiAxMjcgfCAxMjg7XG4gICAgICAgIHZhbC5sbyA9ICh2YWwubG8gPj4+IDcgfCB2YWwuaGkgPDwgMjUpID4+PiAwO1xuICAgICAgICB2YWwuaGkgPj4+PSA3O1xuICAgIH1cbiAgICB3aGlsZSAodmFsLmxvID4gMTI3KSB7XG4gICAgICAgIGJ1Zltwb3MrK10gPSB2YWwubG8gJiAxMjcgfCAxMjg7XG4gICAgICAgIHZhbC5sbyA9IHZhbC5sbyA+Pj4gNztcbiAgICB9XG4gICAgYnVmW3BvcysrXSA9IHZhbC5sbztcbn1cblxuLyoqXG4gKiBXcml0ZXMgYW4gdW5zaWduZWQgNjQgYml0IHZhbHVlIGFzIGEgdmFyaW50LlxuICogQHBhcmFtIHtMb25nfG51bWJlcnxzdHJpbmd9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgYHZhbHVlYCBpcyBhIHN0cmluZyBhbmQgbm8gbG9uZyBsaWJyYXJ5IGlzIHByZXNlbnQuXG4gKi9cbldyaXRlci5wcm90b3R5cGUudWludDY0ID0gZnVuY3Rpb24gd3JpdGVfdWludDY0KHZhbHVlKSB7XG4gICAgdmFyIGJpdHMgPSBMb25nQml0cy5mcm9tKHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcy5fcHVzaCh3cml0ZVZhcmludDY0LCBiaXRzLmxlbmd0aCgpLCBiaXRzKTtcbn07XG5cbi8qKlxuICogV3JpdGVzIGEgc2lnbmVkIDY0IGJpdCB2YWx1ZSBhcyBhIHZhcmludC5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtMb25nfG51bWJlcnxzdHJpbmd9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgYHZhbHVlYCBpcyBhIHN0cmluZyBhbmQgbm8gbG9uZyBsaWJyYXJ5IGlzIHByZXNlbnQuXG4gKi9cbldyaXRlci5wcm90b3R5cGUuaW50NjQgPSBXcml0ZXIucHJvdG90eXBlLnVpbnQ2NDtcblxuLyoqXG4gKiBXcml0ZXMgYSBzaWduZWQgNjQgYml0IHZhbHVlIGFzIGEgdmFyaW50LCB6aWctemFnIGVuY29kZWQuXG4gKiBAcGFyYW0ge0xvbmd8bnVtYmVyfHN0cmluZ30gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBgdmFsdWVgIGlzIGEgc3RyaW5nIGFuZCBubyBsb25nIGxpYnJhcnkgaXMgcHJlc2VudC5cbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5zaW50NjQgPSBmdW5jdGlvbiB3cml0ZV9zaW50NjQodmFsdWUpIHtcbiAgICB2YXIgYml0cyA9IExvbmdCaXRzLmZyb20odmFsdWUpLnp6RW5jb2RlKCk7XG4gICAgcmV0dXJuIHRoaXMuX3B1c2god3JpdGVWYXJpbnQ2NCwgYml0cy5sZW5ndGgoKSwgYml0cyk7XG59O1xuXG4vKipcbiAqIFdyaXRlcyBhIGJvb2xpc2ggdmFsdWUgYXMgYSB2YXJpbnQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5ib29sID0gZnVuY3Rpb24gd3JpdGVfYm9vbCh2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzLl9wdXNoKHdyaXRlQnl0ZSwgMSwgdmFsdWUgPyAxIDogMCk7XG59O1xuXG5mdW5jdGlvbiB3cml0ZUZpeGVkMzIodmFsLCBidWYsIHBvcykge1xuICAgIGJ1Zltwb3MgICAgXSA9ICB2YWwgICAgICAgICAmIDI1NTtcbiAgICBidWZbcG9zICsgMV0gPSAgdmFsID4+PiA4ICAgJiAyNTU7XG4gICAgYnVmW3BvcyArIDJdID0gIHZhbCA+Pj4gMTYgICYgMjU1O1xuICAgIGJ1Zltwb3MgKyAzXSA9ICB2YWwgPj4+IDI0O1xufVxuXG4vKipcbiAqIFdyaXRlcyBhbiB1bnNpZ25lZCAzMiBiaXQgdmFsdWUgYXMgZml4ZWQgMzIgYml0cy5cbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUuZml4ZWQzMiA9IGZ1bmN0aW9uIHdyaXRlX2ZpeGVkMzIodmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5fcHVzaCh3cml0ZUZpeGVkMzIsIDQsIHZhbHVlID4+PiAwKTtcbn07XG5cbi8qKlxuICogV3JpdGVzIGEgc2lnbmVkIDMyIGJpdCB2YWx1ZSBhcyBmaXhlZCAzMiBiaXRzLlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLnNmaXhlZDMyID0gV3JpdGVyLnByb3RvdHlwZS5maXhlZDMyO1xuXG4vKipcbiAqIFdyaXRlcyBhbiB1bnNpZ25lZCA2NCBiaXQgdmFsdWUgYXMgZml4ZWQgNjQgYml0cy5cbiAqIEBwYXJhbSB7TG9uZ3xudW1iZXJ8c3RyaW5nfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGB2YWx1ZWAgaXMgYSBzdHJpbmcgYW5kIG5vIGxvbmcgbGlicmFyeSBpcyBwcmVzZW50LlxuICovXG5Xcml0ZXIucHJvdG90eXBlLmZpeGVkNjQgPSBmdW5jdGlvbiB3cml0ZV9maXhlZDY0KHZhbHVlKSB7XG4gICAgdmFyIGJpdHMgPSBMb25nQml0cy5mcm9tKHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcy5fcHVzaCh3cml0ZUZpeGVkMzIsIDQsIGJpdHMubG8pLl9wdXNoKHdyaXRlRml4ZWQzMiwgNCwgYml0cy5oaSk7XG59O1xuXG4vKipcbiAqIFdyaXRlcyBhIHNpZ25lZCA2NCBiaXQgdmFsdWUgYXMgZml4ZWQgNjQgYml0cy5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtMb25nfG51bWJlcnxzdHJpbmd9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgYHZhbHVlYCBpcyBhIHN0cmluZyBhbmQgbm8gbG9uZyBsaWJyYXJ5IGlzIHByZXNlbnQuXG4gKi9cbldyaXRlci5wcm90b3R5cGUuc2ZpeGVkNjQgPSBXcml0ZXIucHJvdG90eXBlLmZpeGVkNjQ7XG5cbi8qKlxuICogV3JpdGVzIGEgZmxvYXQgKDMyIGJpdCkuXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUuZmxvYXQgPSBmdW5jdGlvbiB3cml0ZV9mbG9hdCh2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzLl9wdXNoKHV0aWwuZmxvYXQud3JpdGVGbG9hdExFLCA0LCB2YWx1ZSk7XG59O1xuXG4vKipcbiAqIFdyaXRlcyBhIGRvdWJsZSAoNjQgYml0IGZsb2F0KS5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5kb3VibGUgPSBmdW5jdGlvbiB3cml0ZV9kb3VibGUodmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5fcHVzaCh1dGlsLmZsb2F0LndyaXRlRG91YmxlTEUsIDgsIHZhbHVlKTtcbn07XG5cbnZhciB3cml0ZUJ5dGVzID0gdXRpbC5BcnJheS5wcm90b3R5cGUuc2V0XG4gICAgPyBmdW5jdGlvbiB3cml0ZUJ5dGVzX3NldCh2YWwsIGJ1ZiwgcG9zKSB7XG4gICAgICAgIGJ1Zi5zZXQodmFsLCBwb3MpOyAvLyBhbHNvIHdvcmtzIGZvciBwbGFpbiBhcnJheSB2YWx1ZXNcbiAgICB9XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICA6IGZ1bmN0aW9uIHdyaXRlQnl0ZXNfZm9yKHZhbCwgYnVmLCBwb3MpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWwubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICBidWZbcG9zICsgaV0gPSB2YWxbaV07XG4gICAgfTtcblxuLyoqXG4gKiBXcml0ZXMgYSBzZXF1ZW5jZSBvZiBieXRlcy5cbiAqIEBwYXJhbSB7VWludDhBcnJheXxzdHJpbmd9IHZhbHVlIEJ1ZmZlciBvciBiYXNlNjQgZW5jb2RlZCBzdHJpbmcgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLmJ5dGVzID0gZnVuY3Rpb24gd3JpdGVfYnl0ZXModmFsdWUpIHtcbiAgICB2YXIgbGVuID0gdmFsdWUubGVuZ3RoID4+PiAwO1xuICAgIGlmICghbGVuKVxuICAgICAgICByZXR1cm4gdGhpcy5fcHVzaCh3cml0ZUJ5dGUsIDEsIDApO1xuICAgIGlmICh1dGlsLmlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICB2YXIgYnVmID0gV3JpdGVyLmFsbG9jKGxlbiA9IGJhc2U2NC5sZW5ndGgodmFsdWUpKTtcbiAgICAgICAgYmFzZTY0LmRlY29kZSh2YWx1ZSwgYnVmLCAwKTtcbiAgICAgICAgdmFsdWUgPSBidWY7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnVpbnQzMihsZW4pLl9wdXNoKHdyaXRlQnl0ZXMsIGxlbiwgdmFsdWUpO1xufTtcblxuLyoqXG4gKiBXcml0ZXMgYSBzdHJpbmcuXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLnN0cmluZyA9IGZ1bmN0aW9uIHdyaXRlX3N0cmluZyh2YWx1ZSkge1xuICAgIHZhciBsZW4gPSB1dGY4Lmxlbmd0aCh2YWx1ZSk7XG4gICAgcmV0dXJuIGxlblxuICAgICAgICA/IHRoaXMudWludDMyKGxlbikuX3B1c2godXRmOC53cml0ZSwgbGVuLCB2YWx1ZSlcbiAgICAgICAgOiB0aGlzLl9wdXNoKHdyaXRlQnl0ZSwgMSwgMCk7XG59O1xuXG4vKipcbiAqIEZvcmtzIHRoaXMgd3JpdGVyJ3Mgc3RhdGUgYnkgcHVzaGluZyBpdCB0byBhIHN0YWNrLlxuICogQ2FsbGluZyB7QGxpbmsgV3JpdGVyI3Jlc2V0fHJlc2V0fSBvciB7QGxpbmsgV3JpdGVyI2xkZWxpbXxsZGVsaW19IHJlc2V0cyB0aGUgd3JpdGVyIHRvIHRoZSBwcmV2aW91cyBzdGF0ZS5cbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLmZvcmsgPSBmdW5jdGlvbiBmb3JrKCkge1xuICAgIHRoaXMuc3RhdGVzID0gbmV3IFN0YXRlKHRoaXMpO1xuICAgIHRoaXMuaGVhZCA9IHRoaXMudGFpbCA9IG5ldyBPcChub29wLCAwLCAwKTtcbiAgICB0aGlzLmxlbiA9IDA7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlc2V0cyB0aGlzIGluc3RhbmNlIHRvIHRoZSBsYXN0IHN0YXRlLlxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiByZXNldCgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZXMpIHtcbiAgICAgICAgdGhpcy5oZWFkICAgPSB0aGlzLnN0YXRlcy5oZWFkO1xuICAgICAgICB0aGlzLnRhaWwgICA9IHRoaXMuc3RhdGVzLnRhaWw7XG4gICAgICAgIHRoaXMubGVuICAgID0gdGhpcy5zdGF0ZXMubGVuO1xuICAgICAgICB0aGlzLnN0YXRlcyA9IHRoaXMuc3RhdGVzLm5leHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5oZWFkID0gdGhpcy50YWlsID0gbmV3IE9wKG5vb3AsIDAsIDApO1xuICAgICAgICB0aGlzLmxlbiAgPSAwO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVzZXRzIHRvIHRoZSBsYXN0IHN0YXRlIGFuZCBhcHBlbmRzIHRoZSBmb3JrIHN0YXRlJ3MgY3VycmVudCB3cml0ZSBsZW5ndGggYXMgYSB2YXJpbnQgZm9sbG93ZWQgYnkgaXRzIG9wZXJhdGlvbnMuXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5sZGVsaW0gPSBmdW5jdGlvbiBsZGVsaW0oKSB7XG4gICAgdmFyIGhlYWQgPSB0aGlzLmhlYWQsXG4gICAgICAgIHRhaWwgPSB0aGlzLnRhaWwsXG4gICAgICAgIGxlbiAgPSB0aGlzLmxlbjtcbiAgICB0aGlzLnJlc2V0KCkudWludDMyKGxlbik7XG4gICAgaWYgKGxlbikge1xuICAgICAgICB0aGlzLnRhaWwubmV4dCA9IGhlYWQubmV4dDsgLy8gc2tpcCBub29wXG4gICAgICAgIHRoaXMudGFpbCA9IHRhaWw7XG4gICAgICAgIHRoaXMubGVuICs9IGxlbjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEZpbmlzaGVzIHRoZSB3cml0ZSBvcGVyYXRpb24uXG4gKiBAcmV0dXJucyB7VWludDhBcnJheX0gRmluaXNoZWQgYnVmZmVyXG4gKi9cbldyaXRlci5wcm90b3R5cGUuZmluaXNoID0gZnVuY3Rpb24gZmluaXNoKCkge1xuICAgIHZhciBoZWFkID0gdGhpcy5oZWFkLm5leHQsIC8vIHNraXAgbm9vcFxuICAgICAgICBidWYgID0gdGhpcy5jb25zdHJ1Y3Rvci5hbGxvYyh0aGlzLmxlbiksXG4gICAgICAgIHBvcyAgPSAwO1xuICAgIHdoaWxlIChoZWFkKSB7XG4gICAgICAgIGhlYWQuZm4oaGVhZC52YWwsIGJ1ZiwgcG9zKTtcbiAgICAgICAgcG9zICs9IGhlYWQubGVuO1xuICAgICAgICBoZWFkID0gaGVhZC5uZXh0O1xuICAgIH1cbiAgICAvLyB0aGlzLmhlYWQgPSB0aGlzLnRhaWwgPSBudWxsO1xuICAgIHJldHVybiBidWY7XG59O1xuXG5Xcml0ZXIuX2NvbmZpZ3VyZSA9IGZ1bmN0aW9uKEJ1ZmZlcldyaXRlcl8pIHtcbiAgICBCdWZmZXJXcml0ZXIgPSBCdWZmZXJXcml0ZXJfO1xuICAgIFdyaXRlci5jcmVhdGUgPSBjcmVhdGUoKTtcbiAgICBCdWZmZXJXcml0ZXIuX2NvbmZpZ3VyZSgpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBCdWZmZXJXcml0ZXI7XG5cbi8vIGV4dGVuZHMgV3JpdGVyXG52YXIgV3JpdGVyID0gcmVxdWlyZShcIi4vd3JpdGVyXCIpO1xuKEJ1ZmZlcldyaXRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFdyaXRlci5wcm90b3R5cGUpKS5jb25zdHJ1Y3RvciA9IEJ1ZmZlcldyaXRlcjtcblxudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsL21pbmltYWxcIik7XG5cbi8qKlxuICogQ29uc3RydWN0cyBhIG5ldyBidWZmZXIgd3JpdGVyIGluc3RhbmNlLlxuICogQGNsYXNzZGVzYyBXaXJlIGZvcm1hdCB3cml0ZXIgdXNpbmcgbm9kZSBidWZmZXJzLlxuICogQGV4dGVuZHMgV3JpdGVyXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQnVmZmVyV3JpdGVyKCkge1xuICAgIFdyaXRlci5jYWxsKHRoaXMpO1xufVxuXG5CdWZmZXJXcml0ZXIuX2NvbmZpZ3VyZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBBbGxvY2F0ZXMgYSBidWZmZXIgb2YgdGhlIHNwZWNpZmllZCBzaXplLlxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzaXplIEJ1ZmZlciBzaXplXG4gICAgICogQHJldHVybnMge0J1ZmZlcn0gQnVmZmVyXG4gICAgICovXG4gICAgQnVmZmVyV3JpdGVyLmFsbG9jID0gdXRpbC5fQnVmZmVyX2FsbG9jVW5zYWZlO1xuXG4gICAgQnVmZmVyV3JpdGVyLndyaXRlQnl0ZXNCdWZmZXIgPSB1dGlsLkJ1ZmZlciAmJiB1dGlsLkJ1ZmZlci5wcm90b3R5cGUgaW5zdGFuY2VvZiBVaW50OEFycmF5ICYmIHV0aWwuQnVmZmVyLnByb3RvdHlwZS5zZXQubmFtZSA9PT0gXCJzZXRcIlxuICAgICAgICA/IGZ1bmN0aW9uIHdyaXRlQnl0ZXNCdWZmZXJfc2V0KHZhbCwgYnVmLCBwb3MpIHtcbiAgICAgICAgICBidWYuc2V0KHZhbCwgcG9zKTsgLy8gZmFzdGVyIHRoYW4gY29weSAocmVxdWlyZXMgbm9kZSA+PSA0IHdoZXJlIEJ1ZmZlcnMgZXh0ZW5kIFVpbnQ4QXJyYXkgYW5kIHNldCBpcyBwcm9wZXJseSBpbmhlcml0ZWQpXG4gICAgICAgICAgLy8gYWxzbyB3b3JrcyBmb3IgcGxhaW4gYXJyYXkgdmFsdWVzXG4gICAgICAgIH1cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgOiBmdW5jdGlvbiB3cml0ZUJ5dGVzQnVmZmVyX2NvcHkodmFsLCBidWYsIHBvcykge1xuICAgICAgICAgIGlmICh2YWwuY29weSkgLy8gQnVmZmVyIHZhbHVlc1xuICAgICAgICAgICAgdmFsLmNvcHkoYnVmLCBwb3MsIDAsIHZhbC5sZW5ndGgpO1xuICAgICAgICAgIGVsc2UgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWwubGVuZ3RoOykgLy8gcGxhaW4gYXJyYXkgdmFsdWVzXG4gICAgICAgICAgICBidWZbcG9zKytdID0gdmFsW2krK107XG4gICAgICAgIH07XG59O1xuXG5cbi8qKlxuICogQG92ZXJyaWRlXG4gKi9cbkJ1ZmZlcldyaXRlci5wcm90b3R5cGUuYnl0ZXMgPSBmdW5jdGlvbiB3cml0ZV9ieXRlc19idWZmZXIodmFsdWUpIHtcbiAgICBpZiAodXRpbC5pc1N0cmluZyh2YWx1ZSkpXG4gICAgICAgIHZhbHVlID0gdXRpbC5fQnVmZmVyX2Zyb20odmFsdWUsIFwiYmFzZTY0XCIpO1xuICAgIHZhciBsZW4gPSB2YWx1ZS5sZW5ndGggPj4+IDA7XG4gICAgdGhpcy51aW50MzIobGVuKTtcbiAgICBpZiAobGVuKVxuICAgICAgICB0aGlzLl9wdXNoKEJ1ZmZlcldyaXRlci53cml0ZUJ5dGVzQnVmZmVyLCBsZW4sIHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIHdyaXRlU3RyaW5nQnVmZmVyKHZhbCwgYnVmLCBwb3MpIHtcbiAgICBpZiAodmFsLmxlbmd0aCA8IDQwKSAvLyBwbGFpbiBqcyBpcyBmYXN0ZXIgZm9yIHNob3J0IHN0cmluZ3MgKHByb2JhYmx5IGR1ZSB0byByZWR1bmRhbnQgYXNzZXJ0aW9ucylcbiAgICAgICAgdXRpbC51dGY4LndyaXRlKHZhbCwgYnVmLCBwb3MpO1xuICAgIGVsc2UgaWYgKGJ1Zi51dGY4V3JpdGUpXG4gICAgICAgIGJ1Zi51dGY4V3JpdGUodmFsLCBwb3MpO1xuICAgIGVsc2VcbiAgICAgICAgYnVmLndyaXRlKHZhbCwgcG9zKTtcbn1cblxuLyoqXG4gKiBAb3ZlcnJpZGVcbiAqL1xuQnVmZmVyV3JpdGVyLnByb3RvdHlwZS5zdHJpbmcgPSBmdW5jdGlvbiB3cml0ZV9zdHJpbmdfYnVmZmVyKHZhbHVlKSB7XG4gICAgdmFyIGxlbiA9IHV0aWwuQnVmZmVyLmJ5dGVMZW5ndGgodmFsdWUpO1xuICAgIHRoaXMudWludDMyKGxlbik7XG4gICAgaWYgKGxlbilcbiAgICAgICAgdGhpcy5fcHVzaCh3cml0ZVN0cmluZ0J1ZmZlciwgbGVuLCB2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG5cbi8qKlxuICogRmluaXNoZXMgdGhlIHdyaXRlIG9wZXJhdGlvbi5cbiAqIEBuYW1lIEJ1ZmZlcldyaXRlciNmaW5pc2hcbiAqIEBmdW5jdGlvblxuICogQHJldHVybnMge0J1ZmZlcn0gRmluaXNoZWQgYnVmZmVyXG4gKi9cblxuQnVmZmVyV3JpdGVyLl9jb25maWd1cmUoKTtcbiIsImltcG9ydCB7IG5pY2VfdHMgfSBmcm9tIFwiLi9nZW4vcGJcIjtcclxuZXhwb3J0IGNsYXNzIERlY29kZU1zZ3tcclxuXHRwdWJsaWMgcnBjSWQ6bnVtYmVyO1xyXG5cdHB1YmxpYyBtc2dPYmo6YW55O1xyXG59XHJcbmV4cG9ydCBjbGFzcyBPcGNvZGV7XHJcblx0cHVibGljIHN0YXRpYyBNU0dfQzJSX0xvZ2luOm51bWJlciA9IDEwMDA7XHJcblx0cHVibGljIHN0YXRpYyBNU0dfUjJDX0xvZ2luOm51bWJlciA9IDEwMDE7XHJcblx0cHVibGljIHN0YXRpYyBNU0dfQzJHX0xvZ2luR2F0ZTpudW1iZXIgPSAxMDAyO1xyXG5cdHB1YmxpYyBzdGF0aWMgTVNHX0cyQ19Mb2dpbkdhdGU6bnVtYmVyID0gMTAwMztcclxuXHJcblx0cHVibGljIHN0YXRpYyBNU0dfQzJHU19UZXN0Om51bWJlciA9IDIwMDE7XHJcblx0cHVibGljIHN0YXRpYyBNU0dfR1MyQ19UZXN0Om51bWJlciA9IDIwMDI7XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgbWFwID0ge1xyXG5cdFx0MTAwMCA6IHtcImRlY29kZVwiOm5pY2VfdHMuQzJSX0xvZ2luLmRlY29kZSxcImVuY29kZVwiOm5pY2VfdHMuQzJSX0xvZ2luLmVuY29kZX0sXHJcblx0XHQxMDAxIDoge1wiZGVjb2RlXCI6bmljZV90cy5SMkNfTG9naW4uZGVjb2RlLFwiZW5jb2RlXCI6bmljZV90cy5SMkNfTG9naW4uZW5jb2RlfSxcclxuXHRcdDEwMDIgOiB7XCJkZWNvZGVcIjpuaWNlX3RzLkMyR19Mb2dpbkdhdGUuZGVjb2RlLFwiZW5jb2RlXCI6bmljZV90cy5DMkdfTG9naW5HYXRlLmVuY29kZX0sXHJcblx0XHQxMDAzIDoge1wiZGVjb2RlXCI6bmljZV90cy5HMkNfTG9naW5HYXRlLmRlY29kZSxcImVuY29kZVwiOm5pY2VfdHMuRzJDX0xvZ2luR2F0ZS5lbmNvZGV9LFxyXG5cclxuXHRcdDIwMDEgOiB7XCJkZWNvZGVcIjpuaWNlX3RzLkMyR1NfVGVzdC5kZWNvZGUsXCJlbmNvZGVcIjpuaWNlX3RzLkMyR1NfVGVzdC5lbmNvZGV9LFxyXG5cdFx0MjAwMiA6IHtcImRlY29kZVwiOm5pY2VfdHMuR1MyQ19UZXN0LmRlY29kZSxcImVuY29kZVwiOm5pY2VfdHMuR1MyQ19UZXN0LmVuY29kZX1cclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBkZWNvZGUob3Bjb2RlOm51bWJlciwgbXNnOlVpbnQ4QXJyYXkpOkRlY29kZU1zZyB7XHJcblx0XHRsZXQgbXNnT2JqID0gdGhpcy5tYXBbb3Bjb2RlXVtcImRlY29kZVwiXShtc2cpO1xyXG5cdFx0bGV0IGRlY29kZU1zZyA9IG5ldyBEZWNvZGVNc2coKTtcclxuXHRcdGRlY29kZU1zZy5ycGNJZCA9IG1zZ09iai5ScGNJZDtcclxuXHRcdGRlY29kZU1zZy5tc2dPYmogPSBtc2dPYmo7XHJcblx0XHRyZXR1cm4gZGVjb2RlTXNnO1xyXG5cdH1cclxuXHRwdWJsaWMgc3RhdGljIGVuY29kZShvcGNvZGU6bnVtYmVyLCBtc2c6VWludDhBcnJheSl7XHJcblx0XHRsZXQgYnVmID0gdGhpcy5tYXBbb3Bjb2RlXVtcImVuY29kZVwiXShtc2cpLmZpbmlzaCgpO1xyXG5cdFx0cmV0dXJuIGJ1ZlxyXG5cdH1cclxuXHJcblxyXG5cclxufVxyXG4iLCIvKiogVGhpcyBpcyBhbiBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBjbGFzcyBieSBGYWlyeUdVSS4gUGxlYXNlIGRvIG5vdCBtb2RpZnkgaXQuICoqL1xuXG5leHBvcnQgY2xhc3MgRmx5QmlyZFVJXG57XG4gICAgcHVibGljIHN0YXRpYyBQYWNrYWdlTmFtZTpzdHJpbmcgPSBcIkZseUJpcmRcIjtcbiAgICBwdWJsaWMgc3RhdGljIFBhY2thZ2VCeXRlczpzdHJpbmcgPSBcIkZseUJpcmRfZnVpLmJ5dGVzXCI7XG4gICAgcHVibGljIHN0YXRpYyBVSU1haW5WSWV3OnN0cmluZyA9IFwiTWFpblZJZXdcIjtcbiAgICBwdWJsaWMgc3RhdGljIFVJUGlwZTpzdHJpbmcgPSBcIlBpcGVcIjtcbiAgICBwdWJsaWMgc3RhdGljIFVJT3ZlcldpbmRvdzpzdHJpbmcgPSBcIk92ZXJXaW5kb3dcIjtcbiAgICBwdWJsaWMgc3RhdGljIFVJQmlyZDpzdHJpbmcgPSBcIkJpcmRcIjtcbn0iLCIvKiogVGhpcyBpcyBhbiBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBjbGFzcyBieSBGYWlyeUdVSS4gUGxlYXNlIGRvIG5vdCBtb2RpZnkgaXQuICoqL1xuXG5leHBvcnQgY2xhc3MgR2FtZVN0YXJ0VUlcbntcbiAgICBwdWJsaWMgc3RhdGljIFBhY2thZ2VOYW1lOnN0cmluZyA9IFwiR2FtZVN0YXJ0XCI7XG4gICAgcHVibGljIHN0YXRpYyBQYWNrYWdlQnl0ZXM6c3RyaW5nID0gXCJHYW1lU3RhcnRfZnVpLmJ5dGVzXCI7XG4gICAgcHVibGljIHN0YXRpYyBVSVN0YXJ0VmlldzpzdHJpbmcgPSBcIlN0YXJ0Vmlld1wiO1xufSIsIi8qKiBUaGlzIGlzIGFuIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGNsYXNzIGJ5IEZhaXJ5R1VJLiBQbGVhc2UgZG8gbm90IG1vZGlmeSBpdC4gKiovXG5cbmV4cG9ydCBjbGFzcyBDb21tb25VSVxue1xuICAgIHB1YmxpYyBzdGF0aWMgUGFja2FnZU5hbWU6c3RyaW5nID0gXCJDb21tb25cIjtcbiAgICBwdWJsaWMgc3RhdGljIFBhY2thZ2VCeXRlczpzdHJpbmcgPSBcIkNvbW1vbl9mdWkuYnl0ZXNcIjtcbiAgICBwdWJsaWMgc3RhdGljIFVJTG9hZGluZ1ZpZXc6c3RyaW5nID0gXCJMb2FkaW5nVmlld1wiO1xufSIsIlxyXG5pbXBvcnQgeyBTaW5nbGV0b24gfSBmcm9tICcuL1NpbmdsZXRvbic7XHJcbmltcG9ydCB7IFJlc01hbmFnZXIgfSBmcm9tICcuL1Jlc01hbmFnZXInO1xyXG5pbXBvcnQgeyBVbml0eUVuZ2luZSB9IGZyb20gJ2NzaGFycCc7XHJcblxyXG5cclxuXHJcbi8vIC0tIEdhbWVPYmplY3TnvJPlrZjmsaBcclxuLy8gLS0g5rOo5oSP77yaXHJcbi8vIC0tIDHjgIHmiYDmnInpnIDopoHpooTorr7pg73ku47ov5nph4zliqDovb3vvIzkuI3opoHnm7TmjqXliLBSZXNvdXJjZXNNYW5hZ2Vy5Y675Yqg6L2977yM55Sx6L+Z6YeM57uf5LiA5YGa57yT5a2Y566h55CGXHJcbi8vIC0tIDLjgIHnvJPlrZjliIbkuLrkuKTpg6jliIbvvJrku47otYTmupDlsYLliqDovb3nmoTljp/lp4tHYW1lT2JqZWN0KEFzc2V0Ke+8jOS7jkdhbWVPYmplY3Tlrp7kvovljJblh7rmnaXnmoTlpJrkuKpJbnN0XHJcbmV4cG9ydCBjbGFzcyBHYW1lT2JqZWN0UG9vbCBleHRlbmRzIFNpbmdsZXRvbjxHYW1lT2JqZWN0UG9vbD57XHJcblxyXG4gICAgcHJpdmF0ZSBfX2NhY2hlVHJhbnNSb290ID0gbnVsbDtcclxuICAgIHByaXZhdGUgX19nb1Bvb2wgPSBuZXcgTWFwKCk7XHJcbiAgICBwcml2YXRlIF9faW5zdENhY2hlOk1hcDxzdHJpbmcsQXJyYXk8YW55Pj4gPSBuZXcgTWFwPHN0cmluZyxBcnJheTxhbnk+PigpO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIGxldCBnbyA9IFVuaXR5RW5naW5lLkdhbWVPYmplY3QuRmluZChcIkdhbWVPYmplY3RDYWNoZVJvb3RcIik7XHJcblxyXG4gICAgICAgIGlmKGdvID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGdvID0gbmV3IFVuaXR5RW5naW5lLkdhbWVPYmplY3QoXCJHYW1lT2JqZWN0Q2FjaGVSb290XCIpO1xyXG4gICAgICAgICAgICBVbml0eUVuZ2luZS5PYmplY3QuRG9udERlc3Ryb3lPbkxvYWQoZ28pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fX2NhY2hlVHJhbnNSb290ID0gZ28udHJhbnNmb3JtO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLS0g5qOA5rWL5piv5ZCm5bey57uP6KKr57yT5a2YXHJcbiAgICBwdWJsaWMgY2hlY2tIYXNDYWNoZWQocGF0aDpzdHJpbmcpe1xyXG5cclxuICAgICAgICBsZXQgY2FjaGVkSW5zdDpBcnJheTxhbnk+ID0gdGhpcy5fX2luc3RDYWNoZS5nZXQocGF0aCk7XHJcbiAgICAgICAgaWYoY2FjaGVkSW5zdCAhPSB1bmRlZmluZWQgJiYgY2FjaGVkSW5zdC5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcG9vbGVkR28gPSB0aGlzLl9fZ29Qb29sLmdldChwYXRoKTtcclxuICAgICAgICByZXR1cm4gcG9vbGVkR28gIT0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLy0tIOe8k+WtmOW5tuWunuS+i+WMlkdhbWVPYmplY3RcclxuICAgIHB1YmxpYyBjYWNoZUFuZEluc3RHYW1lT2JqZWN0KHBhdGg6c3RyaW5nLCBnbzphbnksIGluc3RfY291bnQ6bnVtYmVyID0gMSl7XHJcblxyXG4gICAgICAgIHRoaXMuX19nb1Bvb2wuc2V0KHBhdGgsIGdvKTtcclxuICAgICAgICBpZihpbnN0X2NvdW50ID4gMCl7XHJcblxyXG4gICAgICAgICAgICBsZXQgY2FjaGVkSW5zdDpBcnJheTxhbnk+ID0gdGhpcy5fX2luc3RDYWNoZS5nZXQocGF0aCk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaTpudW1iZXIgPTA7IGkgPCBpbnN0X2NvdW50OyBpKyspe1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBpbnN0ID0gVW5pdHlFbmdpbmUuR2FtZU9iamVjdC5JbnN0YW50aWF0ZShnbykgYXMgVW5pdHlFbmdpbmUuR2FtZU9iamVjdDtcclxuICAgICAgICAgICAgICAgIGluc3QudHJhbnNmb3JtLlNldFBhcmVudCh0aGlzLl9fY2FjaGVUcmFuc1Jvb3QpO1xyXG4gICAgICAgICAgICAgICAgaW5zdC5TZXRBY3RpdmUoZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhY2hlZEluc3QucHVzaChpbnN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLy0tIOWwneivleS7jue8k+WtmOS4reiOt+WPllxyXG4gICAgcHVibGljIHRyeUdldEZyb21DYWNoZShwYXRoOnN0cmluZyk6YW55e1xyXG5cclxuICAgICAgICBpZighdGhpcy5jaGVja0hhc0NhY2hlZChwYXRoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjYWNoZWRJbnN0OkFycmF5PG9iamVjdD4gID0gdGhpcy5fX2luc3RDYWNoZS5nZXQocGF0aCk7XHJcbiAgICAgICAgaWYoY2FjaGVkSW5zdCAhPSB1bmRlZmluZWQgJiYgY2FjaGVkSW5zdC5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgaW5zdCA9IGNhY2hlZEluc3QucG9wKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnN0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBvb2xlZEdvID0gdGhpcy5fX2dvUG9vbC5nZXQocGF0aCk7XHJcbiAgICAgICAgaWYocG9vbGVkR28gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IGluc3QgPSBVbml0eUVuZ2luZS5HYW1lT2JqZWN0Lkluc3RhbnRpYXRlKHBvb2xlZEdvKTtcclxuICAgICAgICAgICAgcmV0dXJuIGluc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+mihOWKoOi9ve+8muWPr+aPkOS+m+WIneWni+WunuS+i+WMluS4quaVsFxyXG4gICAgcHVibGljIGFzeW5jIHByZUxvYWRHYW1lT2JqZWN0QXN5bmMocGF0aDpzdHJpbmcsIGluc3RfY291bnQ6bnVtYmVyLCBjYWxsYmFjazpGdW5jdGlvbiwuLi5wYXJhbXMpe1xyXG5cclxuICAgICAgICBpZih0aGlzLmNoZWNrSGFzQ2FjaGVkKHBhdGgpKXtcclxuICAgICAgICAgICAgaWYoY2FsbGJhY2shPW51bGwpe1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2socGFyYW1zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZ28gPSBhd2FpdCBSZXNNYW5hZ2VyLkluc3RhbmNlKFJlc01hbmFnZXIpLmxvYWRQcmVmYWIocGF0aCk7XHJcbiAgICAgICAgaWYoZ28hPXVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuY2FjaGVBbmRJbnN0R2FtZU9iamVjdChwYXRoLCBnbyxpbnN0X2NvdW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGNhbGxiYWNrIT1udWxsKXtcclxuICAgICAgICAgICAgY2FsbGJhY2socGFyYW1zKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vLS0g5byC5q2l6I635Y+W77ya5b+F6KaB5pe25Yqg6L29XHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0R2FtZU9iamVjdEFzeW5jKHBhdGg6c3RyaW5nLCBjYWxsYmFjazpGdW5jdGlvbiwuLi5wYXJhbXMpe1xyXG5cclxuICAgICAgICBsZXQgaW5zdDphbnkgPSB0aGlzLnRyeUdldEZyb21DYWNoZShwYXRoKTtcclxuICAgICAgICBpZihpbnN0ID09bnVsbCl7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucHJlTG9hZEdhbWVPYmplY3RBc3luYyhwYXRoLCAxLCBjYWxsYmFjaywgcGFyYW1zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluc3QgPSB0aGlzLnRyeUdldEZyb21DYWNoZShwYXRoKTtcclxuICAgICAgICBpbnN0LlNldEFjdGl2ZSh0cnVlKTtcclxuXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vLS0g5Zue5pS2XHJcbiAgICBwdWJsaWMgcmVjeWNsZUdhbWVPYmplY3QocGF0aDpzdHJpbmcsIGluc3Q6YW55KXtcclxuXHJcbiAgICAgICAgaW5zdC50cmFuc2Zvcm0uU2V0UGFyZW50KHRoaXMuX19jYWNoZVRyYW5zUm9vdCk7XHJcbiAgICAgICAgaW5zdC5TZXRBY3RpdmUoZmFsc2UpO1xyXG5cclxuICAgICAgICBsZXQgY2FjaGVkSW5zdCA9IHRoaXMuX19pbnN0Q2FjaGUuZ2V0KHBhdGgpIHx8IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIGNhY2hlZEluc3QucHVzaChpbnN0KTtcclxuXHJcbiAgICAgICAgdGhpcy5fX2luc3RDYWNoZS5zZXQocGF0aCwgY2FjaGVkSW5zdCk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLy0tIOa4heeQhue8k+WtmFxyXG4gICAgcHVibGljIGNsZWFudXAoaW5jbHVkZVBvb2xlZEdvOmJvb2xlYW4gPSBmYWxzZSl7XHJcblxyXG4gICAgICAgIHRoaXMuX19pbnN0Q2FjaGUuZm9yRWFjaCgodmFsdWVzLCBrZXkpPT57XHJcblxyXG4gICAgICAgICAgICBmb3IobGV0IGluc3Qgb2YgdmFsdWVzKXtcclxuICAgICAgICAgICAgICAgIGlmKGluc3QgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgVW5pdHlFbmdpbmUuR2FtZU9iamVjdC5EZXN0cm95KGluc3QpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fX2luc3RDYWNoZS5jbGVhcigpOyBcclxuXHJcbiAgICAgICAgaWYoaW5jbHVkZVBvb2xlZEdvKXtcclxuICAgICAgICAgICAgdGhpcy5fX2dvUG9vbC5mb3JFYWNoKChnbywga2V5KT0+e1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGdvICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgIFJlc01hbmFnZXIuSW5zdGFuY2UoUmVzTWFuYWdlcikucmVsZWFzZUFkZHJlc3NHTyhnbyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fX2dvUG9vbC5jbGVhcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxufSIsIlxyXG5leHBvcnQgIGNsYXNzIExpc3Q8VD4gZXh0ZW5kcyBBcnJheTxUPiB7XHJcblx0cHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHR9XHJcbiBcclxuXHRhZGQ6RnVuY3Rpb24gPSBmdW5jdGlvbih2YWx1ZTpUKTp2b2lke1xyXG5cdFx0dGhpcy5wdXNoKHZhbHVlKTtcclxuXHR9XHJcbiBcclxuXHRpbnNlcnQ6RnVuY3Rpb24gPSBmdW5jdGlvbihpbmRleDpudW1iZXIsIHZhbHVlOlQpOnZvaWR7XHJcblx0XHR0aGlzLnNwbGljZShpbmRleCwgMCwgdmFsdWUpO1xyXG5cdH1cclxuIFxyXG5cdHJlbW92ZTpGdW5jdGlvbiA9IGZ1bmN0aW9uKHZhbHVlOlQpOnZvaWR7XHJcblx0XHR2YXIgaW5kZXg6bnVtYmVyID0gdGhpcy5pbmRleE9mKHZhbHVlKTtcclxuXHRcdHRoaXMucmVtb3ZlQXQoaW5kZXgpO1xyXG5cdH1cclxuIFxyXG5cdHJlbW92ZUF0OkZ1bmN0aW9uID0gZnVuY3Rpb24oaW5kZXg6bnVtYmVyKTp2b2lke1xyXG5cdFx0dGhpcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cdH1cclxuIFxyXG5cdGNvbnRhaW5zOkZ1bmN0aW9uID0gZnVuY3Rpb24odmFsdWU6VCk6Ym9vbGVhbntcclxuXHRcdHJldHVybiB0aGlzLmluZGV4T2YodmFsdWUpPj0wO1xyXG5cdH1cclxuIFxyXG5cdHB1YmxpYyBnZXQgY291bnQoKTpudW1iZXJ7XHJcblx0XHRyZXR1cm4gdGhpcy5sZW5ndGg7XHJcblx0fVxyXG4gXHJcblx0Y2xlYXI6RnVuY3Rpb24gPSBmdW5jdGlvbigpOnZvaWR7XHJcblx0XHR0aGlzLnNwbGljZSgwKTtcclxuXHR9XHJcbiBcclxuXHRmb3JlYWNoOkZ1bmN0aW9uID0gZnVuY3Rpb24oY2FsbGJhY2s6RnVuY3Rpb24pOnZvaWQge1xyXG4gICAgICAgIHRoaXMuX2JyZWFraW5nID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIHN1bSA9IHRoaXMubGVuZ3RoO1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8c3VtO2krKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2JyZWFraW5nKXtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKHRoaXNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuIFxyXG4gICAgX2JyZWFraW5nOmJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGJyZWFrOkZ1bmN0aW9uID0gZnVuY3Rpb24oKTp2b2lkIHtcclxuICAgICAgICB0aGlzLl9icmVha2luZyA9IHRydWU7XHJcbiAgICB9XHJcbiBcclxuXHR0b0FycmF5OkZ1bmN0aW9uID0gZnVuY3Rpb24oKTpUW117XHJcblx0XHR2YXIgYXJyYXk6VFtdID0gW107XHJcblx0XHR0aGlzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcblx0XHRcdGFycmF5LnB1c2goZWxlbWVudCk7XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiBhcnJheTtcclxuXHR9XHJcbiBcclxuXHRhcHBlbmQ6RnVuY3Rpb24gPSBmdW5jdGlvbih2YWx1ZTpUW10pOnZvaWR7XHJcblx0XHR2YWx1ZS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG5cdFx0XHR0aGlzLnB1c2goZWxlbWVudCk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuIiwiXHJcblxyXG5leHBvcnQgY2xhc3MgTWVzT2Jqe1xyXG4gICAgcHVibGljIGxpc3RlbmVyczpBcnJheTxGdW5jdGlvbj47XHJcbiAgICBwdWJsaWMgb2JqOmFueTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBNZXNzZW5nZXJ7XHJcblxyXG4gICAgcHJpdmF0ZSBsaXN0ZW5lck1hcCA9IG5ldyBNYXA8bnVtYmVyLE1lc09iaj4oKTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkTGlzdGVuZXIoZV90eXBlOm51bWJlciwgZV9vYmo6YW55LCBlX2xpc3RuZXI6RnVuY3Rpb24pOnZvaWR7XHJcblxyXG4gICAgICAgIGxldCBtc2dPYmogPSB0aGlzLmxpc3RlbmVyTWFwLmdldChlX3R5cGUpO1xyXG5cclxuICAgICAgICBpZih0eXBlb2YobXNnT2JqKSA9PSBcInVuZGVmaW5lZFwiKXtcclxuICAgICAgICAgICAgbXNnT2JqID0gbmV3IE1lc09iaigpO1xyXG4gICAgICAgICAgICBtc2dPYmoub2JqID0gZV9vYmo7XHJcbiAgICAgICAgICAgIG1zZ09iai5saXN0ZW5lcnMgPSBuZXcgQXJyYXk8RnVuY3Rpb24+KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1zZ09iai5saXN0ZW5lcnMucHVzaChlX2xpc3RuZXIpO1xyXG5cclxuICAgICAgICB0aGlzLmxpc3RlbmVyTWFwLnNldChlX3R5cGUsIG1zZ09iaik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldExpc3RlbmVyKGVfdHlwZTpudW1iZXIpOk1lc09iantcclxuICAgICAgICByZXR1cm4gdGhpcy5saXN0ZW5lck1hcC5nZXQoZV90eXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYnJvYWRjYXN0KGVfdHlwZTpudW1iZXIsIC4uLnBhcmFtczphbnlbXSkgOiB2b2lkIHtcclxuXHJcbiAgICAgICAgbGV0IG1zZ09iaiA9IHRoaXMubGlzdGVuZXJNYXAuZ2V0KGVfdHlwZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodHlwZW9mKG1zZ09iaikgIT0gXCJ1bmRlZmluZWRcIil7XHJcbiAgICAgICAgICAgIGZvcihsZXQgbCBvZiBtc2dPYmoubGlzdGVuZXJzKXtcclxuICAgICAgICAgICAgICAgbC5hcHBseShtc2dPYmoub2JqLCBwYXJhbXMpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVMaXN0ZW5lckJ5VHlwZShlX3R5cGU6bnVtYmVyKSA6dm9pZCB7XHJcblxyXG4gICAgICAgIHRoaXMubGlzdGVuZXJNYXAuZGVsZXRlKGVfdHlwZSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVMaXN0ZW5lcihlX3R5cGU6bnVtYmVyLCBlX2xpc3RlbmVyOkZ1bmN0aW9uICk6dm9pZHtcclxuXHJcbiAgICAgICAgbGV0IG1zZ09iaiA9IHRoaXMubGlzdGVuZXJNYXAuZ2V0KGVfdHlwZSk7XHJcblxyXG4gICAgICAgIGlmKHR5cGVvZihtc2dPYmopICE9IFwidW5kZWZpbmVkXCIpe1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZm9yKGxldCBpOm51bWJlciA9MDsgaTwgbXNnT2JqLmxpc3RlbmVycy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZihtc2dPYmoubGlzdGVuZXJzW2ldID09IGVfbGlzdGVuZXIpe1xyXG4gICAgICAgICAgICAgICAgICAgIG1zZ09iai5saXN0ZW5lcnMuc3BsaWNlKGksMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFydXAoKTp2b2lke1xyXG5cclxuICAgICAgICB0aGlzLmxpc3RlbmVyTWFwLmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG59IiwiXHJcblxyXG5cclxuLy8gRmFpcnlHVUkg5YWD5Lu2IOe7keWumuWZqFxyXG5leHBvcnQgZnVuY3Rpb24gYmluZGVyKG5hbWU6c3RyaW5nKXtcclxuICAgIHJldHVybiBmdW5jdGlvbih0YXJnZXQ6YW55LCBrZXk6c3RyaW5nIHwgc3ltYm9sKXtcclxuICAgICAgICB0YXJnZXRbXCJiaW5kZXJzXCJdID0gdGFyZ2V0W1wiYmluZGVyc1wiXSB8fCB7fTtcclxuICAgICAgICB0YXJnZXRbXCJiaW5kZXJzXCJdW2tleV0gPSBuYW1lO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFJhbmRvbVxyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIHJhbmRvbSA9IChtaW46YW55LG1heDphbnkpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbilcclxufSIsIlxyXG5pbXBvcnQgeyBTaW5nbGV0b24gfSBmcm9tICcuL1NpbmdsZXRvbic7XHJcbmltcG9ydCB7ICRwcm9taXNlIH0gZnJvbSAncHVlcnRzJztcclxuaW1wb3J0IHtOaWNlVFMsIFVuaXR5RW5naW5lfSBmcm9tICdjc2hhcnAnO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICcuLi9sb2dnZXIvTG9nZ2VyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBSZXNNYW5hZ2VyIGV4dGVuZHMgU2luZ2xldG9uPFJlc01hbmFnZXI+e1xyXG5cclxuICAgIHByaXZhdGUgX3BrZ01hcDpNYXA8c3RyaW5nLG51bWJlcj4gPSBuZXcgTWFwPHN0cmluZyxudW1iZXI+KCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGxvYWRGYWlyeUdVSVBhY2thZ2UocGFja2FnZU5hbWU6c3RyaW5nKXtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGxldCBjb3VudCA9IHRoaXMuX3BrZ01hcC5nZXQocGFja2FnZU5hbWUpO1xyXG4gICAgICAgICAgICBpZihjb3VudCA9PSBudWxsIHx8IGNvdW50IDwgMSl7XHJcbiAgICAgICAgICAgICAgICAvL+ayoeaciee8k+WtmO+8jOWKoOi9vVxyXG4gICAgICAgICAgICAgICAgbGV0IGFkZHJlc3MgPSBwYWNrYWdlTmFtZStcIl9mdWkuYnl0ZXNcIjtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFkZHJlc3MpXHJcbiAgICAgICAgICAgICAgICBsZXQgdGFzayA9IE5pY2VUUy5SZXNvdXJjZU1hbmFnZXIuTG9hZEZhaXJ5R1VJUGFja2FnZShhZGRyZXNzLHBhY2thZ2VOYW1lKTtcclxuICAgICAgICAgICAgICAgIGF3YWl0ICRwcm9taXNlKHRhc2spO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGtnTWFwLnNldChwYWNrYWdlTmFtZSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BrZ01hcC5zZXQocGFja2FnZU5hbWUsIGNvdW50KzEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWNhdGNoKGV4KXtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBMb2FkIGZhaXJ5R1VJIDoke3BhY2thZ2VOYW1lfSA6ICR7ZXh9YClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyByZWxlYXNlRmFpcnlHVUlQYWNrYWdlKHBhY2thZ2VOYW1lKXtcclxuXHJcbiAgICAgICAgbGV0IGNvdW50ID0gdGhpcy5fcGtnTWFwLmdldChwYWNrYWdlTmFtZSk7XHJcbiAgICAgICAgaWYoY291bnQhPW51bGwgJiYgY291bnQ+MSl7XHJcbiAgICAgICAgICAgIHRoaXMuX3BrZ01hcC5zZXQocGFja2FnZU5hbWUsIGNvdW50LTEpO1xyXG4gICAgICAgIH1lbHNle1xyXG5cclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhgcmVsZWFzZSBmYWd1aSBwYWNrYWdlOiR7cGFja2FnZU5hbWV9YCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3BrZ01hcC5kZWxldGUocGFja2FnZU5hbWUpO1xyXG4gICAgICAgICAgICBOaWNlVFMuUmVzb3VyY2VNYW5hZ2VyLlJlbGVhc2VGR1VJUGFja2FnZShwYWNrYWdlTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGxvYWRTY2VuZShzY2VuZU5hbWU6c3RyaW5nLCBtb2RlID0gVW5pdHlFbmdpbmUuU2NlbmVNYW5hZ2VtZW50LkxvYWRTY2VuZU1vZGUuU2luZ2xlKXtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHRhc2sgPSBOaWNlVFMuUmVzb3VyY2VNYW5hZ2VyLkxvYWRTY2VuZShzY2VuZU5hbWUsIG1vZGUsKHByb2dyZXNzOk51bWJlcik9PntcclxuICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCJsb2FkIHNjZW5lOiBcIitwcm9ncmVzcylcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2Nlbkluc3RhbmNlID0gYXdhaXQgJHByb21pc2UodGFzaylcclxuICAgICAgICAgICAgcmV0dXJuIHNjZW5JbnN0YW5jZVxyXG5cclxuICAgICAgICB9Y2F0Y2goZXgpe1xyXG5cclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBMb2FkIFNjZW5lIDoke3NjZW5lTmFtZX0gOiAke2V4fWApXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGFzeW5jIHVubG9hZFNjZW5lKHNjZW5lSW5zdGFuY2U6VW5pdHlFbmdpbmUuUmVzb3VyY2VNYW5hZ2VtZW50LlJlc291cmNlUHJvdmlkZXJzLlNjZW5lSW5zdGFuY2Upe1xyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgbGV0IHRhc2s9IE5pY2VUUy5SZXNvdXJjZU1hbmFnZXIuVW5sb2FkU2NlbmUoc2NlbmVJbnN0YW5jZSlcclxuICAgICAgICAgICAgbGV0IGdvID0gYXdhaXQgJHByb21pc2UodGFzayk7XHJcbiAgICAgICAgICAgIHJldHVybiBnbztcclxuICAgICAgICB9Y2F0Y2goZXgpe1xyXG5cclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBVbmxvYWQgc2NlbmUgIDogJHtleH1gKVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1bmxvYWRTY2VuZUJ5TmFtZShzY2VuZU5hbWU6c3RyaW5nKXtcclxuXHJcbiAgICAgICAgTmljZVRTLlJlc291cmNlTWFuYWdlci5VbmxvYWRTY2VuZUJ5TmFtZShzY2VuZU5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGxvYWRQcmVmYWIoYWRkcmVzczpzdHJpbmcpe1xyXG5cclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGxldCB0YXNrPSBOaWNlVFMuUmVzb3VyY2VNYW5hZ2VyLkxvYWRQcmVmYWIoYWRkcmVzcyk7XHJcbiAgICAgICAgICAgIGxldCBnbyA9IGF3YWl0ICRwcm9taXNlKHRhc2spO1xyXG4gICAgICAgICAgICByZXR1cm4gZ287XHJcbiAgICAgICAgfWNhdGNoKGV4KXtcclxuXHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihgTG9hZCBwcmVmYWIgOiR7YWRkcmVzc30gOiAke2V4fWApXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGxvYWRUZXh0QXNzZXQoYWRkcmVzczpzdHJpbmcpe1xyXG5cclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGxldCB0YXNrID0gTmljZVRTLlJlc291cmNlTWFuYWdlci5Mb2FkVGV4dEFzc2V0KGFkZHJlc3MpO1xyXG4gICAgICAgICAgICBsZXQgZ28gPSBhd2FpdCAkcHJvbWlzZSh0YXNrKTtcclxuICAgICAgICAgICAgcmV0dXJuIGdvO1xyXG4gICAgICAgIH1jYXRjaChleCl7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihgTG9hZCB0ZXh0YXNzZXQgOiR7YWRkcmVzc30gOiAke2V4fWApXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGFzeW5jIGxvYWRUZXh0Qnl0ZXMoYWRkcmVzczpzdHJpbmcpe1xyXG5cclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGxldCB0YXNrID0gTmljZVRTLlJlc291cmNlTWFuYWdlci5Mb2FkVGV4dEJ5dGVzKGFkZHJlc3MpO1xyXG4gICAgICAgICAgICBsZXQgYnl0ZXMgPSBhd2FpdCAkcHJvbWlzZSh0YXNrKTtcclxuICAgICAgICAgICAgcmV0dXJuIGJ5dGVzO1xyXG4gICAgICAgIH1jYXRjaChleCl7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihgTG9hZFRleHRCeXRlcyA6JHthZGRyZXNzfSA6ICR7ZXh9YClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgbG9hZFNwcml0ZShhZGRyZXNzOnN0cmluZyl7XHJcblxyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgbGV0IHRhc2sgPSBOaWNlVFMuUmVzb3VyY2VNYW5hZ2VyLkxvYWRTcHJpdGUoYWRkcmVzcyk7XHJcbiAgICAgICAgICAgIGxldCBnbyA9IGF3YWl0ICRwcm9taXNlKHRhc2spO1xyXG4gICAgICAgICAgICByZXR1cm4gZ287XHJcblxyXG4gICAgICAgIH1jYXRjaChleCl7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihgTG9hZCBzcHJpdGUgOiR7YWRkcmVzc30gOiAke2V4fWApXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyByZWxlYXNlQWRkcmVzc0dPKGdvOmFueSl7XHJcblxyXG4gICAgICAgIE5pY2VUUy5SZXNvdXJjZU1hbmFnZXIuUmVsZWFzZUFkZHJlc3NHTyhnbyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIFxyXG59IiwiXHJcblxyXG5leHBvcnQgY2xhc3MgU2luZ2xldG9uPFQ+e1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOmFueSA9IG51bGw7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBJbnN0YW5jZTxUPiggYzogeyBuZXcoKTogVCB9ICkgOiBUe1xyXG5cclxuICAgICAgICBpZih0aGlzLmluc3RhbmNlID09IG51bGwpe1xyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlID0gbmV3IGMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IFVuaXR5RW5naW5lIH0gZnJvbSAnY3NoYXJwJztcclxuaW1wb3J0IHsgR2FtZUNvbmZpZyB9IGZyb20gJy4uLy4uL2dsb2JhbC9HYW1lQ29uZmlnJztcclxuZW51bSBMb2dUeXBlIHtcclxuXHRFcnJvciA9IDAsXHJcblx0QXNzZXJ0ID0gMSxcclxuXHRXYXJuaW5nID0gMixcclxuXHRMb2cgPSAzLFxyXG5cdEV4Y2VwdGlvbiA9IDRcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIExvZ2dlcntcclxuICAgIHByaXZhdGUgIHN0YXRpYyAgdW5pdHlfbG9nX3RhcmdldCA9IG51bGw7XHJcblxyXG4gICAgc3RhdGljIGdldFByaW50U3RhY2sodHlwZTogTG9nVHlwZSwgc2hvd1N0YWNrIDogYm9vbGVhbiwgLi4uYXJncykge1xyXG4gICAgICAgIGxldCBtZXNzYWdlID0gJyc7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBhcmdzW2ldO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdvYmplY3QnICYmIExvZ2dlci5MT0dfT0JKRUNUX1RPX0pTT04pIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgKz0gSlNPTi5zdHJpbmdpZnkoZWxlbWVudCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlICs9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGkgPCBhcmdzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgKz0gJyAnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgaWYgKHNob3dTdGFjayB8fCBVbml0eUVuZ2luZS5BcHBsaWNhdGlvbi5pc0VkaXRvcikge1xyXG4gICAgICAgICAgICB2YXIgc3RhY2tzID0gbmV3IEVycm9yKCkuc3RhY2suc3BsaXQoJ1xcbicpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMzsgaSA8IHN0YWNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGluZSA9IHN0YWNrc1tpXTtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgKz0gJ1xcbic7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlICs9IGxpbmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBpZiAoIUxvZ2dlci51bml0eV9sb2dfdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIExvZ2dlci51bml0eV9sb2dfdGFyZ2V0ID0gbmV3IFVuaXR5RW5naW5lLk9iamVjdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG5cdHN0YXRpYyBsb2coLi4uYXJncyk6IHZvaWR7XHJcbiAgICAgICAgaWYoIUdhbWVDb25maWcuZGVidWcpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IG1zZyA9IExvZ2dlci5nZXRQcmludFN0YWNrKExvZ1R5cGUuTG9nLCB0cnVlLCBhcmdzKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xyXG4gICAgfVxyXG5cclxuXHQvKipcclxuXHQgKiBPdXRwdXRzIGEgd2FybmluZyBtZXNzYWdlIHRvIHRoZSBMb2dnZXIuXHJcblx0ICogQHBhcmFtIG1lc3NhZ2UgIGxpc3Qgb2YgSmF2YVNjcmlwdCBvYmplY3RzIHRvIG91dHB1dC4gVGhlIHN0cmluZyByZXByZXNlbnRhdGlvbnMgb2YgZWFjaCBvZiB0aGVzZSBvYmplY3RzIGFyZSBhcHBlbmRlZCB0b2dldGhlciBpbiB0aGUgb3JkZXIgbGlzdGVkIGFuZCBvdXRwdXQuXHJcblx0ICovXHJcblx0c3RhdGljIHdhcm4oLi4uYXJncyk6IHZvaWR7XHJcbiAgICAgICAgaWYoIUdhbWVDb25maWcuZGVidWcpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IG1zZyA9IExvZ2dlci5nZXRQcmludFN0YWNrKExvZ1R5cGUuV2FybmluZywgdHJ1ZSwgYXJncyk7XHJcbiAgICAgICAgY29uc29sZS53YXJuKG1zZyk7XHJcbiAgICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE91dHB1dHMgYW4gZXJyb3IgbWVzc2FnZSB0byB0aGUgTG9nZ2VyLlxyXG5cdCAqIEBwYXJhbSBtZXNzYWdlIEEgbGlzdCBvZiBKYXZhU2NyaXB0IG9iamVjdHMgdG8gb3V0cHV0LiBUaGUgc3RyaW5nIHJlcHJlc2VudGF0aW9ucyBvZiBlYWNoIG9mIHRoZXNlIG9iamVjdHMgYXJlIGFwcGVuZGVkIHRvZ2V0aGVyIGluIHRoZSBvcmRlciBsaXN0ZWQgYW5kIG91dHB1dC5cclxuXHQgKi9cclxuXHRzdGF0aWMgZXJyb3IoLi4uYXJncyk6IHZvaWR7XHJcbiAgICAgICAgaWYoIUdhbWVDb25maWcuZGVidWcpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IG1zZyA9IExvZ2dlci5nZXRQcmludFN0YWNrKExvZ1R5cGUuRXJyb3IsIHRydWUsIGFyZ3MpO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcclxuICAgIH1cclxuXHJcblx0LyoqIE91dHB1dHMgYSBzdGFjayB0cmFjZSB0byB0aGUgTG9nZ2VyLlxyXG5cdCAqIEBwYXJhbSBtZXNzYWdlIEEgbGlzdCBvZiBKYXZhU2NyaXB0IG9iamVjdHMgdG8gb3V0cHV0LiBUaGUgc3RyaW5nIHJlcHJlc2VudGF0aW9ucyBvZiBlYWNoIG9mIHRoZXNlIG9iamVjdHMgYXJlIGFwcGVuZGVkIHRvZ2V0aGVyIGluIHRoZSBvcmRlciBsaXN0ZWQgYW5kIG91dHB1dC5cclxuXHQqL1xyXG5cdHN0YXRpYyB0cmFjZSguLi5hcmdzKTogdm9pZHtcclxuICAgICAgICBpZighR2FtZUNvbmZpZy5kZWJ1ZykgcmV0dXJuO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBtc2cgPSBMb2dnZXIuZ2V0UHJpbnRTdGFjayhMb2dUeXBlLkxvZywgdHJ1ZSwgYXJncyk7XHJcbiAgICAgICAgY29uc29sZS5sb2cobXNnKTtcclxuICAgIH1cclxuXHJcblx0LyoqIExvZyBKYXZhU2NyaXB0IE9iamVjdHMgYXMgSlNPTiBmb3JtYXQgKi9cclxuXHRzdGF0aWMgTE9HX09CSkVDVF9UT19KU09OKC4uLmFyZ3MpOiBib29sZWFue1xyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgU2luZ2xldG9uIH0gZnJvbSBcIi4uL2NvbW1vbi9TaW5nbGV0b25cIjtcclxuaW1wb3J0IHsgT3Bjb2RlIH0gZnJvbSBcIi4uLy4uL2RhdGEvcGIvT3Bjb2RlXCI7XHJcbmltcG9ydCB7IE5ldEVycm9yQ29kZSB9IGZyb20gXCIuL05ldEVycm9yQ29kZVwiO1xyXG5pbXBvcnQgeyBOaWNlVFMgfSBmcm9tIFwiY3NoYXJwXCI7XHJcbmltcG9ydCB7IE1lc3NhZ2VQYXJzZXIgfSBmcm9tIFwiLi9NZXNzYWdlUGFyc2VyXCI7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuLi9sb2dnZXIvTG9nZ2VyXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIE1zZ1BhY2t7XHJcbiAgICBwdWJsaWMgc2VuZFRpbWU6bnVtYmVyO1xyXG4gICAgcHVibGljIGNhbGxiYWNrOkZ1bmN0aW9uO1xyXG4gICAgcHVibGljIHJldHJ5VGltZXM6bnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBieXRlczpVaW50OEFycmF5O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgR2FtZVNlc3Npb24gZXh0ZW5kcyBTaW5nbGV0b248R2FtZVNlc3Npb24+e1xyXG5cclxuICAgIHB1YmxpYyBpZDpudW1iZXIgPSAwOyAgLy9zZXNzaW9uIElEXHJcbiAgICBwcml2YXRlIHJlU2VuZEludGVydmFsOm51bWJlciA9IDEwMDAwOyAvLzEw56eS6YeN5Y+R5LiA5qyhXHJcbiAgICBwcml2YXRlIHRpbWVvdXRJbnRlcnZhbDpudW1iZXIgPSA1MDAwOyAvLzXnp5Lmo4Dmn6XkuIDmrKHmmK/lkKbotoXml7ZcclxuICAgIHByaXZhdGUgbWF4UmVTZW5kVGltZXM6bnVtYmVyID0gNTsgLy/mnIDlpKfph43lj5HmrKHmlbBcclxuICAgIHByaXZhdGUgdGltZW91dElpbWVyOmFueTtcclxuXHJcbiAgICBwcml2YXRlIF9ycGNJZDpudW1iZXIgPSAxO1xyXG4gICAgcHJpdmF0ZSBjaGFubmVsOmFueTtcclxuICAgIHByaXZhdGUgcmVxdWVzdENhbGxiYWNrOk1hcDxudW1iZXIsTXNnUGFjaz4gPSBuZXcgTWFwPG51bWJlcixNc2dQYWNrPigpO1xyXG4gICAgcHJpdmF0ZSBsaXN0ZW5lcnM6TWFwPG51bWJlcixGdW5jdGlvbj4gPSBuZXcgTWFwPG51bWJlcixGdW5jdGlvbj4oKTtcclxuXHJcbiAgICAvL+i/lOWbnueahOacjeWKoeWZqElELCDnsbvlnotcclxuICAgIHByaXZhdGUgX3NlcnZlcklkOm51bWJlciA9IC0xO1xyXG4gICAgcHJpdmF0ZSBfc2VydmVyVHlwZTpudW1iZXIgPSAxO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHJwY0lkKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiArK3RoaXMuX3JwY0lkO1xyXG4gICAgfVxyXG5cclxuICAgIC8vYWRkcmVzcy0+IGlwOnBvcnRcclxuICAgIHB1YmxpYyBjb25uZWN0Q2hhbm5lbChhZGRyZXNzOnN0cmluZywgY29ubkNhYmFjazphbnkpe1xyXG5cclxuICAgICAgICB0aGlzLmNoYW5uZWwgPSBOaWNlVFMuVFNlcnZpY2UuSW5zdGFuY2UuR2V0Q2hhbm5lbCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY2hhbm5lbC5lcnJvckNhbGxiYWNrID0gKGNoYW5uZWw6YW55LCBjb2RlOm51bWJlcik9PntcclxuICAgICAgICAgICAgaWYoY29kZSA9PSBOZXRFcnJvckNvZGUuRVJSX1NvY2tldENvbm5TdWNjKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudGltZW91dElpbWVyID0gc2V0SW50ZXJ2YWwoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrVGltZW91dE1zZygpO1xyXG4gICAgICAgICAgICAgICAgfSwgdGhpcy50aW1lb3V0SW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25uQ2FiYWNrKGNoYW5uZWwsIGNvZGUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jaGFubmVsLnJlYWRDYWxsYmFjayA9IChidWZmZXI6VWludDhBcnJheSk9PntcclxuICAgICAgICAgICAgdGhpcy5vblJlY2VpdmUoYnVmZmVyKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmNoYW5uZWwuQ29ubmVjdChhZGRyZXNzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mjqXmlLbmnI3liqHlmajpgJrnn6VcclxuICAgIHB1YmxpYyBsaXN0ZW4ob3Bjb2RlOm51bWJlcixjYWxsYmFjazpGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMuc2V0KG9wY29kZSwgY2FsbGJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Y+R6YCBcHJvdG91Ymbmtojmga9cclxuICAgIC8v5raI5oGv77yaIHJwY19pZFs0XSAtIG9wY29kZVsyXSAtIHNlcnZlcl9pZFsyXSAtIHNlcnZlcl90eXBlWzFdIC0gXHJcbiAgICBwdWJsaWMgc2VuZChvcGNvZGU6bnVtYmVyLHJwY2lkOm51bWJlciwgbWVzc2FnZTpVaW50OEFycmF5LCBjYWxsQmFjazpGdW5jdGlvbil7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/lsIHoo4Xmtojmga/vvJpcclxuICAgICAgICBsZXQgcnBjQnVmOlVpbnQ4QXJyYXkgPSBNZXNzYWdlUGFyc2VyLmVuY29kZUludChycGNpZCk7IC8vNFxyXG4gICAgICAgIGxldCBvcGNvZGVCdWY6VWludDhBcnJheSA9IE1lc3NhZ2VQYXJzZXIuZW5jb2RlU2hvcnQob3Bjb2RlKTsgLy8yXHJcbiAgICAgICAgbGV0IHNlcnZlcmlkQnVmOlVpbnQ4QXJyYXkgPSBNZXNzYWdlUGFyc2VyLmVuY29kZVNob3J0KHRoaXMuX3NlcnZlcklkKTsgLy8yXHJcbiAgICAgICAgbGV0IHNlcnZlcnR5cGVCdWY6VWludDhBcnJheSA9IE1lc3NhZ2VQYXJzZXIuZW5jb2RlQnl0ZSh0aGlzLl9zZXJ2ZXJUeXBlKTsgLy8xXHJcblxyXG5cclxuICAgICAgICBsZXQgc2VuZEFycmF5OlVpbnQ4QXJyYXkgPSBuZXcgVWludDhBcnJheSg0ICsgMiArIDIgKyAxICttZXNzYWdlLmxlbmd0aCk7XHJcbiAgICAgICAgc2VuZEFycmF5LnNldChycGNCdWYpO1xyXG4gICAgICAgIHNlbmRBcnJheS5zZXQob3Bjb2RlQnVmLCAgICA0KTtcclxuICAgICAgICBzZW5kQXJyYXkuc2V0KHNlcnZlcmlkQnVmLCAgNCArIDIpO1xyXG4gICAgICAgIHNlbmRBcnJheS5zZXQoc2VydmVydHlwZUJ1ZiwgNCArIDIgKyAyKTtcclxuICAgICAgICBzZW5kQXJyYXkuc2V0KG1lc3NhZ2UsICAgICAgIDQgKyAyICsgMiArIDEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGNhbGxCYWNrICE9IG51bGwpe1xyXG4gICAgICAgICAgICBsZXQgbXNnUGFjazpNc2dQYWNrID0gbmV3IE1zZ1BhY2soKTtcclxuICAgICAgICAgICAgbXNnUGFjay5zZW5kVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICBtc2dQYWNrLmNhbGxiYWNrID0gY2FsbEJhY2s7XHJcbiAgICAgICAgICAgIG1zZ1BhY2suYnl0ZXMgPSBzZW5kQXJyYXk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RDYWxsYmFjay5zZXQocnBjaWQsIG1zZ1BhY2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBmb3IobGV0IGkgaW4gc2VuZEFycmF5KXtcclxuICAgICAgICAvLyAgICAgTG9nZ2VyLmxvZyhcIlRTIC0tIHNlbmQgYXJyYXk6IFwiK2kpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvL0xvZ2dlci5sb2coXCJzZW5kIGFycmF5OiBcIitzZW5kQXJyYXkpO1xyXG4gICAgICAgIHRoaXMuY2hhbm5lbC5TZW5kKHNlbmRBcnJheSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZVNlbmQoYnl0ZXM6VWludDhBcnJheSl7XHJcbiAgICAgICAgdGhpcy5jaGFubmVsLlNlbmQoYnl0ZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvblJlY2VpdmUoYnVmZmVyOlVpbnQ4QXJyYXkpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBtc2dCdWYgPSBuZXcgVWludDhBcnJheShidWZmZXIpO1xyXG5cclxuICAgICAgICBsZXQgcnBjaWQgPSBNZXNzYWdlUGFyc2VyLmRlY29kZUludChtc2dCdWYuc3ViYXJyYXkoMCw0KSk7XHJcbiAgICAgICAgbGV0IG9wY29kZSA9IE1lc3NhZ2VQYXJzZXIuZGVjb2RlU2hvcnQobXNnQnVmLnN1YmFycmF5KDQsNikpO1xyXG4gICAgICAgIGxldCBzZXJ2ZXJpZCA9IE1lc3NhZ2VQYXJzZXIuZGVjb2RlU2hvcnQobXNnQnVmLnN1YmFycmF5KDYsOCkpO1xyXG4gICAgICAgIGxldCBzZXJ2ZXJ0eXBlID0gTWVzc2FnZVBhcnNlci5kZWNvZGVCeXRlKG1zZ0J1Zi5zdWJhcnJheSg4LDkpKTtcclxuXHJcbiAgICAgICAgdGhpcy5fc2VydmVySWQgPSBzZXJ2ZXJpZDtcclxuICAgICAgICB0aGlzLl9zZXJ2ZXJUeXBlID0gc2VydmVydHlwZTtcclxuXHJcbiAgICAgICAgbGV0IG1zZ0J5dGVzOlVpbnQ4QXJyYXkgPSBtc2dCdWYuc3ViYXJyYXkoOSk7XHJcblxyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgbGV0IGRlY29kZU1zZyA9ICBPcGNvZGUuZGVjb2RlKG9wY29kZSwgbXNnQnl0ZXMpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGlmKHJwY2lkPT11bmRlZmluZWQgfHwgIXRoaXMucmVxdWVzdENhbGxiYWNrLmhhcyhycGNpZCkpe1xyXG4gICAgICAgICAgICAgICAgLy/mo4Dmn6XmmK/lkKbmmK/mnI3liqHlmajkuIvlj5HnmoTmtojmga9cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMubGlzdGVuZXJzLmhhcyhvcGNvZGUpKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGlzdGVuID0gdGhpcy5saXN0ZW5lcnMuZ2V0KG9wY29kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuKGRlY29kZU1zZy5tc2dPYmopO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbGV0IG1zZ1BhY2s6TXNnUGFjayA9IHRoaXMucmVxdWVzdENhbGxiYWNrLmdldChycGNpZCk7XHJcbiAgICAgICAgICAgICAgICBtc2dQYWNrLmNhbGxiYWNrKGRlY29kZU1zZy5tc2dPYmopOyAgXHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdENhbGxiYWNrLmRlbGV0ZShycGNpZCk7XHJcbiAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1jYXRjaChlKXtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwicGFyc2UgbXNnIGVycm9yLCBvcGNvZGU6XCIrb3Bjb2RlKVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja1RpbWVvdXRNc2coKXtcclxuXHJcbiAgICAgICAgbGV0IGN1cnJUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblxyXG4gICAgICAgIHRoaXMucmVxdWVzdENhbGxiYWNrLmZvckVhY2goKHZhbHVlLCBrZXkpID0+e1xyXG5cclxuICAgICAgICAgICAgaWYodmFsdWUucmV0cnlUaW1lcyA+PSB0aGlzLm1heFJlU2VuZFRpbWVzKSB7XHJcbiAgICAgICAgICAgICAgICAvL+i2hei/h+acgOWkp+mHjeWPkeasoeaVsO+8jOS4ouW8g1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhgTWVzc2FnZSByZXNlbmQgdG9vIG1vcmUsIG9wY29kZToke2tleX0sIGxhc3RzZW5kOiR7dmFsdWUuc2VuZFRpbWV9YCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3RDYWxsYmFjay5kZWxldGUoa2V5KTsgXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKChjdXJyVGltZSAtIHZhbHVlLnNlbmRUaW1lKSA+PSB0aGlzLnJlU2VuZEludGVydmFsKXtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZS5yZXRyeVRpbWVzKys7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUuc2VuZFRpbWUgPSBjdXJyVGltZTtcclxuICAgICAgICAgICAgICAgICAgICAvL+mHjeWPkea2iOaBr1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVTZW5kKHZhbHVlLmJ5dGVzKTtcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIubG9nKGByZXNlbmQgbWVzc2FnZTosIG9wY29kZToke2tleX0sIHJldHJ5IHRpbWVzOiR7dmFsdWUucmV0cnlUaW1lc31gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZGlzY29ubmVjdCgpOnZvaWR7XHJcblxyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lb3V0SWltZXIpO1xyXG5cclxuICAgICAgICB0aGlzLmNoYW5uZWwuRGlzcG9zZSgpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgTmljZVRTIH0gZnJvbSBcImNzaGFycFwiO1xyXG5pbXBvcnQgeyAkcHJvbWlzZSB9IGZyb20gXCJwdWVydHNcIjtcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4uL2xvZ2dlci9Mb2dnZXJcIjtcclxuaW1wb3J0IHsgU2luZ2xldG9uIH0gZnJvbSBcIi4uL2NvbW1vbi9TaW5nbGV0b25cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBIdHRwTWFuYWdlciBleHRlbmRzIFNpbmdsZXRvbjxIdHRwTWFuYWdlcj57XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgYXN5bmMgZ2V0KHVybDpzdHJpbmcpe1xyXG5cclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGxldCB0YXNrPSBOaWNlVFMuSHR0cE1hbmFnZXIuR2V0KHVybClcclxuICAgICAgICAgICAgbGV0IHR4dCA9IGF3YWl0ICRwcm9taXNlKHRhc2spO1xyXG4gICAgICAgICAgICByZXR1cm4gdHh0O1xyXG4gICAgICAgIH1jYXRjaChleCl7XHJcblxyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoYEdldCBlcnJvciA6JHt1cmx9IDogJHtleH1gKVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBwb3N0KHVybDpzdHJpbmcsIGZvcm06c3RyaW5nKXtcclxuXHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICBsZXQgdGFzaz0gTmljZVRTLkh0dHBNYW5hZ2VyLlBvc3QodXJsLCBmb3JtKVxyXG4gICAgICAgICAgICBsZXQgdHh0ID0gYXdhaXQgJHByb21pc2UodGFzayk7XHJcbiAgICAgICAgICAgIHJldHVybiB0eHQ7XHJcblxyXG4gICAgICAgIH1jYXRjaChleCl7XHJcblxyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoYFBvc3QgZXJyb3IgOiR7dXJsfSA6ICR7ZXh9YClcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIiwiXHJcbmV4cG9ydCBjbGFzcyBNZXNzYWdlUGFyc2Vye1xyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGVuY29kZUludChuOm51bWJlcik6VWludDhBcnJheXtcclxuXHJcbiAgICAgICAgbGV0IGJ1ZmZlcjpVaW50OEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoNCk7XHJcbiAgICAgICAgYnVmZmVyWzBdID0gbiA+Pj4gMjQ7XHJcbiAgICAgICAgYnVmZmVyWzFdID0gbiA+Pj4gMTY7XHJcbiAgICAgICAgYnVmZmVyWzJdID0gbiA+Pj4gODtcclxuICAgICAgICBidWZmZXJbM10gPSBuICYgMHhmZjtcclxuXHJcbiAgICAgICAgcmV0dXJuIGJ1ZmZlclxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZGVjb2RlSW50KGJ1ZmZlcjpVaW50OEFycmF5KTpudW1iZXJ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IG4gPSBidWZmZXJbMF0gPDwgMjQgfCBidWZmZXJbMV0gPDwgMTYgfCBidWZmZXJbMl0gPDwgOCB8IGJ1ZmZlclszXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG47XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZW5jb2RlU2hvcnQobjpudW1iZXIpOlVpbnQ4QXJyYXl7XHJcblxyXG4gICAgICAgIGxldCBidWZmZXIgOiBVaW50OEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoMik7XHJcbiAgICAgICAgYnVmZmVyWzBdID0gbiA+Pj4gODtcclxuICAgICAgICBidWZmZXJbMV0gPSBuICYgMHhmZjtcclxuXHJcbiAgICAgICAgcmV0dXJuIGJ1ZmZlcjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBkZWNvZGVTaG9ydChidWZmZXI6VWludDhBcnJheSk6bnVtYmVye1xyXG5cclxuICAgICAgICBsZXQgbiA9IGJ1ZmZlclswXSA8PCA4IHwgYnVmZmVyWzFdO1xyXG5cclxuICAgICAgICByZXR1cm4gbjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBlbmNvZGVCeXRlKG46bnVtYmVyKTpVaW50OEFycmF5e1xyXG5cclxuICAgICAgICBsZXQgYnVmZmVyIDogVWludDhBcnJheSA9IG5ldyBVaW50OEFycmF5KDEpXHJcbiAgICAgICAgYnVmZmVyWzBdID0gbiAmIDB4ZmY7XHJcblxyXG4gICAgICAgIHJldHVybiBidWZmZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBkZWNvZGVCeXRlKGJ1ZmZlcjpVaW50OEFycmF5KTpudW1iZXJ7XHJcblxyXG4gICAgICAgIGxldCBuID0gYnVmZmVyWzBdO1xyXG5cclxuICAgICAgICByZXR1cm4gbjtcclxuICAgIH1cclxuXHJcblxyXG5cclxufSIsIlxyXG5cclxuIGV4cG9ydCBjbGFzcyBOZXRFcnJvckNvZGVcclxuIHtcclxuICAgICBwdWJsaWMgc3RhdGljICBFUlJfU29ja2V0Q29ublN1Y2M6bnVtYmVyID0gMTAwMDAwO1xyXG5cclxuICAgICBwdWJsaWMgc3RhdGljICBFUlJfQ29ubmVjdEdhdGVLZXlFcnJvcjpudW1iZXIgPSAxMDAwMDY7XHJcblxyXG4gICAgIHB1YmxpYyBzdGF0aWMgIEVSUl9QZWVyRGlzY29ubmVjdDpudW1iZXIgICA9IDEwMjAwODtcclxuICAgICBwdWJsaWMgc3RhdGljICBFUlJfU29ja2V0Q2FudFNlbmQ6bnVtYmVyICAgPSAxMDIwMDk7XHJcbiAgICAgcHVibGljIHN0YXRpYyAgRVJSX1NvY2tldEVycm9yOm51bWJlciAgICAgID0gMTAyMDEwO1xyXG4gICAgIHB1YmxpYyBzdGF0aWMgIEVSUl9Tb2NrZXRDb25uRXJyb3I6bnVtYmVyICA9IDEwMjAxMTtcclxuXHJcblxyXG4gICAgIFxyXG5cclxuIH0iLCJcclxuaW1wb3J0IHsgT3Bjb2RlIH0gZnJvbSBcIi4uLy4uL2RhdGEvcGIvT3Bjb2RlXCI7XHJcbmltcG9ydCB7IEdhbWVDb25maWcgfSBmcm9tIFwiLi4vLi4vZ2xvYmFsL0dhbWVDb25maWdcIjtcclxuaW1wb3J0IHsgU2luZ2xldG9uIH0gZnJvbSBcIi4uL2NvbW1vbi9TaW5nbGV0b25cIjtcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4uL2xvZ2dlci9Mb2dnZXJcIjtcclxuaW1wb3J0IHsgR2FtZVNlc3Npb24gfSBmcm9tIFwiLi9HYW1lU2Vzc2lvblwiO1xyXG5pbXBvcnQgeyBOZXRFcnJvckNvZGUgfSBmcm9tIFwiLi9OZXRFcnJvckNvZGVcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgU2Vzc2lvbk1hbmFnZXIgZXh0ZW5kcyBTaW5nbGV0b248U2Vzc2lvbk1hbmFnZXI+e1xyXG5cclxuICAgIHByaXZhdGUgc2Vzc2lvblJlYW06R2FtZVNlc3Npb247XHJcbiAgICBwcml2YXRlIHNlc3Npb25HYXRlOkdhbWVTZXNzaW9uO1xyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHJlYWxtUnBjSUQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZXNzaW9uUmVhbS5ycGNJZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGdhdGVScGNJRCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlc3Npb25HYXRlLnJwY0lkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBjb25uZWN0UmVhbG1TZXJ2ZXIoKTpQcm9taXNlPGJvb2xlYW4+IHtcclxuXHJcbiAgICAgICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZTxib29sZWFuPihyZXNvdmUgPT57XHJcbiAgICAgICAgICAgIHRoaXMuc2Vzc2lvblJlYW0gPSBHYW1lU2Vzc2lvbi5JbnN0YW5jZShHYW1lU2Vzc2lvbikuY29ubmVjdENoYW5uZWwoXHJcbiAgICAgICAgICAgICAgICBHYW1lQ29uZmlnLnJlYWxtU2VydmVySVArXCI6XCIrR2FtZUNvbmZpZy5yZWFsbVNlcnZlclBvcnQsXHJcbiAgICAgICAgICAgICAgICAoY2hhbm5lbDphbnksY29kZTpudW1iZXIpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY29kZSA9PSBOZXRFcnJvckNvZGUuRVJSX1NvY2tldENvbm5TdWNjKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXNzaW9uUmVhbS5pZCA9IGNoYW5uZWwuSWQ7XHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwibG9naW4gcmVhbXNlcnZlciBlcnIsIGNvZGU6IFwiK2NvZGUgKyBcIixpZDpcIitjaGFubmVsLklkKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcHJvbWlzZVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgcHVibGljIGRpc2Nvbm5lY3RSZWFsbVNlcnZlcigpe1xyXG4gICAgICAgIHRoaXMuc2Vzc2lvblJlYW0uZGlzY29ubmVjdCgpO1xyXG4gICAgICAgIHRoaXMuc2Vzc2lvblJlYW0gPSBudWxsO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgc2VuZFJlYWxtTXNnKG9wY29kZTpudW1iZXIsbXNnOmFueSk6UHJvbWlzZTxhbnk+e1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBycGNJRCA9IHRoaXMuc2Vzc2lvblJlYW0ucnBjSWRcclxuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlPGFueT4oKHJlc292ZSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IGJ1ZiA9IE9wY29kZS5lbmNvZGUob3Bjb2RlLCBtc2cpXHJcblxyXG4gICAgICAgICAgICB0aGlzLnNlc3Npb25SZWFtLnNlbmQob3Bjb2RlLCBycGNJRCwgYnVmLCAocmVzcG9uc2U6YW55KT0+e1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJlc292ZShyZXNwb25zZSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gcHJvbWlzZVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgY29ubmVjdEdhdGVTZXJ2ZXIoYWRkcmVzczpzdHJpbmcpOlByb21pc2U8Ym9vbGVhbj57XHJcblxyXG4gICAgICAgIGxldCBwcm9taXNlID0gbmV3IFByb21pc2U8Ym9vbGVhbj4ocmVzb3ZlID0+e1xyXG4gICAgICAgICAgICB0aGlzLnNlc3Npb25HYXRlID0gR2FtZVNlc3Npb24uSW5zdGFuY2UoR2FtZVNlc3Npb24pLmNvbm5lY3RDaGFubmVsKFxyXG4gICAgICAgICAgICAgICAgYWRkcmVzcyxcclxuICAgICAgICAgICAgICAgIChjaGFubmVsOmFueSxjb2RlOm51bWJlcik9PntcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwibG9naW4gR2F0ZSBTZXJ2ZXI6IFwiK2NvZGUpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY29kZSA9PSBOZXRFcnJvckNvZGUuRVJSX1NvY2tldENvbm5TdWNjKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXNzaW9uR2F0ZS5pZCA9IGNoYW5uZWwuSWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc292ZSh0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdmUoZmFsc2UpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJnYXRlIHNlcnZlciBlcnIsIGNvZGU6IFwiK2NvZGUgKyBcIixpZDpcIitjaGFubmVsLklkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBwcm9taXNlXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBkaXNjb25uZWN0R2F0ZVNlcnZlcigpe1xyXG4gICAgICAgIHRoaXMuc2Vzc2lvbkdhdGUuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgIHRoaXMuc2Vzc2lvbkdhdGUgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBzZW5kR2F0ZU1zZyhvcGNvZGU6bnVtYmVyLCBtc2c6YW55KTpQcm9taXNlPGFueT57XHJcblxyXG4gICAgICAgIGxldCBycGNJRCA9IHRoaXMuc2Vzc2lvbkdhdGUucnBjSWRcclxuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlPGFueT4oKHJlc292ZSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IGJ1ZiA9IE9wY29kZS5lbmNvZGUob3Bjb2RlLCBtc2cpXHJcblxyXG4gICAgICAgICAgICB0aGlzLnNlc3Npb25HYXRlLnNlbmQob3Bjb2RlLCBycGNJRCwgYnVmLCAocmVzcG9uc2U6YW55KT0+e1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJlc292ZShyZXNwb25zZSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gcHJvbWlzZVxyXG5cclxuICAgIH1cclxufSAgIFxyXG4iLCJpbXBvcnQgeyBVbml0eUVuZ2luZSB9IGZyb20gXCJjc2hhcnBcIjtcclxuaW1wb3J0IHsgUyB9IGZyb20gXCIuLi8uLi9nbG9iYWwvR2FtZUNvbmZpZ1wiO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VTY2VuZXtcclxuXHJcbiAgICBwcml2YXRlIHByZWxvYWRQcmVmYWI6TWFwPHN0cmluZyxudW1iZXI+O1xyXG4gICAgcHJpdmF0ZSBzY2VuZUluc3RhbmNlOlVuaXR5RW5naW5lLlJlc291cmNlTWFuYWdlbWVudC5SZXNvdXJjZVByb3ZpZGVycy5TY2VuZUluc3RhbmNlXHJcblxyXG4gICAgcHVibGljIGZpbmlzaENvdW50ID0gMDtcclxuICAgIHB1YmxpYyB0b3RhbENvdW50ID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMucHJlbG9hZFByZWZhYiA9IG5ldyBNYXA8c3RyaW5nLG51bWJlcj4oKTtcclxuICAgICAgICB0aGlzLmZpbmlzaENvdW50ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkUHJlbG9hZFByZWZhYihhZGRyZXNzOnN0cmluZywgaW5zdENvdW50KXtcclxuICAgICAgICBpZighdGhpcy5wcmVsb2FkUHJlZmFiLmhhcyhhZGRyZXNzKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucHJlbG9hZFByZWZhYi5zZXQoYWRkcmVzcywgaW5zdENvdW50KTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucHJlbG9hZFByZWZhYi5zZXQoYWRkcmVzcywgdGhpcy5wcmVsb2FkUHJlZmFiLmdldChhZGRyZXNzKSArIGluc3RDb3VudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFNjZW5lSW5zdGFuY2Uoc2NlbmVJbnN0YW5jZTpVbml0eUVuZ2luZS5SZXNvdXJjZU1hbmFnZW1lbnQuUmVzb3VyY2VQcm92aWRlcnMuU2NlbmVJbnN0YW5jZSl7XHJcbiAgICAgICAgdGhpcy5zY2VuZUluc3RhbmNlID0gc2NlbmVJbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3Qgb25FbnRlcigpO1xyXG4gICAgcHVibGljIGFic3RyYWN0IG9uQ29tcGxldGUoKTtcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBvbkxlYXZlKCk7XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGxvYWRBc3NldHNBc3luYygpe1xyXG5cclxuICAgICAgICB0aGlzLnRvdGFsQ291bnQgPSB0aGlzLnByZWxvYWRQcmVmYWIuc2l6ZTtcclxuXHJcbiAgICAgICAgbGV0IHByZW1pc2VzID0gW107XHJcblxyXG4gICAgICAgIHRoaXMucHJlbG9hZFByZWZhYi5mb3JFYWNoKCh2YWx1ZSwga2V5KT0+e1xyXG4gICAgICAgICAgICBsZXQgcHJlbWlzZSA9IFMuR2FtZU9iamVjdFBvb2wucHJlTG9hZEdhbWVPYmplY3RBc3luYyhrZXksIHZhbHVlLCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmlzaENvdW50Kys7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHByZW1pc2VzLnB1c2gocHJlbWlzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKHByZW1pc2VzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25EZXN0cm95KCl7XHJcbiBcclxuICAgICAgICAvL+a4heeQhui1hOa6kOe8k+WtmFxyXG4gICAgICAgIFMuR2FtZU9iamVjdFBvb2wuY2xlYW51cCh0cnVlKTtcclxuXHJcbiAgICAgICAgLy/ljbjovb3lnLrmma9cclxuICAgICAgICBTLlJlc01hbmFnZXIudW5sb2FkU2NlbmUodGhpcy5zY2VuZUluc3RhbmNlKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnByZWxvYWRQcmVmYWIuY2xlYXIoKTtcclxuICAgIH1cclxufSIsImV4cG9ydCAgY2xhc3MgU2NlbmVEZWZ7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBMb2FkaW5nU2NlbmU6c3RyaW5nID0gXCJMb2FkaW5nU2NlbmVcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgR2FtZVN0YXJ0OnN0cmluZyA9IFwiR2FtZVN0YXJ0U2NlbmVcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgRmx5QmlyZDpzdHJpbmcgPSBcIkZseUJpcmRTY2VuZVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBMYXVuY2hTY2VuZTpzdHJpbmcgPSBcIkxhdW5jaFNjZW5lXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIEhvbWVTY2VuZTpzdHJpbmcgPSBcIkhvbWVTY2VuZVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBMb2dpblNjZW5lOnN0cmluZyA9IFwiTG9naW5TY2VuZVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBQdmVTY2VuZTpzdHJpbmcgPSBcIlB2ZVNjZW5lXCI7XHJcbn1cclxuIiwiaW1wb3J0IHsgQmFzZVNjZW5lIH0gZnJvbSBcIi4vQmFzZVNjZW5lXCI7XHJcbmltcG9ydCB7IFNjZW5lRGVmIH0gZnJvbSBcIi4vU2NlbmVEZWZcIjtcclxuaW1wb3J0IHsgR2FtZVN0YXJ0U2NlbmUgfSBmcm9tIFwiLi4vLi4vZ2FtZS9tb2R1bGUvZ2FtZXN0YXJ0L3NjZW5lL0dhbWVTdGFydFNjZW5lXCI7XHJcbmltcG9ydCB7IEZseUJpcmRTY2VuZSB9IGZyb20gXCIuLi8uLi9nYW1lL21vZHVsZS9mbHliaXJkL3NjZW5lL0ZseUJpcmRTY2VuZVwiO1xyXG5cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgU2NlbmVGYWN0b3J5e1xyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZVNjZW5lKHNjZW5lTmFtZTpzdHJpbmcpOkJhc2VTY2VuZXtcclxuXHJcbiAgICAgICAgbGV0IHNjZW5lOkJhc2VTY2VuZSA9IG51bGw7XHJcblxyXG4gICAgICAgIHN3aXRjaCAoc2NlbmVOYW1lKXtcclxuICAgICAgICAgICAgY2FzZSBTY2VuZURlZi5HYW1lU3RhcnQ6XHJcbiAgICAgICAgICAgICAgICBzY2VuZSA9IG5ldyBHYW1lU3RhcnRTY2VuZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2NlbmVEZWYuRmx5QmlyZDpcclxuICAgICAgICAgICAgICAgIHNjZW5lID0gbmV3IEZseUJpcmRTY2VuZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc2NlbmU7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBDb21tb25VSSB9IGZyb20gXCIuLi8uLi9kYXRhL3VpL2NvbW1vblwiO1xyXG5pbXBvcnQgeyBVSU1lc3NhZ2UgfSBmcm9tIFwiLi4vLi4vZ2FtZS9ldmVudC9VSU1lc3NhZ2VcIjtcclxuaW1wb3J0IHsgUyB9IGZyb20gXCIuLi8uLi9nbG9iYWwvR2FtZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBTaW5nbGV0b24gfSBmcm9tIFwiLi4vY29tbW9uL1NpbmdsZXRvblwiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi4vbG9nZ2VyL0xvZ2dlclwiO1xyXG5pbXBvcnQgeyBCYXNlU2NlbmUgfSBmcm9tIFwiLi9CYXNlU2NlbmVcIjtcclxuaW1wb3J0IHsgU2NlbmVGYWN0b3J5IH0gZnJvbSBcIi4vU2NlbmVGYWN0b3J5XCI7XHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgU2NlbmVNYW5hZ2VyIGV4dGVuZHMgU2luZ2xldG9uPFNjZW5lTWFuYWdlcj57XHJcblxyXG4gICAgcHJpdmF0ZSBjdXJyZW50U2NlbmU6QmFzZVNjZW5lID0gbnVsbDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGxvYWRTY2VuZShzY2VuZTpzdHJpbmcpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRyeXtcclxuXHJcbiAgICAgICAgICAgIC8v5omT5byATG9hZGluZ+eVjOmdolxyXG4gICAgICAgICAgICBTLlVJTWFuYWdlci5vcGVuTG9hZGluZyhDb21tb25VSS5QYWNrYWdlTmFtZSwgQ29tbW9uVUkuVUlMb2FkaW5nVmlldyk7XHJcblxyXG4gICAgICAgICAgICAvL+a4heeQhuaXp+WcuuaZr1xyXG4gICAgICAgICAgICBpZih0aGlzLmN1cnJlbnRTY2VuZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZS5vbkxlYXZlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZS5vbkRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy/lvIDlp4vliqDovb3lnLrmma9cclxuICAgICAgICAgICAgbGV0IHNjZW5lSW5zdGFuY2UgPSBhd2FpdCBTLlJlc01hbmFnZXIubG9hZFNjZW5lKHNjZW5lKTtcclxuXHJcbiAgICAgICAgICAgIC8v5byA5aeL5Yqg6L296L+b5YWl5Zy65pmv55qE6LWE5rqQXHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNjZW5lID0gIFNjZW5lRmFjdG9yeS5jcmVhdGVTY2VuZShzY2VuZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNjZW5lLnNldFNjZW5lSW5zdGFuY2Uoc2NlbmVJbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNjZW5lLm9uRW50ZXIoKTtcclxuXHJcbiAgICAgICAgICAgIC8v6K6+572u5b2T5YmN5Zy65pmv5Yqg6L296L+b5bqmVGltZXJcclxuICAgICAgICAgICAgbGV0IHByb2dyZXNzSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKT0+e1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBwcm9ncmVzcyA9IHRoaXMuY3VycmVudFNjZW5lLmZpbmlzaENvdW50L3RoaXMuY3VycmVudFNjZW5lLnRvdGFsQ291bnQ7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwicHJvZ3Jlc3M6XCIrcHJvZ3Jlc3MgKyBcIiA9IFwiK3RoaXMuY3VycmVudFNjZW5lLmZpbmlzaENvdW50ICsgXCIgPSBcIit0aGlzLmN1cnJlbnRTY2VuZS50b3RhbENvdW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICBTLlVJTWVzc2FnZU1hbmdlci5icm9hZGNhc3QoXHJcbiAgICAgICAgICAgICAgICAgICAgVUlNZXNzYWdlLk1TR19TQ0VORV9QUk9HUkVTUyxcclxuICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcyoxMDApO1xyXG5cclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuXHJcbiAgICAgICAgICAgIC8v5Yqg6L296LWE5rqQXHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY3VycmVudFNjZW5lLmxvYWRBc3NldHNBc3luYygpO1xyXG5cclxuICAgICAgICAgICAgLy/liqDovb3lrozmiJBcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChwcm9ncmVzc0ludGVydmFsKVxyXG5cclxuICAgICAgICAgICAgLy/lhbPpl63miYDmnIlQYWdlXHJcbiAgICAgICAgICAgIFMuVUlNYW5hZ2VyLmNsb3NlQWxsUGFuZWxzKCk7XHJcblxyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmN1cnJlbnRTY2VuZS5vbkNvbXBsZXRlKClcclxuICAgICAgICAgICAgUy5VSU1hbmFnZXIuY2xvc2VMb2FkaW5nKCk7XHJcblxyXG4gICAgICAgIH1jYXRjaChleCl7XHJcbiAgICAgICAgICAgIExvZ2dlci5sb2coXCJsb2FkIHNjZW5lIGV4Y2VwOlwiK2V4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBcclxufSIsIlxyXG5leHBvcnQgY2xhc3MgVUlCYXNlIHtcclxuXHJcbiAgICBwdWJsaWMgZnVpOmFueTsgIC8vRmFpcnlHVUkg5a+56LGhXHJcblxyXG5cclxuICAgIC8v57uR5a6aRmFpcnlHVUnlhYPku7ZcclxuICAgIHB1YmxpYyBiaW5kQWxsKHRhcmdldDphbnkpOnZvaWR7XHJcbiAgICAgICAgZm9yKGxldCBrIGluIHRhcmdldFtcImJpbmRlcnNcIl0pe1xyXG4gICAgICAgICAgICBsZXQgZmd1aU5hbWUgPSB0aGlzW1wiYmluZGVyc1wiXVtrXTtcclxuICAgICAgICAgICAgdGhpc1trXSA9IHRoaXMuZnVpLkdldENoaWxkKGZndWlOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgICAgIFxyXG5cclxufSIsIlxyXG5cclxuXHJcbmV4cG9ydCBlbnVtIFVJVHlwZURlZntcclxuICAgIFVua293biA9IDAsXHJcbiAgICBQYWdlID0gMSxcclxuICAgIFdpbmRvdz0yLFxyXG4gICAgV2lkZ2V0ID0gMyxcclxuICAgIExvYWRpbmcgPTRcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFVJTGF5ZXJEZWZ7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBCYWNrZ3JvdW5kOm51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgc3RhdGljIFBhZ2U6bnVtYmVyID0gMTAwMDtcclxuICAgIHB1YmxpYyBzdGF0aWMgTm9ybWFsV2luZG93Om51bWJlciA9IDIwMDA7XHJcbiAgICBwdWJsaWMgc3RhdGljIFRvcFdpbmRvdzpudW1iZXIgPSAzMDAwO1xyXG4gICAgcHVibGljIHN0YXRpYyBXaWRnZXQ6bnVtYmVyID0gNDAwMDtcclxuICAgIHB1YmxpYyBzdGF0aWMgTG9hZGluZzpudW1iZXIgPSA1MDAwO1xyXG4gICAgcHVibGljIHN0YXRpYyBVbmtvd246bnVtYmVyID0gOTk5OTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljICBnZXREZWZhdWx0TGF5ZXIodHlwZTpVSVR5cGVEZWYpOm51bWJlcntcclxuXHJcbiAgICAgICAgc3dpdGNoKHR5cGUpe1xyXG4gICAgICAgICAgICBjYXNlIFVJVHlwZURlZi5Mb2FkaW5nOiByZXR1cm4gdGhpcy5Mb2FkaW5nO1xyXG4gICAgICAgICAgICBjYXNlIFVJVHlwZURlZi5XaWRnZXQ6IHJldHVybiB0aGlzLldpZGdldDtcclxuICAgICAgICAgICAgY2FzZSBVSVR5cGVEZWYuV2luZG93OiByZXR1cm4gdGhpcy5Ob3JtYWxXaW5kb3c7XHJcbiAgICAgICAgICAgIGNhc2UgVUlUeXBlRGVmLlBhZ2U6IHJldHVybiB0aGlzLlBhZ2U7XHJcbiAgICAgICAgICAgIGNhc2UgVUlUeXBlRGVmLlVua293bjogcmV0dXJuIHRoaXMuVW5rb3duO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gdGhpcy5Vbmtvd247IFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBVSUNvbURlZnN7XHJcbiAgICBwdWJsaWMgc3RhdGljIEJhY2tCdG4gPSBcImJhY2tfYnRuXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFdpbmRvd0Nsb3NlQnRuID0gXCJ3aW5fY2xvc2VfYnRuXCI7XHJcbn1cclxuXHJcblxyXG5cclxuIiwiXHJcbmltcG9ydCB7IFVJUGFuZWwgfSBmcm9tIFwiLi9VSVBhbmVsXCI7XHJcbmltcG9ydCB7IFVJTG9hZGluZyB9IGZyb20gXCIuL1VJTGliL1VJTG9hZGluZ1wiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi4vbG9nZ2VyL0xvZ2dlclwiO1xyXG5pbXBvcnQgeyBDb21tb25VSSB9IGZyb20gXCIuLi8uLi9kYXRhL3VpL2NvbW1vblwiO1xyXG5pbXBvcnQgeyBGbHlCaXJkVUkgfSBmcm9tIFwiLi4vLi4vZGF0YS91aS9GbHlCaXJkXCI7XHJcbmltcG9ydCB7IEdhbWVTdGFydFVJIH0gZnJvbSBcIi4uLy4uL2RhdGEvdWkvR2FtZVN0YXJ0XCI7XHJcbmltcG9ydCB7IFVJU3RhcnRWaWV3IH0gZnJvbSBcIi4uLy4uL2dhbWUvbW9kdWxlL2dhbWVzdGFydC91aS9VSVN0YXJ0Vmlld1wiO1xyXG5pbXBvcnQgeyBVSUZseUJpcmRNYWluVmlldyB9IGZyb20gXCIuLi8uLi9nYW1lL21vZHVsZS9mbHliaXJkL3VpL1VJRmx5QmlyZE1haW5WaWV3XCI7XHJcbmltcG9ydCB7IFVJRmx5QmlyZE92ZXJXaW5kb3cgfSBmcm9tIFwiLi4vLi4vZ2FtZS9tb2R1bGUvZmx5QmlyZC91aS9VSUZseUJpcmRPdmVyV2luZG93XCI7XHJcblxyXG5cclxuXHJcbmNvbnN0IENTID0gcmVxdWlyZSgnY3NoYXJwJyk7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFVJRmFjdG9yeXtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHVpQ2FjaGU6TWFwPHN0cmluZyxVSVBhbmVsPiA9IG5ldyBNYXA8c3RyaW5nLFVJUGFuZWw+KCk7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVVSShwa2c6c3RyaW5nLCBuYW1lOnN0cmluZyl7XHJcbiAgICAgICAgTG9nZ2VyLmxvZyhgY3JlYXRlIFVJOiAke3BrZ306JHtuYW1lfWApXHJcbiAgICAgICAgbGV0IGNvbXAgPSBDUy5GYWlyeUdVSS5VSVBhY2thZ2UuQ3JlYXRlT2JqZWN0KHBrZywgbmFtZSkuYXNDb21cclxuICAgICAgICBcclxuICAgICAgICBsZXQgdWk6VUlQYW5lbCA9IHRoaXMudWlDYWNoZS5nZXQobmFtZSk7XHJcblxyXG4gICAgICAgIGlmKCF1aSl7XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2gocGtnKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgQ29tbW9uVUkuUGFja2FnZU5hbWU6XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChuYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBDb21tb25VSS5VSUxvYWRpbmdWaWV3OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWkgPSBuZXcgVUlMb2FkaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGNhc2UgRmx5QmlyZFVJLlBhY2thZ2VOYW1lOlxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAobmFtZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgRmx5QmlyZFVJLlVJTWFpblZJZXc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aSA9IG5ldyBVSUZseUJpcmRNYWluVmlldygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgRmx5QmlyZFVJLlVJT3ZlcldpbmRvdzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpID0gbmV3IFVJRmx5QmlyZE92ZXJXaW5kb3coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHYW1lU3RhcnRVSS5QYWNrYWdlTmFtZTpcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG5hbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdhbWVTdGFydFVJLlVJU3RhcnRWaWV3OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWkgPSBuZXcgVUlTdGFydFZpZXcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVpQ2FjaGUuc2V0KG5hbWUsIHVpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodWkhPW51bGwpe1xyXG4gICAgICAgICAgICB1aS5mdWkgPSBjb21wO1xyXG4gICAgICAgICAgICB1aS5uYW1lID0gbmFtZTtcclxuICAgICAgICAgICAgdWkucGtnTmFtZSA9IHBrZztcclxuXHJcbiAgICAgICAgICAgIC8v57uR5a6aRmFpcnlHVUnmjqfku7ZcclxuICAgICAgICAgICAgdWkuYmluZEFsbCh1aSk7XHJcbiAgICAgICAgICAgIHVpLmF3YWtlKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihgbm90IGNyZWF0ZSB1aTogJHtwa2d9LSR7bmFtZX1gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB1aTtcclxuICAgIH1cclxuXHJcblxyXG5cclxufSIsImltcG9ydCB7IFVJUGFuZWwgfSBmcm9tIFwiLi4vVUlQYW5lbFwiO1xyXG5pbXBvcnQgeyBVSVR5cGVEZWYgfSBmcm9tIFwiLi4vVUlEZWZpbmVcIjtcclxuaW1wb3J0IHsgRmFpcnlHVUkgfSBmcm9tIFwiY3NoYXJwXCI7XHJcbmltcG9ydCB7IGJpbmRlciB9IGZyb20gXCIuLi8uLi9jb21tb24vTmljZURlY29yYXRvclwiO1xyXG5pbXBvcnQgeyBVSU1lc3NhZ2UgfSBmcm9tIFwiLi4vLi4vLi4vZ2FtZS9ldmVudC9VSU1lc3NhZ2VcIjtcclxuaW1wb3J0IHsgUyB9IGZyb20gXCIuLi8uLi8uLi9nbG9iYWwvR2FtZUNvbmZpZ1wiO1xyXG5cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgIFVJTG9hZGluZyBleHRlbmRzIFVJUGFuZWx7XHJcblxyXG5cclxuICAgIEBiaW5kZXIoXCJsb2FkaW5nX3ByZWdyZXNzXCIpXHJcbiAgICBwdWJsaWMgcHJvZ3Jlc3NMb2FkaW5nOiBGYWlyeUdVSS5HUHJvZ3Jlc3NCYXI7XHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgb25Bd2FrZSgpOiB2b2lkIHtcclxuICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IHVpVHlwZSgpOiBVSVR5cGVEZWYgeyAgICBcclxuICAgICAgICByZXR1cm4gVUlUeXBlRGVmLkxvYWRpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU2hvdyhhcmc6YW55KTp2b2lke1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NMb2FkaW5nLnZhbHVlID0gMDtcclxuICAgICAgICB0aGlzLnByb2dyZXNzTG9hZGluZy52aXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgUy5VSU1lc3NhZ2VNYW5nZXIuYWRkTGlzdGVuZXIoXHJcbiAgICAgICAgICAgIFVJTWVzc2FnZS5NU0dfU0NFTkVfUFJPR1JFU1MsXHJcbiAgICAgICAgICAgIHRoaXMsXHJcbiAgICAgICAgICAgIChwcm9ncmVzczpudW1iZXIpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzTG9hZGluZy5Ud2VlblZhbHVlKHByb2dyZXNzLCAwLjEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25DbG9zZShhcmc6YW55KTp2b2lke1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NMb2FkaW5nLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICBTLlVJTWVzc2FnZU1hbmdlci5yZW1vdmVMaXN0ZW5lckJ5Q29kZShcclxuICAgICAgICAgICAgVUlNZXNzYWdlLk1TR19TQ0VORV9QUk9HUkVTU1xyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG5cclxufSIsIlxyXG5pbXBvcnQgeyBTaW5nbGV0b24gfSBmcm9tICcuLi9jb21tb24vU2luZ2xldG9uJztcclxuaW1wb3J0IHsgVUlMb2FkaW5nIH0gZnJvbSAnLi9VSUxpYi9VSUxvYWRpbmcnO1xyXG5pbXBvcnQgeyBVSVdpbmRvdyB9IGZyb20gJy4vVUlXaW5kb3cnO1xyXG5pbXBvcnQgeyBVSVdpZGdlIH0gZnJvbSAnLi9VSVdpZGdlJztcclxuaW1wb3J0IHsgVUlQYW5lbCB9IGZyb20gJy4vVUlQYW5lbCc7XHJcbmltcG9ydCB7IFVJRmFjdG9yeSB9IGZyb20gJy4vVUlGYWN0b3J5JztcclxuaW1wb3J0IHsgUyB9IGZyb20gJy4uLy4uL2dsb2JhbC9HYW1lQ29uZmlnJztcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnLi4vbG9nZ2VyL0xvZ2dlcic7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFVJUGFnZVRyYWNre1xyXG4gICAgcHVibGljIHBrZzpzdHJpbmc7XHJcbiAgICBwdWJsaWMgbmFtZTpzdHJpbmc7XHJcbiAgICBwdWJsaWMgYXJnOmFueTtcclxuICAgIHB1YmxpYyB1aTpVSVBhbmVsO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFVJTWFuYWdlciBleHRlbmRzIFNpbmdsZXRvbjxVSU1hbmFnZXI+e1xyXG5cclxuICAgIHByaXZhdGUgIG1fcGFnZVRyYWNrU3RhY2s6QXJyYXk8VUlQYWdlVHJhY2s+O1xyXG4gICAgcHJpdmF0ZSBtX2N1cnJlbnRQYWdlOlVJUGFnZVRyYWNrO1xyXG4gICAgcHJpdmF0ZSBtX2xhc3RTY2Vuc2VQYWdlOlVJUGFnZVRyYWNrO1xyXG5cclxuICAgIHByaXZhdGUgbV9saXN0TG9hZGVkUGFuZWw6QXJyYXk8VUlQYW5lbD47XHJcblxyXG4gICAgcHJpdmF0ZSBtX2xvYWRpbmdQYWdlOlVJUGFuZWw7XHJcbiAgICBwcml2YXRlIG1fZ21QYWdlOlVJUGFuZWw7XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5tX3BhZ2VUcmFja1N0YWNrID0gbmV3IEFycmF5PFVJUGFnZVRyYWNrPigpO1xyXG4gICAgICAgIHRoaXMubV9saXN0TG9hZGVkUGFuZWwgPSBuZXcgQXJyYXk8VUlQYW5lbD4oKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShkZWx0YTpudW1iZXIpe1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tX2xpc3RMb2FkZWRQYW5lbC5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICB0aGlzLm1fbGlzdExvYWRlZFBhbmVsW2ldLnVwZGF0ZShkZWx0YSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubV9jdXJyZW50UGFnZT8udWk/LnVwZGF0ZShkZWx0YSlcclxuICAgICAgICB0aGlzLm1fbGFzdFNjZW5zZVBhZ2U/LnVpPy51cGRhdGUoZGVsdGEpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkaXN0cm95UGFuZWwocGFuZWw6VUlQYW5lbCl7XHJcbiAgICAgICAgaWYocGFuZWwuaXNPcGVuKXtcclxuICAgICAgICAgICAgcGFuZWwuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/ljbjovb3otYTmupBcclxuICAgICAgICBTLlJlc01hbmFnZXIucmVsZWFzZUZhaXJ5R1VJUGFja2FnZShwYW5lbC5wa2dOYW1lKTtcclxuICAgICAgICBwYW5lbC5kaXNwb3NlKCk7ICBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRpc3Ryb3lBbGxMb2FkZWRQYW5lbCgpOnZvaWR7XHJcbiAgICAgICAgZm9yKGxldCBpPSB0aGlzLm1fbGlzdExvYWRlZFBhbmVsLmxlbmd0aC0xOyBpPj0wOyBpLS0pe1xyXG4gICAgICAgICAgICBsZXQgcGFuZWwgPSB0aGlzLm1fbGlzdExvYWRlZFBhbmVsW2ldO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kaXN0cm95UGFuZWwocGFuZWwpO1xyXG4gICAgICAgICAgICB0aGlzLm1fbGlzdExvYWRlZFBhbmVsLnNwbGljZShpLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFuKCk6dm9pZHtcclxuXHJcbiAgICAgICAgdGhpcy5kaXN0cm95QWxsTG9hZGVkUGFuZWwoKTtcclxuXHJcbiAgICAgICAgdGhpcy5tX3BhZ2VUcmFja1N0YWNrLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5tX2xpc3RMb2FkZWRQYW5lbC5sZW5ndGggPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRQYW5lbFVJKG5hbWU6c3RyaW5nKTpVSVBhbmVse1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IHBhbmVsIG9mIHRoaXMubV9saXN0TG9hZGVkUGFuZWwpIHtcclxuICAgICAgICAgICAgaWYocGFuZWwubmFtZSA9PSBuYW1lKXtcclxuXHJcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwiZmluZCBwYW5lbCBpbiBjYWNoZTogXCIrbmFtZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhbmVsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBvcGVuKHBrZzpzdHJpbmcsIG5hbWU6c3RyaW5nLCBhcmc/OmFueSl7XHJcbiAgIFxyXG4gICAgICAgIGxldCB1aTphbnkgPSB0aGlzLmdldFBhbmVsVUkobmFtZSk7XHJcblxyXG4gICAgICAgIGlmKHVpID09IG51bGwpe1xyXG4gICAgICAgICAgICAvL+WKoOi9vSBwYWNrYWdlXHJcbiAgICAgICAgICAgIGF3YWl0IFMuUmVzTWFuYWdlci5sb2FkRmFpcnlHVUlQYWNrYWdlKHBrZyk7XHJcbiAgICAgICAgICAgIHVpID0gVUlGYWN0b3J5LmNyZWF0ZVVJKHBrZywgbmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMubV9saXN0TG9hZGVkUGFuZWwucHVzaCh1aSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih1aSAhPSBudWxsKXtcclxuICAgICAgICAgICAgLy8gIyMjICB1aSBhcyBhbnkg6LCD55So56eB5pyJ5pa55rOVXHJcbiAgICAgICAgICAgICh1aSBhcyBhbnkpLl9pbnRlcm5hbE9wZW4oYXJnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB1aTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBvcGVuUGFnZVdvcmtlcihwa2c6c3RyaW5nLCBwYWdlOnN0cmluZywgYXJnPzphbnkpe1xyXG5cclxuICAgICAgICAvL+iuvue9riBtX2N1cnJlbnRQYWdlXHJcbiAgICAgICAgdGhpcy5tX2N1cnJlbnRQYWdlID0gbmV3IFVJUGFnZVRyYWNrKCk7XHJcbiAgICAgICBcclxuICAgICAgICB0aGlzLm1fY3VycmVudFBhZ2UucGtnID0gcGtnO1xyXG4gICAgICAgIHRoaXMubV9jdXJyZW50UGFnZS5uYW1lID0gcGFnZTtcclxuICAgICAgICB0aGlzLm1fY3VycmVudFBhZ2UuYXJnID0gYXJnO1xyXG5cclxuICAgICAgICAvL+aJk+W8gOaWsFBhZ2VcclxuICAgICAgICBhd2FpdCBTLlJlc01hbmFnZXIubG9hZEZhaXJ5R1VJUGFja2FnZShwa2cpO1xyXG4gICAgICAgIGxldCB1aSA9IFVJRmFjdG9yeS5jcmVhdGVVSShwa2csIHBhZ2UpO1xyXG4gICAgICAgICh1aSBhcyBhbnkpLl9pbnRlcm5hbE9wZW4oYXJnKTtcclxuXHJcbiAgICAgICAgLy/kv53lrZjliLAgbV9jdXJyZW50UGFnZVxyXG4gICAgICAgIHRoaXMubV9jdXJyZW50UGFnZS51aSA9IHVpO1xyXG5cclxuICAgICAgICAvL+mUgOavgeW9k+WJjXBhZ2Ug5Lit5omT5byA55qE5ZCE6IeqUGFuZWxzXHJcbiAgICAgICAgdGhpcy5kaXN0cm95QWxsTG9hZGVkUGFuZWwoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9jdXJyZW50UGFnZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVVJUGFnZVxyXG4gICAgLy/miZPlvIDlnLrmma/pobXpnaIs5q2k6aG16Z2i5LiN6K6h5YWl6aG16Z2i5qCILOaXoOi/lOWbnuS4iuS4gOmdouaMiemSrlxyXG4gICAgcHVibGljIGFzeW5jIG9wZW5QYWdlSW5TY2VuZShwa2c6c3RyaW5nLCBwYWdlOnN0cmluZywgYXJnPzphbnkpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBfb3BlblBhZ2UgPSBhd2FpdCB0aGlzLm9wZW5QYWdlV29ya2VyKHBrZywgcGFnZSwgYXJnKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5tX2xhc3RTY2Vuc2VQYWdlKXtcclxuICAgICAgICAgICAgdGhpcy5kaXN0cm95UGFuZWwodGhpcy5tX2xhc3RTY2Vuc2VQYWdlLnVpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tX2xhc3RTY2Vuc2VQYWdlID0gX29wZW5QYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5omT5byA6aG16Z2iLCDkvJrlhbPpl63kuIrkuIDkuKrpobXpnaLkuIrnmoTmiYDmnInnqpflj6MsV2lkaWdldOetiVxyXG4gICAgcHVibGljIGFzeW5jIG9wZW5QYWdlKHBrZzpzdHJpbmcsIG5hbWU6c3RyaW5nLCBhcmc/OmFueSl7XHJcblxyXG4gICAgICAgIC8vMSwg5qOA5p+l5qCI5Lit5piv5ZCm5a2Y5Zyo5q2k6aG16Z2iXHJcbiAgICAgICAgbGV0IGxlbiA9IHRoaXMubV9wYWdlVHJhY2tTdGFjay5sZW5ndGg7XHJcbiAgICAgICAgZm9yKGxldCBpID0gbGVuLTE7IGkgPj0gMCA7aS0tKXtcclxuICAgICAgICAgICAgbGV0IHRyYWNrID0gdGhpcy5tX3BhZ2VUcmFja1N0YWNrW2ldO1xyXG4gICAgICAgICAgICBpZih0cmFjay5wa2cgPT0gcGtnICYmIHRyYWNrLm5hbWUgPT0gbmFtZSl7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzdHJveUFsbExvYWRlZFBhbmVsKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3Ryb3lQYW5lbCh0aGlzLm1fY3VycmVudFBhZ2UudWkpO1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRyYWNrLnVpLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdHJhY2sudWkub25TaG93KHRyYWNrLmFyZyk7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL+WNuOi9veatpOmhteagiOS4iumdoueahOeVjOmdolxyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBqID0gbGVuIC0xOyBqID4gaTsgai0tKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGVsX3RyYWNrID0gdGhpcy5tX3BhZ2VUcmFja1N0YWNrW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzdHJveVBhbmVsKGRlbF90cmFjay51aSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tX3BhZ2VUcmFja1N0YWNrLnNsaWNlKGosMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5tX2N1cnJlbnRQYWdlID0gdGhpcy5tX3BhZ2VUcmFja1N0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9jdXJyZW50UGFnZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8yIOWFiOaKiuW9k+WJjVBhZ2XlhaXmoIhcclxuICAgICAgICBpZih0aGlzLm1fY3VycmVudFBhZ2UgIT0gdW5kZWZpbmVkICYmIHRoaXMubV9jdXJyZW50UGFnZS5uYW1lIT1uYW1lKXtcclxuICAgICAgICAgICAgdGhpcy5tX3BhZ2VUcmFja1N0YWNrLnB1c2godGhpcy5tX2N1cnJlbnRQYWdlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5bCG5qCI5Lit5YW25a6DUGFnZSDorr7kuLrkuI3lj6/op4FcclxuICAgICAgICBmb3IobGV0IHRyYWNrIG9mIHRoaXMubV9wYWdlVHJhY2tTdGFjayl7XHJcbiAgICAgICAgICAgIHRyYWNrLnVpLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGF3YWl0IHRoaXMub3BlblBhZ2VXb3JrZXIocGtnLCBuYW1lLCBhcmcpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+i/lOWbnuS4iuS4gOS4qumhtemdolxyXG4gICAgcHVibGljIGFzeW5jIGdvQmFja1BhZ2UoKXtcclxuXHJcbiAgICAgICAgaWYodGhpcy5tX3BhZ2VUcmFja1N0YWNrLmxlbmd0aCA+IDApe1xyXG5cclxuICAgICAgICAgICAgLy/lhbPpl63lvZPliY3pobXpnaJcclxuICAgICAgICAgICAgdGhpcy5kaXN0cm95QWxsTG9hZGVkUGFuZWwoKTtcclxuICAgICAgICAgICAgdGhpcy5kaXN0cm95UGFuZWwodGhpcy5tX2N1cnJlbnRQYWdlLnVpKTtcclxuXHJcbiAgICAgICAgICAgIC8v5omT5byA5aCG5qCI5Lit55qE5LiK5LiA6aG16Z2iXHJcbiAgICAgICAgICAgIGxldCB0cmFjayA9IHRoaXMubV9wYWdlVHJhY2tTdGFjay5wb3AoKTtcclxuICAgICAgICAgICAgdHJhY2sudWkudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubV9jdXJyZW50UGFnZSA9IHRyYWNrO1xyXG5cclxuICAgICAgICAgICAgdHJhY2sudWkub25TaG93KHRyYWNrLmFyZyk7XHJcbiAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZW50ZXJNYWluUGFnZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8v5Zue5Yiw5Li75Z+OXHJcbiAgICBwdWJsaWMgZW50ZXJNYWluUGFnZSgpOnZvaWR7XHJcblxyXG4gICAgICAgICAvL+WwhuagiOS4reWFtuWug1BhZ2Ug6K6+5Li65LiN5Y+v6KeBXHJcbiAgICAgICAgIGZvcihsZXQgdHJhY2sgb2YgdGhpcy5tX3BhZ2VUcmFja1N0YWNrKXtcclxuICAgICAgICAgICAgdGhpcy5kaXN0cm95UGFuZWwodHJhY2sudWkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1fcGFnZVRyYWNrU3RhY2subGVuZ3RoID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1VSUxvYWRpbmdcclxuICAgIC8v5omT5byATG9hZGluZ+eVjOmdolxyXG4gICAgcHVibGljIGFzeW5jIG9wZW5Mb2FkaW5nKHBrZzpzdHJpbmcsIG5hbWU6c3RyaW5nLCBhcmc/OmFueSl7XHJcbiAgICAgICAgaWYoIXRoaXMubV9sb2FkaW5nUGFnZSl7XHJcbiAgICAgICAgICAgIHRoaXMubV9sb2FkaW5nUGFnZSA9IFVJRmFjdG9yeS5jcmVhdGVVSShwa2csIG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAodGhpcy5tX2xvYWRpbmdQYWdlIGFzIGFueSkuX2ludGVybmFsT3BlbihhcmcpO1xyXG4gICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy/lhbPpl61Mb2FkaW5n55WM6Z2iXHJcbiAgICBwdWJsaWMgY2xvc2VMb2FkaW5nKGFyZz86YW55KTp2b2lke1xyXG4gICAgICAgIGlmKHRoaXMubV9sb2FkaW5nUGFnZSl7XHJcbiAgICAgICAgICAgIHRoaXMubV9sb2FkaW5nUGFnZS5jbG9zZShhcmcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1VSVdpbmRvd1xyXG4gICAgLy/miZPlvIDnqpflj6NcclxuICAgIHB1YmxpYyBhc3luYyBvcGVuV2luZG93KHBrZzpzdHJpbmcsIG5hbWU6c3RyaW5nLCBhcmc/OmFueSl7XHJcblxyXG4gICAgICAgIGxldCB1aTpVSVdpbmRvdyA9IGF3YWl0IHRoaXMub3Blbihwa2csIG5hbWUsIGFyZyk7XHJcblxyXG4gICAgICAgIHJldHVybiB1aTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WFs+mXreeql+WPo1xyXG4gICAgcHVibGljIGNsb3NlV2luZG93KG5hbWU6c3RyaW5nLCBhcmc6YW55KXtcclxuXHJcbiAgICAgICAgbGV0IHVpOlVJV2luZG93ID0gdGhpcy5nZXRQYW5lbFVJKG5hbWUpIGFzIFVJV2luZG93O1xyXG4gICAgICAgIGlmKHVpICE9IG51bGwpe1xyXG4gICAgICAgICAgICB1aS5jbG9zZShhcmcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1VSVdpZGdldFxyXG4gICAgLy/miZPlvIBXaWRpZ2V0XHJcbiAgICBwdWJsaWMgYXN5bmMgb3BlbldpZGdldChwa2c6c3RyaW5nLCBuYW1lOnN0cmluZywgYXJnOmFueSl7XHJcblxyXG4gICAgICAgIGxldCB1aTpVSVdpZGdlID0gYXdhaXQgdGhpcy5vcGVuKHBrZywgbmFtZSwgYXJnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHVpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vdeWFs+mXrVdpZGlnZXRcclxuICAgIHB1YmxpYyBjbG9zZVdpZGdldChuYW1lOnN0cmluZywgYXJnOmFueSl7XHJcblxyXG4gICAgICAgIGxldCB1aTpVSVdpZGdlID0gdGhpcy5nZXRQYW5lbFVJKG5hbWUpIGFzIFVJV2lkZ2U7XHJcbiAgICAgICAgaWYodWkhPW51bGwpe1xyXG4gICAgICAgICAgICB1aS5jbG9zZShhcmcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2VBbGxQYW5lbHMoKXtcclxuICAgICAgICAvL+WIoOmZpOmZpExvYWRpbmfnlYzpnaLlpJbnmoTmiYDmnIlXaW5kb3csIFdpZGdldFxyXG4gICAgICAgIHRoaXMuZGlzdHJveUFsbExvYWRlZFBhbmVsKCk7XHJcbiAgICAgICAgLy/liKDpmaTmiYDmnIlQYWdlXHJcbiAgICAgICAgbGV0IGxlbiA9IHRoaXMubV9wYWdlVHJhY2tTdGFjay5sZW5ndGg7XHJcbiAgICAgICAgZm9yKGxldCBpID0gbGVuLTE7IGkgPj0gMCA7aS0tKXtcclxuICAgICAgICAgICAgbGV0IHRyYWNrID0gdGhpcy5tX3BhZ2VUcmFja1N0YWNrW2ldO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5kaXN0cm95UGFuZWwodHJhY2sudWkpO1xyXG4gICAgICAgICAgICB0aGlzLm1fcGFnZVRyYWNrU3RhY2suc2xpY2UoaSwxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBVSVBhbmVsIH0gZnJvbSBcIi4vVUlQYW5lbFwiO1xyXG5pbXBvcnQgeyBVSVR5cGVEZWYsIFVJQ29tRGVmcyB9IGZyb20gXCIuL1VJRGVmaW5lXCI7XHJcbmltcG9ydCB7IEZhaXJ5R1VJIH0gZnJvbSBcImNzaGFycFwiO1xyXG5pbXBvcnQgeyBTIH0gZnJvbSBcIi4uLy4uL2dsb2JhbC9HYW1lQ29uZmlnXCI7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBVSVBhZ2UgZXh0ZW5kcyBVSVBhbmVse1xyXG4gICAgcHVibGljIGdldCB1aVR5cGUoKTogVUlUeXBlRGVmIHsgICAgXHJcbiAgICAgICAgcmV0dXJuIFVJVHlwZURlZi5QYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbV9idG5Hb0JhY2s6RmFpcnlHVUkuR0J1dHRvbjtcclxuXHJcblxyXG4gICAgcHVibGljIG9uQXdha2UoKTp2b2lke1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubV9idG5Hb0JhY2sgPSB0aGlzLmZ1aS5HZXRDaGlsZChVSUNvbURlZnMuQmFja0J0bik7XHJcblxyXG4gICAgICAgIGlmKHRoaXMubV9idG5Hb0JhY2shPXVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMubV9idG5Hb0JhY2sub25DbGljay5BZGQoKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMub25CdG5Hb0JhY2soKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgb25TaG93KHZvPzphbnkpOnZvaWR7XHJcblxyXG4gICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ2xvc2UoYXJnPzphbnkpOnZvaWR7XHJcbiAgIFxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25CdG5Hb0JhY2soKXtcclxuICAgICAgICBTLlVJTWFuYWdlci5nb0JhY2tQYWdlKCk7XHJcbiAgICB9XHJcblxyXG59ICIsImltcG9ydCB7IFVJVHlwZURlZiwgVUlMYXllckRlZiB9IGZyb20gXCIuL1VJRGVmaW5lXCI7XHJcbmltcG9ydCB7IEZhaXJ5R1VJIH0gZnJvbSBcImNzaGFycFwiO1xyXG5pbXBvcnQgeyBTIH0gZnJvbSBcIi4uLy4uL2dsb2JhbC9HYW1lQ29uZmlnXCI7XHJcbmltcG9ydCB7IFVJQmFzZSB9IGZyb20gXCIuL1VJQmFzZVwiO1xyXG5pbXBvcnQgeyBVSUNvbXBvbmVudCB9IGZyb20gXCIuL1VJQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IExpc3QgfSBmcm9tIFwiLi4vY29tbW9uL0xpc3RcIjtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBVSVBhbmVsIGV4dGVuZHMgVUlCYXNlIHtcclxuXHJcbiAgICBwdWJsaWMgcGtnTmFtZTpzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9uYW1lOnN0cmluZztcclxuICAgIHByaXZhdGUgX3RpbWVyO1xyXG5cclxuICAgIHByaXZhdGUgX2NvbXBvbmVudHM6TGlzdDxzdHJpbmc+ID0gbmV3IExpc3QoKTtcclxuICAgIHByaXZhdGUgX3VpQ29tcG9uZW50czpMaXN0PFVJQ29tcG9uZW50Pj1uZXcgTGlzdCgpO1xyXG5cclxuXHJcbiAgICBwdWJsaWMgc2V0IG5hbWUodjpzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSB2O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBuYW1lKCk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdWlUeXBlKCk6IFVJVHlwZURlZiB7ICAgIFxyXG4gICAgICAgIHJldHVybiBVSVR5cGVEZWYuVW5rb3duO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIG1fbGF5ZXI6VUlMYXllckRlZiA9IFVJTGF5ZXJEZWYuVW5rb3duO1xyXG4gICAgcHVibGljIGdldCBsYXllcigpIDogVUlMYXllckRlZiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9sYXllcjsgXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IGxheWVyKHYgOiBVSUxheWVyRGVmKSB7XHJcbiAgICAgICAgdGhpcy5tX2xheWVyID0gdjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljICBnZXQgaXNPcGVuKCkgOiBib29sZWFue1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5mdWkudmlzaWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHZpc2libGUoaXNBY3RpdmF0ZTpib29sZWFuKXtcclxuXHJcbiAgICAgICAgdGhpcy5mdWkudmlzaWJsZSA9IGlzQWN0aXZhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IG9uQXdha2UoKTp2b2lkO1xyXG4gICAgcHVibGljIGFic3RyYWN0IG9uU2hvdyh2bz86YW55KTp2b2lkO1xyXG4gICAgcHVibGljIGFic3RyYWN0IG9uQ2xvc2UoYXJnPzphbnkpOnZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVbml0eeS4reeahFVwZGF0ZeaWueazlVxyXG4gICAgICogQHBhcmFtIGRlbHRhIOavj+W4p+iKseeahOaXtumXtFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb25VcGRhdGUoZGVsdGE/Om51bWJlcik6dm9pZHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uRGlzcG9zZSgpe307XHJcblxyXG4gICAgcHVibGljIGF3YWtlKCk6dm9pZHtcclxuICAgICAgICB0aGlzLm9uQXdha2UoKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhcnRUaW1lcigpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuX3RpbWVyKVxyXG4gICAgICAgICAgICB0aGlzLl90aW1lcj1zZXRJbnRlcnZhbCh0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpLDIwMCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoZGVsdGE6bnVtYmVyKTp2b2lke1xyXG4gICAgICAgIHRoaXMub25VcGRhdGUoZGVsdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5q2k56eB5pyJ5pa55rOV5ZyoVUkgTWFuYWdlcuS4reiwg+eUqCDvvIznibnmrorosIPnlKjjgIJcclxuICAgICAqIEBwYXJhbSBhcmcgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2ludGVybmFsT3Blbihhcmc6YW55KTp2b2lke1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubGF5ZXIgPSBVSUxheWVyRGVmLmdldERlZmF1bHRMYXllcih0aGlzLnVpVHlwZSk7XHJcbiAgICAgICAgRmFpcnlHVUkuR1Jvb3QuaW5zdC5BZGRDaGlsZCh0aGlzLmZ1aSk7XHJcblxyXG4gICAgICAgIHRoaXMub25TaG93KGFyZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGNyZWF0ZUNvbXBvbmVudDxUIGV4dGVuZHMgVUlDb21wb25lbnQ+KHBrZzpzdHJpbmcsIG5hbWU6c3RyaW5nLGNsczp7bmV3KCk6VH0pOlByb21pc2U8VD5cclxuICAgIHtcclxuICAgICAgICAvL+WKoOi9vee7hOS7tlBhY2thZ2XotYTmupBcclxuICAgICAgICBpZihwa2cgIT0gdGhpcy5wa2dOYW1lICYmICF0aGlzLl9jb21wb25lbnRzLmNvbnRhaW5zKHBrZykpe1xyXG4gICAgICAgICAgICBhd2FpdCBTLlJlc01hbmFnZXIubG9hZEZhaXJ5R1VJUGFja2FnZShwa2cpO1xyXG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRzLmFkZChwa2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBsZXQgY29tcD1uZXcgY2xzKCk7XHJcbiAgICAgICAgY29tcC5jcmVhdGVVSShwa2csbmFtZSk7XHJcbiAgICAgICAgdGhpcy5fdWlDb21wb25lbnRzLmFkZChjb21wKTtcclxuICAgICAgICByZXR1cm4gY29tcDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGNsb3NlKGFyZzphbnkgPSBudWxsKTp2b2lke1xyXG5cclxuICAgICAgICB0aGlzLm9uQ2xvc2UoYXJnKTtcclxuICAgICAgICBGYWlyeUdVSS5HUm9vdC5pbnN0LlJlbW92ZUNoaWxkKHRoaXMuZnVpKTtcclxuICAgICAgICBpZih0aGlzLl90aW1lcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fdGltZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lcj1udWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpOnZvaWR7XHJcblxyXG4gICAgICAgIC8v5Y246L2957uE5Lu2UGFja2FnZVxyXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudHMuZm9yZWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgUy5SZXNNYW5hZ2VyLnJlbGVhc2VGYWlyeUdVSVBhY2thZ2UoZWxlbWVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fdWlDb21wb25lbnRzLmZvckVhY2goZWxlbWVudD0+e1xyXG4gICAgICAgICAgICAgZWxlbWVudC5vbkNsb3NlKCk7XHJcbiAgICAgICAgICAgICBpZihlbGVtZW50LnBhcmVudCE9dW5kZWZpbmVkICYmIGVsZW1lbnQucGFyZW50IT1udWxsKVxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5wYXJlbnQuUmVtb3ZlQ2hpbGQoZWxlbWVudC5mdWkpO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgZWxlbWVudC5mdWkuRGlzcG9zZSgpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudHMuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLl91aUNvbXBvbmVudHMuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLmZ1aS5EaXNwb3NlKCk7XHJcbiAgICAgICAgdGhpcy5vbkRpc3Bvc2UoKTtcclxuICAgIH1cclxuXHJcblxyXG59IiwiaW1wb3J0IHsgVUlQYW5lbCB9IGZyb20gXCIuL1VJUGFuZWxcIjtcclxuaW1wb3J0IHsgVUlUeXBlRGVmLCBVSUNvbURlZnMgfSBmcm9tIFwiLi9VSURlZmluZVwiO1xyXG5pbXBvcnQgeyBGYWlyeUdVSSB9IGZyb20gXCJjc2hhcnBcIjtcclxuXHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgIFVJV2luZG93IGV4dGVuZHMgVUlQYW5lbHtcclxuICAgXHJcbiAgICBwdWJsaWMgZ2V0IHVpVHlwZSgpOiBVSVR5cGVEZWYgeyAgICBcclxuICAgICAgICByZXR1cm4gVUlUeXBlRGVmLldpbmRvdztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1fYnRuQ2xvc2U6RmFpcnlHVUkuR0J1dHRvbjtcclxuXHJcbiAgICBwdWJsaWMgb25Bd2FrZSgpOnZvaWR7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5tX2J0bkNsb3NlID0gdGhpcy5mdWkuR2V0Q2hpbGQoVUlDb21EZWZzLldpbmRvd0Nsb3NlQnRuKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU2hvdyhhcmc6YW55KTp2b2lke1xyXG5cclxuICAgICAgICB0aGlzLmZ1aS54ID0gRmFpcnlHVUkuR1Jvb3QuaW5zdC53aWR0aC8yIC0gdGhpcy5mdWkud2lkdGgvMjtcclxuICAgICAgICB0aGlzLmZ1aS55ID0gRmFpcnlHVUkuR1Jvb3QuaW5zdC5oZWlnaHQvMiAtIHRoaXMuZnVpLmhlaWdodC8yO1xyXG5cclxuICAgICAgICBpZih0aGlzLm1fYnRuQ2xvc2UhPXVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMubV9idG5DbG9zZS5vbkNsaWNrLkFkZCh0aGlzLm9uQnRuQ2xvc2UpO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgfVxyXG4gICAgcHVibGljIG9uQ2xvc2UoYXJnOmFueSk6dm9pZHtcclxuXHJcbiAgICAgICAgaWYodGhpcy5tX2J0bkNsb3NlIT11bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLm1fYnRuQ2xvc2Uub25DbGljay5SZW1vdmUodGhpcy5vbkJ0bkNsb3NlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkJ0bkNsb3NlKCl7XHJcbiAgICAgICAgdGhpcy5jbG9zZSgwKTtcclxuICAgIH1cclxuXHJcbn0iLCJcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgVUlNZXNzYWdle1xyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIE1TR19TRUxFQ1RfU0VSVkVSOm51bWJlciAgPSAxMDAwO1xyXG4gICAgcHVibGljIHN0YXRpYyBNU0dfU0NFTkVfUFJPR1JFU1M6bnVtYmVyID0gMTAwMTtcclxuICAgIFxyXG5cclxuXHJcbn0iLCJpbXBvcnQgeyBNZXNzZW5nZXIgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2NvbW1vbi9NZXNzZW5nZXJcIjtcclxuaW1wb3J0IHsgU2luZ2xldG9uIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9jb21tb24vU2luZ2xldG9uXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFVJTWVzc2FnZU1hbmdlciBleHRlbmRzIFNpbmdsZXRvbjxVSU1lc3NhZ2VNYW5nZXI+e1xyXG5cclxuICAgIHByaXZhdGUgdWlNZXNzYWdlOk1lc3NlbmdlciA9IG5ldyBNZXNzZW5nZXIoKTtcclxuXHJcblxyXG4gICAgcHVibGljIGFkZExpc3RlbmVyKG1zZ0NvZGU6bnVtYmVyLG9iajphbnksIGxpc3RlbmVyOkZ1bmN0aW9uKXtcclxuXHJcbiAgICAgICAgdGhpcy51aU1lc3NhZ2UuYWRkTGlzdGVuZXIobXNnQ29kZSwgb2JqLCBsaXN0ZW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUxpc3RlbmVyKG1zZ0NvZGU6bnVtYmVyLCBsaXN0ZW5lcjpGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy51aU1lc3NhZ2UucmVtb3ZlTGlzdGVuZXIobXNnQ29kZSwgbGlzdGVuZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVMaXN0ZW5lckJ5Q29kZShtc2dDb2RlOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy51aU1lc3NhZ2UucmVtb3ZlTGlzdGVuZXJCeVR5cGUobXNnQ29kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFydXAoKXtcclxuICAgICAgICB0aGlzLnVpTWVzc2FnZS5jbGVhcnVwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGJyb2FkY2FzdChtc2dDb2RlOm51bWJlcixwYXJhbXM6YW55KXtcclxuXHJcblxyXG4gICAgICAgIHRoaXMudWlNZXNzYWdlLmJyb2FkY2FzdChtc2dDb2RlLCBwYXJhbXMpXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBiaW5kZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2NvbW1vbi9OaWNlRGVjb3JhdG9yXCI7XHJcbmltcG9ydCB7IEZhaXJ5R1VJLCBVbml0eUVuZ2luZSB9IGZyb20gXCJjc2hhcnBcIjtcclxuaW1wb3J0IHsgVm9PdmVyV2luZG93IH0gZnJvbSBcIi4uLy4uL2dhbWVzdGFydC92by9Wb092ZXJXaW5kb3dcIjtcclxuaW1wb3J0IHsgVUlXaW5kb3cgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL3VpL1VJV2luZG93XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVUlGbHlCaXJkT3ZlcldpbmRvdyBleHRlbmRzIFVJV2luZG93e1xyXG5cclxuICAgIEBiaW5kZXIoXCJsb2FkX21lZGFsXCIpXHJcbiAgICBwdWJsaWMgbG9hZF9tZWRhbDpGYWlyeUdVSS5HTG9hZGVyO1xyXG5cclxuICAgIEBiaW5kZXIoXCJ0eHRfU2NvcmVcIilcclxuICAgIHB1YmxpYyB0eHRfU2NvcmU6RmFpcnlHVUkuR0xhYmVsO1xyXG5cclxuICAgIEBiaW5kZXIoXCJ0eHRfQmVzdFNjb3JlXCIpXHJcbiAgICBwdWJsaWMgdHh0X0Jlc3RTY29yZTpGYWlyeUdVSS5HTGFiZWw7XHJcblxyXG4gICAgQGJpbmRlcihcImJ0bl9yZVN0YXJ0XCIpXHJcbiAgICBwdWJsaWMgYnRuX3JlU3RhcnQ6RmFpcnlHVUkuR0J1dHRvbjtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSByZVN0YXJ0RnVuYzpGdW5jdGlvbjtcclxuICAgICBcclxuICAgIHB1YmxpYyBvbkF3YWtlKCk6dm9pZHtcclxuICAgICAgICB0aGlzLmJ0bl9yZVN0YXJ0Lm9uQ2xpY2suU2V0KCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tfYnRuX3JlU3RhcnQoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU2hvdyh2bzpWb092ZXJXaW5kb3cpOnZvaWR7XHJcbiAgICAgICAgdGhpcy50eHRfQmVzdFNjb3JlLnRleHQgPSB2by5iZXN0U2NvcmUudG9TdHJpbmcoKTtcclxuICAgICAgICB0aGlzLnR4dF9TY29yZS50ZXh0ID0gdm8uc2NvcmUudG9TdHJpbmcoKTtcclxuICAgICAgICB0aGlzLnJlU3RhcnRGdW5jID0gdm8ucmVTdGFydEZ1bmNcclxuICAgICAgICBsZXQgbWVkYWxQYXRoOnN0cmluZ1xyXG4gICAgICAgIGlmICh2by5zY29yZSA8PSAzKXtcclxuICAgICAgICAgICAgbWVkYWxQYXRoID0gXCJ1aTovL0ZseUJpcmQvbWVkYWxzXzFcIjtcclxuICAgICAgICB9ZWxzZSBpZih2by5zY29yZSA8PSA4KXtcclxuICAgICAgICAgICAgbWVkYWxQYXRoID0gXCJ1aTovL0ZseUJpcmQvbWVkYWxzXzJcIjtcclxuICAgICAgICB9ZWxzZSBpZih2by5zY29yZSA8PSAxNSl7XHJcbiAgICAgICAgICAgIG1lZGFsUGF0aCA9IFwidWk6Ly9GbHlCaXJkL21lZGFsc18zXCI7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIG1lZGFsUGF0aCA9IFwidWk6Ly9GbHlCaXJkL21lZGFsc180XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubG9hZF9tZWRhbC51cmwgPSBtZWRhbFBhdGhcclxuICAgIH1cclxuICAgIHB1YmxpYyBvbkNsb3NlKGFyZzphbnkpOnZvaWR7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYXN5bmMgY2xpY2tfYnRuX3JlU3RhcnQoKXtcclxuICAgICAgICB0aGlzLmNsb3NlKClcclxuICAgICAgICB0aGlzLnJlU3RhcnRGdW5jKClcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVHVybkluVHdlZW4odHdlZW5lcjpGYWlyeUdVSS5HVHdlZW5lcilcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0d2VlbmVyKVxyXG4gICAgICAgIGlmICh0d2VlbmVyKSB7XHJcbiAgICAgICAgICAgIGxldCB2ID0gdHdlZW5lci52YWx1ZS54O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBGYWlyeUdVSSB9IGZyb20gXCJjc2hhcnBcIjtcclxuaW1wb3J0IHsgRmx5QmlyZFVJIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2RhdGEvdWkvRmx5QmlyZFwiO1xyXG5pbXBvcnQgeyBHYW1lU3RhcnRVSSB9IGZyb20gXCIuLi8uLi8uLi8uLi9kYXRhL3VpL0dhbWVTdGFydFwiO1xyXG5pbXBvcnQgeyBMaXN0IH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1ld29yay9jb21tb24vTGlzdFwiO1xyXG5pbXBvcnQgeyBTIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2dsb2JhbC9HYW1lQ29uZmlnXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEJpcmR7XHJcblxyXG4gICAgb2JqQmlyZDpGYWlyeUdVSS5HQ29tcG9uZW50XHJcblxyXG4gICAgLyoq5bCP6bif54q25oCBICovXHJcbiAgICBwcml2YXRlIGlzVXA6Ym9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoq54K55Ye75ZCO5by56LW35pe26Ze0ICovXHJcbiAgICBwcml2YXRlIHVwVGltZTpudW1iZXIgPSAwLjM7XHJcblxyXG4gICAgLyoq54K55Ye75ZCO5by56LW36YCf5bqmICovXHJcbiAgICBwcml2YXRlIHVwU3BlZWQ6bnVtYmVyID0gLTQwMDtcclxuXHJcbiAgICAvKirkuIvokL3pgJ/luqYgKi9cclxuICAgIHByaXZhdGUgZG93blNwZWVkOm51bWJlciA9IDMwMDtcclxuXHJcbiAgICBwcml2YXRlIGJpcmRUd2VlbjpMaXN0PEZhaXJ5R1VJLkdUd2VlbmVyPiA9IG5ldyBMaXN0PEZhaXJ5R1VJLkdUd2VlbmVyPigpXHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLm9iakJpcmQgPSBGYWlyeUdVSS5VSVBhY2thZ2UuQ3JlYXRlT2JqZWN0KEZseUJpcmRVSS5QYWNrYWdlTmFtZSxGbHlCaXJkVUkuVUlCaXJkKS5hc0NvbTtcclxuICAgICAgICB0aGlzLm9iakJpcmQudG91Y2hhYmxlID0gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgRGlzcG9zZSgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5vYmpCaXJkLkRpc3Bvc2UoKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmbHlVcCgpOnZvaWR7XHJcbiAgICAgICAgUy5BdWRpb01hbmFnZXIuUGxheShcIkZseUJpcmQvTXVzaWMvZmx5LndhdlwiKVxyXG4gICAgICAgIHRoaXMuaXNVcCA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuYmlyZFR3ZWVuLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuS2lsbChmYWxzZSlcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmJpcmRUd2Vlbi5jbGVhcigpXHJcbiAgICAgICAgbGV0IHR3MSA9IHRoaXMub2JqQmlyZC5Ud2VlblJvdGF0ZSgtMzAsMC4yKVxyXG4gICAgICAgIHRoaXMuYmlyZFR3ZWVuLmFkZCh0dzEpXHJcblxyXG4gICAgICAgIGxldCB0dzIgPSBGYWlyeUdVSS5HVHdlZW4uRGVsYXllZENhbGwodGhpcy51cFRpbWUpLlNldFRhcmdldCh0aGlzLm9iakJpcmQpLk9uQ29tcGxldGUoKCkgPT5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNVcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgdHczID0gdGhpcy5vYmpCaXJkLlR3ZWVuUm90YXRlKDMwLDAuMilcclxuICAgICAgICAgICAgdGhpcy5iaXJkVHdlZW4uYWRkKHR3MylcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmJpcmRUd2Vlbi5hZGQodHcyKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmbHkoZHQ6bnVtYmVyKTp2b2lke1xyXG4gICAgICAgIHRoaXMub2JqQmlyZC55ID0gTWF0aC5taW4oNTAwLE1hdGgubWF4KC04MDAsdGhpcy5vYmpCaXJkLnkrKHRoaXMuaXNVcD90aGlzLnVwU3BlZWQ6dGhpcy5kb3duU3BlZWQpKmR0KSApXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzQ3Jhc2hHcm91bmQoKTpib29sZWFue1xyXG4gICAgICAgIC8vIOWwj+m4n+eisOaSnuWcsOmdolxyXG4gICAgICAgIGlmICh0aGlzLm9iakJpcmQueSA+PSA0NTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVHYW1lU3RhcnQoKTp2b2lke1xyXG4gICAgICAgIHRoaXMub2JqQmlyZC5yb3RhdGlvbiA9IDBcclxuICAgICAgICB0aGlzLm9iakJpcmQueSA9IDBcclxuICAgICAgICB0aGlzLm9iakJpcmQuR2V0Q2hpbGQoXCJhbmltX2JpcmRcIikuYXNNb3ZpZUNsaXAucGxheWluZyA9IHRydWVcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2FtZU92ZXIoKXtcclxuICAgICAgICB0aGlzLmlzVXAgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmJpcmRUd2Vlbi5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICBlbGVtZW50LktpbGwoZmFsc2UpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5iaXJkVHdlZW4uY2xlYXIoKVxyXG4gICAgICAgIHRoaXMub2JqQmlyZC5HZXRDaGlsZChcImFuaW1fYmlyZFwiKS5hc01vdmllQ2xpcC5wbGF5aW5nID0gZmFsc2VcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBGYWlyeUdVSSB9IGZyb20gXCJjc2hhcnBcIjtcclxuaW1wb3J0IHsgRmx5QmlyZFVJIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2RhdGEvdWkvRmx5QmlyZFwiO1xyXG5pbXBvcnQgeyBHYW1lU3RhcnRVSSB9IGZyb20gXCIuLi8uLi8uLi8uLi9kYXRhL3VpL0dhbWVTdGFydFwiO1xyXG5pbXBvcnQgeyBTIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2dsb2JhbC9HYW1lQ29uZmlnXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFBpcGV7XHJcblxyXG4gICAgb2JqUGlwZTpGYWlyeUdVSS5HQ29tcG9uZW50XHJcbiAgICBpbWdfVXA6RmFpcnlHVUkuR0ltYWdlXHJcbiAgICBpbWdfRG93bjpGYWlyeUdVSS5HSW1hZ2VcclxuICAgIHBpcGVTcGVlZDogbnVtYmVyID0gMjAwXHJcbiAgICBzcGFjaW5nOm51bWJlclxyXG4gICAgY2Fyc2hEaXM6bnVtYmVyID0gMzBcclxuICAgIGNhbkFkZFNjb3JlOmJvb2xlYW4gPSB0cnVlXHJcbiAgICBjb25zdHJ1Y3RvcihzcGFjaW5nOm51bWJlcix5Om51bWJlcil7XHJcbiAgICAgICAgdGhpcy5zcGFjaW5nID0gc3BhY2luZ1xyXG4gICAgICAgIHRoaXMub2JqUGlwZSA9IEZhaXJ5R1VJLlVJUGFja2FnZS5DcmVhdGVPYmplY3QoRmx5QmlyZFVJLlBhY2thZ2VOYW1lLEZseUJpcmRVSS5VSVBpcGUpLmFzQ29tO1xyXG4gICAgICAgIHRoaXMuaW1nX1VwID0gdGhpcy5vYmpQaXBlLkdldENoaWxkKFwiaW1nX1VwXCIpLmFzSW1hZ2U7XHJcbiAgICAgICAgdGhpcy5pbWdfRG93biA9IHRoaXMub2JqUGlwZS5HZXRDaGlsZChcImltZ19Eb3duXCIpLmFzSW1hZ2U7XHJcblxyXG4gICAgICAgIHRoaXMuaW1nX1VwLnkgPSAtc3BhY2luZ1xyXG4gICAgICAgIHRoaXMuaW1nX0Rvd24ueSA9IHNwYWNpbmdcclxuICAgICAgICB0aGlzLm9ialBpcGUueSA9IHlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgRGlzcG9zZSgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5vYmpQaXBlLkRpc3Bvc2UoKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtb3ZlKGR0Om51bWJlcik6dm9pZHtcclxuICAgICAgICB0aGlzLm9ialBpcGUueCA9IHRoaXMub2JqUGlwZS54IC0gZHQqdGhpcy5waXBlU3BlZWRcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNDcmFzaEJpcmQoYmlyZDpGYWlyeUdVSS5HT2JqZWN0KTpib29sZWFue1xyXG4gICAgICAgIGxldCBkaXNYID0gTWF0aC5hYnMoYmlyZC54LXRoaXMub2JqUGlwZS54KTtcclxuICAgICAgICBpZiAoZGlzWCA8PSAxMTYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgZGlzWSA9IE1hdGguYWJzKGJpcmQueS10aGlzLm9ialBpcGUueSk7XHJcbiAgICAgICAgICAgIGlmIChkaXNZICsgdGhpcy5jYXJzaERpcyA+PSB0aGlzLnNwYWNpbmcpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG59IiwiLy8gaW1wb3J0IHsgaG9tZVVJIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2RhdGEvdWkvaG9tZVwiO1xyXG5pbXBvcnQgeyBGbHlCaXJkVUkgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZGF0YS91aS9GbHlCaXJkXCI7XHJcbmltcG9ydCB7IEJhc2VTY2VuZSB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvc2NlbmUvQmFzZVNjZW5lXCI7XHJcbmltcG9ydCB7IFMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZ2xvYmFsL0dhbWVDb25maWdcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgRmx5QmlyZFNjZW5lIGV4dGVuZHMgQmFzZVNjZW5le1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25FbnRlcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ29tcGxldGUoKSB7XHJcblxyXG4gICAgICAgIFMuVUlNYW5hZ2VyLm9wZW5QYWdlSW5TY2VuZShcclxuICAgICAgICAgICAgRmx5QmlyZFVJLlBhY2thZ2VOYW1lLFxyXG4gICAgICAgICAgICBGbHlCaXJkVUkuVUlNYWluVklldyxcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkxlYXZlKCkge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuXHJcblxyXG59IiwiaW1wb3J0IHsgVUlQYWdlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1ld29yay91aS9VSVBhZ2VcIjtcclxuaW1wb3J0IHsgYmluZGVyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1ld29yay9jb21tb24vTmljZURlY29yYXRvclwiO1xyXG5pbXBvcnQgeyBGYWlyeUdVSSwgVW5pdHlFbmdpbmUgfSBmcm9tIFwiY3NoYXJwXCI7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvbG9nZ2VyL0xvZ2dlclwiO1xyXG5pbXBvcnQgeyBTIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2dsb2JhbC9HYW1lQ29uZmlnXCI7XHJcbmltcG9ydCB7IEZseUJpcmRVSSB9IGZyb20gXCIuLi8uLi8uLi8uLi9kYXRhL3VpL0ZseUJpcmRcIjtcclxuaW1wb3J0IHsgVm9PdmVyV2luZG93IH0gZnJvbSBcIi4uLy4uL2dhbWVzdGFydC92by9Wb092ZXJXaW5kb3dcIjtcclxuaW1wb3J0IHsgTGlzdCB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvY29tbW9uL0xpc3RcIjtcclxuaW1wb3J0IHsgUGlwZSB9IGZyb20gXCIuLi9pdGVtL3BpcGVcIjtcclxuaW1wb3J0IHsgUmFuZG9tIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1ld29yay9jb21tb24vUmFuZG9tXCI7XHJcbmltcG9ydCB7IEJpcmQgfSBmcm9tIFwiLi4vaXRlbS9CaXJkXCI7XHJcbmltcG9ydCB7IFRpbWVVdGlsIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1ld29yay91dGlsL1RpbWVVdGlsXCI7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBVSUZseUJpcmRNYWluVmlldyBleHRlbmRzIFVJUGFnZXtcclxuXHJcbiAgICBAYmluZGVyKFwibGlzdF9iZ1wiKVxyXG4gICAgcHVibGljIGxpc3RfYmc6RmFpcnlHVUkuR0xpc3Q7XHJcblxyXG4gICAgQGJpbmRlcihcImxpc3RfZ3JvdW5kXCIpXHJcbiAgICBwdWJsaWMgbGlzdF9ncm91bmQ6RmFpcnlHVUkuR0xpc3Q7XHJcblxyXG4gICAgQGJpbmRlcihcImJ0bl9zdGFydFwiKVxyXG4gICAgcHVibGljIGJ0bl9zdGFydDpGYWlyeUdVSS5HQnV0dG9uO1xyXG5cclxuICAgIEBiaW5kZXIoXCJ0eHRfU2NvcmVcIilcclxuICAgIHB1YmxpYyB0eHRfU2NvcmU6RmFpcnlHVUkuR0xhYmVsO1xyXG5cclxuICAgIEBiaW5kZXIoXCJzdGFydFBhbmVsXCIpXHJcbiAgICBwdWJsaWMgc3RhcnRQYW5lbDpGYWlyeUdVSS5HQ29tcG9uZW50O1xyXG4gICAgXHJcbiAgICBwdWJsaWMgYmlyZDpCaXJkO1xyXG5cclxuICAgIEBiaW5kZXIoXCJnQmlyZEFuZFBpcGVcIilcclxuICAgIHB1YmxpYyBnQmlyZEFuZFBpcGU6RmFpcnlHVUkuR0NvbXBvbmVudDtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBjdXJQaXBlczpMaXN0PFBpcGU+ID0gbmV3IExpc3Q8UGlwZT4oKVxyXG4gICAgcHJpdmF0ZSBuZWVkRGVzdG9yeTpMaXN0PFBpcGU+ID0gbmV3IExpc3Q8UGlwZT4oKVxyXG5cclxuICAgIC8qKuWcsOadv+mAn+W6piAqL1xyXG4gICAgcHJpdmF0ZSBncm91bmRTcGVlZDpudW1iZXIgPSA0NjtcclxuICAgIFxyXG4gICAgLyoq6IOM5pmv6YCf5bqm6YCf5bqmICovXHJcbiAgICBwcml2YXRlIHNreVNwZWVkOm51bWJlciA9IDM2O1xyXG5cclxuICAgIC8qKua4uOaIj+aYr+WQpuW8gOWniyAqL1xyXG4gICAgcHJpdmF0ZSBpc1N0YXJ0OmJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblxyXG4gICAgLyoq5b6X5YiGICovXHJcbiAgICBwcml2YXRlIHNjb3JlOm51bWJlciA9IDA7XHJcblxyXG4gICAgLyoq5rC0566h5Yib5bu66Ze06ZqUICovXHJcbiAgICBwcml2YXRlIHBpcGVJbnRlcnZhbFRpbWU6bnVtYmVyID0gNDtcclxuXHJcbiAgICAvKirmsLTnrqHml7bpl7QgKi9cclxuICAgIHByaXZhdGUgcGlwZVRpbWU6bnVtYmVyID0gMDtcclxuXHJcblxyXG4gICAgcHVibGljIG9uVXBkYXRlKGR0Om51bWJlcik6dm9pZHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuYmlyZCAmJiB0aGlzLmlzU3RhcnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RfZ3JvdW5kLnNjcm9sbFBhbmUucG9zWCA9IHRoaXMubGlzdF9ncm91bmQuc2Nyb2xsUGFuZS5wb3NYICsgZHQqdGhpcy5ncm91bmRTcGVlZFxyXG4gICAgICAgICAgICB0aGlzLmxpc3RfYmcuc2Nyb2xsUGFuZS5wb3NYID0gdGhpcy5saXN0X2JnLnNjcm9sbFBhbmUucG9zWCArIGR0KnRoaXMuc2t5U3BlZWRcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuYmlyZC5mbHkoZHQpXHJcblxyXG4gICAgICAgICAgICAvLyDliKDpmaTlsY/luZXlpJbnmoTmsLTnrqFcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5lZWREZXN0b3J5LmNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyUGlwZXMucmVtb3ZlKHRoaXMubmVlZERlc3RvcnlbaV0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZWVkRGVzdG9yeVtpXS5EaXNwb3NlKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm5lZWREZXN0b3J5LmNsZWFyKCk7XHJcblxyXG4gICAgICAgICAgICAvLyDmsLTnrqHnmoTnp7vliqhcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmN1clBpcGVzLmNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmN1clBpcGVzW2ldO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5tb3ZlKGR0KVxyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQub2JqUGlwZS54IDw9IC03MDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5lZWREZXN0b3J5LmFkZCh0aGlzLmN1clBpcGVzW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50Lm9ialBpcGUueCA8PSAwICYmIGVsZW1lbnQuY2FuQWRkU2NvcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBTLkF1ZGlvTWFuYWdlci5QbGF5KFwiRmx5QmlyZC9NdXNpYy9nZXRTY29yZS53YXZcIilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjb3JlICsrXHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jYW5BZGRTY29yZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cERhdGFTY29yZSh0aGlzLnNjb3JlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyDmo4DmtYvlsI/puJ/mmK/lkKbnorDmkp7msLTnrqHku6Xlj4rlnLDpnaJcclxuICAgICAgICAgICAgaWYgKHRoaXMuYmlyZC5pc0NyYXNoR3JvdW5kKCkgfHwgdGhpcy5pc0NyYXNoKCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZU92ZXIoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5waXBlVGltZSArPSBkdDtcclxuICAgICAgICAgICAgLy8g5rC0566h5a6a5pe25Yib5bu6XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBpcGVUaW1lID49IHRoaXMucGlwZUludGVydmFsVGltZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5waXBlVGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVBpcGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzQ3Jhc2goKTpib29sZWFuXHJcbiAgICB7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgaXRlcmF0b3Igb2YgdGhpcy5jdXJQaXBlcykge1xyXG4gICAgICAgICAgICBpZiAoaXRlcmF0b3IuaXNDcmFzaEJpcmQodGhpcy5iaXJkLm9iakJpcmQpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQXdha2UoKTp2b2lke1xyXG4gICAgICAgIHN1cGVyLm9uQXdha2UoKTtcclxuICAgICAgICB0aGlzLmZ1aS5NYWtlRnVsbFNjcmVlbigpO1xyXG5cclxuICAgICAgICB0aGlzLmxpc3RfYmcuU2V0VmlydHVhbEFuZExvb3AoKTtcclxuICAgICAgICB0aGlzLmxpc3RfYmcuaXRlbVJlbmRlcmVyID0gKGluZGV4Om51bWJlciwgb2JqOkZhaXJ5R1VJLkdPYmplY3QpPT57XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmxpc3RfYmcubnVtSXRlbXMgPSAzO1xyXG5cclxuICAgICAgICB0aGlzLmxpc3RfZ3JvdW5kLlNldFZpcnR1YWxBbmRMb29wKCk7XHJcbiAgICAgICAgdGhpcy5saXN0X2dyb3VuZC5pdGVtUmVuZGVyZXIgPSAoaW5kZXg6bnVtYmVyLCBvYmo6RmFpcnlHVUkuR09iamVjdCk9PntcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMubGlzdF9ncm91bmQubnVtSXRlbXMgPSAzO1xyXG5cclxuICAgICAgICB0aGlzLnR4dF9TY29yZS52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuYmlyZCA9IG5ldyBCaXJkKClcclxuICAgICAgICB0aGlzLmdCaXJkQW5kUGlwZS5BZGRDaGlsZCh0aGlzLmJpcmQub2JqQmlyZClcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmJ0bl9zdGFydC5vbkNsaWNrLlNldCgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2xpY2tTdGFydCgpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdGhpcy5saXN0X2JnLm9uVG91Y2hCZWdpbi5TZXQoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5iaXJkLmZseVVwKClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKua4uOaIj+W8gOWniyAqL1xyXG4gICAgcHJpdmF0ZSBHYW1lU3RhcnQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5pc1N0YXJ0ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnR4dF9TY29yZS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnN0YXJ0UGFuZWwudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudXBEYXRhU2NvcmUoMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6YeN5paw5byA5aeLICovXHJcbiAgICBwcml2YXRlIHJlR2FtZVN0YXJ0KCk6dm9pZHtcclxuICAgICAgICB0aGlzLmJpcmQucmVHYW1lU3RhcnQoKTtcclxuICAgICAgICB0aGlzLmJpcmQub2JqQmlyZC55ID0gMDtcclxuICAgICAgICAvLyBiaXJkLkdldENvbXBvbmVudDxTcHJpdGVBbmltYXRpb24+KCkuUGxheShcImZseVwiKTtcclxuICAgICAgICAvLyDliKDpmaTlsY/luZXlpJbnmoTmsLTnrqFcclxuICAgICAgICBmb3IgKGNvbnN0IGl0ZXJhdG9yIG9mIHRoaXMubmVlZERlc3RvcnkpIHtcclxuICAgICAgICAgICAgaXRlcmF0b3IuRGlzcG9zZSgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubmVlZERlc3RvcnkuY2xlYXIoKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGl0ZXJhdG9yIG9mIHRoaXMuY3VyUGlwZXMpIHtcclxuICAgICAgICAgICAgaXRlcmF0b3IuRGlzcG9zZSgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3VyUGlwZXMuY2xlYXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zY29yZSA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMuR2FtZVN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5pu05paw5YiG5pWwICovXHJcbiAgICBwdWJsaWMgdXBEYXRhU2NvcmUoc2NvcmU6bnVtYmVyKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50eHRfU2NvcmUudGV4dCA9IHNjb3JlLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5ri45oiP57uT5p2fICovXHJcbiAgICBwcml2YXRlIEdhbWVPdmVyKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIFMuQXVkaW9NYW5hZ2VyLlBsYXkoXCJGbHlCaXJkL011c2ljL2NyYXNoLndhdlwiKVxyXG4gICAgICAgIHRoaXMuaXNTdGFydCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYmlyZC5HYW1lT3ZlcigpXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKFVuaXR5RW5naW5lLlBsYXllclByZWZzLkhhc0tleShcIkJpcmRfQmVzdFNjb3JlXCIpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IHNhdmVCYXN0U2NvcmUgPSBVbml0eUVuZ2luZS5QbGF5ZXJQcmVmcy5HZXRJbnQoXCJCaXJkX0Jlc3RTY29yZVwiKTtcclxuICAgICAgICAgICAgaWYgKHNhdmVCYXN0U2NvcmUgPCB0aGlzLnNjb3JlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBVbml0eUVuZ2luZS5QbGF5ZXJQcmVmcy5TZXRJbnQoXCJCaXJkX0Jlc3RTY29yZVwiLHRoaXMuc2NvcmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBVbml0eUVuZ2luZS5QbGF5ZXJQcmVmcy5TZXRJbnQoXCJCaXJkX0Jlc3RTY29yZVwiLHRoaXMuc2NvcmUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdm8gPSBuZXcgVm9PdmVyV2luZG93KCkgXHJcbiAgICAgICAgdm8uYmVzdFNjb3JlID0gVW5pdHlFbmdpbmUuUGxheWVyUHJlZnMuR2V0SW50KFwiQmlyZF9CZXN0U2NvcmVcIik7XHJcbiAgICAgICAgdm8uc2NvcmUgPSB0aGlzLnNjb3JlO1xyXG4gICAgICAgIHZvLnJlU3RhcnRGdW5jID0gKCk9PntcclxuICAgICAgICAgICAgdGhpcy5yZUdhbWVTdGFydCgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFMuVUlNYW5hZ2VyLm9wZW5XaW5kb3coXHJcbiAgICAgICAgICAgIEZseUJpcmRVSS5QYWNrYWdlTmFtZSxcclxuICAgICAgICAgICAgRmx5QmlyZFVJLlVJT3ZlcldpbmRvdyxcclxuICAgICAgICAgICAgdm9cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWIm+W7uuawtOeuoSAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVQaXBlKCk6dm9pZHtcclxuICAgICAgICBsZXQgcGlwZSA9IG5ldyBQaXBlKFJhbmRvbS5yYW5kb20oMTcwLDIyMCksUmFuZG9tLnJhbmRvbSgtMzAwLDIwMCkpXHJcbiAgICAgICAgdGhpcy5jdXJQaXBlcy5hZGQocGlwZSk7XHJcbiAgICAgICAgdGhpcy5nQmlyZEFuZFBpcGUuQWRkQ2hpbGQocGlwZS5vYmpQaXBlKVxyXG4gICAgICAgIHBpcGUub2JqUGlwZS54ID0gMTAwMFxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja1N0YXJ0KCk6dm9pZHtcclxuICAgICAgICB0aGlzLkdhbWVTdGFydCgpXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgb25TaG93KHZvKTp2b2lke1xyXG4gICAgICAgIHN1cGVyLm9uU2hvdyh2byk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgb25DbG9zZShhcmc6YW55KTp2b2lke1xyXG4gICAgICAgIHN1cGVyLm9uQ2xvc2UoYXJnKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBhc3luYyBjbGlja19idG5fc3RhcnQoKXtcclxuICAgICAgICBMb2dnZXIubG9nKFwib24gY2hhdC4uLlwiKTtcclxuICAgIH1cclxuXHJcblxyXG59IiwiaW1wb3J0IHsgR2FtZVN0YXJ0VUkgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZGF0YS91aS9HYW1lU3RhcnRcIjtcclxuaW1wb3J0IHsgQmFzZVNjZW5lIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1ld29yay9zY2VuZS9CYXNlU2NlbmVcIjtcclxuaW1wb3J0IHsgUyB9IGZyb20gXCIuLi8uLi8uLi8uLi9nbG9iYWwvR2FtZUNvbmZpZ1wiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBHYW1lU3RhcnRTY2VuZSBleHRlbmRzIEJhc2VTY2VuZXtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkVudGVyKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNvbXBsZXRlKCkge1xyXG4gICAgICAgIFMuVUlNYW5hZ2VyLm9wZW5QYWdlSW5TY2VuZShcclxuICAgICAgICAgICAgR2FtZVN0YXJ0VUkuUGFja2FnZU5hbWUsXHJcbiAgICAgICAgICAgIEdhbWVTdGFydFVJLlVJU3RhcnRWaWV3LFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uTGVhdmUoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn0iLCJpbXBvcnQgeyBVSVBhZ2UgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL3VpL1VJUGFnZVwiO1xyXG5pbXBvcnQgeyBiaW5kZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2NvbW1vbi9OaWNlRGVjb3JhdG9yXCI7XHJcbmltcG9ydCB7IEZhaXJ5R1VJIH0gZnJvbSBcImNzaGFycFwiO1xyXG5pbXBvcnQgeyBTIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2dsb2JhbC9HYW1lQ29uZmlnXCI7XHJcbmltcG9ydCB7IFNjZW5lRGVmIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1ld29yay9zY2VuZS9TY2VuZURlZlwiO1xyXG5cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgVUlTdGFydFZpZXcgZXh0ZW5kcyBVSVBhZ2V7XHJcblxyXG4gICAgQGJpbmRlcihcImJ0bl9zdGFydFwiKVxyXG4gICAgcHVibGljIGJ0bl9zdGFydDpGYWlyeUdVSS5HQnV0dG9uO1xyXG5cclxuICAgIHB1YmxpYyBvbkF3YWtlKCk6dm9pZHtcclxuICAgICAgICBzdXBlci5vbkF3YWtlKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLlvIDlp4vnlYzpnaIzMzNcIilcclxuICAgICAgICB0aGlzLmZ1aS5NYWtlRnVsbFNjcmVlbigpO1xyXG5cclxuICAgICAgICB0aGlzLmJ0bl9zdGFydC5vbkNsaWNrLkFkZCgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmNsaWNrX2J0bl9zdGFydCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvblNob3coKTp2b2lke1xyXG4gICAgICAgIHN1cGVyLm9uU2hvdygpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIG9uQ2xvc2UoYXJnOmFueSk6dm9pZHtcclxuICAgICAgICBzdXBlci5vbkNsb3NlKGFyZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGNsaWNrX2J0bl9zdGFydCgpe1xyXG4gICAgICAgIGF3YWl0IFMuU2NlbmVNYW5hZ2VyLmxvYWRTY2VuZShTY2VuZURlZi5GbHlCaXJkKTtcclxuICAgIH1cclxufSIsIlxyXG5leHBvcnQgY2xhc3MgVm9PdmVyV2luZG93e1xyXG4gICAgcHVibGljIHNjb3JlOm51bWJlcjtcclxuICAgIHB1YmxpYyBiZXN0U2NvcmU6bnVtYmVyO1xyXG4gICAgcHVibGljIHJlU3RhcnRGdW5jOkZ1bmN0aW9uO1xyXG59IiwiaW1wb3J0IHsgQXVkaW9NYW5hZ2VyIH0gZnJvbSBcImNzaGFycFwiO1xyXG5pbXBvcnQgeyBHYW1lT2JqZWN0UG9vbCB9IGZyb20gXCIuLi9mcmFtZXdvcmsvY29tbW9uL0dhbWVPYmplY3RQb29sXCI7XHJcbmltcG9ydCB7IFJlc01hbmFnZXIgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2NvbW1vbi9SZXNNYW5hZ2VyXCI7XHJcbi8vIGltcG9ydCB7IFN0b3J5TWFuYWdlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvaW5rL1N0b3J5TWFuYWdlclwiO1xyXG4vLyBpbXBvcnQgeyBTdG9yeU1lc3NhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9pbmsvU3RvcnlNZXNzYWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHYW1lU2Vzc2lvbiB9IGZyb20gXCIuLi9mcmFtZXdvcmsvbmV0L0dhbWVTZXNzaW9uXCI7XHJcbmltcG9ydCB7IEh0dHBNYW5hZ2VyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9uZXQvSHR0cE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU2Vzc2lvbk1hbmFnZXIgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL25ldC9TZXNzaW9uTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTY2VuZU1hbmFnZXIgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL3NjZW5lL1NjZW5lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL3VpL1VJTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBVSU1lc3NhZ2VNYW5nZXIgfSBmcm9tIFwiLi4vZ2FtZS9ldmVudC9VSU1lc3NhZ2VNYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgIGNsYXNzIEdhbWVDb25maWd7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBkZWJ1Zzpib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWxtU2VydmVySVA6c3RyaW5nID0gXCIxMjcuMC4wLjFcIjsgXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWxtU2VydmVyUG9ydDpudW1iZXIgPSA5MDAxO1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFN7XHJcbiAgICBwdWJsaWMgc3RhdGljIFVJTWFuYWdlciA9IFVJTWFuYWdlci5JbnN0YW5jZShVSU1hbmFnZXIpO1xyXG4gICAgcHVibGljIHN0YXRpYyBVSU1lc3NhZ2VNYW5nZXIgPSBVSU1lc3NhZ2VNYW5nZXIuSW5zdGFuY2UoVUlNZXNzYWdlTWFuZ2VyKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgU2NlbmVNYW5hZ2VyID0gU2NlbmVNYW5hZ2VyLkluc3RhbmNlKFNjZW5lTWFuYWdlcik7XHJcbiAgICBwdWJsaWMgc3RhdGljIEdhbWVPYmplY3RQb29sID0gR2FtZU9iamVjdFBvb2wuSW5zdGFuY2UoR2FtZU9iamVjdFBvb2wpO1xyXG4gICAgcHVibGljIHN0YXRpYyBSZXNNYW5hZ2VyID0gUmVzTWFuYWdlci5JbnN0YW5jZShSZXNNYW5hZ2VyKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgU2Vzc2lvbk1hbmFnZXIgPSBTZXNzaW9uTWFuYWdlci5JbnN0YW5jZShTZXNzaW9uTWFuYWdlcik7XHJcbiAgICBwdWJsaWMgc3RhdGljIEdhbWVTZXNzaW9uID0gR2FtZVNlc3Npb24uSW5zdGFuY2UoR2FtZVNlc3Npb24pO1xyXG4gICAgcHVibGljIHN0YXRpYyBIdHRwTWFuYWdlciA9IEh0dHBNYW5hZ2VyLkluc3RhbmNlKEh0dHBNYW5hZ2VyKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgQXVkaW9NYW5hZ2VyID0gQXVkaW9NYW5hZ2VyLkluc3RhbmNlO1xyXG59XHJcbiIsIi8qZXNsaW50LWRpc2FibGUgYmxvY2stc2NvcGVkLXZhciwgaWQtbGVuZ3RoLCBuby1jb250cm9sLXJlZ2V4LCBuby1tYWdpYy1udW1iZXJzLCBuby1wcm90b3R5cGUtYnVpbHRpbnMsIG5vLXJlZGVjbGFyZSwgbm8tc2hhZG93LCBuby12YXIsIHNvcnQtdmFycyovXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyICRwcm90b2J1ZiA9IHJlcXVpcmUoXCJwcm90b2J1ZmpzL21pbmltYWxcIik7XHJcblxyXG4vLyBDb21tb24gYWxpYXNlc1xyXG52YXIgJFJlYWRlciA9ICRwcm90b2J1Zi5SZWFkZXIsICRXcml0ZXIgPSAkcHJvdG9idWYuV3JpdGVyLCAkdXRpbCA9ICRwcm90b2J1Zi51dGlsO1xyXG5cclxudmFyIExvbmcgPSByZXF1aXJlKFwibG9uZ1wiKTtcclxuJHByb3RvYnVmLnV0aWwuTG9uZyA9IExvbmc7XHJcbiRwcm90b2J1Zi5jb25maWd1cmUoKTtcclxuXHJcblxyXG4vLyBFeHBvcnRlZCByb290IG5hbWVzcGFjZVxyXG52YXIgJHJvb3QgPSAkcHJvdG9idWYucm9vdHNbXCJkZWZhdWx0XCJdIHx8ICgkcHJvdG9idWYucm9vdHNbXCJkZWZhdWx0XCJdID0ge30pO1xyXG5cclxuJHJvb3QubmljZV90cyA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE5hbWVzcGFjZSBuaWNlX3RzLlxyXG4gICAgICogQGV4cG9ydHMgbmljZV90c1xyXG4gICAgICogQG5hbWVzcGFjZVxyXG4gICAgICovXHJcbiAgICB2YXIgbmljZV90cyA9IHt9O1xyXG5cclxuICAgIG5pY2VfdHMuQzJSX0xvZ2luID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQcm9wZXJ0aWVzIG9mIGEgQzJSX0xvZ2luLlxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzXHJcbiAgICAgICAgICogQGludGVyZmFjZSBJQzJSX0xvZ2luXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtzdHJpbmd8bnVsbH0gW0FjY291bnRdIEMyUl9Mb2dpbiBBY2NvdW50XHJcbiAgICAgICAgICogQHByb3BlcnR5IHtzdHJpbmd8bnVsbH0gW1Bhc3N3b3JkXSBDMlJfTG9naW4gUGFzc3dvcmRcclxuICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ29uc3RydWN0cyBhIG5ldyBDMlJfTG9naW4uXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHNcclxuICAgICAgICAgKiBAY2xhc3NkZXNjIFJlcHJlc2VudHMgYSBDMlJfTG9naW4uXHJcbiAgICAgICAgICogQGltcGxlbWVudHMgSUMyUl9Mb2dpblxyXG4gICAgICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICAgICAqIEBwYXJhbSB7bmljZV90cy5JQzJSX0xvZ2luPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gQzJSX0xvZ2luKHByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgaWYgKHByb3BlcnRpZXMpXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXlzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyksIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSlcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllc1trZXlzW2ldXSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2tleXNbaV1dID0gcHJvcGVydGllc1trZXlzW2ldXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEMyUl9Mb2dpbiBBY2NvdW50LlxyXG4gICAgICAgICAqIEBtZW1iZXIge3N0cmluZ30gQWNjb3VudFxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyUl9Mb2dpblxyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyUl9Mb2dpbi5wcm90b3R5cGUuQWNjb3VudCA9IFwiXCI7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEMyUl9Mb2dpbiBQYXNzd29yZC5cclxuICAgICAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IFBhc3N3b3JkXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJSX0xvZ2luXHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJSX0xvZ2luLnByb3RvdHlwZS5QYXNzd29yZCA9IFwiXCI7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENyZWF0ZXMgYSBuZXcgQzJSX0xvZ2luIGluc3RhbmNlIHVzaW5nIHRoZSBzcGVjaWZpZWQgcHJvcGVydGllcy5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gY3JlYXRlXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJSX0xvZ2luXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7bmljZV90cy5JQzJSX0xvZ2luPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XHJcbiAgICAgICAgICogQHJldHVybnMge25pY2VfdHMuQzJSX0xvZ2lufSBDMlJfTG9naW4gaW5zdGFuY2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBDMlJfTG9naW4uY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKHByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBDMlJfTG9naW4ocHJvcGVydGllcyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIEMyUl9Mb2dpbiBtZXNzYWdlLiBEb2VzIG5vdCBpbXBsaWNpdGx5IHtAbGluayBuaWNlX3RzLkMyUl9Mb2dpbi52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZW5jb2RlXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJSX0xvZ2luXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7bmljZV90cy5JQzJSX0xvZ2lufSBtZXNzYWdlIEMyUl9Mb2dpbiBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cclxuICAgICAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJSX0xvZ2luLmVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShtZXNzYWdlLCB3cml0ZXIpIHtcclxuICAgICAgICAgICAgaWYgKCF3cml0ZXIpXHJcbiAgICAgICAgICAgICAgICB3cml0ZXIgPSAkV3JpdGVyLmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5BY2NvdW50ICE9IG51bGwgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobWVzc2FnZSwgXCJBY2NvdW50XCIpKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAxLCB3aXJlVHlwZSAyID0qLzEwKS5zdHJpbmcobWVzc2FnZS5BY2NvdW50KTtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuUGFzc3dvcmQgIT0gbnVsbCAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtZXNzYWdlLCBcIlBhc3N3b3JkXCIpKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAyLCB3aXJlVHlwZSAyID0qLzE4KS5zdHJpbmcobWVzc2FnZS5QYXNzd29yZCk7XHJcbiAgICAgICAgICAgIHJldHVybiB3cml0ZXI7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIEMyUl9Mb2dpbiBtZXNzYWdlLCBsZW5ndGggZGVsaW1pdGVkLiBEb2VzIG5vdCBpbXBsaWNpdGx5IHtAbGluayBuaWNlX3RzLkMyUl9Mb2dpbi52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJSX0xvZ2luXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7bmljZV90cy5JQzJSX0xvZ2lufSBtZXNzYWdlIEMyUl9Mb2dpbiBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cclxuICAgICAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJSX0xvZ2luLmVuY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZChtZXNzYWdlLCB3cml0ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikubGRlbGltKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGVjb2RlcyBhIEMyUl9Mb2dpbiBtZXNzYWdlIGZyb20gdGhlIHNwZWNpZmllZCByZWFkZXIgb3IgYnVmZmVyLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBkZWNvZGVcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5DMlJfTG9naW5cclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGhdIE1lc3NhZ2UgbGVuZ3RoIGlmIGtub3duIGJlZm9yZWhhbmRcclxuICAgICAgICAgKiBAcmV0dXJucyB7bmljZV90cy5DMlJfTG9naW59IEMyUl9Mb2dpblxyXG4gICAgICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXHJcbiAgICAgICAgICogQHRocm93cyB7JHByb3RvYnVmLnV0aWwuUHJvdG9jb2xFcnJvcn0gSWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJSX0xvZ2luLmRlY29kZSA9IGZ1bmN0aW9uIGRlY29kZShyZWFkZXIsIGxlbmd0aCkge1xyXG4gICAgICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcclxuICAgICAgICAgICAgICAgIHJlYWRlciA9ICRSZWFkZXIuY3JlYXRlKHJlYWRlcik7XHJcbiAgICAgICAgICAgIHZhciBlbmQgPSBsZW5ndGggPT09IHVuZGVmaW5lZCA/IHJlYWRlci5sZW4gOiByZWFkZXIucG9zICsgbGVuZ3RoLCBtZXNzYWdlID0gbmV3ICRyb290Lm5pY2VfdHMuQzJSX0xvZ2luKCk7XHJcbiAgICAgICAgICAgIHdoaWxlIChyZWFkZXIucG9zIDwgZW5kKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGFnID0gcmVhZGVyLnVpbnQzMigpO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0YWcgPj4+IDMpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLkFjY291bnQgPSByZWFkZXIuc3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5QYXNzd29yZCA9IHJlYWRlci5zdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyLnNraXBUeXBlKHRhZyAmIDcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlY29kZXMgYSBDMlJfTG9naW4gbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlciwgbGVuZ3RoIGRlbGltaXRlZC5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJSX0xvZ2luXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuaWNlX3RzLkMyUl9Mb2dpbn0gQzJSX0xvZ2luXHJcbiAgICAgICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcclxuICAgICAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcclxuICAgICAgICAgKi9cclxuICAgICAgICBDMlJfTG9naW4uZGVjb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkKHJlYWRlcikge1xyXG4gICAgICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcclxuICAgICAgICAgICAgICAgIHJlYWRlciA9IG5ldyAkUmVhZGVyKHJlYWRlcik7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlY29kZShyZWFkZXIsIHJlYWRlci51aW50MzIoKSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVmVyaWZpZXMgYSBDMlJfTG9naW4gbWVzc2FnZS5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gdmVyaWZ5XHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJSX0xvZ2luXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG1lc3NhZ2UgUGxhaW4gb2JqZWN0IHRvIHZlcmlmeVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH0gYG51bGxgIGlmIHZhbGlkLCBvdGhlcndpc2UgdGhlIHJlYXNvbiB3aHkgaXQgaXMgbm90XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJSX0xvZ2luLnZlcmlmeSA9IGZ1bmN0aW9uIHZlcmlmeShtZXNzYWdlKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSAhPT0gXCJvYmplY3RcIiB8fCBtZXNzYWdlID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwib2JqZWN0IGV4cGVjdGVkXCI7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLkFjY291bnQgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiQWNjb3VudFwiKSlcclxuICAgICAgICAgICAgICAgIGlmICghJHV0aWwuaXNTdHJpbmcobWVzc2FnZS5BY2NvdW50KSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJBY2NvdW50OiBzdHJpbmcgZXhwZWN0ZWRcIjtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuUGFzc3dvcmQgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiUGFzc3dvcmRcIikpXHJcbiAgICAgICAgICAgICAgICBpZiAoISR1dGlsLmlzU3RyaW5nKG1lc3NhZ2UuUGFzc3dvcmQpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlBhc3N3b3JkOiBzdHJpbmcgZXhwZWN0ZWRcIjtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlcyBhIEMyUl9Mb2dpbiBtZXNzYWdlIGZyb20gYSBwbGFpbiBvYmplY3QuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIHRoZWlyIHJlc3BlY3RpdmUgaW50ZXJuYWwgdHlwZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGZyb21PYmplY3RcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5DMlJfTG9naW5cclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gb2JqZWN0IFBsYWluIG9iamVjdFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuaWNlX3RzLkMyUl9Mb2dpbn0gQzJSX0xvZ2luXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJSX0xvZ2luLmZyb21PYmplY3QgPSBmdW5jdGlvbiBmcm9tT2JqZWN0KG9iamVjdCkge1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgJHJvb3QubmljZV90cy5DMlJfTG9naW4pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IG5ldyAkcm9vdC5uaWNlX3RzLkMyUl9Mb2dpbigpO1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0LkFjY291bnQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuQWNjb3VudCA9IFN0cmluZyhvYmplY3QuQWNjb3VudCk7XHJcbiAgICAgICAgICAgIGlmIChvYmplY3QuUGFzc3dvcmQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuUGFzc3dvcmQgPSBTdHJpbmcob2JqZWN0LlBhc3N3b3JkKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlcyBhIHBsYWluIG9iamVjdCBmcm9tIGEgQzJSX0xvZ2luIG1lc3NhZ2UuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIG90aGVyIHR5cGVzIGlmIHNwZWNpZmllZC5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gdG9PYmplY3RcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5DMlJfTG9naW5cclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLkMyUl9Mb2dpbn0gbWVzc2FnZSBDMlJfTG9naW5cclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5JQ29udmVyc2lvbk9wdGlvbnN9IFtvcHRpb25zXSBDb252ZXJzaW9uIG9wdGlvbnNcclxuICAgICAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IFBsYWluIG9iamVjdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyUl9Mb2dpbi50b09iamVjdCA9IGZ1bmN0aW9uIHRvT2JqZWN0KG1lc3NhZ2UsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgaWYgKCFvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHt9O1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0ID0ge307XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmRlZmF1bHRzKSB7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QuQWNjb3VudCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QuUGFzc3dvcmQgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLkFjY291bnQgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiQWNjb3VudFwiKSlcclxuICAgICAgICAgICAgICAgIG9iamVjdC5BY2NvdW50ID0gbWVzc2FnZS5BY2NvdW50O1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5QYXNzd29yZCAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJQYXNzd29yZFwiKSlcclxuICAgICAgICAgICAgICAgIG9iamVjdC5QYXNzd29yZCA9IG1lc3NhZ2UuUGFzc3dvcmQ7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ29udmVydHMgdGhpcyBDMlJfTG9naW4gdG8gSlNPTi5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gdG9KU09OXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJSX0xvZ2luXHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBKU09OIG9iamVjdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyUl9Mb2dpbi5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci50b09iamVjdCh0aGlzLCAkcHJvdG9idWYudXRpbC50b0pTT05PcHRpb25zKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gQzJSX0xvZ2luO1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICBuaWNlX3RzLlIyQ19Mb2dpbiA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJvcGVydGllcyBvZiBhIFIyQ19Mb2dpbi5cclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90c1xyXG4gICAgICAgICAqIEBpbnRlcmZhY2UgSVIyQ19Mb2dpblxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfG51bGx9IFtFcnJvcl0gUjJDX0xvZ2luIEVycm9yXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtzdHJpbmd8bnVsbH0gW01lc3NhZ2VdIFIyQ19Mb2dpbiBNZXNzYWdlXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtzdHJpbmd8bnVsbH0gW0FkZHJlc3NdIFIyQ19Mb2dpbiBBZGRyZXNzXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ8TG9uZ3xudWxsfSBbS2V5XSBSMkNfTG9naW4gS2V5XHJcbiAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ8TG9uZ3xudWxsfSBbR2F0ZUlkXSBSMkNfTG9naW4gR2F0ZUlkXHJcbiAgICAgICAgICovXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnN0cnVjdHMgYSBuZXcgUjJDX0xvZ2luLlxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzXHJcbiAgICAgICAgICogQGNsYXNzZGVzYyBSZXByZXNlbnRzIGEgUjJDX0xvZ2luLlxyXG4gICAgICAgICAqIEBpbXBsZW1lbnRzIElSMkNfTG9naW5cclxuICAgICAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSVIyQ19Mb2dpbj19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIFIyQ19Mb2dpbihwcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzKVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXNba2V5c1tpXV0gIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1trZXlzW2ldXSA9IHByb3BlcnRpZXNba2V5c1tpXV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSMkNfTG9naW4gRXJyb3IuXHJcbiAgICAgICAgICogQG1lbWJlciB7bnVtYmVyfSBFcnJvclxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLlIyQ19Mb2dpblxyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFIyQ19Mb2dpbi5wcm90b3R5cGUuRXJyb3IgPSAwO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSMkNfTG9naW4gTWVzc2FnZS5cclxuICAgICAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IE1lc3NhZ2VcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5SMkNfTG9naW5cclxuICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBSMkNfTG9naW4ucHJvdG90eXBlLk1lc3NhZ2UgPSBcIlwiO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSMkNfTG9naW4gQWRkcmVzcy5cclxuICAgICAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IEFkZHJlc3NcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5SMkNfTG9naW5cclxuICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBSMkNfTG9naW4ucHJvdG90eXBlLkFkZHJlc3MgPSBcIlwiO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSMkNfTG9naW4gS2V5LlxyXG4gICAgICAgICAqIEBtZW1iZXIge251bWJlcnxMb25nfSBLZXlcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5SMkNfTG9naW5cclxuICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBSMkNfTG9naW4ucHJvdG90eXBlLktleSA9ICR1dGlsLkxvbmcgPyAkdXRpbC5Mb25nLmZyb21CaXRzKDAsMCxmYWxzZSkgOiAwO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSMkNfTG9naW4gR2F0ZUlkLlxyXG4gICAgICAgICAqIEBtZW1iZXIge251bWJlcnxMb25nfSBHYXRlSWRcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5SMkNfTG9naW5cclxuICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBSMkNfTG9naW4ucHJvdG90eXBlLkdhdGVJZCA9ICR1dGlsLkxvbmcgPyAkdXRpbC5Mb25nLmZyb21CaXRzKDAsMCxmYWxzZSkgOiAwO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGVzIGEgbmV3IFIyQ19Mb2dpbiBpbnN0YW5jZSB1c2luZyB0aGUgc3BlY2lmaWVkIHByb3BlcnRpZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGNyZWF0ZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLlIyQ19Mb2dpblxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSVIyQ19Mb2dpbj19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuaWNlX3RzLlIyQ19Mb2dpbn0gUjJDX0xvZ2luIGluc3RhbmNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgUjJDX0xvZ2luLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShwcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUjJDX0xvZ2luKHByb3BlcnRpZXMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBSMkNfTG9naW4gbWVzc2FnZS4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgbmljZV90cy5SMkNfTG9naW4udmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGVuY29kZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLlIyQ19Mb2dpblxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSVIyQ19Mb2dpbn0gbWVzc2FnZSBSMkNfTG9naW4gbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXHJcbiAgICAgICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFIyQ19Mb2dpbi5lbmNvZGUgPSBmdW5jdGlvbiBlbmNvZGUobWVzc2FnZSwgd3JpdGVyKSB7XHJcbiAgICAgICAgICAgIGlmICghd3JpdGVyKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVyID0gJFdyaXRlci5jcmVhdGUoKTtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuQWRkcmVzcyAhPSBudWxsICYmIE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1lc3NhZ2UsIFwiQWRkcmVzc1wiKSlcclxuICAgICAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMSwgd2lyZVR5cGUgMiA9Ki8xMCkuc3RyaW5nKG1lc3NhZ2UuQWRkcmVzcyk7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLktleSAhPSBudWxsICYmIE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1lc3NhZ2UsIFwiS2V5XCIpKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAyLCB3aXJlVHlwZSAwID0qLzE2KS5pbnQ2NChtZXNzYWdlLktleSk7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLkdhdGVJZCAhPSBudWxsICYmIE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1lc3NhZ2UsIFwiR2F0ZUlkXCIpKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAzLCB3aXJlVHlwZSAwID0qLzI0KS5pbnQ2NChtZXNzYWdlLkdhdGVJZCk7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLkVycm9yICE9IG51bGwgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobWVzc2FnZSwgXCJFcnJvclwiKSlcclxuICAgICAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgOTEsIHdpcmVUeXBlIDAgPSovNzI4KS5pbnQzMihtZXNzYWdlLkVycm9yKTtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuTWVzc2FnZSAhPSBudWxsICYmIE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1lc3NhZ2UsIFwiTWVzc2FnZVwiKSlcclxuICAgICAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgOTIsIHdpcmVUeXBlIDIgPSovNzM4KS5zdHJpbmcobWVzc2FnZS5NZXNzYWdlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHdyaXRlcjtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgUjJDX0xvZ2luIG1lc3NhZ2UsIGxlbmd0aCBkZWxpbWl0ZWQuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIG5pY2VfdHMuUjJDX0xvZ2luLnZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWRcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5SMkNfTG9naW5cclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLklSMkNfTG9naW59IG1lc3NhZ2UgUjJDX0xvZ2luIG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxyXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xyXG4gICAgICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBSMkNfTG9naW4uZW5jb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkKG1lc3NhZ2UsIHdyaXRlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbmNvZGUobWVzc2FnZSwgd3JpdGVyKS5sZGVsaW0oKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWNvZGVzIGEgUjJDX0xvZ2luIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGRlY29kZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLlIyQ19Mb2dpblxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5SZWFkZXJ8VWludDhBcnJheX0gcmVhZGVyIFJlYWRlciBvciBidWZmZXIgdG8gZGVjb2RlIGZyb21cclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aF0gTWVzc2FnZSBsZW5ndGggaWYga25vd24gYmVmb3JlaGFuZFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuaWNlX3RzLlIyQ19Mb2dpbn0gUjJDX0xvZ2luXHJcbiAgICAgICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcclxuICAgICAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcclxuICAgICAgICAgKi9cclxuICAgICAgICBSMkNfTG9naW4uZGVjb2RlID0gZnVuY3Rpb24gZGVjb2RlKHJlYWRlciwgbGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxyXG4gICAgICAgICAgICAgICAgcmVhZGVyID0gJFJlYWRlci5jcmVhdGUocmVhZGVyKTtcclxuICAgICAgICAgICAgdmFyIGVuZCA9IGxlbmd0aCA9PT0gdW5kZWZpbmVkID8gcmVhZGVyLmxlbiA6IHJlYWRlci5wb3MgKyBsZW5ndGgsIG1lc3NhZ2UgPSBuZXcgJHJvb3QubmljZV90cy5SMkNfTG9naW4oKTtcclxuICAgICAgICAgICAgd2hpbGUgKHJlYWRlci5wb3MgPCBlbmQpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0YWcgPSByZWFkZXIudWludDMyKCk7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRhZyA+Pj4gMykge1xyXG4gICAgICAgICAgICAgICAgY2FzZSA5MTpcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLkVycm9yID0gcmVhZGVyLmludDMyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDkyOlxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuTWVzc2FnZSA9IHJlYWRlci5zdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLkFkZHJlc3MgPSByZWFkZXIuc3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5LZXkgPSByZWFkZXIuaW50NjQoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLkdhdGVJZCA9IHJlYWRlci5pbnQ2NCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICByZWFkZXIuc2tpcFR5cGUodGFnICYgNyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGVjb2RlcyBhIFIyQ19Mb2dpbiBtZXNzYWdlIGZyb20gdGhlIHNwZWNpZmllZCByZWFkZXIgb3IgYnVmZmVyLCBsZW5ndGggZGVsaW1pdGVkLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBkZWNvZGVEZWxpbWl0ZWRcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5SMkNfTG9naW5cclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXHJcbiAgICAgICAgICogQHJldHVybnMge25pY2VfdHMuUjJDX0xvZ2lufSBSMkNfTG9naW5cclxuICAgICAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxyXG4gICAgICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFIyQ19Mb2dpbi5kZWNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBkZWNvZGVEZWxpbWl0ZWQocmVhZGVyKSB7XHJcbiAgICAgICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxyXG4gICAgICAgICAgICAgICAgcmVhZGVyID0gbmV3ICRSZWFkZXIocmVhZGVyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGVjb2RlKHJlYWRlciwgcmVhZGVyLnVpbnQzMigpKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWZXJpZmllcyBhIFIyQ19Mb2dpbiBtZXNzYWdlLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiB2ZXJpZnlcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5SMkNfTG9naW5cclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gbWVzc2FnZSBQbGFpbiBvYmplY3QgdG8gdmVyaWZ5XHJcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ3xudWxsfSBgbnVsbGAgaWYgdmFsaWQsIG90aGVyd2lzZSB0aGUgcmVhc29uIHdoeSBpdCBpcyBub3RcclxuICAgICAgICAgKi9cclxuICAgICAgICBSMkNfTG9naW4udmVyaWZ5ID0gZnVuY3Rpb24gdmVyaWZ5KG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSBcIm9iamVjdFwiIHx8IG1lc3NhZ2UgPT09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJvYmplY3QgZXhwZWN0ZWRcIjtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuRXJyb3IgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiRXJyb3JcIikpXHJcbiAgICAgICAgICAgICAgICBpZiAoISR1dGlsLmlzSW50ZWdlcihtZXNzYWdlLkVycm9yKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJFcnJvcjogaW50ZWdlciBleHBlY3RlZFwiO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5NZXNzYWdlICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIk1lc3NhZ2VcIikpXHJcbiAgICAgICAgICAgICAgICBpZiAoISR1dGlsLmlzU3RyaW5nKG1lc3NhZ2UuTWVzc2FnZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiTWVzc2FnZTogc3RyaW5nIGV4cGVjdGVkXCI7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLkFkZHJlc3MgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiQWRkcmVzc1wiKSlcclxuICAgICAgICAgICAgICAgIGlmICghJHV0aWwuaXNTdHJpbmcobWVzc2FnZS5BZGRyZXNzKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJBZGRyZXNzOiBzdHJpbmcgZXhwZWN0ZWRcIjtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuS2V5ICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIktleVwiKSlcclxuICAgICAgICAgICAgICAgIGlmICghJHV0aWwuaXNJbnRlZ2VyKG1lc3NhZ2UuS2V5KSAmJiAhKG1lc3NhZ2UuS2V5ICYmICR1dGlsLmlzSW50ZWdlcihtZXNzYWdlLktleS5sb3cpICYmICR1dGlsLmlzSW50ZWdlcihtZXNzYWdlLktleS5oaWdoKSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiS2V5OiBpbnRlZ2VyfExvbmcgZXhwZWN0ZWRcIjtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuR2F0ZUlkICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIkdhdGVJZFwiKSlcclxuICAgICAgICAgICAgICAgIGlmICghJHV0aWwuaXNJbnRlZ2VyKG1lc3NhZ2UuR2F0ZUlkKSAmJiAhKG1lc3NhZ2UuR2F0ZUlkICYmICR1dGlsLmlzSW50ZWdlcihtZXNzYWdlLkdhdGVJZC5sb3cpICYmICR1dGlsLmlzSW50ZWdlcihtZXNzYWdlLkdhdGVJZC5oaWdoKSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiR2F0ZUlkOiBpbnRlZ2VyfExvbmcgZXhwZWN0ZWRcIjtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlcyBhIFIyQ19Mb2dpbiBtZXNzYWdlIGZyb20gYSBwbGFpbiBvYmplY3QuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIHRoZWlyIHJlc3BlY3RpdmUgaW50ZXJuYWwgdHlwZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGZyb21PYmplY3RcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5SMkNfTG9naW5cclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gb2JqZWN0IFBsYWluIG9iamVjdFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuaWNlX3RzLlIyQ19Mb2dpbn0gUjJDX0xvZ2luXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgUjJDX0xvZ2luLmZyb21PYmplY3QgPSBmdW5jdGlvbiBmcm9tT2JqZWN0KG9iamVjdCkge1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgJHJvb3QubmljZV90cy5SMkNfTG9naW4pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IG5ldyAkcm9vdC5uaWNlX3RzLlIyQ19Mb2dpbigpO1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0LkVycm9yICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLkVycm9yID0gb2JqZWN0LkVycm9yIHwgMDtcclxuICAgICAgICAgICAgaWYgKG9iamVjdC5NZXNzYWdlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLk1lc3NhZ2UgPSBTdHJpbmcob2JqZWN0Lk1lc3NhZ2UpO1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0LkFkZHJlc3MgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuQWRkcmVzcyA9IFN0cmluZyhvYmplY3QuQWRkcmVzcyk7XHJcbiAgICAgICAgICAgIGlmIChvYmplY3QuS2V5ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBpZiAoJHV0aWwuTG9uZylcclxuICAgICAgICAgICAgICAgICAgICAobWVzc2FnZS5LZXkgPSAkdXRpbC5Mb25nLmZyb21WYWx1ZShvYmplY3QuS2V5KSkudW5zaWduZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmplY3QuS2V5ID09PSBcInN0cmluZ1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuS2V5ID0gcGFyc2VJbnQob2JqZWN0LktleSwgMTApO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9iamVjdC5LZXkgPT09IFwibnVtYmVyXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5LZXkgPSBvYmplY3QuS2V5O1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9iamVjdC5LZXkgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5LZXkgPSBuZXcgJHV0aWwuTG9uZ0JpdHMob2JqZWN0LktleS5sb3cgPj4+IDAsIG9iamVjdC5LZXkuaGlnaCA+Pj4gMCkudG9OdW1iZXIoKTtcclxuICAgICAgICAgICAgaWYgKG9iamVjdC5HYXRlSWQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIGlmICgkdXRpbC5Mb25nKVxyXG4gICAgICAgICAgICAgICAgICAgIChtZXNzYWdlLkdhdGVJZCA9ICR1dGlsLkxvbmcuZnJvbVZhbHVlKG9iamVjdC5HYXRlSWQpKS51bnNpZ25lZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9iamVjdC5HYXRlSWQgPT09IFwic3RyaW5nXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5HYXRlSWQgPSBwYXJzZUludChvYmplY3QuR2F0ZUlkLCAxMCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0LkdhdGVJZCA9PT0gXCJudW1iZXJcIilcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLkdhdGVJZCA9IG9iamVjdC5HYXRlSWQ7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0LkdhdGVJZCA9PT0gXCJvYmplY3RcIilcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLkdhdGVJZCA9IG5ldyAkdXRpbC5Mb25nQml0cyhvYmplY3QuR2F0ZUlkLmxvdyA+Pj4gMCwgb2JqZWN0LkdhdGVJZC5oaWdoID4+PiAwKS50b051bWJlcigpO1xyXG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGVzIGEgcGxhaW4gb2JqZWN0IGZyb20gYSBSMkNfTG9naW4gbWVzc2FnZS4gQWxzbyBjb252ZXJ0cyB2YWx1ZXMgdG8gb3RoZXIgdHlwZXMgaWYgc3BlY2lmaWVkLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiB0b09iamVjdFxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLlIyQ19Mb2dpblxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuUjJDX0xvZ2lufSBtZXNzYWdlIFIyQ19Mb2dpblxyXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLklDb252ZXJzaW9uT3B0aW9uc30gW29wdGlvbnNdIENvbnZlcnNpb24gb3B0aW9uc1xyXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gUGxhaW4gb2JqZWN0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgUjJDX0xvZ2luLnRvT2JqZWN0ID0gZnVuY3Rpb24gdG9PYmplY3QobWVzc2FnZSwgb3B0aW9ucykge1xyXG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zID0ge307XHJcbiAgICAgICAgICAgIHZhciBvYmplY3QgPSB7fTtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZGVmYXVsdHMpIHtcclxuICAgICAgICAgICAgICAgIG9iamVjdC5BZGRyZXNzID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGlmICgkdXRpbC5Mb25nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxvbmcgPSBuZXcgJHV0aWwuTG9uZygwLCAwLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LktleSA9IG9wdGlvbnMubG9uZ3MgPT09IFN0cmluZyA/IGxvbmcudG9TdHJpbmcoKSA6IG9wdGlvbnMubG9uZ3MgPT09IE51bWJlciA/IGxvbmcudG9OdW1iZXIoKSA6IGxvbmc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3QuS2V5ID0gb3B0aW9ucy5sb25ncyA9PT0gU3RyaW5nID8gXCIwXCIgOiAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKCR1dGlsLkxvbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbG9uZyA9IG5ldyAkdXRpbC5Mb25nKDAsIDAsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3QuR2F0ZUlkID0gb3B0aW9ucy5sb25ncyA9PT0gU3RyaW5nID8gbG9uZy50b1N0cmluZygpIDogb3B0aW9ucy5sb25ncyA9PT0gTnVtYmVyID8gbG9uZy50b051bWJlcigpIDogbG9uZztcclxuICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC5HYXRlSWQgPSBvcHRpb25zLmxvbmdzID09PSBTdHJpbmcgPyBcIjBcIiA6IDA7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QuRXJyb3IgPSAwO1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0Lk1lc3NhZ2UgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLkFkZHJlc3MgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiQWRkcmVzc1wiKSlcclxuICAgICAgICAgICAgICAgIG9iamVjdC5BZGRyZXNzID0gbWVzc2FnZS5BZGRyZXNzO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5LZXkgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiS2V5XCIpKVxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlLktleSA9PT0gXCJudW1iZXJcIilcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3QuS2V5ID0gb3B0aW9ucy5sb25ncyA9PT0gU3RyaW5nID8gU3RyaW5nKG1lc3NhZ2UuS2V5KSA6IG1lc3NhZ2UuS2V5O1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC5LZXkgPSBvcHRpb25zLmxvbmdzID09PSBTdHJpbmcgPyAkdXRpbC5Mb25nLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG1lc3NhZ2UuS2V5KSA6IG9wdGlvbnMubG9uZ3MgPT09IE51bWJlciA/IG5ldyAkdXRpbC5Mb25nQml0cyhtZXNzYWdlLktleS5sb3cgPj4+IDAsIG1lc3NhZ2UuS2V5LmhpZ2ggPj4+IDApLnRvTnVtYmVyKCkgOiBtZXNzYWdlLktleTtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuR2F0ZUlkICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIkdhdGVJZFwiKSlcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZS5HYXRlSWQgPT09IFwibnVtYmVyXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LkdhdGVJZCA9IG9wdGlvbnMubG9uZ3MgPT09IFN0cmluZyA/IFN0cmluZyhtZXNzYWdlLkdhdGVJZCkgOiBtZXNzYWdlLkdhdGVJZDtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3QuR2F0ZUlkID0gb3B0aW9ucy5sb25ncyA9PT0gU3RyaW5nID8gJHV0aWwuTG9uZy5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChtZXNzYWdlLkdhdGVJZCkgOiBvcHRpb25zLmxvbmdzID09PSBOdW1iZXIgPyBuZXcgJHV0aWwuTG9uZ0JpdHMobWVzc2FnZS5HYXRlSWQubG93ID4+PiAwLCBtZXNzYWdlLkdhdGVJZC5oaWdoID4+PiAwKS50b051bWJlcigpIDogbWVzc2FnZS5HYXRlSWQ7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLkVycm9yICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIkVycm9yXCIpKVxyXG4gICAgICAgICAgICAgICAgb2JqZWN0LkVycm9yID0gbWVzc2FnZS5FcnJvcjtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuTWVzc2FnZSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJNZXNzYWdlXCIpKVxyXG4gICAgICAgICAgICAgICAgb2JqZWN0Lk1lc3NhZ2UgPSBtZXNzYWdlLk1lc3NhZ2U7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ29udmVydHMgdGhpcyBSMkNfTG9naW4gdG8gSlNPTi5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gdG9KU09OXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuUjJDX0xvZ2luXHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBKU09OIG9iamVjdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFIyQ19Mb2dpbi5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci50b09iamVjdCh0aGlzLCAkcHJvdG9idWYudXRpbC50b0pTT05PcHRpb25zKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gUjJDX0xvZ2luO1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICBuaWNlX3RzLkMyR19Mb2dpbkdhdGUgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFByb3BlcnRpZXMgb2YgYSBDMkdfTG9naW5HYXRlLlxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzXHJcbiAgICAgICAgICogQGludGVyZmFjZSBJQzJHX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfExvbmd8bnVsbH0gW0tleV0gQzJHX0xvZ2luR2F0ZSBLZXlcclxuICAgICAgICAgKiBAcHJvcGVydHkge251bWJlcnxMb25nfG51bGx9IFtHYXRlSWRdIEMyR19Mb2dpbkdhdGUgR2F0ZUlkXHJcbiAgICAgICAgICovXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnN0cnVjdHMgYSBuZXcgQzJHX0xvZ2luR2F0ZS5cclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90c1xyXG4gICAgICAgICAqIEBjbGFzc2Rlc2MgUmVwcmVzZW50cyBhIEMyR19Mb2dpbkdhdGUuXHJcbiAgICAgICAgICogQGltcGxlbWVudHMgSUMyR19Mb2dpbkdhdGVcclxuICAgICAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSUMyR19Mb2dpbkdhdGU9fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBDMkdfTG9naW5HYXRlKHByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgaWYgKHByb3BlcnRpZXMpXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXlzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyksIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSlcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllc1trZXlzW2ldXSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2tleXNbaV1dID0gcHJvcGVydGllc1trZXlzW2ldXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEMyR19Mb2dpbkdhdGUgS2V5LlxyXG4gICAgICAgICAqIEBtZW1iZXIge251bWJlcnxMb25nfSBLZXlcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5DMkdfTG9naW5HYXRlXHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJHX0xvZ2luR2F0ZS5wcm90b3R5cGUuS2V5ID0gJHV0aWwuTG9uZyA/ICR1dGlsLkxvbmcuZnJvbUJpdHMoMCwwLGZhbHNlKSA6IDA7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEMyR19Mb2dpbkdhdGUgR2F0ZUlkLlxyXG4gICAgICAgICAqIEBtZW1iZXIge251bWJlcnxMb25nfSBHYXRlSWRcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5DMkdfTG9naW5HYXRlXHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJHX0xvZ2luR2F0ZS5wcm90b3R5cGUuR2F0ZUlkID0gJHV0aWwuTG9uZyA/ICR1dGlsLkxvbmcuZnJvbUJpdHMoMCwwLGZhbHNlKSA6IDA7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENyZWF0ZXMgYSBuZXcgQzJHX0xvZ2luR2F0ZSBpbnN0YW5jZSB1c2luZyB0aGUgc3BlY2lmaWVkIHByb3BlcnRpZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGNyZWF0ZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyR19Mb2dpbkdhdGVcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLklDMkdfTG9naW5HYXRlPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XHJcbiAgICAgICAgICogQHJldHVybnMge25pY2VfdHMuQzJHX0xvZ2luR2F0ZX0gQzJHX0xvZ2luR2F0ZSBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyR19Mb2dpbkdhdGUuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKHByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBDMkdfTG9naW5HYXRlKHByb3BlcnRpZXMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBDMkdfTG9naW5HYXRlIG1lc3NhZ2UuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIG5pY2VfdHMuQzJHX0xvZ2luR2F0ZS52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZW5jb2RlXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJHX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSUMyR19Mb2dpbkdhdGV9IG1lc3NhZ2UgQzJHX0xvZ2luR2F0ZSBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cclxuICAgICAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJHX0xvZ2luR2F0ZS5lbmNvZGUgPSBmdW5jdGlvbiBlbmNvZGUobWVzc2FnZSwgd3JpdGVyKSB7XHJcbiAgICAgICAgICAgIGlmICghd3JpdGVyKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVyID0gJFdyaXRlci5jcmVhdGUoKTtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuS2V5ICE9IG51bGwgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobWVzc2FnZSwgXCJLZXlcIikpXHJcbiAgICAgICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDEsIHdpcmVUeXBlIDAgPSovOCkuaW50NjQobWVzc2FnZS5LZXkpO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5HYXRlSWQgIT0gbnVsbCAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtZXNzYWdlLCBcIkdhdGVJZFwiKSlcclxuICAgICAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMiwgd2lyZVR5cGUgMCA9Ki8xNikuaW50NjQobWVzc2FnZS5HYXRlSWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gd3JpdGVyO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBDMkdfTG9naW5HYXRlIG1lc3NhZ2UsIGxlbmd0aCBkZWxpbWl0ZWQuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIG5pY2VfdHMuQzJHX0xvZ2luR2F0ZS52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJHX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSUMyR19Mb2dpbkdhdGV9IG1lc3NhZ2UgQzJHX0xvZ2luR2F0ZSBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cclxuICAgICAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJHX0xvZ2luR2F0ZS5lbmNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWQobWVzc2FnZSwgd3JpdGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVuY29kZShtZXNzYWdlLCB3cml0ZXIpLmxkZWxpbSgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlY29kZXMgYSBDMkdfTG9naW5HYXRlIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGRlY29kZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyR19Mb2dpbkdhdGVcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGhdIE1lc3NhZ2UgbGVuZ3RoIGlmIGtub3duIGJlZm9yZWhhbmRcclxuICAgICAgICAgKiBAcmV0dXJucyB7bmljZV90cy5DMkdfTG9naW5HYXRlfSBDMkdfTG9naW5HYXRlXHJcbiAgICAgICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcclxuICAgICAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcclxuICAgICAgICAgKi9cclxuICAgICAgICBDMkdfTG9naW5HYXRlLmRlY29kZSA9IGZ1bmN0aW9uIGRlY29kZShyZWFkZXIsIGxlbmd0aCkge1xyXG4gICAgICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcclxuICAgICAgICAgICAgICAgIHJlYWRlciA9ICRSZWFkZXIuY3JlYXRlKHJlYWRlcik7XHJcbiAgICAgICAgICAgIHZhciBlbmQgPSBsZW5ndGggPT09IHVuZGVmaW5lZCA/IHJlYWRlci5sZW4gOiByZWFkZXIucG9zICsgbGVuZ3RoLCBtZXNzYWdlID0gbmV3ICRyb290Lm5pY2VfdHMuQzJHX0xvZ2luR2F0ZSgpO1xyXG4gICAgICAgICAgICB3aGlsZSAocmVhZGVyLnBvcyA8IGVuZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRhZyA9IHJlYWRlci51aW50MzIoKTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodGFnID4+PiAzKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5LZXkgPSByZWFkZXIuaW50NjQoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLkdhdGVJZCA9IHJlYWRlci5pbnQ2NCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICByZWFkZXIuc2tpcFR5cGUodGFnICYgNyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGVjb2RlcyBhIEMyR19Mb2dpbkdhdGUgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlciwgbGVuZ3RoIGRlbGltaXRlZC5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJHX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5SZWFkZXJ8VWludDhBcnJheX0gcmVhZGVyIFJlYWRlciBvciBidWZmZXIgdG8gZGVjb2RlIGZyb21cclxuICAgICAgICAgKiBAcmV0dXJucyB7bmljZV90cy5DMkdfTG9naW5HYXRlfSBDMkdfTG9naW5HYXRlXHJcbiAgICAgICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcclxuICAgICAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcclxuICAgICAgICAgKi9cclxuICAgICAgICBDMkdfTG9naW5HYXRlLmRlY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZChyZWFkZXIpIHtcclxuICAgICAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXHJcbiAgICAgICAgICAgICAgICByZWFkZXIgPSBuZXcgJFJlYWRlcihyZWFkZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZWNvZGUocmVhZGVyLCByZWFkZXIudWludDMyKCkpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZlcmlmaWVzIGEgQzJHX0xvZ2luR2F0ZSBtZXNzYWdlLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiB2ZXJpZnlcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5DMkdfTG9naW5HYXRlXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG1lc3NhZ2UgUGxhaW4gb2JqZWN0IHRvIHZlcmlmeVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH0gYG51bGxgIGlmIHZhbGlkLCBvdGhlcndpc2UgdGhlIHJlYXNvbiB3aHkgaXQgaXMgbm90XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJHX0xvZ2luR2F0ZS52ZXJpZnkgPSBmdW5jdGlvbiB2ZXJpZnkobWVzc2FnZSkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgIT09IFwib2JqZWN0XCIgfHwgbWVzc2FnZSA9PT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIm9iamVjdCBleHBlY3RlZFwiO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5LZXkgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiS2V5XCIpKVxyXG4gICAgICAgICAgICAgICAgaWYgKCEkdXRpbC5pc0ludGVnZXIobWVzc2FnZS5LZXkpICYmICEobWVzc2FnZS5LZXkgJiYgJHV0aWwuaXNJbnRlZ2VyKG1lc3NhZ2UuS2V5LmxvdykgJiYgJHV0aWwuaXNJbnRlZ2VyKG1lc3NhZ2UuS2V5LmhpZ2gpKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJLZXk6IGludGVnZXJ8TG9uZyBleHBlY3RlZFwiO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5HYXRlSWQgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiR2F0ZUlkXCIpKVxyXG4gICAgICAgICAgICAgICAgaWYgKCEkdXRpbC5pc0ludGVnZXIobWVzc2FnZS5HYXRlSWQpICYmICEobWVzc2FnZS5HYXRlSWQgJiYgJHV0aWwuaXNJbnRlZ2VyKG1lc3NhZ2UuR2F0ZUlkLmxvdykgJiYgJHV0aWwuaXNJbnRlZ2VyKG1lc3NhZ2UuR2F0ZUlkLmhpZ2gpKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJHYXRlSWQ6IGludGVnZXJ8TG9uZyBleHBlY3RlZFwiO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGVzIGEgQzJHX0xvZ2luR2F0ZSBtZXNzYWdlIGZyb20gYSBwbGFpbiBvYmplY3QuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIHRoZWlyIHJlc3BlY3RpdmUgaW50ZXJuYWwgdHlwZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGZyb21PYmplY3RcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5DMkdfTG9naW5HYXRlXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG9iamVjdCBQbGFpbiBvYmplY3RcclxuICAgICAgICAgKiBAcmV0dXJucyB7bmljZV90cy5DMkdfTG9naW5HYXRlfSBDMkdfTG9naW5HYXRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJHX0xvZ2luR2F0ZS5mcm9tT2JqZWN0ID0gZnVuY3Rpb24gZnJvbU9iamVjdChvYmplY3QpIHtcclxuICAgICAgICAgICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mICRyb290Lm5pY2VfdHMuQzJHX0xvZ2luR2F0ZSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gbmV3ICRyb290Lm5pY2VfdHMuQzJHX0xvZ2luR2F0ZSgpO1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0LktleSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgaWYgKCR1dGlsLkxvbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgKG1lc3NhZ2UuS2V5ID0gJHV0aWwuTG9uZy5mcm9tVmFsdWUob2JqZWN0LktleSkpLnVuc2lnbmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0LktleSA9PT0gXCJzdHJpbmdcIilcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLktleSA9IHBhcnNlSW50KG9iamVjdC5LZXksIDEwKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmplY3QuS2V5ID09PSBcIm51bWJlclwiKVxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuS2V5ID0gb2JqZWN0LktleTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmplY3QuS2V5ID09PSBcIm9iamVjdFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuS2V5ID0gbmV3ICR1dGlsLkxvbmdCaXRzKG9iamVjdC5LZXkubG93ID4+PiAwLCBvYmplY3QuS2V5LmhpZ2ggPj4+IDApLnRvTnVtYmVyKCk7XHJcbiAgICAgICAgICAgIGlmIChvYmplY3QuR2F0ZUlkICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBpZiAoJHV0aWwuTG9uZylcclxuICAgICAgICAgICAgICAgICAgICAobWVzc2FnZS5HYXRlSWQgPSAkdXRpbC5Mb25nLmZyb21WYWx1ZShvYmplY3QuR2F0ZUlkKSkudW5zaWduZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmplY3QuR2F0ZUlkID09PSBcInN0cmluZ1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuR2F0ZUlkID0gcGFyc2VJbnQob2JqZWN0LkdhdGVJZCwgMTApO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9iamVjdC5HYXRlSWQgPT09IFwibnVtYmVyXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5HYXRlSWQgPSBvYmplY3QuR2F0ZUlkO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9iamVjdC5HYXRlSWQgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5HYXRlSWQgPSBuZXcgJHV0aWwuTG9uZ0JpdHMob2JqZWN0LkdhdGVJZC5sb3cgPj4+IDAsIG9iamVjdC5HYXRlSWQuaGlnaCA+Pj4gMCkudG9OdW1iZXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlcyBhIHBsYWluIG9iamVjdCBmcm9tIGEgQzJHX0xvZ2luR2F0ZSBtZXNzYWdlLiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byBvdGhlciB0eXBlcyBpZiBzcGVjaWZpZWQuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIHRvT2JqZWN0XHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJHX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuQzJHX0xvZ2luR2F0ZX0gbWVzc2FnZSBDMkdfTG9naW5HYXRlXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuSUNvbnZlcnNpb25PcHRpb25zfSBbb3B0aW9uc10gQ29udmVyc2lvbiBvcHRpb25zXHJcbiAgICAgICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBQbGFpbiBvYmplY3RcclxuICAgICAgICAgKi9cclxuICAgICAgICBDMkdfTG9naW5HYXRlLnRvT2JqZWN0ID0gZnVuY3Rpb24gdG9PYmplY3QobWVzc2FnZSwgb3B0aW9ucykge1xyXG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zID0ge307XHJcbiAgICAgICAgICAgIHZhciBvYmplY3QgPSB7fTtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZGVmYXVsdHMpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkdXRpbC5Mb25nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxvbmcgPSBuZXcgJHV0aWwuTG9uZygwLCAwLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LktleSA9IG9wdGlvbnMubG9uZ3MgPT09IFN0cmluZyA/IGxvbmcudG9TdHJpbmcoKSA6IG9wdGlvbnMubG9uZ3MgPT09IE51bWJlciA/IGxvbmcudG9OdW1iZXIoKSA6IGxvbmc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3QuS2V5ID0gb3B0aW9ucy5sb25ncyA9PT0gU3RyaW5nID8gXCIwXCIgOiAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKCR1dGlsLkxvbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbG9uZyA9IG5ldyAkdXRpbC5Mb25nKDAsIDAsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3QuR2F0ZUlkID0gb3B0aW9ucy5sb25ncyA9PT0gU3RyaW5nID8gbG9uZy50b1N0cmluZygpIDogb3B0aW9ucy5sb25ncyA9PT0gTnVtYmVyID8gbG9uZy50b051bWJlcigpIDogbG9uZztcclxuICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC5HYXRlSWQgPSBvcHRpb25zLmxvbmdzID09PSBTdHJpbmcgPyBcIjBcIiA6IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuS2V5ICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIktleVwiKSlcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZS5LZXkgPT09IFwibnVtYmVyXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LktleSA9IG9wdGlvbnMubG9uZ3MgPT09IFN0cmluZyA/IFN0cmluZyhtZXNzYWdlLktleSkgOiBtZXNzYWdlLktleTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3QuS2V5ID0gb3B0aW9ucy5sb25ncyA9PT0gU3RyaW5nID8gJHV0aWwuTG9uZy5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChtZXNzYWdlLktleSkgOiBvcHRpb25zLmxvbmdzID09PSBOdW1iZXIgPyBuZXcgJHV0aWwuTG9uZ0JpdHMobWVzc2FnZS5LZXkubG93ID4+PiAwLCBtZXNzYWdlLktleS5oaWdoID4+PiAwKS50b051bWJlcigpIDogbWVzc2FnZS5LZXk7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLkdhdGVJZCAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJHYXRlSWRcIikpXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UuR2F0ZUlkID09PSBcIm51bWJlclwiKVxyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC5HYXRlSWQgPSBvcHRpb25zLmxvbmdzID09PSBTdHJpbmcgPyBTdHJpbmcobWVzc2FnZS5HYXRlSWQpIDogbWVzc2FnZS5HYXRlSWQ7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LkdhdGVJZCA9IG9wdGlvbnMubG9uZ3MgPT09IFN0cmluZyA/ICR1dGlsLkxvbmcucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobWVzc2FnZS5HYXRlSWQpIDogb3B0aW9ucy5sb25ncyA9PT0gTnVtYmVyID8gbmV3ICR1dGlsLkxvbmdCaXRzKG1lc3NhZ2UuR2F0ZUlkLmxvdyA+Pj4gMCwgbWVzc2FnZS5HYXRlSWQuaGlnaCA+Pj4gMCkudG9OdW1iZXIoKSA6IG1lc3NhZ2UuR2F0ZUlkO1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnZlcnRzIHRoaXMgQzJHX0xvZ2luR2F0ZSB0byBKU09OLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiB0b0pTT05cclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5DMkdfTG9naW5HYXRlXHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBKU09OIG9iamVjdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyR19Mb2dpbkdhdGUucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IudG9PYmplY3QodGhpcywgJHByb3RvYnVmLnV0aWwudG9KU09OT3B0aW9ucyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIEMyR19Mb2dpbkdhdGU7XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIG5pY2VfdHMuRzJDX0xvZ2luR2F0ZSA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJvcGVydGllcyBvZiBhIEcyQ19Mb2dpbkdhdGUuXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHNcclxuICAgICAgICAgKiBAaW50ZXJmYWNlIElHMkNfTG9naW5HYXRlXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ8bnVsbH0gW0Vycm9yXSBHMkNfTG9naW5HYXRlIEVycm9yXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtzdHJpbmd8bnVsbH0gW01lc3NhZ2VdIEcyQ19Mb2dpbkdhdGUgTWVzc2FnZVxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfExvbmd8bnVsbH0gW1BsYXllcklkXSBHMkNfTG9naW5HYXRlIFBsYXllcklkXHJcbiAgICAgICAgICovXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnN0cnVjdHMgYSBuZXcgRzJDX0xvZ2luR2F0ZS5cclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90c1xyXG4gICAgICAgICAqIEBjbGFzc2Rlc2MgUmVwcmVzZW50cyBhIEcyQ19Mb2dpbkdhdGUuXHJcbiAgICAgICAgICogQGltcGxlbWVudHMgSUcyQ19Mb2dpbkdhdGVcclxuICAgICAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSUcyQ19Mb2dpbkdhdGU9fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBHMkNfTG9naW5HYXRlKHByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgaWYgKHByb3BlcnRpZXMpXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXlzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyksIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSlcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllc1trZXlzW2ldXSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2tleXNbaV1dID0gcHJvcGVydGllc1trZXlzW2ldXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEcyQ19Mb2dpbkdhdGUgRXJyb3IuXHJcbiAgICAgICAgICogQG1lbWJlciB7bnVtYmVyfSBFcnJvclxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkcyQ19Mb2dpbkdhdGVcclxuICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBHMkNfTG9naW5HYXRlLnByb3RvdHlwZS5FcnJvciA9IDA7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEcyQ19Mb2dpbkdhdGUgTWVzc2FnZS5cclxuICAgICAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IE1lc3NhZ2VcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5HMkNfTG9naW5HYXRlXHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRzJDX0xvZ2luR2F0ZS5wcm90b3R5cGUuTWVzc2FnZSA9IFwiXCI7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEcyQ19Mb2dpbkdhdGUgUGxheWVySWQuXHJcbiAgICAgICAgICogQG1lbWJlciB7bnVtYmVyfExvbmd9IFBsYXllcklkXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuRzJDX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEcyQ19Mb2dpbkdhdGUucHJvdG90eXBlLlBsYXllcklkID0gJHV0aWwuTG9uZyA/ICR1dGlsLkxvbmcuZnJvbUJpdHMoMCwwLGZhbHNlKSA6IDA7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENyZWF0ZXMgYSBuZXcgRzJDX0xvZ2luR2F0ZSBpbnN0YW5jZSB1c2luZyB0aGUgc3BlY2lmaWVkIHByb3BlcnRpZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGNyZWF0ZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkcyQ19Mb2dpbkdhdGVcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLklHMkNfTG9naW5HYXRlPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XHJcbiAgICAgICAgICogQHJldHVybnMge25pY2VfdHMuRzJDX0xvZ2luR2F0ZX0gRzJDX0xvZ2luR2F0ZSBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEcyQ19Mb2dpbkdhdGUuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKHByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHMkNfTG9naW5HYXRlKHByb3BlcnRpZXMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBHMkNfTG9naW5HYXRlIG1lc3NhZ2UuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIG5pY2VfdHMuRzJDX0xvZ2luR2F0ZS52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZW5jb2RlXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuRzJDX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSUcyQ19Mb2dpbkdhdGV9IG1lc3NhZ2UgRzJDX0xvZ2luR2F0ZSBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cclxuICAgICAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRzJDX0xvZ2luR2F0ZS5lbmNvZGUgPSBmdW5jdGlvbiBlbmNvZGUobWVzc2FnZSwgd3JpdGVyKSB7XHJcbiAgICAgICAgICAgIGlmICghd3JpdGVyKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVyID0gJFdyaXRlci5jcmVhdGUoKTtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuUGxheWVySWQgIT0gbnVsbCAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtZXNzYWdlLCBcIlBsYXllcklkXCIpKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAxLCB3aXJlVHlwZSAwID0qLzgpLmludDY0KG1lc3NhZ2UuUGxheWVySWQpO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5FcnJvciAhPSBudWxsICYmIE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1lc3NhZ2UsIFwiRXJyb3JcIikpXHJcbiAgICAgICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDkxLCB3aXJlVHlwZSAwID0qLzcyOCkuaW50MzIobWVzc2FnZS5FcnJvcik7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLk1lc3NhZ2UgIT0gbnVsbCAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtZXNzYWdlLCBcIk1lc3NhZ2VcIikpXHJcbiAgICAgICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDkyLCB3aXJlVHlwZSAyID0qLzczOCkuc3RyaW5nKG1lc3NhZ2UuTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB3cml0ZXI7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIEcyQ19Mb2dpbkdhdGUgbWVzc2FnZSwgbGVuZ3RoIGRlbGltaXRlZC4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgbmljZV90cy5HMkNfTG9naW5HYXRlLnZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWRcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5HMkNfTG9naW5HYXRlXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7bmljZV90cy5JRzJDX0xvZ2luR2F0ZX0gbWVzc2FnZSBHMkNfTG9naW5HYXRlIG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxyXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xyXG4gICAgICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBHMkNfTG9naW5HYXRlLmVuY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZChtZXNzYWdlLCB3cml0ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikubGRlbGltKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGVjb2RlcyBhIEcyQ19Mb2dpbkdhdGUgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlci5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZGVjb2RlXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuRzJDX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5SZWFkZXJ8VWludDhBcnJheX0gcmVhZGVyIFJlYWRlciBvciBidWZmZXIgdG8gZGVjb2RlIGZyb21cclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aF0gTWVzc2FnZSBsZW5ndGggaWYga25vd24gYmVmb3JlaGFuZFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuaWNlX3RzLkcyQ19Mb2dpbkdhdGV9IEcyQ19Mb2dpbkdhdGVcclxuICAgICAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxyXG4gICAgICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEcyQ19Mb2dpbkdhdGUuZGVjb2RlID0gZnVuY3Rpb24gZGVjb2RlKHJlYWRlciwgbGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxyXG4gICAgICAgICAgICAgICAgcmVhZGVyID0gJFJlYWRlci5jcmVhdGUocmVhZGVyKTtcclxuICAgICAgICAgICAgdmFyIGVuZCA9IGxlbmd0aCA9PT0gdW5kZWZpbmVkID8gcmVhZGVyLmxlbiA6IHJlYWRlci5wb3MgKyBsZW5ndGgsIG1lc3NhZ2UgPSBuZXcgJHJvb3QubmljZV90cy5HMkNfTG9naW5HYXRlKCk7XHJcbiAgICAgICAgICAgIHdoaWxlIChyZWFkZXIucG9zIDwgZW5kKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGFnID0gcmVhZGVyLnVpbnQzMigpO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0YWcgPj4+IDMpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgOTE6XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5FcnJvciA9IHJlYWRlci5pbnQzMigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA5MjpcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLk1lc3NhZ2UgPSByZWFkZXIuc3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5QbGF5ZXJJZCA9IHJlYWRlci5pbnQ2NCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICByZWFkZXIuc2tpcFR5cGUodGFnICYgNyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGVjb2RlcyBhIEcyQ19Mb2dpbkdhdGUgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlciwgbGVuZ3RoIGRlbGltaXRlZC5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuRzJDX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5SZWFkZXJ8VWludDhBcnJheX0gcmVhZGVyIFJlYWRlciBvciBidWZmZXIgdG8gZGVjb2RlIGZyb21cclxuICAgICAgICAgKiBAcmV0dXJucyB7bmljZV90cy5HMkNfTG9naW5HYXRlfSBHMkNfTG9naW5HYXRlXHJcbiAgICAgICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcclxuICAgICAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcclxuICAgICAgICAgKi9cclxuICAgICAgICBHMkNfTG9naW5HYXRlLmRlY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZChyZWFkZXIpIHtcclxuICAgICAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXHJcbiAgICAgICAgICAgICAgICByZWFkZXIgPSBuZXcgJFJlYWRlcihyZWFkZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZWNvZGUocmVhZGVyLCByZWFkZXIudWludDMyKCkpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZlcmlmaWVzIGEgRzJDX0xvZ2luR2F0ZSBtZXNzYWdlLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiB2ZXJpZnlcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5HMkNfTG9naW5HYXRlXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG1lc3NhZ2UgUGxhaW4gb2JqZWN0IHRvIHZlcmlmeVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH0gYG51bGxgIGlmIHZhbGlkLCBvdGhlcndpc2UgdGhlIHJlYXNvbiB3aHkgaXQgaXMgbm90XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRzJDX0xvZ2luR2F0ZS52ZXJpZnkgPSBmdW5jdGlvbiB2ZXJpZnkobWVzc2FnZSkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgIT09IFwib2JqZWN0XCIgfHwgbWVzc2FnZSA9PT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIm9iamVjdCBleHBlY3RlZFwiO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5FcnJvciAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJFcnJvclwiKSlcclxuICAgICAgICAgICAgICAgIGlmICghJHV0aWwuaXNJbnRlZ2VyKG1lc3NhZ2UuRXJyb3IpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIkVycm9yOiBpbnRlZ2VyIGV4cGVjdGVkXCI7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLk1lc3NhZ2UgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiTWVzc2FnZVwiKSlcclxuICAgICAgICAgICAgICAgIGlmICghJHV0aWwuaXNTdHJpbmcobWVzc2FnZS5NZXNzYWdlKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJNZXNzYWdlOiBzdHJpbmcgZXhwZWN0ZWRcIjtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuUGxheWVySWQgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiUGxheWVySWRcIikpXHJcbiAgICAgICAgICAgICAgICBpZiAoISR1dGlsLmlzSW50ZWdlcihtZXNzYWdlLlBsYXllcklkKSAmJiAhKG1lc3NhZ2UuUGxheWVySWQgJiYgJHV0aWwuaXNJbnRlZ2VyKG1lc3NhZ2UuUGxheWVySWQubG93KSAmJiAkdXRpbC5pc0ludGVnZXIobWVzc2FnZS5QbGF5ZXJJZC5oaWdoKSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiUGxheWVySWQ6IGludGVnZXJ8TG9uZyBleHBlY3RlZFwiO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGVzIGEgRzJDX0xvZ2luR2F0ZSBtZXNzYWdlIGZyb20gYSBwbGFpbiBvYmplY3QuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIHRoZWlyIHJlc3BlY3RpdmUgaW50ZXJuYWwgdHlwZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGZyb21PYmplY3RcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5HMkNfTG9naW5HYXRlXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG9iamVjdCBQbGFpbiBvYmplY3RcclxuICAgICAgICAgKiBAcmV0dXJucyB7bmljZV90cy5HMkNfTG9naW5HYXRlfSBHMkNfTG9naW5HYXRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRzJDX0xvZ2luR2F0ZS5mcm9tT2JqZWN0ID0gZnVuY3Rpb24gZnJvbU9iamVjdChvYmplY3QpIHtcclxuICAgICAgICAgICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mICRyb290Lm5pY2VfdHMuRzJDX0xvZ2luR2F0ZSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gbmV3ICRyb290Lm5pY2VfdHMuRzJDX0xvZ2luR2F0ZSgpO1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0LkVycm9yICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLkVycm9yID0gb2JqZWN0LkVycm9yIHwgMDtcclxuICAgICAgICAgICAgaWYgKG9iamVjdC5NZXNzYWdlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLk1lc3NhZ2UgPSBTdHJpbmcob2JqZWN0Lk1lc3NhZ2UpO1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0LlBsYXllcklkICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBpZiAoJHV0aWwuTG9uZylcclxuICAgICAgICAgICAgICAgICAgICAobWVzc2FnZS5QbGF5ZXJJZCA9ICR1dGlsLkxvbmcuZnJvbVZhbHVlKG9iamVjdC5QbGF5ZXJJZCkpLnVuc2lnbmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0LlBsYXllcklkID09PSBcInN0cmluZ1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuUGxheWVySWQgPSBwYXJzZUludChvYmplY3QuUGxheWVySWQsIDEwKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmplY3QuUGxheWVySWQgPT09IFwibnVtYmVyXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5QbGF5ZXJJZCA9IG9iamVjdC5QbGF5ZXJJZDtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmplY3QuUGxheWVySWQgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5QbGF5ZXJJZCA9IG5ldyAkdXRpbC5Mb25nQml0cyhvYmplY3QuUGxheWVySWQubG93ID4+PiAwLCBvYmplY3QuUGxheWVySWQuaGlnaCA+Pj4gMCkudG9OdW1iZXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlcyBhIHBsYWluIG9iamVjdCBmcm9tIGEgRzJDX0xvZ2luR2F0ZSBtZXNzYWdlLiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byBvdGhlciB0eXBlcyBpZiBzcGVjaWZpZWQuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIHRvT2JqZWN0XHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuRzJDX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuRzJDX0xvZ2luR2F0ZX0gbWVzc2FnZSBHMkNfTG9naW5HYXRlXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuSUNvbnZlcnNpb25PcHRpb25zfSBbb3B0aW9uc10gQ29udmVyc2lvbiBvcHRpb25zXHJcbiAgICAgICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBQbGFpbiBvYmplY3RcclxuICAgICAgICAgKi9cclxuICAgICAgICBHMkNfTG9naW5HYXRlLnRvT2JqZWN0ID0gZnVuY3Rpb24gdG9PYmplY3QobWVzc2FnZSwgb3B0aW9ucykge1xyXG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zID0ge307XHJcbiAgICAgICAgICAgIHZhciBvYmplY3QgPSB7fTtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZGVmYXVsdHMpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkdXRpbC5Mb25nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxvbmcgPSBuZXcgJHV0aWwuTG9uZygwLCAwLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LlBsYXllcklkID0gb3B0aW9ucy5sb25ncyA9PT0gU3RyaW5nID8gbG9uZy50b1N0cmluZygpIDogb3B0aW9ucy5sb25ncyA9PT0gTnVtYmVyID8gbG9uZy50b051bWJlcigpIDogbG9uZztcclxuICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC5QbGF5ZXJJZCA9IG9wdGlvbnMubG9uZ3MgPT09IFN0cmluZyA/IFwiMFwiIDogMDtcclxuICAgICAgICAgICAgICAgIG9iamVjdC5FcnJvciA9IDA7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QuTWVzc2FnZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuUGxheWVySWQgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiUGxheWVySWRcIikpXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UuUGxheWVySWQgPT09IFwibnVtYmVyXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LlBsYXllcklkID0gb3B0aW9ucy5sb25ncyA9PT0gU3RyaW5nID8gU3RyaW5nKG1lc3NhZ2UuUGxheWVySWQpIDogbWVzc2FnZS5QbGF5ZXJJZDtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3QuUGxheWVySWQgPSBvcHRpb25zLmxvbmdzID09PSBTdHJpbmcgPyAkdXRpbC5Mb25nLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG1lc3NhZ2UuUGxheWVySWQpIDogb3B0aW9ucy5sb25ncyA9PT0gTnVtYmVyID8gbmV3ICR1dGlsLkxvbmdCaXRzKG1lc3NhZ2UuUGxheWVySWQubG93ID4+PiAwLCBtZXNzYWdlLlBsYXllcklkLmhpZ2ggPj4+IDApLnRvTnVtYmVyKCkgOiBtZXNzYWdlLlBsYXllcklkO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5FcnJvciAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJFcnJvclwiKSlcclxuICAgICAgICAgICAgICAgIG9iamVjdC5FcnJvciA9IG1lc3NhZ2UuRXJyb3I7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLk1lc3NhZ2UgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiTWVzc2FnZVwiKSlcclxuICAgICAgICAgICAgICAgIG9iamVjdC5NZXNzYWdlID0gbWVzc2FnZS5NZXNzYWdlO1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnZlcnRzIHRoaXMgRzJDX0xvZ2luR2F0ZSB0byBKU09OLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiB0b0pTT05cclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5HMkNfTG9naW5HYXRlXHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBKU09OIG9iamVjdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEcyQ19Mb2dpbkdhdGUucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IudG9PYmplY3QodGhpcywgJHByb3RvYnVmLnV0aWwudG9KU09OT3B0aW9ucyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIEcyQ19Mb2dpbkdhdGU7XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIG5pY2VfdHMuQzJHU19UZXN0ID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQcm9wZXJ0aWVzIG9mIGEgQzJHU19UZXN0LlxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzXHJcbiAgICAgICAgICogQGludGVyZmFjZSBJQzJHU19UZXN0XHJcbiAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ8bnVsbH0gW3Rlc3RJRF0gQzJHU19UZXN0IHRlc3RJRFxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfG51bGx9IFt0ZXN0TmFtZV0gQzJHU19UZXN0IHRlc3ROYW1lXHJcbiAgICAgICAgICovXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnN0cnVjdHMgYSBuZXcgQzJHU19UZXN0LlxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzXHJcbiAgICAgICAgICogQGNsYXNzZGVzYyBSZXByZXNlbnRzIGEgQzJHU19UZXN0LlxyXG4gICAgICAgICAqIEBpbXBsZW1lbnRzIElDMkdTX1Rlc3RcclxuICAgICAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSUMyR1NfVGVzdD19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIEMyR1NfVGVzdChwcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzKVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXNba2V5c1tpXV0gIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1trZXlzW2ldXSA9IHByb3BlcnRpZXNba2V5c1tpXV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDMkdTX1Rlc3QgdGVzdElELlxyXG4gICAgICAgICAqIEBtZW1iZXIge251bWJlcn0gdGVzdElEXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJHU19UZXN0XHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJHU19UZXN0LnByb3RvdHlwZS50ZXN0SUQgPSAwO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDMkdTX1Rlc3QgdGVzdE5hbWUuXHJcbiAgICAgICAgICogQG1lbWJlciB7c3RyaW5nfSB0ZXN0TmFtZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyR1NfVGVzdFxyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyR1NfVGVzdC5wcm90b3R5cGUudGVzdE5hbWUgPSBcIlwiO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGVzIGEgbmV3IEMyR1NfVGVzdCBpbnN0YW5jZSB1c2luZyB0aGUgc3BlY2lmaWVkIHByb3BlcnRpZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGNyZWF0ZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyR1NfVGVzdFxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSUMyR1NfVGVzdD19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuaWNlX3RzLkMyR1NfVGVzdH0gQzJHU19UZXN0IGluc3RhbmNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJHU19UZXN0LmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShwcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQzJHU19UZXN0KHByb3BlcnRpZXMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBDMkdTX1Rlc3QgbWVzc2FnZS4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgbmljZV90cy5DMkdTX1Rlc3QudmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGVuY29kZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyR1NfVGVzdFxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSUMyR1NfVGVzdH0gbWVzc2FnZSBDMkdTX1Rlc3QgbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXHJcbiAgICAgICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyR1NfVGVzdC5lbmNvZGUgPSBmdW5jdGlvbiBlbmNvZGUobWVzc2FnZSwgd3JpdGVyKSB7XHJcbiAgICAgICAgICAgIGlmICghd3JpdGVyKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVyID0gJFdyaXRlci5jcmVhdGUoKTtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UudGVzdElEICE9IG51bGwgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobWVzc2FnZSwgXCJ0ZXN0SURcIikpXHJcbiAgICAgICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDEsIHdpcmVUeXBlIDAgPSovOCkuaW50MzIobWVzc2FnZS50ZXN0SUQpO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS50ZXN0TmFtZSAhPSBudWxsICYmIE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1lc3NhZ2UsIFwidGVzdE5hbWVcIikpXHJcbiAgICAgICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDIsIHdpcmVUeXBlIDIgPSovMTgpLnN0cmluZyhtZXNzYWdlLnRlc3ROYW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuIHdyaXRlcjtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgQzJHU19UZXN0IG1lc3NhZ2UsIGxlbmd0aCBkZWxpbWl0ZWQuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIG5pY2VfdHMuQzJHU19UZXN0LnZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWRcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5DMkdTX1Rlc3RcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLklDMkdTX1Rlc3R9IG1lc3NhZ2UgQzJHU19UZXN0IG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxyXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xyXG4gICAgICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBDMkdTX1Rlc3QuZW5jb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkKG1lc3NhZ2UsIHdyaXRlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbmNvZGUobWVzc2FnZSwgd3JpdGVyKS5sZGVsaW0oKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWNvZGVzIGEgQzJHU19UZXN0IG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGRlY29kZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyR1NfVGVzdFxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5SZWFkZXJ8VWludDhBcnJheX0gcmVhZGVyIFJlYWRlciBvciBidWZmZXIgdG8gZGVjb2RlIGZyb21cclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aF0gTWVzc2FnZSBsZW5ndGggaWYga25vd24gYmVmb3JlaGFuZFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuaWNlX3RzLkMyR1NfVGVzdH0gQzJHU19UZXN0XHJcbiAgICAgICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcclxuICAgICAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcclxuICAgICAgICAgKi9cclxuICAgICAgICBDMkdTX1Rlc3QuZGVjb2RlID0gZnVuY3Rpb24gZGVjb2RlKHJlYWRlciwgbGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxyXG4gICAgICAgICAgICAgICAgcmVhZGVyID0gJFJlYWRlci5jcmVhdGUocmVhZGVyKTtcclxuICAgICAgICAgICAgdmFyIGVuZCA9IGxlbmd0aCA9PT0gdW5kZWZpbmVkID8gcmVhZGVyLmxlbiA6IHJlYWRlci5wb3MgKyBsZW5ndGgsIG1lc3NhZ2UgPSBuZXcgJHJvb3QubmljZV90cy5DMkdTX1Rlc3QoKTtcclxuICAgICAgICAgICAgd2hpbGUgKHJlYWRlci5wb3MgPCBlbmQpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0YWcgPSByZWFkZXIudWludDMyKCk7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRhZyA+Pj4gMykge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UudGVzdElEID0gcmVhZGVyLmludDMyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS50ZXN0TmFtZSA9IHJlYWRlci5zdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyLnNraXBUeXBlKHRhZyAmIDcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlY29kZXMgYSBDMkdTX1Rlc3QgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlciwgbGVuZ3RoIGRlbGltaXRlZC5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJHU19UZXN0XHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuaWNlX3RzLkMyR1NfVGVzdH0gQzJHU19UZXN0XHJcbiAgICAgICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcclxuICAgICAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcclxuICAgICAgICAgKi9cclxuICAgICAgICBDMkdTX1Rlc3QuZGVjb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkKHJlYWRlcikge1xyXG4gICAgICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcclxuICAgICAgICAgICAgICAgIHJlYWRlciA9IG5ldyAkUmVhZGVyKHJlYWRlcik7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlY29kZShyZWFkZXIsIHJlYWRlci51aW50MzIoKSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVmVyaWZpZXMgYSBDMkdTX1Rlc3QgbWVzc2FnZS5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gdmVyaWZ5XHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJHU19UZXN0XHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG1lc3NhZ2UgUGxhaW4gb2JqZWN0IHRvIHZlcmlmeVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH0gYG51bGxgIGlmIHZhbGlkLCBvdGhlcndpc2UgdGhlIHJlYXNvbiB3aHkgaXQgaXMgbm90XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJHU19UZXN0LnZlcmlmeSA9IGZ1bmN0aW9uIHZlcmlmeShtZXNzYWdlKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSAhPT0gXCJvYmplY3RcIiB8fCBtZXNzYWdlID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwib2JqZWN0IGV4cGVjdGVkXCI7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLnRlc3RJRCAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJ0ZXN0SURcIikpXHJcbiAgICAgICAgICAgICAgICBpZiAoISR1dGlsLmlzSW50ZWdlcihtZXNzYWdlLnRlc3RJRCkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidGVzdElEOiBpbnRlZ2VyIGV4cGVjdGVkXCI7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLnRlc3ROYW1lICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInRlc3ROYW1lXCIpKVxyXG4gICAgICAgICAgICAgICAgaWYgKCEkdXRpbC5pc1N0cmluZyhtZXNzYWdlLnRlc3ROYW1lKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJ0ZXN0TmFtZTogc3RyaW5nIGV4cGVjdGVkXCI7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENyZWF0ZXMgYSBDMkdTX1Rlc3QgbWVzc2FnZSBmcm9tIGEgcGxhaW4gb2JqZWN0LiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byB0aGVpciByZXNwZWN0aXZlIGludGVybmFsIHR5cGVzLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBmcm9tT2JqZWN0XHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJHU19UZXN0XHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG9iamVjdCBQbGFpbiBvYmplY3RcclxuICAgICAgICAgKiBAcmV0dXJucyB7bmljZV90cy5DMkdTX1Rlc3R9IEMyR1NfVGVzdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyR1NfVGVzdC5mcm9tT2JqZWN0ID0gZnVuY3Rpb24gZnJvbU9iamVjdChvYmplY3QpIHtcclxuICAgICAgICAgICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mICRyb290Lm5pY2VfdHMuQzJHU19UZXN0KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBuZXcgJHJvb3QubmljZV90cy5DMkdTX1Rlc3QoKTtcclxuICAgICAgICAgICAgaWYgKG9iamVjdC50ZXN0SUQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UudGVzdElEID0gb2JqZWN0LnRlc3RJRCB8IDA7XHJcbiAgICAgICAgICAgIGlmIChvYmplY3QudGVzdE5hbWUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UudGVzdE5hbWUgPSBTdHJpbmcob2JqZWN0LnRlc3ROYW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlcyBhIHBsYWluIG9iamVjdCBmcm9tIGEgQzJHU19UZXN0IG1lc3NhZ2UuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIG90aGVyIHR5cGVzIGlmIHNwZWNpZmllZC5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gdG9PYmplY3RcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5DMkdTX1Rlc3RcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLkMyR1NfVGVzdH0gbWVzc2FnZSBDMkdTX1Rlc3RcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5JQ29udmVyc2lvbk9wdGlvbnN9IFtvcHRpb25zXSBDb252ZXJzaW9uIG9wdGlvbnNcclxuICAgICAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IFBsYWluIG9iamVjdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyR1NfVGVzdC50b09iamVjdCA9IGZ1bmN0aW9uIHRvT2JqZWN0KG1lc3NhZ2UsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgaWYgKCFvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHt9O1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0ID0ge307XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmRlZmF1bHRzKSB7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QudGVzdElEID0gMDtcclxuICAgICAgICAgICAgICAgIG9iamVjdC50ZXN0TmFtZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UudGVzdElEICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInRlc3RJRFwiKSlcclxuICAgICAgICAgICAgICAgIG9iamVjdC50ZXN0SUQgPSBtZXNzYWdlLnRlc3RJRDtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UudGVzdE5hbWUgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwidGVzdE5hbWVcIikpXHJcbiAgICAgICAgICAgICAgICBvYmplY3QudGVzdE5hbWUgPSBtZXNzYWdlLnRlc3ROYW1lO1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnZlcnRzIHRoaXMgQzJHU19UZXN0IHRvIEpTT04uXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIHRvSlNPTlxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyR1NfVGVzdFxyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gSlNPTiBvYmplY3RcclxuICAgICAgICAgKi9cclxuICAgICAgICBDMkdTX1Rlc3QucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IudG9PYmplY3QodGhpcywgJHByb3RvYnVmLnV0aWwudG9KU09OT3B0aW9ucyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIEMyR1NfVGVzdDtcclxuICAgIH0pKCk7XHJcblxyXG4gICAgbmljZV90cy5HUzJDX1Rlc3QgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFByb3BlcnRpZXMgb2YgYSBHUzJDX1Rlc3QuXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHNcclxuICAgICAgICAgKiBAaW50ZXJmYWNlIElHUzJDX1Rlc3RcclxuICAgICAgICAgKiBAcHJvcGVydHkge251bWJlcnxudWxsfSBbRXJyb3JdIEdTMkNfVGVzdCBFcnJvclxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfG51bGx9IFtNZXNzYWdlXSBHUzJDX1Rlc3QgTWVzc2FnZVxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfG51bGx9IFt0ZXN0UmVzcG9uc2VdIEdTMkNfVGVzdCB0ZXN0UmVzcG9uc2VcclxuICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ29uc3RydWN0cyBhIG5ldyBHUzJDX1Rlc3QuXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHNcclxuICAgICAgICAgKiBAY2xhc3NkZXNjIFJlcHJlc2VudHMgYSBHUzJDX1Rlc3QuXHJcbiAgICAgICAgICogQGltcGxlbWVudHMgSUdTMkNfVGVzdFxyXG4gICAgICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICAgICAqIEBwYXJhbSB7bmljZV90cy5JR1MyQ19UZXN0PX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gR1MyQ19UZXN0KHByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgaWYgKHByb3BlcnRpZXMpXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXlzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyksIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSlcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllc1trZXlzW2ldXSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2tleXNbaV1dID0gcHJvcGVydGllc1trZXlzW2ldXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdTMkNfVGVzdCBFcnJvci5cclxuICAgICAgICAgKiBAbWVtYmVyIHtudW1iZXJ9IEVycm9yXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuR1MyQ19UZXN0XHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgR1MyQ19UZXN0LnByb3RvdHlwZS5FcnJvciA9IDA7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdTMkNfVGVzdCBNZXNzYWdlLlxyXG4gICAgICAgICAqIEBtZW1iZXIge3N0cmluZ30gTWVzc2FnZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkdTMkNfVGVzdFxyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEdTMkNfVGVzdC5wcm90b3R5cGUuTWVzc2FnZSA9IFwiXCI7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdTMkNfVGVzdCB0ZXN0UmVzcG9uc2UuXHJcbiAgICAgICAgICogQG1lbWJlciB7c3RyaW5nfSB0ZXN0UmVzcG9uc2VcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5HUzJDX1Rlc3RcclxuICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBHUzJDX1Rlc3QucHJvdG90eXBlLnRlc3RSZXNwb25zZSA9IFwiXCI7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENyZWF0ZXMgYSBuZXcgR1MyQ19UZXN0IGluc3RhbmNlIHVzaW5nIHRoZSBzcGVjaWZpZWQgcHJvcGVydGllcy5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gY3JlYXRlXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuR1MyQ19UZXN0XHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7bmljZV90cy5JR1MyQ19UZXN0PX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XHJcbiAgICAgICAgICogQHJldHVybnMge25pY2VfdHMuR1MyQ19UZXN0fSBHUzJDX1Rlc3QgaW5zdGFuY2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBHUzJDX1Rlc3QuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKHByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHUzJDX1Rlc3QocHJvcGVydGllcyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIEdTMkNfVGVzdCBtZXNzYWdlLiBEb2VzIG5vdCBpbXBsaWNpdGx5IHtAbGluayBuaWNlX3RzLkdTMkNfVGVzdC52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZW5jb2RlXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuR1MyQ19UZXN0XHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7bmljZV90cy5JR1MyQ19UZXN0fSBtZXNzYWdlIEdTMkNfVGVzdCBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cclxuICAgICAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgR1MyQ19UZXN0LmVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShtZXNzYWdlLCB3cml0ZXIpIHtcclxuICAgICAgICAgICAgaWYgKCF3cml0ZXIpXHJcbiAgICAgICAgICAgICAgICB3cml0ZXIgPSAkV3JpdGVyLmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS50ZXN0UmVzcG9uc2UgIT0gbnVsbCAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtZXNzYWdlLCBcInRlc3RSZXNwb25zZVwiKSlcclxuICAgICAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMSwgd2lyZVR5cGUgMiA9Ki8xMCkuc3RyaW5nKG1lc3NhZ2UudGVzdFJlc3BvbnNlKTtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuRXJyb3IgIT0gbnVsbCAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtZXNzYWdlLCBcIkVycm9yXCIpKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCA5MSwgd2lyZVR5cGUgMCA9Ki83MjgpLmludDMyKG1lc3NhZ2UuRXJyb3IpO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5NZXNzYWdlICE9IG51bGwgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobWVzc2FnZSwgXCJNZXNzYWdlXCIpKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCA5Miwgd2lyZVR5cGUgMiA9Ki83MzgpLnN0cmluZyhtZXNzYWdlLk1lc3NhZ2UpO1xyXG4gICAgICAgICAgICByZXR1cm4gd3JpdGVyO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBHUzJDX1Rlc3QgbWVzc2FnZSwgbGVuZ3RoIGRlbGltaXRlZC4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgbmljZV90cy5HUzJDX1Rlc3QudmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZFxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkdTMkNfVGVzdFxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSUdTMkNfVGVzdH0gbWVzc2FnZSBHUzJDX1Rlc3QgbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXHJcbiAgICAgICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEdTMkNfVGVzdC5lbmNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWQobWVzc2FnZSwgd3JpdGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVuY29kZShtZXNzYWdlLCB3cml0ZXIpLmxkZWxpbSgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlY29kZXMgYSBHUzJDX1Rlc3QgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlci5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZGVjb2RlXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuR1MyQ19UZXN0XHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoXSBNZXNzYWdlIGxlbmd0aCBpZiBrbm93biBiZWZvcmVoYW5kXHJcbiAgICAgICAgICogQHJldHVybnMge25pY2VfdHMuR1MyQ19UZXN0fSBHUzJDX1Rlc3RcclxuICAgICAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxyXG4gICAgICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEdTMkNfVGVzdC5kZWNvZGUgPSBmdW5jdGlvbiBkZWNvZGUocmVhZGVyLCBsZW5ndGgpIHtcclxuICAgICAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXHJcbiAgICAgICAgICAgICAgICByZWFkZXIgPSAkUmVhZGVyLmNyZWF0ZShyZWFkZXIpO1xyXG4gICAgICAgICAgICB2YXIgZW5kID0gbGVuZ3RoID09PSB1bmRlZmluZWQgPyByZWFkZXIubGVuIDogcmVhZGVyLnBvcyArIGxlbmd0aCwgbWVzc2FnZSA9IG5ldyAkcm9vdC5uaWNlX3RzLkdTMkNfVGVzdCgpO1xyXG4gICAgICAgICAgICB3aGlsZSAocmVhZGVyLnBvcyA8IGVuZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRhZyA9IHJlYWRlci51aW50MzIoKTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodGFnID4+PiAzKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDkxOlxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuRXJyb3IgPSByZWFkZXIuaW50MzIoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgOTI6XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5NZXNzYWdlID0gcmVhZGVyLnN0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UudGVzdFJlc3BvbnNlID0gcmVhZGVyLnN0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICByZWFkZXIuc2tpcFR5cGUodGFnICYgNyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGVjb2RlcyBhIEdTMkNfVGVzdCBtZXNzYWdlIGZyb20gdGhlIHNwZWNpZmllZCByZWFkZXIgb3IgYnVmZmVyLCBsZW5ndGggZGVsaW1pdGVkLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBkZWNvZGVEZWxpbWl0ZWRcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5HUzJDX1Rlc3RcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXHJcbiAgICAgICAgICogQHJldHVybnMge25pY2VfdHMuR1MyQ19UZXN0fSBHUzJDX1Rlc3RcclxuICAgICAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxyXG4gICAgICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEdTMkNfVGVzdC5kZWNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBkZWNvZGVEZWxpbWl0ZWQocmVhZGVyKSB7XHJcbiAgICAgICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxyXG4gICAgICAgICAgICAgICAgcmVhZGVyID0gbmV3ICRSZWFkZXIocmVhZGVyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGVjb2RlKHJlYWRlciwgcmVhZGVyLnVpbnQzMigpKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWZXJpZmllcyBhIEdTMkNfVGVzdCBtZXNzYWdlLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiB2ZXJpZnlcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5HUzJDX1Rlc3RcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gbWVzc2FnZSBQbGFpbiBvYmplY3QgdG8gdmVyaWZ5XHJcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ3xudWxsfSBgbnVsbGAgaWYgdmFsaWQsIG90aGVyd2lzZSB0aGUgcmVhc29uIHdoeSBpdCBpcyBub3RcclxuICAgICAgICAgKi9cclxuICAgICAgICBHUzJDX1Rlc3QudmVyaWZ5ID0gZnVuY3Rpb24gdmVyaWZ5KG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSBcIm9iamVjdFwiIHx8IG1lc3NhZ2UgPT09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJvYmplY3QgZXhwZWN0ZWRcIjtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuRXJyb3IgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiRXJyb3JcIikpXHJcbiAgICAgICAgICAgICAgICBpZiAoISR1dGlsLmlzSW50ZWdlcihtZXNzYWdlLkVycm9yKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJFcnJvcjogaW50ZWdlciBleHBlY3RlZFwiO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5NZXNzYWdlICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIk1lc3NhZ2VcIikpXHJcbiAgICAgICAgICAgICAgICBpZiAoISR1dGlsLmlzU3RyaW5nKG1lc3NhZ2UuTWVzc2FnZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiTWVzc2FnZTogc3RyaW5nIGV4cGVjdGVkXCI7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLnRlc3RSZXNwb25zZSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJ0ZXN0UmVzcG9uc2VcIikpXHJcbiAgICAgICAgICAgICAgICBpZiAoISR1dGlsLmlzU3RyaW5nKG1lc3NhZ2UudGVzdFJlc3BvbnNlKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJ0ZXN0UmVzcG9uc2U6IHN0cmluZyBleHBlY3RlZFwiO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGVzIGEgR1MyQ19UZXN0IG1lc3NhZ2UgZnJvbSBhIHBsYWluIG9iamVjdC4gQWxzbyBjb252ZXJ0cyB2YWx1ZXMgdG8gdGhlaXIgcmVzcGVjdGl2ZSBpbnRlcm5hbCB0eXBlcy5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZnJvbU9iamVjdFxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkdTMkNfVGVzdFxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBvYmplY3QgUGxhaW4gb2JqZWN0XHJcbiAgICAgICAgICogQHJldHVybnMge25pY2VfdHMuR1MyQ19UZXN0fSBHUzJDX1Rlc3RcclxuICAgICAgICAgKi9cclxuICAgICAgICBHUzJDX1Rlc3QuZnJvbU9iamVjdCA9IGZ1bmN0aW9uIGZyb21PYmplY3Qob2JqZWN0KSB7XHJcbiAgICAgICAgICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiAkcm9vdC5uaWNlX3RzLkdTMkNfVGVzdClcclxuICAgICAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gbmV3ICRyb290Lm5pY2VfdHMuR1MyQ19UZXN0KCk7XHJcbiAgICAgICAgICAgIGlmIChvYmplY3QuRXJyb3IgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuRXJyb3IgPSBvYmplY3QuRXJyb3IgfCAwO1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0Lk1lc3NhZ2UgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuTWVzc2FnZSA9IFN0cmluZyhvYmplY3QuTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIGlmIChvYmplY3QudGVzdFJlc3BvbnNlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnRlc3RSZXNwb25zZSA9IFN0cmluZyhvYmplY3QudGVzdFJlc3BvbnNlKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlcyBhIHBsYWluIG9iamVjdCBmcm9tIGEgR1MyQ19UZXN0IG1lc3NhZ2UuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIG90aGVyIHR5cGVzIGlmIHNwZWNpZmllZC5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gdG9PYmplY3RcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5HUzJDX1Rlc3RcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLkdTMkNfVGVzdH0gbWVzc2FnZSBHUzJDX1Rlc3RcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5JQ29udmVyc2lvbk9wdGlvbnN9IFtvcHRpb25zXSBDb252ZXJzaW9uIG9wdGlvbnNcclxuICAgICAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IFBsYWluIG9iamVjdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEdTMkNfVGVzdC50b09iamVjdCA9IGZ1bmN0aW9uIHRvT2JqZWN0KG1lc3NhZ2UsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgaWYgKCFvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHt9O1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0ID0ge307XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmRlZmF1bHRzKSB7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QudGVzdFJlc3BvbnNlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIG9iamVjdC5FcnJvciA9IDA7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QuTWVzc2FnZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UudGVzdFJlc3BvbnNlICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInRlc3RSZXNwb25zZVwiKSlcclxuICAgICAgICAgICAgICAgIG9iamVjdC50ZXN0UmVzcG9uc2UgPSBtZXNzYWdlLnRlc3RSZXNwb25zZTtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuRXJyb3IgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiRXJyb3JcIikpXHJcbiAgICAgICAgICAgICAgICBvYmplY3QuRXJyb3IgPSBtZXNzYWdlLkVycm9yO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5NZXNzYWdlICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIk1lc3NhZ2VcIikpXHJcbiAgICAgICAgICAgICAgICBvYmplY3QuTWVzc2FnZSA9IG1lc3NhZ2UuTWVzc2FnZTtcclxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb252ZXJ0cyB0aGlzIEdTMkNfVGVzdCB0byBKU09OLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiB0b0pTT05cclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5HUzJDX1Rlc3RcclxuICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IEpTT04gb2JqZWN0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgR1MyQ19UZXN0LnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLnRvT2JqZWN0KHRoaXMsICRwcm90b2J1Zi51dGlsLnRvSlNPTk9wdGlvbnMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBHUzJDX1Rlc3Q7XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIHJldHVybiBuaWNlX3RzO1xyXG59KSgpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAkcm9vdDtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY3NoYXJwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInB1ZXJ0c1wiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBHYW1lTGF1bmNoLCBKc01hbmFnZXIsIFVuaXR5RW5naW5lIH0gZnJvbSBcImNzaGFycFwiO1xyXG5pbXBvcnQgeyBDb21tb25VSSB9IGZyb20gXCIuL2RhdGEvdWkvY29tbW9uXCI7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuL2ZyYW1ld29yay9sb2dnZXIvTG9nZ2VyXCI7XHJcbmltcG9ydCB7IFNjZW5lRGVmIH0gZnJvbSBcIi4vZnJhbWV3b3JrL3NjZW5lL1NjZW5lRGVmXCI7XHJcbmltcG9ydCB7IFMgfSBmcm9tIFwiLi9nbG9iYWwvR2FtZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBVbml0VGVzdCB9IGZyb20gXCIuL3VuaXR0ZXN0L1VuaXRUZXN0XCI7XHJcblxyXG5cclxuY2xhc3MgR2FtZU1haW57XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgSnNNYW5hZ2VyLkluc3RhbmNlLkpzT25BcHBsaWNhdGlvblF1aXQgPSAoKSA9PiB0aGlzLm9uQXBwbGljYXRpb25RdWl0KCk7XHJcbiAgICAgICAgSnNNYW5hZ2VyLkluc3RhbmNlLkpzT25EaXNwb3NlID0gKCkgPT4gdGhpcy5vbkRpc3Bvc2UoKTtcclxuICAgICAgICBKc01hbmFnZXIuSW5zdGFuY2UuSnNVcGRhdGUgPSAoZGVsdGE6bnVtYmVyKSA9PiB0aGlzLnVwZGF0ZShkZWx0YSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBhc3luYyBzdGFydCgpe1xyXG4gICAgICAgIFVuaXR5RW5naW5lLkRlYnVnLkxvZygnSGVsbHAgV29yZCEyMjIyMjI0JylcclxuICAgICAgICAvL+WKoOi9vemAmueUqEZhaXJ5R1VJ6LWE5rqQXHJcbiAgICAgICAgY29uc29sZS5sb2coQ29tbW9uVUkuUGFja2FnZU5hbWUpXHJcbiAgICAgICAgYXdhaXQgUy5SZXNNYW5hZ2VyLmxvYWRGYWlyeUdVSVBhY2thZ2UoQ29tbW9uVUkuUGFja2FnZU5hbWUpO1xyXG4gICAgICAgIC8vIEpTT04ucGFyc2UoJ2FhJyk7XHJcbiAgICAgICAgLy9kbyBVbml0IFRlc3RcclxuICAgICAgICAvLyBVbml0VGVzdC5kb1Rlc3QoKTtcclxuXHJcbiAgICAgICAgLy/ov5vlhaXnmbvlvZXmqKHlnZdcclxuICAgICAgICBhd2FpdCBTLlNjZW5lTWFuYWdlci5sb2FkU2NlbmUoU2NlbmVEZWYuR2FtZVN0YXJ0KTtcclxuXHJcbiAgICAgICAgLy9KU+WQr+WKqOWujOaIkO+8jOmAmuefpUMj5bGCXHJcbiAgICAgICAgR2FtZUxhdW5jaC5JbnN0YW5jZS5Kc0x1YW5jaEZpbmlzaCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgb25BcHBsaWNhdGlvblF1aXQoKTp2b2lkIHtcclxuICAgICAgICBTLkdhbWVPYmplY3RQb29sLmNsZWFudXAodHJ1ZSk7XHJcbiAgICAgICAgTG9nZ2VyLmxvZyhcIkdhbWUgb25BcHBsaWNhdGlvblF1aXQgaW4gSlMuLi4uXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlKGRlbHRhOm51bWJlcikge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGRlbHRhKVxyXG4gICAgICAgIFMuVUlNYW5hZ2VyLnVwZGF0ZShkZWx0YSlcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIG9uRGlzcG9zZSgpOnZvaWQge1xyXG4gICAgICAgIExvZ2dlci5sb2coXCJHYW1lIG9uRGlzcG9zZSBpbiBKUy4uLi5cIik7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxubmV3IEdhbWVNYWluKCkuc3RhcnQoKTtcclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==