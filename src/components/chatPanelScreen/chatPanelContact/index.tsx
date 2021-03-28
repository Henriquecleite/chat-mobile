import React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import getInitialCapitalized from '../../../utils/string'
import styles from './styles'

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
