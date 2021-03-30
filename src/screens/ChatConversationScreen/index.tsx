import React, { useEffect } from 'react'
import { View } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { useSelector } from 'react-redux'
import COLORS from '../../constants/colors'
import ChatConversationMessages from '../../components/chatConversationScreen/chatConversationMessages'
import ChatConversationFooter from '../../components/chatConversationScreen/chatConversationFooter'
import { RootState } from '../../store/reducers'
import { Conversation } from '../../types'
import styles from './styles'

const ChatConversationScreen: NavigationStackScreenComponent = ({
  navigation,
}) => {
  const [
    userId,
    conversations,
    conversationSelectedId,
  ] = useSelector((state: RootState) => [
    state.general.userId,
    state.general.conversations,
    state.general.conversationSelectedId,
  ])

  const conversationSelected = conversations.find(
    (conversation) => conversation._id === conversationSelectedId
  ) as Conversation

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
    backgroundColor: COLORS.navy.light,
  },
  headerTintColor: COLORS.text.white,
})

export default ChatConversationScreen
