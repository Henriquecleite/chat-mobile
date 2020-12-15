import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import openSocket from 'socket.io-client'
import colors from '../constants/colors'
import ChatPanelConversations from '../components/chatPanelScreen/chatPanelConversations'
import { getConversationsRequest } from '../services/conversation'
import { setConversations, updateConversations } from '../store/actions'
import { apiURL } from '../utils/request'
import { RootState } from '../store/reducer'
import { Conversation } from '../types'

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

let socket: SocketIOClient.Socket

const ChatPanelScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const conversationSelectedId = useSelector(
    (state: RootState) => state.conversationSelectedId
  )

  const dispatch = useDispatch()

  useEffect(() => {
    // setLoading(true)

    // setUserId(localStorageGet('userId'))

    // setUserName(localStorageGet('userName'))

    const fetchConversations = async () => {
      const { success, data } = await getConversationsRequest()
      // console.log('aquii', data)
      if (success) {
        dispatch(setConversations(data.conversations))

        // setLoading(false)
      } else {
        // const error = data
        // if (error === 'jwt malformed') {
        //   history.push(routesPath.home)
        // }
      }
    }

    fetchConversations()

    socket = openSocket(apiURL)
  }, [])

  useEffect(() => {
    socket.off('message')

    socket.on('message', (socketData: { conversation: Conversation }) => {
      dispatch(updateConversations(socketData.conversation))
    })
  }, [conversationSelectedId])

  return (
    <View style={styles.chatPanelScreen}>
      <ChatPanelConversations navigation={navigation} />
    </View>
  )
}

ChatPanelScreen.navigationOptions = ({ navigation }) => ({
  title: 'Teste',
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
