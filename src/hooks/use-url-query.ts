import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'


const useUrlQuery = () => {
  
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const params = new URLSearchParams(searchParams)

  const updateQuery = (name: string, value: string) => {
    console.log('url query setting data', name, 'value of query =>', value)
    params.set(name, value)
    replace(`${pathname}?${params.toString()}`)
  }
  

  const getValue = (name: string) => {
    return params.get(name)
  }

  const setValue = (name: string, value: string) => {
    updateQuery(name, value)
  }

  return {
    getValue,
    setValue
  }
}

export default useUrlQuery