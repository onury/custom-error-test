(function () {
    'use strict';

    var Err_extends;

    function check() {
        if (!Err_extends) {
            Err_extends = {};
            // mark as not-supported
            Err_extends.noSupport = true;
            // set the name so we'll know
            Err_extends.name = 'Err_extends';
        }
    }

    try {
        // In Firefox, eval code below won't work if not put in parenthesis!!!
        Err_extends = eval(
            "(class Err_extends extends Error {"
            +    "constructor(message = '') {"
            +    "    super(message);"
            +    "    Object.defineProperty(this, 'name', {"
            +    "        enumerable: false,"
            +    "        writable: false,"
            +    "        value: this.constructor.name"
            +    "    });"
            +    "}"
            + "})"
        );
    } catch (e) { // throws syntax error if not supported
        // this block is not executed in Firefox if there is an exception
    }

    // so we check here
    check();

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = Err_extends;
    } else {
        window.errors = window.errors || [];
        window.errors.push(Err_extends);
    }
})();