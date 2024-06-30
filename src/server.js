require("./instrument");
require('dotenv').config();
const Sentry = require("@sentry/node");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swaggerSpec'); 
const express = require("express");
const app = express();
const routes = require("./routes/index")
const loggerMiddleware = require("./middleware/loggerMiddleware")


app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(loggerMiddleware)
app.use('/api', routes)
app.get("/", (req, res) => {
  res.send("Hello everyone!");
});
Sentry.setupExpressErrorHandler(app);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});


