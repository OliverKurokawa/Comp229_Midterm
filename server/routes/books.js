//Comp229_Midterm,
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const books = require('../models/books');

// define the book model
let Books = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  Books.find( (err, BookList) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        BookList: BookList
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  res.render('books/details',
  {title: 'Add Book',
  BookList:""})

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  let newBook = Books({
    "Title": req.body.Title,
    "Price": req.body.Price,
    "Author": req.body.Author,
    "Genre": req.body.Genre
});
Books.create(newBook, (err, Books) =>{
  if(err)
  {
      console.log(err);
      res.end(err);
  }
  else
  {
      // refresh the book list
      res.redirect('/books');
  }
});
});

// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', (req, res, next) => {
  let id = req.params.id;

  Books.findById(id,(err,BookToEdit) =>{
      if(err){
          console.log(err);
          res.end(err);
      }else{
          res.render('books/details',
          {
            title: 'Edit Book', 
            BookList: BookToEdit
          });
          
      }
  });

});

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req, res, next) => {
  let id = req.params.id

  let updatedbook = Books({
      "_id":id,
      "Title": req.body.Title,
      "Price": req.body.Price,
      "Author": req.body.Author,
      "Genre": req.body.Genre
  });

  Books.updateOne({_id: id}, updatedbook,(err) =>{
      if(err){
          console.log(err);
          res.end(err);
      }else{
          res.redirect('/books');
      }
  });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id

  Books.remove({_id:id},(err) =>{
      if(err){
          console.log(err);
          res.end(err);
      }else{
          res.redirect('/books');
      }
  });
});


module.exports = router;
