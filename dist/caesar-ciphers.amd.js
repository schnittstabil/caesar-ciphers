/* istanbul ignore else */


define('caesar-ciphers/caesar-cipher',[],function() {
  

  /**
    * @module caesar-ciphers
    */


  /**
    * @class CaesarCipher
    * @constructor
    * @param {number} shift cipher key
    */
  function CaesarCipher(shift) {
    var _shift;

    this.getShift = function(){
      return _shift;
    };

    this.setShift = function(shift){
      if (!/^-?\d+$/.test(shift)) {
        throw 'Shift "' + shift + '" is not an number.';
      }
      _shift = ((shift % 26) + 26) % 26;
      return this;
    };

    this.setShift(shift || 0);
  }

  /**
    * @property id
    * @type String
    * @readOnly
    * @default undefined
    */
  CaesarCipher.id = undefined;
  CaesarCipher.prototype.id = undefined;

  /**
    * @method encrypt
    * @param {string} plaintext string to encrpyt
    * @return {string} encrypted string
    */
  CaesarCipher.prototype.encrypt = function(plaintext) {
    return this.rotate(this.getShift(), String(plaintext));
  };

  /**
    * @method decrypt
    * @param {string} ciphertext string to decrypt
    * @returns {string} decrypted string
    */
  CaesarCipher.prototype.decrypt = function(ciphertext) {
    return this.rotate(26-this.getShift(), String(ciphertext));
  };

  /**
    * @method rotate
    * @param {number} shift shift to rotate
    * @param {string} text string to rotate
    * @return {string}
    */
  CaesarCipher.prototype.rotate = function() {
    throw new Error('must be implemented by subclass!');
  };

  /**
    * @method isSupported
    * @return {boolean}
    */
  CaesarCipher.prototype.isSupported = function() {
    throw new Error('must be implemented by subclass!');
  };

  return CaesarCipher;
});

/* istanbul ignore else */


define('caesar-ciphers/string-append',['./caesar-cipher'], function (CaesarCipher) {
  

  /**
    * @module caesar-ciphers
    */


  /**
    * @class StringAppend
    * @constructor
    * @extends CaesarCipher
    * @param {number} shift cipher key
    */
  function StringAppend(shift) {
    CaesarCipher.call(this, shift);
  }

  // LEGACY CHECK
  if(typeof Object.create === 'function'){
    StringAppend.prototype = Object.create(CaesarCipher.prototype);
  }else{
    // IE6, Safari4 etc
    StringAppend.prototype = new CaesarCipher();
  }

  /**
    * @property id
    * @type String
    * @default 'StringAppend'
    * @readOnly
    */
  StringAppend.id = 'StringAppend';
  StringAppend.prototype.id = 'StringAppend';

  StringAppend.prototype.rotate = function(shift, text) {
    var buffer = '',
        i, len, c;

    for (i = 0, len = text.length; i < len; i++) {
      c = text.charCodeAt(i);

      if (c>64 && c<91) {
        // upper case
        buffer += String.fromCharCode(((c - 65 + shift) % 26) + 65);
      } else if (c>96 && c<123) {
        // lower case
        buffer += String.fromCharCode(((c - 97 + shift) % 26) + 97);
      } else {
        buffer += String.fromCharCode(c);
      }
    }
    return buffer;
  };

  StringAppend.isSupported = function() {
    return true;
  };

  return StringAppend;
});

/* istanbul ignore else */


define('caesar-ciphers/effective-string-building',['./caesar-cipher'], function(CaesarCipher) {
  

  /**
    * @module caesar-ciphers
    */


  /* jshint -W101 */
  /**
    * see http://trephine.org/t/index.php?title=Efficient_JavaScript_string_building
    *
    * @class EffectiveStringBuilding
    * @constructor
    * @extends CaesarCipher
    * @param {number} shift cipher key
    */
  /* jshint +W101 */
  function EffectiveStringBuilding(shift) {
    CaesarCipher.call(this, shift);
  }

  // LEGACY CHECK
  if(typeof Object.create === 'function'){
    EffectiveStringBuilding.prototype = Object.create(CaesarCipher.prototype);
  }else{
    // IE6, Safari4 etc
    EffectiveStringBuilding.prototype = new CaesarCipher();
  }

  /**
    * @property id
    * @type String
    * @default 'EffectiveStringBuilding'
    * @readOnly
    */
  EffectiveStringBuilding.id = 'EffectiveStringBuilding';
  EffectiveStringBuilding.prototype.id = 'EffectiveStringBuilding';

  EffectiveStringBuilding.prototype.rotate = function(shift, text) {
    var len = text.length,
      buffer = new Array(len),
      i, c;

    for (i = 0; i < len; i++) {
      c = text.charCodeAt(i);

      if (c>64 && c<91) {
        // upper case
        buffer[i] = String.fromCharCode(((c - 65 + shift) % 26) + 65);
      } else if (c>96 && c<123) {
        // lower case
        buffer[i] = String.fromCharCode(((c - 97 + shift) % 26) + 97);
      } else {
        buffer[i] = String.fromCharCode(c);
      }
    }
    return buffer.join('');
  };

  EffectiveStringBuilding.isSupported = function() {
    return true;
  };

  return EffectiveStringBuilding;
});

