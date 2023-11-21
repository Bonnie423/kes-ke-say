import { User } from '../../../models/user.js'
import connection from '../connection.js'

const db = connection

export async function addUser(newUser: User): Promise<User[]> {
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
