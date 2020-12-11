import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import colors from '../constants/colors'
import ChatPanelConversations from '../components/chatPanelScreen/chatPanelConversations'
import { getConversationsRequest } from '../services/conversation'
import { setConversations } from '../store/actions'

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

const ChatPanelScreen: NavigationStackScreenComponent = () => {
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

    // if (apiURL) {
    //   socket = openSocket(apiURL)
    // }
  }, [])

  return (
    <View style={styles.chatPanelScreen}>
      <ChatPanelConversations />
    </View>
  )
}

ChatPanelScreen.navigationOptions = ({ navigation }) => ({
  title: 'AAA',
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
