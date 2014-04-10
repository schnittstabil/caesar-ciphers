// bootstrap: @see https://github.com/umdjs/umd

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(function() {
      return (root.caesarCiphers = factory());
    });
  } else {
    // Browser globals
    root.caesarCiphers = factory();
  }
}(this, function () {
/**
 * @license almond 0.2.9 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req, makeMap, handlers,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        hasOwn = Object.prototype.hasOwnProperty,
        aps = [].slice,
        jsSuffixRegExp = /\.js$/;

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap, lastIndex,
            foundI, foundStarMap, starI, i, j, part,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name && name.charAt(0) === ".") {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that "directory" and not name of the baseName's
                //module. For instance, baseName of "one/two/three", maps to
                //"one/two/three.js", but we want the directory, "one/two" for
                //this normalization.
                baseParts = baseParts.slice(0, baseParts.length - 1);
                name = name.split('/');
                lastIndex = name.length - 1;

                // Node .js allowance:
                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                }

                name = baseParts.concat(name);

                //start trimDots
                for (i = 0; i < name.length; i += 1) {
                    part = name[i];
                    if (part === ".") {
                        name.splice(i, 1);
                        i -= 1;
                    } else if (part === "..") {
                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                            //End of the line. Keep at least one non-dot
                            //path segment at the front so it can be mapped
                            //correctly to disk. Otherwise, there is likely
                            //no path mapping for a path starting with '..'.
                            //This can still fail, but catches the most reasonable
                            //uses of ..
                            break;
                        } else if (i > 0) {
                            name.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
                //end trimDots

                name = name.join("/");
            } else if (name.indexOf('./') === 0) {
                // No baseName, so this is ID is resolved relative
                // to baseUrl, pull off the leading dot.
                name = name.substring(2);
            }
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            return req.apply(undef, aps.call(arguments, 0).concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (hasProp(waiting, name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!hasProp(defined, name) && !hasProp(defining, name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) {
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        }
        return [prefix, name];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relName) {
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0];

        name = parts[1];

        if (prefix) {
            prefix = normalize(prefix, relName);
            plugin = callDep(prefix);
        }

        //Normalize according
        if (prefix) {
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
            } else {
                name = normalize(name, relName);
            }
        } else {
            name = normalize(name, relName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) {
                plugin = callDep(prefix);
            }
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        };
    };

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    handlers = {
        require: function (name) {
            return makeRequire(name);
        },
        exports: function (name) {
            var e = defined[name];
            if (typeof e !== 'undefined') {
                return e;
            } else {
                return (defined[name] = {});
            }
        },
        module: function (name) {
            return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            };
        }
    };

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i,
            args = [],
            callbackType = typeof callback,
            usingExports;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (callbackType === 'undefined' || callbackType === 'function') {
            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = handlers.require(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) ||
                           hasProp(waiting, depName) ||
                           hasProp(defining, depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback ? callback.apply(defined[name], args) : undefined;

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
            }
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (config.deps) {
                req(config.deps, config.callback);
            }
            if (!callback) {
                return;
            }

            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            //Using a non-zero value because of concern for what old browsers
            //do, and latest browsers "upgrade" to 4 if lower value is used:
            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
            //If want a value immediately, use require('id') instead -- something
            //that works in almond on the global level, but not guaranteed and
            //unlikely to work in other AMD implementations.
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 4);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        return req(cfg);
    };

    /**
     * Expose module registry for debugging and tooling
     */
    requirejs._defined = defined;

    define = function (name, deps, callback) {

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
            waiting[name] = [name, deps, callback];
        }
    };

    define.amd = {
        jQuery: true
    };
}());

define("../node_modules/almond/almond", function(){});

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

  return require('caesar-ciphers');
}));
