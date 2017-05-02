# Strict tag

An [es2015 template tag][js-template-tag] function that validates template
substitutions to guard against null and undefined values. Because sometimes, you
*really* don't want "undefined" or "null" in your strings.

For example, urls are usually somewhere where you want to be strict:

```javascript
const fooId;
fetch(`/foos/${fooId}`).then(...)
```

In this case, you're going to be trying to figure out why you're getting a 404
on `/foo/undefined`. Stop the request from even happening with a more specific
error using `strict`:

```javascript
const strict = require('strict-tag');
const fooId;
fetch(strict`/foos/${fooId}`).then(...)
````

This would throw an error during the template evaluation:

```
/Users/johnvh/dev/strict-tag/index.js:17
      throw new StrictTemplateError(`Template substitution at index ${i} is invalid`);
      ^

StrictTemplateError: Template substitution at index 0 is invalid
    at StrictTemplateError (/Users/johnvh/dev/strict-tag/index.js:3:5)
    at /Users/johnvh/dev/strict-tag/index.js:17:13
```

[js-template-tag]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals

## Usage

Install: `npm install strict-tag`

Use:

```javascript
const strict = require('strict-tag');
console.log(strict`pid: ${process.pid}`);
````

### `strict`

Default export. A template tag function that throws a `StrictTemplateError` if
any substitutions are `null` or `undefined`.

### `strict.with(isInvalidFn)`

A factory to create a template tag function that validates arguments using the
`isInvalidFn` predicate function. `isInvalidFn` is invoked with each
subtitution:

```javascript
const _ = require('lodash');
const strict = require('strict');
const strictEmpty = strict.with(_.isEmpty);
const a = '';
console.log(strictEmpty`hello ${a}`); // throws
```

### `strict.StrictTemplateError`

An error for invalid template substitutions.


