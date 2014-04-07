/* istanbul ignore else */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['proclaim', './fixtures'],
  function(proclaim, fixtures) {
    'use strict';

    // Type Definitions:
    /**
     * @callback cipherPromiseBuilder
     * @param cipherName - provided by cipherNames array
     * @param {string} method - 'encrypt' or 'decrypt'
     * @param {number} shift
     * @param {string} input
     * @param {} done - mocha done callback function
     */


     /**
      * @constructor
      * @param {cipherPromiseBuilder} cipherPromiseBuilder
      */
    function FixtureSuite(cipherPromiseBuilder){
      var that = this;

      /** @function */
      that.describeCipherMethod = function(Cipher, method, input, shift,
          output){

        var desc = method + 'ing "' + input + '" with shift ' + shift,
            actual;


        describe(desc, function(){
          beforeEach(function(done){
            cipherPromiseBuilder(Cipher, method, shift, input,
              function(result){
                actual = result;
                done();
              }
            );
          });

          it('should return "' + output + '"', function(){
            proclaim.strictEqual(actual, output);
          });
        });
      };

      that.describeTestFixture = function(Cipher, testFixture){
        that.describeCipherMethod(Cipher, 'encrypt', testFixture.encrypting,
          testFixture.withShift, testFixture.returns);
        that.describeCipherMethod(Cipher, 'decrypt', testFixture.returns,
          testFixture.withShift, testFixture.encrypting);
      };

      that.describeTestFixtures = function(Cipher, testFixtures){
        testFixtures = testFixtures || fixtures.defaults;
        describe(Cipher.id, function(){
          for(var i=0, len=testFixtures.length; i<len; i++){
            that.describeTestFixture(Cipher, testFixtures[i]);
          }
        });
      };

      /**
       * @param {string} description
       * @param {Array.<?>} ciphers
       * @param {testFixtures} testFixtures
       */
      that.describeCiphers = function(description, ciphers, testFixtures){
        testFixtures = testFixtures || fixtures.defaults;
        describe(description, function(){
          var ciphernames = Object.keys(ciphers),
              i, len;
          for(i=0, len= ciphernames.length; i<len; i++){
            that.describeTestFixtures(ciphers[ciphernames[i]]);
          }
        });
      };
    }

    return FixtureSuite;
  }
);
