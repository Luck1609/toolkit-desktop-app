// import { useMemo } from "react";
import useSWR from "swr";
import ApplicantInfo from "./info";
import Preview from "./preview";
import ScannedDocuments from "./documents";
import StructureDetails from "./structure";
import { Loading } from "@/components/form-components/form-button";
import { FieldValues, Resolver, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { ApplicantInfoValidation, ScannedDocumentsValidation, StructureDetailsValidation } from "../resource/schema";
import { fetcher } from "@/lib/fetcher";
import { Locality } from "@/pages/locality/resource/types";


const areas = { localities: [], sectors: {} };


const formAttributes = [
  {
    label: 'Applicant information',
    content: ApplicantInfo,
    validation: ApplicantInfoValidation
  },
  {
    label: 'Structure details',
    content: StructureDetails,
    validation: StructureDetailsValidation
  },
  {
    label: 'Other documents',
    content: ScannedDocuments,
    validation: ScannedDocumentsValidation
  },
  {
    label: 'Preview information',
    content: Preview,
    validation: ''
  },
]



export default function ApplicationForms() {
  const [step, setStep] = useState<number>(0)
  const { data, isLoading } = useSWR("/locality", fetcher<Locality[]>);
  const currentField = formAttributes[step]

  type FormValues = typeof currentField.content

  const { validation } = currentField

  const form = useForm<FormValues>({
    mode: 'all',
    resolver: yupResolver(validation)
    // resolver: yupResolver(validation) as unknown as Resolver<FormValues>
  })
  const { handleSubmit } = form


  const prev = () => setStep(step === 0 ? step : step - 1)
  const next = () => setStep(step === formAttributes.length + 1 ? step : step + 1)

  const submit: SubmitHandler<FormValues> = (payload) => {

  }

  console.log('Application data', data)
  
  return (
    isLoading
      ? <Loading />
      : (
        <Form {...form}>
          <form className="" onSubmit={handleSubmit(submit)}>
            {switcher(step)}

            <div className="flex justify-end">
              <Button onClick={prev}>Back</Button>
              <Button onClick={next}>Next</Button>
            </div>
          </form>
        </Form>
      )
  )
}



function switcher(step: number) {
  switch (step) {
    case 0:
      return <ApplicantInfo />
    // case 1:
    //   return <StructureDetails />
    // case 2:
    //   return <ScannedDocuments />
    // // case 3:
    // //   return <OtherDocuments />
    // case 3:
    //   return <Preview />

    default:
      return <ApplicantInfo />;
  }
}