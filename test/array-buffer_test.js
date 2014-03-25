'use strict';

var caesarCipher = require('../lib').ciphers.arrayBuffer;

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

exports['array-buffer'] = {
  setUp: function(done) {
    this.caesarCipher = new caesarCipher();
    done();
  },
  'encrypting a-z patterns should work': function(test) {
    test.expect(6);
    var cc = this.caesarCipher;
    cc.shift = 1;
    test.equal(cc.encrypt('abc'), 'bcd');
    cc.shift = 0;
    test.equal(cc.encrypt('abcdefghijklmnopqrstuvwxyz'),
      'abcdefghijklmnopqrstuvwxyz'
    );
    cc.shift = 1;
    test.equal(cc.encrypt('abcdefghijklmnopqrstuvwxyz'),
      'bcdefghijklmnopqrstuvwxyza'
    );
    cc.shift = 26;
    test.equal(cc.encrypt('abcdefghijklmnopqrstuvwxyz'),
      'abcdefghijklmnopqrstuvwxyz'
    );
    cc.shift = 25;
    test.equal(cc.encrypt('abcdefghijklmnopqrstuvwxyz'),
      'zabcdefghijklmnopqrstuvwxy'
    );
    cc.shift = -1;
    test.equal(cc.encrypt('abcdefghijklmnopqrstuvwxyz'),
      'zabcdefghijklmnopqrstuvwxy'
    );
    test.done();
  },
  'decrypting a-z patterns should work': function(test) {
    test.expect(3);
    var cc = this.caesarCipher;
    cc.shift = 0;
    test.equal(cc.decrypt('abcdefghijklmnopqrstuvwxyz'),
      'abcdefghijklmnopqrstuvwxyz'
    );
    cc.shift = 1;
    test.equal(cc.decrypt('bcd'), 'abc');
    cc.shift = 1;
    test.equal(cc.decrypt('bcdefghijklmnopqrstuvwxyza'),
      'abcdefghijklmnopqrstuvwxyz'
    );
    test.done();
  },
  'encrypting and decrypting email addresses should work': function(test) {
    test.expect(2);
    var cc = this.caesarCipher;
    cc.shift = 1;
    test.equal(cc.encrypt('schnittstabil@example.com'),
      'tdiojuutubcjm@fybnqmf.dpn'
    );
    test.equal(cc.decrypt('tdiojuutubcjm@fybnqmf.dpn'),
      'schnittstabil@example.com'
    );
    test.done();
  },
  'multiple cipher instances should work independent': function(test){
    test.expect(4);
    var cc = this.caesarCipher;
    cc.shift = 1;
    var cc2 = new caesarCipher(3);
    test.equal(cc.encrypt('abc'), 'bcd');
    test.equal(cc2.encrypt('abc'), 'def');
    cc.shift = 3;
    cc2.shift = 1;
    test.equal(cc.encrypt('abc'), 'def');
    test.equal(cc2.encrypt('abc'), 'bcd');
    test.done();
  },
};
