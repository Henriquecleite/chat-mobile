import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import SigninScreen from '../screens/SigninScreen'
import SignupScreen from '../screens/SignupScreen'
import ChatPanelScreen from '../screens/ChatPanelScreen'
import ChatConversationScreen from '../screens/ChatConversationScreen'

const AuthStack = createStackNavigator({
  Signin: SigninScreen,
  Signup: SignupScreen,
})

const AppStack = createStackNavigator({
  ChatPanel: ChatPanelScreen,
  ChatConversation: ChatConversationScreen,
})

const Navigator = createSwitchNavigator({
  Auth: AuthStack,
  App: AppStack,
})

export default createAppContainer(Navigator)
