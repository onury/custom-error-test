(function () {
    'use strict';

    var isNode = typeof module === 'object' && typeof module.exports === 'object';

    function Err_inherits(message) {
        Object.defineProperty(this, 'name', {
            enumerable: false,
            writable: false,
            value: 'Err_inherits'
        });

        Object.defineProperty(this, 'message', {
            enumerable: false,
            writable: true,
            value: message || ''
        });

        if (Error.hasOwnProperty('captureStackTrace')) { // V8
            Error.captureStackTrace(this, Err_inherits);
        } else {
            Object.defineProperty(this, 'stack', {
                enumerable: false,
                writable: false,
                value: (new Error(message)).stack
            });
        }
    }

    if (isNode) {
        let util = require('util');
        util.inherits(Err_inherits, Error);
    } else {
        Err_inherits.noSupport = true;
    }

    // EXPORT

    if (isNode) {
        module.exports = Err_inherits;
    } else {
        window.errors = window.errors || [];
        window.errors.push(Err_inherits);
    }

})();