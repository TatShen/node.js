class UserServices {
  #users = [];
  getUsers() {
    return this.#users;
  }
  getUser(id) {
    const user = this.#users.find((item) => item.id == id);
    return user ? user : `Пользователь с id ${id} не найден!`;
  }
  createUser(user) {
    this.#users.push(user);
  }
  editUser(id, body) {
    let user = this.#users.find((item) => item.id == id);
    if (user) {
      user = Object.assign(user, body);
      return "Данные пользователя обновлены";
    }
    return `Пользователь с id ${id} не найден!`;
  }
  changePassword(id, password) {
    const user = this.#users.find((item) => item.id == id);
    if (user) {
      user.password = password;
      return "Данные пользователя обновлены";
    }
    return `Пользователь с id ${id} не найден!`;
  }
  deleteUser(id) {
    const index = this.#users.indexOf((item) => item.id == id);
    if (index != -1) {
      return `Пользователь с id ${id} не найден!`;
    }
    this.#users.splice(index, 1);
    return "Пользователь удален!";
   
  }
}

module.exports = new UserServices();
