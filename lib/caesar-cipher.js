'use strict';

function CaesarCipher(shift_) {
  var that = this, _shift;

  if(!that.hasOwnProperty('shift')){
    Object.defineProperty(that, 'shift', {
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
  that.shift = shift_ || 0;

  that.encrypt = function(plaintext) {
    return that.rotate(that.shift, plaintext);
  };

  that.decrypt = function(ciphertext) {
    return that.rotate(26-that.shift, ciphertext);
  };
}

module.exports = CaesarCipher;
