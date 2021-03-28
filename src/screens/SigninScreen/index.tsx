import React, { useState } from 'react'
import { View, StatusBar, Button, ActivityIndicator, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { useDispatch } from 'react-redux'
import TextInput from '../../components/commons/textInput'
import COLORS from '../../constants/colors'
import { email, password } from '../../constants/formElementNames'
import { isFormValid } from '../../utils/validation'
import { signinRequest } from '../../services/auth'
import { setUserId, cons } from '../../store/actions'
import styles from './styles'

const validationErrorMessages = {
  [email]: 'Invalid email address',
  [password]: 'Invalid password',
}

const SigninScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const [formElementsValue, setFormElementsValue] = useState<
    Record<string, string>
  >({
    [email]: 'a@a.com', // return to ''
    [password]: '1234',
  })

  const [formElementsValidation, setFormElementsValidation] = useState<
    Record<string, boolean>
  >({
    [email]: true, // return to false
    [password]: true,
  })

  const [
    formValidationVisibility,
    setFormValidationVisibility,
  ] = useState<boolean>(false)

  const [loading, setLoading] = useState<boolean>(false)

  const dispatch = useDispatch()

  const handleClickOnSigninButton = async () => {
    if (!formValidationVisibility) {
      setFormValidationVisibility(true)
    }

    if (isFormValid(formElementsValidation)) {
      setLoading(true)

      const response = await signinRequest(
        formElementsValue[email],
        formElementsValue[password]
      )

      setLoading(false)

      if (response.success) {
        const {
          data: { userId, userName, token },
        } = response

        await AsyncStorage.setItem('userId', userId)
        await AsyncStorage.setItem('userName', userName)
        await AsyncStorage.setItem('token', token)

        dispatch(setUserId(userId))

        navigation.navigate('ChatPanel', {
          userName,
        })
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
      <StatusBar backgroundColor={COLORS.navy.darkest} />
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
            onPress={handleClickOnSigninButton}
            title="Login"
            color={COLORS.purple.medium}
          />
        </View>
        <View style={styles.signupWrapper}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <Text
            style={styles.signupButton}
            onPress={() => dispatch(cons())}
            // onPress={() => navigation.navigate('Signup')}
          >
            Sign Up
          </Text>
        </View>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={loading}
            color={COLORS.white}
            size="large"
          />
        </View>
      </View>
    </View>
  )
}

SigninScreen.navigationOptions = {
  headerShown: false,
}

export default SigninScreen
