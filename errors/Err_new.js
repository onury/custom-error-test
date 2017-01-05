(function () {
    'use strict';

    function Err_new(message) {
        Object.defineProperty(this, 'name', {
            enumerable: false,
            writable: false,
            value: 'Err_new'
        });

        Object.defineProperty(this, 'message', {
            enumerable: false,
            writable: true,
            value: message || ''
        });

        if (Error.hasOwnProperty('captureStackTrace')) { // V8
            Error.captureStackTrace(this, Err_new);
        } else {
            Object.defineProperty(this, 'stack', {
                enumerable: false,
                writable: false,
                value: (new Error(message)).stack
            });
        }
    }
    Err_new.prototype = new Error();

    // EXPORT

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = Err_new;
    } else {
        window.errors = window.errors || [];
        window.errors.push(Err_new);
    }

})();