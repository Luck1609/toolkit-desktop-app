import { useEffect } from 'react'
import { DataTable } from '@/components/custom/data-table'
import columns from './columns'
import BaseTableHeader from '@/components/custom/data-table/table-header'
import usePagination from '@/hooks/use-pagination'
import { useLocation } from 'react-router-dom'
import { Letter } from './resource/types'
import { TypographyH5 } from '@/components/custom/typography'


export default function Letters() {
  const { pagination, setURL, updateURL, isLoading } = usePagination<Letter[]>()
  const { pathname } = useLocation()

  // const { data } = pagination

  useEffect(() => {
    setURL('/letter')
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
              label: 'New SMS',
              url: `${pathname}/create`
            }}
            statusFilterProps={{
              show: false,
              component: <TypographyH5>Letters Management</TypographyH5>
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
