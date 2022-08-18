const userModel = require('../models/user.models');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

const dotenv = require('dotenv');
const { token } = require('morgan');
dotenv.config();


// Register a new user:
exports.create = (req, res) => {
    //console.log("hey");
    const salt = genSaltSync(10);
    req.body.password = hashSync(req.body.password, salt);
    console.log(req.body.password);

    const jsontokenreg = sign(
        { email: req.body.email },
         process.env.SECRET_KEY,
          { expiresIn: "1h" });
    req.body.token = jsontokenreg;


    userModel.create(req.body, (err, data) => {
        //console.log("before model of create");
        if (err) {
            return res.json({ success: false, message: "Database connection error" });
        } else {
            console.log(req.body.password);
            return res.status(200).json({
                success: "Data Created Successfully",
                data, token: jsontokenreg
            });
        }
    });
}


// Login a user:
exports.login = (req, res) => {

    userModel.getUserByEmail(req.body.email, (err, data) => {
        if (err) {
            return res.json({ message: "Invalid email or password" });
        } else {
            const jsontoken = sign(
                { email: req.body.email },
                 process.env.SECRET_KEY,
                  { expiresIn: "1h" });
                  req.body.token = jsontoken

            const result = compareSync(req.body.password, data.password);
            if (result) {
                userModel.updateToken(jsontoken, data.email, (err, data) => {
                    if (err) {
                        return res.json(err);
                    } else {
                        return res.status(200).json({
                            success: "Login Successfully", token: jsontoken
                        });
                    }
                })                               
            } else {
                return res.json({ success: 0, message: "Invalid email or password" });
            }
        }
    });
}


// getAll Registered users:
exports.getAll = (req, res) => {
    console.log("in get all");
    userModel.getAll((err, data) => {
        if (err) {
            return res.json({ success: false, message: "Record not found" });
        } else {
            return res.status(200).json({ success: "Users fetched successfully", data });
        }
    });
}


// get Registered user ById: 
exports.getById = (req, res) => {

    userModel.getById(req.params.id, (err, data) => {
        if (err) {
            return res.json({ success: false, message: error });
        } else {
            return res.status(200).json({ data })
        }
    });
}


// Update a Registered user:
exports.update = (req, res) => {

    const salt = genSaltSync(10);
    req.body.password = hashSync(req.body.password, salt);

    userModel.update(req.params.id, req.body, (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Data not updated" });
        } else {
            return res.status(200).json({ success: "Data Updated successfully", data: result });
        }
    });
}


// Delete a Registered user:
exports.delete = (req, res) => {

    userModel.delete(req.params.id, (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, message: err });
        } else {
            return res.status(200).json({ data });
        }
    });
}



// Show User post:
exports.showUserPost = (req, res) => {

    userModel.showUserPost(req.params.id, (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, message: err });
        } else {
            return res.status(200).json({ data });
        }
    });
}


// Show all post: through Admin Access
exports.adminAccess = (req, res) => {

    userModel.adminAccess(req.body, (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, message: err });
        } else {
            return res.status(200).json({ data });
        }
    });
}


// Show post ById: through Admin Access
exports.adminGetById = (req, res) => {

    userModel.adminGetById(req.params.id, (err, data) => {
        if (err) {
            return res.json({ success: false, message: error });
        } else {
            return res.status(200).json({ data })
        }
    });
}


// Update post: through Admin Access
exports.adminPostUpdate = (req, res) => {

    if (Object.keys(req.body).length === 0) {
        res.status(400).send({ success: false, message: "Please provide all fields" });
    } else {
        userModel.adminPostUpdate(req.params.id, req.body, (err, result) => {
            if (err)
                return res.status(500).json({ success: false, message: "Data not updated" });
            else
                return res.status(200).json({ success: "Data Updated successfully", data: result });
        });
    }
}


// Soft Delete post: through Admin Access
exports.adminPostDelete = (req, res) => {

    userModel.adminPostDelete(req.params.id, (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, message: err });
        } else {
            return res.status(200).json({ data });
        }
    });
}