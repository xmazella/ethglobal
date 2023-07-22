import { Column } from "./Tools"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { styled } from "styled-components"
import useChat from "../hooks/useMessages"
import Address from "./Address"
dayjs.extend(relativeTime)

const Container = styled(Column)`
  margin-top: 20px;
  gap: 20px;
`

const Hr = styled.div`
  width: 100%;
  border: 1px solid #b7fffa;
`

const Xmtp: React.FC = () => {
  const chat = useChat()

  if (chat.isLoading) {
    return <Container>Loading... ⏳</Container>
  }

  return (
    <Container>
      <>
        {!chat.isLoading &&
          // TODO: order by most recent conversation
          chat.data?.map(conversation => {
            const latestMessage =
              conversation.messages[conversation.messages.length - 1]

            return (
              <>
                <div key={conversation.topic}>
                  <div>
                    <Address address={conversation.peerAddress} />
                  </div>
                  <div>{dayjs(conversation.createdAt).fromNow()}</div>
                  <div>{latestMessage.content}</div>
                </div>
                <Hr />
              </>
            )
          })}
      </>
    </Container>
  )
}

export default Xmtp
