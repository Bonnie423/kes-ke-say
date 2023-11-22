import express from 'express'
import checkJwt, { JwtRequest } from '../auth0'
import * as db from '../db/functions/users.ts'

const router = express.Router()

// GET /api/v1/users
router.get('/', (req, res) => {
  res.status(200).send('Hello from the users route!')
})

router.post('/', async (req, res) => {
  try {
    const newUser = req.body
    const user = await db.addUser(newUser)

    // res.json({ user })
    res.redirect('/login')
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

export default router
