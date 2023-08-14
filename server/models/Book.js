const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let bookSchema = new Schema({
  no: {
    type: String
  },
  judul: {
    type: String
  },
  penulis: {
    type: String
  },
  tahun_terbit: {
    type: String
  },
  penerbit: {
    type: String
  },
  created_from: {
    type: String
  },
}, {
  collection: 'books'
})
module.exports = mongoose.model('Book', bookSchema)
