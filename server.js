'use strict';

const Book = require('./Books')
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');


const app = express();
app.use(cors());

mongoose.connect(process.env.DATABASE_URL)

const PORT = process.env.PORT || 3001;

let harryPotter = new Book ({
  title:'Harry Potter',
  description: 'Story of a wizard',
  status: 'Completed'
});

let lordOfTheRings = new Book ({
  title:"Lord of the Rings: Fellowship of the Ring",
  description:"Frodo must destroy the ring.",
  status: "Complete"
})

let ofMiceAndMen = new Book ({
  title: 'Of Mice And Men',
  description: 'A story of two men and some mice.',
  status: "Complete"
})

harryPotter.save();
lordOfTheRings.save();
ofMiceAndMen.save();


app.get('/book', (request, response) => {

  Book.find()
    .then(bookData => {
      response.send(bookData);
    })

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
