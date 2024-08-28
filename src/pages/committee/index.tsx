import { useEffect } from 'react'
import { DataTable } from '@/components/custom/data-table'
import columns from './columns'
import BaseTableHeader from '@/components/custom/data-table/table-header'
import usePagination from '@/hooks/use-pagination'
import { useLocation, useSearchParams } from 'react-router-dom'
import { CommitteeMember } from './resource/types'


export default function Committee() {
  const { pagination, setURL, updateURL, isLoading } = usePagination<CommitteeMember[]>()
  const { pathname } = useLocation()
  const [params] = useSearchParams()

  const { data } = pagination

  useEffect(() => {
    setURL('/committee')
  }, [])

  console.log('Pagionation from committee', pagination)
  
  return (
    <DataTable
      columns={columns()}
      data={data ?? []}
      isLoading={isLoading}
      components={{
        header: () => (
          <BaseTableHeader
            addButtonProps={{
              show: true,
              label: 'Add member',
              url: `${pathname}/create`,
              state: {panel: params.get('panel')}
            }}
            statusFilterProps={{
              show: true,
              label: 'Panel',
              trigger: 'TSC',
              options: [
                {
                  label: 'TSC',
                  action: () => updateURL('panel', 'TSC')
                },
                {
                  label: 'SPC',
                  action: () => updateURL('panel', 'SPC')
                },
              ],
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
