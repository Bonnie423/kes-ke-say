import * as dbFunctions from '../functions/users'

import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import connection from '../connection' // we were importing * as connection, when we needed to import connection by itself

beforeAll(() => {
  return connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

const user = {
  id: 12,
  auth0_id: 'auth0|789',
  username: 'jimbo',
  full_name: 'Jimbo jones',
  location: 'Springfield',
  image: 'ava-09.png',
}

describe('getAllProfiles', () => {
  it('get all the profiles', async () => {
    const allProfiles = await dbFunctions.getAllProfiles()
    expect(allProfiles).toHaveLength(4)
  })
})

describe('addUser', () => {
  it('adds a user', async () => {
    const result = await dbFunctions.addUser(user)
    expect(result).toEqual([
      {
        id: 12,
        auth0Id: 'auth0|789',
        username: 'jimbo',
        fullName: 'Jimbo jones',
        location: 'Springfield',
        image: 'ava-09.png',
      },
    ])
  })
})

afterAll(() => connection.destroy())
