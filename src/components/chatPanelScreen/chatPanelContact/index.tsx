import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import getInitialCapitalized from '../../../utils/string'
import colors from '../../../constants/colors'

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
    backgroundColor: colors.green.medium,
  },
  contactFirstLetter: {
    color: colors.text.white,
    fontWeight: '700',
  },
  infoWrapper: {
    justifyContent: 'space-around',
    flex: 1,
    marginLeft: 16,
    paddingVertical: 10,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.navy.dark,
  },
  contactNameAndDateWrapper: {
    flexDirection: 'row',
  },
  contactName: {
    flex: 1,
    color: colors.text.white,
    fontSize: 16,
    fontWeight: '700',
  },
  lastMessageDate: {
    width: 44,
    color: colors.text.lightBlue,
    fontSize: 12,
  },
  lastMessageContentAndNotification: {
    flexDirection: 'row',
  },
  lastMessageContent: {
    flex: 1,
    color: colors.text.lightBlue,
    fontSize: 14,
  },
  notification: {
    width: 32,
  },
})

interface ChatPanelContactProps {
  contactName: string
  lastMessageDate?: string
  lastMessageContent?: string
  handlePress: () => void
}

const ChatPanelContact: React.FC<ChatPanelContactProps> = ({
  contactName,
  lastMessageDate,
  lastMessageContent,
  handlePress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.chatPanelContactWrapper]}
      onPress={handlePress}
    >
      <View style={styles.pictureWrapper}>
        <View style={styles.picture}>
          <Text style={styles.contactFirstLetter}>
            {getInitialCapitalized(contactName)}
          </Text>
        </View>
      </View>
      <View style={styles.infoWrapper}>
        <View style={styles.contactNameAndDateWrapper}>
          <Text style={styles.contactName}>{contactName}</Text>
          {lastMessageDate && (
            <Text style={styles.lastMessageDate}>{lastMessageDate}</Text>
          )}
        </View>
        {lastMessageContent && (
          <View style={styles.lastMessageContentAndNotification}>
            <Text style={styles.lastMessageContent}>{lastMessageContent}</Text>
            <View style={styles.notification} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default ChatPanelContact
