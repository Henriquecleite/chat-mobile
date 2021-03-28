import { StyleSheet } from 'react-native'
import COLORS from '../../../constants/colors'

const styles = StyleSheet.create({
  chatPanelContactWrapper: {
    flexDirection: 'row',
  },
  pictureWrapper: {
    width: 66,
    paddingVertical: 10,
    paddingLeft: 16,
  },
  picture: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: COLORS.green.medium,
  },
  contactFirstLetter: {
    color: COLORS.text.white,
    fontWeight: '700',
  },
  infoWrapper: {
    justifyContent: 'space-around',
    flex: 1,
    marginLeft: 16,
    paddingVertical: 10,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.navy.dark,
  },
  contactNameAndDateWrapper: {
    flexDirection: 'row',
  },
  contactName: {
    flex: 1,
    color: COLORS.text.white,
    fontSize: 16,
    fontWeight: '700',
  },
  lastMessageDate: {
    width: 44,
    color: COLORS.text.lightBlue,
    fontSize: 12,
  },
  lastMessageContentAndNotification: {
    flexDirection: 'row',
  },
  lastMessageContent: {
    flex: 1,
    color: COLORS.text.lightBlue,
    fontSize: 14,
  },
  notification: {
    width: 32,
  },
})

export default styles
