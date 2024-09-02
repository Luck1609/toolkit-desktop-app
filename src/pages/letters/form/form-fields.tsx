import { useState } from "react";
import Datepicker from "@/components/form-components/datepicker";
import Input from "@/components/form-components/input";
import { RichTextEditor } from "@/components/form-components/richTextEditor";
import { Select } from "@/components/form-components/select";
import Switch from "@/components/form-components/switch";
import FileUploader from "@/components/form-components/uploader";
import { useFormContext } from "react-hook-form";



export function LetterFormContent() {
  const [toggleStatus, setToggleStatus] = useState('outgoing')
  const {watch} = useFormContext()
  const status = watch('status')

  return (
    (!status || status === 'outgoing') ? (
      <>
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="">
            <Input name="reference" label="Reference" placeholder="Reference ID" />
          </div>

          <div className="">
            <Input name="to" label="Receipient" placeholder="Addressed to" />
          </div>

          <div className="">
            <Datepicker name="date" label="Date" placeholder="Date sent" />
          </div>

          <div className="">
            <Select
              name="status"
              label="State"
              placeholder="Reference ID"
              options={[
                {
                  label: 'Outgoing',
                  value: 'outgoing'
                },
                {
                  label: 'Incoming',
                  value: 'incoming'
                },
              ]}
            />
          </div>

          <div className="">
            <Switch name="sendViaEmail" label="Send via email" placeholder="Send via email after save" />
          </div>

          {
            watch('sendViaEmail') && (
              <div className="">
                <Input name="email" label="Receipient" placeholder="Receipient email address" />
              </div>
            )
          }
        </div> 
        
        <RichTextEditor 
          name="content"
          label=""

        />
      </>
    ) : (
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="">
            <Input name="reference" label="Reference" placeholder="Reference ID" />
          </div>

          <div className="">
            <Input name="from" label="From" placeholder="Received from" />
          </div>

          <div className="">
            <Datepicker name="date" label="Date" placeholder="Date received" />
          </div>

          <div className="">
            <FileUploader 
              name="scanned_copy"  
              label="Scanned copy"
              type="single"
              dimensions="w-56 h-60"
              btnText="Add scanned document"
            />
          </div>
        </div> 
    )
  );
}



