const ProfileModel = require("../models/ProfileModle");

exports.CreateProfile = async( req, res ) => {
    try {
        const reqBody = req.body;
        console.log(reqBody);
        const data = await ProfileModel.create( reqBody);
        res.status(201).json({ status: "Success", data: data });
    }
    catch(err) {
        res.status(500).json({ status: "Failed", message: err.message});
    }
}