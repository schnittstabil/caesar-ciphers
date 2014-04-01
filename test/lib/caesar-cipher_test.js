/* istanbul ignore else */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['../../lib/caesar-cipher', 'proclaim', 'mocha'],
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
      });


      it('should not implement rotate', function(){
        proclaim.throws(
          function(){
            new CaesarCipher().rotate();
          },
          /implemented/
        );
      });

      it('should not implement isEnabled', function(){
        proclaim.throws(
          function(){
            new CaesarCipher().isEnabled();
          },
          /implemented/
        );
      });
    });

  }
);
