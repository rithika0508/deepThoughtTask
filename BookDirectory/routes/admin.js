const express = require("express");
const router = express.Router();
const adminLogIn = require("../controllers/admin");

router.route("/adminLogIn").post(adminLogIn)

module.exports = router;