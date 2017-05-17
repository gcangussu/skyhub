const Image = require('./model');

test('Image model', () => {
  const image = new Image({
    name: 'test',
    small: 'test_samall.png',
    medium: 'medium_test.jpg',
    large: 'large.gif',
  });
  const imageObj = image.toObject();
  /* eslint no-underscore-dangle: "off" */
  delete imageObj._id;
  expect(imageObj).toMatchSnapshot();
});
