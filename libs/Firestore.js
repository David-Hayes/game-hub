import firebase from './Firebase'
const firestore = firebase.firestore()

export async function createUser(uid, data) {
  return await firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true })
}

export async function getPlayed(uid, sort = 'id') {
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
  console.log(data)
  return data
}

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

export async function createPlayed(uid, data) {
  if (!uid || !data) return
  return await firestore
    .collection('users')
    .doc(`${uid}/played/${data.id}`)
    .set({ ...data }, { merge: true })
}

export async function createWant(uid, data) {
  if (!data) return
  return await firestore
    .collection('users')
    .doc(`${uid}/want/${data.id}`)
    .set({ ...data }, { merge: true })
}
