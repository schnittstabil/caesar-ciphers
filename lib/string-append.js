'use strict';

var CaesarCipher = require('./caesar-cipher');

module.exports = function(shift) {
  CaesarCipher.call(this, shift);
};

module.exports.prototype = Object.create(CaesarCipher.prototype);

module.exports.prototype.rotate = function(shift, text) {
  var buffer = '';

  for (var i = 0, len = text.length; i < len; i++) {
    var c = text.charCodeAt(i);

    if (c>64 && c<91) {
      // upper case
      buffer += String.fromCharCode(((c - 65 + shift) % 26) + 65);
    } else if (c>96 && c<123) {
      // lower case
      buffer += String.fromCharCode(((c - 97 + shift) % 26) + 97);
    } else {
      buffer += String.fromCharCode(c);
    }
  }
  return buffer;
};
