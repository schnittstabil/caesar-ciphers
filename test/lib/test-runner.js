/* global TraceKit */
define(
  [
    'mocha',
    './caesar-cipher_test',
    './caesar-ciphers_test',
    './string-utils_test'
  ],
  function testRunner(mocha){
    try{
      mocha.run();
    }catch(err){
      if(typeof TraceKit !== 'undefined'){
        TraceKit.report(err);
      }
      throw err;
    }
  }
);
