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
  body("name").notEmpty().withMessage("Введите имя пользователя!"),
  body("email").isEmail().withMessage("Введите правильный Email!"),
  body("password")
    .isLength({ min: 6, max: 15 })
    .withMessage("Пароль должен содержатьь от 6 да 15 символов!"),
];

const validateId = [
  param("id")
    .custom(isIdValue)
    .withMessage("ID -  должно быть больше 0")
    .isInt()
    .withMessage("ID -  целое число"),
];

exports.validateBody = validateBody;
exports.validateId = validateId;
