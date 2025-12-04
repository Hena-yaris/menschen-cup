const express = require("express");
const {
  addMatch,
  autoGenerateGroupMatches,
  groupMatchFixtures,
  quarterSelection,
  semiSelection,
  finalSelection,
  knockoutFixture,
} = require("../controller/matchController");
const roleMiddleware = require("../middleware/RoleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/add-match",authMiddleware,roleMiddleware("admin"), addMatch);
router.post("/generateGroup-match", autoGenerateGroupMatches);
router.get("/groupMatch-fixture", groupMatchFixtures);

router.post("/quarterSelection", quarterSelection);
router.post("/semiSelection", semiSelection);
router.post("/finalSelection", finalSelection);

router.get('/knockout/:stage',knockoutFixture)



module.exports = router;
