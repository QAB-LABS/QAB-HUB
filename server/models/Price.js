const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require("validator")

const priceSchema = new Schema({
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
    required: true,
  },
  merchant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Merchant",
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    unique: true,
    required: true,
    validate(value) {
      if (!validator.isURL(value)) throw new Error("url is invalid")
    }
  },
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})

const Price = mongoose.model('Price', priceSchema)
module.exports = Price