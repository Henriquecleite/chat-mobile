import { ContactsActions } from '../actions'
import { SearchedContact } from '../../types'

export interface ContactsState {
  contacts: SearchedContact[]
  alreadySearched: boolean
}

const initialState: ContactsState = {
  contacts: [],
  alreadySearched: false,
}

export default (state = initialState, action: ContactsActions) => {
  switch (action.type) {
    case 'SET_CONTACTS':
      return {
        ...state,
        contacts: action.contacts,
        alreadySearched: true,
      }
    default:
      return state
  }
}
