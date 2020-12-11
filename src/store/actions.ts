import { Conversations } from '../types'

export const SET_CONVERSATIONS = 'SET_CONVERSATIONS'
// export const UPDATE_CONVERSATIONS: 'UPDATE_CONVERSATIONS'
// export const SET_CONVERSATION_SELECTED_ID: 'SET_CONVERSATION_SELECTED_ID'

export const setConversations = (conversations: Conversations) => {
  return { type: SET_CONVERSATIONS, conversations }
}

// export const updateConversations = (newConversation) => {
//   const conversationIndex = currentState.conversations.findIndex(
//     (conversation) => conversation._id === newConversation._id
//   )

//   let conversationsUpdated

//   if (conversationIndex !== -1) {
//     conversationsUpdated = currentState.conversations.map(
//       (conversation, index) => ({
//         ...conversation,
//         messages:
//           index === conversationIndex
//             ? newConversation.messages
//             : [...conversation.messages],
//       })
//     )
//   } else {
//     conversationsUpdated = [...currentState.conversations]

//     conversationsUpdated.push(newConversation)
//   }

//   return { conversations: conversationsUpdated }
// }

// export const setConversationSelectedId = (currentState, conversationId) => {
//   return { conversationSelectedId: conversationId }
// }
