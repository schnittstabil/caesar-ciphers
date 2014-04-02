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
    enabledImpl = {},
    cipherIds = [],
    defaultId,
    i, len, impl;

    // init cipherIds and defaultId
    for(i=0, len = implModules.length; i<len; i++){
      impl = implModules[i];
      enabledImpl[impl.id] = impl;
      if(impl.isEnabled()){
        cipherIds.push(impl.id);
        defaultId = impl.id;
      }
    }

    return {
      get: function(id){
        id = id || defaultId;
        return enabledImpl[id];
      },
      getIds: function(){
        return cipherIds;
      },
      getDefaultId: function(){
        return defaultId;
      }
    };
  }
);
