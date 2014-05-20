# Marcro's for Virgilio
This package contains a number of macro's for use with Virgilio.
Additional synthetic sugar, to make writing a Virgilio app even more pleasant!

## Usage
To use these macro's, you'll need to install sweet.js.

    npm install -g sweet.js

Install this module in your project.
Then you can compile a file containing macro's by calling

    npm install --save-dev virgilio-sweet (doesn't work - we're not on npm yet)
    sjs -c -m virgilio-sweet my_code.js

For automation, use a [grunt](https://github.com/natefaubion/grunt-sweet.js) or [gulp](https://github.com/sindresorhus/gulp-sweetjs) task.

## Macro's
Virgilio macro's start with the `@` sign, to prevent accidental clashes with non-macro code.

### @use( extensionName )
Loads an npm-installed virgilio extension.
Example:

    virgilio
        @use('http');

This gets expanded into:

    virgilio
        .use(require('virgilio-http'));

### @execute( virgilioAction [, arg1, arg2, ...] )
This macro is meant to be used in a promise chain.
Example:

    var bar = 'test';
    doAsyn()
        .bind(virgilio)
        .then(function() { /* do something */ })
        @execute('foo.do', bar, _result);

This gets expanded into:

    var bar = 'test';
    virgilio
        .bind(virgilio)
        .then(function() { /* do something */ })
        .then(function(_result) {
            var virgilio = this;
            return virgilio.execute('foo.do', bar, _result);
        });

In the argument list, _result always indicates the value contained within the previous promise in the chain.
If you only want to pass this value as the first argument to the action, you can use the macro without any arguments (apart from the action name).

Be carefull when using this macro.
As you can see in the expansion, it is going to assume the promise chain is bound to the virgilio instance.
If this is not the case, the expanded code will not run correctly.
