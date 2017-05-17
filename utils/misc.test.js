const { exception } = require('./misc');

test('exception', () => {
  const obj = { oi: 123 };
  const msg = 'hi';
  const e = new Error(msg);
  e.obj = obj;

  expect(exception('hi', obj))
    .toEqual(e);
});
