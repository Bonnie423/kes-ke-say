import * as dbFunctions from '../functions/users'

import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import connection from '../connection' // we were importing * as connection, when we needed to import connection by itself

beforeAll(() => {
  return connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

describe('getAllProfiles', () => {
  it('get all the profiles', async () => {
    const allProfiles = await dbFunctions.getAllProfiles()
    expect(allProfiles).toHaveLength(4)
  })
})

afterAll(() => connection.destroy())
