const userServices = require("../services/userServices");
const { validationResult } = require("express-validator");

class UserControllers {
  async login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array().map((item) => item.msg) });
    }
    const result = await userServices.login(req.body, res);
   
  }
  async register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array().map((item) => item.msg) });
    }
    const result = await userServices.register(req.body, res);
   
  }
}

module.exports = new UserControllers();
