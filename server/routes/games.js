const express = require('express')
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

/** 
 * Get all games with the given search parameters 
 * Only supports limit currently.
 * @example
 * GET /api/games/search?limit=50
 * */
router.get('/search', async(req, res, next) => {
    const limit = Number(req.query.limit) || 50
    const terms = req.query.terms || ''

    Game.find({ $text: { $search: terms } })
        .limit(limit)
        .populate('likes')
        .then(games => {
            res.json(games)
        })
        .catch(err => next(err))
})

/** 
 * Get all games.  
 * @example
 * GET /api/games/
 * */
router.get('/', async(req, res, next) => {
    res.json(await Game.find().populate('likes'))
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
 * Get a specific game 
 * @example 
 * GET /api/games/:id
 */
router.get('/:id', async(req, res, next) => {
    try {
        const game = await Game.findById(req.params.id).populate('likes')
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
        Like.deleteMany({ game: game._id })
            .then(
                await game.remove()
            )
            .catch(err => {
                console.log(err)
                res.status(404).send(err)
            })
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

    const updates = Object.keys(req.body).filter(e => fields.includes(e))

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