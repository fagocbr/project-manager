import { create as http } from 'genesis/infra/services/http'
import { create, read, update, destroy, success } from 'genesis/infra/services/http/resource'
import { loading } from 'genesis/support/message/index'

/**
 * @param {string} path
 * @param {Object} fixed
 * @return {ResourceGitlab}
 */
export const resource = (path, fixed) => {
  return new ResourceGitlab(path, fixed)
}

/**
 * @type ResourceGitlab
 */
class ResourceGitlab {
  /**
   * @param {string} path
   * @param {Object} fixed
   */
  constructor (path, fixed = {}) {
    this.path = path
    this.fixed = fixed

    this.http = http(process.env.GITLAB.URL, {'Private-Token': process.env.GITLAB.PRIVATE_KEY})

    this.post = create(path, fixed, this.http)
    this.get = read(path, fixed, this.http)
    this.put = update(path, fixed, this.http)
    this.patch = update(path, fixed, this.http)
    this.delete = destroy(path, fixed, this.http)

    this.source = (api, value, label, more = {}) => {
      return callback => this.get().then(response => success(response, value, label, more, callback))
    }

    /**
     * @param request
     * @returns {*}
     */
    const request = (request) => {
      if (!request.noLoading) {
        loading(true, 100)
      }
      return request
    }
    this.http.interceptors.request.use(request)

    /**
     * @param response
     * @returns {*}
     */
    const response = (response) => {
      loading(false)
      response.data = {
        body: response.data,
        meta: {
          total: response.headers['x-total']
        },
        status: {}
      }
      return response
    }

    /**
     * @param error
     * @returns {Promise}
     */
    const error = (error) => {
      loading(false)
      return Promise.reject(error)
    }

    this.http.interceptors.response.use(response, error)
  }
}
