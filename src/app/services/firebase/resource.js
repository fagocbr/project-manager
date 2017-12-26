import { database } from './database'
import { clone } from 'genesis/support/utils'

/**
 * @param collection
 * @return {Resource}
 */
export const resource = (collection) => {
  return new Resource(collection)
}

/**
 * @type {Resource}
 */
class Resource {
  /**
   * @param {string} collection
   * @param {string} id
   */
  constructor (collection, id = '_id') {
    this.id = id
    this.data = []
    this.ref = database.ref(collection)
    /**
     * @param data
     */
    this.post = (data) => {
      return new Promise((resolve, reject) => {
        try {
          this.ref.push(data)
          // noinspection JSUnresolvedFunction
          this.ref.limitToLast(1).on('child_added', (snapshot) => {
            return resolve(this._key(snapshot['key'], snapshot.val()))
          })
        }
        catch (e) {
          reject(e)
        }
      })
    }
    /**
     * @param id
     * @return {Promise}
     */
    this.get = (id) => {
      return new Promise((resolve, reject) => {
        this.ref.on('value', (snapshot) => {
          let data = snapshot.val()
          if (!data) {
            data = {}
          }
          if (id && data[id]) {
            this.data = data
            return resolve(this._key(id, data, true))
          }
          data = Object.keys(data).map(key => {
            return this._key(key, data[key])
          })
          this.data = data
          return resolve(this.data)
        })
      })
    }
    /**
     * @param key
     * @param data
     */
    this.put = (key, data) => {
      return new Promise((resolve, reject) => {
        try {
          this.ref.child(key).set(data)
          resolve(data)
        }
        catch (e) {
          reject(e)
        }
      })
    }
    /**
     * @param key
     * @param data
     */
    this.patch = (key, data) => {
      this.put(key, data)
    }
    /**
     * @param key
     */
    this.delete = (key) => {
      return new Promise((resolve, reject) => {
        try {
          const data = Object.keys(this.data).reduce((accumulate, id) => {
            if (id === key) {
              accumulate = clone(this.data[key])
            }
            return accumulate
          }, {})
          this.ref.child(key).remove()
          if (this.data && this.data[key]) {
            delete this.data[key]
          }
          return resolve(data)
        }
        catch (e) {
          return reject(e)
        }
      })
    }
    /**
     * @param callback
     * @param cancel
     */
    this.subscribe = (callback, cancel) => {
      this.ref.on('child_added', (snapshot, prevKey) => {
        callback(snapshot, prevKey)
      }, cancel)

      this.ref.on('child_removed', (snapshot) => {
        callback(snapshot)
      }, cancel)

      this.ref.on('child_changed', (snapshot) => {
        callback(snapshot)
      }, cancel)

      this.ref.on('child_moved', (snapshot, prevKey) => {
        callback(snapshot, prevKey)
      }, cancel)
    }
  }

  /**
   * @param id
   * @param data
   * @param extract
   * @return {*}
   * @private
   */
  _key (id, data, extract = false) {
    if (extract) {
      data = data[id]
    }
    const reference = {}
    reference[this.id] = id
    return Object.assign({}, data, reference)
  }
}
