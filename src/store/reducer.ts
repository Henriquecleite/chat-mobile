import { SET_CONVERSATIONS } from './actions'

const initialState = {
  conversations: [],
  conversationSelectedId: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CONVERSATIONS:
      // console.log('state', state, 'action', action)

      return {
        ...state,
        conversations: action.conversations,
      }
    default:
      return state
  }
}
