'use strict';

// setup implementations
exports.ciphers = {
  arrayBuffer: require('./array-buffer'),
  stringAppend: require('./string-append')
};

// setup defaults
exports.default = exports.ciphers.stringAppend;
