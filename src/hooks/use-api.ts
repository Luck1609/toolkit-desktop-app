import { toast } from "@/components/ui/use-toast";
import http from "@/lib/http";
import { HttpMethods } from "@/lib/interface";
import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { useSWRConfig } from "swr";


export type ApiParams<PayloadData, ActionData, ErrAction> = {
  method: keyof HttpMethods,
  url: string,
  payload?: PayloadData | undefined,
  options?: AxiosRequestConfig,
  action?: ActionData | undefined,
  mutation: string,
  errAction?: ErrAction | undefined
}

export default function useAPI() {
  const [params, setParams] = useState<ApiParams<any, any, any> | null>(null)
  const { mutate } = useSWRConfig()

  const fetchData = async () => {
    if (params) {
      const { method, payload, url, options = {}, action, mutation } = params

      const result = await http[method](url, payload, options)

      if (result.status === 'success') {
        if (result?.message) toast({
          title: 'Action successful',
          description: result.message,
          status: 'success'
        })

        if (action) action(result?.data)
        if (mutation) mutate(mutation)
      } else {
        toast(result)
      }
    }
  }

  useEffect(() => {
    if (params?.url) {
      fetchData()
    }
  }, [params])

  const request = <T>(data: T) => setParams(data)

  return { request }
}