/* jshint browser: true */
/* global mocha */
window.onerror = function logError() {
  var args = Array.prototype.slice.call(arguments, 0);
  args.push(document.location.href);
  args.push(navigator.userAgent);
  console.log(args.join('\n\n') + '\n\n\n\n');
};

/* jshint -W098 */
function runMocha(reporter){
  /* jshint +W098 */
  reporter = reporter || 'tap';
  mocha.setup({
    ui: 'bdd',
    reporter: reporter
  });

  require([
      'test/lib/caesar-cipher_test',
      'test/lib/caesar-ciphers_test',
      'test/lib/string-utils_test'
    ], function(){
      try{
        mocha.run();
      }catch(err){
        var msg = [];
        if(err.name)        { msg.push('Name: ' + err.name); }
        if(err.message)     { msg.push('Message: ' + err.message); }
        if(err.fileName)    { msg.push('Filename: + ' + err.fileName); }
        if(err.lineNumber)  { msg.push('Line: + ' + err.lineNumber); }
        if(err.columnNumber){ msg.push('Column: + ' + err.columnNumber); }
        if(err.stack)       { msg.push('Stack: + ' + err.stack); }
        console.log(msg.join('\t'));
        throw err;
      }
    }
  );
}


