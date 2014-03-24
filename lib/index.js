'use strict';

// setup implementations
exports.stringAppend = require('./string-append');

// setup defaults
exports.encrypt = exports.stringAppend.encrypt;
exports.decrypt = exports.stringAppend.decrypt;
