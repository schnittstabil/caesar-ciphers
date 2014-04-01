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
      that.describeCipherMethod = function(cipherName, method,
        input, shift, output){

        var desc = method + 'ing "' + input + '" with shift ' + shift,
            actual;


        describe(desc, function(){
          beforeEach(function(done){
            cipherPromiseBuilder(cipherName, method, shift, input,
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

      that.describeTestFixture = function(cipherName, testFixture){
        that.describeCipherMethod(cipherName, 'encrypt', testFixture.encrypting,
          testFixture.withShift, testFixture.returns);
        that.describeCipherMethod(cipherName, 'decrypt', testFixture.returns,
          testFixture.withShift, testFixture.encrypting);
      };

      that.describeTestFixtures = function(cipherName, testFixtures){
        testFixtures = testFixtures || fixtures.defaults;
        describe(cipherName, function(){
          for(var i=0, len=testFixtures.length; i<len; i++){
            that.describeTestFixture(cipherName, testFixtures[i]);
          }
        });
      };

      /**
       * @param {string} description
       * @param {Array.<?>} cipherNames
       * @param {testFixtures} testFixtures
       */
      that.describeCiphers = function(description, cipherNames, testFixtures){
        testFixtures = testFixtures || fixtures.defaults;
        describe(description, function(){
          for(var i=0, len=cipherNames.length; i<len; i++){
            that.describeTestFixtures(cipherNames[i]);
          }
        });
      };
    }

    return FixtureSuite;
  }
);
