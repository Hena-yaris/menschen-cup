const dbconnection = require('../db/db-config');


//add teams
const addTeams = async (req,res)=> {
    const {name,group_name}= req.body;
    if(!name || !group_name) {
        return res.status(400).json({message: "Name and Group name are required"});
    }

    try {
        await dbconnection.execute(`INSERT INTO teams (name, group_name) VALUES (?,?)`, [name,group_name]);

        res.status(201).json({message: "team added successfully"})
    }catch(err) {
        console.error(err);
        res.status(400).json({message: "Error adding team"})
    }
}

module.exports = {addTeams};