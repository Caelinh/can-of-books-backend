'use strict';

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL);
const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;