const express = require('express')
const { isLoggedIn } = require('../middlewares')
const Mechanic = require("../models/Mechanic")
const router = express.Router()

/** 
 * Get all mechanic with the given search parameters 
 * Only supports limit currently.
 * @example
 * GET /api/mechanics/search?limit=50
 * */
router.get('/search', async (req, res, next) => {
  const limit = +req.query.limit || 50
  const name = (req.query.name || "").toLowerCase();
  Mechanic.find()
    .limit(limit)
    .then(mechanics => {
      mechanics = mechanics.filter((mechanic) => mechanic.name.toLowerCase().includes(name))
      res.json(mechanics)
    })
    .catch(err => next(err))
})

/** 
 * Get all mechanics.
 * @example
 * GET /api/mechanics/
 * */
router.get('/', async (req, res, next) => {
  res.json(await Mechanic.find())
})

/**
 * Create a mechanic
 * @example 
 * POST /api/mechanics
 */
router.post('/', isLoggedIn, (req, res, next) => {
  postData = {
    name: req.body.name,
  }

  if (req.user.role !== "admin") res.status(403).send('You do not have permission to add a new category.')

  Mechanic.create(postData)
    .then((mechanic) => {
      res.json(mechanic)
    })
    .catch(err => {
      res.status(404).send(err)
    })
})

/**
 * Get a specific mechanic 
 * @example 
 * GET /api/mechanics/:id
 */
router.get('/:id', async (req, res, next) => {
  try {
    const mechanic = await Mechanic.findById(req.params.id)
    if (!mechanic) throw new Error()
    res.send(mechanic)
  } catch (e) {
    res.status(404).send()
  }
})

/**
 * Delete a specific mechanic
 * @example 
 * DELETE /api/mechanics/:id
 */
router.delete('/:id', isLoggedIn, async (req, res) => {
  try {
    const mechanic = await Mechanic.findById(req.params.id)
    if (!mechanic) throw new Error()
    if (req.user.role !== "admin") res.status(403).send('You do not have permission to delete this resource.')
    await mechanic.remove()
    res.status(202).send(mechanic)
  } catch (e) {
    res.status(404).send(e)
  }
})

/**
 * Update a specific mechanic
 * @example 
 * PATCH /api/mechanics/:id
 */
router.patch(`/:id`, isLoggedIn, async (req, res) => {
  if (req.user.role !== "admin") res.status(403).send('You do not have permission to update this resource.')

  const updates = Object.keys(req.body)
  const allowedUpdates = ['name']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' })

  try {
    const mechanic = await Mechanic.findById(req.params.id)
    if (!mechanic) throw new Error()
    updates.forEach((update) => mechanic[update] = req.body[update])
    await mechanic.save()
    res.json(mechanic)
  } catch (e) {
    res.status(400).send(e)
  }
})

module.exports = router
