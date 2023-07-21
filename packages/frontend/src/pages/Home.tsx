import { styled } from "styled-components"
import useFeed from "../hooks/useFeed"

const HomeContainer = styled.div`
  display: flex;
  min-width: 100vw;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  gap: 36px;
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
  padding: 36px;
  min-height: 200px;
  min-width: 400px;
  background: green;
`

const Tweet = styled.div`
  min-height: 100px;
  width: 100%;
  background: white;
`

const Home: React.FC<{}> = () => {
  return (
    <HomeContainer>
      <Column>
        <Card>Block Post</Card>
        <Card>
          <FeedItems />
        </Card>
      </Column>
      <Column>
        <Card>Message</Card>
        <Card>Following / Sub</Card>
        <Card>Account Settings</Card>
      </Column>
    </HomeContainer>
  )
}

const FeedItems: React.FC = () => {
  const { data, isLoading, error } = useFeed()

  if (isLoading) return <>Chargement...</>
  if (error) return <>Oups c'est cassé 🥲</>

  return (
    <>
      {data?.items.map(i => (
        <Tweet>{i.root.metadata.content}</Tweet>
      ))}
    </>
  )
}

export default Home
