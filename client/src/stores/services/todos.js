import { defineStore, BaseModel } from 'feathers-pinia'
import { api } from 'src/api/feathers'

// create a data model
export class Todo extends BaseModel {

}

const servicePath = 'todos'
const useTodos = defineStore({
  idField: 'id',
  clients: {api},
  servicePath,
  Model: Todo
})

api.service(servicePath).hooks({})
export default useTodos;


