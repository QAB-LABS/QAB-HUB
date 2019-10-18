const mongoose = require('mongoose')

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

const generateUniqueNumberList = function(length, arr) {
    if (!arr) arr = []
    if (arr.length >= length) return arr
    let newNumber = Math.floor(Math.random() * length + 1);
    if (arr.indexOf(newNumber) < 0) arr.push(newNumber);
    return generateUniqueNumberList(length, arr);
}

async function submitDocuments(name, model, jsonData, drop=true) {
    var documents
    try {
        drop && await model.deleteMany()
        documents = await model.create(jsonData)
        databaseEntries[name] = documents
    } catch (err) {
        errors.push(`${name} - Could not finish populating documents: ${err.name} - ${err.errmsg}`)
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
        .catch(err => {
            console.log('Error populating the database:  ', err)
            mongoose.disconnect()
        })
}

module.exports = {
    seed,
    submitDocuments,
    getRandomElement,
    generateUniqueNumberList,
    errors,
    databaseEntries
}