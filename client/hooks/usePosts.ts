import {
  useQuery,
  useMutation,
  useQueryClient,
  MutateFunction,
} from '@tanstack/react-query'
import { getAllPosts } from '../apis/posts'

export function usePosts() {
  const query = useQuery({ queryKey: ['posts'], queryFn: getAllPosts })
  return {
    ...query,
  }
}
