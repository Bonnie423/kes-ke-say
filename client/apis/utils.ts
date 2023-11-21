export function logError(err: Error) {
  console.log(err)
  if (err.message === 'username Taken') {
    throw new Error('username already taken - please choose another')
  } else if (err.message === 'Forbidden') {
    throw new Error(
      'Only the user who added the fruit may update and delete it'
    )
  } else {
    console.error('Error consuming the API (in client/api.js):', err.message)
    throw err
  }
}
