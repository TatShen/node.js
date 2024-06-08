const express = require("express")
const router = express.Router()
const bookControllers = require("../controllers/bookControllers")

router.get("/", bookControllers.getBooks)
router.get("/:id", bookControllers.getBook)
router.post("/", bookControllers.createBook)
router.put("/:id",bookControllers.editBook)
router.delete("/:id",bookControllers.deleteBook)
module.exports = router