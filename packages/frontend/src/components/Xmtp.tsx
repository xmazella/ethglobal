import { Column, getOwnerName } from "./Tools";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { styled } from "styled-components";
import useChat from "../hooks/useMessages";
dayjs.extend(relativeTime);

const Container = styled(Column)`
  margin-top: 20px;
  gap: 20px;
`;

const Hr = styled.div`
  width: 100%;
  border: 1px solid #b7fffa;
`;

const Xmtp: React.FC = () => {
  const chat = useChat();

  if (chat.isLoading) {
    return <Container>Loading... ⏳</Container>;
  }

  return (
    <Container>
      <>
        {!chat.isLoading &&
          // TODO: order by most recent conversation
          chat.data?.map(async (conversation, n) => {
            const latestMessage =
              conversation.messages[conversation.messages.length - 1];

            // const name = await getOwnerName(conversation.peerAddress);

            console.log("conversation", conversation);
            return (
              <>
                <div key={`${conversation.topic}-${n}`}>
                  {/* <div>{name}</div> */}
                  <div>{dayjs(conversation.createdAt).fromNow()}</div>
                  <div>{latestMessage.content}</div>
                </div>
                <Hr />
              </>
            );
          })}
      </>
    </Container>
  );
};

export default Xmtp;
