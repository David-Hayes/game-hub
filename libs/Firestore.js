import firebase from './Firebase'
const firestore = firebase.firestore()

// creates user in firestore
export async function createUser(uid, data) {
  return await firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true })
}

// gets a list of played games
export async function getPlayed(
  uid,
  sort = 'id',
  limit = 100,
  startAfter = ''
) {
  if (!uid) return
  const data = { ratings: {}, ids: [] }
  await firestore
    .collection('users')
    .doc(uid)
    .collection('played')
    .orderBy(sort)
    .get()
    .then((snap) => {
      snap.docs.map((doc) => {
        data.ratings[doc.data().id] = doc.data().rating
        data.ids.push(doc.data().id)
      })
    })
  return data
}

// adds game to played list
export async function addPlayed(uid, data) {
  if (!uid || !data) return
  return await firestore
    .collection('users')
    .doc(`${uid}/played/${data.id}`)
    .set({ ...data }, { merge: true })
}

// fetches rating for a game (if its been played)
export async function getRating(uid, id) {
  if (!uid || !id) return
  return await firestore
    .collection('users')
    .doc(`${uid}/played/${id}`)
    .get()
    .then((snap) => {
      if (snap.exists) {
        return snap.data().rating
      } else {
        return false
      }
    })
}

// adds game to want list
export async function addWanted(uid, data) {
  if (!uid || !data) return
  return await firestore
    .collection('users')
    .doc(`${uid}/wanted/${data.id}`)
    .set({ ...data }, { merge: true })
}

export async function isWanted(uid, id) {
  if (!uid || !id) return
  return await firestore
    .collection('users')
    .doc(`${uid}/wanted/${id}`)
    .get()
    .then((snap) => {
      if (snap.exists) {
        return true
      } else {
        return false
      }
    })
}

export async function removeWanted(uid, id) {
  if (!uid || !id) return
  return await firestore
    .collection('users')
    .doc(`${uid}/wanted/${id}`)
    .get()
    .then((snap) => {
      if (snap.exists) {
        snap.ref.delete()
        return true
      }
    })
}
