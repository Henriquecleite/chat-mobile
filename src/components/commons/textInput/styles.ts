import { StyleSheet } from 'react-native'
import COLORS from '../../../constants/colors'

const styles = StyleSheet.create({
  label: {
    paddingBottom: 10,
    color: COLORS.text.lightBlue,
  },
  textInput: {
    paddingLeft: 14,
    borderRadius: 4,
    color: COLORS.text.white,
  },
  defaultTextInput: {
    backgroundColor: COLORS.navy.dark,
  },
  clearTextInput: {
    backgroundColor: 'transparent',
  },
  validationError: {
    marginTop: 6,
    color: COLORS.red.medium,
    fontSize: 12,
    fontStyle: 'italic',
  },
})

export default styles
