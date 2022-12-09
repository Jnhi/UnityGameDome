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
/* harmony import */ var _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../framework/logger/Logger */ "./src/framework/logger/Logger.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



class UIFlyBirdMainView extends _framework_ui_UIPage__WEBPACK_IMPORTED_MODULE_0__.UIPage {
    onUpdate() {
    }
    onAwake() {
        super.onAwake();
        console.log("开始界面3");
        this.list_bg.SetVirtualAndLoop();
        this.list_bg.itemRenderer = (index, obj) => {
            // this.renderServerListItem(index, obj);
        };
        this.list_bg.numItems = 3;
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
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_2__.Logger.log("on chat...");
    }
}
__decorate([
    (0,_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__.binder)("list_bg")
], UIFlyBirdMainView.prototype, "list_bg", void 0);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxLQUFLO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLEtBQUs7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxjQUFjLDBDQUEwQztBQUN4RDtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQTtB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QUFVO0FBQ3JCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLGFBQWE7QUFDYjtBQUNBLFlBQVksWUFBWTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFNBQVM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFLGtCQUFrQjtBQUNsRixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFD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QTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkI7O0FBRUE7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25COztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25COztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsWUFBWTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Es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LENBQUMsQ0FBQztJQUMzQyxDQUFDO0NBQ0o7QUFJRCxJQUFJLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL0Bwcm90b2J1ZmpzL2FzcHJvbWlzZS9pbmRleC5qcyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9ub2RlX21vZHVsZXMvQHByb3RvYnVmanMvYmFzZTY0L2luZGV4LmpzIiwid2VicGFjazovL3RzcHJvamVjdC8uL25vZGVfbW9kdWxlcy9AcHJvdG9idWZqcy9ldmVudGVtaXR0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL0Bwcm90b2J1ZmpzL2Zsb2F0L2luZGV4LmpzIiwid2VicGFjazovL3RzcHJvamVjdC8uL25vZGVfbW9kdWxlcy9AcHJvdG9idWZqcy9pbnF1aXJlL2luZGV4LmpzIiwid2VicGFjazovL3RzcHJvamVjdC8uL25vZGVfbW9kdWxlcy9AcHJvdG9idWZqcy9wb29sL2luZGV4LmpzIiwid2VicGFjazovL3RzcHJvamVjdC8uL25vZGVfbW9kdWxlcy9AcHJvdG9idWZqcy91dGY4L2luZGV4LmpzIiwid2VicGFjazovL3RzcHJvamVjdC8uL25vZGVfbW9kdWxlcy9sb25nL3NyYy9sb25nLmpzIiwid2VicGFjazovL3RzcHJvamVjdC8uL25vZGVfbW9kdWxlcy9wcm90b2J1ZmpzL21pbmltYWwuanMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3Byb3RvYnVmanMvc3JjL2luZGV4LW1pbmltYWwuanMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3Byb3RvYnVmanMvc3JjL3JlYWRlci5qcyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9zcmMvcmVhZGVyX2J1ZmZlci5qcyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9zcmMvcm9vdHMuanMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3Byb3RvYnVmanMvc3JjL3JwYy5qcyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9zcmMvcnBjL3NlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3Byb3RvYnVmanMvc3JjL3V0aWwvbG9uZ2JpdHMuanMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3Byb3RvYnVmanMvc3JjL3V0aWwvbWluaW1hbC5qcyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9zcmMvd3JpdGVyLmpzIiwid2VicGFjazovL3RzcHJvamVjdC8uL25vZGVfbW9kdWxlcy9wcm90b2J1ZmpzL3NyYy93cml0ZXJfYnVmZmVyLmpzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9kYXRhL3BiL09wY29kZS50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZGF0YS91aS9GbHlCaXJkLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9kYXRhL3VpL0dhbWVTdGFydC50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZGF0YS91aS9jb21tb24udHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2ZyYW1ld29yay9jb21tb24vR2FtZU9iamVjdFBvb2wudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2ZyYW1ld29yay9jb21tb24vTGlzdC50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZnJhbWV3b3JrL2NvbW1vbi9NZXNzZW5nZXIudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2ZyYW1ld29yay9jb21tb24vTmljZURlY29yYXRvci50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZnJhbWV3b3JrL2NvbW1vbi9SZXNNYW5hZ2VyLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvY29tbW9uL1NpbmdsZXRvbi50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZnJhbWV3b3JrL2xvZ2dlci9Mb2dnZXIudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2ZyYW1ld29yay9uZXQvR2FtZVNlc3Npb24udHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2ZyYW1ld29yay9uZXQvSHR0cE1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2ZyYW1ld29yay9uZXQvTWVzc2FnZVBhcnNlci50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZnJhbWV3b3JrL25ldC9OZXRFcnJvckNvZGUudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2ZyYW1ld29yay9uZXQvU2Vzc2lvbk1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2ZyYW1ld29yay9zY2VuZS9CYXNlU2NlbmUudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2ZyYW1ld29yay9zY2VuZS9TY2VuZURlZi50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZnJhbWV3b3JrL3NjZW5lL1NjZW5lRmFjdG9yeS50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZnJhbWV3b3JrL3NjZW5lL1NjZW5lTWFuYWdlci50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZnJhbWV3b3JrL3VpL1VJQmFzZS50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZnJhbWV3b3JrL3VpL1VJRGVmaW5lLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvdWkvVUlGYWN0b3J5LnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvdWkvVUlMaWIvVUlMb2FkaW5nLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvdWkvVUlNYW5hZ2VyLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvdWkvVUlQYWdlLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9mcmFtZXdvcmsvdWkvVUlQYW5lbC50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZ2FtZS9ldmVudC9VSU1lc3NhZ2UudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2dhbWUvZXZlbnQvVUlNZXNzYWdlTWFuYWdlci50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZ2FtZS9tb2R1bGUvZmx5YmlyZC9zY2VuZS9GbHlCaXJkU2NlbmUudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2dhbWUvbW9kdWxlL2ZseWJpcmQvdWkvVUlGbHlCaXJkTWFpblZpZXcudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2dhbWUvbW9kdWxlL2dhbWVzdGFydC9zY2VuZS9HYW1lU3RhcnRTY2VuZS50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZ2FtZS9tb2R1bGUvZ2FtZXN0YXJ0L3VpL1VJU3RhcnRWaWV3LnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9nYW1lL21vZHVsZS9nYW1lc3RhcnQvdm8vVm9HYW1lU3RhcnQudHMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL2dhbWUvbW9kdWxlL2hvbWUvc2NlbmUvSG9tZVNjZW5lLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9nYW1lL21vZHVsZS9ob21lL3ZvL1ZvSG9tZS50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZ2FtZS9tb2R1bGUvcHZlL3NjZW5lL1B2ZVNjZW5lLnRzIiwid2VicGFjazovL3RzcHJvamVjdC8uL3NyYy9nbG9iYWwvR2FtZUNvbmZpZy50cyIsIndlYnBhY2s6Ly90c3Byb2plY3QvLi9zcmMvZGF0YS9wYi9nZW4vcGIuanMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0L2V4dGVybmFsIGNvbW1vbmpzMiBcImNzaGFycFwiIiwid2VicGFjazovL3RzcHJvamVjdC9leHRlcm5hbCBjb21tb25qczIgXCJwdWVydHNcIiIsIndlYnBhY2s6Ly90c3Byb2plY3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3RzcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdHNwcm9qZWN0Ly4vc3JjL0dhbWVNYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGFzUHJvbWlzZTtcclxuXHJcbi8qKlxyXG4gKiBDYWxsYmFjayBhcyB1c2VkIGJ5IHtAbGluayB1dGlsLmFzUHJvbWlzZX0uXHJcbiAqIEB0eXBlZGVmIGFzUHJvbWlzZUNhbGxiYWNrXHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICogQHBhcmFtIHtFcnJvcnxudWxsfSBlcnJvciBFcnJvciwgaWYgYW55XHJcbiAqIEBwYXJhbSB7Li4uKn0gcGFyYW1zIEFkZGl0aW9uYWwgYXJndW1lbnRzXHJcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYSBwcm9taXNlIGZyb20gYSBub2RlLXN0eWxlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gKiBAbWVtYmVyb2YgdXRpbFxyXG4gKiBAcGFyYW0ge2FzUHJvbWlzZUNhbGxiYWNrfSBmbiBGdW5jdGlvbiB0byBjYWxsXHJcbiAqIEBwYXJhbSB7Kn0gY3R4IEZ1bmN0aW9uIGNvbnRleHRcclxuICogQHBhcmFtIHsuLi4qfSBwYXJhbXMgRnVuY3Rpb24gYXJndW1lbnRzXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlPCo+fSBQcm9taXNpZmllZCBmdW5jdGlvblxyXG4gKi9cclxuZnVuY3Rpb24gYXNQcm9taXNlKGZuLCBjdHgvKiwgdmFyYXJncyAqLykge1xyXG4gICAgdmFyIHBhcmFtcyAgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpLFxyXG4gICAgICAgIG9mZnNldCAgPSAwLFxyXG4gICAgICAgIGluZGV4ICAgPSAyLFxyXG4gICAgICAgIHBlbmRpbmcgPSB0cnVlO1xyXG4gICAgd2hpbGUgKGluZGV4IDwgYXJndW1lbnRzLmxlbmd0aClcclxuICAgICAgICBwYXJhbXNbb2Zmc2V0KytdID0gYXJndW1lbnRzW2luZGV4KytdO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGV4ZWN1dG9yKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHBhcmFtc1tvZmZzZXRdID0gZnVuY3Rpb24gY2FsbGJhY2soZXJyLyosIHZhcmFyZ3MgKi8pIHtcclxuICAgICAgICAgICAgaWYgKHBlbmRpbmcpIHtcclxuICAgICAgICAgICAgICAgIHBlbmRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyYW1zID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAob2Zmc2V0IDwgcGFyYW1zLmxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zW29mZnNldCsrXSA9IGFyZ3VtZW50c1tvZmZzZXRdO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUuYXBwbHkobnVsbCwgcGFyYW1zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZm4uYXBwbHkoY3R4IHx8IG51bGwsIHBhcmFtcyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIGlmIChwZW5kaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBwZW5kaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuLyoqXHJcbiAqIEEgbWluaW1hbCBiYXNlNjQgaW1wbGVtZW50YXRpb24gZm9yIG51bWJlciBhcnJheXMuXHJcbiAqIEBtZW1iZXJvZiB1dGlsXHJcbiAqIEBuYW1lc3BhY2VcclxuICovXHJcbnZhciBiYXNlNjQgPSBleHBvcnRzO1xyXG5cclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIGJ5dGUgbGVuZ3RoIG9mIGEgYmFzZTY0IGVuY29kZWQgc3RyaW5nLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIEJhc2U2NCBlbmNvZGVkIHN0cmluZ1xyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBCeXRlIGxlbmd0aFxyXG4gKi9cclxuYmFzZTY0Lmxlbmd0aCA9IGZ1bmN0aW9uIGxlbmd0aChzdHJpbmcpIHtcclxuICAgIHZhciBwID0gc3RyaW5nLmxlbmd0aDtcclxuICAgIGlmICghcClcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIHZhciBuID0gMDtcclxuICAgIHdoaWxlICgtLXAgJSA0ID4gMSAmJiBzdHJpbmcuY2hhckF0KHApID09PSBcIj1cIilcclxuICAgICAgICArK247XHJcbiAgICByZXR1cm4gTWF0aC5jZWlsKHN0cmluZy5sZW5ndGggKiAzKSAvIDQgLSBuO1xyXG59O1xyXG5cclxuLy8gQmFzZTY0IGVuY29kaW5nIHRhYmxlXHJcbnZhciBiNjQgPSBuZXcgQXJyYXkoNjQpO1xyXG5cclxuLy8gQmFzZTY0IGRlY29kaW5nIHRhYmxlXHJcbnZhciBzNjQgPSBuZXcgQXJyYXkoMTIzKTtcclxuXHJcbi8vIDY1Li45MCwgOTcuLjEyMiwgNDguLjU3LCA0MywgNDdcclxuZm9yICh2YXIgaSA9IDA7IGkgPCA2NDspXHJcbiAgICBzNjRbYjY0W2ldID0gaSA8IDI2ID8gaSArIDY1IDogaSA8IDUyID8gaSArIDcxIDogaSA8IDYyID8gaSAtIDQgOiBpIC0gNTkgfCA0M10gPSBpKys7XHJcblxyXG4vKipcclxuICogRW5jb2RlcyBhIGJ1ZmZlciB0byBhIGJhc2U2NCBlbmNvZGVkIHN0cmluZy5cclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWZmZXIgU291cmNlIGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgU291cmNlIHN0YXJ0XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBlbmQgU291cmNlIGVuZFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBCYXNlNjQgZW5jb2RlZCBzdHJpbmdcclxuICovXHJcbmJhc2U2NC5lbmNvZGUgPSBmdW5jdGlvbiBlbmNvZGUoYnVmZmVyLCBzdGFydCwgZW5kKSB7XHJcbiAgICB2YXIgcGFydHMgPSBudWxsLFxyXG4gICAgICAgIGNodW5rID0gW107XHJcbiAgICB2YXIgaSA9IDAsIC8vIG91dHB1dCBpbmRleFxyXG4gICAgICAgIGogPSAwLCAvLyBnb3RvIGluZGV4XHJcbiAgICAgICAgdDsgICAgIC8vIHRlbXBvcmFyeVxyXG4gICAgd2hpbGUgKHN0YXJ0IDwgZW5kKSB7XHJcbiAgICAgICAgdmFyIGIgPSBidWZmZXJbc3RhcnQrK107XHJcbiAgICAgICAgc3dpdGNoIChqKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIGNodW5rW2krK10gPSBiNjRbYiA+PiAyXTtcclxuICAgICAgICAgICAgICAgIHQgPSAoYiAmIDMpIDw8IDQ7XHJcbiAgICAgICAgICAgICAgICBqID0gMTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBjaHVua1tpKytdID0gYjY0W3QgfCBiID4+IDRdO1xyXG4gICAgICAgICAgICAgICAgdCA9IChiICYgMTUpIDw8IDI7XHJcbiAgICAgICAgICAgICAgICBqID0gMjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICBjaHVua1tpKytdID0gYjY0W3QgfCBiID4+IDZdO1xyXG4gICAgICAgICAgICAgICAgY2h1bmtbaSsrXSA9IGI2NFtiICYgNjNdO1xyXG4gICAgICAgICAgICAgICAgaiA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGkgPiA4MTkxKSB7XHJcbiAgICAgICAgICAgIChwYXJ0cyB8fCAocGFydHMgPSBbXSkpLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNodW5rKSk7XHJcbiAgICAgICAgICAgIGkgPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChqKSB7XHJcbiAgICAgICAgY2h1bmtbaSsrXSA9IGI2NFt0XTtcclxuICAgICAgICBjaHVua1tpKytdID0gNjE7XHJcbiAgICAgICAgaWYgKGogPT09IDEpXHJcbiAgICAgICAgICAgIGNodW5rW2krK10gPSA2MTtcclxuICAgIH1cclxuICAgIGlmIChwYXJ0cykge1xyXG4gICAgICAgIGlmIChpKVxyXG4gICAgICAgICAgICBwYXJ0cy5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjaHVuay5zbGljZSgwLCBpKSkpO1xyXG4gICAgICAgIHJldHVybiBwYXJ0cy5qb2luKFwiXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjaHVuay5zbGljZSgwLCBpKSk7XHJcbn07XHJcblxyXG52YXIgaW52YWxpZEVuY29kaW5nID0gXCJpbnZhbGlkIGVuY29kaW5nXCI7XHJcblxyXG4vKipcclxuICogRGVjb2RlcyBhIGJhc2U2NCBlbmNvZGVkIHN0cmluZyB0byBhIGJ1ZmZlci5cclxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBTb3VyY2Ugc3RyaW5nXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmZmVyIERlc3RpbmF0aW9uIGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IERlc3RpbmF0aW9uIG9mZnNldFxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBOdW1iZXIgb2YgYnl0ZXMgd3JpdHRlblxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgZW5jb2RpbmcgaXMgaW52YWxpZFxyXG4gKi9cclxuYmFzZTY0LmRlY29kZSA9IGZ1bmN0aW9uIGRlY29kZShzdHJpbmcsIGJ1ZmZlciwgb2Zmc2V0KSB7XHJcbiAgICB2YXIgc3RhcnQgPSBvZmZzZXQ7XHJcbiAgICB2YXIgaiA9IDAsIC8vIGdvdG8gaW5kZXhcclxuICAgICAgICB0OyAgICAgLy8gdGVtcG9yYXJ5XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cmluZy5sZW5ndGg7KSB7XHJcbiAgICAgICAgdmFyIGMgPSBzdHJpbmcuY2hhckNvZGVBdChpKyspO1xyXG4gICAgICAgIGlmIChjID09PSA2MSAmJiBqID4gMSlcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgaWYgKChjID0gczY0W2NdKSA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihpbnZhbGlkRW5jb2RpbmcpO1xyXG4gICAgICAgIHN3aXRjaCAoaikge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICB0ID0gYztcclxuICAgICAgICAgICAgICAgIGogPSAxO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSB0IDw8IDIgfCAoYyAmIDQ4KSA+PiA0O1xyXG4gICAgICAgICAgICAgICAgdCA9IGM7XHJcbiAgICAgICAgICAgICAgICBqID0gMjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gKHQgJiAxNSkgPDwgNCB8IChjICYgNjApID4+IDI7XHJcbiAgICAgICAgICAgICAgICB0ID0gYztcclxuICAgICAgICAgICAgICAgIGogPSAzO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSAodCAmIDMpIDw8IDYgfCBjO1xyXG4gICAgICAgICAgICAgICAgaiA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoaiA9PT0gMSlcclxuICAgICAgICB0aHJvdyBFcnJvcihpbnZhbGlkRW5jb2RpbmcpO1xyXG4gICAgcmV0dXJuIG9mZnNldCAtIHN0YXJ0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoZSBzcGVjaWZpZWQgc3RyaW5nIGFwcGVhcnMgdG8gYmUgYmFzZTY0IGVuY29kZWQuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgU3RyaW5nIHRvIHRlc3RcclxuICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiBwcm9iYWJseSBiYXNlNjQgZW5jb2RlZCwgb3RoZXJ3aXNlIGZhbHNlXHJcbiAqL1xyXG5iYXNlNjQudGVzdCA9IGZ1bmN0aW9uIHRlc3Qoc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gL14oPzpbQS1aYS16MC05Ky9dezR9KSooPzpbQS1aYS16MC05Ky9dezJ9PT18W0EtWmEtejAtOSsvXXszfT0pPyQvLnRlc3Qoc3RyaW5nKTtcclxufTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xyXG5cclxuLyoqXHJcbiAqIENvbnN0cnVjdHMgYSBuZXcgZXZlbnQgZW1pdHRlciBpbnN0YW5jZS5cclxuICogQGNsYXNzZGVzYyBBIG1pbmltYWwgZXZlbnQgZW1pdHRlci5cclxuICogQG1lbWJlcm9mIHV0aWxcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWdpc3RlcmVkIGxpc3RlbmVycy5cclxuICAgICAqIEB0eXBlIHtPYmplY3QuPHN0cmluZywqPn1cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHRoaXMuX2xpc3RlbmVycyA9IHt9O1xyXG59XHJcblxyXG4vKipcclxuICogUmVnaXN0ZXJzIGFuIGV2ZW50IGxpc3RlbmVyLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZ0IEV2ZW50IG5hbWVcclxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm4gTGlzdGVuZXJcclxuICogQHBhcmFtIHsqfSBbY3R4XSBMaXN0ZW5lciBjb250ZXh0XHJcbiAqIEByZXR1cm5zIHt1dGlsLkV2ZW50RW1pdHRlcn0gYHRoaXNgXHJcbiAqL1xyXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gb24oZXZ0LCBmbiwgY3R4KSB7XHJcbiAgICAodGhpcy5fbGlzdGVuZXJzW2V2dF0gfHwgKHRoaXMuX2xpc3RlbmVyc1tldnRdID0gW10pKS5wdXNoKHtcclxuICAgICAgICBmbiAgOiBmbixcclxuICAgICAgICBjdHggOiBjdHggfHwgdGhpc1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIGFuIGV2ZW50IGxpc3RlbmVyIG9yIGFueSBtYXRjaGluZyBsaXN0ZW5lcnMgaWYgYXJndW1lbnRzIGFyZSBvbWl0dGVkLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW2V2dF0gRXZlbnQgbmFtZS4gUmVtb3ZlcyBhbGwgbGlzdGVuZXJzIGlmIG9taXR0ZWQuXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IFtmbl0gTGlzdGVuZXIgdG8gcmVtb3ZlLiBSZW1vdmVzIGFsbCBsaXN0ZW5lcnMgb2YgYGV2dGAgaWYgb21pdHRlZC5cclxuICogQHJldHVybnMge3V0aWwuRXZlbnRFbWl0dGVyfSBgdGhpc2BcclxuICovXHJcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24gb2ZmKGV2dCwgZm4pIHtcclxuICAgIGlmIChldnQgPT09IHVuZGVmaW5lZClcclxuICAgICAgICB0aGlzLl9saXN0ZW5lcnMgPSB7fTtcclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGlmIChmbiA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnNbZXZ0XSA9IFtdO1xyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzW2V2dF07XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDspXHJcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXJzW2ldLmZuID09PSBmbilcclxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICsraTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBFbWl0cyBhbiBldmVudCBieSBjYWxsaW5nIGl0cyBsaXN0ZW5lcnMgd2l0aCB0aGUgc3BlY2lmaWVkIGFyZ3VtZW50cy5cclxuICogQHBhcmFtIHtzdHJpbmd9IGV2dCBFdmVudCBuYW1lXHJcbiAqIEBwYXJhbSB7Li4uKn0gYXJncyBBcmd1bWVudHNcclxuICogQHJldHVybnMge3V0aWwuRXZlbnRFbWl0dGVyfSBgdGhpc2BcclxuICovXHJcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQoZXZ0KSB7XHJcbiAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzW2V2dF07XHJcbiAgICBpZiAobGlzdGVuZXJzKSB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBbXSxcclxuICAgICAgICAgICAgaSA9IDE7XHJcbiAgICAgICAgZm9yICg7IGkgPCBhcmd1bWVudHMubGVuZ3RoOylcclxuICAgICAgICAgICAgYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDspXHJcbiAgICAgICAgICAgIGxpc3RlbmVyc1tpXS5mbi5hcHBseShsaXN0ZW5lcnNbaSsrXS5jdHgsIGFyZ3MpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KGZhY3RvcnkpO1xyXG5cclxuLyoqXHJcbiAqIFJlYWRzIC8gd3JpdGVzIGZsb2F0cyAvIGRvdWJsZXMgZnJvbSAvIHRvIGJ1ZmZlcnMuXHJcbiAqIEBuYW1lIHV0aWwuZmxvYXRcclxuICogQG5hbWVzcGFjZVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBXcml0ZXMgYSAzMiBiaXQgZmxvYXQgdG8gYSBidWZmZXIgdXNpbmcgbGl0dGxlIGVuZGlhbiBieXRlIG9yZGVyLlxyXG4gKiBAbmFtZSB1dGlsLmZsb2F0LndyaXRlRmxvYXRMRVxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtudW1iZXJ9IHZhbCBWYWx1ZSB0byB3cml0ZVxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZiBUYXJnZXQgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwb3MgVGFyZ2V0IGJ1ZmZlciBvZmZzZXRcclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICovXHJcblxyXG4vKipcclxuICogV3JpdGVzIGEgMzIgYml0IGZsb2F0IHRvIGEgYnVmZmVyIHVzaW5nIGJpZyBlbmRpYW4gYnl0ZSBvcmRlci5cclxuICogQG5hbWUgdXRpbC5mbG9hdC53cml0ZUZsb2F0QkVcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWwgVmFsdWUgdG8gd3JpdGVcclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWYgVGFyZ2V0IGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gcG9zIFRhcmdldCBidWZmZXIgb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFJlYWRzIGEgMzIgYml0IGZsb2F0IGZyb20gYSBidWZmZXIgdXNpbmcgbGl0dGxlIGVuZGlhbiBieXRlIG9yZGVyLlxyXG4gKiBAbmFtZSB1dGlsLmZsb2F0LnJlYWRGbG9hdExFXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZiBTb3VyY2UgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwb3MgU291cmNlIGJ1ZmZlciBvZmZzZXRcclxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBSZWFkcyBhIDMyIGJpdCBmbG9hdCBmcm9tIGEgYnVmZmVyIHVzaW5nIGJpZyBlbmRpYW4gYnl0ZSBvcmRlci5cclxuICogQG5hbWUgdXRpbC5mbG9hdC5yZWFkRmxvYXRCRVxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWYgU291cmNlIGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gcG9zIFNvdXJjZSBidWZmZXIgb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcclxuICovXHJcblxyXG4vKipcclxuICogV3JpdGVzIGEgNjQgYml0IGRvdWJsZSB0byBhIGJ1ZmZlciB1c2luZyBsaXR0bGUgZW5kaWFuIGJ5dGUgb3JkZXIuXHJcbiAqIEBuYW1lIHV0aWwuZmxvYXQud3JpdGVEb3VibGVMRVxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtudW1iZXJ9IHZhbCBWYWx1ZSB0byB3cml0ZVxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZiBUYXJnZXQgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwb3MgVGFyZ2V0IGJ1ZmZlciBvZmZzZXRcclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICovXHJcblxyXG4vKipcclxuICogV3JpdGVzIGEgNjQgYml0IGRvdWJsZSB0byBhIGJ1ZmZlciB1c2luZyBiaWcgZW5kaWFuIGJ5dGUgb3JkZXIuXHJcbiAqIEBuYW1lIHV0aWwuZmxvYXQud3JpdGVEb3VibGVCRVxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtudW1iZXJ9IHZhbCBWYWx1ZSB0byB3cml0ZVxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZiBUYXJnZXQgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwb3MgVGFyZ2V0IGJ1ZmZlciBvZmZzZXRcclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICovXHJcblxyXG4vKipcclxuICogUmVhZHMgYSA2NCBiaXQgZG91YmxlIGZyb20gYSBidWZmZXIgdXNpbmcgbGl0dGxlIGVuZGlhbiBieXRlIG9yZGVyLlxyXG4gKiBAbmFtZSB1dGlsLmZsb2F0LnJlYWREb3VibGVMRVxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWYgU291cmNlIGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gcG9zIFNvdXJjZSBidWZmZXIgb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcclxuICovXHJcblxyXG4vKipcclxuICogUmVhZHMgYSA2NCBiaXQgZG91YmxlIGZyb20gYSBidWZmZXIgdXNpbmcgYmlnIGVuZGlhbiBieXRlIG9yZGVyLlxyXG4gKiBAbmFtZSB1dGlsLmZsb2F0LnJlYWREb3VibGVCRVxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWYgU291cmNlIGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gcG9zIFNvdXJjZSBidWZmZXIgb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcclxuICovXHJcblxyXG4vLyBGYWN0b3J5IGZ1bmN0aW9uIGZvciB0aGUgcHVycG9zZSBvZiBub2RlLWJhc2VkIHRlc3RpbmcgaW4gbW9kaWZpZWQgZ2xvYmFsIGVudmlyb25tZW50c1xyXG5mdW5jdGlvbiBmYWN0b3J5KGV4cG9ydHMpIHtcclxuXHJcbiAgICAvLyBmbG9hdDogdHlwZWQgYXJyYXlcclxuICAgIGlmICh0eXBlb2YgRmxvYXQzMkFycmF5ICE9PSBcInVuZGVmaW5lZFwiKSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHZhciBmMzIgPSBuZXcgRmxvYXQzMkFycmF5KFsgLTAgXSksXHJcbiAgICAgICAgICAgIGY4YiA9IG5ldyBVaW50OEFycmF5KGYzMi5idWZmZXIpLFxyXG4gICAgICAgICAgICBsZSAgPSBmOGJbM10gPT09IDEyODtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gd3JpdGVGbG9hdF9mMzJfY3B5KHZhbCwgYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgZjMyWzBdID0gdmFsO1xyXG4gICAgICAgICAgICBidWZbcG9zICAgIF0gPSBmOGJbMF07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAxXSA9IGY4YlsxXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDJdID0gZjhiWzJdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgM10gPSBmOGJbM107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB3cml0ZUZsb2F0X2YzMl9yZXYodmFsLCBidWYsIHBvcykge1xyXG4gICAgICAgICAgICBmMzJbMF0gPSB2YWw7XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgICAgXSA9IGY4YlszXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDFdID0gZjhiWzJdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgMl0gPSBmOGJbMV07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAzXSA9IGY4YlswXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgZXhwb3J0cy53cml0ZUZsb2F0TEUgPSBsZSA/IHdyaXRlRmxvYXRfZjMyX2NweSA6IHdyaXRlRmxvYXRfZjMyX3JldjtcclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgIGV4cG9ydHMud3JpdGVGbG9hdEJFID0gbGUgPyB3cml0ZUZsb2F0X2YzMl9yZXYgOiB3cml0ZUZsb2F0X2YzMl9jcHk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlYWRGbG9hdF9mMzJfY3B5KGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIGY4YlswXSA9IGJ1Zltwb3MgICAgXTtcclxuICAgICAgICAgICAgZjhiWzFdID0gYnVmW3BvcyArIDFdO1xyXG4gICAgICAgICAgICBmOGJbMl0gPSBidWZbcG9zICsgMl07XHJcbiAgICAgICAgICAgIGY4YlszXSA9IGJ1Zltwb3MgKyAzXTtcclxuICAgICAgICAgICAgcmV0dXJuIGYzMlswXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlYWRGbG9hdF9mMzJfcmV2KGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIGY4YlszXSA9IGJ1Zltwb3MgICAgXTtcclxuICAgICAgICAgICAgZjhiWzJdID0gYnVmW3BvcyArIDFdO1xyXG4gICAgICAgICAgICBmOGJbMV0gPSBidWZbcG9zICsgMl07XHJcbiAgICAgICAgICAgIGY4YlswXSA9IGJ1Zltwb3MgKyAzXTtcclxuICAgICAgICAgICAgcmV0dXJuIGYzMlswXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgZXhwb3J0cy5yZWFkRmxvYXRMRSA9IGxlID8gcmVhZEZsb2F0X2YzMl9jcHkgOiByZWFkRmxvYXRfZjMyX3JldjtcclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgIGV4cG9ydHMucmVhZEZsb2F0QkUgPSBsZSA/IHJlYWRGbG9hdF9mMzJfcmV2IDogcmVhZEZsb2F0X2YzMl9jcHk7XHJcblxyXG4gICAgLy8gZmxvYXQ6IGllZWU3NTRcclxuICAgIH0pKCk7IGVsc2UgKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB3cml0ZUZsb2F0X2llZWU3NTQod3JpdGVVaW50LCB2YWwsIGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIHZhciBzaWduID0gdmFsIDwgMCA/IDEgOiAwO1xyXG4gICAgICAgICAgICBpZiAoc2lnbilcclxuICAgICAgICAgICAgICAgIHZhbCA9IC12YWw7XHJcbiAgICAgICAgICAgIGlmICh2YWwgPT09IDApXHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoMSAvIHZhbCA+IDAgPyAvKiBwb3NpdGl2ZSAqLyAwIDogLyogbmVnYXRpdmUgMCAqLyAyMTQ3NDgzNjQ4LCBidWYsIHBvcyk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGlzTmFOKHZhbCkpXHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoMjE0MzI4OTM0NCwgYnVmLCBwb3MpO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh2YWwgPiAzLjQwMjgyMzQ2NjM4NTI4ODZlKzM4KSAvLyArLUluZmluaXR5XHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoKHNpZ24gPDwgMzEgfCAyMTM5MDk1MDQwKSA+Pj4gMCwgYnVmLCBwb3MpO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh2YWwgPCAxLjE3NTQ5NDM1MDgyMjI4NzVlLTM4KSAvLyBkZW5vcm1hbFxyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KChzaWduIDw8IDMxIHwgTWF0aC5yb3VuZCh2YWwgLyAxLjQwMTI5ODQ2NDMyNDgxN2UtNDUpKSA+Pj4gMCwgYnVmLCBwb3MpO1xyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBleHBvbmVudCA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsKSAvIE1hdGguTE4yKSxcclxuICAgICAgICAgICAgICAgICAgICBtYW50aXNzYSA9IE1hdGgucm91bmQodmFsICogTWF0aC5wb3coMiwgLWV4cG9uZW50KSAqIDgzODg2MDgpICYgODM4ODYwNztcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgoc2lnbiA8PCAzMSB8IGV4cG9uZW50ICsgMTI3IDw8IDIzIHwgbWFudGlzc2EpID4+PiAwLCBidWYsIHBvcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV4cG9ydHMud3JpdGVGbG9hdExFID0gd3JpdGVGbG9hdF9pZWVlNzU0LmJpbmQobnVsbCwgd3JpdGVVaW50TEUpO1xyXG4gICAgICAgIGV4cG9ydHMud3JpdGVGbG9hdEJFID0gd3JpdGVGbG9hdF9pZWVlNzU0LmJpbmQobnVsbCwgd3JpdGVVaW50QkUpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiByZWFkRmxvYXRfaWVlZTc1NChyZWFkVWludCwgYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgdmFyIHVpbnQgPSByZWFkVWludChidWYsIHBvcyksXHJcbiAgICAgICAgICAgICAgICBzaWduID0gKHVpbnQgPj4gMzEpICogMiArIDEsXHJcbiAgICAgICAgICAgICAgICBleHBvbmVudCA9IHVpbnQgPj4+IDIzICYgMjU1LFxyXG4gICAgICAgICAgICAgICAgbWFudGlzc2EgPSB1aW50ICYgODM4ODYwNztcclxuICAgICAgICAgICAgcmV0dXJuIGV4cG9uZW50ID09PSAyNTVcclxuICAgICAgICAgICAgICAgID8gbWFudGlzc2FcclxuICAgICAgICAgICAgICAgID8gTmFOXHJcbiAgICAgICAgICAgICAgICA6IHNpZ24gKiBJbmZpbml0eVxyXG4gICAgICAgICAgICAgICAgOiBleHBvbmVudCA9PT0gMCAvLyBkZW5vcm1hbFxyXG4gICAgICAgICAgICAgICAgPyBzaWduICogMS40MDEyOTg0NjQzMjQ4MTdlLTQ1ICogbWFudGlzc2FcclxuICAgICAgICAgICAgICAgIDogc2lnbiAqIE1hdGgucG93KDIsIGV4cG9uZW50IC0gMTUwKSAqIChtYW50aXNzYSArIDgzODg2MDgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXhwb3J0cy5yZWFkRmxvYXRMRSA9IHJlYWRGbG9hdF9pZWVlNzU0LmJpbmQobnVsbCwgcmVhZFVpbnRMRSk7XHJcbiAgICAgICAgZXhwb3J0cy5yZWFkRmxvYXRCRSA9IHJlYWRGbG9hdF9pZWVlNzU0LmJpbmQobnVsbCwgcmVhZFVpbnRCRSk7XHJcblxyXG4gICAgfSkoKTtcclxuXHJcbiAgICAvLyBkb3VibGU6IHR5cGVkIGFycmF5XHJcbiAgICBpZiAodHlwZW9mIEZsb2F0NjRBcnJheSAhPT0gXCJ1bmRlZmluZWRcIikgKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB2YXIgZjY0ID0gbmV3IEZsb2F0NjRBcnJheShbLTBdKSxcclxuICAgICAgICAgICAgZjhiID0gbmV3IFVpbnQ4QXJyYXkoZjY0LmJ1ZmZlciksXHJcbiAgICAgICAgICAgIGxlICA9IGY4Yls3XSA9PT0gMTI4O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB3cml0ZURvdWJsZV9mNjRfY3B5KHZhbCwgYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgZjY0WzBdID0gdmFsO1xyXG4gICAgICAgICAgICBidWZbcG9zICAgIF0gPSBmOGJbMF07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAxXSA9IGY4YlsxXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDJdID0gZjhiWzJdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgM10gPSBmOGJbM107XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyA0XSA9IGY4Yls0XTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDVdID0gZjhiWzVdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgNl0gPSBmOGJbNl07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyA3XSA9IGY4Yls3XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHdyaXRlRG91YmxlX2Y2NF9yZXYodmFsLCBidWYsIHBvcykge1xyXG4gICAgICAgICAgICBmNjRbMF0gPSB2YWw7XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgICAgXSA9IGY4Yls3XTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDFdID0gZjhiWzZdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgMl0gPSBmOGJbNV07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAzXSA9IGY4Yls0XTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDRdID0gZjhiWzNdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgNV0gPSBmOGJbMl07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyA2XSA9IGY4YlsxXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDddID0gZjhiWzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBleHBvcnRzLndyaXRlRG91YmxlTEUgPSBsZSA/IHdyaXRlRG91YmxlX2Y2NF9jcHkgOiB3cml0ZURvdWJsZV9mNjRfcmV2O1xyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgZXhwb3J0cy53cml0ZURvdWJsZUJFID0gbGUgPyB3cml0ZURvdWJsZV9mNjRfcmV2IDogd3JpdGVEb3VibGVfZjY0X2NweTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVhZERvdWJsZV9mNjRfY3B5KGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIGY4YlswXSA9IGJ1Zltwb3MgICAgXTtcclxuICAgICAgICAgICAgZjhiWzFdID0gYnVmW3BvcyArIDFdO1xyXG4gICAgICAgICAgICBmOGJbMl0gPSBidWZbcG9zICsgMl07XHJcbiAgICAgICAgICAgIGY4YlszXSA9IGJ1Zltwb3MgKyAzXTtcclxuICAgICAgICAgICAgZjhiWzRdID0gYnVmW3BvcyArIDRdO1xyXG4gICAgICAgICAgICBmOGJbNV0gPSBidWZbcG9zICsgNV07XHJcbiAgICAgICAgICAgIGY4Yls2XSA9IGJ1Zltwb3MgKyA2XTtcclxuICAgICAgICAgICAgZjhiWzddID0gYnVmW3BvcyArIDddO1xyXG4gICAgICAgICAgICByZXR1cm4gZjY0WzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVhZERvdWJsZV9mNjRfcmV2KGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIGY4Yls3XSA9IGJ1Zltwb3MgICAgXTtcclxuICAgICAgICAgICAgZjhiWzZdID0gYnVmW3BvcyArIDFdO1xyXG4gICAgICAgICAgICBmOGJbNV0gPSBidWZbcG9zICsgMl07XHJcbiAgICAgICAgICAgIGY4Yls0XSA9IGJ1Zltwb3MgKyAzXTtcclxuICAgICAgICAgICAgZjhiWzNdID0gYnVmW3BvcyArIDRdO1xyXG4gICAgICAgICAgICBmOGJbMl0gPSBidWZbcG9zICsgNV07XHJcbiAgICAgICAgICAgIGY4YlsxXSA9IGJ1Zltwb3MgKyA2XTtcclxuICAgICAgICAgICAgZjhiWzBdID0gYnVmW3BvcyArIDddO1xyXG4gICAgICAgICAgICByZXR1cm4gZjY0WzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBleHBvcnRzLnJlYWREb3VibGVMRSA9IGxlID8gcmVhZERvdWJsZV9mNjRfY3B5IDogcmVhZERvdWJsZV9mNjRfcmV2O1xyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgZXhwb3J0cy5yZWFkRG91YmxlQkUgPSBsZSA/IHJlYWREb3VibGVfZjY0X3JldiA6IHJlYWREb3VibGVfZjY0X2NweTtcclxuXHJcbiAgICAvLyBkb3VibGU6IGllZWU3NTRcclxuICAgIH0pKCk7IGVsc2UgKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB3cml0ZURvdWJsZV9pZWVlNzU0KHdyaXRlVWludCwgb2ZmMCwgb2ZmMSwgdmFsLCBidWYsIHBvcykge1xyXG4gICAgICAgICAgICB2YXIgc2lnbiA9IHZhbCA8IDAgPyAxIDogMDtcclxuICAgICAgICAgICAgaWYgKHNpZ24pXHJcbiAgICAgICAgICAgICAgICB2YWwgPSAtdmFsO1xyXG4gICAgICAgICAgICBpZiAodmFsID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoMCwgYnVmLCBwb3MgKyBvZmYwKTtcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgxIC8gdmFsID4gMCA/IC8qIHBvc2l0aXZlICovIDAgOiAvKiBuZWdhdGl2ZSAwICovIDIxNDc0ODM2NDgsIGJ1ZiwgcG9zICsgb2ZmMSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNOYU4odmFsKSkge1xyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KDAsIGJ1ZiwgcG9zICsgb2ZmMCk7XHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoMjE0Njk1OTM2MCwgYnVmLCBwb3MgKyBvZmYxKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWwgPiAxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOCkgeyAvLyArLUluZmluaXR5XHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoMCwgYnVmLCBwb3MgKyBvZmYwKTtcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgoc2lnbiA8PCAzMSB8IDIxNDY0MzUwNzIpID4+PiAwLCBidWYsIHBvcyArIG9mZjEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1hbnRpc3NhO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbCA8IDIuMjI1MDczODU4NTA3MjAxNGUtMzA4KSB7IC8vIGRlbm9ybWFsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFudGlzc2EgPSB2YWwgLyA1ZS0zMjQ7XHJcbiAgICAgICAgICAgICAgICAgICAgd3JpdGVVaW50KG1hbnRpc3NhID4+PiAwLCBidWYsIHBvcyArIG9mZjApO1xyXG4gICAgICAgICAgICAgICAgICAgIHdyaXRlVWludCgoc2lnbiA8PCAzMSB8IG1hbnRpc3NhIC8gNDI5NDk2NzI5NikgPj4+IDAsIGJ1ZiwgcG9zICsgb2ZmMSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBleHBvbmVudCA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsKSAvIE1hdGguTE4yKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXhwb25lbnQgPT09IDEwMjQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cG9uZW50ID0gMTAyMztcclxuICAgICAgICAgICAgICAgICAgICBtYW50aXNzYSA9IHZhbCAqIE1hdGgucG93KDIsIC1leHBvbmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgd3JpdGVVaW50KG1hbnRpc3NhICogNDUwMzU5OTYyNzM3MDQ5NiA+Pj4gMCwgYnVmLCBwb3MgKyBvZmYwKTtcclxuICAgICAgICAgICAgICAgICAgICB3cml0ZVVpbnQoKHNpZ24gPDwgMzEgfCBleHBvbmVudCArIDEwMjMgPDwgMjAgfCBtYW50aXNzYSAqIDEwNDg1NzYgJiAxMDQ4NTc1KSA+Pj4gMCwgYnVmLCBwb3MgKyBvZmYxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXhwb3J0cy53cml0ZURvdWJsZUxFID0gd3JpdGVEb3VibGVfaWVlZTc1NC5iaW5kKG51bGwsIHdyaXRlVWludExFLCAwLCA0KTtcclxuICAgICAgICBleHBvcnRzLndyaXRlRG91YmxlQkUgPSB3cml0ZURvdWJsZV9pZWVlNzU0LmJpbmQobnVsbCwgd3JpdGVVaW50QkUsIDQsIDApO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiByZWFkRG91YmxlX2llZWU3NTQocmVhZFVpbnQsIG9mZjAsIG9mZjEsIGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIHZhciBsbyA9IHJlYWRVaW50KGJ1ZiwgcG9zICsgb2ZmMCksXHJcbiAgICAgICAgICAgICAgICBoaSA9IHJlYWRVaW50KGJ1ZiwgcG9zICsgb2ZmMSk7XHJcbiAgICAgICAgICAgIHZhciBzaWduID0gKGhpID4+IDMxKSAqIDIgKyAxLFxyXG4gICAgICAgICAgICAgICAgZXhwb25lbnQgPSBoaSA+Pj4gMjAgJiAyMDQ3LFxyXG4gICAgICAgICAgICAgICAgbWFudGlzc2EgPSA0Mjk0OTY3Mjk2ICogKGhpICYgMTA0ODU3NSkgKyBsbztcclxuICAgICAgICAgICAgcmV0dXJuIGV4cG9uZW50ID09PSAyMDQ3XHJcbiAgICAgICAgICAgICAgICA/IG1hbnRpc3NhXHJcbiAgICAgICAgICAgICAgICA/IE5hTlxyXG4gICAgICAgICAgICAgICAgOiBzaWduICogSW5maW5pdHlcclxuICAgICAgICAgICAgICAgIDogZXhwb25lbnQgPT09IDAgLy8gZGVub3JtYWxcclxuICAgICAgICAgICAgICAgID8gc2lnbiAqIDVlLTMyNCAqIG1hbnRpc3NhXHJcbiAgICAgICAgICAgICAgICA6IHNpZ24gKiBNYXRoLnBvdygyLCBleHBvbmVudCAtIDEwNzUpICogKG1hbnRpc3NhICsgNDUwMzU5OTYyNzM3MDQ5Nik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBleHBvcnRzLnJlYWREb3VibGVMRSA9IHJlYWREb3VibGVfaWVlZTc1NC5iaW5kKG51bGwsIHJlYWRVaW50TEUsIDAsIDQpO1xyXG4gICAgICAgIGV4cG9ydHMucmVhZERvdWJsZUJFID0gcmVhZERvdWJsZV9pZWVlNzU0LmJpbmQobnVsbCwgcmVhZFVpbnRCRSwgNCwgMCk7XHJcblxyXG4gICAgfSkoKTtcclxuXHJcbiAgICByZXR1cm4gZXhwb3J0cztcclxufVxyXG5cclxuLy8gdWludCBoZWxwZXJzXHJcblxyXG5mdW5jdGlvbiB3cml0ZVVpbnRMRSh2YWwsIGJ1ZiwgcG9zKSB7XHJcbiAgICBidWZbcG9zICAgIF0gPSAgdmFsICAgICAgICAmIDI1NTtcclxuICAgIGJ1Zltwb3MgKyAxXSA9ICB2YWwgPj4+IDggICYgMjU1O1xyXG4gICAgYnVmW3BvcyArIDJdID0gIHZhbCA+Pj4gMTYgJiAyNTU7XHJcbiAgICBidWZbcG9zICsgM10gPSAgdmFsID4+PiAyNDtcclxufVxyXG5cclxuZnVuY3Rpb24gd3JpdGVVaW50QkUodmFsLCBidWYsIHBvcykge1xyXG4gICAgYnVmW3BvcyAgICBdID0gIHZhbCA+Pj4gMjQ7XHJcbiAgICBidWZbcG9zICsgMV0gPSAgdmFsID4+PiAxNiAmIDI1NTtcclxuICAgIGJ1Zltwb3MgKyAyXSA9ICB2YWwgPj4+IDggICYgMjU1O1xyXG4gICAgYnVmW3BvcyArIDNdID0gIHZhbCAgICAgICAgJiAyNTU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlYWRVaW50TEUoYnVmLCBwb3MpIHtcclxuICAgIHJldHVybiAoYnVmW3BvcyAgICBdXHJcbiAgICAgICAgICB8IGJ1Zltwb3MgKyAxXSA8PCA4XHJcbiAgICAgICAgICB8IGJ1Zltwb3MgKyAyXSA8PCAxNlxyXG4gICAgICAgICAgfCBidWZbcG9zICsgM10gPDwgMjQpID4+PiAwO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWFkVWludEJFKGJ1ZiwgcG9zKSB7XHJcbiAgICByZXR1cm4gKGJ1Zltwb3MgICAgXSA8PCAyNFxyXG4gICAgICAgICAgfCBidWZbcG9zICsgMV0gPDwgMTZcclxuICAgICAgICAgIHwgYnVmW3BvcyArIDJdIDw8IDhcclxuICAgICAgICAgIHwgYnVmW3BvcyArIDNdKSA+Pj4gMDtcclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPSBpbnF1aXJlO1xyXG5cclxuLyoqXHJcbiAqIFJlcXVpcmVzIGEgbW9kdWxlIG9ubHkgaWYgYXZhaWxhYmxlLlxyXG4gKiBAbWVtYmVyb2YgdXRpbFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kdWxlTmFtZSBNb2R1bGUgdG8gcmVxdWlyZVxyXG4gKiBAcmV0dXJucyB7P09iamVjdH0gUmVxdWlyZWQgbW9kdWxlIGlmIGF2YWlsYWJsZSBhbmQgbm90IGVtcHR5LCBvdGhlcndpc2UgYG51bGxgXHJcbiAqL1xyXG5mdW5jdGlvbiBpbnF1aXJlKG1vZHVsZU5hbWUpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgdmFyIG1vZCA9IGV2YWwoXCJxdWlyZVwiLnJlcGxhY2UoL14vLFwicmVcIikpKG1vZHVsZU5hbWUpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWV2YWxcclxuICAgICAgICBpZiAobW9kICYmIChtb2QubGVuZ3RoIHx8IE9iamVjdC5rZXlzKG1vZCkubGVuZ3RoKSlcclxuICAgICAgICAgICAgcmV0dXJuIG1vZDtcclxuICAgIH0gY2F0Y2ggKGUpIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZW1wdHlcclxuICAgIHJldHVybiBudWxsO1xyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IHBvb2w7XHJcblxyXG4vKipcclxuICogQW4gYWxsb2NhdG9yIGFzIHVzZWQgYnkge0BsaW5rIHV0aWwucG9vbH0uXHJcbiAqIEB0eXBlZGVmIFBvb2xBbGxvY2F0b3JcclxuICogQHR5cGUge2Z1bmN0aW9ufVxyXG4gKiBAcGFyYW0ge251bWJlcn0gc2l6ZSBCdWZmZXIgc2l6ZVxyXG4gKiBAcmV0dXJucyB7VWludDhBcnJheX0gQnVmZmVyXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEEgc2xpY2VyIGFzIHVzZWQgYnkge0BsaW5rIHV0aWwucG9vbH0uXHJcbiAqIEB0eXBlZGVmIFBvb2xTbGljZXJcclxuICogQHR5cGUge2Z1bmN0aW9ufVxyXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgU3RhcnQgb2Zmc2V0XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBlbmQgRW5kIG9mZnNldFxyXG4gKiBAcmV0dXJucyB7VWludDhBcnJheX0gQnVmZmVyIHNsaWNlXHJcbiAqIEB0aGlzIHtVaW50OEFycmF5fVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBBIGdlbmVyYWwgcHVycG9zZSBidWZmZXIgcG9vbC5cclxuICogQG1lbWJlcm9mIHV0aWxcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7UG9vbEFsbG9jYXRvcn0gYWxsb2MgQWxsb2NhdG9yXHJcbiAqIEBwYXJhbSB7UG9vbFNsaWNlcn0gc2xpY2UgU2xpY2VyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBbc2l6ZT04MTkyXSBTbGFiIHNpemVcclxuICogQHJldHVybnMge1Bvb2xBbGxvY2F0b3J9IFBvb2xlZCBhbGxvY2F0b3JcclxuICovXHJcbmZ1bmN0aW9uIHBvb2woYWxsb2MsIHNsaWNlLCBzaXplKSB7XHJcbiAgICB2YXIgU0laRSAgID0gc2l6ZSB8fCA4MTkyO1xyXG4gICAgdmFyIE1BWCAgICA9IFNJWkUgPj4+IDE7XHJcbiAgICB2YXIgc2xhYiAgID0gbnVsbDtcclxuICAgIHZhciBvZmZzZXQgPSBTSVpFO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHBvb2xfYWxsb2Moc2l6ZSkge1xyXG4gICAgICAgIGlmIChzaXplIDwgMSB8fCBzaXplID4gTUFYKVxyXG4gICAgICAgICAgICByZXR1cm4gYWxsb2Moc2l6ZSk7XHJcbiAgICAgICAgaWYgKG9mZnNldCArIHNpemUgPiBTSVpFKSB7XHJcbiAgICAgICAgICAgIHNsYWIgPSBhbGxvYyhTSVpFKTtcclxuICAgICAgICAgICAgb2Zmc2V0ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGJ1ZiA9IHNsaWNlLmNhbGwoc2xhYiwgb2Zmc2V0LCBvZmZzZXQgKz0gc2l6ZSk7XHJcbiAgICAgICAgaWYgKG9mZnNldCAmIDcpIC8vIGFsaWduIHRvIDMyIGJpdFxyXG4gICAgICAgICAgICBvZmZzZXQgPSAob2Zmc2V0IHwgNykgKyAxO1xyXG4gICAgICAgIHJldHVybiBidWY7XHJcbiAgICB9O1xyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuLyoqXHJcbiAqIEEgbWluaW1hbCBVVEY4IGltcGxlbWVudGF0aW9uIGZvciBudW1iZXIgYXJyYXlzLlxyXG4gKiBAbWVtYmVyb2YgdXRpbFxyXG4gKiBAbmFtZXNwYWNlXHJcbiAqL1xyXG52YXIgdXRmOCA9IGV4cG9ydHM7XHJcblxyXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgVVRGOCBieXRlIGxlbmd0aCBvZiBhIHN0cmluZy5cclxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBTdHJpbmdcclxuICogQHJldHVybnMge251bWJlcn0gQnl0ZSBsZW5ndGhcclxuICovXHJcbnV0ZjgubGVuZ3RoID0gZnVuY3Rpb24gdXRmOF9sZW5ndGgoc3RyaW5nKSB7XHJcbiAgICB2YXIgbGVuID0gMCxcclxuICAgICAgICBjID0gMDtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgYyA9IHN0cmluZy5jaGFyQ29kZUF0KGkpO1xyXG4gICAgICAgIGlmIChjIDwgMTI4KVxyXG4gICAgICAgICAgICBsZW4gKz0gMTtcclxuICAgICAgICBlbHNlIGlmIChjIDwgMjA0OClcclxuICAgICAgICAgICAgbGVuICs9IDI7XHJcbiAgICAgICAgZWxzZSBpZiAoKGMgJiAweEZDMDApID09PSAweEQ4MDAgJiYgKHN0cmluZy5jaGFyQ29kZUF0KGkgKyAxKSAmIDB4RkMwMCkgPT09IDB4REMwMCkge1xyXG4gICAgICAgICAgICArK2k7XHJcbiAgICAgICAgICAgIGxlbiArPSA0O1xyXG4gICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICBsZW4gKz0gMztcclxuICAgIH1cclxuICAgIHJldHVybiBsZW47XHJcbn07XHJcblxyXG4vKipcclxuICogUmVhZHMgVVRGOCBieXRlcyBhcyBhIHN0cmluZy5cclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWZmZXIgU291cmNlIGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgU291cmNlIHN0YXJ0XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBlbmQgU291cmNlIGVuZFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBTdHJpbmcgcmVhZFxyXG4gKi9cclxudXRmOC5yZWFkID0gZnVuY3Rpb24gdXRmOF9yZWFkKGJ1ZmZlciwgc3RhcnQsIGVuZCkge1xyXG4gICAgdmFyIGxlbiA9IGVuZCAtIHN0YXJ0O1xyXG4gICAgaWYgKGxlbiA8IDEpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB2YXIgcGFydHMgPSBudWxsLFxyXG4gICAgICAgIGNodW5rID0gW10sXHJcbiAgICAgICAgaSA9IDAsIC8vIGNoYXIgb2Zmc2V0XHJcbiAgICAgICAgdDsgICAgIC8vIHRlbXBvcmFyeVxyXG4gICAgd2hpbGUgKHN0YXJ0IDwgZW5kKSB7XHJcbiAgICAgICAgdCA9IGJ1ZmZlcltzdGFydCsrXTtcclxuICAgICAgICBpZiAodCA8IDEyOClcclxuICAgICAgICAgICAgY2h1bmtbaSsrXSA9IHQ7XHJcbiAgICAgICAgZWxzZSBpZiAodCA+IDE5MSAmJiB0IDwgMjI0KVxyXG4gICAgICAgICAgICBjaHVua1tpKytdID0gKHQgJiAzMSkgPDwgNiB8IGJ1ZmZlcltzdGFydCsrXSAmIDYzO1xyXG4gICAgICAgIGVsc2UgaWYgKHQgPiAyMzkgJiYgdCA8IDM2NSkge1xyXG4gICAgICAgICAgICB0ID0gKCh0ICYgNykgPDwgMTggfCAoYnVmZmVyW3N0YXJ0KytdICYgNjMpIDw8IDEyIHwgKGJ1ZmZlcltzdGFydCsrXSAmIDYzKSA8PCA2IHwgYnVmZmVyW3N0YXJ0KytdICYgNjMpIC0gMHgxMDAwMDtcclxuICAgICAgICAgICAgY2h1bmtbaSsrXSA9IDB4RDgwMCArICh0ID4+IDEwKTtcclxuICAgICAgICAgICAgY2h1bmtbaSsrXSA9IDB4REMwMCArICh0ICYgMTAyMyk7XHJcbiAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgIGNodW5rW2krK10gPSAodCAmIDE1KSA8PCAxMiB8IChidWZmZXJbc3RhcnQrK10gJiA2MykgPDwgNiB8IGJ1ZmZlcltzdGFydCsrXSAmIDYzO1xyXG4gICAgICAgIGlmIChpID4gODE5MSkge1xyXG4gICAgICAgICAgICAocGFydHMgfHwgKHBhcnRzID0gW10pKS5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjaHVuaykpO1xyXG4gICAgICAgICAgICBpID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAocGFydHMpIHtcclxuICAgICAgICBpZiAoaSlcclxuICAgICAgICAgICAgcGFydHMucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY2h1bmsuc2xpY2UoMCwgaSkpKTtcclxuICAgICAgICByZXR1cm4gcGFydHMuam9pbihcIlwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY2h1bmsuc2xpY2UoMCwgaSkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdyaXRlcyBhIHN0cmluZyBhcyBVVEY4IGJ5dGVzLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFNvdXJjZSBzdHJpbmdcclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWZmZXIgRGVzdGluYXRpb24gYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgRGVzdGluYXRpb24gb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IEJ5dGVzIHdyaXR0ZW5cclxuICovXHJcbnV0Zjgud3JpdGUgPSBmdW5jdGlvbiB1dGY4X3dyaXRlKHN0cmluZywgYnVmZmVyLCBvZmZzZXQpIHtcclxuICAgIHZhciBzdGFydCA9IG9mZnNldCxcclxuICAgICAgICBjMSwgLy8gY2hhcmFjdGVyIDFcclxuICAgICAgICBjMjsgLy8gY2hhcmFjdGVyIDJcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgYzEgPSBzdHJpbmcuY2hhckNvZGVBdChpKTtcclxuICAgICAgICBpZiAoYzEgPCAxMjgpIHtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYzEgPCAyMDQ4KSB7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSBjMSA+PiA2ICAgICAgIHwgMTkyO1xyXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gYzEgICAgICAgJiA2MyB8IDEyODtcclxuICAgICAgICB9IGVsc2UgaWYgKChjMSAmIDB4RkMwMCkgPT09IDB4RDgwMCAmJiAoKGMyID0gc3RyaW5nLmNoYXJDb2RlQXQoaSArIDEpKSAmIDB4RkMwMCkgPT09IDB4REMwMCkge1xyXG4gICAgICAgICAgICBjMSA9IDB4MTAwMDAgKyAoKGMxICYgMHgwM0ZGKSA8PCAxMCkgKyAoYzIgJiAweDAzRkYpO1xyXG4gICAgICAgICAgICArK2k7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSBjMSA+PiAxOCAgICAgIHwgMjQwO1xyXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gYzEgPj4gMTIgJiA2MyB8IDEyODtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxID4+IDYgICYgNjMgfCAxMjg7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSBjMSAgICAgICAmIDYzIHwgMTI4O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSBjMSA+PiAxMiAgICAgIHwgMjI0O1xyXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gYzEgPj4gNiAgJiA2MyB8IDEyODtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxICAgICAgICYgNjMgfCAxMjg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9mZnNldCAtIHN0YXJ0O1xyXG59O1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IExvbmc7XHJcblxyXG4vKipcclxuICogd2FzbSBvcHRpbWl6YXRpb25zLCB0byBkbyBuYXRpdmUgaTY0IG11bHRpcGxpY2F0aW9uIGFuZCBkaXZpZGVcclxuICovXHJcbnZhciB3YXNtID0gbnVsbDtcclxuXHJcbnRyeSB7XHJcbiAgd2FzbSA9IG5ldyBXZWJBc3NlbWJseS5JbnN0YW5jZShuZXcgV2ViQXNzZW1ibHkuTW9kdWxlKG5ldyBVaW50OEFycmF5KFtcclxuICAgIDAsIDk3LCAxMTUsIDEwOSwgMSwgMCwgMCwgMCwgMSwgMTMsIDIsIDk2LCAwLCAxLCAxMjcsIDk2LCA0LCAxMjcsIDEyNywgMTI3LCAxMjcsIDEsIDEyNywgMywgNywgNiwgMCwgMSwgMSwgMSwgMSwgMSwgNiwgNiwgMSwgMTI3LCAxLCA2NSwgMCwgMTEsIDcsIDUwLCA2LCAzLCAxMDksIDExNywgMTA4LCAwLCAxLCA1LCAxMDAsIDEwNSwgMTE4LCA5NSwgMTE1LCAwLCAyLCA1LCAxMDAsIDEwNSwgMTE4LCA5NSwgMTE3LCAwLCAzLCA1LCAxMTQsIDEwMSwgMTA5LCA5NSwgMTE1LCAwLCA0LCA1LCAxMTQsIDEwMSwgMTA5LCA5NSwgMTE3LCAwLCA1LCA4LCAxMDMsIDEwMSwgMTE2LCA5NSwgMTA0LCAxMDUsIDEwMywgMTA0LCAwLCAwLCAxMCwgMTkxLCAxLCA2LCA0LCAwLCAzNSwgMCwgMTEsIDM2LCAxLCAxLCAxMjYsIDMyLCAwLCAxNzMsIDMyLCAxLCAxNzMsIDY2LCAzMiwgMTM0LCAxMzIsIDMyLCAyLCAxNzMsIDMyLCAzLCAxNzMsIDY2LCAzMiwgMTM0LCAxMzIsIDEyNiwgMzQsIDQsIDY2LCAzMiwgMTM1LCAxNjcsIDM2LCAwLCAzMiwgNCwgMTY3LCAxMSwgMzYsIDEsIDEsIDEyNiwgMzIsIDAsIDE3MywgMzIsIDEsIDE3MywgNjYsIDMyLCAxMzQsIDEzMiwgMzIsIDIsIDE3MywgMzIsIDMsIDE3MywgNjYsIDMyLCAxMzQsIDEzMiwgMTI3LCAzNCwgNCwgNjYsIDMyLCAxMzUsIDE2NywgMzYsIDAsIDMyLCA0LCAxNjcsIDExLCAzNiwgMSwgMSwgMTI2LCAzMiwgMCwgMTczLCAzMiwgMSwgMTczLCA2NiwgMzIsIDEzNCwgMTMyLCAzMiwgMiwgMTczLCAzMiwgMywgMTczLCA2NiwgMzIsIDEzNCwgMTMyLCAxMjgsIDM0LCA0LCA2NiwgMzIsIDEzNSwgMTY3LCAzNiwgMCwgMzIsIDQsIDE2NywgMTEsIDM2LCAxLCAxLCAxMjYsIDMyLCAwLCAxNzMsIDMyLCAxLCAxNzMsIDY2LCAzMiwgMTM0LCAxMzIsIDMyLCAyLCAxNzMsIDMyLCAzLCAxNzMsIDY2LCAzMiwgMTM0LCAxMzIsIDEyOSwgMzQsIDQsIDY2LCAzMiwgMTM1LCAxNjcsIDM2LCAwLCAzMiwgNCwgMTY3LCAxMSwgMzYsIDEsIDEsIDEyNiwgMzIsIDAsIDE3MywgMzIsIDEsIDE3MywgNjYsIDMyLCAxMzQsIDEzMiwgMzIsIDIsIDE3MywgMzIsIDMsIDE3MywgNjYsIDMyLCAxMzQsIDEzMiwgMTMwLCAzNCwgNCwgNjYsIDMyLCAxMzUsIDE2NywgMzYsIDAsIDMyLCA0LCAxNjcsIDExXHJcbiAgXSkpLCB7fSkuZXhwb3J0cztcclxufSBjYXRjaCAoZSkge1xyXG4gIC8vIG5vIHdhc20gc3VwcG9ydCA6KFxyXG59XHJcblxyXG4vKipcclxuICogQ29uc3RydWN0cyBhIDY0IGJpdCB0d28ncy1jb21wbGVtZW50IGludGVnZXIsIGdpdmVuIGl0cyBsb3cgYW5kIGhpZ2ggMzIgYml0IHZhbHVlcyBhcyAqc2lnbmVkKiBpbnRlZ2Vycy5cclxuICogIFNlZSB0aGUgZnJvbSogZnVuY3Rpb25zIGJlbG93IGZvciBtb3JlIGNvbnZlbmllbnQgd2F5cyBvZiBjb25zdHJ1Y3RpbmcgTG9uZ3MuXHJcbiAqIEBleHBvcnRzIExvbmdcclxuICogQGNsYXNzIEEgTG9uZyBjbGFzcyBmb3IgcmVwcmVzZW50aW5nIGEgNjQgYml0IHR3bydzLWNvbXBsZW1lbnQgaW50ZWdlciB2YWx1ZS5cclxuICogQHBhcmFtIHtudW1iZXJ9IGxvdyBUaGUgbG93IChzaWduZWQpIDMyIGJpdHMgb2YgdGhlIGxvbmdcclxuICogQHBhcmFtIHtudW1iZXJ9IGhpZ2ggVGhlIGhpZ2ggKHNpZ25lZCkgMzIgYml0cyBvZiB0aGUgbG9uZ1xyXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSB1bnNpZ25lZCBXaGV0aGVyIHVuc2lnbmVkIG9yIG5vdCwgZGVmYXVsdHMgdG8gc2lnbmVkXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gTG9uZyhsb3csIGhpZ2gsIHVuc2lnbmVkKSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbG93IDMyIGJpdHMgYXMgYSBzaWduZWQgdmFsdWUuXHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmxvdyA9IGxvdyB8IDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgaGlnaCAzMiBiaXRzIGFzIGEgc2lnbmVkIHZhbHVlLlxyXG4gICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5oaWdoID0gaGlnaCB8IDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIHVuc2lnbmVkIG9yIG5vdC5cclxuICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICB0aGlzLnVuc2lnbmVkID0gISF1bnNpZ25lZDtcclxufVxyXG5cclxuLy8gVGhlIGludGVybmFsIHJlcHJlc2VudGF0aW9uIG9mIGEgbG9uZyBpcyB0aGUgdHdvIGdpdmVuIHNpZ25lZCwgMzItYml0IHZhbHVlcy5cclxuLy8gV2UgdXNlIDMyLWJpdCBwaWVjZXMgYmVjYXVzZSB0aGVzZSBhcmUgdGhlIHNpemUgb2YgaW50ZWdlcnMgb24gd2hpY2hcclxuLy8gSmF2YXNjcmlwdCBwZXJmb3JtcyBiaXQtb3BlcmF0aW9ucy4gIEZvciBvcGVyYXRpb25zIGxpa2UgYWRkaXRpb24gYW5kXHJcbi8vIG11bHRpcGxpY2F0aW9uLCB3ZSBzcGxpdCBlYWNoIG51bWJlciBpbnRvIDE2IGJpdCBwaWVjZXMsIHdoaWNoIGNhbiBlYXNpbHkgYmVcclxuLy8gbXVsdGlwbGllZCB3aXRoaW4gSmF2YXNjcmlwdCdzIGZsb2F0aW5nLXBvaW50IHJlcHJlc2VudGF0aW9uIHdpdGhvdXQgb3ZlcmZsb3dcclxuLy8gb3IgY2hhbmdlIGluIHNpZ24uXHJcbi8vXHJcbi8vIEluIHRoZSBhbGdvcml0aG1zIGJlbG93LCB3ZSBmcmVxdWVudGx5IHJlZHVjZSB0aGUgbmVnYXRpdmUgY2FzZSB0byB0aGVcclxuLy8gcG9zaXRpdmUgY2FzZSBieSBuZWdhdGluZyB0aGUgaW5wdXQocykgYW5kIHRoZW4gcG9zdC1wcm9jZXNzaW5nIHRoZSByZXN1bHQuXHJcbi8vIE5vdGUgdGhhdCB3ZSBtdXN0IEFMV0FZUyBjaGVjayBzcGVjaWFsbHkgd2hldGhlciB0aG9zZSB2YWx1ZXMgYXJlIE1JTl9WQUxVRVxyXG4vLyAoLTJeNjMpIGJlY2F1c2UgLU1JTl9WQUxVRSA9PSBNSU5fVkFMVUUgKHNpbmNlIDJeNjMgY2Fubm90IGJlIHJlcHJlc2VudGVkIGFzXHJcbi8vIGEgcG9zaXRpdmUgbnVtYmVyLCBpdCBvdmVyZmxvd3MgYmFjayBpbnRvIGEgbmVnYXRpdmUpLiAgTm90IGhhbmRsaW5nIHRoaXNcclxuLy8gY2FzZSB3b3VsZCBvZnRlbiByZXN1bHQgaW4gaW5maW5pdGUgcmVjdXJzaW9uLlxyXG4vL1xyXG4vLyBDb21tb24gY29uc3RhbnQgdmFsdWVzIFpFUk8sIE9ORSwgTkVHX09ORSwgZXRjLiBhcmUgZGVmaW5lZCBiZWxvdyB0aGUgZnJvbSpcclxuLy8gbWV0aG9kcyBvbiB3aGljaCB0aGV5IGRlcGVuZC5cclxuXHJcbi8qKlxyXG4gKiBBbiBpbmRpY2F0b3IgdXNlZCB0byByZWxpYWJseSBkZXRlcm1pbmUgaWYgYW4gb2JqZWN0IGlzIGEgTG9uZyBvciBub3QuXHJcbiAqIEB0eXBlIHtib29sZWFufVxyXG4gKiBAY29uc3RcclxuICogQHByaXZhdGVcclxuICovXHJcbkxvbmcucHJvdG90eXBlLl9faXNMb25nX187XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoTG9uZy5wcm90b3R5cGUsIFwiX19pc0xvbmdfX1wiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5cclxuLyoqXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0geyp9IG9iaiBPYmplY3RcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqIEBpbm5lclxyXG4gKi9cclxuZnVuY3Rpb24gaXNMb25nKG9iaikge1xyXG4gICAgcmV0dXJuIChvYmogJiYgb2JqW1wiX19pc0xvbmdfX1wiXSkgPT09IHRydWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGUgc3BlY2lmaWVkIG9iamVjdCBpcyBhIExvbmcuXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0geyp9IG9iaiBPYmplY3RcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5Mb25nLmlzTG9uZyA9IGlzTG9uZztcclxuXHJcbi8qKlxyXG4gKiBBIGNhY2hlIG9mIHRoZSBMb25nIHJlcHJlc2VudGF0aW9ucyBvZiBzbWFsbCBpbnRlZ2VyIHZhbHVlcy5cclxuICogQHR5cGUgeyFPYmplY3R9XHJcbiAqIEBpbm5lclxyXG4gKi9cclxudmFyIElOVF9DQUNIRSA9IHt9O1xyXG5cclxuLyoqXHJcbiAqIEEgY2FjaGUgb2YgdGhlIExvbmcgcmVwcmVzZW50YXRpb25zIG9mIHNtYWxsIHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLlxyXG4gKiBAdHlwZSB7IU9iamVjdH1cclxuICogQGlubmVyXHJcbiAqL1xyXG52YXIgVUlOVF9DQUNIRSA9IHt9O1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZVxyXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSB1bnNpZ25lZFxyXG4gKiBAcmV0dXJucyB7IUxvbmd9XHJcbiAqIEBpbm5lclxyXG4gKi9cclxuZnVuY3Rpb24gZnJvbUludCh2YWx1ZSwgdW5zaWduZWQpIHtcclxuICAgIHZhciBvYmosIGNhY2hlZE9iaiwgY2FjaGU7XHJcbiAgICBpZiAodW5zaWduZWQpIHtcclxuICAgICAgICB2YWx1ZSA+Pj49IDA7XHJcbiAgICAgICAgaWYgKGNhY2hlID0gKDAgPD0gdmFsdWUgJiYgdmFsdWUgPCAyNTYpKSB7XHJcbiAgICAgICAgICAgIGNhY2hlZE9iaiA9IFVJTlRfQ0FDSEVbdmFsdWVdO1xyXG4gICAgICAgICAgICBpZiAoY2FjaGVkT2JqKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhY2hlZE9iajtcclxuICAgICAgICB9XHJcbiAgICAgICAgb2JqID0gZnJvbUJpdHModmFsdWUsICh2YWx1ZSB8IDApIDwgMCA/IC0xIDogMCwgdHJ1ZSk7XHJcbiAgICAgICAgaWYgKGNhY2hlKVxyXG4gICAgICAgICAgICBVSU5UX0NBQ0hFW3ZhbHVlXSA9IG9iajtcclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB2YWx1ZSB8PSAwO1xyXG4gICAgICAgIGlmIChjYWNoZSA9ICgtMTI4IDw9IHZhbHVlICYmIHZhbHVlIDwgMTI4KSkge1xyXG4gICAgICAgICAgICBjYWNoZWRPYmogPSBJTlRfQ0FDSEVbdmFsdWVdO1xyXG4gICAgICAgICAgICBpZiAoY2FjaGVkT2JqKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhY2hlZE9iajtcclxuICAgICAgICB9XHJcbiAgICAgICAgb2JqID0gZnJvbUJpdHModmFsdWUsIHZhbHVlIDwgMCA/IC0xIDogMCwgZmFsc2UpO1xyXG4gICAgICAgIGlmIChjYWNoZSlcclxuICAgICAgICAgICAgSU5UX0NBQ0hFW3ZhbHVlXSA9IG9iajtcclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyBhIExvbmcgcmVwcmVzZW50aW5nIHRoZSBnaXZlbiAzMiBiaXQgaW50ZWdlciB2YWx1ZS5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBUaGUgMzIgYml0IGludGVnZXIgaW4gcXVlc3Rpb25cclxuICogQHBhcmFtIHtib29sZWFuPX0gdW5zaWduZWQgV2hldGhlciB1bnNpZ25lZCBvciBub3QsIGRlZmF1bHRzIHRvIHNpZ25lZFxyXG4gKiBAcmV0dXJucyB7IUxvbmd9IFRoZSBjb3JyZXNwb25kaW5nIExvbmcgdmFsdWVcclxuICovXHJcbkxvbmcuZnJvbUludCA9IGZyb21JbnQ7XHJcblxyXG4vKipcclxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IHVuc2lnbmVkXHJcbiAqIEByZXR1cm5zIHshTG9uZ31cclxuICogQGlubmVyXHJcbiAqL1xyXG5mdW5jdGlvbiBmcm9tTnVtYmVyKHZhbHVlLCB1bnNpZ25lZCkge1xyXG4gICAgaWYgKGlzTmFOKHZhbHVlKSlcclxuICAgICAgICByZXR1cm4gdW5zaWduZWQgPyBVWkVSTyA6IFpFUk87XHJcbiAgICBpZiAodW5zaWduZWQpIHtcclxuICAgICAgICBpZiAodmFsdWUgPCAwKVxyXG4gICAgICAgICAgICByZXR1cm4gVVpFUk87XHJcbiAgICAgICAgaWYgKHZhbHVlID49IFRXT19QV1JfNjRfREJMKVxyXG4gICAgICAgICAgICByZXR1cm4gTUFYX1VOU0lHTkVEX1ZBTFVFO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAodmFsdWUgPD0gLVRXT19QV1JfNjNfREJMKVxyXG4gICAgICAgICAgICByZXR1cm4gTUlOX1ZBTFVFO1xyXG4gICAgICAgIGlmICh2YWx1ZSArIDEgPj0gVFdPX1BXUl82M19EQkwpXHJcbiAgICAgICAgICAgIHJldHVybiBNQVhfVkFMVUU7XHJcbiAgICB9XHJcbiAgICBpZiAodmFsdWUgPCAwKVxyXG4gICAgICAgIHJldHVybiBmcm9tTnVtYmVyKC12YWx1ZSwgdW5zaWduZWQpLm5lZygpO1xyXG4gICAgcmV0dXJuIGZyb21CaXRzKCh2YWx1ZSAlIFRXT19QV1JfMzJfREJMKSB8IDAsICh2YWx1ZSAvIFRXT19QV1JfMzJfREJMKSB8IDAsIHVuc2lnbmVkKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYSBMb25nIHJlcHJlc2VudGluZyB0aGUgZ2l2ZW4gdmFsdWUsIHByb3ZpZGVkIHRoYXQgaXQgaXMgYSBmaW5pdGUgbnVtYmVyLiBPdGhlcndpc2UsIHplcm8gaXMgcmV0dXJuZWQuXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVGhlIG51bWJlciBpbiBxdWVzdGlvblxyXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSB1bnNpZ25lZCBXaGV0aGVyIHVuc2lnbmVkIG9yIG5vdCwgZGVmYXVsdHMgdG8gc2lnbmVkXHJcbiAqIEByZXR1cm5zIHshTG9uZ30gVGhlIGNvcnJlc3BvbmRpbmcgTG9uZyB2YWx1ZVxyXG4gKi9cclxuTG9uZy5mcm9tTnVtYmVyID0gZnJvbU51bWJlcjtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge251bWJlcn0gbG93Qml0c1xyXG4gKiBAcGFyYW0ge251bWJlcn0gaGlnaEJpdHNcclxuICogQHBhcmFtIHtib29sZWFuPX0gdW5zaWduZWRcclxuICogQHJldHVybnMgeyFMb25nfVxyXG4gKiBAaW5uZXJcclxuICovXHJcbmZ1bmN0aW9uIGZyb21CaXRzKGxvd0JpdHMsIGhpZ2hCaXRzLCB1bnNpZ25lZCkge1xyXG4gICAgcmV0dXJuIG5ldyBMb25nKGxvd0JpdHMsIGhpZ2hCaXRzLCB1bnNpZ25lZCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGEgTG9uZyByZXByZXNlbnRpbmcgdGhlIDY0IGJpdCBpbnRlZ2VyIHRoYXQgY29tZXMgYnkgY29uY2F0ZW5hdGluZyB0aGUgZ2l2ZW4gbG93IGFuZCBoaWdoIGJpdHMuIEVhY2ggaXNcclxuICogIGFzc3VtZWQgdG8gdXNlIDMyIGJpdHMuXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge251bWJlcn0gbG93Qml0cyBUaGUgbG93IDMyIGJpdHNcclxuICogQHBhcmFtIHtudW1iZXJ9IGhpZ2hCaXRzIFRoZSBoaWdoIDMyIGJpdHNcclxuICogQHBhcmFtIHtib29sZWFuPX0gdW5zaWduZWQgV2hldGhlciB1bnNpZ25lZCBvciBub3QsIGRlZmF1bHRzIHRvIHNpZ25lZFxyXG4gKiBAcmV0dXJucyB7IUxvbmd9IFRoZSBjb3JyZXNwb25kaW5nIExvbmcgdmFsdWVcclxuICovXHJcbkxvbmcuZnJvbUJpdHMgPSBmcm9tQml0cztcclxuXHJcbi8qKlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtudW1iZXJ9IGJhc2VcclxuICogQHBhcmFtIHtudW1iZXJ9IGV4cG9uZW50XHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqIEBpbm5lclxyXG4gKi9cclxudmFyIHBvd19kYmwgPSBNYXRoLnBvdzsgLy8gVXNlZCA0IHRpbWVzICg0KjggdG8gMTUrNClcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXHJcbiAqIEBwYXJhbSB7KGJvb2xlYW58bnVtYmVyKT19IHVuc2lnbmVkXHJcbiAqIEBwYXJhbSB7bnVtYmVyPX0gcmFkaXhcclxuICogQHJldHVybnMgeyFMb25nfVxyXG4gKiBAaW5uZXJcclxuICovXHJcbmZ1bmN0aW9uIGZyb21TdHJpbmcoc3RyLCB1bnNpZ25lZCwgcmFkaXgpIHtcclxuICAgIGlmIChzdHIubGVuZ3RoID09PSAwKVxyXG4gICAgICAgIHRocm93IEVycm9yKCdlbXB0eSBzdHJpbmcnKTtcclxuICAgIGlmIChzdHIgPT09IFwiTmFOXCIgfHwgc3RyID09PSBcIkluZmluaXR5XCIgfHwgc3RyID09PSBcIitJbmZpbml0eVwiIHx8IHN0ciA9PT0gXCItSW5maW5pdHlcIilcclxuICAgICAgICByZXR1cm4gWkVSTztcclxuICAgIGlmICh0eXBlb2YgdW5zaWduZWQgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgLy8gRm9yIGdvb2cubWF0aC5sb25nIGNvbXBhdGliaWxpdHlcclxuICAgICAgICByYWRpeCA9IHVuc2lnbmVkLFxyXG4gICAgICAgIHVuc2lnbmVkID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHVuc2lnbmVkID0gISEgdW5zaWduZWQ7XHJcbiAgICB9XHJcbiAgICByYWRpeCA9IHJhZGl4IHx8IDEwO1xyXG4gICAgaWYgKHJhZGl4IDwgMiB8fCAzNiA8IHJhZGl4KVxyXG4gICAgICAgIHRocm93IFJhbmdlRXJyb3IoJ3JhZGl4Jyk7XHJcblxyXG4gICAgdmFyIHA7XHJcbiAgICBpZiAoKHAgPSBzdHIuaW5kZXhPZignLScpKSA+IDApXHJcbiAgICAgICAgdGhyb3cgRXJyb3IoJ2ludGVyaW9yIGh5cGhlbicpO1xyXG4gICAgZWxzZSBpZiAocCA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiBmcm9tU3RyaW5nKHN0ci5zdWJzdHJpbmcoMSksIHVuc2lnbmVkLCByYWRpeCkubmVnKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRG8gc2V2ZXJhbCAoOCkgZGlnaXRzIGVhY2ggdGltZSB0aHJvdWdoIHRoZSBsb29wLCBzbyBhcyB0b1xyXG4gICAgLy8gbWluaW1pemUgdGhlIGNhbGxzIHRvIHRoZSB2ZXJ5IGV4cGVuc2l2ZSBlbXVsYXRlZCBkaXYuXHJcbiAgICB2YXIgcmFkaXhUb1Bvd2VyID0gZnJvbU51bWJlcihwb3dfZGJsKHJhZGl4LCA4KSk7XHJcblxyXG4gICAgdmFyIHJlc3VsdCA9IFpFUk87XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkgKz0gOCkge1xyXG4gICAgICAgIHZhciBzaXplID0gTWF0aC5taW4oOCwgc3RyLmxlbmd0aCAtIGkpLFxyXG4gICAgICAgICAgICB2YWx1ZSA9IHBhcnNlSW50KHN0ci5zdWJzdHJpbmcoaSwgaSArIHNpemUpLCByYWRpeCk7XHJcbiAgICAgICAgaWYgKHNpemUgPCA4KSB7XHJcbiAgICAgICAgICAgIHZhciBwb3dlciA9IGZyb21OdW1iZXIocG93X2RibChyYWRpeCwgc2l6ZSkpO1xyXG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHQubXVsKHBvd2VyKS5hZGQoZnJvbU51bWJlcih2YWx1ZSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5tdWwocmFkaXhUb1Bvd2VyKTtcclxuICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmFkZChmcm9tTnVtYmVyKHZhbHVlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVzdWx0LnVuc2lnbmVkID0gdW5zaWduZWQ7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyBhIExvbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIGdpdmVuIHN0cmluZywgd3JpdHRlbiB1c2luZyB0aGUgc3BlY2lmaWVkIHJhZGl4LlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciBUaGUgdGV4dHVhbCByZXByZXNlbnRhdGlvbiBvZiB0aGUgTG9uZ1xyXG4gKiBAcGFyYW0geyhib29sZWFufG51bWJlcik9fSB1bnNpZ25lZCBXaGV0aGVyIHVuc2lnbmVkIG9yIG5vdCwgZGVmYXVsdHMgdG8gc2lnbmVkXHJcbiAqIEBwYXJhbSB7bnVtYmVyPX0gcmFkaXggVGhlIHJhZGl4IGluIHdoaWNoIHRoZSB0ZXh0IGlzIHdyaXR0ZW4gKDItMzYpLCBkZWZhdWx0cyB0byAxMFxyXG4gKiBAcmV0dXJucyB7IUxvbmd9IFRoZSBjb3JyZXNwb25kaW5nIExvbmcgdmFsdWVcclxuICovXHJcbkxvbmcuZnJvbVN0cmluZyA9IGZyb21TdHJpbmc7XHJcblxyXG4vKipcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ3whe2xvdzogbnVtYmVyLCBoaWdoOiBudW1iZXIsIHVuc2lnbmVkOiBib29sZWFufX0gdmFsXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IHVuc2lnbmVkXHJcbiAqIEByZXR1cm5zIHshTG9uZ31cclxuICogQGlubmVyXHJcbiAqL1xyXG5mdW5jdGlvbiBmcm9tVmFsdWUodmFsLCB1bnNpZ25lZCkge1xyXG4gICAgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKVxyXG4gICAgICAgIHJldHVybiBmcm9tTnVtYmVyKHZhbCwgdW5zaWduZWQpO1xyXG4gICAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKVxyXG4gICAgICAgIHJldHVybiBmcm9tU3RyaW5nKHZhbCwgdW5zaWduZWQpO1xyXG4gICAgLy8gVGhyb3dzIGZvciBub24tb2JqZWN0cywgY29udmVydHMgbm9uLWluc3RhbmNlb2YgTG9uZzpcclxuICAgIHJldHVybiBmcm9tQml0cyh2YWwubG93LCB2YWwuaGlnaCwgdHlwZW9mIHVuc2lnbmVkID09PSAnYm9vbGVhbicgPyB1bnNpZ25lZCA6IHZhbC51bnNpZ25lZCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyB0aGUgc3BlY2lmaWVkIHZhbHVlIHRvIGEgTG9uZyB1c2luZyB0aGUgYXBwcm9wcmlhdGUgZnJvbSogZnVuY3Rpb24gZm9yIGl0cyB0eXBlLlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfCF7bG93OiBudW1iZXIsIGhpZ2g6IG51bWJlciwgdW5zaWduZWQ6IGJvb2xlYW59fSB2YWwgVmFsdWVcclxuICogQHBhcmFtIHtib29sZWFuPX0gdW5zaWduZWQgV2hldGhlciB1bnNpZ25lZCBvciBub3QsIGRlZmF1bHRzIHRvIHNpZ25lZFxyXG4gKiBAcmV0dXJucyB7IUxvbmd9XHJcbiAqL1xyXG5Mb25nLmZyb21WYWx1ZSA9IGZyb21WYWx1ZTtcclxuXHJcbi8vIE5PVEU6IHRoZSBjb21waWxlciBzaG91bGQgaW5saW5lIHRoZXNlIGNvbnN0YW50IHZhbHVlcyBiZWxvdyBhbmQgdGhlbiByZW1vdmUgdGhlc2UgdmFyaWFibGVzLCBzbyB0aGVyZSBzaG91bGQgYmVcclxuLy8gbm8gcnVudGltZSBwZW5hbHR5IGZvciB0aGVzZS5cclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7bnVtYmVyfVxyXG4gKiBAY29uc3RcclxuICogQGlubmVyXHJcbiAqL1xyXG52YXIgVFdPX1BXUl8xNl9EQkwgPSAxIDw8IDE2O1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHtudW1iZXJ9XHJcbiAqIEBjb25zdFxyXG4gKiBAaW5uZXJcclxuICovXHJcbnZhciBUV09fUFdSXzI0X0RCTCA9IDEgPDwgMjQ7XHJcblxyXG4vKipcclxuICogQHR5cGUge251bWJlcn1cclxuICogQGNvbnN0XHJcbiAqIEBpbm5lclxyXG4gKi9cclxudmFyIFRXT19QV1JfMzJfREJMID0gVFdPX1BXUl8xNl9EQkwgKiBUV09fUFdSXzE2X0RCTDtcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7bnVtYmVyfVxyXG4gKiBAY29uc3RcclxuICogQGlubmVyXHJcbiAqL1xyXG52YXIgVFdPX1BXUl82NF9EQkwgPSBUV09fUFdSXzMyX0RCTCAqIFRXT19QV1JfMzJfREJMO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHtudW1iZXJ9XHJcbiAqIEBjb25zdFxyXG4gKiBAaW5uZXJcclxuICovXHJcbnZhciBUV09fUFdSXzYzX0RCTCA9IFRXT19QV1JfNjRfREJMIC8gMjtcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7IUxvbmd9XHJcbiAqIEBjb25zdFxyXG4gKiBAaW5uZXJcclxuICovXHJcbnZhciBUV09fUFdSXzI0ID0gZnJvbUludChUV09fUFdSXzI0X0RCTCk7XHJcblxyXG4vKipcclxuICogQHR5cGUgeyFMb25nfVxyXG4gKiBAaW5uZXJcclxuICovXHJcbnZhciBaRVJPID0gZnJvbUludCgwKTtcclxuXHJcbi8qKlxyXG4gKiBTaWduZWQgemVyby5cclxuICogQHR5cGUgeyFMb25nfVxyXG4gKi9cclxuTG9uZy5aRVJPID0gWkVSTztcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7IUxvbmd9XHJcbiAqIEBpbm5lclxyXG4gKi9cclxudmFyIFVaRVJPID0gZnJvbUludCgwLCB0cnVlKTtcclxuXHJcbi8qKlxyXG4gKiBVbnNpZ25lZCB6ZXJvLlxyXG4gKiBAdHlwZSB7IUxvbmd9XHJcbiAqL1xyXG5Mb25nLlVaRVJPID0gVVpFUk87XHJcblxyXG4vKipcclxuICogQHR5cGUgeyFMb25nfVxyXG4gKiBAaW5uZXJcclxuICovXHJcbnZhciBPTkUgPSBmcm9tSW50KDEpO1xyXG5cclxuLyoqXHJcbiAqIFNpZ25lZCBvbmUuXHJcbiAqIEB0eXBlIHshTG9uZ31cclxuICovXHJcbkxvbmcuT05FID0gT05FO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHshTG9uZ31cclxuICogQGlubmVyXHJcbiAqL1xyXG52YXIgVU9ORSA9IGZyb21JbnQoMSwgdHJ1ZSk7XHJcblxyXG4vKipcclxuICogVW5zaWduZWQgb25lLlxyXG4gKiBAdHlwZSB7IUxvbmd9XHJcbiAqL1xyXG5Mb25nLlVPTkUgPSBVT05FO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHshTG9uZ31cclxuICogQGlubmVyXHJcbiAqL1xyXG52YXIgTkVHX09ORSA9IGZyb21JbnQoLTEpO1xyXG5cclxuLyoqXHJcbiAqIFNpZ25lZCBuZWdhdGl2ZSBvbmUuXHJcbiAqIEB0eXBlIHshTG9uZ31cclxuICovXHJcbkxvbmcuTkVHX09ORSA9IE5FR19PTkU7XHJcblxyXG4vKipcclxuICogQHR5cGUgeyFMb25nfVxyXG4gKiBAaW5uZXJcclxuICovXHJcbnZhciBNQVhfVkFMVUUgPSBmcm9tQml0cygweEZGRkZGRkZGfDAsIDB4N0ZGRkZGRkZ8MCwgZmFsc2UpO1xyXG5cclxuLyoqXHJcbiAqIE1heGltdW0gc2lnbmVkIHZhbHVlLlxyXG4gKiBAdHlwZSB7IUxvbmd9XHJcbiAqL1xyXG5Mb25nLk1BWF9WQUxVRSA9IE1BWF9WQUxVRTtcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7IUxvbmd9XHJcbiAqIEBpbm5lclxyXG4gKi9cclxudmFyIE1BWF9VTlNJR05FRF9WQUxVRSA9IGZyb21CaXRzKDB4RkZGRkZGRkZ8MCwgMHhGRkZGRkZGRnwwLCB0cnVlKTtcclxuXHJcbi8qKlxyXG4gKiBNYXhpbXVtIHVuc2lnbmVkIHZhbHVlLlxyXG4gKiBAdHlwZSB7IUxvbmd9XHJcbiAqL1xyXG5Mb25nLk1BWF9VTlNJR05FRF9WQUxVRSA9IE1BWF9VTlNJR05FRF9WQUxVRTtcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7IUxvbmd9XHJcbiAqIEBpbm5lclxyXG4gKi9cclxudmFyIE1JTl9WQUxVRSA9IGZyb21CaXRzKDAsIDB4ODAwMDAwMDB8MCwgZmFsc2UpO1xyXG5cclxuLyoqXHJcbiAqIE1pbmltdW0gc2lnbmVkIHZhbHVlLlxyXG4gKiBAdHlwZSB7IUxvbmd9XHJcbiAqL1xyXG5Mb25nLk1JTl9WQUxVRSA9IE1JTl9WQUxVRTtcclxuXHJcbi8qKlxyXG4gKiBAYWxpYXMgTG9uZy5wcm90b3R5cGVcclxuICogQGlubmVyXHJcbiAqL1xyXG52YXIgTG9uZ1Byb3RvdHlwZSA9IExvbmcucHJvdG90eXBlO1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIHRoZSBMb25nIHRvIGEgMzIgYml0IGludGVnZXIsIGFzc3VtaW5nIGl0IGlzIGEgMzIgYml0IGludGVnZXIuXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLnRvSW50ID0gZnVuY3Rpb24gdG9JbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy51bnNpZ25lZCA/IHRoaXMubG93ID4+PiAwIDogdGhpcy5sb3c7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29udmVydHMgdGhlIExvbmcgdG8gYSB0aGUgbmVhcmVzdCBmbG9hdGluZy1wb2ludCByZXByZXNlbnRhdGlvbiBvZiB0aGlzIHZhbHVlIChkb3VibGUsIDUzIGJpdCBtYW50aXNzYSkuXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLnRvTnVtYmVyID0gZnVuY3Rpb24gdG9OdW1iZXIoKSB7XHJcbiAgICBpZiAodGhpcy51bnNpZ25lZClcclxuICAgICAgICByZXR1cm4gKCh0aGlzLmhpZ2ggPj4+IDApICogVFdPX1BXUl8zMl9EQkwpICsgKHRoaXMubG93ID4+PiAwKTtcclxuICAgIHJldHVybiB0aGlzLmhpZ2ggKiBUV09fUFdSXzMyX0RCTCArICh0aGlzLmxvdyA+Pj4gMCk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29udmVydHMgdGhlIExvbmcgdG8gYSBzdHJpbmcgd3JpdHRlbiBpbiB0aGUgc3BlY2lmaWVkIHJhZGl4LlxyXG4gKiBAcGFyYW0ge251bWJlcj19IHJhZGl4IFJhZGl4ICgyLTM2KSwgZGVmYXVsdHMgdG8gMTBcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICogQG92ZXJyaWRlXHJcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IElmIGByYWRpeGAgaXMgb3V0IG9mIHJhbmdlXHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcocmFkaXgpIHtcclxuICAgIHJhZGl4ID0gcmFkaXggfHwgMTA7XHJcbiAgICBpZiAocmFkaXggPCAyIHx8IDM2IDwgcmFkaXgpXHJcbiAgICAgICAgdGhyb3cgUmFuZ2VFcnJvcigncmFkaXgnKTtcclxuICAgIGlmICh0aGlzLmlzWmVybygpKVxyXG4gICAgICAgIHJldHVybiAnMCc7XHJcbiAgICBpZiAodGhpcy5pc05lZ2F0aXZlKCkpIHsgLy8gVW5zaWduZWQgTG9uZ3MgYXJlIG5ldmVyIG5lZ2F0aXZlXHJcbiAgICAgICAgaWYgKHRoaXMuZXEoTUlOX1ZBTFVFKSkge1xyXG4gICAgICAgICAgICAvLyBXZSBuZWVkIHRvIGNoYW5nZSB0aGUgTG9uZyB2YWx1ZSBiZWZvcmUgaXQgY2FuIGJlIG5lZ2F0ZWQsIHNvIHdlIHJlbW92ZVxyXG4gICAgICAgICAgICAvLyB0aGUgYm90dG9tLW1vc3QgZGlnaXQgaW4gdGhpcyBiYXNlIGFuZCB0aGVuIHJlY3Vyc2UgdG8gZG8gdGhlIHJlc3QuXHJcbiAgICAgICAgICAgIHZhciByYWRpeExvbmcgPSBmcm9tTnVtYmVyKHJhZGl4KSxcclxuICAgICAgICAgICAgICAgIGRpdiA9IHRoaXMuZGl2KHJhZGl4TG9uZyksXHJcbiAgICAgICAgICAgICAgICByZW0xID0gZGl2Lm11bChyYWRpeExvbmcpLnN1Yih0aGlzKTtcclxuICAgICAgICAgICAgcmV0dXJuIGRpdi50b1N0cmluZyhyYWRpeCkgKyByZW0xLnRvSW50KCkudG9TdHJpbmcocmFkaXgpO1xyXG4gICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gJy0nICsgdGhpcy5uZWcoKS50b1N0cmluZyhyYWRpeCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRG8gc2V2ZXJhbCAoNikgZGlnaXRzIGVhY2ggdGltZSB0aHJvdWdoIHRoZSBsb29wLCBzbyBhcyB0b1xyXG4gICAgLy8gbWluaW1pemUgdGhlIGNhbGxzIHRvIHRoZSB2ZXJ5IGV4cGVuc2l2ZSBlbXVsYXRlZCBkaXYuXHJcbiAgICB2YXIgcmFkaXhUb1Bvd2VyID0gZnJvbU51bWJlcihwb3dfZGJsKHJhZGl4LCA2KSwgdGhpcy51bnNpZ25lZCksXHJcbiAgICAgICAgcmVtID0gdGhpcztcclxuICAgIHZhciByZXN1bHQgPSAnJztcclxuICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgdmFyIHJlbURpdiA9IHJlbS5kaXYocmFkaXhUb1Bvd2VyKSxcclxuICAgICAgICAgICAgaW50dmFsID0gcmVtLnN1YihyZW1EaXYubXVsKHJhZGl4VG9Qb3dlcikpLnRvSW50KCkgPj4+IDAsXHJcbiAgICAgICAgICAgIGRpZ2l0cyA9IGludHZhbC50b1N0cmluZyhyYWRpeCk7XHJcbiAgICAgICAgcmVtID0gcmVtRGl2O1xyXG4gICAgICAgIGlmIChyZW0uaXNaZXJvKCkpXHJcbiAgICAgICAgICAgIHJldHVybiBkaWdpdHMgKyByZXN1bHQ7XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHdoaWxlIChkaWdpdHMubGVuZ3RoIDwgNilcclxuICAgICAgICAgICAgICAgIGRpZ2l0cyA9ICcwJyArIGRpZ2l0cztcclxuICAgICAgICAgICAgcmVzdWx0ID0gJycgKyBkaWdpdHMgKyByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIGhpZ2ggMzIgYml0cyBhcyBhIHNpZ25lZCBpbnRlZ2VyLlxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBTaWduZWQgaGlnaCBiaXRzXHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmdldEhpZ2hCaXRzID0gZnVuY3Rpb24gZ2V0SGlnaEJpdHMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5oaWdoO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIGhpZ2ggMzIgYml0cyBhcyBhbiB1bnNpZ25lZCBpbnRlZ2VyLlxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBVbnNpZ25lZCBoaWdoIGJpdHNcclxuICovXHJcbkxvbmdQcm90b3R5cGUuZ2V0SGlnaEJpdHNVbnNpZ25lZCA9IGZ1bmN0aW9uIGdldEhpZ2hCaXRzVW5zaWduZWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5oaWdoID4+PiAwO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIGxvdyAzMiBiaXRzIGFzIGEgc2lnbmVkIGludGVnZXIuXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFNpZ25lZCBsb3cgYml0c1xyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5nZXRMb3dCaXRzID0gZnVuY3Rpb24gZ2V0TG93Qml0cygpIHtcclxuICAgIHJldHVybiB0aGlzLmxvdztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBsb3cgMzIgYml0cyBhcyBhbiB1bnNpZ25lZCBpbnRlZ2VyLlxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBVbnNpZ25lZCBsb3cgYml0c1xyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5nZXRMb3dCaXRzVW5zaWduZWQgPSBmdW5jdGlvbiBnZXRMb3dCaXRzVW5zaWduZWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sb3cgPj4+IDA7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgbnVtYmVyIG9mIGJpdHMgbmVlZGVkIHRvIHJlcHJlc2VudCB0aGUgYWJzb2x1dGUgdmFsdWUgb2YgdGhpcyBMb25nLlxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5nZXROdW1CaXRzQWJzID0gZnVuY3Rpb24gZ2V0TnVtQml0c0FicygpIHtcclxuICAgIGlmICh0aGlzLmlzTmVnYXRpdmUoKSkgLy8gVW5zaWduZWQgTG9uZ3MgYXJlIG5ldmVyIG5lZ2F0aXZlXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXEoTUlOX1ZBTFVFKSA/IDY0IDogdGhpcy5uZWcoKS5nZXROdW1CaXRzQWJzKCk7XHJcbiAgICB2YXIgdmFsID0gdGhpcy5oaWdoICE9IDAgPyB0aGlzLmhpZ2ggOiB0aGlzLmxvdztcclxuICAgIGZvciAodmFyIGJpdCA9IDMxOyBiaXQgPiAwOyBiaXQtLSlcclxuICAgICAgICBpZiAoKHZhbCAmICgxIDw8IGJpdCkpICE9IDApXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgcmV0dXJuIHRoaXMuaGlnaCAhPSAwID8gYml0ICsgMzMgOiBiaXQgKyAxO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoaXMgTG9uZydzIHZhbHVlIGVxdWFscyB6ZXJvLlxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbkxvbmdQcm90b3R5cGUuaXNaZXJvID0gZnVuY3Rpb24gaXNaZXJvKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaGlnaCA9PT0gMCAmJiB0aGlzLmxvdyA9PT0gMDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGlzIExvbmcncyB2YWx1ZSBlcXVhbHMgemVyby4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgTG9uZyNpc1plcm99LlxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbkxvbmdQcm90b3R5cGUuZXF6ID0gTG9uZ1Byb3RvdHlwZS5pc1plcm87XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhpcyBMb25nJ3MgdmFsdWUgaXMgbmVnYXRpdmUuXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5pc05lZ2F0aXZlID0gZnVuY3Rpb24gaXNOZWdhdGl2ZSgpIHtcclxuICAgIHJldHVybiAhdGhpcy51bnNpZ25lZCAmJiB0aGlzLmhpZ2ggPCAwO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoaXMgTG9uZydzIHZhbHVlIGlzIHBvc2l0aXZlLlxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbkxvbmdQcm90b3R5cGUuaXNQb3NpdGl2ZSA9IGZ1bmN0aW9uIGlzUG9zaXRpdmUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy51bnNpZ25lZCB8fCB0aGlzLmhpZ2ggPj0gMDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGlzIExvbmcncyB2YWx1ZSBpcyBvZGQuXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5pc09kZCA9IGZ1bmN0aW9uIGlzT2RkKCkge1xyXG4gICAgcmV0dXJuICh0aGlzLmxvdyAmIDEpID09PSAxO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoaXMgTG9uZydzIHZhbHVlIGlzIGV2ZW4uXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5pc0V2ZW4gPSBmdW5jdGlvbiBpc0V2ZW4oKSB7XHJcbiAgICByZXR1cm4gKHRoaXMubG93ICYgMSkgPT09IDA7XHJcbn07XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhpcyBMb25nJ3MgdmFsdWUgZXF1YWxzIHRoZSBzcGVjaWZpZWQncy5cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBvdGhlciBPdGhlciB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbkxvbmdQcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gZXF1YWxzKG90aGVyKSB7XHJcbiAgICBpZiAoIWlzTG9uZyhvdGhlcikpXHJcbiAgICAgICAgb3RoZXIgPSBmcm9tVmFsdWUob3RoZXIpO1xyXG4gICAgaWYgKHRoaXMudW5zaWduZWQgIT09IG90aGVyLnVuc2lnbmVkICYmICh0aGlzLmhpZ2ggPj4+IDMxKSA9PT0gMSAmJiAob3RoZXIuaGlnaCA+Pj4gMzEpID09PSAxKVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIHJldHVybiB0aGlzLmhpZ2ggPT09IG90aGVyLmhpZ2ggJiYgdGhpcy5sb3cgPT09IG90aGVyLmxvdztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGlzIExvbmcncyB2YWx1ZSBlcXVhbHMgdGhlIHNwZWNpZmllZCdzLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI2VxdWFsc30uXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIHZhbHVlXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5lcSA9IExvbmdQcm90b3R5cGUuZXF1YWxzO1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoaXMgTG9uZydzIHZhbHVlIGRpZmZlcnMgZnJvbSB0aGUgc3BlY2lmaWVkJ3MuXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gb3RoZXIgT3RoZXIgdmFsdWVcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLm5vdEVxdWFscyA9IGZ1bmN0aW9uIG5vdEVxdWFscyhvdGhlcikge1xyXG4gICAgcmV0dXJuICF0aGlzLmVxKC8qIHZhbGlkYXRlcyAqLyBvdGhlcik7XHJcbn07XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhpcyBMb25nJ3MgdmFsdWUgZGlmZmVycyBmcm9tIHRoZSBzcGVjaWZpZWQncy4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgTG9uZyNub3RFcXVhbHN9LlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBvdGhlciBPdGhlciB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbkxvbmdQcm90b3R5cGUubmVxID0gTG9uZ1Byb3RvdHlwZS5ub3RFcXVhbHM7XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhpcyBMb25nJ3MgdmFsdWUgZGlmZmVycyBmcm9tIHRoZSBzcGVjaWZpZWQncy4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgTG9uZyNub3RFcXVhbHN9LlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBvdGhlciBPdGhlciB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbkxvbmdQcm90b3R5cGUubmUgPSBMb25nUHJvdG90eXBlLm5vdEVxdWFscztcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGlzIExvbmcncyB2YWx1ZSBpcyBsZXNzIHRoYW4gdGhlIHNwZWNpZmllZCdzLlxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIHZhbHVlXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5sZXNzVGhhbiA9IGZ1bmN0aW9uIGxlc3NUaGFuKG90aGVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb21wKC8qIHZhbGlkYXRlcyAqLyBvdGhlcikgPCAwO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoaXMgTG9uZydzIHZhbHVlIGlzIGxlc3MgdGhhbiB0aGUgc3BlY2lmaWVkJ3MuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIExvbmcjbGVzc1RoYW59LlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBvdGhlciBPdGhlciB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbkxvbmdQcm90b3R5cGUubHQgPSBMb25nUHJvdG90eXBlLmxlc3NUaGFuO1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoaXMgTG9uZydzIHZhbHVlIGlzIGxlc3MgdGhhbiBvciBlcXVhbCB0aGUgc3BlY2lmaWVkJ3MuXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gb3RoZXIgT3RoZXIgdmFsdWVcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmxlc3NUaGFuT3JFcXVhbCA9IGZ1bmN0aW9uIGxlc3NUaGFuT3JFcXVhbChvdGhlcikge1xyXG4gICAgcmV0dXJuIHRoaXMuY29tcCgvKiB2YWxpZGF0ZXMgKi8gb3RoZXIpIDw9IDA7XHJcbn07XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhpcyBMb25nJ3MgdmFsdWUgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRoZSBzcGVjaWZpZWQncy4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgTG9uZyNsZXNzVGhhbk9yRXF1YWx9LlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBvdGhlciBPdGhlciB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbkxvbmdQcm90b3R5cGUubHRlID0gTG9uZ1Byb3RvdHlwZS5sZXNzVGhhbk9yRXF1YWw7XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhpcyBMb25nJ3MgdmFsdWUgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRoZSBzcGVjaWZpZWQncy4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgTG9uZyNsZXNzVGhhbk9yRXF1YWx9LlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBvdGhlciBPdGhlciB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbkxvbmdQcm90b3R5cGUubGUgPSBMb25nUHJvdG90eXBlLmxlc3NUaGFuT3JFcXVhbDtcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGlzIExvbmcncyB2YWx1ZSBpcyBncmVhdGVyIHRoYW4gdGhlIHNwZWNpZmllZCdzLlxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIHZhbHVlXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5ncmVhdGVyVGhhbiA9IGZ1bmN0aW9uIGdyZWF0ZXJUaGFuKG90aGVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb21wKC8qIHZhbGlkYXRlcyAqLyBvdGhlcikgPiAwO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoaXMgTG9uZydzIHZhbHVlIGlzIGdyZWF0ZXIgdGhhbiB0aGUgc3BlY2lmaWVkJ3MuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIExvbmcjZ3JlYXRlclRoYW59LlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBvdGhlciBPdGhlciB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbkxvbmdQcm90b3R5cGUuZ3QgPSBMb25nUHJvdG90eXBlLmdyZWF0ZXJUaGFuO1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoaXMgTG9uZydzIHZhbHVlIGlzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0aGUgc3BlY2lmaWVkJ3MuXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gb3RoZXIgT3RoZXIgdmFsdWVcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmdyZWF0ZXJUaGFuT3JFcXVhbCA9IGZ1bmN0aW9uIGdyZWF0ZXJUaGFuT3JFcXVhbChvdGhlcikge1xyXG4gICAgcmV0dXJuIHRoaXMuY29tcCgvKiB2YWxpZGF0ZXMgKi8gb3RoZXIpID49IDA7XHJcbn07XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhpcyBMb25nJ3MgdmFsdWUgaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRoZSBzcGVjaWZpZWQncy4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgTG9uZyNncmVhdGVyVGhhbk9yRXF1YWx9LlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBvdGhlciBPdGhlciB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbkxvbmdQcm90b3R5cGUuZ3RlID0gTG9uZ1Byb3RvdHlwZS5ncmVhdGVyVGhhbk9yRXF1YWw7XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhpcyBMb25nJ3MgdmFsdWUgaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRoZSBzcGVjaWZpZWQncy4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgTG9uZyNncmVhdGVyVGhhbk9yRXF1YWx9LlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBvdGhlciBPdGhlciB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbkxvbmdQcm90b3R5cGUuZ2UgPSBMb25nUHJvdG90eXBlLmdyZWF0ZXJUaGFuT3JFcXVhbDtcclxuXHJcbi8qKlxyXG4gKiBDb21wYXJlcyB0aGlzIExvbmcncyB2YWx1ZSB3aXRoIHRoZSBzcGVjaWZpZWQncy5cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBvdGhlciBPdGhlciB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAwIGlmIHRoZXkgYXJlIHRoZSBzYW1lLCAxIGlmIHRoZSB0aGlzIGlzIGdyZWF0ZXIgYW5kIC0xXHJcbiAqICBpZiB0aGUgZ2l2ZW4gb25lIGlzIGdyZWF0ZXJcclxuICovXHJcbkxvbmdQcm90b3R5cGUuY29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBhcmUob3RoZXIpIHtcclxuICAgIGlmICghaXNMb25nKG90aGVyKSlcclxuICAgICAgICBvdGhlciA9IGZyb21WYWx1ZShvdGhlcik7XHJcbiAgICBpZiAodGhpcy5lcShvdGhlcikpXHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB2YXIgdGhpc05lZyA9IHRoaXMuaXNOZWdhdGl2ZSgpLFxyXG4gICAgICAgIG90aGVyTmVnID0gb3RoZXIuaXNOZWdhdGl2ZSgpO1xyXG4gICAgaWYgKHRoaXNOZWcgJiYgIW90aGVyTmVnKVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIGlmICghdGhpc05lZyAmJiBvdGhlck5lZylcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIC8vIEF0IHRoaXMgcG9pbnQgdGhlIHNpZ24gYml0cyBhcmUgdGhlIHNhbWVcclxuICAgIGlmICghdGhpcy51bnNpZ25lZClcclxuICAgICAgICByZXR1cm4gdGhpcy5zdWIob3RoZXIpLmlzTmVnYXRpdmUoKSA/IC0xIDogMTtcclxuICAgIC8vIEJvdGggYXJlIHBvc2l0aXZlIGlmIGF0IGxlYXN0IG9uZSBpcyB1bnNpZ25lZFxyXG4gICAgcmV0dXJuIChvdGhlci5oaWdoID4+PiAwKSA+ICh0aGlzLmhpZ2ggPj4+IDApIHx8IChvdGhlci5oaWdoID09PSB0aGlzLmhpZ2ggJiYgKG90aGVyLmxvdyA+Pj4gMCkgPiAodGhpcy5sb3cgPj4+IDApKSA/IC0xIDogMTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb21wYXJlcyB0aGlzIExvbmcncyB2YWx1ZSB3aXRoIHRoZSBzcGVjaWZpZWQncy4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgTG9uZyNjb21wYXJlfS5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gb3RoZXIgT3RoZXIgdmFsdWVcclxuICogQHJldHVybnMge251bWJlcn0gMCBpZiB0aGV5IGFyZSB0aGUgc2FtZSwgMSBpZiB0aGUgdGhpcyBpcyBncmVhdGVyIGFuZCAtMVxyXG4gKiAgaWYgdGhlIGdpdmVuIG9uZSBpcyBncmVhdGVyXHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmNvbXAgPSBMb25nUHJvdG90eXBlLmNvbXBhcmU7XHJcblxyXG4vKipcclxuICogTmVnYXRlcyB0aGlzIExvbmcncyB2YWx1ZS5cclxuICogQHJldHVybnMgeyFMb25nfSBOZWdhdGVkIExvbmdcclxuICovXHJcbkxvbmdQcm90b3R5cGUubmVnYXRlID0gZnVuY3Rpb24gbmVnYXRlKCkge1xyXG4gICAgaWYgKCF0aGlzLnVuc2lnbmVkICYmIHRoaXMuZXEoTUlOX1ZBTFVFKSlcclxuICAgICAgICByZXR1cm4gTUlOX1ZBTFVFO1xyXG4gICAgcmV0dXJuIHRoaXMubm90KCkuYWRkKE9ORSk7XHJcbn07XHJcblxyXG4vKipcclxuICogTmVnYXRlcyB0aGlzIExvbmcncyB2YWx1ZS4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgTG9uZyNuZWdhdGV9LlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHJldHVybnMgeyFMb25nfSBOZWdhdGVkIExvbmdcclxuICovXHJcbkxvbmdQcm90b3R5cGUubmVnID0gTG9uZ1Byb3RvdHlwZS5uZWdhdGU7XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgc3VtIG9mIHRoaXMgYW5kIHRoZSBzcGVjaWZpZWQgTG9uZy5cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBhZGRlbmQgQWRkZW5kXHJcbiAqIEByZXR1cm5zIHshTG9uZ30gU3VtXHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIGFkZChhZGRlbmQpIHtcclxuICAgIGlmICghaXNMb25nKGFkZGVuZCkpXHJcbiAgICAgICAgYWRkZW5kID0gZnJvbVZhbHVlKGFkZGVuZCk7XHJcblxyXG4gICAgLy8gRGl2aWRlIGVhY2ggbnVtYmVyIGludG8gNCBjaHVua3Mgb2YgMTYgYml0cywgYW5kIHRoZW4gc3VtIHRoZSBjaHVua3MuXHJcblxyXG4gICAgdmFyIGE0OCA9IHRoaXMuaGlnaCA+Pj4gMTY7XHJcbiAgICB2YXIgYTMyID0gdGhpcy5oaWdoICYgMHhGRkZGO1xyXG4gICAgdmFyIGExNiA9IHRoaXMubG93ID4+PiAxNjtcclxuICAgIHZhciBhMDAgPSB0aGlzLmxvdyAmIDB4RkZGRjtcclxuXHJcbiAgICB2YXIgYjQ4ID0gYWRkZW5kLmhpZ2ggPj4+IDE2O1xyXG4gICAgdmFyIGIzMiA9IGFkZGVuZC5oaWdoICYgMHhGRkZGO1xyXG4gICAgdmFyIGIxNiA9IGFkZGVuZC5sb3cgPj4+IDE2O1xyXG4gICAgdmFyIGIwMCA9IGFkZGVuZC5sb3cgJiAweEZGRkY7XHJcblxyXG4gICAgdmFyIGM0OCA9IDAsIGMzMiA9IDAsIGMxNiA9IDAsIGMwMCA9IDA7XHJcbiAgICBjMDAgKz0gYTAwICsgYjAwO1xyXG4gICAgYzE2ICs9IGMwMCA+Pj4gMTY7XHJcbiAgICBjMDAgJj0gMHhGRkZGO1xyXG4gICAgYzE2ICs9IGExNiArIGIxNjtcclxuICAgIGMzMiArPSBjMTYgPj4+IDE2O1xyXG4gICAgYzE2ICY9IDB4RkZGRjtcclxuICAgIGMzMiArPSBhMzIgKyBiMzI7XHJcbiAgICBjNDggKz0gYzMyID4+PiAxNjtcclxuICAgIGMzMiAmPSAweEZGRkY7XHJcbiAgICBjNDggKz0gYTQ4ICsgYjQ4O1xyXG4gICAgYzQ4ICY9IDB4RkZGRjtcclxuICAgIHJldHVybiBmcm9tQml0cygoYzE2IDw8IDE2KSB8IGMwMCwgKGM0OCA8PCAxNikgfCBjMzIsIHRoaXMudW5zaWduZWQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGRpZmZlcmVuY2Ugb2YgdGhpcyBhbmQgdGhlIHNwZWNpZmllZCBMb25nLlxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IHN1YnRyYWhlbmQgU3VidHJhaGVuZFxyXG4gKiBAcmV0dXJucyB7IUxvbmd9IERpZmZlcmVuY2VcclxuICovXHJcbkxvbmdQcm90b3R5cGUuc3VidHJhY3QgPSBmdW5jdGlvbiBzdWJ0cmFjdChzdWJ0cmFoZW5kKSB7XHJcbiAgICBpZiAoIWlzTG9uZyhzdWJ0cmFoZW5kKSlcclxuICAgICAgICBzdWJ0cmFoZW5kID0gZnJvbVZhbHVlKHN1YnRyYWhlbmQpO1xyXG4gICAgcmV0dXJuIHRoaXMuYWRkKHN1YnRyYWhlbmQubmVnKCkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGRpZmZlcmVuY2Ugb2YgdGhpcyBhbmQgdGhlIHNwZWNpZmllZCBMb25nLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI3N1YnRyYWN0fS5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gc3VidHJhaGVuZCBTdWJ0cmFoZW5kXHJcbiAqIEByZXR1cm5zIHshTG9uZ30gRGlmZmVyZW5jZVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5zdWIgPSBMb25nUHJvdG90eXBlLnN1YnRyYWN0O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIHByb2R1Y3Qgb2YgdGhpcyBhbmQgdGhlIHNwZWNpZmllZCBMb25nLlxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG11bHRpcGxpZXIgTXVsdGlwbGllclxyXG4gKiBAcmV0dXJucyB7IUxvbmd9IFByb2R1Y3RcclxuICovXHJcbkxvbmdQcm90b3R5cGUubXVsdGlwbHkgPSBmdW5jdGlvbiBtdWx0aXBseShtdWx0aXBsaWVyKSB7XHJcbiAgICBpZiAodGhpcy5pc1plcm8oKSlcclxuICAgICAgICByZXR1cm4gWkVSTztcclxuICAgIGlmICghaXNMb25nKG11bHRpcGxpZXIpKVxyXG4gICAgICAgIG11bHRpcGxpZXIgPSBmcm9tVmFsdWUobXVsdGlwbGllcik7XHJcblxyXG4gICAgLy8gdXNlIHdhc20gc3VwcG9ydCBpZiBwcmVzZW50XHJcbiAgICBpZiAod2FzbSkge1xyXG4gICAgICAgIHZhciBsb3cgPSB3YXNtLm11bCh0aGlzLmxvdyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWdoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBtdWx0aXBsaWVyLmxvdyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGlwbGllci5oaWdoKTtcclxuICAgICAgICByZXR1cm4gZnJvbUJpdHMobG93LCB3YXNtLmdldF9oaWdoKCksIHRoaXMudW5zaWduZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChtdWx0aXBsaWVyLmlzWmVybygpKVxyXG4gICAgICAgIHJldHVybiBaRVJPO1xyXG4gICAgaWYgKHRoaXMuZXEoTUlOX1ZBTFVFKSlcclxuICAgICAgICByZXR1cm4gbXVsdGlwbGllci5pc09kZCgpID8gTUlOX1ZBTFVFIDogWkVSTztcclxuICAgIGlmIChtdWx0aXBsaWVyLmVxKE1JTl9WQUxVRSkpXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNPZGQoKSA/IE1JTl9WQUxVRSA6IFpFUk87XHJcblxyXG4gICAgaWYgKHRoaXMuaXNOZWdhdGl2ZSgpKSB7XHJcbiAgICAgICAgaWYgKG11bHRpcGxpZXIuaXNOZWdhdGl2ZSgpKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5uZWcoKS5tdWwobXVsdGlwbGllci5uZWcoKSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5uZWcoKS5tdWwobXVsdGlwbGllcikubmVnKCk7XHJcbiAgICB9IGVsc2UgaWYgKG11bHRpcGxpZXIuaXNOZWdhdGl2ZSgpKVxyXG4gICAgICAgIHJldHVybiB0aGlzLm11bChtdWx0aXBsaWVyLm5lZygpKS5uZWcoKTtcclxuXHJcbiAgICAvLyBJZiBib3RoIGxvbmdzIGFyZSBzbWFsbCwgdXNlIGZsb2F0IG11bHRpcGxpY2F0aW9uXHJcbiAgICBpZiAodGhpcy5sdChUV09fUFdSXzI0KSAmJiBtdWx0aXBsaWVyLmx0KFRXT19QV1JfMjQpKVxyXG4gICAgICAgIHJldHVybiBmcm9tTnVtYmVyKHRoaXMudG9OdW1iZXIoKSAqIG11bHRpcGxpZXIudG9OdW1iZXIoKSwgdGhpcy51bnNpZ25lZCk7XHJcblxyXG4gICAgLy8gRGl2aWRlIGVhY2ggbG9uZyBpbnRvIDQgY2h1bmtzIG9mIDE2IGJpdHMsIGFuZCB0aGVuIGFkZCB1cCA0eDQgcHJvZHVjdHMuXHJcbiAgICAvLyBXZSBjYW4gc2tpcCBwcm9kdWN0cyB0aGF0IHdvdWxkIG92ZXJmbG93LlxyXG5cclxuICAgIHZhciBhNDggPSB0aGlzLmhpZ2ggPj4+IDE2O1xyXG4gICAgdmFyIGEzMiA9IHRoaXMuaGlnaCAmIDB4RkZGRjtcclxuICAgIHZhciBhMTYgPSB0aGlzLmxvdyA+Pj4gMTY7XHJcbiAgICB2YXIgYTAwID0gdGhpcy5sb3cgJiAweEZGRkY7XHJcblxyXG4gICAgdmFyIGI0OCA9IG11bHRpcGxpZXIuaGlnaCA+Pj4gMTY7XHJcbiAgICB2YXIgYjMyID0gbXVsdGlwbGllci5oaWdoICYgMHhGRkZGO1xyXG4gICAgdmFyIGIxNiA9IG11bHRpcGxpZXIubG93ID4+PiAxNjtcclxuICAgIHZhciBiMDAgPSBtdWx0aXBsaWVyLmxvdyAmIDB4RkZGRjtcclxuXHJcbiAgICB2YXIgYzQ4ID0gMCwgYzMyID0gMCwgYzE2ID0gMCwgYzAwID0gMDtcclxuICAgIGMwMCArPSBhMDAgKiBiMDA7XHJcbiAgICBjMTYgKz0gYzAwID4+PiAxNjtcclxuICAgIGMwMCAmPSAweEZGRkY7XHJcbiAgICBjMTYgKz0gYTE2ICogYjAwO1xyXG4gICAgYzMyICs9IGMxNiA+Pj4gMTY7XHJcbiAgICBjMTYgJj0gMHhGRkZGO1xyXG4gICAgYzE2ICs9IGEwMCAqIGIxNjtcclxuICAgIGMzMiArPSBjMTYgPj4+IDE2O1xyXG4gICAgYzE2ICY9IDB4RkZGRjtcclxuICAgIGMzMiArPSBhMzIgKiBiMDA7XHJcbiAgICBjNDggKz0gYzMyID4+PiAxNjtcclxuICAgIGMzMiAmPSAweEZGRkY7XHJcbiAgICBjMzIgKz0gYTE2ICogYjE2O1xyXG4gICAgYzQ4ICs9IGMzMiA+Pj4gMTY7XHJcbiAgICBjMzIgJj0gMHhGRkZGO1xyXG4gICAgYzMyICs9IGEwMCAqIGIzMjtcclxuICAgIGM0OCArPSBjMzIgPj4+IDE2O1xyXG4gICAgYzMyICY9IDB4RkZGRjtcclxuICAgIGM0OCArPSBhNDggKiBiMDAgKyBhMzIgKiBiMTYgKyBhMTYgKiBiMzIgKyBhMDAgKiBiNDg7XHJcbiAgICBjNDggJj0gMHhGRkZGO1xyXG4gICAgcmV0dXJuIGZyb21CaXRzKChjMTYgPDwgMTYpIHwgYzAwLCAoYzQ4IDw8IDE2KSB8IGMzMiwgdGhpcy51bnNpZ25lZCk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgcHJvZHVjdCBvZiB0aGlzIGFuZCB0aGUgc3BlY2lmaWVkIExvbmcuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIExvbmcjbXVsdGlwbHl9LlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBtdWx0aXBsaWVyIE11bHRpcGxpZXJcclxuICogQHJldHVybnMgeyFMb25nfSBQcm9kdWN0XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLm11bCA9IExvbmdQcm90b3R5cGUubXVsdGlwbHk7XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGlzIExvbmcgZGl2aWRlZCBieSB0aGUgc3BlY2lmaWVkLiBUaGUgcmVzdWx0IGlzIHNpZ25lZCBpZiB0aGlzIExvbmcgaXMgc2lnbmVkIG9yXHJcbiAqICB1bnNpZ25lZCBpZiB0aGlzIExvbmcgaXMgdW5zaWduZWQuXHJcbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gZGl2aXNvciBEaXZpc29yXHJcbiAqIEByZXR1cm5zIHshTG9uZ30gUXVvdGllbnRcclxuICovXHJcbkxvbmdQcm90b3R5cGUuZGl2aWRlID0gZnVuY3Rpb24gZGl2aWRlKGRpdmlzb3IpIHtcclxuICAgIGlmICghaXNMb25nKGRpdmlzb3IpKVxyXG4gICAgICAgIGRpdmlzb3IgPSBmcm9tVmFsdWUoZGl2aXNvcik7XHJcbiAgICBpZiAoZGl2aXNvci5pc1plcm8oKSlcclxuICAgICAgICB0aHJvdyBFcnJvcignZGl2aXNpb24gYnkgemVybycpO1xyXG5cclxuICAgIC8vIHVzZSB3YXNtIHN1cHBvcnQgaWYgcHJlc2VudFxyXG4gICAgaWYgKHdhc20pIHtcclxuICAgICAgICAvLyBndWFyZCBhZ2FpbnN0IHNpZ25lZCBkaXZpc2lvbiBvdmVyZmxvdzogdGhlIGxhcmdlc3RcclxuICAgICAgICAvLyBuZWdhdGl2ZSBudW1iZXIgLyAtMSB3b3VsZCBiZSAxIGxhcmdlciB0aGFuIHRoZSBsYXJnZXN0XHJcbiAgICAgICAgLy8gcG9zaXRpdmUgbnVtYmVyLCBkdWUgdG8gdHdvJ3MgY29tcGxlbWVudC5cclxuICAgICAgICBpZiAoIXRoaXMudW5zaWduZWQgJiZcclxuICAgICAgICAgICAgdGhpcy5oaWdoID09PSAtMHg4MDAwMDAwMCAmJlxyXG4gICAgICAgICAgICBkaXZpc29yLmxvdyA9PT0gLTEgJiYgZGl2aXNvci5oaWdoID09PSAtMSkge1xyXG4gICAgICAgICAgICAvLyBiZSBjb25zaXN0ZW50IHdpdGggbm9uLXdhc20gY29kZSBwYXRoXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbG93ID0gKHRoaXMudW5zaWduZWQgPyB3YXNtLmRpdl91IDogd2FzbS5kaXZfcykoXHJcbiAgICAgICAgICAgIHRoaXMubG93LFxyXG4gICAgICAgICAgICB0aGlzLmhpZ2gsXHJcbiAgICAgICAgICAgIGRpdmlzb3IubG93LFxyXG4gICAgICAgICAgICBkaXZpc29yLmhpZ2hcclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybiBmcm9tQml0cyhsb3csIHdhc20uZ2V0X2hpZ2goKSwgdGhpcy51bnNpZ25lZCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuaXNaZXJvKCkpXHJcbiAgICAgICAgcmV0dXJuIHRoaXMudW5zaWduZWQgPyBVWkVSTyA6IFpFUk87XHJcbiAgICB2YXIgYXBwcm94LCByZW0sIHJlcztcclxuICAgIGlmICghdGhpcy51bnNpZ25lZCkge1xyXG4gICAgICAgIC8vIFRoaXMgc2VjdGlvbiBpcyBvbmx5IHJlbGV2YW50IGZvciBzaWduZWQgbG9uZ3MgYW5kIGlzIGRlcml2ZWQgZnJvbSB0aGVcclxuICAgICAgICAvLyBjbG9zdXJlIGxpYnJhcnkgYXMgYSB3aG9sZS5cclxuICAgICAgICBpZiAodGhpcy5lcShNSU5fVkFMVUUpKSB7XHJcbiAgICAgICAgICAgIGlmIChkaXZpc29yLmVxKE9ORSkgfHwgZGl2aXNvci5lcShORUdfT05FKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBNSU5fVkFMVUU7ICAvLyByZWNhbGwgdGhhdCAtTUlOX1ZBTFVFID09IE1JTl9WQUxVRVxyXG4gICAgICAgICAgICBlbHNlIGlmIChkaXZpc29yLmVxKE1JTl9WQUxVRSkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gT05FO1xyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIEF0IHRoaXMgcG9pbnQsIHdlIGhhdmUgfG90aGVyfCA+PSAyLCBzbyB8dGhpcy9vdGhlcnwgPCB8TUlOX1ZBTFVFfC5cclxuICAgICAgICAgICAgICAgIHZhciBoYWxmVGhpcyA9IHRoaXMuc2hyKDEpO1xyXG4gICAgICAgICAgICAgICAgYXBwcm94ID0gaGFsZlRoaXMuZGl2KGRpdmlzb3IpLnNobCgxKTtcclxuICAgICAgICAgICAgICAgIGlmIChhcHByb3guZXEoWkVSTykpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGl2aXNvci5pc05lZ2F0aXZlKCkgPyBPTkUgOiBORUdfT05FO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZW0gPSB0aGlzLnN1YihkaXZpc29yLm11bChhcHByb3gpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXMgPSBhcHByb3guYWRkKHJlbS5kaXYoZGl2aXNvcikpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGRpdmlzb3IuZXEoTUlOX1ZBTFVFKSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudW5zaWduZWQgPyBVWkVSTyA6IFpFUk87XHJcbiAgICAgICAgaWYgKHRoaXMuaXNOZWdhdGl2ZSgpKSB7XHJcbiAgICAgICAgICAgIGlmIChkaXZpc29yLmlzTmVnYXRpdmUoKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5lZygpLmRpdihkaXZpc29yLm5lZygpKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubmVnKCkuZGl2KGRpdmlzb3IpLm5lZygpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGl2aXNvci5pc05lZ2F0aXZlKCkpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpdihkaXZpc29yLm5lZygpKS5uZWcoKTtcclxuICAgICAgICByZXMgPSBaRVJPO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBUaGUgYWxnb3JpdGhtIGJlbG93IGhhcyBub3QgYmVlbiBtYWRlIGZvciB1bnNpZ25lZCBsb25ncy4gSXQncyB0aGVyZWZvcmVcclxuICAgICAgICAvLyByZXF1aXJlZCB0byB0YWtlIHNwZWNpYWwgY2FyZSBvZiB0aGUgTVNCIHByaW9yIHRvIHJ1bm5pbmcgaXQuXHJcbiAgICAgICAgaWYgKCFkaXZpc29yLnVuc2lnbmVkKVxyXG4gICAgICAgICAgICBkaXZpc29yID0gZGl2aXNvci50b1Vuc2lnbmVkKCk7XHJcbiAgICAgICAgaWYgKGRpdmlzb3IuZ3QodGhpcykpXHJcbiAgICAgICAgICAgIHJldHVybiBVWkVSTztcclxuICAgICAgICBpZiAoZGl2aXNvci5ndCh0aGlzLnNocnUoMSkpKSAvLyAxNSA+Pj4gMSA9IDcgOyB3aXRoIGRpdmlzb3IgPSA4IDsgdHJ1ZVxyXG4gICAgICAgICAgICByZXR1cm4gVU9ORTtcclxuICAgICAgICByZXMgPSBVWkVSTztcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXBlYXQgdGhlIGZvbGxvd2luZyB1bnRpbCB0aGUgcmVtYWluZGVyIGlzIGxlc3MgdGhhbiBvdGhlcjogIGZpbmQgYVxyXG4gICAgLy8gZmxvYXRpbmctcG9pbnQgdGhhdCBhcHByb3hpbWF0ZXMgcmVtYWluZGVyIC8gb3RoZXIgKmZyb20gYmVsb3cqLCBhZGQgdGhpc1xyXG4gICAgLy8gaW50byB0aGUgcmVzdWx0LCBhbmQgc3VidHJhY3QgaXQgZnJvbSB0aGUgcmVtYWluZGVyLiAgSXQgaXMgY3JpdGljYWwgdGhhdFxyXG4gICAgLy8gdGhlIGFwcHJveGltYXRlIHZhbHVlIGlzIGxlc3MgdGhhbiBvciBlcXVhbCB0byB0aGUgcmVhbCB2YWx1ZSBzbyB0aGF0IHRoZVxyXG4gICAgLy8gcmVtYWluZGVyIG5ldmVyIGJlY29tZXMgbmVnYXRpdmUuXHJcbiAgICByZW0gPSB0aGlzO1xyXG4gICAgd2hpbGUgKHJlbS5ndGUoZGl2aXNvcikpIHtcclxuICAgICAgICAvLyBBcHByb3hpbWF0ZSB0aGUgcmVzdWx0IG9mIGRpdmlzaW9uLiBUaGlzIG1heSBiZSBhIGxpdHRsZSBncmVhdGVyIG9yXHJcbiAgICAgICAgLy8gc21hbGxlciB0aGFuIHRoZSBhY3R1YWwgdmFsdWUuXHJcbiAgICAgICAgYXBwcm94ID0gTWF0aC5tYXgoMSwgTWF0aC5mbG9vcihyZW0udG9OdW1iZXIoKSAvIGRpdmlzb3IudG9OdW1iZXIoKSkpO1xyXG5cclxuICAgICAgICAvLyBXZSB3aWxsIHR3ZWFrIHRoZSBhcHByb3hpbWF0ZSByZXN1bHQgYnkgY2hhbmdpbmcgaXQgaW4gdGhlIDQ4LXRoIGRpZ2l0IG9yXHJcbiAgICAgICAgLy8gdGhlIHNtYWxsZXN0IG5vbi1mcmFjdGlvbmFsIGRpZ2l0LCB3aGljaGV2ZXIgaXMgbGFyZ2VyLlxyXG4gICAgICAgIHZhciBsb2cyID0gTWF0aC5jZWlsKE1hdGgubG9nKGFwcHJveCkgLyBNYXRoLkxOMiksXHJcbiAgICAgICAgICAgIGRlbHRhID0gKGxvZzIgPD0gNDgpID8gMSA6IHBvd19kYmwoMiwgbG9nMiAtIDQ4KSxcclxuXHJcbiAgICAgICAgLy8gRGVjcmVhc2UgdGhlIGFwcHJveGltYXRpb24gdW50aWwgaXQgaXMgc21hbGxlciB0aGFuIHRoZSByZW1haW5kZXIuICBOb3RlXHJcbiAgICAgICAgLy8gdGhhdCBpZiBpdCBpcyB0b28gbGFyZ2UsIHRoZSBwcm9kdWN0IG92ZXJmbG93cyBhbmQgaXMgbmVnYXRpdmUuXHJcbiAgICAgICAgICAgIGFwcHJveFJlcyA9IGZyb21OdW1iZXIoYXBwcm94KSxcclxuICAgICAgICAgICAgYXBwcm94UmVtID0gYXBwcm94UmVzLm11bChkaXZpc29yKTtcclxuICAgICAgICB3aGlsZSAoYXBwcm94UmVtLmlzTmVnYXRpdmUoKSB8fCBhcHByb3hSZW0uZ3QocmVtKSkge1xyXG4gICAgICAgICAgICBhcHByb3ggLT0gZGVsdGE7XHJcbiAgICAgICAgICAgIGFwcHJveFJlcyA9IGZyb21OdW1iZXIoYXBwcm94LCB0aGlzLnVuc2lnbmVkKTtcclxuICAgICAgICAgICAgYXBwcm94UmVtID0gYXBwcm94UmVzLm11bChkaXZpc29yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFdlIGtub3cgdGhlIGFuc3dlciBjYW4ndCBiZSB6ZXJvLi4uIGFuZCBhY3R1YWxseSwgemVybyB3b3VsZCBjYXVzZVxyXG4gICAgICAgIC8vIGluZmluaXRlIHJlY3Vyc2lvbiBzaW5jZSB3ZSB3b3VsZCBtYWtlIG5vIHByb2dyZXNzLlxyXG4gICAgICAgIGlmIChhcHByb3hSZXMuaXNaZXJvKCkpXHJcbiAgICAgICAgICAgIGFwcHJveFJlcyA9IE9ORTtcclxuXHJcbiAgICAgICAgcmVzID0gcmVzLmFkZChhcHByb3hSZXMpO1xyXG4gICAgICAgIHJlbSA9IHJlbS5zdWIoYXBwcm94UmVtKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXM7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGlzIExvbmcgZGl2aWRlZCBieSB0aGUgc3BlY2lmaWVkLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI2RpdmlkZX0uXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IGRpdmlzb3IgRGl2aXNvclxyXG4gKiBAcmV0dXJucyB7IUxvbmd9IFF1b3RpZW50XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLmRpdiA9IExvbmdQcm90b3R5cGUuZGl2aWRlO1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhpcyBMb25nIG1vZHVsbyB0aGUgc3BlY2lmaWVkLlxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IGRpdmlzb3IgRGl2aXNvclxyXG4gKiBAcmV0dXJucyB7IUxvbmd9IFJlbWFpbmRlclxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5tb2R1bG8gPSBmdW5jdGlvbiBtb2R1bG8oZGl2aXNvcikge1xyXG4gICAgaWYgKCFpc0xvbmcoZGl2aXNvcikpXHJcbiAgICAgICAgZGl2aXNvciA9IGZyb21WYWx1ZShkaXZpc29yKTtcclxuXHJcbiAgICAvLyB1c2Ugd2FzbSBzdXBwb3J0IGlmIHByZXNlbnRcclxuICAgIGlmICh3YXNtKSB7XHJcbiAgICAgICAgdmFyIGxvdyA9ICh0aGlzLnVuc2lnbmVkID8gd2FzbS5yZW1fdSA6IHdhc20ucmVtX3MpKFxyXG4gICAgICAgICAgICB0aGlzLmxvdyxcclxuICAgICAgICAgICAgdGhpcy5oaWdoLFxyXG4gICAgICAgICAgICBkaXZpc29yLmxvdyxcclxuICAgICAgICAgICAgZGl2aXNvci5oaWdoXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4gZnJvbUJpdHMobG93LCB3YXNtLmdldF9oaWdoKCksIHRoaXMudW5zaWduZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLnN1Yih0aGlzLmRpdihkaXZpc29yKS5tdWwoZGl2aXNvcikpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhpcyBMb25nIG1vZHVsbyB0aGUgc3BlY2lmaWVkLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI21vZHVsb30uXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IGRpdmlzb3IgRGl2aXNvclxyXG4gKiBAcmV0dXJucyB7IUxvbmd9IFJlbWFpbmRlclxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS5tb2QgPSBMb25nUHJvdG90eXBlLm1vZHVsbztcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoaXMgTG9uZyBtb2R1bG8gdGhlIHNwZWNpZmllZC4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgTG9uZyNtb2R1bG99LlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBkaXZpc29yIERpdmlzb3JcclxuICogQHJldHVybnMgeyFMb25nfSBSZW1haW5kZXJcclxuICovXHJcbkxvbmdQcm90b3R5cGUucmVtID0gTG9uZ1Byb3RvdHlwZS5tb2R1bG87XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgYml0d2lzZSBOT1Qgb2YgdGhpcyBMb25nLlxyXG4gKiBAcmV0dXJucyB7IUxvbmd9XHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLm5vdCA9IGZ1bmN0aW9uIG5vdCgpIHtcclxuICAgIHJldHVybiBmcm9tQml0cyh+dGhpcy5sb3csIH50aGlzLmhpZ2gsIHRoaXMudW5zaWduZWQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGJpdHdpc2UgQU5EIG9mIHRoaXMgTG9uZyBhbmQgdGhlIHNwZWNpZmllZC5cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBvdGhlciBPdGhlciBMb25nXHJcbiAqIEByZXR1cm5zIHshTG9uZ31cclxuICovXHJcbkxvbmdQcm90b3R5cGUuYW5kID0gZnVuY3Rpb24gYW5kKG90aGVyKSB7XHJcbiAgICBpZiAoIWlzTG9uZyhvdGhlcikpXHJcbiAgICAgICAgb3RoZXIgPSBmcm9tVmFsdWUob3RoZXIpO1xyXG4gICAgcmV0dXJuIGZyb21CaXRzKHRoaXMubG93ICYgb3RoZXIubG93LCB0aGlzLmhpZ2ggJiBvdGhlci5oaWdoLCB0aGlzLnVuc2lnbmVkKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBiaXR3aXNlIE9SIG9mIHRoaXMgTG9uZyBhbmQgdGhlIHNwZWNpZmllZC5cclxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBvdGhlciBPdGhlciBMb25nXHJcbiAqIEByZXR1cm5zIHshTG9uZ31cclxuICovXHJcbkxvbmdQcm90b3R5cGUub3IgPSBmdW5jdGlvbiBvcihvdGhlcikge1xyXG4gICAgaWYgKCFpc0xvbmcob3RoZXIpKVxyXG4gICAgICAgIG90aGVyID0gZnJvbVZhbHVlKG90aGVyKTtcclxuICAgIHJldHVybiBmcm9tQml0cyh0aGlzLmxvdyB8IG90aGVyLmxvdywgdGhpcy5oaWdoIHwgb3RoZXIuaGlnaCwgdGhpcy51bnNpZ25lZCk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgYml0d2lzZSBYT1Igb2YgdGhpcyBMb25nIGFuZCB0aGUgZ2l2ZW4gb25lLlxyXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIExvbmdcclxuICogQHJldHVybnMgeyFMb25nfVxyXG4gKi9cclxuTG9uZ1Byb3RvdHlwZS54b3IgPSBmdW5jdGlvbiB4b3Iob3RoZXIpIHtcclxuICAgIGlmICghaXNMb25nKG90aGVyKSlcclxuICAgICAgICBvdGhlciA9IGZyb21WYWx1ZShvdGhlcik7XHJcbiAgICByZXR1cm4gZnJvbUJpdHModGhpcy5sb3cgXiBvdGhlci5sb3csIHRoaXMuaGlnaCBeIG90aGVyLmhpZ2gsIHRoaXMudW5zaWduZWQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhpcyBMb25nIHdpdGggYml0cyBzaGlmdGVkIHRvIHRoZSBsZWZ0IGJ5IHRoZSBnaXZlbiBhbW91bnQuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfCFMb25nfSBudW1CaXRzIE51bWJlciBvZiBiaXRzXHJcbiAqIEByZXR1cm5zIHshTG9uZ30gU2hpZnRlZCBMb25nXHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLnNoaWZ0TGVmdCA9IGZ1bmN0aW9uIHNoaWZ0TGVmdChudW1CaXRzKSB7XHJcbiAgICBpZiAoaXNMb25nKG51bUJpdHMpKVxyXG4gICAgICAgIG51bUJpdHMgPSBudW1CaXRzLnRvSW50KCk7XHJcbiAgICBpZiAoKG51bUJpdHMgJj0gNjMpID09PSAwKVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgZWxzZSBpZiAobnVtQml0cyA8IDMyKVxyXG4gICAgICAgIHJldHVybiBmcm9tQml0cyh0aGlzLmxvdyA8PCBudW1CaXRzLCAodGhpcy5oaWdoIDw8IG51bUJpdHMpIHwgKHRoaXMubG93ID4+PiAoMzIgLSBudW1CaXRzKSksIHRoaXMudW5zaWduZWQpO1xyXG4gICAgZWxzZVxyXG4gICAgICAgIHJldHVybiBmcm9tQml0cygwLCB0aGlzLmxvdyA8PCAobnVtQml0cyAtIDMyKSwgdGhpcy51bnNpZ25lZCk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGlzIExvbmcgd2l0aCBiaXRzIHNoaWZ0ZWQgdG8gdGhlIGxlZnQgYnkgdGhlIGdpdmVuIGFtb3VudC4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgTG9uZyNzaGlmdExlZnR9LlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtudW1iZXJ8IUxvbmd9IG51bUJpdHMgTnVtYmVyIG9mIGJpdHNcclxuICogQHJldHVybnMgeyFMb25nfSBTaGlmdGVkIExvbmdcclxuICovXHJcbkxvbmdQcm90b3R5cGUuc2hsID0gTG9uZ1Byb3RvdHlwZS5zaGlmdExlZnQ7XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGlzIExvbmcgd2l0aCBiaXRzIGFyaXRobWV0aWNhbGx5IHNoaWZ0ZWQgdG8gdGhlIHJpZ2h0IGJ5IHRoZSBnaXZlbiBhbW91bnQuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfCFMb25nfSBudW1CaXRzIE51bWJlciBvZiBiaXRzXHJcbiAqIEByZXR1cm5zIHshTG9uZ30gU2hpZnRlZCBMb25nXHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLnNoaWZ0UmlnaHQgPSBmdW5jdGlvbiBzaGlmdFJpZ2h0KG51bUJpdHMpIHtcclxuICAgIGlmIChpc0xvbmcobnVtQml0cykpXHJcbiAgICAgICAgbnVtQml0cyA9IG51bUJpdHMudG9JbnQoKTtcclxuICAgIGlmICgobnVtQml0cyAmPSA2MykgPT09IDApXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICBlbHNlIGlmIChudW1CaXRzIDwgMzIpXHJcbiAgICAgICAgcmV0dXJuIGZyb21CaXRzKCh0aGlzLmxvdyA+Pj4gbnVtQml0cykgfCAodGhpcy5oaWdoIDw8ICgzMiAtIG51bUJpdHMpKSwgdGhpcy5oaWdoID4+IG51bUJpdHMsIHRoaXMudW5zaWduZWQpO1xyXG4gICAgZWxzZVxyXG4gICAgICAgIHJldHVybiBmcm9tQml0cyh0aGlzLmhpZ2ggPj4gKG51bUJpdHMgLSAzMiksIHRoaXMuaGlnaCA+PSAwID8gMCA6IC0xLCB0aGlzLnVuc2lnbmVkKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoaXMgTG9uZyB3aXRoIGJpdHMgYXJpdGhtZXRpY2FsbHkgc2hpZnRlZCB0byB0aGUgcmlnaHQgYnkgdGhlIGdpdmVuIGFtb3VudC4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgTG9uZyNzaGlmdFJpZ2h0fS5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7bnVtYmVyfCFMb25nfSBudW1CaXRzIE51bWJlciBvZiBiaXRzXHJcbiAqIEByZXR1cm5zIHshTG9uZ30gU2hpZnRlZCBMb25nXHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLnNociA9IExvbmdQcm90b3R5cGUuc2hpZnRSaWdodDtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoaXMgTG9uZyB3aXRoIGJpdHMgbG9naWNhbGx5IHNoaWZ0ZWQgdG8gdGhlIHJpZ2h0IGJ5IHRoZSBnaXZlbiBhbW91bnQuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfCFMb25nfSBudW1CaXRzIE51bWJlciBvZiBiaXRzXHJcbiAqIEByZXR1cm5zIHshTG9uZ30gU2hpZnRlZCBMb25nXHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLnNoaWZ0UmlnaHRVbnNpZ25lZCA9IGZ1bmN0aW9uIHNoaWZ0UmlnaHRVbnNpZ25lZChudW1CaXRzKSB7XHJcbiAgICBpZiAoaXNMb25nKG51bUJpdHMpKVxyXG4gICAgICAgIG51bUJpdHMgPSBudW1CaXRzLnRvSW50KCk7XHJcbiAgICBudW1CaXRzICY9IDYzO1xyXG4gICAgaWYgKG51bUJpdHMgPT09IDApXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB2YXIgaGlnaCA9IHRoaXMuaGlnaDtcclxuICAgICAgICBpZiAobnVtQml0cyA8IDMyKSB7XHJcbiAgICAgICAgICAgIHZhciBsb3cgPSB0aGlzLmxvdztcclxuICAgICAgICAgICAgcmV0dXJuIGZyb21CaXRzKChsb3cgPj4+IG51bUJpdHMpIHwgKGhpZ2ggPDwgKDMyIC0gbnVtQml0cykpLCBoaWdoID4+PiBudW1CaXRzLCB0aGlzLnVuc2lnbmVkKTtcclxuICAgICAgICB9IGVsc2UgaWYgKG51bUJpdHMgPT09IDMyKVxyXG4gICAgICAgICAgICByZXR1cm4gZnJvbUJpdHMoaGlnaCwgMCwgdGhpcy51bnNpZ25lZCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gZnJvbUJpdHMoaGlnaCA+Pj4gKG51bUJpdHMgLSAzMiksIDAsIHRoaXMudW5zaWduZWQpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhpcyBMb25nIHdpdGggYml0cyBsb2dpY2FsbHkgc2hpZnRlZCB0byB0aGUgcmlnaHQgYnkgdGhlIGdpdmVuIGFtb3VudC4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgTG9uZyNzaGlmdFJpZ2h0VW5zaWduZWR9LlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtudW1iZXJ8IUxvbmd9IG51bUJpdHMgTnVtYmVyIG9mIGJpdHNcclxuICogQHJldHVybnMgeyFMb25nfSBTaGlmdGVkIExvbmdcclxuICovXHJcbkxvbmdQcm90b3R5cGUuc2hydSA9IExvbmdQcm90b3R5cGUuc2hpZnRSaWdodFVuc2lnbmVkO1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhpcyBMb25nIHdpdGggYml0cyBsb2dpY2FsbHkgc2hpZnRlZCB0byB0aGUgcmlnaHQgYnkgdGhlIGdpdmVuIGFtb3VudC4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgTG9uZyNzaGlmdFJpZ2h0VW5zaWduZWR9LlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtudW1iZXJ8IUxvbmd9IG51bUJpdHMgTnVtYmVyIG9mIGJpdHNcclxuICogQHJldHVybnMgeyFMb25nfSBTaGlmdGVkIExvbmdcclxuICovXHJcbkxvbmdQcm90b3R5cGUuc2hyX3UgPSBMb25nUHJvdG90eXBlLnNoaWZ0UmlnaHRVbnNpZ25lZDtcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyB0aGlzIExvbmcgdG8gc2lnbmVkLlxyXG4gKiBAcmV0dXJucyB7IUxvbmd9IFNpZ25lZCBsb25nXHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLnRvU2lnbmVkID0gZnVuY3Rpb24gdG9TaWduZWQoKSB7XHJcbiAgICBpZiAoIXRoaXMudW5zaWduZWQpXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICByZXR1cm4gZnJvbUJpdHModGhpcy5sb3csIHRoaXMuaGlnaCwgZmFsc2UpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIHRoaXMgTG9uZyB0byB1bnNpZ25lZC5cclxuICogQHJldHVybnMgeyFMb25nfSBVbnNpZ25lZCBsb25nXHJcbiAqL1xyXG5Mb25nUHJvdG90eXBlLnRvVW5zaWduZWQgPSBmdW5jdGlvbiB0b1Vuc2lnbmVkKCkge1xyXG4gICAgaWYgKHRoaXMudW5zaWduZWQpXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICByZXR1cm4gZnJvbUJpdHModGhpcy5sb3csIHRoaXMuaGlnaCwgdHJ1ZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29udmVydHMgdGhpcyBMb25nIHRvIGl0cyBieXRlIHJlcHJlc2VudGF0aW9uLlxyXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBsZSBXaGV0aGVyIGxpdHRsZSBvciBiaWcgZW5kaWFuLCBkZWZhdWx0cyB0byBiaWcgZW5kaWFuXHJcbiAqIEByZXR1cm5zIHshQXJyYXkuPG51bWJlcj59IEJ5dGUgcmVwcmVzZW50YXRpb25cclxuICovXHJcbkxvbmdQcm90b3R5cGUudG9CeXRlcyA9IGZ1bmN0aW9uIHRvQnl0ZXMobGUpIHtcclxuICAgIHJldHVybiBsZSA/IHRoaXMudG9CeXRlc0xFKCkgOiB0aGlzLnRvQnl0ZXNCRSgpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIHRoaXMgTG9uZyB0byBpdHMgbGl0dGxlIGVuZGlhbiBieXRlIHJlcHJlc2VudGF0aW9uLlxyXG4gKiBAcmV0dXJucyB7IUFycmF5LjxudW1iZXI+fSBMaXR0bGUgZW5kaWFuIGJ5dGUgcmVwcmVzZW50YXRpb25cclxuICovXHJcbkxvbmdQcm90b3R5cGUudG9CeXRlc0xFID0gZnVuY3Rpb24gdG9CeXRlc0xFKCkge1xyXG4gICAgdmFyIGhpID0gdGhpcy5oaWdoLFxyXG4gICAgICAgIGxvID0gdGhpcy5sb3c7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICAgIGxvICAgICAgICAmIDB4ZmYsXHJcbiAgICAgICAgbG8gPj4+ICA4ICYgMHhmZixcclxuICAgICAgICBsbyA+Pj4gMTYgJiAweGZmLFxyXG4gICAgICAgIGxvID4+PiAyNCAgICAgICAsXHJcbiAgICAgICAgaGkgICAgICAgICYgMHhmZixcclxuICAgICAgICBoaSA+Pj4gIDggJiAweGZmLFxyXG4gICAgICAgIGhpID4+PiAxNiAmIDB4ZmYsXHJcbiAgICAgICAgaGkgPj4+IDI0XHJcbiAgICBdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIHRoaXMgTG9uZyB0byBpdHMgYmlnIGVuZGlhbiBieXRlIHJlcHJlc2VudGF0aW9uLlxyXG4gKiBAcmV0dXJucyB7IUFycmF5LjxudW1iZXI+fSBCaWcgZW5kaWFuIGJ5dGUgcmVwcmVzZW50YXRpb25cclxuICovXHJcbkxvbmdQcm90b3R5cGUudG9CeXRlc0JFID0gZnVuY3Rpb24gdG9CeXRlc0JFKCkge1xyXG4gICAgdmFyIGhpID0gdGhpcy5oaWdoLFxyXG4gICAgICAgIGxvID0gdGhpcy5sb3c7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICAgIGhpID4+PiAyNCAgICAgICAsXHJcbiAgICAgICAgaGkgPj4+IDE2ICYgMHhmZixcclxuICAgICAgICBoaSA+Pj4gIDggJiAweGZmLFxyXG4gICAgICAgIGhpICAgICAgICAmIDB4ZmYsXHJcbiAgICAgICAgbG8gPj4+IDI0ICAgICAgICxcclxuICAgICAgICBsbyA+Pj4gMTYgJiAweGZmLFxyXG4gICAgICAgIGxvID4+PiAgOCAmIDB4ZmYsXHJcbiAgICAgICAgbG8gICAgICAgICYgMHhmZlxyXG4gICAgXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgTG9uZyBmcm9tIGl0cyBieXRlIHJlcHJlc2VudGF0aW9uLlxyXG4gKiBAcGFyYW0geyFBcnJheS48bnVtYmVyPn0gYnl0ZXMgQnl0ZSByZXByZXNlbnRhdGlvblxyXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSB1bnNpZ25lZCBXaGV0aGVyIHVuc2lnbmVkIG9yIG5vdCwgZGVmYXVsdHMgdG8gc2lnbmVkXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IGxlIFdoZXRoZXIgbGl0dGxlIG9yIGJpZyBlbmRpYW4sIGRlZmF1bHRzIHRvIGJpZyBlbmRpYW5cclxuICogQHJldHVybnMge0xvbmd9IFRoZSBjb3JyZXNwb25kaW5nIExvbmcgdmFsdWVcclxuICovXHJcbkxvbmcuZnJvbUJ5dGVzID0gZnVuY3Rpb24gZnJvbUJ5dGVzKGJ5dGVzLCB1bnNpZ25lZCwgbGUpIHtcclxuICAgIHJldHVybiBsZSA/IExvbmcuZnJvbUJ5dGVzTEUoYnl0ZXMsIHVuc2lnbmVkKSA6IExvbmcuZnJvbUJ5dGVzQkUoYnl0ZXMsIHVuc2lnbmVkKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgTG9uZyBmcm9tIGl0cyBsaXR0bGUgZW5kaWFuIGJ5dGUgcmVwcmVzZW50YXRpb24uXHJcbiAqIEBwYXJhbSB7IUFycmF5LjxudW1iZXI+fSBieXRlcyBMaXR0bGUgZW5kaWFuIGJ5dGUgcmVwcmVzZW50YXRpb25cclxuICogQHBhcmFtIHtib29sZWFuPX0gdW5zaWduZWQgV2hldGhlciB1bnNpZ25lZCBvciBub3QsIGRlZmF1bHRzIHRvIHNpZ25lZFxyXG4gKiBAcmV0dXJucyB7TG9uZ30gVGhlIGNvcnJlc3BvbmRpbmcgTG9uZyB2YWx1ZVxyXG4gKi9cclxuTG9uZy5mcm9tQnl0ZXNMRSA9IGZ1bmN0aW9uIGZyb21CeXRlc0xFKGJ5dGVzLCB1bnNpZ25lZCkge1xyXG4gICAgcmV0dXJuIG5ldyBMb25nKFxyXG4gICAgICAgIGJ5dGVzWzBdICAgICAgIHxcclxuICAgICAgICBieXRlc1sxXSA8PCAgOCB8XHJcbiAgICAgICAgYnl0ZXNbMl0gPDwgMTYgfFxyXG4gICAgICAgIGJ5dGVzWzNdIDw8IDI0LFxyXG4gICAgICAgIGJ5dGVzWzRdICAgICAgIHxcclxuICAgICAgICBieXRlc1s1XSA8PCAgOCB8XHJcbiAgICAgICAgYnl0ZXNbNl0gPDwgMTYgfFxyXG4gICAgICAgIGJ5dGVzWzddIDw8IDI0LFxyXG4gICAgICAgIHVuc2lnbmVkXHJcbiAgICApO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBMb25nIGZyb20gaXRzIGJpZyBlbmRpYW4gYnl0ZSByZXByZXNlbnRhdGlvbi5cclxuICogQHBhcmFtIHshQXJyYXkuPG51bWJlcj59IGJ5dGVzIEJpZyBlbmRpYW4gYnl0ZSByZXByZXNlbnRhdGlvblxyXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSB1bnNpZ25lZCBXaGV0aGVyIHVuc2lnbmVkIG9yIG5vdCwgZGVmYXVsdHMgdG8gc2lnbmVkXHJcbiAqIEByZXR1cm5zIHtMb25nfSBUaGUgY29ycmVzcG9uZGluZyBMb25nIHZhbHVlXHJcbiAqL1xyXG5Mb25nLmZyb21CeXRlc0JFID0gZnVuY3Rpb24gZnJvbUJ5dGVzQkUoYnl0ZXMsIHVuc2lnbmVkKSB7XHJcbiAgICByZXR1cm4gbmV3IExvbmcoXHJcbiAgICAgICAgYnl0ZXNbNF0gPDwgMjQgfFxyXG4gICAgICAgIGJ5dGVzWzVdIDw8IDE2IHxcclxuICAgICAgICBieXRlc1s2XSA8PCAgOCB8XHJcbiAgICAgICAgYnl0ZXNbN10sXHJcbiAgICAgICAgYnl0ZXNbMF0gPDwgMjQgfFxyXG4gICAgICAgIGJ5dGVzWzFdIDw8IDE2IHxcclxuICAgICAgICBieXRlc1syXSA8PCAgOCB8XHJcbiAgICAgICAgYnl0ZXNbM10sXHJcbiAgICAgICAgdW5zaWduZWRcclxuICAgICk7XHJcbn07XHJcbiIsIi8vIG1pbmltYWwgbGlicmFyeSBlbnRyeSBwb2ludC5cblxuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL3NyYy9pbmRleC1taW5pbWFsXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgcHJvdG9idWYgPSBleHBvcnRzO1xuXG4vKipcbiAqIEJ1aWxkIHR5cGUsIG9uZSBvZiBgXCJmdWxsXCJgLCBgXCJsaWdodFwiYCBvciBgXCJtaW5pbWFsXCJgLlxuICogQG5hbWUgYnVpbGRcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKiBAY29uc3RcbiAqL1xucHJvdG9idWYuYnVpbGQgPSBcIm1pbmltYWxcIjtcblxuLy8gU2VyaWFsaXphdGlvblxucHJvdG9idWYuV3JpdGVyICAgICAgID0gcmVxdWlyZShcIi4vd3JpdGVyXCIpO1xucHJvdG9idWYuQnVmZmVyV3JpdGVyID0gcmVxdWlyZShcIi4vd3JpdGVyX2J1ZmZlclwiKTtcbnByb3RvYnVmLlJlYWRlciAgICAgICA9IHJlcXVpcmUoXCIuL3JlYWRlclwiKTtcbnByb3RvYnVmLkJ1ZmZlclJlYWRlciA9IHJlcXVpcmUoXCIuL3JlYWRlcl9idWZmZXJcIik7XG5cbi8vIFV0aWxpdHlcbnByb3RvYnVmLnV0aWwgICAgICAgICA9IHJlcXVpcmUoXCIuL3V0aWwvbWluaW1hbFwiKTtcbnByb3RvYnVmLnJwYyAgICAgICAgICA9IHJlcXVpcmUoXCIuL3JwY1wiKTtcbnByb3RvYnVmLnJvb3RzICAgICAgICA9IHJlcXVpcmUoXCIuL3Jvb3RzXCIpO1xucHJvdG9idWYuY29uZmlndXJlICAgID0gY29uZmlndXJlO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuLyoqXG4gKiBSZWNvbmZpZ3VyZXMgdGhlIGxpYnJhcnkgYWNjb3JkaW5nIHRvIHRoZSBlbnZpcm9ubWVudC5cbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gKi9cbmZ1bmN0aW9uIGNvbmZpZ3VyZSgpIHtcbiAgICBwcm90b2J1Zi51dGlsLl9jb25maWd1cmUoKTtcbiAgICBwcm90b2J1Zi5Xcml0ZXIuX2NvbmZpZ3VyZShwcm90b2J1Zi5CdWZmZXJXcml0ZXIpO1xuICAgIHByb3RvYnVmLlJlYWRlci5fY29uZmlndXJlKHByb3RvYnVmLkJ1ZmZlclJlYWRlcik7XG59XG5cbi8vIFNldCB1cCBidWZmZXIgdXRpbGl0eSBhY2NvcmRpbmcgdG8gdGhlIGVudmlyb25tZW50XG5jb25maWd1cmUoKTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBSZWFkZXI7XG5cbnZhciB1dGlsICAgICAgPSByZXF1aXJlKFwiLi91dGlsL21pbmltYWxcIik7XG5cbnZhciBCdWZmZXJSZWFkZXI7IC8vIGN5Y2xpY1xuXG52YXIgTG9uZ0JpdHMgID0gdXRpbC5Mb25nQml0cyxcbiAgICB1dGY4ICAgICAgPSB1dGlsLnV0Zjg7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5mdW5jdGlvbiBpbmRleE91dE9mUmFuZ2UocmVhZGVyLCB3cml0ZUxlbmd0aCkge1xuICAgIHJldHVybiBSYW5nZUVycm9yKFwiaW5kZXggb3V0IG9mIHJhbmdlOiBcIiArIHJlYWRlci5wb3MgKyBcIiArIFwiICsgKHdyaXRlTGVuZ3RoIHx8IDEpICsgXCIgPiBcIiArIHJlYWRlci5sZW4pO1xufVxuXG4vKipcbiAqIENvbnN0cnVjdHMgYSBuZXcgcmVhZGVyIGluc3RhbmNlIHVzaW5nIHRoZSBzcGVjaWZpZWQgYnVmZmVyLlxuICogQGNsYXNzZGVzYyBXaXJlIGZvcm1hdCByZWFkZXIgdXNpbmcgYFVpbnQ4QXJyYXlgIGlmIGF2YWlsYWJsZSwgb3RoZXJ3aXNlIGBBcnJheWAuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmZmVyIEJ1ZmZlciB0byByZWFkIGZyb21cbiAqL1xuZnVuY3Rpb24gUmVhZGVyKGJ1ZmZlcikge1xuXG4gICAgLyoqXG4gICAgICogUmVhZCBidWZmZXIuXG4gICAgICogQHR5cGUge1VpbnQ4QXJyYXl9XG4gICAgICovXG4gICAgdGhpcy5idWYgPSBidWZmZXI7XG5cbiAgICAvKipcbiAgICAgKiBSZWFkIGJ1ZmZlciBwb3NpdGlvbi5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMucG9zID0gMDtcblxuICAgIC8qKlxuICAgICAqIFJlYWQgYnVmZmVyIGxlbmd0aC5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMubGVuID0gYnVmZmVyLmxlbmd0aDtcbn1cblxudmFyIGNyZWF0ZV9hcnJheSA9IHR5cGVvZiBVaW50OEFycmF5ICE9PSBcInVuZGVmaW5lZFwiXG4gICAgPyBmdW5jdGlvbiBjcmVhdGVfdHlwZWRfYXJyYXkoYnVmZmVyKSB7XG4gICAgICAgIGlmIChidWZmZXIgaW5zdGFuY2VvZiBVaW50OEFycmF5IHx8IEFycmF5LmlzQXJyYXkoYnVmZmVyKSlcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVhZGVyKGJ1ZmZlcik7XG4gICAgICAgIHRocm93IEVycm9yKFwiaWxsZWdhbCBidWZmZXJcIik7XG4gICAgfVxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgOiBmdW5jdGlvbiBjcmVhdGVfYXJyYXkoYnVmZmVyKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGJ1ZmZlcikpXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlYWRlcihidWZmZXIpO1xuICAgICAgICB0aHJvdyBFcnJvcihcImlsbGVnYWwgYnVmZmVyXCIpO1xuICAgIH07XG5cbnZhciBjcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgcmV0dXJuIHV0aWwuQnVmZmVyXG4gICAgICAgID8gZnVuY3Rpb24gY3JlYXRlX2J1ZmZlcl9zZXR1cChidWZmZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAoUmVhZGVyLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZV9idWZmZXIoYnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHV0aWwuQnVmZmVyLmlzQnVmZmVyKGJ1ZmZlcilcbiAgICAgICAgICAgICAgICAgICAgPyBuZXcgQnVmZmVyUmVhZGVyKGJ1ZmZlcilcbiAgICAgICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgICAgICAgICAgICAgOiBjcmVhdGVfYXJyYXkoYnVmZmVyKTtcbiAgICAgICAgICAgIH0pKGJ1ZmZlcik7XG4gICAgICAgIH1cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgOiBjcmVhdGVfYXJyYXk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgcmVhZGVyIHVzaW5nIHRoZSBzcGVjaWZpZWQgYnVmZmVyLlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl8QnVmZmVyfSBidWZmZXIgQnVmZmVyIHRvIHJlYWQgZnJvbVxuICogQHJldHVybnMge1JlYWRlcnxCdWZmZXJSZWFkZXJ9IEEge0BsaW5rIEJ1ZmZlclJlYWRlcn0gaWYgYGJ1ZmZlcmAgaXMgYSBCdWZmZXIsIG90aGVyd2lzZSBhIHtAbGluayBSZWFkZXJ9XG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgYGJ1ZmZlcmAgaXMgbm90IGEgdmFsaWQgYnVmZmVyXG4gKi9cblJlYWRlci5jcmVhdGUgPSBjcmVhdGUoKTtcblxuUmVhZGVyLnByb3RvdHlwZS5fc2xpY2UgPSB1dGlsLkFycmF5LnByb3RvdHlwZS5zdWJhcnJheSB8fCAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyB1dGlsLkFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuLyoqXG4gKiBSZWFkcyBhIHZhcmludCBhcyBhbiB1bnNpZ25lZCAzMiBiaXQgdmFsdWUuXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS51aW50MzIgPSAoZnVuY3Rpb24gcmVhZF91aW50MzJfc2V0dXAoKSB7XG4gICAgdmFyIHZhbHVlID0gNDI5NDk2NzI5NTsgLy8gb3B0aW1pemVyIHR5cGUtaGludCwgdGVuZHMgdG8gZGVvcHQgb3RoZXJ3aXNlICg/ISlcbiAgICByZXR1cm4gZnVuY3Rpb24gcmVhZF91aW50MzIoKSB7XG4gICAgICAgIHZhbHVlID0gKCAgICAgICAgIHRoaXMuYnVmW3RoaXMucG9zXSAmIDEyNyAgICAgICApID4+PiAwOyBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpIHJldHVybiB2YWx1ZTtcbiAgICAgICAgdmFsdWUgPSAodmFsdWUgfCAodGhpcy5idWZbdGhpcy5wb3NdICYgMTI3KSA8PCAgNykgPj4+IDA7IGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOCkgcmV0dXJuIHZhbHVlO1xuICAgICAgICB2YWx1ZSA9ICh2YWx1ZSB8ICh0aGlzLmJ1Zlt0aGlzLnBvc10gJiAxMjcpIDw8IDE0KSA+Pj4gMDsgaWYgKHRoaXMuYnVmW3RoaXMucG9zKytdIDwgMTI4KSByZXR1cm4gdmFsdWU7XG4gICAgICAgIHZhbHVlID0gKHZhbHVlIHwgKHRoaXMuYnVmW3RoaXMucG9zXSAmIDEyNykgPDwgMjEpID4+PiAwOyBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpIHJldHVybiB2YWx1ZTtcbiAgICAgICAgdmFsdWUgPSAodmFsdWUgfCAodGhpcy5idWZbdGhpcy5wb3NdICYgIDE1KSA8PCAyOCkgPj4+IDA7IGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOCkgcmV0dXJuIHZhbHVlO1xuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAoKHRoaXMucG9zICs9IDUpID4gdGhpcy5sZW4pIHtcbiAgICAgICAgICAgIHRoaXMucG9zID0gdGhpcy5sZW47XG4gICAgICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcywgMTApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xufSkoKTtcblxuLyoqXG4gKiBSZWFkcyBhIHZhcmludCBhcyBhIHNpZ25lZCAzMiBiaXQgdmFsdWUuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXG4gKi9cblJlYWRlci5wcm90b3R5cGUuaW50MzIgPSBmdW5jdGlvbiByZWFkX2ludDMyKCkge1xuICAgIHJldHVybiB0aGlzLnVpbnQzMigpIHwgMDtcbn07XG5cbi8qKlxuICogUmVhZHMgYSB6aWctemFnIGVuY29kZWQgdmFyaW50IGFzIGEgc2lnbmVkIDMyIGJpdCB2YWx1ZS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS5zaW50MzIgPSBmdW5jdGlvbiByZWFkX3NpbnQzMigpIHtcbiAgICB2YXIgdmFsdWUgPSB0aGlzLnVpbnQzMigpO1xuICAgIHJldHVybiB2YWx1ZSA+Pj4gMSBeIC0odmFsdWUgJiAxKSB8IDA7XG59O1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1pbnZhbGlkLXRoaXMgKi9cblxuZnVuY3Rpb24gcmVhZExvbmdWYXJpbnQoKSB7XG4gICAgLy8gdGVuZHMgdG8gZGVvcHQgd2l0aCBsb2NhbCB2YXJzIGZvciBvY3RldCBldGMuXG4gICAgdmFyIGJpdHMgPSBuZXcgTG9uZ0JpdHMoMCwgMCk7XG4gICAgdmFyIGkgPSAwO1xuICAgIGlmICh0aGlzLmxlbiAtIHRoaXMucG9zID4gNCkgeyAvLyBmYXN0IHJvdXRlIChsbylcbiAgICAgICAgZm9yICg7IGkgPCA0OyArK2kpIHtcbiAgICAgICAgICAgIC8vIDFzdC4uNHRoXG4gICAgICAgICAgICBiaXRzLmxvID0gKGJpdHMubG8gfCAodGhpcy5idWZbdGhpcy5wb3NdICYgMTI3KSA8PCBpICogNykgPj4+IDA7XG4gICAgICAgICAgICBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpdHM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNXRoXG4gICAgICAgIGJpdHMubG8gPSAoYml0cy5sbyB8ICh0aGlzLmJ1Zlt0aGlzLnBvc10gJiAxMjcpIDw8IDI4KSA+Pj4gMDtcbiAgICAgICAgYml0cy5oaSA9IChiaXRzLmhpIHwgKHRoaXMuYnVmW3RoaXMucG9zXSAmIDEyNykgPj4gIDQpID4+PiAwO1xuICAgICAgICBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpXG4gICAgICAgICAgICByZXR1cm4gYml0cztcbiAgICAgICAgaSA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9yICg7IGkgPCAzOyArK2kpIHtcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICAgICAgaWYgKHRoaXMucG9zID49IHRoaXMubGVuKVxuICAgICAgICAgICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzKTtcbiAgICAgICAgICAgIC8vIDFzdC4uM3RoXG4gICAgICAgICAgICBiaXRzLmxvID0gKGJpdHMubG8gfCAodGhpcy5idWZbdGhpcy5wb3NdICYgMTI3KSA8PCBpICogNykgPj4+IDA7XG4gICAgICAgICAgICBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpdHM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNHRoXG4gICAgICAgIGJpdHMubG8gPSAoYml0cy5sbyB8ICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSAmIDEyNykgPDwgaSAqIDcpID4+PiAwO1xuICAgICAgICByZXR1cm4gYml0cztcbiAgICB9XG4gICAgaWYgKHRoaXMubGVuIC0gdGhpcy5wb3MgPiA0KSB7IC8vIGZhc3Qgcm91dGUgKGhpKVxuICAgICAgICBmb3IgKDsgaSA8IDU7ICsraSkge1xuICAgICAgICAgICAgLy8gNnRoLi4xMHRoXG4gICAgICAgICAgICBiaXRzLmhpID0gKGJpdHMuaGkgfCAodGhpcy5idWZbdGhpcy5wb3NdICYgMTI3KSA8PCBpICogNyArIDMpID4+PiAwO1xuICAgICAgICAgICAgaWYgKHRoaXMuYnVmW3RoaXMucG9zKytdIDwgMTI4KVxuICAgICAgICAgICAgICAgIHJldHVybiBiaXRzO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9yICg7IGkgPCA1OyArK2kpIHtcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICAgICAgaWYgKHRoaXMucG9zID49IHRoaXMubGVuKVxuICAgICAgICAgICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzKTtcbiAgICAgICAgICAgIC8vIDZ0aC4uMTB0aFxuICAgICAgICAgICAgYml0cy5oaSA9IChiaXRzLmhpIHwgKHRoaXMuYnVmW3RoaXMucG9zXSAmIDEyNykgPDwgaSAqIDcgKyAzKSA+Pj4gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOClcbiAgICAgICAgICAgICAgICByZXR1cm4gYml0cztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIHRocm93IEVycm9yKFwiaW52YWxpZCB2YXJpbnQgZW5jb2RpbmdcIik7XG59XG5cbi8qIGVzbGludC1lbmFibGUgbm8taW52YWxpZC10aGlzICovXG5cbi8qKlxuICogUmVhZHMgYSB2YXJpbnQgYXMgYSBzaWduZWQgNjQgYml0IHZhbHVlLlxuICogQG5hbWUgUmVhZGVyI2ludDY0XG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtMb25nfSBWYWx1ZSByZWFkXG4gKi9cblxuLyoqXG4gKiBSZWFkcyBhIHZhcmludCBhcyBhbiB1bnNpZ25lZCA2NCBiaXQgdmFsdWUuXG4gKiBAbmFtZSBSZWFkZXIjdWludDY0XG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtMb25nfSBWYWx1ZSByZWFkXG4gKi9cblxuLyoqXG4gKiBSZWFkcyBhIHppZy16YWcgZW5jb2RlZCB2YXJpbnQgYXMgYSBzaWduZWQgNjQgYml0IHZhbHVlLlxuICogQG5hbWUgUmVhZGVyI3NpbnQ2NFxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7TG9uZ30gVmFsdWUgcmVhZFxuICovXG5cbi8qKlxuICogUmVhZHMgYSB2YXJpbnQgYXMgYSBib29sZWFuLlxuICogQHJldHVybnMge2Jvb2xlYW59IFZhbHVlIHJlYWRcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS5ib29sID0gZnVuY3Rpb24gcmVhZF9ib29sKCkge1xuICAgIHJldHVybiB0aGlzLnVpbnQzMigpICE9PSAwO1xufTtcblxuZnVuY3Rpb24gcmVhZEZpeGVkMzJfZW5kKGJ1ZiwgZW5kKSB7IC8vIG5vdGUgdGhhdCB0aGlzIHVzZXMgYGVuZGAsIG5vdCBgcG9zYFxuICAgIHJldHVybiAoYnVmW2VuZCAtIDRdXG4gICAgICAgICAgfCBidWZbZW5kIC0gM10gPDwgOFxuICAgICAgICAgIHwgYnVmW2VuZCAtIDJdIDw8IDE2XG4gICAgICAgICAgfCBidWZbZW5kIC0gMV0gPDwgMjQpID4+PiAwO1xufVxuXG4vKipcbiAqIFJlYWRzIGZpeGVkIDMyIGJpdHMgYXMgYW4gdW5zaWduZWQgMzIgYml0IGludGVnZXIuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXG4gKi9cblJlYWRlci5wcm90b3R5cGUuZml4ZWQzMiA9IGZ1bmN0aW9uIHJlYWRfZml4ZWQzMigpIHtcblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICh0aGlzLnBvcyArIDQgPiB0aGlzLmxlbilcbiAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMsIDQpO1xuXG4gICAgcmV0dXJuIHJlYWRGaXhlZDMyX2VuZCh0aGlzLmJ1ZiwgdGhpcy5wb3MgKz0gNCk7XG59O1xuXG4vKipcbiAqIFJlYWRzIGZpeGVkIDMyIGJpdHMgYXMgYSBzaWduZWQgMzIgYml0IGludGVnZXIuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXG4gKi9cblJlYWRlci5wcm90b3R5cGUuc2ZpeGVkMzIgPSBmdW5jdGlvbiByZWFkX3NmaXhlZDMyKCkge1xuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKHRoaXMucG9zICsgNCA+IHRoaXMubGVuKVxuICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcywgNCk7XG5cbiAgICByZXR1cm4gcmVhZEZpeGVkMzJfZW5kKHRoaXMuYnVmLCB0aGlzLnBvcyArPSA0KSB8IDA7XG59O1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1pbnZhbGlkLXRoaXMgKi9cblxuZnVuY3Rpb24gcmVhZEZpeGVkNjQoLyogdGhpczogUmVhZGVyICovKSB7XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAodGhpcy5wb3MgKyA4ID4gdGhpcy5sZW4pXG4gICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzLCA4KTtcblxuICAgIHJldHVybiBuZXcgTG9uZ0JpdHMocmVhZEZpeGVkMzJfZW5kKHRoaXMuYnVmLCB0aGlzLnBvcyArPSA0KSwgcmVhZEZpeGVkMzJfZW5kKHRoaXMuYnVmLCB0aGlzLnBvcyArPSA0KSk7XG59XG5cbi8qIGVzbGludC1lbmFibGUgbm8taW52YWxpZC10aGlzICovXG5cbi8qKlxuICogUmVhZHMgZml4ZWQgNjQgYml0cy5cbiAqIEBuYW1lIFJlYWRlciNmaXhlZDY0XG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtMb25nfSBWYWx1ZSByZWFkXG4gKi9cblxuLyoqXG4gKiBSZWFkcyB6aWctemFnIGVuY29kZWQgZml4ZWQgNjQgYml0cy5cbiAqIEBuYW1lIFJlYWRlciNzZml4ZWQ2NFxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7TG9uZ30gVmFsdWUgcmVhZFxuICovXG5cbi8qKlxuICogUmVhZHMgYSBmbG9hdCAoMzIgYml0KSBhcyBhIG51bWJlci5cbiAqIEBmdW5jdGlvblxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxuICovXG5SZWFkZXIucHJvdG90eXBlLmZsb2F0ID0gZnVuY3Rpb24gcmVhZF9mbG9hdCgpIHtcblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICh0aGlzLnBvcyArIDQgPiB0aGlzLmxlbilcbiAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMsIDQpO1xuXG4gICAgdmFyIHZhbHVlID0gdXRpbC5mbG9hdC5yZWFkRmxvYXRMRSh0aGlzLmJ1ZiwgdGhpcy5wb3MpO1xuICAgIHRoaXMucG9zICs9IDQ7XG4gICAgcmV0dXJuIHZhbHVlO1xufTtcblxuLyoqXG4gKiBSZWFkcyBhIGRvdWJsZSAoNjQgYml0IGZsb2F0KSBhcyBhIG51bWJlci5cbiAqIEBmdW5jdGlvblxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxuICovXG5SZWFkZXIucHJvdG90eXBlLmRvdWJsZSA9IGZ1bmN0aW9uIHJlYWRfZG91YmxlKCkge1xuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKHRoaXMucG9zICsgOCA+IHRoaXMubGVuKVxuICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcywgNCk7XG5cbiAgICB2YXIgdmFsdWUgPSB1dGlsLmZsb2F0LnJlYWREb3VibGVMRSh0aGlzLmJ1ZiwgdGhpcy5wb3MpO1xuICAgIHRoaXMucG9zICs9IDg7XG4gICAgcmV0dXJuIHZhbHVlO1xufTtcblxuLyoqXG4gKiBSZWFkcyBhIHNlcXVlbmNlIG9mIGJ5dGVzIHByZWNlZWRlZCBieSBpdHMgbGVuZ3RoIGFzIGEgdmFyaW50LlxuICogQHJldHVybnMge1VpbnQ4QXJyYXl9IFZhbHVlIHJlYWRcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS5ieXRlcyA9IGZ1bmN0aW9uIHJlYWRfYnl0ZXMoKSB7XG4gICAgdmFyIGxlbmd0aCA9IHRoaXMudWludDMyKCksXG4gICAgICAgIHN0YXJ0ICA9IHRoaXMucG9zLFxuICAgICAgICBlbmQgICAgPSB0aGlzLnBvcyArIGxlbmd0aDtcblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmIChlbmQgPiB0aGlzLmxlbilcbiAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMsIGxlbmd0aCk7XG5cbiAgICB0aGlzLnBvcyArPSBsZW5ndGg7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5idWYpKSAvLyBwbGFpbiBhcnJheVxuICAgICAgICByZXR1cm4gdGhpcy5idWYuc2xpY2Uoc3RhcnQsIGVuZCk7XG4gICAgcmV0dXJuIHN0YXJ0ID09PSBlbmQgLy8gZml4IGZvciBJRSAxMC9XaW44IGFuZCBvdGhlcnMnIHN1YmFycmF5IHJldHVybmluZyBhcnJheSBvZiBzaXplIDFcbiAgICAgICAgPyBuZXcgdGhpcy5idWYuY29uc3RydWN0b3IoMClcbiAgICAgICAgOiB0aGlzLl9zbGljZS5jYWxsKHRoaXMuYnVmLCBzdGFydCwgZW5kKTtcbn07XG5cbi8qKlxuICogUmVhZHMgYSBzdHJpbmcgcHJlY2VlZGVkIGJ5IGl0cyBieXRlIGxlbmd0aCBhcyBhIHZhcmludC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFZhbHVlIHJlYWRcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS5zdHJpbmcgPSBmdW5jdGlvbiByZWFkX3N0cmluZygpIHtcbiAgICB2YXIgYnl0ZXMgPSB0aGlzLmJ5dGVzKCk7XG4gICAgcmV0dXJuIHV0ZjgucmVhZChieXRlcywgMCwgYnl0ZXMubGVuZ3RoKTtcbn07XG5cbi8qKlxuICogU2tpcHMgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgYnl0ZXMgaWYgc3BlY2lmaWVkLCBvdGhlcndpc2Ugc2tpcHMgYSB2YXJpbnQuXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aF0gTGVuZ3RoIGlmIGtub3duLCBvdGhlcndpc2UgYSB2YXJpbnQgaXMgYXNzdW1lZFxuICogQHJldHVybnMge1JlYWRlcn0gYHRoaXNgXG4gKi9cblJlYWRlci5wcm90b3R5cGUuc2tpcCA9IGZ1bmN0aW9uIHNraXAobGVuZ3RoKSB7XG4gICAgaWYgKHR5cGVvZiBsZW5ndGggPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmICh0aGlzLnBvcyArIGxlbmd0aCA+IHRoaXMubGVuKVxuICAgICAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMsIGxlbmd0aCk7XG4gICAgICAgIHRoaXMucG9zICs9IGxlbmd0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgICAgIGlmICh0aGlzLnBvcyA+PSB0aGlzLmxlbilcbiAgICAgICAgICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcyk7XG4gICAgICAgIH0gd2hpbGUgKHRoaXMuYnVmW3RoaXMucG9zKytdICYgMTI4KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNraXBzIHRoZSBuZXh0IGVsZW1lbnQgb2YgdGhlIHNwZWNpZmllZCB3aXJlIHR5cGUuXG4gKiBAcGFyYW0ge251bWJlcn0gd2lyZVR5cGUgV2lyZSB0eXBlIHJlY2VpdmVkXG4gKiBAcmV0dXJucyB7UmVhZGVyfSBgdGhpc2BcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS5za2lwVHlwZSA9IGZ1bmN0aW9uKHdpcmVUeXBlKSB7XG4gICAgc3dpdGNoICh3aXJlVHlwZSkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICB0aGlzLnNraXAoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICB0aGlzLnNraXAoOCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgdGhpcy5za2lwKHRoaXMudWludDMyKCkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIHdoaWxlICgod2lyZVR5cGUgPSB0aGlzLnVpbnQzMigpICYgNykgIT09IDQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNraXBUeXBlKHdpcmVUeXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICB0aGlzLnNraXAoNCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJpbnZhbGlkIHdpcmUgdHlwZSBcIiArIHdpcmVUeXBlICsgXCIgYXQgb2Zmc2V0IFwiICsgdGhpcy5wb3MpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5cblJlYWRlci5fY29uZmlndXJlID0gZnVuY3Rpb24oQnVmZmVyUmVhZGVyXykge1xuICAgIEJ1ZmZlclJlYWRlciA9IEJ1ZmZlclJlYWRlcl87XG4gICAgUmVhZGVyLmNyZWF0ZSA9IGNyZWF0ZSgpO1xuICAgIEJ1ZmZlclJlYWRlci5fY29uZmlndXJlKCk7XG5cbiAgICB2YXIgZm4gPSB1dGlsLkxvbmcgPyBcInRvTG9uZ1wiIDogLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gXCJ0b051bWJlclwiO1xuICAgIHV0aWwubWVyZ2UoUmVhZGVyLnByb3RvdHlwZSwge1xuXG4gICAgICAgIGludDY0OiBmdW5jdGlvbiByZWFkX2ludDY0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlYWRMb25nVmFyaW50LmNhbGwodGhpcylbZm5dKGZhbHNlKTtcbiAgICAgICAgfSxcblxuICAgICAgICB1aW50NjQ6IGZ1bmN0aW9uIHJlYWRfdWludDY0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlYWRMb25nVmFyaW50LmNhbGwodGhpcylbZm5dKHRydWUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNpbnQ2NDogZnVuY3Rpb24gcmVhZF9zaW50NjQoKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVhZExvbmdWYXJpbnQuY2FsbCh0aGlzKS56ekRlY29kZSgpW2ZuXShmYWxzZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZml4ZWQ2NDogZnVuY3Rpb24gcmVhZF9maXhlZDY0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlYWRGaXhlZDY0LmNhbGwodGhpcylbZm5dKHRydWUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNmaXhlZDY0OiBmdW5jdGlvbiByZWFkX3NmaXhlZDY0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlYWRGaXhlZDY0LmNhbGwodGhpcylbZm5dKGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IEJ1ZmZlclJlYWRlcjtcblxuLy8gZXh0ZW5kcyBSZWFkZXJcbnZhciBSZWFkZXIgPSByZXF1aXJlKFwiLi9yZWFkZXJcIik7XG4oQnVmZmVyUmVhZGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUmVhZGVyLnByb3RvdHlwZSkpLmNvbnN0cnVjdG9yID0gQnVmZmVyUmVhZGVyO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuL3V0aWwvbWluaW1hbFwiKTtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IGJ1ZmZlciByZWFkZXIgaW5zdGFuY2UuXG4gKiBAY2xhc3NkZXNjIFdpcmUgZm9ybWF0IHJlYWRlciB1c2luZyBub2RlIGJ1ZmZlcnMuXG4gKiBAZXh0ZW5kcyBSZWFkZXJcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtCdWZmZXJ9IGJ1ZmZlciBCdWZmZXIgdG8gcmVhZCBmcm9tXG4gKi9cbmZ1bmN0aW9uIEJ1ZmZlclJlYWRlcihidWZmZXIpIHtcbiAgICBSZWFkZXIuY2FsbCh0aGlzLCBidWZmZXIpO1xuXG4gICAgLyoqXG4gICAgICogUmVhZCBidWZmZXIuXG4gICAgICogQG5hbWUgQnVmZmVyUmVhZGVyI2J1ZlxuICAgICAqIEB0eXBlIHtCdWZmZXJ9XG4gICAgICovXG59XG5cbkJ1ZmZlclJlYWRlci5fY29uZmlndXJlID0gZnVuY3Rpb24gKCkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgaWYgKHV0aWwuQnVmZmVyKVxuICAgICAgICBCdWZmZXJSZWFkZXIucHJvdG90eXBlLl9zbGljZSA9IHV0aWwuQnVmZmVyLnByb3RvdHlwZS5zbGljZTtcbn07XG5cblxuLyoqXG4gKiBAb3ZlcnJpZGVcbiAqL1xuQnVmZmVyUmVhZGVyLnByb3RvdHlwZS5zdHJpbmcgPSBmdW5jdGlvbiByZWFkX3N0cmluZ19idWZmZXIoKSB7XG4gICAgdmFyIGxlbiA9IHRoaXMudWludDMyKCk7IC8vIG1vZGlmaWVzIHBvc1xuICAgIHJldHVybiB0aGlzLmJ1Zi51dGY4U2xpY2VcbiAgICAgICAgPyB0aGlzLmJ1Zi51dGY4U2xpY2UodGhpcy5wb3MsIHRoaXMucG9zID0gTWF0aC5taW4odGhpcy5wb3MgKyBsZW4sIHRoaXMubGVuKSlcbiAgICAgICAgOiB0aGlzLmJ1Zi50b1N0cmluZyhcInV0Zi04XCIsIHRoaXMucG9zLCB0aGlzLnBvcyA9IE1hdGgubWluKHRoaXMucG9zICsgbGVuLCB0aGlzLmxlbikpO1xufTtcblxuLyoqXG4gKiBSZWFkcyBhIHNlcXVlbmNlIG9mIGJ5dGVzIHByZWNlZWRlZCBieSBpdHMgbGVuZ3RoIGFzIGEgdmFyaW50LlxuICogQG5hbWUgQnVmZmVyUmVhZGVyI2J5dGVzXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtCdWZmZXJ9IFZhbHVlIHJlYWRcbiAqL1xuXG5CdWZmZXJSZWFkZXIuX2NvbmZpZ3VyZSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vKipcbiAqIE5hbWVkIHJvb3RzLlxuICogVGhpcyBpcyB3aGVyZSBwYmpzIHN0b3JlcyBnZW5lcmF0ZWQgc3RydWN0dXJlcyAodGhlIG9wdGlvbiBgLXIsIC0tcm9vdGAgc3BlY2lmaWVzIGEgbmFtZSkuXG4gKiBDYW4gYWxzbyBiZSB1c2VkIG1hbnVhbGx5IHRvIG1ha2Ugcm9vdHMgYXZhaWxhYmxlIGFjY3Jvc3MgbW9kdWxlcy5cbiAqIEBuYW1lIHJvb3RzXG4gKiBAdHlwZSB7T2JqZWN0LjxzdHJpbmcsUm9vdD59XG4gKiBAZXhhbXBsZVxuICogLy8gcGJqcyAtciBteXJvb3QgLW8gY29tcGlsZWQuanMgLi4uXG4gKlxuICogLy8gaW4gYW5vdGhlciBtb2R1bGU6XG4gKiByZXF1aXJlKFwiLi9jb21waWxlZC5qc1wiKTtcbiAqXG4gKiAvLyBpbiBhbnkgc3Vic2VxdWVudCBtb2R1bGU6XG4gKiB2YXIgcm9vdCA9IHByb3RvYnVmLnJvb3RzW1wibXlyb290XCJdO1xuICovXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBTdHJlYW1pbmcgUlBDIGhlbHBlcnMuXG4gKiBAbmFtZXNwYWNlXG4gKi9cbnZhciBycGMgPSBleHBvcnRzO1xuXG4vKipcbiAqIFJQQyBpbXBsZW1lbnRhdGlvbiBwYXNzZWQgdG8ge0BsaW5rIFNlcnZpY2UjY3JlYXRlfSBwZXJmb3JtaW5nIGEgc2VydmljZSByZXF1ZXN0IG9uIG5ldHdvcmsgbGV2ZWwsIGkuZS4gYnkgdXRpbGl6aW5nIGh0dHAgcmVxdWVzdHMgb3Igd2Vic29ja2V0cy5cbiAqIEB0eXBlZGVmIFJQQ0ltcGxcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqIEBwYXJhbSB7TWV0aG9kfHJwYy5TZXJ2aWNlTWV0aG9kPE1lc3NhZ2U8e30+LE1lc3NhZ2U8e30+Pn0gbWV0aG9kIFJlZmxlY3RlZCBvciBzdGF0aWMgbWV0aG9kIGJlaW5nIGNhbGxlZFxuICogQHBhcmFtIHtVaW50OEFycmF5fSByZXF1ZXN0RGF0YSBSZXF1ZXN0IGRhdGFcbiAqIEBwYXJhbSB7UlBDSW1wbENhbGxiYWNrfSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAqIEBleGFtcGxlXG4gKiBmdW5jdGlvbiBycGNJbXBsKG1ldGhvZCwgcmVxdWVzdERhdGEsIGNhbGxiYWNrKSB7XG4gKiAgICAgaWYgKHByb3RvYnVmLnV0aWwubGNGaXJzdChtZXRob2QubmFtZSkgIT09IFwibXlNZXRob2RcIikgLy8gY29tcGF0aWJsZSB3aXRoIHN0YXRpYyBjb2RlXG4gKiAgICAgICAgIHRocm93IEVycm9yKFwibm8gc3VjaCBtZXRob2RcIik7XG4gKiAgICAgYXN5bmNocm9ub3VzbHlPYnRhaW5BUmVzcG9uc2UocmVxdWVzdERhdGEsIGZ1bmN0aW9uKGVyciwgcmVzcG9uc2VEYXRhKSB7XG4gKiAgICAgICAgIGNhbGxiYWNrKGVyciwgcmVzcG9uc2VEYXRhKTtcbiAqICAgICB9KTtcbiAqIH1cbiAqL1xuXG4vKipcbiAqIE5vZGUtc3R5bGUgY2FsbGJhY2sgYXMgdXNlZCBieSB7QGxpbmsgUlBDSW1wbH0uXG4gKiBAdHlwZWRlZiBSUENJbXBsQ2FsbGJhY2tcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqIEBwYXJhbSB7RXJyb3J8bnVsbH0gZXJyb3IgRXJyb3IsIGlmIGFueSwgb3RoZXJ3aXNlIGBudWxsYFxuICogQHBhcmFtIHtVaW50OEFycmF5fG51bGx9IFtyZXNwb25zZV0gUmVzcG9uc2UgZGF0YSBvciBgbnVsbGAgdG8gc2lnbmFsIGVuZCBvZiBzdHJlYW0sIGlmIHRoZXJlIGhhc24ndCBiZWVuIGFuIGVycm9yXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICovXG5cbnJwYy5TZXJ2aWNlID0gcmVxdWlyZShcIi4vcnBjL3NlcnZpY2VcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gU2VydmljZTtcblxudmFyIHV0aWwgPSByZXF1aXJlKFwiLi4vdXRpbC9taW5pbWFsXCIpO1xuXG4vLyBFeHRlbmRzIEV2ZW50RW1pdHRlclxuKFNlcnZpY2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSh1dGlsLkV2ZW50RW1pdHRlci5wcm90b3R5cGUpKS5jb25zdHJ1Y3RvciA9IFNlcnZpY2U7XG5cbi8qKlxuICogQSBzZXJ2aWNlIG1ldGhvZCBjYWxsYmFjayBhcyB1c2VkIGJ5IHtAbGluayBycGMuU2VydmljZU1ldGhvZHxTZXJ2aWNlTWV0aG9kfS5cbiAqXG4gKiBEaWZmZXJzIGZyb20ge0BsaW5rIFJQQ0ltcGxDYWxsYmFja30gaW4gdGhhdCBpdCBpcyBhbiBhY3R1YWwgY2FsbGJhY2sgb2YgYSBzZXJ2aWNlIG1ldGhvZCB3aGljaCBtYXkgbm90IHJldHVybiBgcmVzcG9uc2UgPSBudWxsYC5cbiAqIEB0eXBlZGVmIHJwYy5TZXJ2aWNlTWV0aG9kQ2FsbGJhY2tcbiAqIEB0ZW1wbGF0ZSBUUmVzIGV4dGVuZHMgTWVzc2FnZTxUUmVzPlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICogQHBhcmFtIHtFcnJvcnxudWxsfSBlcnJvciBFcnJvciwgaWYgYW55XG4gKiBAcGFyYW0ge1RSZXN9IFtyZXNwb25zZV0gUmVzcG9uc2UgbWVzc2FnZVxuICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAqL1xuXG4vKipcbiAqIEEgc2VydmljZSBtZXRob2QgcGFydCBvZiBhIHtAbGluayBycGMuU2VydmljZX0gYXMgY3JlYXRlZCBieSB7QGxpbmsgU2VydmljZS5jcmVhdGV9LlxuICogQHR5cGVkZWYgcnBjLlNlcnZpY2VNZXRob2RcbiAqIEB0ZW1wbGF0ZSBUUmVxIGV4dGVuZHMgTWVzc2FnZTxUUmVxPlxuICogQHRlbXBsYXRlIFRSZXMgZXh0ZW5kcyBNZXNzYWdlPFRSZXM+XG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKiBAcGFyYW0ge1RSZXF8UHJvcGVydGllczxUUmVxPn0gcmVxdWVzdCBSZXF1ZXN0IG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0XG4gKiBAcGFyYW0ge3JwYy5TZXJ2aWNlTWV0aG9kQ2FsbGJhY2s8VFJlcz59IFtjYWxsYmFja10gTm9kZS1zdHlsZSBjYWxsYmFjayBjYWxsZWQgd2l0aCB0aGUgZXJyb3IsIGlmIGFueSwgYW5kIHRoZSByZXNwb25zZSBtZXNzYWdlXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxNZXNzYWdlPFRSZXM+Pn0gUHJvbWlzZSBpZiBgY2FsbGJhY2tgIGhhcyBiZWVuIG9taXR0ZWQsIG90aGVyd2lzZSBgdW5kZWZpbmVkYFxuICovXG5cbi8qKlxuICogQ29uc3RydWN0cyBhIG5ldyBSUEMgc2VydmljZSBpbnN0YW5jZS5cbiAqIEBjbGFzc2Rlc2MgQW4gUlBDIHNlcnZpY2UgYXMgcmV0dXJuZWQgYnkge0BsaW5rIFNlcnZpY2UjY3JlYXRlfS5cbiAqIEBleHBvcnRzIHJwYy5TZXJ2aWNlXG4gKiBAZXh0ZW5kcyB1dGlsLkV2ZW50RW1pdHRlclxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge1JQQ0ltcGx9IHJwY0ltcGwgUlBDIGltcGxlbWVudGF0aW9uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtyZXF1ZXN0RGVsaW1pdGVkPWZhbHNlXSBXaGV0aGVyIHJlcXVlc3RzIGFyZSBsZW5ndGgtZGVsaW1pdGVkXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtyZXNwb25zZURlbGltaXRlZD1mYWxzZV0gV2hldGhlciByZXNwb25zZXMgYXJlIGxlbmd0aC1kZWxpbWl0ZWRcbiAqL1xuZnVuY3Rpb24gU2VydmljZShycGNJbXBsLCByZXF1ZXN0RGVsaW1pdGVkLCByZXNwb25zZURlbGltaXRlZCkge1xuXG4gICAgaWYgKHR5cGVvZiBycGNJbXBsICE9PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIHRocm93IFR5cGVFcnJvcihcInJwY0ltcGwgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuXG4gICAgdXRpbC5FdmVudEVtaXR0ZXIuY2FsbCh0aGlzKTtcblxuICAgIC8qKlxuICAgICAqIFJQQyBpbXBsZW1lbnRhdGlvbi4gQmVjb21lcyBgbnVsbGAgb25jZSB0aGUgc2VydmljZSBpcyBlbmRlZC5cbiAgICAgKiBAdHlwZSB7UlBDSW1wbHxudWxsfVxuICAgICAqL1xuICAgIHRoaXMucnBjSW1wbCA9IHJwY0ltcGw7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHJlcXVlc3RzIGFyZSBsZW5ndGgtZGVsaW1pdGVkLlxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMucmVxdWVzdERlbGltaXRlZCA9IEJvb2xlYW4ocmVxdWVzdERlbGltaXRlZCk7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHJlc3BvbnNlcyBhcmUgbGVuZ3RoLWRlbGltaXRlZC5cbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLnJlc3BvbnNlRGVsaW1pdGVkID0gQm9vbGVhbihyZXNwb25zZURlbGltaXRlZCk7XG59XG5cbi8qKlxuICogQ2FsbHMgYSBzZXJ2aWNlIG1ldGhvZCB0aHJvdWdoIHtAbGluayBycGMuU2VydmljZSNycGNJbXBsfHJwY0ltcGx9LlxuICogQHBhcmFtIHtNZXRob2R8cnBjLlNlcnZpY2VNZXRob2Q8VFJlcSxUUmVzPn0gbWV0aG9kIFJlZmxlY3RlZCBvciBzdGF0aWMgbWV0aG9kXG4gKiBAcGFyYW0ge0NvbnN0cnVjdG9yPFRSZXE+fSByZXF1ZXN0Q3RvciBSZXF1ZXN0IGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0NvbnN0cnVjdG9yPFRSZXM+fSByZXNwb25zZUN0b3IgUmVzcG9uc2UgY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7VFJlcXxQcm9wZXJ0aWVzPFRSZXE+fSByZXF1ZXN0IFJlcXVlc3QgbWVzc2FnZSBvciBwbGFpbiBvYmplY3RcbiAqIEBwYXJhbSB7cnBjLlNlcnZpY2VNZXRob2RDYWxsYmFjazxUUmVzPn0gY2FsbGJhY2sgU2VydmljZSBjYWxsYmFja1xuICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAqIEB0ZW1wbGF0ZSBUUmVxIGV4dGVuZHMgTWVzc2FnZTxUUmVxPlxuICogQHRlbXBsYXRlIFRSZXMgZXh0ZW5kcyBNZXNzYWdlPFRSZXM+XG4gKi9cblNlcnZpY2UucHJvdG90eXBlLnJwY0NhbGwgPSBmdW5jdGlvbiBycGNDYWxsKG1ldGhvZCwgcmVxdWVzdEN0b3IsIHJlc3BvbnNlQ3RvciwgcmVxdWVzdCwgY2FsbGJhY2spIHtcblxuICAgIGlmICghcmVxdWVzdClcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwicmVxdWVzdCBtdXN0IGJlIHNwZWNpZmllZFwiKTtcblxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBpZiAoIWNhbGxiYWNrKVxuICAgICAgICByZXR1cm4gdXRpbC5hc1Byb21pc2UocnBjQ2FsbCwgc2VsZiwgbWV0aG9kLCByZXF1ZXN0Q3RvciwgcmVzcG9uc2VDdG9yLCByZXF1ZXN0KTtcblxuICAgIGlmICghc2VsZi5ycGNJbXBsKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IGNhbGxiYWNrKEVycm9yKFwiYWxyZWFkeSBlbmRlZFwiKSk7IH0sIDApO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBzZWxmLnJwY0ltcGwoXG4gICAgICAgICAgICBtZXRob2QsXG4gICAgICAgICAgICByZXF1ZXN0Q3RvcltzZWxmLnJlcXVlc3REZWxpbWl0ZWQgPyBcImVuY29kZURlbGltaXRlZFwiIDogXCJlbmNvZGVcIl0ocmVxdWVzdCkuZmluaXNoKCksXG4gICAgICAgICAgICBmdW5jdGlvbiBycGNDYWxsYmFjayhlcnIsIHJlc3BvbnNlKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZW1pdChcImVycm9yXCIsIGVyciwgbWV0aG9kKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZW5kKC8qIGVuZGVkQnlSUEMgKi8gdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCEocmVzcG9uc2UgaW5zdGFuY2VvZiByZXNwb25zZUN0b3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IHJlc3BvbnNlQ3RvcltzZWxmLnJlc3BvbnNlRGVsaW1pdGVkID8gXCJkZWNvZGVEZWxpbWl0ZWRcIiA6IFwiZGVjb2RlXCJdKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmVtaXQoXCJlcnJvclwiLCBlcnIsIG1ldGhvZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNlbGYuZW1pdChcImRhdGFcIiwgcmVzcG9uc2UsIG1ldGhvZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgc2VsZi5lbWl0KFwiZXJyb3JcIiwgZXJyLCBtZXRob2QpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBjYWxsYmFjayhlcnIpOyB9LCAwKTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG59O1xuXG4vKipcbiAqIEVuZHMgdGhpcyBzZXJ2aWNlIGFuZCBlbWl0cyB0aGUgYGVuZGAgZXZlbnQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtlbmRlZEJ5UlBDPWZhbHNlXSBXaGV0aGVyIHRoZSBzZXJ2aWNlIGhhcyBiZWVuIGVuZGVkIGJ5IHRoZSBSUEMgaW1wbGVtZW50YXRpb24uXG4gKiBAcmV0dXJucyB7cnBjLlNlcnZpY2V9IGB0aGlzYFxuICovXG5TZXJ2aWNlLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiBlbmQoZW5kZWRCeVJQQykge1xuICAgIGlmICh0aGlzLnJwY0ltcGwpIHtcbiAgICAgICAgaWYgKCFlbmRlZEJ5UlBDKSAvLyBzaWduYWwgZW5kIHRvIHJwY0ltcGxcbiAgICAgICAgICAgIHRoaXMucnBjSW1wbChudWxsLCBudWxsLCBudWxsKTtcbiAgICAgICAgdGhpcy5ycGNJbXBsID0gbnVsbDtcbiAgICAgICAgdGhpcy5lbWl0KFwiZW5kXCIpLm9mZigpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gTG9uZ0JpdHM7XG5cbnZhciB1dGlsID0gcmVxdWlyZShcIi4uL3V0aWwvbWluaW1hbFwiKTtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIG5ldyBsb25nIGJpdHMuXG4gKiBAY2xhc3NkZXNjIEhlbHBlciBjbGFzcyBmb3Igd29ya2luZyB3aXRoIHRoZSBsb3cgYW5kIGhpZ2ggYml0cyBvZiBhIDY0IGJpdCB2YWx1ZS5cbiAqIEBtZW1iZXJvZiB1dGlsXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBsbyBMb3cgMzIgYml0cywgdW5zaWduZWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBoaSBIaWdoIDMyIGJpdHMsIHVuc2lnbmVkXG4gKi9cbmZ1bmN0aW9uIExvbmdCaXRzKGxvLCBoaSkge1xuXG4gICAgLy8gbm90ZSB0aGF0IHRoZSBjYXN0cyBiZWxvdyBhcmUgdGhlb3JldGljYWxseSB1bm5lY2Vzc2FyeSBhcyBvZiB0b2RheSwgYnV0IG9sZGVyIHN0YXRpY2FsbHlcbiAgICAvLyBnZW5lcmF0ZWQgY29udmVydGVyIGNvZGUgbWlnaHQgc3RpbGwgY2FsbCB0aGUgY3RvciB3aXRoIHNpZ25lZCAzMmJpdHMuIGtlcHQgZm9yIGNvbXBhdC5cblxuICAgIC8qKlxuICAgICAqIExvdyBiaXRzLlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5sbyA9IGxvID4+PiAwO1xuXG4gICAgLyoqXG4gICAgICogSGlnaCBiaXRzLlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5oaSA9IGhpID4+PiAwO1xufVxuXG4vKipcbiAqIFplcm8gYml0cy5cbiAqIEBtZW1iZXJvZiB1dGlsLkxvbmdCaXRzXG4gKiBAdHlwZSB7dXRpbC5Mb25nQml0c31cbiAqL1xudmFyIHplcm8gPSBMb25nQml0cy56ZXJvID0gbmV3IExvbmdCaXRzKDAsIDApO1xuXG56ZXJvLnRvTnVtYmVyID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuemVyby56ekVuY29kZSA9IHplcm8uenpEZWNvZGUgPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH07XG56ZXJvLmxlbmd0aCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMTsgfTtcblxuLyoqXG4gKiBaZXJvIGhhc2guXG4gKiBAbWVtYmVyb2YgdXRpbC5Mb25nQml0c1xuICogQHR5cGUge3N0cmluZ31cbiAqL1xudmFyIHplcm9IYXNoID0gTG9uZ0JpdHMuemVyb0hhc2ggPSBcIlxcMFxcMFxcMFxcMFxcMFxcMFxcMFxcMFwiO1xuXG4vKipcbiAqIENvbnN0cnVjdHMgbmV3IGxvbmcgYml0cyBmcm9tIHRoZSBzcGVjaWZpZWQgbnVtYmVyLlxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFZhbHVlXG4gKiBAcmV0dXJucyB7dXRpbC5Mb25nQml0c30gSW5zdGFuY2VcbiAqL1xuTG9uZ0JpdHMuZnJvbU51bWJlciA9IGZ1bmN0aW9uIGZyb21OdW1iZXIodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09IDApXG4gICAgICAgIHJldHVybiB6ZXJvO1xuICAgIHZhciBzaWduID0gdmFsdWUgPCAwO1xuICAgIGlmIChzaWduKVxuICAgICAgICB2YWx1ZSA9IC12YWx1ZTtcbiAgICB2YXIgbG8gPSB2YWx1ZSA+Pj4gMCxcbiAgICAgICAgaGkgPSAodmFsdWUgLSBsbykgLyA0Mjk0OTY3Mjk2ID4+PiAwO1xuICAgIGlmIChzaWduKSB7XG4gICAgICAgIGhpID0gfmhpID4+PiAwO1xuICAgICAgICBsbyA9IH5sbyA+Pj4gMDtcbiAgICAgICAgaWYgKCsrbG8gPiA0Mjk0OTY3Mjk1KSB7XG4gICAgICAgICAgICBsbyA9IDA7XG4gICAgICAgICAgICBpZiAoKytoaSA+IDQyOTQ5NjcyOTUpXG4gICAgICAgICAgICAgICAgaGkgPSAwO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXcgTG9uZ0JpdHMobG8sIGhpKTtcbn07XG5cbi8qKlxuICogQ29uc3RydWN0cyBuZXcgbG9uZyBiaXRzIGZyb20gYSBudW1iZXIsIGxvbmcgb3Igc3RyaW5nLlxuICogQHBhcmFtIHtMb25nfG51bWJlcnxzdHJpbmd9IHZhbHVlIFZhbHVlXG4gKiBAcmV0dXJucyB7dXRpbC5Mb25nQml0c30gSW5zdGFuY2VcbiAqL1xuTG9uZ0JpdHMuZnJvbSA9IGZ1bmN0aW9uIGZyb20odmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKVxuICAgICAgICByZXR1cm4gTG9uZ0JpdHMuZnJvbU51bWJlcih2YWx1ZSk7XG4gICAgaWYgKHV0aWwuaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgIGlmICh1dGlsLkxvbmcpXG4gICAgICAgICAgICB2YWx1ZSA9IHV0aWwuTG9uZy5mcm9tU3RyaW5nKHZhbHVlKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIExvbmdCaXRzLmZyb21OdW1iZXIocGFyc2VJbnQodmFsdWUsIDEwKSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZS5sb3cgfHwgdmFsdWUuaGlnaCA/IG5ldyBMb25nQml0cyh2YWx1ZS5sb3cgPj4+IDAsIHZhbHVlLmhpZ2ggPj4+IDApIDogemVybztcbn07XG5cbi8qKlxuICogQ29udmVydHMgdGhpcyBsb25nIGJpdHMgdG8gYSBwb3NzaWJseSB1bnNhZmUgSmF2YVNjcmlwdCBudW1iZXIuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFt1bnNpZ25lZD1mYWxzZV0gV2hldGhlciB1bnNpZ25lZCBvciBub3RcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFBvc3NpYmx5IHVuc2FmZSBudW1iZXJcbiAqL1xuTG9uZ0JpdHMucHJvdG90eXBlLnRvTnVtYmVyID0gZnVuY3Rpb24gdG9OdW1iZXIodW5zaWduZWQpIHtcbiAgICBpZiAoIXVuc2lnbmVkICYmIHRoaXMuaGkgPj4+IDMxKSB7XG4gICAgICAgIHZhciBsbyA9IH50aGlzLmxvICsgMSA+Pj4gMCxcbiAgICAgICAgICAgIGhpID0gfnRoaXMuaGkgICAgID4+PiAwO1xuICAgICAgICBpZiAoIWxvKVxuICAgICAgICAgICAgaGkgPSBoaSArIDEgPj4+IDA7XG4gICAgICAgIHJldHVybiAtKGxvICsgaGkgKiA0Mjk0OTY3Mjk2KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubG8gKyB0aGlzLmhpICogNDI5NDk2NzI5Njtcbn07XG5cbi8qKlxuICogQ29udmVydHMgdGhpcyBsb25nIGJpdHMgdG8gYSBsb25nLlxuICogQHBhcmFtIHtib29sZWFufSBbdW5zaWduZWQ9ZmFsc2VdIFdoZXRoZXIgdW5zaWduZWQgb3Igbm90XG4gKiBAcmV0dXJucyB7TG9uZ30gTG9uZ1xuICovXG5Mb25nQml0cy5wcm90b3R5cGUudG9Mb25nID0gZnVuY3Rpb24gdG9Mb25nKHVuc2lnbmVkKSB7XG4gICAgcmV0dXJuIHV0aWwuTG9uZ1xuICAgICAgICA/IG5ldyB1dGlsLkxvbmcodGhpcy5sbyB8IDAsIHRoaXMuaGkgfCAwLCBCb29sZWFuKHVuc2lnbmVkKSlcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgOiB7IGxvdzogdGhpcy5sbyB8IDAsIGhpZ2g6IHRoaXMuaGkgfCAwLCB1bnNpZ25lZDogQm9vbGVhbih1bnNpZ25lZCkgfTtcbn07XG5cbnZhciBjaGFyQ29kZUF0ID0gU3RyaW5nLnByb3RvdHlwZS5jaGFyQ29kZUF0O1xuXG4vKipcbiAqIENvbnN0cnVjdHMgbmV3IGxvbmcgYml0cyBmcm9tIHRoZSBzcGVjaWZpZWQgOCBjaGFyYWN0ZXJzIGxvbmcgaGFzaC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBoYXNoIEhhc2hcbiAqIEByZXR1cm5zIHt1dGlsLkxvbmdCaXRzfSBCaXRzXG4gKi9cbkxvbmdCaXRzLmZyb21IYXNoID0gZnVuY3Rpb24gZnJvbUhhc2goaGFzaCkge1xuICAgIGlmIChoYXNoID09PSB6ZXJvSGFzaClcbiAgICAgICAgcmV0dXJuIHplcm87XG4gICAgcmV0dXJuIG5ldyBMb25nQml0cyhcbiAgICAgICAgKCBjaGFyQ29kZUF0LmNhbGwoaGFzaCwgMClcbiAgICAgICAgfCBjaGFyQ29kZUF0LmNhbGwoaGFzaCwgMSkgPDwgOFxuICAgICAgICB8IGNoYXJDb2RlQXQuY2FsbChoYXNoLCAyKSA8PCAxNlxuICAgICAgICB8IGNoYXJDb2RlQXQuY2FsbChoYXNoLCAzKSA8PCAyNCkgPj4+IDBcbiAgICAsXG4gICAgICAgICggY2hhckNvZGVBdC5jYWxsKGhhc2gsIDQpXG4gICAgICAgIHwgY2hhckNvZGVBdC5jYWxsKGhhc2gsIDUpIDw8IDhcbiAgICAgICAgfCBjaGFyQ29kZUF0LmNhbGwoaGFzaCwgNikgPDwgMTZcbiAgICAgICAgfCBjaGFyQ29kZUF0LmNhbGwoaGFzaCwgNykgPDwgMjQpID4+PiAwXG4gICAgKTtcbn07XG5cbi8qKlxuICogQ29udmVydHMgdGhpcyBsb25nIGJpdHMgdG8gYSA4IGNoYXJhY3RlcnMgbG9uZyBoYXNoLlxuICogQHJldHVybnMge3N0cmluZ30gSGFzaFxuICovXG5Mb25nQml0cy5wcm90b3R5cGUudG9IYXNoID0gZnVuY3Rpb24gdG9IYXNoKCkge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKFxuICAgICAgICB0aGlzLmxvICAgICAgICAmIDI1NSxcbiAgICAgICAgdGhpcy5sbyA+Pj4gOCAgJiAyNTUsXG4gICAgICAgIHRoaXMubG8gPj4+IDE2ICYgMjU1LFxuICAgICAgICB0aGlzLmxvID4+PiAyNCAgICAgICxcbiAgICAgICAgdGhpcy5oaSAgICAgICAgJiAyNTUsXG4gICAgICAgIHRoaXMuaGkgPj4+IDggICYgMjU1LFxuICAgICAgICB0aGlzLmhpID4+PiAxNiAmIDI1NSxcbiAgICAgICAgdGhpcy5oaSA+Pj4gMjRcbiAgICApO1xufTtcblxuLyoqXG4gKiBaaWctemFnIGVuY29kZXMgdGhpcyBsb25nIGJpdHMuXG4gKiBAcmV0dXJucyB7dXRpbC5Mb25nQml0c30gYHRoaXNgXG4gKi9cbkxvbmdCaXRzLnByb3RvdHlwZS56ekVuY29kZSA9IGZ1bmN0aW9uIHp6RW5jb2RlKCkge1xuICAgIHZhciBtYXNrID0gICB0aGlzLmhpID4+IDMxO1xuICAgIHRoaXMuaGkgID0gKCh0aGlzLmhpIDw8IDEgfCB0aGlzLmxvID4+PiAzMSkgXiBtYXNrKSA+Pj4gMDtcbiAgICB0aGlzLmxvICA9ICggdGhpcy5sbyA8PCAxICAgICAgICAgICAgICAgICAgIF4gbWFzaykgPj4+IDA7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFppZy16YWcgZGVjb2RlcyB0aGlzIGxvbmcgYml0cy5cbiAqIEByZXR1cm5zIHt1dGlsLkxvbmdCaXRzfSBgdGhpc2BcbiAqL1xuTG9uZ0JpdHMucHJvdG90eXBlLnp6RGVjb2RlID0gZnVuY3Rpb24genpEZWNvZGUoKSB7XG4gICAgdmFyIG1hc2sgPSAtKHRoaXMubG8gJiAxKTtcbiAgICB0aGlzLmxvICA9ICgodGhpcy5sbyA+Pj4gMSB8IHRoaXMuaGkgPDwgMzEpIF4gbWFzaykgPj4+IDA7XG4gICAgdGhpcy5oaSAgPSAoIHRoaXMuaGkgPj4+IDEgICAgICAgICAgICAgICAgICBeIG1hc2spID4+PiAwO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgdGhpcyBsb25nYml0cyB3aGVuIGVuY29kZWQgYXMgYSB2YXJpbnQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBMZW5ndGhcbiAqL1xuTG9uZ0JpdHMucHJvdG90eXBlLmxlbmd0aCA9IGZ1bmN0aW9uIGxlbmd0aCgpIHtcbiAgICB2YXIgcGFydDAgPSAgdGhpcy5sbyxcbiAgICAgICAgcGFydDEgPSAodGhpcy5sbyA+Pj4gMjggfCB0aGlzLmhpIDw8IDQpID4+PiAwLFxuICAgICAgICBwYXJ0MiA9ICB0aGlzLmhpID4+PiAyNDtcbiAgICByZXR1cm4gcGFydDIgPT09IDBcbiAgICAgICAgID8gcGFydDEgPT09IDBcbiAgICAgICAgICAgPyBwYXJ0MCA8IDE2Mzg0XG4gICAgICAgICAgICAgPyBwYXJ0MCA8IDEyOCA/IDEgOiAyXG4gICAgICAgICAgICAgOiBwYXJ0MCA8IDIwOTcxNTIgPyAzIDogNFxuICAgICAgICAgICA6IHBhcnQxIDwgMTYzODRcbiAgICAgICAgICAgICA/IHBhcnQxIDwgMTI4ID8gNSA6IDZcbiAgICAgICAgICAgICA6IHBhcnQxIDwgMjA5NzE1MiA/IDcgOiA4XG4gICAgICAgICA6IHBhcnQyIDwgMTI4ID8gOSA6IDEwO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIHV0aWwgPSBleHBvcnRzO1xuXG4vLyB1c2VkIHRvIHJldHVybiBhIFByb21pc2Ugd2hlcmUgY2FsbGJhY2sgaXMgb21pdHRlZFxudXRpbC5hc1Byb21pc2UgPSByZXF1aXJlKFwiQHByb3RvYnVmanMvYXNwcm9taXNlXCIpO1xuXG4vLyBjb252ZXJ0cyB0byAvIGZyb20gYmFzZTY0IGVuY29kZWQgc3RyaW5nc1xudXRpbC5iYXNlNjQgPSByZXF1aXJlKFwiQHByb3RvYnVmanMvYmFzZTY0XCIpO1xuXG4vLyBiYXNlIGNsYXNzIG9mIHJwYy5TZXJ2aWNlXG51dGlsLkV2ZW50RW1pdHRlciA9IHJlcXVpcmUoXCJAcHJvdG9idWZqcy9ldmVudGVtaXR0ZXJcIik7XG5cbi8vIGZsb2F0IGhhbmRsaW5nIGFjY3Jvc3MgYnJvd3NlcnNcbnV0aWwuZmxvYXQgPSByZXF1aXJlKFwiQHByb3RvYnVmanMvZmxvYXRcIik7XG5cbi8vIHJlcXVpcmVzIG1vZHVsZXMgb3B0aW9uYWxseSBhbmQgaGlkZXMgdGhlIGNhbGwgZnJvbSBidW5kbGVyc1xudXRpbC5pbnF1aXJlID0gcmVxdWlyZShcIkBwcm90b2J1ZmpzL2lucXVpcmVcIik7XG5cbi8vIGNvbnZlcnRzIHRvIC8gZnJvbSB1dGY4IGVuY29kZWQgc3RyaW5nc1xudXRpbC51dGY4ID0gcmVxdWlyZShcIkBwcm90b2J1ZmpzL3V0ZjhcIik7XG5cbi8vIHByb3ZpZGVzIGEgbm9kZS1saWtlIGJ1ZmZlciBwb29sIGluIHRoZSBicm93c2VyXG51dGlsLnBvb2wgPSByZXF1aXJlKFwiQHByb3RvYnVmanMvcG9vbFwiKTtcblxuLy8gdXRpbGl0eSB0byB3b3JrIHdpdGggdGhlIGxvdyBhbmQgaGlnaCBiaXRzIG9mIGEgNjQgYml0IHZhbHVlXG51dGlsLkxvbmdCaXRzID0gcmVxdWlyZShcIi4vbG9uZ2JpdHNcIik7XG5cbi8qKlxuICogV2hldGhlciBydW5uaW5nIHdpdGhpbiBub2RlIG9yIG5vdC5cbiAqIEBtZW1iZXJvZiB1dGlsXG4gKiBAdHlwZSB7Ym9vbGVhbn1cbiAqL1xudXRpbC5pc05vZGUgPSBCb29sZWFuKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCJcbiAgICAgICAgICAgICAgICAgICAmJiBnbG9iYWxcbiAgICAgICAgICAgICAgICAgICAmJiBnbG9iYWwucHJvY2Vzc1xuICAgICAgICAgICAgICAgICAgICYmIGdsb2JhbC5wcm9jZXNzLnZlcnNpb25zXG4gICAgICAgICAgICAgICAgICAgJiYgZ2xvYmFsLnByb2Nlc3MudmVyc2lvbnMubm9kZSk7XG5cbi8qKlxuICogR2xvYmFsIG9iamVjdCByZWZlcmVuY2UuXG4gKiBAbWVtYmVyb2YgdXRpbFxuICogQHR5cGUge09iamVjdH1cbiAqL1xudXRpbC5nbG9iYWwgPSB1dGlsLmlzTm9kZSAmJiBnbG9iYWxcbiAgICAgICAgICAgfHwgdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3dcbiAgICAgICAgICAgfHwgdHlwZW9mIHNlbGYgICAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmXG4gICAgICAgICAgIHx8IHRoaXM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8taW52YWxpZC10aGlzXG5cbi8qKlxuICogQW4gaW1tdWFibGUgZW1wdHkgYXJyYXkuXG4gKiBAbWVtYmVyb2YgdXRpbFxuICogQHR5cGUge0FycmF5LjwqPn1cbiAqIEBjb25zdFxuICovXG51dGlsLmVtcHR5QXJyYXkgPSBPYmplY3QuZnJlZXplID8gT2JqZWN0LmZyZWV6ZShbXSkgOiAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyBbXTsgLy8gdXNlZCBvbiBwcm90b3R5cGVzXG5cbi8qKlxuICogQW4gaW1tdXRhYmxlIGVtcHR5IG9iamVjdC5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAY29uc3RcbiAqL1xudXRpbC5lbXB0eU9iamVjdCA9IE9iamVjdC5mcmVlemUgPyBPYmplY3QuZnJlZXplKHt9KSA6IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIHt9OyAvLyB1c2VkIG9uIHByb3RvdHlwZXNcblxuLyoqXG4gKiBUZXN0cyBpZiB0aGUgc3BlY2lmaWVkIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgdmFsdWUgaXMgYW4gaW50ZWdlclxuICovXG51dGlsLmlzSW50ZWdlciA9IE51bWJlci5pc0ludGVnZXIgfHwgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiAmJiBpc0Zpbml0ZSh2YWx1ZSkgJiYgTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlO1xufTtcblxuLyoqXG4gKiBUZXN0cyBpZiB0aGUgc3BlY2lmaWVkIHZhbHVlIGlzIGEgc3RyaW5nLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBWYWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZ1xuICovXG51dGlsLmlzU3RyaW5nID0gZnVuY3Rpb24gaXNTdHJpbmcodmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiIHx8IHZhbHVlIGluc3RhbmNlb2YgU3RyaW5nO1xufTtcblxuLyoqXG4gKiBUZXN0cyBpZiB0aGUgc3BlY2lmaWVkIHZhbHVlIGlzIGEgbm9uLW51bGwgb2JqZWN0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBWYWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHRoZSB2YWx1ZSBpcyBhIG5vbi1udWxsIG9iamVjdFxuICovXG51dGlsLmlzT2JqZWN0ID0gZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiO1xufTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBwcm9wZXJ0eSBvbiBhIG1lc3NhZ2UgaXMgY29uc2lkZXJlZCB0byBiZSBwcmVzZW50LlxuICogVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgdXRpbC5pc1NldH0uXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogUGxhaW4gb2JqZWN0IG9yIG1lc3NhZ2UgaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wIFByb3BlcnR5IG5hbWVcbiAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgY29uc2lkZXJlZCB0byBiZSBwcmVzZW50LCBvdGhlcndpc2UgYGZhbHNlYFxuICovXG51dGlsLmlzc2V0ID1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBwcm9wZXJ0eSBvbiBhIG1lc3NhZ2UgaXMgY29uc2lkZXJlZCB0byBiZSBwcmVzZW50LlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBQbGFpbiBvYmplY3Qgb3IgbWVzc2FnZSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IHByb3AgUHJvcGVydHkgbmFtZVxuICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiBjb25zaWRlcmVkIHRvIGJlIHByZXNlbnQsIG90aGVyd2lzZSBgZmFsc2VgXG4gKi9cbnV0aWwuaXNTZXQgPSBmdW5jdGlvbiBpc1NldChvYmosIHByb3ApIHtcbiAgICB2YXIgdmFsdWUgPSBvYmpbcHJvcF07XG4gICAgaWYgKHZhbHVlICE9IG51bGwgJiYgb2JqLmhhc093blByb3BlcnR5KHByb3ApKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGVxZXFlcSwgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgfHwgKEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUubGVuZ3RoIDogT2JqZWN0LmtleXModmFsdWUpLmxlbmd0aCkgPiAwO1xuICAgIHJldHVybiBmYWxzZTtcbn07XG5cbi8qKlxuICogQW55IGNvbXBhdGlibGUgQnVmZmVyIGluc3RhbmNlLlxuICogVGhpcyBpcyBhIG1pbmltYWwgc3RhbmQtYWxvbmUgZGVmaW5pdGlvbiBvZiBhIEJ1ZmZlciBpbnN0YW5jZS4gVGhlIGFjdHVhbCB0eXBlIGlzIHRoYXQgZXhwb3J0ZWQgYnkgbm9kZSdzIHR5cGluZ3MuXG4gKiBAaW50ZXJmYWNlIEJ1ZmZlclxuICogQGV4dGVuZHMgVWludDhBcnJheVxuICovXG5cbi8qKlxuICogTm9kZSdzIEJ1ZmZlciBjbGFzcyBpZiBhdmFpbGFibGUuXG4gKiBAdHlwZSB7Q29uc3RydWN0b3I8QnVmZmVyPn1cbiAqL1xudXRpbC5CdWZmZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIEJ1ZmZlciA9IHV0aWwuaW5xdWlyZShcImJ1ZmZlclwiKS5CdWZmZXI7XG4gICAgICAgIC8vIHJlZnVzZSB0byB1c2Ugbm9uLW5vZGUgYnVmZmVycyBpZiBub3QgZXhwbGljaXRseSBhc3NpZ25lZCAocGVyZiByZWFzb25zKTpcbiAgICAgICAgcmV0dXJuIEJ1ZmZlci5wcm90b3R5cGUudXRmOFdyaXRlID8gQnVmZmVyIDogLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gbnVsbDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn0pKCk7XG5cbi8vIEludGVybmFsIGFsaWFzIG9mIG9yIHBvbHlmdWxsIGZvciBCdWZmZXIuZnJvbS5cbnV0aWwuX0J1ZmZlcl9mcm9tID0gbnVsbDtcblxuLy8gSW50ZXJuYWwgYWxpYXMgb2Ygb3IgcG9seWZpbGwgZm9yIEJ1ZmZlci5hbGxvY1Vuc2FmZS5cbnV0aWwuX0J1ZmZlcl9hbGxvY1Vuc2FmZSA9IG51bGw7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBidWZmZXIgb2Ygd2hhdGV2ZXIgdHlwZSBzdXBwb3J0ZWQgYnkgdGhlIGVudmlyb25tZW50LlxuICogQHBhcmFtIHtudW1iZXJ8bnVtYmVyW119IFtzaXplT3JBcnJheT0wXSBCdWZmZXIgc2l6ZSBvciBudW1iZXIgYXJyYXlcbiAqIEByZXR1cm5zIHtVaW50OEFycmF5fEJ1ZmZlcn0gQnVmZmVyXG4gKi9cbnV0aWwubmV3QnVmZmVyID0gZnVuY3Rpb24gbmV3QnVmZmVyKHNpemVPckFycmF5KSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICByZXR1cm4gdHlwZW9mIHNpemVPckFycmF5ID09PSBcIm51bWJlclwiXG4gICAgICAgID8gdXRpbC5CdWZmZXJcbiAgICAgICAgICAgID8gdXRpbC5fQnVmZmVyX2FsbG9jVW5zYWZlKHNpemVPckFycmF5KVxuICAgICAgICAgICAgOiBuZXcgdXRpbC5BcnJheShzaXplT3JBcnJheSlcbiAgICAgICAgOiB1dGlsLkJ1ZmZlclxuICAgICAgICAgICAgPyB1dGlsLl9CdWZmZXJfZnJvbShzaXplT3JBcnJheSlcbiAgICAgICAgICAgIDogdHlwZW9mIFVpbnQ4QXJyYXkgPT09IFwidW5kZWZpbmVkXCJcbiAgICAgICAgICAgICAgICA/IHNpemVPckFycmF5XG4gICAgICAgICAgICAgICAgOiBuZXcgVWludDhBcnJheShzaXplT3JBcnJheSk7XG59O1xuXG4vKipcbiAqIEFycmF5IGltcGxlbWVudGF0aW9uIHVzZWQgaW4gdGhlIGJyb3dzZXIuIGBVaW50OEFycmF5YCBpZiBzdXBwb3J0ZWQsIG90aGVyd2lzZSBgQXJyYXlgLlxuICogQHR5cGUge0NvbnN0cnVjdG9yPFVpbnQ4QXJyYXk+fVxuICovXG51dGlsLkFycmF5ID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09IFwidW5kZWZpbmVkXCIgPyBVaW50OEFycmF5IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIDogQXJyYXk7XG5cbi8qKlxuICogQW55IGNvbXBhdGlibGUgTG9uZyBpbnN0YW5jZS5cbiAqIFRoaXMgaXMgYSBtaW5pbWFsIHN0YW5kLWFsb25lIGRlZmluaXRpb24gb2YgYSBMb25nIGluc3RhbmNlLiBUaGUgYWN0dWFsIHR5cGUgaXMgdGhhdCBleHBvcnRlZCBieSBsb25nLmpzLlxuICogQGludGVyZmFjZSBMb25nXG4gKiBAcHJvcGVydHkge251bWJlcn0gbG93IExvdyBiaXRzXG4gKiBAcHJvcGVydHkge251bWJlcn0gaGlnaCBIaWdoIGJpdHNcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gdW5zaWduZWQgV2hldGhlciB1bnNpZ25lZCBvciBub3RcbiAqL1xuXG4vKipcbiAqIExvbmcuanMncyBMb25nIGNsYXNzIGlmIGF2YWlsYWJsZS5cbiAqIEB0eXBlIHtDb25zdHJ1Y3RvcjxMb25nPn1cbiAqL1xudXRpbC5Mb25nID0gLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gdXRpbC5nbG9iYWwuZGNvZGVJTyAmJiAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyB1dGlsLmdsb2JhbC5kY29kZUlPLkxvbmdcbiAgICAgICAgIHx8IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIHV0aWwuZ2xvYmFsLkxvbmdcbiAgICAgICAgIHx8IHV0aWwuaW5xdWlyZShcImxvbmdcIik7XG5cbi8qKlxuICogUmVndWxhciBleHByZXNzaW9uIHVzZWQgdG8gdmVyaWZ5IDIgYml0IChgYm9vbGApIG1hcCBrZXlzLlxuICogQHR5cGUge1JlZ0V4cH1cbiAqIEBjb25zdFxuICovXG51dGlsLmtleTJSZSA9IC9edHJ1ZXxmYWxzZXwwfDEkLztcblxuLyoqXG4gKiBSZWd1bGFyIGV4cHJlc3Npb24gdXNlZCB0byB2ZXJpZnkgMzIgYml0IChgaW50MzJgIGV0Yy4pIG1hcCBrZXlzLlxuICogQHR5cGUge1JlZ0V4cH1cbiAqIEBjb25zdFxuICovXG51dGlsLmtleTMyUmUgPSAvXi0/KD86MHxbMS05XVswLTldKikkLztcblxuLyoqXG4gKiBSZWd1bGFyIGV4cHJlc3Npb24gdXNlZCB0byB2ZXJpZnkgNjQgYml0IChgaW50NjRgIGV0Yy4pIG1hcCBrZXlzLlxuICogQHR5cGUge1JlZ0V4cH1cbiAqIEBjb25zdFxuICovXG51dGlsLmtleTY0UmUgPSAvXig/OltcXFxceDAwLVxcXFx4ZmZdezh9fC0/KD86MHxbMS05XVswLTldKikpJC87XG5cbi8qKlxuICogQ29udmVydHMgYSBudW1iZXIgb3IgbG9uZyB0byBhbiA4IGNoYXJhY3RlcnMgbG9uZyBoYXNoIHN0cmluZy5cbiAqIEBwYXJhbSB7TG9uZ3xudW1iZXJ9IHZhbHVlIFZhbHVlIHRvIGNvbnZlcnRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEhhc2hcbiAqL1xudXRpbC5sb25nVG9IYXNoID0gZnVuY3Rpb24gbG9uZ1RvSGFzaCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZVxuICAgICAgICA/IHV0aWwuTG9uZ0JpdHMuZnJvbSh2YWx1ZSkudG9IYXNoKClcbiAgICAgICAgOiB1dGlsLkxvbmdCaXRzLnplcm9IYXNoO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBhbiA4IGNoYXJhY3RlcnMgbG9uZyBoYXNoIHN0cmluZyB0byBhIGxvbmcgb3IgbnVtYmVyLlxuICogQHBhcmFtIHtzdHJpbmd9IGhhc2ggSGFzaFxuICogQHBhcmFtIHtib29sZWFufSBbdW5zaWduZWQ9ZmFsc2VdIFdoZXRoZXIgdW5zaWduZWQgb3Igbm90XG4gKiBAcmV0dXJucyB7TG9uZ3xudW1iZXJ9IE9yaWdpbmFsIHZhbHVlXG4gKi9cbnV0aWwubG9uZ0Zyb21IYXNoID0gZnVuY3Rpb24gbG9uZ0Zyb21IYXNoKGhhc2gsIHVuc2lnbmVkKSB7XG4gICAgdmFyIGJpdHMgPSB1dGlsLkxvbmdCaXRzLmZyb21IYXNoKGhhc2gpO1xuICAgIGlmICh1dGlsLkxvbmcpXG4gICAgICAgIHJldHVybiB1dGlsLkxvbmcuZnJvbUJpdHMoYml0cy5sbywgYml0cy5oaSwgdW5zaWduZWQpO1xuICAgIHJldHVybiBiaXRzLnRvTnVtYmVyKEJvb2xlYW4odW5zaWduZWQpKTtcbn07XG5cbi8qKlxuICogTWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSBzb3VyY2Ugb2JqZWN0IGludG8gdGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBtZW1iZXJvZiB1dGlsXG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBkc3QgRGVzdGluYXRpb24gb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBzcmMgU291cmNlIG9iamVjdFxuICogQHBhcmFtIHtib29sZWFufSBbaWZOb3RTZXQ9ZmFsc2VdIE1lcmdlcyBvbmx5IGlmIHRoZSBrZXkgaXMgbm90IGFscmVhZHkgc2V0XG4gKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IERlc3RpbmF0aW9uIG9iamVjdFxuICovXG5mdW5jdGlvbiBtZXJnZShkc3QsIHNyYywgaWZOb3RTZXQpIHsgLy8gdXNlZCBieSBjb252ZXJ0ZXJzXG4gICAgZm9yICh2YXIga2V5cyA9IE9iamVjdC5rZXlzKHNyYyksIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSlcbiAgICAgICAgaWYgKGRzdFtrZXlzW2ldXSA9PT0gdW5kZWZpbmVkIHx8ICFpZk5vdFNldClcbiAgICAgICAgICAgIGRzdFtrZXlzW2ldXSA9IHNyY1trZXlzW2ldXTtcbiAgICByZXR1cm4gZHN0O1xufVxuXG51dGlsLm1lcmdlID0gbWVyZ2U7XG5cbi8qKlxuICogQ29udmVydHMgdGhlIGZpcnN0IGNoYXJhY3RlciBvZiBhIHN0cmluZyB0byBsb3dlciBjYXNlLlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciBTdHJpbmcgdG8gY29udmVydFxuICogQHJldHVybnMge3N0cmluZ30gQ29udmVydGVkIHN0cmluZ1xuICovXG51dGlsLmxjRmlyc3QgPSBmdW5jdGlvbiBsY0ZpcnN0KHN0cikge1xuICAgIHJldHVybiBzdHIuY2hhckF0KDApLnRvTG93ZXJDYXNlKCkgKyBzdHIuc3Vic3RyaW5nKDEpO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgY3VzdG9tIGVycm9yIGNvbnN0cnVjdG9yLlxuICogQG1lbWJlcm9mIHV0aWxcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIEVycm9yIG5hbWVcbiAqIEByZXR1cm5zIHtDb25zdHJ1Y3RvcjxFcnJvcj59IEN1c3RvbSBlcnJvciBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBuZXdFcnJvcihuYW1lKSB7XG5cbiAgICBmdW5jdGlvbiBDdXN0b21FcnJvcihtZXNzYWdlLCBwcm9wZXJ0aWVzKSB7XG5cbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEN1c3RvbUVycm9yKSlcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ3VzdG9tRXJyb3IobWVzc2FnZSwgcHJvcGVydGllcyk7XG5cbiAgICAgICAgLy8gRXJyb3IuY2FsbCh0aGlzLCBtZXNzYWdlKTtcbiAgICAgICAgLy8gXiBqdXN0IHJldHVybnMgYSBuZXcgZXJyb3IgaW5zdGFuY2UgYmVjYXVzZSB0aGUgY3RvciBjYW4gYmUgY2FsbGVkIGFzIGEgZnVuY3Rpb25cblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJtZXNzYWdlXCIsIHsgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1lc3NhZ2U7IH0gfSk7XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSAvLyBub2RlXG4gICAgICAgICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCBDdXN0b21FcnJvcik7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcInN0YWNrXCIsIHsgdmFsdWU6IG5ldyBFcnJvcigpLnN0YWNrIHx8IFwiXCIgfSk7XG5cbiAgICAgICAgaWYgKHByb3BlcnRpZXMpXG4gICAgICAgICAgICBtZXJnZSh0aGlzLCBwcm9wZXJ0aWVzKTtcbiAgICB9XG5cbiAgICAoQ3VzdG9tRXJyb3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpKS5jb25zdHJ1Y3RvciA9IEN1c3RvbUVycm9yO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEN1c3RvbUVycm9yLnByb3RvdHlwZSwgXCJuYW1lXCIsIHsgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG5hbWU7IH0gfSk7XG5cbiAgICBDdXN0b21FcnJvci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZSArIFwiOiBcIiArIHRoaXMubWVzc2FnZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEN1c3RvbUVycm9yO1xufVxuXG51dGlsLm5ld0Vycm9yID0gbmV3RXJyb3I7XG5cbi8qKlxuICogQ29uc3RydWN0cyBhIG5ldyBwcm90b2NvbCBlcnJvci5cbiAqIEBjbGFzc2Rlc2MgRXJyb3Igc3ViY2xhc3MgaW5kaWNhdGluZyBhIHByb3RvY29sIHNwZWNpZmMgZXJyb3IuXG4gKiBAbWVtYmVyb2YgdXRpbFxuICogQGV4dGVuZHMgRXJyb3JcbiAqIEB0ZW1wbGF0ZSBUIGV4dGVuZHMgTWVzc2FnZTxUPlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBFcnJvciBtZXNzYWdlXG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBbcHJvcGVydGllc10gQWRkaXRpb25hbCBwcm9wZXJ0aWVzXG4gKiBAZXhhbXBsZVxuICogdHJ5IHtcbiAqICAgICBNeU1lc3NhZ2UuZGVjb2RlKHNvbWVCdWZmZXIpOyAvLyB0aHJvd3MgaWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXG4gKiB9IGNhdGNoIChlKSB7XG4gKiAgICAgaWYgKGUgaW5zdGFuY2VvZiBQcm90b2NvbEVycm9yICYmIGUuaW5zdGFuY2UpXG4gKiAgICAgICAgIGNvbnNvbGUubG9nKFwiZGVjb2RlZCBzbyBmYXI6IFwiICsgSlNPTi5zdHJpbmdpZnkoZS5pbnN0YW5jZSkpO1xuICogfVxuICovXG51dGlsLlByb3RvY29sRXJyb3IgPSBuZXdFcnJvcihcIlByb3RvY29sRXJyb3JcIik7XG5cbi8qKlxuICogU28gZmFyIGRlY29kZWQgbWVzc2FnZSBpbnN0YW5jZS5cbiAqIEBuYW1lIHV0aWwuUHJvdG9jb2xFcnJvciNpbnN0YW5jZVxuICogQHR5cGUge01lc3NhZ2U8VD59XG4gKi9cblxuLyoqXG4gKiBBIE9uZU9mIGdldHRlciBhcyByZXR1cm5lZCBieSB7QGxpbmsgdXRpbC5vbmVPZkdldHRlcn0uXG4gKiBAdHlwZWRlZiBPbmVPZkdldHRlclxuICogQHR5cGUge2Z1bmN0aW9ufVxuICogQHJldHVybnMge3N0cmluZ3x1bmRlZmluZWR9IFNldCBmaWVsZCBuYW1lLCBpZiBhbnlcbiAqL1xuXG4vKipcbiAqIEJ1aWxkcyBhIGdldHRlciBmb3IgYSBvbmVvZidzIHByZXNlbnQgZmllbGQgbmFtZS5cbiAqIEBwYXJhbSB7c3RyaW5nW119IGZpZWxkTmFtZXMgRmllbGQgbmFtZXNcbiAqIEByZXR1cm5zIHtPbmVPZkdldHRlcn0gVW5ib3VuZCBnZXR0ZXJcbiAqL1xudXRpbC5vbmVPZkdldHRlciA9IGZ1bmN0aW9uIGdldE9uZU9mKGZpZWxkTmFtZXMpIHtcbiAgICB2YXIgZmllbGRNYXAgPSB7fTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpZWxkTmFtZXMubGVuZ3RoOyArK2kpXG4gICAgICAgIGZpZWxkTWFwW2ZpZWxkTmFtZXNbaV1dID0gMTtcblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd8dW5kZWZpbmVkfSBTZXQgZmllbGQgbmFtZSwgaWYgYW55XG4gICAgICogQHRoaXMgT2JqZWN0XG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHJldHVybiBmdW5jdGlvbigpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICAgICAgICBmb3IgKHZhciBrZXlzID0gT2JqZWN0LmtleXModGhpcyksIGkgPSBrZXlzLmxlbmd0aCAtIDE7IGkgPiAtMTsgLS1pKVxuICAgICAgICAgICAgaWYgKGZpZWxkTWFwW2tleXNbaV1dID09PSAxICYmIHRoaXNba2V5c1tpXV0gIT09IHVuZGVmaW5lZCAmJiB0aGlzW2tleXNbaV1dICE9PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiBrZXlzW2ldO1xuICAgIH07XG59O1xuXG4vKipcbiAqIEEgT25lT2Ygc2V0dGVyIGFzIHJldHVybmVkIGJ5IHtAbGluayB1dGlsLm9uZU9mU2V0dGVyfS5cbiAqIEB0eXBlZGVmIE9uZU9mU2V0dGVyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKiBAcGFyYW0ge3N0cmluZ3x1bmRlZmluZWR9IHZhbHVlIEZpZWxkIG5hbWVcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gKi9cblxuLyoqXG4gKiBCdWlsZHMgYSBzZXR0ZXIgZm9yIGEgb25lb2YncyBwcmVzZW50IGZpZWxkIG5hbWUuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBmaWVsZE5hbWVzIEZpZWxkIG5hbWVzXG4gKiBAcmV0dXJucyB7T25lT2ZTZXR0ZXJ9IFVuYm91bmQgc2V0dGVyXG4gKi9cbnV0aWwub25lT2ZTZXR0ZXIgPSBmdW5jdGlvbiBzZXRPbmVPZihmaWVsZE5hbWVzKSB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBGaWVsZCBuYW1lXG4gICAgICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAgICAgKiBAdGhpcyBPYmplY3RcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgcmV0dXJuIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWVsZE5hbWVzLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgaWYgKGZpZWxkTmFtZXNbaV0gIT09IG5hbWUpXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXNbZmllbGROYW1lc1tpXV07XG4gICAgfTtcbn07XG5cbi8qKlxuICogRGVmYXVsdCBjb252ZXJzaW9uIG9wdGlvbnMgdXNlZCBmb3Ige0BsaW5rIE1lc3NhZ2UjdG9KU09OfSBpbXBsZW1lbnRhdGlvbnMuXG4gKlxuICogVGhlc2Ugb3B0aW9ucyBhcmUgY2xvc2UgdG8gcHJvdG8zJ3MgSlNPTiBtYXBwaW5nIHdpdGggdGhlIGV4Y2VwdGlvbiB0aGF0IGludGVybmFsIHR5cGVzIGxpa2UgQW55IGFyZSBoYW5kbGVkIGp1c3QgbGlrZSBtZXNzYWdlcy4gTW9yZSBwcmVjaXNlbHk6XG4gKlxuICogLSBMb25ncyBiZWNvbWUgc3RyaW5nc1xuICogLSBFbnVtcyBiZWNvbWUgc3RyaW5nIGtleXNcbiAqIC0gQnl0ZXMgYmVjb21lIGJhc2U2NCBlbmNvZGVkIHN0cmluZ3NcbiAqIC0gKFN1Yi0pTWVzc2FnZXMgYmVjb21lIHBsYWluIG9iamVjdHNcbiAqIC0gTWFwcyBiZWNvbWUgcGxhaW4gb2JqZWN0cyB3aXRoIGFsbCBzdHJpbmcga2V5c1xuICogLSBSZXBlYXRlZCBmaWVsZHMgYmVjb21lIGFycmF5c1xuICogLSBOYU4gYW5kIEluZmluaXR5IGZvciBmbG9hdCBhbmQgZG91YmxlIGZpZWxkcyBiZWNvbWUgc3RyaW5nc1xuICpcbiAqIEB0eXBlIHtJQ29udmVyc2lvbk9wdGlvbnN9XG4gKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3Byb3RvY29sLWJ1ZmZlcnMvZG9jcy9wcm90bzM/aGw9ZW4janNvblxuICovXG51dGlsLnRvSlNPTk9wdGlvbnMgPSB7XG4gICAgbG9uZ3M6IFN0cmluZyxcbiAgICBlbnVtczogU3RyaW5nLFxuICAgIGJ5dGVzOiBTdHJpbmcsXG4gICAganNvbjogdHJ1ZVxufTtcblxuLy8gU2V0cyB1cCBidWZmZXIgdXRpbGl0eSBhY2NvcmRpbmcgdG8gdGhlIGVudmlyb25tZW50IChjYWxsZWQgaW4gaW5kZXgtbWluaW1hbClcbnV0aWwuX2NvbmZpZ3VyZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBCdWZmZXIgPSB1dGlsLkJ1ZmZlcjtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoIUJ1ZmZlcikge1xuICAgICAgICB1dGlsLl9CdWZmZXJfZnJvbSA9IHV0aWwuX0J1ZmZlcl9hbGxvY1Vuc2FmZSA9IG51bGw7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gYmVjYXVzZSBub2RlIDQueCBidWZmZXJzIGFyZSBpbmNvbXBhdGlibGUgJiBpbW11dGFibGVcbiAgICAvLyBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kY29kZUlPL3Byb3RvYnVmLmpzL3B1bGwvNjY1XG4gICAgdXRpbC5fQnVmZmVyX2Zyb20gPSBCdWZmZXIuZnJvbSAhPT0gVWludDhBcnJheS5mcm9tICYmIEJ1ZmZlci5mcm9tIHx8XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIGZ1bmN0aW9uIEJ1ZmZlcl9mcm9tKHZhbHVlLCBlbmNvZGluZykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBCdWZmZXIodmFsdWUsIGVuY29kaW5nKTtcbiAgICAgICAgfTtcbiAgICB1dGlsLl9CdWZmZXJfYWxsb2NVbnNhZmUgPSBCdWZmZXIuYWxsb2NVbnNhZmUgfHxcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgZnVuY3Rpb24gQnVmZmVyX2FsbG9jVW5zYWZlKHNpemUpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQnVmZmVyKHNpemUpO1xuICAgICAgICB9O1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBXcml0ZXI7XG5cbnZhciB1dGlsICAgICAgPSByZXF1aXJlKFwiLi91dGlsL21pbmltYWxcIik7XG5cbnZhciBCdWZmZXJXcml0ZXI7IC8vIGN5Y2xpY1xuXG52YXIgTG9uZ0JpdHMgID0gdXRpbC5Mb25nQml0cyxcbiAgICBiYXNlNjQgICAgPSB1dGlsLmJhc2U2NCxcbiAgICB1dGY4ICAgICAgPSB1dGlsLnV0Zjg7XG5cbi8qKlxuICogQ29uc3RydWN0cyBhIG5ldyB3cml0ZXIgb3BlcmF0aW9uIGluc3RhbmNlLlxuICogQGNsYXNzZGVzYyBTY2hlZHVsZWQgd3JpdGVyIG9wZXJhdGlvbi5cbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtmdW5jdGlvbigqLCBVaW50OEFycmF5LCBudW1iZXIpfSBmbiBGdW5jdGlvbiB0byBjYWxsXG4gKiBAcGFyYW0ge251bWJlcn0gbGVuIFZhbHVlIGJ5dGUgbGVuZ3RoXG4gKiBAcGFyYW0geyp9IHZhbCBWYWx1ZSB0byB3cml0ZVxuICogQGlnbm9yZVxuICovXG5mdW5jdGlvbiBPcChmbiwgbGVuLCB2YWwpIHtcblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGNhbGwuXG4gICAgICogQHR5cGUge2Z1bmN0aW9uKFVpbnQ4QXJyYXksIG51bWJlciwgKil9XG4gICAgICovXG4gICAgdGhpcy5mbiA9IGZuO1xuXG4gICAgLyoqXG4gICAgICogVmFsdWUgYnl0ZSBsZW5ndGguXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLmxlbiA9IGxlbjtcblxuICAgIC8qKlxuICAgICAqIE5leHQgb3BlcmF0aW9uLlxuICAgICAqIEB0eXBlIHtXcml0ZXIuT3B8dW5kZWZpbmVkfVxuICAgICAqL1xuICAgIHRoaXMubmV4dCA9IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIFZhbHVlIHRvIHdyaXRlLlxuICAgICAqIEB0eXBlIHsqfVxuICAgICAqL1xuICAgIHRoaXMudmFsID0gdmFsOyAvLyB0eXBlIHZhcmllc1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuZnVuY3Rpb24gbm9vcCgpIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZW1wdHktZnVuY3Rpb25cblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IHdyaXRlciBzdGF0ZSBpbnN0YW5jZS5cbiAqIEBjbGFzc2Rlc2MgQ29waWVkIHdyaXRlciBzdGF0ZS5cbiAqIEBtZW1iZXJvZiBXcml0ZXJcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtXcml0ZXJ9IHdyaXRlciBXcml0ZXIgdG8gY29weSBzdGF0ZSBmcm9tXG4gKiBAaWdub3JlXG4gKi9cbmZ1bmN0aW9uIFN0YXRlKHdyaXRlcikge1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBoZWFkLlxuICAgICAqIEB0eXBlIHtXcml0ZXIuT3B9XG4gICAgICovXG4gICAgdGhpcy5oZWFkID0gd3JpdGVyLmhlYWQ7XG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IHRhaWwuXG4gICAgICogQHR5cGUge1dyaXRlci5PcH1cbiAgICAgKi9cbiAgICB0aGlzLnRhaWwgPSB3cml0ZXIudGFpbDtcblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgYnVmZmVyIGxlbmd0aC5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMubGVuID0gd3JpdGVyLmxlbjtcblxuICAgIC8qKlxuICAgICAqIE5leHQgc3RhdGUuXG4gICAgICogQHR5cGUge1N0YXRlfG51bGx9XG4gICAgICovXG4gICAgdGhpcy5uZXh0ID0gd3JpdGVyLnN0YXRlcztcbn1cblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IHdyaXRlciBpbnN0YW5jZS5cbiAqIEBjbGFzc2Rlc2MgV2lyZSBmb3JtYXQgd3JpdGVyIHVzaW5nIGBVaW50OEFycmF5YCBpZiBhdmFpbGFibGUsIG90aGVyd2lzZSBgQXJyYXlgLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFdyaXRlcigpIHtcblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgbGVuZ3RoLlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5sZW4gPSAwO1xuXG4gICAgLyoqXG4gICAgICogT3BlcmF0aW9ucyBoZWFkLlxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgdGhpcy5oZWFkID0gbmV3IE9wKG5vb3AsIDAsIDApO1xuXG4gICAgLyoqXG4gICAgICogT3BlcmF0aW9ucyB0YWlsXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICB0aGlzLnRhaWwgPSB0aGlzLmhlYWQ7XG5cbiAgICAvKipcbiAgICAgKiBMaW5rZWQgZm9ya2VkIHN0YXRlcy5cbiAgICAgKiBAdHlwZSB7T2JqZWN0fG51bGx9XG4gICAgICovXG4gICAgdGhpcy5zdGF0ZXMgPSBudWxsO1xuXG4gICAgLy8gV2hlbiBhIHZhbHVlIGlzIHdyaXR0ZW4sIHRoZSB3cml0ZXIgY2FsY3VsYXRlcyBpdHMgYnl0ZSBsZW5ndGggYW5kIHB1dHMgaXQgaW50byBhIGxpbmtlZFxuICAgIC8vIGxpc3Qgb2Ygb3BlcmF0aW9ucyB0byBwZXJmb3JtIHdoZW4gZmluaXNoKCkgaXMgY2FsbGVkLiBUaGlzIGJvdGggYWxsb3dzIHVzIHRvIGFsbG9jYXRlXG4gICAgLy8gYnVmZmVycyBvZiB0aGUgZXhhY3QgcmVxdWlyZWQgc2l6ZSBhbmQgcmVkdWNlcyB0aGUgYW1vdW50IG9mIHdvcmsgd2UgaGF2ZSB0byBkbyBjb21wYXJlZFxuICAgIC8vIHRvIGZpcnN0IGNhbGN1bGF0aW5nIG92ZXIgb2JqZWN0cyBhbmQgdGhlbiBlbmNvZGluZyBvdmVyIG9iamVjdHMuIEluIG91ciBjYXNlLCB0aGUgZW5jb2RpbmdcbiAgICAvLyBwYXJ0IGlzIGp1c3QgYSBsaW5rZWQgbGlzdCB3YWxrIGNhbGxpbmcgb3BlcmF0aW9ucyB3aXRoIGFscmVhZHkgcHJlcGFyZWQgdmFsdWVzLlxufVxuXG52YXIgY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgIHJldHVybiB1dGlsLkJ1ZmZlclxuICAgICAgICA/IGZ1bmN0aW9uIGNyZWF0ZV9idWZmZXJfc2V0dXAoKSB7XG4gICAgICAgICAgICByZXR1cm4gKFdyaXRlci5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGVfYnVmZmVyKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQnVmZmVyV3JpdGVyKCk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIDogZnVuY3Rpb24gY3JlYXRlX2FycmF5KCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBXcml0ZXIoKTtcbiAgICAgICAgfTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB3cml0ZXIuXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtCdWZmZXJXcml0ZXJ8V3JpdGVyfSBBIHtAbGluayBCdWZmZXJXcml0ZXJ9IHdoZW4gQnVmZmVycyBhcmUgc3VwcG9ydGVkLCBvdGhlcndpc2UgYSB7QGxpbmsgV3JpdGVyfVxuICovXG5Xcml0ZXIuY3JlYXRlID0gY3JlYXRlKCk7XG5cbi8qKlxuICogQWxsb2NhdGVzIGEgYnVmZmVyIG9mIHRoZSBzcGVjaWZpZWQgc2l6ZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBzaXplIEJ1ZmZlciBzaXplXG4gKiBAcmV0dXJucyB7VWludDhBcnJheX0gQnVmZmVyXG4gKi9cbldyaXRlci5hbGxvYyA9IGZ1bmN0aW9uIGFsbG9jKHNpemUpIHtcbiAgICByZXR1cm4gbmV3IHV0aWwuQXJyYXkoc2l6ZSk7XG59O1xuXG4vLyBVc2UgVWludDhBcnJheSBidWZmZXIgcG9vbCBpbiB0aGUgYnJvd3NlciwganVzdCBsaWtlIG5vZGUgZG9lcyB3aXRoIGJ1ZmZlcnNcbi8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG5pZiAodXRpbC5BcnJheSAhPT0gQXJyYXkpXG4gICAgV3JpdGVyLmFsbG9jID0gdXRpbC5wb29sKFdyaXRlci5hbGxvYywgdXRpbC5BcnJheS5wcm90b3R5cGUuc3ViYXJyYXkpO1xuXG4vKipcbiAqIFB1c2hlcyBhIG5ldyBvcGVyYXRpb24gdG8gdGhlIHF1ZXVlLlxuICogQHBhcmFtIHtmdW5jdGlvbihVaW50OEFycmF5LCBudW1iZXIsICopfSBmbiBGdW5jdGlvbiB0byBjYWxsXG4gKiBAcGFyYW0ge251bWJlcn0gbGVuIFZhbHVlIGJ5dGUgbGVuZ3RoXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqIEBwcml2YXRlXG4gKi9cbldyaXRlci5wcm90b3R5cGUuX3B1c2ggPSBmdW5jdGlvbiBwdXNoKGZuLCBsZW4sIHZhbCkge1xuICAgIHRoaXMudGFpbCA9IHRoaXMudGFpbC5uZXh0ID0gbmV3IE9wKGZuLCBsZW4sIHZhbCk7XG4gICAgdGhpcy5sZW4gKz0gbGVuO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gd3JpdGVCeXRlKHZhbCwgYnVmLCBwb3MpIHtcbiAgICBidWZbcG9zXSA9IHZhbCAmIDI1NTtcbn1cblxuZnVuY3Rpb24gd3JpdGVWYXJpbnQzMih2YWwsIGJ1ZiwgcG9zKSB7XG4gICAgd2hpbGUgKHZhbCA+IDEyNykge1xuICAgICAgICBidWZbcG9zKytdID0gdmFsICYgMTI3IHwgMTI4O1xuICAgICAgICB2YWwgPj4+PSA3O1xuICAgIH1cbiAgICBidWZbcG9zXSA9IHZhbDtcbn1cblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IHZhcmludCB3cml0ZXIgb3BlcmF0aW9uIGluc3RhbmNlLlxuICogQGNsYXNzZGVzYyBTY2hlZHVsZWQgdmFyaW50IHdyaXRlciBvcGVyYXRpb24uXG4gKiBAZXh0ZW5kcyBPcFxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge251bWJlcn0gbGVuIFZhbHVlIGJ5dGUgbGVuZ3RoXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsIFZhbHVlIHRvIHdyaXRlXG4gKiBAaWdub3JlXG4gKi9cbmZ1bmN0aW9uIFZhcmludE9wKGxlbiwgdmFsKSB7XG4gICAgdGhpcy5sZW4gPSBsZW47XG4gICAgdGhpcy5uZXh0ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMudmFsID0gdmFsO1xufVxuXG5WYXJpbnRPcC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE9wLnByb3RvdHlwZSk7XG5WYXJpbnRPcC5wcm90b3R5cGUuZm4gPSB3cml0ZVZhcmludDMyO1xuXG4vKipcbiAqIFdyaXRlcyBhbiB1bnNpZ25lZCAzMiBiaXQgdmFsdWUgYXMgYSB2YXJpbnQuXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLnVpbnQzMiA9IGZ1bmN0aW9uIHdyaXRlX3VpbnQzMih2YWx1ZSkge1xuICAgIC8vIGhlcmUsIHRoZSBjYWxsIHRvIHRoaXMucHVzaCBoYXMgYmVlbiBpbmxpbmVkIGFuZCBhIHZhcmludCBzcGVjaWZpYyBPcCBzdWJjbGFzcyBpcyB1c2VkLlxuICAgIC8vIHVpbnQzMiBpcyBieSBmYXIgdGhlIG1vc3QgZnJlcXVlbnRseSB1c2VkIG9wZXJhdGlvbiBhbmQgYmVuZWZpdHMgc2lnbmlmaWNhbnRseSBmcm9tIHRoaXMuXG4gICAgdGhpcy5sZW4gKz0gKHRoaXMudGFpbCA9IHRoaXMudGFpbC5uZXh0ID0gbmV3IFZhcmludE9wKFxuICAgICAgICAodmFsdWUgPSB2YWx1ZSA+Pj4gMClcbiAgICAgICAgICAgICAgICA8IDEyOCAgICAgICA/IDFcbiAgICAgICAgOiB2YWx1ZSA8IDE2Mzg0ICAgICA/IDJcbiAgICAgICAgOiB2YWx1ZSA8IDIwOTcxNTIgICA/IDNcbiAgICAgICAgOiB2YWx1ZSA8IDI2ODQzNTQ1NiA/IDRcbiAgICAgICAgOiAgICAgICAgICAgICAgICAgICAgIDUsXG4gICAgdmFsdWUpKS5sZW47XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFdyaXRlcyBhIHNpZ25lZCAzMiBiaXQgdmFsdWUgYXMgYSB2YXJpbnQuXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUuaW50MzIgPSBmdW5jdGlvbiB3cml0ZV9pbnQzMih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA8IDBcbiAgICAgICAgPyB0aGlzLl9wdXNoKHdyaXRlVmFyaW50NjQsIDEwLCBMb25nQml0cy5mcm9tTnVtYmVyKHZhbHVlKSkgLy8gMTAgYnl0ZXMgcGVyIHNwZWNcbiAgICAgICAgOiB0aGlzLnVpbnQzMih2YWx1ZSk7XG59O1xuXG4vKipcbiAqIFdyaXRlcyBhIDMyIGJpdCB2YWx1ZSBhcyBhIHZhcmludCwgemlnLXphZyBlbmNvZGVkLlxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5zaW50MzIgPSBmdW5jdGlvbiB3cml0ZV9zaW50MzIodmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy51aW50MzIoKHZhbHVlIDw8IDEgXiB2YWx1ZSA+PiAzMSkgPj4+IDApO1xufTtcblxuZnVuY3Rpb24gd3JpdGVWYXJpbnQ2NCh2YWwsIGJ1ZiwgcG9zKSB7XG4gICAgd2hpbGUgKHZhbC5oaSkge1xuICAgICAgICBidWZbcG9zKytdID0gdmFsLmxvICYgMTI3IHwgMTI4O1xuICAgICAgICB2YWwubG8gPSAodmFsLmxvID4+PiA3IHwgdmFsLmhpIDw8IDI1KSA+Pj4gMDtcbiAgICAgICAgdmFsLmhpID4+Pj0gNztcbiAgICB9XG4gICAgd2hpbGUgKHZhbC5sbyA+IDEyNykge1xuICAgICAgICBidWZbcG9zKytdID0gdmFsLmxvICYgMTI3IHwgMTI4O1xuICAgICAgICB2YWwubG8gPSB2YWwubG8gPj4+IDc7XG4gICAgfVxuICAgIGJ1Zltwb3MrK10gPSB2YWwubG87XG59XG5cbi8qKlxuICogV3JpdGVzIGFuIHVuc2lnbmVkIDY0IGJpdCB2YWx1ZSBhcyBhIHZhcmludC5cbiAqIEBwYXJhbSB7TG9uZ3xudW1iZXJ8c3RyaW5nfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGB2YWx1ZWAgaXMgYSBzdHJpbmcgYW5kIG5vIGxvbmcgbGlicmFyeSBpcyBwcmVzZW50LlxuICovXG5Xcml0ZXIucHJvdG90eXBlLnVpbnQ2NCA9IGZ1bmN0aW9uIHdyaXRlX3VpbnQ2NCh2YWx1ZSkge1xuICAgIHZhciBiaXRzID0gTG9uZ0JpdHMuZnJvbSh2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXMuX3B1c2god3JpdGVWYXJpbnQ2NCwgYml0cy5sZW5ndGgoKSwgYml0cyk7XG59O1xuXG4vKipcbiAqIFdyaXRlcyBhIHNpZ25lZCA2NCBiaXQgdmFsdWUgYXMgYSB2YXJpbnQuXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7TG9uZ3xudW1iZXJ8c3RyaW5nfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGB2YWx1ZWAgaXMgYSBzdHJpbmcgYW5kIG5vIGxvbmcgbGlicmFyeSBpcyBwcmVzZW50LlxuICovXG5Xcml0ZXIucHJvdG90eXBlLmludDY0ID0gV3JpdGVyLnByb3RvdHlwZS51aW50NjQ7XG5cbi8qKlxuICogV3JpdGVzIGEgc2lnbmVkIDY0IGJpdCB2YWx1ZSBhcyBhIHZhcmludCwgemlnLXphZyBlbmNvZGVkLlxuICogQHBhcmFtIHtMb25nfG51bWJlcnxzdHJpbmd9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgYHZhbHVlYCBpcyBhIHN0cmluZyBhbmQgbm8gbG9uZyBsaWJyYXJ5IGlzIHByZXNlbnQuXG4gKi9cbldyaXRlci5wcm90b3R5cGUuc2ludDY0ID0gZnVuY3Rpb24gd3JpdGVfc2ludDY0KHZhbHVlKSB7XG4gICAgdmFyIGJpdHMgPSBMb25nQml0cy5mcm9tKHZhbHVlKS56ekVuY29kZSgpO1xuICAgIHJldHVybiB0aGlzLl9wdXNoKHdyaXRlVmFyaW50NjQsIGJpdHMubGVuZ3RoKCksIGJpdHMpO1xufTtcblxuLyoqXG4gKiBXcml0ZXMgYSBib29saXNoIHZhbHVlIGFzIGEgdmFyaW50LlxuICogQHBhcmFtIHtib29sZWFufSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUuYm9vbCA9IGZ1bmN0aW9uIHdyaXRlX2Jvb2wodmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5fcHVzaCh3cml0ZUJ5dGUsIDEsIHZhbHVlID8gMSA6IDApO1xufTtcblxuZnVuY3Rpb24gd3JpdGVGaXhlZDMyKHZhbCwgYnVmLCBwb3MpIHtcbiAgICBidWZbcG9zICAgIF0gPSAgdmFsICAgICAgICAgJiAyNTU7XG4gICAgYnVmW3BvcyArIDFdID0gIHZhbCA+Pj4gOCAgICYgMjU1O1xuICAgIGJ1Zltwb3MgKyAyXSA9ICB2YWwgPj4+IDE2ICAmIDI1NTtcbiAgICBidWZbcG9zICsgM10gPSAgdmFsID4+PiAyNDtcbn1cblxuLyoqXG4gKiBXcml0ZXMgYW4gdW5zaWduZWQgMzIgYml0IHZhbHVlIGFzIGZpeGVkIDMyIGJpdHMuXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLmZpeGVkMzIgPSBmdW5jdGlvbiB3cml0ZV9maXhlZDMyKHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuX3B1c2god3JpdGVGaXhlZDMyLCA0LCB2YWx1ZSA+Pj4gMCk7XG59O1xuXG4vKipcbiAqIFdyaXRlcyBhIHNpZ25lZCAzMiBiaXQgdmFsdWUgYXMgZml4ZWQgMzIgYml0cy5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5zZml4ZWQzMiA9IFdyaXRlci5wcm90b3R5cGUuZml4ZWQzMjtcblxuLyoqXG4gKiBXcml0ZXMgYW4gdW5zaWduZWQgNjQgYml0IHZhbHVlIGFzIGZpeGVkIDY0IGJpdHMuXG4gKiBAcGFyYW0ge0xvbmd8bnVtYmVyfHN0cmluZ30gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBgdmFsdWVgIGlzIGEgc3RyaW5nIGFuZCBubyBsb25nIGxpYnJhcnkgaXMgcHJlc2VudC5cbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5maXhlZDY0ID0gZnVuY3Rpb24gd3JpdGVfZml4ZWQ2NCh2YWx1ZSkge1xuICAgIHZhciBiaXRzID0gTG9uZ0JpdHMuZnJvbSh2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXMuX3B1c2god3JpdGVGaXhlZDMyLCA0LCBiaXRzLmxvKS5fcHVzaCh3cml0ZUZpeGVkMzIsIDQsIGJpdHMuaGkpO1xufTtcblxuLyoqXG4gKiBXcml0ZXMgYSBzaWduZWQgNjQgYml0IHZhbHVlIGFzIGZpeGVkIDY0IGJpdHMuXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7TG9uZ3xudW1iZXJ8c3RyaW5nfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGB2YWx1ZWAgaXMgYSBzdHJpbmcgYW5kIG5vIGxvbmcgbGlicmFyeSBpcyBwcmVzZW50LlxuICovXG5Xcml0ZXIucHJvdG90eXBlLnNmaXhlZDY0ID0gV3JpdGVyLnByb3RvdHlwZS5maXhlZDY0O1xuXG4vKipcbiAqIFdyaXRlcyBhIGZsb2F0ICgzMiBiaXQpLlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLmZsb2F0ID0gZnVuY3Rpb24gd3JpdGVfZmxvYXQodmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5fcHVzaCh1dGlsLmZsb2F0LndyaXRlRmxvYXRMRSwgNCwgdmFsdWUpO1xufTtcblxuLyoqXG4gKiBXcml0ZXMgYSBkb3VibGUgKDY0IGJpdCBmbG9hdCkuXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUuZG91YmxlID0gZnVuY3Rpb24gd3JpdGVfZG91YmxlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuX3B1c2godXRpbC5mbG9hdC53cml0ZURvdWJsZUxFLCA4LCB2YWx1ZSk7XG59O1xuXG52YXIgd3JpdGVCeXRlcyA9IHV0aWwuQXJyYXkucHJvdG90eXBlLnNldFxuICAgID8gZnVuY3Rpb24gd3JpdGVCeXRlc19zZXQodmFsLCBidWYsIHBvcykge1xuICAgICAgICBidWYuc2V0KHZhbCwgcG9zKTsgLy8gYWxzbyB3b3JrcyBmb3IgcGxhaW4gYXJyYXkgdmFsdWVzXG4gICAgfVxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgOiBmdW5jdGlvbiB3cml0ZUJ5dGVzX2Zvcih2YWwsIGJ1ZiwgcG9zKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgYnVmW3BvcyArIGldID0gdmFsW2ldO1xuICAgIH07XG5cbi8qKlxuICogV3JpdGVzIGEgc2VxdWVuY2Ugb2YgYnl0ZXMuXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl8c3RyaW5nfSB2YWx1ZSBCdWZmZXIgb3IgYmFzZTY0IGVuY29kZWQgc3RyaW5nIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5ieXRlcyA9IGZ1bmN0aW9uIHdyaXRlX2J5dGVzKHZhbHVlKSB7XG4gICAgdmFyIGxlbiA9IHZhbHVlLmxlbmd0aCA+Pj4gMDtcbiAgICBpZiAoIWxlbilcbiAgICAgICAgcmV0dXJuIHRoaXMuX3B1c2god3JpdGVCeXRlLCAxLCAwKTtcbiAgICBpZiAodXRpbC5pc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgdmFyIGJ1ZiA9IFdyaXRlci5hbGxvYyhsZW4gPSBiYXNlNjQubGVuZ3RoKHZhbHVlKSk7XG4gICAgICAgIGJhc2U2NC5kZWNvZGUodmFsdWUsIGJ1ZiwgMCk7XG4gICAgICAgIHZhbHVlID0gYnVmO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy51aW50MzIobGVuKS5fcHVzaCh3cml0ZUJ5dGVzLCBsZW4sIHZhbHVlKTtcbn07XG5cbi8qKlxuICogV3JpdGVzIGEgc3RyaW5nLlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5zdHJpbmcgPSBmdW5jdGlvbiB3cml0ZV9zdHJpbmcodmFsdWUpIHtcbiAgICB2YXIgbGVuID0gdXRmOC5sZW5ndGgodmFsdWUpO1xuICAgIHJldHVybiBsZW5cbiAgICAgICAgPyB0aGlzLnVpbnQzMihsZW4pLl9wdXNoKHV0Zjgud3JpdGUsIGxlbiwgdmFsdWUpXG4gICAgICAgIDogdGhpcy5fcHVzaCh3cml0ZUJ5dGUsIDEsIDApO1xufTtcblxuLyoqXG4gKiBGb3JrcyB0aGlzIHdyaXRlcidzIHN0YXRlIGJ5IHB1c2hpbmcgaXQgdG8gYSBzdGFjay5cbiAqIENhbGxpbmcge0BsaW5rIFdyaXRlciNyZXNldHxyZXNldH0gb3Ige0BsaW5rIFdyaXRlciNsZGVsaW18bGRlbGltfSByZXNldHMgdGhlIHdyaXRlciB0byB0aGUgcHJldmlvdXMgc3RhdGUuXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5mb3JrID0gZnVuY3Rpb24gZm9yaygpIHtcbiAgICB0aGlzLnN0YXRlcyA9IG5ldyBTdGF0ZSh0aGlzKTtcbiAgICB0aGlzLmhlYWQgPSB0aGlzLnRhaWwgPSBuZXcgT3Aobm9vcCwgMCwgMCk7XG4gICAgdGhpcy5sZW4gPSAwO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZXNldHMgdGhpcyBpbnN0YW5jZSB0byB0aGUgbGFzdCBzdGF0ZS5cbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGVzKSB7XG4gICAgICAgIHRoaXMuaGVhZCAgID0gdGhpcy5zdGF0ZXMuaGVhZDtcbiAgICAgICAgdGhpcy50YWlsICAgPSB0aGlzLnN0YXRlcy50YWlsO1xuICAgICAgICB0aGlzLmxlbiAgICA9IHRoaXMuc3RhdGVzLmxlbjtcbiAgICAgICAgdGhpcy5zdGF0ZXMgPSB0aGlzLnN0YXRlcy5uZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaGVhZCA9IHRoaXMudGFpbCA9IG5ldyBPcChub29wLCAwLCAwKTtcbiAgICAgICAgdGhpcy5sZW4gID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlc2V0cyB0byB0aGUgbGFzdCBzdGF0ZSBhbmQgYXBwZW5kcyB0aGUgZm9yayBzdGF0ZSdzIGN1cnJlbnQgd3JpdGUgbGVuZ3RoIGFzIGEgdmFyaW50IGZvbGxvd2VkIGJ5IGl0cyBvcGVyYXRpb25zLlxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUubGRlbGltID0gZnVuY3Rpb24gbGRlbGltKCkge1xuICAgIHZhciBoZWFkID0gdGhpcy5oZWFkLFxuICAgICAgICB0YWlsID0gdGhpcy50YWlsLFxuICAgICAgICBsZW4gID0gdGhpcy5sZW47XG4gICAgdGhpcy5yZXNldCgpLnVpbnQzMihsZW4pO1xuICAgIGlmIChsZW4pIHtcbiAgICAgICAgdGhpcy50YWlsLm5leHQgPSBoZWFkLm5leHQ7IC8vIHNraXAgbm9vcFxuICAgICAgICB0aGlzLnRhaWwgPSB0YWlsO1xuICAgICAgICB0aGlzLmxlbiArPSBsZW47XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBGaW5pc2hlcyB0aGUgd3JpdGUgb3BlcmF0aW9uLlxuICogQHJldHVybnMge1VpbnQ4QXJyYXl9IEZpbmlzaGVkIGJ1ZmZlclxuICovXG5Xcml0ZXIucHJvdG90eXBlLmZpbmlzaCA9IGZ1bmN0aW9uIGZpbmlzaCgpIHtcbiAgICB2YXIgaGVhZCA9IHRoaXMuaGVhZC5uZXh0LCAvLyBza2lwIG5vb3BcbiAgICAgICAgYnVmICA9IHRoaXMuY29uc3RydWN0b3IuYWxsb2ModGhpcy5sZW4pLFxuICAgICAgICBwb3MgID0gMDtcbiAgICB3aGlsZSAoaGVhZCkge1xuICAgICAgICBoZWFkLmZuKGhlYWQudmFsLCBidWYsIHBvcyk7XG4gICAgICAgIHBvcyArPSBoZWFkLmxlbjtcbiAgICAgICAgaGVhZCA9IGhlYWQubmV4dDtcbiAgICB9XG4gICAgLy8gdGhpcy5oZWFkID0gdGhpcy50YWlsID0gbnVsbDtcbiAgICByZXR1cm4gYnVmO1xufTtcblxuV3JpdGVyLl9jb25maWd1cmUgPSBmdW5jdGlvbihCdWZmZXJXcml0ZXJfKSB7XG4gICAgQnVmZmVyV3JpdGVyID0gQnVmZmVyV3JpdGVyXztcbiAgICBXcml0ZXIuY3JlYXRlID0gY3JlYXRlKCk7XG4gICAgQnVmZmVyV3JpdGVyLl9jb25maWd1cmUoKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gQnVmZmVyV3JpdGVyO1xuXG4vLyBleHRlbmRzIFdyaXRlclxudmFyIFdyaXRlciA9IHJlcXVpcmUoXCIuL3dyaXRlclwiKTtcbihCdWZmZXJXcml0ZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShXcml0ZXIucHJvdG90eXBlKSkuY29uc3RydWN0b3IgPSBCdWZmZXJXcml0ZXI7XG5cbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbC9taW5pbWFsXCIpO1xuXG4vKipcbiAqIENvbnN0cnVjdHMgYSBuZXcgYnVmZmVyIHdyaXRlciBpbnN0YW5jZS5cbiAqIEBjbGFzc2Rlc2MgV2lyZSBmb3JtYXQgd3JpdGVyIHVzaW5nIG5vZGUgYnVmZmVycy5cbiAqIEBleHRlbmRzIFdyaXRlclxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIEJ1ZmZlcldyaXRlcigpIHtcbiAgICBXcml0ZXIuY2FsbCh0aGlzKTtcbn1cblxuQnVmZmVyV3JpdGVyLl9jb25maWd1cmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQWxsb2NhdGVzIGEgYnVmZmVyIG9mIHRoZSBzcGVjaWZpZWQgc2l6ZS5cbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2l6ZSBCdWZmZXIgc2l6ZVxuICAgICAqIEByZXR1cm5zIHtCdWZmZXJ9IEJ1ZmZlclxuICAgICAqL1xuICAgIEJ1ZmZlcldyaXRlci5hbGxvYyA9IHV0aWwuX0J1ZmZlcl9hbGxvY1Vuc2FmZTtcblxuICAgIEJ1ZmZlcldyaXRlci53cml0ZUJ5dGVzQnVmZmVyID0gdXRpbC5CdWZmZXIgJiYgdXRpbC5CdWZmZXIucHJvdG90eXBlIGluc3RhbmNlb2YgVWludDhBcnJheSAmJiB1dGlsLkJ1ZmZlci5wcm90b3R5cGUuc2V0Lm5hbWUgPT09IFwic2V0XCJcbiAgICAgICAgPyBmdW5jdGlvbiB3cml0ZUJ5dGVzQnVmZmVyX3NldCh2YWwsIGJ1ZiwgcG9zKSB7XG4gICAgICAgICAgYnVmLnNldCh2YWwsIHBvcyk7IC8vIGZhc3RlciB0aGFuIGNvcHkgKHJlcXVpcmVzIG5vZGUgPj0gNCB3aGVyZSBCdWZmZXJzIGV4dGVuZCBVaW50OEFycmF5IGFuZCBzZXQgaXMgcHJvcGVybHkgaW5oZXJpdGVkKVxuICAgICAgICAgIC8vIGFsc28gd29ya3MgZm9yIHBsYWluIGFycmF5IHZhbHVlc1xuICAgICAgICB9XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIDogZnVuY3Rpb24gd3JpdGVCeXRlc0J1ZmZlcl9jb3B5KHZhbCwgYnVmLCBwb3MpIHtcbiAgICAgICAgICBpZiAodmFsLmNvcHkpIC8vIEJ1ZmZlciB2YWx1ZXNcbiAgICAgICAgICAgIHZhbC5jb3B5KGJ1ZiwgcG9zLCAwLCB2YWwubGVuZ3RoKTtcbiAgICAgICAgICBlbHNlIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsLmxlbmd0aDspIC8vIHBsYWluIGFycmF5IHZhbHVlc1xuICAgICAgICAgICAgYnVmW3BvcysrXSA9IHZhbFtpKytdO1xuICAgICAgICB9O1xufTtcblxuXG4vKipcbiAqIEBvdmVycmlkZVxuICovXG5CdWZmZXJXcml0ZXIucHJvdG90eXBlLmJ5dGVzID0gZnVuY3Rpb24gd3JpdGVfYnl0ZXNfYnVmZmVyKHZhbHVlKSB7XG4gICAgaWYgKHV0aWwuaXNTdHJpbmcodmFsdWUpKVxuICAgICAgICB2YWx1ZSA9IHV0aWwuX0J1ZmZlcl9mcm9tKHZhbHVlLCBcImJhc2U2NFwiKTtcbiAgICB2YXIgbGVuID0gdmFsdWUubGVuZ3RoID4+PiAwO1xuICAgIHRoaXMudWludDMyKGxlbik7XG4gICAgaWYgKGxlbilcbiAgICAgICAgdGhpcy5fcHVzaChCdWZmZXJXcml0ZXIud3JpdGVCeXRlc0J1ZmZlciwgbGVuLCB2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiB3cml0ZVN0cmluZ0J1ZmZlcih2YWwsIGJ1ZiwgcG9zKSB7XG4gICAgaWYgKHZhbC5sZW5ndGggPCA0MCkgLy8gcGxhaW4ganMgaXMgZmFzdGVyIGZvciBzaG9ydCBzdHJpbmdzIChwcm9iYWJseSBkdWUgdG8gcmVkdW5kYW50IGFzc2VydGlvbnMpXG4gICAgICAgIHV0aWwudXRmOC53cml0ZSh2YWwsIGJ1ZiwgcG9zKTtcbiAgICBlbHNlIGlmIChidWYudXRmOFdyaXRlKVxuICAgICAgICBidWYudXRmOFdyaXRlKHZhbCwgcG9zKTtcbiAgICBlbHNlXG4gICAgICAgIGJ1Zi53cml0ZSh2YWwsIHBvcyk7XG59XG5cbi8qKlxuICogQG92ZXJyaWRlXG4gKi9cbkJ1ZmZlcldyaXRlci5wcm90b3R5cGUuc3RyaW5nID0gZnVuY3Rpb24gd3JpdGVfc3RyaW5nX2J1ZmZlcih2YWx1ZSkge1xuICAgIHZhciBsZW4gPSB1dGlsLkJ1ZmZlci5ieXRlTGVuZ3RoKHZhbHVlKTtcbiAgICB0aGlzLnVpbnQzMihsZW4pO1xuICAgIGlmIChsZW4pXG4gICAgICAgIHRoaXMuX3B1c2god3JpdGVTdHJpbmdCdWZmZXIsIGxlbiwgdmFsdWUpO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuXG4vKipcbiAqIEZpbmlzaGVzIHRoZSB3cml0ZSBvcGVyYXRpb24uXG4gKiBAbmFtZSBCdWZmZXJXcml0ZXIjZmluaXNoXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtCdWZmZXJ9IEZpbmlzaGVkIGJ1ZmZlclxuICovXG5cbkJ1ZmZlcldyaXRlci5fY29uZmlndXJlKCk7XG4iLCJpbXBvcnQgeyBuaWNlX3RzIH0gZnJvbSBcIi4vZ2VuL3BiXCI7XHJcbmV4cG9ydCBjbGFzcyBEZWNvZGVNc2d7XHJcblx0cHVibGljIHJwY0lkOm51bWJlcjtcclxuXHRwdWJsaWMgbXNnT2JqOmFueTtcclxufVxyXG5leHBvcnQgY2xhc3MgT3Bjb2Rle1xyXG5cdHB1YmxpYyBzdGF0aWMgTVNHX0MyUl9Mb2dpbjpudW1iZXIgPSAxMDAwO1xyXG5cdHB1YmxpYyBzdGF0aWMgTVNHX1IyQ19Mb2dpbjpudW1iZXIgPSAxMDAxO1xyXG5cdHB1YmxpYyBzdGF0aWMgTVNHX0MyR19Mb2dpbkdhdGU6bnVtYmVyID0gMTAwMjtcclxuXHRwdWJsaWMgc3RhdGljIE1TR19HMkNfTG9naW5HYXRlOm51bWJlciA9IDEwMDM7XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgTVNHX0MyR1NfVGVzdDpudW1iZXIgPSAyMDAxO1xyXG5cdHB1YmxpYyBzdGF0aWMgTVNHX0dTMkNfVGVzdDpudW1iZXIgPSAyMDAyO1xyXG5cclxuXHRwdWJsaWMgc3RhdGljIG1hcCA9IHtcclxuXHRcdDEwMDAgOiB7XCJkZWNvZGVcIjpuaWNlX3RzLkMyUl9Mb2dpbi5kZWNvZGUsXCJlbmNvZGVcIjpuaWNlX3RzLkMyUl9Mb2dpbi5lbmNvZGV9LFxyXG5cdFx0MTAwMSA6IHtcImRlY29kZVwiOm5pY2VfdHMuUjJDX0xvZ2luLmRlY29kZSxcImVuY29kZVwiOm5pY2VfdHMuUjJDX0xvZ2luLmVuY29kZX0sXHJcblx0XHQxMDAyIDoge1wiZGVjb2RlXCI6bmljZV90cy5DMkdfTG9naW5HYXRlLmRlY29kZSxcImVuY29kZVwiOm5pY2VfdHMuQzJHX0xvZ2luR2F0ZS5lbmNvZGV9LFxyXG5cdFx0MTAwMyA6IHtcImRlY29kZVwiOm5pY2VfdHMuRzJDX0xvZ2luR2F0ZS5kZWNvZGUsXCJlbmNvZGVcIjpuaWNlX3RzLkcyQ19Mb2dpbkdhdGUuZW5jb2RlfSxcclxuXHJcblx0XHQyMDAxIDoge1wiZGVjb2RlXCI6bmljZV90cy5DMkdTX1Rlc3QuZGVjb2RlLFwiZW5jb2RlXCI6bmljZV90cy5DMkdTX1Rlc3QuZW5jb2RlfSxcclxuXHRcdDIwMDIgOiB7XCJkZWNvZGVcIjpuaWNlX3RzLkdTMkNfVGVzdC5kZWNvZGUsXCJlbmNvZGVcIjpuaWNlX3RzLkdTMkNfVGVzdC5lbmNvZGV9XHJcblx0fVxyXG5cdHB1YmxpYyBzdGF0aWMgZGVjb2RlKG9wY29kZTpudW1iZXIsIG1zZzpVaW50OEFycmF5KTpEZWNvZGVNc2cge1xyXG5cdFx0bGV0IG1zZ09iaiA9IHRoaXMubWFwW29wY29kZV1bXCJkZWNvZGVcIl0obXNnKTtcclxuXHRcdGxldCBkZWNvZGVNc2cgPSBuZXcgRGVjb2RlTXNnKCk7XHJcblx0XHRkZWNvZGVNc2cucnBjSWQgPSBtc2dPYmouUnBjSWQ7XHJcblx0XHRkZWNvZGVNc2cubXNnT2JqID0gbXNnT2JqO1xyXG5cdFx0cmV0dXJuIGRlY29kZU1zZztcclxuXHR9XHJcblx0cHVibGljIHN0YXRpYyBlbmNvZGUob3Bjb2RlOm51bWJlciwgbXNnOlVpbnQ4QXJyYXkpe1xyXG5cdFx0bGV0IGJ1ZiA9IHRoaXMubWFwW29wY29kZV1bXCJlbmNvZGVcIl0obXNnKS5maW5pc2goKTtcclxuXHRcdHJldHVybiBidWZcclxuXHR9XHJcblxyXG5cclxuXHJcbn1cclxuIiwiLyoqIFRoaXMgaXMgYW4gYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgY2xhc3MgYnkgRmFpcnlHVUkuIFBsZWFzZSBkbyBub3QgbW9kaWZ5IGl0LiAqKi9cblxuZXhwb3J0IGNsYXNzIEZseUJpcmRVSVxue1xuICAgIHB1YmxpYyBzdGF0aWMgUGFja2FnZU5hbWU6c3RyaW5nID0gXCJGbHlCaXJkXCI7XG4gICAgcHVibGljIHN0YXRpYyBQYWNrYWdlQnl0ZXM6c3RyaW5nID0gXCJGbHlCaXJkX2Z1aS5ieXRlc1wiO1xuICAgIHB1YmxpYyBzdGF0aWMgVUlNYWluVklldzpzdHJpbmcgPSBcIk1haW5WSWV3XCI7XG59IiwiLyoqIFRoaXMgaXMgYW4gYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgY2xhc3MgYnkgRmFpcnlHVUkuIFBsZWFzZSBkbyBub3QgbW9kaWZ5IGl0LiAqKi9cblxuZXhwb3J0IGNsYXNzIEdhbWVTdGFydFVJXG57XG4gICAgcHVibGljIHN0YXRpYyBQYWNrYWdlTmFtZTpzdHJpbmcgPSBcIkdhbWVTdGFydFwiO1xuICAgIHB1YmxpYyBzdGF0aWMgUGFja2FnZUJ5dGVzOnN0cmluZyA9IFwiR2FtZVN0YXJ0X2Z1aS5ieXRlc1wiO1xuICAgIHB1YmxpYyBzdGF0aWMgVUlTdGFydFZpZXc6c3RyaW5nID0gXCJTdGFydFZpZXdcIjtcbn0iLCIvKiogVGhpcyBpcyBhbiBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBjbGFzcyBieSBGYWlyeUdVSS4gUGxlYXNlIGRvIG5vdCBtb2RpZnkgaXQuICoqL1xuXG5leHBvcnQgY2xhc3MgQ29tbW9uVUlcbntcbiAgICBwdWJsaWMgc3RhdGljIFBhY2thZ2VOYW1lOnN0cmluZyA9IFwiQ29tbW9uXCI7XG4gICAgcHVibGljIHN0YXRpYyBQYWNrYWdlQnl0ZXM6c3RyaW5nID0gXCJDb21tb25fZnVpLmJ5dGVzXCI7XG4gICAgcHVibGljIHN0YXRpYyBVSUxvYWRpbmdWaWV3OnN0cmluZyA9IFwiTG9hZGluZ1ZpZXdcIjtcbn0iLCJcclxuaW1wb3J0IHsgU2luZ2xldG9uIH0gZnJvbSAnLi9TaW5nbGV0b24nO1xyXG5pbXBvcnQgeyBSZXNNYW5hZ2VyIH0gZnJvbSAnLi9SZXNNYW5hZ2VyJztcclxuaW1wb3J0IHsgVW5pdHlFbmdpbmUgfSBmcm9tICdjc2hhcnAnO1xyXG5cclxuXHJcblxyXG4vLyAtLSBHYW1lT2JqZWN057yT5a2Y5rGgXHJcbi8vIC0tIOazqOaEj++8mlxyXG4vLyAtLSAx44CB5omA5pyJ6ZyA6KaB6aKE6K6+6YO95LuO6L+Z6YeM5Yqg6L2977yM5LiN6KaB55u05o6l5YiwUmVzb3VyY2VzTWFuYWdlcuWOu+WKoOi9ve+8jOeUsei/memHjOe7n+S4gOWBmue8k+WtmOeuoeeQhlxyXG4vLyAtLSAy44CB57yT5a2Y5YiG5Li65Lik6YOo5YiG77ya5LuO6LWE5rqQ5bGC5Yqg6L2955qE5Y6f5aeLR2FtZU9iamVjdChBc3NldCnvvIzku45HYW1lT2JqZWN05a6e5L6L5YyW5Ye65p2l55qE5aSa5LiqSW5zdFxyXG5leHBvcnQgY2xhc3MgR2FtZU9iamVjdFBvb2wgZXh0ZW5kcyBTaW5nbGV0b248R2FtZU9iamVjdFBvb2w+e1xyXG5cclxuICAgIHByaXZhdGUgX19jYWNoZVRyYW5zUm9vdCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9fZ29Qb29sID0gbmV3IE1hcCgpO1xyXG4gICAgcHJpdmF0ZSBfX2luc3RDYWNoZTpNYXA8c3RyaW5nLEFycmF5PGFueT4+ID0gbmV3IE1hcDxzdHJpbmcsQXJyYXk8YW55Pj4oKTtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICBsZXQgZ28gPSBVbml0eUVuZ2luZS5HYW1lT2JqZWN0LkZpbmQoXCJHYW1lT2JqZWN0Q2FjaGVSb290XCIpO1xyXG5cclxuICAgICAgICBpZihnbyA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBnbyA9IG5ldyBVbml0eUVuZ2luZS5HYW1lT2JqZWN0KFwiR2FtZU9iamVjdENhY2hlUm9vdFwiKTtcclxuICAgICAgICAgICAgVW5pdHlFbmdpbmUuT2JqZWN0LkRvbnREZXN0cm95T25Mb2FkKGdvKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX19jYWNoZVRyYW5zUm9vdCA9IGdvLnRyYW5zZm9ybTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tIOajgOa1i+aYr+WQpuW3sue7j+iiq+e8k+WtmFxyXG4gICAgcHVibGljIGNoZWNrSGFzQ2FjaGVkKHBhdGg6c3RyaW5nKXtcclxuXHJcbiAgICAgICAgbGV0IGNhY2hlZEluc3Q6QXJyYXk8YW55PiA9IHRoaXMuX19pbnN0Q2FjaGUuZ2V0KHBhdGgpO1xyXG4gICAgICAgIGlmKGNhY2hlZEluc3QgIT0gdW5kZWZpbmVkICYmIGNhY2hlZEluc3QubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBvb2xlZEdvID0gdGhpcy5fX2dvUG9vbC5nZXQocGF0aCk7XHJcbiAgICAgICAgcmV0dXJuIHBvb2xlZEdvICE9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8tLSDnvJPlrZjlubblrp7kvovljJZHYW1lT2JqZWN0XHJcbiAgICBwdWJsaWMgY2FjaGVBbmRJbnN0R2FtZU9iamVjdChwYXRoOnN0cmluZywgZ286YW55LCBpbnN0X2NvdW50Om51bWJlciA9IDEpe1xyXG5cclxuICAgICAgICB0aGlzLl9fZ29Qb29sLnNldChwYXRoLCBnbyk7XHJcbiAgICAgICAgaWYoaW5zdF9jb3VudCA+IDApe1xyXG5cclxuICAgICAgICAgICAgbGV0IGNhY2hlZEluc3Q6QXJyYXk8YW55PiA9IHRoaXMuX19pbnN0Q2FjaGUuZ2V0KHBhdGgpO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk6bnVtYmVyID0wOyBpIDwgaW5zdF9jb3VudDsgaSsrKXtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgaW5zdCA9IFVuaXR5RW5naW5lLkdhbWVPYmplY3QuSW5zdGFudGlhdGUoZ28pIGFzIFVuaXR5RW5naW5lLkdhbWVPYmplY3Q7XHJcbiAgICAgICAgICAgICAgICBpbnN0LnRyYW5zZm9ybS5TZXRQYXJlbnQodGhpcy5fX2NhY2hlVHJhbnNSb290KTtcclxuICAgICAgICAgICAgICAgIGluc3QuU2V0QWN0aXZlKGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjYWNoZWRJbnN0LnB1c2goaW5zdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLSDlsJ3or5Xku47nvJPlrZjkuK3ojrflj5ZcclxuICAgIHB1YmxpYyB0cnlHZXRGcm9tQ2FjaGUocGF0aDpzdHJpbmcpOmFueXtcclxuXHJcbiAgICAgICAgaWYoIXRoaXMuY2hlY2tIYXNDYWNoZWQocGF0aCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY2FjaGVkSW5zdDpBcnJheTxvYmplY3Q+ICA9IHRoaXMuX19pbnN0Q2FjaGUuZ2V0KHBhdGgpO1xyXG4gICAgICAgIGlmKGNhY2hlZEluc3QgIT0gdW5kZWZpbmVkICYmIGNhY2hlZEluc3QubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGluc3QgPSBjYWNoZWRJbnN0LnBvcCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gaW5zdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwb29sZWRHbyA9IHRoaXMuX19nb1Bvb2wuZ2V0KHBhdGgpO1xyXG4gICAgICAgIGlmKHBvb2xlZEdvICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBpbnN0ID0gVW5pdHlFbmdpbmUuR2FtZU9iamVjdC5JbnN0YW50aWF0ZShwb29sZWRHbyk7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy/pooTliqDovb3vvJrlj6/mj5DkvpvliJ3lp4vlrp7kvovljJbkuKrmlbBcclxuICAgIHB1YmxpYyBhc3luYyBwcmVMb2FkR2FtZU9iamVjdEFzeW5jKHBhdGg6c3RyaW5nLCBpbnN0X2NvdW50Om51bWJlciwgY2FsbGJhY2s6RnVuY3Rpb24sLi4ucGFyYW1zKXtcclxuXHJcbiAgICAgICAgaWYodGhpcy5jaGVja0hhc0NhY2hlZChwYXRoKSl7XHJcbiAgICAgICAgICAgIGlmKGNhbGxiYWNrIT1udWxsKXtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHBhcmFtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGdvID0gYXdhaXQgUmVzTWFuYWdlci5JbnN0YW5jZShSZXNNYW5hZ2VyKS5sb2FkUHJlZmFiKHBhdGgpO1xyXG4gICAgICAgIGlmKGdvIT11bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmNhY2hlQW5kSW5zdEdhbWVPYmplY3QocGF0aCwgZ28saW5zdF9jb3VudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihjYWxsYmFjayE9bnVsbCl7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKHBhcmFtcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLy0tIOW8guatpeiOt+WPlu+8muW/heimgeaXtuWKoOi9vVxyXG4gICAgcHVibGljIGFzeW5jIGdldEdhbWVPYmplY3RBc3luYyhwYXRoOnN0cmluZywgY2FsbGJhY2s6RnVuY3Rpb24sLi4ucGFyYW1zKXtcclxuXHJcbiAgICAgICAgbGV0IGluc3Q6YW55ID0gdGhpcy50cnlHZXRGcm9tQ2FjaGUocGF0aCk7XHJcbiAgICAgICAgaWYoaW5zdCA9PW51bGwpe1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnByZUxvYWRHYW1lT2JqZWN0QXN5bmMocGF0aCwgMSwgY2FsbGJhY2ssIHBhcmFtcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnN0ID0gdGhpcy50cnlHZXRGcm9tQ2FjaGUocGF0aCk7XHJcbiAgICAgICAgaW5zdC5TZXRBY3RpdmUodHJ1ZSk7XHJcblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLy0tIOWbnuaUtlxyXG4gICAgcHVibGljIHJlY3ljbGVHYW1lT2JqZWN0KHBhdGg6c3RyaW5nLCBpbnN0OmFueSl7XHJcblxyXG4gICAgICAgIGluc3QudHJhbnNmb3JtLlNldFBhcmVudCh0aGlzLl9fY2FjaGVUcmFuc1Jvb3QpO1xyXG4gICAgICAgIGluc3QuU2V0QWN0aXZlKGZhbHNlKTtcclxuXHJcbiAgICAgICAgbGV0IGNhY2hlZEluc3QgPSB0aGlzLl9faW5zdENhY2hlLmdldChwYXRoKSB8fCBuZXcgQXJyYXkoKTtcclxuICAgICAgICBjYWNoZWRJbnN0LnB1c2goaW5zdCk7XHJcblxyXG4gICAgICAgIHRoaXMuX19pbnN0Q2FjaGUuc2V0KHBhdGgsIGNhY2hlZEluc3QpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8tLSDmuIXnkIbnvJPlrZhcclxuICAgIHB1YmxpYyBjbGVhbnVwKGluY2x1ZGVQb29sZWRHbzpib29sZWFuID0gZmFsc2Upe1xyXG5cclxuICAgICAgICB0aGlzLl9faW5zdENhY2hlLmZvckVhY2goKHZhbHVlcywga2V5KT0+e1xyXG5cclxuICAgICAgICAgICAgZm9yKGxldCBpbnN0IG9mIHZhbHVlcyl7XHJcbiAgICAgICAgICAgICAgICBpZihpbnN0ICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgIFVuaXR5RW5naW5lLkdhbWVPYmplY3QuRGVzdHJveShpbnN0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX19pbnN0Q2FjaGUuY2xlYXIoKTsgXHJcblxyXG4gICAgICAgIGlmKGluY2x1ZGVQb29sZWRHbyl7XHJcbiAgICAgICAgICAgIHRoaXMuX19nb1Bvb2wuZm9yRWFjaCgoZ28sIGtleSk9PntcclxuXHJcbiAgICAgICAgICAgICAgICBpZihnbyAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgICAgICBSZXNNYW5hZ2VyLkluc3RhbmNlKFJlc01hbmFnZXIpLnJlbGVhc2VBZGRyZXNzR08oZ28pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX19nb1Bvb2wuY2xlYXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJcclxuZXhwb3J0ICBjbGFzcyBMaXN0PFQ+IGV4dGVuZHMgQXJyYXk8VD4ge1xyXG5cdHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0fVxyXG4gXHJcblx0YWRkOkZ1bmN0aW9uID0gZnVuY3Rpb24odmFsdWU6VCk6dm9pZHtcclxuXHRcdHRoaXMucHVzaCh2YWx1ZSk7XHJcblx0fVxyXG4gXHJcblx0aW5zZXJ0OkZ1bmN0aW9uID0gZnVuY3Rpb24oaW5kZXg6bnVtYmVyLCB2YWx1ZTpUKTp2b2lke1xyXG5cdFx0dGhpcy5zcGxpY2UoaW5kZXgsIDAsIHZhbHVlKTtcclxuXHR9XHJcbiBcclxuXHRyZW1vdmU6RnVuY3Rpb24gPSBmdW5jdGlvbih2YWx1ZTpUKTp2b2lke1xyXG5cdFx0dmFyIGluZGV4Om51bWJlciA9IHRoaXMuaW5kZXhPZih2YWx1ZSk7XHJcblx0XHR0aGlzLnJlbW92ZUF0KGluZGV4KTtcclxuXHR9XHJcbiBcclxuXHRyZW1vdmVBdDpGdW5jdGlvbiA9IGZ1bmN0aW9uKGluZGV4Om51bWJlcik6dm9pZHtcclxuXHRcdHRoaXMuc3BsaWNlKGluZGV4LCAxKTtcclxuXHR9XHJcbiBcclxuXHRjb250YWluczpGdW5jdGlvbiA9IGZ1bmN0aW9uKHZhbHVlOlQpOmJvb2xlYW57XHJcblx0XHRyZXR1cm4gdGhpcy5pbmRleE9mKHZhbHVlKT49MDtcclxuXHR9XHJcbiBcclxuXHRwdWJsaWMgZ2V0IGNvdW50KCk6bnVtYmVye1xyXG5cdFx0cmV0dXJuIHRoaXMubGVuZ3RoO1xyXG5cdH1cclxuIFxyXG5cdGNsZWFyOkZ1bmN0aW9uID0gZnVuY3Rpb24oKTp2b2lke1xyXG5cdFx0dGhpcy5zcGxpY2UoMCk7XHJcblx0fVxyXG4gXHJcblx0Zm9yZWFjaDpGdW5jdGlvbiA9IGZ1bmN0aW9uKGNhbGxiYWNrOkZ1bmN0aW9uKTp2b2lkIHtcclxuICAgICAgICB0aGlzLl9icmVha2luZyA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBzdW0gPSB0aGlzLmxlbmd0aDtcclxuICAgICAgICBmb3IodmFyIGk9MDtpPHN1bTtpKyspe1xyXG4gICAgICAgICAgICBpZih0aGlzLl9icmVha2luZyl7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYWxsYmFjayh0aGlzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiBcclxuICAgIF9icmVha2luZzpib29sZWFuID0gZmFsc2U7XHJcbiAgICBicmVhazpGdW5jdGlvbiA9IGZ1bmN0aW9uKCk6dm9pZCB7XHJcbiAgICAgICAgdGhpcy5fYnJlYWtpbmcgPSB0cnVlO1xyXG4gICAgfVxyXG4gXHJcblx0dG9BcnJheTpGdW5jdGlvbiA9IGZ1bmN0aW9uKCk6VFtde1xyXG5cdFx0dmFyIGFycmF5OlRbXSA9IFtdO1xyXG5cdFx0dGhpcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG5cdFx0XHRhcnJheS5wdXNoKGVsZW1lbnQpO1xyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gYXJyYXk7XHJcblx0fVxyXG4gXHJcblx0YXBwZW5kOkZ1bmN0aW9uID0gZnVuY3Rpb24odmFsdWU6VFtdKTp2b2lke1xyXG5cdFx0dmFsdWUuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuXHRcdFx0dGhpcy5wdXNoKGVsZW1lbnQpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcbiIsIlxyXG5cclxuZXhwb3J0IGNsYXNzIE1lc09iantcclxuICAgIHB1YmxpYyBsaXN0ZW5lcnM6QXJyYXk8RnVuY3Rpb24+O1xyXG4gICAgcHVibGljIG9iajphbnk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgTWVzc2VuZ2Vye1xyXG5cclxuICAgIHByaXZhdGUgbGlzdGVuZXJNYXAgPSBuZXcgTWFwPG51bWJlcixNZXNPYmo+KCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZExpc3RlbmVyKGVfdHlwZTpudW1iZXIsIGVfb2JqOmFueSwgZV9saXN0bmVyOkZ1bmN0aW9uKTp2b2lke1xyXG5cclxuICAgICAgICBsZXQgbXNnT2JqID0gdGhpcy5saXN0ZW5lck1hcC5nZXQoZV90eXBlKTtcclxuXHJcbiAgICAgICAgaWYodHlwZW9mKG1zZ09iaikgPT0gXCJ1bmRlZmluZWRcIil7XHJcbiAgICAgICAgICAgIG1zZ09iaiA9IG5ldyBNZXNPYmooKTtcclxuICAgICAgICAgICAgbXNnT2JqLm9iaiA9IGVfb2JqO1xyXG4gICAgICAgICAgICBtc2dPYmoubGlzdGVuZXJzID0gbmV3IEFycmF5PEZ1bmN0aW9uPigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtc2dPYmoubGlzdGVuZXJzLnB1c2goZV9saXN0bmVyKTtcclxuXHJcbiAgICAgICAgdGhpcy5saXN0ZW5lck1hcC5zZXQoZV90eXBlLCBtc2dPYmopO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRMaXN0ZW5lcihlX3R5cGU6bnVtYmVyKTpNZXNPYmp7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdGVuZXJNYXAuZ2V0KGVfdHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGJyb2FkY2FzdChlX3R5cGU6bnVtYmVyLCAuLi5wYXJhbXM6YW55W10pIDogdm9pZCB7XHJcblxyXG4gICAgICAgIGxldCBtc2dPYmogPSB0aGlzLmxpc3RlbmVyTWFwLmdldChlX3R5cGUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHR5cGVvZihtc2dPYmopICE9IFwidW5kZWZpbmVkXCIpe1xyXG4gICAgICAgICAgICBmb3IobGV0IGwgb2YgbXNnT2JqLmxpc3RlbmVycyl7XHJcbiAgICAgICAgICAgICAgIGwuYXBwbHkobXNnT2JqLm9iaiwgcGFyYW1zKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlTGlzdGVuZXJCeVR5cGUoZV90eXBlOm51bWJlcikgOnZvaWQge1xyXG5cclxuICAgICAgICB0aGlzLmxpc3RlbmVyTWFwLmRlbGV0ZShlX3R5cGUpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlTGlzdGVuZXIoZV90eXBlOm51bWJlciwgZV9saXN0ZW5lcjpGdW5jdGlvbiApOnZvaWR7XHJcblxyXG4gICAgICAgIGxldCBtc2dPYmogPSB0aGlzLmxpc3RlbmVyTWFwLmdldChlX3R5cGUpO1xyXG5cclxuICAgICAgICBpZih0eXBlb2YobXNnT2JqKSAhPSBcInVuZGVmaW5lZFwiKXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZvcihsZXQgaTpudW1iZXIgPTA7IGk8IG1zZ09iai5saXN0ZW5lcnMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYobXNnT2JqLmxpc3RlbmVyc1tpXSA9PSBlX2xpc3RlbmVyKXtcclxuICAgICAgICAgICAgICAgICAgICBtc2dPYmoubGlzdGVuZXJzLnNwbGljZShpLDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcnVwKCk6dm9pZHtcclxuXHJcbiAgICAgICAgdGhpcy5saXN0ZW5lck1hcC5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxufSIsIlxyXG5cclxuXHJcbi8vIEZhaXJ5R1VJIOWFg+S7tiDnu5HlrprlmahcclxuZXhwb3J0IGZ1bmN0aW9uIGJpbmRlcihuYW1lOnN0cmluZyl7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24odGFyZ2V0OmFueSwga2V5OnN0cmluZyB8IHN5bWJvbCl7XHJcbiAgICAgICAgdGFyZ2V0W1wiYmluZGVyc1wiXSA9IHRhcmdldFtcImJpbmRlcnNcIl0gfHwge307XHJcbiAgICAgICAgdGFyZ2V0W1wiYmluZGVyc1wiXVtrZXldID0gbmFtZTtcclxuICAgIH1cclxufSIsIlxyXG5pbXBvcnQgeyBTaW5nbGV0b24gfSBmcm9tICcuL1NpbmdsZXRvbic7XHJcbmltcG9ydCB7ICRwcm9taXNlIH0gZnJvbSAncHVlcnRzJztcclxuaW1wb3J0IHtOaWNlVFMsIFVuaXR5RW5naW5lfSBmcm9tICdjc2hhcnAnO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICcuLi9sb2dnZXIvTG9nZ2VyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBSZXNNYW5hZ2VyIGV4dGVuZHMgU2luZ2xldG9uPFJlc01hbmFnZXI+e1xyXG5cclxuICAgIHByaXZhdGUgX3BrZ01hcDpNYXA8c3RyaW5nLG51bWJlcj4gPSBuZXcgTWFwPHN0cmluZyxudW1iZXI+KCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGxvYWRGYWlyeUdVSVBhY2thZ2UocGFja2FnZU5hbWU6c3RyaW5nKXtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGxldCBjb3VudCA9IHRoaXMuX3BrZ01hcC5nZXQocGFja2FnZU5hbWUpO1xyXG4gICAgICAgICAgICBpZihjb3VudCA9PSBudWxsIHx8IGNvdW50IDwgMSl7XHJcbiAgICAgICAgICAgICAgICAvL+ayoeaciee8k+WtmO+8jOWKoOi9vVxyXG4gICAgICAgICAgICAgICAgbGV0IGFkZHJlc3MgPSBwYWNrYWdlTmFtZStcIl9mdWkuYnl0ZXNcIjtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFkZHJlc3MpXHJcbiAgICAgICAgICAgICAgICBsZXQgdGFzayA9IE5pY2VUUy5SZXNvdXJjZU1hbmFnZXIuTG9hZEZhaXJ5R1VJUGFja2FnZShhZGRyZXNzLHBhY2thZ2VOYW1lKTtcclxuICAgICAgICAgICAgICAgIGF3YWl0ICRwcm9taXNlKHRhc2spO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGtnTWFwLnNldChwYWNrYWdlTmFtZSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BrZ01hcC5zZXQocGFja2FnZU5hbWUsIGNvdW50KzEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWNhdGNoKGV4KXtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBMb2FkIGZhaXJ5R1VJIDoke3BhY2thZ2VOYW1lfSA6ICR7ZXh9YClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyByZWxlYXNlRmFpcnlHVUlQYWNrYWdlKHBhY2thZ2VOYW1lKXtcclxuXHJcbiAgICAgICAgbGV0IGNvdW50ID0gdGhpcy5fcGtnTWFwLmdldChwYWNrYWdlTmFtZSk7XHJcbiAgICAgICAgaWYoY291bnQhPW51bGwgJiYgY291bnQ+MSl7XHJcbiAgICAgICAgICAgIHRoaXMuX3BrZ01hcC5zZXQocGFja2FnZU5hbWUsIGNvdW50LTEpO1xyXG4gICAgICAgIH1lbHNle1xyXG5cclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhgcmVsZWFzZSBmYWd1aSBwYWNrYWdlOiR7cGFja2FnZU5hbWV9YCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3BrZ01hcC5kZWxldGUocGFja2FnZU5hbWUpO1xyXG4gICAgICAgICAgICBOaWNlVFMuUmVzb3VyY2VNYW5hZ2VyLlJlbGVhc2VGR1VJUGFja2FnZShwYWNrYWdlTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGxvYWRTY2VuZShzY2VuZU5hbWU6c3RyaW5nLCBtb2RlID0gVW5pdHlFbmdpbmUuU2NlbmVNYW5hZ2VtZW50LkxvYWRTY2VuZU1vZGUuU2luZ2xlKXtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHRhc2sgPSBOaWNlVFMuUmVzb3VyY2VNYW5hZ2VyLkxvYWRTY2VuZShzY2VuZU5hbWUsIG1vZGUsKHByb2dyZXNzOk51bWJlcik9PntcclxuICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCJsb2FkIHNjZW5lOiBcIitwcm9ncmVzcylcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2Nlbkluc3RhbmNlID0gYXdhaXQgJHByb21pc2UodGFzaylcclxuICAgICAgICAgICAgcmV0dXJuIHNjZW5JbnN0YW5jZVxyXG5cclxuICAgICAgICB9Y2F0Y2goZXgpe1xyXG5cclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBMb2FkIFNjZW5lIDoke3NjZW5lTmFtZX0gOiAke2V4fWApXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGFzeW5jIHVubG9hZFNjZW5lKHNjZW5lSW5zdGFuY2U6VW5pdHlFbmdpbmUuUmVzb3VyY2VNYW5hZ2VtZW50LlJlc291cmNlUHJvdmlkZXJzLlNjZW5lSW5zdGFuY2Upe1xyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgbGV0IHRhc2s9IE5pY2VUUy5SZXNvdXJjZU1hbmFnZXIuVW5sb2FkU2NlbmUoc2NlbmVJbnN0YW5jZSlcclxuICAgICAgICAgICAgbGV0IGdvID0gYXdhaXQgJHByb21pc2UodGFzayk7XHJcbiAgICAgICAgICAgIHJldHVybiBnbztcclxuICAgICAgICB9Y2F0Y2goZXgpe1xyXG5cclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBVbmxvYWQgc2NlbmUgIDogJHtleH1gKVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1bmxvYWRTY2VuZUJ5TmFtZShzY2VuZU5hbWU6c3RyaW5nKXtcclxuXHJcbiAgICAgICAgTmljZVRTLlJlc291cmNlTWFuYWdlci5VbmxvYWRTY2VuZUJ5TmFtZShzY2VuZU5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGxvYWRQcmVmYWIoYWRkcmVzczpzdHJpbmcpe1xyXG5cclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGxldCB0YXNrPSBOaWNlVFMuUmVzb3VyY2VNYW5hZ2VyLkxvYWRQcmVmYWIoYWRkcmVzcyk7XHJcbiAgICAgICAgICAgIGxldCBnbyA9IGF3YWl0ICRwcm9taXNlKHRhc2spO1xyXG4gICAgICAgICAgICByZXR1cm4gZ287XHJcbiAgICAgICAgfWNhdGNoKGV4KXtcclxuXHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihgTG9hZCBwcmVmYWIgOiR7YWRkcmVzc30gOiAke2V4fWApXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGxvYWRUZXh0QXNzZXQoYWRkcmVzczpzdHJpbmcpe1xyXG5cclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGxldCB0YXNrID0gTmljZVRTLlJlc291cmNlTWFuYWdlci5Mb2FkVGV4dEFzc2V0KGFkZHJlc3MpO1xyXG4gICAgICAgICAgICBsZXQgZ28gPSBhd2FpdCAkcHJvbWlzZSh0YXNrKTtcclxuICAgICAgICAgICAgcmV0dXJuIGdvO1xyXG4gICAgICAgIH1jYXRjaChleCl7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihgTG9hZCB0ZXh0YXNzZXQgOiR7YWRkcmVzc30gOiAke2V4fWApXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGFzeW5jIGxvYWRUZXh0Qnl0ZXMoYWRkcmVzczpzdHJpbmcpe1xyXG5cclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGxldCB0YXNrID0gTmljZVRTLlJlc291cmNlTWFuYWdlci5Mb2FkVGV4dEJ5dGVzKGFkZHJlc3MpO1xyXG4gICAgICAgICAgICBsZXQgYnl0ZXMgPSBhd2FpdCAkcHJvbWlzZSh0YXNrKTtcclxuICAgICAgICAgICAgcmV0dXJuIGJ5dGVzO1xyXG4gICAgICAgIH1jYXRjaChleCl7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihgTG9hZFRleHRCeXRlcyA6JHthZGRyZXNzfSA6ICR7ZXh9YClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgbG9hZFNwcml0ZShhZGRyZXNzOnN0cmluZyl7XHJcblxyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgbGV0IHRhc2sgPSBOaWNlVFMuUmVzb3VyY2VNYW5hZ2VyLkxvYWRTcHJpdGUoYWRkcmVzcyk7XHJcbiAgICAgICAgICAgIGxldCBnbyA9IGF3YWl0ICRwcm9taXNlKHRhc2spO1xyXG4gICAgICAgICAgICByZXR1cm4gZ287XHJcblxyXG4gICAgICAgIH1jYXRjaChleCl7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihgTG9hZCBzcHJpdGUgOiR7YWRkcmVzc30gOiAke2V4fWApXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyByZWxlYXNlQWRkcmVzc0dPKGdvOmFueSl7XHJcblxyXG4gICAgICAgIE5pY2VUUy5SZXNvdXJjZU1hbmFnZXIuUmVsZWFzZUFkZHJlc3NHTyhnbyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIFxyXG59IiwiXHJcblxyXG5leHBvcnQgY2xhc3MgU2luZ2xldG9uPFQ+e1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOmFueSA9IG51bGw7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBJbnN0YW5jZTxUPiggYzogeyBuZXcoKTogVCB9ICkgOiBUe1xyXG5cclxuICAgICAgICBpZih0aGlzLmluc3RhbmNlID09IG51bGwpe1xyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlID0gbmV3IGMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IFVuaXR5RW5naW5lIH0gZnJvbSAnY3NoYXJwJztcclxuaW1wb3J0IHsgR2FtZUNvbmZpZyB9IGZyb20gJy4uLy4uL2dsb2JhbC9HYW1lQ29uZmlnJztcclxuZW51bSBMb2dUeXBlIHtcclxuXHRFcnJvciA9IDAsXHJcblx0QXNzZXJ0ID0gMSxcclxuXHRXYXJuaW5nID0gMixcclxuXHRMb2cgPSAzLFxyXG5cdEV4Y2VwdGlvbiA9IDRcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIExvZ2dlcntcclxuICAgIHByaXZhdGUgIHN0YXRpYyAgdW5pdHlfbG9nX3RhcmdldCA9IG51bGw7XHJcblxyXG4gICAgc3RhdGljIGdldFByaW50U3RhY2sodHlwZTogTG9nVHlwZSwgc2hvd1N0YWNrIDogYm9vbGVhbiwgLi4uYXJncykge1xyXG4gICAgICAgIGxldCBtZXNzYWdlID0gJyc7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBhcmdzW2ldO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdvYmplY3QnICYmIExvZ2dlci5MT0dfT0JKRUNUX1RPX0pTT04pIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgKz0gSlNPTi5zdHJpbmdpZnkoZWxlbWVudCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlICs9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGkgPCBhcmdzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgKz0gJyAnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgaWYgKHNob3dTdGFjayB8fCBVbml0eUVuZ2luZS5BcHBsaWNhdGlvbi5pc0VkaXRvcikge1xyXG4gICAgICAgICAgICB2YXIgc3RhY2tzID0gbmV3IEVycm9yKCkuc3RhY2suc3BsaXQoJ1xcbicpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMzsgaSA8IHN0YWNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGluZSA9IHN0YWNrc1tpXTtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgKz0gJ1xcbic7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlICs9IGxpbmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBpZiAoIUxvZ2dlci51bml0eV9sb2dfdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIExvZ2dlci51bml0eV9sb2dfdGFyZ2V0ID0gbmV3IFVuaXR5RW5naW5lLk9iamVjdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG5cdHN0YXRpYyBsb2coLi4uYXJncyk6IHZvaWR7XHJcbiAgICAgICAgaWYoIUdhbWVDb25maWcuZGVidWcpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IG1zZyA9IExvZ2dlci5nZXRQcmludFN0YWNrKExvZ1R5cGUuTG9nLCB0cnVlLCBhcmdzKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xyXG4gICAgfVxyXG5cclxuXHQvKipcclxuXHQgKiBPdXRwdXRzIGEgd2FybmluZyBtZXNzYWdlIHRvIHRoZSBMb2dnZXIuXHJcblx0ICogQHBhcmFtIG1lc3NhZ2UgIGxpc3Qgb2YgSmF2YVNjcmlwdCBvYmplY3RzIHRvIG91dHB1dC4gVGhlIHN0cmluZyByZXByZXNlbnRhdGlvbnMgb2YgZWFjaCBvZiB0aGVzZSBvYmplY3RzIGFyZSBhcHBlbmRlZCB0b2dldGhlciBpbiB0aGUgb3JkZXIgbGlzdGVkIGFuZCBvdXRwdXQuXHJcblx0ICovXHJcblx0c3RhdGljIHdhcm4oLi4uYXJncyk6IHZvaWR7XHJcbiAgICAgICAgaWYoIUdhbWVDb25maWcuZGVidWcpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IG1zZyA9IExvZ2dlci5nZXRQcmludFN0YWNrKExvZ1R5cGUuV2FybmluZywgdHJ1ZSwgYXJncyk7XHJcbiAgICAgICAgY29uc29sZS53YXJuKG1zZyk7XHJcbiAgICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE91dHB1dHMgYW4gZXJyb3IgbWVzc2FnZSB0byB0aGUgTG9nZ2VyLlxyXG5cdCAqIEBwYXJhbSBtZXNzYWdlIEEgbGlzdCBvZiBKYXZhU2NyaXB0IG9iamVjdHMgdG8gb3V0cHV0LiBUaGUgc3RyaW5nIHJlcHJlc2VudGF0aW9ucyBvZiBlYWNoIG9mIHRoZXNlIG9iamVjdHMgYXJlIGFwcGVuZGVkIHRvZ2V0aGVyIGluIHRoZSBvcmRlciBsaXN0ZWQgYW5kIG91dHB1dC5cclxuXHQgKi9cclxuXHRzdGF0aWMgZXJyb3IoLi4uYXJncyk6IHZvaWR7XHJcbiAgICAgICAgaWYoIUdhbWVDb25maWcuZGVidWcpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IG1zZyA9IExvZ2dlci5nZXRQcmludFN0YWNrKExvZ1R5cGUuRXJyb3IsIHRydWUsIGFyZ3MpO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcclxuICAgIH1cclxuXHJcblx0LyoqIE91dHB1dHMgYSBzdGFjayB0cmFjZSB0byB0aGUgTG9nZ2VyLlxyXG5cdCAqIEBwYXJhbSBtZXNzYWdlIEEgbGlzdCBvZiBKYXZhU2NyaXB0IG9iamVjdHMgdG8gb3V0cHV0LiBUaGUgc3RyaW5nIHJlcHJlc2VudGF0aW9ucyBvZiBlYWNoIG9mIHRoZXNlIG9iamVjdHMgYXJlIGFwcGVuZGVkIHRvZ2V0aGVyIGluIHRoZSBvcmRlciBsaXN0ZWQgYW5kIG91dHB1dC5cclxuXHQqL1xyXG5cdHN0YXRpYyB0cmFjZSguLi5hcmdzKTogdm9pZHtcclxuICAgICAgICBpZighR2FtZUNvbmZpZy5kZWJ1ZykgcmV0dXJuO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBtc2cgPSBMb2dnZXIuZ2V0UHJpbnRTdGFjayhMb2dUeXBlLkxvZywgdHJ1ZSwgYXJncyk7XHJcbiAgICAgICAgY29uc29sZS5sb2cobXNnKTtcclxuICAgIH1cclxuXHJcblx0LyoqIExvZyBKYXZhU2NyaXB0IE9iamVjdHMgYXMgSlNPTiBmb3JtYXQgKi9cclxuXHRzdGF0aWMgTE9HX09CSkVDVF9UT19KU09OKC4uLmFyZ3MpOiBib29sZWFue1xyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgU2luZ2xldG9uIH0gZnJvbSBcIi4uL2NvbW1vbi9TaW5nbGV0b25cIjtcclxuaW1wb3J0IHsgT3Bjb2RlIH0gZnJvbSBcIi4uLy4uL2RhdGEvcGIvT3Bjb2RlXCI7XHJcbmltcG9ydCB7IE5ldEVycm9yQ29kZSB9IGZyb20gXCIuL05ldEVycm9yQ29kZVwiO1xyXG5pbXBvcnQgeyBOaWNlVFMgfSBmcm9tIFwiY3NoYXJwXCI7XHJcbmltcG9ydCB7IE1lc3NhZ2VQYXJzZXIgfSBmcm9tIFwiLi9NZXNzYWdlUGFyc2VyXCI7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuLi9sb2dnZXIvTG9nZ2VyXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIE1zZ1BhY2t7XHJcbiAgICBwdWJsaWMgc2VuZFRpbWU6bnVtYmVyO1xyXG4gICAgcHVibGljIGNhbGxiYWNrOkZ1bmN0aW9uO1xyXG4gICAgcHVibGljIHJldHJ5VGltZXM6bnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBieXRlczpVaW50OEFycmF5O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgR2FtZVNlc3Npb24gZXh0ZW5kcyBTaW5nbGV0b248R2FtZVNlc3Npb24+e1xyXG5cclxuICAgIHB1YmxpYyBpZDpudW1iZXIgPSAwOyAgLy9zZXNzaW9uIElEXHJcbiAgICBwcml2YXRlIHJlU2VuZEludGVydmFsOm51bWJlciA9IDEwMDAwOyAvLzEw56eS6YeN5Y+R5LiA5qyhXHJcbiAgICBwcml2YXRlIHRpbWVvdXRJbnRlcnZhbDpudW1iZXIgPSA1MDAwOyAvLzXnp5Lmo4Dmn6XkuIDmrKHmmK/lkKbotoXml7ZcclxuICAgIHByaXZhdGUgbWF4UmVTZW5kVGltZXM6bnVtYmVyID0gNTsgLy/mnIDlpKfph43lj5HmrKHmlbBcclxuICAgIHByaXZhdGUgdGltZW91dElpbWVyOmFueTtcclxuXHJcbiAgICBwcml2YXRlIF9ycGNJZDpudW1iZXIgPSAxO1xyXG4gICAgcHJpdmF0ZSBjaGFubmVsOmFueTtcclxuICAgIHByaXZhdGUgcmVxdWVzdENhbGxiYWNrOk1hcDxudW1iZXIsTXNnUGFjaz4gPSBuZXcgTWFwPG51bWJlcixNc2dQYWNrPigpO1xyXG4gICAgcHJpdmF0ZSBsaXN0ZW5lcnM6TWFwPG51bWJlcixGdW5jdGlvbj4gPSBuZXcgTWFwPG51bWJlcixGdW5jdGlvbj4oKTtcclxuXHJcbiAgICAvL+i/lOWbnueahOacjeWKoeWZqElELCDnsbvlnotcclxuICAgIHByaXZhdGUgX3NlcnZlcklkOm51bWJlciA9IC0xO1xyXG4gICAgcHJpdmF0ZSBfc2VydmVyVHlwZTpudW1iZXIgPSAxO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHJwY0lkKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiArK3RoaXMuX3JwY0lkO1xyXG4gICAgfVxyXG5cclxuICAgIC8vYWRkcmVzcy0+IGlwOnBvcnRcclxuICAgIHB1YmxpYyBjb25uZWN0Q2hhbm5lbChhZGRyZXNzOnN0cmluZywgY29ubkNhYmFjazphbnkpe1xyXG5cclxuICAgICAgICB0aGlzLmNoYW5uZWwgPSBOaWNlVFMuVFNlcnZpY2UuSW5zdGFuY2UuR2V0Q2hhbm5lbCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY2hhbm5lbC5lcnJvckNhbGxiYWNrID0gKGNoYW5uZWw6YW55LCBjb2RlOm51bWJlcik9PntcclxuICAgICAgICAgICAgaWYoY29kZSA9PSBOZXRFcnJvckNvZGUuRVJSX1NvY2tldENvbm5TdWNjKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudGltZW91dElpbWVyID0gc2V0SW50ZXJ2YWwoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrVGltZW91dE1zZygpO1xyXG4gICAgICAgICAgICAgICAgfSwgdGhpcy50aW1lb3V0SW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25uQ2FiYWNrKGNoYW5uZWwsIGNvZGUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jaGFubmVsLnJlYWRDYWxsYmFjayA9IChidWZmZXI6VWludDhBcnJheSk9PntcclxuICAgICAgICAgICAgdGhpcy5vblJlY2VpdmUoYnVmZmVyKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmNoYW5uZWwuQ29ubmVjdChhZGRyZXNzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mjqXmlLbmnI3liqHlmajpgJrnn6VcclxuICAgIHB1YmxpYyBsaXN0ZW4ob3Bjb2RlOm51bWJlcixjYWxsYmFjazpGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMuc2V0KG9wY29kZSwgY2FsbGJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Y+R6YCBcHJvdG91Ymbmtojmga9cclxuICAgIC8v5raI5oGv77yaIHJwY19pZFs0XSAtIG9wY29kZVsyXSAtIHNlcnZlcl9pZFsyXSAtIHNlcnZlcl90eXBlWzFdIC0gXHJcbiAgICBwdWJsaWMgc2VuZChvcGNvZGU6bnVtYmVyLHJwY2lkOm51bWJlciwgbWVzc2FnZTpVaW50OEFycmF5LCBjYWxsQmFjazpGdW5jdGlvbil7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/lsIHoo4Xmtojmga/vvJpcclxuICAgICAgICBsZXQgcnBjQnVmOlVpbnQ4QXJyYXkgPSBNZXNzYWdlUGFyc2VyLmVuY29kZUludChycGNpZCk7IC8vNFxyXG4gICAgICAgIGxldCBvcGNvZGVCdWY6VWludDhBcnJheSA9IE1lc3NhZ2VQYXJzZXIuZW5jb2RlU2hvcnQob3Bjb2RlKTsgLy8yXHJcbiAgICAgICAgbGV0IHNlcnZlcmlkQnVmOlVpbnQ4QXJyYXkgPSBNZXNzYWdlUGFyc2VyLmVuY29kZVNob3J0KHRoaXMuX3NlcnZlcklkKTsgLy8yXHJcbiAgICAgICAgbGV0IHNlcnZlcnR5cGVCdWY6VWludDhBcnJheSA9IE1lc3NhZ2VQYXJzZXIuZW5jb2RlQnl0ZSh0aGlzLl9zZXJ2ZXJUeXBlKTsgLy8xXHJcblxyXG5cclxuICAgICAgICBsZXQgc2VuZEFycmF5OlVpbnQ4QXJyYXkgPSBuZXcgVWludDhBcnJheSg0ICsgMiArIDIgKyAxICttZXNzYWdlLmxlbmd0aCk7XHJcbiAgICAgICAgc2VuZEFycmF5LnNldChycGNCdWYpO1xyXG4gICAgICAgIHNlbmRBcnJheS5zZXQob3Bjb2RlQnVmLCAgICA0KTtcclxuICAgICAgICBzZW5kQXJyYXkuc2V0KHNlcnZlcmlkQnVmLCAgNCArIDIpO1xyXG4gICAgICAgIHNlbmRBcnJheS5zZXQoc2VydmVydHlwZUJ1ZiwgNCArIDIgKyAyKTtcclxuICAgICAgICBzZW5kQXJyYXkuc2V0KG1lc3NhZ2UsICAgICAgIDQgKyAyICsgMiArIDEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGNhbGxCYWNrICE9IG51bGwpe1xyXG4gICAgICAgICAgICBsZXQgbXNnUGFjazpNc2dQYWNrID0gbmV3IE1zZ1BhY2soKTtcclxuICAgICAgICAgICAgbXNnUGFjay5zZW5kVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICBtc2dQYWNrLmNhbGxiYWNrID0gY2FsbEJhY2s7XHJcbiAgICAgICAgICAgIG1zZ1BhY2suYnl0ZXMgPSBzZW5kQXJyYXk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RDYWxsYmFjay5zZXQocnBjaWQsIG1zZ1BhY2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBmb3IobGV0IGkgaW4gc2VuZEFycmF5KXtcclxuICAgICAgICAvLyAgICAgTG9nZ2VyLmxvZyhcIlRTIC0tIHNlbmQgYXJyYXk6IFwiK2kpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvL0xvZ2dlci5sb2coXCJzZW5kIGFycmF5OiBcIitzZW5kQXJyYXkpO1xyXG4gICAgICAgIHRoaXMuY2hhbm5lbC5TZW5kKHNlbmRBcnJheSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZVNlbmQoYnl0ZXM6VWludDhBcnJheSl7XHJcbiAgICAgICAgdGhpcy5jaGFubmVsLlNlbmQoYnl0ZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvblJlY2VpdmUoYnVmZmVyOlVpbnQ4QXJyYXkpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBtc2dCdWYgPSBuZXcgVWludDhBcnJheShidWZmZXIpO1xyXG5cclxuICAgICAgICBsZXQgcnBjaWQgPSBNZXNzYWdlUGFyc2VyLmRlY29kZUludChtc2dCdWYuc3ViYXJyYXkoMCw0KSk7XHJcbiAgICAgICAgbGV0IG9wY29kZSA9IE1lc3NhZ2VQYXJzZXIuZGVjb2RlU2hvcnQobXNnQnVmLnN1YmFycmF5KDQsNikpO1xyXG4gICAgICAgIGxldCBzZXJ2ZXJpZCA9IE1lc3NhZ2VQYXJzZXIuZGVjb2RlU2hvcnQobXNnQnVmLnN1YmFycmF5KDYsOCkpO1xyXG4gICAgICAgIGxldCBzZXJ2ZXJ0eXBlID0gTWVzc2FnZVBhcnNlci5kZWNvZGVCeXRlKG1zZ0J1Zi5zdWJhcnJheSg4LDkpKTtcclxuXHJcbiAgICAgICAgdGhpcy5fc2VydmVySWQgPSBzZXJ2ZXJpZDtcclxuICAgICAgICB0aGlzLl9zZXJ2ZXJUeXBlID0gc2VydmVydHlwZTtcclxuXHJcbiAgICAgICAgbGV0IG1zZ0J5dGVzOlVpbnQ4QXJyYXkgPSBtc2dCdWYuc3ViYXJyYXkoOSk7XHJcblxyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgbGV0IGRlY29kZU1zZyA9ICBPcGNvZGUuZGVjb2RlKG9wY29kZSwgbXNnQnl0ZXMpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGlmKHJwY2lkPT11bmRlZmluZWQgfHwgIXRoaXMucmVxdWVzdENhbGxiYWNrLmhhcyhycGNpZCkpe1xyXG4gICAgICAgICAgICAgICAgLy/mo4Dmn6XmmK/lkKbmmK/mnI3liqHlmajkuIvlj5HnmoTmtojmga9cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMubGlzdGVuZXJzLmhhcyhvcGNvZGUpKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGlzdGVuID0gdGhpcy5saXN0ZW5lcnMuZ2V0KG9wY29kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuKGRlY29kZU1zZy5tc2dPYmopO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbGV0IG1zZ1BhY2s6TXNnUGFjayA9IHRoaXMucmVxdWVzdENhbGxiYWNrLmdldChycGNpZCk7XHJcbiAgICAgICAgICAgICAgICBtc2dQYWNrLmNhbGxiYWNrKGRlY29kZU1zZy5tc2dPYmopOyAgXHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdENhbGxiYWNrLmRlbGV0ZShycGNpZCk7XHJcbiAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1jYXRjaChlKXtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwicGFyc2UgbXNnIGVycm9yLCBvcGNvZGU6XCIrb3Bjb2RlKVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja1RpbWVvdXRNc2coKXtcclxuXHJcbiAgICAgICAgbGV0IGN1cnJUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblxyXG4gICAgICAgIHRoaXMucmVxdWVzdENhbGxiYWNrLmZvckVhY2goKHZhbHVlLCBrZXkpID0+e1xyXG5cclxuICAgICAgICAgICAgaWYodmFsdWUucmV0cnlUaW1lcyA+PSB0aGlzLm1heFJlU2VuZFRpbWVzKSB7XHJcbiAgICAgICAgICAgICAgICAvL+i2hei/h+acgOWkp+mHjeWPkeasoeaVsO+8jOS4ouW8g1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhgTWVzc2FnZSByZXNlbmQgdG9vIG1vcmUsIG9wY29kZToke2tleX0sIGxhc3RzZW5kOiR7dmFsdWUuc2VuZFRpbWV9YCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3RDYWxsYmFjay5kZWxldGUoa2V5KTsgXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKChjdXJyVGltZSAtIHZhbHVlLnNlbmRUaW1lKSA+PSB0aGlzLnJlU2VuZEludGVydmFsKXtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZS5yZXRyeVRpbWVzKys7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUuc2VuZFRpbWUgPSBjdXJyVGltZTtcclxuICAgICAgICAgICAgICAgICAgICAvL+mHjeWPkea2iOaBr1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVTZW5kKHZhbHVlLmJ5dGVzKTtcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIubG9nKGByZXNlbmQgbWVzc2FnZTosIG9wY29kZToke2tleX0sIHJldHJ5IHRpbWVzOiR7dmFsdWUucmV0cnlUaW1lc31gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZGlzY29ubmVjdCgpOnZvaWR7XHJcblxyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lb3V0SWltZXIpO1xyXG5cclxuICAgICAgICB0aGlzLmNoYW5uZWwuRGlzcG9zZSgpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgTmljZVRTIH0gZnJvbSBcImNzaGFycFwiO1xyXG5pbXBvcnQgeyAkcHJvbWlzZSB9IGZyb20gXCJwdWVydHNcIjtcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4uL2xvZ2dlci9Mb2dnZXJcIjtcclxuaW1wb3J0IHsgU2luZ2xldG9uIH0gZnJvbSBcIi4uL2NvbW1vbi9TaW5nbGV0b25cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBIdHRwTWFuYWdlciBleHRlbmRzIFNpbmdsZXRvbjxIdHRwTWFuYWdlcj57XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgYXN5bmMgZ2V0KHVybDpzdHJpbmcpe1xyXG5cclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGxldCB0YXNrPSBOaWNlVFMuSHR0cE1hbmFnZXIuR2V0KHVybClcclxuICAgICAgICAgICAgbGV0IHR4dCA9IGF3YWl0ICRwcm9taXNlKHRhc2spO1xyXG4gICAgICAgICAgICByZXR1cm4gdHh0O1xyXG4gICAgICAgIH1jYXRjaChleCl7XHJcblxyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoYEdldCBlcnJvciA6JHt1cmx9IDogJHtleH1gKVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBwb3N0KHVybDpzdHJpbmcsIGZvcm06c3RyaW5nKXtcclxuXHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICBsZXQgdGFzaz0gTmljZVRTLkh0dHBNYW5hZ2VyLlBvc3QodXJsLCBmb3JtKVxyXG4gICAgICAgICAgICBsZXQgdHh0ID0gYXdhaXQgJHByb21pc2UodGFzayk7XHJcbiAgICAgICAgICAgIHJldHVybiB0eHQ7XHJcblxyXG4gICAgICAgIH1jYXRjaChleCl7XHJcblxyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoYFBvc3QgZXJyb3IgOiR7dXJsfSA6ICR7ZXh9YClcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIiwiXHJcbmV4cG9ydCBjbGFzcyBNZXNzYWdlUGFyc2Vye1xyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGVuY29kZUludChuOm51bWJlcik6VWludDhBcnJheXtcclxuXHJcbiAgICAgICAgbGV0IGJ1ZmZlcjpVaW50OEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoNCk7XHJcbiAgICAgICAgYnVmZmVyWzBdID0gbiA+Pj4gMjQ7XHJcbiAgICAgICAgYnVmZmVyWzFdID0gbiA+Pj4gMTY7XHJcbiAgICAgICAgYnVmZmVyWzJdID0gbiA+Pj4gODtcclxuICAgICAgICBidWZmZXJbM10gPSBuICYgMHhmZjtcclxuXHJcbiAgICAgICAgcmV0dXJuIGJ1ZmZlclxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZGVjb2RlSW50KGJ1ZmZlcjpVaW50OEFycmF5KTpudW1iZXJ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IG4gPSBidWZmZXJbMF0gPDwgMjQgfCBidWZmZXJbMV0gPDwgMTYgfCBidWZmZXJbMl0gPDwgOCB8IGJ1ZmZlclszXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG47XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZW5jb2RlU2hvcnQobjpudW1iZXIpOlVpbnQ4QXJyYXl7XHJcblxyXG4gICAgICAgIGxldCBidWZmZXIgOiBVaW50OEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoMik7XHJcbiAgICAgICAgYnVmZmVyWzBdID0gbiA+Pj4gODtcclxuICAgICAgICBidWZmZXJbMV0gPSBuICYgMHhmZjtcclxuXHJcbiAgICAgICAgcmV0dXJuIGJ1ZmZlcjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBkZWNvZGVTaG9ydChidWZmZXI6VWludDhBcnJheSk6bnVtYmVye1xyXG5cclxuICAgICAgICBsZXQgbiA9IGJ1ZmZlclswXSA8PCA4IHwgYnVmZmVyWzFdO1xyXG5cclxuICAgICAgICByZXR1cm4gbjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBlbmNvZGVCeXRlKG46bnVtYmVyKTpVaW50OEFycmF5e1xyXG5cclxuICAgICAgICBsZXQgYnVmZmVyIDogVWludDhBcnJheSA9IG5ldyBVaW50OEFycmF5KDEpXHJcbiAgICAgICAgYnVmZmVyWzBdID0gbiAmIDB4ZmY7XHJcblxyXG4gICAgICAgIHJldHVybiBidWZmZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBkZWNvZGVCeXRlKGJ1ZmZlcjpVaW50OEFycmF5KTpudW1iZXJ7XHJcblxyXG4gICAgICAgIGxldCBuID0gYnVmZmVyWzBdO1xyXG5cclxuICAgICAgICByZXR1cm4gbjtcclxuICAgIH1cclxuXHJcblxyXG5cclxufSIsIlxyXG5cclxuIGV4cG9ydCBjbGFzcyBOZXRFcnJvckNvZGVcclxuIHtcclxuICAgICBwdWJsaWMgc3RhdGljICBFUlJfU29ja2V0Q29ublN1Y2M6bnVtYmVyID0gMTAwMDAwO1xyXG5cclxuICAgICBwdWJsaWMgc3RhdGljICBFUlJfQ29ubmVjdEdhdGVLZXlFcnJvcjpudW1iZXIgPSAxMDAwMDY7XHJcblxyXG4gICAgIHB1YmxpYyBzdGF0aWMgIEVSUl9QZWVyRGlzY29ubmVjdDpudW1iZXIgICA9IDEwMjAwODtcclxuICAgICBwdWJsaWMgc3RhdGljICBFUlJfU29ja2V0Q2FudFNlbmQ6bnVtYmVyICAgPSAxMDIwMDk7XHJcbiAgICAgcHVibGljIHN0YXRpYyAgRVJSX1NvY2tldEVycm9yOm51bWJlciAgICAgID0gMTAyMDEwO1xyXG4gICAgIHB1YmxpYyBzdGF0aWMgIEVSUl9Tb2NrZXRDb25uRXJyb3I6bnVtYmVyICA9IDEwMjAxMTtcclxuXHJcblxyXG4gICAgIFxyXG5cclxuIH0iLCJcclxuaW1wb3J0IHsgT3Bjb2RlIH0gZnJvbSBcIi4uLy4uL2RhdGEvcGIvT3Bjb2RlXCI7XHJcbmltcG9ydCB7IEdhbWVDb25maWcgfSBmcm9tIFwiLi4vLi4vZ2xvYmFsL0dhbWVDb25maWdcIjtcclxuaW1wb3J0IHsgU2luZ2xldG9uIH0gZnJvbSBcIi4uL2NvbW1vbi9TaW5nbGV0b25cIjtcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4uL2xvZ2dlci9Mb2dnZXJcIjtcclxuaW1wb3J0IHsgR2FtZVNlc3Npb24gfSBmcm9tIFwiLi9HYW1lU2Vzc2lvblwiO1xyXG5pbXBvcnQgeyBOZXRFcnJvckNvZGUgfSBmcm9tIFwiLi9OZXRFcnJvckNvZGVcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgU2Vzc2lvbk1hbmFnZXIgZXh0ZW5kcyBTaW5nbGV0b248U2Vzc2lvbk1hbmFnZXI+e1xyXG5cclxuICAgIHByaXZhdGUgc2Vzc2lvblJlYW06R2FtZVNlc3Npb247XHJcbiAgICBwcml2YXRlIHNlc3Npb25HYXRlOkdhbWVTZXNzaW9uO1xyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHJlYWxtUnBjSUQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZXNzaW9uUmVhbS5ycGNJZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGdhdGVScGNJRCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlc3Npb25HYXRlLnJwY0lkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBjb25uZWN0UmVhbG1TZXJ2ZXIoKTpQcm9taXNlPGJvb2xlYW4+IHtcclxuXHJcbiAgICAgICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZTxib29sZWFuPihyZXNvdmUgPT57XHJcbiAgICAgICAgICAgIHRoaXMuc2Vzc2lvblJlYW0gPSBHYW1lU2Vzc2lvbi5JbnN0YW5jZShHYW1lU2Vzc2lvbikuY29ubmVjdENoYW5uZWwoXHJcbiAgICAgICAgICAgICAgICBHYW1lQ29uZmlnLnJlYWxtU2VydmVySVArXCI6XCIrR2FtZUNvbmZpZy5yZWFsbVNlcnZlclBvcnQsXHJcbiAgICAgICAgICAgICAgICAoY2hhbm5lbDphbnksY29kZTpudW1iZXIpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY29kZSA9PSBOZXRFcnJvckNvZGUuRVJSX1NvY2tldENvbm5TdWNjKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXNzaW9uUmVhbS5pZCA9IGNoYW5uZWwuSWQ7XHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwibG9naW4gcmVhbXNlcnZlciBlcnIsIGNvZGU6IFwiK2NvZGUgKyBcIixpZDpcIitjaGFubmVsLklkKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcHJvbWlzZVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgcHVibGljIGRpc2Nvbm5lY3RSZWFsbVNlcnZlcigpe1xyXG4gICAgICAgIHRoaXMuc2Vzc2lvblJlYW0uZGlzY29ubmVjdCgpO1xyXG4gICAgICAgIHRoaXMuc2Vzc2lvblJlYW0gPSBudWxsO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgc2VuZFJlYWxtTXNnKG9wY29kZTpudW1iZXIsbXNnOmFueSk6UHJvbWlzZTxhbnk+e1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBycGNJRCA9IHRoaXMuc2Vzc2lvblJlYW0ucnBjSWRcclxuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlPGFueT4oKHJlc292ZSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IGJ1ZiA9IE9wY29kZS5lbmNvZGUob3Bjb2RlLCBtc2cpXHJcblxyXG4gICAgICAgICAgICB0aGlzLnNlc3Npb25SZWFtLnNlbmQob3Bjb2RlLCBycGNJRCwgYnVmLCAocmVzcG9uc2U6YW55KT0+e1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJlc292ZShyZXNwb25zZSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gcHJvbWlzZVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgY29ubmVjdEdhdGVTZXJ2ZXIoYWRkcmVzczpzdHJpbmcpOlByb21pc2U8Ym9vbGVhbj57XHJcblxyXG4gICAgICAgIGxldCBwcm9taXNlID0gbmV3IFByb21pc2U8Ym9vbGVhbj4ocmVzb3ZlID0+e1xyXG4gICAgICAgICAgICB0aGlzLnNlc3Npb25HYXRlID0gR2FtZVNlc3Npb24uSW5zdGFuY2UoR2FtZVNlc3Npb24pLmNvbm5lY3RDaGFubmVsKFxyXG4gICAgICAgICAgICAgICAgYWRkcmVzcyxcclxuICAgICAgICAgICAgICAgIChjaGFubmVsOmFueSxjb2RlOm51bWJlcik9PntcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwibG9naW4gR2F0ZSBTZXJ2ZXI6IFwiK2NvZGUpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY29kZSA9PSBOZXRFcnJvckNvZGUuRVJSX1NvY2tldENvbm5TdWNjKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXNzaW9uR2F0ZS5pZCA9IGNoYW5uZWwuSWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc292ZSh0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdmUoZmFsc2UpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJnYXRlIHNlcnZlciBlcnIsIGNvZGU6IFwiK2NvZGUgKyBcIixpZDpcIitjaGFubmVsLklkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBwcm9taXNlXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBkaXNjb25uZWN0R2F0ZVNlcnZlcigpe1xyXG4gICAgICAgIHRoaXMuc2Vzc2lvbkdhdGUuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgIHRoaXMuc2Vzc2lvbkdhdGUgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBzZW5kR2F0ZU1zZyhvcGNvZGU6bnVtYmVyLCBtc2c6YW55KTpQcm9taXNlPGFueT57XHJcblxyXG4gICAgICAgIGxldCBycGNJRCA9IHRoaXMuc2Vzc2lvbkdhdGUucnBjSWRcclxuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlPGFueT4oKHJlc292ZSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IGJ1ZiA9IE9wY29kZS5lbmNvZGUob3Bjb2RlLCBtc2cpXHJcblxyXG4gICAgICAgICAgICB0aGlzLnNlc3Npb25HYXRlLnNlbmQob3Bjb2RlLCBycGNJRCwgYnVmLCAocmVzcG9uc2U6YW55KT0+e1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJlc292ZShyZXNwb25zZSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gcHJvbWlzZVxyXG5cclxuICAgIH1cclxufSAgIFxyXG4iLCJpbXBvcnQgeyBVbml0eUVuZ2luZSB9IGZyb20gXCJjc2hhcnBcIjtcclxuaW1wb3J0IHsgUyB9IGZyb20gXCIuLi8uLi9nbG9iYWwvR2FtZUNvbmZpZ1wiO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VTY2VuZXtcclxuXHJcbiAgICBwcml2YXRlIHByZWxvYWRQcmVmYWI6TWFwPHN0cmluZyxudW1iZXI+O1xyXG4gICAgcHJpdmF0ZSBzY2VuZUluc3RhbmNlOlVuaXR5RW5naW5lLlJlc291cmNlTWFuYWdlbWVudC5SZXNvdXJjZVByb3ZpZGVycy5TY2VuZUluc3RhbmNlXHJcblxyXG4gICAgcHVibGljIGZpbmlzaENvdW50ID0gMDtcclxuICAgIHB1YmxpYyB0b3RhbENvdW50ID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMucHJlbG9hZFByZWZhYiA9IG5ldyBNYXA8c3RyaW5nLG51bWJlcj4oKTtcclxuICAgICAgICB0aGlzLmZpbmlzaENvdW50ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkUHJlbG9hZFByZWZhYihhZGRyZXNzOnN0cmluZywgaW5zdENvdW50KXtcclxuICAgICAgICBpZighdGhpcy5wcmVsb2FkUHJlZmFiLmhhcyhhZGRyZXNzKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucHJlbG9hZFByZWZhYi5zZXQoYWRkcmVzcywgaW5zdENvdW50KTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucHJlbG9hZFByZWZhYi5zZXQoYWRkcmVzcywgdGhpcy5wcmVsb2FkUHJlZmFiLmdldChhZGRyZXNzKSArIGluc3RDb3VudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFNjZW5lSW5zdGFuY2Uoc2NlbmVJbnN0YW5jZTpVbml0eUVuZ2luZS5SZXNvdXJjZU1hbmFnZW1lbnQuUmVzb3VyY2VQcm92aWRlcnMuU2NlbmVJbnN0YW5jZSl7XHJcbiAgICAgICAgdGhpcy5zY2VuZUluc3RhbmNlID0gc2NlbmVJbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3Qgb25FbnRlcigpO1xyXG4gICAgcHVibGljIGFic3RyYWN0IG9uQ29tcGxldGUoKTtcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBvbkxlYXZlKCk7XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGxvYWRBc3NldHNBc3luYygpe1xyXG5cclxuICAgICAgICB0aGlzLnRvdGFsQ291bnQgPSB0aGlzLnByZWxvYWRQcmVmYWIuc2l6ZTtcclxuXHJcbiAgICAgICAgbGV0IHByZW1pc2VzID0gW107XHJcblxyXG4gICAgICAgIHRoaXMucHJlbG9hZFByZWZhYi5mb3JFYWNoKCh2YWx1ZSwga2V5KT0+e1xyXG4gICAgICAgICAgICBsZXQgcHJlbWlzZSA9IFMuR2FtZU9iamVjdFBvb2wucHJlTG9hZEdhbWVPYmplY3RBc3luYyhrZXksIHZhbHVlLCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmlzaENvdW50Kys7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHByZW1pc2VzLnB1c2gocHJlbWlzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKHByZW1pc2VzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25EZXN0cm95KCl7XHJcbiBcclxuICAgICAgICAvL+a4heeQhui1hOa6kOe8k+WtmFxyXG4gICAgICAgIFMuR2FtZU9iamVjdFBvb2wuY2xlYW51cCh0cnVlKTtcclxuXHJcbiAgICAgICAgLy/ljbjovb3lnLrmma9cclxuICAgICAgICBTLlJlc01hbmFnZXIudW5sb2FkU2NlbmUodGhpcy5zY2VuZUluc3RhbmNlKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnByZWxvYWRQcmVmYWIuY2xlYXIoKTtcclxuICAgIH1cclxufSIsImV4cG9ydCAgY2xhc3MgU2NlbmVEZWZ7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBMb2FkaW5nU2NlbmU6c3RyaW5nID0gXCJMb2FkaW5nU2NlbmVcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgR2FtZVN0YXJ0OnN0cmluZyA9IFwiR2FtZVN0YXJ0U2NlbmVcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgRmx5QmlyZDpzdHJpbmcgPSBcIkZseUJpcmRTY2VuZVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBMYXVuY2hTY2VuZTpzdHJpbmcgPSBcIkxhdW5jaFNjZW5lXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIEhvbWVTY2VuZTpzdHJpbmcgPSBcIkhvbWVTY2VuZVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBMb2dpblNjZW5lOnN0cmluZyA9IFwiTG9naW5TY2VuZVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBQdmVTY2VuZTpzdHJpbmcgPSBcIlB2ZVNjZW5lXCI7XHJcbn1cclxuIiwiaW1wb3J0IHsgQmFzZVNjZW5lIH0gZnJvbSBcIi4vQmFzZVNjZW5lXCI7XHJcbmltcG9ydCB7IFB2ZVNjZW5lIH0gZnJvbSBcIi4uLy4uL2dhbWUvbW9kdWxlL3B2ZS9zY2VuZS9QdmVTY2VuZVwiO1xyXG5pbXBvcnQgeyBIb21lU2NlbmUgfSBmcm9tIFwiLi4vLi4vZ2FtZS9tb2R1bGUvaG9tZS9zY2VuZS9Ib21lU2NlbmVcIjtcclxuLy8gaW1wb3J0IHsgTG9naW5TY2VuZSB9IGZyb20gXCIuLi8uLi9nYW1lL21vZHVsZS9sb2dpbi9zY2VuZS9Mb2dpblNjZW5lXCI7XHJcbmltcG9ydCB7IFNjZW5lRGVmIH0gZnJvbSBcIi4vU2NlbmVEZWZcIjtcclxuaW1wb3J0IHsgR2FtZVN0YXJ0U2NlbmUgfSBmcm9tIFwiLi4vLi4vZ2FtZS9tb2R1bGUvZ2FtZXN0YXJ0L3NjZW5lL0dhbWVTdGFydFNjZW5lXCI7XHJcbmltcG9ydCB7IEZseUJpcmRTY2VuZSB9IGZyb20gXCIuLi8uLi9nYW1lL21vZHVsZS9mbHliaXJkL3NjZW5lL0ZseUJpcmRTY2VuZVwiO1xyXG5cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgU2NlbmVGYWN0b3J5e1xyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZVNjZW5lKHNjZW5lTmFtZTpzdHJpbmcpOkJhc2VTY2VuZXtcclxuXHJcbiAgICAgICAgbGV0IHNjZW5lOkJhc2VTY2VuZSA9IG51bGw7XHJcblxyXG4gICAgICAgIHN3aXRjaCAoc2NlbmVOYW1lKXtcclxuICAgICAgICAgICAgY2FzZSBTY2VuZURlZi5HYW1lU3RhcnQ6XHJcbiAgICAgICAgICAgICAgICBzY2VuZSA9IG5ldyBHYW1lU3RhcnRTY2VuZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2NlbmVEZWYuRmx5QmlyZDpcclxuICAgICAgICAgICAgICAgIHNjZW5lID0gbmV3IEZseUJpcmRTY2VuZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2NlbmVEZWYuSG9tZVNjZW5lOlxyXG4gICAgICAgICAgICAgICAgc2NlbmUgPSBuZXcgSG9tZVNjZW5lKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTY2VuZURlZi5QdmVTY2VuZTpcclxuICAgICAgICAgICAgICAgIHNjZW5lID0gbmV3IFB2ZVNjZW5lKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzY2VuZTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IENvbW1vblVJIH0gZnJvbSBcIi4uLy4uL2RhdGEvdWkvY29tbW9uXCI7XHJcbmltcG9ydCB7IFVJTWVzc2FnZSB9IGZyb20gXCIuLi8uLi9nYW1lL2V2ZW50L1VJTWVzc2FnZVwiO1xyXG5pbXBvcnQgeyBTIH0gZnJvbSBcIi4uLy4uL2dsb2JhbC9HYW1lQ29uZmlnXCI7XHJcbmltcG9ydCB7IFNpbmdsZXRvbiB9IGZyb20gXCIuLi9jb21tb24vU2luZ2xldG9uXCI7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuLi9sb2dnZXIvTG9nZ2VyXCI7XHJcbmltcG9ydCB7IEJhc2VTY2VuZSB9IGZyb20gXCIuL0Jhc2VTY2VuZVwiO1xyXG5pbXBvcnQgeyBTY2VuZUZhY3RvcnkgfSBmcm9tIFwiLi9TY2VuZUZhY3RvcnlcIjtcclxuXHJcblxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBTY2VuZU1hbmFnZXIgZXh0ZW5kcyBTaW5nbGV0b248U2NlbmVNYW5hZ2VyPntcclxuXHJcbiAgICBwcml2YXRlIGN1cnJlbnRTY2VuZTpCYXNlU2NlbmUgPSBudWxsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgbG9hZFNjZW5lKHNjZW5lOnN0cmluZyl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdHJ5e1xyXG5cclxuICAgICAgICAgICAgLy/miZPlvIBMb2FkaW5n55WM6Z2iXHJcbiAgICAgICAgICAgIFMuVUlNYW5hZ2VyLm9wZW5Mb2FkaW5nKENvbW1vblVJLlBhY2thZ2VOYW1lLCBDb21tb25VSS5VSUxvYWRpbmdWaWV3KTtcclxuXHJcbiAgICAgICAgICAgIC8v5riF55CG5pen5Zy65pmvXHJcbiAgICAgICAgICAgIGlmKHRoaXMuY3VycmVudFNjZW5lKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFNjZW5lLm9uTGVhdmUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFNjZW5lLm9uRGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL+W8gOWni+WKoOi9veWcuuaZr1xyXG4gICAgICAgICAgICBsZXQgc2NlbmVJbnN0YW5jZSA9IGF3YWl0IFMuUmVzTWFuYWdlci5sb2FkU2NlbmUoc2NlbmUpO1xyXG5cclxuICAgICAgICAgICAgLy/lvIDlp4vliqDovb3ov5vlhaXlnLrmma/nmoTotYTmupBcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2NlbmUgPSAgU2NlbmVGYWN0b3J5LmNyZWF0ZVNjZW5lKHNjZW5lKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2NlbmUuc2V0U2NlbmVJbnN0YW5jZShzY2VuZUluc3RhbmNlKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2NlbmUub25FbnRlcigpO1xyXG5cclxuICAgICAgICAgICAgLy/orr7nva7lvZPliY3lnLrmma/liqDovb3ov5vluqZUaW1lclxyXG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3NJbnRlcnZhbCA9IHNldEludGVydmFsKCgpPT57XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHByb2dyZXNzID0gdGhpcy5jdXJyZW50U2NlbmUuZmluaXNoQ291bnQvdGhpcy5jdXJyZW50U2NlbmUudG90YWxDb3VudDtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCJwcm9ncmVzczpcIitwcm9ncmVzcyArIFwiID0gXCIrdGhpcy5jdXJyZW50U2NlbmUuZmluaXNoQ291bnQgKyBcIiA9IFwiK3RoaXMuY3VycmVudFNjZW5lLnRvdGFsQ291bnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIFMuVUlNZXNzYWdlTWFuZ2VyLmJyb2FkY2FzdChcclxuICAgICAgICAgICAgICAgICAgICBVSU1lc3NhZ2UuTVNHX1NDRU5FX1BST0dSRVNTLFxyXG4gICAgICAgICAgICAgICAgICAgIHByb2dyZXNzKjEwMCk7XHJcblxyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG5cclxuICAgICAgICAgICAgLy/liqDovb3otYTmupBcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5jdXJyZW50U2NlbmUubG9hZEFzc2V0c0FzeW5jKCk7XHJcblxyXG4gICAgICAgICAgICAvL+WKoOi9veWujOaIkFxyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHByb2dyZXNzSW50ZXJ2YWwpXHJcblxyXG4gICAgICAgICAgICAvL+WFs+mXreaJgOaciVBhZ2VcclxuICAgICAgICAgICAgUy5VSU1hbmFnZXIuY2xvc2VBbGxQYW5lbHMoKTtcclxuXHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY3VycmVudFNjZW5lLm9uQ29tcGxldGUoKVxyXG4gICAgICAgICAgICBTLlVJTWFuYWdlci5jbG9zZUxvYWRpbmcoKTtcclxuXHJcbiAgICAgICAgfWNhdGNoKGV4KXtcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhcImxvYWQgc2NlbmUgZXhjZXA6XCIrZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIFxyXG59IiwiXHJcbmV4cG9ydCBjbGFzcyBVSUJhc2Uge1xyXG5cclxuICAgIHB1YmxpYyBmdWk6YW55OyAgLy9GYWlyeUdVSSDlr7nosaFcclxuXHJcblxyXG4gICAgLy/nu5HlrppGYWlyeUdVSeWFg+S7tlxyXG4gICAgcHVibGljIGJpbmRBbGwodGFyZ2V0OmFueSk6dm9pZHtcclxuICAgICAgICBmb3IobGV0IGsgaW4gdGFyZ2V0W1wiYmluZGVyc1wiXSl7XHJcbiAgICAgICAgICAgIGxldCBmZ3VpTmFtZSA9IHRoaXNbXCJiaW5kZXJzXCJdW2tdO1xyXG4gICAgICAgICAgICB0aGlzW2tdID0gdGhpcy5mdWkuR2V0Q2hpbGQoZmd1aU5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAgICAgXHJcblxyXG59IiwiXHJcblxyXG5cclxuZXhwb3J0IGVudW0gVUlUeXBlRGVme1xyXG4gICAgVW5rb3duID0gMCxcclxuICAgIFBhZ2UgPSAxLFxyXG4gICAgV2luZG93PTIsXHJcbiAgICBXaWRnZXQgPSAzLFxyXG4gICAgTG9hZGluZyA9NFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVUlMYXllckRlZntcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEJhY2tncm91bmQ6bnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBzdGF0aWMgUGFnZTpudW1iZXIgPSAxMDAwO1xyXG4gICAgcHVibGljIHN0YXRpYyBOb3JtYWxXaW5kb3c6bnVtYmVyID0gMjAwMDtcclxuICAgIHB1YmxpYyBzdGF0aWMgVG9wV2luZG93Om51bWJlciA9IDMwMDA7XHJcbiAgICBwdWJsaWMgc3RhdGljIFdpZGdldDpudW1iZXIgPSA0MDAwO1xyXG4gICAgcHVibGljIHN0YXRpYyBMb2FkaW5nOm51bWJlciA9IDUwMDA7XHJcbiAgICBwdWJsaWMgc3RhdGljIFVua293bjpudW1iZXIgPSA5OTk5O1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgIGdldERlZmF1bHRMYXllcih0eXBlOlVJVHlwZURlZik6bnVtYmVye1xyXG5cclxuICAgICAgICBzd2l0Y2godHlwZSl7XHJcbiAgICAgICAgICAgIGNhc2UgVUlUeXBlRGVmLkxvYWRpbmc6IHJldHVybiB0aGlzLkxvYWRpbmc7XHJcbiAgICAgICAgICAgIGNhc2UgVUlUeXBlRGVmLldpZGdldDogcmV0dXJuIHRoaXMuV2lkZ2V0O1xyXG4gICAgICAgICAgICBjYXNlIFVJVHlwZURlZi5XaW5kb3c6IHJldHVybiB0aGlzLk5vcm1hbFdpbmRvdztcclxuICAgICAgICAgICAgY2FzZSBVSVR5cGVEZWYuUGFnZTogcmV0dXJuIHRoaXMuUGFnZTtcclxuICAgICAgICAgICAgY2FzZSBVSVR5cGVEZWYuVW5rb3duOiByZXR1cm4gdGhpcy5Vbmtvd247XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiB0aGlzLlVua293bjsgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFVJQ29tRGVmc3tcclxuICAgIHB1YmxpYyBzdGF0aWMgQmFja0J0biA9IFwiYmFja19idG5cIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgV2luZG93Q2xvc2VCdG4gPSBcIndpbl9jbG9zZV9idG5cIjtcclxufVxyXG5cclxuXHJcblxyXG4iLCJcclxuaW1wb3J0IHsgVUlQYW5lbCB9IGZyb20gXCIuL1VJUGFuZWxcIjtcclxuaW1wb3J0IHsgVUlMb2FkaW5nIH0gZnJvbSBcIi4vVUlMaWIvVUlMb2FkaW5nXCI7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuLi9sb2dnZXIvTG9nZ2VyXCI7XHJcbmltcG9ydCB7IENvbW1vblVJIH0gZnJvbSBcIi4uLy4uL2RhdGEvdWkvY29tbW9uXCI7XHJcbmltcG9ydCB7IEZseUJpcmRVSSB9IGZyb20gXCIuLi8uLi9kYXRhL3VpL0ZseUJpcmRcIjtcclxuaW1wb3J0IHsgR2FtZVN0YXJ0VUkgfSBmcm9tIFwiLi4vLi4vZGF0YS91aS9HYW1lU3RhcnRcIjtcclxuaW1wb3J0IHsgVUlTdGFydFZpZXcgfSBmcm9tIFwiLi4vLi4vZ2FtZS9tb2R1bGUvZ2FtZXN0YXJ0L3VpL1VJU3RhcnRWaWV3XCI7XHJcbmltcG9ydCB7IFVJRmx5QmlyZE1haW5WaWV3IH0gZnJvbSBcIi4uLy4uL2dhbWUvbW9kdWxlL2ZseWJpcmQvdWkvVUlGbHlCaXJkTWFpblZpZXdcIjtcclxuXHJcblxyXG5cclxuY29uc3QgQ1MgPSByZXF1aXJlKCdjc2hhcnAnKTtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgVUlGYWN0b3J5e1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgdWlDYWNoZTpNYXA8c3RyaW5nLFVJUGFuZWw+ID0gbmV3IE1hcDxzdHJpbmcsVUlQYW5lbD4oKTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZVVJKHBrZzpzdHJpbmcsIG5hbWU6c3RyaW5nKXtcclxuICAgICAgICBMb2dnZXIubG9nKGBjcmVhdGUgVUk6ICR7cGtnfToke25hbWV9YClcclxuICAgICAgICBsZXQgY29tcCA9IENTLkZhaXJ5R1VJLlVJUGFja2FnZS5DcmVhdGVPYmplY3QocGtnLCBuYW1lKS5hc0NvbVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB1aTpVSVBhbmVsID0gdGhpcy51aUNhY2hlLmdldChuYW1lKTtcclxuXHJcbiAgICAgICAgaWYoIXVpKXtcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaChwa2cpe1xyXG4gICAgICAgICAgICAgICAgY2FzZSBDb21tb25VSS5QYWNrYWdlTmFtZTpcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG5hbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIENvbW1vblVJLlVJTG9hZGluZ1ZpZXc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aSA9IG5ldyBVSUxvYWRpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgY2FzZSBGbHlCaXJkVUkuUGFja2FnZU5hbWU6XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChuYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBGbHlCaXJkVUkuVUlNYWluVklldzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpID0gbmV3IFVJRmx5QmlyZE1haW5WaWV3KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGNhc2UgR2FtZVN0YXJ0VUkuUGFja2FnZU5hbWU6XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChuYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBHYW1lU3RhcnRVSS5VSVN0YXJ0VmlldzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpID0gbmV3IFVJU3RhcnRWaWV3KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy51aUNhY2hlLnNldChuYW1lLCB1aSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHVpIT1udWxsKXtcclxuICAgICAgICAgICAgdWkuZnVpID0gY29tcDtcclxuICAgICAgICAgICAgdWkubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgICAgIHVpLnBrZ05hbWUgPSBwa2c7XHJcblxyXG4gICAgICAgICAgICAvL+e7keWumkZhaXJ5R1VJ5o6n5Lu2XHJcbiAgICAgICAgICAgIHVpLmJpbmRBbGwodWkpO1xyXG4gICAgICAgICAgICB1aS5hd2FrZSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoYG5vdCBjcmVhdGUgdWk6ICR7cGtnfS0ke25hbWV9YCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdWk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn0iLCJpbXBvcnQgeyBVSVBhbmVsIH0gZnJvbSBcIi4uL1VJUGFuZWxcIjtcclxuaW1wb3J0IHsgVUlUeXBlRGVmIH0gZnJvbSBcIi4uL1VJRGVmaW5lXCI7XHJcbmltcG9ydCB7IEZhaXJ5R1VJIH0gZnJvbSBcImNzaGFycFwiO1xyXG5pbXBvcnQgeyBiaW5kZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL05pY2VEZWNvcmF0b3JcIjtcclxuaW1wb3J0IHsgVUlNZXNzYWdlIH0gZnJvbSBcIi4uLy4uLy4uL2dhbWUvZXZlbnQvVUlNZXNzYWdlXCI7XHJcbmltcG9ydCB7IFMgfSBmcm9tIFwiLi4vLi4vLi4vZ2xvYmFsL0dhbWVDb25maWdcIjtcclxuXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzICBVSUxvYWRpbmcgZXh0ZW5kcyBVSVBhbmVse1xyXG5cclxuXHJcbiAgICBAYmluZGVyKFwibG9hZGluZ19wcmVncmVzc1wiKVxyXG4gICAgcHVibGljIHByb2dyZXNzTG9hZGluZzogRmFpcnlHVUkuR1Byb2dyZXNzQmFyO1xyXG5cclxuXHJcblxyXG4gICAgcHVibGljIG9uQXdha2UoKTogdm9pZCB7XHJcbiAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGdldCB1aVR5cGUoKTogVUlUeXBlRGVmIHsgICAgXHJcbiAgICAgICAgcmV0dXJuIFVJVHlwZURlZi5Mb2FkaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvblNob3coYXJnOmFueSk6dm9pZHtcclxuICAgICAgICB0aGlzLnByb2dyZXNzTG9hZGluZy52YWx1ZSA9IDA7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzc0xvYWRpbmcudmlzaWJsZSA9IHRydWU7XHJcblxyXG4gICAgICAgIFMuVUlNZXNzYWdlTWFuZ2VyLmFkZExpc3RlbmVyKFxyXG4gICAgICAgICAgICBVSU1lc3NhZ2UuTVNHX1NDRU5FX1BST0dSRVNTLFxyXG4gICAgICAgICAgICB0aGlzLFxyXG4gICAgICAgICAgICAocHJvZ3Jlc3M6bnVtYmVyKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc0xvYWRpbmcuVHdlZW5WYWx1ZShwcm9ncmVzcywgMC4xKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ2xvc2UoYXJnOmFueSk6dm9pZHtcclxuICAgICAgICB0aGlzLnByb2dyZXNzTG9hZGluZy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgUy5VSU1lc3NhZ2VNYW5nZXIucmVtb3ZlTGlzdGVuZXJCeUNvZGUoXHJcbiAgICAgICAgICAgIFVJTWVzc2FnZS5NU0dfU0NFTkVfUFJPR1JFU1NcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJcclxuaW1wb3J0IHsgU2luZ2xldG9uIH0gZnJvbSAnLi4vY29tbW9uL1NpbmdsZXRvbic7XHJcbmltcG9ydCB7IFVJTG9hZGluZyB9IGZyb20gJy4vVUlMaWIvVUlMb2FkaW5nJztcclxuaW1wb3J0IHsgVUlXaW5kb3cgfSBmcm9tICcuL1VJV2luZG93JztcclxuaW1wb3J0IHsgVUlXaWRnZSB9IGZyb20gJy4vVUlXaWRnZSc7XHJcbmltcG9ydCB7IFVJUGFuZWwgfSBmcm9tICcuL1VJUGFuZWwnO1xyXG5pbXBvcnQgeyBVSUZhY3RvcnkgfSBmcm9tICcuL1VJRmFjdG9yeSc7XHJcbmltcG9ydCB7IFMgfSBmcm9tICcuLi8uLi9nbG9iYWwvR2FtZUNvbmZpZyc7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJy4uL2xvZ2dlci9Mb2dnZXInO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBVSVBhZ2VUcmFja3tcclxuICAgIHB1YmxpYyBwa2c6c3RyaW5nO1xyXG4gICAgcHVibGljIG5hbWU6c3RyaW5nO1xyXG4gICAgcHVibGljIGFyZzphbnk7XHJcbiAgICBwdWJsaWMgdWk6VUlQYW5lbDtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBVSU1hbmFnZXIgZXh0ZW5kcyBTaW5nbGV0b248VUlNYW5hZ2VyPntcclxuXHJcbiAgICBwcml2YXRlICBtX3BhZ2VUcmFja1N0YWNrOkFycmF5PFVJUGFnZVRyYWNrPjtcclxuICAgIHByaXZhdGUgbV9jdXJyZW50UGFnZTpVSVBhZ2VUcmFjaztcclxuICAgIHByaXZhdGUgbV9sYXN0U2NlbnNlUGFnZTpVSVBhZ2VUcmFjaztcclxuXHJcbiAgICBwcml2YXRlIG1fbGlzdExvYWRlZFBhbmVsOkFycmF5PFVJUGFuZWw+O1xyXG5cclxuICAgIHByaXZhdGUgbV9sb2FkaW5nUGFnZTpVSVBhbmVsO1xyXG4gICAgcHJpdmF0ZSBtX2dtUGFnZTpVSVBhbmVsO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMubV9wYWdlVHJhY2tTdGFjayA9IG5ldyBBcnJheTxVSVBhZ2VUcmFjaz4oKTtcclxuICAgICAgICB0aGlzLm1fbGlzdExvYWRlZFBhbmVsID0gbmV3IEFycmF5PFVJUGFuZWw+KCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoZGVsdGE6bnVtYmVyKXtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubV9saXN0TG9hZGVkUGFuZWwubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgdGhpcy5tX2xpc3RMb2FkZWRQYW5lbFtpXS51cGRhdGUoZGVsdGEpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1fY3VycmVudFBhZ2U/LnVpPy51cGRhdGUoZGVsdGEpXHJcbiAgICAgICAgdGhpcy5tX2xhc3RTY2Vuc2VQYWdlPy51aT8udXBkYXRlKGRlbHRhKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZGlzdHJveVBhbmVsKHBhbmVsOlVJUGFuZWwpe1xyXG4gICAgICAgIGlmKHBhbmVsLmlzT3Blbil7XHJcbiAgICAgICAgICAgIHBhbmVsLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5Y246L296LWE5rqQXHJcbiAgICAgICAgUy5SZXNNYW5hZ2VyLnJlbGVhc2VGYWlyeUdVSVBhY2thZ2UocGFuZWwucGtnTmFtZSk7XHJcbiAgICAgICAgcGFuZWwuZGlzcG9zZSgpOyAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkaXN0cm95QWxsTG9hZGVkUGFuZWwoKTp2b2lke1xyXG4gICAgICAgIGZvcihsZXQgaT0gdGhpcy5tX2xpc3RMb2FkZWRQYW5lbC5sZW5ndGgtMTsgaT49MDsgaS0tKXtcclxuICAgICAgICAgICAgbGV0IHBhbmVsID0gdGhpcy5tX2xpc3RMb2FkZWRQYW5lbFtpXTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGlzdHJveVBhbmVsKHBhbmVsKTtcclxuICAgICAgICAgICAgdGhpcy5tX2xpc3RMb2FkZWRQYW5lbC5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhbigpOnZvaWR7XHJcblxyXG4gICAgICAgIHRoaXMuZGlzdHJveUFsbExvYWRlZFBhbmVsKCk7XHJcblxyXG4gICAgICAgIHRoaXMubV9wYWdlVHJhY2tTdGFjay5sZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMubV9saXN0TG9hZGVkUGFuZWwubGVuZ3RoID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UGFuZWxVSShuYW1lOnN0cmluZyk6VUlQYW5lbHtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBwYW5lbCBvZiB0aGlzLm1fbGlzdExvYWRlZFBhbmVsKSB7XHJcbiAgICAgICAgICAgIGlmKHBhbmVsLm5hbWUgPT0gbmFtZSl7XHJcblxyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhcImZpbmQgcGFuZWwgaW4gY2FjaGU6IFwiK25hbWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBwYW5lbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgb3Blbihwa2c6c3RyaW5nLCBuYW1lOnN0cmluZywgYXJnPzphbnkpe1xyXG4gICBcclxuICAgICAgICBsZXQgdWk6YW55ID0gdGhpcy5nZXRQYW5lbFVJKG5hbWUpO1xyXG5cclxuICAgICAgICBpZih1aSA9PSBudWxsKXtcclxuICAgICAgICAgICAgLy/liqDovb0gcGFja2FnZVxyXG4gICAgICAgICAgICBhd2FpdCBTLlJlc01hbmFnZXIubG9hZEZhaXJ5R1VJUGFja2FnZShwa2cpO1xyXG4gICAgICAgICAgICB1aSA9IFVJRmFjdG9yeS5jcmVhdGVVSShwa2csIG5hbWUpO1xyXG4gICAgICAgICAgICB0aGlzLm1fbGlzdExvYWRlZFBhbmVsLnB1c2godWkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodWkgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIC8vICMjIyAgdWkgYXMgYW55IOiwg+eUqOengeacieaWueazlVxyXG4gICAgICAgICAgICAodWkgYXMgYW55KS5faW50ZXJuYWxPcGVuKGFyZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdWk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgb3BlblBhZ2VXb3JrZXIocGtnOnN0cmluZywgcGFnZTpzdHJpbmcsIGFyZzphbnkpe1xyXG5cclxuICAgICAgICAvL+iuvue9riBtX2N1cnJlbnRQYWdlXHJcbiAgICAgICAgdGhpcy5tX2N1cnJlbnRQYWdlID0gbmV3IFVJUGFnZVRyYWNrKCk7XHJcbiAgICAgICBcclxuICAgICAgICB0aGlzLm1fY3VycmVudFBhZ2UucGtnID0gcGtnO1xyXG4gICAgICAgIHRoaXMubV9jdXJyZW50UGFnZS5uYW1lID0gcGFnZTtcclxuICAgICAgICB0aGlzLm1fY3VycmVudFBhZ2UuYXJnID0gYXJnO1xyXG5cclxuICAgICAgICAvL+aJk+W8gOaWsFBhZ2VcclxuICAgICAgICBhd2FpdCBTLlJlc01hbmFnZXIubG9hZEZhaXJ5R1VJUGFja2FnZShwa2cpO1xyXG4gICAgICAgIGxldCB1aSA9IFVJRmFjdG9yeS5jcmVhdGVVSShwa2csIHBhZ2UpO1xyXG4gICAgICAgICh1aSBhcyBhbnkpLl9pbnRlcm5hbE9wZW4oYXJnKTtcclxuXHJcbiAgICAgICAgLy/kv53lrZjliLAgbV9jdXJyZW50UGFnZVxyXG4gICAgICAgIHRoaXMubV9jdXJyZW50UGFnZS51aSA9IHVpO1xyXG5cclxuICAgICAgICAvL+mUgOavgeW9k+WJjXBhZ2Ug5Lit5omT5byA55qE5ZCE6IeqUGFuZWxzXHJcbiAgICAgICAgdGhpcy5kaXN0cm95QWxsTG9hZGVkUGFuZWwoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9jdXJyZW50UGFnZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVVJUGFnZVxyXG4gICAgLy/miZPlvIDlnLrmma/pobXpnaIs5q2k6aG16Z2i5LiN6K6h5YWl6aG16Z2i5qCILOaXoOi/lOWbnuS4iuS4gOmdouaMiemSrlxyXG4gICAgcHVibGljIGFzeW5jIG9wZW5QYWdlSW5TY2VuZShwa2c6c3RyaW5nLCBwYWdlOnN0cmluZywgYXJnOmFueSl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IF9vcGVuUGFnZSA9IGF3YWl0IHRoaXMub3BlblBhZ2VXb3JrZXIocGtnLCBwYWdlLCBhcmcpO1xyXG5cclxuICAgICAgICBpZih0aGlzLm1fbGFzdFNjZW5zZVBhZ2Upe1xyXG4gICAgICAgICAgICB0aGlzLmRpc3Ryb3lQYW5lbCh0aGlzLm1fbGFzdFNjZW5zZVBhZ2UudWkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1fbGFzdFNjZW5zZVBhZ2UgPSBfb3BlblBhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy/miZPlvIDpobXpnaIsIOS8muWFs+mXreS4iuS4gOS4qumhtemdouS4iueahOaJgOacieeql+WPoyxXaWRpZ2V0562JXHJcbiAgICBwdWJsaWMgYXN5bmMgb3BlblBhZ2UocGtnOnN0cmluZywgbmFtZTpzdHJpbmcsIGFyZz86YW55KXtcclxuXHJcbiAgICAgICAgLy8xLCDmo4Dmn6XmoIjkuK3mmK/lkKblrZjlnKjmraTpobXpnaJcclxuICAgICAgICBsZXQgbGVuID0gdGhpcy5tX3BhZ2VUcmFja1N0YWNrLmxlbmd0aDtcclxuICAgICAgICBmb3IobGV0IGkgPSBsZW4tMTsgaSA+PSAwIDtpLS0pe1xyXG4gICAgICAgICAgICBsZXQgdHJhY2sgPSB0aGlzLm1fcGFnZVRyYWNrU3RhY2tbaV07XHJcbiAgICAgICAgICAgIGlmKHRyYWNrLnBrZyA9PSBwa2cgJiYgdHJhY2submFtZSA9PSBuYW1lKXtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXN0cm95QWxsTG9hZGVkUGFuZWwoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzdHJveVBhbmVsKHRoaXMubV9jdXJyZW50UGFnZS51aSk7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdHJhY2sudWkudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0cmFjay51aS5vblNob3codHJhY2suYXJnKTtcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8v5Y246L295q2k6aG15qCI5LiK6Z2i55qE55WM6Z2iXHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGogPSBsZW4gLTE7IGogPiBpOyBqLS0pe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkZWxfdHJhY2sgPSB0aGlzLm1fcGFnZVRyYWNrU3RhY2tbal07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXN0cm95UGFuZWwoZGVsX3RyYWNrLnVpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1fcGFnZVRyYWNrU3RhY2suc2xpY2UoaiwxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fY3VycmVudFBhZ2UgPSB0aGlzLm1fcGFnZVRyYWNrU3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tX2N1cnJlbnRQYWdlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLzIg5YWI5oqK5b2T5YmNUGFnZeWFpeagiFxyXG4gICAgICAgIGlmKHRoaXMubV9jdXJyZW50UGFnZSAhPSB1bmRlZmluZWQgJiYgdGhpcy5tX2N1cnJlbnRQYWdlLm5hbWUhPW5hbWUpe1xyXG4gICAgICAgICAgICB0aGlzLm1fcGFnZVRyYWNrU3RhY2sucHVzaCh0aGlzLm1fY3VycmVudFBhZ2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/lsIbmoIjkuK3lhbblroNQYWdlIOiuvuS4uuS4jeWPr+ingVxyXG4gICAgICAgIGZvcihsZXQgdHJhY2sgb2YgdGhpcy5tX3BhZ2VUcmFja1N0YWNrKXtcclxuICAgICAgICAgICAgdHJhY2sudWkudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXdhaXQgdGhpcy5vcGVuUGFnZVdvcmtlcihwa2csIG5hbWUsIGFyZyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8v6L+U5Zue5LiK5LiA5Liq6aG16Z2iXHJcbiAgICBwdWJsaWMgYXN5bmMgZ29CYWNrUGFnZSgpe1xyXG5cclxuICAgICAgICBpZih0aGlzLm1fcGFnZVRyYWNrU3RhY2subGVuZ3RoID4gMCl7XHJcblxyXG4gICAgICAgICAgICAvL+WFs+mXreW9k+WJjemhtemdolxyXG4gICAgICAgICAgICB0aGlzLmRpc3Ryb3lBbGxMb2FkZWRQYW5lbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmRpc3Ryb3lQYW5lbCh0aGlzLm1fY3VycmVudFBhZ2UudWkpO1xyXG5cclxuICAgICAgICAgICAgLy/miZPlvIDloIbmoIjkuK3nmoTkuIrkuIDpobXpnaJcclxuICAgICAgICAgICAgbGV0IHRyYWNrID0gdGhpcy5tX3BhZ2VUcmFja1N0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICB0cmFjay51aS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5tX2N1cnJlbnRQYWdlID0gdHJhY2s7XHJcblxyXG4gICAgICAgICAgICB0cmFjay51aS5vblNob3codHJhY2suYXJnKTtcclxuICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5lbnRlck1haW5QYWdlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLy/lm57liLDkuLvln45cclxuICAgIHB1YmxpYyBlbnRlck1haW5QYWdlKCk6dm9pZHtcclxuXHJcbiAgICAgICAgIC8v5bCG5qCI5Lit5YW25a6DUGFnZSDorr7kuLrkuI3lj6/op4FcclxuICAgICAgICAgZm9yKGxldCB0cmFjayBvZiB0aGlzLm1fcGFnZVRyYWNrU3RhY2spe1xyXG4gICAgICAgICAgICB0aGlzLmRpc3Ryb3lQYW5lbCh0cmFjay51aSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubV9wYWdlVHJhY2tTdGFjay5sZW5ndGggPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVVJTG9hZGluZ1xyXG4gICAgLy/miZPlvIBMb2FkaW5n55WM6Z2iXHJcbiAgICBwdWJsaWMgYXN5bmMgb3BlbkxvYWRpbmcocGtnOnN0cmluZywgbmFtZTpzdHJpbmcsIGFyZz86YW55KXtcclxuICAgICAgICBpZighdGhpcy5tX2xvYWRpbmdQYWdlKXtcclxuICAgICAgICAgICAgdGhpcy5tX2xvYWRpbmdQYWdlID0gVUlGYWN0b3J5LmNyZWF0ZVVJKHBrZywgbmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICh0aGlzLm1fbG9hZGluZ1BhZ2UgYXMgYW55KS5faW50ZXJuYWxPcGVuKGFyZyk7XHJcbiAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvL+WFs+mXrUxvYWRpbmfnlYzpnaJcclxuICAgIHB1YmxpYyBjbG9zZUxvYWRpbmcoYXJnPzphbnkpOnZvaWR7XHJcbiAgICAgICAgaWYodGhpcy5tX2xvYWRpbmdQYWdlKXtcclxuICAgICAgICAgICAgdGhpcy5tX2xvYWRpbmdQYWdlLmNsb3NlKGFyZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVVJV2luZG93XHJcbiAgICAvL+aJk+W8gOeql+WPo1xyXG4gICAgcHVibGljIGFzeW5jIG9wZW5XaW5kb3cocGtnOnN0cmluZywgbmFtZTpzdHJpbmcsIGFyZzphbnkpe1xyXG5cclxuICAgICAgICBsZXQgdWk6VUlXaW5kb3cgPSBhd2FpdCB0aGlzLm9wZW4ocGtnLCBuYW1lLCBhcmcpO1xyXG5cclxuICAgICAgICByZXR1cm4gdWk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lhbPpl63nqpflj6NcclxuICAgIHB1YmxpYyBjbG9zZVdpbmRvdyhuYW1lOnN0cmluZywgYXJnOmFueSl7XHJcblxyXG4gICAgICAgIGxldCB1aTpVSVdpbmRvdyA9IHRoaXMuZ2V0UGFuZWxVSShuYW1lKSBhcyBVSVdpbmRvdztcclxuICAgICAgICBpZih1aSAhPSBudWxsKXtcclxuICAgICAgICAgICAgdWkuY2xvc2UoYXJnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09VUlXaWRnZXRcclxuICAgIC8v5omT5byAV2lkaWdldFxyXG4gICAgcHVibGljIGFzeW5jIG9wZW5XaWRnZXQocGtnOnN0cmluZywgbmFtZTpzdHJpbmcsIGFyZzphbnkpe1xyXG5cclxuICAgICAgICBsZXQgdWk6VUlXaWRnZSA9IGF3YWl0IHRoaXMub3Blbihwa2csIG5hbWUsIGFyZyk7XHJcblxyXG4gICAgICAgIHJldHVybiB1aTtcclxuICAgIH1cclxuXHJcbiAgICAvL3XlhbPpl61XaWRpZ2V0XHJcbiAgICBwdWJsaWMgY2xvc2VXaWRnZXQobmFtZTpzdHJpbmcsIGFyZzphbnkpe1xyXG5cclxuICAgICAgICBsZXQgdWk6VUlXaWRnZSA9IHRoaXMuZ2V0UGFuZWxVSShuYW1lKSBhcyBVSVdpZGdlO1xyXG4gICAgICAgIGlmKHVpIT1udWxsKXtcclxuICAgICAgICAgICAgdWkuY2xvc2UoYXJnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsb3NlQWxsUGFuZWxzKCl7XHJcbiAgICAgICAgLy/liKDpmaTpmaRMb2FkaW5n55WM6Z2i5aSW55qE5omA5pyJV2luZG93LCBXaWRnZXRcclxuICAgICAgICB0aGlzLmRpc3Ryb3lBbGxMb2FkZWRQYW5lbCgpO1xyXG4gICAgICAgIC8v5Yig6Zmk5omA5pyJUGFnZVxyXG4gICAgICAgIGxldCBsZW4gPSB0aGlzLm1fcGFnZVRyYWNrU3RhY2subGVuZ3RoO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IGxlbi0xOyBpID49IDAgO2ktLSl7XHJcbiAgICAgICAgICAgIGxldCB0cmFjayA9IHRoaXMubV9wYWdlVHJhY2tTdGFja1tpXTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuZGlzdHJveVBhbmVsKHRyYWNrLnVpKTtcclxuICAgICAgICAgICAgdGhpcy5tX3BhZ2VUcmFja1N0YWNrLnNsaWNlKGksMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgVUlQYW5lbCB9IGZyb20gXCIuL1VJUGFuZWxcIjtcclxuaW1wb3J0IHsgVUlUeXBlRGVmLCBVSUNvbURlZnMgfSBmcm9tIFwiLi9VSURlZmluZVwiO1xyXG5pbXBvcnQgeyBGYWlyeUdVSSB9IGZyb20gXCJjc2hhcnBcIjtcclxuaW1wb3J0IHsgUyB9IGZyb20gXCIuLi8uLi9nbG9iYWwvR2FtZUNvbmZpZ1wiO1xyXG5cclxuXHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVUlQYWdlIGV4dGVuZHMgVUlQYW5lbHtcclxuICAgIHB1YmxpYyBnZXQgdWlUeXBlKCk6IFVJVHlwZURlZiB7ICAgIFxyXG4gICAgICAgIHJldHVybiBVSVR5cGVEZWYuUGFnZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1fYnRuR29CYWNrOkZhaXJ5R1VJLkdCdXR0b247XHJcblxyXG5cclxuICAgIHB1YmxpYyBvbkF3YWtlKCk6dm9pZHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLm1fYnRuR29CYWNrID0gdGhpcy5mdWkuR2V0Q2hpbGQoVUlDb21EZWZzLkJhY2tCdG4pO1xyXG5cclxuICAgICAgICBpZih0aGlzLm1fYnRuR29CYWNrIT11bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLm1fYnRuR29CYWNrLm9uQ2xpY2suQWRkKCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQnRuR29CYWNrKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIG9uU2hvdyh2bzphbnkpOnZvaWR7XHJcblxyXG4gICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ2xvc2UoYXJnOmFueSk6dm9pZHtcclxuICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkJ0bkdvQmFjaygpe1xyXG4gICAgICAgIFMuVUlNYW5hZ2VyLmdvQmFja1BhZ2UoKTtcclxuICAgIH1cclxuXHJcbn0gIiwiaW1wb3J0IHsgVUlUeXBlRGVmLCBVSUxheWVyRGVmIH0gZnJvbSBcIi4vVUlEZWZpbmVcIjtcclxuaW1wb3J0IHsgRmFpcnlHVUkgfSBmcm9tIFwiY3NoYXJwXCI7XHJcbmltcG9ydCB7IFMgfSBmcm9tIFwiLi4vLi4vZ2xvYmFsL0dhbWVDb25maWdcIjtcclxuaW1wb3J0IHsgVUlCYXNlIH0gZnJvbSBcIi4vVUlCYXNlXCI7XHJcbmltcG9ydCB7IFVJQ29tcG9uZW50IH0gZnJvbSBcIi4vVUlDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTGlzdCB9IGZyb20gXCIuLi9jb21tb24vTGlzdFwiO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFVJUGFuZWwgZXh0ZW5kcyBVSUJhc2Uge1xyXG5cclxuICAgIHB1YmxpYyBwa2dOYW1lOnN0cmluZztcclxuICAgIHByaXZhdGUgX25hbWU6c3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfdGltZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfY29tcG9uZW50czpMaXN0PHN0cmluZz4gPSBuZXcgTGlzdCgpO1xyXG4gICAgcHJpdmF0ZSBfdWlDb21wb25lbnRzOkxpc3Q8VUlDb21wb25lbnQ+PW5ldyBMaXN0KCk7XHJcblxyXG5cclxuICAgIHB1YmxpYyBzZXQgbmFtZSh2OnN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IHY7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB1aVR5cGUoKTogVUlUeXBlRGVmIHsgICAgXHJcbiAgICAgICAgcmV0dXJuIFVJVHlwZURlZi5Vbmtvd247XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgbV9sYXllcjpVSUxheWVyRGVmID0gVUlMYXllckRlZi5Vbmtvd247XHJcbiAgICBwdWJsaWMgZ2V0IGxheWVyKCkgOiBVSUxheWVyRGVmIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX2xheWVyOyBcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgbGF5ZXIodiA6IFVJTGF5ZXJEZWYpIHtcclxuICAgICAgICB0aGlzLm1fbGF5ZXIgPSB2O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgIGdldCBpc09wZW4oKSA6IGJvb2xlYW57XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmZ1aS52aXNpYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgdmlzaWJsZShpc0FjdGl2YXRlOmJvb2xlYW4pe1xyXG5cclxuICAgICAgICB0aGlzLmZ1aS52aXNpYmxlID0gaXNBY3RpdmF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3Qgb25Bd2FrZSgpOnZvaWQ7XHJcbiAgICBwdWJsaWMgYWJzdHJhY3Qgb25TaG93KHZvPzphbnkpOnZvaWQ7XHJcbiAgICBwdWJsaWMgYWJzdHJhY3Qgb25DbG9zZShhcmc/OmFueSk6dm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFVuaXR55Lit55qEVXBkYXRl5pa55rOVXHJcbiAgICAgKiBAcGFyYW0gZGVsdGEg5q+P5bin6Iqx55qE5pe26Ze0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvblVwZGF0ZShkZWx0YT86bnVtYmVyKTp2b2lke1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25EaXNwb3NlKCl7fTtcclxuXHJcbiAgICBwdWJsaWMgYXdha2UoKTp2b2lke1xyXG4gICAgICAgIHRoaXMub25Bd2FrZSgpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGFydFRpbWVyKClcclxuICAgIHtcclxuICAgICAgICBpZighdGhpcy5fdGltZXIpXHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVyPXNldEludGVydmFsKHRoaXMudXBkYXRlLmJpbmQodGhpcyksMjAwKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShkZWx0YTpudW1iZXIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5vblVwZGF0ZShkZWx0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmraTnp4HmnInmlrnms5XlnKhVSSBNYW5hZ2Vy5Lit6LCD55SoIO+8jOeJueauiuiwg+eUqOOAglxyXG4gICAgICogQHBhcmFtIGFyZyBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfaW50ZXJuYWxPcGVuKGFyZzphbnkpOnZvaWR7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5sYXllciA9IFVJTGF5ZXJEZWYuZ2V0RGVmYXVsdExheWVyKHRoaXMudWlUeXBlKTtcclxuICAgICAgICBGYWlyeUdVSS5HUm9vdC5pbnN0LkFkZENoaWxkKHRoaXMuZnVpKTtcclxuXHJcbiAgICAgICAgdGhpcy5vblNob3coYXJnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgY3JlYXRlQ29tcG9uZW50PFQgZXh0ZW5kcyBVSUNvbXBvbmVudD4ocGtnOnN0cmluZywgbmFtZTpzdHJpbmcsY2xzOntuZXcoKTpUfSk6UHJvbWlzZTxUPlxyXG4gICAge1xyXG4gICAgICAgIC8v5Yqg6L2957uE5Lu2UGFja2FnZei1hOa6kFxyXG4gICAgICAgIGlmKHBrZyAhPSB0aGlzLnBrZ05hbWUgJiYgIXRoaXMuX2NvbXBvbmVudHMuY29udGFpbnMocGtnKSl7XHJcbiAgICAgICAgICAgIGF3YWl0IFMuUmVzTWFuYWdlci5sb2FkRmFpcnlHVUlQYWNrYWdlKHBrZyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudHMuYWRkKHBrZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBjb21wPW5ldyBjbHMoKTtcclxuICAgICAgICBjb21wLmNyZWF0ZVVJKHBrZyxuYW1lKTtcclxuICAgICAgICB0aGlzLl91aUNvbXBvbmVudHMuYWRkKGNvbXApO1xyXG4gICAgICAgIHJldHVybiBjb21wO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgY2xvc2UoYXJnOmFueSA9IG51bGwpOnZvaWR7XHJcblxyXG4gICAgICAgIHRoaXMub25DbG9zZShhcmcpO1xyXG4gICAgICAgIEZhaXJ5R1VJLkdSb290Lmluc3QuUmVtb3ZlQ2hpbGQodGhpcy5mdWkpO1xyXG4gICAgICAgIGlmKHRoaXMuX3RpbWVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl90aW1lcik7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVyPW51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCk6dm9pZHtcclxuXHJcbiAgICAgICAgLy/ljbjovb3nu4Tku7ZQYWNrYWdlXHJcbiAgICAgICAgdGhpcy5fY29tcG9uZW50cy5mb3JlYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICBTLlJlc01hbmFnZXIucmVsZWFzZUZhaXJ5R1VJUGFja2FnZShlbGVtZW50KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl91aUNvbXBvbmVudHMuZm9yRWFjaChlbGVtZW50PT57XHJcbiAgICAgICAgICAgICBlbGVtZW50Lm9uQ2xvc2UoKTtcclxuICAgICAgICAgICAgIGlmKGVsZW1lbnQucGFyZW50IT11bmRlZmluZWQgJiYgZWxlbWVudC5wYXJlbnQhPW51bGwpXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnBhcmVudC5SZW1vdmVDaGlsZChlbGVtZW50LmZ1aSk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBlbGVtZW50LmZ1aS5EaXNwb3NlKCk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdGhpcy5fY29tcG9uZW50cy5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuX3VpQ29tcG9uZW50cy5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuZnVpLkRpc3Bvc2UoKTtcclxuICAgICAgICB0aGlzLm9uRGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgVUlNZXNzYWdle1xyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIE1TR19TRUxFQ1RfU0VSVkVSOm51bWJlciAgPSAxMDAwO1xyXG4gICAgcHVibGljIHN0YXRpYyBNU0dfU0NFTkVfUFJPR1JFU1M6bnVtYmVyID0gMTAwMTtcclxuICAgIFxyXG5cclxuXHJcbn0iLCJpbXBvcnQgeyBNZXNzZW5nZXIgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2NvbW1vbi9NZXNzZW5nZXJcIjtcclxuaW1wb3J0IHsgU2luZ2xldG9uIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9jb21tb24vU2luZ2xldG9uXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFVJTWVzc2FnZU1hbmdlciBleHRlbmRzIFNpbmdsZXRvbjxVSU1lc3NhZ2VNYW5nZXI+e1xyXG5cclxuICAgIHByaXZhdGUgdWlNZXNzYWdlOk1lc3NlbmdlciA9IG5ldyBNZXNzZW5nZXIoKTtcclxuXHJcblxyXG4gICAgcHVibGljIGFkZExpc3RlbmVyKG1zZ0NvZGU6bnVtYmVyLG9iajphbnksIGxpc3RlbmVyOkZ1bmN0aW9uKXtcclxuXHJcbiAgICAgICAgdGhpcy51aU1lc3NhZ2UuYWRkTGlzdGVuZXIobXNnQ29kZSwgb2JqLCBsaXN0ZW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUxpc3RlbmVyKG1zZ0NvZGU6bnVtYmVyLCBsaXN0ZW5lcjpGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy51aU1lc3NhZ2UucmVtb3ZlTGlzdGVuZXIobXNnQ29kZSwgbGlzdGVuZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVMaXN0ZW5lckJ5Q29kZShtc2dDb2RlOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy51aU1lc3NhZ2UucmVtb3ZlTGlzdGVuZXJCeVR5cGUobXNnQ29kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFydXAoKXtcclxuICAgICAgICB0aGlzLnVpTWVzc2FnZS5jbGVhcnVwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGJyb2FkY2FzdChtc2dDb2RlOm51bWJlcixwYXJhbXM6YW55KXtcclxuXHJcblxyXG4gICAgICAgIHRoaXMudWlNZXNzYWdlLmJyb2FkY2FzdChtc2dDb2RlLCBwYXJhbXMpXHJcbiAgICB9XHJcbn0iLCIvLyBpbXBvcnQgeyBob21lVUkgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZGF0YS91aS9ob21lXCI7XHJcbmltcG9ydCB7IEZseUJpcmRVSSB9IGZyb20gXCIuLi8uLi8uLi8uLi9kYXRhL3VpL0ZseUJpcmRcIjtcclxuaW1wb3J0IHsgQmFzZVNjZW5lIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1ld29yay9zY2VuZS9CYXNlU2NlbmVcIjtcclxuaW1wb3J0IHsgUyB9IGZyb20gXCIuLi8uLi8uLi8uLi9nbG9iYWwvR2FtZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBWb0hvbWUgfSBmcm9tIFwiLi4vLi4vaG9tZS92by9Wb0hvbWVcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgRmx5QmlyZFNjZW5lIGV4dGVuZHMgQmFzZVNjZW5le1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25FbnRlcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ29tcGxldGUoKSB7XHJcblxyXG4gICAgICAgIGxldCB2bzpWb0hvbWUgPSBuZXcgVm9Ib21lKCk7XHJcbiAgICAgICAgdm8ubmFtZSA9IFwiSnVzdGluXCI7XHJcbiAgICAgICAgdm8uaHAgPSAxMjAwO1xyXG4gICAgICAgIHZvLm1wID0gMzMwMDtcclxuICAgICAgICB2by5tb25leSA9IDY2NjtcclxuXHJcbiAgICAgICAgUy5VSU1hbmFnZXIub3BlblBhZ2VJblNjZW5lKFxyXG4gICAgICAgICAgICBGbHlCaXJkVUkuUGFja2FnZU5hbWUsXHJcbiAgICAgICAgICAgIEZseUJpcmRVSS5VSU1haW5WSWV3LFxyXG4gICAgICAgICAgICB2byk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uTGVhdmUoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn0iLCJpbXBvcnQgeyBVSVBhZ2UgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL3VpL1VJUGFnZVwiO1xyXG5pbXBvcnQgeyBiaW5kZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2NvbW1vbi9OaWNlRGVjb3JhdG9yXCI7XHJcbmltcG9ydCB7IEZhaXJ5R1VJLCBVbml0eUVuZ2luZSB9IGZyb20gXCJjc2hhcnBcIjtcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1ld29yay9sb2dnZXIvTG9nZ2VyXCI7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBVSUZseUJpcmRNYWluVmlldyBleHRlbmRzIFVJUGFnZXtcclxuXHJcbiAgICBAYmluZGVyKFwibGlzdF9iZ1wiKVxyXG4gICAgcHVibGljIGxpc3RfYmc6RmFpcnlHVUkuR0xpc3Q7XHJcblxyXG4gICAgcHVibGljIG9uVXBkYXRlKCk6dm9pZHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25Bd2FrZSgpOnZvaWR7XHJcbiAgICAgICAgc3VwZXIub25Bd2FrZSgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5byA5aeL55WM6Z2iM1wiKVxyXG4gICAgICAgIHRoaXMubGlzdF9iZy5TZXRWaXJ0dWFsQW5kTG9vcCgpO1xyXG4gICAgICAgIHRoaXMubGlzdF9iZy5pdGVtUmVuZGVyZXIgPSAoaW5kZXg6bnVtYmVyLCBvYmo6RmFpcnlHVUkuR09iamVjdCk9PntcclxuICAgICAgICAgICAgLy8gdGhpcy5yZW5kZXJTZXJ2ZXJMaXN0SXRlbShpbmRleCwgb2JqKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMubGlzdF9iZy5udW1JdGVtcyA9IDM7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgb25TaG93KHZvKTp2b2lke1xyXG4gICAgICAgIHN1cGVyLm9uU2hvdyh2byk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMubV9uYW1lTGJsLnRleHQgPSB2by5uYW1lO1xyXG4gICAgICAgIC8vIHRoaXMubV9tcExibC50ZXh0ID0gdm8ubXAudG9TdHJpbmcoKTtcclxuICAgICAgICAvLyB0aGlzLm1faHBMYmwudGV4dCA9IHZvLmhwLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgLy8gdGhpcy5tX21vbmV5TGJsLnRleHQgPSB2by5tb25leS50b1N0cmluZygpO1xyXG5cclxuICAgICAgICAvLyBTLkdhbWVTZXNzaW9uLmxpc3RlbihPcGNvZGUuTVNHX0dTMkNfVGVzdCxmdW5jdGlvbihtc2c6bmljZV90cy5HUzJDX1Rlc3Qpe1xyXG4gICAgICAgIC8vICAgICBMb2dnZXIubG9nKFwi5pS25Yiw5pyN5Yqh5Zmo5LiL5Y+R55qE5raI5oGv44CC44CC44CC44CCXCIrbXNnLnRlc3RSZXNwb25zZSlcclxuICAgICAgICAvLyB9KVxyXG4gICAgfVxyXG4gICAgcHVibGljIG9uQ2xvc2UoYXJnOmFueSk6dm9pZHtcclxuICAgICAgICBzdXBlci5vbkNsb3NlKGFyZyk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYXN5bmMgY2xpY2tfYnRuX3N0YXJ0KCl7XHJcbiAgICAgICAgTG9nZ2VyLmxvZyhcIm9uIGNoYXQuLi5cIik7XHJcbiAgICB9XHJcblxyXG5cclxufSIsImltcG9ydCB7IEdhbWVTdGFydFVJIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2RhdGEvdWkvR2FtZVN0YXJ0XCI7XHJcbmltcG9ydCB7IEJhc2VTY2VuZSB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvc2NlbmUvQmFzZVNjZW5lXCI7XHJcbmltcG9ydCB7IFMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZ2xvYmFsL0dhbWVDb25maWdcIjtcclxuaW1wb3J0IHsgVm9HYW1lU3RhcnQgfSBmcm9tIFwiLi4vdm8vVm9HYW1lU3RhcnRcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgR2FtZVN0YXJ0U2NlbmUgZXh0ZW5kcyBCYXNlU2NlbmV7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25FbnRlcigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIui/m+WFpeW8gOWni+WcuuaZr1wiKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNvbXBsZXRlKCkge1xyXG5cclxuICAgICAgICBsZXQgdm86Vm9HYW1lU3RhcnQgPSBuZXcgVm9HYW1lU3RhcnQoKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCLov5vlhaXlvIDlp4vlnLrmma/nu5PmnZ9cIilcclxuXHJcbiAgICAgICAgUy5VSU1hbmFnZXIub3BlblBhZ2VJblNjZW5lKFxyXG4gICAgICAgICAgICBHYW1lU3RhcnRVSS5QYWNrYWdlTmFtZSxcclxuICAgICAgICAgICAgR2FtZVN0YXJ0VUkuVUlTdGFydFZpZXcsXHJcbiAgICAgICAgICAgIHZvKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25MZWF2ZSgpIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG5cclxufSIsImltcG9ydCB7IFVJUGFnZSB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvdWkvVUlQYWdlXCI7XHJcbmltcG9ydCB7IGJpbmRlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvY29tbW9uL05pY2VEZWNvcmF0b3JcIjtcclxuaW1wb3J0IHsgRmFpcnlHVUkgfSBmcm9tIFwiY3NoYXJwXCI7XHJcbmltcG9ydCB7IExvZ2luQVBJIH0gZnJvbSBcIi4uLy4uLy4uL2FwaS9Mb2dpbkFQSVwiO1xyXG5pbXBvcnQgeyBPcGNvZGUgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZGF0YS9wYi9PcGNvZGVcIjtcclxuaW1wb3J0IHsgbmljZV90cyB9IGZyb20gXCIuLi8uLi8uLi8uLi9kYXRhL3BiL2dlbi9wYlwiO1xyXG5pbXBvcnQgeyBTIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2dsb2JhbC9HYW1lQ29uZmlnXCI7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvbG9nZ2VyL0xvZ2dlclwiO1xyXG5pbXBvcnQgeyBTY2VuZURlZiB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvc2NlbmUvU2NlbmVEZWZcIjtcclxuaW1wb3J0IHsgVm9HYW1lU3RhcnQgfSBmcm9tIFwiLi4vdm8vVm9HYW1lU3RhcnRcIjtcclxuXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFVJU3RhcnRWaWV3IGV4dGVuZHMgVUlQYWdle1xyXG5cclxuICAgIEBiaW5kZXIoXCJidG5fc3RhcnRcIilcclxuICAgIHB1YmxpYyBidG5fc3RhcnQ6RmFpcnlHVUkuR0J1dHRvbjtcclxuICAgIC8vIEBiaW5kZXIoXCJiYWdCdG5cIilcclxuICAgIC8vIHB1YmxpYyBtX2JhZ0J0bjpGYWlyeUdVSS5HQnV0dG9uO1xyXG4gICAgLy8gQGJpbmRlcihcInNob3BCdG5cIilcclxuICAgIC8vIHB1YmxpYyBtX3Nob3BCdG46RmFpcnlHVUkuR0J1dHRvbjtcclxuICAgIC8vIEBiaW5kZXIoXCJsZXZlbEJ0blwiKVxyXG4gICAgLy8gcHVibGljIG1fbGV2ZWxCdG46RmFpcnlHVUkuR0J1dHRvbjtcclxuXHJcbiAgICAvLyBAYmluZGVyKFwibmFtZVR4dFwiKVxyXG4gICAgLy8gcHVibGljIG1fbmFtZUxibDpGYWlyeUdVSS5HTGFiZWw7XHJcbiAgICAvLyBAYmluZGVyKFwiaHBUeHRcIilcclxuICAgIC8vIHB1YmxpYyBtX2hwTGJsOkZhaXJ5R1VJLkdMYWJlbDtcclxuICAgIC8vIEBiaW5kZXIoXCJtcFR4dFwiKVxyXG4gICAgLy8gcHVibGljIG1fbXBMYmw6RmFpcnlHVUkuR0xhYmVsO1xyXG4gICAgLy8gQGJpbmRlcihcIm1vbmV5VHh0XCIpXHJcbiAgICAvLyBwdWJsaWMgbV9tb25leUxibDpGYWlyeUdVSS5HTGFiZWw7XHJcblxyXG5cclxuICAgIHB1YmxpYyBvbkF3YWtlKCk6dm9pZHtcclxuICAgICAgICBzdXBlci5vbkF3YWtlKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLlvIDlp4vnlYzpnaJcIilcclxuICAgICAgICB0aGlzLmJ0bl9zdGFydC5vbkNsaWNrLkFkZCgoKT0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIjIzMzNcIik7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tfYnRuX3N0YXJ0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBwdWJsaWMgb25TaG93KHZvOlZvR2FtZVN0YXJ0KTp2b2lke1xyXG4gICAgICAgIHN1cGVyLm9uU2hvdyh2byk7XHJcblxyXG4gICAgICAgIC8vIFMuR2FtZVNlc3Npb24ubGlzdGVuKE9wY29kZS5NU0dfR1MyQ19UZXN0LGZ1bmN0aW9uKG1zZzpuaWNlX3RzLkdTMkNfVGVzdCl7XHJcbiAgICAgICAgLy8gICAgIExvZ2dlci5sb2coXCLmlLbliLDmnI3liqHlmajkuIvlj5HnmoTmtojmga/jgILjgILjgILjgIJcIittc2cudGVzdFJlc3BvbnNlKVxyXG4gICAgICAgIC8vIH0pXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgb25DbG9zZShhcmc6YW55KTp2b2lke1xyXG4gICAgICAgIHN1cGVyLm9uQ2xvc2UoYXJnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgY2xpY2tfYnRuX3N0YXJ0KCl7XHJcbiAgICAgICAgYXdhaXQgUy5TY2VuZU1hbmFnZXIubG9hZFNjZW5lKFNjZW5lRGVmLkZseUJpcmQpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFZvR2FtZVN0YXJ0e1xyXG4gICAgcHVibGljIG5hbWU6c3RyaW5nO1xyXG4gICAgcHVibGljIGhwOm51bWJlcjtcclxuICAgIHB1YmxpYyBtcDpudW1iZXI7XHJcbiAgICBwdWJsaWMgbW9uZXk6bnVtYmVyO1xyXG59IiwiLy8gaW1wb3J0IHsgaG9tZVVJIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2RhdGEvdWkvaG9tZVwiO1xyXG5pbXBvcnQgeyBCYXNlU2NlbmUgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL3NjZW5lL0Jhc2VTY2VuZVwiO1xyXG5pbXBvcnQgeyBTIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2dsb2JhbC9HYW1lQ29uZmlnXCI7XHJcbmltcG9ydCB7IFZvSG9tZSB9IGZyb20gXCIuLi92by9Wb0hvbWVcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgSG9tZVNjZW5lIGV4dGVuZHMgQmFzZVNjZW5le1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uRW50ZXIoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNvbXBsZXRlKCkge1xyXG5cclxuICAgICAgICBsZXQgdm86Vm9Ib21lID0gbmV3IFZvSG9tZSgpO1xyXG4gICAgICAgIHZvLm5hbWUgPSBcIkp1c3RpblwiO1xyXG4gICAgICAgIHZvLmhwID0gMTIwMDtcclxuICAgICAgICB2by5tcCA9IDMzMDA7XHJcbiAgICAgICAgdm8ubW9uZXkgPSA2NjY7XHJcblxyXG4gICAgICAgIC8vIFMuVUlNYW5hZ2VyLm9wZW5QYWdlSW5TY2VuZShcclxuICAgICAgICAvLyAgICAgaG9tZVVJLlBhY2thZ2VOYW1lLFxyXG4gICAgICAgIC8vICAgICBob21lVUkuVUlIb21lUGFnZSxcclxuICAgICAgICAvLyAgICAgdm8pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkxlYXZlKCkge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuXHJcblxyXG59IiwiXHJcblxyXG5leHBvcnQgY2xhc3MgVm9Ib21le1xyXG5cclxuICAgIHB1YmxpYyBuYW1lOnN0cmluZztcclxuICAgIHB1YmxpYyBocDpudW1iZXI7XHJcbiAgICBwdWJsaWMgbXA6bnVtYmVyO1xyXG4gICAgcHVibGljIG1vbmV5Om51bWJlcjtcclxuXHJcbn0iLCJpbXBvcnQgeyBCYXNlU2NlbmUgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL3NjZW5lL0Jhc2VTY2VuZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBQdmVTY2VuZSBleHRlbmRzIEJhc2VTY2VuZXtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uRW50ZXIoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgb25Db21wbGV0ZSgpIHtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIHB1YmxpYyBvbkxlYXZlKCkge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuXHJcblxyXG59IiwiaW1wb3J0IHsgSnNNYW5hZ2VyIH0gZnJvbSBcImNzaGFycFwiO1xyXG5pbXBvcnQgeyBHYW1lT2JqZWN0UG9vbCB9IGZyb20gXCIuLi9mcmFtZXdvcmsvY29tbW9uL0dhbWVPYmplY3RQb29sXCI7XHJcbmltcG9ydCB7IFJlc01hbmFnZXIgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2NvbW1vbi9SZXNNYW5hZ2VyXCI7XHJcbi8vIGltcG9ydCB7IFN0b3J5TWFuYWdlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvaW5rL1N0b3J5TWFuYWdlclwiO1xyXG4vLyBpbXBvcnQgeyBTdG9yeU1lc3NhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9pbmsvU3RvcnlNZXNzYWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHYW1lU2Vzc2lvbiB9IGZyb20gXCIuLi9mcmFtZXdvcmsvbmV0L0dhbWVTZXNzaW9uXCI7XHJcbmltcG9ydCB7IEh0dHBNYW5hZ2VyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9uZXQvSHR0cE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU2Vzc2lvbk1hbmFnZXIgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL25ldC9TZXNzaW9uTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTY2VuZU1hbmFnZXIgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL3NjZW5lL1NjZW5lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL3VpL1VJTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBVSU1lc3NhZ2VNYW5nZXIgfSBmcm9tIFwiLi4vZ2FtZS9ldmVudC9VSU1lc3NhZ2VNYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgIGNsYXNzIEdhbWVDb25maWd7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBkZWJ1Zzpib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWxtU2VydmVySVA6c3RyaW5nID0gXCIxMjcuMC4wLjFcIjsgXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWxtU2VydmVyUG9ydDpudW1iZXIgPSA5MDAxO1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFN7XHJcbiAgICBwdWJsaWMgc3RhdGljIFVJTWFuYWdlciA9IFVJTWFuYWdlci5JbnN0YW5jZShVSU1hbmFnZXIpO1xyXG4gICAgcHVibGljIHN0YXRpYyBVSU1lc3NhZ2VNYW5nZXIgPSBVSU1lc3NhZ2VNYW5nZXIuSW5zdGFuY2UoVUlNZXNzYWdlTWFuZ2VyKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgU2NlbmVNYW5hZ2VyID0gU2NlbmVNYW5hZ2VyLkluc3RhbmNlKFNjZW5lTWFuYWdlcik7XHJcbiAgICBwdWJsaWMgc3RhdGljIEdhbWVPYmplY3RQb29sID0gR2FtZU9iamVjdFBvb2wuSW5zdGFuY2UoR2FtZU9iamVjdFBvb2wpO1xyXG4gICAgcHVibGljIHN0YXRpYyBSZXNNYW5hZ2VyID0gUmVzTWFuYWdlci5JbnN0YW5jZShSZXNNYW5hZ2VyKTtcclxuICAgIC8vIHB1YmxpYyBzdGF0aWMgU3RvcnlNYW5hZ2VyID0gU3RvcnlNYW5hZ2VyLkluc3RhbmNlKFN0b3J5TWFuYWdlcik7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNlc3Npb25NYW5hZ2VyID0gU2Vzc2lvbk1hbmFnZXIuSW5zdGFuY2UoU2Vzc2lvbk1hbmFnZXIpO1xyXG4gICAgcHVibGljIHN0YXRpYyBHYW1lU2Vzc2lvbiA9IEdhbWVTZXNzaW9uLkluc3RhbmNlKEdhbWVTZXNzaW9uKTtcclxuICAgIC8vIHB1YmxpYyBzdGF0aWMgU3RvcnlNZXNzYWdlTWFuYWdlciA9IFN0b3J5TWVzc2FnZU1hbmFnZXIuSW5zdGFuY2UoU3RvcnlNZXNzYWdlTWFuYWdlcik7XHJcbiAgICBwdWJsaWMgc3RhdGljIEh0dHBNYW5hZ2VyID0gSHR0cE1hbmFnZXIuSW5zdGFuY2UoSHR0cE1hbmFnZXIpO1xyXG59XHJcbiIsIi8qZXNsaW50LWRpc2FibGUgYmxvY2stc2NvcGVkLXZhciwgaWQtbGVuZ3RoLCBuby1jb250cm9sLXJlZ2V4LCBuby1tYWdpYy1udW1iZXJzLCBuby1wcm90b3R5cGUtYnVpbHRpbnMsIG5vLXJlZGVjbGFyZSwgbm8tc2hhZG93LCBuby12YXIsIHNvcnQtdmFycyovXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyICRwcm90b2J1ZiA9IHJlcXVpcmUoXCJwcm90b2J1ZmpzL21pbmltYWxcIik7XHJcblxyXG4vLyBDb21tb24gYWxpYXNlc1xyXG52YXIgJFJlYWRlciA9ICRwcm90b2J1Zi5SZWFkZXIsICRXcml0ZXIgPSAkcHJvdG9idWYuV3JpdGVyLCAkdXRpbCA9ICRwcm90b2J1Zi51dGlsO1xyXG5cclxudmFyIExvbmcgPSByZXF1aXJlKFwibG9uZ1wiKTtcclxuJHByb3RvYnVmLnV0aWwuTG9uZyA9IExvbmc7XHJcbiRwcm90b2J1Zi5jb25maWd1cmUoKTtcclxuXHJcblxyXG4vLyBFeHBvcnRlZCByb290IG5hbWVzcGFjZVxyXG52YXIgJHJvb3QgPSAkcHJvdG9idWYucm9vdHNbXCJkZWZhdWx0XCJdIHx8ICgkcHJvdG9idWYucm9vdHNbXCJkZWZhdWx0XCJdID0ge30pO1xyXG5cclxuJHJvb3QubmljZV90cyA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE5hbWVzcGFjZSBuaWNlX3RzLlxyXG4gICAgICogQGV4cG9ydHMgbmljZV90c1xyXG4gICAgICogQG5hbWVzcGFjZVxyXG4gICAgICovXHJcbiAgICB2YXIgbmljZV90cyA9IHt9O1xyXG5cclxuICAgIG5pY2VfdHMuQzJSX0xvZ2luID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQcm9wZXJ0aWVzIG9mIGEgQzJSX0xvZ2luLlxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzXHJcbiAgICAgICAgICogQGludGVyZmFjZSBJQzJSX0xvZ2luXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtzdHJpbmd8bnVsbH0gW0FjY291bnRdIEMyUl9Mb2dpbiBBY2NvdW50XHJcbiAgICAgICAgICogQHByb3BlcnR5IHtzdHJpbmd8bnVsbH0gW1Bhc3N3b3JkXSBDMlJfTG9naW4gUGFzc3dvcmRcclxuICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ29uc3RydWN0cyBhIG5ldyBDMlJfTG9naW4uXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHNcclxuICAgICAgICAgKiBAY2xhc3NkZXNjIFJlcHJlc2VudHMgYSBDMlJfTG9naW4uXHJcbiAgICAgICAgICogQGltcGxlbWVudHMgSUMyUl9Mb2dpblxyXG4gICAgICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICAgICAqIEBwYXJhbSB7bmljZV90cy5JQzJSX0xvZ2luPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gQzJSX0xvZ2luKHByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgaWYgKHByb3BlcnRpZXMpXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXlzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyksIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSlcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllc1trZXlzW2ldXSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2tleXNbaV1dID0gcHJvcGVydGllc1trZXlzW2ldXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEMyUl9Mb2dpbiBBY2NvdW50LlxyXG4gICAgICAgICAqIEBtZW1iZXIge3N0cmluZ30gQWNjb3VudFxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyUl9Mb2dpblxyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyUl9Mb2dpbi5wcm90b3R5cGUuQWNjb3VudCA9IFwiXCI7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEMyUl9Mb2dpbiBQYXNzd29yZC5cclxuICAgICAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IFBhc3N3b3JkXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJSX0xvZ2luXHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJSX0xvZ2luLnByb3RvdHlwZS5QYXNzd29yZCA9IFwiXCI7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENyZWF0ZXMgYSBuZXcgQzJSX0xvZ2luIGluc3RhbmNlIHVzaW5nIHRoZSBzcGVjaWZpZWQgcHJvcGVydGllcy5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gY3JlYXRlXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJSX0xvZ2luXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7bmljZV90cy5JQzJSX0xvZ2luPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XHJcbiAgICAgICAgICogQHJldHVybnMge25pY2VfdHMuQzJSX0xvZ2lufSBDMlJfTG9naW4gaW5zdGFuY2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBDMlJfTG9naW4uY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKHByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBDMlJfTG9naW4ocHJvcGVydGllcyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIEMyUl9Mb2dpbiBtZXNzYWdlLiBEb2VzIG5vdCBpbXBsaWNpdGx5IHtAbGluayBuaWNlX3RzLkMyUl9Mb2dpbi52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZW5jb2RlXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJSX0xvZ2luXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7bmljZV90cy5JQzJSX0xvZ2lufSBtZXNzYWdlIEMyUl9Mb2dpbiBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cclxuICAgICAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJSX0xvZ2luLmVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShtZXNzYWdlLCB3cml0ZXIpIHtcclxuICAgICAgICAgICAgaWYgKCF3cml0ZXIpXHJcbiAgICAgICAgICAgICAgICB3cml0ZXIgPSAkV3JpdGVyLmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5BY2NvdW50ICE9IG51bGwgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobWVzc2FnZSwgXCJBY2NvdW50XCIpKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAxLCB3aXJlVHlwZSAyID0qLzEwKS5zdHJpbmcobWVzc2FnZS5BY2NvdW50KTtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuUGFzc3dvcmQgIT0gbnVsbCAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtZXNzYWdlLCBcIlBhc3N3b3JkXCIpKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAyLCB3aXJlVHlwZSAyID0qLzE4KS5zdHJpbmcobWVzc2FnZS5QYXNzd29yZCk7XHJcbiAgICAgICAgICAgIHJldHVybiB3cml0ZXI7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIEMyUl9Mb2dpbiBtZXNzYWdlLCBsZW5ndGggZGVsaW1pdGVkLiBEb2VzIG5vdCBpbXBsaWNpdGx5IHtAbGluayBuaWNlX3RzLkMyUl9Mb2dpbi52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJSX0xvZ2luXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7bmljZV90cy5JQzJSX0xvZ2lufSBtZXNzYWdlIEMyUl9Mb2dpbiBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cclxuICAgICAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJSX0xvZ2luLmVuY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZChtZXNzYWdlLCB3cml0ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikubGRlbGltKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGVjb2RlcyBhIEMyUl9Mb2dpbiBtZXNzYWdlIGZyb20gdGhlIHNwZWNpZmllZCByZWFkZXIgb3IgYnVmZmVyLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBkZWNvZGVcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5DMlJfTG9naW5cclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGhdIE1lc3NhZ2UgbGVuZ3RoIGlmIGtub3duIGJlZm9yZWhhbmRcclxuICAgICAgICAgKiBAcmV0dXJucyB7bmljZV90cy5DMlJfTG9naW59IEMyUl9Mb2dpblxyXG4gICAgICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXHJcbiAgICAgICAgICogQHRocm93cyB7JHByb3RvYnVmLnV0aWwuUHJvdG9jb2xFcnJvcn0gSWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJSX0xvZ2luLmRlY29kZSA9IGZ1bmN0aW9uIGRlY29kZShyZWFkZXIsIGxlbmd0aCkge1xyXG4gICAgICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcclxuICAgICAgICAgICAgICAgIHJlYWRlciA9ICRSZWFkZXIuY3JlYXRlKHJlYWRlcik7XHJcbiAgICAgICAgICAgIHZhciBlbmQgPSBsZW5ndGggPT09IHVuZGVmaW5lZCA/IHJlYWRlci5sZW4gOiByZWFkZXIucG9zICsgbGVuZ3RoLCBtZXNzYWdlID0gbmV3ICRyb290Lm5pY2VfdHMuQzJSX0xvZ2luKCk7XHJcbiAgICAgICAgICAgIHdoaWxlIChyZWFkZXIucG9zIDwgZW5kKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGFnID0gcmVhZGVyLnVpbnQzMigpO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0YWcgPj4+IDMpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLkFjY291bnQgPSByZWFkZXIuc3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5QYXNzd29yZCA9IHJlYWRlci5zdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyLnNraXBUeXBlKHRhZyAmIDcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlY29kZXMgYSBDMlJfTG9naW4gbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlciwgbGVuZ3RoIGRlbGltaXRlZC5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJSX0xvZ2luXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuaWNlX3RzLkMyUl9Mb2dpbn0gQzJSX0xvZ2luXHJcbiAgICAgICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcclxuICAgICAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcclxuICAgICAgICAgKi9cclxuICAgICAgICBDMlJfTG9naW4uZGVjb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkKHJlYWRlcikge1xyXG4gICAgICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcclxuICAgICAgICAgICAgICAgIHJlYWRlciA9IG5ldyAkUmVhZGVyKHJlYWRlcik7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlY29kZShyZWFkZXIsIHJlYWRlci51aW50MzIoKSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVmVyaWZpZXMgYSBDMlJfTG9naW4gbWVzc2FnZS5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gdmVyaWZ5XHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJSX0xvZ2luXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG1lc3NhZ2UgUGxhaW4gb2JqZWN0IHRvIHZlcmlmeVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH0gYG51bGxgIGlmIHZhbGlkLCBvdGhlcndpc2UgdGhlIHJlYXNvbiB3aHkgaXQgaXMgbm90XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJSX0xvZ2luLnZlcmlmeSA9IGZ1bmN0aW9uIHZlcmlmeShtZXNzYWdlKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSAhPT0gXCJvYmplY3RcIiB8fCBtZXNzYWdlID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwib2JqZWN0IGV4cGVjdGVkXCI7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLkFjY291bnQgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiQWNjb3VudFwiKSlcclxuICAgICAgICAgICAgICAgIGlmICghJHV0aWwuaXNTdHJpbmcobWVzc2FnZS5BY2NvdW50KSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJBY2NvdW50OiBzdHJpbmcgZXhwZWN0ZWRcIjtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuUGFzc3dvcmQgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiUGFzc3dvcmRcIikpXHJcbiAgICAgICAgICAgICAgICBpZiAoISR1dGlsLmlzU3RyaW5nKG1lc3NhZ2UuUGFzc3dvcmQpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlBhc3N3b3JkOiBzdHJpbmcgZXhwZWN0ZWRcIjtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlcyBhIEMyUl9Mb2dpbiBtZXNzYWdlIGZyb20gYSBwbGFpbiBvYmplY3QuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIHRoZWlyIHJlc3BlY3RpdmUgaW50ZXJuYWwgdHlwZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGZyb21PYmplY3RcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5DMlJfTG9naW5cclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gb2JqZWN0IFBsYWluIG9iamVjdFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuaWNlX3RzLkMyUl9Mb2dpbn0gQzJSX0xvZ2luXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJSX0xvZ2luLmZyb21PYmplY3QgPSBmdW5jdGlvbiBmcm9tT2JqZWN0KG9iamVjdCkge1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgJHJvb3QubmljZV90cy5DMlJfTG9naW4pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IG5ldyAkcm9vdC5uaWNlX3RzLkMyUl9Mb2dpbigpO1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0LkFjY291bnQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuQWNjb3VudCA9IFN0cmluZyhvYmplY3QuQWNjb3VudCk7XHJcbiAgICAgICAgICAgIGlmIChvYmplY3QuUGFzc3dvcmQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuUGFzc3dvcmQgPSBTdHJpbmcob2JqZWN0LlBhc3N3b3JkKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlcyBhIHBsYWluIG9iamVjdCBmcm9tIGEgQzJSX0xvZ2luIG1lc3NhZ2UuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIG90aGVyIHR5cGVzIGlmIHNwZWNpZmllZC5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gdG9PYmplY3RcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5DMlJfTG9naW5cclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLkMyUl9Mb2dpbn0gbWVzc2FnZSBDMlJfTG9naW5cclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5JQ29udmVyc2lvbk9wdGlvbnN9IFtvcHRpb25zXSBDb252ZXJzaW9uIG9wdGlvbnNcclxuICAgICAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IFBsYWluIG9iamVjdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyUl9Mb2dpbi50b09iamVjdCA9IGZ1bmN0aW9uIHRvT2JqZWN0KG1lc3NhZ2UsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgaWYgKCFvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHt9O1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0ID0ge307XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmRlZmF1bHRzKSB7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QuQWNjb3VudCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QuUGFzc3dvcmQgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLkFjY291bnQgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiQWNjb3VudFwiKSlcclxuICAgICAgICAgICAgICAgIG9iamVjdC5BY2NvdW50ID0gbWVzc2FnZS5BY2NvdW50O1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5QYXNzd29yZCAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJQYXNzd29yZFwiKSlcclxuICAgICAgICAgICAgICAgIG9iamVjdC5QYXNzd29yZCA9IG1lc3NhZ2UuUGFzc3dvcmQ7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ29udmVydHMgdGhpcyBDMlJfTG9naW4gdG8gSlNPTi5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gdG9KU09OXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJSX0xvZ2luXHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBKU09OIG9iamVjdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyUl9Mb2dpbi5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci50b09iamVjdCh0aGlzLCAkcHJvdG9idWYudXRpbC50b0pTT05PcHRpb25zKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gQzJSX0xvZ2luO1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICBuaWNlX3RzLlIyQ19Mb2dpbiA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJvcGVydGllcyBvZiBhIFIyQ19Mb2dpbi5cclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90c1xyXG4gICAgICAgICAqIEBpbnRlcmZhY2UgSVIyQ19Mb2dpblxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfG51bGx9IFtFcnJvcl0gUjJDX0xvZ2luIEVycm9yXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtzdHJpbmd8bnVsbH0gW01lc3NhZ2VdIFIyQ19Mb2dpbiBNZXNzYWdlXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtzdHJpbmd8bnVsbH0gW0FkZHJlc3NdIFIyQ19Mb2dpbiBBZGRyZXNzXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ8TG9uZ3xudWxsfSBbS2V5XSBSMkNfTG9naW4gS2V5XHJcbiAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ8TG9uZ3xudWxsfSBbR2F0ZUlkXSBSMkNfTG9naW4gR2F0ZUlkXHJcbiAgICAgICAgICovXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnN0cnVjdHMgYSBuZXcgUjJDX0xvZ2luLlxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzXHJcbiAgICAgICAgICogQGNsYXNzZGVzYyBSZXByZXNlbnRzIGEgUjJDX0xvZ2luLlxyXG4gICAgICAgICAqIEBpbXBsZW1lbnRzIElSMkNfTG9naW5cclxuICAgICAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSVIyQ19Mb2dpbj19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIFIyQ19Mb2dpbihwcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzKVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXNba2V5c1tpXV0gIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1trZXlzW2ldXSA9IHByb3BlcnRpZXNba2V5c1tpXV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSMkNfTG9naW4gRXJyb3IuXHJcbiAgICAgICAgICogQG1lbWJlciB7bnVtYmVyfSBFcnJvclxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLlIyQ19Mb2dpblxyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFIyQ19Mb2dpbi5wcm90b3R5cGUuRXJyb3IgPSAwO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSMkNfTG9naW4gTWVzc2FnZS5cclxuICAgICAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IE1lc3NhZ2VcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5SMkNfTG9naW5cclxuICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBSMkNfTG9naW4ucHJvdG90eXBlLk1lc3NhZ2UgPSBcIlwiO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSMkNfTG9naW4gQWRkcmVzcy5cclxuICAgICAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IEFkZHJlc3NcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5SMkNfTG9naW5cclxuICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBSMkNfTG9naW4ucHJvdG90eXBlLkFkZHJlc3MgPSBcIlwiO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSMkNfTG9naW4gS2V5LlxyXG4gICAgICAgICAqIEBtZW1iZXIge251bWJlcnxMb25nfSBLZXlcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5SMkNfTG9naW5cclxuICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBSMkNfTG9naW4ucHJvdG90eXBlLktleSA9ICR1dGlsLkxvbmcgPyAkdXRpbC5Mb25nLmZyb21CaXRzKDAsMCxmYWxzZSkgOiAwO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSMkNfTG9naW4gR2F0ZUlkLlxyXG4gICAgICAgICAqIEBtZW1iZXIge251bWJlcnxMb25nfSBHYXRlSWRcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5SMkNfTG9naW5cclxuICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBSMkNfTG9naW4ucHJvdG90eXBlLkdhdGVJZCA9ICR1dGlsLkxvbmcgPyAkdXRpbC5Mb25nLmZyb21CaXRzKDAsMCxmYWxzZSkgOiAwO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGVzIGEgbmV3IFIyQ19Mb2dpbiBpbnN0YW5jZSB1c2luZyB0aGUgc3BlY2lmaWVkIHByb3BlcnRpZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGNyZWF0ZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLlIyQ19Mb2dpblxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSVIyQ19Mb2dpbj19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuaWNlX3RzLlIyQ19Mb2dpbn0gUjJDX0xvZ2luIGluc3RhbmNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgUjJDX0xvZ2luLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShwcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUjJDX0xvZ2luKHByb3BlcnRpZXMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBSMkNfTG9naW4gbWVzc2FnZS4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgbmljZV90cy5SMkNfTG9naW4udmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGVuY29kZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLlIyQ19Mb2dpblxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSVIyQ19Mb2dpbn0gbWVzc2FnZSBSMkNfTG9naW4gbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXHJcbiAgICAgICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFIyQ19Mb2dpbi5lbmNvZGUgPSBmdW5jdGlvbiBlbmNvZGUobWVzc2FnZSwgd3JpdGVyKSB7XHJcbiAgICAgICAgICAgIGlmICghd3JpdGVyKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVyID0gJFdyaXRlci5jcmVhdGUoKTtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuQWRkcmVzcyAhPSBudWxsICYmIE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1lc3NhZ2UsIFwiQWRkcmVzc1wiKSlcclxuICAgICAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMSwgd2lyZVR5cGUgMiA9Ki8xMCkuc3RyaW5nKG1lc3NhZ2UuQWRkcmVzcyk7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLktleSAhPSBudWxsICYmIE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1lc3NhZ2UsIFwiS2V5XCIpKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAyLCB3aXJlVHlwZSAwID0qLzE2KS5pbnQ2NChtZXNzYWdlLktleSk7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLkdhdGVJZCAhPSBudWxsICYmIE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1lc3NhZ2UsIFwiR2F0ZUlkXCIpKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAzLCB3aXJlVHlwZSAwID0qLzI0KS5pbnQ2NChtZXNzYWdlLkdhdGVJZCk7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLkVycm9yICE9IG51bGwgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobWVzc2FnZSwgXCJFcnJvclwiKSlcclxuICAgICAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgOTEsIHdpcmVUeXBlIDAgPSovNzI4KS5pbnQzMihtZXNzYWdlLkVycm9yKTtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuTWVzc2FnZSAhPSBudWxsICYmIE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1lc3NhZ2UsIFwiTWVzc2FnZVwiKSlcclxuICAgICAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgOTIsIHdpcmVUeXBlIDIgPSovNzM4KS5zdHJpbmcobWVzc2FnZS5NZXNzYWdlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHdyaXRlcjtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgUjJDX0xvZ2luIG1lc3NhZ2UsIGxlbmd0aCBkZWxpbWl0ZWQuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIG5pY2VfdHMuUjJDX0xvZ2luLnZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWRcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5SMkNfTG9naW5cclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLklSMkNfTG9naW59IG1lc3NhZ2UgUjJDX0xvZ2luIG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxyXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xyXG4gICAgICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBSMkNfTG9naW4uZW5jb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkKG1lc3NhZ2UsIHdyaXRlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbmNvZGUobWVzc2FnZSwgd3JpdGVyKS5sZGVsaW0oKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWNvZGVzIGEgUjJDX0xvZ2luIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGRlY29kZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLlIyQ19Mb2dpblxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5SZWFkZXJ8VWludDhBcnJheX0gcmVhZGVyIFJlYWRlciBvciBidWZmZXIgdG8gZGVjb2RlIGZyb21cclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aF0gTWVzc2FnZSBsZW5ndGggaWYga25vd24gYmVmb3JlaGFuZFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuaWNlX3RzLlIyQ19Mb2dpbn0gUjJDX0xvZ2luXHJcbiAgICAgICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcclxuICAgICAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcclxuICAgICAgICAgKi9cclxuICAgICAgICBSMkNfTG9naW4uZGVjb2RlID0gZnVuY3Rpb24gZGVjb2RlKHJlYWRlciwgbGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxyXG4gICAgICAgICAgICAgICAgcmVhZGVyID0gJFJlYWRlci5jcmVhdGUocmVhZGVyKTtcclxuICAgICAgICAgICAgdmFyIGVuZCA9IGxlbmd0aCA9PT0gdW5kZWZpbmVkID8gcmVhZGVyLmxlbiA6IHJlYWRlci5wb3MgKyBsZW5ndGgsIG1lc3NhZ2UgPSBuZXcgJHJvb3QubmljZV90cy5SMkNfTG9naW4oKTtcclxuICAgICAgICAgICAgd2hpbGUgKHJlYWRlci5wb3MgPCBlbmQpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0YWcgPSByZWFkZXIudWludDMyKCk7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRhZyA+Pj4gMykge1xyXG4gICAgICAgICAgICAgICAgY2FzZSA5MTpcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLkVycm9yID0gcmVhZGVyLmludDMyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDkyOlxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuTWVzc2FnZSA9IHJlYWRlci5zdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLkFkZHJlc3MgPSByZWFkZXIuc3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5LZXkgPSByZWFkZXIuaW50NjQoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLkdhdGVJZCA9IHJlYWRlci5pbnQ2NCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICByZWFkZXIuc2tpcFR5cGUodGFnICYgNyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGVjb2RlcyBhIFIyQ19Mb2dpbiBtZXNzYWdlIGZyb20gdGhlIHNwZWNpZmllZCByZWFkZXIgb3IgYnVmZmVyLCBsZW5ndGggZGVsaW1pdGVkLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBkZWNvZGVEZWxpbWl0ZWRcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5SMkNfTG9naW5cclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXHJcbiAgICAgICAgICogQHJldHVybnMge25pY2VfdHMuUjJDX0xvZ2lufSBSMkNfTG9naW5cclxuICAgICAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxyXG4gICAgICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFIyQ19Mb2dpbi5kZWNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBkZWNvZGVEZWxpbWl0ZWQocmVhZGVyKSB7XHJcbiAgICAgICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxyXG4gICAgICAgICAgICAgICAgcmVhZGVyID0gbmV3ICRSZWFkZXIocmVhZGVyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGVjb2RlKHJlYWRlciwgcmVhZGVyLnVpbnQzMigpKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWZXJpZmllcyBhIFIyQ19Mb2dpbiBtZXNzYWdlLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiB2ZXJpZnlcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5SMkNfTG9naW5cclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gbWVzc2FnZSBQbGFpbiBvYmplY3QgdG8gdmVyaWZ5XHJcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ3xudWxsfSBgbnVsbGAgaWYgdmFsaWQsIG90aGVyd2lzZSB0aGUgcmVhc29uIHdoeSBpdCBpcyBub3RcclxuICAgICAgICAgKi9cclxuICAgICAgICBSMkNfTG9naW4udmVyaWZ5ID0gZnVuY3Rpb24gdmVyaWZ5KG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSBcIm9iamVjdFwiIHx8IG1lc3NhZ2UgPT09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJvYmplY3QgZXhwZWN0ZWRcIjtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuRXJyb3IgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiRXJyb3JcIikpXHJcbiAgICAgICAgICAgICAgICBpZiAoISR1dGlsLmlzSW50ZWdlcihtZXNzYWdlLkVycm9yKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJFcnJvcjogaW50ZWdlciBleHBlY3RlZFwiO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5NZXNzYWdlICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIk1lc3NhZ2VcIikpXHJcbiAgICAgICAgICAgICAgICBpZiAoISR1dGlsLmlzU3RyaW5nKG1lc3NhZ2UuTWVzc2FnZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiTWVzc2FnZTogc3RyaW5nIGV4cGVjdGVkXCI7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLkFkZHJlc3MgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiQWRkcmVzc1wiKSlcclxuICAgICAgICAgICAgICAgIGlmICghJHV0aWwuaXNTdHJpbmcobWVzc2FnZS5BZGRyZXNzKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJBZGRyZXNzOiBzdHJpbmcgZXhwZWN0ZWRcIjtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuS2V5ICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIktleVwiKSlcclxuICAgICAgICAgICAgICAgIGlmICghJHV0aWwuaXNJbnRlZ2VyKG1lc3NhZ2UuS2V5KSAmJiAhKG1lc3NhZ2UuS2V5ICYmICR1dGlsLmlzSW50ZWdlcihtZXNzYWdlLktleS5sb3cpICYmICR1dGlsLmlzSW50ZWdlcihtZXNzYWdlLktleS5oaWdoKSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiS2V5OiBpbnRlZ2VyfExvbmcgZXhwZWN0ZWRcIjtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuR2F0ZUlkICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIkdhdGVJZFwiKSlcclxuICAgICAgICAgICAgICAgIGlmICghJHV0aWwuaXNJbnRlZ2VyKG1lc3NhZ2UuR2F0ZUlkKSAmJiAhKG1lc3NhZ2UuR2F0ZUlkICYmICR1dGlsLmlzSW50ZWdlcihtZXNzYWdlLkdhdGVJZC5sb3cpICYmICR1dGlsLmlzSW50ZWdlcihtZXNzYWdlLkdhdGVJZC5oaWdoKSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiR2F0ZUlkOiBpbnRlZ2VyfExvbmcgZXhwZWN0ZWRcIjtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlcyBhIFIyQ19Mb2dpbiBtZXNzYWdlIGZyb20gYSBwbGFpbiBvYmplY3QuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIHRoZWlyIHJlc3BlY3RpdmUgaW50ZXJuYWwgdHlwZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGZyb21PYmplY3RcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5SMkNfTG9naW5cclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gb2JqZWN0IFBsYWluIG9iamVjdFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuaWNlX3RzLlIyQ19Mb2dpbn0gUjJDX0xvZ2luXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgUjJDX0xvZ2luLmZyb21PYmplY3QgPSBmdW5jdGlvbiBmcm9tT2JqZWN0KG9iamVjdCkge1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgJHJvb3QubmljZV90cy5SMkNfTG9naW4pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IG5ldyAkcm9vdC5uaWNlX3RzLlIyQ19Mb2dpbigpO1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0LkVycm9yICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLkVycm9yID0gb2JqZWN0LkVycm9yIHwgMDtcclxuICAgICAgICAgICAgaWYgKG9iamVjdC5NZXNzYWdlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLk1lc3NhZ2UgPSBTdHJpbmcob2JqZWN0Lk1lc3NhZ2UpO1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0LkFkZHJlc3MgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuQWRkcmVzcyA9IFN0cmluZyhvYmplY3QuQWRkcmVzcyk7XHJcbiAgICAgICAgICAgIGlmIChvYmplY3QuS2V5ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBpZiAoJHV0aWwuTG9uZylcclxuICAgICAgICAgICAgICAgICAgICAobWVzc2FnZS5LZXkgPSAkdXRpbC5Mb25nLmZyb21WYWx1ZShvYmplY3QuS2V5KSkudW5zaWduZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmplY3QuS2V5ID09PSBcInN0cmluZ1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuS2V5ID0gcGFyc2VJbnQob2JqZWN0LktleSwgMTApO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9iamVjdC5LZXkgPT09IFwibnVtYmVyXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5LZXkgPSBvYmplY3QuS2V5O1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9iamVjdC5LZXkgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5LZXkgPSBuZXcgJHV0aWwuTG9uZ0JpdHMob2JqZWN0LktleS5sb3cgPj4+IDAsIG9iamVjdC5LZXkuaGlnaCA+Pj4gMCkudG9OdW1iZXIoKTtcclxuICAgICAgICAgICAgaWYgKG9iamVjdC5HYXRlSWQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIGlmICgkdXRpbC5Mb25nKVxyXG4gICAgICAgICAgICAgICAgICAgIChtZXNzYWdlLkdhdGVJZCA9ICR1dGlsLkxvbmcuZnJvbVZhbHVlKG9iamVjdC5HYXRlSWQpKS51bnNpZ25lZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9iamVjdC5HYXRlSWQgPT09IFwic3RyaW5nXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5HYXRlSWQgPSBwYXJzZUludChvYmplY3QuR2F0ZUlkLCAxMCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0LkdhdGVJZCA9PT0gXCJudW1iZXJcIilcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLkdhdGVJZCA9IG9iamVjdC5HYXRlSWQ7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0LkdhdGVJZCA9PT0gXCJvYmplY3RcIilcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLkdhdGVJZCA9IG5ldyAkdXRpbC5Mb25nQml0cyhvYmplY3QuR2F0ZUlkLmxvdyA+Pj4gMCwgb2JqZWN0LkdhdGVJZC5oaWdoID4+PiAwKS50b051bWJlcigpO1xyXG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGVzIGEgcGxhaW4gb2JqZWN0IGZyb20gYSBSMkNfTG9naW4gbWVzc2FnZS4gQWxzbyBjb252ZXJ0cyB2YWx1ZXMgdG8gb3RoZXIgdHlwZXMgaWYgc3BlY2lmaWVkLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiB0b09iamVjdFxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLlIyQ19Mb2dpblxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuUjJDX0xvZ2lufSBtZXNzYWdlIFIyQ19Mb2dpblxyXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLklDb252ZXJzaW9uT3B0aW9uc30gW29wdGlvbnNdIENvbnZlcnNpb24gb3B0aW9uc1xyXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gUGxhaW4gb2JqZWN0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgUjJDX0xvZ2luLnRvT2JqZWN0ID0gZnVuY3Rpb24gdG9PYmplY3QobWVzc2FnZSwgb3B0aW9ucykge1xyXG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zID0ge307XHJcbiAgICAgICAgICAgIHZhciBvYmplY3QgPSB7fTtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZGVmYXVsdHMpIHtcclxuICAgICAgICAgICAgICAgIG9iamVjdC5BZGRyZXNzID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGlmICgkdXRpbC5Mb25nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxvbmcgPSBuZXcgJHV0aWwuTG9uZygwLCAwLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LktleSA9IG9wdGlvbnMubG9uZ3MgPT09IFN0cmluZyA/IGxvbmcudG9TdHJpbmcoKSA6IG9wdGlvbnMubG9uZ3MgPT09IE51bWJlciA/IGxvbmcudG9OdW1iZXIoKSA6IGxvbmc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3QuS2V5ID0gb3B0aW9ucy5sb25ncyA9PT0gU3RyaW5nID8gXCIwXCIgOiAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKCR1dGlsLkxvbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbG9uZyA9IG5ldyAkdXRpbC5Mb25nKDAsIDAsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3QuR2F0ZUlkID0gb3B0aW9ucy5sb25ncyA9PT0gU3RyaW5nID8gbG9uZy50b1N0cmluZygpIDogb3B0aW9ucy5sb25ncyA9PT0gTnVtYmVyID8gbG9uZy50b051bWJlcigpIDogbG9uZztcclxuICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC5HYXRlSWQgPSBvcHRpb25zLmxvbmdzID09PSBTdHJpbmcgPyBcIjBcIiA6IDA7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QuRXJyb3IgPSAwO1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0Lk1lc3NhZ2UgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLkFkZHJlc3MgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiQWRkcmVzc1wiKSlcclxuICAgICAgICAgICAgICAgIG9iamVjdC5BZGRyZXNzID0gbWVzc2FnZS5BZGRyZXNzO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5LZXkgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiS2V5XCIpKVxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlLktleSA9PT0gXCJudW1iZXJcIilcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3QuS2V5ID0gb3B0aW9ucy5sb25ncyA9PT0gU3RyaW5nID8gU3RyaW5nKG1lc3NhZ2UuS2V5KSA6IG1lc3NhZ2UuS2V5O1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC5LZXkgPSBvcHRpb25zLmxvbmdzID09PSBTdHJpbmcgPyAkdXRpbC5Mb25nLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG1lc3NhZ2UuS2V5KSA6IG9wdGlvbnMubG9uZ3MgPT09IE51bWJlciA/IG5ldyAkdXRpbC5Mb25nQml0cyhtZXNzYWdlLktleS5sb3cgPj4+IDAsIG1lc3NhZ2UuS2V5LmhpZ2ggPj4+IDApLnRvTnVtYmVyKCkgOiBtZXNzYWdlLktleTtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuR2F0ZUlkICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIkdhdGVJZFwiKSlcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZS5HYXRlSWQgPT09IFwibnVtYmVyXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LkdhdGVJZCA9IG9wdGlvbnMubG9uZ3MgPT09IFN0cmluZyA/IFN0cmluZyhtZXNzYWdlLkdhdGVJZCkgOiBtZXNzYWdlLkdhdGVJZDtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3QuR2F0ZUlkID0gb3B0aW9ucy5sb25ncyA9PT0gU3RyaW5nID8gJHV0aWwuTG9uZy5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChtZXNzYWdlLkdhdGVJZCkgOiBvcHRpb25zLmxvbmdzID09PSBOdW1iZXIgPyBuZXcgJHV0aWwuTG9uZ0JpdHMobWVzc2FnZS5HYXRlSWQubG93ID4+PiAwLCBtZXNzYWdlLkdhdGVJZC5oaWdoID4+PiAwKS50b051bWJlcigpIDogbWVzc2FnZS5HYXRlSWQ7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLkVycm9yICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIkVycm9yXCIpKVxyXG4gICAgICAgICAgICAgICAgb2JqZWN0LkVycm9yID0gbWVzc2FnZS5FcnJvcjtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuTWVzc2FnZSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJNZXNzYWdlXCIpKVxyXG4gICAgICAgICAgICAgICAgb2JqZWN0Lk1lc3NhZ2UgPSBtZXNzYWdlLk1lc3NhZ2U7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ29udmVydHMgdGhpcyBSMkNfTG9naW4gdG8gSlNPTi5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gdG9KU09OXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuUjJDX0xvZ2luXHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBKU09OIG9iamVjdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFIyQ19Mb2dpbi5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci50b09iamVjdCh0aGlzLCAkcHJvdG9idWYudXRpbC50b0pTT05PcHRpb25zKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gUjJDX0xvZ2luO1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICBuaWNlX3RzLkMyR19Mb2dpbkdhdGUgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFByb3BlcnRpZXMgb2YgYSBDMkdfTG9naW5HYXRlLlxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzXHJcbiAgICAgICAgICogQGludGVyZmFjZSBJQzJHX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfExvbmd8bnVsbH0gW0tleV0gQzJHX0xvZ2luR2F0ZSBLZXlcclxuICAgICAgICAgKiBAcHJvcGVydHkge251bWJlcnxMb25nfG51bGx9IFtHYXRlSWRdIEMyR19Mb2dpbkdhdGUgR2F0ZUlkXHJcbiAgICAgICAgICovXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnN0cnVjdHMgYSBuZXcgQzJHX0xvZ2luR2F0ZS5cclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90c1xyXG4gICAgICAgICAqIEBjbGFzc2Rlc2MgUmVwcmVzZW50cyBhIEMyR19Mb2dpbkdhdGUuXHJcbiAgICAgICAgICogQGltcGxlbWVudHMgSUMyR19Mb2dpbkdhdGVcclxuICAgICAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSUMyR19Mb2dpbkdhdGU9fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBDMkdfTG9naW5HYXRlKHByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgaWYgKHByb3BlcnRpZXMpXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXlzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyksIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSlcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllc1trZXlzW2ldXSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2tleXNbaV1dID0gcHJvcGVydGllc1trZXlzW2ldXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEMyR19Mb2dpbkdhdGUgS2V5LlxyXG4gICAgICAgICAqIEBtZW1iZXIge251bWJlcnxMb25nfSBLZXlcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5DMkdfTG9naW5HYXRlXHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJHX0xvZ2luR2F0ZS5wcm90b3R5cGUuS2V5ID0gJHV0aWwuTG9uZyA/ICR1dGlsLkxvbmcuZnJvbUJpdHMoMCwwLGZhbHNlKSA6IDA7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEMyR19Mb2dpbkdhdGUgR2F0ZUlkLlxyXG4gICAgICAgICAqIEBtZW1iZXIge251bWJlcnxMb25nfSBHYXRlSWRcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5DMkdfTG9naW5HYXRlXHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJHX0xvZ2luR2F0ZS5wcm90b3R5cGUuR2F0ZUlkID0gJHV0aWwuTG9uZyA/ICR1dGlsLkxvbmcuZnJvbUJpdHMoMCwwLGZhbHNlKSA6IDA7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENyZWF0ZXMgYSBuZXcgQzJHX0xvZ2luR2F0ZSBpbnN0YW5jZSB1c2luZyB0aGUgc3BlY2lmaWVkIHByb3BlcnRpZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGNyZWF0ZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyR19Mb2dpbkdhdGVcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLklDMkdfTG9naW5HYXRlPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XHJcbiAgICAgICAgICogQHJldHVybnMge25pY2VfdHMuQzJHX0xvZ2luR2F0ZX0gQzJHX0xvZ2luR2F0ZSBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyR19Mb2dpbkdhdGUuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKHByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBDMkdfTG9naW5HYXRlKHByb3BlcnRpZXMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBDMkdfTG9naW5HYXRlIG1lc3NhZ2UuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIG5pY2VfdHMuQzJHX0xvZ2luR2F0ZS52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZW5jb2RlXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJHX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSUMyR19Mb2dpbkdhdGV9IG1lc3NhZ2UgQzJHX0xvZ2luR2F0ZSBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cclxuICAgICAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJHX0xvZ2luR2F0ZS5lbmNvZGUgPSBmdW5jdGlvbiBlbmNvZGUobWVzc2FnZSwgd3JpdGVyKSB7XHJcbiAgICAgICAgICAgIGlmICghd3JpdGVyKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVyID0gJFdyaXRlci5jcmVhdGUoKTtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuS2V5ICE9IG51bGwgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobWVzc2FnZSwgXCJLZXlcIikpXHJcbiAgICAgICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDEsIHdpcmVUeXBlIDAgPSovOCkuaW50NjQobWVzc2FnZS5LZXkpO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5HYXRlSWQgIT0gbnVsbCAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtZXNzYWdlLCBcIkdhdGVJZFwiKSlcclxuICAgICAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMiwgd2lyZVR5cGUgMCA9Ki8xNikuaW50NjQobWVzc2FnZS5HYXRlSWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gd3JpdGVyO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBDMkdfTG9naW5HYXRlIG1lc3NhZ2UsIGxlbmd0aCBkZWxpbWl0ZWQuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIG5pY2VfdHMuQzJHX0xvZ2luR2F0ZS52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJHX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSUMyR19Mb2dpbkdhdGV9IG1lc3NhZ2UgQzJHX0xvZ2luR2F0ZSBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cclxuICAgICAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJHX0xvZ2luR2F0ZS5lbmNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWQobWVzc2FnZSwgd3JpdGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVuY29kZShtZXNzYWdlLCB3cml0ZXIpLmxkZWxpbSgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlY29kZXMgYSBDMkdfTG9naW5HYXRlIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGRlY29kZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyR19Mb2dpbkdhdGVcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGhdIE1lc3NhZ2UgbGVuZ3RoIGlmIGtub3duIGJlZm9yZWhhbmRcclxuICAgICAgICAgKiBAcmV0dXJucyB7bmljZV90cy5DMkdfTG9naW5HYXRlfSBDMkdfTG9naW5HYXRlXHJcbiAgICAgICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcclxuICAgICAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcclxuICAgICAgICAgKi9cclxuICAgICAgICBDMkdfTG9naW5HYXRlLmRlY29kZSA9IGZ1bmN0aW9uIGRlY29kZShyZWFkZXIsIGxlbmd0aCkge1xyXG4gICAgICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcclxuICAgICAgICAgICAgICAgIHJlYWRlciA9ICRSZWFkZXIuY3JlYXRlKHJlYWRlcik7XHJcbiAgICAgICAgICAgIHZhciBlbmQgPSBsZW5ndGggPT09IHVuZGVmaW5lZCA/IHJlYWRlci5sZW4gOiByZWFkZXIucG9zICsgbGVuZ3RoLCBtZXNzYWdlID0gbmV3ICRyb290Lm5pY2VfdHMuQzJHX0xvZ2luR2F0ZSgpO1xyXG4gICAgICAgICAgICB3aGlsZSAocmVhZGVyLnBvcyA8IGVuZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRhZyA9IHJlYWRlci51aW50MzIoKTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodGFnID4+PiAzKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5LZXkgPSByZWFkZXIuaW50NjQoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLkdhdGVJZCA9IHJlYWRlci5pbnQ2NCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICByZWFkZXIuc2tpcFR5cGUodGFnICYgNyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGVjb2RlcyBhIEMyR19Mb2dpbkdhdGUgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlciwgbGVuZ3RoIGRlbGltaXRlZC5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJHX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5SZWFkZXJ8VWludDhBcnJheX0gcmVhZGVyIFJlYWRlciBvciBidWZmZXIgdG8gZGVjb2RlIGZyb21cclxuICAgICAgICAgKiBAcmV0dXJucyB7bmljZV90cy5DMkdfTG9naW5HYXRlfSBDMkdfTG9naW5HYXRlXHJcbiAgICAgICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcclxuICAgICAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcclxuICAgICAgICAgKi9cclxuICAgICAgICBDMkdfTG9naW5HYXRlLmRlY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZChyZWFkZXIpIHtcclxuICAgICAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXHJcbiAgICAgICAgICAgICAgICByZWFkZXIgPSBuZXcgJFJlYWRlcihyZWFkZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZWNvZGUocmVhZGVyLCByZWFkZXIudWludDMyKCkpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZlcmlmaWVzIGEgQzJHX0xvZ2luR2F0ZSBtZXNzYWdlLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiB2ZXJpZnlcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5DMkdfTG9naW5HYXRlXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG1lc3NhZ2UgUGxhaW4gb2JqZWN0IHRvIHZlcmlmeVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH0gYG51bGxgIGlmIHZhbGlkLCBvdGhlcndpc2UgdGhlIHJlYXNvbiB3aHkgaXQgaXMgbm90XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJHX0xvZ2luR2F0ZS52ZXJpZnkgPSBmdW5jdGlvbiB2ZXJpZnkobWVzc2FnZSkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgIT09IFwib2JqZWN0XCIgfHwgbWVzc2FnZSA9PT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIm9iamVjdCBleHBlY3RlZFwiO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5LZXkgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiS2V5XCIpKVxyXG4gICAgICAgICAgICAgICAgaWYgKCEkdXRpbC5pc0ludGVnZXIobWVzc2FnZS5LZXkpICYmICEobWVzc2FnZS5LZXkgJiYgJHV0aWwuaXNJbnRlZ2VyKG1lc3NhZ2UuS2V5LmxvdykgJiYgJHV0aWwuaXNJbnRlZ2VyKG1lc3NhZ2UuS2V5LmhpZ2gpKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJLZXk6IGludGVnZXJ8TG9uZyBleHBlY3RlZFwiO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5HYXRlSWQgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiR2F0ZUlkXCIpKVxyXG4gICAgICAgICAgICAgICAgaWYgKCEkdXRpbC5pc0ludGVnZXIobWVzc2FnZS5HYXRlSWQpICYmICEobWVzc2FnZS5HYXRlSWQgJiYgJHV0aWwuaXNJbnRlZ2VyKG1lc3NhZ2UuR2F0ZUlkLmxvdykgJiYgJHV0aWwuaXNJbnRlZ2VyKG1lc3NhZ2UuR2F0ZUlkLmhpZ2gpKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJHYXRlSWQ6IGludGVnZXJ8TG9uZyBleHBlY3RlZFwiO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGVzIGEgQzJHX0xvZ2luR2F0ZSBtZXNzYWdlIGZyb20gYSBwbGFpbiBvYmplY3QuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIHRoZWlyIHJlc3BlY3RpdmUgaW50ZXJuYWwgdHlwZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGZyb21PYmplY3RcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5DMkdfTG9naW5HYXRlXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG9iamVjdCBQbGFpbiBvYmplY3RcclxuICAgICAgICAgKiBAcmV0dXJucyB7bmljZV90cy5DMkdfTG9naW5HYXRlfSBDMkdfTG9naW5HYXRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJHX0xvZ2luR2F0ZS5mcm9tT2JqZWN0ID0gZnVuY3Rpb24gZnJvbU9iamVjdChvYmplY3QpIHtcclxuICAgICAgICAgICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mICRyb290Lm5pY2VfdHMuQzJHX0xvZ2luR2F0ZSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gbmV3ICRyb290Lm5pY2VfdHMuQzJHX0xvZ2luR2F0ZSgpO1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0LktleSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgaWYgKCR1dGlsLkxvbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgKG1lc3NhZ2UuS2V5ID0gJHV0aWwuTG9uZy5mcm9tVmFsdWUob2JqZWN0LktleSkpLnVuc2lnbmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0LktleSA9PT0gXCJzdHJpbmdcIilcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLktleSA9IHBhcnNlSW50KG9iamVjdC5LZXksIDEwKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmplY3QuS2V5ID09PSBcIm51bWJlclwiKVxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuS2V5ID0gb2JqZWN0LktleTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmplY3QuS2V5ID09PSBcIm9iamVjdFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuS2V5ID0gbmV3ICR1dGlsLkxvbmdCaXRzKG9iamVjdC5LZXkubG93ID4+PiAwLCBvYmplY3QuS2V5LmhpZ2ggPj4+IDApLnRvTnVtYmVyKCk7XHJcbiAgICAgICAgICAgIGlmIChvYmplY3QuR2F0ZUlkICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBpZiAoJHV0aWwuTG9uZylcclxuICAgICAgICAgICAgICAgICAgICAobWVzc2FnZS5HYXRlSWQgPSAkdXRpbC5Mb25nLmZyb21WYWx1ZShvYmplY3QuR2F0ZUlkKSkudW5zaWduZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmplY3QuR2F0ZUlkID09PSBcInN0cmluZ1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuR2F0ZUlkID0gcGFyc2VJbnQob2JqZWN0LkdhdGVJZCwgMTApO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9iamVjdC5HYXRlSWQgPT09IFwibnVtYmVyXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5HYXRlSWQgPSBvYmplY3QuR2F0ZUlkO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9iamVjdC5HYXRlSWQgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5HYXRlSWQgPSBuZXcgJHV0aWwuTG9uZ0JpdHMob2JqZWN0LkdhdGVJZC5sb3cgPj4+IDAsIG9iamVjdC5HYXRlSWQuaGlnaCA+Pj4gMCkudG9OdW1iZXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlcyBhIHBsYWluIG9iamVjdCBmcm9tIGEgQzJHX0xvZ2luR2F0ZSBtZXNzYWdlLiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byBvdGhlciB0eXBlcyBpZiBzcGVjaWZpZWQuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIHRvT2JqZWN0XHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJHX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuQzJHX0xvZ2luR2F0ZX0gbWVzc2FnZSBDMkdfTG9naW5HYXRlXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuSUNvbnZlcnNpb25PcHRpb25zfSBbb3B0aW9uc10gQ29udmVyc2lvbiBvcHRpb25zXHJcbiAgICAgICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBQbGFpbiBvYmplY3RcclxuICAgICAgICAgKi9cclxuICAgICAgICBDMkdfTG9naW5HYXRlLnRvT2JqZWN0ID0gZnVuY3Rpb24gdG9PYmplY3QobWVzc2FnZSwgb3B0aW9ucykge1xyXG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zID0ge307XHJcbiAgICAgICAgICAgIHZhciBvYmplY3QgPSB7fTtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZGVmYXVsdHMpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkdXRpbC5Mb25nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxvbmcgPSBuZXcgJHV0aWwuTG9uZygwLCAwLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LktleSA9IG9wdGlvbnMubG9uZ3MgPT09IFN0cmluZyA/IGxvbmcudG9TdHJpbmcoKSA6IG9wdGlvbnMubG9uZ3MgPT09IE51bWJlciA/IGxvbmcudG9OdW1iZXIoKSA6IGxvbmc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3QuS2V5ID0gb3B0aW9ucy5sb25ncyA9PT0gU3RyaW5nID8gXCIwXCIgOiAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKCR1dGlsLkxvbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbG9uZyA9IG5ldyAkdXRpbC5Mb25nKDAsIDAsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3QuR2F0ZUlkID0gb3B0aW9ucy5sb25ncyA9PT0gU3RyaW5nID8gbG9uZy50b1N0cmluZygpIDogb3B0aW9ucy5sb25ncyA9PT0gTnVtYmVyID8gbG9uZy50b051bWJlcigpIDogbG9uZztcclxuICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC5HYXRlSWQgPSBvcHRpb25zLmxvbmdzID09PSBTdHJpbmcgPyBcIjBcIiA6IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuS2V5ICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIktleVwiKSlcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZS5LZXkgPT09IFwibnVtYmVyXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LktleSA9IG9wdGlvbnMubG9uZ3MgPT09IFN0cmluZyA/IFN0cmluZyhtZXNzYWdlLktleSkgOiBtZXNzYWdlLktleTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3QuS2V5ID0gb3B0aW9ucy5sb25ncyA9PT0gU3RyaW5nID8gJHV0aWwuTG9uZy5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChtZXNzYWdlLktleSkgOiBvcHRpb25zLmxvbmdzID09PSBOdW1iZXIgPyBuZXcgJHV0aWwuTG9uZ0JpdHMobWVzc2FnZS5LZXkubG93ID4+PiAwLCBtZXNzYWdlLktleS5oaWdoID4+PiAwKS50b051bWJlcigpIDogbWVzc2FnZS5LZXk7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLkdhdGVJZCAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJHYXRlSWRcIikpXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UuR2F0ZUlkID09PSBcIm51bWJlclwiKVxyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC5HYXRlSWQgPSBvcHRpb25zLmxvbmdzID09PSBTdHJpbmcgPyBTdHJpbmcobWVzc2FnZS5HYXRlSWQpIDogbWVzc2FnZS5HYXRlSWQ7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LkdhdGVJZCA9IG9wdGlvbnMubG9uZ3MgPT09IFN0cmluZyA/ICR1dGlsLkxvbmcucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobWVzc2FnZS5HYXRlSWQpIDogb3B0aW9ucy5sb25ncyA9PT0gTnVtYmVyID8gbmV3ICR1dGlsLkxvbmdCaXRzKG1lc3NhZ2UuR2F0ZUlkLmxvdyA+Pj4gMCwgbWVzc2FnZS5HYXRlSWQuaGlnaCA+Pj4gMCkudG9OdW1iZXIoKSA6IG1lc3NhZ2UuR2F0ZUlkO1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnZlcnRzIHRoaXMgQzJHX0xvZ2luR2F0ZSB0byBKU09OLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiB0b0pTT05cclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5DMkdfTG9naW5HYXRlXHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBKU09OIG9iamVjdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyR19Mb2dpbkdhdGUucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IudG9PYmplY3QodGhpcywgJHByb3RvYnVmLnV0aWwudG9KU09OT3B0aW9ucyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIEMyR19Mb2dpbkdhdGU7XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIG5pY2VfdHMuRzJDX0xvZ2luR2F0ZSA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJvcGVydGllcyBvZiBhIEcyQ19Mb2dpbkdhdGUuXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHNcclxuICAgICAgICAgKiBAaW50ZXJmYWNlIElHMkNfTG9naW5HYXRlXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ8bnVsbH0gW0Vycm9yXSBHMkNfTG9naW5HYXRlIEVycm9yXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtzdHJpbmd8bnVsbH0gW01lc3NhZ2VdIEcyQ19Mb2dpbkdhdGUgTWVzc2FnZVxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfExvbmd8bnVsbH0gW1BsYXllcklkXSBHMkNfTG9naW5HYXRlIFBsYXllcklkXHJcbiAgICAgICAgICovXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnN0cnVjdHMgYSBuZXcgRzJDX0xvZ2luR2F0ZS5cclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90c1xyXG4gICAgICAgICAqIEBjbGFzc2Rlc2MgUmVwcmVzZW50cyBhIEcyQ19Mb2dpbkdhdGUuXHJcbiAgICAgICAgICogQGltcGxlbWVudHMgSUcyQ19Mb2dpbkdhdGVcclxuICAgICAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSUcyQ19Mb2dpbkdhdGU9fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBHMkNfTG9naW5HYXRlKHByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgaWYgKHByb3BlcnRpZXMpXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXlzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyksIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSlcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllc1trZXlzW2ldXSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2tleXNbaV1dID0gcHJvcGVydGllc1trZXlzW2ldXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEcyQ19Mb2dpbkdhdGUgRXJyb3IuXHJcbiAgICAgICAgICogQG1lbWJlciB7bnVtYmVyfSBFcnJvclxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkcyQ19Mb2dpbkdhdGVcclxuICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBHMkNfTG9naW5HYXRlLnByb3RvdHlwZS5FcnJvciA9IDA7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEcyQ19Mb2dpbkdhdGUgTWVzc2FnZS5cclxuICAgICAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IE1lc3NhZ2VcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5HMkNfTG9naW5HYXRlXHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRzJDX0xvZ2luR2F0ZS5wcm90b3R5cGUuTWVzc2FnZSA9IFwiXCI7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEcyQ19Mb2dpbkdhdGUgUGxheWVySWQuXHJcbiAgICAgICAgICogQG1lbWJlciB7bnVtYmVyfExvbmd9IFBsYXllcklkXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuRzJDX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEcyQ19Mb2dpbkdhdGUucHJvdG90eXBlLlBsYXllcklkID0gJHV0aWwuTG9uZyA/ICR1dGlsLkxvbmcuZnJvbUJpdHMoMCwwLGZhbHNlKSA6IDA7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENyZWF0ZXMgYSBuZXcgRzJDX0xvZ2luR2F0ZSBpbnN0YW5jZSB1c2luZyB0aGUgc3BlY2lmaWVkIHByb3BlcnRpZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGNyZWF0ZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkcyQ19Mb2dpbkdhdGVcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLklHMkNfTG9naW5HYXRlPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XHJcbiAgICAgICAgICogQHJldHVybnMge25pY2VfdHMuRzJDX0xvZ2luR2F0ZX0gRzJDX0xvZ2luR2F0ZSBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEcyQ19Mb2dpbkdhdGUuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKHByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHMkNfTG9naW5HYXRlKHByb3BlcnRpZXMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBHMkNfTG9naW5HYXRlIG1lc3NhZ2UuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIG5pY2VfdHMuRzJDX0xvZ2luR2F0ZS52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZW5jb2RlXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuRzJDX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSUcyQ19Mb2dpbkdhdGV9IG1lc3NhZ2UgRzJDX0xvZ2luR2F0ZSBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cclxuICAgICAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRzJDX0xvZ2luR2F0ZS5lbmNvZGUgPSBmdW5jdGlvbiBlbmNvZGUobWVzc2FnZSwgd3JpdGVyKSB7XHJcbiAgICAgICAgICAgIGlmICghd3JpdGVyKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVyID0gJFdyaXRlci5jcmVhdGUoKTtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuUGxheWVySWQgIT0gbnVsbCAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtZXNzYWdlLCBcIlBsYXllcklkXCIpKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAxLCB3aXJlVHlwZSAwID0qLzgpLmludDY0KG1lc3NhZ2UuUGxheWVySWQpO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5FcnJvciAhPSBudWxsICYmIE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1lc3NhZ2UsIFwiRXJyb3JcIikpXHJcbiAgICAgICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDkxLCB3aXJlVHlwZSAwID0qLzcyOCkuaW50MzIobWVzc2FnZS5FcnJvcik7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLk1lc3NhZ2UgIT0gbnVsbCAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtZXNzYWdlLCBcIk1lc3NhZ2VcIikpXHJcbiAgICAgICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDkyLCB3aXJlVHlwZSAyID0qLzczOCkuc3RyaW5nKG1lc3NhZ2UuTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB3cml0ZXI7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIEcyQ19Mb2dpbkdhdGUgbWVzc2FnZSwgbGVuZ3RoIGRlbGltaXRlZC4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgbmljZV90cy5HMkNfTG9naW5HYXRlLnZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWRcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5HMkNfTG9naW5HYXRlXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7bmljZV90cy5JRzJDX0xvZ2luR2F0ZX0gbWVzc2FnZSBHMkNfTG9naW5HYXRlIG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxyXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xyXG4gICAgICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBHMkNfTG9naW5HYXRlLmVuY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZChtZXNzYWdlLCB3cml0ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikubGRlbGltKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGVjb2RlcyBhIEcyQ19Mb2dpbkdhdGUgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlci5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZGVjb2RlXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuRzJDX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5SZWFkZXJ8VWludDhBcnJheX0gcmVhZGVyIFJlYWRlciBvciBidWZmZXIgdG8gZGVjb2RlIGZyb21cclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aF0gTWVzc2FnZSBsZW5ndGggaWYga25vd24gYmVmb3JlaGFuZFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuaWNlX3RzLkcyQ19Mb2dpbkdhdGV9IEcyQ19Mb2dpbkdhdGVcclxuICAgICAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxyXG4gICAgICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEcyQ19Mb2dpbkdhdGUuZGVjb2RlID0gZnVuY3Rpb24gZGVjb2RlKHJlYWRlciwgbGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxyXG4gICAgICAgICAgICAgICAgcmVhZGVyID0gJFJlYWRlci5jcmVhdGUocmVhZGVyKTtcclxuICAgICAgICAgICAgdmFyIGVuZCA9IGxlbmd0aCA9PT0gdW5kZWZpbmVkID8gcmVhZGVyLmxlbiA6IHJlYWRlci5wb3MgKyBsZW5ndGgsIG1lc3NhZ2UgPSBuZXcgJHJvb3QubmljZV90cy5HMkNfTG9naW5HYXRlKCk7XHJcbiAgICAgICAgICAgIHdoaWxlIChyZWFkZXIucG9zIDwgZW5kKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGFnID0gcmVhZGVyLnVpbnQzMigpO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0YWcgPj4+IDMpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgOTE6XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5FcnJvciA9IHJlYWRlci5pbnQzMigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA5MjpcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLk1lc3NhZ2UgPSByZWFkZXIuc3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5QbGF5ZXJJZCA9IHJlYWRlci5pbnQ2NCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICByZWFkZXIuc2tpcFR5cGUodGFnICYgNyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGVjb2RlcyBhIEcyQ19Mb2dpbkdhdGUgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlciwgbGVuZ3RoIGRlbGltaXRlZC5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuRzJDX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5SZWFkZXJ8VWludDhBcnJheX0gcmVhZGVyIFJlYWRlciBvciBidWZmZXIgdG8gZGVjb2RlIGZyb21cclxuICAgICAgICAgKiBAcmV0dXJucyB7bmljZV90cy5HMkNfTG9naW5HYXRlfSBHMkNfTG9naW5HYXRlXHJcbiAgICAgICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcclxuICAgICAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcclxuICAgICAgICAgKi9cclxuICAgICAgICBHMkNfTG9naW5HYXRlLmRlY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZChyZWFkZXIpIHtcclxuICAgICAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXHJcbiAgICAgICAgICAgICAgICByZWFkZXIgPSBuZXcgJFJlYWRlcihyZWFkZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZWNvZGUocmVhZGVyLCByZWFkZXIudWludDMyKCkpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZlcmlmaWVzIGEgRzJDX0xvZ2luR2F0ZSBtZXNzYWdlLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiB2ZXJpZnlcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5HMkNfTG9naW5HYXRlXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG1lc3NhZ2UgUGxhaW4gb2JqZWN0IHRvIHZlcmlmeVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH0gYG51bGxgIGlmIHZhbGlkLCBvdGhlcndpc2UgdGhlIHJlYXNvbiB3aHkgaXQgaXMgbm90XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRzJDX0xvZ2luR2F0ZS52ZXJpZnkgPSBmdW5jdGlvbiB2ZXJpZnkobWVzc2FnZSkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgIT09IFwib2JqZWN0XCIgfHwgbWVzc2FnZSA9PT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIm9iamVjdCBleHBlY3RlZFwiO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5FcnJvciAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJFcnJvclwiKSlcclxuICAgICAgICAgICAgICAgIGlmICghJHV0aWwuaXNJbnRlZ2VyKG1lc3NhZ2UuRXJyb3IpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIkVycm9yOiBpbnRlZ2VyIGV4cGVjdGVkXCI7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLk1lc3NhZ2UgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiTWVzc2FnZVwiKSlcclxuICAgICAgICAgICAgICAgIGlmICghJHV0aWwuaXNTdHJpbmcobWVzc2FnZS5NZXNzYWdlKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJNZXNzYWdlOiBzdHJpbmcgZXhwZWN0ZWRcIjtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuUGxheWVySWQgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiUGxheWVySWRcIikpXHJcbiAgICAgICAgICAgICAgICBpZiAoISR1dGlsLmlzSW50ZWdlcihtZXNzYWdlLlBsYXllcklkKSAmJiAhKG1lc3NhZ2UuUGxheWVySWQgJiYgJHV0aWwuaXNJbnRlZ2VyKG1lc3NhZ2UuUGxheWVySWQubG93KSAmJiAkdXRpbC5pc0ludGVnZXIobWVzc2FnZS5QbGF5ZXJJZC5oaWdoKSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiUGxheWVySWQ6IGludGVnZXJ8TG9uZyBleHBlY3RlZFwiO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGVzIGEgRzJDX0xvZ2luR2F0ZSBtZXNzYWdlIGZyb20gYSBwbGFpbiBvYmplY3QuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIHRoZWlyIHJlc3BlY3RpdmUgaW50ZXJuYWwgdHlwZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGZyb21PYmplY3RcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5HMkNfTG9naW5HYXRlXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG9iamVjdCBQbGFpbiBvYmplY3RcclxuICAgICAgICAgKiBAcmV0dXJucyB7bmljZV90cy5HMkNfTG9naW5HYXRlfSBHMkNfTG9naW5HYXRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRzJDX0xvZ2luR2F0ZS5mcm9tT2JqZWN0ID0gZnVuY3Rpb24gZnJvbU9iamVjdChvYmplY3QpIHtcclxuICAgICAgICAgICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mICRyb290Lm5pY2VfdHMuRzJDX0xvZ2luR2F0ZSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gbmV3ICRyb290Lm5pY2VfdHMuRzJDX0xvZ2luR2F0ZSgpO1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0LkVycm9yICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLkVycm9yID0gb2JqZWN0LkVycm9yIHwgMDtcclxuICAgICAgICAgICAgaWYgKG9iamVjdC5NZXNzYWdlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLk1lc3NhZ2UgPSBTdHJpbmcob2JqZWN0Lk1lc3NhZ2UpO1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0LlBsYXllcklkICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBpZiAoJHV0aWwuTG9uZylcclxuICAgICAgICAgICAgICAgICAgICAobWVzc2FnZS5QbGF5ZXJJZCA9ICR1dGlsLkxvbmcuZnJvbVZhbHVlKG9iamVjdC5QbGF5ZXJJZCkpLnVuc2lnbmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0LlBsYXllcklkID09PSBcInN0cmluZ1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuUGxheWVySWQgPSBwYXJzZUludChvYmplY3QuUGxheWVySWQsIDEwKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmplY3QuUGxheWVySWQgPT09IFwibnVtYmVyXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5QbGF5ZXJJZCA9IG9iamVjdC5QbGF5ZXJJZDtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmplY3QuUGxheWVySWQgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5QbGF5ZXJJZCA9IG5ldyAkdXRpbC5Mb25nQml0cyhvYmplY3QuUGxheWVySWQubG93ID4+PiAwLCBvYmplY3QuUGxheWVySWQuaGlnaCA+Pj4gMCkudG9OdW1iZXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlcyBhIHBsYWluIG9iamVjdCBmcm9tIGEgRzJDX0xvZ2luR2F0ZSBtZXNzYWdlLiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byBvdGhlciB0eXBlcyBpZiBzcGVjaWZpZWQuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIHRvT2JqZWN0XHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuRzJDX0xvZ2luR2F0ZVxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuRzJDX0xvZ2luR2F0ZX0gbWVzc2FnZSBHMkNfTG9naW5HYXRlXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuSUNvbnZlcnNpb25PcHRpb25zfSBbb3B0aW9uc10gQ29udmVyc2lvbiBvcHRpb25zXHJcbiAgICAgICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBQbGFpbiBvYmplY3RcclxuICAgICAgICAgKi9cclxuICAgICAgICBHMkNfTG9naW5HYXRlLnRvT2JqZWN0ID0gZnVuY3Rpb24gdG9PYmplY3QobWVzc2FnZSwgb3B0aW9ucykge1xyXG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zID0ge307XHJcbiAgICAgICAgICAgIHZhciBvYmplY3QgPSB7fTtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZGVmYXVsdHMpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkdXRpbC5Mb25nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxvbmcgPSBuZXcgJHV0aWwuTG9uZygwLCAwLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LlBsYXllcklkID0gb3B0aW9ucy5sb25ncyA9PT0gU3RyaW5nID8gbG9uZy50b1N0cmluZygpIDogb3B0aW9ucy5sb25ncyA9PT0gTnVtYmVyID8gbG9uZy50b051bWJlcigpIDogbG9uZztcclxuICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC5QbGF5ZXJJZCA9IG9wdGlvbnMubG9uZ3MgPT09IFN0cmluZyA/IFwiMFwiIDogMDtcclxuICAgICAgICAgICAgICAgIG9iamVjdC5FcnJvciA9IDA7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QuTWVzc2FnZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuUGxheWVySWQgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiUGxheWVySWRcIikpXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UuUGxheWVySWQgPT09IFwibnVtYmVyXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LlBsYXllcklkID0gb3B0aW9ucy5sb25ncyA9PT0gU3RyaW5nID8gU3RyaW5nKG1lc3NhZ2UuUGxheWVySWQpIDogbWVzc2FnZS5QbGF5ZXJJZDtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3QuUGxheWVySWQgPSBvcHRpb25zLmxvbmdzID09PSBTdHJpbmcgPyAkdXRpbC5Mb25nLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG1lc3NhZ2UuUGxheWVySWQpIDogb3B0aW9ucy5sb25ncyA9PT0gTnVtYmVyID8gbmV3ICR1dGlsLkxvbmdCaXRzKG1lc3NhZ2UuUGxheWVySWQubG93ID4+PiAwLCBtZXNzYWdlLlBsYXllcklkLmhpZ2ggPj4+IDApLnRvTnVtYmVyKCkgOiBtZXNzYWdlLlBsYXllcklkO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5FcnJvciAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJFcnJvclwiKSlcclxuICAgICAgICAgICAgICAgIG9iamVjdC5FcnJvciA9IG1lc3NhZ2UuRXJyb3I7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLk1lc3NhZ2UgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiTWVzc2FnZVwiKSlcclxuICAgICAgICAgICAgICAgIG9iamVjdC5NZXNzYWdlID0gbWVzc2FnZS5NZXNzYWdlO1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnZlcnRzIHRoaXMgRzJDX0xvZ2luR2F0ZSB0byBKU09OLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiB0b0pTT05cclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5HMkNfTG9naW5HYXRlXHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBKU09OIG9iamVjdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEcyQ19Mb2dpbkdhdGUucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IudG9PYmplY3QodGhpcywgJHByb3RvYnVmLnV0aWwudG9KU09OT3B0aW9ucyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIEcyQ19Mb2dpbkdhdGU7XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIG5pY2VfdHMuQzJHU19UZXN0ID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQcm9wZXJ0aWVzIG9mIGEgQzJHU19UZXN0LlxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzXHJcbiAgICAgICAgICogQGludGVyZmFjZSBJQzJHU19UZXN0XHJcbiAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ8bnVsbH0gW3Rlc3RJRF0gQzJHU19UZXN0IHRlc3RJRFxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfG51bGx9IFt0ZXN0TmFtZV0gQzJHU19UZXN0IHRlc3ROYW1lXHJcbiAgICAgICAgICovXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnN0cnVjdHMgYSBuZXcgQzJHU19UZXN0LlxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzXHJcbiAgICAgICAgICogQGNsYXNzZGVzYyBSZXByZXNlbnRzIGEgQzJHU19UZXN0LlxyXG4gICAgICAgICAqIEBpbXBsZW1lbnRzIElDMkdTX1Rlc3RcclxuICAgICAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSUMyR1NfVGVzdD19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIEMyR1NfVGVzdChwcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzKVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXNba2V5c1tpXV0gIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1trZXlzW2ldXSA9IHByb3BlcnRpZXNba2V5c1tpXV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDMkdTX1Rlc3QgdGVzdElELlxyXG4gICAgICAgICAqIEBtZW1iZXIge251bWJlcn0gdGVzdElEXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJHU19UZXN0XHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJHU19UZXN0LnByb3RvdHlwZS50ZXN0SUQgPSAwO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDMkdTX1Rlc3QgdGVzdE5hbWUuXHJcbiAgICAgICAgICogQG1lbWJlciB7c3RyaW5nfSB0ZXN0TmFtZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyR1NfVGVzdFxyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyR1NfVGVzdC5wcm90b3R5cGUudGVzdE5hbWUgPSBcIlwiO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGVzIGEgbmV3IEMyR1NfVGVzdCBpbnN0YW5jZSB1c2luZyB0aGUgc3BlY2lmaWVkIHByb3BlcnRpZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGNyZWF0ZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyR1NfVGVzdFxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSUMyR1NfVGVzdD19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuaWNlX3RzLkMyR1NfVGVzdH0gQzJHU19UZXN0IGluc3RhbmNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJHU19UZXN0LmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShwcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQzJHU19UZXN0KHByb3BlcnRpZXMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBDMkdTX1Rlc3QgbWVzc2FnZS4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgbmljZV90cy5DMkdTX1Rlc3QudmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGVuY29kZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyR1NfVGVzdFxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSUMyR1NfVGVzdH0gbWVzc2FnZSBDMkdTX1Rlc3QgbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXHJcbiAgICAgICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyR1NfVGVzdC5lbmNvZGUgPSBmdW5jdGlvbiBlbmNvZGUobWVzc2FnZSwgd3JpdGVyKSB7XHJcbiAgICAgICAgICAgIGlmICghd3JpdGVyKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVyID0gJFdyaXRlci5jcmVhdGUoKTtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UudGVzdElEICE9IG51bGwgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobWVzc2FnZSwgXCJ0ZXN0SURcIikpXHJcbiAgICAgICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDEsIHdpcmVUeXBlIDAgPSovOCkuaW50MzIobWVzc2FnZS50ZXN0SUQpO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS50ZXN0TmFtZSAhPSBudWxsICYmIE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1lc3NhZ2UsIFwidGVzdE5hbWVcIikpXHJcbiAgICAgICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDIsIHdpcmVUeXBlIDIgPSovMTgpLnN0cmluZyhtZXNzYWdlLnRlc3ROYW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuIHdyaXRlcjtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgQzJHU19UZXN0IG1lc3NhZ2UsIGxlbmd0aCBkZWxpbWl0ZWQuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIG5pY2VfdHMuQzJHU19UZXN0LnZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWRcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5DMkdTX1Rlc3RcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLklDMkdTX1Rlc3R9IG1lc3NhZ2UgQzJHU19UZXN0IG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxyXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xyXG4gICAgICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBDMkdTX1Rlc3QuZW5jb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkKG1lc3NhZ2UsIHdyaXRlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbmNvZGUobWVzc2FnZSwgd3JpdGVyKS5sZGVsaW0oKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWNvZGVzIGEgQzJHU19UZXN0IG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGRlY29kZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyR1NfVGVzdFxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5SZWFkZXJ8VWludDhBcnJheX0gcmVhZGVyIFJlYWRlciBvciBidWZmZXIgdG8gZGVjb2RlIGZyb21cclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aF0gTWVzc2FnZSBsZW5ndGggaWYga25vd24gYmVmb3JlaGFuZFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuaWNlX3RzLkMyR1NfVGVzdH0gQzJHU19UZXN0XHJcbiAgICAgICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcclxuICAgICAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcclxuICAgICAgICAgKi9cclxuICAgICAgICBDMkdTX1Rlc3QuZGVjb2RlID0gZnVuY3Rpb24gZGVjb2RlKHJlYWRlciwgbGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxyXG4gICAgICAgICAgICAgICAgcmVhZGVyID0gJFJlYWRlci5jcmVhdGUocmVhZGVyKTtcclxuICAgICAgICAgICAgdmFyIGVuZCA9IGxlbmd0aCA9PT0gdW5kZWZpbmVkID8gcmVhZGVyLmxlbiA6IHJlYWRlci5wb3MgKyBsZW5ndGgsIG1lc3NhZ2UgPSBuZXcgJHJvb3QubmljZV90cy5DMkdTX1Rlc3QoKTtcclxuICAgICAgICAgICAgd2hpbGUgKHJlYWRlci5wb3MgPCBlbmQpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0YWcgPSByZWFkZXIudWludDMyKCk7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRhZyA+Pj4gMykge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UudGVzdElEID0gcmVhZGVyLmludDMyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS50ZXN0TmFtZSA9IHJlYWRlci5zdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyLnNraXBUeXBlKHRhZyAmIDcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlY29kZXMgYSBDMkdTX1Rlc3QgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlciwgbGVuZ3RoIGRlbGltaXRlZC5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJHU19UZXN0XHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuaWNlX3RzLkMyR1NfVGVzdH0gQzJHU19UZXN0XHJcbiAgICAgICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcclxuICAgICAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcclxuICAgICAgICAgKi9cclxuICAgICAgICBDMkdTX1Rlc3QuZGVjb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkKHJlYWRlcikge1xyXG4gICAgICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcclxuICAgICAgICAgICAgICAgIHJlYWRlciA9IG5ldyAkUmVhZGVyKHJlYWRlcik7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlY29kZShyZWFkZXIsIHJlYWRlci51aW50MzIoKSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVmVyaWZpZXMgYSBDMkdTX1Rlc3QgbWVzc2FnZS5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gdmVyaWZ5XHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJHU19UZXN0XHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG1lc3NhZ2UgUGxhaW4gb2JqZWN0IHRvIHZlcmlmeVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH0gYG51bGxgIGlmIHZhbGlkLCBvdGhlcndpc2UgdGhlIHJlYXNvbiB3aHkgaXQgaXMgbm90XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQzJHU19UZXN0LnZlcmlmeSA9IGZ1bmN0aW9uIHZlcmlmeShtZXNzYWdlKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSAhPT0gXCJvYmplY3RcIiB8fCBtZXNzYWdlID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwib2JqZWN0IGV4cGVjdGVkXCI7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLnRlc3RJRCAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJ0ZXN0SURcIikpXHJcbiAgICAgICAgICAgICAgICBpZiAoISR1dGlsLmlzSW50ZWdlcihtZXNzYWdlLnRlc3RJRCkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidGVzdElEOiBpbnRlZ2VyIGV4cGVjdGVkXCI7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLnRlc3ROYW1lICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInRlc3ROYW1lXCIpKVxyXG4gICAgICAgICAgICAgICAgaWYgKCEkdXRpbC5pc1N0cmluZyhtZXNzYWdlLnRlc3ROYW1lKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJ0ZXN0TmFtZTogc3RyaW5nIGV4cGVjdGVkXCI7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENyZWF0ZXMgYSBDMkdTX1Rlc3QgbWVzc2FnZSBmcm9tIGEgcGxhaW4gb2JqZWN0LiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byB0aGVpciByZXNwZWN0aXZlIGludGVybmFsIHR5cGVzLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBmcm9tT2JqZWN0XHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuQzJHU19UZXN0XHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG9iamVjdCBQbGFpbiBvYmplY3RcclxuICAgICAgICAgKiBAcmV0dXJucyB7bmljZV90cy5DMkdTX1Rlc3R9IEMyR1NfVGVzdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyR1NfVGVzdC5mcm9tT2JqZWN0ID0gZnVuY3Rpb24gZnJvbU9iamVjdChvYmplY3QpIHtcclxuICAgICAgICAgICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mICRyb290Lm5pY2VfdHMuQzJHU19UZXN0KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBuZXcgJHJvb3QubmljZV90cy5DMkdTX1Rlc3QoKTtcclxuICAgICAgICAgICAgaWYgKG9iamVjdC50ZXN0SUQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UudGVzdElEID0gb2JqZWN0LnRlc3RJRCB8IDA7XHJcbiAgICAgICAgICAgIGlmIChvYmplY3QudGVzdE5hbWUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UudGVzdE5hbWUgPSBTdHJpbmcob2JqZWN0LnRlc3ROYW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlcyBhIHBsYWluIG9iamVjdCBmcm9tIGEgQzJHU19UZXN0IG1lc3NhZ2UuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIG90aGVyIHR5cGVzIGlmIHNwZWNpZmllZC5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gdG9PYmplY3RcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5DMkdTX1Rlc3RcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLkMyR1NfVGVzdH0gbWVzc2FnZSBDMkdTX1Rlc3RcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5JQ29udmVyc2lvbk9wdGlvbnN9IFtvcHRpb25zXSBDb252ZXJzaW9uIG9wdGlvbnNcclxuICAgICAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IFBsYWluIG9iamVjdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEMyR1NfVGVzdC50b09iamVjdCA9IGZ1bmN0aW9uIHRvT2JqZWN0KG1lc3NhZ2UsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgaWYgKCFvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHt9O1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0ID0ge307XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmRlZmF1bHRzKSB7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QudGVzdElEID0gMDtcclxuICAgICAgICAgICAgICAgIG9iamVjdC50ZXN0TmFtZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UudGVzdElEICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInRlc3RJRFwiKSlcclxuICAgICAgICAgICAgICAgIG9iamVjdC50ZXN0SUQgPSBtZXNzYWdlLnRlc3RJRDtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UudGVzdE5hbWUgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwidGVzdE5hbWVcIikpXHJcbiAgICAgICAgICAgICAgICBvYmplY3QudGVzdE5hbWUgPSBtZXNzYWdlLnRlc3ROYW1lO1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnZlcnRzIHRoaXMgQzJHU19UZXN0IHRvIEpTT04uXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIHRvSlNPTlxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkMyR1NfVGVzdFxyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gSlNPTiBvYmplY3RcclxuICAgICAgICAgKi9cclxuICAgICAgICBDMkdTX1Rlc3QucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IudG9PYmplY3QodGhpcywgJHByb3RvYnVmLnV0aWwudG9KU09OT3B0aW9ucyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIEMyR1NfVGVzdDtcclxuICAgIH0pKCk7XHJcblxyXG4gICAgbmljZV90cy5HUzJDX1Rlc3QgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFByb3BlcnRpZXMgb2YgYSBHUzJDX1Rlc3QuXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHNcclxuICAgICAgICAgKiBAaW50ZXJmYWNlIElHUzJDX1Rlc3RcclxuICAgICAgICAgKiBAcHJvcGVydHkge251bWJlcnxudWxsfSBbRXJyb3JdIEdTMkNfVGVzdCBFcnJvclxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfG51bGx9IFtNZXNzYWdlXSBHUzJDX1Rlc3QgTWVzc2FnZVxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfG51bGx9IFt0ZXN0UmVzcG9uc2VdIEdTMkNfVGVzdCB0ZXN0UmVzcG9uc2VcclxuICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ29uc3RydWN0cyBhIG5ldyBHUzJDX1Rlc3QuXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHNcclxuICAgICAgICAgKiBAY2xhc3NkZXNjIFJlcHJlc2VudHMgYSBHUzJDX1Rlc3QuXHJcbiAgICAgICAgICogQGltcGxlbWVudHMgSUdTMkNfVGVzdFxyXG4gICAgICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICAgICAqIEBwYXJhbSB7bmljZV90cy5JR1MyQ19UZXN0PX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gR1MyQ19UZXN0KHByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgaWYgKHByb3BlcnRpZXMpXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXlzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyksIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSlcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllc1trZXlzW2ldXSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2tleXNbaV1dID0gcHJvcGVydGllc1trZXlzW2ldXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdTMkNfVGVzdCBFcnJvci5cclxuICAgICAgICAgKiBAbWVtYmVyIHtudW1iZXJ9IEVycm9yXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuR1MyQ19UZXN0XHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgR1MyQ19UZXN0LnByb3RvdHlwZS5FcnJvciA9IDA7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdTMkNfVGVzdCBNZXNzYWdlLlxyXG4gICAgICAgICAqIEBtZW1iZXIge3N0cmluZ30gTWVzc2FnZVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkdTMkNfVGVzdFxyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEdTMkNfVGVzdC5wcm90b3R5cGUuTWVzc2FnZSA9IFwiXCI7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdTMkNfVGVzdCB0ZXN0UmVzcG9uc2UuXHJcbiAgICAgICAgICogQG1lbWJlciB7c3RyaW5nfSB0ZXN0UmVzcG9uc2VcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5HUzJDX1Rlc3RcclxuICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBHUzJDX1Rlc3QucHJvdG90eXBlLnRlc3RSZXNwb25zZSA9IFwiXCI7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENyZWF0ZXMgYSBuZXcgR1MyQ19UZXN0IGluc3RhbmNlIHVzaW5nIHRoZSBzcGVjaWZpZWQgcHJvcGVydGllcy5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gY3JlYXRlXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuR1MyQ19UZXN0XHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7bmljZV90cy5JR1MyQ19UZXN0PX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XHJcbiAgICAgICAgICogQHJldHVybnMge25pY2VfdHMuR1MyQ19UZXN0fSBHUzJDX1Rlc3QgaW5zdGFuY2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBHUzJDX1Rlc3QuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKHByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHUzJDX1Rlc3QocHJvcGVydGllcyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIEdTMkNfVGVzdCBtZXNzYWdlLiBEb2VzIG5vdCBpbXBsaWNpdGx5IHtAbGluayBuaWNlX3RzLkdTMkNfVGVzdC52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZW5jb2RlXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuR1MyQ19UZXN0XHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7bmljZV90cy5JR1MyQ19UZXN0fSBtZXNzYWdlIEdTMkNfVGVzdCBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cclxuICAgICAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgR1MyQ19UZXN0LmVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShtZXNzYWdlLCB3cml0ZXIpIHtcclxuICAgICAgICAgICAgaWYgKCF3cml0ZXIpXHJcbiAgICAgICAgICAgICAgICB3cml0ZXIgPSAkV3JpdGVyLmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS50ZXN0UmVzcG9uc2UgIT0gbnVsbCAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtZXNzYWdlLCBcInRlc3RSZXNwb25zZVwiKSlcclxuICAgICAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMSwgd2lyZVR5cGUgMiA9Ki8xMCkuc3RyaW5nKG1lc3NhZ2UudGVzdFJlc3BvbnNlKTtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuRXJyb3IgIT0gbnVsbCAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtZXNzYWdlLCBcIkVycm9yXCIpKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCA5MSwgd2lyZVR5cGUgMCA9Ki83MjgpLmludDMyKG1lc3NhZ2UuRXJyb3IpO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5NZXNzYWdlICE9IG51bGwgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobWVzc2FnZSwgXCJNZXNzYWdlXCIpKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCA5Miwgd2lyZVR5cGUgMiA9Ki83MzgpLnN0cmluZyhtZXNzYWdlLk1lc3NhZ2UpO1xyXG4gICAgICAgICAgICByZXR1cm4gd3JpdGVyO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBHUzJDX1Rlc3QgbWVzc2FnZSwgbGVuZ3RoIGRlbGltaXRlZC4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgbmljZV90cy5HUzJDX1Rlc3QudmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXHJcbiAgICAgICAgICogQGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZFxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkdTMkNfVGVzdFxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge25pY2VfdHMuSUdTMkNfVGVzdH0gbWVzc2FnZSBHUzJDX1Rlc3QgbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXHJcbiAgICAgICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEdTMkNfVGVzdC5lbmNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWQobWVzc2FnZSwgd3JpdGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVuY29kZShtZXNzYWdlLCB3cml0ZXIpLmxkZWxpbSgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlY29kZXMgYSBHUzJDX1Rlc3QgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlci5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZGVjb2RlXHJcbiAgICAgICAgICogQG1lbWJlcm9mIG5pY2VfdHMuR1MyQ19UZXN0XHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoXSBNZXNzYWdlIGxlbmd0aCBpZiBrbm93biBiZWZvcmVoYW5kXHJcbiAgICAgICAgICogQHJldHVybnMge25pY2VfdHMuR1MyQ19UZXN0fSBHUzJDX1Rlc3RcclxuICAgICAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxyXG4gICAgICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEdTMkNfVGVzdC5kZWNvZGUgPSBmdW5jdGlvbiBkZWNvZGUocmVhZGVyLCBsZW5ndGgpIHtcclxuICAgICAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXHJcbiAgICAgICAgICAgICAgICByZWFkZXIgPSAkUmVhZGVyLmNyZWF0ZShyZWFkZXIpO1xyXG4gICAgICAgICAgICB2YXIgZW5kID0gbGVuZ3RoID09PSB1bmRlZmluZWQgPyByZWFkZXIubGVuIDogcmVhZGVyLnBvcyArIGxlbmd0aCwgbWVzc2FnZSA9IG5ldyAkcm9vdC5uaWNlX3RzLkdTMkNfVGVzdCgpO1xyXG4gICAgICAgICAgICB3aGlsZSAocmVhZGVyLnBvcyA8IGVuZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRhZyA9IHJlYWRlci51aW50MzIoKTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodGFnID4+PiAzKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDkxOlxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuRXJyb3IgPSByZWFkZXIuaW50MzIoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgOTI6XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5NZXNzYWdlID0gcmVhZGVyLnN0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UudGVzdFJlc3BvbnNlID0gcmVhZGVyLnN0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICByZWFkZXIuc2tpcFR5cGUodGFnICYgNyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGVjb2RlcyBhIEdTMkNfVGVzdCBtZXNzYWdlIGZyb20gdGhlIHNwZWNpZmllZCByZWFkZXIgb3IgYnVmZmVyLCBsZW5ndGggZGVsaW1pdGVkLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiBkZWNvZGVEZWxpbWl0ZWRcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5HUzJDX1Rlc3RcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXHJcbiAgICAgICAgICogQHJldHVybnMge25pY2VfdHMuR1MyQ19UZXN0fSBHUzJDX1Rlc3RcclxuICAgICAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxyXG4gICAgICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEdTMkNfVGVzdC5kZWNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBkZWNvZGVEZWxpbWl0ZWQocmVhZGVyKSB7XHJcbiAgICAgICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxyXG4gICAgICAgICAgICAgICAgcmVhZGVyID0gbmV3ICRSZWFkZXIocmVhZGVyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGVjb2RlKHJlYWRlciwgcmVhZGVyLnVpbnQzMigpKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWZXJpZmllcyBhIEdTMkNfVGVzdCBtZXNzYWdlLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiB2ZXJpZnlcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5HUzJDX1Rlc3RcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gbWVzc2FnZSBQbGFpbiBvYmplY3QgdG8gdmVyaWZ5XHJcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ3xudWxsfSBgbnVsbGAgaWYgdmFsaWQsIG90aGVyd2lzZSB0aGUgcmVhc29uIHdoeSBpdCBpcyBub3RcclxuICAgICAgICAgKi9cclxuICAgICAgICBHUzJDX1Rlc3QudmVyaWZ5ID0gZnVuY3Rpb24gdmVyaWZ5KG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSBcIm9iamVjdFwiIHx8IG1lc3NhZ2UgPT09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJvYmplY3QgZXhwZWN0ZWRcIjtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuRXJyb3IgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiRXJyb3JcIikpXHJcbiAgICAgICAgICAgICAgICBpZiAoISR1dGlsLmlzSW50ZWdlcihtZXNzYWdlLkVycm9yKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJFcnJvcjogaW50ZWdlciBleHBlY3RlZFwiO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5NZXNzYWdlICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIk1lc3NhZ2VcIikpXHJcbiAgICAgICAgICAgICAgICBpZiAoISR1dGlsLmlzU3RyaW5nKG1lc3NhZ2UuTWVzc2FnZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiTWVzc2FnZTogc3RyaW5nIGV4cGVjdGVkXCI7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLnRlc3RSZXNwb25zZSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJ0ZXN0UmVzcG9uc2VcIikpXHJcbiAgICAgICAgICAgICAgICBpZiAoISR1dGlsLmlzU3RyaW5nKG1lc3NhZ2UudGVzdFJlc3BvbnNlKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJ0ZXN0UmVzcG9uc2U6IHN0cmluZyBleHBlY3RlZFwiO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGVzIGEgR1MyQ19UZXN0IG1lc3NhZ2UgZnJvbSBhIHBsYWluIG9iamVjdC4gQWxzbyBjb252ZXJ0cyB2YWx1ZXMgdG8gdGhlaXIgcmVzcGVjdGl2ZSBpbnRlcm5hbCB0eXBlcy5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gZnJvbU9iamVjdFxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBuaWNlX3RzLkdTMkNfVGVzdFxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBvYmplY3QgUGxhaW4gb2JqZWN0XHJcbiAgICAgICAgICogQHJldHVybnMge25pY2VfdHMuR1MyQ19UZXN0fSBHUzJDX1Rlc3RcclxuICAgICAgICAgKi9cclxuICAgICAgICBHUzJDX1Rlc3QuZnJvbU9iamVjdCA9IGZ1bmN0aW9uIGZyb21PYmplY3Qob2JqZWN0KSB7XHJcbiAgICAgICAgICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiAkcm9vdC5uaWNlX3RzLkdTMkNfVGVzdClcclxuICAgICAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gbmV3ICRyb290Lm5pY2VfdHMuR1MyQ19UZXN0KCk7XHJcbiAgICAgICAgICAgIGlmIChvYmplY3QuRXJyb3IgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuRXJyb3IgPSBvYmplY3QuRXJyb3IgfCAwO1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0Lk1lc3NhZ2UgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuTWVzc2FnZSA9IFN0cmluZyhvYmplY3QuTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIGlmIChvYmplY3QudGVzdFJlc3BvbnNlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnRlc3RSZXNwb25zZSA9IFN0cmluZyhvYmplY3QudGVzdFJlc3BvbnNlKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlcyBhIHBsYWluIG9iamVjdCBmcm9tIGEgR1MyQ19UZXN0IG1lc3NhZ2UuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIG90aGVyIHR5cGVzIGlmIHNwZWNpZmllZC5cclxuICAgICAgICAgKiBAZnVuY3Rpb24gdG9PYmplY3RcclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5HUzJDX1Rlc3RcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtuaWNlX3RzLkdTMkNfVGVzdH0gbWVzc2FnZSBHUzJDX1Rlc3RcclxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5JQ29udmVyc2lvbk9wdGlvbnN9IFtvcHRpb25zXSBDb252ZXJzaW9uIG9wdGlvbnNcclxuICAgICAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IFBsYWluIG9iamVjdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEdTMkNfVGVzdC50b09iamVjdCA9IGZ1bmN0aW9uIHRvT2JqZWN0KG1lc3NhZ2UsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgaWYgKCFvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHt9O1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0ID0ge307XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmRlZmF1bHRzKSB7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QudGVzdFJlc3BvbnNlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIG9iamVjdC5FcnJvciA9IDA7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QuTWVzc2FnZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UudGVzdFJlc3BvbnNlICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInRlc3RSZXNwb25zZVwiKSlcclxuICAgICAgICAgICAgICAgIG9iamVjdC50ZXN0UmVzcG9uc2UgPSBtZXNzYWdlLnRlc3RSZXNwb25zZTtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuRXJyb3IgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiRXJyb3JcIikpXHJcbiAgICAgICAgICAgICAgICBvYmplY3QuRXJyb3IgPSBtZXNzYWdlLkVycm9yO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5NZXNzYWdlICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIk1lc3NhZ2VcIikpXHJcbiAgICAgICAgICAgICAgICBvYmplY3QuTWVzc2FnZSA9IG1lc3NhZ2UuTWVzc2FnZTtcclxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb252ZXJ0cyB0aGlzIEdTMkNfVGVzdCB0byBKU09OLlxyXG4gICAgICAgICAqIEBmdW5jdGlvbiB0b0pTT05cclxuICAgICAgICAgKiBAbWVtYmVyb2YgbmljZV90cy5HUzJDX1Rlc3RcclxuICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IEpTT04gb2JqZWN0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgR1MyQ19UZXN0LnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLnRvT2JqZWN0KHRoaXMsICRwcm90b2J1Zi51dGlsLnRvSlNPTk9wdGlvbnMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBHUzJDX1Rlc3Q7XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIHJldHVybiBuaWNlX3RzO1xyXG59KSgpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAkcm9vdDtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY3NoYXJwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInB1ZXJ0c1wiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBHYW1lTGF1bmNoLCBKc01hbmFnZXIsIFVuaXR5RW5naW5lIH0gZnJvbSBcImNzaGFycFwiO1xyXG5pbXBvcnQgeyBDb21tb25VSSB9IGZyb20gXCIuL2RhdGEvdWkvY29tbW9uXCI7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuL2ZyYW1ld29yay9sb2dnZXIvTG9nZ2VyXCI7XHJcbmltcG9ydCB7IFNjZW5lRGVmIH0gZnJvbSBcIi4vZnJhbWV3b3JrL3NjZW5lL1NjZW5lRGVmXCI7XHJcbmltcG9ydCB7IFMgfSBmcm9tIFwiLi9nbG9iYWwvR2FtZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBVbml0VGVzdCB9IGZyb20gXCIuL3VuaXR0ZXN0L1VuaXRUZXN0XCI7XHJcblxyXG5jbGFzcyBHYW1lTWFpbntcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBKc01hbmFnZXIuSW5zdGFuY2UuSnNPbkFwcGxpY2F0aW9uUXVpdCA9ICgpID0+IHRoaXMub25BcHBsaWNhdGlvblF1aXQoKTtcclxuICAgICAgICBKc01hbmFnZXIuSW5zdGFuY2UuSnNPbkRpc3Bvc2UgPSAoKSA9PiB0aGlzLm9uRGlzcG9zZSgpO1xyXG4gICAgICAgIEpzTWFuYWdlci5JbnN0YW5jZS5Kc1VwZGF0ZSA9IChkZWx0YTpudW1iZXIpID0+IHRoaXMudXBkYXRlKGRlbHRhKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGFzeW5jIHN0YXJ0KCl7XHJcbiAgICAgICAgVW5pdHlFbmdpbmUuRGVidWcuTG9nKCdIZWxscCBXb3JkITIyMjIyMjQnKVxyXG4gICAgICAgIC8v5Yqg6L296YCa55SoRmFpcnlHVUnotYTmupBcclxuICAgICAgICBjb25zb2xlLmxvZyhDb21tb25VSS5QYWNrYWdlTmFtZSlcclxuICAgICAgICBhd2FpdCBTLlJlc01hbmFnZXIubG9hZEZhaXJ5R1VJUGFja2FnZShDb21tb25VSS5QYWNrYWdlTmFtZSk7XHJcblxyXG4gICAgICAgIC8vZG8gVW5pdCBUZXN0XHJcbiAgICAgICAgLy8gVW5pdFRlc3QuZG9UZXN0KCk7XHJcblxyXG4gICAgICAgIC8v6L+b5YWl55m75b2V5qih5Z2XXHJcbiAgICAgICAgYXdhaXQgUy5TY2VuZU1hbmFnZXIubG9hZFNjZW5lKFNjZW5lRGVmLkdhbWVTdGFydCk7XHJcblxyXG4gICAgICAgIC8vSlPlkK/liqjlrozmiJDvvIzpgJrnn6VDI+WxglxyXG4gICAgICAgIEdhbWVMYXVuY2guSW5zdGFuY2UuSnNMdWFuY2hGaW5pc2goKTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIG9uQXBwbGljYXRpb25RdWl0KCk6dm9pZCB7XHJcbiAgICAgICAgUy5HYW1lT2JqZWN0UG9vbC5jbGVhbnVwKHRydWUpO1xyXG4gICAgICAgIExvZ2dlci5sb2coXCJHYW1lIG9uQXBwbGljYXRpb25RdWl0IGluIEpTLi4uLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZShkZWx0YTpudW1iZXIpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhkZWx0YSlcclxuICAgICAgICBTLlVJTWFuYWdlci51cGRhdGUoZGVsdGEpXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBvbkRpc3Bvc2UoKTp2b2lkIHtcclxuICAgICAgICBMb2dnZXIubG9nKFwiR2FtZSBvbkRpc3Bvc2UgaW4gSlMuLi4uXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbm5ldyBHYW1lTWFpbigpLnN0YXJ0KCk7XHJcblxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=