/* jshint browser: true */
/* global TraceKit */

var reporter = (function(){
        var scripts = document.getElementsByTagName('script'),
            script = scripts[scripts.length-1];
        return script.getAttribute('data-reporter') || 'tap';
      })();

function log(data){
  if(typeof data !== 'string'){
    data = JSON.stringify(data, null, 2);
  }
  switch(reporter){
    case 'tap':
      console.log('# ' + data.replace(/\n/g, '\n# '));
      break;
    default:
      console.log(data);
  }
}

TraceKit.report.subscribe(log);

function logOnError() {
  var args, argNames, msg, i, len, argName;
  args = Array.prototype.slice.call(arguments, 0);
  argNames = [
    'Message:     ',
    'Url:         ',
    'Line Number: '
  ];
  msg = ['**************** +logOnError+ ****************'];

  for(i=0, len = args.length; i<len; i++){
    argName = argNames[i] || 'unknown';
    msg.push('  ' + argName + ': ' + args[i]);
  }

  msg.push('  href:        ' + document.location.href);
  msg.push('  userAgent:   ' + navigator.userAgent);
  msg.push('**************** -logOnError- ****************');
  log(msg.join('\n\n'));
}

window.onerror = logOnError;
