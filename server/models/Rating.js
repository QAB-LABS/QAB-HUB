const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({
  value: {type: Number, min: 0, max: 100},
  game: { type: mongoose.Schema.Types.ObjectId, ref: "Game" },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
})

ratingSchema.index({ game: 1, author: 1 }, { unique: true })
const Rating = mongoose.model('Rating', ratingSchema)

module.exports = Rating