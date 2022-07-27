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

app.post('/books', (request, response, next) => {
  response.send(bookData);
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
