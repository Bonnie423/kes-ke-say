import * as db from '../../db/functions/groups'
import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'

import connection from '../../db/connection.ts'

beforeAll(() => {
  return connection.migrate.latest()
})

beforeEach(() => {
  return connection.seed.run()
})

// describe('deleteGoup', () => {
//   it('deletes a group', async () => {
//     await db.deleteGroup(3)
//     const allGroups = await db.getAllGroups()
//     expect(allGroups).toHaveLength(3)
//   })
// })

describe('getAllGroups', () => {
  it('gets the complete list of vegetables', async () => {
    const allGroups = await db.getAllGroups()
    expect(allGroups).toHaveLength(3)
    expect(allGroups[1].id).toBe(2)
  })
})

afterAll(() => {
  connection.destroy()
})
