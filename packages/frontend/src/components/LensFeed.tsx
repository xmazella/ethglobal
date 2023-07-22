import useFeed from "../hooks/useFeed";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { styled } from "styled-components";
import commentLogo from "../assets/svgs/commentLogo.svg";
import hearthLogo from "../assets/svgs/hearthLogo.svg";
import shareLogo from "../assets/svgs/shareLogo.svg";
import collectLogo from "../assets/svgs/collectLogo.svg";
import {
  Column,
  Row,
  Text,
  isMediaSetFragment,
  sanitizeDStorageUrl,
} from "./Tools";

dayjs.extend(relativeTime);

const Container = styled(Column)`
  margin-top: 20px;
  margin-bottom: 20px;
  gap: 20px;
`;

const Feed = styled(Column)`
  position: relative;
  min-height: 100px;
  width: 100%;
  padding-left: 56px;
  gap: 20px;
`;

const ImgProfile = styled.img`
  position: absolute;
  left: 0;
  height: 40px;
  border-radius: 50%;
`;

const IconContainer = styled(Row)`
  gap: 24px;
`;

const Profile = styled(Column)`
  height: 40px;
  justify-content: center;

  ${Row} {
    align-items: center;
  }
`;

const Name = styled(Text)`
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.28px;
`;

const TagName = styled(Text)`
  font-weight: 500;
`;

const Dot = styled(Text)`
  font-weight: 500;
  margin: 0 4px;
`;

const Hr = styled.hr`
  width: 100%;
  border: 1px solid #b7fffa;
`;

const LensFeed: React.FC = () => {
  const { data, isLoading, error } = useFeed();

  if (isLoading) return <>Loading... ⏳</>;
  if (error) return <>Oups c'est cassé 🥲</>;

  return (
    <Container>
      {data?.items.map((i, n) => {
        const pfp = isMediaSetFragment(i.root.profile.picture)
          ? sanitizeDStorageUrl(i.root.profile.picture.original.url)
          : sanitizeDStorageUrl(
              i.root.profile.picture?.uri ? i.root.profile.picture.uri : ""
            );

        return (
          <>
            <Feed key={`${i.root.id}-${n}`}>
              <Row>
                <ImgProfile src={pfp} />
                <Profile>
                  <Name>{i.root.profile.name}</Name>
                  <Row>
                    <TagName>@{i.root.profile.handle}</TagName>
                    <Dot>·</Dot>
                    <Text>{dayjs(i.root.createdAt).fromNow()}</Text>
                  </Row>
                </Profile>
              </Row>
              <Text>{i.root.metadata.content}</Text>
              <IconContainer>
                <img src={commentLogo} />
                <img src={shareLogo} />
                <img src={hearthLogo} />
                <img src={collectLogo} />
              </IconContainer>
            </Feed>
            <Hr />
          </>
        );
      })}
    </Container>
  );
};

export default LensFeed;
