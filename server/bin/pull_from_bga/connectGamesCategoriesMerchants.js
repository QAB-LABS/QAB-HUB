const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../.env') })
require('../../configs/database')
const Game = require('../../models/Game')
const Category = require('../../models/Category')
const Mechanic = require('../../models/Mechanic')
const { generateUniqueNumberList } = require('../helpers')

async function connectDBEntries() {
    try {
        const games = await Game.find()
        const categories = await Category.find()
        const mechanics = await Mechanic.find()


        games.map(async game => {
            // game.categories = generateUniqueNumberList(5, [], 1, categories.length-1).map(i => categories[i]._id)
            game.mechanics = generateUniqueNumberList(Math.floor(Math.random() * 5), [], 1, mechanics.length - 1).map(i => mechanics[i]._id)
            await game.save()
        })

    } catch (err) {
        console.log('Could not connect to API', err)
    }
}
connectDBEntries()