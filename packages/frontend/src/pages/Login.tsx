import {
  SismoConnectButton,
  SismoConnectConfig,
  AuthType,
  // ClaimType,
  SismoConnectResponse,
} from "@sismo-core/sismo-connect-react"
import { styled } from "styled-components"

import { useNavigate } from "react-router-dom"
import axios from "axios"

const config: SismoConnectConfig = {
  appId: "0xafabec94b12842146d5f06acaac25ccd",
}

const Main = styled.main`
  display: flex;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(180deg, #131e1d 0%, #203635 100%);
`

const Svg = styled.div`
  width: 1400px;
  height: 100%;
  background-image: url(/src/assets/svgs/loginPage.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-origin: center;
`

const SismoWrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  .sismoConnectButton {
    background: #b7fffa;
  }

  .sismoConnectButtonText {
    color: #131d1d;
    text-align: center;
    font-family: Prompt;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.4px;
  }
`

interface ApiResponse {
  permissions: {
    xmtp: boolean
    postOnLens: boolean
  }
}

export default function Login() {
  const navigate = useNavigate()

  const onSuccess = async (s: SismoConnectResponse) => {
    try {
      console.debug({ s })
      const { data } = await axios.post<ApiResponse>(
        "http://localhost:3000/login",
        s
      )
      console.debug(data)
      localStorage.setItem("permissions", JSON.stringify(data.permissions))
      localStorage.setItem("sismoConnectResponse", JSON.stringify(s))
      navigate("/")
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Main>
      <Svg>
        <Connect callback={onSuccess} />
      </Svg>
    </Main>
  )
}

type ConnectProps = { callback: (res: SismoConnectResponse) => void }
const Connect = (props: ConnectProps) => (
  <SismoWrapper>
    <SismoConnectButton
      config={config}
      auth={{ authType: AuthType.VAULT }}
      claims={[
        { groupId: "0x75e135ba6f62b00a7ae194920ff8a665" }, // basique
        { groupId: "0x078b5d9514580634859c634c9f9dff4f", isOptional: true }, // xmtp
        { groupId: "0xf4777295c7afbdf16e6bd43c93ddcdb5", isOptional: true }, // post on lens
      ]}
      signature={{ message: "Connect using sismo", isSelectableByUser: true }}
      onResponse={props.callback}
    />
  </SismoWrapper>
)
