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
  insertChildDepartment,
  updateDepartment, 
  updateDepartmentStatus,
  deleteDepartment, 
  openDepartmentEditor,
  closeDepartmentEditor 
} from './department'
export { 
  fetchPosition,
  createPosition, 
  updatePosition,
  updatePositionStatus,
  deletePosition,
  openPositionEditor,
  closePositionEditor 
} from './position'
export { 
  fetchRole,
  createRole, 
  updateRole,
  updateRoleStatus,
  deleteRole,
  openRoleEditor,
  closeRoleEditor 
} from './role'
export { 
  fetchStaff,
  createStaff, 
  updateStaff,
  updateStaffStatus,
  deleteStaff,
  openStaffEditor,
  closeStaffEditor 
} from './staff'
export function menuSwitch(key) {
  return dispatch => dispatch(push(`/home/${key}`))
}

