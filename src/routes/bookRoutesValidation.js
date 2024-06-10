const { body, param } = require("express-validator");
const isIdValue = (id) => {
  if (id > 0) {
    return true;
  }
  return false;
};
const validateBody = [
  body("id")
    .custom(isIdValue)
    .withMessage("ID -  должно быть больше 0")
    .isInt()
    .withMessage("ID -  целое число"),
  body("name").notEmpty().withMessage("Введите название книги!"),
  body("text").exists().withMessage("Введите содержание книги!")
];



exports.validateBodyBook = validateBody;
