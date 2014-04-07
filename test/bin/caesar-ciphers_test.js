'use strict';

var execFile = require('child_process').execFile,
  caesarCiphers = require('../../'),
  FixtureSuite = require('../fixture-suite'),
  proclaim = require('proclaim'),
  suite = new FixtureSuite(
    function(Cipher, method, shift, input, done){
      var args =  ['--implemenation='+Cipher.id, '--shift='+shift, method,
                    input];
      execFile('./bin/caesar-ciphers.js', args,
        function(error, stdout, stderr){
          proclaim.notOk(error);
          proclaim.notOk(stderr);
          // trim last newline
          stdout = stdout.slice(0,stdout.length-1);
          done(stdout.toString());
        }
      );
    }
  );

suite.describeCiphers('cli', caesarCiphers.supportedCiphers);