/* istanbul ignore else */


define('caesar-ciphers/string-utils',[],function () {
  

  /**
    * @module string-utils
    */


  /* jshint -W101 */
  /**
    * Returns the string represented by a buffer
    *
    * @see {@link http://updates.html5rocks.com/2012/06/How-to-convert-ArrayBuffer-to-and-from-String}
    *
    * @param {Uint16Array} buffer - buffer to convert
    * @returns {string} representation of buffer
    */
  /* jshint +W101 */
  function uint16ArrayToString(buffer){
    /* @see {@link https://bugs.webkit.org/show_bug.cgi?id=80797} */
    var ARGS_MAX = 65535,
        len = buffer.length,
        buf = '',
        startPos = 0,
        endPos = 0;

    if(len <= ARGS_MAX){
      return String.fromCharCode.apply(null, buffer);
    }

    do{
      if(endPos>len){
        endPos=len;
      }else{
        endPos+=ARGS_MAX;
      }
      buf += String.fromCharCode.apply(null, buffer.subarray(startPos,endPos));
      startPos += ARGS_MAX;
    }while(endPos < len);

    return buf;
  }

  uint16ArrayToString.isSupported = function isSupported(){
    try{
      return String.fromCharCode.apply(null, new Uint16Array()) === '';
    }catch(err){
      return false;
    }
  };

  return {
    uint16ArrayToString: uint16ArrayToString
  };
});

/* istanbul ignore else */


define('caesar-ciphers/typed-array-buffer',['./caesar-cipher', './string-utils'],
  function (CaesarCipher, stringUtils) {
    

    /**
      * @module caesar-ciphers
      */

    /**
      * IE >= v10.0; Firefox >= v4.0; Chrome v7.0; Safari >=v5.1
      *
      * see link http://www.khronos.org/registry/typedarray/specs/latest/
      *
      * and http://caniuse.com/typedarrays
      *
      * @class TypedArrayBuffer
      * @constructor
      * @extends CaesarCipher
      * @param {number} shift cipher key
      */
    function TypedArrayBuffer(shift) {
      CaesarCipher.call(this, shift);
    }

    // LEGACY CHECK
    if(typeof Object.create === 'function'){
      TypedArrayBuffer.prototype = Object.create(CaesarCipher.prototype);
    }else{
      // IE6, Safari4 etc
      TypedArrayBuffer.prototype = new CaesarCipher();
    }

    /**
      * @property id
      * @type String
      * @default 'TypedArrayBuffer'
      * @readOnly
      */
    TypedArrayBuffer.id = 'TypedArrayBuffer';
    TypedArrayBuffer.prototype.id = 'TypedArrayBuffer';

    TypedArrayBuffer.prototype.rotate = function(shift, text) {
      var len = text.length,
          buffer = new Uint16Array(len),
          i, c;

      for (i = 0; i < len; i++) {
        c = text.charCodeAt(i);

        if (c>64 && c<91) {
          // upper case
          buffer[i] = ((c - 65 + shift) % 26) + 65;
        } else if (c>96 && c<123) {
          // lower case
          buffer[i] = ((c - 97 + shift) % 26) + 97;
        } else {
          buffer[i] = c;
        }
      }
      return stringUtils.uint16ArrayToString(buffer);
    };

    TypedArrayBuffer.isSupported = function() {
      return stringUtils.uint16ArrayToString.isSupported();
    };

    return TypedArrayBuffer;
  }
);

/* istanbul ignore else */


define('caesar-ciphers/node-buffer',['./caesar-cipher'], function (CaesarCipher) {
  

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
  if(typeof Object.create === 'function'){
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

  NodeBuffer.isSupported = function() {
    try{
      var buffer = new Buffer('A', 'utf16le');
      return buffer.readUInt16LE(0) === 65;
    }catch(e){
      return false;
    }
    return typeof Buffer === 'function';
  };

  return NodeBuffer;
});

/* istanbul ignore else */


/**
 * @module caesar-ciphers
 * @main caesar-ciphers
 */

define(
  'caesar-ciphers',[
    './caesar-ciphers/string-append',
    './caesar-ciphers/effective-string-building',
    './caesar-ciphers/typed-array-buffer',
    './caesar-ciphers/node-buffer'
  ],
  function (StringAppend, EffectiveStringBuilding,
    TypedArrayBuffer, NodeBuffer) {
    

    /**
      * @module caesar-ciphers
      */


    var implModules = [
      // default: last one wins
      StringAppend,
      EffectiveStringBuilding,
      TypedArrayBuffer,
      NodeBuffer
    ],
    ciphers = {},
    supportedCiphers = {},
    defaultCipher,
    i, len, impl;

    // init cipherIds and defaultId
    for(i=0, len = implModules.length; i<len; i++){
      impl = implModules[i];
      ciphers[impl.id] = impl;
      if(impl.isSupported()){
        supportedCiphers[impl.id] = impl;
        defaultCipher = impl;
      }
    }

    return {
      ciphers: ciphers,
      supportedCiphers: supportedCiphers,
      defaultCipher: defaultCipher
    };
  }
);

