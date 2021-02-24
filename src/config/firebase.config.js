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

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
