import { Column, Text } from "./Tools";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { styled } from "styled-components";
import useChat from "../hooks/useMessages";
import Address from "./Address";
import EnsImage from "./EnsImage";
dayjs.extend(relativeTime);

const Container = styled(Column)`
  margin-top: 20px;
  gap: 20px;
  height: 229px;
`;

const Hr = styled.div`
  width: 100%;
  border: 1px solid #b7fffa;
  margin: 0;
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Gap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Profile = styled.div`
  display: flex;
  gap: 10px;
`;

const TagName = styled(Text)`
  font-weight: 500;
`;

const Dot = styled(Text)`
  font-weight: 500;
  margin: 0 4px;
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
          chat.data?.map((conversation) => {
            const latestMessage =
              conversation.messages[conversation.messages.length - 1];

            return (
              <Message key={conversation.topic}>
                <Gap>
                  <Profile>
                    <EnsImage address={conversation.peerAddress} />

                    <TagName>
                      @<Address address={conversation.peerAddress} />
                    </TagName>
                    <Dot>·</Dot>
                    <Text>{dayjs(conversation.createdAt).fromNow()}</Text>
                  </Profile>
                  <Text>{latestMessage.content}</Text>
                </Gap>
                <Hr />
              </Message>
            );
          })}
      </>
    </Container>
  );
};

export default Xmtp;
