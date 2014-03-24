'use strict';

var caesarCiphers = require('../lib/string-append');

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
    test.equal(caesarCiphers.encrypt(1, 'abc'), 'bcd');
    test.equal(
      caesarCiphers.encrypt(0, 'abcdefghijklmnopqrstuvwxyz'),
      'abcdefghijklmnopqrstuvwxyz'
    );
    test.equal(
      caesarCiphers.encrypt(1, 'abcdefghijklmnopqrstuvwxyz'),
      'bcdefghijklmnopqrstuvwxyza'
    );
    test.equal(
      caesarCiphers.encrypt(26, 'abcdefghijklmnopqrstuvwxyz'),
      'abcdefghijklmnopqrstuvwxyz'
    );
    test.done();
  },
  'decrypting a-z patterns should work': function(test) {
    test.expect(2);
    test.equal(
      caesarCiphers.decrypt(0, 'abcdefghijklmnopqrstuvwxyz'),
      'abcdefghijklmnopqrstuvwxyz'
    );
    test.equal(caesarCiphers.decrypt(1, 'bcd'), 'abc');
    test.done();
  },
  'encrypting and decrypting email addresses should work': function(test) {
    test.expect(2);
    test.equal(
      caesarCiphers.encrypt(1, 'schnittstabil@example.com'),
      'tdiojuutubcjm@fybnqmf.dpn'
    );
    test.equal(
      caesarCiphers.decrypt(1, 'tdiojuutubcjm@fybnqmf.dpn'),
      'schnittstabil@example.com'
    );
    test.done();
  },
};
