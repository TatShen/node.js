const express = require("express");
const router = express.Router()
const userRoutes = require("./userRoutes")
const tasksRoutes = require("./tasksRoutes")
const authMiddleware = require("../middleware/authMiddleware")


router.use("/", userRoutes)
router.use("/todos", authMiddleware, tasksRoutes)


module.exports = router