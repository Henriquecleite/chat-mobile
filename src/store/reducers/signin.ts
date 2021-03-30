import { Actions } from '../actions'

export interface SigninState {
  signinLoading: boolean
  signinSuccess: boolean
  signinFailure: boolean
}

const initialState: SigninState = {
  signinLoading: false,
  signinSuccess: false,
  signinFailure: false,
}

export default (state = initialState, action: Actions) => {
  switch (action.type) {
    case 'SIGNIN_LOADING':
      return {
        ...state,
        signinLoading: true,
      }
    case 'SIGNIN_SUCCESS':
      return {
        ...state,
        signinLoading: false,
        signinSuccess: true,
        signinFailure: false,
      }
    case 'SIGNIN_FAILURE':
      return {
        ...state,
        signinLoading: false,
        signinFailure: true,
      }
    case 'RESET_SIGNIN_DATA':
      return {
        ...state,
        signinSuccess: false,
        signinFailure: false,
      }
    default:
      return state
  }
}
