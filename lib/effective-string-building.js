'use strict';

var CaesarCipher = require('./caesar-cipher');

module.exports = function(shift) {
  var that = this;
  CaesarCipher.call(this, shift);

  /* jshint -W101 */
  /**
   * @see {@link http://trephine.org/t/index.php?title=Efficient_JavaScript_string_building}
   */
  /* jshint +W101 */
  that.rotate = function(shift, text) {
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
};

module.exports.prototype = Object.create(CaesarCipher.prototype);
