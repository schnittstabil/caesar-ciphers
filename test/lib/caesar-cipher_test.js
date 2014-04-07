/* istanbul ignore else */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['../../lib/caesar-ciphers/caesar-cipher', 'proclaim', 'mocha'],
  function(CaesarCipher, proclaim) {
    'use strict';

    describe('Constructing Cipher', function(){

      describe('with string shift', function(){
        it('should throw an exception', function(){
          proclaim.throws(
            function(){
              new CaesarCipher('xx');
            }
          );
        });
        it('the setter should throw an exception', function(){
          proclaim.throws(
            function(){
              new CaesarCipher().setShift('yy');
            }
          );
        });
      });


      it('should not implement rotate', function(){
        proclaim.throws(
          function(){
            new CaesarCipher().rotate();
          },
          /implemented/
        );
      });

      it('should not implement isSupported', function(){
        proclaim.throws(
          function(){
            new CaesarCipher().isSupported();
          },
          /implemented/
        );
      });
    });

  }
);
