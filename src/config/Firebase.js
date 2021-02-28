import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// config
const {
  REACT_APP_FB_KEY,
  REACT_APP_FB_AD,
  REACT_APP_FB_PID,
  REACT_APP_FB_SB,
  REACT_APP_FB_SID,
  REACT_APP_FB_AID,
  REACT_APP_FB_DBSLUG,
} = process.env

// initialize app
firebase.initializeApp({
  apiKey: REACT_APP_FB_KEY,
  authDomain: REACT_APP_FB_AD,
  projectId: REACT_APP_FB_PID,
  storageBucket: REACT_APP_FB_SB,
  messagingSenderId: REACT_APP_FB_SID,
  appId: REACT_APP_FB_AID,
})

// export auth and firestore
export const auth = firebase.auth()
export const firestore = firebase.firestore()

// export google sign in
const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

// export firebase
export default firebase

// create doc for user
export const createUserProfile = async (userAuth) => {
  if (!userAuth) return
  const userRef = firestore
    .collection(`users${REACT_APP_FB_DBSLUG}`)
    .doc(`${userAuth.uid}`)
  const snapshot = await userRef.get()
  if (!snapshot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()
    await userRef
      .set({
        displayName,
        email,
        createdAt,
        type: 'read',
      })
      .then(() => {
        return userRef
      })
      .catch((err) => {
        return false
      })
  }
  return userRef
}
