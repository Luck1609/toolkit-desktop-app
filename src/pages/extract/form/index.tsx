import { Extract } from '../resource/types'
import FormFields from '../form/form-fields'
import BaseForm from '@/components/custom/base-form'
import { ExtractValidation } from '../resource/schema'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'



const initialFormData = (data: Extract | null) => {
  return data ? {
    name: data?.name,
    use: data?.use,
    plot: data?.plot,
    contact: data?.contact,
    registration_date: data?.registration_date,
    allocation_date: data?.allocation_date,
  } : {
    name: '',
    use: '',
    plot: '',
    contact: '',
    registration_date: '',
    allocation_date: '',
  }
}

export default function ExtractForm() {
  const { id, page } = useParams()
  const { data, isLoading } = useSWR(id ? `/Extract/${id}` : null, fetcher<Extract>)

  const defaultValues = initialFormData(data ?? null)

  console.log("Initial values for edit form", data)
  
  return (
    isLoading ? (
      <>Loading</>
    ) : (
      <BaseForm
        title={`${page === 'create' ? 'Add' : 'Edit'} Loclaity`}
        initialData={defaultValues}
          validation={ExtractValidation}
        form={{
          component: <FormFields />,
          destination: `/extract${id ? `/${id}` : ``}`,
          method: id ? 'patch' : 'post',
        }}
      />
    )
  )
}
