import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import { getAllPosts } from '../functions/posts'

import connection from '../connection'

beforeAll(() => {
  return connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

describe('getAllPosts', () => {
  it('returns all the posts', async () => {
    const allPosts = await getAllPosts()
    expect(allPosts).toHaveLength(8)
    expect(allPosts[1].id).toBe(2)
    expect(allPosts[2].body).toBe('No pineapples')
  })
})

afterAll(() => {
  connection.destroy()
})
