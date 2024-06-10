const express = require("express")
const router = express.Router()
const bookControllers = require("../controllers/bookControllers")
const {validateBodyBook, validateId} = require("./validate")

router.get("/", bookControllers.getBooks)
router.get("/:id",validateId, bookControllers.getBook)
router.post("/", validateBodyBook, bookControllers.createBook)
router.put("/:id", validateId, validateBodyBook, bookControllers.editBook)
router.delete("/:id", validateId, bookControllers.deleteBook)
module.exports = router