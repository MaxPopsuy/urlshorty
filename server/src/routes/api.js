const express = require("express");

const router = express.Router();

router.use("/url", require("./url"));

module.exports = router;
