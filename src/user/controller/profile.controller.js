const userModel = require('../models/profile.models');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

const nodemailer = require('nodemailer');
const crypto = require('crypto');

// User forgotPassword:
exports.forgotPassword = (req, res) => {

    console.log(req.body);

    if (req.body.new_password === req.body.confirm_password) {
        const salt = genSaltSync(10);
        const hashPass = hashSync(req.body.new_password, salt);

        userModel.forgotPassword(req.body.email, (err, data) => {
            console.log(data[0].password);
            const result = req.body.email === data[0].email;

            if (result) {
                userModel.updatePassword(req.params.id, hashPass, (err, data) => {
                    if (data) {
                        return res.status(200).json({
                            success: "Password updated Successfully",
                            result: data[0]
                        });
                    } else {
                        return res.json(err);
                    }
                })
            } else {
                return res.status(400).json(err);
            }
        })
    } else {
        return res.status(500).json({ success: true, message: "Email not matched" });
    }
}


// User resetPassword:
exports.resetPassword = (req, res) => {

    console.log(req.body);

    if (req.body.new_password === req.body.confirm_password) {
        const salt = genSaltSync(10);
        const hashPass = hashSync(req.body.new_password, salt);

        userModel.resetPassword(req.params.id, (err, data) => {
            console.log(data[0].password);
            // console.log(data);
            const result = compareSync(req.body.old_password, data[0].password);

            if (result) {
                userModel.updatePassword(req.params.id, hashPass, (err, data) => {
                    if (data) {
                        return res.status(200).json({
                            success: "Password updated Successfully",
                            result: data[0]
                        });
                    } else {
                        return res.json(err);
                    }
                })
            } else {
                return res.status(400).json(err);
            }
        })
    } else {
        return res.status(500).json({ success: false, message: "Password not matched" });
    }
}


// User Logout
exports.logout = (req, res) => {

    userModel.logout(req.body.email, (err, data) => {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).json({ success: true, message: "Logout Successfully", data });
        }
    });
}


// send email
