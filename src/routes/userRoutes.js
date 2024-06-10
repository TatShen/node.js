const express = require("express")
const router = express.Router()
const userControllers = require("../controllers/userControllers")
const userValidate = require("./userRoutesValidation")

router.get("/", userControllers.getUsers)
router.get("/:id",userValidate.validateId, userControllers.getUser)
router.post("/",userValidate.validateBody, userControllers.createUser)
router.put("/:id", userValidate.validateBody, userValidate.validateId,userControllers.editUser)
router.delete("/:id",userValidate.validateId, userControllers.deleteUser)
module.exports = router