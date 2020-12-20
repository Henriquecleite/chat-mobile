import { Conversations, UserId, Conversation } from '../types'

export const SET_USER_ID = 'SET_USER_ID'
export const SET_CONVERSATIONS = 'SET_CONVERSATIONS'
export const SET_CONVERSATION_SELECTED_ID = 'SET_CONVERSATION_SELECTED_ID'
export const UPDATE_CONVERSATIONS = 'UPDATE_CONVERSATIONS'

export const setUserId = (userId: UserId) => {
  return { type: SET_USER_ID, userId }
}

export const setConversations = (conversations: Conversations) => {
  return { type: SET_CONVERSATIONS, conversations }
}

export const setConversationSelectedId = (conversationId: string) => {
  return {
    type: SET_CONVERSATION_SELECTED_ID,
    conversationSelectedId: conversationId,
  }
}

export const updateConversations = (
  conversations: Conversations,
  newConversation: Conversation
) => {
  const conversationIndex = conversations.findIndex(
    (conversation) => conversation._id === newConversation._id
  )

  let conversationsUpdated

  if (conversationIndex !== -1) {
    conversationsUpdated = conversations.map((conversation, index) => ({
      ...conversation,
      messages:
        index === conversationIndex
          ? newConversation.messages
          : [...conversation.messages],
    }))
  } else {
    conversationsUpdated = [...conversations]

    conversationsUpdated.push(newConversation)
  }

  return {
    type: UPDATE_CONVERSATIONS,
    conversations: conversationsUpdated,
  }
}
