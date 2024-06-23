const { body, param } = require("express-validator");
const dataService = require("../services/dataServices")

class Validate{
  validateBodyUser = [
    body("email").isEmail().withMessage("Введите правильный Email!"),
    body("password")
      .isLength({ min: 6, max: 15 })
      .withMessage("Пароль должен содержатьь от 6 да 15 символов!"),
  ]
}

module.exports = new Validate
