import { initializeApp } from 'firebase'

const config = {
  apiKey: 'AIzaSyDvHkjSCnPA0D748Ozrzn9JSzPUcX3n0bY',
  authDomain: 'project-manager-deec0.firebaseapp.com',
  databaseURL: 'https://project-manager-deec0.firebaseio.com',
  projectId: 'project-manager-deec0',
  storageBucket: '',
  messagingSenderId: '670637881898'
}

const app = initializeApp(config)

// noinspection JSUnresolvedFunction
export const database = app.database()
