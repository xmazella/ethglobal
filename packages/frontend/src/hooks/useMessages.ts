import { useEffect, useState } from "react"
import { io } from "socket.io-client"

type Fetching = {
  data: unknown
  error: unknown
  isLoading: boolean
}

const initialState: Fetching = {
  data: undefined,
  error: undefined,
  isLoading: false,
}

function useChat() {
  console.debug("useChat")
  const [state] = useState<Fetching>(initialState)

  useEffect(() => {
    const socket = io("http://localhost:3000")

    socket.emit("connection")

    socket.on("message-received", () => {
      console.debug("a new message has been received")
    })

    // 3. Send event when sender want to send new messages
  }, [])

  return state
}

export default useChat
