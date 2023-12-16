const express = require("express");

const bookController = require("../controller/book_controller");

const router = express.Router();

router.get("/", bookController.IndexBooks);
router.get("/:id", bookController.GetOneBook);
router.post("/", bookController.StoreOneBook);
router.put("/:id", bookController.UpdateOneBook);
router.delete("/:id", bookController.DeleteOneBook);

module.exports = router;
