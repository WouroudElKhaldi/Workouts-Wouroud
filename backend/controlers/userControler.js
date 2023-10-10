const User = require('../modules/userModel')
const jwt = require('jsonwebtoken')

require('dotenv').config()
const secret = process.env.SECRET 

const createToken = (_id) => {
    return jwt.sign({_id} , secret , {expiresIn: '3d'})
}

//login user
const loginUser = async (req , res) => {
    const {email , password} = req.body

    try{
        const user = await User.login(email , password)
        const token = createToken(user._id)

        res.status(200).json({user, token})
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

//signup user 
const signupUser = async (req , res) => {
    const {name , email , password} = req.body 

    try {
        const user = await User.signup(name , email , password)
        const token = createToken(user._id)
        res.status(200).json({user, token})
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {loginUser , signupUser}