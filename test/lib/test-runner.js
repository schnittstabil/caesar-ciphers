/* jshint browser: true */
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
      var failedTests = [];
      var runner = mocha.run();

      runner.on('fail', function logFailure(test, err){
        var flattenTitles = function(test){
          var titles = [];
          while (test.parent.title){
            titles.push(test.parent.title);
            test = test.parent;
          }
          return titles.reverse();
        };

        failedTests.push({
          name: test.title,
          result: false,
          message: err.message,
          stack: err.stack,
          titles: flattenTitles(test)
        });
      });

      runner.on('end', function(){
        var preReports = [],
            reports = failedTests,
            results;
        if(window.mochaResults){
          preReports = window.mochaResults.reports || [];
        }
        results = runner.stats;
        results.reports = preReports.concat(reports);
        results.tests += preReports.length;
        results.failures += preReports.length;
        window.mochaResults = results;
      });

    }catch(err){
      if(typeof TraceKit !== 'undefined'){
        TraceKit.report(err);
      }else{
        throw err;
      }
    }
  }
);
