'use strict';

var stringUtils = require('../lib/string-utils');

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

  var len = text.length;
  var bufView = new Uint16Array(len);

  for (var i = 0; i < len; i++) {
    var c = text.charCodeAt(i);

    if (c>64 && c<91) {
      // upper case
      bufView[i] = ( (c-65+shift) % 26 ) + 65;
    } else if (c>96 && c<123) {
      // lower case
      bufView[i] = ( (c-97+shift) % 26 ) + 97;
    } else {
      bufView[i] = c;
    }
  }
  return stringUtils.uint16ArrayToString(bufView);
}
