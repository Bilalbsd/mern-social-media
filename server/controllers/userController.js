const UserModel = require('../models/userModel')

const ObjectID = require('mongoose').Types.ObjectId

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select("-password")
    res.status(200).json(users)
}

module.exports.getUser = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("Unknown Id : " + req.params.id)

    UserModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs)
        else console.log("Unknown Id : " + err)
    }).select("-password")
}

module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("Unknown Id : " + req.params.id)

    try {
        // Récupération des données du formulaire
        const { username, email, password, bio } = req.body

        // Récupération de l'utilisateur à mettre à jour à partir de l'ID de l'utilisateur envoyé dans la requête
        const user = await UserModel.findById(req.params.id)

        // Mise à jour des champs de l'utilisateur avec les données du formulaire
        user.username = username
        user.email = email
        if (password) {
            user.password = password
        }
        user.bio = bio

        // Sauvegarde de l'utilisateur mis à jour en base de données
        const updatedUser = await user.save()

        // Renvoi de l'utilisateur mis à jour en réponse
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("Unknown ID : " + req.params.id)

    try {
        await UserModel.deleteOne({ _id: req.params.id }).exec()
        res.status(200).json({ message: "Successfully deleted. " })
    } catch (err) {
        return res.status(500).json({ message: err })
    }
}

module.exports.follow = async (req, res) => {

    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow))
        return res.status(400).send("Unknown ID : " + req.params.id)

    try {
        // Récupération de l'utilisateur qui veut suivre à partir de l'ID de l'utilisateur envoyé dans la requête
        const follower = await UserModel.findByIdAndUpdate(req.body.idToFollow)

        // Récupération de l'utilisateur à suivre à partir de l'ID de l'utilisateur envoyé dans la requête
        const followee = await UserModel.findByIdAndUpdate(req.params.id)

        // Ajout de l'utilisateur à suivre à la liste des abonnements de l'utilisateur qui veut suivre
        follower.following.push(followee._id)

        // Ajout de l'utilisateur suivi à la liste des follower de l'utilisateur
        followee.followers.push(follower._id)

        // Sauvegarde de l'utilisateur qui veut suivre en base de données
        await follower.save()
        await followee.save()

        // Renvoi de l'utilisateur qui veut suivre en réponse
        res.json(follower)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

module.exports.unfollow = async (req, res) => {

    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToUnFollow))
        return res.status(400).send("Unknown ID : " + req.params.id)

    try {
        // Récupération de l'utilisateur qui veut ne plus suivre à partir de l'ID de l'utilisateur envoyé dans la requête
        const unfollower = await UserModel.findById(req.body.idToUnFollow)

        // Récupération de l'utilisateur que l'on veut ne plus suivre à partir de l'ID de l'utilisateur envoyé dans la requête
        const unfollowee = await UserModel.findById(req.params.id)

        // Suppression de l'utilisateur à ne plus suivre de la liste des abonnements de l'utilisateur qui veut ne plus suivre
        unfollower.following.remove(unfollowee._id)

        // Suppression de l'utilisateur qui n'est plus suivi de la liste des abonnements de l'utilisateur
        unfollowee.followers.remove(unfollower._id)

        // Sauvegarde de l'utilisateur qui veut ne plus suivre en base de données
        await unfollower.save()
        await unfollowee.save()

        // Renvoi de l'utilisateur qui veut ne plus suivre en réponse
        res.json(unfollower)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


