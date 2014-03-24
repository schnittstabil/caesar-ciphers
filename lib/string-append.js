'use strict';

module.exports = {
  encrypt: function (shift, plaintext) {
    return rotate(shift, plaintext);
  },
  decrypt: function (shift, ciphertext) {
    return rotate(-shift, ciphertext);
  }
};

function rotate(shift, text) {
  if (!/^-?\d+$/.test(shift)){
    throw 'Shift "' + shift + '" is not an integer.';
  }

  shift = ((shift%26)+26)%26;

  var result = '';

  for (var i = 0; i < text.length; i++) {
    var c = text.charCodeAt(i);

    if (c>64 && c<91) {
      // upper case
      result += String.fromCharCode( ( (c-65+shift) % 26 ) + 65);
    } else if (c>96 && c<123) {
      // lower case
      result += String.fromCharCode( ( (c-97+shift) % 26 ) + 97);
    } else {
      result += text.charAt(i);
    }
  }
  return result;
}
