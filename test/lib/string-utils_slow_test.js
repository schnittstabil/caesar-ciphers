/* istanbul ignore else */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['../../lib/caesar-ciphers/string-utils', 'proclaim'],
  function(stringUtils, proclaim) {
    'use strict';

    /* istanbul ignore else */
    if(typeof Uint16Array === 'function'){
      describe('Converting Uint16Array', function(){
        it('should work for large Buffers', function(){
          var len = 65535*2+1,
              arrayBuffer = new Uint16Array(len),
              strBuffer = '',
              i, c,
              actual;
          for(i=0; i<len; i++){
            c = i%94+32;
            arrayBuffer[i] = c;
            strBuffer += String.fromCharCode(c);
          }

          actual = stringUtils.uint16ArrayToString(arrayBuffer);
          proclaim.strictEqual(actual, strBuffer);
        });
      });
    }

  }
);
