'use strict';

module.exports = function(shift) {

  if (!/^-?\d+$/.test(shift)){
    throw 'Shift "' + shift + '" is not an integer.';
  }

  shift = ((shift%26)+26)%26;

  this.encrypt = function(plaintext) {
    return this.rotate(shift, plaintext);
  };

  this.decrypt = function(ciphertext) {
    return this.rotate(-shift, ciphertext);
  };
};
