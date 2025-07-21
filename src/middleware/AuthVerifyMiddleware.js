const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path: '../../config.js'});

module.exports = (req, res, next) => {
    const reqToken = req.headers['token-key'];

    jwt.verify(reqToken, process.env.SECRETKEY, (err, decoded)=> {
        if(err) {
            res.status(401).json({status: "unauthorized"});
        } else {
            req.user = decoded.data;
            next();
        }
    })
}