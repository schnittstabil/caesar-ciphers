/* global TraceKit */
define(
  [
    'mocha',
    './caesar-cipher_test',
    './caesar-ciphers_test',
    './string-utils_test'
  ],
  function(mocha){
    try{
      mocha.run();
    }catch(err){
      if(typeof TraceKit !== 'undefined'){
        TraceKit.report(err);
      }else{
        throw err;
      }
    }
  }
);
