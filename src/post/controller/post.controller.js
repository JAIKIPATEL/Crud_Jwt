const postModel = require('../models/post.models');

const dotenv = require('dotenv');
dotenv.config();


// Create a new post:
exports.create = (req, res) => {

    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({ success: false, message: "Please provide all fields" });
    } else {
        postModel.create(req.body, (err, data) => {
            if (err)
                return res.json({ success: false, message: "Database connection error" });
            else
                return res.status(200).json({ status: "Post Created successfully", data });
        });
    }
}


// getAll Registered posts:
exports.getAll = (req, res) => {

    postModel.getAll((err, data) => {
        if (err) {
            return res.json({ success: false, message: "Record not found" });
        } else {
            return res.status(200).json({ success: "Users fetched successfully", data });
        }
    });
}


// get Registered post ById: 
exports.getById = (req, res) => {

    postModel.getById(req.params.id, (err, data) => {
        if (err) {
            return res.json({ success: false, message: error });
        } else {
            return res.status(200).json({ data })
        }
    });
}


// Update a Registered user:
exports.update = (req, res) => {

    if (Object.keys(req.body).length === 0) {
        res.status(400).send({ success: false, message: "Please provide all fields" });
    } else {
        postModel.update(req.params.id, req.body, (err, result) => {
            if (err)
                return res.status(500).json({ success: false, message: "Data not updated" });
            else
                return res.status(200).json({ success: "Data Updated successfully", data: result });
        });
    }
}


// Delete a Registered user:
exports.delete = (req, res) => {

    postModel.delete(req.params.id, (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, message: err });
        } else {
            return res.status(200).json({ data });
        }
    });
}