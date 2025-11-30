const express = require("express");
const router = express.Router();

const {register,login,checkUser,createAdmin} = require('../controller/userController');
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login",login);
router.get("/check",authMiddleware,checkUser);

//admin creation
router.post('/create-admin', createAdmin);



module.exports = router;