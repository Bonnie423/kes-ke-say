import request from 'superagent'
import type { Group } from '../../models/groups.ts'

export async function getAllGroups(): Promise<Group[]> {
  const response = await request.get('/api/v1/groups')
  return response.body
}