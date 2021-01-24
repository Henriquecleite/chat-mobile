import React from 'react'
import { registerRootComponent } from 'expo'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './src/store/reducer'
import Navigator from './src/navigation/Navigator'

const store = createStore(reducer)

const App = () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
)

registerRootComponent(App)
