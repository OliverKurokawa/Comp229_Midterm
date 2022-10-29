let mongoose = require('mongoose');

// create a model class
let BookModel = mongoose.Schema({
    Title: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('Books', BookModel);
