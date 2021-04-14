import firebase from './Firebase'
const firestore = firebase.firestore()

export async function createUser(uid, data) {
  return await firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true })
}
