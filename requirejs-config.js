requirejs.config({
  paths: {
    proclaim: 'node_modules/proclaim/lib/proclaim',
    mocha: 'node_modules/mocha/mocha'
  },
  shim: {
    proclaim: {
      exports: 'proclaim'
    },
    mocha: {
      exports: 'mocha',
      init: function(){
        this.mocha.setup({
          ui: 'bdd'
        });
        return this.mocha;
      }
    }
  }
});
