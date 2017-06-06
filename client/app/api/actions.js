import * as API from 'api'

export const clearState = _ => {
  return {type: 'CLEAR_STATE'}
}

export const launchModal = _ => {
  document.body.style.overflow = 'hidden'
  return {type: 'LAUNCH_MODAL'}
}
export const removeModal = _ => {
  document.body.style.overflow = 'auto'
  return {type: 'REMOVE_MODAL'}
}

export const locationChange = payload => {
  return {type: 'LOCATION_CHANGE', payload}
}

export const styleUpdate = payload => {
  return {type: 'STYLE_UPDATE', payload}
}

export const initAuthState = payload => {
  return {type: 'INIT_AUTH_STATE', payload}
}

export const submitForm = data => {
  API.register(data)
  return {type: 'SUBMIT_FORM'}
}

export const authenticating = _ => {
  return {type: 'AUTHENTICATING'}
}

export const isLoading = payload => {
  return {type: 'LOADING', payload}
}

export const loginSuccess = payload => {
  return {type: 'LOGIN_SUCCESS', payload}
}

export const loginError = payload => {
  return {type: 'LOGIN_ERROR', payload}
}

export const signOut = _ => {
  API.signOut()
  return {type: 'SIGNOUT'}
}

export const fetchSuccess = payload => {
  return {type: 'FETCH_SUCCESS', payload}
}

export const fetchError = payload => {
  return {type: 'FETCH_ERROR', payload}
}

export const updateApplication = payload => {
  return {type: 'UPDATE_APPLICATION', payload}
}

export const submitApplication = payload => {
  return {type: 'SUBMIT_APPLICATION', payload}
}

export const updateUserInfo = payload => {
  API.updateUserProfile(payload)
  return {type: 'UPDATE_USER_INFO', payload}
}

export const onboardingRoute = _ => {
  return {type: 'ONBOARDING_ROUTE'}
}

// Scholarship Syncing
export const updateScholarship = payload => {
  return {type: 'UPDATE_SCHOLARSHIP', payload}
}

// Saves Scholarship JSON in db, and also updates it in store
export const saveAndUpdateScholarship = payload => {
  return (dispatch) => {
    API.updateScholarship(
      payload
    ).then((status, body) => {
      return updateScholarship(
        // or {body.scholarship, scholarshipIdx} if want to use returned value
        payload
      )
    }).catch((err) => {
      // return null so as not to update Store;
      // perhaps also fire an error message/flash of some sort? (Reducer)
      console.error(`Error saving scholarship. Text: ${err}.`)
      return false
    })
  }
}

// Score Card
export const addScoreCardField = payload => {
  return {type: 'ADD_SCORE_CARD_FIELD', payload}
}
