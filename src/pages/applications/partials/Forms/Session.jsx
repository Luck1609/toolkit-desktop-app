import { DatePicker } from "@/components/FormComponents/DatePicker";
import { Input } from "@/components/FormComponents/Input";

export default function SessionForm() {
  return (
    <div className="space-y-4">
      <Input
        name="name"
        label="Session name"
        placeholder="Enter session name"
      />

      <div className="grid lg:grid-cols-2 gap-4">
        <DatePicker
          label="Start date of session"
          name="start_date"
        />

        <DatePicker
          label="End date of session"
          name="end_date"
        />
      </div>
    </div>
  );
}
