const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mechanicSchema = new Schema({
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

mechanicSchema.index({ name: 1, bga_id: 1 }, { unique: true })

const Mechanic = mongoose.model('Mechanic', mechanicSchema)

module.exports = Mechanic