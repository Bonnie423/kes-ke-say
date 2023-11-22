import connection from '../connection.ts'

export function getAllPosts() {
  return connection('posts').select('*')
}
