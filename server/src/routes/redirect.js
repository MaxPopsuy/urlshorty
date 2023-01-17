const express = require("express");

const url = require("../services/url.service")
const router = express.Router();

router.get("/redirect/:id", url.redirect);

module.exports = router;
