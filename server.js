'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);
const Book = require('./Books')
const app = express();
app.use(cors());


const PORT = process.env.PORT || 3001;

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


app.get('/book', (request, response) => {
  Book.find()
    .then(bookData => {
      response.send(bookData);
    })

})



app.delete('/book/:id', async (request, response, next) => {

  let id = request.params.id;
  try {
    let book = await Book.deleteOne({ _id: id });
    response.send(book);
  } catch(e) {
    next(e);
  }
});
app.listen(PORT, () => console.log(`listening on ${PORT}`));
