import Immutable from 'seamless-immutable'
import fetch from 'common/fetch'
import {
  ROLE_LIST_REQUEST,
  ROLE_LIST_SUCCESS,
  ROLE_LIST_FAILURE,
  ROLE_CREATE_REQUEST,
  ROLE_CREATE_SUCCESS,
  ROLE_CREATE_FAILURE,
  ROLE_UPDATE_REQUEST,
  ROLE_UPDATE_SUCCESS,
  ROLE_UPDATE_FAILURE,
  ROLE_DELETE_REQUEST,
  ROLE_DELETE_SUCCESS,
  ROLE_DELETE_FAILURE,
  ROLE_STATUS_REQUEST,
  ROLE_STATUS_SUCCESS,
  ROLE_STATUS_FAILURE,
  ROLE_EDITOR_OPEN,
  ROLE_EDITOR_CLOSE  
} from './actionTypes'
import {
  API_ROLE
} from 'constants/api'

// 获取角色列表
export function fetchRole() {
  return {
    types: [ROLE_LIST_SUCCESS, ROLE_LIST_REQUEST, ROLE_LIST_FAILURE],
    callAPI: () => fetch(`${API_ROLE}`)
  }
}

// 新增角色
export function createRole(doc) {
  console.log('doc: ', doc)
  return {
    types: [ROLE_CREATE_SUCCESS, ROLE_CREATE_REQUEST, ROLE_CREATE_FAILURE],
    messages: ['', '创建成功!'],
    callAPI: () => fetch(`${API_ROLE}`, {
      method: 'POST',
      body: JSON.stringify(doc)
    })
  }
}

// 修改角色
export function updateRole(doc) {
  return {
    types: [ROLE_UPDATE_SUCCESS, ROLE_UPDATE_REQUEST, ROLE_UPDATE_FAILURE],
    callAPI: () => fetch(`${API_ROLE}/${doc.id}`, {
      method: 'PUT',
      body: JSON.stringify(doc)
    })
  }
}

// 修改角色状态
export function updateRoleStatus(id, status) {
  return {
    types: [ROLE_STATUS_SUCCESS, ROLE_STATUS_REQUEST, ROLE_STATUS_FAILURE],
    messages: ['状态设置失败', '状态设置成功!'],
    callAPI: () => fetch(`${API_ROLE}/${id}/${status}`, {
      method: 'PUT'
    })
  }
}

// 删除角色
export function deleteRole(id) {
  console.log()
  return {
    types: [ROLE_DELETE_SUCCESS, ROLE_DELETE_REQUEST, ROLE_DELETE_FAILURE],
    messages: ['', '删除成功!'],
    callAPI: () => fetch(`${API_ROLE}/${id}`, {
      method: 'DELETE'
    })
  }
}

export function openRoleEditor() {
  return {
    type: ROLE_EDITOR_OPEN
  }
}

export function closeRoleEditor() {
  return {
    type: ROLE_EDITOR_CLOSE
  }
}

export function reducer(state, action) {
  const { type, payload } = action
  switch (type) {
    // 角色列表
    case ROLE_LIST_REQUEST:
      return Immutable.setIn(state, ['role', 'isListFetching'], true)
    case ROLE_LIST_SUCCESS: {
      const temp = Immutable.setIn(state, ['role', 'isListFetching'], false)
      return Immutable.setIn(temp, ['role', 'list'], payload)
    }
    case ROLE_LIST_FAILURE:
      return Immutable.setIn(state, ['role', 'isListFetching'], false)

    // 打开编辑窗口
    case ROLE_EDITOR_OPEN:
      return Immutable.setIn(state, ['role', 'isEditing'], true)
    case ROLE_EDITOR_CLOSE:
      return Immutable.setIn(state, ['role', 'isEditing'], false)
  
    // 创建或编辑接口请求
    case ROLE_UPDATE_REQUEST:
    case ROLE_CREATE_REQUEST:
      return Immutable.setIn(state, ['role', 'isDetailFetching'], true)

    case ROLE_UPDATE_FAILURE:
    case ROLE_CREATE_FAILURE:
      return Immutable.setIn(state, ['role', 'isDetailFetching'], false)

    case ROLE_CREATE_SUCCESS: {
      return Immutable.update(state, 'role', role => {
        role = Immutable.merge(role, { isDetailFetching: false, isEditing: false })
        role = Immutable.updateIn(role, ['list'], list =>
          list.concat([payload])
        )
        return role
      })
    }

    case ROLE_STATUS_SUCCESS:
    case ROLE_UPDATE_SUCCESS: {
      return Immutable.update(state, 'role', role => {
        role = Immutable.merge(role, { isDetailFetching: false, isEditing: false })
        role = Immutable.updateIn(role, ['list'], list => {
          return Immutable.flatMap(list, data => {
            if (data.id === payload.id) {
              return Immutable.merge(data, payload)
            } else {
              return data
            }
          })
        })
        return role
      })
    }

    case ROLE_DELETE_SUCCESS: {
      return Immutable.updateIn(state, ['role', 'list'], list => {
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
