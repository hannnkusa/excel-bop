const BookRepo = require("../repo/book_repo");
const response = require("../utils/response");
const { GetTransactionID } = require("../utils/global_utils");

function IndexBooks(req, res) {
  BookRepo.IndexBooksRepo(req)
    .then((data) => {
      response.sendSuccess(res, 200, data);
    })
    .catch((error) => {
      response.sendError(res, 400, error.message);
    });
}

function GetOneBook(req, res) {
  const ID = GetTransactionID(req);

  BookRepo.GetOneBookRepo(ID)
    .then((data) => {
      if (data) {
        response.sendSuccess(res, 200, data);
      } else {
        response.sendError(
          res,
          404,
          `data book dengan id ${ID} tidak ditemukan`
        );
      }
    })
    .catch((error) => {
      response.sendError(res, 400, error);
    });
}

async function StoreOneBook(req, res) {
  const payload = req.body;

  console.log(`kok gk dapet dapet ${JSON.stringify(payload)}`);

  BookRepo.StoreBookRepo(payload, null)
    .then((data) => {
      response.sendSuccess(res, 201, data);
    })
    .catch((error) => {
      response.sendError(res, 400, error);
    });
}

async function UpdateOneBook(req, res) {
  const ID = GetTransactionID(req);
  const payload = req.body;

  try {
    const existingBook = await BookRepo.GetOneBookRepo(ID);

    if (!existingBook) {
      return response.sendError(
        res,
        404,
        `Data book dengan ID ${ID} tidak ditemukan`
      );
    }

    const updatedBook = await BookRepo.UpdateOneBookRepo(ID, payload, null);

    response.sendSuccess(res, 200, updatedBook);
  } catch (error) {
    response.sendError(res, 400, error.message);
  }
}

async function DeleteOneBook(req, res) {
  const ID = GetTransactionID(req);

  try {
    await BookRepo.DeleteOneBookRepo(ID)
      .then(() => {
        response.sendSuccess(
          res,
          200,
          `berhasil menghapus data book dengan id ${ID}`
        );
      })
      .catch((error) => {
        response.sendError(res, 400, error.meesage);
      });
  } catch (error) {
    response.sendError(res, 501, error);
  }
}

module.exports = {
  IndexBooks,
  GetOneBook,
  StoreOneBook,
  UpdateOneBook,
  DeleteOneBook,
};
