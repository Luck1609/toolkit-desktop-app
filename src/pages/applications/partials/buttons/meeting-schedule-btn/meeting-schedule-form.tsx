import Datepicker from "@/components/form-components/datepicker";
import Input from "@/components/form-components/input";



export default function MeetingScheduleForm() {
  return (
    <div className="space-y-4">
      <Input name="venue" placeholder="Type in the meeting's venue" label="Venue" />

      <Datepicker name="date" label="Meeting date" />
    </div>
  )
}
