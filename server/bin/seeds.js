const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

const { databaseEntries, submitDocuments, getRandomElement, seed, errors } = require('./helpers')
const bcrypt = require('bcryptjs')
const faker = require('faker')
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
const Rating = require('../models/Rating')
const Mechanic = require('../models/Mechanic')


faker.seed(123)
const bcryptSalt = 10

async function createDBEntries() {
  console.log('starting to create DB Entries.')

  await submitDocuments(
    'users',
    User,
    Array.from({ length: 200 }).map((e) => {
      return {
        username: faker.name.findName(),
        password: bcrypt.hashSync(
          faker.internet.password(),
          bcrypt.genSaltSync(bcryptSalt)
        ),
        email: faker.internet.email(),
      }
    })
  )

  await submitDocuments(
    'posts',
    Post,
    Array.from({ length: 300 }).map((e, i) => {
      return {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        author: databaseEntries.users[i % databaseEntries.users.length]._id,
      }
    })
  )

  await submitDocuments(
    'comments',
    Comment,
    Array.from({ length: 1000 }).map((e, i) => {
      return {
        content: faker.lorem.paragraph(),
        post: databaseEntries.posts[i % databaseEntries.posts.length]._id,
        author:
          databaseEntries.users[
            Math.floor(Math.random() * databaseEntries.users.length)
          ]._id,
      }
    })
  )

  databaseEntries.users = await User.find()
  databaseEntries.mechanics = await Mechanic.find()
  databaseEntries.categories = await Category.find()
  databaseEntries.games = await Game.find()

  await submitDocuments(
    'reviews',
    Review,
    Array.from({ length: 10000 }).map((e) => {
      return {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        game: getRandomElement(databaseEntries.games)._id,
        author: getRandomElement(databaseEntries.users)._id,
      }
    })
  )

  await submitDocuments(
    'likes',
    Like,
    Array.from({ length: 10000 }).map((e) => {
      return {
        game: getRandomElement(databaseEntries.games)._id,
        user: getRandomElement(databaseEntries.users)._id,
      }
    })
  )

  await submitDocuments(
    'merchants',
    Merchant,
    Array.from({ length: 75 }).map((e) => {
      return {
        name: faker.commerce.productName(),
        url: faker.internet.url(),
        country: faker.address.countryCode(),
      }
    })
  )

  databaseEntries.merchants = await Merchant.find()

  await submitDocuments(
    'prices',
    Price,
    Array.from({ length: 10000 }).map((e) => {
      return {
        price: faker.commerce.price(1, 1000, 2, ''),
        url: faker.internet.url() + faker.internet.domainWord(),
        game: getRandomElement(databaseEntries.games)._id,
        merchant: getRandomElement(databaseEntries.merchants)._id,
      }
    })
  )

  await submitDocuments(
    'ratings',
    Rating,
    Array.from({ length: 10000 }).map((e) => {
      return {
        value: faker.random.number({ min: 20, max: 100 }),
        game: getRandomElement(databaseEntries.games)._id,
        author: getRandomElement(databaseEntries.users)._id,
      }
    })
  )
}

seed(createDBEntries)
