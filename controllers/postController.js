const PostModel = require('../models/postModel')
const UserModel = require('../models/userModel')

const ObjectID = require('mongoose').Types.ObjectId


module.exports.createPost = async (req, res) => {

  const newPost = new PostModel({
    userPostId: req.body.userPostId,
    message: req.body.message,
    likers: [],
    comments: []
  })

  try {
    const post = await newPost.save()
    return res.status(201).json(post)
  } catch (err) {
    return res.status(400).send(err)
  }
}

module.exports.getPost = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs)
    else console.log('Error : ' + err)
  }).sort({ createdAt: -1 })
}

module.exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Unknown ID : " + req.params.id)

  const updatedRecord = {
    message: req.body.message,
  }

  PostModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs)
      else console.log("Update error : " + err)
    }
  )
}

module.exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Unknown ID : " + req.params.id)

  PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs)
    else console.log("Delete error : " + err)
  })
}

// module.exports.likePost = async (req, res) => {
//   if (!ObjectID.isValid(req.params.id))
//     return res.status(400).send("Unknown ID : " + req.params.id)

//   try {
//     await PostModel.findByIdAndUpdate(
//       req.params.id,
//       {
//         $addToSet: { likers: req.body.id },
//       },
//       { new: true })
//       .then((data) => res.send(data))
//       .catch((err) => res.status(500).send({ message: err }))

//     await UserModel.findByIdAndUpdate(
//       req.body.id,
//       {
//         $addToSet: { likes: req.params.id },
//       },
//       { new: true })
//       .then((data) => res.send(data))
//       .catch((err) => res.status(500).send({ message: err }))
//   } catch (err) {
//     return res.status(400).send(err)
//   }
// }

module.exports.likePost = async (req, res) => {

  if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.id))
    return res.status(400).send("Unknown ID : " + req.params.id)

  try {
    const liker = await UserModel.findByIdAndUpdate(req.body.id)
    const likedPost = await PostModel.findByIdAndUpdate(req.params.id)

    liker.likes.push(likedPost._id)
    likedPost.likers.push(liker._id)

    // Sauvegarde des likes en base de données
    await liker.save()
    await likedPost.save()

    // Renvoi de l'utilisateur qui like en réponse
    res.json(liker)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

module.exports.unLikePost = async (req, res) => {

  if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.id))
    return res.status(400).send("Unknown ID : " + req.params.id)

  try {
    const disLiker = await UserModel.findByIdAndUpdate(req.body.id)
    const likedPost = await PostModel.findByIdAndUpdate(req.params.id)

    disLiker.likes.remove(likedPost._id)
    likedPost.likers.remove(disLiker._id)

    await disLiker.save()
    await likedPost.save()

    res.json(disLiker)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}


module.exports.commentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Unknown ID : " + req.params.id)

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterUsername: req.body.commenterUsername,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true })
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }))
  } catch (err) {


    return res.status(400).send(err)
  }
}

module.exports.modifyCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Unknown ID : " + req.params.id)

  try {
    return PostModel.findById(req.params.id, (err, docs) => {
      const comment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      )

      if (!comment) return res.status(404).send("Comment not found")
      comment.text = req.body.text

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs)
        return res.status(500).send(err)
      })
    })
  } catch (err) {
    return res.status(400).send(err)
  }
}

module.exports.deleteCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Unknown ID : " + req.params.id)

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true })
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }))
  } catch (err) {
    return res.status(400).send(err)
  }
}