const express = require("express");
const { addMatch } = require("../controller/matchController");
const router = express.Router();

router.post("/add-match", addMatch);

module.exports = router;
