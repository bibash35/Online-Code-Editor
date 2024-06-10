const User = require("../model/User");
const bcrypt = require("bcrypt");


const signup = async (req, res, next) => {
  
    try {
      
    
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
          return res.status(400).json({ error: 'Email already in use' });
      }

      // Hash the password
      let hashed = await bcrypt.hash(req.body.password, 10);

      // Create the user
      let user = await User.create({ ...req.body, password: hashed });
      res.send(user);
  } catch (err) {
      next(err);
  }
    
  };

 
  

  const login = async (req, res) => {
    /* server side validation for login  */
  
    let user = await User.findOne({ email: req.body.email }).select('+password'); // null
  
    if (user) {
      let matched = await bcrypt.compare(req.body.password, user.password);
  
      if (matched) {
        user = user.toObject();
        return res.send(user);
      }
    }
  
    res.status(401).send({
      msg: "invalid credentials",
    });
  };
  

  const getAllUsers = async (req, res) => {
    try {
      const users = await User.find().select("-password"); // Exclude passwords from the result
  
      res.send(users);
    } catch (err) {
      console.log(err);
    }
  };
  module.exports = {
    signup,
    login,
    getAllUsers,
  };