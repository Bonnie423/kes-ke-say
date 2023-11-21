import Post from './Post'
import { PostFeedData } from '../../models/post'
import { usePosts } from '../hooks/usePosts'
import { isError } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function PostFeed() {
  const { data: postFeedData } = usePosts()

  return (
    <div className="h-screen flex flex-col items-center justify-between overflow-y-auto">
      <Link to={'/post'}>
        <div className="border-2 p-2 bg-black text-white rounded-2xl m-5">
          Add Post
        </div>
      </Link>
      <div className="">
        {postFeedData?.map((p) => (
          <div
            key={p.id}
            className="flex flex-col mt-5 p-5 border-2 rounded-lg hover:bg-gray-100

            "
          >
            <header className="flex flex-row gap-3 items-center">
              <img
                src="https://picsum.photos/30/30"
                className="rounded-full"
                alt={'person'}
              />
              <div>{p.user_id}</div>
              <div className="text-sm text-gray-500">
                <h3>
                  Date:{' '}
                  {new Intl.DateTimeFormat('en-GB').format(
                    new Date(p.created_at)
                  )}
                </h3>
              </div>
            </header>
            <div>
              <Link to={`/post/${p.id}`}>
                <div className="pb-5">
                  <p className="font-light text-sm pt-2">{p.body}</p>
                </div>
                <span className="flex items-center justify-center">
                  {p.image ? (
                    <img src={p.image} alt={'thing'} width="300px" />
                  ) : null}
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
