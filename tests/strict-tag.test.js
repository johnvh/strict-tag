const test = require('tape');
const strict = require('../');

test('strict', t => {
  t.test('works when all values present', t => {
    const a = 'aaa',
      b = 5;

    t.equal(
      strict`hi ${a} ${b}`,
      'hi aaa 5'
    );
    t.end();
  });

  t.test('throws when a value is null', t => {
    const a = null,
      b = 5;

    t.throws(
      () => strict`hi ${a} ${b}`,
      /template substitution at index 0 is invalid/i
    );
    t.end();
  });

  t.test('throws when a value is undefined', t => {
    const a = undefined,
      b = 5;

    t.throws(
      () => strict`hi ${a} ${b}`,
      /template substitution at index 0 is invalid/i
    );
    t.end();
  });
});

test('strict.with', t => {
  t.test('creates a function', t => {
    t.equal(typeof (strict.with(() => 1)), 'function');
    t.end();
  });
});

test('StrictTemplateError', t => {
  t.test('is an error', t => {
    const e = new strict.StrictTemplateError('msg');
    t.ok(e instanceof Error, 'is instanceof Error');
    t.equal('StrictTemplateError', e.name);
    t.end();
  });
});
