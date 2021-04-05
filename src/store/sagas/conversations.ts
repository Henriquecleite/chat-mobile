import { takeEvery, put, all, call, select } from 'redux-saga/effects'
import {
  getConversationsRequest,
  createConversationRequest,
  addMessageRequest,
} from '../../services/conversation'
import {
  CreateConversationAction,
  SetConversationsAction,
  SetConversationSelectedIdAction,
  CreateConversationSuccessAction,
  CreateConversationFailureAction,
  SendMessageAction,
  SendMessageFailureAction,
  SendMessageSuccessAction,
} from '../actions'
import { updateConversations } from '../../utils/conversations'
import { RootState } from '../reducers'
import { Conversations, Conversation, UserId } from '../../types'

function* fetchConversations() {
  const response = yield call(getConversationsRequest)

  if (response.success) {
    const {
      data: { conversations },
    } = response

    yield put({ type: 'SET_CONVERSATIONS', conversations })
  } else {
    yield put({ type: 'FETCH_CONVERSATIONS_FAILURE' })
  }
}

function* createConversation({ contactId }: CreateConversationAction) {
  const response = yield call(createConversationRequest, contactId)

  if (response.success) {
    const { data: conversation } = response

    const conversations: Conversations = yield select(
      (state: RootState) => state.conversations.conversations
    )

    const updatedConversations = updateConversations(
      conversations,
      conversation
    )

    const conversationId = conversation._id

    yield all([
      put({
        type: 'SET_CONVERSATIONS',
        conversations: updatedConversations,
      } as SetConversationsAction),
      put({
        type: 'SET_CONVERSATION_SELECTED_ID',
        conversationSelectedId: conversationId,
      } as SetConversationSelectedIdAction),
      put({
        type: 'CREATE_CONVERSATION_SUCCESS',
      } as CreateConversationSuccessAction),
    ])
  } else {
    yield put({
      type: 'CREATE_CONVERSATION_FAILURE',
    } as CreateConversationFailureAction)
  }
}

function* sendMessage({ conversationSelected, message }: SendMessageAction) {
  const [userId, conversations]: [
    UserId,
    Conversations
  ] = yield select((state: RootState) => [
    state.user.userId,
    state.conversations.conversations,
  ])

  const { _id: conversationSelectedId, messages } = conversationSelected

  const date = new Date().getTime()

  const dateString = date.toString()

  const newConversation: Conversation = {
    ...conversationSelected,
    messages: [
      ...messages,
      {
        _id: Math.random().toString(),
        content: message,
        date,
        userId,
      },
    ],
  }

  const updatedConversations = updateConversations(
    conversations,
    newConversation
  )

  yield put({
    type: 'SET_CONVERSATIONS',
    conversations: updatedConversations,
  } as SetConversationsAction)

  const response = yield call(
    addMessageRequest,
    conversationSelectedId,
    dateString,
    message
  )

  if (response.success) {
    yield put({ type: 'SEND_MESSAGE_SUCCESS' } as SendMessageSuccessAction)
  } else {
    yield put({ type: 'SEND_MESSAGE_FAILURE' } as SendMessageFailureAction)
  }
}

export default function* conversationsSaga() {
  yield all([
    takeEvery('FETCH_CONVERSATIONS', fetchConversations),
    takeEvery('CREATE_CONVERSATION', createConversation),
    takeEvery('SEND_MESSAGE', sendMessage),
  ])
}
