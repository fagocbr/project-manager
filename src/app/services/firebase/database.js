import { initializeApp } from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyDvHkjSCnPA0D748Ozrzn9JSzPUcX3n0bY',
  authDomain: 'project-manager-deec0.firebaseapp.com',
  databaseURL: 'https://project-manager-deec0.firebaseio.com',
  projectId: 'project-manager-deec0',
  storageBucket: '',
  messagingSenderId: '670637881898'
}

/**
 * @type {Object}
 */
const app = initializeApp(config)

/**
 * @type {Object}
 */
export const database = app.firestore()

/**
 * @param {Function} callback
 * @return {*}
 */
export const transaction = callback => database.runTransaction(transaction => callback(transaction))
