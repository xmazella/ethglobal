import {
  SismoConnectButton,
  SismoConnectConfig,
  AuthType,
  // ClaimType,
  SismoConnectResponse,
} from "@sismo-core/sismo-connect-react"
import { useState } from "react"

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
      // "github:doliG",
      // Twitter Data Source
      // "twitter:dhadrien_",
      // Telegram Data Source
      // "telegram:dhadrien",
    ],
  },
  // displayRawResponse: true, // this enables you to get access directly to the
  // Sismo Connect Response in the vault instead of redirecting back to the app
}

export default function Login() {
  const [proofs, setProofs] = useState<SismoConnectResponse["proofs"]>()

  return (
    <main>
      <a href="/">Accueil</a>
      {proofs ? (
        <Success proofs={proofs} />
      ) : (
        <Connect callback={r => setProofs(r.proofs)} />
      )}
    </main>
  )
}

type ConnectProps = { callback: (res: SismoConnectResponse) => any }
const Connect = (props: ConnectProps) => (
  <>
    <p>Connectez vous avec sismo pour commencer</p>
    <SismoConnectButton
      config={config}
      auths={[
        // Anonymous identifier of the vault for this app
        // vaultId = hash(vaultSecret, appId).
        // full docs: https://docs.sismo.io/sismo-docs/build-with-sismo-connect/technical-documentation/vault-and-proof-identifiers
        // user is required to prove ownership of their vaultId for this appId
        { authType: AuthType.VAULT },
        // user is required to prove ownership of an EVM account from their vault
        // { authType: AuthType.EVM_ACCOUNT },
        // user is required to prove ownership of 0xa4c94a6091545e40fc9c3e0982aec8942e282f38
        // {
        //   authType: AuthType.EVM_ACCOUNT,
        //   userId: "0xa4c94a6091545e40fc9c3e0982aec8942e282f38", // impersonated
        // },
        // user is required to prove ownership of a GitHub account
        { authType: AuthType.GITHUB },
        // user can prove ownership of a Twitter account, optional
        { authType: AuthType.TWITTER, isOptional: true },
        // user can prove ownership of @dhadrien Telegram account, optional
        //                                   telegram of @dhadrien
        {
          authType: AuthType.TELEGRAM,
          userId: "875608110",
          isOptional: true,
        },
      ]}
      // we ask the user to sign a message
      signature={{ message: "Connect using sismo", isSelectableByUser: true }}
      // onResponseBytes calls a 'setResponse' function with the responseBytes returned by the Sismo Vault
      onResponse={props.callback}
    />
  </>
)

type SuccessProps = { proofs: any[] }
const Success = (props: SuccessProps) => {
  return (
    <>
      Vous êtes connecté 🎉
      <br />
      <pre>{JSON.stringify(props.proofs, null, 2)}</pre>
    </>
  )
}
