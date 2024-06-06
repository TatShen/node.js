require('dotenv').config();

const express = require("express");
const app = express();
const routes = require("./routes/index")


app.use(express.json())

function loggerMiddleware(req, res, next) {
  console.log(`Запрос по адресу: ${req.url}, метод ${req.method}`);
  next(); 
}

app.use(loggerMiddleware)
app.use('/api', routes)



const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});


