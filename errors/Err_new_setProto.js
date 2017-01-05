(function () {
    'use strict';

    var Err_new_setProto = {};

    if (typeof Object.setPrototypeOf !== 'function') {
        Err_new_setProto.noSupport = true;
    } else {
        Err_new_setProto = function Err_new_setProto(message) {
            var err = new Error(message);
            Object.setPrototypeOf(err, Err_new_setProto.prototype);

            Object.defineProperty(err, 'name', {
                enumerable: false,
                writable: false,
                value: 'Err_new_setProto'
            });

            if (Error.captureStackTrace) {
                Error.captureStackTrace(err, Err_new_setProto);
            }
            return err;
        }

        Err_new_setProto.prototype.constructor = Err_new_setProto;
    }

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = Err_new_setProto;
    } else {
        window.errors = window.errors || [];
        window.errors.push(Err_new_setProto);
    }
})();