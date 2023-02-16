import { defineStore, BaseModel } from 'feathers-pinia'
import { api } from 'src/api/feathers'

// create a data model
export class User extends BaseModel {

}

const servicePath = 'users'
const useUsers = defineStore({
  idField: 'id',
  clients: {api},
  servicePath,
  Model: User
})

api.service(servicePath).hooks({})
export default useUsers;
