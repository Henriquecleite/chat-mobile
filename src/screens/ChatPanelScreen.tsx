import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import colors from '../constants/colors'
import ChatPanelConversations from '../components/chatPanelScreen/chatPanelConversations'
import { getConversationsRequest } from '../services/conversation'
import { setConversations } from '../store/actions'
import { RootState } from '../store/reducer'

const styles = StyleSheet.create({
  chatPanelScreen: {
    flex: 1,
  },
  headerRightButtons: {
    flexDirection: 'row',
  },
  headerRightButtonWrapper: {
    marginHorizontal: 20,
  },
})

const ChatPanelScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const conversationSelectedId = useSelector(
    (state: RootState) => state.conversationSelectedId
  )

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchConversations = async () => {
      const { success, data } = await getConversationsRequest()

      if (success) {
        dispatch(setConversations(data.conversations))
      } else {
        const error = data

        if (error === 'jwt malformed') {
          navigation.navigate('Signin')
        }
      }
    }

    fetchConversations()

    setInterval(fetchConversations, 10000)
  }, [])

  return (
    <View style={styles.chatPanelScreen}>
      <ChatPanelConversations navigation={navigation} />
    </View>
  )
}

ChatPanelScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('userName'),
  headerStyle: {
    backgroundColor: colors.navy.light,
  },
  headerTintColor: colors.text.white,
  headerRight: () => (
    <View style={styles.headerRightButtons}>
      <View style={styles.headerRightButtonWrapper}>
        <Ionicons
          name="md-add"
          color={colors.white}
          size={26}
          // onPress={() => console.log('addd')}
        />
      </View>
      <View style={styles.headerRightButtonWrapper}>
        <Ionicons
          name="ios-log-out"
          color={colors.white}
          size={26}
          onPress={() => navigation.navigate('Signin')}
        />
      </View>
    </View>
  ),
})

export default ChatPanelScreen
