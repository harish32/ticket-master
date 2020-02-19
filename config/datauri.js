const Datauri = require("datauri");
const path = require("path");
const dUri = new Datauri();

const dataUri = req =>
  dUri.format(
    path.extname(req.files.file.name).toString(),
    req.files.file.data
  );

module.exports = dataUri;
