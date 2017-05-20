import Main from './Main'

const counter = {
  path: 'counter',
  name: 'Counter',
  getComponent(location, cb) {
    require.ensure([], require => cb(null, require('./Counter').default), 'counter')
  }
}

const staff = {
  path: 'staff',
  getComponent(location, cb) {
    require.ensure([], require => cb(null, require('./Staff').default), 'staff')
  }
}

const department = {
  path: 'department',
  getComponent(location, cb) {
    require.ensure([], require => cb(null, require('./Department').default), 'department')
  }
}

const organization = {
  path: 'organization',
  getComponent(location, cb) {
    require.ensure([], require => cb(null, require('./Organization').default), 'organization')
  }
}

export default {
  path: '/home',
  component: Main,
  childRoutes: [
    {
      component: department,
      isIndex: true
    },
    counter,
    staff,
    department,
    organization
  ]
}
