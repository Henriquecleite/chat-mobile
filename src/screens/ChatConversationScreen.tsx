import React from 'react'
import { View, StyleSheet } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { useSelector } from 'react-redux'
import colors from '../constants/colors'
import ChatConversationMessages from '../components/chatConversationsScreen/chatConversationMessages'
import { RootState } from '../store/reducer'
import ChatConversationFooter from '../components/chatConversationsScreen/chatConversationFooter'

const styles = StyleSheet.create({
  chatConversationScreen: {
    paddingBottom: 66,
    backgroundColor: colors.navy.dark,
  },
})

const ChatConversationScreen: NavigationStackScreenComponent = () => {
  const [
    userId,
    conversations,
    conversationSelectedId,
  ] = useSelector((state: RootState) => [
    state.userId,
    state.conversations,
    state.conversationSelectedId,
  ])

  const conversationSelected = conversations.find(
    (conversation) => conversation._id === conversationSelectedId
  )

  const conversationSelectedMessages = conversationSelected
    ? conversationSelected.messages
    : []

  return (
    <View style={styles.chatConversationScreen}>
      <ChatConversationMessages
        userId={userId}
        messages={conversationSelectedMessages}
      />
      <ChatConversationFooter conversationSelectedId={conversationSelectedId} />
    </View>
  )
}

ChatConversationScreen.navigationOptions = () => ({
  title: 'Teste',
  headerStyle: {
    backgroundColor: colors.navy.light,
  },
  headerTintColor: colors.text.white,
})

export default ChatConversationScreen
