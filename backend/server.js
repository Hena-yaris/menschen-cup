const express = require('express');


const PORT = 3000;


const app = express();
app.use(express.json());

app.get('/', (req,res)=> {
    res.send("hey buddy how's it going");
})

//Routes
const teamRoutes = require('./routes/teamRoutes');
app.use('/api/teams',teamRoutes);






const dbconnection = require('./db/db-config')
async function start() {
  try {
    // test DB connection
    await dbconnection.execute("SELECT 'DB Connected'");
    console.log("✅ Database connection established");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect DB:", err.message);
  }
}

start();
