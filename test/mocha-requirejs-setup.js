define(function(){

/* jshint browser: true */
/* global requirejs, TraceKit, reporter */

  // requirejs setup
  if(typeof TraceKit !== 'undefined'){
    requirejs.onError = function requirejsOnError(err){
      TraceKit.report(err);
    };
  }

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
            reporter: reporter
          });
          return this.mocha;
        }
      }
    },
    deps: ['mocha']
  });

  require(
    [
      'test/lib/test-runner'
    ]
  );
});
