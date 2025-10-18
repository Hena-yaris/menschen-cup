const express = require("express");
const {
  addMatch,
  autoGenerateGroupMatches,
} = require("../controller/matchController");
const router = express.Router();

router.post("/add-match", addMatch);
router.post("/generateGroup-match", autoGenerateGroupMatches);

module.exports = router;
