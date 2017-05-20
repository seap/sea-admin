import { push } from 'react-router-redux'

export { sendMessage, confirmMessage } from '../../common/redux/actions'
export { 
  fetchOrganization,
  createOrganization, 
  updateOrganization,
  updateOrganizationStatus,
  deleteOrganization,
  openOrganizationEditor,
  closeOrganizationEditor 
} from './organization'
export { 
  fetchDepartment, 
  createDepartment, 
  updateDepartment, 
  deleteDepartment, 
  openDepartmentEditor,
  closeDepartmentEditor 
} from './department'

export function menuSwitch(key) {
  return dispatch => dispatch(push(`/home/${key}`))
}

