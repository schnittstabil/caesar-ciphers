'use strict';

var assert = require('assert'),
    CaesarCipher = require('../../lib/caesar-cipher');

describe('Constructing an Cipher with string shift', function(){
  it('should throw an exception', function(){
    assert.throws(function(){
      new CaesarCipher('xx');
    });
  });
});
