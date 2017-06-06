import { combineReducers } from 'redux'

const registerReducer = (state=false, action) => {
  switch (action.type) {

    case 'SUBMIT_FORM':
      return true

    default:
      return state
  }
}

const loadingReducer = (state=false, action) => {
  switch (action.type) {

    case 'LOADING':
      return action.payload

    case 'AUTHENTICATING':
      return true

    case 'INIT_AUTH_STATE':
    case 'LOGIN_ERROR':
      return false

    default:
      return state
  }
}

const authReducer = (state={user: false, isAuthed: false, initialized: false, error: '', isNew: true}, action) => {
  switch (action.type) {

    case 'AUTHENTICATING':
      return Object.assign({}, state, {
        error: '',
      })

    case 'INIT_AUTH_STATE':
      return Object.assign({}, state, {
        user: action.payload.user,
        initialized: true,
        isAuthed: !!action.payload.user,
      })

    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, {
        user: action.payload.user,
        isAuthed: !!action.payload.user,
      })

    case 'LOGIN_ERROR':
      return Object.assign({}, state, {
        error: action.payload.error,
        initialized: true,
        isAuthed: !!action.payload.user,
      })

    case 'SIGNOUT':
      return Object.assign({}, state, {
        user: false,
        isNew: true,
        initialized: false,
        isAuthed: false,
      })

    case 'SUBMIT_APPLICATION':
      return {
        ...state,
        isNew: false,
      }

    default:
      return state
  }
}

const routeReducer = (state={route: '', hash: '', query: {}}, action) => {
  switch (action.type) {

    case 'LOCATION_CHANGE':
      return Object.assign({}, state, {
        ...action.payload
      })

    case 'SIGNOUT':
      return Object.assign({}, state, {
        ...action.payload
      })

    default:
      return state
  }
}

const modalReducer = (state=false, action) => {
  switch (action.type) {

    case 'LAUNCH_MODAL':
      return true

    case 'REMOVE_MODAL':
      return false

    default:
      return state
  }
}

const uiReducer = (state={}, action) => {
  switch (action.type) {

    case 'CLEAR_STATE':
      return {}

    case 'LOCATION_CHANGE':
      return {
        ...state,
        removeNav: action.payload.route === '/payment' ? true : false,
        fixed: false,
        fill: false,
      }

    case 'ONBOARDING_ROUTE':
      return {
        ...state,
        removeNav: true,
      }

    case 'STYLE_UPDATE':
      return Object.assign({}, state, {
        ...action.payload
      })

    default:
      return state
  }
}

const applicants = {
  all: [],
  unscored: [],
  scored: [],
  awarded: [],
}
const scholarships = {
  all: [],
  national: [],
  niche: [],
  local: [],
  based: [],
}
const appReducer = (state={ applicants, scholarships }, action) => {
  switch (action.type) {

    case 'FETCH_SUCCESS':
      return Object.assign({}, state, {
        ...action.payload,
        error: '',
      })

    case 'FETCH_ERROR':
      return Object.assign({}, state, {
        error: action.payload.error,
      })

    case 'SIGNOUT':
      return { applicants }

    // TODO: This should be replaced with 'UPDATE_SCHOLARSHIP':
    // - Takes Scholarship object and index and sets Store state to that scholarship
    // As a side effect, may make an API call to save this state to the database
    case 'ADD_SCORE_CARD_FIELD':
      let newAddScoreCardFieldState = Object.assign({}, state)
      let addScoreCardFields = (newAddScoreCardFieldState.scholarships['all'][0] &&
                            newAddScoreCardFieldState.scholarships['all'][0].score_card &&
                            newAddScoreCardFieldState.scholarships['all'][0].score_card.score_card_fields)
      addScoreCardFields = addScoreCardFields || []
      addScoreCardFields.push({
      ...action.payload
      })
      return newAddScoreCardFieldState

    // Update the specified scholarship with the specified payload
    // TODO: Modify `scholarships` to be an Object, not array, and pass scholarship.id instead of scholarshipIdx
    case 'UPDATE_SCHOLARSHIP':
      let updatedScholarshipState = Object.assign({}, state)
      // default to idx 0 for now; implement API for extensibility to multiple Scholarships later
      let scholarshipIdx = payload.scholarshipIdx || 0
      let updatedSchol = updatedScholarshipState = updatedScholarshipState.scholarships['all'][scholarshipIdx]
      updatedSchol = payload.scholarship
      return updatedScholarshipState

    default:
      return state
  }
}

const applicationReducer = (state={}, action) => {
  switch (action.type) {

    case 'UPDATE_USER_INFO':
    case 'UPDATE_APPLICATION':
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}

// Why name function the same as the reducer?
// https://github.com/gaearon/redux/issues/428#issuecomment-129223274
// Naming the function will help with debugging!
/* eslint-disable no-unused-vars */
const railsContextReducer = (state={}, action) => {
  return state;
}

const userReducer = (state={}, action) => {
  return state;
}


export default combineReducers({
  app: appReducer,
  auth: authReducer,
  formSubmitted: registerReducer,
  loading: loadingReducer,
  open: modalReducer,
  railsContext: railsContextReducer,
  routing: routeReducer,
  application: applicationReducer,
  ui: uiReducer,
  user: userReducer,
})
