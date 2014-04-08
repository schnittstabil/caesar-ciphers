/* jshint browser: true */
/* global TraceKit */

var reporter = (function(){
        var scripts = document.getElementsByTagName('script'),
            script = scripts[scripts.length-1];
        return script.getAttribute('data-reporter') || 'tap';
      })();


// fake sauce labs setup for early logging script errors
function appendMochaReport(report){
  if(window.mochaResults){
    window.mochaResults.reports.push(report);
    window.mochaResults.tests++;
    window.mochaResults.failures++;
  }else{
    window.mochaResults = {
      start: new Date(),
      end: new Date(),
      duration: 0,
      reports: [report],
      suites: 0,
      tests: 1,
      passes: 0,
      pending: 0,
      failures: 1
    };
  }
}

function log(data){
  var name = data.name || 'log()',
      title = data.message || 'unknown',
      stack = data.stack || title;
  if(typeof data !== 'string'){
    data = JSON.stringify(data, null, 2);
  }

  // sauce labs logging
  appendMochaReport({
    name: name,
    result: false,
    message: data,
    stack: JSON.stringify(stack, null, 2),
    titles: [title]
  });

  // test logging
  switch(reporter){
    case 'tap':
      console.log('# ' + data.replace(/\n/g, '\n# '));
      break;
    default:
      console.log(data);
  }
}

TraceKit.report.subscribe(log);

function logOnError(message, url, line) {
  var args = Array.prototype.slice.call(arguments, 3),
      stack = {
        url: url,
        func: 'window.onerror',
        line: line,
        column: args.length>0 ? args[0] : null,
        context: null,
        href: document.location.href,
        userAgent: navigator.userAgent
      },
      entry = {
        message: message,
        name: message,
        stack: [stack]
      };

  if(args.length > 2){
    try{
      TraceKit.report(args[1]);
    }catch(err){
    }
  }

  log(entry);
}

window.onerror = logOnError;
