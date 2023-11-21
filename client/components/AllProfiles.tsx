import { Link } from 'react-router-dom'
import { getAllUsers } from '../apis/users'
import { useQuery } from '@tanstack/react-query'

export default function AllProfiles() {
  const {
    data: allProfiles,
    isError,
    isLoading,
  } = useQuery({ queryKey: ['users'], queryFn: () => getAllUsers() })
  if (isError) {
    return <div>There was an error getting all profiles...</div>
  }

  if (!allProfiles || isLoading) {
    return <div>Loading all profiles...</div>
  }

  return (
    <div className="grid gap-x-8 gap-y-12 sm:grid-cols-3 sm:gap-y-16 xl:col-span-2 m-2">
      {allProfiles.map((user) => (
        <Link
          to={`/profiles/${user.username}`}
          key={user.id}
          className="p-4 flex-auto text-center w-40 m-auto border-2 border-black"
        >
          <img
            src={`/images/avatars/${user.image}`}
            alt={`${user.fullName}`}
            style={{ maxWidth: '5em', margin: 'auto' }}
          />
          <br />
          {user.fullName}
        </Link>
      ))}
    </div>
  )
}
