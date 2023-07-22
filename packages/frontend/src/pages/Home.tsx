import { styled } from "styled-components";
import { Column, createPost } from "../components/Tools";
import LensFeed from "../components/LensFeed";
import Card from "../components/Card";
import { useState } from "react";
import useChat from "../hooks/useMessages";

const HomeContainer = styled.div`
  display: flex;
  padding-top: 62px;
  gap: 32px;
`;

const HomeColumn = styled(Column)`
  align-items: center;
  width: 50%;
  gap: 36px;
`;

const Home: React.FC<{}> = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onCreate = async () => {
    setIsLoading(true);
    await createPost("// TODO");
    setIsLoading(false);
  };

  const chat = useChat();

  return (
    <HomeContainer>
      <HomeColumn>
        <Card
          title="Create a post"
          tricksColorTop="#162322"
          tricksColorBottom="#1a2929"
        >
          <button onClick={onCreate}>
            Post on lens
            {isLoading && " ⏳"}
          </button>
        </Card>
        <Card title="Feed" tricksColorTop="#1a2b2a" tricksColorBottom="#1f3534">
          <LensFeed />
        </Card>
      </HomeColumn>
      <HomeColumn>
        <Card
          title="Messages"
          tricksColorTop="#162423"
          tricksColorBottom="#1a2929"
        >
          <></>
          <>
            {chat.isLoading && <p>Chargement... ⏳</p>}
            {!chat.isLoading &&
              // TODO: order by most recent conversation
              chat.data?.map((conversation) => {
                const latestMessage =
                  conversation.messages[conversation.messages.length - 1];
                return (
                  <div key={conversation.topic}>
                    <div>{conversation.peerAddress}</div>
                    <div>{latestMessage.content}</div>
                  </div>
                );
              })}
          </>
        </Card>
        <Card
          title="Subscribers management"
          tricksColorTop="#1a2b2a"
          tricksColorBottom="#1c2e2e"
        >
          <></>
        </Card>
        <Card
          title="Account settings"
          tricksColorTop="#1d312f"
          tricksColorBottom="#203634"
        >
          <></>
        </Card>
      </HomeColumn>
    </HomeContainer>
  );
};

export default Home;
