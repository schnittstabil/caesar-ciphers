'use strict';

var caesarCiphers = require('../../lib'),
  fixtures = require('../fixtures'),
  suite = new fixtures.FixtureSuite(
    function(cipherName, method, shift, input, done){
      done(new caesarCiphers.ciphers[cipherName](shift)[method](input));
    }
  );

suite.describeCiphers('api', Object.keys(caesarCiphers.ciphers));
