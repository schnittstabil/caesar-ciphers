#!/usr/bin/env node

'use strict';

var caesarCiphers = require('../lib');

// argv parsing
var argv = require('yargs')
  .usage('Usage: \n'+
         '   $0 encrypt [options] text\n'+
         '   $0 enc     [options] text (same as encrypt)\n'+
         '   $0 decrypt [options] text\n'+
         '   $0 dec     [options] text (same as decrypt)\n'+
         '   $0 list    [options]      (list implementations)\n')
  .demand(1)
  .alias('s', 'shift')
  .describe('s', 'the shift parameter, i.e. the encryption key')
  .default('s', 1)
  .boolean(['d'])
  .alias('d', 'debug')
  .describe('d', 'set debug mode')
  .options('i', {
    alias: 'implemenation',
    default: 'arrayBuffer'
  })
  .check(function(argv){
    // check command
    var command = argv._[0];
    switch(command){
    case 'enc':
    case 'encrypt':
    case 'dec':
    case 'decrypt':
      // parse text
      if(argv._.length < 2){
        throw('Not enough non-option arguments: missing text');
      }
      // parsing text
      argv.text = argv._[1];
      argv.command = command;
      break;
    case 'list':
      argv.command = command;
      break;
    default:
      throw('unknown command: ' + command);
    }
    // check options
    argv.cipher = caesarCiphers.ciphers[argv.implemenation];
    if(typeof argv.cipher === 'undefined'){
      throw('unknown implementation: ' + argv.implemenation);
    }
  })
  .argv;

// main
try{
  switch(argv.command){
  case 'enc':
  case 'encrypt':
    console.log(new argv.cipher(argv.shift).encrypt(argv.text));
    break;
  case 'dec':
  case 'decrypt':
    console.log(new argv.cipher(argv.shift).decrypt(argv.text));
    break;
  case 'list':
    console.log('Cipher Implementations:');
    console.log('=======================');
    Object.keys(caesarCiphers.ciphers).forEach(function(key){
      console.log(key);
    });
    break;
  }
}catch(err){
  if(argv.debug){
    throw err;
  }else{
    console.log(err);
  }
}
