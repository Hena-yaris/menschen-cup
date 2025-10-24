const express = require("express");
const {
  addMatch,
  autoGenerateGroupMatches,
  groupMatchFixtures,
  quarterSelection,
} = require("../controller/matchController");
const router = express.Router();

router.post("/add-match", addMatch);
router.post("/generateGroup-match", autoGenerateGroupMatches);
router.get("/groupMatch-fixture", groupMatchFixtures);

router.post("/quarterSelection", quarterSelection);


//get teams by its stage
// router.get("/getTeams", getTeams);


module.exports = router;
