'use strict';

var CaesarCipher = require('./caesar-cipher');

module.exports = function(shift) {
  CaesarCipher.call(this, shift);
};

module.exports.prototype = Object.create(CaesarCipher.prototype);

/* jshint -W101 */
/**
 * @see {@link http://trephine.org/t/index.php?title=Efficient_JavaScript_string_building}
 */
/* jshint +W101 */
module.exports.prototype.rotate = function(shift, text) {
  var len = text.length;
  var buffer = new Array(len);

  for (var i = 0; i < len; i++) {
    var c = text.charCodeAt(i);

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
