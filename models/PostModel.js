const mongoose = require('mongoose')
const { Schema } = mongoose

const PostSchema = new Schema({
    userPostId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        maxLength: 300
    },
    likers: {
        type: [String],
        required: true
    },
    comments: {
        type: [{ commenterId: String, commenterUsername: String, text: String, timestamp: Number }],
        required: true
    }
},
    {
        timestamps: true
    }
)

const PostModel = mongoose.model('Post', PostSchema)

module.exports = PostModel