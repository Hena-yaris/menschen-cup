const express = require('express');
const router = express.Router();

const {addTeams, teamsList} =  require('../controller/teamController')

router.post('/add-teams',addTeams);
router.get('/teamslist',teamsList);

module.exports =router;