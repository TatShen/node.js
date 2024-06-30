const { v4: uuidv4 } = require("uuid");
const Sentry = require("@sentry/node");
const fileHelpers = require("../helpers/fileHelpers");
const dataService = require("./dataServices");


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
      Sentry.captureException(error);
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
      Sentry.captureException(error);
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
      Sentry.captureException(error);
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
      Sentry.captureException(error);
    }
  }
}

module.exports = new UserServices();
