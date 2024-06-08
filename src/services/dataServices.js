const readFileAsync = require('../utils/file')

async function getData(){
    const data = await readFileAsync.readFile("src/db.json")
    return data
  }
  
  exports.getData = getData;
  

