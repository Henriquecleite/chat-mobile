import React, { useRef, useEffect, RefObject, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import {
  getYearMonthDayNumber,
  convertYearMonthDayNumberToWords,
  getHours,
  getMinutes,
} from '../../../utils/date'
import { Message, UserId } from '../../../types'
import styles from './styles'

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
