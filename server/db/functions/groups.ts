// import knex from 'knex'
// import config from '../knexfile'

import db from '../connection'


export function getAllGroups() {
  return db('groups').select('*')
}