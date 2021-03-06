const aqp = require('api-query-params');
const express = require('express')
const { isLoggedIn } = require('../middlewares')
const Price = require('../models/Price')
const router = express.Router()

const populatable_virtuals = 'game merchant'

/** 
 * Get all price with the given search parameters 
 * Only supports limit currently.
 * @example
 * GET /api/prices/search?limit=50
 * */
router.get('/search', async(req, res, next) => {
    const { filter, skip, limit, sort, projection } = aqp(req.query);

    Price.find(filter)
        .skip(skip || 0)
        .limit(limit || 50)
        .sort(sort)
        .select(projection)
        .populate(populatable_virtuals)
        .then(prices => res.json(prices))
        .catch(err => next(err))
})

/** 
 * Get all prices.  
 * @example
 * GET /api/prices/
 * */
router.get('/', async(req, res, next) => {
    res.json(await Price.find().populate(populatable_virtuals))
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
        price: req.body.price,
        url: req.body.url,
    }

    if (req.user.role !== "admin") res.status(403).send('You do not have permission to add a new price.')

    Price.create(postData)
        .then((price) => {
            res.json(price)
        })
        .catch(err => {
            res.status(404).send(err)
        })
})

/**
 * Get a specific price 
 * @example 
 * GET /api/prices/:id
 */
router.get('/:id', async(req, res, next) => {
    try {
        const price = await Price.findById(req.params.id)
            .populate(populatable_virtuals)
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
router.delete('/:id', isLoggedIn, async(req, res) => {
    try {
        const price = await Price.findById(req.params.id)
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
 * PATCH /api/prices/:id
 */
router.patch(`/:id`, isLoggedIn, async(req, res) => {
    if (req.user.role !== "admin") res.status(403).send('You do not have permission to update this resource.')

    const updates = Object.keys(req.body)
    const allowedUpdates = ['price', 'url']
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