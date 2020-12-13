import {
  SET_CONVERSATIONS,
  SET_CONVERSATION_SELECTED_ID,
  SET_USER_ID,
} from './actions'
import { Conversations, ConversationSelectedId, UserId } from '../types'

export interface RootState {
  userId: UserId
  conversations: Conversations
  conversationSelectedId: ConversationSelectedId
}

const initialState: RootState = {
  userId: '',
  conversations: [],
  conversationSelectedId: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_ID:
      return {
        ...state,
        userId: action.userId,
      }
    case SET_CONVERSATIONS:
      return {
        ...state,
        conversations: action.conversations,
      }
    case SET_CONVERSATION_SELECTED_ID:
      return {
        ...state,
        conversationSelectedId: action.conversationSelectedId,
      }
    default:
      return state
  }
}
