import { reducer as organization } from './organization'
import { reducer as department } from './department'
import initialState from './initialState'

const reducers = [
  organization,
  department
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
