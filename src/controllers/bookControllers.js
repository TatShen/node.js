const bookServices = require("../services/bookServices")

class BookControllers{
    async getBooks(req, res){
        const result =  await bookServices.getBooks()
        res.send(result)
    }
    async getBook(req, res){
        const result = await bookServices.getBook(req.params.id)
        res.send(result)
    }
    createBook(req, res){
        bookServices.createBook(req.body)
        res.send("Книга создана!")
    }
    async editBook(req, res){
        const result = await bookServices.editBook(req.params.id, req.body)
        res.send(result)
    }

    async deleteBook(req, res){
        const result = await bookServices.deleteBook(req.params.id)
        res.send(result)
    }
}

module.exports = new BookControllers()