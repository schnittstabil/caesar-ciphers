/* istanbul ignore else */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['../../lib/caesar-ciphers', '../fixture-suite', 'proclaim', 'mocha'],
  function(caesarCiphers, FixtureSuite, proclaim) {
    'use strict';

    var suite = new FixtureSuite(
          function(Cipher, method, shift, input, done){
            var caesarCipher = new Cipher(shift);
            done(caesarCipher[method](input));
          }
        );

    suite.describeCiphers('api', caesarCiphers.supportedCiphers);

    describe('caesarCiphers defaultCipher', function(){
      it('should be supported by the environment', function(){
        proclaim.ok(caesarCiphers.defaultCipher.isSupported());
      });
    });
  }
);
