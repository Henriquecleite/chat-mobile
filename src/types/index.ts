export type ValueType = 'email'

export type UserId = string

export type UserName = string

export type ConversationSelectedId = string | null

export interface Message {
  _id: string
  userId: string
  date: number
  content: string
}

export interface Conversation {
  _id: string
  contactId: UserId
  contactName: UserName
  messages: Message[]
}

export type Conversations = Conversation[]

export interface SearchedContact {
  _id: UserId
  email: string
  name: UserName
}

export interface ChatStoreInitialState {
  conversations: Conversations
  conversationSelectedId: ConversationSelectedId
}
