import * as db from '../functions/groups'
import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'

import connection from '../connection'

beforeAll(() => {
  return connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

describe('getAllGroups', () => {
  it('gets the complete list of groups', async () => {
    const allGroups = await db.getAllGroups()
    expect(allGroups).toHaveLength(3)
    expect(allGroups[1].id).toBe(2)
  })
})

afterAll(() => {
  connection.destroy()
})
