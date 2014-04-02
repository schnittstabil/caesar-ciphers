// see https://github.com/umdjs/umd
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    console.log('example using AMDs define');
    define(['caesar-ciphers'], factory);
  } else {
    console.log('example using browser globals');
    factory(root.caesarCiphers);
  }
}(this, function (caesarCiphers) {
  'use strict';
  var implementation = document.getElementById('implementation'),
      input = document.getElementById('input'),
      shift = document.getElementById('shift'),
      output = document.getElementById('output'),
      cipherIds = caesarCiphers.getIds(),
      i, len, cipherId,
      currentCipher;

  for(i=0, len=cipherIds.length; i<len; i++){
    cipherId = cipherIds[i];
    implementation.options.add(new Option(cipherId, cipherId));
  }

  function updateOutput(){
    output.innerHTML = currentCipher.encrypt(input.value);
  }

  function updateCipher(){
    var shiftValue = Math.round(shift.value),
        Cipher;
    try{
      Cipher = caesarCiphers.get(implementation.value);
      currentCipher = new Cipher(shiftValue);
      console.log('updateCipher: ' + currentCipher.id + '(shift: ' + currentCipher.getShift() + ')');
    }catch(msg){
      console.error(msg);
    }
  }

  function update(){
    updateCipher();
    updateOutput();
  }

  implementation.addEventListener('change', update);
  input.addEventListener('keyup', updateOutput);
  input.addEventListener('change', updateOutput);

  shift.addEventListener('keyup', update);
  shift.addEventListener('change', update);

  update();
}));
