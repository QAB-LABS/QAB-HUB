const express = require('express')
const { isLoggedIn } = require('../middlewares')
const Comment = require('../models/Comment')
const router = express.Router()

const populatable_virtuals = 'author post'

/** 
 * Get all comments with the given search parameters 
 * Only supports limit currently.
 * @example
 * GET /api/comments/search?limit=50
 * */
router.get('/search', async(req, res, next) => {
    const limit = req.query.limit || 50
    Comment.find()
        .limit(limit)
        .populate('author')
        .populate('post')
        .then(comments => {
            res.json(comments)
        })
        .catch(err => next(err))
})

/** 
 * Get all comments.
 * @example
 * GET /api/comments/
 * */
router.get('/', async(req, res, next) => {
    res.json(await Comment.find()
        .populate(populatable_virtuals))
})

/**
 * Create a comment
 * @example POST /api/comments
 */
router.post('/', (req, res, next) => {
    let commentData = {
        content: req.body.content,
        author: req.user._id,
        post: req.post._id
    }

    Comment.create(commentData)
        .then((comment) => {
            res.json(comment)
        })
})

/**
 * Get a specific comment 
 * @example GET /api/comments/:id
 */
router.get('/:id', async(req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id)
            .populate(populatable_virtuals)
        if (!comment) throw new Error()
        res.send(comment)
    } catch (e) {
        res.status(404).send()
    }
})

/**
 * Delete a specific comment
 * @example DELETE /api/comments/:id
 */
router.delete(`/:id`, isLoggedIn, async(req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
        if (!comment) throw new Error()
        if (!req.user._id.equals(comment.author)) res.status(403).send('You do not have permission to delete this resource.')
        await comment.remove()
        res.status(202).send(comment)
    } catch (e) {
        res.status(404).send(e)
    }
})

/**
 * Update a specific comment
 * @example POST /api/comments/:id
 */
router.patch(`/:id`, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['content']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' })

    try {
        const comment = await Comment.findById(req.params.id)
        if (!comment) throw new Error()
        updates.forEach((update) => comment[update] = req.body[update])
        await comment.save()
        res.json(comment)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router