const taskModel = require('../models/task.model');


async function createTask(req, res) {

    const { title, description, status, } = req.body

    const task = await taskModel.create({
        title,
        description,
        status,
        user:req.user.id

    });

    res.status(201).json({
        message:"Task Created",
        task
    })

}

async function getTasks(req, res) {
    const id = req.user.id;

    const allTask = await taskModel.find({
        user:id
    })

    res.status(200).json({
        message:"All tasks fetched",
        allTask

    })

}

module.exports = {createTask, getTasks}