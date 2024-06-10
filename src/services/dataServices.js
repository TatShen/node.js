const fileHelpers = require("../helpers/fileHelpers");

async function getData() {
  const data = await fileHelpers.readFileAsync("src/db.json");
  return data;
}

exports.getData = getData;
