
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from '@/components/ui/form'
import FormButton from '@/components/form-components/form-button'
import { TypographyH6 } from '@/components/custom/typography'
import http from '@/lib/http';
import { HttpMethods } from '@/lib/interface';
import { toast } from '../ui/use-toast';
import Container from './container';



export type BaseForm = {
  title: string;
  validation: any;
  initialData: {
    [key: string]: any;
  };
  form: {
    component: React.ReactNode;
    destination: string;
    method: keyof HttpMethods
    sumitHandler?: (payload: any) => FormData
  }
}



export default function (props: BaseForm) {
  const form = useForm<typeof props.validation>({
    mode: 'all',
    resolver: yupResolver(props.validation),
    defaultValues: props.initialData
  })
  const { handleSubmit, reset, watch, formState: {errors} } = form

  // console.log('Watching for errors', watch(), errors)
  
  const submit: SubmitHandler<typeof props.validation> = async (formFileds) => {
    const { destination, method, sumitHandler } = props.form
    // SUBMIT HANDLER
    const payload = sumitHandler ? sumitHandler(formFileds) : formFileds
    
    const result = await http[method](destination, payload)
    
    if (result.status === 'success') {
      reset()
      result?.message && toast({
        status: 'success',
        title: 'Form submitted',
        description: result.message
      })
    }
    else toast(result)
  }


  return (
    
    <Container className="">
      <div className="mb-8 p-2 border-b dark:border-dark-border">
        <TypographyH6>{props.title}</TypographyH6>
      </div>

      <Form {...form}>
        <form className="space-y-5" onSubmit={handleSubmit(submit)}>
          {props?.form?.component}

          <div className="flex justify-end">
            <FormButton className="w-56" loadingText="Submitting...">
              Submit
            </FormButton>
          </div>
        </form>
      </Form>
    </Container>
  )
}
