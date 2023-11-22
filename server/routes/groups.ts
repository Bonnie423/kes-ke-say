import express from 'express'
import { getAllGroups } from '../db/functions/groups'


const router = express.Router()

// GET /api/v1/groups
router.get('/', async (req, res) => {
  try {
    const groupList = await getAllGroups()
    res.json(groupList)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
})


export default router
