import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import colors from '../../../constants/colors'
import { message } from '../../../constants/formElementNames'
import { addMessageRequest } from '../../../services/conversation'
import { ConversationSelectedId } from '../../../types'
import TextInput from '../../commons/textInput'

const styles = StyleSheet.create({
  chatConversationFooterWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.navy.light,
  },
  messageTextInputWrapper: {
    flex: 1,
  },
  sendButtonWrapper: {
    marginHorizontal: 10,
  },
})

interface ChatConversationFooterProps {
  conversationSelectedId: ConversationSelectedId
}

const ChatConversationFooter: React.FC<ChatConversationFooterProps> = ({
  conversationSelectedId,
}) => {
  const defaultFormElementsValue = {
    [message]: '',
  }

  const [formElementsValue, setFormElementsValue] = useState<
    Record<string, string>
  >({
    [message]: defaultFormElementsValue[message],
  })

  const sendMessage = async () => {
    const messageContent = formElementsValue[message]

    if (messageContent && conversationSelectedId) {
      const date = new Date().getTime().toString()

      const messageResponse = await addMessageRequest(
        conversationSelectedId,
        date,
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
          <Ionicons name="md-send" color={colors.white} size={26} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ChatConversationFooter
