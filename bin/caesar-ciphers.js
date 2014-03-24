#!/usr/bin/env node

'use strict';

var caesarCiphers = require('../lib');

// argv parsing
var argv = require('optimist')
  .usage('Usage: \n'+
         '   $0 encrypt [options] text\n'+
         '   $0 enc     [options] text (same as encrypt)\n'+
         '   $0 decrypt [options] text\n'+
         '   $0 dec     [options] text (same as decrypt)\n')
  .demand(2)
  .alias('s', 'shift')
  .describe('s', 'the shift parameter, i.e. the encryption key')
  .default('s', 1)
  .boolean(['d'])
  .alias('d', 'debug')
  .describe('d', 'set debug mode')
  .check(function(argv){
    // check command
    var command = argv._[0];
    var commands = new Array('enc', 'encrypt', 'dec', 'decrypt');
    if(commands.indexOf(command) === -1){
      var msg = 'unknown command: ' + command;
      throw(msg);
    }
  })
  .argv;

// parsing command
argv.command = argv._[0].substr(0, 3);

// parsing text
argv.text = argv._[1];

// main
try{
  switch(argv.command){
  case 'enc':
    console.log(caesarCiphers.encrypt(argv.shift, argv.text));
    break;
  case 'dec':
    console.log(caesarCiphers.decrypt(argv.shift, argv.text));
    break;
  }
}catch(err){
  if(argv.debug){
    throw err;
  }else{
    console.log(err);
  }
}
