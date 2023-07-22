import { styled } from "styled-components";
import { Column } from "../components/Tools";
import LensFeed from "../components/LensFeed";
import Card from "../components/Card";
import LensPost from "../components/LensPost";
import Xmtp from "../components/Xmtp";
import Footer from "../components/Footer";
import Header from "../components/Header";
import RestrictedAccess from "../components/RestrictedAccess";

const MainContainer = styled.div`
  background: linear-gradient(180deg, #131e1d 0%, #203635 100%);
  padding: 20px 40px 0 40px;
  min-height: calc(100vh - 20px);
  margin: 0;
`;

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
    <MainContainer>
      <Header />
      <HomeContainer>
        <HomeColumn>
          <Card
            title="Create a post"
            tricksColorTop="#162322"
            tricksColorBottom="#1a2929"
          >
            <LensPost />
          </Card>
          <Card
            title="Feed"
            tricksColorTop="#1a2b2a"
            tricksColorBottom="#1f3534"
          >
            <LensFeed />
          </Card>
        </HomeColumn>
        <HomeColumn>
          <Card
            title="Messages"
            tricksColorTop="#162423"
            tricksColorBottom="#1a2929"
          >
            <Xmtp />
          </Card>
          <Card
            title="Subscribers management"
            tricksColorTop="#1a2b2a"
            tricksColorBottom="#1c2e2e"
          >
            <RestrictedAccess />
          </Card>
          <Card
            title="Account settings"
            tricksColorTop="#1d312f"
            tricksColorBottom="#203634"
          >
            <RestrictedAccess />
          </Card>
        </HomeColumn>
      </HomeContainer>
      <Footer />
    </MainContainer>
  );
};

export default Home;
