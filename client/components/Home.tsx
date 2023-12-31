import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from '@tanstack/react-query'
import { getAllUsers } from '../apis/users'
import PostFeed from './PostFeed'

export default function Home() {
  const { user, isAuthenticated, isLoading } = useAuth0()
  const navigate = useNavigate()

  const {
    data: allProfiles,
    isError,
    isLoading: isPending,
  } = useQuery({ queryKey: ['users'], queryFn: () => getAllUsers() })
  if (isError) {
    console.log('isError')
    return <div>There was an error getting all profiles...</div>
  }

  if (!allProfiles || isPending) {
    console.log('isPending')
    return <div>Loading all profiles...</div>
  }

  // useEffect(() => {
  if (isLoading) {
    return
  }
  if (
    isAuthenticated &&
    allProfiles?.some((profile) => profile.auth0Id === user?.sub)
  ) {
    console.log('User authenticated:', user)
  } else if (isAuthenticated) {
    console.log('Redirecting to /complete-profile', allProfiles)
    navigate('/complete-profile')
  } else {
    console.log('User not authenticated')
    navigate('/login')
  }
  // }, [isAuthenticated, user, isLoading, navigate])

  return (
    <div>
      <PostFeed />
    </div>
  )
}
