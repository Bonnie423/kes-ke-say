import express from 'express'
import * as db from '../db/functions/users'

const router = express.Router()

// GET /api/v1/users
router.get('/', async (req, res) => {
  try {
    const users = await db.getAllProfiles()
    res.status(200).json(users)
  } catch (error) {
    res
      .sendStatus(500)
      .json({ message: 'Something went wrong getting all profiles' })
  }
})

// GET /api/v1/users/:id

export default router
