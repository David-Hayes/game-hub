import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseCreds = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  appID: process.env.NEXT_PUBLIC_FIREBASE_APPID,
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseCreds)
}

export default firebase
