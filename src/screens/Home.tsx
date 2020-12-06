import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  StatusBar,
  Button,
  ActivityIndicator,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import colors from '../constants/colors'
import { email, password } from '../constants/formElementNames'
import TextInput from '../components/textInput'
import { isFormValid } from '../utils/validation'
import { signinRequest } from '../services/auth'

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: colors.navy.darker,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeForm: {
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

const Home = () => {
  const [formElementsValue, setFormElementsValue] = useState<
    Record<string, string>
  >({
    [email]: '',
    [password]: '',
  })

  const [formElementsValidation, setFormElementsValidation] = useState<
    Record<string, boolean>
  >({
    [email]: false,
    [password]: false,
  })

  const [
    formValidationVisibility,
    setFormValidationVisibility,
  ] = useState<boolean>(false)

  const [loading, setLoading] = useState<boolean>(false)

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

        // history.push(routesPath.chat)
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
    <View style={styles.home}>
      <StatusBar backgroundColor={colors.navy.darkest} />
      <View style={styles.homeForm}>
        <View style={styles.formElementWrapper}>
          <TextInput
            name={email}
            valueType="email"
            label="E-MAIL"
            validationErrorMessage={validationErrorMessages[email]}
            textContentType="emailAddress"
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
            validationErrorMessage={validationErrorMessages[password]}
            textContentType="password"
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

export default Home
