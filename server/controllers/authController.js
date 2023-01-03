const UserModel = require('../models/userModel')

const jwt = require('jsonwebtoken')

// Création de Token
// let token = jwt.sign({ foo: 'bar' }, process.env.PRIVATE_TOKEN, { algorithm: 'RS256' })

module.exports.signUp = async (req, res) => {
    const {username, email, password} = req.body

    try {
        const user = await UserModel.create({username, email, password})
        res.status(201).json({user: user._id})
    } catch (err) {
        res.status(200).send(err)
    }
}

module.exports.signIn = async (req, res) => {
    const {username, password} = req.body
    
    try {
        const user = await UserModel.login(username, password)
        const token = jwt.sign( user._id, process.env.PRIVATE_TOKEN, { algorithm: 'RS256' }, { expiresIn: '5h' })
        res.cookie('jwt', token, {httpOnly: true})
        res.status(200).json({user: user._id})
    } catch (err) {
        res.status(200).send(err)
    }
}

module.exports.logout = async (req, res) => {
    res.cookie('jwt', '')
    res.redirect('/')
}