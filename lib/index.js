'use strict';

// setup implementations
exports.ciphers = {
  arrayBuffer: require('./array-buffer'),
  effectiveStringBuilding: require('./effective-string-building'),
  nodeBuffer: require('./node-buffer'),
  stringAppend: require('./string-append'),
};

// setup defaults
exports.default = exports.ciphers.stringAppend;
