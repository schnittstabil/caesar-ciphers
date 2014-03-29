/** @module caesar-cipher */
'use strict';

// setup implementations
exports.ciphers = {
  typedArrayBuffer: require('./typed-array-buffer'),
  effectiveStringBuilding: require('./effective-string-building'),
  nodeBuffer: require('./node-buffer'),
  stringAppend: require('./string-append'),
};

// setup defaults
exports.default = exports.ciphers.stringAppend;
