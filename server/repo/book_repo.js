const mongoose = require("mongoose");

const Book = require("../models/book");

async function IndexBooksRepo() {
  try {
    const filter = {
      "timestamp.deleted_at": null,
    };

    const data = await Book.find(filter);

    return data;
  } catch (error) {
    throw error;
  }
}

async function GetOneBookRepo(ID) {
  try {
    const data = await Book.findOne({
      "timestamp.deleted_at": null,
      _id: new mongoose.Types.ObjectId(ID),
    });

    return data;
  } catch (error) {
    throw error;
  }
}

async function StoreBookRepo(payload, auth) {
  try {
    const data = new Book({
      no: payload.no,
      judul: payload.judul,
      penulis: payload.penulis,
      tahun_terbit: payload.tahun_terbit,
      penerbit: payload.penerbit,
    });

    const result = await data.save();

    return result;
  } catch (error) {
    throw error;
  }
}

async function UpdateOneBookRepo(ID, payload, auth) {
  try {
    const existingBook = await Book.findOne({
      "timestamp.deleted_at": null,
      _id: new mongoose.Types.ObjectId(ID),
    });

    if (!existingBook) {
      throw new Error("Book not found");
    }

    // Update the document
    try {
      await Book.updateOne(
        { _id: new mongoose.Types.ObjectId(ID) },
        {
          $set: {
            no: payload.no,
            judul: payload.judul,
            penulis: payload.penulis,
            tahun_terbit: payload.tahun_terbit,
            penerbit: payload.penerbit,
            "timestamp.updated_at": new Date(),
          },
        }
      );

      const updatedBook = await Book.findById(ID);

      return updatedBook;
    } catch (error) {
      throw new Error(`error when update data ${error}`);
    }
  } catch (error) {
    throw new Error("Error updating book:", error);
  }
}

async function DeleteOneBookRepo(ID) {
  try {
    const existingBook = await Book.findById(ID);

    if (!existingBook) {
      throw new Error("Book not found");
    }

    // Update the document
    try {
      await Book.updateOne(
        { _id: new mongoose.Types.ObjectId(ID) },
        {
          $set: {
            "timestamp.deleted_at": new Date(),
          },
        }
      );
    } catch (error) {
      throw new Error(`error when update data ${error}`);
    }
  } catch (error) {
    throw new Error(`Error updating book: ${error}`);
  }
}

module.exports = {
  IndexBooksRepo,
  GetOneBookRepo,
  StoreBookRepo,
  UpdateOneBookRepo,
  DeleteOneBookRepo,
};
