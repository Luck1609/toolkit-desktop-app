import { useEffect } from 'react'
import { DataTable } from '@/components/custom/data-table'
import columns from './columns'
import BaseTableHeader from '@/components/custom/data-table/table-header'
import usePagination from '@/hooks/use-pagination'
import { useLocation } from 'react-router-dom'
import { Extract } from './resource/schema'
import { TypographyH5 } from '@/components/custom/typography'


export default function Extracts() {
  const { pagination, setURL, updateURL, isLoading } = usePagination<Extract[]>()
  const { pathname } = useLocation()

  // const { data } = pagination

  useEffect(() => {
    setURL('/extract')
  }, [])
  
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
              label: 'Add New Extract',
              url: `${pathname}/create`,
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
