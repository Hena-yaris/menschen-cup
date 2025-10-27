const dbconnection = require('../db/db-config')



// Match recorded and team stats
const addMatch = async (req, res) => {
  const { team_a_id, team_b_id, score_a, score_b, group_name, stage } =
    req.body;

  try {
    let matchUpdated = false;

    // 1. Check if an unplayed fixture already exists for ANY stage.
    // If a fixture exists (either group or knockout), we UPDATE the score.
    const [existingMatches] = await dbconnection.execute(
      `SELECT id, team_a_id, team_b_id FROM matches WHERE stage = ? AND played = false
        AND ( (team_a_id = ? AND team_b_id = ?) OR (team_a_id = ? AND team_b_id = ?) )`,
      [stage, team_a_id, team_b_id, team_b_id, team_a_id]
    );

    if (existingMatches.length > 0) {
      // Match fixture found, so we UPDATE the score instead of INSERTING
      const matchId = existingMatches[0].id;
      
      // Ensure scores are mapped correctly to match the fixture's team order
      let final_score_a = score_a;
      let final_score_b = score_b;

      // If team_a in the request is actually team_b in the existing fixture, swap the scores
      if (existingMatches[0].team_a_id != team_a_id) {
        final_score_a = score_b;
        final_score_b = score_a;
      }

      // **UPDATE** the existing fixture row with scores and set 'played' to true.
      const updateSql = `
        UPDATE matches SET score_a = ?, score_b = ?, played = true
        WHERE id = ?
      `;
      await dbconnection.execute(updateSql, [final_score_a, final_score_b, matchId]);
      
      matchUpdated = true;
    } else {
      // If we are here, it means no fixture was found. This is expected if the match
      // is being added manually (e.g., an ad-hoc friendly game).
      console.warn(`No unplayed fixture found for stage: ${stage}. Proceeding to INSERT new match.`);
    }
    
    // 2. If no existing match was found/updated, INSERT a new record.
    // This handles manual entry or ad-hoc matches that were never set up as fixtures.
    if (!matchUpdated) {
      const insertSql = `
        INSERT INTO matches (team_a_id, team_b_id, score_a, score_b, group_name, stage, played)
        VALUES (?, ?, ?, ?, ?, ?, true)
      `;
      await dbconnection.execute(insertSql, [
        team_a_id,
        team_b_id,
        score_a,
        score_b,
        group_name,
        stage,
      ]);
    }

    // 3. Update team stats (This block remains ONLY for group stage matches)
    if (stage === "group") {
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
      
      // Update goals, points, and results for both teams
      // Team A update
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

      // Team B update
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
    }
    

    res.json({
      message: `✅ Match score recorded/updated for ${
        stage === "group" ? "group" : "knockout"
      } stage`,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "❌ Error adding/updating match", error: err.message });
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

//Group fixtures
const groupMatchFixtures = async (req, res) => {

  try {
    const [matches] = await dbconnection.execute(`
      SELECT m.id, m.stage, m.group_name, m.score_a, m.score_b, m.played,
             ta.name AS team_a_name, tb.name AS team_b_name
      FROM matches m
      JOIN teams ta ON m.team_a_id = ta.id
      JOIN teams tb ON m.team_b_id = tb.id
      
      ORDER BY m.group_name, m.date;
    `);
    res.status(201).json(matches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// QUARTER FINALS SELECTION (Safe Version)
const quarterSelection = async (req, res) => {
  try {
    // check if quarterfinals already exist
    const [existing] = await dbconnection.execute(
      `SELECT id FROM matches WHERE stage = 'quarter'`
    );

    if (existing.length > 0) {
      return res.status(400).json({
        message: "⚠️ Quarterfinals already created. No new matches added.",
      });
    }

    // fetch teams
    const [teams] = await dbconnection.execute(
      `SELECT id,name,group_name,points,goals_for,goals_against 
       FROM teams 
       WHERE group_name IS NOT NULL`
    );

    // group them
    const grouped = teams.reduce((acc, team) => {
      if (!acc[team.group_name]) acc[team.group_name] = [];
      acc[team.group_name].push(team);
      return acc;
    }, {});

    // sort inside each group
    for (const g in grouped) {
      grouped[g].sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        const gdA = a.goals_for - a.goals_against;
        const gdB = b.goals_for - b.goals_against;
        if (gdB !== gdA) return gdB - gdA;
        return b.goals_for - a.goals_for;
      });
    }

    // top two per group
    let qualified = [];
    for (const g in grouped) {
      qualified.push(grouped[g][0]);
      qualified.push(grouped[g][1]);
    }

    // best 3rd-place teams
    let thirdplaces = Object.values(grouped)
      .map((g) => g[2])
      .filter(Boolean);

    thirdplaces.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      const gdA = a.goals_for - a.goals_against;
      const gdB = b.goals_for - b.goals_against;
      if (gdB !== gdA) return gdB - gdA;
      return b.goals_for - a.goals_for;
    });

    qualified.push(thirdplaces[0], thirdplaces[1]);

    // define pairings
    const A = grouped["A"];
    const B = grouped["B"];
    const C = grouped["C"];
    const bestThirds = [thirdplaces[0], thirdplaces[1]];

    const qfPairs = [
      { a: A[0], b: B[1] },
      { a: B[0], b: C[1] },
      { a: C[0], b: bestThirds[0] },
      { a: A[1], b: bestThirds[1] },
    ];

    // insert into matches table
    for (const pair of qfPairs) {
      await dbconnection.execute(
        `INSERT INTO matches (stage, team_a_id, team_b_id, played)
         VALUES (?, ?, ?, ?)`,
        ["quarter", pair.a.id, pair.b.id, false]
      );
    }

    res.status(200).json({
      message: "✅ Quarterfinal matches generated successfully",
      total: qfPairs.length,
    });
  } catch (err) {
    console.error("❌ Error in quarterSelection:", err.message);
    res.status(500).json({ error: err.message });
  }
};



//🥈 Semifinal Selection
const semiSelection = async (req, res) => {
  try {
    // 1. get quarterfinal matches that are finished
    const [quarters] = await dbconnection.execute(`
      SELECT id, team_a_id, team_b_id, score_a, score_b 
      FROM matches 
      WHERE stage = 'quarter' AND played = true
    `);

    if (quarters.length < 4) {
      return res
        .status(400)
        .json({ message: "❌ Not all quarterfinals are finished yet" });
    }

    // 2. determine winners
    const winners = quarters
      .map((m) => {
        if (m.score_a > m.score_b) return m.team_a_id;
        if (m.score_b > m.score_a) return m.team_b_id;
        return null; // handle draws separately if needed
      })
      .filter(Boolean);

    // 3. make semifinal pairs (1 vs 2, 3 vs 4)
    const sfPairs = [
      { a: winners[0], b: winners[1] },
      { a: winners[2], b: winners[3] },
    ];

    // 4. insert into DB
    for (const pair of sfPairs) {
      await dbconnection.execute(
        `INSERT INTO matches (stage, team_a_id, team_b_id, played) VALUES (?, ?, ?, ?)`,
        ["semi", pair.a, pair.b, false]
      );
    }

    res.json({
      message: "✅ Semifinal matches created",
      total: sfPairs.length,
    });
  } catch (err) {
    console.error("❌ Error in semiSelection:", err);
    res.status(500).json({ message: err.message });
  }
};



//🏆 Final Selection
const finalSelection = async (req, res) => {
  try {
    const [semis] = await dbconnection.execute(`
      SELECT id, team_a_id, team_b_id, score_a, score_b 
      FROM matches 
      WHERE stage = 'semi' AND played = true
    `);

    if (semis.length < 2) {
      return res
        .status(400)
        .json({ message: "❌ Not all semifinals are finished yet" });
    }

    const winners = semis.map((m) =>
      m.score_a > m.score_b ? m.team_a_id : m.team_b_id
    );

    await dbconnection.execute(
      `INSERT INTO matches (stage, team_a_id, team_b_id, played) VALUES (?, ?, ?, ?)`,
      ["final", winners[0], winners[1], false]
    );

    res.json({ message: "🏆 Final match created" });
  } catch (err) {
    console.error("❌ Error in finalSelection:", err);
    res.status(500).json({ message: err.message });
  }
};





module.exports = {
  addMatch,
  autoGenerateGroupMatches,
  groupMatchFixtures,
  quarterSelection,
  semiSelection,
  finalSelection,
};
