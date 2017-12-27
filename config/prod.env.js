module.exports = {
  NODE_ENV: '"production"',
  LOCALE: '"pt_BR"',
  APP: {
    NAME: '"PHPZM Quasar Boilerplate"',
    DEVICE: '"appDevice"',
    TOKEN: '"appAuth"',
    USER: '"appUser"',
    REMEMBER: '"appRemember"',
    PERMISSIONS: '"appPermission"'
  },
  API: {
    PROTOCOL: '"https"',
    DOMAIN: '"quasar.phpzm.rocks"',
    PATH: '"/api/v1"',
    PORT: '""'
  },
  FIREBASE: {
    apiKey: '"AIzaSyDvHkjSCnPA0D748Ozrzn9JSzPUcX3n0bY"',
    authDomain: '"project-manager-deec0.firebaseapp.com"',
    databaseURL: '"https://project-manager-deec0.firebaseio.com"',
    projectId: '"project-manager-deec0"',
    storageBucket: '""',
    messagingSenderId: '"670637881898"'
  },
  OAUTH: {
    FACEBOOK: '""'
  },
  ROUTES: {
    LOGIN: {
      name: "'auth.login'"
    },
    NO_ACCESS: {
      name: "'dashboard.no-access'"
    },
    HOME: {
      name: "'dashboard.home'"
    }
  },
  DEV: false
}
