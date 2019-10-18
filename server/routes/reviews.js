const aqp = require('api-query-params');
const express = require('express')
const { isLoggedIn } = require('../middlewares')
const Review = require('../models/Review')
const router = express.Router()

const populatable_virtuals = 'author game'

const fields = [
    'title',
    'content',
    'game',
    'author'
]

/** 
 * Get all reviews with the given search parameters 
 * Only supports limit currently.
 * @example
 * GET /api/reviews/search?limit=50
 * */
router.get('/search', async(req, res, next) => {
    const { filter, skip, limit, sort, projection } = aqp(req.query);

    Review.find(filter)
        .skip(skip || 0)
        .limit(limit || 50)
        .sort(sort)
        .select(projection)
        .populate(populatable_virtuals)
        .then(reviews => res.json(reviews))
        .catch(err => next(err))
})

/** 
 * Get all reviews.
 * @example
 * GET /api/reviews/
 * */
router.get('/', async(req, res, next) => {
    const { skip, limit, population } = aqp(req.query);

    res.json(await Review
        .find()
        .skip(skip || 0)
        .limit(limit || 50)
        .lean()
        .populate(population))
})

/**
 * Create a review
 * @example POST /api/reviews
 */
router.post('/', (req, res, next) => {
    reviewData = {}
    fields.forEach(field => { if (req.body[field]) reviewData[field] = req.body[field] })
    reviewData.author = reviewData.author._id
    reviewData.game = reviewData.game._id

    Review.create(reviewData)
        .then((review) => res.json(review))
        .catch(err => res.status(422).send(err))
})

/**
 * Get a specific review 
 * @example GET /api/reviews/:id
 */
router.get('/:id', async(req, res, next) => {
    try {
        const review = await Review.findById(req.params.id)
            .populate('author')
            .populate({
                path: 'game',
                populate: { path: 'ratings categories likes' }
            })
        if (!review) throw new Error()
        res.send(review)
    } catch (e) {
        res.status(404).send()
    }
})

/**
 * Delete a specific review
 * @example DELETE /api/reviews/:id
 */
router.delete(`/:id`, isLoggedIn, async(req, res) => {
    try {
        const review = await Review.findById(req.params.id)
        if (!review) throw new Error()
        if (!req.user._id.equals(review.author)) res.status(403).send('You do not have permission to delete this resource.')
        await review.remove()
        res.status(202).send(review)
    } catch (e) {
        res.status(404).send(e)
    }
})

/**
 * Update a specific review
 * @example 
 * PATCH /api/reviews/:id
 */
router.patch(`/:id`, async(req, res) => {
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) => fields.includes(update))

    if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' })

    try {
        const review = await Review.findById(req.params.id)
        if (!review) throw new Error()
        updates.forEach((update) => review[update] = req.body[update])
        await review.save()
        res.json(review)
    } catch (e) {
        res.status(422).send(e)
    }
})

module.exports = router