import request from 'superagent'
import { logError } from './utils.js'
import { User } from '../../models/user.js'

const rootUrl = '/api/v1'

interface AddUsersFunction {
  newUser: User
  token: string
}
export async function addUser({
  newUser,
  token,
}: AddUsersFunction): Promise<User> {
  return request
    .post(`${rootUrl}/users`)
    .set('Authorization', `Bearer ${token}`)
    .send(newUser)
    .then((res) => res.body)
    .catch(logError)
}
