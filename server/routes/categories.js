const aqp = require('api-query-params');
const express = require('express')
const { isLoggedIn } = require('../middlewares')
const Category = require("../models/Category")
const router = express.Router()

/** 
 * Get all category with the given search parameters 
 * Only supports limit currently.
 * @example
 * GET /api/categories/search?limit=50
 * */
router.get('/search', async(req, res, next) => {
    const name = (req.query.name || "").toLowerCase();
    const { filter, skip, limit, sort, projection } = aqp(req.query);

    Category.find(filter)
        .skip(skip || 0)
        .limit(limit || 50)
        .sort(sort)
        .select(projection)
        .then(categories => res.json(categories.filter((category) => category.name.toLowerCase().includes(name))))
        .catch(err => next(err))
})

/** 
 * Get all categories.  
 * @example
 * GET /api/categories/
 * */
router.get('/', async(req, res, next) => {
    res.json(await Category.find())
})

/**
 * Create a category
 * @example 
 * POST /api/categories
 */
router.post('/', isLoggedIn, (req, res, next) => {
    postData = {
        name: req.body.name,
    }

    if (req.user.role !== "admin") res.status(403).send('You do not have permission to add a new category.')

    Category.create(postData)
        .then((category) => {
            res.json(category)
        })
        .catch(err => {
            res.status(404).send(err)
        })
})

/**
 * Get a specific category 
 * @example 
 * GET /api/categories/:id
 */
router.get('/:id', async(req, res, next) => {
    try {
        const category = await Category.findById(req.params.id)
        if (!category) throw new Error()
        res.send(category)
    } catch (e) {
        res.status(404).send()
    }
})

/**
 * Delete a specific category
 * @example 
 * DELETE /api/categories/:id
 */
router.delete('/:id', isLoggedIn, async(req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        if (!category) throw new Error()
        if (req.user.role !== "admin") res.status(403).send('You do not have permission to delete this resource.')
        await category.remove()
        res.status(202).send(category)
    } catch (e) {
        res.status(404).send(e)
    }
})

/**
 * Update a specific category
 * @example 
 * PATCH /api/categories/:id
 */
router.patch(`/:id`, isLoggedIn, async(req, res) => {
    if (req.user.role !== "admin") res.status(403).send('You do not have permission to update this resource.')

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' })

    try {
        const category = await Category.findById(req.params.id)
        if (!category) throw new Error()
        updates.forEach((update) => category[update] = req.body[update])
        await category.save()
        res.json(category)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router