import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types'
import { NavigationRoute, NavigationParams } from 'react-navigation'
import { useSelector, useDispatch } from 'react-redux'
import Toast from 'react-native-toast-message'
import ChatPanelContact from '../chatPanelContact'
import COLORS from '../../../constants/colors'
import TextInput from '../../commons/textInput'
import { text } from '../../../constants/formElementNames'
import { validate } from '../../../utils/validation'
import { RootState } from '../../../store/reducers'
import {
  fetchContacts,
  resetCreateConversationData,
  createConversation,
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
  const [
    contacts,
    alreadySearched,
    createConversationSuccess,
    createConversationFailure,
  ] = useSelector((state: RootState) => [
    state.contacts.contacts,
    state.contacts.alreadySearched,
    state.conversations.createConversationSuccess,
    state.conversations.createConversationFailure,
  ])

  const dispatch = useDispatch()

  const [formElementsValue, setFormElementsValue] = useState<
    Record<string, string>
  >({
    [text]: '',
  })

  useEffect(() => {
    if (createConversationSuccess) {
      setChatPanelModeToConversations()

      navigation.navigate('ChatConversation')
    } else if (createConversationFailure) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error when adding conversation',
      })
    }

    if (createConversationSuccess || createConversationFailure) {
      dispatch(resetCreateConversationData())
    }
  }, [createConversationSuccess, createConversationFailure])

  const searchContacts = async (email: string) => {
    if (validate(email, 'email')) {
      dispatch(fetchContacts(email))
    }
  }

  const handleClickOnContact = async (contactId: string) => {
    dispatch(createConversation(contactId))
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
      {!alreadySearched || contacts.length ? (
        contacts.map((contact) => (
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
