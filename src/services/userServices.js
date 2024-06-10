const fileHelpers = require("../helpers/fileHelpers");

const dataService = require("./dataServices");

class UserServices {
  #data;

  async getUsers() {
    const data = await dataService.getData();
    this.#data = JSON.parse(data);
    return this.#data.users;
  }

  async getUser(id) {
    await this.getUsers();
    const user = this.#data.users.find((item) => item.id == id);
    return user ? user : `Пользователь с id ${id} не найден!`;
  }
  async createUser(user) {
    await this.getUsers();
    this.#data.users.push(user);
    fileHelpers.writeFile("src/db.json", this.#data, "Файл успешно записан.");
  }
  async editUser(id, body) {
    await this.getUsers();
    let user = this.#data.users.find((item) => item.id == id);
    if (user) {
      user = Object.assign(user, body);
      fileHelpers.writeFile("src/db.json", this.#data, "Данные пользователя обновлены.");
      return "Данные пользователя обновлены";
    }
    return `Пользователь с id ${id} не найден!`;
  }
  async deleteUser(id) {
    await this.getUsers();
    this.#data.users = this.#data.users.filter((item) => item.id != id);
    await fileHelpers.writeFile(
      "src/db.json",
      this.#data,
      "Пользователь удален!"
    );
    return "Пользователь удален!";
  }
}

module.exports = new UserServices();
