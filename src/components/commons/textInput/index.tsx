import React from 'react'
import { View, TextInput as NativeTextInput, Text } from 'react-native'
import { validate } from '../../../utils/validation'
import COLORS from '../../../constants/colors'
import { ValueType } from '../../../types'
import { FormElementNames } from '../../../constants/formElementNames'
import styles from './styles'

type KeyboardType =
  | 'default'
  | 'email-address'
  | 'numeric'
  | 'phone-pad'
  | 'number-pad'
  | 'decimal-pad'
  | 'visible-password'
  | 'ascii-capable'
  | 'numbers-and-punctuation'
  | 'url'
  | 'name-phone-pad'
  | 'twitter'
  | 'web-search'

type TextInputFormElementsValue = Record<string, string>

type TextInputFormElementsValidation = Record<string, boolean>

interface TextInputProps {
  name: FormElementNames
  type?: 'text' | 'password'
  valueType?: ValueType
  variant?: 'default' | 'clear'
  placeholder?: string
  label?: string
  keyboardType?: KeyboardType
  secureTextEntry?: boolean
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

const TextInput: React.FC<TextInputProps> = ({
  name,
  valueType,
  variant = 'default',
  placeholder,
  keyboardType = 'default',
  secureTextEntry,
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
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        value={formElementsValue[name]}
        placeholder={placeholder}
        placeholderTextColor={COLORS.text.lightBlue}
        onChangeText={handleChange}
        style={[
          styles.textInput,
          variant === 'default'
            ? styles.defaultTextInput
            : styles.clearTextInput,
        ]}
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
