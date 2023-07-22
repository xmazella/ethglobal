import { styled } from "styled-components";
import { Column } from "../components/Tools";
import LensFeed from "../components/LensFeed";
import Card from "../components/Card";

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
  return (
    <HomeContainer>
      <HomeColumn>
        <Card title="Create a post">
          <></>
        </Card>
        <Card title="Feed">
          <LensFeed />
        </Card>
      </HomeColumn>
      <HomeColumn>
        <Card title="Account settings">
          <></>
        </Card>
        <Card title="Subscribers management">
          <></>
        </Card>
        <Card title="Account settings">
          <></>
        </Card>
      </HomeColumn>
    </HomeContainer>
  );
};

export default Home;
