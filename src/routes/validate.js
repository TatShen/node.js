const { body, param } = require("express-validator");
const dataService = require("../services/dataServices")

class Validate{
  isIdValue = (id) => {
    if (id > 0 ) {
      return true;
    }
    return false;
  };
  async  isUnicId(id){
    const data = await dataService.getData()
    const item = data.find((item) => item.id == id)
    if(Array.isArray(item)){
      return true
    }
    return false
  };
  validateBodyUser = [
    body("id")
      .custom(this.isIdValue)
      .withMessage("ID -  должно быть больше 0")
      .isInt()
      .withMessage("ID -  целое число")
      .custom(this.isUnicId)
      .withMessage("Пользователь с таким id уже существует!"),
    body("name").notEmpty().withMessage("Введите имя пользователя!"),
    body("email").isEmail().withMessage("Введите правильный Email!"),
    body("password")
      .isLength({ min: 6, max: 15 })
      .withMessage("Пароль должен содержатьь от 6 да 15 символов!"),
  ];
  validateBodyBook = [
    body("id")
      .custom(this.isIdValue)
      .withMessage("ID -  должно быть больше 0")
      .isInt()
      .withMessage("ID -  целое число")
      .custom(this.isUnicId)
      .withMessage("Книга с таким id уже существует!"),
    body("name").notEmpty().withMessage("Введите название книги!"),
    body("text").exists().withMessage("Введите содержание книги!")
  ];
  validateId = [
    param("id")
      .custom(this.isIdValue)
      .withMessage("ID -  должно быть больше 0")
      .isInt()
      .withMessage("ID -  целое число"),
  ];
}

module.exports = new Validate
