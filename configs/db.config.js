const mongoose = require("mongoose");
require("./env.config");

let dbURI;
let uri;
let isLive = false;
let dbNameLocal = "ReportManager";
let dbNameLive = "ReportManager";
//  let dbUserNameLive = 'ReportManagerUser';

if (process.env.NODE_ENV === "development") {
  console.log("Running at Development State");
  console.log(
    "\x1b[42m%s\x1b[0m",
    "Application was Running at localDB. Any Change Can Be Done"
  );

  console.log("\n ########### \n");

  // Local Config
  dbURI = `mongodb://localhost:27017/${dbNameLocal}`;
  uri = "localhost://27017";
} else {
  isLive = true;

  dbURI = `mongodb://localhost:27017/${dbNameLive}`;
  uri = "Prod-Connection              ---- > 167.99.31.234";
}

module.exports = mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Mongodb Connected at", uri);

    !isLive && console.log("Mongodb Connected URI", dbURI);
  })
  .catch((error) => console.log("Mongodb Error: " + error));
