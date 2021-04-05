import { takeEvery, put, all, call, select } from 'redux-saga/effects'
import getUsersRequest from '../../services/user'
import {
  FetchContactsAction,
  SetContactsAction,
  FetchContactsFailureAction,
} from '../actions'
import { RootState } from '../reducers'
import { Conversations, SearchedContact, UserId } from '../../types'

function* fetchContacts({ email }: FetchContactsAction) {
  const response = yield call(getUsersRequest, email)

  if (response.success) {
    const {
      data: { users: fetchedContacts },
    } = response

    const [conversations, userId]: [
      Conversations,
      UserId
    ] = yield select((state: RootState) => [
      state.conversations.conversations,
      state.user.userId,
    ])

    const userContacts = conversations.map(
      (conversation) => conversation.contactId
    )

    const fetchedContactsFiltered = fetchedContacts.filter(
      (contact: SearchedContact) =>
        !userContacts.includes(contact._id) && contact._id !== userId
    )

    yield put({
      type: 'SET_CONTACTS',
      contacts: fetchedContactsFiltered,
    } as SetContactsAction)
  } else {
    yield put({ type: 'FETCH_CONTACTS_FAILURE' } as FetchContactsFailureAction)
  }
}

export default function* conversationsSaga() {
  yield all([takeEvery('FETCH_CONTACTS', fetchContacts)])
}
