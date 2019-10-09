const mongoose = require('mongoose')
const Schema = mongoose.Schema

const likeSchema = new Schema({
    user: {
        type: mongoose.Schema.types.ObjectID,
        ref: "User"
    },
    game: {
        type: mongoose.Schema.types.ObjectID,
        ref: "BoardGame"
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
})

const Like = mongoose.model('Like', likeSchema)

module.exports = Like