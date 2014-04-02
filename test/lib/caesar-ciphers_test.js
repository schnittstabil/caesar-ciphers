/* istanbul ignore else */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['../../lib/caesar-ciphers', '../fixture-suite', 'proclaim'],
  function(caesarCiphers, FixtureSuite, proclaim) {
    'use strict';

    var suite = new FixtureSuite(
          function(cipherName, method, shift, input, done){
            var caesarCipher = new (caesarCiphers.get(cipherName))(shift);
            done(caesarCipher[method](input));
          }
        );

    suite.describeCiphers('api', caesarCiphers.getIds());

    describe('caesarCiphers defaultId', function(){
      it('should be valid', function(){
        proclaim.includes(caesarCiphers.getIds(), caesarCiphers.getDefaultId());
      });
    });

    describe('caesarCiphers defaultId', function(){
      it('should reference default implementation', function(){
        var id = caesarCiphers.getDefaultId();
        proclaim.equal(caesarCiphers.get(id), caesarCiphers.get());
      });
    });

    describe('id of caesarCiphers default implementation', function(){
      it('should equals caesarCiphers defaultId', function(){
        proclaim.equal(caesarCiphers.get().id, caesarCiphers.getDefaultId());
      });
    });
  }
);
