const dbconnection = require("../db/db-config");

const bcrypt = require("bcrypt");

//register
const register = async (req,res)=> {
    const {username,email,password} = req.body;
     
    if(!username || !email || !password) {
        return res
          .status(400)
          .json({ message: "please provide all required fields" });
    }
    if(password.length<8){
        return res.status(400).json(({message:"password is must be at least 8"}));
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


//login
const login = async (req,res)=> {
    const {email,password} = req.body;
    if(!email || !password) {
        return res.status(400).json({message: "please provide all required fields"})
    }

    if(password.length<8){
        return res.status(400).json({message: "password must be at least 8 character"})
    }

    try {
        const [user] = await dbconnection.execute("SELECT username,id,password FROM users WHERE email=?",[email]);

        if(user.length===0) {
            return res.status(400).json({message:"invalid credential!"})
        } 
            const isMatch = await bcrypt.compare(password, user[0].password);
            if (!isMatch) {
              return res.json({
                message: "invalid credential",
              });
            } 
              return res.json({ user:user[0].password });
            
    
    }catch (err) {

        console.log(err.message);
        return res.status(500).json({message:"something went wrong"})

    }
    

   
}

module.exports= {register,login};