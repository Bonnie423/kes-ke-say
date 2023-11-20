import request from 'superagent'
import { User, UserSnakeCase } from '../../models/user'

const serverUrl = '/api/v1/users'

// GET '/api/v1/users'
export async function getAllUsers(): Promise<User[]> {
  const response = await request.get(serverUrl)
  return response.body.users
}
