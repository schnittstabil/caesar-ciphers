/* jshint browser: true */
/* global requirejs */

define(function(){

  function getStack(){
    /* jshint -W059 */
    var fnRE  = /function\s*([\w\-$]+)?\s*\(/i,
        caller = arguments.callee.caller,
        stack = 'Stack = ',
        fn;

    while (caller){
      fn = fnRE.test(caller.toString()) ? RegExp.$1 || '{?}' : '{?}';
      stack += '-->' + fn;
      caller = caller.arguments.callee.caller;
    }

    return stack;
    /* jshint +W059 */
  }


  function logOnError() {
    var args = Array.prototype.slice.call(arguments, 0);
    args.push('href: ' + document.location.href);
    args.push('userAgent: ' + navigator.userAgent);
    args.push('stack: ' + getStack());
    console.log(args.join('\n\n') + '\n\n\n\n');
  }

  window.onerror = logOnError;


  function logError(err, origin){
    'use strict';
    var msg = [];
    if(origin)            { msg.push('Origin:         ' + origin); }
    if(err.name)          { msg.push('Name:           ' + err.name); }
    if(err.message)       { msg.push('Message:        ' + err.message); }
    if(err.fileName)      { msg.push('Filename:       ' + err.fileName); }
    if(err.lineNumber)    { msg.push('Line:           ' + err.lineNumber); }
    if(err.columnNumber)  { msg.push('Column:         ' + err.columnNumber); }
    if(err.requireType)   { msg.push('RequireType:    ' + err.requireType); }
    if(err.requireModules){ msg.push('RequireModules: ' + err.requireModules); }
    if(err.stacktrace)    { msg.push('Stack:          ' + err.stacktrace); }
    else if(err.stack)    { msg.push('Stack:          ' + err.stack); }
    console.log(msg.join('\n') + '\n\n\n\n');
  }

  function getReporter(){
    var scripts = document.getElementsByTagName('script'),
        script = scripts[scripts.length-1];
    return script.getAttribute('data-reporter') || 'tap';
  }


  // requirejs setup
  requirejs.config({
    enforceDefine: true,
    baseUrl: '../',
    paths: {
      proclaim: 'node_modules/proclaim/lib/proclaim',
      mocha: 'node_modules/mocha/mocha'
    },
    shim: {
      proclaim: {
        exports: 'proclaim'
      },
      'mocha': {
        exports: 'mocha',
        init: function(){
          this.mocha.setup({
            ui: 'bdd',
            reporter: getReporter()
          });
          return this.mocha;
        }
      }
    }
  });

  requirejs.onError = function (err) {
    logError(err, 'requierjs.onError');
    throw err;
  };

  // main
  require(
    [
      'mocha',
      'test/lib/caesar-cipher_test',
      'test/lib/caesar-ciphers_test',
      'test/lib/string-utils_test'
    ],
    function(mocha){
      try{
        mocha.run();
      }catch(err){
        logError(err, 'mocha-tests.main');
        throw err;
      }
    }
  );
});

