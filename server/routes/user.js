const express = require('express')
const { isLoggedIn } = require('../middlewares')
const User = require('../models/User')
const router = express.Router()

const fields = [
    'username',
    'password',
    'email',
    'role',
    'wishlist',
    'location'
]

/** 
 * Get all users with the given search parameters 
 * Only supports limit currently.
 * @example
 * GET /api/users/search?limit=50
 * */
router.get('/search', async(req, res, next) => {
    const limit = req.query.limit || 50
    const terms = req.query.terms || ''

    User.find({ $text: { $search: terms } })
        .limit(limit)
        .populate('reviews chats likes messages posts')
        .then(users => res.json(users))
        .catch(err => next(err))
})

/** 
 * Get all users.
 * @example
 * GET /api/users/
 * */
router.get('/', async(req, res, next) => {
    res.json(await User.find().populate('reviews chats likes messages posts'))
})

/**
 * Create a user
 * @example POST /api/users
 */
router.post('/', (req, res, next) => {
    let userData = {
        content: req.body.content,
        author: req.user._id,
        post: req.post._id
    }

    User.create(userData)
        .then((user) => {
            res.json(user)
        })
})

/**
 * Get a specific user 
 * @example GET /api/users/:id
 */
router.get('/:id', async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
            .populate('reviews chats likes messages posts')
        if (!user) throw new Error()
        res.send(user)
    } catch (e) {
        res.status(404).send()
    }
})

/**
 * Delete a specific user
 * @example DELETE /api/users/:id
 */
router.delete(`/:id`, isLoggedIn, async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) throw new Error()
        if (!req.user._id.equals(user.author)) res.status(403).send('You do not have permission to delete this resource.')
        await user.remove()
        res.status(202).send(user)
    } catch (e) {
        res.status(404).send(e)
    }
})

/**
 * Update a specific user
 * @example POST /api/users/:id
 */
router.patch(`/:id`, async(req, res) => {
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) => fields.includes(update))

    if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' })

    try {
        const user = await User.findById(req.params.id)
        if (!user) throw new Error()
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        res.json(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router