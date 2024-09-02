import { Staff } from '../resource/types'
import { UserForm } from '../form/form-fields'
import BaseForm from '@/components/custom/base-form'
import { StaffValidation } from '../resource/schema'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'



const initialFormData = (data: Staff | null) => {
  return data ? {
    firstname: data?.firstname,
    lastname: data?.lastname,
    email: data?.email,
    title: data?.title,
    role: data?.role,
    contact: data?.contact,
  } : {
    firstname: '',
    lastname: '',
    email: '',
    title: '',
    role: '',
    contact: '',
  }
}

export default function StaffForm() {
  const { id, page } = useParams()
  const { data, isLoading } = useSWR(id ? `/staff/${id}` : null, fetcher<Staff>)

  const defaultValues = initialFormData(data ?? null)
  
  return (
    isLoading ? (
      <>Loading</>
    ) : (
      <BaseForm
        title={`${page === 'create' ? 'Add New' : 'Edit'} Staff`}
        initialData={defaultValues}
        validation={StaffValidation}
        form={{
          component: <UserForm />,
          destination: `/staff${id ? `/${id}` : ``}`,
          method: id ? 'patch' : 'post',
        }}
      />
    )
  )
}
