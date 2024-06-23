const express = require("express")
const router = express.Router()
const tasksControllers = require("../controllers/tasksControllers")
const {validateId, validateBodyTask} = require("./validate")


router.get("/", tasksControllers.getTasks)
router.post("/",validateBodyTask, tasksControllers.createTask)
router.patch("/:id",validateId, tasksControllers.editTask)
router.patch("/:id/isCompleted",validateId, tasksControllers.editTaskStatus)
router.delete("/:id",validateId,  tasksControllers.deleteTask)

module.exports = router