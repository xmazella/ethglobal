import { useEffect, useState } from "react"
import { io } from "socket.io-client"

type Fetching = {
  data: undefined | SimpleConversation[]
  error: unknown
  isLoading: boolean
}

type SimpleConversation = {
  topic: string
  createdAt: Date
  peerAddress: string
  messages: Array<SimpleMessage>
}

type SimpleMessage = {
  senderAddress: string
  sent: Date
  content: string
  topic?: string
}

const initialState: Fetching = {
  data: undefined,
  error: undefined,
  isLoading: true,
}

const socket = io("http://localhost:3000")

function useChat() {
  const [state, setState] = useState<Fetching>(initialState)

  useEffect(() => {
    socket.emit("request-init")

    socket.on("init", (conversations: SimpleConversation[]) => {
      setState({ data: conversations, isLoading: false, error: false })
    })

    return () => {
      socket.removeAllListeners("init")
    }
  })

  useEffect(() => {
    socket.on("message-received", (m: SimpleMessage) => {
      if (!state.data) {
        return console.error("New message received but no conversations found")
      }

      const toUpdate = state.data.find(c => c.topic === m.topic)
      if (!toUpdate) {
        return console.error("Message does not match conversation")
      }

      toUpdate.messages = [...toUpdate.messages, m]
      setState({ ...state, data: [...state.data] })
    })

    return () => {
      socket.removeAllListeners("init")
      socket.removeAllListeners("message-received")
    }
  }, [state])

  return state
}

export default useChat
