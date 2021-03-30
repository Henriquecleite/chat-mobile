import { Actions } from '../actions'
import {
  UserId,
  UserName,
  Conversations,
  ConversationSelectedId,
  ChatPanelMode,
} from '../../types'

export interface GeneralState {
  userId: UserId
  userName: UserName
  conversations: Conversations
  conversationSelectedId: ConversationSelectedId
  chatPanelMode: ChatPanelMode
}

const initialState: GeneralState = {
  userId: '',
  userName: '',
  conversations: [],
  conversationSelectedId: null,
  chatPanelMode: 'conversations',
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
    case 'UPDATE_CONVERSATIONS':
      return {
        ...state,
        conversations: action.conversations,
      }
    default:
      return state
  }
}
