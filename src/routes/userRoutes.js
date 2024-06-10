const express = require("express")
const router = express.Router()
const userControllers = require("../controllers/userControllers")
const {validateBodyUser, validateId} = require("./validate")

router.get("/", userControllers.getUsers)
router.get("/:id",validateId, userControllers.getUser)
router.post("/",validateBodyUser, userControllers.createUser)
router.put("/:id", validateBodyUser, validateId,userControllers.editUser)
router.delete("/:id",validateId, userControllers.deleteUser)
module.exports = router