const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema
const Post = require('../models/Post')
const ChatMessage = require('../models/ChatMessage')
const Like = require('../models/Like')
const Review = require('../models/Review')

const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        index: '2dsphere',
        default: [25.766111, -80.196183]
    }
})

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) throw new Error('Password cannot contain "password"')
        }
    },
    email: {
        type: String,
        unique: true,
        required: false,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error('Email is invalid')
        }
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'moderator', 'guest']
    },
    wishlist: [{
        type: Schema.Types.ObjectId,
        ref: "Game"
    }],
    location: pointSchema,
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
})

userSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'author',
    justOne: false
})

userSchema.virtual('chats', {
    ref: 'Chat',
    localField: '_id',
    foreignField: 'users',
    justOne: false
})

userSchema.virtual('likes', {
    ref: 'Like',
    localField: '_id',
    foreignField: 'user',
    justOne: false
})

userSchema.virtual('messages', {
    ref: 'ChatMessage',
    localField: '_id',
    foreignField: 'author',
    justOne: false
})

userSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'author',
    justOne: false
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

userSchema.pre('remove', async function (next) {
    await Post.deleteMany({ author: this._id })
    await ChatMessage.deleteMany({ author: this._id })
    await Like.deleteMany({ user: this._id })
    await Review.deleteMany({ author: this._id })
    next()
})

userSchema.set('toObject', { virtuals: true })
userSchema.set('toJSON', { virtuals: true })

userSchema.pre('remove', async function (next) {
    await Like.deleteMany({ user: this._id })
    next()
})

userSchema.index({ location: "2dsphere" });
userSchema.index({ name: "text", description: "text" })

const User = mongoose.model('User', userSchema)
module.exports = User