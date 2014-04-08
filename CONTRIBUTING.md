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

# or start the dev-server and open http://localhost:9999/test/index-spec.html
grunt dev
```
