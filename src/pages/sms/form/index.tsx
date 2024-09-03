import { Sms } from '../resource/types'
import FormFields from '../form/form-fields'
import BaseForm from '@/components/custom/base-form'
import { SmsValidation } from '../resource/schema'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'



const initialFormData = (data: Sms | null) => {
  return data ? {
    message: data?.message,
    contacts: data?.contacts,
  } : {
    message: '',
    contacts: '',
  }
}

export default function SmsForm() {
  const { id, page } = useParams()
  const { data, isLoading } = useSWR(id ? `/sms/${id}` : null, fetcher<Sms>)

  const defaultValues = initialFormData(data ?? null)
  
  return (
    isLoading ? (
      <>Loading</>
    ) : (
      <BaseForm
          title={`${page === 'create' ? 'Send SMS' : ''}`}
        initialData={defaultValues}
          validation={SmsValidation}
        form={{
          component: <FormFields />,
          destination: `/sms${id ? `/${id}` : ``}`,
          method: id ? 'patch' : 'post',
        }}
      />
    )
  )
}
