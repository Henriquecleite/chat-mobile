import { Conversations, UserId } from '../types'

export const SET_USER_ID = 'SET_USER_ID'
export const SET_CONVERSATIONS = 'SET_CONVERSATIONS'
export const SET_CONVERSATION_SELECTED_ID = 'SET_CONVERSATION_SELECTED_ID'
export const UPDATE_CONVERSATIONS = 'UPDATE_CONVERSATIONS'

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

export const updateConversations = (newConversation) => {
  const conversationIndex = currentState.conversations.findIndex(
    (conversation) => conversation._id === newConversation._id
  )

  let conversationsUpdated

  if (conversationIndex !== -1) {
    conversationsUpdated = currentState.conversations.map(
      (conversation, index) => ({
        ...conversation,
        messages:
          index === conversationIndex
            ? newConversation.messages
            : [...conversation.messages],
      })
    )
  } else {
    conversationsUpdated = [...currentState.conversations]

    conversationsUpdated.push(newConversation)
  }

  return { conversations: conversationsUpdated }
}
