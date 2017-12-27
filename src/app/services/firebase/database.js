import { initializeApp } from 'firebase'
import 'firebase/firestore'

/**
 * @type {Object}
 */
const app = initializeApp(process.env.FIREBASE)

/**
 * @type {Object}
 */
export const database = app.firestore()

/**
 * @param {Function} callback
 * @return {*}
 */
export const transaction = callback => database.runTransaction(transaction => callback(transaction))
