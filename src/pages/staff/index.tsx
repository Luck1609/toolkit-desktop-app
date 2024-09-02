import { useEffect } from 'react'
import { DataTable } from '@/components/custom/data-table'
import columns from './columns'
import BaseTableHeader from '@/components/custom/data-table/table-header'
import usePagination from '@/hooks/use-pagination'
import { useLocation } from 'react-router-dom'
import { Staff } from './resource/types'
import { TypographyH5 } from '@/components/custom/typography'


export default function StaffComponent() {
  const { pagination, setURL, updateURL, isLoading } = usePagination<Staff[]>()
  const { pathname } = useLocation()

  // const { data } = pagination

  useEffect(() => {
    setURL('/staff')
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
              label: 'Add Staff',
              url: `${pathname}/create`
            }}
            statusFilterProps={{
              show: false,
              component: <TypographyH5>Staff Management</TypographyH5>
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
