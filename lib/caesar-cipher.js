/* istanbul ignore else */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function() {
  'use strict';

  /**
    * @module caesar-ciphers
    */


  /**
    * @class CaesarCipher
    * @constructor
    * @param {number} shift cipher key
    */
  function CaesarCipher(shift) {
    var _shift;

    Object.defineProperty(this, 'shift', {
      get: function(){
        return _shift;
      },
      set: function(shift){
        if (!/^-?\d+$/.test(shift)) {
          throw 'Shift "' + shift + '" is not an number.';
        }
        _shift = ((shift % 26) + 26) % 26;
      },
      enumerable: true,
    });

    //init shift property
    this.shift = shift || 0;
  }

  /**
    * @property id
    * @type String
    * @readOnly
    * @default undefined
    */
  CaesarCipher.id = undefined;

  /**
    * @method encrypt
    * @param {string} plaintext string to encrpyt
    * @return {string} encrypted string
    */
  CaesarCipher.prototype.encrypt = function(plaintext) {
    return this.rotate(this.shift, plaintext);
  };

  /**
    * @method decrypt
    * @param {string} ciphertext string to decrypt
    * @returns {string} decrypted string
    */
  CaesarCipher.prototype.decrypt = function(ciphertext) {
    return this.rotate(26-this.shift, ciphertext);
  };

  /**
    * @method rotate
    * @param {number} shift shift to rotate
    * @param {string} text string to rotate
    * @return {string}
    */
  CaesarCipher.prototype.rotate = function() {
    throw new Error('must be implemented by subclass!');
  };

  /**
    * @method isEnabled
    * @return {boolean}
    */
  CaesarCipher.prototype.isEnabled = function() {
    throw new Error('must be implemented by subclass!');
  };

  return CaesarCipher;
});
