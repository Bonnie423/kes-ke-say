import request from 'superagent'
import { logError } from './utils.js'
import { User, UserData, UserForm } from '../../models/user.js'

const domain = 'manaia-2023-pete.au.auth0.com'

// interface AddUsersFunction {
//   newUser: User
// }
export async function addUser(newUser: UserForm): Promise<User> {
  console.log('newUser: ', newUser)

  const sentUser: UserData = {
    client_id: '0ZtdingvXGgcWW5Jrf29utZNnXzmuMk2',
    email: newUser.email,
    password: newUser.password,
    picture: newUser.picture,
    connection: 'Kes-Ke-Say',
  }
  return request
    .post(`https://${domain}/dbconnections/signup`)
    .send(sentUser)
    .then((res) => res.body)
    .catch(logError)
}

// {
//   "client_id": "{yourClientId}",
//   "email": "EMAIL",
//   "password": "PASSWORD",
//   "connection": "CONNECTION"
// }
