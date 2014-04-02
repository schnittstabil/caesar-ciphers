define(function(){

/* jshint browser: true */
/* global requirejs, TraceKit, reporter */

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
            reporter: reporter
          });
          return this.mocha;
        }
      }
    },
    deps: ['mocha']
  });

  if(typeof TraceKit !== 'undefined'){
    requirejs.onError = function (err) {
      TraceKit.report(err);
    };
  }

  require(
    [
      'test/lib/test-runner'
    ]
  );

});
