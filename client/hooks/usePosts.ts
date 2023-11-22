import {
  useQuery,
  useMutation,
  useQueryClient,
  MutateFunction,
} from '@tanstack/react-query'
import { getAllPosts } from '../apis/posts'
import { isError } from '@tanstack/react-query'

export function usePosts() {
  const query = useQuery({ queryKey: ['posts'], queryFn: getAllPosts })
  return {
    ...query,
    isLoading: query.isLoading,
    isError: query.isError,
  }
}
