const mongoose = require('mongoose')

console.log(process.env.MONGODB_URI)

const databaseEntries = {
  users: [],
  posts: [],
  comments: [],
  reviews: [],
  games: [],
  categories: [],
  merchants: [],
  ratings: [],
  mechanics: [],
  prices: [],
}

const errors = []

const getRandomElement = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

const generateUniqueNumberList = function (length, arr, min, max) {
  if (!arr) arr = []
  if (arr.length >= length) return arr
  let newNumber
  if (min && max) newNumber = Math.floor(Math.random() * (max - min + 1)) + min
  else newNumber = Math.floor(Math.random() * length + 1)
  if (arr.indexOf(newNumber) < 0) arr.push(newNumber)
  return generateUniqueNumberList(length, arr, min, max)
}

async function submitDocuments(name, model, jsonData, drop = true) {
  console.log(`Populating model: ${name}`)
  let documents
  try {
    if (drop) {
      console.log(`dropping existing ${name} entries`)
      await model.deleteMany()
    }
    documents = await model.create(jsonData)
    console.log(documents)
    if (drop) {
      databaseEntries[name] = documents
    } else {
      databaseEntries[name] = databaseEntries[name].concat(documents)
    }
  } catch (err) {
    console.log('Error submitting documents: ', err)
    errors.push(
      `${name} - Could not finish populating documents: ${err.name} - ${err.errmsg}`
    )
  } finally {
    const count = await model.countDocuments()
    console.log(`${count} ${name} created.`)
  }
}

function seed(cb) {
  cb()
    .then(() => {
      console.log('\n\nRan into these errors:')
      console.log('\n\t' + errors.join('\n\t') + '\n\n')
      mongoose.disconnect()
    })
    .catch((err) => {
      console.log('Error populating the database:  ', err)
      mongoose.disconnect()
    })
}

const transpose_game_entry = (game) => {
  console.log(game.categories)
  return {
    name: game.name,
    bga_id: game.id,
    description: game.description_preview,
    price: game.price,
    image: game.image_url,
    year_published: game.year_published,
    min_players: game.min_players,
    max_players: game.max_players,
    min_playtime: game.min_playtime,
    max_playtime: game.max_playtime,
    min_age: game.min_age,
    mechanics: game.mechanics
      ? game.mechanics.map((mechanic) => mechanic.id)
      : [],
    designers: game.designers.map((designer) => designer.id),
    artists: game.artists,
    publishers: game.publishers.map((publisher) => publisher.id),
    categories: game.categories
      ? game.categories.map((category) => category.id)
      : [],
  }
}

module.exports = {
  seed,
  submitDocuments,
  getRandomElement,
  generateUniqueNumberList,
  errors,
  databaseEntries,
  transpose_game_entry,
}
