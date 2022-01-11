const express = require("express");
const { createBook, readBooks, updateBook, deleteBook } = require("../controllers/books");
const router = express.Router();
const { adminAccess } = require("../middlewares/admin")

router.route("/createBook").post(adminAccess, createBook)
router.route("/readBooks").get(readBooks)
router.route("/updateBook").put(adminAccess, updateBook)
router.route("/deleteBook").delete(adminAccess, deleteBook)

module.exports = router;