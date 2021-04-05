import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-native-toast-message'
import COLORS from '../../../constants/colors'
import { message } from '../../../constants/formElementNames'
import { Conversation } from '../../../types'
import TextInput from '../../commons/textInput'
import { resetSendMessageData, sendMessage } from '../../../store/actions'
import { RootState } from '../../../store/reducers'
import styles from './styles'

interface ChatConversationFooterProps {
  conversationSelected: Conversation
}

const ChatConversationFooter: React.FC<ChatConversationFooterProps> = ({
  conversationSelected,
}) => {
  const [
    sendMessageSuccess,
    sendMessageFailure,
  ] = useSelector((state: RootState) => [
    state.conversations.sendMessageSuccess,
    state.conversations.sendMessageFailure,
  ])

  const dispatch = useDispatch()

  const defaultFormElementsValue = {
    [message]: '',
  }

  const [formElementsValue, setFormElementsValue] = useState<
    Record<string, string>
  >({
    [message]: defaultFormElementsValue[message],
  })

  const { _id: conversationSelectedId } = conversationSelected

  useEffect(() => {
    if (sendMessageFailure) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error when sending message',
      })
    }

    if (sendMessageSuccess || sendMessageFailure) {
      dispatch(resetSendMessageData())
    }
  }, [sendMessageSuccess, sendMessageFailure])

  const handleClickOnSendButton = async () => {
    const messageContent = formElementsValue[message]

    if (messageContent && conversationSelectedId) {
      dispatch(sendMessage(messageContent, conversationSelected))

      setFormElementsValue({
        [message]: defaultFormElementsValue[message],
      })
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
        <TouchableOpacity onPress={handleClickOnSendButton}>
          <Ionicons name="md-send" color={COLORS.white} size={26} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ChatConversationFooter
