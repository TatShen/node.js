const express = require("express")
const router = express.Router()
const userControllers = require("../controllers/userControllers")
const {validateBodyUser} = require("./validate")


router.post("/register",validateBodyUser, userControllers.register)
router.post("/login",validateBodyUser, userControllers.login)
module.exports = router