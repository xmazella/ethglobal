import { styled } from "styled-components";

export const Row = styled.div`
  display: flex;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const sanitizeDStorageUrl = (url: string) => {
  const ipfsGateway = `https://w3s.link/ipfs/`;
  const arweaveGateway = `arweave.net/`;

  return url
    .replace(/^Qm[1-9A-Za-z]{44}/gm, `${ipfsGateway}/${url}`)
    .replace("https://ipfs.io/ipfs", ipfsGateway)
    .replace("https://ipfs.infura.io/ipfs", ipfsGateway)
    .replace("ipfs://", ipfsGateway)
    .replace("ipfs://ipfs/", ipfsGateway)
    .replace("ar://", arweaveGateway);
};
