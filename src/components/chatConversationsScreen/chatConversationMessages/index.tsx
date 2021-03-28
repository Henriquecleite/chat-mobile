import React, { useRef, useEffect, RefObject, useState } from 'react'
import { StyleSheet, ScrollView, Text, View } from 'react-native'
import {
  getYearMonthDayNumber,
  convertYearMonthDayNumberToWords,
  getHours,
  getMinutes,
} from '../../../utils/date'
import COLORS from '../../../constants/colors'
import { Message, UserId } from '../../../types'

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

interface MessageAndDateBadge {
  _id: string
  content: string
  date?: number
  userId?: string
  hourAndMinuteDate?: string
  dateBadge?: boolean
}

const addDateBadges = (messages: Message[]) => {
  const messagesWithNumericDate = messages.map((msg) => {
    return {
      ...msg,
      numericDate: getYearMonthDayNumber(msg.date),
    }
  })

  const dateBadges = messagesWithNumericDate
    .map((msg, index) => {
      if (
        !index ||
        msg.numericDate !== messagesWithNumericDate[index - 1].numericDate
      ) {
        return {
          index,
          date: msg.date,
          numericDate: msg.numericDate,
        }
      }
      return false
    })
    .filter((dayBadge) => dayBadge)

  const messagesAndDateBadges: MessageAndDateBadge[] = messages.map((msg) => {
    const date = new Date(msg.date)

    const newMsg = {
      ...msg,
      hourAndMinuteDate: `${getHours(date)}:${getMinutes(date)}`,
    }

    return newMsg
  })

  let dateBadgeSpliceIncrement = 0

  dateBadges.forEach((dateBadge) => {
    if (dateBadge) {
      const dateBadgeContent = convertYearMonthDayNumberToWords(
        dateBadge.numericDate
      )

      messagesAndDateBadges.splice(
        dateBadge.index + dateBadgeSpliceIncrement,
        0,
        {
          _id: `${dateBadge.date}${dateBadge.index}`,
          content: dateBadgeContent,
          dateBadge: true,
        }
      )
    }

    dateBadgeSpliceIncrement += 1
  })

  return messagesAndDateBadges
}

interface ChatConversationMessagesProps {
  userId: UserId
  messages: Message[]
}

const ChatConversationMessages: React.FC<ChatConversationMessagesProps> = ({
  userId,
  messages,
}) => {
  const [lastMessageId, setLastMessageId] = useState('')

  const scrollViewRef = useRef() as RefObject<ScrollView>

  const scrollToEnd = () => {
    scrollViewRef.current?.scrollToEnd({ animated: false })
  }

  useEffect(() => {
    const newLastMessage = messages[messages.length - 1]

    const newLastMessageId = newLastMessage && newLastMessage._id

    if (newLastMessageId !== lastMessageId) {
      scrollToEnd()

      setLastMessageId(newLastMessageId)
    }
  }, [messages])

  const messagesAndDateBadges = addDateBadges(messages)

  return (
    <ScrollView
      onLayout={scrollToEnd}
      ref={scrollViewRef}
      style={styles.chatConversationMessagesWrapper}
    >
      {messagesAndDateBadges.map((msg) =>
        msg.dateBadge ? (
          <Text style={styles.dateBadge} key={msg._id}>
            {msg.content}
          </Text>
        ) : (
          <View
            style={[
              styles.messageWrapper,
              msg.userId === userId
                ? styles.sentMessageWrapper
                : styles.receivedMessageWrapper,
            ]}
            key={msg._id}
          >
            <Text style={styles.messageContent}>{msg.content}</Text>
            <Text
              style={[
                styles.messageTime,
                msg.userId === userId
                  ? styles.sentMessageTime
                  : styles.receivedMessageTime,
              ]}
            >
              {msg.hourAndMinuteDate}
            </Text>
          </View>
        )
      )}
      <Text style={styles.space}>-</Text>
    </ScrollView>
  )
}

export default ChatConversationMessages
