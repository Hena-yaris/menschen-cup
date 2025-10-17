const express = require('express');
const router = express.Router();

const {
  addTeams,
  teamsList,
  generateGroups,
} = require("../controller/teamController");

router.post('/add-teams',addTeams);
router.get('/teamslist',teamsList);
router.post('/auto-group',generateGroups);

module.exports =router;