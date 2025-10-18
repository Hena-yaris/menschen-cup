const dbconnection = require('../db/db-config')


// Match recorded and team stats 
const addMatch = async (req, res) => {
  const { team_a_id, team_b_id, score_a, score_b, group_name, stage } =
    req.body;

  try {
    // 1. insert the match
    const sql = `
      INSERT INTO matches (team_a_id, team_b_id, score_a, score_b, group_name, stage, played)
      VALUES (?, ?, ?, ?, ?, ?, true)
    `;
    await dbconnection.execute(sql, [
      team_a_id,
      team_b_id,
      score_a,
      score_b,
      group_name,
      stage,
    ]);

    // 2. update team stats
    let resultA = 0;
    let resultB = 0;

    if (score_a > score_b) {
      resultA = 3; // win for A
    } else if (score_b > score_a) {
      resultB = 3; // win for B
    } else {
      resultA = 1;
      resultB = 1; // draw
    }
    // 3. update goals, points, and results for both teams
    await dbconnection.execute(
      `UPDATE teams 
       SET goals_for = goals_for + ?, 
           goals_against = goals_against + ?, 
           points = points + ?,
           wins = wins + ?,
           draws = draws + ?,
           losses = losses + ?
       WHERE id = ?`,
      [
        score_a,
        score_b,
        resultA,
        resultA === 3 ? 1 : 0,
        resultA === 1 ? 1 : 0,
        resultA === 0 ? 1 : 0,
        team_a_id,
      ]
    );

    await dbconnection.execute(
      `UPDATE teams 
       SET goals_for = goals_for + ?, 
           goals_against = goals_against + ?, 
           points = points + ?,
           wins = wins + ?,
           draws = draws + ?,
           losses = losses + ?
       WHERE id = ?`,
      [
        score_b,
        score_a,
        resultB,
        resultB === 3 ? 1 : 0,
        resultB === 1 ? 1 : 0,
        resultB === 0 ? 1 : 0,
        team_b_id,
      ]
    );

    res.json({ message: "✅ Match recorded and team stats updated" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "❌ Error adding match", error: err.message });
  }
};


//generate group matches

const autoGenerateGroupMatches = async (req, res) => {
  try {
    // 1️⃣ get all teams with their group names
    const [teams] = await dbconnection.execute(
      "SELECT id, group_name FROM teams WHERE group_name IS NOT NULL"
    );

    // 2️⃣ group them by group_name
        

    const grouped = teams.reduce((acc, team) => {
      if (!acc[team.group_name]) acc[team.group_name] = [];
      acc[team.group_name].push(team);
      return acc;
    }, {});

    // // 3️⃣ generate all unique match combinations within each group
    const matchPairs = [];
    for (const group in grouped) {
      const groupTeams = grouped[group];
      for (let i = 0; i < groupTeams.length; i++) {
        for (let j = i + 1; j < groupTeams.length; j++) {
          matchPairs.push({
            stage: "group",
            group_name: group,
            team_a_id: groupTeams[i].id,
            team_b_id: groupTeams[j].id,
          });
        }
      }
    }

    // 4️⃣ insert all matches into DB
    for (const match of matchPairs) {
      await dbconnection.execute(
        "INSERT INTO matches (stage, group_name, team_a_id, team_b_id, played) VALUES (?, ?, ?, ?, ?)",
        [match.stage, match.group_name, match.team_a_id, match.team_b_id, false]
      );
    }

    res
      .status(201)
      .json({
        message: "Group matches generated successfully",
        total: matchPairs.length,
      });
  } catch (err) {
    console.error("DB Error:", err);
    res
      .status(500)
      .json({ message: "Error generating group matches", error: err.message });
  }
};





module.exports = { addMatch, autoGenerateGroupMatches };