import { ScrollArea } from "@/components/ui/scroll-area";
import MeetingInfor from './info';
import MinutesPreview from './preview';
import MeetingParticipants from './participants';

export type MeetingPanel = {
  panel: 'spc' | 'tsc'
}



export default function Meeting({ data: { panel } }: {data: {panel: MeetingPanel}}) {

  return (
    <ScrollArea className=" max-h-[70vh] h-full space-y-6">
      <MeetingInfor panel={panel} />
      {/* <MinutesPreview panel={panel} /> */}
      <MeetingParticipants panel={panel} />
    </ScrollArea>
  );
}
