const express = require("express")
const router = express.Router()
const bookControllers = require("../controllers/bookControllers")
const validateBook = require("./bookRoutesValidation")
const validateId = require("./userRoutesValidation")

router.get("/", bookControllers.getBooks)
router.get("/:id",validateId.validateId, bookControllers.getBook)
router.post("/",validateBook.validateBodyBook, bookControllers.createBook)
router.put("/:id", validateId.validateId, validateBook.validateBodyBook, bookControllers.editBook)
router.delete("/:id", validateId.validateId, bookControllers.deleteBook)
module.exports = router