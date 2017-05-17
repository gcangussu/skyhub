const { imageSizesToUrl } = require('./utils');

/** Return a controler for images once given a model. */
function metaController(Image) {
  return (req, res) =>
    Image.find(undefined, { _id: false, __v: false })
      .lean()
      .exec()
      .then(allImages => imageSizesToUrl(allImages))
      .then((allImagesWithUrls) => {
        res.type('json');
        res.send(JSON.stringify(allImagesWithUrls, null, '  '));
      });
}

module.exports = metaController;
