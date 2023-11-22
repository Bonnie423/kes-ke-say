export interface UserSnakeCase {
  id?: number
  auth0_id: string
  username: string
  full_name: string
  location: string
  image: string
}

export interface User {
  id: number
  auth0Id: string
  username: string
  fullName: string
  location: string
  image: string
}

export interface UserData {
  client_id: string
  email: string
  password: string
  connection: string
}

export interface UserForm {
  email: string
  password: string
  picture: string
  username: string
  fullname: string
  location: string
}

export interface Profile {
  username: string
  fullname: string
  location: string
  picture: string
}
