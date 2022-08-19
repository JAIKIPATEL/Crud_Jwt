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

    


    exports.isUser = (req, res, next) => {
        if(res.locals.type == 'user'){
            next();
        }
        else{
            res.send("You don't have the authorization");
        }
    }
    
    exports.isAdmin = (req, res, next) => {
        if(res.locals.type == 'admin'){
            next();
        }
        else{
            res.send("You don't have the authorization");
        }
    }
module.exports = auth;