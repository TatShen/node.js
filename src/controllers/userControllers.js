const userServices = require("../services/userServices")

class UserControllers{
    async getUsers(req, res){
        const result =  await userServices.getUsers()
        res.send(result)
    }
    getUser(req, res){
        const result = userServices.getUser(req.params.id)
        res.send(result)
    }
    createUser(req, res){
        userServices.createUser(req.body)
        res.send("Пользователь создан!")
    }
    async editUser(req, res){
        const result = await userServices.editUser(req.params.id, req.body)
        res.send(result)
    }

    async deleteUser(req, res){
        const result = await userServices.deleteUser(req.params.id)
        res.send(result)
    }
}

module.exports = new UserControllers()