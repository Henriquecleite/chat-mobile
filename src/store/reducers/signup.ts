import { SignupActions } from '../actions'

export interface SignupState {
  signupLoading: boolean
  signupSuccess: boolean
  signupFailure: boolean
}

const initialState: SignupState = {
  signupLoading: false,
  signupSuccess: false,
  signupFailure: false,
}

export default (state = initialState, action: SignupActions) => {
  switch (action.type) {
    case 'SET_SIGNUP_LOADING':
      return {
        ...state,
        signupLoading: true,
      }
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        signupLoading: false,
        signupSuccess: true,
        signupFailure: false,
      }
    case 'SIGNUP_FAILURE':
      return {
        ...state,
        signupLoading: false,
        signupFailure: true,
      }
    case 'RESET_SIGNUP_DATA':
      return {
        ...state,
        signupSuccess: false,
        signupFailure: false,
      }
    default:
      return state
  }
}
