import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import colors from '../constants/colors'
import ChatPanelConversations from '../components/chatPanelScreen/chatPanelConversations'
import { getConversationsRequest } from '../services/conversation'
import { setConversations } from '../store/actions'
import { ChatPanelMode } from '../types'
import ChatPanelContactsSearch from '../components/chatPanelScreen/chatPanelContactsSearch'

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
  const [chatPanelMode, setChatPanelMode] = useState<ChatPanelMode>(
    'conversations'
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

  useEffect(() => {
    navigation.setParams({
      chatPanelMode,
      toggleChatPanelMode: () => {
        setChatPanelMode(
          chatPanelMode === 'conversations' ? 'contactsSearch' : 'conversations'
        )
      },
    })
  }, [chatPanelMode])

  return (
    <View style={styles.chatPanelScreen}>
      {chatPanelMode === 'conversations' ? (
        <ChatPanelConversations navigation={navigation} />
      ) : (
        <ChatPanelContactsSearch
          setChatPanelModeToConversations={() => {
            setChatPanelMode('conversations')
          }}
          navigation={navigation}
        />
      )}
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
      <TouchableOpacity
        style={styles.headerRightButtonWrapper}
        onPress={navigation.getParam('toggleChatPanelMode')}
      >
        <Ionicons
          name={
            navigation.getParam('chatPanelMode') === 'conversations'
              ? 'md-add'
              : 'ios-chatboxes'
          }
          color={colors.white}
          size={26}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.headerRightButtonWrapper}
        onPress={() => navigation.navigate('Signin')}
      >
        <Ionicons name="ios-log-out" color={colors.white} size={26} />
      </TouchableOpacity>
    </View>
  ),
})

export default ChatPanelScreen
