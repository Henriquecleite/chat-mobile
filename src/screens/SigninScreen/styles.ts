import { StyleSheet } from 'react-native'
import COLORS from '../../constants/colors'

const styles = StyleSheet.create({
  signinScreen: {
    flex: 1,
    backgroundColor: COLORS.navy.darker,
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
    backgroundColor: COLORS.navy.light,
  },
  formElementWrapper: {
    paddingTop: 32,
  },
  activityIndicatorWrapper: {
    position: 'absolute',
    top: '48%',
    left: '54%',
  },
  signupWrapper: {
    flexDirection: 'row',
    marginTop: 16,
  },
  signupText: {
    color: COLORS.text.lightBlue,
  },
  signupButton: {
    marginLeft: 4,
    color: COLORS.purple.medium,
  },
})

export default styles
