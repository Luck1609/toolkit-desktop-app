import { motion } from "framer-motion";
import { CircleCheckBig, CircleX, FolderInput, PrinterCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from '@/lib/redux/hooks'
// import { togglePreviewModal } from "@/lib/toolkit/reducers/modal";
import SelectedApplicationAction from "./selected-application-action";
import {TooltipButton} from '@/components/custom/tooltip-button'
import { useSearchParams } from "react-router-dom";
import { toggleModal } from "@/lib/redux/slice/notice";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// const visibleStatus = ["received", "recommended"];

type BatchAction = {
  rows: number;
}


export default function BatchActions({ rows }: BatchAction) {
  // const [batchAction, setBatchAction] = useState('received')
  const { session } = useSelector(state => state.session)
  const dispatch = useDispatch(),
    [url] = useSearchParams(),
    status = url.get("status"),
    toggleMeeting = (panel: 'spc' | 'tsc') => () =>  dispatch(
      toggleModal({
        show: true,
        title: `${panel.toUpperCase()} meeting details`,
        content: 'meeting',
        // content: <Meeting panel={panel} />,
        data: {...session?.[panel], panel},
        className: "!max-w-2xl",
      })
    );

  
  // const updateStatus = (action) => setBatchAction(action)
  
  return (
    <motion.div className="w-full flex justify-between py-2 border-b border-slate-500 mb-3">
      <div className="w-full flex items-center space-x-5">
        {
          rows > 0 && (
            <>
              <span className="font-semibold">
                {`${rows ?? 0} application${
                  rows > 1 ? "s" : ""
                } selected`}
              </span>

              <SelectedApplicationAction rows={rows} status={status}  />
            </>
          )
        }
      </div>

      <div className="flex space-x-3">

        <TooltipButton label="Print">
          <Button>
            <PrinterCheck />
          </Button>
        </TooltipButton>

        <TooltipButton label="Export">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button>
                <FolderInput />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dark:!bg-input dark:!border-input">
              <DropdownMenuItem>
                Export CSV
              </DropdownMenuItem>
              <DropdownMenuItem>
                Export PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipButton>

        <div className="w-full flex space-x-3">
          {(status === "received" || !status) && (
            <TooltipButton label="Technical Sub-Committee Meeting">
              <Button
                className="bg-slate-200 hover:bg-slate-300 dark:bg-input flex items-center"
                variant="input"
                onClick={toggleMeeting("tsc")}
              >
                <span className="mr-2">
                  {!session?.tsc ? "Schedule TSC meeting" : "TSC Meeting"}
                </span>

                {session?.tsc ? (
                  <CircleCheckBig size={18} className="text-success" />
                ) : (
                  <CircleX size={18} className="text-danger" />
                )}
              </Button>
            </TooltipButton>
          )}

          {status === "recommended" && (
            <TooltipButton label="Spatial Committee Meeting">
              <Button
                className="bg-slate-200 hover:bg-slate-300 dark:bg-input flex items-center"
                variant="input"
                onClick={toggleMeeting("spc")}
              >
                <span className="mr-2">
                  {!session?.spc ? "Schedule SPC meeting" : "SPC Meeting"}
                </span>

                {session?.tsc ? (
                  <CircleCheckBig size={18} className="text-success" />
                ) : (
                  <CircleX size={18} className="text-danger" />
                )}
              </Button>
            </TooltipButton>
          )}
        </div>
      </div>
    </motion.div>
  );
}
