//@vitest-environment jsdom

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react'
import { renderRoute } from '../../test-utils'
import nock from 'nock'
import { Auth0ContextInterface, User, useAuth0 } from '@auth0/auth0-react'
import { getAllUsers } from '../../apis/users'
import { useQuery } from '@tanstack/react-query'
vi.mock('@auth0/auth0-react')
// vi.mock('@tanstack/react-query')
vi.mock('../../apis/users')

const mockAllProfiles = [
  {
    id: 1,
    auth0Id: 'auth0|123',
    username: 'paige',
    fullName: 'Paige Turner',
    location: 'Auckland',
    image: 'ava-03.png',
  },
]

// vi.spyOn(reactQuery, 'useQuery').mockReturnValue({
//   data: mockAllProfiles,
//   isError: false,
//   isLoading: false,
// } as any)

const useAuth0Mock = vi.mocked(useAuth0)

beforeEach(async () => {
  useAuth0Mock.mockReturnValue({
    isAuthenticated: true,
    user: { sub: 'auth0|123' },
    logout: vi.fn(),
    loginWithRedirect: vi.fn(),
  } as unknown as Auth0ContextInterface<User>)
  vi.mocked(getAllUsers).mockResolvedValue([
    {
      id: 1,
      auth0Id: 'auth0|123',
      username: 'paige',
      fullName: 'Paige Turner',
      location: 'Auckland',
      image: 'ava-03.png',
    },
  ])
})

afterEach(() => {
  vi.clearAllMocks()
})

describe('<PostFeed/>', () => {
  it('should render a loading indicator', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/posts')
      .reply(200, [
        {
          postId: 1,
          userId: 1,
          body: 'I found this really interesting book, you should check it out',
          image:
            'https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg',
          createdAt: 1687321511537,
        },
        {
          postId: 2,
          userId: 2,
          body: 'I found this really cool Italian place, they have the best food',
          image:
            'https://img.freepik.com/free-photo/fettuccine-with-tomato-sauce-minced-meat-garnished-with-grated-parmesan_141793-1778.jpg',
          createdAt: 1687321511537,
        },
      ])
    renderRoute('/')
    expect(screen.getByText(/loading/i)).toBeVisible()
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
    expect(scope.isDone()).toBe(true)
  })
  it('should render some posts', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/posts')
      .reply(200, [
        {
          postId: 1,
          userId: 1,
          body: 'I found this really interesting book, you should check it out',
          image:
            'https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg',
          createdAt: 1687321511537,
        },
        {
          postId: 2,
          userId: 2,
          body: 'I found this really cool Italian place, they have the best food',
          image:
            'https://img.freepik.com/free-photo/fettuccine-with-tomato-sauce-minced-meat-garnished-with-grated-parmesan_141793-1778.jpg',
          createdAt: 1687321511537,
        },
      ])
    renderRoute('/')
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
    const list = screen.getAllByRole('list')
    const listItems = within(list[0])
      .getAllByRole('listitem')
      .map((li) => li.textContent)
    expect(listItems).toMatchInlineSnapshot(`
      [
        "Date: 21/06/2023I found this really interesting book, you should check it out",
        "Date: 21/06/2023I found this really cool Italian place, they have the best food",
      ]
    `)
    expect(scope.isDone()).toBe(true)
  })

  it('should show an error message when there is a error', async () => {
    const scope = nock('http://localhost').get('/api/v1/posts').reply(500)
    renderRoute('/')
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
    const error = screen.getByText(/error/i)
    expect(error).toBeVisible()
    expect(scope.isDone()).toBe(true)
  })
})
