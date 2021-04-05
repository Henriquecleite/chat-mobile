import { takeEvery, put, all, call } from 'redux-saga/effects'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { signupRequest } from '../../services/auth'
import {
  SignupAction,
  SignupSuccessAction,
  SignupFailureAction,
} from '../actions/signup'
import { SetUserIdAction, SetUserNameAction } from '../actions'

function* signup({ email, name, password }: SignupAction) {
  const response = yield call(signupRequest, email, name, password)

  if (response.success) {
    const {
      data: { userId, userName, token },
    } = response

    yield all([
      call(AsyncStorage.setItem, 'token', token),
      put({ type: 'SET_USER_ID', userId } as SetUserIdAction),
      put({ type: 'SET_USER_NAME', userName } as SetUserNameAction),
    ])

    yield put({ type: 'SIGNUP_SUCCESS' } as SignupSuccessAction)
  } else {
    yield put({ type: 'SIGNUP_FAILURE' } as SignupFailureAction)
  }
}

export default function* signupSaga() {
  yield all([takeEvery('SIGNUP', signup)])
}
