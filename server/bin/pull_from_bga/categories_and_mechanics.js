const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../../.env') })

const mongoose = require('mongoose')
require('../../configs/database')

const axios = require('axios')

const Category = require('../../models/Category')
const Mechanic = require('../../models/Mechanic')

async function submitDocuments(name, model, jsonData) {
  try {
    await model.deleteMany()
    const documents = await model.create(jsonData)
    console.log(`${documents.length} ${name} created.`)
  } catch (err) {
    console.log(`Could not populate documents for ${name}: ${err.name} - ${err._message}`, err)
  }
}

async function createDBEntries() {
  try {
    const categories = await axios.get(`https://www.boardgameatlas.com/api/game/categories?pretty=true&client_id=${process.env.BGA_CLIENT_ID}`)
    const mechanics = await axios.get(`https://www.boardgameatlas.com/api/game/mechanics?pretty=true&client_id=${process.env.BGA_CLIENT_ID}`)
    await submitDocuments('categories', Category, categories.data.categories.map((e) => {
      return {
        name: e.name,
        bga_id: e.id
      }
    }))
    await submitDocuments('mechanics', Mechanic, mechanics.data.mechanics.map((e) => {
      return {
        name: e.name,
        bga_id: e.id
      }
    }))
  } catch (err) {
    console.log('Could not connect to API', err)
  }
}

async function seed() {
  try {
    await createDBEntries()
  } catch (err) {
    console.log('Error populating the database:  ', err)
  } finally {
    mongoose.disconnect()
  }
}

seed()