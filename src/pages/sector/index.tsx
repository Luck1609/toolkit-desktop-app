import { useEffect } from 'react'
import { DataTable } from '@/components/custom/data-table'
import columns from './columns'
import BaseTableHeader from '@/components/custom/data-table/table-header'
import usePagination from '@/hooks/use-pagination'
import { useLocation, useParams } from 'react-router-dom'
import { Sector } from './resource/types'
import { TypographyH5 } from '@/components/custom/typography'
import { Locality } from '../locality/resource/types'


export default function Sectors() {
  const { pagination, setURL, updateURL, isLoading } = usePagination<Locality & {sectors: Sector[]}>()
  const { pathname } = useLocation()
  const {id} = useParams()

  // const { data } = pagination

  useEffect(() => {
    setURL(`/sectors/${id}`)
  }, [])

  console.log('Pagination data', pagination.data)

  return (
    <DataTable
      columns={columns()}
      data={pagination?.data?.sectors ?? []}
      isLoading={isLoading}
      components={{
        header: () => (
          <BaseTableHeader
            addButtonProps={{
              show: true,
              label: 'Add Sector',
              url: `${pathname}/create`,
            }}
            statusFilterProps={{
              show: false,
              component: <><TypographyH5>Locality Management</TypographyH5></>
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
