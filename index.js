const fs = require('fs');
const path = require('path');
const table = require('text-table');
const helper = require('./lib/helper');
const Test = require('./test');

(() => {
    'use strict';

    // import/require all custom errors from ./errors directory
    const errors = [];
    const errFileLinks = [];
    const dir = path.join(__dirname, 'errors');
    fs.readdirSync(dir).forEach(file => {
        errors.push(require(path.join(dir, file)));
        errFileLinks.push('    <script src="errors/' + file + '"></script>');
    });

    // generate test.html file with errFileLinks using tempate.html
    let content = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');
    content = content.replace('<!-- mark -->\n', errFileLinks.join('\n') + '\n');
    fs.writeFileSync(path.join(__dirname, 'tests.html'), content, 'utf8');

    // log test result for Node env
    function testResult() {
        const test = new Test(errors, helper);
        console.log();

        console.log('BEGIN —> Stack Samples\n');
        const stackSamples = test.logStackSamples();
        stackSamples.forEach(stack => console.log(stack + '\n'));
        console.log('Stack Samples <— END\n');
        console.log();

        const rows = test.run();
        // center results in each column
        let align = (new Array(errors.length + 1)).join('c').split('');
        align.unshift('r'); // test names will be right-aligned
        console.log(table(rows, { align }));
        console.log();
        console.log('Environment: ', helper.getEnv());
        console.log();
    }

    // ---------------------------

    testResult();

})();
