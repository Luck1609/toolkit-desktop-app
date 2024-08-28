import { Bell, RefreshCcw } from "lucide-react";
import { Button } from '@/components/ui/button';
import { useEffect, useState } from "react";
import { TooltipButton } from "@/components/custom/tooltip-button";
import { Loading } from "@/components/form-components/form-button";

export default function MeetingParticipants({}) {
  
  const [participants, setParticipants] = useState([])
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   if (data?.participants) setParticipants(JSON.parse(data.participants))
  // }, [data?.participants])

  const updateParticipants = () => {
    setLoading(true)
    // makeRequest({
    //   url: `/${panel}/update-members/${data.id}`,
    //   method: 'post',
    //   payload: {},
    //   action: () => setLoading(false),
    //   mutation
    // })
  }

  console.log('Paticipants detail', participants)
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-3 pb-1 border-b border-default">
        <label className="font-semibold lg:col-span-2 text-lg">
          Meeting Participants
        </label>

        <div className="flex space-x-5">
          <TooltipButton label="Update meeting participants">
            <Button className="h-8 p-2" variant="success" onClick={updateParticipants}>
              <RefreshCcw size={18} />
            </Button>
          </TooltipButton>

          <TooltipButton label="Notify participants">
            <Button className="h-8 p-2" variant="success" onClick={updateParticipants}>
              <Bell size={18} />
            </Button>
          </TooltipButton>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 w-full rounded gap-4">
        {
          loading ? (

            <div className="w-full lg:col-span-2 p-2 rounded bg-input px-4 h-20 flex items-center justify-center">
              <div className="text-center">
                <Loading text="Updating participants..." />
              </div>
            </div>
          ) : (
            participants.length > 0 ? (
              participants.map((info, index) => {
                const { designation, title, firstname, lastname, contact } = info

                return (
                  <div className="w-full p-2 rounded bg-input px-4" key={index.toString()}>
                    <label className="text-sm font-semibold block mb-1">
                      <span className="font-bold mr-2">Designation:</span>
                      <span className="">{designation}</span>
                    </label>
                    <p className="">{`${title} ${lastname} ${firstname}`}</p>
                    <p className="">{contact}</p>
                  </div>
                )
              })
            ) : (
              <div className="w-full lg:col-span-2 p-2 rounded bg-input px-4 h-32 flex items-center justify-center">
                <div className="text-center">Refresh to update members</div>
              </div>
            )
          )
        }
      </div>
    </div>
  );
}
