const { findOne } = require("../models/book");
const Book = require("../models/book")

exports.createBook = async (req, res, next) => {
    try {
        const { title, author, pages } = req.body;
        if(!title || !author || !pages) {
            throw new Error("Provide All Values")
        }
        const book = await Book.create({ title, author, pages })
        res.status(201).json({
            success: true,
            book
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}


exports.readBooks = async (req, res, next) => {
    try {
        const books = await Book.find({})
        res.status(200).json({
            success: true,
            books
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}


exports.updateBook = async (req, res, next) => {
    try {
        const { id, title, author, pages } = req.body
        if(!id) throw new Error("Please provide book id")

        const book = await Book.findOne({ _id: id })
        if(!book) throw new Error("No book exists with that id")

        book.title = title?title:book.title;
        book.author = author?author:book.author;
        book.pages = pages?pages:book.pages;
        await book.save();
        res.status(201).json({
            success: true,
            book
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
    
}

exports.deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndDelete(req.body.id)
        res.status(200).json({
            success: true,
            book
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}