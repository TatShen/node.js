const fs = require("fs").promises;

class FileHelpers{
  writeFile(url, data, message) {
    fs.writeFile(url, JSON.stringify(data), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(message);
    });
  }
  async readFileAsync(url) {
    try {
      const data = await fs.readFile(url, "utf8");
      return data
    } catch (err) {
      console.error("Error reading file:", err);
    }
  }
}

module.exports = new FileHelpers()
