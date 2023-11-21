import knex from 'knex'
import config from '../knexfile'
import { Group } from '../../../models/groups.ts'
import connection from '../connection.ts'

const db = knex(config.development)

export function getAllGroups() {
  return db('groups').select('*')
}