const express = require('express')
const { isLoggedIn } = require('../middlewares')
const Price = require('../models/Price')
const Merchant = require("../models/Merchant")
const router = express.Router()

/** 
 * Get all merchants with the given search parameters 
 * Only supports limit currently.
 * @example
 * GET /api/merchants/search?limit=50
 * */
router.get('/search', async(req, res, next) => {
    const limit = Number(req.query.limit) || 50
    Merchant.find()
        .limit(limit)
        .populate('prices')
        .then(merchants => {
            res.json(merchants)
        })
        .catch(err => next(err))
})

/** 
 * Get all merchants.  
 * @example
 * GET /api/merchants/
 * */
router.get('/', async(req, res, next) => {
    res.json(await Merchant.find().populate('prices'))
})

/**
 * Create a merchant
 * @example 
 * POST /api/merchants
 */
router.post('/', isLoggedIn, (req, res, next) => {
    postData = {
        url: req.body.url,
        name: req.body.name,
        country: req.body.country,
    }

    if (req.user.role !== "admin") res.status(403).send('You do not have permission to add a new merchant.')

    Merchant.create(postData)
        .then((merchant) => {
            res.json(merchant)
        }).catch(err => {
            res.status(404).send(err)
        })
})

/**
 * Get a specific merchant 
 * @example 
 * GET /api/merchants/:id
 */
router.get('/:id', async(req, res, next) => {
    try {
        const merchant = await Merchant.findById(req.params.id)
            .populate('prices')
        if (!merchant) throw new Error()
        res.send(merchant)
    } catch (e) {
        res.status(404).send()
    }
})

/**
 * Delete a specific merchant
 * @example 
 * DELETE /api/merchants/:id
 */
router.delete('/:id', isLoggedIn, async(req, res) => {
    try {
        const merchant = await Merchant.findById(req.params.id)
        if (!merchant) throw new Error()
        if (req.user.role !== "admin") res.status(403).send('You do not have permission to delete this resource.')
        Price.deleteMany({ merchant: merchant._id })
            .then(
                await merchant.remove()
            )
            .catch(err => {
                res.status(404).send(e)
            })
        res.status(202).send(merchant)
    } catch (e) {
        res.status(404).send(e)
    }
})

/**
 * Update a specific merchant
 * @example 
 * POST /api/merchants/:id
 */
router.patch(`/:id`, isLoggedIn, async(req, res) => {
    if (req.user.role !== "admin") res.status(403).send('You do not have permission to update this resource.')

    const updates = Object.keys(req.body)
    const allowedUpdates = ['url', 'name', 'country']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' })

    try {
        const merchant = await Merchant.findById(req.params.id)
        if (!merchant) throw new Error()
        updates.forEach((update) => merchant[update] = req.body[update])
        await merchant.save()
        res.json(merchant)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router