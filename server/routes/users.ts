import express from 'express'
import checkJwt, { JwtRequest } from '../auth0'
import * as db from '../db/functions/users.ts'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const users = await db.getAllProfiles()
    res.json({ users })
  } catch (error) {
    console.log(error)
    res.status(500).send('Something went wrong getting all profiles')
  }
})
router.post('/', async (req, res) => {
  try {
    const newUser = req.body
    const user = await db.addUser(newUser)
    console.log('line20', user)
    res.json({ user })
    // res.redirect('/login')
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

export default router
