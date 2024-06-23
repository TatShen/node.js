const { v4: uuidv4 } = require("uuid");

const fileHelpers = require("../helpers/fileHelpers");
const dataService = require("./dataServices");
const { deleteTask } = require("../controllers/tasksControllers");

class UserServices {
  #data;

  async getData() {
    const data = await dataService.getData();
    this.#data = JSON.parse(data);
  }

  async getTasks(req, res) {
    await this.getData();
    const tasks = this.#data.tasks.filter((item) => item.idUser === req.userId);
    res.send(tasks.length > 0 ? tasks : "У Вас еще нет задач!");
  }

  async createTask(req, res) {
    await this.getData();
    try {
      const id = uuidv4();
      this.#data.tasks.push({ id, idUser: req.userId, ...req.body });
      fileHelpers.writeFile("src/db.json", this.#data, "Файл успешно записан.");
      res.send("Задача добавлена!");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка записи!" });
    }
  }
  async editTask(req, res) {
    await this.getData();
    try {
      let task = this.#data.tasks.find((item) => item.id === req.params.id);
      if (task) {
        task = Object.assign(task, req.body);
        fileHelpers.writeFile(
          "src/db.json",
          this.#data,
          "Файл успешно записан."
        );
        res.send("Задача обнавлена!");
      } else {
        res.send(`Задача с id ${req.params.id} не найдена!`);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка записи!" });
    }
  }
  async editTaskStatus(req, res) {
    await this.getData();
    try {
      let task = this.#data.tasks.find((item) => item.id === req.params.id);
      if (task) {
        task.isCompleted = !task.isCompleted;
        fileHelpers.writeFile(
          "src/db.json",
          this.#data,
          "Файл успешно записан."
        );
        res.send("Задача обнавлена!");
      } else {
        res.send(`Задача с id ${req.params.id}} не найдена!`);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка записи!" });
    }
  }
  async deleteTask(req, res) {
    await this.getData();
    try {
      this.#data.tasks = this.#data.tasks.filter(
        (item) => item.id != req.params.id
      );
      fileHelpers.writeFile("src/db.json", this.#data, "Файл успешно записан.");
      res.send("Задача удалена!");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка записи!" });
    }
  }
}

module.exports = new UserServices();
