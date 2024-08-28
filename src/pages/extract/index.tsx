import { useEffect } from 'react'
import { DataTable } from '@/components/custom/data-table'
import columns from './columns'
import BaseTableHeader from '@/components/custom/data-table/table-header'
import usePagination from '@/hooks/use-pagination'
import { useLocation, useSearchParams } from 'react-router-dom'
import { Extract } from './resource/types'
import { TypographyH5 } from '@/components/custom/typography'


export default function Extracts() {
  const { pagination, setURL, updateURL, isLoading } = usePagination<Extract[]>()
  const { pathname } = useLocation()
  const [params] = useSearchParams()

  // const { data } = pagination

  useEffect(() => {
    setURL('/locality')
  }, [])

  console.log('Pagionation from committee', pagination)
  
  return (
    <DataTable
      columns={columns()}
      data={pagination?.data ?? []}
      isLoading={isLoading}
      components={{
        header: () => (
          <BaseTableHeader
            addButtonProps={{
              show: true,
              label: 'New Extract',
              url: `${pathname}/create`,
              state: {panel: params.get('panel')}
            }}
            statusFilterProps={{
              show: false,
              component: <TypographyH5>Extract Management</TypographyH5>
            }}
            searchComponentProps={{
              show: true,
              updateURL
            }}
          />
        )
      }}
    />
  )
}
