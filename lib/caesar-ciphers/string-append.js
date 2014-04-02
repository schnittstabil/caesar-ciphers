/* istanbul ignore else */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['./caesar-cipher'], function (CaesarCipher) {
  'use strict';

  /**
    * @module caesar-ciphers
    */


  /**
    * @class StringAppend
    * @constructor
    * @extends CaesarCipher
    * @param {number} shift cipher key
    */
  function StringAppend(shift) {
    CaesarCipher.call(this, shift);
  }

  // LEGACY CHECK
  if(typeof Object.defineProperty === 'function'){
    StringAppend.prototype = Object.create(CaesarCipher.prototype);
  }else{
    // IE6, Safari4 etc
    StringAppend.prototype = new CaesarCipher();
  }

  /**
    * @property id
    * @type String
    * @default 'StringAppend'
    * @readOnly
    */
  StringAppend.id = 'StringAppend';
  StringAppend.prototype.id = 'StringAppend';

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

  StringAppend.isEnabled = function() {
    return true;
  };

  return StringAppend;
});
