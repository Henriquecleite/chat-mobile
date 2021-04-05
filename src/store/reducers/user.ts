import { UserActions } from '../actions'
import { UserId, UserName } from '../../types'

export interface UserState {
  userId: UserId
  userName: UserName
}

const initialState: UserState = {
  userId: '',
  userName: '',
}

export default (state = initialState, action: UserActions) => {
  switch (action.type) {
    case 'SET_USER_ID':
      return {
        ...state,
        userId: action.userId,
      }
    case 'SET_USER_NAME':
      return {
        ...state,
        userName: action.userName,
      }
    default:
      return state
  }
}
