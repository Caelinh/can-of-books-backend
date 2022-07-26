'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/books')

let bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String
});

const Book = mongoose.model('Book', bookSchema);



Book.find().then(data => {
    console.log(data);
})
module.exports = Book;