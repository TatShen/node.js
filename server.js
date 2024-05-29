const express = require("express");
const app = express();

app.use(express.json)

app.get("/api/hello", (req, res) => {
  res.send("Привет, Redev!");
});

app.post("/api/echo", (req, res) => {
    res.send(req.body)
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});