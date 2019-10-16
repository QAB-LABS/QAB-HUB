const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({
  value: Number,
  game: { type: mongoose.Schema.Types.ObjectId, ref: "Game" },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
})

const Rating = mongoose.model('Rating', ratingSchema)

module.exports = Rating