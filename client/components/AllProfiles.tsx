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
    <section>
      <ul>
        {allProfiles.map((user) => (
          <li key={user.id}>{user.fullName}</li>
        ))}
      </ul>
    </section>
  )
}
