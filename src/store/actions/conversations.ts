import { Conversations, Conversation } from '../../types'

export interface SetConversationsAction {
  type: 'SET_CONVERSATIONS'
  conversations: Conversations
}

export interface SetConversationSelectedIdAction {
  type: 'SET_CONVERSATION_SELECTED_ID'
  conversationSelectedId: string
}

export interface FetchConversationsAction {
  type: 'FETCH_CONVERSATIONS'
}

export interface FetchConversationsFailureAction {
  type: 'FETCH_CONVERSATIONS_FAILURE'
}

export interface CreateConversationAction {
  type: 'CREATE_CONVERSATION'
  contactId: string
}

export interface CreateConversationSuccessAction {
  type: 'CREATE_CONVERSATION_SUCCESS'
}

export interface CreateConversationFailureAction {
  type: 'CREATE_CONVERSATION_FAILURE'
}

export interface ResetCreateConversationDataAction {
  type: 'RESET_CREATE_CONVERSATION_DATA'
}

export interface SendMessageAction {
  type: 'SEND_MESSAGE'
  conversationSelected: Conversation
  message: string
}

export interface SendMessageSuccessAction {
  type: 'SEND_MESSAGE_SUCCESS'
}

export interface SendMessageFailureAction {
  type: 'SEND_MESSAGE_FAILURE'
}

export interface ResetSendMessageDataAction {
  type: 'RESET_SEND_MESSAGE_DATA'
}

export type ConversationsActions =
  | SetConversationsAction
  | SetConversationSelectedIdAction
  | FetchConversationsAction
  | FetchConversationsFailureAction
  | CreateConversationAction
  | CreateConversationSuccessAction
  | CreateConversationFailureAction
  | ResetCreateConversationDataAction
  | SendMessageAction
  | SendMessageSuccessAction
  | SendMessageFailureAction
  | ResetSendMessageDataAction

export const setConversations = (
  conversations: Conversations
): SetConversationsAction => {
  return {
    type: 'SET_CONVERSATIONS',
    conversations,
  }
}

export const setConversationSelectedId = (
  conversationId: string
): SetConversationSelectedIdAction => {
  return {
    type: 'SET_CONVERSATION_SELECTED_ID',
    conversationSelectedId: conversationId,
  }
}

export const fetchConversations = (): FetchConversationsAction => {
  return {
    type: 'FETCH_CONVERSATIONS',
  }
}

export const createConversation = (
  contactId: string
): CreateConversationAction => {
  return {
    type: 'CREATE_CONVERSATION',
    contactId,
  }
}

export const resetCreateConversationData = (): ResetCreateConversationDataAction => {
  return {
    type: 'RESET_CREATE_CONVERSATION_DATA',
  }
}

export const sendMessage = (
  message: string,
  conversationSelected: Conversation
): SendMessageAction => {
  return {
    type: 'SEND_MESSAGE',
    conversationSelected,
    message,
  }
}

export const resetSendMessageData = (): ResetSendMessageDataAction => {
  return {
    type: 'RESET_SEND_MESSAGE_DATA',
  }
}
