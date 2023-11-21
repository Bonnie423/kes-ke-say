import express from 'express'
import checkJwt, { JwtRequest } from '../auth0'

const router = express.Router()

// GET /api/v1/users
router.get('/', (req, res) => {
  res.status(200).send('Hello from the users route!')
})

router.post('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const newUser = req.body
    const auth0Id = req.auth?.sub
    const [user] = await db.addUser({
      ...newUser,
      auth0Id,
    })

    res.json({ user })
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

export default router
