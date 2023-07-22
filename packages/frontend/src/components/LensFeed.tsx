import useFeed from "../hooks/useFeed";

import commentLogo from "../assets/svgs/commentLogo.svg";
import hearthLogo from "../assets/svgs/hearthLogo.svg";
import shareLogo from "../assets/svgs/shareLogo.svg";
import collectLogo from "../assets/svgs/collectLogo.svg";
import { Column, Row, isMediaSetFragment } from "./Tools";
import { styled } from "styled-components";

const Tweet = styled.div`
  min-height: 100px;
  width: 100%;
`;

const ImgProfile = styled.img`
  height: 40px;
  border-radius: 50%;
`;

const LensFeed: React.FC = () => {
  const { data, isLoading, error } = useFeed();

  if (isLoading) return <>Chargement...</>;
  if (error) return <>Oups c'est cassé 🥲</>;

  return (
    <>
      {data?.items.map((i) => {
        console.log(i.root);

        const pfp = isMediaSetFragment(i.root.profile.picture)
          ? i.root.profile.picture.original.url
          : i.root.profile.picture?.uri;

        return (
          <Tweet key={i.root.id}>
            <Row>
              <ImgProfile src={pfp} />
              <Column>
                <div>{i.root.profile.name}</div>
                <Row>
                  <div>@{i.root.profile.handle}</div>*
                  <div>{i.root.createdAt}</div>
                </Row>
              </Column>
            </Row>
            {i.root.metadata.content}
            <Row>
              <img src={commentLogo} />
              <img src={shareLogo} />
              <img src={hearthLogo} />
              <img src={collectLogo} />
            </Row>
          </Tweet>
        );
      })}
    </>
  );
};

export default LensFeed;
