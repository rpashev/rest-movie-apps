
const User = require("../models/user");


const Register = async (req, res, next) => {
    const user = new User({
      username: "Test1",
      email: "abcd@abv.bg",
      password: "rossen",
    });
    try {
      await user.save();
      res.send("Success")
      
    } catch(err) {
      // throw createError(400, "You suck")
    }
}

exports.Register = Register;
  