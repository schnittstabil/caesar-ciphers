/* istanbul ignore else */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['./caesar-cipher'], function(CaesarCipher) {
  'use strict';

  /**
    * @module caesar-ciphers
    */


  /* jshint -W101 */
  /**
    * see http://trephine.org/t/index.php?title=Efficient_JavaScript_string_building
    *
    * @class EffectiveStringBuilding
    * @constructor
    * @extends CaesarCipher
    * @param {number} shift cipher key
    */
  /* jshint +W101 */
  function EffectiveStringBuilding(shift) {
    CaesarCipher.call(this, shift);
  }

  // LEGACY CHECK
  if(typeof Object.defineProperty === 'function'){
    EffectiveStringBuilding.prototype = Object.create(CaesarCipher.prototype);
  }else{
    // IE6, Safari4 etc
    EffectiveStringBuilding.prototype = new CaesarCipher();
  }

  /**
    * @property id
    * @type String
    * @default 'EffectiveStringBuilding'
    * @readOnly
    */
  EffectiveStringBuilding.id = 'EffectiveStringBuilding';
  EffectiveStringBuilding.prototype.id = 'EffectiveStringBuilding';

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

  EffectiveStringBuilding.isEnabled = function() {
    return true;
  };

  return EffectiveStringBuilding;
});
