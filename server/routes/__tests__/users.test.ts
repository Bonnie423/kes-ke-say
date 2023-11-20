import { vi, describe, it, expect, beforeEach } from 'vitest'
import server from '../../server'
import request from 'supertest'

import * as db from '../../db/functions/users'

vi.mock('../../db/functions/users')

beforeEach(async () => {
  vi.resetAllMocks()
})

const mockedData = [
  {
    id: 1,
    auth0Id: 'auth0|123',
    username: 'paige',
    fullName: 'Paige Turner',
    location: 'Auckland',
    image: 'ava-03.png',
  },
  {
    id: 2,
    auth0Id: 'auth0|234',
    username: 'ida',
    fullName: 'Ida Dapizza',
    location: 'Auckland',
    image: 'ava-02.png',
  },
  {
    id: 3,
    auth0Id: 'auth0|345',
    username: 'shaq',
    fullName: 'Shaquille Oatmeal',
    location: 'Christchurch',
    image: 'ava-16.png',
  },
  {
    id: 4,
    auth0Id: 'auth0|456',
    username: 'chris',
    fullName: 'Chris P Bacon',
    location: 'Wellington',
    image: 'ava-08.png',
  },
]

describe('GET /api/v1/users/', () => {
  it('returns all pokemon', async () => {
    // Arrange
    vi.mocked(db.getAllProfiles).mockResolvedValue(mockedData)

    // Act
    const response = await request(server).get('/api/v1/users/')

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(4)
    expect(response.body).toMatchInlineSnapshot(`[
      {
        id: 1,
        auth0Id: 'auth0|123',
        username: 'paige',
        fullName: 'Paige Turner',
        location: 'Auckland',
        image: 'ava-03.png',
      },
      {
        id: 2,
        auth0Id: 'auth0|234',
        username: 'ida',
        fullName: 'Ida Dapizza',
        location: 'Auckland',
        image: 'ava-02.png',
      },
      {
        id: 3,
        auth0Id: 'auth0|345',
        username: 'shaq',
        fullName: 'Shaquille Oatmeal',
        location: 'Christchurch',
        image: 'ava-16.png',
      },
      {
        id: 4,
        auth0Id: 'auth0|456',
        username: 'chris',
        fullName: 'Chris P Bacon',
        location: 'Wellington',
        image: 'ava-08.png',
      },
    ]`)
  })
})
