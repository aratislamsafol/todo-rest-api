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