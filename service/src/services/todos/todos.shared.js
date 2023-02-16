export const todosPath = 'todos'

export const todosMethods = ['find', 'get', 'create', 'patch', 'remove']

export const todosClient = (client) => {
  const connection = client.get('connection')

  client.use(todosPath, connection.service(todosPath), {
    methods: todosMethods
  })
}
