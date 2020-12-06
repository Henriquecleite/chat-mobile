import React from 'react'
import {
  StyleSheet,
  View,
  TextInput as NativeTextInput,
  Text,
} from 'react-native'
import { validate } from '../../utils/validation'
import colors from '../../constants/colors'
import { ValueType } from '../../types'
import { FormElementNames } from '../../constants/formElementNames'

type TextContentType =
  | 'none'
  | 'URL'
  | 'addressCity'
  | 'addressCityAndState'
  | 'addressState'
  | 'countryName'
  | 'creditCardNumber'
  | 'emailAddress'
  | 'familyName'
  | 'fullStreetAddress'
  | 'givenName'
  | 'jobTitle'
  | 'location'
  | 'middleName'
  | 'name'
  | 'namePrefix'
  | 'nameSuffix'
  | 'nickname'
  | 'organizationName'
  | 'postalCode'
  | 'streetAddressLine1'
  | 'streetAddressLine2'
  | 'sublocality'
  | 'telephoneNumber'
  | 'username'
  | 'password'
  | undefined

type TextInputFormElementsValue = Record<string, string>

type TextInputFormElementsValidation = Record<string, boolean>

interface TextInputProps {
  name: FormElementNames
  type?: 'text' | 'password'
  valueType?: ValueType
  placeholder?: string
  label?: string
  textContentType?: TextContentType
  validationErrorMessage?: string
  formElementsValue: TextInputFormElementsValue
  setFormElementsValue: React.Dispatch<
    React.SetStateAction<TextInputFormElementsValue>
  >
  formElementsValidation?: TextInputFormElementsValidation
  setFormElementsValidation?: React.Dispatch<
    React.SetStateAction<TextInputFormElementsValidation>
  >
  formValidationVisibility?: boolean
  onChange?: (value: string) => void
}

const styles = StyleSheet.create({
  label: {
    paddingBottom: 10,
    color: colors.text.lightBlue,
  },
  textInput: {
    paddingLeft: 14,
    borderRadius: 4,
    backgroundColor: colors.navy.dark,
    color: colors.text.white,
  },
  validationError: {
    marginTop: 6,
    color: colors.red.medium,
    fontSize: 12,
    fontStyle: 'italic',
  },
})

const TextInput: React.FC<TextInputProps> = ({
  name,
  valueType,
  placeholder,
  textContentType,
  label,
  validationErrorMessage,
  formElementsValue,
  setFormElementsValue,
  formElementsValidation,
  setFormElementsValidation,
  formValidationVisibility,
  onChange,
}) => {
  const handleChange = (value: string) => {
    setFormElementsValue({
      ...formElementsValue,
      [name]: value,
    })

    if (setFormElementsValidation) {
      setFormElementsValidation({
        ...formElementsValidation,
        [name]: validate(value, valueType),
      })
    }

    if (onChange) {
      onChange(value)
    }
  }

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <NativeTextInput
        textContentType={textContentType}
        value={formElementsValue[name]}
        placeholder={placeholder}
        onChangeText={handleChange}
        style={styles.textInput}
      />
      {formValidationVisibility &&
        formElementsValidation &&
        !formElementsValidation[name] && (
          <Text style={styles.validationError}>
            {validationErrorMessage || 'Invalid field'}
          </Text>
        )}
    </View>
  )
}

export default TextInput
