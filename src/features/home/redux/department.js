import Immutable from 'seamless-immutable'
import fetch from 'common/fetch'
import {
  DEPARTMENT_LIST_REQUEST,
  DEPARTMENT_LIST_SUCCESS,
  DEPARTMENT_LIST_FAILURE,
  DEPARTMENT_CREATE_REQUEST,
  DEPARTMENT_CREATE_SUCCESS,
  DEPARTMENT_CREATE_FAILURE,
  DEPARTMENT_UPDATE_REQUEST,
  DEPARTMENT_UPDATE_SUCCESS,
  DEPARTMENT_UPDATE_FAILURE,
  DEPARTMENT_DELETE_REQUEST,
  DEPARTMENT_DELETE_SUCCESS,
  DEPARTMENT_DELETE_FAILURE,
  DEPARTMENT_STATUS_REQUEST,
  DEPARTMENT_STATUS_SUCCESS,
  DEPARTMENT_STATUS_FAILURE,
  DEPARTMENT_EDITOR_OPEN,
  DEPARTMENT_EDITOR_CLOSE  
} from './actionTypes'
import {
  API_DEPARTMEMT
} from 'constants/api'

// 获取部门列表
export function fetchDepartment() {
  return {
    types: [DEPARTMENT_LIST_SUCCESS, DEPARTMENT_LIST_REQUEST, DEPARTMENT_LIST_FAILURE],
    callAPI: () => fetch(`${API_DEPARTMEMT}`)
  }
}

// 新增部门
export function createDepartment(doc) {
  console.log('doc: ', doc)
  return {
    types: [DEPARTMENT_CREATE_SUCCESS, DEPARTMENT_CREATE_REQUEST, DEPARTMENT_CREATE_FAILURE],
    messages: ['', '创建成功!'],
    callAPI: () => fetch(`${API_DEPARTMEMT}`, {
      method: 'POST',
      body: JSON.stringify(doc)
    })
  }
}

// 插入子部门
export function insertChildDepartment(doc, parentCode) {
  console.log('doc: ', doc)
  return {
    types: [DEPARTMENT_CREATE_SUCCESS, DEPARTMENT_CREATE_REQUEST, DEPARTMENT_CREATE_FAILURE],
    messages: ['', '插入成功!'],
    callAPI: () => fetch(`${API_DEPARTMEMT}/${parentCode}`, {
      method: 'POST',
      body: JSON.stringify(doc)
    })
  }
}

export function updateDepartment(doc) {
  return {
    types: [DEPARTMENT_UPDATE_SUCCESS, DEPARTMENT_UPDATE_REQUEST, DEPARTMENT_UPDATE_FAILURE],
    callAPI: () => fetch(`${API_DEPARTMEMT}/${doc.id}`, {
      method: 'PUT',
      body: JSON.stringify(doc)
    })
  }
}

// 修改部门状态
export function updateDepartmentStatus(id, status) {
  return {
    types: [DEPARTMENT_STATUS_SUCCESS, DEPARTMENT_STATUS_REQUEST, DEPARTMENT_STATUS_FAILURE],
    messages: ['状态设置失败', '状态设置成功!'],
    callAPI: () => fetch(`${API_DEPARTMEMT}/${id}/${status}`, {
      method: 'PUT'
    })
  }
}

// 删除部门
export function deleteDepartment(id) {
  console.log()
  return {
    types: [DEPARTMENT_DELETE_SUCCESS, DEPARTMENT_DELETE_REQUEST, DEPARTMENT_DELETE_FAILURE],
    messages: ['', '删除成功!'],
    callAPI: () => fetch(`${API_DEPARTMEMT}/${id}`, {
      method: 'DELETE'
    })
  }
}

export function openDepartmentEditor() {
  return {
    type: DEPARTMENT_EDITOR_OPEN
  }
}

export function closeDepartmentEditor() {
  return {
    type: DEPARTMENT_EDITOR_CLOSE
  }
}

export function reducer(state, action) {
  const { type, payload } = action
  switch (type) {
    // 部门列表
    case DEPARTMENT_LIST_REQUEST:
      return Immutable.setIn(state, ['department', 'isListFetching'], true)
    case DEPARTMENT_LIST_SUCCESS: {
      const temp = Immutable.setIn(state, ['department', 'isListFetching'], false)
      return Immutable.setIn(temp, ['department', 'list'], payload)
    }
    case DEPARTMENT_LIST_FAILURE:
      return Immutable.setIn(state, ['department', 'isListFetching'], false)

    // 打开编辑窗口
    case DEPARTMENT_EDITOR_OPEN:
      return Immutable.setIn(state, ['department', 'isEditing'], true)
    case DEPARTMENT_EDITOR_CLOSE:
      return Immutable.setIn(state, ['department', 'isEditing'], false)
  
    // 创建或编辑接口请求
    case DEPARTMENT_UPDATE_REQUEST:
    case DEPARTMENT_CREATE_REQUEST:
      return Immutable.setIn(state, ['department', 'isDetailFetching'], true)

    case DEPARTMENT_UPDATE_FAILURE:
    case DEPARTMENT_CREATE_FAILURE:
      return Immutable.setIn(state, ['department', 'isDetailFetching'], false)

    case DEPARTMENT_CREATE_SUCCESS: {
      return Immutable.update(state, 'department', department => {
        department = Immutable.merge(department, { isDetailFetching: false, isEditing: false })
        department = Immutable.updateIn(department, ['list'], list =>
          list.concat([payload])
        )
        return department
      })
    }

    case DEPARTMENT_STATUS_SUCCESS:
    case DEPARTMENT_UPDATE_SUCCESS: {
      return Immutable.update(state, 'department', department => {
        department = Immutable.merge(department, { isDetailFetching: false, isEditing: false })
        department = Immutable.updateIn(department, ['list'], list => {
          return Immutable.flatMap(list, data => {
            if (data.id === payload.id) {
              return Immutable.merge(data, payload)
            } else {
              return data
            }
          })
        })
        return department
      })
    }

    case DEPARTMENT_DELETE_SUCCESS: {
      return Immutable.updateIn(state, ['department', 'list'], list => {
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
