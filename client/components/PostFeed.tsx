import { usePosts } from '../hooks/usePosts'

import { Link } from 'react-router-dom'

export default function PostFeed() {
  const { data: postFeedData, isLoading, isError } = usePosts()
  if (isError) {
    return <p>Error with posts</p>
  }
  if (!postFeedData || isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div className="h-screen flex flex-col items-center justify-between overflow-y-auto">
      <Link to={'/post'}>
        <div
          data-testid="button"
          className="button border-2 p-2 bg-black text-white rounded-2xl m-5"
        >
          Add Post
        </div>
      </Link>
      <div className="">
        <ul>
          {postFeedData?.map((p) => (
            <li
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
