import { cn } from '@/lib/utils'
import _ from 'lodash'

export type SearchComponentProps = {
  show: boolean,
  className?: string;
  updateURL: (name: string, value: string) => void
}

export default function SearchComponent(props: SearchComponentProps) {
  // const { setValue } = usePagination()
  const handleChange = _.debounce((value) => props.updateURL('search', value), 300)

  return (
    <form className={cn("col-span-8 lg:col-span-2 order-2 lg:order-1 mt-3 lg:mt-0 form-field", props?.className)} onSubmit={(event) => event.preventDefault()}>
      <input 
        type="text" 
        className="w-full p-2  border dark:bg-transparent dark:border-dark-border rounded-lg" 
        placeholder="Search..." 
        onChange={(event) => handleChange(event.target.value)} 
      />
    </form>
  )
}
