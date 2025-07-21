const ToDoListModel = require("../models/ToDoListModel");
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path: '../../config.js'});

exports.CreateToDo = async( req, res ) => {
    try {
        const reqBody = req.body;
        let UserName = req.user.UserName;
        let TodoSubject = reqBody['TodoSubject'];
        let TodoDescription = reqBody['TodoDescription'];
        let TodoStatus = reqBody['TodoStatus'];
        let TodoCreateDate = Date.now();

        const PostBody = {
            UserName: UserName,
            TodoSubject: TodoSubject,
            TodoDescription: TodoDescription,
            TodoStatus: TodoStatus,
            TodoCreateDate: TodoCreateDate
        }
        
        const data = await ToDoListModel.create(PostBody);
        res.status(201).json({ status: "Success", data: data });
    }
    catch(err) {
        res.status(500).json({ status: "Failed", message: err.message});
    }
}
exports.SelectToDo = async(req, res) => {
    try {
        let UserName = req.user.UserName;
        const data = await ToDoListModel.find({UserName: UserName});
        res.status(200).json({status: "Success", data: data})
    }
    catch(err) {
        res.status(500).json({ status: "Failed to Select Data", message: err.message});
    }
}
// Update Todo List
exports.UpdateToDo = async(req, res) => {
    try{
        const reqBody = req.body;
        console.log(reqBody)
        let _id = reqBody['_id'];
        let TodoSubject = reqBody['TodoSubject'];
        let TodoDescription = reqBody['TodoDescription'];
        let TodoUpdateDate = Date.now();

        const PostBody = {
            TodoSubject: TodoSubject,
            TodoDescription: TodoDescription,
            TodoUpdateDate: TodoUpdateDate
        }

        const data = await ToDoListModel.updateOne({_id:_id}, {$set: PostBody}, {upsert: true});
        res.status(200).json({status: "Successfully Update ToDo", data: data})
    }
    catch(err) {
        res.status(500).json({ status: "Failed to Update Data", message: err.message});
    }
}
// UpdateStatus ToDo
exports.UpdateStatusToDo = async(req, res) => {
    try{
        const reqBody = req.body;
        let _id = reqBody['_id']; 
        let TodoStatus = reqBody['TodoStatus'];
        let TodoUpdateDate = Date.now();
        const PostBody = {
            TodoStatus: TodoStatus,
            TodoUpdateDate: TodoUpdateDate
        }

        const data = await ToDoListModel.updateOne({_id:_id}, {$set: PostBody}, {upsert: true});
        res.status(200).json({status: "Successfully Update ToDo", data: data})
    }
    catch(err) {
        res.status(500).json({ status: "Failed to Update Data", message: err.message});
    }
}