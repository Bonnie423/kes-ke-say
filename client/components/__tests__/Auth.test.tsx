//@vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import {
  fireEvent,
  getByPlaceholderText,
  getByRole,
  getByText,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react/pure'
import nock from 'nock'

import { renderRoute } from '../../test-utils.tsx'
import SignUp from '../SignUp.tsx'
import { getAllUsers } from '../../apis/users.ts'


vi.mock('../../apis/users.ts')
describe('form', () => {
 it('should render the sign up form after cicked the sign in button', async()=>{
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
  renderRoute('/signup')
  await waitForElementToBeRemoved(() => screen.queryByText(/Loading/i))

  const heading = screen.getByRole('heading', {name: 'Sign Up'})
  const email = screen.getByLabelText('Email')
  const password = screen.getByLabelText('Password')
  const username = screen.getByLabelText('Username')
  expect(heading).toBeInTheDocument()
  expect(email).toBeInTheDocument()
  expect(password).toBeInTheDocument()
  expect(username).toBeInTheDocument()


  
  })
  it(' should show error message for invalid email', async () => {
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
    renderRoute('/signup')
    await waitForElementToBeRemoved(() => screen.queryByText(/Loading/i))

    const email = screen.getByLabelText('Email')

    fireEvent.change(email, { target: { value: 'pete123.com' } })
    await waitFor(() => {
      const errorMessage = screen.getByText('Invalid Email address')
      expect(errorMessage).toBeInTheDocument()
    })
  })

  it(' should show error message for invalid password', async () => {
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
    renderRoute('/signup')
    await waitForElementToBeRemoved(() => screen.queryByText(/Loading/i))

    const password = screen.getByLabelText('Password')

    fireEvent.change(password, { target: { value: '12345' } })
    await waitFor(() => {
      const errorMessage = screen.queryByText(
        /Password must be at least 8 characters long and contain at least/i
      )

      expect(errorMessage).toBeInTheDocument()
    })

    
  })

  it(' should show error message for invalid username', async () => {
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
    renderRoute('/signup')
    await waitForElementToBeRemoved(() => screen.queryByText(/Loading/i))

    const username = screen.getByLabelText('Username')

    fireEvent.change(username, { target: { value: 'paige' } })
    await waitFor(() => {
      const errorMessage = screen.queryByText(
        /Username already exists/i
      )

      expect(errorMessage).toBeInTheDocument()
    })

    
  })
})
