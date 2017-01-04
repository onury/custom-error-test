function Err_create(message) {
    Object.defineProperty(this, 'name', {
        enumerable: false,
        writable: false,
        value: 'Err_create'
    });

    Object.defineProperty(this, 'message', {
        enumerable: false,
        writable: true,
        value: message || ''
    });

    if (Error.hasOwnProperty('captureStackTrace')) { // V8
        Error.captureStackTrace(this, Err_create);
    } else {
        Object.defineProperty(this, 'stack', {
            enumerable: false,
            writable: false,
            value: (new Error(message)).stack
        });
    }
}
Err_create.prototype = Object.create(Error.prototype);

if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = Err_create;
} else {
    window.errors = window.errors || [];
    window.errors.push(Err_create);
}