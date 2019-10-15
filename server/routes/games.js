const express = require('express')
const { isLoggedIn } = require('../middlewares')
const Game = require('../models/Game')
const Like = require('../models/Like')
const router = express.Router()

const fields = [
    "url",
    "name",
    "description",
    "price",
    "image",
    "year_published",
    "min_players",
    "max_players",
    "min_playtime",
    "max_playtime",
    "min_age",
    "mechanics",
    "designers",
    "artists",
    "publisher",
    "family",
    "categories"
]

const populateFields = 'categories likes reviews ratings'

/** 
 * Get all games with the given search parameters 
 * Only supports limit currently.
 * @example
 * GET /api/games/search?limit=50
 * */
router.get('/search', async(req, res, next) => {
    const limit = Number(req.query.limit) || 50
    const skip = Number(req.query.skip) || 0

    Game.find({}, null, {limit, skip})
        .populate(populateFields)
        .then(games => res.json(games))
        .catch(err => next(err))
})

/** 
 * Get all games.  
 * @example
 * GET /api/games/
 * */
router.get('/', async(req, res, next) => {
    res.json(await Game.find().populate(populateFields))
})

/**
 * Create a game
 * @example 
 * POST /api/games/
 */
router.post('/', isLoggedIn, (req, res, next) => {
    if (req.user.role !== "admin") res.status(403).send('You do not have permission to add a new game.')
    const postData = {}
    fields.forEach(field => postData[field] = req.body[field])

    Game.create(postData)
        .then((game) => {
            res.json(game)
        }).catch(err => {
            res.status(404).send(err)
        })
})

/**
 * Get the total number of games
 * @example 
 * GET /api/games/count
 */
router.get('/count', async(req, res, next) => {
    try {
        res.json({ count: await Game.count() })
    } catch (e) {
        res.status(404).send()
    }
})

/**
 * Get a specific game 
 * @example 
 * GET /api/games/:id
 */
router.get('/:id', async(req, res, next) => {
    try {
        const game = await Game.findById(req.params.id)
            .populate(populateFields)
        if (!game) throw new Error()
        res.send(game)
    } catch (e) {
        res.status(404).send()
    }
})

/**
 * Delete a specific game
 * @example 
 * DELETE /api/games/:id
 */
router.delete('/:id', isLoggedIn, async(req, res) => {
    try {
        const game = await Game.findById(req.params.id)
        if (!game) throw new Error()
        if (req.user.role !== "admin") res.status(403).send('You do not have permission to delete this resource.')
        await game.remove()
        res.status(202).send(game)
    } catch (e) {
        res.status(404).send(e)
    }
})

/**
 * Update a specific game
 * @example 
 * PATCH /api/games/:id
 */
router.patch(`/:id`, isLoggedIn, async(req, res) => {
    if (req.user.role !== "admin") res.status(403).send('You do not have permission to update this resource.')

    const updates = Object.keys(req.body)
    const allowedUpdates = fields
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' })

    try {
        const game = await Game.findById(req.params.id)
        if (!game) throw new Error()
        updates.forEach((update) => game[update] = req.body[update])
        await game.save()
        res.json(game)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router