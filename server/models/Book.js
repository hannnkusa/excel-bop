const mongoose = require("mongoose");

const bookSchema = mongoose.model("books", {
  no: {
    type: String,
    required: true,
  },
  judul: {
    type: String,
    required: true,
  },
  penulis: {
    type: String,
    required: true,
  },
  tahun_terbit: {
    type: String,
    required: true,
  },
  penerbit: {
    type: String,
    required: true,
  },
  created_from: {
    type: String,
  },
  timestamp: {
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
    deleted_at: Date,
  },
});

module.exports = bookSchema;
