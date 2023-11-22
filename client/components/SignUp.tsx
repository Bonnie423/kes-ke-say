import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addUser, getAllUsers } from '../apis/users'
import { ChangeEvent, FormEvent, useState } from 'react'
import { User, UserForm } from '../../models/user'
import { useAuth0 } from '@auth0/auth0-react'

const initialForm = {
  email: '',
  password: '',
  username: '',
  picture: '',
  fullname: '',
  location: '',
}

let currentForm: UserForm
function SignUp() {
  const [form, setForm] = useState<UserForm>(initialForm)
  const [picture, setPicture] = useState<string>('')
  const [submit, setSubmit] = useState(false)

  const queryClient = useQueryClient()

  const addUserMutation = useMutation({
    mutationFn: addUser,
    onSuccess: (newUser) => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  const { loginWithRedirect } = useAuth0()
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
  const emailRegex = /^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/

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

  function handleChange(
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) {
    const { name, value } = event.target
    const newForm = { ...form, [name]: value }
    setForm(newForm)
    setPicture(newForm.picture)
    console.log(form.password)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    currentForm = { ...form }
    addUserMutation.mutate(form)
    setSubmit(true)
  }

  return (
    <>
      <img
        src="/images/croissant.svg"
        alt="Yummy Croissant"
        className="w-24 h-auto mx-auto mt-20"
      />
      <h1 className="mx-auto mt-12">Sign Up</h1>
      {!allProfiles.some((user) => user.username === currentForm?.username) ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center"
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            className="m-4 border-solid border-2 border-black p-2 px-5 w-1/3"
          />
          {emailRegex.test(form.email) || form.email === '' ? null : (
            <p className="bg-red-100 border-rose-600 border-4 rounded-lg py-2 px-4 mb-4">
              Invalid Email address
            </p>
          )}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            className="m-4 border-solid border-2 border-black p-2 px-5 w-1/3"
          />
          {passwordRegex.test(form.password) || form.password === '' ? null : (
            <p className="bg-red-100 border-rose-600 border-4 rounded-lg py-2 px-4 mb-4">
              Password must be at least 8 characters long and contain at least
              one letter, one number, and one special character
            </p>
          )}
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            required
            placeholder="Username"
            name="username"
            onChange={handleChange}
            className="m-4 border-solid border-2 border-black p-2 px-5 w-1/3"
          />
          {allProfiles.some((user) => user.username === form.username) ? (
            <p className="bg-red-100 border-rose-600 border-4 rounded-lg py-2 px-4 mb-4">
              Username already exists
            </p>
          ) : null}
          <label htmlFor="fullname">Full Name</label>
          <input
            id="fullname"
            required
            type="text"
            placeholder="Full Name"
            name="fullname"
            onChange={handleChange}
            className="m-4 border-solid border-2 border-black p-2 px-5 w-1/3"
          />
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            required
            placeholder="Location"
            name="location"
            onChange={handleChange}
            className="m-4 border-solid border-2 border-black p-2 px-5 w-1/3"
          />
          <label htmlFor="avatar">Avatar</label>
          <select
            id="avatar"
            required
            name="picture"
            onChange={handleChange}
            className="m-4 border-solid border-2 border-black p-2 px-5 w-1/3"
          >
            <option value="">Please select an avatar</option>
            <option value="https://japan-completionist.devacademy.nz/image/JCLogo.png">
              Camille
            </option>
            <option value="ava-02.png">Ambre</option>
            <option value="ava-03.png">Gabriel</option>
            <option value="ava-04.png">Louis</option>
            <option value="ava-05.png">Raphael</option>
            <option value="ava-06.png">Mia</option>
            <option value="ava-07.png">Romy</option>
            <option value="ava-08.png">Gerard</option>
            <option value="ava-09.png">Marie</option>
            <option value="ava-10.png">Jules</option>
            <option value="ava-11.png">Marion</option>
            <option value="ava-12.png">Antoinette</option>
            <option value="ava-13.png">Blanche</option>
            <option value="ava-14.png">Jatin</option>
            <option value="ava-15.png">Aimee</option>
            <option value="ava-16.png">Claude</option>
            <option value="ava-17.png">Pierre</option>
            <option value="ava-18.png">Jean</option>
          </select>
          {form.picture && (
            <img
              style={{ width: '150px', height: 'auto' }}
              src={`/images/avatars/${picture}`}
              alt="avatar"
              className="mx-auto mt-12"
            />
          )}
          {passwordRegex.test(form.password) &&
          emailRegex.test(form.email) &&
          !allProfiles.some(
            (user) => user.username === currentForm?.username
          ) ? (
            <button type="submit" className="btn-blue mt-12 mb-12">
              Submit
            </button>
          ) : null}
        </form>
      ) : null}
      {submit &&
      allProfiles.some((user) => user.username === currentForm?.username) ? (
        <>
          <h3 className="text-center">Thank you for signing up!</h3>
          <button
            className="btn-blue mt-12 mb-12"
            onClick={() => loginWithRedirect()}
          >
            Login
          </button>
        </>
      ) : null}
    </>
  )
}

export default SignUp
