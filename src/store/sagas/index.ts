import { all, fork } from 'redux-saga/effects'
import signinSagas from './signin'

export default function* rootSaga() {
  yield all([fork(signinSagas)])
}
