import { StyleSheet } from 'react-native'
import COLORS from '../../../constants/colors'

const styles = StyleSheet.create({
  chatPanelContactsSearchWrapper: {
    flex: 1,
    backgroundColor: COLORS.navy.medium,
  },
  chatPanelSearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.navy.dark,
  },
  contactTextInputWrapper: {
    flex: 1,
    marginLeft: 8,
  },
  noContactsFound: {
    marginTop: 24,
    color: COLORS.text.lightBlue,
    fontSize: 14,
    textAlign: 'center',
  },
})

export default styles
