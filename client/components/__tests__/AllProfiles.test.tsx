// @vitest-environment jsdom

import { describe, it, expect } from 'vitest'
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react/pure'
import nock from 'nock'

import { renderRoute } from '../../test-utils'

nock.disableNetConnect()

describe('<AllProfiles />', () => {
  it('correctly renders a loading message', async () => {
    // ARRANGE
    const scope = nock('http://localhost').get('/api/v1/users').reply(200, {
      id: 1,
      auth0Id: 'auth0|123',
      username: 'paige',
      fullName: 'Paige Turner',
      location: 'Auckland',
      image: 'ava-03.png',
    })
    // ACT
    const { ...screen } = renderRoute('/profiles')
    const loading = await waitFor(() =>
      screen.getByText(/loading all profiles.../i)
    )
    // ASSERT
    expect(loading).toBeVisible()
    expect(scope.isDone()).toBe(true)
  })
  it('should render an error message when things go wrong', async () => {
    const scope = nock('http://localhost').get('/api/v1/users').reply(500)
    const { ...screen } = renderRoute('/profiles')
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/loading all profiles.../i)
    )

    const error = screen.getByText(/there was an error/i)

    expect(error).toBeVisible()
    expect(scope.isDone()).toBe(true)
  })

  it('correctly renders a user profile', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/users')
      .reply(200, {
        users: [
          {
            id: 1,
            auth0Id: 'auth0|123',
            username: 'paige',
            fullName: 'Paige Turner',
            location: 'Auckland',
            image: 'ava-03.png',
          },
          {
            id: 2,
            auth0Id: 'auth0|234',
            username: 'ida',
            fullName: 'Ida Dapizza',
            location: 'Auckland',
            image: 'ava-02.png',
          },
          {
            id: 3,
            auth0Id: 'auth0|345',
            username: 'shaq',
            fullName: 'Shaquille Oatmeal',
            location: 'Christchurch',
            image: 'ava-16.png',
          },
          {
            id: 4,
            auth0Id: 'auth0|456',
            username: 'chris',
            fullName: 'Chris P Bacon',
            location: 'Wellington',
            image: 'ava-08.png',
          },
        ],
      })
    const { ...screen } = renderRoute('/profiles')
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/loading all profiles.../i)
    )

    const paige = screen.getByText(/paige/i)
    // const paige = screen.getByRole('link')

    expect(paige).toBeVisible()
    expect(scope.isDone()).toBe(true)
  })
})
