import request from 'superagent'
import { logError } from './utils.js'
import {
  Profile,
  User,
  UserData,
  UserForm,
  UserSnakeCase,
} from '../../models/user.js'

const domain = 'manaia-2023-pete.au.auth0.com'

// interface AddUsersFunction {
//   newUser: User
// }
export async function addUser(newUser: UserForm): Promise<any> {
  console.log('newUser: ', newUser)

  const sentUser: UserData = {
    client_id: '0ZtdingvXGgcWW5Jrf29utZNnXzmuMk2',
    email: newUser.email,
    password: newUser.password,
    connection: 'Kes-Ke-Say',
  }
  await request
    .post(`https://${domain}/dbconnections/signup`)
    .send(sentUser)
    .then((res) => {
      console.log('Auth Res', res)
      addLocalUser(res.body, newUser)
    })
}

async function addLocalUser(
  authRes: any,
  newUser: UserForm | Profile
): Promise<User> {
  const localUser = {
    auth0_id: `auth0|${authRes._id}`,
    username: newUser.username,
    full_name: newUser.fullname,
    location: newUser.location,
    image: newUser.picture,
  }
  console.log(localUser)
  const finalUser = await request.post('/api/v1/users').send(localUser)

  return finalUser.body
}

export async function completeProfile(
  authRes: string,
  newUser: UserForm | Profile
): Promise<User> {
  const localUser = {
    auth0_id: authRes,
    username: newUser.username,
    full_name: newUser.fullname,
    location: newUser.location,
    image: newUser.picture,
  }
  console.log(localUser)
  const finalUser = await request.post('/api/v1/users').send(localUser)

  return finalUser.body
}

const serverUrl = '/api/v1/users'

// GET '/api/v1/users'
export async function getAllUsers(): Promise<User[]> {
  const response = await request.get(serverUrl)
  return response.body.users
}
