const ProfileModel = require("../models/ProfileModle");
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path: '../../config.js'});

exports.CreateProfile = async( req, res ) => {
    try {
        const reqBody = req.body;
        const data = await ProfileModel.create( reqBody);
        res.status(201).json({ status: "Success", data: data });
    }
    catch(err) {
        res.status(500).json({ status: "Failed", message: err.message});
    }
}

// UserLogin
exports.UserLogin = async (req, res) => {
  try {
    const { UserName, Password } = req.body;

    // Input validation check
    if (!UserName || !Password) {
      return res.status(400).json({
        status: "Failed",
        message: "UserName and Password are required.",
      });
    }

    // User search
    const user = await ProfileModel.findOne({ UserName, Password });

    if (!user) {
      return res.status(401).json({
        status: "Failed",
        message: "Invalid credentials. UserName or Password is incorrect.",
      });
    } else {
        let payload = {
            exp: Math.floor(Date.now() / 1000) + (24* 60 * 60),
            data: user 
        }
        let token = jwt.sign(payload, process.env.SECRETKEY);

        // Success response
        res.status(200).json({
            status: "Success",
            token: token,
            data: user,
        });
    }

    
  } catch (err) {
    console.error("Login error:", err); 
    res.status(500).json({
      status: "Failed",
      message: "Something went wrong. Please try again later.",
      error: err.message, 
    });
  }
};

// SelectProfile
exports.SelectProfile = async( req, res ) => {
    try {
        let UserName = req.user.UserName;
        const data = await ProfileModel.find({UserName: UserName});
        res.status(200).json({ status: "Success", data: data });
    }
    catch(err) {
        res.status(500).json({ status: "Failed", message: err.message});
    }
}

// Update profile
exports.UpdateProfile = async (req, res) => {
  try {
    const userName = req.user.UserName; 
    const reqBody = req.body;

    const result = await ProfileModel.updateOne(
      { UserName: userName }, 
      { $set: reqBody }       
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ status: "fail", message: "No profile updated. User not found or data is same." });
    }

    res.status(200).json({
      status: "success",
      message: "Profile updated successfully!",
      updatedData: reqBody
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};


