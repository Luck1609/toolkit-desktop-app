import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toggleModal } from "@/lib/redux/slice/notice";


type Panel = 'spc' | 'tsc'



export default function MeetingScheduleBtn() {
  let dispatch = useDispatch(),
    [url] = useSearchParams(),
    status = url.get("status");

  const scheduleMeeting = (panel: Panel) => () =>
    dispatch(
      toggleModal({
        show: true,
        content: panel,
        url: `/${panel}`,
        title: `Schedule ${panel.toUpperCase()} meeting`,
        values: {
          venue: null,
          date: null,
        },
      })
    );

  const panel = status === 'received' ? 'tsc' : 'spc'

  return (
    <Button
      className="flex items-center space-x-1"
      variant="secondary"
      onClick={scheduleMeeting(panel)}
    >
      <CalendarClock size={18} />
      <span className="">Schedule meeting</span>
    </Button>
  );
}
