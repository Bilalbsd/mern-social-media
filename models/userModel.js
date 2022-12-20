const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const { Schema } = mongoose
const SALT_WORK_FACTOR = 10

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        validate: [isEmail],
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    // date: {
    //     type: Date,
    //     default: Date.now
    // },
    bio: {
        type: String,
        maxLength: 800
    },
    followers: {
        type: [String]
    },
    following: {
        type: [String]
    },
    likes: {
        type: [String]
    }
},
    {
        timestamps: true
    })

/*
    Explication fonctionnement Bcrypt :
        -> On salt le mot de passe en indiquant un work factor
        -> On hash le mot de passe en passant en paramètre le mdp et le salt
        Ceci est exécuté avant de sauvegarder dans la BDD (UserSchema.pre('save', ...))
*/
UserSchema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

UserSchema.methods.validatePassword = async function validatePassword(data) {
    return bcrypt.compare(data, this.password);
};

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;