[![Build Status](https://secure.travis-ci.org/schnittstabil/caesar-ciphers.svg)](http://travis-ci.org/schnittstabil/caesar-ciphers) [![Dependency Status](https://david-dm.org/schnittstabil/caesar-ciphers.png)](https://david-dm.org/schnittstabil/caesar-ciphers) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

[![NPM](https://nodei.co/npm/caesar-ciphers.png?mini=true)](https://nodei.co/npm/caesar-ciphers/)

[![Selenium Test Status](https://saucelabs.com/browser-matrix/schnittstabil.svg)](https://saucelabs.com/u/schnittstabil)

caesar-ciphers
==============

[![browser support](https://ci.testling.com/schnittstabil/caesar-ciphers.png)](https://ci.testling.com/schnittstabil/caesar-ciphers)


Multiple implementations of the Caesar Cipher.


Development Stage
-----------------

This software is in [pre-alpha stage](http://en.wikipedia.org/wiki/Software_release_life_cycle#Pre-alpha).


Command Line Interface
----------------------

### Installation

```bash
[sudo] npm install caesar-ciphers -g
```

### Usage

```bash
$ caesar-ciphers --help
Usage:
   caesar-ciphers encrypt [options] text
   caesar-ciphers enc     [options] text (same as encrypt)
   caesar-ciphers decrypt [options] text
   caesar-ciphers dec     [options] text (same as decrypt)
   caesar-ciphers list    [options]      (list implementations)


Options:
  -s, --shift          the shift parameter, i.e. the encryption key  [default: 1]
  -d, --debug          set debug mode
  -i, --implemenation                                                [default: "NodeBuffer"]
```

```bash
$ caesar-ciphers list
Cipher Implementations:
=======================
StringAppend
EffectiveStringBuilding
TypedArrayBuffer
NodeBuffer
```

```bash
$ caesar-ciphers --shift 1 enc abcdef@example.com
bcdefg@fybnqmf.dpn
```

### Removal

```bash
[sudo] npm uninstall caesar-ciphers -g
```

Node.js
-------

### Installation

```bash
npm install caesar-ciphers --save
```

### Usage

```bash
var Cipher = require('caesar-ciphers').defaultCipher;
var cipher = new Cipher(3);
cipher.encrypt('abcdef@example.com');
// retuns 'defghi@hadpsoh.frp'
```

### Removal

```bash
npm uninstall caesar-ciphers
```

License
-------

Copyright (c) 2014 Michael Mayer

Licensed under the MIT license.

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/schnittstabil/caesar-ciphers/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
