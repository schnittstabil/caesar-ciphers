(function(){
  'use strict';
  /* jshint browser: true */
  function isDist(){
    var scripts = document.getElementsByTagName('script'),
        script = scripts[scripts.length-1];
    if(script.hasAttribute('data-is-dist')){
      return script.getAttribute('data-is-dist');
    }
    return false;
  }

  var implementation = document.getElementById('implementation'),
      input = document.getElementById('input'),
      shift = document.getElementById('shift'),
      output = document.getElementById('output'),
      modPrefix = isDist() ? '' : 'lib/';


  require([modPrefix + 'caesar-ciphers'], function(caesarCiphers){
    var cipherIds = caesarCiphers.getIds(),
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
  });

})();




