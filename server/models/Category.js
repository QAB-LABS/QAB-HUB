const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    bga_id: String,
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
})

categorySchema.index({name: 1, bga_id: 1}, {unique: true})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category