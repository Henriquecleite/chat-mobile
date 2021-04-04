import { combineReducers } from 'redux'
import general from './general'
import signin from './signin'
import signup from './signup'

const rootReducer = combineReducers({
  general,
  signin,
  signup,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
