const express = require('express');

const url = require("../services/url.service")
const router = express.Router();

router.get("/", url.findAll)
router.post("/create", url.create)

module.exports = router;
