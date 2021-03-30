import React from 'react'
import { View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types'
import { NavigationParams, NavigationRoute } from 'react-navigation'
import ChatPanelContact from '../chatPanelContact'
import { RootState } from '../../../store/reducers'
import { setConversationSelectedId } from '../../../store/actions'
import styles from './styles'

interface ChatPanelConversationsProps {
  navigation: StackNavigationProp<
    NavigationRoute<NavigationParams>,
    NavigationParams
  >
}

const ChatPanelConversations: React.FC<ChatPanelConversationsProps> = ({
  navigation,
}) => {
  const [conversations] = useSelector((state: RootState) => [
    state.general.conversations,
  ])

  const dispatch = useDispatch()

  const handlePressOnContact = (conversationId: string) => {
    navigation.navigate('ChatConversation')

    dispatch(setConversationSelectedId(conversationId))
  }

  return (
    <View style={styles.chatPanelConversations}>
      {conversations.map((conversation) => {
        let lastMessageContent
        let lastMessageDate

        const lastMessage =
          conversation.messages[conversation.messages.length - 1]

        if (lastMessage) {
          const lastMessageDateObject = new Date(lastMessage.date)

          const lastMessageDateHour = lastMessageDateObject.getHours()

          const lastMessageDateMinutes = lastMessageDateObject.getMinutes()

          lastMessageContent = lastMessage.content

          lastMessageDate = `${lastMessageDateHour}:${lastMessageDateMinutes}`
        }

        return (
          <ChatPanelContact
            key={conversation._id}
            contactName={conversation.contactName}
            lastMessageDate={lastMessageDate}
            lastMessageContent={lastMessageContent}
            handlePress={() => {
              handlePressOnContact(conversation._id)
            }}
          />
        )
      })}
    </View>
  )
}

export default ChatPanelConversations
