import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types'
import { NavigationRoute, NavigationParams } from 'react-navigation'
import { useSelector, useDispatch } from 'react-redux'
import ChatPanelContact from '../chatPanelContact'
import COLORS from '../../../constants/colors'
import TextInput from '../../commons/textInput'
import { text } from '../../../constants/formElementNames'
import getUsersRequest from '../../../services/user'
import { createConversationRequest } from '../../../services/conversation'
import { validate } from '../../../utils/validation'
import { SearchedContact } from '../../../types'
import { RootState } from '../../../store/reducer'
import {
  updateConversations,
  setConversationSelectedId,
} from '../../../store/actions'
import styles from './styles'

interface ChatPanelContactsSearchProps {
  setChatPanelModeToConversations: () => void
  navigation: StackNavigationProp<
    NavigationRoute<NavigationParams>,
    NavigationParams
  >
}

const ChatPanelContactsSearch: React.FC<ChatPanelContactsSearchProps> = ({
  setChatPanelModeToConversations,
  navigation,
}) => {
  const [userId, conversations] = useSelector((state: RootState) => [
    state.userId,
    state.conversations,
  ])

  const dispatch = useDispatch()

  const [formElementsValue, setFormElementsValue] = useState<
    Record<string, string>
  >({
    [text]: '',
  })

  const [searchedContacts, setSearchedContacts] = useState<SearchedContact[]>(
    []
  )

  const [alreadySearched, setAlreadySearched] = useState<boolean>(false)

  const searchContacts = async (email: string) => {
    if (validate(email, 'email')) {
      const response = await getUsersRequest(email)

      if (response.success) {
        const currentUserContacts = conversations.map(
          (conversation) => conversation.contactId
        )

        const fetchedContacts = response.data.users

        const fetchedContactsFiltered = fetchedContacts.filter(
          (contact: SearchedContact) =>
            !currentUserContacts.includes(contact._id) && contact._id !== userId
        )

        setSearchedContacts(fetchedContactsFiltered)
      }

      setAlreadySearched(true)
    }
  }

  const handleClickOnContact = async (contactId: string) => {
    const response = await createConversationRequest(contactId)

    if (response.success) {
      const conversation = response.data

      dispatch(updateConversations(conversations, conversation))

      dispatch(setConversationSelectedId(conversation._id))

      setChatPanelModeToConversations()

      navigation.navigate('ChatConversation')
    }
  }

  return (
    <View style={styles.chatPanelContactsSearchWrapper}>
      <View style={styles.chatPanelSearchBox}>
        <TouchableOpacity>
          <Ionicons name="ios-search" color={COLORS.white} size={26} />
        </TouchableOpacity>
        <View style={styles.contactTextInputWrapper}>
          <TextInput
            name={text}
            formElementsValue={formElementsValue}
            setFormElementsValue={setFormElementsValue}
            onChange={searchContacts}
            variant="clear"
            placeholder="Search a contact email"
          />
        </View>
      </View>
      {!alreadySearched || searchedContacts.length ? (
        searchedContacts.map((contact) => (
          <ChatPanelContact
            key={contact._id}
            contactName={contact.name}
            handlePress={() => {
              handleClickOnContact(contact._id)
            }}
          />
        ))
      ) : (
        <Text style={styles.noContactsFound}>No contacts found</Text>
      )}
    </View>
  )
}

export default ChatPanelContactsSearch
