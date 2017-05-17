const { splitPathAtExtension, getFileNameFromPath } = require('./string');

const STR_1 = 'https://domain.co/path/to?=%20/file.dot';

test('splits path at extension', () => {
  expect(splitPathAtExtension(STR_1))
    .toEqual(['https://domain.co/path/to?=%20/file', '.dot']);
});

test('get file name from path', () => {
  expect(getFileNameFromPath(STR_1))
    .toBe('file.dot');
});
