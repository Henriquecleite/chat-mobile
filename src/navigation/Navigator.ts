import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import SigninScreen from '../screens/SigninScreen'
import ChatPanelScreen from '../screens/ChatPanelScreen'

const AuthStack = createStackNavigator({
  Signin: SigninScreen,
})

const AppStack = createStackNavigator({
  ChatPanel: ChatPanelScreen,
})

const Navigator = createSwitchNavigator({
  App: AppStack,
  Auth: AuthStack,
})

export default createAppContainer(Navigator)
