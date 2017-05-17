const ENDPOINT = 'http://54.152.221.29/images.json';

const ADDRESS = 'http://localhost:3000';

const SIZES = [
  {
    name: 'small',
    width: 320,
    height: 240,
  },
  {
    name: 'medium',
    width: 384,
    height: 288,
  },
  {
    name: 'large',
    width: 640,
    height: 480,
  },
];

const SIZES_NAMES = SIZES.reduce((arr, size) => {
  arr.push(size.name);
  return arr;
}, []);

const TEMP_IMAGES_DIR = './.temp_images';

const IMAGES_DIR = './public/images';

module.exports = {
  SIZES,
  SIZES_NAMES,
  ENDPOINT,
  ADDRESS,
  TEMP_IMAGES_DIR,
  IMAGES_DIR,
};
