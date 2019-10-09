const mongoose = require('mongoose')
const Schema = mongoose.Schema
const pointSchema = require('./Point')

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
    likes: [{
        type: Schema.types.ObjectID,
        ref: "BoardGame"
    }],
    reviews: [{
        type: Schema.types.ObjectID,
        ref: "Review"
    }],
    wishlist: [{
        type: Schema.types.ObjectID,
        ref: "BoardGame"
    }],
    location: {
        type: pointSchema,
    },
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

userSchema.set('toObject', { virtuals: true })
userSchema.set('toJSON', { virtuals: true })

userSchema.index({ location: "2dsphere" });

const User = mongoose.model('User', userSchema)
module.exports = User