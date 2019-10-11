const express = require('express')
const { isLoggedIn } = require('../middlewares')
const Like = require('../models/Like')
const router = express.Router()

/** 
 * Get all likes with the given search parameters 
 * Only supports limit currently.
 * @example
 * GET /api/likes/search?limit=50
 * */
router.get('/search', async (req, res, next) => {
  const limit = Number(req.query.limit) || 50
  Like.find()
    .limit(limit)
    .populate('user game')
    .then(likes => {
      res.json(likes)
    })
    .catch(err => next(err))
})

/** 
 * Get all likes.
 * @example
 * GET /api/likes/
 * */
router.get('/', async (req, res, next) => {
  res.json(await Like.find()
    .populate('user game'))
})

/**
 * Create a like
 * @example 
 * POST /api/likes
 */
router.post('/', (req, res, next) => {
  postData = {
    user: req.body.user,
    game: req.body.game
  }

  Like.find(postData)
    .then((like) => {
      if (like.length > 0)
        res.status(409).send("This like already exists")
      else {
        Like.create(postData)
          .then((like) => {
            res.json(like)
          })
          .catch(err => console.error(err))
      }
    })
    .catch(err => console.error(err))
})

/**
 * Get a specific like 
 * @example 
 * GET /api/likes/:id
 */
router.get('/:id', async (req, res, next) => {
  try {
    const like = await Like.findById(req.params.id)
      .populate('user game')
    if (!like) throw new Error()
    res.send(like)
  } catch (e) {
    res.status(404).send()
  }
})

/**
 * Delete a specific like
 * @example 
 * DELETE /api/likes/:id
 */
router.delete(`/:id`, isLoggedIn, async (req, res) => {
  try {
    const like = await Like.findById(req.params.id)
    if (!like) throw new Error()
    if (!req.user._id.equals(like.user) && req.user.role !== "admin") res.status(403).send('You do not have permission to delete this resource.')
    await like.remove()
    res.status(202).send(like)
  } catch (e) {
    res.status(404).send(e)
  }
})

module.exports = router