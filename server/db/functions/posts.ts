import connection from '../connection.ts'
import knex from 'knex'
import { PostFeedData } from '../../../models/post'

export function getAllPosts() {
  return connection('posts').select('*')
}
