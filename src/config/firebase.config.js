import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const {
  REACT_APP_FB_KEY,
  REACT_APP_FB_AD,
  REACT_APP_FB_PID,
  REACT_APP_FB_SB,
  REACT_APP_FB_SID,
  REACT_APP_FB_AID,
} = process.env

const firebaseConfig = {
  apiKey: REACT_APP_FB_KEY,
  authDomain: REACT_APP_FB_AD,
  projectId: REACT_APP_FB_PID,
  storageBucket: REACT_APP_FB_SB,
  messagingSenderId: REACT_APP_FB_SID,
  appId: REACT_APP_FB_AID,
}

firebase.initializeApp(firebaseConfig)

export const createUserProfileDocument = async (userAuth) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        type: 'read',
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef
}

export const createGameDocument = async (data) => {
  if (!data) return

  const gameRef = firestore.doc(`game/${data.id}`)
  const snapShot = await gameRef.get()

  if (!snapShot.exists) {
    const { name, rating, cover, platforms } = data
    try {
      await gameRef.set({
        name,
        rating,
        cover,
        platforms,
      })
    } catch (error) {
      console.log('error creating game', error.message)
    }
  }

  return gameRef

  /* firestore
    .collection('game')
    .doc(data.id)
    .set({ name: data.name })
    .then(() => {
      console.log('success')
      return true
    })
    .catch((error) => {
      console.error('Error writing document: ', error)
    }) */
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
