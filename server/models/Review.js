const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    title: String,
    content: String,
    game: { type: mongoose.Schema.Types.ObjectId, ref: "Game" },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
})

reviewSchema.index({ name: "text", description: "text" })
reviewSchema.index({ game: 1, author: 1 }, { unique: true })

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review