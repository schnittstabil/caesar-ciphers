'use strict';

var CaesarCipher = require('./caesar-cipher');

/**
  * @constructor
  * @extends CaesarCipher
  * @param {number} shift cipher key
  */
function NodeBuffer(shift) {
  CaesarCipher.call(this, shift);
};

NodeBuffer.prototype = Object.create(CaesarCipher.prototype);

/**
 * @param {number} shift shift to rotate
 * @param {string} text string to rotate
 * @return {string}
 */
NodeBuffer.prototype.rotate = function(shift, text) {
  var buffer = new Buffer(text, 'utf16le'),
      i, len, c;

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

module.exports = NodeBuffer;
