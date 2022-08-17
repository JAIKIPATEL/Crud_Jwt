const userModel = require('../models/profile.models');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

const nodemailer = require('nodemailer');
const crypto = require('crypto');


// User forgotPassword:
// exports.forgotPassword = (req, res) => {
//     const email = req.body.email;

//     userModel.findOne({ email }, (err, user) => {
//         if (err || !user) {
//             return res.status(400).json({ error: "User with this email doesn't exists" });
//         }
//         const token = jwt.sign({ data }, process.env.RESET_PASSWORD_KEY, { expiresIn: "10m" });

//         let transport = nodemailer.createTransport({
//             host: 'smtp.gmail.com',
//             port: 465,
//             secure: true,
//             auth: {
//                 user: process.env.GOOGLE_APP_EMAIL,
//                 pass: process.env.GOOGLE_APP_PW
//             },
//         });

//         const forgot = {
//             to: email,
//             subject: 'Reset Account Password link',
//             html: `<h3> Please Click on given link to reset your password </h3>
//                 <p> ${process.env.APP_PORT}/resetPassword/${token} </p>`
//         }

//         return user.updateOne({ resetLink: token }, (err, user) => {
//             if (err) {
//                 return res.status(400).json({ error: "Reset Password link error" });
//             } else {
//                 transport.sendMail(forgot, (err) => {
//                     if (err) {
//                         return res.status(400).json({ error: error.message });
//                     } else {
//                         return res.status(200).json({
//                             message: `Email have been sent! kindly follow the instructions`,
//                             data, token: jsontokenreg
//                         });
//                     }
//                 });
//             }
//         })
//     });
// }


// User resetPassword:
exports.resetPassword = async (req, res, next) => {

    //     const salt = genSaltSync(10);
    //     req.body.password = hashSync(req.body.password, salt);

    //     userModel.findOne( email, (err, data) => {
    //         if (err) {
    //             // console.log(data.password + "data.password");
    //             return res.status(400).json({ error: "User with this email doesn't exists" });
    //         }
    //         else if (result != data.password) {
    //             return res.status(500).json({ success: false, message: "Password not matched" });
    //         }
    //         else {
    //             console.log(req.body.password);
    //             const result = compareSync(new_password, req.body.password);
    //             // userModel.updatePassword(hashSync(password))
    //             if (result)
    //                 data.password = undefined;

    //             const jsontoken = sign({ result: data[0] }, process.env.SECRET_KEY, { expiresIn: "10m" });
    //             // new_password === confirm_password;         

    //             return res.status(200).json({
    //                 success: "Password Updated successfully",
    //                 result: data[0], token: jsontoken
    //             });
    //         }
    //     });
    // }

    const data = await model.findByEmail(res.locals.email);
    const user = (data[0])[0];
    if (bcrypt.compareSync(req.body.oldPass, user.pass)) {
        const hashPass = await bcrypt.hash(req.body.newPass, 10);
        await model.updatePassword(hashPass, res.locals.email);
        return res.send("Password Reset Sucessfully");

    }
    next();
}


// User Logout
exports.logout = (req, res) => {
    const email = req.body.email;

    userModel.findOne({ email }, (err, user) => {

    });
}


// exports.forgotPassword = async (req, res, next) => {
//     try {
//         const email = req.body.email;
//         console.log(email);

//         const origin = req.header('Origin'); // we are  getting the request origin from  the HOST header

//         const user = await db.getUserByEmail(email);

//         if (!user) {
//             // here we always return ok response to prevent email enumeration
//             return res.json({ status: 'ok' });
//         }
//         // Get all the tokens that were previously set for this user and set used to 1. This will prevent old and expired tokens  from being used. 
//         await db.expireOldTokens(email, 1);

//         // create reset token that expires after 1 hours
//         const resetToken = crypto.randomBytes(40).toString('hex');
//         const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000);
//         const createdAt = new Date(Date.now());


//         const expiredAt = resetTokenExpires;


//         //insert the new token into resetPasswordToken table
//         await db.insertResetToken(email, resetToken, createdAt, expiredAt, 0);

//         // send email
//         await sendPasswordResetEmail(email, resetToken, origin);
//         res.json({ message: 'Please check your email for a new password' });


//     } catch (e) {
//         console.log(e);
//     }
// };



// async function sendEmail({ to, subject, html, from = process.env.EMAIL_FROM }) {

//     const transporter = nodemailer.createTransport({
//         host: 'smtp.ethereal.email',
//         port: 587,
//         auth: {
//             user: process.env.USER, // generated ethereal user
//             pass: process.env.PASS // generated ethereal password
//         }
//     })

//     await transporter.sendMail({ from, to, subject, html });

//     console.log("email sent sucessfully");

// };



// async function sendPasswordResetEmail(email, resetToken, origin) {
//     let message;

//     if (origin) {
//         const resetUrl = `${origin}/apiRouter/resetPassword?token=${resetToken} email=${email}`;
//         message = `<p>Please click the below link to reset your password, the link will be valid for 1 hour:</p>
//                       <p><a href="${resetUrl}">${resetUrl}</a></p>`;
//     } else {
//         message = `<p>Please use the below token to reset your password with the <code>/apiRouter/reset-password</code> api route:</p>
//                       <p><code>${resetToken}</code></p>`;
//     }

//     await sendEmail({
//         from: process.env.EMAIL_FROM,
//         to: email,
//         subject: ' Reset your Password',
//         html: `<h4>Reset Password </h4>
//                   ${message}`
//     });
// }



// //  Reset token validate
// async function validateResetToken(req, res, next) {

//     const email = req.body.email;
//     const resetToken = req.body.token;


//     if (!resetToken || !email) {
//         return res.sendStatus(400);
//     }

//     // then we need to verify if the token exist in the resetPasswordToken and not expired.
//     const currentTime = new Date(Date.now());

//     const token = await db.findValidToken(resetToken, email, currentTime);


//     if (!token) {
//         res.json('Invalid token, please try again.');
//     }

//     next();
// };



// exports.resetPassword = (validateResetToken, async (req, res, next) => {
//     try {

//         const newPassword = req.body.password;
//         const email = req.body.email;


//         if (!newPassword) {
//             return res.sendStatus(400);
//         }


//         const user = await db.getUserByEmail(email);


//         const salt = genSaltSync(10);
//         const password = hashSync(newPassword, salt);

//         await db.updateUserPassword(password, user.id);

//         res.json({ message: 'Password reset successful, you can now login with the new password' });

//     } catch (e) {
//         console.log(e);
//     }
// })