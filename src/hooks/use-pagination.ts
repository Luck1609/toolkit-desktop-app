import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom'
import qs from 'query-string'
import http from '@/lib/http';

type PaginationState = {
  page: number, 
  pageSize: number, 
  data: any, 
  total: number, 
  pageCount: number, 
}

export interface PaginationMeta {
  current_page: number, 
  per_page: number, 
  total: number, 
  to: number, 
  setValue: (name: string, value: number) => void
  // next?: () => void,
  // prev?: () => void,
  // onPageSizeChange?: (value: number) => void,
}


interface FetchData {
  pagination: PaginationState,
  url: string | null;
  query: string | null;
}

const fetchPaginationData = async<QueryData>({ pagination, url, query }: FetchData) => {
  const result = await http.get<{ data: QueryData, meta: PaginationMeta }>(`${url}?${query}`)

  if (result?.status === 'success') {
    const { data, ...meta } = result.data
    const pageCount = result?.data?.meta ? Number(Math.ceil(result?.data.meta.total / pagination.pageSize)) : pagination.pageCount
console.log('Use pagination data', result?.data)
    return {
      ...pagination,
      data,
      total: result.data?.total ?? pagination.total,
      page: result.data.current_page
      // pageCount
    }
  }
}

export default function usePagination<QueryData>() {
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: 10,
    total: 0,
    pageCount: 1,
    data: null
  })
  const [url, setUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [params, setParams] = useSearchParams()


  const urlQueryParams = useMemo(() => {
    const formattedParams = {}

    for (const [key, value] of params.entries()) {
      formattedParams[key] = value
    }
    return formattedParams
  }, [params])




  const query = qs.stringify(urlQueryParams, { skipEmptyString: true })

  const fetchData = async () => {
    setIsLoading(true)
    const stateUpdate = await fetchPaginationData<QueryData>({pagination, query, url})
    setPagination(stateUpdate)
    setIsLoading(false)
  }

  const updateURL = (name: string, value: string) => {
    const newQuery = qs.stringify({
      ...urlQueryParams,
      [name]: value
    })

    setParams(
      newQuery
    )
  }


  useEffect(() => {
    if (url) {
      fetchData()
    }
  }, [url, query])


  const setURL = (url: string) => setUrl(url)

  return { pagination, setURL, updateURL, isLoading }
}
