import { takeEvery, put, all, call } from 'redux-saga/effects'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { signupRequest } from '../../services/auth'
import { SignupAction } from '../actions/signup'

function* signup({ email, name, password }: SignupAction) {
  const response = yield call(signupRequest, email, name, password)

  if (response.success) {
    const {
      data: { userId, userName, token },
    } = response

    yield all([
      call(AsyncStorage.setItem, 'token', token),
      put({ type: 'SET_USER_ID', userId }),
      put({ type: 'SET_USER_NAME', userName }),
    ])

    yield put({ type: 'SIGNUP_SUCCESS' })
  } else {
    yield put({ type: 'SIGNUP_FAILURE' })
  }
}

export default function* signupSaga() {
  yield all([takeEvery('SIGNUP', signup)])
}
