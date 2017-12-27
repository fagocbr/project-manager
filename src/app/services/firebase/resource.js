import { get } from 'lodash'
import { database, transaction } from './database'
import { promise } from 'genesis/support/utils'

/**
 * @param collection
 * @return {ResourceFirebase}
 */
export const resource = (collection) => {
  return new ResourceFirebase(collection)
}

/**
 * @param object
 * @param constructor
 * @return {boolean}
 */
const is = (object, constructor) => object.constructor.name === constructor

/**
 * @type {ResourceFirebase}
 */
class ResourceFirebase {
  /**
   * @param {string} collection
   * @param {string} id
   * @param {string} order
   * @param {string} timestamp
   */
  constructor (collection, id = '_id', order = '_key', timestamp = '_timestamp') {
    this.collection = collection
    this.id = id
    this.order = order
    this.timestamp = timestamp

    this._reset()
  }

  /**
   * @param data
   */
  post (data) {
    return promise((resolve, reject) => {
      try {
        data[this.timestamp] = new Date()

        const document = this._counter()
        const increment = transaction => transaction
          .get(document)
          .then(response => {
            const data = response.data()
            data.total++
            transaction.update(document, data)
            return data
          })
          .then(response => {
            data[this.order] = response.total
            return data
          })
          .then(response => {
            return this.ref.add(response)
          })
          .then(response => resolve(ResourceFirebase.response(this._key(response.id, data))))

        return transaction(increment)
      }
      catch (e) {
        reject(e)
      }
    })
  }

  /**
   * @param id
   * @param {Object} parameters
   * @return {Promise}
   */
  get (id, parameters) {
    const limit = get(parameters, 'limit', 25)
    const page = get(parameters, 'page', 1)

    const meta = {
      total: 1,
      limit: limit,
      page: page
    }

    const recover = ref => {
      const total = doc => {
        if (doc.id) {
          meta.total = get(doc.data(), 'total')
        }
        return promise((resolve, reject) => {
          ref
            .get()
            .then((response) => {
              let data = []
              if (!response) {
                response = {}
              }
              if (is(response, 'DocumentSnapshot')) {
                data = [this._key(response.id, response.data())]
              }
              if (is(response, 'QuerySnapshot')) {
                data = response.docs.map(doc => {
                  return this._key(doc.id, doc.data())
                })
              }
              return resolve(ResourceFirebase.response(data, meta))
            })
        })
      }
      return this._counter().get().then(total)
    }

    if (id) {
      return recover(this.ref.doc(id))
    }

    return recover(this.ref.orderBy(this.order).startAfter((page - 1) * limit).limit(limit))
  }

  /**
   * @param key
   * @param data
   */
  put (key, data) {
    return promise((resolve, reject) => {
      try {
        this.ref.doc(key).set(data)
        resolve(ResourceFirebase.response(data))
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
  patch (key, data) {
    this.put(key, data)
  }

  /**
   * @param key
   */
  delete (key) {
    return promise((resolve, reject) => {
      try {
        const remove = doc => {
          const removing = doc.data()
          this.ref
            .orderBy(this.order)
            .startAt(removing[this.order])
            .get()
            .then(response => {
              return transaction(transaction => {
                let total = 0
                if (is(response, 'QuerySnapshot')) {
                  let first = true
                  response.docs.forEach(snapshot => {
                    const data = snapshot.data()
                    const reference = this.ref.doc(snapshot.id)
                    if (first) {
                      first = false
                      return transaction.delete(reference)
                    }
                    total = data[this.order] - 1
                    data[this.order] = data[this.order] = total
                    transaction.update(reference, data)
                  })
                }

                return promise(solver => solver(transaction.update(this._counter(), {total})))
              }).then(() => resolve(ResourceFirebase.response(this._key(doc.id, removing))))
            })
        }
        return this.ref.doc(key).get().then(remove)
      }
      catch (e) {
        reject(e)
      }
    })
  }

  /**
   * @param {Function} callback (documents)
   * @param fail
   */
  subscribe (callback, fail = () => false) {
    const map = change => Object.assign({}, this._key(change.doc.id, change.doc.data()), {_type: change.type})
    const success = snapshot => callback(snapshot.docChanges.map(map))
    const error = error => fail(error)
    this.ref.onSnapshot(success, error)
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

  /**
   * @private
   */
  _reset () {
    this.ref = database.collection(this.collection)
  }

  /**
   * @private
   */
  _counter () {
    return database.collection('counters').doc(this.collection)
  }

  /**
   * @param body
   * @param meta
   * @param status
   * @return {FirebaseResponse}
   * @private
   */
  static response (body, meta = {}, status = {}) {
    return new FirebaseResponse(body, meta, status)
  }
}

/**
 * @type FirebaseResponse
 */
class FirebaseResponse {
  /**
   * @param body
   * @param meta
   * @param status
   */
  constructor (body, meta = {}, status = {}) {
    this.data = {body, meta, status}
  }
}
