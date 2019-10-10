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

async function seed() {
    var usersJSONData = Array.from({ length: 10 }).map(e => {
        return {
            username: faker.name.findName(),
            password: bcrypt.hashSync(faker.internet.password(), bcrypt.genSaltSync(bcryptSalt)),
            email: faker.internet.email()
        }
    })

    const userPromise = await User.deleteMany()
        .then(() => {
            return User.create(usersJSONData)
        })
        .then(usersCreated => {
            console.log(`${usersCreated.length} users created with the following id:`)
            console.log(usersCreated.map(u => u._id))
            databaseEntries.users = usersCreated
        })


    var postsJSONData = Array.from({ length: 100 }).map((e, i) => {
        return {
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraph(),
            author: databaseEntries.users[i % 10]._id
        }
    })

    const postPromise = await Post.deleteMany()
        .then(() => {
            return Post.create(postsJSONData)
        })
        .then(postsCreated => {
            console.log(`${postsCreated.length} posts created with the following id:`)
            console.log(postsCreated.map(u => u._id))
            databaseEntries.posts = postsCreated
        })

    const commentPromise = await Comment.deleteMany()

    const reviewPromise = await Review.deleteMany()

    const categoryPromise = await Category.deleteMany()

    const likePromise = await Like.deleteMany()

    return [userPromise, postPromise, commentPromise, reviewPromise, categoryPromise, likePromise]
}

Promise.all(seed())
    .then(() => {
        mongoose.disconnect()
    })