import express from 'express'
import * as db from '../db/functions/users'

const router = express.Router()

// GET /api/v1/users
router.get('/', async (req, res) => {
  try {
    const users = await db.getAllProfiles()
    res.json({ users })
  } catch (error) {
    console.log(error)
    res.status(500).send('Something went wrong getting all profiles')
  }
})

// GET /api/v1/users/:username

export default router
