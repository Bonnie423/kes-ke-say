import express from 'express'
import connection from '../db/connection'
import { getAllPosts } from '../db/functions/posts'

const router = express.Router()

// GET /api/v1/posts
router.get('/', async (req, res) => {
  try {
    const posts = await getAllPosts()
    // if (!posts || posts.length === 0) {
    //   res.status(404).json('No posts!')
    //   return
    // }
    res.json(posts)
  } catch (err) {
    res.status(500).json({
      message: 'an error occurred',
      error: err instanceof Error ? err.message : 'Unknown error',
    })
  }

  // res.status(200).send('Hello from the posts route!')
})

export default router
