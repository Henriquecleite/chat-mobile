export interface SigninAction {
  type: 'SIGNIN'
  email: string
  password: string
}

export interface ResetSigninDataAction {
  type: 'RESET_SIGNIN_DATA'
}

export type SigninActions = SigninAction

export const signin = (email: string, password: string): SigninAction => {
  return {
    type: 'SIGNIN',
    email,
    password,
  }
}

export const resetSigninData = (): ResetSigninDataAction => {
  return {
    type: 'RESET_SIGNIN_DATA',
  }
}
