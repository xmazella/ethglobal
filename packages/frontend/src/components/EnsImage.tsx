import { JsonRpcProvider } from "ethers";
import { useEffect, useState } from "react";
import { sanitizeDStorageUrl } from "./Tools";
import { styled } from "styled-components";
import glasses from "/src/assets/glasses.jpeg";

const ImgProfile = styled.img`
  position: absolute;
  left: 0;
  height: 40px;
  border-radius: 50%;
`;

type AddressProps = {
  address: string;
};

const provider = new JsonRpcProvider("https://rpc.ankr.com/eth");

export default function EnsImage(props: AddressProps) {
  const { address } = props;
  const formattedAddress = `${address.slice(0, 5)}...${address.slice(-4)}`;
  const [ens, setEns] = useState("");
  const [ensImgUrl, setEnsImgUrl] = useState("");

  useEffect(() => {
    const fetchEns = async () => {
      const ensName = await provider.lookupAddress(address);
      setEns(ensName || "");

      if (ensName) {
        const resolver = await provider.getResolver(ensName);
        const ipfsHash = await resolver?.getText("avatar");

        if (ipfsHash) {
          setEnsImgUrl(sanitizeDStorageUrl(`${ipfsHash}`));
        } else setEnsImgUrl(glasses);
      }
    };

    fetchEns();
  }, [address]);

  return <>{ensImgUrl && <ImgProfile src={ensImgUrl} alt="ENS avatar" />}</>;
}
