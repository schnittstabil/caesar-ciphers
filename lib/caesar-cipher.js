'use strict';

module.exports = CaesarCipher;

function CaesarCipher(shift_) {
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
        _shift = ((shift%26)+26)%26;
      },
      enumerable: true,
    });
  }

  this.shift = shift_ || 0;
}

CaesarCipher.prototype.encrypt = function(plaintext) {
  return this.rotate(this.shift, plaintext);
};

CaesarCipher.prototype.decrypt = function(ciphertext) {
  return this.rotate(26-this.shift, ciphertext);
};
