import { styled } from "styled-components"
import { MediaSetFragment } from "@lens-protocol/client"
import axios from "axios"

export const Row = styled.div`
  display: flex;
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`

export const Text = styled.div`
  color: #b7fffa;
  font-family: Prompt;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.24px;
`

export const isMediaSetFragment = (
  picture:
    | MediaSetFragment
    | {
        __typename: "NftImage"
        contractAddress: string
        tokenId: string
        uri: string
        verified: boolean
      }
    | null
): picture is MediaSetFragment => {
  return (picture as MediaSetFragment).original !== undefined
}

export const sanitizeDStorageUrl = (url: string) => {
  const ipfsGateway = `https://w3s.link/ipfs/`
  const arweaveGateway = `arweave.net/`

  return url
    .replace(/^Qm[1-9A-Za-z]{44}/gm, `${ipfsGateway}/${url}`)
    .replace("https://ipfs.io/ipfs", ipfsGateway)
    .replace("https://ipfs.infura.io/ipfs", ipfsGateway)
    .replace("ipfs://", ipfsGateway)
    .replace("ipfs://ipfs/", ipfsGateway)
    .replace("ar://", arweaveGateway)
}

export function createPost(body: string) {
  return axios.post("http://localhost:3000/postOnLens", { content: body })
}
