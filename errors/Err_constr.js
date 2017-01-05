(function () {
    'use strict';

    function Err_constr(message) {
        Object.defineProperty(this, 'name', {
            enumerable: false,
            writable: false,
            value: 'Err_constr'
        });

        Object.defineProperty(this, 'message', {
            enumerable: false,
            writable: true,
            value: message || ''
        });

        if (Error.hasOwnProperty('captureStackTrace')) { // V8
            Error.captureStackTrace(this, Err_constr);
        } else {
            Object.defineProperty(this, 'stack', {
                enumerable: false,
                writable: false,
                value: (new Error(message)).stack
            });
        }
    }

    Err_constr.prototype = Object.create(Error.prototype, {
        constructor: { value: Err_constr }  // this makes the difference (compared to Error_create)
    });
    // Another way to write this:
    // Err_constr.prototype = Object.create(Error.prototype);
    // Err_constr.prototype.constructor = Err_constr;

    // EXPORT

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = Err_constr;
    } else {
        window.errors = window.errors || [];
        window.errors.push(Err_constr);
    }

})();