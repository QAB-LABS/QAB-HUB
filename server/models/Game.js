const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Like = require('../models/Like');


const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: String,
    price: Number,
    image: String,
    year_published: Number,
    min_players: Number,
    max_players: Number,
    min_playtime: Number,
    max_playtime: Number,
    min_age: Number,
    mechanics: [String],
    designers: [String],
    artists: [String],
    publisher: String,
    categories: [{
        type: Schema.Types.ObjectId,
        ref: "Category"
    }]
})

gameSchema.virtual('likes', {
    ref: 'Like',
    localField: '_id',
    foreignField: 'game',
    justOne: false
})

gameSchema.set('toObject', { virtuals: true })
gameSchema.set('toJSON', { virtuals: true })


gameSchema.pre('remove', async function (next) {
    await Like.deleteMany({ game: this._id })
    next()
})


const Game = mongoose.model('Game', gameSchema)

module.exports = Game
