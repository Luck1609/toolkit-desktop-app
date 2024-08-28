import { Plus, Eye } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toggleModal } from "@/lib/redux/slice/notice";
import { TypographyH4 } from "@/components/custom/typography";
import { MeetingPanel } from ".";

export default function MinutesPreview({ panel  }: MeetingPanel) {

  const navigate = useNavigate(), dispatch = useDispatch(),
    goto = () => {
      dispatch(toggleModal())
      // navigate(`/applications/minutes/${panel}`, { state: { id, panel, minutes } })
    };

  return (
    <div className="space-y-4 my-8">
      <div className="w-full flex justify-between items-center">
        <label className="font-semibold pl-1 rounded text-lg text-amber-400">
          Minutes recorded
        </label>

      </div>

      <div className="w-full p-2 rounded bg-input px-4 flex items-center justify-between">
        <TypographyH4>Minutes title here</TypographyH4>
        {/* {
          minutes ? (
            <TypographyH4>Minutes title here</TypographyH4>
          ) : (
            <TypographyH5>Not available</TypographyH5>
          )
        } */}

        <Button variant="primary" className="space-x-1 h-8" onClick={goto}>
          <>
            <Plus size={18} />
            <span className="">Add minute</span>
          </>
          {/* {
            !minutes ? (
              <>
                <Plus size={18} />
                <span className="">Add minute</span>
              </>
            ) : (
              <>
                <Eye size={18} />
                <span className="">View</span>
              </>
            )
          } */}
        </Button>
      </div>
    </div>
  );
}
