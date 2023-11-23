import { User } from '../../../models/user.js'
import db from '../connection'

export async function addUser(newUser: User): Promise<User> {
  const result = await db('users')
    .insert(newUser)
    .returning([
      'id',
      'auth0_id as auth0Id',
      'username',
      'full_name as fullName',
      'location',
      'image',
    ])
  console.log(result)
  return result
}

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
