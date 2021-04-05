import { UserId, UserName } from '../../types'

export interface SetUserIdAction {
  type: 'SET_USER_ID'
  userId: UserId
}

export interface SetUserNameAction {
  type: 'SET_USER_NAME'
  userName: UserName
}

export type UserActions = SetUserIdAction | SetUserNameAction

export const setUserId = (userId: UserId): SetUserIdAction => {
  return { type: 'SET_USER_ID', userId }
}
