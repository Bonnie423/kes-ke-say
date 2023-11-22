import db from '../connection'


export function getAllGroups() {
  return db('groups').select('*')
}

