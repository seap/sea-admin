import Immutable from 'seamless-immutable'
import fetch from 'common/fetch'
import {
  STAFF_LIST_REQUEST,
  STAFF_LIST_SUCCESS,
  STAFF_LIST_FAILURE,
  STAFF_CREATE_REQUEST,
  STAFF_CREATE_SUCCESS,
  STAFF_CREATE_FAILURE,
  STAFF_UPDATE_REQUEST,
  STAFF_UPDATE_SUCCESS,
  STAFF_UPDATE_FAILURE,
  STAFF_DELETE_REQUEST,
  STAFF_DELETE_SUCCESS,
  STAFF_DELETE_FAILURE,
  STAFF_STATUS_REQUEST,
  STAFF_STATUS_SUCCESS,
  STAFF_STATUS_FAILURE,
  STAFF_EDITOR_OPEN,
  STAFF_EDITOR_CLOSE  
} from './actionTypes'
import {
  API_STAFF
} from 'constants/api'

// 获取人员列表
export function fetchStaff() {
  return {
    types: [STAFF_LIST_SUCCESS, STAFF_LIST_REQUEST, STAFF_LIST_FAILURE],
    callAPI: () => fetch(`${API_STAFF}`)
  }
}

// 新增人员
export function createStaff(doc) {
  console.log('doc: ', doc)
  return {
    types: [STAFF_CREATE_SUCCESS, STAFF_CREATE_REQUEST, STAFF_CREATE_FAILURE],
    messages: ['', '创建成功!'],
    callAPI: () => fetch(`${API_STAFF}`, {
      method: 'POST',
      body: JSON.stringify(doc)
    })
  }
}

// 修改人员
export function updateStaff(doc) {
  return {
    types: [STAFF_UPDATE_SUCCESS, STAFF_UPDATE_REQUEST, STAFF_UPDATE_FAILURE],
    callAPI: () => fetch(`${API_STAFF}/${doc.id}`, {
      method: 'PUT',
      body: JSON.stringify(doc)
    })
  }
}

// 修改人员状态
export function updateStaffStatus(id, status) {
  return {
    types: [STAFF_STATUS_SUCCESS, STAFF_STATUS_REQUEST, STAFF_STATUS_FAILURE],
    messages: ['状态设置失败', '状态设置成功!'],
    callAPI: () => fetch(`${API_STAFF}/${id}/${status}`, {
      method: 'PUT'
    })
  }
}

// 删除人员
export function deleteStaff(id) {
  console.log()
  return {
    types: [STAFF_DELETE_SUCCESS, STAFF_DELETE_REQUEST, STAFF_DELETE_FAILURE],
    messages: ['', '删除成功!'],
    callAPI: () => fetch(`${API_STAFF}/${id}`, {
      method: 'DELETE'
    })
  }
}

export function openStaffEditor() {
  return {
    type: STAFF_EDITOR_OPEN
  }
}

export function closeStaffEditor() {
  return {
    type: STAFF_EDITOR_CLOSE
  }
}

export function reducer(state, action) {
  const { type, payload } = action
  switch (type) {
    // 人员列表
    case STAFF_LIST_REQUEST:
      return Immutable.setIn(state, ['staff', 'isListFetching'], true)
    case STAFF_LIST_SUCCESS: {
      const temp = Immutable.setIn(state, ['staff', 'isListFetching'], false)
      return Immutable.setIn(temp, ['staff', 'list'], payload)
    }
    case STAFF_LIST_FAILURE:
      return Immutable.setIn(state, ['staff', 'isListFetching'], false)

    // 打开编辑窗口
    case STAFF_EDITOR_OPEN:
      return Immutable.setIn(state, ['staff', 'isEditing'], true)
    case STAFF_EDITOR_CLOSE:
      return Immutable.setIn(state, ['staff', 'isEditing'], false)
  
    // 创建或编辑接口请求
    case STAFF_UPDATE_REQUEST:
    case STAFF_CREATE_REQUEST:
      return Immutable.setIn(state, ['staff', 'isDetailFetching'], true)

    case STAFF_UPDATE_FAILURE:
    case STAFF_CREATE_FAILURE:
      return Immutable.setIn(state, ['staff', 'isDetailFetching'], false)

    case STAFF_CREATE_SUCCESS: {
      return Immutable.update(state, 'staff', staff => {
        staff = Immutable.merge(staff, { isDetailFetching: false, isEditing: false })
        staff = Immutable.updateIn(staff, ['list'], list =>
          list.concat([payload])
        )
        return staff
      })
    }

    case STAFF_STATUS_SUCCESS:
    case STAFF_UPDATE_SUCCESS: {
      return Immutable.update(state, 'staff', staff => {
        staff = Immutable.merge(staff, { isDetailFetching: false, isEditing: false })
        staff = Immutable.updateIn(staff, ['list'], list => {
          return Immutable.flatMap(list, data => {
            if (data.id === payload.id) {
              return Immutable.merge(data, payload)
            } else {
              return data
            }
          })
        })
        return staff
      })
    }

    case STAFF_DELETE_SUCCESS: {
      return Immutable.updateIn(state, ['staff', 'list'], list => {
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
