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
  contentTopic?: string
}

const initialState: Fetching = {
  data: undefined,
  error: undefined,
  isLoading: false,
}

const socket = io("http://localhost:3000")

function useChat() {
  const [state, setState] = useState<Fetching>(initialState)

  useEffect(() => {
    socket.emit("request-init")

    setState({ data: undefined, isLoading: true, error: false })

    socket.on("init", (conversations: SimpleConversation[]) => {
      console.debug(conversations)
      setState({ data: conversations, isLoading: false, error: false })
    })

    socket.on("message-received", (m: SimpleMessage) => {
      console.debug("a new message has been received", m)
      const toUpdate = state.data?.find(c => c.peerAddress === m.senderAddress)
      if (!toUpdate || !state.data) {
        return console.error("No conversation mathcing sender addr")
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
