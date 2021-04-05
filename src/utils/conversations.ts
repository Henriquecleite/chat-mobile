import { Conversations, Conversation } from '../types'

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

  return conversationsUpdated
}
