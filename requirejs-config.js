requirejs.config({
  paths: {
    chai: 'node_modules/chai/chai',
  //   mocha: 'node_modules/mocha/mocha'
  },
  shim: {
    'chai':{
      exports: 'chai'
    }
  }
});
