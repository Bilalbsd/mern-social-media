const UserModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { signUpErrors, signInErrors } = require('../utils/errors.utils');
require('dotenv').config({ path: '../config/.env' })

module.exports.signUp = async (req, res) => {
    const { email, password, username } = req.body

    try {
        const user = await UserModel.create({ email, password, username });
        res.status(201).json({ user: user._id });
    }
    catch (err) {
        const errors = signUpErrors(err);
        res.status(500).send({ errors })
    }
}

module.exports.signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ errors: { email: "Utilisateur non trouvé" } });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ errors: { password: "Mot de passe incorrect" } });
        }

        const payload = {
            id: user._id,
            username: user.username,
            email: user.email,
            followers: user.followers,
            following: user.following,
            likes: user.likes,
            bio: user.bio
        };

        const token = jwt.sign(payload, process.env.PRIVATE_TOKEN, { expiresIn: '72h' })
        res.status(200).json({ token });

    } catch (err) {
        // console.log(err, "err")
        const errors = signInErrors(err);
        res.status(500).json({ errors });
    }
};