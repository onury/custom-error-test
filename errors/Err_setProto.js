(function () {
    'use strict';

    function Err_setProto(message) {
        Object.defineProperty(this, 'name', {
            enumerable: false,
            writable: false,
            value: 'Err_setProto'
        });

        Object.defineProperty(this, 'message', {
            enumerable: false,
            writable: true,
            value: message || ''
        });

        if (Error.hasOwnProperty('captureStackTrace')) { // V8
            Error.captureStackTrace(this, Err_setProto);
        } else {
            Object.defineProperty(this, 'stack', {
                enumerable: false,
                writable: false,
                value: (new Error(message)).stack
            });
        }
    }
    if (typeof Object.setPrototypeOf === 'function') {
        Object.setPrototypeOf(Err_setProto.prototype, Error.prototype);
    } else {
        Err_setProto.noSupport = true;
    }

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = Err_setProto;
    } else {
        window.errors = window.errors || [];
        window.errors.push(Err_setProto);
    }

})();