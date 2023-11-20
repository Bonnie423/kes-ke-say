import { User, UserSnakeCase } from '../../../models/user'
import db from '../connection'

export async function getAllProfiles(): Promise<User[]> {
  const users = await db('users').select()
  return users
}
