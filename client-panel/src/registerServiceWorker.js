/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  if(viteposSWJs) {
    register(viteposSWJs, {
      error(error) {
        console.error('Error during service worker registration:', error)
      }
    })
  }
}
