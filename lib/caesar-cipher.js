'use strict';

/**
  * @constructor
  * @param {number} shift cipher key
  */
function CaesarCipher(shift) {
  var _shift;

  if(!this.hasOwnProperty('shift')){
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
  }

  //init shift property
  this.shift = shift || 0;
}

/**
  * @param {string} plaintext string to encrpyt
  * @returns {string} encrypted string
  */
CaesarCipher.prototype.encrypt = function(plaintext) {
  return this.rotate(this.shift, plaintext);
};

/**
  * @param {string} ciphertext string to decrypt
  * @returns {string} decrypted string
  */
CaesarCipher.prototype.decrypt = function(ciphertext) {
  return this.rotate(26-this.shift, ciphertext);
};

/**
 * @abstract
 * @param {number} shift shift to rotate
 * @param {string} text string to rotate
 * @return {string}
 */
CaesarCipher.prototype.rotate = function(shift, text) {
    throw new Error('must be implemented by subclass!');
};

module.exports = CaesarCipher;
