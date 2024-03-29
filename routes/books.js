const express = require('express');
const route = express.Router();
const path = require('path')
const Book = require('../models/book');
const uploadPath = path.join('public', Book.coverImageBasePath) 
const Author = require('../models/author');
const multer = require('multer')
const imageMimeTypes = ['images/jpeg', 'images/png', 'images/gif']
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, )
    }
})

//All Books Route
route.get('/', async (req, res)=> {
    res.send('All Books')
})

//New Book Route 
route.get('/new', async (req, res)=> {
    
})

//Create Book Route
route.post('/', upload.single('cover'), async (req, res)=> {
    const fileName = req.file != null ? req.file.filename : null
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        pageCount: req.body.pageCount,
        coverImageName: fileName,
        description: req.body.description
    })

    try {
        const newBook = await book.save()
        // res.redirect(`books/${newBook.id}`)
        res.redirect('books')
    } catch {

    }
})

async function renderNewPage(res, book, hasError = false) {
    try {
        const authors = await Author.find({})
        const params = {
            authors: authors,
            book: book
        }
        if(hasError) params.errorMessage = 'Error Creating Book'
        const book = new Book()
        res.render('books/new', {
            authors: authors,
            book: book
        })
    } catch {
        res.redirect('/books')
    }
} 

module.exports = route;