const express = require('express')
const axios = require('axios')
const { isLoggedIn } = require('../middlewares')
const Game = require('../models/Game')
const Like = require('../models/Like')

const router = express.Router()

/** 
 * Get all games with the given search parameters 
 * Only supports limit currently.
 * @example
 * GET /api/games/search?limit=50
 * */
router.get('/search', async (req, res, next) => {
    const limit = Number(req.query.limit) || 50
    Game.find()
        .limit(limit)
        .populate('categories likes')
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
router.get('/', async (req, res, next) => {
    res.json(await Game.find().populate('categories likes'))
})

/**
 * Create a game
 * @example 
 * POST /api/games
 */
router.post('/', isLoggedIn, (req, res, next) => {
    postData = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.ie,
        year_published: req.body.year_published,
        min_players: req.body.min_players,
        max_players: req.body.max_players,
        min_playtime: req.body.min_playtime,
        max_playtime: req.body.max_playtime,
        min_age: req.body.min_age,
        mechanics: req.body.mechanics,
        designers: req.body.designers,
        artists: req.body.artists,
        publisher: req.body.publisher,
        family: req.body.family,
        categories: req.body.categories,
    }

    if (req.user.role !== "admin") res.status(403).send('You do not have permission to add a new merchant.')

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
router.get('/:id', async (req, res, next) => {
    try {
        const game = await Game.findById(req.params.id)
            .populate('categories likes')
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
router.delete('/:id', isLoggedIn, async (req, res) => {
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
 * POST /api/games/:id
 */
router.patch(`/:id`, isLoggedIn, async (req, res) => {
    if (req.user.role !== "admin") res.status(403).send('You do not have permission to update this resource.')

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'description', 'price', 'image', 'year_published', 'min_players', 'max_players', 'min_playtime', 'max_playtime', 'min_age', 'mechanics', 'designers', 'artists', 'publisher', 'family', 'categories']
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