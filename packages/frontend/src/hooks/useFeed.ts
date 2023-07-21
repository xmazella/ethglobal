import { FeedItemFragment, PaginatedResult } from "@lens-protocol/client"
import { useEffect, useState } from "react"

type Fetching = {
  data: PaginatedResult<FeedItemFragment> | undefined
  error: unknown
  isLoading: boolean
}

const initialLol: Fetching = {
  data: undefined,
  error: undefined,
  isLoading: false,
}

function useFeed() {
  const [api, setApi] = useState<Fetching>(initialLol)

  useEffect(() => {
    async function fetcher() {
      setApi({ isLoading: true, data: undefined, error: undefined })
      try {
        const data = await (await fetch("http://127.0.0.1:3000/feed")).json()
        setApi({ data: data.value.items, error: undefined, isLoading: false })
        console.debug(`useFeed() > `, JSON.stringify(data, null, 2))
      } catch (error) {
        setApi({ data: undefined, error, isLoading: false })
        console.error(`useFeed() > `, error)
      }
    }
    fetcher()
  }, [])

  return api
}

export default useFeed
