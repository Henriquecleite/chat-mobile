export interface SignupAction {
  type: 'SIGNUP'
  email: string
  name: string
  password: string
}

export interface SetSignupLoadingAction {
  type: 'SET_SIGNUP_LOADING'
}

export interface SignupSuccessAction {
  type: 'SIGNUP_SUCCESS'
}

export interface SignupFailureAction {
  type: 'SIGNUP_FAILURE'
}

export interface ResetSignupDataAction {
  type: 'RESET_SIGNUP_DATA'
}

export type SignupActions =
  | SignupAction
  | SetSignupLoadingAction
  | SignupSuccessAction
  | SignupFailureAction
  | ResetSignupDataAction

export const signup = (
  email: string,
  name: string,
  password: string
): SignupAction => {
  return {
    type: 'SIGNUP',
    email,
    name,
    password,
  }
}

export const setSignupLoading = (): SetSignupLoadingAction => {
  return {
    type: 'SET_SIGNUP_LOADING',
  }
}

export const resetSignupData = (): ResetSignupDataAction => {
  return {
    type: 'RESET_SIGNUP_DATA',
  }
}
