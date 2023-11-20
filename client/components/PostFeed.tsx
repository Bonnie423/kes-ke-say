import Post from './Post'
import { PostFeedData } from '../../models/post'
import { usePosts } from '../hooks/usePosts'

export default function PostFeed() {
  const { data: postFeedData } = usePosts()
  return (
    <div>
      {postFeedData?.map((p) => (
        <div key={p.id} className="post">
          <h3>Date: </h3>
          <p>{p.body}</p>
        </div>
      ))}
    </div>
  )
}
