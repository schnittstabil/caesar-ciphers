'use strict';

var CaesarCipher = require('./caesar-cipher');

/* jshint -W101 */
/**
  * @see {@link http://trephine.org/t/index.php?title=Efficient_JavaScript_string_building}
  * @constructor
  * @extends CaesarCipher
  * @param {number} shift cipher key
  */
/* jshint +W101 */
function EffectiveStringBuilding(shift) {
  CaesarCipher.call(this, shift);
};

EffectiveStringBuilding.prototype = Object.create(CaesarCipher.prototype);

/**
 * @param {number} shift shift to rotate
 * @param {string} text string to rotate
 * @return {string}
 */
EffectiveStringBuilding.prototype.rotate = function(shift, text) {
  var len = text.length,
    buffer = new Array(len),
    i, c;

  for (i = 0; i < len; i++) {
    c = text.charCodeAt(i);

    if (c>64 && c<91) {
      // upper case
      buffer[i] = String.fromCharCode(((c - 65 + shift) % 26) + 65);
    } else if (c>96 && c<123) {
      // lower case
      buffer[i] = String.fromCharCode(((c - 97 + shift) % 26) + 97);
    } else {
      buffer[i] = String.fromCharCode(c);
    }
  }
  return buffer.join('');
};

module.exports = EffectiveStringBuilding;
