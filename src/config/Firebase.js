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

export const createGameDocument = async (userID, data) => {
  if (!data) return

  const gameRef = firestore.doc(
    `users${REACT_APP_FB_DBSLUG}/${userID}/games/${data.id}`
  )
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

// search user for played ids
export const getGameRating = async (user, gameIds) => {
  if (!user || !gameIds) return
  const gameIdList = Array.isArray(gameIds) ? gameIds : [gameIds.toString()]
  const gameData = {}
  await firestore
    .collection(`users${REACT_APP_FB_DBSLUG}`)
    .doc(`${user}`)
    .collection('games')
    .where(firebase.firestore.FieldPath.documentId(), 'in', gameIdList)
    .get()
    .then((snapshot) => {
      snapshot.docs.map((doc) => {
        gameData[doc.id] = doc.data().rating
        return true
      })
    })
  return gameData
}

// get all games
export const getAllGames = async (user, statAfter = '') => {
  if (!user) return
  const gamesData = []
  await firestore
    .collection(`users${REACT_APP_FB_DBSLUG}`)
    .doc(`${user}`)
    .collection('games')
    .orderBy('name')
    .startAfter(statAfter)
    .limit(100)
    .get()
    .then((snapshot) => {
      snapshot.docs.map((doc) => {
        gamesData.push({ id: doc.id, ...doc.data() })
        return true
      })
    })
  return gamesData
}
