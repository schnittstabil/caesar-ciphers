/* istanbul ignore else */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['../../lib/caesar-cipher', 'chai'],
  function(CaesarCipher, chai) {
    'use strict';
    var expect = chai.expect;

    describe('Constructing Cipher', function(){

      describe('with string shift', function(){
        it('should throw an exception', function(){
          expect(function(){
            new CaesarCipher('xx');
          }).to.throw();
        });
      });


      it('should not implement rotate', function(){
        expect(function(){
          new CaesarCipher().rotate();
        }).to.throw(/implemented/);
      });

      it('should not implement isEnabled', function(){
        expect(function(){
          new CaesarCipher().isEnabled();
        }).to.throw(/implemented/);
      });
    });

  }
);
