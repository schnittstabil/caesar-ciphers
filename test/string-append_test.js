'use strict';

var caesarCiphers = require('../lib').ciphers.stringAppend;

/*
======== A Handy Little Nodeunit Reference ========
https://github.com/caolan/nodeunit

Test methods:
test.expect(numAssertions)
test.done()
Test assertions:
test.ok(value, [message])
test.equal(actual, expected, [message])
test.notEqual(actual, expected, [message])
test.deepEqual(actual, expected, [message])
test.notDeepEqual(actual, expected, [message])
test.strictEqual(actual, expected, [message])
test.notStrictEqual(actual, expected, [message])
test.throws(block, [error], [message])
test.doesNotThrow(block, [error], [message])
test.ifError(value)
*/

exports['string-append'] = {
  setUp: function(done) {
    done();
  },
  'encrypting a-z patterns should work': function(test) {
    test.expect(4);
    test.equal(new caesarCiphers(1).encrypt('abc'), 'bcd');
    test.equal(
      new caesarCiphers(0).encrypt('abcdefghijklmnopqrstuvwxyz'),
      'abcdefghijklmnopqrstuvwxyz'
    );
    test.equal(
      new caesarCiphers(1).encrypt('abcdefghijklmnopqrstuvwxyz'),
      'bcdefghijklmnopqrstuvwxyza'
    );
    test.equal(
      new caesarCiphers(26).encrypt('abcdefghijklmnopqrstuvwxyz'),
      'abcdefghijklmnopqrstuvwxyz'
    );
    test.done();
  },
  'decrypting a-z patterns should work': function(test) {
    test.expect(2);
    test.equal(
      new caesarCiphers(0).decrypt('abcdefghijklmnopqrstuvwxyz'),
      'abcdefghijklmnopqrstuvwxyz'
    );
    test.equal(new caesarCiphers(1).decrypt('bcd'), 'abc');
    test.done();
  },
  'encrypting and decrypting email addresses should work': function(test) {
    test.expect(2);
    test.equal(
      new caesarCiphers(1).encrypt('schnittstabil@example.com'),
      'tdiojuutubcjm@fybnqmf.dpn'
    );
    test.equal(
      new caesarCiphers(1).decrypt('tdiojuutubcjm@fybnqmf.dpn'),
      'schnittstabil@example.com'
    );
    test.done();
  },
};
