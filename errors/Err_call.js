(function () {
    'use strict';

    function Err_call(message) {
        let err = Error.call(this, message || '');
        Object.defineProperty(err, 'name', {
            enumerable: false,
            writable: false,
            value: 'Err_call'
        });

        if (Error.hasOwnProperty('captureStackTrace')) { // V8
            Error.captureStackTrace(err, Err_call);
        } else {
            Object.defineProperty(err, 'stack', {
                enumerable: false,
                writable: false,
                value: (new Error(message)).stack
            });
        }
        return err;
    }

    Err_call.prototype = Object.create(Error.prototype, {
        constructor: { value: Err_call }  // this makes the difference (compared to Error_create)
    });
    // Another way to write this:
    // Err_call.prototype = Object.create(Error.prototype);
    // Err_call.prototype.constructor = Err_call;

    // EXPORT

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = Err_call;
    } else {
        window.errors = window.errors || [];
        window.errors.push(Err_call);
    }

})();