const mongoose = require('mongoose')
const Schema = mongoose.Schema

const merchantSchema = new Schema({
  url: String,
  name: String,
  country: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})

merchantSchema.virtual('prices', {
  ref: 'Price',
  localField: '_id',
  foreignField: 'merchant',
  justOne: false
})

merchantSchema.set('toObject', { virtuals: true })
merchantSchema.set('toJSON', { virtuals: true })

const Merchant = mongoose.model('Merchant', merchantSchema)
module.exports = Merchant