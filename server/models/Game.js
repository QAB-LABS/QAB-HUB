const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Like = require('../models/Like');
const Review = require('../models/Review');
const Rating = require('../models/Rating');


const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    bga_id: {
        type: String,
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
    publishers: [String],
    categories: [{
        type: String,
        ref: "Category"
    }]
})


gameSchema.index({ name: 1, bga_id: 1 }, { unique: true })

gameSchema.virtual('likes', {
    ref: 'Like',
    localField: '_id',
    foreignField: 'game',
    justOne: false
})

gameSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'game',
    justOne: false
})

gameSchema.virtual('ratings', {
    ref: 'Rating',
    localField: '_id',
    foreignField: 'game'
})

gameSchema.virtual('category_names', {
    ref: 'Category',
    localField: 'categories',
    foreignField: 'bga_id',
    justOne: false
})

gameSchema.virtual('mechanic_names', {
    ref: 'Mechanic',
    localField: 'mechanics',
    foreignField: 'bga_id',
    justOne: false
})

gameSchema.set('toObject', { virtuals: true })
gameSchema.set('toJSON', { virtuals: true })

gameSchema.pre('remove', async function(next) {
    await Like.deleteMany({ game: this._id })
    await Review.deleteMany({ game: this._id })
    await Rating.deleteMany({ game: this._id })
    next()
})

const Game = mongoose.model('Game', gameSchema)

module.exports = Game