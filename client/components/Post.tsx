import { getAllPosts } from '../apis/posts'
import { PostFeedData } from '../../models/post'

export default function PostFeed({ id, user_id }: PostFeedData) {
  return (
    <div key={id}>
      <h3>Date: </h3>
      <p>Posted by: {user_id}</p>
    </div>
  )
}
