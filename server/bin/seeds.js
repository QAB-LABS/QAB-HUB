const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const faker = require('faker');
require('../configs/database')

const User = require('../models/User')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
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

async function createDBEntries() {
    var usersJSONData = Array.from({ length: 10 }).map(e => {
        return {
            username: faker.name.findName(),
            password: bcrypt.hashSync(faker.internet.password(), bcrypt.genSaltSync(bcryptSalt)),
            email: faker.internet.email()
        }
    })
    await User.deleteMany()
    const users = await User.create(usersJSONData)
    console.log(`${users.length} users created.`)
    databaseEntries.users = users

    var postsJSONData = Array.from({ length: 100 }).map((e, i) => {
        return {
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraph(),
            author: databaseEntries.users[i % 10]._id
        }
    })
    await Post.deleteMany()
    const posts = await Post.create(postsJSONData)
    console.log(`${posts.length} posts created.`)
    databaseEntries.posts = posts

    var commentsJSONData = Array.from({ length: 1000 }).map((e, i) => {
        return {
            content: faker.lorem.paragraph(),
            post: databaseEntries.posts[i & 10]._id,
            author: databaseEntries.users[i % 100]._id
        }
    })
    await Comment.deleteMany()
    const comments = await Comment.create(commentsJSONData)
    console.log(`${comments.length} comments created.`)
    databaseEntries.comments = comments

    await Review.deleteMany()

    await Category.deleteMany()

    await Like.deleteMany()
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