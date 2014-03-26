'use strict';

var CaesarCipher = require('./caesar-cipher');

module.exports = function(shift) {
  CaesarCipher.call(this, shift);
};

module.exports.prototype = Object.create(CaesarCipher.prototype);

module.exports.prototype.rotate = function(shift, text) {
  var buffer = new Buffer(text, 'utf16le');

  for (var i = 0; i < buffer.length; i+=2) {
    var c = buffer.readUInt16LE(i);
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
