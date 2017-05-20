import Immutable from 'seamless-immutable'
import {
  MESSAGE_SHOW,
  MESSAGE_RESET
} from './actionTypes'

export function showMessage(message = '服务异常,请稍后再试!', category = 'info', code = 9999) {
  return {
    type: MESSAGE_SHOW,
    payload: {
      code,
      message,
      category
    }
  }
}

export function resetMessage() {
  return {
    type: MESSAGE_RESET
  }
}

export function reducer(state, action) {
  switch (action.type) {
    case MESSAGE_SHOW:
      return Immutable.merge(state, action.payload)

    case MESSAGE_RESET:
      return Immutable.merge(state, { code: 0, message: '', category: '' })

    default:
      return state
  }
}
