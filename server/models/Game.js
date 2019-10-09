const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    name: String,
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
    categories: [String],
    designer: [String],
    artist: [String],
    publisher: String,
    family: String,
})

const Game = mongoose.model('Game', gameSchema)

module.exports = Game