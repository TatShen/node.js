const express = require("express")
const router = express.Router()
const userControllers = require("../controllers/userControllers")

router.get("/", userControllers.getUsers)
router.get("/:id", userControllers.getUser)
router.post("/", userControllers.createUser)
router.put("/:id",userControllers.editUser)
router.patch("/:id",userControllers.changePassword)
router.delete("/:id",userControllers.deleteUser)
module.exports = router