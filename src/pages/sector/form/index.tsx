import { Sector } from '../resource/types'
import FormFields from '../form/form-fields'
import BaseForm from '@/components/custom/base-form'
import { SectorValidation } from '../resource/schema'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'



const initialFormData = (data: Sector | null) => {
  return data ? {
    name: data?.name,
    initials: data?.initials,
    blocks: data?.blocks ? JSON.parse(data.blocks) : []
  } : {
    name: '',
    initials: '',
    blocks: []
  }
}

export default function SectorForm() {
  const { id, page } = useParams()
  const { data, isLoading } = useSWR(id ? `/sector/${id}` : null, fetcher<Sector>)

  const defaultValues = initialFormData(data ?? null)

  console.log("Initial values for edit form", data)
  
  return (
    isLoading ? (
      <>Loading</>
    ) : (
      <BaseForm
        title={`${page === 'create' ? 'Add' : 'Edit'} Sector`}
        initialData={defaultValues}
          validation={SectorValidation}
        form={{
          component: <FormFields />,
          destination: `/sector${id ? `/${id}` : ``}`,
          method: id ? 'patch' : 'post',
        }}
      />
    )
  )
}
