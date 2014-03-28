'use strict';

var CaesarCipher = require('./caesar-cipher');

module.exports = function(shift) {
  var that = this;
  CaesarCipher.call(this, shift);

  that.rotate = function(shift, text) {
    var buffer = '', i, len, c;

    for (i = 0, len = text.length; i < len; i++) {
      c = text.charCodeAt(i);

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
};

module.exports.prototype = Object.create(CaesarCipher.prototype);
