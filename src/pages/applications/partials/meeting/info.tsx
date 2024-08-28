import Datepicker from "@/components/form-components/datepicker";
import FormButton from "@/components/form-components/form-button";
import Input from "@/components/form-components/input";
import { Button } from "@/components/ui/button";
import { useSelector } from "@/lib/redux/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { Pencil, X } from "lucide-react";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup'

export default function MeetingInfor({ panel }) {
  const { session } = useSelector(state => state.session)
  const [edit, setEdit] = useState(false)
  const form = useForm<FormValues>({
    resolver: yupResolver(validation)
  }), { handleSubmit } = form;

  const toggleForm = () => setEdit(!edit)

  const updateMeetingInfo: SubmitHandler<FormValues> = (payload) => {
    // makeRequest({
    //   url: `/tsc/update-meeting/${data.id}`,
    //   method: 'patch',
    //   payload
    // })
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(updateMeetingInfo)}></form>
      <div className="space-y-4">
        <div className="w-full bg-default flex justify-between items-center">
          <label className="font-semibold pl-1 rounded text-lg">
            Update meeting info
          </label>

          {
            edit ? (
              <div className="flex space-x-3">
                <FormButton className="space-x-1 h-8">
                  <span className="">Update</span>
                </FormButton>
                <Button variant="danger" className="space-x-1 h-8" onClick={toggleForm}>
                  <X size={18} />
                  <span className="">Cancel</span>
                </Button>
              </div>
            ) : (
              <Button variant="primary" className="space-x-1 h-8" onClick={toggleForm}>
                <Pencil size={18} />
                <span className="">Edit</span>
              </Button>
            )
          }
        </div>
        <div className="w-full p-2 rounded bg-input px-4">
          {
            edit ? (
              <Input name="title" label="Title" placeholder="Meeting title" />
            ) : (
              <>
                <label className="text-sm font-semibold block mb-1">
                  Meeting title
                </label>
                
                <p className="">{ session?.quarter_name }</p>
              </>
            )
          }
        </div>

        <div className="grid lg:grid-cols-2 w-full rounded gap-4">
          <div className="w-full p-2 rounded bg-input px-4">
            {
              edit ? (
                <Input name="venue" label="Venue" placeholder="Meeting venue" />
              ) : (
                <>
                  <label className="text-sm font-semibold block mb-1">Venue</label>
                  <p className="">{session?.[panel as keyof session]?.venue ?? 'N/a'}</p>
                </>
              )
            }
          </div>

          <div className="w-full p-2 rounded bg-input px-4">
            {
              edit ? (
                <Datepicker name="date" label="Date" placeholder="Meeting date" />
              ) : (
                <>
                  <label className="text-sm font-semibold block mb-1">Date</label>
                  {/* <p className="">{data?.date ? dayjs(data.date).format("MMM DD, YYYY") : 'N/a'}</p> */}
                </>
              )
            }
          </div>
        </div>
      </div>
    </FormProvider>
  );
}



const validation = yup.object().shape({
  venue: yup.string().required(),
  date: yup.date().required()
})

type FormValues = {
  venue: string;
  date: Date;
  title: string;
}