import { Extract } from '../resource/schema'
import FormFields from '../form/form-fields'
import BaseForm from '@/components/custom/base-form'
import { ExtractValidation } from '../resource/schema'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'



const initialFormData = (data: Extract | null) => {
  return data ? {
    firstname: data?.firstname,
    lastname: data?.lastname,
    landuse: data?.landuse,
    plot_number: data?.plot_number,
    locality_id: data?.locality_id,
    sector_id: data?.sector_id,
    block: data?.block,
    phone_number: data?.phone_number,
    registration_date: data?.registration_date,
    allocation_date: data?.allocation_date,
  } : {
    firstname: '',
    lastname: '',
    landuse: '',
    plot_number: '',
    locality_id: '',
    sector_id: '',
    block: '',
    phone_number: '',
    registration_date: '',
    allocation_date: '',
  }
}

export default function ExtractForm() {
  const { id, page } = useParams()
  const { data, isLoading } = useSWR(id ? `/extract/${id}` : null, fetcher<Extract>)

  const defaultValues = initialFormData(data ?? null)

  console.log("Initial values for edit form", data)
  
  return (
    isLoading ? (
      <>Loading</>
    ) : (
      <BaseForm
        title={`${page === 'create' ? 'Create' : 'Edit'} Extract`}
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
