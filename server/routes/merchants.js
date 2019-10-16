const aqp = require('api-query-params');
const express = require('express')
const { isLoggedIn } = require('../middlewares')
const Price = require('../models/Price')
const Merchant = require("../models/Merchant")
const router = express.Router()

const populatable_virtuals = 'prices'

/** 
 * Get all merchants with the given search parameters 
 * Only supports limit currently.
 * @example
 * GET /api/merchants/search?limit=50
 * */
router.get('/search', async(req, res, next) => {
    const { filter, skip, limit, sort, projection } = aqp(req.query);

    Merchant.find(filter)
        .skip(skip || 0)
        .limit(limit || 50)
        .sort(sort)
        .select(projection)
        .populate(populatable_virtuals)
        .then(merchants => res.json(merchants))
        .catch(err => next(err))
})

/** 
 * Get all merchants.  
 * @example
 * GET /api/merchants/
 * */
router.get('/', async(req, res, next) => {
    res.json(await Merchant.find().populate(populatable_virtuals))
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
            .populate(populatable_virtuals)
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

router.delete('/:id', isLoggedIn, async (req, res) => {
  try {
    const merchant = await Merchant.findById(req.params.id)
    if (!merchant) throw new Error()
    if (req.user.role !== "admin") res.status(403).send('You do not have permission to delete this resource.')
    await merchant.remove()
    res.status(202).send(merchant)
  } catch (e) {
    res.status(404).send(e)
  }
})

/**
 * Update a specific merchant
 * @example 
 * PATCH /api/merchants/:id
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