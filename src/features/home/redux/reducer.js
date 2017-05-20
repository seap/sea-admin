import { reducer as organization } from './organization'
import { reducer as department } from './department'
import { reducer as position } from './position'
import { reducer as role } from './role'

import initialState from './initialState'

const reducers = [
  organization,
  department,
  position,
  role
]

export default function reducer(state = initialState, action) {
  let newState
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state
      break
  }
  return reducers.reduce((s, r) => r(s, action), newState)
}
