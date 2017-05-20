import Immutable from 'seamless-immutable'

export default Immutable({
  department: {
    isListFetching: false,
    isDetailFetching: false,
    isEditing: false,
    list: []
  },
  organization: {
    isListFetching: false,
    isDetailFetching: false,
    isEditing: false,
    list: []
  }
})