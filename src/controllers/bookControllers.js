const bookServices = require("../services/bookServices")
const { validationResult } = require("express-validator");
class BookControllers{
    async getBooks(req, res){
        const result =  await bookServices.getBooks()
        res.send(result)
    }
    async getBook(req, res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map((item) => item.msg) });
        }
        const result = await bookServices.getBook(req.params.id)
        res.send(result)
    }
    createBook(req, res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map((item) => item.msg) });
        }
        bookServices.createBook(req.body)
        res.send("Книга создана!")
    }
    async editBook(req, res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map((item) => item.msg) });
        }
        const result = await bookServices.editBook(req.params.id, req.body)
        res.send(result)
    }

    async deleteBook(req, res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map((item) => item.msg) });
        }
        const result = await bookServices.deleteBook(req.params.id)
        res.send(result)
    }
}

module.exports = new BookControllers()