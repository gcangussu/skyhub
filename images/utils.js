const { SIZES_NAMES, ADDRESS } = require('../constants');

/**
 * Return a new array with the local image files replaced by their urls.
 * @param {Object[]} images - Array of images
 * @return {Object[]} Array of images with urls instead of local files
 */
function imageSizesToUrl(images) {
  return images.map((img) => {
    const newImage = { name: img.name };
    SIZES_NAMES.forEach((sizeName) => {
      const file = img[sizeName];
      newImage[sizeName] = `${ADDRESS}/images/${file}`;
    });
    return newImage;
  });
}

/**
 * Return an array of objects by grouping resized images of same name.
 * To accomodate different files and sizes for images of same name each
 * object will have a key-value pair of size-file.
 * e.g.:
 * input: [{ name: 'a', size: 'p', file: 'ap.jpg' },
 *         { name: 'a', size: 'g', file: 'ag.jpg' }]
 *
 * output: [{ name: 'a', p: 'ap.jpg', g: 'ag.jpg' }]
 *
 * @param {Object[]} resizedImgs - Array of resized images
 * @param {String} resizedImgs[].name - Image name
 * @param {String} resizedImgs[].file - Image file
 * @param {String} resizedImgs[].size - The size of the image
 * @return {Object[]} Grouped images
 */
function groupResizedImages(resizedImgs) {
  const imgsObj = resizedImgs.reduce((obj, img) => {
    const imgObj = obj[img.name];
    if (imgObj) {
      imgObj[img.size] = img.file;
    } else {
      /* eslint no-param-reassign: "off" */
      obj[img.name] = { name: img.name, [img.size]: img.file };
    }
    return obj;
  }, {});
  return Object.values(imgsObj);
}

module.exports = { groupResizedImages, imageSizesToUrl };
