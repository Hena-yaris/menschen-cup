const dbconnection = require("./db-config");

const createTeams = `
CREATE TABLE IF NOT EXISTS teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    group_name CHAR(1),
    wins INT DEFAULT 0,
    draws INT DEFAULT 0,
    losses INT DEFAULT 0,
    goals_for INT DEFAULT 0,
    goals_against INT DEFAULT 0,
    points INT DEFAULT 0
)`;

const createMatches = `
CREATE TABLE IF NOT EXISTS matches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    stage ENUM('group','quarter','semi','final') NOT NULL,
    group_name CHAR(1),
    team_a_id INT NOT NULL,
    team_b_id INT NOT NULL,
    score_a INT DEFAULT NULL,
    score_b INT DEFAULT NULL,
    date DATETIME,
    played BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (team_a_id) REFERENCES teams(id),
    FOREIGN KEY (team_b_id) REFERENCES teams(id)
)`;



const createUsers = `
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin','student') DEFAULT 'student'
)`;

async function setupDB() {
  try {
    await dbconnection.execute(createTeams);
    console.log("✅ Teams table ready");

    await dbconnection.execute(createMatches);
    console.log("✅ Matches table ready");

    await dbconnection.execute(createStages);
    console.log("✅ Stages table ready");

    await dbconnection.execute(createUsers);
    console.log("✅ Users table ready");

    await dbconnection.end();
    console.log("🔒 Connection closed");
  } catch (err) {
    console.error("❌ DB setup error:", err.message);

    if (dbconnection.end) await dbconnection.end();
  }
}

setupDB();
