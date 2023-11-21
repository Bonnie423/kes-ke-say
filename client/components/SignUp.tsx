import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addUser } from '../apis/users'
import { ChangeEvent, FormEvent, useState } from 'react'
import { User } from '../../models/user'

const initialForm = {
  auth0Id: '',
  id: 0,
  username: '',
  fullName: '',
  location: '',
  image: 'ava-01.png',
}

function SignUp() {
  const [form, setForm] = useState<User>(initialForm)

  const queryClient = useQueryClient()

  const addUserMutation = useMutation({
    mutationFn: addUser,
    onSuccess: (newUser) => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  function handleChange(
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>
  ) {
    const { name, value } = event.target
    const newForm = { ...form, [name]: value }
    setForm(newForm)
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
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Full Name"
          name="fullName"
          onChange={handleChange}
        />
        <input
          type="location"
          placeholder="Location"
          name="location"
          onChange={handleChange}
        />
        <select name="image" onChange={handleChange}>
          <option value="ava-01.png">
            <img src="ava-01.png" alt="Brown hair black skin" />
            ava-01.png
          </option>
          <option value="ava-02.png">ava-02.png</option>
          <option value="ava-03.png">ava-03.png</option>
          <option value="ava-04.png">ava-04.png</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default SignUp
