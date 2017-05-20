import Immutable from 'seamless-immutable'
import fetch from 'common/fetch'
import {
  ORGANIZATION_LIST_REQUEST,
  ORGANIZATION_LIST_SUCCESS,
  ORGANIZATION_LIST_FAILURE,
  ORGANIZATION_CREATE_REQUEST,
  ORGANIZATION_CREATE_SUCCESS,
  ORGANIZATION_CREATE_FAILURE,
  ORGANIZATION_UPDATE_REQUEST,
  ORGANIZATION_UPDATE_SUCCESS,
  ORGANIZATION_UPDATE_FAILURE,
  ORGANIZATION_DELETE_REQUEST,
  ORGANIZATION_DELETE_SUCCESS,
  ORGANIZATION_DELETE_FAILURE,
  ORGANIZATION_STATUS_REQUEST,
  ORGANIZATION_STATUS_SUCCESS,
  ORGANIZATION_STATUS_FAILURE,
  ORGANIZATION_EDITOR_OPEN,
  ORGANIZATION_EDITOR_CLOSE  
} from './actionTypes'
import {
  API_ORGANIZATION
} from 'constants/api'

// 获取部门列表
export function fetchOrganization() {
  return {
    types: [ORGANIZATION_LIST_SUCCESS, ORGANIZATION_LIST_REQUEST, ORGANIZATION_LIST_FAILURE],
    callAPI: () => fetch(`${API_ORGANIZATION}`)
  }
}

// 新增机构
export function createOrganization(doc) {
  console.log('doc: ', doc)
  return {
    types: [ORGANIZATION_CREATE_SUCCESS, ORGANIZATION_CREATE_REQUEST, ORGANIZATION_CREATE_FAILURE],
    messages: ['', '创建成功!'],
    callAPI: () => fetch(`${API_ORGANIZATION}`, {
      method: 'POST',
      body: JSON.stringify(doc)
    })
  }
}

// 修改机构
export function updateOrganization(doc) {
  return {
    types: [ORGANIZATION_UPDATE_SUCCESS, ORGANIZATION_UPDATE_REQUEST, ORGANIZATION_UPDATE_FAILURE],
    callAPI: () => fetch(`${API_ORGANIZATION}/${doc.id}`, {
      method: 'PUT',
      body: JSON.stringify(doc)
    })
  }
}

// 修改机构状态
export function updateOrganizationStatus(id, status) {
  return {
    types: [ORGANIZATION_STATUS_SUCCESS, ORGANIZATION_STATUS_REQUEST, ORGANIZATION_STATUS_FAILURE],
    messages: ['状态设置失败', '状态设置成功!'],
    callAPI: () => fetch(`${API_ORGANIZATION}/${id}/${status}`, {
      method: 'PUT'
    })
  }
}

// 删除部门
export function deleteOrganization(id) {
  console.log()
  return {
    types: [ORGANIZATION_DELETE_SUCCESS, ORGANIZATION_DELETE_REQUEST, ORGANIZATION_DELETE_FAILURE],
    messages: ['', '删除成功!'],
    callAPI: () => fetch(`${API_ORGANIZATION}/${id}`, {
      method: 'DELETE'
    })
  }
}

export function openOrganizationEditor() {
  return {
    type: ORGANIZATION_EDITOR_OPEN
  }
}

export function closeOrganizationEditor() {
  return {
    type: ORGANIZATION_EDITOR_CLOSE
  }
}

export function reducer(state, action) {
  const { type, payload } = action
  switch (type) {
    // 部门列表
    case ORGANIZATION_LIST_REQUEST:
      return Immutable.setIn(state, ['organization', 'isListFetching'], true)
    case ORGANIZATION_LIST_SUCCESS: {
      const temp = Immutable.setIn(state, ['organization', 'isListFetching'], false)
      return Immutable.setIn(temp, ['organization', 'list'], payload)
    }
    case ORGANIZATION_LIST_FAILURE:
      return Immutable.setIn(state, ['organization', 'isListFetching'], false)

    // 打开编辑窗口
    case ORGANIZATION_EDITOR_OPEN:
      return Immutable.setIn(state, ['organization', 'isEditing'], true)
    case ORGANIZATION_EDITOR_CLOSE:
      return Immutable.setIn(state, ['organization', 'isEditing'], false)
  
    // 创建或编辑接口请求
    case ORGANIZATION_UPDATE_REQUEST:
    case ORGANIZATION_CREATE_REQUEST:
      return Immutable.setIn(state, ['organization', 'isDetailFetching'], true)

    case ORGANIZATION_UPDATE_FAILURE:
    case ORGANIZATION_CREATE_FAILURE:
      return Immutable.setIn(state, ['organization', 'isDetailFetching'], false)

    case ORGANIZATION_CREATE_SUCCESS: {
      return Immutable.update(state, 'organization', organization => {
        organization = Immutable.merge(organization, { isDetailFetching: false, isEditing: false })
        organization = Immutable.updateIn(organization, ['list'], list =>
          list.concat([payload])
        )
        return organization
      })
    }

    case ORGANIZATION_STATUS_SUCCESS:
    case ORGANIZATION_UPDATE_SUCCESS: {
      return Immutable.update(state, 'organization', organization => {
        organization = Immutable.merge(organization, { isDetailFetching: false, isEditing: false })
        organization = Immutable.updateIn(organization, ['list'], list => {
          return Immutable.flatMap(list, data => {
            if (data.id === payload.id) {
              return Immutable.merge(data, payload)
            } else {
              return data
            }
          })
        })
        return organization
      })
    }

    case ORGANIZATION_DELETE_SUCCESS: {
      return Immutable.updateIn(state, ['organization', 'list'], list => {
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
