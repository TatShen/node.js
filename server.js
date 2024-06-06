require('dotenv').config();

const express = require("express");
const app = express();

const users = []

app.use(express.json())

function loggerMiddleware(req, res, next) {
  console.log(`Запрос по адресу: ${req.url}, метод ${req.method}`);
  next(); 
}

app.use(loggerMiddleware)

app.get("/api/hello", (req, res) => {
  res.send("Привет, Redev!");
});

app.post("/api/echo", (req, res) => {
    res.send(req.body.message)
})

app.get("/api/users", (req, res) => {
  res.send(users);
});

app.get("/api/users/:id", (req, res) => {
  const id = req.params.id
  const user = users.find((item) => item.id == id)
  if( user.length < 1){
    res.send(`Пользователя с id ${id} не существует!`)
  }
  res.send( user);
});

app.post("/api/users", (req, res) => {
  users.push(req.body)
  res.send("Пользователь создан!")
})

app.put("/api/users/:id", (req, res) => {
  const id = req.params.id
  users.forEach((item) => {
    if(item.id == id){
      item = Object.assign(item, req.body)
      res.send("Данные пользователя обновлены")
    } else {
      res.send(`Пользователь с id ${id} не найден!`);
    }
  })
});

app.patch("/api/users/:id", (req, res) => {
  const id = req.params.id
  const {password} = req.body
  users.forEach((item) => {
    if(item.id == id){
      item.password = password
      res.send("Данные пользователя обновлены")
    } else {
      res.send(`Пользователь с id ${id} не найден!`);
    }
  })
});

app.delete("/api/users/:id", (req, res) => {
  const id = req.params.id
  const index = users.indexOf((item) => item.id == id)
  users.splice(index,1)
  res.send("Пользователь удален!")
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});


