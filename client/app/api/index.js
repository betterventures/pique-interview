import axios from 'axios'
import firebase from 'firebase'
import ReactOnRails from 'react-on-rails'

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

function convertMapToList(data) {
  return Object.keys(data)
    .reduce((acc, x) => acc.concat(data[x]), [])
}

function createTestData({ applicants, scholarships }) {
  return {
    applicants: {
      all: applicants,
      unscored: applicants,
      scored: applicants.slice(2, -1),
      awarded: applicants.slice(3, -1),
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

function _baseUrl(env) {
  const scheme = 'http://'
  switch (env) {
    case 'prod':
      return 'getpique.co'

    case 'stg':
      return 'pique-web-staging.herokuapp.com'

    default:
      return 'localhost:5000'
  }
}

function authenticityHeaders(headers={}) {
  return ReactOnRails.authenticityHeaders(headers)
}

// formats the keys of any nested Objects with _attributes, for acceptance as nested attrs by Rails
function formatNestedAttrs(payload) {
  const formatted = Object.keys(payload).reduce((acc, k) => {
    let v = payload[k]
    // if value is an Object, rename and recurse
    // special case for null, which is an Object
    if (v === null) {
      acc[k] = v
    // rename array contents without renaming the array keys
    } else if (Array.isArray(v)) {
      let newKey = `${k}_attributes`
      acc[newKey] = v.map((el) => formatNestedAttrs(el))
    } else if (typeof v === 'object') {
      let newKey = `${k}_attributes`
      acc[newKey] = formatNestedAttrs(v)
    } else {
      acc[k] = v
    }

    return acc
  }, {})

  return formatted
}

export const updateScholarship = payload => {
  const formatted = {
    scholarship: formatNestedAttrs(payload.scholarship)
  }
  return axios.put(
    `/providers/scholarships/${payload.scholarship.id}`,
    formatted,
    {
      headers: authenticityHeaders(),
    }
  )
}

export const inviteProvider = payload => {
  // NB: This URL may change if Providers::InvitationsController route changes
  return axios.post(
    `/providers/invitation`,
    payload,
    {
      headers: authenticityHeaders(),
    }
  )
}
