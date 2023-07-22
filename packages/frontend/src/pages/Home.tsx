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
        <Card title="Block Post">
          <></>
        </Card>
        <Card title="Feed">
          <LensFeed />
        </Card>
      </HomeColumn>
      <HomeColumn>
        <Card title="Message">
          <></>
        </Card>
        <Card title="Following / Sub">
          <></>
        </Card>
        <Card title="Account Settings">
          <></>
        </Card>
      </HomeColumn>
    </HomeContainer>
  );
};

export default Home;
