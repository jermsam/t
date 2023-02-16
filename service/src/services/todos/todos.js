// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  todosDataValidator,
  todosPatchValidator,
  todosQueryValidator,
  todosResolver,
  todosExternalResolver,
  todosDataResolver,
  todosPatchResolver,
  todosQueryResolver
} from './todos.schema.js'
import { TodosService, getOptions } from './todos.class.js'
import { todosPath, todosMethods } from './todos.shared.js'

export * from './todos.class.js'
export * from './todos.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const todos = (app) => {
  // Register our service on the Feathers application
  app.use(todosPath, new TodosService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: todosMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(todosPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(todosExternalResolver), schemaHooks.resolveResult(todosResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(todosQueryValidator), schemaHooks.resolveQuery(todosQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(todosDataValidator), schemaHooks.resolveData(todosDataResolver)],
      patch: [schemaHooks.validateData(todosPatchValidator), schemaHooks.resolveData(todosPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
