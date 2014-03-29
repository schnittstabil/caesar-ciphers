'use strict';

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
exports.uint16ArrayToString = function(buffer){
  /* @see {@link https://bugs.webkit.org/show_bug.cgi?id=80797} */
  var ARGS_MAX = 65535,
      len = buffer.length,
      result = '',
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
    result += String.fromCharCode.apply(null, buffer.subarray(startPos,endPos));
    startPos += ARGS_MAX;
  }while(endPos < len);

  return result;
};
