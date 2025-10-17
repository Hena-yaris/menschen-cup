const dbconnection = require('../db/db-config');


//add teams
const addTeams = async (req,res)=> {
    const {name}= req.body;
    if(!name) {
        return res.status(400).json({message: "Name  is required"});
    }

    try {
        await dbconnection.execute(`INSERT INTO teams (name) VALUES (?)`, [name]);

        res.status(201).json({message: "team added successfully"})
    }catch(err) {
        console.error(err);
        res.status(400).json({message: "Error adding team"})
    }
}

const teamsList= async (req, res) => {

  try {
    const [rows] = await dbconnection.execute(
      "SELECT * FROM teams ORDER BY group_name, id"
    );
    res.json(rows);
  } catch (err) {
    console.error("DB Error:", err);
    res
      .status(500)
      .json({ message: "Error fetching teams", error: err.message });
  }
};

// generate groups automatically
const generateGroups = async (req, res) => {
  try {
    // 1️⃣ get all teams
    const [teams] = await dbconnection.execute("SELECT id, name FROM teams");

    if (teams.length < 4) {
      return res
        .status(400)
        .json({ message: "Need at least 4 teams to form groups" });
    }

    // 2️⃣ shuffle randomly (Fisher-Yates)
    function shuffle(array) {
      const result = [...array]; // make a copy so we don't mutate the original
      for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // pick a random index from 0 → i
        [result[i], result[j]] = [result[j], result[i]]; // swap the two elements
      }
      return result;
    }
    
    const shuffled =shuffle(teams);

    // 3️⃣ split into 4 groups (A, B, C, D)
    const groupLabels = ["A", "B", "C"];
    const groupAssignments = shuffled.map((team, index) => ({
      id: team.id,
      group: groupLabels[index % 3],
    }));

    // 4️⃣ update each team’s group_name in DB
    for (const { id, group } of groupAssignments) {
      await dbconnection.execute(
        "UPDATE teams SET group_name = ? WHERE id = ?",
        [group, id]
      );
    }

    res.json({ message: "✅ Groups generated successfully", groups: groupAssignments });
  } catch (err) {
    console.error("DB Error:", err);
    res
      .status(500)
      .json({ message: "Error generating groups", error: err.message });
  }
};


module.exports = { addTeams, teamsList, generateGroups };