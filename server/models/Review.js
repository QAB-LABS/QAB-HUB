const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    title: String,
    content: String,
    game: { type: mongoose.Schema.Types.ObjectId, ref: "BoardGame" },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review