import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { useSelector } from 'react-redux'
import colors from '../constants/colors'
import ChatConversationMessages from '../components/chatConversationsScreen/chatConversationMessages'
import { RootState } from '../store/reducer'
import ChatConversationFooter from '../components/chatConversationsScreen/chatConversationFooter'
import { Conversation } from '../types'

const styles = StyleSheet.create({
  chatConversationScreen: {
    paddingBottom: 66,
    backgroundColor: colors.navy.dark,
  },
})

const ChatConversationScreen: NavigationStackScreenComponent = ({
  navigation,
}) => {
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
  ) as Conversation

  // const conversationSelectedMessages = conversationSelected
  //   ? conversationSelected.messages
  //   : []

  useEffect(() => {
    navigation.setParams({ contactName: conversationSelected?.contactName })
  }, [])

  return (
    <View style={styles.chatConversationScreen}>
      <ChatConversationMessages
        userId={userId}
        messages={conversationSelected.messages}
      />
      <ChatConversationFooter
        conversationSelected={conversationSelected}
        conversations={conversations}
      />
    </View>
  )
}

ChatConversationScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('contactName'),
  headerStyle: {
    backgroundColor: colors.navy.light,
  },
  headerTintColor: colors.text.white,
})

export default ChatConversationScreen
