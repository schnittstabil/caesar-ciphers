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
  * @param {string} startChar
  * @param {string} endChar
  * @returns {string} startChar..endChar
  */
function charRange(startChar, endChar){
  var buf = '',
    start = startChar.charCodeAt(0),
    end = endChar.charCodeAt(0),
    i;

  for(i=start; i<=end; i++){
    buf += String.fromCharCode(i);
  }

  return buf;
}

var assert = require('assert'),
  defaultTestFixtures = [
    // {
    //   encrypting: ' ',
    //   withShift: 1,
    //   returns: ' '
    // },
    // {
    //   encrypting: '',
    //   withShift: 13,
    //   returns: ''
    // },
    // {
    //   encrypting: charRange('a','z'),
    //   withShift: 1,
    //   returns: charRange('b','z')+'a'
    // },
    // {
    //   encrypting: charRange('a','z'),
    //   withShift: 26,
    //   returns: charRange('a','z')
    // },
    {
      encrypting: 'bcd',
      withShift: -1,
      returns: 'abc'
    },
    // {
    //   encrypting: ' ' + charRange('A','Z') + ' ',
    //   withShift: 1,
    //   returns: ' ' + charRange('B','Z')+'A '
    // },
    {
      encrypting: 'user@example.com',
      withShift: 1,
      returns: 'vtfs@fybnqmf.dpn'
    },
    {
      encrypting: '\uD834\uDF06',
      withShift: 1,
      returns: '\uD834\uDF06'
    },
    {
      encrypting: 'latinкирилицаαβγδεζηあいうえお',
      withShift: 1,
      returns: 'mbujoкирилицаαβγδεζηあいうえお'
    },
  ];


 /**
  * @constructor
  * @param {cipherPromiseBuilder} cipherPromiseBuilder
  */
function FixtureSuite(cipherPromiseBuilder){
  var that = this;

  that.testFixtures = defaultTestFixtures;

  /** @function */
  that.describeCipherMethod = function(cipherName, method,
    input, shift, output){

    var desc = method + 'ing "' + input + '" with shift ' + shift,
        actual;

    before(function(done){
      cipherPromiseBuilder(cipherName, method, shift, input,
        function(result){
          actual = result;
          done();
        }
      );
    });

    describe(desc, function(){
      it('should return "' + output + '"', function(){
        assert.equal(actual, output);
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
    testFixtures = testFixtures || defaultTestFixtures;
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
    testFixtures = testFixtures || defaultTestFixtures;
    describe(description, function(){
      for(var i=0, len=cipherNames.length; i<len; i++){
        that.describeTestFixtures(cipherNames[i]);
      }
    });
  };
}

exports.charRange = charRange;
exports.defaultTestFixtures = defaultTestFixtures;
exports.FixtureSuite = FixtureSuite;
