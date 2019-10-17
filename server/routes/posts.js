const aqp = require('api-query-params');
const express = require('express')
const { isLoggedIn } = require('../middlewares')
const uploadCloud = require('../configs/cloudinary')
const Post = require('../models/Post')
const router = express.Router()

const populatable_virtuals = 'author comments'

/** 
 * Get all posts with the given search parameters 
 * Only supports limit currently.
 * @example
 * GET /api/posts/search?limit=50
 * */
router.get('/search', async(req, res, next) => {
    const { filter, skip, limit, sort, projection, population } = aqp(req.query);
    Post.find(filter)
        .lean()
        .skip(skip || 0)
        .limit(limit || 50)
        .sort(sort)
        .select(projection)
        .populate(population)
        .then(posts => res.json(posts))
        .catch(err => next(err))
})

/** 
 * Get all posts.
 * @example
 * GET /api/posts/
 * */
router.get('/', async(req, res, next) => {
    const { skip, limit, population } = aqp(req.query);

    res.json(await Post
        .find()
        .skip(skip)
        .limit(limit)
        .lean()
        .populate(population))
})

/**
 * Create a post
 * @example POST /api/posts
 */
router.post('/', isLoggedIn, uploadCloud.single('image'), (req, res, next) => {
    postData = {
        title: req.body.title,
        content: req.body.content,
        author: req.user._id
    }

    if (req.file) {
        postData.image = req.file.url
    }

    Post.create(postData)
        .then((post) => {
            res.json(post)
        })
        .catch(err => {
            res.status(404).send(err)
        })
})

/**
 * Get a specific post 
 * @example GET /api/posts/:id
 */
router.get('/:id', async(req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate(populatable_virtuals)
            .populate({
                path: 'comments',
                populate: {
                    path: 'author'
                }
            })
        if (!post) throw new Error()
        res.send(post)
    } catch (e) {
        res.status(404).send()
    }
})

/**
 * Delete a specific post
 * @example DELETE /api/posts/:id
 */
router.delete(`/:id`, isLoggedIn, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) throw new Error()
        if (!req.user._id.equals(post.author)) res.status(403).send('You do not have permission to delete this resource.')
        await post.remove()
        res.status(202).send(post)
    } catch (e) {
        res.status(404).send(e)
    }
})

/**
 * Update a specific post
 * @example 
 * PATCH /api/posts/:id
 */
router.patch(`/:id`, isLoggedIn, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'content', 'image']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' })

    try {
        const post = await Post.findById(req.params.id)
        if (!post) throw new Error()
        updates.forEach((update) => post[update] = req.body[update])
        await post.save()
        res.json(post)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router