import { all, fork } from 'redux-saga/effects'
import signinSagas from './signin'
import signupSagas from './signup'

export default function* rootSaga() {
  yield all([fork(signinSagas), fork(signupSagas)])
}
