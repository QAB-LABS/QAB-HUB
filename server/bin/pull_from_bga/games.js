const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../.env') })
require('../../configs/database')
const axios = require('axios')
const Game = require('../../models/Game')
const { setIntervalAsync, clearIntervalAsync } = require('set-interval-async/dynamic')
const { submitDocuments } = require('../helpers')


let skip = 9; //First 9 Don't have name entries...
const limit = 100;
const baseUrl = `https://www.boardgameatlas.com/api/search?&pretty=true&order_by=name&ascending=true&limit=${limit}&`;
let timer;

async function createDBEntries() {
    try {
        const games = await axios.get(`${baseUrl}skip=${skip}&client_id=${process.env.BGA_CLIENT_ID}`);
        if (games.data.error || games.data.games.length < 100) {
            clearIntervalAsync(timer);
            mongoose.disconnect()
        }
        await submitDocuments('games', Game, games.data.games.map((e) => {
            return {
                name: e.name,
                bga_id: e.id,
                description: e.description_preview,
                price: e.price,
                image: e.image_url,
                year_published: e.year_published,
                min_players: e.min_players,
                max_players: e.max_players,
                min_playtime: e.min_playtime,
                max_playtime: e.max_playtime,
                min_age: e.min_age,
                mechanics: e.mechanics ?
                    e.mechanics.map(mechanic => mechanic.id) : [],
                designers: e.designers,
                artists: e.artists,
                publishers: e.publishers,
                categories: e.categories ?
                    e.categories.map(category => category.id) : [],

            }
        }), false)
        skip += limit;
        console.log("Currently on ", (skip - 9), "documents")
    } catch (err) {
        console.log('Could not connect to API', err)
    }
}

async function seed() {
    try {
        Game.deleteMany();
        timer = setIntervalAsync(async() => { await createDBEntries() }, 1200)
    } catch (err) {
        console.log('Error populating the database:  ', err)
    }
}

seed();