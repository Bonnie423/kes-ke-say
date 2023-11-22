import connection from '../connection.ts'

export function getAllPosts() {
  // return connection('posts').select('*')
  const allPosts = connection('posts')
    .join('users', 'users.id', 'posts.user_id')
    .select(
      'posts.id as postId',
      'user_id as userId',
      'users.username as username',
      'users.full_name as fullName',
      'users.image as userImage',
      'posts.body as body',
      'posts.image as image',
      'posts.created_at as createdAt'
    )

  console.log(allPosts)
  return allPosts
}
