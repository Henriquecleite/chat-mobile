import React, { useState, useEffect } from 'react'
import { View, StatusBar, Button, ActivityIndicator } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-native-toast-message'
import TextInput from '../../components/commons/textInput'
import COLORS from '../../constants/colors'
import { email, password, name } from '../../constants/formElementNames'
import { isFormValid } from '../../utils/validation'
import { signup, setSignupLoading, resetSignupData } from '../../store/actions'
import styles from './styles'
import { RootState } from '../../store/reducers'

const validationErrorMessages = {
  [email]: 'This email address already exists',
  [name]: 'Invalid name',
  [password]: 'Invalid password',
}

const SignupScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const [formElementsValue, setFormElementsValue] = useState<
    Record<string, string>
  >({
    [email]: '',
    [name]: '',
    [password]: '',
  })

  const [formElementsValidation, setFormElementsValidation] = useState<
    Record<string, boolean>
  >({
    [email]: false,
    [name]: false,
    [password]: false,
  })

  const [
    formValidationVisibility,
    setFormValidationVisibility,
  ] = useState<boolean>(false)

  const [
    userName,
    signupLoading,
    signupSuccess,
    signupFailure,
  ] = useSelector((state: RootState) => [
    state.general.userName,
    state.signup.signupLoading,
    state.signup.signupSuccess,
    state.signup.signupFailure,
  ])

  const dispatch = useDispatch()

  useEffect(() => {
    if (signupSuccess) {
      navigation.navigate('ChatPanel', {
        userName,
      })
    } else if (signupFailure) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'This email address already exists',
      })
    }

    if (signupSuccess || signupFailure) {
      dispatch(resetSignupData())
    }
  }, [signupSuccess, signupFailure])

  const handleClickOnSignupButton = async () => {
    if (!formValidationVisibility) {
      setFormValidationVisibility(true)
    }

    if (isFormValid(formElementsValidation)) {
      dispatch(setSignupLoading())

      dispatch(
        signup(
          formElementsValue[email],
          formElementsValue[name],
          formElementsValue[password]
        )
      )
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
            name={name}
            label="NAME"
            validationErrorMessage={validationErrorMessages[name]}
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
            onPress={handleClickOnSignupButton}
            title="Sign up"
            color={COLORS.purple.medium}
          />
        </View>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={signupLoading}
            color={COLORS.white}
            size="large"
          />
        </View>
      </View>
    </View>
  )
}

SignupScreen.navigationOptions = {
  headerShown: false,
}

export default SignupScreen
