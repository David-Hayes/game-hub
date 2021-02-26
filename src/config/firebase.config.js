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

export const createGameDocument = async (userID, data) => {
  if (!data) return

  const gameRef = firestore.doc(`users/${userID}/games/${data.id}`)
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
}

export const getAllGames = async (userID, statAfter = '') => {
  const gamesData = []
  const gamesRef = await firestore
    .collection('users')
    .doc(`${userID}`)
    .collection('games')
    .orderBy('name')
    .startAfter(statAfter)
    .limit(50)
    .get()
    .then((snapshot) => {
      snapshot.docs.map((doc) => {
        gamesData.push({ id: doc.id, ...doc.data() })
      })
    })
  return gamesData
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
