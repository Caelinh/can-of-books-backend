'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

// const mongoose = require('mongoose');
// mongoose.connect(process.env.DATABASE_URL);
const Book = require('./Books')
const app = express();
app.use(cors());


const PORT = process.env.PORT || 3020;


app.get('/books', (request, response) => {
  Book.find()
    .then(bookData => {
      response.send(bookData);
    })

})

app.post('/books', async (request, response, next) => {
  const {title, description, status} = request.body;
  const newBook = await Book.create({title, description, status});

  response.send(newBook);
})

app.delete('/books/:id', async (request, response, next) => {

  let id = request.params.id;
  try {
    let book = await Book.deleteOne({ _id: id });
    response.send(book);
  } catch(e) {
    next(e);
  }
});
app.listen(PORT, () => console.log(`listening on ${PORT}`));
