const express = require('express');
const router = express.Router();

const {addTeams} =  require('../controller/teamController')

router.post('/add-teams',addTeams);

module.exports =router;