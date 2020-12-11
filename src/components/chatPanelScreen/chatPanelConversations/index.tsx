import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
// import { useSelector } from 'react-redux'
// import ChatPanelContact from '../chatPanelContact'

const styles = StyleSheet.create({
  chatPanelConversations: {
    flex: 1,
    backgroundColor: 'purple',
  },
})

const ChatPanelConversations = () => {
  // const conversations = useSelector((state) => state)

  // console.log('fff', conversations)

  return (
    <View style={styles.chatPanelConversations}>
      {/* {conversations.map((conversation) => {
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
            handleClick={() => {
              handleClickOnContact(conversation._id)
            }}
          />
        )
      })} */}
      <Text>PanelConversatin</Text>
    </View>
  )
}

export default ChatPanelConversations
