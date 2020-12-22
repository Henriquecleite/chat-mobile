import { Actions } from './actions'
import {
  Conversations,
  ConversationSelectedId,
  UserId,
  ChatPanelMode,
} from '../types'

export interface RootState {
  userId: UserId
  conversations: Conversations
  conversationSelectedId: ConversationSelectedId
  chatPanelMode: ChatPanelMode
}

const initialState: RootState = {
  userId: '',
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
