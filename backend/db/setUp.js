const dbconnection = require('./db-config');
const bcrypt = require("bcrypt");




const createTeams = `CREATE TABLE IF NOT EXISTS teams (
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

const createMatches = `CREATE TABLE IF NOT EXISTS matches (
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

const createStages = `CREATE TABLE IF NOT EXISTS stages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50),
        active BOOLEAN DEFAULT FALSE
)`;

const createUsers = `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin','student') DEFAULT 'student'
)`;

/**
 * Function to set up the entire database structure and initial data.
 */
(async () => {
    // 1. Define Admin Passwords (use strings for security best practice)
    const admin1_pass = "adminPass1234!"; // Use a strong password!
    const admin2_pass = "backupPass5678!";

    try {
        // --- 2. Create Tables ---
        // (Optional: await dbconnection.execute("DROP TABLE IF EXISTS users");)

        await dbconnection.execute(createTeams);
        console.log("✅ Teams Table ready");

        await dbconnection.execute(createMatches);
        console.log("✅ Matches Table ready");

        await dbconnection.execute(createStages);
        console.log("✅ Stages Table ready");

        await dbconnection.execute(createUsers);
        console.log("✅ Users Table ready");
        
        // --- 3. Hash Passwords and Insert Admin Users ---
        // The hashing MUST happen inside the async block
        const salt = await bcrypt.genSalt(10);
        const hashedPassA1 = await bcrypt.hash(admin1_pass, salt);
        const hashedPassA2 = await bcrypt.hash(admin2_pass, salt);
        console.log("✅ Admin passwords hashed.");
        
        // Use INSERT IGNORE to prevent errors if the script is run multiple times
        const insertAdminsQuery = `
            INSERT IGNORE INTO users (username, email, password, role) 
            VALUES 
            (?, ?, ?, ?),
            (?, ?, ?, ?)
        `;
        
        const params = [
            "main_admin", "main@gmail.mfm", hashedPassA1, "admin",
            "backup_admin", "backup@gmail.mfm", hashedPassA2, "admin"
        ];
        
        const [result] = await dbconnection.execute(insertAdminsQuery, params);
        console.log(`✅ Admin seeding complete. ${result.affectedRows} new admin(s) inserted.`);


        // 4. IMPORTANT: Close the connection/pool when done
        if (dbconnection.end) {
            await dbconnection.end();
            console.log("✅ Database connection closed.");
        }
        
    } catch (err) {
        console.error("❌ Error setting up database:", err.message);
        // Ensure connection is closed even on error
        if (dbconnection.end) {
             await dbconnection.end();
        }
    }
})();