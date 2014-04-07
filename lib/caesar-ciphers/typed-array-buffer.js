/* istanbul ignore else */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['./caesar-cipher', './string-utils'],
  function (CaesarCipher, stringUtils) {
    'use strict';

    /**
      * @module caesar-ciphers
      */

    /**
      * IE >= v10.0; Firefox >= v4.0; Chrome v7.0; Safari >=v5.1
      *
      * see link http://www.khronos.org/registry/typedarray/specs/latest/
      *
      * and http://caniuse.com/typedarrays
      *
      * @class TypedArrayBuffer
      * @constructor
      * @extends CaesarCipher
      * @param {number} shift cipher key
      */
    function TypedArrayBuffer(shift) {
      CaesarCipher.call(this, shift);
    }

    // LEGACY CHECK
    if(typeof Object.defineProperty === 'function'){
      TypedArrayBuffer.prototype = Object.create(CaesarCipher.prototype);
    }else{
      // IE6, Safari4 etc
      TypedArrayBuffer.prototype = new CaesarCipher();
    }

    /**
      * @property id
      * @type String
      * @default 'TypedArrayBuffer'
      * @readOnly
      */
    TypedArrayBuffer.id = 'TypedArrayBuffer';
    TypedArrayBuffer.prototype.id = 'TypedArrayBuffer';

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

    TypedArrayBuffer.isSupported = function() {
      try{
        return stringUtils.uint16ArrayToString.isSupported(Uint16Array);
      }catch(err){
        return false;
      }
    };

    return TypedArrayBuffer;
  }
);
