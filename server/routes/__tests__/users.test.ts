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

const mockedUser = [
  {
    id: 12,
    auth0Id: 'auth0|789',
    username: 'jimbo',
    fullName: 'Jimbo jones',
    location: 'Springfield',
    image: 'ava-09.png',
  },
]

describe('GET /api/v1/users/', () => {
  it('returns all users', async () => {
    // Arrange
    vi.mocked(db.getAllProfiles).mockResolvedValue(mockedData)

    // Act
    const response = await request(server).get('/api/v1/users/')

    expect(response.status).toBe(200)
    expect(response.body.users).toHaveLength(4)
    expect(response.body.users).toEqual([
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
    ])
  })

  it('returns an error if getAllProfiles throws', async () => {
    // Arrange
    const error = new Error('DATABASE ERROR: secret error info')
    vi.mocked(db.getAllProfiles).mockRejectedValue(error)
    vi.spyOn(console, 'log').mockImplementation(() => {})

    // Act
    const response = await request(server).get('/api/v1/users/')

    // Assert
    expect(console.log).toHaveBeenCalledWith(error)
    expect(response.status).toBe(500)
    expect(response.text).toBe('Something went wrong getting all profiles')
  })
})

describe('POST /api/v1/users/', () => {
  it('adds a user to the db', async () => {
    // Arrange
    console.log('line 122', mockedUser)
    vi.mocked(db.addUser).mockResolvedValue(mockedUser)
    console.log('line 123)', mockedUser)
    const response = await request(server)
      .post('/api/v1/users/')
      .send(mockedUser)

    expect(response.status).toBe(200)
    expect(response.body.user).toEqual([
      {
        auth0Id: 'auth0|789',
        fullName: 'Jimbo jones',
        id: 12,
        image: 'ava-09.png',
        location: 'Springfield',
        username: 'jimbo',
      },
    ])
  })
})
