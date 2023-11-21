import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'

import server from '../../server'
import * as db from '../../db/functions/groups'

vi.mock('../../db/functions/groups')

describe('GET /api/v1/groups', () => {
  it('should return an array of groups', async () => {
    vi.mocked(db.getAllGroups).mockResolvedValue([
      { id: 1, name: 'friendChips', image: 'fries-darkgray.png' },
    ])

    const response = await request(server).get('/api/v1/groups')

    expect(response.statusCode).toBe(200)
    expect(response.body).toMatchInlineSnapshot(`
      [
        {
          "id": 1,
          "image": "fries-darkgray.png",
          "name": "friendChips",
        },
      ]
    `)
  })
  it('should return an error message when the db fails', async () => {
    vi.mocked(db.getAllGroups).mockRejectedValue(
      new Error('SQLITE ERROR: db broke')
    )

    vi.spyOn(console, 'error').mockImplementation(() => {})

    const response = await request(server).get('/api/v1/groups')

    console.log(response.body, 'from the test file')

    // expect(response.body).toEqual({
    //   error: 'There was an error trying to get the sharks',
    // })

    expect(response.body.error).toBe('Internal server error')
    expect(console.error).toHaveBeenCalledWith(
      new Error('SQLITE ERROR: db broke')
    )

    expect(response.body.error).not.toBe('SQLITE ERROR: db broke')
    expect(response.statusCode).toBe(500)
  })
})
