const fs = require("fs").promises;

function writeFile(url, data, message) {
  fs.writeFile(url, JSON.stringify(data), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(message);
  });
}

async function readFileAsync(url) {
  try {
    const data = await fs.readFile(url, "utf8");
    return data
  } catch (err) {
    console.error("Error reading file:", err);
  }
}

exports.writeFile = writeFile;
exports.readFile = readFileAsync;
