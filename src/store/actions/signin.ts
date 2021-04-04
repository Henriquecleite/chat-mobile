export interface SigninAction {
  type: 'SIGNIN'
  email: string
  password: string
}

export interface SetSigninLoadingAction {
  type: 'SET_SIGNIN_LOADING'
}

export interface SigninSuccessAction {
  type: 'SIGNIN_SUCCESS'
}

export interface SigninFailureAction {
  type: 'SIGNIN_FAILURE'
}

export interface ResetSigninDataAction {
  type: 'RESET_SIGNIN_DATA'
}

export type SigninActions =
  | SigninAction
  | SetSigninLoadingAction
  | SigninSuccessAction
  | SigninFailureAction
  | ResetSigninDataAction

export const signin = (email: string, password: string): SigninAction => {
  return {
    type: 'SIGNIN',
    email,
    password,
  }
}

export const setSigninLoading = (): SetSigninLoadingAction => {
  return {
    type: 'SET_SIGNIN_LOADING',
  }
}

export const resetSigninData = (): ResetSigninDataAction => {
  return {
    type: 'RESET_SIGNIN_DATA',
  }
}
