const userServices = require("../services/userServices")
const { validationResult } = require('express-validator');

class UserControllers{
    async getUsers(req, res){
        const result =  await userServices.getUsers()
        res.send(result)
    }
    async getUser(req, res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map((item) => item.msg) });
        }
        const result = await userServices.getUser(req.params.id)
        res.send(result)
    }
    createUser(req, res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map((item) => item.msg) });
        }
        userServices.createUser(req.body)
        res.send("Пользователь создан!")
    }
    async editUser(req, res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map((item) => item.msg) });
        }
        const result = await userServices.editUser(req.params.id, req.body)
        res.send(result)
    }

    async deleteUser(req, res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map((item) => item.msg) });
        }
        const result = await userServices.deleteUser(req.params.id)
        res.send(result)
    }
}

module.exports = new UserControllers()