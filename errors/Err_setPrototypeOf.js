function Err_setPrototypeOf(message) {
    Object.defineProperty(this, 'name', {
        enumerable: false,
        writable: false,
        value: 'Err_setPrototypeOf'
    });

    Object.defineProperty(this, 'message', {
        enumerable: false,
        writable: true,
        value: message || ''
    });

    if (Error.hasOwnProperty('captureStackTrace')) { // V8
        Error.captureStackTrace(this, Err_setPrototypeOf);
    } else {
        Object.defineProperty(this, 'stack', {
            enumerable: false,
            writable: false,
            value: (new Error(message)).stack
        });
    }
}
if (typeof Object.setPrototypeOf === 'function') {
    Object.setPrototypeOf(Err_setPrototypeOf.prototype, Error.prototype);
} else {
    Err_setPrototypeOf.noSupport = true;
}

if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = Err_setPrototypeOf;
} else {
    window.errors = window.errors || [];
    window.errors.push(Err_setPrototypeOf);
}