/** Create an exeption attaching an object on the Error */
function exception(message, obj) {
  const e = new Error(message);
  e.obj = obj;
  return e;
}

module.exports = { exception };
