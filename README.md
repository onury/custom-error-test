# Custom Errors in JavaScript

Custom errors are useful when you want to track code with context-specific information. There are several ways to define a custom error in JavaScript. But since inheritance is not a first-citizen feature in JS (until ES2015); there's also so much discussion on how to implement a proper custom error.

This module tests various implementations for custom errors, widely used by developers; such as methods making use of `Error.call()`, `Object.create()`, `new Error()`, `Object.setPrototypeOf()`, `extends` (ES2015) and `util.inherits` (Node). See `/errors` directory for [included implementations][errors-dir].

What we expect from a custom error implementation is:
- `e.constructor.name` MUST get our custom error name.
- `E.prototype` MUST inherit from `Error.prototype`.
- `e.message` MUST be set.
- `e` MUST be an instance of `Error`.
- `e` MUST be an instance of `CustomError`.
- `e.stack` MUST be set and should have line-tracable info.
- `e.tostring()` MUST return error name and/or message.
- `({}).toString.call(e)` SHOULD output `"error"`.
- and some more...

`npm i custom-error-test` to install.  

### Test

Run `npm start` which will output test results to console for the current Node.js environment. And will also generate an HTML file, which will display results for the used browser. 

Better, you can [directly view this page][test-page] for testing your current browser.

[![Screenshot](https://raw.github.com/onury/custom-error-test/master/result.png)][test-page]

### License
MIT.

[test-page]:https://onury.github.io/custom-error-test/
[errors-dir]:https://github.com/onury/custom-error-test/tree/master/errors
[getPrototypeOf]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf
[setPrototypeOf]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf
[Error]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[capturestacktrace_constr]:https://nodejs.org/api/errors.html#errors_error_capturestacktrace_targetobject_constructoropt
[proto]:https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/proto
[so-question]:http://stackoverflow.com/q/1382107/112731
[so-answer]:http://stackoverflow.com/a/35881508/112731
[gist-discuss]:https://gist.github.com/mbrowne/4af54767dcb3d529648f5a8aa11d6348