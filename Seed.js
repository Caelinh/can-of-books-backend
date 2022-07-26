const mongoose = require('mongoose')
const Book = require('./Books')

require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL);

async function newBooks() {
    
    await Book.create ({
    title:'Harry Potter',
    description: 'Story of a wizard',
    status: 'Completed'
  });
  

  await Book.create ({
    title:"Lord of the Rings: Fellowship of the Ring",
    description:"Frodo must destroy the ring.",
    status: "Complete"
  })
  

  await Book.create ({
    title: 'Of Mice And Men',
    description: 'A story of two men and some mice.',
    status: "Complete"
  })
  
  
};
 
newBooks();