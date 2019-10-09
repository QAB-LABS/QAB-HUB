const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    title: String,
    content: String,
    game: { type: Mongoose.Schema.types.ObjectID, ref: "BoardGame" },
    author: { type: Mongoose.Schema.types.ObjectID, ref: "User" },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
})

const Game = mongoose.model('Game', gameSchema)

module.exports = Game