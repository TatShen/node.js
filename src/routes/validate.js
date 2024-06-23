const { body, param } = require("express-validator");
const dataService = require("../services/dataServices")

class Validate{
  async  isUnicId(id){
    const data = await dataService.getData()
    const item = data.find((item) => item.id == id)
    if(Array.isArray(item)){
      return true
    }
    return false
  };
  validateBodyUser = [
    body("email").isEmail().withMessage("Введите правильный Email!"),
    body("password")
      .isLength({ min: 6, max: 15 })
      .withMessage("Пароль должен содержатьь от 6 да 15 символов!"),
  ];
 validateBodyTask = [
    body("title").notEmpty().withMessage("Введите название задачи!"),
    body("isCompleted").isBoolean().withMessage("Введите статус задачи!")
  ]; 
  validateId = [
    param("id").notEmpty().withMessage("Введите ID задачи!")
  ];
}

module.exports = new Validate
