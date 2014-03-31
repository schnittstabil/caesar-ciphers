'use strict';

var execFile = require('child_process').execFile,
  caesarCiphers = require('../../'),
  FixtureSuite = require('../fixture-suite'),
  expect = require('chai').expect,
  suite = new FixtureSuite(
    function(cipherName, method, shift, input, done){
      var args =  ['--implemenation='+cipherName, '--shift='+shift, method,
                    input];
      execFile('./bin/caesar-ciphers.js', args,
        function(error, stdout, stderr){
          expect(error).to.not.exist;
          expect(stderr).to.be.empty;
          // trim last newline
          stdout = stdout.slice(0,stdout.length-1);
          done(stdout.toString());
        }
      );
    }
  );

suite.describeCiphers('cli', caesarCiphers.getIds());
