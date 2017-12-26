// import { $body, $meta } from 'src/bootstrap/configure/http'
// import { getDotNotation } from 'genesis/support/transform'

/**
 * @param {AppCrudGrid} $component
 * @param {AxiosResponse} response
 */
export default ($component, response) => {
  if (!response) {
    return []
  }
  if (typeof response !== 'object') {
    return []
  }
  $component.data = response
}
