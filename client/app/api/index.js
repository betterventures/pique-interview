import firebase from 'firebase'

firebase.initializeApp({
  apiKey: 'AIzaSyBlwBDc0fn1CkYnw966lgS-dT0GunHyXPo',
  authDomain: 'get-pique.firebaseapp.com',
  databaseURL: 'https://get-pique.firebaseio.com',
  storageBucket: 'get-pique.appspot.com',
  messagingSenderId: '297637710221'
})

const DEFAULT_NAME = 'Charles Barkley'
const DEFAULT_PHOTO = 'https://firebasestorage.googleapis.com/v0/b/get-pique.appspot.com/o/test%2F911-av.png?alt=media&token=f97e53b0-90cd-4c01-9a83-1958de6bfd79'

export const firebaseAuth = firebase.auth
export const firebaseDatabase = firebase.database

export const initApp = observer => {
  return firebase.auth()
    .onAuthStateChanged({
      next: user => !!user
          ? authStatePopulated(observer, user)
          : observer.next(false),
      error: observer.error
    })
}

function authStatePopulated(observer, user) {
  fetchUser(user).then(x => observer.next(x))
}

export const register = data => {
  firebase.database().ref().child('signups').push(data)
}

export const signUp = (email, password) => {
  return firebase.auth()
    .createUserWithEmailAndPassword(email, password)
}

export const signIn = (email, password) => {
  return firebase.auth()
    .signInWithEmailAndPassword(email, password)
}

function filterProviderData(user) {
  return {...user.providerData[0], uid: user.uid}
}

function fetchUser(user) {
  const userProps = filterProviderData(user)
  const uid = firebase.auth().currentUser.uid || userProps.uid
  return firebase
    .database()
    .ref()
    .child(`users/${uid}`)
    .once('value')
    .then(x => x.val())
    .then(x => !!x ? x : createUser(userProps))
}

function createUser({ displayName, email, photoURL, uid }) {
  displayName = !!displayName ? displayName : DEFAULT_NAME
  photoURL = !!photoURL ? photoURL : DEFAULT_PHOTO
  return firebase
    .database()
    .ref()
    .child(`users/${uid}`)
    .update({ displayName, email, photoURL, uid })
    .then(_ => ({ displayName, email, photoURL, uid }))
}

export const signOut = _ => {
  return firebase.auth().signOut()
}

export const updateUserProfile = data => {
  return firebase.auth()
    .currentUser
    .updateProfile({...data})
}

function fetchApplicants() {
  return firebase
    .database()
    .ref('test')
    .child('applicants')
    .once('value')
    .then(x => x.val())
    .then(convertMapToList)
}

function fetchScholarships() {
  return firebase
    .database()
    .ref('test')
    .child('scholarships')
    .once('value')
    .then(x => x.val())
    .then(convertMapToList)
}

export const fetchData = observer => {
  return Promise.all([fetchApplicants(), fetchScholarships()])
    .then(([applicants, scholarships]) => ({ applicants, scholarships }))
    .then(createTestData)
    .then(x => observer.next(x))
    .catch(e => observer.error(e.message))
}

function convertMapToList(data) {
  return Object.keys(data)
    .reduce((acc, x) => acc.concat(data[x]), [])
}

function createTestData({ applicants, scholarships }) {
  return {
    applicants: {
      new: applicants,
      reviewed: applicants.slice(2, -1),
      interviewees: applicants.slice(0, -1),
      finalists: applicants.slice(3, -1),
    },
    scholarships: {
      all: scholarships,
      national: scholarships.slice(0, 2),
      niche: scholarships.slice(-1),
      local: scholarships,
      based: scholarships.slice(1, 2),
    }
  }
}

function seedDatabase({data, path}) {
  const ref = firebase
    .database()
    .ref()
    .child(path)
  data.map(x => ref.push(x))
}