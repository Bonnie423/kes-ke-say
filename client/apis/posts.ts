import { PostFeedData } from '../../models/post.ts'
import request from 'superagent'
const postUrl = '/api/v1/posts'

export async function getAllPosts(): Promise<PostFeedData[]> {
  const response = await request.get(postUrl)
  return response.body
}
