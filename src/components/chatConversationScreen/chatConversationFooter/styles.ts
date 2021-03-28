import { StyleSheet } from 'react-native'
import COLORS from '../../../constants/colors'

const styles = StyleSheet.create({
  chatConversationFooterWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: COLORS.navy.light,
  },
  messageTextInputWrapper: {
    flex: 1,
  },
  sendButtonWrapper: {
    marginHorizontal: 10,
  },
})

export default styles
