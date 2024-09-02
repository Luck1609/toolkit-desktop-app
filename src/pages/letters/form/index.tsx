import { Letter } from '../resource/types'
import { LetterFormContent } from '../form/form-fields'
import BaseForm from '@/components/custom/base-form'
import { LetterValidation } from '../resource/schema'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'
import logo from '@/assets/img/coa.png'



const initialFormData = (data: Letter | null) => {
  return data ? {
    date: data?.date,
    reference: data?.reference,
    to: data?.to,
    content: data?.content,
  } : {
    date: '',
    reference: '',
    to: '',
    content: baseContent,
  }
}

export default function LetterForm() {
  const { id, page } = useParams()
  const { data, isLoading } = useSWR(id ? `/letter/${id}` : null, fetcher<Letter>)

  const defaultValues = initialFormData(data ?? null)
  
  return (
    isLoading ? (
      <>Loading</>
    ) : (
      <BaseForm
        title={`${page === 'create' ? 'Draft New' : 'Edit'} Letter`}
        initialData={defaultValues}
          validation={LetterValidation}
        form={{
          component: <LetterFormContent />,
          destination: `/letter${id ? `/${id}` : ``}`,
          method: id ? 'patch' : 'post',
        }}
      />
    )
  )
}



const baseContent = () => `
  <div className="w-full text-center p-10" style="padding: 2pc;color:#64748b;">
    <h1 style="font-size:24px;text-align:center;">SUNYANI MUNICIPAL ASSEMBLY</h1>
    <h2 style="font-size:20px;text-align:center;">PHYSICAL PLANNING DEPARTMENT</h2>

    <div style="display:flex;margin:0 auto;width:80%;justify-content: space-between;align-items:center;">
      <div style="width:250px;font-style:italic;font-weight:500;">
        In case of reply, number and date of this letter should be quoted
      </div>
      
      <div style="margin:0 20px;">
        <img src="${logo}" alt="Office logo" style="width:100px; margin-right: 10px" />
        <img src="${logo}" alt="Ghana National Coat of Arms" style="width:100px;" />
      </div>
      
      
      <div style="font-size:14px;text-align:left;font-weight:600;width:250px;">
        <div className="">P. O. Box 123, Sunyani, Bono Region</div>
        <div className="">Tel No. 03023514578</div>
        <div className="">Organisation's Email address</div>
      </div>
    </div>

    <div style="display:flex;justify-content:space-between;align-items:flex-end;margin: 1.5pc 0 0.5pc 0;">
      <div >
        <div style="display:flex;align-items:center;">
          <label style="font-weight:600;font-size:14px;">Our ref:</label>
          <p className="border-b border-dashed border-gray-500 ml-2 w-96" style="width:300px;border-bottom: 1px dashed grey;margin-left: 8px;"></p>
        </div>

        <div style="display:flex;align-items:center;">
          <label className="font-semibold text-md text-sm">Your ref:</label>
          <p style="margin-left:5px;border-bottom: 1px dashed grey;width:300px;"></p>
        </div>
      </div>

      
      <div style="font-size:14px;text-align:left;font-weight:600;display:flex;align-items:center;">
        <label className="font-semibold text-md text-sm">DATE:</label>
        <p style="margin-left:5px;border-bottom: 1px dashed grey;width:200px;"></p>
      </div>
    </div>


    <div className="border-b-8 border-double border-gray-700 my-5" style="border-bottom: 8px double grey;margin: 1pc 0;"></div>

    <div style="width:75%;margin:3pc auto 1pc auto;">
      <h2 style="margin-bottom: 2pc;text-align:center;">Title of letter</h2>

      <div className="message-container">
        <p className="text-left">Type letter content in here</p>
      </div>
      
      
      <div style="margin-top:2pc;font-size:14px;text-align:left;font-weight:600;display:flex;justify-content:flex-end;align-items:center;">
        <div className="">
          <p className="border-b border-dashed border-gray-700 ml-4 w-96 text-center" style="border-bottom: 1px dashed grey;width:200px;text-align:center"></p>
          <p className="border-b border-dashed border-gray-700 ml-4 w-96 text-center" style="width:200px;text-align:center">Nathan Luck</p>
          <p className="border-b border-dashed border-gray-700 ml-4 w-96 text-center" style="width:200px;text-align:center">(Plan Preparation Officer)</p>
        </div>
      </div>
    </div>
  </div>
`