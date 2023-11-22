import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addUser } from '../apis/users'
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

function SignUp() {
  const [form, setForm] = useState<UserForm>(initialForm)
  const [picture, setPicture] = useState<string>('')
  const [submit, setSubmit] = useState(false)

  const { loginWithRedirect } = useAuth0()
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
  const emailRegex = /^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/
  const queryClient = useQueryClient()

  const addUserMutation = useMutation({
    mutationFn: addUser,
    onSuccess: (newUser) => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

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
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center"
      >
        {' '}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          className="m-4 border-solid border-2 border-black p-2 px-5 w-1/3"
        />
        {emailRegex.test(form.email) ? (
          <p>Valid Email</p>
        ) : (
          <p>Invalid Email address</p>
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
        {passwordRegex.test(form.password) ? (
          <p>Good Password</p>
        ) : (
          <p>
            Password must be at least 8 characters long and contain at least one
            letter, one number, and one special character
          </p>
        )}
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          className="m-4 border-solid border-2 border-black p-2 px-5 w-1/3"
        />
        <label htmlFor="fullname">Full Name</label>
        <input
          id="fullname"
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
          placeholder="Location"
          name="location"
          onChange={handleChange}
          className="m-4 border-solid border-2 border-black p-2 px-5 w-1/3"
        />
        <label htmlFor="avatar">Avatar</label>
        <select
          id="avatar"
          name="picture"
          onChange={handleChange}
          className="m-4 border-solid border-2 border-black p-2 px-5 w-1/3"
        >
          <option value="">Please select an avatar</option>
          <option value="https://japan-completionist.devacademy.nz/image/JCLogo.png">
            Camille
          </option>
          <option value="/images/avatars/ava-02.png">Ambre</option>
          <option value="/images/avatars/ava-03.png">Gabriel</option>
          <option value="/images/avatars/ava-04.png">Louis</option>
          <option value="/images/avatars/ava-05.png">Raphael</option>
          <option value="/images/avatars/ava-06.png">Mia</option>
          <option value="/images/avatars/ava-07.png">Romy</option>
          <option value="/images/avatars/ava-08.png">Gerard</option>
          <option value="/images/avatars/ava-09.png">Marie</option>
          <option value="/images/avatars/ava-10.png">Jules</option>
          <option value="/images/avatars/ava-11.png">Marion</option>
          <option value="/images/avatars/ava-12.png">Antoinette</option>
          <option value="/images/avatars/ava-13.png">Blanche</option>
          <option value="/images/avatars/ava-14.png">Jatin</option>
          <option value="/images/avatars/ava-15.png">Aimee</option>
          <option value="/images/avatars/ava-16.png">Claude</option>
          <option value="/images/avatars/ava-17.png">Pierre</option>
          <option value="/images/avatars/ava-18.png">Jean</option>
        </select>
        {form.picture && (
          <img
            style={{ width: '150px', height: 'auto' }}
            src={`${picture}`}
            alt="avatar"
            className="mx-auto mt-12"
          />
        )}
        {passwordRegex.test(form.password) && emailRegex.test(form.email) ? (
          <button type="submit" className="btn-blue mt-12 mb-12">
            Submit
          </button>
        ) : (
          <p>Invalid Password and/or Email address</p>
        )}
      </form>
      {submit && (
        <>
          <h3 className="text-center">Thank you for signing up!</h3>
          <button
            className="btn-blue mt-12 mb-12"
            onClick={() => loginWithRedirect()}
          >
            Login
          </button>
        </>
      )}
    </>
  )
}

export default SignUp
