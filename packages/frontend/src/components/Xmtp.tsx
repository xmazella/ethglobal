import { Column, Text } from "./Tools";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { styled } from "styled-components";
import useChat from "../hooks/useMessages";
import Address from "./Address";
import EnsImage from "./EnsImage";
import { Controls, Player } from "@lottiefiles/react-lottie-player";
import loader from "../assets/loader.json";
import { useState } from "react";
dayjs.extend(relativeTime);

const Container = styled(Column)`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 20px;
  padding-top: 20px;
  height: 229px;
  width: 100%:
`;

const Hr = styled.div`
  width: 100%;
  border: 1px solid #b7fffa;
  margin: 0;
`;

const Message = styled.div`
  position: relative;
  width: 100%;
  padding-left: 56px;
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

const XmtpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Xmtp: React.FC = () => {
  const chat = useChat();

  const [isAnimationFinished, setIsAnimationFinished] =
    useState<boolean>(false);

  if (!isAnimationFinished && chat.isLoading)
    return (
      <Container>
        <Player
          loop
          autoplay
          onEvent={(event) => {
            if (event === "complete") {
              setIsAnimationFinished(true);
            }
          }}
          src={loader}
          style={{ height: "300px", width: "300px" }}
        >
          <Controls
            visible={true}
            buttons={["play", "repeat", "frame", "debug"]}
          />
        </Player>
      </Container>
    );

  return (
    <Container>
      <>
        {!chat.isLoading &&
          chat.data?.map((conversation) => {
            const latestMessage =
              conversation.messages[conversation.messages.length - 1];

            return (
              <XmtpWrapper key={conversation.topic}>
                <Message>
                  <Gap>
                    <EnsImage address={conversation.peerAddress} />
                    <Profile>
                      <TagName>
                        @<Address address={conversation.peerAddress} />
                      </TagName>
                      <Dot>·</Dot>
                      <Text>{dayjs(conversation.createdAt).fromNow()}</Text>
                    </Profile>
                    <Text>{latestMessage.content}</Text>
                  </Gap>
                </Message>
                <Hr />
              </XmtpWrapper>
            );
          })}
      </>
    </Container>
  );
};

export default Xmtp;
