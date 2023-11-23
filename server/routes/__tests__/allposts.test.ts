import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'
import server from '../../server'
import { getAllPosts } from '../../db/functions/posts'

vi.mock('../../db/functions/posts')

describe('/', () => {
  it('Call getAllPosts', async () => {
    vi.mocked(getAllPosts).mockResolvedValue([
      {
        id: 1,
        user_id: 1,
        body: 'I found this really interesting book, you should check it out',
        image:
          'https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg',
        created_at: new Date(Date.now()),
      },
    ])
    try {
      const res = await request(server).get('/api/v1/posts')
      // console.log(res)
      expect(res.statusCode).toBe(200)
      console.log()

      expect(getAllPosts).toHaveBeenCalled()
    } catch (error) {
      console.error(error)
    }
  })
  // it('handles page not found', async () => {
  //   vi.mocked(getAllPosts).mockRejectedValue(async () => {
  //     throw new Error('test-error')
  //   })
  //   const res = await request(server).get('/api/v1/postss')
  //   console.log('Response Status Code:', res.statusCode)
  //   console.log('Response Body:', res.body)
  //   expect(res.statusCode).toBe(404)
  //   expect(res.body).toBe({ message: 'No posts!' })
  //   console.log(res.body)
  // })
  it('handles an error', async () => {
    vi.mocked(getAllPosts).mockRejectedValue(async () => {
      throw new Error('test-error')
    })
    const res = await request(server).get('/api/v1/posts')
    expect(res.statusCode).toBe(500)
    expect(getAllPosts).toHaveBeenCalled()
    console.log(res.body)
  })
})
