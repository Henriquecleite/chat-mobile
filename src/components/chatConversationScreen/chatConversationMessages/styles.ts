import { StyleSheet } from 'react-native'
import COLORS from '../../../constants/colors'

const styles = StyleSheet.create({
  chatConversationMessagesWrapper: {
    height: '100%',
    paddingTop: 16,
    paddingHorizontal: 16,
    marginBottom: 4,
    backgroundColor: COLORS.navy.dark,
  },
  dateBadge: {
    alignSelf: 'center',
    marginTop: 8,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 16,
    backgroundColor: COLORS.navy.light,
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  messageWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    marginTop: 8,
    paddingTop: 6,
    paddingHorizontal: 7,
    paddingBottom: 3,
    borderRadius: 4,
  },
  sentMessageWrapper: {
    alignSelf: 'flex-end',
    marginLeft: 40,
    backgroundColor: COLORS.blue.light,
  },
  receivedMessageWrapper: {
    alignSelf: 'flex-start',
    marginRight: 40,
    backgroundColor: COLORS.navy.lighter,
  },
  messageContent: {
    color: COLORS.white,
    fontSize: 14,
  },
  messageTime: {
    marginTop: 5,
    marginLeft: 8,
    fontSize: 12,
  },
  sentMessageTime: {
    color: COLORS.blue.lighter,
  },
  receivedMessageTime: {
    color: COLORS.text.lightBlue,
  },
  space: {
    height: 16,
    color: COLORS.navy.dark,
  },
})
export default styles
