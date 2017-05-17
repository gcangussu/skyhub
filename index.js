/**
 * Server for the SkyHub Challenge
 */
/* eslint no-console: "off" */

const request = require('request');
const fs = require('fs');
const rimraf = require('rimraf');
const sharp = require('sharp');
const mongoose = require('mongoose');
const express = require('express');

const { Model: Image, controller: imgContr } = require('./images');
const { groupResizedImages } = require('./images/utils');
const strUtils = require('./utils/string');
const { exception } = require('./utils/misc');

const {
  SIZES,
  ENDPOINT,
  TEMP_IMAGES_DIR,
  IMAGES_DIR,
  ADDRESS,
 } = require('./constants');

// Configure mongoose to use native promises
mongoose.Promise = global.Promise;

// Server setup
console.log(`Getting reponse from ${ENDPOINT}.`);

request(ENDPOINT, (error, response, body) => {
  if (error) {
    throw exception('RequestError', error);
  }

  if (response.statusCode === 200) {
    console.log('Getting images array from body response.');
    const images = JSON.parse(body).images;

    console.log('Ensuring images folders are tidy.');
    rimraf.sync(TEMP_IMAGES_DIR);
    rimraf.sync(IMAGES_DIR);
    fs.mkdirSync(TEMP_IMAGES_DIR);
    fs.mkdirSync(IMAGES_DIR);

    console.log('Saving images localy.');
    const streams = images.map((img) => {
      const imgFile = strUtils.getFileNameFromPath(img.url);
      return request(img.url)
        .pipe(fs.createWriteStream(`${TEMP_IMAGES_DIR}/${imgFile}`));
    });

    // Make a promise for every image stream
    const streamsPromises = streams.map(s => (
      new Promise((resolve, reject) => {
        s.on('finish', () => resolve(s));
        s.on('error', e => reject(e));
      })
    ));

    // Finish saving all files
    Promise.all(streamsPromises)
      .then((finishedStreams) => {
        console.log('Resizing images.');

        // To contain the resize tasks
        const resizePromises = [];

        // Resize each downloaded image to each size
        finishedStreams.forEach((s) => {
          const fileName = strUtils.getFileNameFromPath(s.path);
          const [fileNoExt, ext] = strUtils.splitPathAtExtension(fileName);
          SIZES.forEach((size) => {
            const newPath = `${IMAGES_DIR}/${fileNoExt}_${size.name}${ext}`;
            const resize = sharp(s.path)
              .resize(size.width, size.height)
              .toFile(newPath)
              .then(() => ({
                name: fileNoExt,
                file: strUtils.getFileNameFromPath(newPath),
                size: size.name,
              }));
            resizePromises.push(resize);
          });
        });

        // Finish resizing all images
        return Promise.all(resizePromises);
      })
      .then((resizedImgs) => {
        // Remove temporary images
        rimraf(TEMP_IMAGES_DIR, (err) => {
          if (err) {
            console.error(err);
          }
        });

        console.log('Connecting to MongoDB.');
        return mongoose.connect('mongodb://localhost/skyhub', () => {
          console.log('Droping previous database.');
          mongoose.connection.db.dropDatabase();
        }).then(() => resizedImgs);
      })
      .then((resizedImgs) => {
        console.log('Saving info about resized images on DB.');

        // Instantiate and save models
        const savePromises = groupResizedImages(resizedImgs)
          .map(img => new Image(img))
          .map(imgModel => imgModel.save());

        // Finish saving all Image models on DB
        return Promise.all(savePromises);
      })
      .then(() => {
        console.log('Creating web service.');
        const app = express();

        // Setup of static images
        app.use(express.static('public'));

        // Webservice endpoint
        app.get('/images.json', imgContr);

        app.listen(3000, () => {
          console.log(`Endpoint setup at ${ADDRESS}/images.json`);
        });
      });
  } else {
    throw exception('HttpError', response);
  }
});
