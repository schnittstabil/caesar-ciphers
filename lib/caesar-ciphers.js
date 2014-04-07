/* istanbul ignore else */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

/**
 * @module caesar-ciphers
 * @main caesar-ciphers
 */

define(
  [
    './caesar-ciphers/string-append',
    './caesar-ciphers/effective-string-building',
    './caesar-ciphers/typed-array-buffer',
    './caesar-ciphers/node-buffer'
  ],
  function (StringAppend, EffectiveStringBuilding,
    TypedArrayBuffer, NodeBuffer) {
    'use strict';

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
