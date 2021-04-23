const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config({ path: path.join(__dirname, '../../.env') })
require('../../configs/database')
const axios = require('axios')
const {
  setIntervalAsync,
  clearIntervalAsync,
} = require('set-interval-async/dynamic')

const Game = require('../../models/Game')
const { submitDocuments, transpose_game_entry } = require('../helpers')

const offset = 9
let skip = offset //First 9 Don't have name entries...
const rpm_delay = 1000 // BGS rate limit: https://www.boardgameatlas.com/api/docs/ratelimits
const limit = 100
const baseUrl = `${process.env.BGA_API_URL}/search?&order_by=name&ascending=true&limit=${limit}`
let timer

async function createDBEntries() {
  const total = skip - offset
  let games
  try {
    games = await axios.get(
      `${baseUrl}&skip=${skip}&client_id=${process.env.BGA_CLIENT_ID}`
    )
  } catch (err) {
    games = { failed: true }
    console.log('axios error: ', err)
  }
  if (games.failed || games.data.error || games.data.games.length < 100) {
    clearIntervalAsync(timer)
    console.log(
      `Received non 200 response (${games.status}) from BGA api after ${total} entries.`
    )
    return mongoose.disconnect()
  }
  const processed_games = games.data.games
    .filter((game) => game.name)
    .map(transpose_game_entry)

  await submitDocuments('games', Game, processed_games, false)
  console.log(
    `Processed ${
      processed_games.length
    }...should be at ${total} documents...actual=${await Game.countDocuments()}`
  )
  skip += limit
}

async function seed() {
  try {
    Game.deleteMany()
    timer = setIntervalAsync(async () => {
      await createDBEntries()
    }, rpm_delay)
  } catch (err) {
    console.log(`Error populating the database: ${err.response || err}`)
  }
}

seed()
