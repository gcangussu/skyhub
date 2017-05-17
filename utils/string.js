function splitStringAtIndex(string, index) {
  return [string.substring(0, index), string.substring(index)];
}

function splitPathAtExtension(string) {
  return splitStringAtIndex(string, string.lastIndexOf('.'));
}

function getFileNameFromPath(string) {
  return string.substring(string.lastIndexOf('/') + 1);
}

module.exports = {
  splitPathAtExtension,
  getFileNameFromPath,
};
