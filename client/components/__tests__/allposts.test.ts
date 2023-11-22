//@vitest-environment jsdom

import { describe, it, expect } from 'vitest'
import {
  screen,
  render,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react'
import { renderRoute } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Link } from 'react-router-dom'
import nock from 'nock'

import PostFeed from '../PostFeed'
import { post } from 'superagent'

describe('<PostFeed/>', () => {
  it('should render a loading indicator', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/posts')
      .reply(200, [
        {
          id: 1,
          user_id: 1,
          body: 'I found this really interesting book, you should check it out',
          image:
            'https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg',
          created_at: new Date(Date.now()),
        },
        {
          id: 2,
          user_id: 2,
          body: 'I found this really cool Italian place, they have the best food',
          image:
            'https://img.freepik.com/free-photo/fettuccine-with-tomato-sauce-minced-meat-garnished-with-grated-parmesan_141793-1778.jpg',
          created_at: new Date(Date.now()),
        },
      ])
    renderRoute('/')
    const loading = await waitFor(() => screen.getByText(/loading/i))
    expect(loading).toBeVisible()
    expect(scope.isDone()).toBe(true)
  })
  it('should render some posts', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/posts')
      .reply(200, [
        {
          id: 1,
          user_id: 1,
          body: 'I found this really interesting book, you should check it out',
          image:
            'https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg',
          created_at: new Date(Date.now()),
        },
        {
          id: 2,
          user_id: 2,
          body: 'I found this really cool Italian place, they have the best food',
          image:
            'https://img.freepik.com/free-photo/fettuccine-with-tomato-sauce-minced-meat-garnished-with-grated-parmesan_141793-1778.jpg',
          created_at: new Date(Date.now()),
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
      "1Date: 22/11/2023I found this really interesting book, you should check it out",
      "2Date: 22/11/2023I found this really cool Italian place, they have the best food",
    ]
    `)
    expect(scope.isDone()).toBe(true)
  })
  it('should show an error message when there is a error', async () => {
    const scope = nock('http://localhost').get('/api/v1/posts').reply(500)
    renderRoute('/')
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
    // console.log(document.body.innerHTML)
    const error = screen.getByText(/error/i)
    expect(error).toBeVisible()
    expect(scope.isDone()).toBe(true)
  })
})
