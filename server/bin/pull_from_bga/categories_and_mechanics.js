const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../.env') })
require('../../configs/database')
const { seed, submitDocuments } = require('../helpers')
const axios = require('axios')

const Category = require('../../models/Category')
const Mechanic = require('../../models/Mechanic')

async function createDBEntries() {
  try {
    const categories = await axios.get(
      `${process.env.BGA_API_URL}/game/categories?pretty=true&client_id=${process.env.BGA_CLIENT_ID}`
    )
    const mechanics = await axios.get(
      `${process.env.BGA_API_URL}/game/mechanics?pretty=true&client_id=${process.env.BGA_CLIENT_ID}`
    )
    await submitDocuments(
      'categories',
      Category,
      categories.data.categories.map((e) => {
        return {
          name: e.name,
          bga_id: e.id,
        }
      })
    )
    await submitDocuments(
      'mechanics',
      Mechanic,
      mechanics.data.mechanics.map((e) => {
        return {
          name: e.name,
          bga_id: e.id,
        }
      })
    )
  } catch (err) {
    console.log('Could not connect to API', err)
  }
}

seed(createDBEntries)
