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

async function updateTask(req, res) {

    const taskId = req.params.id;
    const userId = req.user.id;
    const task = await taskModel.findById(taskId);

    if(!task){
        return res.status(404).json({
            message:"Task not found"
        })
    }

    if(task.user.toString() !== userId){
        return res.status(403).json({
            message:"You are not authorized to update this task"
        })
    }

    const { title, description, status } = req.body;

    const updatedTask = await taskModel.findByIdAndUpdate(taskId, {
        title,
        description,
        status
    }, { new: true });
    
    res.status(200).json({
        message:"Task Updated",
        updatedTask
    })
}

async function deleteTask(req,res){
    const taskId = req.params.id;
    const userId = req.user.id;
    const task = await taskModel.findById(taskId);

    if(!task){
        return res.status(404).json({
            message:"Task not found"
        })
    }

    if(task.user.toString() !== userId){
        return res.status(403).json({
            message:"You are not authorized to delete this task"
        })
    }

    await taskModel.findByIdAndDelete(taskId);

    res.status(200).json({
        message:"Task Deleted"
    })
}

module.exports = {createTask, getTasks, updateTask, deleteTask}