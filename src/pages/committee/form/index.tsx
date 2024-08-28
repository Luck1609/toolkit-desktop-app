import { CommitteeMember } from '../resource/types'
import FormFields from '../form/form-fields'
import BaseForm from '@/components/custom/base-form'
import { CommitteeMemberSchema } from '../resource/schema'
import { useLocation, useParams } from 'react-router-dom'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'
import { useMemo } from 'react'



const initialFormData = (data: CommitteeMember | null) => {
  return data ? {
    firstname: data?.firstname,
    lastname: data?.lastname,
    contact: data?.contact,
    email: data?.email,
    title: data?.title,
    role: data?.role,
    panel: data?.panel,
    designation: data?.designation,
  } : {
    firstname: '',
    lastname: '',
    contact: '',
    email: '',
    title: '',
    role: '',
    panel: '',
    designation: '',
  }
}

export default function Form() {
  const { id, page } = useParams()
  const { state } = useLocation()
  const { data, isLoading } = useSWR(id ? `/committee/${id}` : null, fetcher<CommitteeMember>)

  const defaultValues = initialFormData(data ?? null)

  console.log("Initial values for edit form", data, id, isLoading, defaultValues)
  const panel = useMemo(() => {
    return data?.panel ?? state.panel
  }, [data?.panel])
  
  return (
    isLoading ? (
      <>Loading</>
    ) : (
      <BaseForm
        title={`${page === 'create' ? 'Add' : 'Edit'} (${panel ?? 'TSC'}) Participant Details`}
        initialData={{...defaultValues, panel: panel ?? 'TSC'}}
        validation={CommitteeMemberSchema}
        form={{
          component: <FormFields />,
          destination: `/committee${id ? `/${id}` : ``}`,
          method: id ? 'patch' : 'post',
        }}
      />
    )
  )
}
