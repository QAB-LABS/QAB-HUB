const express = require('express')
const { isLoggedIn } = require('../middlewares')
const Price = require('../models/Price')
const Merchant = require("../models/Merchant")
const router = express.Router()

/** 
 * Get all price with the given search parameters 
 * Only supports limit currently.
 * @example
 * GET /api/prices/search?limit=50
 * */
router.get('/search', async (req, res, next) => {
  const limit = req.query.limit || 50
  Price.find()
    .limit(Number(limit))
    .populate('game merchant')
    .then(prices => {
      res.json(prices)
    })
    .catch(err => next(err))
})

/** 
 * Get all prices.  
 * @example
 * GET /api/prices/
 * */
router.get('/', async (req, res, next) => {
  res.json(await Price.find().populate('game merchant'))
})

/**
 * Create a price
 * @example 
 * POST /api/prices
 */
router.post('/', isLoggedIn, (req, res, next) => {
  postData = {
    game: req.body.game,
    merchant: req.body.merchant,
    price_text: req.body.price_text,
    url: req.body.url,
  }

  if (req.user.role !== "admin") res.status(403).send('You do not have permission to add a new price.')

  Price.create(postData)
    .then((price) => {
      res.json(price)
    })
})

/**
 * Get a specific price 
 * @example 
 * GET /api/prices/:id
 */
router.get('/:id', async (req, res, next) => {
  try {
    const price = await Price.findById(req.params.id)
      .populate('game')
      .populate('merchant')
    if (!price) throw new Error()
    res.send(price)
  } catch (e) {
    res.status(404).send()
  }
})

/**
 * Delete a specific price
 * @example 
 * DELETE /api/prices/:id
 */
router.delete('/:id', async (req, res) => {
  try {
    const price = await price.findById(req.params.id)
    if (!price) throw new Error()
    if (req.user.role !== "admin") res.status(403).send('You do not have permission to delete this resource.')
    await price.remove()
    res.status(202).send(price)
  } catch (e) {
    res.status(404).send(e)
  }
})

/**
 * Update a specific price
 * @example 
 * POST /api/prices/:id
 */
router.patch(`/:id`, isLoggedIn, async (req, res) => {
  if (req.user.role !== "admin") res.status(403).send('You do not have permission to update this resource.')

  const updates = Object.keys(req.body)
  const allowedUpdates = ['price_text', 'url']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' })

  try {
    const price = await Price.findById(req.params.id)
    if (!price) throw new Error()
    updates.forEach((update) => price[update] = req.body[update])
    await price.save()
    res.json(price)
  } catch (e) {
    res.status(400).send(e)
  }
})

module.exports = router