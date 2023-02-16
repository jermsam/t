import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
import io from 'socket.io-client'
import {setupFeathersPinia} from "feathers-pinia";
// import { iff, discard } from 'feathers-hooks-common'

const socket = io(process.env.API_URL, { transports: ['websocket'] })

// This variable name becomes the alias for this server.
export const api = feathers()
  .configure(socketio(socket))
  .configure(auth({ storage: window.localStorage }))

export const { defineStore, BaseModel } = setupFeathersPinia({
  clients: { api },
  idField: 'id',
})
