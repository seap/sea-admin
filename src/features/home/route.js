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

export default {
  path: '/home',
  component: Main,
  childRoutes: [
    {
      component: Main,
      isIndex: true
    },
    counter,
    staff
  ]
}
