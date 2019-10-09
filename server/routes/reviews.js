const express = require('express')
const { isLoggedIn } = require('../middlewares')
const Review = require('../models/Review')
const router = express.Router()

/** 
 * Get all reviews with the given search parameters 
 * Only supports limit currently.
 * @example
 * GET /api/reviews/search?limit=50
 * */
router.get('/search', async(req, res, next) => {
    const limit = req.query.limit || 50
    Review.find()
        .limit(limit)
        .populate('author')
        .populate('game')
        .then(reviews => {
            res.json(reviews)
        })
        .catch(err => next(err))
})

/** 
 * Get all reviews.
 * @example
 * GET /api/reviews/
 * */
router.get('/', async(req, res, next) => {
    res.json(await Review.find()
        .populate('author')
        .populate('game'))
})

/**
 * Create a review
 * @example POST /api/reviews
 */
router.post('/', (req, res, next) => {
    reviewData = {
        title: req.body.title,
        content: req.body.content,
        author: req.user._id,
        game: req.body.game._id
    }

    Review.create(reviewData)
        .then((review) => {
            res.json(review)
        })
})

/**
 * Get a specific review 
 * @example GET /api/reviews/:id
 */
router.get('/:id', async(req, res, next) => {
    try {
        const review = await Review.findById(req.params.id)
            .populate('author')
            .populate('game')
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
 * @example POST /api/reviews/:id
 */
router.patch(`/:id`, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'content', 'image']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' })

    try {
        const review = await Review.findById(req.params.id)
        if (!review) throw new Error()
        updates.forEach((update) => review[update] = req.body[update])
        await review.save()
        res.json(review)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router