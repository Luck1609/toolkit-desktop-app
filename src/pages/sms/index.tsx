import { useEffect } from 'react'
import { DataTable } from '@/components/custom/data-table'
import columns from './columns'
import BaseTableHeader from '@/components/custom/data-table/table-header'
import usePagination from '@/hooks/use-pagination'
import { useLocation } from 'react-router-dom'
import { TypographyH5 } from '@/components/custom/typography'
import { Session } from './resource/types'


export default function SMS() {
  const { pagination, setURL, updateURL, isLoading } = usePagination<Session[]>()
  const { pathname } = useLocation()

  // const { data } = pagination

  useEffect(() => {
    setURL('/quarter')
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
              label: 'New Session',
              url: `${pathname}/create`,
            }}
            statusFilterProps={{
              show: false,
              component: <TypographyH5>Session Management</TypographyH5>
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
