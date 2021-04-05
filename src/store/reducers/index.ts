import { combineReducers } from 'redux'
import user from './user'
import signin from './signin'
import signup from './signup'
import contacts from './contacts'
import conversations from './conversations'

const rootReducer = combineReducers({
  user,
  signin,
  signup,
  contacts,
  conversations,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
