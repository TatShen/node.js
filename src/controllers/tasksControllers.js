const tasksServices = require("../services/taskServices");
const { validationResult } = require("express-validator");

class TasksControllers {
  async getTasks(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array().map((item) => item.msg) });
    }
    await tasksServices.getTasks(req, res);
  }
  async createTask(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array().map((item) => item.msg) });
    }
     await tasksServices.createTask(req, res);
  }
  async editTask(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array().map((item) => item.msg) });
    }
     await tasksServices.editTask(req, res);
  }
  async editTaskStatus(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array().map((item) => item.msg) });
    }
     await tasksServices.editTaskStatus(req, res);
  }
  async deleteTask(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array().map((item) => item.msg) });
    }
     await tasksServices.deleteTask(req, res);
  }
}

module.exports = new TasksControllers();
