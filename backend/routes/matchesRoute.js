const express = require("express");
const {
  addMatch,
  autoGenerateGroupMatches,
  groupMatchFixtures,
  quarterSelection,
  semiSelection,
  finalSelection,
} = require("../controller/matchController");
const router = express.Router();

router.post("/add-match", addMatch);
router.post("/generateGroup-match", autoGenerateGroupMatches);
router.get("/groupMatch-fixture", groupMatchFixtures);

router.post("/quarterSelection", quarterSelection);
router.post("/semiSelection", semiSelection);
router.post("/finalSelection", finalSelection);



module.exports = router;
