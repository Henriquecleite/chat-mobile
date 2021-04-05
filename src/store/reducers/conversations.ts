import { ConversationsActions } from '../actions'
import {
  Conversations,
  ConversationSelectedId,
  ChatPanelMode,
} from '../../types'

export interface ConversationsState {
  conversations: Conversations
  conversationSelectedId: ConversationSelectedId
  chatPanelMode: ChatPanelMode
  fetchConversationsSuccess: boolean
  fetchConversationsFailure: boolean
  createConversationSuccess: boolean
  createConversationFailure: boolean
  sendMessageSuccess: boolean
  sendMessageFailure: boolean
}

const initialState: ConversationsState = {
  conversations: [],
  conversationSelectedId: null,
  chatPanelMode: 'conversations',
  fetchConversationsSuccess: false,
  fetchConversationsFailure: false,
  createConversationSuccess: false,
  createConversationFailure: false,
  sendMessageSuccess: false,
  sendMessageFailure: false,
}

export default (state = initialState, action: ConversationsActions) => {
  switch (action.type) {
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
    case 'FETCH_CONVERSATIONS_FAILURE':
      return {
        ...state,
        fetchConversationsFailure: true,
      }
    case 'CREATE_CONVERSATION_SUCCESS':
      return {
        ...state,
        createConversationSuccess: true,
        createConversationFailure: false,
      }
    case 'CREATE_CONVERSATION_FAILURE':
      return {
        ...state,
        createConversationSuccess: false,
        createConversationFailure: true,
      }
    case 'RESET_CREATE_CONVERSATION_DATA':
      return {
        ...state,
        createConversationSuccess: false,
        createConversationFailure: false,
      }
    case 'SEND_MESSAGE_SUCCESS':
      return {
        ...state,
        sendMessageSuccess: true,
        sendMessageFailure: false,
      }
    case 'SEND_MESSAGE_FAILURE':
      return {
        ...state,
        sendMessageSuccess: false,
        sendMessageFailure: true,
      }
    case 'RESET_SEND_MESSAGE_DATA':
      return {
        ...state,
        sendMessageSuccess: false,
        sendMessageFailure: false,
      }
    default:
      return state
  }
}
