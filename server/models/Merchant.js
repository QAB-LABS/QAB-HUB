const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require("validator");

const merchantSchema = new Schema({
  url: {
    type: String,
    validate(value) {
      if (!validator.isURL(value)) throw new Error("url is invalid")
    },
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  country: {
    type: String,
    required: true
  },
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