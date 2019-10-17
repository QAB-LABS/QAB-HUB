const express = require('express')
const { isLoggedIn } = require('../middlewares')
const Rating = require('../models/Rating')
const router = express.Router()

const populatable_virtuals = 'author game';

const fields = [
  'value',
  'game',
  'author'
]

/** 
 * Get all ratings with the given search parameters 
 * Only supports limit currently.
 * @example
 * GET /api/ratings/search?limit=50
 * */
router.get('/search', async (req, res, next) => {
  const limit = +req.query.limit || 50

  Rating.find()
    .limit(limit)
    .populate(populatable_virtuals)
    .then(ratings => {
      res.json(ratings)
    })
    .catch(err => next(err))
})

/** 
 * Get all ratings.
 * @example
 * GET /api/ratings/
 * */
router.get('/', async (req, res, next) => {
  res.json(await Rating.find().populate(populatable_virtuals))
})

/**
 * Create a rating
 * @example 
 * POST /api/ratings
 */
router.post('/', (req, res, next) => {
  ratingData = {}
  fields.forEach(field => { if (req.body[field]) ratingData[field] = req.body[field] })
  rating.author = rating.author._id
  rating.game = rating.game._id

  Rating.create(ratingData)
    .then((rating) => res.json(rating))
    .catch(err => res.status(422).send(err))
})

/**
 * Get a specific rating 
 * @example 
 * GET /api/ratings/:id
 */
router.get('/:id', async (req, res, next) => {
  try {
    const rating = await Rating.findById(req.params.id)
      .populate(populatable_virtuals)
    if (!rating) throw new Error()
    res.send(rating)
  } catch (e) {
    res.status(404).send()
  }
})

/**
 * Delete a specific rating
 * @example 
 * DELETE /api/ratings/:id
 */
router.delete(`/:id`, isLoggedIn, async (req, res) => {
  try {
    const rating = await Rating.findById(req.params.id)
    if (!rating) throw new Error()
    if (!req.user._id.equals(rating.author) && req.user.role !== "admin") res.status(403).send('You do not have permission to delete this resource.')
    await rating.remove()
    res.status(202).send(rating)
  } catch (e) {
    res.status(404).send(e)
  }
})

module.exports = router