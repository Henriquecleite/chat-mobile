import { Conversations, UserId, ChatPanelMode } from '../types'

export const SET_USER_ID = 'SET_USER_ID'
export const SET_CONVERSATIONS = 'SET_CONVERSATIONS'
export const SET_CONVERSATION_SELECTED_ID = 'SET_CONVERSATION_SELECTED_ID'
export const SET_CHAT_PANEL_MODE = 'SET_CHAT_PANEL_MODE'

export const setConversations = (conversations: Conversations) => {
  return { type: SET_CONVERSATIONS, conversations }
}

export const setUserId = (userId: UserId) => {
  return { type: SET_USER_ID, userId }
}

export const setConversationSelectedId = (conversationId: string) => {
  return {
    type: SET_CONVERSATION_SELECTED_ID,
    conversationSelectedId: conversationId,
  }
}

export const setChatPanelMode = (mode: ChatPanelMode) => {
  return {
    type: SET_CHAT_PANEL_MODE,
    mode,
  }
}
