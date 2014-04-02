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

    this.getShift = function(){
      return _shift;
    };

    this.setShift = function(shift){
      if (!/^-?\d+$/.test(shift)) {
        throw 'Shift "' + shift + '" is not an number.';
      }
      _shift = ((shift % 26) + 26) % 26;
      return this;
    };

    // LEGACY CHECK
    if(typeof Object.defineProperty !== 'undefined'){
      Object.defineProperty(this, 'shift', {
        get: this.getShift,
        set: this.setShift,
        enumerable: true
      });
    }

    this.setShift(shift || 0);
  }

  /**
    * @property id
    * @type String
    * @readOnly
    * @default undefined
    */
  CaesarCipher.id = undefined;
  CaesarCipher.prototype.id = undefined;

  /**
    * @method encrypt
    * @param {string} plaintext string to encrpyt
    * @return {string} encrypted string
    */
  CaesarCipher.prototype.encrypt = function(plaintext) {
    return this.rotate(this.getShift(), plaintext);
  };

  /**
    * @method decrypt
    * @param {string} ciphertext string to decrypt
    * @returns {string} decrypted string
    */
  CaesarCipher.prototype.decrypt = function(ciphertext) {
    return this.rotate(26-this.getShift(), ciphertext);
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
