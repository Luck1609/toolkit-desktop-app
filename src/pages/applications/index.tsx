import { useEffect } from 'react'
import columns from './columns'
import BaseTableHeader from '@/components/custom/data-table/table-header'
import usePagination from '@/hooks/use-pagination'
import { useLocation, useSearchParams } from 'react-router-dom'
import { Application } from './resource/types'
import { Session } from '../sessions/resource/types'
import { useDispatch, useSelector } from '@/lib/redux/hooks'
import http from '@/lib/http'
import { updateSession } from '@/lib/redux/slice/session'
import { AppDispatch } from '@/lib/redux'
import { DataTable } from '@/components/custom/data-table'
import { capitalize } from 'lodash'
import BatchActions from './partials/batch-actions'
import AppActionButtons from './partials/buttons'


const fetchSession = async (dispatch: AppDispatch) => {
  const result = await http.get<Session>('current-quarter')
  console.log('Session result', result)
  if (result.status === 'success') dispatch(updateSession(result.data))
}

export default function Applications() {
  const { pagination, setURL, updateURL, isLoading } = usePagination<Application[]>()
  const { session: activeSession } = useSelector(state => state.session)
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const [params] = useSearchParams()
  const status = params.get('status')

  const { data } = pagination

  useEffect(() => {
    if (!activeSession) {
      fetchSession(dispatch) 
    }
  }, [])

  useEffect(() => {
    setURL('/application')
  }, [])

  
  return (
    <DataTable
      columns={columns()}
      data={data ?? []}
      isLoading={isLoading}
      components={{
        header: () => (
          <BaseTableHeader
            addButtonProps={{
              show: false,
              component: <AppActionButtons />
            }}
            statusFilterProps={{
              show: true,
              className: "lg:col-span-4",
              options: [
                {
                  label: 'Received',
                  action: () => updateURL('status', 'received')
                },
                {
                  label: "Recommended",
                  action: () => updateURL('status', 'recommended')
                },
                {
                  label: "Approved",
                  action: () => updateURL('status', 'approved')
                },
                {
                  label: "Deferred",
                  action: () => updateURL('status', 'deferred')
                },
              ],
              trigger: status ? capitalize(status) : 'Received',
              label: 'Status'
            }}
            searchComponentProps={{
              show: true,
              updateURL
            }}
          />
        ),
        actions: (table) => (
          <>
            <BatchActions rows={table.getFilteredSelectedRowModel().rows.length} />
          </>
        )
      }}
    />
  )
}
