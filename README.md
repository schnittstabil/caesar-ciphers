[![Build Status](https://secure.travis-ci.org/schnittstabil/caesar-ciphers.svg)](http://travis-ci.org/schnittstabil/caesar-ciphers) [![Dependency Status](https://david-dm.org/schnittstabil/caesar-ciphers.png)](https://david-dm.org/schnittstabil/caesar-ciphers) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/) [![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/schnittstabil/caesar-ciphers/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

caesar-ciphers
==============

[![browser support](https://ci.testling.com/schnittstabil/caesar-ciphers.png)](https://ci.testling.com/schnittstabil/caesar-ciphers)


Multiple implementations of the Caesar Cipher.


Development Stage
-----------------

This software is in [pre-alpha stage](http://en.wikipedia.org/wiki/Software_release_life_cycle#Pre-alpha).


How to build your own Caesar Ciphers
------------------------------------

Get the source:

```bash
git clone git@github.com:schnittstabil/caesar-ciphers.git
```

Enter the directory and install the dependencies:

```bash
cd caesar-ciphers
npm install
```

If necessary, also install grunt:

```bash
npm install -g grunt-cli
```

Setup the git hooks with grunt:

```bash
grunt githooks
```

Run the tests:

```bash
grunt test
```

And at very the end:

```bash
# build with grunt
grunt

# or auto-build whenever watched files change
grunt watch

# or start the dev-server and open http://localhost:8080/
grunt dev-server
```


License
-------

Copyright (c) 2014 Michael Mayer

Licensed under the MIT license.
