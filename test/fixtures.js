/* istanbul ignore else */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
  function() {
    'use strict';


    /**
      * @param {string} startChar
      * @param {string} endChar
      * @returns {string} startChar..endChar
      */
    function charRange(startChar, endChar){
      var buf = '',
        start = startChar.charCodeAt(0),
        end = endChar.charCodeAt(0),
        i;

      for(i=start; i<=end; i++){
        buf += String.fromCharCode(i);
      }

      return buf;
    }


    var tests = {
      defaults: [],
      full: []
    };

    tests.defaults = [
      {
        encrypting: 'bcd',
        withShift: -1,
        returns: 'abc'
      },
      {
        encrypting: '1',
        withShift: 1,
        returns: '1'
      },
      {
        encrypting: ' ' + charRange('A','Z') + ' ' + charRange('a','z') + ' ',
        withShift: 1,
        returns: ' ' + charRange('B','Z')+'A ' + charRange('b','z') + 'a '
      },
      {
        encrypting: 'user@example.com',
        withShift: 1,
        returns: 'vtfs@fybnqmf.dpn'
      },
      {
        encrypting: '\uD834\uDF06',
        withShift: 1,
        returns: '\uD834\uDF06'
      },
      {
        encrypting: 'latinкирилицаαβγδεζηあいうえお',
        withShift: 1,
        returns: 'mbujoкирилицаαβγδεζηあいうえお'
      }
    ];

    tests.full = tests.defaults.concat([
      {
        encrypting: ' ',
        withShift: 1,
        returns: ' '
      },
      {
        encrypting: '',
        withShift: 13,
        returns: ''
      },
      {
        encrypting: charRange('a','z'),
        withShift: 1,
        returns: charRange('b','z')+'a'
      },
      {
        encrypting: charRange('a','z'),
        withShift: 26,
        returns: charRange('a','z')
      }
    ]);

    return tests;
  }
);
