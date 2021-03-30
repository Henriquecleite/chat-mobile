import React from 'react'
import { registerRootComponent } from 'expo'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import Toast from 'react-native-toast-message'
import reducer from './src/store/reducer'
import rootSaga from './src/store/sagas'
import Navigator from './src/navigation/Navigator'

const sagaMiddleware = createSagaMiddleware()

const composedEnhancer = composeWithDevTools(applyMiddleware(sagaMiddleware))

const store = createStore(reducer, composedEnhancer)

sagaMiddleware.run(rootSaga)

const App = () => (
  <Provider store={store}>
    <Navigator />
    <Toast ref={(ref) => Toast.setRef(ref)} />
  </Provider>
)

registerRootComponent(App)
