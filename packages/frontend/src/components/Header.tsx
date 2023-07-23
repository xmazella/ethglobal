"use client"

import { styled } from "styled-components"
import graphicUser from "../assets/svgs/graphicUser.svg"
import lensLogo from "../assets/svgs/lensLogo.svg"
import twitterLogo from "../assets/svgs/twitterLogo.svg"
import notificationLogo from "../assets/svgs/notificationLogo.svg"
import { Text } from "./Tools"
import { useNavigate } from "react-router"

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 140px;
`

const LogoContainer = styled.div`
  display: flex;
`

const Flex1 = styled.div`
  flex: 1;
`

const Logo = styled.div`
  flex: 3;
  color: #bcf8f4;
  font-family: Orbitron;
  font-size: 34px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  text-align: center;
`

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`

const Menu = styled.div`
  display: flex;
  flex: 3;
  justify-content: center;
  gap: 32px;
`

const Profile = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  align-items: center;
  gap: 32px;
`

const Company = styled.div`
  position: absolute;
  left: 150px;
  flex-shrink: 0;
  color: #bcf8f4;
  font-family: Orbitron;

  font-size: 28px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`

const Circle = styled.div`
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 50%;
  background: #ffffff;
  content: "";
`

const Logout = styled(Text)`
  display: flex;
  justify-content: flex-end;
  flex: 1;

  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0.36px;
  text-decoration-line: underline;
`

const Notification = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
`

const Header: React.FC<{}> = () => {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem("permissions")
    localStorage.removeItem("sismoConnectResponse")
    navigate("/login")
  }
  return (
    <HeaderContainer>
      <LogoContainer>
        <Flex1></Flex1>
        <Logo>ETH GLOBAL</Logo>
        <Logout onClick={logout}>Log out</Logout>
      </LogoContainer>
      <Content>
        <Profile>
          <img src={graphicUser} />
          <Company>COMPANY NAME</Company>
        </Profile>
        <Flex1></Flex1>
        <Menu>
          <img src={lensLogo} />
          <img src={twitterLogo} />
        </Menu>
        <Notification>
          <img src={notificationLogo} />
        </Notification>
      </Content>
    </HeaderContainer>
  )
}

export default Header
