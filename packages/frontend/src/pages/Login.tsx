import { useState } from "react";
import {
  SismoConnectButton,
  SismoConnectConfig,
  // AuthType,
  // ClaimType,
  SismoConnectResponse,
} from "@sismo-core/sismo-connect-react"
import loginPage from "../assets/svgs/loginPage.svg";
import { styled } from "styled-components";

const config: SismoConnectConfig = {
  appId: "0xafabec94b12842146d5f06acaac25ccd",
  vault: {
    // For development purposes insert the Data Sources that you want to impersonate
    // Never use this in production
    impersonate: [
      // EVM Data Sources
      // "dhadrien.sismo.eth",
      // "leo21.sismo.eth",
      // "0xA4C94A6091545e40fc9c3E0982AEc8942E282F38",
      // "0x1b9424ed517f7700e7368e34a9743295a225d889",
      // Github Data Source
      // "github:lodig",
      // Twitter Data Source
      // "twitter:dhadrien_",
      // Telegram Data Source
      // "telegram:dhadrien",
    ],
  },
  // displayRawResponse: true, // this enables you to get access directly to the
  // Sismo Connect Response in the vault instead of redirecting back to the app
};

const Main = styled.main`
  background: linear-gradient(180deg, #131e1d 0%, #203635 100%);
`;

export default function Login() {
  const [proofs, setProofs] = useState<SismoConnectResponse["proofs"]>();

  return (
    <Main>
      <img src={loginPage} />
      {proofs ? (
        <Success proofs={proofs} />
      ) : (
        <Connect callback={(r) => setProofs(r.proofs)} />
      )}
    </Main>
  );
}

type ConnectProps = { callback: (res: SismoConnectResponse) => any };
const Connect = (props: ConnectProps) => (
  <>
    <SismoConnectButton
      config={config}
      auths={
        [
          // Anonymous identifier of the vault for this app
          // vaultId = hash(vaultSecret, appId).
          // full docs: https://docs.sismo.io/sismo-docs/build-with-sismo-connect/technical-documentation/vault-and-proof-identifiers
          // user is required to prove ownership of their vaultId for this appId
          // { authType: AuthType.VAULT },
          // { authType: AuthType.GITHUB },
          // { authType: AuthType.TWITTER, isOptional: true },
          // { authType: AuthType.TELEGRAM, userId: "875608110", isOptional: true },
        ]
      }
      claims={[
        { groupId: "0x75e135ba6f62b00a7ae194920ff8a665" }, // basique
        { groupId: "0x078b5d9514580634859c634c9f9dff4f", isOptional: true }, // xmtp
        { groupId: "0xf4777295c7afbdf16e6bd43c93ddcdb5", isOptional: true }, // post on lens
      ]}
      signature={{ message: "Connect using sismo", isSelectableByUser: true }}
      onResponse={props.callback}
    />
  </>
);

type SuccessProps = { proofs: any[] };
const Success = (props: SuccessProps) => {
  return (
    <>
      Vous êtes connecté 🎉
      <br />
      <pre>{JSON.stringify(props.proofs, null, 2)}</pre>
    </>
  );
};
