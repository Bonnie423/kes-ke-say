import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addUser } from '../apis/users'
import { ChangeEvent, FormEvent, useState } from 'react'
import { User, UserForm } from '../../models/user'

const initialForm = {
  email: '',
  password: '',
  username: '',
  picture: '',
}

function SignUp() {
  const [form, setForm] = useState<UserForm>(initialForm)
  const [picture, setPicture] = useState<string>('')

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
    console.log(picture)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    addUserMutation.mutate(form)
  }

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
        />

        <select name="picture" onChange={handleChange}>
          <option value="">Please select an avatar</option>
          <option value="https://japan-completionist.devacademy.nz/image/JCLogo.png">
            Pic 1
          </option>
          <option value="/images/avatars/ava-02.png">ava-02.png</option>
          <option value="/images/avatars/ava-03.png">ava-03.png</option>
          <option value="/images/avatars/ava-04.png">ava-04.png</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      <img
        style={{ width: '100px', height: 'auto' }}
        src={`${picture}`}
        alt="avatar"
      />
    </>
  )
}

export default SignUp
