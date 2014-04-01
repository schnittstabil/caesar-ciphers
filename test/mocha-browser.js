/* jshint browser: true */
/* global requirejs, mocha */
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
  if(err.stack)         { msg.push('Stack:          ' + err.stack); }
  console.log(msg.join('\n') + '\n\n\n\n');
}

try{
  (function(exports){
    'use strict';

    function runTests(tests){
      var dependencies = Array.prototype.slice.call(tests, 0);
      dependencies.unshift('mocha');
      require(dependencies, function(mocha){
        try{
          mocha.run();
        }catch(err){
          logError(err, 'mocha-browser.runTests');
          throw err;
        }
      });
    }

    exports.runMocha = function(tests, reporter){

      reporter = reporter || 'tap';

      requirejs.config({
        //enforceDefine: true,
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
            init: function(){
              mocha.setup({
                ui: 'bdd',
                reporter: reporter
              });
              return this.mocha;
            }
          }
        },
        callback: function(){
          runTests(tests);
        }
      });

      requirejs.onError = function (err) {
        logError(err, 'requierjs.onError');
        throw err;
      };
    };
  })(this);
}catch(err){
  logError(err, 'mocha-browser');
  throw err;
}

