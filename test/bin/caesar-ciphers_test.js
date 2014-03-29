'use strict';

var execFile = require('child_process').execFile,
  caesarCiphers = require('../../'),
  fixtures = require('../fixtures'),
  assert = require('assert'),
  suite = new fixtures.FixtureSuite(
    function(cipherName, method, shift, input, done){
      var args =  ['--implemenation='+cipherName, '--shift='+shift, method,
                    input];
      execFile('./bin/caesar-ciphers.js', args,
        function(error, stdout, stderr){
          assert.ifError(stderr);
          // trim last newline
          stdout = stdout.slice(0,stdout.length-1);
          done(stdout.toString());
        }
      );
    }
  );

suite.describeCiphers('cli', Object.keys(caesarCiphers.ciphers));
