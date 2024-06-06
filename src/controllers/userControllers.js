const userServices = require("../services/userServices")

class UserControllers{
    getUsers(req, res){
        const result = userServices.getUsers()
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
    editUser(req, res){
        const result = userServices.editUser(req.params.id, req.body)
        res.send(result)
    }
    changePassword(req, res){
        const result = userServices.changePassword(req.params.id, req.body.password)
        res.send(result)
    }
    deleteUser(req, res){
        const result = userServices.deleteUser(req.params.id)
        res.send(result)
    }
}

module.exports = new UserControllers()