/* jshint -W003, -W033 */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint +W003, +W033 */

define(function (require) {
  'use strict';

  var stringUtils = require('./string-utils'),
      CaesarCipher = require('./caesar-cipher');

  /**
    * IE >= v10.0; Firefox >= v4.0; Chrome v7.0; Safari >=v5.1
    *
    * @see {@link http://www.khronos.org/registry/typedarray/specs/latest/}
    * @see {@link http://caniuse.com/typedarrays}
    *
    * @constructor
    * @extends CaesarCipher
    * @param {number} shift cipher key
    */
  function TypedArrayBuffer(shift) {
    CaesarCipher.call(this, shift);
  }

  TypedArrayBuffer.prototype = Object.create(CaesarCipher.prototype);

  /**
   * @param {number} shift shift to rotate
   * @param {string} text string to rotate
   * @return {string}
   */
  TypedArrayBuffer.prototype.rotate = function(shift, text) {
    var len = text.length,
        buffer = new Uint16Array(len),
        i, c;

    for (i = 0; i < len; i++) {
      c = text.charCodeAt(i);

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

  return TypedArrayBuffer;
});
