// import { $body } from 'src/bootstrap/configure/http'
// import { getDotNotation } from 'genesis/support/transform'

/**
 * @param {AppCrudForm} $component
 * @param {AxiosResponse} response
 * @param {Function} callback
 */
export default ($component, response, callback = null) => {
  if (!response) {
    return {}
  }
  if (typeof response !== 'object') {
    return {}
  }
  $component.data = response

  if (typeof callback === 'function') {
    callback()
  }
}
