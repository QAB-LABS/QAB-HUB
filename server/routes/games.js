const express = require('express')
const axios = require('axios')
const Game = require('../models/Game')

const router = express.Router()

// Route to get all games
router.get('/', async(req, res, next) => {
    try {
        const response = await axios
            .get("https://www.boardgameatlas.com/api/search", {
                params: {
                    client_id: process.env.BOARD_GAME_ATLAS_CLIENT_ID,
                    limit: 100
                }
            })
        res.json(response.data.games)
    } catch (err) {
        next(err)
    }
})

module.exports = router