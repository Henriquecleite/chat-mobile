import { all, fork } from 'redux-saga/effects'
import signinSagas from './signin'
import signupSagas from './signup'
import contactsSagas from './contacts'
import conversationsSagas from './conversations'

export default function* rootSaga() {
  yield all([
    fork(signinSagas),
    fork(signupSagas),
    fork(contactsSagas),
    fork(conversationsSagas),
  ])
}
