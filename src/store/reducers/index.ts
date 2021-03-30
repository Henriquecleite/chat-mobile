import { combineReducers } from 'redux'
import general from './general'
import signin from './signin'

const rootReducer = combineReducers({
  general,
  signin,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
