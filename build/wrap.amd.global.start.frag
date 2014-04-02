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
