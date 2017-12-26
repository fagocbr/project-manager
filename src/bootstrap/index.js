const VueFire = require('vuefire')

// settings of vendors
import 'src/vendor/quasar'
import 'src/vendor/froala'
import 'src/vendor/fullcalendar'
import { install } from 'src/vendor/phpzm'

// events to boot
import { beforeUnload, errorHandler } from 'src/bootstrap/events'

/**
 * @param Vue
 * @returns {Object}
 */
const bootstrap = (Vue) => {
  Vue.config.errorHandler = errorHandler

  // explicit installation required in module environments
  Vue.use(VueFire)

  return install(Vue, beforeUnload)
}

export default bootstrap
