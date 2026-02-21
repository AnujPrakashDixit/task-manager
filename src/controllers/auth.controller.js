    const userModel = require('../models/user.model');
    const bcrypt = require('bcryptjs');
    const jwt = require('jsonwebtoken');

    async function registerUser(req, res) {

        const { username, email, password } = req.body;

        const userAlreadyExists = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        })

        if (userAlreadyExists) {
            return res.status(409).json({
                message: "User Already Exists"
            })
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            email,
            username,
            password: hashed,
        })

        const token = jwt.sign({
            id: user._id,

        }, process.env.JWT_SECRET);

        res.cookie("token", token);

        res.status(201).json({
            message: "Registered",
            user:{
                id: user._id,
                email: user.email,
                username: user.username,
            }
        })

    }


    async function loginUser(req,res){
         const {email, username, password} = req.body;

         const user = await userModel.findOne({
            $or:[
                {username},
                {email}
            ]
         })

         if(!user){
            return res.status(401).json({
                message:"Invalid Credentials"
            })
         }

         const validPass = await bcrypt.compare(password, user.password);

         if(!validPass){
            return res.status(401).json({
                message:"Invalid Credentials"
            })
         }

         const token = jwt.sign({
            id:user._id,
         },process.env.JWT_SECRET);

         res.cookie("token", token);

         res.status(200).json({
            message:"Logged In",
            user:{
                id: user._id,
                email: user.email,
                username: user.username,
            }
         })

    }

    module.exports = { registerUser, loginUser }