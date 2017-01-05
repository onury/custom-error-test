# Custom Errors in JavaScript

Custom errors are useful when you want to track code with context-specific information. There are several ways to define a custom error in JavaScript. But since inheritance is not a first-citizen feature in JS (until ES2015); there's also so much discussion on how to implement a proper custom error.

See this [SO Question][so-question], [this][so-answer] and [this][so-answer-2] answers, that leads to [this discussion][gist-discuss] (with [@mbrowne][mbrowne]) and finally, to this module you're viewing.

This module tests various implementations for custom errors, widely used by developers; such as methods making use of `Error.call()`, `Object.create()`, `new Error()`, `Object.setPrototypeOf()`, `extends` (ES2015) and `util.inherits` (Node). See `/errors` directory for [included implementations][errors-dir].

What we expect from a custom error implementation is:
- `e.constructor.name` MUST be set to custom error name.
- `E.prototype` MUST inherit from `Error.prototype`.
- `e.message` MUST be set.
- `e` MUST be an instance of `Error`.
- `e` MUST be an instance of `CustomError`.
- `e.stack` MUST be set and should have line-tracable info.
- `e.tostring()` MUST return error name and/or message.
- `({}).toString.call(e)` SHOULD output `"error"`.
- and some more... 

### Test

Run `npm start` which will output test results to console for the current Node.js environment. And will also generate an HTML file, which will display results for the used browser. 

Better, you can [directly view this page][test-page] for testing your current browser.

[![Screenshot](https://raw.github.com/onury/custom-error-test/master/result.png)][test-page]
_Capture of a test on Chrome 55 browser._

### CustomError: The One

So; with some research, discussions and these tests I think [**this**][the-one] is the one closest to ES2015's `extends Error`. If you think this is a bit over-kill, [**this**][so-answer] should be quite enough.

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
[so-answer-2]:http://stackoverflow.com/a/41338601/112731
[gist-discuss]:https://gist.github.com/mbrowne/4af54767dcb3d529648f5a8aa11d6348
[the-one]:https://github.com/onury/custom-error-test/tree/master/the-one/CustomError.js
[mbrowne]:https://github.com/mbrowne