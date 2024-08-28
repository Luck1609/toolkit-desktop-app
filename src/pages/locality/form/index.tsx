import { Locality } from '../resource/types'
import FormFields from '../form/form-fields'
import BaseForm from '@/components/custom/base-form'
import { LocalityValidation } from '../resource/schema'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'



const initialFormData = (data: Locality | null) => {
  return data ? {
    name: data?.name,
    initials: data?.initials,
  } : {
    name: '',
    initials: '',
  }
}

export default function LocalityForm() {
  const { id, page } = useParams()
  const { data, isLoading } = useSWR(id ? `/locality/${id}` : null, fetcher<Locality>)

  const defaultValues = initialFormData(data ?? null)

  console.log("Initial values for edit form", data)
  
  return (
    isLoading ? (
      <>Loading</>
    ) : (
      <BaseForm
        title={`${page === 'create' ? 'Add' : 'Edit'} Loclaity`}
        initialData={defaultValues}
          validation={LocalityValidation}
        form={{
          component: <FormFields />,
          destination: `/locality${id ? `/${id}` : ``}`,
          method: id ? 'patch' : 'post',
        }}
      />
    )
  )
}
