/* istanbul ignore else */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['../../lib/caesar-ciphers', '../fixture-suite', 'chai'],
  function(caesarCiphers, FixtureSuite, chai) {
    'use strict';

    var expect = chai.expect,
        suite = new FixtureSuite(
          function(cipherName, method, shift, input, done){
            var caesarCipher = new (caesarCiphers.get(cipherName))(shift);
            done(caesarCipher[method](input));
          }
        );

    suite.describeCiphers('api', caesarCiphers.getIds());

    describe('caesarCiphers defaultId', function(){
      it('should be valid', function(){
        expect(caesarCiphers.getIds()).to.include(caesarCiphers.getDefaultId());
      });
    });

    describe('caesarCiphers defaultId', function(){
      it('should reference default implementation', function(){
        var id = caesarCiphers.getDefaultId();
        expect(caesarCiphers.get(id)).to.eql(caesarCiphers.get());
      });
    });

  }
);
