import { Client } from "@xmtp/xmtp-js"
import { ethers } from "ethers"
import { Socket } from "socket.io"

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

require("dotenv").config()

export async function initXmtp(socket: Socket) {
  const { MUMBAI_RPC_URL, PRIVATE_KEY } = process.env

  const provider = new ethers.providers.JsonRpcProvider(MUMBAI_RPC_URL || "")
  const wallet = new ethers.Wallet(PRIVATE_KEY || "", provider)
  const xmtp = await Client.create(wallet, { env: "production" })
  const allConversations = await xmtp.conversations.list()

  const simplifiedConversations: SimpleConversation[] = []
  for (const conv of allConversations) {
    const messages = await conv.messages()
    simplifiedConversations.push({
      topic: conv.topic,
      createdAt: conv.createdAt,
      peerAddress: conv.peerAddress,
      messages: messages.map(m => ({
        senderAddress: m.senderAddress,
        sent: m.sent,
        content: m.content,
      })),
    })
  }
  socket.emit("init", simplifiedConversations)

  for await (const message of await xmtp.conversations.streamAllMessages()) {
    console.debug(`[${message.senderAddress}]: ${message.content}`)
    socket.emit("message-received", <SimpleMessage>{
      topic: message.conversation.topic,
      senderAddress: message.senderAddress,
      sent: message.sent,
      content: message.content,
    })
  }
}

// const conversation = await xmtp.conversations.newConversation(
//   "0x3F11b27F323b62B159D2642964fa27C46C841897"
// )

// Send a message
// await conversation.send("gm")
// Listen for new messages in the conversation
// for await (const message of await conversation.streamMessages()) {
// console.log(`[${message.senderAddress}]: ${message.content}`)
// }
