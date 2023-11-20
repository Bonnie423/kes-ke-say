import { User, UserSnakeCase } from '../../../models/user'
import db from '../connection'

export async function getAllProfiles(): Promise<User[]> {
  const users = await db('users').select([
    'id',
    'auth0_id as auth0Id',
    'username',
    'full_name as fullName',
    'location',
    'image',
  ])
  return users
}
