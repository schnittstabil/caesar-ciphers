/* jshint -W003, -W033 */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint +W003, +W033 */

define(function (require) {
  'use strict';

  var CaesarCipher = require('./caesar-cipher');

  /**
    * @constructor
    * @extends CaesarCipher
    * @param {number} shift cipher key
    */
  function StringAppend(shift) {
    CaesarCipher.call(this, shift);
  }

  StringAppend.prototype = Object.create(CaesarCipher.prototype);

  /**
   * @param {number} shift shift to rotate
   * @param {string} text string to rotate
   * @return {string}
   */
  StringAppend.prototype.rotate = function(shift, text) {
    var buffer = '',
        i, len, c;

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

  return StringAppend;
});
