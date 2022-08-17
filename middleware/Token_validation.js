const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();


    const auth = async(req, res, next) => {

        let token = req.header("Authorization");
        if (token) {
            token = token.slice(7);
            jwt.verify(token, process.env.SECRET_KEY, (err) => {
                if (err) {
                    return res.json({
                        success : 0,
                        message : "Invalid Token"
                    });
                } else {
                    console.log("Authorised_user");
                    return next();
                }
            });
        } else {
            return res.json({
                success : 0,
                message : "Access Denied! unauthorised user"
            });
        }
    }
   
module.exports = auth;