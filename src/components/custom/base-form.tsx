
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from '@/components/ui/form'
import FormButton from '@/components/form-components/form-button'
import { TypographyH6 } from '@/components/custom/typography'
import http from '@/lib/http';
import { HttpMethods } from '@/lib/interface';
import { toast } from '../ui/use-toast';
import Container from './container';
import { Button } from '../ui/button';
import { MoveLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';



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
  const { handleSubmit, reset } = form
  const navigate = useNavigate()

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

  const goBack = () => navigate(-1)


  return (
    
    <Container className="!py-5">
      <div className="mb-5 pb-2 border-b dark:border-input flex items-center space-x-2">
        <Button className="!bg-transparent hover:!bg-slate-100 dark:hover:!bg-input !p-2" onClick={goBack}>
          <MoveLeft />
        </Button>

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
