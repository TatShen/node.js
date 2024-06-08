const writeFile = require("../utils/file");

const dataService = require("./dataServices");

class BookServices {
  #data;

  async getBooks() {
    const data = await dataService.getData();
    this.#data = JSON.parse(data);
    return this.#data.books;
  }

  async getBook(id) {
    await this.getBooks();
    const book = this.#data.books.find((item) => item.id == id);
    return book ? book : `Книга с id ${id} не найдена!`;
  }
  async createBook(book) {
    await this.getBooks();
    this.#data.books.push(book);
    writeFile.writeFile("src/db.json", this.#data, "Файл успешно записан.");
  }
  async editBook(id, body) {
    await this.getBooks();
    let book = this.#data.books.find((item) => item.id == id);
    if (book) {
      book = Object.assign(book, body);
      writeFile.writeFile("src/db.json", this.#data, "Данные книги обновлены.");
      return "Данные книги обновлены";
    }
    return `Книга с id ${id} не найдена!`;
  }
  async deleteBook(id) {
    await this.getBooks();
    this.#data.books = this.#data.books.filter((item) => item.id != id);
    await writeFile.writeFile(
      "src/db.json",
      this.#data,
      "Книга удалена!"
    );
    return "Книга удалена!";
  }
}

module.exports = new BookServices();
