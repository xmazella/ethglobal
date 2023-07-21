import {
  LensClient,
  PublicationTypes,
  // development,
  production,
} from "@lens-protocol/client"
import { useEffect, useState } from "react"

const lensClient = new LensClient({ environment: production })

type Lol = {
  data: any
  error: any
  isLoading: boolean
}

const initialLol: Lol = {
  data: undefined,
  error: undefined,
  isLoading: false,
}

function useLensPosts(lensId: string) {
  const [api, setApi] = useState<Lol>(initialLol)

  useEffect(() => {
    async function fetcher() {
      setApi({ isLoading: true, data: undefined, error: undefined })
      try {
        const data = await lensClient.feed.fetch({
          profileId: lensId,
        })
        setApi({ data, error: undefined, isLoading: false })
        console.debug(
          `useLensPosts(${lensId}) > `,
          JSON.stringify(data, null, 2)
        )
      } catch (error) {
        setApi({ data: undefined, error, isLoading: false })
        console.error(`useLensPosts(${lensId}) > `, error)
      }
    }
    fetcher()
  }, [lensId])

  return api
}

export default useLensPosts
