// const getOwnerName = async (address: string) => {
//   const provider = new JsonRpcProvider("https://rpc.ankr.com/eth")
//   return await provider.lookupAddress(address)
// }

import { JsonRpcProvider } from "ethers"
import { useEffect, useState } from "react"

type AddressProps = {
  address: string
}

const provider = new JsonRpcProvider("https://rpc.ankr.com/eth")

export default function Address(props: AddressProps) {
  const { address } = props
  const formattedAddress = `${address.slice(0, 5)}...${address.slice(-4)}`
  const [ens, setEns] = useState("")

  useEffect(() => {
    provider.lookupAddress(address).then(res => setEns(res || ""))
  }, [address, setEns])

  return <>{ens || formattedAddress}</>
}
