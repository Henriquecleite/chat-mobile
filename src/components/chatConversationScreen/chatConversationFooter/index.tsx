import React, { useState } from 'react'
import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import COLORS from '../../../constants/colors'
import { message } from '../../../constants/formElementNames'
import { addMessageRequest } from '../../../services/conversation'
import { Conversations, Conversation } from '../../../types'
import TextInput from '../../commons/textInput'
import { updateConversations } from '../../../store/actions'
import { RootState } from '../../../store/reducers'
import styles from './styles'

interface ChatConversationFooterProps {
  conversationSelected: Conversation
  conversations: Conversations
}

const ChatConversationFooter: React.FC<ChatConversationFooterProps> = ({
  conversationSelected,
  conversations,
}) => {
  const [userId] = useSelector((state: RootState) => [state.general.userId])

  const dispatch = useDispatch()

  const defaultFormElementsValue = {
    [message]: '',
  }

  const [formElementsValue, setFormElementsValue] = useState<
    Record<string, string>
  >({
    [message]: defaultFormElementsValue[message],
  })

  const { _id: conversationSelectedId, messages } = conversationSelected

  const sendMessage = async () => {
    const messageContent = formElementsValue[message]

    if (messageContent && conversationSelectedId) {
      const date = new Date().getTime()

      const dateString = date.toString()

      const newConversation: Conversation = {
        ...conversationSelected,
        messages: [
          ...messages,
          {
            _id: Math.random().toString(),
            content: messageContent,
            date,
            userId,
          },
        ],
      }

      dispatch(updateConversations(conversations, newConversation))

      const messageResponse = await addMessageRequest(
        conversationSelectedId,
        dateString,
        messageContent
      )

      if (messageResponse.success) {
        setFormElementsValue({
          [message]: defaultFormElementsValue[message],
        })
      }
    }
  }

  return (
    <View style={styles.chatConversationFooterWrapper}>
      <View style={styles.messageTextInputWrapper}>
        <TextInput
          name={message}
          formElementsValue={formElementsValue}
          setFormElementsValue={setFormElementsValue}
          variant="clear"
          placeholder="Message"
        />
      </View>
      <View style={styles.sendButtonWrapper}>
        <TouchableOpacity onPress={sendMessage}>
          <Ionicons name="md-send" color={COLORS.white} size={26} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ChatConversationFooter
