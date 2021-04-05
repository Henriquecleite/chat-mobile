import { SearchedContact } from '../../types'

export interface SetContactsAction {
  type: 'SET_CONTACTS'
  contacts: SearchedContact
}

export interface FetchContactsAction {
  type: 'FETCH_CONTACTS'
  email: string
}

export interface FetchContactsFailureAction {
  type: 'FETCH_CONTACTS_FAILURE'
  email: string
}

export type ContactsActions =
  | SetContactsAction
  | FetchContactsAction
  | FetchContactsFailureAction

export const fetchContacts = (email: string): FetchContactsAction => {
  return {
    type: 'FETCH_CONTACTS',
    email,
  }
}
