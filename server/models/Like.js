const mongoose = require('mongoose')
const Schema = mongoose.Schema

const likeSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game"
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
})

const Like = mongoose.model('Like', likeSchema)

module.exports = Like