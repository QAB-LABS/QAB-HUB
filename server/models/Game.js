const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
    designer: [String],
    artist: [String],
    publisher: String,
    family: String,
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

const Game = mongoose.model('Game', gameSchema)

module.exports = Game