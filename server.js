'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

// const mongoose = require('mongoose');
// mongoose.connect(process.env.DATABASE_URL);
const Book = require('./Books')
const app = express();
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 3020;

app.post('/book', (request, response, next) => {
  console.log(request.body);
  let { title, description, status } = request.body;
  if (!title || !description || !status) {
    next('Bad request');
  }

  let book = new Book({
    title,
    description,
    status,
  });
  book.save()
    .then(results => {
      response.send(results);
    })
    .catch(error => {
      next(error);
    });
});


app.get('/books', (request, response) => {

  Book.find()
    .then(bookData => {
      response.send(bookData);
    })

})


app.put('/books/:id', async (request, response, next) => {
  let id = request.params.id;
  console.log(request.body);
  const { title, description, status } = request.body;
  const updatedBook = await Book.findOneAndUpdate({_id: id}, { title, description, status }, { new: true, overwrite: true });
  response.send(updatedBook);
   
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
