const express = require('express');
const router = express.Router();

const {
  addTeams,
  teamsList,
  generateGroups,
  resetTeamsData,
} = require("../controller/teamController");
const roleMiddleware = require('../middleware/roleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

console.log("🔥 teamRoutes loaded");


router.post('/add-teams',authMiddleware,roleMiddleware("admin"),addTeams);
router.get("/teamslist", authMiddleware, teamsList);
router.post('/auto-group',authMiddleware,roleMiddleware("admin"),generateGroups);

//resetting teams data
router.delete("/reset-Demo",authMiddleware,roleMiddleware("admin"),resetTeamsData)

module.exports =router;