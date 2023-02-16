// store/auth.ts
import { defineAuthStore } from 'feathers-pinia'
import { api as feathersClient } from '../api/feathers'

export const useAuth = defineAuthStore({
  feathersClient,
})
