const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const fileHelpers = require("../helpers/fileHelpers");
const dataService = require("./dataServices");

class UserServices {
  #data;

  async getUsers() {
    const data = await dataService.getData();
    this.#data = JSON.parse(data);
    return this.#data.users;
  }

  async login({ email, password }, res) {
    await this.getUsers();
    try {
      const user = this.#data.users.find((item) => item.email === email);
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!user || !isPasswordValid) {
        return res.status(401).json({ message: "Неверный email или пароль" });
      }

      const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
        expiresIn: "2h",
      });
      res.send(JSON.stringify({"access_token": token}));
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка входа в систему" });
    }
  }

  async register({ email, password }, res) {
    await this.getUsers();
    try {
      if (this.#data.users.find((item) => item.email === email)) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким email уже существует" });
      }
      const id = uuidv4();
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      this.#data.users.push({ id, email, password: hashedPassword });
      fileHelpers.writeFile("src/db.json", this.#data, "Файл успешно записан.");
      res.send("Пользователь успешно зарегистрирован!");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка регистрации пользователя" });
    }
  }
}

module.exports = new UserServices();
