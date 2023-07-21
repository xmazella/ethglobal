type SismoConnectResponse = {
  // the appId registered in the Factory
  appId: string
  // Sismo Connect version
  version: string
  // service from which the proof is requested
  namespace?: string
  signedMessage?: string
  proofs: SismoConnectProof[]
}

type SismoConnectProof = {
  auths?: Auth[]
  claims?: Claim[]
  provingScheme: string
  proofData: string
  extraData: any
}
