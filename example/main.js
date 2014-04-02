(function(){
  /* jshint browser: true */
  'use strict';

  function getAttribute(name){
    var scripts = document.getElementsByTagName('script'),
        script = scripts[scripts.length-1];
    if(script.hasAttribute('data-' + name)){
      return script.getAttribute('data-' + name);
    }
    return undefined;
  }

  var caesarCiphers = getAttribute('caesar-ciphers'),
      config = {
        enforceDefine: true,
        paths: {},
        shim: {}
      };

  if(caesarCiphers){
    console.log('caesar-ciphers: ' + caesarCiphers);
    config.paths['caesar-ciphers'] = caesarCiphers;
  }

  // requirejs setup
  requirejs.config(config);

  // run the app
  require(['example']);
})();
