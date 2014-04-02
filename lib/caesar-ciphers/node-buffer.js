/* istanbul ignore else */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['./caesar-cipher'], function (CaesarCipher) {
  'use strict';

  /**
    * @module caesar-ciphers
    */


  /**
    * @class NodeBuffer
    * @constructor
    * @extends CaesarCipher
    * @param {number} shift cipher key
    */
  function NodeBuffer(shift) {
    CaesarCipher.call(this, shift);
  }

  // LEGACY CHECK
  if(typeof Object.defineProperty === 'function'){
    NodeBuffer.prototype = Object.create(CaesarCipher.prototype);
  }else{
    // IE6, Safari4 etc
    NodeBuffer.prototype = new CaesarCipher();
  }

  /**
    * @property id
    * @type String
    * @default 'NodeBuffer'
    * @readOnly
    */
  NodeBuffer.id = 'NodeBuffer';
  NodeBuffer.prototype.id = 'NodeBuffer';

  NodeBuffer.prototype.rotate = function(shift, text) {
    var buffer = new Buffer(text, 'utf16le'),
        i, len, c;

    for (i = 0, len = buffer.length; i < len; i+=2) {
      c = buffer.readUInt16LE(i);
      if (c>64 && c<91) {
        // upper case
        c = ((c - 65 + shift) % 26) + 65;
      } else if (c>96 && c<123) {
        // lower case
        c = ((c - 97 + shift) % 26) + 97;
      }
      buffer.writeUInt16LE(c,i);
    }
    return buffer.toString('utf16le');
  };

  NodeBuffer.isEnabled = function() {
    return typeof Buffer === 'function';
  };

  return NodeBuffer;
});
