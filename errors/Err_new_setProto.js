(function () {
    'use strict';

    var setProto = Object.setPrototypeOf,
        Err_new_setProto = {};

    if (!setProto) {
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
            return err;
        }
        Object.setPrototypeOf(Err_new_setProto.prototype, Error.prototype);
        // Err_new_setProto.prototype = Object.create(Error.prototype, {
        //     constructor: { value: Err_new_setProto }
        // });
    }

    // EXPORT

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = Err_new_setProto;
    } else {
        window.errors = window.errors || [];
        window.errors.push(Err_new_setProto);
    }

})();