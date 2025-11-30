const dbconnection = require("../db/db-config");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register
const register = async (req,res)=> {
    const {username,email,password} = req.body;
     
    if(!username || !email || !password) {
        return res
          .status(400)
          .json({ message: "please provide all required fields" });
    }
    if(password.length<8){
        return res.status(400).json(({message:"password must be at least 8"}));
     }

     try {
        const [user] = await dbconnection.execute(`SELECT username,id FROM users WHERE username=? or email=?`,[username,email]);

        if(user.length > 0){
            return res.status(400).json({ message: "user already existed" });
        }

        //encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password,salt);
        
        await dbconnection.execute(
              "INSERT INTO users(username,email,password) VALUES(?,?,?)",
              [username, email, hashedPass]
            ); 


            return res.status(201).json({ message: "user registered" });
        
     } catch (err) {
        console.log(err.message);
        return res.status(500).json({message: "something went wrong buddy,please try again!"})
     }

    
}    


const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "please provide all required fields" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "password must be at least 8 character" });
  }

  try {
    const [rows] = await dbconnection.execute(
      "SELECT username, id, role, password FROM users WHERE email=?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "invalid credential!" });
    }

    const user = rows[0];
    

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "invalid credential" });
    }

    const token = jwt.sign(
      {
        username: user.username,
        userId: user.id, // FIXED
        role: user.role,
      },
      process.env.JWT_SECRET || "henayaris",
      { expiresIn: "21d" }
    );

    return res.status(200).json({
      message: "Login successfully",
      token,
      user: {
        username: user.username,
        role: user.role,
        id: user.id,
      },
    });
  } catch (err) {
    console.error("❌ Error in Login:", err.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
};


//check
const checkUser = async (req, res) => {
    const {userId,username,role} = req.user;
  try {
    res.status(200).json({message:'Valid user',userId,username,role});
  }  catch (err) {
  console.error("❌ Error in checking:", err.message);
  return res.status(500).json({ message: "Something went wrong" });
}

};


// CREATE ADMIN (Protected via Secret Key)
const createAdmin = async (req, res) => {
  const { username, email, password, secret } = req.body;

  try {
    // 1. Check secret key
    if (secret !== process.env.ADMIN_SETUP_KEY) {
        console.log("Got secret:", secret);
        console.log("ENV secret:", process.env.ADMIN_SETUP_KEY);

      return res.status(403).json({ message: "Unauthorized" });
    }

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Provide all fields" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password too short" });
    }

    // 2. Check duplicates
    const [existing] = await dbconnection.execute(
      "SELECT id FROM users WHERE username=? OR email=?",
      [username, email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    // 4. Insert Admin
    await dbconnection.execute(
      "INSERT INTO users(username,email,password,role) VALUES (?,?,?, 'admin')",
      [username, email, hashed]
    );

    return res.status(201).json({ message: "Admin created successfully!" });

  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};


module.exports= {register,login,checkUser,createAdmin};