import React, { useState, useEffect } from 'react'
import { View, StatusBar, Button, ActivityIndicator, Text } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-native-toast-message'
import TextInput from '../../components/commons/textInput'
import COLORS from '../../constants/colors'
import { email, password } from '../../constants/formElementNames'
import { isFormValid } from '../../utils/validation'
import { signin, setSigninLoading, resetSigninData } from '../../store/actions'
import styles from './styles'
import { RootState } from '../../store/reducers'

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

  const [
    userName,
    signinLoading,
    signinSuccess,
    signinFailure,
  ] = useSelector((state: RootState) => [
    state.general.userName,
    state.signin.signinLoading,
    state.signin.signinSuccess,
    state.signin.signinFailure,
  ])

  const dispatch = useDispatch()

  useEffect(() => {
    if (signinSuccess) {
      navigation.navigate('ChatPanel', {
        userName,
      })
    } else if (signinFailure) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Invalid email or password',
      })
    }

    if (signinSuccess || signinFailure) {
      dispatch(resetSigninData())
    }
  }, [signinSuccess, signinFailure])

  const handleClickOnSigninButton = async () => {
    if (!formValidationVisibility) {
      setFormValidationVisibility(true)
    }

    if (isFormValid(formElementsValidation)) {
      dispatch(setSigninLoading())

      dispatch(signin(formElementsValue[email], formElementsValue[password]))
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
            onPress={() => navigation.navigate('Signup')}
          >
            Sign Up
          </Text>
        </View>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={signinLoading}
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
