SkyHub Challenge
================

The Problem
-----------
Consume an endpoint (http://54.152.221.29/images.json) that return a JSON with the following format:
```json
{
    "images": [
        { "url": "http://path.to/image.jpg" },
        { "url": "http://images.com/this.jpg" },
                            .
                            .
                            .
        { "url": "http://path.to/otherimage.jpg" },
    ]
}
```

Then generate three different sizes of those images: 320x240 (small), 384x288 (medium) and 640x480 (large). And make an endpoint that lists these resized images with their respective sizes and urls.

The Solution
------------
The solution was implemented in Javascript by using Node.js and MongoDB. Node.js is both widely used to serve webservice as to consume them. But one specific reason for chosing Node is because it has the `mongoose` package, which provides a nice integrations between MongoDB and the Javascript code. Other reason specific for this case is the `sharp` package, which provides easy to use and efficient tools to work with images. Besides that all, Javascript is a very expressive high-level language that allows a lot of work to be done with less code.

To run the solution, clone this repository and then install the dependencies running this command on the repository root
```
npm install
```
After install, to run just use the command
```
npm start
```
And go to http://localhost:3000/images.json to see a JSON file containing something like
```json
[
  {
    "name": "b737_5",
    "small": "http://localhost:3000/images/b737_5_small.jpg",
    "medium": "http://localhost:3000/images/b737_5_medium.jpg",
    "large": "http://localhost:3000/images/b737_5_large.jpg"
  },
  {
    "name": "b777_5",
    "small": "http://localhost:3000/images/b777_5_small.jpg",
    "medium": "http://localhost:3000/images/b777_5_medium.jpg",
    "large": "http://localhost:3000/images/b777_5_large.jpg"
  },
  .
  .
  .
]
```
Each image URL is available on its object by acessing the properties `small`, `medium` and `large`, which are respectively for images of sizes small, medium and large.


Tests
-----
There are many tests to ensure the expected behaviour of the server, they are present alongside with the files that implement the functions being tested. You can spot them by their suffix `.test.js`.

To run all the tests use from the repository root
```
npm test
```
You're going to need to have `jest` installed for it to work. 
