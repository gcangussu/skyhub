const mongoose = require('mongoose');

const Image = require('./model');
const controller = require('./controller');

const IMGS = [
  {
    name: 'b737_5',
    small: 'b737_5_small.jpg',
    medium: 'b737_5_medium.jpg',
    large: 'b737_5_large.jpg',
  },
  {
    name: 'b777_5',
    small: 'b777_5_small.jpg',
    medium: 'b777_5_medium.jpg',
    large: 'b777_5_large.jpg',
  },
  {
    name: 'b737_3',
    small: 'b737_3_small.jpg',
    medium: 'b737_3_medium.jpg',
    large: 'b737_3_large.jpg',
  }];

beforeAll(() => {
  mongoose.Promise = global.Promise;
  return mongoose.connect('mongodb://localhost/test')
    .then(() => mongoose.connection.db.dropDatabase())
    .then(() => IMGS.map(img => new Image(img)))
    .then(modelImgs => Promise.all(modelImgs.map(model => model.save())));
});

afterAll(() => mongoose.disconnect());

test('images controller', () => {
  const res = {
    type: jest.fn(),
    send: jest.fn(),
  };
  return controller(Image)(null, res)
    .then(() => {
      expect(res.type.mock.calls).toEqual([['json']]);
      expect(res.send.mock.calls.length).toBe(1);

      const sendCall = JSON.parse(res.send.mock.calls[0][0]);
      sendCall.sort((a, b) => a.name > b.name);
      expect(sendCall).toMatchSnapshot();
    });
});
