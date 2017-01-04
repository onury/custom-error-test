// Not using arrow functions since this will also be used in the browser.
// http://caniuse.com/#feat=arrow-functions

(function () {
    'use strict';

    function Test(errs, helper) {
        this.helper = helper;
        // add `Error` so we can compare
        this.errors = errs.concat();
        this.errors.push(Error);
        this.ERR_MSG = 'err message';

        var self = this;
        // create instances for each custom error and Error
        this.instances = this.errors.map(function (Err) {
            try {
                return new Err(self.ERR_MSG);
            } catch (e) {
                return null;
            }
        });
        // get names for display purposes
        this.names = this.instances.map(function (e, index) {
            // if this custom error is not supported in the env, `e` will be
            // `null`. then we'll get the name from the object's name
            // property which is explicitly set for this purpose.
            return e ? e.name : (self.errors[index] ? self.errors[index].name : '-');
        });
        this.exec = helper.getTester(this.errors, this.instances);
    }

    Test.prototype.run = function () {
        var self = this;
        return [
            // first row is columns
            [''].concat(this.names),

            this.exec('e.name', function (E, e, s) { return e.name; }),
            this.exec('e.constructor.name', function (E, e, s) { return e.constructor.name; }),
            // this.exec('E.constructor.name', function (E, e, s) { return E.constructor.name; }),
            this.exec('e.constructor.name === e.name', function (E, e, s) { return e.constructor.name === e.name; }),
            this.exec('e.message === ERR_MSG', function (E, e, s) { return e.message === self.ERR_MSG; }),
            this.exec('typeof e === "object"', function (E, e, s) { return typeof e === 'object'; }),
            this.exec('typeof E === "function"', function (E, e, s) { return typeof E === 'function'; }),
            this.exec('getType(e) === "error"', function (E, e, s) { return self.helper.getType(e) === 'error'; }, true),
            this.exec('getType(E) === "function"', function (E, e, s) { return self.helper.getType(E) === 'function'; }),
            // this.exec('getPrototypeOf(E) === Function.prototype', function (E, e, s) { return Object.getPrototypeOf(E) === Function.prototype; }),
            // this.exec('getPrototypeOf(E) === Error.prototype', function (E, e, s) { return Object.getPrototypeOf(E) === Error.prototype; }),
            this.exec('getPrototypeOf(e) === Error.prototype', function (E, e, s) { return Object.getPrototypeOf(e) === Error.prototype; }, true),
            this.exec('getPrototypeOf(e) === E.prototype', function (E, e, s) { return Object.getPrototypeOf(e) === E.prototype; }),
            // this.exec('getPrototypeOf(E) === E.prototype', function (E, e, s) { return Object.getPrototypeOf(E) === E.prototype; }),
            // this.exec('getPrototypeOf(E) === getPrototypeOf(e)', function (E, e, s) { return Object.getPrototypeOf(E) === Object.getPrototypeOf(e); }),
            this.exec('e instanceof E', function (E, e, s) { return e instanceof E; }),
            this.exec('e instanceof Error', function (E, e, s) { return e instanceof Error; }),
            this.exec('e.toString()', function (E, e, s) { return typeof e.toString === 'function' && e.toString().indexOf(e.name) >= 0; }),
            this.exec('e.stack has name', function (E, e, s) { return s.indexOf(e.name) >= 0; }),
            this.exec('e.stack has ERR_MSG', function (E, e, s) { return s.indexOf(self.ERR_MSG) >= 0; }, true),
            this.exec('e.stack has line info', function (E, e, s) { return s.indexOf('/test.js:') >= 0; }),
            this.exec('e.stack has no extra line', function (E, e, s) { return s.split('\n')[1].indexOf(e.name) < 0; }, true),
            this.exec('getPrototypeOf(E) === E.__proto__', function (E, e, s) { return Error.__proto__ && Object.getPrototypeOf(E) === E.__proto__; }, true),
            this.exec('getPrototypeOf(e) === e.__proto__', function (E, e, s) { return Error.__proto__ && Object.getPrototypeOf(e) === e.__proto__; }, true)
        ];
    };

    Test.prototype.logStackSamples = function () {
        return this.instances.map(function (e) {
            if (e === null) return 'NO SUPPORT';
            var stack = '';
            try {
                throw e;
            } catch (err) {
                stack = err.stack;
            }
            return stack;
        });
    };

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = Test;
    } else {
        window.Test = Test;
    }

})();

