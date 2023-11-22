//@vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react/pure'
import nock from 'nock'

import { renderRoute } from '../../test-utils.tsx'

nock.disableNetConnect()

describe('<groups/>', () => {
  it('should render a loading indicator', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/groups')
      .reply(200, [
        { id: 1, name: 'friendChips', image: 'fries-darkgray.png' },
        { id: 2, name: 'The fast and the curious', image: 'car-darkgray.png' },
      ])

    renderRoute('/groups')

    const loading = await waitFor(() => screen.getByText(/loading/i))

    expect(loading).toBeVisible()
    expect(scope.isDone()).toBe(true)
  })
  it('should render some groups', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/groups')
      .reply(200, [
        { id: 1, name: 'friendChips', image: 'fries-darkgray.png' },
        { id: 2, name: 'The fast and the curious', image: 'car-darkgray.png' },
      ])

    renderRoute('/groups')

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))

    const list = screen.getAllByRole('list')
    const listItems = within(list[1])
      .getAllByRole('listitem')
      .map((li) => li.textContent)

    expect(listItems).toMatchInlineSnapshot(`
      [
        "The fast and the curious",
      ]
    `)
    expect(scope.isDone()).toBe(true)
  })
  it('should render an error message when things go wrong', async () => {
    const scope = nock('http://localhost').get('/api/v1/groups').reply(500)
    renderRoute('/groups')

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))

    const error = screen.getByText(
      'There was an error trying to load the groups!'
    )

    expect(error).toBeVisible()
    expect(scope.isDone()).toBe(true)
  })
})
