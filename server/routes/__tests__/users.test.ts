import { vi, describe, it, expect, beforeEach } from 'vitest'
import server from '../../server'
import request from 'supertest'

import * as db from '../../db/functions/users'

vi.mock('../../db/functions/users')

beforeEach(async () => {
  vi.resetAllMocks()
})

describe('GET /api/v1/users/', () => {
  it('returns all pokemon', async () => {})
})
