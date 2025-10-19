const express = require("express");
const {
  addMatch,
  autoGenerateGroupMatches,
  groupMatchFixtures,
} = require("../controller/matchController");
const router = express.Router();

router.post("/add-match", addMatch);
router.post("/generateGroup-match", autoGenerateGroupMatches);
router.get("/groupMatch-fixture", groupMatchFixtures);

module.exports = router;
