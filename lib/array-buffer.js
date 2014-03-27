'use strict';

var stringUtils = require('./string-utils');
var CaesarCipher = require('./caesar-cipher');

module.exports = function(shift) {
  CaesarCipher.call(this, shift);
};

module.exports.prototype = Object.create(CaesarCipher.prototype);

module.exports.prototype.rotate = function(shift, text) {
  var len = text.length;
  var buffer = new Uint16Array(len);

  for (var i = 0; i < len; i++) {
    var c = text.charCodeAt(i);

    if (c>64 && c<91) {
      // upper case
      buffer[i] = ((c - 65 + shift) % 26) + 65;
    } else if (c>96 && c<123) {
      // lower case
      buffer[i] = ((c - 97 + shift) % 26) + 97;
    } else {
      buffer[i] = c;
    }
  }
  return stringUtils.uint16ArrayToString(buffer);
};
