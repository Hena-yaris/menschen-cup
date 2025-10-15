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





module.exports = {addMatch};