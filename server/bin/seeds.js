const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const faker = require('faker');
require('../configs/database')

const User = require('../models/User')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const Game = require('../models/Game')
const Merchant = require('../models/Merchant')
const Price = require('../models/Price')
const Review = require('../models/Review')
const Category = require('../models/Category')
const Like = require('../models/Like')


faker.seed(123);
const bcryptSalt = 10
var databaseEntries = {
    users: [],
    posts: [],
    comments: [],
    reviews: [],
    games: [],
    categories: [],
    merchants: [],
}

const getRandomElement = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)]
}

async function submitDocuments(name, model, jsonData) {
    try {
        await model.deleteMany()
        const documents = await model.create(jsonData)
        console.log(`${documents.length} ${name} created.`)
        databaseEntries[name] = documents
    } catch (err) {
        console.log(`Could not populate documents for ${name}: ${err.name} - ${err._message}`, err)
    }
}

async function createDBEntries() {
    await submitDocuments('users', User, Array.from({ length: 10 }).map(e => {
        return {
            username: faker.name.findName(),
            password: bcrypt.hashSync(faker.internet.password(), bcrypt.genSaltSync(bcryptSalt)),
            email: faker.internet.email()
        }
    }))

    await submitDocuments('posts', Post, Array.from({ length: 100 }).map((e, i) => {
        return {
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraph(),
            author: databaseEntries.users[i % databaseEntries.users.length]._id
        }
    }))

    await submitDocuments('comments', Comment, Array.from({ length: 1000 }).map((e, i) => {
        return {
            content: faker.lorem.paragraph(),
            post: databaseEntries.posts[i % databaseEntries.posts.length]._id,
            author: databaseEntries.users[Math.floor(Math.random() * databaseEntries.users.length)]._id
        }
    }))

    await submitDocuments('categories', Category, require('./categories.json'))

    await submitDocuments('games', Game, Array.from({ length: 100 }).map(e => {
        return {
            name: faker.commerce.productName(),
            description: faker.lorem.sentence(),
            price: faker.commerce.price(1, 1000, 2, ''),
            image: faker.image.abstract(),
            year_published: Number(faker.date.between('1990-01-01', new Date().toISOString().slice(0, 10)).toISOString().slice(0, 4)),
            min_players: faker.random.number({ min: 1, max: 4 }),
            max_players: faker.random.number({ min: 4, max: 20 }),
            min_playtime: faker.random.number({ min: 5, max: 30 }),
            max_playtime: faker.random.number({ min: 30, max: 180 }),
            min_age: faker.random.number({ min: 5, max: 60 }),
            mechanics: [faker.commerce.productMaterial()],
            designers: [faker.commerce.department()],
            artists: [faker.name.findName()],
            publisher: faker.company.companyName(),
            family: faker.commerce.productAdjective(),
            categories: Array.from({ length: Math.floor(Math.random() * 5) }).map(e => getRandomElement(databaseEntries.categories)._id),
        }
    }))

    await submitDocuments('reviews', Review, Array.from({ length: 500 }).map(e => {
        return {
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraph(),
            game: getRandomElement(databaseEntries.games)._id,
            author: getRandomElement(databaseEntries.users)._id
        }
    }))

    await submitDocuments('likes', Like, Array.from({ length: 2000 }).map(e => {
        return {
            game: getRandomElement(databaseEntries.games)._id,
            user: getRandomElement(databaseEntries.users)._id
        }
    }))

    await submitDocuments('merchants', Merchant, Array.from({ length: 75 }).map(e => {
        return {
            name: faker.commerce.productName(),
            url: faker.internet.url(),
            country: faker.address.countryCode()
        }
    }))

    await submitDocuments('prices', Price, Array.from({ length: 1000 }).map(e => {
        return {
            price: faker.commerce.price(1, 1000, 2, ''),
            url: faker.internet.url() + faker.internet.domainWord(),
            game: getRandomElement(databaseEntries.games)._id,
            merchant: getRandomElement(databaseEntries.merchants)._id
        }
    }))
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