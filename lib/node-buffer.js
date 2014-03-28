'use strict';

var CaesarCipher = require('./caesar-cipher');

module.exports = function(shift) {
  var that = this;
  CaesarCipher.call(this, shift);

  that.rotate = function(shift, text) {
    var buffer = new Buffer(text, 'utf16le'), i, len, c;

    for (i = 0, len = buffer.length; i < len; i+=2) {
      c = buffer.readUInt16LE(i);
      if (c>64 && c<91) {
        // upper case
        c = ((c - 65 + shift) % 26) + 65;
      } else if (c>96 && c<123) {
        // lower case
        c = ((c - 97 + shift) % 26) + 97;
      }
      buffer.writeUInt16LE(c,i);
    }
    return buffer.toString('utf16le');
  };
};

module.exports.prototype = Object.create(CaesarCipher.prototype);
