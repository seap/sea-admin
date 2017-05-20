import Immutable from 'seamless-immutable'
import fetch from 'common/fetch'
import {
  POSITION_LIST_REQUEST,
  POSITION_LIST_SUCCESS,
  POSITION_LIST_FAILURE,
  POSITION_CREATE_REQUEST,
  POSITION_CREATE_SUCCESS,
  POSITION_CREATE_FAILURE,
  POSITION_UPDATE_REQUEST,
  POSITION_UPDATE_SUCCESS,
  POSITION_UPDATE_FAILURE,
  POSITION_DELETE_REQUEST,
  POSITION_DELETE_SUCCESS,
  POSITION_DELETE_FAILURE,
  POSITION_STATUS_REQUEST,
  POSITION_STATUS_SUCCESS,
  POSITION_STATUS_FAILURE,
  POSITION_EDITOR_OPEN,
  POSITION_EDITOR_CLOSE  
} from './actionTypes'
import {
  API_POSITION
} from 'constants/api'

// 获取职务列表
export function fetchPosition() {
  return {
    types: [POSITION_LIST_SUCCESS, POSITION_LIST_REQUEST, POSITION_LIST_FAILURE],
    callAPI: () => fetch(`${API_POSITION}`)
  }
}

// 新增职务
export function createPosition(doc) {
  console.log('doc: ', doc)
  return {
    types: [POSITION_CREATE_SUCCESS, POSITION_CREATE_REQUEST, POSITION_CREATE_FAILURE],
    messages: ['', '创建成功!'],
    callAPI: () => fetch(`${API_POSITION}`, {
      method: 'POST',
      body: JSON.stringify(doc)
    })
  }
}

// 修改职务
export function updatePosition(doc) {
  return {
    types: [POSITION_UPDATE_SUCCESS, POSITION_UPDATE_REQUEST, POSITION_UPDATE_FAILURE],
    callAPI: () => fetch(`${API_POSITION}/${doc.id}`, {
      method: 'PUT',
      body: JSON.stringify(doc)
    })
  }
}

// 修改职务状态
export function updatePositionStatus(id, status) {
  return {
    types: [POSITION_STATUS_SUCCESS, POSITION_STATUS_REQUEST, POSITION_STATUS_FAILURE],
    messages: ['状态设置失败', '状态设置成功!'],
    callAPI: () => fetch(`${API_POSITION}/${id}/${status}`, {
      method: 'PUT'
    })
  }
}

// 删除职务
export function deletePosition(id) {
  console.log()
  return {
    types: [POSITION_DELETE_SUCCESS, POSITION_DELETE_REQUEST, POSITION_DELETE_FAILURE],
    messages: ['', '删除成功!'],
    callAPI: () => fetch(`${API_POSITION}/${id}`, {
      method: 'DELETE'
    })
  }
}

export function openPositionEditor() {
  return {
    type: POSITION_EDITOR_OPEN
  }
}

export function closePositionEditor() {
  return {
    type: POSITION_EDITOR_CLOSE
  }
}

export function reducer(state, action) {
  const { type, payload } = action
  switch (type) {
    // 职务列表
    case POSITION_LIST_REQUEST:
      return Immutable.setIn(state, ['position', 'isListFetching'], true)
    case POSITION_LIST_SUCCESS: {
      const temp = Immutable.setIn(state, ['position', 'isListFetching'], false)
      return Immutable.setIn(temp, ['position', 'list'], payload)
    }
    case POSITION_LIST_FAILURE:
      return Immutable.setIn(state, ['position', 'isListFetching'], false)

    // 打开编辑窗口
    case POSITION_EDITOR_OPEN:
      return Immutable.setIn(state, ['position', 'isEditing'], true)
    case POSITION_EDITOR_CLOSE:
      return Immutable.setIn(state, ['position', 'isEditing'], false)
  
    // 创建或编辑接口请求
    case POSITION_UPDATE_REQUEST:
    case POSITION_CREATE_REQUEST:
      return Immutable.setIn(state, ['position', 'isDetailFetching'], true)

    case POSITION_UPDATE_FAILURE:
    case POSITION_CREATE_FAILURE:
      return Immutable.setIn(state, ['position', 'isDetailFetching'], false)

    case POSITION_CREATE_SUCCESS: {
      return Immutable.update(state, 'position', position => {
        position = Immutable.merge(position, { isDetailFetching: false, isEditing: false })
        position = Immutable.updateIn(position, ['list'], list =>
          list.concat([payload])
        )
        return position
      })
    }

    case POSITION_STATUS_SUCCESS:
    case POSITION_UPDATE_SUCCESS: {
      return Immutable.update(state, 'position', position => {
        position = Immutable.merge(position, { isDetailFetching: false, isEditing: false })
        position = Immutable.updateIn(position, ['list'], list => {
          return Immutable.flatMap(list, data => {
            if (data.id === payload.id) {
              return Immutable.merge(data, payload)
            } else {
              return data
            }
          })
        })
        return position
      })
    }

    case POSITION_DELETE_SUCCESS: {
      return Immutable.updateIn(state, ['position', 'list'], list => {
        return Immutable.flatMap(list, data => {
          if (data.id === payload.id) {
            return []
          } else {
            return data
          }
        })
      })
    }

    default:
      return state
  }
}
