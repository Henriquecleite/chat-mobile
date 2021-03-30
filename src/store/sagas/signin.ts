import { takeEvery, put, all, call } from 'redux-saga/effects'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import { SigninAction } from '../actions'
import { signinRequest } from '../../services/auth'

function* signin({ email, password }) {
  const response = yield call(signinRequest, email, password)

  if (response.success) {
    const {
      data: { userId, userName, token },
    } = response

    yield all([
      call(AsyncStorage.setItem, 'token', token),
      put({ type: 'SET_USER_ID', userId }),
      put({ type: 'SET_USER_NAME', userName }),
    ])

    yield put({ type: 'SIGNIN_SUCCESS' })
  } else {
    yield put({ type: 'SIGNIN_FAILURE' })
  }
}

export default function* signinSaga() {
  yield all([takeEvery('SIGNIN', signin)])
}
