import { Actions } from './actions'
import {
  UserId,
  UserName,
  Conversations,
  ConversationSelectedId,
  ChatPanelMode,
} from '../types'

export interface RootState {
  userId: UserId
  userName: UserName
  conversations: Conversations
  conversationSelectedId: ConversationSelectedId
  chatPanelMode: ChatPanelMode
  signinLoading: boolean
  signinSuccess: boolean
  signinFailure: boolean
}

const initialState: RootState = {
  userId: '',
  userName: '',
  conversations: [],
  conversationSelectedId: null,
  chatPanelMode: 'conversations',
  signinLoading: false,
  signinSuccess: false,
  signinFailure: false,
}

export default (state = initialState, action: Actions) => {
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
    case 'SET_CONVERSATIONS':
      return {
        ...state,
        conversations: action.conversations,
      }
    case 'SET_CONVERSATION_SELECTED_ID':
      return {
        ...state,
        conversationSelectedId: action.conversationSelectedId,
      }
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
    case 'UPDATE_CONVERSATIONS':
      return {
        ...state,
        conversations: action.conversations,
      }
    default:
      return state
  }
}
