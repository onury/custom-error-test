// Not using arrow functions since this will also be used in the browser.
// http://caniuse.com/#feat=arrow-functions

var helper = (function () {
    'use strict';

    var h = {};

    h.isNode = function () {
        return typeof module === 'object' && typeof module.exports === 'object';
    };

    h.getEnv = function () {
        return h.isNode()
            ? process.release.name + ' ' + process.version
            : navigator.userAgent;
    };

    h.getType = function (o) {
        return ({}).toString.call(o).match(/\s(\w+)/i)[1].toLowerCase();
    };

    h.getTester = function (errors, instances) {
        return function test(testName, fn, okIfFails) {
            return [testName].concat(errors.map(function (E, index) {
                if (!E || E.noSupport) return 'NO SUPPORT';
                // create an instance for the current custom error
                var e = instances[index];
                // get a stack sample
                var stack;
                try {
                    throw e;
                } catch (err) {
                    stack = err.stack || '';
                }
                // execute the callback
                var val = fn(E, e, stack);
                // display */no/FAIL if result is boolean, otherwise display string.
                var f = okIfFails ? 'no' : 'FAIL';
                return typeof val === 'boolean'
                    ? (val ? '*' : f)
                    : '"' + String(val) + '"';
            }));
        };
    }

    return h;

})();

if (helper.isNode()) {
    module.exports = helper;
} else {
    window.helper = helper;
}