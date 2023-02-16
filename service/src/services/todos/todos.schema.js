// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const todosSchema = {
  $id: 'Todos',
  type: 'object',
  additionalProperties: false,
  required: ['id', 'text'],
  properties: {
    id: {
      type: 'number'
    },
    text: {
      type: 'string'
    }
  }
}
export const todosValidator = getValidator(todosSchema, dataValidator)
export const todosResolver = resolve({})

export const todosExternalResolver = resolve({})

// Schema for creating new data
export const todosDataSchema = {
  $id: 'TodosData',
  type: 'object',
  additionalProperties: false,
  required: ['text'],
  properties: {
    text: {
      type: 'string'
    }
  }
}
export const todosDataValidator = getValidator(todosDataSchema, dataValidator)
export const todosDataResolver = resolve({})

// Schema for updating existing data
export const todosPatchSchema = {
  $id: 'TodosPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...todosSchema.properties
  }
}
export const todosPatchValidator = getValidator(todosPatchSchema, dataValidator)
export const todosPatchResolver = resolve({})

// Schema for allowed query properties
export const todosQuerySchema = {
  $id: 'TodosQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(todosSchema.properties)
  }
}
export const todosQueryValidator = getValidator(todosQuerySchema, queryValidator)
export const todosQueryResolver = resolve({})
