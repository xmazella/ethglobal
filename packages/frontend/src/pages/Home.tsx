import { styled } from "styled-components"
import useFeed from "../hooks/useFeed"
import { useEffect } from "react"

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
  const { data, isLoading, error } = useFeed()
  useEffect(() => console.debug(data), [data])

  return (
    <HomeContainer>
      <Column>
        <Card>Block Post</Card>
        <Card>
          <Tweet>1</Tweet>
          <Tweet>2</Tweet>
          <Tweet>3</Tweet>
          <Tweet>4</Tweet>
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

export default Home
