import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  StatusBar,
  Button,
  ActivityIndicator,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { useDispatch } from 'react-redux'
import TextInput from '../components/commons/textInput'
import colors from '../constants/colors'
import { email, password } from '../constants/formElementNames'
import { isFormValid } from '../utils/validation'
import { signinRequest } from '../services/auth'
import { setUserId } from '../store/actions'

const styles = StyleSheet.create({
  signinScreen: {
    flex: 1,
    backgroundColor: colors.navy.darker,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signinForm: {
    width: 300,
    marginVertical: 0,
    marginHorizontal: 16,
    paddingHorizontal: 32,
    paddingBottom: 32,
    borderRadius: 4,
    backgroundColor: colors.navy.light,
  },
  formElementWrapper: {
    paddingTop: 32,
  },
  activityIndicatorWrapper: {
    position: 'absolute',
    top: '48%',
    left: '54%',
  },
})

const validationErrorMessages = {
  [email]: 'Invalid email address',
  [password]: 'Invalid password',
}

const SigninScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const [formElementsValue, setFormElementsValue] = useState<
    Record<string, string>
  >({
    [email]: 'a@a.com',
    [password]: '1234',
  })

  const [formElementsValidation, setFormElementsValidation] = useState<
    Record<string, boolean>
  >({
    [email]: true,
    [password]: true,
  })

  const [
    formValidationVisibility,
    setFormValidationVisibility,
  ] = useState<boolean>(false)

  const [loading, setLoading] = useState<boolean>(false)

  const dispatch = useDispatch()

  // const getStorage = async () => {
  //   const token = await AsyncStorage.getItem('token')

  //   console.log('tokenn', token)
  // }

  // useEffect(() => {
  //   // console.log('formElementsValue', formElementsValue)
  //   // console.log('formValidationVisibility', formValidationVisibility)
  //   getStorage()
  // })

  const handleClickOnLoginButton = async () => {
    if (!formValidationVisibility) {
      setFormValidationVisibility(true)
    }

    if (isFormValid(formElementsValidation)) {
      setLoading(true)

      const response = await signinRequest(
        formElementsValue[email],
        formElementsValue[password]
      )

      // console.log('response', response)

      setLoading(false)

      if (response.success) {
        const {
          data: { userId, userName, token },
        } = response

        await AsyncStorage.setItem('userId', userId)
        await AsyncStorage.setItem('userName', userName)
        await AsyncStorage.setItem('token', token)

        dispatch(setUserId(userId))

        navigation.navigate('ChatPanel')
      } else {
        const {
          data: { message },
        } = response

        if (message === 'email incorrect') {
          setFormElementsValidation({
            ...formElementsValidation,
            [email]: false,
          })
        } else if (message === 'password incorrect') {
          setFormElementsValidation({
            ...formElementsValidation,
            [password]: false,
          })
        }
      }
    }
  }

  return (
    <View style={styles.signinScreen}>
      <StatusBar backgroundColor={colors.navy.darkest} />
      <View style={styles.signinForm}>
        <View style={styles.formElementWrapper}>
          <TextInput
            name={email}
            valueType="email"
            label="E-MAIL"
            validationErrorMessage={validationErrorMessages[email]}
            keyboardType="email-address"
            formElementsValue={formElementsValue}
            setFormElementsValue={setFormElementsValue}
            formElementsValidation={formElementsValidation}
            setFormElementsValidation={setFormElementsValidation}
            formValidationVisibility={formValidationVisibility}
          />
        </View>
        <View style={styles.formElementWrapper}>
          <TextInput
            name={password}
            label="PASSWORD"
            secureTextEntry
            validationErrorMessage={validationErrorMessages[password]}
            formElementsValue={formElementsValue}
            setFormElementsValue={setFormElementsValue}
            formElementsValidation={formElementsValidation}
            setFormElementsValidation={setFormElementsValidation}
            formValidationVisibility={formValidationVisibility}
          />
        </View>
        <View style={styles.formElementWrapper}>
          <Button
            onPress={handleClickOnLoginButton}
            title="Login"
            color={colors.purple.medium}
          />
        </View>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={loading}
            color={colors.white}
            size="large"
          />
        </View>
      </View>
    </View>
  )
}

SigninScreen.navigationOptions = {
  title: 'Teste',
  headerShown: false,
}

export default SigninScreen
