import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types'
import { NavigationParams, NavigationRoute } from 'react-navigation'
import ChatPanelContact from '../chatPanelContact'
import { RootState } from '../../../store/reducer'
import colors from '../../../constants/colors'
import { setConversationSelectedId } from '../../../store/actions'

const styles = StyleSheet.create({
  chatPanelConversations: {
    flex: 1,
    backgroundColor: colors.navy.medium,
  },
})

interface ChatPanelConversationsProps {
  navigation: StackNavigationProp<
    NavigationRoute<NavigationParams>,
    NavigationParams
  >
}

const ChatPanelConversations: React.FC<ChatPanelConversationsProps> = ({
  navigation,
}) => {
  const [
    conversations,
    conversationSelectedId,
  ] = useSelector((state: RootState) => [
    state.conversations,
    state.conversationSelectedId,
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
            contactSelected={conversationSelectedId === conversation._id}
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
